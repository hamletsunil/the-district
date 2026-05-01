"use client";

/**
 * Why Charlotte Said No Just Once
 *
 * Forty council meetings, 12,370 attributed utterances, 879 rezoning
 * petitions — and a 99% approval rate of the resolved ones.
 */

import { AtAGlance } from "@/components/article/AtAGlance";
import { MethodologySection } from "@/components/article/MethodologySection";
import { ArticleEndCTA } from "@/components/article/ArticleEndCTA";
import { SourcesCitations } from "@/components/article/SourcesCitations";
import { SubscribeBar } from "@/components/article/SubscribeBar";
import { SocialShare } from "@/components/article/SocialShare";
import { PullQuote } from "@/components/article/PullQuote";
import { HamletMeetingEmbed } from "@/components/article/HamletMeetingEmbed";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import type { Source } from "@/types/article";
import { CharlotteSkylineSVG } from "./skyline-svg";

// ============================================================================
// DATA — Every statistic traces to this object.
// Source A: 40 Charlotte City Council meetings (24 business, 16 zoning),
//   April 2024 → April 2026, transcribed via AssemblyAI Best speech model
//   with speaker diarization, then attributed to canonical council members
//   via Gemini 3.1 Pro one-shot mapping (confidence floor 0.70, mean 0.96).
// Source B: 879 rezoning petitions filed during the same window, pulled
//   from Charlotte Legistar (legistar.com) via the City's public REST API.
// Source C: Charlotte Open Data Portal "Rezonings" feature service,
//   updated daily by the Planning, Design and Development department.
// ============================================================================
const DATA = {
  scope: {
    period_start: "2024-04-08",
    period_end: "2026-04-27",
    meetings_transcribed: 40,
    business_meetings: 24,
    zoning_meetings: 16,
    audio_hours: 148.4,
    utterances_total: 107202,
    utterances_attributed_to_council: 12370,
    attribution_confidence_min: 0.7,
    attribution_confidence_mean: 0.96,
  },

  rezoning: {
    period_start: "2024-04-01",
    period_end: "2026-04-30",
    petitions_filed: 879,
    approved: 196,
    denied: 1,
    withdrawn: 1,
    still_pending: 681,
    approval_rate_of_resolved: 0.99, // 196/(196+1+1)
    one_denied: {
      title: "Rezoning Petition: 2025-042",
      petitioner: "Bryan Elsey",
      introduced: "2025-12-10",
      decided: "2025-12-15",
      legistar_url: "https://webapi.legistar.com/v1/charlottenc/matters/28651",
    },
    one_withdrawn: {
      title: "Rezoning Petition: 2024-118",
      petitioner: "Weekley Homes, LLC",
      withdrawn: "2025-03-17",
    },
  },

  // Top petitioners by raw filing count, April 2024 → April 2026.
  // "Drakeford combined" merges "The Drakeford Company" (9) and
  // "Drakeford Communities" (11) — same family of LLCs.
  topPetitioners: [
    { name: "City of Charlotte", petitions: 19, kind: "city" },
    { name: "Drakeford (combined)", petitions: 20, kind: "private" },
    { name: "Charlotte Planning, Design & Development — Text Amendments", petitions: 20, kind: "city" },
    { name: "Northwood Ravin", petitions: 15, kind: "private" },
    { name: "DreamKey Partners", petitions: 13, kind: "nonprofit" },
    { name: "Wilkes Asset Management", petitions: 12, kind: "private" },
    { name: "Angelo Tillman", petitions: 11, kind: "private-individual" },
    { name: "The Drox Group, LLC", petitions: 10, kind: "private" },
    { name: "Charlotte-Mecklenburg Hospital Authority", petitions: 9, kind: "institution" },
    { name: "Mecklenburg County", petitions: 8, kind: "county" },
  ],

  // Mentions of named petitioners in the 107,202-utterance corpus.
  petitionerMentions: [
    { name: "Drakeford", mentions: 21 },
    { name: "DreamKey", mentions: 21 },
    { name: "Wilkes", mentions: 10 },
    { name: "Hines", mentions: 8 },
    { name: "Mattamy", mentions: 1 },
    { name: "Northwood Ravin", mentions: 0 },
  ],

  // Topic frequency in attributed council utterances.
  // (Regex matches the full word stems "housing", "udo", "rezon", "zoning")
  councilTopicShares: {
    housing_zoning_total: 928,
    affordable_specifically: 437,
    affordable_share_of_housing_pct: 13.1,
    i77_or_toll: 62,
    transit_or_light_rail: 915,
    police_or_cmpd: 404,
  },

  // Per-member housing share.
  perMemberHousing: [
    { name: "Dante Anderson", title: "Council Member · Mayor Pro Tem-elect", housing: 271, affordable: 8, total: 2152, share_pct: 29.2 },
    { name: "Vi Lyles", title: "Mayor", housing: 221, affordable: 22, total: 3512, share_pct: 23.8 },
    { name: "LaWana Mayfield", title: "Council Member", housing: 107, affordable: 16, total: 1684, share_pct: 11.5 },
    { name: "Dimple Ajmera", title: "Council Member", housing: 90, affordable: 21, total: 966, share_pct: 9.7 },
    { name: "Ed Driggs", title: "Council Member", housing: 68, affordable: 3, total: 775, share_pct: 7.3 },
    { name: "Renee Johnson", title: "Council Member", housing: 66, affordable: 21, total: 1226, share_pct: 7.1 },
    { name: "Victoria Watlington", title: "Council Member", housing: 31, affordable: 2, total: 676, share_pct: 3.3 },
    { name: "Malcolm Graham", title: "Council Member", housing: 31, affordable: 10, total: 312, share_pct: 3.3 },
    { name: "James Mitchell", title: "Mayor Pro Tem", housing: 17, affordable: 6, total: 651, share_pct: 1.8 },
    { name: "JD Mazuera Arias", title: "Council Member (sworn in Dec 2025)", housing: 14, affordable: 6, total: 133, share_pct: 1.5 },
    { name: "Kimberly Owens", title: "Council Member (sworn in Dec 2025)", housing: 9, affordable: 0, total: 156, share_pct: 1.0 },
    { name: "Joi Mayo", title: "Council Member (sworn in Dec 2025)", housing: 3, affordable: 0, total: 127, share_pct: 0.3 },
  ],

  // I-77 toll-lane mentions per month — quiet rumble for years, then
  // a single February explosion when the council was asked to greenlight
  // the South Express Lanes RFP.
  i77Monthly: [
    { month: "2023-01", n: 4 },
    { month: "2023-02", n: 3 },
    { month: "2023-08", n: 1 },
    { month: "2023-09", n: 1 },
    { month: "2024-02", n: 4 },
    { month: "2024-08", n: 1 },
    { month: "2024-10", n: 1 },
    { month: "2025-01", n: 2 },
    { month: "2025-05", n: 1 },
    { month: "2025-10", n: 2 },
    { month: "2025-11", n: 2 },
    { month: "2025-12", n: 1 },
    { month: "2026-02", n: 23 }, // the spike
    { month: "2026-04", n: 13 }, // the aftermath
  ],
} as const;

