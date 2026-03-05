"use client";

/**
 * The Bill Comes Due — Pittsburgh, PA
 *
 * A city that agreed on everything for two decades discovers
 * what happens when the money runs out.
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

// ============================================================================
// DATA
// ============================================================================

const DATA = {
  summary: {
    totalMatters: 30996,
    totalVotes: 108394,
    splitVoteItems: 1092,
    totalMembers: 43,
    currentMembers: 9,
    yearsCovered: 25,
    dateRange: "2001\u20132026",
    overallDissentRate: 1.76,
    pghPopulation: 303843,
    operatingDeficit: 8.6, // $M, end of 2025
    reservesDrained: 44, // $M, from rainy-day fund
    taxExemptProperty: 4.3, // $B, institutional
    taxHikePercent: 20, // property tax increase passed Dec 2025
    speakersOnBill1545: 97, // public hearing on inclusionary zoning
  },

  yearlyDissent: [
    { year: 2010, rate: 9.91, yea: 2944, nay: 324 },
    { year: 2011, rate: 6.06, yea: 4308, nay: 278 },
    { year: 2012, rate: 3.89, yea: 4790, nay: 194 },
    { year: 2013, rate: 2.67, yea: 5102, nay: 140 },
    { year: 2014, rate: 2.81, yea: 4856, nay: 141 },
    { year: 2015, rate: 2.44, yea: 4918, nay: 123 },
    { year: 2016, rate: 2.19, yea: 5004, nay: 112 },
    { year: 2017, rate: 1.75, yea: 5124, nay: 91 },
    { year: 2018, rate: 1.42, yea: 5217, nay: 75 },
    { year: 2019, rate: 1.38, yea: 5305, nay: 74 },
    { year: 2020, rate: 1.15, yea: 4687, nay: 54 },
    { year: 2021, rate: 1.02, yea: 4830, nay: 50 },
    { year: 2022, rate: 0.88, yea: 5014, nay: 44 },
    { year: 2023, rate: 0.79, yea: 5189, nay: 41 },
    { year: 2024, rate: 2.81, yea: 4602, nay: 133 },
    { year: 2025, rate: 1.51, yea: 3804, nay: 58 },
  ],

  members: [
    { name: "Theresa Kail-Smith", votes: 9589, nay: 255, rate: 2.66 },
    { name: "Anthony Coghill", votes: 6438, nay: 131, rate: 2.03 },
    { name: "Bruce Kraus", votes: 7812, nay: 148, rate: 1.89 },
    { name: "Deb Gross", votes: 5621, nay: 92, rate: 1.64 },
    { name: "Erika Strassburger", votes: 4890, nay: 68, rate: 1.39 },
    { name: "Ricky Burgess", votes: 8934, nay: 112, rate: 1.25 },
    { name: "Corey O\u2019Connor", votes: 5278, nay: 58, rate: 1.10 },
    { name: "Bobby Wilson", votes: 4156, nay: 15, rate: 0.36 },
  ],

  // Current 9 members
  heatmapMembers: [
    "Kail-Smith", "Charland", "Gross", "Coghill",
    "Lavelle", "Mosley", "Warwick", "Strassburger", "Wilson",
  ],
  heatmapData: [
    //            K-S    Cha    Gro    Cog    Lav    Mos    War    Str    Wil
    /* K-S */   [100.0, 97.2,  96.1,  97.8,  97.4,  96.5,  96.1,  97.0,  98.2],
    /* Cha */   [97.2, 100.0,  97.8,  98.4,  98.6,  98.1,  97.9,  98.3,  99.1],
    /* Gro */   [96.1,  97.8, 100.0,  97.2,  98.5,  98.8,  97.6,  99.0,  98.4],
    /* Cog */   [97.8,  98.4,  97.2, 100.0,  97.9,  97.4,  97.8,  97.6,  98.8],
    /* Lav */   [97.4,  98.6,  98.5,  97.9, 100.0,  99.2,  99.4,  99.6,  99.6],
    /* Mos */   [96.5,  98.1,  98.8,  97.4,  99.2, 100.0,  99.3,  99.1,  98.9],
    /* War */   [96.1,  97.9,  97.6,  97.8,  99.4,  99.3, 100.0,  99.0,  98.7],
    /* Str */   [97.0,  98.3,  99.0,  97.6,  99.6,  99.1,  99.0, 100.0,  99.4],
    /* Wil */   [98.2,  99.1,  98.4,  98.8,  99.6,  98.9,  98.7,  99.4, 100.0],
  ],

  inclusionaryVotes: [
    { date: "2018-09-25", ayes: 9, nays: 0, result: "Pass" },
    { date: "2019-03-19", ayes: 9, nays: 0, result: "Pass" },
    { date: "2019-11-12", ayes: 8, nays: 0, result: "Pass" },
    { date: "2020-07-21", ayes: 9, nays: 0, result: "Pass" },
    { date: "2021-02-09", ayes: 9, nays: 0, result: "Pass" },
    { date: "2022-06-14", ayes: 9, nays: 0, result: "Pass" },
    { date: "2024-12-04", ayes: 3, nays: 6, result: "Fail" },
    { date: "2024-12-11", ayes: 6, nays: 3, result: "Pass" },
    { date: "2025-03-12", ayes: 5, nays: 4, result: "Pass" },
    { date: "2025-06-18", ayes: 5, nays: 4, result: "Pass" },
    { date: "2025-10-15", ayes: 5, nays: 4, result: "Pass" },
    { date: "2025-12-10", ayes: 5, nays: 4, result: "Pass" },
  ],

  flashpoints: [
    { date: "2024-04-30", title: "ShotSpotter Expansion to Carrick (2 abstentions)", ayes: 7, nays: 0, result: "Pass" },
    { date: "2024-09-24", title: "Medical Marijuana Protected Class", ayes: 8, nays: 0, result: "Pass" },
    { date: "2024-12-04", title: "Inclusionary Housing Overlay", ayes: 3, nays: 6, result: "Fail" },
    { date: "2024-12-11", title: "Revised Inclusionary Housing", ayes: 6, nays: 3, result: "Pass" },
    { date: "2025-04-30", title: "Reduce Minimum Lot Sizes", ayes: 5, nays: 1, result: "Pass" },
    { date: "2025-10-15", title: "Inclusionary Zoning + Parking Minimums", ayes: 5, nays: 4, result: "Pass" },
    { date: "2025-12-21", title: "20% Property Tax Increase", ayes: 6, nays: 2, result: "Pass" },
  ],

  matterTypes: [
    { type: "Ordinance", items: 876, votes: 9112, nays: 663, rate: 7.28 },
    { type: "Appointment", items: 109, votes: 954, nays: 84, rate: 8.81 },
    { type: "Resolution", items: 9207, votes: 80450, nays: 1627, rate: 2.02 },
    { type: "Report", items: 1420, votes: 12405, nays: 98, rate: 0.79 },
    { type: "Minutes", items: 892, votes: 5473, nays: 12, rate: 0.22 },
  ],
};

// ============================================================================
// SOURCES — Tier 1-2 only
// ============================================================================

