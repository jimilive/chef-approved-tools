# Review Component TypeScript Interfaces

**Use these EXACT interfaces when generating review migration data files.**

## 🚫 PRICING RULES: What to NEVER Include vs What's Okay

### ❌ NEVER INCLUDE:
- Specific prices ("costs $50" or "costs the same as two lattes")
- Price comparisons between products ("$20 cheaper than...")
- Cost per use calculations ("0.0001 cents per grain")
- "Best value" claims
- Budget-tier recommendations ("best for tight budgets")
- Price-quality trade-off discussions ("worth the extra money")
- Any mention of current pricing

**Why:** We use affiliate links. Specific pricing creates anchoring issues, goes stale, and creates compliance problems.

### ✅ OKAY TO INCLUDE (for durable goods only):
- Durability/longevity discussions ("lasted 10 years in professional use")
- ROI discussions ("still using after 5 years daily")
- Professional vs consumer quality discussions
- Build quality that affects lifespan
- Availability (where to find it, not how much it costs)
- Maintenance costs as general category ("requires minimal maintenance" vs "costs $X to maintain")

**NOTE:** For consumables (salt, spices, oils, etc.), focus on quality, performance, and usage - NOT longevity or ROI since they get used up.

### Examples:

**❌ WRONG:**
- "This costs roughly the same as two fancy lattes"
- "At $0.50 per pound, it's a great value"
- "The cost difference is minimal—just a few cents"
- "Best value in its price range"

**✅ CORRECT:**
- "Lasted 18 years of continuous professional and home use"
- "Still performing like new after 6 years in a 200+ cover restaurant"
- "Professional-grade construction means decades of use"
- "No replacement parts needed in 10 years"

---

## ⚠️ CRITICAL: CTAVisibilityTracker (Most Common Error!)

Desktop Claude CONSISTENTLY makes errors with this component. Read carefully!

```typescript
interface CTAVisibilityTrackerProps {
  ctaId: string           // ✓ Unique identifier for this CTA
  position: string        // ⚠️ NOT "ctaPosition"!!!
  productSlug?: string    // ✓ Optional product slug
  merchant?: string       // ✓ Optional merchant name
  children: React.ReactNode
}
```

### ❌ WRONG (Desktop Claude keeps doing this!)
```typescript
<CTAVisibilityTracker
  ctaId="where-to-buy-cta"
  ctaPosition="where_to_buy"          // ❌ NO! It's "position" not "ctaPosition"
  ctaText="View on Amazon"            // ❌ This prop doesn't exist!
  ctaType="button"                    // ❌ This prop doesn't exist!
  destinationUrl={affiliateUrl}       // ❌ This prop doesn't exist!
  productName={productData.name}      // ❌ This prop doesn't exist!
  productSlug={productData.slug}      // ✓ This one is correct
>
```

### ✅ CORRECT
```typescript
<CTAVisibilityTracker
  ctaId="where-to-buy-cta"
  position="where_to_buy"             // ✓ Use "position" not "ctaPosition"
  productSlug={productData.slug}      // ✓ Optional, but useful
>
  <a href={affiliateUrl}>...</a>
</CTAVisibilityTracker>
```

**REMEMBER:** This component only TRACKS the CTA. It doesn't need to know the text, type, or destination URL - those are in the child `<a>` tag!

**Valid position values:** 'above_fold', 'mid_article', 'final_cta', 'comparison_table', 'related_products', 'sidebar', 'category_grid', 'where_to_buy', 'model_notice', or any custom string.

---

## Inline Affiliate Link Pattern

**Use this pattern to embed affiliate links within performance analysis paragraphs:**

### Pattern Usage

In your data file, use `<LINK>` tags to mark where affiliate links should appear:

```typescript
export const performanceAnalysis = {
  sections: [
    {
      title: "Heat Distribution",
      content: "The even heating impressed me during testing. <LINK>Check current price</LINK> to see if it fits your needs."
    }
  ]
}
```

### Implementation in page.tsx

Add this helper function to process inline links:

```typescript
const processInlineLinks = (content: string) => {
  const parts = content.split(/(<LINK>|<\/LINK>)/)
  const elements: (string | JSX.Element)[] = []
  let isInsideLink = false
  let linkContent = ''
  let linkIndex = 0

  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === '<LINK>') {
      isInsideLink = true
      linkContent = ''
    } else if (parts[i] === '</LINK>') {
      isInsideLink = false
      elements.push(
        <a 
          key={`inline-link-${linkIndex++}`}
          href={affiliateUrl}
          className="text-orange-700 hover:text-orange-800 underline"
        >
          {linkContent}
        </a>
      )
    } else if (isInsideLink) {
      linkContent += parts[i]
    } else if (parts[i]) {
      elements.push(parts[i])
    }
  }
  return elements
}
```

