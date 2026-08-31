import { NextRequest, NextResponse } from 'next/server'

import { processIntake } from '@/lib/contact-intake'
import { getClientIdentifier, leadRatelimit } from '@/lib/ratelimit'

const VALID_CONTEXTS = new Set([
  'founder',
  'solopreneur',
  'coach',
  'executive',
  'advisor',
  'other',
])
const VALID_RELATIONSHIPS = new Set([
  'none',
  'customer',
  'partner',
  'employee',
  'other',
])
const VALID_TIMINGS = new Set(['next-quarter', 'later', 'exploring'])
const FIELD_LIMITS = {
  name: 200,
  email: 200,
  company: 200,
  link: 500,
  founderContext: 50,
  decision: 1200,
  tried: 900,
  firstCall: 900,
  oracleRelationship: 50,
  timing: 50,
} as const

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    try {
      const { success } = await leadRatelimit.limit(
        getClientIdentifier(request),
      )
      if (!success)
        return NextResponse.json(
          { error: 'Too many submissions. Please try again later.' },
          { status: 429 },
        )
    } catch (error) {
      console.error('Founder Circle rate-limit check failed:', error)
      return NextResponse.json(
        {
          error:
            'The application service is temporarily unavailable. Please try again shortly or email frank@frankx.ai.',
        },
        { status: 503 },
      )
    }

    const body = await request.json()
    if (typeof body.website === 'string' && body.website.trim() !== '') {
      return NextResponse.json({
        success: true,
        message: 'Application received.',
      })
    }

    const rawApplication = {
      name: String(body.name ?? ''),
      email: String(body.email ?? ''),
      company: String(body.company ?? ''),
      link: body.link ? String(body.link) : '',
      founderContext: String(body.founderContext ?? ''),
      decision: String(body.decision ?? ''),
      tried: String(body.tried ?? ''),
      firstCall: String(body.firstCall ?? ''),
      oracleRelationship: String(body.oracleRelationship ?? ''),
      timing: String(body.timing ?? ''),
    }
    const oversizedField = Object.entries(FIELD_LIMITS).find(
      ([key, limit]) =>
        rawApplication[key as keyof typeof rawApplication].length > limit,
    )
    if (oversizedField) {
      return NextResponse.json(
        {
          error: `The ${oversizedField[0]} field is too long. Please shorten it and submit again.`,
        },
        { status: 400 },
      )
    }
    const application = Object.fromEntries(
      Object.entries(rawApplication).map(([key, value]) => [key, value.trim()]),
    ) as typeof rawApplication

    if (
      !application.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(application.email)
    ) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 },
      )
    }
    if (
      !application.name ||
      !application.company ||
      !application.decision ||
      !application.tried ||
      !application.firstCall
    ) {
      return NextResponse.json(
        { error: 'Please complete every required written field.' },
        { status: 400 },
      )
    }
    if (body.consent !== true) {
      return NextResponse.json(
        { error: 'Please confirm consent so Frank can review and respond.' },
        { status: 400 },
      )
    }
    if (
      !VALID_CONTEXTS.has(application.founderContext) ||
      !VALID_RELATIONSHIPS.has(application.oracleRelationship) ||
      !VALID_TIMINGS.has(application.timing)
    ) {
      return NextResponse.json(
        { error: 'Please complete every required selection.' },
        { status: 400 },
      )
    }

    const message = [
      'FOUNDER’S CIRCLE APPLICATION',
      `Founder context: ${application.founderContext}`,
      `Timing: ${application.timing}`,
      `Oracle relationship: ${application.oracleRelationship}`,
      `Link: ${application.link || 'Not provided'}`,
      '',
      'Consequential decision:',
      application.decision,
      '',
      'Already tried or ruled out:',
      application.tried,
      '',
      'A valuable first session:',
      application.firstCall,
    ].join('\n')

    const result = await processIntake(
      {
        intent: 'advisory',
        name: application.name,
        email: application.email,
        company: application.company,
        message,
        source: '/founders-circle/apply',
        consent: true,
      },
      {
        referrer: request.headers.get('referer'),
        userAgent: request.headers.get('user-agent'),
      },
    )

    if (!result.ok) {
      return NextResponse.json(
        {
          error:
            'We hit a delivery hiccup. Please try again or email frank@frankx.ai.',
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      ackSent: result.entry.ack === 'sent',
      message: 'Application received.',
    })
  } catch (error) {
    console.error('Founder Circle application error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 },
    )
  }
}
