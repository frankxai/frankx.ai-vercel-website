'use client'

import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'
import { familyNodes, familyEdges, sideColors } from '@/lib/family-tree-data'
import { ChevronDown, ChevronUp, RotateCw } from 'lucide-react'

export default function FamilyTreeMermaidPage() {
  const [isInitialized, setIsInitialized] = useState(false)
  const [showSource, setShowSource] = useState(false)
  const [layout, setLayout] = useState<'TD' | 'LR'>('TD')
  const diagramRef = useRef<HTMLDivElement>(null)

  // Generate Mermaid graph definition from family data
  const generateMermaidGraph = (layoutType: 'TD' | 'LR') => {
    const lines: string[] = []
    lines.push(`graph ${layoutType}`)

    // Add nodes
    familyNodes.forEach(node => {
      const label = node.bornName
        ? `${node.name}<br/><small>${node.bornName} · ${node.role}</small>`
        : `${node.name}<br/><small>${node.role}</small>`
      lines.push(`  ${node.id}["${label}"]`)
    })

    lines.push('')

    // Add edges
    familyEdges.forEach(edge => {
      if (edge.type === 'spouse' || edge.type === 'partner') {
        // Horizontal line for marriages/partnerships
        lines.push(`  ${edge.source} --- ${edge.target}`)
      } else {
        // Arrow for parent-child relationships
        lines.push(`  ${edge.source} --> ${edge.target}`)
      }
    })

    lines.push('')

    // Add class definitions
    lines.push(`  classDef gorte fill:#f59e0b20,stroke:#f59e0b,stroke-width:2px,color:#f59e0b`)
    lines.push(`  classDef riemer fill:#06b6d420,stroke:#06b6d4,stroke-width:2px,color:#06b6d4`)
    lines.push(`  classDef bridge fill:#10b98120,stroke:#10b981,stroke-width:2px,color:#10b981`)
    lines.push(`  classDef current fill:#8b5cf620,stroke:#8b5cf6,stroke-width:2px,color:#8b5cf6`)
    lines.push(`  classDef partner fill:#f43f5e20,stroke:#f43f5e,stroke-width:2px,color:#f43f5e`)

    lines.push('')

    // Apply classes to nodes
    const nodesBySide: Record<string, string[]> = {
      gorte: [],
      riemer: [],
      bridge: [],
      current: [],
      partner: []
    }

    familyNodes.forEach(node => {
      nodesBySide[node.side].push(node.id)
    })

    Object.entries(nodesBySide).forEach(([side, ids]) => {
      if (ids.length > 0) {
        lines.push(`  class ${ids.join(',')} ${side}`)
      }
    })

    return lines.join('\n')
  }

  const mermaidGraph = generateMermaidGraph(layout)

  useEffect(() => {
    const initMermaid = async () => {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        themeVariables: {
          darkMode: true,
          background: '#0a0a0f',
          primaryColor: '#8b5cf6',
          primaryTextColor: '#e5e7eb',
          primaryBorderColor: '#8b5cf6',
          lineColor: '#4b5563',
          secondaryColor: '#1e293b',
          tertiaryColor: '#0f172a',
          fontSize: '14px',
          fontFamily: 'Inter, system-ui, sans-serif'
        },
        flowchart: {
          curve: 'basis',
          padding: 20,
          nodeSpacing: 80,
          rankSpacing: 100,
          useMaxWidth: true
        }
      })
      setIsInitialized(true)
    }

    initMermaid()
  }, [])

  useEffect(() => {
    if (!isInitialized || !diagramRef.current) return

    const renderDiagram = async () => {
      try {
        // Clear previous diagram
        diagramRef.current!.innerHTML = ''

        // Render new diagram
        // NOTE: mermaid.render() returns sanitized SVG - safe to use innerHTML
        const { svg } = await mermaid.render('family-mermaid', mermaidGraph)
        diagramRef.current!.innerHTML = svg
      } catch (error) {
        console.error('Mermaid rendering error:', error)
        diagramRef.current!.innerHTML = `<div class="text-red-400 p-4">Error rendering diagram: ${error}</div>`
      }
    }

    renderDiagram()
  }, [isInitialized, mermaidGraph])

  const toggleLayout = () => {
    setLayout(prev => prev === 'TD' ? 'LR' : 'TD')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                V13 — Mermaid.js Auto-Generated
              </h1>
              <p className="text-white/60 mt-2">
                Diagram rendered from Mermaid syntax, auto-generated from family data
              </p>
            </div>
            <button
              onClick={toggleLayout}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
              title="Toggle layout"
            >
              <RotateCw className="w-4 h-4" />
              <span className="text-sm">{layout === 'TD' ? 'Top-Down' : 'Left-Right'}</span>
            </button>
          </div>

          {/* Pipeline Indicator */}
          <div className="flex items-center gap-2 text-sm text-white/40">
            <span>.frankx/family/*.md</span>
            <span>→</span>
            <span>lib/family-tree-data.ts</span>
            <span>→</span>
            <span className="text-violet-400">Mermaid syntax</span>
            <span>→</span>
            <span className="text-purple-400">SVG diagram</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 text-sm">
          {Object.entries(sideColors).map(([side, colors]) => (
            <div key={side} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors.hex }}
              />
              <span className="text-white/70 capitalize">{side}</span>
            </div>
          ))}
        </div>

        {/* Mermaid Diagram Container */}
        <div className="relative rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl p-8 overflow-x-auto">
          <div
            ref={diagramRef}
            className="flex justify-center items-center min-h-[600px]"
          >
            {!isInitialized && (
              <div className="text-white/40 flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-violet-400 border-t-transparent rounded-full animate-spin" />
                Initializing Mermaid...
              </div>
            )}
          </div>
        </div>

        {/* Source Code Section */}
        <div className="space-y-3">
          <button
            onClick={() => setShowSource(!showSource)}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            {showSource ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span className="text-sm font-medium">
              {showSource ? 'Hide' : 'Show'} Mermaid Source Code
            </span>
          </button>

          {showSource && (
            <div className="rounded-xl border border-white/10 bg-[#0d1117] p-6 overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-white/40">Mermaid Graph Definition</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(mermaidGraph)
                  }}
                  className="text-xs px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-colors"
                >
                  Copy
                </button>
              </div>
              <pre className="text-sm text-emerald-400 font-mono leading-relaxed">
                <code>{mermaidGraph}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="text-2xl font-bold text-violet-400">{familyNodes.length}</div>
            <div className="text-sm text-white/60 mt-1">Family Members</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="text-2xl font-bold text-purple-400">{familyEdges.length}</div>
            <div className="text-sm text-white/60 mt-1">Relationships</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="text-2xl font-bold text-fuchsia-400">3</div>
            <div className="text-sm text-white/60 mt-1">Generations</div>
          </div>
        </div>

        {/* Technical Notes */}
        <div className="rounded-lg border border-violet-500/20 bg-violet-500/5 p-6 space-y-3">
          <h3 className="font-semibold text-violet-400">Technical Implementation</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <span className="text-violet-400 mt-0.5">•</span>
              <span>
                <strong className="text-white/90">Auto-generation:</strong> Mermaid syntax generated from TypeScript data structure
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-violet-400 mt-0.5">•</span>
              <span>
                <strong className="text-white/90">Dynamic rendering:</strong> Uses mermaid.render() with custom dark theme
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-violet-400 mt-0.5">•</span>
              <span>
                <strong className="text-white/90">Layout toggle:</strong> Switch between top-down (TD) and left-right (LR) orientations
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-violet-400 mt-0.5">•</span>
              <span>
                <strong className="text-white/90">Color coding:</strong> Five family sides styled with Mermaid classDef
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-violet-400 mt-0.5">•</span>
              <span>
                <strong className="text-white/90">Edge types:</strong> Horizontal lines (---) for marriages, arrows (--&gt;) for parent-child
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-violet-400 mt-0.5">•</span>
              <span>
                <strong className="text-white/90">Source visibility:</strong> View and copy raw Mermaid syntax for debugging
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
