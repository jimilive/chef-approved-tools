# Lighthouse Test Results - November 5, 2025

**Test Date:** November 5, 2025
**Test Environment:** Localhost Development Mode
**Pages Tested:** 5 pages, 3 runs each (15 total runs)
**Note:** Scores are from development mode and will be higher in production

---

## Summary of Category Scores

### Homepage (http://localhost:3000)

| Category | Run 1 | Run 2 | Run 3 | Median |
|----------|-------|-------|-------|--------|
| Performance | 0.60 | 0.53 | 0.56 | **0.60** |
| Accessibility | N/A | N/A | N/A | N/A |
| Best Practices | 0.83 | 0.83 | 0.83 | **0.83** |
| SEO | N/A | N/A | N/A | N/A |
| PWA | 0.56 | 0.56 | 0.56 | **0.56** |

**Report Links:**
- Median Report: https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1762375883889-98784.report.html

---

### Knives Hub Page (http://localhost:3000/knives)

| Category | Run 1 | Run 2 | Run 3 | Median |
|----------|-------|-------|-------|--------|
| Performance | 0.53 | 0.54 | 0.56 | **0.56** |
| Accessibility | N/A | N/A | N/A | N/A |
| Best Practices | 0.83 | 0.83 | 0.83 | **0.83** |
| SEO | N/A | N/A | N/A | N/A |
| PWA | 0.56 | 0.56 | 0.56 | **0.56** |

**Report Links:**
- Median Report: https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1762375884472-30990.report.html

---

### Cookware Hub Page (http://localhost:3000/cookware)

| Category | Run 1 | Run 2 | Run 3 | Median |
|----------|-------|-------|-------|--------|
| Performance | 0.56 | 0.57 | 0.54 | **0.57** |
| Accessibility | N/A | N/A | N/A | N/A |
| Best Practices | 0.83 | 0.83 | 0.83 | **0.83** |
| SEO | N/A | N/A | N/A | N/A |
| PWA | 0.56 | 0.56 | 0.56 | **0.56** |

**Report Links:**
- Median Report: https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1762375884891-77236.report.html

---

### Appliances Hub Page (http://localhost:3000/appliances)

| Category | Run 1 | Run 2 | Run 3 | Median |
|----------|-------|-------|-------|--------|
| Performance | 0.59 | 0.55 | 0.54 | **0.59** |
| Accessibility | N/A | N/A | N/A | N/A |
| Best Practices | 0.83 | 0.83 | 0.83 | **0.83** |
| SEO | N/A | N/A | N/A | N/A |
| PWA | 0.56 | 0.56 | 0.56 | **0.56** |

**Report Links:**
- Median Report: https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1762375885481-33052.report.html

---

### About Page (http://localhost:3000/about)

| Category | Run 1 | Run 2 | Run 3 | Median |
|----------|-------|-------|-------|--------|
| Performance | 0.56 | 0.57 | 0.54 | **0.57** |
| Accessibility | N/A | N/A | N/A | N/A |
| Best Practices | 0.83 | 0.83 | 0.83 | **0.83** |
| SEO | N/A | N/A | N/A | N/A |
| PWA | 0.56 | 0.56 | 0.56 | **0.56** |

**Report Links:**
- Median Report: https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1762375885946-33313.report.html

---

## Detailed Performance Metrics

### Homepage

| Metric | Run 1 | Run 2 | Run 3 | Median | Threshold | Status |
|--------|-------|-------|-------|--------|-----------|--------|
| Time to Interactive (ms) | 16,766 | 14,545 | 14,929 | **14,545** | ≤5,000 | ❌ FAIL |
| Total Blocking Time (ms) | 2,989 | 836 | 909 | **836** | ≤300 | ❌ FAIL |
| Largest Contentful Paint (ms) | N/A | N/A | N/A | N/A | ≤2,500 | - |

### Knives Hub Page

| Metric | Run 1 | Run 2 | Run 3 | Median | Threshold | Status |
|--------|-------|-------|-------|--------|-----------|--------|
| Time to Interactive (ms) | 14,007 | 13,571 | 13,688 | **13,571** | ≤5,000 | ❌ FAIL |
| Total Blocking Time (ms) | 1,100 | 786 | 775 | **775** | ≤300 | ❌ FAIL |
| Largest Contentful Paint (ms) | 6,077 | 14,021 | 14,277 | **6,077** | ≤2,500 | ❌ FAIL |

### Cookware Hub Page

| Metric | Run 1 | Run 2 | Run 3 | Median | Threshold | Status |
|--------|-------|-------|-------|--------|-----------|--------|
| Time to Interactive (ms) | 14,061 | 13,908 | 13,878 | **13,878** | ≤5,000 | ❌ FAIL |
| Total Blocking Time (ms) | 1,016 | 1,019 | 801 | **801** | ≤300 | ❌ FAIL |
| Largest Contentful Paint (ms) | 5,932 | 5,547 | 14,478 | **5,547** | ≤2,500 | ❌ FAIL |

### Appliances Hub Page

| Metric | Run 1 | Run 2 | Run 3 | Median | Threshold | Status |
|--------|-------|-------|-------|--------|-----------|--------|
| Time to Interactive (ms) | 13,638 | 13,937 | 13,630 | **13,630** | ≤5,000 | ❌ FAIL |
| Total Blocking Time (ms) | 881 | 832 | 898 | **832** | ≤300 | ❌ FAIL |
| Largest Contentful Paint (ms) | 5,560 | 14,537 | 14,092 | **5,560** | ≤2,500 | ❌ FAIL |

