# Humanizer Progress Tracking

**Started:** January 22, 2026
**Method:** Manual audit for AI-isms (em dashes, filler phrases, marketing hype)

---

## Instructions for Claude (READ FIRST)

**Before starting any work:**
1. Read `/Users/scottbradley/chef-approved-tools/CLAUDE.md` for project rules and protected values
2. Read `/Users/scottbradley/chef-approved-tools/START_HERE.md` for project context
3. Read `/Users/scottbradley/.claude/skills/humanizer/SKILL.md` for full humanizer methodology

**Process for each page:**
1. Find the page files (page.tsx and *-data.ts) using Glob
2. Read both files completely
3. Audit for: em dashes (—), AI phrases, marketing hype, protected value violations
4. Present findings in a table format, separating required fixes from optional/borderline items
5. Wait for user approval before making ANY changes
6. After approval, make edits and update this tracking file
7. Also fix code inconsistencies (e.g., hardcoded values that should use data file)

**Protected Values (from CLAUDE.md):**
- "24 years professional kitchen experience" (NOT 45 years, NOT "Kitchen Manager for 24 years")
- Amazon tag: chefapprovedt-20
- CTA text: "Check Price on Amazon" (if linking to Amazon)

**When user says "yes":**
- Make the main proposed changes
- Leave "optional/borderline" items as-is unless specifically requested

---

## Progress

| # | Page | Status | Em Dashes | AI Phrases | Notes |
|---|------|--------|-----------|------------|-------|
| 1 | /reviews/kitchenaid-kp26m1xlc-professional-600 | Done | 3 | 5 | Fixed 8 total issues |
| 2 | /reviews/victorinox-fibrox-8-inch-chefs-knife | Done | 0 | 3 | Fixed 5 total (2 protected value, 3 AI phrases) |
| 3 | /reviews/epicurean-kitchen-cutting-board | Done | 0 | 3 | Fixed 4 total (3 AI phrases + 1 code cleanup) |
| 4 | /reviews/vitamix-5200-professional-blender | Done | 1 | 2 | Fixed 3 total |
| 5 | /reviews/method-all-purpose-cleaner | Done | 3 | 3 | Fixed 8 occurrences (duplicate FAQs) |
| 6 | /reviews/wusthof-classic-ikon-16-piece | Done | 0 | 1 | Fixed 1 AI phrase |
| 7 | /reviews/wusthof-classic-ikon-santoku | Done | 4 | 3 | Fixed 9 occurrences total |
| 8 | /reviews/le-creuset-signature-7-25-qt-dutch-oven | Done | 2 | 1 | Fixed 5 occurrences total |
| 9 | /reviews/cuisinart-dlc-10c-classic-food-processor | Done | 4 | 1 | Fixed 6 occurrences total |
| 10 | /reviews/victorinox-fibrox-10-inch-chefs-knife | Done | 0 | 3 | Fixed 4 total (1 protected value + 3 AI phrases) |

## Patterns Being Checked

### Em Dashes (—)
- Replace with periods, commas, colons, or semicolons as appropriate

### AI Filler Phrases
- "comprehensive", "delve", "robust", "leverage", "seamlessly"
- "crucial", "essential", "vital", "straightforward"
- "game-changer", "revolutionary", "elevate"
- "navigate", "landscape", "tapestry"
- "let's dive in", "let's explore", "it's worth noting"
- "when it comes to", "at the end of the day", "in conclusion"

### Marketing Hype
- "amazing", "incredible", "mind-blowing", "life-changing", "must-have"

---

## Session Log

### January 22, 2026
- Created tracking file
- Page 2 (victorinox-fibrox-8-inch) already done earlier
- Page 10 (victorinox-fibrox-10-inch) already done earlier
- Starting with Page 1 (kitchenaid-kp26m1xlc-professional-600)

### January 23, 2026
- Page 1 (kitchenaid-kp26m1xlc-professional-600) completed
  - 3 em dashes → commas
  - "endless possibilities" → specific examples
  - "exemplifies" → "is"
  - "flying colors" → "easily"
  - "effortlessly" → "without strain"
  - "lifelong cooking companion" → "reliable kitchen workhorse"
  - "single best kitchen investment" → "one of my best kitchen investments"
- Page 2 (victorinox-fibrox-8-inch-chefs-knife) completed
  - "45 years of cooking" → "24 years of cooking" (2 locations - protected value fix)
  - "Exceptional." → "Precise and controlled."
  - "Outstanding." → "Well-balanced."
  - "Unbeatable." → "Hard to beat."
- Page 3 (epicurean-kitchen-cutting-board) completed
  - "The Game-Changer" → "Why It Works"
  - "What Works Exceptionally Well" → "What Works"
  - "The combination is unbeatable" → "The combination works"
  - Code fix: page.tsx now uses reviewData.prosTitle instead of hardcoding
- Page 4 (vitamix-5200-professional-blender) completed
  - 1 em dash → period
  - "simply cannot match" → "can't match"
  - "Far superior performance" → "Better performance"
- Page 5 (method-all-purpose-cleaner) completed
  - 3 em dashes fixed (5 occurrences due to duplicate FAQ sections)
  - "effortlessly" removed from 3 locations (kept 1 per user preference)
  - Replacements: "without scrubbing", "easily", "quickly"
- Page 6 (wusthof-classic-ikon-16-piece) completed
  - "game-changer" → "significant factor"
- Page 7 (wusthof-classic-ikon-santoku) completed
  - 4 em dashes fixed (5 occurrences)
  - "effortless/effortlessly" → "smooth/smoothly" (3 occurrences)
  - "What Works Exceptionally Well" → "What Works Well"
- Page 8 (le-creuset-signature-7-25-qt-dutch-oven) completed
  - 2 em dashes fixed (4 occurrences due to duplicate FAQs)
  - "game-changer" → "invaluable"
- Page 9 (cuisinart-dlc-10c-classic-food-processor) completed
  - 4 em dashes fixed (6 occurrences)
  - "effortlessly" → "easily"
- Page 10 (victorinox-fibrox-10-inch-chefs-knife) completed
  - "45 years of cooking" → "24 years of cooking" (protected value fix)
  - "Exceptional." → "Precise cutting."
  - "Outstanding" → "Well-suited"
  - "Unbeatable" → "Best value"
