"""End-to-end-ish tests on a real (sqlite) DB: conversation flow + idempotent scoring."""
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.database import Base
from app.models import Candidate, Decision, Score, Session, SessionStatus, Turn, TurnRole
from app.services import conversation, scoring
from app.services.seed import seed_scenarios


@pytest.fixture
def db():
    engine = create_engine("sqlite:///:memory:", future=True)
    Base.metadata.create_all(engine)
    Sess = sessionmaker(bind=engine, expire_on_commit=False, future=True)
    s = Sess()
    yield s
    s.close()


def _new_session(db, tenant="t1"):
    c = Candidate(tenant_id=tenant, full_name="Test Candidate")
    db.add(c)
    db.flush()
    s = Session(tenant_id=tenant, candidate_id=c.id, status=SessionStatus.consented,
                consent_given=True)
    db.add(s)
    db.commit()
    return s


def test_full_conversation_runs_all_scenarios_and_injects_coachability(db):
    seed_scenarios(db, "t1")
    session = _new_session(db)

    conversation.post_warmup(db, session, "Hi, I'm ready.")
    assert any(t.is_warmup for t in session.turns)

    saw_coachability = False
    guard = 0
    while session.status != SessionStatus.completed and guard < 50:
        guard += 1
        res = conversation.post_turn(db, session, "Sir main aapki madad karta hoon, sorry.")
        saw_coachability = saw_coachability or res["coachability_injected"]

    assert session.status == SessionStatus.completed
    assert saw_coachability, "coachability prompt was never injected"
    # Warm-up turns must exist but are excluded from the scored transcript.
    transcript = scoring.build_transcript_text(session.turns)
    assert "warmup" not in transcript.lower()
    assert "candidate:" in transcript


def test_scoring_is_idempotent(db):
    seed_scenarios(db, "t1")
    session = _new_session(db)
    # Minimal transcript so the scorer has a candidate utterance to quote.
    db.add(Turn(tenant_id="t1", session_id=session.id, seq=1, role=TurnRole.customer,
                content="Mera balance batao"))
    db.add(Turn(tenant_id="t1", session_id=session.id, seq=2, role=TurnRole.candidate,
                content="Ji main abhi batata hoon"))
    session.status = SessionStatus.completed
    db.commit()

    scoring.score_session(db, session)
    scoring.score_session(db, session)  # re-run

    assert db.query(Score).filter_by(session_id=session.id).count() == 1
    assert db.query(Decision).filter_by(session_id=session.id).count() == 1


def test_score_has_evidence_for_every_dimension(db):
    seed_scenarios(db, "t1")
    session = _new_session(db)
    db.add(Turn(tenant_id="t1", session_id=session.id, seq=1, role=TurnRole.candidate,
                content="Namaste, main madad karunga"))
    session.status = SessionStatus.completed
    db.commit()

    score, _ = scoring.score_session(db, session)
    for dim, payload in score.evidence.items():
        assert payload["evidence_quote"], f"{dim} missing evidence quote"
        assert "evidence_turn_id" in payload
