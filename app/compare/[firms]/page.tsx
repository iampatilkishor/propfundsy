import { notFound } from "next/navigation";
import { FIRMS } from "@/lib/data";
import { SITE_URL, slugOf } from "@/lib/seo";
import FirmComparison from "@/components/FirmComparison";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

export async function generateStaticParams() {
  const params = [];
  for (let i = 0; i < FIRMS.length; i++) {
    for (let j = i + 1; j < FIRMS.length; j++) {
      params.push({
        firms: `${slugOf(FIRMS[i])}-vs-${slugOf(FIRMS[j])}`,
      });
    }
  }
  return params;
}

export function generateMetadata({ params }: { params: { firms: string } }) {
  const [slug1, slug2] = params.firms.split("-vs-");
  const firm1 = FIRMS.find((f) => slugOf(f) === slug1);
  const firm2 = FIRMS.find((f) => slugOf(f) === slug2);

  if (!firm1 || !firm2) return {};

  const url = `${SITE_URL}/compare/${params.firms}`;
  const desc = `Compare ${firm1.name} and ${firm2.name} side by side. Profit splits (${firm1.split} vs ${firm2.split}), fees, account sizes, evaluation models, and trading rules.`;

  return {
    title: `${firm1.name} vs ${firm2.name} - Prop Firm Comparison | Propfundsy`,
    description: desc,
    keywords: `${firm1.name}, ${firm2.name}, prop firm comparison, forex funded accounts, trading comparison`,
    canonical: url,
    openGraph: {
      title: `${firm1.name} vs ${firm2.name}`,
      description: desc,
      url,
      type: "article",
      images: [
        {
          url: `${SITE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${firm1.name} vs ${firm2.name}`,
      description: desc,
    },
  };
}

export default function ComparisonPage({ params }: { params: { firms: string } }) {
  const [slug1, slug2] = params.firms.split("-vs-");
  const firm1 = FIRMS.find((f) => slugOf(f) === slug1);
  const firm2 = FIRMS.find((f) => slugOf(f) === slug2);

  if (!firm1 || !firm2) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "ComparisonChart",
    headline: `${firm1.name} vs ${firm2.name} Comparison`,
    description: `Side-by-side comparison of ${firm1.name} and ${firm2.name}`,
    url: `${SITE_URL}/compare/${params.firms}`,
    itemCompared: [
      {
        "@type": "Organization",
        name: firm1.name,
        url: firm1.officialUrl,
      },
      {
        "@type": "Organization",
        name: firm2.name,
        url: firm2.officialUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Nav />
      <section className="comparison-section">
        <div className="comparison-container">
          <Link href="/compare" className="back-link">← Back to comparisons</Link>

          <h1>{firm1.name} vs {firm2.name}</h1>
          <FirmComparison firm1={firm1} firm2={firm2} />

          <div className="comparison-footer">
            <p>
              Always verify current terms on the firm's official website before making a decision.
              Data as of August 2026. Read our <Link href="/blog">blog</Link> for more prop trading insights.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
