"use client"

import React, { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Calculator, Sparkles } from "lucide-react"

interface ModelPricing {
  id: string
  name: string
  org: string
  inputPer1M: number
  outputPer1M: number
  color: string
  tier: "fast" | "balanced" | "flagship" | "open"
  tps: string
  note: string
}

const MODELS: ModelPricing[] = [
  {
    id: "deepseek-v4-pro",
    name: "DeepSeek V4 Pro",
    org: "DeepSeek",
    inputPer1M: 0.27,
    outputPer1M: 1.10,
    color: "#3b82f6",
    tier: "open",
    tps: "140 t/s",
    note: "Cheapest frontier-class coding and agentic reasoning",
  },
  {
    id: "gemini-3-7-flash",
    name: "Gemini 3.7 Flash",
    org: "Google",
    inputPer1M: 0.75,
    outputPer1M: 3.75,
    color: "#06b6d4",
    tier: "fast",
    tps: "340+ t/s",
    note: "Blazing speed leader with hybrid thinking",
  },
  {
    id: "claude-sonnet-5",
    name: "Claude Sonnet 5",
    org: "Anthropic",
    inputPer1M: 2.00,
    outputPer1M: 10.00,
    color: "#f97316",
    tier: "balanced",
    tps: "90 t/s",
    note: "Balanced daily driver for coding and analysis",
  },
  {
    id: "grok-4-6",
    name: "Grok 4.6",
    org: "xAI",
    inputPer1M: 2.00,
    outputPer1M: 6.00,
    color: "#eab308",
    tier: "balanced",
    tps: "110 t/s",
    note: "Real-time grounded orchestration and agent swarms",
  },
  {
    id: "gpt-5-6-sol",
    name: "GPT-5.6 Sol",
    org: "OpenAI",
    inputPer1M: 5.00,
    outputPer1M: 20.00,
    color: "#10b981",
    tier: "flagship",
    tps: "85 t/s",
    note: "Unified frontier reasoning and multi-modal synthesis",
  },
  {
    id: "claude-opus-5",
    name: "Claude Opus 5",
    org: "Anthropic",
    inputPer1M: 5.00,
    outputPer1M: 25.00,
    color: "#a855f7",
    tier: "flagship",
    tps: "75 t/s",
    note: "Elite situational judgment, architecture & deep code craft",
  },
  {
    id: "claude-fable-5",
    name: "Claude Fable 5",
    org: "Anthropic",
    inputPer1M: 10.00,
    outputPer1M: 50.00,
    color: "#ec4899",
    tier: "flagship",
    tps: "70 t/s",
    note: "Mythos-class ceiling for long-horizon constraint precision",
  },
]

const PRESETS = [
  {
    label: "Solo Creator / Dev",
    inTokens: 5,
    outTokens: 1,
  },
  {
    label: "Agentic Production Team",
    inTokens: 20,
    outTokens: 4,
  },
  {
    label: "Enterprise Autonomous Mesh",
    inTokens: 100,
    outTokens: 15,
  },
]

