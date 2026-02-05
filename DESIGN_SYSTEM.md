# The District: Design System

**Companion to VOICE_GUIDELINES.md and EDITORIAL_STANDARDS.md. This governs HOW articles look.**

---

## I. DESIGN TOKENS (Non-Negotiable)

These values are defined in `src/styles/tokens.css` under `:root`. **Never hardcode alternatives.**

### Color Palettes

#### Hamlet Navy (Primary Dark)
| Token | Value | Use |
|-------|-------|-----|
| `--navy-950` | `#00152e` | Page backgrounds |
| `--navy-900` | `#001d3d` | Card backgrounds |
| `--navy-800` | `#0a3161` | Gradients |
| `--navy-100` | `#e0ecf4` | Light text on dark |

#### Hamlet Indigo (Accent)
| Token | Value | Use |
|-------|-------|-----|
| `--indigo-600` | `#4f46e5` | Primary buttons |
| `--indigo-500` | `#6366f1` | Links, accents |
| `--indigo-400` | `#818cf8` | Hover states |
| `--indigo-300` | `#a5b4fc` | Subtle accents |

#### Coral (Warm Accent)
| Token | Value | Use |
|-------|-------|-----|
| `--coral-600` | `#ea580c` | Darker warm accent |
| `--coral-500` | `#f97316` | Primary warm accent |
| `--coral-400` | `#fb923c` | Hover warm accent |
| `--coral-300` | `#fdba74` | Subtle warm |
| `--coral-200` | `#fed7aa` | Very subtle warm |
| `--coral-100` | `#ffedd5` | Light warm bg |
| `--coral-50` | `#fff7ed` | Lightest warm bg |

#### Sage / Green
| Token | Value | Use |
|-------|-------|-----|
| `--sage-600` | `#059669` | Primary green |
| `--sage-500` | `#10b981` | Positive / welcoming |
| `--sage-100` | `#d1fae5` | Light green bg |
| `--sage-50` | `#ecfdf5` | Lightest green bg |

#### Status Colors
| Token | Value | Use |
|-------|-------|-----|
| `--status-hot` | `#ef4444` | High friction / contentious |
| `--status-warm` | `#f59e0b` | Moderate friction |
| `--status-cool` | `#22c55e` | Low friction / consensus |

#### Semantic Colors (Never Change)
| Token | Value | Use |
|-------|-------|-----|
| `--sentiment-negative` | `#ef4444` | Skeptical / negative sentiment |
| `--sentiment-neutral` | `#6b7280` | Neutral sentiment |
| `--sentiment-positive` | `#10b981` | Welcoming / positive sentiment |

#### Grays
| Token | Value | Use |
|-------|-------|-----|
| `--gray-900` | `#1a1d23` | Darkest text |
| `--gray-500` | `#6e7785` | Muted text |
| `--gray-400` | `#9199a5` | Secondary text |
| `--gray-300` | `#c2c8d0` | Body text on dark bg |

---

### Font Families

| Token | Font | Fallback | Role |
|-------|------|----------|------|
| `--font-display` | Literata | Georgia, serif | Headlines, article titles, section titles (weight 500–600) |
| `--font-body` | Literata | Georgia, serif | Prose, subtitles, pull quotes, findings (weight 400) |
| `--font-sans` | Inter | system-ui, sans-serif | UI, labels, navigation, data viz, buttons |

Both `--font-display` and `--font-body` resolve to Literata (single-font approach). Display headings are differentiated by weight (500–600) and size, not by typeface. Fonts are loaded via `next/font/google` in `layout.tsx`. Never use hardcoded font-family values — always reference the CSS variables.

### Typography Scale

All type sizes use CSS `clamp()` for responsive scaling. **Use these tokens, not raw values.**

#### Display
| Token | Value | Use |
|-------|-------|-----|
| `--type-hero` | `clamp(3rem, 10vw, 6rem)` | Article main titles |
| `--type-section-title` | `clamp(1.5rem, 4vw, 2.25rem)` | Section headings |
| `--type-subsection` | `clamp(1.25rem, 3vw, 1.5rem)` | Subsection headings |

