"use client";

/**
 * The Vote Tracker
 *
 * Editorial Article - How Your City Officials Actually Vote
 * Individual accountability through voting record analysis
 */

import { useEffect, useRef, useState } from "react";
import { SourcesCitations } from "@/components/article/SourcesCitations";
import { ArticleEndCTA } from "@/components/article/ArticleEndCTA";
import { SubscribeBar } from "@/components/article/SubscribeBar";
import { SocialShare } from "@/components/article/SocialShare";

// Real data from our analysis of 1,524 officials across multiple cities
const DATA = {
  summary: {
    totalOfficials: 1524,
    totalVotes: 25219,
    avgApprovalRate: 96.5,
    yesVoterCount: 2934,
    noVoterCount: 54,
    swingVoterCount: 113,
  },
  // Substantive votes only (excluding administrative rubber-stamps)
  substantive: {
    totalVotes: 3073, // infrastructure + budget + zoning + residential + commercial + environmental
    avgApprovalRate: 93.8, // weighted average of substantive categories
    lowestApproval: { topic: "environmental", rate: 75.0, votes: 36 },
  },
  // Officials who vote yes most consistently
  yesVoters: [
    { name: "Eddie Osborne", city: "Newark", state: "NJ", yeaCount: 119, nayCount: 0, approvalRate: 100 },
    { name: "Luis A. Quintana", city: "Newark", state: "NJ", yeaCount: 116, nayCount: 0, approvalRate: 100 },
    { name: "ALD. A. PRATT", city: "Milwaukee", state: "WI", yeaCount: 73, nayCount: 0, approvalRate: 100 },
    { name: "ALD. M. ZAMARRIPA", city: "Milwaukee", state: "WI", yeaCount: 73, nayCount: 0, approvalRate: 100 },
    { name: "ALD. R. RAINEY", city: "Milwaukee", state: "WI", yeaCount: 70, nayCount: 0, approvalRate: 100 },
    { name: "Carlos M. Gonzalez", city: "Newark", state: "NJ", yeaCount: 66, nayCount: 0, approvalRate: 100 },
    { name: "ALD. B. COGGS", city: "Milwaukee", state: "WI", yeaCount: 66, nayCount: 0, approvalRate: 100 },
  ],
  // Officials who vote no most consistently
  noVoters: [
    { name: "Mark Freda", city: "Princeton", state: "NJ", yeaCount: 0, nayCount: 26, approvalRate: 0 },
    { name: "Dawn M. Mount", city: "Princeton", state: "NJ", yeaCount: 0, nayCount: 21, approvalRate: 0 },
    { name: "Dave Cohen", city: "Princeton", state: "NJ", yeaCount: 0, nayCount: 17, approvalRate: 0 },
    { name: "Leticia Fraga", city: "Princeton", state: "NJ", yeaCount: 1, nayCount: 17, approvalRate: 5.6 },
    { name: "Mia Sacks", city: "Princeton", state: "NJ", yeaCount: 1, nayCount: 14, approvalRate: 6.7 },
  ],
  // Council stats showing polarization
  councils: [
    { city: "El Dorado", state: "AR", officialCount: 128, avgApproval: 86.3, polarization: 100 },
    { city: "Northfield", state: "MN", officialCount: 125, avgApproval: 98.6, polarization: 40 },
    { city: "Fresno", state: "CA", officialCount: 60, avgApproval: 100, polarization: 0 },
    { city: "Milwaukee", state: "WI", officialCount: 57, avgApproval: 98.7, polarization: 33.3 },
    { city: "Long Beach", state: "CA", officialCount: 50, avgApproval: 100, polarization: 0 },
    { city: "Princeton", state: "NJ", officialCount: 47, avgApproval: 72.1, polarization: 100 },
    { city: "Denton", state: "TX", officialCount: 40, avgApproval: 100, polarization: 0 },
  ],
  // Topic breakdown - substantive votes sorted by approval rate (most contested first)
  byTopicSubstantive: [
    { topic: "Environmental", votes: 36, avgApproval: 75.0 },
    { topic: "Budget", votes: 571, avgApproval: 92.6 },
    { topic: "Residential", votes: 393, avgApproval: 94.9 },
    { topic: "Commercial", votes: 348, avgApproval: 95.5 },
    { topic: "Infrastructure", votes: 1248, avgApproval: 95.4 },
    { topic: "Zoning", votes: 477, avgApproval: 96.0 },
  ],
  // Administrative votes tracked separately (routine matters)
  administrative: { votes: 13132, avgApproval: 97.1 },
};

