/** Smooth-scroll to an in-page section; the header offset comes from `scroll-padding-top`. */
export function scrollToId(id: string, focusSelector?: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
  if (focusSelector) {
    window.setTimeout(
      () => document.querySelector<HTMLElement>(focusSelector)?.focus({ preventScroll: true }),
      reduce ? 0 : 700,
    );
  }
  return true;
}
