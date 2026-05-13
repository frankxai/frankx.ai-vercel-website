import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  Video,
  Users,
  Film,
  Cpu,
  Building2,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Wrench,
  GitBranch,
  Layers,
  BookOpen,
  Zap,
  LineChart,
} from 'lucide-react'
import { FrankXOSHeader } from '@/components/os/FrankXOSHeader'
import { osModules, getConnections, type ModuleColor, type OSModule } from '@/data/os-modules'

const ICON_MAP = { Video, Users, Film, Cpu, Building2, BookOpen, Zap, LineChart }

const COLOR_TOKENS: Record<ModuleColor, { text: string; bg: string; border: string; glow: string }> = {
  cyan: {
    text: 'text-cyan-300',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/25',
    glow: 'from-cyan-500/[0.08]',
  },
  violet: {
    text: 'text-violet-300',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/25',
    glow: 'from-violet-500/[0.08]',
  },
  amber: {
    text: 'text-amber-300',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/25',
    glow: 'from-amber-500/[0.08]',
  },
  emerald: {
    text: 'text-emerald-300',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/25',
    glow: 'from-emerald-500/[0.08]',
  },
  rose: {
    text: 'text-rose-300',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/25',
    glow: 'from-rose-500/[0.08]',
  },
  slate: {
    text: 'text-zinc-200',
    bg: 'bg-zinc-500/10',
    border: 'border-zinc-500/25',
    glow: 'from-zinc-500/[0.08]',
  },
  fuchsia: {
    text: 'text-fuchsia-300',
    bg: 'bg-fuchsia-500/10',
    border: 'border-fuchsia-500/25',
    glow: 'from-fuchsia-500/[0.08]',
  },
  teal: {
    text: 'text-teal-300',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/25',
    glow: 'from-teal-500/[0.08]',
  },
  lime: {
    text: 'text-lime-300',
    bg: 'bg-lime-500/10',
    border: 'border-lime-500/25',
    glow: 'from-lime-500/[0.08]',
  },
}

export function generateStaticParams() {
  return osModules.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const module = osModules.find((m) => m.slug === slug)
  if (!module) return { title: 'Not found' }
  return {
    title: `${module.name} — FrankX OS`,
    description: `${module.oneLine} ${module.description}`,
    openGraph: {
      title: `${module.name} — FrankX OS`,
      description: module.oneLine,
      type: 'article',
    },
    alternates: { canonical: `https://frankx.ai/os/${module.slug}` },
  }
}

function Schema({ module }: { module: OSModule }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': `https://frankx.ai/os/${module.slug}#app`,
        name: module.name,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Cross-platform',
        description: module.description,
        url: `https://frankx.ai/os/${module.slug}`,
        author: {
          '@type': 'Person',
          name: 'Frank Riemer',
          url: 'https://frankx.ai',
          jobTitle: 'AI Architect',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `https://frankx.ai/os/${module.slug}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'FrankX OS', item: 'https://frankx.ai/os' },
          { '@type': 'ListItem', position: 2, name: module.name, item: `https://frankx.ai/os/${module.slug}` },
        ],
      },
    ],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
}

