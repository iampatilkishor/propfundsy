import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="foot-top">
        <Link className="logo" href="/">
          Prop<span>fundsy</span>
        </Link>
        <div className="foot-links">
          <Link href="/#firms">Firms</Link>
          <Link href="/#plans">Plans</Link>
          <Link href="/#faq">FAQ</Link>
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
        verify details on each firm&apos;s official website before purchasing. Trading futures and
        forex involves substantial risk of loss and is not suitable for every investor. Propfundsy is
        not affiliated with any firm listed.
      </p>
    </footer>
  );
}
