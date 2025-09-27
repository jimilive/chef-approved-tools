import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, source, leadMagnet } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Email Octopus API Integration
    const EMAILOCTOPUS_API_KEY = process.env.EMAILOCTOPUS_API_KEY
    const EMAILOCTOPUS_LIST_ID = process.env.EMAILOCTOPUS_LIST_ID

    if (!EMAILOCTOPUS_API_KEY || !EMAILOCTOPUS_LIST_ID) {
      console.error('Missing Email Octopus credentials')
      return NextResponse.json(
        { error: 'Email service configuration error' },
        { status: 500 }
      )
    }

    // Subscribe to Email Octopus
    const emailOctopusResponse = await fetch(
      `https://emailoctopus.com/api/1.6/lists/${EMAILOCTOPUS_LIST_ID}/contacts`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: EMAILOCTOPUS_API_KEY,
          email_address: email,
          fields: {
            FirstName: '', // Email Octopus will ask for this if you set it up
            LastName: '',
          },
          tags: [source, leadMagnet].filter(Boolean),
          status: 'SUBSCRIBED',
        }),
      }
    )

    const emailOctopusData = await emailOctopusResponse.json()

    if (!emailOctopusResponse.ok) {
      // Handle duplicate email (common and not really an error)
      if (emailOctopusData.error?.code === 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {
        return NextResponse.json({
          success: true,
          message: 'You are already subscribed to our newsletter!',
          data: { email }
        })
      }

      console.error('Email Octopus error:', emailOctopusData)
      throw new Error(`Email Octopus API error: ${emailOctopusData.error?.message || 'Unknown error'}`)
    }

    // Log successful signup for your records
    console.log('Newsletter signup successful:', {
      email,
      source,
      leadMagnet,
      timestamp: new Date().toISOString(),
      emailOctopusId: emailOctopusData.id
    })

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter! Check your email for confirmation.',
      data: {
        email,
        source,
        leadMagnet
      }
    })

  } catch (error) {
    console.error('Newsletter signup error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    )
  }
}