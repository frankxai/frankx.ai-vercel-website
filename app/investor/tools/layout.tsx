import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Tools and Templates for Investors",
  description: "Notion, Obsidian, Claude Code, and workspace configs for investors. Tools and templates are being prepared.",
  path: "/investor/tools",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
