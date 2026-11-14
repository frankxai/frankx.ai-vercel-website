'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Layers, ShieldCheck, Sparkles } from 'lucide-react'
import { SystemDiagram, type SystemDiagramId } from './SystemDiagram'

interface ShowcaseItem {
  id: string
  badge: string
  title: string
  presetKey: string
  description: string
  plateSrc: string
  plateAlt: string
  diagramId: SystemDiagramId
  diagramAlt: string
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'agentic-os',
    badge: 'Starlight × InfoGenius v5.3',
    title: 'Agentic Orchestration + Sapphire Glass Architecture',
    presetKey: 'starlight/living-world-hud',
    description:
      'Pairs golden-hour Living-World studio storytelling (tactile ceramic, woven cloud-hoodie CLI, and copper companions) with a deterministic vector architecture HUD so every node, arrow, and label stays razor-sharp.',
    plateSrc: '/images/living-world/studio-agent-orchestration.jpg',
    plateAlt:
      'Founder and tactile robot companions collaborating around a miniature glowing city diorama and an Agent Orchestration glass board.',
    diagramId: 'agentic-os-architecture',
    diagramAlt:
      'Three-column agentic architecture connecting operator and web inputs through a central orchestrator and specialist fleet to memory, MCP skills, models, compute, and knowledge.',
  },
  {
    id: 'clean-stack',
    badge: 'Clean 3-Tier Stack Pattern',
    title: 'Agent Runtime → AI Gateway → Edge Inference',
    presetKey: 'frankx/clean-stack-cards',
    description:
      'Inspired by modern cloud control-plane schematics: decoupled session/tool execution on top, unified authentication/caching/observability in the gateway tier, and multi-provider inference below.',
    plateSrc: '/images/living-world/observatory-cli-companion.jpg',
    plateAlt:
      'Blue cloud-hoodie CLI robot with cyan prompt visor peering through a brass observatory telescope beside a terracotta voxel companion and floating purple cat spirit.',
    diagramId: 'opencode-ai-gateway-stack',
    diagramAlt:
      'Three-tier stack: Agent Runtime & Harnesses, AI Gateway Control Plane, and Frontier & Edge Model Inference.',
  },
  {
    id: 'coe-atelier',
    badge: 'Enterprise & Personal AI CoE',
    title: 'Six-Pillar Center of Excellence Atelier',
    presetKey: 'frankx/coe-blueprint',
    description:
      ' Amsterdam canal studio scene rendered with zero raster text artifacts, paired with the WCAG-verified radial Six-Pillar AI CoE blueprint.',
    plateSrc: '/images/living-world/ai-coe-atelier-backplate.jpg',
    plateAlt:
      'Matte speckled ceramic robot, knitted blue cloud-hoodie robot, and aged-copper goggle robot collaborating around a glowing six-pillar translucent crystal pavilion in a golden-hour Amsterdam canal studio.',
    diagramId: 'ai-coe-six-pillars',
    diagramAlt:
      'Six pillars around an AI center of excellence: strategy, governance, talent, technology, data and ethics.',
  },
  {
    id: 'observatory-synthesis',
    badge: 'Knowledge-First Synthesis',
    title: 'FRANK-Ω Observatory & Visual Estate Pipeline',
    presetKey: 'community/glassmorphic',
    description:
      'From live web-grounded source extraction and JSON specs in git to SHA-256 provenance sidecars (.vis.provenance.json) and multi-theme vector delivery.',
    plateSrc: '/images/living-world/infogenius-frank-omega-studio.jpg',
    plateAlt:
      'Ivory-and-gold optical camera robot and knitted blue cloud-hoodie robot inspecting floating sapphire crystal prisms and luminous aquamarine light threads over indigo star charts in a dusk observatory.',
    diagramId: 'visual-estate',
    diagramAlt:
      'Four tiers: specs in git, deterministic render, a registry and asset library, and serving from each brand site URL path.',
  },
]

export function LivingWorldHudGallery() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = SHOWCASE_ITEMS[activeIndex]

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-200 mb-3">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Hybrid Visual Intelligence · Living-World + Vector HUD
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Cinematic Worlds. Deterministic Precision.
          </h2>
          <p className="mt-2 text-white/60 max-w-2xl text-sm sm:text-base">
            Pure raster AI models excel at warm lighting, tactile materials, and character emotion — while code-compiled SVGs guarantee crisp, selectable, WCAG-verified system typography with zero garbled labels.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-300/90 bg-emerald-500/10 border border-emerald-400/20 rounded-full px-3.5 py-1.5 shrink-0">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          .vis.provenance.json verified
        </div>
      </div>

      {/* Selector tabs */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3" role="tablist" aria-label="Visual Intelligence Series">
        {SHOWCASE_ITEMS.map((item, idx) => {
          const isSelected = idx === activeIndex
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveIndex(idx)}
              className={`text-left rounded-xl border p-3.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                isSelected
                  ? 'border-violet-400/50 bg-violet-500/15 shadow-lg shadow-violet-950/30'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]'
              }`}
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg mb-3 border border-white/10">
                <Image
                  src={item.plateSrc}
                  alt={item.plateAlt}
                  width={480}
                  height={270}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-violet-300/80 mb-1">
                {item.presetKey}
              </p>
              <p className="text-sm font-semibold text-white line-clamp-1">
                {item.title}
              </p>
            </button>
          )
        })}
      </div>

      {/* Active hybrid showcase */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono text-cyan-300">{active.badge}</span>
            <h3 className="text-xl font-bold text-white mt-0.5">{active.title}</h3>
            <p className="text-sm text-zinc-400 mt-1 max-w-3xl">{active.description}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-mono text-zinc-300">
            <Layers className="h-3.5 w-3.5 text-violet-400" aria-hidden="true" />
            Preset: {active.presetKey}
          </span>
        </div>

        <SystemDiagram
          key={active.id}
          diagramId={active.diagramId}
          alt={active.diagramAlt}
          eyebrow={active.badge}
          title={active.title}
          defaultTheme="dark"
          companion={{
            src: active.plateSrc,
            alt: active.plateAlt,
            badge: active.presetKey,
            note: 'Switch between Studio Split, Dark SVG, and Light SVG above.',
          }}
        />
      </div>
    </div>
  )
}

export default LivingWorldHudGallery
