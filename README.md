# HALO.BD — Mehedi Hasan · Personal Portfolio

Two builds of the same design system:

1. **`nextjs/`** — full **Next.js 15 + TypeScript** conversion (requested 2026-09-20): all routes static-prerendered, 103 kB shared JS, verified `next build`. See `nextjs/README.md`.
2. WordPress + Elementor kit (original target) — details below.

Build package for **Mehedi Hasan — Principal Product Designer, Dhaka** (12+ years),
produced to the Master Build Brief (Sections 1–42). The production site is
**WordPress + Elementor (Flexbox Containers)** — this repo is the complete,
importable build kit plus documentation.

| Deliverable (Brief §41) | Where |
|---|---|
| Phase 1 — Audit & IA | `docs/01-audit-and-ia.md` |
| Phase 2 — Design system | `design-system/halo-tokens.css` · `elementor/GLOBAL-SETTINGS.md` |
| Phase 3 — Homepage | `elementor/templates/halo-home.json` + `assets/css|js` (commented files) |
| Phase 4 — Case-study system | `snippets/case-study-cpt.php` · `halo-case-study-single.json` · `halo-loop-item-project-card.json` · how-to in `docs/05` |
| Phase 5 — QA & handoff | `docs/05-qa-and-handoff.md` |
| 301 redirects for old halo.bd URLs | `elementor/REDIRECTS.md` |
| Live design-reference preview | `preview/index.html` (run `node preview/serve.mjs`; **not** the production site) |

## Quick start (staging first — Brief §2)

1. Backup current halo.bd, work on a staging copy, keep a rollback plan.
2. `elementor/GLOBAL-SETTINGS.md` → enable experiments, set global colors/fonts.
3. Add `snippets/case-study-cpt.php` → re-save Permalinks.
4. Load code in order: inline theme-BOOT → `halo-tokens.css` → `halo-fonts.css`
   → `halo-custom.css` → deferred `halo-theme.js` + `halo.js`.
5. Import templates from `elementor/templates/` (Saved Templates → Import),
   wire Theme Builder (header/footer/single/archive), create pages, set menu.
6. Replace every visible `[PLACEHOLDER]` (inventory in `docs/05` §4) — nothing
   invented anywhere in this package.

Regenerate the template JSONs after editing: `node elementor/generate-templates.mjs`.

## Design decisions at a glance

- **Type:** Inter (UI/body) + Fraunces (display/editorial), self-hosted variable fonts.
- **Color:** 8-step neutral palette → semantic tokens; measured-contrast muted-text
  rule per theme; proposed cobalt accent `#2545DB` / `#7D96FF` *[awaiting owner sign-off]*.
- **Theme:** System → Light → Dark, no-flash inline boot, `localStorage` + `color-scheme`.
- **Motion:** transform/opacity only, IntersectionObserver reveals, hero word-reveal
  signature moment, full `prefers-reduced-motion` support.
- **Claims:** only brief-supplied facts (Shadhin 1.5M+ installs / 3 awards, dated as
  `[PLACEHOLDER — month, year]`); everything else labeled and editable.
