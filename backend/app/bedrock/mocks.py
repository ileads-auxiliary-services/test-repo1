"""Deterministic mock handlers used when BEDROCK_MOCK is true.

These are intentionally simple — they exist so the full pipeline, the test
suite, and the Step-Zero calibration can run without AWS. They are NOT meant to
be realistic personas or a real scorer.
"""
from __future__ import annotations

import json
import re


def customer_mock(system: str, messages: list[dict]) -> str:
    """Echo-ish persona stub: stays terse and vaguely in character."""
    last_user = next((m["content"] for m in reversed(messages) if m["role"] == "user"), "")
    if not last_user:
        return "Haan, boliye."
    # Pretend to de-escalate if the candidate is polite, escalate on rudeness.
    if re.search(r"\b(sorry|apolog|samajh|madad|help)\b", last_user, re.I):
        return "Theek hai, thoda samajh aaya. Aage boliye."
    return "Hmm. Aur batao, isse mera kaam kaise hoga?"


def scorer_mock(system: str, messages: list[dict]) -> str:
    """Return schema-valid JSON so parsing/validation paths are exercised.

    Pulls the first candidate quote out of the transcript so evidence is real.
    """
    transcript = messages[-1]["content"] if messages else ""
    # Transcript lines look like: "[turn 3] candidate: <text>"
    quote, turn_id = "I will help you with that.", 1
    for line in transcript.splitlines():
        m = re.match(r"\[turn (\d+)\]\s+candidate:\s*(.+)", line.strip(), re.I)
        if m:
            turn_id = int(m.group(1))
            quote = m.group(2).strip()
            break

    def dim(score: int) -> dict:
        return {
            "score": score,
            "evidence_quote": quote,
            "evidence_turn_id": turn_id,
            "rationale": "Mock rationale based on the cited utterance.",
        }

    return json.dumps(
        {
            "language_proficiency": dim(4),
            "comprehension_listening": dim(4),
            "composure_under_pressure": dim(3),
            "coachability": dim(4),
            "hard_fail_flags": [],
        }
    )
