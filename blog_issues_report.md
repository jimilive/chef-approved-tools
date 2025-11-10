# Blog Post Formatting Issues - Comprehensive Analysis

**Analysis Date:** 2025-11-10
**Total Blog Posts:** 72
**New Comparison Posts (Skipped):** 8
**Old Posts Analyzed:** 64

---

## Executive Summary

Of the 64 old blog posts analyzed (excluding the 8 new comparison posts):
- **46 posts have formatting issues** that need to be fixed
- **18 posts are clean** and require no changes

### Issue Breakdown

| Issue | Posts Affected | Total Occurrences |
|-------|----------------|-------------------|
| **Issue 1**: Bold text + `<br />` tags | 5 posts | 131 occurrences |
| **Issue 2**: Invalid `border-l-6` class | 5 posts | 5 occurrences |
| **Issue 3**: Custom author bio | 46 posts | 46 occurrences |

---

## Issue 1: Bold Text Followed by `<br />` Tags

**Pattern:** `</strong><br />`

**Problem:** Using bold text with line breaks instead of proper semantic HTML (headings or paragraphs).

**Solution:** Replace with proper `<h3>` or `<h4>` tags, or restructure as proper paragraphs.

### Affected Posts (5):

1. **bacon-but-not-in-this-dish** - 13 occurrences
   - `/Users/scottbradley/chef-approved-tools/app/blog/bacon-but-not-in-this-dish/page.tsx`

2. **cutting-storing-fresh-herbs** - 26 occurrences
   - `/Users/scottbradley/chef-approved-tools/app/blog/cutting-storing-fresh-herbs/page.tsx`
   - Examples:
     - Line 133: `<strong>Cell Structure</strong><br />`
     - Line 138: `<strong>Oxidation Sensitivity</strong><br />`
     - Line 143: `<strong>The Balance</strong><br />`

3. **hydration-health-water-intake** - 26 occurrences
   - `/Users/scottbradley/chef-approved-tools/app/blog/hydration-health-water-intake/page.tsx`

4. **oxidization-effect-on-food** - 49 occurrences (highest count!)
   - `/Users/scottbradley/chef-approved-tools/app/blog/oxidization-effect-on-food/page.tsx`

5. **why-children-hate-broccoli** - 17 occurrences
   - `/Users/scottbradley/chef-approved-tools/app/blog/why-children-hate-broccoli/page.tsx`

**Total Impact:** 131 instances across 5 posts need to be fixed.

---

## Issue 2: Invalid `border-l-6` Class

**Pattern:** `border-l-6`

**Problem:** Using `border-l-6` which is not a valid Tailwind CSS class. Should be `border-l-4`.

**Solution:** Replace all instances of `border-l-6` with `border-l-4`.

### Affected Posts (5):

1. **bacon-but-not-in-this-dish** - 1 occurrence
   - `/Users/scottbradley/chef-approved-tools/app/blog/bacon-but-not-in-this-dish/page.tsx`

2. **how-to-cook-perfect-pasta** - 1 occurrence
   - `/Users/scottbradley/chef-approved-tools/app/blog/how-to-cook-perfect-pasta/page.tsx`

3. **hydration-health-water-intake** - 1 occurrence
   - `/Users/scottbradley/chef-approved-tools/app/blog/hydration-health-water-intake/page.tsx`

4. **vegetable-roasting-guide** - 1 occurrence
   - `/Users/scottbradley/chef-approved-tools/app/blog/vegetable-roasting-guide/page.tsx`

5. **why-children-hate-broccoli** - 1 occurrence
   - `/Users/scottbradley/chef-approved-tools/app/blog/why-children-hate-broccoli/page.tsx`

**Total Impact:** 5 instances across 5 posts (simple find/replace fix).

---

## Issue 3: Custom Author Bio Instead of AuthorBio Component

**Pattern:** `About Scott Bradley` heading with manual bio text

**Problem:** Posts have manual author bio sections instead of importing and using the reusable `AuthorBio` component.

**Solution:** Remove custom bio section and import/use the `<AuthorBio />` component.

### Affected Posts (46):

All posts listed below have the custom author bio section that needs to be replaced:

