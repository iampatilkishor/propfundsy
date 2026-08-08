import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Verify Any Prop Firm | Propfundsy",
  description: "Complete guide to verifying prop trading firms. Check licensing, regulations, social media, Discord, red flags, and spot scams. Protect yourself before funding.",
  keywords: "verify prop firm, check firm legitimacy, prop firm scams, due diligence, regulatory check, prop firm verification",
};

export default function VerifyPage() {

  const redFlags = [
    "No clear regulatory information on their website",
    "Asking you to fund through personal PayPal or bank transfer (not proper payment processor)",
    "Guaranteed profits or unrealistic return promises",
    "Pressure to fund immediately or 'limited time offer'",
    "No real office address or phone number listed",
    "Testimonials that all look fake or use stock photos",
    "No clear evaluation rules or account terms",
    "Charging excessive fees upfront without transparent breakdown",
    "Dead or inactive social media accounts",
    "Can't find them on Google or reviews are all negative",
  ];

  const whereToCheck = [
    {
      name: "Regulatory Bodies",
      items: [
        "🇬🇧 UK: FCA Register (fca.org.uk)",
        "🇪🇺 EU/Cyprus: CySEC (cysec.gov.cy)",
        "🇦🇪 UAE: DFSA (dfsa.ae)",
        "🇬🇧 Malta: MFSA (mfsa.mt)",
        "🇺🇸 USA: CFTC NFA (nfa.futures.org)",
        "🇦🇺 Australia: ASIC (asic.gov.au)",
      ],
    },
    {
      name: "Review & Verification Sites",
      items: [
        "⭐ Trustpilot (trustpilot.com) - User reviews",
        "🔍 Forex Peace Army (forexpeaceamy.com) - Broker reviews",
        "🌐 Google Search - Real user feedback",
        "💬 Reddit (r/algotrading, r/Forex, r/trading) - Community discussion",
        "🎯 Complaints Board - See if people reported issues",
      ],
    },
    {
      name: "Company Registration",
      items: [
        "Company House (UK) - companieshouse.gov.uk",
        "Trade Registry - Local business registration",
        "LinkedIn Company Page - Employee count, founding date",
        "Crunchbase - Company details and funding",
        "WhoisGuard/Domain Info - When website was registered",
      ],
    },
  ];

  const whatToLookFor = [
    {
      category: "Licensing & Regulation",
      checks: [
        "✅ Clearly displays regulatory license number",
        "✅ License is verifiable on official regulator's website",
        "✅ Shows regulation for their specific service (not just claiming to be regulated)",
        "✅ Provides license details in Terms & Conditions",
        "✅ No expired or suspended licenses",
      ],
    },
    {
      category: "Company Transparency",
      checks: [
        "✅ Real office address (not just PO Box)",
        "✅ Real phone number that connects to actual person",
        "✅ Clear 'About Us' with company history and founding year",
        "✅ Founder/management team names and backgrounds",
        "✅ Physical address verifiable on Google Maps",
      ],
    },
    {
      category: "Account Safety",
      checks: [
        "✅ Clear terms about what happens to your funds",
        "✅ Segregated client accounts (your money separate from their money)",
        "✅ Clear explanation of evaluation rules",
        "✅ No hidden fees or surprise charges",
        "✅ Transparent withdrawal process and timeline",
      ],
    },
    {
      category: "Financial Indicators",
      checks: [
        "✅ Years in operation (longer = more trustworthy)",
        "✅ Consistent profitability or growth",
        "✅ Real financial reports or audits published",
        "✅ Insurance/protection for client funds",
        "✅ Clear fee structure: evaluation cost, monthly fees, profit split",
      ],
    },
  ];

  const socialMediaChecks = [
    {
      platform: "Discord Server",
      checks: [
        "Check member count and activity - Active community = good sign",
        "Read recent messages - Are people reporting issues or withdrawing funds?",
        "Look for moderators - Are they responsive and removing scam messages?",
        "Check if traders are showing real results or vague hype",
        "See if admin/staff are present and answering questions",
        "Watch for overpromising or cult-like pressure to fund",
        "Look for complaints being suppressed (bad sign)",
      ],
    },
    {
      platform: "Twitter/X",
      checks: [
        "How long is the account active? (New account = suspicious)",
        "Check tweet history - Is it promotional hype or real updates?",
        "Look at engagement - Real followers or fake bot accounts?",
        "See if they respond to negative comments or delete them",
        "Check for verification badge (blue checkmark)",
        "Look for news coverage or press mentions",
      ],
    },
    {
      platform: "LinkedIn",
      checks: [
        "Company page exists with employee count",
        "Founders have real LinkedIn profiles with history",
        "Current and past employees listed (cross-check names)",
        "Employee testimonials are detailed, not generic",
        "Check if staff move in/out frequently (bad retention = bad sign)",
        "Company posts regular updates, not just promotion",
      ],
    },
    {
      platform: "YouTube",
      checks: [
        "Check if they have a real channel or just reposted content",
        "Read comments - Are people complaining about withdrawals?",
        "Look at subscriber growth - Is it organic or bought?",
        "Check video dates - Are they recent or recycled old content?",
        "Watch for fake testimonial videos with actors",
      ],
    },
    {
      platform: "Instagram/TikTok",
      checks: [
        "Check follower count vs engagement - High followers but low likes = fake",
        "Look at comments - Are they real or bot comments?",
        "Check posting frequency - Consistent activity = real account",
        "Look for trader testimonials showing real account screenshots",
        "Be skeptical of 'instant profits' or 'easy money' messaging",
      ],
    },
  ];

  const commonScams = [
    {
      scam: "The 'Unlimited Leverage' Promise",
      how: "Firm claims you can use 1:500 or higher leverage with no risk management. No real firm offers this.",
      detect: "Real firms cap leverage and teach risk management.",
    },
    {
      scam: "The 'Guaranteed Profit Share'",
      how: "Promise of 80%+ profit split or guaranteed returns. Impossible and illegal.",
      detect: "Real firms make money from evaluation fees, not guaranteed profits.",
    },
    {
      scam: "The 'Fake Withdrawal' Trap",
      how: "You pass the eval, request withdrawal, then get told 'system error' and to pay a 'processing fee' to release funds.",
      detect: "Request a withdrawal during chat support before funding. If they hesitate, it's a scam.",
    },
    {
      scam: "The 'Account Suspension' Scam",
      how: "Your account gets 'suspended' after you fund. They claim technical issues then pressure you to buy another account.",
      detect: "Check Trustpilot for 'suspended account' complaints.",
    },
    {
      scam: "The 'Fake Regulations' Claim",
      how: "Firm claims to be regulated by a body they're not actually registered with.",
      detect: "Always verify directly with the regulator, don't trust the firm's claim.",
    },
    {
      scam: "The 'Too Good to Be True' Firm",
      how: "Brand new firm offering better terms than established firms (lower eval cost, higher profit split).",
      detect: "New firms need time to prove themselves. Established firms (5+ years) are safer.",
    },
  ];

  const checklist = [
    { step: "1. Regulatory Check", task: "Verify license on official regulator's website (FCA, DFSA, CFTC, etc.)" },
    { step: "2. Company Basics", task: "Check real office address on Google Maps, verify phone number works" },
    { step: "3. Online Reviews", task: "Read Trustpilot, Forex Peace Army, Reddit - Look for patterns" },
    { step: "4. Social Media Deep Dive", task: "Check Discord (member activity), Twitter (account age & engagement), LinkedIn (employee verification)" },
    { step: "5. Website Scrutiny", task: "Check registration date, look for hidden fees in fine print, verify testimonials" },
    { step: "6. Terms & Conditions", task: "Read withdrawal process, fund segregation, evaluation rules clearly stated" },
    { step: "7. Direct Contact Test", task: "Email support with a real question - Response time and quality matters" },
    { step: "8. Trader Community", task: "Join their Discord/Telegram and ask traders if they've successfully withdrawn funds" },
    { step: "9. Years in Operation", task: "Verify how long they've been operating (5+ years = more trustworthy)" },
    { step: "10. Final Gut Check", task: "If something feels off, trust your instinct. There are plenty of legitimate firms." },
  ];

  const resources = [
    {
      category: "Regulatory Verification",
      links: [
        { name: "FCA Register (UK)", url: "https://register.fca.org.uk" },
        { name: "DFSA Register (UAE)", url: "https://www.dfsa.ae" },
        { name: "CySEC Register (Cyprus)", url: "https://www.cysec.gov.cy" },
        { name: "MFSA (Malta)", url: "https://www.mfsa.mt" },
        { name: "NFA (USA Futures)", url: "https://www.nfa.futures.org" },
      ],
    },
    {
      category: "Review Sites",
      links: [
        { name: "Trustpilot", url: "https://www.trustpilot.com" },
        { name: "Forex Peace Army", url: "https://www.forexpeaceamy.com" },
        { name: "Reddit r/algotrading", url: "https://reddit.com/r/algotrading" },
      ],
    },
    {
      category: "Company Research",
      links: [
        { name: "Companies House (UK)", url: "https://www.companieshouse.gov.uk" },
        { name: "LinkedIn", url: "https://www.linkedin.com" },
        { name: "Crunchbase", url: "https://www.crunchbase.com" },
      ],
    },
  ];

  return (
    <>
      <Nav />

      <section className="tools-hero">
        <div className="tools-hero-content">
          <h1>How to Verify Any Prop Firm</h1>
          <p>Protect yourself. Learn the exact steps to check if a prop firm is legitimate before you fund.</p>
        </div>
      </section>

      <section className="tools-grid">
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "60px 24px" }}>
          {/* Quick Red Flags */}
          <div style={{ marginBottom: "60px" }}>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "24px", fontWeight: "700" }}>🚩 Quick Red Flags</h2>
            <p style={{ color: "var(--muted)", marginBottom: "24px" }}>
              If you see any of these, don't fund. Not even once.
            </p>
            <div style={{
              display: "grid",
              gap: "12px",
            }}>
              {redFlags.map((flag, i) => (
                <div key={i} style={{
                  padding: "16px",
                  background: "rgba(240, 97, 109, 0.05)",
                  border: "1px solid rgba(240, 97, 109, 0.2)",
                  borderRadius: "8px",
                  borderLeft: "4px solid var(--red)",
                }}>
                  <span style={{ color: "var(--text)" }}>❌ {flag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Where to Check */}
          <div style={{ marginBottom: "60px" }}>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "24px", fontWeight: "700" }}>🔍 Where to Check</h2>
            <div style={{ display: "grid", gap: "24px" }}>
              {whereToCheck.map((section, i) => (
                <div key={i} style={{
                  padding: "24px",
                  background: "linear-gradient(135deg, var(--card) 0%, rgba(30,36,48,.5) 100%)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                }}>
                  <h3 style={{ marginBottom: "16px", fontSize: "1.2rem", fontWeight: "700" }}>{section.name}</h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {section.items.map((item, j) => (
                      <li key={j} style={{
                        padding: "10px 0",
                        borderBottom: j < section.items.length - 1 ? "1px solid var(--border)" : "none",
                        color: "var(--text)",
                      }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* What to Look For */}
          <div style={{ marginBottom: "60px" }}>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "24px", fontWeight: "700" }}>✅ What to Look For</h2>
            <div style={{ display: "grid", gap: "24px" }}>
              {whatToLookFor.map((section, i) => (
                <div key={i} style={{
                  padding: "24px",
                  background: "linear-gradient(135deg, var(--card) 0%, rgba(30,36,48,.5) 100%)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                }}>
                  <h3 style={{ marginBottom: "16px", fontSize: "1.2rem", fontWeight: "700", color: "var(--gold)" }}>
                    {section.category}
                  </h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {section.checks.map((check, j) => (
                      <li key={j} style={{
                        padding: "10px 0",
                        borderBottom: j < section.checks.length - 1 ? "1px solid var(--border)" : "none",
                        color: "var(--text)",
                      }}>
                        {check}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Social Media & Community Deep Dive */}
          <div style={{ marginBottom: "60px" }}>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "24px", fontWeight: "700" }}>💬 Social Media & Community Deep Dive</h2>
            <p style={{ color: "var(--muted)", marginBottom: "24px" }}>
              People reveal truth on social media. Here's what to look for on each platform.
            </p>
            <div style={{ display: "grid", gap: "24px" }}>
              {socialMediaChecks.map((section, i) => (
                <div key={i} style={{
                  padding: "24px",
                  background: "linear-gradient(135deg, var(--card) 0%, rgba(30,36,48,.5) 100%)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                }}>
                  <h3 style={{ marginBottom: "16px", fontSize: "1.2rem", fontWeight: "700" }}>{section.platform}</h3>
                  <ul style={{ listStyle: "none", padding: "0 0 0 16px", margin: 0 }}>
                    {section.checks.map((check, j) => (
                      <li key={j} style={{
                        padding: "8px 0",
                        color: "var(--text)",
                        marginLeft: "0",
                      }}>
                        • {check}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Common Scams */}
          <div style={{ marginBottom: "60px" }}>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "24px", fontWeight: "700" }}>⚠️ Common Scams (And How to Spot Them)</h2>
            <div style={{ display: "grid", gap: "20px" }}>
              {commonScams.map((scam, i) => (
                <div key={i} style={{
                  padding: "24px",
                  background: "rgba(212,175,106,0.05)",
                  border: "1px solid rgba(212,175,106,0.2)",
                  borderRadius: "12px",
                }}>
                  <h3 style={{ margin: "0 0 12px 0", fontSize: "1.1rem", fontWeight: "700", color: "var(--gold)" }}>
                    {scam.scam}
                  </h3>
                  <p style={{ margin: "0 0 8px 0", color: "var(--muted)" }}>
                    <strong>How it works:</strong> {scam.how}
                  </p>
                  <p style={{ margin: 0, color: "var(--text)" }}>
                    <strong>How to spot it:</strong> {scam.detect}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Checklist */}
          <div style={{ marginBottom: "60px" }}>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "24px", fontWeight: "700" }}>📋 Complete Verification Checklist</h2>
            <p style={{ color: "var(--muted)", marginBottom: "24px" }}>
              Use this 10-step checklist before funding any firm. Check every box.
            </p>
            <div style={{
              padding: "24px",
              background: "linear-gradient(135deg, var(--card) 0%, rgba(30,36,48,.5) 100%)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
            }}>
              {checklist.map((item, i) => (
                <div key={i} style={{
                  padding: "16px",
                  borderBottom: i < checklist.length - 1 ? "1px solid var(--border)" : "none",
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                }}>
                  <div style={{
                    flexShrink: 0,
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "var(--gold)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "700",
                    fontSize: ".9rem",
                    color: "var(--bg)",
                  }}>
                    ✓
                  </div>
                  <div>
                    <h4 style={{ margin: "0 0 4px 0", fontSize: "1rem", fontWeight: "700", color: "var(--text)" }}>
                      {item.step}
                    </h4>
                    <p style={{ margin: 0, color: "var(--muted)", fontSize: ".95rem" }}>
                      {item.task}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Resources */}
          <div style={{ marginBottom: "60px" }}>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "24px", fontWeight: "700" }}>🔗 Verification Resources</h2>
            <div style={{ display: "grid", gap: "24px" }}>
              {resources.map((section, i) => (
                <div key={i} style={{
                  padding: "24px",
                  background: "linear-gradient(135deg, var(--card) 0%, rgba(30,36,48,.5) 100%)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                }}>
                  <h3 style={{ marginBottom: "16px", fontSize: "1.2rem", fontWeight: "700" }}>{section.category}</h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {section.links.map((link, j) => (
                      <li key={j} style={{
                        padding: "10px 0",
                        borderBottom: j < section.links.length - 1 ? "1px solid var(--border)" : "none",
                      }}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" style={{
                          color: "var(--gold)",
                          textDecoration: "none",
                          fontWeight: "500",
                        }}>
                          {link.name} →
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Final Word */}
          <div style={{
            padding: "32px",
            background: "rgba(62, 207, 142, 0.05)",
            border: "1px solid rgba(62, 207, 142, 0.2)",
            borderRadius: "12px",
            textAlign: "center",
          }}>
            <h3 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "12px", color: "var(--green)" }}>
              Trust Your Gut
            </h3>
            <p style={{ margin: 0, color: "var(--text)", lineHeight: "1.6" }}>
              If something feels wrong, it probably is. There are hundreds of legitimate prop firms out there. Never fund one just because you're impatient. Take your time, verify thoroughly, and protect your capital.
            </p>
          </div>

          {/* CTA */}
          <div style={{
            marginTop: "60px",
            padding: "32px",
            background: "linear-gradient(135deg, rgba(79,140,255,.1) 0%, rgba(212,175,106,.05) 100%)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            textAlign: "center",
          }}>
            <h3 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "12px" }}>
              Ready to Find a Verified Firm?
            </h3>
            <p style={{ color: "var(--muted)", marginBottom: "24px" }}>
              Check our database of verified prop firms. We've done the research for you.
            </p>
            <Link href="/compare" style={{
              display: "inline-block",
              padding: "12px 32px",
              background: "var(--gold)",
              color: "var(--bg)",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
              transition: "all .2s",
            }}>
              Browse Verified Firms →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
