// Tiny fetch wrapper. All requests carry the tenant header (multi-tenant-safe).
const TENANT = "demo-bpo";

async function req(method, path, body) {
  const res = await fetch(path, {
    method,
    headers: { "Content-Type": "application/json", "X-Tenant-Id": TENANT },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status}: ${text}`);
  }
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : res.text();
}

export const api = {
  // Candidate
  consentText: () => req("GET", "/api/candidate/consent-text"),
  startSession: (b) => req("POST", "/api/candidate/sessions", b),
  warmup: (id, message) => req("POST", `/api/candidate/sessions/${id}/warmup`, { message }),
  current: (id) => req("GET", `/api/candidate/sessions/${id}/current`),
  turn: (id, message) => req("POST", `/api/candidate/sessions/${id}/turn`, { message }),
  submit: (id) => req("POST", `/api/candidate/sessions/${id}/submit`),

  // Recruiter
  listSessions: (qs = "") => req("GET", `/api/recruiter/sessions${qs}`),
  sessionDetail: (id) => req("GET", `/api/recruiter/sessions/${id}`),
  rescore: (id) => req("POST", `/api/recruiter/sessions/${id}/rescore`),
  exportUrl: (qs = "") => `/api/recruiter/export.csv${qs}`,
};
