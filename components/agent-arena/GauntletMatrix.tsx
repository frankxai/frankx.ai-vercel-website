"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShieldCheck, Terminal, Cpu, Database, Wrench, DollarSign, CheckCircle2, XCircle, AlertTriangle, ArrowUpRight } from "lucide-react"

export interface AgentResult {
  agent: string
  org: string
  harnessType: "CLI" | "IDE" | "Autonomous Swarm" | "Cloud Worker"
  scores: {
    g1_build: number      // 0-100%
    g2_debug: number      // 0-100%
    g3_memory: number     // 0-100%
    g4_mcp: number        // 0-100%
    g5_costOutcome: number // 0-100 (100 = most cost-efficient)
  }
  costPerTaskAvg: string
  evidenceGrade: "A" | "B" | "C"
  verdict: string
  mcpSupport: "native" | "supported" | "none"
}

export const AGENT_RESULTS: AgentResult[] = [
  {
    agent: "Claude Code",
    org: "Anthropic",
    harnessType: "CLI",
    scores: {
      g1_build: 96,
      g2_debug: 94,
      g3_memory: 92,
      g4_mcp: 98,
      g5_costOutcome: 88,
    },
    costPerTaskAvg: "$0.42",
    evidenceGrade: "A",
    verdict: "Top-tier constraint discipline, tool chaining & native MCP ergonomics.",
    mcpSupport: "native",
  },
  {
    agent: "Antigravity",
    org: "Google DeepMind",
    harnessType: "Autonomous Swarm",
    scores: {
      g1_build: 95,
      g2_debug: 93,
      g3_memory: 96,
      g4_mcp: 95,
      g5_costOutcome: 94,
    },
    costPerTaskAvg: "$0.18",
    evidenceGrade: "A",
    verdict: "Unmatched multi-million token context recall, ultra-fast subagent fanout.",
    mcpSupport: "native",
  },
  {
    agent: "Cursor Agent",
    org: "Anysphere",
    harnessType: "IDE",
    scores: {
      g1_build: 92,
      g2_debug: 89,
      g3_memory: 85,
      g4_mcp: 88,
      g5_costOutcome: 82,
    },
    costPerTaskAvg: "$0.55",
    evidenceGrade: "B",
    verdict: "Fastest in-editor iteration loops; excellent inline diff synthesis.",
    mcpSupport: "native",
  },
  {
    agent: "Hermes Swarm",
    org: "Nous / Open Source",
    harnessType: "Autonomous Swarm",
    scores: {
      g1_build: 89,
      g2_debug: 88,
      g3_memory: 90,
      g4_mcp: 92,
      g5_costOutcome: 98,
    },
    costPerTaskAvg: "$0.05 (Local/Qwen)",
    evidenceGrade: "A",
    verdict: "Highest sovereignty; runs fully air-gapped with zero API billing leak.",
    mcpSupport: "native",
  },
  {
    agent: "Codex CLI",
    org: "OpenAI",
    harnessType: "CLI",
    scores: {
      g1_build: 91,
      g2_debug: 90,
      g3_memory: 88,
      g4_mcp: 84,
      g5_costOutcome: 86,
    },
    costPerTaskAvg: "$0.48",
    evidenceGrade: "B",
    verdict: "Strong deterministic Python/JS execution; robust multi-file refactors.",
    mcpSupport: "supported",
  },
]

const GAUNTLETS = [
  {
    id: "g1_build",
    name: "Gauntlet 1: Full-Stack Code Build",
    icon: Terminal,
    desc: "Clones repo, adds Stripe webhook + typed API route, passes tests without human assistance.",
  },
  {
    id: "g2_debug",
    name: "Gauntlet 2: Adversarial Debugging",
    icon: Wrench,
    desc: "Dropped into broken Docker network + corrupted database migration; restores uptime in <=10 turns.",
  },
  {
    id: "g3_memory",
    name: "Gauntlet 3: Context & Long-Horizon Memory",
    icon: Database,
    desc: "Maintains 40-turn state retention across 10 files without architectural hallucinations or goal drift.",
  },
  {
    id: "g4_mcp",
    name: "Gauntlet 4: MCP Tool Mesh Hygiene",
    icon: Cpu,
    desc: "Executes across 5 disparate MCP servers (DB, Browser, Terminal, Git, Context7) with zero schema errors.",
  },
  {
    id: "g5_costOutcome",
    name: "Gauntlet 5: Cost-per-Merged-Outcome",
    icon: DollarSign,
    desc: "Normalized dollar cost of inference per verified passed pull request or shipped feature.",
  },
]

