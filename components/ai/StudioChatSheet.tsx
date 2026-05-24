'use client'

import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, type UIMessage } from 'ai'
import {
  ArrowUp,
  KeyRound,
  Loader2,
  Sparkles,
  Square,
  X,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { DEFAULT_PERSONA, PERSONA_LIST, type PersonaId, getPersona } from '@/lib/ai/personas'

import BYOKSetup from './BYOKSetup'
import ToolCallCard from './ToolCallCard'
import UsageMeter from './UsageMeter'

interface StudioChatSheetProps {
  isOpen: boolean
  onClose: () => void
}

const ACCENT_CLASSES: Record<string, { ring: string; chip: string; glow: string }> = {
  cyan: {
    ring: 'ring-cyan-400/40',
    chip: 'bg-cyan-500/15 text-cyan-200 border-cyan-400/30',
    glow: 'shadow-[0_0_30px_-8px_rgba(34,211,238,0.6)]',
  },
  amber: {
    ring: 'ring-amber-400/40',
    chip: 'bg-amber-500/15 text-amber-200 border-amber-400/30',
    glow: 'shadow-[0_0_30px_-8px_rgba(245,158,11,0.55)]',
  },
  emerald: {
    ring: 'ring-emerald-400/40',
    chip: 'bg-emerald-500/15 text-emerald-200 border-emerald-400/30',
    glow: 'shadow-[0_0_30px_-8px_rgba(16,185,129,0.6)]',
  },
  violet: {
    ring: 'ring-violet-400/40',
    chip: 'bg-violet-500/15 text-violet-200 border-violet-400/30',
    glow: 'shadow-[0_0_30px_-8px_rgba(167,139,250,0.6)]',
  },
  rose: {
    ring: 'ring-rose-400/40',
    chip: 'bg-rose-500/15 text-rose-200 border-rose-400/30',
    glow: 'shadow-[0_0_30px_-8px_rgba(244,114,182,0.55)]',
  },
}

export default function StudioChatSheet({ isOpen, onClose }: StudioChatSheetProps) {
  const [personaId, setPersonaId] = useState<PersonaId>(DEFAULT_PERSONA)
  const [showByok, setShowByok] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const persona = useMemo(() => getPersona(personaId), [personaId])
  const accent = ACCENT_CLASSES[persona.accent] || ACCENT_CLASSES.cyan

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: '/api/ai/chat',
        prepareSendMessagesRequest: ({ messages, body }) => ({
          body: { ...(body || {}), messages, persona: personaId },
        }),
      }),
    [personaId]
  )

  const { messages, sendMessage, status, error, stop, setMessages } = useChat({
    transport,
  })

  // Reset conversation when switching personas (clean handoff)
  useEffect(() => {
    setMessages([])
  }, [personaId, setMessages])

  // Auto-scroll on new messages
  useEffect(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, status])

  const isBusy = status === 'submitted' || status === 'streaming'

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    const text = inputValue.trim()
    if (!text || isBusy) return
    sendMessage({ text })
    setInputValue('')
  }

  const handleSuggestion = (text: string) => {
    if (isBusy) return
    sendMessage({ text })
    setInputValue('')
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/55 backdrop-blur-sm" aria-hidden />
        </Transition.Child>

        <div className="fixed inset-0 flex items-stretch justify-end overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-out duration-250"
            enterFrom="translate-x-full md:translate-x-8 opacity-0"
            enterTo="translate-x-0 opacity-100"
            leave="transform transition ease-in duration-200"
            leaveFrom="translate-x-0 opacity-100"
            leaveTo="translate-x-full md:translate-x-8 opacity-0"
          >
            <Dialog.Panel
              className={cn(
                'flex h-full w-full flex-col overflow-hidden bg-[#0c0c10]/95 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-2xl',
                'md:m-3 md:h-[calc(100vh-1.5rem)] md:w-[440px] md:rounded-3xl md:ring-white/15'
              )}
            >
              {/* Aurora wash */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
                <div className="absolute -top-32 -right-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
                <div className="absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
              </div>

              {/* Header */}
              <div className="relative z-10 flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3.5">
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-1',
                      accent.ring,
                      accent.glow
                    )}
                  >
                    <persona.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="truncate text-sm font-semibold tracking-tight text-white">
                        Studio Crew
                      </h2>
                      <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-white/50">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        </span>
                        Online
                      </span>
                    </div>
                    <p className="truncate text-xs text-white/55">
                      {persona.name} · {persona.tagline}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setShowByok((v) => !v)}
                    className={cn(
                      'flex h-8 items-center gap-1.5 rounded-full border px-2.5 text-[11px] font-medium transition-colors',
                      showByok
                        ? 'border-emerald-400/50 bg-emerald-400/10 text-emerald-200'
                        : 'border-white/10 bg-white/[0.04] text-white/65 hover:bg-white/10'
                    )}
                    aria-label="Bring your own key"
                  >
                    <KeyRound className="h-3.5 w-3.5" />
                    Key
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                    aria-label="Close studio chat"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Agent picker */}
              <div className="relative z-10 flex gap-1.5 overflow-x-auto border-b border-white/[0.06] px-4 py-2.5 scrollbar-none">
                {PERSONA_LIST.map((p) => {
                  const a = ACCENT_CLASSES[p.accent] || ACCENT_CLASSES.cyan
                  const active = p.id === personaId
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPersonaId(p.id)}
                      className={cn(
                        'flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all',
                        active
                          ? cn(a.chip, 'ring-1', a.ring)
                          : 'border-white/10 bg-white/[0.03] text-white/60 hover:bg-white/[0.07] hover:text-white/80'
                      )}
                      aria-pressed={active}
                    >
                      <p.icon className="h-3.5 w-3.5" />
                      {p.shortName}
                    </button>
                  )
                })}
              </div>

              {/* BYOK overlay panel */}
              <AnimatePresence>
                {showByok && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.18 }}
                    className="relative z-10 overflow-hidden border-b border-white/10 bg-black/30"
                  >
                    <BYOKSetup onDone={() => setShowByok(false)} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Messages */}
              <div ref={scrollRef} className="relative z-10 flex-1 overflow-y-auto px-4 py-5">
                {messages.length === 0 ? (
                  <EmptyState persona={persona} onPick={handleSuggestion} accent={accent} />
                ) : (
                  <ul className="space-y-4">
                    {messages.map((m) => (
                      <MessageBubble key={m.id} message={m} accent={accent} />
                    ))}
                    {status === 'submitted' && (
                      <li className="flex items-center gap-2 text-xs text-white/50">
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        {persona.shortName} is thinking…
                      </li>
                    )}
                    {error && (
                      <li className="rounded-2xl border border-rose-400/30 bg-rose-500/10 p-3 text-xs text-rose-200">
                        {(error as Error).message || 'Something broke. Try again.'}
                      </li>
                    )}
                  </ul>
                )}
              </div>

              {/* Composer */}
              <div className="relative z-10 border-t border-white/10 bg-black/30 px-4 py-3">
                <UsageMeter
                  persona={persona}
                  isOpen={isOpen}
                  triggerKey={messages.length}
                />
                <form onSubmit={handleSubmit} className="mt-2 flex items-end gap-2">
                  <div className="flex flex-1 items-end rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 focus-within:border-white/20 focus-within:bg-white/[0.06]">
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          handleSubmit()
                        }
                      }}
                      placeholder={`Ask ${persona.shortName} anything…`}
                      rows={1}
                      className="max-h-32 min-h-[24px] flex-1 resize-none bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
                      disabled={isBusy}
                    />
                  </div>
                  {isBusy ? (
                    <button
                      type="button"
                      onClick={() => stop()}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/80 transition-colors hover:bg-white/10"
                      aria-label="Stop generating"
                    >
                      <Square className="h-3.5 w-3.5 fill-current" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!inputValue.trim()}
                      className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-all',
                        inputValue.trim()
                          ? 'bg-gradient-to-br from-cyan-500 to-emerald-500 shadow-md shadow-cyan-500/30 hover:shadow-cyan-500/50'
                          : 'cursor-not-allowed bg-white/[0.08] text-white/30'
                      )}
                      aria-label="Send message"
                    >
                      <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
                    </button>
                  )}
                </form>
                <p className="mt-2 text-[10px] leading-relaxed text-white/35">
                  Powered by Gemini · Tools search Frank's site live · Don't paste secrets.
                </p>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

