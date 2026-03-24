import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GenCreator Soul — 7 Dimensions & Your soul.md Operating File',
  description:
    'The 7 dimensions of a complete GenCreator: Energy, Mind, Craft, Voice, Capital, Circle, Legacy. Build your personal soul.md — the operating file that defines who you are.',
  openGraph: {
    title: 'GenCreator Soul',
    description: 'Build your soul.md — 7 dimensions of a complete generative creator.',
    url: 'https://frankx.ai/gencreator/soul',
  },
}

export default function SoulLayout({ children }: { children: React.ReactNode }) {
  return children
}
