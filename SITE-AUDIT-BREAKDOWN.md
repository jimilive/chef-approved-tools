# Chef Approved Tools - Complete Site Audit Breakdown

## TECHNOLOGY STACK

### Core Framework
- **Next.js**: v14.2.32 (App Router)
- **React**: 18.3.1
- **TypeScript**: 5.4.5
- **Node.js**: 20.14.10

### Styling & UI
- **Tailwind CSS**: 3.4.1
- **PostCSS**: 8.4.35
- **Autoprefixer**: 10.4.20
- **Headless UI**: 2.2.8 (accessible components)
- **Heroicons**: 2.2.0
- **Lucide React**: 0.542.0 (icon library)

### Utilities & Libraries
- **clsx**: 2.1.0 (conditional classNames)
- **date-fns**: 3.0.0 (date formatting)
- **Sharp**: 0.33.0 (image optimization)
- **Cloudinary**: 2.7.0 (image hosting)

### Testing & Quality
- **Jest**: 29.7.0
- **Testing Library**: React 14.0.0, Jest DOM 6.0.0
- **ESLint**: 8.57.0
- **Lighthouse**: 12.8.2
- **Axe Core CLI**: 4.10.2 (accessibility testing)
- **Linkinator**: 6.1.4 (broken link checking)
- **HTML Validator CLI**: 2.0.0

### Build & Optimization
- **Critters**: 0.0.23 (critical CSS inlining)
- **Next.js Turbo**: Enabled (experimental)
- **CSS Optimization**: Enabled (experimental)
- **Scroll Restoration**: Enabled (experimental)

---

## SITE STRUCTURE

### Total Pages: 75

#### Core Pages (9)
1. Homepage (/)
2. About (/about)
3. Contact (/contact)
4. Methodology (/methodology)
5. Review Tiers (/review-tiers)
6. Newsletter (/newsletter)
7. Glossary (/glossary)
8. Disclosure (/disclosure)
9. Kitchen Bundle (/kitchen-bundle)

#### Category Landing Pages (3)
10. Knives (/knives)
11. Cookware (/cookware)
12. Appliances (/appliances)

#### Guide Pages (6)
13. Guides Hub (/guides)
14. Best Chef Knives (/guides/best-chef-knives)
15. Best Cookware (/guides/best-cookware)
16. Kitchen Appliances (/guides/kitchen-appliances)
17. Knife Care (/guides/knife-care)
18. Cookware Materials (/guides/cookware-materials)
19. Affordable Kitchen Appliances (/guides/affordable-kitchen-appliances)

#### Blog Pages (9)
20. Blog Hub (/blog)
21. Best Scrambled Eggs (/blog/best-scrambled-eggs)
22. Perfect French Press Coffee (/blog/how-to-make-perfect-french-press-coffee)
23. Sear Steaks Like Restaurant Chef (/blog/how-to-sear-steaks-like-restaurant-chef)
24. Sharpen With Tri-Stone (/blog/how-to-sharpen-with-tri-stone)
25. How To Steel A Knife (/blog/how-to-steel-a-knife)
26. Kitchen Gloves Guide (/blog/kitchen-gloves-guide)
27. Meat Cooking Temperatures (/blog/meat-cooking-temperatures-thermometers)
28. Why Chefs Use Kosher Salt (/blog/why-professional-chefs-use-kosher-salt)

#### Review Pages (27)
29. Reviews Hub (/reviews)

**Tier 1 - Professional Kitchen Tested (16 reviews):**
30. KitchenAid KSM8990WH Commercial Mixer (/reviews/kitchenaid-ksm8990wh)
31. Vitamix 5200 Blender (/reviews/vitamix-5200)
32. Robot Coupe R2 Dice Food Processor (/reviews/robot-coupe-r2-dice)
33. Victorinox Fibrox 8" Chef Knife (/reviews/victorinox-fibrox-8-inch-chefs-knife)
34. Wüsthof Classic Ikon 16 Piece Set (/reviews/wusthof-classic-ikon-16-piece)
35. Victorinox Fibrox 10" Chef Knife (/reviews/victorinox-fibrox-10-inch-chefs-knife)
36. Diamond Crystal Kosher Salt (/reviews/diamond-crystal-kosher-salt)
37. Norton IM200 Tri-Stone Sharpener (/reviews/norton-im200-tri-stone-sharpener)
38. Bodum Chambord French Press (/reviews/bodum-chambord-french-press)
39. Victorinox Offset Bread Knife (/reviews/victorinox-offset-bread-knife)
40. Benriner Large Mandoline (/reviews/benriner-large-mandoline)
41. OXO Good Grips Bench Scraper (/reviews/oxo-good-grips-bench-scraper)
42. OXO Good Grips Swivel Peeler (/reviews/oxo-good-grips-swivel-peeler)
43. Victorinox 4" Paring Knife (/reviews/victorinox-4-inch-paring-knife)
44. Victorinox Granton Edge Boning Knife (/reviews/victorinox-granton-edge-boning-knife)
45. ZUPERIA Bar Mops (/reviews/zuperia-bar-mops)

