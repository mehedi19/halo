/* ==========================================================================
   HALO.BD — Elementor template generator
   Emits importable Elementor JSON (format 0.4, Flexbox Containers only —
   Brief §2) into elementor/templates/.
   Run:  node elementor/generate-templates.mjs
   ========================================================================== */
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "templates");
mkdirSync(OUT, { recursive: true });

/* --- id factory: unique 7-char hex ids per template --------------------- */
function idFactory(seed) {
  let n = seed;
  return () => ((n = (n + 0x1f3b5d) >>> 0).toString(16).padStart(7, "0")).slice(-7);
}

/* --- element builders ---------------------------------------------------- */
const cont = (id, settings, children, isInner = false) =>
  ({ id: id(), elType: "container", settings, elements: children, isInner });
const w = (id, widgetType, settings) =>
  ({ id: id(), elType: "widget", settings, elements: [], widgetType });

const heading = (id, title, size, cls = "") =>
  w(id, "heading", { title, header_size: size, ...(cls && { _css_classes: cls }) });
const text = (id, editor, cls = "") =>
  w(id, "text-editor", { editor, ...(cls && { _css_classes: cls }) });
const html = (id, raw, cls = "") =>
  w(id, "html", { html: raw, ...(cls && { _css_classes: cls }) });

/* --- shared markup snippets (Lucide icons, ISC license) ----------------- */
const SVG = {
  arrow: `<svg class="halo-btn-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  arrowUpRight: `<svg class="halo-btn-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>`,
  sun: `<svg class="halo-icon-sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
  moon: `<svg class="halo-icon-moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
  system: `<svg class="halo-icon-system" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>`,
};
const btnPrimary = (label, href) =>
  `<a class="halo-btn halo-btn--primary" href="${href}">${label} ${SVG.arrow}</a>`;
const btnGhost = (label, href) =>
  `<a class="halo-btn halo-btn--ghost" href="${href}">${label} ${SVG.arrowUpRight}</a>`;
const linkArrow = (label, href) =>
  `<a class="halo-link-arrow" href="${href}">${label} ${SVG.arrow}</a>`;
const themeToggle =
  `<button type="button" class="halo-theme-toggle" aria-label="Switch color theme">${SVG.sun}${SVG.moon}${SVG.system}</button>`;
const mediaPlaceholder = (what) =>
  `[PLACEHOLDER — ${what}. Owner supplies real, permission-cleared asset (Brief §30, §38).]`;
const csSection = (id, title) => [
  heading(id, title, "h2", "halo-h3"),
  text(id, `<p>[SECTION — ${title}: add real content before publish (Brief §17, §30). Never invent research findings, outcomes, dates or metrics.]</p>`),
];

/* ==========================================================================
   1. HEADER — Theme Builder header (import as section, insert into location)
   ========================================================================== */
function header() {
  const id = idFactory(0x100000);
  const content = [
    cont(id, { _css_classes: "halo-header-wrap halo-wrap" }, [
      cont(id, {
        _css_classes: "halo-header",
        flex_direction: "row", flex_justify_content: "space-between",
        flex_align_items: "center", flex_wrap: "nowrap",
        content_width: "full", padding: "0px",
        padding_tablet: "0px", padding_mobile: "0px",
      }, [
        html(id, `<a class="halo-brand" href="/"><span class="halo-dot" aria-hidden="true"></span><span>Mehedi&nbsp;Hasan</span></a>`),
        w(id, "nav-menu", {
          menu: "primary", layout: "horizontal", pointer: "none",
          toggle: "yes", full_width: "yes",
          _css_classes: "halo-nav",
        }),
        html(id, `<div style="display:flex;align-items:center;gap:12px;">${themeToggle}${linkArrow("Resume", "/resume/")}</div>`),
        /* TODO(owner): /resume/ → real PDF URL or hide link (Brief §42). */
      ]),
    ], true),
  ];
  return { content, page_settings: [], version: "0.4", title: "HALO — Header", type: "section" };
}

/* ==========================================================================
   2. FOOTER
   ========================================================================== */
