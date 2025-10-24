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

export async function PUT(request: Request) {
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
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error('Error in PUT /api/admin/products:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
