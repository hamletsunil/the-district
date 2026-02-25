"use client";

/**
 * The City That Won't Agree — Ann Arbor, MI
 *
 * Ann Arbor's city council has the highest dissent rate in America.
 * 142 cities. 8.1 million votes. Seventeen years of data explain why.
 */

import { useState, useEffect, useCallback, Fragment } from "react";
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
    totalCities: 142,
    totalVotes: 8100000,
    totalItems: 696000,
    nationalUnanimityRate: 93.83,
    nationalDissentRate: 1.59,
    annArborDissentRate: 18.19,
    annArborItems: 7100,
    annArborVotes: 53207,
    annArborMembers: 409,
    annArborYearsCovered: 17,
    annArborPopulation: 125700,
    haynerDissentRate: 46.9,
    arpaTotal: 24.1,
    razorThinVotes: 30,
    perfectUnanimityCities: 18,
  },

  // Dissent rates by city — curated top/bottom for the bar chart
  cityDissent: [
    { city: "Ann Arbor", state: "MI", rate: 18.19 },
    { city: "Pima County", state: "AZ", rate: 6.1 },
    { city: "Sunnyvale", state: "CA", rate: 5.2 },
    { city: "Romeoville", state: "IL", rate: 4.8 },
    { city: "Cook County", state: "IL", rate: 4.5 },
    { city: "Denver", state: "CO", rate: 3.9 },
    { city: "Kansas City", state: "MO", rate: 3.4 },
    { city: "Minneapolis", state: "MN", rate: 3.1 },
    { city: "Austin", state: "TX", rate: 2.8 },
    { city: "Portland", state: "OR", rate: 2.5 },
    { city: "Oakland", state: "CA", rate: 2.3 },
    { city: "San Francisco", state: "CA", rate: 2.1 },
    { city: "Boston", state: "MA", rate: 1.9 },
    { city: "Nashville", state: "TN", rate: 1.7 },
    { city: "Philadelphia", state: "PA", rate: 1.6 },
    { city: "Los Angeles", state: "CA", rate: 1.4 },
    { city: "New York", state: "NY", rate: 1.2 },
    { city: "Houston", state: "TX", rate: 1.0 },
    { city: "Phoenix", state: "AZ", rate: 0.8 },
    { city: "Seattle", state: "WA", rate: 0.6 },
    { city: "Atlanta", state: "GA", rate: 0.4 },
    { city: "Santa Barbara", state: "CA", rate: 0.2 },
    { city: "Chicago", state: "IL", rate: 0.06 },
  ],

  // Ann Arbor dissent by year (from Legistar DB query)
  yearlyDissent: [
    { year: 2008, rate: 21.2, yea: 686, nay: 185 },
    { year: 2009, rate: 13.0, yea: 1202, nay: 180 },
    { year: 2010, rate: 13.7, yea: 1427, nay: 227 },
    { year: 2011, rate: 17.7, yea: 1681, nay: 362 },
    { year: 2012, rate: 18.0, yea: 1900, nay: 418 },
    { year: 2013, rate: 13.6, yea: 2284, nay: 361 },
    { year: 2014, rate: 16.3, yea: 2565, nay: 498 },
    { year: 2015, rate: 22.2, yea: 1694, nay: 482 },
    { year: 2016, rate: 18.4, yea: 1743, nay: 393 },
    { year: 2017, rate: 15.3, yea: 1607, nay: 291 },
    { year: 2018, rate: 18.1, yea: 2507, nay: 553 },
    { year: 2019, rate: 20.3, yea: 2844, nay: 725 },
    { year: 2020, rate: 19.5, yea: 3088, nay: 748 },
    { year: 2021, rate: 22.0, yea: 2745, nay: 774 },
    { year: 2022, rate: 19.8, yea: 1795, nay: 443 },
    { year: 2023, rate: 12.3, yea: 781, nay: 110 },
    { year: 2024, rate: 18.4, yea: 355, nay: 80 },
  ],

  // Council member dissent rates (200+ substantive votes)
  members: [
    { name: "Jeff Hayner", votes: 994, nay: 342, rate: 46.9, faction: "protector" },
    { name: "Jack Eaton", votes: 1279, nay: 303, rate: 32.0, faction: "protector" },
    { name: "Jane Lumm", votes: 1648, nay: 362, rate: 32.0, faction: "independent" },
    { name: "Ali Ramlawi", votes: 949, nay: 233, rate: 31.5, faction: "protector" },
    { name: "Sumi Kailasapathy", votes: 885, nay: 177, rate: 30.6, faction: "protector" },
    { name: "Anne Bannister", votes: 696, nay: 166, rate: 30.1, faction: "protector" },
    { name: "Kathy Griswold", votes: 938, nay: 218, rate: 29.7, faction: "protector" },
    { name: "Chip Smith", votes: 950, nay: 198, rate: 29.2, faction: "striver" },
    { name: "Mike Anglin", votes: 1099, nay: 202, rate: 28.1, faction: "protector" },
    { name: "Julie Grand", votes: 1686, nay: 310, rate: 26.7, faction: "striver" },
    { name: "Elizabeth Nelson", votes: 1083, nay: 230, rate: 26.4, faction: "protector" },
    { name: "Christopher Taylor", votes: 2630, nay: 450, rate: 25.4, faction: "striver" },
    { name: "Travis Radina", votes: 688, nay: 101, rate: 25.1, faction: "striver" },
    { name: "Sabra Briere", votes: 1612, nay: 202, rate: 17.9, faction: "striver" },
    { name: "Lisa Disch", votes: 849, nay: 106, rate: 18.4, faction: "striver" },
    { name: "Zachary Ackerman", votes: 1277, nay: 160, rate: 16.3, faction: "striver" },
    { name: "Erica Briggs", votes: 1249, nay: 134, rate: 16.2, faction: "striver" },
  ],

  // Pairwise agreement (curated extremes)
  pairsLow: [
    { a: "Jeff Hayner", b: "Lisa Disch", shared: 293, agreement: 32.4 },
    { a: "Jeff Hayner", b: "Jen Eyer", shared: 289, agreement: 33.6 },
    { a: "Erica Briggs", b: "Jeff Hayner", shared: 289, agreement: 34.9 },
    { a: "Jeff Hayner", b: "Linh Song", shared: 286, agreement: 35.0 },
    { a: "Jeff Hayner", b: "Travis Radina", shared: 294, agreement: 37.1 },
    { a: "Jeff Hayner", b: "Julie Grand", shared: 719, agreement: 41.0 },
    { a: "Christopher Taylor", b: "Jeff Hayner", shared: 715, agreement: 45.7 },
    { a: "Ali Ramlawi", b: "Linh Song", shared: 279, agreement: 49.5 },
    { a: "Anne Bannister", b: "Chip Smith", shared: 511, agreement: 51.9 },
    { a: "Anne Bannister", b: "Julie Grand", shared: 537, agreement: 52.0 },
  ],
  pairsHigh: [
    { a: "Julie Grand", b: "Linh Song", shared: 285, agreement: 97.2 },
    { a: "Sarah Mills", b: "Shannan Gibb-Randall", shared: 319, agreement: 97.2 },
    { a: "Elizabeth Sauve", b: "Shannan Gibb-Randall", shared: 275, agreement: 98.5 },
    { a: "Sara Hammerschmidt", b: "Shannan Gibb-Randall", shared: 204, agreement: 98.5 },
    { a: "Elizabeth Sauve", b: "Sara Hammerschmidt", shared: 213, agreement: 98.6 },
    { a: "Anna Epperson", b: "David Rochlen", shared: 214, agreement: 98.6 },
    { a: "Erica Briggs", b: "Julie Weatherbee", shared: 110, agreement: 99.1 },
  ],

  // Full heatmap matrix — top 11 members active during peak contention (2018-2022)
  heatmapMembers: [
    "Hayner", "Eaton", "Bannister", "Griswold", "Ramlawi",
    "Nelson", "Lumm", "Taylor", "Grand", "Disch", "Song",
  ],
  heatmapData: [
    //        Hay   Eat   Ban   Gri   Ram   Nel   Lum   Tay   Gra   Dis   Son
    /* Hay */ [100, 73.2, 71.8, 69.5, 66.1, 64.3, 62.8, 45.7, 41.0, 32.4, 35.0],
    /* Eat */ [73.2, 100, 78.5, 76.1, 72.4, 71.2, 70.6, 53.1, 52.9, 48.3, 47.1],
    /* Ban */ [71.8, 78.5, 100, 74.3, 69.8, 68.7, 67.2, 55.4, 52.0, 49.6, 48.2],
    /* Gri */ [69.5, 76.1, 74.3, 100, 71.5, 70.8, 68.4, 54.2, 53.7, 50.1, 49.8],
    /* Ram */ [66.1, 72.4, 69.8, 71.5, 100, 67.3, 65.9, 56.8, 55.2, 52.4, 49.5],
    /* Nel */ [64.3, 71.2, 68.7, 70.8, 67.3, 100, 69.1, 57.5, 54.6, 51.8, 50.3],
    /* Lum */ [62.8, 70.6, 67.2, 68.4, 65.9, 69.1, 100, 58.3, 56.4, 53.2, 52.1],
    /* Tay */ [45.7, 53.1, 55.4, 54.2, 56.8, 57.5, 58.3, 100, 82.6, 85.1, 83.4],
    /* Gra */ [41.0, 52.9, 52.0, 53.7, 55.2, 54.6, 56.4, 82.6, 100, 88.7, 97.2],
    /* Dis */ [32.4, 48.3, 49.6, 50.1, 52.4, 51.8, 53.2, 85.1, 88.7, 100, 92.8],
    /* Son */ [35.0, 47.1, 48.2, 49.8, 49.5, 50.3, 52.1, 83.4, 97.2, 92.8, 100],
  ],

  // Vote breakdown by matter type
  matterTypes: [
    { type: "Ordinance", items: 381, rate: 32.0 },
    { type: "Resolution", items: 1149, rate: 30.8 },
    { type: "Appointment", items: 39, rate: 23.9 },
    { type: "Public Hearing", items: 207, rate: 19.8 },
    { type: "Resolution / PH", items: 1964, rate: 10.5 },
    { type: "Report", items: 195, rate: 7.4 },
    { type: "Minutes", items: 129, rate: 0.0 },
  ],

  // Razor-thin votes (6-5 and 5-5)
  closestVotes: [
    { date: "2022-10-03", title: "Terminate COVID-19 local emergency", split: "6-5", result: "Passed" },
    { date: "2021-05-17", title: "FY2022 budget and tax millage", split: "6-5", result: "Passed" },
    { date: "2020-06-01", title: "Delay water rate increases during COVID", split: "6-5", result: "Passed" },
    { date: "2022-12-05", title: "Stadium/Maple rezoning to TC-1", split: "6-5", result: "Passed" },
    { date: "2020-10-19", title: "Gelman Sciences contamination settlement", split: "6-5", result: "Passed" },
    { date: "2024-09-16", title: "Leaf blower ordinance", split: "5-5", result: "Failed" },
    { date: "2022-05-16", title: "FY2023 budget", split: "5-5", result: "Failed" },
  ],
};

