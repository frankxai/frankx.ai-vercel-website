import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agent Observatory — The Agentic Creator OS Fleet',
  description:
    'An interactive map of the Agentic Creator OS: specialized agents, skills, commands, workflows, and the IAM capability matrix that governs them.',
  openGraph: {
    title: 'Agent Observatory — The Agentic Creator OS Fleet',
    description:
      'Explore the Agentic Creator OS fleet — agents, skills, commands, workflows, and IAM scoping in one interactive graph.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agent Observatory — The Agentic Creator OS Fleet',
    description: 'An interactive map of the agent fleet and the system that orchestrates it.',
  },
}

export default function ObservatoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
