'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Github,
  ExternalLink,
  Layers,
  Zap,
  Globe,
  Wrench,
  Package,
  FlaskConical,
  Star,
  Activity,
  GitBranch,
  Terminal,
  ArrowLeft,
  X,
  Plus,
  Minus,
  Maximize2,
  Info,
  ExternalLink as LaunchIcon
} from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'
import PremiumButton from '@/components/ui/PremiumButton'
import manifestData from '@/data/repos-manifest.json'

// ─── Types ────────────────────────────────────────────────────────────────
type RepoCluster = 'arcanea' | 'acos' | 'websites' | 'creator-tools' | 'products' | 'research'

interface Node {
  id: string
  label: string
  type: 'center' | 'cluster' | 'repo'
  cluster?: RepoCluster
  x: number
  y: number
  description?: string
  status?: string
  priority?: string
  url?: string
  deployed?: string
}

interface LinkLine {
  source: string
  target: string
  type: 'core' | 'dependency'
}

// ─── SVG Layout Coordinates (Center at 450, 350) ─────────────────────────
const INITIAL_NODES: Node[] = [
  // Center
  { id: 'center', label: 'FrankX Creator Hub', type: 'center', x: 450, y: 350, description: 'The nucleus connecting intelligence, automation, frontends, and creative assets.' },

  // Clusters
  { id: 'cluster-arcanea', label: 'Arcanea', type: 'cluster', cluster: 'arcanea', x: 220, y: 200, description: 'L1 Intelligence & Lore' },
  { id: 'cluster-acos', label: 'ACOS', type: 'cluster', cluster: 'acos', x: 450, y: 150, description: 'L3 Production & Substrates' },
  { id: 'cluster-websites', label: 'Websites', type: 'cluster', cluster: 'websites', x: 680, y: 200, description: 'L5 Distribution & Frontends' },
  { id: 'cluster-tools', label: 'Creator Tools', type: 'cluster', cluster: 'creator-tools', x: 680, y: 500, description: 'L3 Production & Automations' },
  { id: 'cluster-products', label: 'Products', type: 'cluster', cluster: 'products', x: 450, y: 550, description: 'L5 Distribution & Revenue' },
  { id: 'cluster-research', label: 'Research', type: 'cluster', cluster: 'research', x: 220, y: 500, description: 'L1 Intelligence & Studies' },

  // Arcanea Repos
  { id: 'arcanea-core', label: 'arcanea-core', type: 'repo', cluster: 'arcanea', x: 100, y: 130, description: 'Core engine and lore tracking mechanisms for Arcanea.' },
  { id: 'arcanea-studio', label: 'arcanea-studio', type: 'repo', cluster: 'arcanea', x: 120, y: 270, description: 'Visual asset workspace for editing and presenting mythic lore.' },

  // ACOS Repos
  { id: 'agentic-creator-os', label: 'agentic-creator-os', type: 'repo', cluster: 'acos', x: 450, y: 30, description: 'The primary operating system orchestrating commands and agent harnesses.' },
  { id: 'agentic-ops-hub', label: 'agentic-ops-hub', type: 'repo', cluster: 'acos', x: 320, y: 60, description: 'Console backend mapping task queues, schedules, and agent scorecards.' },

  // Websites Repos
  { id: 'FrankX', label: 'FrankX', type: 'repo', cluster: 'websites', x: 780, y: 130, description: 'Primary private development and content authoring codebase.' },
  { id: 'frankx.ai-vercel-website', label: 'frankx-prod-site', type: 'repo', cluster: 'websites', x: 800, y: 270, description: 'The production-ready Vercel-deployed static portal.' },

  // Creator Tools Repos
  { id: 'suno-ai-mastery', label: 'suno-ai-mastery', type: 'repo', cluster: 'creator-tools', x: 800, y: 430, description: 'Music composition systems mapping prompts to Suno tracks.' },
  { id: 'descript-operator', label: 'descript-operator', type: 'repo', cluster: 'creator-tools', x: 780, y: 570, description: 'Video post-production and podcast snippet atomizers.' },

  // Products Repos
  { id: 'product-engine', label: 'product-engine', type: 'repo', cluster: 'products', x: 350, y: 670, description: 'Digital product packing and billing gateway connector.' },
  { id: 'creator-dashboard', label: 'creator-dashboard', type: 'repo', cluster: 'products', x: 550, y: 670, description: 'Personal MRR, conversion, and performance tracker.' },

  // Research Repos
  { id: 'research-scan', label: 'research-scan', type: 'repo', cluster: 'research', x: 120, y: 430, description: 'AI agent query system scanning arXiv and papers.' },
  { id: 'research-synthesis', label: 'research-synthesis', type: 'repo', cluster: 'research', x: 100, y: 570, description: 'Deconstructs research and indexes learnings to Starlight Vaults.' }
]