**Tier 2 - Home Tested (11 reviews):**
46. Le Creuset 7.25-Qt Dutch Oven (/reviews/le-creuset-signature-7-25-qt-dutch-oven)
47. John Boos Platinum Cutting Board (/reviews/john-boos-platinum-commercial-cutting-board)
48. Lodge Cast Iron 3-Skillet Bundle (/reviews/lodge-seasoned-cast-iron-3-skillet-bundle)
49. KitchenAid KP26M1XLC Professional 600 (/reviews/kitchenaid-kp26m1xlc-professional-600)
50. Nordic Ware Half Sheet Pan (/reviews/nordic-ware-half-sheet-pan)
51. Cuisinart DLC-10C Classic Food Processor (/reviews/cuisinart-dlc-10c-classic-food-processor)
52. Black+Decker Toaster Oven (/reviews/black-decker-toaster-oven)
53. Epicurean Kitchen Cutting Board (/reviews/epicurean-kitchen-cutting-board)
54. Winco Heavy Duty Tongs (/reviews/winco-heavy-duty-tongs)
55. Cuisinart 8" Nonstick Pan (/reviews/cuisinart-8-inch-nonstick-pan)
56. Method All-Purpose Cleaner (/reviews/method-all-purpose-cleaner)

#### SEO Landing Pages (2)
57. Best Budget Chef Knife (/best-budget-chef-knife)
58. Best Knife For Cutting Meat (/best-knife-for-cutting-meat)

#### Legal Pages (3)
59. Privacy Policy (/privacy-policy)
60. Terms (/terms)
61. Cookie Policy (/cookie-policy)

#### Test Pages (4)
62. Test (/test)
63. Test Conversion (/test-conversion)
64. Test DataLayer (/test-datalayer)
65. Test Tracking (/test-tracking)

#### API Routes (3)
66. /api/contact
67. /api/newsletter
68. /api/check-links

#### Dynamic Routes (1)
69. /products/[id]

#### Static Files (6)
70. /manifest.json
71. /robots.txt
72. /sitemap.xml
73. /_not-found
74-75. Additional system routes

---

## COMPONENT ARCHITECTURE

### Analytics & Tracking Components (5)
- **ProductImpressionTracker.tsx** - Tracks product impressions for GA4
  - Props: productName, productSlug, category, brand?, price?, position?, listName?
- **CTAVisibilityTracker.tsx** - Tracks CTA visibility and engagement
  - Props: ctaId, position, productSlug?, merchant?, children
- **ProductViewTracker.tsx** - Tracks product page views
- **ScrollTracker.tsx** - Tracks scroll depth
- **Analytics.tsx** - Google Tag Manager integration

### Affiliate & CTA Components (4)
- **AffiliateButton.tsx** - Primary affiliate link component with A/B testing
  - Props: href, merchant, product, position, variant, className?, children
- **AffiliateButtonVariations.tsx** - A/B test variant buttons
- **EmailSignupButton.tsx** - Newsletter signup CTA
- **StickyMobileCTA.tsx** - Mobile sticky bottom CTA

### Product Display Components (9)
- **ProductCard.tsx** - Individual product card
- **LazyProductCard.tsx** - Lazy-loaded product card
- **InteractiveProductCard.tsx** - Interactive hover states
- **ProductGrid.tsx** - Grid layout for products
- **TopPicksComparison.tsx** - Compare top products
- **ComparisonTable.tsx** - Detailed comparison tables
- **ProductImage.tsx** - Optimized product images
- **ProductImageGallery.tsx** - Image galleries
- **RecentlyViewed.tsx** - Recently viewed products sidebar

### Review & Rating Components (5)
- **ReviewTierBadge.tsx** - Tier 1/Tier 2 badges
  - Exports: Tier1Badge, Tier2Badge
