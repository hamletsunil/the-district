# Budget Priorities Article: Design Document

**Author:** Paige Saez
**Working title:** Follow the Money
**Date:** 2026-02-04

---

## Thesis

When money's on the table, the talking points change. By analyzing what topics dominate budget discussions across hundreds of city halls, we can map what American cities actually care about — and where the fights are.

## Data Source

Hamlet municipal transcript database, filtered for budget-related discussions. Same primary source as all District articles.

## Topic Categories

Budget discussion segments classified into:
- **Public safety** — police, fire, EMS
- **Infrastructure** — roads, water, utilities
- **Parks & recreation**
- **Housing & development**
- **Education** (where cities fund it)
- **Administration / overhead**

## Key Metrics

- Number of cities with budget discussion data
- Topic distribution (% of budget discussions per category)
- Outlier cities (unusually focused on one topic)
- Regional patterns (geographic clustering of priorities)

## Geographic Scope

Determined by data availability. Query Hamlet transcripts for budget-related mentions, then scope based on what comes back.

---

## Article Structure

### 1. Hero
- Dark background with amber/electric green accents
- Title, subtitle, city count badge
- **Byline: Paige Saez** (new shared Byline component)

### 2. At a Glance (shared component)
- Cities analyzed count
- Total budget mentions
- Dominant topic nationally

### 3. The National Picture
- Ranked horizontal bar chart of topic categories
- Shows what cities argue about most when budgets are discussed
- "Here's the headline" visualization

### 4. Regional Patterns
- Table or heatmap: regions/states as rows, topic categories as columns
- Reveals geographic clustering of budget priorities
- CSS-driven, no charting library

### 5. The Outliers
- Cities with extreme focus on a single topic
- Cards with city name, dominant topic %, pull quote from transcript
- Uses PullQuote shared component

### 6. Case Studies
- 2-3 deep dives into specific cities
- Economist-style narrative prose with transcript excerpts
- The storytelling heart of the article

### 7. Methodology (shared component)
- Topic classification method
- Sample size and date range
- Limitations (transcript analysis ≠ actual spending)

### 8. Footer (all shared components)
- SocialShare
- ArticleEndCTA
- SourcesCitations (minimum 3 Tier 1-2 sources)
- SubscribeBar

---

## Technical Implementation

### New Files
- `src/app/articles/budget-priorities/page.tsx`
- `src/styles/articles/budget-priorities.css`
- `@import` added to `globals.css`

### Theme
- `data-theme="budget"`
- Dark base (`#0f0f0f` range), amber or electric green accents
- Defined in `src/styles/tokens.css`

### Byline System (new shared infrastructure)
- `src/components/article/Byline.tsx`
- Props: `author: string`, `date: string`, optional `authorUrl?: string`
- Retrofit all 4 existing articles with Sunil's byline
- This article: `author="Paige Saez"`

### Visualizations (article-local)
- Topic bar chart — horizontal bars, CSS + inline styles, scroll-triggered via `useIntersectionObserver`
- Regional heatmap — HTML table with CSS color coding
- Outlier cards — styled cards, no external dependencies

### Data
- `const DATA` object with budget analysis results
- `const SOURCES: Source[]` with minimum 3 verified sources
- Data hardcoded or fetched from new API route (TBD based on data availability)

---

## Open Questions

1. **Data availability** — Is budget discussion data already extracted from Hamlet, or does extraction need to happen first?
2. **Accent color** — Amber (warm, investigative) or electric green (money, finance)? Decide when we see it on the dark background.
3. **Article URL slug** — `budget-priorities` or `follow-the-money`?

---

## Verification

- [ ] `npm run test:run` — all tests pass (imports, data-theme, DATA, SOURCES)
- [ ] `npm run build` — no build errors
- [ ] Visual check — article renders correctly, theme looks good
- [ ] Editorial checklist from EDITORIAL_GUIDELINES.md
- [ ] Data integrity checklist from EDITORIAL_STANDARDS.md
