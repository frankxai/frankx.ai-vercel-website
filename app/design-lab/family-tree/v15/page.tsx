'use client'

import { useState, useEffect, useRef } from 'react'
import * as anime from 'animejs'
import { familyNodes, familyEdges, sideColors } from '@/lib/family-tree-data'

type LayoutMode = 'tree' | 'radial' | 'grid'

interface NodePosition {
  x: number
  y: number
}

interface LayoutPositions {
  [nodeId: string]: NodePosition
}

export default function FamilyTreeV15() {
  const [currentLayout, setCurrentLayout] = useState<LayoutMode>('tree')
  const svgRef = useRef<SVGSVGElement>(null)
  const isInitialMount = useRef(true)

  // Pre-computed positions for each layout
  const layoutPositions: Record<LayoutMode, LayoutPositions> = {
    tree: {
      'david-gorte': { x: 150, y: 80 },
      'dorothea-gorte': { x: 250, y: 80 },
      'alexander-riemer': { x: 550, y: 80 },
      'paulina-riemer': { x: 650, y: 80 },
      'dora-riemer': { x: 200, y: 250 },
      'witali-riemer': { x: 600, y: 250 },
      'frank-riemer': { x: 400, y: 450 },
      'tien': { x: 500, y: 450 },
    },
    radial: {
      'frank-riemer': { x: 400, y: 300 },
      'tien': { x: 500, y: 300 },
      'dora-riemer': { x: 280, y: 200 },
      'witali-riemer': { x: 620, y: 200 },
      'david-gorte': { x: 200, y: 100 },
      'dorothea-gorte': { x: 200, y: 300 },
      'alexander-riemer': { x: 600, y: 100 },
      'paulina-riemer': { x: 700, y: 200 },
    },
    grid: {
      'david-gorte': { x: 200, y: 100 },
      'dorothea-gorte': { x: 400, y: 100 },
      'alexander-riemer': { x: 600, y: 100 },
      'paulina-riemer': { x: 200, y: 250 },
      'dora-riemer': { x: 400, y: 250 },
      'witali-riemer': { x: 600, y: 250 },
      'frank-riemer': { x: 400, y: 400 },
      'tien': { x: 600, y: 400 },
    },
  }

  // Generate path data for edges based on current layout
  const getPathData = (sourceId: string, targetId: string, layout: LayoutMode): string => {
    const source = layoutPositions[layout][sourceId]
    const target = layoutPositions[layout][targetId]

    if (!source || !target) return ''

    // Curved path for tree layout, straight for others
    if (layout === 'tree') {
      const midY = (source.y + target.y) / 2
      return `M ${source.x} ${source.y} C ${source.x} ${midY}, ${target.x} ${midY}, ${target.x} ${target.y}`
    } else if (layout === 'radial') {
      // Curved radial paths
      const dx = target.x - source.x
      const dy = target.y - source.y
      const dr = Math.sqrt(dx * dx + dy * dy)
      return `M ${source.x} ${source.y} Q ${source.x + dx/2} ${source.y + dy/2 - 30}, ${target.x} ${target.y}`
    } else {
      return `M ${source.x} ${source.y} L ${target.x} ${target.y}`
    }
  }

  // Animate layout change
  const animateToLayout = (newLayout: LayoutMode) => {
    if (!svgRef.current) return

    const nodes = svgRef.current.querySelectorAll('.family-node')
    const labels = svgRef.current.querySelectorAll('.family-label')
    const paths = svgRef.current.querySelectorAll('.family-edge')

    // Animate node circles
    nodes.forEach((node, index) => {
      const nodeId = node.getAttribute('data-node-id')
      if (!nodeId) return

      const newPos = layoutPositions[newLayout][nodeId]
      if (!newPos) return

      anime({
        targets: node,
        cx: newPos.x,
        cy: newPos.y,
        duration: 800,
        easing: 'easeInOutQuart',
        delay: anime.stagger(50, { start: index * 10 }),
      })
    })

    // Animate labels
    labels.forEach((label, index) => {
      const nodeId = label.getAttribute('data-node-id')
      if (!nodeId) return

      const newPos = layoutPositions[newLayout][nodeId]
      if (!newPos) return

      anime({
        targets: label,
        x: newPos.x,
        y: newPos.y + 35,
        duration: 800,
        easing: 'easeInOutQuart',
        delay: anime.stagger(50, { start: index * 10 }),
      })
    })

    // Animate paths
    paths.forEach((path, index) => {
      const sourceId = path.getAttribute('data-source')
      const targetId = path.getAttribute('data-target')
      if (!sourceId || !targetId) return

      const newPath = getPathData(sourceId, targetId, newLayout)
      if (!newPath) return

      anime({
        targets: path,
        d: [{ value: newPath }],
        duration: 800,
        easing: 'easeInOutQuart',
        delay: index * 30,
      })
    })
  }

  // Handle layout change
  const changeLayout = (newLayout: LayoutMode) => {
    setCurrentLayout(newLayout)
    animateToLayout(newLayout)
  }

  // Initial load animation
  useEffect(() => {
    if (isInitialMount.current && svgRef.current) {
      isInitialMount.current = false

      const nodes = svgRef.current.querySelectorAll('.family-node')
      const labels = svgRef.current.querySelectorAll('.family-label')
      const paths = svgRef.current.querySelectorAll('.family-edge')

      // Fade in paths
      anime({
        targets: paths,
        strokeDashoffset: [anime.setDashoffset, 0],
        opacity: [0, 0.4],
        duration: 1200,
        easing: 'easeOutQuad',
        delay: anime.stagger(80),
      })

      // Scale in nodes
      anime({
        targets: nodes,
        scale: [0, 1],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutElastic(1, .6)',
        delay: anime.stagger(60, { start: 300 }),
      })

      // Fade in labels
      anime({
        targets: labels,
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 500,
        easing: 'easeOutQuad',
        delay: anime.stagger(60, { start: 500 }),
      })
    }
  }, [])

  // Hover animation handler
  const handleNodeHover = (e: React.MouseEvent<SVGCircleElement>) => {
    anime({
      targets: e.currentTarget,
      scale: [1, 1.15, 1],
      duration: 600,
      easing: 'easeInOutQuad',
    })

    // Pulse the glow
    const nodeId = e.currentTarget.getAttribute('data-node-id')
    const glow = svgRef.current?.querySelector(`#glow-${nodeId}`)
    if (glow) {
      anime({
        targets: glow,
        opacity: [0.6, 1, 0.6],
        duration: 600,
        easing: 'easeInOutQuad',
      })
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          V15 — Morphing Layouts
        </h1>
        <p className="text-white/60 text-lg">
          Anime.js SVG transitions
        </p>
      </div>

      {/* Layout Controls */}
      <div className="flex gap-3 mb-8">
        {(['tree', 'radial', 'grid'] as LayoutMode[]).map((layout) => (
          <button
            key={layout}
            onClick={() => changeLayout(layout)}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${
              currentLayout === layout
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80'
            }`}
          >
            {layout.charAt(0).toUpperCase() + layout.slice(1)}
          </button>
        ))}
      </div>

      {/* SVG Canvas */}
      <div className="relative">
        <svg
          ref={svgRef}
          viewBox="0 0 800 600"
          className="w-full max-w-5xl h-auto"
          style={{ filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.2))' }}
        >
          {/* Definitions */}
          <defs>
            {/* Glow filters for each node */}
            {familyNodes.map((node) => (
              <filter key={`filter-${node.id}`} id={`glow-${node.id}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            ))}
          </defs>

          {/* Edges */}
          <g className="edges">
            {familyEdges.map((edge, index) => {
              const pathData = getPathData(edge.source, edge.target, currentLayout)
              return (
                <path
                  key={`${edge.source}-${edge.target}-${index}`}
                  className="family-edge"
                  data-source={edge.source}
                  data-target={edge.target}
                  d={pathData}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="2"
                  opacity="0.4"
                  strokeDasharray="4 4"
                />
              )
            })}
          </g>

          {/* Nodes */}
          <g className="nodes">
            {familyNodes.map((node) => {
              const pos = layoutPositions[currentLayout][node.id]
              const color = sideColors[node.side as keyof typeof sideColors] || '#8b5cf6'

              return (
                <g key={node.id}>
                  {/* Node circle */}
                  <circle
                    className="family-node"
                    data-node-id={node.id}
                    cx={pos.x}
                    cy={pos.y}
                    r="24"
                    fill={`${color}15`}
                    stroke={color}
                    strokeWidth="2.5"
                    filter={`url(#glow-${node.id})`}
                    onMouseEnter={handleNodeHover}
                    style={{ cursor: 'pointer', transformOrigin: `${pos.x}px ${pos.y}px` }}
                  />

                  {/* Label */}
                  <text
                    className="family-label"
                    data-node-id={node.id}
                    x={pos.x}
                    y={pos.y + 35}
                    textAnchor="middle"
                    fill="white"
                    fontSize="13"
                    fontWeight="500"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {node.label}
                  </text>

                  {/* Generation indicator */}
                  <text
                    x={pos.x}
                    y={pos.y + 5}
                    textAnchor="middle"
                    fill={color}
                    fontSize="11"
                    fontWeight="600"
                    opacity="0.8"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {node.generation === 0 ? 'G0' : node.generation === 1 ? 'G1' : 'G2'}
                  </text>
                </g>
              )
            })}
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        {Object.entries(sideColors).map(([side, color]) => (
          <div key={side} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-white/70 text-sm capitalize">
              {side === 'gorte' ? 'Gorte' : side === 'riemer' ? 'Riemer' : side === 'bridge' ? 'Bridge' : side === 'current' ? 'Current' : 'Partner'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
