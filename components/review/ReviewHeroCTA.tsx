'use client'

import { trackAffiliateClick } from '@/lib/tracking'

interface ReviewHeroCTAProps {
  ctaUrl: string
  ctaText: string
  productName: string
  position: string
  className?: string
  children?: React.ReactNode
}

export function ReviewHeroCTA({
  ctaUrl,
  ctaText,
  productName,
  position,
  className = '',
  children
}: ReviewHeroCTAProps) {
  return (
    <a
      href={ctaUrl}
      target="_blank"
      rel="nofollow noopener noreferrer sponsored"
      onClick={() => trackAffiliateClick('Amazon', productName, position, 0)}
      className={className}
    >
      {children || ctaText}
    </a>
  )
}
