# Blog Formatting Update Plan

## Blogs Requiring Updates (5 total)
1. best-scrambled-eggs
2. how-to-steel-a-knife
3. kitchen-gloves-guide
4. meat-cooking-temperatures-thermometers
5. why-professional-chefs-use-kosher-salt

## Reference Template
Use `/app/blog/how-to-sear-steaks-like-restaurant-chef/page.tsx` as the formatting reference.

## Required Changes for Each Blog

### 1. Imports (Top of File)
```typescript
import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, User, [RelevantIcons] } from 'lucide-react'
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/schema'
import ProductImpressionTracker from '@/components/ProductImpressionTracker'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'
```

### 2. Metadata
```typescript
export const metadata: Metadata = {
  title: '[Blog Title] | [Subtitle]',
  description: '[SEO description]',
  keywords: ['keyword1', 'keyword2', 'keyword3'],  // ADD THIS
  alternates: {
    canonical: '/blog/[slug]',
  },
}
```

### 3. Wrapper Structure
Replace:
```typescript
<div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
  <article>
```

With:
```typescript
<div className="min-h-screen bg-white">
  {/* JSON-LD Structured Data */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(generateArticleSchema({
        title: "[Article Title]",
        slug: "[slug]",
        description: "[Description]",
        author: "Scott Bradley",
        datePublished: "[YYYY-MM-DDTHH:MM:SSZ]",
        lastUpdated: "[YYYY-MM-DDTHH:MM:SSZ]",
        image: "https://www.chefapprovedtools.com/logo.png",
        category: "[Category]",
        tags: ["tag1", "tag2", "tag3"],
        wordCount: [approximate_word_count]
      }))
    }}
  />
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(generateBreadcrumbSchema([
        { name: "Home", url: "https://www.chefapprovedtools.com" },
        { name: "Blog", url: "https://www.chefapprovedtools.com/blog" },
        { name: "[Article Title]", url: "https://www.chefapprovedtools.com/blog/[slug]" }
      ]))
    }}
  />

  {/* Article Header */}
  <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
```

### 4. Breadcrumb Navigation
Replace inline-style breadcrumbs with:
```typescript
<nav className="text-sm text-slate-600 mb-8">
  <Link href="/" className="hover:text-orange-600">Home</Link>
  <span className="mx-2">/</span>
  <Link href="/blog" className="hover:text-orange-600">Blog</Link>
  <span className="mx-2">/</span>
  <span>[Article Title]</span>
</nav>
```

### 5. Article Meta Section
Add after breadcrumb:
```typescript
<div className="mb-8">
  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-6">
    <div className="flex items-center gap-1">
      <Calendar className="w-4 h-4" />
      <span>[Month Day, Year]</span>
    </div>
    <div className="flex items-center gap-1">
      <Clock className="w-4 h-4" />
      <span>[X min read]</span>
    </div>
    <div className="flex items-center gap-1">
      <User className="w-4 h-4" />
      <span>Scott Bradley</span>
    </div>
    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
      [Category]
    </span>
  </div>

  <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
    [Article Title]
  </h1>

  <p className="text-xl text-slate-600 leading-relaxed">
    [Article intro/hook paragraph]
  </p>
</div>
```

### 6. Content Wrapper
Wrap all article content in:
```typescript
<div className="prose prose-lg prose-slate max-w-none">
  [All article content here]
</div>
```

### 7. Inline Styles to Tailwind Classes

**Info Boxes:**
Replace:
```typescript
<div style={{ background: '#f8f9fa', padding: '25px', ... }}>
```

With Tailwind equivalents like:
```typescript
<div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
```

**Colors available:**
- Orange boxes: `bg-orange-50 border border-orange-200`
- Blue boxes: `bg-blue-50 border border-blue-200`
- Yellow boxes: `bg-yellow-50 border border-yellow-200`
- Green boxes: `bg-green-50 border border-green-200`
- Red boxes: `bg-red-50 border border-red-200`
- Gray boxes: `bg-gray-50 border border-gray-200`
- Slate boxes: `bg-slate-50 border border-slate-200`

**Tables:**
Keep table structure but remove most inline styles (prose handles it)

