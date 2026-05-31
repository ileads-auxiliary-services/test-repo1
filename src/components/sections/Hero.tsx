"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, PlayCircle } from "lucide-react";
import { Counter } from "@/components/ui/Counter";
import { company } from "@/data/company";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-950 pt-[72px] text-white">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950" />
        <div className="absolute inset-0 bg-grid-navy [background-size:48px_48px] opacity-[0.25] [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" />
        <motion.div
          className="absolute -right-32 top-10 h-[34rem] w-[34rem] rounded-full bg-electric-500/25 blur-[140px]"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -left-24 bottom-0 h-[30rem] w-[30rem] rounded-full bg-navy-500/30 blur-[150px]"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container-tight relative grid gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
        {/* Copy */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow-dark"
          >
            <Sparkles className="h-3.5 w-3.5" /> AI-Powered BPM & Customer Experience
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="display-heading mt-6 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-[4rem]"
          >
            The intelligent partner behind{" "}
            <span className="text-gradient">world-class customer experiences</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-slatey-300"
          >
            iLeads unites world-class people with AI-driven automation to run mission-critical
            customer, sales, and back-office operations — securely, at enterprise scale, with
            outcomes you can measure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link href="/contact/" className="btn-primary">
              Talk to Sales <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/case-studies/" className="btn-ghost-light">
              <PlayCircle className="h-4 w-4" /> See client outcomes
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slatey-400"
          >
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-electric-400" /> ISO 27001:2013
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-electric-400" /> ISO 9001:2015
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-electric-400" /> Startup India Recognized
            </span>
          </motion.div>
        </div>

        {/* Visual panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-electric-400" />
                <span className="text-xs font-medium uppercase tracking-wider text-slatey-400">
                  Live Delivery Snapshot
                </span>
              </div>
              <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                Operational
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {company.stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-ink-900/60 p-4">
                  <div className="font-display text-2xl font-bold text-white">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-1 text-xs font-medium text-slatey-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Channel bars */}
            <div className="mt-4 rounded-2xl border border-white/10 bg-ink-900/60 p-4">
              <div className="mb-3 flex items-center justify-between text-xs text-slatey-400">
                <span>Omnichannel mix</span>
                <span className="text-electric-300">AI-assisted</span>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: "Voice", w: "82%" },
                  { label: "Chat", w: "68%" },
                  { label: "Email", w: "54%" },
                  { label: "Social", w: "40%" },
                ].map((c, i) => (
                  <div key={c.label} className="flex items-center gap-3">
                    <span className="w-12 text-[11px] text-slatey-400">{c.label}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-electric-400 to-navy-400"
                        initial={{ width: 0 }}
                        animate={{ width: c.w }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.12, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-white/10 bg-ink-900/90 p-4 shadow-lift backdrop-blur sm:block"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-electric-500/20 text-electric-300">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-lg font-bold text-white">100%</div>
                <div className="text-[11px] text-slatey-400">Interaction analytics</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
