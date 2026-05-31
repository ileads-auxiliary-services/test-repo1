import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function CTABand({
  title = "Ready to transform your customer operations?",
  description = "Let's design an AI-powered delivery model around your business outcomes. Talk to our team about a tailored engagement.",
  primary = { label: "Talk to Sales", href: "/contact/" },
  secondary = { label: "Explore Services", href: "/services/" },
}: {
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="relative py-24">
      <div className="container-tight">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-ink-950 px-8 py-16 text-center sm:px-16">
            <div className="pointer-events-none absolute inset-0 bg-grid-navy [background-size:42px_42px] opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
            <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-electric-500/25 blur-[120px]" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="display-heading text-3xl font-bold text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
                {title}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slatey-300">{description}</p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Link href={primary.href} className="btn-primary">
                  {primary.label} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href={secondary.href} className="btn-ghost-light">
                  {secondary.label}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
