const fs = require('fs');
const path = require('path');

// List of review pages to update
const reviewPages = [
  'epicurean-kitchen-cutting-board',
  'kitchenaid-ksm8990wh',
  'victorinox-granton-edge-boning-knife',
  'oxo-good-grips-bench-scraper',
  'oxo-good-grips-swivel-peeler',
  'black-decker-toaster-oven',
  'victorinox-4-inch-paring-knife',
  'winco-heavy-duty-tongs',
  'kitchenaid-kp26m1xlc-professional-600',
  'le-creuset-signature-7-25-qt-dutch-oven',
  'benriner-large-mandoline',
  'cuisinart-8-inch-nonstick-pan',
  'cuisinart-dlc-10c-classic-food-processor',
  'bodum-chambord-french-press',
  'diamond-crystal-kosher-salt',
  'method-all-purpose-cleaner',
  'john-boos-platinum-commercial-cutting-board',
  'nordic-ware-half-sheet-pan',
  'norton-im200-tri-stone-sharpener',
  'robot-coupe-r2-dice',
  'vitamix-5200',
  'victorinox-fibrox-10-inch-chefs-knife',
  'victorinox-fibrox-8-inch-chefs-knife',
  'victorinox-offset-bread-knife',
  'wusthof-classic-ikon-16-piece',
  'zuperia-bar-mops',
  'lodge-seasoned-cast-iron-3-skillet-bundle',
];

const IMPORT_STATEMENT = "import ProductViewTrackerWrapper from '@/components/ProductViewTrackerWrapper'";

function addTrackerToPage(pagePath) {
  console.log(`\nProcessing: ${pagePath}`);

  const filePath = path.join(__dirname, '..', 'app', 'reviews', pagePath, 'page.tsx');

  if (!fs.existsSync(filePath)) {
    console.log(`  ❌ File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Check if already has the tracker
  if (content.includes('ProductViewTrackerWrapper')) {
    console.log(`  ⏭️  Already has tracker, skipping`);
    return true;
  }

  // Step 1: Add import statement if not present
  if (!content.includes(IMPORT_STATEMENT)) {
    // Find the last import statement
    const importLines = content.split('\n');
    let lastImportIndex = -1;

    for (let i = 0; i < importLines.length; i++) {
      if (importLines[i].trim().startsWith('import ')) {
        lastImportIndex = i;
      }
    }

    if (lastImportIndex !== -1) {
      importLines.splice(lastImportIndex + 1, 0, IMPORT_STATEMENT);
      content = importLines.join('\n');
      console.log(`  ✓ Added import statement`);
    }
  }

  // Step 2: Find productData to extract slug, name, and price
  const productDataMatch = content.match(/const productData = \{[\s\S]*?\n\}/m);
  if (!productDataMatch) {
    console.log(`  ❌ Could not find productData object`);
    return false;
  }

  const productDataStr = productDataMatch[0];
  const slugMatch = productDataStr.match(/slug:\s*["']([^"']+)["']/);
  const nameMatch = productDataStr.match(/name:\s*["']([^"']+)["']/);
  const priceMatch = productDataStr.match(/priceRange:\s*\{[\s\S]*?min:\s*(\d+)/);

  if (!slugMatch || !nameMatch) {
    console.log(`  ❌ Could not extract slug or name from productData`);
    return false;
  }

  const slug = slugMatch[1];
  const name = nameMatch[1];
  const price = priceMatch ? priceMatch[1] : undefined;

  console.log(`  📦 Product: ${name}`);
  console.log(`  🔖 Slug: ${slug}`);
  console.log(`  💰 Price: ${price || 'N/A'}`);

  // Step 3: Find the return statement and add tracker
  // Look for pattern: return (\n    <div className="min-h-screen
  const returnPattern = /return\s*\(\s*\n\s*<div className="min-h-screen/;
  const returnMatch = content.match(returnPattern);

  if (!returnMatch) {
    console.log(`  ❌ Could not find return statement with min-h-screen div`);
    return false;
  }

  // Build tracker component
  const priceAttr = price ? `\n        price={${price}}` : '';
  const trackerComponent = `      <ProductViewTrackerWrapper
        slug="${slug}"
        name="${name}"
        image="/logo.png"${priceAttr}
      />
`;

  // Insert tracker after the opening div
  const divEndIndex = content.indexOf('>', returnMatch.index + returnMatch[0].length);
  if (divEndIndex === -1) {
    console.log(`  ❌ Could not find end of opening div tag`);
    return false;
  }

  const insertIndex = divEndIndex + 1;
  content = content.slice(0, insertIndex) + '\n' + trackerComponent + content.slice(insertIndex);

  // Write back to file
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  ✅ Successfully added tracker`);

  return true;
}

// Main execution
console.log('🚀 Adding ProductViewTrackerWrapper to review pages...\n');
console.log(`Total pages to process: ${reviewPages.length}\n`);

let successCount = 0;
let skipCount = 0;
let failCount = 0;

reviewPages.forEach(pagePath => {
  const result = addTrackerToPage(pagePath);
  if (result === true) {
    successCount++;
  } else if (result === 'skip') {
    skipCount++;
  } else {
    failCount++;
  }
});

console.log('\n📊 Summary:');
console.log(`  ✅ Successfully processed: ${successCount}`);
console.log(`  ⏭️  Skipped (already had tracker): ${skipCount}`);
console.log(`  ❌ Failed: ${failCount}`);
console.log(`\n✨ Done!`);
