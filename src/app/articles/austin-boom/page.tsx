"use client";

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
// DATA — Every statistic in this article traces to this object.
// Source: City of Austin Open Data Portal (Socrata), dataset 3syk-w9eu
// Accessed: 2026-01-23
// ============================================================================
const DATA = {
  summary: {
    totalPermits: 315322,
    buildingPermits: 66156,
    dateRangeStart: "2021-01-21",
    dateRangeEnd: "2026-01-23",
    peakYear: 2021,
    peakYearCount: 71105,
    currentYearCount: 54611, // 2025
    declineFromPeak: 23.2, // percent
    swagitVideos: 9455,
    governmentBodies: 84,
    videoYearSpan: 36, // 1990-2026
    population: 993771, // ACS 2024 1-Year
    medianIncome: 90430, // ACS 2024 1-Year
    medianHomeValue: 571000, // ACS 2024 1-Year
    metroPop: 2550637, // ACS 2024 MSA
  },

  // Year-over-year total permits (all types)
  yearlyPermits: [
    { year: 2021, total: 71105 },
    { year: 2022, total: 70554 },
    { year: 2023, total: 60101 },
    { year: 2024, total: 55795 },
    { year: 2025, total: 54611 },
  ],

  // Building permits with raw and cleaned values
  yearlyBuildingPermits: [
    { year: 2021, count: 15617, rawValue: 17.1, cleanedValue: 13.8, outliers: 24 },
    { year: 2022, count: 14592, rawValue: 41.5, cleanedValue: 21.1, outliers: 102 },
    { year: 2023, count: 11867, rawValue: 66.8, cleanedValue: 15.6, outliers: 23 },
    { year: 2024, count: 11358, rawValue: 9.4, cleanedValue: 9.0, outliers: 2 },
    { year: 2025, count: 12059, rawValue: 8.5, cleanedValue: 6.8, outliers: 8 },
  ],

  // Monthly permits 2021-2025 (60 months)
  monthlyPermits: [
    { m: "2021-01", c: 2019 }, { m: "2021-02", c: 4563 }, { m: "2021-03", c: 7161 },
    { m: "2021-04", c: 7638 }, { m: "2021-05", c: 6701 }, { m: "2021-06", c: 6827 },
    { m: "2021-07", c: 6355 }, { m: "2021-08", c: 6355 }, { m: "2021-09", c: 6728 },
    { m: "2021-10", c: 5721 }, { m: "2021-11", c: 5425 }, { m: "2021-12", c: 5612 },
    { m: "2022-01", c: 5183 }, { m: "2022-02", c: 4737 }, { m: "2022-03", c: 6546 },
    { m: "2022-04", c: 7058 }, { m: "2022-05", c: 6234 }, { m: "2022-06", c: 6999 },
    { m: "2022-07", c: 6052 }, { m: "2022-08", c: 6572 }, { m: "2022-09", c: 6040 },
    { m: "2022-10", c: 5662 }, { m: "2022-11", c: 4979 }, { m: "2022-12", c: 4492 },
    { m: "2023-01", c: 4890 }, { m: "2023-02", c: 4638 }, { m: "2023-03", c: 5845 },
    { m: "2023-04", c: 4447 }, { m: "2023-05", c: 5477 }, { m: "2023-06", c: 5407 },
    { m: "2023-07", c: 5099 }, { m: "2023-08", c: 5677 }, { m: "2023-09", c: 4944 },
    { m: "2023-10", c: 5184 }, { m: "2023-11", c: 4318 }, { m: "2023-12", c: 4175 },
    { m: "2024-01", c: 4473 }, { m: "2024-02", c: 4725 }, { m: "2024-03", c: 4817 },
    { m: "2024-04", c: 5372 }, { m: "2024-05", c: 5349 }, { m: "2024-06", c: 4645 },
    { m: "2024-07", c: 4895 }, { m: "2024-08", c: 4523 }, { m: "2024-09", c: 4717 },
    { m: "2024-10", c: 4546 }, { m: "2024-11", c: 3994 }, { m: "2024-12", c: 3739 },
    { m: "2025-01", c: 4038 }, { m: "2025-02", c: 3825 }, { m: "2025-03", c: 5320 },
    { m: "2025-04", c: 5150 }, { m: "2025-05", c: 5263 }, { m: "2025-06", c: 5024 },
    { m: "2025-07", c: 5065 }, { m: "2025-08", c: 4359 }, { m: "2025-09", c: 4315 },
    { m: "2025-10", c: 4458 }, { m: "2025-11", c: 3727 }, { m: "2025-12", c: 4067 },
  ],

  // SFR trend (new single-family residential permits)
  sfrTrend: [
    { year: 2021, count: 3180 },
    { year: 2022, count: 2579 },
    { year: 2023, count: 1418 },
    { year: 2024, count: 1401 },
    { year: 2025, count: 1764 },
  ],

  // Permit type distribution (all-time)
  permitTypes: [
    { type: "Electrical", count: 95386, color: "#f0944a" },
    { type: "Plumbing", count: 85649, color: "#BF5700" },
    { type: "Building", count: 66156, color: "#c4522e" },
    { type: "Mechanical", count: 58729, color: "#a89e92" },
    { type: "Driveway/Sidewalk", count: 9402, color: "#6b5e52" },
  ],

  // Verified mega-projects
  megaProjects: [
    {
      name: "The Waterline",
      address: "98 Red River St",
      value: 540,
      unit: "M",
      desc: "74-story, 1,021-foot mixed-use tower — hotel, office, residential. The tallest building under construction in Texas.",
      year: 2022,
    },
    {
      name: "Block 185",
      address: "601 W 2nd St",
      value: 300,
      unit: "M",
      desc: "35-story office tower with retail and museum shell. Home to Google's Austin operations.",
      year: 2021,
    },
    {
      name: "The Travis",
      address: "80 Red River St",
      value: 150,
      unit: "M",
      desc: "50-story, 423-unit residential tower with parking garage (721,687 SF).",
      year: 2021,
    },
    {
      name: "Burnet Road Mixed-Use",
      address: "11515 Burnet Rd",
      value: 150,
      unit: "M",
      desc: "14-story mixed-use office and retail with ground-floor commercial.",
      year: 2023,
    },
    {
      name: "West Campus Tower",
      address: "701 W 24th St",
      value: 130,
      unit: "M",
      desc: "29-story mixed-use multi-family near UT campus (702,925 SF).",
      year: 2023,
    },
    {
      name: "East Austin Residences",
      address: "2915 E Cesar Chavez St",
      value: 100,
      unit: "M",
      desc: "Multi-family residential complex with parking garage on East Cesar Chavez corridor.",
      year: 2022,
    },
    {
      name: "SMART Housing Tower",
      address: "2206 Nueces St",
      value: 100,
      unit: "M",
      desc: "24-story multi-family tower, 50% affordable under Austin's SMART Housing program.",
      year: 2022,
    },
    {
      name: "Dell Seton Expansion",
      address: "1500 Red River St",
      value: 99,
      unit: "M",
      desc: "Addition and remodel to existing hospital in the medical district.",
      year: 2022,
    },
  ],

  // Swagit meeting archive
  meetings: {
    totalVideos: 9455,
    bodies: 84,
    yearSpan: 36,
    topBodies: [
      { name: "City Council", count: 459 },
      { name: "Planning Commission", count: 301 },
      { name: "Council Work Session", count: 297 },
      { name: "Zoning & Platting", count: 295 },
      { name: "Housing Finance Corp", count: 199 },
      { name: "Environmental Commission", count: 188 },
      { name: "Audit & Finance", count: 176 },
      { name: "Public Safety", count: 167 },
      { name: "Capital Metro", count: 167 },
      { name: "Water & Wastewater", count: 156 },
    ],
  },

  // Data quality transparency
  dataQuality: {
    outlierThreshold: 100, // millions
    totalOutliers: 159,
    chiconError: {
      address: "1309 Chicon St",
      permits: 6,
      valueEach: 8.1, // billions
      total: 48.6, // billions
      actualProject: "53-unit affordable housing, 5 stories",
    },
  },
};

