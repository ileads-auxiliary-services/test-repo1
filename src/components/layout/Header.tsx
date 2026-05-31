"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { primaryNav } from "@/data/nav";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-slatey-200/80 bg-white/85 backdrop-blur-xl" : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-tight flex h-[72px] items-center justify-between gap-6">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setOpenMenu(null)}>
          {primaryNav.map((item) => {
            const hasChildren = "children" in item && item.children;
            return (
              <div key={item.label} className="relative" onMouseEnter={() => setOpenMenu(hasChildren ? item.label : null)}>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-slatey-700 transition-colors hover:text-ink-900"
                >
                  {item.label}
                  {hasChildren && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
                </Link>

                <AnimatePresence>
                  {hasChildren && openMenu === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 top-full z-50 w-[34rem] -translate-x-1/2 pt-3"
                    >
                      <div className="grid grid-cols-2 gap-1 rounded-3xl border border-slatey-200 bg-white p-3 shadow-lift">
                        {item.children!.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="group/item rounded-2xl p-3 transition-colors hover:bg-slatey-50"
                          >
                            <span className="flex items-center justify-between text-sm font-semibold text-ink-900">
                              {child.label}
                              <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover/item:translate-x-0 group-hover/item:opacity-100" />
                            </span>
                            <span className="mt-1 block text-xs leading-relaxed text-slatey-500">
                              {"description" in child ? child.description : null}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/contact/" className="btn-primary">
            Talk to Sales
          </Link>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-xl border border-slatey-200 text-ink-900 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-[72px] z-40 overflow-y-auto bg-white px-5 pb-10 pt-4 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {primaryNav.map((item) => (
                <MobileItem key={item.label} item={item} onNavigate={() => setOpen(false)} />
              ))}
              <Link href="/contact/" onClick={() => setOpen(false)} className="btn-primary mt-4 w-full">
                Talk to Sales
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileItem({
  item,
  onNavigate,
}: {
  item: (typeof primaryNav)[number];
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = "children" in item && item.children;

  if (!hasChildren) {
    return (
      <Link href={item.href} onClick={onNavigate} className="border-b border-slatey-100 py-4 text-base font-semibold text-ink-900">
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-slatey-100">
      <button onClick={() => setExpanded((v) => !v)} className="flex w-full items-center justify-between py-4 text-base font-semibold text-ink-900">
        {item.label}
        <ChevronDown className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")} />
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="flex flex-col gap-1 pb-3">
              {item.children!.map((child) => (
                <Link key={child.href} href={child.href} onClick={onNavigate} className="rounded-xl px-3 py-2.5 text-sm text-slatey-600 hover:bg-slatey-50">
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
