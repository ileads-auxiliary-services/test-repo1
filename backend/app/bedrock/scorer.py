"""Bedrock call #2 — SCORE THE TRANSCRIPT.

A separate pass over the COMPLETE session transcript. Decoupled from the
conversation engine and individually testable.

Robustness is the point here: the model is asked for strict JSON; we extract,
parse, and validate it against ScoringResult. On failure we retry ONCE with a
stricter instruction. We never crash the caller — a final failure raises a
typed error the service turns into an 'error' session state for human review.
"""
from __future__ import annotations

import json
import re

from pydantic import ValidationError

from ..config import REQUIRED_DIMENSIONS, load_rubric
from ..schemas import ScoringResult
from .client import BedrockClient
from .mocks import scorer_mock


class ScoringParseError(RuntimeError):
    """Raised when the scorer output cannot be coerced into ScoringResult."""


def _rubric_block() -> str:
    rubric = load_rubric()
    lines = []
    for key in REQUIRED_DIMENSIONS:
        d = rubric["dimensions"][key]
        lines.append(f"- {key} ({d['label']}): {d['description'].strip()}")
    triggers = "; ".join(t["id"] + " = " + t["label"] for t in rubric["hard_fail_triggers"])
    scale = rubric["scale"]
    return (
        f"Score each dimension as an integer from {scale['min']} to {scale['max']}.\n"
        + "\n".join(lines)
        + f"\n\nHard-fail trigger ids (flag only if clearly observed): {triggers}"
    )


def build_scoring_system_prompt() -> str:
    return f"""You are a strict, fair QA lead scoring a contact-centre candidate
on a structured simulation. Score ONLY these four TRAINABLE dimensions. Do NOT
score product knowledge, script adherence, or compliance — the candidate was
never taught those.

{_rubric_block()}

For EVERY dimension you MUST quote the exact candidate utterance that earned or
lost points, and give the turn id it came from. Evidence is mandatory.

Return STRICT JSON ONLY, no prose, matching exactly this shape:
{{
  "language_proficiency":     {{"score": <1-5>, "evidence_quote": "<verbatim candidate words>", "evidence_turn_id": <int>, "rationale": "<one sentence>"}},
  "comprehension_listening":  {{"score": <1-5>, "evidence_quote": "...", "evidence_turn_id": <int>, "rationale": "..."}},
  "composure_under_pressure": {{"score": <1-5>, "evidence_quote": "...", "evidence_turn_id": <int>, "rationale": "..."}},
  "coachability":             {{"score": <1-5>, "evidence_quote": "...", "evidence_turn_id": <int>, "rationale": "..."}},
  "hard_fail_flags": [{{"trigger_id": "<id>", "evidence_quote": "...", "evidence_turn_id": <int>}}]
}}
Quote only the CANDIDATE's words as evidence, never the customer's."""


def _extract_json(text: str) -> dict:
    """Pull the first JSON object out of the model text, tolerating fences/prose."""
    fenced = re.search(r"```(?:json)?\s*(\{.*?\})\s*```", text, re.S)
    candidate = fenced.group(1) if fenced else None
    if candidate is None:
        start = text.find("{")
        end = text.rfind("}")
        if start == -1 or end == -1 or end <= start:
            raise ScoringParseError("No JSON object found in scorer output.")
        candidate = text[start : end + 1]
    try:
        return json.loads(candidate)
    except json.JSONDecodeError as exc:
        raise ScoringParseError(f"Scorer output was not valid JSON: {exc}") from exc


class TranscriptScorer:
    def __init__(self, client: BedrockClient | None = None):
        self.client = client or BedrockClient(mock_handler=scorer_mock)

    def score(self, transcript_text: str) -> tuple[ScoringResult, str]:
        """Returns (validated_result, raw_model_text). Retries once on parse/validation failure."""
        system = build_scoring_system_prompt()
        user = (
            "Here is the full candidate transcript. Lines are tagged "
            "'[turn N] role: text'. Score the CANDIDATE.\n\n" + transcript_text
        )

        last_err: Exception | None = None
        for attempt in range(2):
            sys_prompt = system
            if attempt == 1:
                sys_prompt += (
                    "\n\nYOUR PREVIOUS RESPONSE WAS INVALID. Output ONLY the JSON "
                    "object. No markdown, no commentary, all four dimensions present, "
                    "scores as integers 1-5, every evidence_quote a real candidate quote."
                )
            raw = self.client.complete(sys_prompt, [{"role": "user", "content": user}],
                                       max_tokens=1200, temperature=0.0)
            try:
                data = _extract_json(raw)
                return ScoringResult.model_validate(data), raw
            except (ScoringParseError, ValidationError) as exc:
                last_err = exc
                continue

        raise ScoringParseError(f"Scorer failed validation after retry: {last_err}")
