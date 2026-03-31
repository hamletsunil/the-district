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
  { title: "Big Cities, Tiny Votes: America's Urban Voter Turnout", outlet: "Yankelevich Center, UC San Diego", url: "https://yankelovichcenter.ucsd.edu/_files/reports/Big-Cities-Tiny-Votes.pdf" },
  { title: "Moving Municipal Elections to Even-Numbered Years", outlet: "Citizens Union", url: "https://citizensunion.org/portfolio-item/cu-report-moving-municipal-elections-to-even-numbered-years/" },
  { title: "Mapping the Revolution in California City Council Election Systems", outlet: "Rose Institute of State and Local Government", url: "https://roseinstitute.org/wp-content/uploads/2025/05/CA-City-Elections-Systems-Report_FINAL.pdf" },
  { title: "California's Voting Rights Act Continues to Force More Local Governments into By-District Elections", outlet: "NDC Research", url: "https://www.ndcresearch.com/cvra-by-district-elections/" },
  { title: "Fact Sheet: Ranked Choice Voting in 2025 Elections", outlet: "FairVote", url: "https://fairvote.org/press/fact-sheet-ranked-choice-voting-in-2025-elections/" },
  { title: "What We Know About Ranked Choice Voting, Updated for 2025", outlet: "American Bar Association", url: "https://www.americanbar.org/groups/public_interest/election_law/american-democracy/our-work/what-we-know-about-ranked-choice-voting-2025/" },
  { title: "Cities 101 — Term Lengths and Limits", outlet: "National League of Cities", url: "https://www.nlc.org/resource/cities-101-term-lenths-and-limits/" },
  { title: "Women Mayors in U.S. Cities 2025", outlet: "Center for American Women and Politics, Rutgers", url: "https://cawp.rutgers.edu/women-mayors-us-cities-2025" },
  { title: "Political Recall Efforts, 2024", outlet: "Ballotpedia", url: "https://ballotpedia.org/Political_recall_efforts,_2024" },
  { title: "Six Reasons Seattleites Should Be Proud of Their Democracy Vouchers", outlet: "Sightline Institute", url: "https://www.sightline.org/2025/05/27/six-reasons-seattleites-should-be-proud-of-their-democracy-vouchers/" },
  { title: "Local Campaign Contribution Limits", outlet: "MOST Policy Initiative", url: "https://mostpolicyinitiative.org/science-note/local-campaign-contribution-limits/" },
  { title: "Police Unions Spend Big for Political Influence", outlet: "Silicon Valley Voice", url: "https://www.svvoice.com/police-unions-spend-big-for-political-influence-and-santa-clara-is-no-slacker/" },
];

