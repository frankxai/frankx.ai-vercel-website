import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Workflow Templates for Investors",
  description: "n8n automation pipelines for investors. Workflow templates are being prepared.",
  path: "/investor/workflows",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
