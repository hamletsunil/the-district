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
  { title: "Village of Euclid v. Ambler Realty Co., 272 U.S. 365 (1926)", outlet: "Justia US Supreme Court Center", url: "https://supreme.justia.com/cases/federal/us/272/365/" },
  { title: "Single-Family Zoning in California: A Statewide Analysis", outlet: "UC Berkeley Othering & Belonging Institute", url: "https://belonging.berkeley.edu/single-family-zoning-california-statewide-analysis" },
  { title: "Does Discretion Delay Development?", outlet: "Journal of the American Planning Association", url: "https://www.tandfonline.com/doi/full/10.1080/01944363.2022.2106291" },
  { title: "Reforming Permitting Requirements to Lower the Cost of Building New Housing", outlet: "White House Council of Economic Advisers", url: "https://bidenwhitehouse.archives.gov/cea/written-materials/2024/08/13/reforming-permitting-requirements-to-lower-the-cost-of-building-new-housing-and-increase-housing-affordability/" },
  { title: "The Cost of Regulations on Multifamily Development", outlet: "NMHC/NAHB", url: "https://www.nmhc.org/contentassets/60365effa073432a8a168619e0f30895/nmhc-nahb-cost-of-regulations.pdf" },
  { title: "General Plan Guidelines, Chapter 4: Required Elements", outlet: "California Governor's Office of Planning and Research", url: "https://lci.ca.gov/docs/OPR_C4_final.pdf" },
  { title: "Kelo v. City of New London", outlet: "Justia US Supreme Court Center", url: "https://supreme.justia.com/cases/federal/us/545/469/" },
  { title: "Assessing the State Reaction to the Supreme Court's Undermining of Property Rights", outlet: "State Court Report", url: "https://statecourtreport.org/our-work/analysis-opinion/assessing-state-reaction-supreme-courts-undermining-property-rights" },
  { title: "States and Local Jurisdictions with NEPA-like Environmental Planning Requirements", outlet: "Council on Environmental Quality", url: "https://ceq.doe.gov/laws-regulations/states.html" },
  { title: "Missing Middle Housing Study", outlet: "Arlington County, Virginia", url: "https://www.arlingtonva.us/Government/Programs/Housing/Housing-Arlington/Tools/Missing-Middle" },
  { title: "National Zoning Atlas Analysis", outlet: "National Zoning Atlas", url: "https://www.zoningatlas.org/analysis" },
  { title: "RHNA Regional Housing Needs Allocation", outlet: "Association of Bay Area Governments", url: "https://abag.ca.gov/our-work/housing/rhna-regional-housing-needs-allocation" },
];

