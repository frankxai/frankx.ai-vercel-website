import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Family Tree V6: Force-Directed Graph",
  description: "D3 physics simulation — nodes attract and repel based on relationship closeness. Drag to rearrange.",
  path: "/design-lab/family-tree/v6",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
