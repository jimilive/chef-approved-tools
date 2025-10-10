# Product Review Template
## Based on Le Creuset 7.25-Qt Review Structure

This template provides the complete structure for comprehensive product reviews. Use this as the foundation for all new product reviews.

---

## File Structure

### 1. Import Statements
```typescript
import Link from 'next/link'
import { Star, CheckCircle, XCircle, Shield, Clock, DollarSign, Thermometer } from 'lucide-react'
import TestimonialsSection from '@/components/TestimonialsSection'
import { generateProductReviewSchema, generateBreadcrumbSchema } from '@/lib/schema'
import FTCDisclosure from '@/components/FTCDisclosure'
import PriceDisplay from '@/components/PriceDisplay'
import AuthorBio from '@/components/AuthorBio'
import Image from 'next/image'
```

### 2. Product Data Object
```typescript
const productData = {
  name: "[Full Product Name]",
  slug: "[product-slug]",
  brand: "[Brand Name]",
  model: "[Model Number]",
  sku: "[SKU]",
  gtin13: "[GTIN-13 barcode]",
  priceRange: {
    min: 0,
    max: 0,
    currency: "USD"
  },
  dealStatus: "normal" as const, // "normal" | "sale" | "deal"
  rating: 4.0, // Amazon customer rating
  reviewCount: 0, // Amazon review count
  category: "[Product Category]",
  pros: [
    "Benefit 1",
    "Benefit 2",
    "Benefit 3"
  ],
  cons: [
    "Limitation 1",
    "Limitation 2"
  ],
  affiliateLinks: [
    {
      retailer: "Amazon",
      url: "https://amzn.to/..."
    }
  ],
  inStock: true,
  expertRating: 4.5,
  expertOpinion: "[1-2 paragraph expert summary]",
  dateAdded: "2025-01-15",
  lastUpdated: "2025-01-15"
}
```

### 3. Optional Data Structures

**For Products with Size Variants:**
```typescript
const sizingGuide = [
  {
    size: "Small",
    serves: "1-2 people",
    use: "Use case",
    price: 100,
    rating: 4
  }
]
```

**Performance Testing:**
```typescript
const cookingTests = [
  {
    technique: "Test Name",
    rating: 5,
    notes: "Detailed observations"
  }
]
```

**Comparison Data:**
```typescript
const comparisonData = [
  {
    feature: "Price",
    thisProduct: "$100",
    competitor1: "$120",
    competitor2: "$80"
  }
]
```

**Customer Reviews:**
```typescript
const customerReviews = [
  {
    text: "Review quote",
    author: "Initials",
    date: "Month Year",
    context: "User type"
  }
]
```

**Breadcrumbs:**
```typescript
const breadcrumbs = [
  { name: "Home", url: "https://www.chefapprovedtools.com" },
  { name: "Reviews", url: "https://www.chefapprovedtools.com/reviews" },
  { name: "[Category]", url: "https://www.chefapprovedtools.com/reviews/category" },
  { name: productData.name, url: `https://www.chefapprovedtools.com/reviews/${productData.slug}` }
]
```

### 4. Metadata
```typescript
export const metadata = {
  title: "[Product Name] Review - [X] Years Professional Testing | Chef Approved",
  description: "[Product] review after [X] years of [home/professional] use. [Key specs]. Expert testing by Chef Scott Bradley.",
  keywords: ["keyword1", "keyword2", "keyword3"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.chefapprovedtools.com/reviews/[slug]',
  },
  openGraph: {
    title: "[Product Name] Review - [X] Years Professional Testing",
    description: "[Short description]",
    images: ['/images/products/[slug]/[slug]-1.jpg'],
    url: 'https://www.chefapprovedtools.com/reviews/[slug]',
    type: 'article',
    siteName: 'Chef Approved Tools',
  },
  twitter: {
    card: 'summary_large_image',
    title: "[Product Name] Review",
    description: "[Short description]",
    images: ['/images/products/[slug]/[slug]-1.jpg'],
  },
}
```

---

## Page Structure (in order)

### 1. Breadcrumbs Navigation
```tsx
<nav className="bg-white border-b border-gray-200 py-3">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <ol className="flex space-x-2 text-sm text-gray-500">
      {breadcrumbs.map((crumb, index) => (...))}
    </ol>
  </div>
