'use client'

import { useState } from 'react'

interface EmailCaptureSectionProps {
  title?: string
  subtitle?: string
  inputPlaceholder?: string
  buttonText?: string
  finePrint?: string
}

export default function EmailCaptureSection({
  title = "Get My Free Equipment Guide",
  subtitle = "Download my free guide: The 11 tools I use most after 24 years in professional kitchens",
  inputPlaceholder = "Enter your email",
  buttonText = "Get Free Guide",
  finePrint = "No spam. Unsubscribe anytime. I'll send you my top equipment picks and maintenance tips from decades in professional kitchens."
}: EmailCaptureSectionProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formElement = e.currentTarget
    const formData = new FormData(formElement)
    setIsSubmitting(true)

    try {
      await fetch('https://chefapprovedtools.activehosted.com/proc.php', {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      })
      setIsSubmitted(true)
    } catch (error) {
      console.error('Form submission error:', error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl px-6 pt-8 pb-8 md:px-12 shadow-lg mb-6 text-center">
      <h3 className="text-2xl font-bold text-white mb-3 mt-0">
        {title}
      </h3>
      <p className="text-purple-100 text-base mb-6 max-w-2xl mx-auto">
        {subtitle}
      </p>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          {/* Hidden ActiveCampaign Fields */}
          <input type="hidden" name="u" value="1" />
          <input type="hidden" name="f" value="1" />
          <input type="hidden" name="s" />
          <input type="hidden" name="c" value="0" />
          <input type="hidden" name="m" value="0" />
          <input type="hidden" name="act" value="sub" />
          <input type="hidden" name="v" value="2" />
          <input type="hidden" name="or" value="c091b86ba39b7f8fdc1702809f7e19ff" />

          <input
            type="email"
            name="email"
            required
            placeholder={inputPlaceholder}
            className="flex-1 px-5 py-3 rounded-lg text-base border-0 focus:ring-2 focus:ring-purple-300 outline-none"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-white text-purple-700 font-semibold px-8 py-3 rounded-lg text-base hover:bg-purple-50 transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : buttonText}
          </button>
        </form>
      ) : (
        <div className="max-w-lg mx-auto py-4">
          <div className="flex items-center justify-center gap-2 text-white">
            <svg className="w-6 h-6 text-green-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-lg font-semibold">Check your email for the guide!</span>
          </div>
        </div>
      )}

      <p className="text-purple-200 text-sm mt-4">
        {finePrint}
      </p>
    </div>
  )
}
