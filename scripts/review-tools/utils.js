/**
 * Utility functions for review automation scripts
 */

const fs = require('fs');
const path = require('path');

/**
 * Get the path to a review's page.tsx file
 */
function getReviewPath(slug) {
  return path.join(process.cwd(), 'app', 'reviews', slug, 'page.tsx');
}

/**
 * Check if a review exists
 */
function reviewExists(slug) {
  return fs.existsSync(getReviewPath(slug));
}

/**
 * Read a review file
 */
function readReview(slug) {
  const filePath = getReviewPath(slug);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Review not found: ${slug}`);
  }
  return fs.readFileSync(filePath, 'utf-8');
}

/**
 * Write a review file
 */
function writeReview(slug, content) {
  const filePath = getReviewPath(slug);
  fs.writeFileSync(filePath, content, 'utf-8');
}

/**
 * Get all review slugs
 */
function getAllReviewSlugs() {
  const reviewsDir = path.join(process.cwd(), 'app', 'reviews');
  return fs.readdirSync(reviewsDir)
    .filter(item => {
      const itemPath = path.join(reviewsDir, item);
      return fs.statSync(itemPath).isDirectory() &&
             fs.existsSync(path.join(itemPath, 'page.tsx'));
    })
    .filter(slug => slug !== 'page'); // Exclude the reviews hub page
}

/**
 * Count words in content
 */
function countWords(content) {
  return content.split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Check if content has a specific import
 */
function hasImport(content, importName) {
  const patterns = [
    new RegExp(`import.*${importName}.*from`, 'i'),
    new RegExp(`import\\s+${importName}`, 'i'),
    new RegExp(`import\\s+\\{[^}]*${importName}[^}]*\\}`, 'i')
  ];
  return patterns.some(pattern => pattern.test(content));
}

/**
 * Check if content has productData object
 */
function hasProductData(content) {
  return /const\s+productData\s*=/.test(content);
}

/**
 * Find all raw Amazon affiliate links (not using AffiliateButton)
 * Only matches actual <a> tags, not AffiliateButton href props
 */
function findRawAffiliateLinks(content) {
  const rawLinks = [];

  // Match <a href="amazon..."> but NOT when it's an AffiliateButton prop
  const rawLinkRegex = /<a\s+[^>]*href=["'](https:\/\/(?:www\.amazon\.com|amzn\.to)[^"']+)["'][^>]*>/g;

  let match;
  while ((match = rawLinkRegex.exec(content)) !== null) {
    // Check context before this match to see if it's inside AffiliateButton
    const contextBefore = content.substring(Math.max(0, match.index - 200), match.index);

    // Skip if this <a> tag is preceded by <AffiliateButton
    if (contextBefore.includes('<AffiliateButton')) {
      continue;
    }

    // Also check if the line contains 'AffiliateButton' (for inline cases)
    const lineStart = content.lastIndexOf('\n', match.index) + 1;
    const lineEnd = content.indexOf('\n', match.index);
    const line = content.substring(lineStart, lineEnd === -1 ? content.length : lineEnd);

    if (line.includes('AffiliateButton')) {
      continue;
    }

    // This is a raw <a> tag
    const lineNumber = content.substring(0, match.index).split('\n').length;
    rawLinks.push({
      line: lineNumber,
      content: line.trim()
    });
  }

  return rawLinks;
}

/**
 * Find unescaped apostrophes that will break JSX
 */
function findUnescapedApostrophes(content) {
  const lines = content.split('\n');
  const issues = [];

  const patterns = [
    "It's", "don't", "won't", "can't", "I'm", "you're", "we're",
    "they're", "isn't", "wasn't", "hasn't", "haven't", "hadn't",
    "doesn't", "didn't", "couldn't", "shouldn't", "wouldn't"
  ];

  lines.forEach((line, index) => {
    patterns.forEach(pattern => {
      if (line.includes(pattern) && !line.includes('&apos;')) {
        issues.push({
          line: index + 1,
          pattern: pattern,
          content: line.trim()
        });
      }
    });
  });

  return issues;
}

/**
 * Check if content has a specific section by ID
 */
function hasSection(content, sectionId) {
  return new RegExp(`id=["']${sectionId}["']`).test(content);
}

/**
 * Check for specific price mentions (excluding allowed contexts)
 * Prices are allowed in:
 * - Cost analysis sections (id="cost-analysis")
 * - Competitor comparison tables
 * - Historical/comparative contexts
 */
function findSpecificPrices(content) {
  const lines = content.split('\n');
  const issues = [];

  const pricePatterns = [
    /costs?\s+\$\d{2,}/i,
    /priced?\s+at\s+\$\d{2,}/i,
    /price\s+of\s+\$\d{2,}/i,
    /only\s+\$\d{2,}/i,
    /just\s+\$\d{2,}/i
  ];

  // Find cost-analysis section boundaries
  let inCostAnalysis = false;
  let inComparison = false;

  lines.forEach((line, index) => {
    // Track if we're in allowed sections
    if (line.includes('id="cost-analysis"')) inCostAnalysis = true;
    if (line.includes('id="comparison"')) inComparison = true;
    if (line.includes('</section>') && (inCostAnalysis || inComparison)) {
      inCostAnalysis = false;
      inComparison = false;
    }

    // Skip if in allowed sections
    if (inCostAnalysis || inComparison) {
      return;
    }

    // Skip if line contains historical/comparative language
    const historicalMarkers = [
      'Initial cost:',
      'spending $',
      'costs $',
      'Value comparison:',
      'Price Range', // Table header
      'TODO', // Template placeholder
      'priceRange:', // productData object
    ];

    if (historicalMarkers.some(marker => line.includes(marker))) {
      return;
    }

    // Check for price patterns
    pricePatterns.forEach(pattern => {
      if (pattern.test(line)) {
        // Additional context check: skip if it's clearly historical
        if (/\$\d+(-\$\d+)?/.test(line) && line.includes('-')) {
          // Price range like "$10-15" is likely in specs/comparison
          return;
        }

        issues.push({
          line: index + 1,
          content: line.trim()
        });
      }
    });
  });

  return issues;
}

/**
 * Create a backup of a review file
 */
function createBackup(slug) {
  const filePath = getReviewPath(slug);
  const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const backupPath = `${filePath}.backup-${timestamp}`;

  fs.copyFileSync(filePath, backupPath);
  return backupPath;
}

/**
 * Format console output with colors (basic)
 */
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function formatHeader(text) {
  return `\n${colors.bright}${colors.cyan}${text}${colors.reset}\n${'━'.repeat(text.length)}\n`;
}

function formatError(text) {
  return `${colors.red}❌ ${text}${colors.reset}`;
}

function formatWarning(text) {
  return `${colors.yellow}⚠️  ${text}${colors.reset}`;
}

function formatSuccess(text) {
  return `${colors.green}✅ ${text}${colors.reset}`;
}

function formatInfo(text) {
  return `${colors.blue}ℹ️  ${text}${colors.reset}`;
}

module.exports = {
  getReviewPath,
  reviewExists,
  readReview,
  writeReview,
  getAllReviewSlugs,
  countWords,
  hasImport,
  hasProductData,
  findRawAffiliateLinks,
  findUnescapedApostrophes,
  hasSection,
  findSpecificPrices,
  createBackup,
  colors,
  formatHeader,
  formatError,
  formatWarning,
  formatSuccess,
  formatInfo
};
