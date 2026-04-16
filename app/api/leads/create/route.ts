import { NextRequest, NextResponse } from 'next/server'
import { createPDFLead } from '@/lib/pdf-analytics'
import { notifyAdmin } from '@/lib/notify-admin'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const AUDIENCE_ID = '4d2e913e-6903-4dd4-8749-c02cdb844331'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validation
    if (!data.email || !data.name || !data.guideSlug || !data.guideTitle || !data.sessionId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Get metadata
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const referrer = request.headers.get('referer') || ''

    // Create lead
    const lead = await createPDFLead({
      email: data.email,
      name: data.name,
      guideSlug: data.guideSlug,
      guideTitle: data.guideTitle,
      company: data.company,
      role: data.role,
      primaryInterest: data.primaryInterest,
      referralSource: data.referralSource,
      sessionId: data.sessionId,
      userAgent,
      referrer
    })

    // Add to Resend audience (non-blocking)
    if (RESEND_API_KEY) {
      fetch(`https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          first_name: data.name?.split(' ')[0] || undefined,
          unsubscribed: false,
        }),
      }).catch((err) => console.error('Resend audience add error:', err))
    }

    // Notify admin (non-blocking)
    notifyAdmin({
      formType: 'pdf-lead',
      email: data.email,
      name: data.name,
      details: {
        Guide: data.guideTitle,
        Slug: data.guideSlug,
        ...(data.company ? { Company: data.company } : {}),
        ...(data.role ? { Role: data.role } : {}),
      },
    }).catch(console.error)

    return NextResponse.json({ success: true, lead })
  } catch (error) {
    console.error('Create lead error:', error)
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    )
  }
}
