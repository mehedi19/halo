/** HALO.BD — site-wide constants. Edit once, used everywhere. */

export const SITE = {
  name: "Mehedi Hasan",
  title: "Principal Product Designer",
  /** SEO title per Master Build Brief §28 */
  seoTitle: "Mehedi Hasan — Principal Product Designer in Dhaka",
  description:
    "Mehedi Hasan is a Principal Product Designer based in Dhaka with 12+ years of experience designing digital products, user experiences, interfaces and design systems across AI, music, fintech, entertainment, telecom and more.",
  url: "https://www.halo.bd",
  location: "Dhaka, Bangladesh",
  /** [PLACEHOLDER — CONFIRM §23] availability line shown in hero + contact. */
  availability: "[PLACEHOLDER: availability — e.g. “Open to select projects” · CONFIRM §23]",
  /** [PLACEHOLDER — real contact email only, §23/§38. Obfuscate on publish.] */
  email: "[PLACEHOLDER — real contact email]",
  responseTime: "[PLACEHOLDER: response-time expectation — e.g. “I reply within two working days.”]",
  /** [PLACEHOLDER — real URLs only, §23. Never invent links.] */
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "Behance", href: "#" },
    { label: "Dribbble", href: "#" },
  ],
} as const;

/**
 * Experience years are COMPUTED from a single start year so the number never
 * goes stale (Brief §37). [PLACEHOLDER — confirm 2014 career start, §42]
 */
export const CAREER_START_YEAR = 2014;
export const experienceYears = () => `${Math.max(0, new Date().getFullYear() - CAREER_START_YEAR)}+`;

export const NAV = [
  { label: "Work", href: "/work/" },
  { label: "About", href: "/about/" },
  { label: "Expertise", href: "/#expertise" },
  { label: "Playground", href: "/playground/" },
  { label: "Contact", href: "/contact/" },
] as const;