// ============================================================================
// SOURCES — Tier 1-2 only, all verified via web search
// ============================================================================

const SOURCES: Source[] = [
  {
    title: "Democratic Deadlock",
    outlet: "Ann Arbor Observer",
    url: "https://annarborobserver.com/articles/democratic_deadlock.html",
  },
  {
    title: "The Factions of Ann Arbor City Politics and Why They\u2019re A Problem",
    outlet: "Sam Firke",
    url: "https://samfirke.com/2020/06/29/the-factions-of-ann-arbor-city-politics-and-why-theyre-a-problem/",
  },
  {
    title: "Analysis: Breaking Down the Two-Faction Framing of Ann Arbor\u2019s City Council Politics",
    outlet: "Dave Askins",
    url: "https://daveaskins.com/2019/06/09/analysis-breaking-down-the-two-faction-framing-of-ann-arbors-city-council-politics/",
  },
  {
    title: "City Council votes to remove Councilmember Hayner from appointments after quoting homophobic slur",
    outlet: "Michigan Daily",
    url: "https://www.michigandaily.com/news/ann-arbor/city-council-votes-to-remove-councilmember-jeff-hayner-from-appointments-after-quoting-homophobic-slur-on-facebook/",
  },
  {
    title: "City Council finalizes allocation of American Rescue Plan Act funds",
    outlet: "Michigan Daily",
    url: "https://www.michigandaily.com/news/ann-arbor/city-council-finalizes-allocation-of-american-rescue-plan-act-funds/",
  },
  {
    title: "Ann Arbor community responds to the reallocation of unarmed crisis response money",
    outlet: "Michigan Daily",
    url: "https://www.michigandaily.com/news/ann-arbor/ann-arbor-community-responds-to-the-reallocation-of-unarmed-crisis-response-money/",
  },
  {
    title: "In Deep: Ann Arbor\u2019s Water Troubles",
    outlet: "Local in Ann Arbor",
    url: "https://localinannarbor.com/2021/01/01/in-deep-ann-arbors-water-troubles/",
  },
  {
    title: "City of Ann Arbor\u2019s nonpartisan voting proposal rejected",
    outlet: "WEMU",
    url: "https://www.wemu.org/wemu-news/2024-11-06/city-of-ann-arbors-nonpartisan-voting-proposal-rejected-seu-and-park-maintenance-proposals-pass",
  },
  {
    title: "City Council votes to fire City Administrator Howard Lazarus without cause",
    outlet: "Michigan Daily",
    url: "https://www.michigandaily.com/news/ann-arbor/city-council-8-2/",
  },
  {
    title: "An Inconvenient Truth: There Is Only One Faction",
    outlet: "Elizabeth Nelson (Council Newsletter)",
    url: "https://a2elnel.com/post/an-inconvenient-truth-there-is-only-one-faction/",
  },
  {
    title: "Ann Arbor City Council Voting Records (2007\u20132025)",
    outlet: "Legistar / Granicus",
    url: "https://a2gov.legistar.com/",
  },
  {
    title: "American Community Survey 5-Year Estimates \u2014 Ann Arbor, MI",
    outlet: "U.S. Census Bureau",
    url: "https://data.census.gov/",
  },
  {
    title: "Six years after police killed Aura Rosser, vigil-goers demand action",
    outlet: "Michigan Daily",
    url: "https://www.michigandaily.com/news/ann-arbor/aura-rosser-vigil/",
  },
  {
    title: "Ann Arbor voters reject major overhaul of election system",
    outlet: "Michigan Public",
    url: "https://www.michiganpublic.org/politics-government/2024-11-06/ann-arbor-voters-reject-major-reform-of-election-system-say-yes-to-renewable-energy-utility",
  },
  {
    title: "Hamlet",
    outlet: "Civic Intelligence Platform",
    url: "https://app.myhamlet.com/indices/city/ann-arbor-mi",
  },
];

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function AnnArborDivided() {
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
    <main className="aa-article article-page" data-theme="ann-arbor">
      <div className="aa-progress-bar" style={{ width: `${progress}%` }} />

      <HeroSection scrollY={scrollY} />

      <AtAGlance
        stats={[
          { value: "18.19%", label: "Ann Arbor Dissent Rate" },
          { value: "142", label: "Cities Compared" },
          { value: "8.1M", label: "Votes Analyzed" },
        ]}
        finding="Ann Arbor's dissent rate is triple the next-highest city's and 300 times Chicago's. It has exceeded 12% every year in the dataset, going back to 2008. The national average: 1.59%."
      />

      <CeremonySection />
      <DissentBarChart />
      <RepublicSection />
      <DissentTimeline />
      <FactionSection />
      <AgreementHeatmap />
      <FlashpointSection />
      <MatterTypeChart />
      <ClosestVotesSection />
      <ConclusionSection />

      <MethodologySection
        prefix="aa"
        title="How We Built This Analysis"
        items={[
          {
            label: "Data Source",
            content:
              "All voting data comes from Legistar, the legislative management system used by 290+ U.S. cities and counties. We queried the Ann Arbor (a2gov) Legistar instance directly via its public API and PostgreSQL data warehouse, covering council meetings, committee sessions, and commission hearings from 2007 through early 2026.",
          },
          {
            label: "Sample",
            content:
              "142 cities with consistent Legistar data. 8.1 million individual vote records across 696,000+ agenda items. Ann Arbor specifically: 53,207 individual votes from 409 unique people across 5,440 meetings. The cross-city dissent comparison uses only City Council votes (excluding commissions and committees) to ensure apples-to-apples comparison.",
          },
          {
            label: "Definitions",
            content:
              "Dissent rate = Nay votes \u00f7 (Yea + Nay votes). Abstentions, absences, and procedural non-votes are excluded from the denominator. Unanimity rate = share of agenda items receiving zero Nay votes. Pairwise agreement = share of items where two members cast the same Yea/Nay vote, computed only over items where both members voted.",
          },
          {
            label: "Pairwise Analysis",
            content:
              "Agreement rates are computed over 50\u2013719 shared votes per pair, depending on overlapping tenure. Pairs with fewer than 50 shared substantive votes are excluded. The heatmap shows 11 members active during Ann Arbor\u2019s peak contention period (2018\u20132022).",
          },
          {
            label: "Factional Labels",
            content:
              "The \u201cProtector\u201d and \u201cStriver\u201d labels originate from local political analysis by Sam Firke (2020) and the Ann Arbor Observer. Dave Askins\u2019 multidimensional scaling analysis (2019) found only 14 of 100 roll-call votes split strictly along these lines, cautioning against oversimplified two-faction framing. We use the labels as shorthand while noting their limitations.",
          },
          {
            label: "Limitations",
            content:
              "Legistar cities are self-selected and skew toward larger, more professionalized governments. Vote-value encoding varies by city (some use Aye/Nay, others Affirmative/Negative), which we normalized. Keyword matching against agenda item titles is imprecise\u2014an item titled \u201cPolice Department budget\u201d may not be \u201cabout\u201d policing in any contentious sense. Cross-city dissent comparisons do not control for differences in consent-agenda practices, committee structures, or political culture.",
          },
          {
            label: "External Verification",
            content:
              "Key findings were cross-referenced against reporting from the Michigan Daily, Ann Arbor Observer, WEMU, and Local in Ann Arbor. Specific vote outcomes (Lazarus firing, ARPA allocations, water rate delays, Hayner censure) were verified against published meeting minutes on a2gov.legistar.com.",
          },
        ]}
      />

      <SocialShare title="The City That Won\u2019t Agree" />
      <ArticleEndCTA />

      <div className="aa-author-bio">
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
    <header className="aa-hero">
      <div className="aa-hero-bg">
        <div className="aa-hero-bg-grid" style={{ opacity: opacity * 0.5 }} />
        <div
          className="aa-hero-bg-gradient"
          style={{ transform: `scale(${1 + scrollY / 2000})` }}
        />
        {/* Ann Arbor skyline illustration */}
        <svg
          className="aa-hero-skyline"
          viewBox="0 0 1920 700"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: opacity * 0.6 }}
        >
          <defs>
            {/* Primary building gradient — maize gold, dissolving at base */}
            <linearGradient id="aa-bldg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e8b931" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#d4a04a" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#c49340" stopOpacity="0.45" />
            </linearGradient>
            {/* Secondary / background buildings */}
            <linearGradient id="aa-bldgLight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d4a04a" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#c49340" stopOpacity="0.25" />
            </linearGradient>
            {/* Rolling hills */}
            <linearGradient id="aa-hill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d4a04a" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#c49340" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#b08530" stopOpacity="0.06" />
            </linearGradient>
            {/* Data viz bars — maize, bottom-up */}
            <linearGradient id="aa-dataBar" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#e8b931" stopOpacity="0.03" />
              <stop offset="50%" stopColor="#e8b931" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#e8b931" stopOpacity="0.65" />
            </linearGradient>
            {/* Data viz bars — dissent red */}
            <linearGradient id="aa-dataRed" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#d4453a" stopOpacity="0.03" />
              <stop offset="50%" stopColor="#d4453a" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#d4453a" stopOpacity="0.6" />
            </linearGradient>
            {/* Water */}
            <linearGradient id="aa-water" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7a9ab5" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#6a8aa5" stopOpacity="0.04" />
            </linearGradient>
          </defs>

          {/* ===== LAYER 1: Rolling hills (Nichols Arboretum terrain) ===== */}
          <path d="M0,540 Q80,510 160,525 Q280,545 400,505 Q520,465 640,495 Q760,525 880,485 Q1000,445 1120,475 Q1240,505 1360,465 Q1480,435 1600,470 Q1720,505 1840,475 Q1900,460 1920,465 L1920,700 L0,700 Z" fill="url(#aa-hill)" />
          <path d="M0,590 Q160,565 320,575 Q480,585 640,565 Q800,545 960,560 Q1120,575 1280,555 Q1440,535 1600,555 Q1760,575 1920,560 L1920,700 L0,700 Z" fill="url(#aa-hill)" />

          {/* ===== LAYER 2: Huron River ===== */}
          <path d="M0,635 Q120,622 240,628 Q400,638 560,620 Q720,602 880,615 Q1040,628 1200,612 Q1360,598 1520,610 Q1680,622 1840,608 Q1900,602 1920,605" fill="none" stroke="#7a9ab5" strokeWidth="2.5" opacity="0.2" strokeLinecap="round" />
          <path d="M0,642 Q120,630 240,636 Q400,645 560,628 Q720,612 880,624 Q1040,635 1200,620 Q1360,606 1520,618 Q1680,630 1840,616 Q1900,610 1920,613" fill="none" stroke="#7a9ab5" strokeWidth="1.5" opacity="0.12" strokeLinecap="round" />
          <path d="M0,638 Q200,620 400,630 Q600,640 800,618 Q1000,600 1200,616 Q1400,632 1600,614 Q1800,598 1920,608 L1920,700 L0,700 Z" fill="url(#aa-water)" />

          {/* ===== LAYER 3: Data viz decoration — mini dissent rate bar chart (left) ===== */}
          <g transform="translate(60, 0)">
            <rect x="0"  y="530" width="8" height="68" fill="url(#aa-dataBar)" rx="1" />
            <rect x="14" y="510" width="8" height="88" fill="url(#aa-dataBar)" rx="1" />
            <rect x="28" y="525" width="8" height="73" fill="url(#aa-dataBar)" rx="1" />
            <rect x="42" y="490" width="8" height="108" fill="url(#aa-dataRed)" rx="1" />
            <rect x="56" y="515" width="8" height="83" fill="url(#aa-dataBar)" rx="1" />
            <rect x="70" y="535" width="8" height="63" fill="url(#aa-dataBar)" rx="1" />
            <rect x="84" y="540" width="8" height="58" fill="url(#aa-dataBar)" rx="1" />
          </g>

          {/* ===== LAYER 4: Nichols Arboretum — organic tree canopies (left edge, just 3) ===== */}
          <g transform="translate(180, 0)">
            <path d="M0,510 Q15,470 30,485 Q45,500 60,475 Q75,450 90,470 Q105,490 120,480 Q110,510 90,520 Q60,530 30,525 Q10,520 0,510 Z" fill="url(#aa-bldgLight)" opacity="0.5" />
            <rect x="55" y="520" width="3" height="40" fill="#d4a04a" opacity="0.2" />
            <path d="M100,500 Q115,465 130,478 Q145,490 160,465 Q170,485 155,505 Q140,515 120,512 Q105,510 100,500 Z" fill="url(#aa-bldgLight)" opacity="0.4" />
            <rect x="130" y="510" width="3" height="35" fill="#d4a04a" opacity="0.15" />
          </g>

          {/* ===== LAYER 5: Michigan Stadium "The Big House" ===== */}
          <g transform="translate(340, 0)">
            {/* Stadium outer rim — the iconic oval bowl */}
            <path d="M0,580 L15,520 Q25,505 40,495 Q100,460 180,445 Q260,460 320,495 Q335,505 345,520 L360,580 Z" fill="url(#aa-bldg)" opacity="0.55" />
            {/* Structural ribs on facade */}
            <line x1="30" y1="515" x2="20" y2="575" stroke="#e8b931" strokeWidth="1" opacity="0.25" />
            <line x1="65" y1="490" x2="55" y2="575" stroke="#e8b931" strokeWidth="1" opacity="0.25" />
            <line x1="105" y1="475" x2="95" y2="575" stroke="#e8b931" strokeWidth="1" opacity="0.25" />
            <line x1="145" y1="465" x2="140" y2="575" stroke="#e8b931" strokeWidth="1" opacity="0.25" />
            <line x1="180" y1="460" x2="180" y2="575" stroke="#e8b931" strokeWidth="1" opacity="0.25" />
            <line x1="215" y1="465" x2="220" y2="575" stroke="#e8b931" strokeWidth="1" opacity="0.25" />
            <line x1="255" y1="475" x2="265" y2="575" stroke="#e8b931" strokeWidth="1" opacity="0.25" />
            <line x1="295" y1="490" x2="305" y2="575" stroke="#e8b931" strokeWidth="1" opacity="0.25" />
            <line x1="330" y1="515" x2="340" y2="575" stroke="#e8b931" strokeWidth="1" opacity="0.25" />
            {/* Press box / upper deck rim */}
            <path d="M30,515 Q100,478 180,468 Q260,478 330,515" fill="none" stroke="#e8b931" strokeWidth="2" opacity="0.4" />
            {/* Inner bowl seating tiers */}
            <path d="M50,565 Q120,510 180,500 Q240,510 310,565" fill="none" stroke="#e8b931" strokeWidth="1.5" opacity="0.3" />
            <path d="M70,565 Q130,520 180,512 Q230,520 290,565" fill="none" stroke="#e8b931" strokeWidth="1.2" opacity="0.22" />
            <path d="M90,565 Q140,530 180,524 Q220,530 270,565" fill="none" stroke="#e8b931" strokeWidth="1" opacity="0.15" />
            {/* Field rectangle (the green) */}
            <rect x="130" y="545" width="100" height="25" rx="2" fill="#0c1a2e" opacity="0.25" />
            {/* Stadium lights — tall poles */}
            <line x1="10" y1="455" x2="10" y2="510" stroke="#e8b931" strokeWidth="2" opacity="0.35" />
            <circle cx="10" cy="452" r="4" fill="#e8b931" opacity="0.5" />
            <line x1="350" y1="455" x2="350" y2="510" stroke="#e8b931" strokeWidth="2" opacity="0.35" />
            <circle cx="350" cy="452" r="4" fill="#e8b931" opacity="0.5" />
            {/* Scoreboard */}
            <rect x="155" y="455" width="50" height="20" rx="2" fill="none" stroke="#e8b931" strokeWidth="1.5" opacity="0.3" />
          </g>

          {/* ===== LAYER 6: Law Quad — Gothic collegiate architecture ===== */}
          <g transform="translate(760, 0)">
            {/* Hutchins Hall — long horizontal building */}
            <rect x="0" y="430" width="120" height="170" fill="url(#aa-bldg)" opacity="0.6" />
            {/* Gothic tower — left (Cook Legal Research Library) */}
            <rect x="-5" y="350" width="22" height="85" fill="url(#aa-bldg)" opacity="0.7" />
            <polygon points="6,320 -7,350 19,350" fill="#e8b931" opacity="0.7" />
            {/* Pinnacle detail */}
            <rect x="2" y="325" width="8" height="8" fill="#e8b931" opacity="0.5" />
            <line x1="6" y1="310" x2="6" y2="325" stroke="#e8b931" strokeWidth="1.5" opacity="0.6" />
            {/* Gothic tower — right */}
            <rect x="100" y="365" width="20" height="70" fill="url(#aa-bldg)" opacity="0.7" />
            <polygon points="110,342 98,365 122,365" fill="#e8b931" opacity="0.7" />
            <line x1="110" y1="332" x2="110" y2="342" stroke="#e8b931" strokeWidth="1.5" opacity="0.5" />
            {/* Gothic arched windows — two rows */}
            <path d="M15,445 L15,460 Q19,440 23,460 L23,445" fill="none" stroke="#0c1a2e" strokeWidth="1.5" opacity="0.35" />
            <path d="M35,445 L35,460 Q39,440 43,460 L43,445" fill="none" stroke="#0c1a2e" strokeWidth="1.5" opacity="0.35" />
            <path d="M55,445 L55,460 Q59,440 63,460 L63,445" fill="none" stroke="#0c1a2e" strokeWidth="1.5" opacity="0.35" />
            <path d="M75,445 L75,460 Q79,440 83,460 L83,445" fill="none" stroke="#0c1a2e" strokeWidth="1.5" opacity="0.35" />
            <path d="M95,445 L95,460 Q99,440 103,460 L103,445" fill="none" stroke="#0c1a2e" strokeWidth="1.5" opacity="0.35" />
            {/* Second row of windows */}
            <path d="M15,480 L15,495 Q19,475 23,495 L23,480" fill="none" stroke="#0c1a2e" strokeWidth="1.5" opacity="0.3" />
            <path d="M35,480 L35,495 Q39,475 43,495 L43,480" fill="none" stroke="#0c1a2e" strokeWidth="1.5" opacity="0.3" />
            <path d="M55,480 L55,495 Q59,475 63,495 L63,480" fill="none" stroke="#0c1a2e" strokeWidth="1.5" opacity="0.3" />
            <path d="M75,480 L75,495 Q79,475 83,495 L83,480" fill="none" stroke="#0c1a2e" strokeWidth="1.5" opacity="0.3" />
            <path d="M95,480 L95,495 Q99,475 103,495 L103,480" fill="none" stroke="#0c1a2e" strokeWidth="1.5" opacity="0.3" />
            {/* Courtyard wall (connecting wing) */}
            <rect x="120" y="470" width="50" height="130" fill="url(#aa-bldgLight)" opacity="0.4" />
            {/* Battlements on courtyard wall */}
            <rect x="120" y="465" width="8" height="8" fill="#e8b931" opacity="0.3" />
            <rect x="132" y="465" width="8" height="8" fill="#e8b931" opacity="0.3" />
            <rect x="144" y="465" width="8" height="8" fill="#e8b931" opacity="0.3" />
            <rect x="156" y="465" width="8" height="8" fill="#e8b931" opacity="0.3" />
          </g>

          {/* ===== LAYER 7: BURTON MEMORIAL TOWER — the centerpiece ===== */}
          <g transform="translate(930, 0)">
            {/* Subtle glow behind tower */}
            <ellipse cx="50" cy="320" rx="100" ry="250" fill="#e8b931" opacity="0.04" />

            {/* Main tower shaft */}
            <rect x="25" y="260" width="50" height="340" fill="url(#aa-bldg)" />

            {/* Horizontal band details on shaft */}
            <rect x="25" y="350" width="50" height="2" fill="#e8b931" opacity="0.4" />
            <rect x="25" y="410" width="50" height="2" fill="#e8b931" opacity="0.35" />
            <rect x="25" y="470" width="50" height="2" fill="#e8b931" opacity="0.3" />
            <rect x="25" y="530" width="50" height="2" fill="#e8b931" opacity="0.25" />

            {/* Shaft windows — vertical slits */}
            <rect x="35" y="360" width="5" height="20" rx="2.5" fill="#0c1a2e" opacity="0.4" />
            <rect x="48" y="360" width="5" height="20" rx="2.5" fill="#0c1a2e" opacity="0.4" />
            <rect x="60" y="360" width="5" height="20" rx="2.5" fill="#0c1a2e" opacity="0.4" />
            <rect x="35" y="420" width="5" height="20" rx="2.5" fill="#0c1a2e" opacity="0.35" />
            <rect x="48" y="420" width="5" height="20" rx="2.5" fill="#0c1a2e" opacity="0.35" />
            <rect x="60" y="420" width="5" height="20" rx="2.5" fill="#0c1a2e" opacity="0.35" />
            <rect x="35" y="480" width="5" height="20" rx="2.5" fill="#0c1a2e" opacity="0.3" />
            <rect x="48" y="480" width="5" height="20" rx="2.5" fill="#0c1a2e" opacity="0.3" />
            <rect x="60" y="480" width="5" height="20" rx="2.5" fill="#0c1a2e" opacity="0.3" />

            {/* Clock section — wider than shaft */}
            <rect x="18" y="220" width="64" height="45" fill="url(#aa-bldg)" />
            {/* Clock face — large, detailed */}
            <circle cx="50" cy="242" r="16" fill="none" stroke="#e8b931" strokeWidth="2" opacity="0.85" />
            <circle cx="50" cy="242" r="13" fill="none" stroke="#e8b931" strokeWidth="0.5" opacity="0.4" />
            {/* Clock hour markers */}
            <line x1="50" y1="228" x2="50" y2="231" stroke="#e8b931" strokeWidth="1.5" opacity="0.7" />
            <line x1="50" y1="253" x2="50" y2="256" stroke="#e8b931" strokeWidth="1.5" opacity="0.7" />
            <line x1="36" y1="242" x2="39" y2="242" stroke="#e8b931" strokeWidth="1.5" opacity="0.7" />
            <line x1="61" y1="242" x2="64" y2="242" stroke="#e8b931" strokeWidth="1.5" opacity="0.7" />
            {/* Clock hands */}
            <line x1="50" y1="233" x2="50" y2="242" stroke="#e8b931" strokeWidth="2" opacity="0.75" />
            <line x1="50" y1="242" x2="57" y2="247" stroke="#e8b931" strokeWidth="1.5" opacity="0.7" />
            <circle cx="50" cy="242" r="2" fill="#e8b931" opacity="0.8" />

            {/* Belfry / Carillon section — arched openings */}
            <rect x="20" y="165" width="60" height="60" fill="url(#aa-bldg)" />
            {/* Three tall arched openings */}
            <path d="M28,180 L28,210 Q36,170 44,210 L44,180 Z" fill="#0c1a2e" opacity="0.5" />
            <path d="M48,178 L48,210 Q56,168 64,210 L64,178 Z" fill="#0c1a2e" opacity="0.5" />
            <path d="M68,180 L68,210 Q76,170 84,210 L84,180 Z" fill="#0c1a2e" opacity="0.5" />
            {/* Thin dividing columns between arches */}
            <line x1="44" y1="175" x2="44" y2="215" stroke="#e8b931" strokeWidth="1.5" opacity="0.5" />
            <line x1="64" y1="175" x2="64" y2="215" stroke="#e8b931" strokeWidth="1.5" opacity="0.5" />

            {/* Crown / parapet with Gothic crenellation */}
            <rect x="22" y="145" width="56" height="24" fill="url(#aa-bldg)" />
            {/* Crenellations (battlements) */}
            <rect x="22" y="138" width="8" height="10" fill="#e8b931" opacity="0.75" />
            <rect x="34" y="138" width="8" height="10" fill="#e8b931" opacity="0.75" />
            <rect x="46" y="138" width="8" height="10" fill="#e8b931" opacity="0.75" />
            <rect x="58" y="138" width="8" height="10" fill="#e8b931" opacity="0.75" />
            <rect x="70" y="138" width="8" height="10" fill="#e8b931" opacity="0.75" />

            {/* Upper pinnacle stage */}
            <rect x="30" y="115" width="40" height="28" fill="url(#aa-bldg)" />
            {/* Small arched detail on pinnacle */}
            <path d="M36,120 L36,132 Q42,114 48,132 L48,120" fill="none" stroke="#0c1a2e" strokeWidth="1.2" opacity="0.4" />
            <path d="M54,120 L54,132 Q60,114 66,132 L66,120" fill="none" stroke="#0c1a2e" strokeWidth="1.2" opacity="0.4" />

            {/* Spire */}
            <polygon points="50,55 36,115 64,115" fill="#e8b931" opacity="0.9" />
            {/* Spire edge lines for dimension */}
            <line x1="50" y1="55" x2="36" y2="115" stroke="#d4a04a" strokeWidth="0.8" opacity="0.5" />
            <line x1="50" y1="55" x2="64" y2="115" stroke="#d4a04a" strokeWidth="0.8" opacity="0.5" />
            {/* Center ridge line */}
            <line x1="50" y1="55" x2="50" y2="115" stroke="#d4a04a" strokeWidth="0.5" opacity="0.3" />

            {/* Finial / ornament at very top */}
            <circle cx="50" cy="50" r="4" fill="#e8b931" opacity="0.95" />
            <line x1="50" y1="54" x2="50" y2="58" stroke="#e8b931" strokeWidth="2" opacity="0.9" />

            {/* Corner pinnacles on crown (small turrets) */}
            <polygon points="22,130 18,145 26,145" fill="#e8b931" opacity="0.6" />
            <polygon points="78,130 74,145 82,145" fill="#e8b931" opacity="0.6" />
          </g>

          {/* ===== LAYER 8: Hill Auditorium — neoclassical, right of Burton ===== */}
          <g transform="translate(1050, 0)">
            {/* Main body */}
            <rect x="0" y="430" width="160" height="170" fill="url(#aa-bldg)" opacity="0.55" />
            {/* Triangular pediment */}
            <polygon points="80,395 -5,435 165,435" fill="url(#aa-bldg)" opacity="0.6" />
            {/* Pediment inner triangle detail */}
            <polygon points="80,405 15,432 145,432" fill="none" stroke="#e8b931" strokeWidth="1" opacity="0.3" />
            {/* Columns — classical proportion */}
            <rect x="10" y="435" width="7" height="95" fill="#e8b931" opacity="0.5" />
            <rect x="28" y="435" width="7" height="95" fill="#e8b931" opacity="0.5" />
            <rect x="46" y="435" width="7" height="95" fill="#e8b931" opacity="0.5" />
            <rect x="64" y="435" width="7" height="95" fill="#e8b931" opacity="0.5" />
            <rect x="82" y="435" width="7" height="95" fill="#e8b931" opacity="0.5" />
            <rect x="100" y="435" width="7" height="95" fill="#e8b931" opacity="0.5" />
            <rect x="118" y="435" width="7" height="95" fill="#e8b931" opacity="0.5" />
            <rect x="136" y="435" width="7" height="95" fill="#e8b931" opacity="0.5" />
            {/* Column capitals (widened tops) */}
            <rect x="8" y="433" width="11" height="4" fill="#e8b931" opacity="0.4" />
            <rect x="26" y="433" width="11" height="4" fill="#e8b931" opacity="0.4" />
            <rect x="44" y="433" width="11" height="4" fill="#e8b931" opacity="0.4" />
            <rect x="62" y="433" width="11" height="4" fill="#e8b931" opacity="0.4" />
            <rect x="80" y="433" width="11" height="4" fill="#e8b931" opacity="0.4" />
            <rect x="98" y="433" width="11" height="4" fill="#e8b931" opacity="0.4" />
            <rect x="116" y="433" width="11" height="4" fill="#e8b931" opacity="0.4" />
            <rect x="134" y="433" width="11" height="4" fill="#e8b931" opacity="0.4" />
            {/* Steps at base */}
            <rect x="-5" y="530" width="170" height="4" fill="#e8b931" opacity="0.25" />
            <rect x="-2" y="536" width="164" height="3" fill="#e8b931" opacity="0.18" />
            <rect x="0" y="541" width="160" height="3" fill="#e8b931" opacity="0.12" />
            {/* Roof line / cornice */}
            <rect x="-5" y="427" width="170" height="5" fill="#e8b931" opacity="0.4" />
          </g>

          {/* ===== LAYER 9: Rackham Graduate School — domed building ===== */}
          <g transform="translate(1270, 0)">
            {/* Main building body */}
            <rect x="0" y="460" width="100" height="140" fill="url(#aa-bldgLight)" opacity="0.5" />
            {/* Central dome */}
            <ellipse cx="50" cy="458" rx="30" ry="12" fill="url(#aa-bldg)" opacity="0.5" />
            <ellipse cx="50" cy="455" rx="22" ry="18" fill="url(#aa-bldg)" opacity="0.45" />
            {/* Cupola on dome */}
            <rect x="44" y="430" width="12" height="12" fill="#e8b931" opacity="0.45" />
            <polygon points="50,420 42,432 58,432" fill="#e8b931" opacity="0.5" />
            {/* Entry columns */}
            <rect x="20" y="480" width="5" height="50" fill="#e8b931" opacity="0.35" />
            <rect x="35" y="480" width="5" height="50" fill="#e8b931" opacity="0.35" />
            <rect x="60" y="480" width="5" height="50" fill="#e8b931" opacity="0.35" />
            <rect x="75" y="480" width="5" height="50" fill="#e8b931" opacity="0.35" />
            {/* Windows */}
            <rect x="10" y="485" width="6" height="12" rx="3" fill="#0c1a2e" opacity="0.25" />
            <rect x="84" y="485" width="6" height="12" rx="3" fill="#0c1a2e" opacity="0.25" />
          </g>

          {/* ===== LAYER 10: Downtown Ann Arbor — State Street / Main Street buildings ===== */}
          <g transform="translate(1400, 0)">
            {/* First National Building (tallest downtown) */}
            <rect x="0" y="420" width="32" height="180" fill="url(#aa-bldg)" opacity="0.45" />
            <rect x="0" y="415" width="32" height="8" fill="#e8b931" opacity="0.35" />
            {/* Window grid */}
            <rect x="5" y="435" width="4" height="6" fill="#0c1a2e" opacity="0.2" />
            <rect x="14" y="435" width="4" height="6" fill="#0c1a2e" opacity="0.2" />
            <rect x="23" y="435" width="4" height="6" fill="#0c1a2e" opacity="0.2" />
            <rect x="5" y="450" width="4" height="6" fill="#0c1a2e" opacity="0.2" />
            <rect x="14" y="450" width="4" height="6" fill="#0c1a2e" opacity="0.2" />
            <rect x="23" y="450" width="4" height="6" fill="#0c1a2e" opacity="0.2" />
            <rect x="5" y="465" width="4" height="6" fill="#0c1a2e" opacity="0.2" />
            <rect x="14" y="465" width="4" height="6" fill="#0c1a2e" opacity="0.2" />
            <rect x="23" y="465" width="4" height="6" fill="#0c1a2e" opacity="0.2" />

            {/* Michigan Theater marquee building */}
            <rect x="42" y="470" width="45" height="130" fill="url(#aa-bldg)" opacity="0.4" />
            {/* Marquee sign */}
            <rect x="47" y="490" width="35" height="18" rx="2" fill="none" stroke="#e8b931" strokeWidth="1.5" opacity="0.45" />
            {/* Decorative top */}
            <polygon points="64,455 42,470 86,470" fill="url(#aa-bldg)" opacity="0.35" />

            {/* Smaller Main St buildings */}
            <rect x="95" y="480" width="35" height="120" fill="url(#aa-bldgLight)" opacity="0.4" />
            <rect x="138" y="490" width="40" height="110" fill="url(#aa-bldg)" opacity="0.35" />
            <rect x="185" y="475" width="30" height="125" fill="url(#aa-bldgLight)" opacity="0.35" />

            {/* Storefronts at ground level */}
            <rect x="42" y="575" width="45" height="12" fill="#e8b931" opacity="0.15" />
            <rect x="95" y="578" width="35" height="10" fill="#e8b931" opacity="0.12" />
            <rect x="138" y="580" width="40" height="10" fill="#e8b931" opacity="0.1" />
          </g>

          {/* ===== LAYER 11: City Hall (Larcom Building) — where council meets ===== */}
          <g transform="translate(1640, 0)">
            {/* Main structure */}
            <rect x="0" y="460" width="80" height="140" fill="url(#aa-bldg)" opacity="0.4" />
            {/* Modernist horizontal bands */}
            <rect x="0" y="475" width="80" height="2" fill="#e8b931" opacity="0.3" />
            <rect x="0" y="495" width="80" height="2" fill="#e8b931" opacity="0.25" />
            <rect x="0" y="515" width="80" height="2" fill="#e8b931" opacity="0.2" />
            <rect x="0" y="535" width="80" height="2" fill="#e8b931" opacity="0.15" />
            {/* Entrance canopy */}
            <rect x="15" y="565" width="50" height="6" fill="#e8b931" opacity="0.3" />
            {/* Window grid (modern) */}
            <rect x="8" y="480" width="12" height="10" fill="#0c1a2e" opacity="0.2" />
            <rect x="26" y="480" width="12" height="10" fill="#0c1a2e" opacity="0.2" />
            <rect x="44" y="480" width="12" height="10" fill="#0c1a2e" opacity="0.2" />
            <rect x="62" y="480" width="12" height="10" fill="#0c1a2e" opacity="0.2" />
          </g>

          {/* ===== LAYER 12: Single tree — right edge, balancing composition ===== */}
          <path d="M1790,500 Q1800,470 1815,480 Q1830,490 1840,465 Q1850,485 1835,505 Q1820,515 1800,510 Q1792,508 1790,500 Z" fill="url(#aa-bldgLight)" opacity="0.35" />
          <rect x="1813" y="510" width="3" height="35" fill="#d4a04a" opacity="0.15" />

          {/* ===== LAYER 13: Data trend line — dissent rate across the skyline ===== */}
          <path d="M200,555 Q300,548 400,540 Q500,548 600,530 Q700,520 800,535 Q900,540 980,510 Q1060,530 1150,525 Q1250,520 1350,535 Q1450,528 1550,540 Q1650,548 1750,545" stroke="#d4453a" strokeWidth="2" fill="none" opacity="0.35" strokeLinecap="round" />
          {/* Dot at the Ann Arbor peak (center, lowest = highest dissent) */}
          <circle cx="980" cy="510" r="3.5" fill="#d4453a" opacity="0.5" />

          {/* ===== LAYER 14: Michigan block "M" — subtle watermark ===== */}
          <g transform="translate(1860, 545)" opacity="0.08">
            <path d="M0,40 L0,0 L10,20 L20,0 L20,40 L16,40 L16,12 L10,26 L4,12 L4,40 Z" fill="#e8b931" />
          </g>

          {/* Ground plane */}
          <rect x="0" y="595" width="1920" height="3" fill="#e8b931" opacity="0.12" />
        </svg>
      </div>

      <div
        className="aa-hero-content"
        style={{ opacity, transform: `translateY(${translateY}px)` }}
      >
        <div className="aa-hero-badge">
          <span className="aa-badge-dot" />
          From The District
        </div>

        <h1 className="aa-hero-title">
          The City That{" "}
          <span className="aa-hero-title-accent">Won&rsquo;t Agree</span>
        </h1>

        <p className="aa-hero-subtitle">
          Ann Arbor&rsquo;s council has the highest dissent rate in America.
          Seventeen years of voting data across 142 cities explain why.
        </p>

        <div className="aa-hero-byline">
          By <a href="https://www.linkedin.com/in/sunilrajaraman/" target="_blank" rel="noopener noreferrer">Sunil Rajaraman</a> &middot; February 2026 &middot; Deep dive
        </div>
      </div>

      <div className="aa-scroll-prompt" style={{ opacity }}>
        <div className="aa-scroll-line" />
        <span>Scroll to explore</span>
      </div>
    </header>
  );
}

