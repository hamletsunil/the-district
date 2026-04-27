"use client";

import Link from "next/link";
import { useState } from "react";
import { ArticleIllustration } from "@/components/home";
import { articles, articleHref, featuredArticle } from "@/data/articles";
import type { DistrictArticle } from "@/types/article";

const CITY_DEEP_DIVES_RECENT_FIRST = (): DistrictArticle[] =>
  articles
    .filter((a) => a.kind === "city-deep-dive" && a.status === "published")
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

const TOOLS_ORDER = [
  "vote-tracker",
  "temperature-check",
  "abundance-index",
  "data-center-gold-rush",
];

export default function Home() {
  const cityStories = CITY_DEEP_DIVES_RECENT_FIRST();
  const latest3 = cityStories.filter((a) => a.slug !== featuredArticle.slug).slice(0, 3);
  const explainer = articles.find((a) => a.kind === "explainer");
  const tools = TOOLS_ORDER.map((slug) => articles.find((a) => a.slug === slug)).filter(
    (a): a is DistrictArticle => Boolean(a)
  );

  const cityDeskGroups = groupByRecency(cityStories);

  return (
    <main className="tdh">
      <section className="tdh-hero">
        <h1 className="tdh-hero-title">The District</h1>
        <p className="tdh-hero-sub">
          Long-form, data-driven reporting on the city halls and zoning committees that
          shape American life. Built from transcripts, votes, and public records across
          more than 3,000 jurisdictions.
        </p>
      </section>

      <section id="stories" className="tdh-featured">
        <FeaturedSpread article={featuredArticle} />
      </section>

      <section className="tdh-latest">
        <header className="tdh-section-head">
          <span className="tdh-eyebrow">Latest</span>
          <h2 className="tdh-section-title">The most recent dispatches.</h2>
        </header>
        <div className="tdh-latest-grid">
          {latest3.map((a) => (
            <LatestCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      <NewsletterSection />

      <section className="tdh-citydesk">
        <header className="tdh-section-head">
          <span className="tdh-eyebrow">City Desk</span>
          <h2 className="tdh-section-title">Every city we&rsquo;ve covered.</h2>
        </header>
        {cityDeskGroups.map((group) => (
          <div key={group.label} className="tdh-citydesk-group">
            <h3 className="tdh-citydesk-grouplabel">{group.label}</h3>
            <ul className="tdh-citydesk-list">
              {group.articles.map((a, i) => (
                <CityDeskRow key={a.slug} article={a} index={i + 1} />
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section id="civics" className="tdh-civics">
        <header className="tdh-section-head">
          <span className="tdh-eyebrow">Civics &amp; Tools</span>
          <h2 className="tdh-section-title">Reference and instruments.</h2>
        </header>
        {explainer && <ExplainerRow article={explainer} />}
        <ul id="tools" className="tdh-tools-list">
          {tools.map((a) => (
            <ToolCard key={a.slug} article={a} />
          ))}
        </ul>
      </section>

      <Colophon />
    </main>
  );
}

function FeaturedSpread({ article }: { article: DistrictArticle }) {
  return (
    <Link href={articleHref(article)} className="tdh-featured-link">
      <div className="tdh-featured-cover">
        <ArticleIllustration type={article.illustrationKey as never} />
      </div>
      <div className="tdh-featured-text">
        <span className="tdh-eyebrow tdh-featured-kicker" style={{ color: article.accentColor }}>
          {article.city ? `${article.city}, ${article.state}` : "Featured"}
        </span>
        <h2 className="tdh-featured-title">{article.title}</h2>
        <p className="tdh-featured-dek">{article.dek}</p>
        <span className="tdh-featured-meta">
          {article.meta} · By The District
        </span>
        <span
          className="tdh-featured-cta"
          style={{ borderBottomColor: article.accentColor, color: article.accentColor }}
        >
          Read the full story →
        </span>
      </div>
    </Link>
  );
}

function LatestCard({ article }: { article: DistrictArticle }) {
  return (
    <Link href={articleHref(article)} className="tdh-latest-card">
      <div className="tdh-latest-illo">
        <ArticleIllustration type={article.illustrationKey as never} />
      </div>
      <span className="tdh-eyebrow" style={{ color: article.accentColor }}>
        {article.city ? `${article.city}, ${article.state}` : article.kind}
      </span>
      <h3 className="tdh-latest-title">{article.title}</h3>
      <p className="tdh-latest-dek">{article.dek}</p>
      <span className="tdh-latest-meta">{article.meta}</span>
    </Link>
  );
}

function CityDeskRow({ article, index }: { article: DistrictArticle; index: number }) {
  return (
    <li>
      <Link href={articleHref(article)} className="tdh-citydesk-row">
        <span className="tdh-citydesk-num">{String(index).padStart(2, "0")}</span>
        <div className="tdh-citydesk-text">
          <span
            className="tdh-eyebrow tdh-citydesk-kicker"
            style={{ color: article.accentColor }}
          >
            {article.city ? `${article.city}, ${article.state}` : "City"}
          </span>
          <h4 className="tdh-citydesk-title">{article.title}</h4>
        </div>
        <span className="tdh-citydesk-dek">{article.dek}</span>
        <span className="tdh-citydesk-date">{formatDate(article.publishedAt)}</span>
      </Link>
    </li>
  );
}

function ExplainerRow({ article }: { article: DistrictArticle }) {
  return (
    <Link href={articleHref(article)} className="tdh-explainer">
      <div className="tdh-explainer-illo">
        <ArticleIllustration type={article.illustrationKey as never} />
      </div>
      <div>
        <span className="tdh-eyebrow" style={{ color: article.accentColor }}>
          The Definitive Guide
        </span>
        <h3 className="tdh-explainer-title">{article.title}</h3>
        <p className="tdh-explainer-dek">{article.dek}</p>
        <span className="tdh-explainer-meta">{article.meta}</span>
      </div>
    </Link>
  );
}

function ToolCard({ article }: { article: DistrictArticle }) {
  return (
    <li>
      <Link href={articleHref(article)} className="tdh-tool-card">
        <div className="tdh-tool-illo">
          <ArticleIllustration type={article.illustrationKey as never} />
        </div>
        <span className="tdh-eyebrow" style={{ color: article.accentColor }}>
          Tool
        </span>
        <h4 className="tdh-tool-title">{article.title}</h4>
        <p className="tdh-tool-dek">{article.dek}</p>
        <span className="tdh-tool-meta">{article.meta}</span>
      </Link>
    </li>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const r = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await r.json();
      if (r.ok) {
        setStatus("success");
        setMessage(data.message || "Welcome to The District!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <section className="tdh-newsletter" aria-labelledby="newsletter-heading">
      <h2 id="newsletter-heading" className="tdh-newsletter-title">
        One Sunday-morning email per week.
      </h2>
      <p className="tdh-newsletter-sub">
        The story, the data behind it, and a couple lines on what we&rsquo;re working on next.
      </p>
      {status === "success" ? (
        <p className="tdh-newsletter-success">{message}</p>
      ) : (
        <form onSubmit={onSubmit} className="tdh-newsletter-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            disabled={status === "loading"}
            className="tdh-newsletter-input"
            aria-label="Email address"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="tdh-newsletter-button"
          >
            {status === "loading" ? "..." : "Subscribe"}
          </button>
        </form>
      )}
      {status === "error" && <p className="tdh-newsletter-error">{message}</p>}
      <p className="tdh-newsletter-note">Free. No spam. Read by 14,000+.</p>
    </section>
  );
}

function Colophon() {
  return (
    <section className="tdh-colophon" aria-label="About The District">
      <div className="tdh-colophon-mission">
        <span className="tdh-eyebrow">How it&rsquo;s made</span>
        <p>
          Every story starts with data. Hamlet&rsquo;s platform processes transcripts,
          agendas, and roll-call records from city council meetings across the country.
          Our team uses that data to find patterns and stories that would be impossible
          to uncover by hand.
        </p>
      </div>
      <div className="tdh-colophon-byline">
        <div className="tdh-colophon-avatar" aria-hidden>SR</div>
        <div>
          <div className="tdh-colophon-name">Sunil Rajaraman</div>
          <div className="tdh-colophon-role">Editor, The District</div>
        </div>
      </div>
    </section>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function groupByRecency(items: DistrictArticle[]): { label: string; articles: DistrictArticle[] }[] {
  const now = new Date();
  const thisYear = now.getFullYear();
  const lastYear = thisYear - 1;
  const groups: Record<string, DistrictArticle[]> = {
    [`${thisYear}`]: [],
    [`${lastYear}`]: [],
    Earlier: [],
  };
  for (const a of items) {
    const y = new Date(a.publishedAt).getFullYear();
    if (y === thisYear) groups[`${thisYear}`].push(a);
    else if (y === lastYear) groups[`${lastYear}`].push(a);
    else groups.Earlier.push(a);
  }
  return [
    { label: `${thisYear}`, articles: groups[`${thisYear}`] },
    { label: `${lastYear}`, articles: groups[`${lastYear}`] },
    { label: "Earlier", articles: groups.Earlier },
  ].filter((g) => g.articles.length > 0);
}