- **StarRating.tsx** - Star rating display
- **TestimonialsSection.tsx** - Customer testimonials
- **PriceDisplay.tsx** - Dynamic price display
- **PriceTracker.tsx** - Price history tracking
- **PrimeBadge.tsx** - Amazon Prime badge

### Navigation & Layout Components (5)
- **Header.tsx** - Site header with navigation
- **Footer.tsx** - Site footer
- **JumpNavigation.tsx** - Jump links for long pages
- **CategoryCards.tsx** - Category landing cards
- **BreadcrumbSchema.tsx** - Breadcrumb navigation with schema

### Conversion Optimization Components (6)
- **ConversionOptimizer.tsx** - A/B testing framework
- **ConversionBanner.tsx** - Conversion-focused banners
- **ExitIntentModal.tsx** - Exit intent popup
- **ExitIntentWrapper.tsx** - Wrapper for exit intent
- **NewsletterModal.tsx** - Newsletter popup
- **TrustIndicators.tsx** - Trust signals
- **TrustSignals.tsx** - Additional trust badges

### Schema & SEO Components (5)
- **ProductSchema.tsx** - Product structured data
- **ReviewSchema.tsx** - Review structured data
- **FAQSchema.tsx** - FAQ structured data
- **BreadcrumbSchema.tsx** - Breadcrumb structured data
- **StructuredData.tsx** - General structured data wrapper

### Content Components (8)
- **FTCDisclosure.tsx** - FTC affiliate disclosure
- **AuthorBio.tsx** - Author biography box
- **FAQ.tsx** - FAQ component
- **Newsletter.tsx** - Newsletter signup form
- **ChefsPickHeroBox.tsx** - Featured product hero
- **BudgetVsPremiumMagnet.tsx** - Budget comparison widget
- **SearchBar.tsx** - Product search
- **CookieConsent.tsx** - Cookie consent banner

### Performance & Optimization Components (6)
- **OptimizedImage.tsx** - Image optimization wrapper
- **PerformanceOptimizer.tsx** - Performance monitoring
- **MobileOptimizedLayout.tsx** - Mobile-specific layouts
- **MobileOptimizationProvider.tsx** - Mobile optimization context
- **ProductViewTrackerWrapper.tsx** - View tracking wrapper
- **PriceAlertSignup.tsx** - Price alert subscription

### Utility Components (2)
- **InternalLink.tsx** - Internal navigation with tracking
- **ImageCompareSlider.tsx** - Before/after image slider

---

## REVIEW PAGE ANATOMY

### Standard Review Page Structure (from REVIEW_TEMPLATE.tsx)

#### Metadata Section
- Title: "[Product Name] Review: [X Years] of [Testing Context] (2025)"
- Description: SEO-optimized with testing period
- OpenGraph tags for social sharing
- Canonical URL

#### Product Data Object
```typescript
{
  name: string
  slug: string
  brand: string
  model: string
  category: string
  priceRange: { min: number, max: number, currency: string }
  rating: number (1.0-5.0)
  reviewCount: number
  pros: string[] (4-5 items)
  cons: string[] (3-4 items)
  affiliateLinks: Array<{ retailer: string, url: string }>
  expertRating: number
  expertOpinion: string
  dateAdded: string
  lastUpdated: string
}
```

#### Page Sections (in order):
1. **Breadcrumb Navigation**
   - Home > Reviews > Product Name

2. **H1 Title**
   - Format: "[Product Name] Review: [X Years] of [Testing Context]"

3. **Author Byline**
   - "By Scott Bradley | Professional Chef | 45 Years Experience"

4. **Tier Badge**
   - Tier1Badge or Tier2Badge with testing period

5. **Quick Stats Box**
   - Rating (5/5 stars)
   - Testing period
   - Key features (3 bullet points)

6. **FTC Disclosure**
   - Affiliate relationship transparency

7. **Quick Navigation**
   - Jump links: Testimonials, Cost Analysis, Performance, Comparison, Specs, FAQ

8. **Primary CTA Above Fold**
   - "Current Best Price" box
   - AffiliateButton (position: "above_fold", variant: "primary")
   - Price update notice

9. **Professional Verdict**
   - H2: "Professional Verdict: [Compelling Headline]"
   - 2-3 paragraphs establishing authority and key findings
   - "Perfect For" / "Consider Alternatives If" boxes

