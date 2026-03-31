"use client";

import { CalloutBox } from "@/components/civic-guide/CalloutBox";
import { PullQuote } from "@/components/article/PullQuote";
import { AtAGlance } from "@/components/article/AtAGlance";
import { SourcesCitations } from "@/components/article/SourcesCitations";
import { KeyFact } from "@/components/civic-guide/KeyFact";
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
  { title: "2025 ASCE Infrastructure Report Card", outlet: "ASCE/Gordian", url: "https://www.gordian.com/resources/asce-report-card/" },
  { title: "The U.S. Has Over 700,000 Miles of Public Sewers", outlet: "Municipal Sewer & Water Magazine", url: "https://www.mswmag.com/bytes/2025/01/the-u-s-has-over-700-000-miles-of-public-sewers" },
  { title: "Water Main Break Rates in the USA and Canada: A Comprehensive Study", outlet: "Westlake Pipe & Fittings", url: "https://www.westlakepipe.com/sites/default/files/2024-05/water-main-break-rates-in-the-usa-and-canada-a-comprehensive-study.pdf" },
  { title: "Biden-Harris Administration Issues Final Rule Requiring Replacement of Lead Pipes Within 10 Years", outlet: "U.S. EPA", url: "https://www.epa.gov/newsreleases/biden-harris-administration-issues-final-rule-requiring-replacement-lead-pipes-within" },
  { title: "Flint Completes Lead Pipe Replacement 11 Years After Beginning of Water Crisis", outlet: "Michigan Advance", url: "https://michiganadvance.com/2025/07/02/flint-completes-lead-pipe-replacement-11-years-after-beginning-of-water-crisis/" },
  { title: "Census Bureau Releases 2022 Census of Governments: Organization Data", outlet: "U.S. Census Bureau", url: "https://www.census.gov/newsroom/press-releases/2023/census-of-governments.html" },
  { title: "Bridge Infrastructure Problems in the U.S.", outlet: "ASCE Infrastructure Report Card", url: "https://infrastructurereportcard.org/cat-item/bridges-infrastructure/" },
  { title: "AAA: Potholes Pack a Punch as Drivers Pay $26.5 Billion", outlet: "AAA Newsroom", url: "https://newsroom.aaa.com/2022/03/aaa-potholes-pack-a-punch-as-drivers-pay-26-5-billion-in-related-vehicle-repairs/" },
  { title: "The 2025 GT100: Our 10th Annual List of Who's Who in Gov Tech", outlet: "Government Technology", url: "https://www.govtech.com/biz/the-2025-gt100-our-10th-annual-list-of-whos-who-in-gov-tech" },
  { title: "Janus Had a Large Impact on Union Membership, Five Years Later", outlet: "Mackinac Center", url: "https://www.mackinac.org/blog/2023/janus-had-a-large-impact-on-union-membership-five-years-later" },
  { title: "Fare Recovery Ratio: What It Is and Why It Must Be Reformed", outlet: "Regional Transportation Authority (Chicago)", url: "https://www.rtachicago.org/blog/2023/01/05/fare-recovery-ratio-what-it-is-and-why-it-must-be-reformed/" },
  { title: "Interlocal Cooperation Basics", outlet: "MRSC (WA)", url: "https://mrsc.org/explore-topics/government-organization/interlocal/interlocal-cooperation-basics" },
];

