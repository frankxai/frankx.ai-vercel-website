#!/usr/bin/env npx ts-node
/**
 * FrankX Newsletter Broadcast Script
 *
 * Sends beautiful newsletters to Resend Audience subscribers
 *
 * Usage:
 *   npx ts-node scripts/send-newsletter.ts
 *
 * Environment:
 *   RESEND_API_KEY - Your Resend API key
 *   RESEND_AUDIENCE_ID - Your Resend Audience ID (optional, for audience sends)
 */

import { Resend } from 'resend'

// ═══════════════════════════════════════════════════════════════════
// NEWSLETTER CONTENT - Edit this section for each send
// ═══════════════════════════════════════════════════════════════════

const NEWSLETTER = {
  subject: "Props to the Builders: A Grounded Note for This Week",
  preheader: "A calmer way to build: humility, systems, and real creative momentum.",

  // Main headline
  headline: "Build with Clarity. Ship with Humility.",

  // Opening paragraph (personal, warm)
  opening: `
    <p style="font-size: 17px; color: #CBD5E1; line-height: 1.7; margin: 0 0 20px 0;">
      This week I kept hearing one sentence: “I’m glad you’re on this team.”
    </p>
    <p style="font-size: 16px; color: #94a3b8; line-height: 1.7; margin: 0 0 24px 0;">
      I don’t take that lightly. This edition is a reset around a simple idea:
      <strong style="color: #22d3ee;">the best work is never solo work.</strong>
      It’s built with ecosystems, standards, and people who care about quality.
    </p>
  `,

  // Featured sections
  sections: [
    {
      icon: "🧭",
      title: "Credibility Comes From Service",
      content: `I used to think credibility came from always having the right answer.
        Now I think it comes from showing up prepared, staying calm under pressure,
        and helping other people win.`,
      link: "https://www.frankx.ai/blog/props-to-the-builders-of-this-era",
      linkText: "Read the Full Note"
    },
    {
      icon: "🤖",
      title: "Tooling Is an Amplifier, Not a Substitute",
      content: `AI can accelerate your workflow, but speed without standards creates
        polished confusion. Better pattern: choose tools that reduce friction, keep
        quality visible, and stay accountable for outcomes.`,
      link: "https://www.frankx.ai/acos",
      linkText: "See ACOS Workflows"
    },
    {
      icon: "🏗️",
      title: "A Smarter Ground-Up Operating Model",
      content: `Start with service. Define constraints early. Name your sources.
        Document what works. Keep humans in the loop for high-stakes decisions.
        Not flashy, but it compounds.`,
      link: "https://www.frankx.ai/ai-architect",
      linkText: "Explore Architecture Guides"
    }
  ],

  // Quick tips section
  quickTip: {
    title: "🎯 Builder Tip of the Week",
    content: `<strong style="color: white;">Before you prompt, define your constraint.</strong>
      Time limit, quality bar, and desired output format. Constraint-first prompts
      produce cleaner outcomes than inspiration-first prompting.`
  },

  // Personal closing
  closing: `
    <p style="font-size: 16px; color: #CBD5E1; line-height: 1.7; margin: 0 0 16px 0;">
      Thank you for building with me. If you’re in a hard season, stay close to
      what is true, keep your scope concrete, and choose contribution over comparison.
    </p>
    <p style="font-size: 15px; color: #94a3b8; line-height: 1.7; margin: 0;">
      Hit reply with one thing you’re building this week. I read every message.
    </p>
  `,

  // CTA button
  cta: {
    text: "Read This Week's Builder Letter",
    url: "https://www.frankx.ai/blog/props-to-the-builders-of-this-era"
  }
}

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Frank <frank@mail.frankx.ai>'

// ═══════════════════════════════════════════════════════════════════
// EMAIL TEMPLATE GENERATOR
// ═══════════════════════════════════════════════════════════════════

