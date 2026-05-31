import Link from "next/link";
import { Linkedin, Facebook, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { footerNav } from "@/data/nav";
import { company } from "@/data/company";

export function Footer() {
  const hq = company.locations.find((l) => l.hq);
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-slatey-300">
      <div className="pointer-events-none absolute inset-0 bg-grid-navy [background-size:46px_46px] opacity-[0.18]" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-electric-500/20 blur-[120px]" />

      <div className="container-tight relative pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slatey-400">
              {company.shortDescription}
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <a href={`mailto:${company.contact.email}`} className="flex items-center gap-3 text-slatey-300 hover:text-white">
                <Mail className="h-4 w-4 text-electric-400" /> {company.contact.email}
              </a>
              <a href={`tel:${company.contact.phoneHref}`} className="flex items-center gap-3 text-slatey-300 hover:text-white">
                <Phone className="h-4 w-4 text-electric-400" /> {company.contact.phone}
              </a>
              {hq && (
                <p className="flex items-start gap-3 text-slatey-400">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-electric-400" /> {hq.address}
                </p>
              )}
            </div>
            <div className="mt-6 flex gap-3">
              <SocialLink href={company.social.linkedin} label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </SocialLink>
              <SocialLink href={company.social.facebook} label="Facebook">
                <Facebook className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          {Object.entries(footerNav).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">{title}</h3>
              <ul className="mt-5 space-y-3 text-sm">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-slatey-400 transition-colors hover:text-electric-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 py-8 text-xs text-slatey-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="rounded-full border border-white/10 px-3 py-1">ISO 9001:2015</span>
            <span className="rounded-full border border-white/10 px-3 py-1">ISO 27001:2013</span>
            <Link href="/contact/" className="inline-flex items-center gap-1 hover:text-electric-300">
              Start a conversation <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-slatey-300 transition-colors hover:border-electric-400 hover:text-electric-300"
    >
      {children}
    </a>
  );
}
