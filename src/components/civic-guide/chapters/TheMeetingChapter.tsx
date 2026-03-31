"use client";

import { CalloutBox } from "@/components/civic-guide/CalloutBox";
import { PullQuote } from "@/components/article/PullQuote";
import { AtAGlance } from "@/components/article/AtAGlance";
import { SourcesCitations } from "@/components/article/SourcesCitations";
import { MeetingSimulator } from "@/components/civic-guide/MeetingSimulator";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import type { ReactNode } from "react";
import type { Source } from "@/types/article";

function FadeIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });
  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const SOURCES: Source[] = [
  { title: "The Brown Act: Open Meetings for Local Legislative Bodies", outlet: "California Attorney General", url: "https://oag.ca.gov/system/files/media/the-brown-act.pdf" },
  { title: "First Amendment Protections for Public Comment at Government Meetings", outlet: "FIRE", url: "https://www.fire.org/research-learn/first-amendment-protections-public-comment-government-meetings" },
  { title: "When First Amendment Rights and Public Meetings Clash", outlet: "MRSC", url: "https://mrsc.org/stay-informed/mrsc-insight/july-2020/when-1st-amendment-rights-public-meetings-clash" },
  { title: "Baca v. Moreno Valley Unified School Dist., 936 F. Supp. 719", outlet: "Justia", url: "https://law.justia.com/cases/federal/district-courts/FSupp/936/719/1487056/" },
  { title: "Understanding the Consent Agenda in Local Government Meetings", outlet: "MRSC", url: "https://mrsc.org/stay-informed/mrsc-insight/september-2025/consent-agenda" },
  { title: "Executive Session Basics", outlet: "MRSC", url: "https://mrsc.org/explore-topics/public-meetings/executive-sessions/executive-session-basics" },
  { title: "Less Is More: Action Minutes Save Time, Serve the Agency Best", outlet: "MRSC", url: "https://mrsc.org/stay-informed/mrsc-insight/august-2023/action-minutes" },
  { title: "Rosenberg's Rules of Order: Simple Rules of Parliamentary Procedure for the 21st Century", outlet: "Cal Cities (League of California Cities)", url: "https://www.calcities.org/resource/rosenberg's-rules-of-order-simple-rules-of-parliamentary-procedure-for-the-21st-century" },
  { title: "SB 707 Expands and Modernizes Open Meeting and Teleconferencing Requirements", outlet: "California Lawyers Association", url: "https://calawyers.org/public-law/sb-707-expands-and-modernizes-open-meeting-and-teleconferencing-requirements-under-the-ralph-m-brown-act/" },
  { title: "Texas Open Meetings Act Made Easy", outlet: "Texas Municipal League", url: "https://www.tml.org/DocumentCenter/View/3979/The-Texas-Open-Meetings-Act-Made-Easy-Updated-October-2023-X" },
  { title: "Who Participates in Local Government? Evidence from Meeting Minutes", outlet: "Einstein, Glick & Palmer (Boston University)", url: "https://maxwellpalmer.com/docs/articles/Einstein_Glick_Palmer_Participation.pdf" },
  { title: "Government-in-the-Sunshine Manual (2023 Edition)", outlet: "Florida Attorney General", url: "https://www.myfloridalegal.com/sites/default/files/2023-05/2023GovernmentInTheSunshineManual.pdf" },
];

