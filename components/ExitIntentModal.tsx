'use client'
import { useState, useEffect } from 'react'
import { X, Download } from 'lucide-react'
import { Button } from '@/components/ui'

interface ExitIntentModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ExitIntentModal({ isOpen, onClose }: ExitIntentModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative max-w-md mx-4 bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">
            🛑 Wait! Before You Go...
          </h2>
          <p className="text-gray-300">
            Get my free guide to building a professional kitchen
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">
            The 11 Tools I Use Most in My Home Kitchen
          </h3>

          <p className="text-slate-700 text-center mb-6">
            My daily workhorse tools from 24 years in professional kitchens.
            Real recommendations, no BS.
          </p>

          <ul className="space-y-2 mb-6 text-sm">
            <li className="flex items-center gap-2 text-slate-700">
              <span className="text-green-600">✓</span>
              5 Victorinox knives I actually use
            </li>
            <li className="flex items-center gap-2 text-slate-700">
              <span className="text-green-600">✓</span>
              Essential prep tools that last decades
            </li>
            <li className="flex items-center gap-2 text-slate-700">
              <span className="text-green-600">✓</span>
              Why I chose each one (real stories)
            </li>
          </ul>

          <Button
            as="link"
            href="/newsletter"
            onClick={onClose}
            fullWidth
          >
            <Download className="inline w-5 h-5 mr-2" />
            Get My Free Guide →
          </Button>

          <p className="text-xs text-slate-500 text-center mt-4">
            No spam, unsubscribe anytime
          </p>
        </div>
      </div>
    </div>
  )
}

// Exit intent hook
export function useExitIntent() {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    let hasShown = false

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger on upward movement near top of page
      if (e.clientY <= 0 && !hasShown) {
        // Check if user hasn't already signed up
        const hasSignedUp = localStorage.getItem('newsletter-signup')
        const hasSeenModal = localStorage.getItem('exit-intent-shown')

        if (!hasSignedUp && !hasSeenModal) {
          setShowModal(true)
          hasShown = true
          localStorage.setItem('exit-intent-shown', Date.now().toString())
        }
      }
    }

    // Add delay before enabling exit intent
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave)
    }, 30000) // Wait 30 seconds before enabling

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const closeModal = () => {
    setShowModal(false)
  }

  return { showModal, closeModal }
}
