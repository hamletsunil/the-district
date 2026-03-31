export type GlossaryCategory = "structure" | "process" | "law" | "finance" | "role" | "election";

export interface GlossaryTerm {
  slug: string;
  term: string;
  definition: string;
  chapters: string[];
  category: GlossaryCategory;
}

export const GLOSSARY_CATEGORIES: { key: GlossaryCategory; label: string }[] = [
  { key: "structure", label: "Structure" },
  { key: "process", label: "Process" },
  { key: "law", label: "Law" },
  { key: "finance", label: "Finance" },
  { key: "role", label: "Roles" },
  { key: "election", label: "Elections" },
];

const GLOSSARY_UNSORTED: GlossaryTerm[] = [
  // ===== STRUCTURE =====
  {
    slug: "municipality",
    term: "Municipality",
    definition: "A city, town, village, or borough with its own government. The Census counts 19,491. Their powers, naming conventions, and structures vary wildly by state.",
    chapters: ["I", "II"],
    category: "structure",
  },
  {
    slug: "county",
    term: "County",
    definition: "The 3,031 primary subdivisions of states. They run courts, jails, public health departments, roads, and elections. Louisiana calls them parishes. Alaska calls them boroughs. Connecticut abolished them entirely.",
    chapters: ["II", "XII"],
    category: "structure",
  },
  {
    slug: "township",
    term: "Township",
    definition: "A unit of government found in 20 states, mostly in the Midwest and New England. Civil townships exercise real authority over roads and zoning; survey townships are just geographic grids.",
    chapters: ["II"],
    category: "structure",
  },
  {
    slug: "special-district",
    term: "Special District",
    definition: "A single-purpose government that provides one service — fire protection, water, sewerage, mosquito abatement. At 39,555, they outnumber every other type of local government. Most voters can't name one.",
    chapters: ["I", "II", "XIII"],
    category: "structure",
  },
  {
    slug: "charter-city",
    term: "Charter City",
    definition: "A city that has adopted its own governing document — essentially a local constitution — defining its structure, powers, and procedures. Gives broader autonomy than operating under general state law.",
    chapters: ["XI"],
    category: "structure",
  },
  {
    slug: "general-law-city",
    term: "General-Law City",
    definition: "A city that relies entirely on the state's municipal code for its authority, rather than adopting its own charter. Has less autonomy than a charter city.",
    chapters: ["XI"],
    category: "structure",
  },
  {
    slug: "council-manager",
    term: "Council-Manager Government",
    definition: "A form of government where an elected council sets policy and hires a professional manager to run operations. The mayor is typically ceremonial. Used by 48% of American cities.",
    chapters: ["I", "III", "IV"],
    category: "structure",
  },
  {
    slug: "strong-mayor",
    term: "Strong Mayor",
    definition: "A mayor with real executive power — hiring department heads, preparing the budget, vetoing legislation. New York, Chicago, Los Angeles, and Houston use this model. About 30% of cities.",
    chapters: ["III", "IV"],
    category: "structure",
  },
  {
    slug: "weak-mayor",
    term: "Weak Mayor",
    definition: "A mayor who chairs the council but has limited independent authority. Administrative power is dispersed among council members and committees. About 8% of cities.",
    chapters: ["III", "IV"],
    category: "structure",
  },
  {
    slug: "commission-form",
    term: "Commission Form",
    definition: "A nearly extinct government structure where each elected commissioner directly runs a department. Born in Galveston, Texas, after the 1900 hurricane. Fewer than 150 cities still use it.",
    chapters: ["III"],
    category: "structure",
  },
  {
    slug: "town-meeting",
    term: "Town Meeting",
    definition: "A form of direct democracy where all registered voters gather physically to vote on budgets and policy. Found almost exclusively in New England, where towns have governed this way since the 1600s.",
    chapters: ["III"],
    category: "structure",
  },

  // ===== PROCESS =====
  {
    slug: "consent-calendar",
    term: "Consent Calendar",
    definition: "A bundle of routine agenda items — minutes, contract renewals, staff appointments — voted on as a single action without individual discussion. Typically passes in under 90 seconds.",
    chapters: ["V", "VI"],
    category: "process",
  },
  {
    slug: "ordinance",
    term: "Ordinance",
    definition: "A local law with legal force that can impose penalties and bind residents. Requires a multi-reading process and typically cannot be changed except by another ordinance.",
    chapters: ["V"],
    category: "process",
  },
  {
    slug: "staff-report",
    term: "Staff Report",
    definition: "The document prepared by city staff for every agenda item, containing factual findings, legal analysis, fiscal impact, and a recommendation. Often determines the outcome before the public hearing begins.",
    chapters: ["V", "XIII"],
    category: "process",
  },
  {
    slug: "public-hearing",
    term: "Public Hearing",
    definition: "A legally required proceeding where residents can testify before officials vote. Mandated for zoning changes, fee increases, and budget adoption. Notice requirements vary by state.",
    chapters: ["V", "VI", "VII"],
    category: "process",
  },
  {
    slug: "by-right-development",
    term: "By-Right Development",
    definition: "A project that complies with all zoning standards and is approved administratively without a public hearing. Research shows by-right projects are permitted 28% faster than discretionary ones.",
    chapters: ["VII"],
    category: "process",
  },
  {
    slug: "discretionary-review",
    term: "Discretionary Review",
    definition: "An approval process requiring subjective judgment by planning commissioners or council members, typically triggered when a project seeks exceptions to zoning rules.",
    chapters: ["VII"],
    category: "process",
  },
  {
    slug: "variance",
    term: "Variance",
    definition: "An exception to zoning code requirements granted by the Board of Zoning Appeals when strict application would create undue hardship from the property's unique physical characteristics.",
    chapters: ["VII"],
    category: "process",
  },
  {
    slug: "conditional-use-permit",
    term: "Conditional Use Permit (CUP)",
    definition: "Permission to use land in a way that is compatible with a zone but requires site-specific conditions — such as a church in a residential district or a drive-through near a school.",
    chapters: ["VII"],
    category: "process",
  },
  {
    slug: "codification",
    term: "Codification",
    definition: "The process of integrating newly adopted ordinances into the organized municipal code, handled by specialized publishers who maintain the code's structure and cross-references.",
    chapters: ["V"],
    category: "process",
  },

  // ===== LAW =====
  {
    slug: "dillons-rule",
    term: "Dillon's Rule",
    definition: "A legal doctrine from an 1868 Iowa case holding that cities can exercise only powers explicitly granted by the state. Any reasonable doubt is resolved against the city. Applied in 31 states.",
    chapters: ["XI"],
    category: "law",
  },
  {
    slug: "home-rule",
    term: "Home Rule",
    definition: "A legal principle granting cities the authority to exercise any power not expressly prohibited by the state — the opposite of Dillon's Rule. Ten states grant broad home rule to all municipalities.",
    chapters: ["XI"],
    category: "law",
  },
  {
    slug: "preemption",
    term: "Preemption",
    definition: "When a state law overrides or strips local authority over a policy area. Forty-six states now bar cities from passing gun regulations stricter than state law. Twenty-five prevent local minimum wage laws.",
    chapters: ["XI", "XIV"],
    category: "law",
  },
  {
    slug: "brown-act",
    term: "Brown Act",
    definition: "California's open meeting law (1953) requiring that public business be conducted in public. Mandates 72-hour advance posting of agendas, limits agenda items to 20 words, and requires public comment periods.",
    chapters: ["VI"],
    category: "law",
  },
  {
    slug: "ceqa",
    term: "CEQA",
    definition: "The California Environmental Quality Act, requiring environmental analysis for any discretionary government action with potentially significant effects. A full Environmental Impact Report takes 6-12 months.",
    chapters: ["VII"],
    category: "law",
  },
  {
    slug: "eminent-domain",
    term: "Eminent Domain",
    definition: "The government's power to take private property for public use with just compensation. After the Kelo decision (2005), 45 states enacted reforms restricting this power — the most widespread response to a Supreme Court decision in history.",
    chapters: ["VII"],
    category: "law",
  },
  {
    slug: "executive-session",
    term: "Executive Session",
    definition: "A closed meeting permitted by state law only for narrow purposes: pending litigation, real property negotiations, personnel evaluations, and labor negotiations. The body must publicly announce the reason before closing the doors.",
    chapters: ["VI"],
    category: "law",
  },
  {
    slug: "limited-public-forum",
    term: "Limited Public Forum",
    definition: "A government-created space for public speech — such as the public comment period at a council meeting — that receives First Amendment protection. Officials cannot discriminate by content or viewpoint.",
    chapters: ["VI"],
    category: "law",
  },
  {
    slug: "monell-standard",
    term: "Monell Standard",
    definition: "From a 1978 Supreme Court case: a city can be held liable for civil rights violations only if the violation results from official policy, practice, or custom — not merely from employing someone who violated rights.",
    chapters: ["XI"],
    category: "law",
  },
  {
    slug: "sovereign-immunity",
    term: "Sovereign Immunity",
    definition: "The legal doctrine that governments cannot be sued without their consent. Most states have partially waived immunity through tort claims acts, but notice periods, damage caps, and exemptions vary wildly.",
    chapters: ["XI"],
    category: "law",
  },

  // ===== FINANCE =====
  {
    slug: "property-tax",
    term: "Property Tax",
    definition: "The bedrock of local government revenue, supplying 72% of all local tax revenue. Unlike income taxes, property taxes provide stable revenue even during recessions — but are uniquely visible and politically explosive.",
    chapters: ["I", "VIII"],
    category: "finance",
  },
  {
    slug: "enterprise-fund",
    term: "Enterprise Fund",
    definition: "A financial structure where a utility or service covers its own costs through user fees rather than general taxes. Water, sewer, and transit systems typically operate this way.",
    chapters: ["XIII"],
    category: "finance",
  },
  {
    slug: "fiscalization-of-land-use",
    term: "Fiscalization of Land Use",
    definition: "Cities approving developments based on tax revenue potential rather than community need. A shopping center generates sales tax; apartments generate schoolchildren. The math pushes cities toward commercial development.",
    chapters: ["VIII"],
    category: "finance",
  },
  {
    slug: "unfunded-pension-liability",
    term: "Unfunded Pension Liability",
    definition: "The gap between retirement benefits a government has promised its workers and the money set aside to pay for them. Nationally, this gap exceeds $1.34 trillion.",
    chapters: ["VIII", "XIV"],
    category: "finance",
  },
  {
    slug: "proposition-13",
    term: "Proposition 13",
    definition: "California's 1978 ballot measure capping property tax rates at 1% of assessed value with annual increases limited to 2%. Two neighbors in identical houses can pay vastly different taxes depending on when they bought.",
    chapters: ["VIII"],
    category: "finance",
  },
  {
    slug: "rhna",
    term: "RHNA",
    definition: "Regional Housing Needs Allocation — California's process of assigning housing production targets to every city and county. The Bay Area's 2023-2031 cycle allocated 441,176 units.",
    chapters: ["VII"],
    category: "finance",
  },
  {
    slug: "participatory-budgeting",
    term: "Participatory Budgeting",
    definition: "A process allowing residents to directly allocate a slice of public funds. Sixty-four U.S. cities have tried it, allocating a combined $360 million. Seattle commits $27.25 million.",
    chapters: ["X"],
    category: "finance",
  },

  // ===== ROLES =====
  {
    slug: "city-manager",
    term: "City Manager",
    definition: "A hired professional executive who runs day-to-day operations in council-manager cities — hiring staff, preparing budgets, directing departments. Answers to the elected council and can be fired by a simple majority vote.",
    chapters: ["I", "III", "IV"],
    category: "role",
  },
  {
    slug: "city-clerk",
    term: "City Clerk",
    definition: "The official who maintains records, administers elections, records council proceedings, issues licenses, and serves as custodian of the city seal. Often the municipality's longest-serving official and its institutional memory.",
    chapters: ["IV"],
    category: "role",
  },
  {
    slug: "city-attorney",
    term: "City Attorney",
    definition: "The lawyer who drafts ordinances, reviews contracts, advises the council on open-meeting and public-records law, and represents the city in litigation. May be elected (giving political independence) or appointed.",
    chapters: ["IV"],
    category: "role",
  },
  {
    slug: "planning-director",
    term: "Planning Director",
    definition: "The official who manages zoning administration, comprehensive plan updates, and development review. Reports to the city manager in council-manager cities or the mayor in strong-mayor cities.",
    chapters: ["IV"],
    category: "role",
  },

  // ===== ELECTIONS =====
  {
    slug: "at-large-election",
    term: "At-Large Election",
    definition: "A system where all council members are elected by the entire city's voters rather than by district. Historically favored candidates with citywide name recognition and fundraising capacity.",
    chapters: ["IV", "IX"],
    category: "election",
  },
  {
    slug: "district-election",
    term: "District Election",
    definition: "A system where council members represent specific geographic areas. Improves representation for geographically concentrated communities — a finding that drove Voting Rights Act litigation for decades.",
    chapters: ["IV", "IX"],
    category: "election",
  },
  {
    slug: "off-cycle-election",
    term: "Off-Cycle Election",
    definition: "A municipal election held outside presidential or midterm years. Average turnout: 27%. When Baltimore moved to on-cycle voting, participation jumped from 13% to 60%.",
    chapters: ["I", "IX"],
    category: "election",
  },
  {
    slug: "ranked-choice-voting",
    term: "Ranked Choice Voting",
    definition: "A voting method where voters rank candidates by preference. If no one wins a majority, the last-place candidate is eliminated and their voters' second choices are redistributed. Used in 51 U.S. jurisdictions.",
    chapters: ["IX"],
    category: "election",
  },
  {
    slug: "recall",
    term: "Recall",
    definition: "The power to remove an elected official before their term expires. Permitted in 39 states. Ballotpedia tracked 276 efforts in 2025 alone — more than five per week. When recalls reach the ballot, officials are removed 71% of the time.",
    chapters: ["X"],
    category: "election",
  },
];

export const GLOSSARY = GLOSSARY_UNSORTED.sort((a, b) => a.term.localeCompare(b.term));
