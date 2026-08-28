import { NextRequest, NextResponse } from 'next/server'

import { processIntake } from '@/lib/contact-intake'
import { getClientIdentifier, leadRatelimit } from '@/lib/ratelimit'

const VALID_STAGES = ['idea', 'pre-launch', 'revenue', 'scaling'] as const
const FIELD_LIMITS = {
  name: 200,
  email: 200,
  company: 200,
  building: 1500,
  why: 1500,
  stage: 50,
  link: 500,
} as const

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    try {
      const { success } = await leadRatelimit.limit(getClientIdentifier(request))
      if (!success) {
        return NextResponse.json(
          { error: 'Too many submissions. Please try again later.' },
          { status: 429 }
        )
      }
    } catch (error) {
      console.error('Foundry rate-limit check failed:', error)
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
      return NextResponse.json({ success: true, message: 'Application received.' })
    }

    const rawInput = {
      name: String(body.name ?? ''),
      email: String(body.email ?? ''),
      company: String(body.company ?? ''),
      building: String(body.building ?? ''),
      why: String(body.why ?? ''),
      stage: String(body.stage ?? ''),
      link: body.link ? String(body.link) : '',
    }
    const oversizedField = Object.entries(FIELD_LIMITS).find(
      ([key, limit]) => rawInput[key as keyof typeof rawInput].length > limit,
    )
    if (oversizedField) {
      return NextResponse.json(
        {
          error: `The ${oversizedField[0]} field is too long. Please shorten it and submit again.`,
        },
        { status: 400 },
      )
    }
    const input = Object.fromEntries(
      Object.entries(rawInput).map(([key, value]) => [key, value.trim()]),
    ) as typeof rawInput

    if (!input.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }
    if (!input.name || !input.company || !input.building || !input.why) {
      return NextResponse.json(
        { error: 'Please complete every required field.' },
        { status: 400 }
      )
    }
    if (body.consent !== true) {
      return NextResponse.json(
        { error: 'Please confirm consent so Frank can review and respond.' },
        { status: 400 }
      )
    }
    if (!VALID_STAGES.includes(input.stage as (typeof VALID_STAGES)[number])) {
      return NextResponse.json({ error: 'Please select a stage.' }, { status: 400 })
    }

    const message = [
      'FOUNDRY APPLICATION',
      `Stage: ${input.stage}`,
      `Link: ${input.link || 'Not provided'}`,
      '',
      'What they are building:',
      input.building,
      '',
      'Why it matters:',
      input.why,
    ].join('\n')

    const result = await processIntake(
      {
        intent: 'sprint',
        name: input.name,
        email: input.email,
        company: input.company,
        message,
        source: '/foundry',
        consent: true,
      },
      {
        referrer: request.headers.get('referer'),
        userAgent: request.headers.get('user-agent'),
      },
    )

    if (!result.ok) {
      return NextResponse.json(
        { error: 'We hit a delivery hiccup. Please try again or email frank@frankx.ai.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      ackSent: result.entry.ack === 'sent',
      message: 'Application received.',
    })
  } catch (error) {
    console.error('Foundry application error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
