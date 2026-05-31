import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { services } from "@/data/services";

export function ServicesOverview() {
  return (
    <section className="py-24">
      <div className="container-tight">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title="One partner for the full customer and operations lifecycle"
            description="From the first conversation to back-office execution, iLeads runs the processes that define your customer experience — unified by data, AI, and relentless quality."
          />
          <Link href="/services/" className="btn-outline shrink-0">
            All services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.slug}>
              <Link
                href={`/services/${service.slug}/`}
                className="group block h-full card-surface card-surface-hover"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-electric-50 to-navy-50 text-electric-600 ring-1 ring-inset ring-electric-100 transition-colors group-hover:from-electric-500 group-hover:to-navy-600 group-hover:text-white">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-display text-lg font-semibold text-ink-900">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slatey-600">{service.short}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-electric-600">
                  Explore
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
