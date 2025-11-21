#!/usr/bin/env node

/**
 * Updates all ProductViewTrackerWrapper calls to pass complete review data
 * Maps data from the reviews hub to individual review pages
 */

const fs = require('fs');
const path = require('path');

// Review data from the reviews hub page
const allReviews = [
  // TIER 1
  { id: 1, tier: 1, name: 'KitchenAid KSM8990WH Commercial Mixer', slug: 'kitchenaid-ksm8990wh', rating: 4.8, testingPeriod: '18 months at Purple Café', hook: 'Survived 200+ covers nightly. Genuine commercial-grade performance.', category: 'Commercial Equipment' },
  { id: 2, tier: 1, name: 'Vitamix 5200 Blender', slug: 'vitamix-5200', rating: 4.9, testingPeriod: '6 years in restaurant operations', hook: 'Restaurant workhorse. 10-year warranty justified by performance.', category: 'Blenders' },
  { id: 3, tier: 1, name: 'Robot Coupe R2 Dice Food Processor', slug: 'robot-coupe-r2-dice', rating: 4.7, testingPeriod: '5 years commercial use', hook: 'Commercial power. Prep time reduced by 60% vs manual.', category: 'Food Processors' },
  { id: 4, tier: 1, name: 'Victorinox Fibrox 8" Chef Knife', slug: 'victorinox-fibrox-8-inch-chefs-knife', rating: 4.8, testingPeriod: '15 years professional use', hook: 'Professional quality at accessible price. My daily knife.', category: 'Knives' },
  { id: 5, tier: 1, name: 'Wusthof Classic Ikon 16 Piece Set', slug: 'wusthof-classic-ikon-16-piece', rating: 4.7, testingPeriod: 'Years at Purple Café', hook: 'Premium German steel. Professional performance.', category: 'Knife Sets' },
  { id: 6, tier: 1, name: 'Victorinox Fibrox 10" Chef Knife', slug: 'victorinox-fibrox-10-inch-chefs-knife', rating: 4.7, testingPeriod: 'Professional kitchen tested', hook: 'Longer blade for high-volume prep. Restaurant standard.', category: 'Knives' },
  { id: 7, tier: 1, name: 'Diamond Crystal Kosher Salt', slug: 'diamond-crystal-kosher-salt', rating: 4.9, testingPeriod: '24 years (6 Purple Café + 18 home)', hook: 'Professional chef standard. Clean flavor, perfect texture.', category: 'Ingredients' },
  { id: 8, tier: 1, name: 'Norton IM200 Tri-Stone Sharpener', slug: 'norton-im200-tri-stone-sharpener', rating: 4.6, testingPeriod: 'Years of professional use', hook: 'Professional sharpening system. Restaurant-grade edge.', category: 'Knife Care' },
  { id: 9, tier: 1, name: 'Bodum Chambord French Press', slug: 'bodum-chambord-french-press', rating: 4.5, testingPeriod: 'Years at Purple Café', hook: 'Restaurant coffee standard. Simple, reliable design.', category: 'Coffee' },
  { id: 10, tier: 1, name: 'Victorinox Offset Bread Knife', slug: 'victorinox-offset-bread-knife', rating: 4.6, testingPeriod: 'Professional kitchen tested', hook: 'Offset design for clean slicing. Professional ergonomics.', category: 'Knives' },
  { id: 11, tier: 1, name: 'Benriner Large Mandoline', slug: 'benriner-large-mandoline', rating: 5.0, testingPeriod: 'Professional kitchen tested', hook: 'Japanese precision. Professional prep speed.', category: 'Prep Tools' },
  { id: 12, tier: 1, name: 'OXO Good Grips Bench Scraper', slug: 'oxo-good-grips-bench-scraper', rating: 4.7, testingPeriod: 'Daily professional use', hook: 'Most-used tool. Dough handling essential.', category: 'Baking Tools' },
  { id: 13, tier: 1, name: 'OXO Good Grips Swivel Peeler', slug: 'oxo-good-grips-swivel-peeler', rating: 4.6, testingPeriod: 'Years of professional prep', hook: 'Sharp blade. Comfortable grip. Prep station standard.', category: 'Prep Tools' },
  { id: 14, tier: 1, name: 'Victorinox 4" Paring Knife', slug: 'victorinox-4-inch-paring-knife', rating: 4.6, testingPeriod: 'Professional kitchen tested', hook: 'Precision work. Professional quality at budget price.', category: 'Knives' },
  { id: 15, tier: 1, name: 'Victorinox Granton Edge Boning Knife', slug: 'victorinox-granton-edge-boning-knife', rating: 4.5, testingPeriod: 'Professional butchering tested', hook: 'Granton edge reduces drag. Professional precision.', category: 'Knives' },
  { id: 16, tier: 1, name: 'ZUPERIA Bar Mops', slug: 'zuperia-bar-mops', rating: 4.8, testingPeriod: 'Years at Purple Café', hook: 'Industry standard. 100% ring spun cotton. Restaurant grade.', category: 'Kitchen Textiles' },

  // TIER 2
  { id: 17, tier: 2, testingPeriod: '10 Years', name: 'Le Creuset 7.25-Qt Dutch Oven', slug: 'le-creuset-signature-7-25-qt-dutch-oven', rating: 4.9, hook: 'Buy-it-for-life cookware. Zero staining after a decade.', category: 'Cookware' },
  { id: 18, tier: 2, testingPeriod: '18 Years', name: 'John Boos Platinum Cutting Board', slug: 'john-boos-platinum-commercial-cutting-board', rating: 4.8, hook: 'Commercial-grade maple. Used managing $80K+ operations.', category: 'Cutting Boards' },
  { id: 19, tier: 2, testingPeriod: '12 Years', name: 'Lodge Cast Iron 3-Skillet Bundle', slug: 'lodge-seasoned-cast-iron-3-skillet-bundle', rating: 4.7, hook: 'Generational cookware at 1/5 Le Creuset price.', category: 'Cookware' },
  { id: 20, tier: 2, testingPeriod: '8 Years', name: 'KitchenAid KP26M1XLC Professional 600', slug: 'kitchenaid-kp26m1xlc-professional-600', rating: 4.6, hook: 'Home baker favorite. Powerful 575-watt motor.', category: 'Mixers' },
  { id: 21, tier: 2, testingPeriod: '9 Years', name: 'Nordic Ware Half Sheet Pan', slug: 'nordic-ware-half-sheet-pan', rating: 4.7, hook: 'Never warped. Even browning for 9 years straight.', category: 'Bakeware' },
  { id: 22, tier: 2, testingPeriod: '7 Years', name: 'Cuisinart DLC-10C Classic Food Processor', slug: 'cuisinart-dlc-10c-classic-food-processor', rating: 4.5, hook: 'Home kitchen workhorse. Reliable performance.', category: 'Food Processors' },
  { id: 23, tier: 2, testingPeriod: '5 Years', name: 'Black+Decker Toaster Oven', slug: 'black-decker-toaster-oven', rating: 4.4, hook: 'Budget-friendly. Reliable everyday performance.', category: 'Small Appliances' },
  { id: 24, tier: 2, testingPeriod: '6 Years', name: 'Epicurean Kitchen Cutting Board', slug: 'epicurean-kitchen-cutting-board', rating: 4.5, hook: 'Composite material. Dishwasher-safe convenience.', category: 'Cutting Boards' },
  { id: 25, tier: 2, testingPeriod: '8 Years', name: 'Winco Heavy Duty Tongs', slug: 'winco-heavy-duty-tongs', rating: 4.6, hook: 'Locking mechanism works. Durable stainless steel.', category: 'Utensils' },
  { id: 26, tier: 2, testingPeriod: '6 Months', name: 'Cuisinart High Impact 8" Nonstick Pan', slug: 'cuisinart-8-inch-nonstick-pan', rating: 4.7, hook: 'Perfect for eggs. Even heat distribution. Ideal for single servings.', category: 'Cookware' },
  { id: 27, tier: 2, testingPeriod: '5 Years', name: 'Method All-Purpose Cleaner', slug: 'method-all-purpose-cleaner', rating: 4.8, hook: 'The unicorn of cleaners. Powerful AND non-toxic. Cuts grease effortlessly.', category: 'Cleaning' }
];

