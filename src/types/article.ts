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

export type DistrictArticleKind = "city-deep-dive" | "civics-tool" | "explainer";
export type DistrictArticleStatus = "published" | "draft";

export interface DistrictArticle {
  slug: string;
  kind: DistrictArticleKind;
  status: DistrictArticleStatus;
  title: string;
  dek: string;
  city?: string;
  state?: string;
  publishedAt: string;
  accentColor: string;
  meta: string;
  illustrationKey: string;
  href?: string;
  featured?: boolean;
}
