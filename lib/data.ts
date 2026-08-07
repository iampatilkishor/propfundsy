import firmsJson from "@/data/firms.json";
import plansJson from "@/data/plans.json";

export type Category = "forex" | "futures";
export type TriState = "yes" | "restricted" | "no" | "na";
export type DdKind = "static" | "eod-trail" | "intraday-trail" | "custom";

export interface Firm {
  id: string;
  name: string;
  cat: Category;
  color: string;
  featured?: boolean;
  desc: string;
  split: string;
  from: string;
  sizes: string;
  model: string;
  source: string;
  officialUrl: string;
  payMethods: string[];    // how you pay the evaluation fee
  payoutMethods: string[]; // how the firm pays you
  affiliateUrl: string | null;  // your referral link; null = not joined yet
  discountCode: string | null;  // your promo code, shown to users
  promoActive: boolean;         // true if the discount code is currently active
  review: string | null;        // editorial take shown on the firm page; null = not written yet
  tags: [string, "pos" | ""][];
}

export interface Plan {
  firmId: string;
  plan: string;
  cat: Category;
  size: number;
  sizeLabel: string;
  price: number;        // USD-equivalent, for sorting/cost math
  priceLabel: string;
  monthly: boolean;     // true = subscription fee
  steps: string;        // "1-Step" | "2-Step" | "3-Step" | "Instant"
  splitSort: number;
  splitLabel: string;
  target: string;
  dd: string;
  ddKind: DdKind;
  dailyLoss: string;
  news: TriState;
  ea: TriState;
  weekend: TriState;
  consistency: string | null;
  refund: string | null;
  payoutDays: number;   // typical days between payouts (or to first payout)
  payout: string;
  verified: boolean;    // confirmed on the firm's official site
  notes: string;
}

/*
 * DATA lives in /data/firms.json and /data/plans.json — edit those, not this file.
 * Run `npm run validate:data` (or open a PR — CI runs it) after any change.
 *
 * verified: true  -> confirmed directly on the firm's official website
 * verified: false -> compiled from third-party reviews or interpolated ("~" prices)
 */

export const FIRMS: Firm[] = firmsJson as Firm[];
export const PLANS: Plan[] = plansJson as Plan[];

export const firmById: Record<string, Firm> = Object.fromEntries(FIRMS.map((f) => [f.id, f]));

/** Affiliate link if set, otherwise the official site. */
export const firmLink = (f: Firm) => f.affiliateUrl ?? f.officialUrl;

export const initials = (n: string) =>
  n.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

/** Cost per $10K of buying power, e.g. "$58" or "$13/mo" */
export const costPer10k = (p: Plan) =>
  `$${Math.round(p.price / (p.size / 10000))}${p.monthly ? "/mo" : ""}`;

export const costPer10kNum = (p: Plan) => p.price / (p.size / 10000);

export const DISTINCT_SIZES = [...new Set(PLANS.map((p) => p.size))].sort((a, b) => a - b);

export const sizeLabelOf = (size: number) =>
  size >= 1000000 ? `$${size / 1000000}M` : `$${size / 1000}K`;

export const DD_LABEL: Record<DdKind, string> = {
  static: "Static",
  "eod-trail": "EOD trailing",
  "intraday-trail": "Intraday trailing",
  custom: "Customizable",
};

export const TRI_LABEL: Record<TriState, string> = {
  yes: "Allowed",
  restricted: "Restricted",
  no: "Not allowed",
  na: "N/A",
};

export const payoutSpeedLabel = (d: number) =>
  d <= 1 ? "On demand" : `~${d} days`;
