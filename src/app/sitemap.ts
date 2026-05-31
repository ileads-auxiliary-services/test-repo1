import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { caseStudies } from "@/data/caseStudies";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/about", "/services", "/industries", "/case-studies", "/careers", "/contact"];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  services.forEach((s) =>
    entries.push({ url: `${SITE_URL}/services/${s.slug}/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 }),
  );
  industries.forEach((i) =>
    entries.push({ url: `${SITE_URL}/industries/${i.slug}/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 }),
  );
  caseStudies.forEach((c) =>
    entries.push({ url: `${SITE_URL}/case-studies/${c.slug}/`, lastModified: now, changeFrequency: "yearly", priority: 0.6 }),
  );

  return entries;
}
