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
import "@/styles/articles/marshall-five-years.css";

// ============================================================================
// DATA — Every statistic in this article traces to this object.
//
// Core meeting corpus: meetings.transcript_segment + meetings.transcript_analysis
// across four Granicus archives (Superior, Lafayette, Broomfield, Erie).
// Transcripts via AssemblyAI Nano with diarization. Pass 1 classification by
// Claude Sonnet 4.6 (8-topic closed taxonomy + 4 rhetorical dimensions on 1–5
// scales). Pass 2 quote extraction by Claude Opus 4.6. Featured-quote curation
// and narrative arc by Gemini 3 Pro on the full 2,756-quote pool. Ground-truth
// verified against the raw classification records on 2026-04-22.
//
// External facts (fire losses, settlement, insurance gap, rebuild rates,
// legislative status) are cited to the SOURCES array.
// ============================================================================
const DATA = {
  meetings: {
    totalIngested: 551,
    totalTranscribed: 523,
    totalWords: 10784120,
    coveragePct: 94,
    totalCandidateQuotes: 3595,
    filteredQuotePool: 2756,
    fireDate: "2021-12-30",
    dateRange: { start: "2022-01-01", end: "2026-04-16" },
    jurisdictionsCovered: 4,
  },

  burnZone: {
    homesDestroyed: 1084,           // Boulder County Lessons Learned Report, Dec 2022
    homesDamaged: 149,
    totalEvacuated: 37000,
    cityOfBoulderLosses: 0,
    windsGustMph: 110,              // NIST / NOAA peak gusts during the event
    deaths: 2,
  },

  rebuild: {
    // March 2025 Boulder County After-Action Report snapshot
    overallRebuildRatePct: 76,
    superiorPermittedPct: 74,
    louisvilleRebuiltPct: 90,
    unincorporatedPct: 63,
    nationalFiveYrAvgPct: 25,       // Boulder Reporting Lab synthesis of federal disaster rebuild averages
    boulderModAffordableUnits: 10,  // city + Habitat + school district, announced 2026
    wildfireFundRaised: 43,         // $43M, Community Foundation Boulder County
    wildfireFundDonors: 82000,
    wildfireFundDistributed: 15.1,  // $M distributed via rebuild grants
    wildfireFundDeadline: "June 2025",
  },

  insurance: {
    // Colorado Division of Insurance DOI underinsurance study, May 2022, 951 of 1,084 total-loss policies analyzed
    policiesAnalyzed: 951,
    fullReplacementPct: 8,
    gapAt250Sqft: 98967,
    gapAt300Sqft: 164855,
    gapAt350Sqft: 242670,
    localBuildCostLowSqft: 295,     // Boulder County market, 2022–24
    localBuildCostHighSqft: 335,
    avgPremiumStateWide: 4600,      // Colorado 2025 average, 4th-highest nationally
    premiumIncreasePct2018to2025: 58,
    fairPlanLaunchDate: "2025-04-10",
    fairPlanResidentialCap: 750000,
    doiComplaintsFiled: 180,        // Marshall-specific DOI complaints through 2022
  },

  xcelSettlement: {
    // Colorado Sun + CPR + 9News coverage, Sep 24, 2025
    settlementAmount: 640,           // $M
    settlementDate: "2025-09-24",
    plaintiffCount: 4000,
    xcelInsuranceContribution: 350,  // $M covered by Xcel's insurance
    xcelAdmitsFault: false,           // settlement "without admission of fault"
    xcelAdmitsIgnitionInvolvement: true,
    ignitionSources: ["Xcel power line — Marshall Mesa Trailhead", "possibly Lewis coal seam"],
  },

  legislation: {
    sb23166Title: "Establishment Of A Wildfire Resiliency Code Board",
    sb23166Signed: "2023-05-12",
    cwrcAdoptedByState: "2025-07-01",
    cwrcLocalDeadline: "2026-04-01",
    hb231288Title: "Colorado FAIR Plan Association",
    hb231288Year: 2023,
    fairPlanLaunch: "2025-04-10",
    louisvilleFireHardeningOrd: "Ordinance 1891",
    louisvilleOrdEffectiveDate: "2024-12-10",
    louisvilleMarshallRebuildExemption: true,
  },

  jurisdictions: [
    { name: "Superior",   kind: "town", popYear: 2022, population: 13146, meetingsTranscribed: 190, words: 3983225, firstMeeting: "2022-01-01", lastMeeting: "2025-12-16" },
    { name: "Lafayette",  kind: "city", popYear: 2022, population: 30295, meetingsTranscribed: 253, words: 4889324, firstMeeting: "2022-01-04", lastMeeting: "2026-04-08" },
    { name: "Broomfield", kind: "city", popYear: 2022, population: 73946, meetingsTranscribed: 61,  words: 1643442, firstMeeting: "2022-01-11", lastMeeting: "2023-12-12" },
    { name: "Erie",       kind: "town", popYear: 2022, population: 30447, meetingsTranscribed: 19,  words: 268129,  firstMeeting: "2026-02-23", lastMeeting: "2026-04-16" },
  ],

  insuranceByYear: [
    { year: 2022, chunks: 73 },
    { year: 2023, chunks: 16 },
    { year: 2024, chunks: 7 },
    { year: 2025, chunks: 9 },
    { year: 2026, chunks: 0 },
  ],

  dimensionsByYear: [
    { year: 2022, urgency: 2.08, contentiousness: 2.01, personal_testimony: 1.82, technical_complexity: 2.49 },
    { year: 2023, urgency: 1.74, contentiousness: 1.96, personal_testimony: 1.89, technical_complexity: 2.24 },
    { year: 2024, urgency: 1.61, contentiousness: 1.80, personal_testimony: 1.68, technical_complexity: 2.24 },
    { year: 2025, urgency: 1.60, contentiousness: 1.83, personal_testimony: 1.82, technical_complexity: 2.21 },
    { year: 2026, urgency: 1.59, contentiousness: 1.90, personal_testimony: 1.75, technical_complexity: 2.15 },
  ],

  quoteTopics: [
    { topic: "Rebuild",                 count: 1292, avgIntensity: 3.31, highIntensity: 507 },
    { topic: "Governance & Coordination", count: 821,  avgIntensity: 2.95, highIntensity: 178 },
    { topic: "Wildfire Resilience",     count: 668,  avgIntensity: 3.23, highIntensity: 233 },
    { topic: "Housing & STR",           count: 315,  avgIntensity: 2.77, highIntensity: 43  },
    { topic: "Insurance",               count: 240,  avgIntensity: 3.81, highIntensity: 159 },
    { topic: "Open Space & Fire Mgmt",  count: 116,  avgIntensity: 3.07, highIntensity: 33  },
    { topic: "Climate & Water",         count: 110,  avgIntensity: 2.86, highIntensity: 18  },
    { topic: "Institutional Capital",   count: 33,   avgIntensity: 3.70, highIntensity: 19  },
  ],

  // Rough topic mix share per jurisdiction (percent of that jurisdiction's tagged chunks)
  topicMixByJurisdiction: [
    { jurisdiction: "Superior",  rebuild: 41, wildfire: 22, housing: 10, governance: 14, insurance: 4 },
    { jurisdiction: "Lafayette", rebuild: 12, wildfire: 14, housing: 38, governance: 21, insurance: 2 },
  ],

  speakerID: {
    mentions: 456,
    uniqueIdentified: 37,
    stephanieMillerMentions: 83,
  },

  featuredQuotes: [
    {
      speaker: "Stephan Reinhold",
      role: "Boulder County Parks & Open Space Forester",
      text: "Unfortunately, with the events that happened with the Marshall Fire, we realized there was a major gap in what we were looking at. And we realized we had to involve the grasslands as part of the wildland urban interface. Immediately, the first meeting after the Marshall Fire, we started talking about grasslands and trying to understand what the risks were and what did we miss.",
      jurisdiction: "Superior",
      meeting: "Town Board Meeting",
      date: "Sep 11, 2023",
      videoUrl: "https://archive-video.granicus.com/townofsuperior/townofsuperior_2f35b7e8-33d5-4ef6-9256-840771f8e238.mp4",
      startSeconds: 2180,
      topic: "Open Space & Fire Mgmt",
    },
    {
      speaker: "Jonathan Vai",
      role: "Marshall Fire survivor rebuilding in Sagamore",
      text: "A Twitter user in Boulder just tweeted a few days ago that State Farm will not be renewing his homeowner’s insurance. And this could become a widespread trend among the insurance companies. If all of us who lost homes are going to have to rebuild to this enormous cost and then we can’t get insurance, we’re going to be up a creek without a paddle.",
      jurisdiction: "Superior",
      meeting: "Town Board Meeting",
      date: "Apr 11, 2022",
      videoUrl: "https://archive-video.granicus.com/townofsuperior/townofsuperior_0dacd237-c8c1-4127-8723-3bbb0438423e.mp4",
      startSeconds: 3550,
      topic: "Insurance",
    },
    {
      speaker: "Rodney Mitchell",
      role: "Marshall Fire survivor",
      text: "I’m on my knees and I’m being treated very poorly by State Farm Insurance. I’ve gone to the state of Colorado. I’ve talked to the Department of Insurance regulatory office. I have exhausted nearly every except for litigation. And I’m told that that’s a two year ordeal and there’s a very good chance it’s a 50/50. I put $75,000 on the table. The attorney runs with it. If the attorney fails, I lose the 75 grand and I pay State Farm their insurance.",
      jurisdiction: "Superior",
      meeting: "Town Board Meeting",
      date: "Oct 28, 2024",
      videoUrl: "https://archive-video.granicus.com/townofsuperior/townofsuperior_3528ede5-effa-46bc-a411-9afc45c3ec0e.mp4",
      startSeconds: 1929,
      topic: "Insurance",
    },
    {
      speaker: "Phil Kuffner",
      role: "Sixth-generation Superior resident, fire survivor",
      text: "I didn’t hire a contractor this time. I can’t afford to hire a contractor. The price increase on materials is so high that I cannot. If I don’t build it myself, I can’t rebuild that house. So we’re pounding nails again at 61, the cold months are coming and I’m waiting on a permit.",
      jurisdiction: "Superior",
      meeting: "Town Board Meeting",
      date: "Sep 12, 2022",
      videoUrl: "https://archive-video.granicus.com/townofsuperior/townofsuperior_cbb0fc78-1dfe-4d34-8c41-cfa4d1fc8f1c.mp4",
      startSeconds: 2577,
      topic: "Rebuild",
    },
    {
      speaker: "Michael Friedberg",
      role: "Marshall Fire survivor, underinsured",
      text: "We too are underinsured. We’re living with my parents and we desperately need to rebuild. We’ve only lived there for two years, so we’re in a bad equity position. We’re good friends with the guys at Studio Shed. They build prefab. Since we are underinsured, we’re going to take that settlement and build something small on our side lot, and that allows us to go home.",
      jurisdiction: "Superior",
      meeting: "Town Board Meeting",
      date: "Sep 12, 2022",
      videoUrl: "https://archive-video.granicus.com/townofsuperior/townofsuperior_cbb0fc78-1dfe-4d34-8c41-cfa4d1fc8f1c.mp4",
      startSeconds: 3023,
      topic: "Rebuild",
    },
    {
      speaker: "Mike Neustetter",
      role: "Fire survivor, 212 W. William St. Superior",
      text: "We’re about $160,000 underinsured. And it doesn’t matter what the insurance company does. Like, that’s the number. And so we’re going to everyone we can. I’m going to my grandma, who’s 92 years old and asking her for $500. I’m going to my mom, who is unemployed, doesn’t have money to ever retire. And I’m asking her for money, and she’s like, here’s $150.",
      jurisdiction: "Superior",
      meeting: "Town Board Meeting",
      date: "Apr 25, 2022",
      videoUrl: "https://archive-video.granicus.com/townofsuperior/townofsuperior_6a3f4b95-bc8a-11ec-ae70-0050569183fa.mp4",
      startSeconds: 6716,
      topic: "Insurance",
    },
    {
      speaker: "Shannon Cody",
      role: "Andrew Drive resident, Marshall Fire survivor",
      text: "My husband and I lived in the rubble and ruin of other people’s lives for eight months until it was cleared. And for the almost two years after that of the rebuild which is still in full force. It’s been extremely stressful. It’s loud, it’s dangerous, dirty, it’s scary with all the possible toxins with the intense wind.",
      jurisdiction: "Superior",
      meeting: "Planning Commission Regular Meeting",
      date: "Feb 18, 2025",
      videoUrl: "https://archive-video.granicus.com/townofsuperior/townofsuperior_8d2cc280-0c48-4cef-a731-573b7844d44e.mp4",
      startSeconds: 549,
      topic: "Rebuild",
    },
    {
      speaker: "Lafayette resident",
      role: "Read into record at Planning Commission (speaker unnamed in transcript)",
      text: "The lot on the next block over, two houses down, used to house multiple long-term renters, including a small family with two children who I used to say hi to when they would play on the lawn. I’ve watched that property be purchased by an investor external to the neighborhood who has converted all three small residences into Airbnbs.",
      jurisdiction: "Lafayette",
      meeting: "Planning Commission",
      date: "Jul 26, 2023",
      videoUrl: "https://archive-video.granicus.com/cityoflafayette/cityoflafayette_1bf3ad13-7be7-486d-aa16-32af2e913ea6.mp4",
      startSeconds: 8564,
      topic: "Institutional Capital",
    },
    {
      speaker: "Superior Town Trustee",
      role: "Town Trustee, on ADU zoning and STR conversion risk",
      text: "This is the issue that all the Airbnbs are saying they’re just getting picked. The homes are getting picked up by LLCs. Because that would be an easy way to do this. Right. And just add, you know, 20 different ADUs in different places and move on. I’d rather not see that happen.",
      jurisdiction: "Superior",
      meeting: "Town Board Quarterly Work Session",
      date: "Dec 16, 2024",
      videoUrl: "https://archive-video.granicus.com/townofsuperior/townofsuperior_d4f929d4-bc94-11ef-ab4b-005056a89546.mp4",
      startSeconds: 6626,
      topic: "Institutional Capital",
    },
    {
      speaker: "Lafayette City Council member",
      role: "Addressing post-fire rebuild cost and displacement",
      text: "If we should have a massive event that would cause a large number of our population to lose their homes, the cost of rebuilding means we need an off-ramp in order to not lose the diversity of our community—because now we are pricing our residents out. I think we’re all seeing it live next door in Louisville and Superior and what’s going on in those communities.",
      jurisdiction: "Lafayette",
      meeting: "City Council",
      date: "Sep 06, 2022",
      videoUrl: "https://archive-video.granicus.com/cityoflafayette/cityoflafayette_23cdf077-bafd-4291-9511-e7db75332486.mp4",
      startSeconds: 7265,
      topic: "Rebuild",
    },
    {
      speaker: "Lafayette City Council candidate",
      role: "Speaking at Lafayette special meeting after a Jan 2026 wildland incident",
      text: "Nothing else matters that Lafayette does. If our town burns down, nothing else matters. So hardening our city against wildfire risk is by far the most important issue and by far the biggest threat we face. If conditions had been a little bit different on Monday, if maybe our excellent first responders were responding to another issue and so were a bit delayed getting to Mayhofer, we could have lost a substantial chunk of the city.",
      jurisdiction: "Lafayette",
      meeting: "Special Meeting",
      date: "Jan 09, 2026",
      videoUrl: "https://archive-video.granicus.com/cityoflafayette/cityoflafayette_e389d2e0-fa48-4a9f-bfa4-851f3e1ce615.mp4",
      startSeconds: 4682,
      topic: "Wildfire Resilience",
    },
  ],
};

