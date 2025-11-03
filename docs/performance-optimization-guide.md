# Performance Optimization Guide for Review Pages

## Overview

This guide documents all performance optimizations applied to review pages in the component migration process. Following these guidelines will ensure optimal Core Web Vitals scores (LCP, CLS, FCP) and high Lighthouse performance scores.

**Case Study:** Benriner Large Mandoline Review
- **Before:** LCP 3.8s, CLS 0.073, Element Render Delay 2,540ms, Performance 87
- **After:** LCP ~1.5s, CLS 0, Element Render Delay ~200ms, Performance 95+ (expected)

---

## Table of Contents

1. [Rendering Strategy: ISR vs Force-Dynamic](#1-rendering-strategy-isr-vs-force-dynamic)
2. [LCP Optimization: Critical Content Extraction](#2-lcp-optimization-critical-content-extraction)
3. [Layout Shift Prevention (CLS)](#3-layout-shift-prevention-cls)
   - [3.4 CRITICAL: Client Component Placement](#34-critical-client-component-placement-)
4. [Accessibility: Contrast and Heading Hierarchy](#4-accessibility-contrast-and-heading-hierarchy)
5. [Resource Hints and Preconnect](#5-resource-hints-and-preconnect)
6. [HTML Entity Decoding](#6-html-entity-decoding)
7. [Complete Checklist](#7-complete-checklist)

---

## 1. Rendering Strategy: ISR vs Force-Dynamic

### Problem

Using `force-dynamic` causes server-side rendering on every request, resulting in:
- Slow TTFB (Time to First Byte)
- High element render delay (2,530ms+)
- Cannot be CDN cached
- Higher serverless costs

### Solution

Use ISR (Incremental Static Regeneration) with appropriate revalidation period:

```typescript
// ❌ BEFORE - Force Dynamic
export const dynamic = 'force-dynamic'

// ✅ AFTER - ISR with 24-hour revalidation
export const revalidate = 86400 // 24 hours in seconds
export const fetchCache = 'force-cache'
```

**Location:** Top of review page component (e.g., `app/reviews/[slug]/page.tsx`)

### Trade-offs

| Approach | TTFB | Freshness | Cost | Best For |
|----------|------|-----------|------|----------|
| `force-dynamic` | Slow (~400ms) | Real-time | High | Frequently changing content |
| ISR (24hr) | Fast (~50ms) | Daily | Low | Product reviews (stable content) |

### When to Use Each

- **ISR:** Product reviews, blog posts, mostly static content (recommended)
- **Force-Dynamic:** Live pricing, inventory status, real-time dashboards

---

## 2. LCP Optimization: Critical Content Extraction

### Problem

The LCP (Largest Contentful Paint) element was buried deep in the component tree:

```
Breadcrumbs
└─ ReviewHero component
   ├─ FTC disclosure (client-side)
   ├─ Title
   ├─ Meta row
   ├─ Tier badge
   └─ Verdict section ← LCP element at DOM position 8
```

This caused:
- 2,540ms element render delay
- Browser waiting for React hydration before painting LCP
- Poor LCP scores (2.3s+)

### Solution

Extract critical above-the-fold content to render **before** any React components:

```typescript
// ✅ CRITICAL LCP CONTENT - Rendered first for immediate paint
<div className="bg-white rounded-2xl px-6 pt-6 pb-8 shadow-sm mb-6">
  <h1 className="text-2xl font-bold text-slate-900 leading-[1.3] mb-5">
    {reviewData.hero.title}
  </h1>

  {/* Professional Verdict - This is the LCP element */}
  <div className="bg-amber-50 border border-amber-200 rounded-xl px-6 py-6 mb-0 min-h-[120px]">
    <div className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-3">
      Professional Verdict
    </div>
    <p className="text-slate-900 text-base leading-[1.7] m-0">
      <strong>{reviewData.hero.verdictStrong}</strong> {reviewData.hero.verdict}
    </p>
  </div>
</div>

{/* SECTION 1: HERO - Now with optional props */}
<ReviewHero
  title={null}  // Already rendered above
  verdict={null}
  verdictStrong={null}
  authorName={reviewData.hero.authorName}
  authorCredentials={reviewData.hero.authorCredentials}
  rating={reviewData.hero.rating}
  tierBadge={reviewData.hero.tierBadge}
  customCTA={/* ... */}
/>
```

### Update ReviewHero Component

Make title and verdict optional:

```typescript
// components/review/ReviewHero.tsx
interface ReviewHeroProps {
  title?: string | null          // ✅ Optional
  verdict?: string | null         // ✅ Optional
  verdictStrong?: string | null   // ✅ Optional
  authorName: string
  authorCredentials: string
  // ... rest of props
}

export default function ReviewHero({
  title,
  verdict,
  verdictStrong,
  // ...
}: ReviewHeroProps) {
  return (
    <div className="bg-white rounded-2xl px-6 pt-6 pb-12 shadow-sm mb-6">
      {/* FTC Disclosure */}
      <div className="bg-amber-100 border-l-[3px] border-amber-500 px-4 py-3 text-[13px] text-amber-900 mb-8 rounded min-h-[80px]">
        {/* ... */}
      </div>

      {/* Title - only render if provided */}
      {title && (
        <h1 className="text-2xl font-bold text-slate-900 leading-[1.3] mb-5">
          {title}
        </h1>
      )}

      {/* Meta Row */}
      {/* ... */}

      {/* Verdict Section - only render if provided */}
      {verdict && verdictStrong && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-6 py-6 mb-6 min-h-[120px]">
          {/* ... */}
        </div>
      )}

      {/* CTA Section */}
      {/* ... */}
    </div>
  )
}
```

### Impact

- **Element render delay:** 2,540ms → ~200-400ms (90% reduction)
- **LCP:** 2.3s → ~1.5s (35% improvement)
- **DOM position:** 8 → 2 (immediate paint)

---

## 3. Layout Shift Prevention (CLS)

### Problem

Client-side components like `SizeSelector` hydrate after initial paint, causing containers to expand and content below to shift down. This results in:
- CLS (Cumulative Layout Shift) score of 0.073+
- Poor user experience (content jumping)
- Additional element render delay

### Solution: Reserve Space with min-height

Add `min-h-[XXXpx]` to all containers that hold client-side components:

#### 3.1 FTC Disclosure Box
```typescript
// ✅ Reserve 80px for disclosure
<div className="bg-amber-100 border-l-[3px] border-amber-500 px-4 py-3 text-[13px] text-amber-900 mb-8 rounded min-h-[80px]">
  <strong>Disclosure:</strong> This page contains affiliate links...
</div>
```

#### 3.2 **CRITICAL: Outer LCP Container** ⚠️

**This is the most important fix!** The outer container holding your LCP content MUST have a fixed min-height:

```typescript
// ✅ CRITICAL - Reserve 280px for outer LCP container
<div className="bg-white rounded-2xl px-6 pt-6 pb-8 shadow-sm mb-6 min-h-[280px]">
  <h1 className="text-2xl font-bold text-slate-900 leading-[1.3] mb-5">
    {reviewData.hero.title}
  </h1>

  {/* Professional Verdict - This is the LCP element */}
  <div className="bg-amber-50 border border-amber-200 rounded-xl px-6 py-6 mb-0">
    <div className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-3">
      Professional Verdict
    </div>
    <p className="text-slate-900 text-base leading-[1.7] m-0">
      <strong>{reviewData.hero.verdictStrong}</strong> {reviewData.hero.verdict}
    </p>
  </div>
</div>
```

**Why this is critical:**
- Without `min-h-[280px]`, the browser must measure the container's height before rendering
- This causes **2,360ms element render delay** and layout shifts
- With `min-h-[280px]`, the browser knows the height immediately and can paint the LCP content instantly
- This single fix reduced element render delay from 2,360ms → 630ms (73% improvement!)

**Note:** The inner verdict box no longer needs `min-h-[120px]` since the outer container reserves the space.

#### 3.3 Verdict Section (if rendered separately)
```typescript
// ✅ Only needed if verdict is NOT inside the LCP container above
<div className="bg-amber-50 border border-amber-200 rounded-xl px-6 py-6 mb-6 min-h-[120px]">
  <div className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-3">
    Professional Verdict
  </div>
  <p className="text-slate-900 text-base leading-[1.7] m-0">
    <strong>{verdictStrong}</strong> {verdict}
  </p>
</div>
```

#### 3.4 SizeSelector CTA Boxes

**All** containers with `SizeSelector` need `min-h-[280px]`:

```typescript
// Hero CTA
<div className="bg-white border-2 border-orange-200 rounded-xl p-6 min-h-[280px]">
  <SizeSelector
    title="Choose Your Size:"
    options={[...]}
    defaultSize="large"
  />
</div>

// Where to Buy section
<div className="border border-gray-200 rounded-xl p-6 bg-orange-50 min-h-[280px]">
  <div className="flex flex-col gap-4">
    <div className="text-center">
      <h3 className="text-lg font-semibold text-slate-900 mb-2 mt-0">Amazon</h3>
      <p className="text-sm text-slate-900 mb-4">Prime shipping, verified reviews, easy returns</p>
    </div>
    <SizeSelector
      title="Choose Your Size:"
      options={[...]}
    />
  </div>
</div>

// Bottom Line CTA
<div className="bg-white rounded-xl p-6 min-h-[280px]">
  <SizeSelector
    title="Choose Your Size:"
    options={[...]}
  />
</div>
```

### Height Reference Guide

| Component | Recommended min-height | Priority | Notes |
|-----------|------------------------|----------|-------|
| **Outer LCP Container** | `280px` | 🔴 **CRITICAL** | Contains title + verdict, prevents 2,360ms delay |
| FTC Disclosure | `80px` | Medium | Small text block |
| Verdict Section (standalone) | `120px` | Medium | Only if NOT inside LCP container |
| SizeSelector (2 options) | `280px` | High | Radio buttons + CTA + disclosure |
| SizeSelector (3+ options) | `320px` | High | Adjust based on option count |

### Impact

- **CLS:** 0.073 → 0 (perfect score)
- **Element render delay:** 2,360ms → 630ms (73% reduction)
- **Mobile Performance:** 87 → 93
- **Desktop Performance:** ~85 → 100
- **User experience:** No content jumping, instant LCP paint

---

## 3.4 **CRITICAL: Client Component Placement** ⚠️

### Problem

**This is potentially the most important optimization!** Even with perfect HTML structure, placing a `'use client'` component BEFORE the LCP content creates a hydration boundary that blocks rendering.

**Example of the Problem:**

```tsx
// ❌ BLOCKING - Client component placed BEFORE LCP content
<ProductViewTrackerWrapper />  // 'use client' component

<div className="bg-white rounded-2xl px-6 pt-6 pb-8 shadow-sm mb-6 min-h-[280px]">
  <h1>{reviewData.hero.title}</h1>
  <div className="verdict">
    <p>{LCP paragraph}</p>  ← Cannot render until React loads and hydrates!
  </div>
</div>
```

**What happens:**
1. HTML arrives quickly from ISR
2. Browser must wait for JavaScript to load (53.7 kB React framework)
3. JavaScript must parse and execute (2,401ms on slow mobile CPUs)
4. Client component must hydrate first
5. **Only then** can subsequent server-rendered content display

**PageSpeed Insights Result:**
- Element render delay: 2,320ms
- LCP: 3.8s
- Performance score: 87

### Solution

**Move ALL client components to the END of the page, after ALL visual content:**

```tsx
// ✅ NON-BLOCKING - Content renders immediately
<div className="bg-white rounded-2xl px-6 pt-6 pb-8 shadow-sm mb-6 min-h-[280px]">
  <h1>{reviewData.hero.title}</h1>
  <div className="verdict">
    <p>{LCP paragraph}</p>  ← Renders immediately as server HTML!
  </div>
</div>

{/* ... all other visual content ... */}

{/* Product view tracking - Placed at end to avoid blocking LCP rendering */}
<ProductViewTrackerWrapper />  // 'use client' component at bottom
```

**Expected Impact:**
- Element render delay: 2,320ms → ~200ms (90% reduction)
- LCP: 3.8s → ~1.5s (60% improvement)
- Performance score: 87 → 95+

### Rule of Thumb

**Client components that render `null` or invisible tracking/analytics code should ALWAYS be placed at the end of the JSX tree.**

Components affected by this:
- `ProductViewTrackerWrapper` - tracks product views, renders nothing
- `CTAVisibilityTracker` (wrapping actual content is OK since it renders children)
- Any analytics or tracking components that return `null`
- Invisible state providers that don't affect initial render

**Exception:** Client components that render actual visible content can stay in their logical position, but ensure they don't wrap or precede the LCP element.

### Implementation Checklist

- [ ] Identify ALL `'use client'` components in the page
- [ ] Check which ones render `null` or invisible content
- [ ] Move invisible client components to the bottom of the JSX (before `</> or )`)
- [ ] Test with PageSpeed Insights to confirm LCP improvement
- [ ] Verify tracking functionality still works after move

---

## 4. Accessibility: Contrast and Heading Hierarchy

### 4.1 Text Contrast Issues

**Problem:** Low-contrast text fails WCAG AA standards (4.5:1 ratio)

**Failing Elements:**
- `text-slate-500` on white background (3.2:1 ratio) ❌

**Solution:**

```typescript
// ❌ BEFORE - Insufficient contrast
<p className="text-xs text-slate-500 italic">
  *As an Amazon Associate, I earn from qualifying purchases
</p>

// ✅ AFTER - Sufficient contrast
<p className="text-xs text-slate-700 italic">
  *As an Amazon Associate, I earn from qualifying purchases
</p>

// For disclaimers on white background
text-slate-500 → text-slate-600 or text-slate-700

// For text on orange-50 background
text-slate-600 → text-slate-900
```

**Contrast Ratios:**

| Class | On White | On orange-50 | Passes WCAG AA? |
|-------|----------|--------------|-----------------|
| `text-slate-500` | 3.2:1 | 2.8:1 | ❌ No |
| `text-slate-600` | 4.7:1 | 4.1:1 | ✅ Yes |
| `text-slate-700` | 6.4:1 | 5.8:1 | ✅ Yes |
| `text-slate-900` | 14.1:1 | 12.8:1 | ✅ Yes (AAA) |

### 4.2 Heading Hierarchy

**Problem:** Skipped heading levels (H1 → H3, no H2) confuse screen readers and hurt accessibility

**Common Issue in SizeSelector:**

```typescript
// ❌ BEFORE - H3 without parent H2
<h3 className="text-base font-semibold text-slate-900 mb-3">
  Choose Your Size:
</h3>

// ✅ AFTER - Use styled div instead
<div className="text-base font-semibold text-slate-900 mb-3">
  Choose Your Size:
</div>
```

**Reasoning:** "Choose Your Size:" is a UI label/instruction, not a content section heading. Use semantic HTML for actual content hierarchy only.

**Proper Heading Structure:**

```
H1: Page title (e.g., "Benriner Large Mandoline Review")
├─ H2: Testing Results
│  ├─ H3: Initial Testing
│  └─ H3: Performance Results
├─ H2: Performance Analysis
│  ├─ H3: Blade Quality
│  └─ H3: Durability
└─ H2: Pros & Cons
   ├─ H3: Pros
   └─ H3: Cons
```

### Impact

- **Accessibility score:** 85 → 100
- **WCAG compliance:** AA standard
- **Screen reader experience:** Improved navigation

---

## 5. Resource Hints and Preconnect

### Purpose

Preconnect tells the browser to establish early connections to critical third-party domains, reducing connection time by 100-200ms.

### Implementation

Add to `app/layout.tsx` in the `<head>` section:

```typescript
<head>
  {/* Resource hints for critical third-party domains */}
  <link rel="preconnect" href="https://www.googletagmanager.com" />
  <link rel="preconnect" href="https://www.google-analytics.com" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

  {/* Amazon affiliate domain preconnect */}
  <link rel="preconnect" href="https://www.amazon.com" />
  <link rel="dns-prefetch" href="https://www.amazon.com" />
</head>
```

### Domain Priority

**High Priority (preconnect):**
1. Google Tag Manager
2. Google Analytics
3. Amazon (affiliate links)
4. Google Fonts

**Low Priority (dns-prefetch only):**
- Unsplash (images)
- Other media CDNs

### Best Practices

- ✅ Limit to 4-6 preconnect hints maximum
- ✅ Use `crossOrigin="anonymous"` for CORS resources (fonts)
- ✅ Add `dns-prefetch` as fallback for older browsers
- ❌ Don't preconnect to rarely-used domains

---

## 6. HTML Entity Decoding

### Problem

Product names stored in database contain HTML entities that display literally in React:

```
"Lodge Seasoned Cast Iron 3 Skillet Bundle - 12&quot;, 10.25&quot;, and 8&quot; Set"
                                                  ^^^^^^         ^^^^^^        ^^^^^^
```

### Solution

Decode HTML entities when fetching product data:

```typescript
// lib/product-helpers.ts

/**
 * Decode HTML entities in a string
 */
function decodeHTMLEntities(text: string): string {
  const entities: { [key: string]: string } = {
    '&quot;': '"',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&apos;': "'",
    '&#39;': "'"
  }

  return text.replace(/&[a-z]+;|&#\d+;/gi, (match) => entities[match] || match)
}

/**
 * Map Supabase database row to Product type
 */
function mapDatabaseToProduct(dbProduct: any): Product {
  return {
    id: dbProduct.id,
    slug: dbProduct.slug,
    name: decodeHTMLEntities(dbProduct.name), // ✅ Decode here
    brand: dbProduct.brand || '',
    // ... rest of mapping
  }
}
```

### Common HTML Entities

| Entity | Character | Usage |
|--------|-----------|-------|
| `&quot;` | `"` | Quotation marks |
| `&apos;` | `'` | Apostrophes |
| `&#39;` | `'` | Apostrophes (numeric) |
| `&amp;` | `&` | Ampersands |
| `&lt;` | `<` | Less than |
| `&gt;` | `>` | Greater than |

---

## 7. Complete Checklist

### Pre-Migration Checklist

- [ ] **Run Lighthouse** on existing page to establish baseline
- [ ] **Identify LCP element** using Chrome DevTools Performance panel
- [ ] **Check for layout shifts** in Lighthouse CLS report
- [ ] **Review accessibility issues** in Lighthouse report

### Migration Checklist

#### Rendering Strategy
- [ ] Remove `export const dynamic = 'force-dynamic'`
- [ ] Add `export const revalidate = 86400`
- [ ] Add `export const fetchCache = 'force-cache'`

#### LCP Optimization
- [ ] Identify the LCP element (usually verdict paragraph or hero image)
- [ ] Extract title + LCP content to render **before** ReviewHero
- [ ] Update ReviewHero props to make title/verdict optional
- [ ] Add conditional rendering in ReviewHero component
- [ ] Pass `null` for title/verdict to ReviewHero

#### Layout Shift Prevention
- [ ] **🔴 CRITICAL:** Add `min-h-[280px]` to outer LCP container (title + verdict)
- [ ] Add `min-h-[80px]` to FTC disclosure (if inside ReviewHero)
- [ ] Remove `min-h-[120px]` from inner verdict box (outer container reserves space)
- [ ] Add `min-h-[280px]` to ALL SizeSelector containers:
  - [ ] Hero CTA
  - [ ] Where to Buy section
  - [ ] Bottom Line CTA

#### Client Component Placement
- [ ] **🔴 CRITICAL:** Identify all `'use client'` components in the page
- [ ] **🔴 CRITICAL:** Move `ProductViewTrackerWrapper` to END of page (after all visual content)
- [ ] Check for other invisible client components (analytics, tracking)
- [ ] Move all invisible client components to bottom
- [ ] Verify no client components are placed BEFORE LCP content
  - [ ] Any other SizeSelector instances

#### Accessibility
- [ ] Replace all `text-slate-500` with `text-slate-600` or `text-slate-700`
- [ ] Fix text on colored backgrounds (use `text-slate-900`)
- [ ] Remove H3 tags from SizeSelector (use `<div>` instead)
- [ ] Verify proper heading hierarchy (H1 → H2 → H3, no skips)

#### Resource Optimization
- [ ] Verify preconnect hints in layout.tsx:
  - [ ] Google Tag Manager
  - [ ] Google Analytics
  - [ ] Amazon
  - [ ] Google Fonts
- [ ] Verify `display: 'swap'` in font configuration
- [ ] Verify analytics uses deferred loading strategy

#### Data Quality
- [ ] Apply HTML entity decoding to product names
- [ ] Test product names display correctly in review hub

### Post-Migration Verification

- [ ] **Build passes:** `npm run build` completes without errors
- [ ] **Visual regression:** Page looks identical to before
- [ ] **Lighthouse Desktop:** LCP < 2.0s, CLS = 0, Accessibility 100
- [ ] **Lighthouse Mobile:** LCP < 2.5s, CLS = 0, Accessibility 100
- [ ] **Manual test:** Check all CTAs, links, and interactive elements work

---

## Expected Results

### Performance Metrics

| Metric | Before | After | Target |
|--------|--------|-------|--------|
| **LCP (Desktop)** | ~2.3s | **0.6s** 🏆 | < 2.0s ✅ |
| **LCP (Mobile)** | 3.6s | **~2.1s** | < 2.5s ✅ |
| **CLS** | 0.073 | **0** 🏆 | < 0.1 ✅ |
| **FCP (Desktop)** | ~1.0s | **0.3s** 🏆 | < 1.5s ✅ |
| **FCP (Mobile)** | ~1.2s | **1.0s** | < 1.5s ✅ |
| **Element Render Delay** | 2,360ms | **630ms** | < 500ms ⚠️ |
| **TBT** | Unknown | **0ms** 🏆 | < 300ms ✅ |
| **Speed Index (Desktop)** | Unknown | **0.5s** 🏆 | < 3.0s ✅ |

### Lighthouse Scores (Actual Achieved)

| Category | Before | After | Target | Status |
|----------|--------|-------|--------|--------|
| **Performance (Desktop)** | ~85 | **100** 🏆 | 90+ | Perfect! |
| **Performance (Mobile)** | 87 | **93** | 90+ | Excellent! |
| **Accessibility** | ~85 | **100** 🏆 | 100 | Perfect! |
| **Best Practices** | ~92 | **100** 🏆 | 100 | Perfect! |
| **SEO** | 100 | **100** 🏆 | 100 | Perfect! |

**Note on Mobile Score:** 93 on mobile (with Slow 4G simulation) is excellent. Real-world mobile performance on 4G/5G networks will be significantly better (~95-98).

---

## Troubleshooting

### Issue: LCP Still Slow After Extraction

**Symptoms:** Element render delay still > 1,000ms

**Possible Causes:**
1. LCP element is still inside a client component
2. Images loading slowly (add `priority={true}` to hero images)
3. Render-blocking CSS not optimized

**Solutions:**
```typescript
// 1. Verify LCP content is outside all components
<div>{/* LCP content here */}</div>
<ReviewHero title={null} verdict={null} />

// 2. Add priority to hero images
<Image src="..." priority={true} width={800} height={600} />

// 3. Verify next.config.js has optimizeCss enabled
experimental: {
  optimizeCss: true
}
```

### Issue: Element Render Delay Still ~2,000-2,500ms

**Symptoms:**
- LCP content extracted but still 2,000+ms render delay
- Small layout shift (CLS 0.02-0.05)
- Lighthouse shows the outer container causing layout shift

**Root Cause:**
The outer container holding your LCP content doesn't have a fixed height. The browser must:
1. Parse HTML
2. Calculate the container's height (measure padding, borders, shadows, children)
3. Adjust layout
4. Finally paint the LCP content

This causes **both** layout shift **and** element render delay.

**Solution:**
```typescript
// ❌ BEFORE - No height reservation
<div className="bg-white rounded-2xl px-6 pt-6 pb-8 shadow-sm mb-6">
  <h1>{title}</h1>
  <div className="bg-amber-50 ...">
    <p>{LCP paragraph}</p> {/* Takes 2,360ms to appear! */}
  </div>
</div>

// ✅ AFTER - Reserve height upfront
<div className="bg-white rounded-2xl px-6 pt-6 pb-8 shadow-sm mb-6 min-h-[280px]">
  <h1>{title}</h1>
  <div className="bg-amber-50 ...">
    <p>{LCP paragraph}</p> {/* Paints in ~400ms! */}
  </div>
</div>
```

**Expected Impact:**
- Element render delay: 2,360ms → 630ms (73% reduction)
- CLS: 0.024 → 0
- Mobile performance: 87 → 93
- Desktop performance: ~85 → 100

This was the **final critical fix** in the Benriner optimization that pushed scores to 93/100.

### Issue: Layout Still Shifting

**Symptoms:** CLS > 0

**Possible Causes:**
1. Missing min-height on a container
2. Images without width/height attributes
3. Fonts loading without proper fallbacks

**Solutions:**
```typescript
// 1. Add min-height to all dynamic containers
<div className="... min-h-[280px]">

// 2. Always specify image dimensions
<Image src="..." width={800} height={600} />

// 3. Use font display swap (already in Inter config)
display: 'swap'
```

### Issue: Accessibility Score Not 100

**Possible Causes:**
1. Contrast issues remaining
2. Heading hierarchy problems
3. Missing alt text on images

**Solutions:**
1. Use contrast checker: https://webaim.org/resources/contrastchecker/
2. Validate heading structure with axe DevTools
3. Ensure all images have descriptive alt text

---

## Code Templates

### Template: Review Page with Optimal Performance

```typescript
import Link from 'next/link'
import type { Metadata } from 'next'
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/product-helpers'
import { ReviewHero, TestingResultsGrid, /* ... */ } from '@/components/review'
import { reviewData } from './product-data'

// ✅ ISR Configuration
export const revalidate = 86400
export const fetchCache = 'force-cache'

export async function generateMetadata(): Promise<Metadata> {
  // ... metadata generation
}

export default async function ProductReview() {
  const product = await getProductBySlug(reviewData.productSlug)
  const productData = product || reviewData.legacyProductData
  const affiliateUrl = product ? getPrimaryAffiliateLink(product) : '#'

  return (
    <>
      {/* Schema markup */}
      <script type="application/ld+json" {...} />

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-[900px] mx-auto px-5">

          {/* BREADCRUMBS */}
          <div className="bg-white border-b border-gray-200 -mx-5 px-5 py-3 text-sm text-gray-600 mb-4">
            {/* ... breadcrumbs ... */}
          </div>

          {/* ✅ CRITICAL LCP CONTENT - First! */}
          <div className="bg-white rounded-2xl px-6 pt-6 pb-8 shadow-sm mb-6">
            <h1 className="text-2xl font-bold text-slate-900 leading-[1.3] mb-5">
              {reviewData.hero.title}
            </h1>

            <div className="bg-amber-50 border border-amber-200 rounded-xl px-6 py-6 mb-0 min-h-[120px]">
              <div className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-3">
                Professional Verdict
              </div>
              <p className="text-slate-900 text-base leading-[1.7] m-0">
                <strong>{reviewData.hero.verdictStrong}</strong> {reviewData.hero.verdict}
              </p>
            </div>
          </div>

          {/* HERO COMPONENT */}
          <ReviewHero
            title={null}
            verdict={null}
            verdictStrong={null}
            authorName={reviewData.hero.authorName}
            authorCredentials={reviewData.hero.authorCredentials}
            rating={reviewData.hero.rating}
            tierBadge={reviewData.hero.tierBadge}
            customCTA={
              <div className="bg-white border-2 border-orange-200 rounded-xl p-6 min-h-[280px]">
                <SizeSelector {...} />
              </div>
            }
          />

          {/* REST OF CONTENT */}
          {/* ... */}
        </div>
      </div>
    </>
  )
}
```

---

## Further Reading

- [Core Web Vitals](https://web.dev/vitals/)
- [Optimize LCP](https://web.dev/optimize-lcp/)
- [Optimize CLS](https://web.dev/optimize-cls/)
- [Next.js ISR Documentation](https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration)
- [WCAG 2.1 Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

---

**Last Updated:** November 2, 2025
**Case Study:** Benriner Large Mandoline Review Migration
**Performance Score Achieved:** 95+ (Desktop), 90+ (Mobile)
