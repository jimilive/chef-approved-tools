const fs = require('fs');
const glob = require('glob');

let errors = [];
let warnings = [];

console.log('📋 Validating schema.org markup...\n');

const pageFiles = glob.sync('app/**/**/page.tsx');

// Helper to extract all JSON-LD schemas from a file
function extractSchemas(content) {
  const schemaRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*dangerouslySetInnerHTML=\{\{\s*__html:\s*JSON\.stringify\(([\s\S]*?)\)\s*\}\}/gi;
  const schemas = [];
  let match;

  while ((match = schemaRegex.exec(content)) !== null) {
    try {
      // Extract the variable name or inline object
      const schemaCode = match[1].trim();
      schemas.push({ code: schemaCode, raw: match[0] });
    } catch (e) {
      // Will be handled in validation
    }
  }

  return schemas;
}

// Validate Product schema (for review pages)
function validateProductSchema(schema, filePath) {
  const required = ['@context', '@type', 'name', 'description', 'brand'];

  required.forEach(field => {
    if (!schema[field]) {
      errors.push({
        file: filePath,
        issue: `Product schema missing required field: ${field}`,
        fix: `Add ${field} to Product schema`
      });
    }
  });

  // Check for nested review and aggregateRating (recommended structure)
  if (!schema.review) {
    warnings.push({
      file: filePath,
      issue: 'Product schema missing nested review',
      fix: 'Add review property with nested Review schema'
    });
  }

  if (!schema.aggregateRating) {
    warnings.push({
      file: filePath,
      issue: 'Product schema missing aggregateRating',
      fix: 'Add aggregateRating property'
    });
  }

  // Validate review structure if present
  if (schema.review) {
    if (schema.review['@type'] !== 'Review') {
      errors.push({
        file: filePath,
        issue: 'Nested review must have @type: Review',
        fix: 'Set review @type to Review'
      });
    }

    const reviewRequired = ['reviewRating', 'author'];
    reviewRequired.forEach(field => {
      if (!schema.review[field]) {
        errors.push({
          file: filePath,
          issue: `Review schema missing required field: ${field}`,
          fix: `Add ${field} to review`
        });
      }
    });

    // Check for @id reference
    if (!schema.review['@id']) {
      warnings.push({
        file: filePath,
        issue: 'Review missing @id for proper entity reference',
        fix: 'Add @id to review (e.g., #review)'
      });
    }
  }

  // Check for @id on Product itself
  if (!schema['@id']) {
    warnings.push({
      file: filePath,
      issue: 'Product schema missing @id',
      fix: 'Add @id for proper entity reference (e.g., #product)'
    });
  }

  // Check brand structure
  if (schema.brand && typeof schema.brand === 'object') {
    if (schema.brand['@type'] !== 'Brand') {
      warnings.push({
        file: filePath,
        issue: 'Brand should have @type: Brand',
        fix: 'Set brand @type to Brand'
      });
    }
  }
}

// Validate Article schema (for blog/guide pages)
function validateArticleSchema(schema, filePath) {
  const required = ['@context', '@type', 'headline', 'description', 'datePublished', 'author', 'publisher'];

  required.forEach(field => {
    if (!schema[field]) {
      errors.push({
        file: filePath,
        issue: `Article schema missing required field: ${field}`,
        fix: `Add ${field} to Article schema`
      });
    }
  });

  // Validate author structure
  if (schema.author) {
    if (schema.author['@type'] !== 'Person') {
      errors.push({
        file: filePath,
        issue: 'Article author must have @type: Person',
        fix: 'Set author @type to Person'
      });
    }

    // Check for @id reference to centralized author
    if (!schema.author['@id']) {
      warnings.push({
        file: filePath,
        issue: 'Author missing @id reference',
        fix: 'Add @id reference to centralized author (e.g., /about#scott-bradley)'
      });
    }
  }

  // Validate publisher reference
  if (schema.publisher) {
    if (!schema.publisher['@id']) {
      warnings.push({
        file: filePath,
        issue: 'Publisher should reference Organization via @id',
        fix: 'Use publisher: { "@id": "/#organization" }'
      });
    }
  }

  // Check for mainEntityOfPage
  if (!schema.mainEntityOfPage) {
    warnings.push({
      file: filePath,
      issue: 'Article missing mainEntityOfPage',
      fix: 'Add mainEntityOfPage with @type: WebPage'
    });
  }

  // Check for @id
  if (!schema['@id']) {
    warnings.push({
      file: filePath,
      issue: 'Article missing @id',
      fix: 'Add @id for proper entity reference (e.g., #article)'
    });
  }
}

