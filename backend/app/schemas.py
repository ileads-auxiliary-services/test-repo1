"""Pydantic request/response schemas, including the STRICT scoring schema that
the scorer Bedrock call must conform to.

The spec is explicit that 'the LLM output is the easy part and the parsing is
where bugs hide'. So the scoring contract is a hard pydantic model and the
scorer service validates against it, retrying with a stricter instruction on
failure rather than crashing.
"""
from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, Field, field_validator

from .config import REQUIRED_DIMENSIONS


# --------------------------------------------------------------------------- #
# Candidate-facing flow
# --------------------------------------------------------------------------- #
class ConsentRequest(BaseModel):
    full_name: str
    email: str | None = None
    phone: str | None = None
    candidate_type: str = "fresher"
    consent_given: bool
    consent_text_version: str = "v1"

    @field_validator("consent_given")
    @classmethod
    def _must_consent(cls, v: bool) -> bool:
        if not v:
            raise ValueError("Explicit consent is required to begin (DPDP).")
        return v


class TurnRequest(BaseModel):
    message: str = Field(min_length=1)


class TurnResponse(BaseModel):
    session_id: str
    seq: int
    customer_message: str | None  # the AI customer's reply (None when scenario ends)
    is_warmup: bool
    coachability_injected: bool
    scenario_index: int
    scenario_title: str | None
    scenario_complete: bool
    session_complete: bool


# --------------------------------------------------------------------------- #
# Scoring contract (STRICT) — what the scorer Bedrock call must return.
# --------------------------------------------------------------------------- #
class DimensionScore(BaseModel):
    score: int = Field(ge=1, le=5)
    evidence_quote: str = Field(min_length=1)
    evidence_turn_id: int  # the candidate Turn.seq the quote came from
    rationale: str

    @field_validator("evidence_quote")
    @classmethod
    def _not_placeholder(cls, v: str) -> str:
        if v.strip().lower() in {"n/a", "none", "-"}:
            raise ValueError("Evidence quote is required; must cite a real utterance.")
        return v


class HardFailFlag(BaseModel):
    trigger_id: str
    evidence_quote: str
    evidence_turn_id: int | None = None


class ScoringResult(BaseModel):
    language_proficiency: DimensionScore
    comprehension_listening: DimensionScore
    composure_under_pressure: DimensionScore
    coachability: DimensionScore
    hard_fail_flags: list[HardFailFlag] = []

    def as_dimension_map(self) -> dict[str, DimensionScore]:
        return {d: getattr(self, d) for d in REQUIRED_DIMENSIONS}


# --------------------------------------------------------------------------- #
# Recruiter dashboard
# --------------------------------------------------------------------------- #
class SessionListItem(BaseModel):
    session_id: str
    candidate_name: str
    created_at: datetime | None
    decision: str | None
    requires_human_review: bool | None
    weighted_average: float | None
    headline_scores: dict[str, float] | None


class TurnOut(BaseModel):
    seq: int
    role: str
    content: str
    is_warmup: bool
    is_coachability_probe: bool


class SessionDetail(BaseModel):
    session_id: str
    candidate_name: str
    status: str
    created_at: datetime | None
    completed_at: datetime | None
    transcript: list[TurnOut]
    scores: dict | None
    decision: dict | None
