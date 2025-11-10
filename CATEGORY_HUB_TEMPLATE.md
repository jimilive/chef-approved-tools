# Category Hub Page Template

**Last Updated:** November 7, 2025  
**Purpose:** Template for category landing/hub pages  
**Examples:** /knives, /cookware, /appliances, /tools

---

## 🎯 What is a Category Hub Page?

Category hub pages are **landing pages that organize all content within a specific category**. They serve as the central navigation point for users interested in that category and help establish topical authority for search engines.

### Purpose
- **SEO:** Rank for broad category keywords ("chef knives", "cookware")
- **Navigation:** Help users find specific products/content within category
- **Authority:** Establish expertise in the category
- **Conversion:** Guide users to product reviews and affiliate links

---

## 📋 Hub Page Structure (10 Components)

### 1. Schema Markup

```typescript
// CollectionPage schema (hub pages are collections)
const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Professional Chef Knives & Cutlery',
  description: 'Expert reviews and guides for chef knives, tested by a professional with 24 years experience.',
  url: 'https://www.chefapprovedtools.com/knives',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    // ... breadcrumb items
  }
}

// Breadcrumb schema
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://www.chefapprovedtools.com' },
  { name: 'Knives', url: 'https://www.chefapprovedtools.com/knives' }
])
```

---

### 2. Metadata Requirements

```typescript
export async function generateMetadata() {
  return {
    title: 'Professional Chef Knives: Reviews & Buying Guide (2025)', // <60 chars
    description: 'Expert knife reviews from a chef with 24 years professional experience. Find the best chef knives, paring knives, and specialty blades for your kitchen.', // 150-160 chars
    openGraph: {
      type: 'website',
      siteName: 'Chef Approved Tools',
    },
    // ... other metadata
  }
}
```

**Title Format Options:**
- "Professional [Category]: Reviews & Buying Guide (2025)"
- "[Category] Reviews: Expert Chef Recommendations"
- "Best [Category] for Your Kitchen | Professional Tested"

**Meta Description Requirements:**
- 150-160 characters
- Include "24 years experience" or similar credential
- Include primary keywords
- <80% similar to other meta descriptions

---

### 3. Breadcrumbs

```html
<div className="bg-white border-b border-gray-200 -mx-5 px-5 py-3 text-sm text-gray-600 mb-4">
  <Link href="/" className="hover:text-orange-700">Home</Link>
  {' / '}
  <span>Knives</span>
</div>
```

---

### 4. Hero Section

```html
<section className="bg-gradient-to-br from-slate-800 via-slate-700 to-orange-700 text-white px-6 py-16 rounded-xl mb-8">
  <div className="max-w-4xl mx-auto text-center">
    <h1 className="text-4xl md:text-5xl font-bold mb-4">
      Professional Chef Knives
    </h1>
    
    <p className="text-xl text-slate-200 mb-6 leading-relaxed">
      Expert knife reviews and buying advice from a chef with 24 years of 
      professional kitchen experience. Every knife tested in real restaurant 
      environments.
    </p>
    
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="#reviews" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-3 rounded-xl transition-all hover:scale-105">
        Browse Reviews
      </a>
      <a href="#buying-guide" className="border-2 border-white text-white hover:bg-white hover:text-slate-800 font-semibold px-8 py-3 rounded-xl transition-all">
        Buying Guide
      </a>
    </div>
  </div>
</section>
```

**Hero Requirements:**
- H1 with category name
- 2-3 sentence description with credentials
- Clear CTAs (Browse Reviews, Buying Guide)
- Visual impact with gradient background

---

### 5. Category Overview Section