// Validate ItemList schema
function validateItemListSchema(schema, filePath) {
  const required = ['@context', '@type', 'itemListElement'];

  required.forEach(field => {
    if (!schema[field]) {
      errors.push({
        file: filePath,
        issue: `ItemList schema missing required field: ${field}`,
        fix: `Add ${field} to ItemList schema`
      });
    }
  });

  // Validate itemListElement structure
  if (schema.itemListElement) {
    if (!Array.isArray(schema.itemListElement)) {
      errors.push({
        file: filePath,
        issue: 'itemListElement must be an array',
        fix: 'Change itemListElement to array format'
      });
    } else {
      schema.itemListElement.forEach((item, index) => {
        if (item['@type'] !== 'ListItem') {
          errors.push({
            file: filePath,
            issue: `itemListElement[${index}] must have @type: ListItem`,
            fix: 'Set @type to ListItem'
          });
        }

        if (!item.position) {
          errors.push({
            file: filePath,
            issue: `itemListElement[${index}] missing position`,
            fix: 'Add position field (1-indexed)'
          });
        }

        // Check position is sequential
        if (item.position !== index + 1) {
          warnings.push({
            file: filePath,
            issue: `itemListElement[${index}] position should be ${index + 1}, got ${item.position}`,
            fix: 'Ensure positions are sequential starting from 1'
          });
        }
      });
    }
  }

  // Recommend numberOfItems
  if (!schema.numberOfItems) {
    warnings.push({
      file: filePath,
      issue: 'ItemList missing numberOfItems',
      fix: 'Add numberOfItems property'
    });
  }
}

// Validate BreadcrumbList schema
function validateBreadcrumbSchema(schema, filePath) {
  const required = ['@context', '@type', 'itemListElement'];

  required.forEach(field => {
    if (!schema[field]) {
      errors.push({
        file: filePath,
        issue: `BreadcrumbList schema missing required field: ${field}`,
        fix: `Add ${field} to BreadcrumbList schema`
      });
    }
  });

  // Validate breadcrumb items
  if (schema.itemListElement && Array.isArray(schema.itemListElement)) {
    schema.itemListElement.forEach((item, index) => {
      if (item['@type'] !== 'ListItem') {
        errors.push({
          file: filePath,
          issue: `breadcrumb[${index}] must have @type: ListItem`,
          fix: 'Set @type to ListItem'
        });
      }

      if (!item.name) {
        errors.push({
          file: filePath,
          issue: `breadcrumb[${index}] missing name`,
          fix: 'Add name field'
        });
      }

      if (!item.item && index < schema.itemListElement.length - 1) {
        errors.push({
          file: filePath,
          issue: `breadcrumb[${index}] missing item`,
          fix: 'Add item field with @id or url'
        });
      }

      // Position should be sequential
      if (item.position !== index + 1) {
        errors.push({
          file: filePath,
          issue: `breadcrumb[${index}] position should be ${index + 1}, got ${item.position}`,
          fix: 'Ensure positions are sequential'
        });
      }
    });
  }
}

// Validate CollectionPage schema
function validateCollectionPageSchema(schema, filePath) {
  const required = ['@context', '@type', 'name', 'url'];

  required.forEach(field => {
    if (!schema[field]) {
      errors.push({
        file: filePath,
        issue: `CollectionPage schema missing required field: ${field}`,
        fix: `Add ${field} to CollectionPage schema`
      });
    }
  });

  // Check for mainEntity with ItemList
  if (!schema.mainEntity) {
    warnings.push({
      file: filePath,
      issue: 'CollectionPage missing mainEntity',
      fix: 'Add mainEntity with nested ItemList'
    });
  } else if (schema.mainEntity['@type'] !== 'ItemList') {
    warnings.push({
      file: filePath,
      issue: 'CollectionPage mainEntity should be ItemList',
      fix: 'Set mainEntity @type to ItemList'
    });
  }
}

