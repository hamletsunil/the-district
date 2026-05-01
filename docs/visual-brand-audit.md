# Visual & Brand Audit — The District

**Audit date:** 2026-04-21
**Scope:** Brand identity and visual design of the app. Covers `DESIGN_SYSTEM.md` and the code it claims to govern (`src/styles/*`, homepage, masthead, article pages, OG image patterns).
**Method:** Static review of docs vs. code. No visual regression testing — findings are about brand coherence, documentation accuracy, and visual-quality drift.

---

## Goal

The District's brand identity and visual design should be first-class: coherent across every surface (homepage, articles, colophon), documented clearly enough that new surfaces — future articles, category pages, topic hubs — inherit the existing identity rather than invent their own. Today the code is mostly coherent, but the documentation has fallen behind, and a few visual systems (the homepage, the violet accent, the 3D card stack, the reveal-footer pattern) are entirely undocumented. A contributor following `DESIGN_SYSTEM.md` today would produce an article that looks nothing like what has shipped.

The goal of the work this audit scaffolds is to close that gap — both in the docs (so the design system is trustworthy again) and in the code (so the brand identity is expressed through tokens and named patterns, not hardcoded hex).

---

## Executive summary

The findings fall into three categories:

1. **Brand identity gaps** — visual systems that exist in the app but aren't part of the documented design language. These are the findings that matter most for the stated goal.
2. **Documentation drift** — the design system doc was written for four articles and four themes; the publication has grown to 12 themes and 11 articles without corresponding updates.
3. **Housekeeping** — dead references and minor polish.

Category tallies:

| Category | Count |
|----------|------:|
| Brand identity gaps | 4 |
| Documentation drift | 9 |
| Housekeeping | 3 |

---

## 1. Brand identity gaps

These are the findings a reader should care about first if the goal is improving the app's brand identity and visual design.

### BI-1. Homepage identity is entirely undocumented *(blocker)*

`DESIGN_SYSTEM.md` governs article appearance, but the publication's most-seen brand surface is the homepage — and none of its identity elements appear in the doc.

**Undocumented homepage systems:**

| System | Classes | Defined in |
|--------|---------|-----------|
| Masthead wordmark | `.masthead`, `.wordmark`, `.wordmark-the`, `.wordmark-district`, `.wordmark-tagline`, `.district-logo`, `.district-logo-mark`, `.district-logo-title`, `.district-logo-tagline`, `.district-logo-attribution`, `.hamlet-mark-link` | `base.css` |
| District hero (scroll-parallaxed hero with violet gradient title) | `.district-hero`, `.district-hero-bg`, `.district-hero-gradient`, `.district-hero-grid`, `.district-hero-content`, `.district-hero-badge`, `.district-badge-dot`, `.district-hero-title`, `.district-title-accent`, `.district-hero-subtitle`, `.district-hero-scroll-cue`, `.district-scroll-line` | `base.css` |
| Newsletter inline form | `.district-newsletter`, `.district-newsletter-input-wrapper`, `.district-newsletter-input`, `.district-newsletter-button`, `.district-newsletter-success`, `.district-newsletter-error`, `.district-newsletter-note`, `.district-success-icon` | `base.css` |
| Reveal footer (sticky "about" section exposed by scrolling) | `.reveal-footer` + ~20 child classes, `.main-content-layer` | `base.css` |
| 3D article card stack (the homepage feed) | `.article-stack`, `.article-card-3d`, `.card-inner`, `.card-spine`, `.card-layout`, `.card-illustration`, `.illustration-container`, `.card-content`, `.card-topic`, `.card-title`, `.card-description`, `.card-meta`, `.animate-on-scroll` | `shared-article.css` |
| Card color schemes | `.card-navy`, `.card-coral`, `.card-indigo`, `.card-sage`, `.card-oakland`, `.card-crimson`, `.card-ann-arbor`, `.card-pittsburgh`, `.card-austin`, `.card-piedmont`, `.card-lamorinda`, `.card-civics` (12 gradient schemes) | `shared-article.css` |
| Colophon / about page | `.colophon-page`, `.colophon-content`, `.colophon-header`, `.colophon-label`, `.colophon-title`, `.colophon-section`, `.colophon-section-title`, `.colophon-prose`, `.about-authors`, `.about-author`, `.about-author-avatar`, `.about-author-name`, `.about-author-role`, `.colophon-footer-section` | `shared-article.css` |
| Side nav dots (section indicators) | `.side-nav`, `.side-nav-dot` | `shared-article.css` |

**Why this matters:** If you wanted to build a topic hub, a category index, or a newsletter archive page today, the design system would give you no guidance on which of these patterns to reuse or how to stay on-brand. Each new surface will be invented by whoever builds it. That's the brand-identity risk.

