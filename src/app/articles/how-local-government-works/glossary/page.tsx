"use client";

import { useState } from "react";
import Link from "next/link";
import { GLOSSARY, GLOSSARY_CATEGORIES } from "@/data/civic-guide/glossary";
import type { GlossaryCategory } from "@/data/civic-guide/glossary";
import "@/styles/articles/civic-guide.css";

const CHAPTER_SLUGS: Record<string, string> = {
  I: "why-it-matters",
  II: "taxonomy",
  III: "forms",
  IV: "roles",
  V: "lawmaking",
  VI: "the-meeting",
  VII: "land-use",
  VIII: "money",
  IX: "elections",
  X: "engagement",
  XI: "legal-framework",
  XII: "county-government",
  XIII: "infrastructure",
  XIV: "challenges",
};

export default function GlossaryPage() {
  const [activeCategory, setActiveCategory] = useState<GlossaryCategory | "all">("all");

  const filtered = activeCategory === "all"
    ? GLOSSARY
    : GLOSSARY.filter((t) => t.category === activeCategory);

  // Group by first letter
  const grouped: Record<string, typeof GLOSSARY> = {};
  for (const term of filtered) {
    const letter = term.term[0].toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(term);
  }
  const letters = Object.keys(grouped).sort();

  return (
    <main className="article-page" data-theme="civic-guide">
      <div className="lg-glossary">
        <div className="lg-glossary-header">
          <Link href="/articles/how-local-government-works" className="lg-glossary-back">
            &larr; Back to guide
          </Link>
          <h1 className="lg-glossary-title">Glossary of Terms</h1>
          <p className="lg-glossary-subtitle">
            {GLOSSARY.length} key terms in American local government, defined
            for general readers. Terms are linked from the chapters where they
            first appear.
          </p>
        </div>

        {/* Category filter pills */}
        <div className="lg-glossary-filters">
          <button
            className={`lg-glossary-pill ${activeCategory === "all" ? "lg-glossary-pill--active" : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            All ({GLOSSARY.length})
          </button>
          {GLOSSARY_CATEGORIES.map((cat) => {
            const count = GLOSSARY.filter((t) => t.category === cat.key).length;
            return (
              <button
                key={cat.key}
                className={`lg-glossary-pill ${activeCategory === cat.key ? "lg-glossary-pill--active" : ""}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Alphabetized term list */}
        <div className="lg-glossary-terms">
          {letters.map((letter) => (
            <div key={letter} className="lg-glossary-letter-group">
              <div className="lg-glossary-letter">{letter}</div>
              {grouped[letter].map((term) => (
                <div key={term.slug} id={term.slug} className="lg-glossary-entry">
                  <h2 className="lg-glossary-term">{term.term}</h2>
                  <p className="lg-glossary-definition">{term.definition}</p>
                  <div className="lg-glossary-chapters">
                    {term.chapters.map((ch) => (
                      <Link
                        key={ch}
                        href={`/articles/how-local-government-works/${CHAPTER_SLUGS[ch]}`}
                        className="lg-glossary-chapter-link"
                      >
                        Ch. {ch}
                      </Link>
                    ))}
                    <span className="lg-glossary-category-badge">{term.category}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="lg-glossary-footer">
          <Link href="/articles/how-local-government-works" className="lg-glossary-back">
            &larr; Back to guide
          </Link>
        </div>
      </div>
    </main>
  );
}
