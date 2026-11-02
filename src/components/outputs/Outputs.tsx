"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { OUTPUTS, STEPS } from "@/lib/content";
import { EASE, Reveal } from "../ui/Reveal";
import { StepIcon } from "../ui/StepIcon";

function ProcessFlow() {
  const reduce = useReducedMotion();
  return (
    <ol
      id="output"
      aria-label="How the system works"
      className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-0"
    >
      {STEPS.map((s, i) => (
        <li key={s.n} className="flex flex-col sm:flex-1 sm:flex-row sm:items-start">
          <motion.div
            className="flex items-start gap-4 sm:gap-3.5"
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: -20, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.7, delay: 0.2 + i * 0.18, ease: EASE }}
          >
            <StepIcon kind={s.icon} className="mt-1 size-7 shrink-0" />
            <div className="border-l border-white/25 pl-4 sm:pl-3.5">
              <p className="text-[10px] font-bold tracking-[0.2em] text-white/80">{s.n}</p>
              <h3 className="mt-1 text-[12px] font-extrabold uppercase leading-[1.15] tracking-wide text-white">
                {s.title.split(" ").map((w) => (
                  <span key={w} className="block">
                    {w}
                  </span>
                ))}
              </h3>
              <p className="mt-1.5 max-w-[9.5rem] text-[11px] font-medium leading-snug text-fog-200">{s.body}</p>
            </div>
          </motion.div>
          {i < STEPS.length - 1 && (
            <motion.span
              aria-hidden
              className="ml-[13px] py-1 text-white/70 sm:ml-auto sm:mr-4 sm:mt-5 sm:py-0 lg:mr-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 + i * 0.18 }}
            >
              <ArrowRight className="hidden size-4 sm:block" />
              <ArrowDown className="size-4 sm:hidden" />
            </motion.span>
          )}
        </li>
      ))}
    </ol>
  );
}

export function Outputs() {
  const band = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: band, offset: ["start end", "end start"] });
  const parallax = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);

  return (
    <section id="concept" aria-labelledby="outputs-title" className="relative bg-ink-950 pt-6 lg:pt-8">
      <div className="container-x">
        <div
          ref={band}
          className="relative overflow-hidden rounded-lg border border-white/10 bg-ink-900 lg:min-h-[400px] lg:rounded-none lg:border-x-0 lg:border-t-0"
        >
          {/* Panorama: offset right so the wheel sits just past the text panel, as in the reference */}
          <div className="relative aspect-[16/10] w-full sm:aspect-[2/1] lg:absolute lg:inset-y-0 lg:left-[30%] lg:right-0 lg:aspect-auto">
            <motion.div className="absolute inset-x-0 -inset-y-[8%]" style={{ y: parallax }}>
              <Image
                src="/images/outputs-banner.jpg"
                alt="A glowing running-wheel generator feeding neon power lines toward a city skyline at dusk"
                fill
                sizes="(min-width: 1024px) 80vw, 100vw"
                quality={80}
                className="object-cover object-[30%_55%] lg:object-[50%_55%]"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent lg:bg-[linear-gradient(90deg,var(--color-ink-900)_0%,rgba(7,11,20,0.6)_8%,transparent_26%)]" />
            <div className="absolute inset-x-0 bottom-0 hidden h-24 bg-gradient-to-t from-ink-900/80 to-transparent lg:block" />
          </div>

          <div className="relative grid gap-10 p-6 pt-2 sm:p-10 lg:grid-cols-[minmax(0,30rem)_1fr] lg:gap-8 lg:p-0 lg:py-12 lg:pl-14">
            <Reveal>
              <p className="eyebrow">{OUTPUTS.eyebrow}</p>
              <h2 id="outputs-title" className="display mt-4 text-[clamp(1.9rem,3.1vw,2.85rem)] text-white lg:whitespace-nowrap">
                {OUTPUTS.title.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </h2>
              <p className="mt-4 max-w-[25rem] text-[14px] font-medium leading-[1.5] text-fog-200 sm:text-[15px]">
                {OUTPUTS.body}
              </p>
              <div className="mt-7 flex items-center gap-4">
                <span className="h-px w-10 shrink-0 bg-white/70" />
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/75 sm:text-[10px]">
                  {OUTPUTS.tags}
                </span>
              </div>
            </Reveal>

            <div className="lg:pr-10 lg:pt-1 xl:pl-[14%]">
              <ProcessFlow />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
