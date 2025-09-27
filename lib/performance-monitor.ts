// Performance monitoring and Core Web Vitals tracking

export interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeMetrics();
    }
  }

  private initializeMetrics() {
    // Largest Contentful Paint
    this.measureLCP();

    // First Input Delay
    this.measureFID();

    // Cumulative Layout Shift
    this.measureCLS();

    // First Contentful Paint
    this.measureFCP();

    // Time to First Byte
    this.measureTTFB();
  }

  private measureLCP() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        this.metrics.lcp = lastEntry.startTime;

        // Send to analytics if needed
        this.reportMetric('LCP', lastEntry.startTime);
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('LCP measurement not supported');
    }
  }

  private measureFID() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          this.metrics.fid = entry.processingStart - entry.startTime;
          this.reportMetric('FID', entry.processingStart - entry.startTime);
        });
      });

      observer.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.warn('FID measurement not supported');
    }
  }

  private measureCLS() {
    try {
      let clsValue = 0;

      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();

        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });

        this.metrics.cls = clsValue;
        this.reportMetric('CLS', clsValue);
      });

      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('CLS measurement not supported');
    }
  }

  private measureFCP() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.fcp = entry.startTime;
            this.reportMetric('FCP', entry.startTime);
          }
        });
      });

      observer.observe({ entryTypes: ['paint'] });
    } catch (e) {
      console.warn('FCP measurement not supported');
    }
  }

  private measureTTFB() {
    try {
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
        this.metrics.ttfb = ttfb;
        this.reportMetric('TTFB', ttfb);
      }
    } catch (e) {
      console.warn('TTFB measurement failed');
    }
  }

  private reportMetric(name: string, value: number) {
    // Log for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`${name}: ${Math.round(value)}ms`);
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      // Google Analytics 4 event
      if (window.gtag) {
        window.gtag('event', 'web_vitals', {
          event_category: 'Performance',
          event_label: name,
          value: Math.round(value),
          custom_parameter_1: name,
          custom_parameter_2: value
        });
      }
    }
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }
}

// Initialize performance monitoring
export const performanceMonitor = new PerformanceMonitor();

// Utility function to get Core Web Vitals scores
export function getCoreWebVitalsScore(metrics: PerformanceMetrics) {
  const scores = {
    lcp: metrics.lcp ? (metrics.lcp <= 2500 ? 'good' : metrics.lcp <= 4000 ? 'needs-improvement' : 'poor') : 'unknown',
    fid: metrics.fid ? (metrics.fid <= 100 ? 'good' : metrics.fid <= 300 ? 'needs-improvement' : 'poor') : 'unknown',
    cls: metrics.cls ? (metrics.cls <= 0.1 ? 'good' : metrics.cls <= 0.25 ? 'needs-improvement' : 'poor') : 'unknown',
  };

  return scores;
}