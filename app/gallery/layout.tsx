import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Visual Gallery",
  description: "Explore the full visual asset library across collections, with filters and full-resolution views.",
  path: "/gallery",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
