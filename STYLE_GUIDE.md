# Chef Approved Tools - Style Guide

**Last Updated:** November 7, 2025
**Purpose:** Visual design reference for UI/design work
**For:** Design decisions, visual consistency, component styling

---

## 🎯 Quick Reference

**Primary CTA:** Orange-600 (`#ea580c`) to Red-600 (`#dc2626`) gradient
**Text Links:** Orange-700 (`#c2410c`) - accessibility compliant
**Body Text:** Slate-900 (`#0f172a`) on Gray-50 (`#f9fafb`)
**Header:** Slate-800 (`#1e293b`) with Orange-800 buttons
**Font:** Inter (Regular 400, Semibold 600, Bold 700)
**Container:** Max 1280px, responsive padding
**Cards:** White with shadow-lg → shadow-xl on hover
**Images:** Quality 75%, WebP preferred, properly sized
**Star Ratings:** Amber-700 (accessibility)
**CTA Text:** "Check Price on Amazon"

---

## 🎨 Color Palette

### Primary Brand Colors (Orange)

| Color | Hex Code | Tailwind Class | Usage |
|-------|----------|----------------|-------|
| **Orange 600** | `#ea580c` | `bg-orange-600` | **Primary CTA buttons** |
| **Orange 700** | `#c2410c` | `text-orange-700` | **Text links** (accessibility) |
| **Orange 800** | `#9a3412` | `bg-orange-800` | Header/navigation |
| **Orange 500** | `#f97316` | `bg-orange-500` | Brand accents, badges |
| **Orange 400** | `#fb923c` | `text-orange-400` | Light text on dark backgrounds |
| **Orange 200** | `#fed7aa` | `text-orange-200` | Very light text/accents |
| **Orange 100** | `#ffedd5` | `bg-orange-100` | Light backgrounds, badges |
| **Orange 50** | `#fff7ed` | `bg-orange-50` | Hover backgrounds, very light |

### Accent Colors

| Color | Hex Code | Tailwind Class | Usage |
|-------|----------|----------------|-------|
| **Red 600** | `#dc2626` | `to-red-600` | CTA gradient endpoint |
| **Red 700** | `#b91c1c` | `to-red-700` | Hover state for gradient |
| **Amber 700** | `#b45309` | `text-amber-700` | **Star ratings** (accessibility) |
| **Amber 500** | `#f59e0b` | `to-amber-500` | Warm accent gradients |

### Neutral Colors (Slate/Gray)

| Color | Hex Code | Tailwind Class | Usage |
|-------|----------|----------------|-------|
| **Slate 900** | `#0f172a` | `text-slate-900` | **Primary body text** |
| **Slate 800** | `#1e293b` | `bg-slate-800` | Header, dark backgrounds |
| **Slate 700** | `#334155` | `bg-slate-700` | Medium dark elements |
| **Slate 600** | `#475569` | `text-slate-600` | Secondary text, dates, metadata |
| **Slate 400** | `#94a3b8` | `text-slate-400` | Muted text, metadata |
| **Slate 300** | `#cbd5e1` | `text-slate-300` | Light text on dark bg |
| **Gray 50** | `#f9fafb` | `bg-gray-50` | **Page background** |
| **Gray 100** | `#f3f4f6` | `bg-gray-100` | Subtle section backgrounds |
| **Gray 200** | `#e5e7eb` | `border-gray-200` | Light borders |
| **White** | `#ffffff` | `bg-white` | Cards, content backgrounds |

### Link Colors

| Context | Color | Tailwind Class |
|---------|-------|----------------|
| **Body text links** | Orange-700 (`#c2410c`) | `text-orange-700` |
| **Hover state** | Orange-800 (`#9a3412`) | `hover:text-orange-800` |

**Note:** Orange-700 meets WCAG AA accessibility standards (4.6:1 contrast ratio). Do NOT use orange-600 for text links.

---

## ♿ ACCESSIBILITY REQUIREMENTS - MANDATORY

### The 4 Critical Accessibility Rules

**1. Text Link Colors (WCAG AA Compliance)**
```html
<!-- ✅ CORRECT -->
<a href="#" class="text-orange-700 hover:text-orange-800">Link Text</a>

<!-- ❌ WRONG - fails contrast -->
<a href="#" class="text-orange-600">Link Text</a>
```
- **Required:** `text-orange-700` for all body text links
- **Contrast Ratio:** 4.6:1 (meets WCAG AA)
- **Never use:** orange-600, orange-500, or lighter for text links

---

