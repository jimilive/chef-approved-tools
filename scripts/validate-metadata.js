const { validateAllMetadata } = require('../data/metadata.ts');

console.log('📋 Validating centralized metadata file...\n');

const errors = validateAllMetadata();

if (errors.length > 0) {
  console.log('❌ METADATA VALIDATION FAILED\n');
  errors.forEach(error => {
    console.log(`${error}`);
    console.log('---');
  });
  console.log(`\nTotal errors: ${errors.length}\n`);
  process.exit(1);
}

console.log('✅ All metadata validation checks passed!');
console.log('✅ All 37 reviews have valid metadata in data/metadata.ts\n');
process.exit(0);