function footer() {
  const id = idFactory(0x200000);
  const content = [
    cont(id, { _css_classes: "halo-footer" }, [
      cont(id, { _css_classes: "halo-wrap" }, [
        cont(id, { _css_classes: "halo-footer-grid" }, [
          cont(id, { flex_direction: "column", flex_gap: { unit: "px", size: 8 } }, [
            html(id, `<a class="halo-brand" href="/"><span class="halo-dot" aria-hidden="true"></span><span>Mehedi&nbsp;Hasan</span></a>`),
            text(id, `<p class="halo-caption">Principal Product Designer<br>Dhaka, Bangladesh</p>`),
            text(id, `<p class="halo-caption">Designed with curiosity. Built with intention.</p>`),
          ]),
          cont(id, {}, [
            html(id, `<nav aria-label="Footer"><ul><li><a href="/work/">Work</a></li><li><a href="/about/">About</a></li><li><a href="/#expertise">Expertise</a></li><li><a href="/playground/">Playground</a></li><li><a href="/contact/">Contact</a></li></ul></nav>`),
          ]),
          cont(id, {}, [
            html(id, `<p class="halo-caption">Elsewhere — [PLACEHOLDER: real social URLs only, Brief §23]</p><ul><li><a href="#" rel="me">LinkedIn</a></li><li><a href="#" rel="me">Behance</a></li><li><a href="#" rel="me">Dribbble</a></li></ul>`),
          ]),
        ]),
        html(id, `<div class="halo-footer-base"><span>© <span data-halo-year>2026</span> Mehedi Hasan</span><span>Dhaka, Bangladesh</span></div>`),
      ]),
    ]),
  ];
  return { content, page_settings: [], version: "0.4", title: "HALO — Footer", type: "section" };
}

/* ==========================================================================
   3. Selected Work — 4 static editorial cards (mirrors Loop Grid markup).
      Replace with a Loop Grid once Case Study posts exist (docs §Phase 4).
   ========================================================================== */
const PROJECTS = [
  { slug: "oneai", name: "OneAI", industry: "AI · Platform", blurb: "All-in-one AI platform — a multi-model workspace that brings many AI workflows into one coherent product experience." },
  { slug: "shadhin-music", name: "Shadhin Music", industry: "Music · Streaming", blurb: "Music streaming and entertainment product. <strong>1.5M+ installs</strong> across Google Play & App Store and <strong>3 awards</strong> — as of [PLACEHOLDER: month, year] (Brief §5)." },
  { slug: "deen-islamic", name: "Deen Islamic", industry: "Islamic lifestyle · Ecosystem", blurb: "Islamic lifestyle and digital product ecosystem — everyday guidance brought into a calm, modern product experience." },
  { slug: "win", name: "WIN", industry: "Entertainment · Interactive", blurb: "Interactive entertainment and quiz product ecosystem built around play, retention and delight." },
];

function projectCard(id, p) {
  return cont(id, { _css_classes: "halo-project-card halo-reveal", flex_direction: "column", flex_gap: { unit: "px", size: 16 } }, [
    cont(id, { _css_classes: "halo-card-media halo-card-media--placeholder" }, [
      text(id, `<p>${mediaPlaceholder(`${p.name} product screenshots`)}</p>`),
    ]),
    cont(id, { _css_classes: "halo-card-meta", flex_direction: "row", flex_justify_content: "space-between" }, [
      text(id, `<p>${p.industry}</p>`),
      text(id, `<p>Role [PLACEHOLDER] · Period [PLACEHOLDER]</p>`),
    ]),
    heading(id, p.name, "h3", "halo-card-title halo-h3"),
    text(id, `<p class="halo-text-muted">${p.blurb}</p>`),
    html(id, linkArrow("View case study", `/work/${p.slug}/`)),
  ], true);
}

/* ==========================================================================
   4. HOME — the full story per Brief §14
   ========================================================================== */