**Lists:**
Remove inline styles - prose handles ul/ol/li styling

### 8. CTAVisibilityTracker Wrapper
All internal links should be wrapped:
```typescript
<CTAVisibilityTracker
  ctaId="blog-[slug]-[unique-id]"
  position="mid_article"  // or "above_fold", "final_cta"
  productSlug="[slug]"
  merchant="internal"
>
  <Link href="/reviews/[product]" className="text-blue-700 underline">
    [Link Text]
  </Link>
</CTAVisibilityTracker>
```

### 9. Author Bio Section
Add at end of article (before closing article tag):
```typescript
{/* Author Bio */}
<div className="border-t border-gray-200 pt-8 mt-12">
  <div className="flex items-start gap-4">
    <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center">
      <User className="w-8 h-8 text-white" />
    </div>
    <div>
      <h4 className="font-bold text-slate-900 mb-2">Scott Bradley</h4>
      <p className="text-slate-600 text-sm leading-relaxed">
        [Custom bio text relevant to this article]
      </p>
      <div className="mt-4">
        <Link href="/about" className="text-orange-600 hover:text-orange-800 text-sm font-semibold">
          Read more about Scott →
        </Link>
      </div>
    </div>
  </div>
</div>
```

### 10. Related Content Section (Optional)
Add if relevant:
```typescript
{/* Related Content */}
<div className="border-t border-gray-200 pt-8 mt-8">
  <h3 className="text-xl font-bold text-slate-900 mb-6">Related Articles</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Link href="/[url]" className="block bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
      <h4 className="font-bold text-slate-900 mb-2">[Title]</h4>
      <p className="text-slate-600 text-sm">
        [Description]
      </p>
    </Link>
  </div>
</div>
```

---

## Style Conversion Guide

### Headings
- Remove all inline `style={{...}}` from h1, h2, h3, h4
- prose handles heading styling automatically
- Keep h1 with classes: `className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight"`

### Paragraphs
- Remove `style={{ fontSize: '18px', lineHeight: '1.8', ... }}`
- prose handles paragraph styling

### Colored Text Boxes
Common patterns to convert:

**Blue Info Box:**
```typescript
// OLD
<div style={{ background: '#e7f3ff', padding: '20px', margin: '20px 0', ... }}>

// NEW
<div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
```

**Yellow Warning Box:**
```typescript
// OLD
<div style={{ background: '#fff3cd', padding: '20px', ... }}>

// NEW
<div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 my-6">
```

**Orange Highlight Box:**
```typescript
// OLD
<div style={{ background: '#fff3cd', border: '2px solid #ffc107', ... }}>

// NEW
<div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
```

### Grid Layouts
```typescript
// 2-column grid
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">

// Auto-fit grid
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
```

### Spacing
- `my-6` = margin top/bottom 1.5rem
- `mb-8` = margin bottom 2rem
- `mt-12` = margin top 3rem
- `p-6` = padding 1.5rem
- `px-4` = padding left/right 1rem
- `py-12` = padding top/bottom 3rem

---

## Implementation Order
1. best-scrambled-eggs (simplest, good test case)
2. how-to-steel-a-knife
3. kitchen-gloves-guide
4. meat-cooking-temperatures-thermometers
5. why-professional-chefs-use-kosher-salt

---

## Testing Checklist (After Each Update)
- [ ] Build succeeds (`npm run build`)
- [ ] No TypeScript errors
- [ ] Page loads in browser
- [ ] Schemas validate (check Google Rich Results Test)
- [ ] All internal links work
- [ ] CTAVisibilityTracker wraps all internal links
- [ ] Mobile responsive
- [ ] Icons display correctly
- [ ] Article meta section shows correct date/time/category
- [ ] Breadcrumbs work
- [ ] Author bio displays
- [ ] Related content links work

---

## Content Preservation Rules
- DO NOT change any written content/copy
- DO NOT remove any sections
- DO NOT alter the order of content
- ONLY change:
  - Import statements
  - Wrapper structure
  - CSS (inline styles → Tailwind classes)
  - Add schemas
  - Add article meta section
  - Add author bio if missing
  - Wrap links in CTAVisibilityTracker
