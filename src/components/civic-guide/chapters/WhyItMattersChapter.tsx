"use client";

import { ScrollySection, StepContent } from "@/components/civic-guide/ScrollySection";
import { EntityCounter } from "@/components/civic-guide/EntityCounter";
import { CalloutBox } from "@/components/civic-guide/CalloutBox";
import { PullQuote } from "@/components/article/PullQuote";
import { AtAGlance } from "@/components/article/AtAGlance";
import { SourcesCitations } from "@/components/article/SourcesCitations";
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
  { title: "2022 Census of Governments, Organization Tables", outlet: "U.S. Census Bureau", url: "https://www.census.gov/data/tables/2022/econ/gus/2022-governments.html" },
  { title: "The Number and Types of Local Governments in the U.S.", outlet: "Federal Reserve Bank of St. Louis", url: "https://www.stlouisfed.org/publications/regional-economist/2024/march/local-governments-us-number-type" },
  { title: "Big Cities — Tiny Votes? America's Urban Voter Turnout", outlet: "UC San Diego Yankelovich Center", url: "https://yankelovichcenter.ucsd.edu/_files/reports/Big-Cities-Tiny-Votes.pdf" },
  { title: "How Many Politicians Are There in the US?", outlet: "PoliEngine", url: "https://poliengine.com/blog/how-many-politicians-are-there-in-the-us" },
  { title: "Annual Survey of Public Employment & Payroll Summary Report: 2023", outlet: "U.S. Census Bureau", url: "https://www.census.gov/library/publications/2024/econ/g24-aspep.html" },
  { title: "What Are the Sources of Revenue for State and Local Governments?", outlet: "Tax Policy Center", url: "https://taxpolicycenter.org/briefing-book/what-are-sources-revenue-state-and-local-governments" },
  { title: "State and Local Expenditures", outlet: "Urban Institute", url: "https://www.urban.org/policy-centers/cross-center-initiatives/state-and-local-finance-initiative/state-and-local-backgrounders/state-and-local-expenditures" },
  { title: "The State of Local News 2025", outlet: "Northwestern Medill Local News Initiative", url: "https://localnewsinitiative.northwestern.edu/projects/state-of-local-news/explore/" },
  { title: "Investigation of the Ferguson Police Department", outlet: "U.S. Department of Justice", url: "https://www.justice.gov/sites/default/files/opa/press-releases/attachments/2015/03/04/ferguson_police_department_report.pdf" },
  { title: "The Timing of Local Elections", outlet: "Center for Effective Government, University of Chicago", url: "https://effectivegov.uchicago.edu/primers/the-timing-of-local-elections" },
  { title: "Election Results 2024: Analysis of Voter Turnout", outlet: "Ballotpedia", url: "https://ballotpedia.org/Election_results,_2024:_Analysis_of_voter_turnout_in_the_2024_general_election" },
  { title: "Hamlet — Search local government meetings", outlet: "Hamlet", url: "https://www.myhamlet.com/search?utm_source=district&utm_medium=internal&utm_content=sources" },
];

const SCROLLY_STEPS = [
  {
    content: (
      <StepContent label="The Scale" title="90,837 governments">
        <p>
          The United States has more local governments than any nation on Earth. Roughly one
          for every 3,650 Americans.
        </p>
      </StepContent>
    ),
  },
  {
    content: (
      <StepContent label="Cities & Towns" title="19,491 municipalities">
        <p>
          Cities, towns, villages, and boroughs — the governments most Americans think of
          as &ldquo;local government.&rdquo; But they&rsquo;re less than a quarter of the total.
        </p>
      </StepContent>
    ),
  },
  {
    content: (
      <StepContent label="The Invisible Layer" title="39,555 special districts">
        <p>
          Mosquito abatement, port operations, fire protection, water supply. Special districts
          are the fastest-growing type of government — and the least visible. Illinois alone
          has 6,930 local governments.
        </p>
      </StepContent>
    ),
  },
  {
    content: (
      <StepContent label="The Money" title="$2.32 trillion">
        <p>
          Local governments collectively spend more than Italy&rsquo;s entire GDP. They employ
          <strong> 14.2 million people</strong> — five times the federal civilian workforce.
        </p>
      </StepContent>
    ),
  },
  {
    content: (
      <StepContent label="The Gap" title="26% turnout">
        <p>
          About 64% voted in the 2024 presidential election. The average off-cycle mayoral
          election draws <strong>just 26%</strong> of registered voters. The government that most
          shapes daily life operates in near-total darkness.
        </p>
      </StepContent>
    ),
  },
  {
    content: (
      <StepContent label="The Comparison" title="No other democracy comes close">
        <p>
          France manages with 35,000 communes. Japan runs 1,718 municipalities for 125 million
          people. America has atomized self-governance like no other nation.
        </p>
      </StepContent>
    ),
  },
];

