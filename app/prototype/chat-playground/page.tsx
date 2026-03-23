'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  ChevronLeft,
  Send,
  Trash2,
  Settings,
  MessageSquare,
  Loader2,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Square,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { ApiKeyManager, useAllApiKeys } from '@/components/ai-architecture/ApiKeyManager'
import { AI_PROVIDER_META } from '@/types/ai-architecture'
import type { AIProvider } from '@/types/ai-architecture'

const MAX_MESSAGES = 100

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  provider?: AIProvider
  timestamp: Date
}

function ChatMessage({ message, onCopy }: { message: Message; onCopy: (text: string) => void }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    onCopy(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          message.role === 'user'
            ? 'bg-violet-500/20 text-violet-400'
            : 'bg-cyan-500/20 text-cyan-400'
        }`}
      >
        {message.role === 'user' ? (
          <span className="text-xs font-bold">You</span>
        ) : (
          <Sparkles className="h-4 w-4" />
        )}
      </div>
      <div
        className={`group relative max-w-[80%] rounded-2xl px-4 py-3 ${
          message.role === 'user'
            ? 'bg-violet-500/20 text-white'
            : 'bg-white/[0.04] text-slate-300 border border-white/[0.06]'
        }`}
      >
        <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
        {message.provider && message.role === 'assistant' && (
          <p className="mt-2 text-[11px] text-slate-500">
            via {AI_PROVIDER_META[message.provider].name}
          </p>
        )}
        <button
          onClick={handleCopy}
          className="absolute -right-2 -top-2 hidden rounded-lg bg-white/10 p-1.5 text-slate-400 transition-colors hover:text-white group-hover:block"
          aria-label="Copy message"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        </button>
      </div>
    </motion.div>
  )
}

function ProviderSelector({
  selected,
  onChange,
  availableProviders,
}: {
  selected: AIProvider
  onChange: (provider: AIProvider) => void
  availableProviders: AIProvider[]
}) {
  return (
    <div className="flex gap-1.5">
      {(['anthropic', 'openai', 'google'] as AIProvider[]).map((provider) => {
        const meta = AI_PROVIDER_META[provider]
        const isAvailable = availableProviders.includes(provider)
        const isSelected = selected === provider

        const selectedStyles: Record<string, string> = {
          orange: 'border-orange-500/50 bg-orange-500/15 text-orange-400',
          emerald: 'border-emerald-500/50 bg-emerald-500/15 text-emerald-400',
          blue: 'border-blue-500/50 bg-blue-500/15 text-blue-400',
        }

        return (
          <button
            key={provider}
            onClick={() => isAvailable && onChange(provider)}
            disabled={!isAvailable}
            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
              isSelected
                ? selectedStyles[meta.color]
                : isAvailable
                ? 'border-white/15 text-slate-400 hover:border-white/30 hover:text-white'
                : 'border-white/[0.06] text-slate-600 cursor-not-allowed'
            }`}
          >
            {meta.shortName}
          </button>
        )
      })}
    </div>
  )
}

