import { FIRMS, PLANS, type Firm, type Plan } from "@/lib/data";

/** Single source of truth for the production origin. TODO: set real domain before launch. */
export const SITE_URL = "https://propfundsy.com";

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
