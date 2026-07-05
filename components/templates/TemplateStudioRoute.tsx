import Image from 'next/image'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowUpRight,
  BookOpenText,
  Boxes,
  Code2,
  Compass,
  FileText,
  GitPullRequest,
  Layers,
  LayoutTemplate,
  MonitorCog,
  Sparkles,
  Waypoints,
} from 'lucide-react'

import {
  getV0TemplatePath,
  v0TemplatePrinciples,
  v0TemplateStats,
  type V0TemplateEntry,
  type V0TemplateIcon,
  type V0TemplateStage,
} from '@/data/v0-template-library'
import { getV0TemplateDemandPlan, v0TemplateDemandWaves } from '@/data/v0-template-demand'
import { getV0TemplateProductionPlan } from '@/data/v0-template-production'

type TemplateStudioRouteProps = {
  eyebrow: string
  title: string
  mutedTitle: string
  description: string
  entries: V0TemplateEntry[]
  heroImage: string
  primaryHref: string
  primaryLabel: string
  secondaryHref: string
  secondaryLabel: string
  libraryLabel: string
  libraryTitle: string
  trackLinks?: Array<{
    label: string
    href: string
    description: string
  }>
}

const iconMap: Record<V0TemplateIcon, LucideIcon> = {
  layout: LayoutTemplate,
  command: MonitorCog,
  newsletter: BookOpenText,
  world: Compass,
  workflow: Waypoints,
  proof: GitPullRequest,
  scene: Sparkles,
  market: Boxes,
}

const accentClasses: Record<V0TemplateEntry['accent'], string> = {
  emerald: 'border-emerald-300/25 bg-emerald-300/10 text-emerald-200',
  cyan: 'border-cyan-300/25 bg-cyan-300/10 text-cyan-200',
  amber: 'border-amber-300/25 bg-amber-300/10 text-amber-200',
  violet: 'border-violet-300/25 bg-violet-300/10 text-violet-200',
  rose: 'border-rose-300/25 bg-rose-300/10 text-rose-200',
  blue: 'border-blue-300/25 bg-blue-300/10 text-blue-200',
}

const stageLabels: Record<V0TemplateStage, string> = {
  'live-pattern': 'Live pattern',
  'v0-prototype': 'v0 prototype',
  'sprint-seed': 'Sprint seed',
  'internal-system': 'Internal system',
}

const processSteps = [
  {
    label: 'Brief',
    title: 'Scene and buyer contract',
    body: 'Codex defines the buyer, route, proof, asset tier, and acceptance gate before v0 gets a prompt.',
  },
  {
    label: 'v0',
    title: 'One focused surface',
    body: 'v0 explores the visual frontend only: hierarchy, sections, component rhythm, responsive states.',
  },
  {
    label: 'Codex',
    title: 'Repo hardening',
    body: 'Codex imports, normalizes tokens, removes generic residue, wires data, and owns tests, README, issues, and PRs.',
  },
  {
    label: 'Ship',
    title: 'Evidence before public',
    body: 'A template reaches the library only with a public route or preview, inspected media, and a clear next action.',
  },
]

