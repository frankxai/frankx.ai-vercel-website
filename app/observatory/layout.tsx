import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agent Observatory — The Agentic Creator OS Fleet',
  description:
    'An interactive map of the Agentic Creator OS: 142 specialized agents, 108 skills, 66 commands, 8 workflows, and the IAM capability matrix that governs them.',
  openGraph: {
    title: 'Agent Observatory — The Agentic Creator OS Fleet',
    description:
      'Explore 142 specialized AI agents, their skills, commands, workflows, and IAM scoping in one interactive graph.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agent Observatory — The Agentic Creator OS Fleet',
    description: 'An interactive map of 142 agents, 108 skills, and the system that orchestrates them.',
  },
}

export default function ObservatoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
