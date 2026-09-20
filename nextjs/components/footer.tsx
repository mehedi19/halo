/* HALO.BD — Site footer. Mirrors elementor/templates/halo-footer.json (§24). */
import Link from "next/link";
import { NAV, SITE } from "../lib/site";

export default function Footer() {
  return (
    <footer className="halo-footer">
      <div className="halo-wrap">
        <div className="halo-footer-grid">
          <div>
            <Link className="halo-brand" href="/">
              <span className="halo-dot" aria-hidden="true" />
              <span>Mehedi&nbsp;Hasan</span>
            </Link>
            <p className="halo-caption">
              {SITE.title}
              <br />
              {SITE.location}
            </p>
            <p className="halo-caption">Designed with curiosity. Built with intention.</p>
          </div>

          <nav aria-label="Footer">
            <ul>
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="halo-caption">Elsewhere — [PLACEHOLDER: real social URLs only §23]</p>
            <ul>
              {SITE.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} rel="me">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="halo-footer-base">
          <span>© {new Date().getFullYear()} Mehedi Hasan</span>
          <span>{SITE.location}</span>
        </div>
      </div>
    </footer>
  );
}
