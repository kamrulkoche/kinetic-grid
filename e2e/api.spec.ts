import { expect, test } from "@playwright/test";

test.describe("API", () => {
  test.skip(({ viewport }) => (viewport?.width ?? 1440) < 1024, "viewport-independent; run once");

  test("POST /api/subscribe", async ({ request }) => {
    const bad = await request.post("/api/subscribe", { data: { email: "nope" } });
    expect(bad.status()).toBe(422);
    expect((await bad.json()).ok).toBe(false);

    const malformed = await request.post("/api/subscribe", {
      data: Buffer.from("{not json"),
      headers: { "Content-Type": "application/json" },
    });
    expect(malformed.status()).toBe(400);

    const good = await request.post("/api/subscribe", { data: { email: "a@b.co" } });
    expect(good.status()).toBe(200);
    expect(await good.json()).toMatchObject({ ok: true });
  });

  test("POST /api/contact", async ({ request }) => {
    const bad = await request.post("/api/contact", { data: { name: "A", email: "x", message: "hi" } });
    expect(bad.status()).toBe(422);
    expect(Object.keys((await bad.json()).errors).sort()).toEqual(["email", "message", "name"]);

    const good = await request.post("/api/contact", {
      data: { name: "Ada", email: "ada@example.com", message: "Hello from the test suite." },
    });
    expect(good.status()).toBe(200);
  });
});
