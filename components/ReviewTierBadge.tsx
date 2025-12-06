'use client';

import React from 'react';
import { Shield, Clock, Award } from 'lucide-react';

interface ReviewTierBadgeProps {
  tier: 1 | 2 | 3;
  testingPeriod?: string; // For Tier 2: "3 Years", "6 Months", "30 Days", etc.
  showDescription?: boolean;
  className?: string;
}

const tierConfig = {
  1: {
    name: 'Professional Kitchen Proven',
    icon: Shield,
    color: 'from-amber-500 to-yellow-600',
    bgColor: 'bg-amber-100',
    borderColor: 'border-amber-300',
    textColor: 'text-amber-800',
    iconColor: 'text-amber-600',
    description: 'Tested 18+ months in commercial restaurant environments',
    badge: '🏆 PROFESSIONAL KITCHEN PROVEN'
  },
  2: {
    name: 'Long-Term Home Tested',
    icon: Clock,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-300',
    textColor: 'text-blue-800',
    iconColor: 'text-blue-600',
    description: '6+ months of daily home kitchen use',
    badge: '🏠 LONG-TERM HOME TESTED'
  },
  3: {
    name: 'Expert Evaluation',
    icon: Award,
    color: 'from-slate-400 to-gray-600',
    bgColor: 'bg-slate-100',
    borderColor: 'border-slate-300',
    textColor: 'text-slate-700',
    iconColor: 'text-slate-700',
    description: 'Professional assessment based on 24 years of kitchen experience',
    badge: '✓ EXPERT EVALUATION'
  }
};

export default function ReviewTierBadge({ 
  tier, 
  testingPeriod,
  showDescription = false, 
  className = '' 
}: ReviewTierBadgeProps) {
  const config = tierConfig[tier];
  const Icon = config.icon;
  
  // For Tier 2, append the testing period to the name
  const displayName = tier === 2 && testingPeriod 
    ? `${config.name}: ${testingPeriod}`
    : config.name;

  return (
    <div className={className}>
      {/* Compact Badge Version */}
      <div
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${config.borderColor} ${config.bgColor} shadow-sm group relative`}
        role="status"
        aria-label={`Review tier: ${displayName}`}
      >
        <Icon className={`w-5 h-5 ${config.iconColor}`} aria-hidden="true" />
        <div className="flex flex-col">
          <span className={`font-semibold text-sm ${config.textColor}`}>
            {displayName}
          </span>
          <span className="text-xs text-slate-700">
            {config.badge}
          </span>
        </div>

        {/* Hover Tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-72 p-3 bg-slate-800 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50">
          <div className="font-semibold mb-1">{displayName}</div>
          <div className="text-slate-200">{config.description}</div>
          {/* Tooltip Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="border-8 border-transparent border-t-slate-800"></div>
          </div>
        </div>
      </div>

      {/* Optional Expanded Description */}
      {showDescription && (
        <div className={`mt-3 p-4 rounded-lg ${config.bgColor} border ${config.borderColor}`}>
          <p className={`text-sm ${config.textColor} leading-relaxed`}>
            {config.description}
          </p>
        </div>
      )}
    </div>
  );
}

// Convenience components for each tier
export function Tier1Badge({ className = '', showDescription = false }: Omit<ReviewTierBadgeProps, 'tier'>) {
  return <ReviewTierBadge tier={1} className={className} showDescription={showDescription} />;
}

export function Tier2Badge({ 
  testingPeriod, 
  className = '', 
  showDescription = false 
}: Omit<ReviewTierBadgeProps, 'tier'>) {
  return <ReviewTierBadge tier={2} testingPeriod={testingPeriod} className={className} showDescription={showDescription} />;
}

export function Tier3Badge({ className = '', showDescription = false }: Omit<ReviewTierBadgeProps, 'tier'>) {
  return <ReviewTierBadge tier={3} className={className} showDescription={showDescription} />;
}

// Inline badge for use in lists or compact spaces
export function InlineTierBadge({ tier }: { tier: 1 | 2 | 3 }) {
  const config = tierConfig[tier];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${config.bgColor} ${config.textColor} border ${config.borderColor}`}>
      <Icon className="w-3 h-3" aria-hidden="true" />
      <span>Tier {tier}</span>
    </span>
  );
}