import { NextRequest, NextResponse } from 'next/server'
import { createPDFLead } from '@/lib/pdf-analytics'

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

    return NextResponse.json({ success: true, lead })
  } catch (error) {
    console.error('Create lead error:', error)
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    )
  }
}
