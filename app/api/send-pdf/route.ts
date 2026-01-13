import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { email, name, pdfTitle, pdfUrl } = await request.json()

    // Validation
    if (!email || !name || !pdfTitle || !pdfUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send email with Resend
    const { data, error } = await resend.emails.send({
      from: 'Frank from FrankX.AI <frank@frankx.ai>',
      to: [email],
      subject: `Your ${pdfTitle} Guide from FrankX.AI`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pdfTitle}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0f1e; color: #f1f5f9;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 40px;">
      <div style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #06b6d4 0%, #9333ea 100%); border-radius: 12px; margin-bottom: 24px;">
        <span style="font-size: 24px; font-weight: 700; color: white; letter-spacing: -0.02em;">FrankX.AI</span>
      </div>
    </div>

    <!-- Main content -->
    <div style="background: linear-gradient(to bottom, #111827, #0a0f1e); border: 1.5px solid rgba(6, 182, 212, 0.2); border-radius: 16px; padding: 32px; margin-bottom: 32px;">
      <h1 style="font-size: 28px; font-weight: 700; color: white; margin: 0 0 16px 0; line-height: 1.2;">
        Hey ${name}! 👋
      </h1>

      <p style="font-size: 16px; color: #94a3b8; line-height: 1.6; margin: 0 0 24px 0;">
        Here's your <strong style="color: white;">${pdfTitle}</strong> guide. This is the same framework I use to create transformative AI experiences.
      </p>

      <div style="background: rgba(6, 182, 212, 0.1); border: 1.5px solid rgba(6, 182, 212, 0.3); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
        <p style="font-size: 14px; color: #22d3ee; margin: 0 0 16px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;">
          What's Inside
        </p>
        <ul style="margin: 0; padding-left: 24px; color: #cbd5e1;">
          <li style="margin-bottom: 8px;">Proven frameworks used in production</li>
          <li style="margin-bottom: 8px;">Real-world examples and templates</li>
          <li style="margin-bottom: 8px;">Step-by-step implementation guides</li>
        </ul>
      </div>

      <div style="text-align: center; margin: 32px 0;">
        <a href="${pdfUrl}"
           style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #06b6d4 0%, #9333ea 100%); color: white; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 16px; box-shadow: 0 8px 24px rgba(6, 182, 212, 0.3);">
          Download ${pdfTitle} →
        </a>
      </div>

      <p style="font-size: 14px; color: #64748b; margin: 24px 0 0 0; line-height: 1.6;">
        Questions? Just hit reply. I read every email.
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding-top: 32px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
      <p style="font-size: 12px; color: #64748b; margin: 0 0 16px 0;">
        <strong style="color: #94a3b8;">Frank Guzman</strong><br>
        Musician turned AI Architect at Oracle<br>
        500+ AI songs | Enterprise AI Systems
      </p>

      <div style="margin: 16px 0;">
        <a href="https://frankx.ai" style="color: #22d3ee; text-decoration: none; font-size: 14px; margin: 0 12px;">
          frankx.ai
        </a>
        <span style="color: #64748b;">|</span>
        <a href="https://twitter.com/frankxai" style="color: #22d3ee; text-decoration: none; font-size: 14px; margin: 0 12px;">
          Twitter
        </a>
        <span style="color: #64748b;">|</span>
        <a href="https://linkedin.com/in/frankguzmanai" style="color: #22d3ee; text-decoration: none; font-size: 14px; margin: 0 12px;">
          LinkedIn
        </a>
      </div>

      <p style="font-size: 11px; color: #64748b; margin: 24px 0 0 0;">
        You're receiving this because you requested ${pdfTitle} from FrankX.AI
      </p>
    </div>
  </div>
</body>
</html>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