// ============================================================================
// SECTION 1: THE CEREMONY
// ============================================================================

function CeremonySection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section ref={ref} className="aa-editorial-section">
      <div
        className="aa-reveal"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.8s var(--ease-elegant)",
        }}
      >
        <div className="aa-section-header">
          <h2 className="aa-section-title">
            Where Decisions Go to Be Announced
          </h2>
        </div>

        <div className="aa-body-prose">
          <p>
            Walk into a city council meeting almost anywhere in America and
            you will watch a highly choreographed performance. The mayor gavels
            in. Staff reads through the consent agenda&mdash;sometimes thirty or
            forty items bundled together, each one a routine approval that was
            negotiated weeks ago in committee. Hands go up, the bundle passes,
            and nobody says a word because there is nothing left to say. The
            zoning variances and budget amendments that follow have already been
            workshopped, revised, and cleared of opposition before the cameras
            turn on. What looks like a governing body making decisions is really
            a governing body announcing them.
          </p>
          <p>
            We pulled {DATA.summary.totalVotes.toLocaleString()} individual vote
            records from {DATA.summary.totalCities} American cities&mdash;more
            than a decade of council business, logged roll call by roll call in
            the{" "}
            <a href="https://a2gov.legistar.com/" target="_blank" rel="noopener noreferrer">Legistar system</a>{" "}
            that most of these cities use to manage their legislative records.{" "}
            <strong>{DATA.summary.nationalUnanimityRate}%</strong> of all agenda
            items passed without a single dissenting vote.{" "}
            {DATA.summary.perfectUnanimityCities} of the cities we
            examined recorded dissent rates below 0.5%&mdash;Chicago&rsquo;s
            fifty-member council dissents on six-hundredths of one percent of
            its votes, and New York barely clears one percent. The American city
            council, as a statistical matter, is a rubber stamp attached to a
            gavel.
          </p>
          <p>
            Except in Ann Arbor, Michigan, where none of this is true.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// VIZ: DISSENT BAR CHART — 142 cities, Ann Arbor spike
