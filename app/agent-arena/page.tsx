import React from "react"
import Link from "next/link"
import { ArrowLeft, Shield, Terminal, Zap, Code2, Database, Cpu, Compass, FileJson, CheckCircle2 } from "lucide-react"
import { GauntletMatrix } from "@/components/agent-arena/GauntletMatrix"
import { ReceiptViewer } from "@/components/agent-arena/ReceiptViewer"
import { ldJson } from "@/lib/seo/jsonld"

export const revalidate = 3600

const FAQ = [
  {
    q: "How does the Agent Arena differ from the LLM Arena?",
    a: "The LLM Arena measures raw model cognition (token completion, math, single-turn reasoning). The Agent Arena measures the harness and execution system: multi-step planning, MCP tool usage, error self-healing, state retention, and cost-per-shipped PR."
  },
  {
    q: "What are the 5 Gauntlets?",
    a: "1. Full-Stack Code Build (Stripe API + Next.js App Router); 2. Adversarial Debugging (broken Docker subnets & deadlocks); 3. Context & Long-Horizon Memory (40-turn state retention across 10 files); 4. MCP Tool Mesh Hygiene (5-server schema compliance); 5. Cost-per-Merged-Outcome (dollars spent per verified PR)."
  },
  {
    q: "How is gaming or reward-hacking prevented?",
    a: "All evaluations are executed inside isolated Docker sandboxes against deterministic test suites. Every pass requires an append-only audit trace and cryptographic proof of passing CI tests."
  },
  {
    q: "Can autonomous agents query this leaderboard?",
    a: "Yes. Raw benchmark scores and run receipts are served in clean JSON at /agent-arena.json and indexed in /llms.txt for autonomous agent consumption."
  }
]

export default function AgentArenaPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://frankx.ai/" },
      { "@type": "ListItem", position: 2, name: "Agent Arena", item: "https://frankx.ai/agent-arena" },
    ],
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(breadcrumbLd) }} />

      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0b]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute left-1/4 top-0 h-[400px] w-[600px]"
          style={{ background: "radial-gradient(ellipse at top, rgba(16,185,129,0.08) 0%, transparent 70%)", filter: "blur(90px)" }}
        />
      </div>

      <main className="relative z-10 mx-auto max-w-6xl px-6 py-12">
        {/* Navigation */}
        <nav className="mb-8 flex items-center justify-between">
          <Link href="/llm-hub" className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" /> LLM Provider Hub
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/research/model-arena"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition hover:text-white"
            >
              <Code2 className="h-3.5 w-3.5" /> Model Arena
            </Link>
            <a
              href="/agent-arena.json"
              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-300 transition hover:bg-emerald-500/20"
            >
              <FileJson className="h-3.5 w-3.5" /> Agent API
            </a>
          </div>
        </nav>

        {/* Hero */}
        <section className="mb-12">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-emerald-400">
            Empirical Agent Benchmark · Updated August 2026
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Agent Arena <span className="text-white/40">2026</span>
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-white/60">
            The execution-layer benchmark for autonomous coding agents, CLI harnesses, and multi-agent swarms. We test complete
            multi-turn workflows against 5 rigorous gauntlets with verifiable run receipts.
          </p>

          {/* GEO Executive Answer-First Card */}
          <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-emerald-500/20 p-2 text-emerald-300">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 font-mono">
                  Executive Verdict · August 2026
                </h2>
                <p className="mt-1 text-sm text-white/80 leading-relaxed">
                  <strong>Claude Code (Sonnet 5)</strong> leads on CLI constraint discipline and MCP tool integration (96% composite).{" "}
                  <strong>Antigravity (Gemini 3.7 Flash)</strong> wins on context retention and cost-speed efficiency ($0.18/task).{" "}
                  <strong>Hermes Swarm (Qwen 3.8-27B)</strong> delivers top local sovereignty ($0.05/task air-gapped).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Model vs Agent Intelligence Distinction */}
        <section className="mb-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl">
            <div className="mb-3 flex items-center gap-2 text-cyan-400">
              <Cpu className="h-5 w-5" />
              <h3 className="font-bold text-white text-lg">LLM Arena (Raw Cognition)</h3>
            </div>
            <p className="text-xs text-white/60 leading-relaxed mb-4">
              Measures isolated token generation, instruction adherence on single-turn prompts, mathematics, and raw latency.
            </p>
            <ul className="space-y-2 text-xs text-white/50 font-mono">
              <li>• Single/Few-shot prompts</li>
              <li>• Token speed & latency (tps)</li>
              <li>• Context loss at 1M+ tokens</li>
              <li>• Cost per 1M tokens</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/[0.02] p-6 backdrop-blur-xl">
            <div className="mb-3 flex items-center gap-2 text-emerald-400">
              <Terminal className="h-5 w-5" />
              <h3 className="font-bold text-white text-lg">Agent Arena (Lifecycle Execution)</h3>
            </div>
            <p className="text-xs text-white/60 leading-relaxed mb-4">
              Measures multi-turn execution, filesystem manipulation, tool chaining across MCP servers, and terminal self-healing.
            </p>
            <ul className="space-y-2 text-xs text-emerald-300/70 font-mono">
              <li>• Multi-turn planning & backtracking</li>
              <li>• Tool mesh & MCP schema compliance</li>
              <li>• Error recovery without human input</li>
              <li>• Cost per verified merged outcome</li>
            </ul>
          </div>
        </section>

        {/* The Gauntlet Matrix Component */}
        <section className="mb-14">
          <div className="mb-6 flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-white">The 5-Gauntlet Leaderboard</h2>
            <p className="text-sm text-white/40">
              Select a gauntlet to view specialized rankings or view the composite score across all five.
            </p>
          </div>
          <GauntletMatrix />
        </section>

        {/* Run Receipt & Trace Viewer */}
        <section className="mb-14">
          <ReceiptViewer />
        </section>

        {/* FAQ Section with SEO schema */}
        <section className="border-t border-white/5 pt-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
            <p className="text-sm text-white/40">Evaluation methodology, fraud resistance, and machine consumption.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {FAQ.map((f) => (
              <div key={f.q} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <h3 className="font-semibold text-white text-sm mb-2">{f.q}</h3>
                <p className="text-xs text-white/60 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
