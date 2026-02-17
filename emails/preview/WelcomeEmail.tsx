import * as React from 'react';
import ClassicWhite from '../variants/ClassicWhite';
import ModernLight from '../variants/ModernLight';
import MinimalGradient from '../variants/MinimalGradient';
import DarkPremium from '../variants/DarkPremium';
import CardBased from '../variants/CardBased';

interface WelcomeEmailPreviewProps {
  variant: 'classic-white' | 'modern-light' | 'minimal-gradient' | 'dark-premium' | 'card-based';
  firstName?: string;
  sourceContext?: string;
  downloadLink?: string;
  unsubscribeUrl?: string;
}

export const WelcomeEmailPreview = ({
  variant,
  firstName = 'Alex',
  sourceContext = 'after reading one of my articles',
  downloadLink = 'https://frankx.ai/download/ai-architecture-guide',
  unsubscribeUrl = 'https://frankx.ai/unsubscribe',
}: WelcomeEmailPreviewProps) => {
  const props = {
    firstName,
    sourceContext,
    downloadLink,
    unsubscribeUrl,
  };

  switch (variant) {
    case 'classic-white':
      return <ClassicWhite {...props} />;
    case 'modern-light':
      return <ModernLight {...props} />;
    case 'minimal-gradient':
      return <MinimalGradient {...props} />;
    case 'dark-premium':
      return <DarkPremium {...props} />;
    case 'card-based':
      return <CardBased {...props} />;
    default:
      return <ClassicWhite {...props} />;
  }
};

export default WelcomeEmailPreview;
