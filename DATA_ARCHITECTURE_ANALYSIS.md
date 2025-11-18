# Chef Approved Tools - Data Architecture Analysis

**Date**: 2025-11-17
**Purpose**: Comprehensive documentation of current data architecture to inform database migration planning

---

## Executive Summary

Chef Approved Tools uses a **hybrid data architecture**:
- **Supabase PostgreSQL**: Product data, affiliate links (JSONB), ratings, specs
- **Local TypeScript Files**: Editorial content, SEO metadata, blog posts, review narratives

This analysis documents where all data exists, how pages render that data, and provides migration recommendations for scaling from 45 to 300+ pages.

---

## 1. Data Sources Inventory

### 1.1 Supabase Database

**Table**: `products`

**Schema** (based on `/tmp/get-product-structure.mjs` output):
```typescript
{
  id: string (UUID)
  slug: string
  name: string
  brand: string
  model: string | null
  category: string
  subcategory: string
  in_stock: boolean
  availability: string | null
  affiliate_links: JSONB[] // Array of affiliate link objects
  vendors: JSONB[]
  primary_affiliate: string // 'amazon' | 'walmart' | 'kitchenaid_cj' etc.
  reviews: JSONB | null
  expert_rating: number | null
  pros: string[] | null
  cons: string[] | null
  description: string
  expert_opinion: string | null
  usage_scenarios: JSONB | null
  alternatives: JSONB | null
  images: JSONB | null
  created_at: timestamp
  updated_at: timestamp
}
```

**Example Affiliate Links JSONB**:
```json
[
  {
    "url": "https://www.jdoqocy.com/click-101557027-15736726",
    "label": "KitchenAid K400 Blender",
    "merchant": "kitchenaid_cj",
    "is_primary": true,
    "commission_note": "CJ Affiliate - general KitchenAid link"
  },
  {
    "url": "https://amzn.to/3LqCWLc",
    "label": "Amazon",
    "merchant": "amazon",
    "is_primary": false
  }
]
```

**Products in Database**: 45+ products (exact count varies as content is added)

**Query Patterns**:
- `getProductBySlug(slug)` - Single product fetch
- `getProductsBySlugs(slugs[])` - Multiple products for comparison pages
- `getAllProducts()` - Full catalog (used for category pages)
- `getProductsByCategory(category)` - Filtered by category

**Data Access**: All queries in `lib/product-helpers.ts`

---

### 1.2 Local TypeScript Data Files

#### A. Review Data Files (46 files)

**Location**: `app/reviews/[slug]/[slug]-data.ts`

**Example Structure** (Vitamix 5200):
```typescript
export const reviewData = {
  // Database Link
  productSlug: 'vitamix-5200-professional-blender',

  // Strategic Multi-Link Configuration (CJ Affiliate Program)
  strategicLinks: {
    primary: {
      url: 'https://www.anrdoezrs.net/click-101557027-15706781',
      merchant: 'vitamix',
      label: 'Vitamix Direct (Best Price)',
      commission_note: 'CJ Affiliate - Vitamix program - EPC $65.44'
    },
    secondary: {
      url: 'https://www.dpbolvw.net/click-101557027-14211328',
      merchant: 'vitamix',
      label: 'Vitamix (Official Store)',
      commission_note: 'CJ Affiliate - Secondary program - EPC $178.16'
    }
  },

  // Editorial Content (NOT in database)
  hero: {
    title: 'Vitamix 5200 Professional Blender Review',
    subtitle: 'The gold standard for serious home cooks',
    verdict: {
      rating: 5.0,
      summary: '...',
      keyPoints: ['Aircraft-grade hardened blades', 'Self-cleaning', ...]
    }
  },

  testingResults: {
    sections: [
      {
        title: 'Smoothie Performance',
        score: 5.0,
        analysis: '...',
        testingEnvironment: '...'
      }
    ]
  },

  performanceAnalysis: {
    sections: [
      {
        title: 'Motor Power & Torque',
        content: ['The 2.0 HP motor...', ...]
      }
    ]
  },

  faq: {
    items: [
      {
        question: 'Is the Vitamix 5200 worth the price?',
        answer: '...'
      }
    ]
  },

  // Fallback Product Data (used if Supabase fetch fails)
  legacyProductData: {
    name: 'Vitamix 5200 Professional Blender',
    brand: 'Vitamix',
    model: '5200',
    category: 'Appliances',
    subcategory: 'Blenders',
    expertRating: 5.0,
    pros: [
      'Professional-grade 2.0 HP motor',
      'Variable speed control (1-10)',
      'Self-cleaning capability',
      'Aircraft-grade hardened stainless steel blades',
      '7-year warranty (longest in category)'
    ],
    cons: [
      'Premium price point ($449-499)',
      'Loud operation (common for high-power blenders)',
      'No preset programs (manual control only)'
    ],
    affiliateLinks: [
      {
        url: 'https://amzn.to/vitamix5200',
        merchant: 'amazon',
        label: 'Amazon'
      }
    ]
  }
}
```

