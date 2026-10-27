import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Architecture Tools",
  description: "Curated third-party resources for AI development. FrankX.ai is not affiliated with these companies.",
  path: "/ai-architecture/tools",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
