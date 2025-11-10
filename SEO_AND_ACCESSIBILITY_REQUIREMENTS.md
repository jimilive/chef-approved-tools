# SEO & Accessibility Requirements

**Last Updated:** November 6, 2025  
**Purpose:** Comprehensive checklist for all pages to ensure SEO compliance and accessibility standards  
**For:** All page types (reviews, blogs, guides, categories)

---

## 🎯 Quick Reference Checklist

Every page MUST have:
- [ ] Unique title tag (<60 characters)
- [ ] Unique meta description (150-160 characters, <80% similarity to other pages)
- [ ] Canonical URL
- [ ] Proper heading hierarchy (h1 → h2 → h3, no skipping)
- [ ] Accessible link colors (orange-700, not orange-600)
- [ ] Accessible text on colored backgrounds (slate-900 on orange)
- [ ] Accessible star ratings (amber-700, not yellow-400)
- [ ] No unescaped quotes or apostrophes
- [ ] Appropriate schema markup
- [ ] Alt text on all images

---

## 📝 Title Tag Requirements

### Standards
- **Character limit:** 55-60 characters maximum
- **Uniqueness:** Must be <80% similar to other title tags on site
- **Format:** Include primary keyword + benefit/hook
- **Placement:** In page metadata and schema markup

### Formula Examples

**Review Pages:**
```
[Product Name] Review: [Key Benefit] | Chef Approved Tools
Example: "Vitamix 5200 Review: 18 Years of Professional Testing"
```

**Blog Posts:**
```
[Topic]: [Benefit/Hook] | Chef Approved Tools
Example: "How to Sharpen Knives: Professional Chef Method"
```

**Guide Pages:**
```
Best [Category]: [Qualifier] Guide | Chef Approved Tools
Example: "Best Chef Knives: Professional Kitchen Tested"
```

**Category Pages:**
```
[Category] Reviews: Chef-Tested Equipment | Chef Approved Tools
Example: "Cookware Reviews: Professional Kitchen Equipment"
```

### Common Mistakes to Avoid
- ❌ Using generic titles across multiple pages
- ❌ Exceeding 60 characters (gets cut off in search results)
- ❌ Missing the primary keyword
- ❌ Using special characters that break (see Character Encoding section)
- ❌ Copy-pasting titles and only changing product name (creates >80% similarity)

---

## 📋 Meta Description Requirements

### Standards
- **Character limit:** 150-160 characters (ideal sweet spot)
- **Uniqueness:** Must be <80% similar to other meta descriptions
- **Format:** Include benefit + credentials + call to action
- **Tone:** Direct, benefit-focused, persuasive

### Formula Examples

**Review Pages:**
```
Professional chef with 24 years of experience reviews [Product]. Real testing results, honest pros/cons, and who should buy. [Specific benefit/feature highlight].

Example: "Professional chef with 24 years reviews the Vitamix 5200. 18 years of daily restaurant use, honest pros/cons, and performance analysis from thousands of blends."
```

**Blog Posts:**
```
Learn [topic] from a chef with 24 years of professional experience. [Specific benefit]. [Credibility marker]. [Call to action].

Example: "Learn knife sharpening from a chef with 24 years in professional kitchens. Step-by-step guide using restaurant methods. Get razor-sharp edges safely."
```

### Uniqueness Testing
To ensure <80% similarity:

1. **Count total words** in meta description
2. **Count matching words** with other descriptions
3. **Calculate:** matching words / total words
4. **Must be:** Less than 0.80 (80%)

**Example:**
- Meta A: "Professional chef reviews blenders" (4 words)
- Meta B: "Professional chef reviews knives" (4 words)
- Matching: "Professional chef reviews" (3 words)
- Similarity: 3/4 = 0.75 (75%) ✅ PASS

**Bad Example:**
- Meta A: "Professional chef with 24 years reviews the Vitamix blender" (9 words)
- Meta B: "Professional chef with 24 years reviews the Ninja blender" (9 words)
- Matching: "Professional chef with 24 years reviews the blender" (8 words)
- Similarity: 8/9 = 0.89 (89%) ❌ FAIL