1. bacon-but-not-in-this-dish
2. benefits-cooking-with-garlic
3. bread-science-gluten-development
4. caramelization-science
5. cast-iron-seasoning-care
6. cheese-sauce-mac-and-cheese
7. complete-guide-to-salts
8. cooking-with-tomatoes-fresh-vs-canned
9. cookware-materials-explained
10. cutting-board-materials-guide
11. cutting-storing-fresh-herbs
12. deglazing-pan-sauces
13. essential-knife-cuts-every-cook-should-master
14. fat-is-flavor
15. food-processor-vs-blender
16. guide-cooking-oils-smoke-points
17. how-to-choose-first-chef-knife
18. how-to-clean-burnt-stainless-steel-pans
19. how-to-cook-perfect-pasta
20. how-to-make-perfect-risotto
21. how-to-make-roux
22. how-to-preheat-a-pan
23. hydration-health-water-intake
24. kitchen-starter-kit-first-5-tools
25. kitchen-thermometers-guide
26. kitchen-tools-wasting-money
27. knife-safety-rules-professional-kitchens
28. knife-skills-how-to-hold-chef-knife
29. maillard-reaction-browning-flavor
30. making-stock-professional-chef-method
31. mis-en-place-professional-cooking
32. onions-cooking-guide
33. oxidization-effect-on-food
34. potatoes-cooking-guide
35. stainless-steel-why-food-sticks
36. stand-mixer-buying-guide
37. stock-vs-broth-vs-bouillon
38. understanding-acids-cooking
39. understanding-cooking-fats
40. understanding-umami-fifth-taste
41. vegetable-roasting-guide
42. what-is-braising
43. what-is-emulsification
44. why-children-hate-broccoli
45. why-cooking-science-matters
46. why-resting-meat-key-cooking

**Total Impact:** 46 posts need custom bio section removed and AuthorBio component added.

---

## Posts WITHOUT Issues (18)

These posts are **already clean** and require no changes:

1. best-scrambled-eggs
2. blanching-vegetables-why-restaurants-do-it
3. braising-101-tough-cuts-made-tender
4. caramelizing-onions-why-it-takes-45-minutes
5. carbon-footprint-kitchen-equipment-buy-once-cry-once
6. dutch-oven-size-guide-which-quart-size
7. hotel-pan-system-restaurant-organization-home
8. how-to-make-perfect-french-press-coffee
9. how-to-sear-steaks-like-restaurant-chef
10. how-to-sharpen-with-tri-stone
11. how-to-steel-a-knife
12. kitchen-gloves-guide
13. knife-storage-protecting-blades-for-decades
14. meal-prep-station-setup-restaurant-efficiency
15. meat-cooking-temperatures-thermometers
16. reducing-sauces-restaurant-technique
17. sheet-pan-cooking-restaurant-techniques
18. why-professional-chefs-use-kosher-salt

---

## Priority Posts to Fix

### Highest Priority (Multiple Issues)

These 4 posts have MULTIPLE issues and should be fixed first:

1. **bacon-but-not-in-this-dish** - Issue 1 (13×), Issue 2 (1×), Issue 3 (1×)
2. **hydration-health-water-intake** - Issue 1 (26×), Issue 2 (1×), Issue 3 (1×)
3. **why-children-hate-broccoli** - Issue 1 (17×), Issue 2 (1×), Issue 3 (1×)
4. **vegetable-roasting-guide** - Issue 2 (1×), Issue 3 (1×)

### High Priority (Issue 1 Only)

These posts have the most complex formatting issues:

1. **oxidization-effect-on-food** - Issue 1 (49×), Issue 3 (1×) - MOST OCCURRENCES
2. **cutting-storing-fresh-herbs** - Issue 1 (26×), Issue 3 (1×)

### Medium Priority (Issue 2 Only)

1. **how-to-cook-perfect-pasta** - Issue 2 (1×), Issue 3 (1×)

### Lower Priority (Issue 3 Only)

The remaining 41 posts only need the AuthorBio component swap (simpler fix).

---

## Scope of Work

### Total Fixes Required:
- **131 instances** of bold+br formatting to restructure
- **5 instances** of border-l-6 to replace with border-l-4
- **46 posts** need AuthorBio component integration

### Estimated Effort:
- **Issue 1 (Bold+BR):** High complexity - requires manual review and restructuring
- **Issue 2 (border-l-6):** Low complexity - simple find/replace
- **Issue 3 (AuthorBio):** Medium complexity - repetitive but requires careful import and placement
