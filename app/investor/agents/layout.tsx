import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "AI Agent Packs for Investors",
  description: "Autonomous research agents for investors. Agent packs are being prepared.",
  path: "/investor/agents",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
