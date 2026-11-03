import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Family Tree V3: Radial Orbit",
  description: "Frank at center with family radiating outward in concentric rings. Pure SVG with smooth hover animations.",
  path: "/design-lab/family-tree/v3",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
