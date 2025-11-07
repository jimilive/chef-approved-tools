# METADATA BATCH 3 - REMAINING WORK

**Date**: 2025-11-06
**Branch**: `feat/optimize-metadata-batch-1`
**Status**: Batch 1 & 2 committed, Batch 3 partially complete

---

## COMPLETED SO FAR

### Batch 1: Blog Posts (15 files) ✅ COMMITTED
- Commit: `486d4c3`
- All 15 high-priority blog posts from METADATA-FIXES-HANDOFF.md

### Batch 2: Review Pages (11 files) ✅ COMMITTED
- Commit: `dbf7611`
- All review pages optimized

### Batch 3a: Additional Blog Posts (5 files) ✅ COMMITTED

**Commit:** `8f17546`

**Files completed:**
1. ✅ app/blog/bread-science-gluten-development/page.tsx
2. ✅ app/blog/cheese-sauce-mac-and-cheese/page.tsx
3. ✅ app/blog/cooking-with-tomatoes-fresh-vs-canned/page.tsx
4. ✅ app/blog/deglazing-pan-sauces/page.tsx
5. ✅ app/blog/hotel-pan-system-restaurant-organization-home/page.tsx

---

## WHAT TO DO NEXT

### Option 1: Commit the 5 files above
```bash
git add app/blog/bread-science-gluten-development/page.tsx
git add app/blog/cheese-sauce-mac-and-cheese/page.tsx
git add app/blog/cooking-with-tomatoes-fresh-vs-canned/page.tsx
git add app/blog/deglazing-pan-sauces/page.tsx
git add app/blog/hotel-pan-system-restaurant-organization-home/page.tsx

git commit -m "feat: optimize metadata for 5 additional blog posts

Shortened titles by removing suffixes and simplifying phrases.
Part of Batch 3 - continued metadata optimization.

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"
```

### Option 2: Discard the 5 edits and start Batch 3 fresh
```bash
git checkout app/blog/bread-science-gluten-development/page.tsx
git checkout app/blog/cheese-sauce-mac-and-cheese/page.tsx
git checkout app/blog/cooking-with-tomatoes-fresh-vs-canned/page.tsx
git checkout app/blog/deglazing-pan-sauces/page.tsx
git checkout app/blog/hotel-pan-system-restaurant-organization-home/page.tsx
```

---

## REMAINING WORK (17 files from seo-optimization-recommendations.md)

All changes below are from `/seo-optimization-recommendations.md` lines 82-209.

### 1. app/blog/how-to-choose-first-chef-knife/page.tsx
**Current:**
```typescript
title: "How to Choose Your First Chef Knife (Like a Professional Chef)"
```
**Change to:**
```typescript
title: "How to Choose Your First Chef Knife (Like a Pro)"
```

### 2. app/blog/how-to-cook-perfect-pasta/page.tsx
**Current:**
```typescript
title: "How to Cook Perfect Pasta: Professional Technique | Chef Approved Tools"
```
**Change to:**
```typescript
title: "How to Cook Perfect Pasta: Professional Technique"
```

### 3. app/blog/how-to-make-perfect-risotto/page.tsx
**Current:**
```typescript
title: "How to Make Perfect Risotto: Technique, Timing, and Science | Chef Approved Tools"
```
**Change to:**
```typescript
title: "How to Make Perfect Risotto: Technique, Timing & Science"
```

### 4. app/blog/how-to-preheat-a-pan/page.tsx
**Current:**
```typescript
title: "How to Preheat a Pan: Temperature Matters More Than You Think"
```
**Change to:**
```typescript
title: "How to Preheat a Pan: Temperature Matters More"
```

### 5. app/blog/kitchen-starter-kit-first-5-tools/page.tsx
**Current:**
```typescript
title: "Kitchen Starter Kit: First 5 Tools to Buy | Chef Scott Bradley"
```
**Change to:**
```typescript
title: "Kitchen Starter Kit: First 5 Tools to Buy"
```

### 6. app/blog/kitchen-thermometer-guide/page.tsx
**Current:**
```typescript
title: "Kitchen Thermometer Guide: Instant Read (and Why Every Chef Trusts One)"
```
**Change to:**
```typescript
title: "Kitchen Thermometer Guide: Instant Read & Why Chefs Trust It"
```

### 7. app/blog/kitchen-thermometers-guide/page.tsx
**Current:**
```typescript
title: "The Complete Guide to Kitchen Thermometers | Chef Approved Tools"
```
**Change to:**
```typescript
title: "Complete Guide to Kitchen Thermometers"
```