const SOURCES: Source[] = [
  {
    title: "Issued Construction Permits",
    outlet: "City of Austin Open Data Portal (Socrata)",
    url: "https://data.austintexas.gov/Building-and-Development/Issued-Construction-Permits/3syk-w9eu",
    accessDate: "2026-01-23",
  },
  {
    title: "U.S. Census Bureau QuickFacts: Austin city, Texas",
    outlet: "U.S. Census Bureau",
    url: "https://www.census.gov/quickfacts/fact/table/austincitytexas/PST045224",
    accessDate: "2026-03-03",
  },
  {
    title: "Austin City Government Meeting Archives",
    outlet: "Austin TX Swagit",
    url: "https://austintx.new.swagit.com/",
    accessDate: "2026-02-13",
  },
  {
    title: "Once America's Hottest Housing Market, Austin Is Running in Reverse",
    outlet: "The Wall Street Journal",
    url: "https://www.wsj.com/real-estate/austin-texas-housing-market-cooldown-f0388afb",
    accessDate: "2026-03-03",
  },
  {
    title: "Austin will try again to tame its housing affordability crisis with zoning reforms",
    outlet: "Texas Tribune",
    url: "https://www.texastribune.org/2023/09/19/austin-housing-affordability-zoning/",
    accessDate: "2026-03-03",
  },
  {
    title: "Austin enacts sweeping reforms to cut down housing costs",
    outlet: "Texas Tribune",
    url: "https://www.texastribune.org/2024/05/17/austin-lot-size-housing-affordability/",
    accessDate: "2026-03-03",
  },
  {
    title: "New Private Housing Units Authorized by Building Permits: 1-Unit Structures for Austin MSA",
    outlet: "Federal Reserve Bank of St. Louis (FRED)",
    url: "https://fred.stlouisfed.org/series/AUST448BP1FH",
    accessDate: "2026-03-03",
  },
  {
    title: "HOME Amendments",
    outlet: "City of Austin",
    url: "https://www.austintexas.gov/page/home-amendments",
    accessDate: "2026-03-03",
  },
  {
    title: "American Community Survey 1-Year Estimates: Austin, TX",
    outlet: "Census Reporter / U.S. Census Bureau",
    url: "https://censusreporter.org/profiles/16000US4805000-austin-tx/",
    accessDate: "2026-03-03",
  },
  {
    title: "Economy at a Glance: Austin-Round Rock-Georgetown, TX",
    outlet: "U.S. Bureau of Labor Statistics",
    url: "https://www.bls.gov/eag/eag.tx_austin_msa.htm",
    accessDate: "2026-03-03",
  },
  {
    title: "Austin's Tech Boom Fuels Housing Shortage",
    outlet: "Bloomberg",
    url: "https://www.bloomberg.com/news/features/2023-04-11/austin-texas-tech-boom-fuels-housing-shortage",
    accessDate: "2026-03-03",
  },
  {
    title: "Apple announces plan to build new campus in Austin",
    outlet: "Apple Newsroom",
    url: "https://www.apple.com/newsroom/2018/12/apple-announces-plan-to-build-new-campus-in-austin/",
    accessDate: "2026-03-03",
  },
  {
    title: "Samsung announces $17 billion semiconductor plant in Texas",
    outlet: "KUT Austin (NPR)",
    url: "https://www.kut.org/business/2021-11-24/samsung-picks-taylor-texas-for-17-billion-semiconductor-plant",
    accessDate: "2026-03-03",
  },
];

// ============================================================================
// MAIN ARTICLE
// ============================================================================
export default function AustinBoom() {
  const [scrollY, setScrollY] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="ab-article article-page" data-theme="austin-boom">
      {/* Progress bar */}
      <div className="ab-progress-bar" style={{ width: `${progress}%` }} />

      <HeroSection scrollY={scrollY} />

      <AtAGlance
        stats={[
          { value: DATA.summary.totalPermits.toLocaleString(), label: "Permits Analyzed" },
          { value: `${DATA.summary.declineFromPeak}%`, label: "Decline From Peak" },
          { value: DATA.summary.swagitVideos.toLocaleString(), label: "Government Meetings" },
        ]}
        finding={`Austin issued ${DATA.summary.peakYearCount.toLocaleString()} permits in ${DATA.summary.peakYear}, its peak. By 2025, that number had fallen to ${DATA.summary.currentYearCount.toLocaleString()}—a ${DATA.summary.declineFromPeak}% decline. New single-family home permits fell 55%.`}
      />

      <LedeSection />
      <PeakSection />
      <MoneySection />
      <BuildingTypesSection />
      <MegaProjectsSection />
      <MeetingArchiveSection />
      <ContextSection />

      <MethodologySection
        prefix="ab"
        title="How We Built This Analysis"
        items={[
          {
            label: "Primary Data",
            content: `${DATA.summary.totalPermits.toLocaleString()} issued construction permits from the City of Austin Open Data Portal (Socrata dataset 3syk-w9eu). Data accessed January 23, 2026, covering permits issued from January 2021 through January 2026.`,
          },
          {
            label: "Value Cleaning",
            content: `${DATA.dataQuality.totalOutliers} permits with values exceeding $${DATA.dataQuality.outlierThreshold}M were flagged as outliers. The largest anomaly: ${DATA.dataQuality.chiconError.permits} permits at ${DATA.dataQuality.chiconError.address}, each valued at $${DATA.dataQuality.chiconError.valueEach}B, for a ${DATA.dataQuality.chiconError.actualProject}. Cleaned values exclude all permits above $${DATA.dataQuality.outlierThreshold}M.`,
          },
          {
            label: "Meeting Archive",
            content: `${DATA.meetings.totalVideos.toLocaleString()} video recordings from ${DATA.meetings.bodies} Austin government bodies via austintx.new.swagit.com. Metadata only; transcripts not yet available. Date range: 1990–2026.`,
          },
          {
            label: "Demographics",
            content: `Population and income from U.S. Census Bureau American Community Survey 2024 1-Year Estimates. Employment from BLS via FRED.`,
          },
          {
            label: "Limitations",
            content: "Permit data reflects applications and issuances, not actual construction completion. Dollar values are self-reported by applicants and frequently inaccurate for large projects. The volume story (permit counts) is clean; the value story requires the outlier methodology described above. Building type categorization relies on description text parsing, which may misclassify some permits.",
          },
        ]}
      />

      <SocialShare title="The Boom That Broke" />
      <ArticleEndCTA />
      <SourcesCitations sources={SOURCES} />
      <SubscribeBar />
    </main>
  );
}

// ============================================================================
// HERO SECTION
// ============================================================================
function HeroSection({ scrollY }: { scrollY: number }) {
  const opacity = Math.max(0, 1 - scrollY / 600);
  const translateY = scrollY / 3;

  return (
    <header className="ab-hero">
      <div className="ab-hero-bg">
        <div className="ab-hero-bg-gradient" />
        <div className="ab-hero-bg-grid" style={{ opacity: opacity * 0.15 }} />
      </div>

      <div className="ab-hero-skyline">
        <AustinSkylineSVG />
      </div>

      <div
        className="ab-hero-content"
        style={{ opacity, transform: `translateY(${translateY}px)` }}
      >
        <div className="ab-hero-badge">
          <span className="ab-badge-dot" />
          City Deep Dive
        </div>

        <h1 className="ab-hero-title">
          <span>The Boom</span>
          <br />
          <span className="ab-hero-title-accent">That Broke</span>
        </h1>

        <p className="ab-hero-subtitle">
          {DATA.summary.totalPermits.toLocaleString()} permits.{" "}
          {DATA.summary.swagitVideos.toLocaleString()} government meetings.
          Austin bet everything on growth.
        </p>

        <p className="ab-hero-byline">
          By Sunil Rajaraman &middot; March 2026
        </p>
      </div>

      <div className="ab-scroll-cue" style={{ opacity }}>
        <div className="ab-scroll-line" />
        <span>Scroll to explore</span>
      </div>
    </header>
  );
}

// ============================================================================
// LEDE
// ============================================================================
function LedeSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="ab-editorial-section"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.8s var(--ease-elegant), transform 0.8s var(--ease-elegant)",
      }}
    >
      <div className="ab-body-prose">
        <p>
          In April 2021, Austin issued {DATA.monthlyPermits[3].c.toLocaleString()} construction
          permits in a single month. That is roughly one permit every five minutes and forty
          seconds, around the clock, for thirty days straight. Tesla had just moved its
          headquarters to a{" "}
          <a href="https://www.cnbc.com/2021/12/02/elon-musk-tesla-headquarters-move-to-austin-texas.html" target="_blank" rel="noopener noreferrer">
          $1.1 billion Gigafactory</a> east of the airport.{" "}
          <a href="https://www.kut.org/business/2021-11-24/samsung-picks-taylor-texas-for-17-billion-semiconductor-plant" target="_blank" rel="noopener noreferrer">
          Samsung was weeks away from announcing a $17 billion semiconductor fab</a> in
          nearby Taylor. Oracle had relocated its corporate home from Silicon Valley to Austin's
          lakefront. The cranes were everywhere.
        </p>
        <p>
          Even at this apex, the pressure was already unbearable. At a council meeting that
          same month, a housing advocate named Scott Turner put it bluntly: &ldquo;We're in a housing
          emergency. Doing anything to limit our housing supply during this time is like{" "}
          <strong>throwing gas on the fire of affordability</strong> in our city.&rdquo; He asked the
          council a question that has only gotten sharper since: &ldquo;How many areas in Austin need
          to be completely unaffordable to the vast majority of Austinites before we take this crisis
          more serious?&rdquo;
        </p>
        <p>
          Four years later, the cranes are coming down. Austin issued{" "}
          {DATA.summary.currentYearCount.toLocaleString()} permits in 2025—a{" "}
          {DATA.summary.declineFromPeak}% decline from the {DATA.summary.peakYear} peak.
          New single-family home permits, the bedrock of residential growth, fell from{" "}
          {DATA.sfrTrend[0].count.toLocaleString()} in 2021 to{" "}
          {DATA.sfrTrend[2].count.toLocaleString()} in 2023, a 55% collapse. The cleaned dollar
          value of building permits—after removing obvious data entry errors from the
          city's own records—fell from $21.1 billion in 2022 to $6.8 billion in 2025.
          That is a 68% decline in three years.
        </p>
        <p>
          <a href="https://www.wsj.com/real-estate/austin-texas-housing-market-cooldown-f0388afb" target="_blank" rel="noopener noreferrer">
          The Wall Street Journal called Austin's reversal</a> the most dramatic in the
          country. Home prices fell more than 11% from their 2022 peak, the steepest
          drop of any major metro. But the permit data tells a more granular story than
          prices alone. It reveals exactly when the machine slowed, what stopped getting
          built, and which mega-projects are still rising above a city that has, for now,
          stopped expanding at the pace that made it famous.
        </p>
      </div>
    </section>
  );
}