function TemplateCard({ entry }: { entry: V0TemplateEntry }) {
  const Icon = iconMap[entry.icon]
  const accent = accentClasses[entry.accent]
  const detailHref = getV0TemplatePath(entry)
  const liveHref = entry.publicPreviewUrl ?? (entry.route && entry.route !== '/v' ? entry.route : undefined)
  const demand = getV0TemplateDemandPlan(entry)
  const production = getV0TemplateProductionPlan(entry)

  return (
    <article className="group overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.035]">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10 bg-[#08090a]">
        <Image
          src={entry.previewImage}
          alt=""
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover opacity-80 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/10 to-transparent" />
        <span className={`absolute left-4 top-4 inline-flex items-center rounded-full border px-3 py-1 text-xs ${accent}`}>
          {stageLabels[entry.stage]}
        </span>
      </div>

      <div className="space-y-5 p-5">
        <div className="flex items-start gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] border ${accent}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-white/50">{entry.brand} / {entry.family}</p>
            <h2 className="mt-1 text-xl font-semibold text-white">{entry.title}</h2>
          </div>
        </div>

        <p className="text-sm leading-6 text-white/65">{entry.audience}</p>

        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-white/40">Asset</dt>
            <dd className="mt-1 text-white/80">{entry.assetTier}</dd>
          </div>
          <div>
            <dt className="text-white/40">Status</dt>
            <dd className="mt-1 text-white/80">{entry.status}</dd>
          </div>
          <div>
            <dt className="text-white/40">Demand</dt>
            <dd className="mt-1 text-white/80">{demand.tierLabel}</dd>
          </div>
          <div>
            <dt className="text-white/40">Wave</dt>
            <dd className="mt-1 text-white/80">{demand.waveLabel}</dd>
          </div>
          <div>
            <dt className="text-white/40">Lane</dt>
            <dd className="mt-1 text-white/80">{production.laneLabel}</dd>
          </div>
          <div>
            <dt className="text-white/40">Priority</dt>
            <dd className="mt-1 text-white/80">
              {production.priority} · Issue #{production.issue.number}
            </dd>
          </div>
        </dl>

        <div>
          <p className="text-sm text-white/40">Best for</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {entry.bestFor.map((item) => (
              <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/65">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm text-white/40">Package with</p>
          <p className="mt-2 text-sm leading-6 text-white/70">{entry.packageWith.join(' / ')}</p>
        </div>

        <div>
          <p className="text-sm text-white/40">Production rule</p>
          <p className="mt-2 text-sm leading-6 text-white/70">{production.publicReadiness}</p>
        </div>

        <div className="space-y-2 border-t border-white/10 pt-4">
          <p className="text-sm text-white/40">Next action</p>
          <p className="text-sm leading-6 text-white/75">{production.nextSprintMove}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href={detailHref}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-white/85"
          >
            Open package
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          {liveHref && (
            <Link
              href={liveHref}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/75 transition hover:border-white/30 hover:text-white"
            >
              Route
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          )}
          <a
            href={production.issue.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/75 transition hover:border-white/30 hover:text-white"
          >
            Issue #{production.issue.number}
            <GitPullRequest className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  )
}

export function TemplateStudioRoute({
  eyebrow,
  title,
  mutedTitle,
  description,
  entries,
  heroImage,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  libraryLabel,
  libraryTitle,
  trackLinks,
}: TemplateStudioRouteProps) {
  const pageStats = [
    { label: 'Visible here', value: String(entries.length) },
    ...v0TemplateStats.slice(1),
  ]
  const visibleDemandWaves = v0TemplateDemandWaves.filter((wave) =>
    entries.some((entry) => getV0TemplateDemandPlan(entry).wave === wave.id),
  )

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(16,185,129,0.16),transparent_34%,rgba(6,182,212,0.11)_66%,transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-36">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
              <Code2 className="h-4 w-4 text-emerald-200" />
              {eyebrow}
            </div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] text-white md:text-7xl">
              {title}
              <span className="block text-white/55">{mutedTitle}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/65">{description}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={primaryHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/85"
              >
                {primaryLabel}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href={secondaryHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/80 transition hover:border-white/30 hover:text-white"
              >
                {secondaryLabel}
                <FileText className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.035]">
              <div className="relative aspect-[16/10]">
                <Image
                  src={heroImage}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {pageStats.map((stat) => (
                <div key={stat.label} className="rounded-[8px] border border-white/10 bg-black/35 p-4">
                  <p className="text-2xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-1 text-xs text-white/50">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm text-emerald-200">Operating standard</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
              v0 is the visual accelerator. Codex is the product spine.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {v0TemplatePrinciples.map((principle) => (
              <div key={principle} className="rounded-[8px] border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm leading-6 text-white/72">{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm text-cyan-200">Demand waves</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
              Build where v0 speed meets a real buyer pull.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/60">
              These waves turn the public v0, Vercel, and GetLayers benchmark into sprint lanes: what to create,
              what proof to collect, and where Codex should take over.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {visibleDemandWaves.map((wave) => (
              <div key={wave.id} className="rounded-[8px] border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm font-medium text-white">{wave.label}</p>
                <p className="mt-3 text-sm leading-6 text-white/62">{wave.signal}</p>
                <p className="mt-3 text-sm leading-6 text-white/52">{wave.winningAngle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {trackLinks && trackLinks.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-10">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {trackLinks.map((track) => (
              <Link
                key={track.href}
                href={track.href}
                className="group rounded-[8px] border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-base font-semibold text-white">{track.label}</h2>
                  <ArrowUpRight className="h-4 w-4 text-white/40 transition group-hover:text-white" />
                </div>
                <p className="mt-3 text-sm leading-6 text-white/58">{track.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm text-cyan-200">{libraryLabel}</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">{libraryTitle}</h2>
          </div>
          <Link
            href="/product-development"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/65 transition hover:text-white"
          >
            Product development loop
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {entries.map((entry) => (
            <TemplateCard key={entry.id} entry={entry} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="border-y border-white/10 py-12">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-[8px] border border-emerald-300/25 bg-emerald-300/10 text-emerald-200">
                <Layers className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-semibold text-white md:text-4xl">How a template becomes a FrankX asset</h2>
              <p className="mt-5 text-sm leading-7 text-white/60">
                Every public template moves through a small loop: brief, v0, Codex, evidence.
                That keeps taste high and token spend attached to a ship path.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {processSteps.map((step) => (
                <div key={step.label} className="rounded-[8px] border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-sm text-emerald-200">{step.label}</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/60">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
