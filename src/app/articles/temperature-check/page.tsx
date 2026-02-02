"use client";

/**
 * The Temperature Check
 *
 * Editorial Article - Where Local Politics Runs Hot
 * Measuring civic friction and contention across America
 */

import { useEffect, useRef, useState } from "react";

// Real data from our analysis of 438 cities with friction metrics
const DATA = {
  summary: {
    totalCities: 438,
    avgOverallScore: 85.3,
    avgContentionRate: 90.4,
    avgOppositionFrequency: 76.5,
  },
  // Cities with highest friction/contention
  hottestCities: [
    { city: "Sparks", state: "NV", overallScore: 100, contentionRate: 100, oppositionFrequency: 100, meetings: 9 },
    { city: "Tiffin", state: "OH", overallScore: 100, contentionRate: 100, oppositionFrequency: 100, meetings: 12 },
    { city: "High Point", state: "NC", overallScore: 100, contentionRate: 100, oppositionFrequency: 100, meetings: 9 },
    { city: "Dalton", state: "GA", overallScore: 100, contentionRate: 100, oppositionFrequency: 100, meetings: 12 },
    { city: "Moore", state: "OK", overallScore: 100, contentionRate: 100, oppositionFrequency: 100, meetings: 10 },
    { city: "Roseburg", state: "OR", overallScore: 100, contentionRate: 100, oppositionFrequency: 100, meetings: 11 },
  ],
  // Cities with lowest friction (most calm)
  calmestCities: [
    { city: "Grants Pass", state: "OR", overallScore: 38.2, contentionRate: 28.3, oppositionFrequency: 0, meetings: 10 },
    { city: "Highland Park", state: "IL", overallScore: 41.4, contentionRate: 40.3, oppositionFrequency: 0, meetings: 10 },
    { city: "Cupertino", state: "CA", overallScore: 46.3, contentionRate: 36.5, oppositionFrequency: 11.3, meetings: 9 },
    { city: "Sumner", state: "WA", overallScore: 46.8, contentionRate: 51.2, oppositionFrequency: 27.9, meetings: 10 },
    { city: "Nampa", state: "ID", overallScore: 49.8, contentionRate: 60.2, oppositionFrequency: 26.2, meetings: 10 },
  ],
  // State-level patterns
  byState: [
    { state: "NM", cityCount: 3, avgContention: 100, avgOpposition: 94.3 },
    { state: "KY", cityCount: 6, avgContention: 99.2, avgOpposition: 92.6 },
    { state: "MO", cityCount: 8, avgContention: 98.4, avgOpposition: 73.2 },
    { state: "AL", cityCount: 7, avgContention: 98.0, avgOpposition: 96.4 },
    { state: "MS", cityCount: 6, avgContention: 97.4, avgOpposition: 94.7 },
    { state: "LA", cityCount: 5, avgContention: 96.8, avgOpposition: 88.4 },
    { state: "WA", cityCount: 12, avgContention: 73.1, avgOpposition: 47.2 },
    { state: "CA", cityCount: 45, avgContention: 81.4, avgOpposition: 62.8 },
    { state: "OR", cityCount: 8, avgContention: 76.2, avgOpposition: 51.3 },
  ],
};

export default function TemperatureCheckArticle() {
  return (
    <main className="temp-article">
      <HeroSection />
      <LedeSection />
      <TheMetricsSection />
      <HottestCitiesSection />
      <CalmestCitiesSection />
      <StatePatternSection />
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
    <header className="temp-hero">
      <div className="temp-hero-bg">
        <div className="temp-hero-gradient" style={{ transform: `scale(${scale})` }} />
        <div className="temp-hero-pattern" style={{ opacity: opacity * 0.1 }} />
      </div>

      <div className="temp-hero-content" style={{ opacity, transform: `translateY(${translateY}px)` }}>
        <div className="temp-badge">
          <span className="temp-badge-dot" />
          From The District
        </div>

        <h1 className="temp-hero-title">
          <span className="temp-title-line">The Temperature</span>
          <span className="temp-title-line temp-title-accent">Check</span>
        </h1>

        <p className="temp-hero-subtitle">
          Mapping civic friction&mdash;where local debates run hot and where consensus reigns
        </p>
      </div>

      <div className="temp-hero-visual" style={{ opacity: opacity * 0.6, transform: `translateY(${translateY * 0.5}px)` }}>
        <ThermometerSVG />
      </div>

      <div className="temp-scroll-cue" style={{ opacity }}>
        <div className="temp-scroll-line" />
        <span>Scroll to explore</span>
      </div>
    </header>
  );
}

