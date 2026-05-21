'use client'

import { useState } from 'react'

type Props = {
  text: string
  label?: string
}

/**
 * Small client island for clipboard copy.
 *
 * Renders inside the otherwise server-rendered pattern detail page.
 * No icons, no animations — visual feedback is a brief "Copied" label swap.
 */
export function CopyButton({ text, label = 'Copy' }: Props) {
  const [state, setState] = useState<'idle' | 'copied' | 'error'>('idle')

  async function onClick() {
    try {
      await navigator.clipboard.writeText(text)
      setState('copied')
      setTimeout(() => setState('idle'), 1500)
    } catch {
      setState('error')
      setTimeout(() => setState('idle'), 1500)
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300 transition hover:bg-emerald-500/20"
    >
      {state === 'copied' ? 'Copied' : state === 'error' ? 'Copy failed' : label}
    </button>
  )
}
