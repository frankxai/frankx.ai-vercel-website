'use client'

import Link from 'next/link'
import { ArrowLeft, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { familyNodes, familyEdges, sideColors } from '@/lib/family-tree-data'
import type { FamilyNode } from '@/lib/family-tree-data'

// Layout positions for pedigree chart (x, y in percentage)
const positions = {
  // Generation 0 - Top row (Grandparents)
  'david-gorte': { x: 15, y: 10 },
  'dorothea-gorte': { x: 28, y: 10 },
  'alexander-riemer': { x: 58, y: 10 },
  'paulina-riemer': { x: 71, y: 10 },
  // Generation 1 - Middle row (Parents)
  'dora-riemer': { x: 36, y: 45 },
  'witali-riemer': { x: 53, y: 45 },
  // Generation 2 - Bottom row (Current)
  'frank-riemer': { x: 41, y: 80 },
  'tien': { x: 54, y: 80 },
} as const

interface PersonCardProps {
  node: FamilyNode
  index: number
}

function PersonCard({ node, index }: PersonCardProps) {
  const colors = sideColors[node.side]
  const pos = positions[node.id as keyof typeof positions]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
      className="absolute"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        className={`group relative overflow-hidden rounded-xl border ${colors.border} backdrop-blur-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg`}
        style={{
          background: 'rgba(255,255,255,0.03)',
          minWidth: '160px',
          boxShadow: `0 0 20px ${colors.hex}15`,
        }}
      >
        {/* Gradient accent on hover */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `linear-gradient(135deg, ${colors.hex}20, transparent)`,
          }}
        />

        <div className="relative">
          {/* Name */}
          <h3 className="text-sm font-semibold text-white leading-tight">
            {node.name}
          </h3>

          {/* Born name */}
          {node.bornName && (
            <p className="mt-1 text-[10px] text-white/30 italic">
              {node.bornName}
            </p>
          )}

          {/* Role badge */}
          <div className="mt-2 flex items-center justify-between">
            <span
              className={`rounded-full bg-white/5 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wide ${colors.text}`}
            >
              {node.role}
            </span>
          </div>

          {/* Generation indicator */}
          <div className="mt-2 text-[9px] text-white/20 font-mono">
            Gen {node.generation}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ConnectionLines() {
  const lines: Array<{
    x1: number
    y1: number
    x2: number
    y2: number
    type: 'spouse' | 'parent-child' | 'partner'
    color: string
  }> = []

  // Helper to get position
  const getPos = (id: string) => positions[id as keyof typeof positions]

  // Spouse connections (horizontal dashed)
  lines.push(
    {
      x1: getPos('david-gorte').x + 6.5,
      y1: getPos('david-gorte').y,
      x2: getPos('dorothea-gorte').x - 6.5,
      y2: getPos('dorothea-gorte').y,
      type: 'spouse',
      color: sideColors.gorte.hex,
    },
    {
      x1: getPos('alexander-riemer').x + 6.5,
      y1: getPos('alexander-riemer').y,
      x2: getPos('paulina-riemer').x - 6.5,
      y2: getPos('paulina-riemer').y,
      type: 'spouse',
      color: sideColors.riemer.hex,
    },
    {
      x1: getPos('dora-riemer').x + 6.5,
      y1: getPos('dora-riemer').y,
      x2: getPos('witali-riemer').x - 6.5,
      y2: getPos('witali-riemer').y,
      type: 'spouse',
      color: sideColors.bridge.hex,
    },
    {
      x1: getPos('frank-riemer').x + 6.5,
      y1: getPos('frank-riemer').y,
      x2: getPos('tien').x - 6.5,
      y2: getPos('tien').y,
      type: 'partner',
      color: sideColors.current.hex,
    }
  )

  // Parent-child connections (vertical solid lines with branch points)
  // Gorte couple → Dora
  const gorteMidX = (getPos('david-gorte').x + getPos('dorothea-gorte').x) / 2
  lines.push(
    // Vertical drop from couple midpoint
    {
      x1: gorteMidX,
      y1: getPos('david-gorte').y + 3,
      x2: gorteMidX,
      y2: getPos('dora-riemer').y - 15,
      type: 'parent-child',
      color: sideColors.gorte.hex,
    },
    // Horizontal to Dora
    {
      x1: gorteMidX,
      y1: getPos('dora-riemer').y - 15,
      x2: getPos('dora-riemer').x,
      y2: getPos('dora-riemer').y - 15,
      type: 'parent-child',
      color: sideColors.gorte.hex,
    },
    // Vertical drop to Dora
    {
      x1: getPos('dora-riemer').x,
      y1: getPos('dora-riemer').y - 15,
      x2: getPos('dora-riemer').x,
      y2: getPos('dora-riemer').y - 3,
      type: 'parent-child',
      color: sideColors.gorte.hex,
    }
  )

  // Riemer couple → Witali
  const riemerMidX = (getPos('alexander-riemer').x + getPos('paulina-riemer').x) / 2
  lines.push(
    // Vertical drop from couple midpoint
    {
      x1: riemerMidX,
      y1: getPos('alexander-riemer').y + 3,
      x2: riemerMidX,
      y2: getPos('witali-riemer').y - 15,
      type: 'parent-child',
      color: sideColors.riemer.hex,
    },
    // Horizontal to Witali
    {
      x1: riemerMidX,
      y1: getPos('witali-riemer').y - 15,
      x2: getPos('witali-riemer').x,
      y2: getPos('witali-riemer').y - 15,
      type: 'parent-child',
      color: sideColors.riemer.hex,
    },
    // Vertical drop to Witali
    {
      x1: getPos('witali-riemer').x,
      y1: getPos('witali-riemer').y - 15,
      x2: getPos('witali-riemer').x,
      y2: getPos('witali-riemer').y - 3,
      type: 'parent-child',
      color: sideColors.riemer.hex,
    }
  )

  // Parents → Frank
  const parentsMidX = (getPos('dora-riemer').x + getPos('witali-riemer').x) / 2
  lines.push(
    // Vertical drop from parents midpoint
    {
      x1: parentsMidX,
      y1: getPos('dora-riemer').y + 3,
      x2: parentsMidX,
      y2: getPos('frank-riemer').y - 15,
      type: 'parent-child',
      color: sideColors.bridge.hex,
    },
    // Horizontal to Frank
    {
      x1: parentsMidX,
      y1: getPos('frank-riemer').y - 15,
      x2: getPos('frank-riemer').x,
      y2: getPos('frank-riemer').y - 15,
      type: 'parent-child',
      color: sideColors.bridge.hex,
    },
    // Vertical drop to Frank
    {
      x1: getPos('frank-riemer').x,
      y1: getPos('frank-riemer').y - 15,
      x2: getPos('frank-riemer').x,
      y2: getPos('frank-riemer').y - 3,
      type: 'parent-child',
      color: sideColors.bridge.hex,
    }
  )

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      <defs>
        {/* Animated gradient for parent-child lines */}
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
        </linearGradient>

        {/* Dash pattern for spouse lines */}
        <pattern id="dashPattern" patternUnits="userSpaceOnUse" width="8" height="2">
          <rect width="4" height="2" fill="rgba(255,255,255,0.2)" />
        </pattern>

        {/* Glow filter */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {lines.map((line, i) => (
        <motion.line
          key={i}
          x1={`${line.x1}%`}
          y1={`${line.y1}%`}
          x2={`${line.x2}%`}
          y2={`${line.y2}%`}
          stroke={line.type === 'parent-child' ? line.color : 'rgba(255,255,255,0.2)'}
          strokeWidth={line.type === 'parent-child' ? '2' : '1.5'}
          strokeDasharray={line.type === 'parent-child' ? '0' : '6 4'}
          opacity={line.type === 'parent-child' ? 0.4 : 0.3}
          filter={line.type === 'parent-child' ? 'url(#glow)' : undefined}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: line.type === 'parent-child' ? 0.4 : 0.3 }}
          transition={{ duration: 1.5, delay: i * 0.05, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  )
}

function GenerationLabels() {
  return (
    <>
      {/* Generation 0 */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="absolute left-8 top-[10%] -translate-y-1/2"
      >
        <div className="flex flex-col items-end">
          <div className="text-xs font-mono text-white/40 tracking-wider">GENERATION 0</div>
          <div className="text-[10px] text-white/25 mt-0.5">Grandparents</div>
        </div>
      </motion.div>

      {/* Generation 1 */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="absolute left-8 top-[45%] -translate-y-1/2"
      >
        <div className="flex flex-col items-end">
          <div className="text-xs font-mono text-white/40 tracking-wider">GENERATION 1</div>
          <div className="text-[10px] text-white/25 mt-0.5">Parents</div>
        </div>
      </motion.div>

      {/* Generation 2 */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute left-8 top-[80%] -translate-y-1/2"
      >
        <div className="flex flex-col items-end">
          <div className="text-xs font-mono text-white/40 tracking-wider">GENERATION 2</div>
          <div className="text-[10px] text-white/25 mt-0.5">Current</div>
        </div>
      </motion.div>
    </>
  )
}

function GenerationBackgrounds() {
  return (
    <>
      {/* Gen 0 background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
        className="absolute left-0 right-0"
        style={{
          top: '2%',
          height: '22%',
          background: 'linear-gradient(to bottom, rgba(245,158,11,0.03), rgba(6,182,212,0.03))',
          borderRadius: '16px',
        }}
      />

      {/* Gen 1 background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="absolute left-0 right-0"
        style={{
          top: '37%',
          height: '22%',
          background: 'linear-gradient(to bottom, rgba(16,185,129,0.04), rgba(16,185,129,0.02))',
          borderRadius: '16px',
        }}
      />

      {/* Gen 2 background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="absolute left-0 right-0"
        style={{
          top: '72%',
          height: '22%',
          background: 'linear-gradient(to bottom, rgba(139,92,246,0.04), rgba(244,63,94,0.02))',
          borderRadius: '16px',
        }}
      />
    </>
  )
}

export default function FamilyTreeV7() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/design-lab"
              className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Design Lab
            </Link>
            <div className="text-right">
              <div className="text-xs font-mono text-white/40">VARIANT 7 OF 10</div>
            </div>
          </div>
        </div>
      </div>

      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-24 pb-8 px-6"
      >
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold tracking-tight">
            V7 — Pedigree Chart
          </h1>
          <p className="mt-2 text-white/50">
            Classic ancestry format. Frank at bottom, ancestors branching upward.
          </p>
        </div>
      </motion.div>

      {/* Visualization Container */}
      <div className="relative mx-auto max-w-7xl px-6 pb-16">
        <div
          className="relative overflow-x-auto rounded-2xl border border-white/5 bg-[#0a0a0f]/50 backdrop-blur-sm"
          style={{ minHeight: '800px', height: '80vh' }}
        >
          {/* Generation backgrounds */}
          <GenerationBackgrounds />

          {/* Connection lines */}
          <ConnectionLines />

          {/* Generation labels */}
          <GenerationLabels />

          {/* Person cards */}
          <div className="relative h-full" style={{ zIndex: 10 }}>
            {familyNodes.map((node, i) => (
              <PersonCard key={node.id} node={node} index={i} />
            ))}
          </div>
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs"
        >
          <div className="flex items-center gap-2">
            <div className="h-3 w-8 rounded-full" style={{ background: sideColors.gorte.hex, opacity: 0.4 }} />
            <span className="text-white/50">Gorte Line</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-8 rounded-full" style={{ background: sideColors.riemer.hex, opacity: 0.4 }} />
            <span className="text-white/50">Riemer Line</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-8 rounded-full" style={{ background: sideColors.bridge.hex, opacity: 0.4 }} />
            <span className="text-white/50">United</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-8 border-t border-dashed border-white/30" />
            <span className="text-white/50">Marriage/Partnership</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-8 bg-white/30 rounded-full" />
            <span className="text-white/50">Parent-Child</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
