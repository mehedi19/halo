/* HALO.BD — 404 (mirrors elementor/templates/halo-404.json, §34 basics) */
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="halo-section halo-hero">
      <div className="halo-wrap halo-section-head">
        <p className="halo-eyebrow">404</p>
        <h1 className="halo-display">This page took a wrong turn.</h1>
        <p className="halo-lead">The work is all at <Link href="/work/">/work</Link> — or start again from the top.</p>
        <div className="halo-hero-cta">
          <Link className="halo-btn halo-btn--primary" href="/">
            Back home
            <svg className="halo-btn-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </Link>
          <Link className="halo-btn halo-btn--ghost" href="/work/">
            See the work
            <svg className="halo-btn-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
