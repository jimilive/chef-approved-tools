# Chef Approved Tools - Review Creation & Update Guide

**Version:** 1.0
**Last Updated:** January 2025
**Based on:** Black+Decker Toaster Oven & KitchenAid Mixer Reviews (Tier 1 & 2 Quality Standards)

---

## Table of Contents

1. [Quality Standards Overview](#quality-standards-overview)
2. [Required Components Checklist](#required-components-checklist)
3. [Step-by-Step: Creating a New Review](#step-by-step-creating-a-new-review)
4. [Step-by-Step: Updating Existing Reviews](#step-by-step-updating-existing-reviews)
5. [Component Reference Guide](#component-reference-guide)
6. [Content Writing Guidelines](#content-writing-guidelines)
7. [SEO & Schema Requirements](#seo--schema-requirements)
8. [Quality Assurance Checklist](#quality-assurance-checklist)

---

## Quality Standards Overview

### Tier 1 Reviews (9.5-10/10 Quality)
**Example:** KitchenAid KSM8990WH Commercial Mixer Review

**Characteristics:**
- 15-20+ years of actual testing/use
- 8-12+ customer testimonials
- Detailed cost-per-use analysis with multi-year ROI calculations
- Comprehensive performance metrics with specific data points
- Complete specifications table (technical + physical dimensions)
- Competitor comparison table (3-4 competitors)
- Quick Navigation menu with 6+ section links
- 10+ FAQ items with schema.org markup
- Multiple mid-article CTAs with AffiliateButton components
- Related products section with 3+ recommendations
- Professional photography or detailed product images
- Structured data schemas (ProductReview + Breadcrumb)
- 3,000-5,000+ word count

### Tier 2 Reviews (8.5-9.5/10 Quality)
**Example:** Black+Decker Toaster Oven Review

**Characteristics:**
- 5-15+ years of actual testing/use
- 6-8 customer testimonials
- Cost-per-use analysis with real-world calculations
- Performance metrics section with measured data
- Complete specifications table
- Competitor comparison table (2-3 competitors)
- Quick Navigation menu with 5-6 section links
- 8-10 FAQ items with schema.org markup
- 2-3 mid-article CTAs with AffiliateButton components
- Related products section with 3 recommendations
- Structured data schemas (ProductReview + Breadcrumb)
- 2,500-4,000 word count

### Tier 3 Reviews (7-8.5/10 Quality)
**Current baseline for many existing reviews - needs improvement**

**Characteristics:**
- 1-5 years of testing/use
- Limited or no customer testimonials
- Basic product description and opinion
- Missing performance metrics
- Incomplete or missing specifications
- No competitor comparison
- No Quick Navigation
- 5-8 FAQ items, some without schema
- 1-2 CTAs, often using raw `<a>` tags instead of AffiliateButton
- Missing or incomplete structured data
- 1,500-2,500 word count

**Goal:** Upgrade all Tier 3 reviews to at least Tier 2 quality standards.

---

## Required Components Checklist

Use this checklist for every review (both new and updated):

### Essential Structure
- [ ] Proper imports (FTCDisclosure, AffiliateButton, schema generators, Link, ReviewTierBadge)
- [ ] productData object with all required fields
- [ ] breadcrumbs array for navigation
- [ ] metadata export for SEO
- [ ] Tier badge component (Tier1Badge or Tier2Badge with testing period)

### Above-the-Fold Content
- [ ] Breadcrumb navigation
- [ ] H1 title with year and specific testing period
- [ ] Author byline
- [ ] Tier badge with testing period
- [ ] Quick stats box (rating, price, key features)
- [ ] FTC Disclosure component
- [ ] Quick Navigation menu (6+ links)
- [ ] Primary CTA using AffiliateButton (position="above_fold")

### Main Content Sections
- [ ] Professional Verdict (2-3 paragraphs summarizing entire review)
- [ ] "Perfect For / Consider Alternatives" box
- [ ] Hero features grid (4 boxes highlighting key strengths)
- [ ] Main review content with testing timeline/history
- [ ] Customer Testimonials section (6-8 reviews with attribution)
- [ ] Cost-Per-Use Analysis section with real calculations
- [ ] Performance Metrics section with measured data
- [ ] Mid-article CTA using AffiliateButton (position="mid_article")
- [ ] Practical uses section (what you actually use it for)
- [ ] Value proposition section (why you recommend it)
- [ ] "What It Does Well / What It Doesn't Offer" section
- [ ] Complete Specifications Table (2-column layout)
- [ ] Competitor Comparison Table (vs. 2-4 alternatives)

### Supporting Sections
- [ ] FAQ section (8-10 questions minimum) with schema.org/FAQPage markup
- [ ] Email capture/newsletter signup box
- [ ] Related Products section (3 product cards with internal links)
- [ ] Final verdict section with summary
- [ ] Final CTA using AffiliateButton (position="final_cta")
- [ ] Footer with last updated date and contact link
- [ ] Author bio with credentials

### Technical Requirements
- [ ] All affiliate links use AffiliateButton component (NOT raw `<a>` tags)
- [ ] Internal product links use Next.js Link component
- [ ] ProductReview schema with all required fields
- [ ] Breadcrumb schema for navigation
- [ ] All section headers have proper id attributes for Quick Navigation
- [ ] Proper accessibility (aria-label on navigation links)
- [ ] Mobile-responsive grid layouts
- [ ] TypeScript type safety (no `any` types)

---

## Step-by-Step: Creating a New Review

### Phase 1: Setup & Structure (30-45 minutes)

#### 1. Create the file
```bash
# File naming convention: app/reviews/[product-slug]/page.tsx
# Example: app/reviews/all-clad-d3-stainless-fry-pan/page.tsx
```

#### 2. Copy the template structure from a Tier 1/2 review
```tsx
// Start with this import block (copy from Black+Decker or KitchenAid review):
import { Tier2Badge } from '@/components/ReviewTierBadge';
import FTCDisclosure from '@/components/FTCDisclosure';
import AffiliateButton from '@/components/AffiliateButton';
import { generateProductReviewSchema, generateBreadcrumbSchema } from '@/lib/schema';
import Link from 'next/link';
import type { Metadata } from 'next';
```

#### 3. Set up metadata (update for your product)
```tsx
export const metadata: Metadata = {
  title: '[Product Name] Review: [X Years/Months] of Professional Testing (2025)',
  description: 'Professional chef reviews [Product Name] after [X years] of [daily/weekly/intensive] use. Complete [testing type] review with [key unique selling point].',
  openGraph: {
    title: '[Product Name] Review: [X Years] of Professional Testing (2025)',
    description: 'Professional chef reviews [Product Name] after [X years] of use.',
    type: 'article',
    url: 'https://www.chefapprovedtools.com/reviews/[product-slug]',
  },
};
```

#### 4. Create the productData object
```tsx
const productData = {
  name: "Full Product Name",
  slug: "product-slug", // must match file path
  brand: "Brand Name",
  model: "MODEL-NUMBER",
  category: "Category Name", // e.g., "Chef Knives", "Mixers", "Cookware"
  priceRange: {
    min: 100, // typical low price
    max: 150, // typical high price
    currency: "USD"
  },
  rating: 5.0, // your expert rating (1.0-5.0)
  reviewCount: 1, // typically 1 for single expert review
  pros: [
    "Specific pro #1 with measurable detail",
    "Specific pro #2 with measurable detail",
    "Specific pro #3 with measurable detail",
    "Specific pro #4 with measurable detail",
    "Specific pro #5 with measurable detail"
  ],
  cons: [
    "Specific con #1",
    "Specific con #2",
    "Specific con #3",
    "Specific con #4 (if applicable)"
  ],
  affiliateLinks: [
    {
      retailer: "Amazon",
      url: "https://www.amazon.com/[product-url]?&linkCode=ll1&tag=chefapprovedt-20&linkId=[linkId]"
    }
    // Add additional retailers if available (Williams Sonoma, Sur La Table, etc.)
  ],
  expertRating: 5.0, // same as rating above
  expertOpinion: "One powerful sentence summarizing your verdict after X years of testing. Should highlight the key finding and your authority.",
  dateAdded: "2025-01-15", // date you're creating the review
  lastUpdated: new Date().toISOString().split('T')[0] // auto-updates
};
```

#### 5. Create breadcrumbs array
```tsx
const breadcrumbs = [
  { name: "Home", url: "https://www.chefapprovedtools.com" },
  { name: "Reviews", url: "https://www.chefapprovedtools.com/reviews" },
  { name: productData.name, url: `https://www.chefapprovedtools.com/reviews/${productData.slug}` }
];
```

### Phase 2: Write Core Content (2-4 hours)

#### 6. Professional Verdict Section
Write 2-3 paragraphs that:
- State your testing period upfront (e.g., "I've used X for Y years...")
- Summarize your overall conclusion
- Highlight the most compelling finding
- Set expectations for who should buy this

**Example opening:**
```
I've used the [Product Name] continuously for [X years] in [context: home kitchen/professional kitchen/both].
That's not a quick review based on a few weeks of testing—this is [X years] of daily/weekly use that proves
[key finding: reliability/performance/value].
```

#### 7. Hero Features Grid (4 boxes)
Create 4 feature boxes highlighting:
1. The #1 standout feature (with emoji)
2. Value proposition or cost effectiveness (💰)
3. Build quality or reliability (🔧)
4. Usability or design benefit (📏 or relevant emoji)

Each box should have:
- Icon/emoji
- Short headline (3-5 words)
- 2-3 sentences explaining the benefit

#### 8. Main Testing Timeline/Story
Write the narrative of your experience:
- How you acquired the product
- Initial impressions
- How your usage evolved over time
- Specific examples of use cases
- Any challenges encountered
- How it performed over the long term

**Cross-reference other products** you've reviewed:
```tsx
<Link href="/reviews/[other-product-slug]" className="text-orange-600 hover:text-orange-800 underline">
  product name
</Link>
```

#### 9. Customer Testimonials Section
Find or create 6-8 realistic customer testimonials:
- Source from Amazon verified purchases
- Focus on longevity, reliability, value
- Include attribution: "— Amazon verified purchaser (Initials, Month Year)"
- Mix of different use cases (home cook, professional, student, etc.)

**Template:**
```tsx
<section className="mb-12" id="testimonials">
  <h2 className="text-3xl font-bold mb-6 text-gray-900">What Real Users Are Saying</h2>
  <p className="text-sm text-slate-600 mb-4 italic">
    Customer reviews curated from Amazon verified purchasers and [community/forum].
    These represent selected experiences—see complete review history at source links.
  </p>

  <div className="space-y-4">
    <div className="bg-white p-5 rounded-lg border border-gray-200">
      <p className="text-slate-700 mb-2">
        "[Customer quote about their experience]"
      </p>
      <p className="text-sm text-slate-500">— Amazon verified purchaser (J.D., October 2024)</p>
    </div>

    {/* Repeat for 6-8 testimonials */}
  </div>
</section>
```

#### 10. Cost-Per-Use Analysis
Calculate real-world value:
- Initial purchase price
- Years of use (or projected lifespan)
- Estimated number of uses
- Cost per use calculation
- Comparison to alternatives' total cost of ownership

**Template structure:**
```tsx
<section className="mb-12" id="cost-analysis">
  <h2 className="text-3xl font-bold mb-6 text-gray-900">Cost-Per-Use Analysis</h2>
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">

    <div className="bg-blue-50 p-5 rounded-lg border border-blue-200 mb-4">
      <h3 className="font-bold text-slate-900 mb-3">Real-World Value Calculation</h3>
      <ul className="space-y-2 text-slate-700">
        <li>• <strong>Initial cost:</strong> $XXX</li>
        <li>• <strong>Years of use:</strong> X years</li>
        <li>• <strong>Estimated uses:</strong> XXX uses</li>
        <li>• <strong>Cost per use:</strong> $X.XX per use</li>
      </ul>
    </div>

    <p className="text-slate-700 mb-4">
      <strong>Value comparison:</strong> [Compare to alternatives' cost over same period]
    </p>
  </div>
</section>
```

#### 11. Performance Metrics
Provide measured data:
- **Heating/Temperature Performance** (for cooking equipment)
- **Longevity/Durability Stats** (years tested, failure rates)
- **Reliability Metrics** (component failures, maintenance needs)
- **Efficiency Measurements** (time savings, energy use, etc.)

Use specific numbers and measurements, not vague descriptions.

#### 12. Specifications Table
Create comprehensive two-column table:

**Column 1: Technical Specifications**
- Power/wattage
- Capacity/size
- Functions/features
- Temperature range (if applicable)
- Timer/controls
- Warranty

**Column 2: Physical Dimensions**
- Width
- Depth
- Height
- Weight
- Interior volume
- Finish/material
- Country of manufacture

**Template:**
```tsx
<section className="mb-12" id="specs">
  <h2 className="text-3xl font-bold mb-6 text-gray-900">Complete Specifications & Dimensions</h2>
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="font-semibold text-slate-900 mb-3">Technical Specifications</h3>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <dt className="text-slate-600">Specification:</dt>
            <dd className="font-semibold">Value</dd>
          </div>
          {/* Repeat for all specs */}
        </dl>
      </div>

      <div>
        <h3 className="font-semibold text-slate-900 mb-3">Physical Dimensions</h3>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <dt className="text-slate-600">Dimension:</dt>
            <dd className="font-semibold">Value</dd>
          </div>
          {/* Repeat for all dimensions */}
        </dl>
      </div>
    </div>
  </div>
</section>
```

#### 13. Competitor Comparison Table
Compare against 2-4 direct competitors:

**Comparison criteria:**
- Price range
- Capacity/size
- Power/performance
- Controls/features
- Expected lifespan (key differentiator!)
- Warranty
- Best for (use case)
- Value rating

**Template:**
```tsx
<section className="mb-12" id="comparison">
  <h2 className="text-3xl font-bold mb-6 text-gray-900">
    {productData.name} vs. Competing [Category]
  </h2>

  <div style={{ overflowX: 'auto', margin: '20px 0' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
      <thead>
        <tr style={{ background: '#f8f9fa' }}>
          <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>
            Feature
          </th>
          <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>
            {productData.brand}
          </th>
          <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>
            Competitor 1
          </th>
          <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>
            Competitor 2
          </th>
        </tr>
      </thead>
      <tbody>
        {/* Add rows for each comparison point */}
      </tbody>
    </table>
  </div>
</section>
```

### Phase 3: Supporting Sections (1-2 hours)

#### 14. FAQ Section (8-10 questions minimum)
Answer common questions with schema.org markup:

**Essential questions to include:**
1. Is [product] reliable/worth it?
2. How long does [product] last?
3. What size/model should I buy?
4. Can you [use case question]?
5. How do you clean/maintain [product]?
6. Is [brand] better than [competitor]?
7. What's the difference between cheap and expensive [category]?
8. Can [product] replace [alternative]?
9. Why do you recommend [product]?
10. Should [specific user type] buy [product]?

**Template with schema:**
```tsx
<h2 id="faq" style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '40px' }}>
  Frequently Asked Questions About {productData.name}
</h2>

<div itemScope itemType="https://schema.org/FAQPage">
  <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question"
       style={{ margin: '20px 0', padding: '20px', background: '#f8f9fa', borderRadius: '6px' }}>
    <h3 itemProp="name" style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
      Question text here?
    </h3>
    <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
      <div itemProp="text">
        <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
          <strong>Answer:</strong> Detailed answer here...
        </p>
      </div>
    </div>
  </div>
  {/* Repeat for all FAQ items */}
</div>
```

#### 15. Related Products Section
Link to 3 complementary products:
- Choose products that work well together
- Brief description (2-3 sentences)
- Highlight the key benefit
- Link to full review using Link component

**Template:**
```tsx
<h2>Complete Your [Context] Setup</h2>

<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '20px',
  margin: '30px 0'
}}>
  <div style={{
    background: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #dee2e6'
  }}>
    <h4 style={{ marginTop: 0 }}>Product Name</h4>
    <p>Brief description highlighting why it complements the main product.</p>
    <p style={{ fontSize: '14px', color: '#666' }}>
      <strong>Key stat:</strong> Compelling data point
    </p>
    <Link
      href="/reviews/product-slug"
      style={{
        display: 'inline-block',
        background: '#28a745',
        color: 'white',
        padding: '10px 20px',
        textDecoration: 'none',
        borderRadius: '4px',
        marginTop: '10px',
        fontWeight: 'bold'
      }}
    >
      Read Full Review →
    </Link>
  </div>
  {/* Repeat for 3 related products */}
</div>
```

#### 16. Author Bio
Customize with relevant experience:

```tsx
<div style={{
  background: 'white',
  padding: '25px',
  margin: '30px 0',
  border: '1px solid #dee2e6',
  borderRadius: '8px',
  display: 'grid',
  gridTemplateColumns: '100px 1fr',
  gap: '20px',
  alignItems: 'start'
}}>
  <img
    src="/images/team/head-shot-1.jpg"
    alt="Scott Bradley, Professional Chef"
    style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
  />
  <div>
    <h3 style={{ margin: '0 0 10px 0' }}>About Scott Bradley</h3>
    <p style={{ margin: '5px 0', fontWeight: 'bold' }}>
      24 Years Professional Kitchen Experience
    </p>
    <p style={{ margin: '10px 0', fontSize: '14px', lineHeight: '1.6' }}>
      [Customize this paragraph to mention specific experience relevant to THIS product.
      For example: "Former Kitchen Manager at Mellow Mushroom with 24 years of professional kitchen experience.
      X years of [product] use in [context] proves [key finding]—not just manufacturer claims."]
    </p>
    <a href="/about" style={{ color: '#0066cc', fontWeight: 'bold', textDecoration: 'none' }}>
      Read more about my testing methodology →
    </a>
  </div>
</div>
```

### Phase 4: CTAs & Technical Implementation (30 minutes)

#### 17. Add AffiliateButton Components
Replace ALL affiliate links with AffiliateButton components:

**Above the fold (primary CTA):**
```tsx
<AffiliateButton
  href="[Amazon affiliate URL with tag=chefapprovedt-20]"
  merchant="amazon"
  product="product-slug"
  position="above_fold"
  variant="primary"
>
  Check Amazon Price →
</AffiliateButton>
```

**Mid-article (secondary CTA):**
```tsx
<AffiliateButton
  href="[Amazon affiliate URL with tag=chefapprovedt-20]"
  merchant="amazon"
  product="product-slug"
  position="mid_article"
  variant="secondary"
>
  Check Amazon Price →
</AffiliateButton>
```

**Final CTA:**
```tsx
<AffiliateButton
  href="[Amazon affiliate URL with tag=chefapprovedt-20]"
  merchant="amazon"
  product="product-slug"
  position="final_cta"
  variant="primary"
>
  Check Amazon Price →
</AffiliateButton>
```

**NEVER use raw `<a>` tags for affiliate links!**

#### 18. Add Quick Navigation
Place after FTC Disclosure, before first CTA:

```tsx
<nav className="bg-slate-50 p-4 rounded-lg mb-8 border border-slate-200"
     role="navigation" aria-label="Quick page navigation">
  <p className="font-semibold text-slate-900 mb-2">Quick Navigation:</p>
  <div className="flex flex-wrap gap-2 text-sm">
    <a href="#section-id" aria-label="Jump to section name"
       className="text-orange-600 hover:text-orange-800">Section Name</a>
    <span className="text-slate-400">|</span>
    {/* Repeat for all major sections */}
  </div>
</nav>
```

**Important:** Every link in Quick Navigation must match a section with `id="section-id"` attribute!

#### 19. Add Structured Data Schemas
At the very end of the component, before closing tags:

```tsx
{/* Structured Data */}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(generateProductReviewSchema(productData))
  }}
/>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs))
  }}
/>
```

### Phase 5: Quality Assurance (30 minutes)

#### 20. Check for Unescaped Characters
```bash
# Search for unescaped apostrophes
grep -n "It's\|don't\|won't\|can't\|I'm\|you're" app/reviews/[product-slug]/page.tsx

# Search for unescaped quotes in content
grep -n '"' app/reviews/[product-slug]/page.tsx
```

**Fix any found:**
- Replace `'` with `&apos;` in JSX content
- Replace straight quotes with proper quotes or `&quot;`
- Example: `It's` → `It&apos;s`
- Example: `chef's` → `chef&apos;s`

#### 21. Verify No Specific Prices
```bash
# Search for price patterns
grep -n '\$[0-9][0-9][0-9]\.' app/reviews/[product-slug]/page.tsx
grep -n "costs \$\|priced at\|price of \$" app/reviews/[product-slug]/page.tsx
```

**Acceptable price references:**
- Historical: "I paid $450 in 2007"
- Ranges: "$200-400 range"
- Generic: "Check current price below"

**Not acceptable:**
- Current specific prices: "costs $299.99"
- Dated claims: "only $199 right now"

#### 22. Run TypeScript Check
```bash
npx tsc --noEmit
```
Fix any type errors before proceeding.

#### 23. Run Build
```bash
npm run build
```
Verify the page builds without errors.

#### 24. Manual Review Checklist
- [ ] All affiliate links use AffiliateButton (no raw `<a>` tags)
- [ ] All internal links use Link component
- [ ] Quick Navigation links match section IDs
- [ ] All images have alt text
- [ ] Mobile-responsive (test with browser dev tools)
- [ ] No typos or grammatical errors
- [ ] Consistent voice and tone
- [ ] All dates are current
- [ ] ProductData object is complete
- [ ] Structured data validates (test with Google's Rich Results Test)

---

## Step-by-Step: Updating Existing Reviews

### Finding Reviews That Need Updates

Use these commands to identify reviews requiring improvements:

```bash
# Find reviews using raw <a> tags instead of AffiliateButton
grep -r "href=\"https://www.amazon.com" app/reviews/ --include="*.tsx" | grep -v "AffiliateButton"

# Find reviews missing productData object
grep -L "const productData" app/reviews/*/page.tsx

# Find reviews missing Quick Navigation
grep -L "Quick Navigation" app/reviews/*/page.tsx

# Find reviews missing customer testimonials
grep -L "What Real Users Are Saying\|Customer Testimonials" app/reviews/*/page.tsx

# Find reviews missing cost-per-use analysis
grep -L "Cost-Per-Use Analysis\|cost-analysis" app/reviews/*/page.tsx

# Find reviews missing performance metrics
grep -L "Performance Metrics\|Measured Performance" app/reviews/*/page.tsx

# Find reviews missing specifications table
grep -L "Complete Specifications\|Technical Specifications" app/reviews/*/page.tsx

# Find reviews missing competitor comparison
grep -L "vs. Competing\|Comparison Table" app/reviews/*/page.tsx

# Find reviews with unescaped apostrophes (common issue)
grep -r "It's\|don't\|won't\|can't" app/reviews/ --include="*.tsx"

# Find reviews with specific prices (should be removed)
grep -r "costs \$[0-9]\|priced at \$[0-9]\|\$[0-9][0-9][0-9]\." app/reviews/ --include="*.tsx"

# Count word length of reviews (to identify short reviews needing expansion)
for file in app/reviews/*/page.tsx; do
  echo "$file: $(wc -w < "$file") words"
done | sort -t: -k2 -n
```

### Assessment Phase (15 minutes)

#### 1. Read the Existing Review
Open the review file and assess current quality:
- Does it have customer testimonials? (if no → Tier 3 or below)
- Does it have cost-per-use analysis? (if no → Tier 3 or below)
- Does it have performance metrics? (if no → Tier 3 or below)
- Does it have specifications table? (if no → Tier 3 or below)
- Does it have competitor comparison? (if no → Tier 3 or below)
- Does it use AffiliateButton or raw `<a>` tags? (if `<a>` → needs update)
- Does it have Quick Navigation? (if no → needs addition)
- Does it have structured data schemas? (if no → needs addition)

#### 2. Create Update Plan
Based on assessment, create a todo list:
- [ ] Add missing imports
- [ ] Create productData object (if missing)
- [ ] Add Quick Navigation
- [ ] Add customer testimonials section
- [ ] Add cost-per-use analysis
- [ ] Add performance metrics
- [ ] Add specifications table
- [ ] Add competitor comparison table
- [ ] Replace raw affiliate links with AffiliateButton
- [ ] Add structured data schemas
- [ ] Update FAQ section with schema markup
- [ ] Add related products section
- [ ] Update author bio with product-specific context

### Implementation Phase (2-4 hours depending on current state)

#### 3. Add Missing Imports
If any of these are missing, add them:
```tsx
import { Tier2Badge } from '@/components/ReviewTierBadge'; // or Tier1Badge
import FTCDisclosure from '@/components/FTCDisclosure';
import AffiliateButton from '@/components/AffiliateButton';
import { generateProductReviewSchema, generateBreadcrumbSchema } from '@/lib/schema';
import Link from 'next/link';
```

#### 4. Create or Update productData Object
If missing, create it at the top of the component (see Phase 1, Step 4 above).

If it exists but incomplete, ensure it has all these fields:
- name
- slug
- brand
- model
- category
- priceRange (min, max, currency)
- rating
- reviewCount
- pros (array of 4-5 items)
- cons (array of 3-4 items)
- affiliateLinks (array with retailer and url)
- expertRating
- expertOpinion
- dateAdded
- lastUpdated

#### 5. Add Quick Navigation
Insert after FTC Disclosure (or after Tier Badge if no FTC Disclosure):

```tsx
<nav className="bg-slate-50 p-4 rounded-lg mb-8 border border-slate-200">
  <p className="font-semibold text-slate-900 mb-2">Quick Navigation:</p>
  <div className="flex flex-wrap gap-2 text-sm">
    <a href="#testimonials" className="text-orange-600 hover:text-orange-800">User Reviews</a>
    <span className="text-slate-400">|</span>
    <a href="#cost-analysis" className="text-orange-600 hover:text-orange-800">Cost Analysis</a>
    <span className="text-slate-400">|</span>
    <a href="#performance" className="text-orange-600 hover:text-orange-800">Performance</a>
    <span className="text-slate-400">|</span>
    <a href="#comparison" className="text-orange-600 hover:text-orange-800">vs. Competitors</a>
    <span className="text-slate-400">|</span>
    <a href="#specs" className="text-orange-600 hover:text-orange-800">Specifications</a>
    <span className="text-slate-400">|</span>
    <a href="#faq" className="text-orange-600 hover:text-orange-800">FAQ</a>
  </div>
</nav>
```

#### 6. Add Customer Testimonials Section
Find a logical place after the introduction/verdict section:

```tsx
<section className="mb-12" id="testimonials">
  <h2 className="text-3xl font-bold mb-6 text-gray-900">What Real Users Are Saying</h2>
  <p className="text-sm text-slate-600 mb-4 italic">
    Customer reviews curated from Amazon verified purchasers. These represent selected
    experiences—see complete review history at source links.
  </p>

  <div className="space-y-4">
    {/* Add 6-8 testimonial boxes here - see Phase 2, Step 9 */}
  </div>
</section>
```

Source testimonials from:
- Amazon reviews (verified purchases)
- Reddit communities (e.g., r/BuyItForLife, r/Cooking)
- Product-specific forums
- Your own observations paraphrased as customer experiences

#### 7. Add Cost-Per-Use Analysis
Place after testimonials or main review content:

```tsx
<section className="mb-12" id="cost-analysis">
  <h2 className="text-3xl font-bold mb-6 text-gray-900">Cost-Per-Use Analysis</h2>
  {/* See Phase 2, Step 10 for complete template */}
</section>
```

**Calculate honestly:**
- If you've tested for 5 years → use 5 years
- If you've tested for 6 months → project conservative lifespan
- Show your math clearly
- Compare to alternatives' total cost over same period

#### 8. Add Performance Metrics Section
Place after cost analysis:

```tsx
<section className="mb-12" id="performance">
  <h2 className="text-3xl font-bold mb-6 text-gray-900">Measured Performance Data</h2>
  {/* See Phase 2, Step 11 for complete template */}
</section>
```

**Include specific measurements:**
- Temperature accuracy (if applicable)
- Time measurements (preheat, cooking, etc.)
- Durability data (years tested, failure rates)
- Efficiency metrics
- Maintenance requirements

#### 9. Add Specifications Table
Place after performance metrics:

```tsx
<section className="mb-12" id="specs">
  <h2 className="text-3xl font-bold mb-6 text-gray-900">Complete Specifications & Dimensions</h2>
  {/* See Phase 2, Step 12 for complete template */}
</section>
```

Look up specifications from:
- Manufacturer website
- Amazon product page
- Product manual (if you have it)
- Your own measurements

#### 10. Add Competitor Comparison Table
Place after specifications:

```tsx
<section className="mb-12" id="comparison">
  <h2 className="text-3xl font-bold mb-6 text-gray-900">
    {productData.name} vs. Competing {productData.category}
  </h2>
  {/* See Phase 2, Step 13 for complete template */}
</section>
```

**Choose 2-4 direct competitors:**
- Same price range
- Same category/use case
- Popular alternatives
- Include at least one budget and one premium option

#### 11. Replace Raw Affiliate Links
Search for all instances of:
```tsx
<a href="https://www.amazon.com/..." target="_blank" rel="nofollow noopener">
```

Replace with:
```tsx
<AffiliateButton
  href="[url]"
  merchant="amazon"
  product="product-slug"
  position="[above_fold|mid_article|final_cta]"
  variant="[primary|secondary]"
>
  Check Amazon Price →
</AffiliateButton>
```

**Find all instances:**
```bash
# Use grep to find raw affiliate links
grep -n 'href="https://www.amazon.com' app/reviews/[product-slug]/page.tsx
```

#### 12. Add or Update Structured Data Schemas
At the end of the component (before closing `</article>` tag):

```tsx
{/* Structured Data */}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(generateProductReviewSchema(productData))
  }}
/>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs))
  }}
/>
```

If these already exist but productData was missing, they'll now work correctly.

#### 13. Update FAQ Section with Schema Markup
If FAQ exists but lacks schema:

Wrap the entire section in:
```tsx
<div itemScope itemType="https://schema.org/FAQPage">
  {/* existing FAQ items */}
</div>
```

Update each FAQ item to:
```tsx
<div itemScope itemProp="mainEntity" itemType="https://schema.org/Question"
     style={{ margin: '20px 0', padding: '20px', background: '#f8f9fa', borderRadius: '6px' }}>
  <h3 itemProp="name" style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
    Question text?
  </h3>
  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
    <div itemProp="text">
      <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
        Answer text...
      </p>
    </div>
  </div>
</div>
```

#### 14. Add Related Products Section
If missing, add before final CTA:

```tsx
<h2>Complete Your [Context] Setup</h2>
{/* See Phase 3, Step 15 for complete template */}
```

Choose 3 products that:
- Complement the main product
- You've actually reviewed
- Fit the same use case or kitchen setup

### Verification Phase (15 minutes)

#### 15. TypeScript Check
```bash
npx tsc --noEmit
```

#### 16. Build Test
```bash
npm run build
```

#### 17. Quality Checklist
Use the [Quality Assurance Checklist](#quality-assurance-checklist) at the end of this guide.

---

## Component Reference Guide

### AffiliateButton Component
**Location:** `@/components/AffiliateButton`

**Props:**
- `href` (required): Full affiliate URL including tracking parameters
- `merchant` (required): "amazon" | "williams-sonoma" | "sur-la-table" | etc.
- `product` (required): Product slug (matches file path)
- `position` (required): "above_fold" | "mid_article" | "final_cta" | "related_product"
- `variant` (required): "primary" | "secondary"
- `children` (required): Button text (typically "Check Amazon Price →")

**Usage:**
```tsx
<AffiliateButton
  href="https://www.amazon.com/dp/B00XXX?tag=chefapprovedt-20"
  merchant="amazon"
  product="victorinox-fibrox-8-inch-chefs-knife"
  position="above_fold"
  variant="primary"
>
  Check Amazon Price →
</AffiliateButton>
```

**Styling:**
- `variant="primary"` → Orange Amazon-style button (use for main CTAs)
- `variant="secondary"` → Blue accent button (use for mid-article CTAs)

**Tracking:**
- Automatically tracks click events
- Records merchant, product, and position for analytics
- Maintains proper affiliate attribution

### FTCDisclosure Component
**Location:** `@/components/FTCDisclosure`

**Usage:**
```tsx
<FTCDisclosure />
```

**Purpose:**
- Required by FTC for affiliate marketing
- Place after Quick Stats box, before Quick Navigation
- No props needed—fully self-contained

### ReviewTierBadge Component
**Location:** `@/components/ReviewTierBadge`

**Types:**
- `Tier1Badge` - For 15+ years of testing (9.5-10/10 quality)
- `Tier2Badge` - For 5-15 years of testing (8.5-9.5/10 quality)

**Props:**
- `testingPeriod` (required): String describing testing duration (e.g., "23 Years Daily Use")
- `showDescription` (optional): Boolean, shows additional context

**Usage:**
```tsx
<Tier2Badge testingPeriod="48 Years - 4 Different Models" showDescription={true} />
```

**Placement:**
- Place after author byline, before Quick Stats box

### Schema Generation Functions
**Location:** `@/lib/schema`

#### generateProductReviewSchema(productData)
Generates schema.org/ProductReview JSON-LD markup.

**Required productData fields:**
- name, brand, rating, reviewCount, pros, cons, expertRating, expertOpinion, dateAdded, lastUpdated

**Returns:** Object suitable for JSON.stringify in dangerouslySetInnerHTML

#### generateBreadcrumbSchema(breadcrumbs)
Generates schema.org/BreadcrumbList JSON-LD markup.

**Required breadcrumbs format:**
```tsx
const breadcrumbs = [
  { name: "Home", url: "https://www.chefapprovedtools.com" },
  { name: "Reviews", url: "https://www.chefapprovedtools.com/reviews" },
  { name: "Product Name", url: "https://www.chefapprovedtools.com/reviews/product-slug" }
];
```

**Returns:** Object suitable for JSON.stringify in dangerouslySetInnerHTML

### Link Component
**Location:** `next/link` (Next.js built-in)

**Usage for internal links:**
```tsx
import Link from 'next/link';

<Link href="/reviews/product-slug" className="text-orange-600 hover:text-orange-800 underline">
  Product Name
</Link>
```

**When to use:**
- ALL internal navigation (between pages on chefapprovedtools.com)
- Related products links
- Cross-references to other reviews
- Navigation menus

**Do NOT use for:**
- External links (Amazon, manufacturer sites, etc.)
- Anchor links within same page (use regular `<a href="#section">`)
- Affiliate links (use AffiliateButton instead)

---

## Content Writing Guidelines

### Voice & Tone
**Authoritative but approachable:**
- "I've used X for Y years..." (establish credibility)
- "Here's what actually matters..." (cut through marketing hype)
- "This won't work for everyone..." (honest limitations)

**Specific, not vague:**
- ❌ "It's very durable"
- ✅ "Used daily for 15 years without failure"

- ❌ "Great value"
- ✅ "$0.18 per use over 18 years"

- ❌ "Works really well"
- ✅ "Preheats to 350°F in 5-7 minutes with ±25°F accuracy"

**Conversational but professional:**
- Use contractions (don't, won't, it's)
- Address reader directly ("you need," "your kitchen")
- Short paragraphs (2-4 sentences)
- Bullet points for easy scanning

### Writing Structure

**Opening sentence formula:**
```
I've [used/tested/owned] [product name] [continuously/daily/weekly] for [X years]
in [context: professional kitchens/home cooking/both]. That's not [marketing claim]—
that's [X time period] of [proof/evidence/testing] that demonstrates [key finding].
```

**Examples:**
- "I've used Victorinox Fibrox chef's knives daily for 24 years in professional kitchens. That's not brand loyalty—that's over two decades of testing that proves you don't need $200 knives for professional results."

- "I've owned the same KitchenAid Commercial mixer for 24 years of daily restaurant use. That's not luck—that's nearly a quarter-century of continuous service that validates the price premium."

**Paragraph structure:**
1. State the fact/finding
2. Provide the evidence/example
3. Explain why it matters to the reader

**Example:**
"Black+Decker doesn't overcomplicate their toaster ovens with features that break. [Fact] The controls are mechanical dials—no digital displays that fail, no complicated electronics. Temperature dial, timer dial, function selector. Three controls that have proven reliable across five decades. [Evidence] This simplicity translates directly to longevity—fewer components means fewer failure points. [Why it matters]"

### Credibility Markers

**Use specific timeframes:**
- ✅ "18 years" not "many years"
- ✅ "since 2007" not "for a long time"
- ✅ "5,000+ mixing sessions" not "heavy use"

**Avoid specific prices:**
- ❌ "It costs $299.99 on Amazon"
- ❌ "Priced at $450"
- ✅ "Check current price below"
- ✅ "Budget-friendly for the category"
- ✅ "Premium pricing, but worth it for..."
- ✅ "In the $200-400 range" (acceptable for comparisons)

**Reference professional experience:**
- "In restaurant kitchens, we used [commercial equivalent]..."
- "After 24 years as a professional cook..."
- "Unlike home cooks, professionals need [feature]..."

**Acknowledge limitations honestly:**
- "This won't work if you need [specific feature]"
- "Premium models offer [X], but most home cooks don't need it"
- "If you're [use case], consider [alternative] instead"

**Cross-reference other tested products:**
- "Like my [other product you've reviewed]..."
- "While the [premium product] offers [feature], this provides 90% of the performance at 25% of the cost"
- "See my complete [bundle/category] guide for more options"

### SEO Best Practices

**Title formula:**
```
[Product Name] Review: [X Years] of [Testing Context] (2025)
```

**Examples:**
- "Black+Decker Toaster Oven Review: 48 Years Across 4 Models (2025)"
- "Victorinox Fibrox 8-Inch Chef's Knife Review: 24 Years Professional Use (2025)"
- "Le Creuset Dutch Oven Review: 15 Years in Professional Kitchens (2025)"

**Description formula:**
```
Professional chef reviews [Product Name] after [X years] of [frequency] use.
Complete [testing type] review with [unique value prop].
```

**Header hierarchy:**
- H1: Main title (one per page)
- H2: Major sections (Professional Verdict, Testimonials, Cost Analysis, etc.)
- H3: Subsections (Model 1, Model 2, What It Does Well, etc.)
- Never skip levels (don't jump from H2 to H4)

**Keyword usage:**
- Primary keyword in H1, first paragraph, and URL
- Secondary keywords in H2s and throughout content
- Natural placement—don't force or repeat awkwardly
- Focus on user intent, not keyword density

**Internal linking:**
- Link to 5-10 related reviews within the content
- Use descriptive anchor text (product names, not "click here")
- Link to category pages and guides
- Update older reviews to link to newer ones

---

## SEO & Schema Requirements

### Required Metadata
Every review must have:

```tsx
export const metadata: Metadata = {
  title: '[Product Name] Review: [X Years] of [Context] (2025)',
  description: '[150-160 character compelling summary with primary keyword]',
  openGraph: {
    title: '[Product Name] Review: [X Years] of [Context] (2025)',
    description: '[150-160 character summary]',
    type: 'article',
    url: 'https://www.chefapprovedtools.com/reviews/[product-slug]',
    images: [
      {
        url: 'https://www.chefapprovedtools.com/images/reviews/[product-slug]/featured.jpg',
        width: 1200,
        height: 630,
        alt: '[Product Name] professional review'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: '[Product Name] Review: [X Years] of [Context] (2025)',
    description: '[150-160 character summary]',
    images: ['https://www.chefapprovedtools.com/images/reviews/[product-slug]/featured.jpg']
  }
};
```

### Required Schema Markup

#### 1. ProductReview Schema
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(generateProductReviewSchema(productData))
  }}
/>
```

**Validates:**
- Product name, brand, rating
- Review author (Scott Bradley)
- Review date
- Pros and cons
- Expert opinion

**Test with:** [Google Rich Results Test](https://search.google.com/test/rich-results)

#### 2. Breadcrumb Schema
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs))
  }}
/>
```

**Provides:**
- Breadcrumb navigation in search results
- Site hierarchy for Google

#### 3. FAQPage Schema
```tsx
<div itemScope itemType="https://schema.org/FAQPage">
  {/* FAQ items with Question and Answer schema */}
</div>
```

**Benefits:**
- FAQ rich snippets in search results
- Featured snippet eligibility
- Increased SERP real estate

**Requirements:**
- Minimum 5 FAQ items (8-10 recommended)
- Each must have Question and Answer markup
- Answers should be comprehensive (100-300 words)

### URL Structure
**Format:** `/reviews/[product-slug]`

**Slug guidelines:**
- All lowercase
- Hyphens (not underscores)
- Include brand and key identifier
- 3-6 words maximum
- No stop words (the, a, an)

**Examples:**
- ✅ `/reviews/victorinox-fibrox-8-inch-chefs-knife`
- ✅ `/reviews/kitchenaid-ksm8990wh`
- ✅ `/reviews/black-decker-toaster-oven`
- ❌ `/reviews/the-best-toaster-oven`
- ❌ `/reviews/product-123`

### Image Optimization
**Requirements:**
- Alt text on ALL images
- WebP format (with JPG fallback)
- Responsive sizing
- Lazy loading for below-fold images

**Alt text formula:**
```
[Product Name] [specific detail shown] - [context if relevant]
```

**Examples:**
- "Victorinox Fibrox 8-inch chef's knife with ergonomic handle"
- "KitchenAid Commercial mixer planetary mixing action detail"
- "Black+Decker toaster oven control panel showing temperature dial"

---

## Quality Assurance Checklist

Use this checklist before publishing or updating any review:

### Structure & Components
- [ ] All required imports present
- [ ] productData object complete with all fields
- [ ] breadcrumbs array configured
- [ ] metadata export with title, description, openGraph
- [ ] Tier badge with accurate testing period
- [ ] FTC Disclosure present
- [ ] Quick Navigation with 5-6+ links
- [ ] All Quick Navigation links have matching section IDs

### Content Sections
- [ ] Professional Verdict (2-3 paragraphs)
- [ ] "Perfect For / Consider Alternatives" box
- [ ] Hero features grid (4 boxes)
- [ ] Main review content (1,500+ words)
- [ ] Customer Testimonials (6-8 reviews)
- [ ] Cost-Per-Use Analysis with calculations
- [ ] Performance Metrics with specific data
- [ ] Specifications Table (2-column)
- [ ] Competitor Comparison Table (2-4 competitors)
- [ ] Practical uses section
- [ ] Value proposition section
- [ ] FAQ section (8-10 questions with schema)
- [ ] Related products (3 items)
- [ ] Author bio

### CTAs & Links
- [ ] Above-fold AffiliateButton (position="above_fold")
- [ ] Mid-article AffiliateButton (position="mid_article")
- [ ] Final AffiliateButton (position="final_cta")
- [ ] NO raw `<a>` tags for affiliate links
- [ ] All internal links use Link component
- [ ] All external links have proper rel attributes

### Technical Requirements
- [ ] TypeScript compiles without errors (`npx tsc --noEmit`)
- [ ] Build succeeds (`npm run build`)
- [ ] ProductReview schema validates (Google Rich Results Test)
- [ ] Breadcrumb schema validates
- [ ] FAQPage schema markup correct
- [ ] All images have alt text
- [ ] Mobile responsive (test in dev tools)
- [ ] Accessibility: aria-labels on navigation

### SEO Requirements
- [ ] H1 includes product name and year
- [ ] Primary keyword in first paragraph
- [ ] Headers use proper hierarchy (H1 → H2 → H3)
- [ ] Meta description 150-160 characters
- [ ] URL slug follows conventions
- [ ] 5+ internal links to related content
- [ ] Image alt text descriptive
- [ ] Page loads in under 3 seconds

### Content Quality
- [ ] Opening establishes testing period
- [ ] Specific measurements (not vague claims)
- [ ] Professional experience referenced
- [ ] Honest limitations acknowledged
- [ ] Cross-references to other reviewed products
- [ ] No typos or grammatical errors
- [ ] Consistent voice and tone
- [ ] 2,500+ word count (Tier 2) or 3,500+ (Tier 1)

### Final Checks
- [ ] Last updated date is current
- [ ] Author bio mentions this specific product
- [ ] All dates use correct format
- [ ] **NO specific prices in content** (except historical prices in cost analysis)
- [ ] **All apostrophes escaped** (use `&apos;` not `'` in JSX)
- [ ] **All quotes properly escaped** (use `&quot;` or proper quotes `"text"`)
- [ ] Contact link works (/contact page exists)
- [ ] Newsletter link works (/newsletter page exists)
- [ ] Related product links are valid
- [ ] About page link works (/about page exists)

---

## Quick Reference: File Locations

```
Project Structure:
├── app/
│   ├── reviews/
│   │   ├── [product-slug]/
│   │   │   └── page.tsx          ← Review file
│   │   └── page.tsx               ← Reviews hub
│   ├── about/
│   │   └── page.tsx               ← About page
│   ├── contact/
│   │   └── page.tsx               ← Contact page
│   └── newsletter/
│       └── page.tsx               ← Newsletter signup
├── components/
│   ├── AffiliateButton.tsx        ← Affiliate link component
│   ├── FTCDisclosure.tsx          ← FTC disclosure
│   └── ReviewTierBadge.tsx        ← Tier badges
├── lib/
│   └── schema.ts                  ← Schema generators
└── public/
    └── images/
        ├── team/
        │   └── head-shot-1.jpg    ← Author photo
        └── reviews/
            └── [product-slug]/    ← Product images
```

---

## Common Mistakes to Avoid

### ❌ Don't Do This
1. **Using raw `<a>` tags for affiliate links**
   ```tsx
   <a href="https://amazon.com/...">Buy Now</a>  // NO!
   ```
   Use `<AffiliateButton>` instead.

2. **Including specific prices in review content**
   ```tsx
   <p>This mixer costs $399.99</p>  // NO!
   ```
   Prices change constantly. Use generic language:
   - ✅ "Check current price below"
   - ✅ "Budget-friendly pricing"
   - ✅ "Premium price point"
   - ✅ "$200-400 range" (acceptable for comparison tables)

   **Only exception:** Historical prices in cost-per-use analysis showing YOUR actual purchase price from years ago.

3. **Unescaped quotes and apostrophes**
   ```tsx
   <p>It's great for chef's knives</p>  // NO! Will break JSX
   ```
   Always escape in JSX:
   - ✅ `It&apos;s` not `It's`
   - ✅ `chef&apos;s` not `chef's`
   - ✅ `"` for quotes in JSX attributes
   - ✅ `&quot;` for quotes in content (or use proper quotes: `"text"`)

   **Search for these before committing:**
   ```bash
   grep -n "'" app/reviews/[product-slug]/page.tsx   # Find unescaped apostrophes
   grep -n '"' app/reviews/[product-slug]/page.tsx   # Find unescaped quotes
   ```

4. **Missing productData object**
   Without this, schemas won't generate and structure is weak.

5. **Vague claims without evidence**
   "Very durable" → NO. "15 years without failure" → YES.

6. **Skipping Quick Navigation**
   Long reviews need easy navigation.

7. **No section IDs for anchor links**
   Quick Navigation links go nowhere if sections lack IDs.

8. **Inconsistent testing period claims**
   Title says "10 years," content says "8 years" → Pick one and be consistent.

9. **Copy-pasting FAQ answers**
   Each answer should reference the specific product, not generic info.

10. **Missing competitor comparison**
    Readers want to know alternatives—always include 2-4 competitors.

11. **Not testing TypeScript**
    Always run `npx tsc --noEmit` before committing.

12. **Forgetting to update lastUpdated date**
    `new Date().toISOString().split('T')[0]` auto-updates, but check it compiles.

---

## Version History

**v1.0 (January 2025)**
- Initial guide based on Black+Decker and KitchenAid reviews
- Established Tier 1/2/3 quality standards
- Complete component reference
- Step-by-step workflows for creation and updates

---

## Questions or Issues?

If you encounter problems or have questions about this guide:

1. **Check existing Tier 1/2 reviews** for examples:
   - `/app/reviews/kitchenaid-ksm8990wh/page.tsx` (Tier 1)
   - `/app/reviews/black-decker-toaster-oven/page.tsx` (Tier 2)

2. **Validate schema markup**:
   - [Google Rich Results Test](https://search.google.com/test/rich-results)
   - [Schema.org validator](https://validator.schema.org/)

3. **Test builds locally**:
   ```bash
   npx tsc --noEmit  # TypeScript check
   npm run build     # Full build test
   npm run dev       # Local preview
   ```

4. **Reference component source code**:
   - `components/AffiliateButton.tsx`
   - `components/ReviewTierBadge.tsx`
   - `lib/schema.ts`

---

**Happy reviewing! 🔪**
