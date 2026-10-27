import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "6 Production AI Ops Patterns",
  description: "Battle-tested patterns for deploying AI operations at scale, from gateway routing to multi-agent orchestration.",
  path: "/ai-ops/patterns",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
