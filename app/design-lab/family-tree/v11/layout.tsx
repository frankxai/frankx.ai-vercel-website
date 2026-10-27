import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Family Tree V11: Sunburst",
  description: "Nivo concentric rings: Frank at center, parents first ring, grandparents outer ring. Declarative React.",
  path: "/design-lab/family-tree/v11",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
