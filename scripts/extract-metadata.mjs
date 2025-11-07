#!/usr/bin/env node

import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, relative, dirname } from 'path';

const appDir = '/Users/scottbradley/chef-approved-tools/app';

function getAllPageFiles(dir, fileList = []) {
  const files = readdirSync(dir);

  files.forEach(file => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      getAllPageFiles(filePath, fileList);
    } else if (file === 'page.tsx') {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function extractMetadataFromFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');

    // Try to find exported metadata object
    const metadataMatch = content.match(/export\s+const\s+metadata:\s*Metadata\s*=\s*\{[\s\S]*?\n\}/);

    if (metadataMatch) {
      const metaBlock = metadataMatch[0];

      // Extract title
      const titleMatch = metaBlock.match(/title:\s*['"](.*?)['"]/);
      const title = titleMatch ? titleMatch[1] : null;

      // Extract description
      const descMatch = metaBlock.match(/description:\s*['"](.*?)['"]/);
      const description = descMatch ? descMatch[1] : null;

      return { title, description, source: 'page' };
    }

    return { title: null, description: null, source: 'none' };
  } catch (err) {
    return { title: null, description: null, source: 'error', error: err.message };
  }
}

function extractMetadataFromLayout(layoutPath) {
  try {
    if (!existsSync(layoutPath)) {
      return null;
    }

    const content = readFileSync(layoutPath, 'utf8');

    // Try to find exported metadata object
    const metadataMatch = content.match(/export\s+const\s+metadata:\s*Metadata\s*=\s*\{[\s\S]*?\n\}/);

    if (metadataMatch) {
      const metaBlock = metadataMatch[0];

      // Extract title
      const titleMatch = metaBlock.match(/title:\s*['"](.*?)['"]/);
      const title = titleMatch ? titleMatch[1] : null;

      // Extract description
      const descMatch = metaBlock.match(/description:\s*['"](.*?)['"]/);
      const description = descMatch ? descMatch[1] : null;

      return { title, description, source: 'layout' };
    }

    return null;
  } catch (err) {
    return null;
  }
}

function extractMetadataFromGenerateMetadata(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');

    // Check if there's a generateMetadata function
    if (content.includes('generateMetadata')) {
      // Try to extract the title from metadata object return
      const titleMatch = content.match(/title:\s*reviewData\.metadata\.title/);
      const descMatch = content.match(/description:\s*reviewData\.metadata\.description/);

      if (titleMatch || descMatch) {
        // Try to find the data file
        const dataFileMatch = content.match(/from\s+['"]\.\/(.*?-data)['"]/);
        if (dataFileMatch) {
          const dataFileName = dataFileMatch[1] + '.ts';
          const dataFilePath = join(dirname(filePath), dataFileName);

          if (existsSync(dataFilePath)) {
            const dataContent = readFileSync(dataFilePath, 'utf8');

            // Extract title from metadata object
            const metaTitleMatch = dataContent.match(/metadata:\s*\{[\s\S]*?title:\s*['"](.*?)['"]/);
            const metaDescMatch = dataContent.match(/metadata:\s*\{[\s\S]*?description:\s*['"](.*?)['"]/);

            return {
              title: metaTitleMatch ? metaTitleMatch[1] : null,
              description: metaDescMatch ? metaDescMatch[1] : null,
              source: 'generateMetadata'
            };
          }
        }
      }
    }

    return null;
  } catch (err) {
    return null;
  }
}

// Get all page files
const pageFiles = getAllPageFiles(appDir);

console.log('slug,title,titleLength,description,descriptionLength,source');

pageFiles.forEach(pagePath => {
  const slug = relative(appDir, dirname(pagePath)) || '/';

  // Try to get metadata from the page itself
  let metadata = extractMetadataFromFile(pagePath);

  // If not found, try generateMetadata pattern
  if (!metadata.title && !metadata.description) {
    const genMeta = extractMetadataFromGenerateMetadata(pagePath);
    if (genMeta) {
      metadata = genMeta;
    }
  }

  // If still not found, check for layout.tsx in same directory
  if (!metadata.title && !metadata.description) {
    const layoutPath = join(dirname(pagePath), 'layout.tsx');
    const layoutMeta = extractMetadataFromLayout(layoutPath);
    if (layoutMeta) {
      metadata = layoutMeta;
    }
  }

  const title = metadata.title || '';
  const description = metadata.description || '';
  const titleLen = title.length;
  const descLen = description.length;

  // Escape quotes in CSV
  const escapedTitle = title.replace(/"/g, '""');
  const escapedDesc = description.replace(/"/g, '""');

  console.log(`"${slug}","${escapedTitle}",${titleLen},"${escapedDesc}",${descLen},${metadata.source}`);
});
