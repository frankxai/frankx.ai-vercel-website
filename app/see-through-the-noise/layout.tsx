import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Misinformation Guardian Live Risk Analysis",
  description: "Analyze posts, articles, or transcripts in real time, surface manipulation signals, and trace the architecture for deploying this safely at scale.",
  path: "/see-through-the-noise",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
