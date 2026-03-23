import { Button } from '@react-email/components';
import * as React from 'react';

interface EmailButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
}

export const EmailButton = ({
  href,
  children,
  variant = 'primary',
  fullWidth = false
}: EmailButtonProps) => {
  const baseStyles = {
    display: 'inline-block',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    textDecoration: 'none',
    borderRadius: '8px',
    textAlign: 'center' as const,
    transition: 'all 0.2s',
    width: fullWidth ? '100%' : 'auto',
  };

  const variantStyles = {
    primary: {
      backgroundColor: '#10B981',
      color: '#ffffff',
    },
    secondary: {
      backgroundColor: '#0F172A',
      color: '#ffffff',
      border: '1px solid #E5E7EB',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#10B981',
      border: '1px solid #10B981',
    },
  };

  return (
    <Button
      href={href}
      style={{
        ...baseStyles,
        ...variantStyles[variant],
      }}
    >
      {children}
    </Button>
  );
};
