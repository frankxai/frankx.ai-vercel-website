/**
 * Email Template System v2.0 for FrankX.AI
 *
 * MOBILE-FIRST design:
 * - Inline styles optimized for 375px mobile (Gmail strips <style> on mobile)
 * - <style> block enhances desktop (Apple Mail, Gmail web, Outlook Mac)
 * - System font stack (web fonts unreliable in email)
 * - Dark navy (#0F172A) with premium accent colors
 * - No emojis (brand guideline)
 * - CAN-SPAM compliant (unsubscribe link)
 * - Outlook VML button fallbacks
 * - 48px+ touch targets (WCAG 2.1 AAA)
 * - Preheader text for inbox preview
 */

interface EmailTemplate {
  subject: string
  html: string
}

// ─── Shared CTA Button ────────────────────────────────────────────

function ctaButton(text: string, url: string, color: string = '#7C3AED'): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td class="cta-td" align="center" style="padding: 8px 0 24px 0;">
          <!--[if mso]>
          <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="${url}" style="height:48px;v-text-anchor:middle;width:280px;" arcsize="20%" fillcolor="${color}">
          <center style="color:white;font-size:16px;font-weight:600;">${text}</center>
          </v:roundrect>
          <![endif]-->
          <!--[if !mso]><!-->
          <a href="${url}" style="display: block; max-width: 340px; margin: 0 auto; padding: 14px 24px; background-color: ${color}; color: white; text-decoration: none; border-radius: 10px; font-size: 16px; font-weight: 600; text-align: center;">
            ${text}
          </a>
          <!--<![endif]-->
        </td>
      </tr>
    </table>`
}

function outlineButton(text: string, url: string): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding: 0 0 16px 0;">
          <a href="${url}" style="display: block; max-width: 340px; margin: 0 auto; padding: 14px 24px; background-color: transparent; color: #E2E8F0; text-decoration: none; border-radius: 10px; font-size: 15px; font-weight: 600; text-align: center; border: 1px solid #475569;">
            ${text}
          </a>
        </td>
      </tr>
    </table>`
}

// ─── Email Wrapper ────────────────────────────────────────────────

