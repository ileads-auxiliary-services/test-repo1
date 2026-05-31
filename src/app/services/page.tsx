import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { TechCapabilities } from "@/components/sections/TechCapabilities";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { services } from "@/data/services";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services — Business Process Management & CX Solutions | iLeads",
  description:
    "Explore iLeads' AI-powered BPM services: customer support, sales & revenue operations, collections, verification, back office, data services, and AI & automation.",
  path: "/services/",
  keywords: [
    "business process management services",
    "BPO services India",
    "customer support outsourcing",
    "back office outsourcing",
    "AI automation services",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services/" }])} />
      <PageHero
        eyebrow="Services"
        title="End-to-end BPM, powered by AI"
        description="A connected portfolio of services that runs your customer, revenue, and back-office operations — unified by data, automation, and relentless quality."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      >
        <Link href="/contact/" className="btn-primary">
          Talk to Sales <ArrowRight className="h-4 w-4" />
        </Link>
      </PageHero>

      <section className="py-24">
        <div className="container-tight">
          <Stagger className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <StaggerItem key={service.slug}>
                <Link
                  href={`/services/${service.slug}/`}
                  className="group flex h-full flex-col card-surface card-surface-hover"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-electric-50 to-navy-50 text-electric-600 ring-1 ring-inset ring-electric-100 transition-colors group-hover:from-electric-500 group-hover:to-navy-600 group-hover:text-white">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-slatey-300 transition-all group-hover:translate-x-1 group-hover:text-electric-500" />
                  </div>
                  <h2 className="mt-6 font-display text-xl font-semibold text-ink-900">{service.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-slatey-600">{service.hero}</p>
                  <div className="mt-6 flex flex-wrap gap-2 border-t border-slatey-100 pt-5">
                    {service.capabilities.map((c) => (
                      <span key={c.name} className="rounded-full bg-slatey-100 px-3 py-1 text-xs font-medium text-slatey-600">
                        {c.name}
                      </span>
                    ))}
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <TechCapabilities />
      <CTABand />
    </>
  );
}
