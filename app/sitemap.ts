import type { MetadataRoute } from "next";
import { FIRMS } from "@/lib/data";
import { SITE_URL, slugOf } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
    ...FIRMS.map((f) => ({
      url: `${SITE_URL}/firms/${slugOf(f)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 },
    ...getAllPosts().map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.updated ?? p.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
