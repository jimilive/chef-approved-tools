#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');

const API_KEY = process.env.PAGESPEED_API_KEY;
if (!API_KEY) {
  console.error('Error: PAGESPEED_API_KEY not found in .env.local');
  process.exit(1);
}

const BASE_URL = 'https://www.chefapprovedtools.com';

// All pages (excluding admin and test pages)
const ALL_PAGES = [
  '/',
  '/about',
  '/appliances',
  '/blog',
  '/blog/bacon-but-not-in-this-dish',
  '/blog/benefits-cooking-with-garlic',
  '/blog/best-scrambled-eggs',
  '/blog/blanching-vegetables-why-restaurants-do-it',
  '/blog/bleach-vs-sanitation-solution',
  '/blog/braising-101-tough-cuts-made-tender',
  '/blog/bread-science-gluten-development',
  '/blog/caramelization-science',
  '/blog/caramelizing-onions-why-it-takes-45-minutes',
  '/blog/carbon-footprint-kitchen-equipment-buy-once-cry-once',
  '/blog/carbon-steel-vs-stainless-steel-knife',
  '/blog/cast-iron-seasoning-care',
  '/blog/cast-iron-vs-carbon-steel-pan',
  '/blog/cheese-sauce-mac-and-cheese',
  '/blog/complete-guide-to-salts',
  '/blog/complete-victorinox-knife-lineup-comparison',
  '/blog/cooking-with-tomatoes-fresh-vs-canned',
  '/blog/cookware-materials-explained',
  '/blog/cutting-board-materials-guide',
  '/blog/cutting-storing-fresh-herbs',
  '/blog/deglazing-pan-sauces',
  '/blog/dutch-oven-size-guide-which-quart-size',
  '/blog/dutch-oven-vs-slow-cooker',
  '/blog/essential-knife-cuts-every-cook-should-master',
  '/blog/fat-is-flavor',
  '/blog/food-processor-vs-blender',
  '/blog/gas-vs-induction-cooktop',
  '/blog/guide-cooking-oils-smoke-points',
  '/blog/hand-washing-kitchen',
  '/blog/hidden-secrets-of-brining',
  '/blog/hotel-pan-system-restaurant-organization-home',
  '/blog/how-to-choose-first-chef-knife',
  '/blog/how-to-clean-burnt-stainless-steel-pans',
  '/blog/how-to-cook-perfect-pasta',
  '/blog/how-to-make-marinara-sauce',
  '/blog/how-to-make-perfect-french-press-coffee',
  '/blog/how-to-make-perfect-risotto',
  '/blog/how-to-make-roux',
  '/blog/how-to-preheat-a-pan',
  '/blog/how-to-prep-and-grill-asparagus',
  '/blog/how-to-sear-steaks-like-restaurant-chef',
  '/blog/how-to-sharpen-with-tri-stone',
  '/blog/how-to-steel-a-knife',
  '/blog/how-to-store-raw-foods-safely',
  '/blog/how-to-use-pizza-stone',
  '/blog/how-to-wash-lettuce',
  '/blog/hydration-health-water-intake',
  '/blog/immersion-blender-vs-countertop-blender',
  '/blog/kitchen-gloves-guide',
  '/blog/kitchen-starter-kit-first-5-tools',
  '/blog/kitchen-thermometers-guide',
  '/blog/kitchen-tools-wasting-money',
  '/blog/knife-safety-rules-professional-kitchens',
  '/blog/knife-skills-how-to-hold-chef-knife',
  '/blog/knife-storage-protecting-blades-for-decades',
  '/blog/magic-of-freshly-ground-pepper',
  '/blog/maillard-reaction-browning-flavor',
  '/blog/making-stock-professional-chef-method',
  '/blog/meal-prep-station-setup-restaurant-efficiency',
  '/blog/meat-cooking-temperatures-thermometers',
  '/blog/mis-en-place-professional-cooking',
  '/blog/nonstick-vs-stainless-steel-pans',
  '/blog/onions-cooking-guide',
  '/blog/oxidization-effect-on-food',
  '/blog/paring-knife-vs-chefs-knife',
  '/blog/potatoes-cooking-guide',
  '/blog/reducing-sauces-restaurant-technique',
  '/blog/sheet-pan-cooking-restaurant-techniques',
  '/blog/stainless-steel-why-food-sticks',
  '/blog/stand-mixer-buying-guide',
  '/blog/stand-mixer-vs-hand-mixer',
  '/blog/stock-vs-broth-vs-bouillon',
  '/blog/understanding-acids-cooking',
  '/blog/understanding-cooking-fats',
  '/blog/understanding-umami-fifth-taste',
  '/blog/vegetable-roasting-guide',
  '/blog/victorinox-8-inch-vs-10-inch-chefs-knife',
  '/blog/victorinox-budget-vs-wusthof-premium-knives',
  '/blog/what-is-braising',
  '/blog/what-is-emulsification',
  '/blog/what-is-mirepoix',
  '/blog/what-is-velveting',
  '/blog/why-children-hate-broccoli',
  '/blog/why-cook-chicken-wings-longer',
  '/blog/why-cooking-science-matters',
  '/blog/why-professional-chefs-use-kosher-salt',
  '/blog/why-removing-silverskin-matters',
  '/blog/why-resting-meat-key-cooking',
  '/blog/why-wash-eggs-and-produce',
  '/blog/wood-vs-composite-cutting-board',
  '/chef-approved',
  '/cleaning-maintenance',
  '/contact',
  '/cookie-policy',
  '/cookware',
  '/disclosure',
  '/glossary',
  '/guides',
  '/guides/affordable-kitchen-appliances',
  '/guides/best-budget-chef-knife',
  '/guides/best-chef-knives',
  '/guides/best-cookware',
  '/guides/best-knife-for-cutting-meat',
  '/guides/cookware-materials',
  '/guides/kitchen-appliances',
  '/guides/knife-care',
  '/impact-verification',
  '/kitchen-bundle',
  '/knives',
  '/moving-stirring',
  '/newsletter',
  '/prep-tools',
  '/privacy-policy',
  '/review-tiers',
  '/reviews',
  '/reviews/benriner-large-mandoline',
  '/reviews/black-decker-toaster-oven',
  '/reviews/bodum-chambord-french-press',
  '/reviews/cuisinart-8-inch-nonstick-pan',
  '/reviews/cuisinart-dlc-10c-classic-food-processor',
  '/reviews/diamond-crystal-kosher-salt',
  '/reviews/epicurean-kitchen-cutting-board',
  '/reviews/henckels-sharpening-steel',
  '/reviews/instant-pot-duo-plus-6qt',
  '/reviews/japanese-wooden-spoon-set',
  '/reviews/john-boos-platinum-commercial-cutting-board',
  '/reviews/kitchenaid-kp26m1xlc-professional-600',
  '/reviews/kitchenaid-ksm8990wh',
  '/reviews/large-metal-hotel-pans',
  '/reviews/large-plastic-hotel-pans',
  '/reviews/le-creuset-signature-7-25-qt-dutch-oven',
  '/reviews/lodge-seasoned-cast-iron-3-skillet-bundle',
  '/reviews/method-all-purpose-cleaner',
  '/reviews/ninja-air-fryer-af101',
  '/reviews/ninja-bl660-professional-blender',
  '/reviews/nordic-ware-half-sheet-pan',
  '/reviews/norton-im200-tri-stone-sharpener',
  '/reviews/oxo-good-grips-bench-scraper',
  '/reviews/oxo-good-grips-swivel-peeler',
  '/reviews/robot-coupe-r2-dice',
  '/reviews/rubbermaid-commercial-cooks-scraper',
  '/reviews/small-metal-hotel-pans',
  '/reviews/small-plastic-hotel-pans',
  '/reviews/victorinox-4-inch-paring-knife',
  '/reviews/victorinox-fibrox-10-inch-chefs-knife',
  '/reviews/victorinox-fibrox-8-inch-chefs-knife',
  '/reviews/victorinox-granton-edge-boning-knife',
  '/reviews/victorinox-offset-bread-knife',
  '/reviews/vitamix-5200-professional-blender',
  '/reviews/winco-heavy-duty-tongs',
  '/reviews/wusthof-classic-ikon-16-piece',
  '/reviews/zuperia-bar-mops',
  '/terms',
  '/the-tools-that-started-it-all',
];

