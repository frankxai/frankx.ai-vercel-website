"use client"

import React, { useState } from "react"
import { CheckCircle2, XCircle, AlertCircle, FileCode, Shield, Terminal, ArrowRight } from "lucide-react"

interface RunStep {
  turn: number
  action: string
  tool: string
  status: "PASS" | "FAIL" | "AUDIT"
  outputSnippet: string
}

interface RunReceipt {
  id: string
  title: string
  agent: string
  date: string
  gauntlet: string
  totalTurns: number
  totalCost: string
  verdict: "PASS" | "FAIL"
  steps: RunStep[]
}

const SAMPLE_RECEIPTS: RunReceipt[] = [
  {
    id: "run-2026-08-22-claude-stripe",
    title: "Stripe Webhook + Next.js Route Build",
    agent: "Claude Code (Sonnet 5)",
    date: "2026-08-22",
    gauntlet: "Gauntlet 1: Full-Stack Code Build",
    totalTurns: 7,
    totalCost: "$0.38",
    verdict: "PASS",
    steps: [
      { turn: 1, action: "Read repository package.json and tsconfig.json", tool: "view_file", status: "PASS", outputSnippet: "Parsed Next.js 15 App Router architecture" },
      { turn: 2, action: "Create app/api/webhook/stripe/route.ts with HMAC verification", tool: "write_to_file", status: "PASS", outputSnippet: "Wrote 84 lines with Stripe SDK webhook construct" },
      { turn: 3, action: "Run pnpm test to verify signature rejection", tool: "run_command", status: "PASS", outputSnippet: "Tests passed: 4/4 passing (142ms)" },
      { turn: 4, action: "Create git commit with explicit pathspecs", tool: "run_command", status: "PASS", outputSnippet: "Committed [feat] stripe webhook verification" },
    ]
  },
  {
    id: "run-2026-08-23-hermes-docker",
    title: "Deadlock Recovery in Docker Microservices",
    agent: "Hermes Swarm (Qwen 3.8-27B)",
    date: "2026-08-23",
    gauntlet: "Gauntlet 2: Adversarial Debugging",
    totalTurns: 9,
    totalCost: "$0.04 (Local)",
    verdict: "PASS",
    steps: [
      { turn: 1, action: "Inspect docker-compose.yml and network bridge status", tool: "run_command", status: "PASS", outputSnippet: "Identified conflicting subnet assignment on port 5432" },
      { turn: 2, action: "Patch port mapping and restart PostgreSQL container", tool: "run_command", status: "PASS", outputSnippet: "Container db-master healthy (exit code 0)" },
      { turn: 3, action: "Run database migration schema verify", tool: "run_command", status: "PASS", outputSnippet: "Applied 3 migrations, connection pool active" },
    ]
  },
]

export function ReceiptViewer() {
  const [selectedRun, setSelectedRun] = useState<string>(SAMPLE_RECEIPTS[0].id)
  const current = SAMPLE_RECEIPTS.find((r) => r.id === selectedRun) || SAMPLE_RECEIPTS[0]

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl md:p-8">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-emerald-400">Verifiable Run Traces</span>
          </div>
          <h3 className="text-xl font-bold text-white">Execution Receipts & Replays</h3>
          <p className="text-xs text-white/50">Every score is backed by raw JSON turn receipts from starlight-evals.</p>
        </div>

        <div className="flex gap-2">
          {SAMPLE_RECEIPTS.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRun(r.id)}
              className={`rounded-xl px-3 py-1.5 text-xs font-medium transition ${
                selectedRun === r.id
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {r.agent.split(" ")[0]} · {r.title.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Run Details */}
      <div className="rounded-2xl border border-white/5 bg-black/60 p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              {current.title}
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-xs text-emerald-300 border border-emerald-500/30">
                {current.verdict}
              </span>
            </h4>
            <p className="text-xs text-white/50 mt-0.5">
              Contestant: <strong className="text-white/80">{current.agent}</strong> · {current.gauntlet}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-white/70">
            <div>Turns: <strong className="text-emerald-300">{current.totalTurns}</strong></div>
            <div>Cost: <strong className="text-cyan-300">{current.totalCost}</strong></div>
            <div>Date: {current.date}</div>
          </div>
        </div>

        {/* Trace Steps */}
        <div className="space-y-3 font-mono text-xs">
          {current.steps.map((step) => (
            <div key={step.turn} className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.01] p-3">
              <div className="shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                T{step.turn}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between text-white/90 mb-1">
                  <span>{step.action}</span>
                  <span className="text-[11px] text-white/40 border border-white/10 px-1.5 py-0.2 rounded">
                    tool: {step.tool}
                  </span>
                </div>
                <div className="text-[11px] text-emerald-400/80 bg-black/40 p-2 rounded-lg border border-white/5">
                  &gt; {step.outputSnippet}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
