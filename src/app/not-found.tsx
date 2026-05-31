import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-ink-950 pt-[72px] text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-navy [background-size:48px_48px] opacity-[0.16]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric-500/20 blur-[130px]" />
      <div className="container-tight relative text-center">
        <p className="font-display text-7xl font-bold text-gradient sm:text-8xl">404</p>
        <h1 className="display-heading mt-4 text-2xl font-semibold sm:text-3xl">This page took a different route</h1>
        <p className="mx-auto mt-4 max-w-md text-slatey-400">
          The page you're looking for doesn't exist or has moved. Let's get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            <Home className="h-4 w-4" /> Back home
          </Link>
          <Link href="/services/" className="btn-ghost-light">
            <ArrowLeft className="h-4 w-4" /> Explore services
          </Link>
        </div>
      </div>
    </section>
  );
}
