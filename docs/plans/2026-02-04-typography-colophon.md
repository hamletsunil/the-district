# Typography Upgrade & Colophon Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace generic Inter/Georgia font stack with Fraunces (display) + Literata (body) + Inter (UI), consolidate ~30 hardcoded font-family declarations into CSS variables, and add a colophon page + footer link.

**Architecture:** Add two new fonts via `next/font/google` in `layout.tsx`, register three font-family CSS variables in `tokens.css`, then find-and-replace all hardcoded `font-family` declarations across the split CSS files. Build `/colophon` page as a server component. Update footer with colophon link.

**Tech Stack:** Next.js 16 (`next/font/google`), CSS custom properties, Tailwind CSS 4, React 19 server components.

---

## Task 1: Add Fraunces + Literata to `layout.tsx`

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Add font imports and configuration**

```tsx
import { Inter, Fraunces, Literata } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const literata = Literata({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});
```

Fraunces is a variable font — no `weight` array needed, it includes the full range plus optical sizing automatically.

Literata is also a variable font — same treatment.

**Step 2: Add CSS variable classes to `<body>`**

```tsx
<body className={`${inter.variable} ${fraunces.variable} ${literata.variable}`}>
```

**Step 3: Run the dev server to verify fonts load**

Run: `cd /Users/paigesaez/hamlet-v2/the-district && npm run dev`

Expected: No build errors. Fonts will not visually change yet (no CSS references them).

**Step 4: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: load Fraunces and Literata fonts via next/font"
```

---

## Task 2: Register font variables in `tokens.css`

**Files:**
- Modify: `src/styles/tokens.css` (lines 58-83 typography section, and the `@theme inline` block is in `src/app/globals.css` line 151-161)
- Modify: `src/app/globals.css` (the `@theme inline` block)

**Step 1: Add font-family variables to `:root` in tokens.css**

After the `--tracking-wider` line (line 83), add:

```css
  /* Font Families */
  --font-display: "Fraunces", Georgia, serif;
  --font-body: "Literata", Georgia, serif;
  --font-sans: "Inter", system-ui, -apple-system, sans-serif;
