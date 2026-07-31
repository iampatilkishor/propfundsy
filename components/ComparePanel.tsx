"use client";

import { firmById, firmLink, initials, DD_LABEL, TRI_LABEL, costPer10k, payoutSpeedLabel, type Plan } from "@/lib/data";

interface Row {
  label: string;
  value: (p: Plan) => string;
  good?: (p: Plan) => boolean; // highlight as favorable
}

const ROWS: Row[] = [
  { label: "Market", value: (p) => (p.cat === "forex" ? "Forex / CFD" : "Futures") },
  { label: "Account size", value: (p) => p.sizeLabel },
  { label: "Fee", value: (p) => p.priceLabel },
  { label: "Cost per $10K", value: (p) => costPer10k(p) },
  { label: "Model", value: (p) => p.steps, good: (p) => p.steps === "Instant" },
  { label: "Profit split", value: (p) => p.splitLabel },
  { label: "Profit target", value: (p) => p.target },
  { label: "Max drawdown", value: (p) => `${p.dd} (${DD_LABEL[p.ddKind]})` },
  { label: "Daily loss limit", value: (p) => p.dailyLoss },
  { label: "News trading", value: (p) => TRI_LABEL[p.news], good: (p) => p.news === "yes" },
  { label: "EAs / automation", value: (p) => TRI_LABEL[p.ea], good: (p) => p.ea === "yes" },
  { label: "Weekend holding", value: (p) => TRI_LABEL[p.weekend], good: (p) => p.weekend === "yes" },
  { label: "Consistency rule", value: (p) => p.consistency ?? "None", good: (p) => p.consistency === null },
  { label: "Fee refund", value: (p) => p.refund ?? "No", good: (p) => p.refund !== null },
  { label: "Payout speed", value: (p) => payoutSpeedLabel(p.payoutDays), good: (p) => p.payoutDays <= 7 },
  { label: "Payout terms", value: (p) => p.payout },
  { label: "Pay fee with", value: (p) => firmById[p.firmId].payMethods.join(", ") },
  { label: "Payouts via", value: (p) => firmById[p.firmId].payoutMethods.join(", ") },
  { label: "Data status", value: (p) => (p.verified ? "Verified (official site)" : "Third-party reviews"), good: (p) => p.verified },
];

export default function ComparePanel({ plans, onClose }: { plans: Plan[]; onClose: () => void }) {
  return (
    <div className="cmp-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="cmp-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cmp-head">
          <h3>Head-to-head</h3>
          <button className="cmp-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="cmp-scroll">
          <table className="cmp-table">
            <thead>
              <tr>
                <th />
                {plans.map((p) => {
                  const f = firmById[p.firmId];
                  return (
                    <th key={`${p.firmId}-${p.plan}-${p.sizeLabel}`}>
                      <div className="cmp-firm">
                        <div
                          className="t-logo"
                          style={{ background: `linear-gradient(135deg, ${f.color}, ${f.color}99)` }}
                        >
                          {initials(f.name)}
                        </div>
                        <div>
                          <div className="cmp-name">{f.name}</div>
                          <div className="cmp-plan">{p.plan} · {p.sizeLabel}</div>
                        </div>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => {
                const values = plans.map((p) => row.value(p));
                const differs = new Set(values).size > 1;
                return (
                  <tr key={row.label} className={differs ? "diff" : ""}>
                    <td className="cmp-label">{row.label}</td>
                    {plans.map((p, i) => (
                      <td
                        key={i}
                        className={row.good?.(p) ? "cmp-good" : ""}
                      >
                        {values[i]}
                      </td>
                    ))}
                  </tr>
                );
              })}
              <tr>
                <td className="cmp-label">Key notes</td>
                {plans.map((p, i) => (
                  <td key={i} className="cmp-notes">{p.notes}</td>
                ))}
              </tr>
              <tr>
                <td className="cmp-label" />
                {plans.map((p, i) => {
                  const f = firmById[p.firmId];
                  return (
                    <td key={i}>
                      <a
                        className="btn btn-gold cmp-cta"
                        href={firmLink(f)}
                        target="_blank"
                        rel="sponsored nofollow noopener"
                      >
                        {f.discountCode ? `Get Funded · ${f.discountCode}` : "Get Funded"}
                      </a>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="cmp-foot">
          Rows highlighted on the left differ between plans. Green cells are the trader-favorable
          option. Always confirm current terms on the firm&apos;s official site.
        </div>
      </div>
    </div>
  );
}
