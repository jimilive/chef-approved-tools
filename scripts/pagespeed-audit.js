#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');

const API_KEY = process.env.PAGESPEED_API_KEY;
if (!API_KEY) {
  console.error('Error: PAGESPEED_API_KEY not found in .env.local');
  process.exit(1);
}

const SITEMAP_URL = 'https://www.chefapprovedtools.com/sitemap.xml';
const CSV_PATH = path.join(process.cwd(), 'reports', 'pagespeed-audit.csv');
const API_BASE = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

async function fetchSitemapUrls() {
  console.log(`Fetching sitemap from ${SITEMAP_URL}...`);
  const response = await fetch(SITEMAP_URL);
  const xml = await response.text();

  // Extract URLs from sitemap XML
  const urlMatches = xml.match(/<loc>([^<]+)<\/loc>/g) || [];
  const urls = urlMatches.map(match => match.replace(/<\/?loc>/g, ''));

  console.log(`Found ${urls.length} URLs in sitemap\n`);
  return urls;
}

async function runPagespeedApi(url, strategy = 'mobile') {
  const categories = ['performance', 'accessibility', 'best-practices', 'seo'].join('&category=');
  const apiUrl = `${API_BASE}?url=${encodeURIComponent(url)}&strategy=${strategy}&category=${categories}&key=${API_KEY}`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  return data.lighthouseResult;
}

function extractScores(result) {
  const categories = result.categories || {};
  const audits = result.audits || {};

  return {
    performance: categories.performance?.score !== null ? Math.round(categories.performance.score * 100) : '',
    accessibility: categories.accessibility?.score !== null ? Math.round(categories.accessibility.score * 100) : '',
    bestPractices: categories['best-practices']?.score !== null ? Math.round(categories['best-practices'].score * 100) : '',
    seo: categories.seo?.score !== null ? Math.round(categories.seo.score * 100) : '',
    fcp: audits['first-contentful-paint']?.numericValue ? Math.round(audits['first-contentful-paint'].numericValue) : '',
    lcp: audits['largest-contentful-paint']?.numericValue ? Math.round(audits['largest-contentful-paint'].numericValue) : '',
    cls: audits['cumulative-layout-shift']?.numericValue !== undefined ? audits['cumulative-layout-shift'].numericValue.toFixed(3) : '',
    tbt: audits['total-blocking-time']?.numericValue ? Math.round(audits['total-blocking-time'].numericValue) : '',
  };
}

