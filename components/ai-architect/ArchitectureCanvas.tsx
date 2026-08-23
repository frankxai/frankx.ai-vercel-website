'use client'

import { useState } from 'react'

import {
  failureModes,
  referenceStack,
  shapeChoices,
} from '@/components/ai-architecture/pillar/guide-data'
import { trackEvent } from '@/lib/analytics'

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-void'

/**
 * ArchitectureCanvas — the two decisions that move the seams.
 *
 * Pure and deterministic: two radio groups in, the same seven planes out with a
 * different set of them under pressure. No network, no timers, no randomness, and
 * the initial state is a constant, so the server render and the first client
 * render are identical.
 *
 * Everything the canvas asserts is read from `guide-data.ts` — the planes, their
 * boundaries, each shape's cost and failure, and the named failure mode. The only
 * thing authored here is the mapping from a shape to the planes its failure lands
 * on, and each entry says why.
 */

/** Long-run home. These three strings are the repo's runtime vocabulary; the
 *  contract script pins the same set against the architecture catalog. */
const RUNTIMES = [
  {
    id: 'Request-scoped',
    constraint:
      'The process ends when the response does. A loop whose length you cannot bound does not belong here.',
  },
  {
    id: 'Durable runtime',
    constraint:
      'The process outlives the request, so the exit condition has to live in code and the budget has to be per run.',
  },
  {
    id: 'Managed service',
    constraint:
      'Someone else owns the wall clock. You inherit their limits, and the swap cost lands on the model plane.',
  },
] as const

type RuntimeId = (typeof RUNTIMES)[number]['id']

/**
 * Shape → the planes its characteristic failure shows up in, and the failure mode
 * from `failureModes` that describes it. `mode` is null for the one shape whose
 * cost is latency rather than a correctness failure: there is no row for it, and
 * inventing one would be the opposite of the point.
 */
const SHAPE_PRESSURE: Record<
  string,
  { planes: string[]; mode: string | null; why: string }
> = {
  'Fixed workflow': {
    planes: ['evaluation', 'orchestration'],
    mode: 'Evals pass, production regresses',
    why: 'A graph that no longer matches reality still produces an answer, and a suite that grades answers cannot see the drift.',
  },
  'Single agent loop': {
    planes: ['context', 'orchestration', 'observability'],
    mode: 'Answers degrade as the conversation grows',
    why: 'The loop writes its own context. What it decided early falls out of the window it filled.',
  },
  'Parallel sub-agents': {
    planes: ['orchestration', 'observability', 'model'],
    mode: 'Costs move without a deploy',
    why: 'Fan-out multiplies calls before it multiplies answers, and the spend line is where you notice.',
  },
  'Sequential sub-agents': {
    planes: ['orchestration', 'experience'],
    mode: null,
    why: 'You bought correctness with throughput. Someone is waiting, and the experience plane is where they wait.',
  },
}

