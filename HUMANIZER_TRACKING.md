# Humanizer Progress Tracking

**Started:** January 22, 2026
**Last Updated:** January 24, 2026
**Method:** Manual audit for AI-isms (em dashes, filler phrases, marketing hype)

---

## HANDOFF FOR NEXT SESSION

### Current Status
- **100 pages completed** (22 reviews, 68 blogs, 10 guides/categories)
- **Next page:** #101 (check priority list for next page)
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
| 32 | /blog/ninja-vs-vitamix | Done | 7 | 5 | Fixed 7 em dashes, 5 AI phrases (re-audit) |
| 33 | /blog/air-fryer-vs-toaster-oven | Done | 3 | 2 | Fixed 3 em dashes, 2 AI phrases (re-audit) |
| 34 | /blog/carbon-steel-vs-stainless-steel-knife | Done | 12 | 1 | Fixed 12 em dashes, 1 "comprehensive" |
| 35 | /blog/paring-knife-vs-chefs-knife | Done | 8 | 0 | Fixed 8 em dashes |
| 36 | /blog/how-to-make-perfect-risotto | Done | 19 | 2 | Fixed 19 em dashes, 2 "straightforward" |
| 37 | /blog/cutting-storing-fresh-herbs | Done | 17 | 2 | Fixed 17 em dashes (9 data, 10 page), 2 "elevate" |
| 38 | /reviews/benriner-large-mandoline | Done | 11 | 7 | Fixed 11 em dashes, 7 AI phrases (effortlessly, Additionally, remarkable, transformative) |
| 39 | /blog/hidden-secrets-of-brining | Done | 8 | 0 | Fixed 8 em dashes |
| 40 | /reviews/oxo-good-grips-bench-scraper | Done | 41 | 2 | Fixed 41 em dashes, 1 protected value (45→24 yrs), 2 AI phrases |
| 41 | /reviews/robot-coupe-r2-dice | Done | 21 | 3 | Fixed 21 em dashes (18 data, 8 page), 1 protected value (45→24 yrs), 3 AI phrases (game-changer, 2x comprehensive) |
| 42 | /blog/stand-mixer-buying-guide | Done | 17 | 0 | Fixed 17 em dashes (15 page, 2 data) |
| 43 | /blog/cookware-materials-explained | Done | 16 | 0 | Fixed 16 em dashes (15 data, 1 page) |
| 44 | /blog/cast-iron-seasoning-care | Done | 43 | 1 | Fixed 43 em dashes (42 data, 1 page), 1 AI phrase ("Essential") |
| 45 | /blog/pressure-cooker-vs-slow-cooker | Done | 5 | 1 | Fixed 5 em dashes, 1 AI phrase ("transformative") |
| 46 | /blog/vegetable-roasting-guide | Done | 22 | 1 | Fixed 22 em dashes (20 page, 2 data), 1 AI phrase ("effortlessly") |
| 47 | /blog/wood-vs-composite-cutting-board | Done | 15 | 1 | Fixed 15 em dashes (all data), 1 AI phrase ("comprehensive") |
| 48 | /blog/how-to-make-roux | Done | 13 | 0 | Fixed 13 em dashes (all data) |
| 49 | /blog/air-fryer-vs-convection-oven | Skip | - | - | Already done as Page 26 |
| 50 | /blog/complete-victorinox-knife-lineup-comparison | Done | 11 | 0 | Fixed 11 em dashes (2 data, 9 page) |
| 51 | /reviews/john-boos-platinum-commercial-cutting-board | Done | 14 | 2 | Fixed 14 em dashes, 2 AI phrases ("remarkably", "comprehensive") |
| 52 | /reviews/victorinox-offset-bread-knife | Done | 1 | 4 | Fixed 1 em dash, 1 protected value (45→24 yrs), 3 AI phrases ("crucial", "essential" x2) |
| 53 | /reviews/rubbermaid-commercial-cooks-scraper | Done | 31 | 0 | Fixed 31 em dashes (29 data, 2 page), 2 protected values (45→24 yrs) |
| 54 | /reviews/victorinox-granton-edge-boning-knife | Done | 1 | 6 | Fixed 1 em dash, 6 AI phrases ("essential" x4, "remarkably", "game-changer") |
| 55 | /reviews/instant-pot-duo-plus-6qt | Done | 11 | 4 | Fixed 11 em dashes, 4 AI phrases ("transformative", "comprehensive", "game-changer", "essential") |
| 56 | /reviews/henckels-sharpening-steel | Done | 8 | 4 | Fixed 8 em dashes, 4 AI phrases ("essential" x3, "comprehensive") |
| 57 | /reviews/victorinox-4-inch-paring-knife | Done | 1 | 1 | Fixed 1 em dash, 1 AI phrase ("Essential" → "Great") |
| 58 | /reviews/diamond-crystal-kosher-salt | Done | 14 | 1 | Fixed 14 em dashes, 1 AI phrase ("comprehensive" → removed) |
| 59 | Page #59 already done in priority list (henckels-sharpening-steel) | Skip | - | - | - |
| 60 | /reviews/nordic-ware-half-sheet-pan | Done | 41 | 3 | Fixed 41 em dashes, 3 PROTECTED VALUES (45→24 yrs), includes comparison data file |
| 61 | /blog/knife-storage-protecting-blades-for-decades | Done | 44 | 2 | Fixed 44 em dashes, 2 AI phrases ("comprehensive" → "this", "essential" → "important") |
| 62 | /blog/nonstick-vs-stainless-steel-pans | Done | 16 | 2 | Fixed 16 em dashes (15 data, 1 page), 2 AI phrases ("effortlessly" → "easily", "comprehensive" → removed) |
| 63 | /blog/air-fryer-vs-oven | Done | 0 | 1 | Fixed 1 AI phrase ("essential" → "ideal") |
| 64 | /blog/why-children-hate-broccoli | Done | 13 | 0 | Fixed 13 em dashes |
| 65 | /blog/magic-of-freshly-ground-pepper | Done | 17 | 6 | Fixed 17 em dashes, 6 AI phrases (optimal, essential, elevate, robust) |
| 66 | /blog/kitchen-thermometers-guide | Done | 27 | 2 | Fixed 27 em dashes (26 data, 1 page), 2 AI phrases ("Optimal" → "Best", "elevate" → "improve") |
| 67 | /blog/reducing-sauces-restaurant-technique | Done | 37 | 0 | Fixed 37 em dashes (7 data, 30 page) |
| 68 | /blog/stand-mixer-vs-hand-mixer | Skip | - | - | Already done as Page 30 |
| 69 | /blog/understanding-cooking-fats | Done | 10 | 0 | Fixed 10 em dashes (1 data, 9 page) |
| 70 | /blog/nutribullet-vs-magic-bullet | Skip | - | - | Already done as Page 27 |
| 71 | /blog/knife-skills-how-to-hold-chef-knife | Done | 37 | 1 | Fixed 37 em dashes, 1 AI phrase ("Essential Tools" → "Tools") |
| 72 | /blog/how-to-make-perfect-risotto | Skip | - | - | Already done as Page 36 |
| 73 | /blog/how-to-wash-lettuce | Done | 17 | 2 | Fixed 17 em dashes, 2 AI phrases ("optimal" → "right"/"proper") |
| 74 | /blog/potatoes-cooking-guide | Done | 12 | 0 | Fixed 12 em dashes (4 data, 8 page) |
| 75 | /blog/bread-science-gluten-development | Done | 12 | 0 | Fixed 12 em dashes (3 data, 9 page) |
| 76 | /blog/cooking-with-tomatoes-fresh-vs-canned | Done | 5 | 4 | Fixed 5 em dashes (3 page, 2 data), 4 AI phrases (essential→important, effortless→easier/easy) |
| 77 | /blog/how-to-sear-steaks-like-restaurant-chef | Done | 17 | 4 | Fixed 17 em dashes (all data), 4 AI phrases (Essential→Equipment, optimal→proper/ideal) |
| 78 | /blog/understanding-acids-cooking | Done | 12 | 1 | Fixed 12 em dashes (11 data, 1 page), 1 AI phrase ("essential"→"matters") |
| 79 | /blog/what-is-braising | Done | 11 | 0 | Fixed 11 em dashes (all data), kept "11 Essential Tools" PDF title |
| 80 | /blog/what-is-velveting | Done | 23 | 4 | Fixed 23 em dashes, 4 AI phrases (Essential→Required, essential→necessary, optimal→ideal) |
| 81 | /knives | Done | 0 | 0 | Clean - kept "Essential Knife Guides" section title |
| 82 | /guides/best-budget-chef-knife | Done | 1 | 1 | Fixed 1 em dash, 1 PROTECTED VALUE (45→24 years) |
| 83 | /guides/best-chef-knives | Done | 8 | 0 | Fixed 8 em dashes, kept AI phrases per user request |
| 84 | /cookware | Done | 0 | 0 | Clean - kept "Essential Cookware Guides" section title |
| 85 | /guides/best-knife-for-cutting-meat | Done | 0 | 0 | Clean - kept "essential tool" phrases per user request |
| 86 | /appliances | Done | 0 | 0 | Clean - kept "Essential Appliance Guides" section title |
| 87 | /moving-stirring | Done | 0 | 0 | Clean - kept "Essential Tool Guides" section title |
| 88 | /prep-tools | Done | 0 | 0 | Clean - kept "Essential Prep Guides" section title |
| 89 | /guides/affordable-kitchen-appliances | Done | 13 | 2 | Fixed 13 em dashes, 2 PROTECTED VALUES (45→24 years) |
| 90 | /guides/best-cookware | Done | 2 | 0 | Fixed 2 em dashes |
| 91-95 | (completed in previous session) | Done | - | - | - |
| 96 | /blog/caramelization-science | Done | 11 | 0 | Fixed 11 em dashes |
| 97 | /blog/how-to-steel-a-knife | Done | 20 | 1 | Fixed 20 em dashes, 1 AI phrase ("transformative"→"necessary") |
| 98 | /blog/victorinox-budget-vs-wusthof-premium-knives | Done | 12 | 0 | Fixed 12 em dashes |
| 99 | /blog/what-is-mirepoix | Done | 22 | 0 | Fixed 22 em dashes, kept "essential" phrases |
| 100 | /blog/deglazing-pan-sauces | Done | 31 | 0 | Fixed 31 em dashes |

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
- Page 32 (ninja-vs-vitamix) completed
  - 7 em dashes → parentheses, periods, commas, colons
