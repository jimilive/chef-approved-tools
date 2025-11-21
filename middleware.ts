import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl

  // Block old filter/type query parameters on category pages
  const filterParams = url.searchParams.get('filter')
  const typeParams = url.searchParams.get('type')

  if (filterParams || typeParams) {
    const categoryPages = ['/cookware', '/knives', '/appliances']

    if (categoryPages.includes(url.pathname)) {
      // Redirect to clean URL without query params
      const cleanUrl = new URL(url.pathname, url.origin)
      return NextResponse.redirect(cleanUrl, 301)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/cookware',
    '/knives',
    '/appliances',
  ],
}
