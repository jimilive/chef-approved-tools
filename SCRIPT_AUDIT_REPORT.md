# Script Audit Report - Documentation Compliance Check

**Date:** November 10, 2025
**Audited Against:** New consolidated documentation (START_HERE.md, TECHNICAL_STANDARDS.md, CONTENT_STANDARDS.md, etc.)
**Total Scripts Reviewed:** 29 active scripts

---

## 🎯 Executive Summary

**Overall Status:** ⚠️ **NEEDS UPDATES**

**Critical Issues:** 3
**Important Updates:** 8
**Nice-to-Have:** 4
**Scripts Compliant:** 14

---

## 🚨 CRITICAL ISSUES (Fix Immediately)

### 1. **Accessibility Color Violations in Review Tools**

**Location:**
- `scripts/review-tools/review-fix.js`
- `scripts/review-tools/review-add-sections.js`

**Issue:**
Scripts are generating code with `text-orange-600` for links, which **FAILS WCAG AA accessibility** (contrast ratio 3.2:1, needs 4.5:1).

**Current Code:**
```javascript
<a href="#testimonials" className="text-orange-600 hover:text-orange-800">User Reviews</a>
<a href="#cost-analysis" className="text-orange-600 hover:text-orange-800">Cost Analysis</a>
```

**Required Fix:**
```javascript
<a href="#testimonials" className="text-orange-700 hover:text-orange-800">User Reviews</a>
<a href="#cost-analysis" className="text-orange-700 hover:text-orange-800">Cost Analysis</a>
```

**Documentation Reference:** TECHNICAL_STANDARDS.md - Part 2: Rule #1

**Impact:** HIGH - Generated code fails accessibility standards and will need manual fixing

**Files to Update:**
- `scripts/review-tools/review-fix.js` (6 instances)
- `scripts/review-tools/review-add-sections.js` (10+ instances)

---

### 2. **Outdated Tier System in Review Validation**

**Location:**
- `scripts/review-tools/review-validate.js`
- `scripts/review-tools/review-audit.js`

**Issue:**
Scripts reference "Quality Level 1/2/3" system instead of new "Tier 1/2/3" system from documentation.

**Current Code:**
```javascript
const qualityLevel = qualityScore >= 90 ? 'QUALITY LEVEL 1' :
                     qualityScore >= 75 ? 'QUALITY LEVEL 2' :
                     'QUALITY LEVEL 3';
```

**Required Fix:**
```javascript
const tier = qualityScore >= 90 ? 'TIER 1' :
             qualityScore >= 75 ? 'TIER 2' :
             'TIER 3';
```

**Documentation Reference:** VOICE_AND_CREDENTIALS.md - The Three-Tier System

**Impact:** MEDIUM - Inconsistent terminology confuses content creators

**Files to Update:**
- `scripts/review-tools/review-validate.js`
- `scripts/review-tools/review-audit.js`

---

### 3. **Missing Component System Validation**

**Location:**
- `scripts/review-tools/review-validate.js`
- `scripts/review-tools/review-audit.js`
- `scripts/validate-site-integrity.mjs`

**Issue:**
Scripts don't validate against new component-based architecture (ReviewHero, TestingResultsGrid, etc.)

**Current Checks:**
```javascript
{ test: () => hasImport(content, 'AffiliateButton'), label: 'Has AffiliateButton import' },
{ test: () => hasImport(content, 'FTCDisclosure'), label: 'Has FTCDisclosure import' },
```

**Missing Checks:**
```javascript
// Should validate new component system:
{ test: () => hasImport(content, 'ReviewHero'), label: 'Has ReviewHero import' },
{ test: () => hasImport(content, 'TestingResultsGrid'), label: 'Has TestingResultsGrid import' },
{ test: () => hasImport(content, 'ProsConsGrid'), label: 'Has ProsConsGrid import' },
{ test: () => hasImport(content, 'WhoShouldBuyGrid'), label: 'Has WhoShouldBuyGrid import' },
{ test: () => hasDataFile(slug), label: 'Has separate data.ts file' },
```

**Documentation Reference:** CONTENT_STANDARDS.md - Part 2: Review Page System

**Impact:** HIGH - Scripts can't validate pages against current standards

