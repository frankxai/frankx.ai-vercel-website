/**
 * FrankX Email Design System
 * Built with React Email components
 *
 * Usage: Import these components to build beautiful emails
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
} from '@react-email/components'
import * as React from 'react'

// ============================================
// BRAND COLORS
// ============================================
export const colors = {
  // Primary
  background: '#030712',
  cardBg: '#111827',
  border: 'rgba(6, 182, 212, 0.2)',

  // Text
  textPrimary: '#ffffff',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',

  // Accent
  emerald: '#10b981',
  cyan: '#06b6d4',
  purple: '#9333ea',
  pink: '#ec4899',
  amber: '#f59e0b',

  // Gradients (as solid fallbacks for email)
  gradientStart: '#06b6d4',
  gradientEnd: '#9333ea',
}

// ============================================
// BASE LAYOUT
// ============================================
interface EmailLayoutProps {
  preview: string
  children: React.ReactNode
}

export function EmailLayout({ preview, children }: EmailLayoutProps) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Header */}
          <Section style={styles.header}>
            <Link href="https://frankx.ai" style={styles.logoLink}>
              <Img
                src="https://frankx.ai/logo-email.png"
                width="140"
                height="40"
                alt="FrankX.AI"
                style={styles.logo}
              />
            </Link>
          </Section>

          {/* Main Content */}
          <Section style={styles.main}>
            {children}
          </Section>

          {/* Footer */}
          <Section style={styles.footer}>
            <Hr style={styles.divider} />

            <Text style={styles.footerName}>Frank Guzman</Text>
            <Text style={styles.footerTitle}>
              Musician turned AI Architect at Oracle
            </Text>

            <Section style={styles.socialLinks}>
              <Link href="https://frankx.ai" style={styles.socialLink}>Website</Link>
              <Text style={styles.socialDivider}>|</Text>
              <Link href="https://twitter.com/frankxai" style={styles.socialLink}>Twitter</Link>
              <Text style={styles.socialDivider}>|</Text>
              <Link href="https://linkedin.com/in/frankguzmanai" style={styles.socialLink}>LinkedIn</Link>
            </Section>

            <Text style={styles.unsubscribe}>
              <Link href="{{{RESEND_UNSUBSCRIBE_URL}}}" style={styles.unsubscribeLink}>
                Unsubscribe
              </Link>
              {' '}from this list
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// ============================================
// REUSABLE COMPONENTS
// ============================================

interface EmailHeadingProps {
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3'
}

export function EmailHeading({ children, as = 'h1' }: EmailHeadingProps) {
  const headingStyles = {
    h1: styles.h1,
    h2: styles.h2,
    h3: styles.h3,
  }
  return <Heading style={headingStyles[as]}>{children}</Heading>
}

interface EmailTextProps {
  children: React.ReactNode
  muted?: boolean
}

export function EmailText({ children, muted }: EmailTextProps) {
  return (
    <Text style={muted ? styles.textMuted : styles.text}>
      {children}
    </Text>
  )
}

interface EmailButtonProps {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}

export function EmailButton({ href, children, variant = 'primary' }: EmailButtonProps) {
  return (
    <Button
      href={href}
      style={variant === 'primary' ? styles.buttonPrimary : styles.buttonSecondary}
    >
      {children}
    </Button>
  )
}

interface EmailCardProps {
  children: React.ReactNode
  accent?: 'emerald' | 'cyan' | 'purple' | 'pink'
}

export function EmailCard({ children, accent = 'cyan' }: EmailCardProps) {
  const accentColors = {
    emerald: colors.emerald,
    cyan: colors.cyan,
    purple: colors.purple,
    pink: colors.pink,
  }

  return (
    <Section style={{
      ...styles.card,
      borderColor: `${accentColors[accent]}33`,
    }}>
      {children}
    </Section>
  )
}