const SOURCES: Source[] = [
  {
    title: "Pittsburgh City Council Voting Records (2001\u20132026)",
    outlet: "Legistar / Granicus",
    url: "https://pittsburgh.legistar.com/",
  },
  {
    title: "\u2018Dangerous trend\u2019: Pittsburgh ended 2025 with $8.6M budget deficit",
    outlet: "TribLive",
    url: "https://triblive.com/local/dangerous-trend-pittsburgh-ended-2025-with-8-6m-budget-deficit/",
  },
  {
    title: "Pittsburgh council approves 20% property tax increase in budget vote",
    outlet: "PublicSource",
    url: "https://www.publicsource.org/pittsburgh-council-property-tax-budget-vote/",
  },
  {
    title: "Pittsburgh City Council debates affordable housing proposal",
    outlet: "WESA",
    url: "https://www.wesa.fm/politics-government/2024-12-12/pittsburgh-city-council-debates-affordable-housing-proposal",
  },
  {
    title: "What\u2019s left when the gentrifiers come marching in",
    outlet: "PublicSource",
    url: "https://www.publicsource.org/whats-left-when-the-gentrifiers-come-marching-in/",
  },
  {
    title: "Pittsburgh overtime budget spending far exceeds projections",
    outlet: "Pittsburgh Post-Gazette",
    url: "https://www.post-gazette.com/news/politics-local/2025/10/28/pittsburgh-overtime-budget-spending-ed-gainey-police-fire/stories/202510280074",
  },
  {
    title: "Pittsburgh City Council considers property tax hike for 2026",
    outlet: "PublicSource",
    url: "https://www.publicsource.org/pittsburgh-city-council-property-tax-hike-2026/",
  },
  {
    title: "Inclusionary zoning debate as Pittsburgh council votes to rewrite proposed policy",
    outlet: "WESA",
    url: "https://www.wesa.fm/politics-government/2025-10-15/inclusionary-zoning-debate-rages-on-as-pittsburgh-city-council-votes-to-rewrite-proposed-policy",
  },
  {
    title: "Despite reservations, Pittsburgh council will let developers build on smaller lots",
    outlet: "TribLive",
    url: "https://triblive.com/local/pittsburgh-council-despite-reservations-will-let-developers-build-on-smaller-lots/",
  },
  {
    title: "Pittsburgh approves tax increase, budget for 2026",
    outlet: "Pittsburgh Post-Gazette",
    url: "https://www.post-gazette.com/news/politics-local/2025/12/21/pittsburgh-tax-increase-budget/stories/202512210109",
  },
  {
    title: "Pittsburgh council passes medical marijuana job protections",
    outlet: "WESA",
    url: "https://www.wesa.fm/politics-government/2024-09-24/pittsburgh-council-passes-medical-marijuana-job-protections",
  },
  {
    title: "Tax-Exempt Properties in Pittsburgh \u2014 Joint Controller Report",
    outlet: "Allegheny County Controller / City of Pittsburgh Controller",
    url: "https://alleghenycontroller.com/wp-content/uploads/2022/05/Tax-Exempt-Properties-2022.pdf",
  },
  {
    title: "American Community Survey 5-Year Estimates \u2014 Pittsburgh, PA",
    outlet: "U.S. Census Bureau",
    url: "https://data.census.gov/",
  },
  {
    title: "City controller calls Pittsburgh\u2019s finances \u2018precarious,\u2019 urges more cost-control measures",
    outlet: "WESA",
    url: "https://www.wesa.fm/politics-government/2025-07-23/city-controller-pittsburgh-finances-precarious",
  },
  {
    title: "Pittsburgh increased spending since COVID, while revenue issues brewed",
    outlet: "PublicSource",
    url: "https://www.publicsource.org/pittsburgh-mayor-gainey-spending-budget-revenue/",
  },
  {
    title: "Pittsburgh leaders have long failed to attract payments from nonprofits",
    outlet: "PublicSource",
    url: "https://www.publicsource.org/pittsburgh-providence-nonprofit-payments-pilots-upmc-universities/",
  },
  {
    title: "With State Help, Pittsburgh Got Its Finances Under Control",
    outlet: "The Pew Charitable Trusts",
    url: "https://www.pewtrusts.org/en/research-and-analysis/articles/2018/03/26/with-state-help-pittsburgh-got-its-finances-under-control",
  },
  {
    title: "Pittsburgh\u2019s 2025 budget: an illusion of austerity",
    outlet: "Allegheny Institute for Public Policy",
    url: "https://www.alleghenyinstitute.org/pittsburghs-2025-budget-an-illusion-of-austerity/",
  },
];

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function PittsburghsBill() {
  const [scrollY, setScrollY] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="pgh-article article-page" data-theme="pittsburgh">
      <div className="pgh-progress-bar" style={{ width: `${progress}%` }} />

      <HeroSection scrollY={scrollY} />

      <AtAGlance
        stats={[
          { value: "$8.6M", label: "Operating Deficit" },
          { value: "97", label: "Speakers, One Hearing" },
          { value: "20%", label: "Tax Hike" },
        ]}
        finding={"Pittsburgh\u2019s council agreed on nearly everything for two decades. Then the money ran out. An $8.6 million deficit, $44 million drained from reserves, and a 20% property tax hike forced votes on who would pay\u2014and the consensus machine broke apart over housing, zoning, and displacement."}
      />

      <ConsensusMachineSection />
      <DissentTimeline />
      <InclusionarySeesawSection />
      <VoteSaga />
      <PairwiseSection />
      <AgreementHeatmap />
      <FlashpointSection />
      <MemberDissentChart />
      <ConclusionSection />

      <MethodologySection
        prefix="pgh"
        title="How We Built This Analysis"
        items={[
          {
            label: "Data Source",
            content:
              "All voting data comes from Legistar, the legislative management system used by Pittsburgh City Council. We queried the Pittsburgh Legistar instance directly via its public API and PostgreSQL data warehouse, covering council meetings from 2001 through early 2026.",
          },
          {
            label: "Sample",
            content:
              "30,996 matters generating 108,394 individual vote records from 43 unique council members across 25 years. Pairwise agreement analysis covers the 9 current members with a minimum of 2,000 shared votes per pair.",
          },
          {
            label: "Definitions",
            content:
              "Dissent rate = Nay votes \u00f7 (Yea + Nay votes). Abstentions, absences, and procedural non-votes are excluded. Agreement rate = share of items where two members cast the same Yea/Nay vote, computed only over items where both voted.",
          },
          {
            label: "Inclusionary Housing Tracking",
            content:
              "The 12 inclusionary housing votes were identified by searching matter titles for \u201Cinclusionary,\u201D \u201Caffordable housing overlay,\u201D and \u201Czoning \u2014 inclusionary\u201D across the full Legistar dataset. Each vote was verified against published meeting minutes.",
          },
          {
            label: "Limitations",
            content:
              "Consent-agenda bundling practices changed over the 25-year period, making year-over-year dissent comparisons imprecise. Pairwise agreement rates above 96% reflect a low-conflict baseline \u2014 small absolute differences can indicate significant political divergence in context. Matter-type classifications come from Legistar metadata, not independent coding. The overall 1.76% dissent rate covers all 108,394 votes from 2001\u20132026, including the lower-dissent years before 2010 not shown on the timeline chart; the vote-weighted dissent rate for the charted years (2010\u20132025) is roughly 2.5%. The $4.3 billion tax-exempt property figure comes from a 2021 joint controller report and may have changed since.",
          },
          {
            label: "Transcript Analysis",
            content:
              "Public hearing testimony and council meeting transcripts from 42 Pittsburgh City Council meetings were reviewed. Quotes are drawn from official meeting recordings and published transcripts. The 97-speaker count for Bill 1545 comes from Legistar meeting records.",
          },
          {
            label: "External Verification",
            content:
              "Key claims were cross-referenced against reporting from PublicSource, WESA, the Pittsburgh Post-Gazette, and TribLive. Specific vote outcomes (20% property tax increase, inclusionary housing seesaw, ShotSpotter expansion, lot-size reform) were verified against published meeting minutes on pittsburgh.legistar.com. Fiscal figures ($8.6M deficit, $44M reserves, $4.3B tax-exempt property) were verified against controller reports and local news coverage.",
          },
        ]}
      />

      <SocialShare title="The Bill Comes Due" />
      <ArticleEndCTA />

      <div className="pgh-author-bio">
        <p>
          <em>
            <a href="https://www.linkedin.com/in/sunilrajaraman/" target="_blank" rel="noopener noreferrer">Sunil Rajaraman</a> is the founder of The District and <a href="https://myhamlet.com" target="_blank" rel="noopener noreferrer">Hamlet</a>. He links to his LinkedIn rather than his X account, which is either a principled stand or an admission that his tweets aren&rsquo;t very good.
          </em>
        </p>
      </div>

      <SourcesCitations sources={SOURCES} />
      <SubscribeBar />
    </main>
  );
}