- Page 33 (air-fryer-vs-toaster-oven) completed
  - 3 em dashes → parentheses, colon, comma
- Page 34 (carbon-steel-vs-stainless-steel-knife) completed
  - 12 em dashes (10 data, 2 page.tsx) → periods, colons, commas, parentheses
  - 1 "comprehensive" removed
- Page 35 (paring-knife-vs-chefs-knife) completed
  - 8 em dashes (all page.tsx) → commas, colons, periods

### January 24, 2026
- Page 41 (robot-coupe-r2-dice) completed
  - 1 protected value: "45 Years Cooking Experience" → "24 Years Cooking Experience"
  - 21 em dashes (18 data, 8 page.tsx) → commas, periods, colons, parentheses
  - 3 AI phrases: "game-changer" → "makes a big difference", 2x "comprehensive" → "complete"
  - Attribution em dashes in user reviews preserved (intentional)
- Page 42 (stand-mixer-buying-guide) completed
  - 17 em dashes (15 page, 2 data) → periods, commas, colons, parentheses
- Page 43 (cookware-materials-explained) completed
  - 16 em dashes (15 data, 1 page) → commas, periods, colons, parentheses
- Page 44 (cast-iron-seasoning-care) completed
  - 43 em dashes (42 data, 1 page) → periods, commas, colons, parentheses
  - 1 AI phrase: "Essential Cast Iron Equipment" → "Cast Iron Equipment"
  - Also removed "Essential" from newsletter CTA description
