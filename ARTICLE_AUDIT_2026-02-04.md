# Article Audit Report - February 4, 2026

**Audited against:** VOICE_GUIDELINES.md and EDITORIAL_STANDARDS.md

---

## 1. Data Center Gold Rush

**File:** `/src/app/articles/data-center-gold-rush/page.tsx`

### Kill List Scan
| Phrase | Status |
|--------|--------|
| "These aren't just..." | NOT FOUND |
| "This isn't just..." | NOT FOUND |
| "What we found:" | NOT FOUND |
| "The data reveals..." | NOT FOUND |
| "In an era of..." | NOT FOUND |
| "It's worth noting..." | NOT FOUND |
| "Interestingly," | NOT FOUND |
| "Notably," | FOUND line 481 - **FIXED** (removed) |
| "raises questions" | NOT FOUND |
| "suggests that" | NOT FOUND |
| "For developers..." | NOT FOUND |
| "For residents..." | NOT FOUND |

### Stakeholder Language
- NONE FOUND

### Sources Validation
| Source | Outlet | Validates |
|--------|--------|-----------|
| Arizona city rejects AI data center | Fox Business | Chandler rejection claim |
| Meta DeKalb data center | Chicago Tribune | DeKalb claims |
| Water/energy Midwest | KCUR | Resource concerns |
| Illinois power grid | Capitol News Illinois | Illinois grid strain |

**Sources distinct from other articles:** YES

### Data Claims Verified
- 156 cities: matches `DATA.summary.totalCities` (156)
- 5,007 mentions: matches `DATA.summary.totalMentions` (5007)
- 38 negative cities: matches `DATA.summary.negativeCitiesCount` (38)
- Power concern in 87 cities: matches `DATA.concernCounts.power` (87)
- 957 meetings: computed from `DATA.meetingTypes` (560+330+67=957)

### Methodology Section
- Data source: YES (Hamlet transcripts)
- Sample size: YES (156 cities)
- Date range: YES (2023-Jan 2025)
- Selection criteria: YES (cities with data center mentions)
- Limitations: YES (coverage varies, selection bias acknowledged)

**STATUS: PASS**

---

## 2. Abundance Index

**File:** `/src/app/articles/abundance-index/page.tsx`

### Kill List Scan
| Phrase | Status |
|--------|--------|
| "These aren't just..." | NOT FOUND |
| "This isn't just..." | NOT FOUND |
| "What we found:" | NOT FOUND |
| "The data reveals..." | NOT FOUND |
| "In an era of..." | NOT FOUND |
| "It's worth noting..." | NOT FOUND |
| "Interestingly," | NOT FOUND |
| "Notably," | NOT FOUND |
| "raises questions" | NOT FOUND |
| "suggests that" | NOT FOUND |
| "For developers..." | NOT FOUND |
| "For residents..." | NOT FOUND |

### Stakeholder Language
- NONE FOUND

### Sources Validation
| Source | Outlet | Validates |
|--------|--------|-----------|
| Temple, Texas city data | Census.gov | Temple TX claims |
| Dubuque, Iowa city data | Census.gov | Dubuque IA claims |
| Fairfax, Virginia city data | Census.gov | Fairfax VA claims |
| Hayward, California city data | Census.gov | Hayward CA claims |

**Sources distinct from other articles:** YES (updated 2026-02-04)

### Data Claims Verified
- 84 cities: matches `DATA.summary.totalCities` (84)
- 46 YIMBY: matches `DATA.summary.yimbyCount` (46)
- 14 NIMBY: matches `DATA.summary.nimbyCount` (14)
- Temple index 80.0: matches `DATA.yimbyChampions[0].abundanceIndex` (80.0)
- Fairfax index 12.0: matches `DATA.nimbyStrongholds[0].abundanceIndex` (12.0)

### Methodology Section
- Data source: YES (municipal transcripts)
- Sample size: YES (84 cities with 10+ mentions)
- Date range: YES (Jan 2023 - Jan 2025)
- Definitions: YES (sentiment scoring, Abundance Index formula)
- Limitations: YES (NLP limitations, sample size caveats)
- Weighting: YES (60% sentiment, 40% positive ratio)

**STATUS: PASS**

---

## 3. Vote Tracker

**File:** `/src/app/articles/vote-tracker/page.tsx`

### Kill List Scan
| Phrase | Status |
|--------|--------|
| "These aren't just..." | NOT FOUND |
| "This isn't just..." | NOT FOUND |
| "What we found:" | NOT FOUND |
| "The data reveals..." | NOT FOUND |
| "In an era of..." | NOT FOUND |
| "It's worth noting..." | NOT FOUND |
| "Interestingly," | NOT FOUND |
| "Notably," | NOT FOUND |
| "raises questions" | NOT FOUND |
| "suggests that" | NOT FOUND |
| "For developers..." | FOUND line 415 - **FIXED** (removed) |
| "For residents..." | NOT FOUND |

