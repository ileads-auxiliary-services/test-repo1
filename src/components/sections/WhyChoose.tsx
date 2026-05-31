import { Target, Shield, Cpu, TrendingUp, Clock, Handshake } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

const reasons = [
  { icon: Target, title: "Outcomes, not headcount", text: "We commit to the metrics that move your business — CSAT, conversion, recovery, cost-to-serve — and report against them transparently." },
  { icon: Cpu, title: "AI-native delivery", text: "Automation and analytics are built into every workflow, so you get speed and insight competitors can't match with people alone." },
  { icon: Shield, title: "Security by default", text: "ISO 27001:2013 and ISO 9001:2015 certified controls protect your data and your customers at every step." },
  { icon: TrendingUp, title: "Scale that flexes", text: "10,000+ seats across multiple delivery centers let you scale up for peaks and down again with zero disruption." },
  { icon: Clock, title: "15+ years of rigor", text: "Operating since 2010, we bring process maturity and domain depth across regulated, high-volume industries." },
  { icon: Handshake, title: "True partnership", text: "We embed as an extension of your brand — not a transactional vendor — aligned to your goals and culture." },
];

export function WhyChoose() {
  return (
    <section className="bg-slatey-50 py-24">
      <div className="container-tight grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            eyebrow="Why iLeads"
            title="The credibility of an enterprise. The agility of a partner."
            description="Enterprises and governments choose iLeads when the stakes are high and the experience has to be flawless."
          />
          <Reveal delay={0.15}>
            <div className="mt-8 rounded-3xl border border-slatey-200 bg-white p-7 shadow-soft">
              <p className="text-sm font-semibold uppercase tracking-wider text-electric-600">Engagement model</p>
              <ul className="mt-4 space-y-3 text-sm text-slatey-700">
                <li className="flex gap-3"><span className="font-display font-bold text-ink-900">01</span> Discover — we map your processes, data, and outcomes.</li>
                <li className="flex gap-3"><span className="font-display font-bold text-ink-900">02</span> Design — we build an AI-blended delivery model around your KPIs.</li>
                <li className="flex gap-3"><span className="font-display font-bold text-ink-900">03</span> Deliver — we launch, monitor, and continuously optimize.</li>
              </ul>
            </div>
          </Reveal>
        </div>

        <Stagger className="grid gap-5 sm:grid-cols-2">
          {reasons.map((r) => (
            <StaggerItem key={r.title}>
              <div className="h-full rounded-3xl border border-slatey-200 bg-white p-6 shadow-soft">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-electric-50 text-electric-600 ring-1 ring-inset ring-electric-100">
                  <r.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-base font-semibold text-ink-900">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slatey-600">{r.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
