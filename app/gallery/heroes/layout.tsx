import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Hero Image Laboratory",
  description: "Compare hero image styles, from Dark Glass and Da Vinci to Cyberpunk and Cinematic.",
  path: "/gallery/heroes",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