export default async function OSModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const module = osModules.find((m) => m.slug === slug)
  if (!module) notFound()

  const Icon = ICON_MAP[module.iconName as keyof typeof ICON_MAP] ?? Sparkles
  const tokens = COLOR_TOKENS[module.color]
  const connections = getConnections(module.id)

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <Schema module={module} />
      <FrankXOSHeader currentModuleId={module.id} />

      {/* Hero */}
      <section className="relative pt-20 pb-12 overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-b ${tokens.glow} via-transparent to-transparent`}
          aria-hidden="true"
        />
        <div
          className={`absolute top-16 left-1/3 h-[400px] w-[400px] rounded-full ${tokens.bg} blur-[120px] opacity-60`}
          aria-hidden="true"
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-5">
            <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${tokens.bg}`}>
              <Icon className={`h-6 w-6 ${tokens.text}`} aria-hidden="true" />
            </div>
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${tokens.border} ${tokens.text} ${tokens.bg}`}
            >
              Shipped {module.shipped}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-50 leading-tight tracking-tight mb-4">
            {module.name}
          </h1>

          <p className={`text-lg ${tokens.text} mb-5`}>{module.oneLine}</p>

          <p className="text-base text-zinc-400 leading-relaxed max-w-2xl">{module.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={module.route}
              className={`inline-flex items-center gap-2 rounded-lg border ${tokens.border} ${tokens.bg} px-5 py-2.5 text-sm font-medium ${tokens.text} hover:bg-white/5 transition-colors`}
            >
              Open {module.name}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            {module.deepDive ? (
              <Link
                href={module.deepDive.route}
                className="inline-flex items-center gap-2 rounded-lg border border-white/[0.12] bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-zinc-100 hover:bg-white/[0.08] transition-colors"
              >
                {module.deepDive.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ) : null}
            <Link
              href="/os"
              className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-5 py-2.5 text-sm text-zinc-300 hover:bg-white/[0.04] transition-colors"
            >
              Back to FrankX OS
            </Link>
          </div>

          {module.deepDive ? (
            <p className="mt-3 max-w-2xl text-xs text-zinc-500">{module.deepDive.description}</p>
          ) : null}
        </div>
      </section>

      {/* What it produces */}
      <section className="py-10 border-y border-white/[0.04] bg-white/[0.01]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 mb-3">
                <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                Artifacts
              </div>
              <ul className="space-y-2 text-sm text-zinc-300">
                {module.artifacts.map((artifact) => (
                  <li key={artifact} className="flex items-start gap-2">
                    <span className={`mt-1.5 h-1 w-1 rounded-full ${tokens.bg}`} aria-hidden="true" />
                    <span>{artifact}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 mb-3">
                <Wrench className="h-3.5 w-3.5" aria-hidden="true" />
                Commands
              </div>
              <div className="flex flex-wrap gap-1.5">
                {module.commands.map((c) => (
                  <code
                    key={c}
                    className="inline-flex items-center rounded-md border border-white/[0.08] bg-black/40 px-2 py-1 text-xs font-mono text-zinc-300"
                  >
                    {c}
                  </code>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connections */}
      {connections.length > 0 ? (
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 mb-4">
              <GitBranch className="h-3.5 w-3.5" aria-hidden="true" />
              Feeds into
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {connections.map((conn) => {
                const connTokens = COLOR_TOKENS[conn.color]
                const ConnIcon = ICON_MAP[conn.iconName as keyof typeof ICON_MAP] ?? Sparkles
                return (
                  <Link
                    key={conn.id}
                    href={`/os/${conn.slug}`}
                    className={`group rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-colors`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${connTokens.bg}`}>
                        <ConnIcon className={`h-4 w-4 ${connTokens.text}`} aria-hidden="true" />
                      </div>
                      <span className="font-medium text-zinc-100">{conn.name}</span>
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed">{conn.oneLine}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors">
                      <span>Open</span>
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section className="py-16 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-transparent p-8 text-center">
            <h2 className="text-2xl font-bold text-zinc-50 mb-3">
              Try {module.name} yourself
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-xl mx-auto mb-6">
              The full stack is being packaged as an installable template. One command scaffolds a
              working version of this module in your own project.
            </p>
            <div className="inline-block rounded-lg border border-white/[0.08] bg-black/40 px-4 py-3 font-mono text-sm text-zinc-300">
              <span className="text-zinc-500">$</span> npx create-workshop-os my-ops
            </div>
            <p className="mt-5 text-xs text-zinc-600">
              MIT license · portable across Claude Code, ChatGPT, Codex, Gemini CLI
            </p>
          </div>

          <div className="mt-8 flex items-center justify-between text-xs text-zinc-500">
            <Link
              href="/os"
              className="inline-flex items-center gap-1.5 hover:text-zinc-300 transition-colors"
            >
              All modules
            </Link>
            <Link
              href={module.route}
              className="inline-flex items-center gap-1.5 hover:text-zinc-300 transition-colors"
            >
              Go to {module.name}
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
