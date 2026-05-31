import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GraduationCap, HeartHandshake, TrendingUp, Sparkles, Users, ShieldCheck, Quote } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { company } from "@/data/company";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Careers at iLeads — Build the Future of Customer Experience",
  description:
    "Join iLeads, an AI-powered BPM and CX company. Explore our culture, benefits, learning programs, and growth opportunities across PAN-India delivery centers.",
  path: "/careers/",
  keywords: ["iLeads careers", "BPO jobs India", "call center jobs Dehradun", "customer support jobs", "BPM careers"],
});

const benefits = [
  { icon: GraduationCap, title: "Learn & Get Certified", text: "Structured training, communication coaching, and upskilling in AI-enabled tools from day one." },
  { icon: TrendingUp, title: "Real Growth Paths", text: "Clear progression from associate to team leader, QA, and operations management." },
  { icon: HeartHandshake, title: "People-First Culture", text: "A supportive, inclusive workplace where engaged teams do their best work." },
  { icon: Sparkles, title: "Work with AI", text: "Hands-on experience with agent-assist, analytics, and modern delivery technology." },
  { icon: Users, title: "Team & Community", text: "Vibrant teams, recognition programs, and events that make work rewarding." },
  { icon: ShieldCheck, title: "Stability & Security", text: "A recognized, certified employer with 15+ years of growth and a PAN-India footprint." },
];

const culture = [
  { stat: "10,000+", label: "Team members & seats" },
  { stat: "15+", label: "Years of growth" },
  { stat: "5", label: "Delivery centers" },
  { stat: "24/7", label: "Shifts & flexibility" },
];

const stories = [
  { quote: "I joined as a voice associate and grew into a team leader within two years. iLeads invests in people who are hungry to learn.", name: "Team Leader", dept: "Customer Experience" },
  { quote: "The training here is real. I learned to use agent-assist and analytics tools that most people never touch in this industry.", name: "Senior Associate", dept: "Sales Operations" },
  { quote: "It's a place where effort gets noticed. The culture is supportive and the growth is genuine.", name: "Quality Analyst", dept: "Quality & Compliance" },
];

export default function CareersPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Careers", path: "/careers/" }])} />
      <PageHero
        eyebrow="Careers"
        title="Build the future of customer experience"
        description="Join a recognized, AI-powered BPM company where people come first, learning never stops, and growth is real. Your next chapter starts at iLeads."
        crumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
      >
        <a href={`mailto:${company.contact.careersEmail}?subject=Career%20Opportunity%20at%20iLeads`} className="btn-primary">
          Send your CV <ArrowRight className="h-4 w-4" />
        </a>
      </PageHero>

      {/* Culture stats */}
      <section className="py-20">
        <div className="container-tight">
          <Stagger className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {culture.map((c) => (
              <StaggerItem key={c.label}>
                <div className="rounded-3xl border border-slatey-200 bg-slatey-50 p-7 text-center">
                  <div className="font-display text-3xl font-bold text-ink-900 lg:text-4xl">{c.stat}</div>
                  <div className="mt-2 text-sm text-slatey-500">{c.label}</div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-slatey-50 py-24">
        <div className="container-tight">
          <SectionHeading eyebrow="Why work here" title="More than a job — a place to grow" description="We invest in our people because engaged, well-trained teams deliver exceptional experiences." />
          <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <StaggerItem key={b.title}>
                <div className="h-full rounded-3xl border border-slatey-200 bg-white p-7 shadow-soft">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-electric-50 text-electric-600 ring-1 ring-inset ring-electric-100">
                    <b.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink-900">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slatey-600">{b.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Employee stories */}
      <section className="py-24">
        <div className="container-tight">
          <SectionHeading eyebrow="Employee stories" title="Growth, in our team's words" align="center" className="mx-auto" />
          <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
            {stories.map((s, i) => (
              <StaggerItem key={i}>
                <div className="flex h-full flex-col rounded-3xl border border-slatey-200 bg-white p-7 shadow-soft">
                  <Quote className="h-8 w-8 text-electric-200" />
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-900">"{s.quote}"</p>
                  <div className="mt-6 border-t border-slatey-100 pt-4">
                    <div className="font-display text-sm font-semibold text-ink-900">{s.name}</div>
                    <div className="text-xs text-slatey-500">{s.dept}</div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Apply */}
      <section className="pb-24">
        <div className="container-tight">
          <Reveal>
            <div className="overflow-hidden rounded-[2.5rem] border border-slatey-200 bg-slatey-50 p-8 sm:p-12">
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div>
                  <span className="eyebrow">Open to talent</span>
                  <h2 className="display-heading mt-5 text-3xl font-semibold text-ink-900">
                    We're always looking for great people
                  </h2>
                  <p className="mt-4 text-slatey-600">
                    From customer experience and sales operations to quality, training, and team
                    leadership — if you're driven to grow, we'd love to hear from you. Send your CV and
                    tell us where you'd thrive.
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {["Customer Experience", "Sales Operations", "Quality & Compliance", "Team Leadership", "Workforce Management", "Training"].map((r) => (
                      <li key={r} className="rounded-full border border-slatey-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slatey-700">{r}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-3xl border border-slatey-200 bg-white p-7 shadow-soft">
                  <h3 className="font-display text-lg font-semibold text-ink-900">Apply now</h3>
                  <p className="mt-2 text-sm text-slatey-600">Email your CV and we'll be in touch with the right opportunity.</p>
                  <a href={`mailto:${company.contact.careersEmail}?subject=Application%20-%20iLeads%20Careers`} className="btn-primary mt-5 w-full">
                    {company.contact.careersEmail}
                  </a>
                  <Link href="/contact/" className="btn-outline mt-3 w-full">
                    Contact HR
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand
        title="Grow your career with iLeads"
        description="Join a team that's redefining customer experience with people and AI."
        primary={{ label: "Email Careers", href: `mailto:${company.contact.careersEmail}` }}
        secondary={{ label: "About iLeads", href: "/about/" }}
      />
    </>
  );
}