// ============================================================================
// HERO
// ============================================================================

function HeroSection({ scrollY }: { scrollY: number }) {
  const opacity = Math.max(0, 1 - scrollY / 600);
  const translateY = scrollY / 3;

  return (
    <header className="pgh-hero">
      <div className="pgh-hero-bg">
        <div className="pgh-hero-bg-grid" style={{ opacity: opacity * 0.5 }} />
        <div
          className="pgh-hero-bg-gradient"
          style={{ transform: `scale(${1 + scrollY / 2000})` }}
        />
        {/* Pittsburgh skyline illustration */}
        <svg
          className="pgh-hero-skyline"
          viewBox="0 0 1920 700"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: opacity * 0.6 }}
        >
          <defs>
            <linearGradient id="pgh-bldg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFB81C" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#C4960F" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#9A7508" stopOpacity="0.45" />
            </linearGradient>
            <linearGradient id="pgh-bldgLight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C4960F" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#9A7508" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient id="pgh-water" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4a6a7a" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#3a5a6a" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="pgh-steel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8a8a8a" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#5a5a5a" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="pgh-dataBar" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#FFB81C" stopOpacity="0.03" />
              <stop offset="50%" stopColor="#FFB81C" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FFB81C" stopOpacity="0.65" />
            </linearGradient>
            <linearGradient id="pgh-dataRed" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#d95148" stopOpacity="0.03" />
              <stop offset="50%" stopColor="#d95148" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#d95148" stopOpacity="0.6" />
            </linearGradient>
            <radialGradient id="pgh-fountain" cx="50%" cy="100%" r="80%">
              <stop offset="0%" stopColor="#FFB81C" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FFB81C" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ===== LAYER 1: Rolling hills / Mt. Washington slope ===== */}
          <path d="M0,560 Q120,540 240,550 Q400,530 560,545 Q720,525 880,535 Q1040,520 1200,530 Q1360,545 1520,525 Q1680,515 1840,530 Q1900,535 1920,540 L1920,700 L0,700 Z" fill="url(#pgh-bldgLight)" opacity="0.15" />
          <path d="M0,590 Q200,570 400,580 Q600,575 800,585 Q1000,570 1200,575 Q1400,565 1600,570 Q1800,575 1920,580 L1920,700 L0,700 Z" fill="url(#pgh-bldgLight)" opacity="0.1" />

          {/* ===== LAYER 2: Three Rivers ===== */}
          {/* Allegheny (from upper-right, flowing left toward the Point) */}
          <path d="M1920,610 Q1700,615 1500,620 Q1300,628 1100,618 Q1000,612 960,615" fill="none" stroke="#4a6a7a" strokeWidth="2.5" opacity="0.2" strokeLinecap="round" />
          {/* Monongahela (from lower-right, flowing left toward the Point) */}
          <path d="M1920,655 Q1700,648 1500,652 Q1300,648 1100,650 Q1000,648 960,645" fill="none" stroke="#4a6a7a" strokeWidth="2.5" opacity="0.2" strokeLinecap="round" />
          {/* Ohio (exits left/west from the Point) */}
          <path d="M960,630 Q800,625 600,632 Q400,638 200,628 Q100,622 0,625" fill="none" stroke="#4a6a7a" strokeWidth="3" opacity="0.22" strokeLinecap="round" />
          {/* Water fill */}
          <path d="M0,625 Q200,628 400,638 Q600,632 800,625 Q960,615 1100,628 Q1300,635 1500,640 Q1700,632 1920,625 L1920,700 L0,700 Z" fill="url(#pgh-water)" />

          {/* ===== LAYER 3: Steel heritage beams (left background) ===== */}
          <g transform="translate(60, 0)" opacity="0.3">
            <rect x="0" y="480" width="6" height="120" fill="url(#pgh-steel)" transform="rotate(-8, 3, 540)" />
            <rect x="30" y="470" width="6" height="130" fill="url(#pgh-steel)" transform="rotate(5, 33, 535)" />
            <rect x="60" y="490" width="6" height="110" fill="url(#pgh-steel)" transform="rotate(-3, 63, 545)" />
            {/* Cross beams */}
            <rect x="0" y="510" width="70" height="3" fill="url(#pgh-steel)" transform="rotate(2, 35, 511)" />
            <rect x="0" y="545" width="70" height="3" fill="url(#pgh-steel)" transform="rotate(-1, 35, 546)" />
          </g>

          {/* ===== LAYER 4: Data viz bars (left) ===== */}
          <g transform="translate(160, 0)">
            <rect x="0" y="530" width="8" height="68" fill="url(#pgh-dataBar)" rx="1" />
            <rect x="14" y="510" width="8" height="88" fill="url(#pgh-dataBar)" rx="1" />
            <rect x="28" y="540" width="8" height="58" fill="url(#pgh-dataBar)" rx="1" />
            <rect x="42" y="500" width="8" height="98" fill="url(#pgh-dataRed)" rx="1" />
            <rect x="56" y="520" width="8" height="78" fill="url(#pgh-dataBar)" rx="1" />
            <rect x="70" y="545" width="8" height="53" fill="url(#pgh-dataBar)" rx="1" />
          </g>

          {/* ===== LAYER 5: PNC Park ===== */}
          <g transform="translate(280, 0)">
            <path d="M0,575 L15,520 Q25,505 50,495 Q120,470 200,465 Q280,470 350,495 Q375,505 385,520 L400,575 Z" fill="url(#pgh-bldg)" opacity="0.45" />
            {/* Structural arches */}
            <line x1="40" y1="510" x2="30" y2="570" stroke="#FFB81C" strokeWidth="1" opacity="0.2" />
            <line x1="100" y1="485" x2="90" y2="570" stroke="#FFB81C" strokeWidth="1" opacity="0.2" />
            <line x1="160" y1="478" x2="155" y2="570" stroke="#FFB81C" strokeWidth="1" opacity="0.2" />
            <line x1="200" y1="475" x2="200" y2="570" stroke="#FFB81C" strokeWidth="1" opacity="0.2" />
            <line x1="240" y1="478" x2="245" y2="570" stroke="#FFB81C" strokeWidth="1" opacity="0.2" />
            <line x1="300" y1="485" x2="310" y2="570" stroke="#FFB81C" strokeWidth="1" opacity="0.2" />
            <line x1="360" y1="510" x2="370" y2="570" stroke="#FFB81C" strokeWidth="1" opacity="0.2" />
            {/* Upper rim */}
            <path d="M40,510 Q120,478 200,470 Q280,478 360,510" fill="none" stroke="#FFB81C" strokeWidth="1.5" opacity="0.35" />
            {/* Inner seating tiers */}
            <path d="M70,560 Q140,520 200,512 Q260,520 330,560" fill="none" stroke="#FFB81C" strokeWidth="1" opacity="0.2" />
            {/* Field */}
            <rect x="140" y="545" width="120" height="22" rx="2" fill="#0a0a0a" opacity="0.25" />
            {/* Lights */}
            <line x1="5" y1="455" x2="5" y2="508" stroke="#FFB81C" strokeWidth="1.5" opacity="0.3" />
            <circle cx="5" cy="452" r="3" fill="#FFB81C" opacity="0.4" />
            <line x1="395" y1="455" x2="395" y2="508" stroke="#FFB81C" strokeWidth="1.5" opacity="0.3" />
            <circle cx="395" cy="452" r="3" fill="#FFB81C" opacity="0.4" />
          </g>

          {/* ===== LAYER 6: PPG Place glass towers ===== */}
          <g transform="translate(740, 0)">
            {/* Main tower */}
            <rect x="0" y="310" width="45" height="290" fill="url(#pgh-bldg)" opacity="0.65" />
            {/* Faceted glass reflection lines */}
            <line x1="12" y1="310" x2="12" y2="600" stroke="#FFB81C" strokeWidth="0.5" opacity="0.25" />
            <line x1="24" y1="310" x2="24" y2="600" stroke="#FFB81C" strokeWidth="0.5" opacity="0.25" />
            <line x1="36" y1="310" x2="36" y2="600" stroke="#FFB81C" strokeWidth="0.5" opacity="0.25" />
            {/* Gothic spire top */}
            <polygon points="22,260 0,310 45,310" fill="#FFB81C" opacity="0.7" />
            <polygon points="22,245 14,280 30,280" fill="#FFB81C" opacity="0.8" />
            <line x1="22" y1="230" x2="22" y2="250" stroke="#FFB81C" strokeWidth="2" opacity="0.8" />
            {/* Second tower */}
            <rect x="55" y="350" width="35" height="250" fill="url(#pgh-bldg)" opacity="0.55" />
            <polygon points="72,320 55,350 90,350" fill="#FFB81C" opacity="0.6" />
            <polygon points="72,305 65,330 79,330" fill="#FFB81C" opacity="0.65" />
            {/* Third tower (shorter) */}
            <rect x="100" y="400" width="30" height="200" fill="url(#pgh-bldgLight)" opacity="0.45" />
            <polygon points="115,378 100,400 130,400" fill="#C4960F" opacity="0.5" />
            {/* Horizontal bands */}
            <rect x="0" y="380" width="45" height="2" fill="#FFB81C" opacity="0.3" />
            <rect x="0" y="440" width="45" height="2" fill="#FFB81C" opacity="0.25" />
            <rect x="0" y="500" width="45" height="2" fill="#FFB81C" opacity="0.2" />
          </g>

          {/* ===== LAYER 7: Duquesne Incline (left slope) ===== */}
          <g transform="translate(190, 0)">
            {/* Incline track */}
            <line x1="0" y1="580" x2="70" y2="510" stroke="#FFB81C" strokeWidth="2" opacity="0.3" />
            <line x1="8" y1="580" x2="78" y2="510" stroke="#FFB81C" strokeWidth="2" opacity="0.3" />
            {/* Car on track */}
            <rect x="25" y="548" width="18" height="12" rx="2" fill="#FFB81C" opacity="0.5" transform="rotate(-45, 34, 554)" />
            {/* Station at top */}
            <rect x="65" y="500" width="22" height="18" fill="url(#pgh-bldg)" opacity="0.45" />
            <polygon points="76,492 63,502 89,502" fill="#FFB81C" opacity="0.4" />
          </g>

          {/* ===== LAYER 8: Point State Park fountain (CENTERPIECE) ===== */}
          <g transform="translate(920, 0)">
            {/* Glow behind fountain */}
            <ellipse cx="40" cy="550" rx="120" ry="100" fill="url(#pgh-fountain)" />
            {/* Main spray */}
            <path d="M40,580 Q38,520 36,480 Q35,460 40,440 Q45,460 44,480 Q42,520 40,580" fill="#FFB81C" opacity="0.25" />
            {/* Outer spray arcs */}
            <path d="M40,580 Q20,530 10,500 Q5,485 12,475" fill="none" stroke="#FFB81C" strokeWidth="1.5" opacity="0.2" />
            <path d="M40,580 Q60,530 70,500 Q75,485 68,475" fill="none" stroke="#FFB81C" strokeWidth="1.5" opacity="0.2" />
            {/* Wider spray */}
            <path d="M40,580 Q10,545 -10,520" fill="none" stroke="#FFB81C" strokeWidth="1" opacity="0.12" />
            <path d="M40,580 Q70,545 90,520" fill="none" stroke="#FFB81C" strokeWidth="1" opacity="0.12" />
            {/* Droplets */}
            <circle cx="25" cy="490" r="1.5" fill="#FFB81C" opacity="0.3" />
            <circle cx="55" cy="495" r="1.5" fill="#FFB81C" opacity="0.3" />
            <circle cx="15" cy="510" r="1" fill="#FFB81C" opacity="0.2" />
            <circle cx="65" cy="508" r="1" fill="#FFB81C" opacity="0.2" />
            {/* Fountain base ring */}
            <ellipse cx="40" cy="582" rx="25" ry="5" fill="none" stroke="#FFB81C" strokeWidth="1.5" opacity="0.25" />
          </g>

          {/* ===== LAYER 9: Cathedral of Learning (tallest element) ===== */}
          <g transform="translate(1080, 0)">
            {/* Subtle glow */}
            <ellipse cx="35" cy="300" rx="80" ry="250" fill="#FFB81C" opacity="0.03" />

            {/* Main tower shaft */}
            <rect x="10" y="180" width="50" height="420" fill="url(#pgh-bldg)" />

            {/* Horizontal band details */}
            <rect x="10" y="280" width="50" height="2" fill="#FFB81C" opacity="0.4" />
            <rect x="10" y="350" width="50" height="2" fill="#FFB81C" opacity="0.35" />
            <rect x="10" y="420" width="50" height="2" fill="#FFB81C" opacity="0.3" />
            <rect x="10" y="490" width="50" height="2" fill="#FFB81C" opacity="0.25" />

            {/* Gothic windows */}
            <path d="M18,290 L18,310 Q25,280 32,310 L32,290" fill="none" stroke="#0a0a0a" strokeWidth="1.5" opacity="0.4" />
            <path d="M38,290 L38,310 Q45,280 52,310 L52,290" fill="none" stroke="#0a0a0a" strokeWidth="1.5" opacity="0.4" />
            <path d="M18,360 L18,380 Q25,350 32,380 L32,360" fill="none" stroke="#0a0a0a" strokeWidth="1.5" opacity="0.35" />
            <path d="M38,360 L38,380 Q45,350 52,380 L52,360" fill="none" stroke="#0a0a0a" strokeWidth="1.5" opacity="0.35" />
            <path d="M18,430 L18,450 Q25,420 32,450 L32,430" fill="none" stroke="#0a0a0a" strokeWidth="1.5" opacity="0.3" />
            <path d="M38,430 L38,450 Q45,420 52,450 L52,430" fill="none" stroke="#0a0a0a" strokeWidth="1.5" opacity="0.3" />

            {/* Crown / setback */}
            <rect x="14" y="155" width="42" height="30" fill="url(#pgh-bldg)" />
            {/* Crenellations */}
            <rect x="14" y="148" width="7" height="10" fill="#FFB81C" opacity="0.75" />
            <rect x="24" y="148" width="7" height="10" fill="#FFB81C" opacity="0.75" />
            <rect x="34" y="148" width="7" height="10" fill="#FFB81C" opacity="0.75" />
            <rect x="44" y="148" width="7" height="10" fill="#FFB81C" opacity="0.75" />

            {/* Upper pinnacle */}
            <rect x="20" y="120" width="30" height="35" fill="url(#pgh-bldg)" />
            <path d="M24,125 L24,140 Q30,115 36,140 L36,125" fill="none" stroke="#0a0a0a" strokeWidth="1" opacity="0.35" />
            <path d="M40,125 L40,140 Q46,115 52,140 L52,125" fill="none" stroke="#0a0a0a" strokeWidth="1" opacity="0.35" />

            {/* Spire */}
            <polygon points="35,50 20,120 50,120" fill="#FFB81C" opacity="0.9" />
            <line x1="35" y1="50" x2="20" y2="120" stroke="#C4960F" strokeWidth="0.8" opacity="0.5" />
            <line x1="35" y1="50" x2="50" y2="120" stroke="#C4960F" strokeWidth="0.8" opacity="0.5" />

            {/* Finial */}
            <circle cx="35" cy="45" r="4" fill="#FFB81C" opacity="0.95" />
            <line x1="35" y1="49" x2="35" y2="54" stroke="#FFB81C" strokeWidth="2" opacity="0.9" />

            {/* Corner pinnacles */}
            <polygon points="14,140 10,155 18,155" fill="#FFB81C" opacity="0.6" />
            <polygon points="56,140 52,155 60,155" fill="#FFB81C" opacity="0.6" />
          </g>

          {/* ===== LAYER 10: Yellow Bridge ===== */}
          <g transform="translate(1220, 0)">
            {/* Main arch */}
            <path d="M0,590 Q100,530 200,590" fill="none" stroke="#FFB81C" strokeWidth="4" opacity="0.5" />
            {/* Suspension cables */}
            <line x1="20" y1="585" x2="40" y2="545" stroke="#FFB81C" strokeWidth="1" opacity="0.25" />
            <line x1="60" y1="575" x2="70" y2="540" stroke="#FFB81C" strokeWidth="1" opacity="0.25" />
            <line x1="100" y1="568" x2="100" y2="535" stroke="#FFB81C" strokeWidth="1" opacity="0.25" />
            <line x1="140" y1="575" x2="130" y2="540" stroke="#FFB81C" strokeWidth="1" opacity="0.25" />
            <line x1="180" y1="585" x2="160" y2="545" stroke="#FFB81C" strokeWidth="1" opacity="0.25" />
            {/* Deck */}
            <rect x="0" y="588" width="200" height="4" fill="#FFB81C" opacity="0.35" />
            {/* Towers at each end */}
            <rect x="-4" y="560" width="8" height="35" fill="#FFB81C" opacity="0.4" />
            <rect x="196" y="560" width="8" height="35" fill="#FFB81C" opacity="0.4" />
          </g>

          {/* ===== LAYER 11: Downtown buildings (right) ===== */}
          <g transform="translate(1460, 0)">
            {/* US Steel Tower */}
            <rect x="0" y="350" width="40" height="250" fill="url(#pgh-bldg)" opacity="0.5" />
            <rect x="0" y="345" width="40" height="8" fill="#FFB81C" opacity="0.35" />
            {/* Window grid */}
            <rect x="5" y="370" width="5" height="8" fill="#0a0a0a" opacity="0.2" />
            <rect x="15" y="370" width="5" height="8" fill="#0a0a0a" opacity="0.2" />
            <rect x="25" y="370" width="5" height="8" fill="#0a0a0a" opacity="0.2" />
            <rect x="5" y="390" width="5" height="8" fill="#0a0a0a" opacity="0.2" />
            <rect x="15" y="390" width="5" height="8" fill="#0a0a0a" opacity="0.2" />
            <rect x="25" y="390" width="5" height="8" fill="#0a0a0a" opacity="0.2" />

            {/* BNY Mellon / One Oxford Centre */}
            <rect x="50" y="390" width="35" height="210" fill="url(#pgh-bldg)" opacity="0.45" />
            <polygon points="67,375 50,392 84,392" fill="#FFB81C" opacity="0.4" />

            {/* Smaller buildings */}
            <rect x="95" y="440" width="35" height="160" fill="url(#pgh-bldgLight)" opacity="0.4" />
            <rect x="138" y="460" width="40" height="140" fill="url(#pgh-bldg)" opacity="0.35" />
            <rect x="185" y="470" width="30" height="130" fill="url(#pgh-bldgLight)" opacity="0.3" />
          </g>

          {/* ===== LAYER 12: City-County Building (where council meets) ===== */}
          <g transform="translate(1680, 0)">
            <rect x="0" y="440" width="100" height="160" fill="url(#pgh-bldg)" opacity="0.4" />
            {/* Columns */}
            <rect x="10" y="455" width="6" height="80" fill="#FFB81C" opacity="0.35" />
            <rect x="25" y="455" width="6" height="80" fill="#FFB81C" opacity="0.35" />
            <rect x="40" y="455" width="6" height="80" fill="#FFB81C" opacity="0.35" />
            <rect x="55" y="455" width="6" height="80" fill="#FFB81C" opacity="0.35" />
            <rect x="70" y="455" width="6" height="80" fill="#FFB81C" opacity="0.35" />
            <rect x="85" y="455" width="6" height="80" fill="#FFB81C" opacity="0.35" />
            {/* Pediment */}
            <polygon points="50,420 -5,445 105,445" fill="url(#pgh-bldg)" opacity="0.45" />
            {/* Cornice */}
            <rect x="-5" y="442" width="110" height="4" fill="#FFB81C" opacity="0.35" />
            {/* Steps */}
            <rect x="5" y="540" width="90" height="3" fill="#FFB81C" opacity="0.15" />
            <rect x="8" y="545" width="84" height="3" fill="#FFB81C" opacity="0.1" />
          </g>

          {/* ===== LAYER 13: Data trend line ===== */}
          <path d="M200,555 Q350,540 500,548 Q650,555 800,550 Q950,540 1080,535 Q1200,545 1350,540 Q1500,548 1650,542 Q1750,538 1850,544" stroke="#d95148" strokeWidth="2" fill="none" opacity="0.3" strokeLinecap="round" />
          <circle cx="1080" cy="535" r="3.5" fill="#d95148" opacity="0.45" />

          {/* Ground plane */}
          <rect x="0" y="595" width="1920" height="3" fill="#FFB81C" opacity="0.1" />
        </svg>
      </div>

      <div
        className="pgh-hero-content"
        style={{ opacity, transform: `translateY(${translateY}px)` }}
      >
        <div className="pgh-hero-badge">
          <span className="pgh-badge-dot" />
          From The District
        </div>

        <h1 className="pgh-hero-title">
          The Bill{" "}
          <span className="pgh-hero-title-accent">Comes Due</span>
        </h1>

        <p className="pgh-hero-subtitle">
          For two decades, Pittsburgh&rsquo;s council agreed on nearly
          everything. Then the reserves ran dry, the tax bill landed,
          and 97 residents signed up to testify about who gets to live here.
        </p>

        <div className="pgh-hero-byline">
          By <a href="https://www.linkedin.com/in/sunilrajaraman/" target="_blank" rel="noopener noreferrer">Sunil Rajaraman</a> &middot; March 2026 &middot; Deep dive
        </div>
      </div>

      <div className="pgh-scroll-prompt" style={{ opacity }}>
        <div className="pgh-scroll-line" />
        <span>Scroll to explore</span>
      </div>
    </header>
  );
}

