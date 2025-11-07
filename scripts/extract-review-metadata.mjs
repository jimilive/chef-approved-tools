#!/usr/bin/env node

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const reviewsDir = './app/reviews';
const results = [];

// Get all review directories
const reviewDirs = readdirSync(reviewsDir);

for (const dir of reviewDirs) {
  const dirPath = join(reviewsDir, dir);

  // Skip non-directories
  try {
    const stat = readdirSync(dirPath);
  } catch {
    continue; // Skip files, only process directories
  }

  // Find the data file
  try {
    const files = readdirSync(dirPath);
    const dataFile = files.find(f => f.endsWith('-data.ts') && !f.includes('comparison'));

    if (!dataFile) {
      results.push({
        slug: dir,
        title: 'NO DATA FILE',
        description: 'NO DATA FILE',
      });
      continue;
    }

    const content = readFileSync(join(dirPath, dataFile), 'utf-8');

    // Extract the entire metadata block first
    const metadataBlockMatch = content.match(/metadata:\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/s);
    if (!metadataBlockMatch) {
      results.push({
        slug: dir,
        title: 'NO METADATA BLOCK',
        description: 'NO METADATA BLOCK',
      });
      continue;
    }

    const metadataBlock = metadataBlockMatch[1];

    // Extract title - handle both escaped and non-escaped quotes
    const titleMatch = metadataBlock.match(/title:\s*"((?:[^"\\]|\\.)*)"/s) ||
                       metadataBlock.match(/title:\s*'((?:[^'\\]|\\.)*)'/s);
    const title = titleMatch ? titleMatch[1].replace(/\\"/g, '"').replace(/\\'/g, "'") : 'NO TITLE FOUND';

    // Extract description - handle both escaped and non-escaped quotes
    const descMatch = metadataBlock.match(/description:\s*"((?:[^"\\]|\\.)*)"/s) ||
                     metadataBlock.match(/description:\s*'((?:[^'\\]|\\.)*)'/s);
    const description = descMatch ? descMatch[1].replace(/\\"/g, '"').replace(/\\'/g, "'") : 'NO DESCRIPTION FOUND';

    results.push({
      slug: dir,
      title,
      titleLength: title.length,
      description,
      descriptionLength: description.length
    });
  } catch (error) {
    results.push({
      slug: dir,
      title: 'ERROR',
      description: error.message,
    });
  }
}

// Output as CSV
console.log('Review,URL,Title,Title Length,Description,Description Length');
for (const result of results) {
  const title = `"${result.title.replace(/"/g, '""')}"`;
  const description = `"${result.description.replace(/"/g, '""')}"`;
  console.log(`${result.slug},/reviews/${result.slug},${title},${result.titleLength || 0},${description},${result.descriptionLength || 0}`);
}
