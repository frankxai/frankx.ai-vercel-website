'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { familyNodes, familyEdges, sideColors, type FamilyNode } from '@/lib/family-tree-data'

/**
 * V14: Web Animations API — Zero-dependency native browser animations
 *
 * Uses the Web Animations API directly (element.animate()) for all animations.
 * This is what Motion One wraps, but we're using it raw for maximum control.
 *
 * Features:
 * - Spring physics via CSS linear() easing function
 * - IntersectionObserver-triggered animations
 * - Staggered entrance animations per generation
 * - SVG path animations with strokeDashoffset
 * - Hover animations using Web Animations API
 * - 0kb animation library overhead
 */

// Spring easing approximation using CSS linear() function
const SPRING_EASING = 'linear(0, 0.006, 0.025, 0.057, 0.1, 0.152, 0.212, 0.278, 0.344, 0.412, 0.478, 0.538, 0.592, 0.638, 0.678, 0.711, 0.738, 0.759, 0.776, 0.789, 0.8, 0.808, 0.815, 0.821, 0.827, 0.833, 0.84, 0.848, 0.856, 0.865, 0.875, 0.886, 0.897, 0.908, 0.92, 0.931, 0.943, 0.954, 0.964, 0.975, 0.985, 0.994, 1)'

interface NodePosition {
  x: number
  y: number
  node: FamilyNode
}

