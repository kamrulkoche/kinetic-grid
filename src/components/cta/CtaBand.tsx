"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { CTA } from "@/lib/content";
import { validateEmail } from "@/lib/validation";
import { Reveal } from "../ui/Reveal";

type State = { kind: "idle" } | { kind: "pending" } | { kind: "error"; msg: string } | { kind: "done"; msg: string };

export function CtaBand() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const error = validateEmail(email);
    if (error) return setState({ kind: "error", msg: error });
    setState({ kind: "pending" });
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) return setState({ kind: "error", msg: data.error ?? "Something went wrong." });
      setState({ kind: "done", msg: data.message });
      setEmail("");
    } catch {
      setState({ kind: "error", msg: "Network error. Please try again." });
    }
  }

  const err = state.kind === "error" ? state.msg : null;

  return (
    <section id="journal" aria-labelledby="cta-title" className="bg-ink-950 pt-5">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-md border border-white/10 bg-ink-900">
          {/* Orange glow bleeding in from the right, as in the reference */}
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_140%_at_100%_50%,rgba(255,122,24,0.55),rgba(255,122,24,0.12)_45%,transparent_70%)]" />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-24 top-1/2 size-[420px] -translate-y-1/2 rounded-full bg-ember-500/30 blur-3xl"
            animate={{ opacity: [0.55, 0.9, 0.55], scale: [1, 1.08, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative grid gap-8 p-6 sm:p-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-8 lg:px-14 lg:py-9">
            <div>
              <h2 id="cta-title" className="display text-[clamp(1.5rem,2.2vw,2rem)] leading-[1] text-white xl:whitespace-nowrap">
                {CTA.title}
              </h2>
              <p className="mt-2.5 max-w-xl text-[13px] font-medium text-fog-200 sm:text-sm">{CTA.body}</p>
            </div>

            <form
              noValidate
              onSubmit={onSubmit}
              className="relative flex flex-col gap-3 sm:flex-row lg:border-l lg:border-white/25 lg:pl-8"
            >
              <div className="sm:flex-1 lg:w-[15rem] lg:flex-none xl:w-[16.5rem]">
                <label htmlFor="subscribe-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="subscribe-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder={CTA.placeholder}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (state.kind !== "idle" && state.kind !== "pending") setState({ kind: "idle" });
                  }}
                  aria-invalid={!!err}
                  aria-describedby="subscribe-status"
                  className={`h-12 w-full rounded-md border bg-ink-950/80 px-4 text-sm font-medium text-white placeholder:text-fog-400 outline-none transition focus:border-amber-400 focus:shadow-[0_0_0_3px_rgba(255,178,30,0.2)] ${
                    err ? "border-red-400/80" : "border-white/30"
                  }`}
                />
              </div>
              <motion.button
                type="submit"
                disabled={state.kind === "pending"}
                whileTap={{ scale: 0.97 }}
                className="btn-amber group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-md px-7 text-[13px] font-bold transition-shadow disabled:opacity-80"
              >
                {state.kind === "pending" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Connecting…
                  </>
                ) : state.kind === "done" ? (
                  <>
                    <Check className="size-4" /> You&apos;re in
                  </>
                ) : (
                  <>
                    {CTA.button} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </motion.button>
              <div id="subscribe-status" aria-live="polite" className="sm:absolute sm:-bottom-7 sm:left-0 lg:left-8">
                <AnimatePresence mode="wait">
                  {(err || state.kind === "done") && (
                    <motion.p
                      key={err ?? "done"}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`text-xs font-semibold ${err ? "text-red-300" : "text-amber-300"}`}
                    >
                      {err ?? (state.kind === "done" ? state.msg : "")}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
