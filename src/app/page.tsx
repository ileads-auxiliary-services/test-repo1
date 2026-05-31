import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { Stats } from "@/components/sections/Stats";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { IndustriesGrid } from "@/components/sections/IndustriesGrid";
import { TechCapabilities } from "@/components/sections/TechCapabilities";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { CaseStudiesPreview } from "@/components/sections/CaseStudiesPreview";
import { SecurityCompliance } from "@/components/sections/SecurityCompliance";
import { LeadershipMessage } from "@/components/sections/LeadershipMessage";
import { CTABand } from "@/components/sections/CTABand";
import { JsonLd } from "@/components/ui/JsonLd";
import { SITE_URL } from "@/lib/seo";

export default function HomePage() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "iLeads",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/services/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <JsonLd data={websiteSchema} />
      <Hero />
      <TrustedBy />
      <Stats />
      <ServicesOverview />
      <IndustriesGrid />
      <TechCapabilities />
      <WhyChoose />
      <CaseStudiesPreview />
      <SecurityCompliance />
      <LeadershipMessage />
      <CTABand />
    </>
  );
}
