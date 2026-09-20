# HALO.BD — WordPress + Elementor Install Guide (test build)

**15–25 minutes.** Do this on a **staging copy** of the site, never production first
(Master Build Brief §2). Keep a backup + rollback plan before you start.

---

## What you need

| Requirement | Notes |
|---|---|
| WordPress 6.5+ on PHP 8.2+ | the existing halo.bd install works (staging copy of it) |
| **Hello Elementor** theme | free · Appearance → Themes → Add New → search "Hello Elementor" |
| **Elementor** (free) | Plugins → Add New → "Elementor" |
| **Elementor Pro** | recommended — header/footer builder, nav menu, forms, loop grid. Free fallbacks: `docs/05-qa-and-handoff.md` §Licence fallbacks |

## Step 1 — Install the theme (loads all design code automatically)

1. Appearance → Themes → **Add New → Upload Theme** → choose **`theme/halo-child.zip`**
   (Hello Elementor must be installed too; it stays the parent).
2. Activate **HALO Child**.
3. Settings → **Permalinks → Save Changes** (registers `/work/` URLs from the Case Study CPT, which ships inside the child theme).

## Step 2 — Elementor settings (details: `elementor/GLOBAL-SETTINGS.md`)

1. Elementor → Settings → **Features**: enable **Flexbox Container**, Optimized Markup, Improved Asset Loading, **Inline Font Icons**, **Load Google Fonts Locally**.
2. Elementor → **Site Settings → Global Colors**: add the six Halo colors from `elementor/GLOBAL-SETTINGS.md` §2 (proposed accent: `#2545DB`).
3. **Global Fonts**: Primary = Inter, Secondary = Fraunces (both serve locally thanks to step 2.1 — or drop the variable woff2 files into `wp-content/themes/halo-child/assets/fonts/` per its README).
4. **Layout**: content width **1200px**.

## Step 3 — Import the templates

Elementor → Templates → Saved Templates → **Import Templates** → upload all 7 files from `elementor/templates/`:

| Template | Used for |
|---|---|
| `halo-home.json` | Home page content |
| `halo-header.json` | Theme Builder → Header (sitewide) |
| `halo-footer.json` | Theme Builder → Footer (sitewide) |
| `halo-contact.json` | Contact page |
| `halo-404.json` | Theme Builder → Error 404 |
| `halo-case-study-single.json` | Theme Builder → Single → condition: *Case Studies* |
| `halo-loop-item-project-card.json` | Theme Builder → Loop Item (project card) |

## Step 4 — Pages & building blocks

1. Create pages: **Home, Work, About, Playground, Contact, Privacy**.
2. **Home**: edit with Elementor → gray folder icon → **My Templates** → insert *HALO — Home*. Page template: **Elementor Canvas** (Page settings ⚙ → Page Layout). Same for Contact (*HALO — Contact*) and the 404 template.
3. **Theme Builder**: Header + Footer → insert matching imported templates, condition *Entire Site*. Single → *HALO — Case Study Single*, condition *Case Studies*. In the header template, select your menu in the nav widget.
4. Appearance → **Menus**: create *primary* = Work · About · Expertise (`/#expertise`) · Playground · Contact.
5. Settings → **Reading**: set *Home* as the static front page.
6. Case Studies → **Add New** → create one test study (e.g. "OneAI") to see the single template live at `/work/oneai/`.

## Step 5 — Replace placeholders (before anything goes public)

Every unverified item is visibly labeled `[PLACEHOLDER …]` in the templates —
inventory in `docs/05-qa-and-handoff.md` §4: availability line, roles/periods per
product, "as of" dates for the Shadhin numbers, experience rows, telecom wording
(CONFIRM), contact email, resume URL, social links. Per Brief §30/§40: **fill with
verified content or hide the section — never ship placeholders.**

## Test the design without WordPress

Open `preview/halo-preview-standalone.html` — one self-contained file, double-click
in any browser: theme toggle (System→Light→Dark), hero reveal, full homepage.

## Support docs inside this kit

- `docs/01-audit-and-ia.md` — audit of the old halo.bd + sitemap + content model
- `elementor/GLOBAL-SETTINGS.md` — exact colors/fonts/experiments values
- `elementor/REDIRECTS.md` — 301 map for the old halo.bd URLs (10 entries)
- `docs/05-qa-and-handoff.md` — QA checklists, add-a-case-study how-to, launch checklist
