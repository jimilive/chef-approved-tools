// Performance monitoring and optimization utilities

// Core Web Vitals monitoring
export function measureWebVitals() {
  if (typeof window === 'undefined') return

  // Measure Cumulative Layout Shift (CLS)
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
          console.log('Layout shift detected:', entry)
          
          // Send to analytics
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              event_category: 'Performance',
              event_label: 'CLS',
              value: Math.round((entry as any).value * 1000)
            })
          }
        }
      }
    })
    
    observer.observe({ entryTypes: ['layout-shift'] })
  }

  // Measure Largest Contentful Paint (LCP)
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1] as any
      
      console.log('LCP detected:', lastEntry.startTime)
      
      if (window.gtag) {
        window.gtag('event', 'web_vitals', {
          event_category: 'Performance',
          event_label: 'LCP',
          value: Math.round(lastEntry.startTime)
        })
      }
    })
    
    observer.observe({ entryTypes: ['largest-contentful-paint'] })
  }

  // Measure First Input Delay (FID)
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fid = (entry as any).processingStart - entry.startTime
        console.log('FID detected:', fid)
        
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Performance',
            event_label: 'FID',
            value: Math.round(fid)
          })
        }
      }
    })
    
    observer.observe({ entryTypes: ['first-input'] })
  }
}

// Image loading optimization
export function optimizeImageLoading() {
  if (typeof window === 'undefined') return

  // Lazy load images with Intersection Observer
  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.removeAttribute('data-src')
          }
          observer.unobserve(img)
        }
      })
    },
    { rootMargin: '50px 0px' }
  )

  // Observe all images with data-src
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img)
  })
}

// Resource hints and preloading
export function addResourceHints() {
  if (typeof document === 'undefined') return

  const head = document.head

  // Preconnect to critical domains
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://images.unsplash.com',
    'https://m.media-amazon.com',
    'https://www.googletagmanager.com'
  ]

  preconnectDomains.forEach(domain => {
    if (!document.querySelector(`link[href="${domain}"]`)) {
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = domain
      link.crossOrigin = 'anonymous'
      head.appendChild(link)
    }
  })

  // DNS prefetch for less critical domains
  const dnsPrefetchDomains = [
    'https://www.google-analytics.com',
    'https://connect.facebook.net',
    'https://static.ads-twitter.com'
  ]

  dnsPrefetchDomains.forEach(domain => {
    if (!document.querySelector(`link[href="${domain}"]`)) {
      const link = document.createElement('link')
      link.rel = 'dns-prefetch'
      link.href = domain
      head.appendChild(link)
    }
  })
}

// Bundle analysis and chunk optimization
export function logBundleInfo() {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return

  // Log loaded chunks
  const scripts = Array.from(document.querySelectorAll('script[src*="_next/static"]'))
  console.log(`Loaded ${scripts.length} JavaScript chunks:`)
  scripts.forEach(script => {
    const src = (script as HTMLScriptElement).src
    console.log(`- ${src.split('/').pop()}`)
  })

  // Monitor chunk loading
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name.includes('_next/static')) {
          console.log(`Chunk loaded: ${entry.name} (${Math.round(entry.duration)}ms)`)
        }
      }
    })
    
    observer.observe({ entryTypes: ['resource'] })
  }
}

// Service Worker registration for caching
export function registerServiceWorker() {
  if (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    process.env.NODE_ENV === 'production'
  ) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration)
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError)
        })
    })
  }
}

// Critical CSS inlining check
export function checkCriticalCSS() {
  if (typeof window === 'undefined') return

  const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
  const inlineStyles = Array.from(document.querySelectorAll('style'))
  
  console.log(`Found ${stylesheets.length} external stylesheets and ${inlineStyles.length} inline styles`)
  
  // Check for render-blocking stylesheets
  stylesheets.forEach(link => {
    const href = (link as HTMLLinkElement).href
    if (!href.includes('fonts.googleapis.com')) {
      console.warn('Potentially render-blocking stylesheet:', href)
    }
  })
}

// Performance budget monitoring
export function monitorPerformanceBudget() {
  if (typeof window === 'undefined') return

  const budget = {
    maxJSSize: 500 * 1024, // 500KB
    maxCSSSize: 100 * 1024, // 100KB
    maxImageSize: 1000 * 1024, // 1MB per image
    maxFonts: 4
  }

  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      let totalJSSize = 0
      let totalCSSSize = 0
      let fontCount = 0

      for (const entry of list.getEntries()) {
        const resource = entry as PerformanceResourceTiming
        
        if (resource.name.includes('.js')) {
          totalJSSize += resource.transferSize || 0
        } else if (resource.name.includes('.css')) {
          totalCSSSize += resource.transferSize || 0
        } else if (resource.name.includes('fonts.') || resource.name.includes('.woff')) {
          fontCount++
        } else if (resource.name.match(/\.(jpg|jpeg|png|webp|avif)$/)) {
          const imageSize = resource.transferSize || 0
          if (imageSize > budget.maxImageSize) {
            console.warn(`Image exceeds budget: ${resource.name} (${Math.round(imageSize / 1024)}KB)`)
          }
        }
      }

      // Check budgets
      if (totalJSSize > budget.maxJSSize) {
        console.warn(`JavaScript budget exceeded: ${Math.round(totalJSSize / 1024)}KB / ${Math.round(budget.maxJSSize / 1024)}KB`)
      }
      
      if (totalCSSSize > budget.maxCSSSize) {
        console.warn(`CSS budget exceeded: ${Math.round(totalCSSSize / 1024)}KB / ${Math.round(budget.maxCSSSize / 1024)}KB`)
      }
      
      if (fontCount > budget.maxFonts) {
        console.warn(`Font budget exceeded: ${fontCount} / ${budget.maxFonts} fonts`)
      }
    })
    
    observer.observe({ entryTypes: ['resource'] })
  }
}

// Initialize all performance optimizations
export function initializePerformanceOptimizations() {
  measureWebVitals()
  addResourceHints()
  optimizeImageLoading()
  registerServiceWorker()
  
  if (process.env.NODE_ENV === 'development') {
    logBundleInfo()
    checkCriticalCSS()
    monitorPerformanceBudget()
  }
}