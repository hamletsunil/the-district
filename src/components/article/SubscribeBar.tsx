"use client";

/**
 * SubscribeBar Component
 *
 * Sticky footer bar that appears after user scrolls 60% of the article.
 * Dismissable and remembers dismissal for 7 days via localStorage.
 */

import { useEffect, useState } from "react";

const DISMISSED_KEY = "district-subscribe-dismissed";
const SUBSCRIBED_KEY = "district-subscribed";
const DISMISS_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export function SubscribeBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true); // Start hidden
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Check localStorage on mount
  useEffect(() => {
    const subscribedAt = localStorage.getItem(SUBSCRIBED_KEY);
    if (subscribedAt) {
      setDismissed(true);
      return;
    }

    const dismissedAt = localStorage.getItem(DISMISSED_KEY);
    if (dismissedAt) {
      const elapsed = Date.now() - parseInt(dismissedAt, 10);
      if (elapsed < DISMISS_DURATION) {
        setDismissed(true);
        return;
      }
    }
    setDismissed(false);
  }, []);

  // Scroll detection
  useEffect(() => {
    if (dismissed) return;

    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setVisible(scrollPercent > 0.6);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    localStorage.setItem(DISMISSED_KEY, Date.now().toString());
  };

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
        setTimeout(() => {
          setVisible(false);
          setDismissed(true);
        }, 2000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (dismissed || !visible) return null;

  return (
    <div className={`subscribe-bar ${visible ? "subscribe-bar--visible" : ""}`}>
      <div className="subscribe-bar__content">
        <div className="subscribe-bar__text">
          <span className="subscribe-bar__brand">The District</span>
          <span className="subscribe-bar__tagline">Get weekly insights</span>
        </div>

        {status === "success" ? (
          <div className="subscribe-bar__success">
            <span>✓</span> You&apos;re subscribed!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="subscribe-bar__form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="subscribe-bar__input"
              required
            />
            <button
              type="submit"
              className="subscribe-bar__button"
              disabled={status === "loading"}
            >
              {status === "loading" ? "..." : "Subscribe"}
            </button>
          </form>
        )}

        <button
          onClick={handleDismiss}
          className="subscribe-bar__close"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  );
}
