import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Ikigai Workshop for Students",
  description: "Find where your ikigai sits with AI-powered reflection prompts. Your data stays in your browser, and you can export to Markdown or JSON.",
  path: "/students/workshop",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
