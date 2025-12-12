// components/TrustSignals.tsx
'use client';

/**
 * Generic trust signals for affiliate links
 * NO Amazon branding - legally compliant
 *
 * Shows generic benefits like free returns, secure checkout, etc.
 * Can be displayed below CTA buttons or standalone
 */

interface TrustSignalsProps {
  variant?: 'compact' | 'full';
  className?: string;
  merchant?: 'amazon' | 'other';
}

export default function TrustSignals({
  variant = 'compact',
  className = '',
  merchant = 'amazon'
}: TrustSignalsProps) {

  if (variant === 'compact') {
    return (
      <div className={`flex items-center justify-center gap-4 text-xs text-slate-700 mt-2 ${className}`}>
        <span className="flex items-center gap-1">
          <CheckIcon className="h-3 w-3 text-green-600" />
          <span>Free Returns</span>
        </span>
        <span className="flex items-center gap-1">
          <ShieldIcon className="h-3 w-3 text-blue-600" />
          <span>Secure Checkout</span>
        </span>
      </div>
    );
  }

  // Full variant - more detailed
  return (
    <div className={`grid grid-cols-3 gap-2 sm:gap-3 mt-3 ${className}`}>
      <div className="flex flex-col items-center text-center">
        <TruckIcon className="h-5 w-5 text-blue-600 mb-1" />
        <span className="text-xs text-slate-700">Fast Shipping</span>
      </div>
      <div className="flex flex-col items-center text-center">
        <ShieldIcon className="h-5 w-5 text-green-600 mb-1" />
        <span className="text-xs text-slate-700">Secure Checkout</span>
      </div>
      <div className="flex flex-col items-center text-center">
        <CheckIcon className="h-5 w-5 text-emerald-600 mb-1" />
        <span className="text-xs text-slate-700">Free Returns</span>
      </div>
    </div>
  );
}

/**
 * Below-button trust signals (subtle)
 * Place directly after AffiliateButton
 */
export function TrustSignalsBelow({ className = '' }: { className?: string }) {
  return (
    <div className={`text-center text-xs text-slate-700 mt-2 ${className}`}>
      ✓ Free Returns • ✓ Secure Checkout • ✓ Fast Shipping
    </div>
  );
}

// Generic Icons (no branding)
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function TruckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
  );
}