export default function ArchitectureCanvas() {
  const [shape, setShape] = useState<string>(shapeChoices[0].shape)
  const [runtime, setRuntime] = useState<RuntimeId>(RUNTIMES[0].id)

  const choice = shapeChoices.find((item) => item.shape === shape) ?? shapeChoices[0]
  const pressure = SHAPE_PRESSURE[choice.shape]
  const mode = pressure.mode
    ? failureModes.find((item) => item.name === pressure.mode)
    : undefined
  const home = RUNTIMES.find((item) => item.id === runtime) ?? RUNTIMES[0]

  /** The one combination the two controls can produce that is a mistake on its
   *  own terms: an unbounded shape with nowhere to run long. */
  const unbounded = choice.shape !== 'Fixed workflow' && runtime === 'Request-scoped'

  function select(nextShape: string, nextRuntime: RuntimeId) {
    setShape(nextShape)
    setRuntime(nextRuntime)
    trackEvent('ai_architect_canvas_shape_selected', {
      shape: nextShape,
      runtime: nextRuntime,
    })
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
      <div className="space-y-10 lg:sticky lg:top-28 lg:self-start">
        <fieldset>
          <legend className="font-mono text-xs uppercase tracking-wider text-white/50">
            Orchestration shape
          </legend>
          <div className="mt-4 space-y-2.5">
            {shapeChoices.map((item) => {
              const selected = item.shape === shape
              return (
                <label
                  key={item.shape}
                  className={`flex cursor-pointer items-baseline gap-3 border-l py-1.5 pl-4 transition-colors ${
                    selected
                      ? 'border-emerald-400 text-white'
                      : 'border-white/10 text-slate-400 hover:border-white/30 hover:text-slate-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="orchestration-shape"
                    value={item.shape}
                    checked={selected}
                    onChange={() => select(item.shape, runtime)}
                    className={`h-3 w-3 shrink-0 accent-emerald-400 ${FOCUS_RING}`}
                  />
                  <span className="text-sm leading-6">{item.shape}</span>
                </label>
              )
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-mono text-xs uppercase tracking-wider text-white/50">
            Long-run home
          </legend>
          <div className="mt-4 space-y-2.5">
            {RUNTIMES.map((item) => {
              const selected = item.id === runtime
              return (
                <label
                  key={item.id}
                  className={`flex cursor-pointer items-baseline gap-3 border-l py-1.5 pl-4 transition-colors ${
                    selected
                      ? 'border-cyan-400 text-white'
                      : 'border-white/10 text-slate-400 hover:border-white/30 hover:text-slate-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="long-run-home"
                    value={item.id}
                    checked={selected}
                    onChange={() => select(shape, item.id)}
                    className={`h-3 w-3 shrink-0 accent-cyan-400 ${FOCUS_RING}`}
                  />
                  <span className="text-sm leading-6">{item.id}</span>
                </label>
              )
            })}
          </div>
        </fieldset>

        <div aria-live="polite" className="space-y-4 border-t border-white/10 pt-8">
          <p className="leading-7 text-slate-200">
            {choice.cost} {choice.failure}
          </p>
          <p className="text-sm leading-6 text-slate-400">{home.constraint}</p>
          {unbounded ? (
            <p className="text-sm leading-6 text-cyan-300">
              This pair is the seam that goes first: {choice.shape.toLowerCase()} has no length you
              can name before the request arrives, and {home.id.toLowerCase()} is a home that ends
              when the response does.
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <ol
          className="space-y-0"
          aria-label="The seven planes, with the ones under pressure from the chosen shape marked"
        >
          {referenceStack.map((plane) => {
            const under = pressure.planes.includes(plane.id)
            return (
              <li
                key={plane.id}
                className={`border-l py-5 pl-5 transition-colors sm:pl-6 ${
                  under ? 'border-emerald-400/70' : 'border-white/10'
                }`}
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span
                    className={`font-mono text-xs ${under ? 'text-emerald-300' : 'text-slate-500'}`}
                  >
                    {plane.index}
                  </span>
                  <h3 className={`font-semibold ${under ? 'text-white' : 'text-slate-400'}`}>
                    {plane.name}
                  </h3>
                  {under ? (
                    <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-300/80">
                      Under pressure
                    </span>
                  ) : null}
                </div>
                <p
                  className={`mt-2 max-w-xl text-sm leading-6 ${
                    under ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  {plane.role}
                </p>
                <p className="mt-2 max-w-xl font-mono text-xs leading-6 text-slate-500">
                  {plane.boundary}
                </p>
              </li>
            )
          })}
        </ol>

        <div className="mt-10 border-t border-white/10 pt-8">
          <p className="font-mono text-xs uppercase tracking-wider text-white/50">
            Why those planes
          </p>
          <p className="mt-3 max-w-xl leading-7 text-slate-300">{pressure.why}</p>
          {mode ? (
            <div className="mt-6 max-w-xl space-y-2">
              <p className="text-sm leading-6 text-slate-200">{mode.name}</p>
              <p className="text-sm leading-6 text-slate-500">{mode.actualCause}</p>
              <p className="text-sm leading-6 text-slate-400">{mode.fix}</p>
            </div>
          ) : (
            <p className="mt-6 max-w-xl text-sm leading-6 text-slate-500">
              No named failure mode. The cost here is latency, and latency is a decision you took on
              purpose rather than a fault you have to find.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
