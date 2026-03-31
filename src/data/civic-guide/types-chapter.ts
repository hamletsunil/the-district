export interface ChapterMeta {
  id: string;
  slug: string; // URL-safe slug for routing (same as id)
  number: string; // Roman numeral
  title: string;
  shortTitle: string;
  description: string; // One-paragraph description for chapter grid
}

export interface ChapterStat {
  key: string;
  value: string;
  source: { title: string; outlet: string; url: string };
}

export interface ChapterProse {
  type: "paragraph" | "heading";
  html: string;
  level?: 2 | 3;
}

export interface ChapterCallout {
  variant: "misconception" | "why-matters" | "state-variation" | "did-you-know";
  title: string;
  body: string;
}

export interface ChapterExample {
  city: string;
  state: string;
  summary: string;
  sourceUrl: string;
  sourceTitle?: string;
}

export interface ConceptSeed {
  slug: string;
  title: string;
  teaser: string;
}

export interface ChapterContent {
  id: string;
  stats: ChapterStat[];
  prose: ChapterProse[];
  callouts: ChapterCallout[];
  examples: ChapterExample[];
  sources: { title: string; outlet: string; url: string }[];
  conceptSeeds: ConceptSeed[];
}
