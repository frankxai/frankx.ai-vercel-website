import Image from 'next/image'
import React from 'react'

export interface TechItem {
  id: 'openai' | 'anthropic' | 'antigravity' | 'hermes' | 'openclaw' | 'groq' | 'cerebras' | 'nvidia' | 'omega'
  name: string
  category: string
  logo: string
  color: string
  border: string
  bg: string
}

const TECH_CATALOG: Record<string, TechItem> = {
  openai: {
    id: 'openai',
    name: 'OpenAI',
    category: 'Frontier Reasoning Engine',
    logo: '/images/logos/openai.svg',
    color: 'text-emerald-400',
    border: 'border-emerald-500/20 hover:border-emerald-500/50',
    bg: 'bg-emerald-500/[0.04]',
  },
  anthropic: {
    id: 'anthropic',
    name: 'Anthropic',
    category: 'Claude & MCP Protocol',
    logo: '/images/logos/anthropic.svg',
    color: 'text-amber-400',
    border: 'border-amber-500/20 hover:border-amber-500/50',
    bg: 'bg-amber-500/[0.04]',
  },
  antigravity: {
    id: 'antigravity',
    name: 'Google Antigravity',
    category: 'DeepMind Agent Platform',
    logo: '/images/logos/antigravity.svg',
    color: 'text-cyan-400',
    border: 'border-cyan-500/20 hover:border-cyan-500/50',
    bg: 'bg-cyan-500/[0.04]',
  },
  hermes: {
    id: 'hermes',
    name: 'Hermes Agent',
    category: 'Nous Open Substrate',
    logo: '/images/logos/hermes.svg',
    color: 'text-amber-500',
    border: 'border-amber-500/20 hover:border-amber-500/50',
    bg: 'bg-amber-500/[0.04]',
  },
  openclaw: {
    id: 'openclaw',
    name: 'OpenClaw',
    category: 'Autonomous Agent Framework',
    logo: '/images/logos/openclaw.svg',
    color: 'text-emerald-400',
    border: 'border-emerald-500/20 hover:border-emerald-500/50',
    bg: 'bg-emerald-500/[0.04]',
  },
  omega: {
    id: 'omega',
    name: 'FrankX Ω',
    category: 'Sovereign Agent Kernel',
    logo: '/images/logos/frankx-omega.svg',
    color: 'text-amber-400',
    border: 'border-amber-500/30 hover:border-amber-500/60',
    bg: 'bg-amber-500/[0.06]',
  },
  groq: {
    id: 'groq',
    name: 'Groq LPU',
    category: 'SRAM Spatial Computing',
    logo: '/images/logos/groq.svg',
    color: 'text-rose-400',
    border: 'border-rose-500/20 hover:border-rose-500/50',
    bg: 'bg-rose-500/[0.04]',
  },
  cerebras: {
    id: 'cerebras',
    name: 'Cerebras CS-3',
    category: '44GB Wafer-Scale Silicon',
    logo: '/images/logos/cerebras.svg',
    color: 'text-orange-400',
    border: 'border-orange-500/20 hover:border-orange-500/50',
    bg: 'bg-orange-500/[0.04]',
  },
  nvidia: {
    id: 'nvidia',
    name: 'NVIDIA GB200',
    category: 'Blackwell Supercluster',
    logo: '/images/logos/nvidia.svg',
    color: 'text-lime-400',
    border: 'border-lime-500/20 hover:border-lime-500/50',
    bg: 'bg-lime-500/[0.04]',
  },
}

export function EcosystemBadge({
  tech,
  label,
  subtext,
}: {
  tech: keyof typeof TECH_CATALOG
  label?: string
  subtext?: string
}) {
  const item = TECH_CATALOG[tech] || TECH_CATALOG.omega
  return (
    <div
      className={`inline-flex items-center gap-3 px-3.5 py-2 rounded-xl border ${item.border} ${item.bg} backdrop-blur-md transition-all duration-300 shadow-sm hover:shadow-md`}
    >
      <div className="relative w-5 h-5 shrink-0">
        <Image src={item.logo} alt={item.name} width={20} height={20} className="w-full h-full object-contain" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-white/90 leading-tight">
          {label || item.name}
        </span>
        <span className="text-[10px] text-white/50 leading-tight">
          {subtext || item.category}
        </span>
      </div>
    </div>
  )
}

export function EcosystemStack({
  items,
  title = 'Integrated AI Ecosystem & Tooling Stack',
}: {
  items: Array<keyof typeof TECH_CATALOG>
  title?: string
}) {
  return (
    <div className="my-8 p-5 rounded-2xl border border-white/[0.08] bg-[#0A0A0B]/80 backdrop-blur-xl">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs uppercase tracking-wider font-semibold text-white/70">
          {title}
        </span>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {items.map((tech) => (
          <EcosystemBadge key={tech} tech={tech} />
        ))}
      </div>
    </div>
  )
}
