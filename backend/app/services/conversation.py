"""Conversation engine.

Drives a candidate session through the authored scenarios in difficulty order.
For each scenario the candidate's typed turn goes to the customer simulator
(Bedrock call #1). Partway through, the scenario's coachability_prompt is
injected as a system instruction the candidate is asked to follow, and the
curveball line is woven into the customer's reply. Each scenario ends on its
win/turn-limit condition; every Turn is persisted.

The warm-up turn is handled by ``post_warmup`` and is marked ``is_warmup`` so it
never reaches the scorer.
"""
from __future__ import annotations

from sqlalchemy.orm import Session as DbSession

from ..bedrock import CustomerSimulator
from ..models import Scenario, Session, SessionStatus, Turn, TurnRole


def list_scenarios(db: DbSession, tenant_id: str) -> list[Scenario]:
    return (
        db.query(Scenario)
        .filter_by(tenant_id=tenant_id)
        .order_by(Scenario.order_index.asc())
        .all()
    )


def _next_seq(session: Session) -> int:
    return (max((t.seq for t in session.turns), default=0)) + 1


def _scenario_turns(session: Session, scenario_id: str) -> list[Turn]:
    return [t for t in session.turns if t.scenario_id == scenario_id and not t.is_warmup]


def _history_messages(turns: list[Turn]) -> list[dict]:
    """Map persisted turns to Bedrock chat messages (candidate=user, customer=assistant)."""
    out = []
    for t in turns:
        if t.role == TurnRole.candidate:
            out.append({"role": "user", "content": t.content})
        elif t.role == TurnRole.customer:
            out.append({"role": "assistant", "content": t.content})
        # system (coachability) turns are not replayed to the customer model
    return out


def _add_turn(db, session, *, role, content, scenario_id=None,
              is_warmup=False, is_coachability_probe=False) -> Turn:
    turn = Turn(
        tenant_id=session.tenant_id,
        session_id=session.id,
        scenario_id=scenario_id,
        seq=_next_seq(session),
        role=role,
        content=content,
        is_warmup=is_warmup,
        is_coachability_probe=is_coachability_probe,
    )
    db.add(turn)
    session.turns.append(turn)
    return turn


def post_warmup(db: DbSession, session: Session, message: str,
                simulator: CustomerSimulator | None = None) -> dict:
    """One throwaway, unscored interaction to settle nerves."""
    simulator = simulator or CustomerSimulator()
    warmup_spec = {
        "persona": "A friendly person making small talk to warm up.",
        "mood": "relaxed and encouraging",
        "backstory": "This is a practice round that does not count.",
        "win_condition": "Just have a brief, friendly exchange.",
        "hard_fail_triggers": [],
    }
    cand = _add_turn(db, session, role=TurnRole.candidate, content=message, is_warmup=True)
    reply = simulator.reply(warmup_spec, [], message)
    _add_turn(db, session, role=TurnRole.customer, content=reply, is_warmup=True)
    if session.status == SessionStatus.consented:
        session.status = SessionStatus.in_progress
    db.commit()
    return {"customer_message": reply, "is_warmup": True, "seq": cand.seq}


def post_turn(db: DbSession, session: Session, message: str,
              simulator: CustomerSimulator | None = None) -> dict:
    """Advance the current scenario by one candidate turn."""
    simulator = simulator or CustomerSimulator()
    scenarios = list_scenarios(db, session.tenant_id)

    if session.current_scenario_index >= len(scenarios):
        return _session_complete_payload(session, scenarios)

    scenario = scenarios[session.current_scenario_index]
    spec = scenario.spec
    max_turns = int(spec.get("max_turns", 4))
    coach_turn = int(spec.get("coachability_turn", max(1, max_turns - 2)))
    curveball_turn = spec.get("curveball_turn")

    prior = _scenario_turns(session, scenario.id)
    candidate_turn_number = sum(1 for t in prior if t.role == TurnRole.candidate) + 1

    cand_turn = _add_turn(db, session, role=TurnRole.candidate,
                          content=message, scenario_id=scenario.id)

    coachability_injected = False
    # Inject the coachability instruction exactly once, at the configured turn.
    already_injected = any(t.is_coachability_probe for t in prior)
    if candidate_turn_number == coach_turn and not already_injected and spec.get("coachability_prompt"):
        _add_turn(db, session, role=TurnRole.system,
                  content=f"[Trainer instruction] {spec['coachability_prompt']}",
                  scenario_id=scenario.id, is_coachability_probe=True)
        coachability_injected = True

    # Decide whether the scenario ends after this candidate turn.
    scenario_complete = candidate_turn_number >= max_turns

    customer_message = None
    if not scenario_complete:
        history = _history_messages(prior)
        customer_message = simulator.reply(spec, history, message)
        # Weave the curveball into the customer's reply at the configured turn.
        if curveball_turn and candidate_turn_number == int(curveball_turn) and spec.get("curveball"):
            customer_message = f"{customer_message} {spec['curveball']}"
        # If we injected a coachability instruction, surface it with the reply.
        if coachability_injected:
            customer_message = f"[Trainer: {spec['coachability_prompt']}]\n\n{customer_message}"
        _add_turn(db, session, role=TurnRole.customer,
                  content=customer_message, scenario_id=scenario.id)

    session_complete = False
    if scenario_complete:
        session.current_scenario_index += 1
        if session.current_scenario_index >= len(scenarios):
            session.status = SessionStatus.completed
            session_complete = True

    db.commit()

    next_scenario = (
        scenarios[session.current_scenario_index]
        if session.current_scenario_index < len(scenarios)
        else None
    )
    return {
        "seq": cand_turn.seq,
        "customer_message": customer_message,
        "is_warmup": False,
        "coachability_injected": coachability_injected,
        "scenario_index": session.current_scenario_index,
        "scenario_title": next_scenario.title if next_scenario else None,
        "scenario_complete": scenario_complete,
        "session_complete": session_complete,
    }


def _session_complete_payload(session: Session, scenarios) -> dict:
    return {
        "seq": _next_seq(session) - 1,
        "customer_message": None,
        "is_warmup": False,
        "coachability_injected": False,
        "scenario_index": session.current_scenario_index,
        "scenario_title": None,
        "scenario_complete": True,
        "session_complete": True,
    }


def opening_line_for_current_scenario(db: DbSession, session: Session) -> dict | None:
    """The customer's opening line that the candidate sees before replying."""
    scenarios = list_scenarios(db, session.tenant_id)
    if session.current_scenario_index >= len(scenarios):
        return None
    scenario = scenarios[session.current_scenario_index]
    return {
        "scenario_index": session.current_scenario_index,
        "scenario_title": scenario.title,
        "difficulty": scenario.difficulty,
        "opening_line": scenario.spec.get("opening_line"),
    }