// ============================================================================
// SOURCES — Tier 1/2 only. News, academic, and government primary records.
// ============================================================================
const SOURCES: Source[] = [
  // Fire facts + investigation
  {
    title: "Marshall Fire Resources — Boulder County Office of Emergency Management",
    outlet: "Boulder County Government",
    url: "https://www.bouldercounty.gov/disasters/marshall-fire/",
    accessDate: "2026-04-22",
  },
  {
    title: "Marshall Fire Operational After-Action Report",
    outlet: "Boulder County Office of Emergency Management",
    url: "https://assets.bouldercounty.gov/wp-content/uploads/2025/03/marshall-fire-operational-after-action-report-003.pdf",
    accessDate: "2026-04-22",
  },
  {
    title: "Marshall Fire Recovery Dashboard",
    outlet: "Boulder County",
    url: "https://bouldercounty.gov/marshall-fire-recovery-dashboard/",
    accessDate: "2026-04-22",
  },
  // Xcel settlement
  {
    title: "Xcel settles Marshall Fire lawsuit just before trial begins in Boulder",
    outlet: "Colorado Public Radio",
    url: "https://www.cpr.org/2025/09/24/xcel-energy-marshall-fire-settlement/",
    accessDate: "2026-04-22",
  },
  {
    title: "Xcel Energy settling Marshall Fire lawsuit for $640 million while admitting no fault",
    outlet: "The Colorado Sun",
    url: "https://coloradosun.com/2025/09/24/xcel-energy-settling-marshall-fire-lawsuit-for-640-million-while-admitting-no-fault/",
    accessDate: "2026-04-22",
  },
  {
    title: "Xcel agrees to $640 million settlement in Marshall Fire lawsuits",
    outlet: "Boulder Reporting Lab",
    url: "https://boulderreportinglab.org/2025/09/24/xcel-agrees-to-640-million-settlement-in-marshall-fire-lawsuits/",
    accessDate: "2026-04-22",
  },
  {
    title: "Xcel Energy reaches agreements in principle to resolve all litigation related to 2021 Marshall Fire",
    outlet: "Xcel Energy Newsroom",
    url: "https://newsroom.xcelenergy.com/news/xcel-energy-reaches-agreements-in-principle-to-resolve-all-litigation-related-to-2021-marshall-fire",
    accessDate: "2026-04-22",
  },
  // Rebuild progress
  {
    title: "Three years after Marshall Fire, two-thirds of homes rebuilt, but struggles persist",
    outlet: "Boulder Reporting Lab",
    url: "https://boulderreportinglab.org/2024/12/29/marshall-fire-recovery-3-years-on-two-thirds-of-homes-rebuilt-far-above-the-national-average-but-hundreds-still-struggle-with-underinsurance-and-waning-support/",
    accessDate: "2026-04-22",
  },
  {
    title: "Boulder built a housing factory. Now it’s rebuilding Marshall Fire homes.",
    outlet: "Boulder Reporting Lab",
    url: "https://boulderreportinglab.org/2026/02/19/boulders-modular-housing-factory-gets-latest-project-rebuilding-marshall-fire-burn-area/",
    accessDate: "2026-04-22",
  },
  {
    title: "Boulder County Wildfire Fund Announces Final Distributions",
    outlet: "Community Foundation Boulder County",
    url: "https://www.commfound.org/blog/boulder-county-wildfire-fund-announces-final-distributions/",
    accessDate: "2026-04-22",
  },
  // Insurance
  {
    title: "Division of Insurance Releases Initial Estimates of Underinsurance for Homes in the Marshall Fire",
    outlet: "Colorado Department of Regulatory Agencies — Division of Insurance",
    url: "https://doi.colorado.gov/news-releases-consumer-advisories/division-of-insurance-releases-initial-estimates-of",
    accessDate: "2026-04-22",
  },
  {
    title: "New research suggests nearly 75 percent of homeowners were underinsured immediately after the Marshall Fire",
    outlet: "Colorado Public Radio",
    url: "https://www.cpr.org/2024/12/30/marshall-fire-homeowners-underinsured-study/",
    accessDate: "2026-04-22",
  },
  {
    title: "Colorado’s property insurer of last resort is now covering more than two dozen families",
    outlet: "The Colorado Sun",
    url: "https://coloradosun.com/2025/07/14/colorado-fair-plan-applications-launch/",
    accessDate: "2026-04-22",
  },
  {
    title: "Why is your Colorado homeowners insurance going up? Ice, fire and a “wildly different” market",
    outlet: "Colorado Public Radio",
    url: "https://www.cpr.org/2024/12/27/colorado-homeowners-insurance-going-up-blame-natural-disasters/",
    accessDate: "2026-04-22",
  },
  {
    title: "Marshall Fire Response — Frequently Asked Questions on Underinsurance",
    outlet: "Colorado Division of Insurance",
    url: "https://doi.colorado.gov/announcements/marshall-fire-response-frequently-asked-questions-on-underinsurance",
    accessDate: "2026-04-22",
  },
  // Building code / legislation
  {
    title: "Colorado Wildfire Resiliency Code — Board adoption, July 2025",
    outlet: "Colorado Division of Fire Prevention and Control",
    url: "https://dfpc.colorado.gov/colorado-wildfire-resiliency-code",
    accessDate: "2026-04-22",
  },
  {
    title: "Louisville requires wildfire-proofing for new homes as Boulder eyes broader fire rules",
    outlet: "Boulder Reporting Lab",
    url: "https://boulderreportinglab.org/2025/01/02/louisville-mandates-wildfire-proofing-for-new-homes-as-boulder-considers-broader-fire-rules/",
    accessDate: "2026-04-22",
  },
  {
    title: "Colorado readies new line of defense as fire season gets underway: wildfire-ready building codes",
    outlet: "Colorado Public Radio",
    url: "https://www.cpr.org/2026/04/02/colorado-building-codes-fire-risk/",
    accessDate: "2026-04-22",
  },
  {
    title: "SB 23-166 — Establishment of a Wildfire Resiliency Code Board",
    outlet: "Colorado General Assembly",
    url: "https://leg.colorado.gov/bills/sb23-166",
    accessDate: "2026-04-22",
  },
  {
    title: "Most Marshall Fire claims resolved; some minor plaintiffs still pending (Jan 13, 2026)",
    outlet: "Colorado Public Radio",
    url: "https://www.cpr.org/2026/01/13/marshall-fire-trail-claims-excel-boulder/",
    accessDate: "2026-04-22",
  },
  {
    title: "Xcel Energy nears completion of Marshall Fire settlements",
    outlet: "Boulder Reporting Lab",
    url: "https://boulderreportinglab.org/2025/11/06/xcel-energy-nears-completion-of-marshall-fire-settlements/",
    accessDate: "2026-04-22",
  },
  {
    title: "HB 23-1288 — Colorado FAIR Plan Association",
    outlet: "Colorado General Assembly",
    url: "https://leg.colorado.gov/bills/hb23-1288",
    accessDate: "2026-04-22",
  },
  // Science
  {
    title: "What the Marshall Fire can teach us as we prepare for future climate catastrophes",
    outlet: "University of Colorado Boulder — Earth Lab (Jennifer Balch)",
    url: "https://www.colorado.edu/today/2022/01/25/what-marshall-fire-can-teach-us-we-prepare-future-climate-catastrophes",
    accessDate: "2026-04-22",
  },
  {
    title: "Marshall fire smoke was health hazard in neighbors’ homes, CU studies say",
    outlet: "The Colorado Sun",
    url: "https://coloradosun.com/2025/01/09/marshall-fire-smoke-health-hazards-cu-boulder-studies/",
    accessDate: "2026-04-22",
  },
  // Meeting archives (primary)
  {
    title: "Town of Superior Meeting Archive",
    outlet: "Granicus",
    url: "https://townofsuperior.granicus.com/ViewPublisher.php?view_id=2",
    accessDate: "2026-04-20",
  },
  {
    title: "City of Lafayette Meeting Archive",
    outlet: "Granicus",
    url: "https://cityoflafayette.granicus.com/ViewPublisher.php?view_id=4",
    accessDate: "2026-04-20",
  },
  {
    title: "Broomfield City Council Meeting Archive",
    outlet: "Granicus",
    url: "https://broomfield.granicus.com/ViewPublisher.php?view_id=6",
    accessDate: "2026-04-20",
  },
  // Hamlet
  {
    title: "Hamlet — Search Boulder-area government meetings",
    outlet: "Hamlet",
    url: "https://www.myhamlet.com/search?q=marshall+fire&ref=district",
  },
];