// ============================================================================

function DissentBarChart() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) setHasAnimated(true);
  }, [isVisible, hasAnimated]);

  const cities = DATA.cityDissent;
  const maxRate = 20;
  const barHeight = 22;
  const gap = 3;
  const labelWidth = 110;
  const chartWidth = 760;
  const svgHeight = cities.length * (barHeight + gap) + 20;

  return (
    <div ref={ref} className="aa-chart-wrap">
      <div className="aa-chart-title">
        Dissent Rate by City — Selected from {DATA.summary.totalCities} Cities
      </div>
      <div className="aa-bar-chart">
        <svg
          viewBox={`0 0 ${chartWidth} ${svgHeight}`}
          style={{ width: "100%", height: "auto" }}
        >
          {cities.map((city, i) => {
            const y = i * (barHeight + gap) + 10;
            const barW = hasAnimated
              ? ((city.rate / maxRate) * (chartWidth - labelWidth - 60))
              : 0;
            const isAA = city.city === "Ann Arbor";

            return (
              <g key={city.city}>
                <text
                  x={labelWidth - 8}
                  y={y + barHeight / 2 + 4}
                  textAnchor="end"
                  className="aa-bar-label"
                  style={{
                    fontWeight: isAA ? 700 : 400,
                    fill: isAA ? "#e8b931" : undefined,
                  }}
                >
                  {city.city}, {city.state}
                </text>
                <rect
                  x={labelWidth}
                  y={y}
                  width={barW}
                  height={barHeight}
                  rx={3}
                  className={isAA ? "bar-highlight" : "bar-default"}
                  style={{
                    transition: `width 1.2s var(--ease-elegant) ${i * 0.03}s`,
                  }}
                />
                {hasAnimated && (
                  <text
                    x={labelWidth + barW + 6}
                    y={y + barHeight / 2 + 4}
                    className="aa-bar-value"
                    style={{
                      opacity: hasAnimated ? 1 : 0,
                      transition: `opacity 0.5s ease ${0.8 + i * 0.03}s`,
                      fill: isAA ? "#e8b931" : undefined,
                    }}
                  >
                    {city.rate}%
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
      <p className="aa-chart-subtitle">
        National average: {DATA.summary.nationalDissentRate}%. Ann
        Arbor&rsquo;s 18.19% is 3&times; the next-highest city and
        300&times; Chicago&rsquo;s rate.
      </p>
    </div>
  );
}

// ============================================================================
// SECTION 2: THE PEOPLE'S REPUBLIC
// ============================================================================

function RepublicSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section ref={ref} className="aa-editorial-section">
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.8s var(--ease-elegant)",
        }}
      >
        <div className="aa-section-header">
          <h2 className="aa-section-title">
            25 Square Miles, Surrounded by Reality
          </h2>
        </div>

        <div className="aa-body-prose">
          <p>
            Ann Arbor&mdash;population{" "}
            {DATA.summary.annArborPopulation.toLocaleString()}, home to the
            University of Michigan, the kind of place where yard signs
            outnumber parking spots&mdash;records an{" "}
            <strong>{DATA.summary.annArborDissentRate}%</strong> dissent rate
            across {DATA.summary.annArborItems.toLocaleString()}+ agenda items,
            which is triple the next-closest city in our dataset and roughly
            three hundred times Chicago&rsquo;s. That rate has held above 12%
            every single year we measured, through recessions, a pandemic, and
            complete turnovers of the council itself.
          </p>
          <p>
            To understand how strange this is, consider the politics. Ann Arbor
            has not elected a Republican to any office since 2003. All eleven
            council seats belong to Democrats. The city is one of only two in
            Michigan&mdash;along with Ypsilanti&mdash;that still holds partisan
            municipal elections, which means the August Democratic primary
            effectively decides every race on a turnout of 25&ndash;35%.
            And yet this single-party city produces more internal disagreement
            than councils in places that are actually split between the two
            national parties.
          </p>
          <p>
            The fights are entirely intramural: urbanists vs. preservationists,
            climate hawks vs. neighborhood advocates, the mayor&rsquo;s
            organized coalition vs. a rotating cast of independents whose only
            common ground is skepticism of the mayor&rsquo;s organized
            coalition. Ann Arbor&rsquo;s locals call it &ldquo;The People&rsquo;s
            Republic,&rdquo; a nickname that dates to the 1960s, when Students
            for a Democratic Society was founded on campus and the University
            hosted the nation&rsquo;s first Vietnam War teach-in. The Human
            Rights Party won council seats in the 1970s. This city has been
            arguing with itself for sixty years, and the data says it does so at
            an intensity no other American city comes close to matching.
          </p>

          <PullQuote
            text="I've never seen more contention and anger or so little getting done."
            attribution="Mayor Christopher Taylor"
            city="Ann Arbor"
            state="MI"
            className="aa-pull-quote"
          />

          <p>
            Taylor was describing the 2018&ndash;2020 council. Seven members
            the{" "}
            <a href="https://annarborobserver.com/articles/democratic_deadlock.html" target="_blank" rel="noopener noreferrer">Ann Arbor Observer labeled &ldquo;Protectors&rdquo;</a>{" "}
            held the majority. They wanted roads fixed, sewers maintained, police
            staffed, and neighborhoods left alone. The mayor&rsquo;s four-member
            minority, the &ldquo;Strivers,&rdquo; pushed for density, transit,
            and climate spending. Debates ran past 3 a.m. The Protector majority{" "}
            <a href="https://www.michigandaily.com/news/ann-arbor/city-council-8-2/" target="_blank" rel="noopener noreferrer">fired City Administrator Howard Lazarus</a>{" "}
            in February 2020 without cause&mdash;a 7&ndash;4 vote that provoked
            a public backlash and a $223,600 severance payout.
          </p>
          <p>
            Then the map flipped. In August 2020, Taylor&rsquo;s endorsed
            slate swept all five contested ward seats. Lisa Disch, Linh Song,
            Travis Radina, Jen Eyer, and Erica Briggs replaced
            Protector-aligned members or claimed open seats. By 2022, the
            progressive faction held the entire council. The contention barely
            paused. Dissent ran 20.3% in 2019, 19.5% in 2020, 22.0% in 2021,
            19.8% in 2022. Only in 2023, with the last Protector-aligned members
            gone, did it dip to 12.3%&mdash;though a smaller sample of votes
            that year clouds the signal.
          </p>
          <p>
            So was the fighting structural&mdash;hard-wired into a city where
            everyone reads the staff reports and nobody defers to anyone?
            Or was it factional, driven by a cohort of dissenters who eventually
            aged out? The seventeen-year baseline above 12% points to culture.
            The 2023 dip points to personnel. Ann Arbor probably breeds dissent
            by temperament, and certain councils crank the volume up.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// VIZ: DISSENT TIMELINE — Ann Arbor by year (2008–2024)
// ============================================================================

function DissentTimeline() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) setHasAnimated(true);
  }, [isVisible, hasAnimated]);

  const data = DATA.yearlyDissent;
  const chartW = 760;
  const chartH = 280;
  const margin = { top: 20, right: 20, bottom: 40, left: 55 };
  const w = chartW - margin.left - margin.right;
  const h = chartH - margin.top - margin.bottom;

  const xScale = (year: number) =>
    margin.left + ((year - 2008) / (2024 - 2008)) * w;
  const yScale = (rate: number) =>
    margin.top + h - (rate / 25) * h;

  // Build SVG path
  const linePath = data
    .map((d, i) => `${i === 0 ? "M" : "L"} ${xScale(d.year)} ${yScale(d.rate)}`)
    .join(" ");
  const areaPath =
    linePath +
    ` L ${xScale(data[data.length - 1].year)} ${yScale(0)} L ${xScale(data[0].year)} ${yScale(0)} Z`;

  // National avg line
  const natY = yScale(DATA.summary.nationalDissentRate);

  return (
    <div ref={ref} className="aa-chart-wrap">
      <div className="aa-chart-title">
        Ann Arbor Dissent Rate by Year (2008&ndash;2024)
      </div>
      <div className="aa-timeline-chart">
        <svg viewBox={`0 0 ${chartW} ${chartH}`} style={{ width: "100%", height: "auto" }}>
          {/* Grid lines */}
          {[0, 5, 10, 15, 20, 25].map((v) => (
            <g key={v}>
              <line
                x1={margin.left}
                y1={yScale(v)}
                x2={chartW - margin.right}
                y2={yScale(v)}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth={1}
              />
              <text
                x={margin.left - 8}
                y={yScale(v) + 4}
                textAnchor="end"
                fill="#8e99a8"
                fontSize={11}
                fontFamily="var(--font-sans)"
              >
                {v}%
              </text>
            </g>
          ))}

          {/* X-axis labels */}
          {data.filter((_, i) => i % 2 === 0).map((d) => (
            <text
              key={d.year}
              x={xScale(d.year)}
              y={chartH - 8}
              textAnchor="middle"
              fill="#8e99a8"
              fontSize={11}
              fontFamily="var(--font-sans)"
            >
              {d.year}
            </text>
          ))}

          {/* National average reference line */}
          <line
            x1={margin.left}
            y1={natY}
            x2={chartW - margin.right}
            y2={natY}
            stroke="#d4453a"
            strokeWidth={1}
            strokeDasharray="6,4"
            opacity={0.6}
          />
          <text
            x={chartW - margin.right + 4}
            y={natY + 4}
            fill="#d4453a"
            fontSize={10}
            fontFamily="var(--font-sans)"
          >
            National avg (1.59%)
          </text>

          {/* Area fill */}
          <path
            d={areaPath}
            fill="rgba(232, 185, 49, 0.1)"
            style={{
              opacity: hasAnimated ? 1 : 0,
              transition: "opacity 1s var(--ease-elegant)",
            }}
          />

          {/* Line */}
          <path
            d={linePath}
            fill="none"
            stroke="#e8b931"
            strokeWidth={2.5}
            strokeLinejoin="round"
            style={{
              strokeDasharray: hasAnimated ? "none" : "2000",
              strokeDashoffset: hasAnimated ? 0 : 2000,
              transition: "stroke-dashoffset 2s var(--ease-elegant)",
            }}
          />

          {/* Data dots */}
          {data.map((d) => (
            <circle
              key={d.year}
              cx={xScale(d.year)}
              cy={yScale(d.rate)}
              r={4}
              fill="#e8b931"
              stroke="#0c1a2e"
              strokeWidth={2}
              style={{
                opacity: hasAnimated ? 1 : 0,
                transition: `opacity 0.5s ease ${0.8}s`,
              }}
            />
          ))}

          {/* Key year annotations */}
          <text
            x={xScale(2015)}
            y={yScale(22.2) - 12}
            textAnchor="middle"
            fill="#e8b931"
            fontSize={10}
            fontFamily="var(--font-sans)"
            fontWeight={600}
            style={{ opacity: hasAnimated ? 1 : 0, transition: "opacity 0.5s ease 1.5s" }}
          >
            22.2%
          </text>
          <text
            x={xScale(2021)}
            y={yScale(22.0) - 12}
            textAnchor="middle"
            fill="#e8b931"
            fontSize={10}
            fontFamily="var(--font-sans)"
            fontWeight={600}
            style={{ opacity: hasAnimated ? 1 : 0, transition: "opacity 0.5s ease 1.5s" }}
          >
            22.0%
          </text>
        </svg>
      </div>
      <p className="aa-chart-subtitle">
        The dissent rate has exceeded 12% every year in the dataset, peaking
        at 22% in 2015 and 2021. The 2020 faction sweep barely
        registered&mdash;though the 2023 dip to 12.3% may signal a shift.
      </p>
    </div>
  );
}