```

Note: `--font-sans` is currently defined only in the `@theme inline` block in globals.css. Move the canonical definition here so all three live together. Georgia remains as fallback so the page looks reasonable during font loading.

**Step 2: Update `@theme inline` in globals.css to reference all three**

Replace the existing `--font-sans` line in the `@theme inline` block:

```css
@theme inline {
  /* ... existing color tokens ... */
  --font-sans: "Inter", system-ui, -apple-system, sans-serif;
  --font-display: "Fraunces", Georgia, serif;
  --font-body: "Literata", Georgia, serif;
}
```

**Step 3: Verify build still works**

Run: `cd /Users/paigesaez/hamlet-v2/the-district && npm run build`

Expected: Build succeeds.

**Step 4: Commit**

```bash
git add src/styles/tokens.css src/app/globals.css
git commit -m "feat: add --font-display and --font-body CSS variables"
```

---

## Task 3: Update `base.css` font-family declarations

**Files:**
- Modify: `src/styles/base.css`

**Step 1: Replace hardcoded font-family values**

Two changes:

1. Line 13 — `body` already uses `var(--font-sans)`. No change needed.
2. Line 156 — `.district-hero-title` uses hardcoded `"Inter", system-ui, sans-serif`. Change to `var(--font-display)` — this is the homepage hero title, it should use the display font.

```css
.district-hero-title {
  font-family: var(--font-display);
  /* rest unchanged */
}
```

**Step 2: Verify homepage hero visually**

Run dev server, check homepage. The hero title "Data-driven stories from local government" should now render in Fraunces.

**Step 3: Commit**

```bash
git add src/styles/base.css
git commit -m "feat: use Fraunces for homepage hero title"
```

---

## Task 4: Update `shared-article.css` font-family declarations

**Files:**
- Modify: `src/styles/shared-article.css`

**Step 1: Replace all 3 Georgia declarations + add display font to titles**

Three Georgia replacements:
- Line 68: `.article-hero-subtitle` → `var(--font-body)`
- Line 111: `.article-prose` → `var(--font-body)`
- Line 220: `.at-a-glance-finding-text` → `var(--font-body)`

Two title additions (these currently have NO font-family, inheriting Inter from body):
- Line 57: `.article-hero-title` — add `font-family: var(--font-display);`
- Line 101: `.article-section-title` — add `font-family: var(--font-display);`

Two more shared title classes to update:
- Line 416: `.card-title` — add `font-family: var(--font-display);`
- Line 597: `.hero-title` — add `font-family: var(--font-display);`
- Line 654: `.section-title` — add `font-family: var(--font-display);`

**Step 2: Verify an article page visually**

Check `/articles/data-center-gold-rush`. Hero subtitle, prose sections, and at-a-glance should now render in Literata. Titles should be in Fraunces.

**Step 3: Commit**

```bash
git add src/styles/shared-article.css
git commit -m "feat: use Fraunces for titles, Literata for prose in shared styles"
```

---

## Task 5: Update `articles/data-center.css` font-family declarations

**Files:**
- Modify: `src/styles/articles/data-center.css`

**Step 1: Replace all 12 hardcoded font-family declarations**

Georgia/serif replacements (→ `var(--font-body)`):
- Line 1658: `.dc-prose`
- Line 1811: `.dc-pull-quote blockquote`
- Line 1879: `.dc-hero-subtitle-editorial`

Inter/sans replacements (→ `var(--font-sans)`):
- Line 1711: `.dc-prose-header h2` — change to `var(--font-display)` (this is a heading)
- Line 1727: `.dc-prose-header .dc-section-number` → `var(--font-sans)`
- Line 1841: `.dc-pull-quote cite` → `var(--font-sans)`
- Line 1913: `.dc-methodology-editorial .dc-prose` → `var(--font-sans)`
- Line 1980: `.dc-timeline-bar::after` → `var(--font-sans)`
- Line 1993: `.dc-timeline-year` → `var(--font-sans)`
- Line 2000: `.dc-timeline-cities` → `var(--font-sans)`
- Line 2037: `.dc-company-name` → `var(--font-sans)`
- Line 2045: `.dc-company-cities` → `var(--font-sans)`
- Line 2070: `.dc-territory-chart .dc-bar-label` → `var(--font-sans)`

Also add display font to title classes that lack an explicit font-family:
- Line 46: `.dc-hero-title` — add `font-family: var(--font-display);`
- Line 156: `.dc-section-title` — add `font-family: var(--font-display);`
- Line 957: `.dc-section-title-large` — add `font-family: var(--font-display);`

**Step 2: Verify data center article visually**

**Step 3: Commit**

```bash
git add src/styles/articles/data-center.css
git commit -m "feat: apply font variables to data center article"
```

---

## Task 6: Update `articles/abundance.css` font-family declarations

**Files:**
- Modify: `src/styles/articles/abundance.css`

**Step 1: Replace all 5 hardcoded font-family declarations**

- Line 10: `.abundance-article` → `var(--font-sans)` (base wrapper)
- Line 80: `.abundance-hero-title` → `var(--font-display)`
- Line 197: `.abundance-prose` → `var(--font-body)`
- Line 220: `.abundance-prose code` → keep `"JetBrains Mono", monospace` (this is correct)
- Line 599: `.abundance-quote p` → `var(--font-body)`

**Step 2: Commit**

```bash
git add src/styles/articles/abundance.css
git commit -m "feat: apply font variables to abundance article"
```

---

## Task 7: Update `articles/vote-tracker.css` font-family declarations

**Files:**
- Modify: `src/styles/articles/vote-tracker.css`

**Step 1: Replace all 3 hardcoded font-family declarations**

- Line 10: `.vote-article` → `var(--font-sans)` (base wrapper)
- Line 80: `.vote-hero-title` → `var(--font-display)`
- Line 194: `.vote-prose` → `var(--font-body)`

**Step 2: Commit**

```bash
git add src/styles/articles/vote-tracker.css
git commit -m "feat: apply font variables to vote tracker article"
```

---

## Task 8: Update `articles/temperature.css` font-family declarations

**Files:**
- Modify: `src/styles/articles/temperature.css`

**Step 1: Replace all 3 hardcoded font-family declarations**

- Line 10: `.temp-article` → `var(--font-sans)` (base wrapper)
- Line 79: `.temp-hero-title` → `var(--font-display)`
- Line 191: `.temp-prose` → `var(--font-body)`

**Step 2: Commit**

```bash
git add src/styles/articles/temperature.css
git commit -m "feat: apply font variables to temperature article"
```

---

## Task 9: Verify no hardcoded font-family declarations remain

**Step 1: Search for any remaining hardcoded font-family**

Run: `grep -rn "font-family" src/styles/ src/app/globals.css | grep -v "var(--font"`

Expected: Only the JetBrains Mono declaration in abundance.css (which is intentional) and the `:root`/`@theme inline` definitions.

**Step 2: Run the full build**

Run: `npm run build`

Expected: Build succeeds with no errors.

**Step 3: Run existing tests**

Run: `npx vitest run`

Expected: All tests pass.

**Step 4: Commit (if any stragglers were found)**

---

## Task 10: Build the colophon page

**Files:**
- Create: `src/app/colophon/page.tsx`

**Step 1: Create the colophon page**

Server component (no "use client"). Content sections:
1. **Opening** — What The District is, connection to Hamlet's mission
2. **Typography** — Fraunces, Literata, Inter — why each was chosen, prose style
3. **Design** — Dark cinematic aesthetic, per-article color worlds, Stripe Press influence
4. **Technology** — Next.js, data pipeline, 3,000+ city halls, link to myhamlet.com
5. **Closing** — "The District is a publication by Hamlet"

Use the existing design token system. The page should use `--font-body` for prose, `--font-display` for headings, and `--font-sans` for labels. Keep it clean — no article theme needed, use the default navy dark background.

```tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Colophon — The District",
  description: "About the design, typography, and technology behind The District.",
};