```html
<section className="bg-white rounded-xl shadow-lg p-8 mb-8">
  <h2 className="text-3xl font-bold text-slate-900 mb-6">
    Why Knife Choice Matters in Professional Kitchens
  </h2>
  
  <div className="prose prose-lg max-w-none">
    <p className="text-slate-700 leading-relaxed mb-4">
      After 24 years working in professional kitchens, I've learned that the 
      right knife isn't just about sharpness—it's about balance, comfort during 
      12-hour shifts, and how it holds up to daily professional use.
    </p>
    
    <p className="text-slate-700 leading-relaxed mb-4">
      At Purple Café, we tested dozens of knives over 5 years. Some held up 
      beautifully. Others developed issues within months. This section shares 
      what I learned from thousands of hours of professional knife work.
    </p>
  </div>
  
  <div className="grid md:grid-cols-3 gap-6 mt-8">
    <div className="bg-orange-50 p-6 rounded-lg">
      <h3 className="text-xl font-semibold text-slate-900 mb-2">
        Professional Testing
      </h3>
      <p className="text-slate-700">
        Every knife tested in real restaurant environments under actual 
        professional conditions.
      </p>
    </div>
    
    <div className="bg-orange-50 p-6 rounded-lg">
      <h3 className="text-xl font-semibold text-slate-900 mb-2">
        Honest Reviews
      </h3>
      <p className="text-slate-700">
        No perfect scores. Every knife has trade-offs—I'll tell you what they are.
      </p>
    </div>
    
    <div className="bg-orange-50 p-6 rounded-lg">
      <h3 className="text-xl font-semibold text-slate-900 mb-2">
        Tier System
      </h3>
      <p className="text-slate-700">
        Clear indication of professional vs personal testing so you know the 
        source of each recommendation.
      </p>
    </div>
  </div>
</section>
```

**Content Requirements:**
- 2-3 paragraphs establishing expertise in category
- Specific examples from professional experience
- 3 key differentiators (trust signals)

---

### 6. Featured/Top Products Section

```html
<section id="reviews" className="mb-8">
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-3xl font-bold text-slate-900">
      Top Rated Chef Knives
    </h2>
    <a href="#all-reviews" className="text-orange-700 hover:text-orange-800 font-semibold">
      View All →
    </a>
  </div>
  
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Product cards - fetch from Supabase */}
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
      <div className="aspect-square relative">
        <img src="..." alt="..." className="object-cover w-full h-full" />
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-amber-700 text-lg">★★★★★</span>
          <span className="text-slate-600 text-sm">(5.0)</span>
        </div>
        
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          Wüsthof Classic 8" Chef's Knife
        </h3>
        
        <p className="text-slate-600 mb-4">
          Best all-around chef's knife. 5+ years of daily professional use.
        </p>
        
        <div className="flex flex-col gap-2">
          <a href="/reviews/wusthof-classic-chefs-knife" className="bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold px-6 py-3 rounded-xl text-center hover:from-orange-700 hover:to-red-700 transition-all">
            Read Review
          </a>
        </div>
      </div>
    </div>
    
    {/* 5-9 more product cards */}
  </div>
</section>
```

**Requirements:**
- Display 6-9 top products from category
- Fetch from Supabase (dynamic)
- Star rating visible
- Brief description (testing period)
- "Read Review" CTA (NOT "Buy Now")

---

### 7. Subcategories Section (If Applicable)

```html
<section className="bg-white rounded-xl shadow-lg p-8 mb-8">
  <h2 className="text-3xl font-bold text-slate-900 mb-6">
    Knife Types & Uses
  </h2>
  
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    <a href="/knives/chefs-knives" className="border-2 border-gray-200 rounded-xl p-6 hover:border-orange-600 hover:shadow-lg transition-all">
      <h3 className="text-xl font-semibold text-slate-900 mb-2">
        Chef's Knives
      </h3>
      <p className="text-slate-600 mb-3">
        Your primary workhorse. 8-10 inch blades for most kitchen tasks.
      </p>
      <span className="text-orange-700 font-semibold">
        View 12 Reviews →
      </span>
    </a>
    
    <a href="/knives/paring-knives" className="border-2 border-gray-200 rounded-xl p-6 hover:border-orange-600 hover:shadow-lg transition-all">
      <h3 className="text-xl font-semibold text-slate-900 mb-2">
        Paring Knives
      </h3>
      <p className="text-slate-600 mb-3">
        Precision work. 3-4 inch blades for detailed tasks.
      </p>
      <span className="text-orange-700 font-semibold">
        View 8 Reviews →
      </span>
    </a>
    
    {/* More subcategories */}
  </div>
</section>
```

**Use subcategories when:**
- Category has 15+ products
- Clear subcategory groupings exist
- Users benefit from organization

---

### 8. Buying Guide Section

