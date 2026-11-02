# Kinetic Grid: Browser Testing Report

**Date:** 2026-11-03 · **Browser:** Google Chrome (installed, Playwright `channel: "chrome"`) · **Playwright:** 1.64 · **Next.js:** 16.4.4 (dev server, Turbopack)

## Result

**60 passed · 0 failed · 9 skipped (by design)** across three viewport projects. Raw output is in `test-run.log`.

| Project | Viewport | Passed | Skipped (why) |
|---|---|---|---|
| desktop | 1440×900 | 22 | 1 (mobile-menu test is mobile/tablet only) |
| tablet | 820×1180, touch, DPR 2 | 19 | 4 (API runs once; hover is pointer-only; reduced-motion runs once) |
| mobile | Pixel 7 (412×839, touch) | 19 | 4 (same as tablet) |
| walkthrough | 1440×900, video on | 1 | n/a (`walkthrough.webm`) |

**Console errors:** every test runs under a fixture (`e2e/fixtures.ts`) that fails on any `console.error` or uncaught page error. None were recorded.

## Coverage

| Area | Tests |
|---|---|
| Sections | Every reference section renders (hero, Outputs band, process flow, 3 cards, CTA band, footer) with the reference copy |
| Assets | Every `<img>` loads (`naturalWidth > 0`) after walking the page |
| Scroll animation | The hero wheel layer's transform changes with scroll; city opacity goes 0 → 1 and wheel 1 → 0; the headline stays pinned |
| Navigation | All 5 primary nav links (desktop nav, or mobile drawer) update the hash and land the section under the header; the wordmark returns to top; nav from a sub-page lands on the right home anchor |
| Buttons | "Explore the System" scrolls to the cards; the header CTA scrolls to the sign-up and focuses the email field |
| Loop dialog | Opens, locks body scroll, the progress bar advances, pause freezes it, Esc closes and focus returns to the trigger |
| Card dialog | Text link and circular arrow both open it; the stage panel matches the card; tab switching works; the close button and Esc work |
| Newsletter | Empty and invalid emails show inline errors with `aria-invalid`; a valid email posts to `/api/subscribe` and confirms |
| Contact | Field-level validation, then a successful submit resets the form |
| Pages | Contact, Privacy, Terms and Accessibility each load from the footer and link back; unknown routes return 404 with the custom page |
| API | `/api/subscribe` (422 invalid, 400 malformed JSON, 200 ok) and `/api/contact` (422 with per-field errors, 200 ok) |
| Hover | Card border/glow changes on hover (pointer devices) |
| Responsive | No horizontal overflow at any viewport; desktop nav vs hamburger switch; 3-up cards ≥ 1024px, stacked below; the H1 fits the viewport |
| Mobile menu | Opens, sets `aria-expanded`, locks scroll, closes on Esc |
| Reduced motion | No push-in zoom under `prefers-reduced-motion`; content still visible |

## Issues found and fixed during testing

1. **Anchor offset doubled (real bug, mobile/tablet).** The sections had `scroll-margin-top` on top of the html `scroll-padding-top`, so nav targets landed 96px too low. Desktop hid this because the page bottomed out first. I removed the per-section margins.
2. **Tablet cards cramped.** Three columns at 820px pushed the body copy over the imagery, so cards are now single wide cards until `lg` (as the blueprint specifies).
3. **CTA overflow at 1440px.** The single-line headline (matching the reference) pushed the button off the edge. I tightened the form widths.
4. **Visual-parity fixes:** the Outputs H2, card titles and CTA headline now break on the same lines as the reference; the band image moved right so the wheel clears the copy; the hero's trailing period is plain white as in the reference; the mobile hero scrim is stronger over the lit city frame.
5. **Test-side corrections:** the malformed-JSON request is now sent as raw bytes; dialog text matching is exact (an sr-only label also matched); the scrolled-to assertion accepts max-scroll for sections near the page bottom.

## Reference vs build (Phase 7)

Side-by-side images are in `screenshots/compare-*.png` (reference left, build right).

| Check | Verdict |
|---|---|
| Layout | Matches section order, proportions and alignment: hero copy column, band with overlay panel + top-right flow, 3 cards, single-row CTA, 3-zone footer |
| Colour | Navy-black base, amber→yellow gradient CTAs, orange neon accents, white display type |
| Typography | Heavy geometric uppercase display (Montserrat 900), tracked micro-labels, same line breaks |
| Motion | Scroll-scrubbed push-in → dissolve → city → spreading glow; blur-to-sharp section reveals; L→R step stagger; bottom-up card stagger |
| Known differences | Imagery is original (generated), not the creator's renders, so compositions differ. The hero sequence is rebuilt from two stills rather than a rendered video, so the push-in can't fly *through* the wheel in true 3D. The band image is darker and less saturated than the reference |

## How to re-run

```bash
npm run dev -- -p 3001          # or let Playwright start it
npx playwright test --project=desktop --project=tablet --project=mobile
npx playwright test --project=walkthrough   # records qa video under test-results/
npx playwright show-report
node scripts/capture.mjs out http://localhost:3001 390 844   # ad-hoc captures
node scripts/final-shots.mjs                                  # regenerates qa/screenshots
```
