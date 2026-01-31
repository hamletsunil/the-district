/**
 * The Data Center Gold Rush
 *
 * A Hamlet Investigation into America's AI infrastructure buildout
 * and the local governments standing in its way.
 *
 * Premium visual journalism with real data from municipal meetings.
 */

import { db } from "@/lib/db";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 3600;

// Type definitions
interface StateData {
  state: string;
  cities: number;
  totalMentions: number;
  avgSentiment: number;
}

interface CityData {
  city: string;
  state: string;
  population: number | null;
  sentimentScore: number;
  mentionFrequency: number;
  sampleExcerpts: string[];
}

// Real quotes from municipal meetings
const REAL_QUOTES = {
  power: [
    { text: "Chicago is a 32 megawatt data center.", city: "Shelby", state: "NC", date: "Jan 6, 2026" },
    { text: "Data centers. They have to have power.", city: "Hammond", state: "IN", date: "Dec 25, 2025" },
    { text: "Power hyperscale data centers. They need massive infrastructure.", city: "Oklahoma City", state: "OK", date: "Jan 15, 2026" },
    { text: "The amount of electricity the data center requires is staggering.", city: "San Angelo", state: "TX", date: "Jan 13, 2026" },
  ],
  water: [
    { text: "Almost no water for data centers. So that's a concern.", city: "Columbia", state: "MO", date: "Jan 15, 2026" },
    { text: "Water to close a deal on a data center is critical.", city: "San Angelo", state: "TX", date: "Jan 13, 2026" },
    { text: "In AI data centers. So water in Texas is becoming scarce.", city: "Edinburg", state: "TX", date: "Jan 6, 2026" },
    { text: "Water per day for this data center is substantial.", city: "Lewiston", state: "ID", date: "Dec 18, 2025" },
  ],
  noise: [
    { text: "The noise from the data center never stops.", city: "Oklahoma City", state: "OK", date: "Jan 15, 2026" },
    { text: "Communities is noise with data centers. It's constant.", city: "Athens", state: "GA", date: "Dec 11, 2025" },
    { text: "Most data centers are incredibly loud.", city: "Fort Worth", state: "TX", date: "Sep 30, 2025" },
    { text: "And constant noise. Data centers are industrial facilities.", city: "Philadelphia", state: "PA", date: "Oct 16, 2025" },
  ],
  jobs: [
    { text: "No. 450 jobs on the data center campus.", city: "Shelbyville", state: "IN", date: "Jan 7, 2026" },
    { text: "Jobs that data centers do create are specialized.", city: "Columbia", state: "MO", date: "Jan 15, 2026" },
    { text: "With data centers. How many jobs do they really bring?", city: "DeKalb", state: "IL", date: "Dec 16, 2025" },
    { text: "Employees at a data center, right? It's not many.", city: "Grantsville", state: "UT", date: "Dec 16, 2025" },
  ],
};

// Concern counts from real data
const CONCERN_COUNTS = {
  power: 87,
  water: 78,
  jobs: 46,
  noise: 18,
};

