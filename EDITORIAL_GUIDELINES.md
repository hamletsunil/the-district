# The District - Editorial Guidelines

## Fact-Checking Process

**Every article must be validated before publication.** No exceptions.

This document defines the validation process and source quality standards for all District articles.

---

## Pre-Publication Checklist

Complete this checklist before any article goes live:

### 1. Major Claims Verification

- [ ] Each city named has been searched: `"[City] [Topic] [Year]"` on news sources
- [ ] Each claim matches public record / news coverage
- [ ] Working URL saved for each validated claim

### 2. Quote Verification

- [ ] Hamlet transcript quotes: Marked as "From Hamlet municipal transcript database"
- [ ] External quotes: Linked to original source
- [ ] Speaker attribution verified

### 3. Statistics Verification

- [ ] Percentages cross-checked against methodology
- [ ] Population figures verified via Census.gov
- [ ] Dollar amounts verified against news sources
- [ ] Dates and timelines confirmed

### 4. Source Quality Check

- [ ] All URLs tested and working
- [ ] No broken links
- [ ] No paywalled content (or noted if paywalled)
- [ ] Sources are Tier 1 or Tier 2 only (see below)

### 5. Final Step

- [ ] `SOURCES` array added to article with minimum 3 sources
- [ ] `SourcesCitations` component imported and used
- [ ] All source links tested one final time

---

## Trusted Source Tiers

### Tier 1 - Always Acceptable

Use these sources without hesitation:

- **Major newspapers**: New York Times, Wall Street Journal, Washington Post, local papers of record (Chicago Tribune, LA Times, etc.)
- **Government sources**: Any .gov domain (Census.gov, city/county government sites)
- **Wire services**: Associated Press (AP), Reuters
- **Academic sources**: University research, peer-reviewed publications

### Tier 2 - Generally Acceptable

Use these sources with normal editorial judgment:

- **Industry publications**: Data Center Dynamics, E&E News, GovTech
- **Local TV news**: ABC, CBS, NBC, Fox affiliate stations
- **Established trade publications**: Industry-specific outlets with editorial standards
- **Regional newspapers**: Smaller market papers with professional newsrooms

### Tier 3 - Use With Caution

Only use if no Tier 1/2 source available:

- **Niche blogs**: Only if author has clear domain expertise
- **Press releases**: Only for company-specific factual claims (investment amounts, project specs)
- **Industry reports**: Verify methodology before citing

### Never Use

Do not cite these as sources:

- **Wikipedia**: Find and cite the original source instead
- **Social media posts**: Not acceptable as primary sources
- **Broken/dead links**: Find an archived version or different source
- **Heavily paywalled content**: Readers can't verify
- **Anonymous blogs**: No accountability
- **Partisan advocacy sites**: Potential bias issues

---

## Adding Sources to Your Article

### Step 1: Import the Component

```tsx
import { SourcesCitations, Source } from "@/components/article/SourcesCitations";
```

### Step 2: Create the SOURCES Array

Add this near the top of your article file, after your DATA constant:

```tsx
const SOURCES: Source[] = [
  {
    title: "Exact headline or title of the article",
    outlet: "News Outlet Name",
    url: "https://full-url-to-the-article"
  },
  {
    title: "Second source headline",
    outlet: "Another Outlet",
    url: "https://another-url"
  },
  // Minimum 3 sources, aim for 4-5
];
```

### Step 3: Add the Component

Place `<SourcesCitations sources={SOURCES} />` after your `<MethodologySection />`:

```tsx
export default function YourArticle() {
  return (
    <main className="article-page" data-theme="your-theme">
      {/* ... article content ... */}
      <MethodologySection />
      <SourcesCitations sources={SOURCES} />
    </main>
  );
}
```

---

## Creating a New Article

1. Copy `/src/app/articles/_template/page.tsx.example` to a new folder
2. Rename to `page.tsx`
3. Write your article content
4. Run this validation checklist
5. Add your validated sources
6. Test all links before deploying

---

## Questions?

If you're unsure whether a source qualifies or a claim needs verification, err on the side of caution. It's better to over-verify than to publish something inaccurate.

The District's credibility depends on rigorous fact-checking. Every claim we make should be defensible with a source.
