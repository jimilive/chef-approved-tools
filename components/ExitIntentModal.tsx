'use client'
import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import BudgetVsPremiumMagnet from './BudgetVsPremiumMagnet'

interface ExitIntentModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ExitIntentModal({ isOpen, onClose }: ExitIntentModalProps) {
  const handleMagnetSignup = () => {
    // Lead magnet component handles the signup internally
    setTimeout(() => {
      onClose()
    }, 3000) // Auto-close after success message
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative max-w-2xl mx-4 bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">
            🛑 Wait! Before You Go...
          </h2>
          <p className="text-gray-300">
            Get my free guide: The 11 Tools I Use Most in My Home Kitchen
          </p>
        </div>

        {/* Magnet content */}
        <div className="bg-white">
          <BudgetVsPremiumMagnet
            variant="modal"
            onSignup={handleMagnetSignup}
          />
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