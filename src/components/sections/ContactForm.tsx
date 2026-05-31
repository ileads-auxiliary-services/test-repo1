"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { company } from "@/data/company";
import { services } from "@/data/services";

type Status = "idle" | "submitting" | "success";

const interests = ["General Enquiry", ...services.map((s) => s.title), "Careers", "Partnership"];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    interest: interests[0],
    message: "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    // No-backend fallback for static hosting: route the enquiry via the user's
    // mail client. Replace with a POST to your CRM/endpoint (e.g. Formspree,
    // HubSpot, or a serverless function) when wiring up live lead routing.
    const subject = encodeURIComponent(`[${form.interest}] Enquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nPhone: ${form.phone}\nInterest: ${form.interest}\n\n${form.message}`,
    );

    setTimeout(() => {
      window.location.href = `mailto:${company.contact.salesEmail}?subject=${subject}&body=${body}`;
      setStatus("success");
    }, 700);
  }

  if (status === "success") {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-slatey-200 bg-white p-10 text-center shadow-soft">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-6 font-display text-xl font-semibold text-ink-900">Thank you — we're on it</h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-slatey-600">
          Your enquiry is ready to send from your mail app. Our team typically responds within one
          business day. You can also reach us directly at{" "}
          <a href={`mailto:${company.contact.salesEmail}`} className="font-semibold text-electric-600">
            {company.contact.salesEmail}
          </a>
          .
        </p>
        <button onClick={() => setStatus("idle")} className="btn-outline mt-7">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-slatey-200 bg-white p-7 shadow-soft sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" required>
          <input required value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClass} placeholder="Jane Sharma" />
        </Field>
        <Field label="Work email" required>
          <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} placeholder="jane@company.com" />
        </Field>
        <Field label="Company">
          <input value={form.company} onChange={(e) => update("company", e.target.value)} className={inputClass} placeholder="Company name" />
        </Field>
        <Field label="Phone">
          <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} placeholder="+91 00000 00000" />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="I'm interested in" required>
          <select required value={form.interest} onChange={(e) => update("interest", e.target.value)} className={inputClass}>
            {interests.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="How can we help?" required>
          <textarea required rows={4} value={form.message} onChange={(e) => update("message", e.target.value)} className={inputClass} placeholder="Tell us about your goals, volumes, and timelines..." />
        </Field>
      </div>

      <button type="submit" disabled={status === "submitting"} className="btn-primary mt-7 w-full disabled:opacity-70">
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Preparing…
          </>
        ) : (
          <>
            Submit enquiry <Send className="h-4 w-4" />
          </>
        )}
      </button>
      <p className="mt-4 text-center text-xs text-slatey-500">
        By submitting, you agree to be contacted by iLeads about your enquiry.
      </p>
    </form>
  );
}

const inputClass =
  "w-full rounded-xl border border-slatey-200 bg-slatey-50 px-4 py-3 text-sm text-ink-900 outline-none transition-colors placeholder:text-slatey-400 focus:border-electric-400 focus:bg-white focus:ring-2 focus:ring-electric-100";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink-900">
        {label} {required && <span className="text-electric-500">*</span>}
      </span>
      {children}
    </label>
  );
}
