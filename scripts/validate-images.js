const fs = require('fs');
const glob = require('glob');

let errors = [];

console.log('🖼️  Validating images...\n');

const pageFiles = glob.sync('app/**/**/page.tsx');

pageFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Check for Image components without quality prop
  const imageRegex = /<Image\s+([^>]+)>/g;
  let match;
  
  while ((match = imageRegex.exec(content)) !== null) {
    const imageTag = match[1];
    
    if (!imageTag.includes('quality=')) {
      errors.push({
        file: filePath,
        issue: 'Missing quality prop on Image component',
        fix: 'Add quality={75}'
      });
    }
    
    if (!imageTag.includes('alt=')) {
      errors.push({
        file: filePath,
        issue: 'Missing alt text on Image component',
        fix: 'Add descriptive alt text'
      });
    }
  }
});

if (errors.length > 0) {
  console.log('❌ IMAGE VALIDATION FAILED\n');
  errors.forEach(error => {
    console.log(`File: ${error.file}`);
    console.log(`Issue: ${error.issue}`);
    console.log(`Fix: ${error.fix}`);
    console.log('---');
  });
  console.log(`\nTotal errors: ${errors.length}\n`);
  process.exit(1);
}

console.log('✅ All image validation checks passed!\n');
process.exit(0);