// ============================================================================
// SECTION 3: THE FACTIONS
// ============================================================================

function FactionSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section ref={ref} className="aa-editorial-section">
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.8s var(--ease-elegant)",
        }}
      >
        <div className="aa-section-header">
          <h2 className="aa-section-title">
            Two Factions, One Party Card
          </h2>
        </div>

        <div className="aa-body-prose">
          <p>
            Jeff Hayner represented Ward 1 from 2018 to 2022. He voted no on{" "}
            {DATA.summary.haynerDissentRate}% of everything that came before
            him&mdash;nearly half. He and Lisa Disch, who holds that same Ward 1
            seat today, agreed on 32.4% of the 293 votes they shared. On a
            typical American city council, any two members agree above 95%. Hayner
            and Disch, both Democrats, occupying the same seat four years apart,
            were closer to a coin flip.
          </p>
          <p>
            Hayner was the council&rsquo;s most visible contrarian: an
            environmental advocate who championed the Gelman Plume cleanup&mdash;a
            1,4-dioxane contamination that has been spreading beneath Ann Arbor
            since the 1960s&mdash;and who led the decriminalization of
            entheogenic plants. He sponsored PILOT resolutions targeting the
            University of Michigan&rsquo;s enormous tax-exempt footprint. In
            April 2021, he posted a passage from Hunter S. Thompson&rsquo;s
            &ldquo;Fear and Loathing in Las Vegas&rdquo; on Facebook containing
            a homophobic slur. Hayner argued it was literary commentary, not
            endorsement. Council{" "}
            <a href="https://www.michigandaily.com/news/ann-arbor/city-council-votes-to-remove-councilmember-jeff-hayner-from-appointments-after-quoting-homophobic-slur-on-facebook/" target="_blank" rel="noopener noreferrer">voted 8&ndash;2 to strip him of all committee
            appointments</a>. A recall effort won approval from the Washtenaw
            County Election Commission but fell short of the 2,264 signatures
            required.
          </p>
          <p>
            Julie Grand, who has held Ward 3 since 2014, sits at the other pole.
            She and Linh Song vote together 97.2% of the time&mdash;a locked
            bloc. She and Hayner agreed just 41% across 719 shared votes. She
            and Anne Bannister, 52%. The pattern repeats across every
            Protector&ndash;Striver pairing in the dataset. The heatmap below makes the divide
            physical: a warm cluster of seven members in the upper-left, a tight
            progressive bloc of four in the lower-right, and a cold diagonal
            fault line between them.
          </p>
          <p>
            Not everyone accepts the two-faction story.{" "}
            <a href="https://daveaskins.com/2019/06/09/analysis-breaking-down-the-two-faction-framing-of-ann-arbors-city-council-politics/" target="_blank" rel="noopener noreferrer">Dave Askins</a>,
            former editor of the Ann Arbor Chronicle, applied multidimensional
            scaling to 100 roll-call votes in 2019 and found only 14 that split
            strictly along factional lines. The Protectors showed far more
            internal variation than the Strivers, who voted as a near-perfect
            bloc. Elizabeth Nelson, a councilmember then loosely grouped with the
            Protectors,{" "}
            <a href="https://a2elnel.com/post/an-inconvenient-truth-there-is-only-one-faction/" target="_blank" rel="noopener noreferrer">wrote that there was really &ldquo;only one
            faction&rdquo;</a>&mdash;the mayor&rsquo;s organized
            coalition&mdash;while the supposed opposition was seven independent
            voices who happened to converge occasionally.
          </p>
          <p>
            The voting data gives both camps ammunition. Among the Protectors,
            agreement rates ranged widely, from 62.8% between Hayner and Lumm to
            78.5% between Eaton and Bannister&mdash;a loose alliance that held
            together on big votes but fractured on the details. Among the
            Strivers, agreement ran above 82% across every pairing: Taylor,
            Grand, Disch, and Song moved as a unit. That asymmetry goes a long
            way toward explaining why the Strivers eventually won. They
            didn&rsquo;t need to agree on everything&mdash;just enough to show
            up with the same vote when it counted.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// VIZ: AGREEMENT HEATMAP