**Files to Update:**
- `scripts/review-tools/review-validate.js`
- `scripts/review-tools/review-audit.js`
- `scripts/validate-site-integrity.mjs`

---

## ⚠️ IMPORTANT UPDATES (Should Fix Soon)

### 4. **Pricing Validation Missing**

**Location:**
- `scripts/review-tools/review-validate.js`
- `scripts/review-tools/review-audit.js`

**Issue:**
Scripts check for "specific prices" but don't validate against comprehensive pricing guidelines.

**Current Check:**
```javascript
const prices = findSpecificPrices(content);
```

**Should Also Check For:**
```javascript
// Forbidden phrases from VOICE_AND_CREDENTIALS.md
const forbiddenPricingPhrases = [
  'best value',
  'budget-friendly',
  'affordable',
  'cheap',
  'expensive',
  'costs around',
  'priced at',
  'worth the money',
  'good deal',
  'price point'
];
```

**Documentation Reference:** VOICE_AND_CREDENTIALS.md - Pricing Guidelines

**Impact:** MEDIUM - Allows pricing violations to slip through validation

**Files to Update:**
- `scripts/review-tools/utils.js` (add new validation function)
- `scripts/review-tools/review-validate.js`
- `scripts/review-tools/review-audit.js`

---

### 5. **Credentials Validation Missing**

**Location:**
- `scripts/review-tools/review-validate.js`
- `scripts/review-tools/review-audit.js`

**Issue:**
Scripts don't validate that content uses correct credentials.

**Should Check For:**
```javascript
// Correct credentials (from VOICE_AND_CREDENTIALS.md)
const correctCredentials = {
  totalExperience: '24 years',
  purpleCafe: '6 years',
  kitchenManager: '4 years'
};

// Wrong credentials to flag:
const wrongCredentials = [
  '20 years', '18 years', '25 years',  // Wrong total
  '18 years at Purple', '5 years at Purple',  // Wrong Purple Café
  '7 years as Kitchen Manager', '24 years as Kitchen Manager'  // Wrong KM
];
```

**Documentation Reference:** VOICE_AND_CREDENTIALS.md - Credentials

**Impact:** MEDIUM - Allows incorrect credentials to be published

**Files to Update:**
- `scripts/review-tools/utils.js` (add credential validation)
- `scripts/review-tools/review-validate.js`
- `scripts/review-tools/review-audit.js`

---

### 6. **Forbidden Phrases Not Validated**

**Location:**
- `scripts/review-tools/review-validate.js`
- `scripts/review-tools/review-audit.js`

**Issue:**
Scripts don't check for forbidden phrases from voice guidelines.

**Should Check For:**
```javascript
const forbiddenPhrases = [
  "let's dive in",
  "without further ado",
  "game-changer",
  "game changer",
  "revolutionary",
  "amazing",
  "incredible",
  "awesome",
  "many chefs agree",
  "experts recommend",
  "professionals prefer",
  "chefs love",
  "restaurant-quality" // Use "professional kitchen quality" instead
];
```

**Documentation Reference:** VOICE_AND_CREDENTIALS.md - Voice Guidelines

**Impact:** MEDIUM - Generic content slips through without specific professional voice

**Files to Update:**
- `scripts/review-tools/utils.js` (add phrase validation)
- `scripts/review-tools/review-validate.js`

---

### 7. **Missing Heading Hierarchy Validation**

**Location:**
- `scripts/validate-site-integrity.mjs`
- `scripts/review-tools/review-validate.js`

**Issue:**
Scripts don't validate proper heading hierarchy (h1 → h2 → h3, no skipping).

**Should Add:**
```javascript
function validateHeadingHierarchy(content) {
  const headings = content.match(/<h[1-6]>/g) || [];
  const h1Count = (content.match(/<h1>/g) || []).length;

  const issues = [];

  // Check for single h1
  if (h1Count !== 1) {
    issues.push(`Found ${h1Count} h1 tags (should be exactly 1)`);
  }

  // Check for sequential hierarchy
  let lastLevel = 0;
  headings.forEach(heading => {
    const level = parseInt(heading.match(/h([1-6])/)[1]);
    if (level > lastLevel + 1) {
      issues.push(`Skipped heading level: ${lastLevel} → ${level}`);
    }
    lastLevel = level;
  });

  return issues;
}
```

