"use client";

import { CalloutBox } from "@/components/civic-guide/CalloutBox";
import { PullQuote } from "@/components/article/PullQuote";
import { AtAGlance } from "@/components/article/AtAGlance";
import { SourcesCitations } from "@/components/article/SourcesCitations";
import { StatBar } from "@/components/civic-guide/StatBar";
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
  { title: "Who Participates in Local Government? Evidence from Meeting Minutes", outlet: "Einstein, Glick & Palmer (Boston University)", url: "https://maxwellpalmer.com/docs/articles/Einstein_Glick_Palmer_Participation.pdf" },
  { title: "Study Finds Renters Are Highly Underrepresented at All Levels of Government", outlet: "National Low Income Housing Coalition", url: "https://nlihc.org/resource/study-finds-renters-are-highly-underrepresented-all-levels-government" },
  { title: "There Were 276 Recall Efforts in 2025", outlet: "Ballotpedia News", url: "https://news.ballotpedia.org/2026/01/05/there-were-276-recall-efforts-in-2025-more-than-the-248-efforts-in-2024/" },
  { title: "FOIA Request Response Times by State", outlet: "Ballotpedia", url: "https://ballotpedia.org/FOIA_request_response_times_by_state" },
  { title: "How Minneapolis Ended Single-Family Zoning", outlet: "The Century Foundation", url: "https://tcf.org/content/report/minneapolis-ended-single-family-zoning/" },
  { title: "I Filed 136 Public Records Requests With Police and Learned Why Our System Is Broken", outlet: "Vice", url: "https://www.vice.com/en/article/i-filed-136-public-records-requests-with-police-and-learned-why-our-system-is-broken/" },
  { title: "Laws Governing Ballot Initiative Signature Gatherers", outlet: "Ballotpedia", url: "https://ballotpedia.org/Laws_governing_ballot_initiative_signature_gatherers" },
  { title: "CBA Moves Forward in Pittsburgh", outlet: "Good Jobs First", url: "https://goodjobsfirst.org/cba-moves-forward-pittsburgh/" },
  { title: "Participatory Budgeting", outlet: "HUD Exchange", url: "https://www.hudexchange.info/programs/participatory-budgeting/" },
  { title: "Participatory Budgeting in the United States: A Preliminary Analysis of Chicago's 49th Ward", outlet: "New Political Science (Taylor & Francis)", url: "https://www.tandfonline.com/doi/full/10.1080/07393148.2014.894695" },
  { title: "Community Benefits Agreements", outlet: "All-In Cities / PolicyLink", url: "https://allincities.org/toolkit/community-benefits-agreements" },
  { title: "First Amendment Protections for Public Comment at Government Meetings", outlet: "FIRE", url: "https://www.fire.org/research-learn/first-amendment-protections-public-comment-government-meetings" },
];

