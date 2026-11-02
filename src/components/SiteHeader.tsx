"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { NAV } from "@/lib/content";
import { scrollToId } from "@/lib/scroll";
import { EASE } from "./ui/Reveal";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav item for the section in the middle of the viewport.
  useEffect(() => {
    if (!isHome) return;
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const onTop = () => window.scrollY < window.innerHeight * 0.5 && setActive(null);
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, [isHome]);

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (id: string, focus?: string) => (e: MouseEvent) => {
    setOpen(false);
    if (isHome && scrollToId(id, focus)) e.preventDefault();
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
        scrolled || open
          ? "border-b border-white/10 bg-ink-950/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link
          href="/"
          onClick={(e) => {
            setOpen(false);
            if (isHome) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              history.replaceState(null, "", "/");
            }
          }}
          className="text-[17px] font-semibold tracking-[0.16em] text-white sm:text-lg"
        >
          KINETIC GRID
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {NAV.map((n) => (
              <li key={n.id}>
                <Link
                  href={n.href}
                  onClick={go(n.id)}
                  aria-current={active === n.id ? "location" : undefined}
                  className="group relative py-2 text-[13px] font-medium text-white/90 transition-colors hover:text-white"
                >
                  {n.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-amber-400 shadow-[0_0_8px_rgba(255,178,30,0.9)] transition-all duration-500 ease-out-expo ${
                      active === n.id ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/#journal"
            onClick={go("journal", "#subscribe-email")}
            className="group hidden items-center gap-2 rounded-[10px] border-[1.5px] border-amber-400/90 px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_0_18px_-4px_rgba(255,178,30,0.6),inset_0_0_12px_-6px_rgba(255,178,30,0.6)] transition hover:bg-amber-400/10 hover:shadow-[0_0_28px_-2px_rgba(255,178,30,0.8)] sm:inline-flex"
          >
            Enter the Current
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-md border border-white/15 text-white lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100dvh - var(--header-h))" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden bg-ink-950/95 lg:hidden"
          >
            <ul className="container-x flex flex-col gap-1 pt-6">
              {NAV.map((n, i) => (
                <motion.li
                  key={n.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.5, ease: EASE }}
                >
                  <Link
                    href={n.href}
                    onClick={go(n.id)}
                    className="flex items-center justify-between border-b border-white/10 py-4 text-2xl font-extrabold uppercase tracking-tight text-white"
                  >
                    {n.label}
                    <ArrowRight className="size-5 text-amber-400" />
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="container-x pt-8">
              <Link
                href="/#journal"
                onClick={go("journal", "#subscribe-email")}
                className="btn-amber flex w-full items-center justify-center gap-2 rounded-md py-4 text-sm font-bold"
              >
                Enter the Current <ArrowRight className="size-4" />
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