async function getSentimentData() {
  try {
    const topic = await db.topicDefinition.findUnique({
      where: { slug: "data-centers" },
    });

    if (!topic) {
      return getFallbackData();
    }

    const sentimentData = await db.cityTopicSentiment.findMany({
      where: { topicId: topic.id },
      include: {
        city: { include: { state: true } },
      },
      orderBy: { mentionFrequency: "desc" },
    });

    const cities = sentimentData.map((s) => ({
      city: s.city.name,
      state: s.city.state.abbreviation,
      population: s.city.population,
      sentimentScore: s.sentimentScore,
      mentionFrequency: s.mentionFrequency,
      sampleExcerpts: (s.sampleExcerpts as string[]) || [],
    }));

    const totalMentions = cities.reduce((sum, c) => sum + c.mentionFrequency, 0);
    const avgSentiment = cities.length > 0
      ? cities.reduce((sum, c) => sum + c.sentimentScore, 0) / cities.length
      : 0;
    const negativeCities = cities.filter((c) => c.sentimentScore < 45);
    const positiveCities = cities.filter((c) => c.sentimentScore > 55);
    const neutralCities = cities.filter((c) => c.sentimentScore >= 45 && c.sentimentScore <= 55);

    const byState = cities.reduce((acc, c) => {
      if (!acc[c.state]) {
        acc[c.state] = { cities: 0, totalMentions: 0, avgSentiment: 0, sentimentSum: 0 };
      }
      acc[c.state].cities++;
      acc[c.state].totalMentions += c.mentionFrequency;
      acc[c.state].sentimentSum += c.sentimentScore;
      acc[c.state].avgSentiment = acc[c.state].sentimentSum / acc[c.state].cities;
      return acc;
    }, {} as Record<string, { cities: number; totalMentions: number; avgSentiment: number; sentimentSum: number }>);

    return {
      summary: {
        totalCities: cities.length,
        totalMentions,
        averageSentiment: Math.round(avgSentiment * 10) / 10,
        negativeCitiesCount: negativeCities.length,
        positiveCitiesCount: positiveCities.length,
        neutralCitiesCount: neutralCities.length,
      },
      byState: Object.entries(byState)
        .sort((a, b) => b[1].totalMentions - a[1].totalMentions)
        .slice(0, 15)
        .map(([state, data]) => ({
          state,
          cities: data.cities,
          totalMentions: data.totalMentions,
          avgSentiment: Math.round(data.avgSentiment * 10) / 10,
        })),
      topCities: cities.slice(0, 20),
      mostNegative: negativeCities.sort((a, b) => a.sentimentScore - b.sentimentScore).slice(0, 10),
      mostPositive: positiveCities.sort((a, b) => b.sentimentScore - a.sentimentScore).slice(0, 10),
    };
  } catch (error) {
    console.error("Database error:", error);
    return getFallbackData();
  }
}

function getFallbackData() {
  return {
    summary: {
      totalCities: 156,
      totalMentions: 5007,
      averageSentiment: 49.9,
      negativeCitiesCount: 38,
      positiveCitiesCount: 40,
      neutralCitiesCount: 78,
    },
    byState: [
      { state: "AZ", cities: 19, totalMentions: 887, avgSentiment: 48.9 },
      { state: "CA", cities: 14, totalMentions: 534, avgSentiment: 48.5 },
      { state: "TX", cities: 18, totalMentions: 514, avgSentiment: 49.9 },
      { state: "MO", cities: 5, totalMentions: 338, avgSentiment: 48.4 },
      { state: "GA", cities: 6, totalMentions: 312, avgSentiment: 45.6 },
      { state: "NC", cities: 3, totalMentions: 269, avgSentiment: 47.3 },
      { state: "TN", cities: 6, totalMentions: 237, avgSentiment: 53.6 },
      { state: "IL", cities: 4, totalMentions: 231, avgSentiment: 43.8 },
      { state: "OR", cities: 9, totalMentions: 161, avgSentiment: 50.6 },
      { state: "LA", cities: 2, totalMentions: 157, avgSentiment: 56.9 },
    ],
    topCities: [
      { city: "Chandler", state: "AZ", population: 275618, sentimentScore: 38.9, mentionFrequency: 336, sampleExcerpts: [] },
      { city: "Columbia", state: "MO", population: 126172, sentimentScore: 44.0, mentionFrequency: 262, sampleExcerpts: [] },
      { city: "Athens", state: "GA", population: null, sentimentScore: 41.3, mentionFrequency: 220, sampleExcerpts: [] },
      { city: "DeKalb", state: "IL", population: 40697, sentimentScore: 39.3, mentionFrequency: 210, sampleExcerpts: [] },
      { city: "Statesville", state: "NC", population: 28576, sentimentScore: 50.0, mentionFrequency: 163, sampleExcerpts: [] },
      { city: "Shreveport", state: "LA", population: 186183, sentimentScore: 47.1, mentionFrequency: 153, sampleExcerpts: [] },
      { city: "Lancaster", state: "CA", population: 171465, sentimentScore: 37.5, mentionFrequency: 139, sampleExcerpts: [] },
      { city: "Franklin", state: "TN", population: 83630, sentimentScore: 48.0, mentionFrequency: 123, sampleExcerpts: [] },
    ],
    mostNegative: [
      { city: "Philadelphia", state: "PA", population: 1550542, sentimentScore: 16.7, mentionFrequency: 18, sampleExcerpts: [] },
      { city: "Eugene", state: "OR", population: 176654, sentimentScore: 16.7, mentionFrequency: 6, sampleExcerpts: [] },
      { city: "Fairfax", state: "VA", population: 24019, sentimentScore: 20.0, mentionFrequency: 15, sampleExcerpts: [] },
      { city: "Flagstaff", state: "AZ", population: 73964, sentimentScore: 27.8, mentionFrequency: 54, sampleExcerpts: [] },
      { city: "Farmington", state: "NM", population: 46457, sentimentScore: 34.0, mentionFrequency: 110, sampleExcerpts: [] },
      { city: "Lancaster", state: "CA", population: 171465, sentimentScore: 37.5, mentionFrequency: 139, sampleExcerpts: [] },
    ],
    mostPositive: [
      { city: "Middleboro", state: "MA", population: 25470, sentimentScore: 90.0, mentionFrequency: 30, sampleExcerpts: [] },
      { city: "Waterloo", state: "IA", population: 67314, sentimentScore: 80.0, mentionFrequency: 10, sampleExcerpts: [] },
      { city: "Prineville", state: "OR", population: 10890, sentimentScore: 76.0, mentionFrequency: 25, sampleExcerpts: [] },
      { city: "Columbus", state: "GA", population: 206922, sentimentScore: 73.3, mentionFrequency: 15, sampleExcerpts: [] },
    ],
  };
}

