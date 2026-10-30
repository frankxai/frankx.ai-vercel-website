import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "AI System Builder",
  description: "Design and architect your AI system with guided templates, best practices, and interactive planning tools.",
  path: "/tools/builder",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
