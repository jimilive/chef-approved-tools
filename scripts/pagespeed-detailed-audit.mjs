#!/usr/bin/env node
/**
 * PageSpeed Insights Detailed Audit Script
 *
 * Audits all pages and captures DETAILED error information,
 * not just scores. Outputs a comprehensive report of all
 * failing audits with specific elements and selectors.
 *
 * Usage: node scripts/pagespeed-detailed-audit.mjs
 */

import fs from 'fs/promises';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const API_KEY = process.env.PAGESPEED_API_KEY;
if (!API_KEY) {
  console.error('Error: PAGESPEED_API_KEY environment variable is required');
  process.exit(1);
}
const SITEMAP_URL = 'https://www.chefapprovedtools.com/sitemap.xml';
const OUTPUT_DIR = 'reports';
const PROGRESS_FILE = `${OUTPUT_DIR}/detailed-audit-progress.json`;
const REPORT_FILE = `${OUTPUT_DIR}/detailed-audit-report.json`;
const SUMMARY_FILE = `${OUTPUT_DIR}/detailed-audit-summary.md`;

// Rate limiting
const DELAY_MS = 2500;

// Categories to audit
const CATEGORIES = ['PERFORMANCE', 'ACCESSIBILITY', 'SEO', 'BEST_PRACTICES'];

async function fetchSitemap() {
  console.log('Fetching sitemap...');
  const response = await fetch(SITEMAP_URL);
  const xml = await response.text();

  const urls = [];
  const regex = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    urls.push(match[1]);
  }

  console.log(`Found ${urls.length} URLs\n`);
  return urls;
}

