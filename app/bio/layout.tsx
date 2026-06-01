import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bio · Frank Riemer | FrankX',
  description:
    'Press bio, speaker topics, and media kit for Frank Riemer — Ex-Oracle AI Architect (EMEA AI CoE), creator of 12,000+ AI songs, and author of The Golden Age of Intelligence.',
  openGraph: {
    title: 'Frank Riemer — AI Architect & Creator',
    description:
      'Ex-Oracle AI Architect (EMEA AI Center of Excellence). Author of The Golden Age of Intelligence. 12,000+ AI songs.',
    type: 'profile',
    url: 'https://frankx.ai/bio',
  },
  alternates: {
    canonical: '/bio',
  },
};

export default function BioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
