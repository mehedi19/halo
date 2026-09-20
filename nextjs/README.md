# HALO.BD — Next.js build

Full Next.js conversion of the HALO.BD portfolio (originally the WordPress +
Elementor kit in this repo — convert requested by owner). Next 15 App Router +
TypeScript, fully static-prerendered, **103 kB shared first-load JS**.

## Routes

| Route | Source | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Full §14 story: hero (word-reveal) → credibility → work → process → expertise → AI → about → experience → playground → contact |
| `/work/` | `app/work/page.tsx` | Case-study index from `lib/projects.ts` |
| `/work/[slug]/` | `app/work/[slug]/page.tsx` | oneai, shadhin-music, deen-islamic, win — SSG via `generateStaticParams`; flagship = 15-section skeleton, standard = short (§17 depth tiers) |
| `/about/` `/playground/` `/contact/` `/privacy/` | `app/*/page.tsx` | contact = client form + server action + honeypot |
| 404 | `app/not-found.tsx` | brief-styled |
| `/sitemap.xml` `/robots.txt` | `app/sitemap.ts`, `app/robots.ts` | auto-generated (§28) |
| `Person` + `Article` JSON-LD | layout + case-study pages | §28 |

Shared design system with the WP kit: `app/styles/halo-tokens.css` and
`halo-custom.css` are **verbatim copies** of the Elementor package files.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

## Fonts (production upgrade, §8)

This repo build loads Inter + Fraunces from the Google Fonts CDN `<link>` in
`app/layout.tsx` because **fonts.googleapis.com is blocked inside this dev
sandbox**, so `next/font/google` can't download at build time. On your machine,
self-hosting takes 2 minutes:

1. Download the 3 woff2 files listed in `../assets/fonts/README.md` into `nextjs/public/fonts/`.
2. In `app/layout.tsx`, remove the two `<link>`/preconnect tags and add:

```ts
import localFont from "next/font/local";
const inter = localFont({ src: "../public/fonts/inter-latin-var.woff2", variable: "--font-inter", display: "swap" });
const fraunces = localFont({
  src: [
    { path: "../public/fonts/fraunces-latin-var.woff2", style: "normal" },
    { path: "../public/fonts/fraunces-latin-italic-var.woff2", style: "italic" },
  ],
  variable: "--font-fraunces", display: "swap",
});
```

3. `<html className={\`${inter.variable} ${fraunces.variable}\`}>` and map the vars
   in `globals.css` (revert the two `--halo-font-*` overrides to `var(--font-…)`).

## Editing content

- **Site info / availability / email / socials / career start year:** `lib/site.ts`
  (`experienceYears()` auto-computes the "12+" every year, §37)
- **Projects:** `lib/projects.ts` — add an object, path appears in sitemap +
  `/work/` + new static case-study page. Fill roles/periods per brief §5.
- **Placeholders:** every unverified claim is visibly labeled `[PLACEHOLDER …]`
  — inventory in `../docs/05-qa-and-handoff.md` §4. Fill-or-hide before launch (§30/§40).

## Contact form delivery

`app/contact/actions.ts` validates + honeypot-checks only. Wire a provider at the
marked TODO (Resend/Postmark/SMTP; inbox from `process.env.OWNER_INBOX`). Add
Cloudflare Turnstile before launch (§23). To use an external service instead
(Formspree), point `components/contact-form.tsx` at its endpoint.

## Deploy

- **Vercel/Node host:** push this folder → zero config (`npm run build`).
- **Static export / cPanel:** contact action is the only server feature; replace
  it with an external form endpoint, then add `output: "export"` to
  `next.config.mjs` → `next build` → upload `out/`.
