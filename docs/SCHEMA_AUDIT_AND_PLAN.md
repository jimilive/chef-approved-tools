# Schema Audit & Restructuring Plan

**Date:** October 14, 2025
**Purpose:** Fix recurring Google Rich Results issues by implementing proper schema structure per Google's best practices

---

## Executive Summary

**THE PROBLEM:**
We have schema bloat and structural issues causing recurring Google Rich Results errors. Every fix breaks something else because we're adding too many schema types and not nesting them properly.

**THE SOLUTION:**
Follow ChatGPT-5's recommendations: Use 2-6 focused schemas per page type, properly nest related schemas, and eliminate redundant markup.

**IMPACT:**
This is a complete schema refactor affecting **ALL pages**. We must proceed carefully to avoid breaking the entire site.

---

## Current State Audit

### What We Have Now (Per Page Type)

#### 1. Review Pages
**Example:** `/reviews/victorinox-fibrox-8-inch-chefs-knife`

**Current Schemas:**
1. **Root Layout (app/layout.tsx)** - Applied to ALL pages:
   - Organization schema (lines 271-274)
   - Website schema (lines 275-278)

2. **Review Page Specific:**
   - Product Review schema (generateProductReviewSchema)
   - Breadcrumb schema (generateBreadcrumbSchema)
   - FAQ microdata (embedded in HTML - lines 406-633)

**TOTAL: 5 schema items** (Organization + Website + ProductReview + Breadcrumb + FAQ)

**PROBLEMS:**
- ❌ Product Review schema creates a standalone `Review` with nested `Product`
- ❌ Should be: `Product` with nested `review`, `offers`, `aggregateRating`
- ❌ FAQ microdata may conflict with JSON-LD schemas
- ❌ Organization + Website on EVERY page is redundant

---

#### 2. Guide Pages
**Example:** `/guides/best-chef-knives`

**Current Schemas:**
1. **Root Layout:**
   - Organization schema
   - Website schema

2. **Guide Page Specific:**
   - ItemList schema (for knife comparison)
   - Breadcrumb schema

**TOTAL: 4 schema items**

**PROBLEMS:**
- ❌ Should be `Article` or `BlogPosting` for guide content
- ❌ ItemList is okay but missing primary content schema
- ❌ Organization + Website redundant

---

#### 3. Blog Pages
**Example:** `/blog/how-to-sear-steaks-like-restaurant-chef`

**Current Schemas:**
1. **Root Layout:**
   - Organization schema
   - Website schema

2. **Blog Page Specific:**
   - Article schema
   - Breadcrumb schema

**TOTAL: 4 schema items**

**PROBLEMS:**
- ✅ Article schema is correct for blog content
- ❌ Should consider HowTo schema for step-by-step content
- ❌ Organization + Website redundant

---

#### 4. Homepage
**Example:** `/`

**Current Schemas:**
1. **Root Layout:**
   - Organization schema
   - Website schema

2. **Homepage Specific:**
   - ItemList schema (from TopPicksComparison component)

**TOTAL: 3 schema items**

**PROBLEMS:**
- ✅ Website + Organization appropriate for homepage
- ✅ ItemList for top picks is good
- ⚠️ May want WebPage schema as well

---

## ChatGPT-5 Recommendations

### Optimal Schema Structure by Page Type

| Page Type | Core Schema | Supporting Schemas | Total | Current | Status |
|-----------|-------------|-------------------|-------|---------|--------|
| **Review Pages** | Product | offers (nested), review (nested), aggregateRating (nested), Breadcrumb, Organization | 3 blocks | 5 blocks | ❌ WRONG |
| **Guide Pages** | Article/BlogPosting | ItemList (nested), Breadcrumb, Organization | 3-4 blocks | 4 blocks | ⚠️ PARTIAL |
| **Blog/How-To** | Article or HowTo | Breadcrumb, Organization, ImageObject (nested) | 3-4 blocks | 4 blocks | ⚠️ PARTIAL |
| **Homepage** | WebSite | Organization, WebPage, ItemList | 3-4 blocks | 3 blocks | ✅ MOSTLY OK |

---

## The Restructuring Plan

### Phase 1: Update Schema Helper Functions (lib/schema.ts)