// Create a lookup map by slug
const reviewMap = {};
allReviews.forEach(review => {
  reviewMap[review.slug] = review;
});

// Find all review page files
const reviewsDir = path.join(__dirname, '../app/reviews');
const reviewDirs = fs.readdirSync(reviewsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

let updated = 0;
let skipped = 0;

reviewDirs.forEach(slug => {
  const pagePath = path.join(reviewsDir, slug, 'page.tsx');

  if (!fs.existsSync(pagePath)) {
    console.log(`⚠️  Skipping ${slug}: page.tsx not found`);
    skipped++;
    return;
  }

  const reviewData = reviewMap[slug];
  if (!reviewData) {
    console.log(`⚠️  Skipping ${slug}: no matching review data found`);
    skipped++;
    return;
  }

  let content = fs.readFileSync(pagePath, 'utf8');

  // Check if ProductViewTrackerWrapper exists
  if (!content.includes('ProductViewTrackerWrapper')) {
    console.log(`⚠️  Skipping ${slug}: no ProductViewTrackerWrapper found`);
    skipped++;
    return;
  }

  // Try to replace ProductViewTrackerWrapper - handle multiple patterns
  const patterns = [
    // Pattern 1: Using productData variables with price
    /<ProductViewTrackerWrapper\s+slug=\{productData\.slug\}\s+name=\{productData\.name\}\s+image=\{productData\.images\.primary\}\s+price=\{productData\.priceRange\.min\}\s+\/>/g,

    // Pattern 2: Using hardcoded string values with price
    /<ProductViewTrackerWrapper\s+slug="[^"]+"\s+name="[^"]+"\s+image="[^"]+"\s+price=\{[^}]+\}\s+\/>/g,

    // Pattern 3: Using hardcoded string values without price
    /<ProductViewTrackerWrapper\s+slug="[^"]+"\s+name="[^"]+"\s+image="[^"]+"\s+\/>/g,
  ];

  const newTrackerCall = `<ProductViewTrackerWrapper
        slug={productData.slug}
        name={productData.name}
        tier={${reviewData.tier}}
        testingPeriod="${reviewData.testingPeriod}"
        rating={${reviewData.rating}}
        hook="${reviewData.hook.replace(/"/g, '\\"')}"
        category="${reviewData.category}"
      />`;

  let matched = false;
  for (const pattern of patterns) {
    if (content.match(pattern)) {
      content = content.replace(pattern, newTrackerCall);
      matched = true;
      break;
    }
  }

  if (matched) {
    fs.writeFileSync(pagePath, content, 'utf8');
    console.log(`✅ Updated ${slug}`);
    updated++;
  } else {
    console.log(`⚠️  Skipping ${slug}: ProductViewTrackerWrapper pattern not found`);
    skipped++;
  }
});

console.log(`\n✨ Done!`);
console.log(`✅ Updated: ${updated} files`);
console.log(`⚠️  Skipped: ${skipped} files`);
