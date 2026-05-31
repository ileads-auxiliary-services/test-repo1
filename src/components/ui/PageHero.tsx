import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";

type Crumb = { label: string; href?: string };

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-950 pt-[72px] text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-navy [background-size:48px_48px] opacity-[0.18] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="pointer-events-none absolute -right-24 -top-10 h-80 w-80 rounded-full bg-electric-500/20 blur-[130px]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-navy-500/25 blur-[130px]" />

      <div className="container-tight relative py-16 lg:py-24">
        {crumbs && (
          <Reveal>
            <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-slatey-400" aria-label="Breadcrumb">
              {crumbs.map((c, i) => (
                <span key={i} className="inline-flex items-center gap-1.5">
                  {c.href ? (
                    <Link href={c.href} className="hover:text-electric-300">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-slatey-300">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && <ChevronRight className="h-3.5 w-3.5 text-slatey-600" />}
                </span>
              ))}
            </nav>
          </Reveal>
        )}

        {eyebrow && (
          <Reveal>
            <span className="eyebrow-dark">{eyebrow}</span>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <h1 className="display-heading mt-5 max-w-3xl text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-[3.5rem]">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slatey-300">{description}</p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.15}>
            <div className="mt-9">{children}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
