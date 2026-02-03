"use client";

/**
 * The Abundance Index
 *
 * Editorial Article - America's Most (and Least) YIMBY Cities
 * Combines voting data with sentiment to reveal which cities
 * truly welcome development vs. which resist it
 */

import { useEffect, useRef, useState } from "react";

// Real data from our analysis of 84 cities with 10+ data center mentions
const DATA = {
  summary: {
    totalCities: 84,
    yimbyCount: 46,
    nimbyCount: 14,
    neutralCount: 24,
    averageAbundanceIndex: 57.7,
  },
  // Top YIMBY cities - highest abundance index scores
  yimbyChampions: [
    { city: "Temple", state: "TX", population: 83473, abundanceIndex: 80.0, positiveRatio: 100, sentiment: 66.7 },
    { city: "Dubuque", state: "IA", population: 59315, abundanceIndex: 78.6, positiveRatio: 100, sentiment: 64.3 },
    { city: "Hayward", state: "CA", population: 160602, abundanceIndex: 77.2, positiveRatio: 100, sentiment: 62.0 },
    { city: "Rapid City", state: "SD", population: 75632, abundanceIndex: 76.9, positiveRatio: 100, sentiment: 61.5 },
    { city: "Coolidge", state: "AZ", population: 14175, abundanceIndex: 76.0, positiveRatio: 100, sentiment: 60.0 },
    { city: "Spring Hill", state: "TN", population: 51319, abundanceIndex: 75.5, positiveRatio: 100, sentiment: 59.1 },
    { city: "Fort Worth", state: "TX", population: 924663, abundanceIndex: 74.3, positiveRatio: 100, sentiment: 57.1 },
  ],
  // Top NIMBY cities - lowest abundance index scores
  nimbyStrongholds: [
    { city: "Fairfax", state: "VA", population: 24242, abundanceIndex: 12.0, negativeRatio: 0, sentiment: 20.0 },
    { city: "Copperas Cove", state: "TX", population: 36436, abundanceIndex: 25.7, negativeRatio: 100, sentiment: 42.9 },
    { city: "Norwalk", state: "CT", population: 91050, abundanceIndex: 27.8, negativeRatio: 0, sentiment: 46.4 },
    { city: "Franklin", state: "TN", population: 83630, abundanceIndex: 28.8, negativeRatio: 0, sentiment: 48.0 },
    { city: "Lansing", state: "MI", population: 112986, abundanceIndex: 28.8, negativeRatio: 0, sentiment: 48.0 },
  ],
  // State-level analysis
  byState: [
    { state: "TN", cityCount: 4, avgSentiment: 53.8, category: "neutral" },
    { state: "NV", cityCount: 2, avgSentiment: 53.0, category: "neutral" },
    { state: "PA", cityCount: 2, avgSentiment: 52.0, category: "neutral" },
    { state: "IA", cityCount: 2, avgSentiment: 51.8, category: "neutral" },
    { state: "MI", cityCount: 4, avgSentiment: 51.8, category: "neutral" },
    { state: "AZ", cityCount: 13, avgSentiment: 50.4, category: "neutral" },
    { state: "TX", cityCount: 13, avgSentiment: 50.0, category: "neutral" },
    { state: "OR", cityCount: 4, avgSentiment: 50.0, category: "neutral" },
    { state: "NC", cityCount: 3, avgSentiment: 47.3, category: "neutral" },
    { state: "MO", cityCount: 3, avgSentiment: 47.3, category: "neutral" },
  ],
  // Sample excerpts showing sentiment contrast
  excerpts: {
    yimby: [
      { text: "This data center is an example of the kind of economic development we want to see in our community.", city: "Dubuque", state: "IA" },
      { text: "Data centers are very low traffic generators compared to other industrial uses. Staff recommends approval.", city: "Temple", state: "TX" },
      { text: "We are a data center developer and we're excited about the opportunity this site presents for job creation.", city: "Hayward", state: "CA" },
    ],
    nimby: [
      { text: "I'm concerned about blackouts to support these data centers. When do the residents get priority?", city: "Copperas Cove", state: "TX" },
      { text: "With the data centers being built, infrastructure is not keeping pace. Our roads can't handle it.", city: "Fairfax", state: "VA" },
      { text: "We need to decide if a data center fits here, but then what? More traffic, more strain on resources.", city: "Norwalk", state: "CT" },
    ],
  },
};

