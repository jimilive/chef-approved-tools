# Chef Approved Tools - Documentation System

**Last Updated:** November 10, 2025  
**Purpose:** Entry point for ALL work on Chef Approved Tools  
**Read This:** At the start of EVERY session

---

## 🎯 START HERE

**This project represents 300+ hours of work and is Scott's path to financial independence after job loss.**

### Core Principle

**Preserve functionality over "improvements."**

When in doubt: **STOP and ASK before changing anything.**

---

## 🚨 CRITICAL: Read This Every Time

### The Three Rules

```
1. NO SCRIPTS without explicit approval (each time)
2. NO CHANGES without explicit approval (each time)  
3. QUALITY over speed (always)
```

**Better to ask than to break 300 hours of work.**

---

## 📚 Quick Navigation: Where Should I Go?

### Creating Content?

**Product Review Page:**
1. Read [VOICE_AND_CREDENTIALS.md] first (15 min)
2. Go to [CONTENT_STANDARDS.md - Part 2: Review System]
3. Check [COMPONENT_INTERFACES.md] for exact prop specs
4. Need comparison table? [COMPARISON_TABLE_GUIDE.md]

**Blog Post:**
1. Read [VOICE_AND_CREDENTIALS.md] first (15 min)
2. Decide: X vs Y comparison or educational content?
   - X vs Y → [CONTENT_STANDARDS.md - Part 3: Pattern A]
   - Educational → [CONTENT_STANDARDS.md - Part 3: Pattern B]

**Email Content:**
1. Read [VOICE_AND_CREDENTIALS.md] first
2. See [CONTENT_STANDARDS.md - Part 5: Email System] (Friend voice - different rules!)
3. **Remember:** Emails CAN use personal stories and restaurant names

---

### Coding or Design?

**UI/Design Work:**
1. Read [TECHNICAL_STANDARDS.md - Part 1: Design System]
2. Check [TECHNICAL_STANDARDS.md - Part 2: Accessibility]
3. Verify colors, spacing, components

**Component Development:**
1. Check [COMPONENT_INTERFACES.md] for exact TypeScript interfaces
2. See [TECHNICAL_STANDARDS.md - Part 3: Architecture]
3. Test locally before pushing

**Architecture or Performance:**
1. See [TECHNICAL_STANDARDS.md - Part 3: Architecture]
2. See [TECHNICAL_STANDARDS.md - Part 4: Performance Standards]

---

### Not Sure What You Need?

**Decision Tree:**

```
Am I writing words? (reviews, blogs, emails)
├─ YES → Read VOICE_AND_CREDENTIALS.md first
│        Then go to CONTENT_STANDARDS.md
│
└─ NO → Am I writing code or designing?
         ├─ YES → Read TECHNICAL_STANDARDS.md
         │        Check COMPONENT_INTERFACES.md
         │
         └─ NO → What are you doing?
                  STOP and ASK Scott
```

---

## 🚨 PROTECTION RULES (NEVER VIOLATE)

### Rule #1: No Scripts

```
❌ NEVER run scripts that modify files without approval
❌ NEVER bulk-update anything automatically
✅ ALWAYS explain what a script will do in detail
✅ ALWAYS explicitly state "this is a script"
✅ ALWAYS wait for Scott's approval before executing
```

**Example of what NOT to do:**
```bash
# ❌ DON'T DO THIS:
for file in app/reviews/*/page.tsx; do
  sed -i 's/old/new/g' "$file"
done
```

**What to do instead:**
1. Show Scott the script
2. Explain what it will change
3. Test on ONE file first
4. Get explicit approval: "Run it on all files"
5. THEN execute

---

### Rule #2: No Changes Without Approval

```
❌ NEVER make changes based on what you think is best
❌ NEVER update anything on your own initiative
✅ ALWAYS get explicit approval before ANY change
✅ ALWAYS explain WHAT you want to change and WHY
✅ ALWAYS wait for Scott's green light
```

**Nothing changes without Scott's explicit approval.**

**Example conversation:**
- ❌ "I updated the colors to improve accessibility"
- ✅ "I found that orange-600 fails WCAG contrast. Should I change links to orange-700?"

---

### Rule #3: Quality Over Speed

```
✅ ALWAYS be thorough - no shortcuts, no corners cut
✅ ALWAYS be methodical - systematic execution
⏰ Time is NOT a concern - do it right, not fast
💬 Tokens are NOT a concern - use as many as needed
🧪 ALWAYS test build before pushing to production
```

**Every. Single. Time.**

---

## 🚩 RED FLAGS: Stop Immediately If You See

### Critical Errors (Stop & Ask)

- [ ] **Credentials wrong:** Anything other than "24 years of professional kitchen experience"
- [ ] **Kitchen Manager years wrong:** It's 4 years total, NOT 24 years, NOT 7 years
- [ ] **Purple Café years wrong:** It's 6 years (2007-2012), NOT 18 years
- [ ] **Restaurant not approved:** Restaurant mentioned not in approved list
- [ ] **Script modifying files:** Any script that changes multiple files
- [ ] **Lighthouse score drops:** Below 90 on any metric
- [ ] **Build fails:** TypeScript errors or build errors

