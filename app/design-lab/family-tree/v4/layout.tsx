import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Family Tree V4: Timeline",
  description: "Generational timeline flowing top to bottom. Each generation is a chapter. Storytelling meets data viz.",
  path: "/design-lab/family-tree/v4",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
