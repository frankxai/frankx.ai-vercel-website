import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Music Brainstorm",
  description: "Lyrics hooks, themes, and copy-ready Suno prompts, each in Simple Mode and Custom Mode.",
  path: "/music/brainstorm",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
