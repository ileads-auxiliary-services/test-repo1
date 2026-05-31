import type { Metadata } from "next";
import { Target, Eye, MapPin, Building2, ShieldCheck, Award } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { JsonLd } from "@/components/ui/JsonLd";
import { company } from "@/data/company";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About iLeads — Our Story, Leadership & Mission",
  description:
    "iLeads is an AI-powered BPM and CX partner founded in 2010. Discover our story, mission, values, leadership team, certifications, and PAN-India delivery footprint.",
  path: "/about/",
  keywords: ["about iLeads", "BPO company India", "iLeads Auxiliary Services", "BPM company Dehradun"],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about/" }])} />
      <PageHero
        eyebrow="About iLeads"
        title="From a Dehradun startup to an AI-powered BPM partner"
        description={company.description}
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Story + stats */}
      <section className="py-24">
        <div className="container-tight grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="eyebrow">Our story</span>
            <h2 className="display-heading mt-5 text-3xl font-semibold text-ink-900 sm:text-4xl">
              Built on service. Scaled by trust. Transformed by AI.
            </h2>
            <div className="mt-6 space-y-4 text-slatey-600">
              <p>
                Founded in 2010 in Dehradun, iLeads began as a focused data, business, and
                call-processing team with an outsized ambition: to prove that world-class customer
                operations could be delivered from the heart of Uttarakhand. Today we are among the
                fastest-growing BPO, KPO, and ITES companies in the nation.
              </p>
              <p>
                Over fifteen years we have grown into a PAN-India business process management
                partner — incorporated as iLeads Auxiliary Services Pvt. Ltd., recognized by Startup
                India and Startup Uttarakhand, and honored as Best Start Up 2020 by the Chamber of
                Commerce & Industry of India.
              </p>
              <p>
                We operate on best-in-class infrastructure with 10,000+ seats and more than 10,000
                people — highly qualified leadership working alongside our most skilled associates —
                offering exclusive, end-to-end outsourcing support to every client. Now, by uniting
                that talent with intelligent automation, certified security, and a relentless focus
                on outcomes, iLeads delivers as an AI-powered BPM and Customer Experience partner.
              </p>
            </div>
          </div>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {company.stats.map((s) => (
                <div key={s.label} className="rounded-3xl border border-slatey-200 bg-slatey-50 p-6">
                  <div className="font-display text-3xl font-bold text-ink-900">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-2 text-sm font-semibold text-ink-900">{s.label}</div>
                  <div className="text-xs text-slatey-500">{s.detail}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="bg-slatey-50 py-24">
        <div className="container-tight grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-slatey-200 bg-white p-9 shadow-soft">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-electric-50 text-electric-600 ring-1 ring-inset ring-electric-100">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-ink-900">Our Mission</h3>
              <p className="mt-3 leading-relaxed text-slatey-600">{company.mission}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border border-slatey-200 bg-white p-9 shadow-soft">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-navy-50 text-navy-600 ring-1 ring-inset ring-navy-100">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-ink-900">Our Vision</h3>
              <p className="mt-3 leading-relaxed text-slatey-600">{company.vision}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container-tight">
          <SectionHeading eyebrow="Our values" title="The principles behind every engagement" align="center" className="mx-auto" />
          <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {company.values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="h-full rounded-3xl border border-slatey-200 bg-white p-7 shadow-soft">
                  <h3 className="font-display text-lg font-semibold text-ink-900">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slatey-600">{v.description}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative overflow-hidden bg-ink-950 py-24 text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid-navy [background-size:46px_46px] opacity-[0.14]" />
        <div className="container-tight relative">
          <SectionHeading dark eyebrow="Growth journey" title="Fifteen years of momentum" align="center" className="mx-auto" />
          <div className="relative mx-auto mt-16 max-w-3xl">
            <div className="absolute left-[15px] top-2 h-full w-px bg-white/15 sm:left-1/2" />
            <div className="space-y-10">
              {company.timeline.map((t, i) => (
                <Reveal key={t.year} delay={i * 0.04}>
                  <div className={`relative flex gap-6 sm:w-1/2 ${i % 2 === 0 ? "sm:pr-12" : "sm:ml-auto sm:flex-row-reverse sm:pl-12 sm:text-right"}`}>
                    <div className="absolute left-0 top-1.5 grid h-8 w-8 -translate-x-px place-items-center rounded-full border border-electric-400/40 bg-ink-900 sm:left-auto sm:right-[-16px] sm:translate-x-1/2">
                      <span className="h-2.5 w-2.5 rounded-full bg-electric-400" />
                    </div>
                    <div className={`${i % 2 === 0 ? "" : "sm:order-1"} ml-12 sm:ml-0`}>
                      <span className="font-display text-sm font-bold text-electric-300">{t.year}</span>
                      <h3 className="mt-1 font-display text-lg font-semibold text-white">{t.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slatey-400">{t.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24">
        <div className="container-tight">
          <SectionHeading eyebrow="Leadership" title="A visionary board and a dynamic team" description="Experienced leaders steering iLeads toward its AI-powered future." />
          <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
            {company.leadership.map((leader) => (
              <StaggerItem key={leader.name}>
                <div className="h-full rounded-3xl border border-slatey-200 bg-white p-7 shadow-soft">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-electric-400 to-navy-600 font-display text-xl font-bold text-white">
                    {leader.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink-900">{leader.name}</h3>
                  <p className="text-sm font-medium text-electric-600">{leader.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slatey-600">{leader.bio}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Infrastructure + Locations */}
      <section className="bg-slatey-50 py-24">
        <div className="container-tight grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <span className="eyebrow">Infrastructure & locations</span>
            <h2 className="display-heading mt-5 text-3xl font-semibold text-ink-900">
              A resilient, PAN-India delivery footprint
            </h2>
            <p className="mt-4 text-slatey-600">
              Geographically distributed delivery centers with 10,000+ seats give our clients
              business continuity, surge capacity, and always-on coverage — backed by secure,
              monitored infrastructure.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slatey-200 bg-white p-5">
                <Building2 className="h-6 w-6 text-electric-600" />
                <div className="mt-3 font-display text-2xl font-bold text-ink-900">10,000+</div>
                <div className="text-xs text-slatey-500">Seats across centers</div>
              </div>
              <div className="rounded-2xl border border-slatey-200 bg-white p-5">
                <ShieldCheck className="h-6 w-6 text-electric-600" />
                <div className="mt-3 font-display text-2xl font-bold text-ink-900">24/7</div>
                <div className="text-xs text-slatey-500">Secure operations</div>
              </div>
            </div>
          </div>

          <Stagger className="grid gap-4 sm:grid-cols-2">
            {company.locations.map((loc, i) => (
              <StaggerItem key={i}>
                <div className="h-full rounded-3xl border border-slatey-200 bg-white p-6 shadow-soft">
                  <div className="flex items-center justify-between">
                    <MapPin className="h-5 w-5 text-electric-600" />
                    {loc.hq && <span className="rounded-full bg-electric-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-electric-700">HQ</span>}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink-900">{loc.city}</h3>
                  <p className="text-xs font-medium text-slatey-500">{loc.role} · {loc.state}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slatey-600">{loc.address}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24">
        <div className="container-tight">
          <SectionHeading eyebrow="Certifications & recognition" title="Credentials that earn enterprise trust" align="center" className="mx-auto" />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {company.certifications.map((c) => (
              <StaggerItem key={c.code}>
                <div className="h-full rounded-3xl border border-slatey-200 bg-white p-6 text-center shadow-soft">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-electric-50 text-electric-600 ring-1 ring-inset ring-electric-100">
                    <Award className="h-6 w-6" />
                  </div>
                  <div className="mt-5 font-display text-base font-bold text-ink-900">{c.code}</div>
                  <div className="text-sm font-medium text-electric-600">{c.title}</div>
                  <p className="mt-3 text-xs leading-relaxed text-slatey-500">{c.blurb}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {company.recognition.map((r) => (
                <span key={r} className="rounded-full border border-slatey-200 bg-slatey-50 px-4 py-2 text-sm font-medium text-slatey-700">{r}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
