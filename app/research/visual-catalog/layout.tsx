import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Visual Registry and Prompt Catalog",
  description: "The single source of truth for website image assets, with attributed agent creations, documented prompts, and brand alignment checks.",
  path: "/research/visual-catalog",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
