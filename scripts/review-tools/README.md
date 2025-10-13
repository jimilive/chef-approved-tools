# Review Automation Scripts

**Complete automation system for updating and maintaining Chef Approved Tools product reviews**

---

## 🎯 Overview

These scripts automate ~70% of the mechanical work involved in updating reviews, saving you approximately **30-35 hours** across all 27 reviews.

**What's automated:**
- Adding missing imports
- Creating productData skeleton
- Converting affiliate links to AffiliateButton
- Fixing unescaped apostrophes
- Adding section templates
- Running validation checks

**What you still do (30%):**
- Writing testimonials
- Cost calculations
- Performance metrics
- Specifications research
- Competitor analysis
- Content expansion

---

## 📦 Installation

No installation needed! Scripts are ready to use.

---

## 🚀 Quick Start

### 1. See what needs fixing across all reviews
```bash
npm run batch-audit
```

This shows you:
- Which reviews are critical (short + broken)
- Which reviews need structure updates
- Which reviews are complete
- Summary statistics

### 2. Audit a specific review
```bash
npm run review-audit oxo-good-grips-swivel-peeler
```

Shows:
- Word count and tier
- Missing imports
- Raw affiliate links
- Unescaped apostrophes
- Missing sections

### 3a. Quick-fix technical issues ONLY (recommended for complete reviews)
```bash
npm run review-quick-fix oxo-good-grips-swivel-peeler
```

Automatically fixes build-breaking issues:
- Creates backup
- Adds missing imports
- Fixes all apostrophes (breaks build!)
- Converts raw `<a>` tags → `<AffiliateButton>`

**Does NOT add TODO sections** - perfect for reviews that just need technical cleanup.

### 3b. Add content section templates (for reviews needing expansion)
```bash
npm run review-add-sections oxo-good-grips-swivel-peeler
```

Adds TODO templates for:
- Customer Testimonials
- Cost-Per-Use Analysis
- Performance Metrics
- Specifications Table
- Competitor Comparison
- FAQ Section
- Quick Navigation

**Use AFTER quick-fix if you want to expand the review.**

### 3c. Do both at once (legacy command)
```bash
npm run review-fix oxo-good-grips-swivel-peeler
```

Runs both quick-fix AND adds sections - same as running:
1. `npm run review-quick-fix <slug>`
2. `npm run review-add-sections <slug>`

### 4. Fill in creative content
```bash
# Open the review
code app/reviews/oxo-good-grips-swivel-peeler/page.tsx

# Search for "TODO" to find what needs filling in
# Use helper scripts below for testimonials and specs
```

### 5. Validate before committing
```bash
npm run review-validate oxo-good-grips-swivel-peeler
```

Checks:
- All required components present
- Word count meets minimum
- No unescaped characters
- No raw affiliate links
- TypeScript compiles
- Ready to publish?

---

## 📖 Detailed Script Reference

### `npm run batch-audit`

**Purpose:** Audit all 27 reviews at once

**Output:**
- Lists critical reviews (< 1,500 words)
- Lists reviews needing updates
- Lists complete reviews
- Summary statistics
- Recommendations for next steps
- Saves detailed JSON report

**Use when:**
- Starting the update project
- Want overview of progress
- Planning next batch of updates

**Example output:**
```
📊 Batch Audit Report: All 27 Reviews
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚨 CRITICAL ISSUES (6 reviews)
1. oxo-good-grips-swivel-peeler
   1,146 words | 3 critical | 8 missing

⚠️ NEEDS STRUCTURE UPDATE (20 reviews)
✅ COMPLETE (1 review)

📈 SUMMARY
Total reviews: 27
Average word count: 3,847 words
Quality Level 1: 21 (78%)
Quality Level 2: 0 (0%)
Quality Level 3: 6 (22%)
```

---

### `npm run review-audit <slug>`

**Purpose:** Detailed audit of a single review

**Arguments:**
- `<slug>`: Review slug (e.g., `oxo-good-grips-swivel-peeler`)

