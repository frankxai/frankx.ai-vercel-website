import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Architecture Blueprints",
  description: "Diagrams, implementation guides, and cost estimates for AI architecture blueprints.",
  path: "/ai-architecture/blueprints",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
