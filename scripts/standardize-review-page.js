#!/usr/bin/env node
/**
 * Interactive script to standardize review pages
 *
 * For each problem page, this script will:
 * 1. Extract existing content
 * 2. Create productData structure
 * 3. Add necessary imports
 * 4. Restructure to template format
 * 5. Convert img to Image
 * 6. Add accessibility improvements
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const PROBLEM_PAGES = [
  'nordic-ware-half-sheet-pan',
  'norton-im200-tri-stone-sharpener',
  'black-decker-toaster-oven',
  'bodum-chambord-french-press',
  'method-all-purpose-cleaner',
  'zuperia-bar-mops',
  'victorinox-offset-bread-knife',
  'diamond-crystal-kosher-salt',
  'victorinox-fibrox-8-inch-chefs-knife',
  'victorinox-fibrox-10-inch-chefs-knife',
  'benriner-large-mandoline',
  'cuisinart-8-inch-nonstick-pan'
];

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function analyzeCurrentPage(slug) {
  const pagePath = path.join('app/reviews', slug, 'page.tsx');

  if (!fs.existsSync(pagePath)) {
    console.log(`❌ Page not found: ${pagePath}`);
    return null;
  }

  const content = fs.readFileSync(pagePath, 'utf8');

  // Extract key information
  const analysis = {
    slug,
    hasProductData: content.includes('const productData'),
    hasTracker: content.includes('ProductViewTrackerWrapper'),
    hasAuthorBio: content.includes('AuthorBio') || content.includes('About Scott Bradley'),
    hasTestimonials: content.includes('TestimonialsSection') || content.includes('testimonials'),
    imgCount: (content.match(/<img /g) || []).length,
    ImageCount: (content.match(/<Image /g) || []).length,
    internalLinkCount: (content.match(/href="\/reviews\//g) || []).length,
    h1Count: (content.match(/<h1[^>]*>/g) || []).length,

    // Extract product name from h1 or title
    productName: null,
    structure: content.includes('<article') ? 'ARTICLE' :
                content.includes('className="min-h-screen') ? 'MIN_H_DIV' : 'OTHER'
  };

  // Try to extract product name
  const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/);
  if (h1Match) {
    analysis.productName = h1Match[1]
      .replace(/<[^>]+>/g, '') // Remove HTML tags
      .replace(/Review:?.*$/i, '') // Remove "Review:" and after
      .trim();
  }

  return analysis;
}

function displayAnalysis(analysis) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`📄 ${analysis.slug}`);
  console.log(`${'='.repeat(80)}`);
  console.log(`Product Name: ${analysis.productName || '(not found)'}`);
  console.log(`Structure:    ${analysis.structure}`);
  console.log(`\nCurrent State:`);
  console.log(`  ${analysis.hasProductData ? '✅' : '❌'} productData structure`);
  console.log(`  ${analysis.hasTracker ? '✅' : '❌'} ProductViewTrackerWrapper`);
  console.log(`  ${analysis.hasAuthorBio ? '✅' : '❌'} AuthorBio component`);
  console.log(`  ${analysis.hasTestimonials ? '✅' : '❌'} Testimonials section`);
  console.log(`  ${analysis.ImageCount > 0 ? '✅' : '❌'} Using Next.js Image (${analysis.ImageCount} instances)`);
  console.log(`  ${analysis.imgCount > 0 ? '⚠️ ' : '✅'} Has ${analysis.imgCount} <img> tags (should convert)`);
  console.log(`  ${analysis.internalLinkCount >= 3 ? '✅' : '⚠️ '} ${analysis.internalLinkCount} internal links (target: 5+)`);
  console.log(`  ${analysis.h1Count === 1 ? '✅' : '⚠️ '} ${analysis.h1Count} H1 heading(s) (should be 1)`);
}

async function main() {
  console.log('🔧 Review Page Standardization Tool\n');
  console.log(`Found ${PROBLEM_PAGES.length} pages to standardize\n`);

  for (let i = 0; i < PROBLEM_PAGES.length; i++) {
    const slug = PROBLEM_PAGES[i];
    const analysis = await analyzeCurrentPage(slug);

    if (!analysis) continue;

    displayAnalysis(analysis);

    console.log(`\n📝 Action Plan:`);
    const actions = [];

    if (!analysis.hasProductData) actions.push('  1. Create productData structure');
    if (!analysis.hasTracker) actions.push('  2. Add ProductViewTrackerWrapper');
    if (analysis.imgCount > 0) actions.push(`  3. Convert ${analysis.imgCount} <img> to <Image>`);
    if (!analysis.hasAuthorBio) actions.push('  4. Add AuthorBio component');
    if (analysis.internalLinkCount < 3) actions.push(`  5. Add ${3 - analysis.internalLinkCount}+ internal links`);
    if (analysis.structure !== 'MIN_H_DIV') actions.push('  6. Restructure to MIN_H_DIV pattern');

    if (actions.length === 0) {
      console.log('  ✅ No changes needed!');
    } else {
      actions.forEach(action => console.log(action));
    }

    console.log(`\nProgress: ${i + 1}/${PROBLEM_PAGES.length}`);

    const answer = await question('\nOptions: [s]kip, [q]uit, or press Enter to continue: ');

    if (answer.toLowerCase() === 'q') {
      console.log('\n👋 Exiting...');
      rl.close();
      return;
    }

    if (answer.toLowerCase() === 's') {
      console.log('⏭️  Skipping...');
      continue;
    }

    console.log('\n⚠️  Manual editing required for this page.');
    console.log(`   Open: app/reviews/${slug}/page.tsx`);
    console.log(`   Refer to: docs/REVIEW_PAGE_TEMPLATE.md\n`);
  }

  console.log(`\n${'='.repeat(80)}`);
  console.log('✅ Analysis complete!');
  console.log(`${'='.repeat(80)}\n`);
  console.log('Next steps:');
  console.log('1. Review docs/REVIEW_PAGE_TEMPLATE.md');
  console.log('2. Fix pages systematically using the template');
  console.log('3. Run: npm run type-check');
  console.log('4. Test locally: npm run dev\n');

  rl.close();
}

main().catch(console.error);
