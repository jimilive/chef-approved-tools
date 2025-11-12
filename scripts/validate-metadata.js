const fs = require('fs');
const glob = require('glob');

let errors = [];

console.log('📋 Validating metadata...\n');

const pageFiles = glob.sync('app/**/**/page.tsx');

pageFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Extract title
  const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
  if (titleMatch) {
    const title = titleMatch[1];
    if (title.length > 60) {
      errors.push({
        file: filePath,
        issue: `Title too long: ${title.length} chars (max 60)`,
        title: title
      });
    }
  }
  
  // Extract description
  const descMatch = content.match(/description:\s*["']([^"']+)["']/);
  if (descMatch) {
    const desc = descMatch[1];
    if (desc.length < 150 || desc.length > 160) {
      errors.push({
        file: filePath,
        issue: `Description wrong length: ${desc.length} chars (should be 150-160)`,
        desc: desc.substring(0, 50) + '...'
      });
    }
  }
});

if (errors.length > 0) {
  console.log('❌ METADATA VALIDATION FAILED\n');
  errors.forEach(error => {
    console.log(`File: ${error.file}`);
    console.log(`Issue: ${error.issue}`);
    if (error.title) console.log(`Title: ${error.title}`);
    if (error.desc) console.log(`Desc: ${error.desc}`);
    console.log('---');
  });
  console.log(`\nTotal errors: ${errors.length}\n`);
  process.exit(1);
}

console.log('✅ All metadata validation checks passed!\n');
process.exit(0);
