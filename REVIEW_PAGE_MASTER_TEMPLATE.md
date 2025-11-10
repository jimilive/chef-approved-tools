# Review Page Master Template

**Last Updated:** November 6, 2025  
**Purpose:** Complete guide for creating and editing product review pages  
**System:** Component-based architecture with Supabase integration

---

## 🎯 Overview

Review pages are the highest-value content on Chef Approved Tools. They generate:
- Affiliate revenue (Amazon + direct programs)
- Email signups (via EmailCaptureSection)
- SEO authority (E-E-A-T signals)
- AI search citations (structured data)

Every review page follows a **standardized component system** that ensures:
- Consistent user experience
- Easy maintenance (update component = updates all pages)
- Proper SEO/accessibility
- Clean, maintainable code

---

## 📋 Quick Reference Checklist

Before creating a new review page:
- [ ] Product added to Supabase database
- [ ] High-quality product image ready (optimized, proper dimensions)
- [ ] Testing period documented (Tier 1, 2, or 3)
- [ ] Comparison competitors researched (4 products total including yours)
- [ ] Affiliate links obtained and tested
- [ ] Product slug decided (URL-friendly, keyword-optimized)

---

## 🗂️ File Structure

### Review Page Location
```
app/reviews/[product-slug]/page.tsx
```

### Data File Location
```
app/reviews/[product-slug]/data.ts
```

### Example
```
app/reviews/vitamix-5200-professional-blender/
├── page.tsx         # Page component using templates
└── data.ts          # All content and configuration
```

---

## 📊 Component Order (Critical - Follow Exactly)

Review pages MUST use components in this order:

```tsx
export default async function ReviewPage() {
  return (
    <>
      {/* 1. TRACKING */}
      <ProductViewTrackerWrapper slug={productData.slug} />
      
      {/* 2. HERO SECTION */}
      <ReviewHero {...heroData} />
      
      {/* 3. CTA TRACKING */}
      <CTAVisibilityTracker />
      
      {/* 4. TESTING RESULTS */}
      <TestingResultsGrid results={testingResults} />
      
      {/* 5. PERFORMANCE ANALYSIS */}
      <PerformanceAnalysis sections={performanceSections} />
      
      {/* 6. PROS & CONS */}
      <ProsConsGrid pros={prosData} cons={consData} />
      
      {/* 7. WHO SHOULD BUY */}
      <WhoShouldBuyGrid items={whoShouldBuyData} />
      
      {/* 8. COMPARISON TABLE (if applicable) */}
      <ProductComparisonTable 
        products={comparisonProducts}
        highlightedProduct={productData.name}
      />
      
      {/* 9. FAQ */}
      <FAQSection faqs={faqData} />
      
      {/* 10. EMAIL CAPTURE */}
      <EmailCaptureSection />
      
      {/* 11. BOTTOM LINE */}
      <BottomLineSection content={bottomLineContent} />
      
      {/* 12. RELATED PRODUCTS */}
      <RelatedProductsGrid products={relatedProducts} />
      
      {/* 13. AUTHOR BIO */}
      <AuthorBio />
    </>
  );
}
```

**Why this order matters:**
- Hero → CTA tracking → Content creates natural user flow
- Email capture after value delivery (not at top)
- Author bio at end (establishes authority after content proves it)
- Related products after main content (keeps users on site)

---

## 🗄️ Supabase Requirements

### Required Product Data

Every product MUST have these fields in Supabase `products` table:

| Field | Type | Required | Example |
|-------|------|----------|---------|
| `id` | UUID | Yes | Auto-generated |
| `slug` | string | Yes | `vitamix-5200-professional-blender` |
| `name` | string | Yes | `Vitamix 5200 Professional Blender` |
| `brand` | string | Yes | `Vitamix` |
| `rating` | number | Yes | `5` (1-5 scale) |
| `affiliate_url` | string | Yes | `https://amzn.to/...` |
| `image_url` | string | Yes | `/images/products/vitamix-5200.jpg` |
| `short_description` | string | No | Brief product summary |
| `category` | string | Yes | `appliances`, `cookware`, `knives`, etc. |
| `tier` | number | Yes | `1`, `2`, or `3` |
| `testing_period` | string | Yes | `18+ years`, `6 months`, etc. |
| `price_tier` | string | No | `budget`, `mid-range`, `luxury` |

