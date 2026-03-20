import { NextRequest, NextResponse } from 'next/server'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const AUDIENCE_ID = '4d2e913e-6903-4dd4-8749-c02cdb844331'
const FROM_EMAIL = 'Frank <frank@mail.frankx.ai>'
const NOTIFY_EMAIL = process.env.RESEND_FROM_EMAIL || 'frank@mail.frankx.ai'

const VALID_FOCUS_AREAS = [
  'AI Architecture',
  'Creator Business',
  'Music Production',
  'Content Systems',
]

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, focus, situation } = await request.json()

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please enter your full name.' },
        { status: 400 }
      )
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    if (!focus || !VALID_FOCUS_AREAS.includes(focus)) {
      return NextResponse.json(
        { error: 'Please select a valid focus area.' },
        { status: 400 }
      )
    }

    if (!situation || typeof situation !== 'string' || situation.trim().length < 20) {
      return NextResponse.json(
        { error: 'Please tell us more about your situation (at least a few sentences).' },
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

    // 1. Add applicant to Resend audience as a coaching contact
    const contactResponse = await fetch(
      `https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          first_name: name.trim(),
          unsubscribed: false,
        }),
      }
    )

    if (!contactResponse.ok) {
      const errorData = await contactResponse.json()
      console.error('Resend contact error:', errorData)
      // 409 = already exists, which is fine for coaching applications
      if (contactResponse.status !== 409) {
        return NextResponse.json(
          { error: 'Failed to process your application. Please try again.' },
          { status: 500 }
        )
      }
    }

    // 2. Send notification email to Frank with the application details
    const applicationHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0b; color: #e2e8f0; padding: 40px 20px;">
  <div style="max-width: 560px; margin: 0 auto; background: #1a1a1b; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px;">
    <h1 style="font-size: 24px; margin: 0 0 24px; color: #ffffff;">New Coaching Application</h1>

    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; color: #94a3b8; width: 120px; vertical-align: top;">Name</td>
        <td style="padding: 8px 0; color: #ffffff;">${name.trim()}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #94a3b8; vertical-align: top;">Email</td>
        <td style="padding: 8px 0; color: #ffffff;"><a href="mailto:${email.trim()}" style="color: #AB47C7;">${email.trim()}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #94a3b8; vertical-align: top;">Company/Role</td>
        <td style="padding: 8px 0; color: #ffffff;">${company?.trim() || 'Not provided'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #94a3b8; vertical-align: top;">Focus Area</td>
        <td style="padding: 8px 0; color: #ffffff;">${focus}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #94a3b8; vertical-align: top;">Situation</td>
        <td style="padding: 8px 0; color: #ffffff; white-space: pre-wrap;">${situation.trim()}</td>
      </tr>
    </table>

    <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1);">
      <a href="mailto:${email.trim()}" style="display: inline-block; background: linear-gradient(to right, #AB47C7, #43BFE3); color: white; text-decoration: none; padding: 10px 24px; border-radius: 999px; font-size: 14px; font-weight: 600;">Reply to Applicant</a>
    </div>
  </div>
</body>
</html>`

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: NOTIFY_EMAIL,
        subject: `Coaching Application: ${name.trim()} — ${focus}`,
        html: applicationHtml,
        reply_to: email.trim(),
      }),
    })

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json()
      console.error('Resend email error:', errorData)
      // Still return success to the user — the contact was created
    }

    // 3. Send confirmation email to the applicant
    const confirmationHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0b; color: #e2e8f0; padding: 40px 20px;">
  <div style="max-width: 560px; margin: 0 auto; background: #1a1a1b; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px;">
    <h1 style="font-size: 24px; margin: 0 0 16px; color: #ffffff;">Application Received</h1>
    <p style="color: #94a3b8; line-height: 1.6; margin: 0 0 16px;">
      Hi ${name.trim().split(' ')[0]}, thanks for applying for coaching. I review every application personally and will get back to you within a few business days.
    </p>
    <p style="color: #94a3b8; line-height: 1.6; margin: 0 0 24px;">
      In the meantime, feel free to explore <a href="https://frankx.ai/research" style="color: #AB47C7;">my research</a> and <a href="https://frankx.ai/newsletter" style="color: #AB47C7;">subscribe to the newsletter</a> if you haven't already.
    </p>
    <p style="color: #64748b; font-size: 14px; margin: 0;">
      — Frank Riemer
    </p>
  </div>
</body>
</html>`

    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: email.trim(),
        subject: 'Your coaching application has been received',
        html: confirmationHtml,
      }),
    }).catch((err) => console.error('Confirmation email error:', err))

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully.',
    })
  } catch (error) {
    console.error('Coaching application error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
