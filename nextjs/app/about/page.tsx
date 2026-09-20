/* HALO.BD — /about/ (§20, §21). Portrait placeholder until a real photo is supplied. */
import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../../components/reveal";
import { experienceYears } from "../../lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Mehedi Hasan is a Principal Product Designer in Dhaka balancing user needs, business goals and technology across AI, music, Islamic lifestyle, fintech, healthtech, SaaS, e-commerce, OTT and telecom.",
  alternates: { canonical: "/about/" },
};

const Arrow = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);

export default function AboutPage() {
  const years = experienceYears();
  return (
    <>
      <section className="halo-section">
        <div className="halo-wrap halo-section-head">
          <Reveal><p className="halo-eyebrow">About</p></Reveal>
          <Reveal delay={60}><h1 className="halo-display">Design that balances people, business and technology.</h1></Reveal>
          <Reveal delay={120}>
            <p className="halo-lead">I&apos;m Mehedi Hasan — a Principal Product Designer based in Dhaka with {years} years designing digital products that balance user needs, business goals and technology. My work spans AI, music, Islamic lifestyle, entertainment, fintech, healthtech, SaaS, e-commerce, OTT and telecom-related experiences.</p>
          </Reveal>
          <Reveal delay={160}>
            <p className="halo-text-muted" style={{ maxWidth: "44rem" }}>
              Beyond the job: curiosity about how things are made — technology, AI, coding and prototyping, visual design. And when the screens are off: motorcycle rides and movies.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="halo-card-media halo-card-media--placeholder" style={{ aspectRatio: "21/9" }}>
              [PLACEHOLDER — real, well-lit portrait §20. No stock imagery §38]
            </div>
          </Reveal>
        </div>
      </section>

      <section className="halo-section">
        <div className="halo-wrap">
          <div className="halo-section-head">
            <p className="halo-eyebrow">Experience</p>
            <h2 className="halo-h2">Where I&apos;ve practiced.</h2>
          </div>
          <Reveal>
            <div className="halo-timeline">
              <div className="halo-timeline-item"><span className="halo-timeline-period">[PERIOD — CONFIRM]</span><div><span className="halo-timeline-role">Principal Product Designer</span><br /><span className="halo-timeline-org">[COMPANY / PRODUCT — CONFIRM §21]</span></div></div>
              <div className="halo-timeline-item"><span className="halo-timeline-period">[PERIOD — CONFIRM]</span><div><span className="halo-timeline-role">[PREVIOUS ROLE — CONFIRM]</span><br /><span className="halo-timeline-org">[COMPANY — CONFIRM]</span></div></div>
              <div className="halo-timeline-item"><span className="halo-timeline-period">Telecom</span><div><span className="halo-timeline-role">Worked closely with product and digital teams at Grameenphone, Robi and Banglalink.</span><br /><span className="halo-timeline-org">[CONFIRM exact nature of collaboration §4 — text names only; no operator logos without written permission]</span></div></div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p style={{ marginTop: 32 }}>
              <Link className="halo-link-arrow" href="/contact/">Have a product worth designing? Start a conversation {Arrow}</Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
