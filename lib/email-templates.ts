/**
 * Email Template System v3.0 for FrankX.AI
 *
 * Glassmorphic design language — dark, premium, email-safe.
 * Built on the shared design system (email-design-system.ts).
 *
 * Templates:
 *   1. PDF Guide Delivery
 *   2. Newsletter Welcome
 *   3. Test Email
 *   4. Community Broadcast
 *   5. Music Prompts Lead Magnet
 *   6. Purchase Confirmation
 *   7. Album Release
 */

import {
  tokens as T,
  emailWrapper,
  glassCard,
  ctaButton,
  sectionLabel,
  featureRow,
  resourceCard,
  highlightBox,
  signatureBlock,
  gradientLine,
  divider,
  mascotImage,
  mascotWithSpeech,
} from './email-design-system'

interface EmailTemplate {
  subject: string
  html: string
}

// ─── 1. PDF Guide Delivery ───────────────────────────────────────

export function pdfDeliveryEmail(data: {
  recipientName: string
  pdfTitle: string
  pdfUrl: string
  guideDescription?: string
}): EmailTemplate {
  const content = glassCard(
    `
    ${mascotWithSpeech('pointing', `Your guide just landed, ${data.recipientName}. Dive in.`)}

    <h1 class="h1" style="font-family: ${T.fontStack}; font-size: 26px; font-weight: 700; color: ${T.textPrimary}; margin: 0 0 18px 0; line-height: 1.3; letter-spacing: -0.02em;">
      Your guide is ready.
    </h1>

    <p style="font-family: ${T.fontStack}; font-size: 16px; color: ${T.textSecondary}; line-height: 1.65; margin: 0 0 12px 0;">
      <strong style="color: ${T.accentCyan};">${data.pdfTitle}</strong> — the same frameworks I use to create AI music and build enterprise systems. Yours now.
    </p>

    <p style="font-family: ${T.fontStack}; font-size: 15px; color: ${T.textMuted}; line-height: 1.65; margin: 0 0 28px 0;">
      Each section is built to be actionable. No theory dumps. Just what works.
    </p>

    ${highlightBox('Inside This Guide', `
      ${featureRow('Tested frameworks', 'used in production, not hypothetical', T.accentCyan)}
      ${featureRow('Ready-to-use templates', 'copy, customize, ship', T.accentCyan)}
      ${featureRow('Step-by-step walkthroughs', 'blank page to done', T.accentCyan)}
    `, T.accentCyan)}

    ${ctaButton('Download Your Guide', data.pdfUrl, 'accent', T.accentCyan)}

    ${signatureBlock('Questions? Reply to this email. I read every one.')}
    `,
    { accentColor: T.accentCyan, accentPosition: 'top' }
  )

  return {
    subject: `${data.pdfTitle} — your download is ready`,
    html: emailWrapper(content, `Your ${data.pdfTitle} guide from FrankX.AI is ready to download.`),
  }
}

// ─── 2. Newsletter Welcome ───────────────────────────────────────

