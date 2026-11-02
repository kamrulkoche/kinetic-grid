import Image from "next/image";
import Link from "next/link";
import { FOOTER, LEGAL, NAV } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer id="about" className="bg-ink-950 pb-6 pt-5">
      <div className="container-x">
        <div className="relative isolate overflow-hidden rounded-md border border-white/10">
          <Image
            src="/images/footer-skyline.jpg"
            alt=""
            fill
            sizes="100vw"
            quality={75}
            className="-z-10 object-cover object-[60%_60%]"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,7,13,0.95)_0%,rgba(4,7,13,0.75)_35%,rgba(4,7,13,0.35)_70%,rgba(4,7,13,0.55)_100%)]" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950/80 via-transparent to-ink-950/40" />

          <div className="grid gap-8 px-6 pb-6 pt-9 sm:px-9 lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:px-14 lg:pt-10">
            <div>
              <Link href="/" className="text-xl font-semibold tracking-[0.16em] text-white sm:text-2xl">
                KINETIC GRID
              </Link>
              <p className="mt-2 text-[13px] font-medium text-fog-200">{FOOTER.tagline}</p>
            </div>

            <nav aria-label="Footer">
              <ul className="flex flex-wrap gap-x-8 gap-y-3 lg:pt-3">
                {NAV.map((n) => (
                  <li key={n.id}>
                    <Link href={n.href} className="text-[13px] font-semibold text-white/90 transition-colors hover:text-amber-300">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Legal" className="lg:justify-self-end">
              <ul className="flex flex-wrap gap-x-6 gap-y-3 lg:pt-3">
                {LEGAL.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[12px] font-medium text-fog-200/85 transition-colors hover:text-amber-300">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mx-6 border-t border-white/20 py-5 sm:mx-9 lg:mx-14 lg:mr-[45%]">
            <p className="text-[11px] font-medium text-fog-200/80">{FOOTER.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
