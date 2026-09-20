/* HALO.BD — /privacy/ (§38). Update when analytics are chosen (§39). */
import type { Metadata } from "next";
import { SITE } from "../../lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for halo.bd — what is collected, why, and your choices.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <section className="halo-section halo-cs-prose">
      <div className="halo-wrap">
        <div className="halo-section-head">
          <p className="halo-eyebrow">Legal</p>
          <h1 className="halo-h2">Privacy policy</h1>
          <p className="halo-caption">Last updated: [PLACEHOLDER — date]</p>
        </div>

        <h2 className="halo-h3">What this site collects</h2>
        <p><strong>Contact form.</strong> If you write to me through the form, I receive your name, email and message — used only to reply. Your theme preference (light/dark) is stored in your own browser&apos;s localStorage and never leaves your device.</p>

        <h2 className="halo-h3">Analytics & cookies</h2>
        <p>[PLACEHOLDER — describe the chosen analytics (Plausible / Cloudflare Web Analytics / GA4) once configured per §39, including any consent mechanism. Until then this site sets no tracking cookies.]</p>

        <h2 className="halo-h3">Data sharing</h2>
        <p>I don&apos;t sell or share personal data with third parties beyond the providers required to run this site (hosting, email delivery).</p>

        <h2 className="halo-h3">Contact</h2>
        <p>Questions about privacy? Email <strong>{SITE.email}</strong>. {SITE.location}.</p>
      </div>
    </section>
  );
}