// ============================================================================
// THE PEAK — Animated monthly timeline
// ============================================================================
function PeakSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });
  const maxCount = Math.max(...DATA.monthlyPermits.map((d) => d.c));

  return (
    <section ref={ref} className="ab-wide-section">
      <div className="ab-section-header" style={{ maxWidth: 720, margin: "0 auto", padding: "0 1.5rem" }}>
        <span className="ab-section-number">01</span>
        <h2 className="ab-section-title">The Peak</h2>
      </div>

      <div className="ab-editorial-section" style={{ paddingTop: "1rem" }}>
        <div className="ab-body-prose">
          <p>
            The chart below shows every month of Austin's construction cycle from
            January 2021 through December 2025—sixty months of permits. The mountain
            in early 2021 is unmistakable: {DATA.monthlyPermits[3].c.toLocaleString()} permits
            in April, {DATA.monthlyPermits[2].c.toLocaleString()} in March. By late 2024,
            the monthly count had settled around 4,000—4,500—a plateau roughly 40%
            below the peak months.
          </p>
        </div>
      </div>

      <div className="ab-editorial-section" style={{ paddingTop: 0 }}>
        <div className="ab-body-prose">
          <p>
            Jeremy Hendricks, a representative of the Laborers' International Union and president
            of the Windsor Hills Neighborhood Association, captured the bitter irony of the boom
            at the{" "}
            <a href="https://austintx.new.swagit.com/videos/283723" target="_blank" rel="noopener noreferrer">
            December 7, 2023 city council hearing on the HOME initiative</a>.
          </p>
        </div>
        <PullQuote
          text="I represent construction workers who build this booming city. But sadly, our members are unable to afford to live in this city they proudly work to build and maintain. We're losing the beating heart of our community when we lose our teachers, our firefighters, our EMS workers, our healthcare workers, our construction workers."
          city="Austin"
          state="TX"
          className="ab-pull-quote"
        />
      </div>

      <div className="ab-chart-wrap">
        <div className="ab-chart-title">Monthly Permits Issued, 2021–2025</div>
        <svg viewBox="0 0 900 280" className="ab-bar-chart">
          {DATA.monthlyPermits.map((d, i) => {
            const barHeight = (d.c / maxCount) * 200;
            const x = i * 14.5 + 20;
            const isHighlight = d.m === "2021-04";
            const year = d.m.slice(0, 4);
            const prevYear = i > 0 ? DATA.monthlyPermits[i - 1].m.slice(0, 4) : "";
            const yearColor = year <= "2022" ? "#BF5700" : "#a89e92";

            return (
              <g key={d.m}>
                <rect
                  x={x}
                  y={260 - barHeight}
                  width={11}
                  height={isVisible ? barHeight : 0}
                  rx={2}
                  fill={isHighlight ? "#BF5700" : yearColor}
                  opacity={isHighlight ? 1 : 0.6}
                  style={{
                    transition: `height 0.6s var(--ease-elegant) ${i * 15}ms, y 0.6s var(--ease-elegant) ${i * 15}ms`,
                  }}
                />
                {/* Year labels at January */}
                {d.m.endsWith("-01") && (
                  <text x={x + 5} y={275} textAnchor="middle" fontSize="10" fill="#a89e92"
                    fontFamily="var(--font-sans)">
                    {year}
                  </text>
                )}
                {/* Peak label */}
                {isHighlight && isVisible && (
                  <text x={x + 5} y={260 - barHeight - 8} textAnchor="middle" fontSize="10"
                    fontWeight="600" fill="#BF5700" fontFamily="var(--font-sans)">
                    {d.c.toLocaleString()}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        <div className="ab-chart-subtitle">
          Source: City of Austin Open Data Portal. Each bar represents one month of issued permits across all types.
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// THE MONEY — Raw vs. cleaned values with toggle
// ============================================================================
function MoneySection() {
  const [showCleaned, setShowCleaned] = useState(false);
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const data = DATA.yearlyBuildingPermits;
  const maxVal = Math.max(...data.map((d) => (showCleaned ? d.cleanedValue : d.rawValue)));

  return (
    <section ref={ref} className="ab-wide-section">
      <div className="ab-section-header" style={{ maxWidth: 720, margin: "0 auto", padding: "0 1.5rem" }}>
        <span className="ab-section-number">02</span>
        <h2 className="ab-section-title">The Money</h2>
      </div>

      <div className="ab-editorial-section" style={{ paddingTop: "1rem" }}>
        <div className="ab-body-prose">
          <p>
            The dollar story is muddier. Austin's open data portal reports $66.8 billion
            in building permit values for 2023 alone—a staggering figure that would make
            Austin one of the most active construction markets on Earth. Except $48.6 billion
            of it came from six data entry errors at a single address.
          </p>
          <p>
            Six permits for a 53-unit affordable housing project at{" "}
            <strong>{DATA.dataQuality.chiconError.address}</strong> were each valued at $
            {DATA.dataQuality.chiconError.valueEach} billion. The actual project, a five-story
            building under Austin's Affordability Unlocked program, is worth perhaps $20–30
            million total. This matters because transparent data journalism requires showing
            the reader exactly what was done with the numbers. Toggle between the raw and cleaned
            values below.
          </p>
        </div>
      </div>

      <div className="ab-chart-wrap">
        <div className="ab-toggle-wrap">
          <button
            className={`ab-toggle ${showCleaned ? "active" : ""}`}
            onClick={() => setShowCleaned(!showCleaned)}
            aria-label="Toggle cleaned values"
          >
            <span className="ab-toggle-knob" />
          </button>
          <span className="ab-toggle-label">
            {showCleaned ? "Cleaned values (outliers removed)" : "Raw values (as reported)"}
          </span>
        </div>

        <div className="ab-chart-title">
          Building Permit Values by Year ({showCleaned ? "Cleaned" : "Raw"})
        </div>
        <svg viewBox="0 0 600 240">
          {data.map((d, i) => {
            const val = showCleaned ? d.cleanedValue : d.rawValue;
            const barHeight = maxVal > 0 ? (val / maxVal) * 180 : 0;
            const x = i * 110 + 40;
            const isSpike = !showCleaned && d.year === 2023;

            return (
              <g key={d.year}>
                <rect
                  x={x}
                  y={210 - (isVisible ? barHeight : 0)}
                  width={60}
                  height={isVisible ? barHeight : 0}
                  rx={4}
                  fill={isSpike ? "#ef4444" : "#BF5700"}
                  opacity={isSpike ? 0.9 : 0.7}
                  style={{ transition: "all 0.6s var(--ease-elegant)" }}
                />
                <text x={x + 30} y={225} textAnchor="middle" fontSize="12" fill="#a89e92"
                  fontFamily="var(--font-sans)">
                  {d.year}
                </text>
                {isVisible && (
                  <text
                    x={x + 30}
                    y={210 - barHeight - 6}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="600"
                    fill={isSpike ? "#ef4444" : "#BF5700"}
                    fontFamily="var(--font-sans)"
                  >
                    ${val.toFixed(1)}B
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {!showCleaned && (
          <div className="ab-disclaimer">
            <strong>Data quality note:</strong> The 2023 raw value of $66.8B includes $48.6B
            from {DATA.dataQuality.chiconError.permits} erroneous permits at{" "}
            {DATA.dataQuality.chiconError.address}. Toggle to &ldquo;Cleaned&rdquo; to see values
            with outliers above ${DATA.dataQuality.outlierThreshold}M removed.
          </div>
        )}
        <div className="ab-chart-subtitle">
          Source: City of Austin Open Data Portal. Building permits only. Values are self-reported by applicants.
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// WHAT WAS BEING BUILT — SFR collapse
// ============================================================================
function BuildingTypesSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section ref={ref} className="ab-wide-section">
      <div className="ab-section-header" style={{ maxWidth: 720, margin: "0 auto", padding: "0 1.5rem" }}>
        <span className="ab-section-number">03</span>
        <h2 className="ab-section-title">What Stopped Getting Built</h2>
      </div>

      <div className="ab-editorial-section" style={{ paddingTop: "1rem" }}>
        <div className="ab-body-prose">
          <p>
            The sharpest contraction hit single-family homes. Austin permitted{" "}
            {DATA.sfrTrend[0].count.toLocaleString()} new single-family residences in 2021.
            By 2023, that number had cratered to {DATA.sfrTrend[2].count.toLocaleString()}—a
            55% decline in two years. A modest rebound to {DATA.sfrTrend[4].count.toLocaleString()}{" "}
            in 2025 suggests the floor has been found, but at a level 45% below the boom's peak.
          </p>
          <p>
            <a href="https://fred.stlouisfed.org/series/AUST448BP1FH" target="_blank" rel="noopener noreferrer">
            Federal Reserve data</a> confirms the pattern at the metropolitan level: single-family
            building permits across the Austin-Round Rock-Georgetown MSA peaked in early 2021 and
            have not recovered. The December 2025 figure of 1,025 units per month is roughly half
            the boom-era pace.
          </p>
          <p>
            Austin's city council, meanwhile, moved in the opposite direction. In{" "}
            <a href="https://austintx.new.swagit.com/videos/283723" target="_blank" rel="noopener noreferrer">
            a 13-hour special session on December 7, 2023</a>, council adopted the{" "}
            <a href="https://www.austintexas.gov/page/home-amendments" target="_blank" rel="noopener noreferrer">
            HOME (Home Options for Mobility and Equity) initiative</a>, allowing up to three homes on
            most single-family lots.{" "}
            <a href="https://www.texastribune.org/2024/05/17/austin-lot-size-housing-affordability/" target="_blank" rel="noopener noreferrer">
            Phase 2, adopted May 2024</a>, cut the minimum lot size from 5,750 to 1,800 square feet.
            Applications in newly eligible zones jumped 86% in the first year. The vote
            was 9-2, with only council members Kelly and Allison Alter dissenting. The meeting
            adjourned at 11:16 PM.
          </p>
          <p>
            The debate that preceded the vote laid bare the generational cost of Austin's housing
            market. At the May 2024 Phase 2 hearing, a fourth-generation Austinite named Ella Thompson
            told the council her family's story was ending:
          </p>
        </div>
        <PullQuote
          text="I was born and raised in central Austin, and I'm a fourth generation Austinite. I don't think my children will be fifth generation Austinites. This is the end of the line for my family. On the street I grew up, only one other family is still there. The rest have moved away and their homes have been bulldozed."
          city="Austin"
          state="TX"
          className="ab-pull-quote"
        />
        <div className="ab-body-prose">
          <p>
            At the same podium five months earlier, Lan Ani had reframed the entire debate
            in a single sentence. His parents had immigrated as refugees after being expelled from
            Africa. Their first home in America was a duplex they rented. &ldquo;A duplex is a home,&rdquo;
            he told the council. &ldquo;A triplex is a home. An apartment is a home. A single family
            is a home. <strong>A home is a home is a home.</strong>&rdquo; He asked: if his family arrived
            today as refugees, could they find a home in Austin? The zoning reform is real; the
            question is whether demand will follow supply in a cooling market.
          </p>
        </div>
      </div>

      <div className="ab-chart-wrap">
        <div className="ab-chart-title">New Single-Family Permits by Year</div>
        <svg viewBox="0 0 600 220">
          {DATA.sfrTrend.map((d, i) => {
            const maxSfr = Math.max(...DATA.sfrTrend.map((s) => s.count));
            const barHeight = (d.count / maxSfr) * 150;
            const x = i * 110 + 40;
            const isDrop = d.year === 2023;

            return (
              <g key={d.year}>
                <rect
                  x={x}
                  y={190 - (isVisible ? barHeight : 0)}
                  width={60}
                  height={isVisible ? barHeight : 0}
                  rx={4}
                  fill={isDrop ? "#ef4444" : "#BF5700"}
                  opacity={isDrop ? 0.9 : 0.65}
                  style={{ transition: `all 0.6s var(--ease-elegant) ${i * 100}ms` }}
                />
                <text x={x + 30} y={205} textAnchor="middle" fontSize="12" fill="#a89e92"
                  fontFamily="var(--font-sans)">
                  {d.year}
                </text>
                {isVisible && (
                  <text x={x + 30} y={190 - barHeight - 6} textAnchor="middle" fontSize="11"
                    fontWeight="600" fill={isDrop ? "#ef4444" : "#BF5700"}
                    fontFamily="var(--font-sans)">
                    {d.count.toLocaleString()}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        <div className="ab-chart-subtitle">
          Source: City of Austin Open Data Portal. Building permits with descriptions matching new single-family construction.
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// MEGA-PROJECTS — Card grid
// ============================================================================
function MegaProjectsSection() {
  return (
    <section className="ab-wide-section">
      <div className="ab-section-header" style={{ maxWidth: 720, margin: "0 auto", padding: "0 1.5rem" }}>
        <span className="ab-section-number">04</span>
        <h2 className="ab-section-title">The Skyline</h2>
      </div>

      <div className="ab-editorial-section" style={{ paddingTop: "1rem" }}>
        <div className="ab-body-prose">
          <p>
            Even as residential permits fell, Austin's skyline continued to transform. The
            Waterline at 98 Red River Street, a $540 million, 74-story mixed-use tower combining
            hotel, office, and residential space, will stand 1,021 feet tall—the tallest
            building under construction in Texas. Block 185 at 601 West 2nd Street, a $300
            million, 35-story office tower now home to Google's Austin operations, was one
            of 2021's marquee permits. The Travis, a 50-story, 423-unit residential tower
            on Red River, broke ground the same year.
          </p>
          <p>
            These projects tell a story of confidence that predates the slowdown. Most were
            permitted in 2021 and 2022, financed at lower interest rates, and designed for a
            city that was adding population at 21.7% per decade. Whether the demand materializes
            at the pace their developers projected remains an open question.
          </p>
        </div>
      </div>

      <div className="ab-mega-grid">
        {DATA.megaProjects.map((project) => (
          <MegaProjectCard key={project.address} project={project} />
        ))}
      </div>
    </section>
  );
}

function MegaProjectCard({
  project,
}: {
  project: (typeof DATA.megaProjects)[number];
}) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <div ref={ref} className={`ab-mega-card ${isVisible ? "visible" : ""}`}>
      <div className="ab-mega-card-value">
        ${project.value}
        {project.unit}
      </div>
      <div className="ab-mega-card-name">{project.name}</div>
      <div className="ab-mega-card-desc">{project.desc}</div>
      <div className="ab-mega-card-meta">
        {project.address} &middot; Permitted {project.year}
      </div>
    </div>
  );
}

// ============================================================================
// MEETING ARCHIVE — 9,455 videos, 84 bodies
// ============================================================================
function MeetingArchiveSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section ref={ref} className="ab-wide-section">
      <div className="ab-section-header" style={{ maxWidth: 720, margin: "0 auto", padding: "0 1.5rem" }}>
        <span className="ab-section-number">05</span>
        <h2 className="ab-section-title">Behind Closed Doors</h2>
      </div>

      <div className="ab-editorial-section" style={{ paddingTop: "1rem" }}>
        <div className="ab-body-prose">
          <p>
            Austin records its government meetings with an institutional depth uncommon for
            a city its size. The{" "}
            <a href="https://austintx.new.swagit.com/" target="_blank" rel="noopener noreferrer">
            Swagit video archive</a> contains{" "}
            {DATA.meetings.totalVideos.toLocaleString()} recordings from {DATA.meetings.bodies}{" "}
            distinct government bodies spanning {DATA.meetings.yearSpan} years—the earliest
            dates to June 1990. The City Council alone has {DATA.meetings.topBodies[0].count}{" "}
            recorded sessions. The Planning Commission, which approved many of the mega-projects
            that reshaped Austin's skyline, has {DATA.meetings.topBodies[1].count}.
          </p>
          <p>
            We analyzed transcripts from three key meetings to understand what these numbers
            sound like when they become policy. The{" "}
            <a href="https://austintx.new.swagit.com/videos/283723" target="_blank" rel="noopener noreferrer">
            December 7, 2023 HOME Phase 1 hearing</a>—the single most consequential zoning
            vote in Austin's recent history—ran 13 hours and 16 minutes. Hundreds of residents
            lined up at two podiums to testify. The debate exposed a city at war with itself
            over whether density is salvation or destruction.
          </p>
          <p>
            Karen Fernandez, president of the Matthews Lane Neighborhood Association, spoke
            for many longtime residents when she confronted the council directly:
          </p>
        </div>
        <PullQuote
          text="Every one of you who votes for this ordinance as is should be ashamed of yourselves. The teachers, artists, healthcare service workers and tradesmen who built Austin have been moved out and their modest homes bulldozed to be replaced by soulless boxes. Many of them simply investments for the money class, not a forever home for a family."
          city="Austin"
          state="TX"
          className="ab-pull-quote"
        />
        <div className="ab-body-prose">
          <p>
            The breadth of the archive matters beyond any single debate. Austin's government
            operates through dozens of specialized bodies—Environmental Commission, Housing
            Finance Corporation, Water and Wastewater Commission, Capital Metro—each with
            its own recorded deliberations. Every zoning variance, every affordable housing
            allocation, every transit expansion was debated on camera. The archive is a 36-year
            institutional memory of how a mid-sized state capital decided to become one of
            America's fastest-growing cities.
          </p>
        </div>
      </div>

      {/* Swagit Video Embed */}
      <div className="ab-editorial-section" style={{ paddingTop: 0 }}>
        <div className="ab-video-embed">
          <div className="ab-video-embed-frame">
            <iframe
              src="https://austintx.new.swagit.com/videos/283723/embed"
              title="Dec 7, 2023 — Special City Council: HOME Phase 1"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ width: "100%", height: "100%", border: "none" }}
            />
          </div>
          <div className="ab-video-embed-meta">
            <div className="ab-video-embed-title">
              <span className="ab-badge-dot" />{" "}
              Special City Council — HOME Phase 1
            </div>
            <div className="ab-video-embed-info">
              December 7, 2023 &middot; 13h 18m &middot; 9-2 vote at 11:16 PM
            </div>
            <a
              href="https://austintx.new.swagit.com/videos/283723"
              target="_blank"
              rel="noopener noreferrer"
              className="ab-video-embed-link"
            >
              Watch full meeting on Austin TX Swagit →
            </a>
          </div>
        </div>
      </div>

      <div
        className="ab-archive-stats"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s var(--ease-elegant)",
          padding: "0 1.5rem",
        }}
      >
        <div className="ab-archive-stat">
          <div className="ab-archive-stat-value">
            {DATA.meetings.totalVideos.toLocaleString()}
          </div>
          <div className="ab-archive-stat-label">Recorded Meetings</div>
        </div>
        <div className="ab-archive-stat">
          <div className="ab-archive-stat-value">{DATA.meetings.bodies}</div>
          <div className="ab-archive-stat-label">Government Bodies</div>
        </div>
        <div className="ab-archive-stat">
          <div className="ab-archive-stat-value">{DATA.meetings.yearSpan}</div>
          <div className="ab-archive-stat-label">Years of Records</div>
        </div>
      </div>

      <div className="ab-chart-wrap" style={{ marginTop: "2rem" }}>
        <div className="ab-chart-title">Top Government Bodies by Recorded Meetings</div>
        <svg viewBox="0 0 700 320">
          {DATA.meetings.topBodies.map((body, i) => {
            const maxCount = DATA.meetings.topBodies[0].count;
            const barWidth = (body.count / maxCount) * 380;

            return (
              <g key={body.name}>
                <text
                  x="195"
                  y={i * 30 + 22}
                  textAnchor="end"
                  fontSize="11"
                  fill="#a89e92"
                  fontFamily="var(--font-sans)"
                >
                  {body.name}
                </text>
                <rect
                  x={200}
                  y={i * 30 + 8}
                  width={isVisible ? barWidth : 0}
                  height={20}
                  rx={3}
                  fill="#BF5700"
                  opacity={0.5 + (i < 3 ? 0.3 : 0)}
                  style={{
                    transition: `width 0.8s var(--ease-elegant) ${i * 60}ms`,
                  }}
                />
                {isVisible && (
                  <text
                    x={200 + barWidth + 8}
                    y={i * 30 + 22}
                    fontSize="11"
                    fontWeight="600"
                    fill="#BF5700"
                    fontFamily="var(--font-sans)"
                  >
                    {body.count}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        <div className="ab-chart-subtitle">
          Source: Austin TX Swagit meeting archive. Accessed February 13, 2026.
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// CONTEXT — External reporting synthesis
// ============================================================================
function ContextSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="ab-editorial-section"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.8s var(--ease-elegant), transform 0.8s var(--ease-elegant)",
      }}
    >
      <div className="ab-section-header">
        <span className="ab-section-number">06</span>
        <h2 className="ab-section-title">The Other Side</h2>
      </div>

      <div className="ab-body-prose">
        <p>
          The decline in permits does not necessarily signal distress.{" "}
          <a href="https://www.bls.gov/eag/eag.tx_austin_msa.htm" target="_blank" rel="noopener noreferrer">
          Austin's unemployment rate</a> stands at 3.6% as of November 2025, and the metro added
          nonfarm jobs every month through the fall. The population of the Austin-Round
          Rock-Georgetown metro area reached an estimated{" "}
          {(DATA.summary.metroPop / 1e6).toFixed(1)} million in 2024,{" "}
          <a href="https://censusreporter.org/profiles/16000US4805000-austin-tx/" target="_blank" rel="noopener noreferrer">
          up 11.7% from the 2020 Census</a>. Median household income is $
          {DATA.summary.medianIncome.toLocaleString()}, well above the national figure.
          Austin is not collapsing; it is cooling from a temperature that was, by the data's
          own evidence, unsustainable.
        </p>
        <p>
          The more plausible reading of the permit data is that 2021–2022 represented an
          anomaly—a convergence of near-zero interest rates, pandemic-era corporate
          relocations, and a city whose zoning code had constrained supply for decades.{" "}
          <a href="https://www.kut.org/business/2021-11-24/samsung-picks-taylor-texas-for-17-billion-semiconductor-plant" target="_blank" rel="noopener noreferrer">
          Samsung</a>,{" "}
          <a href="https://www.cnbc.com/2021/12/02/elon-musk-tesla-headquarters-move-to-austin-texas.html" target="_blank" rel="noopener noreferrer">
          Tesla</a>,{" "}
          <a href="https://www.apple.com/newsroom/2018/12/apple-announces-plan-to-build-new-campus-in-austin/" target="_blank" rel="noopener noreferrer">
          Apple</a>, Oracle, and Meta all expanded simultaneously. The current
          pace of roughly 55,000 annual permits, while 23% below the peak, may be closer to
          what a city of nearly one million can absorb. Whether Austin's $571,000 median
          home value—itself 5% below its peak—continues to fall depends less on
          permits than on mortgage rates and the trajectory of tech employment.
        </p>

        <PullQuote
          text="The Sunbelt city that came to symbolize the pandemic housing boom is now leading a national property cool-down."
          city="Austin"
          state="TX"
          className="ab-pull-quote"
        />

        <p>
          The city council's{" "}
          <a href="https://www.austintexas.gov/page/home-amendments" target="_blank" rel="noopener noreferrer">
          HOME initiative</a> is a deliberate bet that density can solve what the market
          cannot. The first phase allowed three homes on single-family lots; the second cut
          the minimum lot size to 1,800 square feet. Applications jumped 86% in the first year.
          The reform sits at the intersection of Austin's two defining tensions: the desire
          to grow and the fear of what growth costs. The permit data captures the construction;
          the {DATA.meetings.totalVideos.toLocaleString()} archived government meetings capture
          the deliberation.
        </p>
        <p>
          Together, they form the most comprehensive public record of any American city's
          attempt to build its way to a different future.
        </p>
      </div>
    </section>
  );
}

// ============================================================================
// AUSTIN SKYLINE SVG — Hero illustration
// ============================================================================
function AustinSkylineSVG() {
  return (
    <svg viewBox="0 0 1200 400" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
      <defs>
        {/* Building gradient — burnt orange to dark base */}
        <linearGradient id="atx-bldg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BF5700" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#c45a30" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#252019" stopOpacity="0.4" />
        </linearGradient>
        {/* Background buildings — darker, receded */}
        <linearGradient id="atx-bldgDark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1c1712" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#252019" stopOpacity="0.35" />
        </linearGradient>
        {/* Hill country gradient */}
        <linearGradient id="atx-hill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BF5700" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#c45a30" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#252019" stopOpacity="0.06" />
        </linearGradient>
        {/* Lady Bird Lake water */}
        <linearGradient id="atx-water" x1="0" y1="0" x2="100%" y2="0">
          <stop offset="0%" stopColor="#2a6496" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#3a7ab5" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#2a6496" stopOpacity="0.1" />
        </linearGradient>
        {/* Water shimmer — vertical for reflection */}
        <linearGradient id="atx-waterShimmer" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a9ac5" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#2a6496" stopOpacity="0.03" />
        </linearGradient>
        {/* Data bar gradient — permit decline visualization */}
        <linearGradient id="atx-dataBar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#BF5700" stopOpacity="0.03" />
          <stop offset="50%" stopColor="#BF5700" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#f0944a" stopOpacity="0.55" />
        </linearGradient>
        {/* Data bar gradient — decline/red */}
        <linearGradient id="atx-dataRed" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.03" />
          <stop offset="50%" stopColor="#ef4444" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0.5" />
        </linearGradient>
        {/* Glow filter for data points and lights */}
        <filter id="atx-glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Subtle glow for Capitol dome */}
        <filter id="atx-domeGlow">
          <feGaussianBlur stdDeviation="6" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ===== LAYER 1: Hill Country silhouette (far background) ===== */}
      <path d="M0,260 Q60,210 150,235 Q220,195 340,225 Q430,185 540,215 Q650,175 760,205 Q850,170 940,195 Q1020,160 1100,185 Q1160,170 1200,190 L1200,340 L0,340Z" fill="url(#atx-hill)" />
      <path d="M0,285 Q100,255 220,270 Q340,250 460,265 Q580,245 700,260 Q820,240 940,255 Q1060,240 1150,250 Q1180,245 1200,250 L1200,340 L0,340Z" fill="url(#atx-hill)" />

      {/* ===== LAYER 2: Ground glow ===== */}
      <ellipse cx="600" cy="370" rx="500" ry="60" fill="#BF5700" opacity="0.04" />

      {/* ===== LAYER 3: Data viz — permit decline bar chart (left edge) ===== */}
      <g transform="translate(30, 0)">
        <rect x="0" y="280" width="7" height="55" fill="url(#atx-dataBar)" rx="1" />
        <rect x="12" y="265" width="7" height="70" fill="url(#atx-dataBar)" rx="1" />
        <rect x="24" y="250" width="7" height="85" fill="url(#atx-dataBar)" rx="1" />
        <rect x="36" y="260" width="7" height="75" fill="url(#atx-dataBar)" rx="1" />
        <rect x="48" y="278" width="7" height="57" fill="url(#atx-dataBar)" rx="1" />
        <rect x="60" y="295" width="7" height="40" fill="url(#atx-dataRed)" rx="1" />
        <rect x="72" y="305" width="7" height="30" fill="url(#atx-dataRed)" rx="1" />
        <rect x="84" y="312" width="7" height="23" fill="url(#atx-dataRed)" rx="1" />
      </g>

      {/* ===== LAYER 4: Small buildings far left ===== */}
      <rect x="120" y="250" width="28" height="90" rx="2" fill="url(#atx-bldgDark)" opacity="0.5" />
      <rect x="122" y="260" width="6" height="8" rx="1" fill="#BF5700" opacity="0.12" />
      <rect x="134" y="260" width="6" height="8" rx="1" fill="#BF5700" opacity="0.12" />
      <rect x="122" y="275" width="6" height="8" rx="1" fill="#BF5700" opacity="0.08" />
      <rect x="134" y="275" width="6" height="8" rx="1" fill="#BF5700" opacity="0.08" />

      <rect x="155" y="265" width="22" height="75" rx="2" fill="#252019" opacity="0.35" />
      <rect x="157" y="275" width="5" height="6" rx="1" fill="#BF5700" opacity="0.1" />
      <rect x="165" y="275" width="5" height="6" rx="1" fill="#BF5700" opacity="0.1" />

      {/* ===== LAYER 5: Texas State Capitol — detailed dome and columns ===== */}
      <g transform="translate(220, 0)">
        {/* Subtle glow behind dome */}
        <ellipse cx="80" cy="180" rx="90" ry="120" fill="#BF5700" opacity="0.04" filter="url(#atx-domeGlow)" />

        {/* Main building body */}
        <rect x="15" y="200" width="130" height="140" rx="3" fill="url(#atx-bldg)" opacity="0.65" />

        {/* Central portico — protruding entrance */}
        <rect x="40" y="195" width="80" height="145" rx="2" fill="url(#atx-bldg)" opacity="0.75" />

        {/* Triangular pediment */}
        <polygon points="80,170 35,198 125,198" fill="#BF5700" opacity="0.5" />
        <polygon points="80,176 42,196 118,196" fill="none" stroke="#f0944a" strokeWidth="0.8" opacity="0.3" />

        {/* Columns — six classical columns */}
        <rect x="45" y="198" width="5" height="68" fill="#BF5700" opacity="0.45" />
        <rect x="57" y="198" width="5" height="68" fill="#BF5700" opacity="0.45" />
        <rect x="69" y="198" width="5" height="68" fill="#BF5700" opacity="0.45" />
        <rect x="81" y="198" width="5" height="68" fill="#BF5700" opacity="0.45" />
        <rect x="93" y="198" width="5" height="68" fill="#BF5700" opacity="0.45" />
        <rect x="105" y="198" width="5" height="68" fill="#BF5700" opacity="0.45" />

        {/* Column capitals */}
        <rect x="43" y="196" width="9" height="3" fill="#f0944a" opacity="0.35" />
        <rect x="55" y="196" width="9" height="3" fill="#f0944a" opacity="0.35" />
        <rect x="67" y="196" width="9" height="3" fill="#f0944a" opacity="0.35" />
        <rect x="79" y="196" width="9" height="3" fill="#f0944a" opacity="0.35" />
        <rect x="91" y="196" width="9" height="3" fill="#f0944a" opacity="0.35" />
        <rect x="103" y="196" width="9" height="3" fill="#f0944a" opacity="0.35" />

        {/* Dome base / rotunda drum */}
        <rect x="45" y="143" width="70" height="30" rx="2" fill="url(#atx-bldg)" opacity="0.7" />
        {/* Drum windows */}
        <rect x="53" y="148" width="4" height="10" rx="2" fill="#1c1712" opacity="0.35" />
        <rect x="63" y="148" width="4" height="10" rx="2" fill="#1c1712" opacity="0.35" />
        <rect x="73" y="148" width="4" height="10" rx="2" fill="#1c1712" opacity="0.35" />
        <rect x="83" y="148" width="4" height="10" rx="2" fill="#1c1712" opacity="0.35" />
        <rect x="93" y="148" width="4" height="10" rx="2" fill="#1c1712" opacity="0.35" />
        {/* Cornice line between drum and dome */}
        <rect x="43" y="141" width="74" height="3" fill="#f0944a" opacity="0.4" />

        {/* Dome — two arcs for dimension */}
        <path d="M48,145 Q80,90 112,145" fill="url(#atx-bldg)" opacity="0.75" />
        <path d="M50,145 Q80,95 110,145" fill="none" stroke="#f0944a" strokeWidth="0.8" opacity="0.3" />
        {/* Dome ribs */}
        <line x1="65" y1="143" x2="72" y2="100" stroke="#f0944a" strokeWidth="0.5" opacity="0.25" />
        <line x1="80" y1="143" x2="80" y2="95" stroke="#f0944a" strokeWidth="0.5" opacity="0.25" />
        <line x1="95" y1="143" x2="88" y2="100" stroke="#f0944a" strokeWidth="0.5" opacity="0.25" />

        {/* Lantern (small cupola atop dome) */}
        <rect x="74" y="90" width="12" height="14" rx="1" fill="#BF5700" opacity="0.65" />
        {/* Lantern dome */}
        <path d="M74,92 Q80,82 86,92" fill="#f0944a" opacity="0.6" />

        {/* Spire and Goddess of Liberty */}
        <rect x="78" y="65" width="4" height="20" fill="#f0944a" opacity="0.55" />
        <circle cx="80" cy="60" r="4" fill="#f0944a" opacity="0.6" />
        {/* Star on top */}
        <polygon points="80,53 81.5,57 85,57 82,59.5 83.5,63 80,61 76.5,63 78,59.5 75,57 78.5,57" fill="#f0944a" opacity="0.7" />

        {/* Wing windows — left */}
        <rect x="20" y="215" width="10" height="14" rx="1" fill="#1c1712" opacity="0.25" />
        <rect x="20" y="240" width="10" height="14" rx="1" fill="#1c1712" opacity="0.2" />
        <rect x="20" y="265" width="10" height="14" rx="1" fill="#1c1712" opacity="0.15" />
        {/* Wing windows — right */}
        <rect x="130" y="215" width="10" height="14" rx="1" fill="#1c1712" opacity="0.25" />
        <rect x="130" y="240" width="10" height="14" rx="1" fill="#1c1712" opacity="0.2" />
        <rect x="130" y="265" width="10" height="14" rx="1" fill="#1c1712" opacity="0.15" />

        {/* Steps at base */}
        <rect x="10" y="338" width="140" height="3" fill="#BF5700" opacity="0.2" />
        <rect x="13" y="342" width="134" height="2.5" fill="#BF5700" opacity="0.14" />
        <rect x="16" y="346" width="128" height="2" fill="#BF5700" opacity="0.1" />
      </g>

      {/* ===== LAYER 6: The Independent ("Jenga Tower") — stacked rotating blocks ===== */}
      <g transform="translate(435, 0)">
        {/* Core shaft */}
        <rect x="8" y="55" width="40" height="285" rx="2" fill="url(#atx-bldgDark)" opacity="0.7" />

        {/* Stacked rotating blocks — the signature Jenga offset */}
        <rect x="4" y="55" width="48" height="22" rx="1" fill="url(#atx-bldg)" opacity="0.65" />
        <rect x="10" y="77" width="48" height="22" rx="1" fill="url(#atx-bldg)" opacity="0.6" />
        <rect x="2" y="99" width="48" height="22" rx="1" fill="url(#atx-bldg)" opacity="0.55" />
        <rect x="12" y="121" width="48" height="22" rx="1" fill="url(#atx-bldg)" opacity="0.5" />
        <rect x="0" y="143" width="48" height="22" rx="1" fill="url(#atx-bldg)" opacity="0.48" />
        <rect x="8" y="165" width="48" height="22" rx="1" fill="url(#atx-bldg)" opacity="0.45" />
        <rect x="3" y="187" width="48" height="22" rx="1" fill="url(#atx-bldg)" opacity="0.42" />
        <rect x="11" y="209" width="48" height="22" rx="1" fill="url(#atx-bldg)" opacity="0.38" />
        <rect x="5" y="231" width="48" height="22" rx="1" fill="url(#atx-bldg)" opacity="0.35" />
        <rect x="10" y="253" width="48" height="22" rx="1" fill="url(#atx-bldg)" opacity="0.32" />

        {/* Window lights on blocks */}
        <rect x="16" y="62" width="4" height="5" rx="1" fill="#f0944a" opacity="0.2" />
        <rect x="28" y="62" width="4" height="5" rx="1" fill="#f0944a" opacity="0.2" />
        <rect x="40" y="62" width="4" height="5" rx="1" fill="#f0944a" opacity="0.15" />
        <rect x="22" y="84" width="4" height="5" rx="1" fill="#f0944a" opacity="0.18" />
        <rect x="34" y="84" width="4" height="5" rx="1" fill="#f0944a" opacity="0.18" />
        <rect x="46" y="84" width="4" height="5" rx="1" fill="#f0944a" opacity="0.13" />
        <rect x="14" y="106" width="4" height="5" rx="1" fill="#f0944a" opacity="0.15" />
        <rect x="26" y="106" width="4" height="5" rx="1" fill="#f0944a" opacity="0.15" />
      </g>

      {/* ===== LAYER 7: Frost Bank Tower — owl-shaped crown ===== */}
      <g transform="translate(530, 0)">
        {/* Main shaft */}
        <rect x="5" y="100" width="38" height="240" rx="2" fill="url(#atx-bldgDark)" opacity="0.65" />

        {/* Distinctive crown — the "owl eyes" faceted top */}
        <polygon points="24,48 5,100 43,100" fill="url(#atx-bldg)" opacity="0.7" />
        {/* Inner facets creating the owl face */}
        <line x1="24" y1="48" x2="15" y2="82" stroke="#f0944a" strokeWidth="0.8" opacity="0.3" />
        <line x1="24" y1="48" x2="33" y2="82" stroke="#f0944a" strokeWidth="0.8" opacity="0.3" />
        {/* "Eyes" — two circular windows near crown */}
        <circle cx="16" cy="80" r="4" fill="#1c1712" opacity="0.35" />
        <circle cx="32" cy="80" r="4" fill="#1c1712" opacity="0.35" />
        {/* Crown ridge lines */}
        <line x1="5" y1="100" x2="24" y2="60" stroke="#f0944a" strokeWidth="0.5" opacity="0.2" />
        <line x1="43" y1="100" x2="24" y2="60" stroke="#f0944a" strokeWidth="0.5" opacity="0.2" />

        {/* Horizontal band details */}
        <rect x="5" y="130" width="38" height="1.5" fill="#BF5700" opacity="0.25" />
        <rect x="5" y="175" width="38" height="1.5" fill="#BF5700" opacity="0.2" />
        <rect x="5" y="220" width="38" height="1.5" fill="#BF5700" opacity="0.15" />
        <rect x="5" y="265" width="38" height="1.5" fill="#BF5700" opacity="0.12" />

        {/* Window grid */}
        <rect x="12" y="110" width="5" height="8" rx="1" fill="#1c1712" opacity="0.25" />
        <rect x="22" y="110" width="5" height="8" rx="1" fill="#1c1712" opacity="0.25" />
        <rect x="32" y="110" width="5" height="8" rx="1" fill="#1c1712" opacity="0.25" />
        <rect x="12" y="140" width="5" height="8" rx="1" fill="#1c1712" opacity="0.2" />
        <rect x="22" y="140" width="5" height="8" rx="1" fill="#1c1712" opacity="0.2" />
        <rect x="32" y="140" width="5" height="8" rx="1" fill="#1c1712" opacity="0.2" />
        <rect x="12" y="185" width="5" height="8" rx="1" fill="#1c1712" opacity="0.15" />
        <rect x="22" y="185" width="5" height="8" rx="1" fill="#1c1712" opacity="0.15" />
        <rect x="32" y="185" width="5" height="8" rx="1" fill="#1c1712" opacity="0.15" />
      </g>

      {/* ===== LAYER 8: Block 185 / Indeed Tower ===== */}
      <g transform="translate(610, 0)">
        <rect x="0" y="90" width="44" height="250" rx="3" fill="url(#atx-bldgDark)" opacity="0.55" />
        {/* Setback at top */}
        <rect x="4" y="90" width="36" height="18" rx="2" fill="url(#atx-bldg)" opacity="0.5" />
        {/* Windows */}
        <rect x="8" y="115" width="6" height="8" rx="1" fill="#BF5700" opacity="0.12" />
        <rect x="19" y="115" width="6" height="8" rx="1" fill="#BF5700" opacity="0.12" />
        <rect x="30" y="115" width="6" height="8" rx="1" fill="#BF5700" opacity="0.12" />
        <rect x="8" y="140" width="6" height="8" rx="1" fill="#BF5700" opacity="0.1" />
        <rect x="19" y="140" width="6" height="8" rx="1" fill="#BF5700" opacity="0.1" />
        <rect x="30" y="140" width="6" height="8" rx="1" fill="#BF5700" opacity="0.1" />
        <rect x="8" y="165" width="6" height="8" rx="1" fill="#BF5700" opacity="0.08" />
        <rect x="19" y="165" width="6" height="8" rx="1" fill="#BF5700" opacity="0.08" />
      </g>

      {/* ===== LAYER 9: The Waterline (73-story, tallest in Austin) ===== */}
      <g transform="translate(690, 0)">
        {/* Main shaft — tallest building */}
        <rect x="0" y="25" width="42" height="315" rx="3" fill="url(#atx-bldgDark)" opacity="0.7" />

        {/* Crown — stepped glass top */}
        <rect x="4" y="25" width="34" height="12" rx="2" fill="url(#atx-bldg)" opacity="0.6" />
        <rect x="8" y="18" width="26" height="10" rx="2" fill="url(#atx-bldg)" opacity="0.55" />
        <rect x="14" y="12" width="14" height="8" rx="1" fill="#f0944a" opacity="0.45" />

        {/* Horizontal bands */}
        <rect x="0" y="60" width="42" height="1.5" fill="#BF5700" opacity="0.2" />
        <rect x="0" y="100" width="42" height="1.5" fill="#BF5700" opacity="0.18" />
        <rect x="0" y="140" width="42" height="1.5" fill="#BF5700" opacity="0.15" />
        <rect x="0" y="180" width="42" height="1.5" fill="#BF5700" opacity="0.12" />
        <rect x="0" y="220" width="42" height="1.5" fill="#BF5700" opacity="0.1" />
        <rect x="0" y="260" width="42" height="1.5" fill="#BF5700" opacity="0.08" />

        {/* Window columns */}
        <rect x="6" y="40" width="5" height="7" rx="1" fill="#f0944a" opacity="0.18" />
        <rect x="18" y="40" width="5" height="7" rx="1" fill="#f0944a" opacity="0.18" />
        <rect x="30" y="40" width="5" height="7" rx="1" fill="#f0944a" opacity="0.18" />
        <rect x="6" y="65" width="5" height="7" rx="1" fill="#f0944a" opacity="0.15" />
        <rect x="18" y="65" width="5" height="7" rx="1" fill="#f0944a" opacity="0.15" />
        <rect x="30" y="65" width="5" height="7" rx="1" fill="#f0944a" opacity="0.15" />
        <rect x="6" y="110" width="5" height="7" rx="1" fill="#f0944a" opacity="0.12" />
        <rect x="18" y="110" width="5" height="7" rx="1" fill="#f0944a" opacity="0.12" />
        <rect x="30" y="110" width="5" height="7" rx="1" fill="#f0944a" opacity="0.12" />
      </g>

      {/* ===== LAYER 10: Construction cranes — symbol of the boom ===== */}
      {/* Crane 1 — tall, prominent */}
      <g transform="translate(790, 0)">
        {/* Mast */}
        <rect x="0" y="70" width="6" height="270" fill="#BF5700" opacity="0.3" />
        {/* Counter-jib (left) */}
        <line x1="3" y1="70" x2="-35" y2="80" stroke="#f0944a" strokeWidth="3" opacity="0.25" />
        {/* Jib (right boom arm) */}
        <line x1="3" y1="70" x2="85" y2="55" stroke="#f0944a" strokeWidth="3.5" opacity="0.3" />
        {/* Operator cab */}
        <rect x="-4" y="68" width="14" height="10" rx="1" fill="#BF5700" opacity="0.3" />
        {/* Pendant lines (suspension cables from jib) */}
        <line x1="3" y1="60" x2="45" y2="62" stroke="#BF5700" strokeWidth="1" opacity="0.2" />
        <line x1="3" y1="60" x2="75" y2="57" stroke="#BF5700" strokeWidth="1" opacity="0.15" />
        {/* Hook cable */}
        <line x1="60" y1="58" x2="60" y2="115" stroke="#BF5700" strokeWidth="1.2" opacity="0.2" />
        {/* Counterweight */}
        <rect x="-38" y="78" width="12" height="8" rx="1" fill="#BF5700" opacity="0.2" />
        {/* Cross-bracing on mast */}
        <line x1="0" y1="90" x2="6" y2="110" stroke="#BF5700" strokeWidth="0.6" opacity="0.15" />
        <line x1="6" y1="90" x2="0" y2="110" stroke="#BF5700" strokeWidth="0.6" opacity="0.15" />
        <line x1="0" y1="130" x2="6" y2="150" stroke="#BF5700" strokeWidth="0.6" opacity="0.12" />
        <line x1="6" y1="130" x2="0" y2="150" stroke="#BF5700" strokeWidth="0.6" opacity="0.12" />
      </g>

      {/* Crane 2 — mid-height, further back */}
      <g transform="translate(890, 0)" opacity="0.7">
        <rect x="0" y="105" width="5" height="235" fill="#BF5700" opacity="0.25" />
        <line x1="2" y1="105" x2="-28" y2="112" stroke="#f0944a" strokeWidth="2.5" opacity="0.2" />
        <line x1="2" y1="105" x2="65" y2="94" stroke="#f0944a" strokeWidth="2.5" opacity="0.25" />
        <rect x="-3" y="103" width="11" height="8" rx="1" fill="#BF5700" opacity="0.22" />
        <line x1="40" y1="98" x2="40" y2="145" stroke="#BF5700" strokeWidth="0.8" opacity="0.15" />
        <rect x="-30" y="110" width="10" height="6" rx="1" fill="#BF5700" opacity="0.15" />
      </g>

      {/* Crane 3 — small, distant */}
      <g transform="translate(975, 0)" opacity="0.45">
        <rect x="0" y="140" width="4" height="200" fill="#BF5700" opacity="0.2" />
        <line x1="2" y1="140" x2="50" y2="132" stroke="#f0944a" strokeWidth="2" opacity="0.18" />
        <line x1="2" y1="140" x2="-20" y2="145" stroke="#f0944a" strokeWidth="2" opacity="0.15" />
        <line x1="30" y1="135" x2="30" y2="170" stroke="#BF5700" strokeWidth="0.6" opacity="0.12" />
      </g>

      {/* ===== LAYER 11: Small buildings right ===== */}
      <rect x="1030" y="245" width="32" height="95" rx="2" fill="url(#atx-bldgDark)" opacity="0.4" />
      <rect x="1035" y="255" width="5" height="7" rx="1" fill="#BF5700" opacity="0.1" />
      <rect x="1045" y="255" width="5" height="7" rx="1" fill="#BF5700" opacity="0.1" />

      <rect x="1070" y="260" width="26" height="80" rx="2" fill="#252019" opacity="0.3" />
      <rect x="1104" y="272" width="22" height="68" rx="2" fill="#252019" opacity="0.22" />
      <rect x="1134" y="280" width="18" height="60" rx="2" fill="#252019" opacity="0.15" />

      {/* ===== LAYER 12: Congress Avenue Bridge — with bat silhouettes ===== */}
      <g transform="translate(0, 0)">
        {/* Bridge deck */}
        <rect x="140" y="335" width="920" height="6" rx="2" fill="#BF5700" opacity="0.18" />
        {/* Bridge railing */}
        <rect x="140" y="332" width="920" height="2" rx="1" fill="#BF5700" opacity="0.1" />

        {/* Arched supports */}
        <path d="M200,341 Q230,360 260,341" fill="none" stroke="#BF5700" strokeWidth="2" opacity="0.12" />
        <path d="M300,341 Q330,360 360,341" fill="none" stroke="#BF5700" strokeWidth="2" opacity="0.12" />
        <path d="M400,341 Q430,360 460,341" fill="none" stroke="#BF5700" strokeWidth="2" opacity="0.12" />
        <path d="M500,341 Q530,360 560,341" fill="none" stroke="#BF5700" strokeWidth="2" opacity="0.12" />
        <path d="M600,341 Q630,360 660,341" fill="none" stroke="#BF5700" strokeWidth="2" opacity="0.12" />
        <path d="M700,341 Q730,360 760,341" fill="none" stroke="#BF5700" strokeWidth="2" opacity="0.12" />
        <path d="M800,341 Q830,360 860,341" fill="none" stroke="#BF5700" strokeWidth="2" opacity="0.12" />
        <path d="M900,341 Q930,360 960,341" fill="none" stroke="#BF5700" strokeWidth="2" opacity="0.12" />

        {/* Pier supports */}
        {[260, 360, 460, 560, 660, 760, 860, 960].map((x) => (
          <rect key={x} x={x - 2} y="335" width="4" height="15" rx="1" fill="#BF5700" opacity="0.1" />
        ))}

        {/* Bat silhouettes emerging from under the bridge */}
        <g opacity="0.2">
          {/* Bat 1 */}
          <path d="M380,348 L376,343 L373,346 L376,348 L373,350 L376,353 L380,348 L384,343 L387,346 L384,348 L387,350 L384,353 Z" fill="#1c1712" />
          {/* Bat 2 */}
          <path d="M420,352 L416,347 L413,350 L416,352 L413,354 L416,357 L420,352 L424,347 L427,350 L424,352 L427,354 L424,357 Z" fill="#1c1712" />
          {/* Bat 3 */}
          <path d="M460,346 L456,341 L453,344 L456,346 L453,348 L456,351 L460,346 L464,341 L467,344 L464,346 L467,348 L464,351 Z" fill="#1c1712" />
          {/* Bat 4 */}
          <path d="M510,350 L506,345 L503,348 L506,350 L503,352 L506,355 L510,350 L514,345 L517,348 L514,350 L517,352 L514,355 Z" fill="#1c1712" />
          {/* Bat 5 — higher, flying away */}
          <path d="M445,338 L441,333 L438,336 L441,338 L438,340 L441,343 L445,338 L449,333 L452,336 L449,338 L452,340 L449,343 Z" fill="#1c1712" opacity="0.7" />
          {/* Bat 6 — distant */}
          <path d="M490,332 L487,328 L485,330 L487,332 L485,334 L487,336 L490,332 L493,328 L495,330 L493,332 L495,334 L493,336 Z" fill="#1c1712" opacity="0.5" />
          {/* Bat 7 */}
          <path d="M540,345 L536,340 L533,343 L536,345 L533,347 L536,350 L540,345 L544,340 L547,343 L544,345 L547,347 L544,350 Z" fill="#1c1712" opacity="0.6" />
        </g>
      </g>

      {/* ===== LAYER 13: Lady Bird Lake — water with reflections ===== */}
      <path d="M0,350 Q120,342 280,348 Q440,355 600,345 Q760,338 920,346 Q1060,354 1200,348 L1200,400 L0,400Z" fill="url(#atx-water)" />
      {/* Shimmer lines on water surface */}
      <path d="M80,358 Q160,354 240,358" fill="none" stroke="#5a9ac5" strokeWidth="1.5" opacity="0.1" strokeLinecap="round" />
      <path d="M350,355 Q430,350 510,354" fill="none" stroke="#5a9ac5" strokeWidth="1" opacity="0.08" strokeLinecap="round" />
      <path d="M600,360 Q680,355 760,358" fill="none" stroke="#5a9ac5" strokeWidth="1.5" opacity="0.1" strokeLinecap="round" />
      <path d="M850,356 Q930,352 1010,356" fill="none" stroke="#5a9ac5" strokeWidth="1" opacity="0.07" strokeLinecap="round" />
      {/* Building reflections in water — faint vertical streaks */}
      <rect x="260" y="352" width="30" height="48" rx="1" fill="url(#atx-waterShimmer)" opacity="0.4" />
      <rect x="460" y="350" width="20" height="50" rx="1" fill="url(#atx-waterShimmer)" opacity="0.35" />
      <rect x="555" y="352" width="18" height="48" rx="1" fill="url(#atx-waterShimmer)" opacity="0.3" />
      <rect x="700" y="348" width="22" height="52" rx="1" fill="url(#atx-waterShimmer)" opacity="0.4" />

      {/* ===== LAYER 14: Data dots / particles — glowing data points ===== */}
      <g filter="url(#atx-glow)">
        <circle cx="185" cy="200" r="3.5" fill="#BF5700" opacity="0.5" />
        <circle cx="390" cy="120" r="3" fill="#f0944a" opacity="0.45" />
        <circle cx="520" cy="40" r="2.5" fill="#BF5700" opacity="0.4" />
        <circle cx="680" cy="80" r="3" fill="#f0944a" opacity="0.35" />
        <circle cx="850" cy="50" r="2.5" fill="#BF5700" opacity="0.4" />
        <circle cx="1050" cy="200" r="3" fill="#f0944a" opacity="0.3" />
        <circle cx="100" cy="240" r="2" fill="#BF5700" opacity="0.35" />
      </g>

      {/* ===== LAYER 15: Connection arcs — data network lines ===== */}
      <g opacity="0.12">
        <path d="M185,200 Q280,160 390,120" stroke="#BF5700" strokeWidth="1.5" strokeDasharray="6 5" fill="none" />
        <path d="M520,40 Q600,55 680,80" stroke="#f0944a" strokeWidth="1.5" strokeDasharray="6 5" fill="none" />
        <path d="M390,120 Q450,75 520,40" stroke="#BF5700" strokeWidth="1" strokeDasharray="4 4" fill="none" />
      </g>

      {/* ===== LAYER 16: Data viz — mini permit trend line across skyline ===== */}
      <path d="M150,300 Q250,285 350,290 Q450,280 550,275 Q620,285 700,295 Q780,305 850,315 Q920,320 1000,325 Q1060,328 1120,330" stroke="#ef4444" strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round" />
      {/* Dot at the peak (boom era) */}
      <circle cx="550" cy="275" r="3" fill="#BF5700" opacity="0.4" />
      {/* Dot at the decline */}
      <circle cx="1000" cy="325" r="3" fill="#ef4444" opacity="0.35" />

      {/* Ground line */}
      <rect x="0" y="348" width="1200" height="1.5" fill="#BF5700" opacity="0.08" />
    </svg>
  );
}
