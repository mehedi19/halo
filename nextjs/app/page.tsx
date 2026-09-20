/* HALO.BD — Home (Master Build Brief §14 story order).
   Copy mirrors elementor/templates/halo-home.json 1:1. */
import Link from "next/link";
import HeroTitle from "../components/hero-title";
import Reveal from "../components/reveal";
import ProjectCard from "../components/project-card";
import { PROJECTS } from "../lib/projects";
import { SITE, experienceYears } from "../lib/site";

const DOMAINS = ["AI", "Music", "Islamic lifestyle", "Entertainment", "Fintech", "Healthtech", "E-commerce", "SaaS", "OTT", "Telecom"];
const STEPS = ["Understand", "Explore", "Define", "Design", "Prototype", "Test", "Ship", "Improve"];
const STRENGTHS: [string, string][] = [
  ["Product strategy", "Problem framing, scope, roadmap trade-offs"],
  ["User experience", "Journeys, flows, information architecture"],
  ["Interaction design", "Behavior, states, micro-interactions"],
  ["Design systems", "Tokens, components, scalable patterns"],
  ["Visual design", "Typography, color, layout, motion"],
  ["Prototyping", "Quick tests to high-fidelity flows"],
  ["Design leadership", "Reviews, mentoring, cross-functional work"],
  ["AI-assisted workflows", "Faster exploration, sharper decisions"],
];
const TOOLS = ["Figma", "Framer", "Lovable", "Google Antigravity", "Claude Code", "HTML", "CSS", "WordPress", "Elementor", "Photoshop", "Illustrator", "After Effects", "Premiere Pro"];

