const fs = require('fs');
const glob = require('glob');

let errors = [];

console.log('📝 Validating content rules...\n');

const FORBIDDEN_PHRASES = [
  /let'?s dive in/gi,
  /game[- ]changer/gi,
  /revolutionary/gi,
  /without further ado/gi
];

// Helper function to find pricing violations with context
function findPricingViolations(content) {
  const violations = [];

  // Split content into lines for better context checking
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Skip if line contains allowed patterns
    const allowedPatterns = [
      /around \$\d+/i,
      /under \$\d+/i,
      /about \$\d+/i,
      /approximately \$\d+/i,
      /~\$\d+/,  // ~$50, ~$150
      /\$\d+-\$?\d+/,  // $50-$100, $25-40 (price ranges)
      /\$\d{2,3},?\d{3}/,  // $80,000 or $80000 (revenue figures)
      /\$\d+K/i,  // $80K
      /\$\d+\+/,  // $80+ or $80,000+
    ];

    // If line matches any allowed pattern, skip it
    if (allowedPatterns.some(pattern => pattern.test(line))) {
      return;
    }

    // Now check for problematic pricing patterns
    const problematicPatterns = [
      { pattern: /(?<![a-z])\$\d+(?:\.\d{2})?(?![K+])/gi, message: 'Bare dollar amount' },
      { pattern: /costs? \$\d+/gi, message: 'Costs $X' },
      { pattern: /priced at/gi, message: 'Priced at' },
      { pattern: /budget[- ]friendly/gi, message: 'Budget-friendly' },
    ];

    problematicPatterns.forEach(({ pattern, message }) => {
      if (pattern.test(line)) {
        violations.push({
          line: index + 1,
          content: line.trim(),
          message: message
        });
      }
    });
  });

  return violations;
}

// ONLY CHECK REVIEW PAGES - Remove this filter to check entire site
const pageFiles = glob.sync('app/reviews/**/page.tsx');

pageFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Remove comments before validation
  const contentWithoutComments = content
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove /* */ block comments
    .replace(/\/\/.*/g, ''); // Remove // line comments

  // Check forbidden phrases
  FORBIDDEN_PHRASES.forEach(phrase => {
    if (phrase.test(contentWithoutComments)) {
      errors.push({
        file: filePath,
        issue: `Forbidden phrase found: ${phrase.source}`,
        fix: 'Remove marketing hype language'
      });
    }
  });

  // Check pricing violations using context-aware function
  const pricingViolations = findPricingViolations(contentWithoutComments);
  pricingViolations.forEach(violation => {
    errors.push({
      file: filePath,
      issue: `Pricing violation on line ${violation.line}: ${violation.message}`,
      fix: 'Remove price mentions, use longevity language or add qualifier (around/under/about)'
    });
  });

  // Check Amazon tag (use original content for this check)
  if (content.includes('amazon.com') && !content.includes('chefapprovedt-20')) {
    errors.push({
      file: filePath,
      issue: 'Amazon link without correct affiliate tag',
      fix: 'Add ?tag=chefapprovedt-20'
    });
  }

  // Check CTA text (must be "Check Price on Amazon")
  const incorrectCTAPatterns = [
    /Buy on Amazon/gi,
    /Purchase on Amazon/gi,
    /Shop on Amazon/gi,
    /View Price on Amazon/gi,
    /View on Amazon/gi,
    /Get it on Amazon/gi,
    /Order on Amazon/gi,
  ];

  incorrectCTAPatterns.forEach(pattern => {
    if (pattern.test(content)) {
      errors.push({
        file: filePath,
        issue: `Incorrect CTA text found: ${pattern.source}`,
        fix: 'Change to "Check Price on Amazon"'
      });
    }
  });
});

if (errors.length > 0) {
  console.log('❌ CONTENT VALIDATION FAILED\n');
  errors.forEach(error => {
    console.log(`File: ${error.file}`);
    console.log(`Issue: ${error.issue}`);
    console.log(`Fix: ${error.fix}`);
    console.log('---');
  });
  console.log(`\nTotal errors: ${errors.length}\n`);
  process.exit(1);
}

console.log('✅ All content validation checks passed!\n');
process.exit(0);
