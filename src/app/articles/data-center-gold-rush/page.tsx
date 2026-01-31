"use client";

/**
 * The Data Center Gold Rush
 *
 * Premium Visual Journalism - Mind-Blowing Edition
 * Scroll-triggered animations, custom charts, epic transitions
 */

import { useEffect, useRef, useState } from "react";

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
  quotes: {
    power: [
      { text: "Chicago is a 32 megawatt data center.", city: "Shelby, NC" },
      { text: "The amount of electricity the data center requires is staggering.", city: "San Angelo, TX" },
    ],
    water: [
      { text: "Almost no water for data centers. So that's a concern.", city: "Columbia, MO" },
      { text: "Water in Texas is becoming scarce with AI data centers.", city: "Edinburg, TX" },
    ],
    noise: [
      { text: "The noise from the data center never stops.", city: "Oklahoma City, OK" },
      { text: "Most data centers are incredibly loud.", city: "Fort Worth, TX" },
    ],
    jobs: [
      { text: "450 jobs on the data center campus.", city: "Shelbyville, IN" },
      { text: "How many jobs do they really bring?", city: "DeKalb, IL" },
    ],
  },
};

export default function DataCenterArticle() {
  return (
    <main className="dc-article">
      <HeroSection />
      <StatsReel />
      <NationDivide />
      <ConcernsSection />
      <StateBreakdown />
      <CityBattleground />
      <VoicesSection />
      <Conclusion />
      <Methodology />
    </main>
  );
}

// ============================================================================
// HERO SECTION - Epic entrance
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
          A Hamlet Investigation
        </div>

        <h1 className="dc-hero-title-epic">
          <span className="dc-title-line dc-title-line-1">The Data Center</span>
          <span className="dc-title-line dc-title-line-2">Gold Rush</span>
        </h1>

        <p className="dc-hero-tagline">
          156 cities. 5,007 mentions. One question:<br />
          <strong>Who decides where America's AI infrastructure lives?</strong>
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
// STATS REEL - Animated counters
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
    <section ref={ref} className="dc-stats-reel">
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
    </section>
  );
}

function AnimatedStat({
  value,
  label,
  isVisible,
  delay = 0,
  suffix = "",
  format = "default"
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
      <span className="dc-stat-number">{displayValue}{suffix}</span>
      <span className="dc-stat-label">{label}</span>
    </div>
  );
}

// ============================================================================
// NATION DIVIDE - Epic visualization
// ============================================================================
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
    <section ref={ref} className="dc-nation-section">
      <div className="dc-section-header">
        <h2 className="dc-section-title-large">A Nation Divided</h2>
        <p className="dc-section-subtitle">
          How 156 cities feel about data center development
        </p>
      </div>

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

      <div className="dc-insight-callout">
        <div className="dc-insight-number">49.9</div>
        <div className="dc-insight-text">
          Average sentiment score—almost perfectly neutral.
          <br />
          <strong>America is genuinely undecided.</strong>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// CONCERNS SECTION - Animated bars
