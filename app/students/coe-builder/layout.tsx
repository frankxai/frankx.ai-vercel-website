import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Build Your Creator CoE",
  description: "Design your personal AI Center of Excellence. Select domains, customize agents, and create your intelligence system in under an hour.",
  path: "/students/coe-builder",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
