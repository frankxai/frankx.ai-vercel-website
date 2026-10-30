import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Skill Builder",
  description: "Fill the fields, copy the generated SKILL.md, and drop it into your agent repo. Designed for Claude, Codex, Gemini, and custom agents.",
  path: "/skills/builder",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