function emailWrapper(content: string, preheader: string = ''): string {
  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>FrankX.AI</title>
  <style type="text/css">
    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
    }
    @media only screen and (min-width: 601px) {
      .content-pad { padding: 40px 36px !important; }
      .outer-pad { padding: 40px 16px !important; }
      .h1 { font-size: 30px !important; }
      .cta-td { padding: 12px 0 32px 0 !important; }
    }
  </style>
  <!--[if mso]>
  <style type="text/css">
    body, table, td { font-family: Arial, Helvetica, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0F172A; color: #E2E8F0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">

  ${preheader ? `
  <div style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">
    ${preheader}
    ${'&nbsp;&zwnj;'.repeat(30)}
  </div>
  ` : ''}

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0F172A;">
    <tr>
      <td class="outer-pad" align="center" style="padding: 24px 12px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding: 0 0 24px 0;">
              <!--[if mso]>
              <table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="background-color: #7C3AED; padding: 10px 20px;">
              <![endif]-->
              <a href="https://frankx.ai" style="display: inline-block; padding: 10px 20px; background-color: #7C3AED; border-radius: 10px; text-decoration: none;">
                <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 700; color: white; letter-spacing: -0.02em;">FrankX.AI</span>
              </a>
              <!--[if mso]>
              </td></tr></table>
              <![endif]-->
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td>${content}</td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top: 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-top: 1px solid #1E293B; padding-top: 24px;" align="center">
                    <p style="font-size: 14px; color: #94a3b8; margin: 0 0 4px 0; font-weight: 600;">Frank Riemer</p>
                    <p style="font-size: 13px; color: #64748b; margin: 0;">AI Architect &middot; Creator</p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding: 16px 0;">
                    <table role="presentation" cellpadding="0" cellspacing="0" align="center">
                      <tr>
                        <td style="padding: 8px 12px;">
                          <a href="https://frankx.ai" style="color: #22d3ee; text-decoration: none; font-size: 13px; font-weight: 500;">frankx.ai</a>
                        </td>
                        <td style="padding: 8px 12px;">
                          <a href="https://x.com/frankxeth" style="color: #64748b; text-decoration: none; font-size: 13px; font-weight: 500;">X / Twitter</a>
                        </td>
                        <td style="padding: 8px 12px;">
                          <a href="https://www.linkedin.com/in/frank-x-riemer/" style="color: #64748b; text-decoration: none; font-size: 13px; font-weight: 500;">LinkedIn</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 8px;">
                    <p style="font-size: 11px; color: #475569; margin: 0; line-height: 1.6;">
                      You received this because you signed up at frankx.ai<br>
                      <a href="https://frankx.ai/unsubscribe" style="color: #64748b; text-decoration: underline;">Unsubscribe</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

// ─── Template 1: PDF Guide Delivery ───────────────────────────────

export function pdfDeliveryEmail(data: {
  recipientName: string
  pdfTitle: string
  pdfUrl: string
  guideDescription?: string
}): EmailTemplate {
  const content = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #1E293B; border-top: 3px solid #22d3ee; border-radius: 12px;">
      <tr>
        <td class="content-pad" style="padding: 24px 20px;">

          <h1 class="h1" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 700; color: white; margin: 0 0 16px 0; line-height: 1.3;">
            Your guide is ready, ${data.recipientName}.
          </h1>

          <p style="font-size: 16px; color: #CBD5E1; line-height: 1.6; margin: 0 0 12px 0;">
            <strong style="color: #22d3ee;">${data.pdfTitle}</strong> — the same frameworks I use to create AI music and build enterprise systems. Yours now.
          </p>

          <p style="font-size: 15px; color: #94a3b8; line-height: 1.6; margin: 0 0 24px 0;">
            Each section is built to be actionable. No theory dumps. Just what works.
          </p>

          <!-- What's inside -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 24px 0;">
            <tr>
              <td style="padding: 16px 0 16px 16px; border-left: 3px solid #22d3ee;">
                <p style="font-size: 12px; color: #22d3ee; margin: 0 0 12px 0; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Inside This Guide</p>
                <p style="font-size: 15px; color: #CBD5E1; margin: 0 0 6px 0; line-height: 1.5;"><span style="color: #22d3ee;">›</span> <strong style="color: white;">Tested frameworks</strong> — used in production, not hypothetical</p>
                <p style="font-size: 15px; color: #CBD5E1; margin: 0 0 6px 0; line-height: 1.5;"><span style="color: #22d3ee;">›</span> <strong style="color: white;">Ready-to-use templates</strong> — copy, customize, ship</p>
                <p style="font-size: 15px; color: #CBD5E1; margin: 0; line-height: 1.5;"><span style="color: #22d3ee;">›</span> <strong style="color: white;">Step-by-step walkthroughs</strong> — blank page to done</p>
              </td>
            </tr>
          </table>

          ${ctaButton('Download Your Guide', data.pdfUrl)}

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #334155;">
            <tr>
              <td style="padding: 20px 0 0 0;">
                <p style="font-size: 14px; color: #94a3b8; margin: 0 0 4px 0; line-height: 1.5;">Questions? Reply to this email. I read every one.</p>
                <p style="font-size: 13px; color: #64748b; margin: 0;">More at <a href="https://frankx.ai/blog" style="color: #22d3ee; text-decoration: none;">frankx.ai/blog</a></p>
              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>
  `

  return {
    subject: `${data.pdfTitle} — your download is ready`,
    html: emailWrapper(content, `Your ${data.pdfTitle} guide from FrankX.AI is ready to download.`)
  }
}

// ─── Template 2: Newsletter Welcome ───────────────────────────────

export function newsletterWelcomeEmail(data: {
  recipientName: string
}): EmailTemplate {
  const content = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #1E293B; border-top: 3px solid #7C3AED; border-radius: 12px;">
      <tr>
        <td class="content-pad" style="padding: 24px 20px;">

          <h1 class="h1" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 700; color: white; margin: 0 0 16px 0; line-height: 1.3;">
            Welcome, ${data.recipientName}.
          </h1>

          <p style="font-size: 16px; color: #CBD5E1; line-height: 1.6; margin: 0 0 12px 0;">
            I'm Frank. I build enterprise AI systems during the day. At night I'm in the studio — 12,000+ AI-generated songs and counting.
          </p>

          <p style="font-size: 15px; color: #94a3b8; line-height: 1.6; margin: 0 0 24px 0;">
            This list is where I share what I'm learning — tools that work, techniques I've tested, and the occasional behind-the-scenes from late-night building sessions.
          </p>

          <!-- What to expect -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 24px 0;">
            <tr>
              <td style="padding: 16px 0 16px 16px; border-left: 3px solid #7C3AED;">
                <p style="font-size: 12px; color: #7C3AED; margin: 0 0 12px 0; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">What to Expect</p>
                <p style="font-size: 15px; color: #CBD5E1; margin: 0 0 6px 0; line-height: 1.5;"><span style="color: #7C3AED;">›</span> <strong style="color: white;">AI tools and workflows</strong> — what's actually useful, not hype</p>
                <p style="font-size: 15px; color: #CBD5E1; margin: 0 0 6px 0; line-height: 1.5;"><span style="color: #7C3AED;">›</span> <strong style="color: white;">Music creation insights</strong> — prompts, techniques, production notes</p>
                <p style="font-size: 15px; color: #CBD5E1; margin: 0 0 6px 0; line-height: 1.5;"><span style="color: #7C3AED;">›</span> <strong style="color: white;">Early access</strong> — new guides and frameworks before public</p>
                <p style="font-size: 15px; color: #CBD5E1; margin: 0; line-height: 1.5;"><span style="color: #7C3AED;">›</span> <strong style="color: white;">Real results</strong> — successes, failures, and everything between</p>
              </td>
            </tr>
          </table>

          ${ctaButton('Read Latest Posts', 'https://frankx.ai/blog')}
          ${outlineButton('Hear the Music', 'https://frankx.ai/music')}

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #334155;">
            <tr>
              <td style="padding: 20px 0 0 0;">
                <p style="font-size: 14px; color: #94a3b8; margin: 0 0 4px 0; line-height: 1.5;">Reply anytime. I read every email.</p>
                <p style="font-size: 13px; color: #64748b; margin: 0;">No spam. No fluff. Just what works.</p>
              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>
  `

  return {
    subject: 'Welcome to FrankX.AI',
    html: emailWrapper(content, "I'm Frank. AI architect by day, music creator by night. Here's what to expect.")
  }
}

// ─── Template 3: Test Email ───────────────────────────────────────

export function testEmail(data: {
  recipientName: string
  testMessage?: string
}): EmailTemplate {
  const content = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #1E293B; border-top: 3px solid #7C3AED; border-radius: 12px;">
      <tr>
        <td class="content-pad" style="padding: 24px 20px;">

          <h1 class="h1" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 700; color: white; margin: 0 0 16px 0; line-height: 1.3;">
            Email System Test
          </h1>

          <p style="font-size: 16px; color: #CBD5E1; line-height: 1.6; margin: 0 0 16px 0;">
            Hey ${data.recipientName} — verifying that the Resend integration is working correctly.
          </p>

          ${data.testMessage ? `
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 20px 0;">
              <tr>
                <td style="padding: 12px 0 12px 16px; border-left: 3px solid #22d3ee;">
                  <p style="font-size: 12px; color: #22d3ee; margin: 0 0 8px 0; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Message</p>
                  <p style="font-size: 15px; color: #E2E8F0; margin: 0; line-height: 1.5;">${data.testMessage}</p>
                </td>
              </tr>
            </table>
          ` : ''}

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 20px 0;">
            <tr>
              <td style="padding: 12px 0 12px 16px; border-left: 3px solid #10b981;">
                <p style="font-size: 12px; color: #10b981; margin: 0 0 10px 0; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">System Check</p>
                <p style="font-size: 14px; color: #E2E8F0; margin: 0 0 4px 0;"><span style="color: #10b981;">&#10003;</span> Email service (Resend API)</p>
                <p style="font-size: 14px; color: #E2E8F0; margin: 0 0 4px 0;"><span style="color: #10b981;">&#10003;</span> Template rendering</p>
                <p style="font-size: 14px; color: #E2E8F0; margin: 0 0 4px 0;"><span style="color: #10b981;">&#10003;</span> Brand styling</p>
                <p style="font-size: 14px; color: #E2E8F0; margin: 0;"><span style="color: #10b981;">&#10003;</span> Deliverability confirmed</p>
              </td>
            </tr>
          </table>

          <p style="font-size: 12px; color: #64748b; margin: 0;">
            Sent at ${new Date().toISOString()}
          </p>

        </td>
      </tr>
    </table>
  `

  return {
    subject: 'FrankX.AI — Email system test',
    html: emailWrapper(content, 'This is a test email from your FrankX.AI email system.')
  }
}

// ─── Template 4: Community Broadcast ──────────────────────────────

export function communityBroadcastEmail(data: {
  recipientName: string
  headline: string
  bodyContent: string
  ctaText?: string
  ctaUrl?: string
}): EmailTemplate {
  const content = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #1E293B; border-top: 3px solid #7C3AED; border-radius: 12px;">
      <tr>
        <td class="content-pad" style="padding: 24px 20px;">

          <h1 class="h1" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 700; color: white; margin: 0 0 16px 0; line-height: 1.3;">
            ${data.headline}
          </h1>

          <div style="font-size: 16px; color: #CBD5E1; line-height: 1.6; margin: 0 0 24px 0;">
            ${data.bodyContent}
          </div>

          ${data.ctaText && data.ctaUrl ? ctaButton(data.ctaText, data.ctaUrl) : ''}

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #334155;">
            <tr>
              <td style="padding: 20px 0 0 0;">
                <p style="font-size: 14px; color: #94a3b8; margin: 0; line-height: 1.5;">— Frank</p>
              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>
  `

  return {
    subject: data.headline,
    html: emailWrapper(content, data.bodyContent.substring(0, 120).replace(/<[^>]*>/g, ''))
  }
}

// ─── Template 5: Music Prompts Lead Magnet ────────────────────────

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

  const trackRows = tracks.map(t => `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #1E293B;">
                <a href="${t.url}" style="color: #22d3ee; text-decoration: none; font-weight: 600; font-size: 15px; line-height: 1.4;">${t.title}</a>
                <br><span style="font-size: 13px; color: #64748b;">${t.genre} &middot; ${t.stat}</span>
              </td>
            </tr>`).join('')

  const content = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #1E293B; border-top: 3px solid #10b981; border-radius: 12px;">
      <tr>
        <td class="content-pad" style="padding: 24px 20px;">

          <h1 class="h1" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 700; color: white; margin: 0 0 16px 0; line-height: 1.3;">
            Your 5 Suno prompts are ready, ${data.recipientName}.
          </h1>

          <p style="font-size: 16px; color: #CBD5E1; line-height: 1.6; margin: 0 0 8px 0;">
            These are the exact prompts behind my top-performing tracks. 500+ combined plays, refined over 12,000+ songs.
          </p>

          <p style="font-size: 15px; color: #94a3b8; line-height: 1.6; margin: 0 0 24px 0;">
            Each one includes a breakdown of <strong style="color: #10b981;">why it works</strong> and <strong style="color: #10b981;">variations to try</strong>. Copy, paste, create.
          </p>

          ${ctaButton('Download Your 5 Prompts', data.downloadUrl, '#059669')}

          <!-- Track list -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 24px 0;">
            <tr>
              <td style="padding: 16px 0 8px 16px; border-left: 3px solid #10b981;">
                <p style="font-size: 12px; color: #10b981; margin: 0 0 8px 0; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Tracks Included</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="color: #E2E8F0;">
                  ${trackRows}
                </table>
              </td>
            </tr>
          </table>

          <!-- Upsell -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #334155;">
            <tr>
              <td style="padding: 20px 0 0 0;">
                <p style="font-size: 15px; color: #CBD5E1; margin: 0 0 12px 0; line-height: 1.5;">
                  <strong style="color: white;">Want more?</strong> The full Suno Prompt Library has 100+ prompts organized by genre, plus a formula cheatsheet.
                </p>
                ${outlineButton('Get 100+ Prompts ($27)', 'https://frankx.ai/products/suno-prompt-library')}
              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>
  `

  return {
    subject: 'Your 5 Suno prompts are ready',
    html: emailWrapper(content, 'The exact prompts behind 500+ plays on Suno AI. Download your 5 free prompts now.')
  }
}

// ─── Template 6: Purchase Confirmation ────────────────────────────

export function purchaseConfirmationEmail(data: {
  customerName: string
  productName: string
  downloadLinks: Array<{ name: string; url: string }>
  receiptUrl?: string
}): EmailTemplate {
  const downloadRows = data.downloadLinks.map(link => `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1E293B;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size: 15px; font-weight: 600; color: #E2E8F0; padding-right: 12px;">${link.name}</td>
                    <td align="right" style="white-space: nowrap;">
                      <a href="${link.url}" style="display: inline-block; padding: 8px 16px; background-color: #7C3AED; color: white; text-decoration: none; border-radius: 8px; font-size: 13px; font-weight: 600;">
                        Download
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>`).join('')

  const content = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #1E293B; border-top: 3px solid #7C3AED; border-radius: 12px;">
      <tr>
        <td class="content-pad" style="padding: 24px 20px;">

          <h1 class="h1" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 700; color: white; margin: 0 0 16px 0; line-height: 1.3;">
            Your purchase is ready, ${data.customerName}.
          </h1>

          <p style="font-size: 16px; color: #CBD5E1; line-height: 1.6; margin: 0 0 8px 0;">
            Thank you for purchasing <strong style="color: white;">${data.productName}</strong>.
          </p>

          <p style="font-size: 15px; color: #94a3b8; line-height: 1.6; margin: 0 0 24px 0;">
            Your files are ready to download. Links below are valid for 7 days.
          </p>

          <!-- Download links -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 24px 0;">
            <tr>
              <td style="padding: 16px 0 8px 16px; border-left: 3px solid #7C3AED;">
                <p style="font-size: 12px; color: #7C3AED; margin: 0 0 8px 0; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Your Files</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${downloadRows}
                </table>
              </td>
            </tr>
          </table>

          ${data.receiptUrl ? `
          <p style="font-size: 13px; color: #64748b; margin: 0;">
            <a href="${data.receiptUrl}" style="color: #22d3ee; text-decoration: none;">View your receipt</a>
          </p>
          ` : ''}

        </td>
      </tr>
    </table>
  `

  return {
    subject: `Your ${data.productName} is ready to download`,
    html: emailWrapper(content, `Your ${data.productName} purchase is complete. Download your files now.`)
  }
}

