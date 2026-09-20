"use client";

/* HALO.BD — Contact form (client) with server action + honeypot + status. */
import { useActionState } from "react";
import { sendMessage, type FormState } from "../app/contact/actions";

const initial: FormState = { ok: false, message: "" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendMessage, initial);

  if (state.ok) {
    return (
      <div className="halo-cs-summary" role="status">
        <p className="halo-eyebrow">Message sent</p>
        <p><strong>{state.message}</strong></p>
      </div>
    );
  }

  return (
    <form action={formAction} style={{ maxWidth: "44rem" }} noValidate={false}>
      <div className="halo-form-field">
        <label htmlFor="cf-name">Name</label>
        <input id="cf-name" name="name" type="text" autoComplete="name" required placeholder="Your name" />
      </div>
      <div className="halo-form-field">
        <label htmlFor="cf-email">Email</label>
        <input id="cf-email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
      </div>
      <div className="halo-form-field">
        <label htmlFor="cf-message">What are you building?</label>
        <textarea id="cf-message" name="message" required rows={6} placeholder="A few honest lines beat a long brief." />
      </div>
      {/* Honeypot — keep the field name unattractive to autofill */}
      <div className="halo-hp" aria-hidden="true">
        <label htmlFor="cf-company">Company</label>
        <input id="cf-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <button type="submit" className="halo-btn halo-btn--primary" disabled={pending}>
        {pending ? "Sending…" : "Start a conversation"}
        <svg className="halo-btn-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
      </button>
      {!state.ok && state.message && (
        <p className="halo-form-status is-error" role="status">{state.message}</p>
      )}
    </form>
  );
}
