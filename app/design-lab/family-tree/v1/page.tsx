'use client'

import Link from 'next/link'
import { ArrowLeft, Heart, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { familyNodes, familyEdges, sideColors } from '@/lib/family-tree-data'
import type { FamilyNode } from '@/lib/family-tree-data'

function GlassCard({ node, index }: { node: FamilyNode; index: number }) {
  const colors = sideColors[node.side]
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className={`group relative overflow-hidden rounded-2xl border ${colors.border} backdrop-blur-xl p-5 transition-all duration-300 hover:scale-[1.03]`}
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      {/* Animated gradient border glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${colors.hex}15, transparent, ${colors.hex}10)`,
        }}
      />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-white">{node.name}</h3>
            {node.bornName && (
              <p className="mt-0.5 text-xs text-white/25">{node.bornName}</p>
            )}
          </div>
          <span className={`rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] font-medium ${colors.text}`}>
            {node.role}
          </span>
        </div>

        {node.location && (
          <div className="mt-2 flex items-center gap-1 text-xs text-white/25">
            <MapPin className="h-3 w-3" />
            {node.location}
          </div>
        )}

        {node.details && (
          <div className="mt-3 space-y-1">
            {node.details.map((d) => (
              <p key={d} className="text-xs text-white/35">{d}</p>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

function SVGConnections() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 0 }}>
      <defs>
        <linearGradient id="conn-gorte" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="conn-riemer" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="conn-bridge" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {/* Gorte → Dora */}
      <line x1="25%" y1="22%" x2="35%" y2="45%" stroke="url(#conn-gorte)" strokeWidth="1" strokeDasharray="4 4" />
      {/* Riemer → Witali */}
      <line x1="75%" y1="22%" x2="65%" y2="45%" stroke="url(#conn-riemer)" strokeWidth="1" strokeDasharray="4 4" />
      {/* Parents → Frank */}
      <line x1="35%" y1="58%" x2="40%" y2="78%" stroke="url(#conn-bridge)" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="65%" y1="58%" x2="40%" y2="78%" stroke="url(#conn-bridge)" strokeWidth="1" strokeDasharray="4 4" />
    </svg>
  )
}

export default function FamilyTreeV1() {
  const grandparentsGorte = familyNodes.filter(n => n.generation === 0 && n.side === 'gorte')
  const grandparentsRiemer = familyNodes.filter(n => n.generation === 0 && n.side === 'riemer')
  const parents = familyNodes.filter(n => n.generation === 1)
  const current = familyNodes.filter(n => n.generation === 2)

  return (
    <main className="min-h-screen bg-[#0a0a0b]">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0a0a0b]" />
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-amber-500/5 blur-[128px]" />
        <div className="absolute right-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-[128px]" />
        <div className="absolute bottom-1/4 left-1/2 h-[400px] w-[400px] rounded-full bg-violet-500/5 blur-[128px]" />
      </div>

      {/* Header */}
      <div className="mx-auto max-w-5xl px-6 pb-8 pt-28">
        <Link
          href="/design-lab/family-tree"
          className="mb-6 inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/60"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All Variants
        </Link>
        <div className="flex items-center gap-3">
          <span className="rounded-lg bg-amber-500/10 px-3 py-1 text-xs font-mono font-bold text-amber-400">V1</span>
          <h1 className="text-2xl font-bold text-white">Glassmorphic Tree</h1>
        </div>
        <p className="mt-2 text-sm text-white/40">Frosted glass cards with SVG connection paths and animated gradients.</p>
      </div>

      {/* Tree */}
      <div className="relative mx-auto max-w-5xl px-6 pb-20">
        <SVGConnections />

        <div className="relative" style={{ zIndex: 1 }}>
          {/* Generation 0: Grandparents */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-amber-400/40">Gorte Line</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {grandparentsGorte.map((n, i) => <GlassCard key={n.id} node={n} index={i} />)}
              </div>
              <div className="mt-2 flex justify-center">
                <Heart className="h-3 w-3 text-rose-400/30" />
              </div>
            </div>
            <div>
              <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-cyan-400/40">Riemer Line</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {grandparentsRiemer.map((n, i) => <GlassCard key={n.id} node={n} index={i + 2} />)}
              </div>
              <div className="mt-2 flex justify-center">
                <Heart className="h-3 w-3 text-rose-400/30" />
              </div>
            </div>
          </div>

          {/* Connection indicator */}
          <div className="flex items-center justify-center py-6">
            <div className="h-12 w-px bg-gradient-to-b from-white/10 to-transparent" />
          </div>

          {/* Generation 1: Parents */}
          <div className="mx-auto max-w-2xl">
            <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-emerald-400/40">Parents</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {parents.map((n, i) => <GlassCard key={n.id} node={n} index={i + 4} />)}
            </div>
            <div className="mt-2 flex justify-center">
              <Heart className="h-3 w-3 text-rose-400/30" />
            </div>
          </div>

          {/* Connection indicator */}
          <div className="flex items-center justify-center py-6">
            <div className="h-12 w-px bg-gradient-to-b from-white/10 to-transparent" />
          </div>

          {/* Generation 2: Current */}
          <div className="mx-auto max-w-2xl">
            <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-violet-400/40">Current Generation</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {current.map((n, i) => <GlassCard key={n.id} node={n} index={i + 6} />)}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