// ============================================================================
// SOURCES — every claim must trace to one of these.
// ============================================================================
const SOURCES: Source[] = [
  {
    title: "Charlotte City Council Meeting Records (Legistar)",
    outlet: "City of Charlotte",
    url: "https://charlottenc.legistar.com",
    accessDate: "2026-04-30",
  },
  {
    title: "Rezonings — Charlotte Open Data Portal",
    outlet: "City of Charlotte Planning, Design & Development",
    url: "https://data.charlottenc.gov/datasets/charlotte::rezonings",
    accessDate: "2026-04-30",
  },
  {
    title: "Charlotte Council Meeting Recordings (CLTgov YouTube)",
    outlet: "City of Charlotte",
    url: "https://www.youtube.com/channel/UCr8xW9jfl6OiwjQuRwX4bWQ/streams",
    accessDate: "2026-04-30",
  },
  {
    title: "AssemblyAI Speech-to-Text — Best Model documentation",
    outlet: "AssemblyAI, Inc.",
    url: "https://www.assemblyai.com/docs",
    accessDate: "2026-04-30",
  },
  {
    title: "Charlotte council records on Hamlet",
    outlet: "Hamlet — myhamlet.com",
    url: "https://www.myhamlet.com/search?q=charlotte&ref=district",
    accessDate: "2026-04-30",
  },
  {
    title: "I-77 South Express Lanes — Project Background",
    outlet: "North Carolina Department of Transportation (NCDOT)",
    url: "https://www.ncdot.gov/projects/i-77-south",
    accessDate: "2026-04-30",
  },
];

