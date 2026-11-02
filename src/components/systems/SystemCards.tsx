"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { STEPS, SYSTEMS, type System } from "@/lib/content";
import { Dialog } from "../ui/Dialog";
import { EASE } from "../ui/Reveal";
import { StepIcon } from "../ui/StepIcon";

function SystemCard({ s, i, onOpen }: { s: System; i: number; onOpen: () => void }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.85, delay: i * 0.15, ease: EASE }}
      className="group relative isolate flex min-h-[250px] overflow-hidden rounded-md border border-white/15 bg-ink-800 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] transition-[border-color,box-shadow] duration-500 hover:border-amber-400/60 hover:shadow-[0_0_0_1px_rgba(255,178,30,0.25),0_24px_70px_-24px_rgba(255,122,24,0.55)] sm:min-h-[300px] lg:min-h-[240px] xl:min-h-[250px]"
    >
      <Image
        src={s.image}
        alt={s.alt}
        fill
        sizes="(min-width: 1024px) 33vw, 100vw"
        quality={80}
        className="-z-10 object-cover object-right transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,11,20,0.96)_0%,rgba(7,11,20,0.82)_38%,rgba(7,11,20,0.15)_75%,transparent_100%)]" />

      <div className="flex max-w-[17rem] flex-col p-6 xl:p-7">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/80">
          {s.index} <span className="mx-1 text-white/50">/</span> {s.label}
        </p>
        <span className="mt-3 h-px w-6 bg-amber-400 transition-all duration-500 group-hover:w-12" />
        <h3 className="display mt-5 text-[clamp(1.3rem,1.75vw,1.65rem)] leading-[0.98] text-white">
          <span className="block">{s.title[0]}</span>
          <span className="block whitespace-nowrap">{s.title[1]}</span>
        </h3>
        <p className="mt-3 max-w-[14.5rem] text-[12.5px] font-medium leading-[1.45] text-fog-200">{s.body}</p>
        <div className="mt-auto flex items-center gap-4 pt-6">
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex items-center gap-2 text-[12px] font-bold text-amber-400 transition-colors hover:text-amber-300 focus-visible:outline-offset-4"
          >
            {s.cta}
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button
            type="button"
            onClick={onOpen}
            aria-label={`${s.cta}: open details`}
            className="grid size-8 place-items-center rounded-full border border-white/60 text-white transition-all duration-300 hover:scale-105 group-hover:border-amber-400 group-hover:bg-amber-400 group-hover:text-ink-950"
          >
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function SystemCards() {
  const [openId, setOpenId] = useState<string | null>(null);
  const current = SYSTEMS.find((s) => s.id === openId) ?? null;
  const step = current ? STEPS[current.step] : null;

  return (
    <section id="systems" aria-label="Systems" className="bg-ink-950 pt-4 lg:pt-5">
      <div className="container-x">
        <div className="grid gap-4 lg:grid-cols-3 lg:gap-5">
          {SYSTEMS.map((s, i) => (
            <SystemCard key={s.id} s={s} i={i} onOpen={() => setOpenId(s.id)} />
          ))}
        </div>
      </div>

      <Dialog
        open={!!current}
        onClose={() => setOpenId(null)}
        label={current ? `${current.title.join(" ")} details` : "System details"}
        className="max-w-4xl"
      >
        {current && step && (
          <div className="grid md:grid-cols-[1.1fr_1fr]">
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[420px]">
              <Image src={current.image} alt={current.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-ink-900/40" />
            </div>
            <div className="flex flex-col p-7 sm:p-9">
              <p className="eyebrow">
                {current.index} / {current.label}
              </p>
              <span className="mt-3 h-px w-10 bg-amber-400" />
              <h3 className="display mt-5 text-[clamp(1.8rem,3vw,2.5rem)] text-white">
                <span className="block">{current.title[0]}</span>
                <span className="block">{current.title[1]}</span>
              </h3>
              <p className="mt-4 text-[15px] font-medium leading-relaxed text-fog-200">{current.body}</p>

              <div className="mt-8 rounded-md border border-white/12 bg-ink-800/80 p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-fog-400">Stage in the current</p>
                <div className="mt-4 flex items-start gap-3.5">
                  <StepIcon kind={step.icon} className="mt-0.5 size-7" />
                  <div className="border-l border-white/25 pl-3.5">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-white/80">{step.n}</p>
                    <p className="mt-0.5 text-sm font-extrabold uppercase tracking-wide text-white">{step.title}</p>
                    <p className="mt-1 text-[13px] text-fog-200">{step.body}</p>
                  </div>
                </div>
                <ol className="mt-5 flex gap-1.5" aria-label="Progress through the system">
                  {STEPS.map((st, idx) => (
                    <li
                      key={st.n}
                      className={`h-1 flex-1 rounded-full ${idx <= current.step ? "bg-amber-400 shadow-[0_0_8px_rgba(255,178,30,0.8)]" : "bg-white/15"}`}
                    >
                      <span className="sr-only">
                        {st.title}
                        {idx <= current.step ? " (reached)" : ""}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-auto flex gap-2 pt-8">
                {SYSTEMS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setOpenId(s.id)}
                    aria-pressed={s.id === current.id}
                    className={`rounded-md border px-3 py-2 text-[11px] font-bold uppercase tracking-[0.15em] transition ${
                      s.id === current.id
                        ? "border-amber-400 bg-amber-400/10 text-amber-300"
                        : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
                    }`}
                  >
                    {s.index} {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </section>
  );
}
