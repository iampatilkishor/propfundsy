"use client";

import { useMemo, useState } from "react";
import {
  FIRMS, PLANS, firmById, firmLink, initials, DD_LABEL,
  DISTINCT_SIZES, sizeLabelOf, costPer10k, costPer10kNum, payoutSpeedLabel,
  type Plan, type DdKind, type TriState,
} from "@/lib/data";
import Link from "next/link";
import { slugOf } from "@/lib/seo";
import ComparePanel from "@/components/ComparePanel";

type CatFilter = "all" | "forex" | "futures";
type SortKey = "firm" | "size" | "price" | "cost" | "split" | "payout" | null;

const sortValue = (p: Plan, k: Exclude<SortKey, null>): string | number => {
  switch (k) {
    case "firm": return firmById[p.firmId].name;
    case "size": return p.size;
    case "price": return p.price;
    case "cost": return costPer10kNum(p);
    case "split": return p.splitSort;
    case "payout": return p.payoutDays;
  }
};

const planKey = (p: Plan) => `${p.firmId}|${p.plan}|${p.sizeLabel}`;

const MAX_PAYOUT = Math.max(...PLANS.map((p) => p.payoutDays));
const MAX_COST = Math.ceil(Math.max(...PLANS.map((p) => costPer10kNum(p))) / 10) * 10;
const MAX_FEE = Math.ceil(Math.max(...PLANS.map((p) => p.price)) / 100) * 100;
const MIN_SPLIT = Math.min(...PLANS.map((p) => p.splitSort));

const STYLE_CHIPS = [
  { id: "instant", label: "Instant funding", test: (p: Plan) => p.steps === "Instant" },
  { id: "news", label: "News trading OK", test: (p: Plan) => p.news === "yes" },
  { id: "ea", label: "EAs / bots OK", test: (p: Plan) => p.ea === "yes" },
  { id: "weekend", label: "Weekend holding OK", test: (p: Plan) => p.weekend === "yes" },
  { id: "nocons", label: "No consistency rule", test: (p: Plan) => p.consistency === null },
  { id: "refund", label: "Refundable fee", test: (p: Plan) => p.refund !== null },
  { id: "cryptopay", label: "Crypto payouts", test: (p: Plan) => firmById[p.firmId].payoutMethods.some((m) => m.toLowerCase().includes("crypto")) },
  { id: "verified", label: "Verified data only", test: (p: Plan) => p.verified },
] as const;

