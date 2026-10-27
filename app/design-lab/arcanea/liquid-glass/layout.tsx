import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Liquid Glass System",
  description: "Apple's Liquid Glass design language meets Arcanea's iridescence. Interact with live components.",
  path: "/design-lab/arcanea/liquid-glass",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
