import { Lock, ShieldCheck, FileCheck2, Server, Eye, KeyRound } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { company } from "@/data/company";

const controls = [
  { icon: Lock, title: "Data Protection", text: "Encryption in transit and at rest, with strict data-handling and retention policies." },
  { icon: KeyRound, title: "Access Control", text: "Role-based access, least-privilege principles, and audited authentication." },
  { icon: Server, title: "Secure Infrastructure", text: "Hardened, monitored delivery environments with network segmentation." },
  { icon: Eye, title: "Continuous Monitoring", text: "Real-time monitoring, logging, and incident response across operations." },
  { icon: FileCheck2, title: "Compliance & Audit", text: "ISO-aligned process discipline with audit-ready documentation trails." },
  { icon: ShieldCheck, title: "People Security", text: "Background-verified teams trained in security and confidentiality." },
];

export function SecurityCompliance() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-navy [background-size:46px_46px] opacity-[0.14]" />
      <div className="pointer-events-none absolute -left-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-electric-500/20 blur-[130px]" />
      <div className="container-tight relative grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <SectionHeading
            dark
            eyebrow="Security & Compliance"
            title="Enterprise-grade trust, certified and continuous"
            description="Security isn't a feature at iLeads — it's the foundation. Our certifications and controls let regulated enterprises and governments outsource with confidence."
          />
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-3">
              {company.certifications.map((c) => (
                <div key={c.code} className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3">
                  <div className="font-display text-base font-bold text-white">{c.code}</div>
                  <div className="text-xs text-slatey-400">{c.title}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Stagger className="grid gap-4 sm:grid-cols-2">
          {controls.map((c) => (
            <StaggerItem key={c.title}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-electric-500/15 text-electric-300 ring-1 ring-inset ring-electric-400/20">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-sm font-semibold text-white">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slatey-400">{c.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
