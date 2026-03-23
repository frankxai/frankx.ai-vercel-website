'use client'

import { useState } from 'react'
import Link from 'next/link'

interface TradingCardProps {
  card: {
    id: string
    number: number
    name: string
    collection: string
    rarity: 'common' | 'uncommon' | 'rare' | 'legendary'
    domain: string
    stats: Record<string, string | number | undefined>
    quote: string
    description: string
    lore: string
    tags: string[]
  }
  showPrice?: boolean
  price?: number
  interactive?: boolean
}

const rarityConfig = {
  common: {
    border: 'border-cyan-500/30',
    glow: 'shadow-[0_0_15px_rgba(67,191,227,0.15)]',
    hoverGlow: 'group-hover:shadow-[0_0_30px_rgba(67,191,227,0.3)]',
    bg: 'from-cyan-500/10 to-cyan-500/5',
    badge: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    accent: 'text-cyan-400',
    label: 'Common',
  },
  uncommon: {
    border: 'border-emerald-500/30',
    glow: 'shadow-[0_0_15px_rgba(16,185,129,0.15)]',
    hoverGlow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]',
    bg: 'from-emerald-500/10 to-emerald-500/5',
    badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    accent: 'text-emerald-400',
    label: 'Uncommon',
  },
  rare: {
    border: 'border-purple-500/30',
    glow: 'shadow-[0_0_20px_rgba(171,71,199,0.2)]',
    hoverGlow: 'group-hover:shadow-[0_0_40px_rgba(171,71,199,0.35)]',
    bg: 'from-purple-500/10 to-purple-500/5',
    badge: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    accent: 'text-purple-400',
    label: 'Rare',
  },
  legendary: {
    border: 'border-amber-500/30',
    glow: 'shadow-[0_0_25px_rgba(245,158,11,0.25)]',
    hoverGlow: 'group-hover:shadow-[0_0_50px_rgba(245,158,11,0.4)]',
    bg: 'from-amber-500/15 to-amber-500/5',
    badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    accent: 'text-amber-400',
    label: 'Legendary',
  },
}

const collectionLabels: Record<string, string> = {
  'acos-skills': 'ACOS Skill',
  'acos-agents': 'ACOS Agent',
  'arcanea-gates': 'Arcanea Gate',
}

export default function TradingCard({ card, showPrice, price, interactive = true }: TradingCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const config = rarityConfig[card.rarity]

  const cardContent = (
    <div
      className={`group relative cursor-pointer [perspective:1000px] ${interactive ? '' : 'pointer-events-none'}`}
      onClick={() => interactive && setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Front */}
        <div
          className={`relative rounded-2xl border ${config.border} ${config.glow} ${config.hoverGlow} bg-gradient-to-b ${config.bg} backdrop-blur-sm overflow-hidden transition-shadow duration-500 [backface-visibility:hidden]`}
        >
          {/* Card header */}
          <div className="px-4 pt-4 pb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-widest text-white/40">
                {collectionLabels[card.collection] || card.collection}
              </span>
              <span className="text-[10px] font-mono text-white/30">
                #{String(card.number).padStart(2, '0')}/40
              </span>
            </div>
            <h3 className={`text-lg font-bold ${config.accent} leading-tight`}>
              {card.name}
            </h3>
          </div>

          {/* Card art area */}
          <div className="mx-4 mb-3 rounded-lg bg-white/[0.03] border border-white/[0.06] p-4 min-h-[120px] flex items-center justify-center">
            <div className="text-center">
              <div className={`text-4xl font-bold ${config.accent} opacity-30 font-mono`}>
                {card.collection === 'arcanea-gates' ? '⬡' : card.collection === 'acos-agents' ? '◆' : '▣'}
              </div>
              <div className="text-xs text-white/30 mt-2">{card.domain}</div>
            </div>
          </div>

          {/* Description */}
          <div className="px-4 pb-3">
            <p className="text-xs text-white/50 line-clamp-2 leading-relaxed">
              {card.description}
            </p>
          </div>

          {/* Stats bar */}
          <div className="px-4 pb-3 flex items-center gap-3">
            {Object.entries(card.stats).map(([key, value]) => {
              if (value === undefined) return null
              return (
                <div key={key} className="flex items-center gap-1.5">
                  <span className="text-[10px] uppercase text-white/30">{key}</span>
                  <span className={`text-sm font-bold ${config.accent}`}>
                    {typeof value === 'number' ? value : value}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Footer */}
          <div className="px-4 pb-4 flex items-center justify-between">
            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${config.badge}`}>
              {config.label}
            </span>
            {showPrice && price && (
              <span className="text-sm font-bold text-white">${price}</span>
            )}
          </div>

          {/* Quote */}
          <div className="px-4 pb-4">
            <p className="text-[11px] italic text-white/30 leading-relaxed">
              &ldquo;{card.quote}&rdquo;
            </p>
          </div>
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 rounded-2xl border ${config.border} bg-gradient-to-b from-[#0d0d0e] to-[#0a0a0b] overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)]`}
        >
          <div className="p-5 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className={`text-sm font-bold ${config.accent}`}>
                {card.name}
              </span>
              <span className="text-[10px] font-mono text-white/30">
                #{String(card.number).padStart(2, '0')}
              </span>
            </div>

            <div className="flex-1">
              <h4 className="text-xs uppercase tracking-wider text-white/40 mb-2">Lore</h4>
              <p className="text-sm text-white/60 leading-relaxed mb-4">
                {card.lore}
              </p>

              <h4 className="text-xs uppercase tracking-wider text-white/40 mb-2">Tags</h4>
              <div className="flex flex-wrap gap-1.5">
                {card.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] bg-white/[0.05] text-white/40 border border-white/[0.06]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] text-center">
              <span className="text-[10px] text-white/30">ACOS Genesis Set v1.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  if (!interactive) return cardContent

  return cardContent
}
