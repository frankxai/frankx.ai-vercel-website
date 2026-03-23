import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { testEmail, newsletterWelcomeEmail, communityBroadcastEmail } from '@/lib/email-templates'

/**
 * Test Email API Endpoint
 *
 * Usage:
 * POST /api/test-email
 * Body: {
 *   recipientEmail: "test@example.com",
 *   recipientName: "Test User",
 *   templateType: "test" | "welcome" | "broadcast",
 *   testMessage?: "Custom message for test email",
 *   headline?: "Headline for broadcast",
 *   bodyContent?: "Body content for broadcast"
 * }
 */

export async function POST(request: NextRequest) {
  try {
    // Check if RESEND_API_KEY is configured
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        {
          error: 'RESEND_API_KEY is not configured',
          message: 'Add RESEND_API_KEY to your .env.local file or Vercel environment variables',
          setup: 'Get your API key from https://resend.com/api-keys'
        },
        { status: 503 }
      )
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    const {
      recipientEmail,
      recipientName = 'Creator',
      templateType = 'test',
      testMessage,
      headline,
      bodyContent,
      ctaText,
      ctaUrl
    } = await request.json()

    // Validation
    if (!recipientEmail) {
      return NextResponse.json(
        { error: 'recipientEmail is required' },
        { status: 400 }
      )
    }

    // Generate email based on template type
    let email: { subject: string; html: string }

    switch (templateType) {
      case 'welcome':
        email = newsletterWelcomeEmail({ recipientName })
        break

      case 'broadcast':
        if (!headline || !bodyContent) {
          return NextResponse.json(
            { error: 'headline and bodyContent are required for broadcast emails' },
            { status: 400 }
          )
        }
        email = communityBroadcastEmail({
          recipientName,
          headline,
          bodyContent,
          ctaText,
          ctaUrl
        })
        break

      case 'test':
      default:
        email = testEmail({ recipientName, testMessage })
        break
    }

    // Get sender email from env or use default
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'frank@frankx.ai'

    // Send email
    const { data, error } = await resend.emails.send({
      from: `Frank from FrankX.AI <${fromEmail}>`,
      to: [recipientEmail],
      subject: email.subject,
      html: email.html
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        {
          error: 'Failed to send email',
          details: error,
          troubleshooting: {
            1: 'Verify RESEND_API_KEY is correct',
            2: 'Ensure sender email is verified in Resend dashboard',
            3: 'Check Resend dashboard for delivery logs: https://resend.com/emails'
          }
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      emailId: data?.id,
      message: `${templateType} email sent successfully to ${recipientEmail}`,
      template: templateType,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Test email error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Support GET request for quick testing via browser
export async function GET(request: NextRequest) {
  return NextResponse.json({
    endpoint: '/api/test-email',
    method: 'POST',
    description: 'Test email sending with FrankX.AI templates',
    templates: {
      test: 'Simple test email to verify configuration',
      welcome: 'Newsletter welcome email',
      broadcast: 'Community broadcast/update email'
    },
    exampleRequest: {
      recipientEmail: 'your@email.com',
      recipientName: 'Your Name',
      templateType: 'test',
      testMessage: 'Optional custom message'
    },
    setup: {
      step1: 'Get API key from https://resend.com/api-keys',
      step2: 'Add RESEND_API_KEY to .env.local or Vercel env vars',
      step3: 'Verify sender email in Resend dashboard',
      step4: 'Send POST request to this endpoint'
    }
  })
}