### Tier System

**Tier 1: Professional Kitchen Use**
- Highest credibility
- Used in actual restaurant operations
- Example: "Tested daily for 6+ years at Purple Café"

**Tier 2: Long-Term Personal Testing**
- Extensive home testing
- Multiple years of use
- Example: "5 years of daily home use"

**Tier 3: Expert Evaluation**
- Thorough research and analysis
- Based on specifications and expert knowledge
- Example: "Evaluated through professional standards and extensive research"

### Adding Products to Supabase

**Step 1: Access Supabase Dashboard**
- Go to project dashboard
- Navigate to Table Editor → `products`

**Step 2: Insert New Row**
```sql
INSERT INTO products (
  slug,
  name,
  brand,
  rating,
  affiliate_url,
  image_url,
  category,
  tier,
  testing_period
) VALUES (
  'product-name-slug',
  'Product Full Name',
  'Brand Name',
  5,
  'https://amzn.to/XXXXX',
  '/images/products/product-name.jpg',
  'appliances',
  1,
  '6+ years professional use'
);
```

**Step 3: Verify**
- Check that product appears in database
- Test that slug is URL-friendly
- Verify affiliate link works

### Fallback Handling

Always provide fallbacks for Supabase data:

```tsx
// ✅ CORRECT - Handles missing Supabase data
const product = productFromDb || {
  name: productData.name,
  rating: productData.rating,
  affiliateUrl: productData.affiliateUrl,
  // ... other fallback data
};

// ❌ WRONG - Will break if Supabase fails
const product = productFromDb;
const { name, rating } = product; // Error if productFromDb is null
```

---

## 📝 Data File Structure (data.ts)

Every review page needs a `data.ts` file with this structure:

```typescript
import { Metadata } from 'next';

// Product Core Data
export const productData = {
  slug: 'vitamix-5200-professional-blender',
  name: 'Vitamix 5200 Professional Blender',
  brand: 'Vitamix',
  rating: 5,
  affiliateUrl: 'https://amzn.to/XXXXX',
  tier: 1,
  testingPeriod: '18+ years professional use',
};

// SEO Metadata
export const metadata: Metadata = {
  title: 'Vitamix 5200 Review: 18 Years Professional Testing | Chef Approved Tools',
  description: 'Professional chef with 24 years reviews the Vitamix 5200. 18 years of daily restaurant use, honest pros/cons, and performance analysis from thousands of blends.',
  alternates: {
    canonical: 'https://chefapprovedtools.com/reviews/vitamix-5200-professional-blender',
  },
};

// Hero Section Data
export const heroData = {
  productName: productData.name,
  tagline: 'The Blender That Survived 18 Years of Restaurant Abuse',
  rating: productData.rating,
  quickVerdict: 'After 18 years of daily professional use at Purple Café...',
  tierBadge: {
    tier: productData.tier,
    label: 'Professional Kitchen Tested',
    description: 'Used daily in high-volume restaurant operations',
  },
  ctaButton: {
    text: 'Check Price on Amazon',
    url: productData.affiliateUrl,
  },
};

// Testing Results
export const testingResults = [
  {
    metric: 'Durability',
    score: 5,
    description: '18 years of daily use, still running strong',
  },
  // ... more results
];

// Performance Analysis Sections
export const performanceSections = [
  {
    title: 'Blending Performance',
    content: 'Detailed analysis paragraph...',
    subsections: [
      {
        title: 'Hot Soups',
        content: 'Specific performance details...',
      },
    ],
  },
  // ... more sections
];

// Pros
export const prosData = [
  {
    title: 'Professional-Grade Motor',
    description: 'Peak 2.0 HP motor handles everything...',
  },
  // ... more pros (5-7 total)
];

// Cons
export const consData = [
  {
    title: 'Loud Operation',
    description: "Can't run during quiet morning prep...",
  },
  // ... more cons (3-5 total)
];

// Who Should Buy
export const whoShouldBuyData = [
  {
    icon: '👨‍🍳',
    title: 'Professional Chefs',
    description: 'Need restaurant-grade performance...',
  },
  {
    icon: '🏠',
    title: 'Serious Home Cooks',
    description: 'Want equipment that lasts decades...',
  },
  {
    icon: '❌',
    title: 'Consider Alternatives If...',
    description: 'Budget-conscious or noise-sensitive...',
    isAlternative: true,
  },
];

// Comparison Products (4 total including main product)
export const comparisonProducts = [
  {
    name: 'Vitamix 5200',
    brand: 'Vitamix',
    affiliateLink: productData.affiliateUrl,
    capacity: '64 oz',
    power: '2.0 HP peak',
    warranty: '7 years',
    features: 'Variable speed, pulse, self-cleaning',
    bestFor: 'Professional-grade durability',
    priceTier: 'luxury' as const,
  },
  {
    name: 'Blendtec Designer 725',
    brand: 'Blendtec',
    affiliateLink: 'https://amzn.to/XXXXX',
    capacity: '90 oz',
    power: '3.0 HP peak',
    warranty: '8 years',
    features: 'Touchscreen, 6 pre-programmed cycles',
    bestFor: 'Largest capacity, quieter operation',
    priceTier: 'luxury' as const,
  },
  // ... 2 more competitors
];

// FAQ Data
export const faqData = [
  {
    question: 'How long does the Vitamix 5200 last?',
    answer: "I've used mine for 18 years in a professional kitchen...",
  },
  // ... more FAQs (8-12 total)
];

// Bottom Line
export const bottomLineContent = {
  recommendation: 'Buy if you want professional-grade performance...',
  finalThoughts: 'After 18 years, this is still the blender I trust...',
};

// Related Products
export const relatedProductSlugs = [
  'ninja-professional-blender',
  'blendtec-classic-575',
  'vitamix-a3500',
];
```

