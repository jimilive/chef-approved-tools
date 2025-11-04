# ProductComparisonTable Component - Usage Guide

**Created:** November 4, 2025
**Based On:** Master Research Findings - "Comparison Tables are CONVERSION MACHINES"

---

## Why This Component Exists

According to conversion research:
- **2 columns with BIG images > 5 columns with tiny images**
- People love to skim - tables make scanning easy
- Focus on **specs that matter** for decision-making
- Include CTA button in each row
- Use affiliate text links in product names
- Keep it scannable and mobile-friendly

**Expected Impact:** 10-20% increase in click-through rates

---

## Component Features

✅ **Research-Backed Design:**
- 2-column comparison (main product vs 1 competitor)
- Large product images (200px desktop, 180px mobile)
- CTA buttons in each column
- Product names as clickable affiliate links
- Mobile-responsive (card layout on phones)
- Decision-making specs only (no fluff)

✅ **Conversion Optimized:**
- CTAVisibilityTracker integrated
- Multiple click opportunities (image, title, button)
- Visual badges ("Best Value", "Premium Choice")
- Highlighted standout features
- Conservative CTA text ("Check Price on Amazon")

✅ **Performance:**
- Next.js Image optimization
- Tailwind CSS (no inline styles)
- Mobile-first design
- Accessible markup

---

## Import

```tsx
import { ProductComparisonTable } from '@/components/review'
```

---

## Basic Usage Example

```tsx
// In your review page data file
export const comparisonData = {
  title: "Benriner vs OXO: Which Should You Buy?",
  subtitle: "A side-by-side comparison of the two most popular mandolines",
  mainProduct: {
    name: "Benriner Large Mandoline",
    slug: "benriner-large-mandoline", // Optional: links to your review
    affiliateUrl: "https://amzn.to/XXXXX",
    imageUrl: "/images/products/benriner-large.jpg", // Optional
    imageAlt: "Benriner Large Mandoline",
    badge: "Best Overall", // Optional
    badgeColor: "orange" // orange, green, blue, purple
  },
  competitor: {
    name: "OXO Good Grips V-Blade Mandoline",
    affiliateUrl: "https://amzn.to/XXXXX",
    badge: "Best Value", // Optional
    badgeColor: "green"
  },
  features: [
    {
      label: "Blade Quality",
      mainProduct: "High-carbon Japanese stainless steel",
      competitor: "Stainless steel (dulls faster)",
      highlightMain: true // Highlights in green
    },
    {
      label: "Thickness Settings",
      mainProduct: "Paper-thin to 5mm (precise dial)",
      competitor: "5 preset thicknesses"
    },
    {
      label: "Capacity",
      mainProduct: "Large - handles full onions/potatoes",
      competitor: "Medium - awkward for large vegetables",
      highlightMain: true
    },
    {
      label: "Price Range",
      mainProduct: "$35-45",
      competitor: "$25-35",
      highlightCompetitor: true
    },
    {
      label: "Longevity",
      mainProduct: "Stays sharp for years (professional use)",
      competitor: "Blade dulls within 1-2 years",
      highlightMain: true
    }
  ]
}

// In your review page.tsx
<ProductComparisonTable
  title={comparisonData.title}
  subtitle={comparisonData.subtitle}
  mainProduct={comparisonData.mainProduct}
  competitor={comparisonData.competitor}
  features={comparisonData.features}
  ctaText="Check Price on Amazon →"
  position="mid-content-comparison"
/>
```

---

## Props Reference

### ProductComparisonTableProps

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | string | ✅ | - | Section heading |
| `subtitle` | string | ❌ | - | Optional subheading |
| `introText` | ReactNode | ❌ | - | Optional intro paragraph |
| `mainProduct` | ComparisonProduct | ✅ | - | Your reviewed product |
| `competitor` | ComparisonProduct | ✅ | - | Competitor product |
| `features` | ComparisonFeature[] | ✅ | - | Feature comparison rows |
| `ctaText` | string | ❌ | "Check Price on Amazon →" | CTA button text |
| `position` | string | ❌ | "comparison-table" | For tracking |

### ComparisonProduct

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | Product name (becomes clickable link) |
| `slug` | string | ❌ | Internal review link (e.g., "benriner-large-mandoline") |
| `affiliateUrl` | string | ✅ | Amazon affiliate link |
| `imageUrl` | string | ❌ | Product image URL |
| `imageAlt` | string | ❌ | Image alt text (defaults to name) |
| `badge` | string | ❌ | Badge text (e.g., "Best Value", "Premium Choice") |
| `badgeColor` | 'orange' \| 'green' \| 'blue' \| 'purple' | ❌ | Badge color theme |

### ComparisonFeature

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `label` | string | ✅ | Feature name (e.g., "Blade Quality") |
| `mainProduct` | string \| ReactNode | ✅ | Main product feature value |
| `competitor` | string \| ReactNode | ✅ | Competitor feature value |
| `highlightMain` | boolean | ❌ | Highlight main product (green background) |
| `highlightCompetitor` | boolean | ❌ | Highlight competitor (green background) |

