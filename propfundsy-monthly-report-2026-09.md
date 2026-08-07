# Propfundsy Monthly SEO + Content Report — August 1, 2026 (run 2)

*Note: A report dated 2026-08-01 already existed at the start of this run (`propfundsy-monthly-report-2026-08.md`) — this appears to be a second monthly session run the same day, likely because the dataset grew from 28 to 34 firms between runs. This report picks up from that prior state rather than duplicating it. Filename bumped to `-09` to avoid overwriting the existing file; rename as you see fit.*

## 1. SEO health check

**Sitemap coverage** — `app/sitemap.ts` still maps every `data/firms.json` entry via `FIRMS.map()` and the shared `slugOf()` helper. Verified all 34 firms produce distinct slugs (checked programmatically — zero collisions). No gaps.

**`SITE_URL` placeholder — resolved.** Since the last report, `lib/seo.ts` was updated from the `https://propfundsy.com` placeholder to `https://propfundsy-delta.vercel.app`, with the `// TODO` comment removed. This is a real, working deployment URL rather than a stub, so `metadataBase`, canonical URLs, OG tags, JSON-LD and `robots.ts` all now resolve to a live origin. One caveat worth flagging: this is still a Vercel-assigned preview/default domain, not a custom domain — if a custom domain is the eventual plan, every one of those integrations will need to be repointed once it's live (and old preview-domain backlinks/indexing will need a 301 migration).

**`generateMetadata` logic** — Traced through `ftmo`, `fxify`, `alpha-capital-group`, and `lucid-trading` (a firm with zero tracked plans). All resolve correctly: title/description build cleanly, `cheapestPlan()` falls back to `f.from` for firms without plan data, and canonical URLs match the sitemap. No bugs found.

**Hardcoded numbers** — Components (`Hero.tsx`, `JsonLd.tsx`, `PlanTable.tsx`) are all still data-driven off `FIRMS.length`/`PLANS.length`, as fixed last run. Found and fixed one drifted number outside the component layer: `content/blog/choosing-prop-firm-2026.md` opened with "With 28+ firms now competing," which was accurate when written but is now stale at 34 firms. Updated to "34+ firms."

**Broken internal links** — None found. All anchor links (`/#firms`, `/#plans`, `/#faq`, `/#why`) have matching component `id`s, and all firm links across `Firms.tsx`, `PlanTable.tsx`, and blog posts use `slugOf()`/known slugs consistently. Blog post links to `/firms/maven-trading`, `/firms/bulenox`, `/firms/the5ers`, `/firms/funding-pips` were spot-checked against `slugOf()` output — all resolve.

**Thin-content flag (unchanged/grown, needs data)** — 8 firms now have zero tracked plans in `data/plans.json`, up from 4 last run: **FTUK, City Traders Imperium, Blue Guardian, ThinkCapital** (unresolved since last month) plus four newcomers added to `firms.json` since then — **Lucid Trading, AquaFunded, DNA Funded, FunderPro**. Their firm pages skip the Rules and Plans sections entirely. Worth prioritizing plan data for these eight, especially the four new ones before their pages age further without pricing detail.

**Data growth since last report** — `data/firms.json` grew from 28 to 34 firms (7 additions: Smart Prop Trader, BrightFunded, Lucid Trading, AquaFunded, DNA Funded, FunderPro, Finotive Funding), and `data/plans.json` grew from 98 to 103 plans. All new entries pass validation.

## 2. Editorial reviews

The `review` field is present in schema (`lib/data.ts`), UI (firm page "Our Take" section), and documented in `DATA_GUIDE.md`. 23 of 34 firms had `review: null` at the start of this run. Wrote grounded 149–175 word reviews for **8 firms**, prioritizing search volume/brand recognition among the still-missing names, per the same approach as last run:

- **FXIFY** — explicitly flagged as next month's top pick in the prior report; written first.
- **Alpha Capital Group**, **Maven Trading**, **Tradeify**, **Take Profit Trader**, **Lux Trading Firm**, **Funded Trading Plus**, **Instant Funding** — picked for established brand recognition and search volume over the seven brand-new, less-verified additions (Smart Prop Trader, BrightFunded, Lucid Trading, AquaFunded, DNA Funded, FunderPro, Finotive Funding), which mostly still carry "prices being verified" tags and would make for thinner, more hedged reviews. Recommend those for next month once their plan data firms up.

