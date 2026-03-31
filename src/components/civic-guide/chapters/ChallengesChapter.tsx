"use client";

import { CalloutBox } from "@/components/civic-guide/CalloutBox";
import { PullQuote } from "@/components/article/PullQuote";
import { AtAGlance } from "@/components/article/AtAGlance";
import { SourcesCitations } from "@/components/article/SourcesCitations";
import { KeyFact } from "@/components/civic-guide/KeyFact";
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
  { title: "Women Still Hold Fewer Than a Third of All Municipal Offices", outlet: "Center for American Women and Politics (Rutgers)", url: "https://cawp.rutgers.edu/news-media/press-releases/women-still-hold-fewer-third-all-municipal-offices" },
  { title: "Nonwhite People Are Drastically Underrepresented in Local Government", outlet: "The Conversation", url: "https://theconversation.com/nonwhite-people-are-drastically-underrepresented-in-local-government-212318" },
  { title: "Five Year Review: How State Laws Have Impacted Local Decision-Making", outlet: "National League of Cities / Temple University", url: "https://www.nlc.org/article/2025/10/09/five-year-review-how-state-laws-have-impacted-local-decision-making/" },
  { title: "A Fiscal Crisis Is Looming For Many US Cities", outlet: "UMBC / The Invading Sea", url: "https://umbc.edu/stories/a-fiscal-crisis-is-looming-for-many-us-cities/" },
  { title: "2025 ASCE Infrastructure Report Card", outlet: "American Society of Civil Engineers", url: "https://infrastructurereportcard.org/" },
  { title: "A Taxonomy of State Accessory Dwelling Unit Laws 2025", outlet: "Mercatus Center (George Mason University)", url: "https://www.mercatus.org/research/policy-briefs/taxonomy-state-accessory-dwelling-unit-laws-2025" },
  { title: "How Cities Are Using AI in 2026", outlet: "Smart Cities Dive", url: "https://www.smartcitiesdive.com/news/how-cities-using-ai-2026/810905/" },
  { title: "The 2026 GT100: What It Will Take to Scale AI in Government", outlet: "Government Technology", url: "https://www.govtech.com/biz/the-2026-gt100-what-will-it-take-to-scale-ai-in-government" },
  { title: "The Irish Abortion Referendum: How a Citizens' Assembly Helped Break Years of Political Deadlock", outlet: "Electoral Reform Society", url: "https://electoral-reform.org.uk/the-irish-abortion-referendum-how-a-citizens-assembly-helped-to-break-years-of-political-deadlock/" },
  { title: "Polycentric Governance in Theory and Practice", outlet: "Michael McGinnis / Indiana University", url: "https://mcginnis.pages.iu.edu/polycentric%20governance%20theory%20and%20practice%20Feb%202016.pdf" },
  { title: "Workers' Rights Preemption in the U.S.", outlet: "Economic Policy Institute", url: "https://www.epi.org/preemption-map/" },
  { title: "Public Pension Debt Paralysis Persists", outlet: "Equable Institute", url: "https://equable.org/pension-debt-paralysis-persists/" },
];

