import Link from 'next/link'
import { ArrowRight, BookOpen, Cpu, GitBranch, Layers, Shield, Terminal, Wrench } from 'lucide-react'
import { LiquidGlassSurface } from '@/components/visuals/LiquidGlassSurface'
import { SovereignSignalStage } from '@/components/visuals/SovereignSignalStage'

const endpoints = [
  {
    path: '/api/mcp',
    kind: 'Streamable HTTP MCP',
    summary: 'Six stateless read-only JSON-RPC tools for skills, blueprints, disclosed tool stacks, search, articles, and products.',
    href: '/mcp',
    cta: 'Open MCP Console',
    isNextRoute: true,
  },
  {
    path: '/llms.txt',
    kind: 'AEO Site Manifest',
    summary: 'Structured plain-text index of guides, research portals, books, and agent tool names.',
    href: '/llms.txt',
    cta: 'Inspect llms.txt',
    isNextRoute: false,
  },
  {
    path: '/api/v1',
    kind: 'Public API Catalog',
    summary: 'Machine-readable JSON index of public read routes paired with OpenAPI 3.1 and RFC 9727 linksets.',
    href: '/api/v1',
    cta: 'Open /api/v1 JSON',
    isNextRoute: false,
  },
]

const buildTracks = [
  {
    icon: Wrench,
    title: 'SKILL.md modules',
    description: 'Compact instruction folders for Claude Code, Codex CLI, and Cursor with trigger heuristics and eval checks.',
    topics: ['MCP architecture patterns', 'Claude Agent SDK loops', 'Vercel Next.js runtimes', 'Brand editorial QA'],
    href: '/skills',
    cta: 'Explore skills hub',
  },
  {
    icon: Layers,
    title: 'Reference blueprints',
    description: 'Interactive system topologies covering RAG pipelines, multi-agent coordination, and observability.',
    topics: ['Enterprise RAG platform', 'Multi-agent code assistant', 'LLM gateway routing', 'Security boundaries'],
    href: '/ai-architecture/blueprints',
    cta: 'Browse blueprints',
  },
  {
    icon: GitBranch,
    title: 'Implementation guides',
    description: 'Step-by-step build documentation tested across real production repositories and publishing pipelines.',
    topics: ['MCP server production setup', 'Plugins vs SKILL.md', 'Voice synthesis workflows', 'Agent-readable websites'],
    href: '/guides',
    cta: 'Read build guides',
  },
]

const coreCapabilities = [
  {
    icon: Terminal,
    title: 'Zero-key HTTP MCP endpoint',
    description: 'Point Claude Code, Cursor, or Codex directly to https://frankx.ai/api/mcp with read-only schema bounds.',
  },
  {
    icon: Shield,
    title: 'Explicit commercial disclosure',
    description: 'Partner tools resolve through /go/<slug> freshness checks and carry inline sponsored metadata beside direct editorial links.',
  },
  {
    icon: Cpu,
    title: 'Clean markdown exports',
    description: 'Fetch full articles paginated cleanly on paragraph boundaries via frankx_get_article or /api/md.',
  },
  {
    icon: BookOpen,
    title: 'Open specifications',
    description: 'Inspect OpenAPI 3.1 (/openapi.json), MCP Server Card (/api/mcp/server-card), and RFC 9457 error responses.',
  },
]

