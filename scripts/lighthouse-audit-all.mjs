#!/usr/bin/env node
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';

const execAsync = promisify(exec);

const SITEMAP_URL = 'https://www.chefapprovedtools.com/sitemap.xml';
const PROGRESS_FILE = 'reports/lighthouse-progress.json';
const OUTPUT_FILE = 'reports/lighthouse-all-pages.csv';

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

  console.log(`Found ${urls.length} URLs`);
  return urls;
}

async function loadProgress() {
  try {
    const data = await fs.readFile(PROGRESS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { completed: {}, lastIndex: -1 };
  }
}

async function saveProgress(progress) {
  await fs.writeFile(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

async function runLighthouse(url, device, index, total) {
  const shortUrl = url.replace('https://www.chefapprovedtools.com', '');
  const deviceFlag = device === 'mobile'
    ? '--preset=perf --emulated-form-factor=mobile'
    : '--preset=desktop --emulated-form-factor=desktop';

  console.log(`[${index + 1}/${total}] ${shortUrl || '/'} (${device})`);

  try {
    const { stdout } = await execAsync(
      `npx lighthouse "${url}" --output=json --quiet --chrome-flags="--headless --no-sandbox" ${deviceFlag} --only-categories=performance,accessibility,best-practices,seo`,
      { maxBuffer: 10 * 1024 * 1024, timeout: 180000 }
    );

    const report = JSON.parse(stdout);
    const categories = report.categories;

    const result = {
      performance: Math.round((categories.performance?.score || 0) * 100),
      accessibility: Math.round((categories.accessibility?.score || 0) * 100),
      bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
      seo: Math.round((categories.seo?.score || 0) * 100),
      error: null
    };

    console.log(`  ✓ P:${result.performance} A:${result.accessibility} BP:${result.bestPractices} SEO:${result.seo}`);
    return result;
  } catch (error) {
    const errMsg = error.message.slice(0, 100);
    console.error(`  ✗ Error: ${errMsg}`);
    return {
      performance: null,
      accessibility: null,
      bestPractices: null,
      seo: null,
      error: errMsg
    };
  }
}

function generateCSV(results) {
  const header = 'URL,Mobile Performance,Mobile Accessibility,Mobile Best Practices,Mobile SEO,Mobile Error,Desktop Performance,Desktop Accessibility,Desktop Best Practices,Desktop SEO,Desktop Error';
  const rows = Object.entries(results).map(([url, data]) => {
    const m = data.mobile || {};
    const d = data.desktop || {};
    return `"${url}",${m.performance ?? ''},${m.accessibility ?? ''},${m.bestPractices ?? ''},${m.seo ?? ''},"${m.error || ''}",${d.performance ?? ''},${d.accessibility ?? ''},${d.bestPractices ?? ''},${d.seo ?? ''},"${d.error || ''}"`;
  });
  return [header, ...rows].join('\n');
}

async function main() {
  const startTime = Date.now();

  // Ensure reports directory exists
  await fs.mkdir('reports', { recursive: true });

  // Fetch all URLs
  const urls = await fetchSitemap();

  // Load existing progress (for resume capability)
  const progress = await loadProgress();
  const completedCount = Object.values(progress.completed).filter(c => c.mobile && c.desktop).length;
  console.log(`\nResuming... (${completedCount} fully completed)\n`);

  // Run lighthouse on each URL (mobile + desktop)
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];

    // Initialize if needed
    if (!progress.completed[url]) {
      progress.completed[url] = {};
    }

    // Run mobile if not done
    if (!progress.completed[url].mobile) {
      progress.completed[url].mobile = await runLighthouse(url, 'mobile', i, urls.length);
      await saveProgress(progress);
    }

    // Run desktop if not done
    if (!progress.completed[url].desktop) {
      progress.completed[url].desktop = await runLighthouse(url, 'desktop', i, urls.length);
      await saveProgress(progress);
    }

    progress.lastIndex = i;
  }

  // Generate final CSV
  console.log('\nGenerating CSV...');
  const csv = generateCSV(progress.completed);
  await fs.writeFile(OUTPUT_FILE, csv);

  const duration = Math.round((Date.now() - startTime) / 1000 / 60);
  const totalPages = Object.keys(progress.completed).length;

  console.log(`\n========================================`);
  console.log(`Complete! ${totalPages} pages audited (mobile + desktop)`);
  console.log(`CSV saved to: ${OUTPUT_FILE}`);
  console.log(`Total time: ${duration} minutes`);
  console.log(`========================================\n`);

  // Clean up progress file
  await fs.unlink(PROGRESS_FILE).catch(() => {});
}

main().catch(console.error);
