import { Counter } from "@/components/ui/Counter";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { company } from "@/data/company";

export function Stats() {
  return (
    <section className="relative bg-slatey-50 py-20">
      <div className="container-tight">
        <Reveal>
          <p className="max-w-3xl text-balance text-2xl font-medium leading-snug text-ink-900 sm:text-3xl">
            A decade and a half of operational excellence — now amplified by AI. iLeads delivers the
            scale of an enterprise BPM with the agility your business demands.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-slatey-200 bg-slatey-200 lg:grid-cols-4">
          {company.stats.map((stat) => (
            <StaggerItem key={stat.label} className="bg-white p-8">
              <div className="font-display text-4xl font-bold text-ink-900 lg:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-3 text-sm font-semibold text-ink-900">{stat.label}</div>
              <div className="mt-1 text-sm text-slatey-500">{stat.detail}</div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
