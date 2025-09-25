'use client'
import { useEffect } from 'react'
import { initializeMobileOptimizations, MOBILE_CSS_CLASSES } from '@/lib/mobile-optimizations'

export default function MobileOptimizationProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  useEffect(() => {
    // Initialize mobile optimizations
    initializeMobileOptimizations()

    // Add mobile-specific CSS
    const style = document.createElement('style')
    style.textContent = MOBILE_CSS_CLASSES
    document.head.appendChild(style)

    // Cleanup function
    return () => {
      // Remove the style element when component unmounts
      if (style.parentNode) {
        style.parentNode.removeChild(style)
      }
    }
  }, [])

  return <>{children}</>
}