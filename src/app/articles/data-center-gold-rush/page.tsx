/**
 * The Data Center Gold Rush
 *
 * A Hamlet Investigation into America's AI infrastructure buildout
 * and the local governments standing in its way.
 */

import { db } from "@/lib/db";

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

interface TopicInfo {
  slug: string;
  name: string;
  description: string;
}

interface SentimentSummary {
  totalCities: number;
  totalMentions: number;
  averageSentiment: number;
  negativeCitiesCount: number;
  positiveCitiesCount: number;
  neutralCitiesCount: number;
}

// Fetch data at build time
async function getSentimentData() {
  const topic = await db.topicDefinition.findUnique({
    where: { slug: "data-centers" },
  });

  if (!topic) {
    return null;
  }

  const sentimentData = await db.cityTopicSentiment.findMany({
    where: { topicId: topic.id },
    include: {
      city: {
        include: {
          state: true,
        },
      },
    },
    orderBy: { mentionFrequency: "desc" },
  });

  // Format the data
  const cities = sentimentData.map((s) => ({
    city: s.city.name,
    state: s.city.state.abbreviation,
    population: s.city.population,
    sentimentScore: s.sentimentScore,
    mentionFrequency: s.mentionFrequency,
    sampleExcerpts: (s.sampleExcerpts as string[]) || [],
  }));

  // Calculate aggregate stats
  const totalMentions = cities.reduce((sum, c) => sum + c.mentionFrequency, 0);
  const avgSentiment =
    cities.length > 0
      ? cities.reduce((sum, c) => sum + c.sentimentScore, 0) / cities.length
      : 0;
  const negativeCities = cities.filter((c) => c.sentimentScore < 45);
  const positiveCities = cities.filter((c) => c.sentimentScore > 55);
  const neutralCities = cities.filter(
    (c) => c.sentimentScore >= 45 && c.sentimentScore <= 55
  );

  // By state
  const byState = cities.reduce(
    (acc, c) => {
      if (!acc[c.state]) {
        acc[c.state] = {
          cities: 0,
          totalMentions: 0,
          avgSentiment: 0,
          sentimentSum: 0,
        };
      }
      acc[c.state].cities++;
      acc[c.state].totalMentions += c.mentionFrequency;
      acc[c.state].sentimentSum += c.sentimentScore;
      acc[c.state].avgSentiment = acc[c.state].sentimentSum / acc[c.state].cities;
      return acc;
    },
    {} as Record<
      string,
      {
        cities: number;
        totalMentions: number;
        avgSentiment: number;
        sentimentSum: number;
      }
    >
  );

  return {
    topic: {
      slug: topic.slug,
      name: topic.name,
      description: topic.description,
    },
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
    mostNegative: negativeCities
      .sort((a, b) => a.sentimentScore - b.sentimentScore)
      .slice(0, 8),
    mostPositive: positiveCities
      .sort((a, b) => b.sentimentScore - a.sentimentScore)
      .slice(0, 8),
  };
}