async function main() {
  const reportsDir = path.dirname(CSV_PATH);
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  console.log('='.repeat(80));
  console.log('PAGESPEED API AUDIT - All Categories (Mobile + Desktop)');
  console.log('='.repeat(80));

  // Fetch URLs from sitemap
  const allUrls = await fetchSitemapUrls();

  console.log(`Auditing ${allUrls.length} pages...\n`);

  const results = [];

  for (let i = 0; i < allUrls.length; i++) {
    const fullUrl = allUrls[i];
    // Extract path for display
    const urlPath = fullUrl.replace('https://www.chefapprovedtools.com', '') || '/';

    console.log(`[${i + 1}/${allUrls.length}] ${urlPath}`);

    let mobileScores = {};
    let desktopScores = {};
    let mobileError = '';
    let desktopError = '';

    // Mobile audit
    try {
      const mobileResult = await runPagespeedApi(fullUrl, 'mobile');
      mobileScores = extractScores(mobileResult);
    } catch (e) {
      mobileError = `Mobile: ${e.message}`;
    }

    // Desktop audit
    try {
      const desktopResult = await runPagespeedApi(fullUrl, 'desktop');
      desktopScores = extractScores(desktopResult);
    } catch (e) {
      desktopError = `Desktop: ${e.message}`;
    }

    const error = [mobileError, desktopError].filter(Boolean).join('; ');

    const result = {
      url: urlPath,
      mobilePerf: mobileScores.performance || '',
      mobileA11y: mobileScores.accessibility || '',
      mobileBP: mobileScores.bestPractices || '',
      mobileSEO: mobileScores.seo || '',
      mobileFCP: mobileScores.fcp || '',
      mobileLCP: mobileScores.lcp || '',
      mobileCLS: mobileScores.cls || '',
      mobileTBT: mobileScores.tbt || '',
      desktopPerf: desktopScores.performance || '',
      desktopA11y: desktopScores.accessibility || '',
      desktopBP: desktopScores.bestPractices || '',
      desktopSEO: desktopScores.seo || '',
      desktopFCP: desktopScores.fcp || '',
      desktopLCP: desktopScores.lcp || '',
      desktopCLS: desktopScores.cls || '',
      desktopTBT: desktopScores.tbt || '',
      error: error,
    };

    results.push(result);

    // Print all 4 scores for both mobile and desktop
    const mPerf = mobileScores.performance || 'N/A';
    const mA11y = mobileScores.accessibility || 'N/A';
    const mBP = mobileScores.bestPractices || 'N/A';
    const mSEO = mobileScores.seo || 'N/A';
    const dPerf = desktopScores.performance || 'N/A';
    const dA11y = desktopScores.accessibility || 'N/A';
    const dBP = desktopScores.bestPractices || 'N/A';
    const dSEO = desktopScores.seo || 'N/A';

    console.log(`   Mobile:  Perf=${mPerf} A11y=${mA11y} BP=${mBP} SEO=${mSEO}`);
    console.log(`   Desktop: Perf=${dPerf} A11y=${dA11y} BP=${dBP} SEO=${dSEO}`);

    if (error) {
      console.log(`   ERROR: ${error}`);
    }
  }

  // Calculate averages and flags
  const mobilePerfScores = results.map(r => r.mobilePerf).filter(s => s !== '');
  const mobileA11yScores = results.map(r => r.mobileA11y).filter(s => s !== '');
  const mobileBPScores = results.map(r => r.mobileBP).filter(s => s !== '');
  const mobileSEOScores = results.map(r => r.mobileSEO).filter(s => s !== '');
  const desktopPerfScores = results.map(r => r.desktopPerf).filter(s => s !== '');
  const desktopA11yScores = results.map(r => r.desktopA11y).filter(s => s !== '');
  const desktopBPScores = results.map(r => r.desktopBP).filter(s => s !== '');
  const desktopSEOScores = results.map(r => r.desktopSEO).filter(s => s !== '');

  const avg = (arr) => arr.length > 0 ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : '';

  // Generate flags for each result
  const getFlags = (r) => {
    const issues = [];
    if (r.mobilePerf && r.mobilePerf < 90) issues.push(`M-Perf:${r.mobilePerf}`);
    if (r.mobileA11y && r.mobileA11y < 100) issues.push(`M-A11y:${r.mobileA11y}`);
    if (r.mobileBP && r.mobileBP < 100) issues.push(`M-BP:${r.mobileBP}`);
    if (r.mobileSEO && r.mobileSEO < 100) issues.push(`M-SEO:${r.mobileSEO}`);
    if (r.desktopPerf && r.desktopPerf < 90) issues.push(`D-Perf:${r.desktopPerf}`);
    if (r.desktopA11y && r.desktopA11y < 100) issues.push(`D-A11y:${r.desktopA11y}`);
    if (r.desktopBP && r.desktopBP < 100) issues.push(`D-BP:${r.desktopBP}`);
    if (r.desktopSEO && r.desktopSEO < 100) issues.push(`D-SEO:${r.desktopSEO}`);
    return issues.join('; ');
  };

  // Write CSV
  const headers = [
    'URL',
    'Mobile Perf', 'Mobile A11y', 'Mobile BP', 'Mobile SEO',
    'Mobile FCP (ms)', 'Mobile LCP (ms)', 'Mobile CLS', 'Mobile TBT (ms)',
    'Desktop Perf', 'Desktop A11y', 'Desktop BP', 'Desktop SEO',
    'Desktop FCP (ms)', 'Desktop LCP (ms)', 'Desktop CLS', 'Desktop TBT (ms)',
    'Error', 'Flags'
  ];

  const csvRows = [headers.join(',')];

  for (const r of results) {
    const flags = getFlags(r);
    const row = [
      `"${r.url}"`,
      r.mobilePerf, r.mobileA11y, r.mobileBP, r.mobileSEO,
      r.mobileFCP, r.mobileLCP, r.mobileCLS, r.mobileTBT,
      r.desktopPerf, r.desktopA11y, r.desktopBP, r.desktopSEO,
      r.desktopFCP, r.desktopLCP, r.desktopCLS, r.desktopTBT,
      `"${r.error}"`, `"${flags}"`
    ];
    csvRows.push(row.join(','));
  }

  // Add blank row and averages
  csvRows.push(''); // blank row
  csvRows.push([
    '"AVERAGES"',
    avg(mobilePerfScores), avg(mobileA11yScores), avg(mobileBPScores), avg(mobileSEOScores),
    '', '', '', '',
    avg(desktopPerfScores), avg(desktopA11yScores), avg(desktopBPScores), avg(desktopSEOScores),
    '', '', '', '',
    '""', '""'
  ].join(','));

  fs.writeFileSync(CSV_PATH, csvRows.join('\n'));
  console.log(`\nCSV saved to: ${CSV_PATH}`);

  // Print summary
  console.log('\n' + '='.repeat(80));
  console.log('SUMMARY');
  console.log('='.repeat(80));

  console.log('\nMobile Averages:');
  console.log(`  Performance: ${avg(mobilePerfScores) || 'N/A'}`);
  console.log(`  Accessibility: ${avg(mobileA11yScores) || 'N/A'}`);
  console.log(`  Best Practices: ${avg(mobileBPScores) || 'N/A'}`);
  console.log(`  SEO: ${avg(mobileSEOScores) || 'N/A'}`);

  console.log('\nDesktop Averages:');
  console.log(`  Performance: ${avg(desktopPerfScores) || 'N/A'}`);
  console.log(`  Accessibility: ${avg(desktopA11yScores) || 'N/A'}`);
  console.log(`  Best Practices: ${avg(desktopBPScores) || 'N/A'}`);
  console.log(`  SEO: ${avg(desktopSEOScores) || 'N/A'}`);

  // List pages with low scores
  const lowScorePages = results.filter(r => getFlags(r) !== '');

  if (lowScorePages.length > 0) {
    console.log(`\nPages with issues (${lowScorePages.length}):`);
    for (const p of lowScorePages) {
      console.log(`  ${p.url} - ${getFlags(p)}`);
    }
  } else {
    console.log('\nAll pages have good scores!');
  }

  console.log(`\nTotal pages audited: ${results.length}`);
}

main().catch(console.error);
