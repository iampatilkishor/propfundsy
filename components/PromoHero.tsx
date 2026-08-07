"use client";

import { useMemo, useState, useRef } from "react";
import { FIRMS, firmLink, initials } from "@/lib/data";

export default function PromoHero() {
  const promos = useMemo(
    () => FIRMS.filter((f) => f.discountCode && f.promoActive),
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (promos.length === 0) return null;

  const cardWidth = 320; // Desktop card width in pixels
  const gapWidth = 20; // Gap between cards
  const cardWithGap = cardWidth + gapWidth;

  const handlePrev = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    setCurrentIndex(newIndex);
    scrollToCard(newIndex);
  };

  const handleNext = () => {
    const newIndex = Math.min(promos.length - 1, currentIndex + 1);
    setCurrentIndex(newIndex);
    scrollToCard(newIndex);
  };

  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current) {
      const scrollPosition = index * cardWithGap;
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const goToCard = (index: number) => {
    setCurrentIndex(index);
    scrollToCard(index);
  };

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < promos.length - 1;

  return (
    <section className="featured-offers">
      <div className="offers-container">
        <div className="offers-header">
          <h2>This Week's Featured Offers</h2>
          <p>Exclusive discounts from our verified partners</p>
        </div>

        <div className="carousel-wrapper">
          <button
            className="carousel-arrow carousel-arrow-prev"
            onClick={handlePrev}
            disabled={!canGoPrev}
            aria-label="Previous offer"
          >
            ‹
          </button>

          <div className="offers-grid" ref={scrollContainerRef}>
            {promos.map((f, index) => (
              <div key={f.id} className={`offer-card ${index === currentIndex ? 'active' : ''}`} style={{ borderTopColor: f.color }}>
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

          <button
            className="carousel-arrow carousel-arrow-next"
            onClick={handleNext}
            disabled={!canGoNext}
            aria-label="Next offer"
          >
            ›
          </button>
        </div>

        <div className="carousel-dots">
          {promos.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => goToCard(index)}
              aria-label={`Go to offer ${index + 1}`}
              aria-current={index === currentIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