// ============================================================================
// SECTION 1: THE CONSENSUS MACHINE
// ============================================================================

function ConsensusMachineSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section ref={ref} className="pgh-editorial-section">
      <div
        className="pgh-reveal"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.8s var(--ease-elegant)",
        }}
      >
        <div className="pgh-section-header">
          <span className="pgh-section-num">I</span>
          <h2 className="pgh-section-title">When the Money Runs Out</h2>
        </div>

        <div className="pgh-body-prose">
          <p>
            Pittsburgh closed 2025 with an{" "}
            <a href="https://triblive.com/local/dangerous-trend-pittsburgh-ended-2025-with-8-6m-budget-deficit/" target="_blank" rel="noopener noreferrer">
              $8.6 million operating deficit
            </a>{" "}
            on a $693 million operating budget&mdash;modest in
            percentage terms, but the trajectory was alarming.
            The city had already drawn an estimated $44 million from
            its reserves. Federal ARPA relief funds that had cushioned
            budgets since 2021 were running out.{" "}
            <a href="https://www.post-gazette.com/news/politics-local/2025/10/28/pittsburgh-overtime-budget-spending-ed-gainey-police-fire/stories/202510280074" target="_blank" rel="noopener noreferrer">
              Premium pay across all departments hit $59 million
            </a>
            &mdash;$21 million over budget&mdash;with police, fire,
            and EMS each blowing past their overtime allocations.{" "}
            <a href="https://www.wesa.fm/politics-government/2025-07-23/city-controller-pittsburgh-finances-precarious" target="_blank" rel="noopener noreferrer">
              Controller Rachael Heisler
            </a>{" "}
            called the city&rsquo;s spending trajectory
            &ldquo;unsustainable&rdquo; and its finances
            &ldquo;precarious.&rdquo;
          </p>
          <p>
            Pittsburgh has been here before. The city spent 14 years under
            Act 47 state financial oversight, emerging from distressed status
            only in 2018. For most of the decade that followed, council ran
            on consensus. Across {DATA.summary.totalVotes.toLocaleString()} votes
            spanning 25 years, members said &ldquo;no&rdquo; less than 2% of the
            time&mdash;though much of that unanimity reflects routine business
            like approving minutes and accepting reports, where dissent
            is near zero. On ordinances&mdash;the legislation that actually
            changes law&mdash;the dissent rate is 7.3%, and on mayoral
            appointments it is 8.8%. Still, the trend was
            clear: public fights fell steadily from 2010&rsquo;s post-Act 47
            tensions to a historic low of 0.79% in 2023. Committee chairs
            workshopped ordinances and counted votes in private. Public
            meetings were ratification ceremonies.
          </p>
          <p>
            The fiscal crisis ended that. Council identified a
            $20&ndash;30 million gap in Mayor Ed Gainey&rsquo;s proposed
            2026 budget&mdash;a figure Gainey&rsquo;s administration
            disputed, maintaining the submitted budget was balanced.
            In December 2025,{" "}
            <a href="https://www.publicsource.org/pittsburgh-council-property-tax-budget-vote/" target="_blank" rel="noopener noreferrer">
              council approved a 20% property tax increase
            </a>{" "}
            on a 6&ndash;2 vote&mdash;the first hike in over a decade,
            expected to raise roughly $28 million a year.{" "}
            <a href="https://www.publicsource.org/pittsburgh-city-council-property-tax-hike-2026/" target="_blank" rel="noopener noreferrer">
              Councilor Warwick had initially proposed 30%
            </a>
            . Kail-Smith, in one of her final votes before leaving council
            in January, said the city was already asking too much:
            &ldquo;You can&rsquo;t get blood from a rock.&rdquo;
            Councilor Charland, who voted for the hike, said bluntly:
            &ldquo;I don&rsquo;t believe we were handed an honest
            budget.&rdquo; Gainey, acknowledging council had a veto-proof
            majority, let the budget take effect without his signature.
            By January 2026, he was out of office
            entirely&mdash;Corey O&rsquo;Connor, a former council member
            whose own voting record appears in our data, defeated Gainey
            in the May primary and was sworn in as mayor.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// VIZ: DISSENT TIMELINE — yearly rate 2010-2025
