import { test as base, expect, type Page } from "@playwright/test";

/** Fails any test that logs a console error or throws an uncaught page error. */
export const test = base.extend<{ consoleErrors: string[] }>({
  consoleErrors: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on("console", (m) => {
        if (m.type() === "error") errors.push(m.text());
      });
      page.on("pageerror", (e) => errors.push(String(e)));
      await use(errors);
      expect(errors, "browser console errors").toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };

export const isMobileWidth = (page: Page) => (page.viewportSize()?.width ?? 1440) < 1024;

/** Asserts the page never scrolls horizontally. */
export async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow, "horizontal overflow (px)").toBeLessThanOrEqual(0);
}

/**
 * Asserts a section was scrolled to: its top sits just under the header, or the page is scrolled
 * as far as it can go (sections near the bottom can't reach the top of a tall viewport).
 */
export async function expectScrolledTo(page: Page, id: string) {
  await expect
    .poll(
      () =>
        page.evaluate((i) => {
          const top = document.getElementById(i)!.getBoundingClientRect().top;
          const atBottom = Math.ceil(scrollY + innerHeight) >= document.documentElement.scrollHeight - 2;
          return (top >= -2 && top < 160) || (atBottom && top >= 0 && top < innerHeight);
        }, id),
      { message: `scrolled to #${id}` },
    )
    .toBe(true);
}
