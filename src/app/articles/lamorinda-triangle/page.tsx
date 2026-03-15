"use client";

/**
 * The Lamorinda Triangle — Lafayette, Orinda, Moraga
 *
 * Three cities bound together by hills, fire, and schools —
 * how they govern reveals what they value.
 */

import { useState, useEffect, useCallback } from "react";
import { AtAGlance } from "@/components/article/AtAGlance";
import { MethodologySection } from "@/components/article/MethodologySection";
import { ArticleEndCTA } from "@/components/article/ArticleEndCTA";
import { SourcesCitations } from "@/components/article/SourcesCitations";
import { SubscribeBar } from "@/components/article/SubscribeBar";
import { SocialShare } from "@/components/article/SocialShare";
import { PullQuote } from "@/components/article/PullQuote";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import type { Source } from "@/types/article";
import { LamorindaSkylineSVG } from "./skyline-svg";

// ============================================================================
// DATA — Every statistic traces to this object.
// Meeting analysis: Claude Sonnet 4.6 (classification) + Opus 4.6 (extraction)
// Source: Lafayette Granicus, Orinda/Moraga YouTube, MOFD archives
// Fiscal: US Census Bureau ACS, CA State Controller's Office, City budgets
// Statistical: Wilson 95% CIs, chi-squared, Fisher exact (Bonferroni), Kruskal-Wallis
// ============================================================================
const DATA = {
  summary: {
    totalMeetings: 1765,
    totalTranscribed: 998,
    totalAnalyzed: 907,
    totalWords: 17766918,
    totalHours: 2100,
    dateRange: { start: "2015-01-13", end: "2026-03-19" },
    bodies: 14,
    cities: 3,
  },

  // City profiles — Census ACS 2023 5-Year + CA State Controller FY2024
  cities: {
    lafayette: {
      name: "Lafayette",
      population: 25277,
      medianIncome: 222393,
      medianHomeValue: 2000001,
      perCapitaIncome: 116206,
      totalRevenue: 33273447,
      perCapitaRevenue: 1316,
      ownerOccupiedPct: 77.3,
      color: "#5B9BD5",
    },
    orinda: {
      name: "Orinda",
      population: 19472,
      medianIncome: 250001,
      medianHomeValue: 1804400,
      perCapitaIncome: 139503,
      totalRevenue: 33610276,
      perCapitaRevenue: 1726,
      ownerOccupiedPct: 92.2,
      color: "#E67E54",
    },
    moraga: {
      name: "Moraga",
      population: 16790,
      medianIncome: 199800,
      medianHomeValue: 1597600,
      perCapitaIncome: 89439,
      totalRevenue: 18692448,
      perCapitaRevenue: 1113,
      ownerOccupiedPct: 84.3,
      color: "#7B9E6B",
    },
  },

  // Council stratum 2023+ topic rates (from lamorinda_normalized.json)
  // n = 85 Lafayette, 64 Moraga, 62 Orinda
  councilTopics: [
    { topic: "Housing & Development", lafayette: 55.3, orinda: 43.6, moraga: 50.0 },
    { topic: "Fire Safety & Wildfire", lafayette: 37.6, orinda: 69.4, moraga: 37.5 },
    { topic: "Budget & Revenue", lafayette: 37.6, orinda: 32.3, moraga: 59.4 },
    { topic: "Transportation & Traffic", lafayette: 45.9, orinda: 25.8, moraga: 31.3 },
    { topic: "Infrastructure & Utilities", lafayette: 16.5, orinda: 27.4, moraga: 42.2 },
    { topic: "Land Use & Design Review", lafayette: 24.7, orinda: 14.5, moraga: 14.1 },
    { topic: "Parks, Trails & Open Space", lafayette: 21.2, orinda: 25.8, moraga: 17.2 },
    { topic: "Downtown & Retail", lafayette: 17.6, orinda: 19.4, moraga: 12.5 },
    { topic: "Public Safety & Policing", lafayette: 17.6, orinda: 16.1, moraga: 4.7 },
    { topic: "Schools & Youth", lafayette: 7.1, orinda: 6.5, moraga: 9.4 },
  ],

  // Score comparisons — council stratum 2023+
  scores: {
    contentiousness: {
      lafayette: { mean: 2.10, median: 2.0, n: 85 },
      moraga: { mean: 1.59, median: 1.5, n: 64 },
      orinda: { mean: 2.07, median: 2.0, n: 62 },
    },
    publicEngagement: {
      lafayette: { mean: 2.58, median: 2.5, n: 85 },
      moraga: { mean: 1.86, median: 1.5, n: 64 },
      orinda: { mean: 2.54, median: 2.5, n: 62 },
    },
  },

  // Mood distribution — council stratum 2023+
  mood: {
    lafayette: { contentious: 9.4, engaged: 71.8, routine: 18.8 },
    moraga: { contentious: 0, engaged: 54.7, routine: 45.3 },
    orinda: { contentious: 4.8, engaged: 80.6, routine: 14.5 },
  },

  // Budgets FY2025-26 (from budgets_fy25.json)
  budgets: {
    lafayette: { totalBudget: 43300000, gfExpenditure: 25500000, reserves: 18100000, reservePct: 80, newRevenue: "Measure H ($2.4M)", gfPerCapita: 1005 },
    orinda: { totalBudget: 43900000, gfExpenditure: 18286841, reserves: 6231811, reservePolicy: "50% min", newRevenue: "Measure R ($4.0M)", gfPerCapita: 953 },
    moraga: { totalBudget: 13000000, gfExpenditure: 13000000, reserves: 6400000, reservePolicy: "50% min", newRevenue: "None", gfPerCapita: 770 },
  },

  // AUHSD (from budgets_fy25.json)
  auhsd: {
    totalBudget: 104000000,
    enrollment: 5425,
    perPupil: 20000,
    measureTResult: 62.2,
    measureTRequired: 66.67,
    cutsAfterFailure: 2000000,
    parcelTaxRevenue: 10500000,
  },
};

// ============================================================================
// SOURCES — Tier 1-2 only
// ============================================================================
const SOURCES: Source[] = [
  {
    title: "Lafayette City Council Meetings Archive",
    outlet: "City of Lafayette Granicus",
    url: "https://lafayette.granicus.com/ViewPublisher.php?view_id=3",
  },
  {
    title: "Orinda City Council and Planning Commission Meetings",
    outlet: "City of Orinda YouTube",
    url: "https://www.youtube.com/@cityoforinda9535",
  },
  {
    title: "Moraga Town Council Meetings",
    outlet: "Town of Moraga YouTube",
    url: "https://www.youtube.com/@TownofMoraga335",
  },
  {
    title: "American Community Survey 5-Year Estimates (2023)",
    outlet: "U.S. Census Bureau",
    url: "https://data.census.gov/",
  },
  {
    title: "City Financial Transaction Reports FY 2023-24",
    outlet: "California State Controller's Office",
    url: "https://bythenumbers.sco.ca.gov/",
  },
  {
    title: "City of Lafayette FY2025-26 Budget",
    outlet: "Contra Costa News",
    url: "https://contracosta.news/2025/06/21/lafayette-city-council-to-vote-on-next-years-operating-budget/",
  },
  {
    title: "City of Orinda Adopted Biennial Budget FY2025-26 & FY2026-27",
    outlet: "City of Orinda",
    url: "https://www.cityoforinda.gov/ArchiveCenter/ViewFile/Item/169",
  },
  {
    title: "Moraga FY2024-25 Mid-Year Budget Adjustments",
    outlet: "Town of Moraga",
    url: "https://www.moraga.ca.us/DocumentCenter/View/9685/9B---COMBINED---FY25-Mid-Year-Budget-Adjustments---Excluding-Hacienda",
  },
  {
    title: "$130 School Parcel Tax to Be Voted on in May",
    outlet: "The Orinda News",
    url: "https://theorindanews.com/2025/02/27/130-school-parcel-tax-to-be-voted-on-in-may/",
  },
  {
    title: "Voters Reject All School Parcel Taxes in May 6 Special Elections",
    outlet: "CalTax",
    url: "https://caltax.org/2025/05/09/voters-reject-all-school-parcel-taxes-in-may-6-special-elections/",
  },
  {
    title: "MOFD Zone Zero Wildfire Requirements — Board Meeting",
    outlet: "Moraga-Orinda Fire District",
    url: "https://www.mofd.org/",
  },
  {
    title: "State Farm Policy Cancellations by City",
    outlet: "San Francisco Chronicle",
    url: "https://www.sfchronicle.com/",
  },
  {
    title: "California Department of Insurance Town Hall on Wildfire Insurance",
    outlet: "California Department of Insurance",
    url: "https://www.insurance.ca.gov/",
  },
];

