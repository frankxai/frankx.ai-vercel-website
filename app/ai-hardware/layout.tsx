import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Hardware Intelligence — Workstations, Local LLMs & Fleet Planner',
  description: 'Plan an AI workstation, unified-memory model node, or small AI fleet. Compare NVIDIA, AMD, Apple, edge accelerators, model fit, cloud tradeoffs, and expansion cost.',
  alternates: { canonical: '/ai-hardware' },
  openGraph: {
    title: 'AI Hardware Intelligence — Buy the right compute',
    description: 'An evidence-backed planner for AI workstations, private model nodes, and creator fleets.',
    url: 'https://frankx.ai/ai-hardware',
    type: 'website',
  },
}

export default function HardwareLayout({ children }: { children: React.ReactNode }) {
  return children
}
