'use client'

import Link from 'next/link'
import { ChefHat } from 'lucide-react'
import CTAVisibilityTracker from '@/components/CTAVisibilityTracker'

interface BlogNewsletterCTAProps {
  slug: string
  description?: string
}

const DEFAULT_DESCRIPTION = 'Get my free "11 Essential Tools I Use Most" PDF—the exact equipment I rely on after 24 years in professional kitchens. No fluff, just the tools that actually matter.'

export default function BlogNewsletterCTA({
  slug,
  description = DEFAULT_DESCRIPTION
}: BlogNewsletterCTAProps) {
  return (
    <div className="not-prose bg-amber-50 border-l-4 border-orange-600 p-6 my-8">
      <p className="text-xl font-bold text-slate-900 mt-0 flex items-center gap-2">
        <ChefHat className="w-6 h-6 text-orange-700" />
        Want My Complete Kitchen Setup Guide?
      </p>
      <p className="mb-4">
        {description}
      </p>
      <CTAVisibilityTracker
        ctaId={`${slug}-newsletter-cta`}
        position="mid_article"
        productSlug={slug}
        merchant="internal"
      >
        <Link
          href="/newsletter"
          className="inline-block bg-orange-900 !text-white px-6 py-3 rounded font-bold hover:bg-orange-800 transition-colors"
        >
          Get the Free Guide →
        </Link>
      </CTAVisibilityTracker>
      <p className="text-sm text-slate-700 mt-3 mb-0">
        Unsubscribe anytime. No spam, ever.
      </p>
    </div>
  )
}
