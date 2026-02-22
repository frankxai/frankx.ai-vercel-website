'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { familyNodes, sideColors } from '@/lib/family-tree-data'
import type { FamilyNode } from '@/lib/family-tree-data'

const CX = 400
const CY = 400
const RING_RADII = [0, 130, 260, 360] // center, gen2(parents), gen1(grandparents)

// Position nodes around rings
function getNodePosition(node: FamilyNode, index: number, total: number): { x: number; y: number } {
  if (node.id === 'frank-riemer') return { x: CX, y: CY }

  let ring = 0
  let angleOffset = 0
  let count = 1

  if (node.generation === 1) {
    ring = 1
    // Parents: left and right
    const parentNodes = familyNodes.filter(n => n.generation === 1)
    const idx = parentNodes.indexOf(node)
    count = parentNodes.length
    angleOffset = -Math.PI / 2 + (idx / (count - 1)) * Math.PI
  } else if (node.generation === 0) {
    ring = 2
    const gpNodes = familyNodes.filter(n => n.generation === 0)
    const idx = gpNodes.indexOf(node)
    count = gpNodes.length
    // Spread grandparents evenly across top half
    angleOffset = -Math.PI * 0.8 + (idx / (count - 1)) * Math.PI * 1.6
  } else if (node.id === 'tien') {
    ring = 1
    angleOffset = Math.PI / 2 + 0.3
  }

  const r = RING_RADII[ring]
  return {
    x: CX + r * Math.cos(angleOffset),
    y: CY + r * Math.sin(angleOffset),
  }
}

function RadialNode({
  node,
  position,
  isHovered,
  onHover,
}: {
  node: FamilyNode
  position: { x: number; y: number }
  isHovered: boolean
  onHover: (id: string | null) => void
}) {
  const colors = sideColors[node.side]
  const isCenter = node.id === 'frank-riemer'
  const radius = isCenter ? 40 : 28

  return (
    <g
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      className="cursor-pointer"
    >
      {/* Glow ring */}
      <motion.circle
        cx={position.x}
        cy={position.y}
        r={radius + 8}
        fill="none"
        stroke={colors.hex}
        strokeWidth={isHovered ? 2 : 0}
        strokeOpacity={0.3}
        initial={false}
        animate={{ r: isHovered ? radius + 12 : radius + 8, strokeWidth: isHovered ? 2 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Node circle */}
      <circle
        cx={position.x}
        cy={position.y}
        r={radius}
        fill={`${colors.hex}15`}
        stroke={colors.hex}
        strokeWidth={isCenter ? 2 : 1}
        strokeOpacity={0.4}
      />

      {/* Initials */}
      <text
        x={position.x}
        y={position.y}
        textAnchor="middle"
        dominantBaseline="central"
        fill={colors.hex}
        fontSize={isCenter ? 16 : 11}
        fontWeight="600"
        fontFamily="system-ui"
      >
        {node.name.split(' ').map(w => w[0]).join('')}
      </text>

      {/* Name label below */}
      <text
        x={position.x}
        y={position.y + radius + 16}
        textAnchor="middle"
        fill="white"
        fillOpacity={isHovered ? 0.8 : 0.4}
        fontSize={11}
        fontFamily="system-ui"
        fontWeight={isHovered ? '600' : '400'}
      >
        {node.name}
      </text>

      {node.role && (
        <text
          x={position.x}
          y={position.y + radius + 30}
          textAnchor="middle"
          fill={colors.hex}
          fillOpacity={0.5}
          fontSize={9}
          fontFamily="system-ui"
        >
          {node.role}
        </text>
      )}
    </g>
  )
}

export default function FamilyTreeV3() {
  const [hovered, setHovered] = useState<string | null>(null)

  const nodePositions = familyNodes.map((node, i) => ({
    node,
    position: getNodePosition(node, i, familyNodes.length),
  }))

  // Connection lines
  const connections = [
    { from: 'frank-riemer', to: 'dora-riemer' },
    { from: 'frank-riemer', to: 'witali-riemer' },
    { from: 'frank-riemer', to: 'tien' },
    { from: 'dora-riemer', to: 'david-gorte' },
    { from: 'dora-riemer', to: 'dorothea-gorte' },
    { from: 'witali-riemer', to: 'alexander-riemer' },
    { from: 'witali-riemer', to: 'paulina-riemer' },
  ]

  const getPos = (id: string) => nodePositions.find(n => n.node.id === id)?.position || { x: 0, y: 0 }

  return (
    <main className="min-h-screen bg-[#0a0a0b]">
      {/* Header */}
      <div className="mx-auto max-w-5xl px-6 pb-4 pt-28">
        <Link
          href="/design-lab/family-tree"
          className="mb-6 inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/60"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All Variants
        </Link>
        <div className="flex items-center gap-3">
          <span className="rounded-lg bg-violet-500/10 px-3 py-1 text-xs font-mono font-bold text-violet-400">V3</span>
          <h1 className="text-2xl font-bold text-white">Radial Orbit</h1>
        </div>
        <p className="mt-2 text-sm text-white/40">Frank at the center. Family radiating outward. Hover to explore.</p>
      </div>

      {/* SVG Canvas */}
      <div className="flex justify-center px-6 pb-20">
        <svg viewBox="0 0 800 800" className="h-auto w-full max-w-[700px]">
          {/* Orbit rings */}
          {RING_RADII.slice(1).map((r, i) => (
            <circle
              key={r}
              cx={CX}
              cy={CY}
              r={r}
              fill="none"
              stroke="white"
              strokeOpacity={0.04}
              strokeWidth={1}
              strokeDasharray="4 8"
            />
          ))}

          {/* Connection lines */}
          {connections.map((conn) => {
            const from = getPos(conn.from)
            const to = getPos(conn.to)
            const isHighlighted = hovered === conn.from || hovered === conn.to
            return (
              <line
                key={`${conn.from}-${conn.to}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="white"
                strokeOpacity={isHighlighted ? 0.15 : 0.05}
                strokeWidth={isHighlighted ? 1.5 : 0.5}
                className="transition-all duration-300"
              />
            )
          })}

          {/* Nodes */}
          {nodePositions.map(({ node, position }) => (
            <RadialNode
              key={node.id}
              node={node}
              position={position}
              isHovered={hovered === node.id}
              onHover={setHovered}
            />
          ))}
        </svg>
      </div>
    </main>
  )
}