**Review Data Files Found** (46 total):
- app/reviews/all-clad-d3-stainless-steel-fry-pan/all-clad-d3-stainless-steel-fry-pan-data.ts
- app/reviews/anova-precision-cooker-nano/anova-precision-cooker-nano-data.ts
- app/reviews/anolon-x-hybrid-nonstick-fry-pan/anolon-x-hybrid-nonstick-fry-pan-data.ts
- ... (43 more files)

---

#### B. Blog Post Data Files (77 files)

**Location**: `app/blog/[slug]/[slug]-data.ts`

**Example Structure** (Wood vs Composite Cutting Board):
```typescript
export const comparisonData = {
  metadata: {
    title: 'Wood vs Composite Cutting Board: Which Lasts Longer?',
    description: '...',
    publishedDate: '2025-01-15',
    lastUpdated: '2025-01-15',
    readTime: '12 min'
  },

  breadcrumb: {
    title: 'Wood vs Composite Cutting Board'
  },

  hero: {
    title: 'Wood vs Composite Cutting Board',
    introduction: ['Professional kitchens debate...', ...]
  },

  quickAnswer: {
    woodChoice: {
      title: 'Choose Wood If...',
      points: ['You prioritize knife edge retention', ...]
    },
    compositeChoice: {
      title: 'Choose Composite If...',
      points: ['NSF certification required', ...]
    }
  },

  comparisonTable: {
    title: 'Quick Comparison',
    features: [
      {
        feature: 'Knife Friendliness',
        wood: 'Excellent - self-healing surface',
        composite: 'Good - harder surface'
      }
    ]
  },

  detailedSections: [
    {
      id: 'durability',
      title: 'Durability & Longevity',
      subsections: [
        {
          title: 'Wood Durability',
          content: ['End-grain wood boards...', ...]
        }
      ]
    }
  ],

  productRecommendations: {
    wood: {
      title: 'Best Wood Cutting Boards',
      products: [
        {
          name: 'Boos Block Maple End Grain',
          size: '20" x 15" x 2.25"',
          priceRange: '$200-250',
          whyBest: 'Professional-grade end grain construction',
          features: ['Reversible', 'Hand-grip handles', ...]
        }
      ]
    },
    composite: {
      title: 'Best Composite Boards',
      products: [...]
    }
  },

  faq: {
    questions: [
      {
        question: 'Are wood cutting boards sanitary?',
        answer: 'Research shows...'
      }
    ]
  }
}
```

**Blog Posts Found** (77 total):
- app/blog/carbon-steel-vs-stainless-steel-knife/carbon-steel-vs-stainless-steel-knife-data.ts
- app/blog/cast-iron-care-seasoning-maintenance/cast-iron-care-seasoning-maintenance-data.ts
- ... (75 more files)

**Key Difference from Reviews**: Blog posts are **entirely self-contained** - no Supabase integration, no product fetching. Affiliate links are hardcoded in product recommendation sections.

---

#### C. Centralized SEO Metadata

**File**: `data/metadata.ts` (1,820 lines)

**Purpose**: Single source of truth for all page metadata (titles, descriptions, OpenGraph, Twitter cards)

**Structure**:
```typescript
export const pageMetadata = {
  // Review Pages
  'vitamix-5200-professional-blender': {
    title: 'Vitamix 5200 Professional Blender Review (2025) | Chef Approved Tools',
    description: 'Professional chef review of the Vitamix 5200...',
    canonical: 'https://www.chefapprovedtools.com/reviews/vitamix-5200-professional-blender',
    openGraph: {
      title: '...',
      description: '...',
      images: [{ url: '...', width: 1200, height: 630 }]
    },
    twitter: {
      card: 'summary_large_image',
      title: '...',
      description: '...'
    }
  },

  // Blog Pages
  'carbon-steel-vs-stainless-steel-knife': {
    title: 'Carbon Steel vs Stainless Steel Knife: Chef\'s Guide',
    description: '...',
    canonical: '...'
  },

  // Category Pages
  'appliances': {
    title: 'Best Kitchen Appliances - Chef Tested Reviews',
    description: '...',
    canonical: 'https://www.chefapprovedtools.com/appliances'
  },

  // Static Pages
  'home': { ... },
  'about': { ... },
  'contact': { ... }
}
```

**Usage**: All pages import `generateReviewMetadata(slug)` or `generateBlogMetadata(slug)` helpers from `lib/metadata-helpers.ts`, which fetch data from this centralized file.

---

#### D. TypeScript Type Definitions

**File**: `types/product.ts`

