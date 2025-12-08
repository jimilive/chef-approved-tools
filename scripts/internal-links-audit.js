#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const APP_DIR = path.join(process.cwd(), 'app');
const LIB_DIR = path.join(process.cwd(), 'lib');

// Category hubs
const CATEGORY_HUBS = ['/knives', '/cookware', '/appliances', '/prep-tools', '/moving-stirring', '/cleaning-maintenance'];

// Parse category-config.ts to get related content
function parseCategoryConfig() {
  const configPath = path.join(LIB_DIR, 'category-config.ts');
  const content = fs.readFileSync(configPath, 'utf-8');

  const categories = {};
  const categoryNames = ['knives', 'cookware', 'appliances', 'moving-stirring', 'prep-tools', 'cleaning-maintenance'];

  for (const catName of categoryNames) {
    // Find the category block - handle both quoted and unquoted keys
    let blockStart = content.indexOf(`${catName}:`);
    if (blockStart === -1) {
      blockStart = content.indexOf(`'${catName}':`);
    }
    if (blockStart === -1) continue;

    // Find the next category or end of object
    let blockEnd = content.length;
    for (const nextCat of categoryNames) {
      if (nextCat === catName) continue;
      // Try both quoted and unquoted patterns
      let nextIdx = content.indexOf(`${nextCat}:`, blockStart + 1);
      if (nextIdx === -1) {
        nextIdx = content.indexOf(`'${nextCat}':`, blockStart + 1);
      }
      if (nextIdx !== -1 && nextIdx < blockEnd) {
        blockEnd = nextIdx;
      }
    }

    const block = content.substring(blockStart, blockEnd);

    // Extract relatedGuides
    const guidesMatch = block.match(/relatedGuides:\s*\[([\s\S]*?)\]/);
    const guides = [];
    if (guidesMatch) {
      const hrefMatches = guidesMatch[1].matchAll(/href:\s*['"]([^'"]+)['"]/g);
      for (const m of hrefMatches) {
        guides.push(m[1]);
      }
    }

    // Extract relatedBlogs
    const blogsMatch = block.match(/relatedBlogs:\s*\[([\s\S]*?)\]/);
    const blogs = [];
    if (blogsMatch) {
      const hrefMatches = blogsMatch[1].matchAll(/href:\s*['"]([^'"]+)['"]/g);
      for (const m of hrefMatches) {
        blogs.push(m[1]);
      }
    }

    // Extract supabaseCategory
    const supabaseCatMatch = block.match(/supabaseCategory:\s*['"]([^'"]+)['"]/);
    const supabaseCategory = supabaseCatMatch ? supabaseCatMatch[1] : '';

    categories[catName] = {
      relatedGuides: guides,
      relatedBlogs: blogs,
      supabaseCategory
    };
  }

  return categories;
}

// Get all review slugs
function getAllReviewSlugs() {
  const reviewDir = path.join(APP_DIR, 'reviews');
  return fs.readdirSync(reviewDir).filter(f => {
    const pagePath = path.join(reviewDir, f, 'page.tsx');
    return fs.existsSync(pagePath);
  });
}

// Get all blog slugs
function getAllBlogSlugs() {
  const blogDir = path.join(APP_DIR, 'blog');
  return fs.readdirSync(blogDir).filter(f => {
    const pagePath = path.join(blogDir, f, 'page.tsx');
    return fs.existsSync(pagePath);
  });
}

function extractLinks(content) {
  const links = [];

  // Match various Link patterns
  const patterns = [
    /<Link[^>]*href=["']([^"']+)["'][^>]*>([^<]*)/g,
    /<Link\s+href=["']([^"']+)["']\s*>/g,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const href = match[1];
      const anchor = (match[2] || '').replace(/<[^>]+>/g, '').trim().substring(0, 60);
      if (href.startsWith('/') && !links.find(l => l.href === href)) {
        links.push({ href, anchor: anchor || href });
      }
    }
  }

  return links;
}

function categorizeLink(href) {
  if (href.startsWith('/reviews/')) return 'review';
  if (href.startsWith('/blog/')) return 'blog';
  if (href.startsWith('/guides/')) return 'guide';
  if (CATEGORY_HUBS.includes(href)) return 'category';
  return 'other';
}

function getWordCount(content) {
  const text = content.replace(/<[^>]+>/g, ' ').replace(/\{[^}]+\}/g, ' ');
  const words = text.match(/\b[a-zA-Z]+\b/g) || [];
  return words.length;
}

