import { validateEmail } from "@/lib/validation";

/**
 * Newsletter sign-up. This is a concept site with no mailing provider, so a valid request is
 * acknowledged and nothing is stored. Wire a provider in here when one exists.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }
  const email = (body as { email?: unknown })?.email;
  const error = validateEmail(email);
  if (error) return Response.json({ ok: false, error }, { status: 422 });
  return Response.json({ ok: true, message: "You're on the grid. Updates are on their way." });
}
