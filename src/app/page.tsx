"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArticleIllustration } from "@/components/home";

const articles = [
  {
    id: "ann-arbor-divided",
    topic: "City Deep Dive",
    title: "The City That Won\u2019t Agree",
    description:
      "142 cities. 8.1 million votes. Ann Arbor\u2019s council has the highest dissent rate in America\u2014and it\u2019s been that way for seventeen years.",
    meta: "12 min read \u00b7 Interactive",
    colorScheme: "ann-arbor",
    illustrationType: "ann-arbor" as const,
  },
  {
    id: "sf-through-the-fog",
    topic: "City Deep Dive",
    title: "Through the Fog",
    description:
      "33 datasets. 19.5 million rows. 1,310 meeting transcripts. A data-driven autopsy of San Francisco\u2019s pandemic crisis and the question everyone\u2019s asking: is the turnaround real?",
    meta: "25 min read · 9 visualizations",
    colorScheme: "crimson",
    illustrationType: "san-francisco" as const,
    href: "/sf/through-the-fog.html",
  },
  {
    id: "oaklands-future",
    topic: "City Deep Dive",
    title: "Five Futures for Oakland",
    description:
      "$94K median incomes. A $360M deficit. 342 missing officers. An interactive simulation of the trade-offs Oakland faces over the next decade.",
    meta: "10 min read · Interactive",
    colorScheme: "oakland",
    illustrationType: "oakland" as const,
  },
  {
    id: "data-center-gold-rush",
    topic: "Data Centers",
    title: "The Data Center Gold Rush",
    description:
      "156 cities. 2,847 meetings. Where will America's digital infrastructure live—and who gets to decide?",
    meta: "8 min read",
    colorScheme: "navy",
    illustrationType: "data-centers" as const,
  },
  {
    id: "abundance-index",
    topic: "Housing",
    title: "The Abundance Index",
    description:
      "Which cities welcome growth and which fight it? 84 cities ranked by their openness to housing development.",
    meta: "7 min read",
    colorScheme: "coral",
    illustrationType: "housing" as const,
  },
  {
    id: "vote-tracker",
    topic: "Democracy",
    title: "The Vote Tracker",
    description:
      "1,524 local officials. 25,219 recorded votes. See who's voting yes—and who's blocking progress.",
    meta: "6 min read",
    colorScheme: "indigo",
    illustrationType: "zoning" as const,
  },
  {
    id: "temperature-check",
    topic: "Civic Health",
    title: "Temperature Check",
    description:
      "438 cities. Millions of public comments. How contentious is your local government?",
    meta: "6 min read",
    colorScheme: "sage",
    illustrationType: "climate" as const,
  },
];

export default function Home() {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    const cards = stackRef.current?.querySelectorAll(".animate-on-scroll");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <HeroSection />

      {/* Side navigation dots */}
      <nav className="side-nav hidden lg:flex">
        {articles.map((_, i) => (
          <button
            key={i}
            className={`side-nav-dot ${i === 0 ? "active" : ""}`}
            aria-label={`Go to article ${i + 1}`}
          />
        ))}
      </nav>

      {/* 3D Article Stack */}
      <section ref={stackRef} className="article-stack">
        {articles.map((article, index) => (
          <Link
            key={article.id}
            href={"href" in article && article.href ? article.href : `/articles/${article.id}`}
            className={`article-card-3d animate-on-scroll`}
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            <div className={`card-inner card-${article.colorScheme}`}>
              <div className="card-spine" />
              <div className="card-layout">
                <div className="card-illustration">
                  <ArticleIllustration type={article.illustrationType} />
                </div>
                <div className="card-content">
                  <span className="card-topic">{article.topic}</span>
                  <h2 className="card-title">{article.title}</h2>
                  <p className="card-description">{article.description}</p>
                  <span className="card-meta">{article.meta}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}

// ============================================================================
// HERO SECTION
// ============================================================================
function HeroSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / 600);
  const translateY = scrollY / 4;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Welcome to The District!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <section className="district-hero">
      <div className="district-hero-bg">
        <div className="district-hero-gradient" />
        <div className="district-hero-grid" style={{ opacity: opacity * 0.15 }} />
      </div>

      <div className="district-hero-content" style={{ opacity, transform: `translateY(${translateY}px)` }}>
        <div className="district-hero-badge">
          <span className="district-badge-dot" />
          A{" "}
          <a
            href="https://myhamlet.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hamlet-link"
          >
            Hamlet
          </a>{" "}
          Publication
        </div>

        <h1 className="district-hero-title">
          Data-driven stories<br />
          from <span className="district-title-accent">local government</span>
        </h1>

        <p className="district-hero-subtitle">
          We analyze transcripts, votes, and records from 3,000+ city halls
          to uncover what&rsquo;s really happening in local democracy.
        </p>

        {status === "success" ? (
          <div className="district-newsletter-success">
            <span className="district-success-icon">✓</span>
            <p>{message}</p>
          </div>
        ) : (
          <form className="district-newsletter" onSubmit={handleSubmit}>
            <div className="district-newsletter-input-wrapper">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={status === "loading"}
                className="district-newsletter-input"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="district-newsletter-button"
              >
                {status === "loading" ? "..." : "Subscribe"}
              </button>
            </div>
            {status === "error" ? (
              <p className="district-newsletter-error">{message}</p>
            ) : (
              <p className="district-newsletter-note">
                Free weekly insights. No spam, ever.
              </p>
            )}
          </form>
        )}
      </div>

      <div className="district-hero-scroll-cue" style={{ opacity }}>
        <div className="district-scroll-line" />
        <span>Explore stories</span>
      </div>
    </section>
  );
}
