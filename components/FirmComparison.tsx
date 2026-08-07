"use client";

import { Firm } from "@/lib/data";
import { firmLink } from "@/lib/data";

interface ComparisonRow {
  label: string;
  key: keyof Firm | "pricing" | "evaluation" | "paymentInfo";
  highlight?: boolean;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  { label: "Market", key: "cat" },
  { label: "Evaluation Model", key: "model" },
  { label: "Profit Split", key: "split", highlight: true },
  { label: "Account Sizes", key: "sizes" },
  { label: "Fee Range", key: "from" },
  { label: "Scaling Limit", key: "sizes" },
  { label: "Pay With", key: "paymentInfo" },
  { label: "Payout Methods", key: "payoutMethods" },
  { label: "Promo Code", key: "discountCode" },
];

export default function FirmComparison({ firm1, firm2 }: { firm1: Firm; firm2: Firm }) {
  const getValue = (firm: Firm, key: string) => {
    if (key === "cat") return firm.cat === "forex" ? "Forex / CFD" : "Futures";
    if (key === "paymentInfo") return firm.payMethods.join(", ");
    if (key === "payoutMethods") return firm.payoutMethods.join(", ");
    if (key === "discountCode") return firm.discountCode || "—";
    return (firm as any)[key] || "—";
  };

  return (
    <div className="firm-comparison">
      <div className="comparison-header">
        <div className="comp-firm">
          <div className="comp-logo" style={{ background: `linear-gradient(135deg, ${firm1.color}, ${firm1.color}aa)` }}>
            {firm1.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
          </div>
          <h2>{firm1.name}</h2>
        </div>
        <div className="comp-vs">vs</div>
        <div className="comp-firm">
          <div className="comp-logo" style={{ background: `linear-gradient(135deg, ${firm2.color}, ${firm2.color}aa)` }}>
            {firm2.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
          </div>
          <h2>{firm2.name}</h2>
        </div>
      </div>

      <table className="comparison-table">
        <tbody>
          {COMPARISON_ROWS.map((row) => (
            <tr key={row.label} className={row.highlight ? "highlight" : ""}>
              <td className="comp-label">{row.label}</td>
              <td className="comp-value">
                {getValue(firm1, row.key)}
              </td>
              <td className="comp-value">
                {getValue(firm2, row.key)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="comparison-actions">
        <a className="btn btn-gold" href={firmLink(firm1)} target="_blank" rel="sponsored nofollow noopener">
          Visit {firm1.name}
        </a>
        <a className="btn btn-gold" href={firmLink(firm2)} target="_blank" rel="sponsored nofollow noopener">
          Visit {firm2.name}
        </a>
      </div>
    </div>
  );
}
