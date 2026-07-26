'use client'

import { useMemo, useState } from 'react'
import { CopyButton } from '@/components/prompt-library/CopyButton'
import {
  vibeStateCategoryLabels,
  vibeStates,
  type VibeState,
} from '@/data/vibe-states'

/**
 * Interactive picker over the full 25-state Vibe OS library (data ported to
 * data/vibe-states.ts). Pick a state, see its BPM/key/instrumentation, copy
 * the ready-made Suno style prompt. Pure client state — no backend.
 */
export function VibeStatePicker() {
  const [selectedId, setSelectedId] = useState<string>(vibeStates[0].id)

  const selected: VibeState = useMemo(
    () => vibeStates.find((state) => state.id === selectedId) ?? vibeStates[0],
    [selectedId]
  )

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
      {/* State grid */}
      <div>
        <label htmlFor="vibe-state-select" className="sr-only">
          Choose a vibe state
        </label>
        <select
          id="vibe-state-select"
          value={selectedId}
          onChange={(event) => setSelectedId(event.target.value)}
          className="mb-4 w-full rounded-md border border-white/10 bg-[#111113] px-4 py-3 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-emerald-500/60 lg:hidden"
        >
          {vibeStates.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name} — {vibeStateCategoryLabels[state.category]}
            </option>
          ))}
        </select>

        <div className="hidden max-h-[420px] grid-cols-2 gap-2 overflow-y-auto pr-1 lg:grid">
          {vibeStates.map((state) => {
            const isActive = state.id === selectedId
            return (
              <button
                key={state.id}
                type="button"
                onClick={() => setSelectedId(state.id)}
                aria-pressed={isActive}
                className={`rounded-lg border p-3 text-left transition-colors ${
                  isActive
                    ? 'border-emerald-500/50 bg-emerald-500/10'
                    : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04]'
                }`}
              >
                <span
                  className={`block text-sm font-medium ${isActive ? 'text-emerald-300' : 'text-white'}`}
                >
                  {state.name}
                </span>
                <span className="mt-0.5 block font-mono text-[11px] text-white/40">
                  {state.optimalBpm} BPM · {state.key}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Detail panel */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-6">
        <div className="mb-1 flex items-center gap-2">
          <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
            {vibeStateCategoryLabels[selected.category]}
          </span>
        </div>
        <h3 className="mb-2 text-xl font-semibold text-white">{selected.name}</h3>
        <p className="mb-5 text-sm leading-relaxed text-white/60">{selected.description}</p>

        <dl className="mb-5 grid grid-cols-2 gap-4 border-y border-white/[0.06] py-4 text-sm sm:grid-cols-4">
          <div>
            <dt className="mb-1 text-[11px] uppercase tracking-wider text-white/40">BPM range</dt>
            <dd className="font-mono text-white/80">
              {selected.bpmRange[0]}–{selected.bpmRange[1]}
            </dd>
          </div>
          <div>
            <dt className="mb-1 text-[11px] uppercase tracking-wider text-white/40">Key</dt>
            <dd className="font-mono text-white/80">{selected.key}</dd>
          </div>
          <div>
            <dt className="mb-1 text-[11px] uppercase tracking-wider text-white/40">Timbre</dt>
            <dd className="font-mono text-white/80">{selected.timbre}</dd>
          </div>
          <div>
            <dt className="mb-1 text-[11px] uppercase tracking-wider text-white/40">Energy</dt>
            <dd className="font-mono text-white/80">{selected.energy}</dd>
          </div>
        </dl>

        <p className="mb-2 text-[11px] uppercase tracking-wider text-white/40">Instrumentation</p>
        <div className="mb-5 flex flex-wrap gap-1.5">
          {selected.instruments.map((instrument) => (
            <span
              key={instrument}
              className="rounded-full bg-white/[0.05] px-2.5 py-0.5 text-xs text-white/60"
            >
              {instrument}
            </span>
          ))}
        </div>

        <p className="mb-2 text-[11px] uppercase tracking-wider text-white/40">
          Suno style prompt
        </p>
        <pre className="mb-3 overflow-x-auto whitespace-pre-wrap rounded-lg border border-white/[0.06] bg-black/40 p-4">
          <code className="font-mono text-xs leading-relaxed text-emerald-200/90">
            {selected.sunoPrompt}
          </code>
        </pre>
        <CopyButton text={selected.sunoPrompt} label="Copy prompt" />
      </div>
    </div>
  )
}
