'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Check, Copy, Cpu, Layers, Play, Terminal, Wrench } from 'lucide-react'
import type { FrankxBlueprintSummary } from '@/lib/mcp/blueprints-catalog'
import type { FrankxSkillRecord } from '@/lib/mcp/skills-catalog'
import type { RecommendedStackTool, StackGoal } from '@/lib/mcp/stack-recommendations'
import { ArchitectStackCard } from '@/components/conversion/ArchitectStackCard'
import { LiquidGlassSurface } from '@/components/visuals/LiquidGlassSurface'
import type { SignalFocusMode } from '@/components/visuals/SovereignSignalScene'
import { SovereignSignalStage } from '@/components/visuals/SovereignSignalStage'

type Props = {
  skills: FrankxSkillRecord[]
  blueprints: FrankxBlueprintSummary[]
  totalBlueprints: number
  stacksByGoal: Record<StackGoal, { tools: RecommendedStackTool[]; disclosureNote: string }>
}

type ClientTab = 'claude' | 'cursor' | 'codex' | 'curl'
type ToolName =
  | 'frankx_list_skills'
  | 'frankx_list_blueprints'
  | 'frankx_recommend_stack'
  | 'frankx_search_site'

const CLIENT_SNIPPETS: Record<ClientTab, { label: string; note: string; code: string }> = {
  claude: {
    label: 'Claude Code',
    note: 'Adds the read-only HTTP server to your user config with zero API keys.',
    code: 'claude mcp add --transport http frankx https://frankx.ai/api/mcp',
  },
  cursor: {
    label: 'Project .mcp.json',
    note: 'Project-root .mcp.json for Claude Code, which needs "type": "http" for a remote server. In Cursor .cursor/mcp.json keep only the url field.',
    code: `{
  "mcpServers": {
    "frankx": {
      "type": "http",
      "url": "https://frankx.ai/api/mcp"
    }
  }
}`,
  },
  codex: {
    label: 'Codex CLI',
    note: 'Register in ~/.codex/config.toml to expose skills and stacks.',
    code: `[mcp_servers.frankx]
url = "https://frankx.ai/api/mcp"`,
  },
  curl: {
    label: 'HTTP JSON-RPC',
    note: 'Direct Streamable HTTP POST. Limited to 30 anonymous requests per minute per IP.',
    code: `curl -sS -X POST https://frankx.ai/api/mcp \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json, text/event-stream" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"frankx_list_skills","arguments":{"limit":4}}}'`,
  },
}

const GOAL_OPTIONS: { value: StackGoal; label: string }[] = [
  { value: 'coding-agents', label: 'Coding agents' },
  { value: 'voice-audio', label: 'Voice & audio' },
  { value: 'video-motion', label: 'Video & motion' },
  { value: 'creator-publishing', label: 'Creator publishing' },
  { value: 'ai-architecture', label: 'AI architecture' },
  { value: 'research-seo', label: 'Research & SEO' },
]

