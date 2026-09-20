# Phase 5 — QA, Handoff & Operations

> HALO.BD portfolio · per Master Build Brief §31, §34, §39, §41

## 1. Build order on staging (§2: staging first, backup, rollback plan)

1. **Backup** the current halo.bd (files + DB, store off-site); note the restore steps *before* changing anything. Rollback plan = restore that backup + re-point DNS.
2. WordPress current + Elementor (+ Pro) installed.
3. Apply `elementor/GLOBAL-SETTINGS.md` (experiments → colors → fonts → layout).
4. Add `snippets/case-study-cpt.php` (WPCode or child theme) → **re-save Settings → Permalinks**.
5. Load code in the order from GLOBAL-SETTINGS §6 (theme boot inline → 3 CSS files → 2 deferred JS).
6. Import templates (Elementor → Templates → Saved Templates → Import):
   `halo-header.json`, `halo-footer.json`, `halo-home.json`, `halo-contact.json`,
   `halo-404.json`, `halo-case-study-single.json`, `halo-loop-item-project-card.json`.
7. Create pages: Home (template **Elementor Canvas**, insert imported Home), Work (Canvas),
   About, Playground, Contact, Privacy, 404 assignment. Set Home as front page.
8. Theme Builder: Header + Footer (sitewide), Single → condition `case_study`,
   Archive → `case_study` archive with Loop Grid using the Loop Item.
9. Create WP menu **Primary** (Work · About · Expertise = `/#expertise` · Playground · Contact) and pick it in the header's nav widget.
10. Replace every `[PLACEHOLDER …]` (inventory in §4 below) with verified content — or hide the section (§40: an empty section hurts more than a missing one).
11. Add `elementor/REDIRECTS.md` map. Configure SMTP + Turnstile on the form; test end-to-end.
12. Run checklists below → go live during low-traffic hours → spot-check → keep backup 30 days.

### Licence fallbacks (§2 — if only free Elementor is available)
- **Nav menu widget** → HTML widget `<nav>` list (same `halo-nav` classes) — CSS already handles it.
- **Form widget** → Fluent Forms / WPForms shortcode inside a Shortcode widget; keep `halo-form` classes via the plugin's CSS-class field; honeypot is built into both.
- **Theme Builder header/footer** → a classic child theme with `header.php`/`footer.php` containing the same markup (markup ships in the imported JSON).
- **Loop Grid** → static cards (already the v1 homepage approach) or "Posts" widget with the Skin plugin.

## 2. How to add a new case study (§31 — no page rebuild)

1. Posts → Case Studies → **Add New**. Title = project name, excerpt = one-line description; add featured image (≥1600px, WebP).
2. Fill ACF fields: role, timeline, platform, team, outcome headline; set **Featured** if it belongs on the homepage/industry filter.
3. Assign Industry + Platform terms.
4. (Optional) paste confidential material behind WP **post password** (§5).
5. Publish → it appears in `/work/`, in the homepage featured cards (once the Loop Grid swap is done), and renders through the Single template.
No Elementor page edits needed — that is the whole point of the CPT system (§36).

## 3. QA checklists against brief targets

**Responsive (§12):** verify at 1440, 1280, 1024, 834, 768, 390, 375, 360 — no horizontal overflow, line lengths ≤ ~70ch, all tap targets ≥44×44, sticky header never hides focused elements.
**Light/dark (§9, §10):** toggle through System → Light → Dark; reload in each state → no flash; muted text reads (6.4:1 light / 6.1:1 dark); screenshots bordered/dimmed slightly in dark; meta `theme-color` swaps.
**Accessibility (§26 — WCAG 2.2 AA):** keyboard-only walkthrough incl. skip link and form; VoiceOver + TalkBack pass; visible focus everywhere; `prefers-reduced-motion` freezes all motion (CSS does this §17 + JS checks it).
**Performance (§27):** mobile Lighthouse ≥ 90; LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1; page ≤ ~1.5MB on throttled 4G (test mid-range Android); lazy-load below-fold images; hero image preloaded; video loops as muted MP4/WebM, never GIF.
**SEO (§28):** title "Mehedi Hasan — Principal Product Designer in Dhaka"; the §28 meta description; one H1/page; canonical; OG/Twitter cards + OG image per page; `Person` schema on home (name, jobTitle, Dhaka locality, url, real sameAs only), `Article`/`CreativeWork` on case studies; XML sitemap; 301s verified.
**Content rules (§30):** grep the site for `PLACEHOLDER` before go-live — none may remain visible; every figure carries its "as of" date; every screenshot/logo has written permission (§38).
**Launch (§34):** staging tested ✔ backup ✔ rollback ✔ / analytics + consent + privacy page / form end-to-end / resume PDF linked / 404 + favicon + OG images.

## 4. Placeholder inventory (visible `[PLACEHOLDER]` labels, §41 rules)

| Where | Needs |
|---|---|
| Hero meta row | availability status + response-time (CONFIRM §23) |
| Tokens/Accent | owner sign-off on cobalt (or replacement) |
| Stats band | "as of" month/year for 1.5M+ installs, 3 awards (§5) |
| Project cards ×4 | role + period per product (§5), real screenshots (§38) |
| Experience timeline | employer names, roles, periods (§21); telecom wording CONFIRM (§4) |
| About | portrait photo (§20) |
| Playground | ≥3 real experiments or hide section (§40) |
| Contact | real email, form target inbox, resume URL |
| Footer | real social URLs (§23), resume |
| `[data-start-year="2014"]` | CONFIRM → auto "12+" forever (§37) |

## 5. Asset requirements to collect from the owner (§40)
Portrait (well-lit, no stock) · light/dark wordmark variants · per-project screenshots + short recordings (with employer/client approval) · verified figures with as-of dates · resume PDF · real social URLs · playground pieces · optional approved testimonials.

## 6. Files in this package

```
design-system/halo-tokens.css      theme tokens (light/dark, spacing, type) — measured contrast
assets/css/halo-fonts.css          self-hosted Inter + Fraunces @font-face
assets/css/halo-custom.css         all component styles (halo-*) — commented by section
assets/js/halo-theme.js            system/light/dark theme, no-flash boot, a11y labels
assets/js/halo.js                  reveals (IntersectionObserver), hero word reveal, years, header
snippets/case-study-cpt.php        CPT + taxonomies (§36)
elementor/templates/*.json         7 importable Flexbox-container templates
elementor/GLOBAL-SETTINGS.md       site settings spec (Phase 2)
elementor/REDIRECTS.md             301 map for old halo.bd URLs
elementor/generate-templates.mjs   regenerates the JSONs (edit + re-run)
preview/index.html                 production-excluded design reference of the homepage
docs/01-audit-and-ia.md            Phase 1   ·   this file: Phase 5
```