---

## 🔧 Component Specifications

### 1. ReviewHero

**Purpose:** Above-fold section with product image, rating, quick verdict, CTA

**Props:**
```typescript
interface ReviewHeroProps {
  productName: string;
  tagline: string;
  rating: number;
  quickVerdict: string;
  tierBadge: {
    tier: 1 | 2 | 3;
    label: string;
    description: string;
  };
  ctaButton: {
    text: string;
    url: string;
  };
  imageUrl?: string; // From Supabase, fallback to default
}
```

**Requirements:**
- Product image must be optimized (<200KB)
- Quick verdict should be 2-3 sentences maximum
- CTA text should be "Check Price on Amazon" (proven best conversion)
- Include text link under button: "View on Amazon →"

---

### 2. TestingResultsGrid

**Purpose:** Visual grid showing key metrics with scores

**Props:**
```typescript
interface TestingResult {
  metric: string;        // "Durability", "Performance", etc.
  score: number;         // 1-5
  description: string;   // Brief explanation
}

interface TestingResultsGridProps {
  results: TestingResult[];
}
```

**Requirements:**
- 4-6 metrics total
- Scores use amber-700 stars (accessibility compliant)
- Each includes aria-label for screen readers
- Descriptions should be 1 sentence

---

### 3. PerformanceAnalysis

**Purpose:** Detailed testing results and analysis

**Props:**
```typescript
interface PerformanceSection {
  title: string;
  content: string;
  subsections?: {
    title: string;
    content: string;
  }[];
}

interface PerformanceAnalysisProps {
  sections: PerformanceSection[];
}
```

**Requirements:**
- 3-5 main sections
- Each section: 2-4 paragraphs
- Use h3 for section titles (maintains heading hierarchy)
- Include specific examples from testing
- Subsections use h4 (if needed)

---

### 4. ProsConsGrid

**Purpose:** Honest assessment of strengths and limitations

**Props:**
```typescript
interface ProCon {
  title: string;
  description: string;
}

interface ProsConsGridProps {
  pros: ProCon[];
  cons: ProCon[];
}
```