### 8. app/blog/knife-safety-protect-fingers/page.tsx
**Current:**
```typescript
title: "Knife Safety: How to Protect Your Fingers Like a Professional Chef"
```
**Change to:**
```typescript
title: "Knife Safety: How to Protect Your Fingers Like a Pro"
```

### 9. app/blog/knife-safety-rules-professional-kitchens/page.tsx
**Current:**
```typescript
title: "Knife Safety: 10 Rules From 24 Years in Professional Kitchens"
```
**Change to:**
```typescript
title: "Knife Safety: 10 Rules From 24 Years in Pro Kitchens"
```

### 10. app/blog/oxidization-effect-on-food/page.tsx
**Current:**
```typescript
title: "Food Oxidation Guide - Stop Browning & Preserve Freshness | Chef Approved Tools"
```
**Change to:**
```typescript
title: "Food Oxidation Guide: Stop Browning & Preserve Freshness"
```
**Note:** Change "-" to ":"

### 11. app/blog/stock-vs-broth-vs-bouillon/page.tsx
**Current:**
```typescript
title: "Stock vs Broth vs Bouillon: Differences & When to Use Each | Chef Approved Tools"
```
**Change to:**
```typescript
title: "Stock vs Broth vs Bouillon: Differences & When to Use"
```

### 12. app/blog/understanding-cooking-fats/page.tsx
**Current:**
```typescript
title: "Understanding Cooking Fats: Butter vs Oil vs Lard | Chef Approved Tools"
```
**Change to:**
```typescript
title: "Understanding Cooking Fats: Butter vs Oil vs Lard"
```

### 13. app/blog/vegetable-roasting-guide/page.tsx
**Current:**
```typescript
title: "Vegetable Roasting Guide: Times and Temperatures | Chef Approved Tools"
```
**Change to:**
```typescript
title: "Vegetable Roasting Guide: Times and Temperatures"
```

### 14. app/blog/what-is-emulsification/page.tsx
**Current:**
```typescript
title: "What is Emulsification? The Science Behind Creamy Sauces | Chef Approved Tools"
```
**Change to:**
```typescript
title: "What is Emulsification? Science Behind Creamy Sauces"
```

### 15. app/blog/why-children-hate-broccoli/page.tsx
**Current:**
```typescript
title: "Why Kids Hate Broccoli - Science & Solutions | Chef Approved Tools"
```
**Change to:**
```typescript
title: "Why Kids Hate Broccoli: Science & Solutions"
```
**Note:** Change "-" to ":"

### 16. app/chef-approved/page.tsx
**Current:**
```typescript
title: "Chef Approved Tools: What It Means | Professional Kitchen Equipment Reviews"
```
**Change to:**
```typescript
title: "Chef Approved: What It Means | Pro Kitchen Reviews"
```

---

## COMMIT STRATEGY

After completing all 17 files above:

```bash
git add app/blog/how-to-choose-first-chef-knife/page.tsx
git add app/blog/how-to-cook-perfect-pasta/page.tsx
git add app/blog/how-to-make-perfect-risotto/page.tsx
git add app/blog/how-to-preheat-a-pan/page.tsx
git add app/blog/kitchen-starter-kit-first-5-tools/page.tsx
git add app/blog/kitchen-thermometer-guide/page.tsx
git add app/blog/kitchen-thermometers-guide/page.tsx
git add app/blog/knife-safety-protect-fingers/page.tsx
git add app/blog/knife-safety-rules-professional-kitchens/page.tsx
git add app/blog/oxidization-effect-on-food/page.tsx
git add app/blog/stock-vs-broth-vs-bouillon/page.tsx
git add app/blog/understanding-cooking-fats/page.tsx
git add app/blog/vegetable-roasting-guide/page.tsx
git add app/blog/what-is-emulsification/page.tsx
git add app/blog/why-children-hate-broccoli/page.tsx
git add app/chef-approved/page.tsx

git commit -m "feat: complete Batch 3 metadata optimization

Optimized remaining 17 blog posts and category pages.
Removed suffixes, shortened phrases to meet 60-char limit.

Batch 3 complete - all title optimizations finished.

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## TESTING BEFORE PUSH

```bash
# Build to ensure no TypeScript errors
npm run build

# If build succeeds, push
git push origin feat/optimize-metadata-batch-1
```

---

## SUMMARY

**Total Work:**
- Batch 1: 15 files ✅ committed
- Batch 2: 11 files ✅ committed
- Batch 3a: 5 files ✅ edited (not committed)
- Batch 3b: 17 files ⏳ remaining

**Grand Total:** 48 pages to optimize (31 done, 17 remaining)

**All changes from:** `/seo-optimization-recommendations.md`

---

**Next session: Complete the 17 remaining files above, commit, test build, and push!**
