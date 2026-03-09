import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GenCreator Assessment — Score Your 7 Dimensions',
  description:
    'Rate yourself across the 7 GenCreator dimensions: Identity, Energy, Mind, Craft, Voice, Capital, Circle. See your radar chart and get personalized recommendations.',
  openGraph: {
    title: 'GenCreator Self-Assessment',
    description: 'Score your 7 dimensions. See where you stand as a GenCreator.',
    url: 'https://frankx.ai/gencreator/assess',
  },
}

export default function AssessLayout({ children }: { children: React.ReactNode }) {
  return children
}
