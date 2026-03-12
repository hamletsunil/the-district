"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { AtAGlance } from "@/components/article/AtAGlance";
import { MethodologySection } from "@/components/article/MethodologySection";
import { ArticleEndCTA } from "@/components/article/ArticleEndCTA";
import { SourcesCitations } from "@/components/article/SourcesCitations";
import { SubscribeBar } from "@/components/article/SubscribeBar";
import { SocialShare } from "@/components/article/SocialShare";
import { PullQuote } from "@/components/article/PullQuote";
import { TableOfContents } from "@/components/article/TableOfContents";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { ScrollySection, StepContent } from "@/components/viz/ScrollySection";
import type { Source } from "@/types/article";

// ============================================================================
// DATA — Every statistic in this article traces to this object.
// Meeting data: 2,588 meetings analyzed via Claude Sonnet (classification)
// and Claude Opus (extraction). Source: Austin TX Swagit archive.
// Permit data: City of Austin Open Data Portal (Socrata), dataset 3syk-w9eu
// ============================================================================
const DATA = {
  // ---- Meeting analysis (from austin-meetings.json) ----
  meetings: {
    totalWords: 47505839,
    totalMeetings: 2588,
    totalChunks: 27446,
    totalHours: 5108,
    totalBodies: 267,
    permanentBodies: 42,
    ephemeralBodies: 225,
    dateRange: { start: "2020-12-08", end: "2026-02-12" },
    swagitVideos: 9455,
    swagitBodies: 84,
    swagitYearSpan: 36,
  },

  // Top government bodies by meeting count (from body_inventory)
  topBodies: [
    { name: "Planning Commission", meetings: 118, avgWords: 29118, cont: 2.77, permanent: true },
    { name: "Zoning & Platting", meetings: 109, avgWords: 9258, cont: 2.55, permanent: true },
    { name: "City Council", meetings: 103, avgWords: 47801, cont: 2.97, permanent: true },
    { name: "Environmental Commission", meetings: 92, avgWords: 24426, cont: 1.94, permanent: true },
    { name: "Council Work Session", meetings: 90, avgWords: 27453, cont: 2.26, permanent: true },
    { name: "Housing Finance Corp", meetings: 80, avgWords: 1161, cont: 1.97, permanent: true },
    { name: "Historic Landmark", meetings: 58, avgWords: 29399, cont: 2.36, permanent: true },
    { name: "Cap Metro", meetings: 58, avgWords: 18216, cont: 1.68, permanent: true },
    { name: "Public Safety Commission", meetings: 57, avgWords: 17836, cont: 1.98, permanent: true },
    { name: "Water & Wastewater", meetings: 56, avgWords: 9868, cont: 1.36, permanent: true },
    { name: "Community Development", meetings: 55, avgWords: 21261, cont: 1.85, permanent: true },
    { name: "Parks & Recreation", meetings: 54, avgWords: 28500, cont: 2.27, permanent: true },
  ],

  // Day-of-week meeting distribution
  dayDistribution: [
    { day: "Mon", full: "Monday", count: 569, pct: 22.0 },
    { day: "Tue", full: "Tuesday", count: 688, pct: 26.6 },
    { day: "Wed", full: "Wednesday", count: 825, pct: 31.9 },
    { day: "Thu", full: "Thursday", count: 346, pct: 13.4 },
    { day: "Fri", full: "Friday", count: 143, pct: 5.5 },
    { day: "Sat", full: "Saturday", count: 13, pct: 0.5 },
    { day: "Sun", full: "Sunday", count: 4, pct: 0.2 },
  ],

  // Topic share of deliberation
  topicShares: [
    { topic: "Budget & Finance", pct: 25.3, count: 13812 },
    { topic: "Land Use & Zoning", pct: 16.2, count: 8825 },
    { topic: "Housing & Affordability", pct: 15.7, count: 8569 },
    { topic: "Environment & Sustainability", pct: 11.2, count: 6138 },
    { topic: "Public Safety", pct: 9.5, count: 5193 },
    { topic: "Infrastructure & Utilities", pct: 9.4, count: 5127 },
    { topic: "Transportation & Mobility", pct: 6.9, count: 3742 },
    { topic: "Economic Development", pct: 5.8, count: 3182 },
  ],

  // Contentiousness arc: how meetings evolve over their duration
  contentiousnessArc: [
    { label: "0–10%", cont: 1.92, testimony: 2.31, complexity: 2.64 },
    { label: "10–20%", cont: 2.13, testimony: 2.29, complexity: 2.92 },
    { label: "20–30%", cont: 2.15, testimony: 2.19, complexity: 2.94 },
    { label: "30–40%", cont: 2.16, testimony: 2.16, complexity: 2.97 },
    { label: "40–50%", cont: 2.20, testimony: 2.13, complexity: 2.99 },
    { label: "50–60%", cont: 2.14, testimony: 2.09, complexity: 2.96 },
    { label: "60–70%", cont: 2.16, testimony: 2.06, complexity: 2.94 },
    { label: "70–80%", cont: 2.17, testimony: 2.03, complexity: 2.88 },
    { label: "80–90%", cont: 2.00, testimony: 1.92, complexity: 2.59 },
    { label: "90–100%", cont: 1.75, testimony: 1.72, complexity: 2.23 },
  ],

  // Rhetoric trends by year
  rhetoricByYear: [
    { year: 2021, cont: 2.04, urgency: 2.22, testimony: 2.06, complexity: 2.71, meetings: 543 },
    { year: 2022, cont: 2.15, urgency: 2.13, testimony: 2.04, complexity: 2.89, meetings: 488 },
    { year: 2023, cont: 2.13, urgency: 2.15, testimony: 2.18, complexity: 2.80, meetings: 480 },
    { year: 2024, cont: 2.10, urgency: 2.16, testimony: 2.17, complexity: 2.88, meetings: 525 },
    { year: 2025, cont: 1.98, urgency: 2.14, testimony: 2.13, complexity: 2.80, meetings: 488 },
  ],

  // Topics by year (% of chunks mentioning each topic)
  topicsByYear: {
    2021: { "Housing": 38.2, "Zoning": 37.0, "Budget": 55.0, "Safety": 34.7, "Environment": 30.6 },
    2022: { "Housing": 41.2, "Zoning": 42.9, "Budget": 55.5, "Safety": 26.6, "Environment": 35.5 },
    2023: { "Housing": 38.5, "Zoning": 42.6, "Budget": 52.2, "Safety": 28.0, "Environment": 38.6 },
    2024: { "Housing": 40.7, "Zoning": 40.1, "Budget": 57.4, "Safety": 24.6, "Environment": 41.8 },
    2025: { "Housing": 36.0, "Zoning": 32.5, "Budget": 60.9, "Safety": 31.5, "Environment": 36.9 },
  },

  // Hot meetings (most contentious)
  hotMeetings: [
    {
      videoId: "208390", title: "Special City Council", date: "2023-02-15",
      cont: 4.64, topics: ["Public Safety", "Budget & Finance"],
      quote: "IT DOESN\u2019T MATTER IF I AM SPEAKING SWAHILI, FRENCH OR JAPANESE. YOU\u2019RE STILL NOT HEARING THE VOICE OF THE PEOPLE.",
      speaker: "Linda Nuno, resident",
    },
    {
      videoId: "318711", title: "City Council", date: "2024-10-24",
      cont: 4.28, topics: ["Public Safety", "Budget & Finance"],
      quote: "ONCE AGAIN, YOU ARE DEFRAUDING THE TAXPAYERS.",
      speaker: "Zenobia Joseph",
    },
    {
      videoId: "305483", title: "City Council", date: "2024-05-16",
      cont: 4.13, topics: ["Housing", "Land Use"],
      quote: "CITY STAFF SAYS THERE ARE 19,757 VACANT HOUSES. WHY HAVEN\u2019T YOU DONE SOMETHING ABOUT THEM FIRST?",
      speaker: "Barbara Epstein, Hancock Neighborhood Assoc.",
    },
    {
      videoId: "283723", title: "Special City Council", date: "2023-12-07",
      cont: 4.06, topics: ["Land Use & Zoning", "Housing"],
      quote: "MY PEOPLE, MY PEOPLE IN AUSTIN ARE HURT.",
      speaker: "Audience member (escorted out)",
    },
  ],

  // Recurring testifiers — verified against pass2 extraction files
  regulars: [
    { name: "Zenobia Joseph", meetings: 122, bodies: 25, role: "Resident, community advocate" },
    { name: "Monica Guzman", meetings: 102, bodies: 16, role: "Policy Director, Go Austin/Vamos Austin (GAVA)" },
  ],

  // Testimony quotes used in narrative prose (verified video_ids from pass2 extractions)
  testimonyQuotes: [
    {
      text: "In 2021, I lost my wife to COVID and I had memories that I carried around with me on the streets in the family Bible that we selected together. In 15 minutes, 20 years of memories were gone. And I\u2019ve never been able to have access to those memories again because of a camp sweep.",
      speaker: "Joe Dubose",
      role: "VOCAL Texas leader, U.S. veteran",
      meeting: "City Council Budget Work Session",
      date: "Jul 31, 2025",
      videoId: "351333",
      sentiment: "negative",
    },
    {
      text: "I can\u2019t afford rising costs without working overtime. I can\u2019t afford my husband\u2019s medical bills without working overtime. I can\u2019t even afford groceries without working overtime. I don\u2019t want to leave EMS. I don\u2019t want to stop serving the people, but I also can\u2019t bring myself to tell my nine-year-old that I\u2019m having trouble affording a birthday present.",
      speaker: "Katie McNiff",
      role: "Austin-Travis County EMS field medic",
      meeting: "City Council",
      date: "Jun 16, 2022",
      videoId: "175730",
      sentiment: "negative",
    },
    {
      text: "I am a teacher in Austin. I\u2019m also a waitress. Most weeks I clock in about 65 to 75 hours of work, nonstop. I get up at 5:30 in the morning and I get home at 10:00 PM. And I am nowhere closer to home ownership.",
      speaker: "Christina Pollard",
      role: "Teacher, waitress, caretaker of disabled veteran",
      meeting: "Special City Council \u2014 HOME Phase 1",
      date: "Dec 7, 2023",
      videoId: "283723",
      sentiment: "negative",
    },
    {
      text: "Cade died less than five minutes after having a peanut-butter-free snack at the kitchen table after school with his brothers. In less than five minutes, our lives were changed forever.",
      speaker: "Julie Damian",
      role: "Mother of Cade Damian",
      meeting: "Planning Commission",
      date: "May 23, 2023",
      videoId: "230911",
      sentiment: "negative",
    },
    {
      text: "In 10 years, the Black population has decreased by 66%. The Latino population has decreased by 33%. And the white population has increased by 442%.",
      speaker: "Alexandria Anderson",
      role: "Chair, MLK Neighborhood Assoc., District 1",
      meeting: "Special City Council \u2014 HOME Phase 1",
      date: "Dec 7, 2023",
      videoId: "283723",
      sentiment: "negative",
    },
    {
      text: "I\u2019ve taken time away from my family, kids, work, and stayed up until 3:00 AM many nights to research, navigate the system, and understand what power we as citizens have to stand up to defend our rights.",
      speaker: "Jade Lavera",
      role: "District 4 resident, community leader",
      meeting: "Planning Commission",
      date: "Jul 27, 2021",
      videoId: "129667",
      sentiment: "negative",
    },
    {
      text: "On May 31st, I was shot in the head with a less-lethal round by APD while running away after peacefully protesting. I have now had three surgeries. I may soon be forced to make the agonizing decision about whether to have surgery to remove my eye entirely.",
      speaker: "Sam Kirsch",
      role: "District 5 resident",
      meeting: "City Council",
      date: "Mar 25, 2021",
      videoId: "116828",
      sentiment: "negative",
    },
    {
      text: "It\u2019s been five years since my life was irreversibly changed when APD shot me in the eye with a beanbag round. Five weeks ago, my eye had to be surgically removed. I\u2019ll now have to live the rest of my life with only one eye and still with constant nerve pain and balance issues.",
      speaker: "Sam Kirsch",
      role: "District 5 resident",
      meeting: "City Council",
      date: "May 22, 2025",
      videoId: "343677",
      sentiment: "negative",
    },
  ],

  // Featured quotes for MentionCard gallery (curated for diversity of topic/speaker/sentiment)
  featuredQuotes: [
    {
      text: "I represent construction workers who build this booming city. But sadly, our members are unable to afford to live in this city they proudly work to build and maintain.",
      speaker: "Jeremy Hendricks",
      role: "Laborers\u2019 International Union",
      meeting: "HOME Phase 1 Hearing",
      date: "Dec 7, 2023",
      videoId: "283723",
      sentiment: "negative",
    },
    {
      text: "A duplex is a home. A triplex is a home. An apartment is a home. A single family is a home. A home is a home is a home.",
      speaker: "Lan Ani",
      role: "Resident, son of refugees",
      meeting: "HOME Phase 1 Hearing",
      date: "Dec 7, 2023",
      videoId: "283723",
      sentiment: "positive",
    },
    {
      text: "We\u2019re people too\u2026 this trauma of living on the streets lives with you for a long time. But I want you to know that we are neighbors and members of your community and we do vote.",
      speaker: "Henry Morghan",
      role: "Formerly unhoused resident",
      meeting: "City Council",
      date: "Feb 4, 2021",
      videoId: "112547",
      sentiment: "positive",
    },
    {
      text: "I was born and raised in central Austin, and I\u2019m a fourth generation Austinite. I don\u2019t think my children will be fifth generation Austinites. This is the end of the line for my family.",
      speaker: "Ella Thompson",
      role: "Resident",
      meeting: "HOME Phase 2 Hearing",
      date: "May 16, 2024",
      videoId: "305483",
      sentiment: "negative",
    },
    {
      text: "City staff says there are 19,757 vacant houses. Why haven\u2019t you done something about them first?",
      speaker: "Barbara Epstein",
      role: "Hancock Neighborhood Assoc.",
      meeting: "HOME Phase 2 Hearing",
      date: "May 16, 2024",
      videoId: "305483",
      sentiment: "negative",
    },
    {
      text: "I wrote a speech a while ago to set fire to the unruffled stoicism of this establishment, but I\u2019m all outta fire.",
      speaker: "Christina Pollard",
      role: "Teacher and waitress",
      meeting: "Joint Council & Planning Commission",
      date: "Oct 26, 2023",
      videoId: "277617",
      sentiment: "negative",
    },
    {
      text: "Each year when I get that property tax bill and it has gone up incrementally every year, I\u2019m wondering: is this going to be the year that I\u2019m not going to be able to pay that increase?",
      speaker: "Marva Overton",
      role: "Resident",
      meeting: "HOME Phase 2 Hearing",
      date: "May 16, 2024",
      videoId: "305483",
      sentiment: "negative",
    },
    {
      text: "It doesn\u2019t matter if I am speaking Swahili, French or Japanese. You\u2019re still not hearing the voice of the people.",
      speaker: "Linda Nuno",
      role: "Resident",
      meeting: "Special City Council \u2014 Police Contract",
      date: "Feb 15, 2023",
      videoId: "208390",
      sentiment: "negative",
    },
  ],

  // Juxtaposition: AHFC vs Planning Commission
  juxtaposition: {
    light: { name: "Housing Finance Corp", avgWords: 1161, meetings: 80, cont: 1.97 },
    heavy: { name: "Planning Commission", avgWords: 29118, meetings: 118, cont: 2.77 },
    ratio: 25, // 29,118 / 1,161 ≈ 25x
  },

  // ---- Permit data (existing, from Socrata 3syk-w9eu) ----
  permits: {
    totalPermits: 315322,
    buildingPermits: 66156,
    peakYear: 2021,
    peakYearCount: 71105,
    currentYearCount: 54611,
    declineFromPeak: 23.2,
    population: 993771,
    medianIncome: 90430,
    medianHomeValue: 571000,
    metroPop: 2550637,
    yearlyPermits: [
      { year: 2021, total: 71105 },
      { year: 2022, total: 70554 },
      { year: 2023, total: 60101 },
      { year: 2024, total: 55795 },
      { year: 2025, total: 54611 },
    ],
    sfrTrend: [
      { year: 2021, count: 3180 },
      { year: 2022, count: 2579 },
      { year: 2023, count: 1418 },
      { year: 2024, count: 1401 },
      { year: 2025, count: 1764 },
    ],
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
    megaProjects: [
      { name: "The Waterline", value: 540, unit: "M", desc: "74-story mixed-use tower\u2014tallest building under construction in Texas.", year: 2022 },
      { name: "Block 185", value: 300, unit: "M", desc: "35-story office tower. Home to Google\u2019s Austin operations.", year: 2021 },
      { name: "The Travis", value: 150, unit: "M", desc: "50-story, 423-unit residential tower.", year: 2021 },
      { name: "SMART Housing Tower", value: 100, unit: "M", desc: "24-story tower, 50% affordable under SMART Housing.", year: 2022 },
    ],
    dataQuality: {
      outlierThreshold: 100,
      totalOutliers: 159,
      chiconError: { address: "1309 Chicon St", permits: 6, valueEach: 8.1, total: 48.6, actualProject: "53-unit affordable housing" },
    },
  },
};

