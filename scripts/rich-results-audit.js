#!/usr/bin/env node

/**
 * Rich Results Audit Tool
 *
 * Fetches live pages, extracts JSON-LD schema, and validates against
 * Google's Rich Results requirements.
 *
 * Usage:
 *   npm run audit:rich-results              # Audit all pages from sitemap
 *   node scripts/rich-results-audit.js      # Same as above
 *   node scripts/rich-results-audit.js --url https://www.chefapprovedtools.com/reviews/vitamix-5200-professional-blender
 */

const fs = require('fs');
const path = require('path');

const SITEMAP_URL = 'https://www.chefapprovedtools.com/sitemap.xml';
const CSV_PATH = path.join(process.cwd(), 'reports', 'rich-results-audit.csv');
const RICH_RESULTS_TEST_BASE = 'https://search.google.com/test/rich-results?url=';

// Google's required fields for each schema type
const REQUIREMENTS = {
  Product: {
    required: ['name', 'image', 'description'],
    recommended: ['brand', 'sku', 'aggregateRating', 'review'],
    nestedRequirements: {
      aggregateRating: ['@type', 'ratingValue', 'reviewCount'],
      review: ['@type', 'author', 'reviewRating', 'reviewBody'],
    }
  },
  Article: {
    required: ['headline', 'author', 'datePublished', 'dateModified', 'image', 'publisher'],
    recommended: ['mainEntityOfPage', '@id'],
  },
  BlogPosting: {
    required: ['headline', 'author', 'datePublished', 'dateModified', 'image', 'publisher'],
    recommended: ['mainEntityOfPage', '@id'],
  },
  FAQPage: {
    required: ['mainEntity'],
    recommended: [],
  },
  BreadcrumbList: {
    required: ['itemListElement'],
    recommended: [],
  },
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
};

async function fetchSitemapUrls() {
  console.log(`Fetching sitemap from ${SITEMAP_URL}...`);
  const response = await fetch(SITEMAP_URL);
  const xml = await response.text();

  const urlMatches = xml.match(/<loc>([^<]+)<\/loc>/g) || [];
  const urls = urlMatches.map(match => match.replace(/<\/?loc>/g, ''));

  console.log(`Found ${urls.length} URLs in sitemap\n`);
  return urls;
}

async function fetchPageSchemas(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();

    // Extract all JSON-LD scripts
    const schemaRegex = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    const schemas = [];

    let match;
    while ((match = schemaRegex.exec(html)) !== null) {
      try {
        const schema = JSON.parse(match[1]);
        schemas.push(schema);
      } catch (e) {
        // Invalid JSON, skip
      }
    }

    return { schemas, error: null };
  } catch (error) {
    return { schemas: [], error: error.message };
  }
}

function validateSchema(schema, type) {
  const issues = { errors: [], warnings: [] };
  const reqs = REQUIREMENTS[type];

  if (!reqs) {
    return issues; // Unknown type, skip validation
  }

  // Check required fields
  for (const field of reqs.required) {
    if (!schema[field]) {
      issues.errors.push(`Missing required: ${field}`);
    }
  }

  // Check recommended fields
  for (const field of reqs.recommended) {
    if (!schema[field]) {
      issues.warnings.push(`Missing recommended: ${field}`);
    }
  }

  // Check nested requirements
  if (reqs.nestedRequirements) {
    for (const [parentField, nestedFields] of Object.entries(reqs.nestedRequirements)) {
      if (schema[parentField]) {
        for (const field of nestedFields) {
          if (!schema[parentField][field]) {
            issues.errors.push(`${parentField} missing: ${field}`);
          }
        }
      }
    }
  }

  // Product-specific validations
  if (type === 'Product') {
    // Check reviewCount
    if (schema.aggregateRating?.reviewCount === 0) {
      issues.errors.push('reviewCount must be >= 1');
    }
    if (schema.aggregateRating?.reviewCount === 1) {
      issues.warnings.push('reviewCount=1 may look like self-review to Google');
    }

    // Check ratingValue range
    if (schema.aggregateRating?.ratingValue > 5 || schema.aggregateRating?.ratingValue < 1) {
      issues.errors.push('ratingValue must be 1-5');
    }

    // Product must have offers OR aggregateRating OR review (at least one)
    const hasOffers = !!schema.offers;
    const hasAggregateRating = !!schema.aggregateRating;
    const hasReview = !!schema.review;
    if (!hasOffers && !hasAggregateRating && !hasReview) {
      issues.errors.push('Must have offers, aggregateRating, or review (need at least one)');
    }
  }

  // FAQPage-specific validations
  if (type === 'FAQPage') {
    const mainEntity = schema.mainEntity;
    if (mainEntity) {
      const questions = Array.isArray(mainEntity) ? mainEntity : [mainEntity];

      if (questions.length === 0) {
        issues.errors.push('mainEntity has no questions');
      }

      for (let i = 0; i < questions.length; i++) {
        const q = questions[i];

        // Check @type is Question
        if (q['@type'] !== 'Question') {
          issues.errors.push(`Q${i + 1}: @type must be "Question"`);
        }

        // Check name (the question text) exists and ends with ?
        if (!q.name) {
          issues.errors.push(`Q${i + 1}: missing question text (name)`);
        } else if (!q.name.trim().endsWith('?')) {
          issues.warnings.push(`Q${i + 1}: question should end with "?"`);
        }

        // Check acceptedAnswer exists and has text
        if (!q.acceptedAnswer) {
          issues.errors.push(`Q${i + 1}: missing acceptedAnswer`);
        } else {
          if (q.acceptedAnswer['@type'] !== 'Answer') {
            issues.errors.push(`Q${i + 1}: acceptedAnswer @type must be "Answer"`);
          }
          if (!q.acceptedAnswer.text) {
            issues.errors.push(`Q${i + 1}: acceptedAnswer missing text`);
          } else if (q.acceptedAnswer.text.length < 50) {
            issues.warnings.push(`Q${i + 1}: answer is very short (${q.acceptedAnswer.text.length} chars)`);
          }
        }
      }
    }
  }

  return issues;
}

