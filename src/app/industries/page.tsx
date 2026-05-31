import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { industries } from "@/data/industries";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Industries We Serve — BFSI, Fintech, Healthcare & More | iLeads",
  description:
    "Domain-deep BPM and CX solutions for BFSI, fintech, healthcare, e-commerce, government, telecom, SaaS, education, and technology — by iLeads.",
  path: "/industries/",
  keywords: ["BFSI BPO", "fintech BPO", "healthcare BPO", "government BPO India", "telecom BPO"],
});

export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Industries", path: "/industries/" }])} />
      <PageHero
        eyebrow="Industries"
        title="Domain depth where trust and scale matter most"
        description="We bring sector context, compliance discipline, and proven playbooks to every industry we serve — so your operations start ahead."
        crumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
      />

      <section className="py-24">
        <div className="container-tight">
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <StaggerItem key={industry.slug}>
                <Link
                  href={`/industries/${industry.slug}/`}
                  className="group flex h-full flex-col card-surface card-surface-hover"
                >
                  <div className="flex items-center justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-electric-50 to-navy-50 text-electric-600 ring-1 ring-inset ring-electric-100">
                      <industry.icon className="h-6 w-6" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-slatey-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-electric-500" />
                  </div>
                  <h2 className="mt-6 font-display text-lg font-semibold text-ink-900">{industry.name}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-slatey-600">{industry.hero}</p>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CTABand
        title="Don't see your exact industry?"
        description="Our delivery model adapts to any high-volume, experience-critical operation. Let's talk about your specific context."
      />
    </>
  );
}
