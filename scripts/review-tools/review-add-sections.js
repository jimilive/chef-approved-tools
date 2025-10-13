#!/usr/bin/env node

/**
 * Review Add Sections Script
 *
 * Adds TODO section templates for content expansion
 * Usage: node scripts/review-tools/review-add-sections.js <review-slug>
 */

const {
  reviewExists,
  readReview,
  writeReview,
  createBackup,
  hasSection,
  formatHeader,
  formatSuccess,
  formatInfo
} = require('./utils');

function addSectionsToReview(slug) {
  console.log(formatHeader(`📝 Adding Sections: ${slug}`));
  console.log(formatInfo('(Content templates with TODOs)\n'));

  if (!reviewExists(slug)) {
    console.error('Review not found:', slug);
    process.exit(1);
  }

  // Create backup
  const backupPath = createBackup(slug);
  console.log(formatSuccess(`Created backup: ${backupPath.split('/').pop()}\n`));

  let content = readReview(slug);
  const added = [];

  // Add missing sections
  if (!hasSection(content, 'testimonials')) {
    content = addTestimonialsSection(content);
    added.push('Customer Testimonials');
  }

  if (!hasSection(content, 'cost-analysis')) {
    content = addCostAnalysisSection(content);
    added.push('Cost-Per-Use Analysis');
  }

  if (!hasSection(content, 'performance')) {
    content = addPerformanceSection(content);
    added.push('Performance Metrics');
  }

  if (!hasSection(content, 'specs')) {
    content = addSpecsSection(content);
    added.push('Specifications Table');
  }

  if (!hasSection(content, 'comparison')) {
    content = addComparisonSection(content);
    added.push('Competitor Comparison');
  }

  if (!hasSection(content, 'faq')) {
    content = addFAQSection(content);
    added.push('FAQ Section');
  }

  // Add Quick Navigation if missing
  if (!content.includes('Quick Navigation')) {
    content = addQuickNavigation(content);
    added.push('Quick Navigation');
  }

  if (added.length > 0) {
    writeReview(slug, content);
    console.log(formatSuccess('✅ Added section templates:'));
    added.forEach(section => {
      console.log(`  + ${section}`);
    });
    console.log('');

    console.log(formatHeader('🎯 NEXT STEPS'));
    console.log(formatInfo('Open the file and search for "TODO":'));
    console.log(formatSuccess(`  code app/reviews/${slug}/page.tsx`));
    console.log('');
    console.log(formatInfo('Fill in:'));
    console.log(formatInfo('  1. 6-8 customer testimonials (from real Amazon reviews)'));
    console.log(formatInfo('  2. Cost-per-use calculations'));
    console.log(formatInfo('  3. Performance data from your testing'));
    console.log(formatInfo('  4. Product specifications'));
    console.log(formatInfo('  5. Competitor comparison (2-3 alternatives)'));
    console.log(formatInfo('  6. 8+ FAQ items'));
    console.log('');
    console.log(formatInfo('Then validate:'));
    console.log(formatSuccess(`  npm run review-validate ${slug}`));
  } else {
    console.log(formatSuccess('✅ All sections already present!\n'));
    console.log(formatInfo('Review already has all required sections.'));
  }

  return { slug, added };
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

function addFAQSection(content) {
  const template = `

        {/* TODO: Add 8+ FAQ items */}
        <section className="mb-12" id="faq">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">

            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 className="text-lg font-bold text-slate-900 mb-2" itemProp="name">
                  TODO: Question 1?
                </h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p className="text-slate-700" itemProp="text">
                    TODO: Detailed answer with your professional experience
                  </p>
                </div>
              </div>
              {/* TODO: Add 7+ more FAQ items */}
            </div>
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

function insertBeforeClosing(content, template) {
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
    console.log('Usage: node review-add-sections.js <review-slug>');
    console.log('\nExample: node review-add-sections.js oxo-good-grips-swivel-peeler');
    process.exit(1);
  }

  addSectionsToReview(slug);
}

module.exports = { addSectionsToReview };
