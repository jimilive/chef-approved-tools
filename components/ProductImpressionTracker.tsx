'use client'

import { useEffect, useRef } from 'react'

interface ProductImpressionTrackerProps {
  productName: string
  productSlug: string
  category: string
  brand?: string
  price?: number
  position?: number
  listName?: string // e.g., "homepage_featured", "category_grid", "related_products"
  children: React.ReactNode
}

/**
 * ProductImpressionTracker
 *
 * Tracks when products become visible to users (impressions)
 * Uses Intersection Observer for accurate viewport visibility
 *
 * Provides insights on:
 * - Which products users see but don't click
 * - Product visibility vs click-through rates
 * - Scroll-through behavior patterns
 * - List position effectiveness
 */
export default function ProductImpressionTracker({
  productName,
  productSlug,
  category,
  brand,
  price,
  position,
  listName = 'product_list',
  children
}: ProductImpressionTrackerProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const impressionTracked = useRef(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element || impressionTracked.current) return

    // Get device type
    const getDeviceType = () => {
      if (typeof window === 'undefined') return 'desktop'
      const userAgent = navigator.userAgent.toLowerCase()
      if (/mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) {
        return 'mobile'
      }
      return 'desktop'
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Track impression when 50% of product is visible for at least 1 second
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5 && !impressionTracked.current) {
            setTimeout(() => {
              if (entry.isIntersecting && !impressionTracked.current) {
                impressionTracked.current = true

                // Push to dataLayer for GTM
                if (typeof window !== 'undefined' && window.dataLayer) {
                  window.dataLayer.push({
                    event: 'view_item',
                    ecommerce: {
                      items: [{
                        item_name: productName,
                        item_id: productSlug,
                        item_category: category,
                        item_brand: brand || 'Unknown',
                        price: price || 0,
                        index: position || 0,
                        item_list_name: listName
                      }]
                    },
                    // Additional context for analysis
                    device_type: getDeviceType(),
                    content_type: 'product_card',
                    timestamp: new Date().toISOString()
                  })

                  console.log('Product impression tracked:', {
                    productName,
                    productSlug,
                    category,
                    listName,
                    position
                  })
                }
              }
            }, 1000) // Wait 1 second to ensure user is actually viewing
          }
        })
      },
      {
        threshold: [0.5], // Track when 50% visible
        rootMargin: '0px'
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [productName, productSlug, category, brand, price, position, listName])

  return (
    <div ref={elementRef} style={{ minHeight: '1px' }}>
      {children}
    </div>
  )
}
