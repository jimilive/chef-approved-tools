# Review Template System

## What's In This Folder

### Core Templates
- **review-template.tsx** - Complete page structure with all standard sections
- **review-data-template.ts** - Data object with all content placeholders
- **REVIEW_CREATION_GUIDE.md** - Step-by-step guide with examples

### How To Use

1. Copy both templates to `/app/reviews/[product-slug]/`
2. Rename files to match product slug
3. Replace all `[BRACKETED]` placeholders
4. Test locally: `npm run dev`

## Components Available

### Standard Components (Always Use)
Located in `/components/review/`:
- `ReviewHero` - Top section
- `TestingResultsGrid` - Testing details
- `PerformanceAnalysis` - Prose sections
- `ComparisonTable` - Feature comparison
- `ProsConsGrid` - Pros & cons
- `WhoShouldBuyGrid` - Perfect for / Consider alternatives
- `FAQSection` - Q&A
- `EmailCaptureSection` - Purple form
- `BottomLineSection` - Final verdict
- `RelatedProductsGrid` - Related products

### Custom Components (Product-Specific)
Located in `/components/review/custom/`:
- `SafetySection` - For dangerous tools (knives, mandolines)
- `CompatibilityGuide` - For "what works best" lists (vegetables, oils)
- `SizingGuide` - For products with size options

## Architecture Benefits

✅ **Extreme Consistency** - All reviews use identical components
✅ **Fast Creation** - Fill data, get perfect page
✅ **Easy Updates** - Change component, update all reviews
✅ **Type Safety** - TypeScript catches errors
✅ **Maintainable** - No copy/paste, single source of truth

## Next Steps

**Goal: Transform 34 remaining review pages**

1. Start with simpler products (no custom sections)
2. Reference Vitamix page for standard structure
3. Reference Benriner page for custom sections
4. Use REVIEW_CREATION_GUIDE.md as checklist

## Examples

- **Standard Review**: `/app/reviews/vitamix-5200-professional-blender/`
- **Custom Sections**: `/app/reviews/benriner-large-mandoline/`

---

**Created: October 2025**
**System: Reusable component architecture for review pages**
