# Phase 1 Content Blitz - Quick Start Guide

## 🎯 Goal
Create 30 high-quality, SEO-optimized posts in 30 days following the 30-30-40 rule:
- **30% Transactional** (Product Reviews) - 9 posts
- **30% Informational** (Buying Guides) - 9 posts
- **40% Comparison** (X vs Y, Best of Lists) - 12 posts

---

## 🚀 Getting Started

### 1. Install Required Tools

```bash
# Image optimization tools
brew install imagemagick webp

# Verify installation
convert --version
cwebp -version
```

### 2. Set Up Your Workspace

```bash
# Create image directories
mkdir -p public/images/temp
mkdir -p public/images/products

# Make scripts executable (already done, but just in case)
chmod +x scripts/content-creation/*.sh
```

### 3. Review Your Content Calendar

Open `docs/phase1/30-day-content-calendar.md` and:
- Set your start/end dates
- Review the 30 posts planned
- Adjust based on your products/expertise
- Mark posts as you complete them

---

## ✍️ Daily Content Creation Workflow

### Create a New Post (5 minutes)

```bash
# Product Review
./scripts/content-creation/new-post.sh review wusthof-classic-8-inch-knife

# Comparison Post
./scripts/content-creation/new-post.sh comparison wusthof-vs-shun

# Buying Guide
./scripts/content-creation/new-post.sh guide how-to-choose-chef-knife
```

This creates a new file from the template with:
- Proper directory structure
- All schema markup
- SEO-optimized layout
- Conversion-optimized CTAs

### Fill in the Template (2-3 hours)

**Hour 1: Research**
1. Open the new `page.tsx` file in VS Code
2. Research your topic:
   - Google the target keyword
   - Check "People Also Ask"
   - Review top 10 results
   - Note what's missing
   - Check Amazon reviews for product insights

**Hours 2-3: Write**
1. Fill in `productData` / `guideData` / `comparisonData`
2. Write each section:
   - Use VS Code snippets (type `productbox`, `proscons`, etc.)
   - Add personal testing experience
   - Include specific details and numbers
   - Insert comparison tables
   - Add pro tips and warnings
3. Write 1500-3000 words total

**Pro Tips:**
- Use the VS Code snippets extensively - they'll save hours
- Keep your writing conversational and authentic
- Share real experiences from your 40 years as a chef
- Be honest about pros AND cons

### Add Images (30 minutes)

```bash
# 1. Add raw images to temp folder
# Save your product photos to: public/images/temp/[product-name]/

# 2. Optimize images
./scripts/content-creation/optimize-images.sh \
  public/images/temp/[product-name] \
  public/images/products/[product-name]

# 3. Update image paths in your post
# Replace [ADD PRODUCT IMAGE] comments with actual image components
```

**Image Guidelines:**
- 5-7 images per post minimum
- Product shots, close-ups, in-use photos
- Before/after if relevant
- Comparison shots for comparison posts
- All images will be auto-converted to WebP

### SEO Optimization (30 minutes)

1. **Update metadata:**
   ```tsx
   export const metadata = {
     title: "Product Name Review 2025: Worth It? | Chef Approved",
     description: "Professional chef reviews [product]...",
     keywords: ["keyword1", "keyword2", ...]
   }
   ```

2. **Add internal links:**
   - Link to related product reviews
   - Link to buying guides
   - Link to comparison posts
   - Use descriptive anchor text

3. **Verify schema markup:**
   - Product schema (reviews)
   - FAQ schema (guides)
   - Breadcrumb schema (all pages)

4. **Check affiliate links:**
   - All Amazon links include: `?tag=chefapprovedt-20`
   - All have `rel="nofollow sponsored"`

### Test & Publish (15 minutes)

```bash
# Test locally
npm run dev
# Visit http://localhost:3000/reviews/[your-slug]

# Check for:
# - All images load
# - Affiliate links work
# - Mobile responsive
# - No console errors

# Commit and push
git add .
git commit -m "Add [product name] review"
git push

# Netlify will auto-deploy
```

### Post-Publish (15 minutes)

1. **Submit to Google:**
   - Go to Google Search Console
   - Request indexing for new URL