export function InfrastructureChapter() {
  return (
    <>
      <AtAGlance
        stats={[
          { value: "$3.7T", label: "Infrastructure investment gap" },
          { value: "2.2M mi", label: "Of underground water mains" },
          { value: "39,555", label: "Special-purpose districts" },
        ]}
        finding="Deferred maintenance on water systems is not a savings; it is a loan taken against public health, repaid at usurious rates."
      />

      <section className="lg-chapter-body">
        <div className="lg-prose-container">
          <FadeIn>
            <p className="lg-prose-paragraph">
              Beneath every American city lies a hidden civilization of pipes, wires, and pavement that
              its residents take for granted until the moment it fails. The numbers are staggering:{" "}
              <a href="https://www.westlakepipe.com/sites/default/files/2024-05/water-main-break-rates-in-the-usa-and-canada-a-comprehensive-study.pdf" target="_blank" rel="noopener noreferrer">
                2.2 million miles
              </a>{" "}
              of water mains,{" "}
              <a href="https://www.mswmag.com/bytes/2025/01/the-u-s-has-over-700-000-miles-of-public-sewers" target="_blank" rel="noopener noreferrer">
                800,000 miles
              </a>{" "}
              of public sewers,{" "}
              <a href="https://www.bts.gov/content/public-road-and-street-mileage-united-states-type-surfacea" target="_blank" rel="noopener noreferrer">
                4.2 million miles
              </a>{" "}
              of public roads, and over{" "}
              <a href="https://infrastructurereportcard.org/cat-item/bridges-infrastructure/" target="_blank" rel="noopener noreferrer">
                617,000 bridges
              </a>. The American Society of Civil Engineers gave the nation&rsquo;s infrastructure a{" "}
              <a href="https://www.gordian.com/resources/asce-report-card/" target="_blank" rel="noopener noreferrer">
                C grade in 2025
              </a>{" "}
              — up from C- in 2021, but still a mediocre mark that conceals a{" "}
              <a href="https://www.gordian.com/resources/asce-report-card/" target="_blank" rel="noopener noreferrer">
                $3.7 trillion gap
              </a>{" "}
              between current funding levels and what is needed over the next decade to achieve a state
              of good repair. Stormwater and transit scored the lowest, at D. For the first time since
              1998, no category received a D-.
            </p>
          </FadeIn>

          <FadeIn>
            <KeyFact value="$3.7T" description="The gap between current infrastructure funding and what is needed over the next decade." />
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">Water Infrastructure</h2>
          </FadeIn>

          <FadeIn delay={0.05}>
            <p className="lg-prose-paragraph">
              Water infrastructure is the most consequential and least visible. One-third of
              America&rsquo;s water mains are over 50 years old. A water main breaks{" "}
              <a href="https://www.westlakepipe.com/sites/default/files/2024-05/water-main-break-rates-in-the-usa-and-canada-a-comprehensive-study.pdf" target="_blank" rel="noopener noreferrer">
                every two minutes
              </a>, losing roughly six billion gallons of treated water daily — enough to fill 9,000
              Olympic swimming pools. The EPA estimates that up to{" "}
              <a href="https://www.epa.gov/newsreleases/biden-harris-administration-issues-final-rule-requiring-replacement-lead-pipes-within" target="_blank" rel="noopener noreferrer">
                9 million homes
              </a>{" "}
              are still served by legacy lead pipes, disproportionately concentrated in older,
              lower-income neighborhoods. In October 2024, the Biden administration finalized the Lead
              and Copper Rule Improvements, mandating that water systems identify and replace all lead
              service lines within ten years, backed by{" "}
              <a href="https://www.epa.gov/ground-water-and-drinking-water/lead-and-copper-rule-improvements" target="_blank" rel="noopener noreferrer">
                $15 billion
              </a>{" "}
              in dedicated Bipartisan Infrastructure Law funding.
            </p>
          </FadeIn>

          <FadeIn>
            <StatBar
              title="ASCE Infrastructure Grades, 2025"
              subtitle="Source: American Society of Civil Engineers"
              items={[
                { label: "Bridges", value: 67, displayValue: "C" },
                { label: "Roads", value: 67, displayValue: "C" },
                { label: "Drinking Water", value: 63, displayValue: "C-" },
                { label: "Transit", value: 60, displayValue: "D", highlight: true },
                { label: "Stormwater", value: 60, displayValue: "D", highlight: true },
              ]}
            />
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The Flint, Michigan water crisis remains the defining cautionary tale. In April 2014, the
              city — under state-appointed emergency management — switched its water source from the
              Detroit system to the Flint River to save money. Officials failed to apply
              corrosion-control treatment. Lead leached from aging pipes into the drinking water of
              100,000 residents. The consequences unfolded over years: elevated blood-lead levels in
              children, a Legionnaires&rsquo; disease outbreak that killed at least 12 people, and a{" "}
              <a href="https://www.nrdc.org/stories/flint-water-crisis-everything-you-need-know" target="_blank" rel="noopener noreferrer">
                $600 million settlement
              </a>{" "}
              from the state of Michigan to affected residents. Flint{" "}
              <a href="https://www.washingtonpost.com/climate-environment/2025/07/01/flint-lead-pipes-replacement/" target="_blank" rel="noopener noreferrer">
                replaced its last lead pipe
              </a>{" "}
              on July 1, 2025 — eleven years after the crisis began — at a total cost exceeding{" "}
              <a href="https://www.michiganpublic.org/environment-climate-change/2025-06-02/a-hard-fought-milestone-for-flints-water-but-uncertainty-ahead" target="_blank" rel="noopener noreferrer">
                $400 million
              </a>{" "}
              in state and federal spending. The lesson is brutal and clear: deferred maintenance on
              water systems is not a savings; it is a loan taken against public health, repaid at
              usurious rates.
            </p>
          </FadeIn>

          <FadeIn>
            <PullQuote
              text="Deferred maintenance on water systems is not a savings; it is a loan taken against public health, repaid at usurious rates."
              city="Flint"
              state="MI"
              className="lg-pull-quote"
            />
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Water and sewer utilities are typically organized as <a href="/articles/how-local-government-works/glossary#enterprise-fund">enterprise fund</a>s, meaning they must
              cover their costs through user rates rather than general tax revenue. Rate-setting is a
              political high-wire act. The{" "}
              <a href="https://www.epa.gov/waterfinancecenter/water-affordability-resources-utilities" target="_blank" rel="noopener noreferrer">
                EPA
              </a>{" "}
              documents widespread affordability challenges, with monthly water and sewer bills varying
              wildly — from $23 to over $100 — even within the same metropolitan area. Many utilities
              use tiered &ldquo;lifeline&rdquo; rates that charge less for basic consumption and more
              for heavy use, but the underlying cost structure is relentless: aging pipes demand
              replacement, federal mandates demand compliance, and ratepayers demand that the tap keeps
              flowing.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <CalloutBox variant="misconception" title="Your City Does Not Maintain &ldquo;the Roads&rdquo;">
              Most people assume their city government is responsible for every road they drive on. In
              reality, cities maintain only local streets. Arterials and collectors may belong to the
              county. State highways running through town are maintained by the state DOT. The
              Interstate is federal. A single five-mile commute can cross infrastructure maintained by
              three different levels of government — and voters blame the mayor for all of it.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">Road Maintenance</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Roads present a different arithmetic. Of the nation&rsquo;s 4.2 million miles of public
              roads, 74% lie in rural areas and only about 1% belong to the Interstate Highway System.
              Local governments own and maintain the vast majority of road-miles, but receive a
              fraction of the fuel-tax revenue that funds state and federal highways. The result is
              visible on every commute:{" "}
              <a href="https://infrastructurereportcard.org/cat-item/bridges-infrastructure/" target="_blank" rel="noopener noreferrer">
                46,000 bridges
              </a>{" "}
              are structurally deficient, and American drivers paid{" "}
              <a href="https://newsroom.aaa.com/2022/03/aaa-potholes-pack-a-punch-as-drivers-pay-26-5-billion-in-related-vehicle-repairs/" target="_blank" rel="noopener noreferrer">
                $26.5 billion
              </a>{" "}
              in pothole-related vehicle repairs in 2021 alone — a hidden tax on deferred road
              maintenance. The per-pothole repair cost ranges from $100 to $400, but delaying a $5,000
              overlay for a block of street can produce $50,000 in full-reconstruction costs a decade
              later. Preventive maintenance is, dollar for dollar, the most cost-effective investment a
              city can make. It is also the easiest to postpone.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">Public Transit</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Transit compounds the challenge. Farebox revenue covers, on average, just{" "}
              <a href="https://www.rtachicago.org/blog/2023/01/05/fare-recovery-ratio-what-it-is-and-why-it-must-be-reformed/" target="_blank" rel="noopener noreferrer">
                36% of operating costs
              </a>{" "}
              for the 50 largest U.S. transit agencies, with the remainder drawn from sales taxes,
              federal grants, and state subsidies. Austin&rsquo;s Capital Metro recovers just 9% from
              fares; Washington, D.C.&rsquo;s Metro recovers over 60%. Transit authorities are
              typically organized as regional special districts or joint-powers agencies, governed by
              boards appointed by multiple jurisdictions — a structure that diffuses accountability and
              complicates funding.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <CalloutBox variant="did-you-know" title="There Are More Special Districts Than Cities in America">
              The 2022 Census counted 39,555 special-purpose districts — more than the 35,705
              municipalities and townships combined. These single-purpose governments levy taxes, issue
              bonds, and employ staff, yet most voters cannot name a single one. The largest category
              is fire protection. The most obscure include mosquito abatement districts, levee
              districts, and cemetery districts.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">Special Districts</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              <a href="/articles/how-local-government-works/glossary#special-district">Special districts</a> are the quiet workhorses of American local government. The 2022 Census
              counted{" "}
              <a href="https://www.census.gov/newsroom/press-releases/2023/census-of-governments.html" target="_blank" rel="noopener noreferrer">
                39,555
              </a>{" "}
              of them — more than counties, cities, and school districts combined. They run water
              systems, fight fires, control mosquitoes, maintain levees, and operate transit networks.
              California alone has hundreds, ranging from the massive Metropolitan Water District of
              Southern California to the San Mateo County Mosquito and Vector Control District,{" "}
              <a href="https://www.smcmvcd.org/district-history" target="_blank" rel="noopener noreferrer">
                founded in 1916
              </a>. Fire protection districts are the single largest category. Most special districts
              have independent taxing authority, elected boards (often in low-turnout elections), and
              operate with minimal public scrutiny — a combination that provides operational flexibility
              but raises accountability concerns.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">Digital Infrastructure</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The digital infrastructure of local government is equally invisible and equally
              consequential. When a city publishes an agenda, posts meeting minutes, or accepts a
              permit application online, it almost certainly uses software from one of a handful of
              vendors.{" "}
              <a href="https://granicus.com/" target="_blank" rel="noopener noreferrer">
                Granicus
              </a>{" "}
              serves over 6,500 government agencies.{" "}
              <a href="https://tripepismith.com/insights/civicplus-vs-granicus/" target="_blank" rel="noopener noreferrer">
                CivicPlus
              </a>{" "}
              provides websites, agenda management, and emergency notifications.{" "}
              <a href="https://pestel-analysis.com/blogs/competitors/tylertech" target="_blank" rel="noopener noreferrer">
                Tyler Technologies
              </a>{" "}
              dominates financial management and public safety software.{" "}
              <a href="https://canvasbusinessmodel.com/blogs/growth-strategy/opengov-growth-strategy" target="_blank" rel="noopener noreferrer">
                OpenGov
              </a>{" "}
              handles budgeting and procurement. The gov-tech industry now has roughly{" "}
              <a href="https://www.govtech.com/biz/the-2025-gt100-our-10th-annual-list-of-whos-who-in-gov-tech" target="_blank" rel="noopener noreferrer">
                10 platform consolidators
              </a>{" "}
              each exceeding $100 million in annual revenue, and consolidation accelerates every year.
              A citizen&rsquo;s ability to participate in local government — to find an agenda, read a
              <a href="/articles/how-local-government-works/glossary#staff-report">staff report</a>, submit public comment — depends on commercial software decisions made by a
              procurement office they have never heard of.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <CalloutBox variant="why-matters" title="The Staff Report Is Where the Real Decision Gets Made">
              Every agenda item at a planning commission or city council meeting is backed by a staff
              report containing factual findings, legal analysis, and a recommendation. Commissioners
              typically vote in accordance with staff recommendations. Citizens who want to influence a
              land-use decision should read the staff report before the hearing, not show up to speak
              for three minutes without it.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">The Workforce</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Behind every service stands a workforce.{" "}
              <a href="https://en.wikipedia.org/wiki/American_Federation_of_State,_County_and_Municipal_Employees" target="_blank" rel="noopener noreferrer">
                AFSCME
              </a>{" "}
              represents 1.3 million public-sector workers; SEIU organizes hundreds of thousands more.
              Police and firefighter unions negotiate separately, often wielding outsized leverage
              because public safety is political third rail. The 2018{" "}
              <a href="https://www.mackinac.org/blog/2023/janus-had-a-large-impact-on-union-membership-five-years-later" target="_blank" rel="noopener noreferrer">
                Janus v. AFSCME
              </a>{" "}
              Supreme Court decision eliminated mandatory agency fees for non-union public employees,
              and AFSCME lost over 200,000 members and fee-payers by 2022. Personnel costs — salaries,
              benefits, overtime — consume roughly{" "}
              <a href="https://www.cbpp.org/research/some-basic-facts-on-state-and-local-government-workers" target="_blank" rel="noopener noreferrer">
                55% of local government spending
              </a>. In Houston, police and fire departments projected{" "}
              <a href="https://www.houstonpublicmedia.org/articles/news/city-of-houston/2026/02/03/542493/houston-police-fire-department-overtime-city-budget/" target="_blank" rel="noopener noreferrer">
                $50 million
              </a>{" "}
              in overtime budget overruns for FY2026 alone, driven by chronic understaffing that turns
              overtime from an exception into a staffing strategy.
            </p>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The most important document in local government is the one citizens almost never read:
              the staff report. Prepared by city planners, engineers, and analysts for every item on a
              planning commission or city council agenda, the staff report contains the factual
              findings, legal analysis, conditions of approval, and staff recommendation that form the
              actual basis of the decision. The public hearing is theater; the staff report is the
              script. A citizen who reads the staff report before a meeting understands more about what
              will happen — and why — than one who attends without it.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">Interlocal Agreements</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Interlocal agreements bind this fragmented system together. Through joint powers
              authorities, mutual aid pacts, and shared-services contracts, adjacent jurisdictions{" "}
              <a href="https://mrsc.org/explore-topics/government-organization/interlocal/interlocal-cooperation-basics" target="_blank" rel="noopener noreferrer">
                cooperate
              </a>{" "}
              on everything from animal control to water treatment. Fire departments in neighboring
              cities respond to each other&rsquo;s calls under automatic mutual aid agreements. Small
              towns contract with their county for law enforcement rather than maintaining their own
              police force. These arrangements reduce duplication and achieve economies of scale, but
              they also create webs of dependency that are invisible to the public and sometimes to
              elected officials themselves.
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