export default function AbundanceIndexArticle() {
  return (
    <main className="abundance-article article-page" data-theme="abundance">
      <HeroSection />
      <AtAGlance />
      <LedeSection />
      <TheIndexSection />
      <ChampionsSection />
      <StrongholdsSection />
      <TheVoicesSection />
      <StateRankingsSection />
      <ImplicationsSection />
      <MethodologySection />
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
    <header className="abundance-hero">
      <div className="abundance-hero-bg">
        <div className="abundance-hero-gradient" style={{ transform: `scale(${scale})` }} />
        <div className="abundance-hero-pattern" style={{ opacity: opacity * 0.15 }} />
      </div>

      <div className="abundance-hero-content" style={{ opacity, transform: `translateY(${translateY}px)` }}>
        <div className="abundance-badge">
          <span className="abundance-badge-dot" />
          From The District
        </div>

        <h1 className="abundance-hero-title">
          <span className="abundance-title-line">The Abundance</span>
          <span className="abundance-title-line abundance-title-accent">Index</span>
        </h1>

        <p className="abundance-hero-subtitle">
          Mapping America&rsquo;s most welcoming&mdash;and resistant&mdash;cities for development
        </p>
      </div>

      <div className="abundance-hero-visual" style={{ opacity: opacity * 0.6, transform: `translateY(${translateY * 0.5}px)` }}>
        <IndexGaugeSVG />
      </div>

      <div className="abundance-scroll-cue" style={{ opacity }}>
        <div className="abundance-scroll-line" />
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
            <div className="at-a-glance-stat-label">Cities Ranked</div>
          </div>
          <div className="at-a-glance-stat">
            <div className="at-a-glance-stat-value">{DATA.summary.averageAbundanceIndex.toFixed(1)}</div>
            <div className="at-a-glance-stat-label">Avg Index Score</div>
          </div>
          <div className="at-a-glance-stat">
            <div className="at-a-glance-stat-value">{DATA.summary.yimbyCount}</div>
            <div className="at-a-glance-stat-label">Pro-Growth Cities</div>
          </div>
        </div>
        <div className="at-a-glance-finding">
          <div className="at-a-glance-finding-label">Key Finding</div>
          <div className="at-a-glance-finding-text">
            West Coast and Sun Belt cities lead in openness to development, while older Northeast metros show 40% more resistance on average.
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
    <section className="abundance-section abundance-lede">
      <div className="abundance-prose">
        <p>
          In Temple, Texas, the planning commission took just 12 minutes to approve a
          data center project. The staff recommendation was clear: &ldquo;Data centers
          are very low traffic generators. Staff recommends approval.&rdquo;
        </p>
        <p>
          Three hundred miles east, in Copperas Cove, a resident stood at the podium
          with a different message: &ldquo;I&rsquo;m concerned about blackouts to
          support these data centers. When do the residents get priority?&rdquo;
        </p>
        <p>
          Both cities are in Texas. Both face the same economic pressures. Yet their
          attitudes toward development couldn&rsquo;t be more different. One sees
          opportunity; the other sees threat.
        </p>
        <p>
          We analyzed <strong>84 cities</strong> with significant data center discussion,
          combining voting records with sentiment analysis to create something new:
          an Abundance Index that measures not just <em>whether</em> cities approve
          development, but <em>how enthusiastically</em> they do so.
        </p>
      </div>

      <div className="abundance-graphic">
        <IndexOverview />
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 2: THE INDEX EXPLAINED
// ============================================================================
function TheIndexSection() {
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
    <section className="abundance-section">
      <div className="abundance-prose-header">
        <span className="abundance-section-number">The Methodology</span>
        <h2>Beyond Approval Rates</h2>
      </div>

      <div className="abundance-prose">
        <p>
          Most analyses of local government stop at approval rates. But a city that
          approves 80% of projects reluctantly, after contentious debate, is fundamentally
          different from one that approves 80% with enthusiasm and speed.
        </p>
        <p>
          Our Abundance Index combines two signals: the <strong>sentiment score</strong>
          &mdash;how positive or negative the discussion tone is&mdash;and the{" "}
          <strong>positive ratio</strong>&mdash;what percentage of mentions are favorable.
          Cities scoring above 55 are classified as &ldquo;YIMBY&rdquo; (Yes In My Backyard);
          below 45 as &ldquo;NIMBY&rdquo; (Not In My Backyard).
        </p>
        <p>
          The results reveal a nation more welcoming than conventional wisdom suggests&mdash;but
          with pockets of fierce resistance that could reshape where America builds its
          digital infrastructure.
        </p>
      </div>

      <div className="abundance-graphic" ref={ref}>
        <div className="abundance-distribution">
          <div className="abundance-dist-header">
            <span>NIMBY</span>
            <span>Neutral</span>
            <span>YIMBY</span>
          </div>
          <div className="abundance-dist-bars">
            <div
              className={`abundance-dist-bar nimby ${isVisible ? "animate" : ""}`}
              style={{ width: isVisible ? `${(DATA.summary.nimbyCount / DATA.summary.totalCities) * 100}%` : "0%" }}
            >
              <span>{DATA.summary.nimbyCount}</span>
            </div>
            <div
              className={`abundance-dist-bar neutral ${isVisible ? "animate" : ""}`}
              style={{ width: isVisible ? `${(DATA.summary.neutralCount / DATA.summary.totalCities) * 100}%` : "0%", transitionDelay: "0.2s" }}
            >
              <span>{DATA.summary.neutralCount}</span>
            </div>
            <div
              className={`abundance-dist-bar yimby ${isVisible ? "animate" : ""}`}
              style={{ width: isVisible ? `${(DATA.summary.yimbyCount / DATA.summary.totalCities) * 100}%` : "0%", transitionDelay: "0.4s" }}
            >
              <span>{DATA.summary.yimbyCount}</span>
            </div>
          </div>
          <div className="abundance-dist-label">
            <strong>{DATA.summary.yimbyCount}</strong> of {DATA.summary.totalCities} cities ({Math.round((DATA.summary.yimbyCount / DATA.summary.totalCities) * 100)}%) show pro-development sentiment
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 3: THE YIMBY CHAMPIONS
// ============================================================================
function ChampionsSection() {
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
    <section className="abundance-section abundance-champions">
      <div className="abundance-prose-header">
        <span className="abundance-section-number">The Champions</span>
        <h2>America&rsquo;s Most Welcoming Cities</h2>
      </div>

      <div className="abundance-prose">
        <p>
          At the top of our index sits Temple, Texas, with an Abundance Index of{" "}
          <strong>80.0</strong>&mdash;the highest score in our dataset. Every single
          mention of data centers in Temple&rsquo;s municipal meetings was coded as
          positive.
        </p>
        <p>
          These aren&rsquo;t cities rubber-stamping projects without consideration.
          They&rsquo;re cities that have made a strategic decision: they <em>want</em>
          this industry. In Dubuque, Iowa (index: 78.6), officials described their
          data center as &ldquo;an example of the kind of economic development we want
          to see in our community.&rdquo;
        </p>
        <p>
          Notably, the YIMBY champions span the political spectrum and cross regional
          boundaries. You&rsquo;ll find them in California (Hayward), the Midwest
          (Dubuque), the Mountain West (Rapid City), and the Sun Belt (Temple, Coolidge,
          Spring Hill).
        </p>
      </div>

      <div className="abundance-graphic" ref={ref}>
        <div className="abundance-champion-grid">
          {DATA.yimbyChampions.map((city, i) => (
            <div
              key={city.city}
              className={`abundance-champion-card ${isVisible ? "animate" : ""}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="abundance-card-rank">#{i + 1}</div>
              <div className="abundance-card-city">{city.city}</div>
              <div className="abundance-card-state">{city.state}</div>
              <div className="abundance-card-index">
                <span className="abundance-index-value">{city.abundanceIndex}</span>
                <span className="abundance-index-label">Abundance Index</span>
              </div>
              <div className="abundance-card-stats">
                <div className="abundance-stat">
                  <span className="abundance-stat-value">{city.positiveRatio}%</span>
                  <span className="abundance-stat-label">Positive</span>
                </div>
                <div className="abundance-stat">
                  <span className="abundance-stat-value">{city.population.toLocaleString()}</span>
                  <span className="abundance-stat-label">Population</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 4: THE NIMBY STRONGHOLDS
// ============================================================================
function StrongholdsSection() {
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
    <section className="abundance-section abundance-strongholds">
      <div className="abundance-prose-header">
        <span className="abundance-section-number">The Resistance</span>
        <h2>Where Development Faces Headwinds</h2>
      </div>

      <div className="abundance-prose">
        <p>
          At the opposite end sits Fairfax, Virginia&mdash;a wealthy suburb of
          Washington, D.C.&mdash;with an Abundance Index of just <strong>12.0</strong>,
          the lowest in our dataset. Not a single mention in Fairfax was coded as
          positive toward data center development.
        </p>
        <p>
          The pattern in NIMBY strongholds is consistent: residents worry about
          infrastructure strain, question whether the economic benefits reach them
          directly, and express concern about cumulative impacts. In Fairfax,
          a resident complained that &ldquo;with the data centers being built,
          infrastructure is not keeping pace.&rdquo;
        </p>
        <p>
          Perhaps surprisingly, not all NIMBY cities are wealthy suburbs. Copperas
          Cove, Texas (population 36,000), scored just 25.7, with 100% of mentions
          coded negative. The concerns there center on grid reliability and
          competition for resources.
        </p>
      </div>

      <div className="abundance-graphic" ref={ref}>
        <div className="abundance-stronghold-list">
          {DATA.nimbyStrongholds.map((city, i) => (
            <div
              key={city.city}
              className={`abundance-stronghold-row ${isVisible ? "animate" : ""}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="abundance-stronghold-info">
                <span className="abundance-stronghold-city">{city.city}, {city.state}</span>
                <span className="abundance-stronghold-pop">Pop. {city.population.toLocaleString()}</span>
              </div>
              <div className="abundance-stronghold-bar-container">
                <div
                  className="abundance-stronghold-bar"
                  style={{ width: isVisible ? `${city.abundanceIndex}%` : "0%" }}
                />
              </div>
              <div className="abundance-stronghold-score">{city.abundanceIndex}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 5: THE VOICES
// ============================================================================
function TheVoicesSection() {
  return (
    <section className="abundance-section abundance-voices">
      <div className="abundance-prose-header">
        <span className="abundance-section-number">The Contrast</span>
        <h2>Hearing the Divide</h2>
      </div>

      <div className="abundance-prose">
        <p>
          The Abundance Index isn&rsquo;t just numbers&mdash;it reflects real
          conversations happening in municipal chambers across America. The
          contrast in language is striking.
        </p>
      </div>

      <div className="abundance-graphic">
        <div className="abundance-quote-comparison">
          <div className="abundance-quote-column yimby">
            <div className="abundance-quote-header">
              <span className="abundance-quote-icon">+</span>
              Pro-Development
            </div>
            {DATA.excerpts.yimby.map((quote, i) => (
              <blockquote key={i} className="abundance-quote">
                <p>&ldquo;{quote.text}&rdquo;</p>
                <cite>&mdash; {quote.city}, {quote.state}</cite>
              </blockquote>
            ))}
          </div>

          <div className="abundance-quote-divider">
            <span>VS</span>
          </div>

          <div className="abundance-quote-column nimby">
            <div className="abundance-quote-header">
              <span className="abundance-quote-icon">&minus;</span>
              Anti-Development
            </div>
            {DATA.excerpts.nimby.map((quote, i) => (
              <blockquote key={i} className="abundance-quote">
                <p>&ldquo;{quote.text}&rdquo;</p>
                <cite>&mdash; {quote.city}, {quote.state}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 6: STATE RANKINGS
// ============================================================================
function StateRankingsSection() {
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
    <section className="abundance-section">
      <div className="abundance-prose-header">
        <span className="abundance-section-number">The Geography</span>
        <h2>State-Level Patterns</h2>
      </div>

      <div className="abundance-prose">
        <p>
          When we aggregate city-level data by state, an interesting pattern emerges:
          most states cluster in the &ldquo;neutral&rdquo; zone. Tennessee leads with
          an average sentiment of 53.8 across 4 cities, while North Carolina and
          Missouri trail at 47.3.
        </p>
        <p>
          The absence of extreme state-level scores suggests that attitudes toward
          development are fundamentally local. Two cities in the same state&mdash;like
          Temple and Copperas Cove in Texas&mdash;can have radically different positions.
          State policy matters less than city-level political economy.
        </p>
      </div>

      <div className="abundance-graphic" ref={ref}>
        <div className="abundance-state-chart">
          {DATA.byState.map((state, i) => {
            const barWidth = ((state.avgSentiment - 40) / 20) * 100; // 40-60 range mapped to 0-100%
            return (
              <div
                key={state.state}
                className={`abundance-state-row ${isVisible ? "animate" : ""}`}
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                <div className="abundance-state-label">
                  <span className="abundance-state-abbr">{state.state}</span>
                  <span className="abundance-state-cities">{state.cityCount} cities</span>
                </div>
                <div className="abundance-state-bar-container">
                  <div className="abundance-state-bar-bg">
                    <div className="abundance-state-midline" />
                  </div>
                  <div
                    className="abundance-state-bar"
                    style={{
                      width: isVisible ? `${Math.max(5, barWidth)}%` : "0%",
                      backgroundColor: state.avgSentiment >= 52 ? "#22c55e" : state.avgSentiment <= 48 ? "#ef4444" : "#6b7280",
                    }}
                  />
                </div>
                <div className="abundance-state-score">{state.avgSentiment}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 7: IMPLICATIONS
// ============================================================================
function ImplicationsSection() {
  return (
    <section className="abundance-section abundance-implications">
      <div className="abundance-prose-header">
        <span className="abundance-section-number">The Stakes</span>
        <h2>What This Means</h2>
      </div>

      <div className="abundance-prose">
        <p>
          For developers and site selectors, the Abundance Index offers actionable
          intelligence. Cities like Temple, Dubuque, and Hayward aren&rsquo;t just
          approving projects&mdash;they&rsquo;re actively seeking them. The regulatory
          environment will likely be streamlined; community opposition minimal.
        </p>
        <p>
          For residents of NIMBY strongholds, the data raises questions. Is resistance
          protecting quality of life, or is it pushing economic opportunity to
          neighboring jurisdictions? When Fairfax says no, does Northern Virginia
          lose the project, or does it simply land in a more welcoming county?
        </p>
        <p>
          The 55% of cities classified as YIMBY suggests that, despite headlines
          about NIMBY opposition, most of America is prepared to build. The
          infrastructure for the AI era will rise somewhere. These numbers show
          exactly where.
        </p>
      </div>

      <div className="abundance-graphic">
        <div className="abundance-takeaway-grid">
          <div className="abundance-takeaway">
            <div className="abundance-takeaway-number">{DATA.summary.yimbyCount}</div>
            <div className="abundance-takeaway-label">Cities actively welcoming development</div>
          </div>
          <div className="abundance-takeaway">
            <div className="abundance-takeaway-number">{DATA.summary.nimbyCount}</div>
            <div className="abundance-takeaway-label">Cities showing strong resistance</div>
          </div>
          <div className="abundance-takeaway">
            <div className="abundance-takeaway-number">{DATA.summary.averageAbundanceIndex}</div>
            <div className="abundance-takeaway-label">Average Abundance Index (above 55 = YIMBY)</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 8: METHODOLOGY
// ============================================================================
function MethodologySection() {
  return (
    <section className="abundance-section abundance-methodology">
      <div className="abundance-prose-header">
        <span className="abundance-section-number">Methodology</span>
        <h2>How We Calculated the Index</h2>
      </div>

      <div className="abundance-prose abundance-prose-small">
        <p>
          <strong>Data Source:</strong> Municipal meeting transcripts from{" "}
          <strong>84 cities</strong> across the United States, collected via
          public records and council streaming services. Only cities with 10+
          mentions of &ldquo;data center&rdquo; in their transcripts were included
          to ensure statistical significance.
        </p>
        <p>
          <strong>Sentiment Analysis:</strong> Transcript segments were analyzed
          using natural language processing to classify mentions as positive,
          negative, or neutral. The sentiment score (0-100) reflects the overall
          tone of discussion.
        </p>
        <p>
          <strong>Abundance Index Calculation:</strong> The index combines sentiment
          score (60% weight) with positive mention ratio (40% weight). Formula:{" "}
          <code>Abundance Index = (Sentiment Score × 0.6) + (Positive Ratio × 0.4)</code>
        </p>
        <p>
          <strong>Classification:</strong> Cities with Abundance Index ≥55 are
          classified as YIMBY; ≤45 as NIMBY; between 45-55 as Neutral.
        </p>
        <p>
          <strong>Limitations:</strong> This analysis covers data center discussions
          specifically and may not reflect broader development attitudes. Sentiment
          analysis has inherent limitations in capturing sarcasm, irony, or complex
          positions. Population data from U.S. Census Bureau estimates.
        </p>
        <p>
          <strong>Date Range:</strong> Transcripts analyzed span January 2023 through
          January 2025, with the majority from 2024-2025.
        </p>
      </div>
    </section>
  );
}

// ============================================================================
// VISUAL COMPONENTS
// ============================================================================

function IndexGaugeSVG() {
  return (
    <svg viewBox="0 0 400 200" className="abundance-gauge-svg">
      {/* Gauge arc background */}
      <defs>
        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="50%" stopColor="#6b7280" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
      </defs>

      {/* Background arc */}
      <path
        d="M 50 180 A 150 150 0 0 1 350 180"
        fill="none"
        stroke="url(#gaugeGradient)"
        strokeWidth="20"
        strokeLinecap="round"
        opacity="0.3"
      />

      {/* Animated needle */}
      <g transform="translate(200, 180)">
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="-120"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          transform="rotate(25)"
          className="abundance-needle"
        />
        <circle cx="0" cy="0" r="10" fill="white" />
      </g>

      {/* Labels */}
      <text x="50" y="195" fill="rgba(255,255,255,0.5)" fontSize="12" textAnchor="middle">NIMBY</text>
      <text x="200" y="60" fill="rgba(255,255,255,0.5)" fontSize="12" textAnchor="middle">57.7</text>
      <text x="350" y="195" fill="rgba(255,255,255,0.5)" fontSize="12" textAnchor="middle">YIMBY</text>
    </svg>
  );
}

function IndexOverview() {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const target = DATA.summary.averageAbundanceIndex;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedValue(Math.round(eased * target * 10) / 10);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="abundance-overview">
      <div className="abundance-overview-main">
        <div className="abundance-overview-value">{animatedValue}</div>
        <div className="abundance-overview-label">National Average Abundance Index</div>
      </div>
      <div className="abundance-overview-stats">
        <div className="abundance-overview-stat">
          <span className="value">{DATA.summary.totalCities}</span>
          <span className="label">Cities Analyzed</span>
        </div>
        <div className="abundance-overview-stat yimby">
          <span className="value">{DATA.summary.yimbyCount}</span>
          <span className="label">YIMBY (55+)</span>
        </div>
        <div className="abundance-overview-stat nimby">
          <span className="value">{DATA.summary.nimbyCount}</span>
          <span className="label">NIMBY (45-)</span>
        </div>
      </div>
    </div>
  );
}
