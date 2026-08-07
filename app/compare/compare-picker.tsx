"use client";

import { useState } from "react";
import { FIRMS } from "@/lib/data";
import { slugOf } from "@/lib/seo";
import Link from "next/link";

export default function ComparePicker() {
  const [firm1, setFirm1] = useState<string>("");
  const [firm2, setFirm2] = useState<string>("");
  const [cat1, setCat1] = useState<"forex" | "futures">("forex");
  const [cat2, setCat2] = useState<"forex" | "futures">("forex");

  const selectedFirm1 = firm1 ? FIRMS.find((f) => f.id === firm1) : null;
  const selectedFirm2 = firm2 ? FIRMS.find((f) => f.id === firm2) : null;

  const isValid = firm1 && firm2 && firm1 !== firm2;
  const comparisonUrl = isValid
    ? `/compare/${slugOf(selectedFirm1!)}-vs-${slugOf(selectedFirm2!)}`
    : null;

  // Group firms by category
  const forexFirms = FIRMS.filter((f) => f.cat === "forex");
  const futuresFirms = FIRMS.filter((f) => f.cat === "futures");
  const firms1 = cat1 === "forex" ? forexFirms : futuresFirms;
  const firms2 = cat2 === "forex" ? forexFirms : futuresFirms;

  return (
    <>
      <div className="compare-selectors">
        <div className="selector-group">
          <label>First Firm</label>
          <div className="selector-tabs">
            <button
              type="button"
              className={`tab${cat1 === "forex" ? " active" : ""}`}
              onClick={() => { setCat1("forex"); setFirm1(""); }}
            >
              Forex / CFD
            </button>
            <button
              type="button"
              className={`tab${cat1 === "futures" ? " active" : ""}`}
              onClick={() => { setCat1("futures"); setFirm1(""); }}
            >
              Futures
            </button>
          </div>
          <select value={firm1} onChange={(e) => setFirm1(e.target.value)} className="firm-select">
            <option value="">Select a firm...</option>
            {firms1.map((f) => (
              <option key={f.id} value={f.id} disabled={f.id === firm2}>
                {f.name}
              </option>
            ))}
          </select>
        </div>

        <div className="selector-divider">
          <span>vs</span>
        </div>

        <div className="selector-group">
          <label>Second Firm</label>
          <div className="selector-tabs">
            <button
              type="button"
              className={`tab${cat2 === "forex" ? " active" : ""}`}
              onClick={() => { setCat2("forex"); setFirm2(""); }}
            >
              Forex / CFD
            </button>
            <button
              type="button"
              className={`tab${cat2 === "futures" ? " active" : ""}`}
              onClick={() => { setCat2("futures"); setFirm2(""); }}
            >
              Futures
            </button>
          </div>
          <select value={firm2} onChange={(e) => setFirm2(e.target.value)} className="firm-select">
            <option value="">Select a firm...</option>
            {firms2.map((f) => (
              <option key={f.id} value={f.id} disabled={f.id === firm1}>
                {f.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isValid && (
        <Link href={comparisonUrl} className="btn btn-gold btn-compare">
          Compare Now →
        </Link>
      )}

      <div className="featured-comparisons">
        <h3>Popular Comparisons</h3>
        <div className="comparison-links">
          {[
            { f1: "ftmo", f2: "t5" },
            { f1: "apex", f2: "ts" },
            { f1: "fp", f2: "fn" },
          ].map(({ f1, f2 }) => {
            const firm1 = FIRMS.find((f) => f.id === f1);
            const firm2 = FIRMS.find((f) => f.id === f2);
            return (
              <Link
                key={`${f1}-${f2}`}
                href={`/compare/${slugOf(firm1!)}-vs-${slugOf(firm2!)}`}
                className="comparison-link"
              >
                {firm1?.name} vs {firm2?.name}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
