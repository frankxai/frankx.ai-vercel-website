import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GenCreator Glossary — Key Terms & Concepts',
  description:
    'The complete GenCreator vocabulary. soul.md, shipping, compounding, skill stacking, blueprints — every concept defined.',
  openGraph: {
    title: 'GenCreator Glossary',
    description: 'Every GenCreator term defined. From soul.md to skill stacking.',
    url: 'https://frankx.ai/gencreator/glossary',
  },
}

export default function GlossaryLayout({ children }: { children: React.ReactNode }) {
  return children
}
