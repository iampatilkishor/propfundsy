# Propfundsy Monthly SEO + Content Report — Nov 1, 2026

## SEO health
- Sitemap covers all 65 firms (FIRMS.map + slugOf), zero slug collisions.
- SITE_URL = https://propfundsy-delta.vercel.app — not a placeholder (still a Vercel subdomain).
- Metadata: firm page generateMetadata unchanged; new firms DayTraders.com and Pipcy have no plans, so cheapestPlan() returns undefined — pages rely on fallback copy (not re-rendered this run, no code change).
- **Open issue:** EverFunded still has no `platforms` (guarded in FirmComparison last month). DayTraders/Pipcy have empty platforms and null country/years.
- Hardcoded numbers: none found in app/components. Internal links: all static hrefs resolve; blog slugs referenced exist.
- No code changes made.

## Reviews (8 written/refreshed)
New: DayTraders.com, Pipcy (previously null). Refreshed (were <120 words or >180): The5ers, Fintokei, Lark Funding, OspreyFX, TradersLaunch, Upcomers. All 147–157 words.
Web search returned only titles/links this run (no page text), so reviews are grounded in firms.json/plans.json only; no new outside facts added. Tradeify (200 words) still over spec — next run.

## Content opportunities
1. "[Firm] alternatives" pages (The5ers/FundedNext/FTMO alternatives) — competitors (propfirmmap) rank for these; can be generated from firms.json by category.
2. Refresh `cheapest-prop-firm-challenges-2026` with Q4/Black Friday pricing; "cheapest" queries remain heavily contested (fundedtrading, propfirmmap lead).
3. "Best $100K cheap accounts" + Black Friday prop firm deals roundup (late Nov) — time-sensitive, use promoActive field.

## Validation
`node scripts/validate-data.mjs` → ✓ 65 firms, 194 plans. Changes uncommitted.
