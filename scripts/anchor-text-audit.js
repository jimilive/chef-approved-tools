#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const APP_DIR = path.join(process.cwd(), 'app');

// Get all page files
function getAllPageFiles() {
  const files = [];

  function walkDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (entry.name === 'page.tsx') {
        files.push(fullPath);
      }
    }
  }

  walkDir(APP_DIR);
  return files;
}

// Extract links with anchor text
function extractLinksWithAnchors(content, sourcePath) {
  const links = [];

  // Pattern 1: <Link href="...">text</Link>
  const pattern1 = /<Link\s+[^>]*href=["']([^"']+)["'][^>]*>([^<]*)<\/Link>/g;
  let match;
  while ((match = pattern1.exec(content)) !== null) {
    const href = match[1];
    const anchor = match[2].trim();
    if (href.startsWith('/') && anchor) {
      links.push({ href, anchor, source: sourcePath });
    }
  }

  // Pattern 2: <Link href="...">...<span>text</span>...</Link> (multi-line)
  const pattern2 = /<Link\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/Link>/g;
  while ((match = pattern2.exec(content)) !== null) {
    const href = match[1];
    const innerContent = match[2];
    // Extract text, stripping JSX/HTML tags
    const textMatch = innerContent.replace(/<[^>]+>/g, ' ').replace(/\{[^}]+\}/g, ' ').trim();
    const anchor = textMatch.split(/\s+/).slice(0, 10).join(' ').substring(0, 80);
    if (href.startsWith('/') && anchor && !links.find(l => l.href === href && l.anchor === anchor)) {
      links.push({ href, anchor, source: sourcePath });
    }
  }

  return links;
}

