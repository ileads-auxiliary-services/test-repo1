# BPO Agent Screening Tool (V1)

A text-first, turn-based tool that screens new contact-centre candidates
(freshers / laterals) for a **Hindi-first voice BPO** by simulating customer
calls and scoring **trainable traits**.

> **What this tool is — and is not.**
> The rubric is the product; the AI conversation only exists to elicit a
> behaviour sample. V1 measures **consistency with your best human screeners**,
> not predictive validity (there is no linked floor-performance data yet). The
> AI **filters and recommends; humans decide** — the tool never issues a final
> auto-reject. Every Borderline and every hard-fail is routed to a human.

It scores exactly four **trainable** dimensions and never scores product
knowledge, script adherence, or compliance (candidates know none of that yet):

1. **Language proficiency** — clarity, fluency, Hindi/Hinglish/English handling
2. **Comprehension & listening** — did they understand and respond relevantly
3. **Composure under pressure** — held up vs. crumbled with the angry customer
4. **Coachability** — did they apply the mid-conversation correction

---

## Architecture

```
React (Vite)                         FastAPI (Python)                 AWS Bedrock
 ├─ Candidate flow  ──/api/candidate──► conversation engine ──call #1─► be-the-customer
 │   consent→warmup→scenarios→close                                     (Claude persona)
 └─ Recruiter dash  ──/api/recruiter──► scoring (separate pass) ─call #2─► score-transcript
     list / drill-in / filter / CSV       │                              (Claude scorer)
                                          ▼
                                   PostgreSQL (ap-south-1)
                       Candidate · Session · Scenario · Turn · Score · Decision
```

The two Bedrock calls are **cleanly separated and individually testable**
(`app/bedrock/customer.py`, `app/bedrock/scorer.py`). The rubric and decision
thresholds are **config-driven** (`config/rubric.yaml`, `config/decision.yaml`)
so QA leads can tune them without code changes.

### Key design decisions

- **Idempotent scoring** — `Score` and `Decision` are `UNIQUE` on `session_id`;
  re-running a scoring job updates the rows in place, never duplicates.
- **Forward-looking floor-performance link** — `Session.floor_performance_id`
  /`floor_outcome` and `Score.floor_outcome_score` exist now but are unused.
  Real on-floor outcomes attach there later (to measure predictive validity)
  **without a migration**.
- **Multi-tenant-safe** — every row carries `tenant_id`; all queries filter by it
  (passed via the `X-Tenant-Id` header, default `demo-bpo`).
- **Parse-hardened scorer** — the scorer demands strict JSON, then extracts,
  parses, and validates it against a Pydantic schema; on failure it retries once
  with a stricter instruction and otherwise flags the session for human review
  rather than crashing.
- **Evidence is mandatory** — every dimension score must quote the exact
  candidate utterance (with turn id) that earned/lost the points.

---

## Run it locally

### Option A — Docker (Postgres + backend)

```bash
docker compose up --build         # backend on http://localhost:8000 (Bedrock mocked)
cd frontend && npm install && npm run dev   # UI on http://localhost:5173
```

### Option B — manual

```bash
# 1) Postgres (or use docker compose up db)
# 2) Backend
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env               # BEDROCK_MOCK=true by default
python manage.py initdb            # create tables
python manage.py seed              # load scenarios/*.json
uvicorn app.main:app --reload      # http://localhost:8000/docs

# 3) Frontend
cd ../frontend && npm install && npm run dev
```

Open **http://localhost:5173/screen** to take the screen as a candidate, then
**http://localhost:5173/recruiter** to review the result.

### Mock vs. real Bedrock

`BEDROCK_MOCK=true` (default) runs the whole pipeline with deterministic stubs —
no AWS, no spend — so the app, the tests, and the Step-Zero calibration all run
offline. Set `BEDROCK_MOCK=false`, configure AWS credentials (boto3 chain) and
`BEDROCK_MODEL_ID` for a Claude model in `ap-south-1` to use real Bedrock.

---

## Tests

```bash
cd backend && source .venv/bin/activate && pytest -q
```

Covers: the be-the-customer call, the scorer (clean JSON, fenced JSON, retry,
hard failure, out-of-range rejection), decision banding / critical-floor /
"hard-fail never auto-rejects", the full conversation flow incl. coachability
injection, scoring idempotency, and mandatory per-dimension evidence.

---

## Step Zero — validate the rubric BEFORE trusting the tool

Do this for the price of one afternoon. Collect 15–20 real candidate transcripts,
have **two QA leads independently score them**, then run the AI scorer and compare.

```bash
# input: [{"candidate":"Asha","transcript":"[turn 1] candidate: ..."}]
python manage.py calibrate transcripts.json ai_scores.csv
```

If AI and humans broadly agree → the rubric is real; ship the tool around it.
If they don't → fix `config/rubric.yaml` first, before writing more app code.

---

## Swapping in new scenarios

Scenarios are authored JSON in `backend/scenarios/` (identical set for every
candidate, so candidates are comparable and rejects are defensible). To add one:

1. Drop a new `*.json` file in `backend/scenarios/` with this shape:

```json
{
  "slug": "unique_slug",
  "title": "Human-readable title",
  "difficulty": "easy|medium|hard",
  "order_index": 4,
  "persona": "Who the customer is",
  "mood": "Their emotional state",
  "backstory": "Context the customer has",
  "opening_line": "First thing the candidate sees",
  "win_condition": "What resolves the call",
  "coachability_prompt": "Mid-call instruction the candidate must apply",
  "coachability_turn": 2,
  "curveball": "An off-script line the script doesn't cover",
  "curveball_turn": 3,
  "max_turns": 5,
  "hard_fail_triggers": [{"id": "abusive_language", "label": "..."}]
}
```

2. `python manage.py seed` (idempotent upsert by `slug`).

Three rising-difficulty scenarios ship by default: an easy info call, a mild
objection, and an angry/abusive customer.

---

## Tuning scoring & decisions (no code changes)

- `config/rubric.yaml` — the four dimensions, 1–5 anchors, and hard-fail triggers.
- `config/decision.yaml` — dimension weights, `recommend_min` / `reject_max`
  thresholds, the `critical_floor` (a single low dimension caps the outcome at
  Borderline), and the human-review routing rules.

---

## Out of scope for V1 (by design)

Real-time / full-duplex voice (iteration 2 is turn-based voice via Sarvam batch
STT), generative scenarios, accent/prosody/emotion-from-audio scoring,
typing-speed/personality profiling, auto-calibration against live QMS scores,
gamification, and any cross-lifecycle "Agent Readiness Score".
