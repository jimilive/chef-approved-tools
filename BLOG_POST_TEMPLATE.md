# Blog Post Template

**Last Updated:** November 6, 2025  
**Purpose:** Complete guide for creating and editing blog posts  
**Content Type:** Educational, informational, SEO-driven content

---

## 🎯 Overview

Blog posts serve a different purpose than product reviews:

**Blog Posts:**
- Answer specific questions
- Teach techniques and methods
- Provide educational value
- Rank for "how to" and informational queries
- Drive traffic to product reviews
- Build topical authority

**NOT Product Reviews:**
- Don't focus on single products
- Don't include detailed pros/cons grids
- Don't have comparison tables
- Can mention products but link to full reviews

---

## 📋 Quick Reference Checklist

Before creating a blog post:
- [ ] Topic clearly defined (answers specific question)
- [ ] Primary keyword identified (search volume verified)
- [ ] Internal link opportunities mapped (which reviews/guides to link to)
- [ ] Outline created (main sections planned)
- [ ] Category assigned (knives, cookware, techniques, etc.)
- [ ] Related blog posts identified (for internal linking)

---

## 🗂️ File Structure

### Blog Post Location
```
app/blog/[post-slug]/page.tsx
```

### Example
```
app/blog/how-to-sharpen-kitchen-knives/page.tsx
```

**Note:** Blog posts are standalone files, not directories like reviews.

---

## 📝 Blog Post Structure

### Standard Format (1000-2000 words)

```tsx
export default function BlogPost() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* 1. TITLE & META INFO */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          How to Sharpen Kitchen Knives: Professional Chef Method
        </h1>
        <div className="text-sm text-slate-600 flex items-center gap-4">
          <time dateTime="2025-11-06">November 6, 2025</time>
          <span>•</span>
          <span>8 min read</span>
          <span>•</span>
          <Link href="/blog/category/knives" className="text-orange-700 hover:text-orange-800">
            Knives
          </Link>
        </div>
      </header>

      {/* 2. INTRODUCTION (100-150 words) */}
      <div className="prose prose-lg max-w-none mb-8">
        <p className="text-lg text-slate-700 leading-relaxed">
          Hook with problem or question. Establish credibility quickly. 
          Preview what they'll learn.
        </p>
      </div>

      {/* 3. MAIN CONTENT */}
      <div className="prose prose-lg max-w-none">
        
        <h2>Main Section 1</h2>
        <p>Content with 3-5 internal links to related content...</p>
        
        <h3>Subsection</h3>
        <p>More detailed content...</p>
        
        <h2>Main Section 2</h2>
        <p>Continue with structured content...</p>
        
      </div>

      {/* 4. EMAIL CAPTURE (Mid-content or end) */}
      <EmailCaptureInline />

      {/* 5. CONCLUSION (50-100 words) */}
      <div className="prose prose-lg max-w-none mb-8">
        <h2>Conclusion</h2>
        <p>Summarize key takeaways. Call to action.</p>
      </div>

      {/* 6. AUTHOR BIO */}
      <AuthorBio />

      {/* 7. RELATED POSTS (Optional) */}
      <RelatedBlogPosts posts={relatedPosts} />
    </article>
  );
}
```

---

## 📊 Component Order

**Required components in order:**

1. **Header** (title, date, read time, category)
2. **Introduction** (hook + preview)
3. **Main Content** (with proper heading hierarchy)
4. **Email Capture** (middle or end)
5. **Conclusion** (summary + CTA)
6. **Author Bio** (credibility)
7. **Related Posts** (optional, keeps users engaged)

**No comparison tables, no pros/cons grids, no testing results.**

---

## ✍️ Content Guidelines

### Blog Post vs Product Review

| Element | Blog Post | Product Review |
|---------|-----------|----------------|
| **Focus** | Educational/informational | Specific product evaluation |
| **Length** | 1000-2000 words | 2000-4000 words |
| **Structure** | Q&A format, how-to | Standardized component system |
| **Products** | Mention many, link to reviews | Deep dive on one |
| **Pros/Cons** | No formal grid | Required component |
| **Testing** | General advice | Specific test results |
| **Comparison** | No table | Table with 4 products |
| **Author Bio** | Simple component | Standard component |

### When to Write a Blog Post

**Write a blog post when:**
- ✅ Answering a "how to" question
- ✅ Explaining a technique or method
- ✅ Comparing product categories (not specific products)
- ✅ Providing educational value
- ✅ Targeting informational keywords
- ✅ Creating supporting content for reviews

