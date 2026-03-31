"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MeetingPhase {
  time: string;
  phase: string;
  description: string;
  attendees: number;
  totalSeats: number;
  insight: string;
  duration: string;
  icon: string;
}

const PHASES: MeetingPhase[] = [
  {
    time: "7:00 PM",
    phase: "Call to Order",
    description:
      "The mayor gavels the session open. Five council members take their seats on the dais. The city clerk adjusts her laptop. A retired teacher in the second row unfolds a manila folder of printed spreadsheets.",
    attendees: 12,
    totalSeats: 80,
    insight: "No meeting legally exists until the presiding officer calls it to order.",
    duration: "~2 min",
    icon: "\u{1F528}",
  },
  {
    time: "7:02 PM",
    phase: "Roll Call & Pledge",
    description:
      "Each member\u2019s name is read aloud. The pledge is recited. A moment of silence \u2014 the invocation was dropped three years ago after a complaint.",
    attendees: 12,
    totalSeats: 80,
    insight: "Quorum (usually a simple majority) must be present, or the meeting cannot proceed.",
    duration: "~3 min",
    icon: "\u{1F4CB}",
  },
  {
    time: "7:05 PM",
    phase: "Consent Calendar",
    description:
      "Previous meeting\u2019s minutes. A contract renewal for janitorial services. Acceptance of a state parks grant. Appointment of two members to the planning commission. All bundled into one vote. Passes 5\u20130 in 90 seconds.",
    attendees: 12,
    totalSeats: 80,
    insight:
      "This is where local government does most of its work while almost nobody watches. Boards save ~30 minutes per meeting this way.",
    duration: "~2 min",
    icon: "\u2705",
  },
  {
    time: "7:07 PM",
    phase: "Public Hearing",
    description:
      "A developer presents plans for a 24-unit apartment building on a rezoned parcel. Staff recommends approval with conditions. Three neighbors who live on the adjacent street object to the height, the traffic, and the parking. One has a poster board.",
    attendees: 31,
    totalSeats: 80,
    insight:
      "The gallery fills only when a land-use decision threatens property values. This is the one time most residents ever see their government in action.",
    duration: "~45 min",
    icon: "\u{1F3D7}\uFE0F",
  },
  {
    time: "7:52 PM",
    phase: "Public Comment",
    description:
      "Three minutes per speaker, enforced by a timer visible to the room. The retired teacher speaks about stormwater fees. An activist reads a prepared statement at 2:55. A young parent who forgot to fill out a speaker card is waved through anyway.",
    attendees: 24,
    totalSeats: 80,
    insight:
      "The average public commenter is 58, 25 points more likely to be a homeowner, and disproportionately white and male (Einstein, Glick & Palmer, Boston University).",
    duration: "~30 min",
    icon: "\u{1F399}\uFE0F",
  },
  {
    time: "8:22 PM",
    phase: "Regular Agenda",
    description:
      "Second reading of a noise ordinance. A budget amendment moving $180,000 from reserves to road resurfacing. Staff presentation on the water system capital plan. The council votes 4\u20131 on the noise ordinance; one member thinks the decibel threshold is too low.",
    attendees: 16,
    totalSeats: 80,
    insight:
      "By now, half the gallery has left. The votes that follow often pass with less public scrutiny than the hearing that preceded them.",
    duration: "~50 min",
    icon: "\u{1F4DC}",
  },
  {
    time: "9:12 PM",
    phase: "Closed Session",
    description:
      'The mayor announces: "We will recess to closed session to discuss pending litigation \u2014 Smith v. City." The doors close. The eight remaining residents wait in the hallway. The clerk stops recording.',
    attendees: 8,
    totalSeats: 80,
    insight:
      "Only litigation, real property negotiations, personnel evaluations, and labor negotiations are legally permitted behind closed doors.",
    duration: "~25 min",
    icon: "\u{1F512}",
  },
  {
    time: "9:37 PM",
    phase: "Adjournment",
    description:
      "The mayor gavels out. The retired teacher folds her spreadsheets and leaves. The clerk saves her file. Five council members disperse into a Tuesday night most of their constituents spent watching television.",
    attendees: 4,
    totalSeats: 80,
    insight: "The republic, for one more evening, has functioned.",
    duration: "~1 min",
    icon: "\u{1F3DB}\uFE0F",
  },
];

function AttendeeGrid({ count, total }: { count: number; total: number }) {
  // Show a condensed grid — 20 dots representing the 80 seats (1 dot = 4 seats)
  const dotTotal = 20;
  const filled = Math.round((count / total) * dotTotal);

  return (
    <div className="lg-meeting-attendees">
      <div className="lg-meeting-attendee-label">
        {count} of {total} seats occupied
      </div>
      <div className="lg-meeting-dot-grid">
        {Array.from({ length: dotTotal }).map((_, i) => (
          <motion.div
            key={i}
            className={`lg-meeting-dot ${i < filled ? "lg-meeting-dot-filled" : ""}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.02, duration: 0.2 }}
          />
        ))}
      </div>
    </div>
  );
}

export function MeetingSimulator() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const phase = PHASES[currentPhase];

  return (
    <div className="lg-meeting-sim">
      <div className="lg-meeting-sim-header">
        <span className="lg-meeting-sim-badge">Interactive</span>
        <h3 className="lg-meeting-sim-title">Anatomy of a Council Meeting</h3>
        <p className="lg-meeting-sim-subtitle">
          Step through a typical Tuesday night, phase by phase
        </p>
      </div>

      {/* Timeline bar */}
      <div className="lg-meeting-timeline">
        {PHASES.map((p, i) => (
          <button
            key={i}
            className={`lg-meeting-timeline-dot ${i === currentPhase ? "lg-meeting-timeline-active" : ""} ${i < currentPhase ? "lg-meeting-timeline-past" : ""}`}
            onClick={() => setCurrentPhase(i)}
            aria-label={`Go to ${p.phase}`}
            title={`${p.time} — ${p.phase}`}
          >
            <span className="lg-meeting-timeline-time">{p.time}</span>
          </button>
        ))}
        <div className="lg-meeting-timeline-track" />
        <motion.div
          className="lg-meeting-timeline-progress"
          animate={{ width: `${(currentPhase / (PHASES.length - 1)) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Phase card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPhase}
          className="lg-meeting-card"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className="lg-meeting-card-top">
            <div className="lg-meeting-card-phase-info">
              <span className="lg-meeting-card-icon">{phase.icon}</span>
              <div>
                <div className="lg-meeting-card-time">{phase.time}</div>
                <div className="lg-meeting-card-phase">{phase.phase}</div>
              </div>
            </div>
            <span className="lg-meeting-card-duration">{phase.duration}</span>
          </div>

          <p className="lg-meeting-card-desc">{phase.description}</p>

          <AttendeeGrid count={phase.attendees} total={phase.totalSeats} />

          <div className="lg-meeting-card-insight">
            <span className="lg-meeting-card-insight-label">The takeaway</span>
            <p>{phase.insight}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="lg-meeting-nav">
        <button
          className="lg-meeting-nav-btn"
          onClick={() => setCurrentPhase(Math.max(0, currentPhase - 1))}
          disabled={currentPhase === 0}
        >
          &larr; Previous
        </button>
        <span className="lg-meeting-nav-count">
          {currentPhase + 1} of {PHASES.length}
        </span>
        <button
          className="lg-meeting-nav-btn"
          onClick={() =>
            setCurrentPhase(Math.min(PHASES.length - 1, currentPhase + 1))
          }
          disabled={currentPhase === PHASES.length - 1}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}