**Goal:** Create proper nesting structure in helper functions

#### 1.1 Create New `generateProductSchema()` Function
**Current:** `generateProductReviewSchema()` creates Review with nested Product
**New:** Create Product with nested review, offers, aggregateRating

```typescript
export function generateProductSchema(product: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": [product.images.primary],
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "url": product.affiliateUrl,
      "seller": {
        "@type": "Organization",
        "name": "Amazon"
      }
      // NO PRICE - we're affiliate site
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.expertRating,
      "bestRating": 5,
      "reviewCount": 1
    },
    "review": {
      "@type": "Review",
      "author": { ... },
      "datePublished": product.dateAdded,
      "reviewBody": product.expertOpinion,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": product.expertRating,
        "bestRating": 5
      }
    }
  }
}
```

#### 1.2 Update `generateArticleSchema()` for Guides
Add option to nest ItemList within Article

#### 1.3 Create `generateHowToSchema()` for Step-by-Step Content
For blog posts with steps

#### 1.4 Keep Existing Functions:
- `generateBreadcrumbSchema()` ✅
- `generateFAQSchema()` ✅ (convert microdata to JSON-LD)
- `organizationSchema` ✅
- `websiteSchema` ✅

---

### Phase 2: Remove Global Organization/Website from Layout

**Problem:** Organization + Website schemas appear on EVERY page (from app/layout.tsx)

**Solution:**
1. Remove from `app/layout.tsx` lines 271-278
2. Add Organization only to homepage
3. Add Website only to homepage
4. Other pages get Organization via @id reference

**Why:** Only homepage needs full Organization/Website. Other pages can reference them.

---

### Phase 3: Update Review Pages

**Files to update:** All files in `app/reviews/*/page.tsx`

**Current Structure:**
```typescript
<script>{generateProductReviewSchema(...)}</script>  // Review with nested Product
<script>{generateBreadcrumbSchema(...)}</script>
```

**New Structure:**
```typescript
<script>{generateProductSchema(...)}</script>  // Product with nested review, offers, rating
<script>{generateBreadcrumbSchema(...)}</script>
<script>{generateFAQSchema(...)}</script>  // Convert microdata to JSON-LD
```

**Total:** 3 blocks (Product, Breadcrumb, FAQ)

---

### Phase 4: Update Guide Pages

**Files to update:** All files in `app/guides/*/page.tsx`

**Current Structure:**
```typescript
<script>{generateItemListSchema(...)}</script>
<script>{generateBreadcrumbSchema(...)}</script>
```

**New Structure:**
```typescript
<script>{generateArticleSchema({..., itemList: [...]})}</script>  // Article with nested ItemList
<script>{generateBreadcrumbSchema(...)}</script>
```

**Total:** 2 blocks (Article with nested ItemList, Breadcrumb)

---

### Phase 5: Update Blog Pages

**Files to update:** All files in `app/blog/*/page.tsx`

**Decision Point:** Article vs HowTo?
- If step-by-step instructions: Use `generateHowToSchema()`
- If editorial content: Use `generateArticleSchema()`

**Structure:**
```typescript
<script>{generateHowToSchema(...) || generateArticleSchema(...)}</script>
<script>{generateBreadcrumbSchema(...)}</script>
```

**Total:** 2 blocks

---

### Phase 6: Update Homepage

**File:** `app/page.tsx` and `components/TopPicksComparison.tsx`

**Current:** Good structure, may just need Organization + Website added

**New Structure:**
```typescript
<script>{organizationSchema}</script>
<script>{websiteSchema}</script>
<script>{ItemList from TopPicksComparison}</script>
```

**Total:** 3 blocks

---

## Implementation Strategy

### CRITICAL: How to Avoid Breaking Everything

**DO NOT:**
- ❌ Change all pages at once
- ❌ Push without testing
- ❌ Skip validation

**DO:**
- ✅ Implement in phases (1 page type at a time)
- ✅ Test each change in Google Rich Results Test
- ✅ Validate on staging/local before production
- ✅ Create backup branch before starting
- ✅ Commit after each successful phase

### Recommended Order:

