# Visual & Brand Fix — Handoff Packet

**Companion to:** `docs/visual-brand-audit.md`
**Purpose:** A self-contained packet a teammate can use to commission the visual-and-brand work identified in the audit. Includes two Claude prompts — one per PR — each self-contained so the executing Claude doesn't need to re-audit.

---

## For the teammate: what this is and how to use it

The audit found that The District's brand identity and visual design have outgrown their documentation. The docs describe four themes; the publication has twelve. The homepage has its own wordmark, hero, reveal-footer, and 3D card stack — none of it documented. A violet accent that defines the homepage isn't a token. The article CSS file contains two parallel systems, with `.article-page` defined twice.

The work is split into two sequential tracks so you can ship incrementally and keep each PR reviewable:

### Track A — Doc alignment (ship first)

Small, mechanical PR. Updates `DESIGN_SYSTEM.md` to match current code, plus one localized CSS refactor (moving the Lamorinda theme into `tokens.css`). No judgment calls about visual design. Good first PR because it brings the design system back to being trustworthy — Track B then builds on it.

**Scope:** 9 tasks. Mostly doc edits. One code change: relocating the Lamorinda theme variables.
**Estimated effort:** ~1–2 hours of Claude time + ~30 minutes of human review.
**Risk:** Low. Verified by `npm run test:run` and a spot-check of one or two article pages.

### Track B — Brand identity + visual quality (ship after Track A)

Bigger PR with design judgment required. Writes `BRAND_IDENTITY.md` (the site-wide identity companion to `DESIGN_SYSTEM.md`), promotes ad-hoc brand colors into tokens, consolidates the duplicate article systems, reconciles the three hero typography scales, and remediates any WCAG failures Track A surfaced.

**Scope:** 6 tasks. Roughly half doc work and half code work.
**Estimated effort:** ~3–5 hours of Claude time + ~1–2 hours of human review, including a visual pass across the homepage and a few article pages.
**Risk:** Moderate. Touches shared CSS and brand tokens. Needs visual regression check across every article + homepage + colophon.

### How to run the handoff

1. Read `docs/visual-brand-audit.md` to understand the goal and findings. The prompts below reference audit finding IDs (BI-1, DD-2, etc.).
2. For Track A: start a fresh Claude session with this repo open. Paste the **Track A prompt** (below, clearly marked). Review the resulting PR before merging.
3. After Track A merges to `main`: start a fresh session, paste the **Track B prompt**. Review.
4. If a task's acceptance criteria can't be met (e.g., a visual regression surfaces, or a design decision needs your input), the executing Claude should stop and surface the question — not guess.

**Important:** Both prompts instruct the executing Claude to follow `CLAUDE.md` rules, including the Kill List (banned phrases), no Claude signature in commits, no personal branch prefixes (use `docs/` or `feat/`).

---

# Track A — Doc alignment

## Track A prompt (paste into a fresh Claude session)

> You are updating `DESIGN_SYSTEM.md` and one small CSS file in The District repo to fix documentation drift identified in an audit. The goal is to make the design system doc accurately reflect the current codebase so future work can trust it. You are NOT making brand-identity or visual-quality changes — that's a separate PR (Track B). If you find yourself wanting to refactor CSS, redesign a system, or change how things look, STOP — that work belongs in Track B.
>
> **Before starting:**
> 1. Read `CLAUDE.md`, `DESIGN_SYSTEM.md`, and `docs/visual-brand-audit.md` in full.
> 2. Create a branch off `main`: `git checkout main && git pull && git checkout -b docs/design-system-drift`.
> 3. Confirm you can run `npm run test:run` and `npm run build` successfully on `main` before making changes, so you have a known-good baseline.
>
> Execute tasks A-1 through A-9 below in order. Group commits logically (Tasks A-1 + A-2 are one coupled commit; A-7 can be its own commit; doc-only edits can be grouped). No Claude signature or Co-Authored-By in commit messages — this is the project rule in CLAUDE.md.
>
> After all tasks, run `npm run test:run` and `npm run build`. Paste the tail of each command's output into the PR description. Open the PR against `main` on branch `docs/design-system-drift`.

