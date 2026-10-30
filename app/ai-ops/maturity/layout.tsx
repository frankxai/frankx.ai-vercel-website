import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "The 6-Level AI Ops Journey",
  description: "Assess your current AI operations maturity and chart a path to autonomous intelligence.",
  path: "/ai-ops/maturity",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