export default async function DataCenterArticle() {
  const data = await getSentimentData();

  if (!data) {
    return (
      <main className="article-page">
        <div className="max-w-3xl mx-auto px-6 py-24">
          <p className="text-gray-400">Data not available.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="article-page">
      {/* Hero Section */}
      <header className="article-hero">
        <div className="hero-content">
          <span className="hero-eyebrow">A Hamlet Investigation</span>
          <h1 className="hero-title">The Data Center Gold Rush</h1>
          <p className="hero-subtitle">
            {data.summary.totalCities} cities. {data.summary.totalMentions.toLocaleString()} mentions.
            Where will America's digital infrastructure live—and who gets to decide?
          </p>
          <div className="hero-meta">
            <span>January 2026</span>
            <span className="mx-2">·</span>
            <span>8 min read</span>
          </div>
        </div>
        <div className="hero-illustration">
          <DataCenterHeroIllustration />
        </div>
      </header>

      {/* Article Body */}
      <article className="article-body">
        {/* Lead Section */}
        <section className="article-section">
          <p className="article-lead">
            OpenAI needs compute. So does Anthropic, Google, Meta, and Microsoft. The race to build
            AI infrastructure has triggered an unprecedented data center construction boom—but
            there's a bottleneck nobody anticipated: local government approval.
          </p>
          <p className="article-text">
            We analyzed {data.summary.totalMentions.toLocaleString()} mentions of data centers across{" "}
            {data.summary.totalCities} cities to understand what's really happening at the local
            level. The results reveal a nation deeply divided on whether to embrace or resist the
            digital infrastructure of the future.
          </p>
        </section>

        {/* The Numbers */}
        <section className="article-section">
          <h2 className="section-title">The Numbers</h2>
          <div className="stat-grid">
            <StatCard
              value={data.summary.totalCities}
              label="Cities Discussing Data Centers"
              sublabel="From our database of municipal meetings"
            />
            <StatCard
              value={data.summary.totalMentions.toLocaleString()}
              label="Total Mentions"
              sublabel="References to data centers in transcripts"
            />
            <StatCard
              value={data.summary.averageSentiment.toFixed(1)}
              label="Average Sentiment"
              sublabel="On a scale of 0-100 (50 = neutral)"
            />
          </div>
          <div className="stat-grid mt-8">
            <SentimentCard
              value={data.summary.negativeCitiesCount}
              label="Negative-leaning cities"
              sentiment="negative"
              total={data.summary.totalCities}
            />
            <SentimentCard
              value={data.summary.neutralCitiesCount}
              label="Neutral cities"
              sentiment="neutral"
              total={data.summary.totalCities}
            />
            <SentimentCard
              value={data.summary.positiveCitiesCount}
              label="Positive-leaning cities"
              sentiment="positive"
              total={data.summary.totalCities}
            />
          </div>
        </section>

        {/* Geographic Distribution */}
        <section className="article-section">
          <h2 className="section-title">The Geography</h2>
          <p className="article-text">
            Data center discussions are concentrated in a handful of states—with Arizona, California,
            and Texas leading the conversation. These states combine favorable climate conditions,
            available land, and growing power infrastructure.
          </p>
          <div className="state-table-container">
            <table className="state-table">
              <thead>
                <tr>
                  <th>State</th>
                  <th className="text-right">Cities</th>
                  <th className="text-right">Mentions</th>
                  <th className="text-right">Avg. Sentiment</th>
                </tr>
              </thead>
              <tbody>
                {data.byState.map((state: StateData, i: number) => (
                  <tr key={state.state} className={i % 2 === 0 ? "bg-gray-800/30" : ""}>
                    <td className="font-medium">{state.state}</td>
                    <td className="text-right text-gray-400">{state.cities}</td>
                    <td className="text-right text-gray-300">{state.totalMentions}</td>
                    <td className="text-right">
                      <SentimentBadge score={state.avgSentiment} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Most Active Cities */}
        <section className="article-section">
          <h2 className="section-title">Where the Action Is</h2>
          <p className="article-text">
            Some cities are at the epicenter of the data center debate. These municipalities have
            the most active discussions—and often the most contentious.
          </p>
          <div className="city-grid">
            {data.topCities.slice(0, 12).map((city: CityData) => (
              <CityCard key={`${city.city}-${city.state}`} city={city} />
            ))}
          </div>
        </section>

        {/* The Skeptics */}
        <section className="article-section">
          <h2 className="section-title">The Skeptics</h2>
          <p className="article-text">
            Not every community is welcoming data centers with open arms. These cities show the most
            skeptical sentiment in their municipal discussions—suggesting significant local
            opposition or concerns.
          </p>
          <div className="sentiment-list">
            {data.mostNegative.map((city: CityData, i: number) => (
              <div key={`${city.city}-${city.state}`} className="sentiment-list-item negative">
                <span className="sentiment-rank">{i + 1}</span>
                <div className="sentiment-city-info">
                  <span className="sentiment-city-name">
                    {city.city}, {city.state}
                  </span>
                  <span className="sentiment-city-mentions">
                    {city.mentionFrequency} mentions
                  </span>
                </div>
                <div className="sentiment-score-container">
                  <div
                    className="sentiment-bar negative"
                    style={{ width: `${city.sentimentScore}%` }}
                  />
                  <span className="sentiment-score">{city.sentimentScore.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The Enthusiasts */}
        <section className="article-section">
          <h2 className="section-title">The Enthusiasts</h2>
          <p className="article-text">
            On the other end of the spectrum, some communities are actively courting data center
            development. These cities show the most positive sentiment in their municipal
            discussions.
          </p>
          <div className="sentiment-list">
            {data.mostPositive.map((city: CityData, i: number) => (
              <div key={`${city.city}-${city.state}`} className="sentiment-list-item positive">
                <span className="sentiment-rank">{i + 1}</span>
                <div className="sentiment-city-info">
                  <span className="sentiment-city-name">
                    {city.city}, {city.state}
                  </span>
                  <span className="sentiment-city-mentions">
                    {city.mentionFrequency} mentions
                  </span>
                </div>
                <div className="sentiment-score-container">
                  <div
                    className="sentiment-bar positive"
                    style={{ width: `${city.sentimentScore}%` }}
                  />
                  <span className="sentiment-score">{city.sentimentScore.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Methodology */}
        <section className="article-section methodology">
          <h2 className="section-title">Methodology</h2>
          <p className="article-text">
            This analysis is based on transcript data from city council meetings, planning
            commission hearings, and other municipal proceedings collected by Hamlet. Sentiment
            scores are calculated using natural language processing to analyze the tone and context
            of data center discussions.
          </p>
          <div className="methodology-details">
            <div className="methodology-item">
              <span className="methodology-label">Data Source</span>
              <span className="methodology-value">Municipal meeting transcripts</span>
            </div>
            <div className="methodology-item">
              <span className="methodology-label">Cities Analyzed</span>
              <span className="methodology-value">{data.summary.totalCities}</span>
            </div>
            <div className="methodology-item">
              <span className="methodology-label">Sentiment Scale</span>
              <span className="methodology-value">0-100 (50 = neutral)</span>
            </div>
            <div className="methodology-item">
              <span className="methodology-label">Last Updated</span>
              <span className="methodology-value">January 2026</span>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}

// ============================================================================
// Components
// ============================================================================

function StatCard({
  value,
  label,
  sublabel,
}: {
  value: string | number;
  label: string;
  sublabel: string;
}) {
  return (
    <div className="stat-card">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      <div className="stat-sublabel">{sublabel}</div>
    </div>
  );
}

function SentimentCard({
  value,
  label,
  sentiment,
  total,
}: {
  value: number;
  label: string;
  sentiment: "negative" | "neutral" | "positive";
  total: number;
}) {
  const percent = Math.round((value / total) * 100);
  const colorClass = {
    negative: "text-red-400",
    neutral: "text-gray-400",
    positive: "text-emerald-400",
  }[sentiment];

  return (
    <div className="sentiment-card">
      <div className={`sentiment-card-value ${colorClass}`}>{value}</div>
      <div className="sentiment-card-label">{label}</div>
      <div className="sentiment-card-percent">{percent}% of total</div>
    </div>
  );
}

function SentimentBadge({ score }: { score: number }) {
  const getColor = (s: number) => {
    if (s < 45) return "bg-red-500/20 text-red-400";
    if (s > 55) return "bg-emerald-500/20 text-emerald-400";
    return "bg-gray-500/20 text-gray-400";
  };

  return (
    <span className={`sentiment-badge ${getColor(score)}`}>{score.toFixed(1)}</span>
  );
}

function CityCard({ city }: { city: CityData }) {
  return (
    <div className="city-card">
      <div className="city-card-header">
        <h3 className="city-card-name">{city.city}</h3>
        <span className="city-card-state">{city.state}</span>
      </div>
      <div className="city-card-stats">
        <div className="city-card-stat">
          <span className="city-card-stat-value">{city.mentionFrequency}</span>
          <span className="city-card-stat-label">mentions</span>
        </div>
        <div className="city-card-stat">
          <SentimentBadge score={city.sentimentScore} />
          <span className="city-card-stat-label">sentiment</span>
        </div>
      </div>
      {city.sampleExcerpts && city.sampleExcerpts.length > 0 && (
        <div className="city-card-excerpt">
          "{city.sampleExcerpts[0]}..."
        </div>
      )}
    </div>
  );
}

function DataCenterHeroIllustration() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <defs>
        <linearGradient id="heroNavy" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#164b7e" />
          <stop offset="100%" stopColor="#001d3d" />
        </linearGradient>
        <filter id="heroGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="heroShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="6" stdDeviation="6" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Ground glow */}
      <ellipse cx="200" cy="280" rx="180" ry="30" fill="#6366f1" opacity="0.1" />
      <ellipse cx="200" cy="280" rx="120" ry="20" fill="#818cf8" opacity="0.15" />

      {/* Tower 1 */}
      <g filter="url(#heroShadow)">
        <rect x="40" y="80" width="80" height="180" rx="6" fill="url(#heroNavy)" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <g key={i}>
            <rect x="50" y={95 + i * 20} width="60" height="14" rx="2" fill="#0a3161" />
            <circle cx="60" cy={102 + i * 20} r="3" fill="#6366f1" filter="url(#heroGlow)" />
            <rect x="70" y={100 + i * 20} width={15 + Math.random() * 20} height="3" rx="1" fill="#4f46e5" opacity="0.7" />
          </g>
        ))}
      </g>

      {/* Tower 2 (center, tallest) */}
      <g filter="url(#heroShadow)">
        <rect x="140" y="40" width="100" height="220" rx="8" fill="#0a3161" />
        <rect x="148" y="48" width="84" height="204" rx="4" fill="#001d3d" opacity="0.6" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <g key={i}>
            <rect x="155" y={58 + i * 20} width="70" height="14" rx="2" fill="#0f1729" />
            <circle cx="167" cy={65 + i * 20} r="4" fill={i % 2 === 0 ? "#6366f1" : "#10b981"} filter="url(#heroGlow)" />
            <rect x="180" y={63 + i * 20} width={20 + Math.random() * 25} height="4" rx="2" fill={i % 3 === 0 ? "#10b981" : "#4f46e5"} opacity="0.8" />
          </g>
        ))}
      </g>

      {/* Tower 3 */}
      <g filter="url(#heroShadow)">
        <rect x="260" y="70" width="90" height="190" rx="6" fill="url(#heroNavy)" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <g key={i}>
            <rect x="270" y={85 + i * 20} width="70" height="14" rx="2" fill="#0a3161" />
            <circle cx="282" cy={92 + i * 20} r="3" fill="#a5b4fc" filter="url(#heroGlow)" />
          </g>
        ))}
      </g>

      {/* Connection lines */}
      <g opacity="0.4">
        <path d="M120 120 Q160 90 180 120" stroke="#6366f1" strokeWidth="2" fill="none" strokeDasharray="6 4" />
        <path d="M240 100 Q260 70 280 100" stroke="#818cf8" strokeWidth="2" fill="none" strokeDasharray="6 4" />
      </g>

      {/* Floating particles */}
      <circle cx="100" cy="50" r="3" fill="#818cf8" opacity="0.6" />
      <circle cx="320" cy="40" r="2" fill="#6366f1" opacity="0.5" />
      <circle cx="380" cy="80" r="2.5" fill="#a5b4fc" opacity="0.4" />
      <circle cx="20" cy="150" r="2" fill="#6366f1" opacity="0.5" />
    </svg>
  );
}
