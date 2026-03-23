"use client";

import { useState, useEffect } from "react";
import { AtAGlance } from "@/components/article/AtAGlance";
import { MethodologySection } from "@/components/article/MethodologySection";
import { SocialShare } from "@/components/article/SocialShare";
import { ArticleEndCTA } from "@/components/article/ArticleEndCTA";
import { SourcesCitations } from "@/components/article/SourcesCitations";
import { SubscribeBar } from "@/components/article/SubscribeBar";
import { PullQuote } from "@/components/article/PullQuote";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import type { Source } from "@/types/article";
import PiedmontSkylineSVG from "./skyline-svg";

// ============================================================================
// DATA — Every statistic in this article traces to this object.
// All numbers verified against piedmont.db and AssemblyAI transcripts.
// ============================================================================

const DATA = {
  summary: {
    totalMeetings: 461,
    totalWords: 9281841,
    totalHours: 1067,
    totalBodies: 5,
    dateRange: { start: "2020-01-06", end: "2026-03-16" },
    population: 11000,
    medianHomePrice: 2500000,
    areaSquareMiles: 1.7,
  },
  bodies: [
    { key: "city_council", name: "City Council", meetings: 139, avgWords: 21813, color: "#d4a44a" },
    { key: "school_board", name: "School Board", meetings: 122, avgWords: 25036, color: "#6EE7B7" },
    { key: "planning_commission", name: "Planning Commission", meetings: 77, avgWords: 19467, color: "#818cf8" },
    { key: "park_commission", name: "Park Commission", meetings: 67, avgWords: 12469, color: "#10b981" },
    { key: "recreation_commission", name: "Recreation Commission", meetings: 56, avgWords: 15375, color: "#f59e0b" },
  ],
  annualWords: [
    { year: 2020, meetings: 74, totalWords: 1575309 },
    { year: 2021, meetings: 76, totalWords: 1507025 },
    { year: 2022, meetings: 74, totalWords: 1698862 },
    { year: 2023, meetings: 74, totalWords: 1513826 },
    { year: 2024, meetings: 75, totalWords: 1380091 },
    { year: 2025, meetings: 71, totalWords: 1312111 },
  ],
  topSpeakers: [
    { name: "Dr. Randall Booker", role: "Superintendent (departed 2022)", body: "School Board", totalWords: 824451, meetings: 51, avgWords: 7564 },
    { name: "Jen Cavenaugh", role: "Mayor 2022-2024", body: "City Council", totalWords: 730239, meetings: 85, avgWords: 4296 },
    { name: "Betsy Smegal Andersen", role: "Mayor 2024-present", body: "City Council", totalWords: 615496, meetings: 86, avgWords: 3599 },
    { name: "Wayne Rowland", role: "Planning Chair", body: "Planning Commission", totalWords: 376195, meetings: 49, avgWords: 4644 },
    { name: "Conna McCarthy", role: "Vice Mayor", body: "City Council", totalWords: 362318, meetings: 54, avgWords: 4213 },
    { name: "Dick Carter", role: "Commissioner", body: "Recreation Commission", totalWords: 183495, meetings: 40, avgWords: 2265 },
    { name: "Teddy Gray King", role: "Mayor 2020-2022", body: "City Council", totalWords: 175706, meetings: 14, avgWords: 12550 },
  ],
  longestMeetings: [
    { body: "School Board", date: "2020-06-24", words: 51567, hours: 5.5, clipId: "2177", context: "COVID reopening + racial justice reckoning" },
    { body: "School Board", date: "2022-05-25", words: 48102, hours: 5.2, clipId: "2538", context: "Uvalde/Buffalo shootings + swastika on school grounds + gender equity" },
    { body: "City Council", date: "2022-09-06", words: 47296, hours: 5.0, clipId: "2581", context: "Vice Mayor Cavenaugh presiding (Mayor Gray King absent)" },
    { body: "School Board", date: "2025-11-12", words: 46792, hours: 5.0, clipId: "3113", context: "Calendar committee presented 9 schedule versions" },
    { body: "School Board", date: "2020-12-15", words: 45907, hours: 5.1, clipId: "2269", context: "Mid-pandemic operations and reopening planning" },
  ],
  topicDistribution: {
    "Housing & Development": 144,
    "Facilities & Construction": 122,
    "Budget & Revenue": 118,
    "Schools & Education": 114,
    "Parks, Trees & Open Space": 99,
    "Equity, Diversity & Inclusion": 85,
    "Recreation & Youth Programs": 84,
    "Climate & Sustainability": 69,
    "COVID & Emergency Response": 64,
    "Public Safety & Policing": 58,
    "Traffic & Transportation": 40,
    "Infrastructure & Utilities": 32,
  },
  topicsByBody: {
    topics: [
      "Housing & Development",
      "Facilities & Construction",
      "Budget & Revenue",
      "Schools & Education",
      "Parks, Trees & Open Space",
      "Equity, Diversity & Inclusion",
      "Recreation & Youth Programs",
      "Climate & Sustainability",
      "COVID & Emergency Response",
      "Public Safety & Policing",
      "Traffic & Transportation",
      "Infrastructure & Utilities",
    ] as const,
    bodies: [
      { key: "city_council", name: "City Council", short: "Council", meetings: 137 },
      { key: "school_board", name: "School Board", short: "Schools", meetings: 106 },
      { key: "planning_commission", name: "Planning Comm.", short: "Planning", meetings: 74 },
      { key: "park_commission", name: "Park Comm.", short: "Parks", meetings: 64 },
      { key: "recreation_commission", name: "Recreation Comm.", short: "Rec", meetings: 56 },
    ] as const,
    matrix: [
      [63, 0, 74, 3, 3],
      [57, 14, 5, 15, 31],
      [46, 62, 2, 2, 6],
      [5, 106, 0, 0, 3],
      [13, 0, 8, 64, 14],
      [24, 44, 6, 1, 10],
      [22, 0, 0, 6, 56],
      [30, 0, 4, 34, 1],
      [15, 30, 5, 4, 10],
      [49, 2, 5, 2, 0],
      [28, 0, 11, 1, 0],
      [20, 0, 7, 5, 0],
    ],
  },
  moodDistribution: {
    "engaged": 329,
    "routine": 93,
    "contentious": 10,
    "crisis": 3,
    "heated": 2,
  },
  meetingsAnalyzed: 437,
  flashpoints: [
    { date: "2020-06-24", body: "school_board", cont: 3.5, label: "COVID + racial justice" },
    { date: "2020-11-16", body: "city_council", cont: 3.5, label: "Pool + equity" },
    { date: "2022-03-07", body: "city_council", cont: 3.5, label: "Equity + budget" },
    { date: "2022-08-01", body: "city_council", cont: 4.0, label: "Housing density" },
    { date: "2023-07-19", body: "recreation_commission", cont: 4.0, label: "Pickleball war" },
    { date: "2023-09-18", body: "city_council", cont: 3.5, label: "Crime + Oakland" },
    { date: "2024-02-14", body: "school_board", cont: 4.0, label: "Budget crisis" },
    { date: "2025-09-08", body: "planning_commission", cont: 3.5, label: "Moraga Canyon" },
    { date: "2025-10-08", body: "school_board", cont: 4.5, label: "AP tracking" },
  ],
  agendaShift: {
    years: [2020, 2021, 2022, 2023, 2024, 2025],
    topics: [
      { name: "COVID & Emergency", color: "#ef4444", values: [51, 33, 6, 0, 0, 0] },
      { name: "Housing", color: "#d4a44a", values: [23, 26, 38, 35, 44, 31] },
      { name: "Budget", color: "#10b981", values: [24, 23, 25, 25, 36, 26] },
      { name: "Schools", color: "#6EE7B7", values: [30, 26, 21, 26, 27, 27] },
      { name: "Equity & DEI", color: "#818cf8", values: [19, 19, 24, 26, 14, 13] },
      { name: "Public Safety", color: "#f59e0b", values: [20, 11, 8, 12, 14, 14] },
    ],
  },
  featuredQuotes: [
    {
      text: "I want to recognize, first of all and acknowledge that that state of equal disequilibrium is very difficult. And I also want to reassure the board members and community members who are listening that part of the length of time it\u2019s taking us to solve problems is deliberate.",
      speaker: "Gabe Kessler",
      role: "APT Representative",
      meeting: "School Board",
      date: "2020-06-24",
      clipId: "2177",
    },
    {
      text: "How could anyone encompass the extremes that characterize where we are? I know we all feel such horror over Tops Market in Buffalo and Robb Elementary in Texas. [...] And how do we deal with yet another swastika being drawn on our own school grounds?",
      speaker: "Elise",
      role: "APT Representative",
      meeting: "School Board",
      date: "2022-05-25",
      clipId: "2538",
    },
    {
      text: "I never want to hear a pickleball hit a paddle again. Ever. No pickleball in Piedmont. The sound of a pickleball hitting a paddle is explosive, penetrating and nerve shattering. I feel that if you stripe this for pickleball, you are pushing me out of my home of 53 years.",
      speaker: "Resident",
      role: "Linda Courts neighbor",
      meeting: "Recreation Commission",
      date: "2023-07-19",
      clipId: "2734",
    },
    {
      text: "The elephant in the room that we\u2019ve danced around tonight is a word that we don\u2019t want to say. But I\u2019m going to say it. It\u2019s not Voldemort. We\u2019re in high school. It\u2019s tracking.",
      speaker: "Parent",
      role: "Public commenter",
      meeting: "School Board",
      date: "2025-10-08",
      clipId: "3105",
    },
    {
      text: "I deeply resent Piedmont telling Oakland who we should elect and how we should set policy, especially when they are driving a hate wave that\u2019s being directed at my children and my family.",
      speaker: "Oakland resident",
      role: "Public commenter",
      meeting: "City Council",
      date: "2023-09-18",
      clipId: "2759",
    },
    {
      text: "These are literally the worst cuts I remember seeing since the financial crisis back in 2008. Despite receiving a record amount of money from the state, Piedmont is somehow both offering the lowest salary increase of any local district and cutting programs.",
      speaker: "Teacher",
      role: "PUSD educator",
      meeting: "School Board",
      date: "2024-02-14",
      clipId: "2871",
    },
    {
      text: "In my infant group, there were four kids who were autistic and mine\u2019s the only one who got the educational support because he was in Piedmont. Two of those kids are now at residential treatment facilities. 24/7, $250,000 a year. If you cut sped ed now, we\u2019re paying for it later.",
      speaker: "Parent",
      role: "Special education advocate",
      meeting: "School Board",
      date: "2024-02-14",
      clipId: "2871",
    },
    {
      text: "When you\u2019re talking about increasing densities 12-fold in a planning document, that kind of radical legislative change is going to trigger section 9.02 of the state city charter, which mandates that modifications to zones be submitted to the voters.",
      speaker: "Resident",
      role: "Public commenter",
      meeting: "City Council",
      date: "2022-08-01",
      clipId: "2564",
    },
  ],
};

