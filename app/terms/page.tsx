import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Propfundsy",
  description: "Terms of Service for Propfundsy. Read our terms and conditions before using our platform.",
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "60px 24px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "32px", fontWeight: "800" }}>Terms of Service</h1>
        <p style={{ color: "var(--muted)", marginBottom: "32px" }}>
          Last updated: August 2026
        </p>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>1. Agreement to Terms</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            By accessing and using Propfundsy ("Site," "we," "us," "our"), you accept and agree to be bound by and comply with these Terms of Service. If you do not agree to abide by the above, please do not use this service.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>2. Use License</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7", marginBottom: "16px" }}>
            Permission is granted to temporarily download one copy of the materials (information or software) on Propfundsy for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul style={{ color: "var(--text)", lineHeight: "1.8", paddingLeft: "24px" }}>
            <li>Modifying or copying the materials</li>
            <li>Using the materials for any commercial purpose or for any public display</li>
            <li>Attempting to reverse engineer, decompile, or disassemble any software</li>
            <li>Removing any copyright or other proprietary notations from the materials</li>
            <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
            <li>Violating any applicable laws or regulations</li>
          </ul>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>3. Disclaimer</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7", marginBottom: "16px" }}>
            The materials on Propfundsy are provided on an 'as is' basis. Propfundsy makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>4. Limitations</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            In no event shall Propfundsy or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Propfundsy.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>5. Accuracy of Materials</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            The materials appearing on Propfundsy could include technical, typographical, or photographic errors. Propfundsy does not warrant that any of the materials on its Site are accurate, complete, or current. Propfundsy may make changes to the materials contained on its Site at any time without notice.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>6. Links</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7", marginBottom: "16px" }}>
            Propfundsy has not reviewed all of the sites linked to its Site and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Propfundsy of the site. Use of any such linked website is at the user's own risk.
          </p>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            We provide affiliate links to prop trading firms. We may receive compensation when you click these links. This does not affect your purchase price.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>7. Modifications</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            Propfundsy may revise these terms of service for its Site at any time without notice. By using this Site, you are agreeing to be bound by the then current version of these terms of service.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>8. Governing Law</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            These terms and conditions are governed by and construed in accordance with the laws of the United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>9. User Content</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            If you submit, post, or display content on Propfundsy, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, reproduce, process, adapt, modify, publish, transmit, display and distribute such content in any media or distribution method.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px" }}>10. Contact Information</h2>
          <p style={{ color: "var(--text)", lineHeight: "1.7" }}>
            If you have any questions about these Terms of Service, please contact us at saikishor.patil@gmail.com.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}
