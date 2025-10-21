import { generateLeadMagnetHTML } from '@/lib/lead-magnet-content'
import { NextResponse } from 'next/server'

export async function GET() {
  const html = generateLeadMagnetHTML()

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
}
