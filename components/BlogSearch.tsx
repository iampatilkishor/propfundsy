"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface BlogPost {
  slug: string;
  title: string;
  description?: string;
  date: string;
  category?: string;
  featured?: boolean;
}

interface SearchResult {
  slug: string;
  title: string;
  category?: string;
}

interface BlogSearchProps {
  allPosts: BlogPost[];
}

export default function BlogSearch({ allPosts }: BlogSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/blog/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSearching(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  if (!isSearching && searchQuery.trim() && searchResults.length > 0) {
    return (
      <div className="blog-page-search" style={{ marginTop: "40px" }}>
        <div style={{ position: "relative", maxWidth: "500px" }}>
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="blog-search-input"
            style={{
              width: "100%",
              padding: "12px 16px 12px 44px",
              background: "var(--bg2)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              color: "var(--text)",
              fontSize: "0.95rem",
              fontFamily: "var(--font-body)",
              outline: "none",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
          <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "1rem" }}>
            🔍
          </span>
        </div>

        <section style={{ marginTop: "40px" }}>
          <h2 className="sec-label">Search Results ({searchResults.length})</h2>
          <div className="blog-list">
            {searchResults.map((result) => {
              const fullPost = allPosts.find((p) => p.slug === result.slug);
              if (!fullPost) return null;
              return (
                <article key={result.slug} className="blog-item">
                  <div className="blog-item-head">
                    <h3>
                      <Link href={`/blog/${result.slug}`}>{result.title}</Link>
                    </h3>
                    <div className="blog-meta">
                      <time className="blog-date">
                        {new Date(fullPost.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                      {result.category && <span className="blog-cat">{result.category}</span>}
                    </div>
                  </div>
                  <p className="blog-desc">{fullPost.description}</p>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="blog-page-search" style={{ marginTop: "40px", maxWidth: "500px" }}>
      <div style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Search blog posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="blog-search-input"
          style={{
            width: "100%",
            padding: "12px 16px 12px 44px",
            background: "var(--bg2)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            color: "var(--text)",
            fontSize: "0.95rem",
            fontFamily: "var(--font-body)",
            outline: "none",
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        />
        <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "1rem" }}>
          🔍
        </span>
      </div>

      {searchQuery.trim() && searchResults.length === 0 && !isSearching && (
        <section style={{ marginTop: "40px" }}>
          <p className="sec-sub" style={{ textAlign: "center" }}>
            No posts found matching "{searchQuery}". Try different keywords.
          </p>
        </section>
      )}
    </div>
  );
}
