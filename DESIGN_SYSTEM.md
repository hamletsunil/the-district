# The District: Design System

**Companion to VOICE_GUIDELINES.md and EDITORIAL_STANDARDS.md. This governs HOW articles look.**

---

## I. DESIGN TOKENS (Non-Negotiable)

These values are defined in `globals.css` under `:root`. **Never hardcode alternatives.**

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

### Typography Scale

All type sizes use CSS `clamp()` for responsive scaling. **Use these tokens, not raw values.**

#### Display
| Token | Value | Use |
|-------|-------|-----|
| `--type-hero` | `clamp(2.5rem, 8vw, 5rem)` | Article main titles |
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
| `--leading-normal` | `1.6` | Body text |
| `--leading-relaxed` | `1.8` | Long-form prose |

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

1. Add to `globals.css` under the theme section (~line 105)
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
| `ArticleEndCTA` | `@/components/article/ArticleEndCTA` | Subscribe prompt before sources |
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
.article-prose            /* Georgia font, relaxed leading */
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

Use IntersectionObserver pattern:
```tsx
const [isVisible, setIsVisible] = useState(false);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    },
    { threshold: 0.2 }
  );
  if (ref.current) observer.observe(ref.current);
  return () => observer.disconnect();
}, []);
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

## VII. DO NOT

1. **Never hardcode colors** — Use CSS variables
2. **Never change semantic sentiment colors** — Red/gray/green are universal
3. **Never skip AtAGlance** — Every article needs key stats
4. **Never create new easing functions** — Use `--ease-elegant` or `--ease-bounce`
5. **Never put article CSS inline in components** — Keep in `src/styles/` files
6. **Never remove shared components** — `ArticleEndCTA`, `SourcesCitations`, `SubscribeBar` are required

---

## VIII. CSS FILE STRUCTURE

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

## IX. QUICK REFERENCE

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
