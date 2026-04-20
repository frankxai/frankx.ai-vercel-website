import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Intelligence Map | FrankX AI Creator Ecosystem Architecture',
  description:
    'The complete architecture of an AI-powered creator ecosystem. Explore 100+ repos, 47 workflows, 500+ skills, and the full technology stack behind frankx.ai.',
  path: '/intelligence-map',
  keywords: [
    'ai architecture',
    'creator ecosystem',
    'agentic workflows',
    'ai automation',
    'claude code',
    'n8n automation',
    'personal ai coe',
    'intelligence map',
  ],
  authors: ['Frank Riemer'],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
