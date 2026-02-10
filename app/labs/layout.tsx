import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Labs | Experimental AI Projects & Prototypes | FrankX',
  description: 'Experimental AI projects and prototypes. Live workshops, research experiments, and bleeding-edge explorations in agentic AI and creative systems.',
  path: '/labs',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
