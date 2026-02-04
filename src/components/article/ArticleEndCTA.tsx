"use client";

/**
 * ArticleEndCTA Component
 *
 * Full-width subscribe section placed before SourcesCitations.
 * Matches article section styling for visual consistency.
 */

import { useState, useEffect } from "react";

const SUBSCRIBED_KEY = "district-subscribed";

export function ArticleEndCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  useEffect(() => {
    const subscribed = localStorage.getItem(SUBSCRIBED_KEY);
    if (subscribed) {
      setAlreadySubscribed(true);
    }
  }, []);

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
        localStorage.setItem(SUBSCRIBED_KEY, Date.now().toString());
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  // Don't show if already subscribed
  if (alreadySubscribed) return null;

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
      </div>
    </section>
  );
}