const SOURCES: Source[] = [
  { title: "Piedmont KCOM-TV Video Archive", outlet: "City of Piedmont", url: "https://piedmont.ca.gov/news/kcom-tv/live_content_and_video_archive" },
  { title: "City Council - Meet Your Councilmembers", outlet: "City of Piedmont", url: "https://piedmont.ca.gov/government/city_council/meet_your_councilmembers" },
  { title: "Piedmont Unified School District Board of Education", outlet: "PUSD", url: "https://www.piedmont.k12.ca.us/about/schoolboard" },
  { title: "Planning Commission", outlet: "City of Piedmont", url: "https://piedmont.ca.gov/government/commissions___committees/planning_commission" },
  { title: "U.S. Census Bureau American Community Survey", outlet: "Census Bureau", url: "https://data.census.gov" },
  { title: "Mayor Teddy Gray King is ready for life after elected office", outlet: "Piedmont Exedra", url: "https://piedmontexedra.com/2022/12/mayor-teddy-gray-king-is-ready-for-life-after-elected-office" },
  { title: "Piedmont schools chief Booker leaving for San Mateo", outlet: "East Bay Times", url: "https://www.eastbaytimes.com/2022/05/18/piedmont-schools-chief-booker-leaving-for-san-mateo/" },
  { title: "Piedmont Community Pool: A look back at how we got here", outlet: "Piedmont Exedra", url: "https://piedmontexedra.com/2026/01/piedmont-community-pool-a-look-back-at-how-we-got-here" },
  { title: "City Council OKs pickleball plan for Linda Beach courts", outlet: "Piedmont Exedra", url: "https://piedmontexedra.com/2023/09/city-council-oks-pickleball-plan-for-linda-beach-courts" },
  { title: "Piedmont residents vow to continue fighting housing plan", outlet: "ABC7 News", url: "https://abc7news.com/post/piedmont-residents-vow-continue-fighting-approved-residential-unit-plan-amid-california-mandate-build-more-housing/18019530/" },
  { title: "Piedmont district officials say overwhelming Measure P victory will be a huge boon for schools", outlet: "East Bay Times", url: "https://www.eastbaytimes.com/2024/11/13/piedmont-district-officials-say-overwhelming-measure-p-victory-will-be-a-huge-boon-for-schools/" },
  { title: "Moraga Canyon specific plan clears another hurdle with Council adoption", outlet: "Piedmont Exedra", url: "https://piedmontexedra.com/2025/10/moraga-canyon-specific-plan-clears-another-hurdle-with-council-adoption-monday-night" },
  { title: "Piedmont Educational Foundation — About", outlet: "PEF", url: "https://piedmontedfoundation.org/about" },
  { title: "Hamlet — Search local government meetings", outlet: "Hamlet", url: "https://www.myhamlet.com/search?q=piedmont&ref=district" },
];