const INITIAL_LINKS: LinkLine[] = [
  // Center to Clusters
  { source: 'center', target: 'cluster-arcanea', type: 'core' },
  { source: 'center', target: 'cluster-acos', type: 'core' },
  { source: 'center', target: 'cluster-websites', type: 'core' },
  { source: 'center', target: 'cluster-tools', type: 'core' },
  { source: 'center', target: 'cluster-products', type: 'core' },
  { source: 'center', target: 'cluster-research', type: 'core' },

  // Cluster to Repos
  { source: 'cluster-arcanea', target: 'arcanea-core', type: 'core' },
  { source: 'cluster-arcanea', target: 'arcanea-studio', type: 'core' },
  { source: 'cluster-acos', target: 'agentic-creator-os', type: 'core' },
  { source: 'cluster-acos', target: 'agentic-ops-hub', type: 'core' },
  { source: 'cluster-websites', target: 'FrankX', type: 'core' },
  { source: 'cluster-websites', target: 'frankx.ai-vercel-website', type: 'core' },
  { source: 'cluster-tools', target: 'suno-ai-mastery', type: 'core' },
  { source: 'cluster-tools', target: 'descript-operator', type: 'core' },
  { source: 'cluster-products', target: 'product-engine', type: 'core' },
  { source: 'cluster-products', target: 'creator-dashboard', type: 'core' },
  { source: 'cluster-research', target: 'research-scan', type: 'core' },
  { source: 'cluster-research', target: 'research-synthesis', type: 'core' },

  // Strategic Dependencies (Dynamic links)
  { source: 'agentic-creator-os', target: 'FrankX', type: 'dependency' },
  { source: 'arcanea-core', target: 'FrankX', type: 'dependency' },
  { source: 'suno-ai-mastery', target: 'FrankX', type: 'dependency' }
]

const CLUSTER_METADATA: Record<RepoCluster, { color: string; rgb: string; icon: React.ReactNode }> = {
  arcanea: { color: 'text-purple-400', rgb: '168, 85, 247', icon: <Layers className="w-5 h-5" /> },
  acos: { color: 'text-emerald-400', rgb: '16, 185, 129', icon: <Zap className="w-5 h-5" /> },
  websites: { color: 'text-cyan-400', rgb: '6, 182, 212', icon: <Globe className="w-5 h-5" /> },
  'creator-tools': { color: 'text-amber-400', rgb: '245, 158, 11', icon: <Wrench className="w-5 h-5" /> },
  products: { color: 'text-rose-400', rgb: '244, 63, 94', icon: <Package className="w-5 h-5" /> },
  research: { color: 'text-sky-400', rgb: '56, 189, 248', icon: <FlaskConical className="w-5 h-5" /> }
}

