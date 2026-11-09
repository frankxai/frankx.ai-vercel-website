import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "The Creator's Soulbook Download Preview",
  description: "A 7-pillar framework for soul-aligned creative transformation, a studio manual for authentic, high-output work.",
  path: "/downloads/preview/soulbook",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