**Core Interfaces**:
```typescript
export interface Product {
  id: string
  slug: string
  name: string
  brand: string
  model?: string
  category: string
  subcategory?: string
  inStock: boolean
  affiliateLinks: AffiliateLink[]
  primaryAffiliate: 'amazon' | 'walmart' | 'target' | 'kitchenaid_cj' | string
  expertRating?: number
  pros: string[]
  cons: string[]
  description?: string
  expertOpinion?: string
  images?: ProductImage[]
}

export interface AffiliateLink {
  url: string
  merchant: string // 'amazon' | 'walmart' | 'kitchenaid_cj' etc.
  label?: string
  isPrimary?: boolean
  commissionNote?: string
}

export interface ProductImage {
  url: string
  alt: string
  width: number
  height: number
}
```

---

## 2. Page Rendering Patterns

### 2.1 Review Pages (46 pages)

**File Pattern**: `app/reviews/[slug]/page.tsx`

**Data Flow**:
1. **Import local data**: `import { reviewData } from './*-data'`
2. **Fetch from Supabase**: `const product = await getProductBySlug(reviewData.productSlug)`
3. **Merge data**: Product data from Supabase takes priority, falls back to `reviewData.legacyProductData` if fetch fails
4. **Extract affiliate URL**:
   - If `reviewData.strategicLinks` exists (Vitamix pattern), use those URLs
   - Otherwise call `getPrimaryAffiliateLink(product)` to extract from `product.affiliateLinks[]`
5. **Render components**:
   - `ReviewLayout` (breadcrumbs, structured data)
   - `ReviewHero` (title, verdict, rating, CTA button with affiliate link)
   - `TestingResults` (performance scores, analysis)
   - `PerformanceAnalysis` (detailed sections)
   - `ReviewFAQ` (Q&A items)
   - `AuthorBio`

**Example** (`app/reviews/vitamix-5200-professional-blender/page.tsx`):
```typescript
export default async function Vitamix5200Review() {
  const product = await getProductBySlug(reviewData.productSlug)

  const productData = product || reviewData.legacyProductData

  // Use strategic links if available, otherwise extract from product
  const affiliateUrl = reviewData.strategicLinks
    ? reviewData.strategicLinks.primary.url
    : getPrimaryAffiliateLink(productData)

  return (
    <>
      {/* Schema markup */}
      <script type="application/ld+json">
        {JSON.stringify(generateProductSchema(productData))}
      </script>

      <ReviewLayout>
        <ReviewHero
          title={reviewData.hero.title}
          verdict={reviewData.hero.verdict}
          rating={productData.expertRating}
          affiliateUrl={affiliateUrl}
        />

        <TestingResults sections={reviewData.testingResults.sections} />
        <PerformanceAnalysis sections={reviewData.performanceAnalysis.sections} />
        <ReviewFAQ items={reviewData.faq.items} />
        <AuthorBio />
      </ReviewLayout>
    </>
  )
}
```

**Key Helper Function** (`lib/product-helpers.ts:150-160`):
```typescript
export function getPrimaryAffiliateLink(product: Product): string {
  if (!product.affiliateLinks || product.affiliateLinks.length === 0) {
    return '#'
  }

  // Find link matching primary_affiliate merchant
  const primaryLink = product.affiliateLinks.find(
    link => link.merchant === product.primaryAffiliate
  )

  return primaryLink?.url || product.affiliateLinks[0]?.url || '#'
}
```

---

### 2.2 Blog Pages (77 pages)

**File Pattern**: `app/blog/[slug]/page.tsx`

**Data Flow**:
1. **Import local data only**: `import { comparisonData } from './*-data'`
2. **NO Supabase integration** - completely self-contained
3. **Render components**:
   - `BlogLayout` (breadcrumbs, structured data)
   - `BlogHero` (title, introduction, publish date)
   - `BlogQuickAnswer` (optionA vs optionB summary)
   - `BlogComparisonTable` (feature-by-feature comparison)
   - Detailed sections (custom HTML/Tailwind)
   - Product recommendations (hardcoded affiliate links)
   - `BlogFAQ`
   - `BlogEmailCapture`
   - `AuthorBio`