export function newsletterWelcomeEmail(data: {
  recipientName: string
}): EmailTemplate {
  const name = data.recipientName || 'there'

  const content = glassCard(
    `
    ${mascotWithSpeech('waving', `Welcome to the crew, ${name}. Glad you're here.`)}

    <h1 class="h1" style="font-family: ${T.fontStack}; font-size: 26px; font-weight: 700; color: ${T.textPrimary}; margin: 0 0 18px 0; line-height: 1.3; letter-spacing: -0.02em;">
      Welcome, ${name}.
    </h1>

    <p style="font-family: ${T.fontStack}; font-size: 16px; color: ${T.textSecondary}; line-height: 1.65; margin: 0 0 12px 0;">
      I'm Frank. I build enterprise AI systems during the day. At night I'm in the studio — 12,000+ AI-generated songs and counting.
    </p>

    <p style="font-family: ${T.fontStack}; font-size: 15px; color: ${T.textMuted}; line-height: 1.65; margin: 0 0 28px 0;">
      This list is where I share what I'm learning — tools that work, techniques I've tested, and the occasional behind-the-scenes from late-night building sessions.
    </p>

    ${highlightBox('What to Expect', `
      ${featureRow('AI tools and workflows', "what's actually useful, not hype", T.accentPurple)}
      ${featureRow('Music creation insights', 'prompts, techniques, production notes', T.accentPurple)}
      ${featureRow('Early access', 'new guides and frameworks before public', T.accentPurple)}
      ${featureRow('Real results', 'successes, failures, and everything between', T.accentPurple)}
    `, T.accentPurple)}

    ${ctaButton('Read Latest Posts', 'https://frankx.ai/blog')}
    ${ctaButton('Hear the Music', 'https://frankx.ai/music', 'outline')}

    ${signatureBlock('No spam. No fluff. Just what works.')}
    `,
    { accentColor: T.accentPurple, accentPosition: 'top' }
  )

  return {
    subject: 'Welcome to FrankX.AI',
    html: emailWrapper(content, "I'm Frank. AI architect by day, music creator by night. Here's what to expect."),
  }
}

// ─── 3. Test Email ───────────────────────────────────────────────

export function testEmail(data: {
  recipientName: string
  testMessage?: string
}): EmailTemplate {
  const checkItem = (label: string) =>
    `<p style="font-family: ${T.fontStack}; font-size: 14px; color: ${T.textPrimary}; margin: 0 0 6px 0; line-height: 1.5;"><span style="color: ${T.accentGreen};">&#10003;</span>&nbsp; ${label}</p>`

  const content = glassCard(
    `
    <h1 class="h1" style="font-family: ${T.fontStack}; font-size: 26px; font-weight: 700; color: ${T.textPrimary}; margin: 0 0 18px 0; line-height: 1.3; letter-spacing: -0.02em;">
      Email System Test
    </h1>

    <p style="font-family: ${T.fontStack}; font-size: 16px; color: ${T.textSecondary}; line-height: 1.65; margin: 0 0 20px 0;">
      Hey ${data.recipientName} — verifying that the Resend integration is working correctly.
    </p>

    ${data.testMessage ? highlightBox('Message', data.testMessage, T.accentCyan) : ''}

    ${highlightBox('System Check', `
      ${checkItem('Email service (Resend API)')}
      ${checkItem('Template rendering (v3.0 Design System)')}
      ${checkItem('Brand styling (glassmorphic)')}
      ${checkItem('Deliverability confirmed')}
    `, T.accentGreen)}

    <p style="font-family: ${T.monoStack}; font-size: 12px; color: ${T.textDim}; margin: 0;">
      Sent at ${new Date().toISOString()}
    </p>
    `,
    { accentColor: T.accentPurple, accentPosition: 'top' }
  )

  return {
    subject: 'FrankX.AI — Email system test',
    html: emailWrapper(content, 'This is a test email from your FrankX.AI email system.'),
  }
}

// ─── 4. Community Broadcast ──────────────────────────────────────

export function communityBroadcastEmail(data: {
  recipientName: string
  headline: string
  bodyContent: string
  ctaText?: string
  ctaUrl?: string
}): EmailTemplate {
  const content = glassCard(
    `
    <h1 class="h1" style="font-family: ${T.fontStack}; font-size: 26px; font-weight: 700; color: ${T.textPrimary}; margin: 0 0 20px 0; line-height: 1.3; letter-spacing: -0.02em;">
      ${data.headline}
    </h1>

    <div style="font-family: ${T.fontStack}; font-size: 16px; color: ${T.textSecondary}; line-height: 1.7; margin: 0 0 28px 0;">
      ${data.bodyContent}
    </div>

    ${data.ctaText && data.ctaUrl ? ctaButton(data.ctaText, data.ctaUrl) : ''}

    ${signatureBlock()}
    `,
    { accentColor: T.accentPurple, accentPosition: 'top' }
  )

  return {
    subject: data.headline,
    html: emailWrapper(content, data.bodyContent.substring(0, 120).replace(/<[^>]*>/g, '')),
  }
}

// ─── 5. Music Prompts Lead Magnet ────────────────────────────────

export function musicPromptsEmail(data: {
  recipientName: string
  downloadUrl: string
}): EmailTemplate {
  const tracks = [
    { title: 'The Awakening', stat: '142 plays', genre: 'African / World', url: 'https://suno.com/song/8374d2ad-9142-4900-9028-a1e805688407' },
    { title: 'Vibe O S', stat: '128 plays', genre: 'Hip Hop / Bass', url: 'https://suno.com/song/9cbad174-9276-427f-9aed-1ba00c7db3db' },
    { title: 'Golden Age of Intelligence', stat: '119 plays', genre: 'EDM / Epic', url: 'https://suno.com/song/d1ad41a9-9239-454d-bc2c-a187f42ac30b' },
    { title: 'Trust in Yourself', stat: '34 likes', genre: 'Pop Punk / Symphonic', url: 'https://suno.com/song/66572f21-2682-41f3-9051-86446e9b9bd7' },
    { title: 'Lumina', stat: '108 plays', genre: 'Rock / Soul', url: 'https://suno.com/song/1fc13c04-a7b3-427d-bff0-cac92ee524ae' },
  ]

  const trackRows = tracks
    .map(
      (t) => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid ${T.borderGlass};">
        <a href="${t.url}" style="font-family: ${T.fontStack}; color: ${T.accentCyan}; text-decoration: none; font-weight: 600; font-size: 15px; line-height: 1.4;">${t.title}</a>
        <br><span style="font-family: ${T.fontStack}; font-size: 13px; color: ${T.textDim};">${t.genre} &middot; ${t.stat}</span>
      </td>
    </tr>`
    )
    .join('')

  const content = glassCard(
    `
    ${mascotWithSpeech('chill', `5 prompts from the studio, ${data.recipientName}. Make something fire.`)}

    <h1 class="h1" style="font-family: ${T.fontStack}; font-size: 26px; font-weight: 700; color: ${T.textPrimary}; margin: 0 0 18px 0; line-height: 1.3; letter-spacing: -0.02em;">
      Your 5 Suno prompts are ready.
    </h1>

          <p style="font-size: 16px; color: #CBD5E1; line-height: 1.6; margin: 0 0 8px 0;">
            These are the exact prompts behind my top-performing tracks. 500+ combined plays, refined over 12,000+ songs.
          </p>

    <p style="font-family: ${T.fontStack}; font-size: 15px; color: ${T.textMuted}; line-height: 1.65; margin: 0 0 28px 0;">
      Each one includes a breakdown of <strong style="color: ${T.accentGreen};">why it works</strong> and <strong style="color: ${T.accentGreen};">variations to try</strong>. Copy, paste, create.
    </p>

    ${ctaButton('Download Your 5 Prompts', data.downloadUrl, 'accent', T.accentGreen)}

    <!-- Track list -->
    ${highlightBox('Tracks Included', `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="color: ${T.textPrimary};">
        ${trackRows}
      </table>
    `, T.accentGreen)}

    <!-- Upsell -->
    ${divider()}
    <p style="font-family: ${T.fontStack}; font-size: 15px; color: ${T.textSecondary}; margin: 0 0 16px 0; line-height: 1.6;">
      <strong style="color: ${T.textPrimary};">Want more?</strong> The full Suno Prompt Library has 100+ prompts organized by genre, plus a formula cheatsheet.
    </p>
    ${ctaButton('Get 100+ Prompts ($27)', 'https://frankx.ai/products/suno-prompt-library', 'outline')}
    `,
    { accentColor: T.accentGreen, accentPosition: 'top' }
  )

  return {
    subject: 'Your 5 Suno prompts are ready',
    html: emailWrapper(content, 'The exact prompts behind 500+ plays on Suno AI. Download your 5 free prompts now.'),
  }
}

// ─── 6. Purchase Confirmation ────────────────────────────────────

export function purchaseConfirmationEmail(data: {
  customerName: string
  productName: string
  downloadLinks: Array<{ name: string; url: string }>
  receiptUrl?: string
}): EmailTemplate {
  const downloadRows = data.downloadLinks
    .map(
      (link) => `
    <tr>
      <td style="padding: 14px 0; border-bottom: 1px solid ${T.borderGlass};">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="font-family: ${T.fontStack}; font-size: 15px; font-weight: 600; color: ${T.textPrimary}; padding-right: 12px;">${link.name}</td>
            <td align="right" style="white-space: nowrap;">
              <a href="${link.url}" style="display: inline-block; padding: 10px 18px; background: ${T.accentPurple}; color: white; text-decoration: none; border-radius: 8px; font-family: ${T.fontStack}; font-size: 13px; font-weight: 600;">
                Download
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>`
    )
    .join('')

  const content = glassCard(
    `
    ${mascotWithSpeech('celebrating', `Thank you, ${data.customerName}! Your files are ready.`)}

    <h1 class="h1" style="font-family: ${T.fontStack}; font-size: 26px; font-weight: 700; color: ${T.textPrimary}; margin: 0 0 18px 0; line-height: 1.3; letter-spacing: -0.02em;">
      Your purchase is ready.
    </h1>

    <p style="font-family: ${T.fontStack}; font-size: 16px; color: ${T.textSecondary}; line-height: 1.65; margin: 0 0 8px 0;">
      Thank you for purchasing <strong style="color: ${T.textPrimary};">${data.productName}</strong>.
    </p>

    <p style="font-family: ${T.fontStack}; font-size: 15px; color: ${T.textMuted}; line-height: 1.65; margin: 0 0 28px 0;">
      Your files are ready to download. Links below are valid for 7 days.
    </p>

    ${highlightBox('Your Files', `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${downloadRows}
      </table>
    `, T.accentPurple)}

    ${data.receiptUrl ? `
    <p style="font-family: ${T.fontStack}; font-size: 13px; color: ${T.textDim}; margin: 16px 0 0 0;">
      <a href="${data.receiptUrl}" style="color: ${T.accentCyan}; text-decoration: none;">View your receipt</a>
    </p>
    ` : ''}

    ${signatureBlock('Need help? Reply to this email.')}
    `,
    { accentColor: T.accentPurple, accentPosition: 'top' }
  )

  return {
    subject: `Your ${data.productName} is ready to download`,
    html: emailWrapper(content, `Your ${data.productName} purchase is complete. Download your files now.`),
  }
}

// ─── 7. Album Release ────────────────────────────────────────────

export function albumReleaseEmail(data: {
  recipientName: string
  albumTitle: string
  albumDescription: string
  trackPreviews: Array<{ title: string; genre: string; sunoUrl: string }>
  listenUrl: string
}): EmailTemplate {
  const trackRows = data.trackPreviews
    .map(
      (t) => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid ${T.borderGlass};">
        <a href="${t.sunoUrl}" style="font-family: ${T.fontStack}; color: ${T.accentCyan}; text-decoration: none; font-weight: 600; font-size: 15px; line-height: 1.4;">${t.title}</a>
        <br><span style="font-family: ${T.fontStack}; font-size: 13px; color: ${T.textDim};">${t.genre}</span>
      </td>
    </tr>`
    )
    .join('')

  const content = glassCard(
    `
    ${sectionLabel('New Album', T.accentGreen)}

    <h1 class="h1" style="font-family: ${T.fontStack}; font-size: 26px; font-weight: 700; color: ${T.textPrimary}; margin: 0 0 18px 0; line-height: 1.3; letter-spacing: -0.02em;">
      ${data.albumTitle}
    </h1>

    <p style="font-family: ${T.fontStack}; font-size: 16px; color: ${T.textSecondary}; line-height: 1.65; margin: 0 0 28px 0;">
      ${data.albumDescription}
    </p>

    ${highlightBox('Preview Tracks', `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="color: ${T.textPrimary};">
        ${trackRows}
      </table>
    `, T.accentGreen)}

    ${ctaButton('Listen Now', data.listenUrl, 'accent', T.accentGreen)}
    `,
    { accentColor: T.accentGreen, accentPosition: 'top' }
  )

  return {
    subject: `New album: ${data.albumTitle}`,
    html: emailWrapper(content, `${data.albumTitle} — ${data.albumDescription}`),
  }
}

// ─── Template 8: GenCreator Welcome ──────────────────────────────

export function gencreatorWelcomeEmail(data: {
  recipientName: string
}): EmailTemplate {
  const content = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #1E293B; border-top: 3px solid #10B981; border-radius: 12px;">
      <tr>
        <td class="content-pad" style="padding: 24px 20px;">

          <p style="font-size: 12px; color: #10B981; margin: 0 0 8px 0; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">GenCreator Framework</p>

          <h1 class="h1" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 700; color: white; margin: 0 0 16px 0; line-height: 1.3;">
            Welcome to GenCreator, ${data.recipientName}.
          </h1>

          <p style="font-size: 16px; color: #CBD5E1; line-height: 1.6; margin: 0 0 12px 0;">
            You just joined the GenCreator Framework — the operating system for AI-native creators who ship daily.
          </p>

          <p style="font-size: 15px; color: #94a3b8; line-height: 1.6; margin: 0 0 24px 0;">
            Here is your Starter Kit. Bookmark it. Use it. Build on it.
          </p>

          <!-- Starter Kit items -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 24px 0;">
            <tr>
              <td style="padding: 16px 0 16px 16px; border-left: 3px solid #10B981;">
                <p style="font-size: 12px; color: #10B981; margin: 0 0 12px 0; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Your Starter Kit</p>
                <p style="font-size: 15px; color: #CBD5E1; margin: 0 0 6px 0; line-height: 1.5;"><span style="color: #10B981;">1.</span> <strong style="color: white;">soul.md Template</strong> — <a href="https://frankx.ai/gencreator/soul" style="color: #10B981; text-decoration: none;">Build yours now</a></p>
                <p style="font-size: 15px; color: #CBD5E1; margin: 0 0 6px 0; line-height: 1.5;"><span style="color: #10B981;">2.</span> <strong style="color: white;">12 Principles</strong> — <a href="https://frankx.ai/gencreator/principles" style="color: #10B981; text-decoration: none;">Read the philosophy</a></p>
                <p style="font-size: 15px; color: #CBD5E1; margin: 0 0 6px 0; line-height: 1.5;"><span style="color: #10B981;">3.</span> <strong style="color: white;">Self-Assessment</strong> — <a href="https://frankx.ai/gencreator/assess" style="color: #10B981; text-decoration: none;">Score your 7 dimensions</a></p>
                <p style="font-size: 15px; color: #CBD5E1; margin: 0; line-height: 1.5;"><span style="color: #10B981;">4.</span> <strong style="color: white;">The Manifesto</strong> — <a href="https://frankx.ai/gencreator/manifesto" style="color: #10B981; text-decoration: none;">Read it. Share it. Live it.</a></p>
              </td>
            </tr>
          </table>

          ${ctaButton('Open the Framework', 'https://frankx.ai/gencreator', '#10B981')}
          ${outlineButton('Take the Assessment', 'https://frankx.ai/gencreator/assess')}

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #334155;">
            <tr>
              <td style="padding: 20px 0 0 0;">
                <p style="font-size: 14px; color: #94a3b8; margin: 0 0 4px 0; line-height: 1.5;">You will also get the weekly GenCreator dispatch — tools, techniques, and frameworks for AI-native creators.</p>
                <p style="font-size: 13px; color: #64748b; margin: 0;">Reply anytime. I read every email. — Frank</p>
              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>
  `

  return {
    subject: 'Your GenCreator Starter Kit',
    html: emailWrapper(content, 'Welcome to GenCreator. Your starter kit is inside — soul.md template, 12 principles, self-assessment, and the manifesto.')
  }
}
