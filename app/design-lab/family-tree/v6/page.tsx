'use client'

/**
 * V6: Force-Directed Graph Family Tree
 * D3 physics simulation with drag interaction
 *
 * Metadata: { robots: { index: false, follow: false } }
 */

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import * as d3 from 'd3'
import { familyNodes, familyEdges, sideColors, FamilyNode, FamilyEdge } from '@/lib/family-tree-data'

interface SimulationNode extends FamilyNode, d3.SimulationNodeDatum {
  x?: number
  y?: number
  fx?: number | null
  fy?: number | null
}

interface SimulationLink extends d3.SimulationLinkDatum<SimulationNode> {
  source: SimulationNode | string
  target: SimulationNode | string
  type: 'spouse' | 'parent-child' | 'partner'
}

export default function FamilyTreeV6() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })

  useEffect(() => {
    // Responsive dimensions
    const updateDimensions = () => {
      if (typeof window !== 'undefined') {
        setDimensions({
          width: Math.max(800, window.innerWidth - 64),
          height: Math.max(600, window.innerHeight - 200),
        })
      }
    }
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    const { width, height } = dimensions

    // Clear previous render
    svg.selectAll('*').remove()

    // Create container group for zoom/pan
    const container = svg.append('g')

    // Create simulation nodes and links
    const nodes: SimulationNode[] = familyNodes.map(node => ({ ...node }))
    const links: SimulationLink[] = familyEdges.map(edge => ({
      source: edge.source,
      target: edge.target,
      type: edge.type,
    }))

    // D3 Force Simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink<SimulationNode, SimulationLink>(links)
          .id(d => d.id)
          .distance(d => {
            // Shorter distance for spouse/partner, longer for parent-child
            return d.type === 'spouse' || d.type === 'partner' ? 80 : 140
          })
          .strength(d => {
            // Stronger attraction for spouse/partner
            return d.type === 'spouse' || d.type === 'partner' ? 1.2 : 0.8
          })
      )
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(60))
      .force('x', d3.forceX(width / 2).strength(0.05))
      .force('y', d3.forceY(height / 2).strength(0.05))

    // Create gradients for glow effects
    const defs = svg.append('defs')

    Object.entries(sideColors).forEach(([side, color]) => {
      const gradient = defs.append('radialGradient').attr('id', `glow-${side}`)
      gradient.append('stop').attr('offset', '0%').attr('stop-color', color.hex).attr('stop-opacity', 0.8)
      gradient.append('stop').attr('offset', '50%').attr('stop-color', color.hex).attr('stop-opacity', 0.3)
      gradient.append('stop').attr('offset', '100%').attr('stop-color', color.hex).attr('stop-opacity', 0)

      const filter = defs.append('filter').attr('id', `shadow-${side}`).attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%')
      filter.append('feGaussianBlur').attr('in', 'SourceGraphic').attr('stdDeviation', 4)
      filter.append('feColorMatrix').attr('type', 'matrix').attr('values', `0 0 0 0 ${parseInt(color.hex.slice(1, 3), 16) / 255}
                      0 0 0 0 ${parseInt(color.hex.slice(3, 5), 16) / 255}
                      0 0 0 0 ${parseInt(color.hex.slice(5, 7), 16) / 255}
                      0 0 0 0.6 0`)
      const feMerge = filter.append('feMerge')
      feMerge.append('feMergeNode')
      feMerge.append('feMergeNode').attr('in', 'SourceGraphic')
    })

    // Create link elements
    const link = container
      .append('g')
      .selectAll('path')
      .data(links)
      .join('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', d => {
        const sourceNode = nodes.find(n => n.id === (typeof d.source === 'string' ? d.source : d.source.id))
        return sourceNode ? sideColors[sourceNode.side].hex : '#ffffff'
      })
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.3)
      .attr('stroke-dasharray', d => (d.type === 'spouse' || d.type === 'partner' ? '5,5' : 'none'))

    // Create node groups
    const node = container
      .append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .attr('class', 'node')
      .style('cursor', 'grab')
      .call(
        d3
          .drag<SVGGElement, SimulationNode>()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart()
            d.fx = d.x
            d.fy = d.y
            d3.select(event.sourceEvent.target).style('cursor', 'grabbing')
          })
          .on('drag', (event, d) => {
            d.fx = event.x
            d.fy = event.y
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0)
            d.fx = null
            d.fy = null
            d3.select(event.sourceEvent.target).style('cursor', 'grab')
          })
      )

    // Add glow circles (larger, behind)
    node
      .append('circle')
      .attr('r', 35)
      .attr('fill', d => `url(#glow-${d.side})`)
      .attr('opacity', 0.6)

    // Add main circles
    node
      .append('circle')
      .attr('r', 24)
      .attr('fill', d => sideColors[d.side].hex)
      .attr('fill-opacity', 0.2)
      .attr('stroke', d => sideColors[d.side].hex)
      .attr('stroke-width', 2)
      .attr('filter', d => `url(#shadow-${d.side})`)

    // Add name labels
    node
      .append('text')
      .text(d => d.name)
      .attr('y', 45)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('font-size', '14px')
      .attr('font-weight', '600')
      .attr('paint-order', 'stroke')
      .attr('stroke', '#0a0a0f')
      .attr('stroke-width', 3)
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')

    // Add role sublabels
    node
      .append('text')
      .text(d => d.role)
      .attr('y', 60)
      .attr('text-anchor', 'middle')
      .attr('fill', d => sideColors[d.side].hex)
      .attr('font-size', '11px')
      .attr('font-weight', '500')
      .attr('opacity', 0.8)

    // Update positions on simulation tick
    simulation.on('tick', () => {
      // Update links with curved paths
      link.attr('d', d => {
        const source = d.source as SimulationNode
        const target = d.target as SimulationNode

        const dx = (target.x || 0) - (source.x || 0)
        const dy = (target.y || 0) - (source.y || 0)
        const dr = Math.sqrt(dx * dx + dy * dy) * 0.5 // Curve radius

        return `M${source.x},${source.y} Q${(source.x! + target.x!) / 2},${(source.y! + target.y!) / 2 - dr} ${target.x},${target.y}`
      })

      // Update node positions
      node.attr('transform', d => `translate(${d.x},${d.y})`)
    })

    // Cleanup
    return () => {
      simulation.stop()
    }
  }, [dimensions])

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-[1400px] mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            V6 — Force-Directed Graph
          </h1>
          <p className="text-white/60 text-lg">D3 physics simulation with drag interaction</p>
        </div>

        {/* SVG Container */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-xl">
          <svg
            ref={svgRef}
            width={dimensions.width}
            height={dimensions.height}
            className="w-full"
            style={{ minHeight: '600px' }}
          />

          {/* Legend */}
          <div className="absolute top-6 right-6 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4 space-y-2">
            <div className="text-sm font-semibold text-white/80 mb-3">Family Lines</div>
            {Object.entries(sideColors).map(([side, color]) => (
              <div key={side} className="flex items-center gap-2 text-sm">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: color.hex,
                    boxShadow: `0 0 8px ${color.hex}`,
                  }}
                />
                <span className="text-white/70 capitalize">{side}</span>
              </div>
            ))}
            <div className="pt-3 mt-3 border-t border-white/10 text-xs text-white/50">
              Drag nodes to explore
            </div>
          </div>

          {/* Connection Types Legend */}
          <div className="absolute bottom-6 right-6 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4 space-y-2">
            <div className="text-sm font-semibold text-white/80 mb-3">Connections</div>
            <div className="flex items-center gap-2 text-sm">
              <svg width="30" height="2">
                <line x1="0" y1="1" x2="30" y2="1" stroke="white" strokeWidth="2" strokeOpacity="0.5" strokeDasharray="5,5" />
              </svg>
              <span className="text-white/70 text-xs">Married / Partner</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <svg width="30" height="2">
                <line x1="0" y1="1" x2="30" y2="1" stroke="white" strokeWidth="2" strokeOpacity="0.5" />
              </svg>
              <span className="text-white/70 text-xs">Parent-Child</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
          <p className="text-sm text-white/60">
            <strong className="text-white/80">Physics Simulation:</strong> Nodes attract and repel based on relationships.
            Drag any node to see the graph respond. The simulation continuously balances forces to find optimal positions.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