**Example** (`app/blog/wood-vs-composite-cutting-board/page.tsx:80-105`):
```typescript
export default function WoodVsCompositeComparison() {
  const articleSchema = generateArticleSchema({
    headline: comparisonData.metadata.title,
    description: comparisonData.metadata.description,
    datePublished: comparisonData.metadata.publishedDate,
    dateModified: comparisonData.metadata.lastUpdated,
    authorName: 'Scott Bradley',
    urlPrefix: 'blog',
    urlSuffix: 'wood-vs-composite-cutting-board',
    images: []
  })

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>

      <BlogLayout breadcrumbTitle={comparisonData.breadcrumb.title}>
        <BlogHero
          title={comparisonData.hero.title}
          introduction={comparisonData.hero.introduction}
          publishedDate={comparisonData.metadata.publishedDate}
          lastUpdated={comparisonData.metadata.lastUpdated}
          readTime={comparisonData.metadata.readTime}
        />

        <BlogQuickAnswer
          optionA={comparisonData.quickAnswer.woodChoice}
          optionB={comparisonData.quickAnswer.compositeChoice}
        />

        <BlogComparisonTable
          title={comparisonData.comparisonTable.title}
          columnA="Wood"
          columnB="Composite"
          features={comparisonData.comparisonTable.features}
        />

        {/* Detailed sections - custom rendering */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Detailed Comparison: What Actually Matters
          </h2>
          {comparisonData.detailedSections.map((section, sectionIndex) => (
            <div key={section.id}>
              <h3>{section.title}</h3>
              {section.subsections.map((subsection) => (
                <div key={subsection.title}>
                  <h4>{subsection.title}</h4>
                  {subsection.content.map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </section>

        {/* Product recommendations with hardcoded affiliate links */}
        <section>
          <h2>Top Picks for Each Type</h2>
          {comparisonData.productRecommendations.wood.products.map((product) => (
            <div key={product.name}>
              <h4>{product.name}</h4>
              <p>{product.priceRange}</p>
              {/* No affiliate link integration - just text */}
            </div>
          ))}
        </section>

        <BlogFAQ questions={comparisonData.faq.questions} />
        <BlogEmailCapture />
        <AuthorBio />
      </BlogLayout>
    </>
  )
}
```

**Affiliate Link Strategy in Blogs**: Products mentioned in blog recommendations are **text-only** - no clickable affiliate links. The strategy is:
1. Build SEO authority with comparison content
2. Link to full review pages (which have affiliate links)
3. Or include Amazon/merchant links directly in blog text (manual, not database-driven)

---

### 2.3 Category Pages (6 pages)

**Files**:
- `app/appliances/page.tsx`
- `app/cookware/page.tsx`
- `app/cutlery/page.tsx`
- `app/gadgets/page.tsx`
- `app/storage/page.tsx`
- `app/tools/page.tsx`

**Data Flow**:
1. **Fetch all products in category**: `const products = await getProductsByCategory('Appliances')`
2. **Filter products with reviews**: Only show products with `expertRating` (excludes comparison-only mentions)
3. **Render product grid**:
   - Product card with image, name, rating
   - Pros/cons from database
   - CTA button with affiliate link via `getPrimaryAffiliateLink(product)`

**Example** (`app/appliances/page.tsx`):
```typescript
export default async function AppliancesPage() {
  const products = await getProductsByCategory('Appliances')

  // Filter to only products with full reviews
  const reviewedProducts = products.filter(p => p.expertRating)

  return (
    <CategoryLayout category="Appliances">
      <CategoryHero
        title="Best Kitchen Appliances"
        description="Chef-tested reviews of blenders, mixers, and more"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviewedProducts.map((product) => (
          <ProductCard
            key={product.id}
            slug={product.slug}
            name={product.name}
            brand={product.brand}
            rating={product.expertRating}
            pros={product.pros}
            cons={product.cons}
            affiliateUrl={getPrimaryAffiliateLink(product)}
          />
        ))}
      </div>
    </CategoryLayout>
  )
}
```

**Query Implementation** (`lib/product-helpers.ts:80-95`):
```typescript
export async function getProductsByCategory(category: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('expert_rating', { ascending: false, nullsLast: true })

  if (error) {
    console.error('Error fetching products by category:', error)
    return []
  }

  return data.map(transformSupabaseProduct)
}
```

---

## 3. Component Data Requirements

### 3.1 Review Components

**Component**: `ReviewHero` (`components/review/ReviewHero.tsx`)

**Props Required**:
```typescript
{
  title: string           // From reviewData.hero.title
  subtitle?: string       // From reviewData.hero.subtitle
  verdict: {
    rating: number        // From product.expertRating (Supabase) or reviewData.legacyProductData.expertRating
    summary: string       // From reviewData.hero.verdict.summary
    keyPoints: string[]   // From reviewData.hero.verdict.keyPoints
  }
  affiliateUrl: string    // From getPrimaryAffiliateLink(product) or reviewData.strategicLinks
  affiliateLabel?: string // Default "View Latest Price"
}
```

**Data Sources**: Hybrid (local title/subtitle, Supabase rating, local verdict text)

---

**Component**: `TestingResults` (`components/review/TestingResults.tsx`)

**Props Required**:
```typescript
{
  sections: Array<{
    title: string
    score: number         // 1.0 - 5.0
    analysis: string
    testingEnvironment?: string
  }>
}
```

**Data Source**: Entirely local (`reviewData.testingResults.sections`)

