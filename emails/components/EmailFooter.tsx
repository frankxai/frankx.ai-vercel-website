import { Section, Text, Link, Hr } from '@react-email/components';
import * as React from 'react';

interface EmailFooterProps {
  variant: 'light' | 'dark';
  unsubscribeUrl?: string;
}

export const EmailFooter = ({
  variant,
  unsubscribeUrl = 'https://frankx.ai/unsubscribe'
}: EmailFooterProps) => {
  const textColor = variant === 'light' ? '#6B7280' : '#94A3B8';
  const linkColor = variant === 'light' ? '#10B981' : '#34D399';

  return (
    <>
      <Hr style={{
        borderColor: variant === 'light' ? '#E5E7EB' : 'rgba(255,255,255,0.1)',
        margin: '32px 0'
      }} />
      <Section style={{ padding: '0 24px 24px' }}>
        <Text style={{
          fontSize: '14px',
          color: textColor,
          marginBottom: '12px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}>
          Frank Riemer | AI Architect & Creator
        </Text>
        <Text style={{
          fontSize: '14px',
          color: textColor,
          marginBottom: '12px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}>
          Enterprise AI systems, music production, digital products
        </Text>
        <Text style={{
          fontSize: '12px',
          color: textColor,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}>
          <Link href="https://frankx.ai" style={{ color: linkColor, textDecoration: 'none' }}>
            frankx.ai
          </Link>
          {' | '}
          <Link href="https://twitter.com/frankxai" style={{ color: linkColor, textDecoration: 'none' }}>
            Twitter
          </Link>
          {' | '}
          <Link href="https://github.com/frankxai" style={{ color: linkColor, textDecoration: 'none' }}>
            GitHub
          </Link>
        </Text>
        <Text style={{
          fontSize: '12px',
          color: textColor,
          marginTop: '16px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}>
          <Link href={unsubscribeUrl} style={{ color: textColor, textDecoration: 'underline' }}>
            Unsubscribe
          </Link>
          {' | '}
          <Link href="https://frankx.ai/privacy" style={{ color: textColor, textDecoration: 'underline' }}>
            Privacy Policy
          </Link>
        </Text>
      </Section>
    </>
  );
};