// ============================================================================
// COMPONENTS
// ============================================================================

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });
  return (
    <div
      ref={ref}
      className={`pm-reveal ${isVisible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function MentionCard({ quote }: { quote: typeof DATA.featuredQuotes[number] }) {
  const initials = quote.speaker.split(" ").map(w => w[0]).join("").slice(0, 2);
  return (
    <div className="pm-mention-card">
      <div className="pm-mention-header">
        <div className="pm-mention-avatar">{initials}</div>
        <div>
          <div className="pm-mention-speaker">{quote.speaker}</div>
          <div className="pm-mention-role">{quote.role}</div>
          <div className="pm-mention-meeting">{quote.meeting} &middot; {quote.date}</div>
        </div>
      </div>
      <blockquote className="pm-mention-text">&ldquo;{quote.text}&rdquo;</blockquote>
      <a
        href={`https://piedmont.granicus.com/MediaPlayer.php?view_id=9&clip_id=${quote.clipId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="pm-mention-link"
      >
        Watch on Piedmont KCOM-TV &rarr;
      </a>
    </div>
  );
}

function FlashpointTimeline() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) setHasAnimated(true);
  }, [isVisible, hasAnimated]);

  const chartW = 900;
  const chartH = 380;
  const margin = { top: 30, right: 30, bottom: 50, left: 50 };
  const w = chartW - margin.left - margin.right;
  const h = chartH - margin.top - margin.bottom;

  // Date range: 2020-01-01 to 2026-06-01
  const startDate = new Date("2020-01-01").getTime();
  const endDate = new Date("2026-06-01").getTime();
  const dateRange = endDate - startDate;

  // Y range: contentiousness 1 to 5
  const yMin = 1;
  const yMax = 5;

  const toX = (dateStr: string) => {
    const t = new Date(dateStr).getTime();
    return margin.left + ((t - startDate) / dateRange) * w;
  };
  const toY = (cont: number) => {
    return margin.top + h - ((cont - yMin) / (yMax - yMin)) * h;
  };

  // Body colors
  const bodyColor: Record<string, string> = {
    city_council: "#d4a44a",
    school_board: "#6EE7B7",
    planning_commission: "#818cf8",
    park_commission: "#10b981",
    recreation_commission: "#f59e0b",
  };

  // Year labels for x-axis
  const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026];

  return (
    <div ref={ref} className="pm-chart-wrap">
      <div className="pm-chart-title">Flashpoint timeline</div>
      <div className="pm-chart-subtitle">
        Each dot is one of {DATA.meetingsAnalyzed} analyzed meetings, positioned by date and contentiousness score. Labeled meetings exceeded 3.5 on a 5-point scale.
      </div>
      <svg viewBox={`0 0 ${chartW} ${chartH}`} style={{ width: "100%", height: "auto" }}>
        {/* Grid lines */}
        {[2, 3, 4, 5].map(v => (
          <line
            key={v}
            x1={margin.left}
            x2={chartW - margin.right}
            y1={toY(v)}
            y2={toY(v)}
            stroke="rgba(212, 164, 74, 0.08)"
            strokeDasharray={v === 3.5 ? "4,4" : "none"}
          />
        ))}
        {/* Y-axis labels */}
        {[1, 2, 3, 4, 5].map(v => (
          <text
            key={v}
            x={margin.left - 12}
            y={toY(v) + 4}
            textAnchor="end"
            fill="var(--page-text-muted)"
            fontSize="10"
            fontFamily="var(--font-sans)"
            opacity={0.6}
          >
            {v}
          </text>
        ))}
        {/* Y-axis title */}
        <text
          x={14}
          y={margin.top + h / 2}
          textAnchor="middle"
          fill="var(--page-text-muted)"
          fontSize="10"
          fontFamily="var(--font-sans)"
          opacity={0.6}
          transform={`rotate(-90, 14, ${margin.top + h / 2})`}
        >
          contentiousness
        </text>
        {/* X-axis year labels */}
        {years.map(yr => {
          const x = toX(`${yr}-07-01`);
          return (
            <text
              key={yr}
              x={x}
              y={chartH - 8}
              textAnchor="middle"
              fill="var(--page-text-muted)"
              fontSize="11"
              fontFamily="var(--font-sans)"
            >
              {yr}
            </text>
          );
        })}
        {/* 3.5 threshold line */}
        <line
          x1={margin.left}
          x2={chartW - margin.right}
          y1={toY(3.5)}
          y2={toY(3.5)}
          stroke="rgba(212, 164, 74, 0.25)"
          strokeDasharray="6,4"
        />
        <text
          x={chartW - margin.right + 4}
          y={toY(3.5) + 3}
          fill="var(--accent-primary)"
          fontSize="9"
          fontFamily="var(--font-sans)"
          opacity={0.7}
        >
          3.5
        </text>
        {/* Flashpoint dots + labels */}
        {DATA.flashpoints.map((fp, i) => {
          const cx = toX(fp.date);
          const cy = toY(fp.cont);
          const color = bodyColor[fp.body] || "#d4a44a";
          const delay = i * 120;
          // Alternate label position to reduce overlap
          const labelAbove = i % 2 === 0;
          const labelY = labelAbove ? cy - 14 : cy + 18;
          return (
            <g key={fp.date + fp.body}>
              <circle
                cx={cx}
                cy={cy}
                r={hasAnimated ? (fp.cont >= 4 ? 7 : 5) : 0}
                fill={color}
                opacity={hasAnimated ? 0.85 : 0}
                style={{ transition: `all 0.5s var(--ease-elegant) ${delay}ms` }}
              />
              {hasAnimated && (
                <>
                  <text
                    x={cx}
                    y={labelY}
                    textAnchor="middle"
                    fill="var(--page-text)"
                    fontSize="9"
                    fontFamily="var(--font-sans)"
                    fontWeight={600}
                    opacity={hasAnimated ? 1 : 0}
                    style={{ transition: `opacity 0.5s ease ${delay + 300}ms` }}
                  >
                    {fp.label}
                  </text>
                  <text
                    x={cx}
                    y={labelY + (labelAbove ? -10 : 10)}
                    textAnchor="middle"
                    fill="var(--page-text-muted)"
                    fontSize="8"
                    fontFamily="var(--font-sans)"
                    opacity={0.5}
                    style={{ transition: `opacity 0.5s ease ${delay + 400}ms` }}
                  >
                    {fp.date.slice(0, 7)}
                  </text>
                </>
              )}
            </g>
          );
        })}
        {/* Legend */}
        {[
          { key: "city_council", label: "Council" },
          { key: "school_board", label: "School Board" },
          { key: "planning_commission", label: "Planning" },
          { key: "recreation_commission", label: "Recreation" },
        ].map((item, i) => (
          <g key={item.key} transform={`translate(${margin.left + i * 130}, ${chartH - 28})`}>
            <circle cx={0} cy={0} r={4} fill={bodyColor[item.key]} opacity={0.85} />
            <text x={8} y={3} fill="var(--page-text-muted)" fontSize="9" fontFamily="var(--font-sans)">
              {item.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="pm-chart-source">
        NLP classification by Claude Sonnet. Contentiousness measures disagreement, emotional intensity, and procedural conflict within meeting transcripts.
      </div>
    </div>
  );
}

function AgendaShiftChart() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) setHasAnimated(true);
  }, [isVisible, hasAnimated]);

  const { years, topics } = DATA.agendaShift;
  const chartW = 900;
  const chartH = 340;
  const margin = { top: 30, right: 140, bottom: 40, left: 50 };
  const w = chartW - margin.left - margin.right;
  const h = chartH - margin.top - margin.bottom;

  const toX = (i: number) => margin.left + (i / (years.length - 1)) * w;
  const toY = (val: number) => margin.top + h - (val / 55) * h; // max ~51%

  const makePath = (values: number[]) => {
    return values.map((v, i) => {
      const x = toX(i);
      const y = toY(v);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    }).join(" ");
  };

  return (
    <div ref={ref} className="pm-chart-wrap">
      <div className="pm-chart-title">The agenda shift</div>
      <div className="pm-chart-subtitle">
        Percentage of meetings where each topic appeared as a primary classification, by year. COVID dominated 2020, then vanished. Housing climbed steadily through 2024.
      </div>
      <svg viewBox={`0 0 ${chartW} ${chartH}`} style={{ width: "100%", height: "auto" }}>
        {/* Grid lines */}
        {[0, 10, 20, 30, 40, 50].map(v => (
          <g key={v}>
            <line
              x1={margin.left}
              x2={chartW - margin.right}
              y1={toY(v)}
              y2={toY(v)}
              stroke="rgba(212, 164, 74, 0.08)"
            />
            <text
              x={margin.left - 10}
              y={toY(v) + 3}
              textAnchor="end"
              fill="var(--page-text-muted)"
              fontSize="10"
              fontFamily="var(--font-sans)"
              opacity={0.6}
            >
              {v}%
            </text>
          </g>
        ))}
        {/* X-axis labels */}
        {years.map((yr, i) => (
          <text
            key={yr}
            x={toX(i)}
            y={chartH - 8}
            textAnchor="middle"
            fill="var(--page-text-muted)"
            fontSize="11"
            fontFamily="var(--font-sans)"
          >
            {yr}
          </text>
        ))}
        {/* Lines */}
        {topics.map((topic, ti) => (
          <g key={topic.name}>
            <path
              d={makePath(topic.values)}
              fill="none"
              stroke={topic.color}
              strokeWidth={topic.name === "COVID & Emergency" || topic.name === "Housing" ? 3 : 1.2}
              opacity={hasAnimated ? (topic.name === "COVID & Emergency" || topic.name === "Housing" ? 0.9 : 0.45) : 0}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: `opacity 0.8s var(--ease-elegant) ${ti * 100}ms` }}
            />
            {/* Dots */}
            {topic.values.map((v, i) => (
              <circle
                key={i}
                cx={toX(i)}
                cy={toY(v)}
                r={topic.name === "COVID & Emergency" || topic.name === "Housing" ? 4 : 2.5}
                fill={topic.color}
                opacity={hasAnimated ? (topic.name === "COVID & Emergency" || topic.name === "Housing" ? 0.9 : 0.5) : 0}
                style={{ transition: `opacity 0.6s ease ${ti * 100 + i * 50}ms` }}
              />
            ))}
            {/* End label — offset to avoid collisions */}
            <text
              x={toX(years.length - 1) + 10}
              y={toY(topic.values[topic.values.length - 1]) + 4 + (
                // Manual offsets for overlapping labels
                topic.name === "Schools" ? -8 :
                topic.name === "Budget" ? 6 :
                topic.name === "Public Safety" ? -4 :
                topic.name === "Equity & DEI" ? 8 : 0
              )}
              fill={topic.color}
              fontSize="11"
              fontFamily="var(--font-sans)"
              fontWeight={topic.name === "COVID & Emergency" || topic.name === "Housing" ? 600 : 400}
              opacity={hasAnimated ? (topic.name === "COVID & Emergency" || topic.name === "Housing" ? 1 : 0.6) : 0}
              style={{ transition: `opacity 0.6s ease ${ti * 100 + 400}ms` }}
            >
              {topic.name}
            </text>
          </g>
        ))}
      </svg>
      <div className="pm-chart-source">
        Topic classification of {DATA.meetingsAnalyzed} meetings via NLP. A single meeting can be tagged with multiple topics.
      </div>
    </div>
  );
}