**2. Text on Orange Backgrounds**
```html
<!-- ✅ CORRECT -->
<div class="bg-orange-600 text-slate-900">
  High contrast text
</div>

<!-- ❌ WRONG - fails contrast -->
<div class="bg-orange-600 text-slate-700">
  Low contrast text
</div>
```
- **Required:** `text-slate-900` on orange backgrounds
- **Never use:** slate-700, slate-600, or lighter on orange

---

**3. Heading Hierarchy (Sequential Order)**
```html
<!-- ✅ CORRECT -->
<h1>Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
<h4>Detail Title</h4>

<!-- ❌ WRONG - skips h2 -->
<h1>Page Title</h1>
<h3>Section Title</h3>
```
- **Required:** Sequential heading order (h1 → h2 → h3 → h4)
- **One h1 per page only**
- **Never skip levels** (e.g., h1 → h3 without h2)
- Use CSS for styling, not heading tags

---

**4. Star Ratings Color**
```html
<!-- ✅ CORRECT -->
<span class="text-amber-700">★★★★★</span>

<!-- ❌ WRONG - fails contrast -->
<span class="text-yellow-400">★★★★★</span>
```
- **Required:** `text-amber-700` for star ratings
- **Never use:** yellow-400, yellow-300, or other yellow shades

---

### Focus States (Required on All Interactive Elements)
```html
<!-- ✅ Button focus ring -->
<button class="focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
  Accessible Button
</button>

<!-- ✅ Link focus ring -->
<a href="#" class="focus:outline-none focus:ring-2 focus:ring-orange-500">
  Accessible Link
</a>
```
- **Required:** Visible focus states on all interactive elements
- **Pattern:** `focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`
- **Never remove focus outlines** without replacing with alternative

---

### Minimum Accessibility Requirements
- ✅ Text contrast ratio: 4.5:1 minimum (WCAG AA)
- ✅ Touch targets: 44px minimum for mobile
- ✅ Focus indicators: Visible on all interactive elements
- ✅ Alt text: Required on all images
- ✅ Sequential heading hierarchy
- ✅ Proper color contrast on all text

---

## 📅 DATE FORMATTING STANDARDS

### Date Display Format

**For Review Pages:**
```html
<!-- Above title, below breadcrumbs -->
<div class="text-sm text-slate-600 mb-2">
  <time dateTime="2024-10-15">Published: October 15, 2024</time>
  {' • '}
  <time dateTime="2025-01-20">Updated: January 20, 2025</time>
</div>
```

**For Blog Posts:**
```html
<!-- Below title, above author info -->
<div class="text-sm text-slate-600 mb-4">
  <time dateTime="2024-11-05">November 5, 2024</time>
  {' • '}
  <span>Updated: <time dateTime="2025-01-10">January 10, 2025</time></span>
</div>
```

**Date Styling:**
- Color: `text-slate-600`
- Size: `text-sm` (14px)
- Separator: `{' • '}` (bullet point with spaces)
- Use `<time>` tag with `dateTime` attribute in ISO format

---

## 🖼️ IMAGE OPTIMIZATION STANDARDS

### Required Specifications
```tsx
<Image
  src="/images/product.jpg"
  alt="Descriptive alt text describing what's in the image"
  width={662}
  height={606}
  quality={75}  // REQUIRED: Always use 75
  priority      // Only for above-the-fold images
  placeholder="blur"
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

### Image Requirements
- ✅ **Format:** WebP preferred, JPEG fallback
- ✅ **Quality:** 75% for all images (NOT 80% or higher)
- ✅ **Sizing:** Properly sized for display (use 2x for retina displays)
- ✅ **Alt text:** Descriptive and required on ALL images
- ✅ **Lazy loading:** Automatic with Next.js Image component
- ✅ **Priority:** Use `priority` prop only for above-the-fold hero images

### Image Sizing Examples
```
Display size: 331px → Source size: 662px (2x for retina)
Display size: 600px → Source size: 1200px (2x for retina)
Display size: 400px → Source size: 800px (2x for retina)
```

### Common Image Mistakes
```tsx
// ❌ WRONG - quality too high
<Image quality={80} />

// ❌ WRONG - image too large
<Image src="4000x3000.jpg" width={400} height={300} />

// ❌ WRONG - missing alt text
<Image src="product.jpg" />

// ✅ CORRECT
<Image
  src="product.jpg"
  alt="Le Creuset cast iron skillet on stovetop"
  width={800}
  height={600}
  quality={75}
