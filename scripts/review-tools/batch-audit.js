#!/usr/bin/env node

/**
 * Batch Audit Script
 *
 * Audits ALL reviews at once and generates summary report
 * Usage: node scripts/review-tools/batch-audit.js
 */

const {
  getAllReviewSlugs,
  formatHeader,
  formatError,
  formatWarning,
  formatSuccess,
  formatInfo
} = require('./utils');
const { auditReview } = require('./review-audit');

function batchAudit() {
  console.log(formatHeader('📊 Batch Audit Report: All Reviews'));

  const slugs = getAllReviewSlugs();
  console.log(`Found ${slugs.length} reviews to audit\n`);

  const results = [];

  // Audit each review
  slugs.forEach(slug => {
    try {
      const result = auditReview(slug);
      results.push(result);
    } catch (error) {
      console.error(`Error auditing ${slug}:`, error.message);
    }
  });

  // Categorize results
  const critical = results.filter(r => r.wordCount < 1500 || r.criticalCount > 0);
  const needsUpdate = results.filter(r => r.wordCount >= 1500 && (r.missingCount > 0 || r.criticalCount > 0));
  const complete = results.filter(r => r.criticalCount === 0 && r.missingCount === 0 && r.wordCount >= 2500);

  // Sort by word count
  critical.sort((a, b) => a.wordCount - b.wordCount);
  needsUpdate.sort((a, b) => b.missingCount - a.missingCount);

  console.log('\n');
  console.log(formatHeader('🚨 CRITICAL ISSUES (' + critical.length + ' reviews)'));

  if (critical.length > 0) {
    critical.forEach((r, i) => {
      console.log(`${i + 1}. ${r.slug}`);
      console.log(`   ${r.wordCount} words | ${r.criticalCount} critical | ${r.missingCount} missing`);
      if (r.issues.critical.length > 0) {
        console.log(`   Issues: ${r.issues.critical.slice(0, 2).join(', ')}`);
      }
    });
  } else {
    console.log(formatSuccess('None! All reviews meet minimum standards'));
  }

  console.log('\n');
  console.log(formatHeader('⚠️  NEEDS STRUCTURE UPDATE (' + needsUpdate.length + ' reviews)'));

  if (needsUpdate.length > 0) {
    console.log('Good word count but missing new sections:\n');
    needsUpdate.slice(0, 10).forEach((r, i) => {
      console.log(`${i + 1}. ${r.slug} (${r.wordCount} words)`);
      console.log(`   Missing ${r.missingCount} sections: ${r.issues.missing.slice(0, 3).join(', ')}`);
    });
    if (needsUpdate.length > 10) {
      console.log(`\n... and ${needsUpdate.length - 10} more`);
    }
  } else {
    console.log(formatSuccess('None! All reviews have required sections'));
  }

  console.log('\n');
  console.log(formatHeader('✅ COMPLETE (' + complete.length + ' reviews)'));

  if (complete.length > 0) {
    complete.forEach((r, i) => {
      console.log(`  - ${r.slug} ✅ (${r.wordCount} words, Tier ${r.tier})`);
    });
  } else {
    console.log(formatWarning('None yet - all reviews need updates'));
  }

  // Summary Statistics
  console.log('\n');
  console.log(formatHeader('📈 SUMMARY'));

  const totalWords = results.reduce((sum, r) => sum + r.wordCount, 0);
  const avgWords = Math.round(totalWords / results.length);

  const totalCritical = results.reduce((sum, r) => sum + r.criticalCount, 0);
  const totalMissing = results.reduce((sum, r) => sum + r.missingCount, 0);

  const tier1 = results.filter(r => r.tier === 1).length;
  const tier2 = results.filter(r => r.tier === 2).length;
  const tier3 = results.filter(r => r.tier === 3).length;

  console.log(`Total reviews: ${results.length}`);
  console.log(`Average word count: ${avgWords} words`);
  console.log('');
  console.log('Quality Distribution:');
  console.log(`  Tier 1 (3,500+ words): ${tier1} (${Math.round(tier1/results.length*100)}%)`);
  console.log(`  Tier 2 (2,500+ words): ${tier2} (${Math.round(tier2/results.length*100)}%)`);
  console.log(`  Tier 3 (<2,500 words): ${tier3} (${Math.round(tier3/results.length*100)}%)`);
  console.log('');
  console.log(`Complete (Tier 2+): ${complete.length}/${results.length} (${Math.round(complete.length/results.length*100)}%)`);
  console.log(`Need critical fixes: ${critical.length}/${results.length} (${Math.round(critical.length/results.length*100)}%)`);
  console.log(`Need structure updates: ${needsUpdate.length}/${results.length} (${Math.round(needsUpdate.length/results.length*100)}%)`);
  console.log('');
  console.log(`Total critical issues: ${totalCritical}`);
  console.log(`Total missing sections: ${totalMissing}`);

  // Recommendations
  console.log('\n');
  console.log(formatHeader('💡 RECOMMENDATION'));

  if (critical.length > 0) {
    console.log('Start with Week 1 critical fixes:\n');
    critical.slice(0, 6).forEach((r, i) => {
      console.log(formatInfo(`  ${i + 1}. npm run review-fix ${r.slug}`));
    });
    console.log('\nThese need both expansion AND structural updates.');
  } else if (needsUpdate.length > 0) {
    console.log('Focus on high-value reviews needing structure updates:\n');
    needsUpdate.slice(0, 5).forEach((r, i) => {
      console.log(formatInfo(`  ${i + 1}. npm run review-fix ${r.slug}`));
    });
  } else {
    console.log(formatSuccess('All reviews are at Tier 2+ quality! 🎉'));
    console.log('\nConsider:');
    console.log('  - Adding more testimonials to existing reviews');
    console.log('  - Expanding Tier 2 reviews to Tier 1');
    console.log('  - Creating new product reviews');
  }

  // Export JSON summary
  const summary = {
    timestamp: new Date().toISOString(),
    totalReviews: results.length,
    complete: complete.length,
    critical: critical.length,
    needsUpdate: needsUpdate.length,
    averageWordCount: avgWords,
    tier1Count: tier1,
    tier2Count: tier2,
    tier3Count: tier3,
    criticalReviews: critical.map(r => r.slug),
    needsUpdateReviews: needsUpdate.map(r => r.slug),
    completeReviews: complete.map(r => r.slug)
  };

  const fs = require('fs');
  const path = require('path');
  const outputPath = path.join(process.cwd(), 'scripts', 'review-tools', 'audit-report.json');
  fs.writeFileSync(outputPath, JSON.stringify(summary, null, 2));

  console.log('\n');
  console.log(formatSuccess(`Detailed report saved to: scripts/review-tools/audit-report.json`));

  return summary;
}

// Run if called directly
if (require.main === module) {
  batchAudit();
}

module.exports = { batchAudit };
