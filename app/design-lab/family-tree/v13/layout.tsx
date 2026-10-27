import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Family Tree V13: Mermaid",
  description: "Auto-generated from family data. Mermaid syntax drives the visualization. Toggle layouts.",
  path: "/design-lab/family-tree/v13",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
