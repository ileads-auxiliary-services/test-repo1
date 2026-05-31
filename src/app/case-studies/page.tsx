import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { caseStudies } from "@/data/caseStudies";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Case Studies — Measurable BPM & CX Outcomes | iLeads",
  description:
    "See how iLeads delivers measurable outcomes — improved recovery, scaled support, protected CSAT, and higher retention — across BFSI, fintech, e-commerce, and SaaS.",
  path: "/case-studies/",
  keywords: ["BPO case studies", "customer experience outcomes", "collections case study", "fintech support case study"],
});

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Case Studies", path: "/case-studies/" }])} />
      <PageHero
        eyebrow="Case Studies"
        title="Outcomes that prove the model"
        description="Representative engagements showing how AI-blended delivery turns customer and back-office operations into a measurable competitive advantage."
        crumbs={[{ label: "Home", href: "/" }, { label: "Case Studies" }]}
      />

      <section className="py-24">
        <div className="container-tight">
          <Stagger className="grid gap-6 lg:grid-cols-2">
            {caseStudies.map((cs) => (
              <StaggerItem key={cs.slug}>
                <Link
                  href={`/case-studies/${cs.slug}/`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slatey-200 bg-white p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className={cn("pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br blur-2xl", cs.accent)} />
                  <div className="relative flex flex-1 flex-col">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-slatey-100 px-3 py-1 text-xs font-semibold text-slatey-600">{cs.industry}</span>
                      <ArrowUpRight className="h-5 w-5 text-slatey-400 transition-colors group-hover:text-electric-500" />
                    </div>
                    <h2 className="mt-5 font-display text-xl font-semibold leading-snug text-ink-900">{cs.title}</h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slatey-600">{cs.summary}</p>
                    <div className="mt-6 grid grid-cols-3 gap-4 border-t border-slatey-100 pt-6">
                      {cs.metrics.map((m) => (
                        <div key={m.label}>
                          <div className="font-display text-2xl font-bold text-ink-900">{m.value}</div>
                          <div className="mt-1 text-xs leading-tight text-slatey-500">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CTABand
        title="Your outcome could be next"
        description="Share your goals and we'll show you exactly how an AI-blended delivery model would work for your business."
      />
    </>
  );
}
