# Elementor Global Settings — HALO.BD (Phase 2 spec)

Do this once on the staging site, before importing templates (§2, §29).

## 1. Experiments — enable (Elementor → Settings → Features)

| Feature | State | Why (Brief §2) |
|---|---|---|
| Flexbox Container | ✅ Active | required — every template uses containers |
| Optimized Markup / Optimized DOM Output | ✅ Active | lean DOM |
| Improved Asset Loading | ✅ Active | lean CSS/JS |
| Inline Font Icons (SVG) | ✅ Active | no icon-font payloads |
| Improved CSS Loading | ✅ Active | per-page CSS |
| Load Google Fonts Locally | ✅ Active | self-hosts Inter + Fraunces (§8) |
| Grid Container / Nested Elements | as available | loop grids |

## 2. Site Settings → Global Colors

These power the *editor palette*; components read the CSS tokens in
`design-system/halo-tokens.css` (theme-aware). Keep names identical:

| Name | Hex | Maps to token (light → dark) |
|---|---|---|
| Halo Text | `#0A0A0A` | `--halo-text`: `#0A0A0A` → `#F6F6F3` |
| Halo Muted | `#555A60` | `--halo-text-muted`: `#555A60` → `#8A8F94` (contrast rule §9) |
| Halo Background | `#F6F6F3` | `--halo-bg`: `#F6F6F3` → `#0A0A0A` |
| Halo Surface | `#FFFFFF` | `--halo-surface`: `#FFFFFF` → `#171A1D` |
| Halo Surface 2 | `#E8E9EA` | `--halo-surface-2`: `#E8E9EA` → `#25282B` |
| Halo Accent | `#2545DB` | `--halo-accent`: `#2545DB` → `#7D96FF` [PLACEHOLDER — owner decides] |

Set Elementor's four *system* colors to: Primary `#0A0A0A`, Secondary `#555A60`,
Text `#0A0A0A`, Accent `#2545DB` — so default widgets already look right in the editor.

## 3. Site Settings → Global Fonts

| Name | Family | Weights used |
|---|---|---|
| Halo Body | Inter (local) | 400, 500, 600, 650/700 |
| Halo Display | Fraunces (local) | 400, 500, 520, 600 + italic |

- Kit **body font** → Halo Body; kit H1–H6 → leave default, components set typography via `halo-*` classes (theme-safe — per-widget color/typography settings can't respond to dark mode, so classes own appearance).
- If uploading instead of "Load Google Fonts Locally": add both variable files under **Custom Fonts** and place files in `assets/fonts/` (see its README).

## 4. Layout

- Content width: **1200px** (= `--halo-container`); default container gap 20px.
- Elementor canvas = full-width; each section's inner wrapper carries class `halo-wrap`.
- Breakpoints default (Mobile ≤767, Tablet ≤1024) — QA targets 1440/1280/1024/834/768/390/375/360 map onto them via fluid `clamp()` values (§12).

## 5. Case Study fields (ACF group "Case Study", location: post type = case_study)

| Field | Type | Used in |
|---|---|---|
| `role` | Text | CS meta + loop card ("Lead Designer" etc.) |
| `timeline` | Text | CS meta ("2024–2026") |
| `platform_text` | Text | CS meta |
| `team` | Text | CS meta / 60-second summary |
| `outcome_headline` | Text (verified only) | loop card subline |
| `featured` | True/False | homepage + archive ordering |

Elementor Pro reads each via **Dynamic Tags → ACF Field** in the Single/Loop templates (marked "Swap:" in the JSON).

## 6. Custom code loading order (once, site-wide)

1. `<head>`: inline BOOT block of `assets/js/halo-theme.js` (Elementor Custom Code, location `<head>`) — kills theme flash.
2. Stylesheet 1: `design-system/halo-tokens.css`
3. Stylesheet 2: `assets/css/halo-fonts.css` (+ font files)
4. Stylesheet 3: `assets/css/halo-custom.css`
5. Deferred scripts: `assets/js/halo-theme.js`, `assets/js/halo.js`

Best home: a small child theme enqueueing these (one `functions.php`) **or** WPCode snippets — never scattered per-widget CSS (§39).