- Page 45 (pressure-cooker-vs-slow-cooker) completed
  - 5 em dashes → periods, parentheses
  - 1 AI phrase: "transformative" → "a big help"
- Page 46 (vegetable-roasting-guide) completed
  - 22 em dashes (20 page, 2 data) → periods, commas, colons
  - 1 AI phrase: "effortlessly" → "reliably"
  - Kept "Essential Roasting Equipment" per user preference
- Page 47 (wood-vs-composite-cutting-board) completed
  - 15 em dashes (all data file) → periods, commas, colons
  - 1 AI phrase: "comprehensive comparison" → "comparison"
- Page 48 (how-to-make-roux) completed
  - 13 em dashes (all data file) → periods, commas, colons
- Page 49 (air-fryer-vs-convection-oven) skipped - already done as Page 26
- Page 50 (complete-victorinox-knife-lineup-comparison) completed
  - 11 em dashes (2 data, 9 page) → periods, commas, colons
  - "Essential" kept as priority category label (not AI hype)
- Page 51 (john-boos-platinum-commercial-cutting-board) completed
  - 14 em dashes → periods, commas
  - 2 AI phrases: "remarkably" → "very", "comprehensive guide" → "complete guide"
- Page 52 (victorinox-offset-bread-knife) completed
  - 1 protected value: "45 years of cooking" → "24 years of cooking"
  - 1 em dash: "too—light" → "too. Light"
  - 3 AI phrases: "crucial when" → "especially when", "essential daily" → "daily", "Essential for" → "Great for"
