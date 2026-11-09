import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: "Production-Ready GenAI Stacks",
  description: "Full-stack, no-code GenAI solutions built on OCI AI Blueprints with NVIDIA enterprise software.",
  path: "/ai-ops/accelerator-packs",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
