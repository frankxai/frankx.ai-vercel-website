import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Ecosystem Node Map",
  description: "Pan the canvas, zoom to inspect clusters, and click any node to load full metadata, clone statements, and repository stats.",
  path: "/map/v2",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
