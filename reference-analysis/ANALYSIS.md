# Kinetic Grid: Reference Video Analysis

**Source:** Facebook Reel by "Web Fueled", `facebook.com/reel/1574425648034447` (share link `fb.com/share/r/1EC44TkzNS`)
**Captured:** 2026-11-03, in a real Chrome session (Claude in Chrome extension, logged-in session).
**Video:** 13.87 s, 720×1280, portrait. A laptop on a desk shows a website being scrolled. The overlay caption reads "GPT-6.1 SOL / THIS WEBSITE SOLD ITSELF", and the post copy describes it as a "premium scroll driven section".

## Method

1. Opened the share URL in Chrome. It redirected to the reel, which played muted.
2. Paused the `<video>` element through JS, then re-parented it into a fixed full-viewport layer scaled 3.9× around the laptop screen so the site UI was readable.
3. Seeked frame-accurately (awaiting `seeked`) through the whole timeline (0 → 13.8 s) and captured a screenshot at every visual state change. A zoomed crop covers the CTA and footer.
4. Viewed every frame and wrote down layout, copy, colour, type and motion.

The site in the video was **scrolled, not hovered**. The video shows no cursor or hover states, so hover behaviour below is a design decision, not something observed.

## Timeline

| t (s) | What is on screen | Screenshot |
|---|---|---|
| 0.0–1.5 | Hero at rest: runner in a giant glowing orange wheel generator, dark industrial hall, window to mountains and wind turbines, wet reflective floor | `01-hero-t1.5s-wheel.jpg` |
| 1.5–2.6 | **Scroll-scrubbed camera push** into the wheel. The background zooms toward the wheel and runner; the text stays pinned | `03-hero-t2.6s-zoom-into-wheel.jpg` |
| 2.6–3.5 | Push continues **through** the wheel, then motion-blur dissolves to a blue aerial city with a few orange energy streaks | `02-hero-t3.5s-city-transition.jpg` |
| 3.5–5.0 | Camera pulls back. Orange "energy veins" **spread across the street grid** | `04-hero-t5.0s-city-glow.jpg` |
| 5.0–6.8 | Whole city lit: river, bridges, harbour, every street glowing | `05-hero-t6.8s-city-full.jpg` |
| 6.8–7.8 | Pin releases; the hero scrolls up and the Outputs section enters from below. Its heading arrives blurred/ghosted (blur → sharp reveal) | `07-scroll-t7.8s-hero-exit.jpg` |
| 7.8–8.5 | Outputs band settles: eyebrow, heading, copy, rule + tags | `06-outputs-t8.5s-band-reveal.jpg` |
| 8.5–9.6 | Process steps 01 → 02 → 03 **stagger in left to right**, with arrows between them | `08-outputs-t9.6s-steps-stagger.jpg` |
| 9.6–11.2 | Three cards **stagger up with fade + blur** (card 1, then 2, then 3) | `10-cards-t10.4s-stagger.jpg`, `09-outputs-t11.2s-cards.jpg` |
| 11.2–13.0 | Continued scroll; the CTA band rises in (blur → sharp) | `11-cta-t13.0s-cta-enter.jpg` |
| 13.0–13.87 | End state: Outputs, cards, CTA band and footer all visible | `12-full-t13.8s-cta-footer.jpg`, `13-zoom-cta-footer.png` |

## Page structure (top → bottom)

1. **Header**: transparent, overlaying the hero.
   - Left: `KINETIC GRID` wordmark, medium weight, wide tracking (~0.12em), white.
   - Centre: `Concept · Systems · Output · Journal · About`, small (~13px) white medium.
   - Right: outline pill button `Enter the Current →`, with an amber 1.5px border, white text and a faint amber glow.
2. **Hero** (full viewport, pinned while the background animates).
   - Eyebrow: `HUMAN MOTION / REAL POWER`, tiny (~10px), bold, very wide tracking (~0.3em).
   - H1: `RUN THE / FUTURE / FORWARD.` on three lines. A heavy geometric sans (Montserrat-like ExtraBold/Black), uppercase, tight leading (~0.92). It takes roughly 30% of the width, at about 72px on a 1440 screen.
   - Body: "A fictional energy concept where movement becomes momentum, and momentum becomes power. …". The fourth line is AI-garbled in the source ("erahmy the altnes") and can't be read.
   - Buttons: primary `Explore the System →` (amber→yellow gradient fill, dark text, ~6px radius, warm glow); secondary `▶ Watch the Loop` (transparent, 1px white/40% border, play icon in a circle).
   - Under the buttons: a short white rule, then tagline `MOTION / VOLTAGE / POSSIBILITY` (tiny, tracked).
   - Right edge: vertical `SCROLL TO EXPLORE` (rotated 90°, tiny tracked) above a thin vertical line.
   - Background: cinematic scroll-scrubbed sequence (wheel → push-in → city → glow spreads).
   - Readability: a dark gradient on the left ~40%.
