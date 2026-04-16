/**
 * FrankX Email Design System v3.1 — React Email Components
 *
 * Built with @react-email/components for automatic Outlook/Gmail transforms.
 * Tokens aligned with lib/email-design-system.ts (the HTML string version).
 *
 * Usage:
 *   import { EmailLayout, EmailButton, GlassCard, ... } from '../components/Layout'
 */

import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Hr,
  Button,
  Heading,
  Row,
  Column,
} from '@react-email/components'
import * as React from 'react'

// ─── Design Tokens ───────────────────────────────────────────────

export const t = {
  bgDeep: '#0a0a0f',
  bgCard: '#141420',
  borderGlass: '#1e293b',
  accentCyan: '#22d3ee',
  accentPurple: '#8B5CF6',
  accentGreen: '#10b981',
  accentGold: '#fbbf24',
  textPrimary: '#F1F5F9',
  textSecondary: '#CBD5E1',
  textMuted: '#94a3b8',
  textDim: '#64748b',
  textFaint: '#475569',
  highlightBg: '#161625',
  font: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  mono: "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace",
} as const

// ─── Base Layout ─────────────────────────────────────────────────

interface EmailLayoutProps {
  preview: string
  children: React.ReactNode
}

export function EmailLayout({ preview, children }: EmailLayoutProps) {
  return (
    <Html lang="en">
      <Head>
        <meta name="color-scheme" content="dark" />
        <meta name="supported-color-schemes" content="dark" />
      </Head>
      <Preview>{preview}</Preview>
      <Body style={{
        backgroundColor: t.bgDeep,
        fontFamily: t.font,
        margin: 0,
        padding: 0,
        color: t.textPrimary,
        WebkitTextSizeAdjust: '100%',
      }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '32px 12px' }}>

          {/* Logo */}
          <Section style={{ textAlign: 'center', paddingBottom: '28px' }}>
            <Link href="https://frankx.ai" style={{
              display: 'inline-block',
              padding: '10px 22px',
              backgroundColor: t.accentPurple,
              borderRadius: '12px',
              textDecoration: 'none',
            }}>
              <Text style={{
                fontFamily: t.font,
                fontSize: '22px',
                fontWeight: 800,
                color: t.textPrimary,
                letterSpacing: '-0.03em',
                margin: 0,
                lineHeight: '1',
              }}>FrankX<span style={{ color: t.accentCyan }}>.</span>AI</Text>
            </Link>
          </Section>

          {/* Accent line */}
          <Hr style={{ borderTop: `2px solid ${t.accentPurple}`, margin: '0 0 28px 0' }} />

          {/* Content */}
          {children}

          {/* Footer */}
          <Section style={{ paddingTop: '32px' }}>
            <Hr style={{ borderTop: `2px solid ${t.accentPurple}`, margin: '0 0 28px 0' }} />

            {/* Author */}
            <Row style={{ paddingBottom: '20px' }}>
              <Column style={{ width: '58px', verticalAlign: 'middle' }}>
                <Img
                  src="https://www.frankx.ai/images/mascot/frank-omega-pixar-chibi-v1.png"
                  width="44"
                  height="44"
                  alt="Frank Omega"
                  style={{ borderRadius: '50%', border: `2px solid ${t.borderGlass}` }}
                />
              </Column>
              <Column style={{ verticalAlign: 'middle' }}>
                <Text style={{ fontFamily: t.font, fontSize: '14px', fontWeight: 600, color: t.textPrimary, margin: '0 0 2px 0' }}>Frank Riemer</Text>
                <Text style={{ fontFamily: t.font, fontSize: '12px', color: t.textDim, margin: 0 }}>AI Architect &middot; Creator</Text>
              </Column>
            </Row>

            {/* Social */}
            <Section style={{ textAlign: 'center', paddingBottom: '20px' }}>
              <Link href="https://frankx.ai" style={{ fontFamily: t.font, fontSize: '13px', color: t.accentCyan, textDecoration: 'none', fontWeight: 500 }}>frankx.ai</Link>
              <Text style={{ display: 'inline', color: t.textFaint, fontSize: '10px', margin: '0 8px' }}>&bull;</Text>
              <Link href="https://x.com/frankxeth" style={{ fontFamily: t.font, fontSize: '13px', color: t.textDim, textDecoration: 'none', fontWeight: 500 }}>X</Link>
              <Text style={{ display: 'inline', color: t.textFaint, fontSize: '10px', margin: '0 8px' }}>&bull;</Text>
              <Link href="https://www.linkedin.com/in/frank-x-riemer/" style={{ fontFamily: t.font, fontSize: '13px', color: t.textDim, textDecoration: 'none', fontWeight: 500 }}>LinkedIn</Link>
            </Section>

            {/* Legal */}
            <Text style={{ fontFamily: t.font, fontSize: '11px', color: t.textFaint, textAlign: 'center', lineHeight: '1.7', margin: 0 }}>
              You received this because you signed up at frankx.ai<br />
              <Link href="{{RESEND_UNSUBSCRIBE_URL}}" style={{ color: t.textDim, textDecoration: 'underline' }}>Unsubscribe</Link>
              {' '}&bull;{' '}
              <Link href="https://frankx.ai/newsletter/preferences" style={{ color: t.textDim, textDecoration: 'underline' }}>Preferences</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// ─── Reusable Components ─────────────────────────────────────────

export function EmailHeading({ children, as = 'h1' }: { children: React.ReactNode; as?: 'h1' | 'h2' | 'h3' }) {
  const sizes = { h1: '26px', h2: '20px', h3: '16px' }
  return (
    <Heading as={as} style={{
      fontFamily: t.font,
      fontSize: sizes[as],
      fontWeight: 700,
      color: t.textPrimary,
      lineHeight: '1.3',
      letterSpacing: '-0.02em',
      margin: `0 0 ${as === 'h1' ? '18px' : '12px'} 0`,
    }}>{children}</Heading>
  )
}

export function EmailText({ children, muted }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <Text style={{
      fontFamily: t.font,
      fontSize: muted ? '15px' : '16px',
      color: muted ? t.textMuted : t.textSecondary,
      lineHeight: '1.65',
      margin: '0 0 16px 0',
    }}>{children}</Text>
  )
}

