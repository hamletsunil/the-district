# The District: Content Roadmap

**Mission:** Data-driven stories from local government. We analyze transcripts, votes, and records from 3,000+ city halls to uncover what's really happening in local democracy.

---

## Published

| Article | Slug | Theme | Author | Status |
|---------|------|-------|--------|--------|
| The Data Center Gold Rush | `data-center-gold-rush` | `data-center` | Sunil | Published |
| The Abundance Index | `abundance-index` | `abundance` | Sunil | Published |
| The Temperature Check | `temperature-check` | `temperature` | Sunil | Published |
| The Vote Tracker | `vote-tracker` | `vote-tracker` | Sunil | Published |

---

## Pipeline

### Ready to Build

**1. Follow the Money: Budget Priorities**
- Slug: `budget-priorities`
- Theme: `budget` (dark/contrast with amber or green accents)
- Author: **Paige Saez**
- Angle: What topics dominate budget discussions reveals what cities actually care about — police vs parks vs infrastructure, mapped across hundreds of city halls
- Data source: Hamlet transcripts filtered for budget-related discussions
- Design doc: `docs/plans/2026-02-04-budget-priorities-design.md`
- Prereq: Byline component (new shared infrastructure)

### Ideas

**2. Police & Public Safety Debates**
- Angle: The single biggest line item in most city budgets, and a frequent source of contentious public comment
- Data gap filled: High-emotion topic likely rich in transcript data, no coverage yet
- Potential data: Hamlet transcripts filtered for policing/safety keywords, budget allocations
- Pairs with: Temperature Check (are the hottest cities arguing about policing?)

**3. Zoning Outcomes: What Actually Gets Approved?**
- Angle: The Abundance Index measures *attitude* toward growth. This article tracks actual *outcomes* — what got approved, denied, delayed
- Data gap filled: Closes the gap between sentiment and reality
- Potential data: Planning commission votes, permit records, project timelines
- Pairs with: Abundance Index (do YIMBY cities actually approve more?)

**4. The Democracy Gap: Who Shows Up?**
- Angle: Measure civic participation itself — how many public commenters per city, who testifies, how long meetings run
- Data gap filled: Every article assumes engaged citizens. This one measures engagement directly
- Potential data: Transcript speaker counts, meeting durations, public comment periods
- Pairs with: Temperature Check (is friction correlated with participation?)

---

## Infrastructure Needs

- [ ] **Author/byline system** — No byline UI exists. Need to add author metadata to articles and a byline component in the hero section.
- [ ] **Author pages** — Optional future: `/authors/[slug]` pages with bio and article list.

---

## How to Use This Document

1. **Got an idea?** Add it under "Ideas" with the angle, data gap it fills, and what data you'd need.
2. **Ready to write?** Move it to "Ready to Build" with an assigned author and target theme.
3. **Published?** Move it to the "Published" table.
4. **Killed an idea?** Delete it. Don't hoard dead ideas.
