"use client";
import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

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
          <Link href="/tools" onClick={() => setMenuOpen(false)}>Tools</Link>
          <Link href="/how-to-verify" onClick={() => setMenuOpen(false)}>Verify</Link>
          <Link href="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link className="nav-cta" href="/#plans" onClick={() => setMenuOpen(false)}>Find Your Firm</Link>
        </div>
      </div>
    </nav>
  );
}
