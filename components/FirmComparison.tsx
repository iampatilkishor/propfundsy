"use client";

import { Firm } from "@/lib/data";
import { firmLink } from "@/lib/data";

interface ComparisonRow {
  group: string;
  label: string;
  key: keyof Firm | "pricing" | "evaluation" | "paymentInfo";
}

const COMPARISON_GROUPS: ComparisonRow[] = [
  { group: "Market & Basics", label: "Market", key: "cat" },
  { group: "Market & Basics", label: "Evaluation Model", key: "model" },

  { group: "Pricing & Fees", label: "Fee Range", key: "from" },
  { group: "Pricing & Fees", label: "Refundable", key: "from" },

  { group: "Profit Split", label: "Profit Split", key: "split" },

  { group: "Account Sizes", label: "Available Sizes", key: "sizes" },
  { group: "Account Sizes", label: "Scaling Limit", key: "sizes" },

  { group: "Payment", label: "Pay With", key: "paymentInfo" },
  { group: "Payment", label: "Payout Methods", key: "payoutMethods" },

  { group: "Promo", label: "Discount Code", key: "discountCode" },
];

export default function FirmComparison({ firm1, firm2 }: { firm1: Firm; firm2: Firm }) {
  const getValue = (firm: Firm, key: string) => {
    if (key === "cat") return firm.cat === "forex" ? "Forex / CFD" : "Futures";
    if (key === "paymentInfo") return firm.payMethods.join(", ");
    if (key === "payoutMethods") return firm.payoutMethods.join(", ");
    if (key === "discountCode") return firm.discountCode || "—";
    return (firm as any)[key] || "—";
  };

  const groupedRows = COMPARISON_GROUPS.reduce((acc, row) => {
    if (!acc[row.group]) acc[row.group] = [];
    acc[row.group].push(row);
    return acc;
  }, {} as Record<string, ComparisonRow[]>);

  return (
    <div className="firm-comparison-grouped">
      <div className="comp-header-fixed">
        <div className="comp-firm-header">
          <div className="comp-logo-small" style={{ background: `linear-gradient(135deg, ${firm1.color}, ${firm1.color}aa)` }}>
            {firm1.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
          </div>
          <div className="comp-firm-name">{firm1.name}</div>
        </div>
        <div className="comp-divider">vs</div>
        <div className="comp-firm-header">
          <div className="comp-logo-small" style={{ background: `linear-gradient(135deg, ${firm2.color}, ${firm2.color}aa)` }}>
            {firm2.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
          </div>
          <div className="comp-firm-name">{firm2.name}</div>
        </div>
      </div>

      <div className="comp-groups-wrapper">
        {Object.entries(groupedRows).map(([groupName, rows]) => (
          <div key={groupName} className="comp-group">
            <h3 className="comp-group-title">{groupName}</h3>
            <div className="comp-group-content">
              <div className="comp-column comp-column-label">
                {rows.map((row) => (
                  <div key={row.label} className="comp-row-label">{row.label}</div>
                ))}
              </div>
              <div className="comp-column comp-column-firm1">
                {rows.map((row) => (
                  <div key={row.label} className="comp-row-value">
                    {getValue(firm1, row.key)}
                  </div>
                ))}
              </div>
              <div className="comp-column comp-column-firm2">
                {rows.map((row) => (
                  <div key={row.label} className="comp-row-value">
                    {getValue(firm2, row.key)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

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