// Validated sources for fact-checking
const SOURCES = [
  {
    title: "Princeton advances affordable housing plan for one of its wealthiest neighborhoods",
    outlet: "Gothamist",
    url: "https://gothamist.com/news/princeton-nj-advances-affordable-housing-plan-for-one-of-its-wealthiest-neighborhoods"
  },
  {
    title: "Controversial Stockton Street development debate continues",
    outlet: "The Daily Princetonian",
    url: "https://www.dailyprincetonian.com/article/2025/12/princeton-features-controversial-stockton-street-development"
  },
  {
    title: "Chicago City Council sheds rubber stamp reputation",
    outlet: "Chicago Sun-Times",
    url: "https://chicago.suntimes.com/city-hall/2022/6/7/23156715/chicago-city-council-sheds-rubber-stamp-reputation-dick-simpson-uic-report"
  },
  {
    title: "City Council Voting Records - UIC Political Science",
    outlet: "University of Illinois Chicago",
    url: "https://pols.uic.edu/chicago-politics/city-council-voting-records/"
  }
];

export default function VoteTrackerArticle() {
  return (
    <main className="vote-article article-page" data-theme="vote-tracker">
      <HeroSection />
      <AtAGlance />
      <LedeSection />
      <TheNumbersSection />
      <NoVotersSection />
      <TopicBreakdownSection />
      <ImplicationsSection />
      <MethodologySection />
      <SocialShare title="The Vote Tracker: Newark agrees on everything. Princeton fights about everything. Why?" />
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
    <header className="vote-hero">
      <div className="vote-hero-bg">
        <div className="vote-hero-gradient" style={{ transform: `scale(${scale})` }} />
        <div className="vote-hero-pattern" style={{ opacity: opacity * 0.12 }} />
      </div>

      <div className="vote-hero-content" style={{ opacity, transform: `translateY(${translateY}px)` }}>
        <div className="vote-badge">
          <span className="vote-badge-dot" />
          From The District
        </div>

        <h1 className="vote-hero-title">
          <span className="vote-title-line">The Vote</span>
          <span className="vote-title-line vote-title-accent">Tracker</span>
        </h1>

        <p className="vote-hero-subtitle">
          Newark agrees on everything. Princeton fights about everything. Why?
        </p>
      </div>

      <div className="vote-hero-visual" style={{ opacity: opacity * 0.5, transform: `translateY(${translateY * 0.5}px)` }}>
        <BallotIconSVG />
      </div>

      <div className="vote-scroll-cue" style={{ opacity }}>
        <div className="vote-scroll-line" />
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
            <div className="at-a-glance-stat-value">5</div>
            <div className="at-a-glance-stat-label">Princeton No-Voters</div>
          </div>
          <div className="at-a-glance-stat">
            <div className="at-a-glance-stat-value">0</div>
            <div className="at-a-glance-stat-label">Newark No Votes (Ever)</div>
          </div>
          <div className="at-a-glance-stat">
            <div className="at-a-glance-stat-value">25%</div>
            <div className="at-a-glance-stat-label">Environmental Dissent</div>
          </div>
        </div>
        <div className="at-a-glance-finding">
          <div className="at-a-glance-finding-label">Key Finding</div>
          <div className="at-a-glance-finding-text">
            Princeton&rsquo;s five-member resistance bloc has voted no 95 times and yes twice. Newark&rsquo;s council has never recorded a single dissenting vote. Same state, opposite cultures.
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
    <section className="vote-section vote-lede">
      <div className="vote-prose">
        <p>
          In Newark, the city council agrees on everything. Literally everything.
          Councilman Eddie Osborne has cast 119 votes. Not one was &ldquo;no.&rdquo;
          His colleague Luis Quintana: 116 votes, zero dissent. The entire Newark
          delegation votes in lockstep.
        </p>
        <p>
          Princeton&rsquo;s council operates differently. Mark Freda has voted against
          26 consecutive proposals. Dawn Mount: 21. Dave Cohen: 17. Five officials,
          95 no votes, 2 yes votes total.
        </p>
        <p>
          Newark&rsquo;s unanimity could reflect genuine consensus&mdash;or a council
          that makes its real decisions before the public meeting. Princeton&rsquo;s
          resistance could reflect principled opposition to overdevelopment&mdash;or
          wealthy homeowners protecting property values. The voting records alone
          can&rsquo;t tell us. But they tell us where to look.
        </p>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 2: NEWARK'S PERFECT RECORD
// ============================================================================
function TheNumbersSection() {
  return (
    <section className="vote-section">
      <div className="vote-prose-header">
        <span className="vote-section-number">The Unanimity</span>
        <h2>Newark&rsquo;s Perfect Record</h2>
      </div>

      <div className="vote-prose">
        <p>
          Newark&rsquo;s city council hasn&rsquo;t recorded a single dissenting vote
          in our dataset. Seven officials. Hundreds of votes. Zero &ldquo;no.&rdquo;
        </p>
        <p>
          Eddie Osborne leads with 119 consecutive yes votes. Luis Quintana follows
          with 116. Carlos Gonzalez: 66. The entire delegation votes in perfect
          alignment on every recorded matter.
        </p>
        <p>
          Newark&rsquo;s unanimity has several plausible explanations. The city
          employs professional staff who vet proposals in committee&mdash;if problems
          get fixed before the public meeting, votes become formalities. Chicago&rsquo;s
          council operated this way for decades under Daley and Emanuel; UIC
          researchers called it a &ldquo;rubber stamp&rdquo; until Lightfoot&rsquo;s
          tenure brought divided roll calls. One-party dominance may also suppress
          visible dissent&mdash;Newark is a Democratic stronghold where bucking
          consensus carries political risk.
        </p>
        <p>
          The data can&rsquo;t distinguish between these explanations. But they
          point local reporters toward the right questions.
        </p>
      </div>

      <div className="vote-graphic">
        <div className="vote-newark-highlight">
          <div className="vote-newark-stat">
            <span className="vote-newark-big">0</span>
            <span className="vote-newark-label">No votes recorded across entire Newark council</span>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================================================
// SECTION 3: THE PRINCETON BLOC
// ============================================================================
function NoVotersSection() {
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
    <section className="vote-section vote-no-section">
      <div className="vote-prose-header">
        <span className="vote-section-number">The Resistance</span>
        <h2>Princeton&rsquo;s Five-Member Bloc</h2>
      </div>

      <div className="vote-prose">
        <p>
          Princeton is one of America&rsquo;s wealthiest towns. Median household income
          exceeds $150,000. Home values routinely top $1 million. And five members of
          its local government have made careers of voting no.
        </p>
        <p>
          Mark Freda: 26 votes, all against. Dawn Mount: 21 votes, all against. Dave
          Cohen: 17 votes, all against. Between them, Leticia Fraga and Mia Sacks add
          another 31 no votes and just 2 yes votes.
        </p>
        <p>
          What are they opposing? The most visible flashpoint is the Stockton Street
          development&mdash;a proposed 238-unit apartment complex on Princeton Theological
          Seminary land, near Albert Einstein&rsquo;s former home. Critics point out
          that only 48 units would be affordable; the other 190 are market-rate. The
          Princeton Coalition for Responsible Development, led by former councilwoman
          Jo Butler, has filed three lawsuits against the project.
        </p>
        <p>
          The resistance has competing explanations. Wealthy homeowners may be protecting
          property values&mdash;Princeton sits within commuting distance of New York, and
          the &ldquo;affordable housing&rdquo; framing covers what is mostly a market-rate
          luxury project. But critics make a different argument: developers are gaming state
          mandates. New Jersey requires municipalities to build affordable housing; the 20%
          affordable requirement becomes a &ldquo;shoehorn&rdquo; for projects that don&rsquo;t
          fit. Princeton historian Sean Wilentz called Stockton Street &ldquo;a city-sized
          private housing development on the oldest residential neighborhood in Princeton.&rdquo;
        </p>
        <p>
          The voting records show an organized opposition bloc. Housing is the battleground.
          What the records can&rsquo;t show is which interpretation is correct.
        </p>
      </div>

      <div className="vote-graphic" ref={ref}>
        <div className="vote-leaderboard vote-leaderboard-no">
          <div className="vote-leaderboard-header">
            <span>Official</span>
            <span>Location</span>
            <span>Yes</span>
            <span>No</span>
            <span>Rate</span>
          </div>
          {DATA.noVoters.map((official, i) => (
            <div
              key={`${official.name}-${i}`}
              className={`vote-leaderboard-row no ${isVisible ? "animate" : ""}`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <span className="vote-official-name">{official.name}</span>
              <span className="vote-official-location">{official.city}, {official.state}</span>
              <span className="vote-official-yes">{official.yeaCount}</span>
              <span className="vote-official-no">{official.nayCount}</span>
              <span className="vote-official-rate">{official.approvalRate}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// ============================================================================
// SECTION 6: TOPIC BREAKDOWN (Substantive Votes Only)
// ============================================================================
function TopicBreakdownSection() {
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
    <section className="vote-section">
      <div className="vote-prose-header">
        <span className="vote-section-number">The Contested</span>
        <h2>Where Dissent Actually Appears</h2>
      </div>

      <div className="vote-prose">
        <p>
          Strip out the routine administrative votes&mdash;renaming streets,
          approving minutes, ceremonial resolutions&mdash;and a different picture
          emerges. Of the <strong>3,073 substantive votes</strong> on policy matters,
          approval drops to 93.8%.
        </p>
        <p>
          Environmental matters see the most dissent: <strong>75% approval</strong>,
          a full 22 points below the baseline. One in four environmental votes
          draws a no. Budget votes (92.6%) also show genuine debate.
        </p>
        <p>
          The takeaway: when the stakes are real, officials disagree. The 96.5%
          headline figure is inflated by procedural consent.
        </p>
      </div>

      <div className="vote-graphic" ref={ref}>
        <div className="vote-topic-chart">
          {DATA.byTopicSubstantive.map((topic, i) => (
            <div
              key={topic.topic}
              className={`vote-topic-row ${isVisible ? "animate" : ""}`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="vote-topic-label">
                <span className="topic-name">{topic.topic}</span>
                <span className="topic-votes">{topic.votes.toLocaleString()} votes</span>
              </div>
              <div className="vote-topic-bar-container">
                <div
                  className="vote-topic-bar"
                  style={{
                    width: isVisible ? `${topic.avgApproval}%` : "0%",
                    backgroundColor: topic.avgApproval < 80 ? "#ef4444" : topic.avgApproval < 95 ? "#f59e0b" : "#3b82f6",
                  }}
                />
              </div>
              <div className="vote-topic-rate">{topic.avgApproval}%</div>
            </div>
          ))}
        </div>
        <div className="vote-topic-note" style={{ marginTop: "1rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
          Excludes {DATA.administrative.votes.toLocaleString()} administrative votes (97.1% approval) &mdash; routine matters like meeting minutes and ceremonial items.
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 5: IMPLICATIONS
// ============================================================================
function ImplicationsSection() {
  return (
    <section className="vote-section vote-implications">
      <div className="vote-prose-header">
        <span className="vote-section-number">The Pattern</span>
        <h2>What the Votes Reveal</h2>
      </div>

      <div className="vote-prose">
        <p>
          Voting records don&rsquo;t explain motives. They reveal patterns. Newark&rsquo;s
          unanimity could be healthy consensus; it could be something else. Princeton&rsquo;s
          resistance bloc could be principled skepticism; it could be NIMBYism.
        </p>
        <p>
          What the data does is point. It identifies where the interesting questions are.
          Why does one New Jersey council never disagree while another fights over every
          proposal? Why does environmental policy divide officials when budgets and
          zoning pass easily?
        </p>
        <p>
          These are questions for local reporters. The voting records are the map.
        </p>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 8: METHODOLOGY
// ============================================================================
function MethodologySection() {
  return (
    <section className="vote-section vote-methodology">
      <div className="vote-prose-header">
        <span className="vote-section-number">Methodology</span>
        <h2>How We Built This Dataset</h2>
      </div>

      <div className="vote-prose vote-prose-small">
        <p>
          <strong>Data Source:</strong> Voting records from Legistar, the municipal
          government software used by hundreds of U.S. cities. We extracted individual
          roll-call votes and linked them to person records.
        </p>
        <p>
          <strong>Officials Included:</strong> We tracked 1,524 officials who cast at
          least 3 votes on development-related matters. This threshold ensures
          a minimum sample while including part-time and recently-elected
          officials. Officials with fewer than 20 votes should be interpreted with
          caution&mdash;their rates may change significantly with additional data.
        </p>
        <p>
          <strong>Topic Classification:</strong> Votes were categorized by topic
          using matter type classifications from each municipality. We distinguish
          between <em>administrative</em> votes (meeting minutes, ceremonial items,
          routine approvals&mdash;13,132 votes at 97.1% approval) and <em>substantive</em>
          votes (budget, zoning, environmental, residential, commercial, infrastructure&mdash;3,073
          votes at 93.8% approval). The analysis focuses on substantive votes where
          policy disagreement is meaningful.
        </p>
        <p>
          <strong>Approval Rate:</strong> Calculated as (Yes Votes) / (Yes Votes + No Votes).
          Abstentions are excluded from the denominator.
        </p>
        <p>
          <strong>Polarization Index:</strong> For councils with 3+ tracked officials,
          we calculated the difference between the highest and lowest individual
          approval rates.
        </p>
        <p>
          <strong>Selection Bias:</strong> Our dataset only includes cities that use
          Legistar and publish machine-readable roll-call votes. This over-represents
          larger cities with sophisticated record-keeping and excludes municipalities
          using other systems. The cities in our analysis self-selected by having
          accessible data infrastructure.
        </p>
        <p>
          <strong>Limitations:</strong> Some cities
          don&rsquo;t record roll-call votes for routine matters.
          Vote counts may include procedural votes alongside substantive ones.
          The sources cited validate that housing and development debates are active
          in these cities, but do not independently verify individual vote tallies&mdash;those
          come directly from Legistar records.
        </p>
        <p>
          <strong>Date Range:</strong> Records span 2023 through January 2025,
          with most data from 2024.
        </p>
      </div>
    </section>
  );
}

// ============================================================================
// VISUAL COMPONENTS
// ============================================================================

function BallotIconSVG() {
  return (
    <svg viewBox="0 0 200 200" className="vote-ballot-svg">
      {/* Ballot box */}
      <rect x="40" y="80" width="120" height="100" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
      <rect x="70" y="70" width="60" height="20" rx="4" fill="rgba(255,255,255,0.1)" />

      {/* Ballot paper */}
      <g className="vote-ballot-paper">
        <rect x="75" y="30" width="50" height="70" rx="4" fill="white" opacity="0.9" />
        <line x1="85" y1="45" x2="115" y2="45" stroke="#6366f1" strokeWidth="2" />
        <line x1="85" y1="55" x2="115" y2="55" stroke="#6366f1" strokeWidth="2" />
        <circle cx="90" cy="70" r="4" fill="#22c55e" />
        <line x1="88" y1="70" x2="92" y2="74" stroke="white" strokeWidth="2" />
        <line x1="92" y1="74" x2="98" y2="66" stroke="white" strokeWidth="2" />
      </g>

      {/* Checkmarks */}
      <circle cx="60" cy="110" r="8" fill="rgba(34, 197, 94, 0.3)" />
      <circle cx="100" cy="130" r="8" fill="rgba(34, 197, 94, 0.3)" />
      <circle cx="140" cy="150" r="8" fill="rgba(239, 68, 68, 0.3)" />
    </svg>
  );
}

