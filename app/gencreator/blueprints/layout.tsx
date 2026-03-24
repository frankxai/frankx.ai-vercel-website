import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Creator's Blueprints — 12 Actionable Frameworks for Generative Creators",
  description:
    'Actionable blueprints for specific creative workflows. Content atomization, music production, product launches, SEO clusters, automation — copy, customize, execute.',
  openGraph: {
    title: "Creator's Blueprints",
    description: '12 actionable frameworks for generative creators. Copy, customize, execute.',
    url: 'https://frankx.ai/gencreator/blueprints',
  },
}

export default function BlueprintsLayout({ children }: { children: React.ReactNode }) {
  return children
}