const CSV_PATH = path.join(process.cwd(), 'reports', 'pagespeed-audit.csv');
const API_BASE = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

async function runPagespeedApi(url, strategy = 'mobile') {
  const categories = ['performance', 'accessibility', 'best-practices', 'seo'].join('&category=');
  const apiUrl = `${API_BASE}?url=${encodeURIComponent(url)}&strategy=${strategy}&category=${categories}&key=${API_KEY}`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  return data.lighthouseResult;
}

function extractScores(result) {
  const categories = result.categories || {};
  const audits = result.audits || {};

  return {
    performance: categories.performance?.score !== null ? Math.round(categories.performance.score * 100) : '',
    accessibility: categories.accessibility?.score !== null ? Math.round(categories.accessibility.score * 100) : '',
    bestPractices: categories['best-practices']?.score !== null ? Math.round(categories['best-practices'].score * 100) : '',
    seo: categories.seo?.score !== null ? Math.round(categories.seo.score * 100) : '',
    fcp: audits['first-contentful-paint']?.numericValue ? Math.round(audits['first-contentful-paint'].numericValue) : '',
    lcp: audits['largest-contentful-paint']?.numericValue ? Math.round(audits['largest-contentful-paint'].numericValue) : '',
    cls: audits['cumulative-layout-shift']?.numericValue !== undefined ? audits['cumulative-layout-shift'].numericValue.toFixed(3) : '',
    tbt: audits['total-blocking-time']?.numericValue ? Math.round(audits['total-blocking-time'].numericValue) : '',
  };
}

