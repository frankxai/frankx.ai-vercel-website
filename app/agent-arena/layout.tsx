import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Agent Arena 2026: The Frontier AI Agent & Harness Benchmark",
  description:
    "First-party empirical evaluation of AI coding agents, CLI harnesses, and autonomous swarms across 5 real-world engineering gauntlets. Published receipts, zero synthetic bias.",
  alternates: {
    canonical: "https://frankx.ai/agent-arena",
  },
  openGraph: {
    title: "Agent Arena: Coding Agents & Autonomous Swarms Benchmark (2026)",
    description:
      "Empirical benchmark of Claude Code, Antigravity, Cursor, Hermes, and Codex across 5 standardized software engineering gauntlets.",
    url: "https://frankx.ai/agent-arena",
    type: "website",
  },
}

export default function AgentArenaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
