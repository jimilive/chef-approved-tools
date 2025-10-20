# Conversation State: Credibility Messaging Fix
**Created:** October 20, 2025
**Last Updated:** October 20, 2025
**Status:** IN PROGRESS - Phase 1 (1 of 5 files complete)

---

## 🔄 PROMPT TO USE AFTER CONVERSATION COMPACTION

**Copy this exactly and paste into new conversation:**

```
We are in the middle of fixing credibility claims across the Chef Approved Tools website.

CRITICAL: Read these files immediately for full context:
1. /Users/scottbradley/chef-approved-tools/docs/tasks/CONVERSATION_STATE_CREDIBILITY_FIX.md
2. /Users/scottbradley/chef-approved-tools/docs/tasks/TODO.md (lines 17-63)

Check the active todo list to see what was last completed.

WORKING METHOD (DO NOT DEVIATE):
- Present FULL before/after preview for EVERY change
- Wait for user approval on specific wording
- Execute changes ONE AT A TIME using Edit tool
- User verifies each file after completion
- NO batching, NO shortcuts, NO efficiency optimizations
- Move to next file ONLY after user confirms

Continue from where we left off using this exact method.
```

---

## If Conversation Compacts - READ THIS FIRST

### Current Task
Fixing all credibility claims across the site to reflect authentic experience.

### Working Method (DO NOT CHANGE)
1. Present FULL before/after preview for each change
2. User reviews and approves specific wording
3. Execute changes one at a time using Edit tool
4. User verifies each file after completion
5. NO batching, NO shortcuts, NO speed optimizations
6. Move to next file only after confirmation

### Verified Facts (Scott's Real Experience)
- **Professional experience:** 24 years (1986-2015)
  - Started: Wendy's 1986 (age 15)
  - Notable: Mellow Mushroom Kitchen Manager (1992-1994), Purple Café 6 years (2007-2012)
  - Last role: 2015 (NOT Calicraft - was let go after 1 month, do not mention)
- **Total cooking:** 45 years (age 10 to 55)
- **Current status:** Cooking at home in apartment with electric range
- **Education:** A.A.S. Culinary Arts (Seattle Central College), B.S. Business
- **Michelin claims:** ALL FALSE - AI-generated fiction, MUST REMOVE

### Approved Positioning

**Primary credential (use everywhere):**
> "24 years of professional kitchen experience from Wendy's to Kitchen Manager positions. Now cooking at home with the same standards learned in restaurant kitchens."

**Tier 1 (Professional Testing):**
> "I used [product] daily at [Purple Café/Mellow Mushroom] during my 24 years in professional kitchens. Tested through thousands of dinner services from [year] to [year]."

**Tier 2 (Home Use):**
> "I've used [product] at home for [X] years. While I have 24 years of professional kitchen experience, this review reflects home use in an apartment kitchen with an electric range—the same limitations most home cooks face."

**Tier 3 (Expert Analysis):**
> "While I haven't personally tested [product] long-term, my 24 years of professional kitchen experience gives me the expertise to evaluate specifications and value."

**45 years total cooking - USE ONLY FOR:**
- Personal story/bio context
- Lead magnet intro
- When explaining home cooking background
- Format: "I've been cooking since I was 10 years old—45 years of experience, including 24 years working professionally..."

**Apartment kitchen honesty - USE AS STRENGTH:**
- Tier 2 reviews should mention electric range limitations
- Positions as relatable to most home cooks
- Shows expertise in maximizing tools despite constraints

## Progress Tracking

### Phase 1: Critical User-Facing Content (5 files)

**File 1: Lead Magnet** ✅ COMPLETED
- File: `lib/lead-magnet-content.ts`
- Changes: 4 (all completed Oct 20, 2025)
  - ✅ Title/subtitle/author updated (lines 4-6)
  - ✅ "Why Only 11 Tools" paragraph (line 93)
  - ✅ Removed Michelin claim in Victorinox section (line 110)
  - ✅ Footer credentials (line 186)

**File 2: Victorinox 8" Review** ⏳ NEXT
- File: `app/reviews/victorinox-fibrox-8-inch-chefs-knife/page.tsx`
- Changes needed: 8
  - [ ] Line 110: FAQ - Remove Michelin, change 23→24
  - [ ] Line 126: FAQ - Remove Michelin, change 23→24
  - [ ] Line 259: Remove "40 years of cooking and", keep "24 years professional"
  - [ ] Line 299: Change 23→24
  - [ ] Line 564: Remove Michelin reference
  - [ ] Line 567: Change 23→24
  - [ ] Line 660: Remove Michelin reference
  - [ ] Line 664: Change 23→24

**File 3: Victorinox 10" Review** 📋 PENDING
- File: `app/reviews/victorinox-fibrox-10-inch-chefs-knife/page.tsx`
- Changes needed: 3
  - [ ] Line 217: Remove Michelin
  - [ ] Line 288: Remove Michelin
  - [ ] Line 751: Remove Michelin

**File 4: ZUPERIA Bar Mops** 📋 PENDING
- File: `app/reviews/zuperia-bar-mops/page.tsx`
- Changes needed: 1
  - [ ] Line 170: Remove Michelin

**File 5: Pinterest Pin** 📋 PENDING
- File: `pinterest-pins/victorinox-fibrox-10-inch.md`
- Changes needed: 1
  - [ ] Line 14: Remove Michelin, change 40→24

### Phase 2: Template Files (2 files) - NOT STARTED
- `templates/content/buying-guide-tier3-template.tsx` (3 changes)
- `templates/content/comparison-post-template.tsx` (1 change)

### Phase 3: Documentation (2 files) - NOT STARTED
- `docs/social-media-for-introverts.md` (22 instances)
- `REVIEW_CREATION_GUIDE.md` (multiple instances)

### Phase 4: Remaining Reviews (~45 files) - NOT STARTED
- Global: "23 years" → "24 years" updates

## Find/Replace Patterns (For Reference)

### Michelin Claims (REMOVE ALL)
```
FIND: Michelin-starred restaurants
REPLACE: professional kitchens

FIND: Michelin-starred restaurants worldwide
REPLACE: professional kitchens from casual dining to fine dining

FIND: from small cafes to Michelin-starred restaurants
REPLACE: from small cafes to fine dining establishments
```

### Years Updates
```
FIND: 23 years in professional kitchens
REPLACE: 24 years in professional kitchens

FIND: 23+ years of professional experience
REPLACE: 24 years of professional kitchen experience

FIND: 40 years of cooking and 23 years in professional kitchens
REPLACE: 24 years in professional kitchens

FIND: After 40 years of cooking
REPLACE: After 24 years in professional kitchens
```

## If Conversation Compacts

**Immediately check:**
1. This file (CONVERSATION_STATE_CREDIBILITY_FIX.md)
2. TODO.md (lines 17-63 have full context)
3. Active todo list in conversation

**Resume by:**
1. Confirming which file was last completed
2. Loading next file's change preview
3. Following the working method exactly (no shortcuts)

## Notes for Future Claude
- User wants methodical, professional approach
- NO batching or efficiency optimizations
- Show full before/after for every change
- Wait for approval before executing
- One file at a time, verify before proceeding
- Tokens and time are NOT concerns - accuracy is everything
