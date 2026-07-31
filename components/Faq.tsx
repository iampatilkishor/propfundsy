export const FAQ_ITEMS = [
  {
    q: "What is a prop firm evaluation?",
    a: "You pay a one-time or monthly fee to trade a simulated account under risk rules. Hit the profit target without breaching drawdown limits and the firm gives you a funded account where you keep a share of the profits — typically 80–100%.",
  },
  {
    q: "1-step vs 2-step vs 3-step challenges — what's the difference?",
    a: "1-step funds fastest but costs more or has tighter rules. 2-step splits into an evaluation then a funded phase with looser rules. 3-step adds an intermediate tier. Instant funding skips evaluation entirely but splits are lower (50–70%) and rules are strict.",
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
  {
    q: "Can I trade news announcements at a prop firm?",
    a: "It depends on the plan and account type. Most evaluation accounts restrict news trading. Many funded accounts allow it if you pass the evaluation under the news restriction first. Forex firms are stricter than futures firms. Check the 'News' column in the comparison table.",
  },
  {
    q: "Can I use EAs (expert advisors) or bots?",
    a: "Most firms allow EAs on funded accounts but restrict or forbid them during evaluation. Some firms have specific EA policies (max drawdown per trade, no martingale systems). Verify in the comparison table's 'EA' column and read the firm's rules.",
  },
  {
    q: "Can I hold positions over the weekend?",
    a: "Forex firms often restrict weekend holdings on funded accounts due to gap risk. Futures firms typically allow it. Swing trading accounts (offered by FTMO and others) specifically allow weekend and news trading. Check the 'Weekend' column.",
  },
  {
    q: "What's the typical profit target?",
    a: "Forex firms usually set targets of 8–15% for 1-step or the first phase of 2-step challenges. Futures firms target $1,500–$6,000 per account size. Once you hit the target, you've typically passed and funded accounts have no target.",
  },
  {
    q: "How long does it take to get funded?",
    a: "1-step and instant funding: hours to days. 2-step: 1–2 weeks (evaluation + approval + funding). Some firms have processing delays; check payout terms. Faster firms (FTMO, Topstep) typically process within 7 days of passing.",
  },
  {
    q: "What's the minimum account balance to trade?",
    a: "Minimum funded account sizes range $5K–$100K depending on the plan. Some firms have $2.5K or $10K minimums. Check the 'Account sizes' column and filter by the size that fits your strategy.",
  },
  {
    q: "Do prop firms pay out weekly or monthly?",
    a: "Most pay monthly (14–30 days after the close of the month). Some offer weekly payouts (Funding Pips, Tradeify). A few have on-demand withdrawal access. Check the 'Payout' column for speed expectations.",
  },
  {
    q: "What's the difference between static and trailing drawdown?",
    a: "Static drawdown is the loss from your starting balance (e.g., can't lose more than 5% of $100K = $5K). Trailing drawdown recalculates from your highest equity point (peaks at $101K, then can't drop below $96K). Trailing is usually harder during drawdowns.",
  },
  {
    q: "Can I scale my account after funding?",
    a: "Yes, most firms offer scaling. You earn a percentage of profits and get access to larger accounts as you prove profitability. Some scale up to $1M+. Check each firm's scaling policy — it varies.",
  },
  {
    q: "What payment methods do prop firms accept?",
    a: "Most accept credit cards, debit cards, PayPal, and crypto. Some accept bank transfers or wire. Check the 'Pay with' row on the firm cards to see payment options. Payout methods (Wise, bank transfer, crypto) are shown separately.",
  },
  {
    q: "Is there a consistency rule?",
    a: "Many funded accounts require you to win a certain percentage of days (e.g., 30% winning days per month) to stay funded. If you hit your profit target but miss consistency, you may not be able to withdraw. Check the 'Consistency' column.",
  },
  {
    q: "What happens if I breach the drawdown limit?",
    a: "Your account is closed immediately. If you were in evaluation, you lose the challenge fee. If funded, you lose the right to trade but keep any unrealized profits (depending on firm policy). Always trade with stops to protect against this.",
  },
  {
    q: "Can I trade stocks or crypto at a prop firm?",
    a: "Most prop firms are forex-only or futures-only. A few (like Goat Funded) offer stocks and crypto alongside forex. Check the firm category and description — 'forex' typically means forex/CFD, 'futures' means micro contracts or ES/NQ.",
  },
  {
    q: "How much can I earn per month at a prop firm?",
    a: "Earnings depend on your account size, profit split, and trading skill. A $100K account at 80% split earning 2% monthly profit = $1,600/month (before taxes). Most traders aim for 1–3% monthly on funded accounts.",
  },
  {
    q: "What's the difference between verified and review data?",
    a: "Verified = we confirmed on the firm's official website (pricing, rules). Review = from third-party review sites (may be older or estimated). Prices marked with ~ are interpolated. Always check the firm's site for the latest terms.",
  },
  {
    q: "Can I use a VPN to trade from a restricted country?",
    a: "No — most firms require geo-compliance. Using a VPN to bypass restrictions violates their terms and can result in account closure and forfeiture of profits. Check your country's eligibility on the firm's site.",
  },
  {
    q: "What's the average pass rate for prop firm challenges?",
    a: "Industry-wide, pass rates are typically 5–15% depending on the firm and account size. Larger challenges and stricter drawdown rules have lower pass rates. Choose a firm with trader-friendly rules if pass rate concerns you.",
  },
  {
    q: "Can I trade with a funded account indefinitely?",
    a: "Most firms allow indefinite trading as long as you maintain the minimum daily loss limit and consistency rule. Some have monthly or annual minimum trade requirements to keep the account active. Check the firm's policy.",
  },
  {
    q: "Is prop firm trading regulated?",
    a: "Prop firms operate in a gray zone. They are not regulated like brokers in most jurisdictions, but reputable firms operate transparently and have payout track records. Always check reviews and payout proof before committing.",
  },
  {
    q: "Can I get my money back if the firm denies a payout?",
    a: "Unlikely. Prop firms are not regulated like brokers, so legal recourse is limited. This is why reputation and payout track records matter. Read Trustpilot reviews and independent trader feedback before choosing.",
  },
  {
    q: "How do prop firms make money?",
    a: "Challenge fees and activation fees are their primary revenue. They keep a percentage of your profits (you get 80–90%, they keep 10–20%). Many also profit from traders who fail challenges. This incentivizes them to set rules that favor their risk management.",
  },
  {
    q: "What's the best prop firm for beginners?",
    a: "Look for: low challenge fee, high pass rate, loose drawdown rules, refundable fee. FTMO, The5ers, and Topstep are popular for beginners. Start with a small account size ($5K–$25K) to test the firm's payout reliability.",
  },
  {
    q: "Should I try multiple prop firms or focus on one?",
    a: "Many traders test multiple firms simultaneously to compare rules and find the best fit. Once you're funded, most firms allow you to hold multiple funded accounts. Diversifying reduces the risk of one firm changing unfavorable rules.",
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
