import React, { useEffect, useState } from "react";
import { api } from "../api/client.js";

// Candidate flow: consent -> warm-up -> scenarios -> neutral close.
// The candidate NEVER sees a score.
const PHASE = { CONSENT: "consent", WARMUP: "warmup", SCENARIO: "scenario", DONE: "done" };

export default function Candidate() {
  const [phase, setPhase] = useState(PHASE.CONSENT);
  const [consentText, setConsentText] = useState("");
  const [form, setForm] = useState({ full_name: "", email: "", candidate_type: "fresher" });
  const [agreed, setAgreed] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  const [thread, setThread] = useState([]); // {who, text}
  const [scenario, setScenario] = useState(null);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [warmupDone, setWarmupDone] = useState(false);

  useEffect(() => {
    api.consentText().then((d) => setConsentText(d.text)).catch(() => {});
  }, []);

  async function begin() {
    setBusy(true);
    try {
      const d = await api.startSession({ ...form, consent_given: true });
      setSessionId(d.session_id);
      setThread([{ who: "system", text: d.warmup_prompt }]);
      setPhase(PHASE.WARMUP);
    } finally {
      setBusy(false);
    }
  }

  function pushCustomer(text) {
    if (text) setThread((t) => [...t, { who: "customer", text }]);
  }

  async function send() {
    if (!input.trim() || busy) return;
    const msg = input.trim();
    setInput("");
    setThread((t) => [...t, { who: "candidate", text: msg }]);
    setBusy(true);
    try {
      if (phase === PHASE.WARMUP) {
        const d = await api.warmup(sessionId, msg);
        pushCustomer(d.warmup_reply);
        setWarmupDone(true);
        if (d.next_scenario) {
          setScenario(d.next_scenario);
          setThread((t) => [
            ...t,
            { who: "system", text: "Practice over. The real scenarios begin now." },
            { who: "customer", text: d.next_scenario.opening_line },
          ]);
          setPhase(PHASE.SCENARIO);
        }
      } else if (phase === PHASE.SCENARIO) {
        const d = await api.turn(sessionId, msg);
        pushCustomer(d.customer_message);
        if (d.session_complete) {
          await api.submit(sessionId);
          setPhase(PHASE.DONE);
        } else if (d.scenario_complete && d.next_scenario) {
          setScenario(d.next_scenario);
          setThread((t) => [
            ...t,
            { who: "system", text: `Next call — ${d.next_scenario.scenario_title}` },
            { who: "customer", text: d.next_scenario.opening_line },
          ]);
        }
      }
    } finally {
      setBusy(false);
    }
  }

  if (phase === PHASE.CONSENT) {
    return (
      <div className="card narrow">
        <h2>Before we begin</h2>
        <p className="consent">{consentText}</p>
        <label>Full name<input value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })} /></label>
        <label>Email (optional)<input value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
        <label>Type
          <select value={form.candidate_type}
            onChange={(e) => setForm({ ...form, candidate_type: e.target.value })}>
            <option value="fresher">Fresher</option>
            <option value="lateral">Lateral</option>
          </select>
        </label>
        <label className="check">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
          I have read the above and consent to take part (DPDP).
        </label>
        <button disabled={!agreed || !form.full_name || busy} onClick={begin}>
          Start exercise
        </button>
      </div>
    );
  }

  if (phase === PHASE.DONE) {
    return (
      <div className="card narrow center">
        <h2>Thank you</h2>
        <p>Your responses have been submitted. A member of our team will be in touch.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="scenario-bar">
        {phase === PHASE.WARMUP
          ? "Practice round — this does not count"
          : scenario && `Call ${scenario.scenario_index + 1}: ${scenario.scenario_title} (${scenario.difficulty})`}
      </div>
      <div className="thread">
        {thread.map((m, i) => (
          <div key={i} className={`bubble ${m.who}`}>
            <span className="who">{m.who === "candidate" ? "You" : m.who === "customer" ? "Customer" : "—"}</span>
            <div>{m.text}</div>
          </div>
        ))}
      </div>
      <div className="composer">
        <textarea value={input} placeholder="Type your reply…" rows={2}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} />
        <button disabled={busy} onClick={send}>{busy ? "…" : "Send"}</button>
      </div>
    </div>
  );
}
