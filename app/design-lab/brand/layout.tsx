import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Brand Guidelines",
  description: "The FrankX design system: colors, typography, voice, and visual language.",
  path: "/design-lab/brand",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
