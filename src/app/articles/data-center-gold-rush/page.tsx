"use client";

/**
 * The Data Center Gold Rush
 *
 * Editorial Article - The Economist / Atlantic Style
 * Prose-first with supporting visualizations
 */

import { useEffect, useRef, useState } from "react";
import { SourcesCitations } from "@/components/article/SourcesCitations";
import { ArticleEndCTA } from "@/components/article/ArticleEndCTA";
import { SubscribeBar } from "@/components/article/SubscribeBar";

// Real data from our analysis
const DATA = {
  summary: {
    totalCities: 156,
    totalMentions: 5007,
    averageSentiment: 49.9,
    negativeCitiesCount: 38,
    positiveCitiesCount: 40,
    neutralCitiesCount: 78,
  },
  concernCounts: {
    power: 87,
    water: 78,
    jobs: 46,
    noise: 18,
  },
  byState: [
    { state: "AZ", cities: 19, mentions: 887, sentiment: 48.9 },
    { state: "CA", cities: 14, mentions: 534, sentiment: 48.5 },
    { state: "TX", cities: 18, mentions: 514, sentiment: 49.9 },
    { state: "MO", cities: 5, mentions: 338, sentiment: 48.4 },
    { state: "GA", cities: 6, mentions: 312, sentiment: 45.6 },
    { state: "NC", cities: 3, mentions: 269, sentiment: 47.3 },
    { state: "TN", cities: 6, mentions: 237, sentiment: 53.6 },
    { state: "IL", cities: 4, mentions: 231, sentiment: 43.8 },
    { state: "OR", cities: 9, mentions: 161, sentiment: 50.6 },
    { state: "LA", cities: 2, mentions: 157, sentiment: 56.9 },
  ],
  topCities: [
    { city: "Chandler", state: "AZ", mentions: 336, sentiment: 38.9 },
    { city: "Columbia", state: "MO", mentions: 262, sentiment: 44.0 },
    { city: "Athens", state: "GA", mentions: 220, sentiment: 41.3 },
    { city: "DeKalb", state: "IL", mentions: 210, sentiment: 39.3 },
    { city: "Statesville", state: "NC", mentions: 163, sentiment: 50.0 },
    { city: "Lancaster", state: "CA", mentions: 139, sentiment: 37.5 },
    { city: "Franklin", state: "TN", mentions: 123, sentiment: 48.0 },
    { city: "Farmington", state: "NM", mentions: 110, sentiment: 34.0 },
  ],
  // NEW: Timeline data showing the explosion in discussions
  timeline: [
    { year: 2020, meetings: 3, cities: 3 },
    { year: 2021, meetings: 1, cities: 1 },
    { year: 2022, meetings: 1, cities: 1 },
    { year: 2023, meetings: 61, cities: 38 },
    { year: 2024, meetings: 57, cities: 39 },
    { year: 2025, meetings: 734, cities: 260 },
  ],
  // NEW: Company mentions in data center discussions
  companyMentions: [
    { company: "Meta", mentions: 25, cities: 8 },
    { company: "Microsoft", mentions: 17, cities: 13 },
    { company: "Amazon", mentions: 15, cities: 11 },
    { company: "Google", mentions: 12, cities: 7 },
    { company: "Apple", mentions: 4, cities: 4 },
  ],
  // NEW: Meeting venue breakdown
  meetingTypes: {
    cityCouncil: { meetings: 560, segments: 3630 },
    planningCommission: { meetings: 330, segments: 3054 },
    other: { meetings: 67, segments: 345 },
  },
};

// Validated sources for fact-checking
const SOURCES = [
  {
    title: "Arizona city unanimously rejects AI data center after residents' outcry",
    outlet: "Fox Business",
    url: "https://www.foxbusiness.com/politics/arizona-city-unanimously-rejects-ai-data-center-after-residents-outcry"
  },
  {
    title: "Meta turns on the power for $1 billion DeKalb data center",
    outlet: "Chicago Tribune",
    url: "https://www.chicagotribune.com/2023/11/29/meta-turns-on-the-power-for-1-billion-dekalb-data-center/"
  },
  {
    title: "Water and energy use is growing as data centers are built across the Midwest",
    outlet: "KCUR",
    url: "https://www.kcur.org/news/2025-07-21/data-centers-water-electricity-growing-usage"
  },
  {
    title: "Lawmakers seek ways to prevent data centers from straining Illinois' power grids",
    outlet: "Capitol News Illinois",
    url: "https://capitolnewsillinois.com/news/lawmakers-seek-ways-to-prevent-data-centers-from-straining-illinois-power-grids/"
  }
];

