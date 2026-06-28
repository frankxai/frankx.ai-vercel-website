import { NextRequest, NextResponse } from 'next/server'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const AUDIENCE_ID = '4d2e913e-6903-4dd4-8749-c02cdb844331'
const FROM_EMAIL = 'Frank <frank@mail.frankx.ai>'
// frank@mail.frankx.ai is the Resend SEND-ONLY subdomain — does NOT receive mail.
// Notifications must land at the IONOS-hosted root domain inbox (frank@frankx.ai)
// or whatever OPERATOR_EMAIL env var points at (e.g., a Gmail). Fixed 2026-05-22.
const NOTIFY_EMAIL = process.env.OPERATOR_EMAIL || process.env.RESEND_FROM_EMAIL || 'frank@frankx.ai'

const VALID_TRACKS = ['portfolio', 'product', 'creator']

export async function POST(request: NextRequest) {
  try {
    const { name, email, linkedin, track, projectIdea, whyYou, commitTime, commitContent } =
      await request.json()

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Please enter your full name.' }, { status: 400 })
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }
    if (!track || !VALID_TRACKS.includes(track)) {
      return NextResponse.json({ error: 'Please select a valid track.' }, { status: 400 })
    }
    if (!projectIdea || typeof projectIdea !== 'string' || projectIdea.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please describe your project idea (at least a few sentences).' },
        { status: 400 }
      )
    }
    if (!whyYou || typeof whyYou !== 'string' || whyYou.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please tell us why you want to join (at least a few sentences).' },
        { status: 400 }
      )
    }
    if (!commitTime || !commitContent) {
      return NextResponse.json(
        { error: 'Please confirm both commitments to proceed.' },
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

    const trackLabel =
      track === 'portfolio' ? 'Portfolio Builder'
      : track === 'product' ? 'Product Launcher'
      : 'Creator & Community'

    // 1. Add applicant to Resend audience
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
          first_name: name.trim().split(' ')[0],
          last_name: name.trim().split(' ').slice(1).join(' ') || undefined,
          unsubscribed: false,
        }),
      }
    )

    if (!contactResponse.ok && contactResponse.status !== 409) {
      const errorData = await contactResponse.json()
      console.error('Resend contact error:', errorData)
    }

    // 2. Send notification email to Frank
    const applicationHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0b; color: #e2e8f0; padding: 40px 20px;">
  <div style="max-width: 560px; margin: 0 auto; background: #1a1a1b; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px;">
      <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #06b6d4, #8b5cf6); display: flex; align-items: center; justify-content: center; font-size: 18px;">&#127891;</div>
      <div>
        <h1 style="font-size: 22px; margin: 0; color: #ffffff;">Cohort Application</h1>
        <p style="font-size: 13px; margin: 0; color: #64748b;">AI Creator Accelerator — Batch 1</p>
      </div>
    </div>

    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 10px 0; color: #94a3b8; width: 110px; vertical-align: top; font-size: 14px;">Name</td>
        <td style="padding: 10px 0; color: #ffffff; font-size: 14px;">${name.trim()}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; color: #94a3b8; vertical-align: top; font-size: 14px;">Email</td>
        <td style="padding: 10px 0; color: #ffffff; font-size: 14px;"><a href="mailto:${email.trim()}" style="color: #06b6d4;">${email.trim()}</a></td>
      </tr>
      <tr>
        <td style="padding: 10px 0; color: #94a3b8; vertical-align: top; font-size: 14px;">LinkedIn</td>
        <td style="padding: 10px 0; color: #ffffff; font-size: 14px;">${linkedin?.trim() ? `<a href="${linkedin.trim()}" style="color: #06b6d4;">${linkedin.trim()}</a>` : '<span style="color: #64748b;">Not provided</span>'}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; color: #94a3b8; vertical-align: top; font-size: 14px;">Track</td>
        <td style="padding: 10px 0; color: #ffffff; font-size: 14px;"><span style="background: rgba(6,182,212,0.15); color: #06b6d4; padding: 3px 10px; border-radius: 999px; font-size: 13px;">${trackLabel}</span></td>
      </tr>
      <tr>
        <td style="padding: 10px 0; color: #94a3b8; vertical-align: top; font-size: 14px;">Project Idea</td>
        <td style="padding: 10px 0; color: #ffffff; font-size: 14px; white-space: pre-wrap; line-height: 1.5;">${projectIdea.trim()}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; color: #94a3b8; vertical-align: top; font-size: 14px;">Why Join</td>
        <td style="padding: 10px 0; color: #ffffff; font-size: 14px; white-space: pre-wrap; line-height: 1.5;">${whyYou.trim()}</td>
      </tr>
    </table>

    <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; gap: 12px;">
      <a href="mailto:${email.trim()}?subject=AI Creator Accelerator — Welcome to the Cohort!&body=Hi ${name.trim().split(' ')[0]},%0A%0AGreat news — you're in! Welcome to Batch 1 of the AI Creator Accelerator.%0A%0A" style="display: inline-block; background: linear-gradient(to right, #06b6d4, #8b5cf6); color: white; text-decoration: none; padding: 10px 24px; border-radius: 999px; font-size: 14px; font-weight: 600;">Accept Applicant</a>
      <a href="mailto:${email.trim()}" style="display: inline-block; background: rgba(255,255,255,0.08); color: #94a3b8; text-decoration: none; padding: 10px 24px; border-radius: 999px; font-size: 14px;">Reply</a>
    </div>

    <p style="margin-top: 16px; font-size: 12px; color: #475569;">Submitted at ${new Date().toISOString()}</p>
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
        subject: `Cohort Application: ${name.trim()} — ${trackLabel}`,
        html: applicationHtml,
        reply_to: email.trim(),
      }),
    })

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json()
      console.error('Resend email error:', errorData)
    }

    // 3. Send confirmation email to applicant
    const confirmationHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0b; color: #e2e8f0; padding: 40px 20px;">
  <div style="max-width: 560px; margin: 0 auto; background: #1a1a1b; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px;">
    <h1 style="font-size: 24px; margin: 0 0 16px; color: #ffffff;">Application Received</h1>
    <p style="color: #94a3b8; line-height: 1.6; margin: 0 0 16px;">
      Hi ${name.trim().split(' ')[0]}, thanks for applying to the <strong style="color: #ffffff;">AI Creator Accelerator</strong>. I review every application personally and will get back to you soon.
    </p>
    <p style="color: #94a3b8; line-height: 1.6; margin: 0 0 8px;">
      <strong style="color: #ffffff;">Your track:</strong> ${trackLabel}
    </p>
    <p style="color: #94a3b8; line-height: 1.6; margin: 0 0 24px;">
      While you wait, explore some resources:
    </p>
    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;">
      <a href="https://frankx.ai/books" style="color: #06b6d4; font-size: 14px; text-decoration: none;">Books</a>
      <span style="color: #334155;">·</span>
      <a href="https://frankx.ai/research" style="color: #06b6d4; font-size: 14px; text-decoration: none;">Research</a>
      <span style="color: #334155;">·</span>
      <a href="https://frankx.ai/gencreator" style="color: #06b6d4; font-size: 14px; text-decoration: none;">GenCreator</a>
      <span style="color: #334155;">·</span>
      <a href="https://frankx.ai/newsletter" style="color: #06b6d4; font-size: 14px; text-decoration: none;">Newsletter</a>
    </div>
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
        subject: 'AI Creator Accelerator — Application Received',
        html: confirmationHtml,
      }),
    }).catch((err) => console.error('Confirmation email error:', err))

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully.',
    })
  } catch (error) {
    console.error('Cohort application error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
