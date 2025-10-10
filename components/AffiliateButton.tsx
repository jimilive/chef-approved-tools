// components/AffiliateButton.tsx
'use client';

import { trackAffiliateClick } from '@/lib/tracking';

interface AffiliateButtonProps {
  href: string;
  merchant: 'amazon' | 'williams_sonoma' | 'kitchenaid_direct' | 'sur_la_table' | 'other';
  product: string;
  position: 'above_fold' | 'mid_article' | 'final_cta' | 'comparison_table' | 'related_products';
  price?: number;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export default function AffiliateButton({
  href,
  merchant,
  product,
  position,
  price,
  children,
  className = '',
  variant = 'primary'
}: AffiliateButtonProps) {

  const handleClick = () => {
    trackAffiliateClick(merchant, product, position, price);
  };

  // Variant styles
  const variantStyles = {
    primary: 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white',
    secondary: 'bg-orange-500 hover:bg-orange-600 text-white',
    outline: 'border-2 border-orange-500 text-orange-600 hover:bg-orange-50'
  };

  const baseStyles = 'inline-block px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95';

  return (
    <a
      href={href}
      onClick={handleClick}
      target="_blank"
      rel="nofollow noopener"
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