// ============================================================================
// SECTION 1: THE LEDE
// ============================================================================
function LedeSection() {
  return (
    <section className="temp-section temp-lede">
      <div className="temp-prose">
        <p>
          In Grants Pass, Oregon, city council meetings are a model of civility.
          Opposition speakers are rare. Debates are brief. The contention rate&mdash;our
          measure of adversarial discussion&mdash;sits at just 28%, the lowest in our
          dataset.
        </p>
        <p>
          Seven hundred miles southeast, in Sparks, Nevada, the atmosphere is different.
          Every meeting we analyzed featured opposition. Every discussion turned
          contentious. The friction score: a perfect 100.
        </p>
        <p>
          We&rsquo;ve analyzed meeting transcripts from <strong>438 cities</strong>,
          measuring how often debates turn adversarial, how frequently opposition
          emerges, and how intense discussions become. The result: a new way to
          understand where local democracy runs smooth&mdash;and where it boils over.
        </p>
      </div>

      <div className="temp-graphic">
        <FrictionOverview />
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 2: THE METRICS
// ============================================================================
function TheMetricsSection() {
  return (
    <section className="temp-section">
      <div className="temp-prose-header">
        <span className="temp-section-number">The Method</span>
        <h2>Measuring Civic Heat</h2>
      </div>

      <div className="temp-prose">
        <p>
          Our Friction Index combines three signals. <strong>Contention Rate</strong>
          measures what percentage of discussion blocks contain adversarial language&mdash;disagreement,
          criticism, or challenge. <strong>Opposition Frequency</strong> tracks how
          often speakers explicitly oppose proposals. <strong>Discussion Intensity</strong>
          captures the volume and length of debate per agenda item.
        </p>
        <p>
          A city scoring 100 on the overall index isn&rsquo;t necessarily dysfunctional&mdash;it
          may simply have engaged citizens who show up and speak out. But understanding
          where friction concentrates can help developers anticipate challenges, help
          activists find kindred spirits, and help journalists identify stories.
        </p>
      </div>

      <div className="temp-graphic">
        <div className="temp-metrics-grid">
          <div className="temp-metric-card">
            <div className="temp-metric-icon hot">🌡️</div>
            <div className="temp-metric-value">{DATA.summary.avgContentionRate}%</div>
            <div className="temp-metric-label">Avg Contention Rate</div>
            <div className="temp-metric-desc">Adversarial language in discussions</div>
          </div>
          <div className="temp-metric-card">
            <div className="temp-metric-icon">✋</div>
            <div className="temp-metric-value">{DATA.summary.avgOppositionFrequency}%</div>
            <div className="temp-metric-label">Avg Opposition</div>
            <div className="temp-metric-desc">Meetings with explicit opposition</div>
          </div>
          <div className="temp-metric-card">
            <div className="temp-metric-icon">{DATA.summary.totalCities}</div>
            <div className="temp-metric-value">Cities</div>
            <div className="temp-metric-label">Analyzed</div>
            <div className="temp-metric-desc">Across all 50 states</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 3: HOTTEST CITIES
// ============================================================================
function HottestCitiesSection() {
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
    <section className="temp-section temp-hot-section">
      <div className="temp-prose-header">
        <span className="temp-section-number">The Hotspots</span>
        <h2>Where Debates Run Hottest</h2>
      </div>

      <div className="temp-prose">
        <p>
          Six cities in our dataset achieved the maximum friction score of 100:
          Sparks, Nevada; Tiffin, Ohio; High Point, North Carolina; Dalton, Georgia;
          Moore, Oklahoma; and Roseburg, Oregon.
        </p>
        <p>
          These cities share a pattern: every meeting features opposition, every
          discussion turns contentious. Whether this reflects healthy democratic
          engagement or toxic political culture depends on context local reporters
          can investigate.
        </p>
        <p>
          Notable: these aren&rsquo;t just large cities with complex issues. Tiffin
          (population 17,000) and Dalton (34,000) are small cities where local politics
          apparently runs just as hot as anywhere else.
        </p>
      </div>

      <div className="temp-graphic" ref={ref}>
        <div className="temp-heat-list">
          {DATA.hottestCities.map((city, i) => (
            <div
              key={city.city}
              className={`temp-heat-row hot ${isVisible ? "animate" : ""}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="temp-heat-rank">#{i + 1}</div>
              <div className="temp-heat-info">
                <span className="temp-heat-city">{city.city}, {city.state}</span>
                <span className="temp-heat-meetings">{city.meetings} meetings analyzed</span>
              </div>
              <div className="temp-heat-bars">
                <div className="temp-heat-bar-row">
                  <span className="temp-heat-label">Contention</span>
                  <div className="temp-heat-bar-bg">
                    <div
                      className="temp-heat-bar"
                      style={{ width: isVisible ? `${city.contentionRate}%` : "0%" }}
                    />
                  </div>
                  <span className="temp-heat-value">{city.contentionRate}%</span>
                </div>
                <div className="temp-heat-bar-row">
                  <span className="temp-heat-label">Opposition</span>
                  <div className="temp-heat-bar-bg">
                    <div
                      className="temp-heat-bar opposition"
                      style={{ width: isVisible ? `${city.oppositionFrequency}%` : "0%" }}
                    />
                  </div>
                  <span className="temp-heat-value">{city.oppositionFrequency}%</span>
                </div>
              </div>
              <div className="temp-heat-score">{city.overallScore}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 4: CALMEST CITIES
// ============================================================================
function CalmestCitiesSection() {
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
    <section className="temp-section temp-calm-section">
      <div className="temp-prose-header">
        <span className="temp-section-number">The Cool Zones</span>
        <h2>Where Consensus Reigns</h2>
      </div>

      <div className="temp-prose">
        <p>
          At the other extreme sits Grants Pass, Oregon, with a friction score of
          just 38.2&mdash;the lowest in our dataset. Highland Park, Illinois (41.4)
          and Cupertino, California (46.3) follow close behind.
        </p>
        <p>
          In Grants Pass, opposition speakers appeared in exactly zero of the meetings
          we analyzed. In Highland Park, same story. Cupertino saw opposition in
          about 11% of meetings&mdash;still far below the national average of 76%.
        </p>
        <p>
          The calm-city list skews toward wealthy suburbs (Highland Park, Cupertino)
          and smaller Western cities (Grants Pass, Sumner). Whether this reflects
          genuine consensus or selective participation is worth investigating.
        </p>
      </div>

      <div className="temp-graphic" ref={ref}>
        <div className="temp-calm-list">
          {DATA.calmestCities.map((city, i) => (
            <div
              key={city.city}
              className={`temp-calm-row ${isVisible ? "animate" : ""}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="temp-calm-info">
                <span className="temp-calm-city">{city.city}, {city.state}</span>
                <span className="temp-calm-meetings">{city.meetings} meetings</span>
              </div>
              <div className="temp-calm-bar-container">
                <div
                  className="temp-calm-bar"
                  style={{ width: isVisible ? `${city.overallScore}%` : "0%" }}
                />
              </div>
              <div className="temp-calm-score">{city.overallScore}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 5: STATE PATTERNS
// ============================================================================
function StatePatternSection() {
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
    <section className="temp-section">
      <div className="temp-prose-header">
        <span className="temp-section-number">The Geography</span>
        <h2>Regional Friction Patterns</h2>
      </div>

      <div className="temp-prose">
        <p>
          Aggregating to the state level reveals a pattern: the South runs hot.
          New Mexico, Kentucky, Alabama, and Mississippi all show average contention
          rates above 97%. Louisiana follows close behind.
        </p>
        <p>
          The Pacific Northwest trends cooler. Washington averages 73% contention,
          Oregon 76%. California sits in the middle at 81%&mdash;lower than the
          Southern states but still above the national average.
        </p>
        <p>
          These regional patterns may reflect cultural differences in political
          engagement, or structural factors like meeting formats and public comment
          rules.
        </p>
      </div>

      <div className="temp-graphic" ref={ref}>
        <div className="temp-state-chart">
          {DATA.byState.map((state, i) => (
            <div
              key={state.state}
              className={`temp-state-row ${isVisible ? "animate" : ""}`}
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <div className="temp-state-label">
                <span className="temp-state-abbr">{state.state}</span>
                <span className="temp-state-count">{state.cityCount} cities</span>
              </div>
              <div className="temp-state-bar-container">
                <div
                  className="temp-state-bar"
                  style={{
                    width: isVisible ? `${state.avgContention}%` : "0%",
                    backgroundColor: state.avgContention >= 95 ? "#ef4444" : state.avgContention >= 80 ? "#f59e0b" : "#22c55e",
                  }}
                />
              </div>
              <div className="temp-state-score">{state.avgContention}%</div>
            </div>
          ))}
        </div>
        <div className="temp-state-legend">
          <span className="hot">🔴 High friction (95%+)</span>
          <span className="medium">🟡 Moderate (80-95%)</span>
          <span className="cool">🟢 Low friction (&lt;80%)</span>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 6: IMPLICATIONS
// ============================================================================
function ImplicationsSection() {
  return (
    <section className="temp-section temp-implications">
      <div className="temp-prose-header">
        <span className="temp-section-number">The Stakes</span>
        <h2>What Friction Means</h2>
      </div>

      <div className="temp-prose">
        <p>
          High friction isn&rsquo;t inherently bad. Engaged citizens who show up,
          speak out, and challenge proposals are the lifeblood of local democracy.
          A city with zero opposition might indicate apathy, not harmony.
        </p>
        <p>
          But for anyone working with local government&mdash;developers, activists,
          reporters&mdash;friction scores offer predictive value. A project in
          Grants Pass will face a different reception than one in Sparks. Understanding
          these patterns before engagement can inform strategy.
        </p>
        <p>
          The data also raises questions. Why do some states consistently run hotter
          than others? Why do wealthy suburbs tend toward consensus? What
          explains cities like Tiffin and Dalton, where every meeting becomes
          contentious?
        </p>
        <p>
          These are questions for local journalists and researchers to investigate.
          We&rsquo;ve provided the map. The stories behind the numbers await discovery.
        </p>
      </div>

      <div className="temp-graphic">
        <div className="temp-takeaway-grid">
          <div className="temp-takeaway hot">
            <div className="temp-takeaway-number">{DATA.hottestCities.length}</div>
            <div className="temp-takeaway-label">Cities at maximum friction (100)</div>
          </div>
          <div className="temp-takeaway cool">
            <div className="temp-takeaway-number">{DATA.calmestCities.length}</div>
            <div className="temp-takeaway-label">Cities below 50 friction score</div>
          </div>
          <div className="temp-takeaway">
            <div className="temp-takeaway-number">{DATA.summary.avgOverallScore}</div>
            <div className="temp-takeaway-label">National average friction score</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 7: METHODOLOGY
// ============================================================================
function MethodologySection() {
  return (
    <section className="temp-section temp-methodology">
      <div className="temp-prose-header">
        <span className="temp-section-number">Methodology</span>
        <h2>How We Measured Friction</h2>
      </div>

      <div className="temp-prose temp-prose-small">
        <p>
          <strong>Data Source:</strong> Meeting transcripts from 438 cities analyzed
          using natural language processing. We processed transcript segments to
          identify adversarial language patterns, opposition statements, and
          discussion intensity.
        </p>
        <p>
          <strong>Contention Rate:</strong> Percentage of discussion blocks containing
          adversarial language (disagreement, criticism, challenge). Measured on a
          0-100 scale.
        </p>
        <p>
          <strong>Opposition Frequency:</strong> Percentage of meetings where at
          least one speaker explicitly opposed a proposal. Also 0-100 scale.
        </p>
        <p>
          <strong>Overall Friction Score:</strong> Weighted combination of contention
          rate (60%) and opposition frequency (40%), normalized to 0-100.
        </p>
        <p>
          <strong>Minimum Coverage:</strong> Only cities with 9+ meetings analyzed
          were included to ensure statistical reliability.
        </p>
        <p>
          <strong>Limitations:</strong> Transcript quality varies by city. Some
          municipalities don&rsquo;t transcribe all meetings or may edit transcripts.
          Our NLP models may misclassify some language as adversarial. Friction
          scores should be interpreted as indicators, not definitive measures.
        </p>
        <p>
          <strong>Date Range:</strong> Transcripts analyzed span 2023 through
          January 2025.
        </p>
      </div>
    </section>
  );
}

// ============================================================================
// VISUAL COMPONENTS
// ============================================================================

function ThermometerSVG() {
  return (
    <svg viewBox="0 0 100 200" className="temp-thermometer-svg">
      {/* Thermometer body */}
      <rect x="35" y="20" width="30" height="140" rx="15" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />

      {/* Mercury bulb */}
      <circle cx="50" cy="170" r="20" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />

      {/* Mercury fill (animated) */}
      <rect x="42" y="50" width="16" height="110" rx="8" fill="#ef4444" className="temp-mercury">
        <animate attributeName="height" from="0" to="110" dur="2s" begin="0.5s" fill="freeze" />
        <animate attributeName="y" from="160" to="50" dur="2s" begin="0.5s" fill="freeze" />
      </rect>
      <circle cx="50" cy="170" r="15" fill="#ef4444" />

      {/* Temperature marks */}
      <line x1="70" y1="40" x2="80" y2="40" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <line x1="70" y1="70" x2="80" y2="70" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <line x1="70" y1="100" x2="80" y2="100" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <line x1="70" y1="130" x2="80" y2="130" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />

      {/* Labels */}
      <text x="85" y="44" fill="rgba(255,255,255,0.4)" fontSize="8">HOT</text>
      <text x="85" y="134" fill="rgba(255,255,255,0.4)" fontSize="8">COOL</text>
    </svg>
  );
}

function FrictionOverview() {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const target = DATA.summary.avgOverallScore;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * target * 10) / 10);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="temp-overview">
      <div className="temp-overview-main">
        <div className="temp-overview-value">{animatedScore}</div>
        <div className="temp-overview-label">National Average Friction Score</div>
        <div className="temp-overview-scale">
          <span>0 = Calm</span>
          <span>100 = Hot</span>
        </div>
      </div>
      <div className="temp-overview-stats">
        <div className="temp-overview-stat">
          <span className="value">{DATA.summary.totalCities}</span>
          <span className="label">Cities Analyzed</span>
        </div>
        <div className="temp-overview-stat hot">
          <span className="value">{DATA.hottestCities.length}</span>
          <span className="label">At Max Friction</span>
        </div>
        <div className="temp-overview-stat cool">
          <span className="value">{DATA.calmestCities.length}</span>
          <span className="label">Below 50</span>
        </div>
      </div>
    </div>
  );
}
