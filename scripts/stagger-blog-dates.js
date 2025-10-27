#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get all blog directories
const blogDir = path.join(__dirname, '../app/blog');
const blogPosts = fs.readdirSync(blogDir)
  .filter(file => fs.statSync(path.join(blogDir, file)).isDirectory())
  .sort();

console.log(`Found ${blogPosts.length} blog posts to update`);

// Generate dates from Sep 3 to Oct 27, 2025
const startDate = new Date('2025-09-03');
const endDate = new Date('2025-10-27');
const daysDiff = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));

console.log(`Distributing over ${daysDiff} days (Sep 3 - Oct 27)`);

// Generate evenly distributed dates
const dates = [];
for (let i = 0; i < blogPosts.length; i++) {
  const dayOffset = Math.floor((i / blogPosts.length) * daysDiff);
  const date = new Date(startDate);
  date.setDate(date.getDate() + dayOffset);
  dates.push(date.toISOString().split('T')[0]);
}

// Shuffle dates a bit to make it look more natural (not perfectly even)
for (let i = dates.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [dates[i], dates[j]] = [dates[j], dates[i]];
}

// Update each blog post
let updatedCount = 0;
blogPosts.forEach((post, index) => {
  const pagePath = path.join(blogDir, post, 'page.tsx');

  if (!fs.existsSync(pagePath)) {
    console.log(`⚠️  Skipping ${post} - no page.tsx found`);
    return;
  }

  let content = fs.readFileSync(pagePath, 'utf8');
  const newDate = dates[index];

  // Replace various date formats
  let updated = false;

  // Pattern 1: datePublished: "2025-10-24",
  if (content.match(/datePublished:\s*["']20\d{2}-\d{2}-\d{2}["']/)) {
    content = content.replace(
      /datePublished:\s*["']20\d{2}-\d{2}-\d{2}["']/g,
      `datePublished: "${newDate}"`
    );
    updated = true;
  }

  // Pattern 2: datePublished: "2025-10-24T00:00:00Z",
  if (content.match(/datePublished:\s*["']20\d{2}-\d{2}-\d{2}T00:00:00Z["']/)) {
    content = content.replace(
      /datePublished:\s*["']20\d{2}-\d{2}-\d{2}T00:00:00Z["']/g,
      `datePublished: "${newDate}T00:00:00Z"`
    );
    updated = true;
  }

  // Pattern 3: publishDate: "2025-10-24",
  if (content.match(/publishDate:\s*["']20\d{2}-\d{2}-\d{2}["']/)) {
    content = content.replace(
      /publishDate:\s*["']20\d{2}-\d{2}-\d{2}["']/g,
      `publishDate: "${newDate}"`
    );
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(pagePath, content);
    console.log(`✅ ${post} → ${newDate}`);
    updatedCount++;
  } else {
    console.log(`⚠️  ${post} - no date pattern found`);
  }
});

console.log(`\n✅ Updated ${updatedCount} of ${blogPosts.length} blog posts`);
console.log(`\nDate distribution:`);

// Show date distribution
const dateCount = {};
dates.forEach(date => {
  dateCount[date] = (dateCount[date] || 0) + 1;
});

Object.entries(dateCount)
  .sort(([a], [b]) => a.localeCompare(b))
  .slice(0, 10)
  .forEach(([date, count]) => {
    console.log(`  ${date}: ${count} post${count > 1 ? 's' : ''}`);
  });

if (Object.keys(dateCount).length > 10) {
  console.log(`  ... and ${Object.keys(dateCount).length - 10} more dates`);
}
