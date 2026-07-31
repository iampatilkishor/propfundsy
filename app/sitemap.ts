import type { MetadataRoute } from "next";
import { FIRMS } from "@/lib/data";
import { SITE_URL, slugOf } from "@/lib/seo";

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
  ];
}
