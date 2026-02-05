# The District - Editorial Guidelines for Claude

**Read before every article edit. No exceptions.**

## Full Guidelines

- **VOICE_GUIDELINES.md** - How we write (Economist style, Kill List, structure)
- **EDITORIAL_STANDARDS.md** - Data integrity (sources, claims, methodology)
- **DESIGN_SYSTEM.md** - Visual patterns, CSS tokens, required structure

---

## The Kill List

**Never use these. They are AI tells.**

### Mechanical Parallel Structure
- "First: ... Second: ... Third: ..."
- "One interpretation: ... Another interpretation: ..."
- "Why? Because..." repetition
- AI triads: "Same X. Same Y. Opposite Z."

### Template Sentences
- "Thirty miles away, X tells a different story"
- "In an era of..."
- "These aren't just..." / "This isn't just..."
- "It's worth noting..."
- "raises questions about"
- "suggests that"

### Stakeholder Segmentation
- "For developers, this means..."
- "For residents, the implication is..."

---

## Investigative Depth Requirements

Every article must have:
- **500-700 words minimum** of narrative prose
- **Five Whys** - dig 5 layers deep on every major finding
- **2-3 external sources** - local news, academic research, government reports
- **Alternative explanations** - present multiple interpretations

---

## The Core Rule

**Investigative depth AND good writing are not separate tasks.**

When adding research, external sources, or alternative explanations:
1. Write it as Economist prose FROM THE START
2. Never bolt on scaffolding ("First/Second/Third") that needs removal
3. Present analysis as flowing paragraphs, not numbered lists
4. Let facts and context speak - don't announce the structure

### Bad (mechanical scaffolding):
```
Why? Ask five times and different explanations emerge.

First: Perhaps Newark receives well-prepared proposals...

Second: Perhaps the real decisions happen before cameras...

Third: Perhaps one-party dominance creates discipline...
```

### Good (flowing prose with same substance):
```
Newark's unanimity has several plausible explanations. The city employs
professional staff who vet proposals in committee—if problems get fixed
before the public meeting, votes become formalities. Chicago's council
operated this way for decades under Daley and Emanuel; UIC researchers
called it a "rubber stamp" until Lightfoot's tenure brought divided roll
calls. One-party dominance may also suppress visible dissent—Newark is
a Democratic stronghold where bucking consensus carries political risk.
```

---

## Before Every Article Edit

- [ ] No Kill List phrases
- [ ] No mechanical parallel structure (First/Second/Third)
- [ ] Alternative explanations in prose form
- [ ] External sources researched and cited
- [ ] 500+ words of narrative
- [ ] Read it aloud - does it sound like The Economist or a consulting deck?

---

# Technical Reference

## Project Structure

```
the-district/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage
│   │   ├── globals.css           # CSS import hub (imports from ../styles/)
│   │   ├── api/                  # 11 API routes
│   │   │   ├── subscribe/        # Beehiiv newsletter integration
│   │   │   ├── abundance-index/  # Abundance data endpoints
│   │   │   ├── friction-index/   # Friction index data
│   │   │   ├── official-votes/   # Official voting records
│   │   │   ├── velocity-index/   # Velocity index data
│   │   │   ├── city-excerpts/    # City meeting excerpts
│   │   │   ├── dc-excerpts/      # Data center excerpts
│   │   │   ├── dc-sentiment/     # Data center sentiment analysis
│   │   │   ├── dc-deep-analysis/ # Data center deep analysis
│   │   │   ├── explore-concerns/ # Concern exploration data
│   │   │   └── explore-data/     # General data exploration
│   │   └── articles/
│   │       ├── _template/        # Start new articles here
│   │       ├── data-center-gold-rush/
│   │       ├── abundance-index/
│   │       ├── temperature-check/
│   │       └── vote-tracker/
│   ├── styles/                   # CSS split from globals.css
│   │   ├── tokens.css            # Design tokens, themes, typography
│   │   ├── base.css              # Base styles, masthead, homepage hero
│   │   ├── shared-article.css    # Shared article components
│   │   ├── articles/             # Per-article CSS (data-center, abundance, etc.)
│   │   ├── responsive.css        # Responsive breakpoint fixes
│   │   └── theme-overrides.css   # Sources, subscribe bar, CTA, social share
│   ├── types/article.ts          # Shared article types (Source, AtAGlanceStat)
│   ├── hooks/useIntersectionObserver.ts  # Scroll-triggered visibility hook
│   └── components/
│       ├── article/              # Shared: AtAGlance, ArticleEndCTA, MethodologySection, PullQuote, SocialShare, SourcesCitations, SubscribeBar
│       ├── layout/               # Header, Footer
│       └── viz/                  # AnimatedStat, ScrollySection
├── EDITORIAL_GUIDELINES.md       # Fact-checking, sources
├── EDITORIAL_STANDARDS.md        # Data integrity rules
├── VOICE_GUIDELINES.md           # Writing style (Economist-inspired)
├── DESIGN_SYSTEM.md              # Visual patterns and CSS tokens
└── prisma/schema.prisma          # Hamlet product schema (not used for articles)
```

## Article Requirements

Every article must have:

### Required Imports (use shared components — do not redefine locally)
```tsx
import { AtAGlance } from "@/components/article/AtAGlance";
import { SocialShare } from "@/components/article/SocialShare";
import { ArticleEndCTA } from "@/components/article/ArticleEndCTA";
import { SourcesCitations, Source } from "@/components/article/SourcesCitations";
import { SubscribeBar } from "@/components/article/SubscribeBar";
// Optional but encouraged:
import { MethodologySection } from "@/components/article/MethodologySection";
import { PullQuote } from "@/components/article/PullQuote";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
```

