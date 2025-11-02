#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to extract text content from JSX/TSX files
function extractTextFromJSX(content) {
  // Remove imports
  content = content.replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '');

  // Remove export statements
  content = content.replace(/^export\s+(default\s+)?/gm, '');

  // Remove function declarations and component definitions
  content = content.replace(/^(async\s+)?function\s+\w+\([^)]*\)\s*\{/gm, '');
  content = content.replace(/^const\s+\w+\s*[:=]\s*(\([^)]*\))?\s*=>\s*[({]/gm, '');

  // Remove JSX tags but keep the content between them
  content = content.replace(/<[^>]+>/g, ' ');

  // Remove code blocks and inline code
  content = content.replace(/```[\s\S]*?```/g, '');
  content = content.replace(/`[^`]+`/g, '');

  // Remove URLs
  content = content.replace(/https?:\/\/[^\s]+/g, '');

  // Remove special characters commonly used in code
  content = content.replace(/[{}[\]();]/g, ' ');

  // Remove metadata object-like structures
  content = content.replace(/\w+:\s*['"][^'"]*['"]/g, '');

  // Clean up multiple spaces
  content = content.replace(/\s+/g, ' ');

  return content.trim();
}

// Function to count words
function countWords(text) {
  const words = text.split(/\s+/).filter(word => {
    // Filter out single characters, numbers, and code-like strings
    return word.length > 2 && !/^\d+$/.test(word) && !/^[A-Z_]+$/.test(word);
  });
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
      const text = extractTextFromJSX(content);
      let wordCount = countWords(text);

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
        const dataText = extractTextFromJSX(dataContent);
        const dataWordCount = countWords(dataText);
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

console.log('Counting words in all content pages...\n');

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
  pagesWithDataFiles.forEach(page => {
    console.log(`- ${page.name}: ${page.words.toLocaleString()} words (includes data file)`);
  });
}
