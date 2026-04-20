/**
 * Welcome email for the Ikigai & Branding Workshop list.
 * Sent immediately after subscribe. Delivers the Coach GPT link + Resource Pack promise.
 *
 * Built on the shared design system (email-design-system.ts).
 */

import {
  tokens as T,
  emailWrapper,
  glassCard,
  ctaButton,
  sectionLabel,
  signatureBlock,
} from './email-design-system'

interface EmailTemplate {
  subject: string
  html: string
}

export function ikigaiBrandingEmail({
  recipientName,
}: {
  recipientName: string
}): EmailTemplate {
  const firstName = recipientName?.split(' ')[0] || 'Creator'

  const step1 = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 16px 0;">
      <tr>
        <td style="padding: 20px; background: ${T.gradientGlass}; border-radius: ${T.radius}; border: 1px solid rgba(139, 92, 246, 0.15);">
          ${sectionLabel('Step 1 — Talk to the Coach', T.accentPurple)}
          <p style="font-family: ${T.fontStack}; font-size: 15px; line-height: 1.65; color: ${T.textSecondary}; margin: 0 0 16px 0;">
            I built a free custom GPT that walks you through Ikigai mapping Socratically. Use it alongside the workshop page, or let it run the whole session for you.
          </p>
          ${ctaButton('Open the Ikigai Coach GPT', 'https://frankx.ai/go/ikigai-coach', 'accent', T.accentPurple)}
        </td>
      </tr>
    </table>`

  const step2 = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 24px 0;">
      <tr>
        <td style="padding: 20px; background: rgba(251, 191, 36, 0.04); border-radius: ${T.radius}; border: 1px solid rgba(251, 191, 36, 0.12);">
          ${sectionLabel('Step 2 — Run the Workshop', T.accentGold)}
          <p style="font-family: ${T.fontStack}; font-size: 15px; line-height: 1.65; color: ${T.textSecondary}; margin: 0 0 16px 0;">
            The 4-step wizard, synthesis panel, and Brand Bridge live here. Your progress saves in your browser — nothing leaves until you export.
          </p>
          ${ctaButton('Start the Workshop', 'https://frankx.ai/workshops/ikigai-branding', 'outline')}
        </td>
      </tr>
    </table>`

  const content = glassCard(
    `
    <h1 class="h1" style="font-family: ${T.fontStack}; font-size: 26px; font-weight: 700; color: ${T.textPrimary}; margin: 0 0 14px 0; line-height: 1.3; letter-spacing: -0.02em;">
      Welcome, ${firstName}.
    </h1>

    <p style="font-family: ${T.fontStack}; font-size: 16px; line-height: 1.65; color: ${T.textMuted}; margin: 0 0 28px 0;">
      You just joined the Ikigai &amp; Branding Workshop list. Here is everything you need to go from "I think I know my purpose" to "here is my brand, publicly."
    </p>

    ${step1}
    ${step2}

    <p style="font-family: ${T.fontStack}; font-size: 15px; line-height: 1.7; color: ${T.textSecondary}; margin: 0;">
      <strong style="color: ${T.textPrimary};">What comes next:</strong> On Day 7 I will email you a short check-in — "did you ship one artifact?" If yes, I send the next layer. If not, I send the unblocker.
    </p>

    ${signatureBlock()}
    `,
    { accentColor: T.accentPurple, accentPosition: 'top' }
  )

  return {
    subject: 'Your Ikigai & Branding Resource Pack — plus your free Coach',
    html: emailWrapper(content, 'Your Ikigai Coach GPT and 4-step Brand Workshop are ready.'),
  }
}
