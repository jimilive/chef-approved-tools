#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const APP_DIR = path.join(process.cwd(), 'app');
const LIB_DIR = path.join(process.cwd(), 'lib');

const CATEGORY_HUBS = {
  'knives': '/knives',
  'cookware': '/cookware',
  'appliances': '/appliances',
  'prep-tools': '/prep-tools',
  'moving-stirring': '/moving-stirring',
  'cleaning-maintenance': '/cleaning-maintenance'
};

// Category detection keywords for reviews
const CATEGORY_KEYWORDS = {
  'knives': ['knife', 'knives', 'blade', 'cutting tool', 'sharpening steel', 'honing', 'bread knife', 'paring', 'chef\'s knife'],
  'cookware': ['pan', 'skillet', 'dutch oven', 'pot', 'sheet pan', 'cast iron', 'nonstick', 'stainless steel pan', 'cookware'],
  'appliances': ['blender', 'mixer', 'food processor', 'instant pot', 'air fryer', 'toaster', 'vitamix', 'kitchenaid', 'ninja'],
  'prep-tools': ['cutting board', 'peeler', 'mandoline', 'scraper', 'grater', 'hotel pan'],
  'moving-stirring': ['tong', 'tongs', 'wooden spoon', 'spatula', 'whisk', 'ladle', 'turner'],
  'cleaning-maintenance': ['cleaner', 'bar keeper', 'towel', 'bar mop', 'sharpener', 'stone', 'salt', 'kosher salt']
};

// Get all review slugs with their content
function getAllReviews() {
  const reviewDir = path.join(APP_DIR, 'reviews');
  const reviews = [];

  const slugs = fs.readdirSync(reviewDir).filter(f => {
    const pagePath = path.join(reviewDir, f, 'page.tsx');
    return fs.existsSync(pagePath);
  });

  for (const slug of slugs) {
    const filePath = path.join(reviewDir, slug, 'page.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');
    reviews.push({ slug, content, path: `/reviews/${slug}` });
  }

  return reviews;
}

// Get all blog slugs
function getAllBlogs() {
  const blogDir = path.join(APP_DIR, 'blog');
  const blogs = [];

  const slugs = fs.readdirSync(blogDir).filter(f => {
    const pagePath = path.join(blogDir, f, 'page.tsx');
    return fs.existsSync(pagePath);
  });

  for (const slug of slugs) {
    const filePath = path.join(blogDir, slug, 'page.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');
    blogs.push({ slug, content, path: `/blog/${slug}` });
  }

  return blogs;
}

// Determine category for a review based on content
function detectCategory(content, slug) {
  const lowerContent = (content + ' ' + slug).toLowerCase();

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lowerContent.includes(keyword)) {
        return category;
      }
    }
  }
  return 'unknown';
}

// Extract all internal links from content
function extractLinks(content) {
  const links = [];
  const patterns = [
    /<Link[^>]*href=["']([^"']+)["']/g,
    /href=["']([^"']+)["']/g
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const href = match[1];
      if (href.startsWith('/') && !links.includes(href)) {
        links.push(href);
      }
    }
  }

  return links;
}