---

### Task A-1 — Update theme registry in DESIGN_SYSTEM.md § II

**Audit ref:** DD-1, BI-1 (partial).
**File:** `DESIGN_SYSTEM.md` § II "Existing Themes" (currently lines 140–147).

Replace the four-theme code block with a table listing every theme defined in `src/styles/tokens.css` **plus** the `lamorinda` theme currently in `src/styles/articles/lamorinda.css`. Columns:

- Theme name (as used in `data-theme`)
- Article(s) using it — grep `src/app/articles/**/*.tsx` for `data-theme="..."`
- One-line visual description (e.g., "Warm cream + deep green for housing/YIMBY stories")
- Where the theme block is defined (flag Lamorinda as the current exception; Task A-2 moves it)

**Themes to include** (verify each exists in code before writing):
`data-center`, `abundance`, `vote-tracker`, `temperature`, `oakland`, `ann-arbor`, `pittsburgh`, `austin-boom`, `piedmont`, `civic-guide`, `civic-guide-dark`, `lamorinda`.

**Acceptance:**
- Table has 12 rows.
- No row references a theme that doesn't exist in code.
- Lamorinda's row notes its theme block lives in `articles/lamorinda.css` (fixed in Task A-2).

---

### Task A-2 — Move the Lamorinda theme block into `tokens.css`

**Audit ref:** DD-2.
**Files:** `src/styles/articles/lamorinda.css` and `src/styles/tokens.css`.

The `[data-theme="lamorinda"] { ... }` block currently lives at the top of `lamorinda.css` (lines 11–35). Every other theme lives in `tokens.css`. Move the **core** theme variables (`--page-bg`, `--page-bg-alt`, `--page-text`, `--page-text-muted`, `--accent-primary`, `--accent-secondary`, `--card-bg`, `--card-border`, and add `--accent-glow: rgba(78, 205, 196, 0.12)` to match the existing pattern) to `tokens.css`. Place the new block alphabetically after `[data-theme="piedmont"]`.

**Keep** the Lamorinda-specific extension variables (`--lafayette-color`, `--orinda-color`, `--moraga-color`, `--topic-housing`, `--topic-fire`, `--topic-schools`, `--topic-retail`, `--topic-safety`) in `lamorinda.css`, scoped to `[data-theme="lamorinda"]`.

Also add `--page-bg-alt: #162030;` to the `tokens.css` Lamorinda block — it's currently missing from the article file.

**Verification:**
- `npm run build` succeeds.
- Visually load `/articles/lamorinda-triangle` (`npm run dev`) and confirm no regression in the hero gradient, card borders, or text colors.
- `grep -n 'data-theme="lamorinda"' src/styles/tokens.css` returns a match.

**Acceptance:**
- `tokens.css` defines the 9 core variables for Lamorinda.
- `lamorinda.css` retains only the extension variables (city/topic colors).
- The article page still renders identically.

---

### Task A-3 — Update CSS file structure diagram in DESIGN_SYSTEM.md § IX

**Audit ref:** DD-3, BI-3 (flag only).
**File:** `DESIGN_SYSTEM.md` § IX "CSS File Structure" (currently lines 391–414).

Replace the article-CSS listing with the actual files (get the list with `ls src/styles/articles/*.css`). Expected: `abundance.css`, `ann-arbor.css`, `austin-boom.css`, `civic-guide.css`, `data-center.css`, `lamorinda.css`, `oakland.css`, `piedmont.css`, `pittsburgh.css`, `temperature.css`, `vote-tracker.css`.

Add a short subsection or note explaining that `shared-article.css` actually contains **more than just article components** — it also houses the homepage 3D card stack, colophon styles, and HamletMeetingEmbed. Give a one-line summary of each cluster so a contributor can find things.

