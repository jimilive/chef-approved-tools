# Blog Component Architecture

This document defines the standardized component architecture for all blog posts on Chef Approved Tools. Following these patterns ensures consistency, maintainability, and scalability as the site grows to 200+ blog posts.

## Overview

All blog posts should use shared components from `/components/blog/` to eliminate content duplication and provide a single source of truth for common elements like author bios, email capture, and FAQ sections.

## Component Architecture Patterns

### Pattern A: Data-Driven Posts (Recommended for Comparisons & Reviews)

**Best for:** Comparison posts, reviews, and structured content

**Structure:**
```
app/blog/[post-slug]/
├── page.tsx              # Thin component using shared blog components
├── [post-slug]-data.ts   # All content and metadata
└── README.md             # Post-specific documentation (optional)
```

**Benefits:**
- Separates content from presentation
- Easy content updates without touching React code
- Consistent structure across similar post types
- TypeScript interfaces ensure data integrity

**Example:** All 8 comparison posts (cast-iron-vs-carbon-steel, gas-vs-induction, etc.)

### Pattern B: Component-Based Posts (For Simple Content)

**Best for:** Simple blog posts, announcements, news

**Structure:**
```
app/blog/[post-slug]/
└── page.tsx              # Uses shared blog components with inline content
```

**Benefits:**
- Simpler for short posts
- Still uses shared components for consistency
- No need for separate data file

**Migration Path:** 64 existing inline posts should gradually adopt shared components

## Available Blog Components

### 1. BlogLayout

**Purpose:** Wrapper for all blog posts providing consistent background, max-width, and breadcrumbs

**Usage:**
```tsx
import BlogLayout from '@/components/blog/BlogLayout'

export default function MyBlogPost() {
  return (
    <BlogLayout breadcrumbTitle="Your Post Title">
      {/* Your content */}
    </BlogLayout>
  )
}
```

**Props:**
- `breadcrumbTitle: string` - Title shown in breadcrumb navigation
- `children: ReactNode` - Post content

---

### 2. BlogHero

**Purpose:** Standardized hero section with title, dates, author, and introduction

**Usage:**
```tsx
import BlogHero from '@/components/blog/BlogHero'

<BlogHero
  title="Your Post Title"
  introduction={["First paragraph", "Second paragraph"]}
  publishedDate="2025-01-15"
  lastUpdated="2025-01-20"
  readTime="8 min read"
/>
```

**Props:**
- `title: string` - H1 title
- `introduction: string[]` - Array of introduction paragraphs
- `publishedDate: string` - ISO date string (YYYY-MM-DD)
- `lastUpdated: string` - ISO date string (YYYY-MM-DD)
- `readTime: string` - e.g., "8 min read"
- `authorName?: string` - Defaults to "Scott Bradley"
- `authorYears?: string` - Defaults to "24 years professional kitchen experience"

---

### 3. BlogFAQ

**Purpose:** Standardized FAQ section with consistent styling

**Usage:**
```tsx
import BlogFAQ from '@/components/blog/BlogFAQ'
import { generateFAQSchema } from '@/lib/schema'

const faqSchema = generateFAQSchema(questions)

// In page.tsx:
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
<BlogFAQ questions={questions} />
```

**Props:**
- `questions: FAQItem[]` - Array of `{ question: string, answer: string }`
- `title?: string` - Defaults to "Common Questions"

**SEO Note:** Always pair with `generateFAQSchema()` for proper structured data

---

### 4. BlogEmailCapture

**Purpose:** Consistent email capture section using ActiveCampaign

**Usage:**
```tsx
import BlogEmailCapture from '@/components/blog/BlogEmailCapture'

<BlogEmailCapture />
```

**No props required.** Automatically includes proper spacing and styling.

---

### 5. BlogAuthorBio

**Purpose:** Standardized author section - single source of truth for author information

**Usage:**
```tsx
import BlogAuthorBio from '@/components/blog/BlogAuthorBio'

<BlogAuthorBio />
// or
<BlogAuthorBio variant="compact" />
// or
<BlogAuthorBio variant="inline" />
```

**Props:**
- `variant?: 'full' | 'compact' | 'inline'` - Defaults to "full"
- `showImage?: boolean` - Defaults to true

**Variants:**
- `full` - Complete bio with stats, used at end of posts
- `compact` - Smaller version with image and brief info
- `inline` - Minimal version for tight spaces

---

## Complete Example: Data-Driven Comparison Post

### Step 1: Create Data File

**File:** `app/blog/my-comparison/my-comparison-data.ts`

```typescript
export const comparisonData = {
  metadata: {
    title: "Product A vs Product B: What 24 Years Taught Me",
    description: "Professional comparison...",
    publishedDate: "2025-01-15",
    lastUpdated: "2025-01-20",
    readTime: "12 min read"
  },
  breadcrumb: {
    title: "Product A vs Product B"
  },
  hero: {
    title: "Product A vs Product B: What 24 Years in Professional Kitchens Taught Me",
    introduction: [
      "First paragraph...",
      "Second paragraph..."
    ]
  },
  faq: {
    questions: [
      {
        question: "Which is better for...?",
        answer: "Answer here..."
      }
    ]
  }
}
```

### Step 2: Create Page Component

**File:** `app/blog/my-comparison/page.tsx`

