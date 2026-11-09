import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Module 1: Your AI Foundation",
  description: "Set up Claude Code, configure your project brain, and understand the framework that powers everything you build in this course.",
  path: "/courses/build-your-ai-creator-os/module-1",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
