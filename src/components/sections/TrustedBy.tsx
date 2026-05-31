"use client";

import { Landmark, Coins, HeartPulse, ShoppingCart, Building2, Signal, Cloud, GraduationCap, Cpu } from "lucide-react";

// Industry-cluster "trust bar" — avoids fabricating client logos while still
// signaling breadth across regulated, high-trust sectors.
const clusters = [
  { icon: Landmark, label: "Banking & NBFC" },
  { icon: Coins, label: "Fintech" },
  { icon: HeartPulse, label: "Healthcare" },
  { icon: ShoppingCart, label: "E-commerce" },
  { icon: Building2, label: "Government" },
  { icon: Signal, label: "Telecom" },
  { icon: Cloud, label: "SaaS" },
  { icon: GraduationCap, label: "Education" },
  { icon: Cpu, label: "Technology" },
];

export function TrustedBy() {
  const row = [...clusters, ...clusters];
  return (
    <section className="border-y border-slatey-200 bg-white py-12">
      <div className="container-tight">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-slatey-500">
          Trusted across regulated, high-volume industries
        </p>
        <div className="mask-fade-x mt-8 overflow-hidden">
          <div className="flex w-max animate-marquee gap-4">
            {row.map((c, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 rounded-full border border-slatey-200 bg-slatey-50 px-5 py-2.5 text-sm font-medium text-slatey-700"
              >
                <c.icon className="h-4 w-4 text-electric-500" />
                {c.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
