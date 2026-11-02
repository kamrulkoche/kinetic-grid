// Final QA screenshots: dialogs, sub-pages and reference-vs-build comparisons. Usage: node scripts/final-shots.mjs [baseUrl]
import { chromium } from "@playwright/test";
import sharp from "sharp";
const base = process.argv[2] ?? "http://localhost:3001";
const out = "qa/screenshots";
const b = await chromium.launch({ channel: "chrome" });
const page = await b.newPage({ viewport: { width: 1440, height: 810 } });
await page.goto(base, { waitUntil: "networkidle" });
await page.waitForTimeout(1800);
await page.screenshot({ path: `${out}/desktop-01-hero.png` });
const track = await page.evaluate(() => document.getElementById("top").offsetHeight - innerHeight);
for (const [p, n] of [[0.28, "02-hero-pushin"], [0.55, "03-hero-city"], [1, "04-hero-city-lit"]]) {
  await page.evaluate((y) => scrollTo(0, y), Math.round(track * p));
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${out}/desktop-${n}.png` });
}
for (const [id, n] of [["concept", "05-outputs-cards"], ["journal", "06-cta-footer"]]) {
  await page.evaluate((i) => document.getElementById(i).scrollIntoView(), id);
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${out}/desktop-${n}.png` });
}
await page.locator("#systems article").nth(0).hover();
await page.waitForTimeout(900);
await page.screenshot({ path: `${out}/desktop-07-card-hover.png` });
await page.getByRole("button", { name: "Explore Systems", exact: true }).click();
await page.waitForTimeout(900);
await page.screenshot({ path: `${out}/desktop-08-system-dialog.png` });
await page.keyboard.press("Escape");
await page.locator("#subscribe-email").fill("runner@example.com");
await page.locator("#journal").getByRole("button", { name: /Enter the Current/ }).click();
await page.waitForTimeout(900);
await page.screenshot({ path: `${out}/desktop-09-subscribed.png` });
await page.evaluate(() => scrollTo(0, 0));
await page.waitForTimeout(500);
await page.getByRole("button", { name: "Watch the Loop" }).click();
await page.waitForTimeout(4200);
await page.screenshot({ path: `${out}/desktop-10-loop-dialog.png` });
await page.keyboard.press("Escape");
await page.goto(`${base}/contact`);
await page.waitForTimeout(900);
await page.screenshot({ path: `${out}/desktop-11-contact.png` });
await b.close();

// Reference vs build, side by side
const ref = "reference-analysis/screenshots";
const pairs = [
  ["01-hero-t1.5s-wheel.jpg", "desktop-01-hero.png", "compare-hero"],
  ["03-hero-t2.6s-zoom-into-wheel.jpg", "desktop-02-hero-pushin.png", "compare-pushin"],
  ["05-hero-t6.8s-city-full.jpg", "desktop-04-hero-city-lit.png", "compare-city"],
  ["09-outputs-t11.2s-cards.jpg", "desktop-05-outputs-cards.png", "compare-outputs"],
  ["12-full-t13.8s-cta-footer.jpg", "desktop-06-cta-footer.png", "compare-cta-footer"],
];
for (const [r, s, n] of pairs) {
  // Reference frames: laptop screen spans x≈140–1410 of the 1536-wide capture
  const { width } = await sharp(`${ref}/${r}`).metadata();
  const k = width / 1536; // some frames were captured at 0.6 scale
  const crop = { left: Math.round(140 * k), top: 0, width: Math.round(1270 * k), height: Math.round(705 * k) };
  const left = await sharp(`${ref}/${r}`).extract(crop).resize(960, 533).toBuffer();
  const right = await sharp(`${out}/${s}`).resize(960, 540, { fit: "cover", position: "top" }).toBuffer();
  await sharp({ create: { width: 1940, height: 540, channels: 3, background: "#111" } })
    .composite([{ input: left, left: 0, top: 3 }, { input: right, left: 980, top: 0 }])
    .png()
    .toFile(`${out}/${n}.png`);
}
console.log("done");