Flag (do NOT fix) the duplicate-definition issue: `shared-article.css` defines `.article-page` twice (lines 7 and 819) and `.article-hero` is similarly redefined. Add a one-sentence note: "shared-article.css currently contains two overlapping article systems; consolidation is tracked as Track B task B-4."

**Acceptance:**
- File structure diagram lists all 11 article CSS files.
- `shared-article.css`'s actual contents are summarized.
- The duplicate-definition flag is present and references Track B.

---

### Task A-4 — Update class prefix convention in DESIGN_SYSTEM.md § VI

**Audit ref:** DD-6.
**File:** `DESIGN_SYSTEM.md` § VI "Naming Convention" (lines 330–335).

Expand the prefix list. Grep article pages to confirm each prefix:
```
grep -rhE 'className="[a-z]+(-[a-z]+)?-article article-page"' src/app/articles/
```

**Expected mapping** (verify before writing):

| Article | Prefix |
|---------|--------|
| Data Center Gold Rush | `dc-` |
| Abundance Index | `abundance-` |
| Temperature Check | `temp-` |
| Vote Tracker | `vote-` |
| Oakland's Future | `oakland-` |
| Ann Arbor Divided | `aa-` |
| Pittsburgh's Bill | `pgh-` |
| Austin Boom | `au-` |
| Piedmont's Deliberation | `pm-` |
| Lamorinda Triangle | `lam-` |
| How Local Government Works | `lg-` |

Add a convention rule stated plainly (no "First: ... Second: ..." parallel structure — see Kill List in CLAUDE.md):

> City deep-dives use a 2–3 letter initialism of the city name. Topic articles use a short full-word prefix. Whichever prefix is chosen, every selector in that article's CSS file starts with it, and no selector outside that file uses it.

**Acceptance:**
- All 11 articles appear in the table.
- The convention rule is stated in plain prose.

---

### Task A-5 — Update theme variable contract in DESIGN_SYSTEM.md § II

**Audit ref:** DD-4.
**File:** `DESIGN_SYSTEM.md` § II "Theme Variables" (lines 149–162).

Restructure into two subsections:

**A. Core contract (required for every theme):**
```
--page-bg, --page-bg-alt, --page-text, --page-text-muted,
--accent-primary, --accent-secondary, --accent-glow,
--card-bg, --card-border
```

Note: these 9 are referenced in `shared-article.css` and must be defined for article components to render correctly.

**B. Extension variables (optional, theme-specific):**

| Variable | Used by | Purpose |
|----------|---------|---------|
| `--accent-dissent` | ann-arbor, pittsburgh | Secondary accent for dissent/minority-vote visualizations |
| `--accent-decline` | austin-boom | Warning color for decline narratives |
| `--accent-warm`, `--accent-gold`, `--accent-green` | civic-guide | Additional editorial accents |
| `--card-shadow` | civic-guide | Light-theme shadow (dark themes use box-shadow via `--accent-glow`) |
| `--hero-bg`, `--hero-text`, `--hero-muted` | civic-guide | Dark hero on a light-theme page |
| City/topic accents (`--lafayette-color`, `--topic-housing`, etc.) | lamorinda | Article-specific visualization palette |

Add naming rule: "Extension variables must use a documented prefix (`--accent-*`, `--hero-*`, `--topic-*`, etc.) and should be namespaced to their theme via `[data-theme="..."]` scope."

**Acceptance:**
- Core contract section lists exactly 9 variables.
- Extension table covers every non-core variable currently in any theme.
- Naming rule is stated.

---

### Task A-6 — Narrow the "Never skip AtAGlance" rule

**Audit ref:** DD-8.
**File:** `DESIGN_SYSTEM.md` § VIII "DO NOT" rule 3.

Change the rule from:

> "Never skip AtAGlance — Every article needs key stats"

to:

> "Data-journalism articles must use AtAGlance to establish key stats and a finding. Reference and explanatory articles (e.g., the Civic Guide at `/articles/how-local-government-works`) may opt out when stats aren't the hook, but must still provide a structured entry point for readers."