Each review is grounded in `data/firms.json` + `data/plans.json` fields (pricing, splits, drawdown, payout terms) plus verified web search facts (Trustpilot ratings, founding dates/founders, payout totals) — nothing invented. Two firms needed explicit handling of conflicting source data, following the same pattern used for Goat Funded Trader last month:
- **Lux Trading Firm** — our dataset says "founded 2020," a web search says "founded January 2021" by Petra Pirova; the review states "launched in 2020–2021 (sources vary)" rather than asserting either date as fact.
- **Instant Funding** — Trustpilot ratings for this firm vary wildly by source (3.1 vs. 4.5–4.6), and multiple sources describe payout-denial complaints including one reported $21,000+ withheld payout. The review states the range explicitly and recommends reading recent reviews rather than trusting one aggregate score, rather than picking a favorable number.

15 firms still have `review: null` after this run: Alpha Capital Group and Maven Trading's near-neighbors FTUK, City Traders Imperium, Blue Guardian, ThinkCapital, Elite Trader Funding, Earn2Trade, Bulenox, Phidias, Smart Prop Trader, BrightFunded, Lucid Trading, AquaFunded, DNA Funded, FunderPro, Finotive Funding. Recommend prioritizing the seven newest additions next month once their plan pricing is verified (currently thin), or Elite Trader Funding/Bulenox/Phidias (established futures/forex budget names with full plan data already tracked) if verification is still pending.

## 3. SEO content opportunities

1. **"[Firm] vs [Firm]" comparison pages — still unbuilt, still the top recommendation.** This was the #2 recommendation last month and hasn't shipped: no `/compare/[a]-vs-[b]` static routes exist yet (checked `app/` — no compare directory), even though the `ComparePanel` component already exists and firm-vs-firm queries (FTMO vs FundedNext, FTMO vs Funding Pips, etc.) remain, per this month's research, one of the most repeated query patterns in the space. Carrying this forward as the top pick since two of the three other Q3 recommendations already shipped as blog posts (see below) — this is the one gap left.

2. **"Prop firm pass rates" content.** Current search data shows a pronounced 2026 shift toward trust/verification-intent queries — "prop firm payout proof," pass-rate comparisons, and firms that quietly shut down in the 2024–2025 shakeout (est. 80–100 firms disappeared). Apex Trader Funding, notably, now publishes its own pass-rate numbers (15–20% first-attempt, ~40% with resets vs. an ~5–10% industry baseline) — a citable, dated stat Propfundsy could anchor a "Prop Firm Pass Rates: What the Data Actually Shows" piece around, extending the existing `choosing-prop-firm-2026.md` post's point that pass rates are the "missing metric" most firms don't publish.

3. **Futures-specific landing page.** Search interest has shifted toward futures-related queries, now leading over forex per multiple 2026 industry sources — a reversal from the earlier balance. Propfundsy's dataset actually skews forex-heavy in both firm count and content (the instant-funding and cheapest-challenge blog posts both lean forex-example-heavy), and none of the site's three existing blog posts are futures-specific. A "Best Futures Prop Firms 2026" page pulling from the 11 futures firms already tracked (Topstep, Apex, MyFundedFutures, TradeDay, Tradeify, Take Profit Trader, Elite Trader Funding, Earn2Trade, Bulenox, Phidias, Alpha Futures, Lucid Trading) would fill a real content gap against current query demand.

**Content shipped since last report, for context:** two of last month's three recommendations are now live — `content/blog/cheapest-prop-firm-challenges-2026.md` and `content/blog/instant-funding-prop-firms-2026.md` both exist and match last month's exact recommendations. A third post, `choosing-prop-firm-2026.md`, and an unrelated trust-focused post, `prop-firm-discrepancies.md`, also shipped. Good execution on the content side — the comparison-pages gap above is the one holdover.

## 4. Data validation

`node scripts/validate-data.mjs` → **✓ Data valid: 34 firms, 103 plans.** Run after all review edits and the blog content fix.

## Files changed

- `data/firms.json` — 8 new editorial reviews (FXIFY, Alpha Capital Group, Maven Trading, Tradeify, Take Profit Trader, Lux Trading Firm, Funded Trading Plus, Instant Funding)
- `content/blog/choosing-prop-firm-2026.md` — corrected stale "28+ firms" to "34+ firms"

No component/code changes were needed this run — the fixes from last month (data-driven counts in `layout.tsx`/`robots.ts`) are holding up correctly as the dataset has grown.

These are uncommitted local changes — not pushed or PR'd, per the normal `DATA_GUIDE.md` review workflow.