2. **Update calendar:**
   - Mark post as ✅ complete in `30-day-content-calendar.md`

3. **Internal linking:**
   - Go back to 2-3 related posts
   - Add links to your new post

---

## 🎨 Using VS Code Snippets

Type these shortcuts in your `.tsx` files:

| Shortcut | Creates |
|----------|---------|
| `productbox` | Product box with CTA button |
| `proscons` | Pros and cons grid |
| `tablerow` | Comparison table row |
| `featurecard` | Feature card with icon |
| `afflink` | Affiliate link button |
| `protip` | Pro tip callout box |
| `warning` | Warning/caution box |
| `faqitem` | FAQ question/answer |
| `productcard` | Full product recommendation card |
| `choice2col` | Two-column choice section |
| `testresults` | Testing results section |
| `bottomline` | Bottom line verdict |
| `newslettercta` | Newsletter CTA section |

---

## 📊 Content Types & Templates

### Product Review Template
**Best for:** Individual product reviews
**Target:** Transactional keywords (e.g., "Wusthof Classic review")
**Length:** 1500-2500 words
**Key sections:**
- Quick verdict
- Features grid
- Testing results
- Pros/cons
- Pricing
- Who should buy
- Bottom line

**Use when:** Reviewing a specific product with affiliate link

### Comparison Template
**Best for:** Head-to-head comparisons or "best of" lists
**Target:** Comparison keywords (e.g., "Wusthof vs Shun", "best chef knives")
**Length:** 2000-3000 words
**Key sections:**
- Quick verdict (overall/budget/premium winners)
- Side-by-side cards
- Detailed comparison table
- Testing results
- Which to choose
- Bottom line

**Use when:** Comparing 2-10 products or creating a "best of" list

### Buying Guide Template
**Best for:** Educational, informational content
**Target:** Informational keywords (e.g., "how to choose chef knife")
**Length:** 2500-3500 words
**Key sections:**
- Table of contents
- Key factors
- Types explained (with table)
- Common mistakes
- Top recommendations (3-7 products)
- Care/maintenance
- FAQs (5-8 questions)

**Use when:** Teaching concepts or decision frameworks

---

## 💰 Affiliate Link Best Practices

### Amazon Link Format
Always use this format:
```
https://www.amazon.com/dp/[ASIN]?tag=chefapprovedt-20&linkCode=ll1&linkId=[UNIQUE-ID]
```

### Where to Place Links
- Hero section (above the fold)
- After pros/cons section
- In comparison tables
- Before "who should buy" section
- In bottom line section
- In product recommendation cards

### Frequency
- Every 300-500 words in long posts
- At least 3-5 times per post
- Never more than 2 paragraphs without a CTA in reviews

### Link Text Variations
Rotate between:
- "Check Price on Amazon →"
- "See Current Price →"
- "View on Amazon →"
- "Buy on Amazon →"
- "Get It on Amazon →"

---

## 📈 Tracking Progress

### Daily Checklist
- [ ] Create new post from template
- [ ] Research topic and competitors
- [ ] Write 1500-3000 words
- [ ] Add 5-7 optimized images
- [ ] Insert 3-5 affiliate links
- [ ] Add 2-3 internal links
- [ ] Verify schema markup
- [ ] Test locally
- [ ] Commit and push
- [ ] Submit to Search Console
- [ ] Update content calendar

### Weekly Goals
- **Week 2:** 7 product reviews (transactional)
- **Week 3:** 7 comparison posts (high traffic)
- **Week 4:** 8 buying guides (authority)
- **Week 5:** 8 long-tail posts (conversions)

### Success Metrics
Track in `30-day-content-calendar.md`:
- Posts completed: X/30
- Words written: ~2000/post × 30 = 60,000 words
- Images optimized
- Affiliate links added
- Internal links created

---

## 🎯 Content Quality Checklist

Before publishing, verify:

### Content Quality
- [ ] 1500+ words minimum
- [ ] Personal testing/experience included
- [ ] Specific details (numbers, measurements, brands)
- [ ] Honest pros AND cons
- [ ] Clear recommendation for target audience
- [ ] Conversational, authentic tone
- [ ] No fluff or filler content

