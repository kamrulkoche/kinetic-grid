import { expect, expectNoHorizontalOverflow, test } from "./fixtures";

const PAGES = [
  { label: "Contact", path: "/contact" },
  { label: "Privacy", path: "/privacy" },
  { label: "Terms", path: "/terms" },
  { label: "Accessibility", path: "/accessibility" },
];

for (const p of PAGES) {
  test(`footer link → ${p.label} page and back`, async ({ page }) => {
    await page.goto("/");
    await page.getByRole("navigation", { name: "Legal" }).getByRole("link", { name: p.label }).click();
    await expect(page).toHaveURL(p.path);
    await expect(page.getByRole("heading", { level: 1, name: p.label })).toBeVisible();
    await expectNoHorizontalOverflow(page);
    await page.getByRole("link", { name: /Back to the grid/ }).click();
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
}

test("nav from a sub-page lands on the right home section", async ({ page }) => {
  await page.goto("/privacy");
  await page.getByRole("navigation", { name: "Footer" }).getByRole("link", { name: "Systems" }).click();
  await expect(page).toHaveURL(/\/#systems$/);
  await expect(page.locator("#systems")).toBeInViewport();
});

test("contact form validates fields and submits", async ({ page }) => {
  await page.goto("/contact");
  const send = page.getByRole("button", { name: /Send message/ });
  await send.click();
  await expect(page.getByText("Please tell us your name.")).toBeVisible();
  await expect(page.getByText("Please enter your email address.")).toBeVisible();
  await expect(page.getByText("Your message should be at least 10 characters.")).toBeVisible();

  await page.getByLabel("Name").fill("Ada Runner");
  await page.getByLabel("Email").fill("ada@example.com");
  await page.getByLabel("Message").fill("I'd love a Kinetic Grid station in my city.");
  await send.click();
  await expect(page.getByText("Message received. We'll be in touch.")).toBeVisible();
  await expect(page.getByLabel("Name")).toHaveValue("");
});

test("unknown routes show the 404 page", async ({ page, consoleErrors }) => {
  const res = await page.goto("/does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "No current here." })).toBeVisible();
  // The browser logs the 404 resource load itself; that's expected here.
  consoleErrors.splice(0, consoleErrors.length, ...consoleErrors.filter((e) => !/404/.test(e)));
});