export function GauntletMatrix() {
  const [selectedGauntlet, setSelectedGauntlet] = useState<string>("all")
  const [activeAgent, setActiveAgent] = useState<string | null>(null)

  const sortedAgents = [...AGENT_RESULTS].sort((a, b) => {
    if (selectedGauntlet === "all") {
      const avgA = (a.scores.g1_build + a.scores.g2_debug + a.scores.g3_memory + a.scores.g4_mcp + a.scores.g5_costOutcome) / 5
      const avgB = (b.scores.g1_build + b.scores.g2_debug + b.scores.g3_memory + b.scores.g4_mcp + b.scores.g5_costOutcome) / 5
      return avgB - avgA
    }
    const key = selectedGauntlet as keyof AgentResult["scores"]
    return (b.scores[key] || 0) - (a.scores[key] || 0)
  })

  return (
    <div className="space-y-6">
      {/* Gauntlet Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedGauntlet("all")}
          className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
            selectedGauntlet === "all"
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
              : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
          }`}
        >
          Overall Composite
        </button>
        {GAUNTLETS.map((g) => {
          const Icon = g.icon
          const isSelected = selectedGauntlet === g.id
          return (
            <button
              key={g.id}
              onClick={() => setSelectedGauntlet(g.id)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition ${
                isSelected
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {g.name.split(":")[0]}
            </button>
          )
        })}
      </div>

      {/* Gauntlet description */}
      {selectedGauntlet !== "all" && (
        <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-white/70">
          <strong className="text-white">
            {GAUNTLETS.find((g) => g.id === selectedGauntlet)?.name}:
          </strong>{" "}
          {GAUNTLETS.find((g) => g.id === selectedGauntlet)?.desc}
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/10 bg-black/40 text-xs uppercase tracking-wider text-white/40 font-mono">
              <tr>
                <th className="px-6 py-4">Rank & Agent</th>
                <th className="px-4 py-4">Harness Type</th>
                <th className="px-4 py-4">MCP</th>
                <th className="px-4 py-4">Evidence</th>
                <th className="px-4 py-4">Avg Cost / PR</th>
                <th className="px-6 py-4 text-right">
                  {selectedGauntlet === "all" ? "Composite Score" : "Gauntlet Score"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {sortedAgents.map((agent, idx) => {
                const composite = Math.round(
                  (agent.scores.g1_build +
                    agent.scores.g2_debug +
                    agent.scores.g3_memory +
                    agent.scores.g4_mcp +
                    agent.scores.g5_costOutcome) /
                    5
                )
                const scoreToShow =
                  selectedGauntlet === "all"
                    ? composite
                    : agent.scores[selectedGauntlet as keyof AgentResult["scores"]]

                return (
                  <tr
                    key={agent.agent}
                    className="transition hover:bg-white/[0.02] cursor-pointer"
                    onClick={() => setActiveAgent(activeAgent === agent.agent ? null : agent.agent)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-white/40 w-4">#{idx + 1}</span>
                        <div>
                          <div className="font-semibold text-white flex items-center gap-2">
                            {agent.agent}
                            {idx === 0 && (
                              <span className="rounded bg-emerald-500/20 px-1.5 py-0.2 font-mono text-[10px] text-emerald-300 border border-emerald-500/40">
                                LEADER
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-white/40">{agent.org}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs text-white/70">
                      <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1">
                        {agent.harnessType}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs">
                      <span
                        className={`rounded px-2 py-0.5 font-mono text-[11px] ${
                          agent.mcpSupport === "native"
                            ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                            : "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30"
                        }`}
                      >
                        {agent.mcpSupport}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs">
                      <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-emerald-300">
                        Grade {agent.evidenceGrade}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-mono text-xs text-white/80">
                      {agent.costPerTaskAvg}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-white/10 hidden sm:block">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400"
                            style={{ width: `${scoreToShow}%` }}
                          />
                        </div>
                        <span className="font-mono text-base font-bold text-white">
                          {scoreToShow}%
                        </span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