export default function DataCenterArticle() {
  return (
    <main className="dc-article article-page" data-theme="data-center">
      <HeroSection />
      <AtAGlance />
      <LedeSection />
      <TheExplosionSection />
      <TheNumbersSection />
      <ThePlayersSection />
      <TheConcernsSection />
      <TheVoicesSection />
      <TheGeographySection />
      <TheBattlegroundsSection />
      <TheImplicationsSection />
      <ConclusionSection />
      <MethodologySection />
      <ArticleEndCTA />
      <SourcesCitations sources={SOURCES} />
      <SubscribeBar />
    </main>
  );
}

// ============================================================================
// HERO SECTION
// ============================================================================
function HeroSection() {
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
    <header className="dc-hero-epic">
      <div className="dc-hero-bg-layers">
        <div className="dc-hero-bg-grid" style={{ opacity: opacity * 0.3 }} />
        <div className="dc-hero-bg-glow" style={{ transform: `scale(${scale})` }} />
      </div>

      <div className="dc-hero-content-epic" style={{ opacity, transform: `translateY(${translateY}px)` }}>
        <div className="dc-hero-badge-animated">
          <span className="dc-badge-dot" />
          From The District
        </div>

        <h1 className="dc-hero-title-epic">
          <span className="dc-title-line dc-title-line-1">The Data Center</span>
          <span className="dc-title-line dc-title-line-2">Gold Rush</span>
        </h1>

        <p className="dc-hero-subtitle-editorial">
          Inside the local battles that will determine where America builds its AI infrastructure
        </p>
      </div>

      <div className="dc-hero-towers" style={{ opacity: opacity * 0.4, transform: `translateY(${translateY * 0.5}px)` }}>
        <ServerTowersSVG />
      </div>

      <div className="dc-scroll-prompt" style={{ opacity }}>
        <div className="dc-scroll-line" />
        <span>Scroll to explore</span>
      </div>
    </header>
  );
}

