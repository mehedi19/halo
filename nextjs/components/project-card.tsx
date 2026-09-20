/* HALO.BD — Editorial project card (§16). Mirrors the Importable Loop Item. */
import Link from "next/link";
import type { Project } from "../lib/projects";

const Arrow = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link className="halo-project-card" href={`/work/${project.slug}/`}>
      {/* [PLACEHOLDER §30/§38] — replace with a real, permission-cleared
          screenshot (next/image, WebP/AVIF). The dashed box marks it visually. */}
      <div className="halo-card-media halo-card-media--placeholder">
        [PLACEHOLDER — {project.name} product screenshots, owner to supply w/ permission §38]
      </div>
      <div className="halo-card-meta">
        <span>{project.industry}</span>
        <span>
          {project.role} · {project.period}
        </span>
      </div>
      <h3 className="halo-card-title halo-h3">{project.name}</h3>
      <p className="halo-text-muted">{project.excerpt}</p>
      {project.stats?.map((s) => (
        <p className="halo-caption" key={s.value}>
          <strong>{s.value}</strong> {s.label}
        </p>
      ))}
      <span className="halo-link-arrow">View case study {Arrow}</span>
    </Link>
  );
}
