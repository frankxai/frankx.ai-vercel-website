import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Production LLM and Agent Systems Resource Hub",
  description: "Reference architectures, code samples, decision frameworks, and best practices for building enterprise-grade GenAI systems on Oracle Cloud Infrastructure.",
  path: "/ai-architect/ai-coe-hub",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