async function loadProgress() {
  try {
    const data = await fs.readFile(PROGRESS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { completed: {}, issues: [] };
  }
}

async function saveProgress(progress) {
  await fs.writeFile(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

async function runDetailedAudit(url, strategy) {
  const apiUrl = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
  apiUrl.searchParams.set('url', url);
  apiUrl.searchParams.set('key', API_KEY);
  apiUrl.searchParams.set('strategy', strategy);

  for (const cat of CATEGORIES) {
    apiUrl.searchParams.append('category', cat);
  }

  try {
    const response = await fetch(apiUrl.toString());

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error ${response.status}: ${errorText.slice(0, 200)}`);
    }

    const data = await response.json();
    const audits = data.lighthouseResult?.audits || {};
    const categories = data.lighthouseResult?.categories || {};

    // Collect scores
    const scores = {
      performance: Math.round((categories.performance?.score || 0) * 100),
      accessibility: Math.round((categories.accessibility?.score || 0) * 100),
      seo: Math.round((categories.seo?.score || 0) * 100),
      bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
    };

    // Collect failing audits with details
    const failingAudits = [];

    for (const [auditId, audit] of Object.entries(audits)) {
      // Skip if score is perfect or not applicable
      if (audit.score === null || audit.score === 1 || audit.scoreDisplayMode === 'notApplicable') {
        continue;
      }

      // Skip informational/manual audits
      if (audit.scoreDisplayMode === 'manual' || audit.scoreDisplayMode === 'informative') {
        continue;
      }

      const failingAudit = {
        auditId,
        score: audit.score,
        title: audit.title,
        description: audit.description?.replace(/\[.*?\]\(.*?\)/g, '').slice(0, 200), // Remove markdown links
        displayValue: audit.displayValue,
        category: getAuditCategory(auditId, categories),
        elements: []
      };

      // Extract failing elements
      if (audit.details?.items) {
        for (const item of audit.details.items.slice(0, 5)) { // Limit to 5 examples per audit
          const element = {};

          if (item.node?.snippet) {
            element.snippet = item.node.snippet.slice(0, 200);
          }
          if (item.node?.selector) {
            element.selector = item.node.selector;
          }
          if (item.node?.explanation) {
            element.explanation = item.node.explanation;
          }
          // For contrast issues
          if (item.subItems?.items) {
            element.details = item.subItems.items.map(sub => ({
              contrastRatio: sub.relatedNode?.snippet ? undefined : sub.value,
              snippet: sub.relatedNode?.snippet?.slice(0, 100)
            })).filter(d => d.contrastRatio || d.snippet);
          }

          if (Object.keys(element).length > 0) {
            failingAudit.elements.push(element);
          }
        }
      }

      failingAudits.push(failingAudit);
    }

    return { scores, failingAudits, error: null };

  } catch (error) {
    return {
      scores: null,
      failingAudits: [],
      error: error.message.slice(0, 100)
    };
  }
}

function getAuditCategory(auditId, categories) {
  for (const [catName, catData] of Object.entries(categories)) {
    if (catData.auditRefs?.some(ref => ref.id === auditId)) {
      return catName;
    }
  }
  return 'unknown';
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function aggregateIssues(progress) {
  // Aggregate all issues by audit ID
  const issueMap = new Map();

  for (const [url, data] of Object.entries(progress.completed)) {
    for (const strategy of ['mobile', 'desktop']) {
      const result = data[strategy];
      if (!result?.failingAudits) continue;

      for (const audit of result.failingAudits) {
        const key = `${audit.auditId}:${strategy}`;

        if (!issueMap.has(key)) {
          issueMap.set(key, {
            auditId: audit.auditId,
            strategy,
            title: audit.title,
            description: audit.description,
            category: audit.category,
            affectedPages: [],
            uniqueElements: new Set(),
            totalOccurrences: 0
          });
        }

        const issue = issueMap.get(key);
        const shortUrl = url.replace('https://www.chefapprovedtools.com', '') || '/';
        issue.affectedPages.push(shortUrl);
        issue.totalOccurrences++;

        for (const element of audit.elements) {
          if (element.snippet) {
            issue.uniqueElements.add(element.snippet.slice(0, 100));
          }
        }
      }
    }
  }

  // Convert to array and sort by occurrence count
  return Array.from(issueMap.values())
    .map(issue => ({
      ...issue,
      uniqueElements: Array.from(issue.uniqueElements),
      affectedPageCount: issue.affectedPages.length
    }))
    .sort((a, b) => b.affectedPageCount - a.affectedPageCount);
}

function generateMarkdownSummary(aggregatedIssues, progress) {
  const totalPages = Object.keys(progress.completed).length;

  let md = `# PageSpeed Detailed Audit Report\n\n`;
  md += `**Generated:** ${new Date().toISOString()}\n`;
  md += `**Pages Audited:** ${totalPages}\n\n`;

  md += `## Summary by Category\n\n`;

  // Group by category
  const byCategory = {};
  for (const issue of aggregatedIssues) {
    const cat = issue.category || 'unknown';
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(issue);
  }

  for (const [category, issues] of Object.entries(byCategory)) {
    md += `### ${category.toUpperCase()}\n\n`;

    for (const issue of issues) {
      md += `#### ${issue.title}\n`;
      md += `- **Audit ID:** \`${issue.auditId}\`\n`;
      md += `- **Strategy:** ${issue.strategy}\n`;
      md += `- **Affected Pages:** ${issue.affectedPageCount} pages\n`;

      if (issue.uniqueElements.length > 0) {
        md += `- **Example Elements:**\n`;
        for (const el of issue.uniqueElements.slice(0, 3)) {
          md += `  \`\`\`html\n  ${el}\n  \`\`\`\n`;
        }
      }

      if (issue.affectedPageCount <= 10) {
        md += `- **Pages:** ${issue.affectedPages.join(', ')}\n`;
      } else {
        md += `- **Sample Pages:** ${issue.affectedPages.slice(0, 5).join(', ')}... and ${issue.affectedPageCount - 5} more\n`;
      }

      md += `\n`;
    }
  }

  // Quick fix suggestions
  md += `## Quick Fixes\n\n`;
  md += `Based on the audit, here are the most impactful fixes:\n\n`;

  const topIssues = aggregatedIssues.slice(0, 5);
  for (let i = 0; i < topIssues.length; i++) {
    const issue = topIssues[i];
    md += `${i + 1}. **${issue.title}** - Affects ${issue.affectedPageCount} pages (${issue.strategy})\n`;
  }

  return md;
}

async function main() {
  const startTime = Date.now();

  // Ensure reports directory exists
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  // Fetch all URLs from sitemap
  const urls = await fetchSitemap();

  // Load existing progress
  const progress = await loadProgress();
  const completedCount = Object.keys(progress.completed).length;

  if (completedCount > 0) {
    console.log(`Resuming from ${completedCount} completed URLs...\n`);
  }

  // Process each URL
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const shortUrl = url.replace('https://www.chefapprovedtools.com', '') || '/';

    // Skip if already completed
    if (progress.completed[url]?.mobile && progress.completed[url]?.desktop) {
      continue;
    }

    // Initialize
    if (!progress.completed[url]) {
      progress.completed[url] = {};
    }

    // Mobile audit
    if (!progress.completed[url].mobile) {
      process.stdout.write(`[${i + 1}/${urls.length}] ${shortUrl} (mobile)... `);
      const result = await runDetailedAudit(url, 'mobile');
      progress.completed[url].mobile = result;

      if (result.error) {
        console.log(`ERROR: ${result.error}`);
      } else {
        const issueCount = result.failingAudits.length;
        console.log(`P:${result.scores.performance} A:${result.scores.accessibility} SEO:${result.scores.seo} (${issueCount} issues)`);
      }

      await saveProgress(progress);
      await delay(DELAY_MS);
    }

    // Desktop audit
    if (!progress.completed[url].desktop) {
      process.stdout.write(`[${i + 1}/${urls.length}] ${shortUrl} (desktop)... `);
      const result = await runDetailedAudit(url, 'desktop');
      progress.completed[url].desktop = result;

      if (result.error) {
        console.log(`ERROR: ${result.error}`);
      } else {
        const issueCount = result.failingAudits.length;
        console.log(`P:${result.scores.performance} A:${result.scores.accessibility} SEO:${result.scores.seo} (${issueCount} issues)`);
      }

      await saveProgress(progress);
      await delay(DELAY_MS);
    }
  }

  // Aggregate issues
  console.log('\nAggregating issues...');
  const aggregatedIssues = aggregateIssues(progress);

  // Save detailed JSON report
  const report = {
    generatedAt: new Date().toISOString(),
    totalPages: Object.keys(progress.completed).length,
    aggregatedIssues,
    pageDetails: progress.completed
  };
  await fs.writeFile(REPORT_FILE, JSON.stringify(report, null, 2));

  // Generate markdown summary
  const markdown = generateMarkdownSummary(aggregatedIssues, progress);
  await fs.writeFile(SUMMARY_FILE, markdown);

  // Summary
  const duration = Math.round((Date.now() - startTime) / 1000);
  const totalPages = Object.keys(progress.completed).length;

  console.log(`\n${'='.repeat(50)}`);
  console.log(`Detailed Audit Complete!`);
  console.log(`${'='.repeat(50)}`);
  console.log(`Pages audited: ${totalPages}`);
  console.log(`Unique issues found: ${aggregatedIssues.length}`);
  console.log(`Time: ${duration}s`);
  console.log(`\nReports saved:`);
  console.log(`  - ${REPORT_FILE} (full JSON data)`);
  console.log(`  - ${SUMMARY_FILE} (readable summary)`);
  console.log(`${'='.repeat(50)}\n`);

  // Show top issues
  console.log('Top Issues by Affected Pages:');
  for (const issue of aggregatedIssues.slice(0, 10)) {
    console.log(`  [${issue.strategy}] ${issue.title} - ${issue.affectedPageCount} pages`);
  }

  // Clean up progress file on success
  await fs.unlink(PROGRESS_FILE).catch(() => {});
}

main().catch(console.error);