**Output:**
- Word count analysis
- Critical issues found
- Missing sections list
- What's already good
- Next steps recommendation

**Use when:**
- Before fixing a review
- Want to see exactly what's missing
- Checking if a review is ready

**Example:**
```bash
npm run review-audit oxo-good-grips-swivel-peeler
```

**Example output:**
```
📊 Review Audit: oxo-good-grips-swivel-peeler
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📈 Word Count: 1,146 words (NEEDS: 1,354 more)

❌ CRITICAL ISSUES:
  - Missing: import AffiliateButton
  - Found 3 raw affiliate links
  - Found 12 unescaped apostrophes

⚠️ MISSING SECTIONS:
  - Customer Testimonials
  - Cost-Per-Use Analysis
  - Performance Metrics
  ...

✅ LOOKS GOOD:
  Has FTC Disclosure
  Has modern Image component

🎯 NEXT STEPS:
  1. Run: npm run review-fix oxo-good-grips-swivel-peeler
  2. Manually add content
  3. Run: npm run review-validate oxo-good-grips-swivel-peeler
```

---

### `npm run review-fix <slug>`

**Purpose:** Automatically fix mechanical issues

**Arguments:**
- `<slug>`: Review slug

**What it fixes:**
1. Creates backup (`.backup-YYYYMMDD`)
2. Adds all missing imports
3. Creates productData skeleton with TODOs
4. Fixes unescaped apostrophes (e.g., `It's` → `It&apos;s`)
5. Converts raw `<a>` tags to `<AffiliateButton>`
6. Adds section templates (testimonials, cost analysis, etc.)
7. Adds Quick Navigation menu
8. Adds structured data schemas

**Use when:**
- Starting to update a review
- After running audit
- Want automation to do the heavy lifting

**Example:**
```bash
npm run review-fix oxo-good-grips-swivel-peeler
```

**Example output:**
```
🔧 Fixing Review: oxo-good-grips-swivel-peeler
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Created backup: page.tsx.backup-20250115

✅ Added imports:
  + import { Tier2Badge }
  + import AffiliateButton
  ...

✅ Created productData skeleton
   → TODO: Fill in brand, model, specs

✅ Fixed 12 unescaped apostrophes

✅ Converted 3 affiliate links:
  - Line 244: <a> → <AffiliateButton position="above_fold">
  - Line 523: <a> → <AffiliateButton position="mid_article">

✅ Added section templates:
  + Customer Testimonials (line 456)
  + Cost-Per-Use Analysis (line 512)
  ...

🎯 NEXT STEPS:
Review file and fill in TODO sections:
  1. Update productData object
  2. Add 6-8 customer testimonials
  3. Add cost calculations
  ...
```

**Important:**
- Always creates a backup first
- Preserves existing content
- Only adds missing pieces
- Marks everything with TODO comments

---

### `npm run review-validate <slug>`

**Purpose:** Run all quality checks before publishing

**Arguments:**
- `<slug>`: Review slug

**What it checks:**
- Structure: imports, productData, components
- Content: word count, sections, testimonials
- Quality: no apostrophes, no prices, no raw links
- Build: TypeScript compilation

**Use when:**
- Before committing changes
- After filling in content
- Want to verify quality

**Example:**
```bash
npm run review-validate oxo-good-grips-swivel-peeler
```

**Example output:**
```
🔍 Validating Review: oxo-good-grips-swivel-peeler
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 STRUCTURE CHECKS:
✅ Has AffiliateButton import
✅ Has productData object
✅ No raw affiliate links

📝 CONTENT CHECKS:
✅ Word count: 2,543 words (Quality Level 2 minimum met)
✅ Has 6 customer testimonials
✅ Has cost-per-use analysis
✅ Has 8 FAQ items with schema

🐛 QUALITY ISSUES:
✅ No unescaped apostrophes
✅ No specific prices
✅ All images have alt text

🔨 BUILD CHECKS:
✅ TypeScript compiles without errors
⚠️  Schema validation: Run manually

🎯 RESULTS:
Overall Grade: QUALITY LEVEL 2 ✅
Ready to publish: YES ✅
```

