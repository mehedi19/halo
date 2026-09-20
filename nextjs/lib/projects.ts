/**
 * HALO.BD — Case studies (content model mirrors the WordPress CPT, Brief §36).
 * Factual claims come ONLY from the brief; everything unverified carries a
 * visible [PLACEHOLDER] label (§30) — fill before launch or hide (§40).
 */

export type Project = {
  slug: string;
  name: string;
  industry: string;
  platform: string;
  /** [PLACEHOLDER §5] — actual role/period must be confirmed by owner. */
  role: string;
  period: string;
  excerpt: string;
  /** Flagship → full 15-part skeleton; standard → short version (§17 depth tiers). */
  tier: "flagship" | "standard";
  stats?: { value: string; label: string }[];
};

export const AS_OF = "[PLACEHOLDER: month, year]"; // §5 date-stamp rule

export const PROJECTS: Project[] = [
  {
    slug: "oneai",
    name: "OneAI",
    industry: "AI · Platform",
    platform: "[PLATFORM — CONFIRM]",
    role: "[ROLE — CONFIRM §5]",
    period: "[PERIOD — CONFIRM §5]",
    excerpt:
      "All-in-one AI platform — a multi-model workspace that brings many AI workflows into one coherent product experience.",
    tier: "flagship",
  },
  {
    slug: "shadhin-music",
    name: "Shadhin Music",
    industry: "Music · Streaming",
    platform: "Android · iOS",
    role: "[ROLE — CONFIRM §5]",
    period: "[PERIOD — CONFIRM §5]",
    excerpt:
      "Music streaming and entertainment product. Figures per brief §5, kept editable.",
    tier: "flagship",
    stats: [
      { value: "1.5M+", label: `installs across Google Play & App Store — as of ${AS_OF}` },
      { value: "3", label: `awards — as of ${AS_OF}` },
    ],
  },
  {
    slug: "deen-islamic",
    name: "Deen Islamic",
    industry: "Islamic lifestyle · Ecosystem",
    platform: "[PLATFORM — CONFIRM]",
    role: "[ROLE — CONFIRM §5]",
    period: "[PERIOD — CONFIRM §5]",
    excerpt:
      "Islamic lifestyle and digital product ecosystem — everyday guidance brought into a calm, modern product experience.",
    tier: "standard",
  },
  {
    slug: "win",
    name: "WIN",
    industry: "Entertainment · Interactive",
    platform: "[PLATFORM — CONFIRM]",
    role: "[ROLE — CONFIRM §5]",
    period: "[PERIOD — CONFIRM §5]",
    excerpt:
      "Interactive entertainment and quiz product ecosystem built around play, retention and delight.",
    tier: "standard",
  },
];

export const FLAGSHIP_SECTIONS = [
  "Context", "Problem", "Research", "Strategy", "Information architecture",
  "User journey", "Wireframes", "UI design", "Interaction & micro-interactions",
  "Design system", "Challenges", "Solutions", "Outcome & impact", "Reflection",
] as const;

export const STANDARD_SECTIONS = [
  "Context", "My role", "Key decisions", "Outcome & impact",
] as const;

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
