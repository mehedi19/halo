# Phase 1 — Audit & Information Architecture

> HALO.BD portfolio · per Master Build Brief §33/§41 (Phase 1 deliverable)
> Date: 2026-09-20 · Auditor: Arena Agent

## 1. Audit of the existing halo.bd ✅ (site was accessible)

Audited `https://www.halo.bd/` and `/about/` on 2026-09-20.
Verdict: **the current site conflicts with the brief on nearly every axis** — it cannot be salvaged by tweaking; the rebuild is justified.

| # | Finding | Evidence | Brief violation |
|---|---------|----------|-----------------|
| 1 | **Identity crisis** — homepage opens with *"Digital Product Agency for the AI Era"*; about page says *"I'm Alex Daniels"* | live copy | §3 positioning (personal portfolio for Mehedi Hasan, not an agency, not "Alex") |
| 2 | **Lorem ipsum shipped to production** in About, Skills, Works, extra sections | `/about/` body copy | §30/§32 credibility, §32 quality bar |
| 3 | **Fabricated testimonial** — "Evelyn Sterling, CEO Sterling & Co." with a stock Unsplash portrait | homepage §"CUSTOMER PROOF" | §30 "never invent testimonials", §38 permissions |
| 4 | **Template projects** — Print Shop, Adam Barton, The Rainforest, Montana, Take a Break, Digly | homepage work grid | §16 requires real work: OneAI, Shadhin Music, Deen Islamic, WIN |
| 5 | **Pricing tiers ($49/$120/$350 "Investment Tiers")** | homepage bottom | Off-strategy for a portfolio; no such goal in §35 |
| 6 | **Glassmorphism + stock Unsplash imagery + emoji headlines** ("wisdom ☼", "natural ✿") | homepage 2nd half | §7 "avoid … glassmorphism, generic stock photography" |
| 7 | **No visible craft baseline issues** — mixed type systems, no light/dark mode, template aesthetics | whole site | §7, §10 |
| 8 | **Wrong skills framing** — "web design / product design / illustration" with filler text | `/about/` | §6 signature-strengths model |
| 9 | **Anonymous blog filler** — 3 template posts dated Jan 25, 2026 | homepage | not in sitemap §36; drop or hide |

**Keep:** the brand word "HALO" (matches domain), WordPress itself (site already runs WP — `wp-content` paths confirmed), and nothing else.

### URLs that will change → require 301s (§28, §34)
See `elementor/REDIRECTS.md` for the full map: `/projects/`, `/print-shop/`, `/adam-barton/`, `/the-rainforest/`, `/montana/`, `/take-a-break/`, `/digly/`, blog posts. `/about/` stays.

## 2. New information architecture (sitemap — §36, confirmed shape)

```
/                     Home — full story (§14): Hero → Credibility → Work → Process
                      → Expertise → AI+Tech → About → Experience → Playground → Contact
/work/                Case Study archive (Loop Grid; CPT has_archive)
/work/[project]/      Single case study (CPT "case_study", §36)
/about/               Long bio, experience, telecom collaboration, portrait
/playground/          Experiments index (hide until ≥3 real pieces — §40)
/contact/             Form (Elementor Pro Form + honeypot/Turnstile) + direct email
/resume/              [CONFIRM — PDF upload or page; §42]
/privacy/             Privacy policy (§38)
404                   Custom template shipped in this package
```

Navigation (§13): **Work · About · Expertise (→ /#expertise) · Playground · Contact** + brand, theme toggle, optional Resume link.

## 3. Content model (§36)

**CPT `case_study`** (`snippets/case-study-cpt.php`) → permalink base `/work/`.
Taxonomies: `industry` (AI, Music, Islamic lifestyle, Entertainment, Fintech, Healthtech, E-commerce, SaaS, OTT, Telecom), `platform` (Android, iOS, Web, …).

**ACF fields** (one group, attached to `case_study`): `role` · `timeline` · `platform_text` · `team` · `outcome_headline` · `featured` (true/false → homepage/loop order). Full spec: `elementor/GLOBAL-SETTINGS.md`.

**Depth tiers (§17):** flagship (OneAI, Shadhin Music, +1) use the full 15-section skeleton; standard projects use the short version (Hero, Context, My Role, Key Decisions, Outcome). The shipped `halo-case-study-single.json` is the flagship skeleton; delete sections for standard projects.

**Case-study openers (§17):** every study starts with a 60-second summary (problem / role / team / result) + an ownership line ("what I did / what the team did").

## 4. Elementor component plan (§29 class naming)

| Component | Class(es) | Built as |
|---|---|---|
| Sticky header + nav + theme toggle | `halo-header` `halo-nav` `halo-brand` `halo-theme-toggle` | Theme Builder header |
| Hero w/ signature word reveal | `halo-hero` `halo-display` | Home container |
| Section shells | `halo-section` `halo-section-head` `halo-eyebrow` | Containers |
| Credibility stats | `halo-stats` `halo-stat*` | Containers (editable numbers) |
| Project card | `halo-project-card` `halo-card-*` | Loop item + static v1 cards |
| Process steps | `halo-process` `halo-step` | Containers |
| Strengths + tools | `halo-strengths` `halo-chip` | Containers |
| AI + tech | section copy only | Containers |
| Timeline | `halo-timeline*` | HTML block (editable) |
| Playground | `halo-play-grid` `halo-play-item` | Containers/loop |
| Contact | `halo-contact` `halo-form` | Section + Pro Form |
| Footer | `halo-footer*` | Theme Builder footer |
| Case study | `halo-case-study` `halo-cs-*` | Theme Builder single |
| Reveals | `halo-reveal` (.is-visible) | any container |

## 5. Assumptions made (this phase)

1. **Elementor Pro is available** per brief CONFIRM (nav-menu, forms, Theme Builder, loop grid used). Free fallbacks listed in `docs/05-qa-and-handoff.md` §"Licence fallbacks" as required by §2.
2. Proposed **accent: cobalt** — `#2545DB` light / `#7D96FF` dark (6.57:1 / 7.24:1 measured). Marked `[PLACEHOLDER — decide]` per §9.
3. **Career start year 2014** → renders "12+" automatically every year (§37). Confirm.
4. English only for v1; no Bangla typography pair included (§8).
5. Goal assumed: **both** senior-role interest *and* select consulting (dual CTAs). Confirm §42.
6. WordPress install exists at halo.bd (confirmed) — hosting/PHP version unknown; assumed PHP 8.2+ per §39.

## 6. Open questions (owner — from §42, unchanged)

Goal (roles/consulting/both) · Accent sign-off · Elementor Pro licence + host · Which 2–3 flagships are cleared to show · Exact role/period on OneAI, Shadhin Music, Deen Islamic, WIN · Telecom collaboration wording · English-only? · Resume PDF vs page + analytics choice · Any real testimonials?
