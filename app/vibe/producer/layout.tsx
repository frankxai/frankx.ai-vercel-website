import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Vibe Producer",
  description: "Different brainwave frequencies require different music. Match your music to your mental state with pre-engineered Suno prompts.",
  path: "/vibe/producer",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
