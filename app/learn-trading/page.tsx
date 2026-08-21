import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import LearnTradingContent from "./LearnTradingContent";

const PAGE_URL = `${SITE_URL}/learn-trading`;
const TITLE = "Learn Trading Free: A 4-Month Stocks & Options Curriculum (No Signals)";
const DESCRIPTION =
  "A free, four-month curriculum for learning stock and options trading — built from SEC, FINRA, Cboe, CME, MIT and Yale material. 31 resources, no paywalls, no affiliate links.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/learn-trading" },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    siteName: "Propfundsy",
    title: "Learn Trading Free: A 4-Month Stocks & Options Curriculum",
    description:
      "31 free resources from clearing houses, regulators and university faculty. No signals, no tips, no affiliate links.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn Trading Free: A 4-Month Stocks & Options Curriculum",
    description: "31 free resources from clearing houses, regulators and university faculty. No signals, no tips.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Course",
      "@id": `${PAGE_URL}#course`,
      name: "The Free Syllabus: Equities & Options",
      description:
        "A four-month, zero-cost curriculum for learning stock and options trading, assembled from exchange bodies, clearing houses, financial regulators and university faculty.",
      url: PAGE_URL,
      inLanguage: "en",
      isAccessibleForFree: true,
      educationalLevel: "Beginner",
      teaches: [
        "Stock market mechanics",
        "Fundamental analysis",
        "Technical analysis",
        "Options trading",
        "The Greeks",
        "Futures",
        "Risk management",
        "Position sizing",
        "Trading psychology",
      ],
      provider: { "@type": "Organization", name: "Propfundsy", url: SITE_URL },
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", category: "Free", availability: "https://schema.org/InStock" },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "online",
        courseWorkload: "PT6H",
        instructor: { "@type": "Organization", name: "Propfundsy" },
      },
      syllabusSections: [
        { "@type": "Syllabus", name: "Market mechanics and vocabulary", position: 1, timeRequired: "P1M" },
        { "@type": "Syllabus", name: "Reading a business", position: 2, timeRequired: "P1M" },
        { "@type": "Syllabus", name: "Price, structure and position size", position: 3, timeRequired: "P1M" },
        { "@type": "Syllabus", name: "Derivatives", position: 4, timeRequired: "P1M" },
        { "@type": "Syllabus", name: "Practice, psychology and the written record", position: 5, timeRequired: "P3M" },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Can you learn trading for free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The most rigorous trading education available is published free by clearing houses and exchanges — the Options Industry Council's OptionsEducation.org, the Cboe Options Institute and CME Institute — alongside free university courses from MIT OpenCourseWare and Open Yale, regulator material from the SEC and FINRA, and Zerodha Varsity's nine free modules. None require payment or a funded account.",
          },
        },
        {
          "@type": "Question",
          name: "How long does it take to learn trading?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Roughly four months of structured study at five to seven hours per week covers market mechanics, fundamental analysis, technical analysis and options theory, followed by a minimum of ninety days of simulated trading with a written journal before any capital is risked.",
          },
        },
        {
          "@type": "Question",
          name: "What percentage of day traders lose money?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A Brazilian study of index futures day traders found 97 per cent of those who persisted beyond 300 sessions lost money. A fifteen-year Taiwanese study using complete exchange records found fewer than one per cent could predictably earn positive returns net of fees. European regulators found 74 to 89 per cent of retail contract-for-difference accounts lose money.",
          },
        },
        {
          "@type": "Question",
          name: "Where is the best free place to learn options trading?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "OptionsEducation.org, funded by the Options Clearing Corporation since 1992, offers a free nine-course curriculum with a help desk staffed on trading days. The Cboe Options Institute, established in 1985, provides free learning paths and pricing calculators. Both are free and carry no commercial incentive to trade.",
          },
        },
        {
          "@type": "Question",
          name: "What are the most common psychological mistakes traders make?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The most consistently documented are the disposition effect (closing winners early while holding losers), overconfidence leading to overtrading, loss aversion, revenge trading after a loss, outcome bias (judging a trade by its profit rather than whether the rule was followed), anchoring to the entry price, confirmation bias, sunk-cost averaging down, attention-driven entries, hindsight bias, recency bias and the narrative fallacy. Each is identified by a written record made before the outcome is known, not by review from memory.",
          },
        },
        {
          "@type": "Question",
          name: "How do you spot a trading education scam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Common signals include results shown without methodology, paid entry required before being allowed to trade, any use of the word guaranteed, profit screenshots without brokerage statements, a single broker promoted through a personal referral link, and any demand for payment before funds can be withdrawn.",
          },
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: TITLE,
      description:
        "A free, four-month curriculum for learning stock and options trading, assembled from regulator, exchange and university sources.",
      inLanguage: "en",
      isPartOf: { "@type": "WebSite", name: "Propfundsy", url: SITE_URL },
    },
  ],
};

export default function LearnTradingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LearnTradingContent />
    </>
  );
}
