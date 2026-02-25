"use client";

/**
 * ArticleEndCTA Component
 *
 * Full-width CTA section linking to Hamlet for local government alerts.
 * Placed before SourcesCitations.
 */

export function ArticleEndCTA() {
  return (
    <section className="article-end-cta">
      <div className="article-end-cta__container">
        <h3 className="article-end-cta__headline">
          Want alerts for your city?
        </h3>
        <p className="article-end-cta__subtext">
          Hamlet monitors city council meetings and sends you alerts when topics you care about come up.
        </p>

        <a
          href="https://app.myhamlet.com/signup"
          target="_blank"
          rel="noopener noreferrer"
          className="article-end-cta__button"
        >
          Try Hamlet Free
        </a>
      </div>
    </section>
  );
}
