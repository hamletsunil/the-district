/** Government form codes */
export type GovernmentForm = "CM" | "SM" | "WM" | "CO" | "TM" | "RT";

/** Short keys to minimize JSON size */
export interface CityRecord {
  n: string; // city name
  s: string; // state abbreviation
  c: string; // county name
  p: number; // population
  f: GovernmentForm; // form of government
  t: "city" | "town" | "village" | "borough" | "township";
}

/** Expanded city info for display */
export interface CityProfile {
  name: string;
  state: string;
  county: string;
  population: number;
  form: GovernmentForm;
  type: string;
}

/** Government form metadata */
export const GOVERNMENT_FORMS: Record<
  GovernmentForm,
  { name: string; description: string; percentage: string; count: number }
> = {
  CM: {
    name: "Council-Manager",
    description:
      "An elected council sets policy and hires a professional city manager to run day-to-day operations. The mayor is typically ceremonial.",
    percentage: "48%",
    count: 9456,
  },
  SM: {
    name: "Strong Mayor-Council",
    description:
      "The mayor serves as chief executive with real power — hiring/firing department heads, preparing the budget, and vetoing legislation. The council is the legislative body.",
    percentage: "30%",
    count: 5850,
  },
  WM: {
    name: "Weak Mayor-Council",
    description:
      "The mayor chairs the council and has limited executive authority. Administrative power is shared among the council, with no single executive.",
    percentage: "8%",
    count: 1560,
  },
  CO: {
    name: "Commission",
    description:
      "Elected commissioners each head a city department (police, fire, public works). No separation between legislative and executive power. Nearly extinct.",
    percentage: "<1%",
    count: 143,
  },
  TM: {
    name: "Town Meeting",
    description:
      "All registered voters gather to vote on budgets, ordinances, and policy directly. The purest form of direct democracy, found primarily in New England.",
    percentage: "5%",
    count: 975,
  },
  RT: {
    name: "Representative Town Meeting",
    description:
      "Voters elect town meeting members who attend on their behalf. A hybrid between direct democracy and representative government.",
    percentage: "1%",
    count: 195,
  },
};