function analyzeBlogPosts() {
  const blogDir = path.join(APP_DIR, 'blog');
  const slugs = getAllBlogSlugs();
  const results = [];

  for (const slug of slugs) {
    const filePath = path.join(blogDir, slug, 'page.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');
    const links = extractLinks(content);
    const wordCount = getWordCount(content);

    const reviewLinks = links.filter(l => categorizeLink(l.href) === 'review');
    const blogLinks = links.filter(l => categorizeLink(l.href) === 'blog');
    const categoryLinks = links.filter(l => categorizeLink(l.href) === 'category');
    const guideLinks = links.filter(l => categorizeLink(l.href) === 'guide');
    const linksToHubs = links.filter(l => CATEGORY_HUBS.includes(l.href));

    results.push({
      slug,
      wordCount,
      links,
      reviewCount: reviewLinks.length,
      blogCount: blogLinks.length,
      categoryCount: categoryLinks.length,
      guideCount: guideLinks.length,
      missingCategoryHub: linksToHubs.length === 0
    });
  }

  return results;
}

function analyzeReviewPages() {
  const reviewDir = path.join(APP_DIR, 'reviews');
  const slugs = getAllReviewSlugs();
  const results = [];

  for (const slug of slugs) {
    const filePath = path.join(reviewDir, slug, 'page.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');
    const links = extractLinks(content);

    // Determine category from content
    let category = 'unknown';
    const lowerContent = content.toLowerCase();
    if (lowerContent.includes('knife') || lowerContent.includes('cutting tool')) category = 'knives';
    else if (lowerContent.includes('pan') || lowerContent.includes('dutch oven') || lowerContent.includes('skillet') || lowerContent.includes('sheet pan')) category = 'cookware';
    else if (lowerContent.includes('blender') || lowerContent.includes('mixer') || lowerContent.includes('instant pot') || lowerContent.includes('air fryer') || lowerContent.includes('toaster') || lowerContent.includes('food processor')) category = 'appliances';
    else if (lowerContent.includes('peeler') || lowerContent.includes('scraper') || lowerContent.includes('cutting board') || lowerContent.includes('mandoline')) category = 'prep-tools';
    else if (lowerContent.includes('tong') || lowerContent.includes('wooden spoon') || lowerContent.includes('spatula')) category = 'moving-stirring';
    else if (lowerContent.includes('cleaner') || lowerContent.includes('bar mop') || lowerContent.includes('sharpening') || lowerContent.includes('salt') || lowerContent.includes('steel')) category = 'cleaning-maintenance';

    const linksToHubs = links.filter(l => CATEGORY_HUBS.includes(l.href));

    results.push({
      slug,
      category,
      links,
      hubLinks: linksToHubs.map(l => l.href),
      hasHubLink: linksToHubs.length > 0
    });
  }

  return results;
}

// Main execution
console.log('='.repeat(80));
console.log('INTERNAL LINKS AUDIT');
console.log('='.repeat(80));

const categoryConfig = parseCategoryConfig();
const allReviewSlugs = getAllReviewSlugs();
const allBlogSlugs = getAllBlogSlugs();

// PHASE 1.1: Blog Posts
console.log('\n' + '='.repeat(80));
console.log('PHASE 1.1: BLOG POST INTERNAL LINKS INVENTORY');
console.log('='.repeat(80) + '\n');

const blogResults = analyzeBlogPosts();
for (const blog of blogResults) {
  console.log(`Blog: ${blog.slug}`);
  console.log(`Word Count: ~${blog.wordCount}`);
  console.log('Internal Links Found:');
  if (blog.links.length === 0) {
    console.log('  (none)');
  } else {
    for (const link of blog.links.slice(0, 10)) { // Limit to first 10 for readability
      console.log(`  - "${link.anchor}" → ${link.href} | ${categorizeLink(link.href)}`);
    }
    if (blog.links.length > 10) {
      console.log(`  ... and ${blog.links.length - 10} more`);
    }
  }
  console.log(`Links to Reviews: ${blog.reviewCount}`);
  console.log(`Links to Category Pages: ${blog.categoryCount}`);
  console.log(`Links to Other Blogs: ${blog.blogCount}`);
  console.log(`Links to Guides: ${blog.guideCount}`);
  console.log(`MISSING Category Hub Link: ${blog.missingCategoryHub ? 'YES ❌' : 'no ✓'}`);
  console.log('');
}

// PHASE 1.2: Review Pages
console.log('\n' + '='.repeat(80));
console.log('PHASE 1.2: REVIEW PAGE INTERNAL LINKS INVENTORY');
console.log('='.repeat(80) + '\n');

const reviewResults = analyzeReviewPages();
for (const review of reviewResults) {
  console.log(`Review: ${review.slug}`);
  console.log(`Category: ${review.category}`);
  console.log('Internal Links in Body:');
  if (review.links.length === 0) {
    console.log('  (none)');
  } else {
    for (const link of review.links.slice(0, 10)) {
      console.log(`  - "${link.anchor}" → ${link.href}`);
    }
    if (review.links.length > 10) {
      console.log(`  ... and ${review.links.length - 10} more`);
    }
  }
  console.log(`Links BACK to Category Hub: ${review.hasHubLink ? review.hubLinks.join(', ') + ' ✓' : 'NONE ❌'}`);
  console.log('');
}

// PHASE 1.3: Category Pages (from config)
console.log('\n' + '='.repeat(80));
console.log('PHASE 1.3: CATEGORY PAGE COVERAGE (from category-config.ts)');
console.log('='.repeat(80) + '\n');