function getSchemaType(schema) {
  // Handle @graph structure
  if (schema['@graph']) {
    return '@graph';
  }
  return schema['@type'] || 'Unknown';
}

function flattenGraphSchemas(schemas) {
  const flattened = [];

  for (const schema of schemas) {
    if (schema['@graph'] && Array.isArray(schema['@graph'])) {
      flattened.push(...schema['@graph']);
    } else {
      flattened.push(schema);
    }
  }

  return flattened;
}

async function auditUrl(url) {
  const { schemas, error } = await fetchPageSchemas(url);

  if (error) {
    return {
      url,
      error,
      schemaTypes: [],
      errors: [],
      warnings: [],
      hasProduct: false,
      hasArticle: false,
      hasFAQ: false,
      hasBreadcrumb: false,
    };
  }

  const flatSchemas = flattenGraphSchemas(schemas);
  const schemaTypes = flatSchemas.map(s => s['@type']).filter(Boolean);

  let allErrors = [];
  let allWarnings = [];

  // Check for duplicate schema types (same @type appearing multiple times)
  const typeCounts = {};
  for (const type of schemaTypes) {
    typeCounts[type] = (typeCounts[type] || 0) + 1;
  }
  for (const [type, count] of Object.entries(typeCounts)) {
    if (count > 1 && ['Product', 'Article', 'BlogPosting', 'FAQPage'].includes(type)) {
      allWarnings.push(`Duplicate ${type} schema (${count}x) - may confuse Google`);
    }
  }

  for (const schema of flatSchemas) {
    const type = schema['@type'];
    if (type && REQUIREMENTS[type]) {
      const issues = validateSchema(schema, type);
      allErrors.push(...issues.errors.map(e => `${type}: ${e}`));
      allWarnings.push(...issues.warnings.map(w => `${type}: ${w}`));
    }
  }

  // Check for expected schema types based on URL pattern
  const urlPath = url.replace('https://www.chefapprovedtools.com', '');

  if (urlPath.startsWith('/reviews/') && urlPath !== '/reviews') {
    if (!schemaTypes.includes('Product')) {
      allErrors.push('Missing Product schema for review page');
    }
  }

  if (urlPath.startsWith('/blog/') && urlPath !== '/blog') {
    if (!schemaTypes.includes('Article') && !schemaTypes.includes('BlogPosting')) {
      allErrors.push('Missing Article/BlogPosting schema for blog page');
    }
  }

  return {
    url,
    error: null,
    schemaTypes,
    errors: allErrors,
    warnings: allWarnings,
    hasProduct: schemaTypes.includes('Product'),
    hasArticle: schemaTypes.includes('Article') || schemaTypes.includes('BlogPosting'),
    hasFAQ: schemaTypes.includes('FAQPage'),
    hasBreadcrumb: schemaTypes.includes('BreadcrumbList'),
  };
}

