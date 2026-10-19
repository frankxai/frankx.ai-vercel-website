/**
 * PDF Guide Delivery — FrankX.AI v3.1
 *
 * Sent when user downloads a gated PDF guide.
 * Single CTA: Download Your Guide.
 *
 * Subject: "[Guide Title] — your download is ready"
 */

import * as React from 'react'
import {
  EmailLayout,
  GlassCard,
  EmailHeading,
  EmailText,
  EmailButton,
  MascotSpeech,
  HighlightBox,
  FeatureRow,
  SignatureBlock,
  t,
} from '../components/Layout'

interface PdfDeliveryProps {
  recipientName: string
  pdfTitle: string
  pdfUrl: string
}

export function PdfDeliveryEmail({ recipientName, pdfTitle, pdfUrl }: PdfDeliveryProps) {
  return (
    <EmailLayout preview={`Your ${pdfTitle} guide from FrankX.AI is ready to download.`}>
      <GlassCard accent={t.accentCyan}>
        <MascotSpeech mood="pointing" message={`Your guide just landed, ${recipientName}. Dive in.`} />

        <EmailHeading>Your guide is ready.</EmailHeading>

        <EmailText>
          <strong style={{ color: t.accentCyan }}>{pdfTitle}</strong> — the same frameworks I use to create AI music and build enterprise systems. Yours now.
        </EmailText>

        <EmailText muted>
          Each section is built to be actionable. No theory dumps. Just what works.
        </EmailText>

        <HighlightBox label="Inside This Guide" color={t.accentCyan}>
          <FeatureRow label="Tested frameworks" description="used in production, not hypothetical" color={t.accentCyan} />
          <FeatureRow label="Ready-to-use templates" description="copy, customize, ship" color={t.accentCyan} />
          <FeatureRow label="Step-by-step walkthroughs" description="blank page to done" color={t.accentCyan} />
        </HighlightBox>

        <EmailButton href={pdfUrl}>Download Your Guide</EmailButton>

        <SignatureBlock message="Questions? Reply to this email. I read every one." />
      </GlassCard>
    </EmailLayout>
  )
}

export default PdfDeliveryEmail