/>
```

---

## 🔘 Typography

### Font Family
**Inter** (Google Fonts, self-hosted for performance)
- Regular (400) - Body text
- Semibold (600) - Subheadings, emphasis
- Bold (700) - Headings

### Heading Scale

| Element | Size | Weight | Tailwind | Notes |
|---------|------|--------|----------|-------|
| H1 | 40px (2.5rem) | Bold (700) | `text-4xl font-bold` | One per page only |
| H2 | 32px (2rem) | Bold (700) | `text-3xl font-bold` | Main sections |
| H3 | 24px (1.5rem) | Semibold (600) | `text-2xl font-semibold` | Subsections |
| H4 | 20px (1.25rem) | Semibold (600) | `text-xl font-semibold` | Details |
| H5 | 16px (1rem) | Semibold (600) | `text-base font-semibold` | Minor headings |

**Critical:** Follow sequential heading hierarchy (h1 → h2 → h3 → h4). Never skip levels.

### Body Text Scale

| Class | Size | Usage |
|-------|------|-------|
| `text-xs` | 12px (0.75rem) | Metadata, captions, labels |
| `text-sm` | 14px (0.875rem) | Dates, secondary info, small text |
| `text-base` | **16px (1rem)** | **Default body text** |
| `text-lg` | 18px (1.125rem) | Lead paragraphs, emphasis |
| `text-xl` | 20px (1.25rem) | Large subheadings |

### Line Heights
- **Body text:** `leading-normal` (1.5)
- **Headings:** `leading-tight` (1.25)
- **Relaxed:** `leading-relaxed` (1.625)

---

## 📘 Buttons & CTAs

### Primary CTA Button
```html
<button class="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
  Check Price on Amazon
</button>
```

**Standard CTA Text:** "Check Price on Amazon" (always use this unless explicitly approved otherwise)

**Colors:** Orange-600 → Red-600 gradient
**Hover:** Orange-700 → Red-700 gradient
**Effect:** Scale up 5% on hover, scale down 5% on active
**Focus:** Ring with orange-500 color

### Secondary Button (Outline)
```html
<button class="border-2 border-orange-600 text-orange-800 hover:bg-orange-600 hover:text-white font-semibold py-3 px-6 rounded-xl transition-all focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
  Secondary Action
</button>
```

### Button Sizes

| Size | Padding | Font Size | Border Radius |
|------|---------|-----------|---------------|
| Small | `px-4 py-2` | `text-sm` | `rounded-lg` |
| Medium | `px-6 py-3` | `text-base` | `rounded-xl` |
| Large | `px-8 py-4` | `text-lg` | `rounded-xl` |

---

## 📦 Cards & Containers

### Standard Card
```html
<div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6">
  <!-- Card content -->
</div>
```

**Properties:**
- Background: White
- Border radius: `rounded-xl` (12px)
- Shadow: `shadow-lg` (default)
- Hover shadow: `shadow-xl`
- Padding: `p-6` (24px)

### Container
```html
<div class="container max-w-7xl mx-auto px-4">
  <!-- Content -->
</div>
```

**Max Width:** 1280px (`max-w-7xl`)
**Padding:** Responsive (1rem mobile, 1.5rem tablet, 2rem desktop)

---

## 🧩 COMPONENT STANDARDS

### AuthorBio Component
```tsx
import { AuthorBio } from '@/components/AuthorBio'

// Use with defaults (no props needed)
<AuthorBio />
```
- **Location:** End of all review pages, blog posts, and guides
- **Content:** Uses default text from component (never override without approval)
- **Styling:** Consistent across all pages

### EmailCaptureSection Component
```tsx
import { EmailCaptureSection } from '@/components/EmailCaptureSection'

// Use with defaults (no props needed)
<EmailCaptureSection />
```
- **Location:** After main content, before author bio
- **Content:** Uses default text from component
- **Styling:** Consistent across all pages

### ComparisonTable Component
```tsx
import { ComparisonTable } from '@/components/ComparisonTable'

<ComparisonTable
  products={[
    {
      name: "Product Name",
      isReviewed: true, // Highlight the reviewed product
      specs: {
        "Material": "Stainless Steel",
        "Size": "12 inches",
        // ... all specs
      },
      affiliateUrl: getPrimaryAffiliateLink(product),
      priceTier: "Mid-Range"
    },
    // ... 3 more products (Premium, Mid-Range, Budget)
  ]}