### Stakeholder Language
- "For developers, the message is clear" - **FIXED** (removed)

### Sources Validation
| Source | Outlet | Validates |
|--------|--------|-----------|
| Princeton affordable housing | Gothamist | Princeton housing debate |
| Stockton Street development | Daily Princetonian | Princeton development |
| Newark housing approved | Jersey Digs | Newark claims |
| Newark mixed-use NJEDA | New Jersey EDA | Newark development |

**Sources distinct from other articles:** YES

### Data Claims Verified
- 1,524 officials: matches `DATA.summary.totalOfficials` (1524)
- 25,219 votes: matches `DATA.summary.totalVotes` (25219)
- 96.5% approval: matches `DATA.summary.avgApprovalRate` (96.5)
- 3,073 substantive votes: matches `DATA.substantive.totalVotes` (3073)
- 75% environmental: matches `DATA.substantive.lowestApproval.rate` (75.0)
- Eddie Osborne 119 yes, 0 no: matches `DATA.yesVoters[0]`
- Mark Freda 0 yes, 26 no: matches `DATA.noVoters[0]`

### Structural Fix (2026-02-04)
- **PROBLEM:** Administrative votes (13,132 = 52%) dominated display
- **FIX:** Restructured to lead with substantive votes (3,073)
- **FIX:** Environmental finding (75%) now prominent
- **FIX:** At a Glance shows substantive stats
- **FIX:** Methodology explains substantive vs administrative

### Methodology Section
- Data source: YES (Legistar)
- Sample size: YES (1,524 officials)
- Date range: YES (2023-Jan 2025)
- Topic classification: YES (substantive vs administrative explained)
- Limitations: YES (Legistar-only cities, roll-call recording variance)

**STATUS: PASS (after fixes)**

---

## 4. Temperature Check

**File:** `/src/app/articles/temperature-check/page.tsx`

### Kill List Scan
| Phrase | Status |
|--------|--------|
| "These aren't just..." | NOT FOUND |
| "This isn't just..." | NOT FOUND |
| "What we found:" | NOT FOUND |
| "The data reveals..." | NOT FOUND |
| "In an era of..." | NOT FOUND |
| "It's worth noting..." | NOT FOUND |
| "Interestingly," | NOT FOUND |
| "Notably," | NOT FOUND |
| "raises questions" | NOT FOUND |
| "suggests that" | NOT FOUND |
| "For developers..." | NOT FOUND |
| "For residents..." | NOT FOUND |

### Stakeholder Language
- NONE FOUND

### Sources Validation
| Source | Outlet | Validates |
|--------|--------|-----------|
| Tiffin, Ohio city data | Census.gov | Tiffin OH claims |
| Dalton, Georgia city data | Census.gov | Dalton GA claims |
| Grants Pass, Oregon city data | Census.gov | Grants Pass OR claims |

**Sources distinct from other articles:** YES

### Data Claims Verified
- 438 cities: matches `DATA.summary.totalCities` (438)
- 85.3 avg friction: matches `DATA.summary.avgOverallScore` (85.3)
- 90.4% contention: matches `DATA.summary.avgContentionRate` (90.4)
- 6 max-heat cities: matches `DATA.hottestCities.filter(c => c.overallScore === 100).length` (6)
- Grants Pass 38.2: matches `DATA.calmestCities[0].overallScore` (38.2)

### Methodology Section
- Data source: YES (Hamlet transcripts, NLP)
- Sample size: YES (438 cities with 9+ meetings)
- Definitions: YES (contention rate, opposition frequency, friction score formula)
- Limitations: YES (transcript quality variance, NLP limitations)

**STATUS: PASS**

---

## Summary

| Article | Kill List | Stakeholder | Sources | Data Claims | Methodology | Status |
|---------|-----------|-------------|---------|-------------|-------------|--------|
| Data Center Gold Rush | 1 fixed | Clean | Valid | Verified | Complete | PASS |
| Abundance Index | Clean | Clean | Valid | Verified | Complete | PASS |
| Vote Tracker | 1 fixed | 1 fixed | Valid | Verified | Complete | PASS |
| Temperature Check | Clean | Clean | Valid | Verified | Complete | PASS |

**All 4 articles now comply with VOICE_GUIDELINES.md and EDITORIAL_STANDARDS.md**

---

*Audit performed: 2026-02-04*
