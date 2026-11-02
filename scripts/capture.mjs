// Captures the site at the same states as the reference frames.
// Usage: node scripts/capture.mjs [outDir] [baseUrl] [width] [height]
import { chromium } from "@playwright/test";
import fs from "node:fs";
const out = process.argv[2] ?? "test-results/capture";
const base = process.argv[3] ?? "http://localhost:3100";
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" }).catch(() => chromium.launch());
const width = Number(process.argv[4] ?? 1440);
const height = Number(process.argv[5] ?? 810);
const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: width < 1024 ? 2 : 1, hasTouch: width < 1024 });
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto(base, { waitUntil: "networkidle" });
await page.waitForTimeout(1600);
const trackH = await page.evaluate(() => document.getElementById("top").offsetHeight - innerHeight);
for (const p of [0, 0.15, 0.3, 0.4, 0.55, 0.75, 1]) {
  await page.evaluate((y) => scrollTo(0, y), Math.round(trackH * p));
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${out}/hero-p${String(p).padEnd(4, "0")}.png` });
}
for (const id of ["concept", "systems", "journal", "about"]) {
  await page.evaluate((i) => document.getElementById(i).scrollIntoView({ block: "start" }), id);
  await page.waitForTimeout(1300);
  await page.screenshot({ path: `${out}/section-${id}.png` });
}
console.log("errors:", errors.length ? errors : "none");
await browser.close();
