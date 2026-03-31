export interface ConceptMeta {
  slug: string;
  title: string;
  shortTitle: string;
  chapter: number;
  category: 'form' | 'role' | 'process' | 'law' | 'finance' | 'structure' | 'election' | 'engagement';
  teaser: string;
  relatedSlugs: string[];
}
