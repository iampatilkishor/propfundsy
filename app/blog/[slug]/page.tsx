import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getAllPosts, getPost, postExists } from "@/lib/blog";
import { SITE_URL } from "@/lib/seo";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!postExists(slug)) return {};
  const p = getPost(slug);
  const desc = p.description || `Read ${p.title} on Propfundsy`;
  return {
    title: p.title,
    description: desc,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/blog/${slug}`,
      title: p.title,
      description: desc,
      publishedTime: p.date,
      modifiedTime: p.updated,
      authors: p.author ? [p.author] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: p.title,
      description: desc,
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!postExists(slug)) notFound();
  const p = getPost(slug);
  const allPosts = getAllPosts();
  const idx = allPosts.findIndex((x) => x.slug === slug);
  const next = idx > 0 ? allPosts[idx - 1] : null;
  const prev = idx < allPosts.length - 1 ? allPosts[idx + 1] : null;

  const authorName = p.author && p.author.trim() ? p.author.trim() : "Propfundsy";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    dateModified: p.updated ?? p.date,
    author: {
      "@type": authorName === "Propfundsy" ? "Organization" : "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Propfundsy",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />

      <section>
      <article className="blog-post">
        <p className="crumb">
          <Link href="/blog">← Blog</Link>
        </p>

        <header className="blog-post-head">
          <h1>{p.title}</h1>
          <div className="blog-post-meta">
            <time dateTime={p.date}>
              {new Date(p.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </time>
            {p.author && <span className="blog-author">by {p.author}</span>}
            {p.category && <span className="blog-cat">{p.category}</span>}
            {p.updated && (
              <span className="blog-updated">
                Updated {new Date(p.updated).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
              </span>
            )}
          </div>
        </header>

        <div className="blog-content" dangerouslySetInnerHTML={{ __html: p.html }} />

        <nav className="blog-nav">
          {prev && (
            <Link href={`/blog/${prev.slug}`} className="blog-nav-item prev">
              <span>← Previous</span>
              <span className="blog-nav-title">{prev.title}</span>
            </Link>
          )}
          {next && (
            <Link href={`/blog/${next.slug}`} className="blog-nav-item next">
              <span>Next →</span>
              <span className="blog-nav-title">{next.title}</span>
            </Link>
          )}
        </nav>
      </article>
      </section>

      <Footer />
    </>
  );
}
