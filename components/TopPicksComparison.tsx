'use client'

import { Star, TrendingUp, Award } from 'lucide-react'
import { trackAffiliateClick } from '@/lib/analytics'

interface TopPick {
  id: string
  name: string
  shortName: string
  rating: number
  badge: string
  badgeColor: string
  category: string
  affiliateUrl: string
  keyFeature: string
  testPeriod: string
  whyBest: string
}

const topPicks: TopPick[] = [
  {
    id: 'vitamix-5200',
    name: 'Vitamix 5200 Professional-Grade Blender',
    shortName: 'Vitamix 5200',
    rating: 4.7,
    badge: 'Best Overall',
    badgeColor: 'bg-green-700',
    category: 'Blenders',
    affiliateUrl: 'https://amzn.to/48RALd9',
    keyFeature: '2.0 HP motor with 7-year full warranty',
    testPeriod: '5 years proven',
    whyBest: 'Still running strong after 5 years of daily use with zero maintenance. Blades still sharp, motor still powerful.'
  }
]

export default function TopPicksComparison() {
  const handleAffiliateClick = (pick: TopPick) => {
    trackAffiliateClick(pick.name, pick.category, 0, pick.name.split(' ')[0])
  }

  // ItemList Schema for Top Picks
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Chef's Top Kitchen Equipment Pick",
    "description": "Professional chef's top-rated kitchen tools tested in real restaurant kitchens",
    "numberOfItems": topPicks.length,
    "itemListElement": topPicks.map((pick, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": pick.name,
        "description": pick.whyBest,
        "image": "https://www.chefapprovedtools.com/logo.png",
        "brand": {
          "@type": "Brand",
          "name": pick.name.split(' ')[0]
        },
        "category": pick.category,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": pick.rating,
          "bestRating": 5,
          "worstRating": 1,
          "reviewCount": 1
        },
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "url": pick.affiliateUrl,
          "seller": {
            "@type": "Organization",
            "name": "Amazon"
          }
        },
        "url": `https://www.chefapprovedtools.com/reviews/${pick.id}`
      }
    }))
  }

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-gray-100">
      {/* ItemList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-2 mb-4">
            <Award className="w-4 h-4 text-orange-800" />
            <span className="text-sm font-semibold text-orange-800">Chef&apos;s Top Picks</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-slate-900">
            My Top Professional Tool Pick
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            After testing hundreds of tools in real restaurant kitchens, this is the one I&apos;d buy again without hesitation.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8 max-w-md mx-auto">
          {topPicks.map((pick) => (
            <div
              key={pick.id}
              className="relative bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200"
            >
              {/* Badge */}
              <div className={`absolute -top-3 left-6 ${pick.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                {pick.badge}
              </div>

              {/* Category */}
              <div className="text-xs text-gray-500 font-medium mb-2 mt-2">
                {pick.category}
              </div>

              {/* Product Name */}
              <h3 className="font-bold text-slate-900 mb-2 text-lg leading-tight">
                {pick.shortName}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(pick.rating) ? 'fill-current' : ''}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {pick.rating} ({pick.testPeriod})
                </span>
              </div>


              {/* Key Feature */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-orange-800" />
                  <span className="text-xs font-semibold text-gray-700">Key Strength</span>
                </div>
                <p className="text-sm text-gray-700 font-medium">{pick.keyFeature}</p>
              </div>

              {/* Why It's Best */}
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {pick.whyBest}
              </p>

              {/* Internal Review Link */}
              <div className="mb-4">
                <a
                  href={`/reviews/${pick.id}`}
                  className="inline-flex items-center text-sm text-slate-600 hover:text-orange-800 font-medium transition-colors"
                >
                  Read my complete {pick.testPeriod} testing review →
                </a>
              </div>

              {/* CTA */}
              <a
                href={pick.affiliateUrl}
                target="_blank"
                rel="sponsored nofollow noopener noreferrer"
                onClick={() => handleAffiliateClick(pick)}
                className="block w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
              >
                View on Amazon →
              </a>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            Want My Complete Equipment Rankings?
          </h3>
          <p className="text-gray-600 mb-4">
            Get my detailed breakdown of kitchen tools tested in professional environments, including budget alternatives and what to avoid.
          </p>
          <a
            href="/reviews"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
          >
            View All Reviews
            <TrendingUp className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}