// ============================================================================
// HERO
// ============================================================================
function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const heroOpacity = Math.max(0, 1 - scrollY / 800);
  const heroTranslate = scrollY / 4;
  const textOpacity = Math.max(0, 1 - scrollY / 600);
  const textTranslate = scrollY / 3;

  return (
    <header className="lam-hero">
      {/* SVG Illustration with parallax */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "55%",
          opacity: heroOpacity * 0.85,
          transform: `translateY(${heroTranslate * 0.5}px)`,
          pointerEvents: "none",
        }}
      >
        <LamorindaSkylineSVG />
      </div>

      {/* Gradient fade over illustration */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "60%",
          background:
            "linear-gradient(to bottom, transparent 0%, var(--page-bg) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Hero text overlapping illustration */}
      <div
        className="lam-hero-content"
        style={{
          opacity: textOpacity,
          transform: `translateY(${textTranslate}px)`,
          position: "relative",
          zIndex: 3,
          marginTop: "-2rem",
        }}
      >
        <div className="lam-hero-badge">
          <span className="lam-hero-badge-dot" />
          From The District
        </div>
        <h1 className="lam-hero-title">
          <span className="lam-hero-title-line1">The Lamorinda</span>
          <span className="lam-hero-title-line2">Triangle</span>
        </h1>
        <p className="lam-hero-subtitle">
          Three cities bound together by hills, fire, and schools. How they
          govern reveals what they value. An analysis of{" "}
          {DATA.summary.totalTranscribed.toLocaleString()} government meetings
          and 17.8 million words of public testimony from Lafayette, Orinda,
          and Moraga, California.
        </p>
        <div className="lam-hero-scroll">
          Scroll to explore
          <div className="lam-hero-scroll-line" />
        </div>
      </div>
    </header>
  );
}

// ============================================================================
// TOPIC COMPARISON BARS (tri-city)
// ============================================================================
function TopicComparisonBar({
  topic,
  lafayette,
  orinda,
  moraga,
  maxPct,
  significant,
}: {
  topic: string;
  lafayette: number;
  orinda: number;
  moraga: number;
  maxPct: number;
  significant?: boolean;
}) {
  return (
    <div className="lam-topic-compare" style={{ marginBottom: "1.25rem" }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "0.35rem",
      }}>
        <span style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.75rem",
          fontWeight: 500,
          color: "var(--page-text)",
          letterSpacing: "0.01em",
        }}>
          {topic}
          {significant && (
            <span style={{ color: "var(--accent-primary)", marginLeft: "0.35rem", fontSize: "0.6rem" }}>*</span>
          )}
        </span>
      </div>
      {[
        { label: "Lafayette", pct: lafayette, color: "#5B9BD5" },
        { label: "Orinda", pct: orinda, color: "#E67E54" },
        { label: "Moraga", pct: moraga, color: "#7B9E6B" },
      ].map(({ label, pct, color }) => (
        <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.15rem" }}>
          <span style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.6rem",
            color: color,
            width: "60px",
            textAlign: "right",
            flexShrink: 0,
          }}>
            {label}
          </span>
          <div style={{
            flex: 1,
            height: "6px",
            background: "rgba(255,255,255,0.06)",
            borderRadius: "3px",
            overflow: "hidden",
          }}>
            <div style={{
              width: `${(pct / maxPct) * 100}%`,
              height: "100%",
              background: color,
              opacity: 0.75,
              borderRadius: "3px",
              transition: "width 0.8s var(--ease-elegant)",
            }} />
          </div>
          <span style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.6rem",
            color: "var(--page-text-muted)",
            width: "36px",
            flexShrink: 0,
          }}>
            {pct.toFixed(0)}%
          </span>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// TABLE OF CONTENTS
// ============================================================================
const TOC_SECTIONS = [
  { id: "the-place", label: "The Place", number: "01" },
  { id: "fire-and-fear", label: "Fire & Fear", number: "02" },
  { id: "housing-wars", label: "The Housing Wars", number: "03" },
  { id: "dangerous-roads", label: "Dangerous Roads", number: "04" },
  { id: "the-money", label: "The Money", number: "05" },
  { id: "schools-thread", label: "Schools", number: "06" },
  { id: "institutional-web", label: "The Web", number: "07" },
  { id: "three-cultures", label: "Three Cultures", number: "08" },
  { id: "methodology", label: "Methodology", number: "09" },
];

function TableOfContents() {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: [0, 0.25, 0.5] }
    );

    TOC_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  }, []);

  return (
    <>
      <button
        className="lam-toc-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Table of contents"
      >
        <span className="lam-toc-toggle-icon">
          {isOpen ? "\u2715" : "\u2630"}
        </span>
        <span className="lam-toc-toggle-label">Contents</span>
      </button>

      <nav
        className={`lam-toc ${isOpen ? "lam-toc--open" : ""}`}
        aria-label="Table of contents"
      >
        <div className="lam-toc-header">Contents</div>
        <ol className="lam-toc-list">
          {TOC_SECTIONS.map(({ id, label, number }) => (
            <li key={id} className="lam-toc-item">
              <button
                className={`lam-toc-link ${activeId === id ? "lam-toc-link--active" : ""}`}
                onClick={() => handleClick(id)}
              >
                <span className="lam-toc-number">{number}</span>
                <span className="lam-toc-label">{label}</span>
              </button>
            </li>
          ))}
        </ol>
      </nav>

      {isOpen && (
        <div className="lam-toc-overlay" onClick={() => setIsOpen(false)} />
      )}
    </>
  );
}

