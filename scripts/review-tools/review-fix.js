#!/usr/bin/env node

/**
 * Review Fix Script
 *
 * Automatically fixes mechanical issues in reviews
 * Usage: node scripts/review-tools/review-fix.js <review-slug>
 */

const {
  reviewExists,
  readReview,
  writeReview,
  createBackup,
  hasImport,
  hasProductData,
  findRawAffiliateLinks,
  findUnescapedApostrophes,
  hasSection,
  formatHeader,
  formatSuccess,
  formatInfo,
  formatWarning
} = require('./utils');

const REQUIRED_IMPORTS = `import { Tier2Badge } from '@/components/ReviewTierBadge';
import FTCDisclosure from '@/components/FTCDisclosure';
import AffiliateButton from '@/components/AffiliateButton';
import { generateProductReviewSchema, generateBreadcrumbSchema } from '@/lib/schema';
import Link from 'next/link';
import type { Metadata } from 'next';`;

const PRODUCTDATA_TEMPLATE = `
const productData = {
  name: "TODO: Full Product Name",
  slug: "SLUG_PLACEHOLDER",
  brand: "TODO: Brand Name",
  model: "TODO: MODEL-NUMBER",
  category: "TODO: Category", // e.g., "Chef Knives", "Cookware"
  priceRange: {
    min: 50, // TODO: typical low price
    max: 100, // TODO: typical high price
    currency: "USD"
  },
  rating: 5.0, // TODO: your rating (1.0-5.0)
  reviewCount: 1,
  pros: [
    "TODO: Specific pro #1 with measurable detail",
    "TODO: Specific pro #2",
    "TODO: Specific pro #3",
    "TODO: Specific pro #4"
  ],
  cons: [
    "TODO: Specific con #1",
    "TODO: Specific con #2",
    "TODO: Specific con #3"
  ],
  affiliateLinks: [{
    retailer: "Amazon",
    url: "TODO: Amazon affiliate URL"
  }],
  expertRating: 5.0,
  expertOpinion: "TODO: One powerful sentence summarizing verdict after X years of testing",
  dateAdded: "2025-01-15",
  lastUpdated: new Date().toISOString().split('T')[0]
};

const breadcrumbs = [
  { name: "Home", url: "https://www.chefapprovedtools.com" },
  { name: "Reviews", url: "https://www.chefapprovedtools.com/reviews" },
  { name: productData.name, url: \`https://www.chefapprovedtools.com/reviews/\${productData.slug}\` }
];
`;

