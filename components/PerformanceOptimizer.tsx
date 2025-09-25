'use client'
import React, { useEffect, useCallback, useState } from 'react'
import { trackScrollDepth } from '@/lib/analytics'

// Lazy Loading Hook
export function useLazyLoading(ref: React.RefObject<HTMLElement>, options?: IntersectionObserverInit) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [wasIntersecting, setWasIntersecting] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
        if (entry.isIntersecting) {
          setWasIntersecting(true)
        }
      },
      {
        rootMargin: '100px 0px',
        threshold: 0.1,
        ...options
      }
    )

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [ref, options])

  return { isIntersecting, wasIntersecting }
}

// Performance Monitor Component
export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Initialize scroll depth tracking
    const cleanup = trackScrollDepth()

    // Monitor Core Web Vitals
    const measureWebVitals = () => {
      // Measure First Contentful Paint
      const paintEntries = performance.getEntriesByType('paint')
      const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint')

      if (fcp && window.gtag) {
        window.gtag('event', 'timing_complete', {
          name: 'first_contentful_paint',
          value: Math.round(fcp.startTime)
        })
      }

      // Measure Largest Contentful Paint
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]

          if (window.gtag) {
            window.gtag('event', 'timing_complete', {
              name: 'largest_contentful_paint',
              value: Math.round(lastEntry.startTime)
            })
          }
        })

        try {
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
        } catch (e) {
          // LCP not supported
        }

        // Measure Cumulative Layout Shift
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0
          for (const entry of list.getEntries() as any[]) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value
            }
          }

          if (window.gtag && clsValue > 0) {
            window.gtag('event', 'web_vitals', {
              name: 'cumulative_layout_shift',
              value: Math.round(clsValue * 1000)
            })
          }
        })

        try {
          clsObserver.observe({ entryTypes: ['layout-shift'] })
        } catch (e) {
          // CLS not supported
        }
      }
    }

    // Run measurements after page load
    if (document.readyState === 'complete') {
      setTimeout(measureWebVitals, 0)
    } else {
      window.addEventListener('load', measureWebVitals)
    }

    return cleanup
  }, [])

  return null
}

// Image Preloader
export function ImagePreloader({ images }: { images: string[] }) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const preloadImages = () => {
      images.forEach(src => {
        const img = new Image()
        img.src = src
      })
    }

    // Preload images when browser is idle
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(preloadImages)
    } else {
      setTimeout(preloadImages, 1000)
    }
  }, [images])

  return null
}

// Resource Hints Component
export function ResourceHints() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Add resource hints dynamically based on user behavior
    const addResourceHint = (href: string, rel: 'dns-prefetch' | 'preconnect' | 'prefetch') => {
      const existing = document.querySelector(`link[href="${href}"]`)
      if (existing) return

      const link = document.createElement('link')
      link.rel = rel
      link.href = href
      document.head.appendChild(link)
    }

    // Preconnect to likely third-party domains
    const domains = [
      'https://images.unsplash.com',
      'https://m.media-amazon.com',
      'https://ws-na.amazon-adsystem.com'
    ]

    domains.forEach(domain => {
      addResourceHint(domain, 'preconnect')
    })
  }, [])

  return null
}

// Critical Resource Optimizer
export function CriticalResourceOptimizer({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Delay non-critical rendering until after critical resources
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return isLoaded ? <>{children}</> : null
}

// Intersection Observer Hook for Analytics
export function useViewportTracking(elementRef: React.RefObject<HTMLElement>, trackingId: string) {
  const [hasBeenViewed, setHasBeenViewed] = useState(false)

  useEffect(() => {
    if (!elementRef.current || hasBeenViewed) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenViewed) {
          setHasBeenViewed(true)

          // Track viewport entry
          if (window.gtag) {
            window.gtag('event', 'viewport_entry', {
              event_category: 'engagement',
              event_label: trackingId
            })
          }
        }
      },
      {
        threshold: 0.5, // 50% visible
        rootMargin: '0px 0px -10% 0px'
      }
    )

    observer.observe(elementRef.current)

    return () => observer.disconnect()
  }, [elementRef, trackingId, hasBeenViewed])

  return hasBeenViewed
}

// Error Boundary for Performance
export class PerformanceErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false
      })
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong.</div>
    }

    return this.props.children
  }
}

// Optimize Font Loading
export function FontOptimizer() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('fonts' in document)) return

    // Preload critical fonts
    const fonts = [
      { family: 'Inter', weight: '400' },
      { family: 'Inter', weight: '600' },
      { family: 'Inter', weight: '700' }
    ]

    fonts.forEach(font => {
      const fontFace = new FontFace(
        font.family,
        `url('/fonts/${font.family.toLowerCase()}-${font.weight}.woff2')`,
        { weight: font.weight }
      )

      fontFace.load().then(loadedFont => {
        document.fonts.add(loadedFont)
      }).catch(error => {
        console.warn('Font loading failed:', error)
      })
    })
  }, [])

  return null
}

// Connection Speed Detector
export function useConnectionSpeed() {
  const [connectionSpeed, setConnectionSpeed] = useState<'slow' | 'fast'>('fast')

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check if Network Information API is available
    if ('connection' in navigator) {
      const connection = (navigator as any).connection

      const updateConnection = () => {
        const effectiveType = connection.effectiveType
        setConnectionSpeed(['slow-2g', '2g'].includes(effectiveType) ? 'slow' : 'fast')
      }

      updateConnection()
      connection.addEventListener('change', updateConnection)

      return () => connection.removeEventListener('change', updateConnection)
    }

    // Fallback: measure download speed
    const measureSpeed = () => {
      const startTime = Date.now()
      const image = new Image()

      image.onload = () => {
        const duration = Date.now() - startTime
        setConnectionSpeed(duration > 1000 ? 'slow' : 'fast')
      }

      image.src = '/images/speed-test.jpg?t=' + Date.now()
    }

    measureSpeed()
  }, [])

  return connectionSpeed
}