**Requirements:**
- **Pros:** 5-7 items
- **Cons:** 3-5 items (every product has drawbacks)
- Titles should be specific, not generic
- Descriptions: 1-2 sentences with real details
- Be honest about cons (builds trust)

**Example:**
```tsx
// ❌ BAD - Too generic
{
  title: "Good Quality",
  description: "This product is well made."
}

// ✅ GOOD - Specific and detailed
{
  title: "Professional-Grade Motor",
  description: "2.0 HP peak motor powered through 18 years of daily restaurant use, blending hundreds of soups and smoothies per week without failure."
}
```

---

### 5. WhoShouldBuyGrid

**Purpose:** Help users self-select if product is right for them

**Props:**
```typescript
interface WhoShouldBuyItem {
  icon: string;           // Emoji
  title: string;
  description: string;
  isAlternative?: boolean; // true for "Consider Alternatives If"
}

interface WhoShouldBuyGridProps {
  items: WhoShouldBuyItem[];
}
```

**Requirements:**
- 2-3 "Who should buy" personas
- 1 "Consider alternatives if" section
- Use relevant emojis (👨‍🍳, 🏠, 💰, ⏱️, etc.)
- Descriptions: 2-3 sentences

---

### 6. ProductComparisonTable

**Purpose:** Side-by-side comparison with competitors

**Props:**
```typescript
interface ComparisonProduct {
  name: string;
  brand: string;
  affiliateLink: string;
  // Spec fields vary by product category
  [key: string]: string | number;
  priceTier: 'budget' | 'mid-range' | 'luxury';
}

interface ProductComparisonTableProps {
  products: ComparisonProduct[];
  highlightedProduct: string; // Name of your reviewed product
}
```

**Requirements:**
- **Always include 4 products total:**
  1. Your reviewed product
  2. Premium alternative (usually higher price)
  3. Mid-range alternative
  4. Budget alternative
- All must have working affiliate links
- Highlight your product (visual emphasis)
- Specs should be comparable across products
- Include "Best For" summary for each

**Spec Fields by Category:**

**Blenders:**
- capacity, power, warranty, features, bestFor

**Cookware:**
- material, weight, ovenSafe, dishwasherSafe, warranty, bestFor

**Knives:**
- bladeLength, steel, handleMaterial, weight, warranty, bestFor

**Appliances:**
- capacity, power, dimensions, warranty, features, bestFor

---

### 7. FAQSection

**Purpose:** Answer common questions, boost SEO, provide schema markup

**Props:**
```typescript
interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}
```

**Requirements:**
- 8-12 questions total
- Questions should be real customer concerns
- Answers: 2-4 sentences, specific and helpful
- Automatically generates FAQ schema markup
- Use h3 for "Frequently Asked Questions" heading
- No heading tags inside questions/answers

**Good FAQ Topics:**
- Durability/longevity
- Maintenance and cleaning
- Comparisons to competitors
- Common use cases
- Warranty and support
- Best practices for use
- Compatibility questions
- Value and pricing context

---

### 8. EmailCaptureSection

**Purpose:** Convert readers to email subscribers

**Props:** None (uses component defaults)

**Usage:**
```tsx
<EmailCaptureSection />
```

**Automatic Behavior:**
- Shows standardized copy about "11 Tools I Use Most" guide
- Integrates with ActiveCampaign
- Links to lead magnet PDF
- No custom props needed (standardized across site)

---

### 9. BottomLineSection

**Purpose:** Final recommendation and summary

**Props:**
```typescript
interface BottomLineSectionProps {
  content: {
    recommendation: string;
    finalThoughts: string;
  };
}
```

**Requirements:**
- Recommendation: 2-3 sentences, clear buy/don't buy guidance
- Final thoughts: 2-3 sentences, personal perspective
- Should reference testing period and tier
- Reinforce credibility

---

### 10. RelatedProductsGrid

**Purpose:** Cross-sell, keep users on site

