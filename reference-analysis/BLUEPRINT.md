# Kinetic Grid: Design Blueprint

This blueprint is derived from `ANALYSIS.md` and the screenshots in `screenshots/`.

## 1. Page structure

```
/                      Home (single scroll page)
  <SiteHeader/>        fixed; transparent → blurred navy after 40px of scroll
  <Hero/>              #top       300vh scroll track with a sticky 100vh stage
  <Outputs/>           #concept   image band + intro panel + #output process flow
  <SystemCards/>       #systems   3 cards → detail dialog
  <CtaBand/>           #journal   newsletter form → POST /api/subscribe
  <SiteFooter/>        #about
  <LoopDialog/>        "Watch the Loop" auto-playing loop of the hero sequence
/[slug]                contact | privacy | terms | accessibility (footer links)
/api/subscribe         POST {email} → validated JSON response
/api/contact           POST {name,email,message} → validated JSON response
```

## 2. Components

| Component | Kind | Responsibility |
|---|---|---|
| `SiteHeader` | client | wordmark, nav, CTA, scroll state, mobile drawer |
| `Hero` | client | scroll track, `HeroScene` background, entrance-animated copy, scroll cue |
| `HeroScene` | client | layered stills driven by a `MotionValue<number>` (scroll progress or a looping timer), so the hero and `LoopDialog` share it |
| `Outputs` / `ProcessFlow` | client | band, blur reveal, staggered steps |
| `SystemCards` / `SystemCard` / `SystemDialog` | client | cards, hover, accessible dialog |
| `CtaBand` + `SubscribeForm` | client | validation, pending/success/error states |
| `SiteFooter` | server | static footer |
| `Button`, `Eyebrow`, `Reveal`, `Dialog` | shared UI primitives |
| `content.ts` | data | all copy in one place |

## 3. Colour palette (`globals.css` `@theme`)

```
--color-ink-950 #04070D   page background
--color-ink-900 #070B14   panels
--color-ink-800 #0D1320   inputs / card base
--color-amber-300 #FFD54A  gradient end
--color-amber-400 #FFB21E  gradient start / accent
--color-ember-500 #FF7A18  glow orange
--color-fog-200 #C9D1DC    body text
--color-fog-400 #8A94A6    muted
--line rgba(255,255,255,.14)
```

Primary button: `linear-gradient(90deg,#FFB21E,#FFD54A)` with text `#120A00`.
Glow: `0 0 0 1px rgba(255,178,30,.5), 0 8px 30px -6px rgba(255,140,26,.55)`.

## 4. Typography

- **Montserrat** (next/font, variable). Display weights 800 and 900; body weights 500 and 600.
- H1: `clamp(2.75rem, 6.2vw, 5.6rem)`, weight 900, uppercase, leading 0.9, tracking −0.01em.
- H2: `clamp(1.9rem, 3.2vw, 3rem)`, weight 900, uppercase, leading 0.95.
- Card title: `clamp(1.25rem, 1.7vw, 1.6rem)`, weight 900, uppercase, leading 1.
- Body: 15–17px, weight 500, leading 1.45, colour fog-200.
- Micro label (`Eyebrow`): 10–11px, weight 700, uppercase, tracking 0.3em.
- Wordmark: 18–20px, weight 600, tracking 0.14em.

## 5. Spacing and layout

- Container: `max-w-[1440px]` with padding `px-5 sm:px-8 lg:px-14`.
- Section rhythm: CTA and footer at 48–64px vertical. The cards sit right after the band (gap 16–20px), as in the reference.
- Grid: cards are `md:grid-cols-3 gap-4 lg:gap-5`. The process flow is a 3-column row on desktop and a vertical list on mobile.
- Radius: buttons, inputs and cards use 6px (`rounded-md`). The nav CTA uses 10px.

## 6. Animation specification

| Element | Trigger | Spec |
|---|---|---|
| Header | mount | fade + y −12 → 0, 0.7s, ease `[0.22,1,0.36,1]` |
| Hero copy | mount | stagger 0.09s. Headline lines slide up from a mask (y 110% → 0, 0.9s); the rest fade + y 16 |
| Hero wheel layer | scroll 0 → 0.42 | scale 1 → 2.4 (origin at the wheel centre), blur 0 → 6px from 0.25 → 0.42 |
| Hero city layer | scroll 0.30 → 0.50 | opacity 0 → 1, scale 1.5 → 1.12, rotate −6° → 0, blur 8 → 0 |
| Energy spread | scroll 0.45 → 0.92 | saturated city layer revealed by a radial mask growing 0% → 140%; the dim blue base sits underneath |
| City settle | scroll 0.50 → 1 | scale 1.12 → 1.0 |
| Scroll cue | scroll | vertical line fill = progress |
| Section headings / CTA | in view (once, −15% margin) | opacity 0 → 1, blur 12px → 0, y 24 → 0, 0.9s |
| Process steps | in view | stagger 0.15s, x −20 → 0 + fade; arrows fade after their step |
| Cards | in view | stagger 0.15s, y 40 → 0, blur 8 → 0, fade |
| Card hover | hover | image scale 1.06 (0.8s); border becomes amber/60 with glow; arrow button turns amber; link arrow x +4 |
| Buttons | hover / tap | glow intensifies, y −1; tap scale 0.97 |
| Page transition | route change | `template.tsx` fade + y 12 → 0, 0.5s |
| Reduced motion | `prefers-reduced-motion` | no scrub zoom or blur; the city simply crossfades; reveals become opacity only |

## 7. Interactions

- Nav links smooth-scroll to their anchors, accounting for header height. The active section is highlighted.
- `Enter the Current` (header) scrolls to the CTA band and focuses the email input.
- `Explore the System` scrolls to `#systems`.
- `Watch the Loop` opens a dialog that plays the hero sequence on a 9s loop, with a play/pause control. Esc or the backdrop closes it.
- Card `Explore …` links and arrow buttons open a `SystemDialog` with the larger image, the stage in the flow and the description.
- The newsletter validates on the client, POSTs to `/api/subscribe`, and shows pending, success and inline error states.
- Footer legal links go to `/contact`, `/privacy`, `/terms` and `/accessibility`. Contact has a working validated form.
- Mobile menu: a hamburger opens a full-height drawer with the links and CTA, and locks body scroll. Esc closes it.

## 8. Responsive specification

| Breakpoint | Behaviour |
|---|---|
| < 640 (mobile) | Header: wordmark + hamburger. Hero copy fills the width, the background focal point moves right (`object-position: 68%`), and there's a bottom gradient for legibility. Hero buttons stack. Band: image on top, panel below. Steps are a vertical list with down-arrows. Cards are 1 column (aspect 4/3). CTA: everything stacked, input + button at full width. Footer is stacked |
| 640–1023 (tablet) | Hero copy is 70% wide. Steps sit in a row of 3 under the panel. Cards: 1 column of wide cards at `md`, 3 columns from `lg`. The CTA input row sits beside the button |
| ≥ 1024 (desktop) | The reference layout: band with the overlay panel left and flow top-right, 3 cards, CTA in one row, 3-zone footer |
