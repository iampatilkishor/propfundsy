# Propfundsy

Compare forex/CFD and futures prop trading firms and their plans side by side. Built with Next.js 15 (App Router) + TypeScript, no CSS framework.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

- `data/firms.json`, `data/plans.json` — ALL firm and plan data lives here (see `DATA_GUIDE.md`)
- `lib/data.ts` — types and helpers; imports the JSON (do not put data here)
- `scripts/validate-data.mjs` — data validation (`npm run validate:data`); also runs in CI on every PR touching `data/`
- `app/` — layout, page, global styles
- `components/` — Nav, Hero, Firms, PlanTable, ComparePanel, Why, Faq, Footer

## Updating data

Edit the JSON files (GitHub web editor is fine), open a PR, CI validates, merge → Vercel redeploys automatically. Full workflow for data maintainers: `DATA_GUIDE.md`.

Data last reviewed July 2026. Always verify pricing on each firm's official site.
