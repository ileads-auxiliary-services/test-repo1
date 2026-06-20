"""Recruiter dashboard API: list, drill-in, filter, CSV export, re-score, review."""
from __future__ import annotations

import csv
import io
from datetime import date, datetime

from fastapi import APIRouter, Depends, Header, HTTPException, Query
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session as DbSession

from ..config import REQUIRED_DIMENSIONS
from ..database import get_db
from ..models import Decision, Score, Session
from ..services import scoring
from ..services.seed import DEFAULT_TENANT

router = APIRouter(prefix="/api/recruiter", tags=["recruiter"])


def tenant(x_tenant_id: str | None = Header(default=None)) -> str:
    return x_tenant_id or DEFAULT_TENANT


def _filtered_sessions(db, tid, decision, date_from, date_to):
    q = db.query(Session).filter(Session.tenant_id == tid)
    if decision:
        q = q.join(Decision).filter(Decision.outcome == decision)
    if date_from:
        q = q.filter(Session.created_at >= datetime.combine(date_from, datetime.min.time()))
    if date_to:
        q = q.filter(Session.created_at <= datetime.combine(date_to, datetime.max.time()))
    return q.order_by(Session.created_at.desc()).all()


def _headline(score: Score | None) -> dict | None:
    if score is None:
        return None
    return {d: getattr(score, d) for d in REQUIRED_DIMENSIONS}


@router.get("/sessions")
def list_sessions(
    db: DbSession = Depends(get_db),
    tid: str = Depends(tenant),
    decision: str | None = Query(default=None),
    date_from: date | None = Query(default=None),
    date_to: date | None = Query(default=None),
):
    sessions = _filtered_sessions(db, tid, decision, date_from, date_to)
    out = []
    for s in sessions:
        out.append(
            {
                "session_id": s.id,
                "candidate_name": s.candidate.full_name,
                "created_at": s.created_at,
                "status": s.status.value,
                "decision": s.decision.outcome.value if s.decision else None,
                "requires_human_review": s.decision.requires_human_review if s.decision else None,
                "weighted_average": s.score.weighted_average if s.score else None,
                "headline_scores": _headline(s.score),
            }
        )
    return out


@router.get("/sessions/{session_id}")
def session_detail(session_id: str, db: DbSession = Depends(get_db), tid: str = Depends(tenant)):
    s = db.get(Session, session_id)
    if s is None or s.tenant_id != tid:
        raise HTTPException(404, "Session not found")

    transcript = [
        {
            "seq": t.seq,
            "role": t.role.value,
            "content": t.content,
            "is_warmup": t.is_warmup,
            "is_coachability_probe": t.is_coachability_probe,
        }
        for t in s.turns
    ]
    scores = None
    if s.score:
        scores = {
            "weighted_average": s.score.weighted_average,
            "dimensions": s.score.evidence,  # per-dimension score + quoted evidence
            "hard_fail_flags": s.score.hard_fail_flags,
            "model_id": s.score.model_id,
        }
    decision = None
    if s.decision:
        decision = {
            "outcome": s.decision.outcome.value,
            "requires_human_review": s.decision.requires_human_review,
            "justification": s.decision.justification,
            "reviewed_by": s.decision.reviewed_by,
            "reviewed_at": s.decision.reviewed_at,
        }
    return {
        "session_id": s.id,
        "candidate_name": s.candidate.full_name,
        "status": s.status.value,
        "created_at": s.created_at,
        "completed_at": s.completed_at,
        "transcript": transcript,
        "scores": scores,
        "decision": decision,
    }


@router.post("/sessions/{session_id}/rescore")
def rescore(session_id: str, db: DbSession = Depends(get_db), tid: str = Depends(tenant)):
    """Idempotent: updates the existing Score/Decision rows, never duplicates."""
    s = db.get(Session, session_id)
    if s is None or s.tenant_id != tid:
        raise HTTPException(404, "Session not found")
    score, decision = scoring.score_session(db, s)
    return {"weighted_average": score.weighted_average, "decision": decision.outcome.value}


@router.post("/sessions/{session_id}/review")
def record_review(
    session_id: str,
    reviewed_by: str,
    final_outcome: str,
    db: DbSession = Depends(get_db),
    tid: str = Depends(tenant),
):
    """Human reviewer records the final call (the human decides, not the tool)."""
    s = db.get(Session, session_id)
    if s is None or s.tenant_id != tid or s.decision is None:
        raise HTTPException(404, "Session/decision not found")
    s.decision.reviewed_by = reviewed_by
    s.decision.reviewed_at = datetime.utcnow()
    s.decision.requires_human_review = False
    db.commit()
    return {"message": "Review recorded", "final_outcome": final_outcome}


@router.get("/export.csv")
def export_csv(
    db: DbSession = Depends(get_db),
    tid: str = Depends(tenant),
    decision: str | None = Query(default=None),
    date_from: date | None = Query(default=None),
    date_to: date | None = Query(default=None),
):
    sessions = _filtered_sessions(db, tid, decision, date_from, date_to)
    buf = io.StringIO()
    writer = csv.writer(buf)
    writer.writerow(
        ["session_id", "candidate", "created_at", "decision", "requires_human_review",
         "weighted_average", *REQUIRED_DIMENSIONS]
    )
    for s in sessions:
        dims = [getattr(s.score, d) if s.score else "" for d in REQUIRED_DIMENSIONS]
        writer.writerow(
            [
                s.id,
                s.candidate.full_name,
                s.created_at.isoformat() if s.created_at else "",
                s.decision.outcome.value if s.decision else "",
                s.decision.requires_human_review if s.decision else "",
                s.score.weighted_average if s.score else "",
                *dims,
            ]
        )
    buf.seek(0)
    return StreamingResponse(
        iter([buf.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=sessions.csv"},
    )