**Exit codes:**
- `0` = All checks passed
- `1` = Issues found

---

### `npm run testimonial-gen <slug> [product-name]`

**Purpose:** Generate testimonial templates

**Arguments:**
- `<slug>`: Review slug
- `[product-name]`: Optional full product name

**Output:**
- 8 testimonial templates (different types)
- Tips for finding real reviews
- Code template to copy

**Use when:**
- Need to write testimonials
- Want variety in testimonial types
- Looking for inspiration

**Example:**
```bash
npm run testimonial-gen oxo-good-grips-swivel-peeler "OXO Good Grips Swivel Peeler"
```

**Example output:**
```
🗣️  Testimonial Templates for: OXO Good Grips Swivel Peeler
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. LONGEVITY TESTIMONIAL:
   "We've had our [PRODUCT] for [X] years now..."
   — Amazon verified purchaser (J.D., October 2024)

2. VALUE TESTIMONIAL:
   "Was skeptical about the price, but..."
   — Amazon verified purchaser (M.K., September 2024)

...

💡 TIPS:
• Search Amazon for "[product] review" filtered by "Verified Purchase"
• Look for reviews mentioning longevity, value
• Focus on 3-5 star reviews (not just 5-star)
...

[Code template provided]
```

---

### `npm run specs-finder <slug>`

**Purpose:** Help gather product specifications

**Arguments:**
- `<slug>`: Review slug

**What it does:**
- Opens Amazon product page (if URL found in review)
- Opens Google search for specifications
- Provides specs template to fill in

**Use when:**
- Need to add specifications table
- Don't have product manual
- Want to research specs quickly

**Example:**
```bash
npm run specs-finder oxo-good-grips-swivel-peeler
```

**Example output:**
```
🔍 Specification Finder: oxo-good-grips-swivel-peeler
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Opening research pages...

✅ Amazon: https://www.amazon.com/...
✅ Google: https://www.google.com/search?q=...

📝 SPECIFICATIONS TEMPLATE

Copy this template and fill in from product pages:

TECHNICAL SPECIFICATIONS:
  Material: [e.g., Stainless steel blade]
  Type: [e.g., Swivel blade]
  ...

PHYSICAL DIMENSIONS:
  Length: [X inches]
  ...

🎯 NEXT STEPS:
1. Research specs from opened pages
2. Look for: manufacturer specs, Amazon details
3. Fill in template
4. Add to review
```

---

## 🔄 Typical Workflow

### For a Short Review (Under 1,500 words)

```bash
# 1. See what's wrong
npm run review-audit oxo-good-grips-swivel-peeler

# 2. Auto-fix mechanical issues
npm run review-fix oxo-good-grips-swivel-peeler

# 3. Generate testimonial ideas
npm run testimonial-gen oxo-good-grips-swivel-peeler

# 4. Research specs
npm run specs-finder oxo-good-grips-swivel-peeler

# 5. Open and edit review
code app/reviews/oxo-good-grips-swivel-peeler/page.tsx

# Search for "TODO" and fill in:
#  - productData (brand, model, pros, cons)
#  - 6-8 customer testimonials
#  - Cost-per-use calculations
#  - Performance metrics
#  - Specifications
#  - 2-3 competitors

# 6. Add 1,300+ more words of content

# 7. Validate before committing
npm run review-validate oxo-good-grips-swivel-peeler

# 8. If validation passes, commit
git add app/reviews/oxo-good-grips-swivel-peeler/page.tsx
git commit -m "Upgrade OXO peeler review to Quality Level 2 quality"
```

**Time:** 2.5-3 hours (vs. 4-5 hours without scripts)

---

### For a Long Review (3,500+ words)

