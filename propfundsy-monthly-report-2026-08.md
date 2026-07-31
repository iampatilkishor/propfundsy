# Propfundsy Monthly SEO + Content Report — August 1, 2026

## 1. SEO health check

**Sitemap coverage** — `app/sitemap.ts` maps every entry in `data/firms.json` via `FIRMS.map()` and the shared `slugOf()` helper, the same helper used by `generateStaticParams()` and `firmBySlug()`. Verified no slug collisions across all 28 firms. No gaps.

**`SITE_URL` placeholder** — `lib/seo.ts` still has `SITE_URL = "https://propfundsy.com"` with an explicit `// TODO: set real domain before launch` comment. A web search turned up no indexed site at that domain, so this is still a placeholder, not a live production URL. **Action needed from you**: set the real domain before launch, since `metadataBase`, canonical URLs, OG tags, JSON-LD, and `robots.ts`'s sitemap URL all key off it.

**`generateMetadata` logic** — Traced through `ftmo`, `goat`, `instantfunding`, and `fxify`. All resolve correctly: title/description build cleanly, the `cheapestPlan()` fallback to `f.from` works for firms with no tracked plans, and canonical URLs match the sitemap. No bugs found.

**Hardcoded numbers (fixed)** — `app/layout.tsx`'s meta description and OG/Twitter descriptions had hardcoded "22+ prop firms, 85+ plans," which had drifted from the real counts (28 firms, 98 plans, and growing). Changed to compute from `FIRMS.length` / `PLANS.length` so it never goes stale again. Also had `robots.ts` hardcoding its own copy of the domain string separately from `lib/seo.ts` — switched it to import `SITE_URL` so there's one source of truth instead of three. (Hero.tsx and JsonLd.tsx were already data-driven — no changes needed there.)

**Broken internal links** — None found. All in-page anchors (`/#firms`, `/#plans`, `/#faq`, `/#why`) have matching `id` attributes in their target components, and all firm links use the shared `slugOf()` function consistently.

**Thin-content flag (not fixed, needs data)** — 4 firms have zero tracked plans in `data/plans.json`: **FTUK, City Traders Imperium, Blue Guardian, ThinkCapital**. Their pages skip the Rules and Plans sections entirely, leaving a noticeably thinner page than firms with plan data. Worth prioritizing plan data collection for these four next.

**Data integrity note** — Mid-session, `data/firms.json` changed on disk (a "TRUST WARNING" tag and updated description appeared on the Alpha Futures entry, presumably from a maintainer PR merging per the normal `DATA_GUIDE.md` workflow). I independently verified the claim via multiple outlets (FinanceMagnates, TradingView News, TradeInformer, Prop Firm Match) before treating it as fact: Alpha Futures discontinued its Premium plan and lost its NinjaTrader/Tradovate integration on July 12, 2026, with disputes over whether pending payouts were honored. Confirmed real, not spurious — see the review written for it below.

## 2. Editorial reviews

The `review` field exists in both the schema (`lib/data.ts`) and the UI (firm page renders an "Our Take" section when `f.review` is set), so this ran as normal. 25 of 28 firms had `review: null` at the start of this run. Wrote grounded 120–180 word reviews for **8 firms**, prioritizing the largest/most-searched names still missing a take, plus one urgent swap:

- **FundedNext**, **Funding Pips**, **E8 Markets**, **Apex Trader Funding**, **MyFundedFutures**, **TradeDay**, **Goat Funded Trader** — picked for search volume/traffic potential.
- **Alpha Futures** — swapped in ahead of a lower-urgency pick (FXIFY) because of the Premium-plan/payout situation above; traders researching this firm right now need the warning more than a routine review of a stable firm.

Each review is grounded in `data/firms.json` + `data/plans.json` fields (pricing, splits, drawdown, payout terms) plus verified web search facts (Trustpilot ratings, founding dates, payout totals) — nothing invented. Goat Funded Trader's review deliberately avoids citing a specific Trustpilot number since sources conflict (4.0 vs 2.6 stars, with Trustpilot flagging removed fake reviews) and instead flags the inconsistency directly.

FXIFY remains the top pick for next month's rotation (17 firms still have `review: null`).

## 3. SEO content opportunities

1. **"Cheapest prop firm" landing page.** High commercial-intent query with dozens of listicle competitors, most citing rough/rounded prices. Propfundsy already has real per-plan pricing data (Maven from $15, Goat from $22, Funding Pips 2-Step from ~$36) and a sortable cost-per-$10K comparison table — a dedicated, data-backed "Cheapest Prop Firms" page could out-rank thin listicles by showing exact, current numbers instead of estimates.

2. **"[Firm] vs [Firm]" comparison pages.** This is the single most repeated query pattern across search results for the firms reviewed this run — FTMO vs FundedNext, FTMO vs Funding Pips, FundedNext vs Funding Pips all have dedicated competitor content. Propfundsy has the `ComparePanel` component but no static, indexable comparison URLs. Recommend building `/compare/[firm-a]-vs-[firm-b]` pages for the top 5–6 most-searched pairings, pulling straight from existing plan data.

3. **"Instant funding" / "no challenge" firms page.** Multiple 2026 articles are actively ranking for "best instant funding prop firms" as its own category, separate from the general comparison. Propfundsy's plan data already tags `steps: "Instant"` across ~9 firms (T5, Funding Pips Zero, E8, Goat, FTUK, CTI, ThinkCapital Bolt, FTP, Instant Funding) — a filtered landing page surfacing just these would be a near-zero-effort addition on top of existing data.

## 4. Data validation

`node scripts/validate-data.mjs` → **✓ Data valid: 28 firms, 98 plans.** Run after all review edits.

## Files changed

- `data/firms.json` — 8 new editorial reviews
- `app/layout.tsx` — meta description/OG/Twitter descriptions now data-driven instead of hardcoded counts
- `app/robots.ts` — now imports `SITE_URL` from `lib/seo.ts` instead of a duplicated hardcoded string

These are uncommitted local changes — not pushed or PR'd, per the normal `DATA_GUIDE.md` review workflow.
