/* HALO.BD — /contact/ (§23). Availability + response-time are [PLACEHOLDER] until CONFIRM. */
import type { Metadata } from "next";
import HeroTitle from "../../components/hero-title";
import Reveal from "../../components/reveal";
import ContactForm from "../../components/contact-form";
import { SITE } from "../../lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Have a product worth designing? Let's turn complex ideas into simple, meaningful experiences. Contact Mehedi Hasan, Principal Product Designer in Dhaka.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <section className="halo-section halo-hero halo-contact">
      <div className="halo-wrap halo-section-head">
        <Reveal><p className="halo-eyebrow">Contact</p></Reveal>
        <HeroTitle>Have a product worth <em>designing</em>?</HeroTitle>
        <Reveal delay={120}>
          <p className="halo-lead">Let&apos;s turn complex ideas into simple, meaningful experiences. {SITE.availability.replace(/\[PLACEHOLDER: |\]$/g, "")}</p>
        </Reveal>
        <Reveal delay={180}>
          <div className="halo-hero-meta">
            <span>Direct: <strong>{SITE.email}</strong></span>
            <span>{SITE.location} · GMT+6</span>
            <span>{SITE.responseTime}</span>
          </div>
        </Reveal>
        <Reveal delay={240}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