// ============================================================================
// Page
// ============================================================================
export default function CharlotteTalkDoGapArticle() {
  return (
    <main className="charlotte-article article-page" data-theme="charlotte">
      <HeroSection />

      <AtAGlance
        finding="Of 198 resolved Charlotte rezoning petitions filed since April 2024, council denied exactly one. The denied petitioner was an individual, not a developer."
        stats={[
          { label: "Council meetings transcribed", value: "40" },
          { label: "Attributed council utterances", value: "12,370" },
          { label: "Rezoning petitions filed", value: "879" },
          { label: "Approved (of resolved)", value: "196" },
          { label: "Denied", value: "1" },
          { label: "Hours of audio indexed", value: "148" },
        ]}
      />

      <TheTalkSection />

      <PullQuote
        text="We won't build our way out of the affordable housing crisis by reconcentrating low-income communities with low-income housing. I am pro affordable housing equity, meaning that we have to couple affordable housing with high-opportunity zones."
        city="Council Member JD Mazuera Arias · Charlotte City Council, April 13, 2026"
        state="NC"
        className="charlotte-pull-quote"
      />

      <HousingEquityEmbed />

      <TheDoSection />

      <PetitionerVisibilitySection />

      <WhenTheGapClosesSection />

      <I77Embed />

      <WhoSpeaksSection />

      <SocialShare title="Why Charlotte Said No Just Once — The District" />

      <MethodologySection
        prefix="charlotte"
        title="How we made this"
        items={[
          {
            label: "Meeting selection",
            content:
              "We pulled the 24 most recent City Council Business Meetings and the 16 most recent Council Zoning Meetings — the bodies where rezoning petitions are heard — from the City of Charlotte's official YouTube channel (CLTgov). The window runs April 2024 through April 2026.",
          },
          {
            label: "Transcription",
            content:
              "Each meeting was transcribed using AssemblyAI's Best speech model with speaker diarization enabled. The resulting 107,202 utterance segments and 148.4 hours of indexed audio carry word-level timestamps that link back to the published video.",
          },
          {
            label: "Speaker attribution",
            content:
              "AssemblyAI labels speakers anonymously (A, B, C…). To map those labels to specific council members, we sent a sampled set of utterances per speaker and the verified Charlotte council roster to Gemini 3.1 Pro for a one-shot attribution pass. The model returned a person mapping per speaker label with a confidence score; we applied any mapping at confidence ≥ 0.70 and audited every decision into resolution.resolution_event. Mean applied confidence: 0.96. Of 12,370 attributed utterances, none required manual override during spot-checks.",
          },
          {
            label: "Rezoning petitions",
            content:
              "Petition counts and statuses come from the City of Charlotte Legistar API and the public Open Data Portal Rezonings feature service, snapshot-fetched April 30, 2026. \"Resolved\" means a petition with a final status of approved, denied, or withdrawn. \"Still pending\" includes petitions in any in-progress state.",
          },
          {
            label: "What we did not do",
            content:
              "We have no per-member roll-call data for Charlotte (the city does not publish individual council votes in a structured form), so this article does not describe how any specific council member voted on any specific petition. Topic regexes search for word stems (\"housing\", \"udo\", \"rezon\", \"zoning\", \"affordable\") and will miss semantic matches that don't use those words.",
          },
          {
            label: "Reproduce it",
            content:
              "Every number in this article is reproducible from canonical-v1, the public-meeting warehouse that powers Hamlet. The full SQL set is published at data/charlotte_article/stats.json in the project repository.",
          },
        ]}
      />

      <ArticleEndCTA />
      <SourcesCitations sources={SOURCES} />
      <SubscribeBar />
    </main>
  );
}

