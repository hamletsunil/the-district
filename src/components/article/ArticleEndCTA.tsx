"use client";

/**
 * ArticleEndCTA Component
 *
 * Full-width subscribe section placed before SourcesCitations.
 * Matches article section styling for visual consistency.
 */

import { useState } from "react";

interface ArticleEndCTAProps {
  cityName?: string;
  hamletSearchUrl?: string;
}

export function ArticleEndCTA({ cityName, hamletSearchUrl }: ArticleEndCTAProps = {}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok || response.status === 409) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="article-end-cta">
      <div className="article-end-cta__container">
        <div className="article-end-cta__icon">📬</div>
        <h3 className="article-end-cta__headline">Enjoying The District?</h3>
        <p className="article-end-cta__subtext">
          Get data-driven local government stories in your inbox every week. Free, no spam.
        </p>

        {status === "success" ? (
          <div className="article-end-cta__success">
            <span className="article-end-cta__success-icon">✓</span>
            <span>You&apos;re in! Check your inbox for a welcome email.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="article-end-cta__form">
            <div className="article-end-cta__input-wrapper">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="article-end-cta__input"
                required
              />
              <button
                type="submit"
                className="article-end-cta__button"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Subscribing..." : "Subscribe Free"}
              </button>
            </div>
            {status === "error" && (
              <p className="article-end-cta__error">Something went wrong. Please try again.</p>
            )}
          </form>
        )}

        <div className="article-end-cta__divider" />

        <a
          href={hamletSearchUrl ?? "https://www.myhamlet.com?utm_source=district&utm_medium=internal&utm_content=article-end-cta"}
          target="_blank"
          rel="noopener noreferrer"
          className="article-end-cta__hamlet-link"
        >
          <span className="article-end-cta__hamlet-text">
            {cityName
              ? `Search ${cityName}'s meetings on Hamlet`
              : "Explore local government data on Hamlet"}
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="article-end-cta__hamlet-arrow"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </section>
  );
}
