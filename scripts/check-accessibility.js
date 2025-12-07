#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.chefapprovedtools.com';

const PAGES = [
  '/blog/bacon-but-not-in-this-dish',
  '/blog/cutting-storing-fresh-herbs',
  '/blog/oxidization-effect-on-food',
  '/blog/why-children-hate-broccoli',
  '/blog/cutting-board-materials-guide',
  '/blog/how-to-sear-steaks-like-restaurant-chef',
  '/guides/best-budget-chef-knife',
  '/reviews',
  '/blog/kitchen-tools-wasting-money',
  '/blog/knife-safety-rules-professional-kitchens',
  '/guides/best-chef-knives',
  '/chef-approved',
  '/blog/how-to-choose-first-chef-knife',
  '/guides/best-knife-for-cutting-meat',
  '/blog/hotel-pan-system-restaurant-organization-home',
  '/newsletter',
  '/blog/stainless-steel-why-food-sticks',
  '/blog/carbon-steel-vs-stainless-steel-knife',
  '/blog/knife-storage-protecting-blades-for-decades',
  '/blog/nonstick-vs-stainless-steel-pans',
  '/blog/gas-vs-induction-cooktop',
  '/blog/blanching-vegetables-why-restaurants-do-it',
  '/blog/stand-mixer-buying-guide',
  '/blog/dutch-oven-vs-slow-cooker',
  '/blog/immersion-blender-vs-countertop-blender',
  '/blog/stand-mixer-vs-hand-mixer',
  '/blog/complete-victorinox-knife-lineup-comparison',
  '/blog/paring-knife-vs-chefs-knife',
  '/blog/cast-iron-vs-carbon-steel-pan',
  '/blog/wood-vs-composite-cutting-board',
  '/blog/victorinox-budget-vs-wusthof-premium-knives',
  '/blog/knife-skills-how-to-hold-chef-knife',
  '/blog/cast-iron-seasoning-care',
  '/blog/essential-knife-cuts-every-cook-should-master',
  '/blog/kitchen-thermometers-guide',
  '/blog/understanding-cooking-fats',
  '/blog/vegetable-roasting-guide',
];

const OUTPUT_DIR = '/tmp/lighthouse-accessibility';

function runLighthouse(url, outputPath) {
  const cmd = `npx lighthouse "${url}" --only-categories=accessibility --output=json --output-path="${outputPath}" --chrome-flags="--headless --no-sandbox --disable-gpu" --quiet 2>/dev/null`;

  try {
    execSync(cmd, { stdio: 'pipe', timeout: 120000 });
    return true;
  } catch (error) {
    return false;
  }
}

function extractAccessibilityIssues(result) {
  const issues = [];
  const audits = result.audits || {};

  for (const [auditId, audit] of Object.entries(audits)) {
    // Skip passed audits and non-applicable ones
    if (audit.score === 1 || audit.score === null || audit.scoreDisplayMode === 'notApplicable') {
      continue;
    }

    const issue = {
      id: auditId,
      title: audit.title,
      description: audit.description,
      score: audit.score,
      displayValue: audit.displayValue,
      elements: [],
    };

    // Extract failing elements
    if (audit.details?.items) {
      for (const item of audit.details.items) {
        const element = {
          selector: item.node?.selector || item.selector || '',
          snippet: item.node?.snippet || item.snippet || '',
          explanation: item.node?.explanation || item.explanation || '',
          path: item.node?.path || '',
        };
        if (element.selector || element.snippet) {
          issue.elements.push(element);
        }
      }
    }

    issues.push(issue);
  }

  return issues;
}

