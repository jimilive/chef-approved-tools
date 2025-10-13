#!/usr/bin/env node

/**
 * Review Quick Fix Script
 *
 * Automatically fixes ONLY technical issues (no TODO sections added)
 * Usage: node scripts/review-tools/review-quick-fix.js <review-slug>
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
  formatHeader,
  formatSuccess,
  formatInfo,
  formatWarning
} = require('./utils');

const REQUIRED_IMPORTS = [
  { name: 'Tier2Badge', from: '@/components/ReviewTierBadge', statement: "import { Tier2Badge } from '@/components/ReviewTierBadge';" },
  { name: 'FTCDisclosure', from: '@/components/FTCDisclosure', statement: "import FTCDisclosure from '@/components/FTCDisclosure';" },
  { name: 'AffiliateButton', from: '@/components/AffiliateButton', statement: "import AffiliateButton from '@/components/AffiliateButton';" },
  { name: 'generateProductReviewSchema', from: '@/lib/schema', statement: "import { generateProductReviewSchema, generateBreadcrumbSchema } from '@/lib/schema';" },
  { name: 'Link', from: 'next/link', statement: "import Link from 'next/link';" },
  { name: 'Metadata', from: 'next', statement: "import type { Metadata } from 'next';" }
];

function quickFixReview(slug) {
  console.log(formatHeader(`⚡ Quick Fix Review: ${slug}`));
  console.log(formatInfo('(Technical fixes only - no TODO sections)\n'));

  if (!reviewExists(slug)) {
    console.error('Review not found:', slug);
    process.exit(1);
  }

  // Create backup
  const backupPath = createBackup(slug);
  console.log(formatSuccess(`Created backup: ${backupPath.split('/').pop()}\n`));

  let content = readReview(slug);
  let changesMade = false;

  // 1. Add missing imports
  const missingImports = getMissingImports(content);
  if (missingImports.length > 0) {
    console.log(formatInfo(`Adding ${missingImports.length} missing imports...`));
    content = addImports(content, missingImports);
    changesMade = true;
    console.log(formatSuccess(`✅ Added missing imports: ${missingImports.map(i => i.name).join(', ')}\n`));
  } else {
    console.log(formatSuccess('✅ All required imports present\n'));
  }

  // 2. Fix unescaped apostrophes
  const apostrophes = findUnescapedApostrophes(content);
  if (apostrophes.length > 0) {
    console.log(formatInfo(`Fixing ${apostrophes.length} unescaped apostrophes...`));
    content = fixApostrophes(content);
    changesMade = true;
    console.log(formatSuccess(`✅ Fixed ${apostrophes.length} unescaped apostrophes\n`));
  } else {
    console.log(formatSuccess('✅ No unescaped apostrophes found\n'));
  }

  // 3. Convert raw affiliate links to AffiliateButton
  const rawLinks = findRawAffiliateLinks(content);
  if (rawLinks.length > 0) {
    console.log(formatInfo(`Converting ${rawLinks.length} affiliate links...`));
    const result = convertAffiliateLinks(content);
    content = result.content;
    changesMade = true;
    console.log(formatSuccess(`✅ Converted ${rawLinks.length} affiliate links:`));
    result.conversions.forEach(c => {
      console.log(`  - Line ${c.line}: <a> → <AffiliateButton position="${c.position}">`);
    });
    console.log('');
  } else {
    console.log(formatSuccess('✅ No raw affiliate links (already using AffiliateButton)\n'));
  }

  if (changesMade) {
    writeReview(slug, content);
    console.log(formatHeader('✅ DONE'));
    console.log(formatSuccess('Technical issues fixed! Review is now build-ready.\n'));
  } else {
    console.log(formatHeader('✅ ALREADY CLEAN'));
    console.log(formatSuccess('No technical issues found! Review is good.\n'));
  }

  console.log(formatInfo('Next steps:'));
  console.log(formatInfo('  • To add content sections: npm run review-add-sections ' + slug));
  console.log(formatInfo('  • To validate quality: npm run review-validate ' + slug));

  return { slug, changesMade };
}

function getMissingImports(content) {
  return REQUIRED_IMPORTS.filter(imp => !hasImport(content, imp.name));
}

function addImports(content, missingImports) {
  if (missingImports.length === 0) return content;

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

  // Only add the imports that are actually missing
  const importsToAdd = missingImports.map(imp => imp.statement).join('\n');
  lines.splice(insertIndex, 0, importsToAdd);
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

  const affiliateLinkRegex = /<a\s+[^>]*href=["'](https:\/\/(?:www\.amazon\.com|amzn\.to)[^"']+)["'][^>]*>(.*?)<\/a>/gs;

  let result = content;
  let match;
  const matches = [];

  while ((match = affiliateLinkRegex.exec(content)) !== null) {
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

  matches.reverse().forEach(m => {
    linkCount++;

    const linesBeforeMatch = content.substring(0, m.index).split('\n').length;
    const totalLines = content.split('\n').length;

    let position = 'mid_article';
    if (linkCount === matches.length) position = 'above_fold';
    else if (linesBeforeMatch > totalLines - 200) position = 'final_cta';

    const textContent = m.text.replace(/<[^>]+>/g, '').trim() || 'Check Amazon Price →';

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

  conversions.reverse();

  return { content: result, conversions };
}

// Run if called directly
if (require.main === module) {
  const slug = process.argv[2];

  if (!slug) {
    console.log('Usage: node review-quick-fix.js <review-slug>');
    console.log('\nExample: node review-quick-fix.js oxo-good-grips-swivel-peeler');
    process.exit(1);
  }

  quickFixReview(slug);
}

module.exports = { quickFixReview };