export function WhyItMattersChapter() {
  return (
    <>
      {/* At a Glance */}
      <AtAGlance
        stats={[
          { value: "90,837", label: "Government entities" },
          { value: "$2.32T", label: "Annual spending" },
          { value: "500K+", label: "Elected officials" },
        ]}
        finding="The level of government that most directly shapes daily life is the one most Americans ignore."
      />

      {/* Scrollytelling: The Scale */}
      <ScrollySection
        steps={SCROLLY_STEPS}
        textPosition="left"
        renderVisualization={(stepIndex) => (
          <EntityCounter stepIndex={stepIndex} />
        )}
      />

      {/* Prose Section */}
      <section className="lg-chapter-body">
        <div className="lg-prose-container">
          <FadeIn>
            <p className="lg-prose-paragraph">
              The <a href="https://www.census.gov/data/tables/2022/econ/gus/2022-governments.html" target="_blank" rel="noopener noreferrer">2022 Census of Governments</a> counts
              19,491 municipal governments, 16,214 townships, 3,031 counties, 12,546 independent
              school districts, and 39,555 <a href="/articles/how-local-government-works/glossary#special-district">special districts</a> — those strange, often invisible entities
              that handle everything from mosquito abatement to port operations. Illinois alone has
              6,930 local governments, more than any other state and more than the entire nation of
              Japan. Texas follows with 5,533, then Pennsylvania, California, and Ohio.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <p className="lg-prose-paragraph">
              Behind each of those 90,837 governments sits a real person making a decision that
              shapes somebody&rsquo;s Tuesday. The city of Orinda, California — population 19,000,
              nestled in the East Bay hills — has a planning commission that decides whether a
              homeowner can add a second story. Boise&rsquo;s city council approved a{" "}
              <a href="https://www.ktvb.com/article/news/local/idaho-press/city-council-approves-murio-farms-3500-homes-southwest-boise/277-eb746dad-15bb-4c8e-868d-ca9d6c1e355e" target="_blank" rel="noopener noreferrer">
                3,500-home development called Murio Farms
              </a>{" "}
              in 2024, annexing hundreds of acres of farmland into city limits over the objections of
              residents who worried the new homes would cost more in services than they generate in
              tax revenue.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <CalloutBox variant="why-matters" title="Who Decides What Gets Built Next Door">
              Zoning and land use decisions are almost exclusively local. When a developer proposes
              a 200-unit apartment building in your neighborhood, neither Congress nor the state
              legislature will weigh in. The planning commission and city council make that call —
              bodies elected by the 26 percent of residents who bother to vote in off-cycle elections.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">What Local Government Actually Does</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The list of things local government actually does reads like a table of contents for
              daily life itself: land use and zoning, police and fire, water and sewer, roads and
              sidewalks, parks and libraries, building permits, code enforcement, business licenses,
              local taxes, affordable housing, homelessness response, public transit, stormwater,
              animal control, election administration, local courts. This is the government that
              fills potholes, responds when your basement floods, and decides whether a gas station
              can open next to an elementary school.
            </p>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The money is real. Local governments collectively spent{" "}
              <a href="https://usgovernmentspending.com/year2022_r" target="_blank" rel="noopener noreferrer">
                $2.32 trillion in 2022
              </a>{" "}
              — more than the GDP of Italy. They employ{" "}
              <a href="https://www.census.gov/library/publications/2024/econ/g24-aspep.html" target="_blank" rel="noopener noreferrer">
                14.2 million people
              </a>, roughly five times the civilian workforce of the entire federal government.
              Property taxes dominate:{" "}
              <a href="https://taxpolicycenter.org/briefing-book/what-are-sources-revenue-state-and-local-governments" target="_blank" rel="noopener noreferrer">
                72 percent of all local tax revenue
              </a>{" "}
              flows from property levies.
            </p>
          </FadeIn>

          <FadeIn>
            <PullQuote
              text="The city had nearly doubled its fine revenue between 2010 and 2015, budgeting 23 percent of municipal revenue from court fines and fees."
              city="Ferguson"
              state="MO"
              className="lg-pull-quote"
            />
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Ferguson, Missouri exposed what happens when fines become a revenue strategy rather than a
              deterrent. The{" "}
              <a href="https://www.justice.gov/sites/default/files/opa/press-releases/attachments/2015/03/04/ferguson_police_department_report.pdf" target="_blank" rel="noopener noreferrer">
                Department of Justice found
              </a>{" "}
              that the city had nearly doubled its fine revenue between 2010 and 2015, from $1.3 million
              to $3.09 million. Black residents, 67 percent of the population, accounted for 93 percent
              of arrests.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <CalloutBox variant="misconception" title="&quot;My City Is Run by the Mayor&quot;">
              Many American cities operate under a council-manager form of government, where the
              city council sets policy and a hired professional city manager runs day-to-day
              operations. The mayor in these cities is often a largely ceremonial figure who chairs
              council meetings. Only about 30 percent of U.S. cities with populations above 10,000
              use the strong-mayor system most people imagine.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">The Invisibility Problem</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              All of this operates under a remarkable invisibility. Some{" "}
              <a href="https://poliengine.com/blog/how-many-politicians-are-there-in-the-us" target="_blank" rel="noopener noreferrer">
                500,396 elected officials
              </a>{" "}
              serve in local government — 96 percent of all elected officials in the country. The
              president, 535 members of Congress, 50 governors, and roughly 7,383 state legislators
              together represent a rounding error. Yet about 64 percent of eligible voters showed up
              for the{" "}
              <a href="https://ballotpedia.org/Election_results,_2024:_Analysis_of_voter_turnout_in_the_2024_general_election" target="_blank" rel="noopener noreferrer">
                2024 presidential election
              </a>, while the average <a href="/articles/how-local-government-works/glossary#off-cycle-election">off-cycle</a> mayoral election draws{" "}
              <a href="https://yankelovichcenter.ucsd.edu/_files/reports/Big-Cities-Tiny-Votes.pdf" target="_blank" rel="noopener noreferrer">
                just 26 percent of registered voters
              </a>.
            </p>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Meanwhile, the reporters who once covered city hall are vanishing.{" "}
              <a href="https://localnewsinitiative.northwestern.edu/projects/state-of-local-news/explore/" target="_blank" rel="noopener noreferrer">
                Northwestern&rsquo;s Medill School
              </a>{" "}
              counts 213 American counties that now qualify as &ldquo;news deserts&rdquo; — places
              with no locally based source of local news. Since 2005, more than 3,300 newspapers have
              shuttered, vanishing at a rate exceeding two per week. Platforms like{" "}
              <a href="https://www.myhamlet.com/search?utm_source=district&utm_medium=internal&utm_content=prose" target="_blank" rel="noopener noreferrer">
                Hamlet
              </a>{" "}
              are trying to fill the gap by making local government meeting transcripts searchable.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <CalloutBox variant="state-variation" title="The Special District Explosion">
              Illinois has 6,930 local governments because it allows special districts to proliferate
              — there are separate taxing entities for parks, libraries, fire protection, and mosquito
              abatement in the same square mile. Hawaii has just 21 local governments total. Texas ranks
              second nationally with 5,533, driven by its 2,600-plus special districts.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The paradox is nearly perfect. The level of government that most directly shapes the
              texture of daily life — the one that decides whether your street gets repaved, whether
              a homeless encampment persists near the school, whether a new apartment building rises
              next door — is the one most Americans ignore. They can name the president and their
              senator but not their council member. They turn out for elections where their individual
              vote is statistically meaningless while skipping the ones where a few hundred ballots
              routinely decide the outcome.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Sources */}
      <section className="lg-chapter-body" style={{ paddingTop: 0 }}>
        <div className="lg-prose-container">
          <SourcesCitations sources={SOURCES} />
        </div>
      </section>
    </>
  );
}
