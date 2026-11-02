import { validateContact } from "@/lib/validation";

/** Contact form endpoint. It validates and acknowledges the request; nothing is stored (concept site). */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, errors: { form: "Invalid request body." } }, { status: 400 });
  }
  const errors = validateContact(body);
  if (Object.keys(errors).length) return Response.json({ ok: false, errors }, { status: 422 });
  return Response.json({ ok: true, message: "Message received. We'll be in touch." });
}
