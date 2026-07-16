import Link from 'next/link'
import type { ComponentType, ReactNode } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { BaseContentItem, ContentStatus, FlowStep, OfferLadderTier } from '@/data/platform/types'

type IconComponent = ComponentType<{ className?: string }>

const statusStyles: Record<ContentStatus, string> = {
  live: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200',
  draft: 'border-cyan-400/30 bg-cyan-500/10 text-cyan-200',
  concept: 'border-white/15 bg-white/[0.05] text-white/65',
  active: 'border-amber-400/30 bg-amber-500/10 text-amber-200',
  canonical: 'border-violet-400/30 bg-violet-500/10 text-violet-200',
  'coming-soon': 'border-white/15 bg-white/[0.05] text-white/65',
  'research-note': 'border-sky-400/30 bg-sky-500/10 text-sky-200',
}

function titleCase(value: string) {
  return value
    .replace(/-/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function PlatformShell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <main className={cn('relative min-h-screen overflow-hidden bg-[#0a0a0b] text-white', className)}>
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-[#0a0a0b]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(52,211,153,0.055),transparent_34%,rgba(34,211,238,0.045)_68%,transparent)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/25 to-transparent" />
        <div className="absolute inset-x-0 top-[42vh] h-px bg-gradient-to-r from-transparent via-cyan-300/10 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
      </div>
      {children}
    </main>
  )
}

export function SectionHeader({
  eyebrow,
  title,
  deck,
  className,
}: {
  eyebrow?: string
  title: string
  deck?: string
  className?: string
}) {
  return (
    <div className={cn('max-w-3xl', className)}>
      {eyebrow ? (
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-300/70">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {deck ? <p className="mt-4 text-sm leading-7 text-white/55 sm:text-base">{deck}</p> : null}
    </div>
  )
}

export function StatusBadge({ status }: { status: ContentStatus }) {
  return (
    <span className={cn('rounded-full border px-2.5 py-1 text-[11px] font-semibold', statusStyles[status])}>
      {titleCase(status)}
    </span>
  )
}

export function PlatformHero({
  eyebrow,
  title,
  highlight,
  deck,
  primaryCta,
  secondaryCta,
  metrics = [],
  visualTitle = 'Operating stack',
  visualItems = [],
}: {
  eyebrow: string
  title: string
  highlight?: string
  deck: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  metrics?: { label: string; value: string }[]
  visualTitle?: string
  visualItems?: string[]
}) {
  return (
    <section className="relative px-6 pt-28 pb-16 sm:pt-36 lg:pb-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_420px] lg:items-end">
        <div>
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-300/75">
            {eyebrow}
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
            {highlight ? (
              <span className="block bg-gradient-to-r from-emerald-300 via-cyan-300 to-white bg-clip-text text-transparent">
                {highlight}
              </span>
            ) : null}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/62 sm:text-lg">
            {deck}
          </p>
          {(primaryCta || secondaryCta) ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {primaryCta ? (
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
                >
                  {primaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : null}
              {secondaryCta ? (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/25 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
                >
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          ) : null}
          {metrics.length ? (
            <div className="mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.label} className="border-l border-white/10 pl-4">
                  <p className="text-xl font-semibold text-white">{metric.value}</p>
                  <p className="mt-1 text-xs leading-5 text-white/42">{metric.label}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute -inset-x-8 inset-y-8 border-y border-cyan-300/[0.05]" />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/35 backdrop-blur">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                {visualTitle}
              </p>
              <span className="h-2 w-2 rounded-full bg-emerald-300 motion-safe:animate-pulse" />
            </div>
            <div className="space-y-3">
              {(visualItems.length ? visualItems : ['Research', 'Prototype', 'Product']).map((item, index) => (
                <div
                  key={item}
                  className="group flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-black/20 p-3 transition hover:border-emerald-300/25 hover:bg-white/[0.05]"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.06] text-xs font-semibold text-emerald-200">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm text-white/72">{item}</span>
                  <span className="ml-auto h-px w-10 bg-gradient-to-r from-emerald-300/60 to-transparent opacity-50 transition group-hover:w-14" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function PlatformCard({
  title,
  excerpt,
  href,
  tags,
  icon: Icon,
  meta,
  className,
}: {
  title: string
  excerpt: string
  href?: string
  tags?: string[]
  icon?: IconComponent
  meta?: ReactNode
  className?: string
}) {
  const content = (
    <>
      <div className="mb-5 flex items-start justify-between gap-4">
        {Icon ? (
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
            <Icon className="h-5 w-5" />
          </div>
        ) : (
          <span className="h-px w-12 bg-gradient-to-r from-emerald-300/70 to-transparent" />
        )}
        {meta ? <div className="shrink-0">{meta}</div> : null}
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-white/55">{excerpt}</p>
      {tags?.length ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.slice(0, 4).map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/45">
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      {href ? (
        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300">
          Open
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </div>
      ) : null}
    </>
  )

  const classes = cn(
    'group relative h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.035] p-6 transition duration-300 hover:border-white/[0.16] hover:bg-white/[0.055]',
    className,
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        {content}
      </Link>
    )
  }

  return (
    <div className={classes}>
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {content}
    </div>
  )
}

export function ContentIndex({
  items,
  ctaFallback = '/newsletter',
}: {
  items: BaseContentItem[]
  ctaFallback?: string
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <Link
          key={item.slug}
          href={item.ctaHref || ctaFallback}
          className="group rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 transition hover:border-emerald-300/25 hover:bg-white/[0.055] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/38">
                {item.category}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
            </div>
            <StatusBadge status={item.status} />
          </div>
          <p className="mt-3 text-sm leading-6 text-white/55">{item.excerpt}</p>
          {item.audience?.length ? (
            <p className="mt-4 text-xs text-white/35">For {item.audience.join(', ')}</p>
          ) : null}
          <div className="mt-5 flex flex-wrap gap-2">
            {item.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="rounded-full bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/42">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300">
            {item.ctaLabel || 'View'}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </div>
        </Link>
      ))}
    </div>
  )
}

export function SystemFlow({
  steps,
  compact = false,
}: {
  steps: FlowStep[]
  compact?: boolean
}) {
  return (
    <div className={cn('grid gap-3', compact ? 'md:grid-cols-3' : 'md:grid-cols-3 lg:grid-cols-5')}>
      {steps.map((step, index) => (
        <div
          key={`${step.title}-${index}`}
          className="relative rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5"
        >
          {index < steps.length - 1 ? (
            <div className="absolute left-[calc(100%-6px)] top-1/2 hidden h-px w-3 bg-gradient-to-r from-emerald-300/45 to-transparent md:block" />
          ) : null}
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-300/25 bg-emerald-500/10 text-xs font-semibold text-emerald-200">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="h-px flex-1 bg-white/[0.07]" />
          </div>
          <h3 className="text-sm font-semibold text-white">{step.title}</h3>
          <p className="mt-2 text-xs leading-5 text-white/48">{step.description}</p>
        </div>
      ))}
    </div>
  )
}

export function ArchitectureDiagram({
  layers,
}: {
  layers: FlowStep[]
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-black/20 p-4">
      <div className="grid gap-3 md:grid-cols-2">
        {layers.map((layer, index) => (
          <div
            key={layer.title}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-sm font-semibold text-white">{layer.title}</h3>
              <span className="text-[11px] font-semibold text-cyan-200/70">
                L{index + 1}
              </span>
            </div>
            <p className="mt-2 text-xs leading-5 text-white/48">{layer.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function OfferLadder({ tiers }: { tiers: OfferLadderTier[] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025]">
      {tiers.map((tier, index) => (
        <div
          key={tier.tier}
          className="grid gap-4 border-b border-white/[0.07] p-5 last:border-b-0 md:grid-cols-[0.7fr_1fr_2fr]"
        >
          <div>
            <p className="text-sm font-semibold text-white">{tier.tier}</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-emerald-300/55">
              Step {index + 1}
            </p>
          </div>
          <p className="text-sm leading-6 text-white/58">{tier.role}</p>
          <div className="flex flex-wrap gap-2">
            {tier.items.map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/55">
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function CTASection({
  eyebrow,
  title,
  deck,
  primary,
  secondary,
}: {
  eyebrow?: string
  title: string
  deck: string
  primary: { label: string; href: string }
  secondary?: { label: string; href: string }
}) {
  return (
    <section className="px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.04] p-8 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            {eyebrow ? (
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-300/70">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">{deck}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              href={primary.href}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
            >
              {primary.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
            {secondary ? (
              <Link
                href={secondary.href}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/25 hover:bg-white/[0.07]"
              >
                {secondary.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-white/58">
          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
