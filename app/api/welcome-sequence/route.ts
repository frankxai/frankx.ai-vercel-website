import { NextRequest, NextResponse } from 'next/server'
import { welcomeEmail1, welcomeEmail2, welcomeEmail3 } from '@/lib/email-templates-welcome'

const RESEND_API_KEY = process.env.RESEND_API_KEY

export async function POST(request: NextRequest) {
  try {
    const { email, name, step } = await request.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    if (!step || ![1, 2, 3].includes(step)) {
      return NextResponse.json(
        { error: 'Step must be 1, 2, or 3' },
        { status: 400 }
      )
    }

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured')
      return NextResponse.json(
        { error: 'Email service not configured. Please try again later.' },
        { status: 500 }
      )
    }

    const recipientName = name || 'Creator'

    let template: { subject: string; html: string }
    switch (step) {
      case 1:
        template = welcomeEmail1({ recipientName })
        break
      case 2:
        template = welcomeEmail2({ recipientName })
        break
      case 3:
        template = welcomeEmail3({ recipientName })
        break
      default:
        return NextResponse.json(
          { error: 'Invalid step' },
          { status: 400 }
        )
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Frank <frank@mail.frankx.ai>',
        to: email,
        subject: template.subject,
        html: template.html,
      }),
    })

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json()
      console.error('Resend API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      )
    }

    const data = await resendResponse.json()

    return NextResponse.json({
      success: true,
      message: `Welcome email ${step} sent successfully`,
      emailId: data.id,
    })
  } catch (error) {
    console.error('Welcome sequence error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
