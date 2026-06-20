"""The score-the-transcript call is independently testable and parse-robust."""
import json

import pytest

from app.bedrock import BedrockClient, TranscriptScorer
from app.bedrock.scorer import ScoringParseError

TRANSCRIPT = (
    "[turn 1] customer: Tum log chor ho!\n"
    "[turn 2] candidate: Sir main samajh raha hoon, mujhe madad karne dijiye.\n"
    "[turn 3] customer: Jaldi karo!\n"
)


def _valid_payload(quote="Sir main samajh raha hoon, mujhe madad karne dijiye.", turn=2):
    def dim(s):
        return {"score": s, "evidence_quote": quote, "evidence_turn_id": turn, "rationale": "ok"}

    return {
        "language_proficiency": dim(4),
        "comprehension_listening": dim(4),
        "composure_under_pressure": dim(5),
        "coachability": dim(3),
        "hard_fail_flags": [],
    }


def test_parses_clean_json():
    scorer = TranscriptScorer(BedrockClient(mock_handler=lambda s, m: json.dumps(_valid_payload())))
    result, _ = scorer.score(TRANSCRIPT)
    assert result.composure_under_pressure.score == 5
    assert result.coachability.evidence_turn_id == 2


def test_strips_markdown_fence_and_prose():
    noisy = "Sure! Here is the JSON:\n```json\n" + json.dumps(_valid_payload()) + "\n```\nDone."
    scorer = TranscriptScorer(BedrockClient(mock_handler=lambda s, m: noisy))
    result, _ = scorer.score(TRANSCRIPT)
    assert result.language_proficiency.score == 4


def test_retries_once_then_succeeds():
    calls = {"n": 0}

    def handler(system, messages):
        calls["n"] += 1
        if calls["n"] == 1:
            return "totally not json"
        return json.dumps(_valid_payload())

    scorer = TranscriptScorer(BedrockClient(mock_handler=handler))
    result, _ = scorer.score(TRANSCRIPT)
    assert calls["n"] == 2
    assert result.coachability.score == 3


def test_raises_after_retry_failure():
    scorer = TranscriptScorer(BedrockClient(mock_handler=lambda s, m: "nope"))
    with pytest.raises(ScoringParseError):
        scorer.score(TRANSCRIPT)


def test_rejects_out_of_range_score():
    bad = _valid_payload()
    bad["coachability"]["score"] = 9  # invalid, and stays invalid on retry -> raises
    scorer = TranscriptScorer(BedrockClient(mock_handler=lambda s, m: json.dumps(bad)))
    with pytest.raises(ScoringParseError):
        scorer.score(TRANSCRIPT)
