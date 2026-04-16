/**
 * Welcome Email — FrankX.AI v3.1
 *
 * Sent immediately when someone subscribes to the newsletter.
 * Uses React Email components for automatic Outlook/Gmail compat.
 *
 * Subject: "3 things you can build this week"
 * From: Frank <frank@mail.frankx.ai>
 */

import * as React from 'react'
import {
  EmailLayout,
  GlassCard,
  EmailHeading,
  EmailText,
  EmailButton,
  MascotSpeech,
  SectionLabel,
  FeatureRow,
  HighlightBox,
  SignatureBlock,
  t,
} from '../components/Layout'

interface WelcomeEmailProps {
  recipientName?: string
}

export function WelcomeEmail({ recipientName = 'there' }: WelcomeEmailProps) {
  return (
    <EmailLayout preview="I'm Frank. AI architect by day, music creator by night. Here's what to expect.">
      <GlassCard accent={t.accentPurple}>
        <MascotSpeech mood="waving" message={`Welcome to the crew, ${recipientName}. Glad you're here.`} />

        <EmailHeading>Welcome, {recipientName}.</EmailHeading>

        <EmailText>
          I'm Frank. I build enterprise AI systems during the day. At night I'm in the studio — 12,000+ AI-generated songs and counting.
        </EmailText>

        <EmailText muted>
          This list is where I share what I'm learning — tools that work, techniques I've tested, and the occasional behind-the-scenes from late-night building sessions.
        </EmailText>

        <HighlightBox label="What to Expect" color={t.accentPurple}>
          <FeatureRow label="AI tools and workflows" description="what's actually useful, not hype" color={t.accentPurple} />
          <FeatureRow label="Music creation insights" description="prompts, techniques, production notes" color={t.accentPurple} />
          <FeatureRow label="Early access" description="new guides and frameworks before public" color={t.accentPurple} />
        </HighlightBox>

        <EmailButton href="https://frankx.ai/blog">Read Latest Posts</EmailButton>

        <SignatureBlock message="No spam. No fluff. Just what works." />
      </GlassCard>
    </EmailLayout>
  )
}

export default WelcomeEmail

// Subject line and metadata for the sending system
export const metadata = {
  subject: '3 things you can build this week',
  preheader: "I'm Frank. AI architect by day, music creator by night. Here's what to expect.",
}
