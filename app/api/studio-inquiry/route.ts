import { NextRequest, NextResponse } from 'next/server'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM_EMAIL = 'Frank <frank@mail.frankx.ai>'
// frank@mail.frankx.ai is the Resend SEND-ONLY subdomain — does NOT receive mail.
// Notification recipient: OPERATOR_EMAIL override → monitored default. Same
// routing rule as app/api/coaching-apply/route.ts (fixed 2026-05-22).
const NOTIFY_EMAIL = process.env.OPERATOR_EMAIL || 'frank@frankx.ai'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, message } = await request.json()

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 })
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    if (!message || typeof message !== 'string' || message.trim().length < 20) {
      return NextResponse.json(
        { error: 'Please describe your challenge in a few sentences so the reply can be specific.' },
        { status: 400 }
      )
    }

    if (company !== undefined && typeof company !== 'string') {
      return NextResponse.json({ error: 'Invalid company field.' }, { status: 400 })
    }

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured')
      return NextResponse.json(
        { error: 'Email service not configured. Please email frank@frankx.ai directly.' },
        { status: 500 }
      )
    }

    const safeName = escapeHtml(name.trim())
    const safeEmail = escapeHtml(email.trim())
    const safeCompany = escapeHtml((company || '').trim())
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, '<br/>')

    const inquiryHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0b; color: #e2e8f0; padding: 40px 20px;">
  <div style="max-width: 560px; margin: 0 auto; background: #1a1a1b; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px;">
    <h1 style="font-size: 24px; margin: 0 0 24px; color: #ffffff;">New Studio Inquiry</h1>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; color: #94a3b8; width: 120px; vertical-align: top;">Name</td>
        <td style="padding: 8px 0; color: #ffffff;">${safeName}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #94a3b8; vertical-align: top;">Email</td>
        <td style="padding: 8px 0; color: #ffffff;"><a href="mailto:${safeEmail}" style="color: #AB47C7;">${safeEmail}</a></td>
      </tr>
      ${safeCompany ? `<tr>
        <td style="padding: 8px 0; color: #94a3b8; vertical-align: top;">Company</td>
        <td style="padding: 8px 0; color: #ffffff;">${safeCompany}</td>
      </tr>` : ''}
      <tr>
        <td style="padding: 8px 0; color: #94a3b8; vertical-align: top;">Message</td>
        <td style="padding: 8px 0; color: #ffffff;">${safeMessage}</td>
      </tr>
    </table>
    <p style="margin: 24px 0 0; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1); color: #64748b; font-size: 13px;">
      Sent from the /work-with-me inquiry form on frankx.ai
    </p>
  </div>
</body>
</html>`

    const sendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: NOTIFY_EMAIL,
        reply_to: email.trim(),
        subject: `Studio inquiry — ${name.trim()}${company ? ` (${company.trim()})` : ''}`,
        html: inquiryHtml,
      }),
    })

    if (!sendResponse.ok) {
      const errorData = await sendResponse.json()
      console.error('Resend send error:', errorData)
      return NextResponse.json(
        { error: 'Failed to send your message. Please email frank@frankx.ai directly.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Studio inquiry error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please email frank@frankx.ai directly.' },
      { status: 500 }
    )
  }
}
