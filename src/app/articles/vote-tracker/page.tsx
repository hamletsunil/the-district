"use client";

/**
 * The Vote Tracker
 *
 * Editorial Article - How Your City Officials Actually Vote
 * Individual accountability through voting record analysis
 */

import { useEffect, useRef, useState } from "react";

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
  // Topic breakdown
  byTopic: [
    { topic: "administrative", votes: 13132, avgApproval: 97.1 },
    { topic: "infrastructure", votes: 1248, avgApproval: 95.4 },
    { topic: "budget", votes: 571, avgApproval: 92.6 },
    { topic: "zoning", votes: 477, avgApproval: 96.0 },
    { topic: "residential", votes: 393, avgApproval: 94.9 },
    { topic: "commercial", votes: 348, avgApproval: 95.5 },
    { topic: "environmental", votes: 36, avgApproval: 75.0 },
  ],
};

export default function VoteTrackerArticle() {
  return (
    <main className="vote-article">
      <HeroSection />
      <LedeSection />
      <TheNumbersSection />
      <YesVotersSection />
      <NoVotersSection />
      <CouncilPolarizationSection />
      <TopicBreakdownSection />
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
          How your city officials actually vote&mdash;and what it reveals about local power
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
// SECTION 1: THE LEDE
// ============================================================================
function LedeSection() {
  return (
    <section className="vote-section vote-lede">
      <div className="vote-prose">
        <p>
          In Newark, New Jersey, Councilman Eddie Osborne has never voted no. Not once.
          Across 119 recorded votes on development matters, his record is perfect:
          100% approval.
        </p>
        <p>
          Thirty miles south, in Princeton, a different pattern emerges. Council member
          Mark Freda has also achieved a perfect record&mdash;but in the opposite
          direction. Of his 26 recorded votes, every single one was against.
        </p>
        <p>
          These aren&rsquo;t aberrations. They&rsquo;re the extremes of a spectrum we
          can now measure. For the first time, we&rsquo;ve compiled individual voting
          records for <strong>1,524 local officials</strong> across America, tracking{" "}
          <strong>25,219 votes</strong> on development, zoning, and infrastructure
          matters.
        </p>
        <p>
          What we found: most officials vote yes almost all the time. But the exceptions
          matter&mdash;and knowing who they are could reshape how developers, activists,
          and residents approach local politics.
        </p>
      </div>

      <div className="vote-graphic">
        <VoteOverview />
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 2: THE NUMBERS
// ============================================================================
function TheNumbersSection() {
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
        <span className="vote-section-number">The Pattern</span>
        <h2>A Culture of Yes</h2>
      </div>

      <div className="vote-prose">
        <p>
          The average official in our dataset votes yes <strong>96.5%</strong> of the
          time. This isn&rsquo;t corruption or rubber-stamping&mdash;it reflects the
          reality that most proposals reaching a formal vote have already survived
          staff review, public comment, and committee deliberation.
        </p>
        <p>
          By the time something hits the council floor, consensus has often formed.
          The real battles happen earlier, in zoning hearings and planning commissions,
          where projects get shaped, delayed, or killed before they ever face a final
          vote.
        </p>
        <p>
          This makes the officials who do vote no particularly significant. They&rsquo;re
          willing to dissent even after the machine has aligned behind approval.
        </p>
      </div>

      <div className="vote-graphic" ref={ref}>
        <div className="vote-approval-viz">
          <div className="vote-approval-bar-container">
            <div
              className={`vote-approval-bar yes ${isVisible ? "animate" : ""}`}
              style={{ width: isVisible ? "96.5%" : "0%" }}
            >
              <span>Yes Votes: 96.5%</span>
            </div>
            <div
              className={`vote-approval-bar no ${isVisible ? "animate" : ""}`}
              style={{ width: isVisible ? "3.5%" : "0%", transitionDelay: "0.3s" }}
            >
              <span>No</span>
            </div>
          </div>
          <div className="vote-approval-context">
            Based on {DATA.summary.totalVotes.toLocaleString()} votes by {DATA.summary.totalOfficials.toLocaleString()} officials
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 3: THE YES VOTERS
// ============================================================================
function YesVotersSection() {
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
    <section className="vote-section vote-yes-section">
      <div className="vote-prose-header">
        <span className="vote-section-number">The Approvers</span>
        <h2>Officials Who Say Yes</h2>
      </div>

      <div className="vote-prose">
        <p>
          Newark and Milwaukee dominate the top of our yes-voter rankings. In both
          cities, officials have cast hundreds of votes without a single dissent.
          Whether this reflects genuine consensus, strong party discipline, or something
          else is a question for local reporters to investigate.
        </p>
        <p>
          What we can say: if you&rsquo;re a developer seeking approval in these
          jurisdictions, the data suggests you&rsquo;ll face minimal council-level
          resistance once your project clears staff review.
        </p>
      </div>

      <div className="vote-graphic" ref={ref}>
        <div className="vote-leaderboard">
          <div className="vote-leaderboard-header">
            <span>Official</span>
            <span>Location</span>
            <span>Yes</span>
            <span>No</span>
            <span>Rate</span>
          </div>
          {DATA.yesVoters.map((official, i) => (
            <div
              key={`${official.name}-${i}`}
              className={`vote-leaderboard-row yes ${isVisible ? "animate" : ""}`}
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
// SECTION 4: THE NO VOTERS
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
        <span className="vote-section-number">The Resisters</span>
        <h2>Officials Who Push Back</h2>
      </div>

      <div className="vote-prose">
        <p>
          Princeton, New Jersey emerges as an outlier&mdash;a jurisdiction where
          multiple council members have approval rates near zero. Mark Freda, Dawn
          Mount, and Dave Cohen form a bloc that consistently votes against development
          proposals.
        </p>
        <p>
          In most councils, a single dissenter is an anomaly. In Princeton, it&rsquo;s
          a pattern. This concentration of no-voters in one wealthy suburb raises
          questions about whether Princeton&rsquo;s development politics differ
          systematically from other municipalities.
        </p>
        <p>
          For developers, the message is clear: Princeton council votes may require
          different strategies than the rubber-stamp approvals found elsewhere.
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
// SECTION 5: COUNCIL POLARIZATION
// ============================================================================
function CouncilPolarizationSection() {
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
        <span className="vote-section-number">The Divide</span>
        <h2>How Polarized Is Your Council?</h2>
      </div>

      <div className="vote-prose">
        <p>
          We calculated a &ldquo;polarization index&rdquo; for each council&mdash;the
          gap between the highest and lowest approval rates among officials with
          significant voting records.
        </p>
        <p>
          Cities like Fresno, Long Beach, and Denton show <strong>zero polarization</strong>:
          every tracked official votes yes 100% of the time. In contrast, El Dorado,
          Arkansas, and Princeton, New Jersey, show maximum polarization&mdash;officials
          ranging from 0% to 100% approval.
        </p>
        <p>
          A polarized council isn&rsquo;t necessarily bad. It may indicate robust
          debate and diverse viewpoints. A unified council could mean healthy consensus&mdash;or
          groupthink.
        </p>
      </div>

      <div className="vote-graphic" ref={ref}>
        <div className="vote-polarization-chart">
          {DATA.councils.map((council, i) => (
            <div
              key={council.city}
              className={`vote-polarization-row ${isVisible ? "animate" : ""}`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="vote-polarization-city">
                <span className="city-name">{council.city}, {council.state}</span>
                <span className="official-count">{council.officialCount} officials</span>
              </div>
              <div className="vote-polarization-bar-container">
                <div
                  className="vote-polarization-bar"
                  style={{
                    width: isVisible ? `${council.polarization}%` : "0%",
                    backgroundColor: council.polarization > 50 ? "#ef4444" : council.polarization > 20 ? "#f59e0b" : "#22c55e",
                  }}
                />
              </div>
              <div className="vote-polarization-score">{council.polarization}</div>
            </div>
          ))}
        </div>
        <div className="vote-polarization-legend">
          <span>0 = Perfect consensus</span>
          <span>100 = Maximum division</span>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 6: TOPIC BREAKDOWN
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

  const maxVotes = Math.max(...DATA.byTopic.map(t => t.votes));

  return (
    <section className="vote-section">
      <div className="vote-prose-header">
        <span className="vote-section-number">The Issues</span>
        <h2>What Gets the Most No Votes?</h2>
      </div>

      <div className="vote-prose">
        <p>
          Environmental matters stand out. While most categories see approval rates
          above 94%, environmental issues drop to <strong>75%</strong>&mdash;significantly
          lower than any other category in our dataset.
        </p>
        <p>
          This doesn&rsquo;t mean officials oppose environmental protection. Rather,
          it suggests that environmental matters generate more genuine disagreement
          than routine administrative or infrastructure votes.
        </p>
      </div>

      <div className="vote-graphic" ref={ref}>
        <div className="vote-topic-chart">
          {DATA.byTopic.map((topic, i) => (
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
                    width: isVisible ? `${(topic.votes / maxVotes) * 100}%` : "0%",
                    backgroundColor: topic.avgApproval < 80 ? "#ef4444" : topic.avgApproval < 95 ? "#f59e0b" : "#3b82f6",
                  }}
                />
              </div>
              <div className="vote-topic-rate">{topic.avgApproval}%</div>
            </div>
          ))}
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
    <section className="vote-section vote-implications">
      <div className="vote-prose-header">
        <span className="vote-section-number">The Stakes</span>
        <h2>What This Means</h2>
      </div>

      <div className="vote-prose">
        <p>
          Individual voting records are public data&mdash;but rarely compiled, analyzed,
          or made searchable. By aggregating these records across cities, we&rsquo;ve
          created a tool that didn&rsquo;t exist before: a way to compare official
          behavior across jurisdictions.
        </p>
        <p>
          For developers, this data identifies which councils require more outreach
          and which are likely to approve with minimal resistance. For activists,
          it reveals which officials are genuinely swing votes versus reliable allies
          or opponents.
        </p>
        <p>
          For voters, it offers accountability. The next time an official claims to
          support or oppose development, you can check whether their votes match
          their rhetoric.
        </p>
      </div>

      <div className="vote-graphic">
        <div className="vote-takeaway-grid">
          <div className="vote-takeaway">
            <div className="vote-takeaway-number">{DATA.summary.totalOfficials.toLocaleString()}</div>
            <div className="vote-takeaway-label">Officials tracked</div>
          </div>
          <div className="vote-takeaway">
            <div className="vote-takeaway-number">{DATA.summary.totalVotes.toLocaleString()}</div>
            <div className="vote-takeaway-label">Votes recorded</div>
          </div>
          <div className="vote-takeaway">
            <div className="vote-takeaway-number">{DATA.summary.avgApprovalRate}%</div>
            <div className="vote-takeaway-label">Average approval rate</div>
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
          statistical significance while including part-time and recently-elected
          officials.
        </p>
        <p>
          <strong>Topic Classification:</strong> Votes were categorized by topic
          (administrative, infrastructure, zoning, residential, commercial, environmental,
          etc.) using the matter type classifications provided by each municipality.
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
          <strong>Limitations:</strong> Not all cities use Legistar. Some cities
          don&rsquo;t record roll-call votes for routine matters. Our dataset
          over-represents larger cities with more sophisticated record-keeping.
          Vote counts may include procedural votes alongside substantive ones.
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

function VoteOverview() {
  const [animatedVotes, setAnimatedVotes] = useState(0);
  const [animatedOfficials, setAnimatedOfficials] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const votesTarget = DATA.summary.totalVotes;
    const officialsTarget = DATA.summary.totalOfficials;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setAnimatedVotes(Math.round(eased * votesTarget));
      setAnimatedOfficials(Math.round(eased * officialsTarget));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="vote-overview">
      <div className="vote-overview-stats">
        <div className="vote-overview-stat">
          <span className="value">{animatedVotes.toLocaleString()}</span>
          <span className="label">Votes Analyzed</span>
        </div>
        <div className="vote-overview-stat">
          <span className="value">{animatedOfficials.toLocaleString()}</span>
          <span className="label">Officials Tracked</span>
        </div>
        <div className="vote-overview-stat highlight">
          <span className="value">{DATA.summary.avgApprovalRate}%</span>
          <span className="label">Avg Approval</span>
        </div>
      </div>
    </div>
  );
}
