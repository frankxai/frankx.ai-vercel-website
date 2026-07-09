import { socialLinks } from '@/lib/social-links'
import { buildUnsubscribeUrl } from '@/lib/email-config'

/**
 * Welcome Sequence Email Templates for FrankX.AI
 *
 * 3-email onboarding sequence:
 *   Email 1 (immediate): Welcome to the FrankX Ecosystem
 *   Email 2 (Day 2): Your AI Toolkit for 2026
 *   Email 3 (Day 5): What's Next
 *
 * Design: Dark glassmorphic (#0a0a0b bg, white text, cyan/purple accents)
 * Author: Frank Riemer
 * From: Frank <frank@mail.frankx.ai>
 *
 * Mobile-first, CAN-SPAM compliant, Outlook VML fallbacks.
 */

interface EmailTemplate {
  subject: string
  html: string
}

// --- Shared Helpers ---

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

function resourceRow(label: string, description: string, url: string, accentColor: string = '#22d3ee'): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 16px;">
      <tr>
        <td style="padding: 14px 16px; background-color: rgba(30, 41, 59, 0.6); border-radius: 10px; border-left: 3px solid ${accentColor};">
          <a href="${url}" style="font-size: 15px; font-weight: 600; color: #ffffff; text-decoration: none; line-height: 1.4;">${label}</a>
          <p style="font-size: 13px; color: #94a3b8; margin: 4px 0 0 0; line-height: 1.5;">${description}</p>
        </td>
      </tr>
    </table>`
}

function welcomeWrapper(content: string, preheader: string = '', recipientEmail?: string): string {
  const unsubscribeUrl = recipientEmail ? buildUnsubscribeUrl(recipientEmail) : 'https://frankx.ai/unsubscribe'
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
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0a0a0b; color: #E2E8F0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">

  ${preheader ? `
  <div style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">
    ${preheader}
    ${'&nbsp;&zwnj;'.repeat(30)}
  </div>
  ` : ''}

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0b;">
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
                          <a href="${socialLinks.linkedin}" style="color: #64748b; text-decoration: none; font-size: 13px; font-weight: 500;">LinkedIn</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 8px;">
                    <p style="font-size: 11px; color: #475569; margin: 0; line-height: 1.6;">
                      You received this because you signed up at frankx.ai<br>
                      <a href="${unsubscribeUrl}" style="color: #64748b; text-decoration: underline;">Unsubscribe</a>
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

// --- Email 1: Welcome to the FrankX Ecosystem (Immediate) ---

export function welcomeEmail1(data: {
  recipientName: string
  recipientEmail?: string
}): EmailTemplate {
  const name = data.recipientName || 'Creator'

  const content = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #1E293B; border-top: 3px solid #7C3AED; border-radius: 12px;">
      <tr>
        <td class="content-pad" style="padding: 24px 20px;">

          <h1 class="h1" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 700; color: white; margin: 0 0 16px 0; line-height: 1.3;">
            Welcome to the FrankX Ecosystem, ${name}.
          </h1>

          <p style="font-size: 16px; color: #CBD5E1; line-height: 1.6; margin: 0 0 12px 0;">
            I'm Frank Riemer. I bring former enterprise AI architecture experience into FrankX and create AI music in the studio at night — 12,000+ tracks and counting.
          </p>

          <p style="font-size: 15px; color: #94a3b8; line-height: 1.6; margin: 0 0 24px 0;">
            You just joined a community of creators and builders who use AI as a creative amplifier. Here are three resources to get you started right away.
          </p>

          <!-- Top 3 Resources -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 8px 0;">
            <tr>
              <td style="padding: 0 0 8px 0;">
                <p style="font-size: 12px; color: #7C3AED; margin: 0 0 12px 0; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Start Here</p>
              </td>
            </tr>
          </table>

          ${resourceRow(
            'The FrankX Research Lab',
            'Field-tested notes on AI tools, workflows, and production techniques.',
            'https://frankx.ai/research',
            '#7C3AED'
          )}

          ${resourceRow(
            '500+ AI Music Tracks',
            'Browse the full catalog. Every genre. Every experiment. All created with AI.',
            'https://frankx.ai/music',
            '#22d3ee'
          )}

          ${resourceRow(
            'Free Suno Prompt Pack',
            'Five production-ready prompts from my top-performing tracks. Copy, paste, create.',
            'https://frankx.ai/products/5-suno-prompts',
            '#10b981'
          )}

          <!-- What to Expect -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 8px 0 24px 0;">
            <tr>
              <td style="padding: 16px 0 16px 16px; border-left: 3px solid #22d3ee;">
                <p style="font-size: 12px; color: #22d3ee; margin: 0 0 12px 0; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">What to Expect</p>
                <p style="font-size: 15px; color: #CBD5E1; margin: 0 0 6px 0; line-height: 1.5;"><span style="color: #22d3ee;">›</span> <strong style="color: white;">Curated AI insights</strong> — tools and techniques that actually work</p>
                <p style="font-size: 15px; color: #CBD5E1; margin: 0 0 6px 0; line-height: 1.5;"><span style="color: #22d3ee;">›</span> <strong style="color: white;">Behind-the-scenes</strong> — from late-night studio sessions and enterprise builds</p>
                <p style="font-size: 15px; color: #CBD5E1; margin: 0; line-height: 1.5;"><span style="color: #22d3ee;">›</span> <strong style="color: white;">Early access</strong> — new guides, frameworks, and products before anyone else</p>
              </td>
            </tr>
          </table>

          ${ctaButton('Explore the Ecosystem', 'https://frankx.ai/start')}

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #334155;">
            <tr>
              <td style="padding: 20px 0 0 0;">
                <p style="font-size: 14px; color: #94a3b8; margin: 0 0 4px 0; line-height: 1.5;">Reply anytime. I read every email.</p>
                <p style="font-size: 13px; color: #64748b; margin: 0;">— Frank</p>
              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>
  `

  return {
    subject: 'Welcome to the FrankX Ecosystem',
    html: welcomeWrapper(content, 'You\'re in. Here are three resources to get started right away.', data.recipientEmail)
  }
}