Also verify rule #6 (about `ArticleEndCTA`, `SourcesCitations`, `SubscribeBar`) by grepping each article page for these imports. If any article legitimately omits one, apply the same qualifier. Don't change the rule based on a file that incorrectly omits them — that would be a regression, not a rule update.

**Acceptance:**
- Rule #3 is narrowed to match actual practice.
- Rule #6 is either confirmed accurate or similarly qualified.

---

### Task A-7 — Add contrast data for the 8 missing themes

**Audit ref:** DD-5.
**File:** `DESIGN_SYSTEM.md` § VII "Contrast Reference" (lines 361–376).

Compute WCAG contrast ratios for these combinations (use webaim.org/resources/contrastchecker/ or a Node contrast library — do NOT estimate by eye):

| Theme | Foreground | Background |
|-------|-----------|-----------|
| oakland | `#f5f0e8` (`--page-text`) | `#1a1714` (`--page-bg`) |
| oakland | `#a39e96` (`--page-text-muted`) | `#1a1714` |
| ann-arbor | `#f2ede4` | `#0c1a2e` |
| ann-arbor | `#8e99a8` | `#0c1a2e` |
| pittsburgh | `#f2ede4` | `#0a0a0a` |
| pittsburgh | `#8a8a8a` | `#0a0a0a` |
| austin-boom | `#f5efe6` | `#1c1712` |
| austin-boom | `#a89e92` | `#1c1712` |
| piedmont | `#f0ede6` | `#111a12` |
| piedmont | `#9a9e93` | `#111a12` |
| lamorinda | `#e8ecf0` | `#0f1923` |
| lamorinda | `#8b99a8` | `#0f1923` |
| civic-guide | `#1a1a2e` | `#faf8f5` |
| civic-guide | `#4a4a5c` | `#faf8f5` |
| civic-guide-dark | `#f0ede6` | `#0f1419` |
| civic-guide-dark | `#c8cdd4` | `#0f1419` |

Add each row to the table with status: `OK` (≥4.5:1), `Large text only` (≥3:1 but <4.5:1), or `FAIL` (<3:1).

If any row is `Large text only` or `FAIL`, add a remediation note like the existing one for abundance ("darken to #5f6d7e"). **Do NOT edit `tokens.css` in Track A** — any actual color changes belong in Track B task B-6. Track A records the data only.

**Acceptance:**
- Contrast table has 16 new rows.
- Every theme has at least two rows.
- Any sub-AA row has a remediation suggestion captured for Track B.

---

### Task A-8 — Add HamletMeetingEmbed to the shared components table

**Audit ref:** DD-9.
**File:** `DESIGN_SYSTEM.md` § IV "Already Extracted" (lines 216–226).

Add a row:

| Component | Import | Purpose |
|-----------|--------|---------|
| `HamletMeetingEmbed` | `@/components/article/HamletMeetingEmbed` | Inline source-material embed — YouTube iframe + timestamped moments + Hamlet link |

Add a usage rule below the table:

> When an article quotes or cites a public meeting at length, embed the meeting with `HamletMeetingEmbed` and link specific moments by timestamp. This provides primary-source verification for readers and reinforces the Hamlet ↔ District relationship.

**Acceptance:**
- Component table includes HamletMeetingEmbed.
- Usage rule is stated.

---

### Task A-9 — Reconcile `VALID_THEMES` between CLAUDE.md and the test file

**Audit ref:** H-1.
**Files:** `CLAUDE.md` (line 246) and `src/__tests__/articles.test.ts`.

CLAUDE.md instructs contributors to update `VALID_THEMES` in the test file, but that constant no longer exists. Choose one:

**Option A (recommended):** Restore the allowlist. Edit `src/__tests__/articles.test.ts` to add:

