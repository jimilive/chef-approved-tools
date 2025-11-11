# Migration Processes Guide

**Last Updated:** November 10, 2025  
**Purpose:** How to migrate old content to new component system  
**For:** Updating legacy pages to current standards

---

## 📚 PREREQUISITES

**Before migrating anything, read:**
1. **START_HERE.md** - Protection rules and red flags
2. **VOICE_AND_CREDENTIALS.md** - Credentials, voice, tier system
3. **COMPONENT_INTERFACES.md** - Exact TypeScript interfaces
4. **CONTENT_STANDARDS.md** - Current page structure standards

---

## 🎯 Quick Navigation

**Jump to:**
- [When to Migrate](#when-to-migrate)
- [Migration Type 1: Review Pages](#migration-type-1-review-pages)
- [Migration Type 2: Blog Posts](#migration-type-2-blog-posts)
- [Migration Type 3: Component Updates](#migration-type-3-component-updates)
- [Quality Assurance](#quality-assurance)
- [Rollback Procedures](#rollback-procedures)

---

# When to Migrate

## Review Pages Need Migration When:

### ✅ Critical (Do First)
- [ ] Page doesn't use component system (data mixed with presentation)
- [ ] Missing comparison table (and product has clear competitors)
- [ ] Using outdated tier system
- [ ] Credentials incorrect (wrong years, wrong restaurants)
- [ ] Accessibility issues (wrong colors, heading hierarchy broken)
- [ ] Missing required components (AuthorBio, dates, etc.)

### ⚠️ Important (Do Soon)
- [ ] Content uses forbidden phrases ("let's dive in", "game-changer")
- [ ] Pricing violations (specific prices mentioned)
- [ ] Wrong CTA text (not "Check Price on Amazon")
- [ ] Poor SEO (title/meta not optimized)
- [ ] Missing FAQ section or inadequate FAQs

### 💡 Nice to Have (Do Eventually)
- [ ] Content could be more specific with testing details
- [ ] Could benefit from more professional anecdotes
- [ ] Voice could be stronger (more Scott, less generic)

---

## Blog Posts Need Migration When:

### ✅ Critical
- [ ] Wrong pattern (X vs Y using Pattern B, or vice versa)
- [ ] Not using component system
- [ ] Credentials incorrect
- [ ] Voice doesn't match guidelines

### ⚠️ Important
- [ ] Missing internal links (should have 3-5)
- [ ] No email capture section
- [ ] Missing author bio
- [ ] SEO not optimized

---

## Components Need Update When:

### ✅ Critical
- [ ] Security vulnerability discovered
- [ ] Breaking accessibility issue
- [ ] Major bug affecting functionality

### ⚠️ Important
- [ ] Performance improvement available
- [ ] Better UX pattern identified
- [ ] New prop needed for additional use cases

---

# Migration Type 1: Review Pages

## Overview

**Goal:** Move from old inline content to component-based system with separate data file.

**Time Required:** 2-4 hours per review (depending on complexity)

**Risk Level:** Medium (test thoroughly)

---

## Step 1: Assessment (15 minutes)

### Review Current Page

**Questions to answer:**
1. Does it use component system? (Check for `ReviewHero`, `TestingResultsGrid`, etc.)
2. Is data in separate file or inline?
3. What tier is it currently? (Does it need tier system update?)
4. Does it have comparison table?
5. Are credentials correct?
6. Are colors accessible? (orange-700 for links, amber-700 for stars)

**Create assessment notes:**
```markdown
# [Product Name] Migration Assessment

**Current state:**
- Uses components: NO (inline content)
- Separate data file: NO
- Current tier: Not specified
- Has comparison table: NO
- Credentials: Wrong (says "20 years")
- Colors: Wrong (using orange-600)
- Forbidden phrases: YES ("let's dive in" in intro)

**Priority:** HIGH (multiple critical issues)

**Estimated time:** 3 hours
```

---

## Step 2: Create Data File (60-90 minutes)

### File Location

```
/app/reviews/[product-slug]/data.ts
```

### Data Structure

**Use COMPONENT_INTERFACES.md as reference.** Here's the complete structure:

```typescript
/**
 * [Product Name] Review Data
 * Last Updated: November 10, 2025
 * Tier: [1/2/3]
 * Testing Period: [X years/months]
 */

import { Product } from '@/types/product'

// ============================================================================
// PRODUCT DATA (from Supabase)
// ============================================================================

export const productData: Product = {
  slug: 'product-slug',
  name: 'Full Product Name',
  brand: 'Brand Name',
  category: 'Category',
  rating: 5, // or 4.5, 4, etc.
  tier: 1, // or 2 or 3
  testingPeriod: '6 years professional use at Purple Café',
  // ... other Supabase fields
}

// ============================================================================
// REVIEW HERO
// ============================================================================

export const reviewHero = {
  title: `${productData.name} Review`,
  authorName: 'Scott Bradley',
  authorCredentials: 'Professional Chef | 24 Years Experience',
  rating: productData.rating,
  tierBadge: {
    icon: '🏆', // or 🏡 for Tier 2, 🎓 for Tier 3
    text: 'Tier 1: Professional Kitchen Testing | 24 Years Experience',
    linkText: 'What does Tier 1 mean?',
    linkHref: '/review-tiers',
  },
  verdict: `After 6 years using the ${productData.name} at Purple Café—making 30-50 smoothies per shift through Seattle's busiest dinner services—I can tell you exactly what makes this blender worth $450.`,
  verdictStrong: 'It never failed. Not once.',
  // NO quickStats, perfectFor, considerAlternatives (those are in other components)
}

// ============================================================================
// TESTING RESULTS
// ============================================================================

export const testingResults = {
  title: 'Testing Results',
  sections: [
    {
      title: 'Professional Use Context',
      content: `Tested extensively in high-volume restaurant setting at Purple Café (2007-2012). Made 30-50 smoothies per shift, pureed hot soups, ground nuts, processed frozen ingredients. Dishwasher cycles: 1,000+. No maintenance required.`,
    },
  ],
  testingEnvironment: [ // MUST be array, not null
    {
      label: 'Location',
      value: 'Purple Café, Seattle, WA',
    },
    {
      label: 'Duration',
      value: '6 years (2007-2012)',
    },
    {
      label: 'Volume',
      value: '30-50 smoothies per shift',
    },
    {
      label: 'Conditions',
      value: 'High-volume dinner service',
    },
  ],
  outstandingPerformance: [
    'Zero motor failures after 6 years',
    'Self-cleaning feature actually works',
    'Handles frozen ingredients without struggle',
    'Variable speed control precise',
  ],
  minorConsiderations: [
    'Very loud operation',
    'Large footprint (20.5" tall)',
    'Premium price point',
  ],
}

// ============================================================================
// PERFORMANCE ANALYSIS
// ============================================================================

export const performanceAnalysis = {
  title: 'Performance Analysis',
  sections: [
    {
      title: 'Power and Blending Performance',
      content: `The 2 HP motor is not marketing hype. At Purple Café, we threw everything at this blender: frozen strawberries straight from the freezer, whole ice cubes, raw almonds for almond milk, kale stems, frozen bananas. The motor never struggled. Never slowed down. Never overheated.

Professional context matters here: when you're making 30-50 smoothies in a 3-hour shift, you need a motor that doesn't quit halfway through service. The Vitamix never did.`,
    },
    {
      title: 'Durability and Build Quality',
      content: `After 6 years of daily professional use including 1,000+ dishwasher cycles, the container shows no cracks, no cloudiness, no degradation. The blade assembly is still tight. The base still looks almost new.

This is what separates professional equipment from consumer equipment. Consumer blenders would have failed after 6 months of this abuse.`,
    },
    // Add more sections as needed
  ],
}

// ============================================================================
// PROS & CONS
// ============================================================================

export const prosData = [
  {
    title: 'Professional-Grade Motor',
    description: '2.0 HP peak motor powered through 6 years at Purple Café, blending 30-50 smoothies per shift without failure. Handles frozen ingredients, hot soups, nut butters—no struggle, no slowdown.',
  },
  {
    title: 'Self-Cleaning Actually Works',
    description: 'Drop of soap, cup of water, 60 seconds on high. Clean. Saved 5 minutes per shift at Purple Café. After 1,000+ cleaning cycles, it still works perfectly.',
  },
  {
    title: 'Proven Durability',
    description: '6 years professional use, zero maintenance, zero failures. Same blender still running at Purple Café years after I left. Expect 15-20 years of home use based on significantly lighter workload.',
  },
  // Add 4-7 total pros
]

export const consData = [
  {
    title: 'Very Loud Operation',
    description: 'Loud enough that we couldn't run it during quiet morning prep at Purple Café without disturbing the dining room. If you blend at 6am while your family sleeps, this will wake them up.',
  },
  {
    title: 'Large Footprint',
    description: '20.5" tall means it won't fit under most kitchen cabinets. Needs dedicated counter space or storage. The 64oz container is bulky.',
  },
  {
    title: 'Premium Price Point',
    description: 'Around $450 is a significant investment. Budget blenders cost $50-100. The durability and performance justify it for daily users, but occasional blenders should consider cheaper alternatives.',
  },
  // Add 3-5 total cons (every product has drawbacks)
]

// ============================================================================
// WHO SHOULD BUY
// ============================================================================

export const whoShouldBuy = {
  title: 'Who Should Buy This',
  perfectForTitle: 'Perfect For:',
  considerAlternativesTitle: 'Consider Alternatives If:',
  perfectFor: [
    'Daily smoothie makers who want restaurant-quality results and 15+ year durability',
    'Home cooks who make hot soups, nut butters, or process frozen ingredients regularly',
    'Anyone who values professional-grade equipment and doesn't mind the upfront investment',
  ],
  considerAlternatives: [
    'You blend occasionally (few times per month) - the premium price isn't justified for light use',
    'You need a compact blender - this is 20.5" tall and won't fit under cabinets',
    'You blend early mornings in apartments - noise level is significant and will disturb neighbors',
  ],
}

// ============================================================================
// FAQ
// ============================================================================

export const faqData = [
  {
    question: 'How long does the Vitamix 5200 last?',
    answer: `I used mine for 6 years in a professional kitchen making 30-50 smoothies per shift. It never failed. Based on restaurant use vs home use, expect 15-20 years minimum with normal home use. Vitamix has customers using 40+ year old blenders.`,
  },
  {
    question: 'Is the Vitamix 5200 really worth the price?',
    answer: `After 6 years at Purple Café, yes—if you use it daily. The durability and performance justify the premium for serious users. If you blend a few times per month, buy the Ninja. If you blend daily and want it to last decades, buy the Vitamix.`,
  },
  // Add 8-12 FAQs total
]

// ============================================================================
// EMAIL CAPTURE
// ============================================================================

export const emailCapture = {
  title: 'Get My Free Professional Kitchen Tools Guide',
  subtitle: 'Download my guide to the 11 tools I use most after 24 years in professional kitchens. Learn which tools are worth the investment and which are marketing hype.',
  inputPlaceholder: 'Enter your email',
  buttonText: 'Get Free Guide',
  finePrint: 'Join 10,000+ home cooks. Unsubscribe anytime.',
}

// ============================================================================
// BOTTOM LINE
// ============================================================================

export const bottomLine = {
  title: 'The Bottom Line',
  paragraphs: [
    `After 6 years at Purple Café making thousands of smoothies, the Vitamix 5200 proved what professional-grade means: zero failures, zero maintenance, zero compromises. It's loud, it's expensive, and it takes up counter space. But if you blend daily and want equipment that lasts decades, it's the right choice.`,
    
    `Buy it if you want restaurant results and 15+ year durability. Skip it if you blend occasionally or need something compact. The premium price only makes sense for daily users who value longevity over initial cost.`,
  ],
  // NO ctaUrl or ctaText here - those go in customCTA if needed
}

// ============================================================================
// RELATED PRODUCTS (slugs only, fetched from Supabase)
// ============================================================================

export const relatedProductSlugs = [
  'blendtec-designer-725',
  'ninja-professional-plus',
  'kitchenaid-k400-blender',
]
```

### Critical Data File Rules

**From COMPONENT_INTERFACES.md:**

1. **testingEnvironment MUST be array** (not null)
   ```typescript
   testingEnvironment: []  // ✅ Correct
   testingEnvironment: null  // ❌ Wrong
   ```

2. **NO extra props on components**
   - ReviewHero: No quickStats, perfectFor, heroFeatures
   - EmailCapture: No benefits array (put in subtitle)
   - BottomLine: No subtitle, finalRating, ctaHeadline
   - RelatedProducts: Use name/href not title/link

3. **Paragraphs are strings, not JSX**
   ```typescript
   paragraphs: [`Text here`, `More text`]  // ✅ Correct
   paragraphs: [<>Text</>, <>More</>]  // ❌ Wrong
   ```

4. **NO pricing content**
   ```typescript
   // ❌ NEVER:
   "costs around $50"
   "best value in its price range"
   "cheaper than competitors"
   
   // ✅ ALWAYS:
   "lasted 6 years of professional use"
   "professional-grade durability"
   "expect 15-20 years of home use"
   ```

---

## Step 3: Update Page File (30-45 minutes)

### Replace Inline Content with Components

**File:** `/app/reviews/[product-slug]/page.tsx`

**Before (inline content - bad):**
```tsx
export default function ReviewPage() {
  return (
    <div>
      <h1>Vitamix 5200 Review</h1>
      <p>After years of testing...</p>
      <h2>Performance</h2>
      <p>The motor is powerful...</p>
      {/* 900 lines of inline content */}
    </div>
  )
}
```

**After (component-based - good):**
```tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Components
import ReviewHero from '@/components/review/ReviewHero'
import TestingResultsGrid from '@/components/review/TestingResultsGrid'
import PerformanceAnalysis from '@/components/review/PerformanceAnalysis'
import ProsConsGrid from '@/components/review/ProsConsGrid'
import WhoShouldBuyGrid from '@/components/review/WhoShouldBuyGrid'
import FAQSection from '@/components/review/FAQSection'
import EmailCaptureSection from '@/components/review/EmailCaptureSection'
import BottomLineSection from '@/components/review/BottomLineSection'
import RelatedProductsGrid from '@/components/review/RelatedProductsGrid'
import AuthorBio from '@/components/AuthorBio'
import ProductViewTrackerWrapper from '@/components/tracking/ProductViewTrackerWrapper'
import Breadcrumb from '@/components/Breadcrumb'
import CTAVisibilityTracker from '@/components/tracking/CTAVisibilityTracker'
import ProductComparisonTable from '@/components/comparison/ProductComparisonTable'

// Data and utilities
import { getProductBySlug, getProductsBySlugs, getPrimaryAffiliateLink } from '@/lib/supabase'
import { generateProductSchema } from '@/lib/schema'
import * as reviewData from './data'
import { blenderComparisonData } from './blender-comparison-data' // if comparison table

// ISR Configuration
export const revalidate = 3600 // 1 hour
export const fetchCache = 'force-cache'

// Metadata
export async function generateMetadata(): Promise<Metadata> {
  const product = await getProductBySlug(reviewData.productData.slug)
  
  return {
    title: `${product.name} Review: ${product.testingPeriod} | Chef Approved Tools`,
    description: `Professional chef reviews ${product.name}. ${product.tier === 1 ? 'Used professionally' : product.tier === 2 ? 'Long-term home testing' : 'Expert evaluation'}. Honest pros/cons after ${product.testingPeriod}.`,
    alternates: {
      canonical: `https://chefapprovedtools.com/reviews/${product.slug}`,
    },
  }
}

// Page Component
export default async function VitamixReviewPage() {
  // Fetch product data
  const product = await getProductBySlug(reviewData.productData.slug)
  if (!product) notFound()
  
  const affiliateUrl = getPrimaryAffiliateLink(product)
  const relatedProducts = await getProductsBySlugs(reviewData.relatedProductSlugs)
  
  // Generate schema
  const productSchema = generateProductSchema({
    name: product.name,
    slug: product.slug,
    description: reviewData.reviewHero.verdict,
    brand: product.brand,
    rating: product.rating,
    reviewCount: 1,
    category: product.category,
    dateAdded: product.dateAdded,
    lastUpdated: product.lastUpdated,
  })
  
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Reviews', href: '/reviews' },
    { label: product.name, href: `/reviews/${product.slug}` },
  ]

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      
      {/* Tracking */}
      <ProductViewTrackerWrapper slug={product.slug} />
      
      {/* Breadcrumbs */}
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Dates */}
      <div className="text-sm text-slate-600 mb-2">
        <time dateTime={product.dateAdded}>Published: {formatDate(product.dateAdded)}</time>
        {' • '}
        <time dateTime={product.lastUpdated}>Updated: {formatDate(product.lastUpdated)}</time>
      </div>
      
      {/* COMPONENT 1: Hero */}
      <ReviewHero
        {...reviewData.reviewHero}
        customCTA={
          <CTAVisibilityTracker
            ctaId="hero-cta"
            position="above_fold"
            productSlug={product.slug}
          >
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95"
            >
              Check Price on Amazon →
            </a>
          </CTAVisibilityTracker>
        }
      />
      
      {/* CTA Tracking */}
      <CTAVisibilityTracker
        ctaId="where-to-buy-cta"
        position="where_to_buy"
        productSlug={product.slug}
      >
        <div>{/* Where to buy section */}</div>
      </CTAVisibilityTracker>
      
      {/* COMPONENT 2: Testing Results */}
      <TestingResultsGrid
        title={reviewData.testingResults.title}
        sections={reviewData.testingResults.sections}
        testingEnvironment={reviewData.testingResults.testingEnvironment}
        outstandingPerformance={reviewData.testingResults.outstandingPerformance}
        minorConsiderations={reviewData.testingResults.minorConsiderations}
      />
      
      {/* COMPONENT 3: Performance Analysis */}
      <PerformanceAnalysis
        title={reviewData.performanceAnalysis.title}
        sections={reviewData.performanceAnalysis.sections}
      />
      
      {/* COMPONENT 4: Comparison Table (if applicable) */}
      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6">
          How Does the {product.name} Compare?
        </h2>
        <p className="text-lg text-slate-600 mb-8">
          After 6 years at Purple Café, I've tested every major blender brand in 
          professional settings. Here's how the {product.name} stacks up.
        </p>
        <ProductComparisonTable
          products={blenderComparisonData.products}
          highlightedProduct={blenderComparisonData.highlightedProduct}
        />
      </section>
      
      {/* COMPONENT 5: Pros & Cons */}
      <ProsConsGrid
        title="Honest Assessment"
        pros={reviewData.prosData}
        cons={reviewData.consData}
      />
      
      {/* COMPONENT 6: Who Should Buy */}
      <WhoShouldBuyGrid
        title={reviewData.whoShouldBuy.title}
        perfectForTitle={reviewData.whoShouldBuy.perfectForTitle}
        considerAlternativesTitle={reviewData.whoShouldBuy.considerAlternativesTitle}
        perfectFor={reviewData.whoShouldBuy.perfectFor}
        considerAlternatives={reviewData.whoShouldBuy.considerAlternatives}
      />
      
      {/* COMPONENT 7: FAQ */}
      <FAQSection
        title="Frequently Asked Questions"
        faqs={reviewData.faqData}
      />
      
      {/* COMPONENT 8: Email Capture */}
      <EmailCaptureSection
        title={reviewData.emailCapture.title}
        subtitle={reviewData.emailCapture.subtitle}
        inputPlaceholder={reviewData.emailCapture.inputPlaceholder}
        buttonText={reviewData.emailCapture.buttonText}
        finePrint={reviewData.emailCapture.finePrint}
      />
      
      {/* COMPONENT 9: Bottom Line */}
      <BottomLineSection
        title={reviewData.bottomLine.title}
        paragraphs={reviewData.bottomLine.paragraphs}
        customCTA={
          <CTAVisibilityTracker
            ctaId="final-cta"
            position="final_cta"
            productSlug={product.slug}
          >
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95"
            >
              Check Price on Amazon →
            </a>
          </CTAVisibilityTracker>
        }
      />
      
      {/* COMPONENT 10: Related Products */}
      <RelatedProductsGrid
        title="Related Products"
        products={relatedProducts.map(p => ({
          emoji: '🔪', // Choose relevant emoji
          name: p.name,
          description: p.description,
          href: `/reviews/${p.slug}`,
        }))}
      />
      
      {/* COMPONENT 11: Author Bio */}
      <AuthorBio />
    </>
  )
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}
```

**Key points:**
- Components in exact order (see REVIEW_SYSTEM.md)
- ISR caching configuration (not force-dynamic)
- Proper error handling (notFound if product missing)
- Schema markup included
- All tracking components included
- Comparison table if applicable

---

## Step 4: Add Comparison Table (if applicable) (3 hours)

**See COMPARISON_TABLE_GUIDE.md for complete instructions.**

**Quick checklist:**
- [ ] Product has 3-4 clear direct competitors
- [ ] Research completed (3 hours)
- [ ] Comparison data file created
- [ ] Component integrated
- [ ] Tested locally

---

## Step 5: Update Content for Voice (30-60 minutes)

### Voice Issues to Fix

**❌ Remove forbidden phrases:**
- "Let's dive in"
- "Without further ado"
- "Game-changer" / "Revolutionary" / "Amazing"
- "Many chefs agree" / "Experts recommend"

**❌ Remove pricing violations:**
- "Costs around $50"
- "Best value"
- "Budget-friendly option"
- Price comparisons

**✅ Add specific professional context:**
```typescript
// ❌ BEFORE (generic):
"This blender is very powerful and durable."

// ✅ AFTER (specific, professional):
"After 6 years at Purple Café making 30-50 smoothies per shift, the 2.0 HP motor never struggled with frozen strawberries or whole ice cubes. Zero failures across thousands of blends."
```

**✅ Use correct credentials:**
- "24 years of professional kitchen experience" (not 20, not 25)
- "6 years at Purple Café" (not 18)
- "4 years as Kitchen Manager" (not 24)

---

## Step 6: Test Migration (30 minutes)

### Local Testing Checklist

```bash
npm run dev
```

**Navigate to review page and verify:**

**Visual:**
- [ ] All components render correctly
- [ ] Images load properly
- [ ] No layout shift
- [ ] Mobile responsive (test at 375px)
- [ ] Colors correct (orange-700 links, amber-700 stars)
- [ ] Heading hierarchy correct (h1 → h2 → h3)

**Functionality:**
- [ ] All affiliate links work
- [ ] Breadcrumbs work
- [ ] Related products links work
- [ ] Email capture form works
- [ ] No console errors
- [ ] No React warnings

**Content:**
- [ ] Credentials correct
- [ ] Voice matches guidelines
- [ ] No forbidden phrases
- [ ] No pricing violations
- [ ] Professional context included

**Technical:**
```bash
npm run build  # Must succeed
npm run type-check  # Must pass
```

**Lighthouse:**
- [ ] Desktop: 100 (all metrics)
- [ ] Mobile: 80+ Performance
- [ ] LCP <2.5s

---

## Step 7: Deploy Migration (10 minutes)

### Commit Changes

```bash
git add app/reviews/[product-slug]/
git commit -m "Migrate [Product Name] to component system

Changes:
- Created data.ts file with all review content
- Updated page.tsx to use components
- Added comparison table (if applicable)
- Fixed credentials (24 years, 6 years Purple Café)
- Removed forbidden phrases
- Fixed accessibility (orange-700 links, amber-700 stars)
- Added missing components (AuthorBio, dates, etc.)

Testing:
- Build succeeds
- Lighthouse: Desktop 100, Mobile 85
- All links work
- Mobile responsive verified"

git push origin main
```

### Verify Deployment

**After Vercel deploys:**
- [ ] Visit live page
- [ ] Test on real mobile device
- [ ] Click affiliate links (verify Amazon tag)
- [ ] Check GTM tracking (if configured)
- [ ] No console errors
- [ ] Lighthouse score maintained

---

## Step 8: Document Migration (5 minutes)

### Migration Log

Keep a log of completed migrations:

```markdown
# Review Page Migrations Log

## Completed

### November 10, 2025
- **Vitamix 5200** - Full migration, added comparison table, 3 hours
- **Lodge Cast Iron** - Full migration, 2.5 hours
- **Le Creuset Dutch Oven** - Full migration, added comparison table, 3.5 hours

## In Progress

### November 11, 2025
- **KitchenAid Stand Mixer** - Data file created, need comparison research

## Priority Queue (High → Low)

1. Victorinox Chef's Knife (high traffic, missing comparison)
2. Benriner Mandoline (high traffic, wrong tier)
3. All-Clad D3 (medium traffic, pricing violations)
```

---

# Migration Type 2: Blog Posts

## Overview

**Goal:** Migrate blog posts to Pattern A (X vs Y) or Pattern B (Educational) component system.

**Time Required:** 1-3 hours per post

**Risk Level:** Low-Medium

---

## Step 1: Determine Pattern Type (5 minutes)

### Decision Tree

```
Is this blog post comparing EXACTLY TWO specific products?
(e.g., "KitchenAid vs Cuisinart Stand Mixers")

├─ YES → Pattern A (X vs Y Comparison)
│         - Data-driven with comparison components
│         - ComparisonSummary, ComparisonTable, DetailedAnalysis
│
└─ NO → Pattern B (Educational Content)
          - Component-based with inline content
          - BlogLayout, BlogHero, inline sections, BlogEmailCapture
```

**Examples:**

**Pattern A (X vs Y):**
- "Vitamix vs Blendtec: Which is Better?"
- "KitchenAid Artisan vs Cuisinart SM-50"
- "Lodge vs Le Creuset Dutch Ovens"

**Pattern B (Educational):**
- "How to Sharpen Kitchen Knives"
- "5 Best Chef's Knives Under $100"
- "What to Look for in a Stand Mixer"
- "Cast Iron vs Stainless Steel: When to Use Each"

---

## Step 2: Pattern A Migration (X vs Y)

**See CONTENT_STANDARDS.md - Part 3: Blog System - Pattern A**

**Quick steps:**
1. Create `/data/blog/[slug].ts` data file
2. Structure comparison data (productA, productB, comparisonTable, sections)
3. Update blog post to use comparison components
4. Test locally
5. Deploy

**Time:** 2-3 hours

---

## Step 3: Pattern B Migration (Educational)

**See CONTENT_STANDARDS.md - Part 3: Blog System - Pattern B**

**Quick steps:**
1. Update imports (BlogLayout, BlogHero, BlogEmailCapture, BlogAuthorBio)
2. Wrap content in BlogLayout
3. Add BlogHero at top
4. Keep main content as inline HTML/JSX
5. Add BlogEmailCapture at 70% through content
6. Add BlogAuthorBio at end
7. Test locally
8. Deploy

**Time:** 1-2 hours

---

## Step 4: Voice and Content Updates

### Same as Review Pages

- Remove forbidden phrases
- Fix credentials
- Remove pricing violations
- Add professional context
- Use Scott's voice

**See VOICE_AND_CREDENTIALS.md for complete guidelines.**

---

# Migration Type 3: Component Updates

## Overview

**Goal:** Update component across all pages that use it.

**Risk Level:** HIGH (affects multiple pages)

**Approach:** Test extensively before rolling out.

---

## When to Update Components

### ✅ Update When:
- Security vulnerability
- Breaking accessibility issue
- Major bug affecting functionality
- Performance improvement with proven benefit
- New prop needed for new use cases

### ❌ Don't Update For:
- "Improvements" without clear benefit
- Aesthetic changes without UX improvement
- Refactoring for refactoring's sake
- Changes that break existing pages

---

## Component Update Process

### Step 1: Create Test Branch (2 minutes)

```bash
git checkout -b component-update/[component-name]
```

### Step 2: Update Component (varies)

**Make changes to component file.**

**Document changes:**
```typescript
/**
 * ComponentName
 * 
 * CHANGELOG:
 * - 2025-11-10: Added newProp for additional functionality
 * - 2025-11-05: Fixed accessibility issue with focus states
 * - 2025-11-01: Initial implementation
 */
```

### Step 3: Update TypeScript Interface (10 minutes)

**Update COMPONENT_INTERFACES.md** with new interface:

```typescript
// OLD:
interface OldComponentProps {
  title: string
  content: string
}

// NEW:
interface NewComponentProps {
  title: string
  content: string
  newProp?: string  // Optional for backwards compatibility
}
```

### Step 4: Test on Sample Pages (30 minutes)

**Test on 3-5 representative pages:**
- High-traffic page
- Low-traffic page
- Page with complex content
- Page with simple content
- Page with edge cases

**Verify:**
- [ ] Component renders correctly
- [ ] New functionality works
- [ ] Old pages still work (backwards compatible if possible)
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Lighthouse scores maintained
- [ ] Mobile responsive

### Step 5: Update Affected Pages (varies)

**If backwards compatible:** Deploy component update, update pages gradually.

**If breaking change:**
1. Identify all affected pages (grep for component name)
2. Create migration plan
3. Update pages in batches
4. Test each batch
5. Deploy incrementally

### Step 6: Document Changes (15 minutes)

**Update documentation:**
- COMPONENT_INTERFACES.md (TypeScript interfaces)
- TECHNICAL_STANDARDS.md (if architecture changes)
- Migration guide (this document)

**Create migration guide for other devs:**
```markdown
# ComponentName Update Migration

**Date:** November 10, 2025
**Type:** Breaking change / Non-breaking enhancement

## What Changed

[Explain what changed and why]

## Migration Required

YES / NO

## How to Update

[Step-by-step migration instructions]

## Affected Pages

[List of pages that need updates]

## Testing Checklist

[Specific tests for this component]
```

### Step 7: Deploy and Monitor (1 day)

**Deploy to production.**

**Monitor for 24 hours:**
- Error logs (Vercel, Sentry if configured)
- Analytics (traffic drop? bounce rate increase?)
- User reports (if any)
- Lighthouse scores (automated monitoring if configured)

**If issues detected:**
1. Assess severity
2. Hot fix or rollback?
3. Communicate with Scott
4. Document incident

---

## Component Deprecation Process

### When to Deprecate

- Component replaced by better pattern
- Security issue cannot be fixed
- No longer needed (functionality removed)

### Deprecation Steps

**1. Mark as deprecated (Week 1):**
```typescript
/**
 * @deprecated Use NewComponent instead
 * This component will be removed in 30 days
 * Migration guide: /docs/migrations/old-component-to-new.md
 */
export default function OldComponent() {
  console.warn('OldComponent is deprecated. Use NewComponent instead.')
  // ... component code
}
```

**2. Create migration guide:**
- Clear instructions
- Code examples (before/after)
- Timeline for removal

**3. Update documentation:**
- Add deprecation notice to COMPONENT_INTERFACES.md
- Update TECHNICAL_STANDARDS.md

**4. Communicate (Week 1):**
- Notify all team members
- Update project documentation

**5. Migration period (Weeks 2-4):**
- Update pages to new component
- Test thoroughly
- Track progress

**6. Remove component (Week 5):**
- Delete deprecated component file
- Remove from documentation
- Verify no imports remain

---

# Quality Assurance

## Pre-Migration Checklist

**Before starting ANY migration:**

- [ ] Read START_HERE.md (protection rules)
- [ ] Read VOICE_AND_CREDENTIALS.md (credentials, voice)
- [ ] Read COMPONENT_INTERFACES.md (TypeScript interfaces)
- [ ] Read relevant section of CONTENT_STANDARDS.md
- [ ] Create assessment notes
- [ ] Estimate time required
- [ ] Get Scott's approval for approach

---

## Post-Migration Checklist

**After completing migration, verify:**

### Content Quality
- [ ] Credentials correct ("24 years", "6 years Purple Café", "4 years Kitchen Manager")
- [ ] Voice matches guidelines (no forbidden phrases)
- [ ] No pricing violations
- [ ] Professional context included
- [ ] Honest pros AND cons

### Technical Quality
- [ ] `npm run build` succeeds
- [ ] `npm run type-check` passes
- [ ] No console errors
- [ ] All components render correctly
- [ ] All links work (internal and affiliate)
- [ ] Affiliate links include `?tag=chefapprovedt-20`

### Accessibility
- [ ] Text links use `text-orange-700`
- [ ] Star ratings use `text-amber-700`
- [ ] Heading hierarchy correct (h1 → h2 → h3)
- [ ] Only ONE h1 per page
- [ ] All images have alt text
- [ ] Focus states visible

### SEO
- [ ] Title <60 characters, <80% similar to others
- [ ] Meta description 150-160 characters, <80% similar
- [ ] Canonical URL correct
- [ ] Dates present (published/updated)
- [ ] Schema markup validates
- [ ] Breadcrumbs included

### Performance
- [ ] Lighthouse Desktop: 100
- [ ] Lighthouse Mobile: 80+
- [ ] LCP <2.5s
- [ ] No layout shift
- [ ] Images optimized (quality: 75)

### Deployment
- [ ] Committed with clear message
- [ ] Pushed to GitHub
- [ ] Verified on live site
- [ ] Tested on real mobile device
- [ ] No errors in production

---

## Migration Testing Template

**Use this for each migration:**

```markdown
# [Product/Post Name] Migration Test

**Date:** November 10, 2025
**Type:** Review page / Blog post / Component update
**Migrated by:** [Name]

## Pre-Migration State
- Used components: NO
- Credentials: Wrong (20 years)
- Comparison table: NO
- Accessibility issues: YES (orange-600 links)

## Changes Made
- [ ] Created data.ts file
- [ ] Updated page.tsx to use components
- [ ] Added comparison table
- [ ] Fixed credentials
- [ ] Fixed accessibility issues
- [ ] Added missing components

## Testing Results

### Local Testing
- [ ] Build succeeds ✅
- [ ] Type check passes ✅
- [ ] Desktop renders correctly ✅
- [ ] Mobile renders correctly ✅
- [ ] All links work ✅
- [ ] No console errors ✅

### Lighthouse Scores
- Desktop: 100 ✅
- Mobile: 87 ✅
- LCP: 1.8s ✅

### Production Testing
- [ ] Deployed successfully ✅
- [ ] Live page loads correctly ✅
- [ ] Tested on iPhone 13 ✅
- [ ] Affiliate links work ✅
- [ ] No errors in console ✅

## Issues Found
None

## Time Spent
3.5 hours

## Status
✅ COMPLETE
```

---

# Rollback Procedures

## When to Rollback

**Rollback immediately if:**
- Build fails in production
- Page doesn't load (500 error)
- Critical functionality broken
- Lighthouse score drops >10 points
- Major accessibility issue introduced

**Rollback after investigation if:**
- Bounce rate increases >20%
- Time on page decreases >30%
- Multiple user complaints
- Analytics show negative impact

---

## How to Rollback

### Method 1: Git Revert (Recommended)

```bash
# Find the commit to revert
git log --oneline -10

# Revert the specific commit
git revert [commit-hash]

# Push revert commit
git push origin main
```

**Advantages:**
- Preserves history
- Clear record of what was reverted
- Easy to re-apply later

### Method 2: Reset to Previous Commit (Nuclear Option)

```bash
# ⚠️ DANGEROUS - Only if revert doesn't work

# Reset to previous commit
git reset --hard [previous-commit-hash]

# Force push (requires approval)
git push --force origin main
```

**⚠️ Use with extreme caution. Discuss with Scott first.**

---

## Post-Rollback Actions

**After rollback:**

1. **Document what happened**
   - What broke?
   - What was the impact?
   - How did we detect it?

2. **Root cause analysis**
   - Why did it break?
   - What was missed in testing?
   - How do we prevent this?

3. **Update documentation**
   - Add to red flags in START_HERE.md
   - Update testing checklist
   - Add to common mistakes

4. **Plan fix**
   - What needs to change?
   - How do we test better?
   - When do we try again?

---

# Batch Migration Strategy

## When to Batch

**Batch migrate when:**
- Migrating 5+ similar pages (e.g., all knife reviews)
- Same type of change across multiple pages
- Clear pattern established
- Time-sensitive (traffic wave coming)

**Don't batch when:**
- First time doing this type of migration
- Each page needs custom changes
- High-risk changes
- Unclear approach

---

## Batch Process

### Phase 1: Pilot (1 page, 3-4 hours)

1. Choose representative page
2. Complete full migration
3. Test exhaustively
4. Get Scott's approval
5. Document lessons learned

### Phase 2: Batch Planning (1 hour)

1. Identify all pages for migration
2. Prioritize (high traffic first)
3. Estimate time per page
4. Create schedule (realistic)
5. Set up tracking spreadsheet

### Phase 3: Batch Execution (varies)

**Session structure:**
- Session 1: 5 pages (high priority)
- Session 2: 5 pages (mid priority)
- Session 3: 5 pages (lower priority)
- Session 4: Remaining + QA

**Per session:**
1. Migrate pages
2. Test each after completion
3. Commit individually (not one big commit)
4. Deploy incrementally
5. Monitor for issues

### Phase 4: Quality Assurance (2-3 hours)

**After all migrations:**
1. Review all migrated pages
2. Check consistency
3. Verify links between pages
4. Run full site build
5. Check analytics baseline

### Phase 5: Documentation (1 hour)

**Create completion report:**
- How many pages migrated
- Total time spent
- Issues encountered
- Improvements for next batch
- Updated documentation

---

# Common Migration Issues

## Issue #1: TypeScript Errors After Migration

**Symptom:** Build fails with TypeScript errors

**Common causes:**
- Wrong prop types
- Missing required props
- Extra props not in interface
- Null instead of empty array

**Solution:**
1. Check COMPONENT_INTERFACES.md for exact interfaces
2. Verify all required props provided
3. Remove any extra props
4. Check testingEnvironment is [] not null

---

## Issue #2: Content Doesn't Display

**Symptom:** Component renders but content is blank

**Common causes:**
- Data import incorrect
- Props not passed correctly
- Data structure doesn't match interface
- Missing spread operator

**Solution:**
```tsx
// ❌ Wrong
<ReviewHero data={reviewData.reviewHero} />

// ✅ Correct
<ReviewHero {...reviewData.reviewHero} />
```

---

## Issue #3: Lighthouse Score Drops

**Symptom:** Performance score drops after migration

**Common causes:**
- Images not optimized
- Too much data fetching
- Missing ISR configuration
- New component adds bundle size

**Solution:**
1. Check image optimization (quality: 75)
2. Verify ISR config: `export const revalidate = 3600`
3. Check bundle size with build analysis
4. Lazy load below-fold components if needed

---

## Issue #4: Links Break After Migration

**Symptom:** Affiliate links or internal links don't work

**Common causes:**
- Affiliate tag missing
- URL construction incorrect
- Relative paths broken
- Related product slugs wrong

**Solution:**
1. Verify affiliate URL includes `?tag=chefapprovedt-20`
2. Check related product slugs match Supabase exactly
3. Test all links manually after migration

---

## Issue #5: Mobile Layout Broken

**Symptom:** Page looks fine on desktop, broken on mobile

**Common causes:**
- Hardcoded widths
- Missing responsive classes
- Container width too large
- Images not responsive

**Solution:**
1. Use Tailwind responsive classes (sm:, md:, lg:)
2. Test at 375px width (iPhone SE)
3. Verify images use responsive sizing
4. Check container max-width (should be max-w-7xl)

---

# Migration Metrics

## Track These Metrics

**Per Migration:**
- Time spent
- Issues encountered
- Lighthouse score change
- Build success rate

**Aggregate:**
- Total pages migrated
- Average time per page
- Common issues
- Improvement over time

**Business Impact:**
- Traffic change (+/-)
- Bounce rate change
- Time on page change
- Affiliate CTR change

---

## Success Criteria

**Migration is successful when:**

- ✅ Page builds without errors
- ✅ All components render correctly
- ✅ Lighthouse scores maintained or improved
- ✅ Content quality improved (voice, credentials)
- ✅ Accessibility improved
- ✅ No functionality lost
- ✅ Analytics stable or improved

---

# Migration Priority Matrix

## High Priority (Do First)

**Review Pages:**
1. High traffic + wrong credentials
2. High traffic + missing comparison table
3. High traffic + accessibility issues
4. Mid traffic + multiple issues

**Blog Posts:**
1. High traffic + wrong pattern
2. High traffic + wrong credentials
3. Mid traffic + poor SEO

---

## Medium Priority (Do Next)

**Review Pages:**
1. Mid traffic + minor content issues
2. Low traffic + major issues
3. Any page with pricing violations

**Blog Posts:**
1. Mid traffic + minor issues
2. Low traffic + major issues

---

## Low Priority (Do Eventually)

**Review Pages:**
1. Low traffic + minor issues
2. Content refresh only
3. Voice improvements only

**Blog Posts:**
1. Low traffic + minor issues
2. Voice improvements only

---

# Summary

## Key Takeaways

1. **Always read documentation first** - START_HERE.md, VOICE_AND_CREDENTIALS.md, COMPONENT_INTERFACES.md

2. **Test thoroughly** - Local test, build test, Lighthouse test, production test

3. **One page at a time** - Don't batch until you've proven the approach

4. **Document everything** - Assessment, changes, testing, results

5. **Be ready to rollback** - Have a plan, know how to revert

6. **Quality over speed** - Better to do 1 page well than 5 pages poorly

---

## Quick Decision Tree

```
Should I migrate this page?

Does it have critical issues? (wrong credentials, accessibility, broken)
├─ YES → Migrate NOW (high priority)
└─ NO → Does it have important issues? (missing comparison, poor SEO)
        ├─ YES → Migrate SOON (medium priority)
        └─ NO → Does it have minor issues? (voice, content quality)
                ├─ YES → Migrate EVENTUALLY (low priority)
                └─ NO → Don't migrate (preserve functionality)
```

---

**Remember:**
- Preserve functionality over "improvements"
- Test exhaustively before deploying
- Document everything
- Be ready to rollback
- Quality over speed, always

---

*Last Updated: November 10, 2025*  
*Read START_HERE.md first*  
*Follow COMPONENT_INTERFACES.md exactly*