### Structure
```tsx
<main className="[prefix]-article article-page" data-theme="[theme]">
  <HeroSection />
  <AtAGlance
    stats={[
      { value: DATA.summary.totalCities, label: "Cities Analyzed" },
      { value: DATA.summary.avgScore.toFixed(1), label: "Avg Score" },
      { value: DATA.summary.keyCount, label: "Key Metric" },
    ]}
    finding="One-sentence key takeaway."
  />
  {/* Content sections — custom per article, use useIntersectionObserver for scroll animations */}
  <MethodologySection
    prefix="[prefix]"
    title="How We Built This Analysis"
    items={[
      { label: "Data Source", content: "..." },
      { label: "Sample", content: "..." },
      { label: "Limitations", content: "..." },
    ]}
  />
  <SocialShare title="Article Title" />
  <ArticleEndCTA />
  <SourcesCitations sources={SOURCES} />
  <SubscribeBar />
</main>
```

### Data Object
```tsx
import type { Source } from "@/types/article";

const DATA = {
  summary: {
    // Key metrics shown in AtAGlance
  },
  // Analysis data...
};

const SOURCES: Source[] = [
  { title: "...", outlet: "...", url: "..." },
  // Minimum 3 sources
];
```

### Tests will enforce
- `AtAGlance` import (not a local function)
- `SocialShare` import
- `ArticleEndCTA`, `SourcesCitations`, `SubscribeBar` imports
- Valid `data-theme` value (must be in known themes list)
- `article-page` class on `<main>`
- `const DATA` and `const SOURCES` present
- Minimum 3 sources

## Design Tokens (Always Use)

### Colors
- Sentiment: `#ef4444` (negative), `#6b7280` (neutral), `#10b981` (positive)
- Thresholds: <45 = negative, 45-55 = neutral, >55 = positive

### Typography
- Headlines: `--type-hero`, `--tracking-tight`
- Body: Georgia font, `--type-body`, `--leading-relaxed`
- Labels: `--type-tiny`, `--tracking-wider`, uppercase

### Animation
- Easing: `--ease-elegant` (always)
- Scroll animations: IntersectionObserver, threshold 0.2

## Themes

Set via `data-theme` attribute:
- `data-center` - Blue/tech
- `abundance` - Warm cream/green
- `vote-tracker` - Dark slate/amber
- `temperature` - Dark brown/red

## Creating a New Article

1. Copy `src/app/articles/_template/page.tsx.example` to a new folder, rename to `page.tsx`
2. Choose or create a `data-theme` and class prefix (e.g., `myarticle-`)
3. If creating a new theme, add it to `src/styles/tokens.css` and update `VALID_THEMES` in `src/__tests__/articles.test.ts`
4. Create `src/styles/articles/[name].css` for article-specific styles, add `@import` to `globals.css`
5. Write the `DATA` object and `SOURCES` array first
6. Use shared components — **do not redefine** `AtAGlance`, `MethodologySection`, etc. locally
7. Use `useIntersectionObserver` hook for scroll-triggered animations instead of raw IntersectionObserver
8. Custom visualizations go in article-local functions — shared components handle structure, articles handle unique content
9. Add sources (minimum 3, Tier 1-2 only)
10. Run `npm run test:run` — the article structure tests catch missing imports, invalid themes, and structural issues
11. Run `npm run build` — catches CSS import errors and SSR issues
12. Run validation checklist from EDITORIAL_GUIDELINES.md

## Newsletter Integration

The subscribe form calls `/api/subscribe` which uses Beehiiv.

**Required env vars:**
```
BEEHIIV_API_KEY=
BEEHIIV_PUBLICATION_ID=
```

## Common Patterns

### Scroll-Triggered Visibility (use the hook, not raw IntersectionObserver)
```tsx
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
// Attach ref to container, use isVisible to trigger animations
```

### Animated Number Counter (use the component for simple counters)
```tsx
import { AnimatedStat } from "@/components/viz/AnimatedStat";

<AnimatedStat value={156} label="Cities Analyzed" format="comma" />
<AnimatedStat value={49.9} label="Avg Score" format="decimal" />
```
For custom animation logic beyond simple counters, use `useIntersectionObserver` directly.

### Parallax Hero (keep in article — this is visual identity)
```tsx
const opacity = Math.max(0, 1 - scrollY / 600);
const translateY = scrollY / 3;
```

### Pull Quotes
```tsx
import { PullQuote } from "@/components/article/PullQuote";

<PullQuote
  text="The amount of electricity the data center requires is staggering."
  city="San Angelo"
  state="TX"
  className="dc-pull-quote"
/>
```

### Sentiment Color Helper
```tsx
function getSentimentColor(score: number): string {
  if (score < 45) return "#ef4444";
  if (score > 55) return "#10b981";
  return "#6b7280";
}
```

## What's Shared vs. What's Custom

| Shared (import, don't redefine) | Custom per article |
|--------------------------------|-------------------|
| `AtAGlance` — stats + finding | Hero section — unique visual identity |
| `MethodologySection` — structured items | Data visualizations — charts, maps, bars |
| `SocialShare`, `ArticleEndCTA`, `SourcesCitations`, `SubscribeBar` | Narrative sections — prose + analysis |
| `PullQuote` — blockquotes with attribution | Section-specific animations beyond counters |
| `useIntersectionObserver` — scroll visibility | Article-specific CSS (own file in `src/styles/articles/`) |
| `AnimatedStat` — counting numbers | Theme definition (if new theme needed) |