interface EmailCalloutProps {
  emoji: string
  title: string
  children: React.ReactNode
}

export function EmailCallout({ emoji, title, children }: EmailCalloutProps) {
  return (
    <Section style={styles.callout}>
      <Text style={styles.calloutEmoji}>{emoji}</Text>
      <Text style={styles.calloutTitle}>{title}</Text>
      <Text style={styles.calloutText}>{children}</Text>
    </Section>
  )
}

// ============================================
// STYLES
// ============================================
const styles = {
  body: {
    backgroundColor: colors.background,
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    margin: '0',
    padding: '0',
  },
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '40px',
  },
  logoLink: {
    textDecoration: 'none',
  },
  logo: {
    margin: '0 auto',
  },
  main: {
    backgroundColor: colors.cardBg,
    borderRadius: '16px',
    border: `1.5px solid ${colors.border}`,
    padding: '32px',
    marginBottom: '32px',
  },
  footer: {
    textAlign: 'center' as const,
    paddingTop: '24px',
  },
  divider: {
    borderColor: 'rgba(255, 255, 255, 0.1)',
    margin: '24px 0',
  },
  footerName: {
    color: colors.textSecondary,
    fontSize: '14px',
    fontWeight: '600',
    margin: '0 0 4px 0',
  },
  footerTitle: {
    color: colors.textMuted,
    fontSize: '12px',
    margin: '0 0 16px 0',
  },
  socialLinks: {
    marginBottom: '16px',
  },
  socialLink: {
    color: colors.cyan,
    fontSize: '14px',
    textDecoration: 'none',
    margin: '0 8px',
  },
  socialDivider: {
    color: colors.textMuted,
    display: 'inline',
    margin: '0 4px',
  },
  unsubscribe: {
    color: colors.textMuted,
    fontSize: '11px',
    margin: '24px 0 0 0',
  },
  unsubscribeLink: {
    color: colors.textMuted,
    textDecoration: 'underline',
  },
  h1: {
    color: colors.textPrimary,
    fontSize: '28px',
    fontWeight: '700',
    lineHeight: '1.2',
    margin: '0 0 16px 0',
  },
  h2: {
    color: colors.textPrimary,
    fontSize: '20px',
    fontWeight: '600',
    lineHeight: '1.3',
    margin: '24px 0 12px 0',
  },
  h3: {
    color: colors.textPrimary,
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '1.4',
    margin: '16px 0 8px 0',
  },
  text: {
    color: colors.textSecondary,
    fontSize: '16px',
    lineHeight: '1.7',
    margin: '0 0 16px 0',
  },
  textMuted: {
    color: colors.textMuted,
    fontSize: '14px',
    lineHeight: '1.6',
    margin: '0 0 12px 0',
  },
  buttonPrimary: {
    backgroundColor: colors.cyan,
    borderRadius: '12px',
    color: colors.textPrimary,
    display: 'inline-block',
    fontSize: '16px',
    fontWeight: '600',
    padding: '14px 28px',
    textDecoration: 'none',
    textAlign: 'center' as const,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    border: `1.5px solid ${colors.border}`,
    borderRadius: '12px',
    color: colors.textPrimary,
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: '500',
    padding: '12px 24px',
    textDecoration: 'none',
    textAlign: 'center' as const,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: '12px',
    border: '1.5px solid',
    padding: '20px',
    marginBottom: '16px',
  },
  callout: {
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    borderRadius: '12px',
    border: `1.5px solid ${colors.border}`,
    padding: '20px',
    marginBottom: '16px',
    textAlign: 'center' as const,
  },
  calloutEmoji: {
    fontSize: '32px',
    margin: '0 0 8px 0',
  },
  calloutTitle: {
    color: colors.cyan,
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    margin: '0 0 8px 0',
  },
  calloutText: {
    color: colors.textSecondary,
    fontSize: '14px',
    lineHeight: '1.6',
    margin: '0',
  },
}
