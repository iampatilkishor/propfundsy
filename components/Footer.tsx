"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="foot-top">
        <div className="foot-brand">
          <Link className="logo" href="/">
            Prop<span>fundsy</span>
          </Link>
          <p className="foot-tagline">Find legitimate prop firms. Master risk. Trade smarter.</p>
        </div>

        <div className="foot-columns">
          <div className="foot-column">
            <h4>Product</h4>
            <Link href="/#firms">Firms</Link>
            <Link href="/compare">Compare</Link>
            <Link href="/tools">Tools</Link>
            <Link href="/how-to-verify">Verify</Link>
            <Link href="/blog">Blog</Link>
          </div>

          <div className="foot-column">
            <h4>Support</h4>
            <Link href="/#faq">FAQ</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/about">About</Link>
          </div>

          <div className="foot-column">
            <h4>Legal</h4>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/disclaimer">Disclaimer</Link>
            <Link href="/cookie-policy">Cookies</Link>
          </div>
        </div>
      </div>
      <p className="disclaimer">
        <b>Affiliate disclosure:</b> Propfundsy may earn a commission when you purchase a challenge
        through links on this site, at no extra cost to you — many links include a discount code
        that saves you money. This never affects rankings, ratings, or the data we show: our
        comparison data is maintained independently and flagged Verified or Reviews regardless of
        commercial relationships.
      </p>
      <p className="disclaimer">
        © 2026 Propfundsy. All information is provided for general comparison purposes only and does
        not constitute financial, investment, or legal advice. Pricing, profit splits, and rules are
        drawn from publicly available sources as of July 2026 and may change without notice — always
        verify details on each firm's official website before purchasing. Trading futures and
        forex involves substantial risk of loss and is not suitable for every investor. Propfundsy is
        not affiliated with any firm listed.
      </p>
    </footer>
  );
}