// Parse category-config.ts for related content
function parseCategoryConfig() {
  const configPath = path.join(LIB_DIR, 'category-config.ts');
  const content = fs.readFileSync(configPath, 'utf-8');

  const categories = {};
  const categoryNames = Object.keys(CATEGORY_HUBS);

  for (const catName of categoryNames) {
    let blockStart = content.indexOf(`${catName}:`);
    if (blockStart === -1) {
      blockStart = content.indexOf(`'${catName}':`);
    }
    if (blockStart === -1) continue;

    let blockEnd = content.length;
    for (const nextCat of categoryNames) {
      if (nextCat === catName) continue;
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

// Main analysis
function main() {
  console.log('='.repeat(80));
  console.log('PHASE 4: HUB & SPOKE STRUCTURE VALIDATION');
  console.log('='.repeat(80));

  const reviews = getAllReviews();
  const blogs = getAllBlogs();
  const categoryConfig = parseCategoryConfig();

  // Categorize all reviews
  const reviewsByCategory = {};
  for (const category of Object.keys(CATEGORY_HUBS)) {
    reviewsByCategory[category] = [];
  }
  reviewsByCategory['unknown'] = [];

  for (const review of reviews) {
    const category = detectCategory(review.content, review.slug);
    review.category = category;
    review.links = extractLinks(review.content);
    if (reviewsByCategory[category]) {
      reviewsByCategory[category].push(review);
    } else {
      reviewsByCategory['unknown'].push(review);
    }
  }

  // ============================================================
  // 4.1 CATEGORY HUB COMPLETENESS
  // ============================================================
  console.log('\n' + '='.repeat(80));
  console.log('4.1 CATEGORY HUB COMPLETENESS');
  console.log('='.repeat(80));

  const hubIssues = [];

  for (const [category, hubPath] of Object.entries(CATEGORY_HUBS)) {
    console.log(`\n${'─'.repeat(60)}`);
    console.log(`CATEGORY: ${category.toUpperCase()} (${hubPath})`);
    console.log('─'.repeat(60));

    const categoryReviews = reviewsByCategory[category] || [];
    const config = categoryConfig[category] || { relatedGuides: [], relatedBlogs: [] };

    console.log(`\nReviews in this category: ${categoryReviews.length}`);
    for (const r of categoryReviews) {
      console.log(`  - ${r.slug}`);
    }

    // Check hub page content
    const hubPagePath = path.join(APP_DIR, category, 'page.tsx');
    let hubContent = '';
    if (fs.existsSync(hubPagePath)) {
      hubContent = fs.readFileSync(hubPagePath, 'utf-8');
    }
    const hubLinks = extractLinks(hubContent);

    // Does hub link to ALL reviews in category?
    // Note: Category pages use ProductCard which dynamically links to reviews
    // Check if it uses ProductCard or RelatedProductsGrid
    const usesDynamicProducts = hubContent.includes('ProductCard') ||
                                hubContent.includes('RelatedProductsGrid') ||
                                hubContent.includes('supabaseCategory');

    if (usesDynamicProducts) {
      console.log(`\n✓ Hub uses dynamic product loading (ProductCard/RelatedProductsGrid)`);
      console.log(`  Products are fetched from Supabase category: "${config.supabaseCategory}"`);
    } else {
      // Check static links to reviews
      const linkedReviews = hubLinks.filter(l => l.startsWith('/reviews/'));
      const missingReviews = categoryReviews.filter(r => !linkedReviews.includes(r.path));
      if (missingReviews.length > 0) {
        console.log(`\n❌ Hub MISSING links to ${missingReviews.length} reviews:`);
        for (const r of missingReviews) {
          console.log(`   - ${r.path}`);
        }
        hubIssues.push({ category, issue: 'missing_review_links', count: missingReviews.length });
      } else {
        console.log(`\n✓ Hub links to all ${categoryReviews.length} reviews`);
      }
    }

    // Does hub link to top blog posts?
    console.log(`\nRelated Blogs Configured: ${config.relatedBlogs.length}`);
    if (config.relatedBlogs.length === 0) {
      console.log(`  ❌ NO related blogs configured!`);
      hubIssues.push({ category, issue: 'no_related_blogs', count: 0 });
    } else {
      for (const b of config.relatedBlogs) {
        console.log(`  ✓ ${b}`);
      }
    }

    console.log(`\nRelated Guides Configured: ${config.relatedGuides.length}`);
    if (config.relatedGuides.length === 0) {
      console.log(`  ❌ NO related guides configured!`);
      hubIssues.push({ category, issue: 'no_related_guides', count: 0 });
    } else {
      for (const g of config.relatedGuides) {
        console.log(`  ✓ ${g}`);
      }
    }

    // Do ALL reviews link BACK to category hub?
    console.log(`\nReview → Hub Links:`);
    let reviewsWithHubLink = 0;
    const reviewsMissingHubLink = [];

    for (const review of categoryReviews) {
      const linksToHub = review.links.includes(hubPath);
      if (linksToHub) {
        reviewsWithHubLink++;
        console.log(`  ✓ ${review.slug} → ${hubPath}`);
      } else {
        reviewsMissingHubLink.push(review.slug);
        console.log(`  ❌ ${review.slug} → NO HUB LINK`);
      }
    }

    if (reviewsMissingHubLink.length > 0) {
      hubIssues.push({ category, issue: 'reviews_missing_hub_link', reviews: reviewsMissingHubLink });
    }

    console.log(`\nSummary: ${reviewsWithHubLink}/${categoryReviews.length} reviews link back to hub`);
  }

  // ============================================================
  // 4.2 SPOKE INTERCONNECTION
  // ============================================================
  console.log('\n\n' + '='.repeat(80));
  console.log('4.2 SPOKE INTERCONNECTION (Review Cross-Links)');
  console.log('='.repeat(80));

  const spokeIssues = [];

  for (const [category, categoryReviews] of Object.entries(reviewsByCategory)) {
    if (category === 'unknown' || categoryReviews.length < 2) continue;

    console.log(`\n${'─'.repeat(60)}`);
    console.log(`CATEGORY: ${category.toUpperCase()} (${categoryReviews.length} reviews)`);
    console.log('─'.repeat(60));

    for (const review of categoryReviews) {
      // Find links to sibling reviews
      const siblingReviews = categoryReviews.filter(r => r.slug !== review.slug);
      const siblingPaths = siblingReviews.map(r => r.path);
      const linksToSiblings = review.links.filter(l => siblingPaths.includes(l));

      console.log(`\n${review.slug}:`);
      console.log(`  Cross-links to siblings: ${linksToSiblings.length}/${siblingReviews.length}`);

      if (linksToSiblings.length === 0) {
        console.log(`  ❌ NO cross-links to sibling reviews`);
        spokeIssues.push({
          review: review.slug,
          category,
          issue: 'no_sibling_links',
          possibleSiblings: siblingReviews.map(r => r.slug)
        });
      } else if (linksToSiblings.length < 2 && siblingReviews.length >= 2) {
        console.log(`  ⚠️  Only ${linksToSiblings.length} sibling link (recommend 2-4)`);
        for (const link of linksToSiblings) {
          console.log(`     → ${link}`);
        }
        spokeIssues.push({
          review: review.slug,
          category,
          issue: 'few_sibling_links',
          current: linksToSiblings.length,
          possibleSiblings: siblingReviews.map(r => r.slug)
        });
      } else {
        console.log(`  ✓ Links to:`);
        for (const link of linksToSiblings) {
          console.log(`     → ${link}`);
        }
      }

      // Check for comparison table
      const hasComparisonTable = review.content.includes('ProductComparisonTable') ||
                                  review.content.includes('ComparisonTable') ||
                                  review.content.includes('comparison');
      if (hasComparisonTable) {
        console.log(`  📊 Has comparison table content`);
      }
    }
  }

  // ============================================================
  // SUMMARY
  // ============================================================
  console.log('\n\n' + '='.repeat(80));
  console.log('SUMMARY');
  console.log('='.repeat(80));

  console.log('\n--- HUB ISSUES ---');
  const categoriesWithIssues = [...new Set(hubIssues.map(i => i.category))];
  if (categoriesWithIssues.length === 0) {
    console.log('✓ All category hubs are complete');
  } else {
    for (const category of categoriesWithIssues) {
      const issues = hubIssues.filter(i => i.category === category);
      console.log(`\n❌ ${category}:`);
      for (const issue of issues) {
        if (issue.issue === 'reviews_missing_hub_link') {
          console.log(`   ${issue.reviews.length} reviews don't link back to hub`);
        } else if (issue.issue === 'no_related_blogs') {
          console.log(`   No related blogs configured`);
        } else if (issue.issue === 'no_related_guides') {
          console.log(`   No related guides configured`);
        }
      }
    }
  }

  // Count reviews missing hub links
  const allReviewsMissingHub = hubIssues
    .filter(i => i.issue === 'reviews_missing_hub_link')
    .flatMap(i => i.reviews);

  console.log(`\n--- SPOKE INTERCONNECTION ISSUES ---`);
  const reviewsWithNoSiblings = spokeIssues.filter(i => i.issue === 'no_sibling_links');
  const reviewsWithFewSiblings = spokeIssues.filter(i => i.issue === 'few_sibling_links');

  console.log(`Reviews with NO sibling cross-links: ${reviewsWithNoSiblings.length}`);
  console.log(`Reviews with < 2 sibling cross-links: ${reviewsWithFewSiblings.length}`);

  console.log('\n--- TOTALS ---');
  console.log(`Total reviews analyzed: ${reviews.length}`);
  console.log(`Reviews missing hub link: ${allReviewsMissingHub.length} (${Math.round(allReviewsMissingHub.length/reviews.length*100)}%)`);
  console.log(`Reviews with poor sibling linking: ${reviewsWithNoSiblings.length + reviewsWithFewSiblings.length}`);

  // Categories needing content
  const categoriesNeedingBlogs = hubIssues.filter(i => i.issue === 'no_related_blogs').map(i => i.category);
  const categoriesNeedingGuides = hubIssues.filter(i => i.issue === 'no_related_guides').map(i => i.category);

  if (categoriesNeedingBlogs.length > 0) {
    console.log(`\nCategories needing related blogs: ${categoriesNeedingBlogs.join(', ')}`);
  }
  if (categoriesNeedingGuides.length > 0) {
    console.log(`Categories needing related guides: ${categoriesNeedingGuides.join(', ')}`);
  }

  console.log('\n' + '='.repeat(80));
  console.log('END OF PHASE 4 AUDIT');
  console.log('='.repeat(80));
}

main();