function fixReview(slug, options = {}) {
  console.log(formatHeader(`🔧 Fixing Review: ${slug}`));

  if (!reviewExists(slug)) {
    console.error('Review not found:', slug);
    process.exit(1);
  }

  // Create backup
  const backupPath = createBackup(slug);
  console.log(formatSuccess(`Created backup: ${backupPath.split('/').pop()}\n`));

  let content = readReview(slug);
  let changes = [];

  // 1. Add missing imports
  if (!hasAllRequiredImports(content)) {
    console.log(formatInfo('Adding missing imports...'));
    content = addImports(content);
    changes.push('Added missing imports');
    console.log(formatSuccess('✅ Added imports:'));
    console.log('  + import { Tier2Badge }');
    console.log('  + import FTCDisclosure');
    console.log('  + import AffiliateButton');
    console.log('  + import { generateProductReviewSchema, generateBreadcrumbSchema }');
    console.log('  + import Link\n');
  } else {
    console.log(formatSuccess('✅ All required imports already present\n'));
  }

  // 2. Add productData if missing
  if (!hasProductData(content)) {
    console.log(formatInfo('Creating productData skeleton...'));
    const lineNumber = findInsertionPoint(content);
    content = addProductData(content, slug);
    changes.push('Added productData skeleton');
    console.log(formatSuccess(`✅ Created productData skeleton at line ~${lineNumber}`));
    console.log(formatWarning('   → TODO: Fill in brand, model, specs, pros, cons\n'));
  } else {
    console.log(formatSuccess('✅ productData object already exists\n'));
  }

  // 3. Fix unescaped apostrophes
  const apostrophes = findUnescapedApostrophes(content);
  if (apostrophes.length > 0) {
    console.log(formatInfo(`Fixing ${apostrophes.length} unescaped apostrophes...`));
    content = fixApostrophes(content);
    changes.push(`Fixed ${apostrophes.length} apostrophes`);
    console.log(formatSuccess(`✅ Fixed ${apostrophes.length} unescaped apostrophes\n`));
  } else {
    console.log(formatSuccess('✅ No unescaped apostrophes found\n'));
  }

  // 4. Convert raw affiliate links to AffiliateButton
  const rawLinks = findRawAffiliateLinks(content);
  if (rawLinks.length > 0) {
    console.log(formatInfo(`Converting ${rawLinks.length} affiliate links...`));
    const result = convertAffiliateLinks(content);
    content = result.content;
    changes.push(`Converted ${rawLinks.length} affiliate links`);
    console.log(formatSuccess(`✅ Converted ${rawLinks.length} affiliate links:`));
    result.conversions.forEach(c => {
      console.log(`  - Line ${c.line}: <a> → <AffiliateButton position="${c.position}">`);
    });
    console.log('');
  } else {
    console.log(formatSuccess('✅ No raw affiliate links (already using AffiliateButton)\n'));
  }

  // 5. Add missing sections
  const sections = addMissingSections(content, slug);
  if (sections.added.length > 0) {
    content = sections.content;
    console.log(formatSuccess('✅ Added section templates:'));
    sections.added.forEach(section => {
      console.log(`  + ${section.name} (line ~${section.line})`);
    });
    changes.push(`Added ${sections.added.length} sections`);
    console.log('');
  } else {
    console.log(formatSuccess('✅ All required sections already present\n'));
  }

  // 6. Add Quick Navigation if missing
  if (!content.includes('Quick Navigation')) {
    console.log(formatInfo('Adding Quick Navigation...'));
    content = addQuickNavigation(content);
    changes.push('Added Quick Navigation');
    console.log(formatSuccess('✅ Added Quick Navigation\n'));
  } else {
    console.log(formatSuccess('✅ Quick Navigation already present\n'));
  }

  // 7. Add structured data schemas if missing
  if (!content.includes('generateProductReviewSchema')) {
    console.log(formatInfo('Adding structured data schemas...'));
    content = addSchemas(content);
    changes.push('Added structured data schemas');
    console.log(formatSuccess('✅ Added structured data schemas (ProductReview + Breadcrumb)\n'));
  } else {
    console.log(formatSuccess('✅ Structured data schemas already present\n'));
  }

  // Write the fixed content
  writeReview(slug, content);

  // Summary
  console.log(formatHeader('🎯 NEXT STEPS'));
  console.log('Review file and fill in TODO sections:');
  console.log(formatInfo('  1. Update productData object (search for "TODO:")'));
  console.log(formatInfo('  2. Add 6-8 customer testimonials'));
  console.log(formatInfo('  3. Add cost calculations'));
  console.log(formatInfo('  4. Add performance data'));
  console.log(formatInfo('  5. Research and add specs'));
  console.log(formatInfo('  6. Research competitors'));
  console.log('');
  console.log('Then run:');
  console.log(formatSuccess(`  npm run review-validate ${slug}`));

  return { slug, changes };
}

function hasAllRequiredImports(content) {
  return hasImport(content, 'AffiliateButton') &&
         hasImport(content, 'generateProductReviewSchema') &&
         hasImport(content, 'FTCDisclosure');
}

function addImports(content) {
  // Find the first import statement
  const lines = content.split('\n');
  let insertIndex = 0;

  // Find where imports start
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('import ')) {
      insertIndex = i;
      break;
    }
  }

  // Insert after existing imports
  while (insertIndex < lines.length &&
         (lines[insertIndex].trim().startsWith('import ') || lines[insertIndex].trim() === '')) {
    insertIndex++;
  }

  lines.splice(insertIndex, 0, '', REQUIRED_IMPORTS, '');
  return lines.join('\n');
}

function findInsertionPoint(content) {
  const lines = content.split('\n');

  // Find after metadata export
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('export const metadata')) {
      // Find closing of metadata object
      let braceCount = 0;
      for (let j = i; j < lines.length; j++) {
        braceCount += (lines[j].match(/{/g) || []).length;
        braceCount -= (lines[j].match(/}/g) || []).length;
        if (braceCount === 0 && j > i) {
          return j + 1;
        }
      }
    }
  }

  // Otherwise after imports
  for (let i = 0; i < lines.length; i++) {
    if (!lines[i].trim().startsWith('import ') && lines[i].trim() !== '') {
      return i;
    }
  }

  return 10; // fallback
}

function addProductData(content, slug) {
  const insertPoint = findInsertionPoint(content);
  const lines = content.split('\n');

  const template = PRODUCTDATA_TEMPLATE.replace('SLUG_PLACEHOLDER', slug);
  lines.splice(insertPoint, 0, template);

  return lines.join('\n');
}

