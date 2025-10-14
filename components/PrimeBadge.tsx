// components/PrimeBadge.tsx
// TODO: VERIFY WITH AMAZON LEGAL BEFORE USING
// https://affiliate-program.amazon.com/help/

/*
 * ⚠️ LEGAL COMPLIANCE WARNING ⚠️
 *
 * This component uses Amazon Prime branding which may require
 * explicit permission from Amazon Associates program.
 *
 * DO NOT USE until verified with Amazon legal:
 * - Prime logo/trademark usage
 * - "Prime Eligible" text
 * - Amazon brand colors/styling
 *
 * Contact: https://affiliate-program.amazon.com/help/
 *
 * Alternative: Use generic TrustSignals component instead
 */

'use client';

interface PrimeBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// COMMENTED OUT - REQUIRES LEGAL VERIFICATION
export default function PrimeBadge({ size = 'sm', className = '' }: PrimeBadgeProps) {
  // DO NOT USE - See warning above
  console.warn('PrimeBadge component requires Amazon legal verification before use');
  return null;

  /* ORIGINAL CODE - COMMENTED OUT FOR LEGAL REVIEW
  const sizeClasses = {
    sm: 'text-xs h-4',
    md: 'text-sm h-5',
    lg: 'text-base h-6'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 ${className}`}
      aria-label="Amazon Prime Eligible"
    >
      <svg
        viewBox="0 0 60 20"
        className={`${sizeClasses[size]}`}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20.7 14.5c-3.2 2.4-7.9 3.7-11.9 3.7-5.6 0-10.7-2.1-14.5-5.6-.3-.3-.03-.7.3-.5 4.2 2.4 9.4 3.9 14.8 3.9 3.6 0 7.6-.8 11.3-2.3.5-.2 1 .4.5.8z" />
        <path d="M22.3 12.7c-.4-.5-2.7-.3-3.7-.1-.3 0-.4-.2-.1-.5 1.8-1.3 4.8-.9 5.2-.5.4.5-.1 3.6-1.9 5.1-.3.2-.5.1-.4-.2.4-1 1.3-3.3.9-3.8z" />
        <text x="26" y="14" fontSize="8" fontWeight="600" fill="currentColor">prime</text>
      </svg>
    </span>
  );
  */
}

// COMMENTED OUT - REQUIRES LEGAL VERIFICATION
export function PrimeTextBadge({ className = '' }: { className?: string }) {
  // DO NOT USE - See warning above
  console.warn('PrimeTextBadge component requires Amazon legal verification before use');
  return null;

  /* ORIGINAL CODE - COMMENTED OUT FOR LEGAL REVIEW
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold ${className}`}
      aria-label="Amazon Prime Eligible"
    >
      <svg
        className="h-3 w-3"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      Prime Eligible
    </span>
  );
  */
}