#### Body
| Token | Value | Use |
|-------|-------|-----|
| `--type-lead` | `clamp(1.125rem, 2vw, 1.375rem)` | Opening paragraphs |
| `--type-body` | `1.125rem` | Standard body text |
| `--type-small` | `0.875rem` | Captions, metadata |
| `--type-tiny` | `0.75rem` | Labels, fine print |
| `--type-section-num` | `0.8125rem` | Section numbers |

#### Line Heights
| Token | Value | Use |
|-------|-------|-----|
| `--leading-tight` | `1.1` | Headlines |
| `--leading-normal` | `1.6` | Body text, prose |
| `--leading-relaxed` | `1.8` | Pull quotes, special emphasis only |

#### Letter Spacing
| Token | Value | Use |
|-------|-------|-----|
| `--tracking-tight` | `-0.02em` | Large headlines |
| `--tracking-normal` | `0` | Body text |
| `--tracking-wide` | `0.1em` | Labels |
| `--tracking-wider` | `0.15em` | Section numbers, badges |

---

### Motion

**All animations must use these easing functions.**

| Token | Value | Use |
|-------|-------|-----|
| `--ease-elegant` | `cubic-bezier(0.21, 0.47, 0.32, 0.98)` | Most transitions |
| `--ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful interactions |

**Standard durations:**
- Micro interactions: `0.15s`
- UI transitions: `0.2s - 0.3s`
- Content animations: `0.6s - 0.8s`
- Scroll-triggered: `0.8s - 1s`

---

## II. THEME SYSTEM

Each article has a `data-theme` attribute that sets its color world. **This is how articles stay distinct but consistent.**

### Existing Themes

```css
[data-theme="data-center"]  /* Blue/tech - for infrastructure topics */
[data-theme="abundance"]    /* Warm cream/green - for YIMBY/housing topics */
[data-theme="vote-tracker"] /* Dark slate/amber - for voting/officials topics */
[data-theme="temperature"]  /* Dark brown/red-orange - for friction/debate topics */
```

### Theme Variables (set by data-theme)

Each theme must define:
```css
--page-bg          /* Main background */
--page-bg-alt      /* Section alternate background */
--page-text        /* Primary text */
--page-text-muted  /* Secondary text */
--accent-primary   /* Main accent color */
--accent-secondary /* Secondary accent */
--accent-glow      /* Subtle glow/highlight */
--card-bg          /* Card backgrounds */
--card-border      /* Card borders */
```

### Creating a New Theme

1. Add to `src/styles/tokens.css` under the theme section
2. Define all 9 variables
3. Test against existing article components

**Example:**
```css
[data-theme="your-theme"] {
  --page-bg: #0a1628;
  --page-bg-alt: #0f1d32;
  --page-text: #f8fafc;
  --page-text-muted: #94a3b8;
  --accent-primary: #3b82f6;
  --accent-secondary: #6366f1;
  --accent-glow: rgba(59, 130, 246, 0.15);
  --card-bg: rgba(15, 29, 50, 0.8);
  --card-border: rgba(59, 130, 246, 0.2);
}
```

---

## III. REQUIRED ARTICLE STRUCTURE

Every article must include these elements in this order:

```tsx
<main className="[article-prefix]-article article-page" data-theme="[theme]">
  <HeroSection />
  <AtAGlance />
  {/* Content sections */}
  <MethodologySection />
  <ArticleEndCTA />
  <SourcesCitations sources={SOURCES} />
  <SubscribeBar />