**Write a product review when:**
- You're evaluating ONE specific product
- You have testing data to share
- Goal is affiliate revenue from that product
- Need detailed pros/cons analysis

**Write a guide when:**
- Creating comprehensive resource
- Covering entire category
- Building pillar content
- Need 3000+ words

### Voice & Tone

**Blog posts should:**
- Use first person ("I've sharpened thousands of knives...")
- Be conversational but professional
- Include specific examples from 24 years experience
- Reference restaurants when relevant (Purple Café, Mellow Mushroom)
- Be practical and actionable
- Avoid jargon or explain it when necessary

**Example - Good Blog Voice:**
> "After 6 years of sharpening knives daily at Purple Café, I learned that the angle matters more than the stone. Here's the method I taught every new line cook..."

**Example - Bad Blog Voice:**
> "In this comprehensive guide, we'll dive deep into the amazing world of knife sharpening. Let's explore the various techniques..."

---

## 🔤 Title & Meta Requirements

### Title Format

**Standard Format:**
```
[Topic]: [Benefit/Method] | Chef Approved Tools
```

**Examples:**
- "How to Sharpen Knives: Professional Kitchen Method"
- "Cast Iron Seasoning: The Restaurant Method That Actually Works"
- "Knife Steel Guide: What 24 Years Taught Me About Blade Materials"

**Requirements:**
- <60 characters
- Include primary keyword
- Include benefit or hook
- Use natural language (not keyword stuffing)

### Meta Description Format

**Standard Format:**
```
Learn [topic] from a chef with 24 years of professional experience. 
[Specific benefit]. [Credibility marker]. [Call to action].
```

**Example:**
```
Learn knife sharpening from a chef with 24 years in professional kitchens. 
Step-by-step guide using restaurant methods. Get razor-sharp edges safely.
```

**Requirements:**
- 150-160 characters
- <80% similarity to other descriptions
- Include credentials
- Include benefit
- Action-oriented

### URL Slug Format

**Pattern:** Descriptive, keyword-rich, readable

**Examples:**
- `/blog/how-to-sharpen-kitchen-knives`
- `/blog/cast-iron-seasoning-guide`
- `/blog/best-knife-steel-types`

**Rules:**
- Use hyphens, not underscores
- All lowercase
- Include primary keyword
- Keep under 60 characters
- Avoid stop words when possible (the, a, an)

---

## 🏷️ Categories & Tags

### Primary Categories

Blog posts should be assigned ONE primary category:

- **Knives** - Knife care, sharpening, types, selection
- **Cookware** - Pans, pots, care, techniques
- **Appliances** - Mixer use, blender techniques, care
- **Techniques** - Cooking methods, prep skills
- **Kitchen Tips** - Organization, efficiency, safety
- **Equipment Guides** - Buying advice, comparisons
- **Maintenance** - Cleaning, care, storage
- **Food Prep** - Mise en place, prep methods

### Internal Linking Strategy

**Every blog post should link to:**

**3-5 Product Reviews**
- Relevant products mentioned in post
- Use contextual anchor text
- Link naturally in content flow

**Example:**
```tsx
// ❌ BAD - Forced, unnatural
"Click here to read our Victorinox knife review."

// ✅ GOOD - Natural, contextual
"I've used <Link href="/reviews/victorinox-fibrox-8-inch-chefs-knife" 
className="text-orange-700 hover:text-orange-800">Victorinox Fibrox knives</Link> 
daily since culinary school..."
```

**2-3 Related Blog Posts**
- Complementary topics
- Further reading
- Deeper dives

**1-2 Guide Pages** (if relevant)
- Category guides
- Comprehensive resources

### Link Placement Guidelines

**First 100 words:**
- 1 internal link minimum
- Usually to most relevant product review

**Throughout content:**
- 3-5 total internal links
- Distributed naturally
- Never force links
- Use descriptive anchor text

**Conclusion:**
- 1-2 internal links to next steps
- Related content
- Product recommendations

---

