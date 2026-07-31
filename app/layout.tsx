import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--sora", weight: ["400", "600", "700", "800"] });
const inter = Inter({ subsets: ["latin"], variable: "--inter", weight: ["400", "500", "600"] });

const SITE_URL = "https://propfundsy.com"; // TODO: set to the real production domain before launch

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Propfundsy — Compare Prop Trading Firms & Plans (2026)",
    template: "%s | Propfundsy",
  },
  description:
    "Compare 22+ forex and futures prop trading firms side by side — challenge prices, profit splits, drawdown rules, payout speed and payment methods, updated for 2026.",
  keywords: [
    "prop firm comparison", "prop trading firms", "funded trading account",
    "prop firm challenge", "FTMO alternative", "futures prop firm",
    "forex prop firm", "cheapest prop firm", "instant funding prop firm",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Propfundsy",
    title: "Propfundsy — Compare Prop Trading Firms & Plans",
    description:
      "22+ prop firms, 85+ plans: fees, profit splits, drawdown rules, payout speed and payment methods compared honestly.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Propfundsy — Compare Prop Trading Firms & Plans",
    description:
      "22+ prop firms, 85+ plans: fees, splits, drawdown rules and payout speed compared honestly.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${inter.variable}`}>{children}</body>
    </html>
  );
}