export function ChallengesChapter() {
  return (
    <>
      <AtAGlance
        stats={[
          { value: "32.4%", label: "Municipal offices held by women" },
          { value: "$1.34T", label: "Unfunded pension liabilities" },
          { value: "46", label: "States preempting local gun laws" },
        ]}
        finding="American local government faces a convergence of pressures -- demographic, fiscal, climatic, technological -- that would strain even a coherent system. The system it actually inhabits has 90,837 jurisdictions and no coordinating architecture."
      />

      <section className="lg-chapter-body">
        <div className="lg-prose-container">
          <FadeIn>
            <p className="lg-prose-paragraph">
              American local government faces a convergence of pressures — demographic, fiscal,
              climatic, technological — that would strain even a coherent system. The system it
              actually inhabits, with 90,837 jurisdictions and no coordinating architecture, absorbs
              these shocks unevenly. Some cities adapt with startling creativity. Others are
              structurally incapable of responding. The gap between the two is widening.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h3 className="lg-prose-subheading">The Representation Gap.</h3>
            <p className="lg-prose-paragraph">
              The people who govern American localities do not look like the people who live in them.
              Women hold{" "}
              <a href="https://cawp.rutgers.edu/news-media/press-releases/stagnation-womens-representation-municipal-office" target="_blank" rel="noopener noreferrer">
                32.4 percent of municipal offices
              </a>{" "}
              nationwide — a figure that has barely budged in five years. Only 25.4 percent of mayors
              in cities over 30,000 are women. The racial disparity is starker. Black residents
              constitute 11 percent of county populations but hold{" "}
              <a href="https://theconversation.com/nonwhite-people-are-drastically-underrepresented-in-local-government-212318" target="_blank" rel="noopener noreferrer">
                9 percent of county legislative seats
              </a>; Hispanic residents make up 11 percent of county populations but hold 5 percent or
              fewer of elected county positions; Asian Americans comprise 3 percent of county residents
              and hold roughly 1 percent of seats. On school boards — where the stakes for communities
              of color are arguably highest — more than two-thirds of members are white in districts
              where{" "}
              <a href="https://theconversation.com/nonwhite-people-are-drastically-underrepresented-in-local-government-212318" target="_blank" rel="noopener noreferrer">
                fewer than half the students are
              </a>. Colorado, Nevada, and Oregon lead the nation in women&rsquo;s municipal
              representation, each approaching or exceeding 43 percent. Nebraska and Mississippi sit
              below 20 percent. The data point to a structural problem: local elections held off-cycle,
              in odd years, with negligible media coverage, systematically favor incumbents and
              candidates with institutional backing.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <CalloutBox variant="why-matters" title="School Boards Are the Most Racially Unrepresentative Layer of Government">
              More than two-thirds of school board members are white in districts where fewer than half
              of students are. Hispanic residents make up 24 percent of school district populations but
              20 percent of board members. For Black residents, the gap is 22 percent to 10 percent.
              These boards control curriculum, hiring, budgets, and discipline policy — the decisions
              that shape a child&rsquo;s life more directly than any act of Congress.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <h3 className="lg-prose-subheading">The Professionalization Tension.</h3>
            <p className="lg-prose-paragraph">
              Roughly{" "}
              <a href="https://icma.org/blog-posts/municipal-form-government-numbers" target="_blank" rel="noopener noreferrer">
                59 percent of American cities
              </a>{" "}
              use the council-manager form, in which elected officials set policy and an appointed
              professional manages operations. Born in the Progressive Era&rsquo;s crusade against
              machine politics, the model has{" "}
              <a href="https://icma.org/blog-posts/growth-council-manager-form-government" target="_blank" rel="noopener noreferrer">
                spread steadily
              </a>{" "}
              among mid-sized cities. But the tension between expert administration and democratic
              accountability is real and growing. City managers increasingly confront issues — climate
              adaptation, social equity, AI deployment — where the line between &ldquo;policy&rdquo;
              and &ldquo;administration&rdquo; dissolves. ICMA&rsquo;s own literature acknowledges the{" "}
              <a href="https://www.calicma.org/news/the-evolving-role-of-city-managers-policy-administration-and-community-leadership" target="_blank" rel="noopener noreferrer">
                debate over whether managers should champion causes
              </a>{" "}
              or execute directives. The unelected professional who manages your city&rsquo;s budget,
              hires its department heads, and shapes its development strategy may be the most powerful
              official you never voted for.
            </p>
          </FadeIn>

          <FadeIn>
            <h3 className="lg-prose-subheading">State Preemption.</h3>
            <p className="lg-prose-paragraph">
              The most consequential threat to local self-governance comes not from Washington but from
              state capitols. Forty-six states preempt local firearms regulation. Twenty-six{" "}
              <a href="https://www.epi.org/preemption-map/" target="_blank" rel="noopener noreferrer">
                bar cities from setting their own minimum wages
              </a>. On average, states preempted{" "}
              <a href="https://phlr.temple.edu/news/2025/10/how-state-laws-have-changed-five-years-impacted-local-decision-making" target="_blank" rel="noopener noreferrer">
                four policy areas in 2024, up from three in 2019
              </a>. Florida and Texas have moved from targeted preemption — blocking a specific
              ordinance in a specific domain — to omnibus restrictions that strip cities of authority
              across a broad range of policies. In 2024, Florida&rsquo;s HB433{" "}
              <a href="https://www.epi.org/blog/updated-epi-preemption-tracker/" target="_blank" rel="noopener noreferrer">
                prohibited municipalities from enacting worker heat protections
              </a>, overriding Miami-Dade County&rsquo;s proposal to protect outdoor laborers. The
              preemption wave reflects a partisan realignment: as cities grow more progressive, state
              legislatures dominated by rural and suburban majorities increasingly treat municipal
              innovation as a threat to be neutralized.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <CalloutBox variant="misconception" title={`"Local Government Is Too Small for Real Politics"`}>
              State preemption is the most consequential intergovernmental conflict in American
              politics, and it happens almost entirely below the national media&rsquo;s radar. When
              Florida bans cities from protecting outdoor workers from heat, or when 26 states prohibit
              local minimum wages, the decisions affect millions. The fights over local authority are
              policy battles with national implications fought in state capitols that few journalists
              cover.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <h3 className="lg-prose-subheading">Climate Adaptation.</h3>
            <p className="lg-prose-paragraph">
              Local governments are the operational front line of climate change. The 2025 Los Angeles
              wildfires caused{" "}
              <a href="https://www.climatecentral.org/climate-matters/2025-in-review" target="_blank" rel="noopener noreferrer">
                over $60 billion in damage
              </a>{" "}
              — the costliest wildfire in U.S. history. Sanibel, Florida, spent $328 million rebuilding
              its causeway after Hurricane Ian, then watched the{" "}
              <a href="https://www.enr.com/articles/62649-how-sanibel-turned-disaster-into-an-infrastructure-blueprint" target="_blank" rel="noopener noreferrer">
                new infrastructure withstand three subsequent hurricanes
              </a>{" "}
              in 2024 — validating the engineering but illustrating the staggering cost of
              climate-resilient design. At least{" "}
              <a href="https://www.ncelenviro.org/articles/building-climate-resilience-in-2025-states-address-wildfires-heat-and-flooding/" target="_blank" rel="noopener noreferrer">
                25 states introduced adaptation legislation in 2025
              </a>, focusing on wildfire resiliency, extreme heat occupational standards, and flood
              preparedness. San Francisco has adopted a comprehensive{" "}
              <a href="https://sfplanning.org/sea-level-rise-action-plan" target="_blank" rel="noopener noreferrer">
                Sea Level Rise Action Plan
              </a>. But adaptation capacity correlates tightly with fiscal capacity, which means
              wealthy coastal suburbs can elevate roads while inland cities with eroding tax bases
              cannot replace failing stormwater systems.
            </p>
          </FadeIn>

          <FadeIn>
            <PullQuote
              text="The fiscal vise -- rising pension costs, decaying infrastructure, shrinking tax bases, vanishing federal support -- will force structural choices that most city councils have spent decades avoiding."
              className="lg-pull-quote"
            />
          </FadeIn>

          <FadeIn>
            <h3 className="lg-prose-subheading">Housing Affordability and Zoning Reform.</h3>
            <p className="lg-prose-paragraph">
              Eighteen states have now{" "}
              <a href="https://www.mercatus.org/research/policy-briefs/taxonomy-state-accessory-dwelling-unit-laws-2025" target="_blank" rel="noopener noreferrer">
                passed laws broadly legalizing accessory dwelling units
              </a>, with 11 acting in the past four years alone. Oregon legalized missing middle
              housing statewide. Washington&rsquo;s{" "}
              <a href="https://www.theurbanist.org/2025/07/01/seattle-eases-accessory-dwelling-restrictions-state-deadline/" target="_blank" rel="noopener noreferrer">
                HB 1110 and HB 1337
              </a>{" "}
              pushed Seattle to relax ADU restrictions ahead of a state deadline. California&rsquo;s
              cascade of ADU legislation — SB 1211, AB 2533, the HOME Act — has eliminated
              owner-occupancy mandates, expanded allowable sizes, and forced municipalities to offer{" "}
              <a href="https://ahcd.assembly.ca.gov/system/files/2025-03/adu-handbook-update.pdf" target="_blank" rel="noopener noreferrer">
                preapproved ADU plans
              </a>. San Diego&rsquo;s Bonus ADU Program, which pairs market-rate units with
              income-restricted ones, has become a{" "}
              <a href="https://www.localhousingsolutions.org/housing-policy-case-studies/local-policies-that-support-missing-middle-housing-and-adus/" target="_blank" rel="noopener noreferrer">
                national model
              </a>. The paradox: state housing mandates are a form of preemption. The same progressive
              cities that decry state interference with their minimum wage ordinances now face state
              interference with their exclusionary zoning — and the political valence reverses
              entirely.
            </p>
          </FadeIn>

          <FadeIn>
            <h3 className="lg-prose-subheading">Fiscal Sustainability.</h3>
            <p className="lg-prose-paragraph">
              Chicago carries{" "}
              <a href="https://umbc.edu/stories/a-fiscal-crisis-is-looming-for-many-us-cities/" target="_blank" rel="noopener noreferrer">
                $35 billion in unfunded pension liabilities
              </a>{" "}
              and nearly $2 billion in unfunded retiree health benefits. Nationally, unfunded public
              pension obligations run to{" "}
              <a href="https://equable.org/pension-debt-paralysis-persists/" target="_blank" rel="noopener noreferrer">
                $1.34 trillion
              </a>{" "}
              by the most conservative estimates. ASCE&rsquo;s{" "}
              <a href="https://infrastructurereportcard.org/" target="_blank" rel="noopener noreferrer">
                2025 infrastructure report card
              </a>{" "}
              awarded the nation a C — its best grade ever, up from D in 1998 — but identified a{" "}
              <a href="https://infrastructurereportcard.org/" target="_blank" rel="noopener noreferrer">
                $3.7 trillion investment gap
              </a>{" "}
              over the next decade. E-commerce has eroded the retail sales tax base, with online
              shopping climbing from 10.6 percent of retail sales in 2019 to{" "}
              <a href="https://journals.sagepub.com/doi/10.1177/08912424251331896" target="_blank" rel="noopener noreferrer">
                15.4 percent in 2023
              </a>. Pandemic-era federal aid that cushioned municipal budgets{" "}
              <a href="https://www.osc.ny.gov/press/releases/2025/02/dinapoli-warns-changing-fiscal-landscape-could-increase-budget-challenges-local-governments" target="_blank" rel="noopener noreferrer">
                expired in 2024
              </a>. The fiscal vise — rising pension costs, decaying infrastructure, shrinking tax
              bases, vanishing federal support — will force structural choices that most city councils
              have spent decades avoiding.
            </p>
          </FadeIn>

          <FadeIn>
            <KeyFact value="$1.34T" description="Unfunded pension liabilities across state and local governments. Chicago alone carries $35 billion." />
          </FadeIn>

          <FadeIn>
            <h3 className="lg-prose-subheading">AI, Data, and Transparency.</h3>
            <p className="lg-prose-paragraph">
              Local government technology is undergoing its most significant transformation since the
              shift to computerized record-keeping. Cities are deploying AI for{" "}
              <a href="https://www.govtech.com/biz/the-2026-gt100-what-will-it-take-to-scale-ai-in-government" target="_blank" rel="noopener noreferrer">
                automated permitting
              </a>{" "}
              (Polimorphic raised $18.6 million in 2025), meeting transcription and summarization
              ({" "}
              <a href="https://www.civicplus.com/news/nn/civicplus-announces-ai-capabilities-with-six-new-intelligent-product-releases/" target="_blank" rel="noopener noreferrer">
                CivicPlus launched AI-enabled products
              </a>{" "}
              in January 2026), and data analysis (the District of Columbia released{" "}
              <a href="https://www.smartcitiesdive.com/news/how-cities-using-ai-2026/810905/" target="_blank" rel="noopener noreferrer">
                DC Compass
              </a>, an AI tool that generates maps from the city&rsquo;s open data portal). Boston
              used generative AI to{" "}
              <a href="https://www.smartcitiesdive.com/news/how-cities-using-ai-2026/810905/" target="_blank" rel="noopener noreferrer">
                analyze 311 response times across neighborhoods
              </a>, uncovering disparities invisible to traditional reporting. The promise is real; so
              is the risk. Algorithmic bias in permitting decisions, surveillance creep in code
              enforcement, and the digital divide between cities that can afford these tools and those
              that cannot will define the next decade of local governance.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <CalloutBox variant="did-you-know" title="One City Lets 16-Year-Old Noncitizens Vote">
              Takoma Park, Maryland extended municipal voting rights to noncitizens in 1993 and dropped
              its voting age to 16 in 2013 — making it the first U.S. city to do so. It also pioneered
              instant-runoff voting and was one of the first communities to use the Scantegrity
              electronic voting verification system. The city&rsquo;s population is 18,000.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <h3 className="lg-prose-subheading">Democratic Innovation.</h3>
            <p className="lg-prose-paragraph">
              Takoma Park, Maryland — population 18,000 — lowered its{" "}
              <a href="https://www.governing.com/archive/gov-takoma-gives-teens-voting-rights.html" target="_blank" rel="noopener noreferrer">
                voting age to 16 in 2013
              </a>{" "}
              and extended municipal voting rights to noncitizens three decades ago. Over{" "}
              <a href="https://moderndiplomacy.eu/2025/03/11/why-participatory-budgeting-is-the-future-of-democracy/" target="_blank" rel="noopener noreferrer">
                500 local governments
              </a>{" "}
              worldwide now practice participatory budgeting; Chicago&rsquo;s 49th ward{" "}
              <a href="https://www.brennancenter.org/our-work/analysis-opinion/making-participatory-budgeting-work-experiences-front-lines" target="_blank" rel="noopener noreferrer">
                pioneered the U.S. model in 2009
              </a>. Ireland&rsquo;s Citizens&rsquo; Assembly — 99 randomly selected citizens —{" "}
              <a href="https://electoral-reform.org.uk/the-irish-abortion-referendum-how-a-citizens-assembly-helped-to-break-years-of-political-deadlock/" target="_blank" rel="noopener noreferrer">
                broke decades of political deadlock on abortion
              </a>{" "}
              in 2016-2017, producing a recommendation that 66.4 percent of voters endorsed in the
              subsequent referendum. These experiments matter because the conventional mechanisms of
              local democracy — biennial elections with 15 percent turnout for candidates no one has
              heard of — are manifestly inadequate for governing in a period of rapid change.
            </p>
          </FadeIn>

          <FadeIn>
            <h3 className="lg-prose-subheading">The Sustainability of Fragmentation.</h3>
            <p className="lg-prose-paragraph">
              Can 90,837 governments work? Elinor Ostrom won the Nobel Prize arguing, essentially,
              yes — that{" "}
              <a href="https://web.pdx.edu/~nwallace/EHP/OstromPolyGov.pdf" target="_blank" rel="noopener noreferrer">
                polycentric governance
              </a>{" "}
              captures efficiencies at multiple scales, enables experimentation, and provides more
              responsive services than consolidated bureaucracies. Her empirical finding that small
              police departments{" "}
              <a href="https://mcginnis.pages.iu.edu/polycentric%20governance%20theory%20and%20practice%20Feb%202016.pdf" target="_blank" rel="noopener noreferrer">
                outperformed large ones
              </a>{" "}
              at lower cost challenged a half-century of consolidation ideology. The counterargument is
              equity: fragmentation enables wealthy enclaves to hoard resources while adjacent
              jurisdictions starve. The tension will not resolve. It will intensify as climate
              migration reshuffles populations, as remote work decouples residence from employment, and
              as state legislatures continue to redraw the boundaries of local authority from above.
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
