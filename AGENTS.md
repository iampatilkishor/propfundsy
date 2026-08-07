# Propfundsy Data Maintenance Agents

Automated agents that keep propfundsy.com data fresh. Each agent runs on a schedule and checks for changes across all prop firms.

## Daily Agent (runs every 24 hours)

**Task:** Quick scan for promo code changes and critical pricing updates

**What it does:**
1. Visits each firm's homepage looking for active promo banners
2. Records the current discount code status in `promoActive` field
3. Flags any dramatic price changes (>20% on a single account size)
4. Checks Discord/Twitter for major announcements
5. Creates a GitHub PR with any updates (or notes "no changes" in run log)

**Checks:**
- Active promo codes (displayed on firm homepages)
- Evaluation fee prices (compare to last known price)
- New/discontinued account sizes
- Emergency announcements (account closures, regulatory issues, payouts paused)

**Does NOT check:**
- Drawdown rules or consistency rules (weekly job)
- Full plan details (weekly job)

**Output:**
- Updates `promoActive` in `data/firms.json` for any code changes
- Creates PR if changes detected
- Logs "All promo codes verified — no changes" if clean

## Weekly Agent (runs every Monday)

**Task:** In-depth verification of all pricing, rules, and plan details

**What it does:**
1. Visits each firm's pricing page and rules documentation
2. Verifies all plan prices against current offerings
3. Checks for rule changes (drawdown types, daily loss limits, consistency rules)
4. Updates `payoutDays` and payout terms
5. Creates comprehensive PR with detailed change notes

**Checks:**
- All plan prices for each account size
- Drawdown types and values
- Daily loss limits
- Consistency rules
- Payout cycle and speed
- News/EA/weekend trading rules
- Refund policies

**Does NOT check:**
- Firm descriptions or tags (monthly job)
- Editorial reviews (content team)

**Output:**
- Updates `data/plans.json` with all verified pricing/rules
- Marks `verified: true` only if data comes directly from firm's official site
- Creates detailed PR comment explaining each change

## Monthly Agent (runs first of month)

**Task:** Deep research on firm profiles, tags, and editorial content

**What it does:**
1. Reviews each firm's website for description accuracy
2. Checks Trustpilot ratings and update review counts
3. Verifies firm colors and logos
4. Updates pricing labels (e.g., "from $79" → "from $89")
5. Adds new tag keywords reflecting current positioning
6. Generates content summary for editorial review team

**Checks:**
- Firm descriptions and value propositions
- Current payment methods accepted
- Payout methods available
- Scaling policies (max account size after growth)
- Trustpilot ratings and review counts
- Logo/color consistency

**Does NOT check:**
- Individual plan pricing (weekly job)
- Promo codes (daily job)

**Output:**
- Updates firm records with fresh descriptions and tags
- Flags firms with outdated reviews or policy changes
- Creates PR with month-end summary

## Running agents manually

```bash
# Daily check (promo codes)
npm run agent:daily

# Weekly check (all pricing/rules)
npm run agent:weekly

# Monthly check (firm descriptions)
npm run agent:monthly
```

## Emergency protocol

If a firm announces:
- Account closures / regulatory action
- Payouts paused or suspended
- Major rule change affecting all traders
- Website down or inaccessible

**Trigger an emergency run immediately:**
```bash
npm run agent:emergency -- --firm=ftmo
```

This creates a high-priority PR with a ⚠️ warning tag and pings the team.

## Success criteria

- **Daily:** <5 min runtime, 0 API errors, PR auto-merges if all checks pass
- **Weekly:** <15 min runtime, catches 95%+ of real price changes, no false positives
- **Monthly:** <30 min runtime, firm descriptions stay current, tags reflect market positioning

## How agents edit files

Agents only edit JSON files in `data/`. They:
1. Read current file
2. Compare against live firm sites
3. Make surgical edits only (no bulk rewrites)
4. Run validation via `scripts/validate-data.mjs`
5. Create commit + PR automatically

Agents **never**:
- Delete plans without confirming discontinuation
- Change `verified: true` to `false` without logging why
- Edit fields outside of `data/`
- Touch code files

## Viewing past runs

Check `.github/workflows/agents.yml` for run logs and failed checks:
```bash
git log --grep="agent" --oneline
```

Or browse the "Actions" tab on GitHub for detailed run history.
