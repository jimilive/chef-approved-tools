# Schema Validation Tool

## Overview

The Schema Validation Tool validates JSON-LD structured data (schema.org markup) against Google Rich Results requirements. It helps ensure your product reviews and blog posts have proper schema to appear in Google search with rich snippets (star ratings, author info, etc.).

## Why This Matters

- **32 out of 36** product reviews currently show rich snippets in Google Search Console
- Missing or invalid schema prevents rich snippets from appearing
- Rich snippets significantly increase click-through rates from search results
- Google requires specific fields for different schema types

## Features

✅ Validates Product schema for review pages
✅ Validates Article/BlogPosting schema for blog posts
✅ Checks required fields per Google's specifications
✅ Identifies warnings for recommended fields
✅ Supports both local file scanning and live URL validation
✅ Generates detailed, actionable reports
✅ Color-coded console output for easy scanning

## Quick Start

### Validate All Local Files

```bash
npm run validate:schema
```

This scans all `app/reviews/*/page.tsx` and `app/blog/*/page.tsx` files.

**Note:** Local validation has limitations because it can't fully evaluate the dynamically generated schemas. For comprehensive validation, use live URL validation.

### Validate Live Site

```bash
npm run validate:schema:live
```

This fetches and validates the actual rendered JSON-LD from your live site.

**Recommended:** This is the most accurate validation method.

### Validate Single URL

```bash
npm run validate:schema -- --url https://www.chefapprovedtools.com/reviews/vitamix-5200-professional-blender
```

### Generate Report File

```bash
npm run validate:schema:report
```

Saves output to `schema-validation-report.txt` (without color codes).

## Understanding the Output

### Report Structure

```
═══════════════════════════════════════════════════════════════════
  SCHEMA VALIDATION REPORT
═══════════════════════════════════════════════════════════════════

Scanned: 36 product reviews, 76 blog posts

SUMMARY:
✅ Valid: 28 products, 68 blogs
⚠️  Warnings: 6 products, 8 blogs
❌ Errors: 2 products, 0 blogs
🚫 No Schema: 0 products, 0 blogs
```

### Issue Types