10. **Hero Features Grid** (4 boxes)
    - Icon + Headline + 2-3 sentence explanation
    - Topics: Performance, Value, Build Quality, Design

11. **Testing History**
    - H2: Main testing section header
    - Multiple H3 subsections by time period
    - Chronological narrative of use

12. **Customer Testimonials** (id="testimonials")
    - 6-8 Amazon verified purchaser quotes
    - Attribution with initials and date

13. **Cost-Per-Use Analysis** (id="cost-analysis")
    - Real-World Value Calculation box
      - Initial cost
      - Years of use
      - Estimated uses
      - Cost per use
      - Annual cost
    - Value comparison to alternatives
    - "What This Investment Delivered" box with 4 benefits

14. **Performance Metrics** (id="performance")
    - Measured data in grid layout
    - Reliability metrics with checkmarks
    - Specific measurements and values

15. **Mid-Article CTA**
    - Blue box with benefit headline
    - AffiliateButton (position: "mid_article", variant: "secondary")

16. **Additional Content Sections**
    - Practical Uses
    - Value Proposition
    - What It Does Well/Doesn't

17. **Specifications Table** (id="specs")
    - Technical Specifications (left column)
    - Physical Dimensions (right column)
    - 6-8 specs each

18. **Competitor Comparison Table** (id="comparison")
    - Feature comparison across 3 products
    - Price, specs, ratings
    - 6-8 comparison rows

19. **FAQ Section** (id="faq")
    - 8-10 questions with detailed answers
    - FAQ Schema markup
    - References specific testing experience

20. **Related Products**
    - 3 complementary product cards
    - Links to other reviews
    - Brief descriptions

21. **Final CTA**
    - Yellow box with strong call-to-action
    - AffiliateButton (position: "final_cta", variant: "primary")
    - "Ready to Experience [Key Benefit]?" headline

22. **Footer Info Box**
    - Last updated date
    - Contact link for questions

23. **Author Bio**
    - Photo + biography
    - Customized for product context
    - Link to methodology page

24. **Structured Data Schemas**
    - Product Review Schema (JSON-LD)
    - Breadcrumb Schema (JSON-LD)

### Review Page Variations

#### Some reviews have custom AffiliateButtons.tsx files:
- /reviews/robot-coupe-r2-dice/AffiliateButtons.tsx
- /reviews/vitamix-5200/AffiliateButtons.tsx
- /reviews/le-creuset-signature-7-25-qt-dutch-oven/AffiliateButtons.tsx
- /reviews/john-boos-platinum-commercial-cutting-board/AffiliateButtons.tsx
- /reviews/lodge-seasoned-cast-iron-3-skillet-bundle/AffiliateButtons.tsx
- /reviews/wusthof-classic-ikon-16-piece/AffiliateButtons.tsx
- /reviews/kitchenaid-ksm8990wh/AffiliateButtons.tsx

#### All reviews should have:
- ProductImpressionTracker wrapping main content
- CTAVisibilityTracker wrapping all CTAs
- Minimum 3 AffiliateButton instances (above_fold, mid_article, final_cta)
- Tier badge (Tier1Badge or Tier2Badge)
- FTCDisclosure component
- FAQ section with schema markup
- Testimonials section
- Cost analysis section
- Specifications table
- Competitor comparison
- Related products section
- Author bio

---

## BLOG PAGE ANATOMY

### Blog Pages (8 posts):
1. best-scrambled-eggs
2. how-to-make-perfect-french-press-coffee
3. how-to-sear-steaks-like-restaurant-chef
4. how-to-sharpen-with-tri-stone
5. how-to-steel-a-knife
6. kitchen-gloves-guide
7. meat-cooking-temperatures-thermometers
8. why-professional-chefs-use-kosher-salt

### Standard Blog Post Structure:
- **H1 Title**: How-to or informational headline
- **Author Byline**: Scott Bradley with credentials
- **Content Sections**: Multiple H2/H3 headers
- **Internal Links**: Links to relevant product reviews
- **CTAVisibilityTracker**: Wrapping product links
- **Images**: Instructional or supporting images
- **Related Content**: Links to other blog posts or reviews
- **Author Bio**: Customized for blog context

### Blog Hub Page (/blog):
- Featured posts grid
- Category filtering
- CTAVisibilityTracker on post titles and "Read more" links
- Newsletter signup CTA at bottom

---

## GUIDE PAGE ANATOMY