function fixApostrophes(content) {
  const replacements = [
    ["It's", "It&apos;s"],
    ["don't", "don&apos;t"],
    ["won't", "won&apos;t"],
    ["can't", "can&apos;t"],
    ["I'm", "I&apos;m"],
    ["you're", "you&apos;re"],
    ["we're", "we&apos;re"],
    ["they're", "they&apos;re"],
    ["isn't", "isn&apos;t"],
    ["wasn't", "wasn&apos;t"],
    ["hasn't", "hasn&apos;t"],
    ["haven't", "haven&apos;t"],
    ["hadn't", "hadn&apos;t"],
    ["doesn't", "doesn&apos;t"],
    ["didn't", "didn&apos;t"],
    ["couldn't", "couldn&apos;t"],
    ["shouldn't", "shouldn&apos;t"],
    ["wouldn't", "wouldn&apos;t"]
  ];

  let fixed = content;
  replacements.forEach(([from, to]) => {
    fixed = fixed.replace(new RegExp(from, 'g'), to);
  });

  return fixed;
}

function convertAffiliateLinks(content) {
  const conversions = [];
  let linkCount = 0;

  // Use regex to match entire <a>...</a> blocks with Amazon links
  const affiliateLinkRegex = /<a\s+[^>]*href=["'](https:\/\/(?:www\.amazon\.com|amzn\.to)[^"']+)["'][^>]*>(.*?)<\/a>/gs;

  let result = content;
  let match;
  const matches = [];

  // First, collect all matches
  while ((match = affiliateLinkRegex.exec(content)) !== null) {
    // Skip if already inside AffiliateButton (check context)
    const beforeMatch = content.substring(Math.max(0, match.index - 100), match.index);
    if (beforeMatch.includes('<AffiliateButton')) {
      continue;
    }

    matches.push({
      fullMatch: match[0],
      url: match[1],
      text: match[2],
      index: match.index
    });
  }

  // Replace in reverse order to maintain correct indices
  matches.reverse().forEach(m => {
    linkCount++;

    // Determine position based on location in file
    const linesBeforeMatch = content.substring(0, m.index).split('\n').length;
    const totalLines = content.split('\n').length;

    let position = 'mid_article';
    if (linkCount === matches.length) position = 'above_fold'; // First link found (reversed)
    else if (linesBeforeMatch > totalLines - 200) position = 'final_cta';

    // Extract text content, stripping HTML tags
    const textContent = m.text.replace(/<[^>]+>/g, '').trim() || 'Check Amazon Price →';

    // Detect indentation from the original line
    const lineStart = content.lastIndexOf('\n', m.index) + 1;
    const indent = content.substring(lineStart, m.index).match(/^(\s*)/)[1];

    const replacement = `<AffiliateButton
${indent}  href="${m.url}"
${indent}  merchant="amazon"
${indent}  product="{productData.slug}"
${indent}  position="${position}"
${indent}  variant="${position === 'mid_article' ? 'secondary' : 'primary'}"
${indent}>
${indent}  ${textContent}
${indent}</AffiliateButton>`;

    result = result.substring(0, m.index) + replacement + result.substring(m.index + m.fullMatch.length);

    conversions.push({
      line: linesBeforeMatch,
      position: position === 'above_fold' ? 'above_fold' : position
    });
  });

  // Reverse conversions back to correct order for display
  conversions.reverse();

  return { content: result, conversions };
}

function addMissingSections(content, slug) {
  const added = [];

  // Check what's missing and add templates
  if (!hasSection(content, 'testimonials')) {
    content = addTestimonialsSection(content);
    added.push({ name: 'Customer Testimonials', line: content.split('\n').length });
  }

  if (!hasSection(content, 'cost-analysis')) {
    content = addCostAnalysisSection(content);
    added.push({ name: 'Cost-Per-Use Analysis', line: content.split('\n').length });
  }

  if (!hasSection(content, 'performance')) {
    content = addPerformanceSection(content);
    added.push({ name: 'Performance Metrics', line: content.split('\n').length });
  }

  if (!hasSection(content, 'specs')) {
    content = addSpecsSection(content);
    added.push({ name: 'Specifications Table', line: content.split('\n').length });
  }

  if (!hasSection(content, 'comparison')) {
    content = addComparisonSection(content);
    added.push({ name: 'Competitor Comparison', line: content.split('\n').length });
  }

  return { content, added };
}

function addTestimonialsSection(content) {
  const template = `

        {/* TODO: Add 6-8 customer testimonials */}
        <section className="mb-12" id="testimonials">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">What Real Users Are Saying</h2>
          <p className="text-sm text-slate-600 mb-4 italic">
            Customer reviews curated from Amazon verified purchasers.
          </p>

          <div className="space-y-4">
            {/* TODO: Add testimonial boxes here
                Template for each:
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <p className="text-slate-700 mb-2">
                    &quot;[Customer quote about their experience]&quot;
                  </p>
                  <p className="text-sm text-slate-500">— Amazon verified purchaser (J.D., December 2024)</p>
                </div>
            */}
          </div>
        </section>
`;
  return insertBeforeClosing(content, template);
}