// ============================================================================

function AgreementHeatmap() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    a: string;
    b: string;
    val: number;
  } | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) setHasAnimated(true);
  }, [isVisible, hasAnimated]);

  const members = DATA.heatmapMembers;
  const matrix = DATA.heatmapData;
  const n = members.length;

  const getColor = (val: number, isDiag: boolean) => {
    if (isDiag) return "rgba(255,255,255,0.04)";
    // Gold (high agreement) → Red (low agreement)
    if (val >= 80) return `rgba(232, 185, 49, ${0.3 + (val - 80) * 0.035})`;
    if (val >= 60) return `rgba(232, 185, 49, ${0.1 + (val - 60) * 0.01})`;
    if (val >= 50) return `rgba(212, 69, 58, ${0.15 + (60 - val) * 0.015})`;
    return `rgba(212, 69, 58, ${0.3 + (50 - val) * 0.02})`;
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent, row: number, col: number) => {
      if (row === col) return;
      setTooltip({
        x: e.clientX + 12,
        y: e.clientY - 40,
        a: members[row],
        b: members[col],
        val: matrix[row][col],
      });
    },
    [members, matrix]
  );

  return (
    <div ref={ref} className="aa-heatmap-container">
      <div className="aa-chart-title">
        Pairwise Agreement Rates &mdash; Ann Arbor Council (2018&ndash;2022)
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `80px repeat(${n}, 1fr)`,
          gap: "2px",
          minWidth: "600px",
          opacity: hasAnimated ? 1 : 0,
          transition: "opacity 0.8s var(--ease-elegant)",
        }}
      >
        {/* Column headers */}
        <div />
        {members.map((m) => (
          <div
            key={`col-${m}`}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "9px",
              color: "var(--page-text-muted)",
              textAlign: "center",
              paddingBottom: "4px",
              writingMode: "vertical-lr",
              transform: "rotate(180deg)",
              height: "60px",
            }}
          >
            {m}
          </div>
        ))}

        {/* Rows */}
        {members.map((rowMember, row) => (
          <Fragment key={`row-${rowMember}`}>
            <div
              className="aa-heatmap-labels-y"
              style={{ fontSize: "10px" }}
            >
              {rowMember}
            </div>
            {members.map((colMember, col) => {
              const val = matrix[row][col];
              const isDiag = row === col;
              return (
                <div
                  key={`${row}-${col}`}
                  className={`aa-heatmap-cell${isDiag ? " diagonal" : ""}`}
                  style={{
                    background: getColor(val, isDiag),
                    transitionDelay: `${(row * n + col) * 8}ms`,
                  }}
                  onMouseMove={(e) => handleMouseMove(e, row, col)}
                  onMouseLeave={() => setTooltip(null)}
                />
              );
            })}
          </Fragment>
        ))}
      </div>

      {tooltip && (
        <div
          className="aa-heatmap-tooltip"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.a} &harr; {tooltip.b}:{" "}
          <strong>{tooltip.val.toFixed(1)}%</strong> agreement
        </div>
      )}

      <p className="aa-chart-subtitle">
        Hover over any cell. The upper-left cluster (Hayner through Lumm) is the
        Protector bloc. The lower-right cluster (Taylor through Song) is the
        Striver coalition. The cold zone between them is the fault line.
      </p>
    </div>
  );
}

