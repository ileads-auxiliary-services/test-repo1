import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client.js";

const DECISIONS = ["", "recommend", "borderline", "reject"];

export default function RecruiterList() {
  const [rows, setRows] = useState([]);
  const [decision, setDecision] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);

  function qs() {
    const p = new URLSearchParams();
    if (decision) p.set("decision", decision);
    if (from) p.set("date_from", from);
    if (to) p.set("date_to", to);
    const s = p.toString();
    return s ? `?${s}` : "";
  }

  async function load() {
    setLoading(true);
    try {
      setRows(await api.listSessions(qs()));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [decision, from, to]);

  return (
    <div className="card">
      <div className="filters">
        <label>Decision
          <select value={decision} onChange={(e) => setDecision(e.target.value)}>
            {DECISIONS.map((d) => <option key={d} value={d}>{d || "All"}</option>)}
          </select>
        </label>
        <label>From<input type="date" value={from} onChange={(e) => setFrom(e.target.value)} /></label>
        <label>To<input type="date" value={to} onChange={(e) => setTo(e.target.value)} /></label>
        <a className="btn" href={api.exportUrl(qs())}>Export CSV</a>
      </div>

      <table className="grid">
        <thead>
          <tr>
            <th>Candidate</th><th>Date</th><th>Decision</th><th>Review?</th>
            <th>Overall</th><th>Lang</th><th>Compr</th><th>Compo</th><th>Coach</th><th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const h = r.headline_scores || {};
            return (
              <tr key={r.session_id}>
                <td>{r.candidate_name}</td>
                <td>{r.created_at ? new Date(r.created_at).toLocaleDateString() : "—"}</td>
                <td><span className={`tag ${r.decision || "none"}`}>{r.decision || "—"}</span></td>
                <td>{r.requires_human_review ? "⚑ yes" : "no"}</td>
                <td>{r.weighted_average ?? "—"}</td>
                <td>{h.language_proficiency ?? "—"}</td>
                <td>{h.comprehension_listening ?? "—"}</td>
                <td>{h.composure_under_pressure ?? "—"}</td>
                <td>{h.coachability ?? "—"}</td>
                <td><Link to={`/recruiter/${r.session_id}`}>View →</Link></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {loading && <p>Loading…</p>}
      {!loading && rows.length === 0 && <p>No sessions yet.</p>}
    </div>
  );
}