export default function PlanTable() {
  const [cat, setCat] = useState<CatFilter>("all");
  const [size, setSize] = useState<number | "all">("all");
  const [firms, setFirms] = useState<Set<string>>(new Set()); // empty = all firms
  const [firmOpen, setFirmOpen] = useState(false);
  const [dd, setDd] = useState<DdKind | "all">("all");
  const [chips, setChips] = useState<Set<string>>(new Set());
  const [payoutMax, setPayoutMax] = useState<number>(MAX_PAYOUT);
  const [costMax, setCostMax] = useState<number>(MAX_COST);
  const [feeMax, setFeeMax] = useState<number>(MAX_FEE);
  const [splitMin, setSplitMin] = useState<number>(MIN_SPLIT);
  const [sortK, setSortK] = useState<SortKey>(null);
  const [sortDir, setSortDir] = useState<1 | -1>(1);
  const [selected, setSelected] = useState<Plan[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  const toggleChip = (id: string) =>
    setChips((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleSelect = (p: Plan) =>
    setSelected((prev) => {
      const k = planKey(p);
      if (prev.some((x) => planKey(x) === k)) return prev.filter((x) => planKey(x) !== k);
      if (prev.length >= 3) return prev;
      return [...prev, p];
    });

  const rows = useMemo(() => {
    let r = PLANS.filter(
      (p) =>
        (cat === "all" || p.cat === cat) &&
        (size === "all" || p.size === size) &&
        (firms.size === 0 || firms.has(p.firmId)) &&
        (dd === "all" || p.ddKind === dd) &&
        p.payoutDays <= payoutMax &&
        costPer10kNum(p) <= costMax &&
        p.price <= feeMax &&
        p.splitSort >= splitMin &&
        STYLE_CHIPS.every((c) => !chips.has(c.id) || c.test(p)),
    );
    if (sortK) {
      r = [...r].sort((a, b) => {
        const va = sortValue(a, sortK);
        const vb = sortValue(b, sortK);
        const c = typeof va === "number" && typeof vb === "number"
          ? va - vb
          : String(va).localeCompare(String(vb));
        return c * sortDir;
      });
    }
    return r;
  }, [cat, size, firms, dd, chips, payoutMax, costMax, feeMax, splitMin, sortK, sortDir]);

  const toggleFirm = (id: string) =>
    setFirms((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const onSort = (k: Exclude<SortKey, null>) => {
    if (sortK === k) setSortDir((d) => (d === 1 ? -1 : 1));
    else { setSortK(k); setSortDir(1); }
  };

  const Th = ({ k, title, children }: { k?: Exclude<SortKey, null>; title?: string; children: React.ReactNode }) => (
    <th className={k ? "sortable" : ""} onClick={k ? () => onSort(k) : undefined} title={title}>
      {children}
      {k && <span className="arrow">{sortK === k ? (sortDir === 1 ? "↑" : "↓") : "↕"}</span>}
    </th>
  );

  return (
    <section id="plans">
      <div className="sec-label">Plan Comparison</div>
      <h2>Every plan, one table</h2>
      <p className="sec-sub">
        Pick an exact account size to line firms up against each other. Sort by fee, cost per $10K
        of buying power, profit split, or payout speed. Tick up to three plans for a head-to-head.
      </p>

      <div className="controls">
        <div className="seg">
          {(["all", "forex", "futures"] as CatFilter[]).map((c) => (
            <button key={c} className={cat === c ? "active" : ""} onClick={() => setCat(c)}>
              {c === "all" ? "All" : c === "forex" ? "Forex / CFD" : "Futures"}
            </button>
          ))}
        </div>
        <div className="filters">
          <select
            value={size === "all" ? "all" : String(size)}
            onChange={(e) => setSize(e.target.value === "all" ? "all" : Number(e.target.value))}
          >
            <option value="all">All account sizes</option>
            {DISTINCT_SIZES.map((s) => (
              <option key={s} value={s}>{sizeLabelOf(s)} accounts</option>
            ))}
          </select>
          <div className="multi-select">
            <button
              type="button"
              className={`multi-btn${firms.size > 0 ? " on" : ""}`}
              onClick={() => setFirmOpen((o) => !o)}
            >
              {firms.size === 0
                ? "All firms"
                : firms.size === 1
                  ? firmById[[...firms][0]].name
                  : `${firms.size} firms selected`}
              <span className="caret">{firmOpen ? "▴" : "▾"}</span>
            </button>
            {firmOpen && (
              <>
                <div className="multi-backdrop" onClick={() => setFirmOpen(false)} />
                <div className="multi-pop">
                  {FIRMS.map((f) => (
                    <label key={f.id} className="multi-opt">
                      <input
                        type="checkbox"
                        checked={firms.has(f.id)}
                        onChange={() => toggleFirm(f.id)}
                      />
                      <span
                        className="multi-dot"
                        style={{ background: f.color }}
                      />
                      {f.name}
                      <span className="multi-cat">{f.cat === "forex" ? "FX" : "FUT"}</span>
                    </label>
                  ))}
                  <button className="multi-clear" onClick={() => setFirms(new Set())}>
                    Clear — show all firms
                  </button>
                </div>
              </>
            )}
          </div>
          <select value={dd} onChange={(e) => setDd(e.target.value as DdKind | "all")}>
            <option value="all">Any drawdown type</option>
            <option value="static">Static</option>
            <option value="eod-trail">EOD trailing</option>
            <option value="intraday-trail">Intraday trailing</option>
            <option value="custom">Customizable</option>
          </select>
        </div>
      </div>

      <div className="chip-row">
        {STYLE_CHIPS.map((c) => (
          <button
            key={c.id}
            className={`chip${chips.has(c.id) ? " on" : ""}`}
            onClick={() => toggleChip(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="range-row">
        <div className={`payout-range${payoutMax < MAX_PAYOUT ? " on" : ""}`}>
          <label htmlFor="payoutMax">
            Payout cycle: {payoutMax >= MAX_PAYOUT ? "any" : payoutMax <= 1 ? "on demand only" : `0–${payoutMax} days`}
          </label>
          <input
            id="payoutMax"
            type="range"
            min={1}
            max={MAX_PAYOUT}
            step={1}
            value={payoutMax}
            onChange={(e) => setPayoutMax(Number(e.target.value))}
          />
        </div>
        <div className={`payout-range${feeMax < MAX_FEE ? " on" : ""}`}>
          <label htmlFor="feeMax">
            Fee: {feeMax >= MAX_FEE ? "any" : `≤ $${feeMax}`}
          </label>
          <input
            id="feeMax"
            type="range"
            min={25}
            max={MAX_FEE}
            step={25}
            value={feeMax}
            onChange={(e) => setFeeMax(Number(e.target.value))}
          />
        </div>
        <div className={`payout-range${costMax < MAX_COST ? " on" : ""}`}>
          <label htmlFor="costMax">
            Cost/$10K: {costMax >= MAX_COST ? "any" : `≤ $${costMax}`}
          </label>
          <input
            id="costMax"
            type="range"
            min={10}
            max={MAX_COST}
            step={5}
            value={costMax}
            onChange={(e) => setCostMax(Number(e.target.value))}
          />
        </div>
        <div className={`payout-range${splitMin > MIN_SPLIT ? " on" : ""}`}>
          <label htmlFor="splitMin">
            Profit split: {splitMin <= MIN_SPLIT ? "any" : `≥ ${splitMin}%`}
          </label>
          <input
            id="splitMin"
            type="range"
            min={MIN_SPLIT}
            max={100}
            step={5}
            value={splitMin}
            onChange={(e) => setSplitMin(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <caption className="sr-only">
            Prop firm plan comparison: fees, profit splits, drawdown rules, payout speed and trading-style rules for {PLANS.length} plans across {FIRMS.length} firms
          </caption>
          <thead>
            <tr>
              <Th>Cmp</Th>
              <Th k="firm">Firm / Plan</Th>
              <Th k="size">Account</Th>
              <Th k="price">Fee</Th>
              <Th k="cost" title="Fee per $10,000 of buying power — normalizes cost across account sizes">Cost/$10K</Th>
              <Th k="split">Split</Th>
              <Th k="payout" title="Typical days between payouts (or to first payout)">Payout</Th>
              <Th>Drawdown</Th>
              <Th>Consistency</Th>
              <Th title="News trading / EAs / Weekend holding on funded accounts">Style</Th>
              <Th>Data</Th>
              <Th />
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => {
              const f = firmById[p.firmId];
              const isSel = selected.some((x) => planKey(x) === planKey(p));
              return (
                <tr key={planKey(p)} className={isSel ? "sel" : ""}>
                  <td>
                    <input
                      type="checkbox"
                      checked={isSel}
                      disabled={!isSel && selected.length >= 3}
                      onChange={() => toggleSelect(p)}
                      aria-label={`Compare ${f.name} ${p.plan} ${p.sizeLabel}`}
                    />
                  </td>
                  <td>
                    <div className="t-firm">
                      <div
                        className="t-logo"
                        style={{ background: `linear-gradient(135deg, ${f.color}, ${f.color}99)` }}
                      >
                        {initials(f.name)}
                      </div>
                      <div>
                        <Link className="t-firm-link" href={`/firms/${slugOf(f)}`}>{f.name}</Link>
                        <span className="t-plan">
                          {p.plan}{p.steps === "Instant" ? " ⚡" : ""}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td><b>{p.sizeLabel}</b></td>
                  <td><span className="pill price">{p.priceLabel}</span></td>
                  <td>{costPer10k(p)}</td>
                  <td><span className="pill split">{p.splitLabel}</span></td>
                  <td title={p.payout}>{payoutSpeedLabel(p.payoutDays)}</td>
                  <td>{p.dd} <span className="dim">· {DD_LABEL[p.ddKind]}</span></td>
                  <td>{p.consistency ?? <span className="ok">None</span>}</td>
                  <td><StyleIcons p={p} /></td>
                  <td>
                    {p.verified
                      ? <span className="badge v" title={f.source}>Verified</span>
                      : <span className="badge u" title={f.source}>Reviews</span>}
                  </td>
                  <td>
                    <a
                      className="get-btn"
                      href={firmLink(f)}
                      target="_blank"
                      rel="sponsored nofollow noopener"
                      title={f.discountCode ? `Code ${f.discountCode} at checkout` : `Open ${f.name}`}
                    >
                      Get{f.discountCode ? ` · ${f.discountCode}` : ""} →
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="count-note">Showing {rows.length} of {PLANS.length} plans.</div>

      <div className="legend">
        <div className="legend-group">
          <div className="legend-title">Style column — what&apos;s allowed on the funded account</div>
          <div className="legend-items">
            <span className="legend-item"><span className="si ok">News</span> News trading</span>
            <span className="legend-item"><span className="si ok">EA</span> EAs / bots</span>
            <span className="legend-item"><span className="si ok">Wknd</span> Weekend holding</span>
          </div>
          <div className="legend-items">
            <span className="legend-item"><span className="si ok">✓</span> Allowed</span>
            <span className="legend-item"><span className="si warn">!</span> Restricted / conditions apply</span>
            <span className="legend-item"><span className="si bad">✕</span> Not allowed</span>
            <span className="legend-item"><span className="si dim">–</span> Not applicable (futures)</span>
          </div>
        </div>
        <div className="legend-group">
          <div className="legend-title">Data quality</div>
          <div className="legend-items">
            <span className="legend-item"><span className="badge v">Verified</span> Confirmed on the firm&apos;s official site (Jul 2026)</span>
            <span className="legend-item"><span className="badge u">Reviews</span> Third-party sourced — confirm before buying</span>
            <span className="legend-item"><b>~</b>&nbsp; Price estimated / interpolated</span>
          </div>
        </div>
        <div className="legend-group">
          <div className="legend-title">Columns</div>
          <div className="legend-items">
            <span className="legend-item"><b>Cost/$10K</b>&nbsp; Fee per $10,000 of account size — compares value across sizes</span>
            <span className="legend-item"><b>Payout</b>&nbsp; Typical days between payouts (hover for full terms)</span>
          </div>
        </div>
      </div>

      {selected.length > 0 && (
        <div className="compare-bar">
          <span>
            {selected.length}/3 selected
            {selected.length < 2 ? " — pick at least 2 to compare" : ""}
          </span>
          <div className="compare-bar-actions">
            <button className="btn btn-ghost" onClick={() => setSelected([])}>Clear</button>
            <button
              className="btn btn-gold"
              disabled={selected.length < 2}
              onClick={() => setShowCompare(true)}
            >
              Compare {selected.length} plans
            </button>
          </div>
        </div>
      )}

      {showCompare && selected.length >= 2 && (
        <ComparePanel plans={selected} onClose={() => setShowCompare(false)} />
      )}
    </section>
  );
}

function StyleIcons({ p }: { p: Plan }) {
  const cls = (v: TriState) =>
    v === "yes" ? "si ok" : v === "restricted" ? "si warn" : v === "no" ? "si bad" : "si dim";
  return (
    <span className="style-icons">
      <span className={cls(p.news)} title={`News trading: ${p.news}`}>News</span>
      <span className={cls(p.ea)} title={`EAs / automation: ${p.ea}`}>EA</span>
      <span className={cls(p.weekend)} title={`Weekend holding: ${p.weekend}`}>Wknd</span>
    </span>
  );
}