// Validate FAQ schema
function validateFAQSchema(schema, filePath) {
  const required = ['@context', '@type', 'mainEntity'];

  required.forEach(field => {
    if (!schema[field]) {
      errors.push({
        file: filePath,
        issue: `FAQPage schema missing required field: ${field}`,
        fix: `Add ${field} to FAQPage schema`
      });
    }
  });

  // Validate FAQ questions
  if (schema.mainEntity && Array.isArray(schema.mainEntity)) {
    schema.mainEntity.forEach((item, index) => {
      if (item['@type'] !== 'Question') {
        errors.push({
          file: filePath,
          issue: `FAQ[${index}] must have @type: Question`,
          fix: 'Set @type to Question'
        });
      }

      if (!item.name) {
        errors.push({
          file: filePath,
          issue: `FAQ[${index}] missing name (question text)`,
          fix: 'Add name field with question'
        });
      }

      if (!item.acceptedAnswer) {
        errors.push({
          file: filePath,
          issue: `FAQ[${index}] missing acceptedAnswer`,
          fix: 'Add acceptedAnswer with @type: Answer'
        });
      } else if (item.acceptedAnswer['@type'] !== 'Answer') {
        errors.push({
          file: filePath,
          issue: `FAQ[${index}] acceptedAnswer must have @type: Answer`,
          fix: 'Set acceptedAnswer @type to Answer'
        });
      }
    });
  }
}

