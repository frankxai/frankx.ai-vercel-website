import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Family Tree V2: Interactive Flow",
  description: "Draggable node graph with React Flow. Zoom, pan, minimap. Custom glassmorphic nodes with animated edges.",
  path: "/design-lab/family-tree/v2",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