/>
```
- **Location:** After "Performance Analysis" section on review pages
- **Required:** All review pages must have comparison table
- **Products:** Always 4 products (reviewed + premium + mid-range + budget)

---

## 🧭 BREADCRUMBS STANDARDS

### Breadcrumb Structure
```html
<div class="bg-white border-b border-gray-200 -mx-5 px-5 py-3 text-sm text-gray-600 mb-4">
  <Link href="/" class="hover:text-orange-700">Home</Link>
  {' / '}
  <Link href="/reviews" class="hover:text-orange-700">Reviews</Link>
  {' / '}
  <span>Product Name</span>
</div>
```

**Requirements:**
- ✅ Present on ALL content pages
- ✅ Must include schema markup (BreadcrumbList)
- ✅ Must be above page title
- ✅ Links use `hover:text-orange-700`
- ✅ Current page is plain text (not a link)

**Standard Formats:**
```
Home / Reviews / [Product Name]
Home / Blog / [Post Title]
Home / Guides / [Guide Title]
Home / [Category] / [Subcategory] / [Item]
```

---

## 📏 Spacing Scale

### Common Spacing Values

| Class | Value | Usage |
|-------|-------|-------|
| `gap-4` | 16px | Default card spacing |
| `gap-6` | 24px | Section spacing |
| `gap-8` | 32px | Large section spacing |
| `mb-2` | 8px | Date stamp spacing |
| `mb-4` | 16px | Paragraph spacing |
| `mb-6` | 24px | Heading spacing |
| `mb-8` | 32px | Section spacing |
| `py-12` | 48px | Section padding (vertical) |
| `px-4` | 16px | Container padding |
| `px-6` | 24px | Button/card padding |

---

## 🎯 Border Radius

| Size | Value | Class | Usage |
|------|-------|-------|-------|
| Medium | 8px | `rounded-lg` | Buttons, inputs |
| Large | 12px | `rounded-xl` | Cards, CTAs |
| Extra Large | 16px | `rounded-2xl` | Large sections |
| Full | 9999px | `rounded-full` | Pills, circular badges |

---

## ✨ Shadows

| Level | Class | Usage |
|-------|-------|-------|
| Medium | `shadow-md` | Subtle lift |
| Large | `shadow-lg` | **Default cards** |
| Extra Large | `shadow-xl` | **Card hover state** |

**Standard Pattern:** `shadow-lg hover:shadow-xl transition-shadow`

---

## 📱 Responsive Breakpoints

```
sm:  640px   // Tablet
md:  768px   // Small laptop
lg:  1024px  // Desktop
xl:  1280px  // Large desktop
2xl: 1536px  // Extra large
```

### Mobile-First Approach
Always design for mobile first, then enhance for larger screens:

```html
<div class="text-sm md:text-base lg:text-lg">
  <!-- Text scales up on larger screens -->
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Responsive grid -->
</div>
```

---

## 🎨 Common Patterns

### Hero Section
```html
<section class="bg-gradient-to-br from-slate-800 via-slate-700 to-orange-700 text-white px-4 py-12 text-center">
  <h1 class="text-3xl md:text-4xl font-bold leading-tight mb-4">
    Hero Title
  </h1>
  <p class="text-lg text-slate-300 max-w-3xl mx-auto mb-6">
    Hero description
  </p>
  <div class="flex flex-col md:flex-row gap-4 items-center justify-center">
    <a href="#" class="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-6 py-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
      Check Price on Amazon
    </a>
  </div>
</section>
```

### Product Card
```html
<div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6">
  <img src="..." alt="Descriptive alt text" class="rounded-lg mb-4" />
  <h3 class="text-xl font-semibold mb-2">Product Name</h3>
  <p class="text-slate-600 mb-4">Description</p>
  <a href="#" class="bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold px-6 py-3 rounded-xl block text-center hover:from-orange-700 hover:to-red-700 focus:ring-2 focus:ring-orange-500">
    View Review
  </a>
</div>
```

### Badge/Tag
```html
<span class="inline-flex items-center gap-1 bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-semibold">
  Badge Text
</span>
```

### Star Rating
```html
<!-- ✅ CORRECT - uses amber-700 -->
<div class="flex items-center gap-1">
  <span class="text-amber-700 text-xl">★★★★★</span>
  <span class="text-slate-600 text-sm">(5.0)</span>
</div>

<!-- ❌ WRONG - uses yellow-400 -->
<span class="text-yellow-400">★★★★★</span>
```

---

## ⚡ Transitions & Animations

### Standard Transitions
```css
transition-colors    /* Color changes only */
transition-all       /* All properties */
transition-shadow    /* Shadow changes only */
transition-transform /* Scale/transform changes */
```

### Durations
- `duration-150` - 150ms (Fast)
- `duration-200` - 200ms (Standard)
- `duration-300` - 300ms (Slow)

### Common Hover Effects
```html
<!-- Scale on hover -->
<button class="hover:scale-105 active:scale-95 transition-transform">
  Button
