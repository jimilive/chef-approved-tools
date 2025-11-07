#!/usr/bin/env node

import { readFileSync } from 'fs';

const csvPath = '/tmp/metadata-audit-complete.csv';
const csvContent = readFileSync(csvPath, 'utf8');
const lines = csvContent.split('\n').slice(1); // Skip header

const issues = {
  missingBoth: [],
  brokenTitles: [], // <30 chars or cut off with backslash
  brokenDescriptions: [], // <120 chars
  longTitles: [], // >60 chars
  longDescriptions: [], // >160 chars
};

lines.forEach(line => {
  if (!line.trim()) return;

  // Parse CSV (handling quoted fields)
  const match = line.match(/^"([^"]*)","([^"]*)","?(\d+)"?,"([^"]*)","?(\d+)"?,(.*)$/);
  if (!match) return;

  const [, slug, title, titleLen, description, descLen, source] = match;
  const titleLength = parseInt(titleLen);
  const descLength = parseInt(descLen);

  // Missing both
  if (titleLength === 0 && descLength === 0) {
    issues.missingBoth.push({ slug, titleLength, descLength });
  }

  // Broken titles (very short or cut off with backslash)
  if (titleLength > 0 && titleLength < 30) {
    issues.brokenTitles.push({ slug, title, titleLength });
  } else if (title.includes('\\') && titleLength < 50) {
    issues.brokenTitles.push({ slug, title, titleLength, note: 'Contains backslash - likely cut off' });
  }

  // Broken descriptions (very short)
  if (descLength > 0 && descLength < 120) {
    issues.brokenDescriptions.push({ slug, description, descLength });
  }

  // Long titles
  if (titleLength > 60) {
    issues.longTitles.push({ slug, title, titleLength });
  }

  // Long descriptions
  if (descLength > 160) {
    issues.longDescriptions.push({ slug, description, descLength });
  }
});

console.log('## COMPREHENSIVE METADATA AUDIT RESULTS\n');
console.log(`Total pages analyzed: ${lines.length - 1}\n`);

console.log(`### CRITICAL ISSUES\n`);
console.log(`1. Missing both title and description: ${issues.missingBoth.length} pages`);
issues.missingBoth.forEach(p => console.log(`   - ${p.slug}`));

console.log(`\n2. Broken/incomplete titles (<30 chars): ${issues.brokenTitles.length} pages`);
issues.brokenTitles.forEach(p => console.log(`   - ${p.slug}: "${p.title}" (${p.titleLength} chars) ${p.note || ''}`));

console.log(`\n3. Broken/incomplete descriptions (<120 chars): ${issues.brokenDescriptions.length} pages`);
issues.brokenDescriptions.forEach(p => console.log(`   - ${p.slug}: "${p.description.substring(0, 60)}..." (${p.descLength} chars)`));

console.log(`\n### OPTIMIZATION NEEDED\n`);
console.log(`4. Titles too long (>60 chars): ${issues.longTitles.length} pages`);
issues.longTitles.slice(0, 10).forEach(p => console.log(`   - ${p.slug}: "${p.title}" (${p.titleLength} chars)`));
if (issues.longTitles.length > 10) console.log(`   ... and ${issues.longTitles.length - 10} more`);

console.log(`\n5. Descriptions too long (>160 chars): ${issues.longDescriptions.length} pages`);
issues.longDescriptions.slice(0, 10).forEach(p => console.log(`   - ${p.slug}: "${p.description.substring(0, 60)}..." (${p.descLength} chars)`));
if (issues.longDescriptions.length > 10) console.log(`   ... and ${issues.longDescriptions.length - 10} more`);

console.log(`\n### SUMMARY\n`);
console.log(`Total critical issues: ${issues.missingBoth.length + issues.brokenTitles.length + issues.brokenDescriptions.length}`);
console.log(`Total optimization needed: ${issues.longTitles.length + issues.longDescriptions.length}`);
console.log(`Total pages needing fixes: ${new Set([
  ...issues.missingBoth.map(p => p.slug),
  ...issues.brokenTitles.map(p => p.slug),
  ...issues.brokenDescriptions.map(p => p.slug),
  ...issues.longTitles.map(p => p.slug),
  ...issues.longDescriptions.map(p => p.slug)
]).size}`);
