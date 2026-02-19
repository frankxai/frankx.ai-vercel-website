import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Vision | FrankX.AI — Build What Matters',
  description:
    'The vision behind FrankX: proving that one person with AI leverage, taste, and work ethic can build what used to require an army. Personal vision, community mission, and the Golden Age thesis.',
  alternates: {
    canonical: 'https://frankx.ai/vision',
  },
  openGraph: {
    title: 'The Vision — Build What Used to Require an Army',
    description:
      'Personal vision, community mission, and the thesis behind the FrankX ecosystem. AI architecture, creative production, and the builder economy.',
    type: 'website',
    url: 'https://frankx.ai/vision',
  },
}

export default function VisionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
