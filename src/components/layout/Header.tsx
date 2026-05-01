"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DistrictMark } from "@/components/home";
import { articles, articleHref } from "@/data/articles";

export function Header() {
  return (
    <header className="masthead">
      <div className="masthead-inner">
        <div className="masthead-lockup">
          <a
            href="https://www.myhamlet.com?utm_source=district&utm_medium=internal&utm_content=logo"
            target="_blank"
            rel="noopener noreferrer"
            className="district-logo-mark hamlet-mark-link"
            aria-label="Hamlet — parent site"
          >
            <DistrictMark className="w-6 h-5" />
          </a>
          <Link href="/" className="masthead-wordmark">
            <span className="district-logo-title">The District</span>
            <span className="district-logo-tagline">
              Stories from city halls
            </span>
          </Link>
        </div>

        <nav className="masthead-nav" aria-label="Sections">
          <Link href="/#stories">Stories</Link>
          <Link href="/#civics">Civics</Link>
          <Link href="/#tools">Tools</Link>
        </nav>

        <MastheadSearch />
      </div>
    </header>
  );
}

function MastheadSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const q = query.trim().toLowerCase();
  const results =
    q.length >= 2
      ? articles
          .filter((a) => {
            const haystack = [a.title, a.dek, a.city ?? "", a.state ?? ""]
              .join(" ")
              .toLowerCase();
            return haystack.includes(q);
          })
          .slice(0, 5)
      : [];

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = results[activeIndex];
      if (target) {
        window.location.href = articleHref(target);
      }
    }
  }

  return (
    <div className="masthead-search" ref={containerRef}>
      <label className="masthead-search-label">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search The District"
          aria-label="Search The District"
          className="masthead-search-input"
        />
      </label>
      {open && results.length > 0 && (
        <ul className="masthead-search-results" role="listbox">
          {results.map((a, i) => (
            <li key={a.slug} role="option" aria-selected={i === activeIndex}>
              <Link
                href={articleHref(a)}
                className={`masthead-search-result ${i === activeIndex ? "is-active" : ""}`}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => setOpen(false)}
              >
                <span className="masthead-search-result-title">{a.title}</span>
                <span className="masthead-search-result-meta">
                  {a.city ? `${a.city}, ${a.state}` : labelForKind(a.kind)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function labelForKind(kind: string): string {
  if (kind === "civics-tool") return "Tools";
  if (kind === "explainer") return "Civics";
  return "Stories";
}
