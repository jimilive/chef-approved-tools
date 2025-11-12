const fs = require('fs');
const glob = require('glob');

let errors = [];

console.log('📋 Validating schema.org markup...\n');

const pageFiles = glob.sync('app/**/**/page.tsx');

pageFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  const isReviewPage = filePath.includes('app/reviews/');
  const isBlogPage = filePath.includes('app/blog/') || filePath.includes('app/guides/');
  
  if (!isReviewPage && !isBlogPage) return;
  
  // Check for schema script tag
  if (!content.includes('application/ld+json')) {
    errors.push({
      file: filePath,
      issue: 'Missing schema.org markup',
      fix: 'Add JSON-LD schema'
    });
    return;
  }
  
  // Extract schema
  const schemaRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  
  while ((match = schemaRegex.exec(content)) !== null) {
    try {
      const schema = JSON.parse(match[1].trim());
      
      if (!schema['@type']) {
        errors.push({
          file: filePath,
          issue: 'Schema missing @type',
          fix: 'Add @type property'
        });
      }
      
      if (isReviewPage && schema['@type'] !== 'Product') {
        errors.push({
          file: filePath,
          issue: 'Review page should have @type: Product',
          fix: 'Change @type to Product'
        });
      }
    } catch (e) {
      errors.push({
        file: filePath,
        issue: `Invalid JSON in schema: ${e.message}`,
        fix: 'Fix JSON syntax'
      });
    }
  }
});

if (errors.length > 0) {
  console.log('❌ SCHEMA VALIDATION FAILED\n');
  errors.forEach(error => {
    console.log(`File: ${error.file}`);
    console.log(`Issue: ${error.issue}`);
    console.log(`Fix: ${error.fix}`);
    console.log('---');
  });
  console.log(`\nTotal errors: ${errors.length}\n`);
  process.exit(1);
}

console.log('✅ All schema validation checks passed!\n');
process.exit(0);
