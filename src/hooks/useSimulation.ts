import { create } from "zustand";
import { simulate, type YearState } from "@/engine/simulation";
import { SCENARIOS, SCENARIO_ORDER } from "@/engine/scenarios";

const MAX_YEAR = 10;

interface SimulationState {
  activeScenario: string;
  currentYear: number; // 0-10

  // Computed
  trajectory: YearState[];
  currentState: YearState;

  // Actions
  setScenario: (key: string) => void;
  setYear: (year: number) => void;
}

function computeForScenario(key: string, year: number) {
  const scenario = SCENARIOS[key];
  const trajectory = simulate(scenario.sliders);
  return {
    trajectory,
    currentState: trajectory[year] ?? trajectory[0],
  };
}

const initialKey = SCENARIO_ORDER[0];
const initial = computeForScenario(initialKey, 0);

export const useSimulation = create<SimulationState>((set) => ({
  activeScenario: initialKey,
  currentYear: 0,
  trajectory: initial.trajectory,
  currentState: initial.currentState,

  setScenario: (key) =>
    set((state) => {
      if (!SCENARIOS[key]) return {};
      const computed = computeForScenario(key, state.currentYear);
      return { activeScenario: key, ...computed };
    }),

  setYear: (year) =>
    set((state) => {
      const clamped = Math.max(0, Math.min(MAX_YEAR, year));
      return {
        currentYear: clamped,
        currentState: state.trajectory[clamped] ?? state.trajectory[0],
      };
    }),
}));
