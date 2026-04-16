/**
 * Purchase Confirmation — FrankX.AI v3.1
 *
 * Sent via Lemon Squeezy webhook on order_created.
 * Subject: "Your [Product] is ready to download"
 */

import * as React from 'react'
import { Section, Text, Link } from '@react-email/components'
import {
  EmailLayout,
  GlassCard,
  EmailHeading,
  EmailText,
  MascotSpeech,
  HighlightBox,
  SectionLabel,
  SignatureBlock,
  t,
} from '../components/Layout'

interface PurchaseConfirmationProps {
  customerName: string
  productName: string
  downloadLinks: Array<{ name: string; url: string }>
  receiptUrl?: string
}

export function PurchaseConfirmationEmail({ customerName, productName, downloadLinks, receiptUrl }: PurchaseConfirmationProps) {
  return (
    <EmailLayout preview={`Your ${productName} purchase is complete. Download your files now.`}>
      <GlassCard accent={t.accentPurple}>
        <MascotSpeech mood="celebrating" message={`Thank you, ${customerName}! Your files are ready.`} />

        <EmailHeading>Your purchase is ready.</EmailHeading>

        <EmailText>
          Thank you for purchasing <strong style={{ color: t.textPrimary }}>{productName}</strong>.
        </EmailText>

        <EmailText muted>
          Your files are ready to download. Links below are valid for 7 days.
        </EmailText>

        <HighlightBox label="Your Files" color={t.accentPurple}>
          {downloadLinks.map((link) => (
            <Section key={link.name} style={{ padding: '10px 0', borderBottom: `1px solid ${t.borderGlass}` }}>
              <Text style={{ fontFamily: t.font, fontSize: '15px', fontWeight: 600, color: t.textPrimary, margin: '0 0 4px 0' }}>
                {link.name}
              </Text>
              <Link href={link.url} style={{
                display: 'inline-block',
                padding: '8px 16px',
                backgroundColor: t.accentPurple,
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontFamily: t.font,
                fontSize: '13px',
                fontWeight: 600,
              }}>
                Download
              </Link>
            </Section>
          ))}
        </HighlightBox>

        {receiptUrl && (
          <Text style={{ fontFamily: t.font, fontSize: '13px', color: t.textDim, margin: '16px 0 0 0' }}>
            <Link href={receiptUrl} style={{ color: t.accentCyan, textDecoration: 'none' }}>View your receipt</Link>
          </Text>
        )}

        <SignatureBlock message="Need help? Reply to this email." />
      </GlassCard>
    </EmailLayout>
  )
}

export default PurchaseConfirmationEmail
