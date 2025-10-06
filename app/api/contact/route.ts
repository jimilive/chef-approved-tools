import { NextRequest, NextResponse } from 'next/server'

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

    // TODO: Integrate with your email service (Email Octopus, SendGrid, etc.)
    // For now, log the contact form submission
    console.log('Contact form submission:', {
      name,
      email,
      subject,
      message: message.substring(0, 100) + '...', // Log first 100 chars
      timestamp: new Date().toISOString()
    })

    // Option 1: Send email using Email Octopus transactional emails (if available)
    // Option 2: Send to your personal email using SendGrid, Resend, or similar
    // Option 3: Store in a database for later review

    // For demonstration, you could send this to Email Octopus as a tagged contact:
    const EMAILOCTOPUS_API_KEY = process.env.EMAILOCTOPUS_API_KEY
    const EMAILOCTOPUS_LIST_ID = process.env.EMAILOCTOPUS_LIST_ID

    if (EMAILOCTOPUS_API_KEY && EMAILOCTOPUS_LIST_ID) {
      try {
        // Add the contact to your Email Octopus list with contact form data in tags
        await fetch(
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
                FirstName: name.split(' ')[0] || name,
                LastName: name.split(' ').slice(1).join(' ') || '',
              },
              tags: ['contact-form', subject || 'general-inquiry'],
              status: 'SUBSCRIBED',
            }),
          }
        )
      } catch (emailError) {
        // Don't fail the whole request if email list addition fails
        console.error('Email Octopus contact addition failed:', emailError)
      }
    }

    // IMPORTANT: You should implement actual email sending here
    // Recommended services:
    // - Resend (https://resend.com) - Simple and developer-friendly
    // - SendGrid - Enterprise-grade
    // - AWS SES - Cost-effective at scale

    // Example with Resend (you'd need to install: npm install resend)
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'contact@chefapprovedtools.com',
    //   to: 'scott@chefapprovedtools.com',
    //   subject: `Contact Form: ${subject}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Subject:</strong> ${subject}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message.replace(/\n/g, '<br>')}</p>
    //   `
    // })

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