**Props:**
```typescript
interface RelatedProductsGridProps {
  products: Product[]; // Fetched from Supabase by slugs
}
```

**Requirements:**
- Show 3-4 related products
- Products should be:
  - Same category OR
  - Complementary items OR
  - Alternative options
- Fetched from Supabase by slug
- Each card shows: image, name, rating, quick description, CTA

**Page Implementation:**
```tsx
// In page.tsx
const relatedProducts = await getProductsBySlugs([
  'ninja-professional-blender',
  'vitamix-a3500',
  'blendtec-classic-575',
]);
```

---

### 11. AuthorBio

**Purpose:** E-E-A-T signal, credibility, link to about page

**Props:** None (uses component defaults)

**Usage:**
```tsx
<AuthorBio />
```

**Automatic Behavior:**
- Shows Scott's headshot
- Professional credentials
- 24 years experience
- Link to testing methodology
- No custom props needed (standardized across site)

---

## 🔗 Comparison Table Implementation

### When to Include

**Always include comparison tables when:**
- Product has clear direct competitors
- You can find 3-4 comparable alternatives
- Alternatives have affiliate links available
- Products are in same category/price tier

**Skip comparison tables when:**
- Product is truly unique (no alternatives)
- Can't find 4 quality comparisons
- Affiliate links not available for alternatives

### Research Process

**Step 1: Identify Competitors**

Use this hierarchy:
1. **Direct competitors** (same category, similar price)
2. **Premium alternative** (step up in price/quality)
3. **Budget alternative** (step down in price)
4. **Different approach** (solves same problem differently)

**Example for Vitamix 5200:**
1. Blendtec Designer 725 (direct competitor)
2. Vitamix A3500 (premium alternative)
3. Ninja Professional Plus (budget alternative)
4. (Would be a food processor if solving "blending" differently)

**Step 2: Gather Specifications**

For each competitor, collect:
- Official product specs from manufacturer
- Key differentiating features
- Warranty information
- Dimensions/capacity
- Price tier classification
- What makes it the "best for" option

**Step 3: Obtain Affiliate Links**

- Check Amazon Associates for all 4 products
- Check manufacturer affiliate programs (CJ, ShareASale, etc.)
- Use highest commission option
- Test all links before deployment

**Step 4: Structure Comparison Data**

```tsx
export const comparisonProducts = [
  {
    name: 'Your Product',
    brand: 'Brand',
    affiliateLink: 'https://amzn.to/...',
    // Specs relevant to THIS category
    spec1: 'value',
    spec2: 'value',
    bestFor: 'What makes this the best choice',
    priceTier: 'luxury' as const,
  },
  // ... 3 more competitors
];
```

### Comparison Specs by Category

**Cookware (Pans, Pots, Dutch Ovens):**
```tsx
{
  capacity: '7.25 Qt',
  weight: '12.8 lbs',
  dimensions: '11.5" diameter x 7.5" tall',
  material: 'Enameled cast iron',
  ovenSafe: 'Up to 500°F',
  dishwasherSafe: 'Hand wash recommended',
  warranty: 'Lifetime',
  madeIn: 'France',
  bestFor: 'Professional durability and even heating',
  priceTier: 'luxury',
}
```

**Knives:**
```tsx
{
  bladeLength: '8 inches',
  steel: 'German X50CrMoV15',
  handleMaterial: 'Fibrox',
  weight: '5.3 oz',
  rockwellHardness: '56 HRC',
  warranty: 'Lifetime',
  madeIn: 'Switzerland',
  bestFor: 'Professional kitchens requiring durability',
  priceTier: 'mid-range',
}
```

**Appliances (Blenders, Mixers, Food Processors):**
```tsx
{
  capacity: '64 oz',
  power: '2.0 HP peak',
  dimensions: '20.5" H x 8.75" W',
  weight: '10.5 lbs',
  speedSettings: 'Variable + Pulse',
  warranty: '7 years full',
  features: 'Self-cleaning, variable speed control',
  bestFor: 'Professional-grade blending power',
  priceTier: 'luxury',
}
```

