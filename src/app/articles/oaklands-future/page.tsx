"use client";

/**
 * Oakland's Future: Five Scenarios for America's Most Paradoxical City
 *
 * An interactive deep dive into Oakland's fiscal crisis, crime-economy spiral,
 * and policy trade-offs — with a simulation engine that lets readers explore
 * five possible futures.
 *
 * Architecture mirrors the Data Center Gold Rush article:
 * - Unified warm-dark theme throughout
 * - Full-viewport hero with badge, gradient title, SVG illustration, scroll prompt
 * - AtAGlance stats bar after hero
 * - Editorial sections with centered headers, body prose, graphics containers
 * - Scroll-triggered animations via useIntersectionObserver
 * - Conclusion section with big number and gradient bg
 */

import { useState, useEffect } from "react";
import { AtAGlance } from "@/components/article/AtAGlance";
import { MethodologySection } from "@/components/article/MethodologySection";
import { ArticleEndCTA } from "@/components/article/ArticleEndCTA";
import { SourcesCitations } from "@/components/article/SourcesCitations";
import { SubscribeBar } from "@/components/article/SubscribeBar";
import { SocialShare } from "@/components/article/SocialShare";
import { PullQuote } from "@/components/article/PullQuote";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { CrimeChart } from "@/components/viz/oakland/CrimeChart";
import { BudgetBreakdown } from "@/components/viz/oakland/BudgetBreakdown";
import { IndexGauges } from "@/components/viz/oakland/IndexGauge";
import { InteractiveSection } from "@/components/viz/InteractiveSection";
import type { Source } from "@/types/article";

// ============================================================================
// DATA
// ============================================================================

const DATA = {
  summary: {
    population: 437825,
    medianIncome: 94389,
    medianHomeValue: 883800,
    violentCrimeRate: 2716,
    propertyCrimeRate: 7733,
    officerCount: 535,
    officerShortfall: 342,
    structuralDeficit: 360,
    annualBudget: 2.2,
    fundBalance2023: 708,
    fundBalance2024: 22.8,
    councilMeetingsAnalyzed: 134,
    crimeRecords: 1260000,
  },
  indices: {
    education: 36.2,
    safety: 31.2,
    prosperity: 47.4,
    affordability: 54.1,
    composite: 42.2,
  },
};

const SOURCES: Source[] = [
  {
    title: "City of Oakland FY2024-25 Adopted Budget",
    outlet: "City of Oakland Finance Department",
    url: "https://www.oaklandca.gov/topics/city-budget",
  },
  {
    title: "Oakland CrimeWatch Data (2005-2024)",
    outlet: "Oakland Police Department / Socrata Open Data",
    url: "https://data.oaklandca.gov/Public-Safety/CrimeWatch/ppgh-7dqv",
  },
  {
    title: "American Community Survey 5-Year Estimates",
    outlet: "U.S. Census Bureau",
    url: "https://data.census.gov/",
  },
  {
    title: "Oakland Housing Element (2023-2031)",
    outlet: "City of Oakland Planning & Building Department",
    url: "https://www.oaklandca.gov/topics/housing-element",
  },
  {
    title: "Oakland $335M General Obligation Bond Sale (Dec 2025)",
    outlet: "City of Oakland Treasury",
    url: "https://www.oaklandca.gov/",
  },
];

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function OaklandsFuture() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="oakland-article article-page" data-theme="oakland">
      <OaklandHero />

      <AtAGlance
        stats={[
          { value: "$360M", label: "Structural Deficit" },
          { value: "2,716", label: "Violent Crime per 100K" },
          { value: "134", label: "Meetings Analyzed" },
        ]}
        finding="Oakland&rsquo;s violent crime rate is 7x the national average &mdash; yet homicides dropped 30% in 2024, the sharpest single-year decline in decades. The city&rsquo;s paradox in one stat."
      />

      <LedeSection />
      <ParadoxSection />
      <BudgetSection />
      <GovernanceSection />
      <SimulationSection />
      <FindingsSection />
      <ConclusionSection />

      <MethodologySection
        prefix="oakland"
        title="How We Built This Analysis"
        items={[
          {
            label: "Data Sources",
            content:
              "10 federal and local sources: Census ACS, Oakland PD CrimeWatch (1.26M records), City Budget (FY2024-25), BLS, HUD, EPA, FEMA, Legistar, NLP transcript analysis (134 meetings), Census tract boundaries.",
          },
          {
            label: "Simulation Model",
            content:
              "Discrete-time affine dynamical system with budget constraints, diminishing returns, governance friction, and 5 feedback loops. Reviewed by 4 independent domain perspectives (urban economics, public finance, statistical modeling). This is an educational illustration, not a forecasting model.",
          },
          {
            label: "Scoring",
            content:
              "Four quality-of-life indices (0-100) from weighted sub-indicators. Education: 36.2 (low confidence — state-level proxies). Safety: 31.2 (high confidence — city-level crime data). Prosperity: 47.4 (moderate). Affordability: 54.1 (moderate).",
          },
          {
            label: "Limitations",
            content:
              "No migration dynamics, housing market models, or state/federal policy changes. Effect weights are literature-calibrated, not estimated from Oakland-specific data. Unemployment is county-level (Alameda), not city-level. Simulation magnitudes are directional illustrations, not quantitative predictions.",
          },
          {
            label: "Date Range",
            content:
              "Crime data: 2005–2024. Census: ACS 5-year (2022). Budget: FY2024-25 adopted. Council meetings: 2019–2024.",
          },
        ]}
      />

      <SocialShare title="Five Futures for Oakland" />
      <ArticleEndCTA />
      <SourcesCitations sources={SOURCES} />
      <SubscribeBar />
    </main>
  );
}

