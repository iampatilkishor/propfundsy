import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog — Propfundsy",
  description: "Latest insights on prop trading firms, funding strategies, and market trends. Updated regularly with analysis, guides, and trader tips.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    title: "Propfundsy Blog",
    description: "Prop trading insights and guides",
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  // Remove duplicates by slug
  const uniquePosts = Array.from(new Map(posts.map(p => [p.slug, p])).values());
  const featured = uniquePosts.filter((p) => p.featured);
  const recent = uniquePosts.slice(0, 10);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Propfundsy Blog",
    url: `${SITE_URL}/blog`,
    description: "Prop trading insights and guides",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />

      <section>
        <h1>Propfundsy Blog</h1>
        <p className="sec-sub">Insights on prop trading firms, funding strategies, and market trends.</p>
      </section>

      {featured.length > 0 && (
        <section>
          <h2 className="sec-label">Featured</h2>
          <div className="blog-featured">
            {featured.map((p) => (
              <article key={p.slug} className="blog-card featured">
                <div>
                  <h3>
                    <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                  </h3>
                  <div className="blog-meta">
                    <time>
                      {new Date(p.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                    </time>
                    {p.category && <span className="blog-cat">{p.category}</span>}
                  </div>
                  <p className="blog-desc">{p.description}</p>
                  <Link href={`/blog/${p.slug}`} className="read-more">
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {recent.length > 0 && (
        <section>
          <h2 className="sec-label">Latest</h2>
          <div className="blog-list">
            {recent.map((p) => (
              <article key={p.slug} className="blog-item">
                <div className="blog-item-head">
                  <h3>
                    <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                  </h3>
                  <div className="blog-meta">
                    <time className="blog-date">
                      {new Date(p.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                    </time>
                    {p.category && <span className="blog-cat">{p.category}</span>}
                  </div>
                </div>
                <p className="blog-desc">{p.description}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {uniquePosts.length === 0 && (
        <section>
          <p className="sec-sub">No posts yet. Check back soon.</p>
        </section>
      )}

      <Footer />
    </>
  );
}