// --- Email 2: Your AI Toolkit for 2026 (Day 2) ---

export function welcomeEmail2(data: {
  recipientName: string
}): EmailTemplate {
  const name = data.recipientName || 'Creator'

  const content = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #1E293B; border-top: 3px solid #22d3ee; border-radius: 12px;">
      <tr>
        <td class="content-pad" style="padding: 24px 20px;">

          <p style="font-size: 12px; color: #22d3ee; margin: 0 0 8px 0; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Your Learning Path</p>

          <h1 class="h1" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 700; color: white; margin: 0 0 16px 0; line-height: 1.3;">
            Your AI Toolkit for 2026, ${name}.
          </h1>

          <p style="font-size: 16px; color: #CBD5E1; line-height: 1.6; margin: 0 0 12px 0;">
            The AI landscape moves fast. I spend hours every week testing tools so you can skip the noise and focus on what delivers results.
          </p>

          <p style="font-size: 15px; color: #94a3b8; line-height: 1.6; margin: 0 0 24px 0;">
            Here are five resources I recommend to every creator and builder entering the AI space in 2026 — each one selected because I use it myself.
          </p>

          <!-- 5 Best Resources -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 8px 0;">
            <tr>
              <td style="padding: 0 0 8px 0;">
                <p style="font-size: 12px; color: #7C3AED; margin: 0 0 12px 0; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Curated for You</p>
              </td>
            </tr>
          </table>

          ${resourceRow(
            '01 — AI Music Production Guide',
            'From blank prompt to finished track. The workflow behind 12,000+ songs.',
            'https://frankx.ai/research',
            '#22d3ee'
          )}

          ${resourceRow(
            '02 — Prompt Library',
            'Battle-tested prompts for Suno, ChatGPT, Claude, and Midjourney. Organized by use case.',
            'https://frankx.ai/prompt-library',
            '#7C3AED'
          )}

          ${resourceRow(
            '03 — GenCreator OS',
            'The operating system for AI-native creators. Frameworks for content, music, and product shipping.',
            'https://frankx.ai/gencreator',
            '#10b981'
          )}

          ${resourceRow(
            '04 — The Research Lab',
            'Long-form analysis of AI tools, market shifts, and creator strategies. Updated weekly.',
            'https://frankx.ai/research',
            '#22d3ee'
          )}

          ${resourceRow(
            '05 — Creator Community',
            'Connect with builders who are shipping real work with AI. Share wins, ask questions, grow together.',
            'https://frankx.ai/community',
            '#7C3AED'
          )}

          <!-- Quick Tip -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 16px 0 24px 0;">
            <tr>
              <td style="padding: 16px; background: rgba(124, 58, 237, 0.1); border-left: 3px solid #7C3AED; border-radius: 0 10px 10px 0;">
                <p style="font-size: 12px; color: #7C3AED; margin: 0 0 8px 0; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Pro Tip</p>
                <p style="font-size: 15px; color: #E2E8F0; margin: 0; line-height: 1.6;">
                  <strong style="color: white;">Start with one tool. Master it. Then expand.</strong> The creators who ship the most are the ones who go deep before going wide. Pick the resource above that matches where you are right now.
                </p>
              </td>
            </tr>
          </table>

          ${ctaButton('Browse the Prompt Library', 'https://frankx.ai/prompt-library', '#22d3ee')}
          ${outlineButton('Explore GenCreator OS', 'https://frankx.ai/gencreator')}

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #334155;">
            <tr>
              <td style="padding: 20px 0 0 0;">
                <p style="font-size: 14px; color: #94a3b8; margin: 0 0 4px 0; line-height: 1.5;">Tomorrow I'll share what's next — including how to accelerate your progress with direct guidance.</p>
                <p style="font-size: 13px; color: #64748b; margin: 0;">— Frank</p>
              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>
  `

  return {
    subject: 'Your AI Toolkit for 2026',
    html: welcomeWrapper(content, 'Five curated resources to accelerate your AI creative journey.')
  }
}

// --- Email 3: What's Next (Day 5) ---

export function welcomeEmail3(data: {
  recipientName: string
}): EmailTemplate {
  const name = data.recipientName || 'Creator'

  const content = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #1E293B; border-top: 3px solid #10b981; border-radius: 12px;">
      <tr>
        <td class="content-pad" style="padding: 24px 20px;">

          <p style="font-size: 12px; color: #10b981; margin: 0 0 8px 0; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Day 5</p>

          <h1 class="h1" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 700; color: white; margin: 0 0 16px 0; line-height: 1.3;">
            What's Next, ${name}?
          </h1>

          <p style="font-size: 16px; color: #CBD5E1; line-height: 1.6; margin: 0 0 12px 0;">
            You've had a few days to explore. By now you've probably found a tool or technique that resonated. The question is — what do you do with that momentum?
          </p>

          <p style="font-size: 15px; color: #94a3b8; line-height: 1.6; margin: 0 0 24px 0;">
            I've watched hundreds of creators go from curious to shipping real work. The ones who accelerate fastest all have one thing in common: they get feedback from someone who's already done it.
          </p>

          <!-- Coaching Section -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 24px 0;">
            <tr>
              <td style="padding: 20px; background: linear-gradient(135deg, rgba(124, 58, 237, 0.12) 0%, rgba(34, 211, 238, 0.08) 100%); border-radius: 12px; border: 1px solid rgba(124, 58, 237, 0.2);">
                <p style="font-size: 12px; color: #7C3AED; margin: 0 0 12px 0; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Direct Guidance</p>
                <h2 style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 700; color: white; margin: 0 0 12px 0; line-height: 1.3;">
                  1:1 Creator Coaching
                </h2>
                <p style="font-size: 15px; color: #CBD5E1; line-height: 1.6; margin: 0 0 16px 0;">
                  Work directly with me on your AI creative stack — from prompt engineering to production workflows to shipping products. Sessions are tailored to where you are and where you want to go.
                </p>
                <p style="font-size: 14px; color: #94a3b8; line-height: 1.5; margin: 0 0 6px 0;"><span style="color: #10b981;">›</span> <strong style="color: white;">Personalized strategy</strong> based on your goals and current skill level</p>
                <p style="font-size: 14px; color: #94a3b8; line-height: 1.5; margin: 0 0 6px 0;"><span style="color: #10b981;">›</span> <strong style="color: white;">Hands-on feedback</strong> on your prompts, workflows, and output</p>
                <p style="font-size: 14px; color: #94a3b8; line-height: 1.5; margin: 0;">  <span style="color: #10b981;">›</span> <strong style="color: white;">Ongoing access</strong> to frameworks and resources as they ship</p>
              </td>
            </tr>
          </table>

          ${ctaButton('Apply for Coaching', 'https://frankx.ai/coaching', '#7C3AED')}

          <!-- Assess Section -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 16px 0;">
            <tr>
              <td style="padding: 0 0 8px 0;">
                <p style="font-size: 12px; color: #22d3ee; margin: 0 0 12px 0; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Find Your Starting Point</p>
              </td>
            </tr>
          </table>

          ${resourceRow(
            'Take the Creator Assessment',
            'A quick self-assessment to identify your strengths and the highest-leverage skill to develop next.',
            'https://frankx.ai/assess',
            '#22d3ee'
          )}

          <!-- Community -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 8px 0 24px 0;">
            <tr>
              <td style="padding: 16px 0 16px 16px; border-left: 3px solid #10b981;">
                <p style="font-size: 12px; color: #10b981; margin: 0 0 12px 0; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Join the Community</p>
                <p style="font-size: 15px; color: #CBD5E1; margin: 0 0 6px 0; line-height: 1.5;">
                  Every creator benefits from being around other creators. The FrankX community is where builders share their work, exchange techniques, and push each other forward.
                </p>
              </td>
            </tr>
          </table>

          ${outlineButton('Join the Community', 'https://frankx.ai/community')}

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #334155;">
            <tr>
              <td style="padding: 20px 0 0 0;">
                <p style="font-size: 14px; color: #94a3b8; margin: 0 0 4px 0; line-height: 1.5;">This is the last onboarding email. From here, you'll receive the regular newsletter — curated AI insights, studio notes, and early access to new work.</p>
                <p style="font-size: 14px; color: #94a3b8; margin: 0 0 4px 0; line-height: 1.5;">Reply anytime. I read every message.</p>
                <p style="font-size: 13px; color: #64748b; margin: 0;">— Frank</p>
              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>
  `

  return {
    subject: 'What\'s next for you?',
    html: welcomeWrapper(content, 'You\'ve explored the tools. Here\'s how to accelerate from here.')
  }
}
