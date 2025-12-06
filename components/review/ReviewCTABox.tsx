import React from 'react';

type CTABoxVariant = 'warning' | 'info' | 'success' | 'gradient';

interface ReviewCTABoxProps {
  variant?: CTABoxVariant;
  title?: string;
  children: React.ReactNode;
  disclaimer?: boolean | string;
  className?: string;
}

const VARIANT_STYLES: Record<CTABoxVariant, string> = {
  warning: 'bg-amber-50 border-2 border-amber-400',
  info: 'bg-blue-50 border-l-4 border-blue-600',
  success: 'bg-green-50 border-l-4 border-green-600',
  gradient: 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white'
};

const DEFAULT_DISCLAIMER = "💡 Pricing updated daily. We earn commission at no extra cost to you. More retailers will be added soon for price comparison.";

export default function ReviewCTABox({
  variant = 'warning',
  title,
  children,
  disclaimer = false,
  className = ''
}: ReviewCTABoxProps) {
  const variantClass = VARIANT_STYLES[variant];
  const disclaimerText = typeof disclaimer === 'string' ? disclaimer : DEFAULT_DISCLAIMER;

  return (
    <div className={`rounded-lg p-6 my-6 text-center ${variantClass} ${className}`}>
      {title && (
        <h3 className="text-2xl font-bold mt-0 mb-4">{title}</h3>
      )}

      {children}

      {disclaimer && (
        <p className="text-sm text-gray-700 mt-4">
          {disclaimerText}
        </p>
      )}
    </div>
  );
}

// Quick Stats Box Component
interface QuickStatsBoxProps {
  children: React.ReactNode;
  variant?: 'success' | 'info';
}

export function QuickStatsBox({ children, variant = 'success' }: QuickStatsBoxProps) {
  const borderColor = variant === 'success' ? 'border-green-600' : 'border-blue-600';

  return (
    <div className={`bg-gray-50 p-5 my-5 border-l-4 ${borderColor} rounded`}>
      <div className="text-lg leading-relaxed">
        {children}
      </div>
    </div>
  );
}

// Feature Grid Component
interface Feature {
  emoji: string;
  title: string;
  description: string;
}

interface FeatureGridProps {
  features: Feature[];
}

export function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-8">
      {features.map((feature, index) => (
        <div key={index} className="bg-gray-50 p-5 rounded-lg">
          <div className="text-4xl mb-2">{feature.emoji}</div>
          <h3 className="my-2 text-xl font-bold">{feature.title}</h3>
          <p className="text-gray-700">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
