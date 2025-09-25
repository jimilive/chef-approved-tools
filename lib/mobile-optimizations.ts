// Mobile-specific performance optimizations

export function isMobile(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export function isTouch(): boolean {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

// Optimize images for mobile
export function getMobileImageUrl(url: string, width?: number): string {
  if (!isMobile()) return url
  
  // For Next.js Image component, add mobile-specific parameters
  const mobileWidth = width || (window.innerWidth > 640 ? 640 : 320)
  const pixelRatio = window.devicePixelRatio || 1
  const targetWidth = Math.round(mobileWidth * Math.min(pixelRatio, 2)) // Cap at 2x
  
  // If it's already a Next.js optimized image, append mobile params
  if (url.includes('/_next/image')) {
    const urlObj = new URL(url, window.location.origin)
    urlObj.searchParams.set('w', targetWidth.toString())
    urlObj.searchParams.set('q', '75') // Slightly lower quality for mobile
    return urlObj.toString()
  }
  
  return url
}

// Reduce animations on mobile for better performance
export function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return false
  
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  return mediaQuery.matches || isMobile()
}

// Optimize touch target sizes
export function getTouchTargetSize(baseSize: string): string {
  if (!isTouch()) return baseSize
  
  // Ensure minimum 44px touch targets on mobile
  const minTouchSize = 44
  const currentSize = parseInt(baseSize)
  
  if (currentSize < minTouchSize) {
    return `${minTouchSize}px`
  }
  
  return baseSize
}

// Lazy load content for mobile
export function setupMobileLazyLoading() {
  if (typeof window === 'undefined' || !isMobile()) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement
          
          // Load images
          const img = element.querySelector('img[data-mobile-src]') as HTMLImageElement
          if (img) {
            img.src = img.dataset.mobileSrc!
            img.removeAttribute('data-mobile-src')
          }
          
          // Load content
          if (element.dataset.mobileContent) {
            element.innerHTML = element.dataset.mobileContent
            element.removeAttribute('data-mobile-content')
          }
          
          observer.unobserve(element)
        }
      })
    },
    { 
      rootMargin: '100px', // Load 100px before entering viewport
      threshold: 0.1 
    }
  )

  // Observe all lazy-loadable elements
  document.querySelectorAll('[data-mobile-lazy]').forEach(el => {
    observer.observe(el)
  })
}

// Optimize scrolling performance
export function optimizeMobileScrolling() {
  if (typeof window === 'undefined' || !isMobile()) return

  let ticking = false

  function updateScrolling() {
    // Add momentum scrolling for iOS
    (document.body.style as any).webkitOverflowScrolling = 'touch'
    
    // Optimize scroll events
    const scrollElements = document.querySelectorAll('[data-scroll-optimize]')
    scrollElements.forEach(element => {
      (element as HTMLElement).style.transform = 'translateZ(0)'
      ;(element as HTMLElement).style.willChange = 'transform'
    })
    
    ticking = false
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateScrolling)
      ticking = true
    }
  }

  window.addEventListener('scroll', requestTick, { passive: true })
}

// Reduce JavaScript execution on mobile
export function optimizeMobileJS() {
  if (!isMobile()) return

  // Defer non-critical scripts
  const nonCriticalScripts = document.querySelectorAll('script[data-mobile-defer]')
  nonCriticalScripts.forEach(script => {
    script.setAttribute('defer', 'true')
  })

  // Reduce animation frame rates
  const originalRAF = window.requestAnimationFrame
  let lastTime = 0
  const targetFPS = 30 // Reduce from 60fps to 30fps on mobile

  window.requestAnimationFrame = function(callback: FrameRequestCallback): number {
    const now = Date.now()
    const elapsed = now - lastTime
    const targetElapsed = 1000 / targetFPS

    if (elapsed >= targetElapsed) {
      lastTime = now
      return originalRAF(callback)
    } else {
      const timeoutId = setTimeout(() => {
        window.requestAnimationFrame(callback)
      }, targetElapsed - elapsed)
      return timeoutId as unknown as number
    }
  }
}