- Page 53 (rubbermaid-commercial-cooks-scraper) completed
  - 2 protected values: "45 Years Cooking Experience" → "24 Years" (data + page)
  - 31 em dashes → periods, commas, colons, parentheses
  - Preserved attribution em dash in testimonials (intentional)
- Page 54 (victorinox-granton-edge-boning-knife) completed
  - 1 em dash: "deboning—Granton" → "deboning. Granton"
  - 6 AI phrases: "essential" x4 → "you need", "right", "ideal", "great"; "remarkably" → "very"; "game-changer" → "makes a real difference"
- Page 55 (instant-pot-duo-plus-6qt) completed
  - 11 em dashes → periods, commas
  - 4 AI phrases: "transformative" → "makes a real difference", "comprehensive" → "complete", "game-changer" → "real help", "Essential" → "Needed"
- Page 56 (henckels-sharpening-steel) completed
  - 8 em dashes → periods, commas, colons
  - 4 AI phrases: "Essential" x2 → "Important", "essential" → "necessary", "comprehensive" → "complete"
  - Kept "culinary school essential" (line 258) as it describes actual required equipment
- **Batch session: Pages 57-62 (5 pages)**
  - New workflow: 5 pages at a time, em dashes fixed automatically, AI phrases presented for approval
  - Page 57 (victorinox-4-inch-paring-knife): 1 em dash, 1 AI phrase
  - Page 58 (diamond-crystal-kosher-salt): 14 em dashes, 1 AI phrase ("comprehensive")
  - Page 60 (nordic-ware-half-sheet-pan): 41 em dashes, 3 PROTECTED VALUE VIOLATIONS fixed (45→24 years in 3 locations including comparison data file)
  - Page 61 (knife-storage-protecting-blades-for-decades): 44 em dashes, 2 AI phrases
  - Page 62 (nonstick-vs-stainless-steel-pans): 16 em dashes, 2 AI phrases
  - **Total: 116 em dashes fixed, 9 AI phrase/protected value fixes**

### January 25, 2026
- **Batch session: Pages 63-67 (5 pages)**
  - Page 63 (air-fryer-vs-oven): 0 em dashes, 1 AI phrase ("essential" → "ideal")
  - Page 64 (why-children-hate-broccoli): 13 em dashes → periods, commas, colons, parentheses
  - Page 65 (magic-of-freshly-ground-pepper): 17 em dashes, 6 AI phrases (optimal→best, essential→core, elevate→improve, robust→durable)
  - Page 66 (kitchen-thermometers-guide): 27 em dashes (26 data, 1 page), 2 AI phrases (Optimal→Best, elevate→improve)
  - Page 67 (reducing-sauces-restaurant-technique): 37 em dashes (7 data, 30 page)
  - **Total: 94 em dashes fixed, 9 AI phrase fixes**