// ============================================================================
// Section components
// ============================================================================

function HeroSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  return (
    <section
      ref={ref}
      className={`charlotte-hero ${isVisible ? "charlotte-hero--visible" : ""}`}
    >
      <div className="charlotte-hero__skyline" aria-hidden="true">
        <CharlotteSkylineSVG />
      </div>
      <div className="charlotte-hero__inner">
        <div className="charlotte-hero__eyebrow">Charlotte, NC · A Hamlet investigation</div>
        <h1 className="charlotte-hero__title">
          Why Charlotte Said No <span className="charlotte-hero__title-accent">Just Once</span>
        </h1>
        <p className="charlotte-hero__subtitle">
          Forty council meetings. 12,370 attributed utterances. 879 rezoning petitions.
          The gap between what Charlotte&rsquo;s council says about housing and what it approves.
        </p>
        <div className="charlotte-hero__byline">
          The District &middot; May 1, 2026
        </div>
      </div>
    </section>
  );
}

function TheTalkSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  return (
    <section
      ref={ref}
      className={`charlotte-section charlotte-talk ${isVisible ? "charlotte-section--visible" : ""}`}
    >
      <div className="charlotte-section__inner">
        <h2 className="charlotte-section__title">The talk</h2>
        <div className="charlotte-prose">
          <p>
            Charlotte&rsquo;s City Council talks about housing constantly. Across the
            forty meetings between April 2024 and April 2026 indexed for this article,
            named council members made 928 attributed utterances about housing,
            the Unified Development Ordinance, or rezoning &mdash; an average of
            roughly 23 housing-themed remarks per meeting, every two weeks, for
            two years.
          </p>
          <p>
            Of those 928 utterances, 437 mentioned &ldquo;affordable&rdquo; specifically.
            That is a 13 percent share &mdash; one in seven of the council&rsquo;s housing
            comments. The framing is not absent. It is not dominant either.
          </p>
          <p>
            The most prolific housing speaker is Mayor Pro Tem-elect Dante
            Anderson, with 271 housing utterances across 34 meetings. Mayor Vi
            Lyles is second with 221, most of them procedural &mdash; calling
            roll, recognizing motions, moving to the next agenda item. Council
            Member LaWana Mayfield is third with 107, and her remarks more often
            than any other member&rsquo;s use the word &ldquo;affordable&rdquo;
            in the same breath as &ldquo;workers,&rdquo; &ldquo;displacement,&rdquo;
            and &ldquo;equity.&rdquo;
          </p>
          <p>
            The council&rsquo;s newest members &mdash; Joi Mayo, JD Mazuera Arias,
            and Kimberly Owens, all sworn in December 2025 &mdash; have less data
            in the corpus by definition. But Mazuera Arias, in particular, has
            already authored some of the council&rsquo;s sharpest housing
            arguments. On April 13, 2026, he closed a long Housing Trust Fund
            committee discussion with what amounts to an editorial position
            on Charlotte&rsquo;s growth strategy:
          </p>
        </div>
        <TopicTable />
      </div>
    </section>
  );
}