export function EmailButton({ href, children, variant = 'primary' }: { href: string; children: React.ReactNode; variant?: 'primary' | 'secondary' }) {
  return (
    <Section style={{ textAlign: 'center', padding: '8px 0 24px 0' }}>
      <Button href={href} style={{
        backgroundColor: variant === 'primary' ? t.accentPurple : 'transparent',
        borderRadius: '12px',
        color: variant === 'primary' ? '#ffffff' : t.textSecondary,
        display: 'inline-block',
        fontFamily: t.font,
        fontSize: '16px',
        fontWeight: 600,
        padding: '16px 32px',
        textDecoration: 'none',
        textAlign: 'center' as const,
        border: variant === 'secondary' ? `1px solid ${t.textFaint}` : 'none',
      }}>{children}</Button>
    </Section>
  )
}

export function GlassCard({ children, accent }: { children: React.ReactNode; accent?: string }) {
  return (
    <Section style={{
      backgroundColor: t.bgCard,
      border: `1px solid ${t.borderGlass}`,
      borderRadius: '14px',
      borderTop: accent ? `2px solid ${accent}` : undefined,
      padding: '28px 24px',
    }}>
      {children}
    </Section>
  )
}

export function SectionLabel({ children, color = t.accentCyan }: { children: React.ReactNode; color?: string }) {
  return (
    <Text style={{
      fontFamily: t.mono,
      fontSize: '11px',
      fontWeight: 700,
      color,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.12em',
      margin: '0 0 14px 0',
    }}>{children}</Text>
  )
}

export function FeatureRow({ label, description, color = t.accentPurple }: { label: string; description: string; color?: string }) {
  return (
    <Text style={{ fontFamily: t.font, fontSize: '15px', color: t.textSecondary, margin: '0 0 8px 0', lineHeight: '1.6' }}>
      <span style={{ color, fontWeight: 600 }}>›</span>&nbsp;
      <strong style={{ color: t.textPrimary }}>{label}</strong> — {description}
    </Text>
  )
}

export function HighlightBox({ label, children, color = t.accentPurple }: { label: string; children: React.ReactNode; color?: string }) {
  return (
    <Section style={{
      backgroundColor: t.highlightBg,
      borderLeft: `3px solid ${color}`,
      borderRadius: '0 10px 10px 0',
      padding: '18px 20px',
      margin: '20px 0',
    }}>
      <SectionLabel color={color}>{label}</SectionLabel>
      {children}
    </Section>
  )
}

export function MascotSpeech({ mood, message }: { mood: string; message: string }) {
  const variants: Record<string, string> = {
    waving: 'axi-v5-waving.png',
    thinking: 'axi-v5-thinking.png',
    celebrating: 'axi-v5-celebrating.png',
    pointing: 'frank-omega-hero-v1.png',
    chill: 'frank-omega-chill-v1.png',
    chibi: 'frank-omega-pixar-chibi-v1.png',
  }
  const file = variants[mood] || variants.chibi

  return (
    <Row style={{ marginBottom: '20px' }}>
      <Column style={{ width: '64px', verticalAlign: 'top', paddingRight: '14px' }}>
        <Img
          src={`https://www.frankx.ai/images/mascot/${file}`}
          width="48"
          height="48"
          alt="Frank Omega"
          style={{ borderRadius: '50%', border: `2px solid ${t.borderGlass}` }}
        />
      </Column>
      <Column style={{
        verticalAlign: 'middle',
        padding: '12px 16px',
        backgroundColor: t.bgCard,
        border: `1px solid ${t.borderGlass}`,
        borderRadius: '0 14px 14px 14px',
      }}>
        <Text style={{ fontFamily: t.font, fontSize: '15px', color: t.textSecondary, margin: 0, lineHeight: '1.55' }}>{message}</Text>
      </Column>
    </Row>
  )
}

export function ResourceCard({ title, description, href, color = t.accentCyan }: { title: string; description: string; href: string; color?: string }) {
  return (
    <Section style={{
      backgroundColor: t.bgCard,
      borderRadius: '10px',
      border: `1px solid ${t.borderGlass}`,
      borderLeft: `3px solid ${color}`,
      padding: '14px 18px',
      marginBottom: '12px',
    }}>
      <Link href={href} style={{ fontFamily: t.font, fontSize: '15px', fontWeight: 600, color: t.textPrimary, textDecoration: 'none' }}>{title}</Link>
      <Text style={{ fontFamily: t.font, fontSize: '13px', color: t.textMuted, margin: '4px 0 0 0', lineHeight: '1.5' }}>{description}</Text>
    </Section>
  )
}

export function SignatureBlock({ message = 'Reply anytime. I read every one.' }: { message?: string }) {
  return (
    <>
      <Hr style={{ borderColor: t.borderGlass, margin: '24px 0' }} />
      <Text style={{ fontFamily: t.font, fontSize: '14px', color: t.textMuted, margin: '0 0 6px 0', lineHeight: '1.6' }}>{message}</Text>
      <Text style={{ fontFamily: t.font, fontSize: '14px', color: t.textDim, margin: 0 }}>— Frank</Text>
    </>
  )
}