### Usage in Components

Apply the function when passing content to PerformanceAnalysis:

```typescript
<PerformanceAnalysis
  title={reviewData.performanceAnalysis.title}
  sections={reviewData.performanceAnalysis.sections.map(section => ({
    ...section,
    content: processInlineLinks(section.content)
  }))}
/>
```

**Why use this pattern:**
- Maintains affiliate links within natural paragraph flow
- Uses consistent link styling (`text-orange-700`)
- Reduces duplicate CTAs by embedding links contextually
- Improves user experience with relevant placement

---

## Core Review Components

### 1. ReviewHero

```typescript
interface ReviewHeroProps {
  title: string
  authorName: string
  authorCredentials: string
  rating: number
  tierBadge: {
    icon: string              // e.g., '🏡' or '🏆'
    text: string              // e.g., 'Tier 2: Home Testing | 48 Years'
    linkText?: string         // e.g., 'What is Tier 2?'
    linkHref?: string         // e.g., '/review-tiers'
  }
  verdict: string
  verdictStrong: string
  ctaUrl?: string
  ctaText?: string
  ctaSubtext?: string
  customCTA?: React.ReactNode
}
```

**DO NOT PASS:** quickStats, perfectFor, considerAlternatives, heroFeatures, quickNav

---

### 2. TestingResultsGrid

```typescript
interface TestingEnvironmentItem {
  label: string
  value: string
}

interface TestingResultsGridProps {
  title: string
  sections: {
    title: string
    content: ReactNode  // Can be string or JSX
  }[]
  testingEnvironment: TestingEnvironmentItem[]  // ⚠️ MUST be array, NOT null
  outstandingPerformance: string[]
  minorConsiderations: string[]
}
```

**DO NOT PASS:** introText

---

### 3. PerformanceAnalysis

```typescript
interface PerformanceSection {
  title: string
  content: ReactNode  // Can be string or JSX
  metrics?: {         // ⚠️ Use this format OR omit entirely
    label: string
    score: string
    maxScore: string
  }[]
  bulletPoints?: {
    label: string
    value: string
  }[]
}

interface PerformanceAnalysisProps {
  title: string
  sections: PerformanceSection[]
}
```

**METRICS FORMAT:** If you need to show metrics, use the array format above. DO NOT use nested objects with heating/longevity/reliability structure. Better to just put stats in the content text.

---

### 4. ProsConsGrid

```typescript
interface ProsConsGridProps {
  title: string
  prosTitle?: string
  consTitle?: string
  pros: string[]
  cons: string[]
}
```

---

### 5. WhoShouldBuyGrid

```typescript
interface WhoShouldBuyGridProps {
  title: string
  perfectForTitle?: string
  considerAlternativesTitle?: string
  perfectFor: string[]
  considerAlternatives: string[]
}
```

---

### 6. FAQSection

```typescript
interface FAQItem {
  question: string
  answer: ReactNode  // Can be string or JSX
}

interface FAQSectionProps {
  title: string
  faqs: FAQItem[]
}
```

---

### 7. EmailCaptureSection

```typescript
interface EmailCaptureSectionProps {
  title: string
  subtitle: string        // ⚠️ Put ALL benefits text here, NOT in array
  inputPlaceholder?: string
  buttonText?: string
  finePrint: string
}
```

**DO NOT PASS:** benefits (array)

**CORRECT USAGE:**
```typescript
emailCapture: {
  title: "Get My Free Guide",
  subtitle: "Learn how to: identify quality tools, maintain them properly, and get maximum lifespan."
  // NOT: benefits: ["identify quality", "maintain properly", "max lifespan"]
}
```

---

### 8. BottomLineSection

```typescript
interface BottomLineSectionProps {
  title: string
  paragraphs: ReactNode[]  // ⚠️ Use STRINGS not JSX (<>...</>)
  ctaUrl?: string
  ctaText?: string
  customCTA?: ReactNode
}
```

**DO NOT PASS:** subtitle, finalRating, finalThought, ctaHeadline, ctaSubtext