**Documentation Reference:** TECHNICAL_STANDARDS.md - Part 2: Rule #3 & #4

**Impact:** MEDIUM - Accessibility violations (broken heading structure)

**Files to Update:**
- `scripts/validate-site-integrity.mjs`
- `scripts/review-tools/review-validate.js`

---

### 8. **Alt Text Validation Incomplete**

**Location:**
- `scripts/validate-images.mjs`
- `scripts/review-tools/review-validate.js`

**Issue:**
Scripts check if alt text exists but don't validate quality.

**Current Check:**
```javascript
if (!match[0].includes('alt=')) {
  missingAltTags.push(...);
}
```

**Should Also Check:**
```javascript
function validateAltText(altText, imageSrc) {
  const issues = [];

  // Check for empty alt (should be alt="" for decorative only)
  if (altText.trim() === '' && !isDecorativeImage(imageSrc)) {
    issues.push('Empty alt text on non-decorative image');
  }

  // Check for bad alt text
  const badPhrases = ['image of', 'picture of', 'photo of'];
  if (badPhrases.some(phrase => altText.toLowerCase().startsWith(phrase))) {
    issues.push('Alt text starts with redundant phrase');
  }

  // Check length (should be under 125 characters)
  if (altText.length > 125) {
    issues.push(`Alt text too long: ${altText.length} chars (max 125)`);
  }

  return issues;
}
```

**Documentation Reference:** TECHNICAL_STANDARDS.md - Part 2: Image Accessibility

**Impact:** MEDIUM - Poor alt text reduces accessibility

**Files to Update:**
- `scripts/validate-images.mjs`
- `scripts/review-tools/review-validate.js`

---

### 9. **CTAVisibilityTracker Prop Validation Missing**

**Location:**
- `scripts/validate-site-integrity.mjs`

**Issue:**
Scripts don't catch the common AI error of using `ctaPosition` instead of `position`.

**Should Add:**
```javascript
// Check for common CTAVisibilityTracker errors
const ctaTrackerIssues = [];
const ctaTrackerPattern = /<CTAVisibilityTracker[^>]*>/g;
const ctaMatches = [...content.matchAll(ctaTrackerPattern)];

ctaMatches.forEach(match => {
  const componentText = match[0];

  // Check for wrong prop name
  if (componentText.includes('ctaPosition=')) {
    ctaTrackerIssues.push({
      file: filePath,
      issue: 'Uses ctaPosition instead of position',
      line: match[0]
    });
  }

  // Check for missing required props
  if (!componentText.includes('ctaId=')) {
    ctaTrackerIssues.push({
      file: filePath,
      issue: 'Missing required ctaId prop'
    });
  }
});
```

