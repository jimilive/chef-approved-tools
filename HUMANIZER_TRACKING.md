# Humanizer Progress Tracking

**Started:** January 22, 2026
**Last Updated:** January 23, 2026
**Method:** Manual audit for AI-isms (em dashes, filler phrases, marketing hype)

---

## HANDOFF FOR NEXT SESSION

### Current Status
- **31 pages completed** (10 reviews, 21 blogs)
- **Next page:** #32 (check priority list for next page)
- Priority list location: `/Users/scottbradley/Downloads/pages-by-importance.md`

### Critical Lessons Learned
1. **ALWAYS grep for em dashes** - Visual scanning misses them. Run `grep -n "—" [file]` on BOTH the data file AND page.tsx before reporting findings.
2. **Check both files** - Most content is in *-data.ts, but page.tsx often has hardcoded text too.
3. **Em dashes are the #1 issue** - Average 10-15 per page. Replace with periods, commas, colons, or parentheses based on context.

### Workflow Summary
1. User says "next on the list" or similar
2. Check priority list to find next undone page
3. Glob for page files, Read both, grep for em dashes
4. Present audit in table format (em dashes + AI phrases separately)
5. Wait for "yes" approval
6. Make edits one at a time using Edit tool
7. Verify with grep that no em dashes remain
8. Update this tracking file (Progress table + Session log)
9. Announce completion and next page

### Common AI Phrases to Fix
- "comprehensive" → remove or use "this"
- "effortlessly/effortless" → "easily/easy"
- "seamless/seamlessly" → "easy/easily"
- "transformative" → "helpful" or "a big help"
- "remarkably" → "very"
- "whopping" → remove
- "trailblazing" → "original"
- "liquid gold" → describe what it actually is
- "game-changer" → "significant" or rephrase

### Em Dash Replacement Guide
- Explanatory clause → use comma or parentheses
- Contrast/but → use comma + "but"
- List introduction → use colon
- Dramatic pause/new thought → use period
- Aside/parenthetical → use parentheses

---

## Instructions for Claude (READ FIRST)

**Before starting any work:**
1. Read `/Users/scottbradley/chef-approved-tools/CLAUDE.md` for project rules and protected values
2. Read `/Users/scottbradley/chef-approved-tools/START_HERE.md` for project context
3. Read `/Users/scottbradley/.claude/skills/humanizer/SKILL.md` for full humanizer methodology (if available)

**Process for each page:**
1. Find the page files (page.tsx and *-data.ts) using Glob
2. Read both files completely
3. **CRITICAL: Run `grep -n "—"` on BOTH files** to find all em dashes
4. Audit for: em dashes (—), AI phrases, marketing hype, protected value violations
5. Present findings in a table format, separating required fixes from optional/borderline items
6. Wait for user approval before making ANY changes
7. After approval, make edits and update this tracking file
8. Also fix code inconsistencies (e.g., hardcoded values that should use data file)

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
| 11 | /blog/cutting-board-materials-guide | Done | 15 | 0 | Re-audited: fixed 15 em dashes (was 1) |
| 12 | /blog/stainless-steel-why-food-sticks | Done | 26 | 0 | Re-audited: fixed 26 em dashes (was 0) |
| 13 | /blog/best-scrambled-eggs | Done | 5 | 1 | Fixed 3 protected values (45→24 yrs), 5 em dashes, 1 AI phrase |
| 14 | /blog/gas-vs-induction-cooktop | Done | 6 | 1 | Re-audited: fixed 6 em dashes (was 0), 1 AI phrase |
| 15 | /blog/stock-vs-broth-vs-bouillon | Done | 0 | 0 | Clean - no changes needed |
| 16 | /blog/dutch-oven-size-guide-which-quart-size | Done | 14 | 1 | Re-audited: fixed 14 em dashes (was 3), 1 marketing word |
| 17 | /blog/how-to-preheat-a-pan | Done | 7 | 1 | Fixed 7 em dashes (5 data, 3 page), 1 AI phrase |
| 18 | /blog/how-to-get-rust-off-knife | Done | 2 | 0 | Fixed 2 em dashes |
| 19 | /blog/cooking-by-feel | Done | 0 | 0 | Clean - no changes needed |
| 20 | /blog/santoku-vs-chef-knife | Done | 26 | 3 | Re-audited: fixed 26 em dashes (was 1), 3 AI phrases |
| 21 | /blog/cast-iron-vs-carbon-steel-pan | Done | 17 | 1 | Re-audited: fixed 17 em dashes (was 0), 1 AI phrase |
| 22 | /blog/how-to-clean-burnt-stainless-steel-pans | Done | 6 | 0 | Fixed 6 em dashes (3 data, 3 page) |
| 23 | /blog/guide-cooking-oils-smoke-points | Done | 0 | 2 | Fixed 2 AI phrases ("effortless") |
| 24 | /blog/maillard-reaction-browning-flavor | Done | 17 | 0 | Fixed 17 em dashes |
| 25 | /blog/how-to-cook-perfect-pasta | Done | 13 | 3 | Fixed 13 em dashes, 3 "liquid gold" |
| 26 | /blog/air-fryer-vs-convection-oven | Done | 10 | 1 | Fixed 10 em dashes, 1 "remarkably" |
| 27 | /blog/nutribullet-vs-magic-bullet | Done | 6 | 2 | Fixed 6 em dashes, "whopping", "trailblazing" |
| 28 | /blog/air-fryer-vs-deep-fryer | Done | 14 | 0 | Fixed 14 em dashes |
| 29 | /blog/dutch-oven-vs-slow-cooker | Done | 8 | 3 | Fixed 8 em dashes, "comprehensive", "transformative", "seamless" |
| 30 | /blog/stand-mixer-vs-hand-mixer | Done | 16 | 3 | Fixed 16 em dashes, "comprehensive", 2x "effortlessly" |
| 31 | /blog/food-processor-vs-blender | Done | 46 | 0 | Fixed 46 em dashes (4 data, 42 page) |

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
- Page 11 (cutting-board-materials-guide) completed
  - 1 em dash → comma in metadata description
