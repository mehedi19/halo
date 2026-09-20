/* ==========================================================================
   HALO.BD — Theme system  (Master Build Brief §10)
   States: System → Light → Dark, stored in localStorage ("halo-theme"),
   color-scheme set, no flash of the wrong theme.

   INSTALL (important for no-flash):
   Copy lines between === BOOT START === and === BOOT END === into an INLINE
   <script> in <head> BEFORE any stylesheet paint — use Elementor Custom Code
   (Site → Custom Code, location "<head>") or the child theme's wp_head.
   The remainder loads deferred as halo-theme.js.
   ========================================================================== */

/* === BOOT START (inline in <head>) === */
(function () {
  try {
    var stored = localStorage.getItem("halo-theme"); /* "light" | "dark" | null(system) */
    var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = stored || (systemDark ? "dark" : "light");
    var root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;
  } catch (e) {
    /* localStorage unavailable (private mode) — default light via CSS :root */
  }
})();
/* === BOOT END === */

/* Deferred: toggle behavior + system-change tracking --------------------- */
(function () {
  "use strict";

  var KEY = "halo-theme";
  var CYCLE = { system: "light", light: "dark", dark: "system" };
  var LABELS = {
    system: "Theme: system. Activate to switch to light mode.",
    light: "Theme: light. Activate to switch to dark mode.",
    dark: "Theme: dark. Activate to follow the system theme."
  };

  function getState() {
    try { return localStorage.getItem(KEY) || "system"; } catch (e) { return "system"; }
  }

  function effectiveTheme(state) {
    if (state !== "system") return state;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function apply(state, persist) {
    try {
      if (persist) {
        if (state === "system") localStorage.removeItem(KEY);
        else localStorage.setItem(KEY, state);
      }
    } catch (e) { /* ignore */ }
    var theme = effectiveTheme(state);
    var root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.setAttribute("data-theme-source", state);
    root.style.colorScheme = theme;
    document.querySelectorAll(".halo-theme-toggle").forEach(function (btn) {
      btn.setAttribute("aria-label", LABELS[state]);
      btn.setAttribute("aria-pressed", state === "system" ? "false" : "true");
      btn.setAttribute("title", LABELS[state]);
    });
    /* Keep <meta name="theme-color"> in sync for mobile chrome. */
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0A0A0A" : "#F6F6F3");
  }

  function init() {
    apply(getState(), false);
    document.querySelectorAll(".halo-theme-toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        apply(CYCLE[getState()], true);
      });
    });
    /* Follow OS changes while the user hasn't chosen explicitly. */
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
      if (getState() === "system") apply("system", false);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
