"""Decision layer: banding, critical floor, hard-fail never auto-rejects."""
from app.schemas import DimensionScore, HardFailFlag, ScoringResult
from app.services.decision import decide


def _result(lp, comp, compo, coach, flags=None):
    def d(s):
        return DimensionScore(score=s, evidence_quote="x", evidence_turn_id=2, rationale="r")

    return ScoringResult(
        language_proficiency=d(lp),
        comprehension_listening=d(comp),
        composure_under_pressure=d(compo),
        coachability=d(coach),
        hard_fail_flags=flags or [],
    )


def test_high_scores_recommend():
    d = decide(_result(5, 4, 4, 4))
    assert d.outcome == "recommend"
    assert d.requires_human_review is False


def test_low_scores_reject_but_advisory():
    d = decide(_result(2, 2, 2, 2))
    assert d.outcome == "reject"
    # Reject is advisory; the justification makes clear a human can still review.
    assert "human" in d.justification.lower()


def test_mid_scores_borderline_routes_to_human():
    d = decide(_result(3, 3, 3, 3))
    assert d.outcome == "borderline"
    assert d.requires_human_review is True


def test_critical_floor_caps_recommend_to_borderline():
    # Strong average but one dimension at the floor (composure=2) -> not a Recommend.
    d = decide(_result(5, 5, 2, 5))
    assert d.outcome == "borderline"


def test_hard_fail_never_final_reject():
    flags = [HardFailFlag(trigger_id="abusive_language", evidence_quote="...", evidence_turn_id=2)]
    d = decide(_result(1, 1, 1, 1, flags=flags))
    assert d.outcome != "reject"  # forced up to borderline
    assert d.requires_human_review is True
