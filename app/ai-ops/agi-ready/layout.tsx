import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "The Path to AGI",
  description: "Memory hierarchies, self-improvement loops, and the architecture patterns that bridge today's AI to tomorrow's general intelligence.",
  path: "/ai-ops/agi-ready",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