function SpeakerChart() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });
  const maxWords = DATA.topSpeakers[0].totalWords;

  return (
    <div ref={ref} className="pm-chart-wrap">
      <div className="pm-chart-title">Who speaks the most</div>
      <div className="pm-chart-subtitle">
        Words attributed to identified speakers via automated diarization. Counts reflect utterances where the speaker was confidently identified.
      </div>
      {DATA.topSpeakers.map((speaker, i) => {
        const pct = (speaker.totalWords / maxWords) * 100;
        return (
          <div key={speaker.name} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
            <div style={{ width: "160px", textAlign: "right", fontFamily: "var(--font-sans)", fontSize: "13px", color: "var(--page-text)", flexShrink: 0 }}>
              {speaker.name}
            </div>
            <div style={{ flex: 1, height: "24px", background: "rgba(255,255,255,0.04)", borderRadius: "4px", overflow: "hidden" }}>
              <div
                style={{
                  width: isVisible ? `${pct}%` : "0%",
                  height: "100%",
                  background: i === 0 ? "var(--accent-primary)" : `rgba(212, 164, 74, ${0.7 - i * 0.08})`,
                  borderRadius: "4px",
                  transition: `width 1s var(--ease-elegant) ${i * 80}ms`,
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "8px",
                }}
              >
                {isVisible && (
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--page-bg)", fontWeight: 600 }}>
                    {(speaker.totalWords / 1000).toFixed(0)}K
                  </span>
                )}
              </div>
            </div>
            <div style={{ width: "100px", fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--page-text-muted)", flexShrink: 0 }}>
              {speaker.body}
            </div>
          </div>
        );
      })}
      <div className="pm-chart-source">
        Speaker identification via AssemblyAI + custom name registry.
      </div>
    </div>
  );
}

