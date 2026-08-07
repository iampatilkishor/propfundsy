import { FIRMS, PLANS, type Firm, type Plan } from "@/lib/data";

/** Single source of truth for the production origin. */
export const SITE_URL = "https://propfundsy-delta.vercel.app";

export const slugOf = (f: Firm) =>
  f.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const firmBySlug = (slug: string): Firm | undefined =>
  FIRMS.find((f) => slugOf(f) === slug);

export const plansOfFirm = (firmId: string): Plan[] =>
  PLANS.filter((p) => p.firmId === firmId);

export const firmUrl = (f: Firm) => `${SITE_URL}/firms/${slugOf(f)}`;

export const relatedFirms = (f: Firm, n = 3): Firm[] =>
  FIRMS.filter((x) => x.id !== f.id && x.cat === f.cat).slice(0, n);

/** Cheapest plan label for a firm, if it has plans. */
export const cheapestPlan = (firmId: string): Plan | undefined =>
  plansOfFirm(firmId).slice().sort((a, b) => a.price - b.price)[0];

/** Hard-caps a meta description so it never exceeds Google's ~160-char snippet
 * window, regardless of how long the underlying data (firm names, size ranges,
 * counts) happens to be. Truncates on a word boundary. */
export const truncateDesc = (s: string, max = 160): string => {
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : cut.length)}…`;
};
