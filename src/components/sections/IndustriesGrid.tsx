import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { industries } from "@/data/industries";

export function IndustriesGrid() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-navy [background-size:48px_48px] opacity-[0.16] [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" />
      <div className="container-tight relative">
        <SectionHeading
          dark
          align="center"
          eyebrow="Industries"
          title="Deep expertise where trust and scale matter most"
          description="We bring domain context, compliance discipline, and proven playbooks to every sector we serve."
          className="mx-auto"
        />

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <StaggerItem key={industry.slug}>
              <Link
                href={`/industries/${industry.slug}/`}
                className="group relative block h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-electric-400/50 hover:bg-white/[0.06]"
              >
                <div className="flex items-center justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-electric-500/15 text-electric-300 ring-1 ring-inset ring-electric-400/20">
                    <industry.icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 -translate-x-1 translate-y-1 text-slatey-500 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-electric-300 group-hover:opacity-100" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{industry.name}</h3>
                <p className="mt-2 text-sm text-slatey-400">{industry.short}</p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
