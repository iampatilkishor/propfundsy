const ITEMS = [
  { icon: "⚖️", title: "True side-by-side data", body: "Fees, splits, targets and drawdown mechanics normalized into one format so plans are actually comparable." },
  { icon: "🔍", title: "Rules that catch traders out", body: "Consistency rules, trailing drawdowns and payout caps are flagged up front — the fine print that fails funded accounts." },
  { icon: "📅", title: "Reviewed for 2026", body: "Firms change rules constantly. Every figure here reflects the latest published pricing and rule updates as of July 2026." },
  { icon: "🧭", title: "Both markets covered", body: "Forex/CFD challenges and futures combines behave very differently. We compare each on its own terms." },
];

export default function Why() {
  return (
    <section id="why">
      <div className="sec-label">Why Propfundsy</div>
      <h2>Built for traders, not affiliates</h2>
      <p className="sec-sub">Prop firm marketing is loud. We keep the comparison quiet, factual, and current.</p>
      <div className="why-grid">
        {ITEMS.map((it) => (
          <div key={it.title} className="why-card">
            <div className="why-icon">{it.icon}</div>
            <h3>{it.title}</h3>
            <p>{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
