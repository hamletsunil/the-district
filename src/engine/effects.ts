/**
 * Effects table: maps each policy lever (0-1) to changes across 4 indices.
 *
 * Each effect has:
 *   - weight: magnitude of impact per unit of slider
 *   - delay: years before effect fully kicks in (inertia)
 *   - direction: +1 (positive) or -1 (negative)
 *
 * Calibrated to Oakland's real conditions:
 *   - Police staffing crisis (535/877 officers)
 *   - $360M structural deficit
 *   - Housing Element: 26,000 units by 2031
 *   - "State Mandate Resistor" archetype → governance friction
 *
 * Weight calibration reviewed by 4 independent experts (Stanford, Chicago,
 * MIT urban economics; statistical modeling). See methodology page for details.
 */

export interface Effect {
  weight: number;    // 0-1 magnitude
  delay: number;     // years of inertia
  direction: number; // +1 or -1
}

// effects[lever][index] → Effect
export const EFFECTS: Record<string, Record<string, Effect>> = {
  education: {
    education:     { weight: 0.8,  delay: 2, direction: 1 },
    safety:        { weight: 0.15, delay: 2, direction: 1 },   // educated communities safer long-term
    prosperity:    { weight: 0.20, delay: 3, direction: 1 },   // workforce development (conservative at 3yr horizon)
    affordability: { weight: 0.20, delay: 2, direction: -1 },  // school quality capitalizes into home prices (Black 1999)
  },
  housing: {
    education:     { weight: 0.1,  delay: 2, direction: 1 },   // stable housing → better outcomes
    safety:        { weight: 0.1,  delay: 2, direction: 1 },
    prosperity:    { weight: 0.2,  delay: 2, direction: 1 },   // construction jobs, tax base
    affordability: { weight: 0.45, delay: 3, direction: 1 },   // low Bay Area supply elasticity (Mast 2021)
  },
  safety: {
    education:     { weight: 0.1,  delay: 1, direction: 1 },   // safer schools
    safety:        { weight: 0.7,  delay: 1, direction: 1 },   // direct impact
    prosperity:    { weight: 0.25, delay: 2, direction: 1 },   // business confidence (Greenbaum & Tita 2004)
    affordability: { weight: 0.15, delay: 2, direction: -1 },  // safer → pricier
  },
  economy: {
    education:     { weight: 0.15, delay: 2, direction: 1 },   // job training programs
    safety:        { weight: 0.1,  delay: 2, direction: 1 },   // more jobs → less crime
    prosperity:    { weight: 0.7,  delay: 1, direction: 1 },   // direct impact
    affordability: { weight: 0.20, delay: 1, direction: -1 },  // growth → higher costs (local share of regional forces)
  },
};

// Oakland-specific constants
export const GOVERNANCE_FRICTION = 0.80;              // 20% implementation penalty (contentiousness 4.0/10)
export const HOUSING_FRICTION = 0.65;                 // additional 35% friction on housing policy
export const BUDGET_CEILING = 0.6;                    // max new spending above baseline (cuts provide additional room)

// Feedback loop coefficients (delta-based from baseline)
export const CRIME_ECONOMY_FEEDBACK = 0.15;           // declining safety → drags prosperity
export const PROSPERITY_AFFORDABILITY_TENSION = 0.20;  // rising prosperity → reduces affordability
export const SAFETY_EDUCATION_FEEDBACK = 0.15;         // declining safety → undermines schools
export const ECONOMY_CRIME_FEEDBACK = 0.12;            // declining prosperity → increases crime
export const DISPLACEMENT_FEEDBACK = 0.10;             // declining affordability → drives out workforce
