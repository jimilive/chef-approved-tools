# Documentation Organization

This directory contains all project documentation organized by purpose and status.

## Directory Structure

### 📁 `/active` - Current Working Documentation
Documents you'll reference regularly while working on the site.

- `BRAND_GUIDE.md` - Brand voice, tone, and style guidelines
- `DEVELOPMENT_WORKFLOW.md` - How to develop and deploy changes
- `REVIEW_TEMPLATE.md` - Template for creating new product reviews
- `THREE_TIER_SYSTEM.md` - Explanation of the 3-tier review system
- `APPROVED_AFFILIATES.md` - List of approved affiliate programs
- `PRODUCT_REVIEW_ROADMAP.md` - Planned reviews and content strategy
- `REVIEWS_TO_WRITE.md` - Queue of reviews to create
- `BLOG_ARTICLES_TO_WRITE.md` - Blog post ideas and topics

**When to use:** Daily development, writing new content, onboarding contributors

---

### 🔧 `/setup` - One-Time Setup Guides
Instructions for configuring services and tools. Reference when setting up new environments or services.

- `ENV_VARIABLES_TEMPLATE.md` - Required environment variables
- `VERCEL_DEPLOYMENT_STEPS.md` - How to deploy to Vercel
- `VERCEL_CONFIG_SUMMARY.md` - Vercel configuration explained
- `GOOGLE_SEARCH_CONSOLE_SETUP.md` - GSC integration steps
- `PA-API-SETUP.md` - Amazon Product Advertising API setup

**When to use:** New developer onboarding, service configuration, troubleshooting deploys

---

### 📊 `/optimization` - SEO & Conversion Docs
Documents related to search engine optimization, conversion tracking, and monetization.

- `INDEXING_GUIDE.md` - Google indexing strategies
- `INDEXING_PROGRESS.md` - Current indexing status
- `CONVERSION_OPTIMIZATION.md` - CTA and conversion strategies
- `MONETIZATION_IMPROVEMENTS.md` - Revenue optimization ideas
- `AMAZON_AFFILIATE_AUDIT.md` - Affiliate link tracking and performance

**When to use:** SEO improvements, conversion rate optimization, affiliate link audits

---

### ✍️ `/content` - Content Planning & Templates
Content creation guides, examples, and organizational tools.

- `KITCHENAID_OPTIMIZATION_PROMPT.md` - Example of optimized review structure
- `IMAGE_ORGANIZATION_GUIDE.md` - How to manage and organize images
- `NEW_PAGES_SUMMARY.md` - Recently added pages reference
- `press-outreach-emails.md` - Email templates for PR and outreach

**When to use:** Writing new reviews, organizing images, media outreach

---

### 📋 `/tasks` - Task Tracking
Task lists and TODO tracking.

- `TODO.md` - General project todos and improvements

**When to use:** Planning work, tracking progress on features

---

### 🗄️ `/archive` - Completed & Historical Docs
Historical documentation from completed migrations, audits, and implementations. Kept for reference but not actively maintained.

**Contains:**
- Netlify migration checklist (migrated to Vercel)
- Completed audits (affiliate links, redirects, images)
- Build test results and implementation reports
- One-time setup summaries

**When to use:** Historical reference, understanding past decisions

**Note:** These files are candidates for deletion after 30+ days if not referenced.

---

### 📅 `/phase1` - Phase 1 Launch Content
Original phase 1 launch documentation and content calendar.

- `PHASE1-QUICKSTART.md` - Quick start guide
- `30-day-content-calendar.md` - Content schedule
- `README.md` - Phase 1 overview

---

### 📚 Other Guides (Root of `/docs`)
Standalone guides that don't fit into specific categories:

- `analytics-and-seo-guide.md` - Analytics setup and SEO best practices
- `branding-integration-guide.md` - Brand integration across the site
- `diy-product-photography-guide.md` - Photography tips for product images
- `social-media-for-introverts.md` - Social media strategy
- `three-tier-review-system.md` - Deep dive on tier system
- `AFFILIATE_LINK_CHECKER_SETUP.md` - Automated link checker setup

---

## Quick Reference

### Writing a New Review?
1. Read `/active/REVIEW_TEMPLATE.md`
2. Check `/active/THREE_TIER_SYSTEM.md` for tier guidelines
3. Reference `/content/KITCHENAID_OPTIMIZATION_PROMPT.md` for examples
4. Follow brand voice from `/active/BRAND_GUIDE.md`

### Setting Up Development Environment?
1. Copy variables from `/setup/ENV_VARIABLES_TEMPLATE.md`
2. Follow `/active/DEVELOPMENT_WORKFLOW.md`
3. Deploy using `/setup/VERCEL_DEPLOYMENT_STEPS.md`

### Optimizing SEO or Conversions?
1. Check current status in `/optimization/INDEXING_PROGRESS.md`
2. Follow strategies in `/optimization/INDEXING_GUIDE.md`
3. Review CTAs using `/optimization/CONVERSION_OPTIMIZATION.md`

---

## Maintenance

- **Archive folder:** Review quarterly, delete after 90 days if unused
- **Active docs:** Keep updated with current workflows
- **Setup docs:** Update when configuration changes
- **Content docs:** Archive completed items, keep planning docs current

---

*Last updated: 2025-10-11*
