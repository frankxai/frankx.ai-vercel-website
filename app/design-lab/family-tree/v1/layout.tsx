import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Family Tree V1: Glassmorphic Tree",
  description: "Frosted glass cards with SVG connections, animated gradient borders. Zero dependencies beyond Tailwind.",
  path: "/design-lab/family-tree/v1",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
