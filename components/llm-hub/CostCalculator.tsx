"use client"

import React, { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Calculator, Sparkles } from "lucide-react"

import type { ModelRow } from '@/lib/llm-hub/rows'
import { tokenCost } from '@/lib/llm-hub/pricing'

const CALCULATOR_IDS = new Set([
  'gpt-6-astra', 'deepseek-v4-pro-0813', 'gemini-3-7-flash',
  'claude-sonnet-5', 'grok-4-6', 'claude-opus-5', 'claude-fable-5',
])

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

export function CostCalculator({ rows }: { rows: ModelRow[] }) {
  const [inputM, setInputM] = useState<number>(10)
  const [outputM, setOutputM] = useState<number>(2)

  const calculations = useMemo(() => {
    return rows.filter(m => CALCULATOR_IDS.has(m.id)).flatMap(m => {
      const total = tokenCost(m.input, m.output, inputM, outputM)
      if (total === null || m.input === null || m.output === null) return []
      return [{
        ...m,
        note: `${m.live ? 'OpenRouter catalog' : 'Registry'} · USD per million tokens. ${m.pricing.scope}`,
        inputCost: inputM * m.input,
        outputCost: outputM * m.output,
        total,
      }]
    }).sort((a, b) => a.total - b.total)
  }, [inputM, outputM, rows])


  const hybrid = useMemo(() => {
    const fast = calculations.find(c => c.id === 'gemini-3-7-flash')
    const deep = calculations.find(c => c.id === 'claude-opus-5')
    if (!fast || !deep) return null
    const total = fast.total * 0.8 + deep.total * 0.2
    const diff = deep.total - total
    return { total, diff, pct: deep.total > 0 ? ((diff / deep.total) * 100).toFixed(0) : '0' }
  }, [calculations])

  if (!calculations.length) return <p>No token-price estimates are available. Check provider pricing before budgeting.</p>

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl md:p-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2 text-emerald-400">
              <Calculator className="h-5 w-5" />
            </div>
            <span className="font-mono text-xs uppercase tracking-wider text-emerald-400">Token spending estimate</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Monthly token-cost calculator</h2>
          <p className="mt-1 max-w-2xl text-sm text-white/60">
            Estimate standard short-context token spending. This example excludes retries, tools, cache creation and review time; it does not measure ROI or execution quality.
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
            aria-label="Monthly prompt input tokens in millions"
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
            aria-label="Monthly generated output tokens in millions"
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

      {hybrid && <div className="mb-8 overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-cyan-950/20 to-black p-5">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-emerald-400/40 bg-emerald-400/20 p-2.5 text-emerald-300">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-emerald-400">Illustrative token allocation</p>
              <h3 className="text-base font-bold text-white">
                Hybrid 80/20 Architecture: <span className="text-emerald-300">${hybrid.total.toFixed(2)}/mo</span>
              </h3>
              <p className="text-xs text-white/60">
                Illustrative split: 80% of input and output tokens to Fast-Path (Gemini 3.7 Flash) + 20% to Deep-Reason (Claude Opus 5). Saves{" "}
                <strong className="text-emerald-400">${hybrid.diff.toFixed(2)}/mo ({hybrid.pct}%)</strong> vs 100% flagship.
              </p>
            </div>
          </div>
          <div className="shrink-0 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-center">
            <div className="text-xs text-white/60">Estimated token-cost reduction</div>
            <div className="font-mono text-lg font-bold text-emerald-300">Save {hybrid.pct}%</div>
          </div>
        </div>
      </div>}

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {calculations.map((model, idx) => {
          const isCheapest = idx === 0
          return (
            <motion.div
              key={model.id}
              layout
              className={`flex flex-col justify-between rounded-2xl border p-4 transition-colors ${
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
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
