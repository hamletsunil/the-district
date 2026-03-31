"use client";

import { motion, AnimatePresence } from "framer-motion";

interface EntityCounterProps {
  stepIndex: number;
}

interface CountryComparison {
  country: string;
  count: string;
  population: string;
  flag: string;
  code: string;
}

const STEPS = [
  {
    number: "90,837",
    label: "local government entities",
    sublabel: "in the United States",
    color: "#3b82f6",
  },
  {
    number: "19,491",
    label: "municipalities",
    sublabel: "cities, towns, villages, boroughs",
    color: "#3b82f6",
  },
  {
    number: "39,555",
    label: "special districts",
    sublabel: "the invisible governments",
    color: "#14b8a6",
  },
  {
    number: "$2.32T",
    label: "annual spending",
    sublabel: "more than Italy's entire GDP",
    color: "#f59e0b",
  },
  {
    number: "26%",
    label: "average voter turnout",
    sublabel: "in off-cycle local elections",
    color: "#ef4444",
  },
];

const COMPARISONS: CountryComparison[] = [
  { country: "France", count: "35,000", population: "67M", flag: "\u{1F1EB}\u{1F1F7}", code: "FR" },
  { country: "Germany", count: "11,000", population: "83M", flag: "\u{1F1E9}\u{1F1EA}", code: "DE" },
  { country: "Japan", count: "1,718", population: "125M", flag: "\u{1F1EF}\u{1F1F5}", code: "JP" },
  { country: "United Kingdom", count: "333", population: "67M", flag: "\u{1F1EC}\u{1F1E7}", code: "UK" },
];

export function EntityCounter({ stepIndex }: EntityCounterProps) {
  const step = STEPS[Math.min(stepIndex, STEPS.length - 1)];
  const showComparisons = stepIndex >= STEPS.length;

  // SVG arc parameters
  const arcRadius = 120;
  const arcStroke = 4;
  const arcCircumference = 2 * Math.PI * arcRadius;
  // Show ~75% of the arc as a gauge
  const arcDashLen = arcCircumference * 0.72;
  const arcGapLen = arcCircumference - arcDashLen;

  return (
    <div className="lg-entity-counter">
      <AnimatePresence mode="wait">
        {!showComparisons ? (
          <motion.div
            key={`step-${stepIndex}`}
            className="lg-entity-counter-main"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {/* SVG arc ring behind the number */}
            <div className="lg-entity-arc-wrapper">
              <svg
                viewBox={`0 0 ${(arcRadius + arcStroke) * 2} ${(arcRadius + arcStroke) * 2}`}
                className="lg-entity-arc-svg"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id={`arc-grad-${stepIndex}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={step.color} stopOpacity="0.6" />
                    <stop offset="100%" stopColor={step.color} stopOpacity="0.08" />
                  </linearGradient>
                </defs>
                <motion.circle
                  cx={arcRadius + arcStroke}
                  cy={arcRadius + arcStroke}
                  r={arcRadius}
                  fill="none"
                  stroke={`url(#arc-grad-${stepIndex})`}
                  strokeWidth={arcStroke}
                  strokeLinecap="round"
                  strokeDasharray={`${arcDashLen} ${arcGapLen}`}
                  strokeDashoffset={arcCircumference * 0.25}
                  initial={{ opacity: 0, rotate: -30 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.05 }}
                  style={{ transformOrigin: "center" }}
                />
              </svg>

              <motion.div
                className="lg-entity-number"
                style={{
                  color: step.color,
                  textShadow: `0 0 40px ${step.color}33, 0 0 80px ${step.color}18`,
                }}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {step.number}
              </motion.div>
            </div>

            <div className="lg-entity-label-row">
              <motion.span
                className="lg-entity-pulse-dot"
                style={{ backgroundColor: step.color }}
                animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />
              <span className="lg-entity-label">{step.label}</span>
            </div>
            <div className="lg-entity-sublabel">{step.sublabel}</div>
          </motion.div>
        ) : (
          <motion.div
            key="comparisons"
            className="lg-entity-comparisons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="lg-entity-comparison-title">
              No other democracy comes close
            </div>
            <div className="lg-entity-comparison-grid">
              {/* US bar */}
              <div className="lg-entity-comparison-row">
                <div className="lg-entity-comparison-country">
                  <span className="lg-entity-flag" aria-hidden="true">{"\u{1F1FA}\u{1F1F8}"}</span>
                  <div>
                    <strong>United States</strong>
                    <span>330M people</span>
                  </div>
                </div>
                <div className="lg-entity-comparison-bar-wrapper">
                  <motion.div
                    className="lg-entity-comparison-bar lg-entity-bar-us"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                  <span className="lg-entity-comparison-count">90,837</span>
                </div>
              </div>
              {/* Other countries */}
              {COMPARISONS.map((comp, i) => {
                const width = `${(parseInt(comp.count.replace(/,/g, "")) / 90837) * 100}%`;
                return (
                  <div key={comp.country} className="lg-entity-comparison-row">
                    <div className="lg-entity-comparison-country">
                      <span className="lg-entity-flag" aria-hidden="true">{comp.flag}</span>
                      <div>
                        <strong>{comp.country}</strong>
                        <span>{comp.population} people</span>
                      </div>
                    </div>
                    <div className="lg-entity-comparison-bar-wrapper">
                      <motion.div
                        className="lg-entity-comparison-bar"
                        initial={{ width: 0 }}
                        animate={{ width }}
                        transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                      />
                      <span className="lg-entity-comparison-count">{comp.count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
