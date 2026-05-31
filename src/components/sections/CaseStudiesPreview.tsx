import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { caseStudies } from "@/data/caseStudies";
import { cn } from "@/lib/utils";

export function CaseStudiesPreview() {
  return (
    <section className="py-24">
      <div className="container-tight">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Proof, not promises"
            title="Outcomes our clients can measure"
            description="Representative engagements that show how AI-blended delivery turns operations into a competitive advantage."
          />
          <Link href="/case-studies/" className="btn-outline shrink-0">
            All case studies <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <Stagger className="mt-14 grid gap-6 lg:grid-cols-2">
          {caseStudies.map((cs) => (
            <StaggerItem key={cs.slug}>
              <Link
                href={`/case-studies/${cs.slug}/`}
                className="group relative block h-full overflow-hidden rounded-3xl border border-slatey-200 bg-white p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className={cn("pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br blur-2xl", cs.accent)} />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-slatey-100 px-3 py-1 text-xs font-semibold text-slatey-600">{cs.industry}</span>
                    <ArrowUpRight className="h-5 w-5 text-slatey-400 transition-colors group-hover:text-electric-500" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold leading-snug text-ink-900">{cs.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slatey-600">{cs.summary}</p>

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
  );
}
