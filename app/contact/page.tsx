import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Propfundsy",
  description: "Get in touch with Propfundsy. Report an issue, suggest a feature, or share feedback about our platform.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "60px 24px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "32px", fontWeight: "800" }}>Contact Us</h1>
        <p style={{ fontSize: "1.1rem", color: "var(--muted)", marginBottom: "48px" }}>
          Have a question? Found a mistake? Want to suggest a feature? We'd love to hear from you.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px", marginBottom: "60px" }}>
          <div style={{
            padding: "32px",
            background: "linear-gradient(135deg, var(--card) 0%, rgba(30,36,48,.5) 100%)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
          }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "12px", color: "var(--gold)" }}>📧 Email</h3>
            <p style={{ color: "var(--muted)", marginBottom: "16px" }}>
              The fastest way to reach us. We respond within 24 hours.
            </p>
            <a href="mailto:saikishor.patil@gmail.com" style={{
              display: "inline-block",
              padding: "10px 20px",
              background: "var(--gold)",
              color: "var(--bg)",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
              transition: "all .2s",
            }}>
              saikishor.patil@gmail.com
            </a>
          </div>

          <div style={{
            padding: "32px",
            background: "linear-gradient(135deg, var(--card) 0%, rgba(30,36,48,.5) 100%)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
          }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "12px", color: "var(--gold)" }}>🔍 Report an Issue</h3>
            <p style={{ color: "var(--muted)", marginBottom: "16px" }}>
              Found incorrect data about a firm? Email us with details.
            </p>
            <p style={{ color: "var(--text)", fontSize: ".9rem" }}>
              Include: Firm name, what's wrong, and the correct information.
            </p>
          </div>

          <div style={{
            padding: "32px",
            background: "linear-gradient(135deg, var(--card) 0%, rgba(30,36,48,.5) 100%)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
          }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "12px", color: "var(--gold)" }}>💡 Feature Requests</h3>
            <p style={{ color: "var(--muted)", marginBottom: "16px" }}>
              Have an idea? We'd love to hear what features you'd like.
            </p>
            <p style={{ color: "var(--text)", fontSize: ".9rem" }}>
              Describe the feature and how it would help you.
            </p>
          </div>
        </div>

        <section style={{
          padding: "40px",
          background: "linear-gradient(135deg, rgba(79,140,255,.1) 0%, rgba(212,175,106,.05) 100%)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          marginBottom: "60px",
        }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>What We're Looking For</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px", marginTop: "24px" }}>
            <div>
              <h4 style={{ margin: "0 0 8px 0", fontSize: "1rem", fontWeight: "700", color: "var(--gold)" }}>✅ Data Corrections</h4>
              <p style={{ margin: 0, color: "var(--muted)", fontSize: ".9rem" }}>
                Wrong fee, incorrect platforms, or outdated information? Let us know the correct details.
              </p>
            </div>
            <div>
              <h4 style={{ margin: "0 0 8px 0", fontSize: "1rem", fontWeight: "700", color: "var(--gold)" }}>📊 Missing Firms</h4>
              <p style={{ margin: 0, color: "var(--muted)", fontSize: ".9rem" }}>
                Know a legitimate prop firm we're missing? Send us their details and we'll verify.
              </p>
            </div>
            <div>
              <h4 style={{ margin: "0 0 8px 0", fontSize: "1rem", fontWeight: "700", color: "var(--gold)" }}>🛠️ Tool Improvements</h4>
              <p style={{ margin: 0, color: "var(--muted)", fontSize: ".9rem" }}>
                Think our calculators or comparison tools could be better? Tell us how.
              </p>
            </div>
            <div>
              <h4 style={{ margin: "0 0 8px 0", fontSize: "1rem", fontWeight: "700", color: "var(--gold)" }}>🎯 New Features</h4>
              <p style={{ margin: 0, color: "var(--muted)", fontSize: ".9rem" }}>
                What would make Propfundsy more useful for you?
              </p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: "60px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "24px" }}>Frequently Asked Questions</h2>

          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "12px" }}>How often do you update firm data?</h3>
            <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
              We update data continuously as firms make changes. However, firms change their terms frequently. Always verify directly with the firm before funding.
            </p>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "12px" }}>Can I request you remove a firm?</h3>
            <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
              We list legitimate firms that are operating. If you have evidence a firm is fraudulent or unethical, email us with details and we'll investigate.
            </p>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "12px" }}>Do you accept sponsorships or paid listings?</h3>
            <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
              No. We maintain independence and don't accept payment for listings. Affiliate links help us sustain the platform, but don't influence our data or recommendations.
            </p>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "12px" }}>How is Propfundsy making money?</h3>
            <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
              We earn affiliate commissions when you fund accounts through our links. This doesn't affect your cost—it's how we keep the platform free and maintained. We may also display ads in the future.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "12px" }}>Can I contribute data or become an affiliate?</h3>
            <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
              Email us! We're always looking to improve our data and expand partnerships.
            </p>
          </div>
        </section>

        <section style={{
          padding: "32px",
          background: "rgba(62,207,142,.05)",
          border: "1px solid rgba(62,207,142,.2)",
          borderRadius: "12px",
          textAlign: "center",
        }}>
          <h3 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "12px", color: "var(--green)" }}>
            Ready to reach out?
          </h3>
          <p style={{ margin: "0 0 20px 0", color: "var(--text)", lineHeight: "1.6" }}>
            Send us an email. We read every message and respond within 24 hours.
          </p>
          <a href="mailto:saikishor.patil@gmail.com" style={{
            display: "inline-block",
            padding: "12px 32px",
            background: "var(--gold)",
            color: "var(--bg)",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
            transition: "all .2s",
          }}>
            Send an Email →
          </a>
        </section>
      </div>
      <Footer />
    </>
  );
}