export function ElectionsChapter() {
  return (
    <>
      <AtAGlance
        stats={[
          { value: "27%", label: "Typical local election turnout" },
          { value: "500K+", label: "Local elected officials" },
          { value: "51", label: "Jurisdictions using RCV" },
        ]}
        finding="The elections that determine who controls the government closest to daily life attract fewer voters, less scrutiny, and far less money than any other tier of American democracy."
      />

      <section className="lg-chapter-body">
        <div className="lg-prose-container">
          <FadeIn>
            <p className="lg-prose-paragraph">
              Half a million Americans hold elected local office. They govern from 90,837 local
              jurisdictions — cities, counties, townships, school boards, and special districts — and
              collectively make more decisions that shape daily life than Congress and all fifty state
              legislatures combined. Yet the elections that put them there attract fewer voters, less
              scrutiny, and far less money than any other tier of American democracy.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h3 className="lg-prose-subhead">The Turnout Problem</h3>
            <p className="lg-prose-paragraph">
              The central fact of local elections is that almost nobody votes in them. Nationwide,{" "}
              <a href="https://yankelovichcenter.ucsd.edu/_files/reports/Big-Cities-Tiny-Votes.pdf" target="_blank" rel="noopener noreferrer">
                27 percent of eligible voters
              </a>{" "}
              cast ballots in a typical municipal election. In the 30 largest cities, turnout in
              <a href="/articles/how-local-government-works/glossary#off-cycle-election">off-cycle</a> races falls below 15 percent. The culprit is timing. Most cities hold elections
              in odd-numbered years or in spring — deliberately separated from state and federal
              contests. The rationale, dating to Progressive Era reforms, is that local elections
              should be insulated from national partisan currents. The cost is staggering: when
              Baltimore moved its municipal elections to align with the presidential cycle in 2016,{" "}
              <a href="https://citizensunion.org/wp-content/uploads/2023/01/Moving-Municipal-Elections-to-Even-Numbered-Years-Citizens-Union-report_FINAL.pdf" target="_blank" rel="noopener noreferrer">
                turnout jumped from 13 percent to 60 percent
              </a>. Phoenix, Austin, and El Paso saw{" "}
              <a href="https://citizensunion.org/portfolio-item/cu-report-moving-municipal-elections-to-even-numbered-years/" target="_blank" rel="noopener noreferrer">
                increases of 240 to 460 percent
              </a>{" "}
              after consolidating election dates. San Francisco&rsquo;s first on-cycle mayoral election
              in November 2024 drew 78.5 percent of registered voters, more than double the
              city&rsquo;s off-year average.
            </p>
          </FadeIn>

          <FadeIn>
            <StatBar
              title="Voter Turnout by Election Type"
              items={[
                { label: "Presidential", value: 66, displayValue: "66%" },
                { label: "Midterm", value: 50, displayValue: "~50%" },
                { label: "Local (on-cycle)", value: 40, displayValue: "~40%" },
                { label: "Local (off-cycle)", value: 27, displayValue: "27%", highlight: true },
              ]}
            />
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The composition of the electorate shifts with timing. Off-cycle electorates{" "}
              <a href="https://electionlab.mit.edu/research/election-timing" target="_blank" rel="noopener noreferrer">
                skew whiter and wealthier
              </a>{" "}
              than the cities they govern. On-cycle elections pull the voting population closer to
              actual demographics. The choice of election date, in other words, is a policy decision
              with representational consequences — one that most residents have never been asked to
              weigh in on.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <CalloutBox variant="why-matters" title="Election timing is the single largest determinant of who governs your city.">
              Moving local elections on-cycle consistently doubles or triples turnout and shifts the
              electorate toward the actual demographics of the city. The choice to hold elections in
              odd years or spring is a structural decision — often made decades ago — that
              systematically reduces participation by younger, lower-income, and minority voters.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <h3 className="lg-prose-subhead">At-Large vs. District: The Voting Rights Transformation</h3>
            <p className="lg-prose-paragraph">
              For most of the twentieth century, the default local election structure was <a href="/articles/how-local-government-works/glossary#at-large-election">at-large</a>:
              every council member elected by every voter citywide. The federal Voting Rights Act of
              1965 began challenging that model where it diluted minority voting strength, but the
              legal standard was demanding — plaintiffs had to prove that a minority group was
              geographically compact enough to constitute a majority in a single district.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <p className="lg-prose-paragraph">
              California changed the calculus. The{" "}
              <a href="https://en.wikipedia.org/wiki/California_Voting_Rights_Act" target="_blank" rel="noopener noreferrer">
                California Voting Rights Act of 2001
              </a>{" "}
              eliminated the compactness requirement, making it far easier to challenge at-large
              systems. The results have been seismic: in 2000, just 7.6 percent of California cities
              used district elections. By 2024,{" "}
              <a href="https://roseinstitute.org/wp-content/uploads/2025/05/CA-City-Elections-Systems-Report_FINAL.pdf" target="_blank" rel="noopener noreferrer">
                47.4 percent — 229 of 483 cities — had switched
              </a>. No jurisdiction has ever won a CVRA lawsuit. Settlements have reached{" "}
              <a href="https://www.ndcresearch.com/cvra-by-district-elections/" target="_blank" rel="noopener noreferrer">
                $4.5 million in Palmdale, $3 million in Modesto, and $1.1 million in Anaheim
              </a>. The economics are stark: a city can pay a demographer $50,000 to draw district
              lines, or it can pay lawyers millions to lose in court.
            </p>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Savannah, GA, operates a hybrid model that predates the CVRA —{" "}
              <a href="https://savannahga.gov/389/Aldermanic-Districts" target="_blank" rel="noopener noreferrer">
                six aldermen elected by district, two at-large, plus a citywide mayor
              </a>. Raleigh, NC, uses a similar blend:{" "}
              <a href="https://raleighnc.gov/city-council" target="_blank" rel="noopener noreferrer">
                five district seats, two at-large, and a citywide mayor
              </a>. In 2024, Raleigh&rsquo;s council voted to add district seats and switch to{" "}
              <a href="https://raleighnc.gov/engage-city/news/city-council-moves-four-year-terms-staggered-elections" target="_blank" rel="noopener noreferrer">
                four-year staggered terms with nonpartisan primaries
              </a>, taking effect in 2026. The national trend is unmistakable: district-based
              representation is replacing at-large elections, driven by litigation, legislation, and
              the recognition that citywide contests favor incumbents with name recognition and
              campaign war chests.
            </p>
          </FadeIn>

          <FadeIn>
            <PullQuote
              text="A city can pay a demographer $50,000 to draw district lines, or it can pay lawyers millions to lose in court."
              className="lg-pull-quote"
            />
          </FadeIn>

          <FadeIn delay={0.05}>
            <h3 className="lg-prose-subhead">Ranked Choice Voting: The Reform That Caught On</h3>
            <p className="lg-prose-paragraph">
              <a href="/articles/how-local-government-works/glossary#ranked-choice-voting">Ranked-choice voting</a> has grown from a niche experiment to a movement. In 2016, ten U.S.
              jurisdictions used RCV. By 2025,{" "}
              <a href="https://fairvote.org/press/fact-sheet-ranked-choice-voting-in-2025-elections/" target="_blank" rel="noopener noreferrer">
                51 jurisdictions serving 14 million voters
              </a>{" "}
              had adopted it, including New York City (primaries only), Minneapolis, San Francisco, and
              Salt Lake City. Washington, D.C., will begin using RCV for all elections in 2026.
            </p>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The impact data is encouraging. Research finds an{" "}
              <a href="https://www.americanbar.org/groups/public_interest/election_law/american-democracy/our-work/what-we-know-about-ranked-choice-voting-2025/" target="_blank" rel="noopener noreferrer">
                estimated ten-point increase in turnout
              </a>{" "}
              after controlling for other variables. Minneapolis, St. Paul, and Salt Lake City all
              elected their first majority people-of-color city councils under RCV; New York City
              elected its first majority-women council. Candidates in RCV races run more collaborative
              campaigns — cross-endorsements, where a candidate urges supporters to rank a rival
              second, are now routine. In New York&rsquo;s 2025 primaries,{" "}
              <a href="https://thefulcrum.us/civic-engagement-education/ranked-choice-voting-expands-across-america-2025" target="_blank" rel="noopener noreferrer">
                96 percent of voters found their ballot simple to complete
              </a>, and 76 percent wanted to keep or expand the system. The strongest argument against
              RCV remains that it confuses voters, but the data so far contradict that claim.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <CalloutBox variant="misconception" title="Local elections are nonpartisan, so party affiliation does not matter.">
              Most municipal elections are technically nonpartisan — candidates appear on the ballot
              without party labels. But party infrastructure, endorsements, and donor networks shape
              local races profoundly. In cities like Madison, WI, partisan progressive networks
              dominate council races despite the nonpartisan ballot. The label is absent; the
              machinery is not.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <h3 className="lg-prose-subhead">Campaign Finance: Where the Money Flows</h3>
            <p className="lg-prose-paragraph">
              Local campaign finance operates in a patchwork of limits and loopholes. Los Angeles caps
              contributions at{" "}
              <a href="https://codelibrary.amlegal.com/codes/los_angeles/latest/laac/0-0-0-1874" target="_blank" rel="noopener noreferrer">
                $500 per donor per council race
              </a>. San Diego sets the limit at{" "}
              <a href="https://www.sandiego.gov/ethics/faqs/contrib" target="_blank" rel="noopener noreferrer">
                $800 for district elections and $1,450 for citywide races
              </a>. New York City{" "}
              <a href="https://www.nyccfb.info/candidate-services/limits-thresholds/2025/" target="_blank" rel="noopener noreferrer">
                prohibits corporate contributions entirely
              </a>{" "}
              and matches small donations at 8-to-1 with public funds. Portland allows just{" "}
              <a href="https://www.portland.gov/elections/elections-faq/campaign-finance-regulations-contribution-limits" target="_blank" rel="noopener noreferrer">
                $613 per donor over a four-year cycle
              </a>. Many cities have no limits at all.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <p className="lg-prose-paragraph">
              The real money arrives through independent expenditures. In Santa Clara, California, the
              police union PAC spent{" "}
              <a href="https://www.svvoice.com/police-unions-spend-big-for-political-influence-and-santa-clara-is-no-slacker/" target="_blank" rel="noopener noreferrer">
                $223,000 in the 2024 election cycle
              </a>{" "}
              — funded almost entirely by union dues, a shift from prior cycles when developer
              donations filled the PAC&rsquo;s coffers. In Los Angeles,{" "}
              <a href="https://www.dailynews.com/2024/02/27/2024-elections-la-city-council-races-are-fueled-by-millions-in-outside-spending/" target="_blank" rel="noopener noreferrer">
                millions in outside spending
              </a>{" "}
              flowed into city council races from police unions, firefighter associations, and real
              estate groups. Research across 132 cities found that{" "}
              <a href="https://mostpolicyinitiative.org/science-note/local-campaign-contribution-limits/" target="_blank" rel="noopener noreferrer">
                every $500 donated by real estate interests correlated with 2.5 additional permitted
                multifamily units
              </a>{" "}
              — a statistically significant link between developer money and housing policy.
            </p>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Seattle&rsquo;s{" "}
              <a href="https://www.seattle.gov/democracyvoucher/about-the-program" target="_blank" rel="noopener noreferrer">
                democracy voucher program
              </a>, launched in 2015 as the nation&rsquo;s first, gives every adult resident four $25
              vouchers to assign to qualifying municipal candidates. The results: winning candidates
              who were people of color rose from 30 percent to 58.3 percent; women from 50 percent to
              66.7 percent. New York City&rsquo;s matching-funds system has operated since 1988 and
              remains the gold standard for public financing in local elections. Yet despite these
              successes, Oakland voters approved a similar voucher program in 2022{" "}
              <a href="https://boltsmag.org/seattle-democracy-vouchers-renewing/" target="_blank" rel="noopener noreferrer">
                that city officials have yet to fund
              </a>.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <CalloutBox variant="state-variation" title="California's CVRA has no equivalent elsewhere — but the pressure is spreading.">
              The federal Voting Rights Act requires proof that a minority group is geographically
              compact enough to form a district majority. California&rsquo;s CVRA eliminated that
              requirement, triggering a wave of 200+ cities switching to district elections. Other
              states are watching: Washington and Oregon have considered similar legislation, and
              federal courts continue to hear VRA challenges to at-large systems in the South and
              Midwest.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <h3 className="lg-prose-subhead">Term Limits, Recalls, and the Pipeline</h3>
            <p className="lg-prose-paragraph">
              Term limits at the local level are rarer than most people assume. Only{" "}
              <a href="https://www.nlc.org/resource/cities-101-term-lenths-and-limits/" target="_blank" rel="noopener noreferrer">
                about 15 percent of U.S. cities impose them
              </a>, though the largest cities are far more likely to:{" "}
              <a href="https://termlimits.com/nine-of-the-ten-largest-u-s-cities-have-term-limits/" target="_blank" rel="noopener noreferrer">
                nine of the ten most populous cities have term limits
              </a>. Phoenix limits council members to three consecutive four-year terms and the mayor
              to two. The arguments for limits — turnover, fresh perspectives, reduced incumbency
              advantage — compete with evidence that they{" "}
              <a href="https://as.nyu.edu/content/dam/nyu-as/faculty/documents/egan.municipal.termlimits.2010.pdf" target="_blank" rel="noopener noreferrer">
                increase polarization, weaken legislatures relative to executives, and reduce
                legislative productivity
              </a>.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <p className="lg-prose-paragraph">
              Recalls provide a more dramatic check. In 2024,{" "}
              <a href="https://ballotpedia.org/Political_recall_efforts,_2024" target="_blank" rel="noopener noreferrer">
                108 recall elections reached the ballot nationwide; 77 succeeded
              </a>. The most consequential was Oakland&rsquo;s recall of Mayor Sheng Thao,{" "}
              <a href="https://en.wikipedia.org/wiki/2024_Oakland_mayoral_recall_election" target="_blank" rel="noopener noreferrer">
                removed from office barely two years into her term
              </a>{" "}
              amid rising crime and a federal investigation at her home. California&rsquo;s two-thirds
              supermajority requirement for local special taxes means ballot measures also serve as a
              constraint — or an end-run — on council authority.
            </p>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The pipeline into local office remains narrow. Boards and commissions — planning, parks,
              library, police oversight — function as the farm team. Serving on a local board builds
              networks, teaches process, and creates a public record. But the demographics of who
              serves reflect persistent gaps:{" "}
              <a href="https://cawp.rutgers.edu/women-mayors-us-cities-2025" target="_blank" rel="noopener noreferrer">
                25.4 percent of mayors in cities over 30,000 are women
              </a>, and only about a third of council members are female. Three-quarters of local
              election officials are{" "}
              <a href="https://democracyfund.org/idea/pursuing-diversity-and-representation-among-local-election-officials/" target="_blank" rel="noopener noreferrer">
                over age 50
              </a>. Appointed boards, which serve as the talent pipeline, are{" "}
              <a href="https://blogs.lse.ac.uk/usappblog/2025/06/30/local-boards-are-critical-for-communities-but-they-underrepresent-women-and-people-of-color/" target="_blank" rel="noopener noreferrer">
                disproportionately white and male
              </a>{" "}
              in most jurisdictions — meaning the pipeline itself filters who reaches the next rung.
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
