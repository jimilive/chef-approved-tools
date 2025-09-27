// Service Worker registration and management

export function registerServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.log('Service Worker not supported');
    return;
  }

  // Only register in production
  if (process.env.NODE_ENV !== 'production') {
    console.log('Service Worker disabled in development');
    return;
  }

  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });

      console.log('SW: Service Worker registered successfully');

      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New version available
              console.log('SW: New version available');
              showUpdateNotification();
            }
          });
        }
      });

      // Handle controller change
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        // Refresh page when new service worker takes control
        window.location.reload();
      });

    } catch (error) {
      console.error('SW: Service Worker registration failed:', error);
    }
  });
}

function showUpdateNotification() {
  // Simple update notification - you can customize this
  if (confirm('A new version is available. Would you like to update?')) {
    // Force refresh to get new version
    window.location.reload();
  }
}

// Check if page was served from cache
export function checkCacheStatus() {
  if (typeof window === 'undefined') return;

  const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

  if (navigationEntry) {
    const cacheHit = navigationEntry.transferSize === 0 && navigationEntry.decodedBodySize > 0;

    if (cacheHit) {
      console.log('Page served from cache');
    } else {
      console.log('Page served from network');
    }
  }
}

// Prefetch critical pages
export function prefetchCriticalPages() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

  const criticalPages = [
    '/reviews',
    '/methodology',
    '/glossary'
  ];

  criticalPages.forEach(page => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = page;
    document.head.appendChild(link);
  });
}

// Performance monitoring integration
export function trackCachePerformance() {
  if (typeof window === 'undefined') return;

  // Monitor cache hits/misses
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.name.includes('cache')) {
        console.log('Cache performance:', entry);
      }
    });
  });

  try {
    observer.observe({ entryTypes: ['resource'] });
  } catch (e) {
    console.warn('Performance observer not supported');
  }
}