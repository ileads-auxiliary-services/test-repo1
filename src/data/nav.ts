import { services } from "./services";
import { industries } from "./industries";

export const SITE_URL = "https://www.ileads.co.in";

export const primaryNav = [
  {
    label: "Services",
    href: "/services",
    children: services.map((s) => ({
      label: s.title,
      href: `/services/${s.slug}/`,
      description: s.short,
    })),
  },
  {
    label: "Industries",
    href: "/industries",
    children: industries.map((i) => ({
      label: i.name,
      href: `/industries/${i.slug}/`,
      description: i.short,
    })),
  },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
] as const;

export const footerNav = {
  Services: services.map((s) => ({ label: s.title, href: `/services/${s.slug}/` })),
  Industries: industries.slice(0, 6).map((i) => ({ label: i.name, href: `/industries/${i.slug}/` })),
  Company: [
    { label: "About Us", href: "/about/" },
    { label: "Case Studies", href: "/case-studies/" },
    { label: "Careers", href: "/careers/" },
    { label: "Contact", href: "/contact/" },
  ],
};
