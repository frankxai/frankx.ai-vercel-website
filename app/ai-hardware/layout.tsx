import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Hardware Intelligence — Local, Cloud & Data-Center Compute',
  description: 'Plan AI laptops, workstations, unified-memory nodes, home labs, edge systems, data-center GPUs, or rented cloud compute. Compare what to own, rent, and add next.',
  alternates: { canonical: '/ai-hardware' },
  openGraph: {
    title: 'AI Hardware Intelligence — Own, rent, and route the right compute',
    description: 'An evidence-backed planner for local machines, physical AI infrastructure, rented accelerators, and routed compute fleets.',
    url: 'https://frankx.ai/ai-hardware',
    type: 'website',
  },
}

export default function HardwareLayout({ children }: { children: React.ReactNode }) {
  return children
}
