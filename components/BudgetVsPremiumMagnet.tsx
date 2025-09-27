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
          source: 'professional-kitchen-bundle',
          leadMagnet: 'professional-kitchen-tools',
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
        trackAffiliateClick('Professional Kitchen Bundle', 'Lead Magnet', 0, 'ChefApproved')
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
            Your &quot;Professional&apos;s Home Kitchen: 7 Tools&quot; guide is on its way. Check your inbox (and spam folder) in the next few minutes.
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
          The Professional&apos;s Home Kitchen: 7 Tools I Actually Use Daily
        </h2>

        <p className={`text-lg mb-4 ${variant === 'sidebar' ? 'text-gray-700' : 'text-gray-300'}`}>
          My authentic daily toolkit from 15+ years in restaurant kitchens
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
            What You&apos;ll Get (FREE Guide):
          </h3>

          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Victorinox knife set:</strong> The exact 4 knives I use daily at home</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>OXO prep tools:</strong> Simple tools that make cooking effortless</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Professional mandoline:</strong> Restaurant consistency in your home</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Why each tool works:</strong> Stories from real restaurant use</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Care and maintenance:</strong> Make these tools last decades</span>
            </li>
          </ul>
        </div>

        {/* Social proof snippet */}
        <div className={`${variant === 'sidebar' ? 'bg-gray-50 text-gray-700' : 'bg-slate-700'} p-3 rounded-lg text-sm italic mb-4`}>
          &quot;This guide saved me $3,000 on my restaurant startup. The $45 knife recommendation cuts better than my old $200 knife!&quot;
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
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="email"
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
              Get My Free Professional Kitchen Guide →
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
            The Professional&apos;s Home Kitchen: My 7 Daily Tools
          </h3>
          <p className="text-gray-700 text-sm mb-3">
            From 15+ years in professional kitchens to my home - these are the tools that made the cut.
            Real recommendations, no BS.
          </p>
          <a
            href="#budget-vs-premium-signup"
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Get Free Kitchen Bundle Guide
            <Download className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}