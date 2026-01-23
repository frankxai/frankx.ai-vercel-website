import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { storeLead } from '@/lib/kv'
import { emailRatelimit, getClientIdentifier } from '@/lib/ratelimit'
import { validateLeadData } from '@/lib/validation'

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

    // Send email with Resend
    const { data, error } = await resend.emails.send({
      from: 'Frank from FrankX.AI <frank@frankx.ai>',
      to: [leadData.email],
      subject: `Your ${pdfTitle} Guide from FrankX.AI`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pdfTitle} - Your Creator Guide from FrankX.AI</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600&display=swap');
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0F172A; color: #f1f5f9;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 40px;">
      <div style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #06b6d4 0%, #8B5CF6 50%, #9333ea 100%); border-radius: 16px; margin-bottom: 24px; box-shadow: 0 8px 32px rgba(6, 182, 212, 0.3);">
        <span style="font-family: 'Poppins', sans-serif; font-size: 26px; font-weight: 700; color: white; letter-spacing: -0.02em;">FrankX.AI</span>
      </div>
      <p style="font-size: 14px; color: #64748b; margin: 0; letter-spacing: 0.05em; text-transform: uppercase;">Creator AI Transformation</p>
    </div>

    <!-- Main content -->
    <div style="background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%); border: 2px solid rgba(6, 182, 212, 0.25); border-radius: 24px; padding: 40px 32px; margin-bottom: 32px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);">
      <h1 style="font-family: 'Poppins', sans-serif; font-size: 32px; font-weight: 700; color: white; margin: 0 0 20px 0; line-height: 1.2;">
        Your Guide Just Landed, ${leadData.name}! ✨
      </h1>

      <p style="font-size: 17px; color: #CBD5E1; line-height: 1.7; margin: 0 0 16px 0;">
        Picture this: same frameworks I used to create 500+ AI songs and build enterprise systems at Oracle - now in your hands.
      </p>

      <p style="font-size: 16px; color: #94a3b8; line-height: 1.7; margin: 0 0 28px 0;">
        <strong style="color: #22d3ee;">${pdfTitle}</strong> is the playbook. Think of it like your studio cheat sheet for AI-powered creation.
      </p>

      <div style="background: linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(139, 92, 246, 0.08) 100%); border: 2px solid rgba(6, 182, 212, 0.3); border-radius: 16px; padding: 28px 24px; margin-bottom: 32px;">
        <p style="font-size: 13px; color: #22d3ee; margin: 0 0 18px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em;">
          🎯 Inside This Guide
        </p>
        <ul style="margin: 0; padding-left: 24px; color: #E2E8F0; line-height: 1.8;">
          <li style="margin-bottom: 10px;"><strong style="color: white;">Battle-tested frameworks</strong> - Used in real production environments</li>
          <li style="margin-bottom: 10px;"><strong style="color: white;">Studio-ready templates</strong> - Copy, customize, create</li>
          <li style="margin-bottom: 10px;"><strong style="color: white;">Step-by-step walkthroughs</strong> - From zero to shipped</li>
        </ul>
      </div>

      <div style="text-align: center; margin: 36px 0;">
        <a href="${pdfUrl}"
           style="display: inline-block; padding: 18px 40px; background: linear-gradient(135deg, #06b6d4 0%, #8B5CF6 50%, #9333ea 100%); color: white; text-decoration: none; border-radius: 16px; font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 17px; box-shadow: 0 12px 32px rgba(6, 182, 212, 0.4); transition: all 0.3s;">
          Download Your Guide →
        </a>
      </div>

      <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 24px; margin-top: 32px;">
        <p style="font-size: 15px; color: #94a3b8; margin: 0 0 12px 0; line-height: 1.6;">
          Quick note: Hit reply with questions. I read every message. Really.
        </p>
        <p style="font-size: 14px; color: #64748b; margin: 0; line-height: 1.6;">
          Want more? Check out our <a href="https://frankx.ai/blog" style="color: #22d3ee; text-decoration: none;">creator insights</a> or explore <a href="https://frankx.ai/music" style="color: #22d3ee; text-decoration: none;">500+ AI songs</a>.
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding-top: 40px; border-top: 2px solid rgba(6, 182, 212, 0.15);">
      <div style="margin-bottom: 20px;">
        <p style="font-family: 'Poppins', sans-serif; font-size: 15px; color: #E2E8F0; margin: 0 0 6px 0; font-weight: 600;">
          Frank Riemer
        </p>
        <p style="font-size: 13px; color: #94a3b8; margin: 0; line-height: 1.6;">
          Musician → AI Architect at Oracle<br>
          <span style="color: #22d3ee;">500+ AI Songs</span> | <span style="color: #8B5CF6;">Enterprise AI Systems</span>
        </p>
      </div>

      <div style="margin: 24px 0; display: inline-flex; gap: 16px; align-items: center;">
        <a href="https://frankx.ai" style="color: #22d3ee; text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s;">
          🏠 frankx.ai
        </a>
        <span style="color: #64748b;">•</span>
        <a href="https://twitter.com/frankxai" style="color: #22d3ee; text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s;">
          𝕏 Twitter
        </a>
        <span style="color: #64748b;">•</span>
        <a href="https://linkedin.com/in/frankguzmanai" style="color: #22d3ee; text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s;">
          💼 LinkedIn
        </a>
      </div>

      <div style="background: rgba(6, 182, 212, 0.05); border: 1px solid rgba(6, 182, 212, 0.15); border-radius: 12px; padding: 16px; margin: 24px auto 0; max-width: 400px;">
        <p style="font-size: 12px; color: #94a3b8; margin: 0; line-height: 1.5;">
          📬 You're getting this because you requested <strong style="color: #22d3ee;">${pdfTitle}</strong> from FrankX.AI
        </p>
      </div>
    </div>
  </div>
</body>
</html>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email. Please try downloading directly.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, emailId: data?.id })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