**Tools & Gadgets:**
```tsx
{
  material: 'Stainless steel',
  dimensions: '6" x 4"',
  weight: '3.2 oz',
  dishwasherSafe: 'Yes',
  warranty: 'Lifetime',
  features: 'Ergonomic handle, hanging hole',
  bestFor: 'Professional kitchen durability',
  priceTier: 'budget',
}
```

### Price Tier Definitions

```typescript
type PriceTier = 'budget' | 'mid-range' | 'luxury';

// Budget: Under $50 (or bottom 25% of category)
// Mid-range: $50-150 (or middle 50% of category)
// Luxury: $150+ (or top 25% of category)
```

Adjust ranges by category:
- **Knives:** Budget <$30, Mid $30-100, Luxury $100+
- **Cookware:** Budget <$50, Mid $50-200, Luxury $200+
- **Appliances:** Budget <$100, Mid $100-300, Luxury $300+

---

## 📱 Metadata & Schema

### Required Metadata (In data.ts)

```typescript
export const metadata: Metadata = {
  title: '[Product Name] Review: [Key Benefit] | Chef Approved Tools',
  description: 'Professional chef with 24 years reviews [product]. [Testing period], honest pros/cons, [specific detail].',
  alternates: {
    canonical: 'https://chefapprovedtools.com/reviews/[product-slug]',
  },
  openGraph: {
    title: '[Product Name] Review: [Key Benefit]',
    description: '[Same as meta description]',
    images: ['/images/products/[product-image].jpg'],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: '[Product Name] Review: [Key Benefit]',
    description: '[Same as meta description]',
    images: ['/images/products/[product-image].jpg'],
  },
};
```

### Schema Markup

**Automatically generated by components:**
- Product schema (from ReviewHero)
- FAQ schema (from FAQSection)
- Breadcrumb schema (from layout)

**Required fields for Product schema:**
- name ✅
- image ✅
- description ✅
- brand ✅
- aggregateRating (rating + reviewCount) ✅
- offers (price, availability, url) ✅

**Validation:**
- Test at https://validator.schema.org/
- Test at https://search.google.com/test/rich-results
- Fix all errors before deployment

---

## ✅ Pre-Deployment Checklist

### Content Complete
- [ ] Product added to Supabase with all required fields
- [ ] Testing period documented and accurate
- [ ] All sections written (hero, testing, performance, pros/cons, FAQ, etc.)
- [ ] 8-12 FAQs written and answered
- [ ] Comparison table with 4 products (if applicable)
- [ ] Related products identified (3-4 products)
- [ ] All affiliate links obtained and tested

### SEO & Accessibility
- [ ] Title unique and <60 characters
- [ ] Meta description unique (<80% similarity) and 150-160 characters
- [ ] Canonical URL correct
- [ ] All special characters escaped (apostrophes, quotes)
- [ ] Heading hierarchy sequential (h1 → h2 → h3)
- [ ] All links use orange-700 (not orange-600)
- [ ] Star ratings use amber-700 (not yellow-400)
- [ ] All images have descriptive alt text

### Technical
- [ ] Page builds without errors (`npm run build`)
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] Schema validates without errors
- [ ] All affiliate links work and track properly
- [ ] Mobile responsive (test on real device)
- [ ] Lighthouse score >90 all categories

### Components Present
- [ ] ProductViewTrackerWrapper
- [ ] ReviewHero
- [ ] CTAVisibilityTracker
- [ ] TestingResultsGrid
- [ ] PerformanceAnalysis
- [ ] ProsConsGrid
- [ ] WhoShouldBuyGrid
- [ ] ProductComparisonTable (if applicable)
- [ ] FAQSection
- [ ] EmailCaptureSection
- [ ] BottomLineSection
- [ ] RelatedProductsGrid
- [ ] AuthorBio

---

## 🚨 Common Mistakes

### Mistake #1: Wrong Component Order
**Problem:** Components in random order, breaks user flow

**Solution:** Follow the exact order in this template

### Mistake #2: Missing Supabase Data
**Problem:** Page breaks because product not in database

**Solution:** Always add product to Supabase BEFORE creating page