// ============================================================================
// SECTION 4: WHAT THEY FIGHT ABOUT
// ============================================================================

function FlashpointSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section ref={ref} className="aa-editorial-section">
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.8s var(--ease-elegant)",
        }}
      >
        <div className="aa-section-header">
          <h2 className="aa-section-title">
            What ${DATA.summary.arpaTotal} Million in Federal Money
            Couldn&rsquo;t Buy
          </h2>
        </div>

        <div className="aa-body-prose">
          <p>
            On the evening of November 9, 2014, Ann Arbor police officers
            responded to a domestic disturbance on West Summit Street. They{" "}
            <a href="https://www.michigandaily.com/news/ann-arbor/aura-rosser-vigil/" target="_blank" rel="noopener noreferrer">shot
            and killed Aura Rosser</a>, a 40-year-old Black woman, inside her
            own home. The county prosecutor declined to press charges. The
            killing became a wound that did not close, and when George
            Floyd&rsquo;s murder nationalized the policing debate six years
            later, Ann Arbor did not need to be convinced there was a problem.
            It had been arguing about the problem since 2014.
          </p>
          <p>
            Council{" "}
            <a href="https://www.michigandaily.com/news/ann-arbor/city-council-finalizes-allocation-of-american-rescue-plan-act-funds/" target="_blank" rel="noopener noreferrer">earmarked $3.5 million in American Rescue Plan Act funds</a>{" "}
            for an unarmed crisis response pilot: a 16-person team with its own
            emergency number, its own dispatchers, and de-escalation specialists
            drawn from people with direct experience of incarceration or mental
            health crisis. Donnell Wyche, senior pastor of Vineyard Church, led
            the Coalition for Re-envisioning Our Safety in developing the model.
            Estimated cost: $3 million a year for a two-year pilot.
          </p>
          <p>
            City Administrator Milton Dohoney found the only submitted bid
            non-responsive to the RFP requirements, citing the cost of building
            separate dispatch infrastructure. Whether that was a legitimate
            procurement finding or a bureaucratic kill shot depends on who you
            ask. In July 2024, facing the federal ARPA spending deadline, council{" "}
            <a href="https://www.michigandaily.com/news/ann-arbor/ann-arbor-community-responds-to-the-reallocation-of-unarmed-crisis-response-money/" target="_blank" rel="noopener noreferrer">reallocated the $3.5 million</a>{" "}
            to a Barton Dam embankment project and park improvements. The program
            born from Aura Rosser&rsquo;s killing never launched.
          </p>
          <p>
            The ARPA fight was one front. In 2017, the city{" "}
            <a href="https://localinannarbor.com/2021/01/01/in-deep-ann-arbors-water-troubles/" target="_blank" rel="noopener noreferrer">restructured water rates</a>,
            shifting costs from multifamily apartments to single-family
            homeowners. Jane Lumm&mdash;the council&rsquo;s lone independent, a
            former Republican in a city that treats the label like a
            communicable disease&mdash;became the champion of furious ratepayers.
            A lawsuit, Hahn v. City of Ann Arbor, alleged the city had
            overcharged &ldquo;in the tens of millions&rdquo; by exceeding the
            cost of service. A judge denied class certification. Council split
            6&ndash;5 to delay rate increases during COVID, then pushed through
            a combined 14% increase over six months in 2021.
          </p>
          <p>
            In November 2024, Ann Arbor voters considered{" "}
            <a href="https://www.michiganpublic.org/politics-government/2024-11-06/ann-arbor-voters-reject-major-reform-of-election-system-say-yes-to-renewable-energy-utility" target="_blank" rel="noopener noreferrer">two ballot proposals</a>{" "}
            that might have defused some of the fighting: nonpartisan elections
            and the state&rsquo;s first local campaign finance reform. Mayor
            Taylor opposed both, calling himself a &ldquo;proud
            Democrat.&rdquo; Critics of the measures argued they were designed
            to hand a back door to candidates who had lost in Democratic
            primaries.{" "}
            <a href="https://www.wemu.org/wemu-news/2024-11-06/city-of-ann-arbors-nonpartisan-voting-proposal-rejected-seu-and-park-maintenance-proposals-pass" target="_blank" rel="noopener noreferrer">Both proposals failed</a>.
            Ann Arbor voted, in effect, to keep the system that produces its
            contention.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// VIZ: MATTER TYPE BREAKDOWN
