'use client'

import { Target, UserCircle, Layers3, ArrowRightCircle } from 'lucide-react'
import type { IkigaiState } from './types'
import { CoachGPTCard } from './CoachGPTCard'

interface BrandingBridgeProps {
  value: IkigaiState
}

export function BrandingBridge({ value }: BrandingBridgeProps) {
  const hasStatement = value.statement.trim().length > 10

  const positioningSeed = value.statement
    ? `Here is my Ikigai statement: "${value.statement}". Help me turn it into a brand positioning sentence of the form: "I am the [category] for [audience] who [desire/problem]." Propose 3 versions, each with a different trade-off. Then tell me which one is strongest and why.`
    : 'Help me write a brand positioning sentence based on my Ikigai. Ask me about my audience, what I am for, and what I am explicitly not for.'

  const audienceSeed = value.needs
    ? `My target audience is roughly: "${value.needs}". Help me narrow this to an audience-of-one: a single real-feeling person with a name, a specific situation, and a concrete problem they are trying to solve this week.`
    : 'Help me build an audience-of-one avatar — a single specific person my brand serves. Ask me about demographics, situation, and the exact problem they are trying to solve this week.'

  const pillarsSeed = value.statement
    ? `Based on my Ikigai statement "${value.statement}" and my audience, suggest 3 content pillars I can publish on for 12 months without repeating myself. For each pillar, name it, define it in one line, and list 5 concrete example posts or artifacts.`
    : 'Help me define 3 content pillars I can publish on for 12 months without repeating myself. Ask about my audience and my expertise first.'

  return (
    <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8 space-y-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-amber-400 mb-2">
          Module 3 — Ikigai to Brand
        </p>
        <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
          The Brand Bridge
        </h3>
        <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
          Purpose without expression stays private. Use the Coach GPT on each element below — your Ikigai statement is pre-loaded into every prompt.
        </p>
      </div>

      {!hasStatement && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-4">
          <p className="text-sm text-amber-200">
            Finish your Ikigai statement above first — these bridge exercises work best when they are anchored to your statement.
          </p>
        </div>
      )}

      <div className="grid sm:grid-cols-3 gap-4">
        <BridgeCard
          icon={<Target className="w-5 h-5" />}
          title="Positioning Sentence"
          description="Who you are for. What you are not. One sentence. Force a trade-off."
          seed={positioningSeed}
        />
        <BridgeCard
          icon={<UserCircle className="w-5 h-5" />}
          title="Audience of One"
          description="A single real-feeling person. Name, situation, problem this week."
          seed={audienceSeed}
        />
        <BridgeCard
          icon={<Layers3 className="w-5 h-5" />}
          title="Three Content Pillars"
          description="12 months of publishing without repeating yourself."
          seed={pillarsSeed}
        />
      </div>

      <div className="pt-2 flex items-start gap-2 text-xs text-zinc-500">
        <ArrowRightCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
        <p>
          When you have all three, subscribe below for the Resource Pack with templates, a 30-day expression plan, and a Day-7 check-in from Frank.
        </p>
      </div>
    </div>
  )
}

function BridgeCard({
  icon,
  title,
  description,
  seed,
}: {
  icon: React.ReactNode
  title: string
  description: string
  seed: string
}) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-3 flex flex-col">
      <div className="w-9 h-9 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-300">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-base font-semibold text-white mb-1">{title}</h4>
        <p className="text-xs text-zinc-400 leading-relaxed">{description}</p>
      </div>
      <CoachGPTCard seedPrompt={seed} label="Draft with Coach" compact />
    </div>
  )
}