export function CostCalculator() {
  const [inputM, setInputM] = useState<number>(10)
  const [outputM, setOutputM] = useState<number>(2)

  const calculations = useMemo(() => {
    return MODELS.map((m) => {
      const inputCost = inputM * m.inputPer1M
      const outputCost = outputM * m.outputPer1M
      const total = inputCost + outputCost
      return {
        ...m,
        inputCost,
        outputCost,
        total,
      }
    }).sort((a, b) => a.total - b.total)
  }, [inputM, outputM])

  const cheapest = calculations[0]
  const mostExpensive = calculations[calculations.length - 1]

  const hybridCost = useMemo(() => {
    const fastTier = calculations.find((c) => c.id === "gemini-3-7-flash") || calculations[0]
    const deepTier = calculations.find((c) => c.id === "claude-opus-5") || calculations[calculations.length - 1]
    const fastPortion = fastTier.total * 0.8
    const deepPortion = deepTier.total * 0.2
    return fastPortion + deepPortion
  }, [calculations])

  const hybridSavingsVsFlagship = useMemo(() => {
    const flagship = calculations.find((c) => c.id === "claude-opus-5") || mostExpensive
    const diff = flagship.total - hybridCost
    const pct = ((diff / flagship.total) * 100).toFixed(0)
    return { diff, pct }
  }, [calculations, hybridCost, mostExpensive])

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl md:p-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2 text-emerald-400">
              <Calculator className="h-5 w-5" />
            </div>
            <span className="font-mono text-xs uppercase tracking-wider text-emerald-400">Interactive Model ROI Engine</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Cost-to-Outcome Calculator</h2>
          <p className="mt-1 max-w-2xl text-sm text-white/60">
            Model intelligence pricing varies up to 40x between tiers. Simulate monthly token spend across frontier models
            and evaluate hybrid routing savings.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                setInputM(p.inTokens)
                setOutputM(p.outTokens)
              }}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-300"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 rounded-2xl border border-white/5 bg-black/40 p-6 md:grid-cols-2">
        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="font-medium text-white/80">Monthly Prompt Input Tokens</span>
            <span className="font-mono font-bold text-emerald-400">{inputM} Million</span>
          </div>
          <input
            type="range"
            min={1}
            max={100}
            step={1}
            value={inputM}
            onChange={(e) => setInputM(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-emerald-400"
          />
          <div className="mt-2 flex justify-between text-[11px] text-white/40">
            <span>1M (Light)</span>
            <span>25M</span>
            <span>50M</span>
            <span>100M (Heavy)</span>
          </div>
        </div>

        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="font-medium text-white/80">Monthly Generated Output Tokens</span>
            <span className="font-mono font-bold text-cyan-400">{outputM} Million</span>
          </div>
          <input
            type="range"
            min={0.2}
            max={20}
            step={0.2}
            value={outputM}
            onChange={(e) => setOutputM(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-cyan-400"
          />
          <div className="mt-2 flex justify-between text-[11px] text-white/40">
            <span>0.2M</span>
            <span>5M</span>
            <span>10M</span>
            <span>20M (Heavy Agentic)</span>
          </div>
        </div>
      </div>

      <div className="mb-8 overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-cyan-950/20 to-black p-5">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-emerald-400/40 bg-emerald-400/20 p-2.5 text-emerald-300">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-emerald-400">Architect Dynamic Routing Strategy</p>
              <h3 className="text-base font-bold text-white">
                Hybrid 80/20 Architecture: <span className="text-emerald-300">${hybridCost.toFixed(2)}/mo</span>
              </h3>
              <p className="text-xs text-white/60">
                Route 80% volume to Fast-Path (Gemini 3.7 Flash) + 20% to Deep-Reason (Claude Opus 5). Saves{" "}
                <strong className="text-emerald-400">${hybridSavingsVsFlagship.diff.toFixed(2)}/mo ({hybridSavingsVsFlagship.pct}%)</strong> vs 100% flagship.
              </p>
            </div>
          </div>
          <div className="shrink-0 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-center">
            <div className="text-xs text-white/60">Estimated Blended ROI</div>
            <div className="font-mono text-lg font-bold text-emerald-300">Save {hybridSavingsVsFlagship.pct}%</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {calculations.map((model, idx) => {
          const isCheapest = idx === 0
          return (
            <motion.div
              key={model.id}
              layout
              className={`flex flex-col justify-between rounded-2xl border p-4 transition-all ${
                isCheapest
                  ? "border-emerald-500/50 bg-emerald-500/[0.05] ring-1 ring-emerald-500/30"
                  : "border-white/10 bg-white/[0.01] hover:border-white/20"
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-white">{model.name}</h4>
                    <p className="text-xs text-white/40">{model.org}</p>
                  </div>
                  {isCheapest && (
                    <span className="rounded-full border border-emerald-500/40 bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                      Lowest Cost
                    </span>
                  )}
                </div>

                <p className="my-3 text-xs leading-relaxed text-white/60">{model.note}</p>
              </div>

              <div className="mt-2 border-t border-white/5 pt-3">
                <div className="mb-1 flex items-baseline justify-between">
                  <span className="text-xs text-white/50">Estimated Monthly:</span>
                  <span className="font-mono text-xl font-bold text-white">
                    ${model.total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-white/40">
                  <span>In: ${model.inputCost.toFixed(2)}</span>
                  <span>Out: ${model.outputCost.toFixed(2)}</span>
                  <span>Speed: {model.tps}</span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
