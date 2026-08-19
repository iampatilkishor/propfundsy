"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

interface SearchResult {
  slug: string;
  title: string;
  category?: string;
}

const TOOLS = [
  { id: "leverage", title: "Leverage Impact Calculator" },
  { id: "recovery", title: "Loss Recovery Calculator" },
  { id: "edge", title: "Win Rate × R:R Edge Calculator" },
  { id: "position", title: "Position Size Calculator" },
  { id: "compound", title: "Compounding Calculator" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/blog/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Search error:", error);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <nav>
      <div className="nav-inner">
        <Link className="logo" href="/">
          Prop<span>fundsy</span>
        </Link>
        <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`nav-links${menuOpen ? " open" : ""}`}>
          <Link href="/#firms" onClick={() => setMenuOpen(false)}>Firms</Link>
          <Link href="/compare" onClick={() => setMenuOpen(false)}>Compare</Link>

          <div className="nav-dropdown">
            <button
              className="nav-dropdown-btn"
              onClick={() => setToolsOpen(!toolsOpen)}
            >
              Tools
              <span className={`dropdown-caret${toolsOpen ? " open" : ""}`}>▼</span>
            </button>
            {toolsOpen && (
              <>
                <div className="nav-dropdown-backdrop" onClick={() => setToolsOpen(false)} />
                <div className="nav-dropdown-menu">
                  {TOOLS.map((tool) => (
                    <Link
                      key={tool.id}
                      href={`/tools/${tool.id}`}
                      className="nav-dropdown-item"
                      onClick={() => {
                        setToolsOpen(false);
                        setMenuOpen(false);
                      }}
                    >
                      {tool.title}
                    </Link>
                  ))}
                  <Link
                    href="/tools"
                    className="nav-dropdown-item all-tools"
                    onClick={() => {
                      setToolsOpen(false);
                      setMenuOpen(false);
                    }}
                  >
                    View All Tools →
                  </Link>
                </div>
              </>
            )}
          </div>

          <Link href="/blog/trading-journal-guide" onClick={() => setMenuOpen(false)}>Journal</Link>
          <Link href="/how-to-verify" onClick={() => setMenuOpen(false)}>Verify</Link>
          <Link href="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>

          <div className="nav-search">
            <div className="nav-search-box">
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                className="nav-search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
            {searchOpen && searchQuery.trim() && (
              <>
                <div className="nav-search-backdrop" onClick={() => setSearchOpen(false)} />
                <div className="nav-search-results">
                  {searchResults.length > 0 ? (
                    searchResults.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="nav-search-item"
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery("");
                          setMenuOpen(false);
                        }}
                      >
                        <div className="search-item-title">{post.title}</div>
                        <div className="search-item-cat">{post.category}</div>
                      </Link>
                    ))
                  ) : (
                    <div className="nav-search-empty">No posts found</div>
                  )}
                </div>
              </>
            )}
          </div>

          <Link className="nav-cta" href="/#plans" onClick={() => setMenuOpen(false)}>Find Your Firm</Link>
        </div>
      </div>
    </nav>
  );
}
