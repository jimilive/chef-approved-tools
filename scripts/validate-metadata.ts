import { validateAllMetadata, getMetadataStats } from '../data/metadata.js';

console.log('=== METADATA VALIDATION ===\n');

const stats = getMetadataStats();
console.log('Metadata Stats:');
console.log('  Pages:', stats.pages);
console.log('  Guides:', stats.guides);
console.log('  Blog Posts:', stats.blog);
console.log('  Reviews:', stats.reviews);
console.log('  Total:', stats.total);

console.log('\n=== VALIDATION RESULTS ===\n');

const errors = validateAllMetadata();

if (errors.length === 0) {
  console.log('✅ ALL METADATA IS VALID - NO ERRORS FOUND');
} else {
  console.log('❌ VALIDATION ERRORS FOUND:\n');
  errors.forEach(error => console.log('  -', error));
  console.log('\nTotal Errors:', errors.length);
}
