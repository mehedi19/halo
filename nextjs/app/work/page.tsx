/* HALO.BD — /work/ index (§36). Data-driven — new projects appear on their own. */
import type { Metadata } from "next";
import Reveal from "../../components/reveal";
import ProjectCard from "../../components/project-card";
import { PROJECTS } from "../../lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from Mehedi Hasan — OneAI, Shadhin Music, Deen Islamic, WIN and more across AI, music, fintech, healthtech, SaaS, e-commerce, OTT and telecom.",
  alternates: { canonical: "/work/" },
};

export default function WorkPage() {
  return (
    <section className="halo-section">
      <div className="halo-wrap">
        <div className="halo-section-head">
          <p className="halo-eyebrow">Work</p>
          <h1 className="halo-display">Selected work.</h1>
          <p className="halo-lead">Case studies with context, decisions and verified outcomes. No invented metrics — anything unspecified is labeled.</p>
        </div>
        <div className="halo-work-grid">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}><ProjectCard project={p} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
