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
// Body count: City of Austin, Office of the City Auditor, April 2023.
// ============================================================================
const DATA = {
  meetings: {
    totalWords: 47505839,
    totalMeetings: 2588,
    totalChunks: 27446,
    totalHours: 5108,
    officialBodies: 93,   // City Auditor April 2023 Special Report: 55 in City Code + 38 additional
    swagitBodies: 84,     // bodies with recordings in Swagit archive
    activeInData: 42,     // bodies with 20+ meetings in our analysis window
    dateRange: { start: "2020-12-08", end: "2026-02-12" },
    swagitVideos: 9455,
    swagitYearSpan: 36,
  },

  // Top government bodies by meeting count (from body_inventory)
  topBodies: [
    { name: "Planning Commission", meetings: 118, avgWords: 29118, cont: 2.77 },
    { name: "Zoning & Platting", meetings: 109, avgWords: 9258, cont: 2.55 },
    { name: "City Council", meetings: 103, avgWords: 47801, cont: 2.97 },
    { name: "Environmental Commission", meetings: 92, avgWords: 24426, cont: 1.94 },
    { name: "Council Work Session", meetings: 90, avgWords: 27453, cont: 2.26 },
    { name: "Housing Finance Corp", meetings: 80, avgWords: 1161, cont: 1.97 },
    { name: "Historic Landmark", meetings: 58, avgWords: 29399, cont: 2.36 },
    { name: "Cap Metro", meetings: 58, avgWords: 18216, cont: 1.68 },
    { name: "Public Safety Commission", meetings: 57, avgWords: 17836, cont: 1.98 },
    { name: "Water & Wastewater", meetings: 56, avgWords: 9868, cont: 1.36 },
    { name: "Community Development", meetings: 55, avgWords: 21261, cont: 1.85 },
    { name: "Parks & Recreation", meetings: 54, avgWords: 28500, cont: 2.27 },
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
    { label: "0\u201310%", cont: 1.92, testimony: 2.31, complexity: 2.64 },
    { label: "10\u201320%", cont: 2.13, testimony: 2.29, complexity: 2.92 },
    { label: "20\u201330%", cont: 2.15, testimony: 2.19, complexity: 2.94 },
    { label: "30\u201340%", cont: 2.16, testimony: 2.16, complexity: 2.97 },
    { label: "40\u201350%", cont: 2.20, testimony: 2.13, complexity: 2.99 },
    { label: "50\u201360%", cont: 2.14, testimony: 2.09, complexity: 2.96 },
    { label: "60\u201370%", cont: 2.16, testimony: 2.06, complexity: 2.94 },
    { label: "70\u201380%", cont: 2.17, testimony: 2.03, complexity: 2.88 },
    { label: "80\u201390%", cont: 2.00, testimony: 1.92, complexity: 2.59 },
    { label: "90\u2013100%", cont: 1.75, testimony: 1.72, complexity: 2.23 },
  ],

  // Rhetoric trends by year
  rhetoricByYear: [
    { year: 2021, cont: 2.04, urgency: 2.22, testimony: 2.06, complexity: 2.71, meetings: 543 },
    { year: 2022, cont: 2.15, urgency: 2.13, testimony: 2.04, complexity: 2.89, meetings: 488 },
    { year: 2023, cont: 2.13, urgency: 2.15, testimony: 2.18, complexity: 2.80, meetings: 480 },
    { year: 2024, cont: 2.10, urgency: 2.16, testimony: 2.17, complexity: 2.88, meetings: 525 },
    { year: 2025, cont: 1.98, urgency: 2.14, testimony: 2.13, complexity: 2.80, meetings: 488 },
  ],

  // Cross-body issue flows
  crossBodyFlows: {
    home: { meetings: 304, bodies: 63, label: "HOME Initiative" },
    policeReform: { meetings: 60, bodies: 12, label: "Police Reform" },
    winterStorm: { meetings: 46, bodies: 18, label: "Winter Storm Uri" },
  },

  // Ephemeral bodies of note
  ephemeralHighlights: [
    { name: "Reimagining Public Safety Task Force", days: 8 },
    { name: "Winter Storm Review Task Force", days: 98 },
    { name: "Redistricting Commission", days: 188 },
  ],

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

  // Recurring testifiers (verified against pass2 extraction files)
  regulars: [
    { name: "Zenobia Joseph", meetings: 122, bodies: 25, role: "Resident, community advocate" },
    { name: "Monica Guzman", meetings: 102, bodies: 16, role: "Policy Director, Go Austin/Vamos Austin (GAVA)" },
  ],

  // AHFC vs Planning Commission juxtaposition
  juxtaposition: {
    light: { name: "Housing Finance Corp", avgWords: 1161, meetings: 80, cont: 1.97 },
    heavy: { name: "Planning Commission", avgWords: 29118, meetings: 118, cont: 2.77 },
    ratio: 25,
  },

  // Testimony quotes used in narrative (verified video_ids from pass2 extractions)
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

  // Featured quotes for MentionCard gallery
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
};

