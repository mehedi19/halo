/* HALO.BD — Case study single (Brief §17).
   Flagship → full 15-section skeleton; standard → short version (depth tiers).
   Openers: 60-second summary + ownership line. Nothing invented (§30). */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "../../../components/reveal";
import {
  PROJECTS, FLAGSHIP_SECTIONS, STANDARD_SECTIONS, getProject,
} from "../../../lib/projects";
import { SITE } from "../../../lib/site";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const p = getProject(slug);
    if (!p) return {};
    return {
      title: `${p.name} — Case Study`,
      description: p.excerpt,
      alternates: { canonical: `/work/${p.slug}/` },
      openGraph: { title: `${p.name} — Case Study · Mehedi Hasan`, description: p.excerpt },
    };
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const sections = project.tier === "flagship" ? FLAGSHIP_SECTIONS : STANDARD_SECTIONS;
  const next = PROJECTS[(PROJECTS.findIndex((p) => p.slug === slug) + 1) % PROJECTS.length];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${project.name} — Case Study`,
    description: project.excerpt,
    author: { "@type": "Person", name: SITE.name, url: SITE.url },
    mainEntityOfPage: `${SITE.url}/work/${project.slug}/`,
  };

  return (
    <article className="halo-case-study">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      {/* Project hero (§17) */}
      <section className="halo-section">
        <div className="halo-wrap">
          <Reveal><p className="halo-eyebrow">{project.industry} · {project.platform}</p></Reveal>
          <Reveal delay={60}><h1 className="halo-display">{project.name}</h1></Reveal>
          <Reveal delay={120}><p className="halo-lead">{project.excerpt}</p></Reveal>

          <Reveal delay={180}>
            <div className="halo-cs-meta">
              <div><p className="halo-eyebrow">My role</p><p>{project.role}</p></div>
              <div><p className="halo-eyebrow">Timeline</p><p>{project.period}</p></div>
              <div><p className="halo-eyebrow">Platform</p><p>{project.platform}</p></div>
              <div><p className="halo-eyebrow">Team</p><p>[TEAM — CONFIRM]</p></div>
            </div>
          </Reveal>

          {/* 60-second summary + ownership line (§17) */}
          <Reveal delay={220}>
            <div className="halo-cs-summary">
              <p className="halo-eyebrow">60-second summary</p>
              <p><strong>Problem:</strong> [one line — CONFIRM]</p>
              <p><strong>My role:</strong> [one line — CONFIRM §5]</p>
              <p><strong>Team:</strong> [one line — CONFIRM]</p>
              <p><strong>Result:</strong> [verified outcome only — §30]</p>
              <hr />
              <p className="halo-caption"><strong>What I did:</strong> […] · <strong>What the team did:</strong> […]</p>
            </div>
          </Reveal>

          <Reveal delay={260}>
            <figure className="halo-figure halo-media">
              <div className="halo-card-media halo-card-media--placeholder" style={{ aspectRatio: "16/9" }}>
                [PLACEHOLDER — {project.name} hero screenshot/video loop w/ permission §38]
              </div>
              <figcaption className="halo-caption">[Caption — describe what the artifact shows]</figcaption>
            </figure>
          </Reveal>

          {project.stats && (
            <div className="halo-stats" style={{ marginTop: 48 }}>
              {project.stats.map((s) => (
                <div className="halo-stat" key={s.value}>
                  <span className="halo-stat-value">{s.value}</span>
                  <span className="halo-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Body sections — depth tier per project (§17) */}
      {sections.map((title) => (
        <section className="halo-section halo-cs-prose" key={title}>
          <div className="halo-wrap">
            <Reveal>
              <h2 className="halo-h3">{title}</h2>
              <p>[SECTION — {title}: add real content before publish (§17, §30). Never invent research findings, outcomes, dates or metrics.]</p>
            </Reveal>
          </div>
        </section>
      ))}

      {/* Footer nav */}
      <section className="halo-section halo-contact">
        <div className="halo-wrap">
          <div className="halo-hero-cta">
            <Link className="halo-btn halo-btn--ghost" href="/work/">
              All work
              <svg className="halo-btn-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
            </Link>
            <Link className="halo-btn halo-btn--primary" href={`/work/${next.slug}/`}>
              Next: {next.name}
              <svg className="halo-btn-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
