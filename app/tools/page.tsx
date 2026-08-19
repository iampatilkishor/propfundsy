import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trading Calculators & Tools | Propfundsy",
  description: "Professional trading calculators: Leverage Impact, Loss Recovery, Win Rate Analysis, Position Size, and Compounding Calculator. Risk management tools for prop traders.",
  keywords: "trading calculator, position size calculator, leverage calculator, compounding calculator, risk management, prop trading tools",
};

export default function ToolsPage() {
  const tools = [
    {
      id: "leverage",
      title: "Leverage Impact Calculator",
      description: "See how leverage turns small moves into big losses. Understand the real risk of leveraged trading.",
      icon: "📊",
      color: "#4f8cff",
    },
    {
      id: "recovery",
      title: "Loss Recovery Calculator",
      description: "How much gain do you need to get back to break even? Visualize the harsh math of drawdowns.",
      icon: "📈",
      color: "#d4af6a",
    },
    {
      id: "edge",
      title: "Win Rate × R:R Edge Calculator",
      description: "Find out if your strategy has a mathematical edge — and how strong it is.",
      icon: "🎯",
      color: "#3ecf8e",
    },
    {
      id: "position",
      title: "Position Size Calculator",
      description: "Risk a fixed % of your account — never more, never less. Professional position sizing.",
      icon: "⚙️",
      color: "#a78bfa",
    },
    {
      id: "compound",
      title: "Compounding Calculator",
      description: "Watch consistent returns build exponential wealth over time. The power of compounding visualized.",
      icon: "💹",
      color: "#f0616d",
    },
  ];

  return (
    <>
      <Nav />

      <section className="tools-hero">
        <div className="tools-hero-content">
          <h1>Professional Trading Tools</h1>
          <p>Master risk management with calculators built for serious traders. Make data-driven decisions.</p>
        </div>
      </section>

      <section className="tools-grid">
        <div className="tools-container">
          <div className="tools-list">
            {tools.map((tool) => (
              <Link key={tool.id} href={`/tools/${tool.id}`} className="tool-card">
                <div className="tool-icon" style={{ color: tool.color }}>
                  {tool.icon}
                </div>
                <div className="tool-content">
                  <h3>{tool.title}</h3>
                  <p>{tool.description}</p>
                </div>
                <div className="tool-arrow">→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="tools-cta">
        <div className="tools-cta-content">
          <h2>Ready to Trade Smarter?</h2>
          <p>Use these tools to understand your risk, plan your positions, and build lasting wealth through consistent trading.</p>
          <div className="tools-cta-buttons">
            <Link href="/#firms" className="btn btn-gold">
              Find Your Firm
            </Link>
            <Link href="/compare" className="btn btn-ghost">
              Compare Firms
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
