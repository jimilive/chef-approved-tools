'use client'

import { useState } from 'react'

export default function EmailCaptureSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    const formElement = document.getElementById('lead-magnet-form') as HTMLFormElement
    if (!formElement) return

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
    <section id="get-guide" className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-2xl">
          {/* Curiosity Badge */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-orange-700 to-red-700 px-6 py-3 rounded-full inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Professional Kitchen Essentials</span>
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            The 11 Tools I Use Most in My Home Kitchen
          </h2>

          {/* Subheadline */}
          <p className="text-xl text-slate-300 text-center mb-8">
            My daily workhorse tools from 24 years in professional kitchens
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm">
            <span className="flex items-center gap-2">
              <span className="text-yellow-400">⭐</span>
              <span className="text-slate-300">24 Years Professional</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-slate-300">11 Tools. That&apos;s It.</span>
            </span>
          </div>

          {/* Benefit Preview Box */}
          <div className="bg-slate-800 border-2 border-orange-600 rounded-xl p-6 md:p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-6 h-6 text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-white">
                What You&apos;ll Get (FREE Guide):
              </h3>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className="font-semibold text-white">5 Victorinox knives:</span>
                  <span className="text-slate-300"> Chef&apos;s (8&quot; & 10&quot;), paring, boning, and bread knife</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className="font-semibold text-white">Essential prep tools:</span>
                  <span className="text-slate-300"> Peeler, bench scraper, tongs, and mandoline</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className="font-semibold text-white">Restaurant towels:</span>
                  <span className="text-slate-300"> The exact bar mops I&apos;ve used for decades</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className="font-semibold text-white">Professional cutting board:</span>
                  <span className="text-slate-300"> Epicurean board built to last</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className="font-semibold text-white">Why I chose each one:</span>
                  <span className="text-slate-300"> Real stories from 24 years of professional cooking</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Email Form */}
          {!isSubmitted ? (
            <form id="lead-magnet-form" className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {/* Hidden ActiveCampaign Fields */}
              <input type="hidden" name="u" value="1" />
              <input type="hidden" name="f" value="1" />
              <input type="hidden" name="s" />
              <input type="hidden" name="c" value="0" />
              <input type="hidden" name="m" value="0" />
              <input type="hidden" name="act" value="sub" />
              <input type="hidden" name="v" value="2" />
              <input type="hidden" name="or" value="c091b86ba39b7f8fdc1702809f7e19ff" />

              {/* First Name Field */}
              <div>
                <input
                  type="text"
                  name="firstname"
                  placeholder="First name"
                  className="w-full px-6 py-4 rounded-xl text-slate-900 text-lg focus:ring-2 focus:ring-orange-600 focus:outline-none"
                />
              </div>

              {/* Email Field */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  required
                  className="w-full px-6 py-4 rounded-xl text-slate-900 text-lg focus:ring-2 focus:ring-orange-600 focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-700 to-red-700 hover:from-orange-800 hover:to-red-800 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>Submitting...</>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Get My Free Professional Kitchen Guide →
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Check Your Email!</h3>
              <p className="text-slate-300 text-lg mb-4">
                Your free guide is on its way. Check your inbox (and spam folder) for the download link.
              </p>
              <p className="text-slate-400 text-sm">
                Welcome to the Chef Approved Tools family!
              </p>
            </div>
          )}

          {/* Trust Indicators Below Form */}
          <div className="mt-6 text-center">
            <p className="text-slate-400 text-sm mb-4">
              No spam, unsubscribe anytime
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Your email is safe
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
                Equipment insights & reviews
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                Instant download
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