function home() {
  const id = idFactory(0x300000);

  const hero = cont(id, { _css_classes: "halo-section halo-hero" }, [
    cont(id, { _css_classes: "halo-wrap" }, [
      html(id, `<p class="halo-eyebrow">Dhaka, Bangladesh</p>`, "halo-reveal"),
      heading(id, "I design <em>products</em>, not just screens.", "h1", "halo-display"),
      text(id, `<p class="halo-lead">I'm Mehedi Hasan — a Principal Product Designer. For <span data-start-year="2014">12+</span> years I've helped teams turn complex ideas into simple, useful products across AI, music, fintech, entertainment, telecom and more.</p>`, "halo-reveal"),
      html(id, `<div class="halo-hero-cta">${btnPrimary("Explore my work", "/work/")}${btnGhost("Let's talk", "/contact/")}</div>`, "halo-reveal"),
      html(id, `<div class="halo-hero-meta"><span class="halo-status">[PLACEHOLDER: availability, e.g. “Open to select projects” — CONFIRM §23]</span><span><span data-start-year="2014">12+</span> years of experience</span><span>Previous: telecom, media & platform teams [PLACEHOLDER]</span></div>`, "halo-reveal"),
    ]),
  ]);

  const credibility = cont(id, { _css_classes: "halo-section halo-section--tight" }, [
    cont(id, { _css_classes: "halo-wrap" }, [
      cont(id, { _css_classes: "halo-stats", flex_direction: "row", flex_wrap: "wrap", flex_gap: { unit: "px", size: 32 } }, [
        html(id, `<span class="halo-stat-value"><span data-start-year="2014">12+</span></span><span class="halo-stat-label">years designing digital products</span>`, "halo-stat halo-reveal"),
        html(id, `<span class="halo-stat-value">1.5M+</span><span class="halo-stat-label">installs — Shadhin Music, as of [PLACEHOLDER: month, year] §5</span>`, "halo-stat halo-reveal"),
        html(id, `<span class="halo-stat-value">3</span><span class="halo-stat-label">awards — Shadhin Music, as of [PLACEHOLDER: month, year] §5</span>`, "halo-stat halo-reveal"),
      ]),
      html(id, `<ul class="halo-domains" aria-label="Industries"><li>AI</li><li>Music</li><li>Islamic lifestyle</li><li>Entertainment</li><li>Fintech</li><li>Healthtech</li><li>E-commerce</li><li>SaaS</li><li>OTT</li><li>Telecom</li></ul>`, "halo-reveal"),
    ]),
  ]);

  const work = cont(id, { _css_classes: "halo-section", id: "work" }, [
    cont(id, { _css_classes: "halo-wrap" }, [
      cont(id, { _css_classes: "halo-section-head" }, [
        html(id, `<p class="halo-eyebrow">Selected work</p>`),
        heading(id, "Products I've helped shape.", "h2", "halo-h2"),
        text(id, `<p class="halo-lead">A few of the products and ecosystems I've designed with their teams. Four flagship case studies; more across fintech, healthtech, SaaS, e-commerce, OTT and telecom.</p>`),
      ]),
      cont(id, { _css_classes: "halo-work-grid", flex_wrap: "wrap", flex_gap: { unit: "px", size: 48 } },
        PROJECTS.map((p) => projectCard(id, p))),
    ]),
  ]);

  const steps = ["Understand", "Explore", "Define", "Design", "Prototype", "Test", "Ship", "Improve"];
  const process = cont(id, { _css_classes: "halo-section" }, [
    cont(id, { _css_classes: "halo-wrap" }, [
      cont(id, { _css_classes: "halo-section-head" }, [
        html(id, `<p class="halo-eyebrow">Process</p>`),
        heading(id, "Flexible, not formulaic.", "h2", "halo-h2"),
        text(id, `<p class="halo-lead">Every product earns its own path, but the rhythm stays the same — and it loops. Shipping is the middle, not the end.</p>`),
      ]),
      cont(id, { _css_classes: "halo-process", flex_wrap: "wrap", flex_gap: { unit: "px", size: 24 } },
        steps.map((s) => heading(id, s, "h3", "halo-step halo-h3 halo-reveal"))),
    ]),
  ]);

  const STRENGTHS = [
    ["Product strategy", "Problem framing, scope and roadmap trade-offs"],
    ["User experience", "Journeys, flows and information architecture"],
    ["Interaction design", "Behavior, states and micro-interactions"],
    ["Design systems", "Tokens, components and scalable patterns"],
    ["Visual design", "Typography, color, layout and motion"],
    ["Prototyping", "From quick tests to high-fidelity flows"],
    ["Design leadership", "Reviews, mentoring, cross-functional work"],
    ["AI-assisted workflows", "Faster exploration, sharper decisions"],
  ];
  const expertise = cont(id, { _css_classes: "halo-section", id: "expertise" }, [
    cont(id, { _css_classes: "halo-wrap" }, [
      cont(id, { _css_classes: "halo-section-head" }, [
        html(id, `<p class="halo-eyebrow">Expertise</p>`),
        heading(id, "What I'm trusted with.", "h2", "halo-h2"),
        text(id, `<p class="halo-lead">Eight signature strengths at Principal level — each is proven inside the case studies, not just listed here.</p>`),
      ]),
      cont(id, { _css_classes: "halo-strengths", flex_wrap: "wrap" },
        STRENGTHS.map(([b, s]) =>
          html(id, `<b>${b}</b><small>${s}</small>`, "halo-strength halo-reveal"))),
      html(id, `<p class="halo-eyebrow" style="margin-top:48px;">Tools & craft</p><div class="halo-tools"><span class="halo-chip">Figma</span><span class="halo-chip">Framer</span><span class="halo-chip">Lovable</span><span class="halo-chip">Google Antigravity</span><span class="halo-chip">Claude Code</span><span class="halo-chip">HTML</span><span class="halo-chip">CSS</span><span class="halo-chip">WordPress</span><span class="halo-chip">Elementor</span><span class="halo-chip">Photoshop</span><span class="halo-chip">Illustrator</span><span class="halo-chip">After Effects</span><span class="halo-chip">Premiere Pro</span></div>`, "halo-reveal"),
    ]),
  ]);

  const ai = cont(id, { _css_classes: "halo-section" }, [
    cont(id, { _css_classes: "halo-wrap halo-section-head" }, [
      html(id, `<p class="halo-eyebrow">AI + technology</p>`),
      heading(id, "Designing beyond the canvas.", "h2", "halo-h2"),
      text(id, `<p class="halo-lead">I use AI and modern build tools to move from idea to working prototype faster — to test interactions, validate concepts and speak the same language as engineering. I'm a product designer with strong technology fluency, not a full-time engineer.</p>`),
    ]),
  ]);

  const about = cont(id, { _css_classes: "halo-section" }, [
    cont(id, { _css_classes: "halo-wrap halo-section-head" }, [
      html(id, `<p class="halo-eyebrow">About</p>`),
      heading(id, "Design that balances people, business and technology.", "h2", "halo-h2"),
      text(id, `<p class="halo-lead">I'm a Principal Product Designer in Dhaka with <span data-start-year="2014">12+</span> years across AI, music, Islamic lifestyle, entertainment, fintech, healthtech, SaaS, e-commerce, OTT and telecom. Off the clock: motorcycles, movies, and an unreasonable curiosity about how things are made.</p>`),
      html(id, linkArrow("More about me", "/about/")),
    ]),
  ]);

  const experience = cont(id, { _css_classes: "halo-section" }, [
    cont(id, { _css_classes: "halo-wrap" }, [
      cont(id, { _css_classes: "halo-section-head" }, [
        html(id, `<p class="halo-eyebrow">Experience</p>`),
        heading(id, "Where I've practiced.", "h2", "halo-h2"),
      ]),
      html(id, `<div class="halo-timeline">
        <div class="halo-timeline-item"><span class="halo-timeline-period">[PERIOD — CONFIRM]</span><div><span class="halo-timeline-role">Principal Product Designer</span><br><span class="halo-timeline-org">[COMPANY / PRODUCT — CONFIRM §21]</span></div></div>
        <div class="halo-timeline-item"><span class="halo-timeline-period">[PERIOD — CONFIRM]</span><div><span class="halo-timeline-role">[PREVIOUS ROLE — CONFIRM]</span><br><span class="halo-timeline-org">[COMPANY — CONFIRM]</span></div></div>
        <div class="halo-timeline-item"><span class="halo-timeline-period">Telecom</span><div><span class="halo-timeline-role">Worked closely with product and digital teams at Grameenphone, Robi and Banglalink.</span><br><span class="halo-timeline-org">[CONFIRM exact nature of collaboration — Brief §4. Text names only; no operator logos without written permission.]</span></div></div>
      </div>`, "halo-reveal"),
    ]),
  ]);

  const playground = cont(id, { _css_classes: "halo-section" }, [
    cont(id, { _css_classes: "halo-wrap" }, [
      cont(id, { _css_classes: "halo-section-head" }, [
        html(id, `<p class="halo-eyebrow">Playground</p>`),
        heading(id, "Things I build when nobody asks me to.", "h2", "halo-h2"),
      ]),
      cont(id, { _css_classes: "halo-play-grid", flex_wrap: "wrap", flex_gap: { unit: "px", size: 24 } }, [
        html(id, `<b class="halo-h3">[Experiment 01]</b><small class="halo-caption">[PLACEHOLDER — real UI/motion/AI experiment per §22, §40]</small>`, "halo-play-item halo-reveal"),
        html(id, `<b class="halo-h3">[Experiment 02]</b><small class="halo-caption">[PLACEHOLDER]</small>`, "halo-play-item halo-reveal"),
        html(id, `<b class="halo-h3">[Experiment 03]</b><small class="halo-caption">[PLACEHOLDER]</small>`, "halo-play-item halo-reveal"),
      ]),
    ]),
  ]);

  const contact = cont(id, { _css_classes: "halo-section halo-contact" }, [
    cont(id, { _css_classes: "halo-wrap halo-section-head" }, [
      heading(id, "Have a product worth <em>designing</em>?", "h2", "halo-display halo-reveal"),
      text(id, `<p class="halo-lead">Let's turn complex ideas into simple, meaningful experiences.</p>`, "halo-reveal"),
      html(id, `<div class="halo-hero-cta">${btnPrimary("Start a conversation", "/contact/")}</div><p class="halo-caption">Or write directly: <strong>[PLACEHOLDER — real contact email only]</strong> · [PLACEHOLDER: response-time expectation, e.g. “I reply within two working days.”]</p>`, "halo-reveal"),
    ]),
  ]);

  return {
    content: [hero, credibility, work, process, expertise, ai, about, experience, playground, contact],
    page_settings: { hide_title: "yes" },
    version: "0.4", title: "HALO — Home", type: "page",
  };
}

