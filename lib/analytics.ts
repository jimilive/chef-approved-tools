// Google Analytics 4 configuration

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID

// Track page views
export const pageview = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
      page_title: title,
      send_page_view: true,
    })
  }
}

// Track custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track affiliate link clicks with enhanced data
export const trackAffiliateClick = (productName: string, category: string, price: number, brand: string, position?: number) => {
  try {
    // Google Analytics 4 - Enhanced e-commerce
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'affiliate_click', {
        item_name: productName,
        item_category: category,
        item_brand: brand,
        price: price,
        currency: 'USD',
        position: position || 1
      })
    }

    // Facebook Pixel - Use 'ViewContent' instead of 'InitiateCheckout' for affiliate clicks
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: productName,
        content_category: category,
        value: price,
        currency: 'USD'
      })
    }

    // Fallback to standard event tracking
    event({
      action: 'affiliate_click',
      category: 'Affiliate',
      label: `${category} - ${productName}`,
      value: price,
    })
  } catch (error) {
    console.warn('Analytics tracking failed:', error)
  }
}

// Track newsletter signups
export const trackNewsletterSignup = (source: string = 'unknown') => {
  event({
    action: 'newsletter_signup',
    category: 'Marketing',
    label: source,
  })
}

// Track search queries
export const trackSearch = (query: string, results: number) => {
  event({
    action: 'search',
    category: 'Search',
    label: query,
    value: results,
  })
}

// Track product interactions
export const trackProductView = (productName: string, category: string) => {
  event({
    action: 'product_view',
    category: 'Product',
    label: `${category} - ${productName}`,
  })
}

// Track guide/content interactions
export const trackGuideView = (guideName: string, category: string) => {
  event({
    action: 'guide_view',
    category: 'Content',
    label: `${category} - ${guideName}`,
  })
}

// Consent management
export const grantConsent = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted'
    })
  }
}

export const denyConsent = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied'
    })
  }
}

// Track affiliate conversions (when user purchases)
export const trackAffiliateConversion = (product: string, price: number, orderId?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      'transaction_id': orderId || generateTransactionId(),
      'value': price,
      'currency': 'USD',
      'item_name': product,
      'event_category': 'affiliate_conversion'
    })
  }
}

// Track email signups with lead magnets
export const trackEmailSignup = (source: string, leadMagnet?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'sign_up', {
      'method': 'email',
      'event_category': 'engagement',
      'event_label': source,
      'lead_magnet': leadMagnet || 'none'
    })
  }
}

// Track scroll depth for engagement (optimized with throttling)
export const trackScrollDepth = () => {
  if (typeof window === 'undefined') return

  let maxScrollPercentage = 0
  const thresholds = [25, 50, 75, 90, 100]
  let hasTracked = new Set()
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
              if (window.gtag) {
                window.gtag('event', 'scroll', {
                  'event_category': 'engagement',
                  'event_label': `${threshold}%`,
                  'value': threshold
                })
              }
            }
          })
        }
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })

  return () => window.removeEventListener('scroll', handleScroll)
}

// Generate unique transaction ID
function generateTransactionId(): string {
  return `CAT-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}