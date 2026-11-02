"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useRef, useState } from "react";
import { HERO } from "@/lib/content";
import { scrollToId } from "@/lib/scroll";
import { EASE } from "../ui/Reveal";
import { HeroScene } from "./HeroScene";
import { LoopDialog } from "./LoopDialog";

const item = (delay: number) => ({
  initial: { opacity: 0, y: 16, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.8, delay, ease: EASE },
});

export function Hero() {
  const track = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;
  const [loopOpen, setLoopOpen] = useState(false);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const cueFill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={track} id="top" aria-label="Introduction" className="relative h-[260vh] lg:h-[300vh]">
      <div className="sticky top-0 h-dvh min-h-[560px] overflow-hidden">
        <HeroScene progress={scrollYProgress} reduce={reduce} preload />

        {/* Legibility scrims */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(4,7,13,0.92)_0%,rgba(4,7,13,0.7)_28%,rgba(4,7,13,0.15)_55%,transparent_70%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink-950/80 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-ink-950 via-ink-950/75 to-transparent sm:h-1/3 sm:from-ink-950/90 sm:via-ink-950/30" />

        <div className="container-x relative flex h-full flex-col justify-end pb-16 pt-28 sm:justify-center sm:pb-0">
          <div className="max-w-[34rem]">
            <motion.p className="eyebrow" {...item(0.15)}>
              {HERO.eyebrow}
            </motion.p>

            <h1 className="display mt-4 text-[clamp(2.9rem,6.4vw,5.75rem)] text-white sm:mt-5">
              {HERO.title.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.04em]">
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.95, delay: 0.25 + i * 0.1, ease: EASE }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              className="mt-5 max-w-[26rem] text-[15px] font-medium leading-[1.5] text-fog-200 sm:text-base"
              {...item(0.6)}
            >
              {HERO.body}
            </motion.p>

            <motion.div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row" {...item(0.75)}>
              <motion.a
                href="#systems"
                onClick={(e) => scrollToId("systems") && e.preventDefault()}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="btn-amber group inline-flex items-center justify-center gap-2.5 rounded-md px-6 py-3.5 text-[13px] font-bold transition-shadow"
              >
                {HERO.primary}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </motion.a>
              <motion.button
                type="button"
                onClick={() => setLoopOpen(true)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center justify-center gap-2.5 rounded-md border border-white/45 bg-white/[0.03] px-5 py-3 text-[13px] font-semibold text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10"
              >
                <span className="grid size-6 place-items-center rounded-full border border-white/70 transition-colors group-hover:border-amber-400 group-hover:text-amber-300">
                  <Play className="size-3 fill-current" />
                </span>
                {HERO.secondary}
              </motion.button>
            </motion.div>

            <motion.div className="mt-9 flex items-center gap-4" {...item(0.9)}>
              <span className="h-px w-10 bg-white/80" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/80">{HERO.tags}</span>
            </motion.div>
          </div>
        </div>

        {/* Scroll cue (right edge) */}
        <motion.div
          className="absolute bottom-10 right-5 hidden flex-col items-center gap-4 sm:flex lg:right-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/80 [writing-mode:vertical-rl]">
            Scroll to explore
          </span>
          <span className="relative h-20 w-px overflow-hidden bg-white/25">
            <motion.span
              className="absolute inset-x-0 top-0 h-full origin-top bg-amber-400 shadow-[0_0_8px_rgba(255,178,30,1)]"
              style={{ scaleY: cueFill }}
            />
          </span>
        </motion.div>
      </div>

      <LoopDialog open={loopOpen} onClose={() => setLoopOpen(false)} />
    </section>
  );
}
