'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, Users, Loader2, Settings, Play, ExternalLink, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { ApiKeyManager, useAllApiKeys } from '@/components/ai-architecture/ApiKeyManager'
import { AI_PROVIDER_META } from '@/types/ai-architecture'
import type { AIProvider } from '@/types/ai-architecture'
import { streamByokChat } from '@/lib/ai-architecture/byok-stream'

const AGENT_PROVIDERS: AIProvider[] = ['anthropic', 'openai', 'google']
const MAX_STEPS = 5

interface TraceStep {
  n: number
  title: string
  output: string
  done: boolean
}

function parsePlan(text: string): string[] {
  return text
    .split('\n')
    .map((l) => l.replace(/^\s*[-*\d.)]+\s*/, '').trim())
    .filter((l) => l.length > 3)
    .slice(0, MAX_STEPS)
}

export default function AgentSimulatorPage() {
  const [task, setTask] = useState('Plan a launch checklist for a new AI architecture blog post.')
  const [plan, setPlan] = useState<string[]>([])
  const [steps, setSteps] = useState<TraceStep[]>([])
  const [summary, setSummary] = useState('')
  const [phase, setPhase] = useState<'idle' | 'planning' | 'executing' | 'synthesizing' | 'done'>('idle')
  const [error, setError] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [provider, setProvider] = useState<AIProvider>('anthropic')

  const { keys, isLoaded } = useAllApiKeys()
  const availableProviders = AGENT_PROVIDERS.filter((p) => keys[p])
  const hasKey = availableProviders.length > 0
  const activeProvider = availableProviders.includes(provider) ? provider : availableProviders[0]
  const isRunning = phase === 'planning' || phase === 'executing' || phase === 'synthesizing'

  const run = async () => {
    const apiKey = activeProvider ? keys[activeProvider] : null
    if (!task.trim() || !apiKey || isRunning) return

    setError('')
    setPlan([])
    setSteps([])
    setSummary('')

    const call = (messages: { role: 'system' | 'user' | 'assistant'; content: string }[], onDelta?: (t: string) => void) =>
      streamByokChat({ provider: activeProvider!, apiKey, messages, onDelta })

    try {
      // 1. Plan
      setPhase('planning')
      const planText = await call([
        { role: 'system', content: `You are an orchestrator. Decompose the task into at most ${MAX_STEPS} concrete sub-tasks, one per line, no preamble. Each line is a single actionable step.` },
        { role: 'user', content: task.trim() },
      ])
      const planList = parsePlan(planText)
      if (planList.length === 0) {
        throw new Error('The orchestrator did not return a usable plan. Try rephrasing the task.')
      }
      setPlan(planList)

      // 2. Execute each step (worker handoff)
      setPhase('executing')
      const completed: TraceStep[] = []
      for (let i = 0; i < planList.length; i++) {
        const step: TraceStep = { n: i + 1, title: planList[i], output: '', done: false }
        completed.push(step)
        setSteps([...completed])
        const prior = completed
          .slice(0, i)
          .map((s) => `Step ${s.n} (${s.title}): ${s.output}`)
          .join('\n')
        await call(
          [
            { role: 'system', content: 'You are a worker agent executing one step of a larger plan. Be concise and concrete. Output only the result of this step.' },
            { role: 'user', content: `Overall task: ${task.trim()}\n\nDone so far:\n${prior || '(nothing yet)'}\n\nNow do step ${i + 1}: ${planList[i]}` },
          ],
          (t) => {
            step.output += t
            setSteps([...completed])
          },
        )
        step.done = true
        setSteps([...completed])
      }

      // 3. Synthesize
      setPhase('synthesizing')
      const transcript = completed.map((s) => `Step ${s.n} (${s.title}): ${s.output}`).join('\n\n')
      await call(
        [
          { role: 'system', content: 'You are the orchestrator. Synthesize the worker outputs into a single, clean final result for the user.' },
          { role: 'user', content: `Task: ${task.trim()}\n\nWorker outputs:\n${transcript}\n\nProduce the final deliverable.` },
        ],
        (t) => setSummary((prev) => prev + t),
      )
      setPhase('done')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
      setPhase('idle')
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#0a0a0b]">
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/[0.06] bg-[#0a0a0b]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <Link
              href="/ai-architecture/prototypes"
              className="flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Link>
            <div className="h-5 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/15">
                <Users className="h-4 w-4 text-cyan-400" />
              </div>
              <h1 className="text-sm font-semibold text-white">Agent Simulator</h1>
              <span className="hidden sm:inline-flex rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/25">
                BYOK
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`rounded-lg p-2 transition-all ${showSettings ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/[0.06] hover:text-white'}`}
            aria-label="Toggle settings"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 pt-[57px]">
        <div className="mx-auto w-full max-w-3xl flex-1 space-y-6 p-6">
          {!hasKey && isLoaded ? (
            <div className="py-16 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                <Users className="h-7 w-7 text-slate-500" />
              </div>
              <h2 className="mb-2 text-xl font-bold text-white">Add an API key to start</h2>
              <p className="mb-6 mx-auto max-w-sm text-sm text-slate-400">
                Give the orchestrator a task and watch it decompose, run each step, and synthesize a
                result. Keys stay in your browser.
              </p>
              <button
                onClick={() => setShowSettings(true)}
                className="rounded-full bg-cyan-500 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-cyan-400"
              >
                Open Settings
              </button>
            </div>
          ) : (
            <>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && run()}
                  placeholder="Give the agent a task..."
                  className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500/40 focus:outline-none"
                />
                <button
                  onClick={run}
                  disabled={isRunning || !task.trim()}
                  className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-medium text-white transition-all hover:bg-cyan-400 disabled:opacity-50"
                >
                  {isRunning ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                  Run
                </button>
              </div>

              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-300">
                  {error}
                </div>
              )}

              {/* Plan */}
              {plan.length > 0 && (
                <div className="rounded-xl border border-violet-500/20 bg-violet-500/[0.04] p-4">
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-violet-300">
                    Orchestrator plan {phase === 'planning' && '· planning…'}
                  </h3>
                  <ol className="space-y-1 text-sm text-slate-300">
                    {plan.map((p, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="font-bold text-violet-400">{i + 1}.</span>
                        {p}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Execution trace */}
              {steps.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Execution trace
                  </h3>
                  {steps.map((s) => (
                    <div
                      key={s.n}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4"
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/20 text-xs font-bold text-cyan-400">
                          {s.n}
                        </span>
                        <span className="text-sm font-medium text-white">{s.title}</span>
                        {s.done ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <Loader2 className="h-4 w-4 animate-spin text-slate-500" />
                        )}
                      </div>
                      <p className="whitespace-pre-wrap pl-8 text-sm leading-relaxed text-slate-400">
                        {s.output || '…'}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Final */}
              {summary && (
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-4">
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-300">
                    Final result {phase === 'synthesizing' && '· synthesizing…'}
                  </h3>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-200">{summary}</p>
                </div>
              )}

              <p className="text-center text-[11px] text-slate-600">
                Orchestrator → workers → synthesis, client-driven over your key. Production agents add
                real tools and durable steps —{' '}
                <Link href="/ai-architecture/templates" className="text-cyan-400 hover:underline">
                  see the multi-agent starter
                </Link>
                .
              </p>
            </>
          )}
        </div>

        {/* Settings */}
        <AnimatePresence>
          {showSettings && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 380, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-l border-white/[0.06] bg-[#0a0a0f] overflow-hidden"
            >
              <div className="h-full overflow-y-auto p-6" style={{ width: 380 }}>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-base font-bold text-white">Settings</h2>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-white/[0.06] hover:text-white"
                    aria-label="Close settings"
                  >
                    <ChevronLeft className="h-4 w-4 rotate-180" />
                  </button>
                </div>
                <ApiKeyManager providers={AGENT_PROVIDERS} onKeyChange={() => {}} />
                {hasKey && (
                  <div className="mt-6">
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                      Provider
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {availableProviders.map((p) => (
                        <button
                          key={p}
                          onClick={() => setProvider(p)}
                          className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                            activeProvider === p
                              ? 'border-cyan-500/50 bg-cyan-500/15 text-cyan-400'
                              : 'border-white/15 text-slate-400 hover:text-white'
                          }`}
                        >
                          {AI_PROVIDER_META[p].shortName}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