async function main() {
  const reportsDir = path.dirname(CSV_PATH);
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  console.log('='.repeat(80));
  console.log('PAGESPEED API AUDIT - All Categories (Mobile + Desktop)');
  console.log('='.repeat(80));
  console.log(`\nAuditing ${ALL_PAGES.length} pages...\n`);

  const results = [];

  for (let i = 0; i < ALL_PAGES.length; i++) {
    const page = ALL_PAGES[i];
    const fullUrl = `${BASE_URL}${page}`;

    console.log(`[${i + 1}/${ALL_PAGES.length}] ${page}`);

    let mobileScores = {};
    let desktopScores = {};
    let error = '';

    // Mobile audit
    try {
      const mobileResult = await runPagespeedApi(fullUrl, 'mobile');
      mobileScores = extractScores(mobileResult);
    } catch (e) {
      error = e.message;
    }

    // Desktop audit
    try {
      const desktopResult = await runPagespeedApi(fullUrl, 'desktop');
      desktopScores = extractScores(desktopResult);
    } catch (e) {
      error = error ? `${error}; ${e.message}` : e.message;
    }

    const result = {
      url: page,
      mobilePerf: mobileScores.performance || '',
      mobileA11y: mobileScores.accessibility || '',
      mobileBP: mobileScores.bestPractices || '',
      mobileSEO: mobileScores.seo || '',
      mobileFCP: mobileScores.fcp || '',
      mobileLCP: mobileScores.lcp || '',
      mobileCLS: mobileScores.cls || '',
      mobileTBT: mobileScores.tbt || '',
      desktopPerf: desktopScores.performance || '',
      desktopA11y: desktopScores.accessibility || '',
      desktopBP: desktopScores.bestPractices || '',
      desktopSEO: desktopScores.seo || '',
      desktopFCP: desktopScores.fcp || '',
      desktopLCP: desktopScores.lcp || '',
      desktopCLS: desktopScores.cls || '',
      desktopTBT: desktopScores.tbt || '',
      error: error,
    };

    results.push(result);

    // Print summary for this page
    const mPerf = mobileScores.performance || 'N/A';
    const mA11y = mobileScores.accessibility || 'N/A';
    const dPerf = desktopScores.performance || 'N/A';
    const dA11y = desktopScores.accessibility || 'N/A';
    console.log(`   Mobile: Perf=${mPerf} A11y=${mA11y} | Desktop: Perf=${dPerf} A11y=${dA11y}`);
  }

  // Write CSV
  const headers = [
    'URL',
    'Mobile Perf', 'Mobile A11y', 'Mobile BP', 'Mobile SEO',
    'Mobile FCP (ms)', 'Mobile LCP (ms)', 'Mobile CLS', 'Mobile TBT (ms)',
    'Desktop Perf', 'Desktop A11y', 'Desktop BP', 'Desktop SEO',
    'Desktop FCP (ms)', 'Desktop LCP (ms)', 'Desktop CLS', 'Desktop TBT (ms)',
    'Error'
  ];

  const csvRows = [headers.join(',')];

  for (const r of results) {
    const row = [
      `"${r.url}"`,
      r.mobilePerf, r.mobileA11y, r.mobileBP, r.mobileSEO,
      r.mobileFCP, r.mobileLCP, r.mobileCLS, r.mobileTBT,
      r.desktopPerf, r.desktopA11y, r.desktopBP, r.desktopSEO,
      r.desktopFCP, r.desktopLCP, r.desktopCLS, r.desktopTBT,
      `"${r.error}"`
    ];
    csvRows.push(row.join(','));
  }

  fs.writeFileSync(CSV_PATH, csvRows.join('\n'));
  console.log(`\nCSV saved to: ${CSV_PATH}`);

  // Print summary
  console.log('\n' + '='.repeat(80));
  console.log('SUMMARY');
  console.log('='.repeat(80));

  const mobileA11yScores = results.map(r => r.mobileA11y).filter(s => s !== '');
  const desktopA11yScores = results.map(r => r.desktopA11y).filter(s => s !== '');
  const mobilePerfScores = results.map(r => r.mobilePerf).filter(s => s !== '');
  const desktopPerfScores = results.map(r => r.desktopPerf).filter(s => s !== '');

  if (mobileA11yScores.length > 0) {
    const avgMobileA11y = Math.round(mobileA11yScores.reduce((a, b) => a + b, 0) / mobileA11yScores.length);
    console.log(`Average Mobile Accessibility: ${avgMobileA11y}`);
  }
  if (desktopA11yScores.length > 0) {
    const avgDesktopA11y = Math.round(desktopA11yScores.reduce((a, b) => a + b, 0) / desktopA11yScores.length);
    console.log(`Average Desktop Accessibility: ${avgDesktopA11y}`);
  }
  if (mobilePerfScores.length > 0) {
    const avgMobilePerf = Math.round(mobilePerfScores.reduce((a, b) => a + b, 0) / mobilePerfScores.length);
    console.log(`Average Mobile Performance: ${avgMobilePerf}`);
  }
  if (desktopPerfScores.length > 0) {
    const avgDesktopPerf = Math.round(desktopPerfScores.reduce((a, b) => a + b, 0) / desktopPerfScores.length);
    console.log(`Average Desktop Performance: ${avgDesktopPerf}`);
  }

  // List pages with low accessibility scores
  const lowA11yPages = results.filter(r => r.mobileA11y && r.mobileA11y < 100);
  if (lowA11yPages.length > 0) {
    console.log(`\nPages with accessibility < 100 (${lowA11yPages.length}):`);
    for (const p of lowA11yPages.sort((a, b) => a.mobileA11y - b.mobileA11y)) {
      console.log(`  ${p.mobileA11y} | ${p.url}`);
    }
  }

  console.log(`\nTotal pages audited: ${results.length}`);
}

main().catch(console.error);
