import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Family Tree V7: Pedigree Chart",
  description: "Classic ancestry format — Frank at bottom, branching upward through parents to grandparents.",
  path: "/design-lab/family-tree/v7",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
