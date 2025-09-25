// Service Worker for Chef Approved Tools
const CACHE_NAME = 'chef-approved-tools-v1'
const STATIC_CACHE = `${CACHE_NAME}-static`
const DYNAMIC_CACHE = `${CACHE_NAME}-dynamic`

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/offline.html'
]

// Cache strategies
const CACHE_STRATEGIES = {
  images: 'cache-first',
  api: 'network-first', 
  pages: 'stale-while-revalidate',
  static: 'cache-first'
}

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static files...')
        return cache.addAll(STATIC_FILES)
      })
      .then(() => {
        return self.skipWaiting()
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName.startsWith('chef-approved-tools-') && 
                     cacheName !== STATIC_CACHE && 
                     cacheName !== DYNAMIC_CACHE
            })
            .map((cacheName) => {
              console.log('Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            })
        )
      })
      .then(() => {
        return self.clients.claim()
      })
  )
})

// Fetch event - handle requests
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  
  // Only handle HTTP/HTTPS requests
  if (!request.url.startsWith('http')) {
    return
  }

  // Handle different types of requests
  if (isImageRequest(request)) {
    event.respondWith(handleImageRequest(request))
  } else if (isApiRequest(request)) {
    event.respondWith(handleApiRequest(request))
  } else if (isPageRequest(request)) {
    event.respondWith(handlePageRequest(request))
  } else {
    event.respondWith(handleStaticRequest(request))
  }
})

// Request type helpers
function isImageRequest(request) {
  return request.destination === 'image' || 
         request.url.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/i)
}

function isApiRequest(request) {
  return request.url.includes('/api/') || 
         request.url.includes('amazon-adsystem.com') ||
         request.url.includes('googleapis.com')
}

function isPageRequest(request) {
  return request.mode === 'navigate'
}

// Cache-first strategy for images
async function handleImageRequest(request) {
  try {
    const cacheResponse = await caches.match(request)
    if (cacheResponse) {
      return cacheResponse
    }

    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log('Image request failed:', error)
    // Return placeholder or cached version
    return new Response('', { status: 404 })
  }
}

// Network-first strategy for API requests  
async function handleApiRequest(request) {
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      // Cache successful API responses briefly
      const cache = await caches.open(DYNAMIC_CACHE)
      const clonedResponse = networkResponse.clone()
      
      // Set a short expiration for API responses
      const headers = new Headers(clonedResponse.headers)
      headers.set('sw-cache-timestamp', Date.now().toString())
      
      const responseToCache = new Response(clonedResponse.body, {
        status: clonedResponse.status,
        statusText: clonedResponse.statusText,
        headers: headers
      })
      
      cache.put(request, responseToCache)
    }
    
    return networkResponse
  } catch (error) {
    console.log('API request failed, trying cache:', error)
    
    const cacheResponse = await caches.match(request)
    if (cacheResponse) {
      // Check if cached response is still fresh (5 minutes)
      const cacheTimestamp = cacheResponse.headers.get('sw-cache-timestamp')
      if (cacheTimestamp) {
        const age = Date.now() - parseInt(cacheTimestamp)
        if (age < 5 * 60 * 1000) { // 5 minutes
          return cacheResponse
        }
      }
    }
    
    throw error
  }
}

// Stale-while-revalidate for pages
async function handlePageRequest(request) {
  const cache = await caches.open(DYNAMIC_CACHE)
  const cacheResponse = await caches.match(request)
  
  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone())
      }
      return networkResponse
    })
    .catch(() => {
      // Return offline page if available
      return caches.match('/offline.html')
    })
  
  return cacheResponse || fetchPromise
}

// Cache-first for static assets
async function handleStaticRequest(request) {
  const cacheResponse = await caches.match(request)
  if (cacheResponse) {
    return cacheResponse
  }
  
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    console.log('Static request failed:', error)
    throw error
  }
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'newsletter-signup') {
    event.waitUntil(sendPendingNewsletterSignups())
  }
})

// Handle pending newsletter signups
async function sendPendingNewsletterSignups() {
  const requests = await getStoredRequests('newsletter-signups')
  
  for (const request of requests) {
    try {
      await fetch('/api/newsletter-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request.data)
      })
      
      // Remove successful request
      await removeStoredRequest('newsletter-signups', request.id)
    } catch (error) {
      console.log('Failed to sync newsletter signup:', error)
    }
  }
}

// IndexedDB helpers for background sync
async function getStoredRequests(storeName) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('chef-approved-tools-sync', 1)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction([storeName], 'readonly')
      const store = transaction.objectStore(storeName)
      const getAllRequest = store.getAll()
      
      getAllRequest.onsuccess = () => resolve(getAllRequest.result)
      getAllRequest.onerror = () => reject(getAllRequest.error)
    }
    
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id' })
      }
    }
  })
}

async function removeStoredRequest(storeName, id) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('chef-approved-tools-sync', 1)
    
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const deleteRequest = store.delete(id)
      
      deleteRequest.onsuccess = () => resolve()
      deleteRequest.onerror = () => reject(deleteRequest.error)
    }
  })
}

// Push notification handling
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New kitchen tools available!',
    icon: '/icon-192.png',
    badge: '/badge-72.png',
    data: {
      url: '/'
    },
    actions: [
      {
        action: 'view',
        title: 'View Products'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ]
  }
  
  event.waitUntil(
    self.registration.showNotification('Chef Approved Tools', options)
  )
})

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  
  if (event.action === 'view' || !event.action) {
    event.waitUntil(
      self.clients.openWindow(event.notification.data.url || '/')
    )
  }
})