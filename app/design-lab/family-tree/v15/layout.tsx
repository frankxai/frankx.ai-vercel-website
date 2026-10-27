import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Family Tree V15: Morphing Layouts",
  description: "Three layout modes (tree, radial, grid) with smooth SVG morphing transitions between them.",
  path: "/design-lab/family-tree/v15",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