```tsx
import { Metadata } from 'next'
import { comparisonData } from './my-comparison-data'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema'
import {
  BlogLayout,
  BlogHero,
  BlogFAQ,
  BlogEmailCapture,
  BlogAuthorBio
} from '@/components/blog'

export const metadata: Metadata = {
  title: comparisonData.metadata.title,
  description: comparisonData.metadata.description,
  openGraph: {
    type: 'article',
    publishedTime: `${comparisonData.metadata.publishedDate}T00:00:00Z`,
    modifiedTime: `${comparisonData.metadata.lastUpdated}T00:00:00Z`,
  },
}

export default function MyComparisonPost() {
  const articleSchema = generateArticleSchema({
    headline: comparisonData.metadata.title,
    description: comparisonData.metadata.description,
    datePublished: comparisonData.metadata.publishedDate,
    dateModified: comparisonData.metadata.lastUpdated,
    authorName: 'Scott Bradley',
    images: []
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.chefapprovedtools.com' },
    { name: 'Blog', url: 'https://www.chefapprovedtools.com/blog' },
    { name: comparisonData.breadcrumb.title, url: 'https://www.chefapprovedtools.com/blog/my-comparison' }
  ])

  const faqSchema = generateFAQSchema(comparisonData.faq.questions)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <BlogLayout breadcrumbTitle={comparisonData.breadcrumb.title}>
        <BlogHero
          title={comparisonData.hero.title}
          introduction={comparisonData.hero.introduction}
          publishedDate={comparisonData.metadata.publishedDate}
          lastUpdated={comparisonData.metadata.lastUpdated}
          readTime={comparisonData.metadata.readTime}
        />

        {/* Your custom sections here */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          {/* Custom content */}
        </section>

        <BlogFAQ questions={comparisonData.faq.questions} />
        <BlogEmailCapture />
        <BlogAuthorBio />
      </BlogLayout>
    </>
  )
}
```

## Migration Guide for Existing Posts

### Current State
- 64 posts use inline everything (600-900+ lines per file)
- Author bio duplicated 64+ times
- Email capture duplicated 64+ times
- No consistency across posts

### Migration Strategy

**Phase 1: High-Traffic Posts (Immediate)**
1. Identify top 10 posts by traffic
2. Extract inline content to data files (if applicable)
3. Replace inline author bio with `<BlogAuthorBio />`
4. Replace inline email capture with `<BlogEmailCapture />`
5. Wrap in `<BlogLayout>`

**Phase 2: New Posts (Ongoing)**
- All new posts MUST use shared blog components
- Use Pattern A (data-driven) for comparisons and reviews
- Use Pattern B (component-based) for simple posts

**Phase 3: Gradual Migration (As Needed)**
- Update posts when making content changes
- No need to migrate all at once
- Focus on consistency for new content

### Benefits of Migration
1. **Single Source of Truth:** Update author bio once, reflects everywhere
2. **Smaller Files:** 600-900 line files → 150-200 lines
3. **Consistency:** All posts look and behave the same
4. **Maintainability:** Easier to update and debug
5. **Scalability:** Can easily grow to 200+ posts

## Component Import Patterns

### Individual Imports
```tsx
import BlogLayout from '@/components/blog/BlogLayout'
import BlogHero from '@/components/blog/BlogHero'
```

### Batch Import (Recommended)
```tsx
import {
  BlogLayout,
  BlogHero,
  BlogFAQ,
  BlogEmailCapture,
  BlogAuthorBio
} from '@/components/blog'
```

## TypeScript Interfaces

### FAQItem
```typescript
interface FAQItem {
  question: string
  answer: string
}
```

### Product (for comparison posts)
```typescript
interface Product {
  name: string
  size: string
  priceRange: string
  whyBest: string
  features: string[]
  reviewSlug?: string | null  // Link to review page when available
}
```

## SEO Requirements

All blog posts using these components must:
1. Include Article schema via `generateArticleSchema()`
2. Include Breadcrumb schema via `generateBreadcrumbSchema()`
3. Include FAQ schema if using `<BlogFAQ>` via `generateFAQSchema()`
4. Use proper meta tags via Next.js `Metadata`

See `SEO_AND_ACCESSIBILITY_REQUIREMENTS.md` for full requirements.

## File Size Guidelines

**Target file sizes after component adoption:**
- Data files: 300-500 lines
- Page.tsx files: 100-200 lines
- Total per post: 400-700 lines (vs current 600-900 in single file)

**Benefits:**
- Easier to navigate and edit
- Clearer separation of concerns
- Reduced cognitive load

## Questions and Answers

### Q: Should I use Pattern A or Pattern B?
**A:** Use Pattern A (data-driven) for structured content like comparisons and reviews. Use Pattern B (component-based with inline content) for simple posts and announcements.

### Q: What if I need custom sections?
**A:** Use the shared components for common elements (hero, FAQ, author bio, email capture) and add custom sections in between. The components are designed to integrate seamlessly with custom content.

### Q: Do I need to migrate old posts immediately?
**A:** No. Migrate as you update content or focus on high-traffic posts first. All new posts should use shared components.

### Q: Can I customize the author bio?
**A:** The author bio is a single source of truth. If you need changes, update `/components/AuthorBio.tsx` once and it reflects everywhere. For post-specific author info, use the `BlogHero` component's author props.

### Q: What about images in blog posts?
**A:** Images should be added as custom sections between the shared components. Use Next.js `Image` component with proper alt text and sizing.

## Related Documentation

- `COMPARISON_POST_TEMPLATE.md` - Template for comparison posts
- `SEO_AND_ACCESSIBILITY_REQUIREMENTS.md` - SEO and accessibility standards
- `CONTENT_GUIDELINES.md` - Writing style and tone
- `STYLE_GUIDE.md` - Visual design standards

## Support

For questions about blog component architecture, refer to this document or examine the 8 comparison posts that already use this pattern:
- `/app/blog/cast-iron-vs-carbon-steel-pan/`
- `/app/blog/gas-vs-induction-cooktop/`
- `/app/blog/nonstick-vs-stainless-steel-pans/`
- And 5 others...
