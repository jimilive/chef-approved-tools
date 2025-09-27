// Service Worker for Chef Approved Tools
// Optimized caching strategy for performance

const CACHE_NAME = 'chef-approved-tools-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Files to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/fonts/inter-latin-400-normal.woff2',
  '/fonts/inter-latin-600-normal.woff2',
  '/fonts/inter-latin-700-normal.woff2',
  '/logo.png'
];

// Cache strategies by route
const CACHE_STRATEGIES = {
  static: {
    pattern: /\.(woff2?|ttf|eot|css|js|png|jpg|jpeg|webp|avif|svg|ico)$/,
    strategy: 'CacheFirst',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  },
  pages: {
    pattern: /\/(?:reviews|guides|about|methodology|glossary)/,
    strategy: 'StaleWhileRevalidate',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
  api: {
    pattern: /\/api\//,
    strategy: 'NetworkFirst',
    maxAge: 5 * 60 * 1000, // 5 minutes
  }
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('SW: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('SW: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip external requests
  if (url.origin !== self.location.origin) return;

  // Determine cache strategy
  let strategy = 'NetworkFirst';
  let cacheName = DYNAMIC_CACHE;
  let maxAge = 60 * 60 * 1000; // 1 hour default

  // Check patterns
  for (const [name, config] of Object.entries(CACHE_STRATEGIES)) {
    if (config.pattern.test(url.pathname)) {
      strategy = config.strategy;
      maxAge = config.maxAge;
      if (name === 'static') {
        cacheName = STATIC_CACHE;
      }
      break;
    }
  }

  event.respondWith(
    handleRequest(request, strategy, cacheName, maxAge)
  );
});

// Cache strategy implementations
async function handleRequest(request, strategy, cacheName, maxAge) {
  const cache = await caches.open(cacheName);

  switch (strategy) {
    case 'CacheFirst':
      return cacheFirst(request, cache, maxAge);
    case 'NetworkFirst':
      return networkFirst(request, cache, maxAge);
    case 'StaleWhileRevalidate':
      return staleWhileRevalidate(request, cache, maxAge);
    default:
      return fetch(request);
  }
}

async function cacheFirst(request, cache, maxAge) {
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    // Check if cached response is still fresh
    const cacheTime = new Date(cachedResponse.headers.get('sw-cache-time') || 0);
    const now = new Date();

    if (now - cacheTime < maxAge) {
      return cachedResponse;
    }
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const responseToCache = networkResponse.clone();
      responseToCache.headers.set('sw-cache-time', new Date().toISOString());
      cache.put(request, responseToCache);
    }
    return networkResponse;
  } catch {
    // Return cached response if available, otherwise let the request fail naturally
    if (cachedResponse) {
      return cachedResponse;
    }
    throw new Error('Network unavailable and no cached response');
  }
}

async function networkFirst(request, cache, maxAge) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const responseToCache = networkResponse.clone();
      responseToCache.headers.set('sw-cache-time', new Date().toISOString());
      cache.put(request, responseToCache);
    }
    return networkResponse;
  } catch {
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    // Let the request fail naturally instead of returning "Offline"
    throw new Error('Network unavailable and no cached response');
  }
}

async function staleWhileRevalidate(request, cache, maxAge) {
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      const responseToCache = networkResponse.clone();
      responseToCache.headers.set('sw-cache-time', new Date().toISOString());
      cache.put(request, responseToCache);
    }
    return networkResponse;
  }).catch(() => {
    // Network failed, return cached response if available
    return cachedResponse;
  });

  // Return cached response immediately if available, otherwise wait for network
  return cachedResponse || fetchPromise;
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(handleBackgroundSync());
  }
});

async function handleBackgroundSync() {
  // Handle any queued actions when network becomes available
  console.log('SW: Background sync triggered');
}