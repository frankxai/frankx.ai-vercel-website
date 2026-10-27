import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Creator Prompt Library",
  description: "Battle-tested prompts organized by creator domain. Copy, customize, and use them in any AI tool.",
  path: "/students/prompts",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
