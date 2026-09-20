"use server";

/* HALO.BD — Contact form server action (§23).
   Ships with honeypot spam check. Delivery is intentionally NOT wired to a
   fake service: connect your provider (Resend/Postmark/SMTP) at the marked
   TODO, or point the form at Formspree. Add Cloudflare Turnstile before launch. */

export type FormState = { ok: boolean; message: string };

export async function sendMessage(prev: FormState, formData: FormData): Promise<FormState> {
  /* Honeypot — bots see a fake success, humans never see the field. */
  if ((formData.get("company") as string)?.trim()) {
    return { ok: true, message: "Thanks — your note landed." };
  }

  const name = ((formData.get("name") as string) || "").trim();
  const email = ((formData.get("email") as string) || "").trim();
  const message = ((formData.get("message") as string) || "").trim();

  if (name.length < 2) return { ok: false, message: "Please tell me your name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, message: "That email doesn’t look right." };
  if (message.length < 10) return { ok: false, message: "A few more words about the project would help." };

  /* TODO [PLACEHOLDER §23]: deliver the message — e.g. Resend:
       await resend.emails.send({ to: OWNER_INBOX, subject: "New inquiry — halo.bd", ... });
     OWNER_INBOX comes from process.env, never hard-coded. */
  console.info("[halo contact]", { name, email, length: message.length });

  return { ok: true, message: "Thanks — your note landed. I’ll reply within two working days." };
}
