import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * iLeads brand lockup, recreated as a scalable SVG so it renders crisply on any
 * background. The coral/magenta "dotted-i" mark is constant; the wordmark colour
 * adapts to light/dark surfaces. Drop in the official asset at /public/logo.svg
 * and swap the <LogoMark/> for an <img> if a pixel-exact file is preferred.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 46" className={cn("h-9 w-auto shrink-0", className)} fill="none" aria-hidden role="img">
      <defs>
        <linearGradient id="ileads-coral" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F7791F" />
          <stop offset="1" stopColor="#F24A1E" />
        </linearGradient>
        <linearGradient id="ileads-pink" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F0247A" />
          <stop offset="1" stopColor="#D2197E" />
        </linearGradient>
      </defs>
      {/* left dotted-i */}
      <circle cx="9" cy="7" r="6" fill="#ED1C24" />
      <rect x="3" y="16" width="12" height="27" rx="6" fill="url(#ileads-coral)" />
      {/* right dotted-i */}
      <circle cx="27" cy="7" r="6" fill="#ED1C24" />
      <rect x="21" y="16" width="12" height="27" rx="6" fill="url(#ileads-pink)" />
    </svg>
  );
}

export function Logo({
  variant = "dark",
  className,
  showTagline = false,
}: {
  variant?: "dark" | "light";
  className?: string;
  showTagline?: boolean;
}) {
  const word = variant === "light" ? "text-white" : "text-ink-900";
  const tag = variant === "light" ? "text-slatey-300" : "text-slatey-500";
  return (
    <Link
      href="/"
      aria-label="iLeads — Auxiliary Services Pvt Ltd, home"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <LogoMark className="transition-transform duration-300 group-hover:-translate-y-0.5" />
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-2xl font-extrabold lowercase tracking-tight", word)}>
          ileads
        </span>
        {showTagline && (
          <span className={cn("mt-1 text-[9px] font-semibold uppercase tracking-[0.2em]", tag)}>
            Auxiliary Services Pvt Ltd
          </span>
        )}
      </span>
    </Link>
  );
}
