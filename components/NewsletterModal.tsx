'use client'
import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { trackNewsletterSignup } from '@/lib/tracking'

interface NewsletterModalProps {
  trigger?: 'scroll' | 'time' | 'exit'
  delay?: number
}

export default function NewsletterModal({ 
  trigger = 'scroll', 
  delay = 30000 
}: NewsletterModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    // Check if user has already seen modal today
    const lastShown = localStorage.getItem('newsletter-modal-shown')
    const today = new Date().toDateString()
    
    if (lastShown === today) {
      setHasShown(true)
      return
    }

    const showModal = () => {
      if (!hasShown && !isVisible) {
        setIsVisible(true)
        setHasShown(true)
        localStorage.setItem('newsletter-modal-shown', today)
      }
    }

    if (trigger === 'time') {
      const timer = setTimeout(showModal, delay)
      return () => clearTimeout(timer)
    }

    if (trigger === 'scroll') {
      let documentHeight = 0
      let windowHeight = 0

      // Cache layout measurements to avoid forced reflows
      const updateDimensions = () => {
        documentHeight = document.body.scrollHeight
        windowHeight = window.innerHeight
      }

      updateDimensions()
      window.addEventListener('resize', updateDimensions, { passive: true })

      const handleScroll = () => {
        // Use cached values to avoid layout measurements during scroll
        const scrolled = documentHeight > windowHeight
          ? window.scrollY / (documentHeight - windowHeight)
          : 0
        if (scrolled > 0.5) {
          showModal()
          window.removeEventListener('scroll', handleScroll)
          window.removeEventListener('resize', updateDimensions)
        }
      }
      
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }

    if (trigger === 'exit') {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) {
          showModal()
          document.removeEventListener('mouseleave', handleMouseLeave)
        }
      }
      
      document.addEventListener('mouseleave', handleMouseLeave)
      return () => document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [trigger, delay, hasShown, isVisible])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/newsletter-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: `modal-${trigger}`
        }),
      })

      if (response.ok) {
        setIsSuccess(true)
        trackNewsletterSignup(`modal-${trigger}`)
        setTimeout(() => {
          setIsVisible(false)
        }, 2000)
      }
    } catch (error) {
      console.error('Newsletter signup failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isVisible) return null

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && setIsVisible(false)}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative animate-in fade-in duration-300 max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <div className="p-6 sm:p-8">
          {isSuccess ? (
            <div className="text-center">
              <div className="text-5xl sm:text-6xl mb-4">🎉</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Welcome to the Kitchen!
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Check your email for your free kitchen bundle guide and authentic gear recommendations!
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="text-3xl sm:text-4xl mb-3">👨‍🍳</div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Get My Professional Kitchen Bundle
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  &ldquo;7 Tools I Actually Use Daily&rdquo; + authentic gear recommendations from 24 years experience
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoCapitalize="none"
                    autoCorrect="off"
                    autoComplete="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors text-base"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-700 to-red-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-orange-800 hover:to-red-800 transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-base"
                >
                  {isSubmitting ? 'Sending...' : 'Get My Free Kitchen Bundle →'}
                </button>
              </form>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  No spam, unsubscribe anytime.
                </p>
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs text-gray-400">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                  Certified Chef
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-1"></span>
                  Restaurant Pro
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-1"></span>
                  $2M Brand Launch
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}