export default function ColophonPage() {
  return (
    <main className="colophon-page">
      <div className="colophon-content">
        <header className="colophon-header">
          <p className="colophon-label">Colophon</p>
          <h1 className="colophon-title">How This Publication Is Made</h1>
        </header>

        <section className="colophon-section">
          <p className="colophon-prose">
            The District is a visual journalism publication by{" "}
            <a href="https://myhamlet.com" target="_blank" rel="noopener noreferrer">
              Hamlet
            </a>
            . We analyze transcripts, votes, and public records from more than
            3,000 city halls across America to uncover what&rsquo;s really
            happening in local democracy.
          </p>
        </section>

        <section className="colophon-section">
          <h2 className="colophon-section-title">Typography</h2>
          <p className="colophon-prose">
            Headlines are set in{" "}
            <strong>Fraunces</strong>, a variable serif by Undercase Type
            with an optical size axis that gives it different character at
            display and text sizes. Its soft, slightly wonky forms bring
            warmth to serious subjects.
          </p>
          <p className="colophon-prose">
            Long-form prose is set in{" "}
            <strong>Literata</strong>, designed by TypeTogether for extended
            reading. Its even texture and generous proportions keep the eye
            comfortable across thousands of words of policy analysis and
            investigative reporting.
          </p>
          <p className="colophon-prose">
            Interface elements, labels, and data visualizations use{" "}
            <strong>Inter</strong> by Rasmus Andersson, optimized for
            screens at small sizes where clarity matters most.
          </p>
        </section>

        <section className="colophon-section">
          <h2 className="colophon-section-title">Design</h2>
          <p className="colophon-prose">
            The District uses a dark, cinematic aesthetic where each article
            inhabits its own color world. Data center stories live in deep
            navy blues. Housing analysis sits on warm cream. Vote trackers
            emerge from dark slate with amber accents. This per-article
            theming lets each investigation establish its own visual
            identity while sharing a common typographic and structural
            foundation.
          </p>
        </section>

        <section className="colophon-section">
          <h2 className="colophon-section-title">Technology</h2>
          <p className="colophon-prose">
            Every story in The District starts with data. Hamlet&rsquo;s
            platform processes transcripts, agendas, and voting records from
            city council meetings across the country. Our journalism team
            uses this data to find patterns, anomalies, and stories that
            would be impossible to uncover by hand.
          </p>
          <p className="colophon-prose">
            The site is built with Next.js and deployed on Vercel. Articles
            are hand-coded React components with bespoke data visualizations
            — no CMS templates. Each chart, map, and interactive element is
            built specifically for the story it tells.
          </p>
          <p className="colophon-prose">
            <a href="https://myhamlet.com" target="_blank" rel="noopener noreferrer">
              Learn more about Hamlet &rarr;
            </a>
          </p>
        </section>

        <footer className="colophon-footer-section">
          <p className="colophon-prose">
            The District is a publication by{" "}
            <a href="https://myhamlet.com" target="_blank" rel="noopener noreferrer">
              Hamlet
            </a>
            .
          </p>
        </footer>
      </div>
    </main>
  );
}
```

**Step 2: Add colophon styles to `shared-article.css`**

Add to the end of `src/styles/shared-article.css`, before the UTILITIES section:

```css
/* ===========================
   COLOPHON PAGE
   =========================== */

.colophon-page {
  min-height: 100vh;
  background: var(--navy-950);
  color: white;
  padding: 8rem 2rem 4rem;
}

@media (min-width: 768px) {
  .colophon-page {
    padding: 10rem 3rem 6rem;
  }
}