3. **Outputs ("Three Outputs")**: a wide image band.
   - Image: rooftop or industrial platform with the glowing wheel, neon orange pipes running to a city skyline across water at dusk.
   - Left overlay panel (dark gradient): eyebrow `FROM MOVEMENT TO A BRIGHTER TOMORROW`; H2 `THREE OUTPUTS. / ONE HUMAN CURRENT.` (~40px heavy); body "Your motion is converted into real electrical power through a closed system — generating voltage, storing energy, and feeding clean power to the city."; rule + `MOTION / CONVERSION / STORAGE / CITY SUPPLY`.
   - Top-right process flow over the image: `⚡ 01 VOLTAGE GENERATION / Human motion creates electricity.` → `🔋 02 ENERGY STORAGE / Power is stabilized and stored.` → `🗼 03 CITY SUPPLY / Clean energy flows to the grid.`. Icons are amber, steps are split by thin vertical rules, and arrows sit between them.
4. **Cards**: three equal cards in a row, each with an image background, a dark left gradient, a thin border and ~6px radius.
   - `01 / MOTION`, **THE HUMAN ENGINE**: "Every step, every stride, every moment of movement becomes electrical energy." `Explore Motion → (→)`
   - `02 / TRANSFER`, **CURRENT IN MOTION**: "Generated power is converted, regulated, and transferred through an intelligent system." `Explore Systems → (→)`
   - `03 / CITY`, **POWER AFTER DARK**: "Clean, human-generated energy flows to the city, helping communities thrive." `Explore Output → (→)`
   - Each card has a tiny tracked label, a short amber rule, a ~22px heavy uppercase two-line title, small body text, and an amber link plus a circled-arrow icon button.
5. **CTA band**: a dark bar with a strong orange glow bleeding in from the right edge.
   - `TURN EFFORT INTO INFRASTRUCTURE.` (~30px heavy), with sub-copy "Be the first to get updates on our progress, upcoming locations, and the future of human-powered cities."
   - A vertical divider, then an email input (`Your email address`, dark fill, light border, 6px radius) and an amber gradient button `Enter the Current →`.
6. **Footer**: a night skyline with a suspension bridge as background, darkened on the left.
   - `KINETIC GRID` wordmark + "Human motion turned into urban possibility."
   - Centre nav repeats the header links. Right: `Contact · Privacy · Terms · Accessibility` (smaller, muted).
   - A rule, then `© 2026 Kinetic Grid. All rights reserved.`

## Visual system observed

| Token | Value (sampled / estimated) |
|---|---|
| Base background | Near-black navy `#05080F` to `#0A0F1A` |
| Panel | `#0B111C` at 80–90% over imagery |
| Primary accent | Amber-to-yellow gradient `#FFB21E → #FFD54A` |
| Glow orange | `#FF7A18` / `#FF8C1A` (wheel neon, city veins) |
| Text | `#FFFFFF`; body `#C9D1DC`; muted `#8A94A6` |
| Hairline | `rgba(255,255,255,0.12–0.18)` |
| Radius | buttons/inputs ~6px; cards ~6–8px; nav CTA ~10px |
| Shadow / glow | amber `0 0 24px rgba(255,170,30,.35)` on primary buttons and hovered borders |
| Type | One heavy geometric sans for display (uppercase, tight). The same family at medium weight for body. Micro labels are 10–11px, bold, tracking 0.25–0.35em |

## Motion observed

- **Pinned scroll-scrub hero** (the signature effect). The background is tied to scroll progress, not time, and runs about 3 viewports of scroll.
- **Blur-to-sharp reveals** on section headings and the CTA as they enter.
- **Left-to-right stagger** on process steps (~150 ms apart).
- **Bottom-up stagger + fade + blur** on the three cards (~150 ms apart).
- Text in the hero stays static while the background moves.

## Responsive

The video shows desktop only. Mobile and tablet layouts are designed in the blueprint to follow the same system: stacked content, steps listed vertically, single-column cards and a hamburger menu.

## Interpretation notes

- **Imagery:** the creator's AI renders aren't reused. Original stand-ins were generated with Magnific to the same brief (wheel generator, glowing aerial city, pipe-to-skyline panorama, three card subjects, skyline footer).
- **Hero scroll effect:** the source is probably a video or frame sequence. Here it's rebuilt from two stills with scroll-linked zoom, blur, crossfade and an expanding radial "energy spread" mask.
- **Garbled hero line:** written as "powering the cities of tomorrow."
- **Nav targets without their own section in the reference:** these link to the closest existing section and add no new sections. Concept → Outputs intro, Systems → cards, Output → process flow, Journal → updates (CTA) band, About → footer.
