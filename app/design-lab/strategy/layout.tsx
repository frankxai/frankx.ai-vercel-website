import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Three Teams. One Identity.",
  description: "Three competing design approaches for the signature visual identity of frankx.ai, each with a complete homepage redesign.",
  path: "/design-lab/strategy",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