function EmptyState({
  persona,
  onPick,
  accent,
}: {
  persona: ReturnType<typeof getPersona>
  onPick: (text: string) => void
  accent: { chip: string; ring: string; glow: string }
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div
        className={cn(
          'mb-4 flex h-14 w-14 items-center justify-center rounded-full ring-1',
          accent.ring,
          accent.glow
        )}
      >
        <Sparkles className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-base font-semibold text-white">Studio's open.</h3>
      <p className="mt-1.5 max-w-xs text-sm text-white/55">
        What are you building, learning, or shipping? Ask {persona.shortName} anything — or
        switch agents above.
      </p>
      <div className="mt-5 flex w-full flex-col gap-2">
        {persona.suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onPick(s)}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-left text-sm text-white/75 transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
          >
            <span className="block">{s}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function MessageBubble({
  message,
  accent,
}: {
  message: UIMessage
  accent: { chip: string; ring: string; glow: string }
}) {
  const isUser = message.role === 'user'
  return (
    <li className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
          isUser
            ? 'bg-white/[0.08] text-white'
            : cn('border bg-white/[0.04] text-white/90', accent.chip)
        )}
      >
        {message.parts?.map((part, i) => {
          if (part.type === 'text') {
            return (
              <div key={i} className="whitespace-pre-wrap break-words">
                {(part as { text: string }).text}
              </div>
            )
          }
          if (typeof part.type === 'string' && part.type.startsWith('tool-')) {
            return <ToolCallCard key={i} part={part as any} />
          }
          if (part.type === 'reasoning') {
            const text = (part as { text?: string }).text
            if (!text) return null
            return (
              <div key={i} className="mt-2 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs italic text-white/55">
                {text}
              </div>
            )
          }
          return null
        })}
      </div>
    </li>
  )
}
