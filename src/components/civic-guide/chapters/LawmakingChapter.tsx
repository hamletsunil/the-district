"use client";

import { CalloutBox } from "@/components/civic-guide/CalloutBox";
import { PullQuote } from "@/components/article/PullQuote";
import { AtAGlance } from "@/components/article/AtAGlance";
import { SourcesCitations } from "@/components/article/SourcesCitations";
import { Timeline } from "@/components/civic-guide/Timeline";
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
  { title: "Taking Action Using Ordinances, Resolutions, Motions, and Proclamations", outlet: "MRSC", url: "https://mrsc.org/stay-informed/mrsc-insight/february-2024/ordinances-resolutions-motions-proclamations" },
  { title: "A Step-by-Step Guide to Adopting or Amending City Ordinances", outlet: "League of Minnesota Cities", url: "https://www.lmc.org/news-publications/publications/city-spot/a-step-by-step-guide-to-adopting-or-amending-city-ordinances/" },
  { title: "Ordinances and Resolutions", outlet: "Georgia Municipal Association", url: "https://www.gacities.com/resources/ordinances-and-resolutions" },
  { title: "Municipal Form of Government by the Numbers", outlet: "ICMA", url: "https://icma.org/blog-posts/municipal-form-government-numbers" },
  { title: "Setting the Agenda: Less Control, More Cooperation", outlet: "MRSC", url: "https://mrsc.org/stay-informed/mrsc-insight/april-2021/setting-the-agenda-less-control-more-cooperation" },
  { title: "Who Controls the Agenda?", outlet: "UNC School of Government (Coates' Canons)", url: "https://canons.sog.unc.edu/2013/04/who-controls-the-agenda/" },
  { title: "Phoenix Mayor's Emergency Declaration Was Potentially Unprecedented", outlet: "Phoenix New Times", url: "https://www.phoenixnewtimes.com/news/phoenix-mayors-emergency-declaration-was-potentially-unprecedented-11458553/" },
  { title: "Municipal Emergency Powers Amidst COVID-19", outlet: "Knauf Shaw LLP", url: "https://nyenvlaw.com/blog/municipal-emergency-powers-amidst-covid-19/" },
  { title: "Local Government Responses to COVID-19 Pandemic, 2020", outlet: "Ballotpedia", url: "https://ballotpedia.org/Local_government_responses_to_the_coronavirus_(COVID-19)_pandemic,_2020" },
  { title: "Understanding Proposition 218", outlet: "California Legislative Analyst's Office", url: "https://lao.ca.gov/1996/120196_prop_218/understanding_prop218_1296.html" },
  { title: "Notice of Hearings: Ordinance Amendments and Rezonings", outlet: "UNC School of Government", url: "https://www.sog.unc.edu/resources/legal-summaries/notice-hearings-ordinance-amendments-and-rezonings" },
  { title: "How to Use a Consent Agenda to Save Time", outlet: "CivicPlus", url: "https://www.civicplus.com/blog/am/how-to-use-a-consent-agenda-to-save-time-and-refocus-discussion-on-critical-matters/" },
];

