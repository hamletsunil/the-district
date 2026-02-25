export interface ScenarioAnnotation {
  year: number;
  text: string;
}

export interface Scenario {
  name: string;
  tagline: string;
  description: string;
  preview: string;
  narrative_y1: string;
  narrative_y3: string;
  narrative_y10: string;
  changes: ScenarioAnnotation[];
  sliders: {
    education: number;
    housing: number;
    safety: number;
    economy: number;
  };
}

export const SCENARIOS: Record<string, Scenario> = {
  status_quo: {
    name: "Drift",
    tagline: "No new bets. The city coasts on current policy.",
    description:
      "Oakland continues on its current trajectory. Slight underinvestment across all sectors. The $360M deficit constrains everything. Police staffing stays below target. Housing permits trickle through. The city doesn't crash -- it erodes.",
    preview: "Slow erosion across the board. Composite falls from 42 to 37. Only affordability holds.",
    narrative_y1:
      "The simulation reveals a quiet erosion. With slight underinvestment across all sectors, Oakland's indices slip gradually. Education drifts from 36 to 35 by year 3. Safety holds near 31 -- unchanged, but unimproved. Prosperity weakens to 46 as the deficit constrains economic development. The only stable metric is affordability at 54: without growth, there's nothing to drive up prices.",
    narrative_y3:
      "The compound cost of inaction is becoming clear. By mid-decade, education has slipped to 34, prosperity to 44. Safety has declined to 30 -- the officer gap never closed, and feedback loops are dragging it further. Oakland hasn't experienced a crisis; it has experienced something worse: a slow fade. Each year slightly worse than the last, with no single headline to force a response.",
    narrative_y10:
      "A decade of drift has cost Oakland 5 points of composite score -- from 42 to 37. Education has fallen to 30, safety to 26, and prosperity to 39. Affordability is unchanged at 54, which is not a victory -- it merely means the city isn't attractive enough to drive up prices. The paradox of drift: nothing went visibly wrong, and yet everything got worse. Diminishing returns limit the decline -- Oakland doesn't collapse, it just fades.",
    changes: [
      { year: 1, text: "No new policy. No new crisis. Year one looks like continuity." },
      { year: 2, text: "OUSD enrollment drops again. Education slides to 35.5 as school budgets tighten." },
      { year: 3, text: "Prosperity dips to 45.6. Downtown vacancies creep up along Broadway." },
      { year: 4, text: "Safety slips to 30.2. OPD attrition continues: five officers out per month." },
      { year: 5, text: "Education at 33.9. Teachers follow officers out of Oakland." },
      { year: 6, text: "Composite hits 40. Half a decade of drift, and no headline forced action." },
      { year: 7, text: "Prosperity at 42.4 -- down 5 points. Jack London Square shops shutter." },
      { year: 8, text: "Education 31.7, safety 27.6. Decline now visible in test scores and response times." },
      { year: 9, text: "Composite 38. The city hasn't crashed -- it has faded, quietly and steadily." },
      { year: 10, text: "Decade of drift: composite 37 (down 5). Every index fell except affordability -- which held only because nothing else improved." },
    ],
    sliders: { education: 0.4, housing: 0.4, safety: 0.5, economy: 0.4 },
  },
  safety_first: {
    name: "Police & Prosperity",
    tagline: "$80M into policing and downtown. Schools and housing wait.",
    description:
      "Oakland bets big on public safety and economic development. $80M in new police funding aims to close the 342-officer gap. Downtown revitalization accelerates. Education and housing get the minimum. The theory: safety drives business confidence, which drives tax revenue, which funds everything else.",
    preview: "Safety rises to 49. Prosperity gains modestly. But affordability falls to 39.",
    narrative_y1:
      "The safety investment shows early returns. By year 1, the safety index rises to 33 -- a meaningful uptick. Prosperity edges up to 49 as business confidence responds to visible policing. But the trade-offs are already visible: education begins to slip as school budgets are redirected, and affordability dips to 53 as rising property values begin displacing flatlands residents.",
    narrative_y3:
      "The transformation builds steadily. Safety reaches 38 by year 3 and 39 by year 4. Prosperity crosses 51, driven by downtown investment and business confidence. But education has slipped to 35 and affordability at 51 is declining faster now -- the prosperity-affordability tension is biting. The city is improving on two metrics while losing ground on two others.",
    narrative_y10:
      "A decade of safety-first investment has delivered significant gains -- and significant costs. Safety at 49 has risen nearly 18 points, the largest single-index improvement of any scenario. Prosperity at 51 has crossed the midpoint. But education has slipped to 32 -- the opportunity cost of defunding schools -- and affordability at 39 has fallen 15 points as a safer, more prosperous Oakland has become a more expensive one. The composite barely changed: 42 to 43. The gains and losses roughly cancel out. A transformed city -- but whether the transformation was worth it depends entirely on where you live.",
    changes: [
      { year: 1, text: "New OPD recruits hit the streets. Safety jumps to 33.4 -- first uptick in years." },
      { year: 2, text: "Safety 35.5. Downtown foot patrol returns. School budgets take the first cut." },
      { year: 3, text: "Safety 37.5, prosperity crosses 50. Business confidence recovers on Telegraph." },
      { year: 4, text: "Safety 39.4. Ceasefire expansion showing results. Affordability drops to 48.8." },
      { year: 5, text: "Safety above 41 for the first time. Rockridge rents surge; Fruitvale feels the squeeze." },
      { year: 6, text: "Safety 42.9. A safer Oakland is a pricier Oakland. Affordability at 45.3." },
      { year: 7, text: "Safety 44.6. Education at 33.3 -- the cost of three years of diverted school funding." },
      { year: 8, text: "Safety 46.2. Approaching national norms. But who can still afford to live here?" },
      { year: 9, text: "Affordability at 40.3. Flatlands displacement accelerates as property values rise." },
      { year: 10, text: "Safety 49 (+18), prosperity 51. Affordability 39 (-15): Oakland's gains came with an eviction notice." },
    ],
    sliders: { education: 0.2, housing: 0.2, safety: 0.85, economy: 0.75 },
  },
  equity_forward: {
    name: "Schools & Housing",
    tagline: "Fund education and affordable housing. Policing stays flat.",
    description:
      "Oakland's progressive majority goes all-in on education, affordable housing, and violence prevention. Police staffing stays flat while Ceasefire expands. The Housing Element gets serious funding. The bet: address root causes now, and reap long-term benefits.",
    preview: "Education rises to 46. Affordability improves to 59. Safety and prosperity decline.",
    narrative_y1:
      "Investment in schools and housing takes time, and the early years are politically painful. Education inches up to 38 by year 2 as school investments begin showing results. Affordability rises slightly to 55 as affordable housing policy starts to take effect. But safety deteriorates to 30 as police staffing stays flat, and prosperity drops to 45 as businesses wait for the safety improvements that haven't arrived.",
    narrative_y3:
      "The equity strategy is diverging. Education reaches 42 by year 5 as school investments mature. Affordability climbs to 57, making Oakland modestly more affordable than its current trajectory. But safety has slipped to 29, and prosperity at 43 reflects a business community unsettled by rising crime. The feedback loops are visible: declining safety undermines schools, partially offsetting education investment. The progressive coalition holds firm, arguing the investments need more time.",
    narrative_y10:
      "The long game has delivered on two of four dimensions. Education at 46 has gained nearly 10 points -- a decade of school investment bearing fruit. Affordability at 59 is the best of any scenario: Oakland has become what its progressive majority wanted, a city where working families can stay. But safety at 25 has fallen 6 points -- the cost of flat police budgets -- and prosperity at 38 has declined 9 points as the economic base contracted. The composite is virtually unchanged at 42, masking deeply polarized outcomes. Root-cause investment works -- slowly, partially, and with real costs along the way.",
    changes: [
      { year: 1, text: "Biggest school funding increase in a decade. Housing permits accelerate." },
      { year: 2, text: "Education climbs to 38.4 -- new reading programs in Fruitvale and East Oakland." },
      { year: 3, text: "Education 39.8, affordability 55.5. Root-cause investment showing early returns." },
      { year: 4, text: "Education 41.1. But safety at 29.6 -- OPD can't compete with suburban departments." },
      { year: 5, text: "Education crosses 42. Affordability 56.7. Safety 29.1 -- the political cost of staying the course." },
      { year: 6, text: "OUSD sees first test-score gains in a decade. Safety 28.5 -- crime displacement worsens." },
      { year: 7, text: "Education 44.1, approaching Bay Area norms. Prosperity at 41.3 -- businesses remain cautious." },
      { year: 8, text: "Education 44.9. Affordability 58.2. Safety 27.0 -- still 3x the national average." },
      { year: 9, text: "Safety 26.1, prosperity 39.2. Winning on two dimensions, losing on two." },
      { year: 10, text: "Education 46 (+10), affordability 59 (+5). Safety 25 (-6), prosperity 38 (-9). A city reshaped by its values." },
    ],
    sliders: { education: 0.75, housing: 0.8, safety: 0.3, economy: 0.25 },
  },
  balanced_recovery: {
    name: "Spread the Bet",
    tagline: "A little funding for everything. No big swings.",
    description:
      "Oakland spreads investment evenly: modest police hiring, moderate housing acceleration, incremental school funding, and targeted business incentives. Nothing gets transformative investment, but nothing is neglected. The pragmatist's path.",
    preview: "Everything improves modestly. Composite rises from 42 to 44. No dimension transforms.",
    narrative_y1:
      "Everything moves -- slowly. Education rises to 37, safety to 32, prosperity to 48. Affordability dips slightly to 54 as modest prosperity gains push prices. No headlines. No crises. The council achieves an unusual consensus: this path offends no one.",
    narrative_y3:
      "Balanced Recovery produces Oakland's most even outcome: all four indices improve simultaneously (except affordability, which trades 1-2 points for gains elsewhere). By year 5, education reaches 39, safety 34, prosperity 49. The composite has risen from 42 to 43. The pragmatist's case: steady, sustainable progress across every dimension. The critic's case: too slow for a city in crisis.",
    narrative_y10:
      "Ten years of balanced investment has produced a composite of 44 -- a gain of 1.6 points. Education rose to 41, safety to 36, prosperity to 50. Affordability slipped from 54 to 50 as rising prosperity pushed up costs -- the prosperity-affordability tension is inescapable. This is the only scenario where three of four indices improved. It's also the scenario with the smallest maximum gain: +4.3 points. The trade-off of the pragmatist's path: no dimension collapses, but no dimension transforms either. Oakland avoided the worst of every scenario. It also missed the best.",
    changes: [
      { year: 1, text: "Modest investment everywhere. No headlines. Council finds rare consensus." },
      { year: 2, text: "Education 37.0, safety 32.1, prosperity 48.1. All trending up." },
      { year: 3, text: "Education 37.5, safety 32.6. Affordability starts to slide: 53.4." },
      { year: 4, text: "Education 38.0, safety 33.1, prosperity 48.8. Steady, unremarkable, effective." },
      { year: 5, text: "Composite 43.4. Three indices improved. Affordability trades 1.6 points for progress." },
      { year: 6, text: "Education 38.9, safety 33.9. Sustainable gains with no sector in freefall." },
      { year: 7, text: "Prosperity 49.5 -- within striking distance of 50. Affordability 51.4, still manageable." },
      { year: 8, text: "Composite 43.7. The smallest maximum gain but the widest improvement base." },
      { year: 9, text: "Education 40.1, safety 35.1. Affordability crosses below 51 -- the prosperity tension is inescapable." },
      { year: 10, text: "Composite 44 (+1.6). No dimension collapsed. No dimension transformed. The most stable outcome." },
    ],
    sliders: { education: 0.55, housing: 0.55, safety: 0.55, economy: 0.55 },
  },
  austerity: {
    name: "Budget Collapse",
    tagline: "The deficit forces deep cuts everywhere. The spiral begins.",
    description:
      "The deficit forces deep cuts across all departments. Police lose another 40 officers to attrition. Housing permits slow as staff is cut. Schools face budget reductions. Economic development programs are eliminated. This is what happens when a $360M hole isn't addressed.",
    preview: "Three indices approach the floor. Composite falls from 42 to 22. Only affordability survives.",
    narrative_y1:
      "The cuts are immediate and severe. By year 1, safety drops to 30, prosperity to 45. Education begins falling. By year 3, education has declined to 31, safety to 26, and prosperity to 40. The only metric that doesn't decline is affordability -- because economic contraction has reduced demand for Oakland housing. That is not a victory.",
    narrative_y3:
      "The austerity spiral is now self-reinforcing. Lower safety drives out businesses, reducing tax revenue, forcing deeper cuts. Education reaches 26 by year 5. Safety drops to 22, prosperity to 34. The feedback loops accelerate the decline: declining safety drags prosperity, declining prosperity feeds crime, declining affordability drives out the workforce. By year 7, education is at 21, safety at 16, prosperity at 27. State fiscal oversight discussions begin in Sacramento.",
    narrative_y10:
      "The spiral has reached near-bottom. Education at 10, safety at 6, prosperity at 15. The city's tax base has contracted so severely that the budget can barely fund basic services. Affordability at 57 is the only surviving metric -- a bitter irony. Oakland is cheaper because nobody wants to live there. The composite of 22 represents a 20-point decline from baseline -- nearly halved. This is not a hypothetical worst case. This is what happens when a $360M structural deficit goes unaddressed for a decade. Diminishing returns slow the collapse near the floor, but the damage is done.",
    changes: [
      { year: 1, text: "Immediate cuts. OPD loses two dozen officers. Two employers announce departures." },
      { year: 2, text: "Education 33.1, safety 28.3. Businesses begin relocating across the bridge." },
      { year: 3, text: "Education 31.0, safety 26.4, prosperity 39.6. The spiral is underway." },
      { year: 4, text: "Education below 29. Safety below 25. Feedback loops now self-reinforcing." },
      { year: 5, text: "Composite 34.4. Tax revenue falling faster than cuts can track." },
      { year: 6, text: "Education 23.5, safety 19.2. State fiscal oversight discussions begin in Sacramento." },
      { year: 7, text: "Prosperity at 26.7 -- half of baseline. International Blvd storefronts empty." },
      { year: 8, text: "Education 17.4, safety 13.1. Response times now measured in hours, not minutes." },
      { year: 9, text: "Composite 25.0. Affordability is the sole survivor -- only because no one wants to live here." },
      { year: 10, text: "Composite 22 (-20). Education 10, safety 6, prosperity 15. Only affordability endures -- a marker of decline, not virtue." },
    ],
    sliders: { education: 0.15, housing: 0.15, safety: 0.2, economy: 0.15 },
  },
};

export const SCENARIO_ORDER = [
  "status_quo",
  "safety_first",
  "equity_forward",
  "balanced_recovery",
  "austerity",
] as const;
