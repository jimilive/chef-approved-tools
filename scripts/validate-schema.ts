#!/usr/bin/env tsx
/**
 * Schema Validation Tool for Chef Approved Tools
 *
 * Validates Product and Article schema against Google Rich Results requirements
 * Supports both local file scanning and live URL validation
 *
 * Usage:
 *   npm run validate-schema              # Validate all local pages
 *   npm run validate-schema -- --local   # Validate local files
 *   npm run validate-schema -- --live    # Validate live site
 *   npm run validate-schema -- --url https://www.chefapprovedtools.com/reviews/vitamix-5200-professional-blender
 *   npm run validate-schema -- --report ./schema-report.txt
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Types
interface ValidationIssue {
  file: string;
  type: 'error' | 'warning' | 'missing';
  schema: string;
  field?: string;
  issue: string;
  fix: string;
}

interface SchemaValidationResult {
  file: string;
  schemas: ParsedSchema[];
  issues: ValidationIssue[];
}

interface ParsedSchema {
  '@context'?: string;
  '@type'?: string;
  '@id'?: string;
  [key: string]: any;
}

interface ValidationSummary {
  total: number;
  valid: number;
  warnings: number;
  errors: number;
  missing: number;
  byType: {
    products: number;
    blogs: number;
  };
}

// Configuration
const GOOGLE_REQUIRED_PRODUCT_FIELDS = [
  'name',
  'image',
  'description',
] as const;

const GOOGLE_RECOMMENDED_PRODUCT_FIELDS = [
  'brand',
  'sku',
  'aggregateRating',
  'review',
] as const;

const GOOGLE_REQUIRED_ARTICLE_FIELDS = [
  'headline',
  'author',
  'datePublished',
  'dateModified',
  'image',
  'publisher',
] as const;

const GOOGLE_REQUIRED_REVIEW_FIELDS = [
  '@type',
  'author',
  'reviewRating',
  'reviewBody',
] as const;

const GOOGLE_REQUIRED_AGGREGATE_RATING_FIELDS = [
  '@type',
  'ratingValue',
  'reviewCount',
] as const;

// CLI Arguments
const args = process.argv.slice(2);
const mode = args.includes('--live') ? 'live' : args.includes('--local') ? 'local' : 'local';
const singleUrl = args.find(arg => arg.startsWith('--url'))?.split('=')[1] ||
                  (args.includes('--url') ? args[args.indexOf('--url') + 1] : null);
const reportPath = args.find(arg => arg.startsWith('--report'))?.split('=')[1] ||
                   (args.includes('--report') ? args[args.indexOf('--report') + 1] : null);

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
};

// =============================================================================
// SCHEMA EXTRACTION
// =============================================================================

/**
 * Extract JSON-LD schemas from local TSX file
 */
