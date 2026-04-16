/**
 * Welcome Sequence Email Templates v3.0 for FrankX.AI
 *
 * 3-email onboarding sequence:
 *   Email 1 (immediate): Welcome to the FrankX Ecosystem
 *   Email 2 (Day 2): Your AI Toolkit for 2026
 *   Email 3 (Day 5): What's Next
 *
 * Built on the shared design system (email-design-system.ts).
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
  mascotWithSpeech,
} from './email-design-system'

interface EmailTemplate {
  subject: string
  html: string
}

// ─── Email 1: Welcome to the FrankX Ecosystem (Immediate) ───────

export function welcomeEmail1(data: { recipientName: string }): EmailTemplate {
  const name = data.recipientName || 'Creator'

  const content = glassCard(
    `
    ${mascotWithSpeech('waving', `Hey ${name}! Welcome aboard. Let me show you around.`)}

    <h1 class="h1" style="font-family: ${T.fontStack}; font-size: 26px; font-weight: 700; color: ${T.textPrimary}; margin: 0 0 18px 0; line-height: 1.3; letter-spacing: -0.02em;">
      Welcome to the FrankX Ecosystem.
    </h1>

    <p style="font-family: ${T.fontStack}; font-size: 16px; color: ${T.textSecondary}; line-height: 1.65; margin: 0 0 12px 0;">
      I'm Frank Riemer. I build enterprise AI systems at Oracle during the day and create AI music in the studio at night — 12,000+ tracks and counting.
    </p>

    <p style="font-family: ${T.fontStack}; font-size: 15px; color: ${T.textMuted}; line-height: 1.65; margin: 0 0 28px 0;">
      You just joined a community of creators and builders who use AI as a creative amplifier. Here are three resources to get you started right away.
    </p>

    ${sectionLabel('Start Here', T.accentPurple)}

    ${resourceCard(
      'The FrankX Research Lab',
      'Deep dives into AI tools, workflows, and production techniques — tested in the field.',
      'https://frankx.ai/research',
      T.accentPurple
    )}

    ${resourceCard(
      '12,000+ AI Music Tracks',
      'Browse the full catalog. Every genre. Every experiment. All created with AI.',
      'https://frankx.ai/music',
      T.accentCyan
    )}

    ${resourceCard(
      'Free Suno Prompt Pack',
      'Five production-ready prompts from my top-performing tracks. Copy, paste, create.',
      'https://frankx.ai/products/5-suno-prompts',
      T.accentGreen
    )}

    ${highlightBox('What to Expect', `
      ${featureRow('Curated AI insights', 'tools and techniques that actually work', T.accentCyan)}
      ${featureRow('Behind-the-scenes', 'from late-night studio sessions and enterprise builds', T.accentCyan)}
      ${featureRow('Early access', 'new guides, frameworks, and products before anyone else', T.accentCyan)}
    `, T.accentCyan)}

    ${ctaButton('Explore the Ecosystem', 'https://frankx.ai/start')}

    ${signatureBlock('Reply anytime. I read every email.')}
    `,
    { accentColor: T.accentPurple, accentPosition: 'top' }
  )

  return {
    subject: 'Welcome to the FrankX Ecosystem',
    html: emailWrapper(content, "You're in. Here are three resources to get started right away."),
  }
}

// ─── Email 2: Your AI Toolkit for 2026 (Day 2) ──────────────────

export function welcomeEmail2(data: { recipientName: string }): EmailTemplate {
  const name = data.recipientName || 'Creator'

  const content = glassCard(
    `
    ${sectionLabel('Your Learning Path', T.accentCyan)}

    ${mascotWithSpeech('thinking', `Day 2, ${name}. Time to pick your tools.`)}

    <h1 class="h1" style="font-family: ${T.fontStack}; font-size: 26px; font-weight: 700; color: ${T.textPrimary}; margin: 0 0 18px 0; line-height: 1.3; letter-spacing: -0.02em;">
      Your AI Toolkit for 2026.
    </h1>

    <p style="font-family: ${T.fontStack}; font-size: 16px; color: ${T.textSecondary}; line-height: 1.65; margin: 0 0 12px 0;">
      The AI landscape moves fast. I spend hours every week testing tools so you can skip the noise and focus on what delivers results.
    </p>

    <p style="font-family: ${T.fontStack}; font-size: 15px; color: ${T.textMuted}; line-height: 1.65; margin: 0 0 28px 0;">
      Here are five resources I recommend to every creator and builder entering the AI space — each one selected because I use it myself.
    </p>

    ${sectionLabel('Curated for You', T.accentPurple)}

    ${resourceCard(
      '01 — AI Music Production Guide',
      'From blank prompt to finished track. The workflow behind 12,000+ songs.',
      'https://frankx.ai/research',
      T.accentCyan
    )}

    ${resourceCard(
      '02 — Prompt Library',
      'Battle-tested prompts for Suno, ChatGPT, Claude, and Midjourney. Organized by use case.',
      'https://frankx.ai/prompt-library',
      T.accentPurple
    )}

    ${resourceCard(
      '03 — GenCreator OS',
      'The operating system for AI-native creators. Frameworks for content, music, and product shipping.',
      'https://frankx.ai/gencreator',
      T.accentGreen
    )}

    ${resourceCard(
      '04 — The Research Lab',
      'Long-form analysis of AI tools, market shifts, and creator strategies. Updated weekly.',
      'https://frankx.ai/research',
      T.accentCyan
    )}

    ${resourceCard(
      '05 — Creator Community',
      'Connect with builders who are shipping real work with AI. Share wins, ask questions, grow together.',
      'https://frankx.ai/community',
      T.accentPurple
    )}

    ${highlightBox('Pro Tip', `
      <strong style="color: ${T.textPrimary};">Start with one tool. Master it. Then expand.</strong> The creators who ship the most are the ones who go deep before going wide. Pick the resource above that matches where you are right now.
    `, T.accentPurple)}

    ${ctaButton('Browse the Prompt Library', 'https://frankx.ai/prompt-library', 'accent', T.accentCyan)}
    ${ctaButton('Explore GenCreator OS', 'https://frankx.ai/gencreator', 'outline')}

    ${signatureBlock("Tomorrow I'll share what's next — including how to accelerate your progress with direct guidance.")}
    `,
    { accentColor: T.accentCyan, accentPosition: 'top' }
  )

  return {
    subject: 'Your AI Toolkit for 2026',
    html: emailWrapper(content, 'Five curated resources to accelerate your AI creative journey.'),
  }
}

// ─── Email 3: What's Next (Day 5) ───────────────────────────────

export function welcomeEmail3(data: { recipientName: string }): EmailTemplate {
  const name = data.recipientName || 'Creator'

  const coachingCard = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 24px 0;">
      <tr>
        <td style="padding: 24px; background: ${T.gradientGlass}; border-radius: ${T.radius}; border: 1px solid rgba(139, 92, 246, 0.15);">
          ${sectionLabel('Direct Guidance', T.accentPurple)}
          <h2 style="font-family: ${T.fontStack}; font-size: 20px; font-weight: 700; color: ${T.textPrimary}; margin: 0 0 14px 0; line-height: 1.3;">
            1:1 Creator Coaching
          </h2>
          <p style="font-family: ${T.fontStack}; font-size: 15px; color: ${T.textSecondary}; line-height: 1.65; margin: 0 0 18px 0;">
            Work directly with me on your AI creative stack — from prompt engineering to production workflows to shipping products.
          </p>
          ${featureRow('Personalized strategy', 'based on your goals and current skill level', T.accentGreen)}
          ${featureRow('Hands-on feedback', 'on your prompts, workflows, and output', T.accentGreen)}
          ${featureRow('Ongoing access', 'to frameworks and resources as they ship', T.accentGreen)}
        </td>
      </tr>
    </table>`

  const content = glassCard(
    `
    ${sectionLabel('Day 5', T.accentGreen)}

    ${mascotWithSpeech('celebrating', `Day 5, ${name}. Ready to level up?`)}

    <h1 class="h1" style="font-family: ${T.fontStack}; font-size: 26px; font-weight: 700; color: ${T.textPrimary}; margin: 0 0 18px 0; line-height: 1.3; letter-spacing: -0.02em;">
      What's Next, ${name}?
    </h1>

    <p style="font-family: ${T.fontStack}; font-size: 16px; color: ${T.textSecondary}; line-height: 1.65; margin: 0 0 12px 0;">
      You've had a few days to explore. By now you've probably found a tool or technique that resonated. The question is — what do you do with that momentum?
    </p>

    <p style="font-family: ${T.fontStack}; font-size: 15px; color: ${T.textMuted}; line-height: 1.65; margin: 0 0 28px 0;">
      The creators who accelerate fastest all have one thing in common: they get feedback from someone who's already done it.
    </p>

    ${coachingCard}

    ${ctaButton('Apply for Coaching', 'https://frankx.ai/coaching')}

    ${sectionLabel('Find Your Starting Point', T.accentCyan)}

    ${resourceCard(
      'Take the Creator Assessment',
      'A quick self-assessment to identify your strengths and the highest-leverage skill to develop next.',
      'https://frankx.ai/assess',
      T.accentCyan
    )}

    ${highlightBox('Join the Community', `
      Every creator benefits from being around other creators. The FrankX community is where builders share their work, exchange techniques, and push each other forward.
    `, T.accentGreen)}

    ${ctaButton('Join the Community', 'https://frankx.ai/community', 'outline')}

    ${signatureBlock("This is the last onboarding email. From here, you'll receive the regular newsletter — curated AI insights, studio notes, and early access to new work.")}
    `,
    { accentColor: T.accentGreen, accentPosition: 'top' }
  )

  return {
    subject: "What's next for you?",
    html: emailWrapper(content, "You've explored the tools. Here's how to accelerate from here."),
  }
}