function generateNewsletterHTML(recipientName: string = "Creator"): string {
  const sectionsHTML = NEWSLETTER.sections.map(section => `
    <div style="background: linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(139, 92, 246, 0.05) 100%);
                border: 1px solid rgba(6, 182, 212, 0.2); border-radius: 16px; padding: 24px; margin-bottom: 16px;">
      <div style="display: flex; align-items: center; margin-bottom: 12px;">
        <span style="font-size: 24px; margin-right: 12px;">${section.icon}</span>
        <h3 style="font-family: 'Poppins', sans-serif; font-size: 18px; font-weight: 600; color: white; margin: 0;">
          ${section.title}
        </h3>
      </div>
      <p style="font-size: 15px; color: #CBD5E1; line-height: 1.7; margin: 0 0 16px 0;">
        ${section.content}
      </p>
      <a href="${section.link}"
         style="display: inline-block; color: #22d3ee; text-decoration: none; font-size: 14px; font-weight: 500;">
        ${section.linkText} →
      </a>
    </div>
  `).join('')

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600&display=swap');
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0F172A; color: #f1f5f9;">

  <!-- Preheader -->
  <div style="display: none; max-height: 0; overflow: hidden;">
    ${NEWSLETTER.preheader}
  </div>

  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">

    <!-- Header -->
    <div style="text-align: center; margin-bottom: 40px;">
      <div style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #06b6d4 0%, #8B5CF6 50%, #9333ea 100%); border-radius: 16px; margin-bottom: 24px; box-shadow: 0 8px 32px rgba(6, 182, 212, 0.3);">
        <span style="font-family: 'Poppins', sans-serif; font-size: 26px; font-weight: 700; color: white; letter-spacing: -0.02em;">FrankX.AI</span>
      </div>
      <p style="font-size: 14px; color: #64748b; margin: 0; letter-spacing: 0.05em; text-transform: uppercase;">Creator AI Transformation</p>
    </div>

    <!-- Main Content Card -->
    <div style="background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%); border: 2px solid rgba(6, 182, 212, 0.25); border-radius: 24px; padding: 40px 32px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);">

      <p style="font-size: 16px; color: #94a3b8; margin: 0 0 24px 0;">
        Hey ${recipientName},
      </p>

      <h1 style="font-family: 'Poppins', sans-serif; font-size: 32px; font-weight: 700; color: white; margin: 0 0 24px 0; line-height: 1.2;">
        ${NEWSLETTER.headline}
      </h1>

      ${NEWSLETTER.opening}

      <!-- Feature Sections -->
      <div style="margin: 32px 0;">
        ${sectionsHTML}
      </div>

      <!-- Quick Tip -->
      <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%);
                  border: 2px solid rgba(139, 92, 246, 0.3); border-radius: 16px; padding: 24px; margin: 32px 0;">
        <p style="font-size: 13px; color: #8B5CF6; margin: 0 0 12px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;">
          ${NEWSLETTER.quickTip.title}
        </p>
        <p style="font-size: 15px; color: #E2E8F0; line-height: 1.7; margin: 0;">
          ${NEWSLETTER.quickTip.content}
        </p>
      </div>

      <!-- Closing -->
      <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 24px; margin-top: 32px;">
        ${NEWSLETTER.closing}
      </div>

      <!-- CTA Button -->
      <div style="text-align: center; margin: 36px 0 0 0;">
        <a href="${NEWSLETTER.cta.url}"
           style="display: inline-block; padding: 18px 40px; background: linear-gradient(135deg, #06b6d4 0%, #8B5CF6 50%, #9333ea 100%); color: white; text-decoration: none; border-radius: 16px; font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 17px; box-shadow: 0 12px 32px rgba(6, 182, 212, 0.4);">
          ${NEWSLETTER.cta.text} →
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding-top: 40px; margin-top: 40px;">
      <div style="margin-bottom: 20px;">
        <p style="font-family: 'Poppins', sans-serif; font-size: 15px; color: #E2E8F0; margin: 0 0 6px 0; font-weight: 600;">
          Frank Guzman
        </p>
        <p style="font-size: 13px; color: #94a3b8; margin: 0; line-height: 1.6;">
          Musician → AI Systems Architect<br>
          <span style="color: #22d3ee;">500+ AI Songs</span> | <span style="color: #8B5CF6;">Enterprise AI Systems</span>
        </p>
      </div>

      <div style="margin: 24px 0;">
        <a href="https://frankx.ai" style="color: #22d3ee; text-decoration: none; font-size: 14px; font-weight: 500; margin: 0 12px;">
          frankx.ai
        </a>
        <span style="color: #64748b;">•</span>
        <a href="https://x.com/frankxeth" style="color: #22d3ee; text-decoration: none; font-size: 14px; font-weight: 500; margin: 0 12px;">
          X
        </a>
        <span style="color: #64748b;">•</span>
        <a href="https://www.linkedin.com/in/frank-x-riemer/" style="color: #22d3ee; text-decoration: none; font-size: 14px; font-weight: 500; margin: 0 12px;">
          LinkedIn
        </a>
      </div>

      <p style="font-size: 12px; color: #64748b; margin: 24px 0 0 0; line-height: 1.5;">
        You're receiving this because you joined the FrankX.AI community.<br>
        <a href="{{RESEND_UNSUBSCRIBE_URL}}" style="color: #94a3b8; text-decoration: underline;">Unsubscribe</a> if you no longer want to hear from me.
      </p>
    </div>
  </div>