export function McpConsoleClient({ skills, blueprints, totalBlueprints, stacksByGoal }: Props) {
  const [focusMode, setFocusMode] = useState<SignalFocusMode>('skills')
  const [clientTab, setClientTab] = useState<ClientTab>('claude')
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [activeGoal, setActiveGoal] = useState<StackGoal>('coding-agents')

  // Live MCP playground state
  const [toolName, setToolName] = useState<ToolName>('frankx_list_skills')
  const [toolQuery, setToolQuery] = useState('mcp')
  const [toolGoal, setToolGoal] = useState<StackGoal>('voice-audio')
  const [rpcOutput, setRpcOutput] = useState<string>('')
  const [rpcError, setRpcError] = useState<string | null>(null)
  const [rpcStatus, setRpcStatus] = useState<'idle' | 'running' | 'done'>('idle')

  const copyText = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedKey(key)
      setTimeout(() => setCopiedKey((current) => (current === key ? null : current)), 2000)
    } catch {
      setCopiedKey(null)
    }
  }

  const runLiveTool = async () => {
    setRpcStatus('running')
    setRpcError(null)

    const args: Record<string, unknown> = {}
    if (toolName === 'frankx_recommend_stack') {
      args.goal = toolGoal
      if (toolQuery.trim()) args.query = toolQuery.trim()
      args.limit = 4
    } else if (toolName === 'frankx_search_site') {
      args.query = toolQuery.trim() || 'agentic architecture'
      args.limit = 5
    } else {
      if (toolQuery.trim()) args.query = toolQuery.trim()
      args.limit = 4
    }

    try {
      const response = await fetch('/api/mcp', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json, text/event-stream',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: Date.now(),
          method: 'tools/call',
          params: {
            name: toolName,
            arguments: args,
          },
        }),
      })

      if (!response.ok) {
        const msg =
          response.status === 429
            ? 'Rate limit reached (30 requests/minute per IP). Wait a minute and retry.'
            : `HTTP ${response.status} from /api/mcp.`
        setRpcError(msg)
        setRpcStatus('done')
        return
      }

      const contentType = response.headers.get('content-type') ?? ''
      let payload: unknown
      if (contentType.includes('text/event-stream')) {
        const raw = await response.text()
        const dataLine = raw
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter((line) => line.startsWith('data:'))
          .pop()
        if (!dataLine) {
          throw new Error('Empty event-stream response from /api/mcp.')
        }
        payload = JSON.parse(dataLine.slice(5).trim())
      } else {
        payload = await response.json()
      }
      const rpcPayload = payload as { result?: { structuredContent?: unknown } } | null
      const display = rpcPayload?.result?.structuredContent ?? payload
      setRpcOutput(JSON.stringify(display, null, 2))
      setRpcStatus('done')
    } catch (error) {
      setRpcError(error instanceof Error ? error.message : 'Request failed.')
      setRpcStatus('done')
    }
  }

  const activeStack = stacksByGoal[activeGoal]
  const activeSnippet = CLIENT_SNIPPETS[clientTab]

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-zinc-100 pb-24">
      {/* Hero with WebGL shader stage */}
      <section className="relative mx-auto max-w-6xl px-5 pt-28 pb-12 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0a0b0f] p-7 sm:p-11">
          <SovereignSignalStage focusMode={focusMode} className="pointer-events-none !absolute inset-0 !rounded-none !border-0" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.35fr_0.95fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
                <span>Stateless HTTP · /api/mcp · 6 read-only tools</span>
              </div>

              <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Connect any AI client to frankx.ai
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300">
                One public Model Context Protocol endpoint lets Claude Code, Cursor, Codex, and custom agents search published guides, fetch installable <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm text-cyan-200">SKILL.md</code> workflows, inspect {totalBlueprints} architecture blueprints, and pull verified partner tool stacks with explicit disclosure.
              </p>

              {/* Focus switcher driving both 3D GLSL uniform and quick anchor */}
              <div className="mt-6 flex flex-wrap items-center gap-2.5" role="group" aria-label="Signal field mode">
                {(
                  [
                    { id: 'skills', label: 'Skills layer', count: `${skills.length} curated` },
                    { id: 'blueprints', label: 'Blueprints layer', count: `${totalBlueprints} published` },
                    { id: 'stacks', label: 'Tool stacks', count: '6 goals' },
                  ] as const
                ).map((mode) => {
                  const selected = focusMode === mode.id
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setFocusMode(mode.id)}
                      className={`inline-flex min-h-[40px] items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] ${
                        selected
                          ? 'border-emerald-400/50 bg-emerald-500/15 text-emerald-200'
                          : 'border-white/15 bg-white/[0.04] text-zinc-300 hover:border-white/25 hover:text-white'
                      }`}
                    >
                      <span>{mode.label}</span>
                      <span className="font-mono text-[11px] text-zinc-400">{mode.count}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <LiquidGlassSurface accent="cyan" className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                  <Terminal className="h-4 w-4 text-cyan-300" aria-hidden="true" />
                  <span>Install in 10 seconds</span>
                </div>
                <span className="text-[11px] font-mono text-zinc-400">No API key required</span>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {(Object.keys(CLIENT_SNIPPETS) as ClientTab[]).map((tab) => {
                  const active = clientTab === tab
                  return (
                    <button
                      key={tab}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setClientTab(tab)}
                      className={`min-h-[34px] rounded-lg px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 ${
                        active ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/35' : 'text-zinc-400 hover:text-white border border-transparent'
                      }`}
                    >
                      {CLIENT_SNIPPETS[tab].label}
                    </button>
                  )
                })}
              </div>

              <p className="mt-3 text-xs text-zinc-400">{activeSnippet.note}</p>
              <pre className="mt-2.5 overflow-x-auto rounded-xl border border-white/[0.08] bg-[#07080c] p-3 font-mono text-xs text-zinc-200">
                <code>{activeSnippet.code}</code>
              </pre>

              <div className="mt-3 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => copyText('snippet', activeSnippet.code)}
                  className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl border border-emerald-400/35 bg-emerald-500/15 px-3.5 py-1.5 text-xs font-semibold text-emerald-200 transition-colors hover:bg-emerald-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
                >
                  {copiedKey === 'snippet' ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
                  <span>{copiedKey === 'snippet' ? 'Copied command' : 'Copy snippet'}</span>
                </button>
                <a
                  href="/api/mcp/server-card"
                  className="text-xs font-mono text-zinc-400 underline-offset-4 hover:text-zinc-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 rounded"
                >
                  Server card JSON
                </a>
              </div>
            </LiquidGlassSurface>
          </div>
        </div>
      </section>

      {/* Live interactive JSON-RPC tool tester */}
      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8" aria-labelledby="live-rpc-heading">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-emerald-400">Live tool runner</p>
            <h2 id="live-rpc-heading" className="mt-1.5 text-2xl font-semibold text-white">
              Query the real /api/mcp endpoint
            </h2>
          </div>
          <p className="text-xs text-zinc-400">Calls Streamable HTTP POST directly from your browser. Same output agents receive.</p>
        </div>

        <LiquidGlassSurface accent="emerald" className="p-6">
          <div className="grid gap-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-zinc-300">Tool</span>
              <select
                value={toolName}
                onChange={(e) => setToolName(e.target.value as ToolName)}
                className="min-h-[42px] w-full rounded-xl border border-white/15 bg-[#090b10] px-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
              >
                <option value="frankx_list_skills">frankx_list_skills</option>
                <option value="frankx_list_blueprints">frankx_list_blueprints</option>
                <option value="frankx_recommend_stack">frankx_recommend_stack</option>
                <option value="frankx_search_site">frankx_search_site</option>
              </select>
            </label>

            {toolName === 'frankx_recommend_stack' ? (
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-zinc-300">Goal</span>
                <select
                  value={toolGoal}
                  onChange={(e) => setToolGoal(e.target.value as StackGoal)}
                  className="min-h-[42px] w-full rounded-xl border border-white/15 bg-[#090b10] px-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
                >
                  {GOAL_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
            ) : (
              <div className="hidden md:block text-xs text-zinc-400 pb-2.5">
                Read-only catalog query (max 4 results in console).
              </div>
            )}

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-zinc-300">Keyword filter (optional)</span>
              <input
                type="text"
                value={toolQuery}
                onChange={(e) => setToolQuery(e.target.value)}
                placeholder="mcp, voice, rag..."
                maxLength={120}
                className="min-h-[42px] w-full rounded-xl border border-white/15 bg-[#090b10] px-3 text-sm text-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
              />
            </label>

            <button
              type="button"
              onClick={runLiveTool}
              disabled={rpcStatus === 'running'}
              className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-500/20 px-5 py-2 text-sm font-semibold text-emerald-100 transition-colors hover:bg-emerald-500/30 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
            >
              <Play className="h-4 w-4" aria-hidden="true" />
              <span>{rpcStatus === 'running' ? 'Running...' : 'Run tool'}</span>
            </button>
          </div>

          {rpcError ? (
            <div role="alert" className="mt-4 rounded-xl border border-amber-400/35 bg-amber-500/10 p-3.5 text-sm text-amber-200">
              {rpcError}
            </div>
          ) : null}

          <pre className="mt-4 max-h-[340px] overflow-auto rounded-xl border border-white/[0.08] bg-[#07080c] p-4 font-mono text-xs leading-relaxed text-zinc-200">
            <code>
              {rpcOutput ||
                '// Click "Run tool" to inspect structuredContent JSON returned live by POST /api/mcp.'}
            </code>
          </pre>
        </LiquidGlassSurface>
      </section>

      {/* Disclosed Stack Recommendations */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8" aria-labelledby="stack-explorer-heading">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-amber-400">frankx_recommend_stack</p>
            <h2 id="stack-explorer-heading" className="mt-1.5 text-2xl font-semibold text-white">
              Recommended stacks with explicit partner disclosure
            </h2>
          </div>
          <Link
            href="/resources/builder-stack"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-300 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 rounded"
          >
            <span>View partner disclosure policy</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {GOAL_OPTIONS.map((goal) => {
            const active = activeGoal === goal.value
            return (
              <button
                key={goal.value}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveGoal(goal.value)}
                className={`inline-flex min-h-[40px] items-center rounded-xl border px-3.5 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70 ${
                  active
                    ? 'border-amber-400/45 bg-amber-500/15 text-amber-200'
                    : 'border-white/10 bg-white/[0.03] text-zinc-300 hover:border-white/20 hover:text-white'
                }`}
              >
                {goal.label}
              </button>
            )
          })}
        </div>

        <p className="mb-5 text-xs leading-relaxed text-zinc-400">{activeStack.disclosureNote}</p>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {activeStack.tools.map((tool) => (
            <ArchitectStackCard key={`${activeGoal}-${tool.id}`} tool={tool} />
          ))}
        </div>
      </section>

      {/* Skills + Blueprints Quick Index */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <LiquidGlassSurface accent="emerald" className="p-6">
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-2.5">
                <Wrench className="h-5 w-5 text-emerald-400" aria-hidden="true" />
                <h2 className="text-xl font-semibold text-white">Installable skills</h2>
              </div>
              <Link href="/skills" className="text-xs font-medium text-emerald-300 hover:text-emerald-200">
                All skills →
              </Link>
            </div>
            <ul className="mt-4 space-y-3">
              {skills.slice(0, 5).map((skill) => (
                <li key={skill.slug} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-sm font-medium text-white">{skill.slug}</span>
                    <span className="text-[11px] font-mono text-zinc-400">{skill.category}</span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-400">{skill.summary}</p>
                  <div className="mt-2.5 flex items-center justify-between gap-2">
                    <code className="truncate font-mono text-[11px] text-emerald-300">{skill.installCommand}</code>
                    <button
                      type="button"
                      aria-label={`Copy install command for ${skill.slug}`}
                      onClick={() => copyText(skill.slug, skill.installCommand)}
                      className="inline-flex min-h-[32px] shrink-0 items-center gap-1 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 text-[11px] text-zinc-200 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
                    >
                      {copiedKey === skill.slug ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </LiquidGlassSurface>

          <LiquidGlassSurface accent="cyan" className="p-6">
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-2.5">
                <Layers className="h-5 w-5 text-cyan-400" aria-hidden="true" />
                <h2 className="text-xl font-semibold text-white">Architecture blueprints</h2>
              </div>
              <Link href="/ai-architecture/blueprints" className="text-xs font-medium text-cyan-300 hover:text-cyan-200">
                All blueprints →
              </Link>
            </div>
            <ul className="mt-4 space-y-3">
              {blueprints.slice(0, 5).map((bp) => (
                <li key={bp.slug} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      href={bp.url.replace('https://frankx.ai', '')}
                      className="text-sm font-semibold text-white hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 rounded"
                    >
                      {bp.title}
                    </Link>
                    <span className="shrink-0 font-mono text-[11px] text-zinc-400">{bp.componentCount} nodes</span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-400">{bp.subtitle}</p>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-white/[0.08] pt-4 text-xs text-zinc-400">
              <span className="inline-flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
                Discovery:
              </span>
              <a href="/llms.txt" className="text-zinc-200 underline underline-offset-4 hover:text-white">
                /llms.txt
              </a>
              <a href="/openapi.json" className="text-zinc-200 underline underline-offset-4 hover:text-white">
                /openapi.json
              </a>
              <Link href="/developers" className="text-zinc-200 underline underline-offset-4 hover:text-white">
                /developers
              </Link>
            </div>
          </LiquidGlassSurface>
        </div>
      </section>
    </main>
  )
}