### Guide Pages (6 total):
1. /guides - Hub page
2. /guides/best-chef-knives
3. /guides/best-cookware
4. /guides/kitchen-appliances
5. /guides/knife-care
6. /guides/cookware-materials
7. /guides/affordable-kitchen-appliances

### Standard Guide Page Structure:

#### Best Chef Knives Guide:
- **ProductImpressionTracker**: Wraps each product in comparison table
- **Comparison Table**: Desktop view with specs
- **Mobile Cards**: Responsive alternative to table
- **Product Details**: Expandable sections for each knife
- **CTAVisibilityTracker**: On all "Check Price" and "Read Review" links
- **Final CTA**: Dual buttons for top picks

#### Best Cookware/Kitchen Appliances Guides:
- **ProductImpressionTracker**: Wraps featured products
- **Feature Cards**: 3 products with descriptions
- **CTAVisibilityTracker**: On review links
- **Educational Content**: Material guides, buying criteria
- **Back to Guides Link**: With CTAVisibilityTracker

---

## CATEGORY LANDING PAGES

### Structure (Knives, Cookware, Appliances):
- **Hero Section**: Category overview
- **Featured Products**: Grid of top products
- **ProductImpressionTracker**: Each product card
- **CTAVisibilityTracker**: All CTAs
- **Category Description**: Educational content
- **Related Guides**: Links to guide pages
- **Newsletter CTA**: Bottom of page

---

## ANALYTICS IMPLEMENTATION

### Google Tag Manager Events:
1. **Product Impressions**
   - Event: view_item_list
   - Triggered by: ProductImpressionTracker
   - Data: productName, productSlug, category, brand, price, position, listName

2. **CTA Visibility**
   - Event: cta_visible
   - Triggered by: CTAVisibilityTracker (Intersection Observer)
   - Data: ctaId, position, productSlug, merchant

3. **CTA Clicks**
   - Event: cta_click
   - Triggered by: CTAVisibilityTracker onClick
   - Data: ctaId, position, productSlug, merchant

4. **Affiliate Clicks**
   - Event: affiliate_click
   - Triggered by: AffiliateButton
   - Data: merchant, product, position, variant, ab_test_variant

5. **A/B Test Variant Assignment**
   - Event: ab_test_variant_assigned
   - Triggered by: AffiliateButton on mount
   - Data: test_name, variant, product_slug

### Tracking Props (Must be consistent):

#### CTAVisibilityTracker:
- **ctaId**: string (unique identifier)
- **position**: 'above_fold' | 'mid_article' | 'final_cta' | 'comparison_table' | 'related_products' | 'sidebar'
- **productSlug**: string (optional)
- **merchant**: string (optional, "internal" | "amazon" | etc)
- **children**: React.ReactNode

#### ProductImpressionTracker:
- **productName**: string
- **productSlug**: string
- **category**: string
- **brand**: string (optional)
- **price**: number (optional)
- **position**: number (optional)
- **listName**: string (optional)
- **children**: React.ReactNode

#### AffiliateButton:
- **href**: string
- **merchant**: "amazon" | "other"
- **product**: string (product slug)
- **position**: 'above_fold' | 'mid_article' | 'final_cta'
- **variant**: "primary" | "secondary" | "text"
- **className**: string (optional)
- **children**: React.ReactNode

---

## CONSISTENCY AUDIT CHECKLIST

### For Each Review Page:
- [ ] Has ProductImpressionTracker wrapper
- [ ] Has 3+ AffiliateButton instances (above_fold, mid_article, final_cta)
- [ ] All CTAs wrapped in CTAVisibilityTracker
- [ ] Correct tier badge (Tier1Badge vs Tier2Badge)
- [ ] FTCDisclosure present
- [ ] Quick navigation with all anchor links working
- [ ] Testimonials section (id="testimonials")
- [ ] Cost analysis section (id="cost-analysis")
- [ ] Performance metrics (id="performance")
- [ ] Specifications table (id="specs")
- [ ] Competitor comparison (id="comparison")
- [ ] FAQ section (id="faq") with schema markup
- [ ] Related products section
- [ ] Author bio with customized text
- [ ] Product Review Schema (JSON-LD)
- [ ] Breadcrumb Schema (JSON-LD)
- [ ] Last updated date
- [ ] Import AffiliateButton from '@/components/AffiliateButton'

### For Each Blog Post:
- [ ] CTAVisibilityTracker on all internal links
- [ ] Author byline
- [ ] Related content links
- [ ] Images with alt text
- [ ] Author bio section