**What's needed:** A companion doc — `BRAND_IDENTITY.md` — that documents the site-wide identity layer, leaving `DESIGN_SYSTEM.md` to govern per-article conventions.

---

### BI-2. Ad-hoc brand colors are hardcoded, not tokenized *(should-fix)*

`DESIGN_SYSTEM.md` says "Never hardcode colors — Use CSS variables." The homepage and half the shared components violate this. Visible brand colors with no token:

| Hex | Where | What it is |
|-----|-------|-----------|
| `#8b5cf6` | `.district-title-accent` gradient (homepage hero), shared-article `.hero-title` | Violet mid-stop — the signature "data-driven stories from *local government*" accent |
| `#a78bfa` | Same as above | Violet light-stop |
| `#0a0f1a` | `.reveal-footer` background, `.subscribe-bar__content`, several abundance-theme overrides | Dark navy, *different from* `--navy-950 = #00152e` |
| `#22c55e` | `.sources-badge`, `.district-newsletter-success`, `.subscribe-bar__success`, `.article-end-cta__success` | UI success green, *different from* `--sentiment-positive = #10b981` |
| `#6366f1`, `#4f46e5` | Homepage button gradients, CTA borders | These match `--indigo-500` and `--indigo-600` but are hardcoded |
| 24 hex values | `.card-navy`, `.card-coral`, `.card-indigo`, etc. (12 homepage card color schemes) | Per-card gradient stops — zero tokens |

**Two brand-defining colors are missing from tokens entirely** — the violet accent (`#8b5cf6`/`#a78bfa`) and the UI success green (`#22c55e`). These aren't accidental; they're part of how the app looks. They should either be promoted to tokens or consciously dropped.

---

### BI-3. Two parallel article systems in `shared-article.css` *(blocker)*

`shared-article.css` contains two different article systems:

1. The **Stripe-Press-style** system `DESIGN_SYSTEM.md` describes: `.article-hero`, `.article-hero-content`, `.article-hero-badge`, `.article-section`, etc. — theme-driven via CSS variables.
2. A second **"Premium Static Design"** system (comment block line 814): `.hero-content`, `.hero-eyebrow`, `.article-lead`, `.article-text`, `.stat-card`, `.sentiment-card`, `.city-grid`, `.sentiment-list`, `.methodology`, `.state-table` — uses hardcoded `var(--indigo-*)` colors and `var(--gray-*)` directly, not theme variables.

`.article-page` is defined **twice** in the same file (lines 7 and 819). `.article-hero` is also redefined.

This is either dead legacy code or an undocumented second pattern. Either way, a contributor touching these selectors will hit undefined behavior from the cascade.

---

### BI-4. Hero typography has three different scales *(should-fix)*

The publication has one visual identity but three different "hero title" sizes:

| Selector | Scale | Where |
|----------|-------|-------|
| `--type-hero` token | `clamp(3rem, 10vw, 6rem)` | `tokens.css`, intended canonical scale |
| `.article-hero-title` | `var(--type-hero)` (uses token) | `shared-article.css` — correct |
| `.hero-title` | `clamp(2.5rem, 8vw, 5rem)` | `shared-article.css` legacy system — smaller |
| `.district-hero-title` (homepage) | `clamp(3rem, 10vw, 5rem)` | `base.css` — slightly shorter max |

Homepage and articles shouldn't feel like different publications. Pick one scale and apply it.

---

## 2. Documentation drift

These findings are about the doc being stale. Mechanical to fix.

### DD-1. Theme registry is 8 themes out of date *(blocker)*

**Location:** `DESIGN_SYSTEM.md` § II "Existing Themes" (lines 140–147).

Doc lists four themes: `data-center`, `abundance`, `vote-tracker`, `temperature`.
Code has twelve: + `oakland`, `ann-arbor`, `pittsburgh`, `austin-boom`, `piedmont`, `civic-guide`, `civic-guide-dark`, `lamorinda`.

Anyone reading the doc believes the palette is done. They won't know whether to reuse an existing theme or create a new one.

---

### DD-2. Lamorinda theme is defined in the wrong file *(blocker)*

The documented pattern says themes live in `src/styles/tokens.css`. Every theme follows this rule except `lamorinda`, whose `[data-theme="lamorinda"] { ... }` block is at the top of `src/styles/articles/lamorinda.css` (lines 11–35).

Either the rule is wrong (themes can live anywhere) or the code is wrong (Lamorinda should be hoisted). This needs a ruling and enforcement.

---

### DD-3. CSS file structure diagram is wrong *(blocker)*

