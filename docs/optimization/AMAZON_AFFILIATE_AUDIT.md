# AMAZON AFFILIATE AUDIT

**Generated:** October 10, 2025
**Purpose:** Document current Amazon affiliate link implementation for Netlify to Vercel migration

---

## EXECUTIVE SUMMARY

Amazon affiliate links are **CRITICAL** to revenue. This site uses a sophisticated affiliate tracking system with the AffiliateButton component, affiliate tag management, and position-based tracking.

### Key Findings:
- ✅ **Affiliate tag in use:** `chefapprovedtools-20`
- ✅ **Component-based system:** AffiliateButton handles all Amazon links
- ✅ **Position tracking:** above_fold, mid_article, final_cta, comparison_table, related_products
- ✅ **54 files** contain Amazon links
- ✅ **18 active review pages** with affiliate links
- ⚠️ **Environment variable:** `AMAZON_ASSOCIATE_TAG` must be set in Vercel

---

## HOW AMAZON LINKS CURRENTLY WORK

### 1. Affiliate Tag Management

**File:** `/lib/amazon-affiliates.ts`

```typescript
export const AMAZON_TAG = process.env.AMAZON_ASSOCIATE_TAG || 'chefapprovedtools-20'
```

- **Default tag:** `chefapprovedtools-20`
- **Fallback:** Hardcoded if env var missing
- **Functions:**
  - `extractASIN()` - Extracts product ASIN from URL
  - `buildAffiliateUrl()` - Adds affiliate tag + UTM parameters
  - Supports multiple Amazon domains (US, UK, CA, DE, FR, IT, ES, JP)

### 2. AffiliateButton Component

**File:** `/components/AffiliateButton.tsx`

**Key Features:**
- Client-side component ('use client')
- Tracks clicks with `trackAffiliateClick()` function
- Supports multiple merchants (amazon, williams_sonoma, kitchenaid_direct, sur_la_table, other)
- **Currently only Amazon tracking is implemented**
- Position tracking for conversion optimization

**Props:**
```typescript
{
  href: string,
  merchant: 'amazon' | 'williams_sonoma' | 'kitchenaid_direct' | 'sur_la_table' | 'other',
  product: string,
  position: 'above_fold' | 'mid_article' | 'final_cta' | 'comparison_table' | 'related_products',
  price?: number,
  children: React.ReactNode,
  variant?: 'primary' | 'secondary' | 'outline'
}
```

**Example Usage:**
```tsx
<AffiliateButton
  href="https://amzn.to/431ZFDl"
  merchant="amazon"
  product="kitchenaid-ksm8990wh"
  position="above_fold"
  price={849}
  variant="secondary"
>
  Check Amazon Price →
</AffiliateButton>
```

### 3. Affiliate Link Patterns

#### Amazon Short Links (amzn.to)
- **Pattern:** `https://amzn.to/[SHORT_CODE]`
- **Example:** `https://amzn.to/431ZFDl`
- **Usage:** Most common in review pages
- **Advantage:** Short, trackable, clean

#### Direct Amazon Links
- **Pattern:** `https://amazon.com/[path]?tag=chefapprovedtools-20`
- **Usage:** Less common, mostly in older content
- **Contains:** Direct product URLs with affiliate tag appended

---

## REVIEW PAGES WITH AMAZON LINKS

All 18 review pages contain Amazon affiliate links:

1. `/app/reviews/winco-heavy-duty-tongs/page.tsx`
2. `/app/reviews/benriner-large-mandoline/page.tsx`
3. `/app/reviews/victorinox-fibrox-10-inch-chefs-knife/page.tsx`
4. `/app/reviews/victorinox-4-inch-paring-knife/page.tsx`
5. `/app/reviews/john-boos-platinum-commercial-cutting-board/page.tsx`
6. `/app/reviews/victorinox-fibrox-8-inch-chefs-knife/page.tsx`
7. `/app/reviews/wusthof-classic-ikon-16-piece/page.tsx`
8. `/app/reviews/lodge-seasoned-cast-iron-3-skillet-bundle/page.tsx`
9. `/app/reviews/victorinox-offset-bread-knife/page.tsx`
10. `/app/reviews/gold-textiles-bar-mops/page.tsx`
11. `/app/reviews/le-creuset-signature-7-25-qt-dutch-oven/page.tsx`
12. `/app/reviews/vitamix-5200/page.tsx`
13. `/app/reviews/oxo-good-grips-swivel-peeler/page.tsx`
14. `/app/reviews/oxo-good-grips-bench-scraper/page.tsx`
15. `/app/reviews/victorinox-granton-edge-boning-knife/page.tsx`
16. `/app/reviews/robot-coupe-r2-dice/page.tsx`
17. `/app/reviews/kitchenaid-ksm8990wh/page.tsx`
18. `/app/reviews/epicurean-kitchen-cutting-board/page.tsx`

