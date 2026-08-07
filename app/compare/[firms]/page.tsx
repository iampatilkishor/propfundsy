import { notFound } from "next/navigation";
import { FIRMS } from "@/lib/data";
import { SITE_URL, slugOf, truncateDesc } from "@/lib/seo";
import FirmComparison from "@/components/FirmComparison";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

// Only pre-render same-category pairs (forex-vs-forex, futures-vs-futures) —
// cross-category comparisons (e.g. a forex challenge firm vs a futures firm)
// aren't a real search intent and would otherwise roughly double the number
// of near-duplicate static pages for no traffic benefit. Cross-category URLs
// still resolve fine on demand (dynamicParams defaults to true), just aren't
// pre-built or listed in the sitemap.
export async function generateStaticParams() {
  const params = [];
  for (let i = 0; i < FIRMS.length; i++) {
    for (let j = i + 1; j < FIRMS.length; j++) {
      if (FIRMS[i].cat !== FIRMS[j].cat) continue;
      params.push({
        firms: `${slugOf(FIRMS[i])}-vs-${slugOf(FIRMS[j])}`,
      });
    }
  }
  return params;
}

export async function generateMetadata(
  { params }: { params: Promise<{ firms: string }> },
) {
  const { firms } = await params;
  const [slug1, slug2] = firms.split("-vs-");
  const firm1 = FIRMS.find((f) => slugOf(f) === slug1);
  const firm2 = FIRMS.find((f) => slugOf(f) === slug2);

  if (!firm1 || !firm2) return {};

  const url = `${SITE_URL}/compare/${firms}`;
  const desc = truncateDesc(
    `Compare ${firm1.name} and ${firm2.name} side by side. Profit splits (${firm1.split} vs ${firm2.split}), fees, account sizes, evaluation models, and trading rules.`,
  );

  return {
    title: `${firm1.name} vs ${firm2.name} - Prop Firm Comparison | Propfundsy`,
    description: desc,
    keywords: `${firm1.name}, ${firm2.name}, prop firm comparison, forex funded accounts, trading comparison`,
    alternates: { canonical: `/compare/${firms}` },
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

export default async function ComparisonPage(
  { params }: { params: Promise<{ firms: string }> },
) {
  const { firms } = await params;
  const [slug1, slug2] = firms.split("-vs-");
  const firm1 = FIRMS.find((f) => slugOf(f) === slug1);
  const firm2 = FIRMS.find((f) => slugOf(f) === slug2);

  if (!firm1 || !firm2) notFound();

  const url = `${SITE_URL}/compare/${firms}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Propfundsy", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Compare", item: `${SITE_URL}/compare` },
          { "@type": "ListItem", position: 3, name: `${firm1.name} vs ${firm2.name}`, item: url },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${url}#page`,
        url,
        name: `${firm1.name} vs ${firm2.name} Comparison`,
        description: `Side-by-side comparison of ${firm1.name} and ${firm2.name}`,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: [
          { "@type": "Organization", name: firm1.name, url: firm1.officialUrl },
          { "@type": "Organization", name: firm2.name, url: firm2.officialUrl },
        ],
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