// ============================================================================
// HERO SECTION
// Full viewport, centered, animated — mirrors DC hero pattern
// ============================================================================

function OaklandHero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / 600);
  const scale = 1 + scrollY / 2000;
  const translateY = scrollY / 3;

  return (
    <header className="oak-hero-epic">
      <div className="oak-hero-bg-layers">
        <div className="oak-hero-bg-grid" style={{ opacity: opacity * 0.3 }} />
        <div className="oak-hero-bg-glow" style={{ transform: `scale(${scale})` }} />
      </div>

      <div className="oak-hero-content-epic" style={{ opacity, transform: `translateY(${translateY}px)` }}>
        <div className="oak-hero-badge-animated">
          <span className="oak-badge-dot" />
          From The District
        </div>

        <h1 className="oak-hero-title-epic">
          <span className="oak-title-line oak-title-line-1">Five Futures for</span>
          <span className="oak-title-line oak-title-line-2">Oakland</span>
        </h1>

        <p className="oak-hero-subtitle-editorial">
          $94,000 median incomes. A $360 million structural deficit. 342 missing
          officers &mdash; and a 30% drop in homicides. Inside America&rsquo;s most
          paradoxical city.
        </p>
      </div>

      <div className="oak-hero-illustration" style={{ opacity: opacity * 0.4, transform: `translateY(${translateY * 0.5}px)` }}>
        <OaklandSkylineSVG />
      </div>

      <div className="oak-scroll-prompt" style={{ opacity }}>
        <div className="oak-scroll-line" />
        <span>Scroll to explore</span>
      </div>
    </header>
  );
}

// ============================================================================
// LEDE SECTION
// Opening narrative with drop cap
// ============================================================================

