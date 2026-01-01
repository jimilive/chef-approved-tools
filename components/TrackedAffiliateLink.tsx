'use client'

import { trackAffiliateClick } from '@/lib/tracking'

interface TrackedAffiliateLinkProps {
  href: string
  merchant: string
  productSlug: string
  position: string
  className?: string
  children: React.ReactNode
  ariaLabel?: string
}

/**
 * TrackedAffiliateLink - Client component for affiliate links with click tracking
 *
 * Use this inside Server Components where you need onClick tracking.
 * The onClick handler runs on the client side.
 */
export default function TrackedAffiliateLink({
  href,
  merchant,
  productSlug,
  position,
  className,
  children,
  ariaLabel
}: TrackedAffiliateLinkProps) {
  const handleClick = () => {
    trackAffiliateClick(merchant, productSlug, position)
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow noopener noreferrer sponsored"
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  )
}
