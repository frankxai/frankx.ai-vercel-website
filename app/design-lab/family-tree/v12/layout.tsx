import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Family Tree V12: Canvas 2D",
  description: "Hand-painted HTML Canvas with bezier curves, hover effects, retina support. Export as PNG.",
  path: "/design-lab/family-tree/v12",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
