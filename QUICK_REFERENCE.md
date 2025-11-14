# Quick Reference Card

**Last Updated:** November 10, 2025  
**Purpose:** One-page cheat sheet for Chef Approved Tools standards

---

## 📖 ALWAYS READ FIRST

**Every session, read in this order:**
1. START_HERE.md (protection rules, red flags)
2. VOICE_AND_CREDENTIALS.md (credentials, voice, pricing)
3. Then topic-specific docs as needed

---

## 👨‍🍳 CREDENTIALS (Never Wrong)

**Primary credential:** "24 years of professional kitchen experience"

**Key numbers:**
- 24 years professional experience (NOT 20, NOT 25)
- 6 years at Purple Café (NOT 18)
- 4 years Kitchen Manager (NOT 7, NOT 24)

**Primary restaurant:** Purple Café (2007-2012)

---

## 🚫 PRICING RULES (Zero Tolerance)

**NEVER SAY:**
- "$50" or any specific price
- "budget-friendly" or price categories

**ALWAYS SAY:**
- "6 years professional use without failure"
- "Expect 15-20 years home use"
- "Professional-grade durability"
- Focus on longevity, NOT price

---

## 🎨 ACCESSIBILITY (The 4 Rules)

1. **Links:** `text-orange-700` (NOT orange-600)
2. **Stars:** `text-amber-700` (NOT yellow-400)
3. **Headings:** h1 → h2 → h3 (no skipping)
4. **One H1:** Only ONE h1 per page

---

## 🔧 COMMON COMPONENT ERRORS

**CTAVisibilityTracker:**
```tsx
// ❌ WRONG
<CTAVisibilityTracker ctaPosition="hero" />

// ✅ CORRECT
<CTAVisibilityTracker position="hero" />
```

**TestingResults:**
```tsx
// ❌ WRONG
testingEnvironment: null

// ✅ CORRECT
testingEnvironment: []
```

---

## 🗂️ DOCUMENTATION MAP

**CORE DOCS (Read these):**
1. START_HERE.md → Protection rules
2. VOICE_AND_CREDENTIALS.md → Voice, credentials, pricing
3. CONTENT_STANDARDS.md → Review/blog structure
4. TECHNICAL_STANDARDS.md → Design, code, accessibility

**IMPLEMENTATION GUIDES (Reference as needed):**
5. COMPONENT_INTERFACES.md → TypeScript specs
6. COMPARISON_TABLE_GUIDE.md → Comparison tables
7. MIGRATION_PROCESSES.md → Updating old content

---

## 📝 CONTENT CHECKLIST

**Every piece of content:**
- [ ] Credentials correct (24 years, 6 years Purple Café)
- [ ] No forbidden phrases ("let's dive in", "game-changer")
- [ ] No pricing violations (no "$50")
- [ ] Professional context (specific restaurant when relevant)
- [ ] Honest pros AND cons
- [ ] CTA text: "Check Price on Amazon"
- [ ] Links use `text-orange-700`

---

## 🔧 TECHNICAL CHECKLIST

**Every deployment:**
- [ ] `npm run build` succeeds
- [ ] `npm run type-check` passes
- [ ] Links use `text-orange-700`
- [ ] Stars use `text-amber-700`
- [ ] Heading hierarchy correct
- [ ] Only one h1
- [ ] All images have alt text
- [ ] Lighthouse: Desktop 100, Mobile 80+

---

## 🚨 RED FLAGS (Stop Immediately)

**If AI suggests:**
- ❌ Running a script to modify files
- ❌ "Let me update all the reviews"
- ❌ Changing credentials (20 years, 18 years, etc.)
- ❌ Using `text-orange-600` for links
- ❌ Using `export const dynamic = 'force-dynamic'`
- ❌ Skipping heading levels (h1 → h3)

**Then:** STOP. Check START_HERE.md. Ask Scott.

---

## 💬 VOICE QUICK CHECK

**Good voice includes:**
- ✅ Specific timeline (6 years at Purple Café)
- ✅ Specific restaurant name
- ✅ Specific results (zero failures, 30-50 smoothies/shift)
- ✅ Honest limitations

**Bad voice includes:**
- ❌ Generic claims ("many chefs agree")
- ❌ Hype words ("game-changer", "amazing")
- ❌ Vague authority ("experts recommend")
- ❌ Fake enthusiasm ("let's dive in!")

---

## 🎯 QUICK DECISIONS

**"What file do I need?"**
- Creating content → CONTENT_STANDARDS.md
- Technical work → TECHNICAL_STANDARDS.md
- Migrating old pages → MIGRATION_PROCESSES.md
- Component props → COMPONENT_INTERFACES.md
- Comparison table → COMPARISON_TABLE_GUIDE.md

**"Which blog pattern?"**
- Comparing 2 products (X vs Y) → Pattern A
- Everything else → Pattern B

**"Which database pattern?"**
- Core review page → Pattern 1 (no fallback)
- Guide or blog → Pattern 2 (with fallback)

---

## 📊 FILE SIZES

- START_HERE.md: 1,100 lines
- VOICE_AND_CREDENTIALS.md: 804 lines
- CONTENT_STANDARDS.md: 2,650 lines
- TECHNICAL_STANDARDS.md: 2,400 lines
- COMPONENT_INTERFACES.md: 400 lines
- COMPARISON_TABLE_GUIDE.md: 1,450 lines
- MIGRATION_PROCESSES.md: 1,300 lines

**Total:** ~10,000 lines (but you only read what you need!)

---

## 🔗 QUICK LINKS

**All files available at:** `/mnt/user-data/outputs/`

1. [START_HERE.md](computer:///mnt/user-data/outputs/START_HERE.md)
2. [VOICE_AND_CREDENTIALS.md](computer:///mnt/user-data/outputs/VOICE_AND_CREDENTIALS.md)
3. [CONTENT_STANDARDS.md](computer:///mnt/user-data/outputs/CONTENT_STANDARDS.md)
4. [TECHNICAL_STANDARDS.md](computer:///mnt/user-data/outputs/TECHNICAL_STANDARDS.md)
5. [COMPARISON_TABLE_GUIDE.md](computer:///mnt/user-data/outputs/COMPARISON_TABLE_GUIDE.md)
6. [MIGRATION_PROCESSES.md](computer:///mnt/user-data/outputs/MIGRATION_PROCESSES.md)
7. [SUMMARY](computer:///mnt/user-data/outputs/DOCUMENTATION_CONSOLIDATION_SUMMARY.md)

---

## 🎓 REMEMBER

**The Golden Rules:**
1. Preserve functionality over "improvements"
2. Ask before ANY changes
3. No scripts without approval
4. Test everything locally first
5. Quality over speed (always)
6. When in doubt: STOP and ASK

---

**Print this page and keep it next to your monitor!**

*Last updated: November 13, 2025*
