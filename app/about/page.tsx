import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Propfundsy | Prop Firm Comparison & Trading Tools",
  description: "Learn about Propfundsy - the platform helping traders find legitimate prop firms, compare plans, and master risk management with professional trading calculators.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "60px 24px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "32px", fontWeight: "800" }}>About Propfundsy</h1>

        <section style={{ marginBottom: "50px" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", marginBottom: "16px" }}>Our Mission</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.8", fontSize: "1.05rem" }}>
            We believe traders deserve access to accurate, verified information about proprietary trading firms. Our mission is to cut through the hype, eliminate scams, and provide real data that helps traders make informed decisions about their futures.
          </p>
        </section>

        <section style={{ marginBottom: "50px" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", marginBottom: "16px" }}>What We Do</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.8", marginBottom: "20px" }}>
            Propfundsy is a comprehensive platform for prop traders. We provide:
          </p>
          <div style={{ display: "grid", gap: "20px" }}>
            <div style={{ padding: "20px", background: "rgba(212,175,106,.05)", borderRadius: "8px", borderLeft: "4px solid var(--gold)" }}>
              <h3 style={{ margin: "0 0 8px 0", fontSize: "1.1rem", fontWeight: "700" }}>📊 Verified Firm Database</h3>
              <p style={{ margin: 0, color: "var(--muted)" }}>
                45+ proprietary trading firms with verified data on fees, profit splits, platforms, and reviews. Compare apples-to-apples with real information.
              </p>
            </div>
            <div style={{ padding: "20px", background: "rgba(212,175,106,.05)", borderRadius: "8px", borderLeft: "4px solid var(--gold)" }}>
              <h3 style={{ margin: "0 0 8px 0", fontSize: "1.1rem", fontWeight: "700" }}>🔍 Plan Comparison Tools</h3>
              <p style={{ margin: 0, color: "var(--muted)" }}>
                Sort and filter by account size, fee, profit split, payout speed, and trading rules. Head-to-head comparisons of up to 3 plans at once.
              </p>
            </div>
            <div style={{ padding: "20px", background: "rgba(212,175,106,.05)", borderRadius: "8px", borderLeft: "4px solid var(--gold)" }}>
              <h3 style={{ margin: "0 0 8px 0", fontSize: "1.1rem", fontWeight: "700" }}>🛠️ Professional Trading Calculators</h3>
              <p style={{ margin: 0, color: "var(--muted)" }}>
                Leverage Impact, Loss Recovery, Edge Analysis, Position Sizing, and Compounding calculators to master risk management.
              </p>
            </div>
            <div style={{ padding: "20px", background: "rgba(212,175,106,.05)", borderRadius: "8px", borderLeft: "4px solid var(--gold)" }}>
              <h3 style={{ margin: "0 0 8px 0", fontSize: "1.1rem", fontWeight: "700" }}>✅ Verification Guides</h3>
              <p style={{ margin: 0, color: "var(--muted)" }}>
                Step-by-step guides to verify any prop firm before you fund. Check regulatory status, reviews, social media, and red flags.
              </p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: "50px" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", marginBottom: "16px" }}>Why We Built This</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.8", marginBottom: "16px" }}>
            The prop trading industry exploded in the last few years. But so did scams. Traders were getting burned by fake firms, misleading marketing, and platforms that didn't do their homework.
          </p>
          <p style={{ color: "var(--text)", lineHeight: "1.8" }}>
            We built Propfundsy to be the platform we wished existed—one that tells the truth, verifies data, and helps traders level up their risk management skills. No hype. No BS. Just real information.
          </p>
        </section>

        <section style={{ marginBottom: "50px" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", marginBottom: "16px" }}>Our Values</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px", marginTop: "24px" }}>
            <div>
              <h4 style={{ margin: "0 0 8px 0", fontSize: "1rem", fontWeight: "700", color: "var(--gold)" }}>Transparency</h4>
              <p style={{ margin: 0, color: "var(--muted)", fontSize: ".9rem" }}>
                We verify data from official sources and disclose where information comes from.
              </p>
            </div>
            <div>
              <h4 style={{ margin: "0 0 8px 0", fontSize: "1rem", fontWeight: "700", color: "var(--gold)" }}>Accuracy</h4>
              <p style={{ margin: 0, color: "var(--muted)", fontSize: ".9rem" }}>
                No guessing. No placeholders. Every firm detail is checked against official sources.
              </p>
            </div>
            <div>
              <h4 style={{ margin: "0 0 8px 0", fontSize: "1rem", fontWeight: "700", color: "var(--gold)" }}>Education</h4>
              <p style={{ margin: 0, color: "var(--muted)", fontSize: ".9rem" }}>
                We teach risk management and due diligence, not just list firms.
              </p>
            </div>
            <div>
              <h4 style={{ margin: "0 0 8px 0", fontSize: "1rem", fontWeight: "700", color: "var(--gold)" }}>Independence</h4>
              <p style={{ margin: 0, color: "var(--muted)", fontSize: ".9rem" }}>
                Affiliate links help us survive, but don't influence our recommendations.
              </p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: "50px" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", marginBottom: "16px" }}>Contact Us</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.8", marginBottom: "16px" }}>
            Have a question? Found a mistake in our data? Want to suggest a feature? We'd love to hear from you.
          </p>
          <p style={{ color: "var(--text)", lineHeight: "1.8" }}>
            <strong>Email:</strong> saikishor.patil@gmail.com
          </p>
        </section>

        <section style={{ padding: "32px", background: "linear-gradient(135deg, rgba(79,140,255,.1) 0%, rgba(212,175,106,.05) 100%)", borderRadius: "12px", border: "1px solid var(--border)" }}>
          <h3 style={{ margin: "0 0 12px 0", fontSize: "1.3rem", fontWeight: "700" }}>Join Our Community</h3>
          <p style={{ margin: 0, color: "var(--text)", lineHeight: "1.6" }}>
            Subscribe to stay updated on new firms, tool features, and verified trading tips. We respect your inbox—no spam, just value.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}
