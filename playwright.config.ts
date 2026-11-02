import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3001);
const baseURL = process.env.BASE_URL ?? `http://localhost:${PORT}`;

/** Runs in installed Google Chrome (channel "chrome") at three viewports, plus a recorded walkthrough. */
export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never", outputFolder: "playwright-report" }]],
  use: {
    baseURL,
    channel: "chrome",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop", testIgnore: /walkthrough/, use: { viewport: { width: 1440, height: 900 } } },
    {
      name: "tablet",
      testIgnore: /walkthrough/,
      use: { viewport: { width: 820, height: 1180 }, hasTouch: true, deviceScaleFactor: 2 },
    },
    {
      name: "mobile",
      testIgnore: /walkthrough/,
      use: { ...devices["Pixel 7"], channel: "chrome" },
    },
    {
      name: "walkthrough",
      testMatch: /walkthrough/,
      use: { viewport: { width: 1440, height: 900 }, video: { mode: "on", size: { width: 1440, height: 900 } } },
    },
  ],
  webServer: {
    command: `npm run dev -- -p ${PORT}`,
    url: baseURL,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
