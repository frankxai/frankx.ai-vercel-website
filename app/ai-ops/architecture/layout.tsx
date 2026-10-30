import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "The 5-Layer AI Ops Stack",
  description: "A complete reference architecture for building production AI operations, from gateway routing to user interfaces.",
  path: "/ai-ops/architecture",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
