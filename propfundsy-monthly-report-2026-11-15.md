# Propfundsy SEO + Content Report — Nov 15, 2026

## SEO health
- Sitemap: covers all 74 firms (FIRMS.map + slugOf), no slug collisions. 5 new firms since Nov 1 (For Traders, Atlas Funded, Purdia Capital, Funded Futures Network, Fundora) are included automatically.
- SITE_URL = https://propfundsy-delta.vercel.app — not the placeholder, but still a Vercel subdomain. Move to a custom domain before any link-building.
- **Fixed — firm meta descriptions leaked "TBD"/"—"**: 10 firms (DayTraders, Pipcy, Top One Futures, Swiss FirmUp, Legends, Shark Futures, FTUK, CTI, Blue Guardian, ThinkCapital) produced snippets like "plans from TBD, TBD split". generateMetadata in app/firms/[slug]/page.tsx now only includes price/split/size when they contain a real number.
- **Fixed — compare duplicate URLs**: 10 of 20 "Popular Comparisons" links pointed at reversed pairs (e.g. apex-vs-topstep) that aren't in the sitemap and self-canonicalised = duplicate content. Links now always use FIRMS order, and compare pages canonicalise reversed URLs to the sitemap order.
- **Fixed — cross-category popular comparisons**: 9 forex-vs-futures pairs (e.g. Apex vs FTMO) swapped for same-category pairs. Compare keywords no longer say "forex" on futures pages.
- **Fixed — hardcoded counts**: About page "45+ firms" → `{FIRMS.length}+`; blog choosing-prop-firm-2026 "63+" → "65+".
- Broken internal links: none. All static hrefs, tool ids and blog /firms/ links resolve.
- tsc --noEmit passes. (Code fixes were already picked up in commit 3924f1c.)
- Still open: EverFunded has no `platforms`; DayTraders/Pipcy missing platforms/country/years. Compare-page meta still shows "TBD vs 90%" splits for TBD firms (minor).

## Reviews (7 written/refreshed, all 139–152 words)
Tradeify (was 200, + Slay Markets brokerage, May 2026), BrightFunded (was 190), Velotrade (184), Equity Edge (182), Swiss FirmUp (was 117, + Classic/Pro pricing, daily payouts via Rise), E8 Markets (+ Signature forex retired Oct 20 2026, 4-payout cap), TradeDay (+ TradeDay 2.0: Quick Pay / Fast Pass / Funded Live, 90% split).
Alpha Capital Group skipped: no new verifiable info found. Uncommitted: data/firms.json.

**Data follow-ups:** TradeDay plans.json still pre-2.0 (80–95% tiers; official blog now says 90%). E8 Signature-forex tag is now corroborated (thegodfunded, Oct 17) — can drop "unconfirmed".

## Content opportunities
1. **Black Friday prop firm deals 2026** (publish by ~Nov 20). pipback and propfirmmap already have deal pages. Build from promoActive/discountCode; it's time-sensitive and you have the data.
2. **Refresh "cheapest prop firm challenges 2026"** (last touched Jul 31). propfirmmap's "10 cheapest… from $10.34" ranks; add activation-fee-inclusive "true cost" column (Swiss FirmUp Classic vs Pro is a good example).
3. **"Prop firm rule changes Nov 2026" tracker** (E8 Signature retirement, E8 payout cap, TradeDay 2.0). Changelog-style posts earn recurring search + links; you're already collecting this in tags.

## Validation
`node scripts/validate-data.mjs` → ✓ 74 firms, 209 plans.
