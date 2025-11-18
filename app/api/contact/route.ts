import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
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

    // Validate message length
    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Message is too short' },
        { status: 400 }
      )
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: 'Message is too long' },
        { status: 400 }
      )
    }

    // Send email notification via Resend
    try {
      await resend.emails.send({
        from: 'contact@chefapprovedtools.com',
        to: 'scott@chefapprovedtools.com',
        subject: `Contact Form: ${subject || 'No Subject'}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p style="color: #666; font-size: 12px;">Submitted at: ${new Date().toISOString()}</p>
        `
      })
    } catch (emailError) {
      console.error('Resend email error:', emailError)
      // Continue even if email fails - still save to ActiveCampaign
    }

    // ActiveCampaign API Integration
    const ACTIVECAMPAIGN_API_URL = process.env.ACTIVECAMPAIGN_API_URL
    const ACTIVECAMPAIGN_API_KEY = process.env.ACTIVECAMPAIGN_API_KEY

    if (!ACTIVECAMPAIGN_API_URL || !ACTIVECAMPAIGN_API_KEY) {
      console.error('Missing ActiveCampaign credentials')
      // Don't fail the request - email was already sent
      return NextResponse.json({
        success: true,
        message: 'Message sent successfully! I\'ll respond within 2-3 business days.',
      })
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
            firstName: name.split(' ')[0] || name,
            lastName: name.split(' ').slice(1).join(' ') || '',
            fieldValues: [
              {
                field: '2', // Contact form message field - configure in ActiveCampaign
                value: `Subject: ${subject || 'No subject'}\n\nMessage: ${message}`
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

    // Step 2: Add to Contact Form Submissions list (list ID = 5, adjust if needed)
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
            list: 5, // Contact Form Submissions list
            contact: contactId,
            status: 1 // 1 = subscribed
          }
        }),
      }
    )

    // Step 3: Add tags for subject and source
    const tags = ['contact-form', subject || 'general-inquiry']

    for (const tag of tags) {
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

    // Log successful submission
    console.log('Contact form submission:', {
      name,
      email,
      subject,
      message: message.substring(0, 100) + '...',
      timestamp: new Date().toISOString(),
      activeCampaignId: contactId
    })

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully! I\'ll respond within 2-3 business days.',
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}