---

**Component**: `PerformanceAnalysis` (`components/review/PerformanceAnalysis.tsx`)

**Props Required**:
```typescript
{
  sections: Array<{
    title: string
    content: string[]     // Array of paragraphs
  }>
}
```

**Data Source**: Entirely local (`reviewData.performanceAnalysis.sections`)

---

**Component**: `ProductCard` (`components/ProductCard.tsx`)

**Props Required**:
```typescript
{
  slug: string           // From product.slug (Supabase)
  name: string           // From product.name (Supabase)
  brand: string          // From product.brand (Supabase)
  rating: number         // From product.expertRating (Supabase)
  pros: string[]         // From product.pros (Supabase)
  cons: string[]         // From product.cons (Supabase)
  affiliateUrl: string   // From getPrimaryAffiliateLink(product)
  image?: {
    url: string
    alt: string
  }
}
```

**Data Source**: Entirely Supabase (except affiliate URL which is extracted from Supabase `affiliate_links` JSONB)

---

### 3.2 Blog Components

**Component**: `BlogQuickAnswer` (`components/blog/BlogQuickAnswer.tsx`)

**Props Required**:
```typescript
{
  optionA: {
    title: string
    points: string[]
  }
  optionB: {
    title: string
    points: string[]
  }
}
```

**Data Source**: Entirely local (`comparisonData.quickAnswer`)

---

**Component**: `BlogComparisonTable` (`components/blog/BlogComparisonTable.tsx`)

**Props Required**:
```typescript
{
  title: string
  columnA: string        // e.g., "Wood"
  columnB: string        // e.g., "Composite"
  features: Array<{
    feature: string
    [columnA]: string
    [columnB]: string
  }>
}
```

**Data Source**: Entirely local (`comparisonData.comparisonTable`)

---

**Component**: `BlogFAQ` (`components/blog/BlogFAQ.tsx`)

**Props Required**:
```typescript
{
  questions: Array<{
    question: string
    answer: string
  }>
}
```

**Data Source**: Entirely local (`comparisonData.faq.questions`)

---

## 4. Supabase vs Local File Split

### 4.1 What Lives in Supabase

**Product Core Data**:
- ✅ Product ID, slug, name, brand, model
- ✅ Category, subcategory
- ✅ In stock status
- ✅ Expert rating (1.0-5.0 scale)
- ✅ Pros and cons (array of strings)
- ✅ Description (short product summary)

**Affiliate Link Data**:
- ✅ Affiliate links (JSONB array)
- ✅ Primary affiliate designation
- ⚠️ **Issue**: JSONB array makes it difficult to:
  - Add new affiliate programs
  - Track click performance
  - Manage multi-link strategies (Vitamix pattern)
  - Ensure data consistency (recently had `retailer` vs `merchant` field name issues)

**Media**:
- ✅ Product images (JSONB array - currently mostly unused)

---

### 4.2 What Lives in Local Files

**Editorial Content** (`app/reviews/[slug]/*-data.ts`):
- ✅ Review narrative (hero, verdict, key points)
- ✅ Testing results (performance scores, analysis, testing environment)
- ✅ Performance analysis (detailed sections with paragraphs)
- ✅ FAQ items (questions and answers)
- ✅ Strategic affiliate link configurations (Vitamix multi-link pattern)

**Blog Content** (`app/blog/[slug]/*-data.ts`):
- ✅ All blog post content (comparisons, guides, how-tos)
- ✅ Quick answer summaries
- ✅ Comparison tables
- ✅ Detailed section narratives
- ✅ Product recommendations (text-only, not database-linked)

**SEO Metadata** (`data/metadata.ts`):
- ✅ Page titles, descriptions
- ✅ OpenGraph data
- ✅ Twitter card data
- ✅ Canonical URLs

**Fallback Data** (`app/reviews/[slug]/*-data.ts` → `legacyProductData`):
- ⚠️ **Duplicate**: Product name, brand, model, category
- ⚠️ **Duplicate**: Pros, cons, rating
- ⚠️ **Duplicate**: Affiliate links
- **Purpose**: Used if Supabase fetch fails (offline development, database downtime)

---

### 4.3 Data Duplication Issues

**Critical Finding**: Pros/cons exist in **THREE places**:

1. **Supabase** `products.pros` and `products.cons`
2. **Local files** `reviewData.legacyProductData.pros` and `cons`
3. **Local files** `reviewData.hero.verdict.keyPoints` (often overlaps with pros)

**Current Merge Logic** (`app/reviews/[slug]/page.tsx`):
```typescript
const product = await getProductBySlug(reviewData.productSlug)
const productData = product || reviewData.legacyProductData // Supabase takes priority
```

**Problem**: If pros/cons are updated in Supabase but not in local files (or vice versa), they become out of sync. No single source of truth.

