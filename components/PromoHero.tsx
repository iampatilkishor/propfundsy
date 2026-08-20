"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FIRMS, firmLink, initials } from "@/lib/data";
import { TrustCell } from "@/components/PlanTable";

export default function PromoHero() {
  const promos = useMemo(
    () => FIRMS.filter((f) => f.discountCode && f.promoActive),
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  if (promos.length === 0) return null;

  const cardWidth = 320;
  const gapWidth = 20;
  const cardWithGap = cardWidth + gapWidth;

  // Auto-scroll every 5 seconds (unless hovering)
  useEffect(() => {
    if (isHovering) return;

    autoScrollRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        const newIndex = next >= promos.length ? 0 : next;
        scrollToCard(newIndex);
        return newIndex;
      });
    }, 5000);

    return () => clearInterval(autoScrollRef.current);
  }, [isHovering, promos.length]);

  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current) {
      const scrollPosition = index * cardWithGap;
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const index = Math.round(scrollLeft / cardWithGap);
      const clampedIndex = Math.min(index, promos.length - 1);
      setCurrentIndex(clampedIndex);
    }
  };

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

  const goToCard = (index: number) => {
    setCurrentIndex(index);
    scrollToCard(index);
  };

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < promos.length - 1;

  return (
    <section className="featured-offers">
      <div className="offers-container">
        <motion.div
          className="offers-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>This Week's Featured Offers</h2>
          <p>Exclusive discounts from our verified partners</p>
        </motion.div>

        <div
          className="carousel-wrapper"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <motion.button
            className="carousel-arrow carousel-arrow-prev"
            onClick={handlePrev}
            disabled={!canGoPrev}
            aria-label="Previous offer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            ‹
          </motion.button>

          <div className="offers-grid" ref={scrollContainerRef} onScroll={handleScroll}>
            {promos.map((f, index) => (
              <motion.div
                key={f.id}
                className={`offer-card ${index === currentIndex ? "active" : ""}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                style={{ borderTopColor: f.color }}
              >
                <div className="offer-firm">
                  <div className="offer-logo" style={{ background: `linear-gradient(135deg, ${f.color}, ${f.color}aa)` }}>
                    {initials(f.name)}
                  </div>
                  <div className="offer-details">
                    <div className="offer-name">{f.name}</div>
                    <div className="offer-trust"><TrustCell f={f} /></div>
                  </div>
                </div>

                <div className="offer-info">
                  <div className="info-item">
                    <span className="info-label">Profit Split</span>
                    <span className="info-value">{f.split}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">From</span>
                    <span className="info-value">{f.from}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Model</span>
                    <span className="info-value">{f.model}</span>
                  </div>
                </div>

                <div className="offer-promo">
                  <div className="promo-label">Discount Code</div>
                  <div className="promo-code">{f.discountCode}</div>
                </div>

                <motion.a
                  className="offer-link"
                  href={firmLink(f)}
                  target="_blank"
                  rel="sponsored nofollow noopener"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Claim Discount →
                </motion.a>
              </motion.div>
            ))}
          </div>

          <motion.button
            className="carousel-arrow carousel-arrow-next"
            onClick={handleNext}
            disabled={!canGoNext}
            aria-label="Next offer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            ›
          </motion.button>
        </div>

        <motion.div
          className="carousel-dots"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {promos.map((_, index) => (
            <motion.button
              key={index}
              className={`carousel-dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => goToCard(index)}
              aria-label={`Go to offer ${index + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