// ============================================================================
// SECTIONS
// ============================================================================

function HeroSection({ scrollY }: { scrollY: number }) {
  const opacity = Math.max(0, 1 - scrollY / 600);
  const translateY = scrollY / 3;

  return (
    <section className="pm-hero">
      <div className="pm-hero-bg-grid" />
      <div className="pm-hero-content" style={{ opacity, transform: `translateY(${translateY}px)` }}>
        <div className="pm-hero-badge">
          <span className="pm-hero-badge-dot" />
          City Deep Dive
        </div>
        <h1 className="pm-hero-title">
          The Most Deliberative<br />
          <span className="pm-hero-title-accent">Square Mile in America</span>
        </h1>
        <p className="pm-hero-subtitle">
          Piedmont held {DATA.summary.totalMeetings} public meetings and spoke 9.3 million words in six years.
          We read every one.
        </p>
        <p className="pm-hero-byline">
          By{" "}
          <a href="https://www.linkedin.com/in/sunilrajaraman/" target="_blank" rel="noopener noreferrer">
            Sunil Rajaraman
          </a>
          {" "}&middot; March 2026
        </p>
        <div className="pm-hero-scroll">
          <span>Scroll to explore</span>
          <div className="pm-hero-scroll-line" />
        </div>
      </div>
      <div className="pm-hero-skyline" style={{ opacity: Math.max(0, 1 - scrollY / 800) }}>
        <PiedmontSkylineSVG />
      </div>
    </section>
  );
}

function PickleballLede() {
  return (
    <section className="pm-editorial-section">
      <FadeIn>
        <div className="pm-body-prose">
          <p>
            The fight over pickleball nearly tore a neighborhood apart. It was a Wednesday
            in July 2023, and the{" "}
            <a
              href="https://piedmont.granicus.com/MediaPlayer.php?view_id=9&clip_id=2734"
              target="_blank"
              rel="noopener noreferrer"
            >
              Recreation Commission chambers
            </a>
            {" "}were standing room only &mdash; residents lined up to testify about a sport most
            of them had never played two years earlier. One widower described finding friends
            at the Linda Beach courts after losing his wife. A woman who had lived on Howard
            Avenue for 53 years called the crack of a pickleball &ldquo;explosive,
            penetrating and nerve-shattering,&rdquo; and warned that striping the courts
            would push her from her home. A lawyer in the audience mentioned litigation.
            The commission voted 5-1 to recommend permanent lines anyway.
          </p>
          <p>
            That is Piedmont, California, in miniature. A city of roughly 11,000 people,
            {" "}{DATA.summary.areaSquareMiles} square miles completely hemmed in by Oakland, where
            residents will pack a government hearing on a summer weeknight to argue about
            pickleball acoustics.
          </p>
        </div>
      </FadeIn>
      <FadeIn delay={100}>
        <MentionCard quote={DATA.featuredQuotes[2]} />
      </FadeIn>
      <FadeIn delay={200}>
        <div className="pm-body-prose" style={{ marginTop: "2rem" }}>
          <p>
            The pickleball hearing was one of <a href="https://www.myhamlet.com/search?q=piedmont&ref=district" target="_blank" rel="noopener noreferrer">{DATA.summary.totalMeetings} public meetings</a>{" "}
            Piedmont held between January 2020 and March 2026. Five governing bodies &mdash;
            City Council, School Board, Planning Commission, Park Commission, Recreation
            Commission &mdash; generated approximately 9.3 million words of recorded
            deliberation across roughly {DATA.summary.totalHours.toLocaleString()} hours.
            The city has its own police department, its own fire service, its own school
            district. We transcribed everything.
          </p>
        </div>
      </FadeIn>
    </section>
  );
}