1. **Create backup branch:** `git checkout -b schema-refactor`
2. **Phase 1:** Update helper functions in `lib/schema.ts`
3. **Test locally:** Verify schemas generate correctly
4. **Phase 2:** Update ONE review page as proof of concept
5. **Validate:** Test in Google Rich Results validator
6. **If successful:** Apply to all review pages
7. **Phase 3:** Update guide pages (same process)
8. **Phase 4:** Update blog pages
9. **Phase 5:** Update homepage
10. **Final validation:** Test all page types
11. **Merge to main** only after complete validation

---

## Testing Checklist

Before pushing ANY changes:

### Per Page Type:
- [ ] Build locally (`npm run build`)
- [ ] View page source - verify schema output
- [ ] Copy JSON-LD to Google Rich Results Test
- [ ] Verify: No errors
- [ ] Verify: Expected rich results appear
- [ ] Verify: Schema count matches plan (2-6 items)

### Final Pre-Push:
- [ ] Test all 4 page types
- [ ] Lighthouse score check (ensure no regression)
- [ ] No console errors
- [ ] Schemas validate in Google tool

---

## Expected Outcomes

### Before:
- 4-6+ schema items per page
- Incorrect nesting (Review > Product instead of Product > review)
- Microdata + JSON-LD conflicts
- Recurring "unnamed item" errors
- Each fix breaks something else

### After:
- 2-4 schema items per page (focused, purposeful)
- Correct nesting (Product contains review, offers, rating)
- JSON-LD only (no microdata)
- Clean Rich Results validation
- Stable schema structure

---

## File Inventory

### Files to Modify:

**Schema Helpers:**
- `lib/schema.ts` - Add/update helper functions

**Review Pages (Priority 1):**
- `app/reviews/victorinox-fibrox-8-inch-chefs-knife/page.tsx`
- `app/reviews/victorinox-fibrox-10-inch-chefs-knife/page.tsx`
- `app/reviews/cuisinart-8-inch-nonstick-pan/page.tsx`
- `app/reviews/kitchenaid-kp26m1xlc-professional-600/page.tsx`
- `app/reviews/lodge-seasoned-cast-iron-3-skillet-bundle/page.tsx`
- `app/reviews/diamond-crystal-kosher-salt/page.tsx`
- ...all other review pages

**Guide Pages (Priority 2):**
- `app/guides/best-chef-knives/page.tsx`
- ...all other guide pages

**Blog Pages (Priority 3):**
- `app/blog/how-to-sear-steaks-like-restaurant-chef/page.tsx`
- `app/blog/best-scrambled-eggs/page.tsx`
- ...all other blog pages

**Homepage (Priority 4):**
- `app/page.tsx`
- `components/TopPicksComparison.tsx`

**Layout:**
- `app/layout.tsx` - Remove global Organization/Website schemas

---

## Risk Assessment

**HIGH RISK:**
- Changing all pages at once
- Not testing before pushing
- Skipping validation

**MEDIUM RISK:**
- Removing Organization/Website from layout (affects all pages)
- Changing schema helper function signatures

**LOW RISK:**
- Updating individual page schemas (if tested first)
- Converting microdata to JSON-LD

---

## Success Criteria

### We'll know it's working when:
1. ✅ Google Rich Results Test shows 0 errors
2. ✅ Each page type shows expected rich results
3. ✅ Schema count per page is 2-4 items
4. ✅ No "unnamed item" errors
5. ✅ Lighthouse scores maintained or improved
6. ✅ No recurring schema issues for 30 days

---

## Questions to Answer Before Starting

1. **Do we want to keep FAQ microdata or convert to JSON-LD?**
   - Recommendation: Convert to JSON-LD for consistency

2. **Should blog pages use Article or HowTo schema?**
   - Depends on content type (step-by-step vs editorial)

3. **Do we want to test on ONE page first or batch by type?**
   - Recommendation: ONE page first, then batch

4. **Should we create a staging environment?**
   - Recommendation: Use local build + Google validator

---

**Next Steps:**
1. Review this plan with user
2. Get approval to proceed
3. Create backup branch
4. Start with Phase 1 (update helper functions)
5. Test on ONE review page
6. Validate and iterate

**Estimated Time:** 2-3 hours if done carefully with testing
**Estimated Risk:** Medium (can be minimized with phased approach)
