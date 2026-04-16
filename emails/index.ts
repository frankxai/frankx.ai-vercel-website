/**
 * FrankX Email System — Central Export v3.1
 *
 * Two systems coexist during migration:
 * 1. HTML string templates (lib/email-templates.ts) — used by API routes today
 * 2. React Email components (emails/templates/*.tsx) — the future
 *
 * Render helpers give API routes the same { subject, html } interface.
 */

import { render } from '@react-email/components'
import * as React from 'react'

// ─── Legacy Variant Exports (A/B test suite) ─────────────────────
export { ClassicWhite } from './variants/ClassicWhite'
export { ModernLight } from './variants/ModernLight'
export { MinimalGradient } from './variants/MinimalGradient'
export { DarkPremium } from './variants/DarkPremium'
export { CardBased } from './variants/CardBased'

// ─── v3.1 Component Exports ──────────────────────────────────────
export { WelcomeEmail } from './templates/Welcome'
export { PdfDeliveryEmail } from './templates/PdfDelivery'
export { PurchaseConfirmationEmail } from './templates/PurchaseConfirmation'
export { MusicPromptsEmail } from './templates/MusicPrompts'

// ─── Layout Components ───────────────────────────────────────────
export {
  EmailLayout,
  GlassCard,
  EmailHeading,
  EmailText,
  EmailButton,
  MascotSpeech,
  SectionLabel,
  FeatureRow,
  HighlightBox,
  ResourceCard,
  SignatureBlock,
  t,
} from './components/Layout'

// ─── Generic Render Helper ───────────────────────────────────────
export const renderEmail = async (template: React.ReactElement): Promise<string> => {
  return await render(template)
}

// ─── Named Render Helpers (same interface as lib/email-templates.ts) ──

interface EmailResult {
  subject: string
  html: string
}

export async function renderWelcomeEmail(data: { recipientName?: string }): Promise<EmailResult> {
  const { WelcomeEmail: WE } = await import('./templates/Welcome')
  const html = await render(React.createElement(WE, data))
  return { subject: '3 things you can build this week', html }
}

export async function renderPdfDeliveryEmail(data: { recipientName: string; pdfTitle: string; pdfUrl: string }): Promise<EmailResult> {
  const { PdfDeliveryEmail: PDE } = await import('./templates/PdfDelivery')
  const html = await render(React.createElement(PDE, data))
  return { subject: `${data.pdfTitle} — your download is ready`, html }
}

export async function renderPurchaseConfirmationEmail(data: {
  customerName: string
  productName: string
  downloadLinks: Array<{ name: string; url: string }>
  receiptUrl?: string
}): Promise<EmailResult> {
  const { PurchaseConfirmationEmail: PCE } = await import('./templates/PurchaseConfirmation')
  const html = await render(React.createElement(PCE, data))
  return { subject: `Your ${data.productName} is ready to download`, html }
}

export async function renderMusicPromptsEmail(data: { recipientName: string; downloadUrl: string }): Promise<EmailResult> {
  const { MusicPromptsEmail: MPE } = await import('./templates/MusicPrompts')
  const html = await render(React.createElement(MPE, data))
  return { subject: 'Your 5 studio prompts — ready to use', html }
}

// ─── Variant Metadata (legacy A/B test suite) ────────────────────
export const EMAIL_VARIANTS = {
  'classic-white': {
    name: 'Classic White',
    description: 'Industry standard white background with high readability',
    inspiration: 'ConvertKit, Substack',
    bestFor: 'Maximum compatibility and trust',
  },
  'modern-light': {
    name: 'Modern Light',
    description: 'Soft gray with card-based blocks',
    inspiration: 'Beehiiv',
    bestFor: 'Visual hierarchy emphasis',
  },
  'minimal-gradient': {
    name: 'Minimal Gradient',
    description: 'Clean white with subtle gradient header',
    inspiration: 'Linear, Notion',
    bestFor: 'Contemporary brand feel',
  },
  'dark-premium': {
    name: 'Dark Premium',
    description: 'Dark background with premium positioning',
    inspiration: 'Custom FrankX',
    bestFor: 'Premium brand positioning',
  },
  'card-based': {
    name: 'Card Based',
    description: 'Distinct colored cards per section',
    inspiration: 'Lemon Squeezy',
    bestFor: 'Easy scanning with clear CTAs',
  },
}
