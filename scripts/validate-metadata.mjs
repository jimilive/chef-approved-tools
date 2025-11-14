import { validateAllMetadata, getAllSlugs, getMetadataStats } from '../data/metadata.ts';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('📋 Validating centralized metadata file...\n');

// First, run the standard metadata validation
const metadataErrors = validateAllMetadata();

// Get all metadata slugs
const pagesSlugs = getAllSlugs('pages');
const guidesSlugs = getAllSlugs('guides');
const blogSlugs = getAllSlugs('blog');
const reviewsSlugs = getAllSlugs('reviews');

console.log('📊 Metadata Stats:');
const stats = getMetadataStats();
console.log(`  Pages: ${stats.pages}`);
console.log(`  Guides: ${stats.guides}`);
console.log(`  Blog: ${stats.blog}`);
console.log(`  Reviews: ${stats.reviews}`);
console.log(`  Total: ${stats.total}\n`);

// Now check if all actual page files have metadata
const appDir = path.join(__dirname, '../app');
const errors = [...metadataErrors];

// Helper to recursively find all page.tsx files
function findPageFiles(dir, baseDir = dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip certain directories
      if (['api', 'admin', 'test-header'].includes(entry.name)) continue;
      files.push(...findPageFiles(fullPath, baseDir));
    } else if (entry.name === 'page.tsx') {
      // Get the route path
      const relativePath = path.relative(baseDir, dir);
      files.push(relativePath || '/');
    }
  }

  return files;
}

const allPageRoutes = findPageFiles(appDir);

console.log(`🔍 Checking ${allPageRoutes.length} page routes for metadata coverage...\n`);

// Check each route
for (const route of allPageRoutes) {
  const slug = route === '/' ? 'home' : route.replace(/^\//, '');

  // Determine the type based on the path
  let type = null;
  let expectedSlug = slug;

  if (slug === 'home') {
    type = 'pages';
  } else if (slug.startsWith('blog/')) {
    type = 'blog';
    expectedSlug = slug.replace('blog/', '');
  } else if (slug.startsWith('reviews/')) {
    type = 'reviews';
    expectedSlug = slug.replace('reviews/', '');
  } else if (slug.startsWith('guides/')) {
    type = 'guides';
    expectedSlug = slug.replace('guides/', '');
  } else if (['privacy-policy', 'terms', 'cookie-policy', 'disclosure', 'review-tiers'].includes(slug)) {
    // Skip policy/info pages that don't need SEO metadata
    continue;
  } else {
    // Regular page
    type = 'pages';
  }

  // Check if metadata exists
  const hasMeta = type === 'pages' ? pagesSlugs.includes(expectedSlug) :
                  type === 'guides' ? guidesSlugs.includes(expectedSlug) :
                  type === 'blog' ? blogSlugs.includes(expectedSlug) :
                  type === 'reviews' ? reviewsSlugs.includes(expectedSlug) :
                  false;

  if (!hasMeta) {
    errors.push(`❌ Missing metadata: /${slug} (expected in METADATA.${type}['${expectedSlug}'])`);
  }
}

// Check for metadata entries that don't have corresponding page files
console.log('🔍 Checking for orphaned metadata entries (metadata without pages)...\n');

for (const slug of pagesSlugs) {
  const route = slug === 'home' ? '' : slug;
  if (!allPageRoutes.includes(route) && !allPageRoutes.includes(`/${route}`)) {
    // Special cases that are OK
    if (['lead-magnet-clean'].includes(slug)) continue;
    errors.push(`⚠️  Orphaned metadata: pages/${slug} (no page file found at app/${slug}/page.tsx)`);
  }
}

for (const slug of guidesSlugs) {
  const route = `guides/${slug}`;
  if (!allPageRoutes.includes(route)) {
    errors.push(`⚠️  Orphaned metadata: guides/${slug} (no page file found at app/${route}/page.tsx)`);
  }
}

for (const slug of blogSlugs) {
  const route = `blog/${slug}`;
  if (!allPageRoutes.includes(route)) {
    errors.push(`⚠️  Orphaned metadata: blog/${slug} (no page file found at app/${route}/page.tsx)`);
  }
}

for (const slug of reviewsSlugs) {
  const route = `reviews/${slug}`;
  if (!allPageRoutes.includes(route)) {
    errors.push(`⚠️  Orphaned metadata: reviews/${slug} (no page file found at app/${route}/page.tsx)`);
  }
}

// Print results
if (errors.length > 0) {
  console.log('❌ METADATA VALIDATION FAILED\n');
  errors.forEach(error => {
    console.log(`${error}`);
    console.log('---');
  });
  console.log(`\nTotal errors: ${errors.length}\n`);
  process.exit(1);
}

console.log('✅ All metadata validation checks passed!');
console.log(`✅ All ${stats.total} entries have valid metadata`);
console.log('✅ All page files have corresponding metadata entries');
console.log('✅ No orphaned metadata entries\n');
process.exit(0);
