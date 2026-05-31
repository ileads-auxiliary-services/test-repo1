import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ variant = "dark", className }: { variant?: "dark" | "light"; className?: string }) {
  const text = variant === "light" ? "text-white" : "text-ink-900";
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5", className)} aria-label="iLeads home">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-electric-400 to-navy-600 shadow-[0_8px_20px_-8px_rgba(6,180,242,0.8)]">
        <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" aria-hidden>
          <path d="M5 14c2.5 0 3.5-2 7-2s4.5 2 7 2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="12" cy="6.5" r="1.8" fill="currentColor" />
          <path d="M6 18.5h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity="0.6" />
        </svg>
      </span>
      <span className={cn("font-display text-xl font-bold tracking-tight", text)}>
        i<span className="text-electric-500">Leads</span>
      </span>
    </Link>
  );
}
