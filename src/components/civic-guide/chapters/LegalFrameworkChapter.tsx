"use client";

import { CalloutBox } from "@/components/civic-guide/CalloutBox";
import { PullQuote } from "@/components/article/PullQuote";
import { AtAGlance } from "@/components/article/AtAGlance";
import { SourcesCitations } from "@/components/article/SourcesCitations";
import { ComparisonTable } from "@/components/civic-guide/ComparisonTable";
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
  { title: "Dillon's Rule", outlet: "Legal Information Institute, Cornell Law School", url: "https://www.law.cornell.edu/wex/dillon's_rule" },
  { title: "Home Rule in the United States", outlet: "Wikipedia / multiple constitutional sources", url: "https://en.wikipedia.org/wiki/Home_rule_in_the_United_States" },
  { title: "Five Year Review: How State Laws Have Impacted Local Decision-Making", outlet: "National League of Cities", url: "https://www.nlc.org/article/2025/10/09/five-year-review-how-state-laws-have-impacted-local-decision-making/" },
  { title: "Workers' Rights Preemption in the U.S.", outlet: "Economic Policy Institute", url: "https://www.epi.org/preemption-map/" },
  { title: "Municipal Broadband Remains Roadblocked in 16 States", outlet: "BroadbandNow", url: "https://broadbandnow.com/report/municipal-broadband-roadblocks" },
  { title: "Understanding City Charters: A Local Government's Constitution", outlet: "SPUR", url: "https://www.spur.org/news/2025-08-25/understanding-city-charters-local-governments-constitution" },
  { title: "About LAFCOs", outlet: "California Association of Local Agency Formation Commissions", url: "https://calafco.org/About_LAFCOs" },
  { title: "Monell v. Department of Social Services, 436 U.S. 658 (1978)", outlet: "Justia U.S. Supreme Court Center", url: "https://supreme.justia.com/cases/federal/us/436/658/" },
  { title: "Local Sovereign Immunity", outlet: "Columbia Law Review", url: "https://www.columbialawreview.org/content/local-sovereign-immunity/" },
  { title: "Dillon's Rule and Home Rule: The History Behind the Two Prevailing Views", outlet: "Cumberland Trial Journal", url: "https://cumberlandtrialjournal.com/2020/08/11/dillons-rule-and-home-rule-the-history-behind-the-two-prevailing-views-on-the-powers-of-local-government-and-what-that-looks-like-in-alabama/" },
  { title: "State Legislatures Impede Gun Safety Efforts by Expanding Statewide Firearm Preemption", outlet: "Local Solutions Support Center", url: "https://www.supportdemocracy.org/the-latest/state-legislatures-impede-gun-safety-efforts-by-expanding-statewide-firearm-preemption" },
  { title: "After Five-Year Legal Battle, NC Supreme Court Rules Asheville Can Keep Its Water System", outlet: "NC Newsline", url: "https://ncnewsline.com/briefs/after-five-year-legal-battle-nc-supreme-court-rules-asheville-can-keep-its-water-system/" },
];