export function LawmakingChapter() {
  return (
    <>
      <AtAGlance
        stats={[
          { value: "60-80%", label: "Agenda items on consent calendar" },
          { value: "4/5", label: "Supermajority for CA urgency ordinances" },
          { value: "3,300+", label: "Municipal codes on Municode" },
        ]}
        finding="The staff report — not the council debate — is where most local policy decisions are actually shaped."
      />

      <section className="lg-chapter-body">
        <div className="lg-prose-container">
          <FadeIn>
            <p className="lg-prose-paragraph">
              The typical American watches a city council meeting and sees a gavel, a dais, and a lot of
              talking. What they do not see is the machinery underneath — a lawmaking process as
              structured and consequential as anything in a state capitol, but operating under rules that
              most residents never learn and few officials fully master.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h3 className="lg-prose-subhead">The Ordinance: Local Law in Full</h3>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              An <a href="/articles/how-local-government-works/glossary#ordinance">ordinance</a> is local law. It carries penalties, binds residents, and can be repealed only
              by another ordinance — never by a resolution or motion. When the Phoenix City Council{" "}
              <a href="https://www.phoenix.gov/administration/mayorcouncil.html" target="_blank" rel="noopener noreferrer">
                adopts a new noise regulation
              </a>{" "}
              or Savannah&rsquo;s aldermen{" "}
              <a href="https://online.encodeplus.com/regs/savannah-ga/" target="_blank" rel="noopener noreferrer">
                amend the historic district zoning code
              </a>, they are exercising the same legislative authority that state legislatures wield over
              statutes. The difference is procedural compression: what takes months in a statehouse can
              happen in two meetings at city hall.
            </p>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Most states mandate a two-reading process. At the first reading, the ordinance is
              introduced — the title is read aloud (or, in modern practice, entered into the record),
              and the clock starts on a mandatory waiting period, typically six to thirty days depending
              on the state. At the second reading, the council holds discussion, takes public comment if
              required, and votes. A simple majority usually suffices for passage, though some
              jurisdictions demand a supermajority for specific actions. In California, urgency
              ordinances — those declared necessary for the &ldquo;immediate preservation of the public
              peace, health or safety&rdquo; —{" "}
              <a href="https://law.justia.com/codes/california/2005/gov/36931-36937.html" target="_blank" rel="noopener noreferrer">
                require a four-fifths vote
              </a>{" "}
              and take effect immediately rather than after the standard 30-day waiting period. The bar
              is deliberately high; the tool is deliberately narrow.
            </p>
          </FadeIn>

          <FadeIn>
            <Timeline
              title="How an Ordinance Becomes Law"
              steps={[
                { label: "Introduction", description: "Council member or staff introduces the ordinance text." },
                { label: "First Reading", description: "Title read aloud. Mandatory waiting period begins (6–30 days by state)." },
                { label: "Staff Report", description: "City manager's office prepares analysis with fiscal impact and recommendation." },
                { label: "Public Hearing", description: "Required for zoning, fees, and budgets. Notice rules vary by state." },
                { label: "Second Reading & Vote", description: "Council debates, takes public comment, and votes. Simple majority usually suffices." },
                { label: "Waiting Period", description: "30 days before the ordinance takes effect. Urgency measures bypass with a supermajority." },
                { label: "Codification", description: "Professional publishers integrate the new law into the municipal code." },
              ]}
            />
          </FadeIn>

          <FadeIn delay={0.05}>
            <p className="lg-prose-paragraph">
              Between those two readings lies the real legislative work. Staff drafts the ordinance text,
              the city attorney reviews it for state preemption and constitutional compliance, and — in
              council-manager cities, which account for{" "}
              <a href="https://icma.org/blog-posts/municipal-form-government-numbers" target="_blank" rel="noopener noreferrer">
                54% of municipalities over 10,000 population
              </a>{" "}
              — the city manager&rsquo;s office prepares the <a href="/articles/how-local-government-works/glossary#staff-report">staff report</a> that will frame the
              council&rsquo;s deliberation.
            </p>
          </FadeIn>

          <FadeIn>
            <CalloutBox variant="why-matters" title="The Staff Report Is the Most Powerful Document Most Residents Never Read">
              City council members in part-time positions depend on staff analysis to frame their votes.
              The recommendation section of a staff report shapes debate before the meeting begins.
              Residents who want to influence outcomes should read the staff report before drafting their
              public comment — it reveals what the council has already been told to do.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <h3 className="lg-prose-subhead">The Staff Report: Ghostwriting Policy</h3>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              If the ordinance is the law, the staff report is the argument for it. A well-constructed
              staff report contains a statement of the problem, an analysis of alternatives, a fiscal
              impact assessment, and — critically — a specific recommendation. As the{" "}
              <a href="https://icma.org/blog-posts/re-thinking-staff-report-your-city-or-county" target="_blank" rel="noopener noreferrer">
                ICMA has noted
              </a>, the recommendation section is the most consequential part of the document, because
              without a clear call to action the research behind it serves no purpose. Council members
              who lack time or expertise to conduct independent analysis — which is most of them, given
              that local office remains overwhelmingly part-time — rely on staff reports the way
              appellate judges rely on briefs. The framing of alternatives, the ordering of options, and
              the language of fiscal impact all shape the vote before a single council member speaks.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <p className="lg-prose-paragraph">
              This dynamic grants the city manager enormous agenda-setting power. In council-manager
              governments, the manager{" "}
              <a href="https://icma.org/sites/default/files/Council-Manager%20Form%20Brochure%20(FINAL)%2010-2019.pdf" target="_blank" rel="noopener noreferrer">
                typically controls budget preparation, personnel decisions, and day-to-day operations
              </a>{" "}
              — and in most cities, also determines which items appear on the agenda and in what order.
              An individual council member who wants to add an item often needs the support of at least
              one colleague; in Puyallup, Washington,{" "}
              <a href="https://mrsc.org/stay-informed/mrsc-insight/april-2021/setting-the-agenda-less-control-more-cooperation" target="_blank" rel="noopener noreferrer">
                two council members must jointly request
              </a>{" "}
              an addition to the preliminary agenda. The legal authority to set the agenda belongs to the
              council as a body, but the practical authority to shape it belongs to the manager.
            </p>
          </FadeIn>

          <FadeIn>
            <PullQuote
              text="In a typical council meeting, 60 to 80 percent of agenda items land on the consent calendar and pass in under a minute. Staff occasionally buries modestly controversial items on the consent calendar hoping no one notices."
              className="lg-pull-quote"
            />
          </FadeIn>

          <FadeIn>
            <h3 className="lg-prose-subhead">Resolutions, Proclamations, and the Consent Calendar</h3>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Not everything the council does carries the force of law. Resolutions express policy
              positions, authorize expenditures, accept grants, or approve contracts. They require only
              one reading and one vote. A resolution cannot impose penalties on residents or amend an
              ordinance; it addresses &ldquo;matters of a special or temporary character,&rdquo; as{" "}
              <a href="https://www.gacities.com/resources/ordinances-and-resolutions" target="_blank" rel="noopener noreferrer">
                Georgia&rsquo;s Municipal Association puts it
              </a>. Proclamations sit a rung lower still — ceremonial documents declaring &ldquo;Small
              Business Week&rdquo; or honoring a retiring fire chief. They carry no legal weight
              whatsoever.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <p className="lg-prose-paragraph">
              The <a href="/articles/how-local-government-works/glossary#consent-calendar">consent calendar</a> bundles non-controversial items — contract renewals, meeting minutes,
              routine budget transfers — into a single vote. In a typical council meeting,{" "}
              <a href="https://www.civicplus.com/blog/am/how-to-use-a-consent-agenda-to-save-time-and-refocus-discussion-on-critical-matters/" target="_blank" rel="noopener noreferrer">
                60 to 80 percent of agenda items
              </a>{" "}
              land on the consent calendar and pass in under a minute. Any council member can pull an
              item for separate discussion, and in many cities, members of the public can request a pull
              as well. The political dynamics are telling: a savvy council member who wants to signal
              opposition to a contract without mounting a full challenge can simply pull it, force a
              five-minute discussion, and vote no on a stand-alone roll call — creating a record for
              constituents without derailing the meeting. Conversely, staff occasionally buries modestly
              controversial items on the consent calendar hoping no one notices. Attentive residents and
              journalists who read the agenda packet — often 200 to 500 pages released 72 hours before
              the meeting — serve as the last line of defense.
            </p>
          </FadeIn>

          <FadeIn>
            <h3 className="lg-prose-subhead">Public Hearings: When the Law Demands a Microphone</h3>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Public comment during regular agenda items is a courtesy extended by the chair. Public
              hearings are a legal requirement. State law mandates hearings for specific categories of
              action: zoning amendments and rezonings, general plan updates, new or increased fees and
              assessments, and adoption of the annual budget. In North Carolina, a rezoning requires{" "}
              <a href="https://www.sog.unc.edu/resources/legal-summaries/notice-hearings-ordinance-amendments-and-rezonings" target="_blank" rel="noopener noreferrer">
                two published newspaper notices at least ten but not more than twenty-five days before the hearing
              </a>, plus mailed notice to all abutting property owners. California&rsquo;s{" "}
              <a href="https://lao.ca.gov/1996/120196_prop_218/understanding_prop218_1296.html" target="_blank" rel="noopener noreferrer">
                Proposition 218
              </a>{" "}
              goes further: before imposing a new property-related fee, a local agency must mail notice
              45 days in advance and hold a protest hearing — and if a majority of affected property
              owners submit written protests, the fee dies on the spot.
            </p>
          </FadeIn>

          <FadeIn>
            <CalloutBox variant="misconception" title="An Ordinance Becomes Law When the Council Votes Yes">
              Not quite. In most states, an ordinance does not take effect until 30 days after adoption,
              giving residents time to seek a referendum. Urgency ordinances bypass this waiting period
              but require a supermajority — four-fifths in California — and a formal finding that
              immediate action is necessary for public health, safety, or welfare.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <h3 className="lg-prose-subhead">Emergency Powers: The Exception That Proved the Rule</h3>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The COVID-19 pandemic exposed how much latent authority local charters vest in executives
              for emergencies. In Phoenix, Mayor Kate Gallego invoked a{" "}
              <a href="https://www.phoenixnewtimes.com/news/phoenix-mayors-emergency-declaration-was-potentially-unprecedented-11458553/" target="_blank" rel="noopener noreferrer">
                &ldquo;great emergency&rdquo; declaration
              </a>{" "}
              in March 2020 — a charter provision so obscure that city attorneys could not identify a
              single prior use. The declaration empowered her to close bars, restrict gatherings, and
              impose curfews unilaterally. Half the council objected to concentrating power in one
              person; three days later, the council{" "}
              <a href="https://www.kjzz.org/2020-03-20/content-1496001-after-criticizing-phoenix-mayor-phoenix-council-shows-solidarity" target="_blank" rel="noopener noreferrer">
                unanimously ratified a modified &ldquo;local emergency&rdquo;
              </a>{" "}
              instead, preserving collective authority.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <p className="lg-prose-paragraph">
              In Champaign, Illinois, the city council went the other direction —{" "}
              <a href="https://www.illinoispolicy.org/champaign-city-council-gives-mayor-power-to-impose-curfew-seize-private-property/" target="_blank" rel="noopener noreferrer">
                unanimously granting the mayor and city manager
              </a>{" "}
              authority to seize private property, ration water, and close businesses. In Long Beach,
              California, the city manager — not the mayor —{" "}
              <a href="https://www.longbeach.gov/globalassets/city-attorney/media-library/documents/memos-to-the-mayor-and-council/2020/november-13--2020-role-of-city-council-in-implementing-and-interpreting-the-citys-covid-19-health-orders" target="_blank" rel="noopener noreferrer">
                issued the emergency proclamation
              </a>{" "}
              on March 4, 2020, before the council ratified it six days later. Vancouver,
              Washington&rsquo;s city manager{" "}
              <a href="https://www.clarkcountytoday.com/news/vancouver-city-manager-issues-new-covid-19-emergency-orders-extending-closures-until-may-31-and-july-31/" target="_blank" rel="noopener noreferrer">
                extended emergency purchasing authority and facility closures
              </a>{" "}
              through July 2020.
            </p>
          </FadeIn>

          <FadeIn>
            <CalloutBox variant="state-variation" title="Emergency Powers Are a Patchwork">
              Some city charters (Phoenix) vest emergency authority in the mayor alone. Others (Long
              Beach, Vancouver WA) vest it in the city manager. New York State required localities to
              get state Department of Health approval before issuing COVID orders. Georgia gives broad
              emergency powers to mayors but requires council ratification within a set period. There
              is no national standard — every charter is different.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The pattern revealed by COVID was consistent: in council-manager cities, the manager
              typically acted first and sought ratification second; in mayor-council cities, the mayor
              declared and the council checked. In both cases, the emergency concentrated power in a
              single executive — temporarily, and with varying degrees of council oversight.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h3 className="lg-prose-subhead">Codification: From Ordinance to Code</h3>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Once adopted, an ordinance does not simply file itself. <a href="/articles/how-local-government-works/glossary#codification">Codification</a> — the process of
              integrating new ordinances into a city&rsquo;s organized code — is handled by professional
              publishers.{" "}
              <a href="https://www.municode.com/" target="_blank" rel="noopener noreferrer">
                Municode maintains over 3,300 municipal codes
              </a>; General Code, American Legal Publishing, and enCodePlus serve thousands more. The
              codifier reviews each ordinance for consistency with existing law, flags potential conflicts
              with state statutes, and organizes it by title and chapter. Ordinances that amend the
              zoning map, grant franchises, or levy one-time assessments are typically excluded from
              codification. The result is a living document — the municipal code — that functions as the
              city&rsquo;s equivalent of a state&rsquo;s compiled statutes.
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
