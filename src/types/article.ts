/**
 * Shared types for The District articles.
 */

export interface Source {
  title: string;
  outlet: string;
  url: string;
  accessDate?: string;
}

export interface AtAGlanceStat {
  value: string | number;
  label: string;
}

export interface ArticleSummary {
  [key: string]: number | string;
}