function addCostAnalysisSection(content) {
  const template = `

        {/* TODO: Add cost-per-use analysis */}
        <section className="mb-12" id="cost-analysis">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Cost-Per-Use Analysis</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">

            <div className="bg-blue-50 p-5 rounded-lg border border-blue-200 mb-4">
              <h3 className="font-bold text-slate-900 mb-3">Real-World Value Calculation</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• <strong>Initial cost:</strong> ~$[XXX]</li>
                <li>• <strong>Years of use:</strong> [X] years</li>
                <li>• <strong>Estimated uses:</strong> [XXX+] uses</li>
                <li>• <strong>Cost per use:</strong> $[X.XX] per use</li>
              </ul>
            </div>

            <p className="text-slate-700">
              <strong>Value comparison:</strong> TODO: Compare to alternatives&apos; cost over same period
            </p>
          </div>
        </section>
`;
  return insertBeforeClosing(content, template);
}

function addPerformanceSection(content) {
  const template = `

        {/* TODO: Add performance metrics */}
        <section className="mb-12" id="performance">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Measured Performance Data</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-slate-900 mb-2">TODO: Performance Category</p>
                <p className="text-slate-700 text-sm">
                  <strong>Metric 1:</strong> [Value]<br/>
                  <strong>Metric 2:</strong> [Value]
                </p>
              </div>
            </div>
          </div>
        </section>
`;
  return insertBeforeClosing(content, template);
}

function addSpecsSection(content) {
  const template = `

        {/* TODO: Add specifications */}
        <section className="mb-12" id="specs">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Complete Specifications & Dimensions</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Technical Specifications</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <dt className="text-slate-600">TODO: Spec Name:</dt>
                    <dd className="font-semibold">Value</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Physical Dimensions</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <dt className="text-slate-600">Width:</dt>
                    <dd className="font-semibold">TODO</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>
`;
  return insertBeforeClosing(content, template);
}

function addComparisonSection(content) {
  const template = `

        {/* TODO: Add competitor comparison */}
        <section className="mb-12" id="comparison">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Comparison vs. Competitors
          </h2>

          <div style={{ overflowX: 'auto', margin: '20px 0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Feature</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>This Product</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Competitor 1</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Competitor 2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>Price Range</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>TODO</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>TODO</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>TODO</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
`;
  return insertBeforeClosing(content, template);
}

function addQuickNavigation(content) {
  const nav = `
        {/* Quick Navigation */}
        <nav className="bg-slate-50 p-4 rounded-lg mb-8 border border-slate-200">
          <p className="font-semibold text-slate-900 mb-2">Quick Navigation:</p>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="#testimonials" className="text-orange-600 hover:text-orange-800">User Reviews</a>
            <span className="text-slate-400">|</span>
            <a href="#cost-analysis" className="text-orange-600 hover:text-orange-800">Cost Analysis</a>
            <span className="text-slate-400">|</span>
            <a href="#performance" className="text-orange-600 hover:text-orange-800">Performance</a>
            <span className="text-slate-400">|</span>
            <a href="#comparison" className="text-orange-600 hover:text-orange-800">vs. Competitors</a>
            <span className="text-slate-400">|</span>
            <a href="#specs" className="text-orange-600 hover:text-orange-800">Specifications</a>
            <span className="text-slate-400">|</span>
            <a href="#faq" className="text-orange-600 hover:text-orange-800">FAQ</a>
          </div>
        </nav>
`;

  // Insert after FTC Disclosure or early in content
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('<FTCDisclosure')) {
      lines.splice(i + 1, 0, nav);
      return lines.join('\n');
    }
  }

  // Fallback: insert after first h1
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('<h1')) {
      let j = i;
      while (j < lines.length && !lines[j].includes('</h1>')) j++;
      lines.splice(j + 1, 0, nav);
      return lines.join('\n');
    }
  }

  return content;
}

function addSchemas(content) {
  const schemas = `

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateProductReviewSchema(productData))
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs))
          }}
        />
`;
  return insertBeforeClosing(content, schemas);
}

function insertBeforeClosing(content, template) {
  // Insert before </article> or </div> closing of main component
  const lines = content.split('\n');

  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].includes('</article>') ||
        (lines[i].includes('</div>') && i > lines.length - 20)) {
      lines.splice(i, 0, template);
      return lines.join('\n');
    }
  }

  return content + template;
}

// Run if called directly
if (require.main === module) {
  const slug = process.argv[2];

  if (!slug) {
    console.log('Usage: node review-fix.js <review-slug>');
    console.log('\nExample: node review-fix.js oxo-good-grips-swivel-peeler');
    process.exit(1);
  }

  fixReview(slug);
}

module.exports = { fixReview };
