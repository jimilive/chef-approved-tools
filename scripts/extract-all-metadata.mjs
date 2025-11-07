#!/usr/bin/env node

/**
 * Extract all page titles and meta descriptions from Chef Approved Tools site
 * Outputs structured CSV data for analysis
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const results = [];

/**
 * Extract metadata from a page.tsx file
 */
function extractMetadata(filePath, urlPath) {
  try {
    const content = readFileSync(filePath, 'utf-8');

    // Try to extract from metadata export (static metadata)
    const metadataMatch = content.match(/export const metadata[:\s]*Metadata\s*=\s*\{([\s\S]*?)\n\}/);

    // Try to extract from generateMetadata function
    const generateMetadataMatch = content.match(/export async function generateMetadata[\s\S]*?return\s*\{([\s\S]*?)\n\s*\}/);

    let metadataBlock = metadataMatch ? metadataMatch[1] : (generateMetadataMatch ? generateMetadataMatch[1] : null);

    if (!metadataBlock) {
      // Try alternate pattern for generateMetadata
      const altMatch = content.match(/generateMetadata[\s\S]*?title:\s*reviewData\.metadata\.title/);
      if (altMatch) {
        // This is a review page using reviewData
        const titleMatch = content.match(/reviewData\.metadata\.title/);
        const descMatch = content.match(/reviewData\.metadata\.description/);
        if (titleMatch || descMatch) {
          return extractFromReviewData(filePath, urlPath);
        }
      }
      return null;
    }

    // Extract title
    let title = '';
    const titleMatch = metadataBlock.match(/title:\s*['"](.*?)['"]/) ||
                      metadataBlock.match(/title:\s*`(.*?)`/);
    if (titleMatch) {
      title = titleMatch[1].replace(/\\'/g, "'").replace(/\\"/g, '"');
    }

    // Extract description
    let description = '';
    const descMatch = metadataBlock.match(/description:\s*['"](.*?)['"]/) ||
                     metadataBlock.match(/description:\s*`(.*?)`/);
    if (descMatch) {
      description = descMatch[1].replace(/\\'/g, "'").replace(/\\"/g, '"');
    }

    return {
      title: title || 'NO TITLE FOUND',
      description: description || 'NO DESCRIPTION FOUND',
      titleLength: title.length,
      descriptionLength: description.length
    };
  } catch (error) {
    return null;
  }
}

/**
 * Extract metadata from review data files
 */
function extractFromReviewData(pagePath, urlPath) {
  try {
    const dirPath = dirname(pagePath);
    const files = readdirSync(dirPath);
    const dataFile = files.find(f => f.endsWith('-data.ts') && !f.includes('comparison'));

    if (!dataFile) return null;

    const content = readFileSync(join(dirPath, dataFile), 'utf-8');

    // Extract from metadata object - look for reviewData.metadata
    const metadataMatch = content.match(/metadata:\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/);
    if (!metadataMatch) return null;

    const metadataBlock = metadataMatch[1];

    let title = '';
    // Match title with single or double quotes, handling escaped quotes and backslashes
    const titleMatch = metadataBlock.match(/title:\s*"([^"]*(?:\\.[^"]*)*)"|title:\s*'([^']*(?:\\.[^']*)*)'|title:\s*`([^`]*)`/);
    if (titleMatch) {
      title = (titleMatch[1] || titleMatch[2] || titleMatch[3] || '').replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\\\/g, '\\');
    }

    let description = '';
    // Match description with single or double quotes, handling escaped quotes and backslashes
    const descMatch = metadataBlock.match(/description:\s*"([^"]*(?:\\.[^"]*)*)"|description:\s*'([^']*(?:\\.[^']*)*)'|description:\s*`([^`]*)`/);
    if (descMatch) {
      description = (descMatch[1] || descMatch[2] || descMatch[3] || '').replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\\\/g, '\\');
    }

    return {
      title: title || 'NO TITLE FOUND',
      description: description || 'NO DESCRIPTION FOUND',
      titleLength: title.length,
      descriptionLength: description.length
    };
  } catch (error) {
    console.error(`Error extracting from review data in ${dirPath}:`, error.message);
    return null;
  }
}

/**
 * Process all page.tsx files in a directory
 */
function processDirectory(dirPath, baseUrl, pageType) {
  try {
    const items = readdirSync(dirPath);

    for (const item of items) {
      const itemPath = join(dirPath, item);
      const stat = statSync(itemPath);

      if (stat.isDirectory()) {
        // Check if this directory has a page.tsx
        const pagePath = join(itemPath, 'page.tsx');
        try {
          statSync(pagePath);
          const urlPath = `${baseUrl}/${item}`;
          const metadata = extractMetadata(pagePath, urlPath);

          if (metadata) {
            results.push({
              pageType,
              urlPath,
              ...metadata
            });
          }
        } catch {
          // No page.tsx in this directory
        }
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error.message);
  }
}

// Process homepage
console.log('Processing homepage...');
const homePagePath = join(rootDir, 'app', 'page.tsx');
const homeMetadata = extractMetadata(homePagePath, '/');
if (homeMetadata) {
  results.push({
    pageType: 'Homepage',
    urlPath: '/',
    ...homeMetadata
  });
}

// Process about page
console.log('Processing about page...');
const aboutPagePath = join(rootDir, 'app', 'about', 'page.tsx');
const aboutMetadata = extractMetadata(aboutPagePath, '/about');
if (aboutMetadata) {
  results.push({
    pageType: 'About',
    urlPath: '/about',
    ...aboutMetadata
  });
}

// Process contact page (client component, may not have metadata export)
console.log('Processing contact page...');
const contactPagePath = join(rootDir, 'app', 'contact', 'page.tsx');
try {
  const contactContent = readFileSync(contactPagePath, 'utf-8');
  // Contact page is a client component, metadata might be in layout
  results.push({
    pageType: 'Contact',
    urlPath: '/contact',
    title: 'Contact Page (Client Component)',
    description: 'Contact form page - check layout or parent metadata',
    titleLength: 0,
    descriptionLength: 0
  });
} catch {}

// Process all review pages
console.log('Processing review pages...');
const reviewsDir = join(rootDir, 'app', 'reviews');
processDirectory(reviewsDir, '/reviews', 'Review');

// Process all blog posts
console.log('Processing blog posts...');
const blogDir = join(rootDir, 'app', 'blog');
processDirectory(blogDir, '/blog', 'Blog Post');

// Process all guide pages
console.log('Processing guide pages...');
const guidesDir = join(rootDir, 'app', 'guides');
processDirectory(guidesDir, '/guides', 'Guide');

// Process other important pages
console.log('Processing other pages...');
const otherPages = [
  { path: 'blog/page.tsx', url: '/blog', type: 'Blog Index' },
  { path: 'reviews/page.tsx', url: '/reviews', type: 'Reviews Index' },
  { path: 'guides/page.tsx', url: '/guides', type: 'Guides Index' },
  { path: 'privacy-policy/page.tsx', url: '/privacy-policy', type: 'Legal' },
  { path: 'terms/page.tsx', url: '/terms', type: 'Legal' },
  { path: 'disclosure/page.tsx', url: '/disclosure', type: 'Legal' },
];

for (const page of otherPages) {
  try {
    const pagePath = join(rootDir, 'app', page.path);
    const metadata = extractMetadata(pagePath, page.url);
    if (metadata) {
      results.push({
        pageType: page.type,
        urlPath: page.url,
        ...metadata
      });
    }
  } catch (error) {
    // Page doesn't exist or couldn't be read
  }
}

// Sort results by page type, then by URL
results.sort((a, b) => {
  if (a.pageType !== b.pageType) {
    return a.pageType.localeCompare(b.pageType);
  }
  return a.urlPath.localeCompare(b.urlPath);
});

// Output as CSV
console.log('\n\n=== METADATA EXTRACTION COMPLETE ===\n');
console.log('Page Type,URL Path,Title,Title Length,Description,Description Length');
console.log('---');

for (const result of results) {
  // Escape commas and quotes in CSV
  const title = `"${result.title.replace(/"/g, '""')}"`;
  const description = `"${result.description.replace(/"/g, '""')}"`;

  console.log(`${result.pageType},${result.urlPath},${title},${result.titleLength},${description},${result.descriptionLength}`);
}

console.log('\n---');
console.log(`Total pages processed: ${results.length}`);
console.log('\nSummary by page type:');

const summary = {};
for (const result of results) {
  summary[result.pageType] = (summary[result.pageType] || 0) + 1;
}

for (const [type, count] of Object.entries(summary).sort()) {
  console.log(`  ${type}: ${count} pages`);
}

// Flag pages with issues
console.log('\n\n=== POTENTIAL ISSUES ===\n');

const issues = results.filter(r =>
  r.titleLength === 0 ||
  r.titleLength > 60 ||
  r.descriptionLength === 0 ||
  r.descriptionLength < 120 ||
  r.descriptionLength > 160
);

if (issues.length > 0) {
  console.log('Pages with title/description length issues:');
  for (const issue of issues) {
    const problems = [];
    if (issue.titleLength === 0) problems.push('NO TITLE');
    if (issue.titleLength > 60) problems.push(`TITLE TOO LONG (${issue.titleLength} chars)`);
    if (issue.descriptionLength === 0) problems.push('NO DESCRIPTION');
    if (issue.descriptionLength < 120) problems.push(`DESC TOO SHORT (${issue.descriptionLength} chars)`);
    if (issue.descriptionLength > 160) problems.push(`DESC TOO LONG (${issue.descriptionLength} chars)`);

    console.log(`\n${issue.urlPath}`);
    console.log(`  Issues: ${problems.join(', ')}`);
  }
} else {
  console.log('No issues found!');
}
