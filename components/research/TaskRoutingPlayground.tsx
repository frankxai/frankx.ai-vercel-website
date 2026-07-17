'use client'

import { useState } from 'react'
import { Check, Copy, Terminal, Play, Cpu, ArrowRight } from 'lucide-react'

interface ConstraintOption {
  id: string
  label: string
  description: string
}

const CONSTRAINTS: ConstraintOption[] = [
  {
    id: 'strict-format',
    label: 'Strict Constraints & Formatting',
    description: 'Requires strict compliance with word caps, lowercase rules, or custom JSON structures without leaking reasoning/deliberation.'
  },
  {
    id: 'governance-pushback',
    label: 'Policy Boundaries & Pushback',
    description: 'Task involves checking permission boundaries, safety policies, or flagging self-contradictory specifications.'
  },
  {
    id: 'complex-code',
    label: 'Complex Architectural Code',
    description: 'Building custom parsers, major refactoring, and multi-file agentic code generation requiring recursive debug passes.'
  },
  {
    id: 'cost-volume',
    label: 'High Volume & Budget Gated',
    description: 'Running hundreds of parallel requests or high-frequency tasks where cost per token dictates the margins.'
  }
]

export function TaskRoutingPlayground() {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'typescript' | 'python' | 'json'>('typescript')

  const toggleId = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  // Calculate routing logic based on selected dimensions
  const getRecommendation = () => {
    if (selectedIds.length === 0) {
      return {
        model: 'Dynamic Router Mode',
        reason: 'Select one or more constraints to trigger routing recommendation.',
        tier: 'Select standard options',
        color: 'text-zinc-400',
        borderColor: 'border-white/10',
        bg: 'bg-white/[0.02]',
        modelId: 'dynamic-router'
      }
    }

    const hasStrict = selectedIds.includes('strict-format')
    const hasPushback = selectedIds.includes('governance-pushback')
    const hasComplex = selectedIds.includes('complex-code')
    const hasCost = selectedIds.includes('cost-volume')

    // Scenario: High Volume + Standard Coding
    if (hasCost && !hasPushback && !hasComplex && !hasStrict) {
      return {
        model: 'Claude Haiku 4.5',
        reason: 'Saturated capability task class. Haiku matches Opus on standard coding and grounding while running at a fraction of the cost.',
        tier: 'Haiku (Low Cost, High Speed)',
        color: 'text-emerald-400',
        borderColor: 'border-emerald-500/20',
        bg: 'bg-emerald-500/5',
        modelId: 'claude-haiku-4-5'
      }
    }

    // Scenario: Governance and pushback needed (even with other constraints)
    if (hasPushback) {
      return {
        model: 'Claude Opus 4.8',
        reason: 'Flagged an unauthorized workspace edit and pointed out contradiction bugs in Round 2. High situational judgment.',
        tier: 'Opus (Highest Reasoning)',
        color: 'text-amber-400',
        borderColor: 'border-amber-500/20',
        bg: 'bg-amber-500/5',
        modelId: 'claude-opus-4-8'
      }
    }

    // Scenario: Strict formatting pipeline work
    if (hasStrict) {
      return {
        model: 'Claude Fable 5',
        reason: 'Completed 7/7 constraint stacks and formatting caps cleanly in all rounds. Opus leaked reasoning logs and failed length caps.',
        tier: 'Fable (High Constraint Precision)',
        color: 'text-purple-400',
        borderColor: 'border-purple-500/20',
        bg: 'bg-purple-500/5',
        modelId: 'claude-fable-5'
      }
    }

    // Default complex task without specific formatting or pushback requirements
    return {
      model: 'Claude Sonnet 5',
      reason: 'Shipped 2026-06-30. Closes most of the gap to Opus 4.8 on agentic and knowledge work at roughly 40% of the price — the default worth trying first for production agent loops.',
      tier: 'Sonnet 5 (Balanced Production Driver)',
      color: 'text-cyan-400',
      borderColor: 'border-cyan-500/20',
      bg: 'bg-cyan-500/5',
      modelId: 'claude-sonnet-5'
    }
  }

  const recommendation = getRecommendation()

  // Generate code snippets dynamically based on the selected modelId
  const getCodeSnippet = () => {
    const model = recommendation.modelId

    const typescript = `import { ACOS_Router } from '@acos/router';

// Initialize ACOS Dynamic Router loaded from /llm-hub.json
const router = new ACOS_Router({
  env: 'production',
  failover: true
});

// Route task dynamically based on constraint requirements
const task = {
  prompt: "Synthesize weekly content and emit output strictly as standard JSON",
  constraints: ${JSON.stringify(selectedIds)}
};

const result = await router.execute({
  task,
  // Dynamic resolver picks ${recommendation.model} based on constraints
  fallbackModel: 'claude-sonnet-5'
});

console.log(\`Routed to \${result.model} | Status: \${result.status}\`);`

    const python = `from acos.router import AcosRouter

# Initialize router using live telemetry weights
router = AcosRouter(
    registry_url="https://frankx.ai/llm-hub.json",
    cache_ttl=3600
)

# Route dynamically by constraint stack
task = {
    "prompt": "Evaluate code structure and push back on invalid specs",
    "constraints": ${JSON.stringify(selectedIds)}
}

response = router.execute(
    task=task,
    default_model="${model}"
)

print(f"Dynamically routed to: {response.model_name}")`

    const json = `{
  "routing_rule": "starlight-proving-ground-v0.1",
  "active_constraints": ${JSON.stringify(selectedIds)},
  "resolution": {
    "target_model": "${model}",
    "reasoning": "${recommendation.reason}",
    "fallback_model": "claude-sonnet-5"
  }
}`

    if (activeTab === 'typescript') return typescript
    if (activeTab === 'python') return python
    return json
  }

  const copyCode = () => {
    const text = getCodeSnippet()
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText('Copied!')
      setTimeout(() => setCopiedText(null), 2000)
    })
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] bg-slate-950/40 border border-white/5 p-6 rounded-3xl backdrop-blur-md">
      {/* Selector side */}
      <div>
        <div className="mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive Simulator</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-1">Pick Your Task Constraints</h3>
          <p className="text-xs text-white/50">Select what your agent or pipeline demands. The simulator dynamically queries the proving ground receipts to calculate the optimal route.</p>
        </div>

        <div className="space-y-3">
          {CONSTRAINTS.map((option) => {
            const isSelected = selectedIds.includes(option.id)
            return (
              <button
                key={option.id}
                onClick={() => toggleId(option.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                  isSelected
                    ? 'bg-white/[0.04] border-white/20 shadow-md'
                    : 'bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-white border-white text-black' : 'border-white/30 text-transparent'
                  }`}>
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-white/95">{option.label}</div>
                    <div className="text-xs text-white/40 leading-relaxed mt-0.5">{option.description}</div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Code / Routing Output */}
      <div className="flex flex-col border border-white/10 bg-slate-950 rounded-2xl overflow-hidden shadow-inner">
        {/* Dynamic Recommendation banner */}
        <div className={`p-5 border-b border-white/5 transition-all ${recommendation.borderColor} ${recommendation.bg}`}>
          <div className="text-xs text-white/40 font-mono uppercase tracking-wider mb-1">PROVING GROUND RESOLUTION</div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className={`text-xl font-bold ${recommendation.color}`}>{recommendation.model}</span>
            <span className="text-[10px] text-white/40 font-mono">({recommendation.tier})</span>
          </div>
          <p className="text-xs text-white/60 leading-relaxed">{recommendation.reason}</p>
        </div>

        {/* Code tab header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/60 border-b border-white/5 text-xs">
          <div className="flex items-center gap-1.5 text-white/50">
            <Terminal className="w-3.5 h-3.5" />
            <span>dynamic-router-integration</span>
          </div>
          <div className="flex gap-2">
            {(['typescript', 'python', 'json'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2 py-0.5 rounded capitalize font-mono text-[10px] transition-colors ${
                  activeTab === tab ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Code viewer */}
        <div className="relative flex-1 p-4 font-mono text-[11px] text-zinc-300 leading-relaxed overflow-x-auto whitespace-pre bg-slate-950 min-h-[220px]">
          {getCodeSnippet()}

          {/* Copy Button */}
          <button
            onClick={copyCode}
            className="absolute top-3 right-3 p-1.5 rounded-md bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 text-white/50 hover:text-white transition-all flex items-center gap-1 text-[10px]"
            title="Copy Code"
          >
            {copiedText ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">{copiedText}</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Client Usage Info */}
        <div className="p-4 bg-slate-900/40 border-t border-white/5 flex items-center justify-between text-xs text-white/45">
          <span>Target endpoints synced automatically hourly</span>
          <a 
            href="/llm-hub.json"
            className="inline-flex items-center gap-1 text-[#a855f7] hover:underline"
          >
            /llm-hub.json
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  )
}