**CORRECT USAGE:**
```typescript
bottomLine: {
  title: "The Bottom Line",
  paragraphs: [
    `This is paragraph one.`,  // ✓ Plain strings
    `This is paragraph two.`
  ],
  // NOT: paragraphs: [<>Paragraph</>, <>Another</>]
  ctaUrl: affiliateUrl,
  ctaText: "Check Amazon Price →"
}
```

---

### 9. RelatedProductsGrid

```typescript
interface RelatedProduct {
  name: string        // ⚠️ NOT "title"
  description: string
  emoji: string
  href: string        // ⚠️ NOT "link"
}

interface RelatedProductsGridProps {
  title: string
  products: RelatedProduct[]
}
```

**DO NOT PASS:** introText, kitchenBundleCTA

**CORRECT USAGE:**
```typescript
relatedProducts: {
  title: "Related Products",
  products: [
    {
      emoji: '🔪',
      name: 'Victorinox Knife',  // ✓ name NOT title
      description: '...',
      href: '/reviews/...'       // ✓ href NOT link
    }
  ]
}
```

---

## Common Mistakes to Avoid

### ❌ WRONG: Nested metrics objects
```typescript
metrics: {
  heating: { title: '...', items: [...] },
  longevity: { title: '...', items: [...] }
}
```

### ✅ CORRECT: Flat metrics array OR put in content
```typescript
// Option 1: Flat array
metrics: [
  { label: 'Heating', score: '9', maxScore: '10' }
]

// Option 2: Just put it in content (better)
content: `**Heating:** 9/10\n**Longevity:** 10/10`
```

---

### ❌ WRONG: JSX in paragraphs
```typescript
paragraphs: [<>Text here</>, <>More text</>]
```

### ✅ CORRECT: Plain strings
```typescript
paragraphs: [`Text here`, `More text`]
```

---

### ❌ WRONG: testingEnvironment as null
```typescript
testingEnvironment: null
```

### ✅ CORRECT: Empty array
```typescript
testingEnvironment: []
```

---

### ❌ WRONG: Extra props not in interface
```typescript
<EmailCaptureSection benefits={[...]} />
<BottomLineSection finalRating={...} />
<RelatedProductsGrid introText="..." />
```

### ✅ CORRECT: Only valid props
```typescript
<EmailCaptureSection subtitle="All benefits in subtitle" />
<BottomLineSection paragraphs={[...]} />
<RelatedProductsGrid products={[...]} />
```

---

## FAQ Items Type Declaration

When creating the FAQ items array in data file:

```typescript
faq: {
  title: 'Frequently Asked Questions',
  items: [] as { question: string; answer: string; }[]  // ⚠️ Add type annotation
}

// Later populate it:
reviewData.faq.items = reviewData.faqData.map(faq => ({
  question: faq.question,
  answer: faq.answer
}))
```

---

## Summary Checklist

Before generating a migration data file:

- [ ] tierBadge uses `{ icon, text, linkText?, linkHref? }` structure
- [ ] No extra props on ReviewHero (quickStats, perfectFor, etc.)
- [ ] testingEnvironment is `[]` not `null`
- [ ] PerformanceAnalysis metrics are simple array OR omitted
- [ ] EmailCaptureSection has no `benefits` prop
- [ ] BottomLineSection paragraphs are plain strings, not JSX
- [ ] BottomLineSection has no subtitle, finalRating, finalThought, etc.
- [ ] RelatedProducts use `name`/`href` not `title`/`link`
- [ ] RelatedProductsGrid has no introText or kitchenBundleCTA
- [ ] FAQ items have type annotation

---

## Schema Generation

When calling `generateProductSchema()` in page.tsx:

```typescript
const productSchema = generateProductSchema({
  // REQUIRED (will cause error if missing)
  name: productData.name,
  slug: productData.slug,

  // HIGHLY RECOMMENDED
  description: productData.expertOpinion,
  brand: productData.brand,
  rating: productData.expertRating,
  reviewCount: 1,

  // GOOD FOR SEO (optional)
  model: productData.model,
  category: productData.category,
  dateAdded: productData.dateAdded,
  lastUpdated: productData.lastUpdated,
})
```

**DO NOT PASS:**
- `url` - Schema builds its own from slug
- `gtin13` - Not used in schema
- `inStock` - Not used in schema

---

**Generated:** 2025-11-01
**Updated:** 2025-11-01 (Added schema generation requirements)
**Purpose:** Reference for Desktop Claude when generating review migration files