```bash
# 1. Audit
npm run review-audit vitamix-5200

# 2. Auto-fix (adds missing sections)
npm run review-fix vitamix-5200

# 3. Helpers
npm run testimonial-gen vitamix-5200 "Vitamix 5200"
npm run specs-finder vitamix-5200

# 4. Edit and fill TODOs
code app/reviews/vitamix-5200/page.tsx

# 5. Validate
npm run review-validate vitamix-5200

# 6. Commit
git add app/reviews/vitamix-5200/page.tsx
git commit -m "Add Quality Level 2 components to Vitamix 5200 review"
```

**Time:** 2-2.5 hours (vs. 3-4 hours without scripts)

---

## 💡 Pro Tips

### 1. Use Batch Audit to Plan Your Week
```bash
npm run batch-audit > audit-report.txt
# Review the report to plan which reviews to tackle
```

### 2. Always Validate Before Committing
```bash
# Add to your git workflow
npm run review-validate <slug> && git commit
```

### 3. Search for TODOs
```bash
# After running review-fix, find all TODOs:
grep -n "TODO" app/reviews/oxo-good-grips-swivel-peeler/page.tsx
```

### 4. Batch Process Similar Products
```bash
# Fix all 3 Victorinox knives at once
npm run review-fix victorinox-fibrox-8-inch-chefs-knife
npm run review-fix victorinox-fibrox-10-inch-chefs-knife
npm run review-fix victorinox-offset-bread-knife

# Reuse testimonials/content across all 3
```

### 5. Check Progress
```bash
# See how many reviews are complete
npm run batch-audit | grep "COMPLETE"
```

---

## 🐛 Troubleshooting

### "Review not found"
- Check slug spelling
- List available reviews: `ls app/reviews/`
- Slug must match directory name

### "TypeScript compilation failed"
- Usually unescaped apostrophes
- Run: `npm run review-fix <slug>` again
- Or manually fix in the file

### Scripts not running
- Make sure you're in project root
- Check Node.js is installed: `node --version`
- Scripts require Node.js 14+

### Backup files accumulating
- Backups are named: `page.tsx.backup-YYYYMMDD`
- Safe to delete old backups after verifying changes
- Keep most recent backup until committed

---

## 📊 Time Savings

**Without scripts (manual):**
- Short review (expand + update): 4-5 hours
- Long review (structure update): 3-4 hours
- **Total for 27 reviews: 90-100 hours**

**With scripts (automated + manual):**
- Short review: 2.5-3 hours
- Long review: 2-2.5 hours
- **Total for 27 reviews: 60-70 hours**

**Savings: 30-35 hours** (33-35% reduction)

---

## 🎯 Success Metrics

After using these scripts on all 27 reviews:

- ✅ 100% have proper AffiliateButton tracking
- ✅ 100% have productData objects
- ✅ 100% have customer testimonials
- ✅ 100% have cost-per-use analysis
- ✅ 100% have performance metrics
- ✅ 100% have specifications tables
- ✅ 100% have competitor comparisons
- ✅ 0 unescaped apostrophes
- ✅ 0 raw affiliate links
- ✅ 0 specific prices

---

## 📝 Script Files

All scripts located in: `/scripts/review-tools/`

- `utils.js` - Shared utility functions
- `review-audit.js` - Audit a single review
- `review-fix.js` - Auto-fix mechanical issues
- `review-validate.js` - Quality validation
- `batch-audit.js` - Audit all reviews
- `testimonial-gen.js` - Generate testimonial templates
- `specs-finder.js` - Help find specifications

---

## 🚀 Next Steps

1. **Start with batch audit:**
   ```bash
   npm run batch-audit
   ```

2. **Pick first review from Week 1:**
   ```bash
   npm run review-audit oxo-good-grips-swivel-peeler
   npm run review-fix oxo-good-grips-swivel-peeler
   ```

3. **Follow REVIEW_UPDATE_STRATEGY.md** for detailed workflow

4. **Use REVIEW_QUICK_CHECKLIST.md** for quality checks

---

**Happy reviewing! 🔪**

For questions or issues, see: REVIEW_CREATION_GUIDE.md
