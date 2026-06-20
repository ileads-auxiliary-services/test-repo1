"""Scoring orchestration — runs the separate scoring pass and persists results
idempotently.

Re-running ``score_session`` for the same session UPDATES the existing Score and
Decision rows (keyed UNIQUE on session_id) rather than inserting duplicates.
"""
from __future__ import annotations

from datetime import datetime, timezone

from sqlalchemy.orm import Session as DbSession

from ..bedrock import TranscriptScorer
from ..config import REQUIRED_DIMENSIONS, load_rubric
from ..models import Decision, DecisionOutcome, Score, Session, SessionStatus, Turn, TurnRole
from .decision import compute_weighted_average, decide


def build_transcript_text(turns: list[Turn]) -> str:
    """Render the scored transcript. Warm-up turns are excluded; the
    coachability probe is tagged so the scorer can locate the correction."""
    lines = []
    for t in turns:
        if t.is_warmup:
            continue
        tag = " (COACHABILITY INSTRUCTION)" if t.is_coachability_probe else ""
        lines.append(f"[turn {t.seq}] {t.role.value}{tag}: {t.content}")
    return "\n".join(lines)


def score_session(
    db: DbSession,
    session: Session,
    scorer: TranscriptScorer | None = None,
) -> tuple[Score, Decision]:
    scorer = scorer or TranscriptScorer()
    rubric = load_rubric()

    transcript_text = build_transcript_text(session.turns)
    result, raw = scorer.score(transcript_text)  # validated ScoringResult

    dim_map = result.as_dimension_map()
    scores = {d: dim_map[d].score for d in REQUIRED_DIMENSIONS}
    avg = compute_weighted_average(scores)
    decision_result = decide(result)

    evidence = {
        d: {
            "score": dim_map[d].score,
            "evidence_quote": dim_map[d].evidence_quote,
            "evidence_turn_id": dim_map[d].evidence_turn_id,
            "rationale": dim_map[d].rationale,
        }
        for d in REQUIRED_DIMENSIONS
    }
    hard_fail_flags = [f.model_dump() for f in result.hard_fail_flags]

    # --- Idempotent upsert of Score ---
    score = db.query(Score).filter_by(session_id=session.id).one_or_none()
    if score is None:
        score = Score(tenant_id=session.tenant_id, session_id=session.id)
        db.add(score)
    score.language_proficiency = scores["language_proficiency"]
    score.comprehension_listening = scores["comprehension_listening"]
    score.composure_under_pressure = scores["composure_under_pressure"]
    score.coachability = scores["coachability"]
    score.weighted_average = avg
    score.evidence = evidence
    score.hard_fail_flags = hard_fail_flags
    score.model_id = scorer.client.model_id
    score.rubric_version = str(rubric.get("version", "1"))
    score.raw_response = raw

    # --- Idempotent upsert of Decision ---
    decision = db.query(Decision).filter_by(session_id=session.id).one_or_none()
    if decision is None:
        decision = Decision(tenant_id=session.tenant_id, session_id=session.id)
        db.add(decision)
    decision.outcome = DecisionOutcome(decision_result.outcome)
    decision.requires_human_review = decision_result.requires_human_review
    decision.justification = decision_result.justification

    session.status = SessionStatus.scored
    session.completed_at = session.completed_at or datetime.now(timezone.utc)

    db.commit()
    db.refresh(score)
    db.refresh(decision)
    return score, decision