async function main() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log('='.repeat(80));
  console.log('ACCESSIBILITY AUDIT REPORT (Using Lighthouse CLI)');
  console.log('='.repeat(80));
  console.log(`\nChecking ${PAGES.length} pages for accessibility issues...\n`);

  const allIssues = {};
  const scores = {};

  for (let i = 0; i < PAGES.length; i++) {
    const page = PAGES[i];
    const fullUrl = `${BASE_URL}${page}`;
    const outputPath = path.join(OUTPUT_DIR, `lighthouse-${i}.json`);

    console.log(`[${i + 1}/${PAGES.length}] Checking: ${page}`);

    try {
      const success = runLighthouse(fullUrl, outputPath);

      if (!success || !fs.existsSync(outputPath)) {
        console.log(`  ERROR: Lighthouse failed to run\n`);
        continue;
      }

      const resultJson = fs.readFileSync(outputPath, 'utf8');
      const result = JSON.parse(resultJson);

      const score = result.categories?.accessibility?.score;
      scores[page] = score !== null && score !== undefined ? Math.round(score * 100) : 'N/A';

      const issues = extractAccessibilityIssues(result);

      if (issues.length > 0) {
        allIssues[page] = issues;
        console.log(`  Score: ${scores[page]} | Issues found: ${issues.length}`);
      } else {
        console.log(`  Score: ${scores[page]} | No issues found`);
      }

      // Clean up temp file
      fs.unlinkSync(outputPath);

    } catch (error) {
      console.log(`  ERROR: ${error.message}\n`);
    }
  }

  // Print detailed report
  console.log('\n' + '='.repeat(80));
  console.log('DETAILED ACCESSIBILITY ISSUES');
  console.log('='.repeat(80));

  // Group issues by type across all pages
  const issuesByType = {};

  for (const [page, issues] of Object.entries(allIssues)) {
    for (const issue of issues) {
      if (!issuesByType[issue.id]) {
        issuesByType[issue.id] = {
          title: issue.title,
          description: issue.description,
          pages: [],
        };
      }
      issuesByType[issue.id].pages.push({
        page,
        elements: issue.elements,
        displayValue: issue.displayValue,
      });
    }
  }

  // Print issues grouped by type
  const sortedIssues = Object.entries(issuesByType).sort((a, b) =>
    b[1].pages.length - a[1].pages.length
  );

  for (const [issueId, issueData] of sortedIssues) {
    console.log('\n' + '-'.repeat(80));
    console.log(`\n🔴 ISSUE: ${issueData.title}`);
    console.log(`   ID: ${issueId}`);
    console.log(`   Affects: ${issueData.pages.length} page(s)`);
    console.log(`\n   Description: ${issueData.description}\n`);

    for (const pageData of issueData.pages) {
      console.log(`   📄 ${pageData.page}`);
      if (pageData.displayValue) {
        console.log(`      ${pageData.displayValue}`);
      }

      if (pageData.elements.length > 0) {
        console.log('      Failing elements:');
        for (const el of pageData.elements.slice(0, 5)) { // Limit to first 5 elements
          if (el.selector) {
            console.log(`        - Selector: ${el.selector}`);
          }
          if (el.snippet) {
            console.log(`          Snippet: ${el.snippet.substring(0, 200)}${el.snippet.length > 200 ? '...' : ''}`);
          }
          if (el.explanation) {
            console.log(`          Issue: ${el.explanation}`);
          }
          console.log('');
        }
        if (pageData.elements.length > 5) {
          console.log(`        ... and ${pageData.elements.length - 5} more elements`);
        }
      }
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(80));
  console.log('SUMMARY');
  console.log('='.repeat(80));

  console.log('\nScores by page:');
  const sortedScores = Object.entries(scores).sort((a, b) => {
    if (a[1] === 'N/A') return 1;
    if (b[1] === 'N/A') return -1;
    return a[1] - b[1];
  });

  for (const [page, score] of sortedScores) {
    const emoji = score === 'N/A' ? '⚪' : score >= 90 ? '🟢' : score >= 50 ? '🟡' : '🔴';
    console.log(`  ${emoji} ${score.toString().padStart(3)} | ${page}`);
  }

  const numericScores = Object.values(scores).filter(s => s !== 'N/A');
  if (numericScores.length > 0) {
    const avgScore = Math.round(numericScores.reduce((a, b) => a + b, 0) / numericScores.length);
    console.log(`\nAverage accessibility score: ${avgScore}`);
  }

  console.log(`\nTotal unique issue types: ${Object.keys(issuesByType).length}`);
  console.log(`Pages with issues: ${Object.keys(allIssues).length}/${PAGES.length}`);

  // Print fix recommendations
  if (sortedIssues.length > 0) {
    console.log('\n' + '='.repeat(80));
    console.log('FIX RECOMMENDATIONS');
    console.log('='.repeat(80));

    for (const [issueId, issueData] of sortedIssues) {
      console.log(`\n📋 ${issueId}`);
      console.log(`   ${issueData.title}`);
      console.log(`   Affects ${issueData.pages.length} pages - fix once in shared component if possible`);
    }
  }
}

main().catch(console.error);
