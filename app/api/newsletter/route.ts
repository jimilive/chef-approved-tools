import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { firstName, email, source, leadMagnet } = await request.json()

    if (!firstName) {
      return NextResponse.json(
        { error: 'First name is required' },
        { status: 400 }
      )
    }

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

    // ActiveCampaign API Integration
    const ACTIVECAMPAIGN_API_URL = process.env.ACTIVECAMPAIGN_API_URL
    const ACTIVECAMPAIGN_API_KEY = process.env.ACTIVECAMPAIGN_API_KEY

    if (!ACTIVECAMPAIGN_API_URL || !ACTIVECAMPAIGN_API_KEY) {
      console.error('Missing ActiveCampaign credentials')
      return NextResponse.json(
        { error: 'Email service configuration error' },
        { status: 500 }
      )
    }

    // Step 1: Create or update contact in ActiveCampaign
    const contactResponse = await fetch(
      `${ACTIVECAMPAIGN_API_URL}/api/3/contact/sync`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Api-Token': ACTIVECAMPAIGN_API_KEY,
        },
        body: JSON.stringify({
          contact: {
            email: email,
            firstName: firstName,
            fieldValues: [
              {
                field: '1', // Assuming field 1 is for source tracking - you'll configure this in ActiveCampaign
                value: source || 'website'
              }
            ]
          }
        }),
      }
    )

    const contactData = await contactResponse.json()

    if (!contactResponse.ok) {
      console.error('ActiveCampaign contact sync error:', contactData)
      throw new Error(`ActiveCampaign API error: ${contactData.message || 'Unknown error'}`)
    }

    const contactId = contactData.contact.id

    // Step 2: Subscribe to Lead Magnet Subscribers list (list ID = 1, adjust if needed)
    // This triggers the automation
    await fetch(
      `${ACTIVECAMPAIGN_API_URL}/api/3/contactLists`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Api-Token': ACTIVECAMPAIGN_API_KEY,
        },
        body: JSON.stringify({
          contactList: {
            list: 4, // Lead Magnet Subscribers list
            contact: contactId,
            status: 1 // 1 = subscribed
          }
        }),
      }
    )

    // Step 3: Add tags if provided
    if (source || leadMagnet) {
      const tags = [source, leadMagnet].filter(Boolean)

      for (const tag of tags) {
        // Create tag if it doesn't exist and associate with contact
        await fetch(
          `${ACTIVECAMPAIGN_API_URL}/api/3/contactTags`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Api-Token': ACTIVECAMPAIGN_API_KEY,
            },
            body: JSON.stringify({
              contactTag: {
                contact: contactId,
                tag: tag
              }
            }),
          }
        )
      }
    }

    // Log successful signup for your records
    console.log('Newsletter signup successful:', {
      firstName,
      email,
      source,
      leadMagnet,
      timestamp: new Date().toISOString(),
      activeCampaignId: contactId
    })

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed! Check your email for your free guide.',
      data: {
        firstName,
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