</body>
</html>
`
}

// ═══════════════════════════════════════════════════════════════════
// SEND FUNCTIONS
// ═══════════════════════════════════════════════════════════════════

async function sendToAudience(resend: Resend, audienceId: string) {
  console.log('\n📤 Sending newsletter to Resend Audience...\n')

  const result = await resend.broadcasts.create({
    audienceId,
    from: FROM_EMAIL,
    subject: NEWSLETTER.subject,
    html: generateNewsletterHTML('Creator'),
  })

  if (result.error) {
    throw new Error(`Broadcast failed: ${result.error.message}`)
  }

  console.log('✅ Broadcast created successfully!')
  console.log(`   ID: ${result.data?.id}`)

  // Send the broadcast
  if (result.data?.id) {
    const sendResult = await resend.broadcasts.send(result.data.id)
    if (sendResult.error) {
      throw new Error(`Send failed: ${sendResult.error.message}`)
    }
    console.log('✅ Newsletter sent to all audience members!')
  }

  return result
}

async function sendToSingleEmail(resend: Resend, email: string, name: string = 'Creator') {
  console.log(`\n📤 Sending newsletter to ${email}...\n`)

  const result = await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: NEWSLETTER.subject,
    html: generateNewsletterHTML(name),
  })

  if (result.error) {
    throw new Error(`Send failed: ${result.error.message}`)
  }

  console.log('✅ Newsletter sent successfully!')
  console.log(`   ID: ${result.data?.id}`)
  console.log(`   To: ${email}`)

  return result
}

async function previewNewsletter() {
  const fs = await import('fs')
  const path = await import('path')

  const html = generateNewsletterHTML('Frank')
  const previewPath = path.join(process.cwd(), 'newsletter-preview.html')

  fs.writeFileSync(previewPath, html)
  console.log(`\n📄 Newsletter preview saved to: ${previewPath}`)
  console.log('   Open this file in a browser to see how it looks!')
}

// ═══════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════

async function main() {
  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID

  // Parse command line args
  const args = process.argv.slice(2)
  const command = args[0] || 'preview'

  console.log('\n' + '═'.repeat(60))
  console.log('  🎵 FrankX Newsletter Broadcast System')
  console.log('═'.repeat(60))

  if (command === 'preview') {
    await previewNewsletter()
    return
  }

  if (!apiKey) {
    console.error('\n❌ RESEND_API_KEY not found in environment')
    console.log('\nSet it with:')
    console.log('  export RESEND_API_KEY=re_xxxxx')
    process.exit(1)
  }

  const resend = new Resend(apiKey)

  if (command === 'send-test') {
    const email = args[1] || 'friemerx@gmail.com'
    const name = args[2] || 'Frank'
    await sendToSingleEmail(resend, email, name)

  } else if (command === 'send-audience') {
    if (!audienceId) {
      console.error('\n❌ RESEND_AUDIENCE_ID not found in environment')
      console.log('\nSet it with:')
      console.log('  export RESEND_AUDIENCE_ID=aud_xxxxx')
      process.exit(1)
    }
    await sendToAudience(resend, audienceId)

  } else {
    console.log('\nUsage:')
    console.log('  npx ts-node scripts/send-newsletter.ts preview         # Preview HTML locally')
    console.log('  npx ts-node scripts/send-newsletter.ts send-test [email] [name]  # Send to one email')
    console.log('  npx ts-node scripts/send-newsletter.ts send-audience   # Send to entire audience')
  }

  console.log('\n' + '═'.repeat(60) + '\n')
}

main().catch(console.error)