// Main analysis
function main() {
  console.log('='.repeat(80));
  console.log('PHASE 3: ANCHOR TEXT ANALYSIS');
  console.log('='.repeat(80));

  const pageFiles = getAllPageFiles();
  console.log(`\nAnalyzing ${pageFiles.length} page files...\n`);

  // Collect all links
  const allLinks = [];
  for (const file of pageFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const relativePath = file.replace(process.cwd(), '');
    const links = extractLinksWithAnchors(content, relativePath);
    allLinks.push(...links);
  }

  console.log(`Found ${allLinks.length} internal links with anchor text\n`);

  // Group by target URL
  const linksByTarget = {};
  for (const link of allLinks) {
    if (!linksByTarget[link.href]) {
      linksByTarget[link.href] = [];
    }
    linksByTarget[link.href].push(link);
  }

  // Sort by link count
  const sortedTargets = Object.entries(linksByTarget)
    .sort((a, b) => b[1].length - a[1].length);

  // ============================================================
  // 3.1 ANCHOR TEXT VARIETY CHECK - TOP 10 MOST LINKED PAGES
  // ============================================================
  console.log('='.repeat(80));
  console.log('3.1 ANCHOR TEXT VARIETY CHECK - TOP 10 MOST-LINKED PAGES');
  console.log('='.repeat(80) + '\n');

  const top10 = sortedTargets.slice(0, 10);

  for (const [target, links] of top10) {
    console.log(`\n${target}`);
    console.log(`Total Links: ${links.length}`);

    // Count anchor variations
    const anchorCounts = {};
    for (const link of links) {
      const normalizedAnchor = link.anchor.toLowerCase().trim();
      if (!anchorCounts[normalizedAnchor]) {
        anchorCounts[normalizedAnchor] = { count: 0, sources: [], original: link.anchor };
      }
      anchorCounts[normalizedAnchor].count++;
      anchorCounts[normalizedAnchor].sources.push(link.source);
    }

    const uniqueAnchors = Object.keys(anchorCounts).length;
    console.log(`Unique Anchor Variations: ${uniqueAnchors}`);

    // Check for over-optimization (same anchor 3+ times)
    const overUsedAnchors = Object.entries(anchorCounts)
      .filter(([_, data]) => data.count >= 3)
      .sort((a, b) => b[1].count - a[1].count);

    if (overUsedAnchors.length > 0) {
      console.log(`\n⚠️  OVER-USED ANCHORS (3+ times):`);
      for (const [anchor, data] of overUsedAnchors) {
        console.log(`   "${data.original}" × ${data.count}`);
      }
    }

    // Check for exact match anchor
    const targetSlug = target.split('/').pop();
    const targetWords = targetSlug.replace(/-/g, ' ').toLowerCase();
    const hasExactMatch = Object.keys(anchorCounts).some(a =>
      a.toLowerCase().includes(targetWords) ||
      targetWords.includes(a.toLowerCase())
    );

    if (!hasExactMatch && targetSlug.length > 3) {
      console.log(`\n⚠️  NO EXACT-MATCH ANCHOR for "${targetSlug}"`);
    }

    // List all anchors
    console.log(`\nAll Anchors Used:`);
    const sortedAnchors = Object.entries(anchorCounts).sort((a, b) => b[1].count - a[1].count);
    for (const [_, data] of sortedAnchors.slice(0, 8)) {
      console.log(`   "${data.original}" × ${data.count}`);
    }
    if (sortedAnchors.length > 8) {
      console.log(`   ... and ${sortedAnchors.length - 8} more variations`);
    }
  }

  // ============================================================
  // 3.2 ANCHOR TEXT QUALITY CHECK
  // ============================================================
  console.log('\n\n' + '='.repeat(80));
  console.log('3.2 ANCHOR TEXT QUALITY CHECK');
  console.log('='.repeat(80));

  // Generic anchors
  const genericPatterns = [
    'click here', 'read more', 'learn more', 'here', 'this', 'link',
    'more info', 'see more', 'view more', 'check it out', 'find out',
    'read this', 'see this', 'view'
  ];

  const genericAnchors = allLinks.filter(link => {
    const lower = link.anchor.toLowerCase().trim();
    return genericPatterns.some(p => lower === p || lower === p + '.');
  });

  console.log(`\n--- GENERIC ANCHORS (${genericAnchors.length} found) ---`);
  if (genericAnchors.length === 0) {
    console.log('✓ No generic anchors found!');
  } else {
    const byAnchor = {};
    for (const link of genericAnchors) {
      const key = link.anchor.toLowerCase();
      if (!byAnchor[key]) byAnchor[key] = [];
      byAnchor[key].push(link);
    }
    for (const [anchor, links] of Object.entries(byAnchor)) {
      console.log(`\n❌ "${anchor}" (${links.length} occurrences)`);
      for (const link of links.slice(0, 3)) {
        console.log(`   ${link.source} → ${link.href}`);
      }
      if (links.length > 3) console.log(`   ... and ${links.length - 3} more`);
    }
  }

  // Naked URL anchors
  const nakedUrlAnchors = allLinks.filter(link => {
    const lower = link.anchor.toLowerCase();
    return lower.startsWith('http') || lower.startsWith('www.') || lower.startsWith('/');
  });

  console.log(`\n--- NAKED URL ANCHORS (${nakedUrlAnchors.length} found) ---`);
  if (nakedUrlAnchors.length === 0) {
    console.log('✓ No naked URL anchors found!');
  } else {
    for (const link of nakedUrlAnchors.slice(0, 10)) {
      console.log(`❌ "${link.anchor}" → ${link.href}`);
      console.log(`   Source: ${link.source}`);
    }
  }

  // Same anchor → different pages
  console.log(`\n--- SAME ANCHOR → DIFFERENT PAGES ---`);
  const anchorToTargets = {};
  for (const link of allLinks) {
    const normalizedAnchor = link.anchor.toLowerCase().trim();
    if (normalizedAnchor.length < 3) continue; // Skip very short anchors
    if (!anchorToTargets[normalizedAnchor]) {
      anchorToTargets[normalizedAnchor] = new Set();
    }
    anchorToTargets[normalizedAnchor].add(link.href);
  }

  const confusingAnchors = Object.entries(anchorToTargets)
    .filter(([_, targets]) => targets.size > 1)
    .sort((a, b) => b[1].size - a[1].size);

  if (confusingAnchors.length === 0) {
    console.log('✓ No confusing anchor conflicts found!');
  } else {
    console.log(`Found ${confusingAnchors.length} anchors pointing to multiple pages:\n`);
    for (const [anchor, targets] of confusingAnchors.slice(0, 15)) {
      if (targets.size <= 3) {
        console.log(`⚠️  "${anchor}" → ${Array.from(targets).join(', ')}`);
      } else {
        console.log(`⚠️  "${anchor}" → ${targets.size} different pages`);
        for (const t of Array.from(targets).slice(0, 3)) {
          console.log(`      - ${t}`);
        }
        console.log(`      ... and ${targets.size - 3} more`);
      }
    }
    if (confusingAnchors.length > 15) {
      console.log(`\n... and ${confusingAnchors.length - 15} more conflicting anchors`);
    }
  }

  // ============================================================
  // SUMMARY
  // ============================================================
  console.log('\n\n' + '='.repeat(80));
  console.log('SUMMARY');
  console.log('='.repeat(80));

  console.log(`\nTotal internal links analyzed: ${allLinks.length}`);
  console.log(`Unique target pages: ${sortedTargets.length}`);
  console.log(`\nIssues Found:`);
  console.log(`  Generic anchors: ${genericAnchors.length}`);
  console.log(`  Naked URL anchors: ${nakedUrlAnchors.length}`);
  console.log(`  Anchors → multiple pages: ${confusingAnchors.length}`);

  // Check over-used anchors in top 10
  let overUsedCount = 0;
  for (const [target, links] of top10) {
    const anchorCounts = {};
    for (const link of links) {
      const normalizedAnchor = link.anchor.toLowerCase().trim();
      anchorCounts[normalizedAnchor] = (anchorCounts[normalizedAnchor] || 0) + 1;
    }
    overUsedCount += Object.values(anchorCounts).filter(c => c >= 3).length;
  }
  console.log(`  Over-used anchors (top 10 pages): ${overUsedCount}`);

  console.log('\n' + '='.repeat(80));
  console.log('END OF PHASE 3 AUDIT');
  console.log('='.repeat(80));
}

main();