for (const [catName, config] of Object.entries(categoryConfig)) {
  console.log(`Category: ${catName}`);
  console.log(`Path: /${catName}`);
  console.log(`Supabase Category: ${config.supabaseCategory}`);

  console.log('Related Guides Linked:');
  if (config.relatedGuides.length === 0) {
    console.log('  (none) ❌');
  } else {
    for (const g of config.relatedGuides) {
      console.log(`  - ${g}`);
    }
  }

  console.log('Related Blogs Linked:');
  if (config.relatedBlogs.length === 0) {
    console.log('  (none) ❌');
  } else {
    for (const b of config.relatedBlogs) {
      console.log(`  - ${b}`);
    }
  }

  // Find blogs that SHOULD be linked (topic match)
  const relevantBlogs = allBlogSlugs.filter(slug => {
    const lowerSlug = slug.toLowerCase();
    if (catName === 'knives') return lowerSlug.includes('knife') || lowerSlug.includes('cutting') || lowerSlug.includes('sharpen') || lowerSlug.includes('steel');
    if (catName === 'cookware') return lowerSlug.includes('pan') || lowerSlug.includes('iron') || lowerSlug.includes('steel') || lowerSlug.includes('nonstick') || lowerSlug.includes('dutch') || lowerSlug.includes('cookware');
    if (catName === 'appliances') return lowerSlug.includes('blender') || lowerSlug.includes('mixer') || lowerSlug.includes('processor') || lowerSlug.includes('instant');
    if (catName === 'prep-tools') return lowerSlug.includes('cutting-board') || lowerSlug.includes('peeler') || lowerSlug.includes('scraper') || lowerSlug.includes('prep');
    if (catName === 'moving-stirring') return lowerSlug.includes('spatula') || lowerSlug.includes('tong') || lowerSlug.includes('spoon') || lowerSlug.includes('whisk');
    if (catName === 'cleaning-maintenance') return lowerSlug.includes('clean') || lowerSlug.includes('sharpen') || lowerSlug.includes('season') || lowerSlug.includes('maintenance');
    return false;
  });

  const linkedBlogSlugs = config.relatedBlogs.map(b => b.replace('/blog/', ''));
  const missingBlogs = relevantBlogs.filter(slug => !linkedBlogSlugs.includes(slug));

  if (missingBlogs.length > 0) {
    console.log('Potentially Relevant Blogs NOT Linked:');
    for (const b of missingBlogs.slice(0, 5)) {
      console.log(`  - /blog/${b}`);
    }
    if (missingBlogs.length > 5) {
      console.log(`  ... and ${missingBlogs.length - 5} more`);
    }
  }

  console.log('');
}

// SUMMARY
console.log('\n' + '='.repeat(80));
console.log('SUMMARY');
console.log('='.repeat(80));

const blogsWithNoReviewLinks = blogResults.filter(b => b.reviewCount === 0);
const blogsWithNoCategoryLinks = blogResults.filter(b => b.missingCategoryHub);
const reviewsWithNoHubLink = reviewResults.filter(r => !r.hasHubLink);

console.log(`\nTotal Blog Posts: ${blogResults.length}`);
console.log(`Blogs with NO review links: ${blogsWithNoReviewLinks.length} (${Math.round(blogsWithNoReviewLinks.length/blogResults.length*100)}%)`);
console.log(`Blogs with NO category hub links: ${blogsWithNoCategoryLinks.length} (${Math.round(blogsWithNoCategoryLinks.length/blogResults.length*100)}%)`);

console.log(`\nTotal Review Pages: ${reviewResults.length}`);
console.log(`Reviews with NO link back to category hub: ${reviewsWithNoHubLink.length} (${Math.round(reviewsWithNoHubLink.length/reviewResults.length*100)}%)`);

console.log('\nCategory Page Content Gaps:');
for (const [catName, config] of Object.entries(categoryConfig)) {
  const issues = [];
  if (config.relatedGuides.length === 0) issues.push('no guides');
  if (config.relatedBlogs.length === 0) issues.push('no blogs');
  if (issues.length > 0) {
    console.log(`  ❌ /${catName}: ${issues.join(', ')}`);
  } else {
    console.log(`  ✓ /${catName}: ${config.relatedGuides.length} guides, ${config.relatedBlogs.length} blogs`);
  }
}

console.log('\n--- Blogs Missing Review Links (top 20) ---');
for (const b of blogsWithNoReviewLinks.slice(0, 20)) {
  console.log(`  ${b.slug}`);
}
if (blogsWithNoReviewLinks.length > 20) {
  console.log(`  ... and ${blogsWithNoReviewLinks.length - 20} more`);
}

console.log('\n--- Reviews Missing Category Hub Links ---');
for (const r of reviewsWithNoHubLink) {
  console.log(`  ${r.slug} (${r.category})`);
}

console.log('\n' + '='.repeat(80));
console.log('END OF AUDIT');
console.log('='.repeat(80));
