import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Newsletter | 6 Streams for Builders, Musicians & Investors | FrankX',
  description: 'Subscribe to the signals that matter. AI architecture, music production, investing, worldbuilding — each newsletter stream has its own voice, cadence, and depth.',
  path: '/newsletter',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