### For Each Guide Page:
- [ ] ProductImpressionTracker on featured products
- [ ] CTAVisibilityTracker on all CTAs
- [ ] Correct position prop values
- [ ] Educational content present
- [ ] Back to hub navigation

### For Category Landing Pages:
- [ ] ProductImpressionTracker on product cards
- [ ] CTAVisibilityTracker on all links
- [ ] Featured products section
- [ ] Category description
- [ ] Links to guides

### Global Checks:
- [ ] All position props use valid enum values
- [ ] No invalid props (ctaType, productId, location, etc)
- [ ] ProductImpressionTracker uses individual props (not product object)
- [ ] CTAVisibilityTracker has required position prop
- [ ] All affiliate links have proper tracking
- [ ] Schema markup present and valid
- [ ] Mobile responsive
- [ ] Images optimized
- [ ] No console errors
- [ ] TypeScript builds without errors

---

## FILES TO AUDIT

### Review Pages (27 files):
/app/reviews/benriner-large-mandoline/page.tsx
/app/reviews/black-decker-toaster-oven/page.tsx
/app/reviews/bodum-chambord-french-press/page.tsx
/app/reviews/cuisinart-8-inch-nonstick-pan/page.tsx
/app/reviews/cuisinart-dlc-10c-classic-food-processor/page.tsx
/app/reviews/diamond-crystal-kosher-salt/page.tsx
/app/reviews/epicurean-kitchen-cutting-board/page.tsx
/app/reviews/john-boos-platinum-commercial-cutting-board/page.tsx
/app/reviews/kitchenaid-kp26m1xlc-professional-600/page.tsx
/app/reviews/kitchenaid-ksm8990wh/page.tsx
/app/reviews/le-creuset-signature-7-25-qt-dutch-oven/page.tsx
/app/reviews/lodge-seasoned-cast-iron-3-skillet-bundle/page.tsx
/app/reviews/method-all-purpose-cleaner/page.tsx
/app/reviews/nordic-ware-half-sheet-pan/page.tsx
/app/reviews/norton-im200-tri-stone-sharpener/page.tsx
/app/reviews/oxo-good-grips-bench-scraper/page.tsx
/app/reviews/oxo-good-grips-swivel-peeler/page.tsx
/app/reviews/robot-coupe-r2-dice/page.tsx
/app/reviews/victorinox-4-inch-paring-knife/page.tsx
/app/reviews/victorinox-fibrox-10-inch-chefs-knife/page.tsx
/app/reviews/victorinox-fibrox-8-inch-chefs-knife/page.tsx
/app/reviews/victorinox-granton-edge-boning-knife/page.tsx
/app/reviews/victorinox-offset-bread-knife/page.tsx
/app/reviews/vitamix-5200/page.tsx
/app/reviews/winco-heavy-duty-tongs/page.tsx
/app/reviews/wusthof-classic-ikon-16-piece/page.tsx
/app/reviews/zuperia-bar-mops/page.tsx

### Blog Posts (8 files):
/app/blog/best-scrambled-eggs/page.tsx
/app/blog/how-to-make-perfect-french-press-coffee/page.tsx
/app/blog/how-to-sear-steaks-like-restaurant-chef/page.tsx
/app/blog/how-to-sharpen-with-tri-stone/page.tsx
/app/blog/how-to-steel-a-knife/page.tsx
/app/blog/kitchen-gloves-guide/page.tsx
/app/blog/meat-cooking-temperatures-thermometers/page.tsx
/app/blog/why-professional-chefs-use-kosher-salt/page.tsx

### Guide Pages (6 files):
/app/guides/best-chef-knives/page.tsx
/app/guides/best-cookware/page.tsx
/app/guides/kitchen-appliances/page.tsx
/app/guides/knife-care/page.tsx
/app/guides/cookware-materials/page.tsx
/app/guides/affordable-kitchen-appliances/page.tsx

### Category Pages (3 files):
/app/knives/page.tsx
/app/cookware/page.tsx
/app/appliances/page.tsx

### Hub Pages (3 files):
/app/reviews/page.tsx
/app/blog/page.tsx
/app/guides/page.tsx

### Core Pages (6 files):
/app/page.tsx (homepage)
/app/about/page.tsx
/app/contact/page.tsx
/app/methodology/page.tsx
/app/review-tiers/page.tsx
/app/newsletter/page.tsx

### Total Files to Audit: 56 pages