## 📱 Metadata Structure

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Sharpen Kitchen Knives: Professional Chef Method | Chef Approved Tools',
  description: 'Learn knife sharpening from a chef with 24 years in professional kitchens. Step-by-step guide using restaurant methods. Get razor-sharp edges safely.',
  alternates: {
    canonical: 'https://chefapprovedtools.com/blog/how-to-sharpen-kitchen-knives',
  },
  openGraph: {
    title: 'How to Sharpen Kitchen Knives: Professional Chef Method',
    description: 'Learn knife sharpening from a chef with 24 years in professional kitchens. Step-by-step restaurant methods.',
    images: ['/images/blog/knife-sharpening-guide.jpg'],
    type: 'article',
    publishedTime: '2025-11-06T00:00:00Z',
    authors: ['Scott Bradley'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Sharpen Kitchen Knives: Professional Chef Method',
    description: 'Learn knife sharpening from a chef with 24 years in professional kitchens.',
    images: ['/images/blog/knife-sharpening-guide.jpg'],
  },
};
```

**Required fields:**
- title ✅
- description ✅
- canonical URL ✅
- OpenGraph (title, description, image, type, publishedTime) ✅
- Twitter card ✅

---

## 🖼️ Images in Blog Posts

### Featured Image

**Requirements:**
- 1200x630px (OpenGraph standard)
- <200KB file size
- WebP format preferred
- Descriptive alt text
- Shows topic visually

**Placement:**
- Top of post (after title, before content)
- Used in social shares
- Used in blog listings

### In-Content Images

**When to include:**
- Demonstrating a technique
- Showing a specific tool or product
- Breaking up long text sections
- Illustrating a concept

**Requirements:**
- Optimized file size (<200KB each)
- Descriptive alt text
- Proper captions (when needed)
- Lazy loading (below fold)

**Example:**
```tsx
<Image
  src="/images/blog/knife-sharpening-angle.jpg"
  alt="Chef demonstrating proper 15-degree sharpening angle on whetstone"
  width={800}
  height={600}
  loading="lazy"
  className="rounded-lg mb-4"
/>
<p className="text-sm text-slate-600 italic">
  Maintain a consistent 15-degree angle for optimal edge geometry
</p>
```

---

## ✅ Blog Post Checklist

### Before Writing
- [ ] Keyword research done (search volume confirmed)
- [ ] Outline created (main sections identified)
- [ ] Internal link opportunities mapped
- [ ] Category assigned
- [ ] Featured image prepared

### Content Complete
- [ ] 1000-2000 words
- [ ] Clear introduction with hook
- [ ] 3-5 main sections with h2 headings
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] 3-5 internal links to products/content
- [ ] Specific examples from professional experience
- [ ] Conclusion with clear next steps
- [ ] Author bio included
- [ ] No Lorem Ipsum or placeholders

### SEO & Accessibility
- [ ] Title unique and <60 characters
- [ ] Meta description unique (<80% similarity) and 150-160 characters
- [ ] Canonical URL correct
- [ ] All special characters escaped
- [ ] Heading hierarchy sequential
- [ ] All links use orange-700 (not orange-600)
- [ ] All images have alt text
- [ ] Internal links use descriptive anchors

### Technical
- [ ] Page builds without errors
- [ ] No TypeScript errors
- [ ] Mobile responsive
- [ ] Featured image optimized
- [ ] Schema markup present (Article schema)
- [ ] Lighthouse score >90 all categories

---

## 📊 Schema Markup

Blog posts automatically generate Article schema:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Sharpen Kitchen Knives: Professional Chef Method",
  "image": "https://chefapprovedtools.com/images/blog/knife-sharpening.jpg",
  "author": {
    "@type": "Person",
    "name": "Scott Bradley",
    "jobTitle": "Professional Chef",
    "description": "Chef with 24 years of professional kitchen experience"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Chef Approved Tools",
    "logo": {
      "@type": "ImageObject",
      "url": "https://chefapprovedtools.com/logo.png"
    }
  },
  "datePublished": "2025-11-06",
  "dateModified": "2025-11-06"
}
```

**Validate at:**
- https://validator.schema.org/
- https://search.google.com/test/rich-results

---

## 🚨 Common Mistakes

### Mistake #1: Too Product-Focused
**Problem:** Blog post reads like a product review

**Solution:** Focus on the technique/topic, mention products as examples with links to full reviews

### Mistake #2: No Internal Links
**Problem:** Dead-end content, users leave site

**Solution:** Link to 3-5 related reviews/posts naturally throughout

### Mistake #3: Generic Content
**Problem:** Sounds like every other blog post on the topic

**Solution:** Add specific examples from 24 years of professional experience

### Mistake #4: Poor Heading Hierarchy
**Problem:** h2 → h4 skipping, multiple h1 tags

**Solution:** Only one h1 (title), then sequential h2 → h3 → h4

### Mistake #5: No Author Bio
**Problem:** Missing E-E-A-T signal

**Solution:** Always include AuthorBio component at end

### Mistake #6: Forgetting Email Capture
**Problem:** Not converting readers to subscribers

**Solution:** Include email capture mid-content or at end

### Mistake #7: Keyword Stuffing
**Problem:** Unnatural writing trying to force keywords