export function LandUseChapter() {
  return (
    <>
      <AtAGlance
        stats={[
          { value: "77.8%", label: "CA land zoned single-family" },
          { value: "32.1%", label: "Regulation share of dev costs" },
          { value: "45", label: "States reformed eminent domain" },
        ]}
        finding="Zoning determines what gets built, who can afford to live where, and why your commute takes as long as it does."
      />

      <section className="lg-chapter-body">
        <div className="lg-prose-container">
          <FadeIn>
            <p className="lg-prose-paragraph">
              No function of local government generates more fury, more litigation, or more yard signs
              than land use. Zoning determines whether a neighborhood gets a four-story apartment
              building or stays as single-family ranches. It decides if a coffee shop can open on a
              corner, whether a homeowner can build a backyard cottage, and how tall a downtown office
              tower can rise. Property owners treat zoning changes as existential threats to their
              wealth. Developers treat the permitting process as an expensive obstacle course. Elected
              officials know that a single unpopular rezoning can end a career faster than any tax
              increase.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">The Constitutional Foundation</h2>
          </FadeIn>

          <FadeIn delay={0.05}>
            <p className="lg-prose-paragraph">
              The Supreme Court blessed this power in
              1926. In{" "}
              <a href="https://www.oyez.org/cases/1900-1940/272us365" target="_blank" rel="noopener noreferrer">
                <em>Village of Euclid v. Ambler Realty Co.</em>
              </a>, the Court held 6-3 that a Cleveland suburb&rsquo;s zoning ordinance — which
              divided the village into residential, commercial, and industrial districts — was a valid
              exercise of the police power, not an unconstitutional taking. Ambler Realty had argued
              that the restrictions reduced its 68-acre parcel&rsquo;s value from $10,000 per acre
              (industrial) to $2,500 (residential). The Court was unmoved. Justice Sutherland wrote
              that the segregation of uses bore a &ldquo;rational relation&rdquo; to public health,
              safety, and welfare. With that, &ldquo;Euclidean zoning&rdquo; became the template for
              virtually every American city. Houston, which has{" "}
              <a href="https://www.houstonlanding.org/no-zoning-in-houston-provides-flexibility-complications-experts-say-why-does-it-matter/" target="_blank" rel="noopener noreferrer">
                rejected zoning three times
              </a>{" "}
              by popular vote — most recently in 1993 — remains the lone major holdout, though even
              Houston regulates development through setback requirements, parking minimums, and private
              deed restrictions that function as a shadow zoning code covering roughly{" "}
              <a href="https://kinder.rice.edu/urbanedge/houston-doesnt-have-zoning-there-are-workarounds" target="_blank" rel="noopener noreferrer">
                25% of the city
              </a>.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">The General Plan</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Before a city can zone, it
              must plan. California requires every city and county to adopt a general plan containing{" "}
              <a href="https://lci.ca.gov/docs/OPR_C4_final.pdf" target="_blank" rel="noopener noreferrer">
                nine mandatory elements
              </a>: land use, circulation, housing, conservation, open space, noise, safety,
              environmental justice, and air quality. Courts have called the general plan the
              &ldquo;constitution for future development&rdquo; — all zoning ordinances, subdivision
              approvals, and capital improvements must be consistent with it. Other states use the term
              &ldquo;comprehensive plan&rdquo; and require fewer elements, but the principle is
              universal: the plan states the vision; the zoning code implements it. When Palo Alto
              adopted its Comprehensive Plan, it was not writing a wish list. It was establishing the
              legal framework against which every future development application would be measured.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">The Zoning Code</h2>
          </FadeIn>

          <FadeIn delay={0.05}>
            <p className="lg-prose-paragraph">
              A zoning map divides the city into
              districts — R-1 (single-family residential), R-2 (two-family), C-1 (neighborhood
              commercial), M-1 (light industrial), and dozens of variations. Each district prescribes
              what can be built and how: permitted uses, conditional uses requiring a special hearing,
              maximum building height, floor area ratio (FAR), minimum lot size, setback distances from
              property lines, and parking requirements. The cumulative effect is staggering. Across{" "}
              <a href="https://belonging.berkeley.edu/single-family-zoning-california-statewide-analysis" target="_blank" rel="noopener noreferrer">
                519 California jurisdictions
              </a>, 77.8% of residential land is zoned exclusively for single-family homes. In
              Nashville,{" "}
              <a href="https://www.urban.org/research/publication/moving-toward-transit-oriented-development-nashville" target="_blank" rel="noopener noreferrer">
                that figure exceeds 90%
              </a>. In Connecticut, the{" "}
              <a href="https://www.zoningatlas.org/analysis" target="_blank" rel="noopener noreferrer">
                National Zoning Atlas
              </a>{" "}
              found that 90.6% of developable land permits single-family homes as-of-right, while just
              2.2% permits buildings with four or more units. The legacy is inseparable from racial
              exclusion: after the Supreme Court struck down explicitly racial zoning in{" "}
              <em>Buchanan v. Warley</em> (1917), single-family zoning became the instrument of choice
              for maintaining segregation by economic proxy. UC Berkeley researchers found that
              California cities zoned above 96% single-family are{" "}
              <a href="https://belonging.berkeley.edu/single-family-zoning-california-statewide-analysis" target="_blank" rel="noopener noreferrer">
                nearly 55% white
              </a>, in a state that is only 35% white overall.
            </p>
          </FadeIn>

          <FadeIn>
            <StatBar
              title="Share of Residential Land Zoned Single-Family"
              subtitle="Source: UC Berkeley, National Zoning Atlas"
              items={[
                { label: "Connecticut", value: 90.6, displayValue: "90.6%" },
                { label: "Nashville", value: 90, displayValue: ">90%" },
                { label: "California", value: 77.8, displayValue: "77.8%", highlight: true },
                { label: "Minneapolis", value: 0, displayValue: "0% (abolished 2019)" },
              ]}
            />
          </FadeIn>

          <FadeIn>
            <CalloutBox variant="why-matters" title="Zoning is the reason your city looks the way it does">
              The housing shortage, the length of your commute, the racial composition of your
              neighborhood, the presence or absence of a corner store within walking distance — all
              are downstream consequences of zoning decisions, most of them made decades ago by
              planning commissions operating in near-total obscurity. When states override local
              zoning to permit duplexes or fourplexes, they are acknowledging that the cumulative
              effect of thousands of local decisions has produced a national crisis in housing supply
              and affordability.
            </CalloutBox>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h2 className="lg-prose-heading">The Permitting Gauntlet</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Getting a project approved means navigating a
              process that ranges from straightforward to Kafkaesque. A project that complies with all
              zoning standards is entitled to &ldquo;<a href="/articles/how-local-government-works/glossary#by-right-development">by-right</a>&rdquo; or ministerial approval: staff
              checks the boxes, issues the permit, no public hearing required. Research from Los
              Angeles found that by-right projects are{" "}
              <a href="https://www.tandfonline.com/doi/full/10.1080/01944363.2022.2106291" target="_blank" rel="noopener noreferrer">
                permitted 28% faster
              </a>{" "}
              than discretionary ones, yet between 2014 and 2016,{" "}
              <a href="https://www.housingaffordabilityinstitute.org/discretionary-reviews/" target="_blank" rel="noopener noreferrer">
                only 6% of homes
              </a>{" "}
              in LA projects of five or more units were approved by-right. Any project requesting a
              deviation — a zone change, a conditional use permit, a <a href="/articles/how-local-government-works/glossary#variance">variance</a>, additional height —
              enters the discretionary process: pre-application conference, staff review, environmental
              analysis, planning commission hearing, public notice, and potentially a city council
              appeal. Median permitting for large multifamily projects runs{" "}
              <a href="https://bidenwhitehouse.archives.gov/cea/written-materials/2024/08/13/reforming-permitting-requirements-to-lower-the-cost-of-building-new-housing-and-increase-housing-affordability/" target="_blank" rel="noopener noreferrer">
                33 months in San Francisco and 30 months in New York
              </a>. The{" "}
              <a href="https://www.nmhc.org/contentassets/60365effa073432a8a168619e0f30895/nmhc-nahb-cost-of-regulations.pdf" target="_blank" rel="noopener noreferrer">
                NMHC and NAHB estimate
              </a>{" "}
              that regulation accounts for 32.1% of multifamily development costs. Palo Alto&rsquo;s
              &ldquo;planned home zoning&rdquo; requires at minimum two Planning and Transportation
              Commission hearings and Architectural Review Board vetting — a sequence neighborhood
              watchdogs have derided as{" "}
              <a href="https://www.paloaltoonline.com/housing/2024/05/02/divisive-zoning-tool-makes-a-comeback-in-palo-alto/" target="_blank" rel="noopener noreferrer">
                &ldquo;zoning for sale&rdquo;
              </a>.
            </p>
          </FadeIn>

          <FadeIn>
            <PullQuote
              text="Pfizer left New London in 2009. The condemned land sat vacant for nearly two decades, home to feral cats and weeds, after the city spent more than $80 million."
              city="New London"
              state="CT"
              className="lg-pull-quote"
            />
          </FadeIn>

          <FadeIn>
            <CalloutBox variant="misconception" title={`"The Planning Commission makes the final decision"`}>
              In most cities, the planning commission is an advisory body. It recommends; the city
              council decides. Only on certain delegated actions — subdivision maps, some conditional
              use permits — does the commission have final authority, and even then the council can
              typically &ldquo;call up&rdquo; the item for its own review. The real power sits with
              elected officials who appoint the commissioners.
            </CalloutBox>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h2 className="lg-prose-heading">Environmental Review</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              California&rsquo;s Environmental
              Quality Act (<a href="/articles/how-local-government-works/glossary#ceqa">CEQA</a>) requires an environmental analysis for any discretionary government
              action that may have a significant effect. A full Environmental Impact Report takes{" "}
              <a href="https://strompermit.com/ceqa-eir-process-management/" target="_blank" rel="noopener noreferrer">
                6 to 12 months
              </a>{" "}
              and carries a 45- to 60-day public comment period. The federal NEPA equivalent averages{" "}
              <a href="https://ceq.doe.gov/nepa-practice/eis-timelines.html" target="_blank" rel="noopener noreferrer">
                4.5 years
              </a>. Only{" "}
              <a href="https://ceq.doe.gov/laws-regulations/states.html" target="_blank" rel="noopener noreferrer">
                five states
              </a>{" "}
              — California, Georgia, Minnesota, New York, and Washington — require environmental
              review at the local level. For the vast majority of local development nationwide, there
              is no state-level environmental review at all.
            </p>
          </FadeIn>

          <FadeIn>
            <CalloutBox variant="state-variation" title="From CEQA to nothing: the environmental review spectrum">
              California subjects virtually every discretionary local action to CEQA review, creating
              a process that can add 6-12 months and generate litigation from both developers and
              opponents. Texas has no statewide zoning enabling act and no state environmental review
              for local projects. Only five states require environmental review at the local level. The
              result: identical apartment buildings proposed in San Jose and Houston face wildly
              different regulatory timelines — a divergence that directly affects where housing gets
              built, how much it costs, and how long residents wait.
            </CalloutBox>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h2 className="lg-prose-heading">Variances and Exceptions</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              When strict application of the
              zoning code would create undue hardship, property owners seek a variance from the Board
              of Zoning Appeals. The legal standard is demanding: the hardship must arise from the
              property&rsquo;s{" "}
              <a href="https://canons.sog.unc.edu/2014/05/variance-standards-what-is-hardship-and-when-is-it-unnecessary/" target="_blank" rel="noopener noreferrer">
                unique physical characteristics
              </a>, not the owner&rsquo;s desire for greater profit; it must not be self-created; the
              variance must be the minimum necessary. Conditional use permits allow uses compatible
              with a zone but requiring site-specific conditions — a church in a residential district,
              a drive-through near a school. Both mechanisms acknowledge that no code anticipates every
              situation, but both are vulnerable to abuse when boards grant relief without enforcing
              the legal standards.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">The Housing Mandate Revolution</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              California&rsquo;s Regional Housing
              Needs Allocation (RHNA) assigns housing production targets to every city and county.
              The{" "}
              <a href="https://abag.ca.gov/our-work/housing/rhna-regional-housing-needs-allocation" target="_blank" rel="noopener noreferrer">
                2023-2031 cycle allocated 441,176 units
              </a>{" "}
              to the Bay Area alone; Palo Alto&rsquo;s share is{" "}
              <a href="https://paloaltohousingelement.com/" target="_blank" rel="noopener noreferrer">
                6,086 units
              </a>, including 2,452 for low-income households. Cities that fail to adopt a compliant
              housing element face the Builder&rsquo;s Remedy, which allows developers to bypass local
              zoning if they include affordable units. SB 9 (2021) made duplexes and lot splits
              ministerial on single-family lots statewide, though uptake has been modest:{" "}
              <a href="https://ternercenter.berkeley.edu/research-and-policy/sb-9-turns-one-applications/" target="_blank" rel="noopener noreferrer">
                Los Angeles received 211 applications in SB 9&rsquo;s first year; San Diego got seven
              </a>. ADUs have been the real success story — California permitting{" "}
              <a href="https://www.mercatus.org/research/policy-briefs/taxonomy-state-accessory-dwelling-unit-laws-2025" target="_blank" rel="noopener noreferrer">
                over 22,000 in 2022, up from 1,300 in 2017
              </a>. The preemption wave has gone national. Oregon legalized duplexes in cities over
              10,000 in 2019. Montana&rsquo;s 2023{" "}
              <a href="https://stateline.org/2024/09/16/the-yimby-push-for-multifamily-housing-hits-a-nope-from-homeowners/" target="_blank" rel="noopener noreferrer">
                &ldquo;Montana Miracle&rdquo;
              </a>{" "}
              mandated duplexes in cities above 5,000. Arlington, Virginia,{" "}
              <a href="https://www.arlingtonva.us/Government/Programs/Housing/Housing-Arlington/Tools/Missing-Middle" target="_blank" rel="noopener noreferrer">
                voted unanimously to allow up to six-unit buildings
              </a>{" "}
              in single-family zones — then watched a court strike the ordinance before the Virginia
              Court of Appeals reinstated it. In Bozeman, Montana, where the{" "}
              <a href="https://mountainjournal.org/bozeman-a-city-touted-as-icon-of-american-prosperity-has-deep-affordable-housing-crisis/" target="_blank" rel="noopener noreferrer">
                median home price hit $711,000
              </a>{" "}
              and more than half of residential land is restricted to single-family homes, a group
              called Montanans Against Irresponsible Densification challenged the state reforms.
              The Montana Supreme Court{" "}
              <a href="https://www.bozemandailychronicle.com/news/montana-supreme-court-rules-against-bozeman-group-on-housing-reform/article_9269c53b-fb1a-40ed-972f-5f077c11fa33.html" target="_blank" rel="noopener noreferrer">
                upheld the laws
              </a>.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h2 className="lg-prose-heading">Eminent Domain</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The power to take private property
              for public use — with just compensation — is the ultimate land use authority. In{" "}
              <a href="https://supreme.justia.com/cases/federal/us/545/469/" target="_blank" rel="noopener noreferrer">
                <em>Kelo v. City of New London</em>
              </a>{" "}
              (2005), the Supreme Court held 5-4 that economic development qualified as &ldquo;public
              use,&rdquo; permitting the city to condemn Susette Kelo&rsquo;s home for a
              Pfizer-anchored redevelopment. The backlash was bipartisan and volcanic: over 80% of
              Americans disapproved, and{" "}
              <a href="https://statecourtreport.org/our-work/analysis-opinion/assessing-state-reaction-supreme-courts-undermining-property-rights" target="_blank" rel="noopener noreferrer">
                45 states enacted <a href="/articles/how-local-government-works/glossary#eminent-domain">eminent domain</a> reform laws
              </a>{" "}
              — the most widespread legislative response to a Supreme Court decision in American
              history. The irony proved exquisite. Pfizer left New London in 2009. The condemned land{" "}
              <a href="https://www.nationalreview.com/2014/02/nine-years-after-kelo-seized-land-empty-alec-torres/" target="_blank" rel="noopener noreferrer">
                sat vacant for nearly two decades
              </a>, home to feral cats and weeds, after the city spent more than $80 million. In
              2024, the city council approved{" "}
              <a href="https://reason.com/volokh/2024/09/25/new-london-gives-6-5-million-in-tax-breaks-to-developer-planning-to-build-housing-on-land-condemned-in-the-kelo-case/" target="_blank" rel="noopener noreferrer">
                $6.5 million in tax breaks
              </a>{" "}
              for a developer to finally build apartments on the site where Kelo&rsquo;s little pink
              house once stood.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">Code Enforcement</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Most zoning enforcement is reactive —{" "}
              <a href="https://mrsc.org/explore-topics/code-enforcement/enforcement/code-enforcement" target="_blank" rel="noopener noreferrer">
                complaint-driven rather than proactive
              </a>. A neighbor calls about an unpermitted fence; an inspector investigates. The process
              runs from written complaint to site visit to notice of violation to compliance deadline
              to, if necessary, citation or court action. The dirty secret is that code enforcement
              frequently becomes a weapon in neighbor disputes, with complaints filed not out of
              genuine concern for community standards but out of personal grievance. Many local
              governments simply lack the funding to do anything else — courts have recognized that
              governments do not have sufficient resources to proactively seek out all violations.
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
