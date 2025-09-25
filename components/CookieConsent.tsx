'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false
  })
  
  const applyConsent = useCallback((prefs: typeof preferences) => {
    // Apply consent to Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': prefs.analytics ? 'granted' : 'denied',
        'ad_storage': prefs.marketing ? 'granted' : 'denied'
      })
    }
  }, [])
  
  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    } else {
      const savedPreferences = JSON.parse(consent)
      setPreferences(savedPreferences)
      applyConsent(savedPreferences)
    }
  }, [applyConsent])
  
  const handleAcceptAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: true,
      marketing: true
    }
    setPreferences(newPreferences)
    localStorage.setItem('cookie-consent', JSON.stringify(newPreferences))
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    applyConsent(newPreferences)
    setShowBanner(false)
  }
  
  const handleAcceptNecessary = () => {
    const newPreferences = {
      necessary: true,
      analytics: false,
      marketing: false
    }
    setPreferences(newPreferences)
    localStorage.setItem('cookie-consent', JSON.stringify(newPreferences))
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    applyConsent(newPreferences)
    setShowBanner(false)
  }
  
  const handleCustomize = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences))
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    applyConsent(preferences)
    setShowBanner(false)
  }
  
  if (!showBanner) return null
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              🍪 Cookie Settings
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              We use cookies to enhance your experience, analyze site traffic, and show relevant ads. 
              By clicking &ldquo;Accept All&rdquo;, you consent to our use of cookies. 
              <Link href="/privacy-policy" className="underline ml-1">Learn more</Link>
            </p>
            
            <details className="text-sm">
              <summary className="cursor-pointer text-brand-600 hover:text-brand-700 font-medium">
                Customize preferences
              </summary>
              <div className="mt-3 space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.necessary}
                    disabled
                    className="mr-2"
                  />
                  <span className="text-gray-700">
                    Necessary (Required) - Basic site functionality
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-gray-700">
                    Analytics - Help us improve our site
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-gray-700">
                    Marketing - Show relevant ads and measure performance
                  </span>
                </label>
                <button
                  onClick={handleCustomize}
                  className="mt-2 text-brand-600 hover:text-brand-700 font-medium"
                >
                  Save custom preferences
                </button>
              </div>
            </details>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleAcceptNecessary}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
            >
              Necessary Only
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Type declaration for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}