function generateTestUrl(url) {
  return `${RICH_RESULTS_TEST_BASE}${encodeURIComponent(url)}`;
}

async function main() {
  const args = process.argv.slice(2);
  const singleUrlIndex = args.indexOf('--url');
  const singleUrl = singleUrlIndex !== -1 ? args[singleUrlIndex + 1] : null;

  // Ensure reports directory exists
  const reportsDir = path.dirname(CSV_PATH);
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  console.log('='.repeat(80));
  console.log('RICH RESULTS AUDIT');
  console.log('='.repeat(80));
  console.log('');

  let urls;
  if (singleUrl) {
    urls = [singleUrl];
    console.log(`Auditing single URL: ${singleUrl}\n`);
  } else {
    urls = await fetchSitemapUrls();
    console.log(`Auditing ${urls.length} pages...\n`);
  }

  const results = [];
  let passCount = 0;
  let warnCount = 0;
  let failCount = 0;

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const urlPath = url.replace('https://www.chefapprovedtools.com', '') || '/';

    process.stdout.write(`[${i + 1}/${urls.length}] ${urlPath} ... `);

    const result = await auditUrl(url);
    results.push(result);

    if (result.error) {
      console.log(`${colors.red}ERROR${colors.reset}`);
      failCount++;
    } else if (result.errors.length > 0) {
      console.log(`${colors.red}FAIL${colors.reset} (${result.errors.length} errors)`);
      failCount++;
    } else if (result.warnings.length > 0) {
      console.log(`${colors.yellow}WARN${colors.reset} (${result.warnings.length} warnings)`);
      warnCount++;
    } else {
      console.log(`${colors.green}PASS${colors.reset}`);
      passCount++;
    }

    // Small delay to avoid hammering the server
    if (urls.length > 1) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  // Write CSV
  const headers = [
    'URL',
    'Status',
    'Schema Types',
    'Has Product',
    'Has Article',
    'Has FAQ',
    'Has Breadcrumb',
    'Errors',
    'Warnings',
    'Test URL'
  ];

  const csvRows = [headers.join(',')];

  for (const r of results) {
    const status = r.error ? 'ERROR' : (r.errors.length > 0 ? 'FAIL' : (r.warnings.length > 0 ? 'WARN' : 'PASS'));
    const urlPath = r.url.replace('https://www.chefapprovedtools.com', '') || '/';

    const row = [
      `"${urlPath}"`,
      status,
      `"${r.schemaTypes.join(', ')}"`,
      r.hasProduct ? 'Yes' : 'No',
      r.hasArticle ? 'Yes' : 'No',
      r.hasFAQ ? 'Yes' : 'No',
      r.hasBreadcrumb ? 'Yes' : 'No',
      `"${r.errors.join('; ')}"`,
      `"${r.warnings.join('; ')}"`,
      `"${generateTestUrl(r.url)}"`
    ];
    csvRows.push(row.join(','));
  }

  fs.writeFileSync(CSV_PATH, csvRows.join('\n'));

  // Print summary
  console.log('\n' + '='.repeat(80));
  console.log('SUMMARY');
  console.log('='.repeat(80));
  console.log(`${colors.green}PASS: ${passCount}${colors.reset}`);
  console.log(`${colors.yellow}WARN: ${warnCount}${colors.reset}`);
  console.log(`${colors.red}FAIL: ${failCount}${colors.reset}`);
  console.log(`\nCSV saved to: ${CSV_PATH}`);

  // List failures
  const failures = results.filter(r => r.errors.length > 0 || r.error);
  if (failures.length > 0) {
    console.log(`\n${colors.red}FAILURES:${colors.reset}`);
    for (const f of failures) {
      const urlPath = f.url.replace('https://www.chefapprovedtools.com', '') || '/';
      console.log(`\n  ${urlPath}`);
      if (f.error) {
        console.log(`    ${colors.red}Fetch error: ${f.error}${colors.reset}`);
      }
      for (const err of f.errors) {
        console.log(`    ${colors.red}- ${err}${colors.reset}`);
      }
      console.log(`    ${colors.gray}Test: ${generateTestUrl(f.url)}${colors.reset}`);
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('To test any page in Google Rich Results Test:');
  console.log(`${colors.blue}${RICH_RESULTS_TEST_BASE}<encoded-url>${colors.reset}`);
  console.log('='.repeat(80));
}

main().catch(console.error);