### SEO
- [ ] Target keyword in title
- [ ] Target keyword in H1
- [ ] Target keyword in first paragraph
- [ ] LSI keywords throughout
- [ ] Meta description under 155 characters
- [ ] Alt text on all images
- [ ] Internal links to 2-3 related posts
- [ ] Schema markup (Product/FAQ/Breadcrumb)

### Conversion
- [ ] Affiliate links above the fold
- [ ] 3-5+ affiliate links throughout
- [ ] All links have proper rel attributes
- [ ] Clear CTAs ("Check Price", "Buy Now")
- [ ] FTC disclosure visible
- [ ] Newsletter CTA included
- [ ] Product images with CTAs
- [ ] Trust signals (experience, credentials)

### Technical
- [ ] Images optimized (WebP)
- [ ] Mobile responsive
- [ ] Fast load time
- [ ] No broken links
- [ ] Proper breadcrumbs
- [ ] Clean URL structure

---

## 🔥 Pro Tips for Speed

### Writing Faster
1. **Batch similar content** - Do all knife reviews in one session
2. **Reuse research** - One deep-dive can fuel 5+ posts
3. **Use snippets heavily** - Don't write repetitive sections
4. **Outline first** - 10 minutes outlining saves 60 minutes writing
5. **Time-box sections** - 30 minutes per major section max

### Image Workflow
1. **Take all photos in one session** - Set up lighting once
2. **Batch process** - Optimize 10+ products at once
3. **Build library** - Reuse shots across multiple posts
4. **Template shots** - Same angles for every product type

### SEO Shortcuts
1. **Meta template** - Copy/paste, replace product name
2. **Schema template** - Use same structure every time
3. **Internal link list** - Keep list of posts to link to
4. **Keyword spreadsheet** - Pre-research all 30 posts

---

## 🆘 Troubleshooting

### "Images won't optimize"
```bash
# Check if tools are installed
which convert
which cwebp

# If not installed:
brew install imagemagick webp
```

### "Affiliate links not working"
- Check for typos in tag: `?tag=chefapprovedt-20`
- Verify rel attributes: `rel="nofollow sponsored"`
- Test links in incognito window

### "Site won't build"
```bash
# Check for TypeScript errors
npm run type-check

# Check for syntax errors
npm run lint

# View full error
npm run build
```

### "Google not indexing"
- Submit URL manually in Search Console
- Check for noindex tags (shouldn't have any)
- Verify sitemap includes new URLs
- Give it 3-7 days

---

## 📚 Resources

### Templates
- `templates/content/product-review-template.tsx`
- `templates/content/comparison-post-template.tsx`
- `templates/content/buying-guide-template.tsx`

### Scripts
- `scripts/content-creation/new-post.sh` - Create new post
- `scripts/content-creation/optimize-images.sh` - Optimize images
- `scripts/content-creation/batch-optimize.sh` - Batch process

### Documentation
- `docs/phase1/30-day-content-calendar.md` - Full calendar
- `docs/phase1/PHASE1-QUICKSTART.md` - This file

### VS Code Snippets
- `.vscode/content-snippets.code-snippets` - All content snippets

---

## 🎉 Ready to Start?

### Your First Post - Day 8

```bash
# 1. Create post
./scripts/content-creation/new-post.sh review wusthof-classic-8-inch-knife

# 2. Open in VS Code
code app/reviews/wusthof-classic-8-inch-knife/page.tsx

# 3. Fill in the template (use snippets!)

# 4. Add images
# Save photos to: public/images/temp/wusthof-classic/
./scripts/content-creation/optimize-images.sh \
  public/images/temp/wusthof-classic \
  public/images/products/wusthof-classic

# 5. Test
npm run dev

# 6. Publish
git add .
git commit -m "Add Wusthof Classic 8-inch knife review"
git push

# 7. Update calendar
# Mark Day 8 as ✅ in 30-day-content-calendar.md
```

**Estimated time:** 4-5 hours for your first post, 3-4 hours once you get into the rhythm.

---

**You've got this! 30 posts in 30 days is absolutely doable with these systems in place. Start with Day 8 tomorrow. 🚀**

**Questions? Issues? Check the main README or review the templates.**
