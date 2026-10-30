import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Creator Chronicles",
  description: "The chronological evolution of an AI architect, following the line from mythology through agentic operating layers to sovereign commercial products.",
  path: "/map/v3",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
