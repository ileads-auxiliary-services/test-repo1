"""Decision layer — maps the four scores to Recommend / Borderline / Reject.

Pure functions, config-driven via decision.yaml, so it is trivially testable and
tunable without code changes.

FAIRNESS INVARIANT enforced here: the tool never presents a FINAL auto-reject.
Every Borderline and every hard-fail is marked ``requires_human_review=True``.
'reject' is advisory — it means 'recommend not advancing', and the recruiter UI
treats it as a recommendation, not a final action.
"""
from __future__ import annotations

from dataclasses import dataclass

from ..config import REQUIRED_DIMENSIONS, load_decision_config, load_rubric
from ..schemas import ScoringResult


@dataclass
class DecisionResult:
    outcome: str  # recommend | borderline | reject
    requires_human_review: bool
    weighted_average: float
    justification: str


def compute_weighted_average(scores: dict[str, float]) -> float:
    cfg = load_decision_config()
    weights = cfg["weights"]
    total_w = sum(weights[d] for d in REQUIRED_DIMENSIONS)
    return round(sum(scores[d] * weights[d] for d in REQUIRED_DIMENSIONS) / total_w, 3)


def decide(result: ScoringResult) -> DecisionResult:
    cfg = load_decision_config()
    rubric = load_rubric()
    dim_map = result.as_dimension_map()
    scores = {d: dim_map[d].score for d in REQUIRED_DIMENSIONS}

    avg = compute_weighted_average(scores)
    has_hard_fail = bool(result.hard_fail_flags)
    below_floor = [d for d in REQUIRED_DIMENSIONS if scores[d] <= cfg["critical_floor"]]

    # Base banding on the weighted average.
    if avg >= cfg["thresholds"]["recommend_min"]:
        outcome = "recommend"
    elif avg < cfg["thresholds"]["reject_max"]:
        outcome = "reject"
    else:
        outcome = "borderline"

    # A critically low single dimension caps the outcome at Borderline.
    if below_floor and outcome == "recommend":
        outcome = "borderline"

    # Hard-fail never auto-rejects on its own; it forces human review.
    requires_review = False
    if has_hard_fail and cfg["human_review"]["on_hard_fail"]:
        requires_review = True
        if outcome == "reject":
            outcome = "borderline"  # never let a hard-fail short-circuit to a final reject
    if outcome == "borderline" and cfg["human_review"]["on_borderline"]:
        requires_review = True

    justification = _justify(outcome, avg, scores, below_floor, result, rubric, requires_review)
    return DecisionResult(outcome, requires_review, avg, justification)


def _justify(outcome, avg, scores, below_floor, result, rubric, requires_review) -> str:
    """A 3-line plain-language summary a non-technical recruiter understands."""
    labels = {k: rubric["dimensions"][k]["label"] for k in REQUIRED_DIMENSIONS}
    strongest = max(scores, key=scores.get)
    weakest = min(scores, key=scores.get)

    line1 = {
        "recommend": "Recommend advancing to the next round.",
        "borderline": "Borderline — needs a human reviewer to make the call.",
        "reject": "Recommend not advancing (advisory — a human can still review).",
    }[outcome]

    line2 = (
        f"Strongest: {labels[strongest]} ({scores[strongest]}/5). "
        f"Weakest: {labels[weakest]} ({scores[weakest]}/5). "
        f"Overall {avg}/5."
    )

    notes = []
    if result.hard_fail_flags:
        ids = ", ".join(f.trigger_id for f in result.hard_fail_flags)
        notes.append(f"Hard-fail flag(s): {ids}.")
    if below_floor:
        notes.append("Critically low on: " + ", ".join(labels[d] for d in below_floor) + ".")
    if requires_review:
        notes.append("Routed to a human reviewer before any decision is final.")
    line3 = " ".join(notes) if notes else "No red flags; scores are internally consistent."

    return f"{line1}\n{line2}\n{line3}"
