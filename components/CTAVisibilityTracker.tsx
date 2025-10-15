'use client'

import { useEffect, useRef, useState } from 'react'

interface CTAVisibilityTrackerProps {
  ctaId: string // Unique identifier for this CTA
  position: 'above_fold' | 'mid_article' | 'final_cta' | 'comparison_table' | 'related_products' | 'sidebar'
  productSlug?: string
  merchant?: string
  children: React.ReactNode
}

/**
 * CTAVisibilityTracker
 *
 * Tracks CTA (Call-to-Action) visibility and engagement patterns
 * Helps answer: "Are people seeing CTAs but not clicking?"
 *
 * Tracks:
 * - When CTA becomes visible (impression)
 * - How long CTA is in viewport
 * - Number of times CTA is viewed
 * - Scroll depth when CTA first viewed
 * - Device type (mobile/desktop)
 *
 * Use this to optimize:
 * - CTA placement (above/below fold)
 * - CTA frequency (too many? too few?)
 * - Mobile vs desktop CTA strategy
 * - Content length before CTAs
 */
export default function CTAVisibilityTracker({
  ctaId,
  position,
  productSlug,
  merchant,
  children
}: CTAVisibilityTrackerProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const impressionTracked = useRef(false)
  const viewCount = useRef(0)
  const timeInView = useRef(0)
  const viewStartTime = useRef<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const getDeviceType = () => {
      if (typeof window === 'undefined') return 'desktop'
      const userAgent = navigator.userAgent.toLowerCase()
      if (/mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) {
        return 'mobile'
      }
      return 'desktop'
    }

    const getScrollDepth = () => {
      if (typeof window === 'undefined') return 0
      const scrollTop = window.scrollY
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      return Math.round((scrollTop / documentHeight) * 100)
    }

    const trackCTAImpression = (scrollDepth: number) => {
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'cta_impression',
          cta_id: ctaId,
          cta_position: position,
          product_slug: productSlug || 'unknown',
          merchant: merchant || 'unknown',
          scroll_depth_at_view: scrollDepth,
          device_type: getDeviceType(),
          view_number: viewCount.current,
          timestamp: new Date().toISOString()
        })

        console.log('CTA impression tracked:', {
          ctaId,
          position,
          scrollDepth,
          viewNumber: viewCount.current
        })
      }
    }

    const trackCTAEngagement = () => {
      if (typeof window !== 'undefined' && window.dataLayer && timeInView.current > 0) {
        window.dataLayer.push({
          event: 'cta_engagement',
          cta_id: ctaId,
          cta_position: position,
          product_slug: productSlug || 'unknown',
          merchant: merchant || 'unknown',
          time_in_view_seconds: Math.round(timeInView.current / 1000),
          view_count: viewCount.current,
          device_type: getDeviceType(),
          timestamp: new Date().toISOString()
        })
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            viewCount.current += 1
            viewStartTime.current = Date.now()

            // Track first impression
            if (!impressionTracked.current) {
              impressionTracked.current = true
              const scrollDepth = getScrollDepth()
              trackCTAImpression(scrollDepth)
            }
          } else {
            if (isVisible) {
              setIsVisible(false)

              // Calculate time in view
              if (viewStartTime.current) {
                const viewDuration = Date.now() - viewStartTime.current
                timeInView.current += viewDuration
                viewStartTime.current = null
              }
            }
          }
        })
      },
      {
        threshold: [0.5], // Track when 50% visible
        rootMargin: '0px'
      }
    )

    observer.observe(element)

    // Track final engagement on unmount
    return () => {
      if (viewStartTime.current) {
        const viewDuration = Date.now() - viewStartTime.current
        timeInView.current += viewDuration
      }
      trackCTAEngagement()
      observer.disconnect()
    }
  }, [ctaId, position, productSlug, merchant, isVisible])

  return (
    <div ref={elementRef} data-cta-id={ctaId} data-cta-position={position}>
      {children}
    </div>
  )
}