// ─── Template 7: Album Release ────────────────────────────────────

export function albumReleaseEmail(data: {
  recipientName: string
  albumTitle: string
  albumDescription: string
  trackPreviews: Array<{ title: string; genre: string; sunoUrl: string }>
  listenUrl: string
}): EmailTemplate {
  const trackRows = data.trackPreviews.map(t => `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #1E293B;">
                <a href="${t.sunoUrl}" style="color: #22d3ee; text-decoration: none; font-weight: 600; font-size: 15px; line-height: 1.4;">${t.title}</a>
                <br><span style="font-size: 13px; color: #64748b;">${t.genre}</span>
              </td>
            </tr>`).join('')

  const content = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #1E293B; border-top: 3px solid #10b981; border-radius: 12px;">
      <tr>
        <td class="content-pad" style="padding: 24px 20px;">

          <p style="font-size: 12px; color: #10b981; margin: 0 0 8px 0; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">New Album</p>

          <h1 class="h1" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 700; color: white; margin: 0 0 16px 0; line-height: 1.3;">
            ${data.albumTitle}
          </h1>

          <p style="font-size: 16px; color: #CBD5E1; line-height: 1.6; margin: 0 0 24px 0;">
            ${data.albumDescription}
          </p>

          <!-- Track previews -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 24px 0;">
            <tr>
              <td style="padding: 16px 0 8px 16px; border-left: 3px solid #10b981;">
                <p style="font-size: 12px; color: #10b981; margin: 0 0 8px 0; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Preview Tracks</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="color: #E2E8F0;">
                  ${trackRows}
                </table>
              </td>
            </tr>
          </table>

          ${ctaButton('Listen Now', data.listenUrl, '#059669')}

        </td>
      </tr>
    </table>
  `

  return {
    subject: `New album: ${data.albumTitle}`,
    html: emailWrapper(content, `${data.albumTitle} — ${data.albumDescription}`)
  }
}
