import { expect, expectNoHorizontalOverflow, expectScrolledTo, isMobileWidth, test } from "./fixtures";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("renders every section from the reference", async ({ page }) => {
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Run the\s*Future\s*Forward\./i);
  await expect(page.getByText("Human Motion / Real Power")).toBeVisible();
  for (const id of ["top", "concept", "output", "systems", "journal", "about"]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
  await expect(page.getByRole("heading", { name: /Three Outputs\.\s*One Human Current\./i })).toBeAttached();
  for (const step of ["Voltage Generation", "Energy Storage", "City Supply"]) {
    await expect(page.locator("#output").getByText(new RegExp(step.replace(" ", "\\s*"), "i"))).toBeAttached();
  }
  for (const title of [/The\s*Human Engine/i, /Current\s*in Motion/i, /Power\s*After Dark/i]) {
    await expect(page.locator("#systems").getByRole("heading", { name: title })).toBeAttached();
  }
  await expect(page.getByRole("heading", { name: /Turn Effort into Infrastructure/i })).toBeAttached();
  await expect(page.getByText("© 2026 Kinetic Grid. All rights reserved.")).toBeAttached();
  await expectNoHorizontalOverflow(page);
});

test("all images load", async ({ page }) => {
  // Walk the page so lazy images enter the viewport.
  for (const id of ["concept", "systems", "journal", "about"]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
  }
  const broken = await page.evaluate(async () => {
    const imgs = [...document.images];
    await Promise.all(imgs.map((i) => (i.complete ? null : new Promise((r) => (i.onload = i.onerror = r)))));
    return imgs.filter((i) => !i.naturalWidth).map((i) => i.currentSrc || i.src);
  });
  expect(broken).toEqual([]);
});

test("hero background is scrubbed by scroll (wheel push-in, then city)", async ({ page }) => {
  const read = () =>
    page.evaluate(() => {
      const layers = document.querySelectorAll<HTMLElement>("#top [aria-hidden] > div");
      const wheel = getComputedStyle(layers[0]);
      const city = getComputedStyle(layers[1]);
      return { wheelTransform: wheel.transform, wheelOpacity: +wheel.opacity, cityOpacity: +city.opacity };
    });
  const start = await read();
  expect(start.cityOpacity).toBeLessThan(0.05);
  expect(start.wheelOpacity).toBeGreaterThan(0.95);

  const track = await page.evaluate(() => document.getElementById("top")!.offsetHeight - innerHeight);
  await page.evaluate((y) => scrollTo(0, y), Math.round(track * 0.25));
  await expect.poll(async () => (await read()).wheelTransform).not.toBe(start.wheelTransform);

  await page.evaluate((y) => scrollTo(0, y), Math.round(track * 0.8));
  await expect.poll(async () => (await read()).cityOpacity).toBeGreaterThan(0.95);
  await expect.poll(async () => (await read()).wheelOpacity).toBeLessThan(0.05);

  // The headline stays pinned while the background animates.
  await expect(page.getByRole("heading", { level: 1 })).toBeInViewport();
});

test("primary nav links scroll to their sections", async ({ page }) => {
  for (const [label, id] of [
    ["Concept", "concept"],
    ["Systems", "systems"],
    ["Output", "output"],
    ["Journal", "journal"],
    ["About", "about"],
  ] as const) {
    if (isMobileWidth(page)) {
      await page.getByRole("button", { name: "Open menu" }).click();
      await page.locator("#mobile-menu").getByRole("link", { name: label }).click();
      await expect(page.locator("#mobile-menu")).toHaveCount(0);
    } else {
      await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: label }).click();
    }
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expectScrolledTo(page, id);
  }
});

test("wordmark returns to the top", async ({ page }) => {
  await page.locator("#journal").scrollIntoViewIfNeeded();
  await page.getByRole("link", { name: "KINETIC GRID" }).first().click();
  await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(5);
});

test("'Explore the System' scrolls to the cards", async ({ page }) => {
  await page.getByRole("link", { name: /Explore the System/ }).click();
  await expectScrolledTo(page, "systems");
});

test("header CTA scrolls to the sign-up and focuses the email field", async ({ page }) => {
  if (isMobileWidth(page) && (page.viewportSize()?.width ?? 0) < 640) {
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.locator("#mobile-menu").getByRole("link", { name: /Enter the Current/ }).click();
  } else {
    await page.getByRole("banner").getByRole("link", { name: /Enter the Current/ }).click();
  }
  await expect(page.locator("#subscribe-email")).toBeFocused();
  await expect(page.locator("#subscribe-email")).toBeInViewport();
});

test("'Watch the Loop' plays the sequence and can pause and close", async ({ page }) => {
  await page.getByRole("button", { name: "Watch the Loop" }).click();
  const dialog = page.getByRole("dialog", { name: "The Kinetic Grid loop" });
  await expect(dialog).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

  const bar = dialog.locator(".origin-left");
  const a = await bar.evaluate((el) => getComputedStyle(el).transform);
  await page.waitForTimeout(600);
  const b = await bar.evaluate((el) => getComputedStyle(el).transform);
  expect(b, "loop progress advances").not.toBe(a);

  await dialog.getByRole("button", { name: "Pause loop" }).click();
  await expect(dialog.getByRole("button", { name: "Play loop" })).toBeVisible();
  const paused1 = await bar.evaluate((el) => getComputedStyle(el).transform);
  await page.waitForTimeout(500);
  expect(await bar.evaluate((el) => getComputedStyle(el).transform), "paused").toBe(paused1);

  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Watch the Loop" })).toBeFocused();
});

test("system cards open a detail dialog with working tabs", async ({ page }) => {
  await page.locator("#systems").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Explore Systems", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: /Current in Motion details/i });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("Energy Storage", { exact: true })).toBeVisible();

  await dialog.getByRole("button", { name: /03 City/i }).click();
  await expect(page.getByRole("dialog", { name: /Power After Dark details/i })).toBeVisible();
  await expect(page.getByRole("dialog").getByText("City Supply", { exact: true })).toBeVisible();

  await page.getByRole("dialog").getByRole("button", { name: "Close", exact: true }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);

  // The circular arrow button opens the same dialog.
  await page.getByRole("button", { name: /Explore Motion: open details/ }).click();
  await expect(page.getByRole("dialog", { name: /The Human Engine details/i })).toBeVisible();
  await page.keyboard.press("Escape");
});

test("newsletter validates, then confirms a valid email", async ({ page }) => {
  await page.locator("#journal").scrollIntoViewIfNeeded();
  const input = page.locator("#subscribe-email");
  const submit = page.locator("#journal").getByRole("button", { name: /Enter the Current/ });

  await submit.click();
  await expect(page.getByText("Please enter your email address.")).toBeVisible();
  await expect(input).toHaveAttribute("aria-invalid", "true");

  await input.fill("not-an-email");
  await submit.click();
  await expect(page.getByText("That email address doesn't look right.")).toBeVisible();

  await input.fill("runner@example.com");
  await submit.click();
  await expect(page.getByText("You're on the grid. Updates are on their way.")).toBeVisible();
  await expect(input).toHaveValue("");
});

test("card hover lifts the border glow (pointer devices)", async ({ page }) => {
  test.skip(isMobileWidth(page), "hover is a pointer-only interaction");
  const card = page.locator("#systems article").first();
  await card.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200); // let the entrance finish
  const before = await card.evaluate((el) => getComputedStyle(el).borderColor);
  await card.hover();
  await expect.poll(() => card.evaluate((el) => getComputedStyle(el).borderColor)).not.toBe(before);
});
