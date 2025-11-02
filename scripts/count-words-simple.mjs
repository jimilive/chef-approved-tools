#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple extraction - just get text from string values
function extractContentWords(content) {
  // Remove imports and exports
  content = content.replace(/^import\s+.*$/gm, '');
  content = content.replace(/^export\s+.*$/gm, '');

  // Extract all string content (single and double quotes)
  const strings = [];

  // Match double-quoted strings
  const doubleQuoteRegex = /"([^"\\]*(\\.[^"\\]*)*)"/g;
  let match;
  while ((match = doubleQuoteRegex.exec(content)) !== null) {
    strings.push(match[1]);
  }

  // Match single-quoted strings
  const singleQuoteRegex = /'([^'\\]*(\\.[^'\\]*)*)'/g;
  while ((match = singleQuoteRegex.exec(content)) !== null) {
    strings.push(match[1]);
  }

  // Match template literals (backticks)
  const templateRegex = /`([^`\\]*(\\.[^`\\]*)*)`/g;
  while ((match = templateRegex.exec(content)) !== null) {
    strings.push(match[1]);
  }

  // Join all strings and count words
  const allText = strings.join(' ');

  // Remove HTML tags
  const noHtml = allText.replace(/<[^>]+>/g, ' ');

  // Remove URLs
  const noUrls = noHtml.replace(/https?:\/\/[^\s]+/g, '');

  // Count words (split by whitespace and filter empty)
  const words = noUrls.split(/\s+/).filter(w => w.length > 0);

  return words.length;
}

// Function to scan directory for page.tsx files
function scanDirectory(dir, category) {
  const results = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      results.push(...scanDirectory(fullPath, category));
    } else if (item.name === 'page.tsx') {
      const content = fs.readFileSync(fullPath, 'utf-8');
      let wordCount = extractContentWords(content);

      // Get the page name from the directory
      const pageName = path.basename(path.dirname(fullPath));
      const pageDir = path.dirname(fullPath);

      // Check for associated data file (.ts or .tsx)
      const dataFileNameTS = `${pageName}-data.ts`;
      const dataFileNameTSX = `${pageName}-data.tsx`;
      const dataFilePathTS = path.join(pageDir, dataFileNameTS);
      const dataFilePathTSX = path.join(pageDir, dataFileNameTSX);

      let dataFilePath = null;
      if (fs.existsSync(dataFilePathTS)) {
        dataFilePath = dataFilePathTS;
      } else if (fs.existsSync(dataFilePathTSX)) {
        dataFilePath = dataFilePathTSX;
      }

      let hasDataFile = false;
      if (dataFilePath && fs.existsSync(dataFilePath)) {
        const dataContent = fs.readFileSync(dataFilePath, 'utf-8');
        const dataWordCount = extractContentWords(dataContent);
        wordCount += dataWordCount;
        hasDataFile = true;
      }

      results.push({
        path: fullPath,
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

console.log('Counting words in all content pages (simple method)...\n');

const blogPages = scanDirectory(path.join(appDir, 'blog'), 'blog');
const reviewPages = scanDirectory(path.join(appDir, 'reviews'), 'reviews');
const guidePages = scanDirectory(path.join(appDir, 'guides'), 'guides');

// Combine and calculate totals
const allPages = [...blogPages, ...reviewPages, ...guidePages];

const blogTotal = blogPages.reduce((sum, page) => sum + page.words, 0);
const reviewTotal = reviewPages.reduce((sum, page) => sum + page.words, 0);
const guideTotal = guidePages.reduce((sum, page) => sum + page.words, 0);
const grandTotal = blogTotal + reviewTotal + guideTotal;

// Sort by word count
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

console.log('\n=== BOTTOM 10 SHORTEST PAGES ===\n');
sortedPages.slice(-10).reverse().forEach((page, index) => {
  console.log(`${index + 1}. ${page.name} (${page.category}): ${page.words.toLocaleString()} words`);
});

// Calculate averages
const avgBlog = Math.round(blogTotal / blogPages.length);
const avgReview = Math.round(reviewTotal / reviewPages.length);
const avgGuide = Math.round(guideTotal / guidePages.length);

console.log('\n=== AVERAGES ===\n');
console.log(`Average blog post: ${avgBlog.toLocaleString()} words`);
console.log(`Average review: ${avgReview.toLocaleString()} words`);
console.log(`Average guide: ${avgGuide.toLocaleString()} words`);

// Show pages with data files
const pagesWithDataFiles = allPages.filter(p => p.hasDataFile);
if (pagesWithDataFiles.length > 0) {
  console.log('\n=== PAGES WITH DATA FILES (Component-Based Template) ===\n');
  console.log(`Total: ${pagesWithDataFiles.length} pages using data files\n`);
  pagesWithDataFiles.sort((a, b) => b.words - a.words).forEach(page => {
    console.log(`- ${page.name}: ${page.words.toLocaleString()} words (includes data file)`);
  });
}

// Show reviews under 2000 words
const reviewsUnder2000 = reviewPages.filter(p => p.words < 2000 && p.name !== 'reviews');
console.log(`\n=== REVIEWS UNDER 2000 WORDS (${reviewsUnder2000.length} reviews) ===\n`);
reviewsUnder2000.sort((a, b) => a.words - b.words).forEach(page => {
  console.log(`- ${page.name}: ${page.words.toLocaleString()} words`);
});
