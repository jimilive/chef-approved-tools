# Guide Page Template

**Last Updated:** November 7, 2025  
**Purpose:** Complete template for creating comprehensive guide pages  
**Examples:** "Ultimate Guide to Cast Iron", "Complete Knife Buying Guide"

---

## 🎯 What is a Guide Page?

Guide pages are **comprehensive, evergreen resources** that serve as authoritative references on a specific topic. They're longer and more detailed than blog posts, designed to be the definitive resource that ranks for broad, high-volume keywords.

### Guide vs Blog Post vs Review

| Type | Length | Purpose | Example |
|------|--------|---------|---------|
| **Guide** | 3,000-5,000+ words | Comprehensive reference, ranks for broad keywords | "Ultimate Guide to Cast Iron Cookware" |
| **Blog Post** | 1,000-2,000 words | Answers specific question, ranks for long-tail keywords | "How to Season Cast Iron Properly" |
| **Review** | 1,500-2,500 words | Evaluates specific product | "Lodge Cast Iron Skillet Review" |

---

## 📋 Guide Page Structure (12 Components)

### 1. Schema Markup
```typescript
// Article schema (guides are articles, not products)
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Ultimate Guide to Cast Iron Cookware',
  description: 'Meta description here',
  author: {
    '@type': 'Person',
    name: 'Scott Bradley',
    // ... author details
  },
  datePublished: '2024-10-15',
  dateModified: '2025-01-20',
  publisher: {
    '@type': 'Organization',
    name: 'Chef Approved Tools',
    // ... publisher details
  }
}

// Breadcrumb schema
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://www.chefapprovedtools.com' },
  { name: 'Guides', url: 'https://www.chefapprovedtools.com/guides' },
  { name: 'Cast Iron Guide', url: 'https://www.chefapprovedtools.com/guides/cast-iron' }
])

// FAQ schema (if applicable)
const faqSchema = generateFAQSchema(faqData)
```

---

### 2. Metadata Requirements

```typescript
export async function generateMetadata() {
  return {
    title: 'Ultimate Guide to Cast Iron Cookware (2025) | Chef Approved', // <60 chars
    description: 'Professional chef with 24 years experience shares everything you need to know about cast iron cookware, from seasoning to maintenance to buying advice.', // 150-160 chars
    openGraph: {
      type: 'article',
      publishedTime: '2024-10-15T00:00:00Z',
      modifiedTime: '2025-01-20T00:00:00Z',
      authors: ['Scott Bradley'],
    },
    // ... other metadata
  }
}
```

**Title Format Options:**
- "Ultimate Guide to [Topic] ([Year]) | Chef Approved"
- "Complete [Topic] Guide: Professional Chef's Advice"
- "[Topic]: Everything You Need to Know (2025)"

**Meta Description Requirements:**
- 150-160 characters
- Include "24 years experience" or similar credential
- Include primary benefit
- <80% similar to other meta descriptions

---

### 3. Breadcrumbs

```html
<div className="bg-white border-b border-gray-200 -mx-5 px-5 py-3 text-sm text-gray-600 mb-4">
  <Link href="/" className="hover:text-orange-700">Home</Link>
  {' / '}
  <Link href="/guides" className="hover:text-orange-700">Guides</Link>
  {' / '}
  <span>Cast Iron Guide</span>
</div>
```

---

### 4. Date Stamps

```html
<div className="text-sm text-slate-600 mb-4">
  <time dateTime="2024-10-15">Published: October 15, 2024</time>
  {' • '}
  <time dateTime="2025-01-20">Updated: January 20, 2025</time>
</div>
```

**Placement:** Below breadcrumbs, above hero

---

### 5. Hero Section

```html
<section className="bg-white rounded-xl shadow-lg p-8 mb-8">
  <h1 className="text-4xl font-bold text-slate-900 mb-4">
    Ultimate Guide to Cast Iron Cookware
  </h1>
  
  <p className="text-lg text-slate-700 mb-6 leading-relaxed">
    After 24 years in professional kitchens and countless hours working with cast iron, 
    I've learned what actually matters when choosing, using, and maintaining these 
    workhorses. This guide covers everything from seasoning science to buying advice.
  </p>
  
  <div className="flex items-center gap-4 text-sm text-slate-600">
    <div className="flex items-center gap-2">
      <span className="font-semibold">By Scott Bradley</span>
    </div>
    <span>•</span>
    <div>24 years professional kitchen experience</div>
    <span>•</span>
    <div>15 min read</div>
  </div>
</section>
```

**Hero Requirements:**
- H1 with guide title
- 2-3 sentence introduction establishing credibility
- Author byline with credentials
- Estimated read time

---