### Common Mistakes to Avoid
- ❌ Copy-pasting descriptions and only swapping product names
- ❌ Using same opening for multiple pages ("Professional chef with 24 years...")
- ❌ Exceeding 160 characters (gets truncated)
- ❌ Under 150 characters (wasted SEO opportunity)
- ❌ No call to action or benefit
- ❌ Forgetting to include credentials

---

## ♿ Accessibility Requirements

### Issue #1: Orange Text Link Color

**Problem:** `text-orange-600` fails WCAG AA contrast standards (4.5:1 required)

**Where it occurs:**
- Body text links
- CTA button text (when not using gradient background)
- Inline product name links
- Footer links
- Navigation links on light backgrounds

**Solution:**
```tsx
// ❌ WRONG - Fails accessibility
<a className="text-orange-600 hover:text-orange-700">Link</a>

// ✅ CORRECT - Meets WCAG AA
<a className="text-orange-700 hover:text-orange-800">Link</a>
```

**Technical details:**
- Orange-600 (#ea580c) contrast ratio: ~3.8:1 ❌
- Orange-700 (#c2410c) contrast ratio: ~4.6:1 ✅

---

### Issue #2: Slate Text on Orange Backgrounds

**Problem:** `text-slate-700` on orange backgrounds fails contrast standards

**Where it occurs:**
- Badges and tags with orange backgrounds
- Orange banner sections
- Highlighted content boxes
- Call-out sections with brand colors

**Solution:**
```tsx
// ❌ WRONG - Insufficient contrast
<div className="bg-orange-100">
  <p className="text-slate-700">Text</p>
</div>

// ✅ CORRECT - Proper contrast
<div className="bg-orange-100">
  <p className="text-slate-900">Text</p>
</div>
```

**Rule of thumb:**
- Light backgrounds → slate-700 or slate-900 (both work)
- Colored backgrounds (orange, amber, etc.) → always slate-900

---

### Issue #3: Heading Hierarchy

**Problem:** Skipping heading levels breaks screen reader navigation and SEO

**Where it occurs:**
- Author bio sections (was using h3 → h4)
- Blog post subheadings
- Component sections
- Sidebar content

**Solution:**
```tsx
// ❌ WRONG - Skips from h2 to h4
<h2>Main Section</h2>
<h4>Subsection</h4>

// ✅ CORRECT - Sequential hierarchy
<h2>Main Section</h2>
<h3>Subsection</h3>

// ❌ WRONG - Multiple h1 tags
<h1>Page Title</h1>
<h1>Section Title</h1>

// ✅ CORRECT - Only one h1 per page
<h1>Page Title</h1>
<h2>Section Title</h2>
```

**Rules:**
- Only ONE h1 per page (page title)
- Must progress sequentially: h1 → h2 → h3 → h4 → h5 → h6
- Never skip levels (h2 → h4 is wrong)
- Can jump back up (h4 → h2 is fine when starting new section)

**Common patterns:**
```
Page Structure:
├─ h1: Page Title (Product Name / Blog Title / Guide Title)
├─ h2: Major Sections (Testing Results, Pros/Cons, Who Should Buy)
│   ├─ h3: Subsections (Performance, Durability, Ease of Use)
│   │   └─ h4: Detailed Points (if needed)
└─ h2: Next Major Section
```

---

### Issue #4: Star Rating Colors

**Problem:** `text-yellow-400` fails contrast requirements for star ratings

**Where it occurs:**
- Product review star ratings
- Review cards on category pages
- Star displays in hero sections
- Rating summaries

**Solution:**
```tsx
// ❌ WRONG - Insufficient contrast
<div className="flex text-yellow-400">
  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
</div>

// ✅ CORRECT - Meets accessibility standards
<div className="flex text-amber-700">
  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
</div>

// ALSO REQUIRED: Add aria-label
<div className="flex text-amber-700" aria-label="5 out of 5 stars">
  {[...Array(5)].map((_, i) => <span key={i} aria-hidden="true">★</span>)}
</div>
```

**Technical details:**
- Yellow-400: Poor contrast, fails WCAG ❌
- Amber-700 (#b45309): Meets WCAG AA ✅
- Always include aria-label for screen readers

---

## 🔤 Character Encoding Requirements

### The Problem
Unescaped quotes, apostrophes, and special characters can break:
- Title tags (appear as broken text in search results)
- Meta descriptions (get truncated at special character)
- JSON schema markup (causes validation errors)
- URLs (create 404 errors)

### Solution: Always Escape Special Characters

**In JSX/TSX:**
```tsx
// ❌ WRONG - Unescaped apostrophe
<title>Scott's Guide to Chef Knives</title>

// ✅ CORRECT - Use HTML entity
<title>Scott&apos;s Guide to Chef Knives</title>

// ✅ ALSO CORRECT - Use Unicode
<title>Scott's Guide to Chef Knives</title> // Curly apostrophe

// ✅ BEST - Use template literals with proper escaping
const title = `Scott's Guide to Chef Knives`
```

### Common Characters to Escape

| Character | HTML Entity | Unicode | Use Case |
|-----------|-------------|---------|----------|
| Apostrophe (') | `&apos;` | `'` | Possessives, contractions |
| Quote (") | `&quot;` | `"` | Quotations |
| Ampersand (&) | `&amp;` | N/A | "And" symbol |
| Less than (<) | `&lt;` | N/A | Mathematical |
| Greater than (>) | `&gt;` | N/A | Mathematical |
| Em dash (—) | `&mdash;` | `—` | Punctuation |
| En dash (–) | `&ndash;` | `–` | Ranges |

### Real Examples from Site

**Before (Broken):**
```tsx
title: "Le Creuset 7.25 Qt Dutch Oven Review: Here's Why..."
// "Here's" breaks at apostrophe in search results
```

**After (Fixed):**
```tsx
title: "Le Creuset 7.25 Qt Dutch Oven Review: Here&apos;s Why..."
// OR
title: "Le Creuset 7.25 Qt Dutch Oven Review: Here's Why..."
```

### The Slash Error

**Problem:** Some titles mysteriously get cut off with a `/` character

**Cause:** Improperly escaped forward slashes in strings or file paths leaking into content

**Solution:**
```tsx
// ❌ WRONG - May create slash errors
const title = "1/4 Cup Measuring Tools"

// ✅ CORRECT - Escape or avoid
const title = "Quarter Cup Measuring Tools"
// OR
const title = "1\u002F4 Cup Measuring Tools" // Unicode for /
```

**Prevention:**
- Avoid forward slashes in titles when possible
- Use words instead ("quarter" not "1/4")
- If needed, use Unicode escape: `\u002F`

---

## 📊 Schema Markup Requirements

### Required Schema Types by Page Type

**Review Pages:**
- Product schema
- Review schema (coming soon)
- FAQ schema
- Breadcrumb schema

**Blog Posts:**
- Article schema
- Breadcrumb schema
- Author schema

**Guide Pages:**
- Article schema
- HowTo schema (when applicable)
- Breadcrumb schema

**Category Pages:**
- CollectionPage schema
- Breadcrumb schema

### Schema Validation
- Test all schema at: https://validator.schema.org/
- Check Google Rich Results: https://search.google.com/test/rich-results
- Fix all errors before deployment
- Warnings are okay, errors are not

### Common Schema Mistakes
- ❌ Unescaped quotes in JSON (use `\"` or switch to single quotes)
- ❌ Missing required fields (name, description, image for Product)
- ❌ Invalid URLs (must be absolute, not relative)
- ❌ Incorrect date formats (use ISO 8601: YYYY-MM-DD)
- ❌ Missing @context or @type fields

---

## 🖼️ Image Requirements

### Alt Text Standards
- **Required:** Every image must have alt text
- **Length:** 10-125 characters (sweet spot: 40-80)
- **Format:** Descriptive, includes context, no "image of" or "picture of"
- **Keywords:** Include relevant keywords naturally

**Examples:**
```tsx
// ❌ WRONG
<img src="vitamix.jpg" alt="blender" />

// ❌ WRONG (too generic)
<img src="vitamix.jpg" alt="Image of a Vitamix blender" />

// ✅ CORRECT
<img src="vitamix.jpg" alt="Vitamix 5200 professional blender in commercial kitchen" />
```

### File Optimization
- **Format:** WebP preferred, JPG fallback
- **Size:** Under 200KB per image
- **Dimensions:** Appropriate for use (not 4000px when displaying at 400px)
- **Loading:** Use `loading="lazy"` for below-fold images

---

## 🔍 Pre-Deployment Checklist

Before pushing ANY page to production:

### SEO Checks
- [ ] Title is unique and <60 characters
- [ ] Meta description is unique (<80% similarity) and 150-160 characters
- [ ] Canonical URL is correct
- [ ] All special characters are escaped
- [ ] No slash errors in titles
- [ ] Schema markup validates without errors
- [ ] All internal links work (no 404s)

### Accessibility Checks
- [ ] All links use orange-700 (not orange-600)
- [ ] Text on colored backgrounds uses slate-900
- [ ] Heading hierarchy is sequential (h1 → h2 → h3)
- [ ] Star ratings use amber-700 (not yellow-400)
- [ ] All star ratings have aria-labels
- [ ] All images have descriptive alt text
- [ ] Color contrast passes WCAG AA (4.5:1)

### Content Checks
- [ ] No Lorem Ipsum or placeholder text
- [ ] All CTAs link to correct destinations
- [ ] Affiliate links work and have proper tracking
- [ ] Email capture component present
- [ ] Author bio component present
- [ ] Related products section populated

### Technical Checks
- [ ] Page builds without errors (`npm run build`)
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No console errors in browser
- [ ] Mobile responsive (test on real device)
- [ ] Lighthouse score >90 (performance, accessibility, best practices, SEO)

---

## 🚨 Common Mistakes & How to Avoid Them

### Mistake #1: Copy-Paste Syndrome
**Problem:** Copying page metadata and only changing product name creates >80% similarity

**Solution:**
- Rewrite descriptions from scratch for each page
- Vary sentence structure
- Change opening phrases
- Add unique details specific to that product

### Mistake #2: Character Encoding Ignored
**Problem:** Titles break in search results, schema fails validation

**Solution:**
- Always escape apostrophes and quotes
- Use HTML entities or Unicode
- Test titles in Google Rich Results tool

### Mistake #3: Accessibility as Afterthought
**Problem:** Using wrong colors, skipping heading levels, missing aria-labels

**Solution:**
- Follow color standards from day one (orange-700, slate-900, amber-700)
- Plan heading structure before writing content
- Add aria-labels when creating star ratings

### Mistake #4: Schema Markup Broken
**Problem:** JSON errors, missing fields, invalid URLs

**Solution:**
- Validate schema before committing code
- Use schema generation functions (ensure they escape quotes)
- Test with Google Rich Results tool

### Mistake #5: No Quality Control
**Problem:** Mistakes slip through because no systematic checking

**Solution:**
- Use this checklist for EVERY page
- Test on staging before production
- Run Lighthouse audits regularly
- Fix issues immediately, don't accumulate technical debt

---

## 📚 Related Documentation

- **CONTENT_GUIDELINES.md** - Content strategy, voice, SEO best practices
- **STYLE_GUIDE.md** - Design system, color usage, component styling
- **COMPONENT_PROP_INTERFACES.md** - Component specifications and TypeScript interfaces
- **.clauderc** - Protection rules and what NOT to do
- **REVIEW_PAGE_MASTER_TEMPLATE.md** - Complete review page creation guide (coming soon)

---

## 🔄 Changelog

**November 6, 2025:**
- Initial creation
- Documented 4 accessibility issues (orange links, slate on orange, heading hierarchy, star colors)
- Added character encoding requirements
- Added uniqueness testing methodology
- Added pre-deployment checklist

---

## 💡 Quick Tips

1. **When in doubt about contrast:** Use the darker version (orange-700 over orange-600, slate-900 over slate-700)
2. **Test titles/meta in Google:** Search for your own pages and see how they appear
3. **Use the 80% rule:** If descriptions share more than 80% of words, rewrite one
4. **Heading structure maps content:** Your h2/h3 tags should outline your content logically
5. **Escape early:** Add HTML entities as you write titles, not as a fix later
6. **Accessibility helps SEO:** Google uses accessibility signals for ranking
7. **Schema is not optional:** It's required for rich results and AI search visibility

---

**Remember:** These requirements aren't just "nice to have" - they're essential for:
- Google ranking (SEO)
- AI search visibility (ChatGPT, Perplexity, Claude)
- User experience (accessibility)
- Legal compliance (ADA)
- Professional credibility (Microsoft's E-E-A-T guidelines)

Every page that follows these standards is a page that can rank, convert, and be cited by AI models.
