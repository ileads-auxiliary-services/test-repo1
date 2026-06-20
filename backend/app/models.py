"""ORM models: Candidate, Session, Scenario, Turn, Score, Decision.

Notes on the schema decisions called out in the spec:

* Multi-tenant-safe: every row carries a ``tenant_id``. All recruiter queries
  filter by it. (In V1 there is one tenant seeded; the column exists so a second
  customer never requires a migration.)

* Idempotent scoring: ``Score`` and ``Decision`` each have a UNIQUE constraint on
  ``session_id``. Re-running the scoring job UPDATES the existing row instead of
  inserting a duplicate (see services/scoring.py).

* Forward-looking floor-performance link: ``Session`` and ``Score`` carry nullable
  ``floor_performance_id`` / ``floor_outcome`` columns, unpopulated in V1. When
  real on-floor outcomes exist, they attach here so predictive validity can be
  measured later — WITHOUT a schema change.
"""
from __future__ import annotations

import enum
import uuid
from datetime import datetime

from sqlalchemy import (
    JSON,
    DateTime,
    Enum,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
    UniqueConstraint,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .database import Base


def _uuid() -> str:
    return str(uuid.uuid4())


class SessionStatus(str, enum.Enum):
    consented = "consented"
    in_progress = "in_progress"
    completed = "completed"      # candidate finished all turns
    scored = "scored"            # scoring pass complete
    error = "error"


class DecisionOutcome(str, enum.Enum):
    recommend = "recommend"
    borderline = "borderline"
    reject = "reject"            # advisory only — never a final auto-reject


class TurnRole(str, enum.Enum):
    customer = "customer"        # AI-played persona
    candidate = "candidate"      # the person being screened
    system = "system"            # injected coachability prompt / markers


class Candidate(Base):
    __tablename__ = "candidates"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    tenant_id: Mapped[str] = mapped_column(String(64), index=True, nullable=False)
    full_name: Mapped[str] = mapped_column(String(200), nullable=False)
    email: Mapped[str | None] = mapped_column(String(200), nullable=True)
    phone: Mapped[str | None] = mapped_column(String(40), nullable=True)
    candidate_type: Mapped[str] = mapped_column(String(20), default="fresher")  # fresher|lateral
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    sessions: Mapped[list["Session"]] = relationship(back_populates="candidate")


class Scenario(Base):
    __tablename__ = "scenarios"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    tenant_id: Mapped[str] = mapped_column(String(64), index=True, nullable=False)
    slug: Mapped[str] = mapped_column(String(80), nullable=False)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    difficulty: Mapped[str] = mapped_column(String(10), nullable=False)  # easy|medium|hard
    order_index: Mapped[int] = mapped_column(Integer, nullable=False)
    # The full authored scenario JSON (persona, mood, backstory, opening_line,
    # win_condition, coachability_prompt, curveball, hard_fail_triggers, ...).
    spec: Mapped[dict] = mapped_column(JSON, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    __table_args__ = (UniqueConstraint("tenant_id", "slug", name="uq_scenario_tenant_slug"),)


class Session(Base):
    __tablename__ = "sessions"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    tenant_id: Mapped[str] = mapped_column(String(64), index=True, nullable=False)
    candidate_id: Mapped[str] = mapped_column(ForeignKey("candidates.id"), nullable=False)

    status: Mapped[SessionStatus] = mapped_column(
        Enum(SessionStatus), default=SessionStatus.consented, nullable=False
    )
    # DPDP consent capture.
    consent_given: Mapped[bool] = mapped_column(default=False, nullable=False)
    consent_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    consent_text_version: Mapped[str | None] = mapped_column(String(40), nullable=True)

    current_scenario_index: Mapped[int] = mapped_column(Integer, default=0)

    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    completed_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)

    # --- Forward-looking floor-performance link (UNUSED in V1) ---
    floor_performance_id: Mapped[str | None] = mapped_column(String(64), nullable=True)
    floor_outcome: Mapped[str | None] = mapped_column(String(40), nullable=True)

    candidate: Mapped["Candidate"] = relationship(back_populates="sessions")
    turns: Mapped[list["Turn"]] = relationship(
        back_populates="session", order_by="Turn.seq", cascade="all, delete-orphan"
    )
    score: Mapped["Score | None"] = relationship(
        back_populates="session", uselist=False, cascade="all, delete-orphan"
    )
    decision: Mapped["Decision | None"] = relationship(
        back_populates="session", uselist=False, cascade="all, delete-orphan"
    )


class Turn(Base):
    __tablename__ = "turns"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    tenant_id: Mapped[str] = mapped_column(String(64), index=True, nullable=False)
    session_id: Mapped[str] = mapped_column(ForeignKey("sessions.id"), nullable=False, index=True)
    scenario_id: Mapped[str | None] = mapped_column(ForeignKey("scenarios.id"), nullable=True)

    seq: Mapped[int] = mapped_column(Integer, nullable=False)  # global order within the session
    role: Mapped[TurnRole] = mapped_column(Enum(TurnRole), nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)

    # True for the unscored warm-up turn — excluded from the scoring transcript.
    is_warmup: Mapped[bool] = mapped_column(default=False, nullable=False)
    # True for the system-injected coachability correction, so the scorer can
    # locate the exact moment to evaluate "did they apply the correction".
    is_coachability_probe: Mapped[bool] = mapped_column(default=False, nullable=False)

    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    session: Mapped["Session"] = relationship(back_populates="turns")

    __table_args__ = (UniqueConstraint("session_id", "seq", name="uq_turn_session_seq"),)


class Score(Base):
    __tablename__ = "scores"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    tenant_id: Mapped[str] = mapped_column(String(64), index=True, nullable=False)
    # UNIQUE -> one score row per session; re-scoring updates in place (idempotent).
    session_id: Mapped[str] = mapped_column(ForeignKey("sessions.id"), nullable=False)

    language_proficiency: Mapped[float] = mapped_column(Float, nullable=False)
    comprehension_listening: Mapped[float] = mapped_column(Float, nullable=False)
    composure_under_pressure: Mapped[float] = mapped_column(Float, nullable=False)
    coachability: Mapped[float] = mapped_column(Float, nullable=False)
    weighted_average: Mapped[float] = mapped_column(Float, nullable=False)

    # Per-dimension quoted evidence + hard-fail flags + model metadata.
    evidence: Mapped[dict] = mapped_column(JSON, nullable=False)
    hard_fail_flags: Mapped[list] = mapped_column(JSON, default=list)

    model_id: Mapped[str | None] = mapped_column(String(120), nullable=True)
    rubric_version: Mapped[str | None] = mapped_column(String(40), nullable=True)
    raw_response: Mapped[str | None] = mapped_column(Text, nullable=True)

    # --- Forward-looking floor-performance link (UNUSED in V1) ---
    floor_outcome_score: Mapped[float | None] = mapped_column(Float, nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.now(), onupdate=func.now()
    )

    session: Mapped["Session"] = relationship(back_populates="score")

    __table_args__ = (UniqueConstraint("session_id", name="uq_score_session"),)


class Decision(Base):
    __tablename__ = "decisions"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    tenant_id: Mapped[str] = mapped_column(String(64), index=True, nullable=False)
    session_id: Mapped[str] = mapped_column(ForeignKey("sessions.id"), nullable=False)

    outcome: Mapped[DecisionOutcome] = mapped_column(Enum(DecisionOutcome), nullable=False)
    requires_human_review: Mapped[bool] = mapped_column(default=True, nullable=False)
    justification: Mapped[str] = mapped_column(Text, nullable=False)  # 3-line recruiter summary
    reviewed_by: Mapped[str | None] = mapped_column(String(120), nullable=True)
    reviewed_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.now(), onupdate=func.now()
    )

    session: Mapped["Session"] = relationship(back_populates="decision")

    __table_args__ = (UniqueConstraint("session_id", name="uq_decision_session"),)
