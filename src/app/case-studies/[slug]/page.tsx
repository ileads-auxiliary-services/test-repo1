import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Target, Wrench, Trophy, Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { caseStudies, getCaseStudy } from "@/data/caseStudies";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return buildMetadata({
    title: `${cs.title} — Case Study`,
    description: cs.summary,
    path: `/case-studies/${cs.slug}/`,
    keywords: [cs.industry, "BPO case study", ...cs.services],
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies/" },
          { name: cs.title, path: `/case-studies/${cs.slug}/` },
        ])}
      />

      <PageHero
        eyebrow={`Case Study · ${cs.industry}`}
        title={cs.title}
        description={cs.summary}
        crumbs={[{ label: "Home", href: "/" }, { label: "Case Studies", href: "/case-studies/" }, { label: cs.client }]}
      >
        <div className="flex flex-wrap gap-3">
          {cs.metrics.map((m) => (
            <div key={m.label} className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3">
              <div className="font-display text-xl font-bold text-electric-300">{m.value}</div>
              <div className="text-xs text-slatey-400">{m.label}</div>
            </div>
          ))}
        </div>
      </PageHero>

      <article className="py-20">
        <div className="container-tight grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:items-start">
          <div className="space-y-12">
            <Reveal>
              <div>
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-100 text-amber-600"><Target className="h-5 w-5" /></span>
                  <h2 className="display-heading text-2xl font-semibold text-ink-900">The Challenge</h2>
                </div>
                <p className="mt-5 text-lg leading-relaxed text-slatey-600">{cs.challenge}</p>
              </div>
            </Reveal>

            <Reveal>
              <div>
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-electric-100 text-electric-600"><Wrench className="h-5 w-5" /></span>
                  <h2 className="display-heading text-2xl font-semibold text-ink-900">The Solution</h2>
                </div>
                <ul className="mt-6 space-y-3">
                  {cs.solution.map((s) => (
                    <li key={s} className="flex items-start gap-3 rounded-2xl border border-slatey-200 bg-white p-4 shadow-soft">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-electric-500" />
                      <span className="text-sm leading-relaxed text-ink-900">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal>
              <div>
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-600"><Trophy className="h-5 w-5" /></span>
                  <h2 className="display-heading text-2xl font-semibold text-ink-900">The Outcome</h2>
                </div>
                <p className="mt-5 text-lg leading-relaxed text-slatey-600">{cs.outcome}</p>
              </div>
            </Reveal>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28">
            <div className="rounded-3xl border border-slatey-200 bg-slatey-50 p-7">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-slatey-500">Engagement snapshot</h3>
              <dl className="mt-5 space-y-5 text-sm">
                <div>
                  <dt className="text-slatey-500">Client</dt>
                  <dd className="mt-1 font-semibold text-ink-900">{cs.client}</dd>
                </div>
                <div>
                  <dt className="text-slatey-500">Industry</dt>
                  <dd className="mt-1 font-semibold text-ink-900">{cs.industry}</dd>
                </div>
                <div>
                  <dt className="text-slatey-500">Services</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {cs.services.map((s) => (
                      <span key={s} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slatey-700 ring-1 ring-inset ring-slatey-200">{s}</span>
                    ))}
                  </dd>
                </div>
              </dl>
              <div className="mt-7 grid gap-3 border-t border-slatey-200 pt-6">
                {cs.metrics.map((m) => (
                  <div key={m.label} className="flex items-baseline justify-between">
                    <span className="text-sm text-slatey-600">{m.label}</span>
                    <span className="font-display text-lg font-bold text-electric-600">{m.value}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact/" className="btn-primary mt-7 w-full">
                Discuss your project <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </article>

      <CTABand />
    </>
  );
}
