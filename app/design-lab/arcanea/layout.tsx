import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "The Visual Language of Arcanea",
  description: "Color systems derived from frequency, typography rooted in mythology, and visual patterns that bridge ancient consciousness with modern technology.",
  path: "/design-lab/arcanea",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
