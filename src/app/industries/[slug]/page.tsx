import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { industries, getIndustry } from "@/data/industries";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return buildMetadata({
    title: industry.seoTitle,
    description: industry.seoDescription,
    path: `/industries/${industry.slug}/`,
    keywords: industry.keywords,
  });
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const others = industries.filter((i) => i.slug !== industry.slug).slice(0, 4);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries/" },
          { name: industry.name, path: `/industries/${industry.slug}/` },
        ])}
      />

      <PageHero
        eyebrow={`Industry · ${industry.name}`}
        title={`${industry.name} solutions built for trust and scale`}
        description={industry.hero}
        crumbs={[{ label: "Home", href: "/" }, { label: "Industries", href: "/industries/" }, { label: industry.name }]}
      >
        <div className="flex flex-wrap gap-3">
          {industry.outcomes.map((o) => (
            <div key={o.label} className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3">
              <div className="font-display text-lg font-bold text-white">{o.value}</div>
              <div className="text-xs text-slatey-400">{o.label}</div>
            </div>
          ))}
        </div>
      </PageHero>

      {/* Challenges + Solutions */}
      <section className="py-24">
        <div className="container-tight grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-slatey-200 bg-slatey-50 p-8">
              <span className="eyebrow">The challenge</span>
              <h2 className="display-heading mt-5 text-2xl font-semibold text-ink-900">
                What {industry.name} leaders are up against
              </h2>
              <ul className="mt-7 space-y-4">
                {industry.challenges.map((c) => (
                  <li key={c} className="flex gap-3 text-sm leading-relaxed text-slatey-700">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border border-electric-200 bg-gradient-to-br from-white to-electric-50/40 p-8">
              <span className="eyebrow">How iLeads helps</span>
              <h2 className="display-heading mt-5 text-2xl font-semibold text-ink-900">
                Our solution for {industry.name}
              </h2>
              <ul className="mt-7 space-y-5">
                {industry.solutions.map((s) => (
                  <li key={s.title} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-electric-500" />
                    <div>
                      <h3 className="font-display text-base font-semibold text-ink-900">{s.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slatey-600">{s.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Other industries */}
      <section className="bg-slatey-50 py-24">
        <div className="container-tight">
          <div className="flex items-end justify-between">
            <h2 className="display-heading text-2xl font-semibold text-ink-900 sm:text-3xl">More industries</h2>
            <Link href="/industries/" className="hidden text-sm font-semibold text-electric-600 hover:text-electric-700 sm:inline-flex sm:items-center sm:gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((i) => (
              <Link key={i.slug} href={`/industries/${i.slug}/`} className="group block rounded-2xl border border-slatey-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-electric-300 hover:shadow-soft">
                <i.icon className="h-6 w-6 text-electric-600" />
                <h3 className="mt-4 font-display text-sm font-semibold text-ink-900">{i.name}</h3>
                <p className="mt-1 text-xs text-slatey-500">{i.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title={`Transform your ${industry.name} operations`}
        description="Let's design a secure, AI-powered delivery model tailored to your sector's requirements and outcomes."
      />
    </>
  );
}
