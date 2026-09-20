/* HALO.BD — XML sitemap (§28) */
import type { MetadataRoute } from "next";
import { SITE } from "../lib/site";
import { PROJECTS } from "../lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "work/", "about/", "playground/", "contact/", "privacy/"].map((p) => ({
    url: `${SITE.url}/${p}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.7,
  }));
  const caseStudies = PROJECTS.map((p) => ({
    url: `${SITE.url}/work/${p.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [...staticPages, ...caseStudies];
}
