# Kinetic Grid

A Next.js recreation of the "Kinetic Grid" concept site shown in a Facebook reel by Web Fueled. The reference is a fictional human-powered energy brand with a cinematic, scroll-scrubbed hero.

**Stack:** Next.js 16.4 (App Router, Turbopack, Cache Components) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion 14 · Lucide React · Playwright

## Run

```bash
npm install
npm run dev            # http://localhost:3000 (use -p to change)
npm run build && npm start
npm run lint
npx playwright test --project=desktop --project=tablet --project=mobile
```

## Layout

```
src/app/                 routes: / (home), /contact, /privacy, /terms, /accessibility, not-found
  api/subscribe|contact  validated POST handlers (concept site: they acknowledge and store nothing)
  template.tsx           page transition (opacity only, so the fixed header and sticky hero keep working)
src/components/
  hero/HeroScene.tsx     the scroll-scrubbed background, driven by any 0→1 MotionValue
  hero/Hero.tsx          300vh scroll track + sticky stage + entrance-animated copy
  hero/LoopDialog.tsx    "Watch the Loop": the same scene on a timer
  outputs/               image band + process flow
  systems/               cards + detail dialog
  cta/CtaBand.tsx        newsletter form
  ui/                    Reveal (blur-to-sharp), Dialog (focus trap, Esc, scroll lock), StepIcon
src/lib/content.ts       all copy in one place
public/images/           generated imagery (Magnific), optimised JPEG
reference-analysis/      ANALYSIS.md, BLUEPRINT.md, frame-by-frame reference screenshots
qa/                      TEST-REPORT.md, test-run.log, final screenshots, walkthrough.webm
e2e/                     Playwright specs; scripts/ has the capture tools
```

## The hero effect

`HeroScene` layers two stills and maps scroll progress onto them. From 0 to 0.42 the wheel pushes in, scaling ×2.5 around its own focal point and blurring as it goes. From 0.3 to 0.5 a warm bloom plays while the aerial city fades in from a rotated, zoomed, blurred start. From 0.44 to 0.92 a radial mask grows outward and reveals the lit city over a dim blue-graded copy, which reproduces the "energy spreading through the streets" beat of the reference. With `prefers-reduced-motion` the zoom, rotation and blur are disabled and the layers only crossfade.
