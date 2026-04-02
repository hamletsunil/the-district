"use client";

import Link from "next/link";
import { CHAPTERS } from "@/data/civic-guide/chapters";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { CivicSkyline } from "@/components/civic-guide/CivicSkyline";
import { SubscribeBar } from "@/components/article/SubscribeBar";
import type { ReactNode } from "react";
import "@/styles/articles/civic-guide.css";

function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Hero() {
  return (
    <section className="lg-hero">
      <div className="lg-hero-inner">
        <div className="lg-hero-badge">
          <span className="lg-badge-dot" />
          From The District
        </div>

        <h1 className="lg-hero-headline">
          <span className="lg-hero-headline-big">How Local<br />Government Works</span>
        </h1>

        <p className="lg-hero-dek">
          The government closest to your daily life is the one you know the least about.
          This is a guide to how it actually works.
        </p>
      </div>

      <CivicSkyline className="lg-hero-skyline" />

      <div className="lg-hero-scroll-indicator" aria-hidden="true">
        <span className="lg-hero-scroll-text">Explore the guide</span>
        <div className="lg-hero-scroll-line" />
      </div>
    </section>
  );
}

function EditorialOpener() {
  return (
    <section className="lg-opener">
      <div className="lg-opener-inner">
        <FadeIn>
          <p className="lg-opener-drop-cap">
            On a Tuesday evening in a city hall somewhere in Ohio, a mayor gavels
            five council members to order. A clerk adjusts a laptop. In the gallery,
            nine residents sit scattered across sixty chairs. One of them &mdash; a
            retired teacher, present every meeting for four years &mdash; has brought
            a folder of printed spreadsheets about the stormwater fee. Nobody else
            in the room has read the agenda packet. Over the next three hours, this
            body will approve a $47 million budget, rezone a parcel near the elementary
            school, and table a noise ordinance for the third consecutive month.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="lg-opener-text">
            This scene repeats 90,837 times across America &mdash; in wood-paneled
            chambers and fluorescent-lit conference rooms, before audiences of hundreds
            and audiences of none. The officials in those rooms spend $2.3 trillion a
            year and employ 14.2 million people. They decide whether your street gets
            repaved, whether a developer builds apartments next door, and how much you
            owe in property taxes. Three-quarters of Americans skip the elections
            that put them there.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="lg-opener-text">
            This guide is an attempt to change that. Across 14 chapters, we explain how
            local government is structured, how it makes decisions, where the money comes
            from and where it goes, who shows up to participate and who doesn&rsquo;t, and
            what legal framework holds it all together. Every claim traces to a source.
            Every number traces to a dataset. If you want to understand the government
            closest to your daily life, start here.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="lg-opener-cta">
            <Link href="/articles/how-local-government-works/why-it-matters" className="lg-opener-start-btn">
              Start reading: Chapter I &rarr;
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

const FEATURED = CHAPTERS.slice(0, 3);
const REMAINING = CHAPTERS.slice(3);

const CHAPTER_ACCENTS: Record<string, string> = {
  "why-it-matters": "#2563eb",
  taxonomy: "#7c3aed",
  forms: "#059669",
  roles: "#b45309",
  lawmaking: "#dc2626",
  "the-meeting": "#0891b2",
  "land-use": "#65a30d",
  money: "#ca8a04",
  elections: "#e11d48",
  engagement: "#7c3aed",
  "legal-framework": "#4338ca",
  "county-government": "#92400e",
  infrastructure: "#6b7280",
  challenges: "#0f766e",
};

function ChapterGrid() {
  const basePath = "/articles/how-local-government-works";
  return (
    <section className="lg-chapters">
      <div className="lg-chapters-inner">
        <div className="lg-chapters-intro">
          <h2>The 14 chapters</h2>
          <p>Each chapter explores a different dimension of how local government works in America.</p>
        </div>
        <div className="lg-featured-grid">
          {FEATURED.map((ch, i) => (
            <FadeIn key={ch.id} delay={i * 0.05}>
              <Link href={`${basePath}/${ch.slug}`} className="lg-featured-card">
                <div
                  className="lg-featured-accent"
                  style={{ backgroundColor: CHAPTER_ACCENTS[ch.id] }}
                />
                <div className="lg-featured-content">
                  <span className="lg-chapter-num">Chapter {ch.number}</span>
                  <h2 className="lg-featured-title">{ch.shortTitle}</h2>
                  <p className="lg-featured-desc">{ch.description}</p>
                  <span className="lg-card-cta">Read chapter &rarr;</span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        <div className="lg-compact-grid">
          {REMAINING.map((ch, i) => (
            <FadeIn key={ch.id} delay={i * 0.02}>
              <Link href={`${basePath}/${ch.slug}`} className="lg-compact-card">
                <div
                  className="lg-compact-accent"
                  style={{ backgroundColor: CHAPTER_ACCENTS[ch.id] }}
                />
                <div className="lg-compact-content">
                  <span className="lg-chapter-num">{ch.number}</span>
                  <h3 className="lg-compact-title">{ch.shortTitle}</h3>
                  <p className="lg-compact-desc">{ch.description}</p>
                </div>
                <span className="lg-compact-arrow">&rarr;</span>
              </Link>
            </FadeIn>
          ))}
          {/* Glossary card */}
          <FadeIn>
            <Link href={`${basePath}/glossary`} className="lg-compact-card">
              <div className="lg-compact-accent" style={{ backgroundColor: "#6b7280" }} />
              <div className="lg-compact-content">
                <span className="lg-chapter-num">Reference</span>
                <h3 className="lg-compact-title">Glossary of Terms</h3>
                <p className="lg-compact-desc">45 key terms in local government, defined for general readers.</p>
              </div>
              <span className="lg-compact-arrow">&rarr;</span>
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

export default function HowLocalGovernmentWorks() {
  return (
    <main className="article-page" data-theme="civic-guide">
      <Hero />
      <EditorialOpener />
      <ChapterGrid />
      <SubscribeBar />

      <footer className="lg-hub-footer">
        <p>
          A{" "}
          <a href="https://www.myhamlet.com?ref=district" target="_blank" rel="noopener noreferrer">
            Hamlet
          </a>{" "}
          Research Publication &middot; Data from the 2022 Census of Governments
        </p>
      </footer>
    </main>
  );
}
