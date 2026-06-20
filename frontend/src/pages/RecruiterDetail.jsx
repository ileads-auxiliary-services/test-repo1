import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api/client.js";

const DIM_LABELS = {
  language_proficiency: "Language proficiency",
  comprehension_listening: "Comprehension & listening",
  composure_under_pressure: "Composure under pressure",
  coachability: "Coachability",
};

export default function RecruiterDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    setData(await api.sessionDetail(id));
  }
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [id]);

  async function rescore() {
    setBusy(true);
    try { await api.rescore(id); await load(); } finally { setBusy(false); }
  }

  if (!data) return <p>Loading…</p>;
  const { decision, scores } = data;

  return (
    <div className="detail">
      <Link to="/recruiter">← Back</Link>
      <div className="card">
        <div className="row spread">
          <h2>{data.candidate_name}</h2>
          <button onClick={rescore} disabled={busy}>{busy ? "Re-scoring…" : "Re-score"}</button>
        </div>

        {decision && (
          <div className={`decision-box ${decision.outcome}`}>
            <div className="row spread">
              <strong className="up">{decision.outcome}</strong>
              {decision.requires_human_review && <span className="tag borderline">⚑ Needs human review</span>}
            </div>
            <pre className="justification">{decision.justification}</pre>
            {decision.reviewed_by && <small>Reviewed by {decision.reviewed_by}</small>}
          </div>
        )}

        {scores && (
          <>
            <h3>Scores &amp; evidence <small>overall {scores.weighted_average}/5</small></h3>
            {scores.hard_fail_flags?.length > 0 && (
              <div className="hardfail">
                Hard-fail flags: {scores.hard_fail_flags.map((f) => f.trigger_id).join(", ")}
              </div>
            )}
            <div className="dims">
              {Object.entries(DIM_LABELS).map(([key, label]) => {
                const d = scores.dimensions[key];
                if (!d) return null;
                return (
                  <div className="dim" key={key}>
                    <div className="row spread">
                      <strong>{label}</strong><span className="score">{d.score}/5</span>
                    </div>
                    <blockquote>“{d.evidence_quote}” <span className="turnref">(turn {d.evidence_turn_id})</span></blockquote>
                    <p className="rationale">{d.rationale}</p>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {!scores && <p>Not scored yet (status: {data.status}).</p>}
      </div>

      <div className="card">
        <h3>Annotated transcript</h3>
        <div className="thread">
          {data.transcript.map((t) => (
            <div key={t.seq} className={`bubble ${t.role}`}>
              <span className="who">
                [{t.seq}] {t.role}
                {t.is_warmup && " · warm-up (unscored)"}
                {t.is_coachability_probe && " · ⚑ coachability probe"}
              </span>
              <div>{t.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
