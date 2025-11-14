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

const PRICING_VIOLATIONS = [
  /\$\d+/g,  // $50, $49.99
  /costs? \$\d+/gi,
  /priced at/gi,
  /budget[- ]friendly/gi
];

const pageFiles = glob.sync('app/**/**/page.tsx');

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

  // Check pricing violations
  PRICING_VIOLATIONS.forEach(pattern => {
    if (pattern.test(contentWithoutComments)) {
      errors.push({
        file: filePath,
        issue: `Pricing violation: ${pattern.source}`,
        fix: 'Remove price mentions, use longevity language'
      });
    }
  });

  // Check Amazon tag (use original content for this check)
  if (content.includes('amazon.com') && !content.includes('chefapprovedt-20')) {
    errors.push({
      file: filePath,
      issue: 'Amazon link without correct affiliate tag',
      fix: 'Add ?tag=chefapprovedt-20'
    });
  }
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