### 6. Table of Contents (Optional but Recommended)

```html
<section className="bg-gray-50 rounded-xl p-6 mb-8">
  <h2 className="text-2xl font-bold text-slate-900 mb-4">
    What's in This Guide
  </h2>
  
  <nav className="grid md:grid-cols-2 gap-3">
    <a href="#basics" className="text-orange-700 hover:text-orange-800 hover:underline">
      → Cast Iron Basics
    </a>
    <a href="#seasoning" className="text-orange-700 hover:text-orange-800 hover:underline">
      → Seasoning & Maintenance
    </a>
    <a href="#cooking" className="text-orange-700 hover:text-orange-800 hover:underline">
      → Cooking Techniques
    </a>
    <a href="#buying" className="text-orange-700 hover:text-orange-800 hover:underline">
      → Buying Guide
    </a>
    {/* ... more sections */}
  </nav>
</section>
```

**Use TOC when:**
- Guide is over 2,500 words
- Has 5+ major sections
- Covers multiple subtopics

---

### 7. Main Content Sections

**Section Structure:**
```html
<section id="basics" className="bg-white rounded-xl shadow-lg p-8 mb-8">
  <h2 className="text-3xl font-bold text-slate-900 mb-6">
    Cast Iron Basics: What You Need to Know
  </h2>
  
  <div className="prose prose-lg max-w-none">
    {/* Content here */}
    
    <h3 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">
      Why Professional Kitchens Use Cast Iron
    </h3>
    
    <p className="text-slate-700 leading-relaxed mb-4">
      Content with specific examples...
    </p>
    
    {/* More subsections */}
  </div>
</section>
```

**Content Requirements:**
- Use H2 for major sections
- Use H3 for subsections
- Include specific examples from professional experience
- Add "when to use vs when not to use" guidance
- Include relevant images with alt text
- Link to 3-5 product reviews per section

**Typical Sections:**
1. Basics/Introduction to topic
2. How it works / Science behind it
3. Practical applications
4. Common mistakes to avoid
5. Professional tips and techniques
6. Buying guide / What to look for
7. Maintenance and care
8. FAQ

---

### 8. Product Recommendations Section

```html
<section className="bg-white rounded-xl shadow-lg p-8 mb-8">
  <h2 className="text-3xl font-bold text-slate-900 mb-6">
    Recommended Cast Iron Cookware
  </h2>
  
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Product cards */}
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
      <img src="..." alt="..." className="w-full rounded-lg mb-4" />
      <h3 className="text-xl font-semibold mb-2">Lodge Cast Iron Skillet</h3>
      <p className="text-slate-600 mb-4">Best for beginners and daily use</p>
      <a href="/reviews/lodge-cast-iron-skillet" className="text-orange-700 hover:text-orange-800 font-semibold">
        Read Full Review →
      </a>
    </div>
    
    {/* More product cards */}
  </div>
</section>
```

**Requirements:**
- Link to 5-10 relevant product reviews
- Brief description of each product
- "Read Full Review" links (NOT "Buy Now")
- Organized by use case or category

---

### 9. Comparison Tables (Where Applicable)

```html
<section className="bg-white rounded-xl shadow-lg p-8 mb-8">
  <h2 className="text-3xl font-bold text-slate-900 mb-6">
    Cast Iron vs Other Cookware Materials
  </h2>
  
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="bg-gray-50">
          <th className="text-left p-4">Feature</th>
          <th className="text-left p-4">Cast Iron</th>
          <th className="text-left p-4">Stainless Steel</th>
          <th className="text-left p-4">Nonstick</th>
        </tr>
      </thead>
      <tbody>
        {/* Comparison rows */}
      </tbody>
    </table>
  </div>
</section>
```

**Use comparison tables for:**
- Material comparisons
- Technique comparisons
- Product category comparisons
- Pros/cons of different approaches

---

### 10. FAQ Section

```html
<section className="bg-white rounded-xl shadow-lg p-8 mb-8">
  <h2 className="text-3xl font-bold text-slate-900 mb-6">
    Frequently Asked Questions
  </h2>
  
  <div className="space-y-6">
    <div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">
        Can you use soap on cast iron?
      </h3>
      <p className="text-slate-700">
        Yes! This is one of the biggest myths about cast iron. Modern dish soap 
        won't strip your seasoning. At Purple Café, we used soap daily on our 
        cast iron pans for 5 years with no issues...
      </p>
    </div>
    
    {/* 8-12 more questions */}
  </div>
</section>
```

**FAQ Requirements:**
- 8-12 questions minimum
- Answer each thoroughly (100-200 words)
- Include professional experience where relevant
- Add FAQ schema markup

---

### 11. Email Capture Section

