"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useSimulation } from "@/hooks/useSimulation";
import { SCENARIOS, SCENARIO_ORDER } from "@/engine/scenarios";
import { simulate } from "@/engine/simulation";
import type { YearState } from "@/engine/simulation";

const CityScapeMap = dynamic(
  () => import("./CityScapeMap").then((m) => m.CityScapeMap),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-[550px] rounded-2xl flex items-center justify-center"
        style={{ background: "#0c1621" }}
      >
        <span
          style={{
            color: "#4b5e6f",
            fontFamily: "var(--font-sans)",
            fontSize: 14,
          }}
        >
          Loading Oakland cityscape...
        </span>
      </div>
    ),
  }
);

/* ====================================================================
   SCORE CONTEXT — human-readable explanation for each dimension value
   ==================================================================== */

function scoreContext(key: string, val: number): string {
  if (key === "safety") {
    if (val < 25) return "Collapse. Oakland becomes uninsurable in parts.";
    if (val < 30) return "Crisis. 5x the national average violent crime rate.";
    if (val < 35) return "Severe. Still far above national average.";
    if (val < 40) return "Improving. Crime declining but still elevated.";
    if (val < 50) return "Gaining ground. Approaching national norms.";
    return "Stabilizing. At or near national averages.";
  }
  if (key === "education") {
    if (val < 30) return "Failing. Schools losing accreditation.";
    if (val < 35) return "Below average. Underfunded, low test scores.";
    if (val < 40) return "Improving. New investments starting to show.";
    if (val < 45) return "Moderate. Schools meeting basic standards.";
    if (val < 55) return "Competitive. Approaching Bay Area averages.";
    return "Strong. Above-average outcomes.";
  }
  if (key === "prosperity") {
    if (val < 35) return "Declining. Businesses and jobs leaving Oakland.";
    if (val < 40) return "Struggling. The $94K income masks deep inequality.";
    if (val < 45) return "Stagnant. Growth not reaching all neighborhoods.";
    if (val < 50) return "Recovering. New investment, cautious optimism.";
    if (val < 55) return "Growing. Job creation and business confidence rising.";
    return "Thriving. Strong, broad-based economic momentum.";
  }
  if (key === "affordability") {
    if (val < 40) return "Crisis. Displacement accelerating in the flatlands.";
    if (val < 45) return "Stressed. Rising rents squeezing median earners.";
    if (val < 50) return "Tight. Manageable for dual-income households.";
    if (val < 55) return "Moderate. Rents stable relative to income.";
    if (val < 60) return "Accessible. Below Bay Area average costs.";
    return "Affordable. Rare for the Bay Area.";
  }
  return "";
}

function scoreGrade(val: number): string {
  if (val < 25) return "F";
  if (val < 35) return "D";
  if (val < 45) return "C";
  if (val < 55) return "B";
  return "A";
}

/* ====================================================================
   CONSTANTS
   ==================================================================== */

const MAX_YEAR = 10;
const AUTOPLAY_INTERVAL_MS = 3000; // 3s per year = 30s total

const DIM_COLORS: Record<string, string> = {
  education: "#818cf8",
  safety: "#f87171",
  prosperity: "#fbbf24",
  affordability: "#34d399",
};

const DIM_LABELS: Record<string, string> = {
  education: "Education",
  safety: "Public Safety",
  prosperity: "Prosperity",
  affordability: "Affordability",
};

/* Precompute all scenario trajectories for preview cards */
const SCENARIO_TRAJECTORIES: Record<string, YearState[]> = {};
for (const key of SCENARIO_ORDER) {
  SCENARIO_TRAJECTORIES[key] = simulate(SCENARIOS[key].sliders);
}

/* ====================================================================
   COMPONENT
   ==================================================================== */

