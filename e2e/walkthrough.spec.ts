import { test } from "@playwright/test";

/**
 * Recorded end-to-end tour (video saved by the "walkthrough" project).
 * Run: npx playwright test --project=walkthrough
 */
test("site walkthrough", async ({ page }) => {
  test.setTimeout(120_000);
  const pause = (ms: number) => page.waitForTimeout(ms);
  const smooth = async (to: number, steps = 60) => {
    const from = await page.evaluate(() => scrollY);
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const e = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      await page.evaluate((y) => scrollTo(0, y), Math.round(from + (to - from) * e));
      await pause(33);
    }
  };

  await page.goto("/");
  await pause(2200); // entrance animations

  // Signature scroll-scrubbed hero
  const track = await page.evaluate(() => document.getElementById("top")!.offsetHeight - innerHeight);
  await smooth(track, 180);
  await pause(700);

  // Outputs → cards → CTA → footer
  const y = (id: string) => page.evaluate((i) => document.getElementById(i)!.offsetTop - 72, id);
  await smooth(await y("concept"), 50);
  await pause(1600);
  await smooth(await y("systems"), 40);
  await pause(1400);

  await page.locator("#systems article").nth(1).hover();
  await pause(900);
  await page.getByRole("button", { name: "Explore Systems", exact: true }).click();
  await pause(1500);
  await page.getByRole("dialog").getByRole("button", { name: /03 City/i }).click();
  await pause(1300);
  await page.keyboard.press("Escape");
  await pause(600);

  await smooth(await page.evaluate(() => document.documentElement.scrollHeight - innerHeight), 50);
  await pause(1000);
  await page.locator("#subscribe-email").click();
  await page.keyboard.type("runner@example.com", { delay: 45 });
  await page.locator("#journal").getByRole("button", { name: /Enter the Current/ }).click();
  await pause(1600);

  // Back to the top, loop dialog
  await page.getByRole("link", { name: "KINETIC GRID" }).first().click();
  await pause(1500);
  await page.getByRole("button", { name: "Watch the Loop" }).click();
  await pause(6500);
  await page.keyboard.press("Escape");
  await pause(600);

  // Nav + a footer page transition
  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Systems" }).click();
  await pause(1500);
  await page.getByRole("navigation", { name: "Legal" }).getByRole("link", { name: "Contact" }).click();
  await pause(1800);
  await page.getByRole("link", { name: /Back to the grid/ }).click();
  await pause(1500);
});
