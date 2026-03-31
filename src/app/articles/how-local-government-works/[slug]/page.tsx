"use client";

import { useState, useEffect } from "react";
import { CHAPTERS } from "@/data/civic-guide/chapters";
import { ChapterHeader } from "@/components/civic-guide/ChapterHeader";
import { ChapterFooter } from "@/components/civic-guide/ChapterFooter";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import "@/styles/articles/civic-guide.css";

function ChapterLoading() {
  return (
    <div style={{ padding: "4rem 2rem", textAlign: "center", color: "var(--page-text-muted)", fontFamily: "var(--font-sans)" }}>
      Loading chapter...
    </div>
  );
}

const WhyItMattersChapter = dynamic(() => import("@/components/civic-guide/chapters/WhyItMattersChapter").then((m) => m.WhyItMattersChapter), { ssr: false, loading: () => <ChapterLoading /> });
const TaxonomyChapter = dynamic(() => import("@/components/civic-guide/chapters/TaxonomyChapter").then((m) => m.TaxonomyChapter), { ssr: false, loading: () => <ChapterLoading /> });
const FormsChapter = dynamic(() => import("@/components/civic-guide/chapters/FormsChapter").then((m) => m.FormsChapter), { ssr: false, loading: () => <ChapterLoading /> });
const RolesChapter = dynamic(() => import("@/components/civic-guide/chapters/RolesChapter").then((m) => m.RolesChapter), { ssr: false, loading: () => <ChapterLoading /> });
const LawmakingChapter = dynamic(() => import("@/components/civic-guide/chapters/LawmakingChapter").then((m) => m.LawmakingChapter), { ssr: false, loading: () => <ChapterLoading /> });
const TheMeetingChapter = dynamic(() => import("@/components/civic-guide/chapters/TheMeetingChapter").then((m) => m.TheMeetingChapter), { ssr: false, loading: () => <ChapterLoading /> });
const LandUseChapter = dynamic(() => import("@/components/civic-guide/chapters/LandUseChapter").then((m) => m.LandUseChapter), { ssr: false, loading: () => <ChapterLoading /> });
const MoneyChapter = dynamic(() => import("@/components/civic-guide/chapters/MoneyChapter").then((m) => m.MoneyChapter), { ssr: false, loading: () => <ChapterLoading /> });
const ElectionsChapter = dynamic(() => import("@/components/civic-guide/chapters/ElectionsChapter").then((m) => m.ElectionsChapter), { ssr: false, loading: () => <ChapterLoading /> });
const EngagementChapter = dynamic(() => import("@/components/civic-guide/chapters/EngagementChapter").then((m) => m.EngagementChapter), { ssr: false, loading: () => <ChapterLoading /> });
const LegalFrameworkChapter = dynamic(() => import("@/components/civic-guide/chapters/LegalFrameworkChapter").then((m) => m.LegalFrameworkChapter), { ssr: false, loading: () => <ChapterLoading /> });
const CountyGovernmentChapter = dynamic(() => import("@/components/civic-guide/chapters/CountyGovernmentChapter").then((m) => m.CountyGovernmentChapter), { ssr: false, loading: () => <ChapterLoading /> });
const InfrastructureChapter = dynamic(() => import("@/components/civic-guide/chapters/InfrastructureChapter").then((m) => m.InfrastructureChapter), { ssr: false, loading: () => <ChapterLoading /> });
const ChallengesChapter = dynamic(() => import("@/components/civic-guide/chapters/ChallengesChapter").then((m) => m.ChallengesChapter), { ssr: false, loading: () => <ChapterLoading /> });

const CHAPTER_COMPONENTS: Record<string, React.ComponentType> = {
  "why-it-matters": WhyItMattersChapter,
  "taxonomy": TaxonomyChapter,
  "forms": FormsChapter,
  "roles": RolesChapter,
  "lawmaking": LawmakingChapter,
  "the-meeting": TheMeetingChapter,
  "land-use": LandUseChapter,
  "money": MoneyChapter,
  "elections": ElectionsChapter,
  "engagement": EngagementChapter,
  "legal-framework": LegalFrameworkChapter,
  "county-government": CountyGovernmentChapter,
  "infrastructure": InfrastructureChapter,
  "challenges": ChallengesChapter,
};

export default function ChapterPage() {
  const params = useParams();
  const slug = params.slug as string;

  const chapterIndex = CHAPTERS.findIndex((ch) => ch.slug === slug);
  const chapter = CHAPTERS[chapterIndex];
  const prevChapter = chapterIndex > 0 ? CHAPTERS[chapterIndex - 1] : undefined;
  const nextChapter = chapterIndex < CHAPTERS.length - 1 ? CHAPTERS[chapterIndex + 1] : undefined;

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min((scrollTop / docHeight) * 100, 100));
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!chapter) {
    return (
      <main className="article-page" data-theme="civic-guide">
        <div style={{ padding: "8rem 2rem", textAlign: "center" }}>
          <h1 style={{ color: "var(--page-text)", fontFamily: "var(--font-display)" }}>Chapter not found</h1>
          <p style={{ color: "var(--page-text-muted)", marginTop: "0.5rem" }}>
            The chapter &ldquo;{slug}&rdquo; does not exist.
          </p>
          <Link href="/articles/how-local-government-works" style={{ color: "var(--accent-primary)", fontFamily: "var(--font-sans)", fontSize: "var(--type-small)", marginTop: "1.5rem", display: "inline-block" }}>
            &larr; Back to Guide
          </Link>
        </div>
      </main>
    );
  }

  const ChapterComponent = CHAPTER_COMPONENTS[slug];

  return (
    <main className="article-page" data-theme="civic-guide">
      <div className="lg-progress-bar" style={{ width: `${progress}%` }} />
      <ChapterHeader chapter={chapter} />
      {ChapterComponent ? <ChapterComponent /> : (
        <section className="lg-chapter-body">
          <div className="lg-prose-container">
            <p className="lg-prose-paragraph">{chapter.description}</p>
          </div>
        </section>
      )}
      <ChapterFooter
        sources={[]}
        prevChapter={prevChapter}
        nextChapter={nextChapter}
      />
    </main>
  );
}
