import type { MetadataRoute } from "next";
import { FIRMS } from "@/lib/data";
import { SITE_URL, slugOf } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Generate comparison URLs — same-category pairs only (forex-vs-forex,
  // futures-vs-futures). Cross-category pairs aren't real search intent and
  // are excluded here to keep the sitemap free of low-value near-duplicates;
  // see the matching filter in app/compare/[firms]/page.tsx.
  const comparisons = [];
  for (let i = 0; i < FIRMS.length; i++) {
    for (let j = i + 1; j < FIRMS.length; j++) {
      if (FIRMS[i].cat !== FIRMS[j].cat) continue;
      comparisons.push({
        url: `${SITE_URL}/compare/${slugOf(FIRMS[i])}-vs-${slugOf(FIRMS[j])}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      });
    }
  }

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/compare`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    ...FIRMS.map((f) => ({
      url: `${SITE_URL}/firms/${slugOf(f)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...comparisons,
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 },
    ...getAllPosts().map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.updated ?? p.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
