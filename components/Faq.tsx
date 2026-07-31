export const FAQ_ITEMS = [
  {
    q: "What is a prop firm evaluation?",
    a: "You pay a one-time or monthly fee to trade a simulated account under risk rules. Hit the profit target without breaching drawdown limits and the firm gives you a funded account where you keep a share of the profits — typically 80–100%.",
  },
  {
    q: "1-step vs 2-step — which is better?",
    a: "1-step challenges fund you faster but usually cost more or carry tighter drawdown rules. 2-step challenges are cheaper per dollar of buying power but take longer. If you trade consistently, 2-step is usually the better value; if you want speed, pay for 1-step or instant funding.",
  },
  {
    q: "What's the biggest hidden risk in these plans?",
    a: "Trailing drawdowns and consistency rules. A trailing drawdown follows your equity peak (sometimes including unrealized profit), and consistency rules can block payouts if one big day dominates your results. Always check how drawdown is calculated before buying.",
  },
  {
    q: "Are the fees refundable?",
    a: "Some firms refund your evaluation fee with your first payout (FTMO, for example). Futures firms typically charge monthly subscriptions during evaluation plus a one-time activation fee when funded. Check each plan's notes column.",
  },
  {
    q: "How current is this data?",
    a: "All pricing and rules were reviewed in July 2026 from firm websites and independent reviews. Prop firms change terms frequently — always confirm on the firm's official site before purchasing.",
  },
];

export default function Faq() {
  return (
    <section id="faq">
      <div className="sec-label">FAQ</div>
      <h2>Common questions</h2>
      <div className="faq" style={{ marginTop: 34 }}>
        {FAQ_ITEMS.map((it) => (
          <details key={it.q}>
            <summary>{it.q}</summary>
            <div className="faq-body">{it.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