</main>
```

### Required Classes

| Element | Required Class | Purpose |
|---------|---------------|---------|
| Main wrapper | `article-page` | Base styles, theme inheritance |
| Hero | Theme-specific (e.g., `dc-hero`) | Full-height intro |
| Stats summary | `at-a-glance` | Key metrics display |
| Prose sections | `[prefix]-prose` or `article-prose` | Body text styling |

---

## IV. SHARED COMPONENTS

### Already Extracted (use these)

| Component | Import | Purpose |
|-----------|--------|---------|
| `AtAGlance` | `@/components/article/AtAGlance` | Key stats + finding summary |
| `ArticleEndCTA` | `@/components/article/ArticleEndCTA` | Subscribe prompt before sources |
| `MethodologySection` | `@/components/article/MethodologySection` | Structured methodology items |
| `PullQuote` | `@/components/article/PullQuote` | Blockquote with city attribution |
| `SocialShare` | `@/components/article/SocialShare` | Social sharing buttons (X, LinkedIn, Facebook) |
| `SourcesCitations` | `@/components/article/SourcesCitations` | Source list at article end |
| `SubscribeBar` | `@/components/article/SubscribeBar` | Fixed bottom subscribe bar |

### Shared CSS Classes (use before creating new ones)

#### At a Glance Section
```css
.at-a-glance              /* Section wrapper */
.at-a-glance-inner        /* Max-width container */
.at-a-glance-label        /* "At a Glance" header */
.at-a-glance-stats        /* Stats grid */
.at-a-glance-stat         /* Individual stat */
.at-a-glance-stat-value   /* Big number */
.at-a-glance-stat-label   /* Stat description */
.at-a-glance-finding       /* Key finding callout */
.at-a-glance-finding-label /* "Key Finding" label */
.at-a-glance-finding-text  /* Finding prose */
```

#### Article Cards
```css
.article-card             /* Base card */
.article-card:hover       /* Hover state (auto) */
```

> **Note:** Card backgrounds and borders use CSS variables `--card-bg` and `--card-border` (set per theme), not utility classes.

#### Hero & Section Base Classes
```css
.article-hero             /* Full-height hero wrapper */
.article-hero-content     /* Hero content container */
.article-hero-badge       /* "From The District" badge */
.article-hero-badge-dot   /* Animated pulse dot on badge */
.article-hero-title       /* Hero h1 styling */
.article-hero-subtitle    /* Hero subtitle text */
.article-section          /* Content section wrapper */
.article-section-inner    /* Max-width section container */
.article-section-number   /* Section number label */
.article-section-title    /* Section heading */
```

#### Prose
```css
.article-prose            /* Literata (serif), relaxed leading */
.article-prose p          /* Paragraph spacing */
.article-prose strong     /* Bold = page-text color */
```

---

## V. VISUALIZATION PATTERNS

### Sentiment Bars

**Always use these colors for sentiment:**
- Negative/Skeptical: `#ef4444` (or `--sentiment-negative`)
- Neutral: `#6b7280` (or `--sentiment-neutral`)
- Positive/Welcoming: `#10b981` (or `--sentiment-positive`)

**Standard thresholds:**
- Below 45 = Negative
- 45-55 = Neutral
- Above 55 = Positive

### Animated Counters

Use the `useIntersectionObserver` hook and `AnimatedStat` component instead of raw IntersectionObserver:

```tsx
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { AnimatedStat } from "@/components/viz/AnimatedStat";

// For simple number counters, use the component directly:
<AnimatedStat value={156} label="Cities Analyzed" format="comma" />
<AnimatedStat value={49.9} label="Avg Score" format="decimal" />

// For custom scroll-triggered animations, use the hook:
const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
// Attach ref to container, use isVisible to trigger animations
```

### Horizontal Bar Charts

Common pattern across articles:
```css
.bar-container { /* Outer track */ }
.bar-fill {
  transition: width 0.6s var(--ease-elegant);
  /* Use transitionDelay for stagger: ${index * 0.1}s */
}
```

### Hero Scroll Effects

Standard parallax formula:
```tsx
const opacity = Math.max(0, 1 - scrollY / 600);
const translateY = scrollY / 3;
```

---

## VI. CREATING NEW ARTICLE STYLES

### Naming Convention

Each article gets a prefix. Use it consistently:
- Data Center: `dc-`
- Abundance: `abundance-`
- Temperature: `temp-`
- Vote Tracker: `vote-`

### What to Reuse vs Create New

| Pattern | Reuse Existing | Create New |
|---------|---------------|------------|
| At a Glance section | `.at-a-glance-*` | Never |
| Prose styling | `.article-prose` | Only for theme-specific overrides |
| Cards | `.article-card` base | Add article-specific modifiers |
| Sentiment colors | `--sentiment-*` | Never |
| Hero structure | Existing pattern | Visual treatment only |
| Charts/visualizations | Animation patterns | Data-specific rendering |

### CSS Organization

