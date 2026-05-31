import type { Metadata } from "next";
import { company } from "@/data/company";

export const SITE_URL = "https://www.ileads.co.in";

type SeoInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
};

export function buildMetadata({ title, description, path = "/", keywords }: SeoInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title.includes("iLeads") ? title : `${title} | iLeads`;
  return {
    title: fullTitle,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "iLeads",
      type: "website",
      locale: "en_IN",
      images: [{ url: "/og.svg", width: 1200, height: 630, alt: "iLeads — AI-Powered BPM & CX" }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/og.svg"],
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.legalName,
    alternateName: "iLeads",
    url: SITE_URL,
    description: company.shortDescription,
    foundingDate: String(company.founded),
    sameAs: [company.social.linkedin, company.social.facebook],
    address: company.locations
      .filter((l) => l.hq)
      .map((l) => ({
        "@type": "PostalAddress",
        streetAddress: l.address,
        addressLocality: l.city,
        addressRegion: l.state,
        addressCountry: "IN",
      })),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: company.contact.phone,
        contactType: "sales",
        email: company.contact.email,
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
    ],
  };
}

export function serviceSchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: { "@type": "Organization", name: company.legalName, url: SITE_URL },
    areaServed: "IN",
    url: `${SITE_URL}${path}`,
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}
