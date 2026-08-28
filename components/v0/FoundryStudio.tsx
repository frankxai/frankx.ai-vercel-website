'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { ArrowDown, ArrowUpRight, Monitor, Smartphone, Tablet } from 'lucide-react'

import type { V0Study } from '@/content/v0/foundry'
import { trackEvent } from '@/lib/analytics'
import { studyVisuals } from './studyVisuals'

const viewportOptions = [
  { id: 'desktop' as const, label: 'Desktop', icon: Monitor },
  { id: 'tablet' as const, label: 'Tablet', icon: Tablet },
  { id: 'mobile' as const, label: 'Mobile', icon: Smartphone },
]

const viewportWidth = {
  desktop: 'w-full',
  tablet: 'w-[768px] max-w-full',
  mobile: 'w-[390px] max-w-full',
}

interface StudioScene {
  id: string
  role: string
  title: string
  src: string
  poster: string
  studyId?: number
  chatId?: string
}

export function FoundryStudio({ studies }: { studies: V0Study[] }) {
  const scenes = useMemo(() => {
    const studyScenes = [1, 10, 18]
      .map((id) => studies.find((study) => study.id === id))
      .filter(Boolean)
      .map((study) => {
        const resolvedStudy = study as V0Study
        return {
          id: `study-${resolvedStudy.id}`,
          role: resolvedStudy.id === 1 ? 'v0 composition' : resolvedStudy.id === 10 ? 'Creator study' : 'AI operations',
          title: resolvedStudy.title,
          src: resolvedStudy.demoUrl,
          poster: studyVisuals[resolvedStudy.id]!,
          studyId: resolvedStudy.id,
          chatId: resolvedStudy.chatId,
        } satisfies StudioScene
      })

    return [
      {
        id: 'creator-launch-os',
        role: 'Owned product',
        title: 'Creator Launch OS',
        src: '/embeds/creator-launch-os.html',
        poster: '/images/v0/template/creator-launch-os-desktop.webp',
      },
      ...studyScenes,
    ] satisfies StudioScene[]
  }, [studies])
  const [activeScene, setActiveScene] = useState<StudioScene>(scenes[0]!)
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [frameReady, setFrameReady] = useState(false)

  function selectScene(scene: StudioScene) {
    setFrameReady(false)
    setActiveScene(scene)
    trackEvent('v0_study_previewed', {
      scene_id: scene.id,
      study_id: scene.studyId,
      surface: 'hero_studio',
    })
  }

  return (
    <section className="min-h-screen border-b border-white/10 bg-[#0a0a0b] pt-24 sm:pt-28">
      <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-[1600px] gap-10 px-5 pb-8 sm:px-8 lg:grid-cols-[minmax(310px,0.72fr)_minmax(620px,1.28fr)] lg:items-stretch lg:px-10">
        <div className="flex flex-col justify-between py-5 lg:py-10">
          <div>
            <p className="font-mono text-[11px] font-medium tracking-[0.14em] text-emerald-300/80">
              FrankX / Product Foundry
            </p>
            <h1 className="mt-7 max-w-3xl text-balance font-display text-5xl font-semibold leading-[0.91] tracking-[-0.06em] sm:text-7xl lg:text-[5.25rem]">
              The website is
              <span className="block text-white/32">the workflow.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/62 sm:text-lg sm:leading-8">
              Pick the business you are building. Inspect the live interface. Then take the source
              only when its product, rights, and release evidence hold up.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <a
                href="#free-template"
                onClick={() => trackEvent('v0_primary_cta_clicked', { destination: 'free_template' })}
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 motion-reduce:transition-none"
              >
                Take the free starter
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#workflow"
                onClick={() => trackEvent('v0_secondary_cta_clicked', { destination: 'workflow' })}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                See the build workflow
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <dl className="mt-14 grid grid-cols-3 gap-5 border-t border-white/10 pt-6 lg:mt-10">
            {[
              ['19', 'Live interface studies'],
              ['22', 'Focused business systems'],
              ['1', 'Open release candidate'],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
                  {value}
                </dd>
                <p className="mt-2 text-[11px] leading-4 text-white/38">{label}</p>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex min-w-0 flex-col justify-center gap-3 lg:py-6">
          <div className="overflow-hidden rounded-[1.6rem] border border-white/15 bg-[#111214] shadow-[0_32px_90px_rgba(0,0,0,0.55)] sm:rounded-[2rem]">
            <div className="flex min-h-14 items-center justify-between gap-4 border-b border-white/10 px-4 sm:px-5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="hidden gap-1.5 sm:flex" aria-hidden="true">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                </div>
                <p className="truncate font-mono text-[10px] text-white/48">
                  {activeScene.title} / live interface
                </p>
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px] text-lime-300">
                <span className="h-1.5 w-1.5 rounded-full bg-lime-300 shadow-[0_0_12px_rgba(190,242,100,0.9)]" />
                {frameReady ? 'Live' : 'Loading'}
              </div>
            </div>

            <div className="overflow-x-auto bg-[#080a09] p-2.5 sm:p-4">
              <div
                className={`relative mx-auto h-[520px] overflow-hidden rounded-[1.1rem] border border-white/10 bg-white transition-[width] duration-300 motion-reduce:transition-none sm:h-[650px] ${viewportWidth[viewport]}`}
              >
                <Image
                  src={activeScene.poster}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 64vw, 100vw"
                  className="object-cover object-top"
                  aria-hidden="true"
                />
                <iframe
                  key={activeScene.id}
                  src={activeScene.src}
                  title={`${activeScene.title} interactive preview`}
                  loading="eager"
                  referrerPolicy="strict-origin-when-cross-origin"
                  sandbox="allow-forms allow-popups allow-same-origin allow-scripts"
                  onLoad={() => setFrameReady(true)}
                  className={`absolute inset-0 h-full w-full bg-white transition-opacity duration-300 motion-reduce:transition-none ${frameReady ? 'opacity-100' : 'opacity-0'}`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-white/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <div className="flex w-fit items-center rounded-full border border-white/10 bg-black/20 p-1" role="group" aria-label="Preview width">
                {viewportOptions.map((option) => {
                  const Icon = option.icon
                  const selected = viewport === option.id
                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={selected}
                      title={option.label}
                      onClick={() => {
                        setViewport(option.id)
                        trackEvent('v0_preview_viewport_changed', { viewport: option.id })
                      }}
                      className={`inline-flex min-h-8 items-center gap-2 rounded-full px-3 text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${selected ? 'bg-white text-black' : 'text-white/48 hover:text-white'}`}
                    >
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="hidden sm:inline">{option.label}</span>
                    </button>
                  )
                })}
              </div>
              {activeScene.chatId ? (
                <div className="flex items-center gap-4 text-xs">
                  <a
                    href={activeScene.src}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackEvent('v0_study_opened', { study_id: activeScene.studyId, destination: 'demo' })}
                    className="font-semibold text-white/55 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  >
                    Open full preview
                  </a>
                  <a
                    href={`https://v0.app/chat/${activeScene.chatId}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackEvent('v0_study_opened', { study_id: activeScene.studyId, destination: 'v0' })}
                    className="inline-flex items-center gap-1.5 font-semibold text-emerald-300 hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  >
                    Open in v0
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              ) : (
                <a
                  href="https://github.com/frankxai/creator-launch-os"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent('v0_template_source_clicked', { template: 'creator-launch-os', surface: 'hero_studio' })}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  View public source
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Featured interface studies">
            {scenes.map((scene) => {
              const selected = activeScene.id === scene.id
              return (
                <button
                  key={scene.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => selectScene(scene)}
                  className={`min-w-[150px] flex-1 rounded-2xl border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 sm:min-w-[170px] ${selected ? 'border-[#e8e4da] bg-[#e8e4da] text-[#141512]' : 'border-white/10 bg-[#101113] text-white hover:border-white/20'}`}
                >
                  <span className={`font-mono text-[9px] ${selected ? 'text-black/48' : 'text-white/35'}`}>
                    {scene.role}
                  </span>
                  <span className="mt-2 block truncate text-xs font-semibold">{scene.title}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