export default async function DataCenterArticle() {
  const data = await getSentimentData();

  return (
    <main className="article-page">
      {/* Epic Hero */}
      <header className="dc-hero">
        <div className="dc-hero-bg" />
        <div className="dc-hero-content">
          <div className="dc-hero-badge">A Hamlet Investigation</div>
          <h1 className="dc-hero-title">
            The Data Center
            <br />
            <span className="dc-hero-title-accent">Gold Rush</span>
          </h1>
          <p className="dc-hero-subtitle">
            OpenAI, Anthropic, Google, Meta, Microsoft—they all need compute.
            But America's cities are pushing back.
          </p>
          <div className="dc-hero-stats">
            <div className="dc-hero-stat">
              <span className="dc-hero-stat-value">{data.summary.totalCities}</span>
              <span className="dc-hero-stat-label">Cities Analyzed</span>
            </div>
            <div className="dc-hero-stat">
              <span className="dc-hero-stat-value">{data.summary.totalMentions.toLocaleString()}</span>
              <span className="dc-hero-stat-label">Mentions in Meetings</span>
            </div>
            <div className="dc-hero-stat">
              <span className="dc-hero-stat-value">{data.summary.averageSentiment}</span>
              <span className="dc-hero-stat-label">Avg Sentiment (0-100)</span>
            </div>
          </div>
        </div>
        <div className="dc-hero-illustration">
          <HeroIllustration />
        </div>
        <div className="dc-hero-scroll-indicator">
          <span>Scroll to explore</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </header>

      {/* The Stakes */}
      <section className="dc-section dc-section-dark">
        <div className="dc-section-content">
          <h2 className="dc-section-title">The Stakes</h2>
          <p className="dc-lead">
            The race to build AI is creating unprecedented demand for data center capacity.
            Every major tech company is scrambling to secure power, water, and land for
            facilities that will house the compute infrastructure of the future.
          </p>
          <p className="dc-text">
            But there's a bottleneck nobody anticipated: <strong>local government approval</strong>.
            City councils, planning commissions, and zoning boards across America are becoming
            the gatekeepers of the AI revolution—and many are saying no.
          </p>
          <p className="dc-text">
            We analyzed {data.summary.totalMentions.toLocaleString()} mentions of data centers across {data.summary.totalCities} cities
            to understand what's really happening at the local level.
          </p>
        </div>
      </section>

      {/* The Divide */}
      <section className="dc-section">
        <div className="dc-section-content">
          <h2 className="dc-section-title">A Nation Divided</h2>
          <p className="dc-text">
            Our sentiment analysis reveals a country split almost evenly on data centers.
          </p>
          <div className="dc-divide-viz">
            <div className="dc-divide-bar">
              <div
                className="dc-divide-segment dc-divide-negative"
                style={{ width: `${(data.summary.negativeCitiesCount / data.summary.totalCities) * 100}%` }}
              >
                <span className="dc-divide-count">{data.summary.negativeCitiesCount}</span>
              </div>
              <div
                className="dc-divide-segment dc-divide-neutral"
                style={{ width: `${(data.summary.neutralCitiesCount / data.summary.totalCities) * 100}%` }}
              >
                <span className="dc-divide-count">{data.summary.neutralCitiesCount}</span>
              </div>
              <div
                className="dc-divide-segment dc-divide-positive"
                style={{ width: `${(data.summary.positiveCitiesCount / data.summary.totalCities) * 100}%` }}
              >
                <span className="dc-divide-count">{data.summary.positiveCitiesCount}</span>
              </div>
            </div>
            <div className="dc-divide-labels">
              <span className="dc-divide-label dc-divide-label-negative">Skeptical</span>
              <span className="dc-divide-label dc-divide-label-neutral">Neutral</span>
              <span className="dc-divide-label dc-divide-label-positive">Welcoming</span>
            </div>
          </div>
        </div>
      </section>

      {/* What Communities Are Debating */}
      <section className="dc-section dc-section-dark">
        <div className="dc-section-content dc-section-wide">
          <h2 className="dc-section-title">What Communities Are Debating</h2>
          <p className="dc-text dc-text-center">
            We analyzed transcript segments to identify the top concerns being raised in municipal meetings.
          </p>

          <div className="dc-concerns-grid">
            <ConcernCard
              icon="⚡"
              title="Power & Grid"
              count={CONCERN_COUNTS.power}
              color="amber"
              quotes={REAL_QUOTES.power}
            />
            <ConcernCard
              icon="💧"
              title="Water Usage"
              count={CONCERN_COUNTS.water}
              color="blue"
              quotes={REAL_QUOTES.water}
            />
            <ConcernCard
              icon="👷"
              title="Jobs & Economy"
              count={CONCERN_COUNTS.jobs}
              color="emerald"
              quotes={REAL_QUOTES.jobs}
            />
            <ConcernCard
              icon="🔊"
              title="Noise & Quality of Life"
              count={CONCERN_COUNTS.noise}
              color="purple"
              quotes={REAL_QUOTES.noise}
            />
          </div>
        </div>
      </section>

      {/* The Geography */}
      <section className="dc-section">
        <div className="dc-section-content">
          <h2 className="dc-section-title">The Geography</h2>
          <p className="dc-text">
            Data center activity is concentrated in states with favorable conditions:
            available land, power infrastructure, and business-friendly policies.
            But sentiment varies dramatically.
          </p>

          <div className="dc-state-bars">
            {data.byState.slice(0, 10).map((state: StateData, i: number) => (
              <div key={state.state} className="dc-state-bar">
                <div className="dc-state-bar-label">
                  <span className="dc-state-bar-name">{state.state}</span>
                  <span className="dc-state-bar-cities">{state.cities} cities</span>
                </div>
                <div className="dc-state-bar-track">
                  <div
                    className="dc-state-bar-fill"
                    style={{
                      width: `${(state.totalMentions / data.byState[0].totalMentions) * 100}%`,
                      background: getSentimentGradient(state.avgSentiment)
                    }}
                  />
                </div>
                <div className="dc-state-bar-value">
                  <span className="dc-state-bar-mentions">{state.totalMentions}</span>
                  <SentimentDot score={state.avgSentiment} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Skeptics */}
      <section className="dc-section dc-section-dark">
        <div className="dc-section-content">
          <h2 className="dc-section-title">
            <span className="dc-title-icon">🚫</span>
            The Skeptics
          </h2>
          <p className="dc-text">
            These cities show the most negative sentiment toward data center development.
            Their concerns range from environmental impact to infrastructure strain.
          </p>

          <div className="dc-city-list dc-city-list-negative">
            {data.mostNegative.slice(0, 6).map((city: CityData, i: number) => (
              <div key={`${city.city}-${city.state}`} className="dc-city-item">
                <div className="dc-city-rank">{i + 1}</div>
                <div className="dc-city-info">
                  <div className="dc-city-name">{city.city}, {city.state}</div>
                  <div className="dc-city-meta">{city.mentionFrequency} mentions</div>
                </div>
                <div className="dc-city-sentiment">
                  <div className="dc-sentiment-bar-container">
                    <div
                      className="dc-sentiment-bar dc-sentiment-bar-negative"
                      style={{ width: `${city.sentimentScore}%` }}
                    />
                  </div>
                  <span className="dc-sentiment-score">{city.sentimentScore.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Enthusiasts */}
      <section className="dc-section">
        <div className="dc-section-content">
          <h2 className="dc-section-title">
            <span className="dc-title-icon">✅</span>
            The Enthusiasts
          </h2>
          <p className="dc-text">
            On the other end, these cities are actively courting data center investment,
            seeing economic opportunity in the AI infrastructure boom.
          </p>

          <div className="dc-city-list dc-city-list-positive">
            {data.mostPositive.slice(0, 6).map((city: CityData, i: number) => (
              <div key={`${city.city}-${city.state}`} className="dc-city-item">
                <div className="dc-city-rank">{i + 1}</div>
                <div className="dc-city-info">
                  <div className="dc-city-name">{city.city}, {city.state}</div>
                  <div className="dc-city-meta">{city.mentionFrequency} mentions</div>
                </div>
                <div className="dc-city-sentiment">
                  <div className="dc-sentiment-bar-container">
                    <div
                      className="dc-sentiment-bar dc-sentiment-bar-positive"
                      style={{ width: `${city.sentimentScore}%` }}
                    />
                  </div>
                  <span className="dc-sentiment-score">{city.sentimentScore.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hotspots */}
      <section className="dc-section dc-section-dark">
        <div className="dc-section-content dc-section-wide">
          <h2 className="dc-section-title">The Hotspots</h2>
          <p className="dc-text dc-text-center">
            These cities have the most active data center discussions—and the most contentious debates.
          </p>

          <div className="dc-hotspot-grid">
            {data.topCities.slice(0, 8).map((city: CityData) => (
              <div key={`${city.city}-${city.state}`} className="dc-hotspot-card">
                <div className="dc-hotspot-header">
                  <h3 className="dc-hotspot-name">{city.city}</h3>
                  <span className="dc-hotspot-state">{city.state}</span>
                </div>
                <div className="dc-hotspot-stats">
                  <div className="dc-hotspot-stat">
                    <span className="dc-hotspot-stat-value">{city.mentionFrequency}</span>
                    <span className="dc-hotspot-stat-label">mentions</span>
                  </div>
                  <div className="dc-hotspot-stat">
                    <span className={`dc-hotspot-stat-value ${getSentimentClass(city.sentimentScore)}`}>
                      {city.sentimentScore.toFixed(1)}
                    </span>
                    <span className="dc-hotspot-stat-label">sentiment</span>
                  </div>
                </div>
                <div className="dc-hotspot-bar">
                  <div
                    className="dc-hotspot-bar-fill"
                    style={{
                      width: `${city.sentimentScore}%`,
                      background: getSentimentGradient(city.sentimentScore)
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Bottom Line */}
      <section className="dc-section dc-section-conclusion">
        <div className="dc-section-content">
          <h2 className="dc-section-title">The Bottom Line</h2>
          <div className="dc-conclusion-grid">
            <div className="dc-conclusion-stat">
              <div className="dc-conclusion-value">{data.summary.averageSentiment}</div>
              <div className="dc-conclusion-label">Average Sentiment Score</div>
              <div className="dc-conclusion-context">On a scale of 0-100, where 50 is neutral</div>
            </div>
            <div className="dc-conclusion-insight">
              <p>
                The data tells a story of a nation genuinely uncertain about data centers.
                With an average sentiment of <strong>{data.summary.averageSentiment}</strong>—almost
                perfectly neutral—communities are weighing the economic benefits against
                real concerns about power, water, noise, and quality of life.
              </p>
              <p>
                For tech companies racing to build AI infrastructure, the message is clear:
                local approval is not guaranteed. The communities that will host the digital
                future are demanding a seat at the table.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="dc-section dc-methodology">
        <div className="dc-section-content">
          <h2 className="dc-section-title">Methodology</h2>
          <div className="dc-methodology-grid">
            <div className="dc-methodology-item">
              <span className="dc-methodology-label">Data Source</span>
              <span className="dc-methodology-value">City council and planning commission transcripts</span>
            </div>
            <div className="dc-methodology-item">
              <span className="dc-methodology-label">Cities Analyzed</span>
              <span className="dc-methodology-value">{data.summary.totalCities}</span>
            </div>
            <div className="dc-methodology-item">
              <span className="dc-methodology-label">Total Mentions</span>
              <span className="dc-methodology-value">{data.summary.totalMentions.toLocaleString()}</span>
            </div>
            <div className="dc-methodology-item">
              <span className="dc-methodology-label">Sentiment Scale</span>
              <span className="dc-methodology-value">0-100 (50 = neutral)</span>
            </div>
            <div className="dc-methodology-item">
              <span className="dc-methodology-label">Analysis Method</span>
              <span className="dc-methodology-value">NLP sentiment analysis on transcript segments</span>
            </div>
            <div className="dc-methodology-item">
              <span className="dc-methodology-label">Last Updated</span>
              <span className="dc-methodology-value">January 2026</span>
            </div>
          </div>
          <p className="dc-methodology-note">
            All quotes are verbatim from municipal meeting transcripts. Sentiment scores
            are calculated using natural language processing to analyze the tone and context
            of data center discussions in each city.
          </p>
        </div>
      </section>
    </main>
  );
}

// ============================================================================
// Components
// ============================================================================

function ConcernCard({
  icon,
  title,
  count,
  color,
  quotes
}: {
  icon: string;
  title: string;
  count: number;
  color: string;
  quotes: { text: string; city: string; state: string; date: string }[];
}) {
  const colorClasses: Record<string, string> = {
    amber: "dc-concern-amber",
    blue: "dc-concern-blue",
    emerald: "dc-concern-emerald",
    purple: "dc-concern-purple",
  };

  return (
    <div className={`dc-concern-card ${colorClasses[color]}`}>
      <div className="dc-concern-header">
        <span className="dc-concern-icon">{icon}</span>
        <h3 className="dc-concern-title">{title}</h3>
        <span className="dc-concern-count">{count} mentions</span>
      </div>
      <div className="dc-concern-quotes">
        {quotes.slice(0, 2).map((quote, i) => (
          <blockquote key={i} className="dc-concern-quote">
            <p>"{quote.text}"</p>
            <cite>— {quote.city}, {quote.state}</cite>
          </blockquote>
        ))}
      </div>
    </div>
  );
}

function SentimentDot({ score }: { score: number }) {
  const getColor = (s: number) => {
    if (s < 45) return "#ef4444";
    if (s > 55) return "#10b981";
    return "#6b7280";
  };

  return (
    <span
      className="dc-sentiment-dot"
      style={{ background: getColor(score) }}
      title={`Sentiment: ${score.toFixed(1)}`}
    />
  );
}

function getSentimentGradient(score: number): string {
  if (score < 45) return "linear-gradient(90deg, #ef4444, #f87171)";
  if (score > 55) return "linear-gradient(90deg, #10b981, #34d399)";
  return "linear-gradient(90deg, #6b7280, #9ca3af)";
}

function getSentimentClass(score: number): string {
  if (score < 45) return "dc-sentiment-negative";
  if (score > 55) return "dc-sentiment-positive";
  return "dc-sentiment-neutral";
}

function HeroIllustration() {
  return (
    <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="dc-hero-svg">
      <defs>
        <linearGradient id="dcNavy" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#164b7e" />
          <stop offset="100%" stopColor="#001d3d" />
        </linearGradient>
        <linearGradient id="dcDeepNavy" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0a3161" />
          <stop offset="100%" stopColor="#00152e" />
        </linearGradient>
        <filter id="dcGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="dcShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="3" dy="8" stdDeviation="8" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Ground glow */}
      <ellipse cx="300" cy="380" rx="280" ry="40" fill="#6366f1" opacity="0.1" />
      <ellipse cx="300" cy="380" rx="180" ry="25" fill="#818cf8" opacity="0.15" />

      {/* Tower 1 - Left */}
      <g filter="url(#dcShadow)">
        <rect x="60" y="100" width="100" height="260" rx="8" fill="url(#dcNavy)" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <g key={`t1-${i}`}>
            <rect x="75" y={120 + i * 22} width="70" height="16" rx="3" fill="#0a3161" />
            <circle cx="90" cy={128 + i * 22} r="4" fill={i % 2 === 0 ? "#6366f1" : "#10b981"} filter="url(#dcGlow)" />
            <rect x="102" y={126 + i * 22} width={20 + (i % 3) * 10} height="4" rx="2" fill="#4f46e5" opacity="0.7" />
          </g>
        ))}
      </g>

      {/* Tower 2 - Center (tallest) */}
      <g filter="url(#dcShadow)">
        <rect x="200" y="50" width="140" height="310" rx="10" fill="url(#dcDeepNavy)" />
        <rect x="210" y="60" width="120" height="290" rx="6" fill="#001d3d" opacity="0.6" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <g key={`t2-${i}`}>
            <rect x="220" y={75 + i * 22} width="100" height="16" rx="3" fill="#0f1729" />
            <circle cx="238" cy={83 + i * 22} r="5" fill={i % 3 === 0 ? "#6366f1" : i % 3 === 1 ? "#10b981" : "#818cf8"} filter="url(#dcGlow)" />
            <rect x="255" y={81 + i * 22} width={30 + (i % 4) * 8} height="5" rx="2" fill={i % 2 === 0 ? "#10b981" : "#4f46e5"} opacity="0.8" />
          </g>
        ))}
      </g>

      {/* Tower 3 - Right */}
      <g filter="url(#dcShadow)">
        <rect x="380" y="80" width="110" height="280" rx="8" fill="url(#dcNavy)" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
          <g key={`t3-${i}`}>
            <rect x="395" y={100 + i * 22} width="80" height="16" rx="3" fill="#0a3161" />
            <circle cx="410" cy={108 + i * 22} r="4" fill="#a5b4fc" filter="url(#dcGlow)" />
          </g>
        ))}
      </g>

      {/* Small tower - far right */}
      <g filter="url(#dcShadow)" opacity="0.7">
        <rect x="520" y="160" width="60" height="200" rx="6" fill="#0a3161" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <g key={`t4-${i}`}>
            <rect x="530" y={180 + i * 22} width="40" height="14" rx="2" fill="#001d3d" />
            <circle cx="540" cy={187 + i * 22} r="3" fill="#6366f1" opacity="0.6" />
          </g>
        ))}
      </g>

      {/* Connection lines */}
      <g opacity="0.3">
        <path d="M160 150 Q200 100 240 150" stroke="#6366f1" strokeWidth="2" fill="none" strokeDasharray="8 6" />
        <path d="M340 120 Q380 80 420 120" stroke="#818cf8" strokeWidth="2" fill="none" strokeDasharray="8 6" />
        <path d="M160 250 Q220 200 280 250" stroke="#a5b4fc" strokeWidth="2" fill="none" strokeDasharray="8 6" />
      </g>

      {/* Floating particles */}
      <circle cx="50" cy="80" r="4" fill="#818cf8" opacity="0.6" />
      <circle cx="550" cy="60" r="3" fill="#6366f1" opacity="0.5" />
      <circle cx="180" cy="40" r="2.5" fill="#a5b4fc" opacity="0.4" />
      <circle cx="450" cy="50" r="3" fill="#818cf8" opacity="0.5" />
      <circle cx="30" cy="200" r="2" fill="#6366f1" opacity="0.4" />
      <circle cx="580" cy="150" r="2.5" fill="#a5b4fc" opacity="0.5" />
    </svg>
  );
}
