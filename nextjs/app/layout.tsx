/* HALO.BD — Root layout
   - No-flash theme BOOT inline before first paint (§10)
   - Inter + Fraunces via Google Fonts <link> in this repo build.
     PRODUCTION UPGRADE (preferred, §8): self-host with next/font/local —
     fonts.googleapis.com is blocked in this dev sandbox, so next/font/google
     cannot fetch at build time. When the woff2 files from assets/fonts/README.md
     exist under public/fonts/, swap the <link> in <head> for four next/font/local
     faces (see nextjs/README.md §Fonts). */
import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { SITE } from "../lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.seoTitle, template: "%s — Mehedi Hasan" },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: "Mehedi Hasan",
    title: SITE.seoTitle,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image", title: SITE.seoTitle, description: SITE.description },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

/* Same BOOT block as assets/js/halo-theme.js — keep in sync. Must run before paint. */
const THEME_BOOT = `(function(){try{var s=localStorage.getItem("halo-theme");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;var t=s||(d?"dark":"light");var r=document.documentElement;r.setAttribute("data-theme",t);r.style.colorScheme=t;}catch(e){}})();`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  jobTitle: SITE.title,
  url: SITE.url,
  address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
  /* sameAs: add REAL profile URLs only (Brief §28) — never invent links. */
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#F6F6F3" />
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="halo-body">
        <a className="halo-skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
