import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Starlight Intelligence System — Sovereignty Substrate for Indispensable Professionals',
  description: 'Free, open substrate for organizing 15 years of scattered expertise into a second brain you own. 9-layer intelligence architecture, markdown-first, no vendor lock-in. MIT licensed. Download the starter pack or clone the repo.',
  path: '/starlight-intelligence-system',
  keywords: [
    'starlight intelligence system',
    'SIS',
    'SIP protocol',
    'second brain architecture',
    'sovereign AI substrate',
    'claude desktop starter pack',
    'personal AI operating system',
    'knowledge reclamation',
    'genius profile',
    'freedom path',
    'markdown vaults',
    'MCP server',
    'open source AI substrate',
  ],
})

export default function SISLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
