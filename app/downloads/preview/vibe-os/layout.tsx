import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Vibe OS Guide Download Preview",
  description: "An AI music creation system for engineering flow state and neuro-state transformation, for turning creative energy into music that ships.",
  path: "/downloads/preview/vibe-os",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