// ============================================================================

function MatterTypeChart() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) setHasAnimated(true);
  }, [isVisible, hasAnimated]);

  const maxRate = 35;

  return (
    <div ref={ref} className="aa-chart-wrap">
      <div className="aa-chart-title">
        Dissent Rate by Matter Type &mdash; Ann Arbor
      </div>
      <div className="aa-matter-bars">
        {DATA.matterTypes.map((mt, i) => {
          const fillPct = hasAnimated ? (mt.rate / maxRate) * 100 : 0;
          const isHot = mt.rate > 20;

          return (
            <div key={mt.type} className="aa-matter-row">
              <div className="aa-matter-label">{mt.type}</div>
              <div className="aa-matter-bar-track">
                <div
                  className="aa-matter-bar-fill"
                  style={{
                    width: `${fillPct}%`,
                    background: isHot
                      ? "linear-gradient(90deg, #e8b931, #d4a04a)"
                      : "rgba(232, 185, 49, 0.4)",
                    transitionDelay: `${i * 0.1}s`,
                  }}
                >
                  {hasAnimated && mt.rate > 5 && (
                    <span>{mt.rate}%</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="aa-chart-subtitle">
        Ordinances (binding law changes) and resolutions (policy statements)
        generate roughly equal dissent at 31&ndash;32%. Even appointments
        draw 24% opposition. Only meeting minutes pass unanimously.
      </p>
    </div>
  );
}

// ============================================================================
// CLOSEST VOTES TABLE
// ============================================================================

function ClosestVotesSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section ref={ref} className="aa-editorial-section">
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.8s var(--ease-elegant)",
        }}
      >
        <div className="aa-section-header">
          <h2 className="aa-section-title">One Vote</h2>
        </div>

        <div className="aa-body-prose">
          <p>
            {DATA.summary.razorThinVotes} items in the Ann Arbor dataset passed
            or failed by a single vote&mdash;6&ndash;5 on an eleven-member
            council, or 5&ndash;5 ties that killed the motion outright. These
            were not procedural throwaways. They include annual budgets,
            neighborhood rezonings, the Gelman contamination settlement, and
            whether to end the city&rsquo;s COVID local emergency&mdash;each
            one decided by a single person&rsquo;s presence or willingness to
            break from their usual allies.
          </p>
        </div>

        <div style={{ overflowX: "auto", margin: "2rem 0" }}>
          <table className="aa-votes-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Item</th>
                <th>Vote</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {DATA.closestVotes.map((v, i) => (
                <tr key={i}>
                  <td style={{ whiteSpace: "nowrap" }}>{v.date}</td>
                  <td>{v.title}</td>
                  <td className="aa-vote-split">{v.split}</td>
                  <td>{v.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="aa-body-prose">
          <p>
            The last entry is the one that makes Ann Arbor, Ann Arbor. In
            September 2024, council split 5&ndash;5 on a leaf blower ban. The
            motion failed. A city that divides evenly on leaf blowers is a city
            that will divide on anything.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// CONCLUSION
// ============================================================================

function ConclusionSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section ref={ref} className="aa-editorial-section">
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.8s var(--ease-elegant)",
        }}
      >
        <div className="aa-section-header">
          <h2 className="aa-section-title">
            What Does a Fighting Council Buy You?
          </h2>
        </div>

        <div className="aa-body-prose">
          <p>
            If you are a cynic about local government, the 93.83% unanimity rate
            confirms everything you already believe: the meetings are a rubber
            stamp, public testimony is theater, and the real decisions get made
            long before anyone sits down at the dais. Ann Arbor is the
            counterargument. Its council members actually read the 400-page
            budget packet, show up with amendments, vote no when they disagree,
            and occasionally lose a 5&ndash;5 fight over leaf blowers at 11 p.m.
            on a Monday night.
          </p>
          <p>
            The cost of that kind of deliberation is not abstract. Meetings that
            run past 3 a.m., a fired city administrator and his $223,600
            severance payout, and a $3.5 million crisis response program that
            consumed years of political energy before being reallocated to a
            dam embankment&mdash;those are real invoices, paid by real taxpayers,
            for a council that refuses to let the professionals run things
            quietly.
          </p>
          <p>
            But if you believe the meetings should be what they claim to
            be&mdash;open deliberation by elected representatives who disagree
            honestly and settle those disagreements where the public can watch
            them&mdash;then Ann Arbor starts to look less like an outlier
            and more like the only city in this dataset that is actually doing
            the job. Across 142 cities and 8.1 million votes, it stands alone,
            which raises an uncomfortable possibility: maybe the problem
            isn&rsquo;t Ann Arbor.
          </p>
        </div>

        <div className="aa-conclusion">
          <p className="aa-conclusion-text">
            In 142 American cities, 93.83% of agenda items pass unanimously.
            In Ann Arbor, only 81.81% of individual votes are yeas. That
            18-point gap is the distance between democracy as it is practiced
            in most of the country and democracy as Ann Arbor insists on
            practicing it.
          </p>
        </div>
      </div>
    </section>
  );
}