function extractSchemasFromFile(filePath: string): ParsedSchema[] {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Look for schema generation function calls
  const schemas: ParsedSchema[] = [];

  // Match generateProductSchema calls with parameters
  const productSchemaMatch = content.match(/const\s+productSchema\s*=\s*generateProductSchema\(\{([^}]+(?:\{[^}]*\}[^}]*)*)\}\)/);

  if (productSchemaMatch) {
    const paramsText = productSchemaMatch[1];
    const schema: ParsedSchema = {
      '@type': 'Product',
      _source: 'generateProductSchema',
      _hasParams: true
    };

    // Extract common fields from params
    if (paramsText.includes('name:')) {
      const nameMatch = paramsText.match(/name:\s*['"`]([^'"`]+)['"`]/);
      if (nameMatch) schema.name = nameMatch[1];
    }
    if (paramsText.includes('description:')) {
      const descMatch = paramsText.match(/description:\s*['"`]([^'"`]+)['"`]/);
      if (descMatch) schema.description = descMatch[1];
    }
    if (paramsText.includes('brand:')) {
      const brandMatch = paramsText.match(/brand:\s*['"`]([^'"`]+)['"`]/);
      if (brandMatch) schema.brand = { name: brandMatch[1], '@type': 'Brand' };
    }
    if (paramsText.includes('rating:')) {
      schema.aggregateRating = { '@type': 'AggregateRating', _detected: true };
    }
    if (paramsText.includes('reviewCount:')) {
      if (!schema.aggregateRating) schema.aggregateRating = { '@type': 'AggregateRating' };
      schema.aggregateRating._detected = true;
    }

    // Assume these are provided by the generateProductSchema function
    schema.image = '_generated';
    schema.review = { '@type': 'Review', _generated: true };

    schemas.push(schema);
  }

  // Match generateArticleSchema calls with parameters
  const articleSchemaMatch = content.match(/const\s+articleSchema\s*=\s*generateArticleSchema\(\{([^}]+(?:\{[^}]*\}[^}]*)*)\}\)/);
  if (articleSchemaMatch) {
    const paramsText = articleSchemaMatch[1];
    const schema: ParsedSchema = {
      '@type': 'Article',
      _source: 'generateArticleSchema',
      _hasParams: true
    };

    // Extract common fields
    if (paramsText.includes('headline:')) {
      const headlineMatch = paramsText.match(/headline:\s*['"`]([^'"`]+)['"`]/);
      if (headlineMatch) schema.headline = headlineMatch[1];
    }
    if (paramsText.includes('description:')) {
      const descMatch = paramsText.match(/description:\s*['"`]([^'"`]+)['"`]/);
      if (descMatch) schema.description = descMatch[1];
    }
    if (paramsText.includes('datePublished:')) {
      const dateMatch = paramsText.match(/datePublished:\s*['"`]([^'"`]+)['"`]/);
      if (dateMatch) schema.datePublished = dateMatch[1];
    }
    if (paramsText.includes('dateModified:') || paramsText.includes('lastUpdated:')) {
      schema.dateModified = '_provided';
    }
    if (paramsText.includes('authorName:') || paramsText.includes('author:')) {
      schema.author = { '@type': 'Person', _generated: true };
    }

    // Assume these are provided by the generateArticleSchema function
    schema.image = '_generated';
    schema.publisher = { '@id': '_generated' };

    schemas.push(schema);
  }

  // Match generateBreadcrumbSchema calls
  if (content.includes('generateBreadcrumbSchema')) {
    schemas.push({ '@type': 'BreadcrumbList', _source: 'generateBreadcrumbSchema' });
  }

  // Match generateFAQSchema calls
  if (content.includes('generateFAQSchema')) {
    schemas.push({ '@type': 'FAQPage', _source: 'generateFAQSchema' });
  }

  return schemas;
}

/**
 * Extract JSON-LD schemas from live URL
 */
async function extractSchemasFromUrl(url: string): Promise<ParsedSchema[]> {
  try {
    const response = await fetch(url);
    const html = await response.text();

    // Extract all JSON-LD scripts
    const schemaRegex = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    const schemas: ParsedSchema[] = [];

    let match;
    while ((match = schemaRegex.exec(html)) !== null) {
      try {
        const schema = JSON.parse(match[1]);
        schemas.push(schema);
      } catch (e) {
        console.warn(`${colors.yellow}⚠️  Failed to parse schema from ${url}${colors.reset}`);
      }
    }

    return schemas;
  } catch (error) {
    console.error(`${colors.red}❌ Failed to fetch ${url}: ${error}${colors.reset}`);
    return [];
  }
}

// =============================================================================
// SCHEMA VALIDATION
// =============================================================================

/**
 * Validate Product schema
 */
function validateProductSchema(schema: ParsedSchema, filePath: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // Check @type
  if (schema['@type'] !== 'Product') {
    issues.push({
      file: filePath,
      type: 'error',
      schema: 'Product',
      field: '@type',
      issue: `Expected @type: "Product", got "${schema['@type']}"`,
      fix: 'Set @type to "Product"'
    });
  }

  // Check required fields (skip if generated)
  for (const field of GOOGLE_REQUIRED_PRODUCT_FIELDS) {
    if (!schema[field] || schema[field] === '_generated') {
      // If we're analyzing local files and the schema is generated, we can't validate the actual values
      // Just check that the schema generation call exists
      if (!schema._hasParams && !schema[field]) {
        issues.push({
          file: filePath,
          type: 'error',
          schema: 'Product',
          field,
          issue: `Missing required field: ${field}`,
          fix: `Add ${field} to Product schema`
        });
      }
    }
  }

  // Check image format (must be array or single string)
  if (schema.image) {
    if (!Array.isArray(schema.image) && typeof schema.image !== 'string') {
      issues.push({
        file: filePath,
        type: 'error',
        schema: 'Product',
        field: 'image',
        issue: 'image must be a string or array of strings',
        fix: 'Convert image to string or array format'
      });
    }
  }

  // Check recommended fields
  for (const field of GOOGLE_RECOMMENDED_PRODUCT_FIELDS) {
    if (!schema[field]) {
      issues.push({
        file: filePath,
        type: 'warning',
        schema: 'Product',
        field,
        issue: `Missing recommended field: ${field}`,
        fix: `Add ${field} to Product schema for better rich snippets`
      });
    }
  }

  // Validate nested review structure
  if (schema.review) {
    const reviewIssues = validateReviewSchema(schema.review, filePath, 'Product.review');
    issues.push(...reviewIssues);
  } else {
    issues.push({
      file: filePath,
      type: 'warning',
      schema: 'Product',
      field: 'review',
      issue: 'Missing nested review - required for review rich snippets',
      fix: 'Add nested Review schema'
    });
  }

  // Validate aggregateRating structure
  if (schema.aggregateRating) {
    const ratingIssues = validateAggregateRatingSchema(schema.aggregateRating, filePath, 'Product.aggregateRating');
    issues.push(...ratingIssues);

    // Check that reviewCount > 0
    if (schema.aggregateRating.reviewCount === 0) {
      issues.push({
        file: filePath,
        type: 'warning',
        schema: 'Product',
        field: 'aggregateRating.reviewCount',
        issue: 'reviewCount is 0 - should be >= 1 for rich snippets',
        fix: 'Set reviewCount to actual number of reviews (minimum 1)'
      });
    }
  } else {
    issues.push({
      file: filePath,
      type: 'warning',
      schema: 'Product',
      field: 'aggregateRating',
      issue: 'Missing aggregateRating - required for star ratings in search',
      fix: 'Add aggregateRating with ratingValue and reviewCount'
    });
  }

  // Check brand structure
  if (schema.brand) {
    if (typeof schema.brand === 'object') {
      if (schema.brand['@type'] !== 'Brand') {
        issues.push({
          file: filePath,
          type: 'warning',
          schema: 'Product',
          field: 'brand',
          issue: 'brand should have @type: "Brand"',
          fix: 'Set brand @type to "Brand"'
        });
      }
      if (!schema.brand.name) {
        issues.push({
          file: filePath,
          type: 'error',
          schema: 'Product',
          field: 'brand.name',
          issue: 'brand object missing name field',
          fix: 'Add name to brand object'
        });
      }
    }
  }

  // Check @id for entity reference
  if (!schema['@id']) {
    issues.push({
      file: filePath,
      type: 'warning',
      schema: 'Product',
      field: '@id',
      issue: 'Missing @id for proper entity reference',
      fix: 'Add @id with format: https://www.chefapprovedtools.com/reviews/[slug]#product'
    });
  }

  return issues;
}

/**
 * Validate Review schema (nested within Product)
 */
function validateReviewSchema(schema: ParsedSchema, filePath: string, path: string = 'Review'): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  for (const field of GOOGLE_REQUIRED_REVIEW_FIELDS) {
    if (!schema[field]) {
      issues.push({
        file: filePath,
        type: 'error',
        schema: path,
        field,
        issue: `${path} missing required field: ${field}`,
        fix: `Add ${field} to ${path}`
      });
    }
  }

  // Validate author structure
  if (schema.author) {
    if (schema.author['@type'] !== 'Person') {
      issues.push({
        file: filePath,
        type: 'error',
        schema: path,
        field: 'author',
        issue: `${path}.author must have @type: "Person"`,
        fix: 'Set author @type to "Person"'
      });
    }
    if (!schema.author.name) {
      issues.push({
        file: filePath,
        type: 'error',
        schema: path,
        field: 'author.name',
        issue: `${path}.author missing name`,
        fix: 'Add name to author object'
      });
    }
  }

  // Validate reviewRating structure
  if (schema.reviewRating) {
    if (schema.reviewRating['@type'] !== 'Rating') {
      issues.push({
        file: filePath,
        type: 'error',
        schema: path,
        field: 'reviewRating',
        issue: `${path}.reviewRating must have @type: "Rating"`,
        fix: 'Set reviewRating @type to "Rating"'
      });
    }
    if (!schema.reviewRating.ratingValue) {
      issues.push({
        file: filePath,
        type: 'error',
        schema: path,
        field: 'reviewRating.ratingValue',
        issue: `${path}.reviewRating missing ratingValue`,
        fix: 'Add ratingValue to reviewRating'
      });
    }
  }

  return issues;
}

/**
 * Validate AggregateRating schema
 */
function validateAggregateRatingSchema(schema: ParsedSchema, filePath: string, path: string = 'AggregateRating'): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  for (const field of GOOGLE_REQUIRED_AGGREGATE_RATING_FIELDS) {
    if (!schema[field]) {
      issues.push({
        file: filePath,
        type: 'error',
        schema: path,
        field,
        issue: `${path} missing required field: ${field}`,
        fix: `Add ${field} to ${path}`
      });
    }
  }

  return issues;
}

/**
 * Validate Article schema
 */
function validateArticleSchema(schema: ParsedSchema, filePath: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // Check @type (Article or BlogPosting are both valid)
  if (schema['@type'] !== 'Article' && schema['@type'] !== 'BlogPosting') {
    issues.push({
      file: filePath,
      type: 'error',
      schema: 'Article',
      field: '@type',
      issue: `Expected @type: "Article" or "BlogPosting", got "${schema['@type']}"`,
      fix: 'Set @type to "Article" or "BlogPosting"'
    });
  }

  // Check required fields (skip if generated)
  for (const field of GOOGLE_REQUIRED_ARTICLE_FIELDS) {
    if (!schema[field] || schema[field] === '_generated') {
      // If we're analyzing local files and the schema is generated, we can't validate the actual values
      if (!schema._hasParams && !schema[field]) {
        issues.push({
          file: filePath,
          type: 'error',
          schema: 'Article',
          field,
          issue: `Missing required field: ${field}`,
          fix: `Add ${field} to Article schema`
        });
      }
    }
  }

  // Validate author structure
  if (schema.author) {
    if (typeof schema.author === 'object') {
      if (schema.author['@type'] !== 'Person') {
        issues.push({
          file: filePath,
          type: 'error',
          schema: 'Article',
          field: 'author',
          issue: 'author must have @type: "Person"',
          fix: 'Set author @type to "Person"'
        });
      }
      if (!schema.author.name) {
        issues.push({
          file: filePath,
          type: 'error',
          schema: 'Article',
          field: 'author.name',
          issue: 'author missing name',
          fix: 'Add name to author object'
        });
      }

      // Recommend @id for author
      if (!schema.author['@id']) {
        issues.push({
          file: filePath,
          type: 'warning',
          schema: 'Article',
          field: 'author.@id',
          issue: 'author missing @id reference',
          fix: 'Add @id reference to centralized author (e.g., /about#scott-bradley)'
        });
      }
    }
  }

  // Validate publisher structure
  if (schema.publisher) {
    if (typeof schema.publisher === 'object') {
      // Check if it's using @id reference (recommended)
      if (!schema.publisher['@id']) {
        issues.push({
          file: filePath,
          type: 'warning',
          schema: 'Article',
          field: 'publisher',
          issue: 'publisher should reference Organization via @id',
          fix: 'Use publisher: { "@id": "https://www.chefapprovedtools.com/#organization" }'
        });
      }
    }
  }

  // Check for mainEntityOfPage (recommended)
  if (!schema.mainEntityOfPage) {
    issues.push({
      file: filePath,
      type: 'warning',
      schema: 'Article',
      field: 'mainEntityOfPage',
      issue: 'Missing mainEntityOfPage',
      fix: 'Add mainEntityOfPage with @type: "WebPage" and @id'
    });
  }

  // Check @id
  if (!schema['@id']) {
    issues.push({
      file: filePath,
      type: 'warning',
      schema: 'Article',
      field: '@id',
      issue: 'Missing @id for proper entity reference',
      fix: 'Add @id with format: https://www.chefapprovedtools.com/blog/[slug]#article'
    });
  }

  return issues;
}

/**
 * Validate all schemas in a file or URL
 */
function validateSchemas(schemas: ParsedSchema[], filePath: string): ValidationIssue[] {
  let issues: ValidationIssue[] = [];

  for (const schema of schemas) {
    switch (schema['@type']) {
      case 'Product':
        issues = issues.concat(validateProductSchema(schema, filePath));
        break;
      case 'Article':
      case 'BlogPosting':
        issues = issues.concat(validateArticleSchema(schema, filePath));
        break;
      // Add other schema types as needed
    }
  }

  return issues;
}

// =============================================================================
// FILE DISCOVERY
// =============================================================================

/**
 * Find all page files to validate
 */
function findPageFiles(): string[] {
  const reviewPages = glob.sync('app/reviews/*/page.tsx');
  const blogPages = glob.sync('app/blog/*/page.tsx');

  return [...reviewPages, ...blogPages];
}

/**
 * Determine if file should have Product or Article schema
 */
function getExpectedSchemaType(filePath: string): 'Product' | 'Article' | null {
  if (filePath.includes('/reviews/')) return 'Product';
  if (filePath.includes('/blog/') || filePath.includes('/guides/')) return 'Article';
  return null;
}

// =============================================================================
// VALIDATION ORCHESTRATION
// =============================================================================

/**
 * Validate local files
 */
async function validateLocalFiles(): Promise<SchemaValidationResult[]> {
  const files = findPageFiles();
  const results: SchemaValidationResult[] = [];

  for (const file of files) {
    const schemas = extractSchemasFromFile(file);
    const issues = validateSchemas(schemas, file);

    // Check if expected schema type is present
    const expectedType = getExpectedSchemaType(file);
    if (expectedType) {
      const hasExpectedType = schemas.some(s => s['@type'] === expectedType);
      if (!hasExpectedType) {
        issues.push({
          file,
          type: 'missing',
          schema: expectedType,
          issue: `Missing ${expectedType} schema`,
          fix: `Add generate${expectedType}Schema() call`
        });
      }
    }

    results.push({ file, schemas, issues });
  }

  return results;
}

/**
 * Validate live URLs
 */
async function validateLiveUrls(urls: string[]): Promise<SchemaValidationResult[]> {
  const results: SchemaValidationResult[] = [];

  for (const url of urls) {
    const schemas = await extractSchemasFromUrl(url);
    const issues = validateSchemas(schemas, url);
    results.push({ file: url, schemas, issues });
  }

  return results;
}

// =============================================================================
// REPORTING
// =============================================================================

/**
 * Generate summary statistics
 */
function generateSummary(results: SchemaValidationResult[]): ValidationSummary {
  let totalErrors = 0;
  let totalWarnings = 0;
  let totalMissing = 0;
  let productPages = 0;
  let blogPages = 0;

  for (const result of results) {
    const errors = result.issues.filter(i => i.type === 'error').length;
    const warnings = result.issues.filter(i => i.type === 'warning').length;
    const missing = result.issues.filter(i => i.type === 'missing').length;

    totalErrors += errors;
    totalWarnings += warnings;
    totalMissing += missing;

    if (result.file.includes('/reviews/')) productPages++;
    if (result.file.includes('/blog/')) blogPages++;
  }

  const valid = results.filter(r => r.issues.length === 0).length;

  return {
    total: results.length,
    valid,
    warnings: totalWarnings,
    errors: totalErrors,
    missing: totalMissing,
    byType: {
      products: productPages,
      blogs: blogPages,
    }
  };
}

/**
 * Format console report
 */
function formatConsoleReport(results: SchemaValidationResult[], summary: ValidationSummary): string {
  let output = '\n';
  output += '═══════════════════════════════════════════════════════════════════\n';
  output += '  SCHEMA VALIDATION REPORT\n';
  output += '═══════════════════════════════════════════════════════════════════\n\n';

  output += `Scanned: ${summary.byType.products} product reviews, ${summary.byType.blogs} blog posts\n\n`;

  output += 'SUMMARY:\n';
  output += `${colors.green}✅ Valid: ${summary.valid}${colors.reset}\n`;
  output += `${colors.yellow}⚠️  Warnings: ${summary.warnings}${colors.reset}\n`;
  output += `${colors.red}❌ Errors: ${summary.errors}${colors.reset}\n`;
  output += `${colors.red}🚫 No Schema: ${summary.missing}${colors.reset}\n\n`;

  // Group issues by type
  const errors = results.filter(r => r.issues.some(i => i.type === 'error'));
  const warnings = results.filter(r => r.issues.some(i => i.type === 'warning') && !r.issues.some(i => i.type === 'error'));
  const missing = results.filter(r => r.issues.some(i => i.type === 'missing'));

  if (errors.length > 0) {
    output += '═══════════════════════════════════════════════════════════════════\n';
    output += `${colors.red}❌ ERRORS (${errors.length} files)${colors.reset}\n`;
    output += '═══════════════════════════════════════════════════════════════════\n\n';

    for (const result of errors) {
      const errorIssues = result.issues.filter(i => i.type === 'error');
      output += `${colors.red}❌ ${result.file}${colors.reset}\n`;
      for (const issue of errorIssues) {
        output += `   ${issue.schema}${issue.field ? `.${issue.field}` : ''}: ${issue.issue}\n`;
        output += `   ${colors.gray}Fix: ${issue.fix}${colors.reset}\n`;
      }
      output += '\n';
    }
  }

  if (missing.length > 0) {
    output += '═══════════════════════════════════════════════════════════════════\n';
    output += `${colors.red}🚫 MISSING SCHEMAS (${missing.length} files)${colors.reset}\n`;
    output += '═══════════════════════════════════════════════════════════════════\n\n';

    for (const result of missing) {
      const missingIssues = result.issues.filter(i => i.type === 'missing');
      output += `${colors.red}🚫 ${result.file}${colors.reset}\n`;
      for (const issue of missingIssues) {
        output += `   ${issue.issue}\n`;
        output += `   ${colors.gray}Fix: ${issue.fix}${colors.reset}\n`;
      }
      output += '\n';
    }
  }

  if (warnings.length > 0) {
    output += '═══════════════════════════════════════════════════════════════════\n';
    output += `${colors.yellow}⚠️  WARNINGS (${warnings.length} files)${colors.reset}\n`;
    output += '═══════════════════════════════════════════════════════════════════\n\n';

    for (const result of warnings) {
      const warningIssues = result.issues.filter(i => i.type === 'warning');
      output += `${colors.yellow}⚠️  ${result.file}${colors.reset}\n`;
      for (const issue of warningIssues) {
        output += `   ${issue.schema}${issue.field ? `.${issue.field}` : ''}: ${issue.issue}\n`;
        output += `   ${colors.gray}Fix: ${issue.fix}${colors.reset}\n`;
      }
      output += '\n';
    }
  }

  output += '═══════════════════════════════════════════════════════════════════\n';
  output += 'DETAILS: [full breakdown above]\n';
  output += '═══════════════════════════════════════════════════════════════════\n';

  return output;
}

// =============================================================================
// MAIN
// =============================================================================

async function main() {
  console.log(`${colors.blue}📋 Schema Validation Tool${colors.reset}\n`);
  console.log(`Mode: ${mode}`);
  if (singleUrl) console.log(`URL: ${singleUrl}`);
  console.log('');

  let results: SchemaValidationResult[];

  if (mode === 'live') {
    // Build URLs from file paths
    const files = findPageFiles();
    const urls = files.map(f => {
      const slug = f.replace('app/', '').replace('/page.tsx', '');
      return `https://www.chefapprovedtools.com/${slug}`;
    });

    console.log(`Validating ${urls.length} live URLs...\n`);
    results = await validateLiveUrls(urls);
  } else if (singleUrl) {
    console.log(`Validating single URL: ${singleUrl}\n`);
    results = await validateLiveUrls([singleUrl]);
  } else {
    // Local mode
    const files = findPageFiles();
    console.log(`Validating ${files.length} local files...\n`);
    results = await validateLocalFiles();
  }

  // Generate summary
  const summary = generateSummary(results);

  // Format and display report
  const report = formatConsoleReport(results, summary);
  console.log(report);

  // Save report to file if requested
  if (reportPath) {
    const plainReport = report.replace(/\x1b\[[0-9;]*m/g, ''); // Remove color codes
    fs.writeFileSync(reportPath, plainReport);
    console.log(`${colors.green}✅ Report saved to ${reportPath}${colors.reset}\n`);
  }

  // Exit with error code if there are errors or missing schemas
  if (summary.errors > 0 || summary.missing > 0) {
    process.exit(1);
  }

  if (summary.warnings > 0) {
    console.log(`${colors.yellow}⚠️  Validation passed with warnings${colors.reset}\n`);
    process.exit(0);
  }

  console.log(`${colors.green}✅ All schema validation checks passed!${colors.reset}\n`);
  process.exit(0);
}

main().catch(error => {
  console.error(`${colors.red}❌ Fatal error: ${error}${colors.reset}`);
  process.exit(1);
});
