import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agent Hub 2026 — Agent Platforms and Frameworks, Compared Honestly',
  description:
    'Compare the agent platforms and frameworks of 2026: Claude Code, OpenAI Codex, Cursor, Antigravity, Devin, LangGraph, CrewAI, the Agent SDKs. What each is for, what to watch out for, and why a score without its scaffold is not a comparison.',
  keywords: [
    'agent platform comparison',
    'best ai coding agent 2026',
    'agent framework comparison',
    'langgraph vs crewai',
    'claude code vs codex vs cursor',
    'mcp native frameworks',
    'agentic ai stack 2026',
  ],
  alternates: { canonical: 'https://frankx.ai/agent-hub' },
  openGraph: {
    title: 'Agent Hub 2026 — Agent Platforms and Frameworks, Compared Honestly',
    description:
      'The decision layer over agent platforms and frameworks. Every claim carries its evidence grade, because scaffold choice moves agentic results by up to 30 points on identical models.',
    url: 'https://frankx.ai/agent-hub',
    type: 'website',
  },
}

export default function AgentHubLayout({ children }: { children: React.ReactNode }) {
  return children
}
