"use client";

import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { validateContact, type ContactInput } from "@/lib/validation";

type Errors = Partial<Record<keyof ContactInput | "form", string>>;

const field =
  "w-full rounded-md border bg-ink-900/80 px-4 py-3 text-sm font-medium text-white placeholder:text-fog-400 outline-none transition focus:border-amber-400 focus:shadow-[0_0_0_3px_rgba(255,178,30,0.2)]";

export function ContactForm() {
  const [values, setValues] = useState<ContactInput>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "pending" | "done">("idle");
  const [message, setMessage] = useState("");

  const set = (k: keyof ContactInput) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const local = validateContact(values);
    if (Object.keys(local).length) return setErrors(local);
    setStatus("pending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrors(data.errors ?? { form: "Something went wrong." });
        return setStatus("idle");
      }
      setMessage(data.message);
      setStatus("done");
      setValues({ name: "", email: "", message: "" });
    } catch {
      setErrors({ form: "Network error. Please try again." });
      setStatus("idle");
    }
  }

  const border = (k: keyof ContactInput) => (errors[k] ? "border-red-400/80" : "border-white/25");

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" aria-label="Contact form">
      {(["name", "email"] as const).map((k) => (
        <div key={k}>
          <label htmlFor={`contact-${k}`} className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
            {k === "name" ? "Name" : "Email"}
          </label>
          <input
            id={`contact-${k}`}
            type={k === "email" ? "email" : "text"}
            autoComplete={k}
            value={values[k]}
            onChange={set(k)}
            aria-invalid={!!errors[k]}
            aria-describedby={errors[k] ? `contact-${k}-err` : undefined}
            className={`${field} ${border(k)}`}
          />
          {errors[k] && (
            <p id={`contact-${k}-err`} className="mt-1.5 text-xs font-semibold text-red-300">
              {errors[k]}
            </p>
          )}
        </div>
      ))}
      <div className="sm:col-span-2">
        <label htmlFor="contact-message" className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={values.message}
          onChange={set("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-err" : undefined}
          className={`${field} ${border("message")} resize-y`}
        />
        {errors.message && (
          <p id="contact-message-err" className="mt-1.5 text-xs font-semibold text-red-300">
            {errors.message}
          </p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2" aria-live="polite">
        <button
          type="submit"
          disabled={status === "pending"}
          className="btn-amber group inline-flex h-12 items-center gap-2 rounded-md px-7 text-[13px] font-bold transition-shadow disabled:opacity-80"
        >
          {status === "pending" ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send message <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
        {status === "done" && (
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-amber-300">
            <Check className="size-4" /> {message}
          </p>
        )}
        {errors.form && <p className="text-sm font-semibold text-red-300">{errors.form}</p>}
      </div>
    </form>
  );
}
