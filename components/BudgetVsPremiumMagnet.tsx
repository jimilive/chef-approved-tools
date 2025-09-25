'use client'
import { useState } from 'react'
import { DollarSign, Download, CheckCircle, AlertTriangle, TrendingUp, Star } from 'lucide-react'
import { trackAffiliateClick } from '@/lib/analytics'

interface BudgetVsPremiumMagnetProps {
  variant?: 'inline' | 'modal' | 'sidebar'
  onSignup?: (email: string) => void
}

export default function BudgetVsPremiumMagnet({
  variant = 'inline',
  onSignup
}: BudgetVsPremiumMagnetProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'budget-vs-premium-magnet',
          leadMagnet: 'budget-vs-premium-guide',
          variant
        })
      })

      if (response.ok) {
        setIsSubmitted(true)
        onSignup?.(email)

        // Track conversion
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'conversion', {
            'send_to': 'AW-CONVERSION_ID/LEAD_MAGNET',
            'value': 10.0,
            'currency': 'USD'
          })
        }

        // Track as affiliate click for analytics
        trackAffiliateClick('Budget vs Premium Guide', 'Lead Magnet', 0, 'ChefApproved')
      }
    } catch (error) {
      console.error('Lead magnet signup error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerClass = variant === 'modal'
    ? 'p-8'
    : variant === 'sidebar'
    ? 'p-6 max-w-sm'
    : 'p-8 max-w-2xl mx-auto'

  const bgClass = variant === 'sidebar'
    ? 'bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200'
    : 'bg-gradient-to-br from-slate-900 to-slate-800 text-white'

  if (isSubmitted) {
    return (
      <div className={`${containerClass} ${bgClass} rounded-xl shadow-lg`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">
            Check Your Email! 📧
          </h3>
          <p className="text-gray-300 mb-4">
            Your "$500 vs $5,000 Equipment Guide" is on its way. Check your inbox (and spam folder) in the next few minutes.
          </p>
          <div className="bg-orange-100 text-orange-800 p-3 rounded-lg text-sm">
            💡 <strong>Pro Tip:</strong> Save my email (scott@chefapprovedtools.com) to your contacts so you never miss the good stuff!
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${containerClass} ${bgClass} rounded-xl shadow-lg`}>
      {/* Header with Urgency */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <AlertTriangle className="w-4 h-4" />
          Equipment Industry Secret Revealed
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          The $500 vs $5,000 Kitchen Equipment Guide
        </h2>

        <p className={`text-lg mb-4 ${variant === 'sidebar' ? 'text-gray-700' : 'text-gray-300'}`}>
          Why spending more doesn't always mean better performance
        </p>

        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-4 text-sm mb-6">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className={variant === 'sidebar' ? 'text-gray-600' : 'text-gray-400'}>15+ Years Experience</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className={variant === 'sidebar' ? 'text-gray-600' : 'text-gray-400'}>$80K+/Month Operations</span>
          </div>
        </div>
      </div>

      {/* Value Props */}
      <div className="mb-6">
        <div className={`${variant === 'sidebar' ? 'bg-white' : 'bg-slate-800'} border border-orange-200 rounded-lg p-4 mb-4`}>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Download className="w-5 h-5 text-orange-600" />
            What You'll Get (FREE Download):
          </h3>

          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Complete equipment breakdowns:</strong> $500 setup that outperforms $5,000 gear</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Performance test results:</strong> Real data from 200+ cover nights</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Industry secrets:</strong> Where pros actually buy equipment (not Amazon)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Maintenance schedules:</strong> Make equipment last decades, not years</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Red flag warnings:</strong> Expensive equipment that always fails</span>
            </li>
          </ul>
        </div>

        {/* Social proof snippet */}
        <div className={`${variant === 'sidebar' ? 'bg-gray-50 text-gray-700' : 'bg-slate-700'} p-3 rounded-lg text-sm italic mb-4`}>
          "This guide saved me $3,000 on my restaurant startup. The $45 knife recommendation cuts better than my old $200 knife!"
          <span className="font-semibold block mt-1">— Maria S., Restaurant Owner</span>
        </div>
      </div>

      {/* Email form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Enter your email for instant download"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-gray-900"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-95"
        >
          {isSubmitting ? (
            'Sending Your Guide...'
          ) : (
            <>
              <DollarSign className="inline w-5 h-5 mr-2" />
              Get My Free $500 vs $5,000 Guide →
            </>
          )}
        </button>
      </form>

      {/* Trust indicators */}
      <div className="mt-4 text-center">
        <p className={`text-xs ${variant === 'sidebar' ? 'text-gray-500' : 'text-gray-400'}`}>
          Join 15,000+ professional cooks • No spam, unsubscribe anytime
        </p>
        <div className="flex justify-center items-center mt-2 space-x-4 text-xs text-gray-400">
          <span>🔒 Your email is safe</span>
          <span>📧 Weekly pro tips only</span>
          <span>⚡ Instant download</span>
        </div>
      </div>
    </div>
  )
}

// Teaser version for content pages
export function BudgetVsPremiumTeaser() {
  return (
    <div className="bg-gradient-to-r from-orange-100 to-red-100 border border-orange-200 rounded-xl p-6 my-8">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
          <DollarSign className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 mb-2">
            Spending $5,000 on Kitchen Equipment? Read This First.
          </h3>
          <p className="text-gray-700 text-sm mb-3">
            I tested $500 equipment against $5,000+ gear in real restaurant kitchens.
            The results will shock you (and save you thousands).
          </p>
          <a
            href="#budget-vs-premium-signup"
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Get Free Comparison Guide
            <Download className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}