.colophon-content {
  max-width: 640px;
  margin: 0 auto;
}

.colophon-header {
  margin-bottom: 4rem;
}

.colophon-label {
  font-family: var(--font-sans);
  font-size: var(--type-tiny);
  font-weight: 600;
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--gray-400);
  margin-bottom: 1rem;
}

.colophon-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
}

.colophon-section {
  margin-bottom: 3rem;
}

.colophon-section-title {
  font-family: var(--font-display);
  font-size: var(--type-subsection);
  font-weight: 600;
  line-height: var(--leading-tight);
  margin-bottom: 1rem;
  color: white;
}

.colophon-prose {
  font-family: var(--font-body);
  font-size: var(--type-body);
  line-height: var(--leading-relaxed);
  color: var(--gray-300);
  margin-bottom: 1.25rem;
}

.colophon-prose strong {
  color: white;
  font-weight: 600;
}

.colophon-prose a {
  color: var(--indigo-400);
  transition: color 0.2s var(--ease-elegant);
}

.colophon-prose a:hover {
  color: var(--indigo-300);
}

.colophon-footer-section {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
```

**Step 3: Verify colophon page**

Visit `/colophon` in dev. Should render cleanly with Fraunces headings, Literata prose, Inter label.

**Step 4: Commit**

```bash
git add src/app/colophon/page.tsx src/styles/shared-article.css
git commit -m "feat: add colophon page with typography, design, and technology sections"
```

---

## Task 11: Update footer with colophon link

**Files:**
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/styles/shared-article.css` (footer styles)

**Step 1: Update Footer component**

```tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer-minimal">
      <p className="footer-attribution">
        A{" "}
        <a
          href="https://myhamlet.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hamlet
        </a>{" "}
        Publication
      </p>
      <p className="footer-colophon">
        Set in Fraunces & Literata ·{" "}
        <Link href="/colophon">Colophon</Link>
      </p>
    </footer>
  );
}
```

**Step 2: Add footer-colophon styles**

In `src/styles/shared-article.css`, after `.footer-attribution a:hover` (line 518):

```css
.footer-colophon {
  font-size: 0.6875rem;
  color: var(--gray-500);
  margin-top: 0.5rem;
  letter-spacing: 0.02em;
}

.footer-colophon a {
  color: var(--gray-400);
  transition: color 0.2s ease;
}

.footer-colophon a:hover {
  color: white;
}
```

**Step 3: Verify footer on all pages**

Check homepage, an article page, and the colophon page itself. Footer should show both lines.

**Step 4: Commit**

```bash
git add src/components/layout/Footer.tsx src/styles/shared-article.css
git commit -m "feat: add colophon link to footer"
```

---

## Task 12: Update design system documentation

**Files:**
- Modify: `DESIGN_SYSTEM.md`
- Modify: `CLAUDE.md`

**Step 1: Update typography section in DESIGN_SYSTEM.md**

Replace the Typography Scale section header area (around lines 72-83) to add font family documentation:

```markdown
### Font Families

| Token | Font | Fallback | Role |
|-------|------|----------|------|
| `--font-display` | Fraunces | Georgia, serif | Headlines, article titles, section titles |
| `--font-body` | Literata | Georgia, serif | Prose, subtitles, pull quotes, findings |
| `--font-sans` | Inter | system-ui, sans-serif | UI, labels, navigation, data viz, buttons |

All three fonts are loaded via `next/font/google` in `layout.tsx`. Never use hardcoded font-family values — always reference the CSS variables.
```

**Step 2: Update CLAUDE.md typography reference**

In the Technical Reference > Typography section, update to reflect the new fonts.

**Step 3: Commit**

```bash
git add DESIGN_SYSTEM.md CLAUDE.md
git commit -m "docs: update typography documentation for Fraunces + Literata"
```

---

## Task 13: Final verification

**Step 1: Full build**

Run: `npm run build`

Expected: Build succeeds.

**Step 2: Run all tests**

Run: `npx vitest run`

Expected: All tests pass.

**Step 3: Grep for any remaining hardcoded font-family**

Run: `grep -rn "font-family" src/styles/ src/app/ --include="*.css" | grep -v "var(--font" | grep -v "JetBrains"`

Expected: Only the `:root` and `@theme inline` definitions.

**Step 4: Visual spot-check**

Check these pages in browser:
- Homepage (hero title in Fraunces)
- `/articles/data-center-gold-rush` (title in Fraunces, prose in Literata)
- `/articles/abundance-index` (light theme — verify fonts work on light bg)
- `/colophon` (all three fonts visible)
- Footer on any page (colophon link present)
