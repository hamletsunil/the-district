/**
 * Core simulation engine for Oakland's future.
 *
 * Takes 4 policy sliders (0-1) and computes year-by-year index projections.
 * Uses the effects table with inertia, budget constraints, governance friction,
 * diminishing returns, and 5 feedback loops calibrated to Oakland's real conditions.
 *
 * This is a simplified educational simulation — not a forecasting model.
 * See /methodology for full documentation of assumptions and limitations.
 */

import {
  EFFECTS,
  GOVERNANCE_FRICTION,
  HOUSING_FRICTION,
  BUDGET_CEILING,
  CRIME_ECONOMY_FEEDBACK,
  PROSPERITY_AFFORDABILITY_TENSION,
  SAFETY_EDUCATION_FEEDBACK,
  ECONOMY_CRIME_FEEDBACK,
  DISPLACEMENT_FEEDBACK,
} from "./effects";

export interface Sliders {
  education: number;
  housing: number;
  safety: number;
  economy: number;
}

export interface YearState {
  year: number; // 0 = baseline, 1-10 = projected
  education: number;
  safety: number;
  prosperity: number;
  affordability: number;
  composite: number;
}

// Oakland baseline indices (from forecast data)
const BASELINE: Omit<YearState, "year" | "composite"> = {
  education: 36.22,
  safety: 31.22,
  prosperity: 47.37,
  affordability: 54.14,
};

const INDICES = ["education", "safety", "prosperity", "affordability"] as const;
const LEVERS = ["education", "housing", "safety", "economy"] as const;

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

function composite(state: Omit<YearState, "year" | "composite">): number {
  return (state.education + state.safety + state.prosperity + state.affordability) / 4;
}

/**
 * Budget constraint: cuts free up budget for investments.
 * Models Oakland's $360M deficit — you can't increase everything, but you CAN
 * cut one area to fund another. 0.5 = current spending (neutral).
 */
function applyBudgetConstraint(sliders: Sliders): Sliders {
  const investments =
    Math.max(0, sliders.education - 0.5) +
    Math.max(0, sliders.housing - 0.5) +
    Math.max(0, sliders.safety - 0.5) +
    Math.max(0, sliders.economy - 0.5);

  const cuts =
    Math.abs(Math.min(0, sliders.education - 0.5)) +
    Math.abs(Math.min(0, sliders.housing - 0.5)) +
    Math.abs(Math.min(0, sliders.safety - 0.5)) +
    Math.abs(Math.min(0, sliders.economy - 0.5));

  const availableBudget = cuts + BUDGET_CEILING;
  if (investments <= availableBudget) return sliders;

  const scale = availableBudget / investments;
  return {
    education: sliders.education > 0.5
      ? 0.5 + (sliders.education - 0.5) * scale
      : sliders.education,
    housing: sliders.housing > 0.5
      ? 0.5 + (sliders.housing - 0.5) * scale
      : sliders.housing,
    safety: sliders.safety > 0.5
      ? 0.5 + (sliders.safety - 0.5) * scale
      : sliders.safety,
    economy: sliders.economy > 0.5
      ? 0.5 + (sliders.economy - 0.5) * scale
      : sliders.economy,
  };
}

/**
 * Compute the full 11-point trajectory (Year 0 = today, Years 1-10 = projected).
 */
