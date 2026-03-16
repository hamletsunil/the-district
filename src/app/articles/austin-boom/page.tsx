"use client";

import { useState, useEffect } from "react";
import { AtAGlance } from "@/components/article/AtAGlance";
import { MethodologySection } from "@/components/article/MethodologySection";
import { ArticleEndCTA } from "@/components/article/ArticleEndCTA";
import { SourcesCitations } from "@/components/article/SourcesCitations";
import { SubscribeBar } from "@/components/article/SubscribeBar";
import { SocialShare } from "@/components/article/SocialShare";
import { PullQuote } from "@/components/article/PullQuote";
import { TableOfContents } from "@/components/article/TableOfContents";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
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
    { name: "Cap Metro (transit authority)", meetings: 58, avgWords: 18216, cont: 1.68 },
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
    { name: "Reimagining Public Safety Task Force", days: 304 },  // June 2020 to April 2021
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

  // Topic prevalence by year (% of chunks where topic appeared)
  // Source: analysis_results.json → topics_by_year (verified against austin-meetings.json)
  // Excluding 2020 (only 5 meetings) and 2026 (incomplete year)
  topicsByYear: [
    { year: 2021, budget: 55.0, housing: 38.2, safety: 34.7, environment: 30.6, landUse: 37.0, transport: 22.6, infra: 26.9, econDev: 23.2 },
    { year: 2022, budget: 55.5, housing: 41.2, safety: 26.6, environment: 35.5, landUse: 42.9, transport: 26.7, infra: 31.2, econDev: 28.2 },
    { year: 2023, budget: 52.2, housing: 38.5, safety: 28.0, environment: 38.6, landUse: 42.6, transport: 30.0, infra: 30.3, econDev: 25.5 },
    { year: 2024, budget: 57.4, housing: 40.7, safety: 24.6, environment: 41.8, landUse: 40.1, transport: 25.7, infra: 32.6, econDev: 25.2 },
    { year: 2025, budget: 60.9, housing: 36.0, safety: 31.5, environment: 36.9, landUse: 32.5, transport: 26.5, infra: 32.0, econDev: 28.0 },
  ],

  // Policy milestones for chart annotations
  policyMilestones: [
    { year: 2021, month: 5, label: "Prop B", topic: "safety" },
    { year: 2023, month: 12, label: "HOME Phase 1", topic: "housing" },
    { year: 2024, month: 5, label: "HOME Phase 2", topic: "housing" },
  ],

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
      text: "Kade died less than five minutes after having a peanut-butter-free snack at the kitchen table after school with his brothers. In less than five minutes, our lives were changed forever.",
      speaker: "Julie Damian",
      role: "Mother of Kade Damian",
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
      speaker: "Jade Lovera",
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
      startSeconds: 1801,
      sentiment: "negative",
    },
    {
      text: "A duplex is a home. A triplex is a home. An apartment is a home. A single family is a home. A home is a home is a home.",
      speaker: "Lan Ani",
      role: "Resident, son of refugees",
      meeting: "HOME Phase 1 Hearing",
      date: "Dec 7, 2023",
      videoId: "283723",
      startSeconds: 11701,
      sentiment: "positive",
    },
    {
      text: "We\u2019re people too\u2026 this trauma of living on the streets lives with you for a long time. But I want you to know that we are neighbors and members of your community and we do vote.",
      speaker: "Henry Morghan",
      role: "Formerly unhoused resident",
      meeting: "City Council",
      date: "Feb 4, 2021",
      videoId: "112547",
      startSeconds: 21603,
      sentiment: "positive",
    },
    {
      text: "I was born and raised in central Austin, and I\u2019m a fourth generation Austinite. I don\u2019t think my children will be fifth generation Austinites. This is the end of the line for my family.",
      speaker: "Ella Thompson",
      role: "Resident",
      meeting: "HOME Phase 2 Hearing",
      date: "May 16, 2024",
      videoId: "305483",
      startSeconds: 15601,
      sentiment: "negative",
    },
    {
      text: "City staff says there are 19,757 vacant houses. Why haven\u2019t you done something about them first?",
      speaker: "Barbara Epstein",
      role: "Hancock Neighborhood Assoc.",
      meeting: "HOME Phase 2 Hearing",
      date: "May 16, 2024",
      videoId: "305483",
      startSeconds: 308,
      sentiment: "negative",
    },
    {
      text: "I wrote a speech a while ago to set fire to the unruffled stoicism of this establishment, but I\u2019m all outta fire.",
      speaker: "Christina Pollard",
      role: "Teacher and waitress",
      meeting: "Joint Council & Planning Commission",
      date: "Oct 26, 2023",
      videoId: "277617",
      startSeconds: 17401,
      sentiment: "negative",
    },
    {
      text: "Each year when I get that property tax bill and it has gone up incrementally every year, I\u2019m wondering: is this going to be the year that I\u2019m not going to be able to pay that increase?",
      speaker: "Marva Overton",
      role: "Resident",
      meeting: "HOME Phase 2 Hearing",
      date: "May 16, 2024",
      videoId: "305483",
      startSeconds: 606,
      sentiment: "negative",
    },
    {
      text: "It doesn\u2019t matter if I am speaking Swahili, French or Japanese. You\u2019re still not hearing the voice of the people.",
      speaker: "Linda Nuno",
      role: "Resident",
      meeting: "Special City Council \u2014 Police Contract",
      date: "Feb 15, 2023",
      videoId: "208390",
      startSeconds: 301,
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
  { id: "the-vote", label: "The Vote Was Always 9-2", number: "01" },
  { id: "ninety-three-rooms", label: "Ninety-Three Rooms, One City", number: "02" },
  { id: "the-agenda", label: "The Agenda Knew First", number: "03" },
  { id: "three-minutes", label: "Three Minutes at the Microphone", number: "04" },
  { id: "the-fever", label: "The Fever Broke", number: "05" },
  { id: "she-came-back", label: "She Came Back 122 Times", number: "06" },
  { id: "voices", label: "In Their Own Words", number: "\u2014" },
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

function MentionCard({ quote }: { quote: typeof DATA.featuredQuotes[number] }) {
  const initials = quote.speaker.split(" ").map(w => w[0]).join("").slice(0, 2);

  return (
    <div className="au-mention-card" style={{ borderLeftColor: "rgba(191, 87, 0, 0.4)" }}>
      <div className="au-mention-header">
        <div className="au-mention-avatar">{initials}</div>
        <div className="au-mention-meta">
          <div className="au-mention-speaker">{quote.speaker}</div>
          <div className="au-mention-role">{quote.role}</div>
          <div className="au-mention-meeting">{quote.meeting} &middot; {quote.date}</div>
        </div>
      </div>
      <blockquote className="au-mention-text">&ldquo;{quote.text}&rdquo;</blockquote>
      <a
        href={`https://austintx.new.swagit.com/videos/${quote.videoId}${quote.startSeconds ? `?start=${quote.startSeconds}` : ""}`}
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
        finding="The meetings with the most testimony produce the most lopsided votes—five years of deliberation across ninety-three bodies, 47.5 million words, and the question of whether any of it changed the outcome."
      />

      <LedeSection />
      <ParadoxSection />
      <SystemSection />
      <AgendaSection />
      <MicrophoneSection />
      <TemperatureSection />

      {/* Breathing moment — cognitive rest between charts and the human finale */}
      <FadeIn className="au-breathing-moment">
        <div className="au-breathing-number">{DATA.regulars[0].meetings}</div>
        <div className="au-breathing-caption">
          meetings attended by one resident across {DATA.regulars[0].bodies} city bodies
        </div>
      </FadeIn>

      <RegularsSection />
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
            content: "AI classification is probabilistic, not deterministic. Contentiousness reflects language patterns associated with disagreement, accusation, and emotional intensity in transcript text. The scale was not calibrated against human coders and should be interpreted as a relative measure, not an absolute one; scores below 2.0 indicate largely procedural discussion, scores above 3.0 indicate significant rhetorical conflict. Quotes were extracted by AI and cross-referenced against Swagit video metadata; transcription relies on AssemblyAI and some passages may contain minor errors. Speaker identification depends on transcription accuracy. Cross-body tracking uses keyword matching and may undercount issues discussed under different terminology. The analysis window begins mid-pandemic; virtual meeting formats may affect participation patterns in the earlier data. Capital Metropolitan Transportation Authority (Cap Metro) meetings are included in the Swagit archive but Cap Metro is a separate governmental entity, not a City of Austin body.",
          },
        ]}
      />

      <SocialShare title="Forty-Seven Million Words" />
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
          <span className="au-hero-title-accent">Forty-Seven Million</span>
          <br />
          <span>Words</span>
        </h1>

        <p className="au-hero-subtitle">
          Austin talked for five thousand hours. We read the transcripts.
        </p>

        <p className="au-hero-byline">
          By <a href="https://www.linkedin.com/in/sunilrajaraman" target="_blank" rel="noopener noreferrer" className="au-byline-link">Sunil Rajaraman</a> &middot; March 2026
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
// LEDE — Establish scale and context
// ============================================================================
function LedeSection() {
  return (
    <FadeIn className="au-editorial-section">
      <div className="au-body-prose">
        <p>
          We transcribed every public meeting Austin held between
          December 2020 and February 2026&mdash;
          {DATA.meetings.totalMeetings.toLocaleString()} meetings,{" "}
          {(DATA.meetings.totalWords / 1e6).toFixed(1)} million words,{" "}
          {DATA.meetings.totalHours.toLocaleString()} hours of deliberation
          across{" "}
          {DATA.meetings.swagitBodies} government bodies. We classified
          every passage for topic, urgency, and contentiousness using AI,
          then extracted the most significant quotes and speakers.
        </p>
        <p>
          The window captures Austin at its most volatile. The Austin metro
          area grew 33% between 2010 and 2020, the fastest rate of any
          major American metro. Median home prices doubled, briefly touching
          $550,000 before the market reversed. A failed five-year attempt
          to rewrite the land development code (CodeNEXT, more than $8 million spent,
          abandoned in 2018) left the zoning debate unfinished. The pandemic
          pushed many early meetings onto Zoom. Voters approved a $7.1 billion
          transit expansion (Project Connect) in November 2020. And then the
          city tried to
          process all of it&mdash;housing, policing, displacement,
          growth&mdash;through 93 deliberative bodies, in public, on the
          record.
        </p>
      </div>
    </FadeIn>
  );
}

