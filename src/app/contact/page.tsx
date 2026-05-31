import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, Users } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { company } from "@/data/company";
import { buildMetadata, breadcrumbSchema, organizationSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact iLeads — Talk to Our BPM & CX Experts",
  description:
    "Get in touch with iLeads for AI-powered customer support, sales operations, collections, verification, and back-office outsourcing. PAN-India delivery centers.",
  path: "/contact/",
  keywords: ["contact iLeads", "BPO company contact", "customer support outsourcing enquiry", "iLeads Dehradun"],
});

export default function ContactPage() {
  const hqMapQuery = encodeURIComponent(company.locations.find((l) => l.hq)?.address ?? "Dehradun");

  return (
    <>
      <JsonLd data={[organizationSchema(), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact/" }])]} />
      <PageHero
        eyebrow="Contact"
        title="Let's design your transformation"
        description="Tell us about your goals and we'll propose an AI-powered delivery model built around your outcomes. Enterprise and government enquiries welcome."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="py-20">
        <div className="container-tight grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          {/* Contact details */}
          <div className="space-y-6">
            <Reveal>
              <div className="rounded-3xl border border-slatey-200 bg-white p-7 shadow-soft">
                <h2 className="font-display text-lg font-semibold text-ink-900">Talk to us</h2>
                <div className="mt-5 space-y-4 text-sm">
                  <ContactRow icon={Mail} label="Sales & Enquiries" value={company.contact.salesEmail} href={`mailto:${company.contact.salesEmail}`} />
                  <ContactRow icon={Users} label="Careers" value={company.contact.careersEmail} href={`mailto:${company.contact.careersEmail}?subject=Career%20Opportunity%20at%20iLeads`} />
                  {company.contact.phone && (
                    <ContactRow icon={Phone} label="Phone" value={company.contact.phone} href={`tel:${company.contact.phoneHref}`} />
                  )}
                  <ContactRow icon={MapPin} label="Head Office" value={company.locations.find((l) => l.hq)?.address ?? ""} />
                  <ContactRow icon={Clock} label="Hours" value="24/7 delivery · Mon–Sat support" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-3xl border border-slatey-200 bg-white shadow-soft">
                <iframe
                  title="iLeads headquarters location"
                  src={`https://www.google.com/maps?q=${hqMapQuery}&output=embed`}
                  className="h-56 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.05}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* Locations */}
      <section className="bg-slatey-50 py-24">
        <div className="container-tight">
          <h2 className="display-heading text-3xl font-semibold text-ink-900">Our delivery centers</h2>
          <p className="mt-3 max-w-2xl text-slatey-600">A PAN-India footprint built for resilience, surge capacity, and always-on coverage.</p>
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-electric-50 text-electric-600">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <div className="text-xs font-medium uppercase tracking-wider text-slatey-400">{label}</div>
        <div className="font-medium text-ink-900">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block rounded-xl transition-colors hover:bg-slatey-50">
      {content}
    </a>
  ) : (
    content
  );
}