</nav>
```

### 2. Hero/Summary Box (TL;DR Conversion Powerhouse)
- Product image
- Product name (H1)
- Star rating + review count
- Quick verdict paragraph
- Key specs (4 items with icons)
- Primary CTA button
- Price range

### 3. Author Bio (E-E-A-T Trust Signal)
```tsx
<AuthorBio variant="inline" />
```

### 4. Table of Contents (SEO & UX)
- Links to major sections with icons
- Helps users jump to relevant info

### 5. Introduction Section
- 2-3 paragraphs
- Overall recommendation
- Who it's for in brief
- Bottom line statement

### 6. Design and Build Quality (H2)
- 4 key feature cards with icons
- Material, construction, warranty, etc.

### 7. In-Action Performance (H2) - E-E-A-T Stories
- Real testing scenarios
- Test 1: [Specific use case]
- Test 2: [Another use case]
- Test 3: [Third use case]
- Key takeaway box

### 8. Size Selection Guide (H2) - *If applicable*
- Table with sizes, serves, use cases, prices
- Recommendation based on experience

### 9. [X] Years of Testing (H2)
- Testing environment details
- Performance results with color-coded sections:
  - ✓ Main feature 1
  - ✓ Main feature 2
  - ✓ Durability findings
  - ✓ Maintenance ease

### 10. Cooking/Performance Breakdown (H2)
- Table format
- Multiple techniques/uses tested
- Rating for each
- Key observations

### 11. Cleaning and Maintenance (H2)
- Daily cleaning steps
- What I've learned after X years
- Critical warnings (thermal shock, etc.)

### 12. Customer Reviews (H2)
- 5 curated Amazon reviews
- Include context and date
- Disclaimer about selection

### 13. Comparison Table (H2)
- vs 2 competitors
- 8-10 comparison points
- "Best For" row at bottom
- Decision guide boxes below

### 14. Newsletter CTA #1
- Lead magnet offer
- 4 bullet benefits
- Download button

### 15. Pricing & Where to Buy (H2)
```tsx
<PriceDisplay
  productName={productData.name}
  priceRange={productData.priceRange}
  dealStatus={productData.dealStatus}
  dealText="[Deal info if applicable]"
  affiliateLinks={productData.affiliateLinks}
  lastUpdated="Updated [Date]"
/>
```
- Historical pricing analysis
- Buying strategy tips

### 16. Who Is This For? (H2)
- Two-column layout
- ✅ Perfect For (5 items)
- ⚠️ Skip If You (5 items)

### 17. Pros and Cons (H2)
- Visual two-column design
- ✓ What Makes It Exceptional (6 items with icons)
- ⚠️ Important Considerations (4 items with icons)
- Budget alternative mention
- CTA after pros/cons

### 18. FAQ Section (H2)
- 6-7 common questions
- Detailed answers based on experience
- Address objections

### 19. Complementary Tools
- Related products recommendation
- Link to other review

### 20. Bottom Line - Final Verdict (H2)
- 3-4 paragraphs summary
- Rating breakdown (5 categories)
- Overall chef rating
- "Would buy again" statement
- Key takeaway
- Final CTA with social proof

### 21. Newsletter CTA #2
- Equipment buying framework
- Priority list, decision tree, calculator
- Download button

### 22. Social Proof
```tsx
<TestimonialsSection />
```

### 23. Bottom of Page CTA
- "Still Reading?" hook
- Large CTA button
- Social proof line

### 24. Footer Bio
- Author credentials
- Experience summary
- Last updated date

### 25. Final Affiliate Disclosure
```tsx
<FTCDisclosure />
```

### 26. Structured Data Scripts
```tsx
<script type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(generateProductReviewSchema(productData))
  }}
/>
<script type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs))
  }}
/>
```

---

## Image Guidelines

1. **Hero image:** `/images/products/[slug]/[slug]-1.jpg`
   - Add `priority` prop to first image
   - Portrait orientation (aspect-[2/3])
   - Width: 1000, Height: 1500

2. **Additional images:**
   - `/images/products/[slug]/[slug]-2.jpg`
   - `/images/products/[slug]/[slug]-3.jpg`
   - Same dimensions, no priority

---

## SEO Best Practices

1. **Keyword Usage:**
   - Product name in H1
   - Variations in H2s
   - Natural placement in content

2. **Content Length:**
   - Minimum 2,500 words
   - Le Creuset example: ~3,500 words

3. **Internal Linking:**
   - Link to related reviews
   - Link to buying guides
   - Link to category pages

4. **External Linking:**
   - Amazon affiliate links (nofollow)
   - Manufacturer websites
   - Comparison products

---

## Conversion Optimization Elements

1. **Multiple CTAs:**
   - Hero section (above fold)
   - After pros/cons
   - After final verdict
   - Bottom of page

2. **Social Proof:**
   - Amazon review count
   - Star ratings
   - Customer testimonials
   - Years tested

3. **Scarcity/Urgency:**
   - "Limited colors available"
   - "Price may increase"
   - Sale notifications

4. **Trust Signals:**
   - Author credentials
   - Testing duration
   - Professional experience
   - Warranty information

---

## Writing Style Guidelines

1. **Voice:**
   - First person ("I tested")
   - Professional but approachable
   - Evidence-based claims

2. **Tone:**
   - Honest (mention cons)
   - Specific (numbers, dates)
   - Helpful (recommendations)

3. **Structure:**
   - Short paragraphs (2-4 sentences)
   - Bullet points for scannability
   - Visual hierarchy with headings

---

## Checklist Before Publishing

- [ ] All product data filled accurately
- [ ] At least 3 product images added
- [ ] First image has `priority` prop
- [ ] All affiliate links tested
- [ ] Pricing verified within last week
- [ ] FAQ addresses common objections
- [ ] Comparison includes 2+ competitors
- [ ] Real testing stories included
- [ ] Pros/cons are honest and specific
- [ ] Internal links to 3+ related pages
- [ ] Metadata complete (title, description, OG)
- [ ] Structured data scripts included
- [ ] Mobile responsive checked
- [ ] CTAs work on all devices
- [ ] Spelling/grammar reviewed
