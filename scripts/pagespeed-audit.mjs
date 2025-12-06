#!/usr/bin/env node
/**
 * PageSpeed Insights API Audit Script
 *
 * Audits all pages from sitemap using Google's PageSpeed Insights API.
 * Much faster than local Lighthouse (~5s per page vs ~3min).
 *
 * Usage: node scripts/pagespeed-audit.mjs
 *
 * Free tier: 400 requests/day (enough for ~200 pages mobile+desktop)
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
const OUTPUT_FILE = 'reports/pagespeed-audit.csv';
const PROGRESS_FILE = 'reports/pagespeed-progress.json';

// Rate limiting: 400/day = ~16/hour = 1 every 4 seconds to be safe
const DELAY_MS = 2000;

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
    return { completed: {} };
  }
}

async function saveProgress(progress) {
  await fs.writeFile(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

async function runPageSpeedAudit(url, strategy) {
  const apiUrl = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
  apiUrl.searchParams.set('url', url);
  apiUrl.searchParams.set('key', API_KEY);
  apiUrl.searchParams.set('strategy', strategy);
  apiUrl.searchParams.set('category', 'PERFORMANCE');
  apiUrl.searchParams.append('category', 'ACCESSIBILITY');
  apiUrl.searchParams.append('category', 'BEST_PRACTICES');
  apiUrl.searchParams.append('category', 'SEO');

  try {
    const response = await fetch(apiUrl.toString());

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error ${response.status}: ${errorText.slice(0, 200)}`);
    }

    const data = await response.json();
    const categories = data.lighthouseResult?.categories || {};

    return {
      performance: Math.round((categories.performance?.score || 0) * 100),
      accessibility: Math.round((categories.accessibility?.score || 0) * 100),
      bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
      seo: Math.round((categories.seo?.score || 0) * 100),
      fcp: data.lighthouseResult?.audits?.['first-contentful-paint']?.numericValue,
      lcp: data.lighthouseResult?.audits?.['largest-contentful-paint']?.numericValue,
      cls: data.lighthouseResult?.audits?.['cumulative-layout-shift']?.numericValue,
      tbt: data.lighthouseResult?.audits?.['total-blocking-time']?.numericValue,
      error: null
    };
  } catch (error) {
    return {
      performance: null,
      accessibility: null,
      bestPractices: null,
      seo: null,
      fcp: null,
      lcp: null,
      cls: null,
      tbt: null,
      error: error.message.slice(0, 100)
    };
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function generateCSV(results) {
  const header = [
    'URL',
    'Mobile Perf', 'Mobile A11y', 'Mobile BP', 'Mobile SEO',
    'Mobile FCP (ms)', 'Mobile LCP (ms)', 'Mobile CLS', 'Mobile TBT (ms)',
    'Desktop Perf', 'Desktop A11y', 'Desktop BP', 'Desktop SEO',
    'Desktop FCP (ms)', 'Desktop LCP (ms)', 'Desktop CLS', 'Desktop TBT (ms)',
    'Error'
  ].join(',');

  const rows = Object.entries(results).map(([url, data]) => {
    const m = data.mobile || {};
    const d = data.desktop || {};
    const shortUrl = url.replace('https://www.chefapprovedtools.com', '') || '/';
    return [
      `"${shortUrl}"`,
      m.performance ?? '', m.accessibility ?? '', m.bestPractices ?? '', m.seo ?? '',
      m.fcp ? Math.round(m.fcp) : '', m.lcp ? Math.round(m.lcp) : '',
      m.cls?.toFixed(3) ?? '', m.tbt ? Math.round(m.tbt) : '',
      d.performance ?? '', d.accessibility ?? '', d.bestPractices ?? '', d.seo ?? '',
      d.fcp ? Math.round(d.fcp) : '', d.lcp ? Math.round(d.lcp) : '',
      d.cls?.toFixed(3) ?? '', d.tbt ? Math.round(d.tbt) : '',
      `"${m.error || d.error || ''}"`
    ].join(',');
  });

  return [header, ...rows].join('\n');
}

async function main() {
  const startTime = Date.now();

  // Ensure reports directory exists
  await fs.mkdir('reports', { recursive: true });

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
      progress.completed[url].mobile = await runPageSpeedAudit(url, 'mobile');

      const m = progress.completed[url].mobile;
      if (m.error) {
        console.log(`ERROR: ${m.error}`);
      } else {
        console.log(`P:${m.performance} A:${m.accessibility} BP:${m.bestPractices} SEO:${m.seo}`);
      }

      await saveProgress(progress);
      await delay(DELAY_MS);
    }

    // Desktop audit
    if (!progress.completed[url].desktop) {
      process.stdout.write(`[${i + 1}/${urls.length}] ${shortUrl} (desktop)... `);
      progress.completed[url].desktop = await runPageSpeedAudit(url, 'desktop');

      const d = progress.completed[url].desktop;
      if (d.error) {
        console.log(`ERROR: ${d.error}`);
      } else {
        console.log(`P:${d.performance} A:${d.accessibility} BP:${d.bestPractices} SEO:${d.seo}`);
      }

      await saveProgress(progress);
      await delay(DELAY_MS);
    }
  }

  // Generate CSV
  console.log('\nGenerating CSV report...');
  const csv = generateCSV(progress.completed);
  await fs.writeFile(OUTPUT_FILE, csv);

  // Summary
  const duration = Math.round((Date.now() - startTime) / 1000);
  const totalPages = Object.keys(progress.completed).length;

  // Calculate averages
  const results = Object.values(progress.completed);
  const mobilePerf = results.map(r => r.mobile?.performance).filter(Boolean);
  const mobileA11y = results.map(r => r.mobile?.accessibility).filter(Boolean);
  const avgMobilePerf = mobilePerf.length ? Math.round(mobilePerf.reduce((a, b) => a + b, 0) / mobilePerf.length) : 0;
  const avgMobileA11y = mobileA11y.length ? Math.round(mobileA11y.reduce((a, b) => a + b, 0) / mobileA11y.length) : 0;

  console.log(`\n${'='.repeat(50)}`);
  console.log(`Audit Complete!`);
  console.log(`${'='.repeat(50)}`);
  console.log(`Pages audited: ${totalPages}`);
  console.log(`Time: ${duration}s`);
  console.log(`\nAverages (Mobile):`);
  console.log(`  Performance: ${avgMobilePerf}`);
  console.log(`  Accessibility: ${avgMobileA11y}`);
  console.log(`\nReport saved: ${OUTPUT_FILE}`);
  console.log(`${'='.repeat(50)}\n`);

  // Clean up progress file on success
  await fs.unlink(PROGRESS_FILE).catch(() => {});
}

main().catch(console.error);