---

## AFFILIATE LINK POSITIONS

### Position Strategy (for conversion optimization):

1. **above_fold** - Primary CTA before scrolling
2. **mid_article** - After key content sections
3. **final_cta** - Bottom of page, last conversion opportunity
4. **comparison_table** - Within product comparison tables
5. **related_products** - In cross-sell sections

**Example from KitchenAid review:**
- Above fold: Line 193-202 (Primary CTA in highlighted box)
- Mid article: Not present in this review
- Final CTA: Line 863-873 (Bottom conversion box)

---

## OTHER PAGES WITH AMAZON LINKS

- `/app/page.tsx` - Homepage
- `/app/best-budget-chef-knife/page.tsx`
- `/app/kitchen-bundle/page.tsx`
- `/app/test-tracking/page.tsx`
- `/app/guides/best-chef-knives/page.tsx`
- `/app/knives/page.tsx`
- `/app/best-knife-for-cutting-meat/page.tsx`
- `/app/products/[id]/page.tsx` - Dynamic product pages
- `/components/PerformanceOptimizer.tsx`
- `/components/TopPicksComparison.tsx`
- `/data/products.ts` - Product data structure

---

## REDIRECT PATTERNS FOR AFFILIATE TRACKING

### Netlify Configuration (netlify.toml):
```toml
[[redirects]]
  from = "/go/amazon/*"
  to = "https://amazon.com/:splat"
  status = 302
  force = true
```

### Vercel Configuration (vercel.json):
```json
{
  "source": "/go/amazon/:path*",
  "destination": "https://amazon.com/:path*",
  "statusCode": 302
}
```

**Purpose:** Future implementation for click tracking through custom redirects
**Status:** Configured but **NOT currently used** - all links use direct amzn.to URLs

---

## CRITICAL DEPENDENCIES

### 1. Environment Variables
```
AMAZON_ASSOCIATE_TAG=chefapprovedtools-20
```
**MUST be set in Vercel environment variables!**

### 2. Tracking Functions
**File:** `/lib/tracking.ts` (referenced in AffiliateButton)
- `trackAffiliateClick(merchant, product, position, price)` - Logs affiliate clicks

### 3. Analytics Integration
**File:** `/lib/analytics.ts`
- Integrates with Google Analytics for conversion tracking
- Requires `NEXT_PUBLIC_GA_ID` environment variable

---

## REVENUE PROTECTION CHECKLIST

For migration to Vercel, ensure:

- [ ] `AMAZON_ASSOCIATE_TAG=chefapprovedtools-20` set in Vercel environment variables
- [ ] All AffiliateButton components render correctly
- [ ] `/go/amazon/*` redirects configured in vercel.json (for future use)
- [ ] Click tracking functions work in production
- [ ] Test affiliate links on staging before production deploy
- [ ] Verify `amzn.to` short links resolve correctly
- [ ] Check that affiliate tag appears in final destination URLs

---

## FILES TO PRESERVE

**CRITICAL - DO NOT DELETE OR MODIFY WITHOUT APPROVAL:**

1. `/components/AffiliateButton.tsx` - Core affiliate button component
2. `/lib/amazon-affiliates.ts` - Affiliate tag and URL building logic
3. `/lib/tracking.ts` - Click tracking implementation
4. `/lib/analytics.ts` - Analytics integration
5. All `/app/reviews/*/page.tsx` files - Contain revenue-generating links

---

## MIGRATION RISKS

### 🔴 HIGH RISK
- **Lost affiliate tag:** If env var not set, revenue tracking breaks
- **Broken AffiliateButton:** Component failure = no affiliate links display
- **Tracking failure:** Lost conversion data hurts optimization

### 🟡 MEDIUM RISK
- **Redirect changes:** /go/amazon/* pattern not currently used but configured
- **Build failures:** Component errors could block deployment

### 🟢 LOW RISK
- **Short link changes:** amzn.to links are Amazon-managed, not site-dependent

---

## TESTING STRATEGY

After Vercel deployment:

1. **Smoke test** - Click affiliate links on 3 sample review pages
2. **Verify tracking** - Check Google Analytics for affiliate click events
3. **Inspect URLs** - Ensure `tag=chefapprovedtools-20` appears in final destination
4. **Test positions** - Verify above_fold, mid_article, final_cta all work
5. **Mobile test** - Check button rendering on mobile devices

---

## NOTES FOR VERCEL MIGRATION

1. **Environment variables:** Set via Vercel dashboard (Settings → Environment Variables)
2. **Redirects:** Already configured in vercel.json (lines 5-9)
3. **No code changes needed** - Affiliate system is platform-agnostic
4. **Header configuration:** No special headers needed for affiliate links

---

**END OF AMAZON AFFILIATE AUDIT**
