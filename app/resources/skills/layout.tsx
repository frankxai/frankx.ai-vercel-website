import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "AI Skills for Creators",
  description: "Specialized Claude Code skills for music production, content creation, personal mastery, and technical development. Open source and ready to use.",
  path: "/resources/skills",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
