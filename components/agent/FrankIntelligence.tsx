'use client'

import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import DOMPurify from 'isomorphic-dompurify'
import { marked } from 'marked'
import { useEveAgent } from 'eve/react'
import type { MessageStreamEvent, SessionState } from 'eve/client'
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Construction,
  HeartPulse,
  Music2,
  Network,
  RefreshCw,
  Send,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

const STORAGE_KEY = 'frank-intelligence-session-v1'
const MAX_PROMPT_LENGTH = 2_000
const ENGLISH_NUMBER = new Intl.NumberFormat('en-US')

interface CorpusMeta {
  version: number
  fingerprint: string
  publishedPostCount: number
  publicRouteCount: number
  recordCount: number
}

interface SavedConversation {
  events?: readonly MessageStreamEvent[]
  session?: SessionState
}

const PROMPTS = [
  'My AI stack is expensive and has no revenue. What should I cut first?',
  'What is the smallest useful agent architecture I can ship this week?',
  'Turn my creative block into a song, story, or launch experiment.',
  'My energy is unstable. Which part of my operating system should change first?',
]

function loadSavedConversation(): SavedConversation {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) as SavedConversation : {}
  } catch {
    return {}
  }
}

export function FrankIntelligence({ corpus }: { corpus: CorpusMeta }) {
  const [saved] = useState<SavedConversation>(loadSavedConversation)
  const [input, setInput] = useState('')
  const transcriptEndRef = useRef<HTMLDivElement>(null)

  const agent = useEveAgent({
    initialEvents: saved.events ?? [],
    initialSession: saved.session,
    prepareSend: (turn) => ({
      ...turn,
      clientContext: {
        route: '/agent',
        corpusFingerprint: corpus.fingerprint,
        disclosure: 'Public browser session. Do not request or repeat secrets, credentials, health records, or confidential company data.',
      },
    }),
    onFinish(snapshot) {
      try {
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
          events: snapshot.events,
          session: snapshot.session,
        }))
      } catch {
        // The active conversation still works when browser storage is unavailable.
      }
    },
  })

  const isBusy = agent.status === 'submitted' || agent.status === 'streaming'
  const messages = agent.data.messages.filter((message) => message.role === 'user' || message.role === 'assistant')
  const isEmpty = messages.length === 0

  useEffect(() => {
    if (!isEmpty) {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      transcriptEndRef.current?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'nearest' })
    }
  }, [agent.data.messages, agent.status, isEmpty])

  const sendPrompt = async (prompt: string) => {
    const message = prompt.trim().slice(0, MAX_PROMPT_LENGTH)
    if (!message || isBusy) return
    setInput('')
    try {
      await agent.send({ message })
    } catch {
      // useEveAgent exposes the actionable error in the inline alert.
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void sendPrompt(input)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      if (!isBusy) void sendPrompt(input)
    }
  }

  const resetConversation = () => {
    agent.reset()
    setInput('')
    try {
      window.sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      // Reset remains complete in memory.
    }
  }

  return (
    <main className="relative min-h-screen bg-[#0a0a0b] px-4 pb-16 pt-24 text-white sm:px-6 sm:pb-24 sm:pt-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-[-20rem] top-[-12rem] h-[48rem] w-[48rem] rounded-full bg-emerald-500/[0.09] blur-[160px]" />
        <div className="absolute right-[-18rem] top-[6rem] h-[42rem] w-[42rem] rounded-full bg-cyan-500/[0.08] blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <header className="grid gap-7 border-b border-white/[0.08] pb-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.06] px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden /> Eve runtime · public knowledge
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                {corpus.publishedPostCount} essays · {ENGLISH_NUMBER.format(corpus.recordCount)} grounded passages
              </span>
            </div>
            <h1 className="mt-5 text-balance font-display text-4xl font-bold leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              Bring the question that actually matters.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/62 sm:text-lg sm:leading-8">
              Architecture, creative work, operations, vitality, and perspective—searched across Frank&rsquo;s public work, then turned into a decision or next move you can use.
            </p>
          </div>
          <div className="flex items-center gap-2 lg:pb-1">
            <span className={`h-2 w-2 rounded-full ${agent.status === 'error' ? 'bg-rose-400' : isBusy ? 'animate-pulse bg-cyan-300 motion-reduce:animate-none' : 'bg-emerald-300'}`} aria-hidden />
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
              {agent.status === 'error' ? 'Needs a retry' : isBusy ? 'Working through sources' : 'Ready'}
            </span>
          </div>
        </header>

        <div className="mt-8 grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[330px_minmax(0,1fr)]">
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start" aria-label="About Frank Intelligence">
            <section className="rounded-2xl border border-white/[0.09] bg-white/[0.025] p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-300/[0.07]">
                  <BrainCircuit className="h-5 w-5 text-emerald-200" aria-hidden />
                </span>
                <div>
                  <h2 className="font-display text-lg font-semibold text-white">Frank Intelligence</h2>
                  <p className="text-xs text-white/40">Public, source-grounded, independent</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-white/60">
                AI shaped by Frank&rsquo;s public work—not Frank himself. It cites what it uses and marks inference when the sources stop.
              </p>
              <div className="mt-5 grid grid-cols-5 gap-1.5" aria-label="Five operating lenses">
                {[
                  [Network, 'Architecture'], [Music2, 'Creator'], [Sparkles, 'Operator'], [HeartPulse, 'Vitality'], [BookOpen, 'Perspective'],
                ].map(([Icon, label]) => {
                  const LensIcon = Icon as typeof Network
                  return (
                    <div key={label as string} className="flex min-h-12 items-center justify-center rounded-lg border border-white/[0.07] bg-black/15" title={label as string}>
                      <LensIcon className="h-4 w-4 text-white/45" aria-label={label as string} />
                    </div>
                  )
                })}
              </div>
            </section>

            <section id="origin" className="scroll-mt-24 rounded-2xl border border-white/[0.09] bg-white/[0.02] p-5">
              <div className="flex items-center gap-2 text-white/75">
                <Construction className="h-4 w-4 text-cyan-200" aria-hidden />
                <h2 className="text-sm font-semibold">Builder before architect</h2>
              </div>
              <p className="mt-3 text-xs leading-5 text-white/48">
                Craft began beside his father on construction sites: work has to hold up in the real world. Loss, family responsibility, music, and enterprise-scale systems give the intelligence its depth—not a persona script.
              </p>
            </section>

            <section id="boundaries" className="scroll-mt-24 rounded-2xl border border-white/[0.09] bg-white/[0.02] p-5">
              <div className="flex items-center gap-2 text-white/75">
                <ShieldCheck className="h-4 w-4 text-emerald-200" aria-hidden />
                <h2 className="text-sm font-semibold">Clear boundaries</h2>
              </div>
              <p className="mt-3 text-xs leading-5 text-white/48">
                Public material only. No private employer, customer, deal, or health data. Vitality guidance is educational, never diagnosis or treatment. FrankX is independent and is not affiliated with, endorsed by, or sponsored by Oracle.
              </p>
            </section>

            <Link href="/agents" className="group flex min-h-11 items-center justify-between rounded-xl border border-white/10 px-4 text-sm font-medium text-white/60 transition hover:border-white/20 hover:bg-white/[0.035] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
              Explore the agent registry
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </aside>

          <section className="min-w-0 overflow-hidden rounded-[1.5rem] border border-white/[0.1] bg-[#0d0e10]/90 shadow-2xl shadow-black/30" aria-label="Conversation with Frank Intelligence">
            <div className="flex min-h-14 items-center justify-between border-b border-white/[0.08] px-4 sm:px-5">
              <div>
                <p className="text-sm font-semibold text-white">Studio conversation</p>
                <p className="text-[11px] text-white/38">Persists in this browser tab for 24 hours</p>
              </div>
              <button type="button" onClick={resetConversation} disabled={isBusy} className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-xs font-medium text-white/45 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
                <RefreshCw className="h-3.5 w-3.5" aria-hidden /> New thread
              </button>
            </div>

            <div className="min-h-[390px] max-h-[66vh] overflow-y-auto px-4 py-6 sm:min-h-[480px] sm:px-6" aria-live="polite" aria-busy={isBusy}>
              {isEmpty ? (
                <div className="mx-auto flex min-h-[340px] max-w-2xl flex-col justify-center sm:min-h-[420px]">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-300/65">Start from reality</p>
                  <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    What are you trying to decide, build, or become?
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/50">
                    Specific constraints produce useful intelligence. You can share context, but keep secrets, credentials, medical details, and confidential company data out of this public session.
                  </p>
                  <div className="mt-7 grid gap-2 sm:grid-cols-2">
                    {PROMPTS.map((prompt) => (
                      <button key={prompt} type="button" onClick={() => void sendPrompt(prompt)} className="min-h-[72px] rounded-xl border border-white/[0.09] bg-white/[0.025] px-4 py-3 text-left text-sm leading-5 text-white/62 transition hover:border-emerald-300/20 hover:bg-emerald-300/[0.04] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/35">
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mx-auto max-w-3xl space-y-6">
                  {messages.map((message, index) => (
                    <MessageBubble
                      key={message.id}
                      role={message.role as 'user' | 'assistant'}
                      text={message.parts.filter((part) => part.type === 'text').map((part) => part.text).join('\n\n')}
                      streaming={agent.status === 'streaming' && index === messages.length - 1 && message.role === 'assistant'}
                    />
                  ))}
                  {agent.status === 'submitted' && (
                    <div className="flex items-center gap-2 text-xs text-white/40">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 motion-reduce:animate-none" aria-hidden />
                      Finding the useful evidence…
                    </div>
                  )}
                  <div ref={transcriptEndRef} />
                </div>
              )}
            </div>

            {agent.error && (
              <div role="alert" className="mx-4 mb-3 rounded-xl border border-rose-300/20 bg-rose-300/[0.06] px-4 py-3 text-sm text-rose-100 sm:mx-6">
                The agent could not complete that turn. Your draft is safe—wait a moment and try again. <span className="text-rose-100/55">{agent.error.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="border-t border-white/[0.08] bg-black/15 p-3 sm:p-4">
              <label htmlFor="frank-intelligence-prompt" className="sr-only">Message Frank Intelligence</label>
              <div className="rounded-2xl border border-white/[0.11] bg-[#121315] p-2 focus-within:border-emerald-300/25 focus-within:ring-2 focus-within:ring-emerald-300/10">
                <textarea
                  id="frank-intelligence-prompt"
                  name="frank-intelligence-prompt"
                  autoComplete="off"
                  value={input}
                  onChange={(event) => setInput(event.target.value.slice(0, MAX_PROMPT_LENGTH))}
                  onKeyDown={handleKeyDown}
                  disabled={isBusy}
                  rows={3}
                  maxLength={MAX_PROMPT_LENGTH}
                  placeholder="Ask the consequential question…"
                  className="max-h-48 min-h-[76px] w-full resize-none bg-transparent px-2 py-2 text-[15px] leading-6 text-white outline-none placeholder:text-white/28 disabled:cursor-wait"
                />
                <div className="flex items-center justify-between gap-3 px-2 pb-1">
                  <span className="text-[10px] text-white/30">Enter to send · Shift+Enter for a new line · {input.length}/{MAX_PROMPT_LENGTH}</span>
                  <button type="submit" disabled={isBusy || input.trim().length === 0} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121315]" aria-label={isBusy ? 'Frank Intelligence is responding' : 'Send message'}>
                    <Send className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  )
}

function MessageBubble({ role, text, streaming }: { role: 'user' | 'assistant'; text: string; streaming: boolean }) {
  const html = useMemo(() => {
    if (role !== 'assistant' || !text) return ''
    const raw = marked.parse(text, { async: false, breaks: true, gfm: true }) as string
    return DOMPurify.sanitize(raw, {
      ALLOWED_TAGS: ['p', 'a', 'strong', 'em', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'h2', 'h3', 'hr', 'br'],
      ALLOWED_ATTR: ['href', 'title'],
    })
  }, [role, text])

  if (role === 'user') {
    return (
      <article className="ml-auto max-w-[88%] break-words rounded-2xl rounded-tr-md bg-white px-4 py-3 text-sm leading-6 text-slate-950 sm:max-w-[78%]">
        <p className="whitespace-pre-wrap">{text}</p>
      </article>
    )
  }

  return (
    <article className="max-w-[96%] sm:max-w-[90%]">
      <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-emerald-300/65">
        Frank Intelligence
        {streaming && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 motion-reduce:animate-none" aria-label="Streaming response" />}
      </div>
      {text ? (
        <div
          className="break-words text-sm leading-7 text-white/72 [&_a]:font-medium [&_a]:text-emerald-200 [&_a]:underline [&_a]:decoration-emerald-300/30 [&_a]:underline-offset-4 hover:[&_a]:text-emerald-100 [&_blockquote]:my-4 [&_blockquote]:border-l-2 [&_blockquote]:border-cyan-300/30 [&_blockquote]:pl-4 [&_code]:rounded [&_code]:bg-white/[0.07] [&_code]:px-1.5 [&_code]:py-0.5 [&_h2]:mb-2 [&_h2]:mt-6 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_h3]:mb-2 [&_h3]:mt-5 [&_h3]:font-semibold [&_h3]:text-white [&_li]:my-1 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-3 [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-white/10 [&_pre]:bg-black/30 [&_pre]:p-4 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-5"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <p className="text-sm text-white/35">Working through the public sources…</p>
      )}
    </article>
  )
}
