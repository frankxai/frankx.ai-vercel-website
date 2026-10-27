import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Starter Templates",
  description: "Production-ready code templates for AI architecture. Subscribe to hear when they are available.",
  path: "/ai-architecture/templates",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
