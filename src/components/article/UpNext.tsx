"use client";

/**
 * UpNext Component - Shows next article card
 */

import Link from "next/link";
import { ArticleIllustration } from "@/components/home";

// Article data for the cards
const ARTICLES: Record<string, {
  title: string;
  description: string;
  topic: string;
  meta: string;
  colorScheme: string;
  illustrationType: "ann-arbor" | "oakland" | "data-centers" | "housing" | "zoning" | "climate" | "san-francisco";
}> = {
  "ann-arbor-divided": {
    title: "The City That Won't Agree",
    description: "142 cities. 8.1 million votes. Ann Arbor's council has the highest dissent rate in America.",
    topic: "City Deep Dive",
    meta: "12 min read · Interactive",
    colorScheme: "ann-arbor",
    illustrationType: "ann-arbor",
  },
  "oaklands-future": {
    title: "Five Futures for Oakland",
    description: "$94K median incomes. A $360M deficit. 342 missing officers. An interactive simulation.",
    topic: "City Deep Dive",
    meta: "10 min read · Interactive",
    colorScheme: "oakland",
    illustrationType: "oakland",
  },
  "data-center-gold-rush": {
    title: "The Data Center Gold Rush",
    description: "156 cities. 2,847 meetings. Where will America's digital infrastructure live?",
    topic: "Data Centers",
    meta: "8 min read",
    colorScheme: "navy",
    illustrationType: "data-centers",
  },
  "abundance-index": {
    title: "The Abundance Index",
    description: "Which cities welcome growth and which fight it? 84 cities ranked.",
    topic: "Housing",
    meta: "7 min read",
    colorScheme: "coral",
    illustrationType: "housing",
  },
  "vote-tracker": {
    title: "The Vote Tracker",
    description: "1,524 local officials. 25,219 recorded votes. See who's voting yes.",
    topic: "Democracy",
    meta: "6 min read",
    colorScheme: "indigo",
    illustrationType: "zoning",
  },
  "temperature-check": {
    title: "Temperature Check",
    description: "438 cities. Millions of public comments. How contentious is your local government?",
    topic: "Civic Health",
    meta: "6 min read",
    colorScheme: "sage",
    illustrationType: "climate",
  },
};

interface UpNextProps {
  slug: string;
  title?: string; // Optional, will use from ARTICLES if not provided
}

export function UpNext({ slug }: UpNextProps) {
  const article = ARTICLES[slug];
  if (!article) return null;

  return (
    <section className="up-next-section">
      <span className="up-next-label">Continue Reading</span>
      <Link href={`/articles/${slug}`} className="article-card-3d up-next-card">
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
    </section>
  );
}