### Mistake #3: Generic Pros/Cons
**Problem:** "Good quality", "Works well" - meaningless

**Solution:** Use specific details from actual testing

### Mistake #4: No Comparison Table
**Problem:** Missing cross-sell opportunities and SEO value

**Solution:** Research 3-4 competitors, add comparison table

### Mistake #5: Skipping Email Capture
**Problem:** Not converting readers to subscribers

**Solution:** Always include EmailCaptureSection component

### Mistake #6: Poor FAQ Questions
**Problem:** Made-up questions no one asks

**Solution:** Use real customer questions from Amazon reviews, forums, search queries

### Mistake #7: Breaking Character Encoding
**Problem:** Titles break at apostrophes

**Solution:** Always escape special characters (see SEO_AND_ACCESSIBILITY_REQUIREMENTS.md)

### Mistake #8: No Related Products
**Problem:** Users leave site after reading

**Solution:** Always include 3-4 related products to keep them browsing

---

## 📊 Performance Benchmarks

**Target Metrics:**
- Lighthouse Performance: >90
- Lighthouse Accessibility: 100
- Lighthouse Best Practices: 100
- Lighthouse SEO: 100
- Time to Interactive: <3 seconds
- Largest Contentful Paint: <2.5 seconds

**How to achieve:**
- Use ISR caching (revalidate: 3600)
- Optimize images (<200KB each)
- Lazy load below-fold images
- Use component system (reduces bundle size)
- Proper code splitting (automatic with Next.js)

---

## 🔄 Updating Existing Reviews

### When to Update

**Immediate updates needed when:**
- Product version changes (new model released)
- Price dramatically changes
- Manufacturer changes warranty
- Product discontinued
- Competitor launches better alternative

**Quarterly review (every 3 months):**
- Top 10 traffic-generating products
- Check all affiliate links still work
- Update any outdated information
- Refresh comparison table if needed

**Annual re-testing:**
- Flagship products (Vitamix, Le Creuset, etc.)
- Add long-term testing notes
- Update testing period
- Refresh photos if available

### How to Update

1. Open existing data.ts file
2. Update necessary information
3. Add note in Performance Analysis: "Updated [date]: [what changed]"
4. Update metadata with new date if substantial changes
5. Re-run build to verify no errors
6. Test page on staging
7. Deploy

---

## 📚 Related Documentation

**Reference these documents when creating reviews:**

- **SEO_AND_ACCESSIBILITY_REQUIREMENTS.md** - Title/meta standards, accessibility rules
- **COMPONENT_PROP_INTERFACES.md** - Component specifications and TypeScript interfaces
- **CONTENT_GUIDELINES.md** - Voice, tone, content strategy
- **STYLE_GUIDE.md** - Design system, colors, styling
- **.clauderc** - Protection rules (what NOT to do)

---

## 💡 Pro Tips

1. **Write the comparison table first** - Helps you understand product positioning
2. **Real testing details beat marketing speak** - Specific examples > generic claims
3. **Honest cons build trust** - Don't be afraid to mention limitations
4. **FAQ answers should be helpful** - Not just SEO keyword stuffing
5. **Email capture timing matters** - After value delivery, not at top
6. **Related products keep users engaged** - Don't end with dead-end page
7. **Component order creates flow** - Trust the tested structure
8. **Supabase is required** - Not optional, pages won't work without it

---

## 🎯 Success Metrics

**A successful review page:**
- Ranks on page 1 of Google for target keyword
- Generates email signups (>2% conversion)
- Drives affiliate clicks (>5% CTR on CTAs)
- Gets cited by AI search tools (ChatGPT, Perplexity)
- Maintains 100 accessibility score
- Loads in <2.5 seconds (LCP)

**Track these metrics:**
- Google Search Console impressions/clicks
- Email signup conversion rate
- Affiliate click-through rate
- Time on page (target: >2 minutes)
- Bounce rate (target: <40%)

---

**Last Updated:** November 6, 2025

*This template represents 300+ hours of testing, optimization, and refinement. Follow it exactly for best results.*