/* ==========================================================================
   5. CASE STUDY — Single template skeleton (Brief §17 + depth tiers §17)
   Import as section → insert into a Theme Builder Single that targets the
   case_study CPT. Swap [bracketed] blocks for Elementor Pro dynamic tags.
   ========================================================================== */
function caseStudySingle() {
  const id = idFactory(0x400000);
  const FULL = ["Context", "Problem", "Research", "Strategy", "Information architecture",
    "User journey", "Wireframes", "UI design", "Interaction & micro-interactions",
    "Design system", "Challenges", "Solutions", "Outcome & impact", "Reflection"];

  const sections = [cont(id, { _css_classes: "halo-section halo-case-study" }, [
    cont(id, { _css_classes: "halo-wrap" }, [
      html(id, `<p class="halo-eyebrow">[Industry · Platform — dynamic: post terms]</p>`),
      /* Swap for Theme Builder "Post Title" widget when Pro is present. */
      heading(id, "[Project title — dynamic: post title]", "h1", "halo-display"),
      text(id, `<p class="halo-lead">[One-line project description — dynamic: post excerpt]</p>`),
      html(id, `<div class="halo-cs-meta">
        <div><p class="halo-eyebrow">My role</p><p>[Lead Designer? CONFIRM — dynamic: ACF role]</p></div>
        <div><p class="halo-eyebrow">Timeline</p><p>[e.g. 2024–2026 — dynamic: ACF timeline]</p></div>
        <div><p class="halo-eyebrow">Platform</p><p>[Android / iOS / Web — dynamic: ACF platform]</p></div>
        <div><p class="halo-eyebrow">Team</p><p>[Team shape — dynamic: ACF team]</p></div>
      </div>`),
      html(id, `<div class="halo-cs-summary"><p class="halo-eyebrow">60-second summary</p><p><strong>Problem:</strong> [one line]</p><p><strong>My role:</strong> [one line]</p><p><strong>Team:</strong> [one line]</p><p><strong>Result:</strong> [verified outcome only — §17, §30]</p><hr><p class="halo-caption"><strong>What I did:</strong> […] · <strong>What the team did:</strong> […] — ownership line per Brief §17.</p></div>`, "halo-reveal"),
      html(id, `<figure class="halo-figure halo-media">${""}<div class="halo-card-media halo-card-media--placeholder"><p>${mediaPlaceholder("hero product screenshot/video loop")}</p></div><figcaption class="halo-caption">[Caption — describe what the artifact shows]</figcaption></figure>`),
    ]),
  ])];

  FULL.forEach((s, i) => {
    sections.push(cont(id, { _css_classes: `halo-section halo-cs-prose${i ? "" : ""}` }, [
      cont(id, { _css_classes: "halo-wrap" }, csSection(id, s)),
    ]));
  });

  sections.push(cont(id, { _css_classes: "halo-section halo-contact" }, [
    cont(id, { _css_classes: "halo-wrap" }, [
      html(id, `<div class="halo-hero-cta">${btnGhost("All work", "/work/")}${btnPrimary("Start a conversation", "/contact/")}</div>`),
    ]),
  ]));

  return { content: sections, page_settings: { hide_title: "yes" }, version: "0.4", title: "HALO — Case Study Single", type: "section" };
}