export function EngagementChapter() {
  return (
    <>
      <AtAGlance
        stats={[
          { value: "276", label: "Recall efforts in 2025" },
          { value: "89%", label: "Council members who are homeowners" },
          { value: "$360M", label: "Allocated via participatory budgets" },
        ]}
        finding="The architecture of citizen power is structurally sound. The wiring is all there. What is missing is participation that reflects the actual composition of the community."
      />

      <section className="lg-chapter-body">
        <div className="lg-prose-container">
          <FadeIn>
            <p className="lg-prose-paragraph">
              The most powerful tool in American local government is also the most neglected. Citizen
              engagement — the web of public comment, ballot initiatives, <a href="/articles/how-local-government-works/glossary#recall">recall</a> elections, records
              requests, and advisory committees that gives residents direct leverage over city hall —
              exists in law as a robust architecture of democratic accountability. In practice, it is
              exercised by a narrow, unrepresentative slice of the population, and the officials who
              are supposed to facilitate it sometimes treat transparency as an inconvenience to be
              managed rather than an obligation to be honored.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">Who Shows Up</h2>
          </FadeIn>

          <FadeIn delay={0.05}>
            <p className="lg-prose-paragraph">
              Start with who shows up.{" "}
              <a href="https://maxwellpalmer.com/docs/articles/Einstein_Glick_Palmer_Participation.pdf" target="_blank" rel="noopener noreferrer">
                Research by Einstein, Glick, and Palmer
              </a>{" "}
              at Boston University analyzed thousands of public comments at zoning and planning
              meetings across nearly 100 Greater Boston cities. White residents accounted for 95% of
              participants, though they were only 83% of the voting population. Latinos were 8% of
              voters but 1% of commenters. The average commenter was 58 years old, male, a longtime
              resident, and a homeowner. The{" "}
              <a href="https://nlihc.org/resource/study-finds-renters-are-highly-underrepresented-all-levels-government" target="_blank" rel="noopener noreferrer">
                National Low Income Housing Coalition found
              </a>{" "}
              the skew persists at the representational level: 89% of city councilmembers own their
              homes even in cities where the homeownership rate is 51%. Across all types of elected
              office, renters hold between 2% and 7% of seats. Officeholders&rsquo; homes are worth,
              on average,{" "}
              <a href="https://nlihc.org/sites/default/files/Who-Represents-the-Renters.pdf" target="_blank" rel="noopener noreferrer">
                50% more
              </a>{" "}
              than the median in their ZIP code. The people making decisions about rent control,
              zoning, and tenant protections overwhelmingly live on the other side of the
              landlord-tenant divide.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <CalloutBox variant="why-matters" title="Who Shows Up Is Who Gets Heard">
              In Einstein, Glick, and Palmer&rsquo;s study of Greater Boston zoning meetings, white
              residents were 83% of voters but 95% of public commenters. Homeowners were
              overrepresented by 25 percentage points. The average commenter was 58 — eight years
              older than the average voter. Renters, who comprise more than half the population in
              many cities, are virtually absent from the microphone and from the dais: just 2-7% of
              elected officials rent their homes.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <StatBar
              title="Who Shows Up vs. Who Lives There"
              subtitle="Source: Einstein, Glick & Palmer, Boston University"
              items={[
                { label: "White (voters)", value: 83, displayValue: "83%" },
                { label: "White (commenters)", value: 95, displayValue: "95%", highlight: true },
                { label: "Latino (voters)", value: 8, displayValue: "8%" },
                { label: "Latino (commenters)", value: 1, displayValue: "1%", highlight: true },
              ]}
            />
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Minneapolis offers a partial counterexample. When the city council&rsquo;s composition
              shifted to include several renters, it produced a wave of{" "}
              <a href="https://tcf.org/content/report/minneapolis-ended-single-family-zoning/" target="_blank" rel="noopener noreferrer">
                renter-friendly legislation
              </a>{" "}
              — tenant protection ordinances and the landmark 2040 Plan, which abolished
              single-family-only zoning citywide by a 12-to-1 vote. The plan was preceded by
              deliberate outreach to underrepresented groups: planners attended festivals and
              churches, distributed &ldquo;Meetings in a Box&rdquo; for residents to convene{" "}
              <a href="https://tcf.org/content/report/rallying-the-voices-of-the-excluded-for-zoning-reform-the-case-of-minneapolis/" target="_blank" rel="noopener noreferrer">
                discussions on their own terms
              </a>. Rent growth in Minneapolis subsequently ran 13 percentage points below the rest
              of Minnesota.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">Direct Democracy</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              For citizens who find the meeting room insufficient, direct democracy offers a blunter
              instrument. Twenty-six states provide for ballot initiatives at the state level, and
              most extend similar mechanisms to municipalities. Signature requirements typically run
              between 5% and 15% of registered voters or votes cast in a recent election — in{" "}
              <a href="https://www.seattle.gov/cityclerk/city-clerk-services/initiative-referendum-and-charter-amendment-guides/initiative-petition-guide" target="_blank" rel="noopener noreferrer">
                Seattle
              </a>, 10% of votes cast for mayor; in{" "}
              <a href="https://berkeleyca.gov/your-government/elections/local-petition-guidelines-and-regulations" target="_blank" rel="noopener noreferrer">
                Berkeley
              </a>, 5% for an initiative, 15% for a charter amendment. The professionalization of
              signature gathering has transformed what was once a grassroots exercise:{" "}
              <a href="https://ballotpedia.org/Laws_governing_ballot_initiative_signature_gatherers" target="_blank" rel="noopener noreferrer">
                16 of 26 initiative states
              </a>{" "}
              allow campaigns to pay gatherers per signature, though Oklahoma banned the practice in
              2025 and Florida now requires circulators to register with the secretary of state.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">The Recall</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The recall — the power to remove an elected official before their term expires — is
              permitted for local officials in{" "}
              <a href="https://ballotpedia.org/Laws_governing_recall" target="_blank" rel="noopener noreferrer">
                39 states
              </a>. It is not the rare weapon citizens imagine. Ballotpedia tracked an average of 223
              recall efforts per year from 2010 to 2025, rising to{" "}
              <a href="https://news.ballotpedia.org/2026/01/05/there-were-276-recall-efforts-in-2025-more-than-the-248-efforts-in-2024/" target="_blank" rel="noopener noreferrer">
                276 in 2025 alone
              </a>. In 2024, 108 recalls reached the ballot; 77 resulted in removal. The grounds are
              as varied as municipal life itself: mismanagement, hostile work environments, budget
              incompetence, open meeting law violations. In September 2025, Cleveland Heights, Ohio,
              voters{" "}
              <a href="https://ballotpedia.org/Kahlil_Seren_recall,_Cleveland_Heights,_Ohio_(2025)" target="_blank" rel="noopener noreferrer">
                removed Mayor Kahlil Seren
              </a>{" "}
              by an 82-18 margin after allegations of a hostile workplace, antisemitic comments by his
              wife, and submission of an incomplete city budget. The same month, San Francisco voters
              recalled Supervisor Joel Engardio, 63-37. In Jackson County, Missouri, County Executive
              Frank White Jr. was removed 89-11. The recall is a thermonuclear option that local
              voters deploy with surprising frequency.
            </p>
          </FadeIn>

          <FadeIn>
            <PullQuote
              text="The recall is a thermonuclear option that local voters deploy with surprising frequency — 276 efforts in 2025 alone, with a 71% removal rate when they reach the ballot."
              className="lg-pull-quote"
            />
          </FadeIn>

          <FadeIn delay={0.05}>
            <CalloutBox variant="misconception" title={`"Recalls Are Rare and Extreme"`}>
              Ballotpedia tracked 276 recall efforts in 2025 — more than five per week. City council
              members are the most common targets (44% of all 2024 recalls), followed by school board
              members (21%). When recalls reach the ballot, they succeed more often than not: 71% of
              officials facing a 2024 recall vote were removed. The recall is not a nuclear option
              reserved for scandal. It is a routine feature of American local governance, deployed for
              reasons ranging from budget mismanagement to personality conflicts.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The most celebrated recall of recent years occurred in San Francisco in February 2022,
              when voters{" "}
              <a href="https://ballotpedia.org/San_Francisco_Unified_School_District_recall,_California_(2021-2022)" target="_blank" rel="noopener noreferrer">
                removed three school board members
              </a>{" "}
              by margins of 72% to 79%. Turnout was 36% — high for an off-cycle special election, low
              by any other standard — and the campaign was partially funded by billionaires. The
              episode illustrated both the potency of the recall mechanism and its class dynamics: the
              voters who show up for special elections skew older, whiter, and wealthier than the
              electorate at large.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">Participatory Budgeting</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              <a href="/articles/how-local-government-works/glossary#participatory-budgeting">Participatory budgeting</a> represents an attempt to widen the funnel. Imported from Porto
              Alegre, Brazil, and first piloted in the United States in{" "}
              <a href="https://www.tandfonline.com/doi/full/10.1080/07393148.2014.894695" target="_blank" rel="noopener noreferrer">
                Chicago&rsquo;s 49th Ward in 2009
              </a>, PB lets residents directly allocate a slice of public funds. At least{" "}
              <a href="https://www.hudexchange.info/programs/participatory-budgeting/" target="_blank" rel="noopener noreferrer">
                64 US cities and counties
              </a>{" "}
              have now adopted some form of PB, allocating a combined $360 million. Seattle&rsquo;s
              2025-2026 budget earmarks{" "}
              <a href="https://www.seattle.gov/civilrights/public-participation/community-investments/participatory-budgeting" target="_blank" rel="noopener noreferrer">
                $27.25 million
              </a>{" "}
              for PB — the largest municipal allocation in the country. New York City&rsquo;s
              &ldquo;The People&rsquo;s Money&rdquo; program engaged over 10,000 residents and
              collected more than 2,000 project ideas. Cambridge, Massachusetts, allocates{" "}
              <a href="https://www.cambridgema.gov/participatorybudgeting" target="_blank" rel="noopener noreferrer">
                $1 million per cycle
              </a>. The evidence is mixed: PB does boost civic participation and surface overlooked
              community needs, but research on Chicago&rsquo;s 49th Ward found residents{" "}
              <a href="https://www.tandfonline.com/doi/full/10.1080/07393148.2014.894695" target="_blank" rel="noopener noreferrer">
                consistently chose projects
              </a>{" "}
              that the academic literature classifies as low priority.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <CalloutBox variant="why-matters" title="Participatory Budgeting: Democracy or Theater?">
              Sixty-four US cities have tried participatory budgeting, allocating a combined $360
              million. Seattle commits $27.25 million. But most PB programs control less than 1% of
              total municipal spending. Research on Chicago&rsquo;s 49th Ward — the first US pilot —
              found residents chose projects academics classify as &ldquo;low priority.&rdquo; PB
              works best as civic infrastructure, training residents to engage with government. It
              works less well as a mechanism for redirecting meaningful resources.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">Community Benefit Agreements</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Community benefit agreements offer yet another lever. A CBA is a contract between
              community groups and a developer that requires specific amenities — affordable housing,
              local hiring, wage floors — in exchange for public support or at least the absence of
              organized opposition. Pittsburgh&rsquo;s Hill District negotiated one of the most
              comprehensive CBAs in the country when the{" "}
              <a href="https://goodjobsfirst.org/cba-moves-forward-pittsburgh/" target="_blank" rel="noopener noreferrer">
                Penguins built their new arena
              </a>{" "}
              in 2008: $8.3 million in community contributions, a full-service grocery store, a local
              employment center offering $12-to-$30-per-hour jobs, and a community center for youth
              and seniors. Nashville&rsquo;s 2018 soccer stadium CBA required{" "}
              <a href="https://allincities.org/toolkit/community-benefits-agreements" target="_blank" rel="noopener noreferrer">
                20% affordable rental units
              </a>. These agreements work because they give community organizations a seat at the
              negotiating table before the first shovel hits dirt.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">Public Records</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The backstop for all citizen engagement is the public records request. Every state has
              some version of a freedom-of-information law, but the timelines and enforcement
              mechanisms diverge sharply. Vermont and Louisiana give agencies{" "}
              <a href="https://ballotpedia.org/FOIA_request_response_times_by_state" target="_blank" rel="noopener noreferrer">
                three days to respond
              </a>. California allows 10. Maryland allows 30. Alabama, Arizona, Montana, and North
              Carolina set no deadline at all. The gap between the law on paper and the law in
              practice is often vast. A{" "}
              <a href="https://www.vice.com/en/article/i-filed-136-public-records-requests-with-police-and-learned-why-our-system-is-broken/" target="_blank" rel="noopener noreferrer">
                Vice investigation
              </a>{" "}
              that filed 136 public records requests with police departments found that many of the
              nation&rsquo;s biggest cities — New York, Phoenix, Philadelphia, Seattle, Detroit,
              Baltimore — simply ignored them. A Nevada judge accused the Clark County coroner&rsquo;s
              office of being{" "}
              <a href="https://thenevadaindependent.com/article/time-to-put-teeth-in-nevadas-public-records-law" target="_blank" rel="noopener noreferrer">
                &ldquo;bound and determined to circumvent and avoid&rdquo;
              </a>{" "}
              the state&rsquo;s public records act. Enforcement penalties, where they exist, are
              toothless: Connecticut&rsquo;s cap is $1,000; Washington state&rsquo;s is $100 per day.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <CalloutBox variant="state-variation" title="Public Records Timelines Are a Lottery">
              Vermont requires a response to a public records request within three days. California
              allows 10. Maryland allows 30. Alabama, Arizona, Montana, and North Carolina impose no
              specific deadline. Penalties for noncompliance range from Connecticut&rsquo;s $1,000 cap
              to Washington state&rsquo;s $100-per-day fine. Some states empower an independent office
              to enforce compliance; others leave it to requesters who must hire a lawyer and sue.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The architecture of citizen power in American local government is structurally sound. The
              wiring is all there — comment periods, initiative petitions, recall provisions, PB
              processes, records laws. What is missing, consistently, is participation that reflects
              the actual composition of the community. Until the people who attend Tuesday night
              meetings look more like the city they live in, the tools of engagement will remain
              powerful in theory and captured in practice.
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
