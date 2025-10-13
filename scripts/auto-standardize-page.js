#!/usr/bin/env node
/**
 * Automated script to standardize a review page
 *
 * This script:
 * 1. Extracts existing content and metadata
 * 2. Creates productData structure
 * 3. Adds necessary imports
 * 4. Converts img to Image
 * 5. Adds ProductViewTrackerWrapper
 * 6. Restructures to MIN_H_DIV pattern
 * 7. Preserves all content and sections
 */

const fs = require('fs');
const path = require('path');

// Get slug from command line
const slug = process.argv[2];
if (!slug) {
  console.error('Usage: node auto-standardize-page.js <slug>');
  console.error('Example: node auto-standardize-page.js nordic-ware-half-sheet-pan');
  process.exit(1);
}

const pagePath = path.join('app/reviews', slug, 'page.tsx');

if (!fs.existsSync(pagePath)) {
  console.error(`❌ Page not found: ${pagePath}`);
  process.exit(1);
}

console.log(`\n🔧 Standardizing: ${slug}`);
console.log(`📄 Reading: ${pagePath}\n`);

const content = fs.readFileSync(pagePath, 'utf8');

// ============================================================================
// STEP 1: Extract metadata
// ============================================================================

function extractMetadata(content) {
  const metadata = {
    productName: null,
    brand: null,
    expertRating: null,
    priceMin: null,
    priceMax: null,
    pros: [],
    cons: [],
    affiliateLinks: [],
    expertOpinion: null
  };

  // Extract product name from h1
  const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/s);
  if (h1Match) {
    metadata.productName = h1Match[1]
      .replace(/<[^>]+>/g, '')
      .replace(/Review:?\s*$/i, '')
      .trim();
  }

  // Extract brand (try to get from product name or content)
  if (metadata.productName) {
    const firstWord = metadata.productName.split(' ')[0];
    metadata.brand = firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
  }

  // Extract expert rating
  const ratingMatch = content.match(/expert rating[^:]*:\s*([0-9.]+)/i) ||
                      content.match(/rating[^:]*:\s*([0-9.]+)\/5/i);
  if (ratingMatch) {
    metadata.expertRating = parseFloat(ratingMatch[1]);
  }

  // Extract price range
  const priceMatches = content.match(/\$(\d+)(?:\s*-\s*\$(\d+))?/g);
  if (priceMatches && priceMatches.length > 0) {
    const prices = priceMatches.map(p => parseInt(p.replace(/\$/g, '')));
    metadata.priceMin = Math.min(...prices);
    metadata.priceMax = Math.max(...prices);
  }

  // Extract affiliate links
  const amazonMatch = content.match(/https:\/\/[^"'\s]*amazon[^"'\s]*/i);
  if (amazonMatch) {
    metadata.affiliateLinks.push({
      retailer: 'Amazon',
      url: amazonMatch[0]
    });
  }

  // Extract pros (look for list items under pros heading)
  const prosSection = content.match(/<h[23][^>]*>.*?pros.*?<\/h[23]>(.*?)(?=<h[23]|<\/section|<\/article|$)/is);
  if (prosSection) {
    const prosItems = prosSection[1].match(/<li[^>]*>(.*?)<\/li>/gs);
    if (prosItems) {
      metadata.pros = prosItems.map(item =>
        item.replace(/<[^>]+>/g, '').trim()
      );
    }
  }

  // Extract cons
  const consSection = content.match(/<h[23][^>]*>.*?cons.*?<\/h[23]>(.*?)(?=<h[23]|<\/section|<\/article|$)/is);
  if (consSection) {
    const consItems = consSection[1].match(/<li[^>]*>(.*?)<\/li>/gs);
    if (consItems) {
      metadata.cons = consItems.map(item =>
        item.replace(/<[^>]+>/g, '').trim()
      );
    }
  }

  return metadata;
}

// ============================================================================
// STEP 2: Check what already exists
// ============================================================================

function analyzeCurrentState(content) {
  return {
    hasProductData: content.includes('const productData'),
    hasTracker: content.includes('ProductViewTrackerWrapper'),
    hasImageImport: content.includes("import Image from 'next/image'"),
    hasTrackerImport: content.includes("import ProductViewTrackerWrapper"),
    imgTags: (content.match(/<img\s/g) || []).length,
    hasAuthorBio: content.includes('AuthorBio') || content.includes('About Scott Bradley'),
    internalLinks: (content.match(/href="\/reviews\//g) || []).length
  };
}

// ============================================================================
// STEP 3: Generate productData structure
// ============================================================================

function generateProductData(slug, metadata) {
  const now = new Date().toISOString().split('T')[0];

  return `const productData = {
  name: "${metadata.productName || 'Product Name'}",
  slug: "${slug}",
  brand: "${metadata.brand || 'Brand'}",
  category: "Kitchen Equipment",
  priceRange: {
    min: ${metadata.priceMin || 20},
    max: ${metadata.priceMax || metadata.priceMin || 50},
    currency: "USD"
  },
  affiliateLinks: ${JSON.stringify(metadata.affiliateLinks, null, 4).split('\n').join('\n  ')},
  expertRating: ${metadata.expertRating || 4.5},
  expertOpinion: "${metadata.expertOpinion || 'Professional-grade quality at an accessible price point.'}",
  pros: ${JSON.stringify(metadata.pros, null, 4).split('\n').join('\n  ')},
  cons: ${JSON.stringify(metadata.cons, null, 4).split('\n').join('\n  ')},
  dateAdded: "${now}",
  lastUpdated: "${now}",
  images: {
    primary: "/logo.png"
  }
}`;
}

// ============================================================================
// STEP 4: Add/update imports
// ============================================================================

function updateImports(content, state) {
  const imports = [];

  // Find existing import block
  const importBlockMatch = content.match(/^(import[\s\S]*?from ['"'].*?['";]\n)+/m);
  let existingImports = importBlockMatch ? importBlockMatch[0] : '';

  // Add Image import if needed
  if (!state.hasImageImport && state.imgTags > 0) {
    imports.push("import Image from 'next/image'");
  }

  // Add ProductViewTrackerWrapper import if needed
  if (!state.hasTrackerImport) {
    imports.push("import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'");
  }

  if (imports.length > 0) {
    existingImports += imports.join('\n') + '\n';
  }

  return existingImports;
}

// ============================================================================
// STEP 5: Convert img to Image
// ============================================================================

function convertImagesToNextImage(content) {
  // Convert <img> tags to <Image> tags
  // Pattern: <img src="..." alt="..." .../>
  return content.replace(
    /<img\s+([^>]*?)src=["']([^"']+)["']([^>]*?)alt=["']([^"']+)["']([^>]*?)\/?>/g,
    (match, before, src, middle, alt, after) => {
      // Extract width/height if present
      const widthMatch = match.match(/width=["']?(\d+)["']?/);
      const heightMatch = match.match(/height=["']?(\d+)["']?/);
      const classMatch = match.match(/className=["']([^"']+)["']/) || match.match(/class=["']([^"']+)["']/);

      const width = widthMatch ? widthMatch[1] : '400';
      const height = heightMatch ? heightMatch[1] : '400';
      const className = classMatch ? ` className="${classMatch[1]}"` : '';

      return `<Image\n        src="${src}"\n        alt="${alt}"\n        width={${width}}\n        height={${height}}${className}\n      />`;
    }
  );
}

// ============================================================================
// STEP 6: Main transformation
// ============================================================================

console.log('📊 Analyzing current state...');
const metadata = extractMetadata(content);
const state = analyzeCurrentState(content);

console.log('\n📋 Extracted metadata:');
console.log(`  Product: ${metadata.productName || 'Not found'}`);
console.log(`  Brand: ${metadata.brand || 'Not found'}`);
console.log(`  Rating: ${metadata.expertRating || 'Not found'}`);
console.log(`  Price: $${metadata.priceMin || '?'} - $${metadata.priceMax || '?'}`);
console.log(`  Pros: ${metadata.pros.length} items`);
console.log(`  Cons: ${metadata.cons.length} items`);
console.log(`  Affiliate Links: ${metadata.affiliateLinks.length}`);

console.log('\n🔍 Current state:');
console.log(`  ${state.hasProductData ? '✅' : '❌'} productData`);
console.log(`  ${state.hasTracker ? '✅' : '❌'} ProductViewTrackerWrapper`);
console.log(`  ${state.hasImageImport ? '✅' : '❌'} Image import`);
console.log(`  ${state.imgTags === 0 ? '✅' : '⚠️ '} ${state.imgTags} <img> tags to convert`);
console.log(`  ${state.hasAuthorBio ? '✅' : '⚠️ '} AuthorBio section`);
console.log(`  ${state.internalLinks >= 3 ? '✅' : '⚠️ '} ${state.internalLinks} internal links`);

console.log('\n⚙️  Applying transformations...');

// Build the new content
let newContent = '';

// 1. Add imports
const imports = updateImports(content, state);
newContent += imports + '\n';

// 2. Add productData if missing
if (!state.hasProductData) {
  console.log('  ➕ Adding productData structure');
  newContent += generateProductData(slug, metadata) + '\n\n';
}

// 3. Extract and preserve metadata export
const metadataMatch = content.match(/export const metadata[^}]*\}[^}]*\}/s);
if (metadataMatch) {
  newContent += metadataMatch[0] + '\n\n';
}

// 4. Extract component body
const componentMatch = content.match(/export default function \w+\(\)[^{]*\{([\s\S]*)\}/);
let componentBody = componentMatch ? componentMatch[1] : '';

// Convert img to Image
if (state.imgTags > 0) {
  console.log(`  🖼️  Converting ${state.imgTags} <img> tags to <Image>`);
  componentBody = convertImagesToNextImage(componentBody);
}

// 5. Build the component with tracker
console.log('  🔄 Restructuring to MIN_H_DIV pattern');

// Extract the main JSX content from return statement
let mainJSX = '';
const returnMatch = componentBody.match(/return\s*\(([\s\S]*)\)/);
if (returnMatch) {
  mainJSX = returnMatch[1].trim();
} else {
  // Try to find JSX in the component body
  const jsxMatch = componentBody.match(/<[\s\S]*>/);
  mainJSX = jsxMatch ? jsxMatch[0] : componentBody;
}

// Remove the outermost wrapper (article, div, etc.) to get inner content
// Look for the opening tag and its corresponding closing tag
let innerContent = mainJSX;
const openingTagMatch = mainJSX.match(/^<(\w+)[^>]*>/);
if (openingTagMatch) {
  const tagName = openingTagMatch[1];
  const closingTag = `</${tagName}>`;

  // Find the matching closing tag (last occurrence)
  const lastClosingIndex = mainJSX.lastIndexOf(closingTag);
  if (lastClosingIndex > -1) {
    // Extract content between opening and closing tags
    const startIndex = mainJSX.indexOf('>') + 1;
    innerContent = mainJSX.substring(startIndex, lastClosingIndex).trim();
  }
}

// Build the new component
newContent += `export default function ${slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}Review() {\n`;
newContent += `  return (\n`;
newContent += `    <div className="min-h-screen bg-gray-50">\n`;

// Add tracker if missing
if (!state.hasTracker) {
  console.log('  ➕ Adding ProductViewTrackerWrapper');
  newContent += `      <ProductViewTrackerWrapper\n`;
  newContent += `        slug={productData.slug}\n`;
  newContent += `        name={productData.name}\n`;
  newContent += `        image={productData.images.primary}\n`;
  newContent += `        price={productData.priceRange.min}\n`;
  newContent += `      />\n\n`;
}

// Add breadcrumb nav if it exists
const navMatch = innerContent.match(/<nav[^>]*>[\s\S]*?<\/nav>/);
if (navMatch) {
  newContent += `      ${navMatch[0].trim()}\n\n`;
  // Remove nav from innerContent to avoid duplication
  innerContent = innerContent.replace(navMatch[0], '').trim();
}

// Wrap remaining content in article tag
newContent += `      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">\n`;
newContent += innerContent.split('\n').map(line => '        ' + line).join('\n');
newContent += `\n      </article>\n`;

newContent += `    </div>\n`;
newContent += `  )\n`;
newContent += `}\n`;

// ============================================================================
// STEP 7: Write backup and new file
// ============================================================================

const backupPath = pagePath + `.backup-${new Date().toISOString().split('T')[0]}`;
console.log(`\n💾 Creating backup: ${path.basename(backupPath)}`);
fs.writeFileSync(backupPath, content);

console.log(`✍️  Writing updated file: ${pagePath}`);
fs.writeFileSync(pagePath, newContent);

console.log('\n✅ Standardization complete!\n');
console.log('Next steps:');
console.log('  1. Review the changes: git diff ' + pagePath);
console.log('  2. Test locally: npm run dev');
console.log('  3. Check types: npm run type-check');
console.log('');
