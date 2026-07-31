"use client";

import { useState } from "react";
import Link from "next/link";
import { FIRMS, firmLink, initials, type Category } from "@/lib/data";
import { slugOf } from "@/lib/seo";

export default function Firms() {
  const [cat, setCat] = useState<Category>("forex");

  return (
    <section id="firms">
      <div className="sec-label">The Firms</div>
      <h2>Leading prop firms at a glance</h2>
      <p className="sec-sub">
        Switch between forex/CFD and futures firms. Every profile summarizes the numbers that matter
        before you pay an evaluation fee.
      </p>

      <div className="controls">
        <div className="seg">
          {(["forex", "futures"] as Category[]).map((c) => (
            <button key={c} className={cat === c ? "active" : ""} onClick={() => setCat(c)}>
              {c === "forex" ? "Forex / CFD" : "Futures"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid">
        {FIRMS.filter((f) => f.cat === cat).map((f) => (
          <div key={f.id} className={`firm-card${f.featured ? " featured" : ""}`}>
            <div className="firm-head">
              <div
                className="firm-logo"
                style={{ background: `linear-gradient(135deg, ${f.color}, ${f.color}99)` }}
              >
                {initials(f.name)}
              </div>
              <div>
                <h3 className="firm-name"><Link href={`/firms/${slugOf(f)}`}>{f.name}</Link></h3>
                <div className="firm-cat">
                  {f.cat === "forex" ? "Forex / CFD" : "Futures"} · {f.model}
                </div>
              </div>
            </div>
            <p className="firm-desc">{f.desc}</p>
            <div className="firm-metrics">
              <div className="metric"><span>Profit split</span><b className="green">{f.split}</b></div>
              <div className="metric"><span>Plans from</span><b className="gold">{f.from}</b></div>
              <div className="metric"><span>Account sizes</span><b>{f.sizes}</b></div>
              <div className="metric"><span>Evaluation</span><b>{f.model}</b></div>
            </div>
            <div className="firm-tags">
              {f.tags.map(([label, kind]) => (
                <span key={label} className={`tag ${kind}`}>{label}</span>
              ))}
            </div>
            <div className="pay-block">
              <div className="pay-line"><span className="pay-label">Pay with</span>{f.payMethods.map((m) => <span key={m} className="pay-chip">{m}</span>)}</div>
              <div className="pay-line"><span className="pay-label">Payouts via</span>{f.payoutMethods.map((m) => <span key={m} className="pay-chip out">{m}</span>)}</div>
            </div>
            <div className="firm-source">{f.source}</div>
            <div className="firm-actions">
              <Link className="btn btn-ghost" href={`/firms/${slugOf(f)}`}>Full Review →</Link>
              <a
                className="btn btn-gold"
                href={firmLink(f)}
                target="_blank"
                rel="sponsored nofollow noopener"
              >
                {f.discountCode ? `Get Funded · ${f.discountCode}` : "Get Funded"}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
