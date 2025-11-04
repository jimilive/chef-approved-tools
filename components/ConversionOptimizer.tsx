'use client'
import { useEffect, useState } from 'react'
import { trackEmailSignup } from '@/lib/tracking'

interface ConversionOptimizerProps {
  variant?: 'A' | 'B'
  testId?: string
  children: React.ReactNode
}

// A/B Test Wrapper
export function ABTestWrapper({ variant = 'A', testId = 'default', children }: ConversionOptimizerProps) {
  const [selectedVariant, setSelectedVariant] = useState<'A' | 'B'>('A')

  useEffect(() => {
    // Check if user already has a variant assigned
    const savedVariant = localStorage.getItem(`ab-test-${testId}`)
    if (savedVariant === 'A' || savedVariant === 'B') {
      setSelectedVariant(savedVariant)
    } else {
      // Randomly assign variant (50/50 split)
      const randomVariant = Math.random() < 0.5 ? 'A' : 'B'
      setSelectedVariant(randomVariant)
      localStorage.setItem(`ab-test-${testId}`, randomVariant)

      // Track the assignment
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'ab_test_assignment', {
          test_id: testId,
          variant: randomVariant,
          event_category: 'experiment'
        })
      }
    }
  }, [testId])

  // Only render if the variant matches
  if (selectedVariant !== variant) return null

  return <>{children}</>
}

// Urgency Banner
export function UrgencyBanner({ message, type = 'limited-time' }: { message: string; type?: 'limited-time' | 'stock' | 'discount' }) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const bgColor = type === 'limited-time' ? 'bg-red-600' : type === 'stock' ? 'bg-orange-600' : 'bg-green-600'

  return (
    <div className={`${bgColor} text-white py-2 px-4 text-center relative`}>
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex-1 text-sm font-medium">
          {type === 'limited-time' && '⏰ '}
          {type === 'stock' && '🔥 '}
          {type === 'discount' && '💰 '}
          {message}
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-4 text-white hover:text-gray-200 text-xl leading-none"
          aria-label="Close banner"
        >
          ×
        </button>
      </div>
    </div>
  )
}

// Social Proof Component
export function SocialProof({
  count,
  action = 'purchased',
  timeframe = 'this week',
  variant = 'default'
}: {
  count: number;
  action?: string;
  timeframe?: string;
  variant?: 'default' | 'floating' | 'inline'
}) {
  const baseClasses = "bg-green-50 border border-green-200 rounded-lg p-3"
  const floatingClasses = "fixed bottom-4 right-4 z-50 shadow-lg max-w-sm"
  const inlineClasses = "mb-4"

  const className = `${baseClasses} ${variant === 'floating' ? floatingClasses : inlineClasses}`

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <p className="text-green-800 text-sm font-medium">
          <span className="font-bold">{count.toLocaleString()}</span> people {action} {timeframe}
        </p>
      </div>
    </div>
  )
}

// Exit Intent Modal Trigger
export function ExitIntentTrigger({ children }: { children: React.ReactNode }) {
  const [showModal, setShowModal] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    // Check if modal has already been shown
    if (localStorage.getItem('exit-intent-shown') || hasTriggered) return

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from top of viewport
      if (e.clientY <= 0 && !hasTriggered) {
        setShowModal(true)
        setHasTriggered(true)
        localStorage.setItem('exit-intent-shown', 'true')

        // Track the event
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'exit_intent_triggered', {
            event_category: 'engagement'
          })
        }
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [hasTriggered])

  if (!showModal) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  )
}

// Conversion Tracking Wrapper
export function ConversionTracker({
  action,
  category = 'conversion',
  children
}: {
  action: string;
  category?: string;
  children: React.ReactNode
}) {
  const handleClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: window.location.pathname
      })
    }
  }

  return (
    <div onClick={handleClick}>
      {children}
    </div>
  )
}

// Sticky CTA Component
export function StickyCTA({
  text,
  href,
  variant = 'newsletter',
  position = 'bottom'
}: {
  text: string;
  href: string;
  variant?: 'newsletter' | 'affiliate' | 'guide';
  position?: 'bottom' | 'top'
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let documentHeight = 0
    let windowHeight = 0

    // Cache layout measurements to avoid forced reflows
    const updateDimensions = () => {
      documentHeight = document.documentElement.scrollHeight
      windowHeight = window.innerHeight
    }

    // Update dimensions on resize, not scroll
    updateDimensions()
    window.addEventListener('resize', updateDimensions, { passive: true })

    const handleScroll = () => {
      // Use cached values to avoid layout measurements during scroll
      const scrollPercentage = documentHeight > windowHeight
        ? (window.scrollY / (documentHeight - windowHeight)) * 100
        : 0
      setIsVisible(scrollPercentage > 25) // Show after 25% scroll
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  const positionClasses = position === 'bottom' ? 'bottom-0' : 'top-0'
  const bgColor = variant === 'newsletter' ? 'bg-orange-600' : variant === 'affiliate' ? 'bg-green-600' : 'bg-blue-600'

  return (
    <div className={`fixed ${positionClasses} left-0 right-0 z-40 ${bgColor} text-white py-3 px-4 shadow-lg transform transition-transform duration-300`}>
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <span className="font-medium">{text}</span>
        <div className="flex items-center gap-3">
          <a
            href={href}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg font-semibold transition-colors"
            onClick={() => {
              if (variant === 'newsletter') {
                trackEmailSignup('sticky-cta')
              }
            }}
          >
            {variant === 'newsletter' ? 'Get Guide' : variant === 'affiliate' ? 'Check Price' : 'Learn More'}
          </a>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white hover:text-gray-200 ml-2"
            aria-label="Close"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
}

// Countdown Timer Component
export function CountdownTimer({
  endDate,
  onExpire,
  size = 'medium'
}: {
  endDate: Date;
  onExpire?: () => void;
  size?: 'small' | 'medium' | 'large'
}) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = endDate.getTime() - now

      if (distance < 0) {
        clearInterval(timer)
        onExpire?.()
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [endDate, onExpire])

  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-lg',
    large: 'text-2xl'
  }

  return (
    <div className={`flex gap-2 font-mono font-bold ${sizeClasses[size]}`}>
      {timeLeft.days > 0 && (
        <div className="bg-gray-800 text-white px-2 py-1 rounded">
          {timeLeft.days.toString().padStart(2, '0')}d
        </div>
      )}
      <div className="bg-gray-800 text-white px-2 py-1 rounded">
        {timeLeft.hours.toString().padStart(2, '0')}h
      </div>
      <div className="bg-gray-800 text-white px-2 py-1 rounded">
        {timeLeft.minutes.toString().padStart(2, '0')}m
      </div>
      <div className="bg-gray-800 text-white px-2 py-1 rounded">
        {timeLeft.seconds.toString().padStart(2, '0')}s
      </div>
    </div>
  )
}