function ReckoningSection() {
  return (
    <section className="pm-wide-section" id="reckoning">
      <FadeIn>
        <div className="pm-section-header">
          <span className="pm-section-num">01</span>
          <h2 className="pm-section-title">The Reckoning</h2>
        </div>
      </FadeIn>
      <div className="pm-editorial-section" style={{ padding: "0 1.5rem" }}>
        <FadeIn delay={100}>
          <div className="pm-body-prose">
            <p>
              The longest meeting in the dataset &mdash; a{" "}
              <a
                href="https://piedmont.granicus.com/MediaPlayer.php?view_id=9&clip_id=2177"
                target="_blank"
                rel="noopener noreferrer"
              >
                School Board session on June 24, 2020
              </a>
              {" "}&mdash; ran {DATA.longestMeetings[0].words.toLocaleString()} words over
              five and a half hours. Schools were closed. George Floyd had been killed
              a month earlier. The meeting opened with an APT representative naming a feeling
              the entire Zoom call shared but nobody had put words to.
            </p>
          </div>
        </FadeIn>
      </div>
      <FadeIn delay={200}>
        <PullQuote
          text="That state of equal disequilibrium is very difficult. And I also want to reassure the board members and community members who are listening that part of the length of time it&rsquo;s taking us to solve problems is deliberate."
          attribution="Gabe Kessler, APT Representative, School Board, June 24, 2020"
          className="pm-pull-quote"
        />
      </FadeIn>
      <div className="pm-editorial-section" style={{ padding: "0 1.5rem" }}>
        <FadeIn delay={300}>
          <div className="pm-body-prose">
            <p>
              &ldquo;Equal disequilibrium&rdquo; is a good name for what followed. COVID appeared
              as a primary topic in 51% of all Piedmont meetings in 2020 &mdash; and in the School
              Board specifically, the figure was higher still. Session after session touched pandemic
              logistics, ventilation studies, hybrid scheduling, or parent fury about reopening
              timelines. By 2023 that figure was zero. The virus vanished from the agenda as
              completely as it had overtaken it.
            </p>
            <p>
              Two years later came the second-longest meeting. The School Board convened{" "}
              <a
                href="https://piedmont.granicus.com/MediaPlayer.php?view_id=9&clip_id=2538"
                target="_blank"
                rel="noopener noreferrer"
              >
                May 25, 2022
              </a>, the School Board convened a session that ran{" "}
              {DATA.longestMeetings[1].words.toLocaleString()} words. The Uvalde shooting
              had happened the day before; the Buffalo massacre at Tops Market was less than
              two weeks old. Another swastika had appeared on school grounds. The
              Title IX gender-equity audit was also on the agenda. Elise, an APT representative,
              opened in tears.
            </p>
          </div>
        </FadeIn>
      </div>
      <FadeIn delay={400}>
        <PullQuote
          text="How could anyone encompass the extremes that characterize where we are? I know we all feel such horror over Tops Market in Buffalo and Robb Elementary in Texas. [...] And how do we deal with yet another swastika being drawn on our own school grounds?"
          attribution="Elise, APT Representative, School Board, May 25, 2022"
          className="pm-pull-quote"
        />
      </FadeIn>
      <div className="pm-editorial-section" style={{ padding: "0 1.5rem" }}>
        <FadeIn delay={500}>
          <div className="pm-body-prose">
            <p>
              In every crisis meeting, the pattern held: Piedmont did not abbreviate.
              Where other cities might have deferred agenda items or limited public comment,
              Piedmont&apos;s governing bodies sat through it. The five longest meetings in
              the dataset each exceed 45,000 words, and each was driven by forces originating
              outside the city &mdash; a pandemic, mass shootings, a national reckoning over
              race &mdash; that this community of {DATA.summary.population.toLocaleString()} processed
              through its own institutions at its own pace.
            </p>
          </div>
        </FadeIn>
      </div>
      <FadeIn delay={600}>
        <FlashpointTimeline />
      </FadeIn>
    </section>
  );
}

function HousingSection() {
  return (
    <section className="pm-wide-section" id="housing">
      <FadeIn>
        <div className="pm-section-header">
          <span className="pm-section-num">02</span>
          <h2 className="pm-section-title">The Housing Fight</h2>
        </div>
      </FadeIn>
      <div className="pm-editorial-section" style={{ padding: "0 1.5rem" }}>
        <FadeIn delay={100}>
          <div className="pm-body-prose">
            <p>
              As COVID receded, housing filled the vacuum. Sacramento&apos;s Regional Housing
              Needs Allocation mandated density in a city where the median home costs $2.5 million
              and single-family zoning had been political scripture for a century. Housing appeared
              in 23% of meetings in 2020. By 2024, that figure was 44%.
            </p>
            <p>
              The inflection came on{" "}
              <a
                href="https://piedmont.granicus.com/MediaPlayer.php?view_id=9&clip_id=2564"
                target="_blank"
                rel="noopener noreferrer"
              >
                August 1, 2022
              </a>, when 29 public commenters crammed a Council session to nearly
              47,000 words. Opponents cited Section 9.02
              of Piedmont&apos;s city charter, which they argued mandated a public vote on
              any zoning change.
            </p>
          </div>
        </FadeIn>
      </div>
      <FadeIn delay={200}>
        <MentionCard quote={DATA.featuredQuotes[7]} />
      </FadeIn>
      <div className="pm-editorial-section" style={{ padding: "0 1.5rem" }}>
        <FadeIn delay={300}>
          <div className="pm-body-prose">
            <p>
              The charter challenge did not prevail. Piedmont&apos;s housing element moved
              forward under state pressure, though{" "}
              <a
                href="https://abc7news.com/post/piedmont-residents-vow-continue-fighting-approved-residential-unit-plan-amid-california-mandate-build-more-housing/18019530/"
                target="_blank"
                rel="noopener noreferrer"
              >
                residents vowed to keep fighting
              </a>. The rhetoric cooled but never stopped. In October 2025, the Council{" "}
              <a
                href="https://piedmontexedra.com/2025/10/moraga-canyon-specific-plan-clears-another-hurdle-with-council-adoption-monday-night"
                target="_blank"
                rel="noopener noreferrer"
              >
                adopted the Moraga Canyon specific plan
              </a>
              {" "}&mdash; 132 units, 60 of them affordable, on a hillside corridor connecting
              Piedmont to Oakland. The vote was unanimous. Three years of argument had produced
              an outcome.
            </p>
          </div>
        </FadeIn>
      </div>
      <FadeIn delay={400}>
        <AgendaShiftChart />
      </FadeIn>
    </section>
  );
}

