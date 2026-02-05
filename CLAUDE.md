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
│   │   ├── globals.css           # All styles (6000+ lines)
│   │   ├── api/subscribe/        # Beehiiv newsletter integration
│   │   └── articles/
│   │       ├── _template/        # Start new articles here
│   │       ├── data-center-gold-rush/
│   │       ├── abundance-index/
│   │       ├── temperature-check/
│   │       └── vote-tracker/
│   └── components/
│       ├── article/              # Shared: ArticleEndCTA, SourcesCitations, SubscribeBar
│       ├── layout/               # Header, Footer
│       └── viz/                  # ScrollySection (unused)
├── EDITORIAL_GUIDELINES.md       # Fact-checking, sources
├── EDITORIAL_STANDARDS.md        # Data integrity rules
├── VOICE_GUIDELINES.md           # Writing style (Economist-inspired)
├── DESIGN_SYSTEM.md              # Visual patterns and CSS tokens
└── prisma/schema.prisma          # Hamlet product schema (not used for articles)
```

## Article Requirements

Every article must have:

### Structure
```tsx
<main className="[prefix]-article article-page" data-theme="[theme]">
  <HeroSection />
  <AtAGlance />           {/* Required - key stats */}
  {/* Content sections */}
  <MethodologySection />  {/* Required - transparency */}
  <ArticleEndCTA />       {/* Required - from components */}
  <SourcesCitations />    {/* Required - from components */}
  <SubscribeBar />        {/* Required - from components */}
</main>
```

### Data Object
```tsx
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

1. Copy `src/app/articles/_template/page.tsx.example`
2. Rename folder and file to `page.tsx`
3. Choose a theme and class prefix
4. Write the DATA object first
5. Build sections referencing DATA
6. Add sources (minimum 3, Tier 1-2 only)
7. Run validation checklist from EDITORIAL_GUIDELINES.md

## Newsletter Integration

The subscribe form calls `/api/subscribe` which uses Beehiiv.

**Required env vars:**
```
BEEHIIV_API_KEY=
BEEHIIV_PUBLICATION_ID=
```

## Common Patterns

### Animated Stats
```tsx
const [isVisible, setIsVisible] = useState(false);
// IntersectionObserver sets isVisible when in view
// Animate on isVisible, use transitionDelay for stagger
```

### Parallax Hero
```tsx
const opacity = Math.max(0, 1 - scrollY / 600);
const translateY = scrollY / 3;
```

### Sentiment Color Helper
```tsx
function getSentimentColor(score: number): string {
  if (score < 45) return "#ef4444";
  if (score > 55) return "#10b981";
  return "#6b7280";
}
```
