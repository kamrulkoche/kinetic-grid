import { chromium } from "@playwright/test";
const [out, mode, ...rest] = process.argv.slice(2);
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await (await b.newContext({ viewport: { width: 1600, height: Number(process.env.H ?? 900) }, locale: "en-US" })).newPage();
await p.goto("https://www.facebook.com/reel/2362581644495784", { waitUntil: "domcontentloaded", timeout: 60000 });
await p.waitForFunction(() => { const v = document.querySelector("video"); return v && v.readyState >= 2; }, null, { timeout: 30000 });
await p.waitForTimeout(2500);
const close = p.getByRole("dialog").getByRole("button", { name: /close/i });
if (await close.count()) await close.first().click().catch(() => {});
await p.keyboard.press("Escape").catch(() => {});
// Isolate the reel video in a fixed full-viewport layer. mode "full": whole frame. mode "zoom": scaled around a region.
const [cx, cy, cw] = rest.map(Number); // zoom: crop x, y, width in video px (540x960 space)
await p.evaluate(({ mode, cx, cy, cw }) => {
  const v = document.querySelector("video"); v.pause(); v.muted = true;
  const host = document.createElement("div");
  host.style.cssText = "position:fixed;inset:0;z-index:2147483647;background:#000;overflow:hidden";
  document.body.appendChild(host); host.appendChild(v);
  if (mode === "full") v.style.cssText = "position:absolute;left:50%;top:0;height:900px;width:506px;transform:translateX(-50%);object-fit:fill";
  else { const s = 1600 / cw; v.style.cssText = `position:absolute;left:${-cx * s}px;top:${-cy * s}px;width:${540 * s}px;height:${960 * s}px;object-fit:fill`; }
  window.__seek = (t) => new Promise((r) => { v.addEventListener("seeked", () => requestAnimationFrame(() => requestAnimationFrame(r)), { once: true }); v.currentTime = t; });
}, { mode, cx, cy, cw });
const dur = await p.evaluate(() => document.querySelector("video").duration);
const step = Number(process.env.STEP ?? 1);
for (let t = 0.05; t < dur; t += step) {
  await p.evaluate((t) => window.__seek(t), t);
  await p.screenshot({ path: `${out}/${mode}-t${t.toFixed(2).padStart(5, "0")}.png` });
}
console.log("duration"