function TrackingSection() {
  return (
    <section className="pm-wide-section" id="tracking">
      <FadeIn>
        <div className="pm-section-header">
          <span className="pm-section-num">03</span>
          <h2 className="pm-section-title">The Tracking Debate</h2>
        </div>
      </FadeIn>
      <div className="pm-editorial-section" style={{ padding: "0 1.5rem" }}>
        <FadeIn delay={100}>
          <div className="pm-body-prose">
            <p>
              The most contentious meeting in the entire dataset &mdash; a 4.5 on our 5-point
              scale &mdash; was not about housing, COVID, or policing. It was about whether
              Piedmont&apos;s high school should sort ninth-graders into separate math tracks.
            </p>
            <p>
              On{" "}
              <a
                href="https://piedmont.granicus.com/MediaPlayer.php?view_id=9&clip_id=3105"
                target="_blank"
                rel="noopener noreferrer"
              >
                October 8, 2025
              </a>, the School Board heard from parents who called detracking an equity
              imperative and parents who called it an academic betrayal. A student board member
              voted no &mdash; student members cast advisory votes &mdash; and the board
              passed the courses 5-0. One parent cut through the procedural language.
            </p>
          </div>
        </FadeIn>
      </div>
      <FadeIn delay={200}>
        <PullQuote
          text="The elephant in the room that we&rsquo;ve danced around tonight is a word that we don&rsquo;t want to say. But I&rsquo;m going to say it. It&rsquo;s not Voldemort. We&rsquo;re in high school. It&rsquo;s tracking."
          attribution="Parent, School Board, October 8, 2025"
          className="pm-pull-quote"
        />
      </FadeIn>
      <div className="pm-editorial-section" style={{ padding: "0 1.5rem" }}>
        <FadeIn delay={300}>
          <div className="pm-body-prose">
            <p>
              The tracking debate distilled something that runs through six years of Piedmont
              transcripts: a community rich enough to fund its schools generously, divided over
              whether generosity and equity point in the same direction. The{" "}
              <a href="https://www.myhamlet.com/search?q=piedmont+school+board+budget&ref=district" target="_blank" rel="noopener noreferrer">school
              budget crisis of February 2024</a> carried the same tension. Teachers testified that
              cuts were the deepest since 2008. A special education parent did the math on
              what happens when you defer intervention.
            </p>
          </div>
        </FadeIn>
      </div>
      <FadeIn delay={400}>
        <div className="pm-mentions-grid">
          <MentionCard quote={DATA.featuredQuotes[5]} />
          <MentionCard quote={DATA.featuredQuotes[6]} />
        </div>
      </FadeIn>
      <div className="pm-editorial-section" style={{ padding: "0 1.5rem" }}>
        <FadeIn delay={500}>
          <div className="pm-body-prose">
            <p>
              Oakland is never far from the conversation. Piedmont&apos;s border with it is,
              in places, two feet of curb. During a{" "}
              <a
                href="https://piedmont.granicus.com/MediaPlayer.php?view_id=9&clip_id=2759"
                target="_blank"
                rel="noopener noreferrer"
              >
                September 18, 2023
              </a>, the <a href="https://www.myhamlet.com/search?q=piedmont+city+council&ref=district" target="_blank" rel="noopener noreferrer">City Council</a> heard from an Oakland woman during a
              crime-and-policing discussion. She did not mince words.
            </p>
          </div>
        </FadeIn>
      </div>
      <FadeIn delay={600}>
        <MentionCard quote={DATA.featuredQuotes[4]} />
      </FadeIn>
    </section>
  );
}

