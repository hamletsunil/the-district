"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArticleIllustration } from "@/components/home";

const articles = [
  {
    id: "data-center-gold-rush",
    topic: "Data Centers",
    title: "The Data Center Gold Rush",
    description:
      "156 cities. 2,847 meetings. Where will America's digital infrastructure live—and who gets to decide?",
    meta: "Coming Soon • 8 min read",
    colorScheme: "navy",
    illustrationType: "data-centers" as const,
  },
  {
    id: "housing-crisis",
    topic: "Housing",
    title: "The NIMBY Map",
    description:
      "Every rejected housing proposal. Every zoning fight. Ten years of America's housing paralysis, mapped.",
    meta: "Coming 2025",
    colorScheme: "coral",
    illustrationType: "housing" as const,
  },
  {
    id: "rezoning-revolution",
    topic: "Zoning",
    title: "Who Really Controls Your City",
    description:
      "Meet the 47,000 planning commissioners—the most powerful appointed officials you've never heard of.",
    meta: "Coming 2025",
    colorScheme: "indigo",
    illustrationType: "zoning" as const,
  },
  {
    id: "climate-decisions",
    topic: "Climate",
    title: "1,247 Cities, One Decade",
    description:
      "How local governments are responding to climate change—tracked through every vote and ordinance.",
    meta: "Coming 2025",
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
  );
}