/* ==========================================================================
   6. LOOP ITEM — Project Card (insert into Theme Builder → Loop Item)
   ========================================================================== */
function loopCard() {
  const id = idFactory(0x500000);
  const content = [
    cont(id, { _css_classes: "halo-project-card", flex_direction: "column", flex_gap: { unit: "px", size: 16 } }, [
      html(id, `<div class="halo-card-media halo-card-media--placeholder"><p>Swap: Featured Image widget, linked to post (4:3, object-fit cover). ${mediaPlaceholder("project thumbnail")}</p></div>`),
      html(id, `<div class="halo-card-meta"><p>Swap: post terms (industry)</p><p>Swap: ACF role · ACF period</p></div>`),
      heading(id, "Swap: Post Title (linked)", "h3", "halo-card-title halo-h3"),
      text(id, `<p class="halo-text-muted">Swap: Post excerpt / ACF outcome headline.</p>`),
      html(id, linkArrow("View case study", "#dynamic-post-url")),
    ], true),
  ];
  return { content, page_settings: [], version: "0.4", title: "HALO — Loop Item: Project Card", type: "section" };
}

/* ==========================================================================
   7. CONTACT page
   ========================================================================== */
function contactPage() {
  const id = idFactory(0x600000);
  const content = [
    cont(id, { _css_classes: "halo-section halo-hero halo-contact" }, [
      cont(id, { _css_classes: "halo-wrap halo-section-head" }, [
        html(id, `<p class="halo-eyebrow">Contact</p>`),
        heading(id, "Have a product worth <em>designing</em>?", "h1", "halo-display"),
        text(id, `<p class="halo-lead">Let's turn complex ideas into simple, meaningful experiences. [PLACEHOLDER: availability + response-time expectation — CONFIRM §23]</p>`),
        html(id, `<div class="halo-hero-meta"><span>Direct: <strong>[PLACEHOLDER — real contact email]</strong></span><span>Dhaka, Bangladesh · GMT+6</span></div>`),
        /* Elementor Pro Form widget. Free fallback: Shortcode widget + WPForms/
           Fluent Forms shortcode — see docs/05. Spam: honeypot field + Turnstile. */
        w(id, "form", {
          form_name: "HALO contact",
          _css_classes: "halo-form",
          button_text: "Start a conversation",
          form_fields: [
            { _id: "name", field_type: "text", field_label: "Name", placeholder: "Your name", required: "true", width: "50" },
            { _id: "email", field_type: "email", field_label: "Email", placeholder: "you@example.com", required: "true", width: "50" },
            { _id: "message", field_type: "textarea", field_label: "What are you building?", placeholder: "A few honest lines beat a long brief.", required: "true", width: "100", rows: 6 },
            { _id: "honeypot", field_type: "honeypot", field_label: "", width: "100" },
          ],
          email_to: "[PLACEHOLDER — real inbox]",
          email_subject: "New inquiry — halo.bd",
          success_message: "Thanks — your note landed. I'll reply within two working days.",
        }),
      ]),
    ]),
  ];
  return { content, page_settings: { hide_title: "yes" }, version: "0.4", title: "HALO — Contact", type: "page" };
}

