import { expect, expectNoHorizontalOverflow, isMobileWidth, test } from "./fixtures";

test("layout adapts to the viewport and captures a full-page screenshot", async ({ page }, info) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expectNoHorizontalOverflow(page);

  const nav = page.getByRole("navigation", { name: "Primary" });
  const burger = page.getByRole("button", { name: "Open menu" });
  if (isMobileWidth(page)) {
    await expect(nav).toBeHidden();
    await expect(burger).toBeVisible();
  } else {
    await expect(nav).toBeVisible();
    await expect(burger).toBeHidden();
  }

  // Cards: three in a row from lg (1024) up; wide stacked cards below.
  const tops = await page.locator("#systems article").evaluateAll((els) =>
    els.map((e) => Math.round(e.getBoundingClientRect().top)),
  );
  const width = page.viewportSize()!.width;
  if (width >= 1024) expect(new Set(tops).size).toBe(1);
  else expect(new Set(tops).size).toBe(3);

  // Hero headline must fit horizontally.
  const h1 = await page.getByRole("heading", { level: 1 }).boundingBox();
  expect(h1!.x + h1!.width).toBeLessThanOrEqual(width);

  // Reveal all scroll-triggered content, then capture.
  for (const id of ["concept", "systems", "journal", "about"]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
  }
  await page.waitForTimeout(900);
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `qa/screenshots/${info.project.name}-full.png`, fullPage: true });
});

test("mobile menu opens, locks scroll and closes with Escape", async ({ page }) => {
  test.skip(!isMobileWidth(page), "mobile/tablet only");
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const menu = page.locator("#mobile-menu");
  await expect(menu).toBeVisible();
  await expect(page.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await page.screenshot({ path: `qa/screenshots/${test.info().project.name}-menu.png` });
  await page.keyboard.press("Escape");
  await expect(menu).toHaveCount(0);
});

test("reduced motion: content is visible and the hero still transitions", async ({ browser }, info) => {
  test.skip(info.project.name !== "desktop", "once is enough");
  const ctx = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  const wheel = page.locator("#top [aria-hidden] > div").first();
  const track = await page.evaluate(() => document.getElementById("top")!.offsetHeight - innerHeight);
  await page.evaluate((y) => scrollTo(0, y), Math.round(track * 0.3));
  await page.waitForTimeout(300);
  // No push-in zoom when motion is reduced
  expect(await wheel.evaluate((el) => getComputedStyle(el).transform)).toMatch(/none|matrix\(1, 0, 0, 1, 0, 0\)/);
  await page.locator("#systems").scrollIntoViewIfNeeded();
  await expect(page.locator("#systems article").first()).toBeVisible();
  await ctx.close();
});
