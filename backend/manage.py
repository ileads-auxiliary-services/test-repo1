"""Small CLI for DB setup, seeding, and the Step-Zero calibration harness.

Usage:
    python manage.py initdb        # create tables
    python manage.py seed          # load scenarios from scenarios/*.json
    python manage.py calibrate IN.json OUT.csv   # Step-Zero: AI-score transcripts
"""
from __future__ import annotations

import json
import sys

from app.database import Base, SessionLocal, engine
from app.services.seed import seed_scenarios


def initdb():
    Base.metadata.create_all(bind=engine)
    print("Tables created.")


def seed():
    db = SessionLocal()
    try:
        n = seed_scenarios(db)
        print(f"Seeded {n} scenarios.")
    finally:
        db.close()


def calibrate(in_path: str, out_path: str):
    """STEP ZERO harness — score hand-collected transcripts so QA leads can
    compare AI scores vs. their own BEFORE the app is trusted.

    Input JSON: [{"candidate": "name", "transcript": "[turn 1] candidate: ..."}]
    Output CSV: one row per transcript with the four dimension scores + decision.
    """
    import csv

    from app.bedrock import TranscriptScorer
    from app.config import REQUIRED_DIMENSIONS
    from app.services.decision import decide

    cases = json.loads(open(in_path, encoding="utf-8").read())
    scorer = TranscriptScorer()
    with open(out_path, "w", newline="", encoding="utf-8") as fh:
        w = csv.writer(fh)
        w.writerow(["candidate", *REQUIRED_DIMENSIONS, "decision", "hard_fails"])
        for c in cases:
            result, _ = scorer.score(c["transcript"])
            dm = result.as_dimension_map()
            d = decide(result)
            w.writerow(
                [c.get("candidate", "")]
                + [dm[x].score for x in REQUIRED_DIMENSIONS]
                + [d.outcome, ";".join(f.trigger_id for f in result.hard_fail_flags)]
            )
    print(f"Wrote calibration scores to {out_path}")


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else ""
    if cmd == "initdb":
        initdb()
    elif cmd == "seed":
        seed()
    elif cmd == "calibrate":
        calibrate(sys.argv[2], sys.argv[3])
    else:
        print(__doc__)
        sys.exit(1)