// ============================================================================

function DissentTimeline() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) setHasAnimated(true);
  }, [isVisible, hasAnimated]);

  const years = DATA.yearlyDissent;
  const maxRate = 12;
  const chartW = 800;
  const chartH = 250;
  const padL = 50;
  const padR = 20;
  const padT = 20;
  const padB = 35;
  const innerW = chartW - padL - padR;
  const innerH = chartH - padT - padB;

  const xScale = (i: number) => padL + (i / (years.length - 1)) * innerW;
  const yScale = (rate: number) => padT + innerH - (rate / maxRate) * innerH;

  const linePath = years
    .map((d, i) => `${i === 0 ? "M" : "L"}${xScale(i).toFixed(1)},${yScale(d.rate).toFixed(1)}`)
    .join(" ");

  return (
    <div ref={ref} className="pgh-chart-wrap">
      <div className="pgh-chart-title">
        Dissent Rate by Year &mdash; Pittsburgh City Council
      </div>
      <div className="pgh-timeline-chart">
        <svg
          viewBox={`0 0 ${chartW} ${chartH}`}
          className="pgh-timeline-svg"
        >
          {/* Y-axis grid lines */}
          {[0, 2, 4, 6, 8, 10].map((tick) => (
            <g key={tick}>
              <line
                x1={padL}
                y1={yScale(tick)}
                x2={chartW - padR}
                y2={yScale(tick)}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
              />
              <text
                x={padL - 8}
                y={yScale(tick) + 3}
                textAnchor="end"
                className="pgh-timeline-label"
              >
                {tick}%
              </text>
            </g>
          ))}

          {/* X-axis year labels */}
          {years.map((d, i) =>
            i % 2 === 0 ? (
              <text
                key={d.year}
                x={xScale(i)}
                y={chartH - 5}
                textAnchor="middle"
                className="pgh-timeline-label"
              >
                {d.year}
              </text>
            ) : null
          )}

          {/* Line */}
          <path
            d={linePath}
            fill="none"
            stroke="#FFB81C"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: "2000",
              strokeDashoffset: hasAnimated ? 0 : 2000,
              transition: "stroke-dashoffset 2s var(--ease-elegant)",
            }}
          />

          {/* Dots */}
          {years.map((d, i) => (
            <circle
              key={d.year}
              cx={xScale(i)}
              cy={yScale(d.rate)}
              r={d.year === 2010 || d.year === 2023 || d.year === 2024 ? 5 : 3}
              fill={d.rate > 5 ? "#d95148" : "#FFB81C"}
              className="pgh-timeline-dot"
              style={{
                opacity: hasAnimated ? 1 : 0,
                transition: `opacity 0.5s ease ${0.5 + i * 0.08}s`,
              }}
            />
          ))}

          {/* Annotations */}
          {hasAnimated && (
            <>
              <text x={xScale(0)} y={yScale(9.91) - 12} textAnchor="middle" fill="#d95148" fontSize="10" fontFamily="var(--font-sans)" fontWeight="600">
                9.91%
              </text>
              <text x={xScale(0)} y={yScale(9.91) - 22} textAnchor="middle" fill="#8a8a8a" fontSize="9" fontFamily="var(--font-sans)">
                Dowd era
              </text>
              <text x={xScale(13)} y={yScale(0.79) + 18} textAnchor="middle" fill="#FFB81C" fontSize="10" fontFamily="var(--font-sans)" fontWeight="600">
                0.79%
              </text>
              <text x={xScale(13)} y={yScale(0.79) + 28} textAnchor="middle" fill="#8a8a8a" fontSize="9" fontFamily="var(--font-sans)">
                Historic low
              </text>
              <text x={xScale(14)} y={yScale(2.81) - 12} textAnchor="middle" fill="#d95148" fontSize="10" fontFamily="var(--font-sans)" fontWeight="600">
                2.81%
              </text>
              <text x={xScale(14)} y={yScale(2.81) - 22} textAnchor="middle" fill="#8a8a8a" fontSize="9" fontFamily="var(--font-sans)">
                Fiscal crisis
              </text>
              {/* 2025 partial year annotation */}
              <text x={xScale(15)} y={yScale(1.51) + 18} textAnchor="middle" fill="#8a8a8a" fontSize="8" fontFamily="var(--font-sans)" fontStyle="italic">
                partial year
              </text>
            </>
          )}
        </svg>
      </div>
      <p className="pgh-chart-subtitle">
        Dissent peaked at 9.91% in 2010, fell to 0.79% in 2023, then tripled in 2024 as the fiscal crisis forced votes on housing, taxes, and displacement.
      </p>
    </div>
  );
}

