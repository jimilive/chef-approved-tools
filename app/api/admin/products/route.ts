import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Force this route to be dynamic (not prerendered at build time)
export const dynamic = 'force-dynamic'

// Helper function to get admin client (created at runtime, not build time)
function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase environment variables are not configured')
  }

  return createClient(supabaseUrl, supabaseKey)
}

function validateAuth(request: Request): boolean {
  const apiKey = process.env.ADMIN_API_KEY
  if (!apiKey) return false
  const authHeader = request.headers.get('authorization')
  return authHeader === `Bearer ${apiKey}`
}

/**
 * POST - Create a new competitor product (minimal fields for comparison tables)
 *
 * Body: {
 *   slug: string,           // e.g., 'ninja-foodi-11-in-1-pro'
 *   name: string,           // e.g., 'Ninja Foodi 11-in-1 Pro 6.5 Qt'
 *   brand: string,          // e.g., 'Ninja'
 *   category: string,       // e.g., 'appliances'
 *   affiliateUrl: string,   // The affiliate link URL
 *   vendor?: string          // Default: 'amazon'
 * }
 */
export async function POST(request: Request) {
  if (!validateAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const supabaseAdmin = getSupabaseAdmin()
  try {
    const body = await request.json()
    const { slug, name, brand, category, affiliateUrl, vendor = 'amazon' } = body

    // Validate required fields
    if (!slug || !name || !brand || !affiliateUrl) {
      return NextResponse.json(
        { error: 'Missing required fields: slug, name, brand, affiliateUrl' },
        { status: 400 }
      )
    }

    // Check if product already exists
    const { data: existing } = await supabaseAdmin
      .from('products')
      .select('id, slug')
      .eq('slug', slug)
      .single()

    if (existing) {
      // Update existing product's affiliate link
      const { data, error } = await supabaseAdmin
        .from('products')
        .update({
          affiliate_links: [{ url: affiliateUrl, vendor, isPrimary: true }],
          primary_affiliate: vendor,
          updated_at: new Date().toISOString()
        })
        .eq('slug', slug)
        .select()

      if (error) {
        console.error('Error updating product affiliate link:', error)
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        action: 'updated',
        message: `Updated affiliate link for existing product: ${slug}`,
        data
      })
    }

    // Create new minimal product entry
    const { data, error } = await supabaseAdmin
      .from('products')
      .insert({
        slug,
        name,
        brand,
        category: category || 'appliances',
        affiliate_links: [{ url: affiliateUrl, vendor, isPrimary: true }],
        primary_affiliate: vendor,
        in_stock: true,
        // Minimal defaults for competitor products
        description: `${name} - Competitor product for comparison tables`,
        expert_opinion: '',
        pros: [],
        cons: [],
      })
      .select()

    if (error) {
      console.error('Error creating product:', error)
      return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      action: 'created',
      message: `Created new competitor product: ${slug}`,
      data
    })
  } catch (error) {
    console.error('Error in POST /api/admin/products:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  if (!validateAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const supabaseAdmin = getSupabaseAdmin()
  try {
    const body = await request.json()
    const { productId, affiliate_links, primary_affiliate } = body

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('products')
      .update({
        affiliate_links,
        primary_affiliate,
        updated_at: new Date().toISOString()
      })
      .eq('id', productId)
      .select()

    if (error) {
      console.error('Error updating product:', error)
      return NextResponse.json(
        { error: 'Failed to update product' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error in PUT /api/admin/products:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
