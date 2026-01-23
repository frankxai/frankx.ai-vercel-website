/**
 * Newsletter Subscribe API
 * POST /api/newsletter/subscribe
 *
 * Adds a contact to Resend Audiences
 */

import { NextRequest, NextResponse } from 'next/server'
import { addContact } from '@/lib/newsletter'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, firstName, lastName, segment } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    const result = await addContact({
      email,
      firstName,
      lastName,
      segment,
    })

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to subscribe' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed!',
      contactId: result.contactId,
    })
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
