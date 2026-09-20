/* ==========================================================================
   HALO.BD — Interactions  (Master Build Brief §25, §37)
   One tiny file, zero dependencies:
     1. Scroll reveals      — IntersectionObserver, transform+opacity only
     2. Hero word reveal    — splits .halo-display into words (signature moment)
     3. Sticky header state — border when scrolled
     4. Years of experience — computed once from [data-start-year] (§37:
                              "store the start year once, so it never goes stale")
     5. Footer year         — [data-halo-year]
   Respects prefers-reduced-motion throughout.
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* --- 1. Scroll reveals (stagger via inline --halo-reveal-delay) ------- */
  function initReveals() {
    var items = document.querySelectorAll(".halo-reveal");
    if (!items.length) return;
    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); /* reveal once */
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
    items.forEach(function (el) { observer.observe(el); });
  }

  /* --- 2. Hero signature: word-by-word reveal --------------------------- */
  function initHeroWords() {
    var display = document.querySelector(".halo-hero .halo-display");
    if (!display || reduceMotion.matches) return;
    if (display.dataset.haloSplit === "done") return; /* re-init safe */
    var nodes = Array.prototype.slice.call(display.childNodes);
    display.textContent = "";
    var index = 0;
    nodes.forEach(function (node) {
      var italic = node.nodeType === 1 && node.tagName === "EM";
      var text = node.textContent || "";
      text.split(/(\s+)/).forEach(function (piece) {
        if (!piece.trim()) { display.appendChild(document.createTextNode(" ")); return; }
        var span = document.createElement("span");
        span.className = "halo-word";
        span.style.setProperty("--halo-word-i", String(index++));
        if (italic) {
          var em = document.createElement("em");
          em.textContent = piece;
          span.appendChild(em);
        } else {
          span.textContent = piece;
        }
        display.appendChild(span);
      });
    });
    display.dataset.haloSplit = "done";
  }

  /* --- 3. Sticky header state ------------------------------------------- */
  function initHeader() {
    var header = document.querySelector(".halo-header");
    if (!header) return;
    var tick = false;
    function onScroll() {
      if (tick) return;
      tick = true;
      requestAnimationFrame(function () {
        header.classList.toggle("is-scrolled", window.scrollY > 8);
        tick = false;
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* --- 4. Experience years, never stale (§37) -----------------------------
     Markup: <span data-start-year="2014">12+</span> years
     [PLACEHOLDER — confirm actual career start year, Brief §42]          */
  var START_YEAR_FALLBACK = 2014;
  function initYears() {
    var now = new Date().getFullYear();
    document.querySelectorAll("[data-start-year]").forEach(function (el) {
      var start = parseInt(el.getAttribute("data-start-year"), 10) || START_YEAR_FALLBACK;
      el.textContent = Math.max(0, now - start) + "+";
    });
    document.querySelectorAll("[data-halo-year]").forEach(function (el) {
      el.textContent = String(now);
    });
  }

  function init() {
    initReveals();
    initHeroWords();
    initHeader();
    initYears();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  /* Re-run reveals if Elementor/front-end re-renders late content. */
  window.addEventListener("elementor/frontend/init", function () {
    document.removeEventListener("DOMContentLoaded", init);
  });
})();
