/* ==========================================================================
   HALO.BD — Build a single-file, double-clickable preview
     preview/halo-preview-standalone.html
   Everything (tokens, components CSS, theme JS, interaction JS) is inlined,
   so the file works from file:// with zero servers. Fonts still load from
   Google Fonts CDN when online (production self-hosts — see assets/fonts/).
   Run: node preview/build-standalone.mjs
   ========================================================================== */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const R = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(R, p), "utf8");

let html = read("preview/index.html");

/* Inline Google-hosted stylesheet links? none local — keep font CDN <link>. */
html = html.replace(
  /<link rel="stylesheet" href="\/design-system\/halo-tokens\.css">/,
  `<style>\n/* ===== inlined: design-system/halo-tokens.css ===== */\n${read("design-system/halo-tokens.css")}</style>`,
);
html = html.replace(
  /<link rel="stylesheet" href="\/assets\/css\/halo-custom\.css">/,
  `<style>\n/* ===== inlined: assets/css/halo-custom.css ===== */\n${read("assets/css/halo-custom.css")}</style>`,
);
html = html.replace(
  /<script src="\/assets\/js\/halo-theme\.js" defer><\/script>/,
  `<script>\n/* ===== inlined: assets/js/halo-theme.js ===== */\n${read("assets/js/halo-theme.js")}</script>`,
);
html = html.replace(
  /<script src="\/assets\/js\/halo\.js" defer><\/script>/,
  `<script>\n/* ===== inlined: assets/js/halo.js ===== */\n${read("assets/js/halo.js")}</script>`,
);
/* file:// has no /preview/ root — brand links go to top of the document. */
html = html.replaceAll('href="/preview/"', 'href="#"');

html = html.replace(
  "<title>",
  `<!-- SINGLE-FILE PREVIEW — open in any browser, no server needed. -->\n  <title>`,
);

const out = join(dirname(fileURLToPath(import.meta.url)), "halo-preview-standalone.html");
writeFileSync(out, html);
console.log("✓ halo-preview-standalone.html", Math.round(html.length / 1024), "KB");
