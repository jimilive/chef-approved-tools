/**
 * Device Detection Utilities
 *
 * Provides consistent device type detection across all tracking events
 * Helps segment analytics by mobile vs desktop behavior
 */

export type DeviceType = 'mobile' | 'tablet' | 'desktop'

/**
 * Get the user's device type
 * @returns DeviceType - mobile, tablet, or desktop
 */
export function getDeviceType(): DeviceType {
  if (typeof window === 'undefined') return 'desktop'

  const userAgent = navigator.userAgent.toLowerCase()
  const width = window.innerWidth

  // Check for tablet first (iPads, Android tablets)
  if (/(ipad|tablet|playbook|silk)|(android(?!.*mobile))/i.test(userAgent)) {
    return 'tablet'
  }

  // Check for mobile devices
  if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) {
    return 'mobile'
  }

  // Fallback: Check screen width
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'

  return 'desktop'
}

/**
 * Get viewport dimensions
 * @returns Object with width and height
 */
export function getViewportSize() {
  if (typeof window === 'undefined') return { width: 0, height: 0 }

  return {
    width: window.innerWidth,
    height: window.innerHeight
  }
}

/**
 * Check if user is on mobile device
 * @returns boolean
 */
export function isMobile(): boolean {
  return getDeviceType() === 'mobile'
}

/**
 * Check if user is on tablet device
 * @returns boolean
 */
export function isTablet(): boolean {
  return getDeviceType() === 'tablet'
}

/**
 * Check if user is on desktop device
 * @returns boolean
 */
export function isDesktop(): boolean {
  return getDeviceType() === 'desktop'
}

/**
 * Get device orientation
 * @returns 'portrait' | 'landscape' | 'unknown'
 */
export function getOrientation(): 'portrait' | 'landscape' | 'unknown' {
  if (typeof window === 'undefined') return 'unknown'

  if (window.innerHeight > window.innerWidth) {
    return 'portrait'
  }
  return 'landscape'
}

/**
 * Check if device supports touch
 * @returns boolean
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false

  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0
  )
}

/**
 * Get complete device context for analytics
 * @returns Object with all device information
 */
export function getDeviceContext() {
  return {
    device_type: getDeviceType(),
    viewport_width: getViewportSize().width,
    viewport_height: getViewportSize().height,
    orientation: getOrientation(),
    is_touch: isTouchDevice()
  }
}
