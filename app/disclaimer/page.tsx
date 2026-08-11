import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | Propfundsy",
  description: "Important disclaimer and disclosures about Propfundsy and the information provided on our platform.",
};

export default function DisclaimerPage() {
  return (
    <>
      <Nav />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "60px 24px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "32px", fontWeight: "800" }}>Disclaimer</h1>

        <section style={{ marginBottom: "40px", padding: "20px", background: "rgba(240,97,109,.05)", borderRadius: "8px", borderLeft: "4px solid var(--red)" }}>
          <p style={{ margin: 0, color: "var(--text)", fontWeight: "600", lineHeight: "1.7" }}>
            <strong>IMPORTANT:</strong> This disclaimer applies to all content on Propfundsy.com. Please read carefully before using our platform.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>1. No Financial Advice</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            Propfundsy is a comparison and information platform, not a financial advisor. Nothing on this Site constitutes financial, investment, legal, tax, or professional advice. We do not recommend specific trading strategies or firms for your personal situation.
          </p>
          <p style={{ color: "var(--text)", lineHeight: "1.7", marginTop: "16px" }}>
            Always consult with a qualified financial advisor, attorney, or tax professional before making any financial decisions.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>2. Not a Recommendation</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            Our listings of prop trading firms are informational only. Inclusion on Propfundsy does not constitute an endorsement or recommendation. We have not thoroughly audited every firm and cannot guarantee the accuracy of all information.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>3. Risk of Trading</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7", marginBottom: "16px" }}>
            Trading carries substantial risk of loss. Leveraged trading is particularly risky. Most retail traders lose money. Past performance is not indicative of future results.
          </p>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            Only trade with money you can afford to lose completely. Never fund an account with money needed for living expenses.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>4. Educational Purpose Only</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            Our calculators and tools are for educational purposes only. They are based on general assumptions and may not reflect your specific situation. Results are estimates and not guarantees.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>5. Information Accuracy</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7", marginBottom: "16px" }}>
            While we strive to provide accurate information, we make no guarantees. Information may be outdated, incomplete, or inaccurate. Prop firms frequently change their terms, fees, and offerings.
          </p>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            <strong>Always verify information directly with the firm's official website before making any financial commitment.</strong>
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>6. Third-Party Links</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            Propfundsy contains links to third-party websites, including prop trading firms. We are not responsible for the content, accuracy, or practices of these external sites. Use them at your own risk.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>7. Affiliate Relationships</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            Propfundsy contains affiliate links to prop trading firms. We may receive compensation when you click these links and fund an account. However, this does not affect the price you pay—it's our way to sustain the platform.
          </p>
          <p style={{ color: "var(--text)", lineHeight: "1.7", marginTop: "16px" }}>
            Our affiliate relationships do not influence our comparisons or recommendations. We aim to provide objective data.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>8. No Liability</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            In no event shall Propfundsy be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of this Site or reliance on its content. This includes loss of funds, lost trading opportunities, or other damages.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>9. Due Diligence is Your Responsibility</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            Before funding any trading account, you are responsible for:
          </p>
          <ul style={{ color: "var(--text)", lineHeight: "1.8", paddingLeft: "24px", marginTop: "12px" }}>
            <li>Verifying the firm's regulatory status independently</li>
            <li>Reading all terms and conditions carefully</li>
            <li>Checking reviews from multiple sources</li>
            <li>Testing their customer service before funding</li>
            <li>Understanding the risks involved</li>
            <li>Never sharing sensitive financial information until you're confident</li>
          </ul>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>10. Scam Awareness</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7", marginBottom: "16px" }}>
            The prop trading industry has scams. While we've worked to verify firms, we cannot guarantee all firms listed are legitimate or will remain legitimate.
          </p>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            Common red flags: Guaranteed profits, requests for money via personal PayPal, pressure to fund immediately, no verifiable regulation, and impossible return promises.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>11. Changes to This Disclaimer</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            We may update this disclaimer at any time. Your continued use of Propfundsy constitutes acceptance of the updated disclaimer.
          </p>
        </section>

        <section style={{ marginBottom: "40px", padding: "24px", background: "rgba(62,207,142,.05)", borderRadius: "8px", borderLeft: "4px solid var(--green)" }}>
          <h3 style={{ margin: "0 0 12px 0", fontSize: "1.2rem", fontWeight: "700" }}>Questions?</h3>
          <p style={{ margin: 0, color: "var(--text)", lineHeight: "1.6" }}>
            If you have questions about this disclaimer or Propfundsy's practices, contact us at saikishor.patil@gmail.com.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}
