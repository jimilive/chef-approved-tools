# Review Page Updates Needed

This document tracks all changes needed when updating the 35+ product review pages.

## Completed (Lodge page as template)

- [x] **Image architecture** - Side-by-side layout with 400px image on left, content on right
- [x] **Tier badge standardization** - Using centralized `getTierBadge()` from `lib/editorial-metadata.ts`
- [x] **Dynamic git dates** - Using `getReviewGitDates()` from `lib/git-dates.ts`
- [x] **CTA layout restructuring** - Simple CTA button in right column, verdict below, customCTA box full width
- [x] **Container width** - Changed to `max-w-5xl` (1024px)

## Pending Changes (Apply to all review pages)

### High Priority

1. **Ratings from Supabase**
   - Currently: Mixed - some hardcoded in data files, some from Supabase
   - Should be: ALL ratings come from `expertRating` field in Supabase
   - Affected: Individual review data files, guide pages like `best-chef-knives`

2. **Remove hardcoded prices from guide pages**
   - `app/guides/best-chef-knives/page.tsx` shows $45, $50, $12, $40
   - Prices should not be displayed (they change and become inaccurate)

3. **Testing period accuracy**
   - Victorinox knives: "10 years professional kitchen use, 20+ years total"
   - Each product needs accurate testing period in Supabase/editorial metadata

4. **Value highlights line**
   - Currently hardcoded: "💰 Outstanding Value Investment | ✔ Pre-Seasoned | ✔ Made in USA | ✔ 3 Versatile Sizes"
   - Should be: Dynamic prop passed per product

### Medium Priority

5. **Tier badge in individual review data files**
   - Remove hardcoded tier data from individual review data files
   - Use centralized `getTierBadge(slug)` function instead

6. **Mobile responsive layout**
   - Verify image layout stacks correctly on mobile
   - Test CTA visibility on small screens

### Guide Pages Specifically

7. **`app/guides/best-chef-knives/page.tsx`**
   - Remove price column from comparison table
   - Pull ratings from Supabase instead of hardcoded `topKnives` array
   - Update testing claims to accurate "10 years professional + 20 years total"
   - Google has cached old title "Pro Chef Tests 8 Knives" - request re-index after fixes

## Reference: Lodge Page as Template

The Lodge Cast Iron review (`app/reviews/lodge-seasoned-cast-iron-3-skillet-bundle/page.tsx`) is the reference implementation with:
- `heroImage` prop for side-by-side layout
- `getTierBadge()` for centralized tier
- `getReviewGitDates()` for dynamic dates
- `ctaUrl` passed to ReviewHero
- `max-w-5xl` container

## Files to Update

### Review Pages (35+)
All files in `app/reviews/*/page.tsx`

### Guide Pages
- `app/guides/best-chef-knives/page.tsx`
- `app/guides/best-budget-chef-knife/page.tsx`
- Other guide pages with product comparisons

### Data Files
- All `*-data.ts` files in review directories
- `lib/editorial-metadata.ts` - ensure all products have entries

### Components
- `components/review/ReviewHero.tsx` - add `valueHighlights` prop
