import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Frontier AI Models Intelligence Hub",
  description: "Benchmarks, pricing, context windows, and capabilities for every frontier model worth tracking, validated against official sources.",
  path: "/ai-ops/models-2026",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
