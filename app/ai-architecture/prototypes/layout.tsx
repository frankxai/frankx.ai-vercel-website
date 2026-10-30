import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Interactive Prototypes",
  description: "Try AI architecture patterns with your own API keys (BYOK).",
  path: "/ai-architecture/prototypes",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
