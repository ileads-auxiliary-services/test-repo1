import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { services, getService } from "@/data/services";
import { buildMetadata, serviceSchema, breadcrumbSchema } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}/`,
    keywords: service.keywords,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(service.title, service.seoDescription, `/services/${service.slug}/`),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/" },
            { name: service.title, path: `/services/${service.slug}/` },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Service"
        title={service.title}
        description={service.hero}
        crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services/" }, { label: service.title }]}
      >
        <div className="flex flex-wrap gap-3">
          {service.metrics.map((m) => (
            <div key={m.label} className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3">
              <div className="font-display text-lg font-bold text-white">{m.value}</div>
              <div className="text-xs text-slatey-400">{m.label}</div>
            </div>
          ))}
        </div>
      </PageHero>

      {/* Outcomes */}
      <section className="py-20">
        <div className="container-tight grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <span className="eyebrow">Business outcomes</span>
            <h2 className="display-heading mt-5 text-3xl font-semibold text-ink-900">
              What this delivers for your business
            </h2>
            <p className="mt-4 text-slatey-600">
              We design every engagement around measurable results — and report against them transparently.
            </p>
          </div>
          <Stagger className="grid gap-4 sm:grid-cols-2">
            {service.outcomes.map((o) => (
              <StaggerItem key={o}>
                <div className="flex h-full items-start gap-3 rounded-2xl border border-slatey-200 bg-white p-5 shadow-soft">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-electric-500 text-white">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-sm font-medium leading-relaxed text-ink-900">{o}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-slatey-50 py-24">
        <div className="container-tight">
          <Reveal>
            <span className="eyebrow">Capabilities</span>
            <h2 className="display-heading mt-5 max-w-2xl text-3xl font-semibold text-ink-900 sm:text-4xl">
              What's included
            </h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-2">
            {service.capabilities.map((cap) => (
              <StaggerItem key={cap.name}>
                <div className="flex h-full gap-5 rounded-3xl border border-slatey-200 bg-white p-7 shadow-soft">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-electric-50 to-navy-50 text-electric-600 ring-1 ring-inset ring-electric-100">
                    <cap.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink-900">{cap.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slatey-600">{cap.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Cross-sell */}
      <section className="py-24">
        <div className="container-tight">
          <div className="flex items-end justify-between">
            <h2 className="display-heading text-2xl font-semibold text-ink-900 sm:text-3xl">Explore related services</h2>
            <Link href="/services/" className="hidden text-sm font-semibold text-electric-600 hover:text-electric-700 sm:inline-flex sm:items-center sm:gap-1">
              All services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {others.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}/`} className="group block card-surface card-surface-hover">
                <s.icon className="h-7 w-7 text-electric-600" />
                <h3 className="mt-5 font-display text-base font-semibold text-ink-900">{s.title}</h3>
                <p className="mt-2 text-sm text-slatey-600">{s.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title={`Let's build your ${service.title.toLowerCase()} engagement`}
        description="Tell us your goals and constraints. We'll propose an AI-blended delivery model designed around your outcomes."
      />
    </>
  );
}