const SOURCES: Source[] = [
  {
    title: "Special Report: Boards and Commissions",
    outlet: "City of Austin, Office of the City Auditor (April 2023)",
    url: "https://www.austintexas.gov/page/boards-and-commissions",
    accessDate: "2026-03-10",
  },
  {
    title: "Boards and Commissions \u2014 Official Active List",
    outlet: "City of Austin",
    url: "https://www.austintexas.gov/boards-and-commissions",
    accessDate: "2026-03-10",
  },
  {
    title: "Austin City Government Meeting Archives",
    outlet: "Austin TX Swagit",
    url: "https://austintx.new.swagit.com/",
    accessDate: "2026-02-13",
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
];

// Table of contents
const TOC_SECTIONS = [
  { id: "the-machine", label: "The Machine", number: "01" },
  { id: "at-the-microphone", label: "At the Microphone", number: "02" },
  { id: "the-flow", label: "The Flow", number: "03" },
  { id: "the-paradox", label: "The Paradox", number: "04" },
  { id: "the-arc", label: "The Arc", number: "05" },
  { id: "voices", label: "Voices", number: "\u2014" },
];

// ============================================================================
// ARTICLE-LOCAL COMPONENTS
// ============================================================================

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

function SentimentBadge({ sentiment }: { sentiment: string }) {
  const color = sentiment === "positive" ? "#10b981" : sentiment === "negative" ? "#ef4444" : "#6b7280";
  return (
    <span className="au-sentiment-badge">
      <span className="au-sentiment-dot" style={{ background: color }} />
      {sentiment}
    </span>
  );
}

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
          { value: DATA.meetings.officialBodies.toString(), label: "Official Bodies" },
          { value: DATA.meetings.totalHours.toLocaleString(), label: "Hours of Deliberation" },
        ]}
        finding="We transcribed 2,588 Austin government meetings and classified 47.5 million words with AI. The most passionate meetings end in the most lopsided votes."
      />

      <LedeSection />
      <MachineSection />
      <MicrophoneSection />
      <FlowSection />
      <ParadoxSection />
      <ArcSection />
      <VoicesSection />
      <CloseSection />

      <MethodologySection
        prefix="au"
        title="How We Built This Analysis"
        items={[
          {
            label: "Meeting Transcripts",
            content: `${DATA.meetings.totalMeetings.toLocaleString()} meetings from the Austin TX Swagit archive were transcribed using AssemblyAI with speaker diarization. Total corpus: ${(DATA.meetings.totalWords / 1e6).toFixed(1)} million words across ${DATA.meetings.swagitBodies} government bodies, spanning ${DATA.meetings.dateRange.start} to ${DATA.meetings.dateRange.end}. Austin officially maintains ${DATA.meetings.officialBodies} boards, commissions, and task forces (City Auditor, April 2023).`,
          },
          {
            label: "AI Classification",
            content: `Each transcript was split into ~2,000-word chunks (${DATA.meetings.totalChunks.toLocaleString()} total). Claude Sonnet classified each chunk for topics, urgency, contentiousness, personal testimony, and technical complexity on 1\u20135 scales. Claude Opus then extracted quotes, speakers, and context from the highest-scoring chunks.`,
          },
          {
            label: "Cross-Body Analysis",
            content: `Issues were tracked across bodies using keyword matching and speaker identification. HOME Initiative references appeared in ${DATA.crossBodyFlows.home.meetings} meetings across ${DATA.crossBodyFlows.home.bodies} bodies. Police reform appeared in ${DATA.crossBodyFlows.policeReform.meetings} meetings across ${DATA.crossBodyFlows.policeReform.bodies} bodies.`,
          },
          {
            label: "Limitations",
            content: "AI classification is probabilistic, not deterministic. Contentiousness scores reflect language patterns in transcripts, not observer assessments. Speaker identification depends on transcription accuracy. Cross-body tracking may undercount issues discussed under different terminology.",
          },
        ]}
      />

      <SocialShare title="Five Thousand Hours" />
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
          <span className="au-hero-title-accent">Five Thousand</span>
          <br />
          <span>Hours</span>
        </h1>

        <p className="au-hero-subtitle">
          What a city says when it thinks nobody is listening
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
// LEDE — Scale, methodology, foreshadow the paradox
// ============================================================================
function LedeSection() {
  return (
    <FadeIn className="au-editorial-section">
      <div className="au-body-prose">
        <p>
          On a Wednesday evening in December 2023, Monica Guzman stepped
          to the microphone at Austin City Hall for the hundred and second
          time. She was not the most frequent speaker in our dataset. That
          distinction belongs to another resident who has appeared at{" "}
          {DATA.regulars[0].meetings} meetings across{" "}
          {DATA.regulars[0].bodies} different government bodies. But
          Guzman&rsquo;s persistence illustrates something the numbers
          cannot: what it means to keep showing up.
        </p>
        <p>
          We know the count because we transcribed every public meeting
          Austin held between December 2020 and February 2026&mdash;
          {DATA.meetings.totalMeetings.toLocaleString()} meetings,{" "}
          {(DATA.meetings.totalWords / 1e6).toFixed(1)} million words, recorded
          by the city&rsquo;s{" "}
          <a href="https://austintx.new.swagit.com/" target="_blank" rel="noopener noreferrer">
          Swagit video archive</a> across{" "}
          {DATA.meetings.swagitBodies} government bodies spanning{" "}
          {DATA.meetings.swagitYearSpan} years. We split the transcripts into{" "}
          {DATA.meetings.totalChunks.toLocaleString()} chunks, classified each
          one by topic, urgency, contentiousness, and personal testimony using
          AI, then extracted the most significant quotes, speakers, and context
          in a second pass.
        </p>
        <p>
          Austin officially maintains{" "}
          {DATA.meetings.officialBodies} boards, commissions, and task
          forces&mdash;more than most American cities of comparable size,
          according to a{" "}
          <a href="https://www.austintexas.gov/page/boards-and-commissions" target="_blank" rel="noopener noreferrer">
          2023 City Auditor special report</a>. Our archive captured
          proceedings from {DATA.meetings.swagitBodies} of them. The
          result&mdash;{(DATA.meetings.totalWords / 1e6).toFixed(1)} million
          words of public record, analyzed and structured&mdash;is the largest
          analysis of American municipal discourse we are aware of.
        </p>
        <p>
          We found something counterintuitive buried in the data. The most
          passionate meetings&mdash;the ones where residents testify for hours,
          where people cry and accuse their representatives of
          betrayal&mdash;consistently end in the most lopsided votes.
        </p>
      </div>
    </FadeIn>
  );
}