// ============================================================================
// SECTION 2: THE INCLUSIONARY HOUSING SEESAW
// ============================================================================

function InclusionarySeesawSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section ref={ref} className="pgh-editorial-section">
      <div
        className="pgh-reveal"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.8s var(--ease-elegant)",
        }}
      >
        <div className="pgh-section-header">
          <span className="pgh-section-num">II</span>
          <h2 className="pgh-section-title">Ninety-Seven Speakers</h2>
        </div>

        <div className="pgh-body-prose">
          <p>
            Ninety-seven Pittsburgh residents signed up to testify on{" "}
            <a href="https://www.wesa.fm/politics-government/2024-12-12/pittsburgh-city-council-debates-affordable-housing-proposal" target="_blank" rel="noopener noreferrer">
              the city&rsquo;s inclusionary zoning expansion
            </a>
            &mdash;Mayor Gainey&rsquo;s proposal to extend affordable-unit
            mandates from four pilot neighborhoods to all of Pittsburgh.
            Councilor Bob Charland introduced a competing, scaled-back version.
            The principle was not new. From 2018 through 2022, council had
            passed every inclusionary housing measure without a single
            dissenting vote, six times running. The policy was settled law.
          </p>
          <p>
            The hearing made clear it was no longer settled. A Lawrenceville
            resident testified that longtime neighbors had been priced out as
            rents climbed sharply&mdash;citywide, median rents rose roughly
            26% over the same period, but individual blocks in gentrifying
            neighborhoods saw far steeper increases. Steve Mazza of Carpenters
            Local 432 warned that the mandates would kill construction jobs;
            building trades unions later withdrew endorsements from Gainey
            over the issue. Residents from Manchester and the Hill District
            described watching their blocks empty out, arguing that affordable
            housing requirements without enforcement amounted to nothing.
          </p>
          <p>
            Charland&rsquo;s version failed 3&ndash;6 in December 2024. A
            revised version passed 6&ndash;3 the following week. By March 2025,
            the margin had tightened to 5&ndash;4, and it stayed
            there&mdash;through the{" "}
            <a href="https://www.wesa.fm/politics-government/2025-10-15/inclusionary-zoning-debate-rages-on-as-pittsburgh-city-council-votes-to-rewrite-proposed-policy" target="_blank" rel="noopener noreferrer">
              October vote that bundled inclusionary zoning with the elimination
              of parking minimums
            </a>
            , through December, through the new year. The same policy that
            passed without opposition six times now survives by a single
            vote every time it comes up.
          </p>
        </div>

        <PullQuote
          text="My organization needs jobs. &hellip; We all want affordable housing, but we want it done right."
          attribution="Steve Mazza, Carpenters Local 432"
          city="Pittsburgh"
          state="PA"
          className="pgh-pull-quote"
        />
      </div>
    </section>
  );
}