/* ==========================================================================
   8. 404
   ========================================================================== */
function notFound() {
  const id = idFactory(0x700000);
  const content = [
    cont(id, { _css_classes: "halo-section halo-hero" }, [
      cont(id, { _css_classes: "halo-wrap halo-section-head" }, [
        html(id, `<p class="halo-eyebrow">404</p>`),
        heading(id, "This page took a wrong turn.", "h1", "halo-display"),
        text(id, `<p class="halo-lead">The work is all at <a href="/work/">/work</a> — or start again from the top.</p>`),
        html(id, `<div class="halo-hero-cta">${btnPrimary("Back home", "/")}${btnGhost("See the work", "/work/")}</div>`),
      ]),
    ]),
  ];
  return { content, page_settings: { hide_title: "yes" }, version: "0.4", title: "HALO — 404", type: "page" };
}

/* --- emit ---------------------------------------------------------------- */
const files = {
  "halo-header.json": header(),
  "halo-footer.json": footer(),
  "halo-home.json": home(),
  "halo-case-study-single.json": caseStudySingle(),
  "halo-loop-item-project-card.json": loopCard(),
  "halo-contact.json": contactPage(),
  "halo-404.json": notFound(),
};
for (const [name, tpl] of Object.entries(files)) {
  writeFileSync(join(OUT, name), JSON.stringify(tpl, null, 2));
  console.log("✓", name);
}
console.log("\nImport via: Elementor → Templates → Saved Templates → Import Templates.");