**Similar Issue with Ratings**:
- Supabase: `product.expert_rating`
- Local: `reviewData.legacyProductData.expertRating`
- Local: `reviewData.hero.verdict.rating`

---

## 5. Affiliate Links Architecture

### 5.1 Current Storage (JSONB Array)

**Location**: Supabase `products.affiliate_links` column

**Example**:
```json
[
  {
    "url": "https://amzn.to/3LqCWLc",
    "merchant": "amazon",
    "label": "Amazon",
    "is_primary": false
  },
  {
    "url": "https://www.jdoqocy.com/click-101557027-15736726",
    "merchant": "kitchenaid_cj",
    "label": "KitchenAid K400 Blender",
    "is_primary": true,
    "commission_note": "CJ Affiliate - general KitchenAid link"
  }
]
```

**Field Name Inconsistency Issues**:
- Recently fixed 4 products that used `"retailer": "Amazon"` instead of `"merchant": "amazon"`
- This broke GitHub Action scripts that search for `merchant === 'amazon'`
- **Products affected**:
  - japanese-wooden-spoon-set
  - instant-pot-duo-plus-6qt
  - ninja-air-fryer-af101
  - ninja-bl660-professional-blender

**Problems with JSONB Approach**:
1. **No schema validation** - field names can vary (`retailer` vs `merchant`)
2. **No referential integrity** - can't ensure merchant names are consistent
3. **Difficult to query** - can't easily find "all products with Amazon links"
4. **No link tracking** - can't store clicks, conversions, EPC data
5. **Hard to update** - must update entire JSONB array to change one link
6. **No multi-link strategies** - Vitamix pattern requires separate local file configuration

---

### 5.2 Strategic Multi-Link Pattern (Vitamix)

**Location**: Local file `app/reviews/vitamix-5200-professional-blender/vitamix-5200-professional-blender-data.ts`

**Pattern**:
```typescript
strategicLinks: {
  primary: {
    url: 'https://www.anrdoezrs.net/click-101557027-15706781',
    merchant: 'vitamix',
    label: 'Vitamix Direct (Best Price)',
    commission_note: 'CJ Affiliate - Vitamix program - EPC $65.44'
  },
  secondary: {
    url: 'https://www.dpbolvw.net/click-101557027-14211328',
    merchant: 'vitamix',
    label: 'Vitamix (Official Store)',
    commission_note: 'CJ Affiliate - Secondary program - EPC $178.16'
  }
}
```

**Why This Pattern Exists**:
- CJ Affiliate has **multiple Vitamix programs** with different EPC (Earnings Per Click)
- Want to A/B test which link converts better
- Want to prioritize higher-EPC link but have fallback
- **Can't do this in Supabase JSONB** without custom logic

**Rendering Logic**:
```typescript
const affiliateUrl = reviewData.strategicLinks
  ? reviewData.strategicLinks.primary.url
  : getPrimaryAffiliateLink(product)
```

**Problem**: This pattern is **duplicated across review pages** - no centralized management.

---

### 5.3 Affiliate Link Extraction Logic

**Function**: `getPrimaryAffiliateLink(product)` (`lib/product-helpers.ts:150-160`)

```typescript
export function getPrimaryAffiliateLink(product: Product): string {
  if (!product.affiliateLinks || product.affiliateLinks.length === 0) {
    return '#'
  }

  // Try to find link where merchant matches product.primaryAffiliate
  const primaryLink = product.affiliateLinks.find(
    link => link.merchant === product.primaryAffiliate
  )

  // Fallback to first link if no match, or '#' if empty
  return primaryLink?.url || product.affiliateLinks[0]?.url || '#'
}
```

**Usage**: Called on every review page and category page to extract the primary affiliate URL from Supabase data.

**Issue**: If `product.primaryAffiliate = 'amazon'` but no affiliate link has `merchant: 'amazon'`, it falls back to first link (might not be intended primary).

---

### 5.4 Affiliate Programs in Use

**Current Merchants** (extracted from analysis):
1. **amazon** - Amazon Associates
2. **walmart** - Walmart Affiliate Program
3. **target** - Target Affiliate Program
4. **kitchenaid_cj** - CJ Affiliate KitchenAid program
5. **vitamix** - CJ Affiliate Vitamix program (multiple sub-programs)
6. **other** - Miscellaneous direct merchant links

**Future Expansion Needs**:
- More CJ Affiliate brands (Le Creuset, Lodge, All-Clad, etc.)
- ShareASale networks
- Rakuten/Flexoffers
- Direct merchant programs

**Current Problem**: Adding new affiliate program requires:
1. Manually updating JSONB in Supabase
2. Ensuring `merchant` field name is consistent
3. Updating TypeScript types if needed
4. No validation that merchant name is valid

---

## 6. Critical Findings

### 6.1 Data Inconsistency Risks