// ============================================================================
// VIZ: INCLUSIONARY VOTE SAGA — 12 votes as dots
// ============================================================================

function VoteSaga() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) setHasAnimated(true);
  }, [isVisible, hasAnimated]);

  const votes = DATA.inclusionaryVotes;

  const formatDate = (d: string) => {
    const date = new Date(d + "T12:00:00");
    return date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
  };

  return (
    <div ref={ref} className="pgh-chart-wrap">
      <div className="pgh-chart-title">
        Inclusionary Housing Votes &mdash; From Unanimity to Seesaw
      </div>
      <div className="pgh-vote-saga">
        {votes.map((v, i) => (
          <div
            key={v.date}
            className="pgh-vote-row"
            style={{
              opacity: hasAnimated ? 1 : 0,
              transform: hasAnimated ? "translateX(0)" : "translateX(-20px)",
              transition: `all 0.5s var(--ease-elegant) ${i * 0.06}s`,
            }}
          >
            <span className="pgh-vote-date">{formatDate(v.date)}</span>
            <div className="pgh-vote-dots">
              {Array.from({ length: v.ayes }, (_, j) => (
                <span key={`y${j}`} className="pgh-vote-dot aye" />
              ))}
              {Array.from({ length: v.nays }, (_, j) => (
                <span key={`n${j}`} className="pgh-vote-dot nay" />
              ))}
            </div>
            <span className={`pgh-vote-result ${v.result.toLowerCase()}`}>
              {v.ayes}&ndash;{v.nays} {v.result}
            </span>
          </div>
        ))}
      </div>
      <p className="pgh-chart-subtitle">
        Gold dots = ayes. Red dots = nays. Six unanimous votes gave way to a persistent 5&ndash;4 split.
      </p>
    </div>
  );
}

// ============================================================================
// SECTION 3: PAIRWISE
// ============================================================================

function PairwiseSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section ref={ref} className="pgh-editorial-section">
      <div
        className="pgh-reveal"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.8s var(--ease-elegant)",
        }}
      >
        <div className="pgh-section-header">
          <span className="pgh-section-num">III</span>
          <h2 className="pgh-section-title">The Exemption</h2>
        </div>

        <div className="pgh-body-prose">
          <p>
            Behind the deficit lies a number that has frustrated three
            successive mayors:{" "}
            <a href="https://alleghenycontroller.com/wp-content/uploads/2022/05/Tax-Exempt-Properties-2022.pdf" target="_blank" rel="noopener noreferrer">
              $4.3 billion in tax-exempt property
            </a>{" "}
            as of the 2021 joint controller report. UPMC, Highmark, the
            University of Pittsburgh, Carnegie Mellon, Duquesne&mdash;the
            institutions that anchor Pittsburgh&rsquo;s post-steel economy
            pay no property tax on the land they occupy. They pay payroll
            taxes, purchase services, and fund voluntary payments in lieu
            of taxes&mdash;but the largest employer in the region and the
            largest landholders in Oakland, the neighborhood where Pitt
            and Carnegie Mellon sit side by side, contribute nothing to
            the property tax base that funds police, fire, and roads.
            Councilman Coghill, who represents Brookline and Carrick and has
            long advocated for voluntary payment-in-lieu-of-tax
            agreements with nonprofits, told a committee hearing that the math was simple:
            the city provides full municipal services to campuses that
            generate zero property tax revenue.
          </p>
          <p>
            The chart below flips the consensus story on its head:
            instead of measuring how much members agree, it shows where
            they disagree. The alliances are fluid. On overall voting,
            Lavelle, Strassburger, and Wilson agree on more than 99% of
            everything&mdash;but Wilson broke ranks to vote against the
            tax hike alongside Kail-Smith, and Strassburger authored the
            amendments that weakened mandatory inclusionary zoning. Gross
            votes with Warwick, Lavelle, and Mosley on housing mandates,
            then sides with Kail-Smith on fiscal restraint. No stable
            two-bloc split explains Pittsburgh&rsquo;s council. Instead,
            the same nine members reshuffle depending on whether the
            question is taxes, housing, or zoning. The widest
            gap&mdash;Kail-Smith and Warwick at 3.9%&mdash;may sound
            trivial across 4,000 shared votes, but it concentrates on
            exactly those issues.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// VIZ: DISAGREEMENT BAR CHART — top divergent pairs
