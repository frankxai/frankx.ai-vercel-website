'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, FileSearch, Loader2, Settings, Send, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { ApiKeyManager, useAllApiKeys } from '@/components/ai-architecture/ApiKeyManager'
import { AI_PROVIDER_META } from '@/types/ai-architecture'
import type { AIProvider } from '@/types/ai-architecture'
import {
  streamByokChat,
  chunkText,
  lexicalRetrieve,
  type RetrievedChunk,
} from '@/lib/ai-architecture/byok-stream'

const RAG_PROVIDERS: AIProvider[] = ['anthropic', 'openai', 'google']

const SAMPLE_DOC = `FrankX AI Architecture Hub — Operating Notes

The production retrieval ladder: start with naive RAG, then hybrid retrieval plus a reranker, then agentic RAG, and only reach for GraphRAG when answers depend on connected entities. Earn each rung with a failure you have actually seen.

MCP (Model Context Protocol) is treated as architecture in 2026: each external system runs as its own MCP server so a failing tool degrades gracefully instead of cascading.

Context engineering centers on Minimum Viable Context: dose the agent with exactly what the current step needs rather than stuffing the prompt.`

export default function RagTesterPage() {
  const [doc, setDoc] = useState(SAMPLE_DOC)
  const [question, setQuestion] = useState('')
  const [retrieved, setRetrieved] = useState<RetrievedChunk[]>([])
  const [answer, setAnswer] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [provider, setProvider] = useState<AIProvider>('anthropic')

  const { keys, isLoaded } = useAllApiKeys()
  const availableProviders = RAG_PROVIDERS.filter((p) => keys[p])
  const hasKey = availableProviders.length > 0
  const activeProvider = availableProviders.includes(provider) ? provider : availableProviders[0]

  const run = async () => {
    const apiKey = activeProvider ? keys[activeProvider] : null
    if (!question.trim() || !doc.trim() || !apiKey || isLoading) return

    setError('')
    setAnswer('')
    setIsLoading(true)

    const chunks = chunkText(doc)
    const top = lexicalRetrieve(question, chunks)
    setRetrieved(top)

    // No retrieval hit → skip the model call and say so. Saves a request and
    // demonstrates the grounding guard.
    if (top.length === 0) {
      setAnswer('No relevant passages found in the document for that question. Try rephrasing, or add the relevant text to the document.')
      setIsLoading(false)
      return
    }

    const context = top.map((c, i) => `[${i + 1}] ${c.text}`).join('\n\n')

    const system =
      'You answer strictly from the provided context. Cite sources inline using [n] markers that map to the numbered passages. If the context does not contain the answer, say so plainly — do not invent facts.'

    try {
      await streamByokChat({
        provider: activeProvider!,
        apiKey,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: `Context:\n${context}\n\nQuestion: ${question.trim()}` },
        ],
        onDelta: (t) => setAnswer((prev) => prev + t),
      })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
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
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15">
                <FileSearch className="h-4 w-4 text-emerald-400" />
              </div>
              <h1 className="text-sm font-semibold text-white">RAG Tester</h1>
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
                <FileSearch className="h-7 w-7 text-slate-500" />
              </div>
              <h2 className="mb-2 text-xl font-bold text-white">Add an API key to start</h2>
              <p className="mb-6 mx-auto max-w-sm text-sm text-slate-400">
                Paste a document, ask a question, and watch retrieval ground the answer with
                citations. Keys stay in your browser.
              </p>
              <button
                onClick={() => setShowSettings(true)}
                className="rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-emerald-400"
              >
                Open Settings
              </button>
            </div>
          ) : (
            <>
              {/* Document */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Your document
                </label>
                <textarea
                  value={doc}
                  onChange={(e) => setDoc(e.target.value)}
                  rows={7}
                  className="w-full resize-y rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-200 placeholder-slate-500 focus:border-emerald-500/40 focus:outline-none"
                  placeholder="Paste any text — notes, docs, a transcript..."
                />
              </div>

              {/* Question */}
              <div className="flex gap-3">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && run()}
                  placeholder="Ask a question about the document..."
                  className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500/40 focus:outline-none"
                />
                <button
                  onClick={run}
                  disabled={isLoading || !question.trim()}
                  className="rounded-xl bg-emerald-500 px-5 py-3 font-medium text-white transition-all hover:bg-emerald-400 disabled:opacity-50"
                  aria-label="Ask"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </button>
              </div>

              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-300">
                  {error}
                </div>
              )}

              {/* Retrieved chunks */}
              {retrieved.length > 0 && (
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Retrieved passages ({retrieved.length})
                  </h3>
                  <div className="space-y-2">
                    {retrieved.map((c, i) => (
                      <div
                        key={c.index}
                        className="rounded-lg border border-emerald-500/15 bg-emerald-500/[0.04] p-3 text-xs text-slate-400"
                      >
                        <span className="mr-2 font-bold text-emerald-400">[{i + 1}]</span>
                        {c.text}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Answer */}
              {answer && (
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Grounded answer
                  </h3>
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.04] p-4 text-sm leading-relaxed text-slate-200 whitespace-pre-wrap">
                    {answer}
                  </div>
                </div>
              )}

              <p className="text-center text-[11px] text-slate-600">
                Demo uses lexical retrieval for zero-setup. Production RAG uses embeddings + a
                reranker —{' '}
                <Link href="/ai-architecture/templates" className="text-emerald-400 hover:underline">
                  grab the RAG starter
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
                <ApiKeyManager providers={RAG_PROVIDERS} onKeyChange={() => {}} />
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
                              ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-400'
                              : 'border-white/15 text-slate-400 hover:text-white'
                          }`}
                        >
                          {AI_PROVIDER_META[p].shortName}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-6">
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Get API keys
                  </h3>
                  <div className="space-y-2">
                    {RAG_PROVIDERS.map((p) => {
                      const meta = AI_PROVIDER_META[p]
                      return (
                        <a
                          key={p}
                          href={meta.keyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between rounded-lg border border-white/[0.08] bg-white/[0.03] p-3 text-sm text-slate-400 hover:border-white/15 hover:text-white"
                        >
                          <span className="font-medium">{meta.name}</span>
                          <ExternalLink className="h-3.5 w-3.5 opacity-50" />
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
