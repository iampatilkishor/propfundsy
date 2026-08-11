import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Propfundsy",
  description: "Cookie Policy for Propfundsy. Learn how we use cookies and tracking technologies.",
};

export default function CookiePolicyPage() {
  return (
    <>
      <Nav />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "60px 24px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "32px", fontWeight: "800" }}>Cookie Policy</h1>
        <p style={{ color: "var(--muted)", marginBottom: "32px" }}>
          Last updated: August 2026
        </p>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>1. What Are Cookies?</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            Cookies are small data files stored on your device (computer, tablet, smartphone) when you visit a website. They help websites remember information about you and your preferences. Cookies can be "persistent" (stored until they expire) or "session" (deleted when you close your browser).
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>2. Why We Use Cookies</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7", marginBottom: "16px" }}>
            Propfundsy uses cookies and similar technologies to:
          </p>
          <ul style={{ color: "var(--text)", lineHeight: "1.8", paddingLeft: "24px" }}>
            <li><strong>Essential Functionality:</strong> Maintain your session, remember your preferences, and enable core features</li>
            <li><strong>Analytics:</strong> Understand how users interact with our Site using Google Analytics and similar tools</li>
            <li><strong>Performance:</strong> Improve Site speed and reliability</li>
            <li><strong>Marketing:</strong> Track which links you click to optimize our offerings</li>
            <li><strong>Advertising:</strong> Show you relevant ads on other websites (retargeting)</li>
            <li><strong>Security:</strong> Detect and prevent fraudulent activity</li>
          </ul>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>3. Types of Cookies We Use</h2>

          <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "12px", marginTop: "20px" }}>Essential Cookies</h3>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            Required for basic Site functionality. These cannot be disabled:
          </p>
          <ul style={{ color: "var(--text)", lineHeight: "1.8", paddingLeft: "24px", marginTop: "8px" }}>
            <li>Session cookies (remember you're logged in)</li>
            <li>Security cookies (prevent unauthorized access)</li>
            <li>Preference cookies (remember your settings)</li>
          </ul>

          <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "12px", marginTop: "20px" }}>Analytics Cookies</h3>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            Help us understand Site usage:
          </p>
          <ul style={{ color: "var(--text)", lineHeight: "1.8", paddingLeft: "24px", marginTop: "8px" }}>
            <li>Google Analytics (_ga, _gid) - Track pages visited and user behavior</li>
            <li>Heatmap tools - Understand where users click</li>
          </ul>

          <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "12px", marginTop: "20px" }}>Marketing Cookies</h3>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            Used for retargeting and advertising:
          </p>
          <ul style={{ color: "var(--text)", lineHeight: "1.8", paddingLeft: "24px", marginTop: "8px" }}>
            <li>Facebook Pixel - Show you ads on Facebook</li>
            <li>Google Ads - Retargeting across Google properties</li>
            <li>Affiliate tracking - Track which links converted to sales</li>
          </ul>

          <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "12px", marginTop: "20px" }}>Third-Party Cookies</h3>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            Placed by partners and service providers:
          </p>
          <ul style={{ color: "var(--text)", lineHeight: "1.8", paddingLeft: "24px", marginTop: "8px" }}>
            <li>Google services (Analytics, Ads, reCAPTCHA)</li>
            <li>Social media widgets</li>
            <li>Payment processors</li>
            <li>Content delivery networks</li>
          </ul>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>4. How Long Do Cookies Last?</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            Different cookies have different lifespans:
          </p>
          <ul style={{ color: "var(--text)", lineHeight: "1.8", paddingLeft: "24px", marginTop: "12px" }}>
            <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
            <li><strong>Essential cookies:</strong> Typically last 1-2 years</li>
            <li><strong>Analytics cookies:</strong> Typically last 1-2 years</li>
            <li><strong>Marketing cookies:</strong> Vary by service (7 days to 2+ years)</li>
          </ul>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>5. Your Cookie Choices</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7", marginBottom: "16px" }}>
            You have control over cookies:
          </p>

          <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "10px", marginTop: "16px" }}>Browser Settings</h3>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            You can configure your browser to reject cookies or alert you when cookies are set. Instructions for popular browsers:
          </p>
          <ul style={{ color: "var(--text)", lineHeight: "1.8", paddingLeft: "24px", marginTop: "8px" }}>
            <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
            <li><strong>Firefox:</strong> Preferences → Privacy & Security → Cookies and Site Data</li>
            <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
            <li><strong>Edge:</strong> Settings → Privacy → Cookies and other site data</li>
          </ul>

          <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "10px", marginTop: "16px" }}>Opting Out</h3>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            You can opt out of specific tracking:
          </p>
          <ul style={{ color: "var(--text)", lineHeight: "1.8", paddingLeft: "24px", marginTop: "8px" }}>
            <li><strong>Google Analytics:</strong> Install the <a href="https://tools.google.com/dlpage/gaoptout" style={{ color: "var(--gold)" }}>Google Analytics Opt-out Browser Add-on</a></li>
            <li><strong>Facebook Pixel:</strong> Adjust your ad preferences on Facebook</li>
            <li><strong>Advertising:</strong> Visit <a href="https://optout.aboutads.info/" style={{ color: "var(--gold)" }}>AboutAds.info</a></li>
          </ul>

          <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "10px", marginTop: "16px" }}>Do Not Track</h3>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            Some browsers have a "Do Not Track" feature. While we respect this signal, we cannot guarantee all third-party services will honor it.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>6. Disabling Cookies</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7", marginBottom: "16px" }}>
            <strong>Important:</strong> Disabling cookies may limit your ability to use some features of Propfundsy. For example, you may not be able to:
          </p>
          <ul style={{ color: "var(--text)", lineHeight: "1.8", paddingLeft: "24px" }}>
            <li>Save your table filter preferences</li>
            <li>Use the comparison tools effectively</li>
            <li>Maintain your session</li>
          </ul>
          <p style={{ color: "var(--text)", lineHeight: "1.7", marginTop: "16px" }}>
            Essential cookies cannot be disabled and are necessary for the Site to function.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>7. Third-Party Privacy Policies</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            Third parties that place cookies on our Site have their own privacy policies. We recommend reviewing:
          </p>
          <ul style={{ color: "var(--text)", lineHeight: "1.8", paddingLeft: "24px", marginTop: "12px" }}>
            <li><a href="https://policies.google.com/privacy" style={{ color: "var(--gold)" }}>Google Privacy Policy</a></li>
            <li><a href="https://www.facebook.com/privacy/explanation" style={{ color: "var(--gold)" }}>Facebook Privacy Policy</a></li>
            <li>Your internet service provider's privacy policy</li>
          </ul>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>8. Changes to This Policy</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            We may update this Cookie Policy to reflect changes in our practices or technology. We'll update the "Last updated" date when we make changes.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>9. Contact Us</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            If you have questions about this Cookie Policy or our cookie practices, contact us at:
          </p>
          <p style={{ color: "var(--text)", lineHeight: "1.7", marginTop: "16px" }}>
            <strong>Email:</strong> saikishor.patil@gmail.com
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}