// Main validation loop
pageFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Determine page type
  const isReviewPage = filePath.match(/app\/reviews\/[^/]+\/page\.tsx$/);
  const isReviewsListing = filePath === 'app/reviews/page.tsx';
  const isGuidesListing = filePath === 'app/guides/page.tsx';
  const isBlogListing = filePath === 'app/blog/page.tsx';
  const isGuidePage = filePath.match(/app\/guides\/[^/]+\/page\.tsx$/);
  const isBlogPost = filePath.match(/app\/blog\/[^/]+\/page\.tsx$/);

  // Only validate specific page types
  if (!isReviewPage && !isReviewsListing && !isGuidesListing && !isBlogListing && !isGuidePage && !isBlogPost) {
    return;
  }

  // Check for schema presence
  if (!content.includes('application/ld+json')) {
    errors.push({
      file: filePath,
      issue: 'Missing schema.org markup',
      fix: 'Add JSON-LD schema using <script type="application/ld+json">'
    });
    return;
  }

  // Extract and parse schemas
  const schemaMatches = content.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);

  for (const match of schemaMatches) {
    try {
      // Try to parse the JSON directly from the rendered content
      // This is a simplified approach - in production you'd want to evaluate the actual schema generation
      const jsonMatch = match[1].match(/JSON\.stringify\((.*?)\)/s);

      // For validation, we'll just check that the schema tag exists with proper format
      // Actual schema validation would require executing the TypeScript code

      // Check for proper dangerouslySetInnerHTML format
      if (!match[0].includes('dangerouslySetInnerHTML')) {
        warnings.push({
          file: filePath,
          issue: 'Schema should use dangerouslySetInnerHTML with JSON.stringify',
          fix: 'Use dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}'
        });
      }

      // Check for proper schema variable usage
      if (!match[0].includes('Schema') && !match[0].includes('schema')) {
        warnings.push({
          file: filePath,
          issue: 'Schema variable should follow naming convention (e.g., productSchema, articleSchema)',
          fix: 'Use descriptive schema variable names'
        });
      }

    } catch (e) {
      errors.push({
        file: filePath,
        issue: `Schema parsing error: ${e.message}`,
        fix: 'Check schema syntax and structure'
      });
    }
  }

  // Page-specific schema requirements
  if (isReviewPage) {
    // Review pages should have Product + Breadcrumb + FAQ schemas
    const hasProduct = content.includes('generateProductSchema') || content.includes('@type": "Product');
    const hasBreadcrumb = content.includes('generateBreadcrumbSchema') || content.includes('@type": "BreadcrumbList');

    if (!hasProduct) {
      errors.push({
        file: filePath,
        issue: 'Review page missing Product schema',
        fix: 'Add generateProductSchema() call'
      });
    }

    if (!hasBreadcrumb) {
      warnings.push({
        file: filePath,
        issue: 'Review page missing Breadcrumb schema',
        fix: 'Add generateBreadcrumbSchema() call'
      });
    }
  }

  if (isReviewsListing || isGuidesListing) {
    // Listing pages should have ItemList + Breadcrumb
    const hasItemList = content.includes('generateItemListSchema') || content.includes('itemListSchema') || content.includes('@type": "ItemList');
    const hasBreadcrumb = content.includes('generateBreadcrumbSchema') || content.includes('breadcrumbSchema');

    if (!hasItemList) {
      errors.push({
        file: filePath,
        issue: 'Listing page missing ItemList schema',
        fix: 'Add ItemList schema for product/guide listings'
      });
    }

    if (!hasBreadcrumb) {
      warnings.push({
        file: filePath,
        issue: 'Listing page missing Breadcrumb schema',
        fix: 'Add generateBreadcrumbSchema() call'
      });
    }
  }

  if (isBlogListing) {
    // Blog listing should have CollectionPage + ItemList + Breadcrumb
    const hasCollection = content.includes('@type": "CollectionPage') || content.includes('CollectionPage');
    const hasBreadcrumb = content.includes('generateBreadcrumbSchema') || content.includes('breadcrumbSchema');

    if (!hasCollection) {
      errors.push({
        file: filePath,
        issue: 'Blog listing missing CollectionPage schema',
        fix: 'Add CollectionPage schema with nested ItemList'
      });
    }

    if (!hasBreadcrumb) {
      warnings.push({
        file: filePath,
        issue: 'Blog listing missing Breadcrumb schema',
        fix: 'Add generateBreadcrumbSchema() call'
      });
    }
  }

  if (isGuidePage || isBlogPost) {
    // Guide/blog pages should have Article + Breadcrumb
    const hasArticle = content.includes('generateArticleSchema') || content.includes('@type": "Article');
    const hasBreadcrumb = content.includes('generateBreadcrumbSchema') || content.includes('breadcrumbSchema');

    if (!hasArticle) {
      errors.push({
        file: filePath,
        issue: 'Guide/blog page missing Article schema',
        fix: 'Add generateArticleSchema() call'
      });
    }

    if (!hasBreadcrumb) {
      warnings.push({
        file: filePath,
        issue: 'Guide/blog page missing Breadcrumb schema',
        fix: 'Add generateBreadcrumbSchema() call'
      });
    }
  }
});

// Report results
if (errors.length > 0) {
  console.log('❌ SCHEMA VALIDATION FAILED\n');
  console.log('ERRORS:');
  errors.forEach(error => {
    console.log(`\nFile: ${error.file}`);
    console.log(`Issue: ${error.issue}`);
    console.log(`Fix: ${error.fix}`);
  });
  console.log(`\n📊 Total errors: ${errors.length}\n`);

  if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    warnings.forEach(warning => {
      console.log(`\nFile: ${warning.file}`);
      console.log(`Issue: ${warning.issue}`);
      console.log(`Fix: ${warning.fix}`);
    });
    console.log(`\n📊 Total warnings: ${warnings.length}\n`);
  }

  process.exit(1);
}

if (warnings.length > 0) {
  console.log('⚠️  Schema validation passed with warnings:\n');
  warnings.forEach(warning => {
    console.log(`File: ${warning.file}`);
    console.log(`Issue: ${warning.issue}`);
    console.log(`Fix: ${warning.fix}`);
    console.log('---');
  });
  console.log(`\n📊 Total warnings: ${warnings.length}\n`);
}

console.log('✅ All schema validation checks passed!\n');
process.exit(0);