export function LegalFrameworkChapter() {
  return (
    <>
      <AtAGlance
        stats={[
          { value: "31", label: "States applying Dillon's Rule" },
          { value: "46", label: "States preempting local gun laws" },
          { value: "121", label: "Charter cities in California" },
        ]}
        finding="American cities have no constitutional right to exist. The word 'city' does not appear in the U.S. Constitution."
      />

      <section className="lg-chapter-body">
        <div className="lg-prose-container">
          <FadeIn>
            <p className="lg-prose-paragraph">
              American cities have no constitutional right to exist. The word &ldquo;city&rdquo; does
              not appear in the U.S. Constitution, and unlike the states — which possess residual
              sovereignty under the Tenth Amendment — municipalities are, in the eyes of federal law,
              mere creatures of the state that created them. This single fact, unremarkable on its
              surface, is the tectonic plate beneath every fight over local authority in America.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">Dillon&rsquo;s Rule</h2>
          </FadeIn>

          <FadeIn delay={0.05}>
            <p className="lg-prose-paragraph">
              The doctrine that established this principle bears the name of Judge John Forrest Dillon
              of the Iowa Supreme Court, who articulated it in{" "}
              <a href="https://calculators.law/caselaw/decisions/mLo8MVZa3D4M/city-of-clinton-v-cedar-rapids-missouri-river-railroad" target="_blank" rel="noopener noreferrer">
                <em>City of Clinton v. Cedar Rapids &amp; Missouri River Railroad</em>
              </a>{" "}
              in 1868. Dillon, who had witnessed rampant corruption in municipal governments — local
              officials cutting deals with railroad interests, granting sweetheart franchises, piling
              up debts that taxpayers would inherit — wrote that a municipal corporation possesses only
              those powers expressly granted by the state, those necessarily implied from the grant,
              and those essential to the municipality&rsquo;s declared purposes. Any reasonable doubt
              about whether a power exists is to be resolved against the city. The rule was, in
              essence, a leash: cities could do only what the state explicitly permitted.
            </p>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The{" "}
              <a href="https://www.nlc.org/" target="_blank" rel="noopener noreferrer">
                National League of Cities
              </a>{" "}
              counts 31 states that apply{" "}
              <a href="https://www.law.cornell.edu/wex/dillon's_rule" target="_blank" rel="noopener noreferrer">
                Dillon&rsquo;s Rule
              </a>{" "}
              to all municipalities, and another 8 that apply it selectively — California, Illinois,
              and Tennessee among them. In a Dillon&rsquo;s Rule state, if the legislature has not
              specifically authorized a city to regulate, say, short-term rental platforms, the city
              cannot do so. Virginia is a classic example: its cities must seek explicit enabling
              legislation from Richmond for powers that cities in Colorado or Oregon exercise as a
              matter of course.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <CalloutBox variant="misconception" title={`"Cities Can Do Whatever They Want"`}>
              Most American cities operate under Dillon&rsquo;s Rule, meaning they can exercise only
              those powers the state legislature has specifically granted. A city that wants to ban
              single-use plastics, create a municipal broadband network, or set its own minimum wage
              may find itself legally unable to do so — not because the city lacks the will, but
              because the state has not authorized the action (or has affirmatively preempted it).
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">Home Rule</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The intellectual counterweight emerged three years later from Michigan. Judge Thomas
              Cooley, in a concurrence in{" "}
              <a href="https://case-law.vlex.com/vid/24-mich-44-mich-617718531" target="_blank" rel="noopener noreferrer">
                <em>People v. Hurlbut</em>
              </a>{" "}
              (1871), declared that &ldquo;local government is a matter of absolute right; and the
              state cannot take it away.&rdquo; Cooley&rsquo;s argument — that self-governance at the
              local level predates the state and is implied in the structure of democratic government —
              became the foundation of the{" "}
              <a href="https://en.wikipedia.org/wiki/Home_rule_in_the_United_States" target="_blank" rel="noopener noreferrer">
                home rule
              </a>{" "}
              movement. Missouri adopted the first home rule provision in 1875, and by the Progressive
              Era, the idea had spread. Today, 10 states grant broad home rule to all municipalities,
              allowing cities to exercise any power not expressly prohibited by the state. The
              practical consequences are profound: a home-rule city can experiment with new forms of
              taxation, novel regulatory approaches, and innovative governance structures without
              petitioning the legislature for permission.
            </p>
          </FadeIn>

          <FadeIn>
            <ComparisonTable
              title="Dillon's Rule vs. Home Rule"
              columns={["", "Dillon's Rule", "Home Rule"]}
              rows={[
                { label: "Authority", values: ["Only what state grants", "Anything not prohibited"] },
                { label: "States", values: ["31 (full) + 8 (selective)", "10 (broad) + others partial"] },
                { label: "New regulations", values: ["Need state permission", "Can act independently"] },
                { label: "Example", values: ["Virginia", "Oregon"] },
                { label: "Risk", values: ["Innovation blocked", "Local fragmentation"] },
              ]}
            />
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">Charter Cities vs. General-Law Cities</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The distinction between charter cities and general-law cities operationalizes this
              divide. A charter city adopts its own governing document — essentially a local
              constitution — that defines its structure, powers, and procedures. A general-law city
              relies entirely on the state&rsquo;s municipal code. In California,{" "}
              <a href="https://www.spur.org/news/2025-08-25/understanding-city-charters-local-governments-constitution" target="_blank" rel="noopener noreferrer">
                121 of 483 cities
              </a>{" "}
              are charter cities, and the pattern is not random: the state&rsquo;s ten largest cities —
              San Francisco, Los Angeles, San Diego, San Jose — all operate under charters. Six states
              do not permit municipal charters at all, leaving every city to operate under general
              state law. Charter adoption typically requires a vote of the electorate, and amendments
              go back to the ballot, making a charter a genuine exercise in local self-determination.
              San Francisco&rsquo;s charter, for instance, runs to hundreds of pages and establishes
              everything from the structure of the Board of Supervisors to the powers of the
              city&rsquo;s independent commissions.
            </p>
          </FadeIn>

          <FadeIn>
            <PullQuote
              text="Between 2019 and 2024, the average state went from preempting three policy domains to four. The most prevalent target is firearms: 46 states now bar cities from passing gun regulations stricter than state law."
              className="lg-pull-quote"
            />
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">State Preemption</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Against this backdrop, the rise of state preemption — states affirmatively stripping
              cities of power — has become the dominant story in intergovernmental relations. The{" "}
              <a href="https://www.nlc.org/article/2025/10/09/five-year-review-how-state-laws-have-impacted-local-decision-making/" target="_blank" rel="noopener noreferrer">
                NLC&rsquo;s longitudinal database
              </a>, built with Temple University&rsquo;s Center for Public Health Law Research, tracks
              preemption across ten policy domains in all 50 states. Between 2019 and 2024, the
              average state went from preempting three domains to four. The peak year was 2021. The
              most prevalent target is firearms:{" "}
              <a href="https://www.supportdemocracy.org/the-latest/state-legislatures-impede-gun-safety-efforts-by-expanding-statewide-firearm-preemption" target="_blank" rel="noopener noreferrer">
                46 states
              </a>{" "}
              now bar cities from passing gun regulations stricter than state law, a near-universal
              restriction that began with aggressive lobbying by the National Rifle Association. Some
              states go further: Oklahoma&rsquo;s recent legislation would impose financial penalties
              on any municipality that violates the preemption.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <CalloutBox variant="why-matters" title="Preemption Is the New Battleground">
              State preemption has become the primary mechanism through which state legislatures
              override local democratic choices. When a city votes to raise its minimum wage, ban
              plastic bags, or restrict firearms near schools, and the state legislature overrides that
              decision, it raises a fundamental question about where democratic authority resides.
              Between 2019 and 2024, the number of policy domains preempted by the average state rose
              from three to four.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The roster of preempted policy areas reads like an inventory of the issues cities care
              most about. At least{" "}
              <a href="https://www.epi.org/preemption-map/" target="_blank" rel="noopener noreferrer">
                25 states
              </a>{" "}
              prevent cities from setting their own minimum wage, a wave that began after the Fight
              for $15 movement gained traction at city hall. Louisiana led the way in 1997; 15 more
              states followed after 2012. About{" "}
              <a href="https://ipropertymanagement.com/laws/rent-control" target="_blank" rel="noopener noreferrer">
                33 states
              </a>{" "}
              prohibit local rent control ordinances — only California, Oregon, and the District of
              Columbia have enacted statewide tenant protections.{" "}
              <a href="https://broadbandnow.com/report/municipal-broadband-roadblocks" target="_blank" rel="noopener noreferrer">
                Sixteen states
              </a>{" "}
              restrict or ban municipalities from building their own broadband networks, a form of
              preemption enacted at the behest of telecom incumbents that directly prevents cities from
              addressing the digital divide. And when Minneapolis passed a plastic bag ban and a
              five-cent tax on paper bags in 2016, the{" "}
              <a href="https://cleanwater.org/2024/03/08/ending-minnesotas-plastic-bag-ban-preemption-case-local-control" target="_blank" rel="noopener noreferrer">
                Minnesota legislature preempted the ordinance
              </a>{" "}
              the following year.
            </p>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Preemption fights occasionally become existential. The North Carolina legislature
              attempted to{" "}
              <a href="https://ncnewsline.com/briefs/after-five-year-legal-battle-nc-supreme-court-rules-asheville-can-keep-its-water-system/" target="_blank" rel="noopener noreferrer">
                seize Asheville&rsquo;s water system
              </a>{" "}
              — its 1,600 miles of pipes, 40 pumping stations, and 124,000 customers — and transfer it
              to a newly created regional authority, without compensation. After a five-year legal
              battle, the state supreme court ruled the takeover unconstitutional. Texas&rsquo;s{" "}
              <a href="https://www.congress.gov/crs-product/LSB11330" target="_blank" rel="noopener noreferrer">
                SB 4
              </a>{" "}
              threatened to remove from office any local official who maintained sanctuary city
              policies and imposed fines of $25,000 per day on noncompliant jurisdictions. In
              California, the legislature took the opposite approach, preempting local zoning to force
              cities like Orinda to approve duplexes on single-family lots under{" "}
              <a href="https://www.cityoforinda.gov/561/Senate-Bill-9-SB-9" target="_blank" rel="noopener noreferrer">
                SB 9
              </a>{" "}
              — ministerially, without public hearings or neighborhood notification.
            </p>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The Colorado fracking saga illustrates how preemption can reverse direction. When
              Longmont and Fort Collins banned hydraulic fracturing, the state supreme court{" "}
              <a href="https://fedsoc.org/scdw/colorado-supreme-court-strikes-down-local-fracking-bans" target="_blank" rel="noopener noreferrer">
                struck down both bans
              </a>, holding that state regulation of oil and gas preempted local action. Boulder
              County&rsquo;s moratorium met the same fate. Then, in 2019, Governor Polis signed{" "}
              <a href="https://leg.colorado.gov/bills/hb20-1070" target="_blank" rel="noopener noreferrer">
                SB 19-181
              </a>, which eliminated state preemption and restored local land-use authority over
              fracking operations. The pendulum swung back in a single legislative session.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <CalloutBox variant="state-variation" title="The Same City, Different Powers">
              A city of 100,000 people in Oregon (a strong home-rule state) can adopt its own charter,
              set novel tax structures, and regulate areas the state has not addressed — all without
              legislative permission. The same-sized city in Virginia (a strict Dillon&rsquo;s Rule
              state) must petition the General Assembly for enabling legislation before taking most
              regulatory actions. In California (a mixed state), a charter city like San Francisco has
              broad authority over &ldquo;municipal affairs,&rdquo; while a general-law city like
              Orinda relies on the state municipal code for its powers.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">Incorporation and Annexation</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              How cities are born — and how they grow — varies enormously by state. Incorporation
              typically requires a petition from residents, a minimum population, and a vote. Recent
              incorporations include Mountain House, California (the state&rsquo;s first new city in
              13 years, approved in 2024), Mableton, Georgia (2022), and Essex Junction, Vermont,
              which separated from the town of Essex in 2022 after a 2021 vote. Sandy Springs,
              Georgia, incorporated in 2005 with a 94 percent vote and became famous for{" "}
              <a href="https://roughdraftatlanta.com/2019/05/14/sandy-springs-to-bring-most-government-services-in-house-ending-much-of-landmark-privatization/" target="_blank" rel="noopener noreferrer">
                outsourcing nearly all municipal functions
              </a>{" "}
              to a single private contractor — an experiment it later reversed, documenting $26 million
              in savings from bringing services in-house. Expansion of existing cities happens through
              annexation, and the processes differ radically: some states allow cities to annex
              unilaterally, others require consent of the affected property owners, and California
              routes every boundary change through its 58{" "}
              <a href="https://calafco.org/About_LAFCOs" target="_blank" rel="noopener noreferrer">
                Local Agency Formation Commissions
              </a>{" "}
              (LAFCOs), created in 1963 after the state&rsquo;s population explosion produced hundreds
              of illogical, overlapping jurisdictions. LAFCOs oversee roughly 3,500 governmental
              agencies, including more than 400 cities and 3,000 special districts.
            </p>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Cities fight for their interests in Washington through a set of advocacy organizations
              collectively known as the &ldquo;Big Seven.&rdquo; The{" "}
              <a href="https://www.nlc.org/" target="_blank" rel="noopener noreferrer">
                National League of Cities
              </a>{" "}
              represents 19,495 municipalities and 49 state municipal leagues. The{" "}
              <a href="https://www.usmayors.org/" target="_blank" rel="noopener noreferrer">
                U.S. Conference of Mayors
              </a>{" "}
              speaks for the approximately 1,400 cities with populations above 30,000. The{" "}
              <a href="https://www.naco.org/" target="_blank" rel="noopener noreferrer">
                National Association of Counties
              </a>{" "}
              represents county governments. Their shared agenda centers on blocking unfunded mandates —
              federal requirements imposed on local governments without corresponding funding. The
              Clean Water Act alone cost local governments an estimated $29.3 billion in compliance
              over a four-year period in the 1990s. Los Angeles reported spending $576 million in a
              single fiscal year complying with federal mandates.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">Suing a City</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The question of when you can sue a city adds a final layer of complexity. Under
              traditional{" "}
              <a href="https://www.columbialawreview.org/content/local-sovereign-immunity/" target="_blank" rel="noopener noreferrer">
                sovereign immunity
              </a>, governments cannot be sued without their consent. Most states have partially waived
              immunity through tort claims acts, but the rules vary wildly: notice periods, damage
              caps, and the distinction between &ldquo;governmental&rdquo; functions (immune) and
              &ldquo;proprietary&rdquo; functions (not immune) differ state to state. The landmark{" "}
              <a href="https://supreme.justia.com/cases/federal/us/436/658/" target="_blank" rel="noopener noreferrer">
                <em>Monell v. Department of Social Services</em>
              </a>{" "}
              (1978) opened cities to federal civil rights liability under Section 1983, but with an
              important limitation: a city cannot be held liable merely because it employs someone who
              violates constitutional rights. A plaintiff must prove that the violation resulted from
              an official policy, practice, or custom — the &ldquo;Monell standard&rdquo; — making it
              difficult but not impossible to hold municipalities accountable for systemic failures
              like patterns of police misconduct.
            </p>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The legal architecture of American local government is, in the end, a story about trust.
              Dillon&rsquo;s Rule reflects a deep suspicion of local power — the fear that cities will
              be captured by corruption or faction. Home rule reflects a deep faith in self-governance —
              the belief that the people closest to a problem are best positioned to solve it. Most
              states live somewhere between these poles, granting local authority with one hand and
              preempting it with the other, producing a legal landscape that is less a coherent system
              than a palimpsest of compromises layered over 150 years.
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
