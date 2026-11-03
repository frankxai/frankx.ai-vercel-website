import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Iridescence",
  description: "Prismatic light like cathedral crystals and oil on dark water, simulated in UI with multi-layer gradients and traveling specular highlights.",
  path: "/design-lab/arcanea/iridescence",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
