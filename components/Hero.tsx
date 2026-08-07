import { FIRMS, PLANS } from "@/lib/data";

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero-badge">
        <span className="dot" />
        July 2026 · FTMO &amp; The5ers verified from official sites · rest flagged
      </div>
      <h1>
        Find the prop firm that <em>actually fits</em> your trading.
      </h1>
      <p>
        Pricing, profit splits, drawdown rules and evaluation structures for the leading forex and
        futures prop firms — compared side by side, without the marketing noise.
      </p>
      <div className="hero-actions">
        <a className="btn btn-gold" href="#plans">Compare Plans</a>
        <a className="btn btn-ghost" href="/compare">Compare Firms</a>
        <a className="btn btn-ghost" href="#firms">Browse All</a>
      </div>
      <div className="hero-stats">
        <div className="hstat"><b>{FIRMS.length}</b><span>Firms tracked</span></div>
        <div className="hstat"><b>{PLANS.length}</b><span>Plans compared</span></div>
        <div className="hstat"><b>$5K–$500K</b><span>Account sizes</span></div>
        <div className="hstat"><b>Up to 100%</b><span>Profit splits</span></div>
      </div>
    </header>
  );
}