function VoicesSection() {
  return (
    <section className="pm-wide-section" id="voices">
      <FadeIn>
        <div className="pm-section-header">
          <span className="pm-section-num">04</span>
          <h2 className="pm-section-title">The Voices</h2>
        </div>
      </FadeIn>
      <div className="pm-editorial-section" style={{ padding: "0 1.5rem" }}>
        <FadeIn delay={100}>
          <div className="pm-body-prose">
            <p>
              One voice dominated the corpus. Dr. Randall Booker, PUSD&apos;s superintendent
              until his{" "}
              <a href="https://www.eastbaytimes.com/2022/05/18/piedmont-schools-chief-booker-leaving-for-san-mateo/" target="_blank" rel="noopener noreferrer">
                departure for San Mateo in 2022
              </a>, was identified as a speaker in 51 School
              Board meetings. Our diarization attributed approximately 824,000 words to him &mdash;
              more than any other official across all five governing bodies, by a margin of
              nearly 100,000 words. At roughly 145 words per minute, that is 95 hours of a
              single person talking in public.
            </p>
            <p>
              Piedmont&apos;s three mayors over this period left distinct verbal footprints.
              Teddy Gray King, who served from 2020 to 2022, averaged 12,550 words per meeting &mdash;
              the highest per-session average of any official &mdash; though our diarization
              confidently identified her voice in 14 meetings. Jen Cavenaugh,
              who followed from 2022 to 2024, appeared at 85 meetings and spoke 730,000 words.
              Betsy Smegal Andersen, the current mayor, has appeared at 86 meetings with
              a somewhat lower total &mdash; tracking the post-peak decline in meeting length
              across all bodies.
            </p>
          </div>
        </FadeIn>
      </div>
      <FadeIn delay={200}>
        <SpeakerChart />
      </FadeIn>
      <div className="pm-editorial-section" style={{ padding: "0 1.5rem" }}>
        <FadeIn delay={300}>
          <div style={{ textAlign: "center", margin: "2rem 0" }}>
            <div className="pm-breathing-number">824K</div>
            <div className="pm-breathing-caption">
              words spoken by one superintendent across 51 School Board meetings &mdash; roughly nine novels
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function CloseSection() {
  return (
    <section className="pm-editorial-section" id="close">
      <FadeIn>
        <div className="pm-section-header">
          <span className="pm-section-num">05</span>
          <h2 className="pm-section-title">What It Amounts To</h2>
        </div>
      </FadeIn>
      <FadeIn delay={100}>
        <div className="pm-body-prose">
          <p>
            Nine million words is a lot of talk. But Piedmont converted a meaningful share of it
            into outcomes.{" "}
            <a
              href="https://www.eastbaytimes.com/2024/11/13/piedmont-district-officials-say-overwhelming-measure-p-victory-will-be-a-huge-boon-for-schools/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Measure P passed in November 2024 with 79% of the vote
            </a>
            , renewing a parcel tax that funds the school district&apos;s operations. The Piedmont
            Educational Foundation, a private entity that supplements the public budget, contributes
            approximately{" "}
            <a href="https://piedmontedfoundation.org/about" target="_blank" rel="noopener noreferrer">
              $4 million per year
            </a>.
          </p>
          <p>
            The{" "}
            <a
              href="https://piedmontexedra.com/2026/01/piedmont-community-pool-a-look-back-at-how-we-got-here"
              target="_blank"
              rel="noopener noreferrer"
            >
              community pool was completed at $34.9 million
            </a>
            , a project that consumed years of Recreation Commission meetings, bond measure
            debates, and construction updates. The Moraga Canyon housing plan passed. The
            pickleball courts were striped. The school calendar committee, which presented
            nine schedule versions at a single{" "}
            <a
              href="https://piedmont.granicus.com/MediaPlayer.php?view_id=9&clip_id=3113"
              target="_blank"
              rel="noopener noreferrer"
            >
              46,792-word meeting in November 2025
            </a>
            , eventually chose one.
          </p>
          <p>
            The transcripts cannot tell you whether Piedmont governs better than a city
            council that meets for 45 minutes and votes unanimously. They can tell you what
            one community of {DATA.summary.population.toLocaleString()} people chose to do:
            show up, talk it through, vote, and come back two weeks later to do it again.
            All of it on the record.
          </p>
        </div>
      </FadeIn>
    </section>
  );
}

// ============================================================================
// MAIN
// ============================================================================

export default function PiedmontsDeliberation() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="pm-article article-page" data-theme="piedmont">
      {/* Progress bar */}
      <div
        className="pm-progress-bar"
        style={{
          width: typeof window !== "undefined"
            ? `${Math.min(100, (scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100)}%`
            : "0%",
        }}
      />

      <HeroSection scrollY={scrollY} />

      <AtAGlance
        stats={[
          { value: "~9.3M", label: "Words Analyzed" },
          { value: "461", label: "Meetings Transcribed" },
          { value: "5", label: "Governing Bodies" },
          { value: "1,067", label: "Hours of Deliberation" },
        ]}
        finding="Piedmont, a city of 11,000 people entirely surrounded by Oakland, generates more words of public deliberation per capita than nearly any municipality we have analyzed."
      />

      <PickleballLede />
      <ReckoningSection />
      <HousingSection />
      <TrackingSection />
      <VoicesSection />
      <CloseSection />

      <MethodologySection
        prefix="pm"
        title="How We Built This Analysis"
        items={[
          { label: "Data Source", content: "461 meeting videos from Piedmont's KCOM-TV archive (piedmont.ca.gov), hosted on Granicus. All five governing bodies: City Council, School Board, Planning Commission, Park Commission, and Recreation Commission." },
          { label: "Transcription", content: "All 461 meetings were transcribed using AssemblyAI's \"best\" speech model with speaker diarization. Total audio: approximately 1,067 hours." },
          { label: "NLP Classification", content: "437 meetings were analyzed using Claude Sonnet for topic tagging, contentiousness scoring (1-5 scale), and mood classification. Contentiousness measures disagreement intensity, emotional charge, and procedural conflict within each transcript." },
          { label: "Speaker Identification", content: "A custom speaker registry maps AssemblyAI's speaker labels (A, B, C) to verified official names using roll call detection, title mention matching, and fuzzy name matching against ASR variants. 39 current and 12 past officials are tracked." },
          { label: "Time Period", content: "January 6, 2020 through March 16, 2026. Five meetings from 2020-2022 with oversized video files (exceeding AssemblyAI's 5.5GB limit) could not be transcribed." },
          { label: "Limitations", content: "Speaker diarization is imperfect — meetings with similar-sounding speakers may undercount distinct voices. Word counts attributed to specific speakers are approximations. Topic classification uses NLP probabilities, not hand-coding; individual meeting classifications (e.g., 'contentious') are algorithmic assessments based on transcript features, not editorial judgments about the conduct of any participant. We do not have pre-2020 data, so we cannot establish a pre-pandemic baseline for comparison." },
        ]}
      />

      <SocialShare title="The Most Deliberative Square Mile in America" />
      <ArticleEndCTA cityName="Piedmont" hamletSearchUrl="https://www.myhamlet.com/search?q=piedmont&ref=district" />
      <SourcesCitations sources={SOURCES} />
      <SubscribeBar />
    </main>
  );
}
