// lib/ab-test.ts

/**
 * A/B Testing utilities for CTA button variations
 * Randomly assigns visitors to test variants and persists in localStorage
 */

export type CTAVariant = 'a' | 'b' | 'c';

interface VariantConfig {
  id: CTAVariant;
  text: string;
  weight: number; // For weighted distribution (future enhancement)
}

// Define CTA text variations
export const CTA_VARIANTS: Record<CTAVariant, VariantConfig> = {
  a: {
    id: 'a',
    text: 'View on Amazon',
    weight: 1
  },
  b: {
    id: 'b',
    text: 'Check Current Price',
    weight: 1
  },
  c: {
    id: 'c',
    text: 'See Product Details',
    weight: 1
  }
};

const STORAGE_KEY = 'cta_variant';
const VARIANT_IDS: CTAVariant[] = ['a', 'b', 'c'];

/**
 * Get the assigned CTA variant for the current visitor
 * If not assigned, randomly assign and store in localStorage
 * @returns The assigned variant ('a', 'b', or 'c')
 */
export function getAssignedVariant(): CTAVariant {
  // Server-side rendering safety
  if (typeof window === 'undefined') {
    return 'a'; // Default for SSR
  }

  try {
    // Check if already assigned
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored && isValidVariant(stored)) {
      return stored as CTAVariant;
    }

    // Assign new variant randomly
    const newVariant = assignRandomVariant();
    localStorage.setItem(STORAGE_KEY, newVariant);

    // Track assignment
    trackVariantAssignment(newVariant);

    return newVariant;
  } catch (error) {
    console.warn('Error accessing localStorage for A/B test:', error);
    return 'a'; // Fallback to control variant
  }
}

/**
 * Randomly assign a variant using weighted distribution
 * Currently using equal weights (33.3% each)
 * @returns Randomly selected variant
 */
function assignRandomVariant(): CTAVariant {
  const random = Math.random();

  // Equal distribution: 0-0.33 = A, 0.33-0.66 = B, 0.66-1.0 = C
  if (random < 0.33) return 'a';
  if (random < 0.66) return 'b';
  return 'c';
}

/**
 * Validate if a string is a valid variant ID
 */
function isValidVariant(variant: string): boolean {
  return VARIANT_IDS.includes(variant as CTAVariant);
}

/**
 * Track variant assignment event to analytics
 */
function trackVariantAssignment(variant: CTAVariant): void {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'cta_variant_assigned',
      variant: variant,
      variant_text: CTA_VARIANTS[variant].text,
      timestamp: new Date().toISOString()
    });

    console.log('CTA variant assigned:', variant, CTA_VARIANTS[variant].text);
  }

  // Also track to gtag if available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'cta_variant_assigned', {
      event_category: 'ab_test',
      event_label: variant,
      variant_text: CTA_VARIANTS[variant].text
    });
  }
}

/**
 * Get the CTA text for a given variant
 */
export function getVariantText(variant: CTAVariant): string {
  return CTA_VARIANTS[variant].text;
}

/**
 * Force reassign variant (useful for testing)
 * DO NOT USE IN PRODUCTION - for development only
 */
export function forceReassignVariant(variant?: CTAVariant): void {
  if (typeof window === 'undefined') return;

  try {
    if (variant && isValidVariant(variant)) {
      localStorage.setItem(STORAGE_KEY, variant);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.warn('Error forcing variant reassignment:', error);
  }
}

/**
 * Get current variant without triggering assignment
 * Useful for checking if user is already assigned
 */
export function getCurrentVariant(): CTAVariant | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored && isValidVariant(stored) ? (stored as CTAVariant) : null;
  } catch (error) {
    return null;
  }
}
