#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function countWordsInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Remove comments
  let text = content.replace(/\/\*[\s\S]*?\*\//g, '');
  text = text.replace(/\/\/.*/g, '');

  // Extract JSX text content (text between > and <)
  const jsxTextRegex = />([^<>{}]+)</g;
  const jsxTexts = [];
  let match;
  while ((match = jsxTextRegex.exec(text)) !== null) {
    const captured = match[1].trim();
    if (captured && !captured.match(/^[\s\n\r\t]*$/)) {
      jsxTexts.push(captured);
    }
  }

  // Extract string literals (content in quotes)
  const stringRegex = /(['"`])(?:(?=(\\?))\2.)*?\1/g;
  const strings = [];
  while ((match = stringRegex.exec(text)) !== null) {
    const str = match[0].slice(1, -1); // Remove quotes
    // Skip if it looks like code (has common code patterns)
    if (!str.match(/^(import|export|const|let|var|function|=>|{|}|\[|\]|className|href|src|alt|type|id)/) &&
        !str.match(/^https?:\/\//) &&
        str.length > 3) {
      strings.push(str);
    }
  }

  // Combine all text
  const allText = [...jsxTexts, ...strings].join(' ');

  // Remove HTML entities and tags
  const cleaned = allText
    .replace(/&[a-z]+;/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{[^}]+\}/g, ' ');

  // Count words
  const words = cleaned
    .split(/\s+/)
    .filter(w => w.length > 0 && !w.match(/^[\d\W]+$/));

  return words.length;
}

function scanDirectory(dir, category) {
  const results = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      results.push(...scanDirectory(fullPath, category));
    } else if (item.name === 'page.tsx') {
      const pageName = path.basename(path.dirname(fullPath));
      const pageDir = path.dirname(fullPath);

      let wordCount = countWordsInFile(fullPath);

      // Check for data files
      const dataFiles = [
        path.join(pageDir, `${pageName}-data.ts`),
        path.join(pageDir, `${pageName}-data.tsx`)
      ];

      let hasDataFile = false;
      for (const dataFile of dataFiles) {
        if (fs.existsSync(dataFile)) {
          wordCount += countWordsInFile(dataFile);
          hasDataFile = true;
          break;
        }
      }

      results.push({
        name: pageName,
        category,
        words: wordCount,
        hasDataFile
      });
    }
  }

  return results;
}

// Main execution
const appDir = path.join(__dirname, '..', 'app');

console.log('Counting actual content words...\n');

const blogPages = scanDirectory(path.join(appDir, 'blog'), 'blog');
const reviewPages = scanDirectory(path.join(appDir, 'reviews'), 'reviews');
const guidePages = scanDirectory(path.join(appDir, 'guides'), 'guides');

const blogTotal = blogPages.reduce((sum, page) => sum + page.words, 0);
const reviewTotal = reviewPages.reduce((sum, page) => sum + page.words, 0);
const guideTotal = guidePages.reduce((sum, page) => sum + page.words, 0);
const grandTotal = blogTotal + reviewTotal + guideTotal;

const allPages = [...blogPages, ...reviewPages, ...guidePages];
const sortedPages = [...allPages].sort((a, b) => b.words - a.words);

console.log('=== WORD COUNT SUMMARY ===\n');
console.log(`Blog Posts: ${blogPages.length} pages = ${blogTotal.toLocaleString()} words`);
console.log(`Reviews: ${reviewPages.length} pages = ${reviewTotal.toLocaleString()} words`);
console.log(`Guides: ${guidePages.length} pages = ${guideTotal.toLocaleString()} words`);
console.log(`\nTOTAL: ${allPages.length} pages = ${grandTotal.toLocaleString()} words`);

console.log('\n=== TOP 20 LONGEST PAGES ===\n');
sortedPages.slice(0, 20).forEach((page, index) => {
  console.log(`${index + 1}. ${page.name} (${page.category}): ${page.words.toLocaleString()} words`);
});

const avgBlog = Math.round(blogTotal / blogPages.length);
const avgReview = Math.round(reviewTotal / (reviewPages.length - 1)); // Exclude index page
const avgGuide = Math.round(guideTotal / (guidePages.length - 1)); // Exclude index page

console.log('\n=== AVERAGES ===\n');
console.log(`Average blog post: ${avgBlog.toLocaleString()} words`);
console.log(`Average review: ${avgReview.toLocaleString()} words`);
console.log(`Average guide: ${avgGuide.toLocaleString()} words`);

// Reviews under 2000 words
const reviewsUnder2000 = reviewPages.filter(p => p.words < 2000 && p.name !== 'reviews');
if (reviewsUnder2000.length > 0) {
  console.log(`\n=== REVIEWS UNDER 2000 WORDS (${reviewsUnder2000.length}) ===\n`);
  reviewsUnder2000.sort((a, b) => a.words - b.words).forEach(page => {
    console.log(`- ${page.name}: ${page.words.toLocaleString()} words`);
  });
}