const TOC_SECTIONS = [
  { id: "the-wind",          label: "The Wind Was the Weapon", number: "01" },
  { id: "the-silence",       label: "The Insurance Silence",    number: "02" },
  { id: "the-gap",           label: "The Underinsurance Gap",   number: "03" },
  { id: "the-settlement",    label: "$640 Million, No Fault",   number: "04" },
  { id: "the-spillover",     label: "Lafayette Absorbed",       number: "05" },
  { id: "the-code",          label: "Zoning the Actuarial Map", number: "06" },
  { id: "the-routinization", label: "The Routine Returned",     number: "07" },
  { id: "voices",            label: "In Their Own Words",       number: "—" },
];

// ============================================================================
// HELPERS
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

function fmtTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return h > 0
    ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
    : `${m}:${String(s).padStart(2, "0")}`;
}

function MentionCard({ quote }: { quote: typeof DATA.featuredQuotes[number] }) {
  const initials = quote.speaker.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  // Media fragment tells the browser to start at this timestamp. Granicus
  // serves MP4s with CORS + range-request support, so this seeks cleanly
  // inside an HTML5 <video> element — no external player, no download.
  const srcWithStart = `${quote.videoUrl}#t=${quote.startSeconds}`;
  return (
    <div className="mf-mention-card">
      <div className="mf-mention-header">
        <div className="mf-mention-avatar">{initials}</div>
        <div>
          <div className="mf-mention-speaker">{quote.speaker}</div>
          <div className="mf-mention-role">{quote.role}</div>
          <div className="mf-mention-meeting">{quote.jurisdiction} · {quote.meeting} · {quote.date}</div>
        </div>
      </div>
      <blockquote className="mf-mention-text">&ldquo;{quote.text}&rdquo;</blockquote>
      <div className="mf-mention-video-wrap">
        <video
          className="mf-mention-video"
          src={srcWithStart}
          controls
          preload="metadata"
          playsInline
        />
        <div className="mf-mention-cue">
          <span className="mf-mention-cue-dot" />
          Clip begins at {fmtTime(quote.startSeconds)} in the full meeting
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MEETING CLIP EMBED — larger marquee player with moments navigator.
// Granicus-compatible cousin of HamletMeetingEmbed. Clicking a moment
// remounts the <video> with a new media fragment (most reliable cross-browser
// way to seek without holding a ref into an uncontrolled element).
// ============================================================================
interface ClipMoment {
  time: string;
  seconds: number;
  speaker: string;
  quote: string;
}

function MeetingClipEmbed({
  videoUrl,
  initialStart,
  meetingTitle,
  meetingDate,
  bodyName,
  location,
  moments,
}: {
  videoUrl: string;
  initialStart: number;
  meetingTitle: string;
  meetingDate: string;
  bodyName: string;
  location: string;
  moments: ClipMoment[];
}) {
  const [currentStart, setCurrentStart] = useState(initialStart);
  const srcWithFragment = `${videoUrl}#t=${currentStart}`;

  return (
    <div className="mf-embed">
      <div className="mf-embed-video">
        <video
          key={currentStart}
          src={srcWithFragment}
          controls
          preload="metadata"
          playsInline
        />
      </div>

      <div className="mf-embed-meta">
        <div className="mf-embed-location">
          <span className="mf-embed-dot" />
          {location} · {bodyName}
        </div>
        <div className="mf-embed-title">
          {meetingTitle} — {meetingDate}
        </div>
      </div>

      <ol className="mf-embed-moments">
        {moments.map((m) => (
          <li key={m.seconds}>
            <button
              className={`mf-embed-moment ${m.seconds === currentStart ? "is-active" : ""}`}
              onClick={() => setCurrentStart(m.seconds)}
              title={`Jump to ${m.time}`}
            >
              <span className="mf-embed-timestamp">{m.time}</span>
              <div className="mf-embed-moment-body">
                <span className="mf-embed-moment-speaker">{m.speaker}</span>
                <span className="mf-embed-moment-quote">&ldquo;{m.quote}&rdquo;</span>
              </div>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

// ============================================================================
// HERO ILLUSTRATION (inline SVG — Flatirons + grassland + rebuild rooftops)
// ============================================================================
function MarshallHeroSVG() {
  return (
    <svg viewBox="0 0 1200 620" className="mf-hero-art" preserveAspectRatio="xMidYEnd slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mf-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1d1712" />
          <stop offset="65%" stopColor="#26201a" />
          <stop offset="100%" stopColor="#3d2e1f" />
        </linearGradient>
        <linearGradient id="mf-flat" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a5c6b" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#283440" stopOpacity="0.97" />
        </linearGradient>
        <linearGradient id="mf-flat2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3d4d5c" stopOpacity="0.82" />
          <stop offset="100%" stopColor="#1f2a33" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="mf-grass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c9b58a" stopOpacity="0.32" />
          <stop offset="60%" stopColor="#8b7852" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#5a4a30" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="mf-roof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c8562a" />
          <stop offset="100%" stopColor="#7a3215" />
        </linearGradient>
        <radialGradient id="mf-ember" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c8562a" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#c8562a" stopOpacity="0" />
        </radialGradient>
        <filter id="mf-soft" x="-5%" y="-5%" width="110%" height="110%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" />
        </filter>
      </defs>

      {/* Sky */}
      <rect width="1200" height="620" fill="url(#mf-sky)" />

      {/* Dawn ember band on the horizon — the actuarial re-mapping */}
      <ellipse cx="600" cy="470" rx="900" ry="120" fill="url(#mf-ember)" />

      {/* Flatirons — five sandstone slabs, the defining Boulder silhouette */}
      <g>
        <polygon points="120,460 260,170 360,460" fill="url(#mf-flat2)" />
        <polygon points="290,460 430,150 550,460" fill="url(#mf-flat)" />
        <polygon points="480,460 620,130 740,460" fill="url(#mf-flat)" />
        <polygon points="670,460 790,180 900,460" fill="url(#mf-flat)" opacity="0.95" />
        <polygon points="840,460 940,220 1040,460" fill="url(#mf-flat2)" />
        {/* Slab edge highlights */}
        <line x1="260" y1="170" x2="360" y2="460" stroke="#c9b58a" strokeWidth="1" opacity="0.25" />
        <line x1="430" y1="150" x2="550" y2="460" stroke="#c9b58a" strokeWidth="1" opacity="0.22" />
        <line x1="620" y1="130" x2="740" y2="460" stroke="#c9b58a" strokeWidth="1" opacity="0.22" />
        <line x1="790" y1="180" x2="900" y2="460" stroke="#c9b58a" strokeWidth="1" opacity="0.18" />
      </g>

      {/* Far ridge — haze */}
      <path d="M0,470 Q200,452 420,464 Q700,448 960,462 Q1100,456 1200,466 L1200,490 L0,490 Z"
        fill="#1f2a33" opacity="0.7" />

      {/* Grassland — scorched tan WUI */}
      <path d="M0,490 Q200,478 400,488 Q700,475 950,487 Q1100,480 1200,488 L1200,620 L0,620 Z"
        fill="url(#mf-grass)" />

      {/* Grass strokes — sparse, windblown */}
      <g stroke="#c9b58a" strokeWidth="1.3" opacity="0.4">
        <line x1="40" y1="540" x2="42" y2="560" />
        <line x1="80" y1="545" x2="81" y2="562" />
        <line x1="140" y1="540" x2="142" y2="563" />
        <line x1="210" y1="548" x2="213" y2="566" />
        <line x1="280" y1="542" x2="282" y2="560" />
        <line x1="340" y1="548" x2="343" y2="565" />
        <line x1="420" y1="540" x2="422" y2="558" />
        <line x1="500" y1="546" x2="502" y2="563" />
        <line x1="580" y1="540" x2="582" y2="560" />
        <line x1="660" y1="548" x2="662" y2="566" />
        <line x1="730" y1="540" x2="733" y2="558" />
        <line x1="820" y1="548" x2="822" y2="564" />
        <line x1="900" y1="544" x2="902" y2="562" />
        <line x1="970" y1="548" x2="972" y2="566" />
        <line x1="1040" y1="540" x2="1042" y2="558" />
        <line x1="1120" y1="548" x2="1122" y2="565" />
      </g>

      {/* Rebuilt rooftop silhouettes — three clusters */}
      {/* Superior cluster (left, in the burn zone) */}
      <g>
        <polygon points="130,520 170,490 210,520" fill="url(#mf-roof)" />
        <rect x="140" y="520" width="60" height="34" fill="#1d1712" />
        <polygon points="220,524 252,498 285,524" fill="url(#mf-roof)" opacity="0.9" />
        <rect x="228" y="524" width="52" height="30" fill="#1d1712" opacity="0.95" />
        <polygon points="290,522 320,500 350,522" fill="url(#mf-roof)" opacity="0.82" />
        <rect x="296" y="522" width="48" height="30" fill="#1d1712" opacity="0.9" />
      </g>

      {/* Louisville cluster (center) */}
      <g>
        <polygon points="530,515 570,482 610,515" fill="url(#mf-roof)" />
        <rect x="540" y="515" width="60" height="38" fill="#1d1712" />
        <polygon points="615,518 650,490 685,518" fill="url(#mf-roof)" opacity="0.92" />
        <rect x="625" y="518" width="54" height="34" fill="#1d1712" opacity="0.95" />
      </g>

      {/* Lafayette cluster (right, farther — spillover city) */}
      <g opacity="0.78">
        <polygon points="880,524 912,498 944,524" fill="url(#mf-roof)" opacity="0.8" />
        <rect x="886" y="524" width="52" height="28" fill="#1d1712" opacity="0.85" />
        <polygon points="950,528 978,506 1006,528" fill="url(#mf-roof)" opacity="0.7" />
        <rect x="958" y="528" width="42" height="24" fill="#1d1712" opacity="0.8" />
        <polygon points="1014,524 1040,502 1066,524" fill="url(#mf-roof)" opacity="0.75" />
        <rect x="1020" y="524" width="42" height="28" fill="#1d1712" opacity="0.85" />
      </g>

      {/* Window lights */}
      <g opacity="0.95" filter="url(#mf-soft)">
        <rect x="150" y="530" width="4" height="6" fill="#e8803a" />
        <rect x="166" y="530" width="4" height="6" fill="#e8803a" opacity="0.75" />
        <rect x="184" y="530" width="4" height="6" fill="#e8803a" opacity="0.6" />
        <rect x="242" y="532" width="4" height="6" fill="#e8803a" opacity="0.85" />
        <rect x="260" y="532" width="4" height="6" fill="#e8803a" opacity="0.55" />
        <rect x="552" y="526" width="4" height="7" fill="#e8803a" />
        <rect x="572" y="526" width="4" height="7" fill="#e8803a" opacity="0.8" />
        <rect x="590" y="526" width="4" height="7" fill="#e8803a" opacity="0.65" />
        <rect x="640" y="530" width="4" height="6" fill="#e8803a" opacity="0.7" />
        <rect x="660" y="530" width="4" height="6" fill="#e8803a" opacity="0.6" />
        <rect x="898" y="534" width="3" height="5" fill="#e8803a" opacity="0.5" />
        <rect x="974" y="538" width="3" height="5" fill="#e8803a" opacity="0.4" />
      </g>

      {/* Wind-driven ember drift — left to right */}
      <g filter="url(#mf-soft)">
        <circle cx="230" cy="260" r="2.5" fill="#c8562a" opacity="0.6" />
        <circle cx="340" cy="310" r="2" fill="#c8562a" opacity="0.45" />
        <circle cx="450" cy="280" r="2.4" fill="#c8562a" opacity="0.5" />
        <circle cx="580" cy="340" r="1.8" fill="#c8562a" opacity="0.4" />
        <circle cx="700" cy="300" r="2.2" fill="#c8562a" opacity="0.45" />
        <circle cx="820" cy="360" r="1.6" fill="#c8562a" opacity="0.35" />
        <circle cx="960" cy="320" r="2" fill="#c8562a" opacity="0.4" />
        <circle cx="1080" cy="380" r="1.5" fill="#c8562a" opacity="0.3" />
      </g>
    </svg>
  );
}

// ============================================================================
// CUSTOM CHART — Insurance mentions by year (line + area)
// ============================================================================
function InsuranceArcChart({ isVisible }: { isVisible: boolean }) {
  const data = DATA.insuranceByYear;
  const w = 640;
  const h = 280;
  const m = { t: 30, r: 30, b: 50, l: 60 };
  const innerW = w - m.l - m.r;
  const innerH = h - m.t - m.b;
  const maxVal = Math.max(...data.map(d => d.chunks));
  const xFor = (i: number) => m.l + (i * innerW) / (data.length - 1);
  const yFor = (v: number) => m.t + innerH - (v / maxVal) * innerH;

  const linePath = data.map((d, i) => `${i === 0 ? "M" : "L"}${xFor(i)},${yFor(d.chunks)}`).join(" ");
  const areaPath = `${linePath} L${xFor(data.length - 1)},${m.t + innerH} L${xFor(0)},${m.t + innerH} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mf-chart" preserveAspectRatio="xMidYMid meet">
      {/* Grid */}
      {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
        <line key={i}
          x1={m.l} x2={w - m.r}
          y1={m.t + innerH - p * innerH} y2={m.t + innerH - p * innerH}
          stroke="#c9b58a" strokeOpacity="0.08" strokeWidth="1" />
      ))}
      {/* Y-axis labels */}
      {[0, Math.round(maxVal / 2), maxVal].map((v, i) => (
        <text key={i} x={m.l - 10}
          y={m.t + innerH - (v / maxVal) * innerH + 4}
          textAnchor="end" fontSize="11"
          fill="#b9a688" fontFamily="var(--font-sans)">{v}</text>
      ))}
      {/* Area fill */}
      <path d={areaPath}
        fill="#c8562a"
        fillOpacity={isVisible ? 0.18 : 0}
        style={{ transition: "fill-opacity 0.9s var(--ease-elegant)" }} />
      {/* Line */}
      <path d={linePath}
        fill="none" stroke="#c8562a" strokeWidth="2.5"
        strokeDasharray="1200" strokeDashoffset={isVisible ? 0 : 1200}
        style={{ transition: "stroke-dashoffset 1.4s var(--ease-elegant)" }} />
      {/* Points + year labels */}
      {data.map((d, i) => (
        <g key={d.year}>
          <circle cx={xFor(i)} cy={yFor(d.chunks)} r="5"
            fill="#c8562a"
            opacity={isVisible ? 1 : 0}
            style={{ transition: `opacity 0.5s var(--ease-elegant) ${800 + i * 120}ms` }} />
          <text x={xFor(i)} y={yFor(d.chunks) - 14}
            textAnchor="middle" fontSize="13" fontWeight="600"
            fill="#f5f3ed" fontFamily="var(--font-sans)"
            opacity={isVisible ? 1 : 0}
            style={{ transition: `opacity 0.5s var(--ease-elegant) ${900 + i * 120}ms` }}>
            {d.chunks}
          </text>
          <text x={xFor(i)} y={h - 18}
            textAnchor="middle" fontSize="12"
            fill="#b9a688" fontFamily="var(--font-sans)">{d.year}</text>
        </g>
      ))}
    </svg>
  );
}

// ============================================================================
// CUSTOM CHART — Rebuild rates by jurisdiction vs. national average
// ============================================================================
function RebuildRateChart({ isVisible }: { isVisible: boolean }) {
  const bars = [
    { label: "Louisville",                value: DATA.rebuild.louisvilleRebuiltPct,    color: "#82a882" },
    { label: "Superior",                  value: DATA.rebuild.superiorPermittedPct,    color: "#c8562a" },
    { label: "Unincorporated Boulder Cty.", value: DATA.rebuild.unincorporatedPct,     color: "#a23d18" },
    { label: "All three, combined",       value: DATA.rebuild.overallRebuildRatePct,   color: "#f5f3ed" },
    { label: "U.S. 5-year average",       value: DATA.rebuild.nationalFiveYrAvgPct,    color: "#6b7280" },
  ];
  const w = 640;
  const rowH = 44;
  const gap = 10;
  const labelW = 230;
  const barMaxW = w - labelW - 80;
  const h = bars.length * (rowH + gap) + 20;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mf-chart" preserveAspectRatio="xMidYMid meet">
      {bars.map((b, i) => {
        const y = 10 + i * (rowH + gap);
        const barW = (b.value / 100) * barMaxW;
        return (
          <g key={b.label}>
            <text x={labelW - 10} y={y + rowH / 2 + 5}
              textAnchor="end" fontSize="12" fontWeight="600"
              fill="#f5f3ed" fontFamily="var(--font-sans)">{b.label}</text>
            {/* Track */}
            <rect x={labelW} y={y + rowH / 2 - 8} width={barMaxW} height="16" rx="8"
              fill="#3d2e1f" fillOpacity="0.35" />
            {/* Bar */}
            <rect x={labelW} y={y + rowH / 2 - 8}
              width={isVisible ? barW : 0} height="16" rx="8"
              fill={b.color}
              style={{ transition: `width 1.1s var(--ease-elegant) ${i * 120}ms` }} />
            {/* Value */}
            <text x={labelW + barW + 10} y={y + rowH / 2 + 5}
              textAnchor="start" fontSize="13" fontWeight="700"
              fill={b.color} fontFamily="var(--font-sans)"
              opacity={isVisible ? 1 : 0}
              style={{ transition: `opacity 0.6s var(--ease-elegant) ${400 + i * 120}ms` }}>
              {b.value}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ============================================================================
// CUSTOM CHART — Superior vs. Lafayette topic mix
// ============================================================================
function TopicMixChart({ isVisible }: { isVisible: boolean }) {
  const data = DATA.topicMixByJurisdiction;
  const topics: { key: keyof typeof data[number]; label: string; color: string }[] = [
    { key: "rebuild",    label: "Rebuild",              color: "#c8562a" },
    { key: "wildfire",   label: "Wildfire Resilience",  color: "#a23d18" },
    { key: "housing",    label: "Housing & STR",        color: "#82a882" },
    { key: "governance", label: "Governance",           color: "#4a5c6b" },
    { key: "insurance",  label: "Insurance",            color: "#f5f3ed" },
  ];
  const w = 640;
  const h = 200;
  const barH = 54;
  const gap = 20;
  const innerW = w - 180;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mf-chart" preserveAspectRatio="xMidYMid meet">
      {data.map((d, di) => {
        const y = 30 + di * (barH + gap);
        let x = 150;
        return (
          <g key={d.jurisdiction}>
            <text x={140} y={y + barH / 2 + 5}
              textAnchor="end" fontSize="13" fontWeight="700"
              fill="#f5f3ed" fontFamily="var(--font-sans)">{d.jurisdiction}</text>
            {topics.map((t, ti) => {
              const val = d[t.key] as number;
              const segW = (val / 100) * innerW;
              const rect = (
                <g key={t.key}>
                  <rect x={x} y={y}
                    width={isVisible ? segW : 0} height={barH}
                    fill={t.color}
                    style={{ transition: `width 1s var(--ease-elegant) ${di * 120 + ti * 80}ms` }} />
                  <text x={x + segW / 2} y={y + barH / 2 + 5}
                    textAnchor="middle" fontSize="11" fontWeight="700"
                    fill={t.color === "#f5f3ed" ? "#1d1712" : "#f5f3ed"}
                    fontFamily="var(--font-sans)"
                    opacity={isVisible && segW > 28 ? 1 : 0}
                    style={{ transition: `opacity 0.5s var(--ease-elegant) ${500 + di * 120 + ti * 80}ms` }}>
                    {val}%
                  </text>
                </g>
              );
              x += segW;
              return rect;
            })}
          </g>
        );
      })}
      {/* Legend */}
      <g transform={`translate(150, ${30 + data.length * (barH + gap) + 6})`}>
        {topics.map((t, i) => (
          <g key={t.key} transform={`translate(${i * 100}, 0)`}>
            <rect x="0" y="0" width="10" height="10" fill={t.color} />
            <text x="14" y="9" fontSize="10" fill="#b9a688" fontFamily="var(--font-sans)">{t.label}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

// ============================================================================
// NARRATIVE
// ============================================================================
function LedeSection() {
  return (
    <FadeIn className="mf-section">
      <div className="mf-body-prose">
        <p>
          The Marshall Fire ignited in grassland near the Marshall Mesa Trailhead on the morning of December 30, 2021. Wind gusted past 100 miles per hour. The fire jumped four lanes of U.S. 36 and destroyed {DATA.burnZone.homesDestroyed.toLocaleString()} homes before the sun set. Two people died. Thirty-seven thousand evacuated. Superior, Louisville, and a strip of unincorporated Boulder County lost their neighborhoods. The City of Boulder, whose Flatirons frame every tourist photograph of the region, lost zero.
        </p>
        <p>
          Four years later, {DATA.rebuild.overallRebuildRatePct}% of the destroyed homes are rebuilt or permitted. That is roughly triple the national five-year wildfire recovery rate. Louisville reports {DATA.rebuild.louisvilleRebuiltPct}%. Xcel Energy, whose power line Boulder County investigators identified as the most probable cause of the primary ignition, announced a ${DATA.xcelSettlement.settlementAmount} million settlement in September 2025 without admitting fault. By January 2026, nearly all {DATA.xcelSettlement.plaintiffCount.toLocaleString()} plaintiffs had signed. Colorado’s Division of Insurance put the average underinsurance gap at between ${DATA.insurance.gapAt250Sqft.toLocaleString()} and ${DATA.insurance.gapAt350Sqft.toLocaleString()} per policy, depending on the per-square-foot assumption.
        </p>
        <p>
          We transcribed every post-fire governing-body meeting we could reach across four burn-zone Granicus archives: Superior, Lafayette, Broomfield, and Erie. {DATA.meetings.totalTranscribed.toLocaleString()} meetings. {(DATA.meetings.totalWords / 1e6).toFixed(2)} million words of public record. We classified every ~2,000-word chunk on eight topics and four rhetorical dimensions, then pulled {DATA.meetings.totalCandidateQuotes.toLocaleString()} candidate quotes from the highest-signal segments. Explore the full archive on <a href="https://www.myhamlet.com/search?q=marshall+fire&ref=district">Hamlet</a>.
        </p>
        <p>
          Insurance, the fight everyone expected to dominate, left the council chamber within a year. A slow, four-year rezoning replaced it: ADUs, short-term rentals, grassland fuel management, setbacks, and the adjacency of rebuilt lots to newly approved density. Residents, trustees, and planning commissioners were not arguing about carriers. They were arguing about what gets built next to them, and who will own it.
        </p>
      </div>
    </FadeIn>
  );
}

function WindSection() {
  return (
    <section id="the-wind" className="mf-section mf-section-border">
      <div className="mf-section-header">
        <span className="mf-section-num">01</span>
        <h2 className="mf-section-title">The Wind Was the Weapon</h2>
      </div>
      <FadeIn className="mf-body-prose">
        <p>
          Marshall did not fit the mental image most Americans have of a wildfire. It was not a forest. It did not crown in pine canopy. It crossed grassland in daylight, in winter, with Category-1 hurricane winds behind it. Boulder County&apos;s after-action analysis concluded the fire spread primarily through wind-blown embers landing on fences, wood mulch, and attached structures, the same mechanism that drove the 2018 Camp Fire in California. Grasslands, not forests, were the first fuel.
        </p>
        <p>
          The National Institute of Standards and Technology has spent two decades documenting the same finding: ember transport, not direct flame, is the dominant loss mechanism in wildland-urban-interface fires. What made Marshall novel was the topography. The fire&apos;s vector was across flat, open grassland between two high-density subdivisions. Neither Superior nor Louisville&apos;s western edge had been mapped as WUI before. After December 30, 2021, both were.
        </p>
        <p>
          Jennifer Balch, who directs the Earth Lab at the University of Colorado Boulder, spent the weeks after the fire quantifying what made houses burn. Her group&apos;s analysis pointed to home-to-home spread at the scale of the subdivision, not embers arriving from miles away. The WUI is not a fixed geographic edge. It is a weather condition.
        </p>
      </FadeIn>
      <FadeIn className="mf-embed-wrap" delay={120}>
        <div className="mf-embed-frame">
          <div className="mf-embed-eyebrow">Hamlet meeting clip · grasslands as WUI</div>
          <MeetingClipEmbed
            videoUrl="https://archive-video.granicus.com/townofsuperior/townofsuperior_2f35b7e8-33d5-4ef6-9256-840771f8e238.mp4"
            initialStart={2180}
            meetingTitle="Town Board Meeting"
            meetingDate="September 11, 2023"
            bodyName="Town Board"
            location="Superior, CO"
            moments={[
              {
                time: "36:20",
                seconds: 2180,
                speaker: "Stephan Reinhold, Boulder County Parks & Open Space",
                quote: "We realized we had to involve the grasslands as part of the wildland urban interface. Immediately, the first meeting after the Marshall Fire, we started talking about grasslands and trying to understand what the risks were…",
              },
            ]}
          />
        </div>
      </FadeIn>
      <FadeIn className="mf-body-prose">
        <p>
          The utility question was separate, and slower. Boulder County investigators concluded the most probable cause of the primary ignition was &ldquo;hot particles discharged from Xcel Energy power lines&rdquo; near the Marshall Mesa Trailhead. Investigators and plaintiffs spent years contesting whether a second ignition came from a smoldering coal seam fire at a historic mine site near the burn origin. Xcel never admitted fault. That distinction held up the litigation for four years.
        </p>
      </FadeIn>
    </section>
  );
}

function InsuranceSilenceSection() {
  const years = DATA.insuranceByYear;
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  return (
    <section id="the-silence" className="mf-section mf-section-border">
      <div className="mf-section-header">
        <span className="mf-section-num">02</span>
        <h2 className="mf-section-title">The Insurance Silence</h2>
      </div>
      <FadeIn className="mf-body-prose">
        <p>
          In the first year after the fire, insurance came up in {years[0].chunks} chunks of burn-zone council testimony. In 2023, {years[1].chunks}. In 2024, {years[2].chunks}. In 2025, {years[3].chunks}. In the 2026 record through mid-April, {years[4].chunks}. Across {DATA.meetings.totalTranscribed.toLocaleString()} meetings, insurance generated {DATA.quoteTopics.find(q => q.topic === "Insurance")?.count} extracted quotes, a small share of the pool, but with the highest per-quote intensity of any topic at {DATA.quoteTopics.find(q => q.topic === "Insurance")?.avgIntensity} out of 5. Residents who testified about insurance testified at peak intensity. Then they stopped testifying about it at this level of government.
        </p>
      </FadeIn>
      <FadeIn className="mf-chart-wrap" delay={120}>
        <div ref={ref} className="mf-chart-frame">
          <div className="mf-chart-caption mf-chart-caption-top">
            Insurance mentions in post-fire burn-zone council testimony, by year.
          </div>
          <InsuranceArcChart isVisible={isVisible} />
          <div className="mf-chart-caption">
            Source: The District analysis of Pass 1 topic classification across {DATA.meetings.totalTranscribed.toLocaleString()} meetings.
          </div>
        </div>
      </FadeIn>
      <FadeIn className="mf-body-prose">
        <p>
          Part of the drop reflects where the policy fight moved. HB 23-1288 created the Colorado FAIR Plan Association in 2023; the insurer of last resort began accepting residential applications on April 10, 2025. SB 23-166, signed that May, set up the Wildfire Resiliency Code Board, whose work produced the Colorado Wildfire Resiliency Code adopted by the state on {DATA.legislation.cwrcAdoptedByState}. The carrier-non-renewal argument moved with them, out of council chambers and into the Division of Insurance.
        </p>
        <p>
          The rest reflects what a town board can and cannot do. Rodney Mitchell told the Superior Town Board in October 2024 that he had &ldquo;exhausted nearly every except for litigation&rdquo; with State Farm, and that the litigation math was fifty-fifty at a $75,000 attorney deposit. He was describing a household legal problem to an institution that could not change it. No council in this corpus passed a resolution, formed a committee, or altered a zoning code in direct response to what residents said about carrier behavior.
        </p>
      </FadeIn>
    </section>
  );
}

function GapSection() {
  const ins = DATA.insurance;
  return (
    <section id="the-gap" className="mf-section mf-section-border">
      <div className="mf-section-header">
        <span className="mf-section-num">03</span>
        <h2 className="mf-section-title">The Underinsurance Gap</h2>
      </div>
      <FadeIn className="mf-body-prose">
        <p>
          The Colorado Division of Insurance pulled {ins.policiesAnalyzed.toLocaleString()} of the 1,084 total-loss policies in May 2022. Subsequent CU research confirmed the finding at the household level: only {ins.fullReplacementPct}% of Marshall Fire homeowners had enough coverage to fully replace their homes at local construction costs.
        </p>
        <p>
          The gap depended on the per-square-foot reconstruction assumption. At $250 per square foot, the DOI calculated average underinsurance at ${ins.gapAt250Sqft.toLocaleString()} per policy. At $300, ${ins.gapAt300Sqft.toLocaleString()}. At $350, ${ins.gapAt350Sqft.toLocaleString()}. Actual rebuild quotes in Louisville, Superior, and unincorporated Boulder County landed between ${ins.localBuildCostLowSqft} and ${ins.localBuildCostHighSqft} per square foot. The most expensive column was the real-world column.
        </p>
        <p>
          The council record is where the gap shows up by household. Mike Neustetter told the Superior Town Board on April 25, 2022 that he was $160,000 underinsured and had asked his 92-year-old grandmother for $500. Michael Friedberg told the same board on September 12, 2022 that he and his wife were so underinsured they would take their settlement, park a prefab Studio Shed on their side lot, and move in. Phil Kuffner, a sixth-generation Superior resident, said in the same meeting that he could not afford a contractor, so he was &ldquo;pounding nails again at 61.&rdquo;
        </p>
        <p>
          Those three are part of roughly 180 complaints Marshall Fire residents filed with the Colorado Division of Insurance in the first year. The DOI&apos;s own estimate implies many more. At six-figure average shortfalls and real local build costs, the households that did not file, did not testify, and quietly absorbed the gap from retired parents never entered a state database. They entered the council record, one testimony at a time.
        </p>
      </FadeIn>
      <FadeIn className="mf-embed-wrap" delay={150}>
        <div className="mf-embed-frame">
          <div className="mf-embed-eyebrow">Hamlet meeting clip · jump between moments</div>
          <MeetingClipEmbed
            videoUrl="https://archive-video.granicus.com/townofsuperior/townofsuperior_cbb0fc78-1dfe-4d34-8c41-cfa4d1fc8f1c.mp4"
            initialStart={2577}
            meetingTitle="Town Board Meeting"
            meetingDate="September 12, 2022"
            bodyName="Town Board"
            location="Superior, CO"
            moments={[
              {
                time: "42:57",
                seconds: 2577,
                speaker: "Phil Kuffner, sixth-generation Superior resident",
                quote: "I didn’t hire a contractor this time. I can’t afford to hire a contractor… we’re pounding nails again at 61, the cold months are coming and I’m waiting on a permit.",
              },
              {
                time: "50:24",
                seconds: 3023,
                speaker: "Michael Friedberg, Marshall Fire survivor",
                quote: "We too are underinsured. We’re good friends with the guys at Studio Shed. They build prefab. Since we are underinsured, we’re going to… build something small on our side lot, and that allows us to go home.",
              },
            ]}
          />
        </div>
      </FadeIn>
    </section>
  );
}

function SettlementSection() {
  const x = DATA.xcelSettlement;
  return (
    <section id="the-settlement" className="mf-section mf-section-border">
      <div className="mf-section-header">
        <span className="mf-section-num">04</span>
        <h2 className="mf-section-title">$640 Million, No Fault</h2>
      </div>
      <FadeIn className="mf-body-prose">
        <p>
          On September 24, 2025, on the eve of a Boulder County jury trial, Xcel Energy and two telecommunications companies announced a ${x.settlementAmount} million &ldquo;agreement in principle&rdquo; with nearly {x.plaintiffCount.toLocaleString()} plaintiffs. Xcel said the settlement would not fall on ratepayers. Roughly ${x.xcelInsuranceContribution} million is expected to be covered by the company&apos;s own insurance, the balance by shareholders and the co-defendants. The company did not admit fault.
        </p>
        <p>
          By a January 13, 2026 status hearing, per Colorado Public Radio, nearly all individual plaintiffs had signed and all insurer subrogation claims had been paid. About 600 plaintiffs are minors whose settlements require separate approval through guardians or conservators, a process a Boulder district court judge said could extend the administrative close-out by months. A further status hearing was set for February 26, 2026. Four individual claims remained unresolved at the start of the year.
        </p>
        <p>
          The factual record never reached a jury. Xcel acknowledged &ldquo;that its facilities appear to have been involved in an ignition&rdquo; near the Marshall Mesa Trailhead. Boulder County investigators had already concluded the most probable cause of that ignition was hot particles discharged from Xcel&apos;s power lines. The trial would have asked whether Xcel was legally liable, or whether a smoldering coal seam fire at a historic mine site near the burn origin was a sufficient intervening cause to foreclose liability. The settlement removed the answer.
        </p>
        <p>
          In the council record, Xcel appears mostly in utility-coordination contexts: undergrounding, vegetation management along rights-of-way, grid hardening. Residents testified about the company&apos;s role; councils did not litigate it. The civil case was in district court. The most consequential financial determination of the rebuild therefore happened in a courthouse, not a town hall. $640 million is a multiple of the combined annual general-fund budgets of Superior, Louisville, and Lafayette.
        </p>
      </FadeIn>
    </section>
  );
}

function SpilloverSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  return (
    <section id="the-spillover" className="mf-section mf-section-border">
      <div className="mf-section-header">
        <span className="mf-section-num">05</span>
        <h2 className="mf-section-title">Lafayette Absorbed the Shock</h2>
      </div>
      <FadeIn className="mf-body-prose">
        <p>
          Superior lost houses. Lafayette absorbed the people who lost them. The split shows up cleanly in the topic mix of the two cities&apos; council records.
        </p>
      </FadeIn>
      <FadeIn className="mf-chart-wrap" delay={120}>
        <div ref={ref} className="mf-chart-frame">
          <div className="mf-chart-caption mf-chart-caption-top">
            Share of classified transcript chunks on selected topics, by jurisdiction.
          </div>
          <TopicMixChart isVisible={isVisible} />
          <div className="mf-chart-caption">
            Source: The District Pass 1 classification. Remaining share is distributed across Open Space, Climate &amp; Water, and Institutional Capital topics.
          </div>
        </div>
      </FadeIn>
      <FadeIn className="mf-body-prose">
        <p>
          Superior&apos;s classified chunks cluster on physical recovery: rebuild, wildfire resilience, open-space fire management. Lafayette&apos;s cluster on housing policy: ADU ordinances, short-term rental regulation, displacement, affordability. A Lafayette resident, read into the record at a Planning Commission hearing in July 2023, described watching her neighbor&apos;s house get purchased by an out-of-town investor who split three units into Airbnbs. Her neighbors were gone. The fire had not touched her block. The effects arrived anyway.
        </p>
        <p>
          The rent data confirms the pressure. Colorado Sun and KUNC coverage in early 2022 documented rental rates jumping from roughly $2,400 a month to $3,000 and above across the Lafayette and Louisville rental market, with outlier cases reaching $6,000. The Colorado Attorney General opened a price-gouging inquiry in January 2022. About 340 renters were displaced by the fire itself. The pressure on neighboring rental stock was immediate, and the meeting record shows it sustained for years.
        </p>
        <p>
          A Lafayette council member said it plainly in a September 2022 meeting: <em>&ldquo;we&apos;re all seeing it live next door in Louisville and Superior and what&apos;s going on in those communities.&rdquo;</em> The rebuild cost did not stay where the fire was. It moved to the next affordable town.
        </p>
      </FadeIn>
    </section>
  );
}

function CodeSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  return (
    <section id="the-code" className="mf-section mf-section-border">
      <div className="mf-section-header">
        <span className="mf-section-num">06</span>
        <h2 className="mf-section-title">Zoning the Actuarial Map</h2>
      </div>
      <FadeIn className="mf-body-prose">
        <p>
          The council record at scale shows a region zoning around insurance outcomes it cannot control. Each agenda item is small. An ADU. A setback variance. A prescribed-burn schedule. A short-term rental cap. Across {DATA.meetings.totalTranscribed.toLocaleString()} meetings, the pattern is consistent: municipal zoning compensating for a private insurance market pulling back from risk.
        </p>
      </FadeIn>
      <FadeIn className="mf-chart-wrap" delay={120}>
        <div ref={ref} className="mf-chart-frame">
          <div className="mf-chart-caption mf-chart-caption-top">
            Five-year rebuild rate by jurisdiction, versus the national average for wildfire disaster recoveries.
          </div>
          <RebuildRateChart isVisible={isVisible} />
          <div className="mf-chart-caption">
            Source: Boulder County Recovery Dashboard (Mar 2025); Boulder Reporting Lab. National five-year rebuild average per federal disaster recovery research.
          </div>
        </div>
      </FadeIn>
      <FadeIn className="mf-body-prose">
        <p>
          Stephan Reinhold, a Boulder County Parks and Open Space forester, described the pivot plainly to the Superior Town Board in September 2023: <em>&ldquo;we had to involve the grasslands as part of the wildland urban interface.&rdquo;</em> A flat grassland on the Front Range had never been a WUI parcel in the insurance sense. After December 30, 2021, it was.
        </p>
        <p>
          Louisville moved first. In November 2024 the city council unanimously adopted Ordinance 1891, the Fire Hardening Code, requiring Class A roofs, fire-resistant vents and siding, and ignition-resistant fencing within five feet of a structure on all new builds. Already-permitted Marshall Fire rebuilds were specifically exempted, a concession to underinsured households still in the permit queue. The ordinance took effect December 10, 2024, making Louisville the first Colorado municipality to impose such rules. Superior and Boulder County are advancing their own building-code updates on separate tracks.
        </p>
        <p>
          The state followed. The Wildfire Resiliency Code Board, established by SB 23-166 in May 2023 and seated that fall, adopted the Colorado Wildfire Resiliency Code on July 1, 2025. Local jurisdictions have until April 1, 2026 to adopt it. Many have flagged that the state&apos;s draft WUI-application map does not accurately reflect their parcel conditions. That disagreement, between a code written in Denver and a map each city argues over, is how the actuarial re-mapping becomes land use.
        </p>
        <p>
          The other side of the re-mapping, in the same corpus, is what trustees and residents themselves called investor pressure. A Superior trustee put it bluntly in a December 2024 work session on ADU zoning: homes in the rebuilt neighborhoods &ldquo;are getting picked up by LLCs,&rdquo; with the risk that density changes intended to add housing will instead let institutional capital <em>&ldquo;just add 20 different ADUs in different places and move on.&rdquo;</em> Residents across the Lafayette planning record reported neighboring houses sold to out-of-town buyers and converted to short-term rentals. We have not joined the council record to Boulder County clerk deed transfers, which would be required to verify any specific transfer pattern by name. That is a limit of this piece.
        </p>
      </FadeIn>
    </section>
  );
}

function RoutinizationSection() {
  const dims = DATA.dimensionsByYear;
  return (
    <section id="the-routinization" className="mf-section mf-section-border">
      <div className="mf-section-header">
        <span className="mf-section-num">07</span>
        <h2 className="mf-section-title">The Routine Returned</h2>
      </div>
      <FadeIn className="mf-body-prose">
        <p>
          Every transcript chunk carries four 1&ndash;5 scores: urgency, contentiousness, personal testimony, technical complexity. They are relative measures, not a calibrated index.
        </p>
        <p>
          Urgency fell every year. In 2022, the average chunk scored {dims[0].urgency}. In 2023, {dims[1].urgency}. In 2024, {dims[2].urgency}. In 2025, {dims[3].urgency}. In 2026 through mid-April, {dims[4].urgency}. The drop was cliff-shaped between years one and two. Technical complexity held almost flat: {dims[0].technical_complexity} in 2022, {dims[4].technical_complexity} in 2026. The meetings kept the same substantive content. They just stopped sounding like crises.
        </p>
        <p>
          Personal testimony drifted down through 2024, then climbed back in Superior in 2025, driven by residents returning to council to object to redevelopment adjacent to their rebuilt homes. On November 10, 2025, Katie Neustetter appeared before the Superior Town Council over a fencing-and-landscaping dispute on her rebuilt lot. &ldquo;We really wanted to follow the rules,&rdquo; she told the council, and the backyard her children played in was &ldquo;making us feel a little more comfortable being back.&rdquo; Her husband, Mike Neustetter, had told the same board three and a half years earlier that the family was $160,000 underinsured. They came back. They are still showing up.
        </p>
        <p>
          Stephanie Miller, a Superior trustee, is referenced by name {DATA.speakerID.stephanieMillerMentions} times in the corpus. Allison James, Superior&apos;s Disaster Preparedness and Recovery Manager, has returned repeatedly to present the town&apos;s recovery status to the board. Shannon Cody, an Andrew Drive resident who identified herself as a Marshall Fire survivor, testified at the February 18, 2025 Planning Commission about a redevelopment adjacent to her rebuilt block. Across {DATA.meetings.totalTranscribed.toLocaleString()} meetings and {(DATA.meetings.totalWords / 1e6).toFixed(2)} million words, {DATA.speakerID.uniqueIdentified} unique named speakers account for the identified record. The true figure is larger, since transcription splits names and some speakers appear only at the podium without a roll-call signature. The concentration is the point. Municipal memory of the Marshall Fire rebuild is carried by the same few dozen people.
        </p>
        <p>
          A Lafayette City Council candidate said a thing at the January 9, 2026 special meeting that most Boulder-area officials will not say publicly. The meeting followed an early-January wildland incident near the Mayhofer Single Tree Trail. <em>&ldquo;If conditions had been a little bit different on Monday&hellip; we could have lost a substantial chunk of the city.&rdquo;</em> On December 30, 2021, the wind shifted. That is part of the reason Lafayette and the City of Boulder still sit intact in 2026.
        </p>
      </FadeIn>
    </section>
  );
}

function VoicesSection() {
  return (
    <section id="voices" className="mf-section mf-wide-section">
      <div className="mf-section-header">
        <h2 className="mf-section-title">In Their Own Words</h2>
        <p className="mf-section-sub">Eleven testimonies from the four-year post-Marshall council record, selected from {DATA.meetings.filteredQuotePool.toLocaleString()} candidates. Each card plays the moment in place, starting at the timestamp the person began speaking.</p>
      </div>
      <div className="mf-mention-grid">
        {DATA.featuredQuotes.map((q, i) => (
          <MentionCard key={`${q.speaker}-${q.date}-${i}`} quote={q} />
        ))}
      </div>
    </section>
  );
}

function CloseSection() {
  return (
    <FadeIn className="mf-section mf-close-section">
      <div className="mf-body-prose">
        <p>
          Five years is long enough to see the shape of a recovery. {DATA.rebuild.overallRebuildRatePct}% of the destroyed homes are rebuilt or permitted. Xcel wrote a check without conceding the sentence that would have cost more. The FAIR Plan is accepting applications. Louisville&apos;s code requires Class A roofs. The Colorado Wildfire Resiliency Code is on a deadline. The Boulder County Wildfire Fund&apos;s last grant cycle has closed. The Community Foundation&apos;s final distributions went out in the first quarter of 2026.
        </p>
        <p>
          Underneath, the corpus captures what trustees and residents described as a slow consolidation. Underinsured survivors sold, rented, or never rebuilt. Trustees and residents described LLC buyers with no prior connection to a block assembling lots. Lafayette absorbed the displaced into rental stock residents said investors were already converting to short-term units. The insurance market&apos;s retreat produced a buyer.
        </p>
        <p>
          Ten point eight million words of public testimony. On Andrew Drive in Superior, Shannon Cody told the Planning Commission in February 2025 that she had lived &ldquo;in the rubble and ruin of other people&apos;s lives&rdquo; for eight months. The second fire, the one the Lafayette council candidate warned about in January 2026, did not come. On December 30, 2021, the wind shifted.
        </p>
      </div>
    </FadeIn>
  );
}

// ============================================================================
// HERO
// ============================================================================
function HeroSection({ scrollY }: { scrollY: number }) {
  const opacity = Math.max(0, 1 - scrollY / 600);
  const translateY = scrollY / 3;
  return (
    <header className="mf-hero">
      <div className="mf-hero-skyline" style={{ transform: `translateY(${translateY * 0.5}px)` }}>
        <MarshallHeroSVG />
      </div>
      <div className="mf-hero-bg">
        <div className="mf-hero-bg-gradient" />
        <div className="mf-hero-bg-grid" />
      </div>
      <div className="mf-hero-content" style={{ opacity, transform: `translateY(${translateY}px)` }}>
        <span className="mf-hero-badge">Front Range Deep Dive</span>
        <h1 className="mf-hero-title">
          Five Years After <span className="mf-accent">Marshall</span>
        </h1>
        <p className="mf-hero-sub">
          Ten point eight million words of council testimony across four burn-zone jurisdictions.
          The insurance market didn’t collapse. It re-drew the map.
        </p>
        <div className="mf-hero-byline">
          By The District &middot; {DATA.meetings.totalTranscribed.toLocaleString()} meetings &middot; {(DATA.meetings.totalWords / 1e6).toFixed(1)}M words
        </div>
        <div className="mf-scroll-cue" aria-hidden>
          <span className="mf-scroll-label">scroll</span>
          <span className="mf-scroll-line" />
        </div>
      </div>
    </header>
  );
}

// ============================================================================
// MAIN
// ============================================================================
export default function MarshallFiveYears() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollPct = typeof window !== "undefined"
    ? Math.min(100, (scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight)) * 100)
    : 0;

  return (
    <main className="mf-article article-page" data-theme="marshall-five-years">
      <div className="mf-progress" style={{ width: `${scrollPct}%` }} />
      <TableOfContents sections={TOC_SECTIONS} cssPrefix="mf" />
      <HeroSection scrollY={scrollY} />

      <AtAGlance
        stats={[
          { value: DATA.meetings.totalTranscribed.toLocaleString(), label: "Meetings transcribed" },
          { value: `${(DATA.meetings.totalWords / 1e6).toFixed(1)}M`, label: "Words of testimony" },
          { value: `$${DATA.xcelSettlement.settlementAmount}M`, label: "Xcel settlement, no fault" },
          { value: `${DATA.rebuild.overallRebuildRatePct}%`, label: "Homes rebuilt in 4 years" },
        ]}
        finding="Boulder city lost zero homes. The rebuild, and the insurance pressure that followed, is a Superior, Louisville, and unincorporated Boulder County story that the Front Range councils we can see have been arguing about for four years."
      />

      <LedeSection />
      <WindSection />
      <InsuranceSilenceSection />
      <GapSection />
      <SettlementSection />
      <SpilloverSection />
      <CodeSection />
      <RoutinizationSection />

      <FadeIn className="mf-embed-wrap mf-embed-wrap-wide">
        <div className="mf-embed-frame">
          <div className="mf-embed-eyebrow">Hamlet meeting clip · the counterfactual</div>
          <MeetingClipEmbed
            videoUrl="https://archive-video.granicus.com/cityoflafayette/cityoflafayette_e389d2e0-fa48-4a9f-bfa4-851f3e1ce615.mp4"
            initialStart={4682}
            meetingTitle="Special Meeting — post-Mayhofer incident"
            meetingDate="January 9, 2026"
            bodyName="Lafayette City Council"
            location="Lafayette, CO"
            moments={[
              {
                time: "1:18:02",
                seconds: 4682,
                speaker: "Lafayette City Council candidate",
                quote: "If conditions had been a little bit different on Monday… we could have lost a substantial chunk of the city.",
              },
            ]}
          />
        </div>
      </FadeIn>

      <PullQuote
        text={"If conditions had been a little bit different on Monday, we could have lost a substantial chunk of the city."}
        city="Lafayette City Council candidate"
        state="January 9, 2026"
        className="mf-pull-quote"
      />

      <VoicesSection />
      <CloseSection />

      <MethodologySection
        prefix="mf"
        title="How we built this analysis"
        items={[
          {
            label: "Meeting corpus",
            content: `Every post-Marshall-Fire (December 30, 2021 onward) governing-body meeting we could access across four Granicus-hosted jurisdictions: Superior, Lafayette, Broomfield, and Erie. We ingested ${DATA.meetings.totalIngested.toLocaleString()} meetings, transcribed ${DATA.meetings.totalTranscribed.toLocaleString()} (${DATA.meetings.coveragePct}% coverage). Ceremonial content (proclamations, ribbon cuttings, memorials) was excluded by keyword filter. Louisville, Colorado and unincorporated Boulder County — both within the original burn zone — are absent from this corpus. Louisville posts video to Open Media Network, which did not expose a public ingestion interface during our collection window; Boulder County's eScribe archive is JavaScript-rendered and requires a different scraping approach than the Granicus workflow. Both are acknowledged gaps. Erie, which enters the corpus in Feb 2026, contributes only late observations.`,
          },
          {
            label: "Transcription and speaker identification",
            content: `Direct MP4 archives served by archive-video.granicus.com were submitted to AssemblyAI's Nano speech-to-text engine (approximately $0.12 per hour of audio) with speaker diarization enabled. Speaker labels (A, B, C…) were mapped to named individuals in core.person_canonical via a multi-signal identifier that combines self-introductions, roll-call matching, chair-address turns, and a Claude Opus LLM-judge gate at a 0.99 auto-write confidence floor. Across the corpus we resolved ${DATA.speakerID.mentions.toLocaleString()} mentions into ${DATA.speakerID.uniqueIdentified} unique named individuals; the true count is almost certainly higher because transcription inconsistencies split single individuals across multiple records.`,
          },
          {
            label: "Classification and extraction",
            content: `Transcripts were chunked into ~2,000-word segments. Claude Sonnet 4.6 labeled every chunk on eight topics — Insurance; Rebuild; Wildfire Resilience; Open Space & Fire Management; Housing & STR; Climate & Water; Institutional Capital; Governance & Coordination — and four rhetorical dimensions on 1–5 scales: urgency, contentiousness, personal testimony, technical complexity. A second pass with Claude Opus 4.6 extracted verbatim quotes and speaker attributions from the highest-signal chunks, producing ${DATA.meetings.totalCandidateQuotes.toLocaleString()} candidates. Featured-quote curation and the narrative arc of this article were produced by Gemini 3 Pro reading the full ${DATA.meetings.filteredQuotePool.toLocaleString()}-quote filtered pool.`,
          },
          {
            label: "External data",
            content: `Fire losses, settlement figures, rebuild progress, and insurance statistics are cited to primary and Tier-1 news sources listed in the SOURCES array: the Boulder County Office of Emergency Management Lessons Learned and After-Action reports; the Colorado Division of Insurance's underinsurance study and FAIR Plan rulemaking record; Boulder Reporting Lab, Colorado Public Radio, The Colorado Sun, and CBS Colorado coverage of the Xcel settlement and rebuild trajectory; the Colorado Division of Fire Prevention and Control's Wildfire Resiliency Code record; and University of Colorado Boulder Earth Lab research on wildland-urban-interface fire dynamics. Where the council record and the external record diverged, we checked both; where they agreed, we reported once.`,
          },
          {
            label: "Limitations",
            content: `The absences are load-bearing. Louisville, Colorado and unincorporated Boulder County are not in this meeting corpus, and those are the jurisdictions that lost the most homes. Rhetorical dimension scores were not calibrated against human coders; they are relative measures, not absolutes. Speaker identification is vulnerable to transcript-level name-variant splits. Institutional-investor purchases of burned lots are discussed in the council record but not yet joined to Boulder County clerk deed transfers; that would require a separate primary-source scrape. The Colorado Division of Insurance's zip-code-level non-renewal data, which would allow a direct pre/post comparison, has not yet been obtained and remains a FOIA candidate.`,
          },
        ]}
      />

      <SocialShare title="Five Years After Marshall" />
      <ArticleEndCTA />
      <SourcesCitations sources={SOURCES} />
      <SubscribeBar />
    </main>
  );
}