// ============================================================================
// 01 — THE MACHINE: 93 bodies, Wednesday rhythm, topics, volume vs. heat
// ============================================================================
function MachineSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { ref: calRef, isVisible: calVisible } = useIntersectionObserver({ threshold: 0.15 });
  const { ref: topicRef, isVisible: topicVisible } = useIntersectionObserver({ threshold: 0.15 });

  const topicColors = ["#BF5700", "#c4522e", "#f0944a", "#a89e92", "#8a7e72", "#6b5e52", "#e87040", "#d4714a"];

  return (
    <section ref={ref} id="the-machine" className="au-wide-section au-section-border">
      <div className="au-section-header" style={{ maxWidth: 720, margin: "0 auto", padding: "0 1.5rem" }}>
        <span className="au-section-num">01</span>
        <h2 className="au-section-title">The Machine</h2>
      </div>

      <FadeIn className="au-editorial-section" style={{ paddingTop: "1rem" }}>
        <div className="au-body-prose">
          <p>
            Austin officially maintains{" "}
            {DATA.meetings.officialBodies} boards, commissions, and task
            forces&mdash;55 established in the City Code, the rest created by
            council resolution. Not departments. Deliberative bodies, each with
            its own dais, agenda, and sign-up sheet for public comment. Of these,{" "}
            {DATA.meetings.activeInData} held 20 or more meetings during our
            analysis period: permanent institutions that meet month after month,
            accumulating institutional memory and procedural efficiency.
          </p>
          <p>
            City Council meetings generate the most words per session, averaging{" "}
            {DATA.topBodies[2].avgWords.toLocaleString()}&mdash;the equivalent
            of a short novel every time the full council convenes. Planning
            Commission runs close behind at{" "}
            {DATA.topBodies[0].avgWords.toLocaleString()}. The Housing Finance
            Corporation, by contrast, averages just{" "}
            {DATA.juxtaposition.light.avgWords.toLocaleString()} words per
            meeting&mdash;roughly eight minutes of speech. Both deal with
            housing policy. The difference is preparation: AHFC&rsquo;s staff
            vets proposals in committee, addresses objections in advance, and
            presents a recommendation to the board. Functional government is
            boring.
          </p>
          <p>
            Wednesday is the day Austin governs:{" "}
            {DATA.dayDistribution[2].count} of{" "}
            {DATA.meetings.totalMeetings.toLocaleString()} meetings&mdash;
            {DATA.dayDistribution[2].pct}%&mdash;fall midweek. Saturday
            accounts for {DATA.dayDistribution[5].count}. Sunday,{" "}
            {DATA.dayDistribution[6].count}. By Friday the city has
            largely stopped deliberating.
          </p>
        </div>
      </FadeIn>

      <div className="au-chart-wrap">
        <div className="au-chart-title">
          Top {DATA.topBodies.length} Government Bodies by Meeting Frequency
        </div>
        <BodyBubbleChart isVisible={isVisible} />
        <div className="au-chart-subtitle">
          Showing the {DATA.topBodies.length} most active of{" "}
          {DATA.meetings.activeInData} bodies with 20+ meetings.
          Size = number of meetings. Source: Austin TX Swagit.
        </div>
      </div>

      <div ref={calRef} className="au-chart-wrap" style={{ marginTop: "2rem" }}>
        <div className="au-chart-title">Meetings by Day of Week</div>
        <svg viewBox="0 0 750 200" preserveAspectRatio="xMidYMid meet">
          {DATA.dayDistribution.map((d, i) => {
            const maxCount = Math.max(...DATA.dayDistribution.map(x => x.count));
            const barWidth = (d.count / maxCount) * 400;
            const y = i * 26 + 10;
            const isWed = d.day === "Wed";
            return (
              <g key={d.day}>
                <text x="90" y={y + 16} textAnchor="end" fontSize="12"
                  fill={isWed ? "#BF5700" : "#a89e92"} fontWeight={isWed ? 600 : 400}
                  fontFamily="var(--font-sans)">
                  {d.full}
                </text>
                <rect
                  x={100} y={y + 2}
                  width={calVisible ? barWidth : 0} height={18}
                  rx={3}
                  fill={isWed ? "#BF5700" : "#8a7e72"}
                  opacity={isWed ? 0.8 : 0.4}
                  style={{ transition: `width 0.8s var(--ease-elegant) ${i * 80}ms` }}
                />
                {calVisible && (
                  <text x={100 + barWidth + 8} y={y + 16} fontSize="11"
                    fontWeight="600" fill={isWed ? "#BF5700" : "#a89e92"}
                    fontFamily="var(--font-sans)">
                    {d.count} ({d.pct}%)
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <FadeIn className="au-editorial-section" style={{ paddingTop: "1rem" }}>
        <div className="au-body-prose">
          <p>
            Budget and finance dominates Austin&rsquo;s deliberative bandwidth,
            consuming {DATA.topicShares[0].pct}% of all classified discourse.
            Land use and zoning takes {DATA.topicShares[1].pct}%, housing and
            affordability {DATA.topicShares[2].pct}%. Together, those three
            topics account for more than 57% of everything Austin&rsquo;s
            government talks about.
          </p>
          <p>
            The gap between volume and heat tells the real story. Budget
            hearings are longer and more frequent, but their tone is
            procedural&mdash;line items, departmental presentations, actuarial
            projections. Housing debates generate the highest contentiousness
            scores. People cry at these meetings. They describe being priced
            out of the city their families built. Austin talks about money more
            than anything else but fights about housing harder than anything
            else.
          </p>
        </div>
      </FadeIn>

      <div ref={topicRef} className="au-chart-wrap">
        <div className="au-chart-title">Share of Deliberation by Topic</div>
        <svg viewBox="0 0 750 280" preserveAspectRatio="xMidYMid meet">
          {DATA.topicShares.map((t, i) => {
            const maxPct = DATA.topicShares[0].pct;
            const barWidth = (t.pct / maxPct) * 380;
            const y = i * 32 + 10;
            const isTop3 = i < 3;
            return (
              <g key={t.topic}>
                <text x="200" y={y + 17} textAnchor="end" fontSize="11"
                  fill={isTop3 ? "#f5efe6" : "#a89e92"} fontWeight={isTop3 ? 600 : 400}
                  fontFamily="var(--font-sans)">
                  {t.topic}
                </text>
                <rect
                  x={210} y={y + 2}
                  width={topicVisible ? barWidth : 0} height={20}
                  rx={3}
                  fill={topicColors[i] || "#6b5e52"}
                  opacity={isTop3 ? 0.8 : 0.5}
                  style={{ transition: `width 0.8s var(--ease-elegant) ${i * 60}ms` }}
                />
                {topicVisible && (
                  <text x={210 + barWidth + 8} y={y + 17} fontSize="11"
                    fontWeight="700" fill={topicColors[i] || "#6b5e52"}
                    fontFamily="var(--font-sans)">
                    {t.pct}%
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        <div className="au-chart-subtitle">
          Percentage of {DATA.meetings.totalChunks.toLocaleString()} classified
          text chunks mentioning each topic. A single chunk can mention multiple
          topics, so shares sum to &gt;100%.
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 02 — AT THE MICROPHONE: What people bring, stated factually
// ============================================================================
function MicrophoneSection() {
  return (
    <section id="at-the-microphone" className="au-wide-section au-section-border">
      <div className="au-section-header" style={{ maxWidth: 720, margin: "0 auto", padding: "0 1.5rem" }}>
        <span className="au-section-num">02</span>
        <h2 className="au-section-title">At the Microphone</h2>
      </div>

      <FadeIn className="au-editorial-section" style={{ paddingTop: "1rem" }}>
        <div className="au-body-prose">
          <p>
            Joe Dubose, a U.S. veteran and VOCAL Texas leader, told a{" "}
            <a href={`https://austintx.new.swagit.com/videos/${DATA.testimonyQuotes[0].videoId}`} target="_blank" rel="noopener noreferrer">
            budget work session in July 2025</a> that a city-organized camp
            sweep had destroyed his late wife&rsquo;s family Bible&mdash;
            &ldquo;20 years of memories gone in 15 minutes.&rdquo; Katie McNiff,
            an EMS field medic, told the council in June 2022 she could not
            afford a birthday present for her nine-year-old without overtime.
            Christina Pollard, a teacher and waitress who clocks 65 to 75 hours
            a week, testified at the{" "}
            <a href="https://austintx.new.swagit.com/videos/283723" target="_blank" rel="noopener noreferrer">
            December 2023 HOME hearing</a> that she was &ldquo;nowhere closer
            to home ownership.&rdquo; Julie Damian testified before the{" "}
            <a href={`https://austintx.new.swagit.com/videos/${DATA.testimonyQuotes[3].videoId}`} target="_blank" rel="noopener noreferrer">
            Planning Commission in May 2023</a> about her son Cade, whose head
            became trapped in a fence outside their home. She was advocating for
            fence safety standards. She came back two months later to testify
            again.
          </p>
          <p>
            Housing generated the most testimony in our dataset. The HOME Phase 1
            hearing ran thirteen hours; our analysis extracted 768 quotes. The
            Phase 2 hearing the following May produced 927&mdash;the most of any
            meeting we analyzed. The testimony was contradictory and sincere.
            &ldquo;A duplex is a home. A triplex is a home. An apartment is a
            home. A home is a home is a home,&rdquo; said Lan Ani, the son of
            refugees. Alexandria Anderson, chair of the Martin Luther King
            Neighborhood Association, delivered the statistic that hung over the
            entire debate: &ldquo;In 10 years, the Black population has decreased
            by 66%. The Latino population has decreased by 33%. And the white
            population has increased by 442%.&rdquo;
          </p>
          <p>
            The{" "}
            <a href="https://austintx.new.swagit.com/videos/208390" target="_blank" rel="noopener noreferrer">
            February 15, 2023 police contract session</a> scored{" "}
            {DATA.hotMeetings[0].cont} on our contentiousness
            scale&mdash;the highest of any meeting in the dataset. Linda Nuno
            told the council: &ldquo;It doesn&rsquo;t matter if I am speaking
            Swahili, French or Japanese. You&rsquo;re still not hearing the
            voice of the people.&rdquo; The contract passed over vehement
            objection.
          </p>
          <p>
            Sam Kirsch, shot in the head with a less-lethal round by Austin
            police in May 2020, testified{" "}
            <a href="https://austintx.new.swagit.com/videos/116828" target="_blank" rel="noopener noreferrer">
            for the first time in March 2021</a>. He came back 11 times across
            four years. In{" "}
            <a href="https://austintx.new.swagit.com/videos/343677" target="_blank" rel="noopener noreferrer">
            May 2025</a>, he returned: &ldquo;Five weeks ago, my eye had to be
            surgically removed. I&rsquo;ll now have to live the rest of my life
            with only one eye and still with constant nerve pain.&rdquo;
          </p>
          <p>
            The Candlewood Suites dispute&mdash;converting a hotel to housing
            for the unhoused&mdash;bounced through 7 bodies over 2 years.
            Henry Morghan, a formerly unhoused resident, spoke at a{" "}
            <a href="https://austintx.new.swagit.com/videos/112547" target="_blank" rel="noopener noreferrer">
            February 2021 council meeting</a>: &ldquo;We&rsquo;re people too.
            This trauma of living on the streets lives with you for a long time.
            But I want you to know that we are neighbors and members of your
            community and we do vote.&rdquo;
          </p>
          <p>
            Some residents appeared at more than 100 meetings across 20 or more
            bodies. The public record does not explain their motives. It records
            their persistence.
          </p>
        </div>
      </FadeIn>

      <PullQuote
        text={"I wrote a speech a while ago to set fire to the unruffled stoicism of this establishment, but I\u2019m all outta fire."}
        city="Austin"
        state="TX"
        className="au-pull-quote"
      />
    </section>
  );
}

// ============================================================================
// 03 — THE FLOW: How issues move through the system
// ============================================================================
function FlowSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });
  const flows = [DATA.crossBodyFlows.home, DATA.crossBodyFlows.policeReform, DATA.crossBodyFlows.winterStorm];
  const maxMeetings = DATA.crossBodyFlows.home.meetings;

  return (
    <section id="the-flow" className="au-wide-section au-section-border">
      <div className="au-section-header" style={{ maxWidth: 720, margin: "0 auto", padding: "0 1.5rem" }}>
        <span className="au-section-num">03</span>
        <h2 className="au-section-title">The Flow</h2>
      </div>

      <FadeIn className="au-editorial-section" style={{ paddingTop: "1rem" }}>
        <div className="au-body-prose">
          <p>
            Austin&rsquo;s governance is not a single body making decisions.
            It is a system of {DATA.meetings.officialBodies} bodies processing
            issues in parallel, with contested policies escalating through
            increasingly authoritative chambers.
          </p>
          <p>
            The HOME Initiative illustrates the pattern. Before the final
            council vote in December 2023, HOME appeared in{" "}
            {DATA.crossBodyFlows.home.meetings} meetings across{" "}
            {DATA.crossBodyFlows.home.bodies} different bodies&mdash;planning
            commissions, neighborhood advisory groups, housing committees, zoning
            boards, community development commissions. Each body added testimony,
            complexity, and political weight. By the time the full council voted,
            the policy had been argued, amended, and argued again across the
            entire deliberative apparatus.
          </p>
          <p>
            The Joint Council and Planning Commission&mdash;a body convened when
            both institutions need to deliberate together&mdash;met only four
            times in our dataset. All four meetings ranked among the most intense
            of any body, a function of their purpose: they assemble only when a
            policy has escalated beyond the capacity of either body alone.
          </p>
          <p>
            Police reform traced a different path. The Reimagining Public Safety
            Task Force was created in June 2020 and dissolved{" "}
            {DATA.ephemeralHighlights[0].days} days later, after recommending
            $210 million in budget reallocation. The task force was ephemeral by
            design&mdash;a pressure valve. But the resulting debate consumed{" "}
            {DATA.crossBodyFlows.policeReform.meetings} meetings across{" "}
            {DATA.crossBodyFlows.policeReform.bodies} bodies over the next two
            years, from Public Safety Commission hearings to council budget work
            sessions.
          </p>
          <p>
            Winter Storm Uri, which struck Austin in February 2021, touched{" "}
            {DATA.crossBodyFlows.winterStorm.bodies} bodies in{" "}
            {DATA.crossBodyFlows.winterStorm.meetings} meetings&mdash;water and
            wastewater commission reviews, emergency management briefings,
            infrastructure oversight, budget amendments. A natural disaster
            became a governance exercise distributed across nearly a fifth of
            the city&rsquo;s official bodies.
          </p>
          <p>
            The pattern is consistent: contested issues escalate through
            Austin&rsquo;s system, each body adding its own hearings, its own
            testimony, its own institutional perspective. The system&rsquo;s
            complexity is not bureaucratic waste. It is distributed
            deliberation.
          </p>
        </div>
      </FadeIn>

      <div ref={ref} className="au-chart-wrap">
        <div className="au-chart-title">Issues Across the System</div>
        <svg viewBox="0 0 750 220" preserveAspectRatio="xMidYMid meet">
          {flows.map((f, i) => {
            const meetingBarW = (f.meetings / maxMeetings) * 450;
            const y = i * 65 + 15;
            return (
              <g key={f.label}>
                <text x="5" y={y + 14} fontSize="12" fontWeight="600"
                  fill="#BF5700" fontFamily="var(--font-sans)">{f.label}</text>
                <rect
                  x={0} y={y + 20}
                  width={isVisible ? meetingBarW : 0} height={22}
                  rx={3}
                  fill="#BF5700"
                  opacity={0.7 - i * 0.15}
                  style={{ transition: `width 0.8s var(--ease-elegant) ${i * 120}ms` }}
                />
                {isVisible && (
                  <text x={meetingBarW + 8} y={y + 36} fontSize="11"
                    fontWeight="600" fill="#a89e92" fontFamily="var(--font-sans)">
                    {f.meetings} meetings &middot; {f.bodies} bodies
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        <div className="au-chart-subtitle">
          Number of meetings and distinct government bodies where each issue appeared.
          Source: AI classification of {DATA.meetings.totalMeetings.toLocaleString()} transcripts.
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 04 — THE PARADOX: Passionate meetings → lopsided votes + meeting anatomy
// ============================================================================
function ParadoxSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });

  const steps = [
    {
      id: "opening",
      content: (
        <StepContent title="Opening" highlight="0\u201310% of meeting">
          <p>
            The room fills. Consent items get read into the record. Residents
            who signed up to speak start arriving. Contentiousness is
            low&mdash;{DATA.contentiousnessArc[0].cont} out of
            5&mdash;because the meeting hasn&rsquo;t started its real work.
            Personal testimony is at its peak ({DATA.contentiousnessArc[0].testimony}):
            the people who showed up early get their chance first.
          </p>
        </StepContent>
      ),
    },
    {
      id: "ramp",
      content: (
        <StepContent title="The Ramp" highlight="20\u201350% of meeting">
          <p>
            The contested items hit the agenda. Staff presentations pile up.
            The audience leans forward. By the halfway mark, contentiousness
            peaks at {DATA.contentiousnessArc[4].cont} and technical complexity
            hits {DATA.contentiousnessArc[4].complexity}&mdash;the densest, most
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
            The speakers who came to tell their stories have finished. Personal
            testimony drops to {DATA.contentiousnessArc[7].testimony}. What
            remains is parliamentary maneuvering&mdash;amendments, motions,
            procedural back-and-forth. The room is still tense but the human
            element has drained out of it.
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
            to {DATA.contentiousnessArc[9].cont}. Council members read remaining
            items into the record. Complexity falls
            to {DATA.contentiousnessArc[9].complexity}. The meeting ends not
            with a vote but with a motion to adjourn.
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
      <svg viewBox={`0 0 ${w} ${h}`} className="au-anatomy-chart" style={{ maxWidth: 600 }} preserveAspectRatio="xMidYMid meet">
        {[1.5, 2.0, 2.5, 3.0].map(v => (
          <g key={v}>
            <line x1={padX} y1={scaleY(v)} x2={w - padX} y2={scaleY(v)}
              stroke="#a89e92" strokeWidth="0.5" opacity="0.2" />
            <text x={padX - 8} y={scaleY(v) + 4} textAnchor="end" fontSize="10"
              fill="#a89e92" fontFamily="var(--font-sans)">{v.toFixed(1)}</text>
          </g>
        ))}
        <rect
          x={scaleX(zone.start) - 5}
          y={padY}
          width={scaleX(zone.end) - scaleX(zone.start) + 10}
          height={plotH}
          fill="#BF5700"
          opacity="0.08"
          rx={4}
        />
        <path d={compPath} fill="none" stroke="#6b5e52" strokeWidth="2" opacity="0.5" />
        <path d={testPath} fill="none" stroke="#10b981" strokeWidth="2" opacity="0.7" />
        <path d={contPath} fill="none" stroke="#BF5700" strokeWidth="2.5" opacity="0.9" />
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
        {["Start", "25%", "50%", "75%", "End"].map((label, i) => (
          <text key={label} x={padX + (i / 4) * plotW} y={h - 8}
            textAnchor="middle" fontSize="10" fill="#a89e92" fontFamily="var(--font-sans)">
            {label}
          </text>
        ))}
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
    <section id="the-paradox" className="au-wide-section au-section-border">
      <div className="au-section-header" style={{ maxWidth: 720, margin: "0 auto", padding: "0 1.5rem" }}>
        <span className="au-section-num">04</span>
        <h2 className="au-section-title">The Paradox</h2>
      </div>

      <FadeIn className="au-editorial-section" style={{ paddingTop: "1rem" }}>
        <div className="au-body-prose">
          <p>
            The central finding of this analysis is counterintuitive. The
            meetings with the highest contentiousness scores&mdash;the ones
            where residents line up to testify for hours, where people cry and
            tell the council they are not being heard&mdash;consistently end
            in lopsided votes.
          </p>
          <p>
            The February 2023 police contract session scored{" "}
            {DATA.hotMeetings[0].cont} and passed overwhelmingly. HOME Phase 1
            scored {DATA.hotMeetings[3].cont} and passed 9-2. The pattern holds
            across the most contentious meetings in our dataset: more heat,
            less uncertainty in the outcome.
          </p>
          <p>
            The simplest explanation is cynical: the decisions are pre-made
            and the hearings are theater. Chicago&rsquo;s city council operated
            this way for decades under the Daleys and Rahm Emanuel; University
            of Illinois researchers documented the pattern.
          </p>
          <p>
            Austin&rsquo;s data supports a more generous reading. The
            city&rsquo;s most divisive issues generated months and sometimes
            years of public testimony before the climactic vote&mdash;HOME
            appeared in {DATA.crossBodyFlows.home.meetings} meetings across{" "}
            {DATA.crossBodyFlows.home.bodies} bodies before the final hearing.
            Council members heard from the same advocates dozens of times. The
            testimony did not change the vote on the night of the final hearing.
            It shaped the policy over the preceding months of committee hearings
            and work sessions. By the time the final meeting arrived, the
            council had already processed the argument. The lopsided vote may be
            the end of a longer democratic process, not evidence that testimony
            was ignored.
          </p>
          <p>
            Neither reading is complete. Linda Nuno clearly did not feel heard.
            Neither did the man escorted out of the HOME hearing
            shouting &ldquo;My people, my people in Austin are hurt.&rdquo; The
            gap between what residents bring to the microphone and what they
            receive back remains the central tension of Austin&rsquo;s
            democratic practice.
          </p>
        </div>
      </FadeIn>

      <div ref={ref} className="au-chart-wrap">
        <div className="au-chart-title">Most Contentious Meetings</div>
        <svg viewBox="0 0 700 300" preserveAspectRatio="xMidYMid meet">
          {DATA.hotMeetings.map((m, i) => {
            const barWidth = (m.cont / 5) * 500;
            const y = i * 68 + 20;
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
          Contentiousness scores (1&ndash;5 scale) computed from AI classification.
          The most heated meetings consistently produce lopsided votes.
        </div>
      </div>

      <PullQuote
        text={"My people, my people in Austin are hurt."}
        city="Austin"
        state="TX"
        className="au-pull-quote"
      />

      <FadeIn className="au-editorial-section" style={{ paddingTop: "2rem" }}>
        <div className="au-body-prose">
          <p>
            Every one of these {DATA.meetings.totalMeetings.toLocaleString()} meetings
            follows the same arc. We averaged the contentiousness, personal
            testimony, and technical complexity across all{" "}
            {DATA.meetings.totalChunks.toLocaleString()} classified chunks,
            grouped by position within the meeting. The pattern is strikingly
            consistent: a slow ramp, a mid-meeting peak, and a sharp collapse
            in the final quarter.
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
// 05 — THE ARC: Cooling trend + institutional resilience
// ============================================================================
function ArcSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });

  return (
    <section ref={ref} id="the-arc" className="au-wide-section au-section-border">
      <div className="au-section-header" style={{ maxWidth: 720, margin: "0 auto", padding: "0 1.5rem" }}>
        <span className="au-section-num">05</span>
        <h2 className="au-section-title">The Arc</h2>
      </div>

      <FadeIn className="au-editorial-section" style={{ paddingTop: "1rem" }}>
        <div className="au-body-prose">
          <p>
            Austin&rsquo;s contentiousness peaked in 2022 at{" "}
            {DATA.rhetoricByYear[1].cont.toFixed(2)} and has declined every
            year since, reaching {DATA.rhetoricByYear[4].cont.toFixed(2)} in
            2025. The city still holds nearly{" "}
            {DATA.rhetoricByYear[4].meetings} meetings a year, but the language
            is calmer. Technical complexity&mdash;a measure of how substantive
            the discussions are&mdash;has remained flat around 2.8 to 2.9. The
            meetings are just as serious. They are less acrimonious.
          </p>
          <p>
            The HOME Initiative passed; the housing debate moved from argument
            to implementation.{" "}
            <a href="https://www.texastribune.org/2024/05/17/austin-lot-size-housing-affordability/" target="_blank" rel="noopener noreferrer">
            Applications in newly eligible zones jumped 86% in the first
            year.</a> The police reckoning of 2020&ndash;2023&mdash;the protests,
            the beanbag rounds, the contract fights&mdash;evolved into oversight
            and reform. The housing market itself cooled:{" "}
            <a href="https://www.wsj.com/real-estate/austin-texas-housing-market-cooldown-f0388afb" target="_blank" rel="noopener noreferrer">
            the Wall Street Journal called Austin&rsquo;s price reversal</a> the
            most dramatic in the country, easing the existential pressure that
            drove residents to microphones in tears.
          </p>
          <p>
            Austin processed its hardest questions&mdash;about race,
            displacement, policing, and growth&mdash;and came out with lower
            temperatures and intact democratic institutions. Displacement
            continues. Affordability remains desperate for many. The water
            system faces infrastructure challenges that the next decade will
            amplify. This is not a happy ending. It is an institutional
            resilience story: a city that argued exhaustively, decided, and
            kept arguing.
          </p>
        </div>
      </FadeIn>

      <div className="au-chart-wrap">
        <div className="au-chart-title">Rhetoric Trends, 2021&ndash;2025</div>
        <TrendChart isVisible={isVisible} />
        <div className="au-chart-subtitle">
          Average scores across all classified chunks per year.
          Contentiousness declining; complexity stable.
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// VOICES — MentionCard gallery + Swagit embeds
// ============================================================================
function VoicesSection() {
  return (
    <section id="voices" className="au-wide-section au-section-border">
      <div className="au-section-header" style={{ maxWidth: 720, margin: "0 auto", padding: "0 1.5rem" }}>
        <span className="au-section-num">&mdash;</span>
        <h2 className="au-section-title">Voices</h2>
      </div>

      <FadeIn className="au-editorial-section" style={{ paddingTop: "1rem" }}>
        <div className="au-body-prose">
          <p>
            The numbers describe patterns. These voices describe what people
            bring to a government microphone when it is the only power they
            have. All quotes are from the public record. Each links to the
            source video in Austin&rsquo;s Swagit archive.
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
              HOME Phase 1 &mdash; The Most Consequential Zoning Vote in Austin&rsquo;s Recent History
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
// CLOSE
// ============================================================================
function CloseSection() {
  return (
    <FadeIn className="au-editorial-section" style={{ paddingTop: "2rem" }}>
      <div className="au-body-prose">
        <p>
          Forty-seven and a half million words, most of them spoken on Wednesday
          nights, most of them by people who showed up because they believed
          it mattered.
        </p>
        <p>
          Monica Guzman has attended {DATA.regulars[1].meetings} meetings.
          Zenobia Joseph, {DATA.regulars[0].meetings}. Sam Kirsch testified 11
          times across four years, losing an eye in the interval. Joe Dubose
          came to a budget hearing to talk about his wife&rsquo;s Bible. Katie
          McNiff came to explain that she cannot afford groceries.
        </p>
        <p>
          No algorithm can measure what it costs to testify. But the{" "}
          {DATA.meetings.totalMeetings.toLocaleString()} meetings in this
          dataset are proof that a city of a million people still governs itself
          in the oldest way there is: by showing up, speaking up, and trusting
          that someone is listening.
        </p>
      </div>
    </FadeIn>
  );
}

// ============================================================================
// CHARTS
// ============================================================================

/** Bubble chart showing top government bodies by meeting frequency */
function BodyBubbleChart({ isVisible }: { isVisible: boolean }) {
  const bubbles = useMemo(() => {
    return DATA.topBodies.map((b, i) => ({
      name: b.name,
      r: Math.max(10, Math.sqrt(b.meetings) * 3.8),
      meetings: b.meetings,
      cx: 140 + (i % 3) * 260,
      cy: 70 + Math.floor(i / 3) * 110,
    }));
  }, []);

  return (
    <svg viewBox="0 0 880 480" className="au-bubble-chart" preserveAspectRatio="xMidYMid meet">
      {bubbles.map((b, i) => (
        <g key={i}>
          <circle
            cx={b.cx}
            cy={b.cy}
            r={isVisible ? b.r : 0}
            fill="#BF5700"
            opacity={0.6}
            style={{
              transition: `r 0.6s var(--ease-elegant) ${i * 40}ms`,
            }}
          />
          {isVisible && (
            <>
              <text
                x={b.cx}
                y={b.cy + b.r + 14}
                textAnchor="middle"
                fontSize="9"
                fill="#a89e92"
                fontFamily="var(--font-sans)"
              >
                {b.name}
              </text>
              <text
                x={b.cx}
                y={b.cy + 4}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill="#fff"
                fontFamily="var(--font-sans)"
                opacity="0.9"
              >
                {b.meetings}
              </text>
            </>
          )}
        </g>
      ))}
    </svg>
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
    <svg viewBox={`0 0 ${w} ${h}`} className="au-trend-chart" preserveAspectRatio="xMidYMid meet">
      {[1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0].map(v => (
        <g key={v}>
          <line x1={padX} y1={scaleY(v)} x2={w - padX} y2={scaleY(v)}
            stroke="#a89e92" strokeWidth="0.5" opacity="0.15" />
          <text x={padX - 8} y={scaleY(v) + 4} textAnchor="end" fontSize="10"
            fill="#a89e92" fontFamily="var(--font-sans)">{v.toFixed(1)}</text>
        </g>
      ))}
      {data.map((d, i) => (
        <text key={d.year} x={scaleX(i)} y={h - 8} textAnchor="middle"
          fontSize="11" fill="#a89e92" fontFamily="var(--font-sans)">{d.year}</text>
      ))}
      {isVisible && (
        <>
          <path d={makePath(d => d.complexity)} fill="none" stroke="#6b5e52" strokeWidth="2" opacity="0.5" strokeDasharray="5 4" />
          <path d={makePath(d => d.urgency)} fill="none" stroke="#f0944a" strokeWidth="2" opacity="0.6" />
          <path d={makePath(d => d.testimony)} fill="none" stroke="#10b981" strokeWidth="2" opacity="0.7" />
          <path d={makePath(d => d.cont)} fill="none" stroke="#BF5700" strokeWidth="2.5" />
          {data.map((d, i) => (
            <g key={d.year}>
              <circle cx={scaleX(i)} cy={scaleY(d.cont)} r="4" fill="#BF5700" />
              <circle cx={scaleX(i)} cy={scaleY(d.testimony)} r="3" fill="#10b981" />
              <circle cx={scaleX(i)} cy={scaleY(d.urgency)} r="3" fill="#f0944a" />
            </g>
          ))}
        </>
      )}
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
// AUSTIN SKYLINE SVG — Hero illustration
// ============================================================================
function AustinSkylineSVG() {
  return (
    <svg viewBox="0 0 1200 400" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
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
    </svg>
  );
}
