'use client'
import { useState } from 'react'

interface PriceAlertSignupProps {
  productName: string
  onSignup?: (email: string, productName: string) => void
}

export default function PriceAlertSignup({ productName, onSignup }: PriceAlertSignupProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isSubmitting) return

    setIsSubmitting(true)

    try {
      // Track the signup event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'price_alert_signup', {
          event_category: 'engagement',
          event_label: productName,
          value: 1
        })
      }

      // Call the onSignup callback if provided
      if (onSignup) {
        await onSignup(email, productName)
      }

      // In a real implementation, you would send this to your backend
      // For now, just simulate the API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      setIsSubmitted(true)
      setEmail('')
    } catch (error) {
      console.error('Error submitting price alert signup:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
        <div className="flex items-center gap-2">
          <span className="text-green-600">✅</span>
          <div>
            <h4 className="font-semibold text-green-900">You&apos;re all set!</h4>
            <p className="text-sm text-green-700">
              We&apos;ll email you when {productName} drops in price.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
      <div className="flex items-start gap-2 mb-3">
        <span className="text-blue-600 text-lg">🔔</span>
        <div>
          <h4 className="font-semibold text-blue-900">Get Price Drop Alerts</h4>
          <p className="text-sm text-blue-700">
            I&apos;ll notify you when this goes on sale (usually 2-3 times per year)
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
          className="flex-1 px-3 py-2 border border-blue-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isSubmitting || !email}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded text-sm font-medium transition-colors min-w-[80px]"
        >
          {isSubmitting ? '...' : 'Notify Me'}
        </button>
      </form>

      <p className="text-xs text-blue-600 mt-2">
        No spam, just genuine deals from a fellow chef 👨‍🍳
      </p>
    </div>
  )
}