- Page 12 (stainless-steel-why-food-sticks) completed
  - Clean page - no changes needed
- Page 13 (best-scrambled-eggs) completed
  - 3 protected value fixes: "45 years" → "24 years" (lines 50, 130, 180)
  - 5 em dashes → periods/commas
  - "effortlessly" → "easily"
- Page 14 (gas-vs-induction-cooktop) completed
  - "comprehensive comparison" → "comparison"
- **RE-AUDIT SESSION**: Discovered visual scanning was missing em dashes. Used grep to find all em dashes.
  - Page 11 (cutting-board-materials-guide): 15 em dashes fixed (originally reported 1)
  - Page 12 (stainless-steel-why-food-sticks): 26 em dashes fixed (originally reported 0)
  - Page 14 (gas-vs-induction-cooktop): 6 em dashes fixed (originally reported 0)
  - Page 16 (dutch-oven-size-guide): 14 em dashes fixed (originally reported 3)
  - Page 20 (santoku-vs-chef-knife): 26 em dashes fixed (originally reported 1)
  - Page 21 (cast-iron-vs-carbon-steel-pan): 17 em dashes fixed (originally reported 0)
  - Page 24 (maillard-reaction-browning-flavor): 17 em dashes fixed (originally reported 0)
  - **Total re-audit fixes: 121 em dashes**
  - **Lesson learned: ALWAYS use `grep "—"` on every file before reporting findings**
- Page 25 (how-to-cook-perfect-pasta) completed
  - 13 em dashes → periods, commas, colons
  - 3 "liquid gold" → "starchy water" or "essential"
- Page 26 (air-fryer-vs-convection-oven) completed
  - 10 em dashes → periods, commas, colons
  - 1 "remarkably" → "very"
- Page 27 (nutribullet-vs-magic-bullet) completed
  - 6 em dashes → periods, commas, colons, parentheses
  - "whopping" removed, "trailblazing" → "original"
- Page 28 (air-fryer-vs-deep-fryer) completed
  - 14 em dashes → periods, commas, colons, parentheses
- Page 29 (dutch-oven-vs-slow-cooker) completed
  - 8 em dashes → commas, periods, parentheses
  - "comprehensive" removed, "transformative" → "a big help", "seamless" → "easy"
- Page 30 (stand-mixer-vs-hand-mixer) completed
  - 16 em dashes → periods, commas, colons
  - "comprehensive" removed, 2x "effortlessly" → "easily"
- Page 31 (food-processor-vs-blender) completed
  - 46 em dashes → colons, commas, periods, parentheses
  - Large page with comparison table data (17 em dashes in table rows)