`DESIGN_SYSTEM.md` § IX lists four article CSS files. Eleven exist:
`abundance.css`, `ann-arbor.css`, `austin-boom.css`, `civic-guide.css`, `data-center.css`, `lamorinda.css`, `oakland.css`, `piedmont.css`, `pittsburgh.css`, `temperature.css`, `vote-tracker.css`.

Diagram also omits the site-wide identity systems in `shared-article.css` (colophon, card stack, Hamlet embed) — see **BI-1**.

---

### DD-4. Theme variable contract has drifted *(should-fix)*

The doc specifies 9 required variables per theme. Actual themes use more:

| Theme | Extensions |
|-------|-----------|
| `ann-arbor`, `pittsburgh` | `--accent-dissent` |
| `austin-boom` | `--accent-decline` |
| `civic-guide` | `--accent-warm`, `--accent-gold`, `--accent-green`, `--card-shadow`, `--hero-bg`, `--hero-text`, `--hero-muted` |
| `lamorinda` | `--lafayette-color`, `--orinda-color`, `--moraga-color`, `--topic-housing`, `--topic-fire`, `--topic-schools`, `--topic-retail`, `--topic-safety`; also omits `--page-bg-alt` and `--accent-glow` |

The doc needs a core contract + a documented extension pattern.

---

### DD-5. Contrast reference only covers 4 of 12 themes *(should-fix)*

`DESIGN_SYSTEM.md` § VII computes WCAG contrast for `data-center`, `abundance`, `vote-tracker`, `temperature`. Nothing for the other 8. Some are likely borderline — e.g., `lamorinda` muted text `#8b99a8` on `#0f1923`, or `civic-guide-dark` muted `#c8cdd4` on `#0f1419`. Accessibility claim is unverifiable for 67% of themes.

---

### DD-6. Class prefix table lists 4 articles; there are 11 *(should-fix)*

Doc lists: `dc-`, `abundance-`, `temp-`, `vote-`.
Code uses (additionally): `oakland-`, `aa-`, `pgh-`, `au-`, `pm-`, `lam-`, `lg-`.

Prefixes are inconsistent in character (initialisms for some cities, full words for others). Worth a documented convention.

---

### DD-7. Color tokens list is incomplete *(should-fix)*

Doc shows a curated subset of each color family. Actual `tokens.css` has more shades for Navy (11 vs 4 documented), Indigo (7 vs 4), Gray (5 vs 4). Either prune unused shades or document them all.

---

### DD-8. "Never skip AtAGlance" rule is already violated *(should-fix)*

`DESIGN_SYSTEM.md` § VIII #3 says "Every article needs key stats." The civic guide (`how-local-government-works`) omits AtAGlance by design (see commit `adff6ba`). The rule needs a qualifier: data-journalism articles must use AtAGlance; reference/explanatory articles may opt out.

---

### DD-9. HamletMeetingEmbed is in CLAUDE.md but not DESIGN_SYSTEM.md *(polish)*

`HamletMeetingEmbed` is documented in CLAUDE.md with a substantial CSS footprint (`.hamlet-embed__*`, ~150 lines). `DESIGN_SYSTEM.md` § IV doesn't list it among shared components.

---

## 3. Housekeeping

### H-1. CLAUDE.md references a `VALID_THEMES` constant that doesn't exist *(polish)*

`CLAUDE.md` line 246 says to update `VALID_THEMES` in `src/__tests__/articles.test.ts` when adding a theme. That constant no longer exists. The test is now a bare `toMatch(/data-theme=["']/)` — it checks for the attribute's presence, not that its value is allowed. Either restore the allowlist or remove the CLAUDE.md reference.

### H-2. Dead type file *(polish)*

`src/types/scrollama.d.ts` exists per CLAUDE.md's project structure diagram. If Scrollama has been removed from use, the type file should go.

### H-3. Doc tone: "Stripe Press-inspired" *(polish)*

Banner comments in `tokens.css` and `shared-article.css` reference "Stripe Press" as design lineage. The homepage (violet gradient, reveal footer, 3D stack with spine) has evolved past that. Worth asking whether the shorthand is still accurate or whether a new lineage statement belongs in `BRAND_IDENTITY.md`.

---

## Companion: the fix prompt

`docs/visual-brand-fix-prompt.md` is the executable companion to this audit. It splits the work into two sequential tracks:

- **Track A — Doc alignment.** Updates `DESIGN_SYSTEM.md` and related docs to match current code. Low-risk, mostly mechanical. Ship first.
- **Track B — Brand identity + visual quality.** Writes `BRAND_IDENTITY.md`, tokenizes hardcoded brand colors, consolidates the duplicate article systems in `shared-article.css`, reconciles hero typography, and completes any contrast remediation Track A surfaced. Requires design judgment; ship second, after Track A lands.

Either track can be handed to a Claude session via the prompts in that file.
