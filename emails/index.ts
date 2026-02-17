// Email template exports
export { ClassicWhite } from './variants/ClassicWhite';
export { ModernLight } from './variants/ModernLight';
export { MinimalGradient } from './variants/MinimalGradient';
export { DarkPremium } from './variants/DarkPremium';
export { CardBased } from './variants/CardBased';

// Components
export { EmailButton } from './components/EmailButton';
export { EmailHeader } from './components/EmailHeader';
export { EmailFooter } from './components/EmailFooter';

// Preview
export { WelcomeEmailPreview } from './preview/WelcomeEmail';

// Helper function to render email to HTML string
import { render } from '@react-email/components';
import * as React from 'react';

export const renderEmail = async (template: React.ReactElement): Promise<string> => {
  return await render(template);
};

// Variant metadata for A/B testing
export const EMAIL_VARIANTS = {
  'classic-white': {
    name: 'Classic White',
    description: 'Industry standard white background with high readability',
    inspiration: 'ConvertKit, Substack',
    bestFor: 'Maximum compatibility and trust',
  },
  'modern-light': {
    name: 'Modern Light',
    description: 'Soft gray background with card-based content blocks',
    inspiration: 'Beehiiv',
    bestFor: 'Visual hierarchy and scanability',
  },
  'minimal-gradient': {
    name: 'Minimal Gradient',
    description: 'Clean white base with subtle gradient header',
    inspiration: 'Linear, Notion',
    bestFor: 'Contemporary brand feel',
  },
  'dark-premium': {
    name: 'Dark Premium',
    description: 'Dark background optimized for email clients with fallbacks',
    inspiration: 'Custom FrankX design',
    bestFor: 'Premium brand positioning (with caveats)',
  },
  'card-based': {
    name: 'Card-Based Modular',
    description: 'Distinct colored cards for each content section',
    inspiration: 'Lemon Squeezy',
    bestFor: 'Easy scanning and clear CTAs',
  },
} as const;

export type EmailVariant = keyof typeof EMAIL_VARIANTS;
