# Propfundsy Data Guide

This guide is for whoever maintains the firm/plan data. You never touch code — only two JSON files:

- `data/firms.json` — one entry per firm (description, payment methods, source, tags)
- `data/plans.json` — one entry per plan per account size (75 rows and growing)

## Daily workflow

1. Check each firm for changes (fastest sources first):
   - Firm's Discord / announcement channel and newsletter — changes are announced here first
   - Firm's pricing page and rules page
   - Promo banners (promos change weekly)
2. If nothing changed for a firm — done, move on.
3. If something changed, edit the matching entry in `data/plans.json` (or `data/firms.json`).
4. Open a pull request (see below). The validation robot checks your edit. When it's green, it gets merged and is live ~2 minutes later.

## How to edit (no tools needed)

1. Open the repo on github.com and navigate to `data/plans.json`
2. Click the pencil icon (Edit)
3. Make your change
4. Click "Commit changes…" → "Create a new branch… and start a pull request"
5. Done — validation runs automatically on your PR

## Field cheat-sheet (plans.json)

| Field | What it is | Allowed values |
|---|---|---|
| `firmId` | Which firm | must match an `id` in firms.json |
| `size` | Account size in dollars | number, e.g. `100000` |
| `price` | Fee in USD, numbers only | e.g. `495` (no `$`, no commas) |
| `priceLabel` | Fee as shown to users | e.g. `"$495"`, `"~€499"`, `"$109/mo"` — use `~` if estimated |
| `monthly` | Subscription fee? | `true` / `false` |
| `steps` | Evaluation model | `"1-Step"`, `"2-Step"`, `"3-Step"`, `"Instant"` |
| `splitSort` | Base split as a number | `0`–`100` |
| `ddKind` | Drawdown type | `"static"`, `"eod-trail"`, `"intraday-trail"`, `"custom"` |
| `news` / `ea` / `weekend` | Allowed on funded account? | `"yes"`, `"restricted"`, `"no"`, `"na"` (futures = `"na"` for weekend) |
| `consistency` | Consistency rule text | text, or `null` if none |
| `refund` | Fee refund terms | text, or `null` if none |
| `payoutDays` | Typical days between payouts | number, `1` = on demand |
| `verified` | Did YOU confirm this on the firm's official site? | `true` / `false` — be honest, this shows as a badge |

## Affiliate fields (firms.json)

| Field | What it is |
|---|---|
| `affiliateUrl` | Our referral link for the firm. `null` until we join their program — buttons then fall back to the official site. Must start with `https://`. |
| `discountCode` | Our promo code, shown on the buttons ("Get Funded · CODE10"). `null` if none. |

Only the site owner updates these two fields.

| `review` | Editorial "Our Take" paragraph shown on the firm's page. `null` until written. Minimum 80 characters; must be grounded in the data — no invented claims. Normally written by the monthly content agent. |

## Rules

- **Only edit files inside `data/`.** Anything else needs a developer.
- **`verified: true` only if you personally saw it on the firm's official site.** Third-party reviews = `false`.
- **Estimated prices get `~`** in the label and `verified: false`.
- Prices in `price` are USD numbers for sorting — convert EUR at current rate, keep the original currency in `priceLabel`.
- Never delete a plan a firm discontinued the same day — confirm it's gone from their site first.

## If validation fails

The robot's error message says exactly which entry and field is wrong, e.g.
`plans[12] (ftmo 1-Step Challenge $50K): price must be a positive number`.
Fix that field in your PR and it re-checks automatically.
