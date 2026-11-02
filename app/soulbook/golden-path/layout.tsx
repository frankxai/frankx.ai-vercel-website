import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Golden Path",
  description: "A 4-week breakthrough through the 3 most transformative pillars: Consciousness, Emotional Mastery, and Purpose.",
  path: "/soulbook/golden-path",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
