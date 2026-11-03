import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "What's Your AI Maturity Level?",
  description: "Seven questions, two minutes, an honest assessment of your AI maturity level.",
  path: "/assess/ai-coe",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
