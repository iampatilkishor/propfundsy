import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Propfundsy",
  description: "Privacy Policy for Propfundsy. Learn how we collect, use, and protect your personal data.",
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "60px 24px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "32px", fontWeight: "800" }}>Privacy Policy</h1>
        <p style={{ color: "var(--muted)", marginBottom: "32px" }}>
          Last updated: August 2026
        </p>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>1. Introduction</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7", marginBottom: "16px" }}>
            Propfundsy ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website propfundsy.com (the "Site").
          </p>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our Site.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>2. Information We Collect</h2>

          <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "12px", marginTop: "20px" }}>Personal Information</h3>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            We may collect personal information that you provide directly, including but not limited to:
          </p>
          <ul style={{ color: "var(--text)", lineHeight: "1.8", paddingLeft: "24px", marginTop: "12px" }}>
            <li>Name and email address (if you contact us)</li>
            <li>Contact information (phone, mailing address)</li>
            <li>Any other information you voluntarily provide</li>
          </ul>

          <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "12px", marginTop: "20px" }}>Automatically Collected Information</h3>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            When you visit our Site, we automatically collect certain information about your device, including:
          </p>
          <ul style={{ color: "var(--text)", lineHeight: "1.8", paddingLeft: "24px", marginTop: "12px" }}>
            <li>IP address and browser type</li>
            <li>Operating system</li>
            <li>Pages visited and time spent on site</li>
            <li>Referring website</li>
            <li>Device identifiers</li>
            <li>Cookie and tracking data</li>
          </ul>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>3. How We Use Your Information</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7", marginBottom: "16px" }}>
            We use the information we collect for the following purposes:
          </p>
          <ul style={{ color: "var(--text)", lineHeight: "1.8", paddingLeft: "24px" }}>
            <li>To provide, maintain, and improve our Site and services</li>
            <li>To respond to your inquiries and customer service requests</li>
            <li>To send administrative and promotional communications</li>
            <li>To analyze usage patterns and improve user experience</li>
            <li>To comply with legal obligations</li>
            <li>To detect and prevent fraudulent activity</li>
            <li>To display personalized content and advertisements</li>
          </ul>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>4. Cookies and Tracking Technologies</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7", marginBottom: "16px" }}>
            We use cookies and similar tracking technologies to enhance your experience. You can control cookies through your browser settings. However, disabling cookies may limit your access to certain features.
          </p>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            We use analytics services (such as Google Analytics) to understand how users interact with our Site.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>5. Third-Party Links and Services</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            Our Site contains links to third-party websites and services, including links to prop trading firms. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>6. Data Security</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is completely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>7. Your Privacy Rights</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7", marginBottom: "16px" }}>
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul style={{ color: "var(--text)", lineHeight: "1.8", paddingLeft: "24px" }}>
            <li>Right to access your personal data</li>
            <li>Right to request deletion of your data</li>
            <li>Right to opt-out of marketing communications</li>
            <li>Right to data portability</li>
          </ul>
          <p style={{ color: "var(--text)", lineHeight: "1.7", marginTop: "16px" }}>
            To exercise these rights, please contact us at saikishor.patil@gmail.com.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>8. Children's Privacy</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            Our Site is not intended for children under 18 years old. We do not knowingly collect personal information from children. If we discover we have collected information from a child, we will delete it promptly.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>9. Changes to This Policy</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page with an updated "Last updated" date.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>10. Contact Us</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            If you have questions about this Privacy Policy or our privacy practices, please contact us at:
          </p>
          <p style={{ color: "var(--text)", lineHeight: "1.7", marginTop: "16px" }}>
            Email: saikishor.patil@gmail.com
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}