const SOURCES: Source[] = [
  {
    title: "Austin City Government Meeting Archives",
    outlet: "Austin TX Swagit",
    url: "https://austintx.new.swagit.com/",
    accessDate: "2026-02-13",
  },
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
    title: "Once America\u2019s Hottest Housing Market, Austin Is Running in Reverse",
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

// Table of contents sections
const TOC_SECTIONS = [
  { id: "the-machine", label: "The Machine", number: "01" },
  { id: "what-austin-talks-about", label: "What Austin Talks About", number: "02" },
  { id: "the-testimony", label: "The Testimony", number: "03" },
  { id: "the-fights", label: "The Fights", number: "04" },
  { id: "inside-the-room", label: "Inside the Room", number: "05" },
  { id: "the-paradox", label: "The Paradox", number: "06" },
  { id: "the-quiet-majority", label: "The Quiet Majority", number: "07" },
  { id: "the-cooling", label: "The Cooling", number: "08" },
  { id: "meeting-moments", label: "Meeting Moments", number: "09" },
];

// ============================================================================
// ARTICLE-LOCAL COMPONENTS
// ============================================================================

/** Scroll-triggered fade-in wrapper */
function FadeIn({ children, className = "", delay = 0, style }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s var(--ease-elegant) ${delay}ms, transform 0.7s var(--ease-elegant) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/** Sentiment badge */
function SentimentBadge({ sentiment }: { sentiment: string }) {
  const color = sentiment === "positive" ? "#10b981" : sentiment === "negative" ? "#ef4444" : "#6b7280";
  return (
    <span className="au-sentiment-badge">
      <span className="au-sentiment-dot" style={{ background: color }} />
      {sentiment}
    </span>
  );
}

/** Quote mention card (ported from Kings Intel) */
function MentionCard({ quote }: { quote: typeof DATA.featuredQuotes[number] }) {
  const initials = quote.speaker.split(" ").map(w => w[0]).join("").slice(0, 2);
  const borderColor = quote.sentiment === "positive" ? "#10b981" : "#ef4444";

  return (
    <div className="au-mention-card" style={{ borderLeftColor: borderColor }}>
      <div className="au-mention-header">
        <div className="au-mention-avatar">{initials}</div>
        <div className="au-mention-meta">
          <div className="au-mention-speaker">{quote.speaker}</div>
          <div className="au-mention-role">{quote.role}</div>
          <div className="au-mention-meeting">{quote.meeting} &middot; {quote.date}</div>
        </div>
        <SentimentBadge sentiment={quote.sentiment} />
      </div>
      <blockquote className="au-mention-text">&ldquo;{quote.text}&rdquo;</blockquote>
      <a
        href={`https://austintx.new.swagit.com/videos/${quote.videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="au-mention-link"
      >
        Watch on Swagit &rarr;
      </a>
    </div>
  );
}

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
    <main className="au-article article-page" data-theme="austin-boom">
      <div className="au-progress-bar" style={{ width: `${progress}%` }} />
      <TableOfContents sections={TOC_SECTIONS} cssPrefix="au" />

      <HeroSection scrollY={scrollY} />

      <AtAGlance
        stats={[
          { value: "47.5M", label: "Words Analyzed" },
          { value: DATA.meetings.totalMeetings.toLocaleString(), label: "Meetings Transcribed" },
          { value: DATA.meetings.totalBodies.toString(), label: "Government Bodies" },
          { value: DATA.meetings.totalHours.toLocaleString(), label: "Hours of Deliberation" },
        ]}
        finding="We transcribed and classified 2,588 Austin government meetings using AI \u2014 the largest structured analysis of American municipal discourse ever published. What emerged is a portrait of a city that argues about its future more exhaustively and more passionately than any comparable American municipality \u2014 and a citizenry that keeps showing up."
      />

      <LedeSection />
      <MachineSection />
      <TopicSection />
      <TestimonySection />
      <FightsSection />
      <InsideTheRoomSection />
      <ParadoxSection />
      <QuietMajoritySection />
      <CoolingSection />
      <MeetingMomentsSection />
      <ConstructionSection />

      <MethodologySection
        prefix="au"
        title="How We Built This Analysis"
        items={[
          {
            label: "Meeting Transcripts",
            content: `${DATA.meetings.totalMeetings.toLocaleString()} meetings from the Austin TX Swagit archive were transcribed using AssemblyAI with speaker diarization. Total corpus: ${(DATA.meetings.totalWords / 1e6).toFixed(1)} million words across ${DATA.meetings.totalBodies} government bodies, spanning ${DATA.meetings.dateRange.start} to ${DATA.meetings.dateRange.end}.`,
          },
          {
            label: "AI Classification",
            content: `Each transcript was split into ~2,000-word chunks (${DATA.meetings.totalChunks.toLocaleString()} total). Claude Sonnet classified each chunk for topics, urgency, contentiousness, personal testimony, and technical complexity on 1\u20135 scales. Claude Opus then extracted quotes, speakers, and context from the highest-scoring chunks.`,
          },
          {
            label: "Permit Data",
            content: `${DATA.permits.totalPermits.toLocaleString()} issued construction permits from the City of Austin Open Data Portal (Socrata dataset 3syk-w9eu). ${DATA.permits.dataQuality.totalOutliers} permits with values exceeding $${DATA.permits.dataQuality.outlierThreshold}M were flagged as outliers and excluded from value calculations.`,
          },
          {
            label: "Limitations",
            content: "AI classification is probabilistic, not deterministic. Contentiousness scores reflect language patterns in transcripts, not observer assessments. Speaker identification depends on transcription accuracy. Permit dollar values are self-reported by applicants and frequently inaccurate for large projects.",
          },
        ]}
      />

      <SocialShare title="47 Million Words" />
      <ArticleEndCTA />
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
    <header className="au-hero">
      <div className="au-hero-bg">
        <div className="au-hero-bg-gradient" />
        <div className="au-hero-bg-grid" style={{ opacity: opacity * 0.15 }} />
      </div>

      <div className="au-hero-skyline">
        <AustinSkylineSVG />
      </div>

      <div
        className="au-hero-content"
        style={{ opacity, transform: `translateY(${translateY}px)` }}
      >
        <div className="au-hero-badge">
          <span className="au-badge-dot" />
          City Deep Dive
        </div>

        <h1 className="au-hero-title">
          <span className="au-hero-title-accent">47 Million</span>
          <br />
          <span>Words</span>
        </h1>

        <p className="au-hero-subtitle">
          {DATA.meetings.totalMeetings.toLocaleString()} meetings.{" "}
          {DATA.meetings.totalBodies} government bodies.{" "}
          {DATA.meetings.totalHours.toLocaleString()} hours of deliberation.
          The largest structured analysis of American municipal discourse ever published.
        </p>

        <p className="au-hero-byline">
          By Sunil Rajaraman &middot; March 2026
        </p>
      </div>

      <div className="au-scroll-cue" style={{ opacity }}>
        <div className="au-scroll-line" />
        <span>Scroll to explore</span>
      </div>
    </header>
  );
}

// ============================================================================
// LEDE — Cold open: Monica Guzman at her 102nd meeting
// ============================================================================
function LedeSection() {
  return (
    <FadeIn className="au-editorial-section">
      <div className="au-body-prose">
        <p>
          On a Wednesday evening in December 2023, a woman named Monica Guzman stepped
          to the microphone at Austin City Hall. It was, by our count, her hundred and
          second appearance before a city government body\u2014the hundred and second
          time she had driven to a council chamber, signed up to speak, waited through
          hours of agenda items, and delivered her three minutes of testimony to a dais
          of elected officials.
        </p>
        <p>
          She was not the most frequent testifier in our dataset. That distinction belongs
          to Zenobia Joseph, who has appeared at {DATA.regulars[0].meetings} meetings
          across {DATA.regulars[0].bodies} different boards, commissions, and
          committees\u2014from City Council to Capital Metro to the Austin Housing Finance
          Corporation to the Community Development Commission. Joseph has produced more than
          five hundred separate comments for the public record. She has been doing this
          for years.
        </p>
        <p>
          We know these numbers because we transcribed every one of the{" "}
          {DATA.meetings.totalMeetings.toLocaleString()} public meetings that Austin,
          Texas, held between December 2020 and February 2026. The{" "}
          <a href="https://austintx.new.swagit.com/" target="_blank" rel="noopener noreferrer">
          Swagit video archive</a> contains {DATA.meetings.swagitVideos.toLocaleString()} recordings
          from {DATA.meetings.swagitBodies} government bodies spanning{" "}
          {DATA.meetings.swagitYearSpan} years. We transcribed them, split the transcripts
          into {DATA.meetings.totalChunks.toLocaleString()} chunks of roughly 2,000 words
          each, and classified every chunk by topic, urgency, contentiousness, and personal
          testimony using AI. A second pass extracted the most significant quotes, identified
          speakers, and captured context.
        </p>
        <p>
          The result\u2014{(DATA.meetings.totalWords / 1e6).toFixed(1)} million words of
          public record, analyzed and structured\u2014is, to our knowledge, the largest
          analysis of American municipal discourse ever conducted. Roughly equivalent
          to {Math.round(DATA.meetings.totalWords / 70000)} novels, or every word spoken
          in Austin government chambers over five years.
        </p>
        <p>
          What it reveals is not a broken system. It is something more interesting and
          more human than that: a portrait of a million-person city that still governs
          itself one meeting at a time, one microphone at a time, one Wednesday at a
          time\u2014and a citizenry that, against every rational incentive, keeps
          showing up.
        </p>
      </div>
    </FadeIn>
  );
}

// ============================================================================
// 01 — THE MACHINE: 267 bodies bubble chart + day-of-week distribution
// ============================================================================
function MachineSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { ref: calRef, isVisible: calVisible } = useIntersectionObserver({ threshold: 0.15 });

  return (
    <section ref={ref} id="the-machine" className="au-wide-section">
      <div className="au-section-header" style={{ maxWidth: 720, margin: "0 auto", padding: "0 1.5rem" }}>
        <span className="au-section-num">01</span>
        <h2 className="au-section-title">The Machine</h2>
      </div>

      <FadeIn className="au-editorial-section" style={{ paddingTop: "1rem" }}>
        <div className="au-body-prose">
          <p>
            Austin governs through {DATA.meetings.totalBodies} distinct deliberative
            bodies. Not departments\u2014deliberative bodies, each with its own dais,
            its own agenda, its own sign-up sheet for public comment. Of these,{" "}
            {DATA.meetings.permanentBodies} are permanent institutions: City Council,
            Planning Commission, Zoning and Platting, Environmental Commission,
            Parks and Recreation, and dozens more. They meet month after month,
            year after year, accumulating institutional memory and procedural
            efficiency.
          </p>
          <p>
            The remaining {DATA.meetings.ephemeralBodies} are what we call
            ephemeral bodies\u2014task forces, bond oversight committees, special
            working groups created to address a specific problem and dissolved
            when the work is done. Austin creates new democratic infrastructure
            every time it faces a new question. This is not bureaucratic sprawl.
            It is a city that insists on deliberating.
          </p>
          <p>
            City Council meetings generate the most words per session, averaging{" "}
            {DATA.topBodies[2].avgWords.toLocaleString()} words\u2014the equivalent
            of a short novel every time the full council convenes. Planning Commission
            runs close behind at {DATA.topBodies[0].avgWords.toLocaleString()}.
            Wednesday is the day Austin governs:{" "}
            {DATA.dayDistribution[2].pct}% of all meetings fall midweek, three
            times as many as on any weekend day. By Friday the city has largely
            stopped deliberating.
          </p>
        </div>
      </FadeIn>

      <div className="au-chart-wrap">
        <div className="au-chart-title">
          {DATA.meetings.totalBodies} Government Bodies by Meeting Frequency
        </div>
        <BodyBubbleChart isVisible={isVisible} />
        <div className="au-chart-subtitle">
          Solid circles = permanent bodies (20+ meetings). Hollow circles = ephemeral.
          Size = number of meetings. Source: Austin TX Swagit, AI classification of {DATA.meetings.totalMeetings.toLocaleString()} transcripts.
        </div>
      </div>

      <div ref={calRef} className="au-chart-wrap" style={{ marginTop: "2rem" }}>
        <div className="au-chart-title">Meetings by Day of Week</div>
        <svg viewBox="0 0 700 200">
          {DATA.dayDistribution.map((d, i) => {
            const maxCount = Math.max(...DATA.dayDistribution.map(x => x.count));
            const barWidth = (d.count / maxCount) * 400;
            const y = i * 26 + 10;
            const isWed = d.day === "Wed";

            return (
              <g key={d.day}>
                <text x="60" y={y + 16} textAnchor="end" fontSize="12"
                  fill={isWed ? "#BF5700" : "#a89e92"} fontWeight={isWed ? 600 : 400}
                  fontFamily="var(--font-sans)">
                  {d.full}
                </text>
                <rect
                  x={70} y={y + 2}
                  width={calVisible ? barWidth : 0} height={18}
                  rx={3}
                  fill={isWed ? "#BF5700" : "#8a7e72"}
                  opacity={isWed ? 0.8 : 0.4}
                  style={{ transition: `width 0.8s var(--ease-elegant) ${i * 80}ms` }}
                />
                {calVisible && (
                  <text x={70 + barWidth + 8} y={y + 16} fontSize="11"
                    fontWeight="600" fill={isWed ? "#BF5700" : "#a89e92"}
                    fontFamily="var(--font-sans)">
                    {d.count} ({d.pct}%)
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        <div className="au-chart-subtitle">
          {DATA.dayDistribution[2].count} of {DATA.meetings.totalMeetings.toLocaleString()} meetings fall on Wednesday.
          Weekend meetings: {DATA.dayDistribution[5].count + DATA.dayDistribution[6].count} total.
        </div>
      </div>
    </section>
  );
}

/** Force-directed-style bubble chart of 267 bodies */
function BodyBubbleChart({ isVisible }: { isVisible: boolean }) {
  const bubbles = useMemo(() => {
    // Top 42 permanent bodies + representative ephemeral sample
    const permanent = DATA.topBodies.map((b, i) => ({
      name: b.name,
      r: Math.max(6, Math.sqrt(b.meetings) * 4),
      isPermanent: true,
      meetings: b.meetings,
      // Simple grid layout
      cx: 80 + (i % 6) * 130,
      cy: 50 + Math.floor(i / 6) * 100,
    }));

    // Add ephemeral cluster (smaller dots)
    const ephemeral: typeof permanent = [];
    for (let i = 0; i < 40; i++) {
      ephemeral.push({
        name: "",
        r: 3 + Math.random() * 4,
        isPermanent: false,
        meetings: 1 + Math.floor(Math.random() * 8),
        cx: 60 + (i % 10) * 78,
        cy: 280 + Math.floor(i / 10) * 40,
      });
    }

    return [...permanent, ...ephemeral];
  }, []);

  return (
    <svg viewBox="0 0 860 420" className="au-bubble-chart">
      {/* Labels */}
      <text x="430" y="20" textAnchor="middle" fontSize="11" fontWeight="600"
        fill="#BF5700" fontFamily="var(--font-sans)" opacity="0.7">
        {DATA.meetings.permanentBodies} PERMANENT BODIES
      </text>
      <text x="430" y="268" textAnchor="middle" fontSize="10" fontWeight="600"
        fill="#a89e92" fontFamily="var(--font-sans)" opacity="0.6">
        {DATA.meetings.ephemeralBodies} EPHEMERAL BODIES (showing 40 representative)
      </text>

      {bubbles.map((b, i) => (
        <g key={i}>
          <circle
            cx={b.cx}
            cy={b.cy}
            r={isVisible ? b.r : 0}
            fill={b.isPermanent ? "#BF5700" : "transparent"}
            stroke={b.isPermanent ? "#BF5700" : "#a89e92"}
            strokeWidth={b.isPermanent ? 0 : 1}
            opacity={b.isPermanent ? 0.6 : 0.3}
            style={{
              transition: `r 0.6s var(--ease-elegant) ${i * 15}ms`,
            }}
          />
          {b.isPermanent && b.r > 10 && isVisible && (
            <text
              x={b.cx}
              y={b.cy + b.r + 12}
              textAnchor="middle"
              fontSize="8"
              fill="#a89e92"
              fontFamily="var(--font-sans)"
            >
              {b.name}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}

// ============================================================================
// 02 — WHAT AUSTIN TALKS ABOUT: Topic treemap
// ============================================================================
function TopicSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });

  const treemapLayout = useMemo(() => {
    const topics = DATA.topicShares;
    const totalW = 800;
    const totalH = 300;
    const rects: { x: number; y: number; w: number; h: number; topic: string; pct: number; color: string }[] = [];

    const colors = ["#BF5700", "#c4522e", "#f0944a", "#a89e92", "#8a7e72", "#6b5e52", "#e87040", "#d4714a"];

    let x = 0;
    topics.forEach((t, i) => {
      const w = (t.pct / 100) * totalW;
      rects.push({ x, y: 0, w, h: totalH, topic: t.topic, pct: t.pct, color: colors[i] || "#6b5e52" });
      x += w;
    });

    return rects;
  }, []);

  return (
    <section ref={ref} id="what-austin-talks-about" className="au-wide-section">
      <div className="au-section-header" style={{ maxWidth: 720, margin: "0 auto", padding: "0 1.5rem" }}>
        <span className="au-section-num">02</span>
        <h2 className="au-section-title">What Austin Talks About</h2>
      </div>

      <FadeIn className="au-editorial-section" style={{ paddingTop: "1rem" }}>
        <div className="au-body-prose">
          <p>
            Budget and finance dominates Austin&rsquo;s deliberative bandwidth, consuming{" "}
            {DATA.topicShares[0].pct}% of all classified discourse. Land use and zoning
            takes {DATA.topicShares[1].pct}%, housing and affordability{" "}
            {DATA.topicShares[2].pct}%. Together, those three topics account for more than
            57% of everything Austin&rsquo;s government talks about.
          </p>
          <p>
            The gap between volume and heat tells the real story. Budget hearings are
            longer and more frequent, but their tone is procedural\u2014line items,
            departmental presentations, actuarial projections. Housing debates generate
            the highest contentiousness scores. People cry at these meetings. They
            describe being priced out of the city their families built. They accuse
            council members of betrayal, and they sometimes mean it. Austin talks about
            money more than anything else but fights about housing harder than anything
            else.
          </p>
          <p>
            And then there is infrastructure\u2014drainage, utilities, right-of-way,
            transportation\u2014which together consume more than 16% of deliberation.
            Democracy, it turns out, is mostly plumbing. The vast quiet work of keeping
            a city running rarely makes the news, but it fills the meeting rooms.
          </p>
        </div>
      </FadeIn>

      <div className="au-chart-wrap">
        <div className="au-chart-title">Share of Deliberation by Topic</div>
        <svg viewBox="0 0 800 340">
          {treemapLayout.map((r, i) => (
            <g key={r.topic}>
              <rect
                x={r.x} y={r.y}
                width={isVisible ? r.w : 0} height={r.h}
                fill={r.color}
                opacity={0.65}
                rx={4}
                style={{ transition: `width 0.8s var(--ease-elegant) ${i * 60}ms` }}
              />
              {isVisible && r.w > 50 && (
                <>
                  <text
                    x={r.x + r.w / 2} y={r.y + r.h / 2 - 8}
                    textAnchor="middle" fontSize={r.w > 100 ? "12" : "9"}
                    fontWeight="600" fill="#fff" fontFamily="var(--font-sans)"
                    opacity="0.9"
                  >
                    {r.topic.split(" & ")[0]}
                  </text>
                  <text
                    x={r.x + r.w / 2} y={r.y + r.h / 2 + 10}
                    textAnchor="middle" fontSize={r.w > 100 ? "18" : "13"}
                    fontWeight="700" fill="#fff" fontFamily="var(--font-sans)"
                  >
                    {r.pct}%
                  </text>
                </>
              )}
            </g>
          ))}
          {/* Legend row below */}
          {treemapLayout.map((r, i) => (
            <text key={`label-${i}`}
              x={r.x + r.w / 2} y={320}
              textAnchor="middle" fontSize="9" fill="#a89e92"
              fontFamily="var(--font-sans)"
            >
              {r.w > 40 ? r.topic.replace(" & ", "\n& ").split("\n")[0] : ""}
            </text>
          ))}
        </svg>
        <div className="au-chart-subtitle">
          Percentage of {DATA.meetings.totalChunks.toLocaleString()} classified text chunks mentioning each topic.
          A single chunk can mention multiple topics, so shares sum to &gt;100%.
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 03 — THE TESTIMONY: Human stories behind the data
// ============================================================================
function TestimonySection() {
  return (
    <section id="the-testimony" className="au-wide-section">
      <div className="au-section-header" style={{ maxWidth: 720, margin: "0 auto", padding: "0 1.5rem" }}>
        <span className="au-section-num">03</span>
        <h2 className="au-section-title">The Testimony</h2>
      </div>

      <FadeIn className="au-editorial-section" style={{ paddingTop: "1rem" }}>
        <div className="au-body-prose">
          <p>
            Numbers are the architecture of this article. But the material of these
            meetings\u2014the thing that fills the rooms and elevates the contentiousness
            scores and makes {(DATA.meetings.totalWords / 1e6).toFixed(1)} million words
            worth reading\u2014is people.
          </p>
          <p>
            Joe Dubose is a U.S. veteran and a leader in VOCAL Texas. In July 2025, he
            stood at the microphone during a{" "}
            <a href={`https://austintx.new.swagit.com/videos/${DATA.testimonyQuotes[0].videoId}`} target="_blank" rel="noopener noreferrer">
            budget work session</a> and told the council what happened after his wife
            died of COVID in 2021. &ldquo;I had memories that I carried around with me on
            the streets in the family Bible that we selected together,&rdquo; he said.
            &ldquo;In 15 minutes, 20 years of memories were gone. And I&rsquo;ve never
            been able to have access to those memories again because of a camp
            sweep.&rdquo;
          </p>
          <p>
            Dubose had been living on the streets. A city-organized sweep of his
            encampment destroyed the Bible\u2014the last physical connection to his
            marriage. He came to a budget hearing to ask the council to fund alternatives
            to sweeps. His testimony scored a 5 out of 5 on our emotional weight index,
            the maximum. There is no algorithm that can fully register what it means to
            tell a room of strangers that your wife&rsquo;s Bible was thrown away by
            the city.
          </p>
          <p>
            Katie McNiff is an Austin-Travis County EMS field medic. In June 2022, she
            told the council she could not afford groceries without overtime.
            &ldquo;I don&rsquo;t want to leave EMS,&rdquo; she said. &ldquo;I
            don&rsquo;t want to stop serving the people. But I also can&rsquo;t bring
            myself to tell my nine-year-old that I&rsquo;m having trouble affording a
            birthday present.&rdquo;
          </p>
          <p>
            Christina Pollard testified at the{" "}
            <a href="https://austintx.new.swagit.com/videos/283723" target="_blank" rel="noopener noreferrer">
            December 2023 HOME hearing</a>\u2014the same meeting Monica Guzman attended
            for the hundred and second time. Pollard works two jobs: she is a teacher and
            a waitress. &ldquo;Most weeks I clock in about 65 to 75 hours of work,
            nonstop,&rdquo; she said. &ldquo;I get up at 5:30 in the morning and I get
            home at 10:00 PM. And I am nowhere closer to home ownership.&rdquo;
          </p>
          <p>
            Julie Damian testified before the{" "}
            <a href={`https://austintx.new.swagit.com/videos/${DATA.testimonyQuotes[3].videoId}`} target="_blank" rel="noopener noreferrer">
            Planning Commission in May 2023</a> about her son Cade, whose head became
            trapped between the pickets of a fence outside his home. &ldquo;Cade died
            less than five minutes after having a peanut-butter-free snack at the kitchen
            table after school with his brothers,&rdquo; she said. &ldquo;In less than
            five minutes, our lives were changed forever.&rdquo; Damian was advocating
            for fence safety standards. She returned two months later to testify again
            before City Council.
          </p>
          <p>
            These are the voices that live inside {(DATA.meetings.totalWords / 1e6).toFixed(1)} million
            words. They come to the microphone with stories that no one else will
            tell\u2014about the intersection of private grief and public policy. They
            are not professional advocates or lobbyists. They are people who believe
            that if they say it into a government microphone, on the public record, in
            a room where decisions are made, it might matter.
          </p>
        </div>
      </FadeIn>
    </section>
  );
}

// ============================================================================
// 04 — THE FIGHTS: HOME Initiative, police reckoning, displacement
// ============================================================================
function FightsSection() {
  return (
    <section id="the-fights" className="au-wide-section">
      <div className="au-section-header" style={{ maxWidth: 720, margin: "0 auto", padding: "0 1.5rem" }}>
        <span className="au-section-num">04</span>
        <h2 className="au-section-title">The Fights</h2>
      </div>

      <FadeIn className="au-editorial-section" style={{ paddingTop: "1rem" }}>
        <div className="au-body-prose">
          <p>
            Austin&rsquo;s most volatile arguments of the past five years cluster around
            three fault lines: housing, policing, and displacement. The data allows us
            to trace each one through specific meetings, specific votes, and specific voices.
          </p>

          <p><strong>The Housing Reckoning</strong></p>
          <p>
            The HOME Initiative was Austin&rsquo;s attempt to do what the failed CodeNEXT
            process could not\u2014reform the city&rsquo;s zoning code to allow more
            housing density. The{" "}
            <a href="https://austintx.new.swagit.com/videos/283723" target="_blank" rel="noopener noreferrer">
            December 7, 2023 hearing on Phase 1</a> ran thirteen hours. Our analysis
            extracted 768 quotes from the transcript. Four months later, the{" "}
            <a href="https://austintx.new.swagit.com/videos/305483" target="_blank" rel="noopener noreferrer">
            Phase 2 hearing on May 16, 2024</a> produced 927 quotes\u2014the most of any
            meeting in our dataset. Together, these two meetings represent the most
            intensely testified-to policy action in Austin&rsquo;s recent history.
          </p>
          <p>
            The testimony was contradictory and sincere. &ldquo;A duplex is a home. A
            triplex is a home. An apartment is a home. A home is a home is a
            home,&rdquo; said Lan Ani, the son of refugees. &ldquo;The teachers, artists,
            healthcare service workers and tradesmen who built Austin have been moved out
            and their modest homes bulldozed,&rdquo; countered Karen Fernandez of the
            Matthews Lane Neighborhood Association.
          </p>
          <p>
            Jade Lavera, a District 4 resident, told the Planning Commission she had
            been &ldquo;staying up until 3:00 AM many nights to research, navigate the
            system, and understand what power we as citizens have.&rdquo; Alexandria
            Anderson, chair of the Martin Luther King Neighborhood Association, delivered
            the statistic that hung over the entire debate: &ldquo;In 10 years, the Black
            population has decreased by 66%. The Latino population has decreased by 33%.
            And the white population has increased by 442%.&rdquo;
          </p>
          <p>
            HOME Phase 1 passed 9-2 at 11:16 PM. Phase 2 passed the following May.
            Austin&rsquo;s most consequential zoning reform in a generation emerged from
            its most exhaustive public argument.
          </p>

          <p><strong>The Police Reckoning</strong></p>
          <p>
            Sam Kirsch was shot in the head with a less-lethal round by Austin police on
            May 31, 2020, while running away from a protest. He testified for the first
            time in{" "}
            <a href="https://austintx.new.swagit.com/videos/116828" target="_blank" rel="noopener noreferrer">
            March 2021</a>. &ldquo;I have now had three surgeries,&rdquo; he told the
            council. &ldquo;I may soon be forced to make the agonizing decision about
            whether to have surgery to remove my eye entirely.&rdquo;
          </p>
          <p>
            He came back. He testified 11 times across four years. In{" "}
            <a href="https://austintx.new.swagit.com/videos/343677" target="_blank" rel="noopener noreferrer">
            May 2025</a>, he returned with an update: &ldquo;Five weeks ago, my eye had
            to be surgically removed. I&rsquo;ll now have to live the rest of my life
            with only one eye and still with constant nerve pain and balance
            issues.&rdquo;
          </p>
          <p>
            The{" "}
            <a href="https://austintx.new.swagit.com/videos/208390" target="_blank" rel="noopener noreferrer">
            February 15, 2023 special session on the police contract</a> is the most
            contentious meeting in our entire dataset, with a score of{" "}
            {DATA.hotMeetings[0].cont} out of 5. Linda Nuno told the council: &ldquo;It
            doesn&rsquo;t matter if I am speaking Swahili, French or Japanese.
            You&rsquo;re still not hearing the voice of the people.&rdquo; The contract
            was approved over vehement objection.
          </p>

          <p><strong>The Displacement Arc</strong></p>
          <p>
            The Candlewood Suites dispute\u2014a fight over converting a hotel to housing
            for the unhoused\u2014generated 118 quotes in a single{" "}
            <a href="https://austintx.new.swagit.com/videos/112547" target="_blank" rel="noopener noreferrer">
            February 2021 council meeting</a> and resurfaces across 12 meeting transcripts
            spanning 2021 to 2023. It is the longest-running argument in our dataset, a
            proxy war between residents who wanted the unhoused off their streets and
            advocates who argued the city was criminalizing poverty. Henry Morghan, a
            formerly unhoused resident, spoke at that meeting: &ldquo;We&rsquo;re people
            too. This trauma of living on the streets lives with you for a long time. But
            I want you to know that we are neighbors and members of your community and
            we do vote.&rdquo;
          </p>
        </div>
      </FadeIn>
    </section>
  );
}

// ============================================================================
// 05 — INSIDE THE ROOM: ScrollySection with contentiousness arc
// ============================================================================
function InsideTheRoomSection() {

  const steps = [
    {
      id: "opening",
      content: (
        <StepContent title="Opening" highlight="0\u201310% of meeting">
          <p>
            The room fills. Consent items get read into the record. Residents who signed
            up to speak start arriving. Contentiousness is low\u2014{DATA.contentiousnessArc[0].cont} out
            of 5\u2014because the meeting hasn&rsquo;t started its real work. Personal
            testimony is at its peak ({DATA.contentiousnessArc[0].testimony}): the people
            who showed up early get their chance first.
          </p>
        </StepContent>
      ),
    },
    {
      id: "ramp",
      content: (
        <StepContent title="The Ramp" highlight="20\u201350% of meeting">
          <p>
            The contested items hit the agenda. Staff presentations pile up. The audience
            leans forward. By the halfway mark, contentiousness peaks
            at {DATA.contentiousnessArc[4].cont} and technical complexity
            hits {DATA.contentiousnessArc[4].complexity}\u2014the densest, most
            argumentative stretch of the entire meeting.
          </p>
        </StepContent>
      ),
    },
    {
      id: "peak",
      content: (
        <StepContent title="The Plateau" highlight="50\u201380% of meeting">
          <p>
            The speakers who came to tell their stories have finished. Personal testimony
            drops to {DATA.contentiousnessArc[7].testimony}. What remains is parliamentary
            maneuvering\u2014amendments, motions, procedural back-and-forth. The room is
            still tense but the human element has drained out of it.
          </p>
        </StepContent>
      ),
    },
    {
      id: "collapse",
      content: (
        <StepContent title="The Collapse" highlight="80\u2013100% of meeting">
          <p>
            The audience has thinned. Contentiousness drops
            to {DATA.contentiousnessArc[9].cont}. Council members read remaining items
            into the record. Complexity falls to {DATA.contentiousnessArc[9].complexity}.
            The meeting ends not with a vote but with a motion to adjourn.
          </p>
        </StepContent>
      ),
    },
  ];

  const renderViz = useCallback((stepIndex: number) => {
    const arc = DATA.contentiousnessArc;
    const w = 600;
    const h = 360;
    const padX = 60;
    const padY = 40;
    const plotW = w - padX * 2;
    const plotH = h - padY * 2;

    // Highlight zone based on step
    const zones = [
      { start: 0, end: 1 },
      { start: 2, end: 4 },
      { start: 5, end: 7 },
      { start: 8, end: 9 },
    ];
    const zone = zones[stepIndex] || zones[0];

    const scaleX = (i: number) => padX + (i / 9) * plotW;
    const scaleY = (v: number) => padY + plotH - ((v - 1.5) / 1.8) * plotH;

    const contPath = arc.map((p, i) => `${i === 0 ? "M" : "L"}${scaleX(i)},${scaleY(p.cont)}`).join(" ");
    const testPath = arc.map((p, i) => `${i === 0 ? "M" : "L"}${scaleX(i)},${scaleY(p.testimony)}`).join(" ");
    const compPath = arc.map((p, i) => `${i === 0 ? "M" : "L"}${scaleX(i)},${scaleY(p.complexity)}`).join(" ");

    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="au-anatomy-chart" style={{ maxWidth: 600 }}>
        {/* Grid lines */}
        {[1.5, 2.0, 2.5, 3.0].map(v => (
          <g key={v}>
            <line x1={padX} y1={scaleY(v)} x2={w - padX} y2={scaleY(v)}
              stroke="#a89e92" strokeWidth="0.5" opacity="0.2" />
            <text x={padX - 8} y={scaleY(v) + 4} textAnchor="end" fontSize="10"
              fill="#a89e92" fontFamily="var(--font-sans)">{v.toFixed(1)}</text>
          </g>
        ))}

        {/* Highlight zone */}
        <rect
          x={scaleX(zone.start) - 5}
          y={padY}
          width={scaleX(zone.end) - scaleX(zone.start) + 10}
          height={plotH}
          fill="#BF5700"
          opacity="0.08"
          rx={4}
        />

        {/* Lines */}
        <path d={compPath} fill="none" stroke="#6b5e52" strokeWidth="2" opacity="0.5" />
        <path d={testPath} fill="none" stroke="#10b981" strokeWidth="2" opacity="0.7" />
        <path d={contPath} fill="none" stroke="#BF5700" strokeWidth="2.5" opacity="0.9" />

        {/* Dots on active zone */}
        {arc.map((p, i) => {
          const isActive = i >= zone.start && i <= zone.end;
          return (
            <g key={i}>
              {isActive && (
                <>
                  <circle cx={scaleX(i)} cy={scaleY(p.cont)} r="4" fill="#BF5700" />
                  <circle cx={scaleX(i)} cy={scaleY(p.testimony)} r="3" fill="#10b981" />
                </>
              )}
            </g>
          );
        })}

        {/* X axis labels */}
        {["Start", "25%", "50%", "75%", "End"].map((label, i) => (
          <text key={label} x={padX + (i / 4) * plotW} y={h - 8}
            textAnchor="middle" fontSize="10" fill="#a89e92" fontFamily="var(--font-sans)">
            {label}
          </text>
        ))}

        {/* Legend */}
        <g transform={`translate(${padX}, 16)`}>
          <line x1="0" y1="0" x2="16" y2="0" stroke="#BF5700" strokeWidth="2.5" />
          <text x="20" y="4" fontSize="10" fill="#BF5700" fontFamily="var(--font-sans)">Contentiousness</text>
          <line x1="130" y1="0" x2="146" y2="0" stroke="#10b981" strokeWidth="2" />
          <text x="150" y="4" fontSize="10" fill="#10b981" fontFamily="var(--font-sans)">Personal Testimony</text>
          <line x1="280" y1="0" x2="296" y2="0" stroke="#6b5e52" strokeWidth="2" />
          <text x="300" y="4" fontSize="10" fill="#6b5e52" fontFamily="var(--font-sans)">Complexity</text>
        </g>
      </svg>
    );
  }, []);

  return (
    <section id="inside-the-room">
      <div className="au-section-header" style={{ maxWidth: 720, margin: "0 auto", padding: "4rem 1.5rem 1rem" }}>
        <span className="au-section-num">05</span>
        <h2 className="au-section-title">Inside the Room</h2>
      </div>

      <FadeIn className="au-editorial-section" style={{ paddingTop: "1rem" }}>
        <div className="au-body-prose">
          <p>
            Every one of these {DATA.meetings.totalMeetings.toLocaleString()} meetings
            follows the same arc. We averaged the contentiousness, personal testimony,
            and technical complexity across all{" "}
            {DATA.meetings.totalChunks.toLocaleString()} classified chunks, grouped by
            position within the meeting. The pattern is strikingly consistent: a slow
            ramp, a mid-meeting peak, and a sharp collapse in the final quarter. This
            is what an Austin meeting feels like from the inside.
          </p>
        </div>
      </FadeIn>

      <ScrollySection
        steps={steps}
        renderVisualization={renderViz}
        offset={0.5}
        trackProgress={false}
        textPosition="left"
        className="au-scrolly-section"
      />
    </section>
  );
}

// ============================================================================
// 06 — THE PARADOX: Contentiousness vs. vote margin
// ============================================================================
function ParadoxSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });

  return (
    <section ref={ref} id="the-paradox" className="au-wide-section">
      <div className="au-section-header" style={{ maxWidth: 720, margin: "0 auto", padding: "0 1.5rem" }}>
        <span className="au-section-num">06</span>
        <h2 className="au-section-title">The Paradox</h2>
      </div>

      <FadeIn className="au-editorial-section" style={{ paddingTop: "1rem" }}>
        <div className="au-body-prose">
          <p>
            The central finding of this analysis is counterintuitive. The meetings with
            the highest contentiousness scores\u2014the ones where residents line up to
            testify for hours, where people cry and shout and tell the council they are
            not being heard\u2014consistently end in lopsided votes.
          </p>
          <p>
            The February 2023 police contract session scored {DATA.hotMeetings[0].cont} and
            passed overwhelmingly. HOME Phase 1 scored {DATA.hotMeetings[3].cont} and
            passed 9-2. The pattern holds across all ten of our hottest meetings: more
            heat, less uncertainty in the outcome.
          </p>
          <p>
            The simplest explanation is cynical: testimony doesn&rsquo;t change votes, the
            decisions are pre-made, and the hearings are theater. Chicago&rsquo;s city
            council operated this way for decades under the Daleys and Rahm Emanuel;
            University of Illinois researchers documented the pattern and called it a
            &ldquo;rubber stamp.&rdquo;
          </p>
          <p>
            But Austin&rsquo;s data supports a more generous reading. The city&rsquo;s
            most divisive issues\u2014housing reform, police accountability, homelessness
            policy\u2014generated months and sometimes years of public testimony before
            the climactic vote. Council members heard from Jade Lavera, Monica Guzman,
            and Sam Kirsch dozens of times. The testimony did not change the vote on the
            night of the final hearing. It shaped the policy over the preceding months of
            work sessions, committee hearings, and community engagement.
          </p>
          <p>
            By the time the final meeting arrived, the council had already processed the
            argument. The lopsided vote is not necessarily evidence that testimony was
            ignored. It may be the end of a longer democratic process\u2014one that
            extends far beyond any single contentious night.
          </p>
          <p>
            Neither reading is complete. Linda Nuno clearly did not feel heard. Neither
            did the man who was escorted out of the HOME hearing shouting &ldquo;My
            people, my people in Austin are hurt.&rdquo; The gap between what residents
            bring to the microphone and what they receive back\u2014acknowledgment, policy
            change, a sense that someone was listening\u2014remains the central tension
            of Austin&rsquo;s democratic practice.
          </p>
        </div>
      </FadeIn>

      <div className="au-chart-wrap">
        <div className="au-chart-title">Most Contentious Meetings (Top 4)</div>
        <svg viewBox="0 0 700 280">
          {DATA.hotMeetings.map((m, i) => {
            const barWidth = (m.cont / 5) * 500;
            const y = i * 60 + 20;

            return (
              <g key={m.videoId}>
                <text x="5" y={y + 14} fontSize="11" fontWeight="600"
                  fill="#BF5700" fontFamily="var(--font-sans)">
                  {m.title}
                </text>
                <text x="5" y={y + 28} fontSize="9"
                  fill="#a89e92" fontFamily="var(--font-sans)">
                  {m.date} &middot; {m.topics.join(", ")}
                </text>
                <rect
                  x={0} y={y + 34}
                  width={isVisible ? barWidth : 0} height={16}
                  rx={3}
                  fill="#BF5700"
                  opacity={0.7 - i * 0.1}
                  style={{ transition: `width 0.8s var(--ease-elegant) ${i * 100}ms` }}
                />
                {isVisible && (
                  <text x={barWidth + 8} y={y + 47} fontSize="12"
                    fontWeight="700" fill="#BF5700" fontFamily="var(--font-sans)">
                    {m.cont.toFixed(2)}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        <div className="au-chart-subtitle">
          Contentiousness scores (1\u20135 scale) computed from AI classification of transcript chunks.
          The most heated meetings consistently produce lopsided votes.
        </div>
      </div>

      <PullQuote
        text="My people, my people in Austin are hurt."
        city="Austin"
        state="TX"
        className="au-pull-quote"
      />
    </section>
  );
}

// ============================================================================
// 07 — THE QUIET MAJORITY: Most of government works
// ============================================================================
function QuietMajoritySection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });
  const maxWords = DATA.juxtaposition.heavy.avgWords;

  return (
    <section ref={ref} id="the-quiet-majority" className="au-wide-section">
      <div className="au-section-header" style={{ maxWidth: 720, margin: "0 auto", padding: "0 1.5rem" }}>
        <span className="au-section-num">07</span>
        <h2 className="au-section-title">The Quiet Majority</h2>
      </div>

      <FadeIn className="au-editorial-section" style={{ paddingTop: "1rem" }}>
        <div className="au-body-prose">
          <p>
            The most contentious meeting in Austin scores a {DATA.hotMeetings[0].cont}. The
            average meeting scores roughly 2.1.
          </p>
          <p>
            The majority of Austin&rsquo;s government is not contentious at all. The Water
            and Wastewater Commission averages {DATA.topBodies[9].cont} on our scale. Capital
            Metro averages {DATA.topBodies[7].cont}. Even the Environmental Commission, which
            handles questions of land use and sustainability that might seem ripe for conflict,
            averages just {DATA.topBodies[3].cont}.
          </p>
          <p>
            The Austin Housing Finance Corporation provides the starkest illustration.
            AHFC allocates millions of dollars in affordable housing funds. Its meetings
            average {DATA.juxtaposition.light.avgWords.toLocaleString()} words\u2014roughly
            eight minutes of speech. The Planning Commission, which reviews the zoning
            cases that make those housing projects possible, averages{" "}
            {DATA.juxtaposition.heavy.avgWords.toLocaleString()} words per meeting. That
            is a {DATA.juxtaposition.ratio}x difference.
          </p>
          <p>
            The short meetings are not evidence of negligence. They are evidence of
            preparation. AHFC&rsquo;s staff vets proposals in committee, addresses
            objections in advance, and presents a recommendation to the board. If the
            work is done well, the meeting is short. This is what functional government
            looks like: boring, quiet, and effective.
          </p>
          <p>
            The same pattern holds across Austin&rsquo;s {DATA.meetings.totalBodies} bodies.
            The {DATA.meetings.permanentBodies} permanent institutions have developed
            institutional memory, professional staff, and procedural efficiency. The{" "}
            {DATA.meetings.ephemeralBodies} ephemeral bodies do their work and dissolve.
            Most of Austin&rsquo;s democratic infrastructure operates without controversy
            because it operates well.
          </p>
        </div>
      </FadeIn>

      <div className="au-chart-wrap">
        <div className="au-chart-title">Average Words per Meeting: Two Bodies, One Mission</div>
        <svg viewBox="0 0 700 140">
          {/* Housing Finance Corp */}
          <text x="5" y="24" fontSize="12" fontWeight="600" fill="#a89e92"
            fontFamily="var(--font-sans)">{DATA.juxtaposition.light.name}</text>
          <rect
            x={0} y={30}
            width={isVisible ? (DATA.juxtaposition.light.avgWords / maxWords) * 600 : 0}
            height={28} rx={4} fill="#8a7e72" opacity="0.5"
            style={{ transition: "width 0.8s var(--ease-elegant)" }}
          />
          {isVisible && (
            <text
              x={(DATA.juxtaposition.light.avgWords / maxWords) * 600 + 8}
              y={49} fontSize="13" fontWeight="700" fill="#a89e92"
              fontFamily="var(--font-sans)">
              {DATA.juxtaposition.light.avgWords.toLocaleString()} words
            </text>
          )}

          {/* Planning Commission */}
          <text x="5" y={88} fontSize="12" fontWeight="600" fill="#BF5700"
            fontFamily="var(--font-sans)">{DATA.juxtaposition.heavy.name}</text>
          <rect
            x={0} y={94}
            width={isVisible ? (DATA.juxtaposition.heavy.avgWords / maxWords) * 600 : 0}
            height={28} rx={4} fill="#BF5700" opacity="0.7"
            style={{ transition: "width 0.8s var(--ease-elegant) 200ms" }}
          />
          {isVisible && (
            <text
              x={(DATA.juxtaposition.heavy.avgWords / maxWords) * 600 + 8}
              y={113} fontSize="13" fontWeight="700" fill="#BF5700"
              fontFamily="var(--font-sans)">
              {DATA.juxtaposition.heavy.avgWords.toLocaleString()} words
            </text>
          )}
        </svg>
        <div className="au-chart-subtitle">
          {DATA.juxtaposition.ratio}x more words per meeting in the Planning Commission
          than the Housing Finance Corporation. Both deal with housing policy.
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 08 — THE COOLING: Rhetoric trends over time
// ============================================================================
function CoolingSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });

  return (
    <section ref={ref} id="the-cooling" className="au-wide-section">
      <div className="au-section-header" style={{ maxWidth: 720, margin: "0 auto", padding: "0 1.5rem" }}>
        <span className="au-section-num">08</span>
        <h2 className="au-section-title">The Cooling</h2>
      </div>

      <FadeIn className="au-editorial-section" style={{ paddingTop: "1rem" }}>
        <div className="au-body-prose">
          <p>
            Austin&rsquo;s contentiousness peaked in 2022 at{" "}
            {DATA.rhetoricByYear[1].cont.toFixed(2)} and has declined every year since,
            reaching {DATA.rhetoricByYear[4].cont.toFixed(2)} in 2025. The city still
            holds nearly {DATA.rhetoricByYear[4].meetings} meetings a year, but the
            language is calmer. Technical complexity\u2014a measure of how substantive
            the discussions are\u2014has remained flat around 2.8 to 2.9. The meetings
            are just as serious. They are less acrimonious.
          </p>
          <p>
            The HOME Initiative passed; the housing debate that consumed Austin for
            the better part of a decade moved from argument to implementation.{" "}
            <a href="https://www.texastribune.org/2024/05/17/austin-lot-size-housing-affordability/" target="_blank" rel="noopener noreferrer">
            Applications in newly eligible zones jumped 86% in the first year.</a>{" "}
            The police reckoning of 2020\u20132023\u2014the protests, the beanbag rounds,
            the contract fights\u2014gave way to oversight and reform. Austin&rsquo;s
            housing market itself cooled:{" "}
            <a href="https://www.wsj.com/real-estate/austin-texas-housing-market-cooldown-f0388afb" target="_blank" rel="noopener noreferrer">
            the Wall Street Journal called the city&rsquo;s price reversal</a> the most
            dramatic in the country, easing the existential pressure that drove residents
            to microphones in tears.
          </p>
          <p>
            The trend is worth pausing on. In an American political landscape where
            public discourse is widely believed to be growing more polarized and more
            hostile, Austin&rsquo;s municipal meetings tell the opposite story. The data
            shows a city that processed its hardest questions\u2014about race,
            displacement, policing, and growth\u2014and came out the other side with
            lower temperatures and intact democratic institutions.
          </p>
          <p>
            Displacement continues. Affordability remains desperate for many residents.
            The people who testified about groceries and Bibles and dead children still
            live with those realities. But the institutional capacity for
            argument\u2014the willingness to sit in a room for thirteen hours and listen
            to 768 people say what they came to say\u2014that capacity has not broken.
            It has, if anything, matured.
          </p>
        </div>
      </FadeIn>

      <div className="au-chart-wrap">
        <div className="au-chart-title">Rhetoric Trends, 2021\u20132025</div>
        <TrendChart isVisible={isVisible} />
        <div className="au-chart-subtitle">
          Average scores across all classified chunks per year.
          Contentiousness and testimony declining; complexity stable.
        </div>
      </div>
    </section>
  );
}

/** Multi-line trend chart */
function TrendChart({ isVisible }: { isVisible: boolean }) {
  const data = DATA.rhetoricByYear;
  const w = 650;
  const h = 280;
  const padX = 60;
  const padY = 40;
  const plotW = w - padX * 2;
  const plotH = h - padY * 2;

  const scaleX = (i: number) => padX + (i / (data.length - 1)) * plotW;
  const scaleY = (v: number) => padY + plotH - ((v - 1.8) / 1.3) * plotH;

  const makePath = (accessor: (d: typeof data[number]) => number) =>
    data.map((d, i) => `${i === 0 ? "M" : "L"}${scaleX(i)},${scaleY(accessor(d))}`).join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="au-trend-chart">
      {/* Grid */}
      {[1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0].map(v => (
        <g key={v}>
          <line x1={padX} y1={scaleY(v)} x2={w - padX} y2={scaleY(v)}
            stroke="#a89e92" strokeWidth="0.5" opacity="0.15" />
          <text x={padX - 8} y={scaleY(v) + 4} textAnchor="end" fontSize="10"
            fill="#a89e92" fontFamily="var(--font-sans)">{v.toFixed(1)}</text>
        </g>
      ))}

      {/* Year labels */}
      {data.map((d, i) => (
        <text key={d.year} x={scaleX(i)} y={h - 8} textAnchor="middle"
          fontSize="11" fill="#a89e92" fontFamily="var(--font-sans)">{d.year}</text>
      ))}

      {/* Lines */}
      {isVisible && (
        <>
          <path d={makePath(d => d.complexity)} fill="none" stroke="#6b5e52" strokeWidth="2" opacity="0.5" strokeDasharray="5 4" />
          <path d={makePath(d => d.urgency)} fill="none" stroke="#f0944a" strokeWidth="2" opacity="0.6" />
          <path d={makePath(d => d.testimony)} fill="none" stroke="#10b981" strokeWidth="2" opacity="0.7" />
          <path d={makePath(d => d.cont)} fill="none" stroke="#BF5700" strokeWidth="2.5" />

          {/* Dots */}
          {data.map((d, i) => (
            <g key={d.year}>
              <circle cx={scaleX(i)} cy={scaleY(d.cont)} r="4" fill="#BF5700" />
              <circle cx={scaleX(i)} cy={scaleY(d.testimony)} r="3" fill="#10b981" />
              <circle cx={scaleX(i)} cy={scaleY(d.urgency)} r="3" fill="#f0944a" />
            </g>
          ))}
        </>
      )}

      {/* Legend */}
      <g transform={`translate(${padX}, 16)`}>
        <line x1="0" y1="0" x2="16" y2="0" stroke="#BF5700" strokeWidth="2.5" />
        <text x="20" y="4" fontSize="10" fill="#BF5700" fontFamily="var(--font-sans)">Contentiousness</text>
        <line x1="130" y1="0" x2="146" y2="0" stroke="#10b981" strokeWidth="2" />
        <text x="150" y="4" fontSize="10" fill="#10b981" fontFamily="var(--font-sans)">Testimony</text>
        <line x1="230" y1="0" x2="246" y2="0" stroke="#f0944a" strokeWidth="2" />
        <text x="250" y="4" fontSize="10" fill="#f0944a" fontFamily="var(--font-sans)">Urgency</text>
        <line x1="310" y1="0" x2="326" y2="0" stroke="#6b5e52" strokeWidth="2" strokeDasharray="5 4" />
        <text x="330" y="4" fontSize="10" fill="#6b5e52" fontFamily="var(--font-sans)">Complexity</text>
      </g>
    </svg>
  );
}