function LedeSection() {
  return (
    <section className="oak-editorial-section oak-lede-section">
      <div className="article-body-prose">
        <p>
          &ldquo;We need you to plan with us, not for us.&rdquo;
          A representative of Oakland&rsquo;s Chinatown Coalition said it
          during a hearing on the Downtown Oakland Specific Plan &mdash; one
          of 134 council meetings we analyzed. Eleven words that frame every
          policy fight in a city that has spent years arguing about its future
          while grappling with its present.
        </p>
        <p>
          Oakland is a city people love fiercely. It is where the Black Panther
          Party was founded in 1966 and where mutual-aid networks still organize
          faster than city agencies. It is Lake Merritt on a Saturday
          morning &mdash; runners, drummers, quincea&ntilde;era photo shoots
          ringing the water. It is taco trucks on International Boulevard and
          dim sum in a Chinatown that has anchored downtown for more than a
          century. It is First Fridays on Telegraph, when the galleries open
          and the sidewalks fill. It is a port city with perfect weather and a
          skyline view of San Francisco that residents will tell you, with some
          justice, beats the reverse.
        </p>
        <p>
          The reason Oakland&rsquo;s fiscal and safety crises
          matter &mdash; the reason people fight about them in three-hour
          council meetings &mdash; is that the city underneath is worth
          fighting for.
        </p>
      </div>
    </section>
  );
}

// ============================================================================
// THE PARADOX
// Income vs dysfunction, index gauges, pull quote
// ============================================================================

function ParadoxSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section className="oak-editorial-section">
      <div className="article-prose-header">
        <span className="article-section-num">The Paradox</span>
        <h2>A City This Wealthy Shouldn&rsquo;t Be This Broken</h2>
      </div>

      <div className="article-body-prose">
        <p>
          Oakland&rsquo;s median household income is $94,389. That figure
          places it above 93% of American cities &mdash; comfortably
          upper-middle-class by national standards, solidly middle-class by Bay
          Area ones. A household earning the Oakland median can, in theory,
          afford the city&rsquo;s average rent (the rent-to-income ratio sits
          at 23.5%, below the 30% threshold that defines housing burden).
          Median home values are $883,800 &mdash; high, but not San Francisco
          high. Unemployment is 4.5%, roughly in line with the national rate.
        </p>
        <p>
          By these measures, Oakland is a functional, reasonably prosperous
          mid-size city. Its port handles 2.26 million shipping containers a
          year and supports nearly 100,000 jobs. Its civic engagement is among
          the highest in California &mdash; residents show up, testify, and
          fight for the city they want.
        </p>
        <p>
          But by several critical measures &mdash; public safety, fiscal
          health, and basic service delivery &mdash; Oakland is under serious
          strain.
        </p>
      </div>

      <PullQuote
        text="This is not our map."
        attribution="Margaret Gordon, West Oakland Environmental Indicators Project"
        className="oakland-pull-quote"
      />

      <div className="article-body-prose">
        <p>
          The violent crime rate is 2,716 per 100,000 residents &mdash;
          roughly seven times the national average, though the trend is
          improving: the city&rsquo;s Ceasefire violence-prevention program
          and focused deterrence helped cut homicides by more than 30% in
          2024, the sharpest single-year decline in decades. The Oakland
          Police Department fields 535 operational officers against a
          recommended staffing level of 877, and it is losing a net five
          officers per month. The available fund balance peaked at $708
          million in 2023, then fell to $22.8 million by 2024 &mdash; a 97%
          drawdown in a single fiscal year. The structural deficit over a
          two-year budget cycle is $360 million against a $2.2 billion annual
          budget.
        </p>
        <p>
          We scored Oakland across four dimensions &mdash; education, public
          safety, economic prosperity, and housing affordability &mdash; using
          data from ten federal and local sources. Three of the four scores
          fall below the national midline of 50.
        </p>
      </div>

      <div className="oak-graphic" ref={ref}>
        <div style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease" }}>
          <IndexGauges />
        </div>
      </div>

      <div className="article-body-prose">
        <p>
          Safety, at 31.2, is the worst. Education scores 36.2 &mdash;
          shaped by a school district in its own fiscal crisis. Oakland
          Unified operates 87 rated schools with an average quality score of
          4.8 out of 10 and a pupil-teacher ratio of 22.1, both below state
          norms. OUSD has spent years under state fiscal oversight, closing
          schools in underserved neighborhoods to balance its books while the
          city struggles to balance its own. Prosperity lands at
          47.4 &mdash; close to the median but dragged down by the
          crime-economy spiral. The lone score above 50 is affordability, at
          54.1, and even that carries an asterisk: Oakland looks affordable
          only because its neighbor across the bay is San Francisco.
          Relative to the nation, Oakland is expensive. Relative to the Bay
          Area, it is the cheaper option &mdash; which is a different kind
          of problem. Cities whose primary affordability pitch is &ldquo;at
          least we&rsquo;re not them&rdquo; tend to attract residents who
          leave when they can.
        </p>
        <p>
          The question worth asking is not whether Oakland is struggling. It
          is. The question is <em>why</em> a city this wealthy is struggling
          this badly &mdash; and whether the answer is fixable or structural.
        </p>
      </div>
    </section>
  );
}

