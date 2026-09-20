# Fonts — drop these files here (production, self-hosted per Brief §8)

This sandbox cannot download binaries (outbound network is restricted),
so the font files themselves are **not** committed. Get them in ~2 minutes:

| File to download | Save as |
| --- | --- |
| [Inter variable woff2 (Fontsource)](https://cdn.jsdelivr.net/npm/@fontsource-variable/inter@5/files/inter-latin-wght-normal.woff2) | `inter-latin-var.woff2` |
| [Fraunces variable woff2](https://cdn.jsdelivr.net/npm/@fontsource-variable/fraunces@5/files/fraunces-latin-wght-normal.woff2) | `fraunces-latin-var.woff2` |
| [Fraunces variable italic woff2](https://cdn.jsdelivr.net/npm/@fontsource-variable/fraunces@5/files/fraunces-latin-wght-italic.woff2) | `fraunces-latin-italic-var.woff2` |

They're SIL Open Font License 1.1 — keep the `LICENSE` file from each package in this folder.

**Alternative (zero-config):** let Elementor serve them — Elementor → Settings →
Features → enable *Load Google Fonts Locally*, and pick Inter + Fraunces in
Site Settings → Global Fonts. That satisfies self-hosting automatically.

Either way, keep **only the weights used**: Inter 400–700, Fraunces 400–600 (+italic).
