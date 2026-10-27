import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Visual Registry and Prompt Catalog",
  description: "Browse the image assets used across frankx.ai, with the style, creator and prompt details the catalog holds for each.",
  path: "/research/visual-catalog",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