**Solution:** Write naturally, include keyword 3-5 times organically

---

## 📈 Blog Post Types

### How-To Posts (Most Common)

**Format:** Step-by-step instructions

**Structure:**
1. Introduction (problem + solution preview)
2. What You'll Need (tools/ingredients)
3. Step 1: [Action]
4. Step 2: [Action]
5. Step 3: [Action]
6. Tips & Troubleshooting
7. Conclusion

**Example Topics:**
- How to Sharpen Knives
- How to Season Cast Iron
- How to Clean a Blender

---

### Comparison Posts

**Format:** Compare options/methods/tools

**Structure:**
1. Introduction (what's being compared, why it matters)
2. Option 1: [Details, pros, cons]
3. Option 2: [Details, pros, cons]
4. Option 3: [Details, pros, cons]
5. Which to Choose (decision framework)
6. Conclusion

**Example Topics:**
- Gas vs Electric vs Induction Cooktops
- Japanese vs German Chef Knives
- Stand Mixer vs Hand Mixer: When to Use Each

**Note:** Link to specific product reviews for each option

---

### Listicle Posts

**Format:** Numbered or bulleted list

**Structure:**
1. Introduction (topic + why it matters)
2. Item 1: [Title + explanation]
3. Item 2: [Title + explanation]
4. Item 3: [Title + explanation]
5. [Continue...]
6. Conclusion

**Example Topics:**
- 7 Knife Mistakes That Ruin Edges
- 5 Cast Iron Myths Debunked
- 10 Kitchen Tools You Don't Actually Need

---

### Technique Posts

**Format:** Teach a specific skill or method

**Structure:**
1. Introduction (why technique matters)
2. The Science/Theory Behind It
3. The Professional Method
4. Common Mistakes to Avoid
5. Practice Tips
6. Conclusion

**Example Topics:**
- The French Onion Technique Every Chef Knows
- Restaurant Method for Perfect Rice Every Time
- Professional Knife Grip for Better Control

---

### Buying Guide Posts

**Format:** Help readers choose right product

**Structure:**
1. Introduction (problem/need)
2. What to Look For (key features)
3. What to Avoid (red flags)
4. Budget Considerations
5. Top Recommendations (link to reviews)
6. Conclusion

**Example Topics:**
- What to Look for in a Chef's Knife
- Choosing Your First Cast Iron Pan
- Stand Mixer Buying Guide for Home Bakers

**Note:** Heavy internal linking to product reviews

---

## 💡 Pro Tips

1. **Start with the outline** - Plan structure before writing
2. **Use your experience** - Specific restaurant stories beat generic advice
3. **Link early** - First internal link within first 100 words
4. **Break up text** - Use h2/h3 subheadings every 200-300 words
5. **Answer the question** - Don't bury the answer, give it upfront
6. **Include visuals** - Images, diagrams, or bullet points for scannability
7. **End with action** - Tell them what to do next
8. **Update regularly** - Refresh top-performing posts annually

---

## 🔄 Content Refresh Schedule

### When to Update Blog Posts

**Quarterly review:**
- Top 10 traffic-generating posts
- Update any outdated information
- Add new internal links to recent reviews
- Refresh meta description if needed

**Annual update:**
- All technique posts (methods evolve)
- All buying guides (products change)
- Add "Updated [date]" note at top

**Immediate update needed when:**
- Product mentioned is discontinued
- Technique information is outdated
- Link goes to 404
- Better examples available

---

## 📚 Related Documentation

**Reference these when creating blog posts:**

- **SEO_AND_ACCESSIBILITY_REQUIREMENTS.md** - Standards and accessibility rules
- **CONTENT_GUIDELINES.md** - Voice, tone, content strategy
- **STYLE_GUIDE.md** - Design system and styling
- **REVIEW_PAGE_MASTER_TEMPLATE.md** - For linking to product reviews

---

## 🎯 Success Metrics

**A successful blog post:**
- Ranks on page 1 for target keyword
- Drives 3-5% click-through to product reviews
- Generates email signups (>1% conversion)
- Maintains >2 minute average time on page
- Has <50% bounce rate
- Gets cited by AI search tools

**Track these:**
- Google Search Console impressions/clicks
- Internal link click-through rates
- Email capture conversion
- Time on page
- Traffic to linked product reviews

---

**Remember:** Blog posts are the **top of funnel**. They attract traffic, provide value, and drive readers to product reviews where affiliate revenue happens. Every blog post should have a clear path to at least 3 product reviews.

---

**Last Updated:** November 6, 2025