// ============================================================================
function ConcernsSection() {
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
    { key: "power", label: "Power & Grid", icon: "⚡", count: DATA.concernCounts.power, color: "#f59e0b" },
    { key: "water", label: "Water Usage", icon: "💧", count: DATA.concernCounts.water, color: "#3b82f6" },
    { key: "jobs", label: "Jobs & Economy", icon: "👷", count: DATA.concernCounts.jobs, color: "#10b981" },
    { key: "noise", label: "Noise Impact", icon: "🔊", count: DATA.concernCounts.noise, color: "#8b5cf6" },
  ];

  const maxCount = Math.max(...concerns.map(c => c.count));

  return (
    <section ref={ref} className="dc-concerns-section">
      <div className="dc-section-header">
        <h2 className="dc-section-title-large">What Communities Debate</h2>
        <p className="dc-section-subtitle">
          The top concerns raised in municipal meetings
        </p>
      </div>

      <div className="dc-concerns-chart">
        {concerns.map((concern, i) => (
          <div key={concern.key} className="dc-concern-row">
            <div className="dc-concern-label">
              <span className="dc-concern-icon">{concern.icon}</span>
              <span className="dc-concern-name">{concern.label}</span>
            </div>
            <div className="dc-concern-bar-container">
              <div
                className={`dc-concern-bar-fill ${isVisible ? "animate" : ""}`}
                style={{
                  width: isVisible ? `${(concern.count / maxCount) * 100}%` : "0%",
                  backgroundColor: concern.color,
                  transitionDelay: `${i * 0.15}s`
                }}
              />
              <span
                className={`dc-concern-count ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 0.15 + 0.5}s` }}
              >
                {concern.count}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="dc-quotes-grid">
        {Object.entries(DATA.quotes).slice(0, 2).map(([key, quotes]) => (
          <blockquote key={key} className="dc-featured-quote">
            <p>"{quotes[0].text}"</p>
            <cite>— {quotes[0].city}</cite>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// STATE BREAKDOWN - Animated chart
// ============================================================================
function StateBreakdown() {
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
    <section ref={ref} className="dc-state-section">
      <div className="dc-section-header">
        <h2 className="dc-section-title-large">The Geography</h2>
        <p className="dc-section-subtitle">
          Where the data center debate is loudest
        </p>
      </div>

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
                  background: getSentimentGradient(state.sentiment)
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
    </section>
  );
}

// ============================================================================
// CITY BATTLEGROUND - Scatter-like visualization
// ============================================================================
function CityBattleground() {
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
    <section ref={ref} className="dc-battleground-section">
      <div className="dc-section-header">
        <h2 className="dc-section-title-large">The Battleground</h2>
        <p className="dc-section-subtitle">
          Cities with the most active—and contentious—debates
        </p>
      </div>

      <div className="dc-city-scatter">
        {DATA.topCities.map((city, i) => {
          const size = 40 + (city.mentions / 10);
          const left = 10 + (city.sentiment - 30) * 1.3;
          const top = 15 + (i * 10) + (Math.sin(i * 2) * 5);

          return (
            <div
              key={city.city}
              className={`dc-city-bubble ${isVisible ? "visible" : ""}`}
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                top: `${top}%`,
                backgroundColor: getSentimentColor(city.sentiment),
                transitionDelay: `${i * 0.1}s`,
                opacity: isVisible ? 0.9 : 0,
                transform: isVisible ? "scale(1)" : "scale(0)",
              }}
            >
              <div className="dc-bubble-tooltip">
                <strong>{city.city}, {city.state}</strong>
                <span>{city.mentions} mentions</span>
                <span>Sentiment: {city.sentiment}</span>
              </div>
            </div>
          );
        })}

        <div className="dc-scatter-axis-x">
          <span>← More Skeptical</span>
          <span>More Welcoming →</span>
        </div>
      </div>

      <div className="dc-city-cards">
        {DATA.topCities.slice(0, 4).map((city, i) => (
          <div
            key={city.city}
            className={`dc-city-card ${isVisible ? "visible" : ""}`}
            style={{ transitionDelay: `${0.5 + i * 0.1}s` }}
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
                  background: getSentimentGradient(city.sentiment)
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// VOICES SECTION - Scrolling quotes
// ============================================================================
function VoicesSection() {
  const allQuotes = [
    ...DATA.quotes.power.map(q => ({ ...q, type: "power" })),
    ...DATA.quotes.water.map(q => ({ ...q, type: "water" })),
    ...DATA.quotes.noise.map(q => ({ ...q, type: "noise" })),
    ...DATA.quotes.jobs.map(q => ({ ...q, type: "jobs" })),
  ];

  return (
    <section className="dc-voices-section">
      <div className="dc-section-header">
        <h2 className="dc-section-title-large">In Their Own Words</h2>
        <p className="dc-section-subtitle">
          Verbatim quotes from city council and planning commission meetings
        </p>
      </div>

      <div className="dc-voices-scroll">
        <div className="dc-voices-track">
          {[...allQuotes, ...allQuotes].map((quote, i) => (
            <div key={i} className="dc-voice-card">
              <blockquote>"{quote.text}"</blockquote>
              <cite>— {quote.city}</cite>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// CONCLUSION
// ============================================================================
function Conclusion() {
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

        <div className="dc-conclusion-text">
          <p>
            The data tells a story of a nation genuinely uncertain.
          </p>
          <p>
            With an average sentiment almost perfectly neutral, communities are
            weighing economic benefits against real concerns about power, water,
            noise, and quality of life.
          </p>
          <p className="dc-conclusion-kicker">
            For tech companies racing to build AI infrastructure, the message is clear:
            <strong> local approval is not guaranteed.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// METHODOLOGY
// ============================================================================
function Methodology() {
  return (
    <section className="dc-methodology-section">
      <h2>Methodology</h2>
      <div className="dc-methodology-grid">
        <div className="dc-methodology-item">
          <span className="dc-meth-label">Data Source</span>
          <span className="dc-meth-value">City council & planning commission transcripts</span>
        </div>
        <div className="dc-methodology-item">
          <span className="dc-meth-label">Cities Analyzed</span>
          <span className="dc-meth-value">156</span>
        </div>
        <div className="dc-methodology-item">
          <span className="dc-meth-label">Total Mentions</span>
          <span className="dc-meth-value">5,007</span>
        </div>
        <div className="dc-methodology-item">
          <span className="dc-meth-label">Analysis</span>
          <span className="dc-meth-value">NLP sentiment scoring (0-100)</span>
        </div>
      </div>
      <p className="dc-methodology-note">
        All quotes are verbatim from municipal meeting transcripts collected by Hamlet.
      </p>
    </section>
  );
}

// ============================================================================
// HELPER COMPONENTS & FUNCTIONS
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
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Ground glow */}
      <ellipse cx="400" cy="480" rx="350" ry="50" fill="#6366f1" opacity="0.1"/>

      {/* Tower 1 */}
      <g className="dc-tower dc-tower-1">
        <rect x="80" y="120" width="120" height="350" rx="8" fill="url(#towerGrad1)"/>
        {[...Array(14)].map((_, i) => (
          <g key={i}>
            <rect x="95" y={140 + i * 24} width="90" height="18" rx="3" fill="#0a1628"/>
            <circle cx="110" cy={149 + i * 24} r="4" fill={i % 2 === 0 ? "#6366f1" : "#10b981"} filter="url(#glow)"/>
            <rect x="125" y={147 + i * 24} width={30 + (i % 3) * 15} height="4" rx="2" fill="#4f46e5" opacity="0.6"/>
          </g>
        ))}
      </g>

      {/* Tower 2 - Tallest */}
      <g className="dc-tower dc-tower-2">
        <rect x="280" y="60" width="160" height="410" rx="10" fill="url(#towerGrad2)"/>
        <rect x="295" y="75" width="130" height="380" rx="6" fill="#0a1628" opacity="0.5"/>
        {[...Array(16)].map((_, i) => (
          <g key={i}>
            <rect x="305" y={90 + i * 24} width="110" height="18" rx="3" fill="#061020"/>
            <circle cx="325" cy={99 + i * 24} r="5" fill={i % 3 === 0 ? "#6366f1" : i % 3 === 1 ? "#10b981" : "#818cf8"} filter="url(#glow)"/>
            <rect x="345" y={97 + i * 24} width={40 + (i % 4) * 10} height="5" rx="2" fill={i % 2 === 0 ? "#10b981" : "#4f46e5"} opacity="0.7"/>
          </g>
        ))}
      </g>

      {/* Tower 3 */}
      <g className="dc-tower dc-tower-3">
        <rect x="520" y="100" width="130" height="370" rx="8" fill="url(#towerGrad1)"/>
        {[...Array(15)].map((_, i) => (
          <g key={i}>
            <rect x="535" y={120 + i * 24} width="100" height="18" rx="3" fill="#0a1628"/>
            <circle cx="550" cy={129 + i * 24} r="4" fill="#a5b4fc" filter="url(#glow)"/>
          </g>
        ))}
      </g>

      {/* Tower 4 - Small */}
      <g className="dc-tower dc-tower-4">
        <rect x="700" y="200" width="80" height="270" rx="6" fill="url(#towerGrad2)" opacity="0.7"/>
        {[...Array(10)].map((_, i) => (
          <g key={i}>
            <rect x="710" y={220 + i * 24} width="60" height="16" rx="2" fill="#0a1628"/>
            <circle cx="720" cy={228 + i * 24} r="3" fill="#6366f1" opacity="0.6"/>
          </g>
        ))}
      </g>

      {/* Connection lines */}
      <g opacity="0.2">
        <path d="M200 180 Q280 120 320 180" stroke="#6366f1" strokeWidth="2" strokeDasharray="8 6" fill="none"/>
        <path d="M440 150 Q500 100 550 150" stroke="#818cf8" strokeWidth="2" strokeDasharray="8 6" fill="none"/>
        <path d="M650 250 Q680 200 720 250" stroke="#a5b4fc" strokeWidth="2" strokeDasharray="8 6" fill="none"/>
      </g>

      {/* Floating particles */}
      <circle cx="60" cy="100" r="4" fill="#818cf8" opacity="0.5" className="dc-particle"/>
      <circle cx="750" cy="80" r="3" fill="#6366f1" opacity="0.4" className="dc-particle"/>
      <circle cx="250" cy="40" r="3" fill="#a5b4fc" opacity="0.5" className="dc-particle"/>
      <circle cx="600" cy="60" r="4" fill="#818cf8" opacity="0.4" className="dc-particle"/>
    </svg>
  );
}
