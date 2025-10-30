'use client'

import { useState } from 'react'
import CTAVisibilityTracker from './CTAVisibilityTracker'

interface SizeOption {
  id: string
  label: string
  description: string
  affiliateUrl: string
  ctaId: string
}

interface SizeSelectorProps {
  title?: string
  options: SizeOption[]
  defaultSize: string
  ctaText?: string
  ctaPosition?: 'above_fold' | 'mid_article' | 'final_cta'
  showDisclosure?: boolean
}

export default function SizeSelector({
  title = 'Choose Your Size:',
  options,
  defaultSize,
  ctaText = 'View on Amazon →',
  ctaPosition = 'mid_article',
  showDisclosure = true
}: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState(defaultSize)

  const selectedOption = options.find(opt => opt.id === selectedSize) || options[0]

  return (
    <div className="space-y-4">
      {/* Size Selection */}
      <div>
        <h3 className="text-base font-semibold text-slate-900 mb-3">{title}</h3>
        <div className="space-y-2">
          {options.map((option) => (
            <label
              key={option.id}
              className="flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all hover:border-orange-300"
              style={{
                borderColor: selectedSize === option.id ? '#ea580c' : '#e5e7eb',
                backgroundColor: selectedSize === option.id ? '#fff7ed' : 'white'
              }}
            >
              <input
                type="radio"
                name="size"
                value={option.id}
                checked={selectedSize === option.id}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="mt-1 w-4 h-4 text-orange-600 focus:ring-orange-500"
              />
              <div className="flex-1">
                <div className="font-semibold text-slate-900">{option.label}</div>
                <div className="text-sm text-slate-600 mt-0.5">{option.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <CTAVisibilityTracker ctaId={selectedOption.ctaId} position={ctaPosition}>
        <a
          href={selectedOption.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-3 rounded-lg text-base transition-all hover:scale-105 whitespace-nowrap w-full text-center"
        >
          {ctaText}
        </a>
      </CTAVisibilityTracker>

      {/* Disclosure */}
      {showDisclosure && (
        <p className="text-xs text-slate-500 italic">
          *As an Amazon Associate, I earn from qualifying purchases
        </p>
      )}
    </div>
  )
}