- **Batch session: Pages 69, 71, 73, 74, 75 (5 pages, skipped 68/70/72 as already done)**
  - Page 69 (understanding-cooking-fats): 10 em dashes → periods, commas, colons
  - Page 71 (knife-skills-how-to-hold-chef-knife): 37 em dashes, 1 AI phrase ("Essential Tools" → "Tools")
  - Page 73 (how-to-wash-lettuce): 17 em dashes, 2 AI phrases ("optimal number" → "right number", "optimal humidity" → "proper humidity")
  - Page 74 (potatoes-cooking-guide): 12 em dashes (4 data, 8 page) → periods, commas, colons
  - Page 75 (bread-science-gluten-development): 12 em dashes (3 data, 9 page) → periods, commas, parentheses
  - **Total: 88 em dashes fixed, 3 AI phrase fixes**
- **Batch session: Pages 76-80 (5 pages)**
  - Page 76 (cooking-with-tomatoes-fresh-vs-canned): 5 em dashes, 4 AI phrases (essential→important, effortless→easier/easy)
  - Page 77 (how-to-sear-steaks-like-restaurant-chef): 17 em dashes, 4 AI phrases (Essential Equipment→Equipment, optimal→proper/ideal, Essential→Important)
  - Page 78 (understanding-acids-cooking): 12 em dashes (11 data, 1 page), 1 AI phrase ("It's essential"→"It matters")
  - Page 79 (what-is-braising): 11 em dashes, kept "11 Essential Tools" PDF title (protected)
  - Page 80 (what-is-velveting): 23 em dashes, 4 AI phrases (Essential→Required, essential→necessary, optimal→ideal, essential→necessary)
  - **Total: 68 em dashes fixed, 13 AI phrase fixes**
- **Batch session: Pages 81-85 (5 category/guide pages)**
  - Page 81 (/knives): 0 em dashes, kept "Essential Knife Guides" section title
  - Page 82 (/guides/best-budget-chef-knife): 1 em dash, 1 PROTECTED VALUE (45→24 years)
  - Page 83 (/guides/best-chef-knives): 8 em dashes → periods, colons
  - Page 84 (/cookware): 0 em dashes, kept "Essential Cookware Guides" section title
  - Page 85 (/guides/best-knife-for-cutting-meat): 0 em dashes, kept AI phrases per user request
  - **Total: 9 em dashes fixed, 1 protected value fix, AI phrases kept per user preference**
- **Batch session: Pages 86-90 (5 category/guide pages)**
  - Page 86 (/appliances): 0 em dashes, kept "Essential Appliance Guides"
  - Page 87 (/moving-stirring): 0 em dashes, kept "Essential Tool Guides"
  - Page 88 (/prep-tools): 0 em dashes, kept "Essential Prep Guides"
  - Page 89 (/guides/affordable-kitchen-appliances): 13 em dashes, 2 PROTECTED VALUES (45→24 years)
  - Page 90 (/guides/best-cookware): 2 em dashes
  - **Total: 15 em dashes fixed, 2 protected value fixes, AI phrases kept per user preference**

### January 26, 2026
- **Batch session: Pages 96-100 (5 blog pages)**
  - Page 96 (/blog/caramelization-science): 11 em dashes → periods, commas, colons
  - Page 97 (/blog/how-to-steel-a-knife): 20 em dashes (18 data, 2 page), 1 AI phrase ("transformative"→"necessary")
  - Page 98 (/blog/victorinox-budget-vs-wusthof-premium-knives): 12 em dashes → periods, commas
  - Page 99 (/blog/what-is-mirepoix): 22 em dashes → periods, commas, colons, parentheses; kept "essential" phrases per user
  - Page 100 (/blog/deglazing-pan-sauces): 31 em dashes → periods, commas, colons
  - **Total: 96 em dashes fixed, 1 AI phrase fix**
