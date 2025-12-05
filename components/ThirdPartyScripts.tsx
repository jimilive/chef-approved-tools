'use client'

import { useEffect } from 'react'

/**
 * ThirdPartyScripts
 *
 * Defers loading of third-party analytics and tracking scripts
 * to improve initial page load performance (LCP, FCP)
 *
 * Loading strategy:
 * - Waits for user interaction OR timeout
 * - Mobile: 5 second delay (slower networks)
 * - Desktop: 3 second delay
 * - Loads immediately on any user interaction
 *
 * Note: GTM loads GA4 automatically via GTM configuration
 * We no longer load GA4 directly to avoid duplicate tracking
 *
 * IMPORTANT: The noscript fallback for GTM is in app/layout.tsx
 * to avoid hydration mismatches (this component uses ssr: false)
 */
export default function ThirdPartyScripts() {
  useEffect(() => {
    let gtmLoaded = false

    // Detect mobile for longer delay
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
    const delay = isMobile ? 5000 : 3000

    // Load Google Tag Manager
    const loadGTM = () => {
      if (!gtmLoaded) {
        gtmLoaded = true
        ;(function(w: any, d: any, s: any, l: any, i: any) {
          w[l] = w[l] || []
          w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
          const f = d.getElementsByTagName(s)[0]
          const j = d.createElement(s)
          const dl = l != 'dataLayer' ? '&l=' + l : ''
          j.async = true
          j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
          f.parentNode.insertBefore(j, f)
        })(window, document, 'script', 'dataLayer', 'GTM-PX8GPHKF')
      }
    }

    // Event listeners for immediate loading on interaction
    const interactionEvents = ['mousedown', 'touchstart', 'keydown', 'scroll']
    const handleInteraction = () => {
      loadGTM()
      // Remove listeners after first interaction
      interactionEvents.forEach(event => {
        document.removeEventListener(event, handleInteraction)
      })
    }

    // Add event listeners
    interactionEvents.forEach(event => {
      document.addEventListener(event, handleInteraction, { once: true, passive: true })
    })

    // Fallback: load after delay if no interaction
    const timeoutId = setTimeout(loadGTM, delay)

    // Cleanup
    return () => {
      clearTimeout(timeoutId)
      interactionEvents.forEach(event => {
        document.removeEventListener(event, handleInteraction)
      })
    }
  }, [])

  // Return null - no DOM rendering needed for this effect-only component
  // The noscript GTM fallback is in app/layout.tsx to avoid hydration issues
  return null
}
