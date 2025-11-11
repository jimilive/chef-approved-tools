# Technical Standards - Complete Guide

**Last Updated:** November 10, 2025  
**Purpose:** All technical standards for Chef Approved Tools  
**Prerequisites:** Read START_HERE.md for protection rules

---

## 📚 CRITICAL: Read This First

**Before making ANY technical changes:**
1. **Read START_HERE.md** - Protection rules and red flags
2. **Read this document** - Technical standards and requirements
3. **Get approval** - No changes without explicit approval

**This document covers:**
- Design System (colors, typography, components)
- Accessibility Requirements (WCAG AA compliance)
- Code Architecture (Next.js, TypeScript, patterns)
- Performance Standards (Lighthouse, optimization)
- Tracking & Analytics (GTM, dataLayer)

---

## 🎯 Quick Navigation

**Jump to:**
- [Part 1: Design System](#part-1-design-system)
- [Part 2: Accessibility Requirements](#part-2-accessibility-requirements)
- [Part 3: Code Architecture](#part-3-code-architecture)
- [Part 4: Performance Standards](#part-4-performance-standards)
- [Part 5: Tracking & Analytics](#part-5-tracking--analytics)
- [Appendix: Quick Reference](#appendix-quick-reference)

---

# Part 1: Design System

## 🎨 Color Palette

### Primary Brand Colors

**Orange (Primary Action Color):**
```css
/* Primary CTA backgrounds */
--orange-600: #ea580c   /* Primary gradient start */
--orange-700: #c2410c   /* Links, hover states (ACCESSIBILITY COMPLIANT) */

/* CRITICAL: Use orange-700 for text links, NOT orange-600 */
/* orange-600 fails WCAG AA contrast (4.5:1 required) */
/* orange-700 passes with 4.6:1 contrast ratio */
```

**Red (Accent Color):**
```css
/* Primary CTA backgrounds */
--red-600: #dc2626     /* Primary gradient end */
--red-700: #b91c1c     /* Hover gradient end */
```

**Amber (Star Ratings):**
```css
/* Star ratings ONLY */
--amber-700: #b45309   /* ACCESSIBILITY COMPLIANT for stars */

/* CRITICAL: Use amber-700 for star ratings, NOT yellow-400 */
/* yellow-400 fails WCAG AA contrast */
/* amber-700 passes with sufficient contrast */
```

### Neutral Colors

**Slate (Text and Borders):**
```css
/* Text colors */
--slate-900: #0f172a   /* Primary body text */
--slate-700: #334155   /* Secondary text, labels */
--slate-600: #475569   /* Tertiary text, metadata */

/* Background and borders */
--slate-50: #f8fafc    /* Light backgrounds */
--gray-50: #f9fafb     /* Page background */
--gray-100: #f3f4f6    /* Card backgrounds */
--gray-200: #e5e7eb    /* Borders, dividers */
--gray-300: #d1d5db    /* Strong borders */
```

### Background Colors

```css
/* Page backgrounds */
--bg-page: #f9fafb              /* gray-50 */

/* Component backgrounds */
--bg-card: #ffffff              /* white */
--bg-card-hover: #f9fafb        /* gray-50 */
--bg-feature: #f3f4f6           /* gray-100 */

/* Highlight backgrounds */
--bg-orange-highlight: #fff7ed  /* orange-50 - for featured items */
--bg-orange-light: #ffedd5      /* orange-100 - for emphasis */
```

### Usage Rules

**❌ NEVER use these for text:**
- `text-orange-600` (fails accessibility)
- `text-yellow-400` (fails accessibility)
- `text-slate-700` on colored backgrounds (often fails)

**✅ ALWAYS use these:**
- `text-orange-700` for links
- `text-amber-700` for star ratings
- `text-slate-900` for body text on white/light backgrounds
- `text-white` on dark/colored backgrounds

---

## 🔤 Typography

### Font Stack

**Primary Font:** System font stack (no custom fonts)

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
             'Helvetica Neue', Arial, sans-serif;
```

**Why system fonts:**
- Instant loading (no font files to download)
- Familiar to users (native OS appearance)
- Better performance (no FOUT or FOIT)
- Excellent readability

---

### Type Scale

**Headings:**
```tsx
// H1 - Page titles
className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900"

// H2 - Section headings
className="text-2xl md:text-3xl font-bold text-slate-900"

// H3 - Subsection headings
className="text-xl md:text-2xl font-semibold text-slate-900"

// H4 - Component headings
className="text-lg md:text-xl font-semibold text-slate-900"
```

**Body Text:**
```tsx
// Large body text (intros, emphasis)
className="text-lg text-slate-700"

// Standard body text
className="text-base text-slate-900"

// Small text (metadata, captions)
className="text-sm text-slate-600"

// Extra small text (fine print, labels)
className="text-xs text-slate-600"
```

**Line Heights:**
```tsx
// Headings: Use default or tight
className="leading-tight"  // 1.25
className="leading-snug"   // 1.375

// Body text: Use relaxed for readability
className="leading-relaxed"  // 1.625
```

---

### Font Weights

```tsx
// Regular body text
className="font-normal"   // 400

// Emphasis, labels
className="font-medium"   // 500

// Headings, strong emphasis
className="font-semibold" // 600

// Titles, extra emphasis
className="font-bold"     // 700
```

---

## 📐 Spacing System

### Container Width

**Standard container:**
```tsx
className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
```

**Breakdown:**
- `max-w-7xl` = 1280px maximum width
- `mx-auto` = Centered horizontally
- `px-4 sm:px-6 lg:px-8` = Responsive padding

**NEVER exceed max-w-7xl** - This is the maximum content width site-wide.

---

### Spacing Scale

**Tailwind spacing scale (use these):**

```tsx
// Extra small spacing
className="space-y-2"  // 0.5rem / 8px
className="gap-2"      // 0.5rem / 8px

// Small spacing
className="space-y-4"  // 1rem / 16px
className="gap-4"      // 1rem / 16px

// Medium spacing (most common)
className="space-y-6"  // 1.5rem / 24px
className="gap-6"      // 1.5rem / 24px

// Large spacing
className="space-y-8"  // 2rem / 32px
className="gap-8"      // 2rem / 32px

// Extra large spacing (sections)
className="space-y-12" // 3rem / 48px
className="gap-12"     // 3rem / 48px
```

**Section spacing:**
```tsx
// Between major sections
className="my-12"      // 3rem vertical margin
className="my-16"      // 4rem vertical margin (desktop)

// Component internal spacing
className="p-6"        // 1.5rem padding
className="p-8"        // 2rem padding (larger components)
```

---

## 🔘 Button Styles

### Primary CTA Button (Orange Gradient)

**Standard implementation:**
```tsx
<button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg">
  Check Price on Amazon →
</button>
```

**Properties:**
- Background: Orange to red gradient
- Text: White, semibold
- Padding: `px-8 py-4` (2rem × 1rem)
- Border radius: `rounded-xl` (0.75rem)
- Hover: Darker gradient + 105% scale
- Active: 95% scale (pressed effect)
- Shadow: `shadow-lg`

**When to use:** Primary CTAs (affiliate links, main actions)

---

### Secondary Button (White with Orange Border)

**Standard implementation:**
```tsx
<button className="bg-white border-2 border-orange-600 text-orange-600 hover:bg-orange-50 font-semibold px-6 py-3 rounded-lg transition-all">
  Learn More
</button>
```

**Properties:**
- Background: White, hover to orange-50
- Border: 2px solid orange-600
- Text: Orange-600, semibold
- Padding: `px-6 py-3`
- Border radius: `rounded-lg`

**When to use:** Secondary actions, competitor CTAs in comparison tables

---

### Text Button (Link Style)

**Standard implementation:**
```tsx
<button className="text-orange-700 hover:text-orange-800 font-medium underline underline-offset-4">
  Read full review →
</button>
```

**Properties:**
- Text: Orange-700 (accessible)
- Hover: Orange-800 (darker)
- Underline: 4px offset
- Font: Medium weight

**When to use:** Inline CTAs, navigation links

---

### Button States

**Disabled state:**
```tsx
className="disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
```

**Loading state:**
```tsx
<button disabled className="relative">
  <span className="opacity-0">Check Price on Amazon</span>
  <span className="absolute inset-0 flex items-center justify-center">
    <LoadingSpinner />
  </span>
</button>
```

---

## 📦 Component Patterns

### Card Component

**Standard card:**
```tsx
<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
  {/* Card content */}
</div>
```

**Properties:**
- Background: White
- Border: 1px gray-200
- Border radius: `rounded-xl`
- Padding: `p-6`
- Shadow: Small, increases on hover
- Transition: Shadow only

---

### Badge Component

**Tier badge:**
```tsx
<div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold">
  🏆 Tier 1: Professional Kitchen Testing
</div>
```

**Properties:**
- Background: Orange-100 (light orange)
- Text: Orange-700 (dark orange)
- Shape: Fully rounded (`rounded-full`)
- Padding: `px-4 py-2`
- Text: Small, semibold

---

### Section Container

**Standard section:**
```tsx
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
  <h2 className="text-3xl font-bold mb-6">Section Title</h2>
  {/* Section content */}
</section>
```

**Properties:**
- Container: max-w-7xl centered
- Padding: Responsive
- Margin: 3rem top and bottom
- Heading: Bold, 3xl, 1.5rem bottom margin

---

## 🎭 Animation & Transitions

### Standard Transitions

**Color/opacity changes:**
```tsx
className="transition-colors duration-200"
className="transition-opacity duration-300"
```

**Transform changes:**
```tsx
className="transition-transform duration-200"
className="hover:scale-105"
```

**Multiple properties:**
```tsx
className="transition-all duration-200"
```

**Guidelines:**
- Use 200ms for quick interactions (hovers, clicks)
- Use 300ms for fades and opacity changes
- Use 500ms for major layout changes
- Avoid transitions >500ms (feels sluggish)

---

### Hover Effects

**Cards:**
```tsx
className="hover:shadow-md transition-shadow"
```

**Buttons:**
```tsx
className="hover:scale-105 active:scale-95 transition-transform"
```

**Links:**
```tsx
className="hover:text-orange-800 transition-colors"
```

**Images:**
```tsx
className="hover:opacity-90 transition-opacity"
```

---

## 📱 Responsive Design

### Breakpoints

**Tailwind breakpoints (use these):**

```tsx
// sm: 640px
className="sm:text-lg"

// md: 768px
className="md:text-xl"

// lg: 1024px
className="lg:text-2xl"

// xl: 1280px
className="xl:text-3xl"

// 2xl: 1536px
className="2xl:text-4xl"
```

**Mobile-first approach:**
- Base styles = mobile (375px)
- Add `sm:` for tablets
- Add `lg:` for desktop
- Add `xl:` for large desktop

---

### Responsive Patterns

**Show/hide by breakpoint:**
```tsx
// Hidden on mobile, shown on desktop
className="hidden lg:block"

// Shown on mobile, hidden on desktop
className="block lg:hidden"
```

**Responsive grid:**
```tsx
// 1 column mobile, 2 columns tablet, 3 columns desktop
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
```

**Responsive text:**
```tsx
// Smaller on mobile, larger on desktop
className="text-2xl md:text-3xl lg:text-4xl"
```

**Responsive spacing:**
```tsx
// Less padding on mobile, more on desktop
className="px-4 sm:px-6 lg:px-8"
className="py-8 md:py-12 lg:py-16"
```

---

## 🖼️ Image Standards

### Image Optimization

**Next.js Image component (always use this):**
```tsx
import Image from 'next/image'

<Image
  src="/images/product.jpg"
  alt="Descriptive alt text"
  width={800}
  height={600}
  quality={75}           // Standard quality
  loading="lazy"         // Lazy load below fold
  className="rounded-lg"
/>
```

**Properties:**
- Quality: 75 (standard), 85 (hero images), 60 (thumbnails)
- Loading: "lazy" for below-fold, "eager" for above-fold
- Format: WebP preferred (automatic with Next.js Image)
- Dimensions: Always specify width and height

---

### Image Aspect Ratios

**Common ratios:**
```tsx
// Hero images - 16:9
aspect-ratio: 16/9

// Product cards - 4:3
aspect-ratio: 4/3

// Profile images - 1:1
aspect-ratio: 1/1

// Blog thumbnails - 3:2
aspect-ratio: 3/2
```

**Implementation:**
```tsx
<div className="aspect-[16/9] relative">
  <Image
    src="/image.jpg"
    alt="..."
    fill
    className="object-cover"
  />
</div>
```

---

# Part 2: Accessibility Requirements

## ♿ The 4 Critical Rules

These are the most common accessibility violations. **NEVER violate these.**

---

### Rule #1: Text Link Colors

**❌ FAILS WCAG AA:**
```tsx
<a className="text-orange-600">Link text</a>
```

**Contrast ratio:** 3.2:1 (needs 4.5:1)

**✅ PASSES WCAG AA:**
```tsx
<a className="text-orange-700">Link text</a>
```

**Contrast ratio:** 4.6:1 ✅

**Why this matters:**
- 1 in 12 men have color vision deficiency
- Low contrast makes text unreadable
- Legal requirement (ADA compliance)
- Google SEO considers accessibility

**Rule:** ALL text links must use `text-orange-700` or darker.

---

### Rule #2: Star Rating Colors

**❌ FAILS WCAG AA:**
```tsx
<span className="text-yellow-400">★★★★★</span>
```

**Contrast ratio:** 2.9:1 (needs 4.5:1)

**✅ PASSES WCAG AA:**
```tsx
<span className="text-amber-700">★★★★★</span>
```

**Contrast ratio:** 4.8:1 ✅

**Why this matters:**
- Yellow-400 is too light on white backgrounds
- Star ratings are critical trust signals
- Must be readable by all users

**Rule:** ALL star ratings must use `text-amber-700`.

---

### Rule #3: Heading Hierarchy

**❌ WRONG - Skipping levels:**
```tsx
<h1>Page Title</h1>
<h3>Section</h3>  {/* Skipped h2! */}
<h4>Subsection</h4>
```

**✅ CORRECT - Sequential:**
```tsx
<h1>Page Title</h1>
<h2>Section</h2>
<h3>Subsection</h3>
<h4>Detail</h4>
```

**Why this matters:**
- Screen readers navigate by headings
- Skipping levels confuses navigation
- SEO penalizes broken hierarchy

**Rule:** Always go h1 → h2 → h3 → h4 (sequential, no skipping).

---

### Rule #4: Single H1 Per Page

**❌ WRONG - Multiple H1s:**
```tsx
<h1>Product Review</h1>
<h1>Detailed Analysis</h1>  {/* Second h1! */}
```

**✅ CORRECT - One H1:**
```tsx
<h1>Product Review</h1>
<h2>Detailed Analysis</h2>
```

**Why this matters:**
- H1 defines page topic for screen readers
- Multiple H1s confuse document structure
- SEO expects single H1 (page title)

**Rule:** Exactly ONE h1 tag per page.

---

## 🎯 Focus States

### Visible Focus Indicators

**All interactive elements MUST have visible focus states.**

**Standard focus ring:**
```tsx
className="focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2"
```

**Properties:**
- Ring width: 2px
- Ring color: Orange-600
- Ring offset: 2px (space between element and ring)
- Outline: None (using ring instead)

**When to use:** Buttons, links, inputs, any focusable element.

---

### Focus States by Element

**Buttons:**
```tsx
<button className="... focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2">
  Button Text
</button>
```

**Links:**
```tsx
<a className="text-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 rounded">
  Link Text
</a>
```

**Inputs:**
```tsx
<input className="... focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600" />
```

---

## 📋 Semantic HTML

### Use Proper HTML Elements

**❌ WRONG - Divs for everything:**
```tsx
<div onClick={handleClick}>Click me</div>
<div>
  <div>Title</div>
  <div>Content</div>
</div>
```

**✅ CORRECT - Semantic elements:**
```tsx
<button onClick={handleClick}>Click me</button>
<article>
  <h2>Title</h2>
  <p>Content</p>
</article>
```

---

### Semantic HTML Elements

**Use these appropriately:**

```tsx
// Page structure
<header>    // Site/page header
<nav>       // Navigation menus
<main>      // Main content (one per page)
<article>   // Self-contained content (blog posts, products)
<section>   // Thematic grouping
<aside>     // Related content, sidebars
<footer>    // Site/page footer

// Content
<h1> to <h6>  // Headings (in order)
<p>           // Paragraphs
<ul>, <ol>    // Lists
<figure>      // Images with captions
<figcaption>  // Image captions
<blockquote>  // Quotations
<time>        // Dates and times

// Interactive
<button>      // Buttons (not divs!)
<a>           // Links (not buttons for links!)
<form>        // Forms
<input>       // Form inputs
<label>       // Input labels
```

---

## 🏷️ ARIA Labels and Roles

### When to Use ARIA

**Use ARIA when:**
- Semantic HTML isn't sufficient
- Need to provide additional context
- Custom components (not native HTML)

**Don't use ARIA when:**
- Native HTML element exists
- It would be redundant

---

### Common ARIA Patterns

**Buttons with icons only:**
```tsx
<button aria-label="Close dialog">
  <XIcon />
</button>
```

**Loading states:**
```tsx
<button aria-busy="true" aria-label="Loading...">
  <LoadingSpinner />
</button>
```

**Expanded/collapsed sections:**
```tsx
<button
  aria-expanded={isOpen}
  aria-controls="section-content"
>
  Toggle Section
</button>
<div id="section-content" aria-hidden={!isOpen}>
  Content
</div>
```

**Star ratings:**
```tsx
<div role="img" aria-label="5 out of 5 stars">
  <span className="text-amber-700" aria-hidden="true">★★★★★</span>
</div>
```

---

## 🖱️ Keyboard Navigation

### All Interactive Elements Must Be Keyboard Accessible

**Requirements:**
- Focusable with Tab key
- Actionable with Enter or Space
- Visible focus indicator
- Logical tab order

**Tab order:**
```tsx
// Use tabIndex sparingly
tabIndex={0}   // Include in tab order
tabIndex={-1}  // Exclude from tab order (programmatic focus only)

// DON'T use positive tabIndex (breaks natural order)
```

---

### Skip Links

**Add skip link for keyboard users:**
```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-orange-600 text-white px-4 py-2 z-50"
>
  Skip to main content
</a>

<main id="main-content">
  {/* Page content */}
</main>
```

**Why:** Allows keyboard users to skip repetitive navigation.

---

## 🖼️ Image Accessibility

### Alt Text Requirements

**Every image MUST have alt text.**

**Decorative images:**
```tsx
<Image src="/decoration.jpg" alt="" />
```

**Empty alt for decorative images** (NOT missing alt).

**Informative images:**
```tsx
<Image
  src="/vitamix-5200.jpg"
  alt="Vitamix 5200 blender with 64oz container on kitchen counter after 6 years professional use"
/>
```

**Alt text guidelines:**
- Describe what's in the image
- Include context when relevant
- Keep under 125 characters
- Don't start with "Image of" or "Picture of"
- Be specific and descriptive

---

## 📱 Mobile Accessibility

### Touch Target Size

**Minimum touch target: 44×44px**

```tsx
// Too small (fails accessibility)
<button className="px-2 py-1">Click</button>

// Good size (passes accessibility)
<button className="px-4 py-3">Click</button>

// Better (comfortable for most users)
<button className="px-6 py-4">Click</button>
```

**Why:** Smaller targets are hard to tap, especially for users with motor impairments.

---

### Pinch to Zoom

**NEVER disable zoom:**

```html
<!-- ❌ WRONG - Disables zoom -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

<!-- ✅ CORRECT - Allows zoom -->
<meta name="viewport" content="width=device-width, initial-scale=1">
```

---

# Part 3: Code Architecture

## 🏗️ Tech Stack

### Core Technologies

**Framework & Language:**
- **Next.js:** 14.2.32 (App Router)
- **React:** 18.3.1
- **TypeScript:** 5.4.5 (strict mode enabled)

**Styling:**
- **Tailwind CSS:** 3.4.1
- **NO CSS Modules** (use Tailwind only)
- **NO inline styles** (use Tailwind classes)

**Database:**
- **Supabase:** 2.76.1+
- PostgreSQL backend
- Real-time subscriptions (not currently used)

**Deployment:**
- **Vercel:** Production hosting
- **GitHub:** Version control
- Automatic deployments on push to main

**Analytics:**
- **Google Tag Manager:** Container for all tracking
- **Google Analytics 4:** Via GTM
- **Vercel Analytics:** Built-in

---

### Dependencies Overview

**Key dependencies (from package.json):**

```json
{
  "next": "14.2.32",
  "react": "18.3.1",
  "typescript": "5.4.5",
  "tailwindcss": "3.4.1",
  "@supabase/supabase-js": "^2.76.1",
  "react-hot-toast": "^2.4.1"
}
```

**Why these choices:**
- Next.js 14 = App Router, React Server Components, excellent SEO
- TypeScript strict = Catch errors at compile time
- Tailwind = Fast development, consistent design, small bundle
- Supabase = Postgres + realtime + auth + storage (all-in-one)

---

## 📁 Project Structure

### Directory Layout

```
/app                      # Next.js App Router
  /reviews               # Product review pages
    /[product-slug]      # Dynamic review routes
      /page.tsx          # Review page component
      /data.ts           # Review content data
  /blog                  # Blog posts
    /[slug]              # Dynamic blog routes
      /page.tsx          # Blog post component
  /guides                # Buying guides
  /categories            # Category pages
  /layout.tsx            # Root layout
  /page.tsx              # Homepage
  /globals.css           # Global styles, custom CSS

/components              # React components
  /review               # Review page components
  /blog                 # Blog components
  /comparison           # Comparison table
  /tracking             # Analytics components

/lib                     # Utility functions
  /supabase.ts          # Supabase client & queries
  /schema.ts            # Schema.org generators
  /tracking.ts          # Analytics tracking
  /analytics.ts         # [DEPRECATED] Old tracking

/types                   # TypeScript types
  /product.ts           # Product type definitions

/public                  # Static assets
  /images               # Optimized images

/data                    # Static data files
  /blog                 # Blog post data (Pattern A)
```

---

## 🎯 File Naming Conventions

### Standard Naming

**Components:**
```
ReviewHero.tsx          // PascalCase for components
ProductCard.tsx
BlogLayout.tsx
```

**Utilities:**
```
supabase.ts            // camelCase for utilities
tracking.ts
schema.ts
```

**Types:**
```
product.ts             // camelCase for type files
review.ts
```

**Data files:**
```
data.ts                // Standard name for page data
blender-comparison-data.ts  // Descriptive for specific data
```

---

## 🔧 TypeScript Configuration

### Strict Mode (Enabled)

**tsconfig.json settings:**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

**What this means:**
- No `any` types (must be explicit)
- All variables must have types
- Null and undefined handled explicitly
- Function parameters typed
- Unused code flagged

**Benefits:**
- Catch errors at compile time
- Better IDE autocomplete
- Safer refactoring
- Self-documenting code

---

### Type Definitions

**Always define types for:**
- Component props
- Function parameters
- Function return values
- API responses
- Database queries

**Example:**
```typescript
// ✅ GOOD - Explicit types
interface ReviewHeroProps {
  title: string
  rating: number
  verdict: string
}

function ReviewHero({ title, rating, verdict }: ReviewHeroProps): JSX.Element {
  return <div>...</div>
}

// ❌ BAD - No types
function ReviewHero({ title, rating, verdict }) {
  return <div>...</div>
}
```

---

## 🗄️ Database Patterns

### Supabase Integration

**Client initialization:**
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
```

---

### Data Fetching Patterns

**Pattern 1: Single Product (No Fallback)**

Use on dedicated product pages.

```typescript
import { getProductBySlug, getPrimaryAffiliateLink } from '@/lib/supabase'

const product = await getProductBySlug('vitamix-5200')
if (!product) throw new Error('Product not found')

const affiliateUrl = getPrimaryAffiliateLink(product)
```

**When to use:**
- Product review pages
- Any page where product MUST exist

---

**Pattern 2: Single Product (With Fallback)**

Use on multi-product pages or guides.

```typescript
const product = await getProductBySlug('vitamix-5200')
const affiliateUrl = product 
  ? getPrimaryAffiliateLink(product)
  : 'https://amzn.to/fallback'
```

**When to use:**
- Category pages
- Blog posts mentioning products
- Comparison pages

---

**Pattern 3: Multiple Products**

```typescript
import { getProductsBySlugs } from '@/lib/supabase'

const relatedProducts = await getProductsBySlugs([
  'vitamix-5200',
  'blendtec-designer-725',
  'ninja-professional'
])
```

**When to use:**
- Related products sections
- Comparison tables
- Category grids

---

### Caching Strategy

**Use ISR (Incremental Static Regeneration):**

```typescript
// ✅ CORRECT - ISR caching
export const revalidate = 3600        // Revalidate every hour
export const fetchCache = 'force-cache'

export default async function ReviewPage() {
  const product = await getProductBySlug('product-slug')
  // ...
}
```

**❌ WRONG - Force dynamic:**
```typescript
export const dynamic = 'force-dynamic'  // Don't use this
```

**Why ISR:**
- Pages cached for 1 hour
- Fast page loads (served from cache)
- Automatic revalidation (fresh data)
- Lower database load
- Better user experience

---

## 🧩 Component Patterns

### Server Components (Default)

**Use for:**
- Data fetching
- Database queries
- Static content
- SEO-critical content

```typescript
// Default is Server Component
export default async function ReviewPage() {
  const product = await getProductBySlug('slug')
  return <div>...</div>
}
```

---

### Client Components

**Use for:**
- Interactivity (onClick, onChange)
- React hooks (useState, useEffect)
- Browser APIs (window, document)
- Third-party libraries requiring client

```typescript
'use client'

import { useState } from 'react'

export default function InteractiveComponent() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

**Directive:** `'use client'` at top of file

---

### Component Organization

**Single Responsibility:**
- Each component does ONE thing
- Small, focused components
- Easier to test and maintain

**Composition over Inheritance:**
- Build complex UIs from simple components
- Pass children instead of complex props
- Use composition for flexibility

**Example:**
```typescript
// ❌ BAD - Monolithic component
function ProductPage() {
  return (
    <div>
      {/* 500 lines of JSX */}
    </div>
  )
}

// ✅ GOOD - Composed components
function ProductPage() {
  return (
    <>
      <ReviewHero {...heroData} />
      <TestingResults {...testingData} />
      <PerformanceAnalysis {...performanceData} />
      <ProsConsGrid pros={pros} cons={cons} />
    </>
  )
}
```

---

## 🔗 Data/Presentation Separation

### Separate Data Files

**Pattern:**
```
/app/reviews/vitamix-5200/
├── page.tsx        # Presentation (components)
└── data.ts         # Content (strings, arrays)
```

**Why:**
- Easy to update content without touching code
- Clear separation of concerns
- Better for non-technical content updates
- Easier to maintain

**Example:**

```typescript
// data.ts
export const heroData = {
  title: "Vitamix 5200 Review",
  verdict: "After 6 years...",
  rating: 5
}

// page.tsx
import { heroData } from './data'

export default function ReviewPage() {
  return <ReviewHero {...heroData} />
}
```

---

## 📦 Import Organization

### Import Order

```typescript
// 1. React & Next.js
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

// 2. Third-party libraries
import { toast } from 'react-hot-toast'

// 3. Components (group by feature)
import ReviewHero from '@/components/review/ReviewHero'
import TestingResults from '@/components/review/TestingResults'

// 4. Utilities & types
import { getProductBySlug } from '@/lib/supabase'
import { Product } from '@/types/product'

// 5. Data
import * as reviewData from './data'
```

---

## 🚫 What NOT to Do

### Forbidden Patterns

**❌ Don't use CSS Modules:**
```typescript
import styles from './Component.module.css'  // NO!
```

**Use Tailwind instead.**

---

**❌ Don't use inline styles:**
```tsx
<div style={{ color: 'red' }}>Text</div>  // NO!
```

**Use Tailwind classes.**

---

**❌ Don't use `any` type:**
```typescript
function process(data: any) { }  // NO!
```

**Be explicit with types.**

---

**❌ Don't skip TypeScript errors:**
```typescript
// @ts-ignore  // NO!
const result = somethingBroken()
```

**Fix the actual error.**

---

**❌ Don't use force-dynamic:**
```typescript
export const dynamic = 'force-dynamic'  // NO!
```

**Use ISR caching instead.**

---

# Part 4: Performance Standards

## 📊 Lighthouse Targets

### Score Requirements

**Desktop (MUST achieve):**
- Performance: 100
- Accessibility: 100
- Best Practices: 100
- SEO: 100

**Mobile (MUST achieve):**
- Performance: 80+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

**Current Baseline (November 2025):**
- ✅ Desktop: 100 across all metrics
- ✅ Mobile: 85-90 Performance, 100 others

---

### Core Web Vitals

**LCP (Largest Contentful Paint):**
- Target: <2.5s
- Goal: <1.2s
- Current: ~1.8s average

**FID (First Input Delay):**
- Target: <100ms
- Goal: <50ms
- Current: <30ms

**CLS (Cumulative Layout Shift):**
- Target: <0.1
- Goal: <0.05
- Current: <0.03

---

## 🖼️ Image Optimization

### Image Component Usage

**Always use Next.js Image:**
```tsx
import Image from 'next/image'

<Image
  src="/images/product.jpg"
  alt="Product description"
  width={800}
  height={600}
  quality={75}
  loading="lazy"
/>
```

**Why:**
- Automatic WebP conversion
- Responsive images
- Lazy loading
- Prevents layout shift

---

### Quality Settings

**By use case:**
```tsx
// Thumbnails (small, many on page)
quality={60}

// Standard images (product photos, content)
quality={75}  // DEFAULT

// Hero images (above fold, critical)
quality={85}

// NEVER use quality above 90 (diminishing returns)
```

---

### Loading Strategy

**Above the fold:**
```tsx
<Image loading="eager" priority />
```

**Below the fold:**
```tsx
<Image loading="lazy" />  // DEFAULT
```

---

## 📦 Bundle Size Optimization

### Current Bundle Size (Target)

**JavaScript bundles:**
- First Load JS: <100KB (gzipped)
- Route bundles: <50KB each
- Shared chunks: <30KB

**Monitoring:**
```bash
npm run build
# Check "First Load JS" in output
```

---

### Code Splitting

**Dynamic imports for heavy components:**
```typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSkeleton />
})
```

**When to use:**
- Charts/graphs libraries
- Rich text editors
- Large third-party components
- Below-fold interactive features

---

### Tree Shaking

**Import only what you need:**
```typescript
// ❌ BAD - Imports entire library
import _ from 'lodash'

// ✅ GOOD - Imports specific function
import debounce from 'lodash/debounce'
```

---

## ⚡ Runtime Performance

### React Performance

**Avoid unnecessary re-renders:**
```typescript
// Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* Complex rendering */}</div>
})

// Use useMemo for expensive computations
const processedData = useMemo(() => {
  return expensiveProcess(data)
}, [data])

// Use useCallback for stable function references
const handleClick = useCallback(() => {
  doSomething()
}, [dependency])
```

---

### Lazy Loading

**Lazy load below-fold content:**
```tsx
<div className="min-h-screen">
  {/* Above fold - loads immediately */}
  <ReviewHero {...heroData} />
  
  {/* Below fold - lazy loaded */}
  <LazyLoadWrapper>
    <PerformanceAnalysis {...data} />
  </LazyLoadWrapper>
</div>
```

---

## 🗄️ Database Performance

### Query Optimization

**Use indexes:**
```sql
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category);
```

**Select only needed columns:**
```typescript
// ❌ BAD - Selects everything
const products = await supabase
  .from('products')
  .select('*')

// ✅ GOOD - Selects specific columns
const products = await supabase
  .from('products')
  .select('id, name, slug, rating, image_url')
```

---

### Caching Strategy

**ISR caching (preferred):**
```typescript
export const revalidate = 3600  // 1 hour
```

**Benefits:**
- Reduced database queries
- Faster page loads
- Lower hosting costs
- Automatic cache invalidation

---

## 📉 Monitoring & Debugging

### Performance Monitoring

**Tools to use:**
- Chrome DevTools Lighthouse
- WebPageTest
- Vercel Analytics (built-in)
- Google Search Console (Core Web Vitals)

**Regular checks:**
- Weekly Lighthouse audits
- Monthly WebPageTest analysis
- Continuous Vercel Analytics monitoring

---

### Debugging Performance Issues

**Common issues:**

1. **High LCP:**
   - Large images above fold
   - Blocking JavaScript
   - Slow server response

2. **High CLS:**
   - Images without dimensions
   - Fonts loading
   - Dynamic content injection

3. **Large bundle:**
   - Importing entire libraries
   - Too many client components
   - Large dependencies

---

# Part 5: Tracking & Analytics

## 📊 Google Tag Manager Setup

### Current Implementation (November 2025)

**GTM Container:** GTM-XXXXXXX (replace with actual ID)

**Tag hierarchy:**
1. **GTM loads** (in ThirdPartyScripts.tsx)
2. **GA4 loads through GTM** (not directly)
3. **Events sent to dataLayer**
4. **GTM triggers send to GA4**

**Why GTM:**
- Single tracking implementation
- Easy to add new tags (no code changes)
- Better event management
- Lower maintenance

---

### GTM Container Structure

**Tags configured:**
1. GA4 Configuration (base tag)
2. Affiliate Click Event (fires on dataLayer push)
3. Page View (automatic)

**Triggers:**
1. All Pages (initialization)
2. Custom Event - affiliate_click

**Variables:**
- Event parameters from dataLayer

---

## 🎯 Event Tracking

### Standard Event: Affiliate Clicks

**Implementation:**
```typescript
import { trackAffiliateClick } from '@/lib/tracking'

// In component
<a
  href={affiliateUrl}
  onClick={() => trackAffiliateClick(
    'Amazon',                    // merchant
    product.name,                // product
    'hero-cta',                 // position
    undefined                    // price (optional)
  )}
>
  Check Price on Amazon →
</a>
```

**What happens:**
1. Click triggers `trackAffiliateClick`
2. Function pushes to `dataLayer`
3. GTM receives event
4. GTM sends to GA4
5. GA4 records event

---

### DataLayer Event Structure

**Affiliate click event:**
```typescript
window.dataLayer.push({
  event: 'affiliate_click',
  merchant: 'Amazon',
  product: 'Vitamix 5200',
  position: 'hero-cta',
  price: undefined
})
```

**Page view event (automatic):**
```typescript
window.dataLayer.push({
  event: 'page_view',
  page_path: '/reviews/vitamix-5200',
  page_title: 'Vitamix 5200 Review'
})
```

---

## 📍 CTA Tracking

### CTAVisibilityTracker Component

**Purpose:** Track when CTAs become visible (viewport tracking)

**Usage:**
```tsx
<CTAVisibilityTracker
  ctaId="hero-cta"
  position="above_fold"
  productSlug={product.slug}
>
  <a href={affiliateUrl}>
    Check Price on Amazon →
  </a>
</CTAVisibilityTracker>
```

**Props:**
```typescript
interface CTAVisibilityTrackerProps {
  ctaId: string           // Unique identifier
  position: string        // NOT "ctaPosition"!
  productSlug?: string    // Optional product slug
  children: React.ReactNode
}
```

**Valid position values:**
- 'above_fold'
- 'mid_article'
- 'final_cta'
- 'comparison_table'
- 'related_products'
- 'sidebar'
- 'category_grid'
- 'where_to_buy'
- 'model_notice'
- Custom strings

**Critical:** Use `position` NOT `ctaPosition` (common AI error!)

---

## 📊 Product View Tracking

### ProductViewTrackerWrapper

**Purpose:** Track product page views

**Usage:**
```tsx
<ProductViewTrackerWrapper slug={product.slug} />
```

**Placed at top of review pages** (before other components).

**What it tracks:**
- Product slug
- View timestamp
- User session (if available)

---

## 🔧 Tracking Implementation Files

### /lib/tracking.ts (CURRENT - USE THIS)

**Purpose:** Modern tracking using GTM dataLayer

**Key functions:**
```typescript
// Affiliate click tracking
export function trackAffiliateClick(
  merchant: string,
  product: string,
  position: string,
  price?: number
): void

// Page view tracking (automatic via GTM)
// No manual function needed
```

**Use this file for ALL new tracking.**

---

### /lib/analytics.ts (DEPRECATED - DON'T USE)

**Status:** Deprecated as of November 2025

**Why deprecated:**
- Used direct gtag calls
- Bypassed GTM
- Harder to maintain
- Being phased out

**Don't use this file.** Use `/lib/tracking.ts` instead.

---

## 📈 Analytics Best Practices

### Event Naming

**Use descriptive, consistent names:**
- `affiliate_click` ✅
- `cta_visible` ✅
- `email_signup` ✅

**NOT:**
- `click` ❌ (too generic)
- `btn_click` ❌ (unclear)
- `action1` ❌ (meaningless)

---

### Event Properties

**Include relevant context:**
```typescript
{
  event: 'affiliate_click',
  merchant: 'Amazon',          // WHERE
  product: 'Vitamix 5200',     // WHAT
  position: 'hero-cta',        // WHERE on page
  price: 449.99                // HOW MUCH (optional)
}
```

**Make events actionable:**
- Can filter by merchant
- Can compare positions
- Can analyze by product

---

## 🔍 Debugging Tracking

### Test Tracking Locally

**1. Check dataLayer:**
```javascript
// In browser console
console.log(window.dataLayer)
```

**2. Use GTM Preview Mode:**
- Open GTM container
- Click "Preview"
- Navigate to your localhost
- See events fire in real-time

**3. Check Network Tab:**
- Look for GTM requests
- Look for GA4 collect requests
- Verify parameters sent

---

### Common Tracking Issues

**Issue: Events not firing**
- Check if GTM script loaded
- Check console for errors
- Verify dataLayer exists
- Check GTM trigger configuration

**Issue: Duplicate events**
- Check for multiple GTM scripts
- Verify trigger doesn't fire multiple times
- Check component re-renders

**Issue: Missing parameters**
- Verify parameter names match GTM variables
- Check TypeScript types
- Verify values aren't undefined

---

# Appendix: Quick Reference

## 🎨 Color Quick Reference

```tsx
// Text links (ALWAYS)
className="text-orange-700"

// Star ratings (ALWAYS)
className="text-amber-700"

// Body text
className="text-slate-900"

// CTA buttons (background)
className="bg-gradient-to-r from-orange-600 to-red-600"

// Page background
className="bg-gray-50"
```

---

## ♿ Accessibility Quick Checks

**Before deploying:**
- [ ] All links use `text-orange-700` (not orange-600)
- [ ] All star ratings use `text-amber-700` (not yellow-400)
- [ ] Heading hierarchy is h1 → h2 → h3 (no skipping)
- [ ] Only ONE h1 per page
- [ ] All images have alt text
- [ ] All interactive elements have visible focus states
- [ ] Touch targets are at least 44×44px

---

## 🏗️ Architecture Quick Reference

**File structure:**
```
/app/reviews/[slug]/
  ├── page.tsx       # Components only
  └── data.ts        # Content only
```

**Imports:**
```typescript
import Image from 'next/image'          // Images
import Link from 'next/link'            // Internal links
import { supabase } from '@/lib/supabase'  // Database
```

**Caching:**
```typescript
export const revalidate = 3600           // ISR
export const fetchCache = 'force-cache'  // Cache strategy
```

---

## 📊 Performance Quick Checks

**Before deploying:**
- [ ] `npm run build` succeeds
- [ ] Lighthouse Desktop: 100 (all metrics)
- [ ] Lighthouse Mobile: 80+ Performance
- [ ] LCP <2.5s
- [ ] All images use Next.js Image component
- [ ] All images have width/height
- [ ] Images use quality={75} or appropriate
- [ ] No console errors
- [ ] No TypeScript errors

---

## 🎯 Tracking Quick Reference

**Affiliate click:**
```typescript
import { trackAffiliateClick } from '@/lib/tracking'

trackAffiliateClick('Amazon', productName, 'hero-cta')
```

**CTA visibility:**
```tsx
<CTAVisibilityTracker
  ctaId="unique-id"
  position="where_it_is"  // NOT ctaPosition!
  productSlug={slug}
>
  <a href={url}>CTA</a>
</CTAVisibilityTracker>
```

---

## 🚨 Critical Don'ts

**NEVER:**
- ❌ Use `text-orange-600` for links (fails accessibility)
- ❌ Use `text-yellow-400` for stars (fails accessibility)
- ❌ Skip heading levels (h1 → h3)
- ❌ Have multiple h1 tags
- ❌ Use `export const dynamic = 'force-dynamic'`
- ❌ Use CSS Modules or inline styles
- ❌ Use `any` type in TypeScript
- ❌ Leave images without alt text
- ❌ Use `ctaPosition` prop (it's `position`!)
- ❌ Import from `/lib/analytics.ts` (deprecated)

---

## ✅ Pre-Deployment Technical Checklist

**Every deployment must pass:**

### Build & Type Safety
- [ ] `npm run build` succeeds with no errors
- [ ] `npm run type-check` passes with no errors
- [ ] No console errors in browser
- [ ] No React warnings in console

### Accessibility
- [ ] Links use `text-orange-700`
- [ ] Stars use `text-amber-700`
- [ ] Heading hierarchy correct
- [ ] Only one h1 per page
- [ ] All images have alt text
- [ ] Focus states visible

### Performance
- [ ] Lighthouse Desktop: 100
- [ ] Lighthouse Mobile: 80+
- [ ] LCP <2.5s
- [ ] Images optimized (quality: 75)
- [ ] ISR caching configured

### Tracking
- [ ] GTM script loads
- [ ] Affiliate clicks tracked
- [ ] No tracking errors in console
- [ ] DataLayer events fire correctly

---

## 📱 Testing Checklist

**Test on:**
- [ ] Desktop Chrome (latest)
- [ ] Desktop Firefox (latest)
- [ ] Desktop Safari (latest)
- [ ] iPhone (Safari)
- [ ] Android (Chrome)

**Test at widths:**
- [ ] 375px (mobile)
- [ ] 768px (tablet)
- [ ] 1024px (laptop)
- [ ] 1280px (desktop)

**Test interactions:**
- [ ] All links work
- [ ] All buttons work
- [ ] Forms submit correctly
- [ ] Keyboard navigation works
- [ ] Focus states visible

---

## 🔗 Related Documentation

**For more details, see:**
- **START_HERE.md** - Protection rules, red flags
- **CONTENT_STANDARDS.md** - All content standards
- **COMPONENT_INTERFACES.md** - TypeScript interfaces
- **VOICE_AND_CREDENTIALS.md** - Credentials and voice

---

**Last Updated:** November 10, 2025  
**References:** START_HERE.md, CONTENT_STANDARDS.md, COMPONENT_INTERFACES.md

---

*This is your complete technical reference. Read START_HERE.md first for protection rules, then use this guide for all technical standards.*
