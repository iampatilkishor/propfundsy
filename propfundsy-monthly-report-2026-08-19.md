# Propfundsy Monthly SEO + Content Report — August 19, 2026

*Note: the last session's reports (`propfundsy-monthly-report-2026-08.md` and `-09.md`) were both dated August 1. This is a fresh run three weeks later — the dataset grew from 34 to 58 firms and 103 to 184 plans in that window. Filename uses the actual run date to avoid overwriting either prior file.*

## 1. SEO health check

**Sitemap coverage** — `app/sitemap.ts` maps every `data/firms.json` entry via `FIRMS.map()` and the shared `slugOf()` helper, plus same-category comparison pages and blog posts. Verified all 58 firms produce distinct slugs — zero collisions. No gaps.

**`SITE_URL`** — still correctly set to `https://propfundsy-delta.vercel.app` in `lib/seo.ts`, not a placeholder. No action needed. (Same caveat as last report stands: this is a Vercel-assigned domain, not a custom one — worth a 301 plan if that ever changes.)

**`generateMetadata` logic** — traced `app/firms/[slug]/page.tsx` for `lucid-trading` (2 plans), `vanta-trading` (2 plans, brand new), and `halcyon-trader-funding` (thin data). All resolve cleanly: title/description build correctly, `cheapestPlan()` falls back to `f.from` when needed, canonical URLs match the sitemap. No bugs found.

**Hardcoded numbers** — `Hero.tsx`, `JsonLd.tsx`, `PlanTable.tsx`, `layout.tsx`, and `opengraph-image.tsx` all pull counts from `FIRMS.length`/`PLANS.length` — confirmed still data-driven, nothing stale. `content/blog/choosing-prop-firm-2026.md`'s "58+ firms now competing" line already matches the current count exactly — no fix needed this run.

**Broken internal links** — none found. All static routes (`/about`, `/blog`, `/compare`, `/contact`, `/tools`, etc.) have matching `page.tsx` files. Dynamic links (firm pages, comparison pairs, tool calculators, blog posts) are all built from `slugOf()`/data/ID rather than hardcoded strings, so they can't drift.

**Thin-content flag** — 8 firms currently ship with only 2–3 tracked plans and `verified: false` across the board (Lucid Trading, AquaFunded, FunderPro, Hola Prime, TradersYard, UProfit, Halcyon Trader Funding, Vanta Trading) — these are exactly the 8 that had `review: null` and got reviews written this run (see below). Their firm pages now at least have the "Our Take" section instead of being bare rules/plans-free pages, which helps thin-content risk somewhat, but plan coverage is still shallow for most of them.

**Data growth since last report** — `data/firms.json` grew from 34 to 58 firms (+24), `data/plans.json` from 103 to 184 plans (+81). All new entries pass validation.

## 2. Editorial reviews

The `review` field is present in schema (`lib/data.ts`), UI (firm page "Our Take" section, plus `Review` JSON-LD when set), and documented in `DATA_GUIDE.md`. At the start of this run, 8 of 58 firms had `review: null` — all 8 newly added since the last report. Wrote grounded 139–168 word reviews for all 8:

- **Lucid Trading** — futures, launched 2025. Noted the Trustpilot review-count discrepancy already flagged in our own `trustNote` (~4,000 vs. 4,800–5,200+ per other trackers), plus a new development: as of August 2026 the firm stopped listing per-challenge prices upfront ("get final price at checkout"), a transparency step backward worth calling out.
- **AquaFunded** — Trustpilot has hidden the rating entirely and issued a fake-review guidelines warning, which is more serious than a low score. Noted the gap between that and AquaFunded's own claimed 9.4/10, and its $6.4M-paid/190K-user self-reported figures, framed as unverified.
- **FunderPro** — Trustpilot Consumer Warning plus a recurring "shared IP / unauthorized access" payout-denial complaint pattern, weighed against a genuinely fast ~8hr average payout claim and $21.5M paid in 2025. Noted FunderPro's own January 2026 transparency statement blaming coordinated fake-review attacks, without taking a side.
- **Hola Prime** — led with the Deloitte-audited payout review (Oct 2025–Mar 2026: 98.35% paid within an hour, zero denials) as a genuine differentiator, balanced against a more mixed Trustpilot star distribution (83% five-star / 8% one-star).
- **TradersYard** — 48-hour payout guarantee vs. trader reports of actual payouts under 4 hours; flagged the small 66-review Trustpilot sample as encouraging-but-early, and noted the July 2026 Andromeda Capital Partners funding round.
- **UProfit** — seven years operating (a real differentiator in this space) vs. a May 2026 Trustpilot fake-review removal action that undercuts the historical 4.8/5 score.
- **Halcyon Trader Funding** — genuinely trader-friendly rules (no DLL on Evaluation, 100% split on Ultra) weighed against zero confirmed Trustpilot presence and pricing sourced only from third-party sites since the firm's own JS-rendered site didn't expose a static pricing table.
- **Vanta Trading** — the newest/most unusual firm tracked (blockchain-based, Taoshi/Bittensor-built, launched 2026). Framed as an interesting concept with real transparency mechanics, but too new and thinly reviewed (13 Trustpilot reviews) to vouch for.

