#!/usr/bin/env node

/**
 * Specs Finder Script
 *
 * Helps gather specifications for a product
 * Opens research pages and provides template
 * Usage: node scripts/review-tools/specs-finder.js <review-slug>
 */

const { exec } = require('child_process');
const { reviewExists, readReview, formatHeader, formatSuccess, formatInfo } = require('./utils');

function openBrowser(url) {
  const platform = process.platform;
  let command;

  if (platform === 'darwin') {
    command = `open "${url}"`;
  } else if (platform === 'win32') {
    command = `start "${url}"`;
  } else {
    command = `xdg-open "${url}"`;
  }

  exec(command, (error) => {
    if (error) {
      console.error(`Could not open browser: ${error.message}`);
    }
  });
}

function findAmazonUrl(content) {
  const match = content.match(/https:\/\/(?:www\.)?amazon\.com\/[^\s"'<>]+/);
  return match ? match[0] : null;
}

function findSpecsFinder(slug) {
  console.log(formatHeader(`🔍 Specification Finder: ${slug}`));

  if (!reviewExists(slug)) {
    console.error('Review not found:', slug);
    process.exit(1);
  }

  const content = readReview(slug);
  const amazonUrl = findAmazonUrl(content);

  console.log('\nOpening research pages...\n');

  if (amazonUrl) {
    console.log(formatSuccess(`Amazon: ${amazonUrl}`));
    openBrowser(amazonUrl);
  } else {
    console.log(formatInfo('Amazon URL not found in review'));
    console.log('Search manually: https://www.amazon.com/');
  }

  // Open Google search
  const searchQuery = slug.replace(/-/g, ' ');
  const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery + ' specifications')}`;
  console.log(formatSuccess(`Google: ${googleUrl}`));
  openBrowser(googleUrl);

  setTimeout(() => {
    console.log('\n');
    console.log(formatHeader('📝 SPECIFICATIONS TEMPLATE'));
    console.log('\nCopy this template and fill in from product pages:\n');

    console.log(`TECHNICAL SPECIFICATIONS:
  Material: [e.g., Stainless steel blade, plastic handle]
  Type: [e.g., Swivel blade, fixed blade]
  Key Features: [List 3-5 key features]
  Dishwasher Safe: [Yes/No]
  Warranty: [X years / Lifetime / etc.]
  Made In: [Country]

PHYSICAL DIMENSIONS:
  Length: [X inches / cm]
  Width: [X inches / cm]
  Height: [X inches / cm]
  Weight: [X oz / lbs]
  Packaging: [Carded / Boxed / Blister pack]

ADDITIONAL INFO:
  UPC: [if available]
  ASIN: [from Amazon]
  Model Number: [specific model]
`);

    console.log('\n');
    console.log(formatHeader('🎯 NEXT STEPS'));
    console.log(formatInfo('1. Research specs from the opened pages'));
    console.log(formatInfo('2. Look for:'));
    console.log('   - Official manufacturer specifications');
    console.log('   - Amazon "Product Details" section');
    console.log('   - "Technical Specifications" table');
    console.log('   - User manual (if linked)');
    console.log('');
    console.log(formatInfo('3. Fill in the template above'));
    console.log(formatInfo('4. Add to your review in the specifications section'));
    console.log('');
    console.log(formatSuccess('Pro tip: Right-click images → "Inspect" to find hidden specs in HTML'));

  }, 1000);
}

// Run if called directly
if (require.main === module) {
  const slug = process.argv[2];

  if (!slug) {
    console.log('Usage: node specs-finder.js <review-slug>');
    console.log('\nExample: node specs-finder.js oxo-good-grips-swivel-peeler');
    process.exit(1);
  }

  findSpecsFinder(slug);
}

module.exports = { findSpecsFinder };
