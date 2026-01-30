/**
 * Email Template System for FrankX.AI
 *
 * Reusable email templates following FrankX brand guidelines:
 * - Poppins font for headings
 * - Inter font for body text
 * - Cyan (#06b6d4) to Purple (#9333ea) gradients
 * - Warm, creator-first voice
 * - Studio energy throughout
 */

interface EmailTemplateData {
  recipientName: string
  recipientEmail: string
  [key: string]: any
}

interface EmailTemplate {
  subject: string
  html: string
}

/**
 * Base email wrapper with FrankX branding
 */
function emailWrapper(content: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
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

    ${content}

    <!-- Footer -->
    <div style="text-align: center; padding-top: 40px; border-top: 2px solid rgba(6, 182, 212, 0.15); margin-top: 40px;">
      <div style="margin-bottom: 20px;">
        <p style="font-family: 'Poppins', sans-serif; font-size: 15px; color: #E2E8F0; margin: 0 0 6px 0; font-weight: 600;">
          Frank Riemer
        </p>
        <p style="font-size: 13px; color: #94a3b8; margin: 0; line-height: 1.6;">
          AI Architect at Oracle | Creator<br>
          <span style="color: #22d3ee;">500+ AI Songs</span> | <span style="color: #8B5CF6;">Enterprise AI Systems</span>
        </p>
      </div>

      <div style="margin: 24px 0;">
        <a href="https://frankx.ai" style="color: #22d3ee; text-decoration: none; font-size: 14px; font-weight: 500; margin: 0 12px;">
          🏠 frankx.ai
        </a>
        <span style="color: #64748b;">•</span>
        <a href="https://x.com/frankxeth" style="color: #22d3ee; text-decoration: none; font-size: 14px; font-weight: 500; margin: 0 12px;">
          𝕏 X
        </a>
        <span style="color: #64748b;">•</span>
        <a href="https://www.linkedin.com/in/frank-x-riemer/" style="color: #22d3ee; text-decoration: none; font-size: 14px; font-weight: 500; margin: 0 12px;">
          💼 LinkedIn
        </a>
      </div>
    </div>
  </div>
</body>
</html>
  `
}

/**
 * Template 1: PDF Guide Delivery
 */
export function pdfDeliveryEmail(data: {
  recipientName: string
  pdfTitle: string
  pdfUrl: string
  guideDescription?: string
}): EmailTemplate {
  const content = `
    <div style="background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%); border: 2px solid rgba(6, 182, 212, 0.25); border-radius: 24px; padding: 40px 32px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);">

      <h1 style="font-family: 'Poppins', sans-serif; font-size: 32px; font-weight: 700; color: white; margin: 0 0 20px 0; line-height: 1.2;">
        Your Guide Just Landed, ${data.recipientName}! ✨
      </h1>

      <p style="font-size: 17px; color: #CBD5E1; line-height: 1.7; margin: 0 0 16px 0;">
        Picture this: same frameworks I used to create 500+ AI songs and build enterprise systems at Oracle - now in your hands.
      </p>

      <p style="font-size: 16px; color: #94a3b8; line-height: 1.7; margin: 0 0 28px 0;">
        <strong style="color: #22d3ee;">${data.pdfTitle}</strong> is the playbook. Think of it like your studio cheat sheet for AI-powered creation.
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
        <a href="${data.pdfUrl}"
           style="display: inline-block; padding: 18px 40px; background: linear-gradient(135deg, #06b6d4 0%, #8B5CF6 50%, #9333ea 100%); color: white; text-decoration: none; border-radius: 16px; font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 17px; box-shadow: 0 12px 32px rgba(6, 182, 212, 0.4);">
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

    <div style="background: rgba(6, 182, 212, 0.05); border: 1px solid rgba(6, 182, 212, 0.15); border-radius: 12px; padding: 16px; margin: 24px auto 0; max-width: 400px; text-align: center;">
      <p style="font-size: 12px; color: #94a3b8; margin: 0; line-height: 1.5;">
        📬 You're getting this because you requested <strong style="color: #22d3ee;">${data.pdfTitle}</strong> from FrankX.AI
      </p>
    </div>
  `

  return {
    subject: `Your ${data.pdfTitle} Guide from FrankX.AI`,
    html: emailWrapper(content)
  }
}

/**
 * Template 2: Newsletter Welcome Email
 */
export function newsletterWelcomeEmail(data: {
  recipientName: string
}): EmailTemplate {
  const content = `
    <div style="background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%); border: 2px solid rgba(6, 182, 212, 0.25); border-radius: 24px; padding: 40px 32px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);">

      <h1 style="font-family: 'Poppins', sans-serif; font-size: 32px; font-weight: 700; color: white; margin: 0 0 20px 0; line-height: 1.2;">
        Welcome to the Studio, ${data.recipientName}! 🎵
      </h1>

      <p style="font-size: 17px; color: #CBD5E1; line-height: 1.7; margin: 0 0 16px 0;">
        You just joined 10,000+ creators who are transforming their creative practice with AI.
      </p>

      <p style="font-size: 16px; color: #94a3b8; line-height: 1.7; margin: 0 0 28px 0;">
        I'm Frank - musician turned AI architect at Oracle. By day, I build enterprise AI systems. By night (and sometimes 2 AM), I'm in the studio creating AI-powered music and teaching creators how to do the same.
      </p>

      <div style="background: linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(139, 92, 246, 0.08) 100%); border: 2px solid rgba(6, 182, 212, 0.3); border-radius: 16px; padding: 28px 24px; margin-bottom: 32px;">
        <p style="font-size: 13px; color: #22d3ee; margin: 0 0 18px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em;">
          ✨ What You'll Get
        </p>
        <ul style="margin: 0; padding-left: 24px; color: #E2E8F0; line-height: 1.8;">
          <li style="margin-bottom: 10px;"><strong style="color: white;">Weekly insights</strong> - AI tools, music creation, and conscious creativity</li>
          <li style="margin-bottom: 10px;"><strong style="color: white;">Exclusive guides</strong> - Early access to frameworks I'm testing in production</li>
          <li style="margin-bottom: 10px;"><strong style="color: white;">Behind-the-scenes</strong> - Real studio sessions, successes, and failures</li>
          <li style="margin-bottom: 10px;"><strong style="color: white;">Community access</strong> - Join creators building the future</li>
        </ul>
      </div>

      <div style="text-align: center; margin: 36px 0;">
        <a href="https://frankx.ai/downloads"
           style="display: inline-block; padding: 18px 40px; background: linear-gradient(135deg, #06b6d4 0%, #8B5CF6 50%, #9333ea 100%); color: white; text-decoration: none; border-radius: 16px; font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 17px; box-shadow: 0 12px 32px rgba(6, 182, 212, 0.4); margin: 0 8px 8px 0;">
          Get Free Guides →
        </a>
        <a href="https://frankx.ai/blog"
           style="display: inline-block; padding: 18px 40px; background: rgba(255, 255, 255, 0.05); color: white; text-decoration: none; border-radius: 16px; font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 17px; border: 2px solid rgba(6, 182, 212, 0.3); margin: 0 0 8px 8px;">
          Read Latest Posts
        </a>
      </div>

      <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 24px; margin-top: 32px;">
        <p style="font-size: 15px; color: #94a3b8; margin: 0 0 12px 0; line-height: 1.6;">
          Hit reply anytime. I read every email and respond personally to as many as I can.
        </p>
        <p style="font-size: 14px; color: #64748b; margin: 0; line-height: 1.6;">
          No spam. No fluff. Just real insights from someone building in public.
        </p>
      </div>
    </div>
  `

  return {
    subject: "Welcome to FrankX.AI - Let's Create Together",
    html: emailWrapper(content)
  }
}

/**
 * Template 3: Test Email (for debugging)
 */
export function testEmail(data: {
  recipientName: string
  testMessage?: string
}): EmailTemplate {
  const content = `
    <div style="background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%); border: 2px solid rgba(6, 182, 212, 0.25); border-radius: 24px; padding: 40px 32px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);">

      <h1 style="font-family: 'Poppins', sans-serif; font-size: 32px; font-weight: 700; color: white; margin: 0 0 20px 0; line-height: 1.2;">
        🧪 Test Email from FrankX.AI
      </h1>

      <p style="font-size: 17px; color: #CBD5E1; line-height: 1.7; margin: 0 0 16px 0;">
        Hey ${data.recipientName}! This is a test email to verify that the Resend integration is working correctly.
      </p>

      ${data.testMessage ? `
        <div style="background: rgba(6, 182, 212, 0.1); border: 2px solid rgba(6, 182, 212, 0.3); border-radius: 12px; padding: 20px; margin: 20px 0;">
          <p style="font-size: 15px; color: #22d3ee; margin: 0; font-weight: 600; margin-bottom: 8px;">
            Custom Message:
          </p>
          <p style="font-size: 14px; color: #E2E8F0; margin: 0; line-height: 1.6;">
            ${data.testMessage}
          </p>
        </div>
      ` : ''}

      <div style="background: linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(139, 92, 246, 0.08) 100%); border: 2px solid rgba(6, 182, 212, 0.3); border-radius: 16px; padding: 28px 24px; margin: 32px 0;">
        <p style="font-size: 13px; color: #22d3ee; margin: 0 0 18px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em;">
          ✅ System Check
        </p>
        <ul style="margin: 0; padding-left: 24px; color: #E2E8F0; line-height: 1.8;">
          <li style="margin-bottom: 10px;"><strong style="color: white;">Email Service:</strong> Resend API ✅</li>
          <li style="margin-bottom: 10px;"><strong style="color: white;">Template System:</strong> Working ✅</li>
          <li style="margin-bottom: 10px;"><strong style="color: white;">Brand Styling:</strong> Poppins + Inter fonts ✅</li>
          <li style="margin-bottom: 10px;"><strong style="color: white;">Deliverability:</strong> If you're reading this, we're good! ✅</li>
        </ul>
      </div>

      <p style="font-size: 15px; color: #94a3b8; margin: 24px 0 0 0; line-height: 1.6;">
        Timestamp: ${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles', dateStyle: 'full', timeStyle: 'long' })}
      </p>
    </div>
  `

  return {
    subject: "🧪 Test Email from FrankX.AI - Email System Check",
    html: emailWrapper(content)
  }
}

/**
 * Template 4: Community Update / Broadcast
 */
export function communityBroadcastEmail(data: {
  recipientName: string
  headline: string
  bodyContent: string
  ctaText?: string
  ctaUrl?: string
}): EmailTemplate {
  const content = `
    <div style="background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%); border: 2px solid rgba(6, 182, 212, 0.25); border-radius: 24px; padding: 40px 32px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);">

      <h1 style="font-family: 'Poppins', sans-serif; font-size: 32px; font-weight: 700; color: white; margin: 0 0 20px 0; line-height: 1.2;">
        ${data.headline}
      </h1>

      <div style="font-size: 16px; color: #CBD5E1; line-height: 1.7; margin: 0 0 28px 0;">
        ${data.bodyContent}
      </div>

      ${data.ctaText && data.ctaUrl ? `
        <div style="text-align: center; margin: 36px 0;">
          <a href="${data.ctaUrl}"
             style="display: inline-block; padding: 18px 40px; background: linear-gradient(135deg, #06b6d4 0%, #8B5CF6 50%, #9333ea 100%); color: white; text-decoration: none; border-radius: 16px; font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 17px; box-shadow: 0 12px 32px rgba(6, 182, 212, 0.4);">
            ${data.ctaText} →
          </a>
        </div>
      ` : ''}

      <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 24px; margin-top: 32px;">
        <p style="font-size: 14px; color: #94a3b8; margin: 0; line-height: 1.6;">
          Keep creating,<br>
          <strong style="color: white;">Frank</strong>
        </p>
      </div>
    </div>
  `

  return {
    subject: data.headline,
    html: emailWrapper(content)
  }
}