// ============================================================================
// MAIN PAGE
// ============================================================================
export default function LamorindaTrianglePage() {
  const { ref: topicsRef, isVisible: topicsVisible } = useIntersectionObserver({
    threshold: 0.15,
  });
  const { ref: webRef, isVisible: webVisible } = useIntersectionObserver({
    threshold: 0.15,
  });
  const { ref: conclusionRef, isVisible: conclusionVisible } =
    useIntersectionObserver({ threshold: 0.3 });
  const { ref: cityCardsRef, isVisible: cityCardsVisible } =
    useIntersectionObserver({ threshold: 0.2 });
  const { ref: fireStatRef, isVisible: fireStatVisible } =
    useIntersectionObserver({ threshold: 0.2 });
  const { ref: housingQuoteRef, isVisible: housingQuoteVisible } =
    useIntersectionObserver({ threshold: 0.2 });
  const { ref: roadStatRef, isVisible: roadStatVisible } =
    useIntersectionObserver({ threshold: 0.2 });
  const { ref: schoolStatRef, isVisible: schoolStatVisible } =
    useIntersectionObserver({ threshold: 0.2 });

  const maxTopicPct = Math.max(
    ...DATA.councilTopics.flatMap((t) => [t.lafayette, t.orinda, t.moraga]),
    1
  );

  return (
    <main className="lam-article article-page" data-theme="lamorinda">
      <TableOfContents />
      <HeroSection />

      <AtAGlance
        stats={[
          { value: "17.8M", label: "Words Analyzed" },
          { value: "998", label: "Meetings Transcribed" },
          { value: "14", label: "Government Bodies" },
        ]}
        finding="Three neighboring cities that share a fire district, a school system, and a set of hills — but approach housing, safety, and spending in completely different ways."
      />

      {/* ================================================================
          CHAPTER 1 — THE PLACE
          ================================================================ */}
      <section className="lam-editorial-section" id="the-place">
        <div className="article-prose-header">
          <span className="article-section-num">01</span>
          <h2>The Place</h2>
        </div>
        <div className="article-body-prose">
          <p>
            The Caldecott Tunnel bores through the Berkeley Hills and deposits
            you into a different California. On the western side, the East Bay
            flatlands sprawl toward the waterfront in a grid of stucco and
            freeway ramps. On the eastern side, the land rises into oak-studded
            ridges where three small cities&nbsp;&mdash; Lafayette, Orinda, and
            Moraga&nbsp;&mdash; occupy a set of sun-bleached valleys that
            locals have called &ldquo;Lamorinda&rdquo; since at least the{" "}
            <a
              href="https://lamorindaweekly.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lamorinda Weekly
            </a>{" "}
            started publishing in 2007. The hills are golden in summer and
            green in winter. The homes are expensive. The politics are local
            in the truest sense: arguments about oak trees, building setbacks,
            and whether a new convenience store needs 47 or 52 parking spaces
            can consume three hours of public testimony and push a vote past
            midnight.
          </p>
          <p>
            Lafayette, the largest of the three with 25,277 residents, hugs a
            BART station and a reinvented downtown along Mount Diablo Boulevard
            where farm-to-table restaurants share sidewalks with an 88-year-old
            family hardware store called Diamond K Supply. The city was{" "}
            <a
              href="https://www.lovelafayette.org/city-hall/about-the-city/history-of-lafayette"
              target="_blank"
              rel="noopener noreferrer"
            >
              incorporated in 1968
            </a>{" "}
            with a founding mission that begins: &ldquo;The city of Lafayette
            was incorporated for the preservation and enhancement of the
            semi-rural character of the community.&rdquo; That sentence has been
            quoted in at least four council meetings in our dataset by members
            on opposite sides of the housing debate.
          </p>
          <p>
            Orinda, immediately to the west, is hillier, wealthier, and more
            fire-prone. Ninety-two percent of its homes are owner-occupied,
            the highest rate in Contra Costa County for a city of its size. Its
            median household income tops $250,000. Theatre Square, an art deco
            complex anchoring what passes for a downtown, struggles with retail
            vacancies even as the{" "}
            <a
              href="https://lamorindatheatres.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Orinda Theatre
            </a>{" "}
            remains a beloved landmark. But Orinda&rsquo;s political identity
            is defined less by commerce than by geography: the city sits in one
            of the highest-risk wildfire zones in the East Bay, and 69% of its
            council meetings since 2023 have touched on fire safety. That
            figure is statistically significant compared to both Lafayette
            (38%) and Moraga (38%) at <em>p</em> &lt; 0.001.
          </p>
          <p>
            Moraga sits tucked behind both of them, accessible primarily
            through Orinda via the two-lane Moraga Way or from Lafayette
            through a gap in the hills. It is the smallest (16,790 residents),
            the least wealthy by Lamorinda standards, and the quietest
            politically. Nearly half of Moraga&rsquo;s council meetings in our
            analysis period were classified as routine&nbsp;&mdash; meaning
            minimal public comment and low contentiousness. Not a single
            Moraga meeting registered as contentious in the council stratum.
            The town runs its own 12-officer police department, operates on a
            general fund of roughly $13 million, and devotes more political
            energy to budget and infrastructure than either of its neighbors.
          </p>
          <p>
            These three cities share a fire district, a high school system,
            a water utility, a county library, and the single two-lane road
            that serves as the primary evacuation route for 36,000 people. They
            share hills that the{" "}
            <a
              href="https://www.eastbaytimes.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              East Bay Times
            </a>{" "}
            once called the most landslide-prone in the United States. They
            share a property market where the median home costs between $1.6
            million and $2 million. And they share a problem that no amount of
            money has solved: how to build housing California demands without
            burning down the neighborhoods they already have.
          </p>
          <p>
            We transcribed and analyzed 998 meetings across all 14 government
            bodies&nbsp;&mdash; city councils, planning commissions, school
            boards, and the MOFD fire district board. The corpus spans 2015
            through March 2026 and contains 17.8 million words of public
            testimony, staff presentations, and council deliberation. What
            follows is what the transcripts reveal about how three communities
            that look identical from the outside have developed fundamentally
            different answers to the same questions.
          </p>
        </div>
      </section>

      {/* ---- Visual: Tri-city stat cards ---- */}
      <div
        className="lam-graphic"
        ref={cityCardsRef}
        style={{
          opacity: cityCardsVisible ? 1 : 0,
          transform: cityCardsVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s var(--ease-elegant)",
        }}
      >
        <div className="lam-city-cards">
          {([
            {
              key: "lafayette" as const,
              mod: "lafayette",
              bodies: 5,
              bodiesLabel: "City Council, Planning, Design Review, Parks & Trails, Circulation",
            },
            {
              key: "orinda" as const,
              mod: "orinda",
              bodies: 3,
              bodiesLabel: "City Council, Planning, Parks & Rec",
            },
            {
              key: "moraga" as const,
              mod: "moraga",
              bodies: 2,
              bodiesLabel: "Town Council, Planning Commission",
            },
          ]).map((c) => {
            const city = DATA.cities[c.key];
            return (
              <div
                key={c.key}
                className={`lam-city-card lam-city-card--${c.mod}`}
              >
                <div className="lam-city-name">{city.name}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div>
                    <div style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.75rem",
                      fontWeight: 600,
                      color: "var(--accent-primary)",
                      lineHeight: 1,
                    }}>
                      {city.population.toLocaleString()}
                    </div>
                    <div style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.65rem",
                      color: "var(--page-text-muted)",
                      marginTop: "0.2rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}>
                      Population
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.75rem",
                      fontWeight: 600,
                      color: "var(--accent-primary)",
                      lineHeight: 1,
                    }}>
                      ${Math.round(city.medianIncome / 1000)}K
                    </div>
                    <div style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.65rem",
                      color: "var(--page-text-muted)",
                      marginTop: "0.2rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}>
                      Median Income
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.75rem",
                      fontWeight: 600,
                      color: "var(--accent-primary)",
                      lineHeight: 1,
                    }}>
                      ${city.medianHomeValue >= 2000000 ? "2M+" : `${(city.medianHomeValue / 1000000).toFixed(1)}M`}
                    </div>
                    <div style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.65rem",
                      color: "var(--page-text-muted)",
                      marginTop: "0.2rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}>
                      Median Home Value
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.75rem",
                      fontWeight: 600,
                      color: "var(--accent-primary)",
                      lineHeight: 1,
                    }}>
                      {c.bodies}
                    </div>
                    <div style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.65rem",
                      color: "var(--page-text-muted)",
                      marginTop: "0.2rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}>
                      Govt Bodies
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================================================================
          CHAPTER 2 — FIRE AND FEAR
          ================================================================ */}
      <section className="lam-editorial-section" id="fire-and-fear">
        <div className="article-prose-header">
          <span className="article-section-num">02</span>
          <h2>The Fire That Hasn&rsquo;t Come Yet</h2>
        </div>
        <div className="article-body-prose">
          <p>
            On an October evening in 2024, Moraga-Orinda Fire District Chief
            Dave Winoker walked into a joint board meeting with 70 days left
            before retirement and delivered what multiple elected officials
            later called the most persuasive presentation they had ever seen.
            The subject was Zone Zero&nbsp;&mdash; the five-foot perimeter
            around a structure where combustible material must be eliminated
            to slow an approaching fire. After seven years of voluntary
            compliance, the district had inspected thousands of homes.
            Twenty-two percent passed on the first try. Zero homes in the
            entire district&nbsp;&mdash; not one across Orinda, Moraga, Canyon,
            or Bollinger Canyon&nbsp;&mdash; had earned the{" "}
            <a
              href="https://ibhs.org/wildfire-prepared-home/"
              target="_blank"
              rel="noopener noreferrer"
            >
              IBHS Wildfire Prepared
            </a>{" "}
            certification that insurance companies actually recognize.
          </p>
          <p>
            &ldquo;I don&rsquo;t see how this can be both a crisis and not
            important enough to suggest a change in our landscaping,&rdquo;
            Winoker told the room. He was speaking to elected officials from
            both cities, but the remark landed differently on each side of
            the hills. Brandon Iverson, an Orinda council member who opened by
            admitting his spouse had begged him not to be &ldquo;yet another
            overzealous over-regulating&rdquo; official, publicly reversed his
            position during the meeting. &ldquo;Seven years of asking people
            to do the right thing and educating and all of our measure dollars
            pounding people over the head with information doesn&rsquo;t
            change behavior,&rdquo; Iverson said. &ldquo;Enforcement does.&rdquo;
          </p>
          <p>
            The sharpest moment came from the audience. Charlie Cork, a
            longtime Moraga resident, calculated the aggregate cost of Zone
            Zero compliance across the district&rsquo;s roughly 4,000
            properties at $5,000 to $10,000 each. &ldquo;Just do the math.
            We&rsquo;re talking 20 to $40 million that you&rsquo;re putting on
            Moraga residents,&rdquo; he said. &ldquo;Just like a property
            tax.&rdquo; Board President Mike Romer broke protocol and responded
            directly: &ldquo;I wonder if the next speaker is going to deal
            with the cost of rebuilding this community if it burns to the
            ground.&rdquo;
          </p>
          <p>
            An insurance actuary named Nancy Watkins, who advises FEMA and
            state regulators on wildfire risk, showed the room a photograph of
            her husband and son digging out Zone Zero around their own Orinda
            home&nbsp;&mdash; one of the 70,000-plus California policies
            non-renewed in 2024. The crisis had arrived at the expert&rsquo;s
            doorstep.
          </p>
          <p>
            Fire dominates Lamorinda politics in a way that sets the region
            apart from most Bay Area suburbs. In our council-stratum analysis
            of 211 meetings since January 2023, fire safety appeared in 69% of
            Orinda&rsquo;s meetings, compared to 38% in both Lafayette and
            Moraga. The gap is not a matter of perception&nbsp;&mdash; it is
            statistically significant at <em>p</em> &lt; 0.001, with a
            medium effect size. The Moraga-Orinda Fire District serves two of
            the three cities; Lafayette contracts separately with Contra Costa
            County Fire. But the hills do not observe city limits. When the{" "}
            <a
              href="https://www.fire.ca.gov/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Diablo winds
            </a>{" "}
            push fire from the northeast, Lafayette and Orinda are the first
            line of defense. Moraga sits behind them, buffered but not immune.
          </p>
          <p>
            What the transcripts reveal is that fire has become the rhetorical
            lever that moves every other debate. Housing opponents invoke
            evacuation routes. Traffic calming advocates cite emergency vehicle
            access. School board discussions circle back to whether children
            can safely evacuate during school hours. At an August 2025 Orinda
            Planning Commission hearing on the housing element, a UC Berkeley
            environmental sciences professor called Moraga Way &ldquo;already a
            death trap&rdquo; and said rezoning without solving evacuation
            first was &ldquo;absolutely insanity.&rdquo; Nobody on the dais
            objected to the language.
          </p>
          <p>
            The consequences for homeowners are already tangible. At a special
            Orinda council meeting in May 2024, resident Steve Cohn reported
            that the{" "}
            <a
              href="https://www.sfchronicle.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              San Francisco Chronicle
            </a>{" "}
            had published data showing 55% of State Farm&rsquo;s policies in
            Orinda had been canceled&nbsp;&mdash; compared to 30% in Lafayette
            and 12% in Moraga. David Mallory testified that the only coverage
            he could find was through a Scottsdale company outside California,
            at $20,000 a year. &ldquo;The only people we could get was
            Scottsdale,&rdquo; he told the council. &ldquo;And we had no
            choice because we didn&rsquo;t want to have our loan cancelled.&rdquo;
            Nick Warrenoff distilled the problem into a sentence that drew nods
            across the chamber: &ldquo;It&rsquo;s great having low rates, but
            if no one&rsquo;s writing insurance, you&rsquo;re winning the
            wrong battle.&rdquo;
          </p>
          <p>
            The meeting exposed a geographic fault line. Moraga council
            members passionately supported Zone Zero adoption while
            acknowledging their town faces lower direct fire risk. Orinda&rsquo;s
            mayor warned that residents who had already spent thousands on
            compliance and still lost their insurance would view new mandates
            with hostility. MOFD Board President Romer declared he was willing
            to lose his seat over the issue. &ldquo;If I can show leadership
            and if I can be part of a team that inspires this community to do
            what may be an example to the rest of the state,&rdquo; he said,
            &ldquo;that one term will be good enough for me.&rdquo;
          </p>
        </div>
      </section>

      {/* ---- Visual: Fire stat callout ---- */}
      <div
        ref={fireStatRef}
        style={{
          maxWidth: "720px",
          margin: "3rem auto",
          padding: "3rem 2rem",
          textAlign: "center",
          background: "var(--card-bg)",
          borderRadius: "16px",
          border: "1px solid var(--card-border)",
          boxShadow: "0 0 60px rgba(78, 205, 196, 0.06)",
          opacity: fireStatVisible ? 1 : 0,
          transform: fireStatVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s var(--ease-elegant)",
        }}
      >
        <div style={{
          fontFamily: "var(--font-display)",
          fontSize: "5rem",
          fontWeight: 700,
          color: "var(--accent-primary)",
          lineHeight: 1,
        }}>
          {DATA.councilTopics.find(t => t.topic === "Fire Safety & Wildfire")?.orinda ?? 69}%
        </div>
        <div style={{
          fontFamily: "var(--font-sans)",
          fontSize: "1rem",
          color: "var(--page-text-muted)",
          marginTop: "1rem",
          lineHeight: 1.6,
          maxWidth: "400px",
          marginLeft: "auto",
          marginRight: "auto",
        }}>
          of Orinda council meetings mention fire safety — vs{" "}
          {DATA.councilTopics.find(t => t.topic === "Fire Safety & Wildfire")?.lafayette ?? 38}% in Lafayette
          and {DATA.councilTopics.find(t => t.topic === "Fire Safety & Wildfire")?.moraga ?? 38}% in Moraga
        </div>
        <div style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.65rem",
          color: "var(--page-text-muted)",
          marginTop: "0.75rem",
          opacity: 0.6,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}>
          Council stratum 2023+ &middot; <em style={{ fontStyle: "italic" }}>p</em> &lt; 0.001
        </div>
      </div>

      {/* ================================================================
          CHAPTER 3 — THE HOUSING WARS
          ================================================================ */}
      <section className="lam-editorial-section" id="housing-wars">
        <div className="article-prose-header">
          <span className="article-section-num">03</span>
          <h2>The Housing Wars</h2>
        </div>
        <div className="article-body-prose">
          <p>
            Housing and development appear in 55% of Lafayette council
            meetings, 44% of Orinda&rsquo;s, and 50% of Moraga&rsquo;s since
            2023. The differences are not statistically significant&nbsp;&mdash;
            all three cities are consumed by the same state mandate&nbsp;&mdash;
            but the transcripts reveal fundamentally different attitudes toward
            what that mandate means.
          </p>
          <p>
            Lafayette&rsquo;s defining housing battle played out over nearly a
            decade. The city&rsquo;s RHNA allocation requires 2,114 new
            dwelling units in eight years&nbsp;&mdash; a 20% increase for a
            city with roughly 10,000 existing units. Council Member Wei-Tai
            Kwok framed the scale at a November 2023 meeting: &ldquo;We&rsquo;ve
            been assigned 2,114 dwelling units to put in in the next eight
            years. And for a city of just 10,000 dwelling units, that 20%
            increase is completely unprecedented and incredibly difficult.&rdquo;
          </p>
          <p>
            That same meeting produced what may be the most revealing exchange
            in Lafayette&rsquo;s housing record. Council Member Kendall turned
            to the city&rsquo;s housing consultant and asked, flatly:
            &ldquo;You knew. Then why didn&rsquo;t you tell us?&rdquo; The
            accusation&nbsp;&mdash; that the consultant had steered Lafayette
            toward a RHNA income allocation methodology that maximized downtown
            density when neighboring cities like Orinda and Walnut Creek used
            alternatives with less impact&nbsp;&mdash; split the council 3-2
            on the housing element direction. Mayor Anduri, who sided with the
            majority, acknowledged the outcome pleased nobody: &ldquo;I think
            we can confidently say that we&rsquo;ve made nobody happy and we
            made specific individuals upset at specific decisions.&rdquo;
          </p>
          <p>
            The policy battles in Lafayette have periodically spilled into
            raw political conflict. In January 2019, after Council Member Mark
            Mitchell&rsquo;s death, the city needed to appoint a replacement.
            The meeting drew 18 speakers, pitted 4,600 voters for candidate
            Ivor Sampson against supporters of Planning Commissioner Stephen
            Bliss, and produced accusations of &ldquo;Trumpian&rdquo; political
            intimidation from a former Chamber of Commerce president. Mayor
            Carl Anduri broke a deadlock by reversing his position between
            Monday and Thursday, voting for Bliss with a rationale centered
            not on the democratic arguments that dominated public comment but
            on the existential threat of Sacramento housing legislation.
            &ldquo;The number one risk that we face right now as a city is
            coming at us from Sacramento,&rdquo; Anduri said.
          </p>
          <p>
            Orinda&rsquo;s housing fights take a different form&nbsp;&mdash;
            less ideological, more geological. At an October 2025 council
            meeting, a resident whose house was literally sliding off its
            foundation stood before the dais to ask how the city could approve
            environmental review for 30 new homes in the Southwood Valley, the
            same geologically unstable area. Judy Een, a 51-year resident of
            Tahos Road, cited reports calling Orinda the community with the
            most individual landslide property damage in the United States over
            the preceding century. Vice Mayor Iverson acknowledged the core
            fear driving dozens of residents to pack the chamber: &ldquo;The
            momentum of spending $500,000 can become kind of a self-fulfilling
            thing,&rdquo; he said, validating the concern that once the
            environmental review machine starts, approval becomes nearly
            inevitable.
          </p>
          <p>
            A design consultant hired to help Orinda write objective design
            standards&nbsp;&mdash; the kind of standards state law requires
            cities to adopt&nbsp;&mdash; offered a candid admission that drew
            an audible deflation from the room. &ldquo;Most of the
            applications currently using objective standards are density bonus
            projects which tend to waive the standards, the very standards that
            we&rsquo;re all writing,&rdquo; said Tony Perez of Opticos Design.
            The observation captured a frustration that runs through meeting
            after meeting across all three cities: the sense that state
            mandates require enormous local effort to produce rules that
            developers can legally bypass.
          </p>
          <p>
            The BART parking lot&nbsp;&mdash; 26 acres sitting half-empty next
            to transit in Orinda&nbsp;&mdash; emerged as the rallying point
            everyone could agree on at a 2025 Planning Commission hearing.
            Multiple speakers called it the obvious housing site. But staff
            revealed a complex three-way ownership dispute between Caltrans,
            BART, and the city that makes development there years away.
            Meanwhile, a commissioner reframed the entire debate with a point
            that shifted the room: state law SB4 already allows buy-right
            ministerial housing on church sites without any city oversight.
            &ldquo;That ship sailed when Sacramento took away our right to
            have decisions on development at those locations,&rdquo; he said.
            The rezoning vote was not about whether development would happen,
            but whether Orinda would have any control over how it happened.
          </p>
          <p>
            Moraga&rsquo;s housing politics run quieter, but the fiscal
            pressure beneath them is louder. Budget appears in 59% of
            Moraga&rsquo;s council meetings&nbsp;&mdash; the highest of any
            city, significantly above both Lafayette (38%) and Orinda (32%) at{" "}
            <em>p</em> &lt; 0.005. A young father who grew up in the area
            connected the dots at that November 2023 Lafayette meeting:
            &ldquo;Acalanes High School has lost 17% of its student body in
            seven years,&rdquo; said Gary Bird of East Bay for Everyone. The
            implication&nbsp;&mdash; that Lamorinda&rsquo;s resistance to
            housing is hollowing out the schools that justify its home
            prices&nbsp;&mdash; sat uncomfortably with both sides.
          </p>
        </div>
      </section>

      {/* ---- Visual: Housing quote callout ---- */}
      <div
        ref={housingQuoteRef}
        style={{
          maxWidth: "720px",
          margin: "3rem auto",
          padding: "2.5rem 2rem 2.5rem 2.5rem",
          background: "var(--card-bg)",
          borderRadius: "12px",
          border: "1px solid var(--card-border)",
          borderLeft: "4px solid var(--accent-primary)",
          opacity: housingQuoteVisible ? 1 : 0,
          transform: housingQuoteVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s var(--ease-elegant)",
        }}
      >
        <div style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.5rem",
          fontWeight: 400,
          fontStyle: "italic",
          color: "var(--page-text)",
          lineHeight: 1.5,
          marginBottom: "1rem",
        }}>
          &ldquo;You knew. Then why didn&rsquo;t you tell us?&rdquo;
        </div>
        <div style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.8rem",
          color: "var(--page-text-muted)",
        }}>
          &mdash; Council Member Kendall to housing consultant, November 2023
        </div>
      </div>

      {/* ================================================================
          CHAPTER 4 — DANGEROUS ROADS
          ================================================================ */}
      <section className="lam-editorial-section" id="dangerous-roads">
        <div className="article-prose-header">
          <span className="article-section-num">04</span>
          <h2>The Most Dangerous Walk to School</h2>
        </div>
        <div className="article-body-prose">
          <p>
            The most emotionally devastating meeting in our entire corpus was
            not about housing or fire. It was about a crossing guard.
          </p>
          <p>
            In September 2021, Lafayette&rsquo;s city council convened in
            the aftermath of a pedestrian death. Crossing guard Ashley Diaz
            had been struck and killed on a road that two professional safety
            studies&nbsp;&mdash; a 2013 Safe Routes to School report and a 2020
            UC Berkeley Safe Trek analysis&nbsp;&mdash; had already flagged as
            dangerous. Jennifer Lieberman, whose 12-year-old son Max had
            thanked Diaz moments before the man died, told the council: &ldquo;What
            happened to Mr. Diaz was not an accident. It was a system
            failure.&rdquo; Max was the same boy who had lost a classmate to a
            traffic fatality at Burton Valley Elementary two years earlier.
          </p>
          <p>
            Megan Mittman, a professional Vision Zero consultant who also
            happened to be a Burton Valley parent, delivered the line that
            silenced the chamber: &ldquo;Do not set up a listening session next
            week, two weeks from now, on the 29th. The time for listening has
            passed. Set up a launching session. I want you to launch the
            city&rsquo;s Vision Zero commitment.&rdquo; She closed by saying:
            &ldquo;I need to be with my kids tonight. And yet again, I&rsquo;m
            here with you all, sitting here, asking you, begging you, imploring
            you to take this seriously.&rdquo;
          </p>
          <p>
            The data bore out the anger.{" "}
            <a
              href="https://tims.berkeley.edu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              UC Berkeley&rsquo;s Transportation Injury Mapping System
            </a>{" "}
            data showed Lafayette residents were twice as likely to die walking
            or cycling than those in neighboring Walnut Creek. Twenty-eight
            people spoke at that September meeting. The debate over whether
            parking restrictions should last 30 minutes or 12 hours lasted
            past midnight. The newest council member, Wei-Tai Kwok, just 12
            days into his appointment, abstained on the most contentious vote
            of the night.
          </p>
          <p>
            Transportation and traffic appear in 46% of Lafayette council
            meetings since 2023&nbsp;&mdash; significantly higher than
            Orinda&rsquo;s 26% at <em>p</em> &lt; 0.02. Part of this reflects
            Lafayette&rsquo;s denser downtown, but the transcripts suggest
            something deeper: a community that has spent a decade filing
            reports, attending meetings, and watching children jaywalking
            across Moraga Road because the crosswalks feel more dangerous than
            the open road.
          </p>
          <p>
            In Lafayette&rsquo;s other major transportation fight, the Topper
            Lane pathway, a federally funded pedestrian and bike route consumed
            22 months of community conflict before reaching the Planning
            Commission in June 2024. The project originated after a pedestrian
            death on the same road. Opponents, led by Topper Lane resident
            Mark Brennan, framed it as a predetermined outcome driven by a
            $3.85 million federal grant: &ldquo;The plan ill-suited is going
            ahead because the invitations have been sent to the wedding,&rdquo;
            he said. Supporters invoked the death that catalyzed the project.
            Chris Fessen Meyer, a parent on Birdhaven Court, flipped the
            opposition&rsquo;s core argument: &ldquo;No one is using the
            street. I don&rsquo;t really use the street that often, nor do my
            kids, because it&rsquo;s unsafe.&rdquo; Low pedestrian
            traffic&nbsp;&mdash; the same data point&nbsp;&mdash; supported
            both sides&rsquo; case.
          </p>
          <p>
            The commission voted 5-1 to advance the project. Two
            commissioners used the identical phrase &ldquo;not ready for prime
            time.&rdquo; One voted no. The other voted yes. That uncomfortable
            middle ground&nbsp;&mdash; between believing a project is flawed
            and believing inaction is worse&nbsp;&mdash; runs through nearly
            every contested decision in the Lamorinda transcripts.
          </p>
        </div>
      </section>

      {/* ---- Visual: Road safety stat callout ---- */}
      <div
        ref={roadStatRef}
        style={{
          maxWidth: "720px",
          margin: "3rem auto",
          padding: "3rem 2rem",
          textAlign: "center",
          background: "var(--card-bg)",
          borderRadius: "16px",
          border: "1px solid var(--card-border)",
          boxShadow: "0 0 60px rgba(78, 205, 196, 0.06)",
          opacity: roadStatVisible ? 1 : 0,
          transform: roadStatVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s var(--ease-elegant)",
        }}
      >
        <div style={{
          fontFamily: "var(--font-display)",
          fontSize: "5rem",
          fontWeight: 700,
          color: "var(--accent-primary)",
          lineHeight: 1,
        }}>
          2&times;
        </div>
        <div style={{
          fontFamily: "var(--font-sans)",
          fontSize: "1rem",
          color: "var(--page-text-muted)",
          marginTop: "1rem",
          lineHeight: 1.6,
          maxWidth: "400px",
          marginLeft: "auto",
          marginRight: "auto",
        }}>
          Lafayette residents are twice as likely to die walking or cycling than those in neighboring Walnut Creek
        </div>
        <div style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.65rem",
          color: "var(--page-text-muted)",
          marginTop: "0.75rem",
          opacity: 0.6,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}>
          UC Berkeley Transportation Injury Mapping System
        </div>
      </div>

      {/* ================================================================
          CHAPTER 5 — THE MONEY
          ================================================================ */}
      <section className="lam-editorial-section" id="the-money">
        <div className="article-prose-header">
          <span className="article-section-num">05</span>
          <h2>The Money</h2>
        </div>
        <div className="article-body-prose">
          <p>
            Lafayette and Orinda approved strikingly similar total budgets for
            FY2025-26&nbsp;&mdash; $43.3 million and $43.9 million
            respectively&nbsp;&mdash; despite Lafayette having 6,000 more
            residents. Moraga operates on roughly $13 million in general fund
            spending, less than a third of its neighbors. The per-capita gap
            is even starker: Lafayette spends about $1,005 per resident from
            its general fund, Orinda spends $953, and Moraga gets by on $770.
          </p>
          <p>
            Both Lafayette and Orinda recently passed new revenue measures.
            Lafayette&rsquo;s Measure H, a half-cent sales tax approved in
            November 2024, is projected to generate{" "}
            <a
              href="https://contracosta.news/2025/06/21/lafayette-city-council-to-vote-on-next-years-operating-budget/"
              target="_blank"
              rel="noopener noreferrer"
            >
              $2.4 million in its first full year
            </a>{" "}
            &mdash; earmarked primarily for $1 million in roads and drains,
            $479,000 for police, and $322,000 for stormwater prevention.
            Orinda&rsquo;s Measure R, a one-cent add-on sales tax approved in
            November 2020, generates $4 million annually for roads, drains,
            and fire prevention. Moraga has no comparable new revenue source.
          </p>
          <p>
            The budget debates in Moraga carry a different tenor than those in
            its wealthier neighbors. In Moraga, budget and revenue appear in
            59% of council meetings&nbsp;&mdash; significantly more than
            Lafayette (38%) or Orinda (32%). Infrastructure consumes 42% of
            Moraga meetings versus just 16% in Lafayette&nbsp;&mdash; a
            statistically significant gap (<em>p</em> &lt; 0.001) that
            reflects aging pipes, roads, and facilities in a community with
            less fiscal headroom. Moraga&rsquo;s police department&nbsp;&mdash;
            the only independent force in Lamorinda&nbsp;&mdash; costs $4
            million, or roughly 31% of the general fund, and the town recently
            removed one unfunded officer position to balance the books.
          </p>
          <p>
            At a July 2024 Lafayette meeting, the structural deficit became
            personal. Staff told the council that the city faced not a one-time
            shortfall but an ongoing, growing gap of at least $2 million per
            year. A resident put it bluntly: &ldquo;We went from a surplus
            where our city was buying millions of dollars in property to a
            $2.5 million deficit very quickly.&rdquo; Another called the sales
            tax measure unconscionable: &ldquo;I am 100% against the people
            paying for what has become a tradition of poor decisions and
            expenditures that shouldn&rsquo;t be made.&rdquo; Council members
            reframed the ballot measure as democratic choice rather than
            imposition. &ldquo;The city council is not here imposing a tax on
            the public,&rdquo; Vice Mayor Kwok said. &ldquo;It is the
            public&rsquo;s decision in November.&rdquo;
          </p>
          <p>
            The fiscal picture that emerges from the transcripts, budgets, and
            Census data is a triangle of diminishing cushion. Lafayette sits
            on $18.1 million in reserves&nbsp;&mdash; 80% of annual
            expenditures, well above its 60% target, healthy through at least
            FY2030-31 even as structural deficits begin to bite. Orinda&rsquo;s
            general-purpose fund balance is projected to decline from $4.8
            million to $2.4 million during the fiscal year. Moraga holds $6.4
            million in reserves and a $2.3 million pension trust, meeting its
            50% policy target but contributing just $32,000 to reserves in the
            current year.
          </p>
        </div>

        {/* Side-by-side comparison table */}
        <div className="lam-graphic">
          <table className="lam-comparison-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th style={{ color: "#5B9BD5" }}>Lafayette</th>
                <th style={{ color: "#E67E54" }}>Orinda</th>
                <th style={{ color: "#7B9E6B" }}>Moraga</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Population (ACS 2023)</td>
                <td>25,277</td>
                <td>19,472</td>
                <td>16,790</td>
              </tr>
              <tr>
                <td>Median HH Income</td>
                <td>$222,393</td>
                <td style={{ color: "var(--accent-primary)" }}>$250,001</td>
                <td>$199,800</td>
              </tr>
              <tr>
                <td>Median Home Value</td>
                <td style={{ color: "var(--accent-primary)" }}>$2M+</td>
                <td>$1.8M</td>
                <td>$1.6M</td>
              </tr>
              <tr>
                <td>Total Budget (FY25-26)</td>
                <td>$43.3M</td>
                <td style={{ color: "var(--accent-primary)" }}>$43.9M</td>
                <td>~$13M GF</td>
              </tr>
              <tr>
                <td>GF Per Capita</td>
                <td style={{ color: "var(--accent-primary)" }}>$1,005</td>
                <td>$953</td>
                <td>$770</td>
              </tr>
              <tr>
                <td>Reserves</td>
                <td style={{ color: "var(--accent-primary)" }}>$18.1M (80%)</td>
                <td>$6.2M</td>
                <td>$6.4M (50%)</td>
              </tr>
              <tr>
                <td>New Revenue Measure</td>
                <td>Measure H ($2.4M)</td>
                <td>Measure R ($4.0M)</td>
                <td>None</td>
              </tr>
              <tr>
                <td>Owner-Occupied Homes</td>
                <td>77.3%</td>
                <td style={{ color: "var(--accent-primary)" }}>92.2%</td>
                <td>84.3%</td>
              </tr>
              <tr>
                <td>Police Model</td>
                <td>Sheriff contract</td>
                <td>Sheriff contract</td>
                <td>Own PD (12 officers)</td>
              </tr>
              <tr>
                <td>Fire Service</td>
                <td>ConFire (county)</td>
                <td>MOFD</td>
                <td>MOFD</td>
              </tr>
            </tbody>
          </table>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.65rem",
              color: "var(--page-text-muted)",
              textAlign: "center",
              marginTop: "0.5rem",
            }}
          >
            Demographics: Census ACS 2023. Budgets: City adopted budgets
            FY2025-26. Services: CA State Controller FY2024.
            Teal highlights indicate highest value in row.
          </p>
        </div>
      </section>

      {/* ================================================================
          CHAPTER 6 — SCHOOLS
          ================================================================ */}
      <section className="lam-editorial-section" id="schools-thread">
        <div className="article-prose-header">
          <span className="article-section-num">06</span>
          <h2>The Thread That Binds&nbsp;&mdash; and Frays</h2>
        </div>
        <div className="article-body-prose">
          <p>
            The{" "}
            <a
              href="https://www.acalanes.k12.ca.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Acalanes Union High School District
            </a>{" "}
            spans all three cities plus Walnut Creek, operating Acalanes High
            in Lafayette, Miramonte in Orinda, Campolindo in Moraga, and Las
            Lomas in Walnut Creek. The quality of these schools is the single
            biggest reason families pay Lamorinda prices. The median home in
            Lafayette costs over $2 million. Parents are effectively buying a
            school district embedded in a ZIP code.
          </p>
          <p>
            The fiscal cracks in that bargain are widening. In May 2025,
            AUHSD&rsquo;s Measure T&nbsp;&mdash; a parcel tax that would have
            generated $4.5 million annually at $130 per parcel&nbsp;&mdash;
            earned{" "}
            <a
              href="https://caltax.org/2025/05/09/voters-reject-all-school-parcel-taxes-in-may-6-special-elections/"
              target="_blank"
              rel="noopener noreferrer"
            >
              62.2% of the vote
            </a>{" "}
            but needed 66.7% to pass. The district was forced to cut $2
            million from its FY2025-26 budget. Per-pupil spending sits around
            $20,000&nbsp;&mdash; below the California average and roughly
            two-thirds of what Oakland spends per student. Federal funding
            dropped 27% over two years. Reserves that started at 19% are
            projected to fall well below the 10% threshold that triggers state
            oversight. The district operates on a total budget of roughly $104
            million, with $10.5 million from existing parcel tax Measures G
            and A.
          </p>
          <p>
            The Measure T failure was not a rejection of education. It was
            a 4.5-percentage-point gap between a strong majority and the
            supermajority California requires for parcel taxes. Every school
            parcel tax on the May 2025 ballot statewide failed to reach the
            two-thirds threshold. Below the high school level, each city
            operates an independent K-8 district&nbsp;&mdash; Lafayette School
            District, Orinda Union School District, and Moraga School
            District&nbsp;&mdash; creating a fragmented governance landscape
            where the elementary and middle schools that feed Acalanes,
            Miramonte, and Campolindo answer to entirely different boards.
          </p>
          <p>
            Schools appear in fewer than 10% of council meetings in any of
            the three cities, making them the least-discussed topic in our
            taxonomy. The irony is impossible to miss: the institution that
            most defines Lamorinda&rsquo;s identity and property values is
            largely invisible in the civic forums where residents spend their
            political energy. The fire district, which directly employs no
            teachers and educates no children, commands far more attention
            than the school system that underwrites every home sale.
          </p>
        </div>
      </section>

      {/* ---- Visual: AUHSD stat card ---- */}
      <div
        ref={schoolStatRef}
        style={{
          maxWidth: "720px",
          margin: "3rem auto",
          padding: "2.5rem 2rem",
          background: "var(--card-bg)",
          borderRadius: "16px",
          border: "1px solid var(--card-border)",
          opacity: schoolStatVisible ? 1 : 0,
          transform: schoolStatVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s var(--ease-elegant)",
        }}
      >
        <div style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.7rem",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--page-text-muted)",
          marginBottom: "1.5rem",
        }}>
          Acalanes Union High School District
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {([
            { value: `${DATA.auhsd.measureTResult}%`, desc: "voted yes on Measure T" },
            { value: `${DATA.auhsd.measureTRequired.toFixed(1)}%`, desc: "was needed to pass" },
            { value: `$${DATA.auhsd.cutsAfterFailure / 1000000}M`, desc: "in cuts to FY2025-26 budget" },
            { value: `$${(DATA.auhsd.perPupil / 1000).toFixed(0)}K`, desc: "per-pupil spending (below CA avg)" },
          ]).map((row, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "1.25rem",
                paddingBottom: i < 3 ? "1.25rem" : 0,
                borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                fontWeight: 700,
                color: "var(--accent-primary)",
                lineHeight: 1,
                minWidth: "100px",
                textAlign: "right",
              }}>
                {row.value}
              </div>
              <div style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.85rem",
                color: "var(--page-text-muted)",
              }}>
                {row.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================================================================
          CHAPTER 7 — THE INSTITUTIONAL WEB
          ================================================================ */}
      <section className="lam-editorial-section" id="institutional-web">
        <div className="article-prose-header">
          <span className="article-section-num">07</span>
          <h2>The Institutional Web</h2>
        </div>
        <div className="article-body-prose">
          <p>
            Lafayette, Orinda, and Moraga are legally independent but
            institutionally entangled in ways that no single council controls.
            The Moraga-Orinda Fire District, formed in 1997, provides fire and
            emergency services to Orinda and Moraga on an estimated annual
            budget of $28-32 million funded primarily by property taxes.
            Lafayette contracts separately with Contra Costa County Fire.
            Lafayette and Orinda both contract their police services through
            the Contra Costa County Sheriff&rsquo;s Office, while
            Moraga&nbsp;&mdash; uniquely&nbsp;&mdash; operates its own
            municipal department. EBMUD delivers water to everyone. All three
            libraries belong to the Contra Costa County Library system. And
            Moraga Way, a winding two-lane road, serves as the primary
            evacuation corridor for both South Orinda and all of Moraga.
          </p>
          <p>
            These shared dependencies create pressure points where one
            city&rsquo;s decisions ripple through the others. When Orinda
            proposes rezoning for housing near downtown, Moraga residents pack
            the hearing because their only escape route runs through
            Orinda&rsquo;s development zone&nbsp;&mdash; it takes 23 minutes
            to travel 3.2 miles on Moraga Way during school hours, according
            to testimony at the August 2025 Planning Commission meeting.
            When MOFD&rsquo;s fire chief tells the board that voluntary
            compliance has failed, both Orinda and Moraga must decide together
            whether to mandate enforcement, even though they face different
            risk profiles and different political constraints.
          </p>
          <p>
            The most striking feature of the institutional web is what it does
            to accountability. When a Lafayette parent demands safer
            crosswalks, the city says crossing guards are a school district
            expense. When the school board says traffic safety is a city
            responsibility, both point to the other. &ldquo;School districts
            have no legal responsibility for off-site traffic safety,&rdquo;
            a Lafayette school board member told the council at an April 2025
            meeting. &ldquo;That obligation rests squarely with the city.
            When the city effectively seeks to shift this duty to the Lafayette
            School District by action or inaction, the city not only fails to
            meet its own duty, but also creates affirmative exposure for the
            district.&rdquo; The crossing guard program had been funded by the
            city, then shifted to the school district, and the board member
            was there to shift it back.
          </p>
        </div>

        {/* Institutional Web SVG Diagram */}
        <div
          className="lam-graphic"
          ref={webRef}
          style={{
            opacity: webVisible ? 1 : 0,
            transform: webVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s var(--ease-elegant)",
          }}
        >
          <div className="lam-web-diagram">
            <svg viewBox="0 0 720 480" style={{ width: "100%", height: "auto" }}>
              {/* City nodes */}
              <circle cx="140" cy="140" r="55" fill="#5B9BD5" opacity={0.12} stroke="#5B9BD5" strokeWidth={1.5} />
              <text x="140" y="132" textAnchor="middle" fill="#5B9BD5" fontSize="14" fontWeight={600}>Lafayette</text>
              <text x="140" y="150" textAnchor="middle" fill="#8b99a8" fontSize="10">25,277</text>

              <circle cx="580" cy="140" r="55" fill="#E67E54" opacity={0.12} stroke="#E67E54" strokeWidth={1.5} />
              <text x="580" y="132" textAnchor="middle" fill="#E67E54" fontSize="14" fontWeight={600}>Orinda</text>
              <text x="580" y="150" textAnchor="middle" fill="#8b99a8" fontSize="10">19,472</text>

              <circle cx="360" cy="360" r="55" fill="#7B9E6B" opacity={0.12} stroke="#7B9E6B" strokeWidth={1.5} />
              <text x="360" y="352" textAnchor="middle" fill="#7B9E6B" fontSize="14" fontWeight={600}>Moraga</text>
              <text x="360" y="370" textAnchor="middle" fill="#8b99a8" fontSize="10">16,790</text>

              {/* Acalanes UHSD — all three */}
              <line x1="190" y1="155" x2="530" y2="155" stroke="#4ECDC4" strokeWidth={2} opacity={0.35} />
              <line x1="360" y1="155" x2="360" y2="310" stroke="#4ECDC4" strokeWidth={2} opacity={0.35} />
              <rect x="295" y="140" width="130" height="30" rx="8" fill="#1a2636" stroke="#4ECDC4" strokeWidth={1.2} />
              <text x="360" y="160" textAnchor="middle" fill="#4ECDC4" fontSize="10" fontWeight={600}>Acalanes UHSD</text>

              {/* CC County Sheriff — Lafayette + Orinda */}
              <line x1="190" y1="125" x2="530" y2="125" stroke="#9B7ED8" strokeWidth={1.5} opacity={0.25} />
              <rect x="300" y="95" width="120" height="26" rx="6" fill="#1a2636" stroke="#9B7ED8" strokeWidth={1} />
              <text x="360" y="112" textAnchor="middle" fill="#9B7ED8" fontSize="9" fontWeight={500}>CC County Sheriff</text>

              {/* MOFD Fire — Orinda + Moraga */}
              <line x1="545" y1="190" x2="395" y2="315" stroke="#E67E54" strokeWidth={2} opacity={0.4} strokeDasharray="6,3" />
              <rect x="440" y="235" width="110" height="28" rx="8" fill="#1a2636" stroke="#E67E54" strokeWidth={1.2} />
              <text x="495" y="253" textAnchor="middle" fill="#E67E54" fontSize="10" fontWeight={600}>MOFD Fire</text>

              {/* Lafayette only: ConFire */}
              <line x1="120" y1="193" x2="105" y2="218" stroke="#5B9BD5" strokeWidth={1.5} opacity={0.35} />
              <rect x="50" y="218" width="110" height="26" rx="6" fill="#1a2636" stroke="#5B9BD5" strokeWidth={1} opacity={0.8} />
              <text x="105" y="235" textAnchor="middle" fill="#5B9BD5" fontSize="9" fontWeight={500}>ConFire (County)</text>

              {/* Moraga only: Own Police Dept */}
              <rect x="290" y="420" width="140" height="26" rx="6" fill="#1a2636" stroke="#7B9E6B" strokeWidth={1} opacity={0.8} />
              <text x="360" y="437" textAnchor="middle" fill="#7B9E6B" fontSize="9" fontWeight={500}>Moraga Police Dept</text>
              <text x="360" y="455" textAnchor="middle" fill="#8b99a8" fontSize="7">Independent (12 officers)</text>

              {/* Moraga Way evacuation corridor */}
              <path d="M 540 190 Q 460 275 390 320" fill="none" stroke="#E05555" strokeWidth={2} opacity={0.45} strokeDasharray="4,2" />
              <text x="500" y="262" fill="#E05555" fontSize="8" opacity={0.7} transform="rotate(-40, 500, 262)">Moraga Way</text>

              {/* EBMUD Water — all three */}
              <rect x="10" y="300" width="90" height="22" rx="4" fill="#1a2636" stroke="#8b99a8" strokeWidth={0.5} opacity={0.4} />
              <text x="55" y="315" textAnchor="middle" fill="#8b99a8" fontSize="7" opacity={0.6}>EBMUD Water</text>

              {/* CC County Library — all three */}
              <rect x="560" y="400" width="120" height="22" rx="4" fill="#1a2636" stroke="#8b99a8" strokeWidth={0.5} opacity={0.4} />
              <text x="620" y="415" textAnchor="middle" fill="#8b99a8" fontSize="7" opacity={0.6}>CC County Library</text>
            </svg>
          </div>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.7rem",
              color: "var(--page-text-muted)",
              textAlign: "center",
              marginTop: "0.75rem",
            }}
          >
            Verified against official city, district, and county websites.
            Dashed line = shared evacuation corridor.
          </p>
        </div>
      </section>

      {/* ================================================================
          CHAPTER 8 — THREE CULTURES
          ================================================================ */}
      <section className="lam-editorial-section" id="three-cultures">
        <div className="article-prose-header">
          <span className="article-section-num">08</span>
          <h2>Three Cultures of Governance</h2>
        </div>
        <div className="article-body-prose">
          <p>
            When we compare what each city talks about in council, the
            priorities emerge not as differences of degree but as differences
            of kind. The topic rates below reflect the percentage of council
            meetings since January 2023 where each subject appeared as a
            substantive agenda item. The sample sizes&nbsp;&mdash; 85 meetings
            in Lafayette, 62 in Orinda, 64 in Moraga&nbsp;&mdash; are large
            enough for meaningful statistical comparison. Topics marked with
            an asterisk showed statistically significant differences across
            the three cities (chi-squared test, Bonferroni-corrected pairwise
            comparisons).
          </p>
        </div>

        {/* Topic comparison visualization */}
        <div
          className="lam-graphic"
          ref={topicsRef}
          style={{
            opacity: topicsVisible ? 1 : 0,
            transform: topicsVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s var(--ease-elegant)",
          }}
        >
          {DATA.councilTopics.map((t) => (
            <TopicComparisonBar
              key={t.topic}
              topic={t.topic}
              lafayette={t.lafayette}
              orinda={t.orinda}
              moraga={t.moraga}
              maxPct={maxTopicPct}
              significant={
                ["Fire Safety & Wildfire", "Budget & Revenue", "Transportation & Traffic", "Infrastructure & Utilities"].includes(t.topic)
              }
            />
          ))}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.6rem",
              color: "var(--page-text-muted)",
              marginTop: "0.75rem",
            }}
          >
            * Statistically significant difference across the three cities
            (chi-squared, <em>p</em> &lt; 0.05, Bonferroni-corrected pairwise
            Fisher exact tests). Council stratum only, Jan 2023+. n = 85 /
            62 / 64. Wilson 95% confidence intervals.
          </p>
        </div>

        <div className="article-body-prose">
          <p>
            Lafayette is the loudest of the three. Its average contentiousness
            score (2.10 on our 5-point scale) and public engagement score
            (2.58) are both the highest, and the difference from Moraga is
            statistically significant at <em>p</em> &lt; 0.001 on the
            Kruskal-Wallis test. Nine percent of Lafayette meetings registered
            as contentious. Moraga recorded zero. Orinda falls between them
            (4.8% contentious) but carries the highest share of engaged
            meetings (81%) compared to Lafayette (72%) and Moraga (55%). The
            difference suggests Orinda residents participate actively but
            disagree less bitterly&nbsp;&mdash; a pattern consistent with a
            community united by a common threat.
          </p>
          <p>
            The October 2025 Lafayette City Council meeting captured the
            texture of local democracy at its most granular and its most
            human. Earlier in the evening, the council approved $135,000 for
            a public art installation of metal dandelion seeds near BART.
            Later, the agenda turned to a question that had consumed four
            mediation meetings, generated threatened lawsuits from both sides,
            and brought 30 speakers to the microphone: whether to convert
            Cheney Field&rsquo;s infield from grass to dirt so that girls
            could play competitive softball.
          </p>
          <p>
            Harper, a sixth-grader, told the council: &ldquo;I think
            it&rsquo;s unfair that the boys get so much time to practice on
            nice fields while we have to practice on not so nice fields.&rdquo;
            Samantha Wolf, a parent of both a son and daughter in Lafayette
            sports, presented the numbers: 135 hours of field time for girls
            softball versus more than 33,500 hours for boys baseball. Liz
            Cheney&nbsp;&mdash; the widow of the man the contested field was
            named for&nbsp;&mdash; and her son Dylan, who was expecting a
            daughter in a week, both spoke in favor of opening the field to
            girls. &ldquo;It is 2025,&rdquo; Liz Cheney said. &ldquo;Are we
            seriously talking about equity still?&rdquo;
          </p>
          <p>
            Then came the line that crystallized the evening. Ben Tishan, a
            CYO athletic director, pointed to the art funding vote from
            earlier: &ldquo;There&rsquo;s $135,000 for synthetic dandelions
            in the budget. I&rsquo;m sure we can find money for synthetic
            grass.&rdquo; The council voted unanimously to convert the field.
          </p>
          <p>
            That meeting&nbsp;&mdash; dandelions, softball, and a family name
            on a field&nbsp;&mdash; is what local governance actually sounds
            like in Lamorinda. Not the abstract policy debates that dominate
            state and national coverage, but the lived-in arguments about
            whose kids get which field, whose street gets which sidewalk,
            and whether $135,000 for public art is an investment in civic
            beauty or an insult to families who have been waiting 40 years
            for equal access to a patch of dirt.
          </p>
        </div>
      </section>

      {/* ================================================================
          CONCLUSION
          ================================================================ */}
      <section
        className="lam-conclusion"
        ref={conclusionRef}
        style={{
          opacity: conclusionVisible ? 1 : 0,
          transform: conclusionVisible
            ? "translateY(0)"
            : "translateY(30px)",
          transition: "all 0.8s var(--ease-elegant)",
        }}
      >
        <div className="lam-conclusion-number">
          {DATA.summary.totalTranscribed.toLocaleString()}
        </div>
        <div className="lam-conclusion-label">
          meetings. 17.8 million words. Three cities that look the same from
          the freeway but govern according to entirely different ideas about
          what a town owes its residents&nbsp;&mdash; and what residents owe
          each other.
        </div>
      </section>

      <div style={{ position: "relative", zIndex: 50 }}>
      <MethodologySection
        prefix="lam"
        title="How We Built This Analysis"
        items={[
          {
            label: "Data Source",
            content: `${DATA.summary.totalTranscribed} meeting transcripts from Lafayette (Granicus archive), Orinda and Moraga (YouTube), and MOFD (mixed sources). Transcribed with AssemblyAI speaker diarization. Date range: ${DATA.summary.dateRange.start} to ${DATA.summary.dateRange.end}. Total corpus: 17.8 million words across 14 government bodies.`,
          },
          {
            label: "Analysis Method",
            content:
              "Five-pass NLP pipeline: (1) speaker identification via roll call parsing, (2) whole-meeting structured analysis via Claude Sonnet 4.6 with 10-topic Lamorinda-specific taxonomy and 4 rhetorical dimensions (contentiousness, engagement, complexity, humor), (3) cross-meeting issue threading, (4) deep quote extraction via Claude Opus 4.6 on highest-signal meetings, (5) cross-city statistical synthesis with Wilson 95% confidence intervals, chi-squared and Fisher exact tests (Bonferroni-corrected), and Kruskal-Wallis for ordinal comparisons.",
          },
          {
            label: "Fiscal Data",
            content:
              "U.S. Census Bureau ACS 5-year estimates 2023 (demographics). California State Controller's Office Financial Transaction Reports FY 2023-24 (revenue, expenditure). City adopted budgets FY2025-26 for Lafayette, Orinda, and Moraga. AUHSD budget from The Orinda News and CalTax. MOFD budget estimated from Lamorinda Weekly and CA State Controller.",
          },
          {
            label: "Statistical Notes",
            content:
              "Cross-city topic comparisons use the council stratum (Jan 2023+) exclusively: n = 85 Lafayette, 62 Orinda, 64 Moraga. 'Significant' means p < 0.05 after Bonferroni correction across all pairwise comparisons. Effect sizes reported as Cohen's h. Ordinal scores (contentiousness, engagement) compared via Kruskal-Wallis H test. Lafayette's deeper archive (back to 2015) is not used for cross-city comparisons.",
          },
          {
            label: "Limitations",
            content:
              "Lafayette has a deeper meeting archive (Granicus, back to 2015) than Orinda and Moraga (YouTube, primarily 2023+). Cross-city comparisons are restricted to the 2023+ stratum to control for this imbalance. Speaker identification is imperfect — only high-confidence attributions are used for named quotes. Moraga's smaller sample size (n=64) produces wider confidence intervals. MOFD budget data is estimated; the district's website blocks automated access.",
          },
        ]}
      />
      </div>

      <SocialShare title="The Lamorinda Triangle — The District" />
      <ArticleEndCTA />
      <SourcesCitations sources={SOURCES} />
      <SubscribeBar />
    </main>
  );
}