export function simulate(rawSliders: Sliders): YearState[] {
  const sliders = applyBudgetConstraint(rawSliders);
  const states: YearState[] = [];

  // Year 0: baseline (real data)
  const y0 = { ...BASELINE, year: 0, composite: composite(BASELINE) };
  states.push(y0);

  let prev = { ...BASELINE };

  for (let year = 1; year <= 10; year++) {
    const next = { ...prev };

    // Apply effects from each lever to each index
    for (const lever of LEVERS) {
      const sliderVal = sliders[lever];
      // Deviation from neutral (0.5)
      const delta = sliderVal - 0.5;

      for (const index of INDICES) {
        const effect = EFFECTS[lever]?.[index];
        if (!effect) continue;

        // Inertia: effect ramps up over delay years
        const rampUp = Math.min(1, year / Math.max(1, effect.delay));

        // Base effect magnitude
        let magnitude = delta * effect.weight * effect.direction * rampUp;

        // Apply governance friction
        magnitude *= GOVERNANCE_FRICTION;

        // Extra housing friction
        if (lever === "housing") {
          magnitude *= HOUSING_FRICTION;
        }

        // Diminishing returns: harder to push an index higher when already high,
        // harder to push lower when already low (saturation near boundaries)
        if (magnitude > 0) {
          magnitude *= (95 - prev[index]) / 90;
        } else {
          magnitude *= (prev[index] - 5) / 90;
        }

        // Scale to index points
        next[index] += magnitude * 16;
      }
    }

    // Feedback loops — compute all adjustments from deltas, apply simultaneously.
    // Deltas are from baseline, not absolute — current indices already reflect
    // current dynamics. Feedback only amplifies CHANGES from that equilibrium.
    const safeDelta = next.safety - BASELINE.safety;
    const prosDelta = next.prosperity - BASELINE.prosperity;
    const affordDelta = next.affordability - BASELINE.affordability;

    let eduAdj = 0, safeAdj = 0, prosAdj = 0, affordAdj = 0;

    // Declining safety → drags prosperity (business flight)
    if (safeDelta < 0) {
      prosAdj += safeDelta * CRIME_ECONOMY_FEEDBACK;
    }
    // Rising prosperity → reduces affordability (demand-driven price increases)
    if (prosDelta > 0) {
      affordAdj -= prosDelta * PROSPERITY_AFFORDABILITY_TENSION;
    }
    // Declining safety → undermines education (schools can't thrive in unsafe environments)
    if (safeDelta < 0) {
      eduAdj += safeDelta * SAFETY_EDUCATION_FEEDBACK;
    }
    // Declining prosperity → increases crime (poverty-crime link)
    if (prosDelta < 0) {
      safeAdj += prosDelta * ECONOMY_CRIME_FEEDBACK;
    }
    // Declining affordability → drives out workforce, reducing prosperity
    if (affordDelta < 0) {
      prosAdj += affordDelta * DISPLACEMENT_FEEDBACK;
    }

    next.education += eduAdj;
    next.safety += safeAdj;
    next.prosperity += prosAdj;
    next.affordability += affordAdj;

    // Clamp all indices to 5-95
    for (const index of INDICES) {
      next[index] = clamp(Math.round(next[index] * 10) / 10, 5, 95);
    }

    const yearState: YearState = {
      year,
      ...next,
      composite: Math.round(composite(next) * 10) / 10,
    };
    states.push(yearState);
    prev = { ...next };
  }

  return states;
}

/**
 * Apply city-level simulation deltas to per-tract baselines.
 * Tracts closer to the city average are more affected; outlier tracts resist change.
 */
export function applyToTracts(
  tractBaselines: Record<string, Record<string, number>>,
  yearState: YearState,
  baselineYear: YearState
): Record<string, Record<string, number>> {
  const result: Record<string, Record<string, number>> = {};

  for (const [geoid, tract] of Object.entries(tractBaselines)) {
    const updated: Record<string, number> = { ...tract };

    for (const index of INDICES) {
      const cityDelta = yearState[index] - baselineYear[index];
      // Tracts closer to city average feel more of the change
      const tractScore = tract[index] ?? 50;
      const distFromMean = Math.abs(tractScore - baselineYear[index]);
      const responsiveness = Math.max(0.3, 1 - distFromMean / 50);
      updated[index] = clamp(
        Math.round((tractScore + cityDelta * responsiveness) * 10) / 10,
        5,
        95
      );
    }

    updated.composite = Math.round(
      ((updated.education + updated.safety + updated.prosperity + updated.affordability) / 4) * 10
    ) / 10;

    result[geoid] = updated;
  }

  return result;
}