// ============================================================================
// THE BUDGET
// Crime chart, fund balance, budget breakdown
// ============================================================================

function BudgetSection() {
  const { ref: crimeRef, isVisible: crimeVisible } = useIntersectionObserver({ threshold: 0.2 });
  const { ref: budgetRef, isVisible: budgetVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section className="oak-editorial-section">
      <div className="article-prose-header">
        <span className="article-section-num">The Budget</span>
        <h2>How a $2.2 Billion Budget Hit a Wall</h2>
      </div>

      <div className="article-body-prose">
        <p>
          Start with the money. Oakland collects roughly $2.2 billion per
          year. The backbone is property tax &mdash; $309 million, reliable
          and growing modestly with assessments. Sales tax brings in $64
          million, but that figure has been declining as retail migrates
          online and foot traffic thins in commercial corridors. The real
          estate transfer tax, once a windfall in a hot market, is down 26%.
          In December 2025, the city issued $335 million in general
          obligation bonds &mdash; borrowing against the future to cover the
          present.
        </p>
        <p>
          The deficit is $360 million over a two-year budget cycle. That
          number is structural, meaning it does not close on its own.
          Oakland is unlikely to grow its way out at current revenue
          trajectories, and it cannot cut its way out without gutting the
          services that keep residents and businesses from leaving. This is
          the fiscal trap: every cut risks accelerating the revenue decline
          that caused the cut.
        </p>
        <p>
          Start with the pension overhang. Oakland, like many California
          cities, carries unfunded retirement obligations that consume a
          growing share of annual revenue. Pension costs are contractually
          fixed; they do not shrink when the economy does. Revenue is
          cyclical; pension obligations are not. Over time, the gap between
          what the city collects and what it has already promised to pay
          widens by a few million a year &mdash; until, in a downturn, it
          widens by a few hundred million.
        </p>
        <p>
          Revenue is also structurally capped. California&rsquo;s
          Proposition 13, passed in 1978, limits property taxes to 1% of a
          property&rsquo;s purchase-price assessment, with annual increases
          capped at 2% &mdash; regardless of how fast market values rise.
          Oakland&rsquo;s $309 million in property tax, its largest single
          revenue source, grows steadily but slowly.
        </p>
        <p>
          The second is the crime-economy spiral. Oakland&rsquo;s violent
          crime rate deters business investment, which depresses commercial
          tax revenue, which constrains police staffing, which worsens
          crime. This feedback loop has operated for decades. The current
          iteration is acute: OPD&rsquo;s 342-officer shortfall is the
          widest in at least fifteen years, and the department cannot recruit
          fast enough to close it.
          The departure of the Oakland Athletics after more than fifty years
          at the Coliseum sharpened the signal. The broader
          message &mdash; a professional franchise choosing to
          leave &mdash; reinforced the narrative that Oakland&rsquo;s
          operating environment drives investment away.
        </p>
        <p>
          The third is political. Oakland&rsquo;s council is ideologically
          committed to equity-first governance &mdash; affordable housing,
          violence prevention programs, environmental justice in the
          flatlands. These are defensible priorities. They are also expensive
          ones, and they compete directly with the public-safety spending
          that businesses and moderate residents demand. None of these
          explanations is wrong, and they reinforce each other.
        </p>
      </div>

      <div className="oak-graphic" ref={crimeRef}>
        <div style={{ opacity: crimeVisible ? 1 : 0, transform: crimeVisible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease" }}>
          <CrimeChart />
        </div>
      </div>

      <div className="article-body-prose">
        <p>
          The budget drawdown makes every policy argument a zero-sum fight.
          Oakland&rsquo;s available fund balance peaked at $708 million in
          2023, then fell to $22.8 million by 2024. To put that in
          proportion: the city drew down reserves equivalent to roughly
          $1,566 per resident in a single fiscal year. In December 2025, the
          city issued $335 million in general obligation bonds &mdash; the
          sale was oversubscribed, with $638 million in demand from 26
          firms, a sign that investors still believe in Oakland&rsquo;s
          fundamentals.
        </p>
      </div>

      <div className="oak-graphic">
        <div className="grid grid-cols-2 gap-6">
          <div className="oak-fund-card">
            <div className="oak-card-label">Fund Balance 2023</div>
            <div className="stat-number text-4xl" style={{ color: "var(--sentiment-positive)" }}>
              $708M
            </div>
          </div>
          <div className="oak-fund-card oak-fund-card-negative">
            <div className="oak-card-label">Fund Balance 2024</div>
            <div className="stat-number text-4xl" style={{ color: "var(--sentiment-negative)" }}>
              $23M
            </div>
            <div className="oak-fund-change">&darr; 97% in one year</div>
          </div>
        </div>
      </div>

      <div className="oak-graphic" ref={budgetRef}>
        <div style={{ opacity: budgetVisible ? 1 : 0, transform: budgetVisible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease" }}>
          <BudgetBreakdown />
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// THE GOVERNANCE
// Council meetings, gov cards, policy issues
// ============================================================================

function GovernanceSection() {
  return (
    <section className="oak-editorial-section">
      <div className="article-prose-header">
        <span className="article-section-num">The Governance</span>
        <h2>What 134 Council Meetings Reveal</h2>
      </div>

      <div className="article-body-prose">
        <p>
          We processed transcripts of 134 Oakland City Council meetings
          through an AI analysis pipeline, scoring each for topic frequency,
          speaker sentiment, contentiousness, and policy outcomes. The
          aggregate contentiousness score &mdash; 4.0 out of 10 &mdash;
          masks significant variation. Meetings on housing and policing
          routinely spike above 6.0; meetings on infrastructure and
          administrative items sit below 2.0. The average is moderate. The
          distribution is bimodal.
        </p>
        <p>
          Housing dominates. It appeared as a primary topic in 10 of 13
          closely analyzed sessions. Oakland&rsquo;s Housing Element requires
          26,000 new units by 2031. In the previous cycle, the city
          overproduced market-rate housing by 90% while underproducing
          affordable units. The pattern tells a familiar California story:
          market forces deliver what is profitable, and mandates for
          affordability lag behind &mdash; not because they are ignored, but
          because they are expensive and slow.
        </p>
      </div>

      <div className="oak-graphic">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="oak-card">
            <div className="oak-card-label">Contentiousness</div>
            <div className="oak-card-value">4.0 / 10</div>
            <div className="oak-card-subtext">Moderate average, volatile range</div>
          </div>
          <div className="oak-card">
            <div className="oak-card-label">Civic Engagement</div>
            <div className="oak-card-value">Highly Engaged</div>
            <div className="oak-card-subtext">Strong public comment turnout</div>
          </div>
          <div className="oak-card">
            <div className="oak-card-label">Dominant Issue</div>
            <div className="oak-card-value">Housing</div>
            <div className="oak-card-subtext">10 of 13 sessions</div>
          </div>
        </div>
      </div>

      <div className="oak-graphic">
        <div className="flex flex-col gap-3">
          {[
            { issue: "Housing affordability & displacement", freq: "10/13 meetings", level: 5 },
            { issue: "Homelessness & encampment management", freq: "8/13 meetings", level: 5 },
            { issue: "Environmental justice in flatlands", freq: "7/13 meetings", level: 4 },
            { issue: "Downtown revitalization & specific plan", freq: "6/13 meetings", level: 3 },
            { issue: "Police staffing crisis", freq: "5/13 meetings", level: 4 },
          ].map((p) => (
            <div key={p.issue} className="oak-policy-item">
              <div className={`oak-policy-level ${p.level >= 5 ? "oak-policy-level-high" : p.level >= 4 ? "oak-policy-level-medium" : "oak-policy-level-low"}`}>
                {p.level}
              </div>
              <div className="flex-1">
                <div className="oak-policy-name">{p.issue}</div>
                <div className="oak-policy-freq">{p.freq}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// THE SIMULATION
// Interactive simulation — blends seamlessly on dark theme
// ============================================================================

function SimulationSection() {
  return (
    <section className="oak-editorial-section">
      <div className="article-prose-header">
        <span className="article-section-num">The Simulation</span>
        <h2>Five Futures for Oakland</h2>
      </div>

      <div className="article-body-prose">
        <p>
          Five policy paths. Oakland&rsquo;s 113 census tracts. A decade of
          cascading effects. Each scenario shifts budget allocation across
          education, safety, housing, and economic development. Taller blocks
          on the map mean better outcomes for that neighborhood. Press play
          and watch ten years of trade-offs compound in thirty seconds.
        </p>
      </div>

      <div className="oak-graphic" style={{ maxWidth: 1080 }}>
        <InteractiveSection />
      </div>
    </section>
  );
}

// ============================================================================
// THE FINDINGS
// Four key findings with numbered cards
// ============================================================================

function FindingsSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section className="oak-editorial-section">
      <div className="article-prose-header">
        <span className="article-section-num">The Findings</span>
        <h2>Four Things the Model Makes Clear</h2>
      </div>

      <div className="article-body-prose">
        <p>
          The simulation is a model, not a prophecy. It cannot predict what
          Oakland&rsquo;s council will do, how Sacramento will intervene, or
          whether a single large employer will relocate to or from the city.
          What it can do is clarify the trade-offs &mdash; to show which
          investments produce returns on which timescales, and where the
          constraints bind hardest. Four patterns hold across all five
          scenarios.
        </p>
      </div>

      <div className="oak-graphic" ref={ref}>
        <div className="flex flex-col gap-6" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease" }}>
          <div className="oak-finding-card">
            <div className="oak-finding-number">1</div>
            <div>
              <div className="oak-finding-title">Crime and commerce are the same problem</div>
              <div className="oak-finding-body">
                Oakland&rsquo;s 2,716-per-100K violent crime rate does not exist in isolation. It suppresses commercial investment, which depresses sales tax revenue, which constrains police hiring, which worsens crime. In every scenario, safety improvements produce the fastest economic gains &mdash; and safety declines produce the steepest economic losses. The 342-officer gap at OPD is not just a public safety problem. It is a fiscal one.
              </div>
            </div>
          </div>

          <div className="oak-finding-card">
            <div className="oak-finding-number">2</div>
            <div>
              <div className="oak-finding-title">Housing moves slowly, no matter who is in charge</div>
              <div className="oak-finding-body">
                Oakland&rsquo;s Housing Element demands 26,000 units by 2031. Even the most aggressive scenario in our model takes two to three years to produce units &mdash; permitting, environmental review, construction timelines are stubborn facts. In the simulation, housing carries 35% more governance friction than any other policy lever.
              </div>
            </div>
          </div>

          <div className="oak-finding-card">
            <div className="oak-finding-number">3</div>
            <div>
              <div className="oak-finding-title">There is no surplus to allocate</div>
              <div className="oak-finding-body">
                A $360M structural deficit means every dollar spent on one priority is a dollar not spent on another. The balanced scenario &mdash; modest investment across all four dimensions &mdash; produces incremental improvement everywhere and transformation nowhere. Oakland cannot simultaneously close the officer gap, fund affordable housing, increase school budgets, and offer business incentives. It has to choose.
              </div>
            </div>
          </div>

          <div className="oak-finding-card">
            <div className="oak-finding-number">4</div>
            <div>
              <div className="oak-finding-title">Austerity is self-defeating</div>
              <div className="oak-finding-body">
                The austerity scenario produces the outcome fiscal hawks fear most: lower investment leads to worse outcomes, which drives residents and businesses out, which shrinks the revenue base, which forces deeper cuts. Safety collapses to 6. The only index that &ldquo;improves&rdquo; is affordability &mdash; because economic decline slows price growth. That is not affordability. It is decline priced in.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="article-body-prose">
        <p>
          Oakland&rsquo;s paradox &mdash; wealth and dysfunction, ambition and
          insolvency &mdash; is not a riddle. It is a compounding-interest
          problem. Small structural deficits, deferred over years, become
          large ones. Modest police attrition, ignored for a decade, becomes a
          342-officer gap. A housing target set in Sacramento, met with
          political resistance in Oakland, becomes a 26,000-unit backlog.
        </p>
        <p>
          The data does not tell Oakland what to do. It tells Oakland what it
          is choosing between &mdash; and what each choice costs.
        </p>
      </div>
    </section>
  );
}

// ============================================================================
// CONCLUSION
// Big number + gradient bg + fade-in
// ============================================================================

function ConclusionSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.3 });

  return (
    <section ref={ref} className="oak-conclusion-section">
      <div className={`oak-conclusion-content ${isVisible ? "visible" : ""}`}>
        <span className="oak-big-number">42.2</span>
        <span className="oak-big-label">Composite Quality-of-Life Score</span>

        <div className="article-body-prose" style={{ textAlign: "center", marginTop: "3rem" }}>
          <p>
            A city with $94,000 median incomes and a $360 million deficit.
            A 30% homicide drop and a 342-officer gap. The paradox persists.
          </p>
          <p style={{ color: "#a39e96" }}>
            The council meetings, still ongoing, are one way to see the costs.
            The simulation above is another.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// OAKLAND SKYLINE SVG
// Hero illustration — port cranes, Tribune Tower, oak tree, Lake Merritt
// ============================================================================

function OaklandSkylineSVG() {
  return (
    <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="oakTeal1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#14b89a" />
          <stop offset="100%" stopColor="#0D6E5B" />
        </linearGradient>
        <linearGradient id="oakDark1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#221f1b" />
          <stop offset="100%" stopColor="#1a1714" />
        </linearGradient>
        <linearGradient id="oakHill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#10997F" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0D6E5B" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="oakWater" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#14b89a" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#10997F" stopOpacity="0.1" />
        </linearGradient>
        <filter id="oakGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ground glow */}
      <ellipse cx="400" cy="480" rx="350" ry="50" fill="#10997F" opacity="0.08" />

      {/* Hills silhouette */}
      <path d="M0 280 Q80 180 200 230 Q280 190 400 220 Q520 180 640 210 Q720 170 800 220 L800 500 L0 500Z" fill="url(#oakHill)" />

      {/* Lake Merritt */}
      <ellipse cx="580" cy="380" rx="100" ry="35" fill="url(#oakWater)" />
      <ellipse cx="580" cy="376" rx="70" ry="20" fill="#14b89a" opacity="0.06" />

      {/* Port crane 1 */}
      <g>
        <rect x="50" y="170" width="14" height="280" fill="#221f1b" />
        <rect x="30" y="162" width="60" height="16" rx="3" fill="#1a1714" />
        <line x1="57" y1="170" x2="165" y2="142" stroke="#10997F" strokeWidth="5" opacity="0.6" />
        <line x1="57" y1="170" x2="15" y2="220" stroke="#10997F" strokeWidth="4" opacity="0.5" />
        <line x1="110" y1="155" x2="110" y2="240" stroke="#14b89a" strokeWidth="2" opacity="0.3" />
        <line x1="140" y1="148" x2="140" y2="260" stroke="#14b89a" strokeWidth="2" opacity="0.25" />
      </g>

      {/* Port crane 2 */}
      <g opacity="0.7">
        <rect x="160" y="210" width="12" height="240" fill="#221f1b" />
        <rect x="142" y="204" width="50" height="14" rx="3" fill="#1a1714" />
        <line x1="166" y1="210" x2="255" y2="186" stroke="#10997F" strokeWidth="4" opacity="0.5" />
        <line x1="166" y1="210" x2="130" y2="250" stroke="#10997F" strokeWidth="3" opacity="0.4" />
        <line x1="210" y1="196" x2="210" y2="270" stroke="#14b89a" strokeWidth="1.5" opacity="0.25" />
      </g>

      {/* Tribune Tower */}
      <g>
        <rect x="280" y="150" width="50" height="300" rx="4" fill="url(#oakDark1)" />
        <rect x="290" y="165" width="12" height="16" rx="2" fill="#10997F" opacity="0.25" />
        <rect x="308" y="165" width="12" height="16" rx="2" fill="#10997F" opacity="0.25" />
        <rect x="290" y="195" width="12" height="16" rx="2" fill="#10997F" opacity="0.2" />
        <rect x="308" y="195" width="12" height="16" rx="2" fill="#10997F" opacity="0.2" />
        <rect x="290" y="225" width="12" height="16" rx="2" fill="#10997F" opacity="0.15" />
        <rect x="308" y="225" width="12" height="16" rx="2" fill="#10997F" opacity="0.15" />
        <rect x="290" y="255" width="12" height="16" rx="2" fill="#10997F" opacity="0.1" />
        <rect x="308" y="255" width="12" height="16" rx="2" fill="#10997F" opacity="0.1" />
        {/* Spire */}
        <rect x="300" y="120" width="10" height="35" fill="#1a1714" />
        <polygon points="305,100 314,120 296,120" fill="#221f1b" />
      </g>

      {/* Building 2 */}
      <rect x="345" y="210" width="60" height="240" rx="4" fill="#1a1714" />
      <rect x="355" y="225" width="14" height="12" rx="2" fill="#10997F" opacity="0.2" />
      <rect x="377" y="225" width="14" height="12" rx="2" fill="#10997F" opacity="0.2" />
      <rect x="355" y="252" width="14" height="12" rx="2" fill="#10997F" opacity="0.15" />
      <rect x="377" y="252" width="14" height="12" rx="2" fill="#10997F" opacity="0.15" />

      {/* Building 3 */}
      <rect x="420" y="270" width="45" height="180" rx="4" fill="#221f1b" opacity="0.8" />

      {/* Oak tree */}
      <g>
        <rect x="655" y="340" width="22" height="85" fill="#0D6E5B" />
        <path d="M655 360 L635 385" stroke="#0D6E5B" strokeWidth="6" strokeLinecap="round" />
        <path d="M677 355 L700 380" stroke="#0D6E5B" strokeWidth="6" strokeLinecap="round" />
        <circle cx="666" cy="280" r="70" fill="url(#oakTeal1)" />
        <circle cx="635" cy="310" r="42" fill="#0D6E5B" />
        <circle cx="700" cy="305" r="38" fill="#14b89a" opacity="0.7" />
        <circle cx="666" cy="250" r="38" fill="#10997F" opacity="0.8" />
      </g>

      {/* Accent tree */}
      <circle cx="760" cy="370" r="22" fill="#14b89a" opacity="0.4" />
      <rect x="756" y="388" width="10" height="30" fill="#0D6E5B" opacity="0.4" />

      {/* Data dots */}
      <g filter="url(#oakGlow)">
        <circle cx="240" cy="140" r="4" fill="#14b89a" opacity="0.6" />
        <circle cx="470" cy="130" r="3" fill="#10997F" opacity="0.5" />
        <circle cx="560" cy="160" r="3.5" fill="#14b89a" opacity="0.4" />
        <circle cx="120" cy="130" r="2.5" fill="#10997F" opacity="0.5" />
        <circle cx="700" cy="180" r="3" fill="#14b89a" opacity="0.3" />
      </g>

      {/* Connection arcs */}
      <g opacity="0.15">
        <path d="M110 170 Q200 120 290 170" stroke="#14b89a" strokeWidth="2" strokeDasharray="8 6" fill="none" />
        <path d="M330 200 Q380 160 420 200" stroke="#10997F" strokeWidth="2" strokeDasharray="8 6" fill="none" />
      </g>
    </svg>
  );
}