const ArrowUpRight = (
  <svg className="halo-btn-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
);
const Arrow = (
  <svg className="halo-btn-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);

export default function Home() {
  const years = experienceYears();

  return (
    <>
      {/* 2 · HERO (§15) */}
      <section className="halo-section halo-hero">
        <div className="halo-wrap">
          <Reveal><p className="halo-eyebrow">{SITE.location}</p></Reveal>
          <HeroTitle>I design <em>products</em>, not just screens.</HeroTitle>
          <Reveal delay={120}>
            <p className="halo-lead">
              I&apos;m Mehedi Hasan — a Principal Product Designer. For {years} years I&apos;ve helped teams turn complex ideas into simple, useful products across AI, music, fintech, entertainment, telecom and more.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="halo-hero-cta">
              <Link className="halo-btn halo-btn--primary" href="/work/">Explore my work {Arrow}</Link>
              <Link className="halo-btn halo-btn--ghost" href="/contact/">Let&apos;s talk {ArrowUpRight}</Link>
            </div>
          </Reveal>
          <Reveal delay={280}>
            <div className="halo-hero-meta">
              <span className="halo-status">{SITE.availability}</span>
              <span>{years} years of experience</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3 · CREDIBILITY (§14) — all figures editable, brief-supplied only */}
      <section className="halo-section halo-section--tight">
        <div className="halo-wrap">
          <div className="halo-stats">
            <Reveal className="halo-stat"><span className="halo-stat-value">{years}</span><span className="halo-stat-label">years designing digital products</span></Reveal>
            <Reveal className="halo-stat" delay={90}><span className="halo-stat-value">1.5M+</span><span className="halo-stat-label">installs — Shadhin Music, as of [PLACEHOLDER: month, year] §5</span></Reveal>
            <Reveal className="halo-stat" delay={180}><span className="halo-stat-value">3</span><span className="halo-stat-label">awards — Shadhin Music, as of [PLACEHOLDER: month, year] §5</span></Reveal>
          </div>
          <Reveal delay={120}>
            <ul className="halo-domains" aria-label="Industries">
              {DOMAINS.map((d) => <li key={d}>{d}</li>)}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 4 · SELECTED WORK (§16) */}
      <section className="halo-section" id="work">
        <div className="halo-wrap">
          <div className="halo-section-head">
            <p className="halo-eyebrow">Selected work</p>
            <h2 className="halo-h2">Products I&apos;ve helped shape.</h2>
            <p className="halo-lead">A few of the products and ecosystems I&apos;ve designed with their teams. Four flagship case studies; more across fintech, healthtech, SaaS, e-commerce, OTT and telecom.</p>
          </div>
          <div className="halo-work-grid">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}><ProjectCard project={p} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · PROCESS (§18) */}
      <section className="halo-section">
        <div className="halo-wrap">
          <div className="halo-section-head">
            <p className="halo-eyebrow">Process</p>
            <h2 className="halo-h2">Flexible, not formulaic.</h2>
            <p className="halo-lead">Every product earns its own path, but the rhythm stays the same — and it loops. Shipping is the middle, not the end.</p>
          </div>
          <div className="halo-process">
            {STEPS.map((s, i) => (
              <Reveal key={s} delay={i * 45}><h3 className="halo-step halo-h3">{s}</h3></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6 · EXPERTISE (§6 — 8 signature strengths + quiet tools) */}
      <section className="halo-section" id="expertise">
        <div className="halo-wrap">
          <div className="halo-section-head">
            <p className="halo-eyebrow">Expertise</p>
            <h2 className="halo-h2">What I&apos;m trusted with.</h2>
            <p className="halo-lead">Eight signature strengths at Principal level — each is proven inside the case studies, not just listed here.</p>
          </div>
          <div className="halo-strengths">
            {STRENGTHS.map(([b, s], i) => (
              <Reveal key={b} delay={i * 40}>
                <div className="halo-strength"><b>{b}</b><small>{s}</small></div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={100}>
            <p className="halo-eyebrow" style={{ marginTop: 48 }}>Tools &amp; craft</p>
            <div className="halo-tools" style={{ marginTop: 12 }}>
              {TOOLS.map((t) => <span className="halo-chip" key={t}>{t}</span>)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 7 · AI + TECHNOLOGY (§19) */}
      <section className="halo-section">
        <div className="halo-wrap halo-section-head">
          <p className="halo-eyebrow">AI + technology</p>
          <h2 className="halo-h2">Designing beyond the canvas.</h2>
          <p className="halo-lead">I use AI and modern build tools to move from idea to working prototype faster — to test interactions, validate concepts and speak the same language as engineering. I&apos;m a product designer with strong technology fluency, not a full-time engineer.</p>
        </div>
      </section>

      {/* 8 · ABOUT (§20) */}
      <section className="halo-section" id="about">
        <div className="halo-wrap halo-section-head">
          <p className="halo-eyebrow">About</p>
          <h2 className="halo-h2">Design that balances people, business and technology.</h2>
          <p className="halo-lead">I&apos;m a Principal Product Designer in Dhaka with {years} years across AI, music, Islamic lifestyle, entertainment, fintech, healthtech, SaaS, e-commerce, OTT and telecom. Off the clock: motorcycles, movies, and an unreasonable curiosity about how things are made.</p>
          <p><Link className="halo-link-arrow" href="/about/">More about me {Arrow}</Link></p>
        </div>
      </section>

      {/* 9 · EXPERIENCE (§21 — editorial timeline, verified content only) */}
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
        </div>
      </section>

      {/* 10 · PLAYGROUND (§22 — hide until ≥3 real pieces, §40) */}
      <section className="halo-section" id="playground">
        <div className="halo-wrap">
          <div className="halo-section-head">
            <p className="halo-eyebrow">Playground</p>
            <h2 className="halo-h2">Things I build when nobody asks me to.</h2>
          </div>
          <div className="halo-play-grid">
            {["01", "02", "03"].map((n, i) => (
              <Reveal key={n} delay={i * 80}>
                <Link className="halo-play-item" href="/playground/">
                  <b className="halo-h3">[Experiment {n}]</b>
                  <small className="halo-caption">[PLACEHOLDER — real UI/motion/AI experiment §22, §40]</small>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 11 · CONTACT band (§23) */}
      <section className="halo-section halo-contact">
        <div className="halo-wrap halo-section-head">
          <Reveal><h2 className="halo-display">Have a product worth <em>designing</em>?</h2></Reveal>
          <Reveal delay={120}><p className="halo-lead">Let&apos;s turn complex ideas into simple, meaningful experiences.</p></Reveal>
          <Reveal delay={200}>
            <div className="halo-hero-cta">
              <Link className="halo-btn halo-btn--primary" href="/contact/">Start a conversation {ArrowUpRight}</Link>
            </div>
            <p className="halo-caption">Or write directly: <strong>{SITE.email}</strong> · {SITE.responseTime}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