```ts
const VALID_THEMES = [
  'data-center', 'abundance', 'vote-tracker', 'temperature',
  'oakland', 'ann-arbor', 'pittsburgh', 'austin-boom',
  'piedmont', 'civic-guide', 'civic-guide-dark', 'lamorinda',
];
```

Add a test that extracts each article page's `data-theme` attribute value and asserts it's in `VALID_THEMES`. Verify the test passes for every existing article before committing.

**Option B:** Drop the CLAUDE.md reference. Edit line 246 to remove the `VALID_THEMES` clause.

Pick **Option A** unless `git log --all --source -- src/__tests__/articles.test.ts` shows evidence that `VALID_THEMES` was intentionally removed. In that case, pick Option B.

**Acceptance:**
- Either the test enforces an allowlist that matches `tokens.css` + `lamorinda.css`, or CLAUDE.md's reference is removed. No dead reference remains.

---

### Track A — Non-goals

Do NOT do these in Track A:

- Do NOT write `BRAND_IDENTITY.md` (that's Track B task B-1).
- Do NOT refactor or delete the duplicate `.article-page` / `.article-hero` in `shared-article.css` (Track B task B-4).
- Do NOT tokenize the violet accent or UI success green (Track B tasks B-2, B-3).
- Do NOT adjust any theme colors in `tokens.css` beyond adding Lamorinda (Track B task B-6 handles contrast remediation).
- Do NOT touch `VOICE_GUIDELINES.md` or `EDITORIAL_STANDARDS.md`.

---

# Track B — Brand identity + visual quality

## Track B prompt (paste after Track A has merged)

> You are improving The District's brand identity and visual design. Track A aligned the documentation with current code; Track B now expresses the brand identity properly in both docs and code. This PR is bigger and requires design judgment — if a task's acceptance criteria are ambiguous, stop and surface the question rather than guess.
>
> **Before starting:**
> 1. Read `CLAUDE.md`, `DESIGN_SYSTEM.md` (updated by Track A), and `docs/visual-brand-audit.md` in full.
> 2. Verify Track A has merged to `main`. Track B builds on it — if Track A didn't land, stop and ask.
> 3. Create a branch: `git checkout main && git pull && git checkout -b docs/brand-identity`.
> 4. Run `npm run test:run`, `npm run build`, and `npm run dev`. Visually spot-check the homepage, one article from each theme, and `/colophon` to establish a baseline.
>
> Execute tasks B-1 through B-6 below. Group into logical commits. No Claude signature in commit messages.
>
> After all tasks: run the full test suite, build, and do a visual pass of the homepage, every article page, and the colophon. Capture before/after screenshots of anything that changed visually (hero gradients, success states, article heros). Include them in the PR description along with test/build output.

---

### Task B-1 — Write `BRAND_IDENTITY.md`

**Audit ref:** BI-1.
**File:** Create `BRAND_IDENTITY.md` at the project root, alongside `DESIGN_SYSTEM.md`.

This is a new document that governs the site-wide identity layer. `DESIGN_SYSTEM.md` stays focused on per-article conventions; `BRAND_IDENTITY.md` covers everything an article doesn't.

**Required sections:**

1. **Brand summary.** One paragraph on what The District is (a Hamlet publication — data-journalism from local government) and how the visual identity expresses that. Reference the relationship to Hamlet (masthead "H" mark linking to myhamlet.com, "A Hamlet Publication" attribution).

2. **Masthead & wordmark.** Document `.masthead`, the `.wordmark-*` class cluster, the `.district-logo-*` class cluster, and the `.hamlet-mark-link`. Show when to use each. Note the mobile vs. desktop behavior (`.district-logo-tagline` hides on mobile per `base.css`).

3. **Homepage hero.** Document `.district-hero` and children. The signature violet-gradient title (`.district-title-accent`) is the most identifying brand element — describe it, give its exact gradient stops, note that the parallax formula is `scrollY / 4` for translate and `1 - scrollY / 600` for opacity (from `src/app/page.tsx`).

4. **3D article card stack.** Document `.article-stack`, `.article-card-3d`, `.card-inner`, `.card-spine`, and the twelve `.card-{scheme}` color schemes. These are per-card art direction, not reusable tokens — make this explicit. List the schemes with their gradient stops and which article they're paired with.

5. **Reveal footer.** Document `.reveal-footer` and its CSS sticky positioning trick (it sits behind `.main-content-layer` and is exposed as content scrolls past). Note that it replaces `.footer-minimal` on the homepage via `body:has(.reveal-footer) .footer-minimal { display: none }`.

6. **Colophon page.** Document `.colophon-*` classes, the design of `/colophon` as the "about" surface. Note that colophon uses `--navy-950` directly (it's not theme-driven like articles).

7. **UI states.** Document subscribe/success/error states used across homepage, article end CTA, and subscribe bar. This overlaps with Track B task B-3 (adding `--ui-success-*` tokens) — reference the tokens once they exist.

8. **Brand-vs-article boundary.** One short section answering "when does something belong in `BRAND_IDENTITY.md` vs `DESIGN_SYSTEM.md`?" The rule: identity is site-wide, theme-independent; design system is per-article, theme-scoped.

9. **Lineage note.** Either keep the "Stripe Press meets The Atlantic / The Economist" framing currently in `tokens.css` banner comments, or update it to reflect the current reality. Document what the visual lineage is so future designers don't drift.

**Voice:** Follow `VOICE_GUIDELINES.md`. Avoid Kill List phrases. Declarative, concise, no template sentences.

**Update** `DESIGN_SYSTEM.md`'s opening paragraph to reference `BRAND_IDENTITY.md` as its companion for site-wide identity.

**Acceptance:**
- `BRAND_IDENTITY.md` exists and covers all 9 sections.
- Every homepage/masthead/reveal-footer/card-stack/colophon class in `base.css` and `shared-article.css` is either documented or explicitly noted as internal implementation detail.
- `DESIGN_SYSTEM.md` links to `BRAND_IDENTITY.md` and explains the boundary.

---

### Task B-2 — Tokenize the violet brand accent

**Audit ref:** BI-2.
**Files:** `src/styles/tokens.css`, `src/styles/base.css`, `src/styles/shared-article.css`, and `BRAND_IDENTITY.md`.

The violet gradient (`#6366f1 → #8b5cf6 → #a78bfa`) on `.district-title-accent` is the single most identifying brand element in the homepage hero. It's also used in `.hero-title` in the shared-article legacy system. Neither `#8b5cf6` nor `#a78bfa` is a token.

**Changes:**

1. Add to `tokens.css` after the Indigo scale:
   ```css
   /* Violet — brand accent */
   --violet-500: #8b5cf6;
   --violet-400: #a78bfa;
   ```
   Also extend `@theme inline` with `--color-violet-500: var(--violet-500);` and `--color-violet-400: var(--violet-400);` if this block is used for Tailwind bridging.

2. Replace hardcoded hex in `.district-title-accent` (`base.css` line ~195):
   ```css
   background: linear-gradient(135deg, var(--indigo-500) 0%, var(--violet-500) 50%, var(--violet-400) 100%);
   ```

3. Replace hardcoded hex in `.hero-title` (`shared-article.css` legacy system) with the same token-based gradient, or remove if Task B-4 determines this selector is dead.

4. Document `--violet-500` and `--violet-400` in `BRAND_IDENTITY.md` § Brand summary (they're brand tokens, not general-purpose accents).

5. Add both to the Color Palettes table in `DESIGN_SYSTEM.md` § I under a new "Brand Violet" subsection.

**Verification:** Visual diff the homepage hero before/after. The gradient must render identically.

**Acceptance:**
- `#8b5cf6` and `#a78bfa` no longer appear anywhere in `src/styles/`.
- Both tokens are documented in `BRAND_IDENTITY.md` and `DESIGN_SYSTEM.md`.
- Visual regression: none.

---

### Task B-3 — Add `--ui-success-*` tokens, distinct from sentiment

**Audit ref:** BI-2.
**Files:** `src/styles/tokens.css`, several CSS files, `DESIGN_SYSTEM.md`.

The app uses two different greens:
- `#10b981` (`--sentiment-positive`) in editorial context (sentiment bars, positive findings).
- `#22c55e` in UI context (subscribe success, sources badge, article-end success).

They should not be unified — sentiment is editorial; UI success is interaction feedback. Add the missing UI tokens:

```css
--ui-success: #22c55e;
--ui-success-bg: rgba(34, 197, 94, 0.15);
--ui-success-border: rgba(34, 197, 94, 0.3);
--ui-success-icon-bg: rgba(34, 197, 94, 0.2);
```

Replace hardcoded `#22c55e` / `rgba(34, 197, 94, ...)` usage in:
- `.sources-badge` (`theme-overrides.css`)
- `.district-newsletter-success`, `.district-success-icon` (`base.css`)
- `.subscribe-bar__success` (`theme-overrides.css`)
- `.article-end-cta__success`, `.article-end-cta__success-icon` (`theme-overrides.css`)
- `.reveal-footer-newsletter-success` (`base.css` — already uses `var(--sage-500)`, leave or unify; note the inconsistency)

Document in `DESIGN_SYSTEM.md` § I under a new "UI State Colors" subsection, explicitly distinguishing them from `--sentiment-*` colors.

**Acceptance:**
- `#22c55e` and `rgba(34, 197, 94, ...)` no longer appear hardcoded in any `src/styles/` file.
- UI success tokens are documented.
- Success state visual rendering is unchanged.

---

### Task B-4 — Consolidate the duplicate `.article-page` / `.article-hero` in `shared-article.css`

**Audit ref:** BI-3.
**File:** `src/styles/shared-article.css`.

`shared-article.css` contains two parallel article systems. The Stripe-Press-style system (documented, theme-aware) is the current pattern. The "Premium Static Design" system (line 814 comment, uses hardcoded gray/indigo tokens instead of theme variables) appears to be legacy.

**Investigation first:**
1. For each class unique to the legacy system (`.hero-content`, `.hero-eyebrow`, `.hero-title`, `.hero-subtitle`, `.hero-meta`, `.hero-illustration`, `.article-body`, `.article-lead`, `.article-text`, `.section-title`, `.stat-grid`, `.stat-card`, `.stat-value`, `.stat-label`, `.stat-sublabel`, `.sentiment-card`, `.state-table`, `.city-grid`, `.city-card`, `.sentiment-list`, `.sentiment-list-item`, `.sentiment-rank`, `.sentiment-city-*`, `.sentiment-score-*`, `.sentiment-bar`, `.sentiment-badge`, `.methodology`, `.methodology-*`), grep `src/` to check if it's actually used.
2. Produce a usage map: class → files using it (or "dead").

**Then decide:**

- **If all legacy classes are dead:** Delete the legacy block (lines ~815–1260 of `shared-article.css`). Keep only the Stripe-Press system. This is the likely outcome.
- **If some legacy classes are in active use:** Migrate them to theme-aware variables (replace `var(--gray-300)` with `var(--page-text-muted)`, etc.), then delete the duplicate `.article-page` / `.article-hero` definitions by merging properties into the primary definitions at the top of the file.
- **If the situation is genuinely ambiguous (e.g., classes used in an external static HTML page like `/sf/through-the-fog.html`):** Stop and surface to the human teammate. Do not guess.

**After consolidation:**
- `.article-page` is defined exactly once in `shared-article.css`.
- `.article-hero` is defined exactly once.
- No article page's visual rendering changes.

**Verification:** Visual pass of every article page. Compare before/after screenshots.

**Acceptance:**
- File has one `.article-page` definition.
- File has one `.article-hero` definition.
- Usage map and decision documented in the commit message.
- Zero visual regressions.

---

### Task B-5 — Reconcile hero typography scales

**Audit ref:** BI-4.
**Files:** `src/styles/base.css`, `src/styles/shared-article.css`, `src/styles/tokens.css`.

Three hero title scales exist:

| Selector | Scale |
|----------|-------|
| `--type-hero` (canonical) | `clamp(3rem, 10vw, 6rem)` |
| `.article-hero-title` | Uses `var(--type-hero)` ✓ |
| `.hero-title` (legacy) | `clamp(2.5rem, 8vw, 5rem)` |
| `.district-hero-title` (homepage) | `clamp(3rem, 10vw, 5rem)` |

**Decide on one canonical hero scale.** The `6rem` max of `--type-hero` may be too large for the homepage (the homepage title has two lines); a `5rem` max may be correct. Pick one value for the token.

**If `.hero-title` (legacy) is deleted by Task B-4**, only `.district-hero-title` needs reconciling.

**Changes:**
- Update `--type-hero` in `tokens.css` to the chosen canonical value.
- Update `.district-hero-title` in `base.css` to use `var(--type-hero)` instead of inline `clamp(...)`.
- Apply the token everywhere a hero title appears.

**Verification:** Visual pass of homepage and every article hero. The homepage hero's `<h1>` wraps ("Data-driven stories / from *local government*") — confirm the line break behavior is preserved.

**Acceptance:**
- `--type-hero` is the single source of truth for hero title sizing.
- Every hero title selector uses the token.
- No hardcoded `clamp(...)` for hero sizing remains.

---

### Task B-6 — Remediate any contrast failures Track A surfaced

**Audit ref:** DD-5, BI-2.
**Files:** `src/styles/tokens.css`, `DESIGN_SYSTEM.md`.

Track A task A-7 computed contrast for all 12 themes and flagged any sub-AA combinations. If Track A found any `FAIL` or `Large text only` rows (especially for `--page-text-muted` on `--page-bg`), adjust the offending theme colors in `tokens.css` to meet WCAG AA (4.5:1 for body text).

**Approach per failing theme:**
1. Darken or lighten the muted color just enough to clear 4.5:1 — don't over-correct, the visual intent of "muted" matters.
2. Update the contrast table in `DESIGN_SYSTEM.md` § VII with the new ratio.
3. Visual check: muted text shouldn't feel harshly bright after the change.

**If Track A found no failures, this task is a no-op** — verify and note that in the PR description.

**Acceptance:**
- Every theme has `--page-text` at ≥4.5:1 on `--page-bg`.
- Every theme has `--page-text-muted` at ≥4.5:1 on `--page-bg`, or is explicitly marked "large text only" with a note.
- Updated `tokens.css` values are reflected in the `DESIGN_SYSTEM.md` § VII table.

---

### Track B — Non-goals

- Do NOT tokenize the per-card gradient schemes (`.card-navy`, `.card-coral`, etc.). These are intentional per-card art direction, documented as such in `BRAND_IDENTITY.md` task B-1 § 4.
- Do NOT redesign any existing surface. The goal is to express the existing identity through tokens and named patterns, not to improve the design itself.
- Do NOT touch `VOICE_GUIDELINES.md` or `EDITORIAL_STANDARDS.md`.
- Do NOT add to the `tokens.css` gray / navy / indigo / coral / sage scales unless a specific shade is needed for a task above.

---

## Open follow-ups (neither track)

Tracked here so nothing is lost:

- **H-2** (dead `scrollama.d.ts`). Defer until someone confirms Scrollama is truly unused; not worth a cycle now.
- **Per-article CSS audit.** Several article CSS files likely have their own hardcoded hex values and small inconsistencies with `tokens.css`. A third track could sweep them, but only if visual drift becomes a real problem. Not urgent.
- **Design system tests.** The current test suite checks for `data-theme="..."` presence but not visual consistency. Consider a future track for visual regression tests (Playwright screenshots or Chromatic) once the tokens/identity work stabilizes.