All 8 are grounded in `data/firms.json` + `data/plans.json` fields plus fresh web search (Trustpilot status, payout audits, funding news, complaint patterns) — no invented facts. Every conflicting-data case (Lucid's review count, AquaFunded's self-reported vs. Trustpilot-hidden rating, FunderPro's warning vs. its own rebuttal) is stated as a range or explicit disagreement rather than resolved in the firm's favor. `review: null` count is now **0 of 58** — every firm has editorial copy.

## 3. SEO content opportunities

1. **Futures-specific landing page — carried over from last report, still unbuilt.** This was flagged last time and hasn't shipped: no futures-only page or post exists in `app/` or `content/blog/`. It's now a stronger opportunity than before — the dataset has grown from 11 to **20 tracked futures firms** (Topstep, Apex, MyFundedFutures, Lucid, TradeDay, Tradeify, Take Profit Trader, Elite Trader Funding, Earn2Trade, Bulenox, Phidias, Alpha Futures, YRM Prop, UProfit, NexGen ProTrader Funding, Halcyon, Leeloo Trading, BluSky Trading Company, TradersLaunch, OneUp Trader) against continued 2026 search-volume growth in futures/crypto asset-class queries per this month's research. Recommend a "Best Futures Prop Firms 2026" page pulling directly from existing firm data — this is close to a pure content-assembly task at this point, no new data collection needed.

2. **"Fastest / same-day payout prop firms" comparison content.** 2026 industry commentary specifically calls out daily payouts as a rising trend, especially in futures, and it's a genuine trust-intent query pattern ("prop firm payout speed", "same day payout prop firm"). The site already tracks this precisely: `payoutDays` exists on every plan, and **32 plans across 15 different firms** currently offer ≤1-day payout. This is another largely data-assembly opportunity — a ranked table plus short write-up would slot naturally next to the existing `cheapest-prop-firm-challenges-2026.md` and `instant-funding-prop-firms-2026.md` posts.

3. **"Prop firms that shut down" / active-status tracker.** Trust-and-verification search intent continues to dominate 2026 prop-firm queries per this month's research — industry estimates put 80–100+ firms as having shut down or gone inactive since 2024, with an estimated $50M+ in blocked trader funds. `prop-firm-discrepancies.md` already covers rule-change risk but nothing on the site addresses "is [firm] still open" directly. A dedicated page or post listing known shutdowns with dates, plus a pointer to check a firm's current Trustpilot/status before funding, would capture this query pattern and reinforce the trust-first positioning the rest of the content already leans into. This is the one idea here that needs real research/sourcing rather than just data assembly — flagging as higher-effort than #1 and #2.

**Content shipped since last report, for context:** two of last report's three recommendations are now live — `app/compare/[firms]/page.tsx` (same-category comparison pages, previously flagged as the #1 gap) and `content/blog/prop-firm-pass-rates-2026.md` both shipped. Good execution — the futures landing page (recommendation #3 last time, #1 again this time) is the one still outstanding.

## 4. Data validation

`node scripts/validate-data.mjs` → **✓ Data valid: 58 firms, 184 plans.** Run after all review edits.

## Files changed

- `data/firms.json` — 8 new editorial reviews (Lucid Trading, AquaFunded, FunderPro, Hola Prime, TradersYard, UProfit, Halcyon Trader Funding, Vanta Trading). No other fields touched.

No component/code changes were needed this run — sitemap, metadata, and data-driven counts are all holding up correctly as the dataset has more than kept pace with growth (34→58 firms) since the last report.

These are uncommitted local changes — not pushed or PR'd, per the normal `DATA_GUIDE.md` review workflow.