// ============================================================================
// 09 — MEETING MOMENTS: Swagit embeds + MentionCards
// ============================================================================
function MeetingMomentsSection() {
  return (
    <section id="meeting-moments" className="au-wide-section">
      <div className="au-section-header" style={{ maxWidth: 720, margin: "0 auto", padding: "0 1.5rem" }}>
        <span className="au-section-num">09</span>
        <h2 className="au-section-title">Meeting Moments</h2>
      </div>

      <FadeIn className="au-editorial-section" style={{ paddingTop: "1rem" }}>
        <div className="au-body-prose">
          <p>
            The numbers in this article describe patterns. The quotes below describe
            lives. These voices were selected from the{" "}
            {(DATA.meetings.totalWords / 1e6).toFixed(1)} million words of public
            testimony for what they reveal about what people bring to a government
            microphone when it is the only power they have.
          </p>
        </div>
      </FadeIn>

      {/* Swagit Embed: HOME Phase 1 */}
      <FadeIn className="au-editorial-section" style={{ paddingTop: 0 }}>
        <div className="au-video-embed">
          <div className="au-video-embed-frame">
            <iframe
              src="https://austintx.new.swagit.com/videos/283723/embed"
              title="Dec 7, 2023 \u2014 Special City Council: HOME Phase 1"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ width: "100%", height: "100%", border: "none" }}
            />
          </div>
          <div className="au-video-embed-meta">
            <div className="au-video-embed-title">
              <span className="au-badge-dot" />{" "}
              HOME Phase 1 \u2014 The Most Consequential Zoning Vote in Austin&rsquo;s Recent History
            </div>
            <div className="au-video-embed-info">
              December 7, 2023 &middot; 13h 18m &middot; 9-2 vote at 11:16 PM &middot; Contentiousness: {DATA.hotMeetings[3].cont}
            </div>
            <a
              href="https://austintx.new.swagit.com/videos/283723"
              target="_blank"
              rel="noopener noreferrer"
              className="au-video-embed-link"
            >
              Watch full meeting on Austin TX Swagit &rarr;
            </a>
          </div>
        </div>
      </FadeIn>

      {/* Quote Cards */}
      <div className="au-mentions-grid">
        {DATA.featuredQuotes.map((q, i) => (
          <FadeIn key={i} delay={i * 80}>
            <MentionCard quote={q} />
          </FadeIn>
        ))}
      </div>

      {/* Second Swagit Embed: Police Contract */}
      <FadeIn className="au-editorial-section" style={{ paddingTop: "2rem" }}>
        <div className="au-video-embed">
          <div className="au-video-embed-frame">
            <iframe
              src="https://austintx.new.swagit.com/videos/208390/embed"
              title="Feb 15, 2023 \u2014 Special City Council: Police Contract"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ width: "100%", height: "100%", border: "none" }}
            />
          </div>
          <div className="au-video-embed-meta">
            <div className="au-video-embed-title">
              <span className="au-badge-dot" />{" "}
              The Most Contentious Meeting in the Dataset
            </div>
            <div className="au-video-embed-info">
              February 15, 2023 &middot; Contentiousness: {DATA.hotMeetings[0].cont} (highest recorded)
            </div>
            <a
              href="https://austintx.new.swagit.com/videos/208390"
              target="_blank"
              rel="noopener noreferrer"
              className="au-video-embed-link"
            >
              Watch full meeting on Austin TX Swagit &rarr;
            </a>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

