import { FAQ_ITEMS } from "@/components/Faq";
import { FIRMS, PLANS } from "@/lib/data";
import { SITE_URL, slugOf } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog";

export default function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Propfundsy",
        description: "Compare forex and futures prop trading firms and their plans side by side.",
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: "Propfundsy",
        url: SITE_URL,
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: FAQ_ITEMS.map((it) => ({
          "@type": "Question",
          name: it.q,
          acceptedAnswer: { "@type": "Answer", text: it.a },
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#firms`,
        name: "Prop trading firms compared on Propfundsy",
        numberOfItems: FIRMS.length,
        itemListElement: FIRMS.map((f, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: f.name,
          url: `${SITE_URL}/firms/${slugOf(f)}`,
        })),
      },
      {
        "@type": "Blog",
        "@id": `${SITE_URL}/blog#blog`,
        name: "Propfundsy Blog",
        description: "Insights on prop trading firms, funding strategies, and market trends",
        url: `${SITE_URL}/blog`,
        blogPost: getAllPosts().slice(0, 10).map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          description: p.description,
          datePublished: p.date,
          dateModified: p.updated ?? p.date,
          url: `${SITE_URL}/blog/${p.slug}`,
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

export const planCount = PLANS.length; // exported for convenience elsewhere
