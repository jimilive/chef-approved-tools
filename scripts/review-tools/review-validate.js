#!/usr/bin/env node

/**
 * Review Validate Script
 *
 * Runs all quality checks on a review
 * Usage: node scripts/review-tools/review-validate.js <review-slug>
 */

const { execSync } = require('child_process');
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
  findForbiddenPricingPhrases,
  findIncorrectCredentials,
  findForbiddenPhrases,
  formatHeader,
  formatError,
  formatWarning,
  formatSuccess,
  formatInfo
} = require('./utils');

function validateReview(slug) {
  console.log(formatHeader(`🔍 Validating Review: ${slug}`));

  if (!reviewExists(slug)) {
    console.error('Review not found:', slug);
    process.exit(1);
  }

  const content = readReview(slug);
  let issueCount = 0;
  let warningCount = 0;

  // Structure Checks
  console.log('\n📊 STRUCTURE CHECKS:');

  const structureChecks = [
    { test: () => hasImport(content, 'AffiliateButton'), label: 'Has AffiliateButton import' },
    { test: () => hasImport(content, 'generateProductReviewSchema'), label: 'Has schema imports' },
    { test: () => hasImport(content, 'FTCDisclosure'), label: 'Has FTCDisclosure import' },
    { test: () => hasProductData(content), label: 'Has productData object' },
    { test: () => content.includes('const breadcrumbs'), label: 'Has breadcrumbs array' },
    { test: () => content.includes('Quick Navigation'), label: 'Has Quick Navigation' },
    { test: () => findRawAffiliateLinks(content).length === 0, label: 'No raw affiliate links' },
    { test: () => content.includes('generateProductReviewSchema'), label: 'Has ProductReview schema' },
    { test: () => content.includes('generateBreadcrumbSchema'), label: 'Has Breadcrumb schema' }
  ];

  structureChecks.forEach(check => {
    if (check.test()) {
      console.log(formatSuccess(check.label));
    } else {
      console.log(formatError(check.label));
      issueCount++;
    }
  });

  // Component System Checks (for migrated reviews)
  console.log('\n🧩 COMPONENT SYSTEM CHECKS:');
  const componentSystemChecks = [
    { test: () => hasImport(content, 'ReviewHero'), label: 'Has ReviewHero component', optional: true },
    { test: () => hasImport(content, 'TestingResultsGrid'), label: 'Has TestingResultsGrid component', optional: true },
    { test: () => hasImport(content, 'ProsConsGrid'), label: 'Has ProsConsGrid component', optional: true },
    { test: () => hasImport(content, 'WhoShouldBuyGrid'), label: 'Has WhoShouldBuyGrid component', optional: true },
    { test: () => hasImport(content, 'FAQSection'), label: 'Has FAQSection component', optional: true },
    { test: () => hasImport(content, 'EmailCaptureSection'), label: 'Has EmailCaptureSection component', optional: true },
    { test: () => hasImport(content, 'BottomLineSection'), label: 'Has BottomLineSection component', optional: true },
    { test: () => hasImport(content, 'AuthorBio'), label: 'Has AuthorBio component', optional: true }
  ];

  const hasAnyNewComponents = componentSystemChecks.some(check => check.test());

  if (hasAnyNewComponents) {
    console.log(formatInfo('(Migrated to new component system)'));
    componentSystemChecks.forEach(check => {
      if (check.test()) {
        console.log(formatSuccess(check.label));
      } else {
        console.log(formatWarning(check.label + ' (missing)'));
        warningCount++;
      }
    });
  } else {
    console.log(formatInfo('(Legacy review - not yet migrated to component system)'));
  }

  // Content Checks
  console.log('\n📝 CONTENT CHECKS:');

  const wordCount = countWords(content);
  console.log(`Word count: ${wordCount} words`, end='');
  if (wordCount < 2500) {
    console.log(formatWarning(` (Quality indicator: Consider expanding)`));
    warningCount++;
  } else if (wordCount < 3500) {
    console.log(formatSuccess(' (Good depth for Tier 2)'));
  } else {
    console.log(formatSuccess(' (Excellent depth for Tier 1)'));
  }

  const sections = [
    { id: 'testimonials', name: 'customer testimonials', min: 6 },
    { id: 'cost-analysis', name: 'cost-per-use analysis' },
    { id: 'performance', name: 'performance metrics section' },
    { id: 'specs', name: 'specifications table' },
    { id: 'comparison', name: 'competitor comparison' },
    { id: 'faq', name: 'FAQ section' }
  ];

  sections.forEach(section => {
    if (hasSection(content, section.id)) {
      console.log(formatSuccess(`Has ${section.name}`));
    } else {
      console.log(formatError(`Missing ${section.name}`));
      issueCount++;
    }
  });

  // Count testimonials if section exists
  if (hasSection(content, 'testimonials')) {
    const testimonialCount = (content.match(/Amazon verified purchaser/g) || []).length;
    if (testimonialCount >= 6) {
      console.log(formatSuccess(`Has ${testimonialCount} customer testimonials`));
    } else {
      console.log(formatWarning(`Only ${testimonialCount} testimonials (need 6+)`));
      warningCount++;
    }
  }

  // Count FAQ items if section exists
  if (hasSection(content, 'faq')) {
    const faqCount = (content.match(/itemProp="mainEntity"/g) || []).length;
    if (faqCount >= 8) {
      console.log(formatSuccess(`Has ${faqCount} FAQ items with schema`));
    } else if (faqCount > 0) {
      console.log(formatWarning(`Only ${faqCount} FAQ items (need 8+)`));
      warningCount++;
    }
  }

  // Quality Issues
  console.log('\n🐛 QUALITY ISSUES:');

  const apostrophes = findUnescapedApostrophes(content);
  if (apostrophes.length === 0) {
    console.log(formatSuccess('No unescaped apostrophes'));
  } else {
    console.log(formatError(`Found ${apostrophes.length} unescaped apostrophes (BREAKS BUILD!)`));
    issueCount++;
  }

  const prices = findSpecificPrices(content);
  if (prices.length === 0) {
    console.log(formatSuccess('No specific prices found'));
  } else {
    console.log(formatWarning(`Found ${prices.length} specific price mentions`));
    warningCount++;
  }

  const rawLinks = findRawAffiliateLinks(content);
  if (rawLinks.length === 0) {
    console.log(formatSuccess('No raw affiliate links'));
  } else {
    console.log(formatError(`Found ${rawLinks.length} raw affiliate links`));
    issueCount++;
  }

  // Count AffiliateButtons
  const buttonCount = (content.match(/<AffiliateButton/g) || []).length;
  if (buttonCount >= 3) {
    console.log(formatSuccess(`Has ${buttonCount} AffiliateButtons (3+ recommended)`));
  } else if (buttonCount > 0) {
    console.log(formatWarning(`Only ${buttonCount} AffiliateButtons (need 3)`));
    warningCount++;
  }

  // Check for alt text on images
  const images = (content.match(/<[Ii]mage|<img/g) || []).length;
  const alts = (content.match(/alt=/g) || []).length;
  if (images === alts) {
    console.log(formatSuccess('All images have alt text'));
  } else {
    console.log(formatWarning(`${images - alts} images missing alt text`));
    warningCount++;
  }

  // Voice & Guidelines Checks
  console.log('\n📝 VOICE & GUIDELINES CHECKS:');

  // Check for forbidden pricing phrases
  const pricingPhrases = findForbiddenPricingPhrases(content);
  if (pricingPhrases.length === 0) {
    console.log(formatSuccess('No forbidden pricing phrases'));
  } else {
    console.log(formatWarning(`Found ${pricingPhrases.length} forbidden pricing phrase(s)`));
    pricingPhrases.slice(0, 3).forEach(issue => {
      console.log(`  Line ${issue.line}: "${issue.phrase}"`);
    });
    if (pricingPhrases.length > 3) {
      console.log(`  ... and ${pricingPhrases.length - 3} more`);
    }
    warningCount++;
  }

  // Check for incorrect credentials
  const credentialIssues = findIncorrectCredentials(content);
  if (credentialIssues.length === 0) {
    console.log(formatSuccess('No incorrect credentials found'));
  } else {
    console.log(formatError(`Found ${credentialIssues.length} credential issue(s)`));
    credentialIssues.forEach(issue => {
      console.log(`  Line ${issue.line}: ${issue.suggestion}`);
    });
    issueCount++;
  }

  // Check for forbidden phrases
  const forbiddenPhraseIssues = findForbiddenPhrases(content);
  if (forbiddenPhraseIssues.length === 0) {
    console.log(formatSuccess('No forbidden phrases found'));
  } else {
    const errors = forbiddenPhraseIssues.filter(i => i.severity === 'error');
    const warnings = forbiddenPhraseIssues.filter(i => i.severity === 'warning');

    if (errors.length > 0) {
      console.log(formatError(`Found ${errors.length} forbidden phrase error(s)`));
      errors.slice(0, 2).forEach(issue => {
        console.log(`  Line ${issue.line}: "${issue.phrase}" - ${issue.suggestion}`);
      });
      issueCount += errors.length;
    }

    if (warnings.length > 0) {
      console.log(formatWarning(`Found ${warnings.length} generic phrase(s) to improve`));
      warnings.slice(0, 2).forEach(issue => {
        console.log(`  Line ${issue.line}: "${issue.phrase}"`);
      });
      warningCount += warnings.length;
    }
  }

  // Build Checks
  console.log('\n🔨 BUILD CHECKS:');

  try {
    console.log(formatInfo('Running TypeScript check...'));
    execSync('npx tsc --noEmit', {
      stdio: 'pipe',
      cwd: process.cwd()
    });
    console.log(formatSuccess('TypeScript compiles without errors'));
  } catch (error) {
    console.log(formatError('TypeScript compilation failed'));
    console.log('  Run: npx tsc --noEmit');
    console.log('  To see errors');
    issueCount++;
  }

  console.log(formatWarning('Schema validation: Run manually at https://search.google.com/test/rich-results'));

  // Results
  console.log(formatHeader('🎯 RESULTS'));

  // Calculate Quality Level based on multiple factors, not just word count
  let qualityScore = 0;

  // Content depth (40 points max)
  if (wordCount >= 3500) qualityScore += 15;
  else if (wordCount >= 2500) qualityScore += 10;
  else qualityScore += 5;

  if (hasSection(content, 'testimonials')) qualityScore += 8;
  if (hasSection(content, 'cost-analysis')) qualityScore += 5;
  if (hasSection(content, 'performance')) qualityScore += 5;
  if (hasSection(content, 'specs')) qualityScore += 4;
  if (hasSection(content, 'comparison')) qualityScore += 3;

  // SEO strength (20 points max)
  if (hasSection(content, 'faq')) qualityScore += 8;
  if (buttonCount >= 3) qualityScore += 6;
  if (images === alts) qualityScore += 3;
  if (content.includes('Quick Navigation')) qualityScore += 3;

  // Structure (20 points max)
  qualityScore += structureChecks.filter(c => c.test()).length * 2;

  // Conversion (20 points max - deduct for issues)
  qualityScore += 10; // Base conversion score
  if (prices.length > 0) qualityScore -= 3;
  if (buttonCount < 2) qualityScore -= 5;
  if (rawLinks.length > 0) qualityScore -= 5;

  const qualityLevel = qualityScore >= 90 ? 'TIER 1' :
                       qualityScore >= 75 ? 'TIER 2' :
                       'TIER 3';
  const levelColor = qualityScore >= 75 ? formatSuccess : formatWarning;

  console.log(`Overall Grade: ${levelColor(qualityLevel)} (${qualityScore}/100 points)`);

  if (issueCount === 0 && warningCount === 0) {
    console.log(formatSuccess('Ready to publish: YES ✅\n'));
  } else if (issueCount === 0) {
    console.log(formatWarning(`Ready to publish: YES (with ${warningCount} minor warnings)\n`));
  } else {
    console.log(formatError(`Ready to publish: NO (${issueCount} issues to fix)\n`));
  }

  if (issueCount > 0) {
    console.log('Critical issues to fix:');
    console.log(formatError(`  ${issueCount} critical issues found`));
    console.log(formatInfo('  Run: npm run review-fix ' + slug));
  }

  if (warningCount > 0) {
    console.log('Minor improvements:');
    console.log(formatWarning(`  ${warningCount} warnings`));
  }

  return {
    slug,
    qualityLevel,
    qualityScore,
    issueCount,
    warningCount,
    passed: issueCount === 0
  };
}

// Run if called directly
if (require.main === module) {
  const slug = process.argv[2];

  if (!slug) {
    console.log('Usage: node review-validate.js <review-slug>');
    console.log('\nExample: node review-validate.js oxo-good-grips-swivel-peeler');
    process.exit(1);
  }

  const result = validateReview(slug);
  process.exit(result.passed ? 0 : 1);
}

module.exports = { validateReview };
