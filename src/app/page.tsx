"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArticleIllustration } from "@/components/home";

const articles = [
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
    <>
      {/* Main content */}
      <main className="main-content-layer">
        {/* Hero Section */}
        <HeroSection />

        {/* Side navigation dots */}
        <nav className="side-nav hidden lg:flex">
          {articles.map((_, i) => (
            <button
              type="button"
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
              href={`/articles/${article.id}`}
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

      {/* Reveal Footer - revealed when scrolling past main content */}
      <RevealFooter />
    </>
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

// ============================================================================
// REVEAL FOOTER - About section that reveals as you scroll past content
// ============================================================================
function RevealFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

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
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <footer className="reveal-footer">
      <div className="reveal-footer-content">
        {/* Logo & Tagline */}
        <div className="reveal-footer-header">
          <h2 className="reveal-footer-title">The District</h2>
          <p className="reveal-footer-tagline">Stories from city halls</p>
        </div>

        {/* Mission */}
        <p className="reveal-footer-mission">
          We analyze transcripts, votes, and public records from more than
          3,000 city halls across America to uncover what&rsquo;s really
          happening in local democracy.
        </p>

        {/* How It's Made */}
        <section className="reveal-footer-how">
          <h3 className="reveal-footer-section-title">How It&rsquo;s Made</h3>
          <p className="reveal-footer-prose">
            Every story in The District starts with data. Hamlet&rsquo;s platform
            processes transcripts, agendas, and voting records from city
            council meetings across the country. Our journalism team uses
            this data to find patterns, anomalies, and stories that would
            be impossible to uncover by hand.
          </p>
        </section>

        {/* Author */}
        <div className="reveal-footer-authors">
          <div className="reveal-footer-author">
            <img
              src="https://www.myhamlet.com/team/sunil-rajaraman.jpg"
              alt="Sunil Rajaraman"
              width={48}
              height={48}
              className="reveal-footer-avatar"
            />
            <div>
              <p className="reveal-footer-author-name">Sunil Rajaraman</p>
              <p className="reveal-footer-author-role">Founder &amp; CEO</p>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="reveal-footer-newsletter">
          <h3 className="reveal-footer-newsletter-title">Stay informed</h3>
          {status === "success" ? (
            <p className="reveal-footer-newsletter-success">{message}</p>
          ) : (
            <form onSubmit={handleSubmit} className="reveal-footer-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={status === "loading"}
                className="reveal-footer-input"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="reveal-footer-button"
              >
                {status === "loading" ? "..." : "Subscribe"}
              </button>
            </form>
          )}
          {status === "error" && (
            <p className="reveal-footer-error">{message}</p>
          )}
        </div>

        {/* Team Link */}
        <a
          href="https://www.myhamlet.com/about"
          target="_blank"
          rel="noopener noreferrer"
          className="reveal-footer-team-link"
        >
          Meet the full team at Hamlet →
        </a>

        {/* Attribution */}
        <div className="reveal-footer-attribution">
          <p>
            A{" "}
            <a
              href="https://myhamlet.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hamlet
            </a>{" "}
            Publication
          </p>
        </div>
      </div>
    </footer>
  );
}
