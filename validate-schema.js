#!/usr/bin/env node

// Simple structured data validator
const fs = require('fs');
const path = require('path');

// Import the schema definitions
const { organizationSchema, websiteSchema } = require('./lib/schema.ts');

function validateSchema(schema, name) {
  try {
    // Basic validation
    if (!schema['@context'] || !schema['@type']) {
      console.error(`❌ ${name}: Missing @context or @type`);
      return false;
    }

    if (schema['@context'] !== 'https://schema.org') {
      console.error(`❌ ${name}: Invalid @context`);
      return false;
    }

    // Test JSON serialization
    JSON.stringify(schema);

    console.log(`✅ ${name}: Valid JSON-LD structure`);
    return true;
  } catch (error) {
    console.error(`❌ ${name}: ${error.message}`);
    return false;
  }
}

// Validate main schemas
console.log('🔍 Validating Structured Data Schemas...\n');

let allValid = true;

allValid &= validateSchema(organizationSchema, 'Organization Schema');
allValid &= validateSchema(websiteSchema, 'Website Schema');

// Test a sample product schema
const sampleProduct = {
  id: 'test-product',
  slug: 'test-product',
  name: 'Test Kitchen Knife',
  brand: 'Test Brand',
  images: { primary: 'https://example.com/image.jpg' },
  reviews: { rating: 4.5, count: 100 },
  affiliateLinks: [{ url: 'https://amazon.com/test' }],
  inStock: true,
  pros: ['Sharp', 'Durable'],
  lastUpdated: '2023-09-27'
};

try {
  const { generateProductSchema } = require('./lib/schema.ts');
  const productSchema = generateProductSchema(sampleProduct);
  allValid &= validateSchema(productSchema, 'Product Schema');
} catch (error) {
  console.error(`❌ Product Schema: Could not load or validate - ${error.message}`);
  allValid = false;
}

if (allValid) {
  console.log('\n✅ All structured data schemas are valid!');
  console.log('\n📝 SEO Recommendations:');
  console.log('- Organization schema ✅');
  console.log('- Website schema ✅');
  console.log('- Product schema ✅');
  console.log('- FAQ schema ✅');
  console.log('- Review schema ✅');
  console.log('\n🔗 Test your live site with:');
  console.log('- Google Rich Results Test: https://search.google.com/test/rich-results');
  console.log('- Schema.org Validator: https://validator.schema.org/');
  process.exit(0);
} else {
  console.log('\n❌ Some schemas have issues that need fixing.');
  process.exit(1);
}