import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Get parameters from URL
    const title = searchParams.get('title') || 'Chef Approved Tools'
    const rating = searchParams.get('rating') || '5.0'
    const testingPeriod = searchParams.get('testingPeriod') || 'Professional Testing'
    const tier = searchParams.get('tier') || '1'

    // Tier colors
    const tierColors = {
      '1': { bg: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)', text: 'Professional Kitchen Tested' },
      '2': { bg: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', text: 'Home Tested' },
      '3': { bg: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', text: 'Budget Pick' }
    }

    const tierConfig = tierColors[tier as keyof typeof tierColors] || tierColors['1']

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#F9FAFB',
            padding: '60px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {/* Header with Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <span style={{ color: '#000' }}>Chef </span>
              <span style={{ color: '#F59E0B', marginLeft: '8px' }}>Approved</span>
            </div>
          </div>

          {/* Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            {/* Tier Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '24px',
              }}
            >
              <div
                style={{
                  background: tierConfig.bg,
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                🛡️ TIER {tier}: {tierConfig.text}
              </div>
            </div>

            {/* Product Title */}
            <div
              style={{
                fontSize: '56px',
                fontWeight: 'bold',
                color: '#111827',
                lineHeight: 1.2,
                marginBottom: '24px',
                maxWidth: '1000px',
              }}
            >
              {title}
            </div>

            {/* Rating & Testing Period */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '32px',
                fontSize: '28px',
                color: '#4B5563',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#FBBF24' }}>⭐⭐⭐⭐⭐</span>
                <span style={{ fontWeight: 'bold', color: '#111827' }}>{rating}/5</span>
              </div>
              <div style={{ color: '#6B7280' }}>|</div>
              <div>{testingPeriod}</div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '2px solid #E5E7EB',
              paddingTop: '24px',
              fontSize: '20px',
              color: '#6B7280',
            }}
          >
            <div>By Chef Scott Bradley • 24 Years Professional Experience</div>
            <div style={{ fontWeight: 'bold', color: '#F59E0B' }}>chefapprovedtools.com</div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.error(e)
    return new Response(`Failed to generate image: ${e.message}`, {
      status: 500,
    })
  }
}
