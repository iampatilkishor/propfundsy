import { Metadata } from "next";
import ComparePicker from "./compare-picker";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Compare Prop Firms Side by Side | Propfundsy",
  description:
    "Compare any two prop trading firms directly. See profit splits, fees, account sizes, evaluation models, and trading rules side by side.",
  keywords:
    "prop firm comparison, forex funded accounts, futures prop trading, compare trading firms",
  canonical: `${SITE_URL}/compare`,
  openGraph: {
    title: "Compare Prop Firms",
    description: "Find the best prop firm for you by comparing two firms directly.",
    url: `${SITE_URL}/compare`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Prop Firms",
    description: "Compare any two prop trading firms side by side.",
  },
};

export default function ComparePage() {
  return (
    <>
      <Nav />
      <section className="compare-picker">
        <div className="compare-picker-container">
          <h1>Compare Two Firms</h1>
          <p className="compare-subtitle">
            Pick any two firms to see a detailed side-by-side comparison of fees, rules, splits, and more.
          </p>

          <ComparePicker />
        </div>
      </section>
      <Footer />
    </>
  );
}