New article styles go in their own file under `src/styles/articles/`:
```
src/styles/articles/your-article.css
```
Then add an `@import` in `src/app/globals.css`:
```css
@import "../styles/articles/your-article.css";
```

---

## VII. ACCESSIBILITY STANDARDS

**Target: WCAG 2.1 AA compliance.** The District covers government and civic data for a broad public audience. Accessibility is not optional — it is both a legal consideration and an editorial one. A data journalism publication about public meetings that some members of the public cannot read has failed its mission.

---

### Color & Contrast

#### WCAG AA Minimums

| Context | Required Ratio | Applies To |
|---------|---------------|------------|
| Normal text (under 18pt / 24px) | 4.5:1 | Body prose, captions, labels |
| Large text (18pt+ bold or 24px+ regular) | 3:1 | Headlines, section titles |
| UI components & graphical objects | 3:1 | Buttons, form inputs, chart elements |

#### Theme Audit (current values from `tokens.css`)

| Theme | Combination | Ratio | AA Normal | AA Large |
|-------|-------------|------:|:---------:|:--------:|
| `data-center` | `--page-text` on `--page-bg` | 17.33:1 | PASS | PASS |
| `data-center` | `--page-text-muted` on `--page-bg` | 7.07:1 | PASS | PASS |
| `abundance` | `--page-text` on `--page-bg` | 13.69:1 | PASS | PASS |
| `abundance` | `--page-text-muted` on `--page-bg` | 4.45:1 | **FAIL** | PASS |
| `vote-tracker` | `--page-text` on `--page-bg` | 13.98:1 | PASS | PASS |
| `vote-tracker` | `--page-text-muted` on `--page-bg` | 5.71:1 | PASS | PASS |
| `temperature` | `--page-text` on `--page-bg` | 14.52:1 | PASS | PASS |
| `temperature` | `--page-text-muted` on `--page-bg` | 6.01:1 | PASS | PASS |

**Known issue:** The `abundance` theme's muted text (#64748b on #faf7f2) hits 4.45:1 — just below the 4.5:1 AA threshold for normal text. Use `--page-text-muted` in the abundance theme only for large text (section labels, captions at `--type-section-title` or above). For normal-sized muted text, use `--page-text` or darken the muted value to at least #5f6d7e.

#### Sentiment & Accent Color Rules

Several sentiment colors fail AA for normal-sized text on certain backgrounds. Rules:

1. **Never use sentiment colors as the sole text color for normal-sized body text.** Safe for large labels, bar fills, and decorative elements — not readable prose.
2. **Never rely on color alone to convey meaning.** Every sentiment bar, status indicator, and data point must also have a text label ("Positive", "Neutral", "Negative"), a pattern, or an icon.
3. When sentiment colors appear as inline labels, pair them with the value:

```tsx
/* Good: color reinforces the text label */
<span style={{ color: getSentimentColor(score) }}>
  {score}% — {score < 45 ? "Skeptical" : score > 55 ? "Welcoming" : "Neutral"}
</span>

/* Bad: color is the only differentiator */
<span style={{ color: getSentimentColor(score) }}>{score}%</span>
```

### Data Visualization

#### Text Alternatives

All visualizations need a text alternative:

```tsx
<div
  role="img"
  aria-label="Bar chart showing Newark at 100% unanimous votes, Jersey City at 87%"
  className="dc-chart"
>
  {/* visual bars */}
</div>
```

#### Bar Charts

Always render the numeric value as visible text, not just bar width:

```tsx
<div className="bar-row">
  <span className="bar-label">Newark</span>
  <div className="bar-track">
    <div className="bar-fill" style={{ width: `${pct}%` }} />
  </div>
  <span className="bar-value">{pct}%</span> {/* Required — never omit */}
</div>
```

#### Leaderboard Tables

Use semantic HTML tables or ARIA table roles. Screen readers cannot parse a `<div>` grid as tabular data.

### Motion & Animation

#### `prefers-reduced-motion`