---

## Best Practices

### 1. Choose the Right Competitor

✅ **Good:**
- Direct competitor (same category, similar price)
- Popular alternative users actually consider
- Clear differentiators exist

❌ **Bad:**
- Random unrelated product
- Too expensive/cheap to be realistic alternative
- No meaningful differences to highlight

### 2. Focus on Decision-Making Specs

✅ **Good Features:**
- Blade quality
- Size/capacity
- Longevity
- Performance metrics
- Price range

❌ **Bad Features:**
- Generic Amazon title info
- Irrelevant specs
- Marketing fluff
- Things users don't care about

### 3. Be Honest

- Highlight competitor advantages (builds trust)
- Don't make up fake disadvantages
- Use real prices
- Be specific (not vague)

### 4. Keep It Scannable

- 5-7 features max (not 20)
- Short, punchy descriptions
- Use highlighting sparingly
- Mobile-friendly always

---

## Where to Place

**Optimal Locations:**
1. **After Performance Analysis** - User understands product, ready to compare
2. **Before Pros/Cons** - Natural decision point
3. **After FAQ** - User has questions answered, ready to decide

**Avoid:**
- Above the fold (too early, user doesn't understand product yet)
- Very bottom (user already decided)

---

## Example: Benriner Mandoline Comparison

```tsx
// benriner-large-mandoline-data.tsx

export const comparisonData = {
  title: "Benriner vs OXO: Head-to-Head Comparison",
  subtitle: "Two popular mandolines - which is right for your kitchen?",
  introText: (
    <>
      <p className="mb-3">
        After years of testing both mandolines in professional and home kitchens,
        here's how they stack up on the features that actually matter for everyday use.
      </p>
    </>
  ),
  mainProduct: {
    name: "Benriner Large Mandoline",
    slug: "benriner-large-mandoline",
    affiliateUrl: "https://amzn.to/47NKzE8",
    badge: "Best Overall",
    badgeColor: "orange"
  },
  competitor: {
    name: "OXO Good Grips V-Blade",
    affiliateUrl: "https://amzn.to/XXXXX",
    badge: "Best Budget",
    badgeColor: "green"
  },
  features: [
    {
      label: "Blade Sharpness",
      mainProduct: "Extremely sharp Japanese steel - stays sharp for years",
      competitor: "Sharp initially, dulls within 12-18 months",
      highlightMain: true
    },
    {
      label: "Slice Consistency",
      mainProduct: "Perfect uniform slices every time",
      competitor: "Good consistency, slight variance on thick settings",
      highlightMain: true
    },
    {
      label: "Thickness Control",
      mainProduct: "Precise dial: paper-thin to 5mm",
      competitor: "5 preset thicknesses (no fine-tuning)"
    },
    {
      label: "Vegetable Capacity",
      mainProduct: "Large - handles full potatoes/onions easily",
      competitor: "Medium - awkward with large vegetables"
    },
    {
      label: "Safety Features",
      mainProduct: "Hand guard included",
      competitor: "Hand guard + built-in safety lock",
      highlightCompetitor: true
    },
    {
      label: "Price",
      mainProduct: "$35-45",
      competitor: "$25-35",
      highlightCompetitor: true
    },
    {
      label: "Best For",
      mainProduct: "Serious cooks, professionals, precision work",
      competitor: "Budget-conscious, occasional use, safety-focused"
    }
  ]
}
```

---

## Mobile Behavior

**Desktop/Tablet (≥640px):**
- Side-by-side table layout
- Large product images (200px)
- All features visible in rows

**Mobile (<640px):**
- Card-based layout (stacked)
- Main product card first (with orange border)
- Competitor card second
- Features shown within each card
- Full-width CTA buttons

---

## Tracking

The component automatically tracks CTA visibility and clicks:

- Desktop: `{position}-main-product`, `{position}-competitor`
- Mobile: `{position}-main-product-mobile`, `{position}-competitor-mobile`

Use unique `position` values to track different comparison tables:
- `"mid-content-comparison"`
- `"after-performance-comparison"`
- `"before-faq-comparison"`

---

## TypeScript Support

Full TypeScript support included. Component will show errors if:
- Required props missing
- Invalid badge colors
- Malformed affiliate URLs

---

## Testing Checklist

Before deploying:

- [ ] Images load properly (if using imageUrl)
- [ ] Affiliate links work (click through to Amazon)
- [ ] Mobile responsive (test on actual phone)
- [ ] CTAs tracked (check analytics)
- [ ] Lighthouse score maintained (95+)
- [ ] No TypeScript errors
- [ ] Features are honest and accurate
- [ ] Product names are correct

---

## Next Steps

1. Implement on Benriner review (gold standard)
2. Test build and Lighthouse scores
3. Add to other upgraded review pages
4. Monitor conversion impact in analytics
5. Iterate based on data

---

**Last Updated:** November 4, 2025
**Component:** `/components/review/ProductComparisonTable.tsx`
**Research Source:** `/docs/MASTER-RESEARCH-FINDINGS.md` (Part 3, Part 8)
