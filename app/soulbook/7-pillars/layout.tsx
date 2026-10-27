import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "The 7 Pillars of Conscious Living",
  description: "A framework for building an extraordinary life through intentional development across seven interconnected dimensions of human excellence.",
  path: "/soulbook/7-pillars",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