```tsx
<EmailCaptureSection 
  title="Get My Free Kitchen Tools Guide"
  description="Download the exact 11 tools I use most after 24 years in professional kitchens."
/>
```

**Placement:** After main content, before conclusion

---

### 12. Conclusion Section

```html
<section className="bg-white rounded-xl shadow-lg p-8 mb-8">
  <h2 className="text-3xl font-bold text-slate-900 mb-6">
    The Bottom Line
  </h2>
  
  <p className="text-lg text-slate-700 leading-relaxed mb-6">
    Cast iron isn't perfect for everything, but after 24 years of using it 
    professionally, I can tell you it's one of the most versatile tools in 
    any kitchen. The key is understanding when to use it and when to reach 
    for something else.
  </p>
  
  <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-r-lg">
    <h3 className="text-xl font-semibold text-slate-900 mb-2">
      Key Takeaways
    </h3>
    <ul className="list-disc list-inside space-y-2 text-slate-700">
      <li>Key point 1</li>
      <li>Key point 2</li>
      <li>Key point 3</li>
      <li>Key point 4</li>
    </ul>
  </div>
</section>
```

**Conclusion Requirements:**
- 2-3 paragraph summary
- Key takeaways box (3-5 bullets)
- Clear next step or call to action

---

### 13. Related Content Section

```html
<section className="bg-white rounded-xl shadow-lg p-8 mb-8">
  <h2 className="text-3xl font-bold text-slate-900 mb-6">
    Related Guides & Reviews
  </h2>
  
  <div className="grid md:grid-cols-3 gap-6">
    <a href="/guides/stainless-steel" className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2">Stainless Steel Guide</h3>
      <p className="text-slate-600">Complete guide to stainless steel cookware</p>
    </a>
    
    {/* 2-5 more related items */}
  </div>
</section>
```

**Link to:**
- Related guides
- Related blog posts
- Related product reviews
- Related categories

---

### 14. Author Bio

```tsx
<AuthorBio />
```

**Placement:** End of page, after related content

---

## 📊 Complete File Structure

```
/app/guides/[guide-slug]/
├── page.tsx                    // Main guide page
└── [guide-slug]-data.ts        // Guide content data
```

---

## 📝 Data File Structure (guide-slug-data.ts)

```typescript
export const guideData = {
  // Metadata
  metadata: {
    title: 'Ultimate Guide to Cast Iron Cookware (2025) | Chef Approved',
    description: 'Professional chef with 24 years experience shares everything you need to know about cast iron cookware.',
    publishedDate: '2024-10-15',
    lastUpdated: '2025-01-20',
    readTime: '15 min',
    category: 'cookware',
  },
  
  // Breadcrumb
  breadcrumb: {
    guideName: 'Cast Iron Guide'
  },
  
  // Hero
  hero: {
    title: 'Ultimate Guide to Cast Iron Cookware',
    introduction: 'After 24 years in professional kitchens and countless hours working with cast iron, I\'ve learned what actually matters when choosing, using, and maintaining these workhorses.',
    author: 'Scott Bradley',
    credentials: '24 years professional kitchen experience',
    readTime: '15 min',
  },
  
  // Table of contents (optional)
  tableOfContents: [
    { id: 'basics', label: 'Cast Iron Basics' },
    { id: 'seasoning', label: 'Seasoning & Maintenance' },
    { id: 'cooking', label: 'Cooking Techniques' },
    { id: 'buying', label: 'Buying Guide' },
    { id: 'faq', label: 'FAQ' },
  ],
  
  // Main sections
  sections: [
    {
      id: 'basics',
      title: 'Cast Iron Basics: What You Need to Know',
      content: `
        <h3>Why Professional Kitchens Use Cast Iron</h3>
        <p>Content here...</p>
        <!-- Full HTML content -->
      `
    },
    // ... more sections
  ],
  
  // Product recommendations
  recommendedProducts: [
    {
      slug: 'lodge-cast-iron-skillet',
      title: 'Lodge Cast Iron Skillet',
      description: 'Best for beginners and daily use',
      category: 'Skillets'
    },
    // ... more products
  ],
  
  // FAQ
  faq: {
    questions: [
      {
        question: 'Can you use soap on cast iron?',
        answer: 'Yes! This is one of the biggest myths about cast iron...'
      },
      // ... 8-12 questions
    ]
  },
  
  // Conclusion
  conclusion: {
    title: 'The Bottom Line',
    summary: 'Cast iron isn\'t perfect for everything...',
    keyTakeaways: [
      'Key point 1',
      'Key point 2',
      'Key point 3',
      'Key point 4',
    ]
  },
  
  // Related content
  relatedContent: [
    { type: 'guide', slug: 'stainless-steel-guide', title: 'Stainless Steel Guide' },
    { type: 'review', slug: 'lodge-skillet', title: 'Lodge Skillet Review' },
    { type: 'blog', slug: 'seasoning-cast-iron', title: 'How to Season Cast Iron' },
  ]
}
```

