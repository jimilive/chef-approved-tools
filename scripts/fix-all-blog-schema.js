#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '../app/blog');
const blogPosts = fs.readdirSync(blogDir)
  .filter(file => fs.statSync(path.join(blogDir, file)).isDirectory())
  .sort();

console.log(`Fixing schema in ${blogPosts.length} blog posts...\n`);

let fixedCount = 0;
let skippedCount = 0;

blogPosts.forEach(postSlug => {
  const pagePath = path.join(blogDir, postSlug, 'page.tsx');

  if (!fs.existsSync(pagePath)) {
    console.log(`⚠️  Skipping ${postSlug} - no page.tsx found`);
    skippedCount++;
    return;
  }

  let content = fs.readFileSync(pagePath, 'utf8');

  // Check if this file uses generateArticleSchema
  if (!content.includes('generateArticleSchema')) {
    skippedCount++;
    return;
  }

  // Check if already fixed
  if (content.includes("urlPrefix: 'blog'") && content.includes(`urlSuffix: '${postSlug}'`)) {
    console.log(`⏭️  Already fixed: ${postSlug}`);
    skippedCount++;
    return;
  }

  // Find the closing of generateArticleSchema call
  // Match: generateArticleSchema({ ... })
  const regex = /(generateArticleSchema\(\{[^}]*)(}\))/;

  if (regex.test(content)) {
    content = content.replace(regex, (match, opening, closing) => {
      // Add comma before new params if the last line doesn't have one
      const needsComma = !opening.trim().endsWith(',');
      const comma = needsComma ? ',' : '';

      return `${opening}${comma}\n  urlPrefix: 'blog',\n  urlSuffix: '${postSlug}'${closing}`;
    });

    fs.writeFileSync(pagePath, content);
    console.log(`✅ Fixed: ${postSlug}`);
    fixedCount++;
  } else {
    console.log(`⚠️  Pattern not found in: ${postSlug}`);
    skippedCount++;
  }
});

console.log(`\n${'='.repeat(60)}`);
console.log(`✅ Fixed: ${fixedCount} blog posts`);
console.log(`⏭️  Skipped: ${skippedCount} blog posts`);
console.log(`📊 Total: ${blogPosts.length} blog posts`);
