import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bio · Frank Riemer | FrankX',
  description:
    'Press bio, speaker topics, and media kit for Frank Riemer, AI Architect and Creator, and author of The Golden Age of Intelligence.',
  openGraph: {
    title: 'Frank Riemer — AI Architect & Creator',
    description:
      'AI Architect and Creator. Author of The Golden Age of Intelligence. Songs made with Suno.',
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