export function InteractiveSection() {
  const activeScenario = useSimulation((s) => s.activeScenario);
  const currentYear = useSimulation((s) => s.currentYear);
  const trajectory = useSimulation((s) => s.trajectory);
  const currentState = useSimulation((s) => s.currentState);
  const setScenario = useSimulation((s) => s.setScenario);
  const setYear = useSimulation((s) => s.setYear);

  const scenario = SCENARIOS[activeScenario];
  const baseline = trajectory[0];

  // Previous state for delta callouts
  const prevStateRef = useRef<YearState>(currentState);
  const [deltas, setDeltas] = useState<
    { key: string; delta: number; id: number }[]
  >([]);
  const deltaCounter = useRef(0);

  // Track metric changes for floating callouts
  useEffect(() => {
    const prev = prevStateRef.current;
    const dims = ["education", "safety", "prosperity", "affordability"] as const;
    const newDeltas: { key: string; delta: number; id: number }[] = [];

    for (const dim of dims) {
      const d = currentState[dim] - prev[dim];
      if (Math.abs(d) > 0.3) {
        deltaCounter.current += 1;
        newDeltas.push({ key: dim, delta: d, id: deltaCounter.current });
      }
    }

    if (newDeltas.length > 0) {
      setDeltas(newDeltas);
      const timer = setTimeout(() => setDeltas([]), 2200);
      prevStateRef.current = currentState;
      return () => clearTimeout(timer);
    }

    prevStateRef.current = currentState;
  }, [currentState]);

  // Auto-play timeline — 3 seconds per year, 30 seconds total
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) return;
    if (currentYear >= MAX_YEAR) {
      setPlaying(false);
      return;
    }
    const timer = setTimeout(() => setYear(currentYear + 1), AUTOPLAY_INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [playing, currentYear, setYear]);

  const handleScenarioChange = (key: string) => {
    setScenario(key);
    setYear(0);
    setPlaying(false);
  };

  const handlePlay = () => {
    if (currentYear >= MAX_YEAR) setYear(0);
    setPlaying(true);
  };

  // Current annotation — find the most recent milestone at or before current year
  const currentAnnotation = useMemo(() => {
    if (currentYear === 0) return null;
    // Find the exact match first, then the most recent past milestone
    const exact = scenario.changes.find((a) => a.year === currentYear);
    if (exact) return exact;
    // Show the most recent milestone that has passed
    const past = scenario.changes
      .filter((a) => a.year <= currentYear)
      .sort((a, b) => b.year - a.year);
    return past[0] ?? null;
  }, [scenario, currentYear]);

  // Compute Y10 outcome for scenario cards
  const getScenarioEnd = (key: string) => {
    const t = SCENARIO_TRAJECTORIES[key];
    return t?.[MAX_YEAR] ?? null;
  };

  return (
    <div>
      {/* ================================================================
          SCENARIO SELECTOR — cards with outcome previews
          ================================================================ */}
      <div className="mb-6">
        <div className="flex gap-3 overflow-x-auto pb-2 px-1 -mx-1 snap-x snap-mandatory md:snap-none">
          {SCENARIO_ORDER.map((key) => {
            const s = SCENARIOS[key];
            const isActive = activeScenario === key;
            const yEnd = getScenarioEnd(key);
            const y0 = SCENARIO_TRAJECTORIES[key]?.[0];
            const compositeChange = yEnd && y0 ? yEnd.composite - y0.composite : 0;

            return (
              <button
                key={key}
                onClick={() => handleScenarioChange(key)}
                className="group relative rounded-xl text-left transition-all flex-shrink-0 snap-start"
                style={{
                  minWidth: isActive ? 240 : 180,
                  width: isActive ? 240 : 180,
                  padding: "14px 16px",
                  background: isActive
                    ? "rgba(255,255,255,0.10)"
                    : "rgba(255,255,255,0.03)",
                  border: isActive
                    ? "1px solid rgba(255,255,255,0.25)"
                    : "1px solid rgba(255,255,255,0.06)",
                  transition: "all 0.3s cubic-bezier(0.21, 0.47, 0.32, 0.98)",
                }}
              >
                <div
                  className="text-sm font-semibold"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                  }}
                >
                  {s.name}
                </div>

                <div
                  className="text-xs mt-1 leading-snug"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: isActive
                      ? "rgba(255,255,255,0.55)"
                      : "rgba(255,255,255,0.3)",
                  }}
                >
                  {s.tagline}
                </div>

                {yEnd && (
                  <div className="mt-3 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-mono"
                        style={{
                          color: isActive ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)",
                          fontFamily: "var(--font-sans)",
                        }}
                      >
                        Y10: {yEnd.composite.toFixed(0)}
                      </span>
                      <span
                        className="text-xs font-semibold"
                        style={{
                          color:
                            compositeChange > 1
                              ? "#22c55e"
                              : compositeChange < -1
                              ? "#ef4444"
                              : "rgba(255,255,255,0.3)",
                          fontFamily: "var(--font-sans)",
                        }}
                      >
                        {compositeChange > 0 ? "+" : ""}
                        {compositeChange.toFixed(1)}
                      </span>
                    </div>

                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs mt-1.5 leading-snug"
                        style={{
                          color: "rgba(255,255,255,0.5)",
                          fontFamily: "var(--font-body)",
                          fontStyle: "italic",
                        }}
                      >
                        {s.preview}
                      </motion.div>
                    )}
                  </div>
                )}

                {isActive && (
                  <div
                    className="absolute top-3 right-3 w-2 h-2 rounded-full"
                    style={{ background: "var(--city-accent-light)" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================================================================
          MAP + SINGLE OVERLAY (merged year + annotation)
          ================================================================ */}
      <div className="relative">
        <CityScapeMap />

        {/* SINGLE OVERLAY — year counter + annotation text merged */}
        <div
          className="absolute top-4 left-4 z-10 pointer-events-none"
          style={{ maxWidth: 340, fontFamily: "var(--font-sans)" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`overlay-${currentYear}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="px-4 py-3 rounded-xl"
              style={{
                background: "rgba(0, 21, 46, 0.88)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              {/* Year + scenario on one line */}
              <div className="flex items-baseline gap-2">
                <span
                  className="text-xl font-bold"
                  style={{ color: "#fff", letterSpacing: "-0.02em" }}
                >
                  {currentYear === 0 ? "Today" : `Year ${currentYear}`}
                </span>
                <span
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {scenario.name}
                </span>
              </div>

              {/* Annotation text — only appears at milestone years */}
              {currentAnnotation && currentYear > 0 && (
                <div
                  className="text-xs leading-snug mt-1.5 pt-1.5"
                  style={{
                    color: "rgba(255,255,255,0.75)",
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {currentAnnotation.text}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* FLOATING METRIC DELTAS */}
        <div className="absolute top-4 right-4 z-10 pointer-events-none space-y-2">
          <AnimatePresence>
            {deltas.map((d) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="px-3 py-1.5 rounded-lg flex items-center gap-2"
                style={{
                  background: "rgba(0, 21, 46, 0.85)",
                  backdropFilter: "blur(12px)",
                  border: `1px solid ${DIM_COLORS[d.key]}40`,
                }}
              >
                <span
                  className="text-xs font-medium"
                  style={{ color: DIM_COLORS[d.key], fontFamily: "var(--font-sans)" }}
                >
                  {DIM_LABELS[d.key]}
                </span>
                <span
                  className="text-sm font-bold"
                  style={{
                    color: d.delta > 0 ? "#22c55e" : "#ef4444",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {d.delta > 0 ? "+" : ""}
                  {d.delta.toFixed(1)}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ================================================================
          TIMELINE CONTROLS — play button + range slider
          ================================================================ */}
      <div className="mt-4 flex items-center gap-4">
        {/* Play/Pause button */}
        <button
          onClick={playing ? () => setPlaying(false) : handlePlay}
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all flex-shrink-0"
          style={{
            background: playing
              ? "rgba(255,255,255,0.15)"
              : "var(--city-accent)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
          aria-label={playing ? "Pause" : "Play timeline"}
        >
          {playing ? "\u23F8" : "\u25B6"}
        </button>

        {/* Slider + labels */}
        <div className="flex-1">
          {/* Range input */}
          <input
            type="range"
            min={0}
            max={MAX_YEAR}
            step={1}
            value={currentYear}
            onChange={(e) => {
              setYear(Number(e.target.value));
              setPlaying(false);
            }}
            className="w-full year-slider"
            style={{ accentColor: "var(--city-accent-light)" }}
            aria-label="Simulation year"
          />

          {/* Year labels */}
          <div className="flex justify-between mt-1 px-0.5">
            {[0, 2, 4, 6, 8, 10].map((y) => (
              <button
                key={y}
                onClick={() => { setYear(y); setPlaying(false); }}
                className="text-xs transition-colors"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: currentYear === y
                    ? "#fff"
                    : y <= currentYear
                    ? "rgba(255,255,255,0.5)"
                    : "rgba(255,255,255,0.25)",
                  fontWeight: currentYear === y ? 600 : 400,
                }}
              >
                {y === 0 ? "Today" : `${y}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="mt-2 h-1 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--city-accent-light)" }}
          animate={{ width: `${(currentYear / MAX_YEAR) * 100}%` }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        />
      </div>

      {/* ================================================================
          SCORES + NARRATIVE
          ================================================================ */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        {/* LEFT: Narrative panel */}
        <div>
          <div
            className="text-xs font-semibold uppercase tracking-wider mb-3"
            style={{
              color: "var(--city-accent-light)",
              fontFamily: "var(--font-sans)",
            }}
          >
            {currentYear === 0
              ? `${scenario.name}: Oakland Today`
              : `${scenario.name}: Year ${currentYear}`}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeScenario}-${currentYear <= 3 ? "early" : currentYear <= 7 ? "mid" : "late"}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="p-5 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p
                className="text-sm leading-relaxed"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                {currentYear === 0
                  ? scenario.description
                  : currentYear <= 3
                  ? scenario.narrative_y1
                  : currentYear <= 7
                  ? scenario.narrative_y3
                  : scenario.narrative_y10}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* MILESTONE TIMELINE — shows key year markers */}
          <div className="mt-4 space-y-2">
            {scenario.changes.map((change) => {
              const isPast = currentYear >= change.year;
              const isCurrent = currentYear === change.year;
              return (
                <motion.div
                  key={`${activeScenario}-change-${change.year}`}
                  animate={{
                    opacity: isPast ? 1 : 0.35,
                  }}
                  transition={{ duration: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        background: isCurrent
                          ? "var(--city-accent)"
                          : isPast
                          ? "rgba(255,255,255,0.15)"
                          : "rgba(255,255,255,0.05)",
                        color: isCurrent || isPast ? "#fff" : "rgba(255,255,255,0.3)",
                        border: isCurrent
                          ? "1px solid var(--city-accent-light)"
                          : "1px solid rgba(255,255,255,0.1)",
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      {change.year}
                    </div>
                  </div>
                  <div
                    className="text-xs leading-snug pt-1.5"
                    style={{
                      fontFamily: "var(--font-sans)",
                      color: isCurrent
                        ? "rgba(255,255,255,0.9)"
                        : isPast
                        ? "rgba(255,255,255,0.55)"
                        : "rgba(255,255,255,0.25)",
                    }}
                  >
                    {change.text}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Score cards */}
        <div className="space-y-2.5">
          {(
            ["education", "safety", "prosperity", "affordability"] as const
          ).map((key) => {
            const val = currentState[key];
            const base = baseline[key];
            const delta = val - base;
            const showDelta = currentYear > 0;
            const grade = scoreGrade(val);

            return (
              <motion.div
                key={key}
                layout
                className="p-3.5 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ background: DIM_COLORS[key] }}
                    />
                    <span
                      className="text-xs font-semibold"
                      style={{
                        color: DIM_COLORS[key],
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      {DIM_LABELS[key]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-bold px-1.5 py-0.5 rounded"
                      style={{
                        background: `${DIM_COLORS[key]}20`,
                        color: DIM_COLORS[key],
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      {grade}
                    </span>
                    {showDelta && (
                      <motion.span
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs font-semibold"
                        style={{
                          color:
                            delta > 0.5
                              ? "#22c55e"
                              : delta < -0.5
                              ? "#ef4444"
                              : "rgba(255,255,255,0.3)",
                          fontFamily: "var(--font-sans)",
                        }}
                      >
                        {delta > 0 ? "+" : ""}
                        {delta.toFixed(1)}
                      </motion.span>
                    )}
                    <motion.span
                      key={val}
                      initial={{ scale: 1.15 }}
                      animate={{ scale: 1 }}
                      className="text-lg font-bold"
                      style={{
                        color: "#fff",
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      {val.toFixed(1)}
                    </motion.span>
                  </div>
                </div>

                <div
                  className="relative h-2 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${DIM_COLORS[key]}80, ${DIM_COLORS[key]})`,
                    }}
                    animate={{ width: `${val}%` }}
                    transition={{
                      duration: 0.7,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    }}
                  />
                  <div
                    className="absolute top-0 h-full w-px"
                    style={{
                      left: "50%",
                      background: "rgba(255,255,255,0.3)",
                    }}
                  />
                  <div
                    className="absolute text-center"
                    style={{
                      left: "50%",
                      top: -14,
                      transform: "translateX(-50%)",
                      fontSize: 8,
                      color: "rgba(255,255,255,0.25)",
                      fontFamily: "var(--font-sans)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    US median
                  </div>
                </div>

                <div
                  className="text-xs mt-2 leading-snug"
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {scoreContext(key, val)}
                </div>
              </motion.div>
            );
          })}

          {/* COMPOSITE SCORE */}
          <div
            className="p-4 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  Oakland Score
                </span>
                <div
                  className="text-xs mt-0.5"
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  Average of all four. National median: 50.
                </div>
              </div>
              <div className="text-right">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentState.composite}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl font-bold"
                    style={{ color: "#fff", fontFamily: "var(--font-sans)" }}
                  >
                    {currentState.composite.toFixed(1)}
                  </motion.div>
                </AnimatePresence>
                {currentYear > 0 && (
                  <span
                    className="text-xs font-semibold"
                    style={{
                      color:
                        currentState.composite - baseline.composite > 0.5
                          ? "#22c55e"
                          : currentState.composite - baseline.composite < -0.5
                          ? "#ef4444"
                          : "rgba(255,255,255,0.3)",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {currentState.composite - baseline.composite > 0 ? "+" : ""}
                    {(currentState.composite - baseline.composite).toFixed(1)} from today
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