export function TheMeetingChapter() {
  return (
    <>
      <AtAGlance
        stats={[
          { value: "50", label: "States with open meeting laws" },
          { value: "3 min", label: "Standard public comment limit" },
          { value: "25%", label: "Attend a meeting annually" },
        ]}
        finding="The machinery of local democracy runs on Tuesday nights in half-empty chambers, governed by rules most residents have never read."
      />

      {/* ====== MEETING SIMULATOR — interactive card deck ====== */}
      <section className="lg-chapter-body" style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
        <FadeIn>
          <MeetingSimulator />
        </FadeIn>
      </section>

      {/* ====== PROSE: The legal architecture ====== */}
      <section className="lg-chapter-body">
        <div className="lg-prose-container">
          <FadeIn>
            <h2 className="lg-prose-heading">The Law That Opens the Doors</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Every state in the union requires that the public&rsquo;s business be conducted in
              public. Utah enacted the first open meeting law in 1898. California&rsquo;s{" "}
              <a href="https://oag.ca.gov/system/files/media/the-brown-act.pdf" target="_blank" rel="noopener noreferrer">
                Ralph M. Brown Act
              </a>{" "}
              followed in 1953. By 1976, all 50 states had adopted some version, though the
              details vary wildly. Florida&rsquo;s Sunshine Law defines a &ldquo;meeting&rdquo;
              as any gathering of two or more members of the same board to discuss foreseeable
              business &mdash; which means two county commissioners cannot grab coffee and talk
              shop without posting a public notice. Texas demands a hard-copy agenda nailed to the
              courthouse wall{" "}
              <a href="https://www.tml.org/DocumentCenter/View/3979/The-Texas-Open-Meetings-Act-Made-Easy-Updated-October-2023-X" target="_blank" rel="noopener noreferrer">
                72 hours in advance
              </a>. California&rsquo;s Brown Act requires the same 72 hours for regular meetings
              and 24 for special ones, with each agenda item described in 20 words or fewer. No
              item may be discussed or voted upon unless it appears on that posted agenda &mdash;
              a rule that sounds simple until a sewage main breaks on a Thursday afternoon.
            </p>
          </FadeIn>

          <FadeIn>
            <CalloutBox variant="state-variation" title="Open Meeting Definitions Diverge Dramatically">
              Florida&rsquo;s Sunshine Law triggers public notice requirements when just two members
              of the same board discuss foreseeable business, even over coffee. Texas requires a
              physical agenda posting at the courthouse plus a 72-hour lead time. California&rsquo;s
              Brown Act limits agenda descriptions to 20 words per item and bars action on anything
              not posted. Alabama sets no specific response deadline at all. The principle is
              universal; the implementation is a patchwork.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">Three Minutes at the Microphone</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Public comment is the closest thing American local government has to a guaranteed
              platform for ordinary citizens. The Brown Act mandates it. So do most state open
              meeting laws. Courts have consistently held that when a government body opens a
              comment period, it creates a{" "}
              <a href="https://www.fire.org/research-learn/first-amendment-protections-public-comment-government-meetings" target="_blank" rel="noopener noreferrer">
                limited public forum
              </a>{" "}
              &mdash; a space where the First Amendment applies, though not without limits. Time
              restrictions are constitutional so long as they are viewpoint-neutral. Three minutes
              per speaker is the near-universal standard, upheld by California&rsquo;s Second
              District Court of Appeal in <em>Ribakoff v. City of Long Beach</em>. What
              government bodies cannot do is discriminate by content. In{" "}
              <a href="https://law.justia.com/cases/federal/district-courts/FSupp/936/719/1487056/" target="_blank" rel="noopener noreferrer">
                <em>Baca v. Moreno Valley Unified School District</em>
              </a>{" "}
              (C.D. Cal. 1996), a federal court struck down a school board policy that barred
              public criticism of district employees, ruling it an unconstitutional content-based
              restriction on speech in a designated public forum.
            </p>
          </FadeIn>

          <FadeIn>
            <PullQuote
              text="The average commenter is 58 years old, 25 percentage points more likely to be a homeowner than the general voter population, and disproportionately white and male."
              attribution="Einstein, Glick & Palmer, Boston University"
              className="lg-pull-quote"
            />
          </FadeIn>

          <FadeIn delay={0.05}>
            <p className="lg-prose-paragraph">
              Every city clerk knows the cast of regulars: the citizen who speaks at every meeting
              about the same grievance, the activist who reads prepared statements at precisely
              2 minutes and 55 seconds, the bewildered newcomer who didn&rsquo;t realize they
              needed to fill out a speaker card.{" "}
              <a href="https://maxwellpalmer.com/docs/articles/Einstein_Glick_Palmer_Participation.pdf" target="_blank" rel="noopener noreferrer">
                Research by Einstein, Glick, and Palmer
              </a>{" "}
              at Boston University reveals who actually grabs the microphone: in their study of
              nearly 100 Greater Boston municipalities, white residents accounted for 95% of
              public meeting participants, while Latinos &mdash; 8% of voters in those cities
              &mdash; comprised just 1% of commenters.
            </p>
          </FadeIn>

          <FadeIn>
            <CalloutBox variant="why-matters" title="Three Minutes Is a Constitutional Right">
              Public comment is not a courtesy extended by benevolent officials. When a government
              body opens a comment period, it creates a limited public forum protected by the First
              Amendment. Courts have struck down rules that bar criticism of government employees
              (<em>Baca v. Moreno Valley</em>, 1996), that apply time limits unevenly based on
              viewpoint, or that require speakers to confine remarks to agenda items when the body
              has opened a general comment period. The three-minute window is small but legally
              potent.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">Robert&rsquo;s Rules and Their Rivals</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Most American city councils have adopted{" "}
              <a href="https://mrsc.org/explore-topics/public-meetings/procedures/parliamentary-procedure" target="_blank" rel="noopener noreferrer">
                Robert&rsquo;s Rules of Order
              </a>{" "}
              &mdash; Henry Martyn Robert&rsquo;s 1876 manual, now in its 12th edition. In
              practice, most small-city councils follow Robert&rsquo;s Rules the way most
              Americans follow speed limits: as a general suggestion. Hundreds of California
              cities have abandoned the 700-page opus in favor of{" "}
              <a href="https://www.calcities.org/resource/rosenberg's-rules-of-order-simple-rules-of-parliamentary-procedure-for-the-21st-century" target="_blank" rel="noopener noreferrer">
                Rosenberg&rsquo;s Rules of Order
              </a>, a 10-page distillation written by a Yolo County Superior Court judge. Where
              Robert&rsquo;s prescribes a rigid hierarchy of motions and amendments,
              Rosenberg&rsquo;s allows up to three motions on the floor simultaneously and
              embraces the &ldquo;friendly amendment&rdquo; &mdash; a practical concession to
              the reality that a five-member city council is not the United States Senate.
            </p>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The meeting&rsquo;s final artifact is its minutes. Most states require only action
              minutes &mdash; a record of what was done, not what was said.{" "}
              <a href="https://canons.sog.unc.edu/blog/2019/01/22/what-are-full-and-accurate-minutes/" target="_blank" rel="noopener noreferrer">
                North Carolina law requires
              </a>{" "}
              &ldquo;full and accurate&rdquo; minutes, leaving clerks to interpret whether that
              means a verbatim transcript or a summary of motions and votes. Quasi-judicial
              hearings &mdash; zoning appeals, code enforcement cases &mdash; typically demand
              verbatim records because those decisions can be appealed. For regular business, the
              clerk&rsquo;s summary is the official account of what happened, and it is often the
              only account that endures after the YouTube recording is taken down.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="lg-chapter-body" style={{ paddingTop: 0 }}>
        <div className="lg-prose-container">
          <SourcesCitations sources={SOURCES} />
        </div>
      </section>
    </>
  );
}