// Optimize fonts for mobile
export function optimizeMobileFonts() {
  if (typeof document === 'undefined' || !isMobile()) return

  // Use system fonts fallback on slower connections
  if ('connection' in navigator) {
    const connection = (navigator as any).connection
    if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
      document.documentElement.style.setProperty(
        '--font-family-primary', 
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      )
    }
  }

  // Preload critical fonts
  const criticalFonts = [
    '/fonts/inter-latin-400-normal.woff2',
    '/fonts/inter-latin-600-normal.woff2'
  ]

  criticalFonts.forEach(font => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'font'
    link.type = 'font/woff2'
    link.crossOrigin = 'anonymous'
    link.href = font
    document.head.appendChild(link)
  })
}

// Battery-aware optimizations
export function optimizeForBattery() {
  if (typeof navigator === 'undefined' || !('getBattery' in navigator)) return

  ;(navigator as any).getBattery().then((battery: any) => {
    function updateBatteryOptimizations() {
      const isLowBattery = battery.level < 0.2
      const isCharging = battery.charging

      if (isLowBattery && !isCharging) {
        // Reduce animations and effects
        document.body.classList.add('low-battery-mode')
        
        // Disable non-essential features
        const nonEssentialElements = document.querySelectorAll('[data-battery-optional]')
        nonEssentialElements.forEach(el => {
          (el as HTMLElement).style.display = 'none'
        })

        // Reduce update frequency
        const reducedUpdateElements = document.querySelectorAll('[data-battery-reduce]')
        reducedUpdateElements.forEach(el => {
          el.setAttribute('data-update-interval', '5000') // 5s instead of 1s
        })
      } else {
        document.body.classList.remove('low-battery-mode')
      }
    }

    // Initial check
    updateBatteryOptimizations()

    // Listen for battery changes
    battery.addEventListener('chargingchange', updateBatteryOptimizations)
    battery.addEventListener('levelchange', updateBatteryOptimizations)
  })
}

// Network-aware loading
export function optimizeForNetwork() {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) return

  const connection = (navigator as any).connection

  function updateNetworkOptimizations() {
    const effectiveType = connection.effectiveType
    const saveData = connection.saveData

    if (saveData || effectiveType === 'slow-2g' || effectiveType === '2g') {
      // Enable data saver mode
      document.body.classList.add('data-saver-mode')
      
      // Disable auto-playing videos
      const videos = document.querySelectorAll('video[autoplay]')
      videos.forEach(video => {
        (video as HTMLVideoElement).removeAttribute('autoplay')
      })

      // Load smaller images
      const images = document.querySelectorAll('img[data-hq-src]')
      images.forEach(img => {
        const lowQualityImg = img.getAttribute('data-lq-src')
        if (lowQualityImg) {
          (img as HTMLImageElement).src = lowQualityImg
        }
      })

      // Defer non-critical CSS
      const nonCriticalCSS = document.querySelectorAll('link[data-non-critical]')
      nonCriticalCSS.forEach(link => {
        link.setAttribute('media', 'print')
        link.addEventListener('load', () => {
          link.setAttribute('media', 'all')
        })
      })
    } else {
      document.body.classList.remove('data-saver-mode')
    }
  }

  // Initial check
  updateNetworkOptimizations()

  // Listen for network changes
  connection.addEventListener('change', updateNetworkOptimizations)
}

// Initialize all mobile optimizations
export function initializeMobileOptimizations() {
  if (typeof window === 'undefined') return

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      runMobileOptimizations()
    })
  } else {
    runMobileOptimizations()
  }
}

function runMobileOptimizations() {
  setupMobileLazyLoading()
  optimizeMobileScrolling()
  optimizeMobileJS()
  optimizeMobileFonts()
  optimizeForBattery()
  optimizeForNetwork()
  
  console.log('Mobile optimizations initialized')
}

// CSS classes for mobile optimizations
export const MOBILE_CSS_CLASSES = `
.low-battery-mode * {
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
}

.data-saver-mode img {
  filter: contrast(1.1) brightness(1.1);
}

@media (max-width: 767px) {
  .mobile-hidden { display: none !important; }
  .mobile-full-width { width: 100% !important; }
  .mobile-text-center { text-align: center !important; }
  .mobile-no-animation * { 
    animation: none !important; 
    transition: none !important; 
  }
}

/* Touch-friendly sizing */
@media (pointer: coarse) {
  button, input, select, textarea {
    min-height: 44px;
    min-width: 44px;
  }
  
  a {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
  }
}
`