All animations must respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  .bar-fill { transition: none; }
  .article-hero-badge-dot { animation: none; }
  [data-animate] {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
```

**Rules:**
- Scroll-triggered fade-ins: skip to final state immediately
- Animated counters: show the final number, no counting animation
- Hero parallax: disable the transform, keep content static
- Bar chart transitions: remove `transition`, render at final width

### Keyboard Navigation

- All interactive elements must work via keyboard (Tab, Enter, Space)
- Use real `<button>` and `<a>` elements — never clickable `<div>` without `role`, `tabIndex`, and `onKeyDown`
- Focus styles must be visible:

```css
:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}
:focus:not(:focus-visible) {
  outline: none;
}
```

- Long articles need a skip link (`<a href="#main-content" className="skip-link">Skip to main content</a>`)

### Semantic HTML

- **Heading hierarchy**: `h1` → `h2` → `h3`, never skip levels. Style down visually with CSS if needed.
- **Landmarks**: Use `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- **Images**: Informational images need descriptive `alt` text. Decorative SVGs get `aria-hidden="true"`.

### Accessibility Checklist

- [ ] All text/background combinations pass WCAG AA (4.5:1 body, 3:1 large)
- [ ] Muted text not used at normal size in `abundance` theme
- [ ] Sentiment colors never sole indicator of meaning — text labels present
- [ ] Every chart has `aria-label` or visible caption
- [ ] Bar charts display numeric values as text
- [ ] `prefers-reduced-motion` handled for all animations
- [ ] All interactive elements keyboard-accessible
- [ ] `:focus-visible` outlines present on focusable elements
- [ ] Heading hierarchy sequential (no skipping)
- [ ] Decorative SVGs have `aria-hidden="true"`

---

## VIII. DO NOT

1. **Never hardcode colors** — Use CSS variables
2. **Never change semantic sentiment colors** — Red/gray/green are universal
3. **Never skip AtAGlance** — Every article needs key stats
4. **Never create new easing functions** — Use `--ease-elegant` or `--ease-bounce`
5. **Never put article CSS inline in components** — Keep in `src/styles/` files
6. **Never remove shared components** — `ArticleEndCTA`, `SourcesCitations`, `SubscribeBar` are required

---

## IX. CSS FILE STRUCTURE

CSS is split into organized files under `src/styles/`, imported via `globals.css`:

```
src/
├── app/globals.css              # @import hub only
├── styles/
│   ├── tokens.css               # :root variables, themes, typography, @theme bridge
│   ├── base.css                 # HTML/body, masthead, homepage hero
│   ├── shared-article.css       # Shared article components (.article-*, .at-a-glance-*, cards, footer, utilities)
│   ├── articles/
│   │   ├── data-center.css      # .dc-* styles
│   │   ├── abundance.css        # .abundance-* styles
│   │   ├── vote-tracker.css     # .vote-* styles
│   │   └── temperature.css      # .temp-* styles
│   ├── responsive.css           # Consolidated responsive fixes
│   └── theme-overrides.css      # Sources, subscribe bar, CTA, social share
```

**Finding things:**
- Token variables → `src/styles/tokens.css`
- Shared article classes → `src/styles/shared-article.css`
- Article-specific styles → `src/styles/articles/[name].css`

---

## X. QUICK REFERENCE

### Starting a New Article

1. Copy `_template/page.tsx.example` to new folder
2. Rename to `page.tsx`
3. Choose or create a `data-theme`
4. Pick a class prefix (e.g., `myarticle-`)
5. Create `src/styles/articles/[name].css` and add `@import` to `globals.css`
6. Reuse `.at-a-glance-*` and `.article-prose` classes
7. Import and use shared components (`AtAGlance`, `ArticleEndCTA`, `SocialShare`, `SourcesCitations`, `SubscribeBar`)

### Checklist Before Committing

- [ ] Uses `data-theme` attribute
- [ ] Has `article-page` class on main
- [ ] AtAGlance section present
- [ ] MethodologySection present
- [ ] ArticleEndCTA, SourcesCitations, SubscribeBar included
- [ ] All colors use CSS variables
- [ ] Animations use `--ease-elegant`
- [ ] New CSS added under clear header comment

---

*This document complements VOICE_GUIDELINES.md (writing style), EDITORIAL_STANDARDS.md (data integrity), and EDITORIAL_GUIDELINES.md (fact-checking and source validation). Together they define The District's complete article standard.*