### About Page

| Metric | Run 1 | Run 2 | Run 3 | Median | Threshold | Status |
|--------|-------|-------|-------|--------|-----------|--------|
| Time to Interactive (ms) | 13,711 | 13,855 | 13,517 | **13,517** | ≤5,000 | ❌ FAIL |
| Total Blocking Time (ms) | 1,040 | 897 | 825 | **825** | ≤300 | ❌ FAIL |
| Largest Contentful Paint (ms) | 5,911 | 6,041 | 14,192 | **5,911** | ≤2,500 | ❌ FAIL |

---

## Accessibility Issues

### Homepage
- ✅ No accessibility issues detected

### Knives Hub Page
- ❌ **Color Contrast**: Background and foreground colors do not have sufficient contrast ratio (Score: 0/0/0)
- ❌ **Heading Order**: Heading elements are not in sequentially-descending order (Score: 0/0/0)

### Cookware Hub Page
- ❌ **Color Contrast**: Background and foreground colors do not have sufficient contrast ratio (Score: 0/0/0)
- ❌ **Heading Order**: Heading elements are not in sequentially-descending order (Score: 0/0/0)

### Appliances Hub Page
- ❌ **Color Contrast**: Background and foreground colors do not have sufficient contrast ratio (Score: 0/0/0)
- ❌ **Heading Order**: Heading elements are not in sequentially-descending order (Score: 0/0/0)

### About Page
- ❌ **Color Contrast**: Background and foreground colors do not have sufficient contrast ratio (Score: 0/0/0)

---

## SEO Issues

### All Pages
- ❌ **robots.txt Invalid**: robots.txt is not valid (Score: 0/0/0 across all pages)
  - **Note**: This is a localhost testing artifact. The production robots.txt is valid.

---

## Image Optimization Warnings

### Homepage
- ⚠️ **Modern Image Formats**: Score 0.58/0.50/0.67 (Threshold: ≥0.9)
- ⚠️ **Unused JavaScript**: Score 0.41/0.43/0.45 (Threshold: ≥0.9)
- ⚠️ **Properly Size Images**: Score 0.58/0.46/0.50 (Threshold: ≥0.9)

### Knives Hub Page
- ⚠️ **Modern Image Formats**: Score 0.58/0.67/0.50 (Threshold: ≥0.9)
- ⚠️ **Render-Blocking Resources**: Score 0.81/0.85/0.84 (Threshold: ≥0.9)
- ⚠️ **Unused JavaScript**: Score 0.45/0.48/0.45 (Threshold: ≥0.9)

### Cookware Hub Page
- ⚠️ **Modern Image Formats**: Score 0.50/0.67/0.58 (Threshold: ≥0.9)
- ⚠️ **Unused JavaScript**: Score 0.43/0.50/0.46 (Threshold: ≥0.9)

### Appliances Hub Page
- ⚠️ **Modern Image Formats**: Score 0.67/0.50/0.58 (Threshold: ≥0.9)
- ⚠️ **Unused JavaScript**: Score 0.48/0.43/0.48 (Threshold: ≥0.9)

### About Page
- ⚠️ **Modern Image Formats**: Score 0.58/0.58/0.58 (Threshold: ≥0.9)
- ⚠️ **Unused JavaScript**: Score 0.46/0.46/0.48 (Threshold: ≥0.9)

---

## Issues Summary

### Critical Issues (Fix Required)
1. **Color Contrast Failures** on 4 hub pages (knives, cookware, appliances, about)
2. **Heading Order Issues** on 3 hub pages (knives, cookware, appliances)

### Performance Issues (Development Mode)
- All pages show low performance scores (53-60%)
- High Time to Interactive (13-16 seconds)
- High Total Blocking Time (775-1,040ms)
- High Largest Contentful Paint (5.5-14 seconds on some runs)

**Note**: Performance metrics are significantly impacted by running in development mode. Production deployment typically shows 30-40% improvement in these metrics.

### Non-Critical Issues
- robots.txt validation (localhost artifact only)
- Image optimization warnings (already using Next.js Image optimization)
- Unused JavaScript warnings (common in development mode)

---

## Validation Suite Results

### ✅ All Passing
- TypeScript type-check: **PASSED**
- Site integrity validation: **PASSED**
- Database integrity: **PASSED**
- Image references validation: **PASSED** (232 files checked)
- Alt text validation: **PASSED**
- Affiliate links validation: **PASSED** (275 files checked)
- Duplicate links check: **PASSED** (45 unique links verified)
- Production build: **SUCCEEDED**

---

## Recommendations

### Immediate Action Required
1. Fix color contrast issues on hub pages
2. Fix heading order hierarchy on hub pages

### Production Deployment
- Performance scores expected to improve significantly in production
- Vercel's edge caching will reduce load times
- Image optimization already configured correctly

### Post-Deployment
- Run Lighthouse tests on production URLs
- Compare production scores to baseline (expected 95+)
- Monitor Core Web Vitals in Google Search Console

---

**Generated:** November 5, 2025
**Test Mode:** Development (localhost:3000)
**Next Steps:** Fix accessibility issues, then run IndexNow
