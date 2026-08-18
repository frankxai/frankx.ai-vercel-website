import Image from 'next/image'
import React, { ReactNode } from 'react'

interface MascotInsightProps {
  character?: 'omega' | 'axi' | 'guardian' | 'droid'
  mood?: 'thinking' | 'hero' | 'pointing' | 'chill'
  title?: string
  children: ReactNode
}

const MASCOT_FILES = {
  omega: {
    hero: '/images/mascot/frank-omega-hero-v1.png',
    thinking: '/images/mascot/frank-omega-thinking-v1.png',
    pointing: '/images/mascot/frank-omega-pointing-v1.png',
    chill: '/images/mascot/frank-omega-chill-v1.png',
    name: 'FrankX Ω Agent',
    role: 'Autonomous Kernel Advisor',
    border: 'border-amber-500/25',
    glow: 'bg-amber-500/[0.04]',
    tagColor: 'text-amber-400',
  },
  axi: {
    hero: '/images/mascot/axi-v4-hero.png',
    thinking: '/images/mascot/axi-v5-thinking.png',
    pointing: '/images/mascot/axi-v1-full.png',
    chill: '/images/mascot/axi-v5-waving.png',
    name: 'Axi',
    role: 'Swarm Explorer Companion',
    border: 'border-cyan-500/25',
    glow: 'bg-cyan-500/[0.04]',
    tagColor: 'text-cyan-400',
  },
  guardian: {
    hero: '/images/mascot/mascot-v11-chrome-guardian.png',
    thinking: '/images/mascot/mascot-v11-chrome-guardian.png',
    pointing: '/images/mascot/mascot-v11-chrome-guardian.png',
    chill: '/images/mascot/mascot-v11-chrome-guardian.png',
    name: 'Chrome Guardian',
    role: 'Zero-Trust Security Sentinel',
    border: 'border-emerald-500/25',
    glow: 'bg-emerald-500/[0.04]',
    tagColor: 'text-emerald-400',
  },
  droid: {
    hero: '/images/mascot/mascot-v23-premium-droid.png',
    thinking: '/images/mascot/mascot-v23-premium-droid.png',
    pointing: '/images/mascot/mascot-v23-premium-droid.png',
    chill: '/images/mascot/mascot-v23-premium-droid.png',
    name: 'Tactical Droid',
    role: 'Subagent Execution Engine',
    border: 'border-indigo-500/25',
    glow: 'bg-indigo-500/[0.04]',
    tagColor: 'text-indigo-400',
  },
}

export function MascotInsight({
  character = 'omega',
  mood = 'thinking',
  title,
  children,
}: MascotInsightProps) {
  const config = MASCOT_FILES[character] || MASCOT_FILES.omega
  const imageSrc = config[mood] || config.thinking

  return (
    <aside
      className={`my-10 p-6 rounded-2xl border ${config.border} ${config.glow} backdrop-blur-xl relative overflow-hidden transition-all duration-300 hover:border-opacity-60 shadow-lg`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl bg-[#111113] p-1.5 border border-white/[0.08] shadow-inner flex items-center justify-center overflow-hidden">
          <Image
            src={imageSrc}
            alt={config.name}
            width={80}
            height={80}
            className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`text-xs font-semibold uppercase tracking-wider ${config.tagColor}`}>
              {title || config.name}
            </span>
            <span className="text-[10px] text-white/40 border-l border-white/10 pl-2">
              {config.role}
            </span>
          </div>
          <div className="text-sm text-white/80 leading-relaxed space-y-2">
            {children}
          </div>
        </div>
      </div>
    </aside>
  )
}
