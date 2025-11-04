'use client'

import { useEffect } from 'react'
import { trackScrollDepth } from '@/lib/tracking'

export default function ScrollTracker() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    let maxScrollPercentage = 0
    const thresholds = [25, 50, 75, 90, 100]
    let hasTracked = new Set<number>()
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY
          const documentHeight = document.documentElement.scrollHeight - window.innerHeight
          const scrollPercentage = Math.round((scrollTop / documentHeight) * 100)

          if (scrollPercentage > maxScrollPercentage) {
            maxScrollPercentage = scrollPercentage

            thresholds.forEach(threshold => {
              if (scrollPercentage >= threshold && !hasTracked.has(threshold)) {
                hasTracked.add(threshold)
                trackScrollDepth(threshold, window.location.pathname)
              }
            })
          }

          ticking = false
        })

        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return null
}