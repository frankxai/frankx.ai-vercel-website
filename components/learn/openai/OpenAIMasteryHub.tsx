'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenCheck,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  Code2,
  FileCheck2,
  Github,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'

import { trackEvent } from '@/lib/analytics'
import {
  OPENAI_MASTERY_VERIFIED_AT,
  getResourcesForMode,
  openAIModes,
  openAIResources,
  openAIRolePaths,
  openAIUpdates,
  type OpenAIAudience,
  type OpenAIMode,
  type OpenAIResource,
  type OpenAISurface,
} from '@/data/openai-mastery'

const modePresentation: Record<
  Exclude<OpenAISurface, 'api'>,
  {
    icon: typeof MessageSquareText
    accent: string
    border: string
    background: string
  }
> = {
  chat: {
    icon: MessageSquareText,
    accent: 'text-cyan-200',
    border: 'border-cyan-300/20',
    background: 'bg-cyan-300/[0.05]',
  },
  work: {
    icon: BriefcaseBusiness,
    accent: 'text-emerald-200',
    border: 'border-emerald-300/25',
    background: 'bg-emerald-300/[0.06]',
  },
  codex: {
    icon: Code2,
    accent: 'text-amber-200',
    border: 'border-amber-300/20',
    background: 'bg-amber-300/[0.05]',
  },
}

const statusLabels: Record<OpenAIResource['status'], string> = {
  evergreen: 'Evergreen',
  current: 'Current',
  upcoming: 'Upcoming',
  replay: 'Replay',
  stale: 'Stale',
  deprecated: 'Deprecated',
}

function trackDestination(
  eventName: string,
  destination: string,
  extra: Record<string, string> = {},
) {
  trackEvent(eventName, { destination, ...extra })
}

function ModeLink({
  mode,
  placement,
  className,
}: {
  mode: OpenAIMode
  placement: string
  className: string
}) {
  return (
    <Link
      href={mode.href}
      className={className}
      onClick={() =>
        trackDestination('openai_mastery_mode_opened', mode.href, {
          mode: mode.id,
          placement,
        })
      }
    >
      Open the {mode.label} path
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  )
}

function ResourceRow({
  resource,
  surface,
}: {
  resource: OpenAIResource
  surface: Exclude<OpenAISurface, 'api'>
}) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackDestination('openai_mastery_resource_opened', resource.url, {
          resource_id: resource.id,
          surface,
          provider: resource.provider,
        })
      }
      className="group grid gap-3 border-t border-white/[0.07] py-5 transition-colors hover:bg-white/[0.025] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-300 sm:grid-cols-[1fr_auto] sm:px-3"
      aria-label={`${resource.title} from ${resource.provider} (opens in a new tab)`}
    >
      <span>
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-display text-base font-semibold text-white">
            {resource.title}
          </span>
          <span className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.13em] text-[#a9a9af]">
            {statusLabels[resource.status]}
          </span>
        </span>
        <span className="mt-2 block text-sm leading-6 text-[#a9a9af]">
          {resource.summary}
        </span>
        {resource.recordedBeforeWorkLaunch && (
          <span className="mt-2 block text-xs leading-5 text-amber-100/70">
            Recorded before ChatGPT Work launched; the workflow still applies, but
            nontechnical users should now start in Work.
          </span>
        )}
      </span>
      <span className="flex items-center gap-2 self-center text-xs font-medium text-[#8e8e95] transition-colors group-hover:text-white">
        {resource.provider}
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
    </a>
  )
}

