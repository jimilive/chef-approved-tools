'use client'

import { useEffect } from 'react'
import Script from 'next/script'

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
 */
export default function ThirdPartyScripts() {
  useEffect(() => {
    let gtmLoaded = false
    let gaLoaded = false

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

    // Load Google Analytics 4
    const loadGA = () => {
      if (!gaLoaded && process.env.NEXT_PUBLIC_GA_TRACKING_ID) {
        gaLoaded = true

        // Initialize dataLayer
        window.dataLayer = window.dataLayer || []
        function gtag(...args: any[]) {
          window.dataLayer.push(args)
        }

        // Set default consent
        gtag('consent', 'default', {
          analytics_storage: 'denied',
          ad_storage: 'denied'
        })

        // Load GA script
        const script = document.createElement('script')
        script.async = true
        script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`
        document.head.appendChild(script)

        script.onload = () => {
          gtag('js', new Date())
          gtag('config', process.env.NEXT_PUBLIC_GA_TRACKING_ID, {
            send_page_view: false
          })
        }
      }
    }

    // Load both scripts after delay or interaction
    const loadAllScripts = () => {
      loadGTM()
      loadGA()
    }

    // Event listeners for immediate loading on interaction
    const interactionEvents = ['mousedown', 'touchstart', 'keydown', 'scroll']
    const handleInteraction = () => {
      loadAllScripts()
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
    const timeoutId = setTimeout(loadAllScripts, delay)

    // Cleanup
    return () => {
      clearTimeout(timeoutId)
      interactionEvents.forEach(event => {
        document.removeEventListener(event, handleInteraction)
      })
    }
  }, [])

  return (
    <>
      {/* Google Tag Manager (noscript fallback) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-PX8GPHKF"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  )
}