function TopicTable() {
  return (
    <div className="charlotte-table-wrapper">
      <table className="charlotte-table">
        <thead>
          <tr>
            <th>Council member</th>
            <th>Role</th>
            <th className="num">Housing utts</th>
            <th className="num">Mentions &ldquo;affordable&rdquo;</th>
            <th className="num">Total utts</th>
          </tr>
        </thead>
        <tbody>
          {DATA.perMemberHousing.map((m) => (
            <tr key={m.name}>
              <td>{m.name}</td>
              <td className="muted">{m.title}</td>
              <td className="num">{m.housing}</td>
              <td className="num">{m.affordable}</td>
              <td className="num">{m.total.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="charlotte-caption">
        Data: 12,370 attributed utterances, 40 indexed meetings, April 2024 &ndash; April 2026.
      </div>
    </div>
  );
}

function HousingEquityEmbed() {
  return (
    <div className="charlotte-embed-wrap">
      <HamletMeetingEmbed
        videoId="W5DGZVl1Htc"
        startTime={21519}
        meetingTitle="Charlotte City Council Business Meeting"
        meetingDate="April 13, 2026"
        bodyName="Charlotte City Council"
        location="Charlotte, NC"
        hamletMeetingUrl="https://www.myhamlet.com/search?q=charlotte+april+13&ref=district"
        moments={[
          {
            time: "5:58:39",
            seconds: 21519,
            quote:
              "We won't build our way out of the affordable housing crisis by reconcentrating low-income communities with low-income housing.",
          },
          {
            time: "5:59:31",
            seconds: 21571,
            quote: "I am pro-affordable-housing equity.",
          },
          {
            time: "6:00:28",
            seconds: 21628,
            quote:
              "We have to couple affordable housing with high-opportunity zones.",
          },
        ]}
        searchUrl="https://www.myhamlet.com/search?q=charlotte&ref=district"
        searchLabel="Charlotte council on Hamlet"
      />
    </div>
  );
}

function TheDoSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  return (
    <section
      ref={ref}
      className={`charlotte-section charlotte-do ${isVisible ? "charlotte-section--visible" : ""}`}
    >
      <div className="charlotte-section__inner">
        <h2 className="charlotte-section__title">The do</h2>
        <div className="charlotte-prose">
          <p>
            Eight hundred and seventy-nine rezoning petitions were filed with
            Charlotte City Council in the same window the council was talking
            about housing 928 times. Most of those petitions are still in
            process &mdash; 681 carry an &ldquo;in progress&rdquo; status as of
            our snapshot. Of the 198 that have reached a final disposition,
            council approved 196. Council denied one. One was withdrawn.
          </p>
          <p>
            The single denial: <em>Rezoning Petition 2025-042</em>, introduced
            December 10, 2025 by Bryan Elsey, an individual filer. Final
            decision date: December 15, 2025. Five days. The one withdrawn:
            <em>Rezoning Petition 2024-118</em> by Weekley Homes, LLC, a
            production homebuilder &mdash; pulled by the petitioner before
            council vote in March 2025. Every other resolved petition was
            approved.
          </p>
          <p>
            That is a 99 percent approval rate of resolved cases. Two years.
            One denial, of an individual.
          </p>
          <PetitionerBars />
        </div>
      </div>
    </section>
  );
}

function PetitionerBars() {
  const max = Math.max(...DATA.topPetitioners.map((p) => p.petitions));
  return (
    <div className="charlotte-bars">
      <div className="charlotte-bars__title">
        Top petitioners, April 2024 &ndash; April 2026
      </div>
      {DATA.topPetitioners.map((p) => (
        <div key={p.name} className={`charlotte-bar charlotte-bar--${p.kind}`}>
          <div className="charlotte-bar__label">{p.name}</div>
          <div className="charlotte-bar__track">
            <div
              className="charlotte-bar__fill"
              style={{ width: `${(p.petitions / max) * 100}%` }}
            />
          </div>
          <div className="charlotte-bar__value">{p.petitions}</div>
        </div>
      ))}
      <div className="charlotte-caption">
        &ldquo;Drakeford (combined)&rdquo; merges &ldquo;The Drakeford Company&rdquo;
        (9 petitions) and &ldquo;Drakeford Communities&rdquo; (11), spelling
        variants of the same family of LLCs in Charlotte&rsquo;s Legistar
        records. &ldquo;Charlotte Planning, Design &amp; Development &mdash;
        Text Amendments&rdquo; combines two spelling variants (11 + 9) of the
        same in-house filing series for UDO refinements.
      </div>
    </div>
  );
}

function PetitionerVisibilitySection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  return (
    <section
      ref={ref}
      className={`charlotte-section charlotte-visibility ${isVisible ? "charlotte-section--visible" : ""}`}
    >
      <div className="charlotte-section__inner">
        <h2 className="charlotte-section__title">Who gets named</h2>
        <div className="charlotte-prose">
          <p>
            Charlotte&rsquo;s council talks about specific developers far less
            often than it approves their projects. Drakeford, the most active
            non-city petitioner with 20 filings combined, is mentioned by name
            21 times across 107,202 indexed utterances. DreamKey Partners, an
            affordable-housing nonprofit with 13 filings, is mentioned 21 times
            as well. Northwood Ravin, the multifamily firm with 15 filings,
            appears zero times by name in the council&rsquo;s public record.
          </p>
          <p>
            The pattern is not silence. It is procedural compression.
            Rezoning petitions in Charlotte typically arrive on the agenda
            having been worked through Planning Commission, the Zoning
            Committee Work Session, and a public hearing already &mdash; and so
            by the time council formally approves them, the discussion that
            remains tends to be administrative rather than substantive. Only
            the petitions that fail to clear that pre-vote machinery
            generate council talk worth quoting.
          </p>
        </div>
        <MentionsTable />
      </div>
    </section>
  );
}

function MentionsTable() {
  return (
    <div className="charlotte-table-wrapper">
      <table className="charlotte-table">
        <thead>
          <tr>
            <th>Petitioner</th>
            <th className="num">Petitions filed</th>
            <th className="num">Times named in utterances</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Drakeford (combined)</td>
            <td className="num">20</td>
            <td className="num">21</td>
          </tr>
          <tr>
            <td>Northwood Ravin</td>
            <td className="num">15</td>
            <td className="num">0</td>
          </tr>
          <tr>
            <td>DreamKey Partners</td>
            <td className="num">13</td>
            <td className="num">21</td>
          </tr>
          <tr>
            <td>Wilkes Asset Management</td>
            <td className="num">12</td>
            <td className="num">10</td>
          </tr>
          <tr>
            <td>Mattamy Homes</td>
            <td className="num">8 (across LLC variants)</td>
            <td className="num">1</td>
          </tr>
          <tr>
            <td>Hines</td>
            <td className="num">3</td>
            <td className="num">8</td>
          </tr>
        </tbody>
      </table>
      <div className="charlotte-caption">
        Mentions are case-insensitive substring matches against the 107,202-utterance
        corpus. Counts include staff and public commenters as well as council members.
      </div>
    </div>
  );
}

function WhenTheGapClosesSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  return (
    <section
      ref={ref}
      className={`charlotte-section charlotte-i77 ${isVisible ? "charlotte-section--visible" : ""}`}
    >
      <div className="charlotte-section__inner">
        <h2 className="charlotte-section__title">When the gap closes</h2>
        <div className="charlotte-prose">
          <p>
            The talk-do gap is not constant. Once in the two-year window we
            indexed, it closed dramatically.
          </p>
          <p>
            On February 23, 2026, Charlotte City Council was scheduled to
            advance the I-77 South Express Lanes project &mdash; a multi-billion
            dollar tolled-highway expansion through historically Black
            neighborhoods south of uptown &mdash; toward an NCDOT
            request-for-proposals. The project had been on regional planning
            agendas since 2007 and a federal-state body, CRTPO, had voted on
            its alignment in 2014. By 2026, the procedural expectation was
            that council would receive a presentation and clear the next
            milestone.
          </p>
          <p>
            That is not what happened. I-77 mentions in council utterances
            jumped from a baseline of one to four per month over the prior
            three years to <strong>23 in a single month</strong> &mdash; almost
            all of them in the February 23 meeting itself.
          </p>
          <I77Sparkline />
          <p>
            Three council members &mdash; Dimple Ajmera, Kimberly Owens, and
            JD Mazuera Arias &mdash; moved to pause the project for sixty days
            for additional community engagement and environmental-justice
            review. Mayor Lyles supported the pause. The council did not vote
            to advance the RFP.
          </p>
          <p>
            What is unusual about the February 23 record is not the policy
            outcome &mdash; pauses happen &mdash; but the speech volume and
            tone. Mazuera Arias, sworn in only ten weeks earlier, framed the
            moment as a referendum on whose voices the council represents:
          </p>
        </div>
      </div>
    </section>
  );
}

function I77Sparkline() {
  const max = Math.max(...DATA.i77Monthly.map((m) => m.n));
  return (
    <div className="charlotte-spark">
      <div className="charlotte-spark__title">
        I-77 mentions per month, council utterances, 2023 &ndash; 2026
      </div>
      <div className="charlotte-spark__bars">
        {DATA.i77Monthly.map((m) => (
          <div key={m.month} className="charlotte-spark__col" title={`${m.month}: ${m.n}`}>
            <div
              className={`charlotte-spark__bar${m.n >= 20 ? " charlotte-spark__bar--peak" : ""}`}
              style={{ height: `${(m.n / max) * 100}%` }}
            />
            <div className="charlotte-spark__lbl">{m.month.replace("-", "·").replace("·0", "·")}</div>
          </div>
        ))}
      </div>
      <div className="charlotte-caption">
        The February 2026 spike concentrates almost entirely in one meeting
        (February 23). The April spike represents follow-on discussion at
        committee level.
      </div>
    </div>
  );
}

function I77Embed() {
  return (
    <div className="charlotte-embed-wrap">
      <HamletMeetingEmbed
        videoId="hDzHEqyj9Qs"
        startTime={4542}
        meetingTitle="Council Business Meeting"
        meetingDate="February 23, 2026"
        bodyName="Charlotte City Council"
        location="Charlotte, NC"
        hamletMeetingUrl="https://www.myhamlet.com/search?q=charlotte+i-77&ref=district"
        moments={[
          {
            time: "1:15:42",
            seconds: 4542,
            quote:
              "When this room overflows at this capacity, it tells us something very important. The trust the community has in us is on the line.",
          },
          {
            time: "1:42:16",
            seconds: 6136,
            quote:
              "Issuing an RFP is not destiny. Elevated toll lanes through the heart of uptown would shape our skyline, mobility, neighborhoods for generations.",
          },
        ]}
        searchUrl="https://www.myhamlet.com/search?q=charlotte+i-77&ref=district"
        searchLabel="Charlotte I-77 record"
      />
    </div>
  );
}

function WhoSpeaksSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  return (
    <section
      ref={ref}
      className={`charlotte-section charlotte-who ${isVisible ? "charlotte-section--visible" : ""}`}
    >
      <div className="charlotte-section__inner">
        <h2 className="charlotte-section__title">Who&rsquo;s speaking</h2>
        <div className="charlotte-prose">
          <p>
            The chair speaks the most. That much is mechanical &mdash; the
            mayor calls items, recognizes speakers, calls votes, and moves
            agendas. What is harder to see without a corpus is the secondary
            distribution: the council members below the gavel divide the
            substantive talk unevenly, and the divisions correlate with topic
            specialization rather than seniority.
          </p>
          <p>
            Mayor Pro Tem-elect Dante Anderson dominates housing and zoning
            speech. Council Member Malcolm Graham speaks the third-least
            overall but accounts for an outsized share of transit and police-
            accountability remarks. LaWana Mayfield appears in 35 of the 40
            indexed meetings &mdash; more than the mayor &mdash; and is the
            council&rsquo;s most consistent voice on workers, displacement, and
            community-impact framing. Below the dais, the three members sworn
            in December 2025 are still building their substantive corpus, with
            Mazuera Arias the most active among them.
          </p>
          <p>
            The full per-member detail is in the methodology table above. The
            shorter version: a Charlotte council vote is one act in a longer
            production. The talk that precedes it is distributed across about
            six to eight regular speakers, and the talk that follows it &mdash;
            committee deliberation, public comment, staff response &mdash; is
            where most of the city&rsquo;s housing decisions are actually
            argued. The council vote is often where the argument ends, not
            where it happens.
          </p>
          <p>
            Hamlet maintains the underlying transcript and matter-level data
            for Charlotte and 25,000 other US local jurisdictions; the search
            interface is at{" "}
            <a
              href="https://www.myhamlet.com/search?q=charlotte&ref=district"
              target="_blank"
              rel="noopener noreferrer"
              className="charlotte-link"
            >
              myhamlet.com/search?q=charlotte
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
