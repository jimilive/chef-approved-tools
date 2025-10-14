# Performance Benchmarks - Chef Approved Tools

This document tracks Lighthouse performance scores over time to monitor site performance and identify regressions.

## Current Benchmark

### October 14, 2025 - Baseline

**Test Environment:**
- Pages tested: Homepage and multiple review pages
- Lighthouse version: Latest
- Network throttling: Simulated 4G (Mobile) / Desktop broadband
- Device: Emulated Moto G4 (Mobile) / Desktop

**Mobile Scores:**
```
Performance:     96/100 ⭐⭐⭐⭐⭐
Accessibility:  100/100 ✅
Best Practices: 100/100 ✅
SEO:            100/100 ✅
```

**Desktop Scores:**
```
Performance:    100/100 ✅
Accessibility:   96/100 ⭐⭐⭐⭐⭐
Best Practices: 100/100 ✅
SEO:            100/100 ✅
```

**Key Metrics:**
- Mobile Performance: 96 (Excellent - above 90 threshold)
- Desktop Performance: 100 (Perfect score)
- All SEO metrics at 100
- All Best Practices at 100
- Strong accessibility scores (96-100)

**Analysis:**
- Exceptional baseline performance across all categories
- Mobile performance at 96 is very strong (90+ is considered excellent)
- Desktop achieving perfect 100 performance score
- Zero SEO or Best Practices issues
- Site is well-optimized for Core Web Vitals

**Optimizations Applied:**
- Next.js 14 App Router with automatic code splitting
- Image optimization with next/image component
- WebP image format conversion
- Service Worker for offline functionality
- Efficient bundle size management
- Proper caching strategies
- Optimized CSS and JavaScript delivery

## Historical Benchmarks

### [Date] - [Version/Release Name]
*(Add new benchmark entries here as performance is retested)*

---

## Performance Targets

**Minimum Acceptable Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 100
- SEO: 100

**Current Status:** ✅ All targets exceeded

**Monitoring Plan:**
- Run Lighthouse audits monthly
- Test after major feature additions
- Monitor Core Web Vitals in Google Search Console
- Track real user metrics via GA4

---

## Core Web Vitals Targets

**Google's Thresholds for "Good" Performance:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

**Current Status:** Monitor via Google Search Console and GA4

---

## How to Run Lighthouse Tests

**Via Chrome DevTools:**
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select categories to test
4. Choose device (Mobile/Desktop)
5. Click "Analyze page load"

**Via Command Line:**
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run mobile test
lighthouse https://www.chefapprovedtools.com --output html --output-path ./reports/lighthouse-mobile-report.html --preset=mobile

# Run desktop test
lighthouse https://www.chefapprovedtools.com --output html --output-path ./reports/lighthouse-desktop-report.html --preset=desktop
```

**Via npm script (if configured):**
```bash
npm run lighthouse
```

---

**Last Updated:** October 14, 2025
