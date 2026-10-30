import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Ecosystem Console",
  description: "Explore the repositories that make up the FrankX ecosystem. Filter by status and copy git deployment endpoints.",
  path: "/map/v1",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
