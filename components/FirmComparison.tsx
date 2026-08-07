"use client";

import { Firm, firmLink } from "@/lib/data";
import { plansOfFirm, cheapestPlan } from "@/lib/seo";

interface ComparisonRow {
  group: string;
  label: string;
  key: string;
}

const COMPARISON_GROUPS: ComparisonRow[] = [
  { group: "Market & Basics", label: "Market", key: "cat" },
  { group: "Market & Basics", label: "Evaluation Model", key: "model" },

  { group: "Pricing & Fees", label: "Fee Range", key: "from" },
  { group: "Pricing & Fees", label: "Cheapest Plan Tracked", key: "cheapestPlan" },
  { group: "Pricing & Fees", label: "Fee Refund", key: "refund" },

  { group: "Profit Split", label: "Profit Split", key: "split" },
  { group: "Profit Split", label: "Best Split Tracked", key: "bestSplit" },

  { group: "Account Sizes", label: "Available Sizes", key: "sizes" },
  { group: "Account Sizes", label: "Plans Tracked", key: "plansTracked" },

  { group: "Payment", label: "Pay With", key: "paymentInfo" },
  { group: "Payment", label: "Payout Methods", key: "payoutMethods" },

  { group: "Promo", label: "Discount Code", key: "discountCode" },
];

export default function FirmComparison({ firm1, firm2 }: { firm1: Firm; firm2: Firm }) {
  const getValue = (firm: Firm, key: string) => {
    const plans = plansOfFirm(firm.id);

    if (key === "cat") return firm.cat === "forex" ? "Forex / CFD" : "Futures";
    if (key === "paymentInfo") return firm.payMethods.join(", ");
    if (key === "payoutMethods") return firm.payoutMethods.join(", ");
    if (key === "discountCode") return firm.discountCode || "—";
    if (key === "cheapestPlan") {
      const c = cheapestPlan(firm.id);
      return c ? `${c.priceLabel} (${c.sizeLabel})` : "Being verified";
    }
    if (key === "refund") {
      const terms = [...new Set(plans.map((p) => p.refund).filter((r): r is string => !!r))];
      if (!plans.length) return "Being verified";
      return terms.length ? terms.join(" · ") : "No refund noted";
    }
    if (key === "bestSplit") {
      if (!plans.length) return "—";
      return `${Math.max(...plans.map((p) => p.splitSort))}%`;
    }
    if (key === "plansTracked") return plans.length || "Being verified";
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