**Documentation Reference:** TECHNICAL_STANDARDS.md - Part 5: CTA Tracking (and RED FLAG #8 in START_HERE.md)

**Impact:** HIGH - Common error that breaks tracking

**Files to Update:**
- `scripts/validate-site-integrity.mjs`

---

### 10. **ISR Configuration Not Validated**

**Location:**
- `scripts/validate-site-integrity.mjs`

**Issue:**
Scripts don't check for proper ISR configuration.

**Should Add:**
```javascript
function validateISRConfig(content, filePath) {
  const issues = [];

  // Check for force-dynamic (WRONG)
  if (content.includes("export const dynamic = 'force-dynamic'")) {
    issues.push({
      file: filePath,
      issue: 'Uses force-dynamic (should use ISR caching)',
      severity: 'error'
    });
  }

  // Check for ISR config (CORRECT)
  const hasRevalidate = content.includes('export const revalidate');
  const hasFetchCache = content.includes("export const fetchCache = 'force-cache'");

  if (!hasRevalidate) {
    issues.push({
      file: filePath,
      issue: 'Missing ISR revalidate configuration',
      severity: 'warning'
    });
  }

  return issues;
}
```

**Documentation Reference:** TECHNICAL_STANDARDS.md - Part 3: Caching Strategy

**Impact:** MEDIUM - Performance issues from missing caching

**Files to Update:**
- `scripts/validate-site-integrity.mjs`

---

### 11. **testingEnvironment Array Validation Missing**

**Location:**
- `scripts/validate-site-integrity.mjs`

**Issue:**
Scripts don't catch the common error of `testingEnvironment: null` instead of `[]`.

**Should Add:**
```javascript
// Check for testingEnvironment null error
if (content.includes('testingEnvironment: null')) {
  issues.push({
    file: filePath,
    issue: 'testingEnvironment is null (should be array)',
    severity: 'error',
    fix: 'Change to: testingEnvironment: []'
  });
}
```

**Documentation Reference:** COMPONENT_INTERFACES.md - Common AI Errors

**Impact:** HIGH - Breaks TypeScript compilation

**Files to Update:**
- `scripts/validate-site-integrity.mjs`

---

## 💡 NICE-TO-HAVE (Optional Improvements)

### 12. **Word Count Thresholds Update**

**Location:**
- `scripts/review-tools/review-validate.js`
- `scripts/review-tools/review-audit.js`

**Issue:**
Word count thresholds don't align with new tier system.

**Current:**
```javascript
if (wordCount < 2500) {
  console.log(formatWarning(` (Quality indicator: Consider expanding)`));
}
```

**New Tier Guidelines (from documentation):**
- Tier 1: 3,000+ words (professional kitchen testing)
- Tier 2: 2,000+ words (long-term home testing)
- Tier 3: 1,200+ words (research-based evaluation)

**Impact:** LOW - Informational only, doesn't break anything

---

### 13. **Add Component Order Validation**

**Location:**
- `scripts/review-tools/review-validate.js`

**Issue:**
Scripts don't validate component order in review pages.

**Should Add:**
```javascript
const expectedComponentOrder = [
  'ProductViewTrackerWrapper',
  'Breadcrumb',
  'ReviewHero',
  'CTAVisibilityTracker', // where-to-buy
  'TestingResultsGrid',
  'PerformanceAnalysis',
  'ProductComparisonTable', // if applicable
  'ProsConsGrid',
  'WhoShouldBuyGrid',
  'FAQSection',
  'EmailCaptureSection',
  'BottomLineSection',
  'RelatedProductsGrid',
  'AuthorBio'
];
```

**Documentation Reference:** CONTENT_STANDARDS.md - Part 2: Review Page Structure

**Impact:** LOW - Improves consistency but not critical

---

### 14. **Add Schema.org Validation**

**Location:**
- `scripts/validate-site-integrity.mjs`

**Issue:**
Scripts mention schema validation but don't actually validate it.

**Current:**
```javascript
console.log(formatWarning('Schema validation: Run manually at https://search.google.com/test/rich-results'));
```

**Could Add:**
- Automated schema validation using Google's API
- Check for required schema fields
- Validate schema structure

**Impact:** LOW - Manual validation works, automation would be nice

---

### 15. **Add Performance Budget Checks**

**Location:**
- New script or add to `scripts/validate-all.mjs`

**Issue:**
No automated performance validation.

**Could Add:**
```javascript
// Check bundle sizes
// Check image sizes
// Check Lighthouse scores
// Validate Core Web Vitals targets
```

**Documentation Reference:** TECHNICAL_STANDARDS.md - Part 4: Performance Standards

**Impact:** LOW - Performance is checked manually via Lighthouse

---

## ✅ SCRIPTS THAT ARE COMPLIANT (No Changes Needed)

The following scripts are working correctly and don't need updates:

1. **scripts/validate-database-integrity.mjs** - Database validation is correct
2. **scripts/validate-duplicate-links.mjs** - Duplicate link detection works well
3. **scripts/extract-metadata.mjs** - Metadata extraction is fine
4. **scripts/extract-all-metadata.mjs** - Bulk metadata extraction works
5. **scripts/extract-review-metadata.mjs** - Review-specific extraction is good
6. **scripts/analyze-metadata.mjs** - Analysis is appropriate
7. **scripts/count-words.mjs** - Word counting is straightforward
8. **scripts/count-words-simple.mjs** - Simple counting is fine
9. **scripts/count-actual-content.mjs** - Content counting works
10. **scripts/list-products.ts** - Product listing is correct
11. **scripts/list-products-by-tier.mjs** - Tier-based listing works
12. **scripts/optimize-images.js** - Image optimization is good
13. **scripts/compress-hero-image.mjs** - Hero image compression works
14. **scripts/submit-indexnow.ts** - IndexNow submission is correct

---

## 📋 PRIORITY IMPLEMENTATION PLAN

### Phase 1: Critical Fixes (Do Now - ~2 hours)

1. **Fix accessibility colors** (30 min)
   - Update `review-fix.js`: orange-600 → orange-700
   - Update `review-add-sections.js`: orange-600 → orange-700
   - Test generated code passes WCAG AA

2. **Update tier terminology** (15 min)
   - Update `review-validate.js`: QUALITY LEVEL → TIER
   - Update `review-audit.js`: QUALITY LEVEL → TIER

3. **Add component system validation** (1 hour)
   - Update `review-validate.js` with new component checks
   - Add data.ts file existence check
   - Test against migrated review pages

4. **Add CTAVisibilityTracker validation** (15 min)
   - Update `validate-site-integrity.mjs`
   - Check for ctaPosition → position error
   - Check for testingEnvironment null error

### Phase 2: Important Updates (Do This Week - ~4 hours)

5. **Add pricing validation** (45 min)
   - Create comprehensive pricing check in `utils.js`
   - Integrate into review-validate.js
   - Test against all forbidden phrases

6. **Add credentials validation** (45 min)
   - Create credential checker in `utils.js`
   - Validate correct years (24, 6, 4)
   - Flag incorrect credentials

7. **Add forbidden phrases check** (30 min)
   - Add to `utils.js`
   - Integrate into validation

8. **Add heading hierarchy validation** (45 min)
   - Create validation function
   - Check h1 count = 1
   - Check sequential hierarchy

9. **Improve alt text validation** (45 min)
   - Validate quality, not just existence
   - Check for bad phrases
   - Check length limits

10. **Add ISR config validation** (30 min)
    - Check for force-dynamic (wrong)
    - Check for revalidate (correct)

### Phase 3: Nice-to-Have (Optional - ~2 hours)

11. **Update word count thresholds** (15 min)
12. **Add component order validation** (45 min)
13. **Improve schema validation** (30 min)
14. **Add performance budget checks** (30 min)

---

## 🔧 DETAILED FIX INSTRUCTIONS

### Critical Fix #1: Accessibility Colors

**File:** `scripts/review-tools/review-fix.js`

**Find and Replace:**
```javascript
// FIND:
className="text-orange-600 hover:text-orange-800"

// REPLACE WITH:
className="text-orange-700 hover:text-orange-800"
```

**Locations to Update:**
- Line ~145: Quick Navigation links (6 instances)
- Any generated link code

**File:** `scripts/review-tools/review-add-sections.js`

**Same replacement as above**

**Test:**
```bash
# After fix, generate code and verify
npm run review-fix test-product
# Check generated code has text-orange-700
```

---

### Critical Fix #2: Component System Validation

**File:** `scripts/review-tools/review-validate.js`

**Add after line 43 (structureChecks array):**

```javascript
const componentSystemChecks = [
  {
    test: () => hasImport(content, 'ReviewHero'),
    label: 'Has ReviewHero component'
  },
  {
    test: () => hasImport(content, 'TestingResultsGrid'),
    label: 'Has TestingResultsGrid component'
  },
  {
    test: () => hasImport(content, 'ProsConsGrid'),
    label: 'Has ProsConsGrid component'
  },
  {
    test: () => hasImport(content, 'WhoShouldBuyGrid'),
    label: 'Has WhoShouldBuyGrid component'
  },
  {
    test: () => hasImport(content, 'FAQSection'),
    label: 'Has FAQSection component'
  },
  {
    test: () => hasImport(content, 'EmailCaptureSection'),
    label: 'Has EmailCaptureSection component'
  },
  {
    test: () => hasImport(content, 'BottomLineSection'),
    label: 'Has BottomLineSection component'
  },
  {
    test: () => hasImport(content, 'AuthorBio'),
    label: 'Has AuthorBio component'
  },
  {
    test: () => {
      const fs = require('fs');
      const dataPath = `app/reviews/${slug}/data.ts`;
      return fs.existsSync(dataPath);
    },
    label: 'Has separate data.ts file'
  }
];

// Run component checks
console.log('\n🧩 COMPONENT SYSTEM CHECKS:');
componentSystemChecks.forEach(check => {
  if (check.test()) {
    console.log(formatSuccess(check.label));
  } else {
    console.log(formatWarning(check.label + ' (migrated pages use components)'));
    warningCount++;
  }
});
```

---

### Critical Fix #3: CTAVisibilityTracker Validation

**File:** `scripts/validate-site-integrity.mjs`

**Add new section after line 251 (end of internal links check):**

```javascript
// ============================================================================
// 6. VALIDATE CTAVisibilityTracker PROPS
// ============================================================================
console.log(`\n${BOLD}6. Validating CTAVisibilityTracker Components...${RESET}`)

let ctaTrackerIssues = []

pageFiles.forEach(({ folder, path }) => {
  const content = readFileSync(path, 'utf-8')

  // Find CTAVisibilityTracker components
  const ctaPattern = /<CTAVisibilityTracker[^>]*>/g
  const matches = [...content.matchAll(ctaPattern)]

  matches.forEach(match => {
    const componentText = match[0]

    // Common AI error: ctaPosition instead of position
    if (componentText.includes('ctaPosition=')) {
      ctaTrackerIssues.push({
        file: `app/reviews/${folder}/page.tsx`,
        issue: 'Uses "ctaPosition" prop (should be "position")',
        line: componentText.substring(0, 100) + '...'
      })
      errors++
    }

    // Check for required props
    if (!componentText.includes('ctaId=')) {
      ctaTrackerIssues.push({
        file: `app/reviews/${folder}/page.tsx`,
        issue: 'Missing required "ctaId" prop',
        line: componentText.substring(0, 100) + '...'
      })
      errors++
    }

    if (!componentText.includes('position=')) {
      ctaTrackerIssues.push({
        file: `app/reviews/${folder}/page.tsx`,
        issue: 'Missing required "position" prop',
        line: componentText.substring(0, 100) + '...'
      })
      errors++
    }
  })

  // Check for testingEnvironment: null
  if (content.includes('testingEnvironment: null')) {
    ctaTrackerIssues.push({
      file: `app/reviews/${folder}/page.tsx`,
      issue: 'testingEnvironment is null (should be array [])',
      severity: 'CRITICAL - BREAKS BUILD'
    })
    errors++
  }
})

if (ctaTrackerIssues.length === 0) {
  console.log(`${GREEN}✓ All CTAVisibilityTracker components are correct${RESET}`)
} else {
  console.log(`${RED}✗ Found ${ctaTrackerIssues.length} CTAVisibilityTracker issue(s):${RESET}`)
  ctaTrackerIssues.forEach(issue => {
    console.log(`  ${RED}•${RESET} ${issue.file}`)
    console.log(`    Issue: ${issue.issue}`)
    if (issue.line) {
      console.log(`    Code: ${YELLOW}${issue.line}${RESET}`)
    }
  })
}
```

---

## 📊 TESTING PLAN

After making changes, run these tests:

```bash
# 1. Test validation scripts
npm run review-validate vitamix-5200
npm run review-audit lodge-cast-iron-skillet

# 2. Test site integrity
npm run validate:all

# 3. Test build
npm run build

# 4. Test generated code
npm run review-fix test-review
# Manually inspect generated code for:
# - text-orange-700 (not orange-600)
# - Proper component structure
# - No accessibility violations
```

---

## 📝 SUMMARY

**Total Issues Found:** 15

**Breakdown:**
- 🚨 Critical (fix now): 3
- ⚠️ Important (fix soon): 8
- 💡 Nice-to-have: 4

**Estimated Total Fix Time:** ~8 hours
- Phase 1 (Critical): 2 hours
- Phase 2 (Important): 4 hours
- Phase 3 (Optional): 2 hours

**Impact:**
- Scripts will generate accessibility-compliant code
- Scripts will validate against current component system
- Scripts will catch common AI errors
- Scripts will enforce voice and credentials standards
- Scripts will maintain consistency with documentation

---

**Next Steps:**
1. Review this report with Scott
2. Get approval for fix priority
3. Implement Phase 1 (critical fixes)
4. Test thoroughly
5. Deploy updated scripts
6. Document changes in script README

---

*Report generated: November 10, 2025*
*Based on: New consolidated documentation system*
*Scripts reviewed: 29 active scripts in /scripts/*