export default function DevelopersPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-zinc-100 pb-24">
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-5 pt-28 pb-12 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0a0b0f] p-7 sm:p-11">
          <SovereignSignalStage focusMode="blueprints" className="pointer-events-none !absolute inset-0 !rounded-none !border-0" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-mono text-cyan-200">
              <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
              <span>For Developers &amp; AI Agents</span>
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Build with verified patterns.
              <span className="mt-2 block bg-gradient-to-r from-emerald-300 via-cyan-300 to-amber-200 bg-clip-text text-transparent">
                Query everything via MCP.
              </span>
            </h1>

            <p className="mt-5 text-base leading-relaxed text-zinc-300 sm:text-lg">
              Human documentation paired with a live Model Context Protocol endpoint. Connect your coding agent to search guides, install <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm text-emerald-200">SKILL.md</code> workflows, inspect system blueprints, and resolve vetted builder tool stacks.
            </p>

            <div className="mt-7 flex flex-wrap gap-3.5">
              <Link
                href="/mcp"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-500/20 px-5 py-2.5 text-sm font-semibold text-emerald-100 transition-colors hover:bg-emerald-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
              >
                <span>Open MCP Console</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/ai-architecture/blueprints"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
              >
                <span>Browse architecture blueprints</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Machine-readable surface */}
      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8" aria-labelledby="agent-surfaces-heading">
        <div className="mb-6">
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-emerald-400">Dual-Surface Architecture</p>
          <h2 id="agent-surfaces-heading" className="mt-1.5 text-2xl font-semibold text-white">
            Public machine endpoints
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {endpoints.map((ep) => (
            <LiquidGlassSurface key={ep.path} accent="emerald" className="flex h-full flex-col justify-between p-5">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <code className="font-mono text-sm font-semibold text-emerald-300">{ep.path}</code>
                  <span className="text-[11px] font-mono text-zinc-400">{ep.kind}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">{ep.summary}</p>
              </div>
              <div className="mt-5 pt-3 border-t border-white/[0.08]">
                {ep.isNextRoute ? (
                  <Link
                    href={ep.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 rounded"
                  >
                    <span>{ep.cta}</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                ) : (
                  <a
                    href={ep.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 rounded"
                  >
                    <span>{ep.cta}</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </LiquidGlassSurface>
          ))}
        </div>
      </section>

      {/* Core Build Tracks */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8" aria-labelledby="tracks-heading">
        <div className="mb-8 max-w-2xl">
          <h2 id="tracks-heading" className="text-2xl font-semibold text-white sm:text-3xl">
            Documentation and skill tracks
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Practical guides, verified templates, and system diagrams organized by what you are shipping.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {buildTracks.map((track) => {
            const Icon = track.icon
            return (
              <LiquidGlassSurface key={track.title} accent="cyan" className="flex h-full flex-col justify-between p-6">
                <div>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/15 text-cyan-300">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{track.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300">{track.description}</p>
                  <ul className="mt-4 space-y-1.5 border-t border-white/[0.08] pt-3.5 text-xs text-zinc-400">
                    {track.topics.map((topic) => (
                      <li key={topic}>• {topic}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <Link
                    href={track.href}
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70"
                  >
                    <span>{track.cta}</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </LiquidGlassSurface>
            )
          })}
        </div>
      </section>

      {/* Architecture & CLAUDE.md example */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="grid gap-4 sm:grid-cols-2">
            {coreCapabilities.map((item) => {
              const Icon = item.icon
              return (
                <LiquidGlassSurface key={item.title} accent="amber" className="p-5">
                  <Icon className="h-5 w-5 text-emerald-400" aria-hidden="true" />
                  <h3 className="mt-3 text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">{item.description}</p>
                </LiquidGlassSurface>
              )
            })}
          </div>

          <LiquidGlassSurface accent="emerald" className="p-6">
            <div className="mb-3 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>.mcp.json — Project configuration</span>
              <span>Read-only HTTP</span>
            </div>
            <pre className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#07080c] p-4 font-mono text-xs leading-relaxed text-zinc-200">
              <code>{`{
  "mcpServers": {
    "frankx": {
      "type": "http",
      "url": "https://frankx.ai/api/mcp"
    }
  }
}`}</code>
            </pre>
            <p className="mt-3 font-mono text-[11px] leading-relaxed text-zinc-500">
              Tools: frankx_list_skills, frankx_list_blueprints, frankx_recommend_stack, frankx_search_site, frankx_get_article, frankx_list_products
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link
                href="/mcp"
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-emerald-400/35 bg-emerald-500/15 px-4 py-2 text-xs font-semibold text-emerald-200 transition-colors hover:bg-emerald-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
              >
                <span>Test live in MCP Console</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link
                href="/resources/builder-stack"
                className="inline-flex min-h-[40px] items-center rounded-xl border border-white/15 px-4 py-2 text-xs font-medium text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70"
              >
                Partner stack directory
              </Link>
            </div>
          </LiquidGlassSurface>
        </div>
      </section>
    </main>
  )
}