export default function OpenAIMasteryHub() {
  const [activeRoleId, setActiveRoleId] = useState<OpenAIAudience>('founder')
  const activeRole =
    openAIRolePaths.find((role) => role.id === activeRoleId) ?? openAIRolePaths[0]
  const primaryMode =
    openAIModes.find((mode) => mode.id === activeRole.primarySurface) ??
    openAIModes[1]
  const secondaryMode =
    openAIModes.find((mode) => mode.id === activeRole.secondarySurface) ??
    openAIModes[0]
  const githubResources = openAIResources.filter(
    (resource) => resource.format === 'github',
  )

  return (
    <main className="min-h-screen bg-[#08090a] text-white">
      <section className="relative overflow-hidden border-b border-white/[0.07] pt-32">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'linear-gradient(120deg, rgba(16,185,129,0.11), transparent 34%), linear-gradient(300deg, rgba(6,182,212,0.07), transparent 28%)',
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-20 sm:px-6 lg:pb-28">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#a9a9af]">
            <span className="text-emerald-300">OpenAI Mastery</span>
            <span aria-hidden="true">/</span>
            <span>Verified {OPENAI_MASTERY_VERIFIED_AT}</span>
          </div>

          <h1 className="mt-8 max-w-5xl font-display text-5xl font-bold leading-[0.97] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
            Choose the right mode before you learn the wrong workflow.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-[#b8b8bd] sm:text-xl">
            Chat thinks with you. ChatGPT Work completes substantial, reviewable
            outcomes. Codex builds and validates software. Start with the job in
            front of you—not the most technical-looking tool.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#route-selector"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090a]"
            >
              Find my path
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="https://learn.chatgpt.com/docs/use-chatgpt"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackDestination(
                  'openai_mastery_resource_opened',
                  'https://learn.chatgpt.com/docs/use-chatgpt',
                  { resource_id: 'use-chatgpt', placement: 'hero' },
                )
              }
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090a]"
            >
              Read OpenAI&apos;s chooser
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-16 grid gap-4 border-t border-white/[0.07] pt-6 sm:grid-cols-3">
            {openAIModes.map((mode) => {
              const presentation = modePresentation[mode.id]
              const Icon = presentation.icon
              return (
                <div key={mode.id} className="flex items-start gap-3">
                  <Icon
                    className={`mt-0.5 h-4 w-4 shrink-0 ${presentation.accent}`}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">{mode.label}</p>
                    <p className="mt-1 text-xs leading-5 text-[#8e8e95]">
                      {mode.promise}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section
        id="route-selector"
        className="scroll-mt-24 border-b border-white/[0.07] py-24 lg:py-32"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-emerald-300/75">
                60-second route selector
              </p>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                Start from your role.
              </h2>
              <p className="mt-5 max-w-md text-[16px] leading-7 text-[#b8b8bd]">
                Roles change the recommended starting point, not the underlying
                curriculum. This keeps the system useful without creating five
                repetitive academies.
              </p>

              <div
                className="mt-8 flex flex-wrap gap-2"
                role="group"
                aria-label="Choose your role"
              >
                {openAIRolePaths.map((role) => {
                  const selected = role.id === activeRole.id
                  return (
                    <button
                      key={role.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => {
                        setActiveRoleId(role.id)
                        trackEvent('openai_mastery_role_selected', {
                          role: role.id,
                          primary_surface: role.primarySurface,
                        })
                      }}
                      className={`min-h-11 rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 ${
                        selected
                          ? 'border-emerald-300/50 bg-emerald-300/10 text-emerald-100'
                          : 'border-white/10 bg-white/[0.025] text-[#b8b8bd] hover:border-white/25 hover:text-white'
                      }`}
                    >
                      {role.shortLabel}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/[0.1] bg-[#101113]">
              <div className="border-b border-white/[0.08] p-7 sm:p-9">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-200/80">
                    {activeRole.label}
                  </p>
                </div>
                <h3 className="mt-5 font-display text-3xl font-semibold tracking-[-0.035em] text-white">
                  Start in {primaryMode.label}. Keep {secondaryMode.label} nearby.
                </h3>
                <p className="mt-4 max-w-2xl text-[16px] leading-7 text-[#b8b8bd]">
                  {activeRole.promise}
                </p>
              </div>

              <div className="grid gap-px bg-white/[0.08] sm:grid-cols-2">
                {[primaryMode, secondaryMode].map((mode, index) => {
                  const presentation = modePresentation[mode.id]
                  const Icon = presentation.icon
                  return (
                    <div key={mode.id} className="bg-[#101113] p-7 sm:p-8">
                      <p className={`flex items-center gap-2 text-sm font-semibold ${presentation.accent}`}>
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        {index === 0 ? 'Primary mode' : 'Supporting mode'}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-[#a9a9af]">
                        {mode.promise}
                      </p>
                      <ModeLink
                        mode={mode}
                        placement="role-selector"
                        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                      />
                    </div>
                  )
                })}
              </div>

              <div className="border-t border-white/[0.08] p-7 sm:p-9">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8e8e95]">
                  Your first useful task
                </p>
                <p className="mt-3 text-lg leading-8 text-white">
                  {activeRole.firstTask}
                </p>
                <Link
                  href={activeRole.nextHref}
                  onClick={() =>
                    trackDestination(
                      'openai_mastery_role_next_step',
                      activeRole.nextHref,
                      { role: activeRole.id },
                    )
                  }
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-200 hover:text-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                >
                  {activeRole.nextLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-300/75">
              Three products, three operating loops
            </p>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Learn the boundary, then learn the tool.
            </h2>
            <p className="mt-5 text-[16px] leading-7 text-[#b8b8bd]">
              The important skill is not memorizing menus. It is recognizing the
              kind of work you are asking an agent to do and giving it a result
              you can review.
            </p>
          </div>

          <div className="mt-12 border-b border-white/[0.08]">
            {openAIModes.map((mode, index) => {
              const presentation = modePresentation[mode.id]
              const Icon = presentation.icon
              return (
                <article
                  key={mode.id}
                  className="grid gap-8 border-t border-white/[0.08] py-10 lg:grid-cols-[0.55fr_1fr_1fr]"
                >
                  <div>
                    <p className={`flex items-center gap-2 text-sm font-semibold ${presentation.accent}`}>
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      0{index + 1}
                    </p>
                    <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.035em] text-white">
                      {mode.label}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#a9a9af]">
                      {mode.promise}
                    </p>
                    <ModeLink
                      mode={mode}
                      placement="mode-comparison"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                    />
                  </div>

                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8e8e95]">
                      Use it when
                    </p>
                    <ul className="mt-4 space-y-3">
                      {mode.useWhen.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm leading-6 text-[#b8b8bd]"
                        >
                          <Check
                            className="mt-1 h-3.5 w-3.5 shrink-0 text-emerald-300"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 border-l border-amber-300/25 pl-4 text-xs leading-5 text-amber-100/65">
                      Not for: {mode.notFor}
                    </p>
                  </div>

                  <div
                    className={`rounded-2xl border p-6 ${presentation.border} ${presentation.background}`}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#a9a9af]">
                      Starter workflow
                    </p>
                    <h4 className="mt-3 text-lg font-semibold text-white">
                      {mode.starter.title}
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-[#b8b8bd]">
                      {mode.starter.outcome}
                    </p>
                    <ol className="mt-5 space-y-3">
                      {mode.starter.steps.map((step, stepIndex) => (
                        <li
                          key={step}
                          className="grid grid-cols-[24px_1fr] gap-3 text-xs leading-5 text-[#a9a9af]"
                        >
                          <span className="font-mono text-emerald-200">
                            {stepIndex + 1}.
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-[#0d0e10] py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-emerald-300/75">
                Current as of July 29
              </p>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] text-white">
                What changed.
              </h2>
              <p className="mt-5 max-w-md text-[16px] leading-7 text-[#b8b8bd]">
                This is the correction layer the old Codex page was missing. The
                product moved; the learning path has to move with it.
              </p>
            </div>

            <ol className="border-b border-white/[0.07]">
              {openAIUpdates.map((update) => (
                <li
                  key={`${update.date}-${update.title}`}
                  className="grid gap-4 border-t border-white/[0.07] py-6 sm:grid-cols-[112px_1fr_auto] sm:items-start sm:px-3"
                >
                  <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.13em] text-emerald-200/75">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                    {update.date}
                  </span>
                  <span>
                    <span className="block font-semibold text-white">
                      {update.title}
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-[#a9a9af]">
                      {update.summary}
                    </span>
                  </span>
                  <a
                    href={update.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackDestination(
                        'openai_mastery_update_source_opened',
                        update.href,
                        { update_date: update.date },
                      )
                    }
                    className="inline-flex items-center gap-2 text-xs font-medium text-[#8e8e95] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                    aria-label={`Read the source for ${update.title} (opens in a new tab)`}
                  >
                    Source
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-300/75">
                Verified learning sequence
              </p>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                Small playlists, not a resource landfill.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#a9a9af]">
              Official documentation first, Academy teaching second, active
              repositories after the workflow makes sense.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {openAIModes.map((mode) => {
              const presentation = modePresentation[mode.id]
              const Icon = presentation.icon
              const resources = getResourcesForMode(mode.id).slice(0, 5)
              return (
                <section
                  key={mode.id}
                  aria-labelledby={`${mode.id}-resources-heading`}
                  className="rounded-3xl border border-white/[0.09] bg-white/[0.018] p-6 sm:p-7"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3
                      id={`${mode.id}-resources-heading`}
                      className="flex items-center gap-3 font-display text-2xl font-semibold text-white"
                    >
                      <Icon className={`h-5 w-5 ${presentation.accent}`} aria-hidden="true" />
                      {mode.label}
                    </h3>
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#77777f]">
                      {resources.length} picks
                    </span>
                  </div>
                  <div className="mt-5 border-b border-white/[0.07]">
                    {resources.map((resource) => (
                      <ResourceRow
                        key={resource.id}
                        resource={resource}
                        surface={mode.id}
                      />
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-[#0d0e10] py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
            <div>
              <div className="flex items-center gap-3">
                <Github className="h-5 w-5 text-white" aria-hidden="true" />
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-emerald-300/75">
                  Builder source shelf
                </p>
              </div>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] text-white">
                Repositories worth opening.
              </h2>
              <p className="mt-5 text-[16px] leading-7 text-[#b8b8bd]">
                Official, active, and tied to a real next step. Popularity alone
                is not enough: the deprecated <code>openai/skills</code> catalog
                is deliberately excluded in favor of <code>openai/plugins</code>.
              </p>
            </div>

            <div className="border-b border-white/[0.07]">
              {githubResources.map((resource) => (
                <a
                  key={resource.id}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackDestination(
                      'openai_mastery_repository_opened',
                      resource.url,
                      { repository_id: resource.id },
                    )
                  }
                  className="group grid gap-4 border-t border-white/[0.07] py-6 transition-colors hover:bg-white/[0.025] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-300 sm:grid-cols-[1fr_auto] sm:px-3"
                  aria-label={`${resource.title} on GitHub (opens in a new tab)`}
                >
                  <span>
                    <span className="font-display text-xl font-semibold text-white">
                      {resource.title}
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-[#a9a9af]">
                      {resource.summary}
                    </span>
                    {resource.qualitySignals && (
                      <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.12em] text-emerald-200/65">
                        {resource.qualitySignals}
                      </span>
                    )}
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 self-center text-[#77777f] transition-colors group-hover:text-white"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="overflow-hidden rounded-3xl border border-white/[0.1] bg-[#101113]">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <div className="p-8 sm:p-10 lg:p-14">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-300/75">
                    From learning to an operating system
                  </p>
                </div>
                <h2 className="mt-6 max-w-3xl font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                  Start with one workflow that produces evidence.
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-[#b8b8bd]">
                  If you run a business or team, map one recurring outcome and
                  test it in Work. If you build software, give Codex one bounded
                  repository task. Review the result before you expand the
                  system.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/foundry"
                    onClick={() =>
                      trackDestination(
                        'openai_mastery_cta_opened',
                        '/foundry',
                        { cta: 'operator-implementation' },
                      )
                    }
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-300 px-6 py-3 text-sm font-semibold text-[#06110d] transition-colors hover:bg-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101113]"
                  >
                    Design an operating workflow
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/learn/codex-mastery"
                    onClick={() =>
                      trackDestination(
                        'openai_mastery_cta_opened',
                        '/learn/codex-mastery',
                        { cta: 'developer-path' },
                      )
                    }
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101113]"
                  >
                    Start the Codex path
                  </Link>
                </div>
              </div>

              <div className="border-t border-white/[0.08] p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
                <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-[#8e8e95]">
                  Release standard
                </p>
                <ul className="mt-6 space-y-5">
                  {[
                    {
                      icon: FileCheck2,
                      text: 'Every substantial output is opened and reviewed.',
                    },
                    {
                      icon: ShieldCheck,
                      text: 'Important numbers, names, dates, and claims are verified.',
                    },
                    {
                      icon: BookOpenCheck,
                      text: 'Volatile resources carry a visible review date and status.',
                    },
                  ].map(({ icon: Icon, text }) => (
                    <li
                      key={text}
                      className="flex items-start gap-3 text-sm leading-6 text-[#b8b8bd]"
                    >
                      <Icon
                        className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300"
                        aria-hidden="true"
                      />
                      {text}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 border-t border-white/[0.08] pt-6 text-xs leading-5 text-[#77777f]">
                  Independent FrankX curation. Not affiliated with or endorsed
                  by OpenAI. Product availability, usage, and pricing can change;
                  verify important decisions in the linked official sources.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

