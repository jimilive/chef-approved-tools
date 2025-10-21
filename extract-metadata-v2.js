const fs = require('fs');
const path = require('path');

const baseUrl = 'https://www.chefapprovedtools.com';

const pages = [
  '/Users/scottbradley/chef-approved-tools/app/about/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/appliances/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/best-budget-chef-knife/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/best-knife-for-cutting-meat/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/blog/best-scrambled-eggs/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/blog/how-to-make-perfect-french-press-coffee/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/blog/how-to-sear-steaks-like-restaurant-chef/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/blog/how-to-sharpen-with-tri-stone/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/blog/how-to-steel-a-knife/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/blog/kitchen-gloves-guide/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/blog/meat-cooking-temperatures-thermometers/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/blog/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/blog/why-professional-chefs-use-kosher-salt/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/contact/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/cookie-policy/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/cookware/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/disclosure/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/glossary/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/guides/affordable-kitchen-appliances/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/guides/best-chef-knives/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/guides/best-cookware/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/guides/cookware-materials/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/guides/kitchen-appliances/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/guides/knife-care/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/guides/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/kitchen-bundle/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/knives/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/methodology/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/newsletter/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/privacy-policy/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/review-tiers/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/reviews/benriner-large-mandoline/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/reviews/black-decker-toaster-oven/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/reviews/bodum-chambord-french-press/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/reviews/cuisinart-8-inch-nonstick-pan/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/reviews/cuisinart-dlc-10c-classic-food-processor/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/reviews/diamond-crystal-kosher-salt/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/reviews/epicurean-kitchen-cutting-board/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/reviews/john-boos-platinum-commercial-cutting-board/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/reviews/kitchenaid-kp26m1xlc-professional-600/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/reviews/kitchenaid-ksm8990wh/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/reviews/le-creuset-signature-7-25-qt-dutch-oven/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/reviews/lodge-seasoned-cast-iron-3-skillet-bundle/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/reviews/method-all-purpose-cleaner/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/reviews/nordic-ware-half-sheet-pan/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/reviews/norton-im200-tri-stone-sharpener/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/reviews/oxo-good-grips-bench-scraper/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/reviews/oxo-good-grips-swivel-peeler/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/reviews/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/reviews/robot-coupe-r2-dice/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/reviews/rubbermaid-commercial-cooks-scraper/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/reviews/victorinox-4-inch-paring-knife/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/reviews/victorinox-fibrox-10-inch-chefs-knife/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/reviews/victorinox-fibrox-8-inch-chefs-knife/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/reviews/victorinox-granton-edge-boning-knife/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/reviews/victorinox-offset-bread-knife/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/reviews/vitamix-5200/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/reviews/winco-heavy-duty-tongs/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/reviews/wusthof-classic-ikon-16-piece/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/reviews/zuperia-bar-mops/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/terms/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/test-conversion/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/test-datalayer/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/test-tracking/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/test/lead-magnet/page.tsx',
  '/Users/scottbradley/chef-approved-tools/app/test/page.tsx'
];

function extractMetadata(filePath) {
  let content = '';

  // Try to read the page file
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error(`Error reading ${filePath}: ${err.message}`);
  }

  // If no metadata found in page.tsx, try layout.tsx in the same directory
  if (!content.includes('export const metadata') && !content.includes('export async function generateMetadata')) {
    const dir = path.dirname(filePath);
    const layoutPath = path.join(dir, 'layout.tsx');

    if (fs.existsSync(layoutPath)) {
      try {
        content = fs.readFileSync(layoutPath, 'utf8');
      } catch (err) {
        console.error(`Error reading ${layoutPath}: ${err.message}`);
      }
    }
  }

  // Extract URL path from file path
  const urlPath = filePath
    .replace('/Users/scottbradley/chef-approved-tools/app', '')
    .replace('/page.tsx', '') || '/';

  const url = baseUrl + urlPath;

  // Determine page type
  let pageType = 'Other';
  if (urlPath === '/') {
    pageType = 'Homepage';
  } else if (urlPath.startsWith('/reviews/') && urlPath !== '/reviews') {
    pageType = 'Product Review';
  } else if (urlPath === '/reviews') {
    pageType = 'Category - Reviews';
  } else if (urlPath.startsWith('/blog/') && urlPath !== '/blog') {
    pageType = 'Blog Post';
  } else if (urlPath === '/blog') {
    pageType = 'Category - Blog';
  } else if (urlPath.startsWith('/guides/') && urlPath !== '/guides') {
    pageType = 'Guide';
  } else if (urlPath === '/guides') {
    pageType = 'Category - Guides';
  } else if (['/knives', '/cookware', '/appliances'].includes(urlPath)) {
    pageType = 'Category';
  } else if (urlPath.startsWith('/test')) {
    pageType = 'Test Page';
  } else if (['/about', '/contact', '/methodology', '/review-tiers'].includes(urlPath)) {
    pageType = 'Informational';
  } else if (['/privacy-policy', '/terms', '/cookie-policy', '/disclosure'].includes(urlPath)) {
    pageType = 'Legal';
  } else if (['/newsletter', '/kitchen-bundle', '/best-budget-chef-knife', '/best-knife-for-cutting-meat', '/glossary'].includes(urlPath)) {
    pageType = 'Landing Page';
  }

  // Extract title
  let title = '';
  const titleMatch = content.match(/title:\s*['"](.*?)['"]/);
  if (titleMatch) {
    title = titleMatch[1];
  }

  // Extract description
  let description = '';
  const descMatch = content.match(/description:\s*['"](.*?)['"]/s);
  if (descMatch) {
    description = descMatch[1].replace(/\n/g, ' ').trim();
  }

  return {
    pageType,
    url,
    path: urlPath,
    filePath,
    title,
    description
  };
}

const results = pages.map(extractMetadata);

// Sort by page type, then by URL
results.sort((a, b) => {
  if (a.pageType !== b.pageType) {
    return a.pageType.localeCompare(b.pageType);
  }
  return a.url.localeCompare(b.url);
});

// Output as TSV for Excel
console.log('Page Type\tURL\tPath\tFile Path\tPage Title\tMeta Description');
results.forEach(r => {
  console.log(`${r.pageType}\t${r.url}\t${r.path}\t${r.filePath}\t${r.title}\t${r.description}`);
});