**Finding**: Product data (pros, cons, ratings) exists in multiple places with no single source of truth.

**Example Scenario**:
1. Product reviewed, pros/cons added to Supabase
2. Later, local `*-data.ts` file created with `legacyProductData.pros` (copy-pasted from Supabase)
3. Months later, product improved, pros updated in Supabase
4. Local file never updated → **out of sync**
5. If Supabase fetch fails, page renders outdated pros from local file

**Impact**: Inconsistent product information shown to users depending on database availability.

**Recommendation**: Remove `legacyProductData` entirely, handle Supabase failures with error boundaries instead of fallback data.

---

### 6.2 Affiliate Link Management Complexity

**Finding**: JSONB affiliate links make it difficult to:
- Track performance (clicks, conversions, revenue)
- Ensure consistency (field name issues already occurred)
- Implement A/B testing strategies (Vitamix pattern requires custom code)
- Scale to 300+ pages with multiple affiliate programs

**Current Workarounds**:
- GitHub Action scripts to check Amazon links (brittle, broke when field names changed)
- Strategic links in local files (not scalable)
- Manual Supabase UI updates for each link change

**Recommendation**: Migrate to relational `affiliate_links` table with foreign keys to `products` and `affiliate_programs`.

---

### 6.3 No Separation Between Products and Reviews

**Finding**: Current schema conflates "product" with "reviewed product". A product can't exist without a full review.

**Problem for Comparison Pages**:
- Blog posts mention products (e.g., "Boos Block Maple End Grain" in cutting board comparison)
- These products don't have full reviews
- Can't link them to database (no partial product records)
- Can't track affiliate links for comparison-only mentions

**Current Workaround**: Hardcode product names and details in blog `*-data.ts` files.

**Recommendation**: Separate `products` table from `reviews` table. Products can exist without reviews. Reviews reference products.

---

### 6.4 Blog Posts Completely Decoupled from Database

**Finding**: 77 blog posts have zero integration with Supabase. Product recommendations are text-only.

**Missed Opportunities**:
- Can't track which products are mentioned in which blogs
- Can't insert affiliate links dynamically
- Can't update product names/prices across all mentions
- Can't generate "mentioned in these articles" sections on review pages

**Current State**: Blog posts are purely editorial content, serving SEO purpose but not monetization.

**Recommendation**: Create `blog_product_mentions` table to link blog posts to products, enable dynamic affiliate link insertion in blog content.

---

### 6.5 Category Pages Limited by Review-Only Filter

**Finding**: Category pages only show products with `expertRating` (full reviews).

**Code** (implied from current architecture):
```typescript
const reviewedProducts = products.filter(p => p.expertRating)
```

**Impact**: As product catalog grows to 300 pages, many products may be "comparison-only" or "quick pick" (not full review). They won't appear on category pages.

**Recommendation**: Add `review_status` field to products:
- `full_review` - Complete review with testing, analysis
- `quick_pick` - Brief recommendation, no full testing
- `comparison_only` - Mentioned in comparison blogs
- `not_reviewed` - Product in database, not yet reviewed

Category pages can filter by status as needed.

---

## 7. Migration Recommendations

### 7.1 Database Schema Changes

**New Tables Needed**:

```sql
-- Affiliate Programs (centralized merchant definitions)
CREATE TABLE affiliate_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL, -- 'amazon', 'walmart', 'vitamix_cj'
  name TEXT NOT NULL, -- 'Amazon Associates'
  network TEXT, -- 'CJ', 'ShareASale', 'direct'
  commission_rate DECIMAL(5,2), -- e.g., 4.00 for 4%
  average_epc DECIMAL(10,2), -- Earnings per click
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products (remove affiliate_links JSONB, separate reviews)
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT,
  category TEXT NOT NULL,
  subcategory TEXT,
  in_stock BOOLEAN DEFAULT true,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product Affiliate Links (relational, many-to-many)
CREATE TABLE product_affiliate_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  affiliate_program_id UUID REFERENCES affiliate_programs(id),
  url TEXT NOT NULL,
  label TEXT, -- 'Amazon', 'Vitamix Direct'
  is_primary BOOLEAN DEFAULT false,
  priority INTEGER DEFAULT 0, -- For strategic multi-link (1=primary, 2=secondary)
  notes TEXT,
  last_checked TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(product_id, affiliate_program_id, priority)
);

-- Reviews (separate from products)
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL, -- Can differ from product.slug if needed
  expert_rating DECIMAL(2,1), -- 1.0 - 5.0
  pros TEXT[], -- Array of strings
  cons TEXT[], -- Array of strings
  expert_opinion TEXT,
  review_status TEXT DEFAULT 'full_review', -- 'full_review' | 'quick_pick' | 'comparison_only'
  published_date DATE,
  last_updated TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Product Mentions (links blog posts to products)
CREATE TABLE blog_product_mentions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_slug TEXT NOT NULL, -- 'wood-vs-composite-cutting-board'
  product_id UUID REFERENCES products(id),
  mention_type TEXT, -- 'recommended' | 'compared' | 'mentioned'
  context TEXT, -- 'Best Wood Cutting Boards' section
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 7.2 What to Migrate vs Keep in Code

**Migrate to Database**:
- ✅ All affiliate link configurations (including strategic multi-link)
- ✅ Product specs, pros, cons (single source of truth)
- ✅ Ratings and review metadata (publication dates, last updated)
- ✅ Affiliate program definitions (centralized)
- ✅ Blog-product relationships

**Keep in Code** (`*-data.ts` files):
- ✅ Editorial review narratives (testing results, performance analysis, FAQ)
- ✅ Blog post content (comparisons, guides, how-tos)
- ✅ SEO metadata (`data/metadata.ts`)
- ✅ Component configurations (hero titles, section structures)

**Why This Split**:
- **Database**: Data that changes, needs consistency, powers multiple pages
- **Code**: Content that is authored once, rarely changes, specific to single page

---

### 7.3 Migration Strategy (Incremental Approach)

**Phase 1: Affiliate Programs Table**
1. Create `affiliate_programs` table
2. Seed with current merchants (amazon, walmart, vitamix_cj, etc.)
3. Add EPC data for CJ programs

**Phase 2: Product Affiliate Links Table**
1. Create `product_affiliate_links` table
2. Write migration script to extract links from `products.affiliate_links` JSONB
3. Insert into new table with proper foreign keys
4. Migrate Vitamix strategic links from local files

**Phase 3: Update Product Helpers**
1. Modify `getPrimaryAffiliateLink()` to query `product_affiliate_links` table
2. Add caching layer to avoid N+1 queries on category pages
3. Test on development environment

**Phase 4: Separate Products and Reviews**
1. Create `reviews` table
2. Migrate `expert_rating`, `pros`, `cons` from `products` to `reviews`
3. Update queries to join `products` with `reviews`

**Phase 5: Remove Fallback Data**
1. Delete `legacyProductData` from all `*-data.ts` files
2. Implement error boundaries for Supabase fetch failures
3. Monitor production for any regressions

**Phase 6: Blog Product Mentions**
1. Create `blog_product_mentions` table
2. Manually add product mentions for top 10 blog posts
3. Build admin UI to manage mentions
4. Update blog components to render affiliate links from database

---

### 7.4 Admin UI Requirements

**Key Features Needed**:

1. **Affiliate Program Management**
   - CRUD for affiliate programs
   - EPC tracking and display
   - Commission rate management

2. **Product Management**
   - CRUD for products (name, brand, category, slug)
   - Inline editing of pros/cons
   - Review status selector (full review, quick pick, comparison only)

3. **Affiliate Link Management**
   - Add/edit/delete links per product
   - Set primary link with visual indicator
   - Multi-link strategy configuration (priority order)
   - Link validation (check for broken links)
   - Last checked timestamp

4. **Review Management**
   - Rating input (1.0-5.0 with 0.1 increments)
   - Pros/cons list editor
   - Publication date picker
   - Expert opinion rich text editor

5. **Blog Product Mentions**
   - Select blog post (dropdown)
   - Select product (searchable)
   - Mention type selector (recommended, compared, mentioned)
   - Context text input

6. **Validation Rules**
   - Each product must have at least one affiliate link
   - Exactly one link must be marked `is_primary`
   - URLs must be valid and start with https://
   - Merchant name must match existing affiliate program

---

## 8. Conclusion

The current Chef Approved Tools architecture uses a **hybrid data model**:
- **Supabase**: Product catalog, affiliate links (JSONB), ratings, specs
- **Local Files**: Editorial content, SEO metadata, blog posts

This works well for the current 45 reviewed products, but presents challenges for scaling to 300+ pages:

**Key Issues**:
1. Data duplication (pros/cons in Supabase AND local files)
2. JSONB affiliate links (hard to manage, no validation, no tracking)
3. No separation between products and reviews
4. Blog posts completely decoupled from product database
5. No admin UI for non-technical content management

**Recommended Path Forward**:
1. Normalize database (separate tables for products, reviews, affiliate links, programs)
2. Remove fallback data from local files (single source of truth)
3. Build admin UI for product/affiliate/review management
4. Optionally link blog posts to products for dynamic affiliate insertion
5. Keep editorial content (narratives, testing results) in code

This will enable scaling to 300 pages while maintaining data consistency, improving affiliate link management, and allowing non-technical team members to contribute via admin UI.

---

**Next Steps**: Review this analysis, prioritize which migrations to tackle first, and design admin UI mockups for the highest-value workflows.
