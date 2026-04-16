import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { storeLead } from '@/lib/kv'
import { emailRatelimit, getClientIdentifier } from '@/lib/ratelimit'
import { validateLeadData } from '@/lib/validation'
import { pdfDeliveryEmail } from '@/lib/email-templates'
import { notifyAdmin } from '@/lib/notify-admin'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting - 5 emails per 10 minutes per IP
    const identifier = getClientIdentifier(request)
    const { success: rateLimitOk } = await emailRatelimit.limit(identifier)

    if (!rateLimitOk) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a few minutes.' },
        { status: 429 }
      )
    }

    // Check if RESEND_API_KEY is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Email service is not configured. Please download directly or contact support.' },
        { status: 503 }
      )
    }

    // Lazy instantiation - only create Resend client when needed
    const resend = new Resend(process.env.RESEND_API_KEY)

    const {
      email,
      name,
      pdfTitle,
      pdfUrl,
      guideSlug,
      sessionId,
      company,
      role,
      primaryInterest,
      referralSource
    } = await request.json()

    // Validation
    if (!email || !name || !pdfTitle || !pdfUrl || !guideSlug || !sessionId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate and sanitize lead data
    const leadData = validateLeadData({
      email,
      name,
      company,
      role,
      primaryInterest,
      referralSource
    })

    if (!leadData) {
      return NextResponse.json(
        { error: 'Invalid email or input data' },
        { status: 400 }
      )
    }

    // Store lead in Vercel KV
    await storeLead({
      email: leadData.email,
      name: leadData.name,
      company: leadData.company,
      role: leadData.role,
      primaryInterest: leadData.primaryInterest,
      referralSource: leadData.referralSource,
      guideId: guideSlug
    })

    // Generate email from v3 design system
    const emailContent = pdfDeliveryEmail({
      recipientName: leadData.name,
      pdfTitle,
      pdfUrl,
    })

    // Send email with Resend
    const { data, error } = await resend.emails.send({
      from: 'Frank from FrankX.AI <frank@mail.frankx.ai>',
      to: [leadData.email],
      subject: emailContent.subject,
      html: emailContent.html,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email. Please try downloading directly.' },
        { status: 500 }
      )
    }

    // Notify admin (non-blocking)
    notifyAdmin({
      formType: 'pdf-lead',
      email: leadData.email,
      name: leadData.name,
      details: { 'PDF Title': pdfTitle, 'Guide Slug': guideSlug },
    }).catch(console.error)

    return NextResponse.json({ success: true, emailId: data?.id })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