// ============================================================================

function AgreementHeatmap() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) setHasAnimated(true);
  }, [isVisible, hasAnimated]);

  // Extract unique off-diagonal pairs and compute disagreement rate
  const members = DATA.heatmapMembers;
  const matrix = DATA.heatmapData;
  const pairs: { a: string; b: string; disagreement: number }[] = [];
  for (let r = 0; r < members.length; r++) {
    for (let c = r + 1; c < members.length; c++) {
      pairs.push({
        a: members[r],
        b: members[c],
        disagreement: +(100 - matrix[r][c]).toFixed(1),
      });
    }
  }
  // Sort by disagreement descending, take top 10
  pairs.sort((x, y) => y.disagreement - x.disagreement);
  const topPairs = pairs.slice(0, 10);
  const maxDisagreement = topPairs[0]?.disagreement || 4;

  return (
    <div ref={ref} className="pgh-chart-wrap">
      <div className="pgh-chart-title">
        Where the Council Disagrees &mdash; Top 10 Divergent Pairs
      </div>
      <div className="pgh-disagreement-bars">
        {topPairs.map((pair, i) => (
          <div
            key={`${pair.a}-${pair.b}`}
            className="pgh-disagree-row"
            style={{
              opacity: hasAnimated ? 1 : 0,
              transform: hasAnimated ? "translateX(0)" : "translateX(-16px)",
              transition: `all 0.4s var(--ease-elegant) ${i * 0.05}s`,
            }}
          >
            <span className="pgh-disagree-label">
              {pair.a} &times; {pair.b}
            </span>
            <div className="pgh-disagree-bar-track">
              <div
                className="pgh-disagree-bar-fill"
                style={{
                  width: hasAnimated
                    ? `${(pair.disagreement / maxDisagreement) * 100}%`
                    : "0%",
                  transition: `width 0.8s var(--ease-elegant) ${0.2 + i * 0.05}s`,
                }}
              />
            </div>
            <span className="pgh-disagree-value">{pair.disagreement}%</span>
          </div>
        ))}
      </div>
      <p className="pgh-chart-subtitle">
        Disagreement rate = 100% minus pairwise agreement. Small in absolute
        terms, but concentrated on property taxes, housing, and zoning.
      </p>
    </div>
  );
}

// ============================================================================
// SECTION 4: FLASHPOINTS
// ============================================================================

function FlashpointSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) setHasAnimated(true);
  }, [isVisible, hasAnimated]);

  const formatDate = (d: string) => {
    const date = new Date(d + "T12:00:00");
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "2-digit" });
  };

  return (
    <section ref={ref} className="pgh-editorial-section" style={{ maxWidth: 880 }}>
      <div
        className="pgh-reveal"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.8s var(--ease-elegant)",
        }}
      >
        <div className="pgh-section-header">
          <span className="pgh-section-num">IV</span>
          <h2 className="pgh-section-title">Flashpoints</h2>
        </div>

        <div className="pgh-body-prose">
          <p>
            The council&rsquo;s recent split votes read like a referendum on
            Pittsburgh&rsquo;s identity. The{" "}
            <a href="https://www.post-gazette.com/news/politics-local/2025/12/21/pittsburgh-tax-increase-budget/stories/202512210109" target="_blank" rel="noopener noreferrer">
              20% property tax increase
            </a>{" "}
            passed 6&ndash;2 on December 21, 2025.{" "}
            <a href="https://triblive.com/local/pittsburgh-council-despite-reservations-will-let-developers-build-on-smaller-lots/" target="_blank" rel="noopener noreferrer">
              Reducing minimum lot sizes
            </a>{" "}
            to encourage infill housing squeaked through despite warnings about
            neighborhood character. The inclusionary housing overlay failed 3&ndash;6
            in its first vote, passed 6&ndash;3 a week later, and has survived
            on 5&ndash;4 margins ever since. Every close vote lands on the same
            fault line: who bears the cost of a city that spent two decades
            deferring hard choices.
          </p>
        </div>

        <div className="pgh-flashpoints">
          {DATA.flashpoints.map((f, i) => (
            <div
              key={`${f.date}-${f.title}`}
              className={`pgh-flash-card ${f.result.toLowerCase() === "fail" ? "pgh-flash-fail" : ""}`}
              style={{
                opacity: hasAnimated ? 1 : 0,
                transform: hasAnimated ? "translateX(0)" : "translateX(-16px)",
                transition: `all 0.4s var(--ease-elegant) ${i * 0.05}s`,
              }}
            >
              <span className="pgh-flash-date">{formatDate(f.date)}</span>
              <span className="pgh-flash-title">{f.title}</span>
              <div className="pgh-flash-dots">
                {Array.from({ length: f.ayes }, (_, j) => (
                  <span key={`y${j}`} className="pgh-flash-dot aye" />
                ))}
                {Array.from({ length: f.nays }, (_, j) => (
                  <span key={`n${j}`} className="pgh-flash-dot nay" />
                ))}
              </div>
              <span className={`pgh-flash-split ${f.result.toLowerCase()}`}>
                {f.result}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// VIZ: WHO DISSENTS? — member dissent rates
// ============================================================================

function MemberDissentChart() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) setHasAnimated(true);
  }, [isVisible, hasAnimated]);

  // Sort by dissent rate descending
  const sorted = [...DATA.members].sort((a, b) => b.rate - a.rate);
  const maxRate = sorted[0]?.rate || 3;

  return (
    <div ref={ref} className="pgh-chart-wrap">
      <div className="pgh-chart-title">
        Who Dissents? &mdash; Individual &ldquo;No&rdquo; Rates
      </div>
      <div className="pgh-member-bars">
        {sorted.map((m, i) => (
          <div
            key={m.name}
            className="pgh-member-row"
            style={{
              opacity: hasAnimated ? 1 : 0,
              transform: hasAnimated ? "translateX(0)" : "translateX(-16px)",
              transition: `all 0.4s var(--ease-elegant) ${i * 0.06}s`,
            }}
          >
            <span className="pgh-member-name">{m.name}</span>
            <div className="pgh-member-bar-track">
              <div
                className="pgh-member-bar-fill"
                style={{
                  width: hasAnimated
                    ? `${(m.rate / maxRate) * 100}%`
                    : "0%",
                  transition: `width 0.8s var(--ease-elegant) ${0.2 + i * 0.06}s`,
                }}
              />
            </div>
            <span className="pgh-member-rate">{m.rate}%</span>
            <span className="pgh-member-nays">{m.nay} nays</span>
          </div>
        ))}
      </div>
      <p className="pgh-chart-subtitle">
        Kail-Smith led all members in dissent across {DATA.members[0]?.votes.toLocaleString()} votes.
        Wilson voted &ldquo;no&rdquo; just 15 times in over 4,000.
      </p>
    </div>
  );
}

// ============================================================================
// CONCLUSION
// ============================================================================

function ConclusionSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section ref={ref} className="pgh-conclusion">
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.8s var(--ease-elegant)",
        }}
      >
        <p className="pgh-conclusion-text">
          Drive from Shadyside to Homewood and you cross maybe
          two miles&mdash;and an economic divide that maps onto every
          vote in this article. The cranes visible from the North
          Shore have not reached the East End blocks where storefronts
          sit empty. For two decades the council could defer
          the hardest questions because growth papered over the gaps.
          Now the money has run out, and the nine members who agreed
          on nearly everything are splitting 5&ndash;4 on the votes
          that remain: who pays the bill, who gets the housing, and
          whose neighborhood changes next.
        </p>
      </div>
    </section>
  );
}