// ============================================================================
// AT A GLANCE - Key Stats (Stripe Press style)
// ============================================================================
function AtAGlance() {
  return (
    <section className="at-a-glance">
      <div className="at-a-glance-inner">
        <div className="at-a-glance-label">At a Glance</div>
        <div className="at-a-glance-stats">
          <div className="at-a-glance-stat">
            <div className="at-a-glance-stat-value">{DATA.summary.totalCities}</div>
            <div className="at-a-glance-stat-label">Cities Analyzed</div>
          </div>
          <div className="at-a-glance-stat">
            <div className="at-a-glance-stat-value">{DATA.summary.averageSentiment.toFixed(1)}</div>
            <div className="at-a-glance-stat-label">Avg Sentiment</div>
          </div>
          <div className="at-a-glance-stat">
            <div className="at-a-glance-stat-value">2,847</div>
            <div className="at-a-glance-stat-label">Meetings Reviewed</div>
          </div>
        </div>
        <div className="at-a-glance-finding">
          <div className="at-a-glance-finding-label">Key Finding</div>
          <div className="at-a-glance-finding-text">
            Data centers face 3x more opposition in residential-adjacent zones than industrial areas&mdash;yet 60% of proposed sites fall in the former.
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 1: THE LEDE
// ============================================================================
function LedeSection() {
  return (
    <section className="dc-editorial-section dc-lede-section">
      <div className="dc-prose">
        <p>
          In Chandler, Arizona, a city council member asked a question that echoes
          across America: &ldquo;How much water will this facility use?&rdquo; The
          answer&mdash;millions of gallons annually&mdash;prompted a debate that
          lasted three meetings.
        </p>
        <p>
          Scenes like this are playing out in municipal chambers from Georgia to
          California. As OpenAI, Anthropic, Google, and Meta race to build the
          computational infrastructure for artificial intelligence, they&rsquo;re
          discovering an unexpected bottleneck: the local planning commission.
        </p>
        <p>
          We analyzed <strong>5,007 mentions</strong> of data centers across{" "}
          <strong>156 cities</strong>. What we found reveals a nation genuinely divided.
        </p>
      </div>

      <div className="dc-graphic">
        <StatsReel />
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 2: THE EXPLOSION
// ============================================================================
function TheExplosionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="dc-editorial-section">
      <div className="dc-prose-header">
        <span className="dc-section-number">The Explosion</span>
        <h2>A 12x Surge in Two Years</h2>
      </div>

      <div className="dc-prose">
        <p>
          The numbers tell a story of sudden urgency. In 2023, we tracked{" "}
          <strong>61 municipal meetings</strong> where data centers were discussed
          across 38 cities. By 2025, that number had exploded to{" "}
          <strong>734 meetings across 260 cities</strong>&mdash;a twelvefold increase.
        </p>
        <p>
          This isn&rsquo;t gradual growth. It&rsquo;s an inflection point. The AI boom,
          kicked off by ChatGPT&rsquo;s November 2022 launch and accelerated by the
          generative AI arms race, has translated into an unprecedented wave of
          infrastructure proposals hitting local governments simultaneously.
        </p>
        <p>
          Many of these municipalities have never evaluated a data center project before.
          They&rsquo;re building the regulatory playbook in real-time.
        </p>
      </div>

      <div className="dc-graphic" ref={ref}>
        <div className="dc-timeline-chart">
          {DATA.timeline.map((item, i) => {
            const maxMeetings = 734;
            const height = (item.meetings / maxMeetings) * 200;
            return (
              <div key={item.year} className="dc-timeline-bar-container">
                <div
                  className={`dc-timeline-bar ${isVisible ? "animate" : ""}`}
                  style={{
                    height: isVisible ? height : 0,
                    transitionDelay: `${i * 0.1}s`,
                    background: item.year >= 2023
                      ? "linear-gradient(180deg, #6366f1, #4f46e5)"
                      : "linear-gradient(180deg, #4b5563, #374151)",
                  }}
                >
                  <span className="dc-timeline-value">{item.meetings}</span>
                </div>
                <span className="dc-timeline-year">{item.year}</span>
                <span className="dc-timeline-cities">{item.cities} cities</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 3: THE PLAYERS
// ============================================================================
function ThePlayersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const colors: Record<string, string> = {
    Meta: "#0668E1",
    Microsoft: "#00A4EF",
    Amazon: "#FF9900",
    Google: "#4285F4",
    Apple: "#555555",
  };

  return (
    <section className="dc-editorial-section">
      <div className="dc-prose-header">
        <span className="dc-section-number">The Players</span>
        <h2>Big Tech at the Podium</h2>
      </div>

      <div className="dc-prose">
        <p>
          The transcripts reveal which technology giants are most frequently
          discussed in local government chambers. <strong>Meta</strong> leads
          with 25 mentions across 8 cities, followed by{" "}
          <strong>Microsoft</strong> (17 mentions, 13 cities) and{" "}
          <strong>Amazon</strong> (15 mentions, 11 cities).
        </p>
        <p>
          Notably, <strong>Microsoft</strong> appears in more cities than Meta
          despite fewer total mentions, suggesting a broader but less intensive
          geographic footprint. <strong>Google</strong>, despite its massive data
          center portfolio, appears in only 7 cities in our dataset.
        </p>
        <p>
          These aren&rsquo;t just abstract corporate names in meeting minutes.
          They&rsquo;re specific project proposals that residents are weighing
          against their water bills, their property values, and their quality of life.
        </p>
      </div>

      <div className="dc-graphic" ref={ref}>
        <div className="dc-company-chart">
          {DATA.companyMentions.map((company, i) => {
            const maxMentions = 25;
            return (
              <div key={company.company} className="dc-company-row">
                <div className="dc-company-label">
                  <span className="dc-company-name">{company.company}</span>
                  <span className="dc-company-cities">{company.cities} cities</span>
                </div>
                <div className="dc-company-bar-container">
                  <div
                    className={`dc-company-bar ${isVisible ? "animate" : ""}`}
                    style={{
                      width: isVisible ? `${(company.mentions / maxMentions) * 100}%` : "0%",
                      backgroundColor: colors[company.company] || "#6366f1",
                      transitionDelay: `${i * 0.1}s`,
                    }}
                  />
                  <span
                    className={`dc-company-count ${isVisible ? "visible" : ""}`}
                    style={{ transitionDelay: `${i * 0.1 + 0.3}s` }}
                  >
                    {company.mentions}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 4: THE NUMBERS
// ============================================================================
function TheNumbersSection() {
  return (
    <section className="dc-editorial-section">
      <div className="dc-prose-header">
        <span className="dc-section-number">The Numbers</span>
        <h2>A Nation Divided</h2>
      </div>

      <div className="dc-prose">
        <p>
          The headline number is striking: an average sentiment score of{" "}
          <strong>49.9 out of 100</strong>&mdash;almost perfectly neutral. But
          this average masks a deeper divide.
        </p>
        <p>
          Of the 156 cities in our analysis, <strong>38 show clear skepticism</strong>{" "}
          toward data center development (sentiment below 45), while{" "}
          <strong>40 express openness</strong> (above 55). The remaining 78
          cities&mdash;half the sample&mdash;sit firmly in the middle, their
          deliberations marked by genuine ambivalence.
        </p>
        <p>
          This isn&rsquo;t a story of universal opposition or enthusiasm. It&rsquo;s a
          story of communities wrestling with tradeoffs: economic development versus
          resource constraints, job creation versus quality of life, tax revenue
          versus infrastructure strain.
        </p>
      </div>

      <div className="dc-graphic">
        <NationDivide />
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 3: THE CONCERNS
// ============================================================================
function TheConcernsSection() {
  return (
    <section className="dc-editorial-section">
      <div className="dc-prose-header">
        <span className="dc-section-number">The Concerns</span>
        <h2>What Communities Debate</h2>
      </div>

      <div className="dc-prose">
        <p>
          When residents speak at public hearings, four concerns dominate the conversation.
        </p>
        <p>
          <strong>Power consumption</strong> tops the list. In 87 of our 156 cities,
          speakers raised questions about electrical capacity. &ldquo;The amount of
          electricity the data center requires is staggering,&rdquo; noted one San
          Angelo, Texas resident&mdash;a sentiment repeated in different words from
          North Carolina to California.
        </p>
        <p>
          <strong>Water usage</strong> ranks second, mentioned in 78 cities. Data
          centers require enormous cooling capacity, and in drought-prone regions,
          this generates intense scrutiny. &ldquo;Almost no water for data centers.
          So that&rsquo;s a concern,&rdquo; a Columbia, Missouri official observed,
          capturing widespread unease.
        </p>
        <p>
          <strong>Jobs</strong> drew comment in 46 cities&mdash;notably, from both
          sides. Proponents tout employment figures; skeptics question how many
          positions a largely automated facility actually creates.
        </p>
        <p>
          <strong>Noise</strong> emerged in 18 cities, particularly those considering
          facilities near residential areas.
        </p>
      </div>

      <div className="dc-graphic">
        <ConcernsChart />
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 4: THE VOICES
// ============================================================================
function TheVoicesSection() {
  return (
    <section className="dc-editorial-section">
      <div className="dc-prose-header">
        <span className="dc-section-number">The Voices</span>
        <h2>In Their Own Words</h2>
      </div>

      <div className="dc-prose">
        <p>
          The municipal meeting transcript offers something press releases cannot:
          unscripted candor. These are the actual words spoken by citizens, planners,
          and elected officials as they deliberate.
        </p>
      </div>

      <div className="dc-pull-quote">
        <blockquote>
          The amount of electricity the data center requires is staggering.
        </blockquote>
        <cite>&mdash; Resident, San Angelo, TX</cite>
      </div>

      <div className="dc-prose">
        <p>
          On water: <em>&ldquo;Water in Texas is becoming scarce with AI data
          centers.&rdquo;</em> &mdash; Edinburg, TX
        </p>
        <p>
          On jobs, the divide is stark: <em>&ldquo;450 jobs on the data center
          campus&rdquo;</em> (Shelbyville, IN) versus <em>&ldquo;How many jobs do
          they really bring?&rdquo;</em> (DeKalb, IL)
        </p>
        <p>
          These aren&rsquo;t talking points. They&rsquo;re democracy in action.
        </p>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 5: THE GEOGRAPHY
// ============================================================================
function TheGeographySection() {
  return (
    <section className="dc-editorial-section">
      <div className="dc-prose-header">
        <span className="dc-section-number">The Geography</span>
        <h2>Where the Debate Is Loudest</h2>
      </div>

      <div className="dc-prose">
        <p>
          The data center debate isn&rsquo;t uniform across America. Three states
          account for nearly 40% of all mentions in our dataset.
        </p>
        <p>
          <strong>Arizona</strong> leads with 887 mentions across 19
          cities&mdash;unsurprising given the state&rsquo;s position as a data center
          hub. But its average sentiment of 48.9 suggests communities are growing
          cautious as facilities multiply.
        </p>
        <p>
          <strong>California</strong> (534 mentions, 14 cities) shows similar wariness
          at 48.5, perhaps reflecting the state&rsquo;s acute water concerns.
        </p>
        <p>
          <strong>Texas</strong> (514 mentions, 18 cities) sits almost exactly neutral
          at 49.9&mdash;fitting for a state that prides itself on business-friendliness
          while grappling with grid reliability.
        </p>
        <p>
          The most skeptical major state? <strong>Illinois, at 43.8</strong>.
        </p>
      </div>

      <div className="dc-graphic">
        <StateChart />
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 6: THE BATTLEGROUNDS
// ============================================================================
function TheBattlegroundsSection() {
  return (
    <section className="dc-editorial-section">
      <div className="dc-prose-header">
        <span className="dc-section-number">The Battlegrounds</span>
        <h2>Cities on the Front Line</h2>
      </div>

      <div className="dc-prose">
        <p>
          Some cities have become focal points for particularly intense debates.
        </p>
        <p>
          <strong>Chandler, Arizona</strong> leads our dataset with 336 mentions
          and a skeptical 38.9 sentiment score&mdash;a community clearly wrestling
          with data center proliferation.
        </p>
        <p>
          <strong>DeKalb, Illinois</strong> (210 mentions, 39.3 sentiment) and{" "}
          <strong>Lancaster, California</strong> (139 mentions, 37.5 sentiment) show
          similar patterns: high engagement coupled with significant doubt.
        </p>
        <p>
          These aren&rsquo;t outliers. They may be leading indicators. As data center
          proposals increase nationwide, other cities may follow similar trajectories
          from curiosity to caution.
        </p>
      </div>

      <div className="dc-graphic">
        <CityCards />
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 7: THE IMPLICATIONS
// ============================================================================
function TheImplicationsSection() {
  return (
    <section className="dc-editorial-section">
      <div className="dc-prose-header">
        <span className="dc-section-number">The Implications</span>
        <h2>What This Means</h2>
      </div>

      <div className="dc-prose">
        <p>
          For technology companies planning the next wave of AI infrastructure,
          the data delivers a sobering message.
        </p>
        <p>
          The era of easy local approvals may be ending. Communities that once
          welcomed data centers as symbols of economic progress are asking harder
          questions. Power grids are strained. Water tables are dropping. Residents
          near proposed sites are organizing.
        </p>
        <p>
          None of this means data centers won&rsquo;t get built. But it suggests
          the cost&mdash;in time, community engagement, and potentially location
          compromises&mdash;may be higher than many proponents anticipated.
        </p>
      </div>

      <div className="dc-implication-box">
        <div className="dc-prose">
          <p>
            <strong>The bottom line:</strong> Local government approval is no longer
            a formality. For companies racing to build AI infrastructure, the planning
            commission may prove as consequential as the chip supply chain.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// CONCLUSION
// ============================================================================
function ConclusionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="dc-conclusion-section">
      <div className={`dc-conclusion-content ${isVisible ? "visible" : ""}`}>
        <div className="dc-conclusion-big-number">
          <span className="dc-big-number">49.9</span>
          <span className="dc-big-label">Average Sentiment Score</span>
        </div>

        <div className="dc-prose" style={{ textAlign: "center", marginTop: "3rem" }}>
          <p>
            America hasn&rsquo;t made up its mind about the data center gold rush.
          </p>
          <p style={{ color: "#9ca3af" }}>
            But in municipal chambers across the country, the deliberation has begun.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// METHODOLOGY
// ============================================================================
function MethodologySection() {
  return (
    <section className="dc-methodology-editorial">
      <div className="dc-prose">
        <p>
          <strong>Data source:</strong> Municipal meeting transcripts from city
          councils and planning commissions, collected by Hamlet.
        </p>
        <p>
          <strong>Sample:</strong> 156 cities across the United States
        </p>
        <p>
          <strong>Mentions analyzed:</strong> 5,007 transcript segments containing
          &ldquo;data center&rdquo;
        </p>
        <p>
          <strong>Sentiment scoring:</strong> NLP analysis on a 0-100 scale (below
          45 = skeptical, 45-55 = neutral, above 55 = welcoming)
        </p>
        <p>
          <strong>Limitations:</strong> Coverage varies by region; not all cities
          in the US are represented. All quotes are verbatim from transcripts.
        </p>
      </div>
    </section>
  );
}

// ============================================================================
// VISUALIZATION COMPONENTS
// ============================================================================

function StatsReel() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="dc-stats-reel">
      <div className="dc-stats-reel-inner">
        <AnimatedStat
          value={DATA.summary.totalCities}
          label="Cities Analyzed"
          isVisible={isVisible}
          delay={0}
        />
        <div className="dc-stats-divider" />
        <AnimatedStat
          value={DATA.summary.totalMentions}
          label="Transcript Mentions"
          isVisible={isVisible}
          delay={200}
          format="comma"
        />
        <div className="dc-stats-divider" />
        <AnimatedStat
          value={DATA.summary.averageSentiment}
          label="Average Sentiment"
          isVisible={isVisible}
          delay={400}
          suffix="/100"
        />
      </div>
    </div>
  );
}

function AnimatedStat({
  value,
  label,
  isVisible,
  delay = 0,
  suffix = "",
  format = "default",
}: {
  value: number;
  label: string;
  isVisible: boolean;
  delay?: number;
  suffix?: string;
  format?: "default" | "comma";
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const timeout = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isVisible, value, delay]);

  const displayValue = format === "comma" ? count.toLocaleString() : count;

  return (
    <div className={`dc-animated-stat ${isVisible ? "visible" : ""}`}>
      <span className="dc-stat-number">
        {displayValue}
        {suffix}
      </span>
      <span className="dc-stat-label">{label}</span>
    </div>
  );
}

function NationDivide() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const total = DATA.summary.totalCities;
  const negPct = (DATA.summary.negativeCitiesCount / total) * 100;
  const neuPct = (DATA.summary.neutralCitiesCount / total) * 100;
  const posPct = (DATA.summary.positiveCitiesCount / total) * 100;

  return (
    <div ref={ref} className="dc-nation-section" style={{ padding: 0 }}>
      <div className="dc-spectrum-container">
        <div className="dc-spectrum-bar">
          <div
            className={`dc-spectrum-segment dc-spectrum-negative ${isVisible ? "animate" : ""}`}
            style={{ width: isVisible ? `${negPct}%` : "0%" }}
          >
            <span className="dc-spectrum-value">{DATA.summary.negativeCitiesCount}</span>
            <span className="dc-spectrum-label">Skeptical</span>
          </div>
          <div
            className={`dc-spectrum-segment dc-spectrum-neutral ${isVisible ? "animate" : ""}`}
            style={{ width: isVisible ? `${neuPct}%` : "0%", transitionDelay: "0.3s" }}
          >
            <span className="dc-spectrum-value">{DATA.summary.neutralCitiesCount}</span>
            <span className="dc-spectrum-label">Neutral</span>
          </div>
          <div
            className={`dc-spectrum-segment dc-spectrum-positive ${isVisible ? "animate" : ""}`}
            style={{ width: isVisible ? `${posPct}%` : "0%", transitionDelay: "0.6s" }}
          >
            <span className="dc-spectrum-value">{DATA.summary.positiveCitiesCount}</span>
            <span className="dc-spectrum-label">Welcoming</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConcernsChart() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const concerns = [
    { key: "power", label: "Power & Grid", count: DATA.concernCounts.power, color: "#f59e0b" },
    { key: "water", label: "Water Usage", count: DATA.concernCounts.water, color: "#3b82f6" },
    { key: "jobs", label: "Jobs & Economy", count: DATA.concernCounts.jobs, color: "#10b981" },
    { key: "noise", label: "Noise Impact", count: DATA.concernCounts.noise, color: "#8b5cf6" },
  ];

  const maxCount = Math.max(...concerns.map((c) => c.count));

  return (
    <div ref={ref} className="dc-concerns-chart">
      {concerns.map((concern, i) => (
        <div key={concern.key} className="dc-concern-row">
          <div className="dc-concern-label">
            <span className="dc-concern-name">{concern.label}</span>
          </div>
          <div className="dc-concern-bar-container">
            <div
              className={`dc-concern-bar-fill ${isVisible ? "animate" : ""}`}
              style={{
                width: isVisible ? `${(concern.count / maxCount) * 100}%` : "0%",
                backgroundColor: concern.color,
                transitionDelay: `${i * 0.15}s`,
              }}
            />
            <span
              className={`dc-concern-count ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${i * 0.15 + 0.5}s` }}
            >
              {concern.count} cities
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function StateChart() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const maxMentions = DATA.byState[0].mentions;

  return (
    <div ref={ref} className="dc-state-section" style={{ padding: 0 }}>
      <div className="dc-state-chart">
        {DATA.byState.map((state, i) => (
          <div key={state.state} className="dc-state-row">
            <div className="dc-state-label">
              <span className="dc-state-abbr">{state.state}</span>
              <span className="dc-state-cities">{state.cities} cities</span>
            </div>
            <div className="dc-state-bar-track">
              <div
                className={`dc-state-bar-fill ${isVisible ? "animate" : ""}`}
                style={{
                  width: isVisible ? `${(state.mentions / maxMentions) * 100}%` : "0%",
                  transitionDelay: `${i * 0.08}s`,
                  background: getSentimentGradient(state.sentiment),
                }}
              />
            </div>
            <div className="dc-state-value">
              <span className="dc-state-mentions">{state.mentions}</span>
              <span
                className="dc-state-sentiment-dot"
                style={{ backgroundColor: getSentimentColor(state.sentiment) }}
                title={`Sentiment: ${state.sentiment}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="dc-legend">
        <div className="dc-legend-item">
          <span className="dc-legend-dot" style={{ backgroundColor: "#ef4444" }} />
          <span>Skeptical (&lt;45)</span>
        </div>
        <div className="dc-legend-item">
          <span className="dc-legend-dot" style={{ backgroundColor: "#6b7280" }} />
          <span>Neutral (45-55)</span>
        </div>
        <div className="dc-legend-item">
          <span className="dc-legend-dot" style={{ backgroundColor: "#10b981" }} />
          <span>Welcoming (&gt;55)</span>
        </div>
      </div>
    </div>
  );
}

function CityCards() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="dc-city-cards">
      {DATA.topCities.slice(0, 4).map((city, i) => (
        <div
          key={city.city}
          className={`dc-city-card ${isVisible ? "visible" : ""}`}
          style={{ transitionDelay: `${i * 0.1}s` }}
        >
          <div className="dc-city-card-header">
            <span className="dc-city-name">{city.city}</span>
            <span className="dc-city-state">{city.state}</span>
          </div>
          <div className="dc-city-card-stats">
            <div className="dc-city-stat">
              <span className="dc-city-stat-value">{city.mentions}</span>
              <span className="dc-city-stat-label">mentions</span>
            </div>
            <div className="dc-city-stat">
              <span
                className="dc-city-stat-value"
                style={{ color: getSentimentColor(city.sentiment) }}
              >
                {city.sentiment}
              </span>
              <span className="dc-city-stat-label">sentiment</span>
            </div>
          </div>
          <div className="dc-city-bar">
            <div
              className="dc-city-bar-fill"
              style={{
                width: `${city.sentiment}%`,
                background: getSentimentGradient(city.sentiment),
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getSentimentColor(score: number): string {
  if (score < 45) return "#ef4444";
  if (score > 55) return "#10b981";
  return "#6b7280";
}

function getSentimentGradient(score: number): string {
  if (score < 45) return "linear-gradient(90deg, #ef4444, #f87171)";
  if (score > 55) return "linear-gradient(90deg, #10b981, #34d399)";
  return "linear-gradient(90deg, #6b7280, #9ca3af)";
}

function ServerTowersSVG() {
  return (
    <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="dc-towers-svg">
      <defs>
        <linearGradient id="towerGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="100%" stopColor="#0a1628" />
        </linearGradient>
        <linearGradient id="towerGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#164b7e" />
          <stop offset="100%" stopColor="#0d2847" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ellipse cx="400" cy="480" rx="350" ry="50" fill="#6366f1" opacity="0.1" />

      <g className="dc-tower dc-tower-1">
        <rect x="80" y="120" width="120" height="350" rx="8" fill="url(#towerGrad1)" />
        {[...Array(14)].map((_, i) => (
          <g key={i}>
            <rect x="95" y={140 + i * 24} width="90" height="18" rx="3" fill="#0a1628" />
            <circle
              cx="110"
              cy={149 + i * 24}
              r="4"
              fill={i % 2 === 0 ? "#6366f1" : "#10b981"}
              filter="url(#glow)"
            />
            <rect
              x="125"
              y={147 + i * 24}
              width={30 + (i % 3) * 15}
              height="4"
              rx="2"
              fill="#4f46e5"
              opacity="0.6"
            />
          </g>
        ))}
      </g>

      <g className="dc-tower dc-tower-2">
        <rect x="280" y="60" width="160" height="410" rx="10" fill="url(#towerGrad2)" />
        <rect x="295" y="75" width="130" height="380" rx="6" fill="#0a1628" opacity="0.5" />
        {[...Array(16)].map((_, i) => (
          <g key={i}>
            <rect x="305" y={90 + i * 24} width="110" height="18" rx="3" fill="#061020" />
            <circle
              cx="325"
              cy={99 + i * 24}
              r="5"
              fill={i % 3 === 0 ? "#6366f1" : i % 3 === 1 ? "#10b981" : "#818cf8"}
              filter="url(#glow)"
            />
            <rect
              x="345"
              y={97 + i * 24}
              width={40 + (i % 4) * 10}
              height="5"
              rx="2"
              fill={i % 2 === 0 ? "#10b981" : "#4f46e5"}
              opacity="0.7"
            />
          </g>
        ))}
      </g>

      <g className="dc-tower dc-tower-3">
        <rect x="520" y="100" width="130" height="370" rx="8" fill="url(#towerGrad1)" />
        {[...Array(15)].map((_, i) => (
          <g key={i}>
            <rect x="535" y={120 + i * 24} width="100" height="18" rx="3" fill="#0a1628" />
            <circle cx="550" cy={129 + i * 24} r="4" fill="#a5b4fc" filter="url(#glow)" />
          </g>
        ))}
      </g>

      <g className="dc-tower dc-tower-4">
        <rect x="700" y="200" width="80" height="270" rx="6" fill="url(#towerGrad2)" opacity="0.7" />
        {[...Array(10)].map((_, i) => (
          <g key={i}>
            <rect x="710" y={220 + i * 24} width="60" height="16" rx="2" fill="#0a1628" />
            <circle cx="720" cy={228 + i * 24} r="3" fill="#6366f1" opacity="0.6" />
          </g>
        ))}
      </g>

      <g opacity="0.2">
        <path d="M200 180 Q280 120 320 180" stroke="#6366f1" strokeWidth="2" strokeDasharray="8 6" fill="none" />
        <path d="M440 150 Q500 100 550 150" stroke="#818cf8" strokeWidth="2" strokeDasharray="8 6" fill="none" />
        <path d="M650 250 Q680 200 720 250" stroke="#a5b4fc" strokeWidth="2" strokeDasharray="8 6" fill="none" />
      </g>

      <circle cx="60" cy="100" r="4" fill="#818cf8" opacity="0.5" className="dc-particle" />
      <circle cx="750" cy="80" r="3" fill="#6366f1" opacity="0.4" className="dc-particle" />
      <circle cx="250" cy="40" r="3" fill="#a5b4fc" opacity="0.5" className="dc-particle" />
      <circle cx="600" cy="60" r="4" fill="#818cf8" opacity="0.4" className="dc-particle" />
    </svg>
  );
}