export default function ChatPlaygroundPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>('anthropic')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const { keys, isLoaded } = useAllApiKeys()
  const availableProviders = (['anthropic', 'openai', 'google'] as AIProvider[]).filter(
    (p) => keys[p]
  )

  // Auto-select first available provider
  useEffect(() => {
    if (isLoaded && availableProviders.length > 0 && !availableProviders.includes(selectedProvider)) {
      setSelectedProvider(availableProviders[0])
    }
  }, [isLoaded, availableProviders, selectedProvider])

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
      setIsLoading(false)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const apiKey = keys[selectedProvider]
    if (!input.trim() || isLoading || !apiKey) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    // Enforce message limit - keep the most recent messages
    setMessages((prev) => {
      const updated = [...prev, userMessage]
      return updated.length > MAX_MESSAGES ? updated.slice(-MAX_MESSAGES) : updated
    })
    setInput('')
    setIsLoading(true)

    // Create abort controller for this request
    const controller = new AbortController()
    abortControllerRef.current = controller

    try {
      const response = await fetch('/api/byok/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-API-Key': apiKey,
          'X-Provider': selectedProvider,
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].slice(-20).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
        signal: controller.signal,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to get response')
      }

      // Handle streaming response
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantContent = ''

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        provider: selectedProvider,
        timestamp: new Date(),
      }

      setMessages((prev) => {
        const updated = [...prev, assistantMessage]
        return updated.length > MAX_MESSAGES ? updated.slice(-MAX_MESSAGES) : updated
      })

      let buffer = ''
      while (reader) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') continue
            try {
              const parsed = JSON.parse(data)
              if (parsed.content) {
                assistantContent += parsed.content
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMessage.id ? { ...m, content: assistantContent } : m
                  )
                )
              }
            } catch {
              // Skip incomplete JSON chunks
            }
          }
        }
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        // User cancelled - no error message needed
        return
      }
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Something went wrong'}`,
        provider: selectedProvider,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      abortControllerRef.current = null
      setIsLoading(false)
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const clearChat = () => {
    stopGeneration()
    setMessages([])
  }

  const hasApiKey = availableProviders.length > 0

  return (
    <main className="flex min-h-screen flex-col bg-[#030712]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/[0.06] bg-[#030712]/90 backdrop-blur-xl">
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
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/15">
                <MessageSquare className="h-4 w-4 text-violet-400" />
              </div>
              <h1 className="text-sm font-semibold text-white">Chat Playground</h1>
              <span className="hidden sm:inline-flex rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/25">
                BYOK
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {hasApiKey && (
              <ProviderSelector
                selected={selectedProvider}
                onChange={setSelectedProvider}
                availableProviders={availableProviders}
              />
            )}
            <div className="ml-1 h-5 w-px bg-white/10" />
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`rounded-lg p-2 transition-all ${
                showSettings
                  ? 'bg-white/10 text-white'
                  : 'text-slate-400 hover:bg-white/[0.06] hover:text-white'
              }`}
              aria-label="Toggle settings"
            >
              <Settings className="h-4 w-4" />
            </button>
            <button
              onClick={clearChat}
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-white"
              title="Clear chat"
              aria-label="Clear chat"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-[57px] overflow-hidden">
        {/* Main Chat Area */}
        <div className="flex flex-1 flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mx-auto max-w-3xl space-y-6">
              {!hasApiKey ? (
                <div className="py-20 text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                    <MessageSquare className="h-7 w-7 text-slate-500" />
                  </div>
                  <h2 className="mb-2 text-xl font-bold text-white">Add an API Key to Start</h2>
                  <p className="mb-6 max-w-sm mx-auto text-sm text-slate-400 leading-relaxed">
                    Enter your API key in the settings panel. Keys are stored in your browser only.
                  </p>
                  <button
                    onClick={() => setShowSettings(true)}
                    className="rounded-full bg-violet-500 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-violet-400 hover:shadow-lg hover:shadow-violet-500/20"
                  >
                    Open Settings
                  </button>
                </div>
              ) : messages.length === 0 ? (
                <div className="py-20 text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 border border-violet-500/20">
                    <Sparkles className="h-7 w-7 text-violet-400" />
                  </div>
                  <h2 className="mb-2 text-xl font-bold text-white">Start a Conversation</h2>
                  <p className="mb-8 text-sm text-slate-400">
                    Using <span className="font-medium text-slate-300">{AI_PROVIDER_META[selectedProvider].name}</span>. Type a message below.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {[
                      'Explain RAG architecture',
                      'Write a Python hello world',
                      'What is MCP?',
                      'Compare Claude vs GPT',
                    ].map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => setInput(prompt)}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-400 transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} onCopy={handleCopy} />
                  ))}
                  {isLoading && messages[messages.length - 1]?.content === '' && (
                    <div className="flex items-center gap-2 text-slate-400">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  )}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-white/[0.06] bg-[#030712]/80 backdrop-blur-sm p-4">
            <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    hasApiKey
                      ? `Message ${AI_PROVIDER_META[selectedProvider].shortName}...`
                      : 'Add an API key to start chatting'
                  }
                  disabled={!hasApiKey}
                  className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors focus:border-violet-500/40 focus:outline-none focus:bg-white/[0.06] disabled:opacity-50"
                />
                {isLoading ? (
                  <button
                    type="button"
                    onClick={stopGeneration}
                    className="rounded-xl bg-red-500/80 px-5 py-3 font-medium text-white transition-all hover:bg-red-500"
                    aria-label="Stop generation"
                  >
                    <Square className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!input.trim() || !hasApiKey}
                    className="rounded-xl bg-violet-500 px-5 py-3 font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-violet-400 hover:shadow-lg hover:shadow-violet-500/20 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                )}
              </div>
              <p className="mt-2 text-center text-[11px] text-slate-600">
                Your API key is used directly. Never stored on our servers.
              </p>
            </form>
          </div>
        </div>

        {/* Settings Panel */}
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
                    className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-white"
                    aria-label="Close settings"
                  >
                    <ChevronLeft className="h-4 w-4 rotate-180" />
                  </button>
                </div>

                <ApiKeyManager
                  providers={['anthropic', 'openai', 'google']}
                  onKeyChange={() => {}}
                />

                <div className="mt-6 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">About BYOK</h3>
                  <ul className="space-y-2.5 text-xs text-slate-400">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-emerald-400">&#10003;</span>
                      Keys stored in browser localStorage only
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-emerald-400">&#10003;</span>
                      Direct API calls to provider
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-emerald-400">&#10003;</span>
                      You control costs via your account
                    </li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Get API Keys</h3>
                  <div className="space-y-2">
                    {(['anthropic', 'openai', 'google'] as AIProvider[]).map((provider) => {
                      const meta = AI_PROVIDER_META[provider]
                      return (
                        <a
                          key={provider}
                          href={meta.keyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between rounded-lg border border-white/[0.08] bg-white/[0.03] p-3 text-sm text-slate-400 transition-all hover:border-white/15 hover:text-white"
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
