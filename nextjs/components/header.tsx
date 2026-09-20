"use client";

/* HALO.BD — Site header: brand, nav (aria-current), mobile disclosure,
   theme toggle, resume link. Mirrors elementor/templates/halo-header.json. */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "../lib/site";
import ThemeToggle from "./theme-toggle";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let tick = false;
    const onScroll = () => {
      if (tick) return;
      tick = true;
      requestAnimationFrame(() => { setScrolled(window.scrollY > 8); tick = false; });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close the mobile panel after navigating */
  useEffect(() => { setOpen(false); }, [pathname]);

  const isCurrent = (href: string) =>
    (href === "/work/" && pathname.startsWith("/work")) ||
    (href !== "/#expertise" && !href.includes("#") && pathname === href.replace(/\/$/, href === "/" ? "/" : ""));

  return (
    <header className={`halo-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="halo-wrap halo-header-inner">
        <Link className="halo-brand" href="/">
          <span className="halo-dot" aria-hidden="true" />
          <span>Mehedi&nbsp;Hasan</span>
        </Link>

        <nav className={`halo-nav${open ? " is-open" : ""}`} aria-label="Primary">
          <ul>
            {NAV.map((item) => (
              <li key={item.label}>
                <Link href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="halo-header-actions">
          <ThemeToggle />
          {/* [PLACEHOLDER — resume PDF/page, §42. Remove until a real file exists.] */}
          <Link className="halo-link-arrow halo-resume" href="/" title="[PLACEHOLDER — resume PDF URL]">
            Resume
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </Link>
          <button
            type="button"
            className="halo-nav-toggle"
            aria-expanded={open}
            aria-controls="primary-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