- **✅ Valid:** Schema passes all required field checks
- **⚠️  Warnings:** Missing recommended fields (won't prevent rich snippets but limits functionality)
- **❌ Errors:** Missing required fields (prevents rich snippets from appearing)
- **🚫 No Schema:** Page is missing schema entirely

### Example Error Output

```
❌ /reviews/product-name
   Product.aggregateRating.reviewCount: reviewCount is 0 (should be >= 1)
   Fix: Set reviewCount to actual number of reviews (minimum 1)

   Product.brand: Missing recommended field: brand
   Fix: Add brand to Product schema for better rich snippets
```

## Schema Requirements

### Product Schema (Required for Rich Snippets)

**Required Fields:**
- `name` - Product name
- `image` - Product image (array or string)
- `description` - Product description
- `aggregateRating` - Star rating information
  - `ratingValue` - Rating score (1-5)
  - `reviewCount` - Number of reviews (must be ≥ 1)
- `review` - Review content
  - `author` - Review author (Person type)
  - `reviewRating` - Rating object
  - `reviewBody` - Review text

**Recommended Fields:**
- `brand` - Product brand (improves rich snippet display)
- `sku` - Product SKU
- `@id` - Unique identifier for the product

### Article Schema (Required for Blog Posts)

**Required Fields:**
- `headline` - Article title
- `author` - Author information (Person type with name)
- `datePublished` - Publication date (ISO 8601 format)
- `dateModified` - Last modified date
- `image` - Article image
- `publisher` - Publisher (Organization reference)

**Recommended Fields:**
- `mainEntityOfPage` - Reference to the web page
- `@id` - Unique identifier for the article
- `author.@id` - Reference to centralized author entity

## Common Issues and Fixes

### Issue: "reviewCount is 0"

**Problem:** Google requires at least 1 review for aggregate ratings.

**Fix:** In your schema generation call, ensure:
```typescript
const productSchema = generateProductSchema({
  name: product.name,
  rating: 5,
  reviewCount: 1, // ← Must be >= 1
  // ...
})
```

### Issue: "Missing aggregateRating"

**Problem:** Star ratings won't appear in search results.

**Fix:** Add rating information to your product schema:
```typescript
const productSchema = generateProductSchema({
  name: product.name,
  rating: product.expertRating || 4.5,
  reviewCount: 1,
  // ...
})
```

### Issue: "Missing brand"

**Problem:** Product brand improves rich snippet display.

**Fix:** Add brand from your product data:
```typescript
const productSchema = generateProductSchema({
  name: product.name,
  brand: product.brand || "Brand Name",
  // ...
})
```

### Issue: "Article missing dateModified"

**Problem:** Google wants to know when content was last updated.

**Fix:** Add dateModified to article schema:
```typescript
const articleSchema = generateArticleSchema({
  headline: "Article Title",
  datePublished: "2025-11-15",
  dateModified: "2025-11-22", // ← Add this
  // ...
})
```

## Integration with CI/CD

### Add to Pre-Deployment Checklist

Add to your build script in `package.json`:

```json
{
  "scripts": {
    "prebuild": "npm run validate:schema"
  }
}
```

This will validate schemas before every build and fail the build if critical errors are found.

### GitHub Actions (Optional)

```yaml
- name: Validate Schema
  run: npm run validate:schema:live
```

## Limitations

### Local File Validation

Local validation (`--local` mode) has limitations:

- **Cannot fully evaluate dynamic schemas** - The `generateProductSchema()` function creates schemas dynamically, so static analysis can't see all fields
- **False positives** - May report missing fields that are actually generated
- **Best for:** Detecting missing schema tags entirely

**Recommendation:** Use `--live` mode for accurate validation.

### Live URL Validation

Live validation (`--live` mode) is more accurate but:

- **Requires deployed site** - Must validate against production or staging
- **Slower** - Fetches each URL over HTTP
- **Network dependent** - Requires internet connection

**Recommendation:** Use for final validation before deployment.

## Advanced Usage

### Validate Specific URL Pattern

```bash
# Validate all knife reviews
npm run validate:schema -- --live | grep "knife"
```

### Generate Detailed Report

```bash
npm run validate:schema:report
cat schema-validation-report.txt
```

### Compare Before/After Changes

```bash
# Before changes
npm run validate:schema:report
mv schema-validation-report.txt before.txt

# After changes
npm run validate:schema:report
mv schema-validation-report.txt after.txt

# Compare
diff before.txt after.txt
```

## Troubleshooting

### "No schemas found"

Check that your page includes:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
/>
```

### "Failed to parse schema"

Check that your schema generation call is valid:

```typescript
// ✅ Good
const productSchema = generateProductSchema({
  name: product.name,
  slug: product.slug,
  // ...
})

// ❌ Bad (syntax error)
const productSchema = generateProductSchema({
  name: product.name,
  slug: product.slug  // Missing comma
  description: product.description
})
```

### "TypeScript errors"

The validation script is TypeScript. If you see errors:

```bash
npm run type-check
```

Fix any TypeScript errors in your schema generation code.

## Next Steps

After validation:

1. **Fix Errors First** - These prevent rich snippets
2. **Address Warnings** - Improves rich snippet quality
3. **Test in Google Rich Results Test** - https://search.google.com/test/rich-results
4. **Monitor Google Search Console** - Check "Enhancements" for issues
5. **Re-validate After Changes** - Always validate before deploying

## Resources

- **Google Rich Results Test:** https://search.google.com/test/rich-results
- **Schema.org Product:** https://schema.org/Product
- **Schema.org Article:** https://schema.org/Article
- **Google Search Central - Structured Data:** https://developers.google.com/search/docs/appearance/structured-data

## Support

Found an issue with the validation tool?

1. Check this documentation first
2. Review the `lib/schema.ts` file to understand schema generation
3. Test with Google Rich Results Test to confirm
4. Create an issue with specific examples

---

**Last Updated:** November 22, 2025
**Version:** 1.0.0
**Tool:** `scripts/validate-schema.ts`