</button>

<!-- Shadow lift -->
<div class="shadow-lg hover:shadow-xl transition-shadow">
  Card
</div>

<!-- Color change -->
<a class="text-orange-700 hover:text-orange-800 transition-colors">
  Link
</a>
```

---

## 🎯 PERFORMANCE STANDARDS

### Lighthouse Targets (Non-Negotiable)
```
✅ Desktop: 100 across all metrics
✅ Mobile: 80 Performance, 100 other metrics
✅ LCP: <1.2s (target), <2.5s (maximum)
✅ TBT: <50ms
✅ FCP: <1.0s
✅ CLS: <0.1
```

### Performance Checklist
- [ ] All images use quality={75}
- [ ] All images properly sized (not oversized)
- [ ] All images have alt text
- [ ] Hero images use priority prop
- [ ] Below-fold images lazy load (automatic with Next.js Image)
- [ ] No inline styles (use Tailwind)
- [ ] Minimal custom CSS in globals.css
- [ ] Focus states on all interactive elements
- [ ] Test on mobile (375px, 768px)
- [ ] Test on desktop (1024px, 1280px)

---

## 📋 Design Checklist

**Before publishing any design:**
- [ ] Uses approved color palette (orange-600, slate-800, etc.)
- [ ] Text links use orange-700 (NOT orange-600)
- [ ] Text on orange backgrounds uses slate-900 (NOT slate-700)
- [ ] Star ratings use amber-700 (NOT yellow-400)
- [ ] Heading hierarchy is sequential (h1 → h2 → h3)
- [ ] Primary CTAs use gradient (orange-600 to red-600)
- [ ] CTAs say "Check Price on Amazon"
- [ ] Cards use shadow-lg with hover:shadow-xl
- [ ] All images use quality={75}
- [ ] All images have descriptive alt text
- [ ] Dates displayed with proper formatting
- [ ] Breadcrumbs present on content pages
- [ ] AuthorBio component included
- [ ] ComparisonTable included (if review page)
- [ ] Mobile responsive (test on 375px, 768px, 1024px)
- [ ] Touch targets at least 44px on mobile
- [ ] Text contrast meets WCAG AA (4.5:1)
- [ ] Focus states visible on interactive elements
- [ ] Uses Inter font (400, 600, 700 weights)
- [ ] Container max-width is 1280px
- [ ] Lighthouse targets met (Desktop 100, Mobile 80/100)

---

## 🚫 Do NOT:

### Accessibility Violations
- ❌ Use orange-600 for text links (fails accessibility)
- ❌ Use slate-700 or lighter on orange backgrounds (fails contrast)
- ❌ Use yellow-400 for star ratings (fails accessibility)
- ❌ Skip heading levels (h1 → h3 without h2)
- ❌ Remove focus states without replacing them

### Performance Issues
- ❌ Use quality above 75 for images
- ❌ Use oversized images (source 2000px for display 400px)
- ❌ Forget alt text on images
- ❌ Use inline styles instead of Tailwind

### Design Mistakes
- ❌ Use orange-500 for primary CTAs (use orange-600)
- ❌ Exceed 1280px container width
- ❌ Use custom fonts beyond Inter
- ❌ Forget hover/focus states on interactive elements
- ❌ Skip mobile testing
- ❌ Use wrong CTA text (must be "Check Price on Amazon")
- ❌ Omit dates on content pages
- ❌ Omit breadcrumbs on content pages
- ❌ Skip AuthorBio component
- ❌ Skip ComparisonTable on review pages

---

## 📚 Reference Files

**Code References:**
- Benriner review page: `/app/reviews/benriner-large-mandoline/page.tsx` (gold standard)
- Global styles: `/app/globals.css`
- Product helpers: `/lib/product-helpers.ts`
- Schema helpers: `/lib/schema.ts`
- Review components: `/components/review/`

**Documentation:**
- clauderc.md - Protection rules, technical standards
- CONTENT_GUIDELINES.md - Content creation standards
- SEO_AND_ACCESSIBILITY_REQUIREMENTS.md - SEO/accessibility checklist

---

**Last Updated:** November 7, 2025
**Current Site Stats:** 125 pages indexed, Desktop Lighthouse 100, Mobile 80/100
