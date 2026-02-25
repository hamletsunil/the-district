"use client";

/**
 * SubscribeBar Component
 *
 * Sticky footer bar that appears after user scrolls 60% of the article.
 * Links to Hamlet for local government alerts.
 * Dismissable and remembers dismissal for 7 days via localStorage.
 */

import { useEffect, useState } from "react";

const DISMISSED_KEY = "district-alerts-dismissed";
const DISMISS_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export function SubscribeBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true); // Start hidden

  // Check localStorage on mount
  useEffect(() => {
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
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setVisible(scrollPercent > 0.6);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    localStorage.setItem(DISMISSED_KEY, Date.now().toString());
  };

  if (dismissed) return null;

  return (
    <div className={`subscribe-bar ${visible ? "subscribe-bar--visible" : ""}`}>
      <div className="subscribe-bar__content">
        <div className="subscribe-bar__text">
          <span className="subscribe-bar__tagline">
            Get alerts when your city council discusses issues you care about
          </span>
        </div>

        <a
          href="https://app.myhamlet.com/signup"
          target="_blank"
          rel="noopener noreferrer"
          className="subscribe-bar__button"
        >
          Try Hamlet Free
        </a>

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
