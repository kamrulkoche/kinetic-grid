const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEmail(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) return "Please enter your email address.";
  if (value.length > 254 || !EMAIL.test(value.trim())) return "That email address doesn't look right.";
  return null;
}

export type ContactInput = { name: string; email: string; message: string };

export function validateContact(input: Partial<Record<keyof ContactInput, unknown>>) {
  const errors: Partial<Record<keyof ContactInput, string>> = {};
  if (typeof input.name !== "string" || input.name.trim().length < 2) errors.name = "Please tell us your name.";
  const emailError = validateEmail(input.email);
  if (emailError) errors.email = emailError;
  if (typeof input.message !== "string" || input.message.trim().length < 10)
    errors.message = "Your message should be at least 10 characters.";
  else if (input.message.length > 2000) errors.message = "Please keep it under 2000 characters.";
  return errors;
}