export default function FamilyTreeV14() {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const nodeRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  // Calculate positions for horizontal tree layout (pure derivation, no side effects)
  const positions = useMemo<NodePosition[]>(() => {
    const grandparents = familyNodes.filter(n => n.generation === 0)
    const parents = familyNodes.filter(n => n.generation === 1)
    const current = familyNodes.filter(n => n.generation === 2)

    const result: NodePosition[] = []
    const cardHeight = 160
    const horizontalGap = 280
    const verticalGap = 40

    // Generation 2 (current) - left side
    current.forEach((node, i) => {
      result.push({
        x: 80,
        y: 200 + i * (cardHeight + verticalGap),
        node
      })
    })

    // Generation 1 (parents) - middle
    parents.forEach((node, i) => {
      result.push({
        x: 80 + horizontalGap,
        y: 240 + i * (cardHeight + verticalGap),
        node
      })
    })

    // Generation 0 (grandparents) - right side
    // Gorte side (top)
    const gorteGrandparents = grandparents.filter(n => n.side === 'gorte')
    gorteGrandparents.forEach((node, i) => {
      result.push({
        x: 80 + horizontalGap * 2,
        y: 100 + i * (cardHeight + verticalGap),
        node
      })
    })

    // Riemer side (bottom)
    const riemerGrandparents = grandparents.filter(n => n.side === 'riemer')
    riemerGrandparents.forEach((node, i) => {
      result.push({
        x: 80 + horizontalGap * 2,
        y: 380 + i * (cardHeight + verticalGap),
        node
      })
    })

    return result
  }, [])

  // Animate SVG connection lines
  const animateConnections = useCallback(() => {
    if (!svgRef.current) return

    const paths = svgRef.current.querySelectorAll('path')
    paths.forEach((path, index) => {
      const length = path.getTotalLength()

      // Set up initial state
      path.style.strokeDasharray = `${length}`
      path.style.strokeDashoffset = `${length}`

      // Animate strokeDashoffset
      path.animate(
        [
          { strokeDashoffset: length },
          { strokeDashoffset: 0 }
        ],
        {
          duration: 1000,
          delay: 400 + index * 50,
          easing: 'ease-out',
          fill: 'forwards'
        }
      )
    })
  }, [])

  // Entrance animations using Web Animations API
  const animateEntrance = useCallback(() => {
    positions.forEach((pos) => {
      const element = nodeRefs.current.get(pos.node.id)
      if (!element) return

      const delay = pos.node.generation * 200 // Stagger by generation

      let keyframes: Keyframe[]

      if (pos.node.generation === 2) {
        // Current generation: slide from left
        keyframes = [
          { transform: 'translateX(-100px)', opacity: 0 },
          { transform: 'translateX(0)', opacity: 1 }
        ]
      } else if (pos.node.generation === 1) {
        // Parents: fade + scale from center
        keyframes = [
          { transform: 'scale(0.8)', opacity: 0 },
          { transform: 'scale(1)', opacity: 1 }
        ]
      } else {
        // Grandparents: slide from right
        keyframes = [
          { transform: 'translateX(100px)', opacity: 0 },
          { transform: 'translateX(0)', opacity: 1 }
        ]
      }

      element.animate(keyframes, {
        duration: 800,
        delay,
        easing: SPRING_EASING,
        fill: 'both'
      })
    })

    // Animate connection lines after cards
    animateConnections()
  }, [positions, animateConnections])

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    if (!containerRef.current || positions.length === 0 || hasAnimated) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            animateEntrance()
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [positions, hasAnimated, animateEntrance])

  // Hover animation using Web Animations API
  const handleMouseEnter = (nodeId: string) => {
    const element = nodeRefs.current.get(nodeId)
    if (!element) return

    element.animate(
      [
        { transform: 'scale(1)' },
        { transform: 'scale(1.05)' }
      ],
      {
        duration: 200,
        easing: 'ease-out',
        fill: 'forwards'
      }
    )
  }

  const handleMouseLeave = (nodeId: string) => {
    const element = nodeRefs.current.get(nodeId)
    if (!element) return

    element.animate(
      [
        { transform: 'scale(1.05)' },
        { transform: 'scale(1)' }
      ],
      {
        duration: 200,
        easing: 'ease-out',
        fill: 'forwards'
      }
    )
  }

  // Generate SVG connection paths
  const generateConnections = () => {
    if (positions.length === 0) return []

    const posMap = new Map(positions.map(p => [p.node.id, p]))
    const cardHeight = 160
    const cardWidth = 240

    return familyEdges.map((edge, index) => {
      const source = posMap.get(edge.source)
      const target = posMap.get(edge.target)

      if (!source || !target) return null

      const isSpouse = edge.type === 'spouse' || edge.type === 'partner'
      const color = sideColors[source.node.side].hex

      if (isSpouse) {
        // Horizontal line for spouses
        const y = source.y + cardHeight / 2
        const x1 = source.x + cardWidth
        const x2 = target.x

        return (
          <path
            key={`${edge.source}-${edge.target}`}
            d={`M ${x1} ${y} L ${x2} ${y}`}
            stroke={color}
            strokeWidth="2"
            fill="none"
            opacity="0.4"
          />
        )
      } else {
        // Curved line for parent-child
        const x1 = source.x + cardWidth
        const y1 = source.y + cardHeight / 2
        const x2 = target.x
        const y2 = target.y + cardHeight / 2

        const midX = (x1 + x2) / 2

        return (
          <path
            key={`${edge.source}-${edge.target}-${index}`}
            d={`M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`}
            stroke={color}
            strokeWidth="2"
            fill="none"
            opacity="0.3"
          />
        )
      }
    })
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-auto">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                V14 — Web Animations API
              </h1>
              <p className="text-white/60 text-sm">
                Zero-dependency native browser animations
              </p>
            </div>

            {/* 0kb Badge */}
            <div className="px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <div className="text-xs text-emerald-400 font-medium">
                0kb Animation Overhead
              </div>
              <div className="text-[10px] text-emerald-400/60 mt-0.5">
                Native Web Animations API
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Family Tree Container */}
      <div
        ref={containerRef}
        className="relative pt-32 pb-20 px-6"
        style={{ minHeight: '100vh', width: 'max-content' }}
      >
        {/* SVG Layer for connections */}
        <svg
          ref={svgRef}
          className="absolute inset-0 pointer-events-none"
          style={{ width: '100%', height: '100%' }}
        >
          {generateConnections()}
        </svg>

        {/* Node Cards */}
        {positions.map((pos) => {
          const colors = sideColors[pos.node.side]

          return (
            <div
              key={pos.node.id}
              ref={(el) => {
                if (el) nodeRefs.current.set(pos.node.id, el)
              }}
              onMouseEnter={() => handleMouseEnter(pos.node.id)}
              onMouseLeave={() => handleMouseLeave(pos.node.id)}
              className="absolute"
              style={{
                left: pos.x,
                top: pos.y,
                width: 240,
                opacity: 0, // Will be animated in
                willChange: 'transform, opacity'
              }}
            >
              <div
                className={`
                  relative h-full
                  bg-white/[0.03] backdrop-blur-xl
                  border ${colors.border}
                  rounded-2xl p-5
                  transition-shadow duration-200
                  hover:shadow-lg hover:shadow-black/20
                `}
              >
                {/* Colored accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                  style={{ backgroundColor: colors.hex }}
                />

                {/* Content */}
                <div className="relative">
                  <div className="mb-3">
                    <div className="text-lg font-semibold text-white/90">
                      {pos.node.name}
                    </div>
                    {pos.node.bornName && (
                      <div className="text-xs text-white/40 mt-1">
                        {pos.node.bornName}
                      </div>
                    )}
                  </div>

                  <div className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium ${colors.bg} ${colors.text} mb-3`}>
                    {pos.node.role}
                  </div>

                  {pos.node.location && (
                    <div className="text-xs text-white/50 mb-2 flex items-center gap-1.5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {pos.node.location}
                    </div>
                  )}

                  {pos.node.details && pos.node.details.length > 0 && (
                    <div className="space-y-1">
                      {pos.node.details.map((detail, i) => (
                        <div key={i} className="text-xs text-white/40">
                          {detail}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Info Panel */}
      <div className="fixed bottom-6 right-6 max-w-sm">
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-sm font-semibold mb-3 text-white/90">
            Web Animations API Features
          </h3>
          <ul className="space-y-2 text-xs text-white/60">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              <span>Native element.animate() for all animations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              <span>Spring physics via CSS linear() easing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              <span>SVG strokeDashoffset path animations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              <span>IntersectionObserver scroll triggers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              <span>Zero animation library overhead</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              <span>Hardware-accelerated transforms</span>
            </li>
          </ul>

          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="text-[10px] text-white/40 uppercase tracking-wider mb-2">
              Performance
            </div>
            <div className="text-xs text-white/60">
              All animations run on the compositor thread, ensuring 60fps even with complex layouts.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
