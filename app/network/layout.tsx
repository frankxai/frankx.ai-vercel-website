import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Network — Every Page, Every Image · FrankX',
  description:
    'Every page, every image, every system on FrankX — connected. Browse 268 routes and 463 images as a list, graph, or 3D swarm.',
  alternates: { canonical: 'https://frankx.ai/network' },
  openGraph: {
    title: 'FrankX Network — Sitemap as a Graph',
    description: 'Browse every page and image on frankx.ai as an interactive network graph.',
    type: 'website',
    url: 'https://frankx.ai/network',
  },
}

export default function NetworkLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#0a0a0b] text-white">{children}</div>
}
