import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

/** Shell for the footer-linked pages (Contact, Privacy, Terms, Accessibility). */
export function InfoPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="relative overflow-hidden pb-16 pt-[calc(var(--header-h)+3.5rem)] sm:pt-[calc(var(--header-h)+5rem)]">
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[640px] rounded-full bg-ember-500/15 blur-[120px]" />
        <div className="container-x relative">
          <Link href="/" className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-fog-200 transition-colors hover:text-amber-300">
            <ArrowLeft className="size-4" /> Back to the grid
          </Link>
          <p className="eyebrow mt-10">{eyebrow}</p>
          <h1 className="display mt-4 text-[clamp(2.4rem,5vw,4.25rem)] text-white">{title}</h1>
          <p className="mt-5 max-w-2xl text-base font-medium leading-relaxed text-fog-200">{intro}</p>
          <div className="mt-12 max-w-3xl space-y-8 text-[15px] leading-relaxed text-fog-200 [&_h2]:text-sm [&_h2]:font-extrabold [&_h2]:uppercase [&_h2]:tracking-[0.15em] [&_h2]:text-white">
            {children}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
