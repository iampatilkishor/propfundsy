"use client";

import { useMemo } from "react";
import { FIRMS, firmLink, initials } from "@/lib/data";

export default function PromoHero() {
  const promos = useMemo(
    () => FIRMS.filter((f) => f.discountCode && f.promoActive),
    []
  );

  if (promos.length === 0) return null;

  return (
    <section className="featured-offers">
      <div className="offers-container">
        <div className="offers-header">
          <h2>This Week's Featured Offers</h2>
          <p>Exclusive discounts from our verified partners</p>
        </div>

        <div className="offers-grid">
          {promos.map((f) => (
            <div key={f.id} className="offer-card" style={{ borderTopColor: f.color }}>
              <div className="offer-firm">
                <div className="offer-logo" style={{ background: `linear-gradient(135deg, ${f.color}, ${f.color}aa)` }}>
                  {initials(f.name)}
                </div>
                <div className="offer-name">{f.name}</div>
              </div>

              <div className="offer-promo">
                <div className="promo-label">Use code</div>
                <div className="promo-code">{f.discountCode}</div>
              </div>

              <a className="offer-link" href={firmLink(f)} target="_blank" rel="sponsored nofollow noopener">
                Claim Discount →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
