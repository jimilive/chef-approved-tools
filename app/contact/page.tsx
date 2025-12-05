'use client'
import { useState, FormEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState('submitting')
    setErrorMessage('')

    const formData = new FormData(e.currentTarget)

    // Check honeypot field - if filled, it's a bot
    const honeypot = formData.get('website')
    if (honeypot) {
      // Silent fail for bots
      setFormState('idle')
      return
    }

    try {
      // Simulate form submission - replace with your actual endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message'),
        }),
      })

      if (response.ok) {
        setFormState('success')
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      setFormState('error')
      setErrorMessage('There was a problem sending your message. Please try again or email me directly at contact@chefapprovedtools.com')
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-slate-700 leading-relaxed">
            Questions about kitchen equipment? Want to share your own professional experience?
            I&apos;d love to hear from fellow chefs and home cooks.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h2>

            {/* Scott's Headshot */}
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32">
                <Image
                  src="/images/team/head-shot-1.jpg"
                  alt="Scott Bradley - Professional Chef"
                  fill
                  quality={75}
                  className="object-cover rounded-full shadow-lg border-4 border-orange-500"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Professional Background</h3>
                <p className="text-slate-700 text-sm">
                  24 years in professional kitchens<br />
                  Seattle Central College - A.A.S. Culinary Arts<br />
                  High-volume restaurant operations experience
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-2">What I Review</h3>
                <ul className="text-slate-700 text-sm space-y-1">
                  <li>• Professional kitchen knives</li>
                  <li>• Commercial-grade cookware</li>
                  <li>• Restaurant equipment for home use</li>
                  <li>• Small appliances that actually last</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Response Time</h3>
                <p className="text-slate-700 text-sm">
                  I typically respond within 2-3 business days. For urgent equipment questions,
                  please mention it in your subject line.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Send a Message</h2>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              {formState === 'success' ? (
                <div className="text-center py-8">
                  <div className="mb-4">
                    <svg className="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h3>
                  <p className="text-slate-700 mb-6">
                    Your message has been sent successfully. I&apos;ll get back to you within 2-3 business days.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormState('idle')}
                    className="text-orange-600 hover:text-orange-800 font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Honeypot field - hidden from humans, visible to bots */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    className="absolute -left-[9999px]"
                    aria-hidden="true"
                  />

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      disabled={formState === 'submitting'}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      disabled={formState === 'submitting'}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      disabled={formState === 'submitting'}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Select a topic</option>
                      <option value="equipment-question">Equipment Question</option>
                      <option value="review-request">Review Request</option>
                      <option value="professional-feedback">Professional Feedback</option>
                      <option value="partnership">Partnership Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      disabled={formState === 'submitting'}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="What would you like to know about professional kitchen equipment?"
                    />
                  </div>

                  {formState === 'error' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-sm text-red-800">{errorMessage}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="w-full bg-gradient-to-r from-orange-700 to-red-700 hover:from-orange-800 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {formState === 'submitting' ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}

              {formState !== 'success' && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-slate-700">
                    By submitting this form, you agree that your message may be used to improve
                    our content and help other professional chefs and home cooks.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-slate-900 mb-2">
                Do you accept products for review?
              </h3>
              <p className="text-slate-700 text-sm">
                I only review equipment I purchase myself or have extensive experience with
                in professional kitchens. This ensures honest, unbiased recommendations.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-slate-900 mb-2">
                Can you recommend equipment for my restaurant?
              </h3>
              <p className="text-slate-700 text-sm">
                While I can&apos;t provide personalized consulting, my reviews focus on commercial-grade
                equipment that performs well in high-volume operations.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-slate-900 mb-2">
                How do you test equipment?
              </h3>
              <p className="text-slate-700 text-sm">
                All recommendations are based on real-world use in professional kitchens,
                typically 6+ months of daily service before I&apos;ll recommend anything.{' '}
                <Link href="/about" className="text-orange-600 hover:text-orange-800 font-medium">
                  Learn about our comprehensive testing process here →
                </Link>
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-slate-900 mb-2">
                Do you offer knife sharpening services?
              </h3>
              <p className="text-slate-700 text-sm">
                I don&apos;t offer sharpening services, but I can recommend local professionals
                and provide guidance on maintaining your knives properly.
              </p>
            </div>
          </div>
        </section>

        <nav className="mt-12 pt-8 border-t border-gray-200 text-center">
          <Link
            href="/"
            className="text-orange-600 hover:text-orange-800 font-semibold"
          >
            ← Back to Home
          </Link>
        </nav>
      </div>
    </main>
  )
}