```html
<section id="buying-guide" className="bg-white rounded-xl shadow-lg p-8 mb-8">
  <h2 className="text-3xl font-bold text-slate-900 mb-6">
    How to Choose the Right Knife
  </h2>
  
  <div className="space-y-6">
    <div>
      <h3 className="text-2xl font-semibold text-slate-900 mb-3">
        1. Consider Your Primary Use
      </h3>
      <p className="text-slate-700 leading-relaxed mb-4">
        In professional kitchens, I use different knives based on the task. 
        A chef's knife handles 80% of work, but you'll want specialized knives 
        for specific tasks...
      </p>
      
      <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded-r-lg">
        <p className="text-slate-700">
          <strong>Pro Tip:</strong> Start with one excellent 8" chef's knife 
          before buying a set. You'll use it for 80% of tasks.
        </p>
      </div>
    </div>
    
    <div>
      <h3 className="text-2xl font-semibold text-slate-900 mb-3">
        2. Blade Material Matters
      </h3>
      <p className="text-slate-700 leading-relaxed">
        German steel vs Japanese steel vs high-carbon stainless... each has 
        trade-offs based on my experience...
      </p>
    </div>
    
    {/* 3-5 more buying considerations */}
  </div>
  
  <div className="mt-8 bg-gray-50 p-6 rounded-xl">
    <h3 className="text-xl font-semibold text-slate-900 mb-4">
      Quick Buying Checklist
    </h3>
    <ul className="space-y-2 text-slate-700">
      <li className="flex items-start gap-2">
        <span className="text-orange-600 mt-1">✓</span>
        <span>Budget: $50-$100 for first chef's knife</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-orange-600 mt-1">✓</span>
        <span>Length: 8" for most home cooks, 10" if you have space</span>
      </li>
      {/* More checklist items */}
    </ul>
  </div>
</section>
```

**Buying Guide Requirements:**
- 3-5 key considerations
- Professional insights for each
- "Pro Tip" callout boxes
- Quick reference checklist
- Link to comprehensive buying guide if it exists

---

### 9. Blog Posts / Guides Section

```html
<section className="bg-white rounded-xl shadow-lg p-8 mb-8">
  <h2 className="text-3xl font-bold text-slate-900 mb-6">
    Knife Guides & Tips
  </h2>
  
  <div className="grid md:grid-cols-2 gap-6">
    <a href="/guides/knife-sharpening" className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <span className="inline-block bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
        GUIDE
      </span>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">
        Complete Guide to Knife Sharpening
      </h3>
      <p className="text-slate-600 mb-3">
        Professional techniques for keeping your knives sharp. 15 min read.
      </p>
      <span className="text-orange-700 font-semibold">
        Read Guide →
      </span>
    </a>
    
    <a href="/blog/knife-storage" className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
        BLOG POST
      </span>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">
        Best Way to Store Kitchen Knives
      </h3>
      <p className="text-slate-600 mb-3">
        Magnetic strips vs knife blocks vs drawer inserts. 8 min read.
      </p>
      <span className="text-orange-700 font-semibold">
        Read Post →
      </span>
    </a>
    
    {/* 4-8 more guides/posts */}
  </div>
</section>
```

**Requirements:**
- Link to 6-10 related guides/blog posts
- Mix of guides and blog posts
- Clear labels (GUIDE vs BLOG POST)
- Estimated read time

---

### 10. FAQ Section

```html
<section className="bg-white rounded-xl shadow-lg p-8 mb-8">
  <h2 className="text-3xl font-bold text-slate-900 mb-6">
    Common Knife Questions
  </h2>
  
  <div className="space-y-6">
    <div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">
        What's the best knife for a beginner?
      </h3>
      <p className="text-slate-700">
        After 24 years in professional kitchens, I recommend starting with a 
        single 8" chef's knife rather than a set. The Wüsthof Classic or 
        Victorinox Fibrox are both excellent choices that won't break the bank...
      </p>
    </div>
    
    {/* 5-8 more questions */}
  </div>
</section>
```

**FAQ Requirements:**
- 6-10 questions
- Answer each thoroughly (100-150 words)
- Include professional experience
- Add FAQ schema markup

---

### 11. Email Capture Section

```tsx
<EmailCaptureSection 
  title="Get My Free Kitchen Tools Guide"
  description="Download the exact 11 tools I use most after 24 years in professional kitchens."
/>
```

**Placement:** After FAQ, before author bio

---

### 12. Author Bio

```tsx
<AuthorBio />
```

**Placement:** End of page

---

## 📊 Complete File Structure

```
/app/[category]/
├── page.tsx                    // Hub page component
└── [category]-data.ts          // Hub content data (optional)
```

---

## 💻 Implementation Pattern

### Dynamic Data from Supabase

