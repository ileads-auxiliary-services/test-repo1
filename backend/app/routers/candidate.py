"""Candidate-facing flow: consent -> warm-up -> scenarios -> neutral close.

The candidate NEVER sees a score. Scoring runs as a separate pass on submit.
"""
from __future__ import annotations

from datetime import datetime, timezone

from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session as DbSession

from ..database import get_db
from ..models import Candidate, Session, SessionStatus
from ..schemas import ConsentRequest, TurnRequest
from ..services import conversation, scoring
from ..services.seed import DEFAULT_TENANT

router = APIRouter(prefix="/api/candidate", tags=["candidate"])


def tenant(x_tenant_id: str | None = Header(default=None)) -> str:
    return x_tenant_id or DEFAULT_TENANT


CONSENT_TEXT = (
    "This is a structured exercise that simulates customer calls. Your typed "
    "responses are recorded and scored with AI assistance, and a human reviews "
    "the result before any decision is made. You can stop at any time."
)


def _get_session(db: DbSession, tid: str, session_id: str) -> Session:
    s = db.get(Session, session_id)
    if s is None or s.tenant_id != tid:
        raise HTTPException(404, "Session not found")
    return s


@router.get("/consent-text")
def consent_text():
    return {"version": "v1", "text": CONSENT_TEXT}


@router.post("/sessions")
def start_session(body: ConsentRequest, db: DbSession = Depends(get_db), tid: str = Depends(tenant)):
    candidate = Candidate(
        tenant_id=tid,
        full_name=body.full_name,
        email=body.email,
        phone=body.phone,
        candidate_type=body.candidate_type,
    )
    db.add(candidate)
    db.flush()

    session = Session(
        tenant_id=tid,
        candidate_id=candidate.id,
        status=SessionStatus.consented,
        consent_given=True,
        consent_at=datetime.now(timezone.utc),
        consent_text_version=body.consent_text_version,
    )
    db.add(session)
    db.commit()

    return {
        "session_id": session.id,
        "warmup_prompt": "Practice round (not scored): say hello and introduce yourself in a sentence.",
    }


@router.post("/sessions/{session_id}/warmup")
def warmup(session_id: str, body: TurnRequest, db: DbSession = Depends(get_db),
           tid: str = Depends(tenant)):
    session = _get_session(db, tid, session_id)
    result = conversation.post_warmup(db, session, body.message)
    opening = conversation.opening_line_for_current_scenario(db, session)
    return {"warmup_reply": result["customer_message"], "next_scenario": opening}


@router.get("/sessions/{session_id}/current")
def current(session_id: str, db: DbSession = Depends(get_db), tid: str = Depends(tenant)):
    session = _get_session(db, tid, session_id)
    opening = conversation.opening_line_for_current_scenario(db, session)
    if opening is None:
        return {"session_complete": True}
    return opening


@router.post("/sessions/{session_id}/turn")
def turn(session_id: str, body: TurnRequest, db: DbSession = Depends(get_db),
         tid: str = Depends(tenant)):
    session = _get_session(db, tid, session_id)
    if session.status in (SessionStatus.completed, SessionStatus.scored):
        raise HTTPException(409, "Session already complete")
    result = conversation.post_turn(db, session, body.message)
    # When a scenario completes, hand back the next scenario's opening line.
    if result["scenario_complete"] and not result["session_complete"]:
        result["next_scenario"] = conversation.opening_line_for_current_scenario(db, session)
    return result


@router.post("/sessions/{session_id}/submit")
def submit(session_id: str, db: DbSession = Depends(get_db), tid: str = Depends(tenant)):
    """Neutral close. Triggers the separate scoring pass; candidate sees no score."""
    session = _get_session(db, tid, session_id)
    if session.status not in (SessionStatus.completed, SessionStatus.scored):
        session.status = SessionStatus.completed
        session.completed_at = datetime.now(timezone.utc)
        db.commit()
    try:
        scoring.score_session(db, session)
    except Exception:
        # Never expose scoring failures to the candidate; flag for human review.
        session.status = SessionStatus.error
        db.commit()
    return {"message": "Thank you. Your responses have been submitted."}
