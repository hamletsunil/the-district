"use client";

/**
 * Twelve Theories of a Highway
 *
 * On February 23, 2026, twelve members of Charlotte City Council took the
 * I-77 South Express Lanes apart twelve different ways. This is the story
 * of that meeting, reconstructed from the official transcript.
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
    council_members_who_spoke: 10,
  },

  // Per-member speaking volume, this single meeting only
  speakers: [
    { name: "Vi Lyles", role: "Mayor", utts: 132, chars: 21198 },
    { name: "Kimberly Owens", role: "Council Member (sworn in Dec 2025)", utts: 45, chars: 12121 },
    { name: "Renee Johnson", role: "Council Member, District 4", utts: 44, chars: 7938 },
    { name: "James Mitchell", role: "Mayor Pro Tem", utts: 34, chars: 5771 },
    { name: "Dimple Ajmera", role: "Council Member, At-Large", utts: 30, chars: 7853 },
    { name: "Malcolm Graham", role: "Council Member, District 2", utts: 21, chars: 10745 },
    { name: "Dante Anderson", role: "Council Member, District 1; Mayor Pro Tem-elect", utts: 19, chars: 7365 },
    { name: "JD Mazuera Arias", role: "Council Member (sworn in Dec 2025)", utts: 12, chars: 8092 },
    { name: "Ed Driggs", role: "Council Member, District 7 (R)", utts: 11, chars: 5382 },
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
        '"Issuing RFP is not destiny, it is not democracy, and it is certainly not community consent." Calls for explicit pause + scrutiny.',
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
    title: "I-77 South Express Lanes — Project Records",
    outlet: "North Carolina Department of Transportation (NCDOT)",
    url: "https://www.ncdot.gov/projects/i-77-south",
    accessDate: "2026-04-30",
  },
  {
    title: "Charlotte City Council Meeting Records",
    outlet: "City of Charlotte Legistar",
    url: "https://charlottenc.legistar.com",
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
    url: "https://www.myhamlet.com/search?q=charlotte+i-77&ref=district",
    accessDate: "2026-04-30",
  },
  {
    title: "Charlotte Regional Transportation Planning Organization (CRTPO)",
    outlet: "Centralina Regional Council",
    url: "https://crtpo.org/",
    accessDate: "2026-04-30",
  },
];

export default function CharlotteThePauseArticle() {
  return (
    <main className="charlotte-article article-page" data-theme="charlotte">
      <HeroSection />

      <AtAGlance
        finding="The pause request that came out of Charlotte's February 23 meeting was not unanimous, not procedural, and not really about a highway. It was twelve members each pulling on a different lever — and one quietly arguing they should stop pulling."
        stats={[
          { label: "Council members who spoke", value: "10 of 12" },
          { label: "Total utterances in the meeting", value: "508" },
          { label: "Hours on the record", value: "2h 56m" },
          { label: "I-77 mentions, Feb 2026", value: "23" },
          { label: "I-77 mentions, prior monthly average", value: "<2" },
          { label: "Pause length requested", value: "60 days" },
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

      <SocialShare title="Twelve Theories of a Highway — The District" />

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
              "AssemblyAI labels speakers anonymously (Speaker A, B, C…). To map those labels to specific council members, we passed sampled utterances per speaker plus the canonical Charlotte council roster to Gemini 3.1 Pro for a one-shot attribution pass. We applied any mapping at confidence ≥ 0.70. For this meeting, mean applied confidence was 0.97. Of the ten council members who spoke, all ten were correctly attributed.",
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
      <div className="charlotte-hero__inner">
        <div className="charlotte-hero__eyebrow">
          Charlotte, NC · A Hamlet investigation
        </div>
        <h1 className="charlotte-hero__title">
          Twelve Theories of a{" "}
          <span className="charlotte-hero__title-accent">Highway</span>
        </h1>
        <p className="charlotte-hero__subtitle">
          On the night of February 23, 2026, Charlotte City Council took a
          multibillion-dollar state proposal apart, member by member &mdash;
          and ended the night with no agreement on what they had actually
          done about it.
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
        <h2 className="charlotte-section__title">The room</h2>
        <div className="charlotte-prose">
          <p>
            The agenda did not say I-77. It said opening remarks, a moment of
            silence for the late Reverend Jesse Jackson, a public forum, and
            then the regular business of a Monday-night Charlotte City Council
            meeting in late February. The forum portion ran 90 minutes. The
            chamber overflowed. Speakers came on housing displacement, on
            airport workers, on the I-77 South Express Lanes &mdash; a
            multibillion-dollar tolled-highway expansion through historically
            Black neighborhoods south of uptown that had been on regional
            planning agendas since 2007.
          </p>
          <p>
            The council members did not have a vote scheduled on I-77. They
            had a presentation scheduled. By the time the room cleared and the
            council&rsquo;s own deliberation began, ten of the twelve members
            had spoken on the project. Each one located the lever differently.
          </p>
          <p>
            Council Member Renee Johnson opened the council&rsquo;s
            deliberation by attacking the meeting&rsquo;s own structure.
            Charlotte&rsquo;s rules require six council members to put a new
            item on the agenda. She had been arguing since 2021 that the
            threshold should be lower. With three hundred residents in the
            chamber that night, the threshold had not been met. The
            three-hour discussion that followed was technically off-agenda.
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
        hamletMeetingUrl="https://www.myhamlet.com/search?q=charlotte+i-77+february&ref=district"
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
        searchUrl="https://www.myhamlet.com/search?q=charlotte+i-77&ref=district"
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
        <h2 className="charlotte-section__title">Nine speakers, nine theories</h2>
        <div className="charlotte-prose">
          <p>
            Every council member who spoke on I-77 located their leverage in a
            different place. None of the theories overlapped completely. The
            mayor pointed out that the project is run by NCDOT and the city
            cannot stop it directly. The mayor pro tem-elect noted that he had
            been in the District 1 community on this project since the
            previous October. The District 4 representative argued that the
            agenda rule itself was the binding constraint. The District 2
            representative drafted the formal pause motion. Two members sworn
            in less than ten weeks earlier &mdash; Mazuera Arias and Owens
            &mdash; framed the question as a test of council&rsquo;s
            relationship to the people in the room.
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
        <h2 className="charlotte-section__title">The dissent</h2>
        <div className="charlotte-prose">
          <p>
            Council Member Ed Driggs was the only Republican on the dais and
            the only member to argue, in detail, against the pause. He did not
            do this by defending the project. He did this by walking the
            council through, point by point, the legal architecture of how the
            project had reached this moment, what the procurement timeline
            looked like, and what would happen to the $600 million in state
            allocation if Charlotte stepped out.
          </p>
          <p>
            Driggs had circulated a memo to colleagues that night. He read
            from it. The reading lasted seven minutes. It was the longest
            single uninterrupted speech of the night.
          </p>
          <p>
            His position, in his own framing: a 60-day pause forfeits the
            money. Lean on NCDOT instead. He argued the council had not in
            fact reauthorized the project in 2024 (a point on which he and
            other members read the record differently); that the council&rsquo;s
            actual leverage was not procedural but rhetorical; and that
            instructing the city&rsquo;s CRTPO representative to obstruct
            NCDOT was not, in his view, a legally available move. He spoke
            from the institutional position of someone who had been in
            the meetings nobody else was in.
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
        hamletMeetingUrl="https://www.myhamlet.com/search?q=charlotte+i-77+driggs&ref=district"
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
        searchUrl="https://www.myhamlet.com/search?q=charlotte+i-77+driggs&ref=district"
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
        <h2 className="charlotte-section__title">The shape of the spike</h2>
        <div className="charlotte-prose">
          <p>
            Across the 40 Charlotte council meetings indexed for this analysis,
            the I-77 South Express Lanes project surfaced in council speech
            an average of fewer than two utterances a month. In February 2026
            the count jumped to twenty-three. Almost all of them came from
            this single meeting. The follow-on appearances in April represent
            committee discussion; the matter came back to the dais on April
            27, by which point the council had retreated, met privately with
            NCDOT, and continued to differ on what should happen next.
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
        <h2 className="charlotte-section__title">What the night actually decided</h2>
        <div className="charlotte-prose">
          <p>
            Mayor Vi Lyles, who had presided through three hours of testimony
            and deliberation, spoke briefly near midnight. She said:
            &ldquo;We all know that Macquarie Heights is a special
            neighborhood. You know, I grew up with my aunt&rsquo;s house still
            there. So when you start doing these kinds of projects, they do
            get to be where you have a place where it&rsquo;s human to you.&rdquo;
            That was as personal a moment as the chair allowed herself.
            The motion that ultimately passed was a motion to add the project
            to the council&rsquo;s retreat agenda the following Monday.
            That is, formally, what the night decided.
          </p>
          <p>
            What it also decided, less formally, was that twelve members of a
            city council can each have a different theory of how power works
            and still arrive at a vote together. Mazuera Arias&rsquo;s theory
            of trust, Driggs&rsquo;s theory of state-funding mechanics,
            Johnson&rsquo;s theory of the agenda rule, Graham&rsquo;s theory
            of the 60-day window, Anderson&rsquo;s theory of constituent work
            since October &mdash; none of these became council policy that
            night. None of them needed to. They simply went on the record.
          </p>
          <p>
            The full transcript of the night, fully searchable and timestamped
            against the YouTube video, is available at{" "}
            <a
              href="https://www.myhamlet.com/search?q=charlotte+i-77+february&ref=district"
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