```typescript
// app/knives/page.tsx
import { getProductsByCategory } from '@/lib/product-helpers'

export default async function KnivesHub() {
  // Fetch all knife products from Supabase
  const products = await getProductsByCategory('knives')
  
  // Filter for top-rated (optional)
  const topProducts = products
    .filter(p => p.expertRating >= 4.5)
    .slice(0, 9)
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero section */}
      
      {/* Featured products - mapped from Supabase */}
      <section className="grid md:grid-cols-3 gap-6">
        {topProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
      
      {/* Other sections */}
    </div>
  )
}

// ISR configuration
export const revalidate = 3600 // 1 hour
```

---

## 🎨 Styling Standards

### Layout
- Max width: 1280px for content
- Background: `bg-gray-50`
- Sections: White cards with `rounded-xl shadow-lg`
- Spacing: `mb-8` between sections

### Typography
- H1: `text-4xl md:text-5xl font-bold`
- H2: `text-3xl font-bold`
- H3: `text-2xl font-semibold`
- Body: `text-base text-slate-700 leading-relaxed`
- Links: `text-orange-700 hover:text-orange-800`

### Hero Gradient
- Background: `bg-gradient-to-br from-slate-800 via-slate-700 to-orange-700`
- Text: White with `text-slate-200` for secondary text

---

## 📋 Content Guidelines for Hubs

### Purpose Clarity
Each section should have a clear purpose:
- Hero: What is this category?
- Overview: Why does it matter?
- Featured: What are the best options?
- Subcategories: How is it organized?
- Buying Guide: How do I choose?
- Resources: What else should I know?

### Voice
- Professional but approachable
- Establish category expertise quickly
- Specific examples from 24 years experience
- Honest about what matters vs what doesn't

### Internal Linking
- Link to 10-20 product reviews
- Link to 5-10 guides/blog posts
- Use descriptive anchor text
- Natural links within content

---

## 🔍 SEO Requirements for Hubs

### On-Page SEO
- [ ] Target keyword in H1 (category name)
- [ ] Target keyword in first paragraph
- [ ] Secondary keywords in H2 headings
- [ ] 15-30 internal links to reviews/guides
- [ ] Alt text on all images
- [ ] FAQ schema markup
- [ ] CollectionPage schema markup
- [ ] Breadcrumb schema markup

### Keywords to Target
- Broad category keywords
- "[Category name]" (e.g., "chef knives")
- "Best [category]" (e.g., "best cookware")
- "[Category] reviews"
- "[Category] buying guide"

### Meta Requirements
- [ ] Title <60 characters
- [ ] Meta description 150-160 characters
- [ ] Title <80% similar to other pages
- [ ] Description <80% similar to other pages
- [ ] No unescaped apostrophes or quotes

---

## ✅ Pre-Publish Checklist

**Content:**
- [ ] Category purpose clear in hero
- [ ] Professional expertise established
- [ ] 9-15 top products displayed
- [ ] Subcategories organized (if applicable)
- [ ] Buying guide with 3-5 considerations
- [ ] 6-10 related guides/posts linked
- [ ] 6-10 FAQ questions answered
- [ ] Specific examples from professional kitchens

**Technical:**
- [ ] Breadcrumbs present
- [ ] CollectionPage schema markup included
- [ ] FAQ schema markup included
- [ ] Breadcrumb schema markup included
- [ ] Fetching products from Supabase (dynamic)
- [ ] ISR configuration present (revalidate: 3600)
- [ ] All images have alt text
- [ ] All images use quality={75}
- [ ] EmailCaptureSection component included
- [ ] AuthorBio component included
- [ ] Mobile responsive tested

**SEO:**
- [ ] Title <60 characters
- [ ] Meta description 150-160 characters
- [ ] Target keyword in H1, first paragraph, H2s
- [ ] 15-30 internal links to reviews/guides
- [ ] No unescaped apostrophes or quotes in metadata

**Performance:**
- [ ] npm run build succeeds
- [ ] Lighthouse: Desktop 100, Mobile 80/100
- [ ] No console errors
- [ ] All links work

---

## 🎯 Success Metrics

**Track these for hub pages:**
- Organic traffic from category keywords
- Click-through rate to product reviews
- Time on page
- Bounce rate
- Internal link clicks
- Email capture rate
- Search rankings for target keywords

**Update schedule:**
- Monthly: Add new products as they're reviewed
- Quarterly: Refresh buying guide section
- Annually: Full content refresh

---

## 📚 Hub Page Examples

**Categories to Create:**
- /knives
- /cookware
- /appliances
- /tools
- /bakeware
- /storage
- /cutting-boards

**Each hub follows same structure with category-specific content.**

---

**Last Updated:** November 7, 2025  
**Reference:** Use this template for all category hub pages on Chef Approved Tools
