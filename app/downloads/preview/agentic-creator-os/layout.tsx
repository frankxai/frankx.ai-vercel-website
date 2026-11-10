import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Agentic Creator OS Download Preview",
  description: "The universal agent harness and skill engine. Install skills, workflows, and specialized agents in your local workspace.",
  path: "/downloads/preview/agentic-creator-os",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
