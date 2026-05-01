"use client";

/**
 * Eleven Theories of a Highway
 *
 * On February 23, 2026, eight members of Charlotte's eleven-member city
 * council took the floor on the I-77 South Express Lanes. Mayor Lyles
 * presided. Reconstructed from the official meeting transcript and from
 * Steve Harrison's contemporaneous WFAE reporting.
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
// DATA — every statistic and quote traces to this object.
// Source: meetings.utterance + meetings.transcript in canonical-v1, the
// public-meeting warehouse that powers Hamlet (myhamlet.com). The Feb 23,
// 2026 council meeting was transcribed via AssemblyAI Best with speaker
// diarization, then attributed via Gemini 3.1 Pro.
// transcript_id: b7162e3d-cf5c-4012-9166-baea14602f50
// YouTube ID: hDzHEqyj9Qs
// Total recorded length: 2h 56m of council deliberation, 508 utterances.
// ============================================================================
const DATA = {
  meeting: {
    date: "2026-02-23",
    body: "Charlotte City Council Business Meeting",
    youtube_id: "hDzHEqyj9Qs",
    transcript_id: "b7162e3d-cf5c-4012-9166-baea14602f50",
    duration_seconds: 10536, // ~2h 56m
    utterances_total: 508,
    utterances_named_council: 348,
    council_members_who_spoke_on_i77: 8, // 8 council members + Mayor Lyles presiding
    council_members_silent_on_i77: 2, // Joi Mayo (D3), Victoria Watlington (At-Large)
    council_members_absent: 1, // LaWana Mayfield
  },

  // Per-member speaking volume on I-77 specifically, this single meeting.
  // 8 council members + Mayor Lyles presiding = 9 voices on the record that night.
  // Mayfield was absent. Mayo and Watlington were present but did not speak on I-77.
  speakers: [
    { name: "Vi Lyles", role: "Mayor", utts: 132, chars: 21198 },
    { name: "Kimberly Owens", role: "Council Member, District 6 (sworn in Dec 2025)", utts: 45, chars: 12121 },
    { name: "Renee Johnson", role: "Council Member, District 4", utts: 44, chars: 7938 },
    { name: "James Mitchell", role: "Mayor Pro Tem (elected Dec 2025)", utts: 34, chars: 5771 },
    { name: "Dimple Ajmera", role: "Council Member, At-Large", utts: 30, chars: 7853 },
    { name: "Malcolm Graham", role: "Council Member, District 2", utts: 21, chars: 10745 },
    { name: "Dante Anderson", role: "Council Member, District 1", utts: 19, chars: 7365 },
    { name: "JD Mazuera Arias", role: "Council Member, District 5 (sworn in Dec 2025)", utts: 12, chars: 8092 },
    { name: "Ed Driggs", role: "Council Member, District 7 (R) — sole CRTPO delegate, October 2024", utts: 11, chars: 5382 },
  ],

  // I-77 mentions per month — the run-up to + aftermath of February 23
  i77Monthly: [
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
    { month: "2026-04", n: 13 }, // the follow-on retreat + April 27 meeting
  ],

  // Each member's theory of leverage, paraphrased (full quotes verified
  // against meetings.utterance for transcript_id b7162e3d).
  theories: [
    {
      name: "Renee Johnson",
      theory: "Procedural reform first",
      summary:
        "The agenda rule (six members required to add an item) is itself the problem. Tonight's debate isn't on the agenda; it should be.",
      sequence: 180,
      start: 3797,
    },
    {
      name: "Malcolm Graham",
      theory: "60-day pause, retreat agenda",
      summary:
        'Place the project on the council retreat agenda Monday. "NCDOT is not talking at citizens, they are talking to citizens."',
      sequence: 205,
      start: 4079,
    },
    {
      name: "JD Mazuera Arias",
      theory: "Trust as the leverage",
      summary:
        "Frame the moment as a referendum on whose voices the council represents. Black neighborhoods have already paid for this corridor once.",
      sequence: 233,
      start: 4542,
    },
    {
      name: "Ed Driggs",
      theory: "Don't pause; keep the funds; lean harder",
      summary:
        'Wrote a memo. Argues a pause forfeits the $600M state allocation; says, "we just lean on them hard," and only escalate to obstruction if necessary.',
      sequence: 234,
      start: 4788,
    },
    {
      name: "Kimberly Owens",
      theory: "Government can't fix everything",
      summary:
        "Distinguishes the city's role from the state's. Names her own guideposts as a public servant.",
      sequence: 236,
      start: 5187,
    },
    {
      name: "James Mitchell",
      theory: "Promise + retreat agenda",
      summary:
        "Co-signs the retreat motion. Pledges personal advocacy work starting the next morning.",
      sequence: 237,
      start: 5443,
    },
    {
      name: "Vi Lyles",
      theory: "Acknowledge limits, route to staff",
      summary:
        'NCDOT runs the project. "We hear you" + community-relations staff in the room tonight to take questions.',
      sequence: 167,
      start: 3177,
    },
    {
      name: "Dante Anderson",
      theory: "District 1 corridor work since October",
      summary:
        "Frames the project as continuous engagement, not a single moment. Has been advocating with NCDOT for months.",
      sequence: 240,
      start: 5572,
    },
    {
      name: "Dimple Ajmera",
      theory: "RFP is not destiny",
      summary:
        '"Issuing RFP is not destiny, it is not democracy, and it is certainly not community consent." Calls for an explicit pause and a public hearing on procurement.',
      sequence: 252,
      start: 6136,
    },
  ],
} as const;

const SOURCES: Source[] = [
  {
    title: "Council Business Meeting — February 23, 2026 (full video)",
    outlet: "City of Charlotte (CLTgov YouTube)",
    url: "https://www.youtube.com/watch?v=hDzHEqyj9Qs",
    accessDate: "2026-04-30",
  },
  {
    title: "After public protest, 10 of 11 Charlotte City Council members support pausing I-77 toll lanes",
    outlet: "WFAE 90.7 (Steve Harrison)",
    url: "https://www.wfae.org/politics/2026-02-23/after-public-protest-10-of-11-charlotte-city-council-members-support-pausing-i-77-toll-lanes",
    accessDate: "2026-04-30",
  },
  {
    title: "A 'masterful, bureaucratic bait and switch' on I-77 toll lanes",
    outlet: "WFAE 90.7",
    url: "https://www.wfae.org/politics/2026-02-23/a-masterful-bureaucratic-bait-and-switch-on-i-77-toll-lanes",
    accessDate: "2026-04-30",
  },
  {
    title: "I-77 toll lanes are a potent political issue. Why isn't anyone seizing it?",
    outlet: "WFAE 90.7 (April 6, 2026)",
    url: "https://www.wfae.org/politics/2026-04-06/i-77-toll-lanes-are-a-potent-political-issue-why-isnt-anyone-seizing-it",
    accessDate: "2026-04-30",
  },
  {
    title: "Will a new resolution from Charlotte City Council slow I-77 toll lanes?",
    outlet: "WFAE 90.7 (April 28, 2026)",
    url: "https://www.wfae.org/politics/2026-04-28/will-a-new-resolution-from-charlotte-city-council-slow-i-77-toll-lanes",
    accessDate: "2026-04-30",
  },
  {
    title: "Charlotte City Council proposes resolution to pause I-77 expansion plans",
    outlet: "WBTV (April 29, 2026)",
    url: "https://www.wbtv.com/2026/04/29/charlotte-city-council-proposes-resolution-pause-i-77-expansion-plans/",
    accessDate: "2026-04-30",
  },
  {
    title: "Charlotte City Council to revisit I-77 South toll lanes",
    outlet: "Axios Charlotte",
    url: "https://www.axios.com/local/charlotte/2026/02/20/i77-south-toll-lanes-pause-north-carolina-ncdot",
    accessDate: "2026-04-30",
  },
  {
    title: "I-77 South Express Lanes — Project Records",
    outlet: "North Carolina Department of Transportation (NCDOT)",
    url: "https://www.ncdot.gov/projects/i-77-south-express-lanes/Pages/default.aspx",
    accessDate: "2026-04-30",
  },
  {
    title: "Charlotte City Council Meeting Records",
    outlet: "City of Charlotte Legistar",
    url: "https://charlottenc.legistar.com",
    accessDate: "2026-04-30",
  },
  {
    title: "Charlotte Regional Transportation Planning Organization (CRTPO)",
    outlet: "Centralina Regional Council",
    url: "https://crtpo.org/",
    accessDate: "2026-04-30",
  },
  {
    title: "Charlotte council records on Hamlet",
    outlet: "Hamlet — myhamlet.com",
    url: "https://www.myhamlet.com/search?q=charlotte+i-77&utm_source=district&utm_medium=internal&utm_content=sources",
    accessDate: "2026-04-30",
  },
];

export default function CharlotteThePauseArticle() {
  return (
    <main className="charlotte-article article-page" data-theme="charlotte">
      <HeroSection />

      <AtAGlance
        finding="On February 23, 2026, eight council members took the floor on a state highway project the city does not control. By April, ten of eleven supported some form of a pause. The eight who spoke that night did not agree on what kind of pause, what kind of leverage, or whose phone to dial first. The lone Republican on the dais — the same member who, sixteen months earlier, had cast Charlotte's full 46% CRTPO bloc himself to back the project — argued against pausing at all."
        stats={[
          { label: "Council members on the floor Feb 23", value: "8 of 11" },
          { label: "Council members supporting a pause by April", value: "10 of 11" },
          { label: "Hours on the record", value: "2h 56m" },
          { label: "Project total · State share", value: "$3.2B–$4B · $600M" },
          { label: "Charlotte's CRTPO weighted vote", value: "46%" },
          { label: "I-77 mentions, Feb 2026 vs. baseline", value: "23 vs. <2" },
        ]}
      />

      <TheRoomSection />

      <PullQuote
        text="When this room overflows at this capacity, it tells us something very important. It tells us that people feel unheard. The trust the community has in us is on the line."
        city="Council Member JD Mazuera Arias · Charlotte City Council, February 23, 2026"
        state="NC"
        className="charlotte-pull-quote"
      />

      <MazueraEmbed />

      <TheoriesSection />

      <DriggsSection />

      <DriggsEmbed />

      <SparklineSection />

      <ClosingSection />

      <SocialShare title="Eleven Theories of a Highway — The District" />

      <MethodologySection
        prefix="charlotte"
        title="How we made this"
        items={[
          {
            label: "The meeting",
            content:
              "We pulled the official video for the Charlotte City Council Business Meeting of February 23, 2026 from the City's CLTgov YouTube channel and transcribed it via AssemblyAI's Best speech model with speaker diarization enabled. The result: 508 utterance segments across 2 hours 56 minutes of recorded deliberation, all timestamped to the second.",
          },
          {
            label: "Speaker attribution",
            content:
              "AssemblyAI labels speakers anonymously (Speaker A, B, C…). To map those labels to specific council members, we passed sampled utterances per speaker plus the canonical Charlotte council roster to Gemini 3.1 Pro for a one-shot attribution pass. Charlotte's elected dais is the mayor (Vi Lyles) plus eleven council members: four at-large (Ajmera, Watlington, Mayfield, Mitchell) and seven district (Anderson D1, Graham D2, Mayo D3, Johnson D4, Mazuera Arias D5, Owens D6, Driggs D7). We applied any mapping at confidence ≥ 0.70. For this meeting, mean applied confidence was 0.97. Of the eight council members who spoke on I-77, all eight were correctly attributed; Mayor Lyles's remarks were also attributed at high confidence. Joi Mayo, Victoria Watlington, and LaWana Mayfield (absent) did not speak on I-77 and are not in the speakers table.",
          },
          {
            label: "Quote verification",
            content:
              "Every quote in this article was checked twice against the source. The transcript text was confirmed verbatim against the canonical-v1 utterance row, and the timestamp range was opened in the YouTube video to confirm the speaker spoke those words at that moment.",
          },
          {
            label: "What we did not do",
            content:
              "We did not interview any council member. We did not contact NCDOT or CRTPO. We did not infer voting positions where members did not state them. We did not characterize Ed Driggs's argument as objection or support — he stated his position in his own memo, which we excerpted but did not editorialize.",
          },
          {
            label: "Reproduce it",
            content:
              "All counts in this article are reproducible from canonical-v1, the public-meeting warehouse that powers Hamlet (myhamlet.com). Every utterance referenced has a stable transcript_id + sequence pair you can query directly.",
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
      <div className="charlotte-hero__veil" aria-hidden="true" />
      <div className="charlotte-hero__inner">
        <div className="charlotte-hero__eyebrow">
          Charlotte, NC · A Hamlet investigation
        </div>
        <h1 className="charlotte-hero__title">
          Eleven Theories of a{" "}
          <span className="charlotte-hero__title-accent">Highway</span>
        </h1>
        <p className="charlotte-hero__subtitle">
          Eight council members took the floor on a state project the city
          does not control. By April, ten of eleven supported some form of
          a pause. The lone Republican &mdash; who had cast Charlotte&rsquo;s
          full CRTPO bloc himself in October 2024 &mdash; argued against
          pausing at all.
        </p>
        <div className="charlotte-hero__byline">
          The District &middot; May 1, 2026
        </div>
      </div>
    </section>
  );
}

function TheRoomSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  return (
    <section
      ref={ref}
      className={`charlotte-section charlotte-room ${isVisible ? "charlotte-section--visible" : ""}`}
    >
      <div className="charlotte-section__inner">
        <h2 className="charlotte-section__title">Three hours of testimony</h2>
        <div className="charlotte-prose">
          <p>
            The agenda did not say I-77. It said opening remarks, a moment of
            silence, a public forum, and then the regular business of a
            Monday-night Charlotte City Council meeting in late February. The
            forum portion ran 90 minutes. The chamber filled past capacity.
            Speakers came on housing displacement, on airport workers, and on
            the I-77 South Express Lanes &mdash; a state-led project, recently
            re-priced by NCDOT at more than $4 billion, that would add roughly
            eleven miles of tolled lanes south from uptown to the South
            Carolina line. The corridor crosses Wilmore, Wesley Heights,
            McCrorey Heights, Reid Park, Revolution Park, and Brookhill, west-
            and south-side neighborhoods historically Black and already cut
            through once before by I-77 itself in the 1960s, on the back of
            uptown&rsquo;s razed Brooklyn neighborhood.
          </p>
          <p>
            Charlotte&rsquo;s formal power over this project is small. NCDOT
            owns the road and signs the procurement. The city&rsquo;s only
            seat at the table is on the Charlotte Regional Transportation
            Planning Organization (CRTPO), where Charlotte holds 46 percent
            of the weighted board vote. That seat was filled, on October 16,
            2024, by Council Member Ed Driggs &mdash; the lone Republican on
            the dais on Feb 23 &mdash; who cast Charlotte&rsquo;s full bloc
            in favor of NCDOT&rsquo;s plan. WFAE characterized the
            eighteen-month sequence between that vote and the February
            meeting as &ldquo;a masterful, bureaucratic bait and switch,&rdquo;
            building on Mecklenburg County Commissioner Leigh Altman&rsquo;s
            complaint that the project&rsquo;s impact maps were withheld
            until after CRTPO&rsquo;s authority over the matter had lapsed.
          </p>
          <p>
            The unspoken reference point was 2019, when the I-77 North
            Express Lanes opened &mdash; operated by the Spanish toll firm
            Cintra under a fifty-year contract whose Q2 2025 toll revenue
            alone hit $35.1 million, up roughly thirty percent year over
            year. By any commercial measure, Cintra is winning. Every
            council member who spoke on Feb 23 was arguing about Cintra
            without saying so.
          </p>
          <p>
            Charlotte runs on a council-manager charter. There are eleven
            council members &mdash; four at-large, seven district. Mayor Vi
            Lyles presides and votes only to break ties. City Manager Marcus
            Jones runs the day-to-day. That arrangement is the reason the
            council&rsquo;s reasoning, on a night like this, matters more than
            its formal authority. Of the eleven council members, eight took
            the floor on I-77. LaWana Mayfield was absent. Joi Mayo, sworn in
            two months earlier, and Victoria Watlington, the at-large
            representative on housing, did not speak on the project that
            night. Each member who did speak reached for a different lever.
          </p>
          <p>
            Council Member Renee Johnson opened the council&rsquo;s
            deliberation by attacking the meeting&rsquo;s own structure.
            Charlotte&rsquo;s rules require unanimous consent &mdash; all
            eleven council members &mdash; to put a new item on the agenda
            same-night. Driggs declined. The three-hour discussion that
            followed was, technically, off-agenda. Outside the chamber, the
            organized opposition had names: Sustain Charlotte (Shannon Binns),
            Action NC, and the Black Political Caucus of
            Charlotte-Mecklenburg, whose transportation chair Raki McGregor
            would, weeks later, announce a TRO suit to stop the project.
          </p>
        </div>
      </div>
    </section>
  );
}

function MazueraEmbed() {
  return (
    <div className="charlotte-embed-wrap">
      <HamletMeetingEmbed
        videoId="hDzHEqyj9Qs"
        startTime={4542}
        meetingTitle="Council Business Meeting"
        meetingDate="February 23, 2026"
        bodyName="Charlotte City Council"
        location="Charlotte, NC"
        hamletMeetingUrl="https://www.myhamlet.com/search?q=charlotte+i-77+february&utm_source=district&utm_medium=internal&utm_content=meeting-embed"
        moments={[
          {
            time: "1:15:42",
            seconds: 4542,
            quote:
              "When this room overflows at this capacity, it tells us something very important.",
          },
          {
            time: "1:16:31",
            seconds: 4591,
            quote:
              "I want to begin by acknowledging the residents who are here, particularly those from historically Black neighborhoods.",
          },
          {
            time: "1:17:48",
            seconds: 4668,
            quote:
              "I have inherently always believed that express lanes, toll lanes are inherently classist.",
          },
          {
            time: "1:19:35",
            seconds: 4775,
            quote:
              "A pause is not obstruction. It is not anti-growth. It is our due diligence.",
          },
        ]}
        searchUrl="https://www.myhamlet.com/search?q=charlotte+i-77&utm_source=district&utm_medium=internal&utm_content=meeting-embed-search"
        searchLabel="Charlotte I-77 record"
      />
    </div>
  );
}

function TheoriesSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  return (
    <section
      ref={ref}
      className={`charlotte-section charlotte-theories ${isVisible ? "charlotte-section--visible" : ""}`}
    >
      <div className="charlotte-section__inner">
        <h2 className="charlotte-section__title">Eight council members, plus the mayor</h2>
        <div className="charlotte-prose">
          <p>
            The simplest reading is the one Steve Harrison has run on WFAE
            for two months: a council that, faced with a project galvanizing
            the west side and exposing an October 2024 procedural misstep,
            fragmented and produced no concrete authority to act. That
            reading is partly right. It is also incomplete.
          </p>
          <p>
            Look at what each member reached for. Renee Johnson reached for
            the agenda rule. Malcolm Graham reached for the council&rsquo;s
            own retreat. JD Mazuera Arias &mdash; the council&rsquo;s first
            Latino member, who had won District 5 by 34 votes in a recount
            two months earlier &mdash; and Kimberly Owens, the first Democrat
            ever to hold District 6, reached for trust. Mayor Lyles reached
            for the NCDOT community-relations staff seated in the chamber.
            Dimple Ajmera reached for the procurement timeline. Dante
            Anderson, the District 1 representative whose ward absorbs the
            corridor, reached for nine months of work he had already done
            with NCDOT staff on noise walls and transit-justice money.
            Driggs, alone, reached for the $600 million state allocation and
            tried to pull the rest of the council back. The fragmentation was
            not failure of nerve. It was eight incompatible bets on where
            municipal power lives.
          </p>
          <p>
            Across the grid below, eight council members and the mayor in the
            order they spoke, with timestamped jumps. Down the grid, the
            absences: Mayfield (absent), Mayo and Watlington (silent on
            I-77).
          </p>
        </div>
        <TheoriesGrid />
      </div>
    </section>
  );
}

function TheoriesGrid() {
  return (
    <div className="charlotte-theories-grid">
      {DATA.theories.map((t) => (
        <article key={t.name} className="charlotte-theory">
          <header className="charlotte-theory__head">
            <div className="charlotte-theory__name">{t.name}</div>
            <div className="charlotte-theory__theory">{t.theory}</div>
          </header>
          <p className="charlotte-theory__summary">{t.summary}</p>
          <a
            href={`https://www.youtube.com/watch?v=${DATA.meeting.youtube_id}&t=${t.start}s`}
            target="_blank"
            rel="noopener noreferrer"
            className="charlotte-theory__cite"
          >
            Jump to this moment in the video &rarr;
          </a>
        </article>
      ))}
    </div>
  );
}

function DriggsSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  return (
    <section
      ref={ref}
      className={`charlotte-section charlotte-driggs ${isVisible ? "charlotte-section--visible" : ""}`}
    >
      <div className="charlotte-section__inner">
        <h2 className="charlotte-section__title">Ed Driggs alone</h2>
        <div className="charlotte-prose">
          <p>
            Driggs is now the council&rsquo;s only Republican &mdash; Tariq
            Bokhari left, and Krista Bokhari lost her District 6 seat to
            Owens. He was also, on the night of February 23, the council&rsquo;s
            only voice arguing in detail against pausing the project. He did
            not do this by defending it. He did this by walking the council
            through, point by point, the legal architecture of how the
            project had reached this moment, what the procurement timeline
            looked like, and what would happen to the $600 million state
            allocation if Charlotte instructed its CRTPO delegate to vote
            against NCDOT.
          </p>
          <p>
            That CRTPO delegate, on October 16, 2024, had been Driggs
            himself &mdash; casting Charlotte&rsquo;s full 46 percent
            weighted bloc in favor of NCDOT&rsquo;s plan on a board where
            the motion ultimately passed 14-7. WFAE&rsquo;s Steve Harrison
            has called Driggs&rsquo;s vote on that date &ldquo;the deciding
            vote.&rdquo;
          </p>
          <p>
            Driggs had circulated a memo to colleagues. He read from it.
            The reading ran roughly seven minutes &mdash; the longest
            uninterrupted speech of the evening. His position, in his own
            framing: a 60-day pause forfeits the money. Lean on NCDOT
            instead. He argued the council had not actually reauthorized the
            project in 2024 (a point on which he and his colleagues read the
            record differently); that the council&rsquo;s influence was
            rhetorical, not procedural; and that instructing CRTPO to
            obstruct NCDOT was not a legally available move. He spoke as
            someone who had been in the CRTPO meetings most of the council
            had not.
          </p>
          <p>
            What did not appear in the memo, but which Steve Harrison has
            since surfaced on WFAE, is what Driggs himself told constituents
            on October 14, 2024 &mdash; two days before he cast Charlotte&rsquo;s
            CRTPO bloc. &ldquo;Sometimes you get these early votes and then
            later on you don&rsquo;t feel like you have a choice,&rdquo; he
            said. &ldquo;There&rsquo;s nothing to stop us in nine months from
            looking at whatever comes out of this process and just saying no,
            not going to do it.&rdquo; The nine months elapsed. The council,
            in February, was trying to figure out whether saying no still
            worked.
          </p>
        </div>
      </div>
    </section>
  );
}

function DriggsEmbed() {
  return (
    <div className="charlotte-embed-wrap">
      <HamletMeetingEmbed
        videoId="hDzHEqyj9Qs"
        startTime={4788}
        meetingTitle="Council Business Meeting"
        meetingDate="February 23, 2026"
        bodyName="Charlotte City Council"
        location="Charlotte, NC"
        hamletMeetingUrl="https://www.myhamlet.com/search?q=charlotte+i-77+driggs&utm_source=district&utm_medium=internal&utm_content=meeting-embed"
        moments={[
          {
            time: "1:19:48",
            seconds: 4788,
            quote: "I'm in sort of an unusual position here.",
          },
          {
            time: "1:21:36",
            seconds: 4896,
            quote:
              "The $600 million is gone. And $100 million for local road projects that are associated with that is also gone.",
          },
          {
            time: "1:23:12",
            seconds: 4992,
            quote:
              "We need to use our influence with NCDOT to deliver the message that we've heard tonight.",
          },
          {
            time: "1:25:48",
            seconds: 5148,
            quote:
              "I think we just lean on them hard, and then if the time comes when we determine, okay, it's just not working, then we can talk about just blowing the whole thing up.",
          },
        ]}
        searchUrl="https://www.myhamlet.com/search?q=charlotte+i-77+driggs&utm_source=district&utm_medium=internal&utm_content=meeting-embed-search"
        searchLabel="Driggs on I-77"
      />
    </div>
  );
}

function SparklineSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  return (
    <section
      ref={ref}
      className={`charlotte-section charlotte-spike ${isVisible ? "charlotte-section--visible" : ""}`}
    >
      <div className="charlotte-section__inner">
        <h2 className="charlotte-section__title">From background noise to crisis</h2>
        <div className="charlotte-prose">
          <p>
            Across the 40 Charlotte council meetings indexed for this analysis
            (April 2024 through April 2026), the I-77 South Express Lanes
            project surfaced in council speech fewer than two utterances per
            month on average. In February 2026 the count jumped to twenty-
            three, almost all of them from this single meeting. WFAE&rsquo;s
            March 2 headline after the council retreat read &ldquo;Council
            blinked.&rdquo; The matter returned to the dais on April 27,
            2026; Mayor Lyles placed the resulting seven-page resolution on
            the May 11 agenda. The April utterance count was thirteen.
          </p>
          <I77Sparkline />
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
            <div className="charlotte-spark__lbl">{m.month}</div>
          </div>
        ))}
      </div>
      <div className="charlotte-caption">
        The February 2026 spike concentrates almost entirely in a single meeting.
      </div>
    </div>
  );
}

function ClosingSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  return (
    <section
      ref={ref}
      className={`charlotte-section charlotte-close ${isVisible ? "charlotte-section--visible" : ""}`}
    >
      <div className="charlotte-section__inner">
        <h2 className="charlotte-section__title">What the council decided, and what it didn&rsquo;t</h2>
        <div className="charlotte-prose">
          <p>
            Mayor Lyles, who had presided through three hours of testimony
            and deliberation, spoke briefly near midnight. She said:
            &ldquo;We all know that McCrorey Heights is a special
            neighborhood. You know, I grew up with my aunt&rsquo;s house
            still there. So when you start doing these kinds of projects,
            they do get to be where you have a place where it&rsquo;s human
            to you.&rdquo; It was the only personal note Lyles offered all
            evening. The motion that ultimately passed was a motion to add
            the project to the council&rsquo;s March 2 retreat agenda. That
            is, formally, what the meeting decided.
          </p>
          <p>
            What it also showed was that eight council members and a mayor
            held incompatible ideas about how city power works on a state
            project. The retreat motion bought a week to figure out which
            idea was right. The retreat happened (WFAE&rsquo;s March 2
            headline: &ldquo;Council blinked&rdquo;). A committee meeting on
            April 27 followed. A seven-page resolution &mdash; directing
            Charlotte&rsquo;s CRTPO delegate to withhold support &mdash; is
            now scheduled for the dais on May 11, 2026. None of these steps
            stops the project. Each one buys the council another chance to
            decide which approach was right.
          </p>
          <p>
            The full meeting transcript, searchable and timestamped against
            the YouTube video, is at{" "}
            <a
              href="https://www.myhamlet.com/search?q=charlotte+i-77+february&utm_source=district&utm_medium=internal&utm_content=prose"
              target="_blank"
              rel="noopener noreferrer"
              className="charlotte-link"
            >
              myhamlet.com
            </a>
            . Hamlet maintains the same indexing for 25,000 other US local
            governments.
          </p>
        </div>
      </div>
    </section>
  );
}
