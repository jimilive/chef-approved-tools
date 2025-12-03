/**
 * Category Mapping Utilities
 *
 * Purpose: Map Supabase product categories to category-config.ts display names and slugs
 * This ensures review pages automatically use the correct category breadcrumbs
 */

import { getCategoryConfig, getAllCategorySlugs, categoryConfigs } from './category-config'

/**
 * Mapping from Supabase product categories to category-config.ts slugs
 *
 * When a product in Supabase has a specific category, this maps it to
 * the corresponding category page slug and display name
 */
const SUPABASE_TO_CATEGORY_SLUG: Record<string, string> = {
  // Direct matches (Supabase category = category-config supabaseCategory)
  'Knives & Cutting Tools': 'knives',
  'Cookware & Bakeware': 'cookware',
  'Small Appliances': 'appliances',
  'Moving & Stirring Tools': 'moving-stirring',
  'Prep Tools': 'prep-tools',
  'Cleaning & Maintenance': 'cleaning-maintenance',

  // Legacy/specific categories that map to broader categories
  'Cutting Boards': 'prep-tools',
  'Knives': 'knives', // Legacy singular form
  'Cookware': 'cookware', // Legacy singular form
  'Appliances': 'appliances', // Legacy singular form
}

/**
 * Get category display info for a Supabase product category
 *
 * @param supabaseCategory - The category value from products.category in Supabase
 * @returns Object with displayName, slug, and full config, or null if no mapping exists
 *
 * @example
 * getCategoryFromSupabase('Cutting Boards')
 * // Returns: { displayName: 'Prep Tools', slug: 'prep-tools', config: {...} }
 *
 * getCategoryFromSupabase('Knives & Cutting Tools')
 * // Returns: { displayName: 'Knives & Cutting Tools', slug: 'knives', config: {...} }
 */
export function getCategoryFromSupabase(supabaseCategory: string | null | undefined): {
  displayName: string
  slug: string
  config: ReturnType<typeof getCategoryConfig>
} | null {
  if (!supabaseCategory) {
    return null
  }

  // Get the category slug from mapping
  const categorySlug = SUPABASE_TO_CATEGORY_SLUG[supabaseCategory]

  if (!categorySlug) {
    console.warn(`No category mapping found for Supabase category: "${supabaseCategory}"`)
    return null
  }

  try {
    const config = getCategoryConfig(categorySlug)

    return {
      displayName: config.displayName,
      slug: categorySlug,
      config: config
    }
  } catch (error) {
    console.error(`Error getting category config for slug: "${categorySlug}"`, error)
    return null
  }
}

/**
 * Get breadcrumb category link for a product
 *
 * @param supabaseCategory - The category value from products.category in Supabase
 * @returns Object with href and label for breadcrumb, or null if no mapping
 *
 * @example
 * getCategoryBreadcrumb('Cutting Boards')
 * // Returns: { href: '/prep-tools', label: 'Prep Tools' }
 */
export function getCategoryBreadcrumb(supabaseCategory: string | null | undefined): {
  href: string
  label: string
} | null {
  const category = getCategoryFromSupabase(supabaseCategory)

  if (!category) {
    return null
  }

  return {
    href: `/${category.slug}`,
    label: category.displayName
  }
}

/**
 * Validate that all Supabase categories have mappings
 * Useful for testing/debugging
 */
export function validateCategoryMappings(): {
  valid: boolean
  unmappedCategories: string[]
  invalidMappings: Array<{ supabaseCategory: string; slug: string; error: string }>
} {
  const unmappedCategories: string[] = []
  const invalidMappings: Array<{ supabaseCategory: string; slug: string; error: string }> = []

  for (const [supabaseCategory, slug] of Object.entries(SUPABASE_TO_CATEGORY_SLUG)) {
    try {
      getCategoryConfig(slug)
    } catch (error) {
      invalidMappings.push({
        supabaseCategory,
        slug,
        error: error instanceof Error ? error.message : String(error)
      })
    }
  }

  return {
    valid: unmappedCategories.length === 0 && invalidMappings.length === 0,
    unmappedCategories,
    invalidMappings
  }
}