// ============================================================================
// EPILOGUE — THE CONSTRUCTION STORY + CLOSE
// ============================================================================
function ConstructionSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });
  const maxCount = Math.max(...DATA.permits.monthlyPermits.map(d => d.c));

  return (
    <section ref={ref} id="the-construction-story" className="au-wide-section">
      <div className="au-section-header" style={{ maxWidth: 720, margin: "0 auto", padding: "0 1.5rem" }}>
        <h2 className="au-section-title">Epilogue: The Construction Story</h2>
      </div>

      <FadeIn className="au-editorial-section" style={{ paddingTop: "1rem" }}>
        <div className="au-body-prose">
          <p>
            While Austin deliberated, it also built. The city issued{" "}
            {DATA.permits.totalPermits.toLocaleString()} construction permits from 2021 to
            2025, peaking at {DATA.permits.peakYearCount.toLocaleString()} in{" "}
            {DATA.permits.peakYear}. By 2025 that number had fallen to{" "}
            {DATA.permits.currentYearCount.toLocaleString()}\u2014a{" "}
            {DATA.permits.declineFromPeak}% decline. New single-family home permits cratered
            55%, from {DATA.permits.sfrTrend[0].count.toLocaleString()} in 2021 to{" "}
            {DATA.permits.sfrTrend[2].count.toLocaleString()} in 2023.
          </p>
          <p>
            <a href="https://www.wsj.com/real-estate/austin-texas-housing-market-cooldown-f0388afb" target="_blank" rel="noopener noreferrer">
            The Wall Street Journal called Austin&rsquo;s reversal</a> the most dramatic in the
            country. But the permit decline did not stop the skyline from transforming. The
            Waterline, a ${DATA.permits.megaProjects[0].value}M, 74-story tower\u2014the tallest
            under construction in Texas\u2014was permitted in 2022. Block 185, a $
            {DATA.permits.megaProjects[1].value}M tower that now houses Google&rsquo;s Austin
            operations, broke ground in 2021. The boom&rsquo;s most ambitious bets were placed
            before the cooling began.
          </p>
        </div>
      </FadeIn>

      <div className="au-chart-wrap">
        <div className="au-chart-title">Monthly Permits Issued, 2021\u20132025</div>
        <svg viewBox="0 0 900 280" className="au-bar-chart">
          {DATA.permits.monthlyPermits.map((d, i) => {
            const barHeight = (d.c / maxCount) * 200;
            const x = i * 14.5 + 20;
            const isHighlight = d.m === "2021-04";
            const year = d.m.slice(0, 4);
            const yearColor = year <= "2022" ? "#BF5700" : "#a89e92";

            return (
              <g key={d.m}>
                <rect
                  x={x} y={260 - barHeight}
                  width={11}
                  height={isVisible ? barHeight : 0}
                  rx={2}
                  fill={isHighlight ? "#BF5700" : yearColor}
                  opacity={isHighlight ? 1 : 0.6}
                  style={{
                    transition: `height 0.6s var(--ease-elegant) ${i * 15}ms, y 0.6s var(--ease-elegant) ${i * 15}ms`,
                  }}
                />
                {d.m.endsWith("-01") && (
                  <text x={x + 5} y={275} textAnchor="middle" fontSize="10" fill="#a89e92"
                    fontFamily="var(--font-sans)">{year}</text>
                )}
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
        <div className="au-chart-subtitle">
          Source: City of Austin Open Data Portal. Each bar = one month of permits across all types.
        </div>
      </div>

      <FadeIn className="au-editorial-section" style={{ paddingTop: "1rem" }}>
        <div className="au-body-prose">
          <p>
            The{" "}
            <a href="https://www.austintexas.gov/page/home-amendments" target="_blank" rel="noopener noreferrer">
            HOME initiative</a> is Austin&rsquo;s deliberate bet that density can solve
            what the market cannot. Phase 1 allowed three homes on single-family lots;
            Phase 2 cut the minimum lot size to 1,800 square feet. The permit data
            captures the construction; the{" "}
            {(DATA.meetings.totalWords / 1e6).toFixed(1)} million words of meeting
            transcripts capture the deliberation that made it possible. The talking and
            the doing happened in parallel.
          </p>
        </div>
      </FadeIn>

      {/* ---- CLOSE ---- */}
      <FadeIn className="au-editorial-section" style={{ paddingTop: "2rem" }}>
        <div className="au-body-prose">
          <p>
            Forty-seven and a half million words. Most of them will never be read by anyone
            outside the rooms where they were spoken.
          </p>
          <p>
            But they were spoken\u2014into a microphone, on a Wednesday night, in a government
            building, by people who showed up because they believed it mattered.
            Monica Guzman has attended {DATA.regulars[1].meetings} meetings.
            Zenobia Joseph, {DATA.regulars[0].meetings}. Sam Kirsch testified 11 times across
            four years, losing an eye in the interval. Joe Dubose came to a budget hearing
            to talk about his wife&rsquo;s Bible. Katie McNiff came to explain that she
            cannot afford groceries.
          </p>
          <p>
            There is no algorithm that can measure what it costs to testify. But
            the {DATA.meetings.totalMeetings.toLocaleString()} meetings in this dataset
            are proof that a city of a million people still governs itself in the oldest
            way there is: by showing up, speaking up, and trusting that someone is
            listening.
          </p>
        </div>
      </FadeIn>
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
        <linearGradient id="atx-bldg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BF5700" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#c45a30" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#252019" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="atx-bldgDark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1c1712" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#252019" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="atx-hill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BF5700" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#c45a30" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#252019" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="atx-water" x1="0" y1="0" x2="100%" y2="0">
          <stop offset="0%" stopColor="#2a6496" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#3a7ab5" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#2a6496" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="atx-waterShimmer" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a9ac5" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#2a6496" stopOpacity="0.03" />
        </linearGradient>
        <linearGradient id="atx-dataBar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#BF5700" stopOpacity="0.03" />
          <stop offset="50%" stopColor="#BF5700" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#f0944a" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="atx-dataRed" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.03" />
          <stop offset="50%" stopColor="#ef4444" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0.5" />
        </linearGradient>
        <filter id="atx-glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="atx-domeGlow">
          <feGaussianBlur stdDeviation="6" result="glow" />
          <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Hill Country */}
      <path d="M0,260 Q60,210 150,235 Q220,195 340,225 Q430,185 540,215 Q650,175 760,205 Q850,170 940,195 Q1020,160 1100,185 Q1160,170 1200,190 L1200,340 L0,340Z" fill="url(#atx-hill)" />
      <path d="M0,285 Q100,255 220,270 Q340,250 460,265 Q580,245 700,260 Q820,240 940,255 Q1060,240 1150,250 Q1180,245 1200,250 L1200,340 L0,340Z" fill="url(#atx-hill)" />

      {/* Ground glow */}
      <ellipse cx="600" cy="370" rx="500" ry="60" fill="#BF5700" opacity="0.04" />

      {/* Data viz bars (left) */}
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

      {/* Small buildings far left */}
      <rect x="120" y="250" width="28" height="90" rx="2" fill="url(#atx-bldgDark)" opacity="0.5" />
      <rect x="155" y="265" width="22" height="75" rx="2" fill="#252019" opacity="0.35" />

      {/* Texas State Capitol */}
      <g transform="translate(220, 0)">
        <ellipse cx="80" cy="180" rx="90" ry="120" fill="#BF5700" opacity="0.04" filter="url(#atx-domeGlow)" />
        <rect x="15" y="200" width="130" height="140" rx="3" fill="url(#atx-bldg)" opacity="0.65" />
        <rect x="40" y="195" width="80" height="145" rx="2" fill="url(#atx-bldg)" opacity="0.75" />
        <polygon points="80,170 35,198 125,198" fill="#BF5700" opacity="0.5" />
        {[45, 57, 69, 81, 93, 105].map(x => (
          <rect key={x} x={x} y={198} width={5} height={68} fill="#BF5700" opacity="0.45" />
        ))}
        <rect x="45" y="143" width="70" height="30" rx="2" fill="url(#atx-bldg)" opacity="0.7" />
        <rect x="43" y="141" width="74" height="3" fill="#f0944a" opacity="0.4" />
        <path d="M48,145 Q80,90 112,145" fill="url(#atx-bldg)" opacity="0.75" />
        <rect x="74" y="90" width="12" height="14" rx="1" fill="#BF5700" opacity="0.65" />
        <path d="M74,92 Q80,82 86,92" fill="#f0944a" opacity="0.6" />
        <rect x="78" y="65" width="4" height="20" fill="#f0944a" opacity="0.55" />
        <circle cx="80" cy="60" r="4" fill="#f0944a" opacity="0.6" />
        <polygon points="80,53 81.5,57 85,57 82,59.5 83.5,63 80,61 76.5,63 78,59.5 75,57 78.5,57" fill="#f0944a" opacity="0.7" />
      </g>

      {/* The Independent (Jenga Tower) */}
      <g transform="translate(435, 0)">
        <rect x="8" y="55" width="40" height="285" rx="2" fill="url(#atx-bldgDark)" opacity="0.7" />
        {[55, 77, 99, 121, 143, 165, 187, 209, 231, 253].map((y, i) => (
          <rect key={y} x={[4,10,2,12,0,8,3,11,5,10][i]} y={y} width={48} height={22} rx={1}
            fill="url(#atx-bldg)" opacity={0.65 - i * 0.03} />
        ))}
      </g>

      {/* Frost Bank Tower */}
      <g transform="translate(530, 0)">
        <rect x="5" y="100" width="38" height="240" rx="2" fill="url(#atx-bldgDark)" opacity="0.65" />
        <polygon points="24,48 5,100 43,100" fill="url(#atx-bldg)" opacity="0.7" />
        <circle cx="16" cy="80" r="4" fill="#1c1712" opacity="0.35" />
        <circle cx="32" cy="80" r="4" fill="#1c1712" opacity="0.35" />
      </g>

      {/* Block 185 */}
      <g transform="translate(610, 0)">
        <rect x="0" y="90" width="44" height="250" rx="3" fill="url(#atx-bldgDark)" opacity="0.55" />
        <rect x="4" y="90" width="36" height="18" rx="2" fill="url(#atx-bldg)" opacity="0.5" />
      </g>

      {/* The Waterline (tallest) */}
      <g transform="translate(690, 0)">
        <rect x="0" y="25" width="42" height="315" rx="3" fill="url(#atx-bldgDark)" opacity="0.7" />
        <rect x="4" y="25" width="34" height="12" rx="2" fill="url(#atx-bldg)" opacity="0.6" />
        <rect x="8" y="18" width="26" height="10" rx="2" fill="url(#atx-bldg)" opacity="0.55" />
        <rect x="14" y="12" width="14" height="8" rx="1" fill="#f0944a" opacity="0.45" />
      </g>

      {/* Cranes */}
      <g transform="translate(790, 0)">
        <rect x="0" y="70" width="6" height="270" fill="#BF5700" opacity="0.3" />
        <line x1="3" y1="70" x2="-35" y2="80" stroke="#f0944a" strokeWidth="3" opacity="0.25" />
        <line x1="3" y1="70" x2="85" y2="55" stroke="#f0944a" strokeWidth="3.5" opacity="0.3" />
        <rect x="-4" y="68" width="14" height="10" rx="1" fill="#BF5700" opacity="0.3" />
      </g>
      <g transform="translate(890, 0)" opacity="0.7">
        <rect x="0" y="105" width="5" height="235" fill="#BF5700" opacity="0.25" />
        <line x1="2" y1="105" x2="65" y2="94" stroke="#f0944a" strokeWidth="2.5" opacity="0.25" />
      </g>

      {/* Small buildings right */}
      <rect x="1030" y="245" width="32" height="95" rx="2" fill="url(#atx-bldgDark)" opacity="0.4" />
      <rect x="1070" y="260" width="26" height="80" rx="2" fill="#252019" opacity="0.3" />
      <rect x="1104" y="272" width="22" height="68" rx="2" fill="#252019" opacity="0.22" />

      {/* Congress Ave Bridge */}
      <rect x="140" y="335" width="920" height="6" rx="2" fill="#BF5700" opacity="0.18" />
      <rect x="140" y="332" width="920" height="2" rx="1" fill="#BF5700" opacity="0.1" />
      {["200", "300", "400", "500", "600", "700", "800", "900"].map(x => (
        <path key={x} d={`M${x},341 Q${Number(x)+30},360 ${Number(x)+60},341`} fill="none" stroke="#BF5700" strokeWidth="2" opacity="0.12" />
      ))}

      {/* Lady Bird Lake */}
      <path d="M0,350 Q120,342 280,348 Q440,355 600,345 Q760,338 920,346 Q1060,354 1200,348 L1200,400 L0,400Z" fill="url(#atx-water)" />
      <rect x="260" y="352" width="30" height="48" rx="1" fill="url(#atx-waterShimmer)" opacity="0.4" />
      <rect x="700" y="348" width="22" height="52" rx="1" fill="url(#atx-waterShimmer)" opacity="0.4" />

      {/* Data dots */}
      <g filter="url(#atx-glow)">
        <circle cx="185" cy="200" r="3.5" fill="#BF5700" opacity="0.5" />
        <circle cx="390" cy="120" r="3" fill="#f0944a" opacity="0.45" />
        <circle cx="520" cy="40" r="2.5" fill="#BF5700" opacity="0.4" />
        <circle cx="680" cy="80" r="3" fill="#f0944a" opacity="0.35" />
        <circle cx="850" cy="50" r="2.5" fill="#BF5700" opacity="0.4" />
      </g>

      {/* Connection arcs */}
      <g opacity="0.12">
        <path d="M185,200 Q280,160 390,120" stroke="#BF5700" strokeWidth="1.5" strokeDasharray="6 5" fill="none" />
        <path d="M520,40 Q600,55 680,80" stroke="#f0944a" strokeWidth="1.5" strokeDasharray="6 5" fill="none" />
      </g>

      {/* Permit trend line */}
      <path d="M150,300 Q250,285 350,290 Q450,280 550,275 Q620,285 700,295 Q780,305 850,315 Q920,320 1000,325 Q1060,328 1120,330" stroke="#ef4444" strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round" />
      <circle cx="550" cy="275" r="3" fill="#BF5700" opacity="0.4" />
      <circle cx="1000" cy="325" r="3" fill="#ef4444" opacity="0.35" />

      <rect x="0" y="348" width="1200" height="1.5" fill="#BF5700" opacity="0.08" />
    </svg>
  );
}
