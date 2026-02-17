import { Section, Text, Link, Img } from '@react-email/components';
import * as React from 'react';

interface EmailHeaderProps {
  variant: 'light' | 'dark' | 'gradient';
  showLogo?: boolean;
}

export const EmailHeader = ({ variant, showLogo = true }: EmailHeaderProps) => {
  const headerStyles = {
    light: {
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #E5E7EB',
      padding: '24px',
    },
    dark: {
      backgroundColor: '#0F172A',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      padding: '24px',
    },
    gradient: {
      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      padding: '24px',
    },
  };

  const logoTextColor = variant === 'light' ? '#0F172A' : '#ffffff';

  return (
    <Section style={headerStyles[variant]}>
      {showLogo && (
        <Link href="https://frankx.ai" style={{ textDecoration: 'none' }}>
          <Text
            style={{
              fontSize: '24px',
              fontWeight: '700',
              color: logoTextColor,
              margin: '0',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            FrankX
          </Text>
        </Link>
      )}
    </Section>
  );
};