export default function MapV2Page() {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [selectedClusterFilter, setSelectedClusterFilter] = useState<RepoCluster | 'all'>('all')

  // Selected node state for detailed side preview
  const [selectedNodeId, setSelectedNodeId] = useState<string>('center')

  // Find node details
  const selectedNode = useMemo(() => {
    const defaultNode = INITIAL_NODES.find(n => n.id === selectedNodeId)
    // Try to enrich with manifestData if it's a repository
    if (defaultNode && defaultNode.type === 'repo') {
      const enrich = manifestData.repos.find(r => r.name === defaultNode.label)
      if (enrich) {
        return {
          ...defaultNode,
          status: enrich.status,
          priority: enrich.priority,
          url: enrich.url,
          deployed: enrich.deployed,
          tags: enrich.tags,
          updatedAt: enrich.updatedAt
        }
      }
    }
    return defaultNode
  }, [selectedNodeId])

  // Zoom helpers
  const handleZoomIn = () => setZoom(z => Math.min(z + 0.15, 2))
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.15, 0.5))
  const handleZoomReset = () => { setZoom(1); setPan({ x: 0, y: 0 }) }

  // Drag pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'button' || (e.target as HTMLElement).closest('.node-element')) return
    setIsDragging(true)
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#A9A9AA] font-sans antialiased select-none overflow-hidden relative">
      {/* Background space grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none -z-10" />

      {/* Top Header Row */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
        <Link
          href="/map"
          className="inline-flex items-center gap-2 text-xs font-mono text-white/45 hover:text-white/80 transition-colors uppercase tracking-widest"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Map Hub</span>
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <span className="p-1 rounded bg-cyan-400/10 border border-cyan-400/20 text-[10px] text-cyan-400 uppercase font-mono tracking-wider">
            Approach v2: Node Graph
          </span>
        </div>
      </div>

      {/* Interactive Controls Overlay */}
      <div className="absolute top-6 right-6 z-10 flex items-center gap-3 bg-space border border-white/5 p-2 rounded-xl">
        <button
          onClick={handleZoomIn}
          className="p-2 bg-white/5 hover:bg-white/10 text-white border border-white/5 rounded-lg transition-colors"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 bg-white/5 hover:bg-white/10 text-white border border-white/5 rounded-lg transition-colors"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomReset}
          className="p-2 bg-white/5 hover:bg-white/10 text-white border border-white/5 rounded-lg transition-colors"
          title="Reset Fit"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-white/5" />
        <select
          value={selectedClusterFilter}
          onChange={(e) => setSelectedClusterFilter(e.target.value as any)}
          className="px-2.5 py-1.5 bg-white/5 border border-white/5 rounded-lg text-xs text-white/80 focus:outline-none focus:border-cyan-500/50 transition-colors font-mono"
        >
          <option value="all">Focus: All</option>
          <option value="arcanea">Arcanea</option>
          <option value="acos">ACOS</option>
          <option value="websites">Websites</option>
          <option value="creator-tools">Creator Tools</option>
          <option value="products">Products</option>
          <option value="research">Research</option>
        </select>
      </div>

      {/* ─── Node Link Canvas ────────────────────────────────────────────── */}
      <div
        className="w-full h-screen cursor-grab active:cursor-grabbing overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg
          className="w-full h-full"
          style={{ transformOrigin: '0 0' }}
        >
          <defs>
            {/* Glowing marker dots */}
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="18"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" opacity="0.5" />
            </marker>
          </defs>

          <g
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transition: isDragging ? 'none' : 'transform 0.15s ease-out'
            }}
          >
            {/* 1. Connection lines */}
            {INITIAL_LINKS.map((link, idx) => {
              const sourceNode = INITIAL_NODES.find(n => n.id === link.source)
              const targetNode = INITIAL_NODES.find(n => n.id === link.target)

              if (!sourceNode || !targetNode) return null

              const isSourceClusterFiltered = selectedClusterFilter !== 'all' && sourceNode.cluster && sourceNode.cluster !== selectedClusterFilter
              const isTargetClusterFiltered = selectedClusterFilter !== 'all' && targetNode.cluster && targetNode.cluster !== selectedClusterFilter
              const isDimmed = isSourceClusterFiltered || isTargetClusterFiltered

              // Color of the line
              let lineColor = 'rgba(255,255,255,0.06)'
              let glowColor = 'transparent'
              if (link.type === 'dependency') {
                lineColor = 'rgba(16, 185, 129, 0.2)'
                glowColor = 'rgba(16, 185, 129, 0.4)'
              } else if (sourceNode.type === 'center' && targetNode.cluster) {
                const meta = CLUSTER_METADATA[targetNode.cluster]
                lineColor = `rgba(${meta?.rgb || '255,255,255'}, 0.15)`
                glowColor = `rgba(${meta?.rgb || '255,255,255'}, 0.3)`
              } else if (sourceNode.cluster) {
                const meta = CLUSTER_METADATA[sourceNode.cluster]
                lineColor = `rgba(${meta?.rgb || '255,255,255'}, 0.08)`
              }

              return (
                <g key={`${link.source}-${link.target}-${idx}`} className="transition-opacity duration-300" opacity={isDimmed ? 0.15 : 1}>
                  {/* Underlay glow path */}
                  <path
                    d={`M ${sourceNode.x} ${sourceNode.y} Q ${(sourceNode.x + targetNode.x) / 2} ${(sourceNode.y + targetNode.y) / 2 - 15}, ${targetNode.x} ${targetNode.y}`}
                    fill="none"
                    stroke={glowColor}
                    strokeWidth={4}
                    className="opacity-0 hover:opacity-100 transition-opacity duration-300 blur-sm"
                  />
                  {/* Primary path */}
                  <motion.path
                    d={`M ${sourceNode.x} ${sourceNode.y} Q ${(sourceNode.x + targetNode.x) / 2} ${(sourceNode.y + targetNode.y) / 2 - 15}, ${targetNode.x} ${targetNode.y}`}
                    fill="none"
                    stroke={lineColor}
                    strokeWidth={link.type === 'dependency' ? 1.5 : 1}
                    strokeDasharray={link.type === 'dependency' ? '4,4' : undefined}
                  />
                  {/* Travelling pulse */}
                  {link.type === 'core' && (
                    <motion.path
                      d={`M ${sourceNode.x} ${sourceNode.y} Q ${(sourceNode.x + targetNode.x) / 2} ${(sourceNode.y + targetNode.y) / 2 - 15}, ${targetNode.x} ${targetNode.y}`}
                      fill="none"
                      stroke={glowColor}
                      strokeWidth={1.5}
                      strokeDasharray="10 150"
                      animate={{ strokeDashoffset: [0, -320] }}
                      transition={{
                        repeat: Infinity,
                        duration: link.source === 'center' ? 3.5 : 5,
                        ease: 'linear'
                      }}
                    />
                  )}
                </g>
              )
            })}

            {/* 2. Nodes */}
            {INITIAL_NODES.map((node) => {
              const isFilteredOut = selectedClusterFilter !== 'all' && node.cluster && node.cluster !== selectedClusterFilter
              const isCenterDimmed = selectedClusterFilter !== 'all' && node.type === 'center'
              const isDimmed = isFilteredOut || isCenterDimmed
              const isSelected = node.id === selectedNodeId

              // Sizing & styling based on type
              let nodeSize = 12
              let ringColor = 'border-white/20'
              let bgClass = 'bg-[#111113]'
              let textOffset = 20

              if (node.type === 'center') {
                nodeSize = 22
                ringColor = 'border-white/40'
                bgClass = 'bg-white'
              } else if (node.type === 'cluster' && node.cluster) {
                nodeSize = 16
                const meta = CLUSTER_METADATA[node.cluster]
                ringColor = node.cluster === 'acos' ? 'border-emerald-400' : node.cluster === 'websites' ? 'border-cyan-400' : node.cluster === 'arcanea' ? 'border-purple-400' : node.cluster === 'products' ? 'border-rose-400' : node.cluster === 'creator-tools' ? 'border-amber-400' : 'border-sky-400'
                bgClass = 'bg-black'
              } else if (node.cluster) {
                const meta = CLUSTER_METADATA[node.cluster]
                ringColor = node.cluster === 'acos' ? 'border-emerald-400/40' : node.cluster === 'websites' ? 'border-cyan-400/40' : node.cluster === 'arcanea' ? 'border-purple-400/40' : node.cluster === 'products' ? 'border-rose-400/40' : node.cluster === 'creator-tools' ? 'border-amber-400/40' : 'border-sky-400/40'
              }

              return (
                <g
                  key={node.id}
                  className="node-element cursor-pointer transition-opacity duration-300"
                  onClick={() => setSelectedNodeId(node.id)}
                  opacity={isDimmed ? 0.2 : 1}
                >
                  {/* Glowing background halo if selected */}
                  {isSelected && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={nodeSize + 12}
                      fill={node.cluster ? `rgba(${CLUSTER_METADATA[node.cluster]?.rgb}, 0.08)` : 'rgba(255,255,255,0.05)'}
                      className="animate-ping"
                      style={{ animationDuration: '3s' }}
                    />
                  )}

                  {/* Node circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={nodeSize}
                    fill={node.type === 'center' ? '#FFFFFF' : '#0a0a0b'}
                    stroke={isSelected ? '#FFFFFF' : node.type === 'center' ? '#000000' : node.cluster ? (node.cluster === 'acos' ? '#10b981' : node.cluster === 'websites' ? '#06b6d4' : node.cluster === 'arcanea' ? '#AB47C7' : node.cluster === 'products' ? '#f43f5e' : node.cluster === 'creator-tools' ? '#f59e0b' : '#38bdf8') : '#252530'}
                    strokeWidth={isSelected ? 3 : node.type === 'center' ? 4 : 2}
                    className="transition-all duration-200"
                  />

                  {/* Inner node indicator for clusters */}
                  {node.type === 'cluster' && node.cluster && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={4}
                      fill={node.cluster === 'acos' ? '#10b981' : node.cluster === 'websites' ? '#06b6d4' : node.cluster === 'arcanea' ? '#AB47C7' : node.cluster === 'products' ? '#f43f5e' : node.cluster === 'creator-tools' ? '#f59e0b' : '#38bdf8'}
                    />
                  )}

                  {/* Label */}
                  <text
                    x={node.x}
                    y={node.y + textOffset}
                    textAnchor="middle"
                    fill={isSelected ? '#FFFFFF' : '#A9A9AA'}
                    className={`text-[10px] font-mono select-none pointer-events-none transition-colors duration-200 ${
                      isSelected ? 'font-bold' : ''
                    }`}
                  >
                    {node.label}
                  </text>
                </g>
              )
            })}
          </g>
        </svg>
      </div>

      {/* Floating Info Overlay (Bottom-Left) */}
      <div className="absolute bottom-6 left-6 z-10 max-w-sm pointer-events-none">
        <GlowCard color="white" className="p-4 bg-black/80 backdrop-blur-md border border-white/5 pointer-events-auto">
          <div className="flex gap-2.5 items-start">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-semibold text-white mb-1 uppercase tracking-wide">Interactive Strategic Map</h3>
              <p className="text-[11px] text-white/50 leading-relaxed">
                Left-click and drag the background canvas to pan. Use Zoom controls to inspect clusters. Click any node to load full metadata, clone statements, and repository stats.
              </p>
            </div>
          </div>
        </GlowCard>
      </div>

      {/* Sidebar Detail Panel (Right) */}
      <div className="absolute top-24 right-6 bottom-6 w-[340px] z-10 pointer-events-none">
        <AnimatePresence mode="wait">
          {selectedNode && (
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.2 }}
              className="h-full pointer-events-auto"
            >
              <GlowCard color={selectedNode.cluster ? (selectedNode.cluster === 'acos' ? 'emerald' : selectedNode.cluster === 'websites' ? 'cyan' : selectedNode.cluster === 'arcanea' ? 'violet' : selectedNode.cluster === 'products' ? 'rose' : selectedNode.cluster === 'creator-tools' ? 'amber' : 'blue') : 'white'} className="p-5 h-full flex flex-col justify-between overflow-y-auto">
                <div>
                  {/* Close/Deselect */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                      Node Inspector
                    </span>
                    <button
                      onClick={() => setSelectedNodeId('center')}
                      className="p-1 hover:bg-white/5 rounded text-white/40 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Header */}
                  <div className="mb-6">
                    {selectedNode.cluster && (
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 mb-1 block">
                        {selectedNode.cluster} CLUSTER
                      </span>
                    )}
                    <h2 className="text-lg font-bold text-white font-mono leading-tight">
                      {selectedNode.label}
                    </h2>
                  </div>

                  {/* Meta badges */}
                  {selectedNode.status && (
                    <div className="flex gap-2 mb-6">
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-white/70 uppercase">
                        {selectedNode.status}
                      </span>
                      {selectedNode.priority && (
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-red-400/10 border border-red-400/20 text-red-300 uppercase">
                          {selectedNode.priority}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Node details */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-wider mb-1">Details</h4>
                      <p className="text-xs text-white/60 leading-relaxed bg-white/[0.01] border border-white/[0.04] p-3 rounded-lg">
                        {selectedNode.description || 'No description available for this structural node.'}
                      </p>
                    </div>

                    {selectedNode.type === 'repo' && (
                      <div>
                        <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-wider mb-1">Install Command</h4>
                        <div className="bg-black/40 border border-white/5 rounded-lg p-2.5 font-mono text-[10px] text-emerald-300 select-all overflow-x-auto whitespace-nowrap">
                          git clone https://github.com/frankxai/{selectedNode.label}.git
                        </div>
                      </div>
                    )}

                    {(selectedNode as any).tags && (selectedNode as any).tags.length > 0 && (
                      <div>
                        <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-wider mb-2">Capabilities</h4>
                        <div className="flex flex-wrap gap-1">
                          {(selectedNode as any).tags.map((tag: string) => (
                            <span key={tag} className="text-[9px] font-mono bg-white/5 border border-white/5 px-2 py-0.5 rounded text-white/60">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer links */}
                {selectedNode.url && (
                  <div className="pt-4 border-t border-white/5 flex gap-2">
                    <PremiumButton
                      href={selectedNode.url}
                      variant="primary"
                      size="sm"
                      className="flex-1 text-xs"
                    >
                      <Github className="w-3.5 h-3.5 mr-1.5" />
                      GitHub Repo
                    </PremiumButton>
                    {selectedNode.deployed && (
                      <a
                        href={selectedNode.deployed}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-full bg-white/5 border border-white/5 text-white/60 hover:text-white transition-colors"
                      >
                        <LaunchIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}
              </GlowCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