// ============================================================================
// 02 — THE SYSTEM: How Austin's 93-body apparatus processes contested issues
// ============================================================================
function SystemSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });
  const flows = [DATA.crossBodyFlows.home, DATA.crossBodyFlows.policeReform, DATA.crossBodyFlows.winterStorm];
  const maxMeetings = DATA.crossBodyFlows.home.meetings;

  return (
    <section id="ninety-three-rooms" className="au-wide-section au-section-border">
      <div className="au-section-header" style={{ maxWidth: 720, margin: "0 auto", padding: "0 1.5rem" }}>
        <span className="au-section-num">02</span>
        <h2 className="au-section-title">Ninety-Three Rooms, One City</h2>
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
            analysis period.
          </p>
          <p>
            The gap between Austin&rsquo;s heaviest and lightest bodies reveals
            what these institutions actually do. Planning Commission meetings
            average {DATA.juxtaposition.heavy.avgWords.toLocaleString()} words
            per session&mdash;the equivalent of a short novel every time the
            commission convenes. The Housing Finance Corporation, which also
            deals with housing policy, averages just{" "}
            {DATA.juxtaposition.light.avgWords.toLocaleString()} words per
            meeting&mdash;roughly eight minutes of speech. The difference is
            preparation: AHFC&rsquo;s staff vets proposals in committee,
            addresses objections in advance, and presents a recommendation to
            the board. Functional government is boring by design. City
            Council meetings, by contrast,
            average {DATA.topBodies[2].avgWords.toLocaleString()} words per
            session&mdash;the most of any body&mdash;with a contentiousness
            score of {DATA.topBodies[2].cont}, also the highest. Planning
            Commission meets more often ({DATA.topBodies[0].meetings} sessions);
            City Council produces the most heat per meeting.
          </p>
          <p>
            Contested issues are different. They escalate through the system,
            each body adding its own hearings, its own testimony, its own
            institutional perspective. The HOME Initiative appeared
            in {DATA.crossBodyFlows.home.meetings} meetings across{" "}
            {DATA.crossBodyFlows.home.bodies} bodies before the final
            council vote in December 2023&mdash;planning commissions,
            neighborhood advisory groups, housing committees, zoning boards,
            community development commissions. Police reform consumed{" "}
            {DATA.crossBodyFlows.policeReform.meetings} meetings across{" "}
            {DATA.crossBodyFlows.policeReform.bodies} bodies. Winter Storm Uri
            touched {DATA.crossBodyFlows.winterStorm.bodies} bodies in{" "}
            {DATA.crossBodyFlows.winterStorm.meetings} meetings&mdash;water
            and wastewater commission reviews, emergency management briefings,
            infrastructure oversight, budget amendments.
          </p>
          <p>
            Some of these bodies are ephemeral. The Reimagining Public Safety
            Task Force was created in the summer of 2020. The council had
            already voted in August 2020 to reallocate roughly $150 million
            from the police department; the task force spent ten months
            developing recommendations for how to use those funds and
            proposing further reforms. The task force dissolved. The
            debate it catalyzed did not&mdash;police reform consumed dozens
            of meetings across a dozen bodies for years afterward, from
            Public Safety Commission hearings to council budget work sessions.
            The complexity serves a purpose&mdash;the same objections get
            aired in different rooms, by different officials, before reaching
            the final vote.
          </p>
        </div>
      </FadeIn>

      <div ref={ref} className="au-chart-wrap">
        <div className="au-chart-title">Issues Across the System</div>
        <svg viewBox="0 0 750 220" preserveAspectRatio="xMidYMid meet">
          {flows.map((f, i) => {
            const meetingBarW = (f.meetings / maxMeetings) * 400;
            const y = i * 65 + 15;
            const ox = 100;
            return (
              <g key={f.label}>
                <text x={ox + 5} y={y + 14} fontSize="12" fontWeight="600"
                  fill="#BF5700" fontFamily="var(--font-sans)">{f.label}</text>
                <rect
                  x={ox} y={y + 20}
                  width={isVisible ? meetingBarW : 0} height={22}
                  rx={3}
                  fill="#BF5700"
                  opacity={0.7 - i * 0.15}
                  style={{ transition: `width 0.8s var(--ease-elegant) ${i * 120}ms` }}
                />
                {isVisible && (
                  <text x={ox + meetingBarW + 8} y={y + 36} fontSize="11"
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
// 03 — THE AGENDA: Does meeting chatter predict policy?
// ============================================================================
function AgendaSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });

  return (
    <section id="the-agenda" className="au-wide-section au-section-border">
      <div className="au-section-header" style={{ maxWidth: 720, margin: "0 auto", padding: "0 1.5rem" }}>
        <span className="au-section-num">03</span>
        <h2 className="au-section-title">The Agenda Knew First</h2>
      </div>

      <FadeIn className="au-editorial-section" style={{ paddingTop: "1rem" }}>
        <div className="au-body-prose">
          <p>
            Austin&rsquo;s government published 2,588 meeting agendas over five
            years. Read backward, they are a forecast. The topics that consumed
            the most airtime consistently predicted the legislation that
            followed&mdash;not immediately, but within twelve to twenty-four
            months.
          </p>
          <p>
            Public Safety spiked to 34.7% of all meeting discussion
            in 2021&mdash;its highest point in the dataset. Prop B, a
            citizen-driven ballot initiative overriding the council&rsquo;s
            2019 repeal of the camping ban, passed that May. Safety discourse
            then collapsed to
            24.6% by 2024; the issue had been legislatively resolved, even if
            the underlying problem had not. Housing &amp; Affordability
            dominated 2021 and 2022 at 38&ndash;41% of meeting discussion, the
            long tail of the CodeNEXT failure and a city watching its median
            home price approach $550,000. HOME Phase 1 passed in December 2023,
            Phase 2 the following May. Housing&rsquo;s share of meeting
            discourse fell to 36.0% by 2025&mdash;the argument moved from
            &ldquo;whether&rdquo; to &ldquo;implementation.&rdquo;
          </p>
          <p>
            Budget &amp; Finance, meanwhile, has climbed from
            55.0% of meeting discussion in 2021 to 60.9% in 2025. The city
            shifted from &ldquo;how do we house everyone&rdquo; to &ldquo;how
            do we pay for what we promised.&rdquo; Fiscal austerity measures
            are arriving now.
          </p>
          <p>
            The pattern has one notable exception. Environment &amp;
            Sustainability climbed steadily from 30.6% to 41.8% between 2021
            and 2024&mdash;Austin Energy rate debates, I-35 expansion reviews,
            water supply concerns during drought years&mdash;yet produced no
            signature legislation. Prop B forced a vote because activists
            collected enough signatures to put it on the ballot. HOME forced
            a vote because a thirteen-hour hearing backed council into a
            binary choice. Budget cuts forced votes because the money ran
            out. The environment has consumed enormous meeting time but
            nothing has yet forced the question.
          </p>
        </div>
      </FadeIn>

      <div ref={ref} className="au-chart-wrap">
        <div className="au-chart-title">What Austin Talked About</div>
        <TopicHeatmap isVisible={isVisible} />
        <div className="au-chart-subtitle">
          How often each topic came up in Austin&rsquo;s meetings, year by year.
          Darker = that topic dominated more of the discussion. A single meeting can
          cover multiple topics, so columns may add up to more than 100%.
        </div>
      </div>
    </section>
  );
}

/** Heatmap grid: 4 topic rows × 5 year columns */
function TopicHeatmap({ isVisible }: { isVisible: boolean }) {
  const data = DATA.topicsByYear;
  const w = 650;
  const h = 280;
  const labelW = 130;
  const cellW = 90;
  const cellH = 42;
  const gapX = 6;
  const gapY = 6;
  // Center the grid: total width = labelW + 10 + 5*(cellW+gapX) - gapX
  const totalGridW = labelW + 10 + data.length * (cellW + gapX) - gapX;
  const offsetX = Math.max(0, (w - totalGridW) / 2);
  const gridStartX = offsetX + labelW + 10;
  const gridStartY = 50;

  type TopicKey = "budget" | "housing" | "safety" | "environment";
  const rows: { key: TopicKey; label: string; color: string }[] = [
    { key: "budget", label: "Budget & Finance", color: "#BF5700" },
    { key: "housing", label: "Housing", color: "#10b981" },
    { key: "safety", label: "Public Safety", color: "#ef4444" },
    { key: "environment", label: "Environment", color: "#f59e0b" },
  ];

  // Normalize opacity per-row (min→0.25, max→0.90)
  const getOpacity = (key: TopicKey, val: number) => {
    const vals = data.map(d => d[key]);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    if (max === min) return 0.6;
    return 0.25 + 0.65 * (val - min) / (max - min);
  };

  // Milestone annotations mapped to column positions
  const milestones: { col: number; label: string; offset?: number }[] = [
    { col: 0, label: "Prop B" },
    { col: 2, label: "HOME 1", offset: 18 },
    { col: 3, label: "HOME 2", offset: 18 },
  ];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="au-heatmap-chart" preserveAspectRatio="xMidYMid meet">
      {/* Year headers */}
      {data.map((d, ci) => (
        <text key={d.year} x={gridStartX + ci * (cellW + gapX) + cellW / 2} y={28}
          textAnchor="middle" fontSize="12" fontWeight="700"
          fill="#a89e92" fontFamily="var(--font-sans)">{d.year}</text>
      ))}
      {/* Milestone annotations */}
      {milestones.map(m => (
        <text key={m.label} x={gridStartX + m.col * (cellW + gapX) + cellW / 2}
          y={40} textAnchor="middle" fontSize="8" fill="#a89e92"
          fontFamily="var(--font-sans)" opacity="0.5">{m.label}</text>
      ))}
      {/* Grid */}
      {rows.map((row, ri) => {
        const y = gridStartY + ri * (cellH + gapY);
        return (
          <g key={row.key}>
            {/* Row label */}
            <text x={offsetX + labelW} y={y + cellH / 2 + 4} textAnchor="end"
              fontSize="11" fontWeight="600" fill={row.color}
              fontFamily="var(--font-sans)">{row.label}</text>
            {/* Cells */}
            {data.map((d, ci) => {
              const x = gridStartX + ci * (cellW + gapX);
              const val = d[row.key];
              const op = getOpacity(row.key, val);
              const delay = (ri * data.length + ci) * 60;
              return (
                <g key={ci}>
                  <rect x={x} y={y} width={cellW} height={cellH} rx={6}
                    fill={row.color}
                    opacity={isVisible ? op : 0.08}
                    style={{ transition: `opacity 0.6s var(--ease-elegant) ${delay}ms` }} />
                  <text x={x + cellW / 2} y={y + cellH / 2 + 5}
                    textAnchor="middle" fontSize="12" fontWeight="600"
                    fill="#f5efe6" fontFamily="var(--font-sans)"
                    opacity={isVisible ? 1 : 0}
                    style={{ transition: `opacity 0.5s var(--ease-elegant) ${delay + 200}ms` }}>
                    {val.toFixed(1)}%
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

// ============================================================================
// 04 — AT THE MICROPHONE: What people bring, stated factually
// ============================================================================
function MicrophoneSection() {
  return (
    <section id="three-minutes" className="au-wide-section au-section-border">
      <div className="au-section-header" style={{ maxWidth: 720, margin: "0 auto", padding: "0 1.5rem" }}>
        <span className="au-section-num">04</span>
        <h2 className="au-section-title">Three Minutes at the Microphone</h2>
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
            Planning Commission in May 2023</a> about the death of her son Kade,
            advocating for fence safety standards. She came back two months later
            to testify again.
          </p>
          <p>
            Housing generated the most testimony in our dataset. The HOME Phase 1
            hearing ran thirteen hours; our analysis extracted 768 quotes. The
            Phase 2 hearing the following May produced 927&mdash;the most of any
            meeting we analyzed. The testimony was contradictory and sincere.
            &ldquo;A duplex is a home. A triplex is a home. An apartment is a
            home. A home is a home is a home,&rdquo; said Lan Ani, the son of
            refugees. Alexandria Anderson, chair of the Martin Luther King
            Neighborhood Association in District 1, delivered the number that
            hung over the entire debate&mdash;the demographic transformation of
            her east Austin neighborhood: &ldquo;In 10 years, the Black
            population has decreased by 66%. The Latino population has decreased
            by 33%. And the white population has increased by 442%.&rdquo;
          </p>
          <p>
            The{" "}
            <a href="https://austintx.new.swagit.com/videos/208390" target="_blank" rel="noopener noreferrer">
            February 15, 2023 police contract session</a> scored{" "}
            {DATA.hotMeetings[0].cont} on our contentiousness
            scale&mdash;the highest of any meeting in the dataset. Linda Nuno
            told the council: &ldquo;It doesn&rsquo;t matter if I am speaking
            Swahili, French or Japanese. You&rsquo;re still not hearing the
            voice of the people.&rdquo; The vote was 9-2.
          </p>
          <p>
            Sam Kirsch was shot in the face with a less-lethal round by
            Austin police during the May 2020 protests&mdash;an injury the
            city later{" "}
            <a href="https://www.kvue.com/article/news/politics/austin-mayor-and-council/austin-settlement-man-injured-2020-social-justice-black-lives-matter-protests-sam-kirsch/269-1f111e3e-dfe3-4168-a3f2-d1b59de77073" target="_blank" rel="noopener noreferrer">
            settled for $4.5 million</a>. He testified{" "}
            <a href="https://austintx.new.swagit.com/videos/116828" target="_blank" rel="noopener noreferrer">
            for the first time in March 2021</a>. He came back across
            four years. In{" "}
            <a href="https://austintx.new.swagit.com/videos/343677" target="_blank" rel="noopener noreferrer">
            May 2025</a>, he returned: &ldquo;Five weeks ago, my eye had to be
            surgically removed. I&rsquo;ll now have to live the rest of my life
            with only one eye and still with constant nerve pain.&rdquo;
          </p>
          <p>
            The Candlewood Suites dispute&mdash;converting a hotel to housing
            for the unhoused&mdash;bounced through multiple bodies over three years.
            Henry Morghan, a formerly unhoused resident, spoke at a{" "}
            <a href="https://austintx.new.swagit.com/videos/112547" target="_blank" rel="noopener noreferrer">
            February 2021 council meeting</a>: &ldquo;We&rsquo;re people too.
            This trauma of living on the streets lives with you for a long time.
            But I want you to know that we are neighbors and members of your
            community and we do vote.&rdquo;
          </p>
          <p>
            Some residents appeared at more than 100 meetings across 20 or
            more bodies. The transcripts do not say why they kept coming back.
            They only show that they did.
          </p>
        </div>
      </FadeIn>

      <PullQuote
        text={"I wrote a speech a while ago to set fire to the unruffled stoicism of this establishment, but I\u2019m all outta fire."}
        city="Christina Pollard"
        state="teacher and waitress"
        className="au-pull-quote"
      />
    </section>
  );
}

// ============================================================================
// 01 — THE PARADOX: Passionate meetings → lopsided votes + meeting anatomy
// ============================================================================
function ParadoxSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });
  const { ref: arcRef, isVisible: arcVisible } = useIntersectionObserver({ threshold: 0.15 });

  return (
    <section id="the-vote" className="au-wide-section au-section-border">
      <div className="au-section-header" style={{ maxWidth: 720, margin: "0 auto", padding: "0 1.5rem" }}>
        <span className="au-section-num">01</span>
        <h2 className="au-section-title">The Vote Was Always 9-2</h2>
      </div>

      <FadeIn className="au-editorial-section" style={{ paddingTop: "1rem" }}>
        <div className="au-body-prose">
          <p>
            The meetings with the highest contentiousness scores&mdash;the
            ones where residents line up to testify for hours, where people
            cry and tell the council they are not being heard&mdash;consistently
            end in lopsided votes. The February 2023 police contract session
            scored {DATA.hotMeetings[0].cont} on our five-point scale, the
            highest of any meeting in the dataset. Council voted 9-2 to direct negotiators toward a one-year contract.
            HOME Phase 1 scored {DATA.hotMeetings[3].cont} after thirteen hours
            of testimony. It passed 9-2.
          </p>
          <p>
            The simplest explanation is cynical: the decisions are pre-made
            and the hearings are theater. Chicago&rsquo;s city council operated
            this way for decades under the Daleys and Rahm Emanuel; University
            of Illinois researchers documented the pattern. But Austin&rsquo;s
            data supports a more generous reading. HOME appeared
            in {DATA.crossBodyFlows.home.meetings} meetings across{" "}
            {DATA.crossBodyFlows.home.bodies} bodies before the final council
            vote&mdash;planning commissions, neighborhood advisory groups,
            housing committees, zoning boards. Council members heard from the
            same advocates dozens of times. Several HOME provisions were
            revised through multiple rounds before the final vote;
            the city&rsquo;s own{" "}
            <a href="https://www.austintexas.gov/page/home-amendments" target="_blank" rel="noopener noreferrer">
            HOME amendments page</a> documents the changes. The testimony did
            not change the vote on the night of the final hearing. It shaped
            the policy over the preceding months. The lopsided vote may be the
            end of a longer democratic process, not evidence that testimony
            was ignored.
          </p>
          <p>
            Linda Nuno clearly did not feel heard.
            Neither did the man escorted out of the HOME hearing
            shouting &ldquo;My people, my people in Austin are hurt.&rdquo;
          </p>
        </div>
      </FadeIn>

      <div ref={ref} className="au-chart-wrap">
        <div className="au-chart-title">Most Contentious Meetings</div>
        <svg viewBox="0 0 700 300" preserveAspectRatio="xMidYMid meet">
          {DATA.hotMeetings.map((m, i) => {
            const barWidth = (m.cont / 5) * 450;
            const y = i * 68 + 20;
            const ox = 75;
            return (
              <g key={m.videoId}>
                <text x={ox + 5} y={y + 14} fontSize="11" fontWeight="600"
                  fill="#BF5700" fontFamily="var(--font-sans)">
                  {m.title}
                </text>
                <text x={ox + 5} y={y + 28} fontSize="9"
                  fill="#a89e92" fontFamily="var(--font-sans)">
                  {m.date} &middot; {m.topics.join(", ")}
                </text>
                <rect
                  x={ox} y={y + 34}
                  width={isVisible ? barWidth : 0} height={16}
                  rx={3}
                  fill="#BF5700"
                  opacity={0.7 - i * 0.1}
                  style={{ transition: `width 0.8s var(--ease-elegant) ${i * 100}ms` }}
                />
                {isVisible && (
                  <text x={ox + barWidth + 8} y={y + 47} fontSize="12"
                    fontWeight="700" fill="#BF5700" fontFamily="var(--font-sans)">
                    {m.cont.toFixed(2)}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        <div className="au-chart-subtitle">
          How heated each meeting got, on a 1&ndash;5 scale (higher = more intense conflict).
          The most heated meetings all ended the same way: lopsided votes.
        </div>
      </div>

      <PullQuote
        text={"My people, my people in Austin are hurt."}
        city="Audience member"
        state="escorted out after speaking"
        className="au-pull-quote"
      />

      <FadeIn className="au-editorial-section" style={{ paddingTop: "2rem" }}>
        <div className="au-body-prose">
          <p>
            We measured how heated, personal, and technical every
            segment of every meeting was, then averaged across
            all {DATA.meetings.totalMeetings.toLocaleString()} meetings by position. The pattern
            is consistent: personal testimony peaks early, conflict
            crests at midpoint ({DATA.contentiousnessArc[4].cont} out of 5),
            and both collapse in the final quarter as the room empties and
            the remaining business turns procedural. The people who showed up
            to be heard have gone home. The vote happens anyway.
          </p>
        </div>
      </FadeIn>

      <div ref={arcRef} className="au-chart-wrap">
        <div className="au-chart-title">Anatomy of a Meeting</div>
        <MeetingThermometer isVisible={arcVisible} />
        <div className="au-chart-subtitle">
          Each segment is a 10% slice of the meeting, from opening (left) to adjournment (right).
          Hotter color = more conflict. Averaged across {DATA.meetings.totalMeetings.toLocaleString()} meetings.
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 05 — THE TEMPERATURE: Cooling trend + institutional resilience
// ============================================================================
function TemperatureSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });

  return (
    <section ref={ref} id="the-fever" className="au-wide-section au-section-border">
      <div className="au-section-header" style={{ maxWidth: 720, margin: "0 auto", padding: "0 1.5rem" }}>
        <span className="au-section-num">05</span>
        <h2 className="au-section-title">The Fever Broke</h2>
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
            <a href="https://www.texaspolicy.com/austins-simple-fix-for-soaring-housing-costs/" target="_blank" rel="noopener noreferrer">
            Single-family building permits jumped 86% in the first
            year</a>, according to the Texas Public Policy Foundation. The police controversy
            of 2020&ndash;2023&mdash;the protests, the beanbag rounds, the
            contract fights&mdash;evolved into oversight and reform. The housing market itself cooled:{" "}
            <a href="https://www.wsj.com/real-estate/austin-texas-housing-market-cooldown-f0388afb" target="_blank" rel="noopener noreferrer">

            The Wall Street Journal called Austin&rsquo;s price reversal</a> the
            most dramatic in the country, easing the existential pressure that
            drove residents to microphones in tears.
          </p>
          <p>
            Displacement continues. Affordability remains desperate for
            many. The water system faces infrastructure challenges that the
            next decade will amplify. But the 93 bodies that argue over
            these problems have not stopped convening.
          </p>
        </div>
      </FadeIn>

      <div className="au-chart-wrap">
        <div className="au-chart-title">How the Rhetoric Shifted</div>
        <SlopeChart isVisible={isVisible} />
        <div className="au-chart-subtitle">
          How the tone of Austin&rsquo;s meetings changed from 2021 to 2025.
          Conflict is cooling. Technical depth held steady.
        </div>
      </div>

      <FadeIn className="au-editorial-section" style={{ paddingTop: "1.5rem" }}>
        <div className="au-body-prose">
          <p>
            The cooling was not uniform. Housing &amp; Affordability&mdash;the
            topic most associated with emotional testimony&mdash;fell from
            41.2% to 36.0% of meeting discourse between 2022 and 2025. Public
            Safety dropped from 26.6% in 2022 to 24.6% by 2024 before
            rebounding. What rose steadily was Budget &amp; Finance:
            55.5% to 60.9%. Budget discussions are inherently less contentious,
            conducted in spreadsheet language rather than testimony language. The
            temperature dropped partly because the topic mix itself shifted
            toward procedural fiscal management and away from identity-laden
            debates about where people live and how they are policed.
          </p>
          <p>
            The exception is personal testimony, which ticked upward in
            2023&ndash;2024 (from 2.04 in 2022 to 2.18 in 2023) even as contentiousness
            continued declining. This is the HOME effect. The two HOME hearings
            generated enormous testimony volume&mdash;768 and 927 extracted
            quotes respectively&mdash;at relatively controlled contentiousness.
            The city channeled enormous emotion through procedure. The people
            who testified might call that something less flattering.
          </p>
        </div>
      </FadeIn>
    </section>
  );
}

// ============================================================================
// THE REGULARS — Who keeps showing up (prose bridge to Voices)
// ============================================================================
function RegularsSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });

  return (
    <section id="she-came-back" className="au-wide-section au-section-border">
      <div className="au-section-header" style={{ maxWidth: 720, margin: "0 auto", padding: "0 1.5rem" }}>
        <span className="au-section-num">06</span>
        <h2 className="au-section-title">She Came Back 122 Times</h2>
      </div>

      <FadeIn className="au-editorial-section">
        <div className="au-body-prose" ref={ref}>
          <p>
            Most residents attend a city meeting once, maybe twice&mdash;a
            zoning fight near their block, a noise complaint that got personal.
            Then there are the regulars.
          </p>
          <p>
            Zenobia Joseph has appeared at {DATA.regulars[0].meetings} meetings
            across {DATA.regulars[0].bodies} different city bodies&mdash;planning
            commissions, budget hearings, audit committees, utility oversight
            boards. She brings printouts. She asks questions that officials
            cannot or will not answer. She comes back the next month and
            asks again. Monica Guzman, Policy
            Director at Go Austin/Vamos Austin, has attended{" "}
            {DATA.regulars[1].meetings} meetings across{" "}
            {DATA.regulars[1].bodies} bodies, translating displacement data into
            testimony that has become a fixture of Austin&rsquo;s housing
            policy discussions.
          </p>
          <p>
            These are not outliers. Austin&rsquo;s transcript archive surfaces
            dozens of names that recur across years and bodies&mdash;residents for whom Wednesday night public comment has become
            as routine as Wednesday itself. Sam
            Kirsch testified across four years about police
            accountability, losing an eye in the interval between his first and last
            appearance. He kept coming back.
          </p>
          <p>
            They are the people who remember what was promised
            in 2021 and show up in 2024 to ask what happened.
          </p>
        </div>
      </FadeIn>
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
        <h2 className="au-section-title">In Their Own Words</h2>
      </div>

      <FadeIn className="au-editorial-section" style={{ paddingTop: "1rem" }}>
        <div className="au-body-prose">
          <p>
            All quotes below are from the public record. Each links to the
            source video in Austin&rsquo;s Swagit archive.
          </p>
        </div>
      </FadeIn>

      {/* Swagit Embed: HOME Phase 1 */}
      <FadeIn className="au-editorial-section" style={{ paddingTop: 0 }}>
        <div className="au-video-embed">
          <div className="au-video-embed-frame">
            <iframe
              src="https://austintx.new.swagit.com/videos/283723/embed?start=3600"
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
              src="https://austintx.new.swagit.com/videos/208390/embed?start=5400"
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
          Forty-seven and a half million words. About 80% of all
          meetings fall Monday through Wednesday&mdash;a schedule that
          self-selects for retirees, activists, and anyone whose employer
          tolerates a midday absence. The 0.7% of meetings held on weekends
          is not a scheduling detail. It is a barrier. The analysis window
          begins in December 2020, which means some of these meetings were
          held on Zoom during the pandemic&mdash;expanding access for some
          residents and narrowing it for others.
        </p>
        <p>
          Linda Nuno told the council it did not matter what language she
          spoke&mdash;they were not hearing her. The council voted 9-2.
          Zenobia Joseph has attended {DATA.regulars[0].meetings} meetings.
          The council has heard her testimony so many times that several
          members could nearly recite it. None of this has stopped her.
        </p>
        <p>
          Forty-seven million words, and Zenobia Joseph is still
          bringing printouts.
        </p>
      </div>
    </FadeIn>
  );
}

// ============================================================================
// CHARTS
// ============================================================================

/** Gradient thermometer — contentiousness arc across a meeting's duration */
function MeetingThermometer({ isVisible }: { isVisible: boolean }) {
  const arc = DATA.contentiousnessArc;
  const w = 650;
  const h = 150;
  const segW = 54;
  const segH = 48;
  const gap = 4;
  const totalW = arc.length * segW + (arc.length - 1) * gap;
  const startX = (w - totalW) / 2;

  // Interpolate between cool brown and hot burnt orange
  const coolR = 107, coolG = 94, coolB = 82;   // #6b5e52
  const hotR = 191, hotG = 87, hotB = 0;       // #BF5700
  const contMin = 1.75;
  const contMax = 2.20;

  const getColor = (v: number) => {
    const t = Math.max(0, Math.min(1, (v - contMin) / (contMax - contMin)));
    const r = Math.round(coolR + t * (hotR - coolR));
    const g = Math.round(coolG + t * (hotG - coolG));
    const b = Math.round(coolB + t * (hotB - coolB));
    return `rgb(${r},${g},${b})`;
  };

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="au-thermometer-chart" preserveAspectRatio="xMidYMid meet">
      {/* Legend */}
      <text x={startX} y={16} fontSize="9" fill="#6b5e52"
        fontFamily="var(--font-sans)" opacity="0.7">&larr; cooler</text>
      <text x={startX + totalW} y={16} textAnchor="end" fontSize="9" fill="#BF5700"
        fontFamily="var(--font-sans)" opacity="0.7">hotter &rarr;</text>

      {arc.map((seg, i) => {
        const x = startX + i * (segW + gap);
        const color = getColor(seg.cont);
        return (
          <g key={i}>
            {/* Segment */}
            <rect
              x={x} y={40}
              width={segW} height={segH}
              rx={4}
              fill={color}
              opacity={isVisible ? 0.85 : 0.15}
              style={{ transition: `opacity 0.5s var(--ease-elegant) ${i * 80}ms` }}
            />
            {/* Value above */}
            <text x={x + segW / 2} y={34} textAnchor="middle"
              fontSize="9" fontWeight="600" fill={color}
              fontFamily="var(--font-sans)"
              opacity={isVisible ? 0.8 : 0}
              style={{ transition: `opacity 0.4s var(--ease-elegant) ${i * 80 + 200}ms` }}>
              {seg.cont.toFixed(2)}
            </text>
            {/* Time label below */}
            <text x={x + segW / 2} y={104} textAnchor="middle"
              fontSize="8" fill="#a89e92" fontFamily="var(--font-sans)" opacity="0.6">
              {seg.label}
            </text>
          </g>
        );
      })}

      {/* Anchor labels */}
      <text x={startX} y={128} fontSize="10" fill="#a89e92"
        fontFamily="var(--font-sans)">Start</text>
      <text x={startX + totalW / 2} y={128} textAnchor="middle" fontSize="10"
        fill="#a89e92" fontFamily="var(--font-sans)">Midpoint</text>
      <text x={startX + totalW} y={128} textAnchor="end" fontSize="10"
        fill="#a89e92" fontFamily="var(--font-sans)">End</text>
    </svg>
  );
}

/** Slope chart: 2021 → 2025 for four rhetoric dimensions (with label collision resolution) */
function SlopeChart({ isVisible }: { isVisible: boolean }) {
  const first = DATA.rhetoricByYear[0]; // 2021
  const last = DATA.rhetoricByYear[DATA.rhetoricByYear.length - 1]; // 2025
  const w = 500;
  const h = 280;
  const leftX = 120;
  const rightX = 380;
  const topY = 50;
  const botY = 250;

  const scaleY = (v: number) => topY + (botY - topY) - ((v - 1.9) / 1.0) * (botY - topY);

  const lines: { label: string; color: string; startVal: number; endVal: number }[] = [
    { label: "Contentiousness", color: "#BF5700", startVal: first.cont, endVal: last.cont },
    { label: "Testimony", color: "#10b981", startVal: first.testimony, endVal: last.testimony },
    { label: "Urgency", color: "#f0944a", startVal: first.urgency, endVal: last.urgency },
    { label: "Complexity", color: "#6b5e52", startVal: first.complexity, endVal: last.complexity },
  ];

  // Resolve label collisions: push overlapping labels apart (min 28px gap)
  const MIN_GAP = 28;
  const resolveCollisions = (positions: { label: string; y: number }[]) => {
    const sorted = [...positions].sort((a, b) => a.y - b.y);
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i].y - sorted[i - 1].y < MIN_GAP) {
        sorted[i].y = sorted[i - 1].y + MIN_GAP;
      }
    }
    return Object.fromEntries(sorted.map(s => [s.label, s.y]));
  };

  const leftYMap = resolveCollisions(lines.map(l => ({ label: l.label, y: scaleY(l.startVal) })));
  const rightYMap = resolveCollisions(lines.map(l => ({ label: l.label, y: scaleY(l.endVal) })));

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="au-trend-chart" preserveAspectRatio="xMidYMid meet">
      {/* Year labels */}
      <text x={leftX} y={35} textAnchor="middle" fontSize="13" fontWeight="700"
        fill="#a89e92" fontFamily="var(--font-sans)">2021</text>
      <text x={rightX} y={35} textAnchor="middle" fontSize="13" fontWeight="700"
        fill="#a89e92" fontFamily="var(--font-sans)">2025</text>
      {/* Vertical axes */}
      <line x1={leftX} y1={topY} x2={leftX} y2={botY} stroke="#a89e92" strokeWidth="0.5" opacity="0.25" />
      <line x1={rightX} y1={topY} x2={rightX} y2={botY} stroke="#a89e92" strokeWidth="0.5" opacity="0.25" />
      {isVisible && lines.map(l => {
        const dataY1 = scaleY(l.startVal);
        const dataY2 = scaleY(l.endVal);
        const labelY1 = leftYMap[l.label];
        const labelY2 = rightYMap[l.label];
        return (
          <g key={l.label}>
            <line x1={leftX} y1={dataY1} x2={rightX} y2={dataY2}
              stroke={l.color} strokeWidth="2.5" opacity="0.85" />
            <circle cx={leftX} cy={dataY1} r="4.5" fill={l.color} />
            <circle cx={rightX} cy={dataY2} r="4.5" fill={l.color} />
            {/* Left label (collision-resolved position) */}
            <text x={leftX - 10} y={labelY1 + 4} textAnchor="end" fontSize="10"
              fill={l.color} fontFamily="var(--font-sans)" fontWeight="600">
              {l.startVal.toFixed(2)}
            </text>
            <text x={leftX - 10} y={labelY1 + 16} textAnchor="end" fontSize="9"
              fill={l.color} fontFamily="var(--font-sans)" opacity="0.7">
              {l.label}
            </text>
            {/* Right label (collision-resolved position) */}
            <text x={rightX + 10} y={labelY2 + 4} textAnchor="start" fontSize="10"
              fill={l.color} fontFamily="var(--font-sans)" fontWeight="600">
              {l.endVal.toFixed(2)}
            </text>
            <text x={rightX + 10} y={labelY2 + 16} textAnchor="start" fontSize="9"
              fill={l.color} fontFamily="var(--font-sans)" opacity="0.7">
              {l.label}
            </text>
          </g>
        );
      })}
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
