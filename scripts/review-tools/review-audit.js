#!/usr/bin/env node

/**
 * Review Audit Script
 *
 * Analyzes a review and reports what needs fixing
 * Usage: node scripts/review-tools/review-audit.js <review-slug>
 */

const {
  reviewExists,
  readReview,
  countWords,
  hasImport,
  hasProductData,
  findRawAffiliateLinks,
  findUnescapedApostrophes,
  hasSection,
  findSpecificPrices,
  formatHeader,
  formatError,
  formatWarning,
  formatSuccess,
  formatInfo
} = require('./utils');

function auditReview(slug) {
  console.log(formatHeader(`📊 Review Audit: ${slug}`));

  // Check if review exists
  if (!reviewExists(slug)) {
    console.log(formatError(`Review not found: ${slug}`));
    console.log('\nAvailable reviews:');
    const { getAllReviewSlugs } = require('./utils');
    getAllReviewSlugs().forEach(s => console.log(`  - ${s}`));
    process.exit(1);
  }

  const content = readReview(slug);
  const wordCount = countWords(content);

  const results = {
    wordCount,
    critical: [],
    missing: [],
    good: []
  };

  // Word Count Analysis
  console.log(`\n📈 Word Count: ${wordCount} words`, end='');
  if (wordCount < 1500) {
    console.log(formatError(' (CRITICAL: Under 1,500)'));
    results.critical.push(`Word count too low: ${wordCount}`);
    console.log(`   NEEDS: ${2500 - wordCount} more words for Tier 2 minimum`);
  } else if (wordCount < 2500) {
    console.log(formatWarning(' (NEEDS: ' + (2500 - wordCount) + ' more for Tier 2)'));
  } else if (wordCount < 3500) {
    console.log(formatSuccess(' (Tier 2 quality)'));
    results.good.push('Word count meets Tier 2');
  } else {
    console.log(formatSuccess(' (Tier 1 quality)'));
    results.good.push('Word count meets Tier 1');
  }

  // Critical Issues
  console.log('\n❌ CRITICAL ISSUES:');
  let hasCritical = false;

  // Check imports
  const requiredImports = {
    'AffiliateButton': 'import AffiliateButton',
    'generateProductReviewSchema': 'import { generateProductReviewSchema }',
    'FTCDisclosure': 'import FTCDisclosure',
    'Tier2Badge|Tier1Badge': 'import { Tier2Badge } or { Tier1Badge }',
    'Link': 'import Link'
  };

  Object.entries(requiredImports).forEach(([pattern, description]) => {
    const hasIt = pattern.includes('|')
      ? pattern.split('|').some(p => hasImport(content, p))
      : hasImport(content, pattern);

    if (!hasIt) {
      console.log(formatError(`  Missing: ${description}`));
      results.critical.push(`Missing import: ${description}`);
      hasCritical = true;
    }
  });

  // Check productData
  if (!hasProductData(content)) {
    console.log(formatError('  Missing: const productData object'));
    results.critical.push('Missing productData object');
    hasCritical = true;
  } else {
    results.good.push('Has productData object');
  }

  // Check for raw affiliate links
  const rawLinks = findRawAffiliateLinks(content);
  if (rawLinks.length > 0) {
    console.log(formatError(`  Found ${rawLinks.length} raw affiliate links (need AffiliateButton)`));
    rawLinks.slice(0, 3).forEach(link => {
      console.log(`    Line ${link.line}: ${link.content.substring(0, 60)}...`);
    });
    if (rawLinks.length > 3) {
      console.log(`    ... and ${rawLinks.length - 3} more`);
    }
    results.critical.push(`${rawLinks.length} raw affiliate links`);
    hasCritical = true;
  } else {
    results.good.push('No raw affiliate links (using AffiliateButton)');
  }

  // Check for unescaped apostrophes
  const apostrophes = findUnescapedApostrophes(content);
  if (apostrophes.length > 0) {
    console.log(formatError(`  Found ${apostrophes.length} unescaped apostrophes (will break build!)`));
    apostrophes.slice(0, 3).forEach(issue => {
      console.log(`    Line ${issue.line}: "${issue.pattern}" in: ${issue.content.substring(0, 50)}...`);
    });
    if (apostrophes.length > 3) {
      console.log(`    ... and ${apostrophes.length - 3} more`);
    }
    results.critical.push(`${apostrophes.length} unescaped apostrophes`);
    hasCritical = true;
  } else {
    results.good.push('No unescaped apostrophes');
  }

  // Check for specific prices
  const prices = findSpecificPrices(content);
  if (prices.length > 0) {
    console.log(formatWarning(`  Found ${prices.length} specific price mentions`));
    prices.slice(0, 2).forEach(issue => {
      console.log(`    Line ${issue.line}: ${issue.content.substring(0, 60)}...`);
    });
    results.critical.push(`${prices.length} specific prices (should be generic)`);
    hasCritical = true;
  } else {
    results.good.push('No specific prices');
  }

  if (!hasCritical) {
    console.log(formatSuccess('  None! 🎉'));
  }

  // Missing Sections
  console.log('\n⚠️  MISSING SECTIONS:');
  const requiredSections = {
    'testimonials': 'Customer Testimonials',
    'cost-analysis': 'Cost-Per-Use Analysis',
    'performance': 'Performance Metrics',
    'specs': 'Specifications Table',
    'comparison': 'Competitor Comparison',
    'faq': 'FAQ Section'
  };

  let hasMissing = false;
  Object.entries(requiredSections).forEach(([id, name]) => {
    if (!hasSection(content, id)) {
      console.log(formatWarning(`  - ${name}`));
      results.missing.push(name);
      hasMissing = true;
    } else {
      results.good.push(`Has ${name}`);
    }
  });

  // Check for Quick Navigation
  if (!content.includes('Quick Navigation')) {
    console.log(formatWarning('  - Quick Navigation menu'));
    results.missing.push('Quick Navigation');
    hasMissing = true;
  } else {
    results.good.push('Has Quick Navigation');
  }

  // Check for structured data schemas
  if (!content.includes('generateProductReviewSchema') ||
      !content.includes('generateBreadcrumbSchema')) {
    console.log(formatWarning('  - Structured Data Schemas'));
    results.missing.push('Structured Data Schemas');
    hasMissing = true;
  } else {
    results.good.push('Has Structured Data Schemas');
  }

  if (!hasMissing) {
    console.log(formatSuccess('  None! All sections present 🎉'));
  }

  // What's Good
  if (results.good.length > 0) {
    console.log('\n✅ LOOKS GOOD:');
    results.good.forEach(item => {
      console.log(formatSuccess(`  ${item}`));
    });
  }

  // Next Steps
  console.log('\n🎯 NEXT STEPS:');
  if (results.critical.length > 0 || results.missing.length > 0) {
    console.log(formatInfo('  1. Run: npm run review-fix ' + slug));
    console.log(formatInfo('  2. Manually add content: testimonials, cost analysis, specs'));
    console.log(formatInfo('  3. Finally run: npm run review-validate ' + slug));
  } else {
    console.log(formatSuccess('  Review looks complete! Run validation:'));
    console.log(formatInfo('  npm run review-validate ' + slug));
  }

  // Return summary for batch processing
  return {
    slug,
    wordCount,
    tier: wordCount >= 3500 ? 1 : wordCount >= 2500 ? 2 : 3,
    criticalCount: results.critical.length,
    missingCount: results.missing.length,
    goodCount: results.good.length,
    issues: {
      critical: results.critical,
      missing: results.missing
    }
  };
}

// Run if called directly
if (require.main === module) {
  const slug = process.argv[2];

  if (!slug) {
    console.log('Usage: node review-audit.js <review-slug>');
    console.log('\nExample: node review-audit.js oxo-good-grips-swivel-peeler');
    process.exit(1);
  }

  auditReview(slug);
}

module.exports = { auditReview };
