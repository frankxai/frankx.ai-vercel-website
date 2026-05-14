'use client'

import { PromptCard } from './PromptCard'
import type { WorkshopPrompt } from '@/lib/workshop-prompts'

interface PromptStackProps {
  /** Filter prompts to a specific module */
  module: number
  /** All prompts — pass WORKSHOP_PROMPTS */
  prompts: WorkshopPrompt[]
  /** Optional eyebrow above the stack */
  label?: string
}

/**
 * Renders all WorkshopPrompts for a given module, stacked vertically.
 * Used inside each module section on the main workshop page.
 */
export function PromptStack({ module, prompts, label }: PromptStackProps) {
  const moduleP = prompts.filter((p) => p.module === module)
  if (moduleP.length === 0) return null

  return (
    <div className="space-y-4">
      {label && (
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-300 flex items-center gap-2">
          <span>{label}</span>
          <span className="text-zinc-700">·</span>
          <span className="text-zinc-500 normal-case tracking-normal font-normal">
            {moduleP.length} prompt{moduleP.length > 1 ? 's' : ''}
          </span>
        </p>
      )}
      <div className="space-y-4">
        {moduleP.map((p) => (
          <PromptCard key={p.id} prompt={p} />
        ))}
      </div>
    </div>
  )
}
