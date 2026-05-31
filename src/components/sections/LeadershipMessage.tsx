import Link from "next/link";
import { Quote, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { company } from "@/data/company";

export function LeadershipMessage() {
  const ceo = company.leadership[0];
  return (
    <section className="py-24">
      <div className="container-tight">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-slatey-200 bg-slatey-50 px-8 py-14 sm:px-14">
            <Quote className="absolute right-10 top-10 h-24 w-24 text-electric-100" aria-hidden />
            <div className="relative max-w-3xl">
              <span className="eyebrow">Leadership message</span>
              <blockquote className="mt-6 font-display text-2xl font-medium leading-snug text-ink-900 sm:text-3xl">
                "We started iLeads with a simple belief: that great service is a business advantage,
                not a cost center. Today, by uniting our people with AI, we help enterprises and
                governments deliver experiences their customers remember — securely, and at scale."
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-electric-400 to-navy-600 font-display text-lg font-bold text-white">
                  {ceo.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="font-display font-semibold text-ink-900">{ceo.name}</div>
                  <div className="text-sm text-slatey-500">{ceo.role}, iLeads</div>
                </div>
              </div>
              <Link href="/about/" className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-electric-600 hover:text-electric-700">
                Meet our leadership <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