---

## 🎨 Styling Standards

### Layout
- Max width: 900px for content
- Background: `bg-gray-50`
- Sections: White cards with `rounded-xl shadow-lg`
- Spacing: `mb-8` between sections

### Typography
- H1: `text-4xl font-bold`
- H2: `text-3xl font-bold`
- H3: `text-2xl font-semibold`
- Body: `text-base text-slate-700 leading-relaxed`
- Links: `text-orange-700 hover:text-orange-800`

### Components
- Use existing components where possible
- Maintain consistency with review pages
- Follow accessibility guidelines

---

## 📋 Content Guidelines for Guides

### Length
- Minimum: 3,000 words
- Optimal: 4,000-6,000 words
- Maximum: No limit if providing genuine value

### Voice
- Educational but conversational
- Professional experience evident throughout
- Specific examples from 24 years of kitchen work
- Honest about limitations and trade-offs

### Structure
- Clear hierarchy (H1 → H2 → H3)
- Scannable with subheadings every 300-500 words
- Visual breaks (images, tables, lists, callout boxes)
- Logical flow from basics to advanced

### Links
- 10-20 internal links to product reviews
- 5-10 internal links to blog posts
- Link naturally within content (not forced)
- Use descriptive anchor text

---

## 🔍 SEO Requirements for Guides

### On-Page SEO
- [ ] Target keyword in H1
- [ ] Target keyword in first paragraph
- [ ] Target keyword in 3-5 H2 headings
- [ ] 10-20 internal links to reviews/blogs
- [ ] Alt text on all images
- [ ] FAQ schema markup
- [ ] Article schema markup
- [ ] Breadcrumb schema markup
- [ ] Published and updated dates visible

### Keywords to Target
- Broad, high-volume keywords
- "Ultimate guide to [topic]"
- "Complete [topic] guide"
- "[Topic] for beginners"
- "Everything you need to know about [topic]"

### Meta Requirements
- [ ] Title <60 characters
- [ ] Meta description 150-160 characters
- [ ] Title <80% similar to other pages
- [ ] Description <80% similar to other pages
- [ ] No unescaped apostrophes or quotes

---

## ✅ Pre-Publish Checklist

**Content:**
- [ ] 3,000+ words of comprehensive content
- [ ] H1 → H2 → H3 hierarchy maintained
- [ ] Scott's professional experience evident
- [ ] 10-20 internal links to reviews
- [ ] 8-12 FAQ questions answered
- [ ] Product recommendations included
- [ ] "When to use vs when not to use" guidance
- [ ] Specific examples from professional kitchens
- [ ] Honest about limitations

**Technical:**
- [ ] Published and updated dates visible
- [ ] Breadcrumbs present
- [ ] Article schema markup included
- [ ] FAQ schema markup included
- [ ] Breadcrumb schema markup included
- [ ] All images have alt text
- [ ] All images use quality={75}
- [ ] EmailCaptureSection component included
- [ ] AuthorBio component included
- [ ] Mobile responsive tested

**SEO:**
- [ ] Title <60 characters
- [ ] Meta description 150-160 characters
- [ ] Target keyword in H1, first paragraph, H2s
- [ ] Internal links use descriptive anchor text
- [ ] No unescaped apostrophes or quotes in metadata

**Performance:**
- [ ] npm run build succeeds
- [ ] Lighthouse: Desktop 100, Mobile 80/100
- [ ] No console errors
- [ ] All links work

---

## 🎯 Success Metrics

**Track these for guide pages:**
- Average time on page (target: 5+ minutes)
- Scroll depth (target: 60%+ reach bottom)
- Internal link clicks (which products get most clicks)
- Email capture rate (target: 5-10%)
- Search rankings for target keyword
- Traffic growth over time

**Update schedule:**
- Quarterly: Review for outdated information
- Annually: Full content refresh and expansion
- As needed: Update when products/techniques change

---

## 📚 Examples of Great Guide Pages

**Internal References:**
- (Create these as examples)

**External Inspiration:**
- Serious Eats comprehensive guides
- America's Test Kitchen equipment reviews
- Wirecutter buying guides

**What makes them great:**
- Comprehensive coverage
- Clear structure
- Specific recommendations
- Honest assessments
- Regular updates

---

**Last Updated:** November 7, 2025  
**Reference:** Use this template for all comprehensive guide pages on Chef Approved Tools