### Component Errors (Common AI Mistakes)

- [ ] **CTAVisibilityTracker props wrong:** Using `ctaPosition` instead of `position`
- [ ] **CTAVisibilityTracker extra props:** Passing `ctaText`, `ctaType`, `destinationUrl` (don't exist)
- [ ] **Text links wrong color:** Using `text-orange-600` instead of `text-orange-700`
- [ ] **Star ratings wrong color:** Using `text-yellow-400` instead of `text-amber-700`
- [ ] **Heading hierarchy broken:** Skipping from h1 to h3 (must be sequential)
- [ ] **Multiple h1 tags:** Only ONE h1 per page

### Content Errors

- [ ] **Forbidden phrases:** "Let's dive in", "game-changer", "revolutionary", "amazing"
- [ ] **Generic authority:** "Many chefs agree", "experts recommend", "studies show"
- [ ] **Pricing violations:** Specific prices mentioned ("$49.99", "costs $50")
- [ ] **Price comparisons:** "cheaper than", "best value", "budget-friendly"
- [ ] **Wrong CTA text:** Anything other than "Check Price on Amazon"
- [ ] **Wrong Amazon tag:** Any tag other than `chefapprovedt-20`

**If you see ANY red flag: STOP → ASK → WAIT**

---

## 🎓 Common AI Mistakes (Learn From These)

### Mistake #1: CTAVisibilityTracker Props

**❌ Desktop Claude keeps doing this:**
```tsx
<CTAVisibilityTracker
  ctaPosition="where_to_buy"    // WRONG! Prop is "position"
  ctaText="View on Amazon"      // WRONG! Prop doesn't exist
  ctaType="button"              // WRONG! Prop doesn't exist
  destinationUrl={url}          // WRONG! Prop doesn't exist
>
```

**✅ CORRECT:**
```tsx
<CTAVisibilityTracker
  ctaId="where-to-buy-cta"
  position="where_to_buy"       // Use "position" NOT "ctaPosition"!
  productSlug={slug}
>
  <a href={affiliateUrl}>View on Amazon →</a>
</CTAVisibilityTracker>
```

**Why this matters:** This component TRACKS the CTA, it doesn't render it. The actual CTA is the child element.

**Valid position values:** 'above_fold', 'mid_article', 'final_cta', 'comparison_table', 'related_products', 'sidebar', 'category_grid', 'where_to_buy', 'model_notice', or custom string.

---

### Mistake #2: Kitchen Manager Years

**❌ Wrong:**
- "Scott has been a Kitchen Manager for 24 years"
- "After 24 years as Kitchen Manager..."
- "24 years of Kitchen Manager experience"

**✅ Correct:**
- "Scott has 24 years of professional kitchen experience"
- "Scott has 4 years of Kitchen Manager experience"
- "After 6 years at Purple Café..."

**The facts:**
- 24 years = Total professional kitchen experience
- 4 years = Total Kitchen Manager experience (Mellow Mushroom 3 years + Il Pizzaiolo 1 year)
- 6 years = Time at Purple Café (2007-2012)

---

### Mistake #3: Pricing Content

**❌ NEVER include:**
```tsx
"At roughly the same price as two lattes"
"The budget-friendly option"
```

**✅ ALWAYS use instead:**
```tsx
"Lasted 18 years of continuous professional use"
"Still performing like new after 6 years"
"Professional-grade construction means decades of use"
"No replacement parts needed in 10 years"
```

**Why:** Affiliate links show prices. Specific price mentions go stale, create anchoring issues, and may violate Amazon TOS.

**Exception:** Durable goods can discuss longevity/ROI. Consumables (salt, spices) cannot (they get used up).

---

### Mistake #4: Wrong Link Colors

**❌ Wrong:**
```tsx
className="text-orange-600"  // Fails WCAG AA contrast
className="text-yellow-400"  // Fails WCAG AA contrast (for stars)
```

**✅ Correct:**
```tsx
className="text-orange-700"  // Passes WCAG AA (4.6:1 contrast)
className="text-amber-700"   // Passes WCAG AA (for star ratings)
```

**Why:** Accessibility compliance. Orange-600 and yellow-400 don't have enough contrast against white backgrounds.

---

### Mistake #5: TestingEnvironment as null

**❌ Wrong:**
```typescript
testingEnvironment: null
```

**✅ Correct:**
```typescript
testingEnvironment: []  // Empty array, not null
```

**Why:** Component expects an array, not null. TypeScript will error on null.

---

## 📋 Protected Credentials (Never Change)

### Primary Credential (Use Everywhere)

```
"24 years of professional kitchen experience"
```

**NEVER say:**
- ❌ "20 years"
- ❌ "25 years"  
- ❌ "45 years professional"
- ❌ "Kitchen Manager for 24 years"

---

### Restaurant References (Priority Order)

**1. Purple Café (PRIMARY - Use Most Often)**
- Years: 2007-2012 (6 years)
- Roles: Line Cook (2007-2008), Pizzaiolo (2008-2012)
- Location: Seattle, WA
- Use for: Pizza, high-volume service, durability testing

**2. Mellow Mushroom (Secondary)**
- Years: 1992-1994 (3 years, NOT 7)
- Role: Kitchen Manager
- Location: Athens, GA
- Use for: Management stories, training examples

**3. Feierabend (Secondary)**
- Years: 2006-2010 (4 years)
- Role: Line Cook, Shift Lead
- Location: Seattle, WA
- Use for: German cuisine, high-volume service

**4. Il Pizzaiolo (Secondary)**
- Years: 2014-2015 (~1 year)
- Role: Kitchen Manager
- Location: Rocklin, CA
- Use for: Pizza-specific stories

**5. Paragary's (Use Sparingly)**
- Years: 2013 (1 year)
- Role: Line Cook
- Location: Sacramento, CA
- Use for: Brief references only

**NEVER mention:** Wendy's, Jovan Gourmet, Dairy Queen, Steverino's, Red Door, Corti Bros., Calicraft

---

### Education

**Culinary:**
- A.A.S. Culinary Arts
- Seattle Central College (2007)
- Also known as: Seattle Culinary Academy, Seattle Central Community College

**Business:**
- B.S. Business Administration (Marketing Emphasis)
- University of Montana (1997)

---

### Amazon Affiliate Tag (Never Change)

```
chefapprovedt-20
```

**Link format:**
```
https://amazon.com/dp/[ASIN]?tag=chefapprovedt-20
```

---

### CTA Text (Never Change)

```
"Check Price on Amazon"
```

**NEVER say:**
- ❌ "Buy on Amazon"
- ❌ "Purchase"
- ❌ "Shop on Amazon"
- ❌ "View Price"

**Exception:** Only if Scott explicitly approves different text for specific context.

---

## 📚 Document Reference Guide

### The 4 Core Documents

**1. VOICE_AND_CREDENTIALS.md** (800 lines)
**The single source of truth for identity**
- Scott's credentials (24 years, 4 years Kitchen Manager, 6 years Purple Café)
- Restaurant references and timeline
- Voice guidelines and examples (what to say, what NOT to say)
- Tier system (professional, long-term, expert evaluation)
- Author bio templates
- Pricing rules

**When to read:** ALWAYS before creating ANY content (reviews, blogs, emails)

---

**2. CONTENT_STANDARDS.md** (1,400 lines)
**All content creation standards**

**Part 1: Content Strategy**
- Encyclopedia vs Friend philosophy
- Website = SEO content
- Email = conversion content
- 7 Content Mantras

**Part 2: Review Page System**
- Component order (must follow exactly)
- Review page structure
- Testing results, performance analysis
- Pros/cons, who should buy, FAQ
- Comparison tables

**Part 3: Blog Post System**
- Pattern A: X vs Y comparisons (data-driven)
- Pattern B: Educational content (inline)
- Decision tree for which pattern

**Part 4: SEO Standards**
- Title tag format (<60 chars, <80% similar. optimize for CTR)
- Meta description format (150-160 chars, <80% similar, optimize for CTR)
- Character encoding (apostrophes, quotes)
- Schema markup requirements
- Image alt text

**When to read:** Before creating reviews, blogs, or any web content

---

**3. TECHNICAL_STANDARDS.md** (1,000 lines)
**All code, design, and architecture standards**

**Part 1: Design System**
- Color palette (orange-600, orange-700, amber-700)
- Typography and spacing
- Button styles
- Container widths

**Part 2: Accessibility Requirements**
- Text link colors (orange-700, not orange-600)
- Star rating colors (amber-700, not yellow-400)
- Heading hierarchy (h1 → h2 → h3, sequential)
- Focus states

**Part 3: Code Architecture**
- Tech stack (Next.js 14, TypeScript, Tailwind, Supabase)
- File structure
- ISR caching patterns
- Component patterns

**Part 4: Performance Standards**
- Lighthouse targets (Desktop 100, Mobile 80+)
- LCP <2.5s
- Image optimization
- Tracking & analytics (GTM setup)

**When to read:** Before any code changes, UI work, or technical implementation

---

**4. COMPONENT_INTERFACES.md** (400 lines)
**TypeScript interfaces and AI error prevention**

- Exact TypeScript interfaces for all components
- Common AI mistakes (CTAVisibilityTracker!)
- Pricing rules (detailed)
- Migration checklist
- Props that don't exist (what NOT to pass)

**When to read:** Before generating review data files or creating components

---

### The 3 Implementation Guides

**5. COMPARISON_TABLE_GUIDE.md** (1,450 lines)
**Complete comparison table reference**

- Part 1: Overview & Strategy
- Part 2: Component Technical Specs
- Part 3: Research & Data Collection (3 hours)
- Part 4: Implementation Process (10 steps)
- Part 5: Batch Processing Workflow
- Part 6: Category Examples (blenders, knives, Dutch ovens, mixers, cast iron)

**When to read:** Before implementing comparison tables on review pages

---

**6. MIGRATION_PROCESSES.md** (Coming soon)
**How to migrate old content to new system**

- Review page migrations
- Blog post migrations
- Component update procedures
- Deprecation process

**When to read:** When migrating old reviews or updating component patterns

---

**7. [Future: Additional implementation guides as needed]**

---

## 🎯 Quick Decision Framework

### "Which document do I need?"

```
Creating a product review?
└─> Read VOICE_AND_CREDENTIALS.md (always first)
    └─> Then CONTENT_STANDARDS.md - Part 2
        └─> Check COMPONENT_INTERFACES.md for props
            └─> Need comparison table? COMPARISON_TABLE_GUIDE.md

Creating a blog post?
└─> Read VOICE_AND_CREDENTIALS.md (always first)
    └─> Then CONTENT_STANDARDS.md - Part 3
        └─> Is it X vs Y? Pattern A. Educational? Pattern B.

Writing code or designing?
└─> Read TECHNICAL_STANDARDS.md
    └─> Check COMPONENT_INTERFACES.md for TypeScript
        └─> Test locally before pushing

Creating an email?
└─> Read VOICE_AND_CREDENTIALS.md (always first)
    └─> Then CONTENT_STANDARDS.md - Part 1
```

---

### "Should I make this change?"

```
Is it fixing a bug?
├─ YES → Explain bug, propose fix, get approval
└─ NO → Is it required for functionality?
        ├─ YES → Explain why required, get approval
        └─ NO → DON'T DO IT (it's "improvement" not necessity)
```

**Remember:** Preserve functionality over "improvements."

---

### "Should I run this script?"

```
Does the script modify files?
├─ YES → STOP. Show Scott. Explain. Get approval. Test on one file first.
└─ NO → Does it just read/analyze?
        ├─ YES → Probably OK, but explain what it does first
        └─ NO → What does it do? Explain first.
```

**Default answer: NO scripts without approval.**

---

## 🧩 Component Inventory & Usage Guide

**Purpose:** Clarify what components EXIST (just import) vs what needs DATA (generate content)

### Self-Contained Components (Just Import - No Data Needed)

These components are complete. **Just import and use. DO NOT generate content for them.**

#### Review Pages

**`<AuthorBio />`**
- Pre-built with Scott's complete bio
- Located at: `/components/AuthorBio.tsx`
- **What AI does:** Import it, don't generate bio text
- **Never pass:** name, credentials, or bio content as props

**`<Breadcrumb />`**
- Auto-generates breadcrumb navigation from URL structure
- **What AI does:** Just import and use
- **Never pass:** paths or navigation data

**`<Dates />`**
- Displays formatted dates (added/updated)
- **What AI does:** Pass dateAdded and lastUpdated from product data
- Takes data from product metadata, formats automatically

#### Blog Pages

**`<BlogAuthorBio />`**
- Pre-built with Scott's complete bio (blog version)
- Located at: `/components/blog/BlogAuthorBio.tsx`
- **What AI does:** Import it, don't generate bio text
- **Never pass:** name, credentials, or bio content as props

**`<BlogLayout />`**
- Wrapper component that provides blog page structure
- **What AI does:** Import and wrap content
- Pass: metadata (title, description, etc.)

---

### Data-Hungry Components (AI Generates Content)

These components **need data from AI**. Generate content following voice/credential standards.

#### Review Pages - AI Must Create Data For:

**`<ReviewHero />`**
- **Needs:** title, authorName, authorCredentials, rating, tierBadge, verdict, verdictStrong
- **What AI does:** Generate title, verdict statements, rating based on testing
- See COMPONENT_INTERFACES.md for exact structure

**`<TestingResultsGrid />`**
- **Needs:** testingEnvironment array, outstandingPerformance, minorConsiderations
- **What AI does:** Create testing details from review data
- Must populate sections and testing environment

**`<PerformanceAnalysis />`**
- **Needs:** sections array with title and content
- **What AI does:** Write analysis sections based on testing
- Can use inline `<LINK>` tags for affiliate links

**`<ProsConsGrid />`**
- **Needs:** pros and cons arrays (strings)
- **What AI does:** Generate honest pros and cons from testing

**`<WhoShouldBuyGrid />`**
- **Needs:** perfectFor and considerAlternatives arrays
- **What AI does:** Create recommendation lists

**`<FAQSection />`**
- **Needs:** faqs array with question/answer pairs
- **What AI does:** Generate relevant FAQs for product

**`<EmailCaptureSection />`**
- **Needs:** title, subtitle, finePrint
- **What AI does:** Create email signup copy (put all benefits in subtitle)

**`<BottomLineSection />`**
- **Needs:** paragraphs array (plain strings, not JSX)
- **What AI does:** Write final verdict paragraphs

**`<RelatedProductsGrid />`**
- **Needs:** products array with name, description, emoji, href
- **What AI does:** Select and describe related products

#### Blog Pages - AI Must Create Data For:

**`<BlogHero />`**
- **Needs:** title, subtitle, heroImage, publishedDate, updatedDate
- **What AI does:** Create compelling title and subtitle

**`<BlogQuickAnswer />`** *(NOT ComparisonSummary!)*
- **Needs:** winner, winnerReasoning (for Pattern A comparisons)
- **What AI does:** Determine winner and explain reasoning

**`<ComparisonTable />`**
- **Needs:** products array, comparisonRows, highlightedProduct
- **What AI does:** Build comparison data structure
- See COMPARISON_TABLE_GUIDE.md for structure

**`<DetailedAnalysis />` or inline content**
- **Needs:** Analysis sections with professional observations
- **What AI does:** Write detailed comparison analysis

**`<BlogEmailCapture />`**
- **Needs:** title, subtitle
- **What AI does:** Create email capture copy for blog context

**`<FinalVerdict />`**
- **Needs:** recommendation, buyProductA, buyProductB (for Pattern A)
- **What AI does:** Write final recommendations

---

### Decision Tree: "Do I Need to Create Content?"

```
Is this component in the "Self-Contained" list above?
├─ YES → Just import it, don't generate content
│         Examples: AuthorBio, BlogAuthorBio, Breadcrumb
│
└─ NO → Is it in the "Data-Hungry" list?
    ├─ YES → Generate content per VOICE_AND_CREDENTIALS.md standards
    │         Examples: ReviewHero, TestingResultsGrid, FAQSection
    │
    └─ NO → Check COMPONENT_INTERFACES.md for details
            or ASK if unsure
```

---

### Common Mistakes with Components

**❌ WRONG: Generating bio text for AuthorBio**
```typescript
// DON'T DO THIS
const bioText = "Scott Bradley has 24 years..."
<AuthorBio text={bioText} />  // Component doesn't take text prop!
```

**✅ CORRECT: Just import and use**
```typescript
import AuthorBio from '@/components/AuthorBio'

// In your JSX:
<AuthorBio />  // That's it! No props needed.
```

---

**❌ WRONG: Forgetting to create data for ReviewHero**
```typescript
<ReviewHero />  // Missing all required data!
```

**✅ CORRECT: Generate the data**
```typescript
<ReviewHero
  title={reviewData.title}
  rating={reviewData.expertRating}
  verdict={reviewData.verdict}
  // ... all required props
/>
```

---

### Quick Reference Card

**Self-Contained (Import Only):**
- AuthorBio ✅
- BlogAuthorBio ✅
- Breadcrumb ✅
- BlogLayout ✅ (needs metadata)

**Data-Hungry (Create Content):**
- ReviewHero ⚠️
- TestingResultsGrid ⚠️
- PerformanceAnalysis ⚠️
- ProsConsGrid ⚠️
- WhoShouldBuyGrid ⚠️
- FAQSection ⚠️
- EmailCaptureSection ⚠️
- BottomLineSection ⚠️
- RelatedProductsGrid ⚠️
- BlogHero ⚠️
- BlogQuickAnswer ⚠️
- ComparisonTable ⚠️
- FinalVerdict ⚠️

**When in doubt:** Check COMPONENT_INTERFACES.md or ASK.

---

## 📊 Content Type Decision Matrix

**Purpose:** Clarify which voice rules apply to what you're creating

### Quick Decision Tree

```
What are you creating?
│
├─ Product Review Page?
│   ├─ Voice: Encyclopedia (professional observations, no personal stories)
│   ├─ Restaurant names: ❌ NO (use "professional kitchens" instead)
│   ├─ Personal anecdotes: ❌ NO (save for emails)
│   ├─ Family mentions: ❌ NO
│   ├─ Components: AuthorBio (self-contained), data for ReviewHero/TestingResults/etc.
│   └─ Reference: CONTENT_STANDARDS.md Part 2
│
├─ Blog Post (Pattern A or B)?
│   ├─ Voice: Encyclopedia (professional observations, no personal stories)
│   ├─ Restaurant names: ❌ NO (use "commercial settings" instead)
│   ├─ Personal anecdotes: ❌ NO (save for emails)
│   ├─ Family mentions: ❌ NO
│   ├─ Components: BlogAuthorBio (self-contained), data for BlogHero/content/etc.
│   └─ Reference: CONTENT_STANDARDS.md Part 3
│
├─ Email to Subscribers?
│   ├─ Voice: Friend (personal stories encouraged!)
│   ├─ Restaurant names: ✅ YES (Purple Café, Mellow Mushroom, etc.)
│   ├─ Personal anecdotes: ✅ YES ("Let me tell you about...")
│   ├─ Family mentions: ✅ YES (when relevant)
│   ├─ Home kitchen: ✅ YES ("In my kitchen...")
│   ├─ Personal recommendations: ✅ YES ("This is what I use")
│   └─ Reference: CONTENT_STANDARDS.md Part 5
│
└─ Category/Landing Page?
    ├─ Voice: Encyclopedia (comprehensive, educational)
    ├─ Restaurant names: ❌ NO
    ├─ Personal anecdotes: ❌ NO
    └─ Reference: CONTENT_STANDARDS.md Part 1
```

### Voice Comparison Chart

| Element | Reviews | Blogs | Emails |
|---------|---------|-------|--------|
| **Voice Type** | Encyclopedia | Encyclopedia | Friend |
| **Personal Stories** | ❌ No | ❌ No | ✅ Yes |
| **Restaurant Names** | ❌ No | ❌ No | ✅ Yes |
| **"I/My" Language** | ⚠️ Minimal | ⚠️ Minimal | ✅ Frequent |
| **Family Mentions** | ❌ No | ❌ No | ✅ Yes |
| **Credential** | ✅ 24 years | ✅ 24 years | ✅ 24 years |
| **Professional Context** | ✅ Generic | ✅ Generic | ✅ Specific |

### Common Mistakes by Content Type

**REVIEW PAGES - Common Mistakes:**
- ❌ Including "At Purple Café, I used this..." → Use "In commercial kitchens..."
- ❌ "My family loves this" → Use test results instead
- ❌ "I personally bought this" → Use professional testing context

**BLOG POSTS - Common Mistakes:**
- ❌ "When I worked at Mellow Mushroom..." → Use "In professional settings..."
- ❌ "My personal journey with knives" → Use professional observations
- ❌ "In my home kitchen" → Use generic professional context

**EMAILS - Common Mistakes:**
- ❌ Being too formal (defeats the purpose)
- ❌ Not using personal stories (should be story-driven!)
- ❌ Avoiding restaurant names (they're allowed in emails!)

### When In Doubt

**Ask yourself:**
1. Is this PUBLIC content for Google? → Use Encyclopedia voice (no personal stories)
2. Is this PRIVATE content for subscribers? → Use Friend voice (personal stories OK)

**Default to Encyclopedia voice if unsure** - you can always be more personal in emails later.

---

## ✅ Pre-Deployment Checklist

**Before deploying ANYTHING to production:**

### Build & Code Quality
- [ ] `npm run build` succeeds with no errors
- [ ] `npm run type-check` passes (no TypeScript errors)
- [ ] No console errors in browser
- [ ] Code follows existing patterns in file

### Content Quality  
- [ ] Credentials correct ("24 years professional", not "Kitchen Manager for 24 years")
- [ ] Restaurant references approved (Purple Café preferred)
- [ ] Voice matches guidelines (no "let's dive in", "game-changer", etc.)
- [ ] No pricing violations
- [ ] CTA text: "Check Price on Amazon"

### Technical Standards
- [ ] All images have descriptive alt text
- [ ] All images use `quality={75}`
- [ ] Text links use `text-orange-700` (not orange-600)
- [ ] Star ratings use `text-amber-700` (not yellow-400)
- [ ] Heading hierarchy correct (h1 → h2 → h3, no skipping)
- [ ] Only ONE h1 tag per page
- [ ] All affiliate links include `?tag=chefapprovedt-20`

### SEO & Accessibility
- [ ] Title tag <60 characters
- [ ] Meta description 150-160 characters
- [ ] Both <80% similar to other pages
- [ ] Canonical URL correct
- [ ] Dates present (published/updated) in visible HTML
- [ ] Breadcrumbs included with schema
- [ ] Schema markup validates (Google Rich Results Test)
- [ ] All special characters properly escaped (no straight apostrophes in metadata)

### Component Usage
- [ ] CTAVisibilityTracker uses `position` prop (not `ctaPosition`)
- [ ] CTAVisibilityTracker doesn't have invalid props (ctaText, ctaType, etc.)
- [ ] testingEnvironment is array `[]` not `null`
- [ ] All component props match interfaces in COMPONENT_INTERFACES.md
- [ ] AuthorBio component included
- [ ] Comparison table included (if applicable)

### Performance
- [ ] Lighthouse score: Desktop 95, Mobile 80+
- [ ] LCP <2.5s
- [ ] No layout shift (CLS <0.1)
- [ ] Mobile responsive (test at 375px width)

### Final Verification
- [ ] Tested locally on desktop
- [ ] Tested locally on mobile
- [ ] All links work (internal and affiliate)
- [ ] Build succeeds
- [ ] Ready to push to production

---

## 📊 Success Metrics (Don't Break These)

**Current Baseline (November 2025):**

- ✅ 125 pages indexed in Google
- ✅ Lighthouse: Desktop 100, Mobile 80+ Performance
- ✅ LCP <2.5s
- ✅ Zero hardcoded affiliate links
- ✅ Amazon tag: chefapprovedt-20 on all pages
- ✅ Dynamic Supabase integration
- ✅ All schema markup validates
- ✅ Analytics tracking functional
- ✅ Component system established
- ✅ AuthorBio on all pages
- ✅ Dates on all pages
- ✅ Accessibility compliant (WCAG AA)

**If ANY metric declines after your changes:**
1. STOP immediately
2. Investigate what changed
3. Notify Scott
4. Prepare rollback plan (git revert)
5. Document root cause
6. Update documentation to prevent recurrence

---

## 🎯 Common Scenarios: What to Do

### Scenario 1: "I need to create a product review"

**Your path:**
1. ✅ Read [VOICE_AND_CREDENTIALS.md] (if not already familiar)
2. ✅ Read [CONTENT_STANDARDS.md - Part 2: Review System]
3. ✅ Check [COMPONENT_INTERFACES.md] for exact prop interfaces
4. ✅ Follow component order exactly (no reordering)
5. ✅ Use [VOICE_AND_CREDENTIALS.md] for credentials in content
6. ✅ Add comparison table if product has competitors ([COMPARISON_TABLE_GUIDE.md])
7. ✅ Run pre-deployment checklist (above)
8. ✅ Get Scott's approval before pushing

---

### Scenario 2: "I need to create a blog post"

**Your path:**
1. ✅ Determine type: Is it X vs Y comparison or educational content?
2. ✅ Read [VOICE_AND_CREDENTIALS.md] (if not already familiar)
3. ✅ Read [CONTENT_STANDARDS.md - Part 3: Blog System]
4. ✅ Follow Pattern A (X vs Y) or Pattern B (educational)
5. ✅ Use [VOICE_AND_CREDENTIALS.md] for Scott's voice
6. ✅ Run pre-deployment checklist
7. ✅ Get Scott's approval before pushing

---

### Scenario 3: "I need to change a component style"

**Your path:**
1. ✅ Read [TECHNICAL_STANDARDS.md - Part 1: Design System]
2. ✅ Verify color/style exists in design system
3. ✅ Check [TECHNICAL_STANDARDS.md - Part 2: Accessibility]
4. ✅ Explain to Scott: WHAT you want to change and WHY
5. ✅ WAIT for approval
6. ✅ Make change after approval
7. ✅ Test locally (multiple breakpoints)
8. ✅ Run Lighthouse (verify no regression)
9. ✅ Push to production

---

### Scenario 4: "I found an error in credentials or voice"

**Your path:**
1. ✅ Check [VOICE_AND_CREDENTIALS.md] - Is it actually wrong?
2. ✅ If YES: Show Scott the error
3. ✅ Propose fix with exact wording
4. ✅ WAIT for approval
5. ✅ After approval, fix the specific error
6. ✅ DO NOT "fix" other things while you're there
7. ✅ Commit with clear message: "Fix credential error: [specific issue]"

---

### Scenario 5: "I want to improve something"

**Your path:**
1. ⚠️ STOP - Is this necessary or just "nice to have"?
2. ⚠️ If "nice to have" → DON'T DO IT (preserve functionality)
3. ⚠️ If necessary → Explain to Scott WHY it's necessary
4. ⚠️ WAIT for approval
5. ✅ Only proceed after explicit approval

**Remember:** Preserve functionality over "improvements."

---

### Scenario 6: "Something is unclear or confusing"

**Your path:**
1. ✅ STOP - Don't guess or assume
2. ✅ Search relevant documentation
3. ✅ Still unclear? ASK Scott explicitly
4. ✅ WAIT for clarification
5. ✅ Proceed after you understand
6. ✅ Suggest documentation update to prevent future confusion

**Never proceed with uncertainty.**

---

### Scenario 7: "I want to write a script to update multiple files"

**Your path:**
1. 🚨 STOP - This requires special approval
2. 🚨 Write the script
3. 🚨 Explain to Scott: WHAT it will change, WHY, and HOW
4. 🚨 Show the script code
5. 🚨 WAIT for approval
6. 🚨 Test on ONE file first (with Scott's approval)
7. 🚨 If test succeeds, ask: "Run on remaining files?"
8. 🚨 Only run on all files after explicit approval

**Scripts are high-risk. Extra caution required.**

---

## 🆘 Emergency Procedures

### If You Break Something

**Immediate actions:**

1. **STOP** - Don't try to fix it yourself (might make it worse)
2. **DOCUMENT** - What changed? What broke? What error messages?
3. **NOTIFY** - Tell Scott immediately with details
4. **ROLLBACK** - Provide git revert instructions:
   ```bash
   git log --oneline -10  # Find commit hash
   git revert [hash]      # Revert the bad commit
   ```
5. **ROOT CAUSE** - Explain what went wrong and why
6. **PREVENT** - Update this documentation with new prevention rule

---

### If Build Fails

**Debug steps:**

1. Check error message in terminal
2. Common causes:
   - TypeScript errors (missing props, wrong types)
   - Missing imports
   - Invalid component usage
   - Syntax errors
3. Fix the specific error
4. Run `npm run build` again
5. If still failing, show Scott the error message

---

### If Lighthouse Score Drops

**Investigation steps:**

1. Compare before/after scores (what metric changed?)
2. Common causes:
   - Images not optimized
   - New code added without lazy loading
   - CSS/JS bundle size increased
   - Layout shift introduced
3. Fix the specific issue
4. Re-run Lighthouse
5. Must be back to baseline before deploying

---

### If You're Not Sure What Went Wrong

**Safe approach:**

1. STOP making changes
2. Document what you did (step by step)
3. Show Scott the sequence of events
4. Ask: "What should I do?"
5. WAIT for guidance

**Don't dig the hole deeper.**

---

## 💡 Pro Tips for Working Effectively

### Tip #1: Read Documents BEFORE Starting

**Why:** Saves time. Better to spend 15 minutes reading than 2 hours fixing errors.

**How:**
- Creating content? Read VOICE_AND_CREDENTIALS.md first (every time)
- Making components? Read COMPONENT_INTERFACES.md first
- Changing design? Read TECHNICAL_STANDARDS.md first

---

### Tip #2: Test Locally Before Pushing

**Why:** Catch errors before they reach production.

**How:**
```bash
npm run dev          # Test functionality
npm run build        # Test that build succeeds
npm run type-check   # Test TypeScript
```

**Never push without testing locally.**

---

### Tip #3: Small Commits Are Better

**Why:** Easier to revert if something breaks.

**How:**
- One logical change per commit
- Clear commit message explaining WHAT and WHY
- Test after each commit

**Example:**
```bash
git add app/reviews/vitamix-5200/page.tsx
git commit -m "Add comparison table to Vitamix 5200 review

- Research completed November 10, 2025
- 4 products compared
- Sources: ATK, Consumer Reports, personal experience"
```

---

### Tip #4: Use the Checklists

**Why:** Nothing gets forgotten. Consistent quality.

**How:**
- Copy pre-deployment checklist
- Check each item before pushing
- Don't skip items

---

### Tip #5: When In Doubt, Ask

**Why:** Better to ask than to break things. Scott would rather answer questions than fix errors.

**How:**
- Clear question: "Should I change X to Y because Z?"
- Provide context
- Wait for answer
- Don't proceed with uncertainty

---

## 🎯 The 10 Commandments

```
1. Read VOICE_AND_CREDENTIALS.md before ANY content creation
2. No scripts without approval (EACH TIME)
3. No changes without approval (EACH TIME)
4. Quality over speed (ALWAYS)
5. Test locally before pushing (EVERY TIME)
6. Follow component order exactly (NO REORDERING)
7. Use orange-700 for links, amber-700 for stars (ACCESSIBILITY)
8. Only ONE h1 per page (SEO)
9. Check Price on Amazon (CTA TEXT)
10. When in doubt, STOP and ASK
```

---

## 📞 Final Reminders

### This Project Matters

- 400+ hours of work
- Scott's path to financial independence
- Real revenue impact
- Every detail counts

### Preserve Functionality

- "Improvements" can break things
- Existing code works (don't fix what isn't broken)
- When in doubt, don't change it

### You Are Part of a Team

- Kitchen Scotty: Operations and strategy
- Phone Claude: Research
- VSCode Claude: Code implementation
- Web Claude: Batch processing
- Desktop Claude (you?): Content creation and reviews

**We win together. One mistake affects the whole team.**

---

## ✅ Ready to Start?

**Before you begin ANY work:**

- [ ] I've read this START_HERE.md file completely
- [ ] I understand the 3 rules (no scripts, no changes, quality over speed)
- [ ] I know which document(s) I need to read next
- [ ] I know what red flags to watch for
- [ ] I understand the common AI mistakes
- [ ] I have the pre-deployment checklist
- [ ] I'm ready to ASK if anything is unclear

**If all boxes checked: Proceed to your task-specific documentation.**

**If any box unchecked: Re-read this document.**

---

## 📚 Document Map (At a Glance)

```
START_HERE.md (you are here)
    ↓
    ├── Creating Content?
    │   └── VOICE_AND_CREDENTIALS.md (ALWAYS READ FIRST)
    │       └── CONTENT_STANDARDS.md
    │           ├── Part 1: Content Strategy
    │           ├── Part 2: Review Pages
    │           ├── Part 3: Blog Posts
    │           └── Part 4: SEO Standards
    │
    ├── Coding/Design?
    │   └── TECHNICAL_STANDARDS.md
    │       ├── Part 1: Design System
    │       ├── Part 2: Accessibility
    │       ├── Part 3: Architecture
    │       └── Part 4: Performance
    │
    └── Implementation Guides (as needed)
        ├── COMPONENT_INTERFACES.md (TypeScript interfaces)
        ├── COMPARISON_TABLE_GUIDE.md (comparison tables)
        └── MIGRATION_PROCESSES.md (coming soon)
```

---

**Remember: Better to ask than to break 400 hours of work.**

**When in doubt: STOP and ASK.**

---

*Last Updated: November 12, 2025*  
*This is your entry point. Read it every session.*  
*All other documentation links from here.*
