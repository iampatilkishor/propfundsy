import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BlogSearch from "@/components/BlogSearch";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/seo";

// Auto-submit new blog posts to IndexNow when page loads
async function autoSubmitNewPosts() {
  try {
    await fetch(`${SITE_URL}/api/auto-submit-blogs`, {
      method: "GET",
      cache: "no-store",
    });
  } catch (error) {
    console.error("[Blog] Error auto-submitting posts:", error);
  }
}

export const metadata: Metadata = {
  title: "Prop Trading Blog: Strategies, Guides & Trader Insights — Propfundsy",
  description:
    "Expert prop trading blog with guides on firm evaluation, risk management, trading psychology, and proven strategies. Real trader experiences and actionable tips.",
  keywords:
    "prop trading blog, prop firm guides, trading strategies, prop evaluation, risk management, trading psychology, trader guides",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    title: "Prop Trading Blog: Strategies & Guides — Propfundsy",
    description:
      "Expert insights on prop trading firms, evaluation strategies, and proven trader techniques",
    siteName: "Propfundsy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prop Trading Blog — Propfundsy",
    description: "Expert strategies and guides for prop traders",
  },
};

export default async function BlogIndex() {
  // Auto-submit new posts to IndexNow (runs in background)
  autoSubmitNewPosts();

  const posts = getAllPosts();
  // Remove duplicates by slug
  const uniquePosts = Array.from(
    new Map(posts.map((p) => [p.slug, p])).values(),
  );
  const featured = uniquePosts.filter((p) => p.featured);
  const recent = uniquePosts.slice(0, 10);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Propfundsy Blog",
    url: `${SITE_URL}/blog`,
    description: "Expert insights on prop trading firms, evaluation strategies, risk management, and trading psychology. Learn from real trader experiences.",
    publisher: {
      "@type": "Organization",
      name: "Propfundsy",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    blogPost: uniquePosts.slice(0, 6).map((p) => {
      const authorName = p.author && p.author.trim() ? p.author.trim() : "Propfundsy";
      return {
        "@type": "BlogPosting",
        headline: p.title,
        description: p.description,
        datePublished: p.date,
        author: {
          "@type": authorName === "Propfundsy" ? "Organization" : "Person",
          name: authorName,
        },
        url: `${SITE_URL}/blog/${p.slug}`,
      };
    }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />

      <section>
        <h1>Prop Trading Blog: Guides, Strategies & Market Insights</h1>
        <p className="sec-sub">Expert insights on prop trading firms, evaluation strategies, risk management, and trading psychology. Learn from real trader experiences and proven techniques to pass evaluations and build consistent profits.</p>
        <p style={{ color: 'var(--muted)', fontSize: '0.95rem', maxWidth: '640px', marginTop: '12px', lineHeight: '1.6' }}>
          Our blog covers everything from choosing legitimate prop firms and avoiding scams to mastering position sizing, journaling, and psychological discipline. Read authentic trader perspectives and actionable strategies.
        </p>

        <BlogSearch allPosts={uniquePosts} />
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
