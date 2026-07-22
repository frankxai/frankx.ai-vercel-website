'use client'

import { useCallback } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowLeft, LayoutGrid } from 'lucide-react'

// Dynamic import of Tldraw to bypass SSR and prevent server compilation errors
const Tldraw = dynamic(
  async () => {
    const { Tldraw } = await import('tldraw')
    return Tldraw
  },
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen items-center justify-center bg-[#0a0a0b]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
          <p className="text-sm text-slate-400">Loading Strategist Canvas...</p>
        </div>
      </div>
    )
  }
)

import 'tldraw/tldraw.css'

export default function AdminCanvasPage() {
  const handleMount = useCallback((editor: any) => {
    editor.updateInstanceState({ isGridMode: true })

    if (editor.getCurrentPageShapeIds().size > 0) return

    // Pre-populate shapes for the Creator Content Strategy layout
    editor.createShapes([
      // Title Block
      {
        id: 'shape:title',
        type: 'text',
        x: 100,
        y: 50,
        props: {
          text: 'ACOS v15 Content Strategist Canvas',
          size: 'l',
          color: 'orange',
          font: 'serif',
          autoSize: true,
        },
      },
      {
        id: 'shape:subtitle',
        type: 'text',
        x: 100,
        y: 100,
        props: {
          text: 'Drag nodes and map your automated multi-agent content pipelines E2E.',
          size: 's',
          color: 'grey',
          font: 'sans',
          autoSize: true,
        },
      },

      // Phase 1: Ideation (Obsidian / Notion inputs)
      {
        id: 'shape:frame-ideation',
        type: 'frame',
        x: 100,
        y: 180,
        props: { w: 320, h: 220, name: 'Phase 1: Ideation (Second Brain)' },
      },
      {
        id: 'shape:note-obsidian',
        type: 'note',
        x: 130,
        y: 220,
        props: {
          text: 'Obsidian Sync\nReads raw notes & tags (#thesis, #idea) via qme-second-brain.',
          color: 'violet',
          size: 's',
          font: 'serif',
        },
      },

      // Phase 2: Copywriting (Taste-Guarded)
      {
        id: 'shape:frame-copy',
        type: 'frame',
        x: 480,
        y: 180,
        props: { w: 320, h: 220, name: 'Phase 2: Writing & Vetting' },
      },
      {
        id: 'shape:note-taste',
        type: 'note',
        x: 510,
        y: 220,
        props: {
          text: 'Taste Guard Check\nRuns bin/taste-guard.mjs to remove generic marketing language.',
          color: 'green',
          size: 's',
          font: 'serif',
        },
      },

      // Phase 3: Visual Generation
      {
        id: 'shape:frame-visuals',
        type: 'frame',
        x: 860,
        y: 180,
        props: { w: 320, h: 220, name: 'Phase 3: Visual & Audio Gen' },
      },
      {
        id: 'shape:note-images',
        type: 'note',
        x: 890,
        y: 220,
        props: {
          text: 'Image Routing\nUniversal gateway routes via platform (nb2, grok, higgsfield).',
          color: 'blue',
          size: 's',
          font: 'serif',
        },
      },

      // Phase 4: Multi-Channel Distribution
      {
        id: 'shape:frame-dist',
        type: 'frame',
        x: 1240,
        y: 180,
        props: { w: 320, h: 220, name: 'Phase 4: Distribution Calendar' },
      },
      {
        id: 'shape:note-postiz',
        type: 'note',
        x: 1270,
        y: 220,
        props: {
          text: 'Postiz Distributor\nQueues formatted X/LinkedIn threads and YouTube Shorts scripts.',
          color: 'orange',
          size: 's',
          font: 'serif',
        },
      },
    ])

    // Center camera on nodes
    editor.zoomToFit({ animation: { duration: 0 } })
    editor.setCurrentTool('hand')
  }, [])

  return (
    <div className="flex h-screen w-screen flex-col bg-[#0a0a0b] text-white">
      {/* Top Gated Header */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/5 bg-[#0a0a0b]/80 px-6 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/5 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-300 transition-all hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={14} />
            <span>Dashboard</span>
          </Link>
          <span className="h-4 w-[1px] bg-white/10" />
          <div className="flex items-center gap-1.5 text-sm font-bold">
            <LayoutGrid size={16} className="text-amber-400" />
            <span>Strategist Canvas (v15.0.0)</span>
          </div>
        </div>
        <div className="text-right text-xs text-slate-500 font-mono">
          <span>PRIVATE OWNER SPACE</span>
        </div>
      </header>

      {/* Main Canvas Workspace */}
      <div className="relative flex-1">
        <div className="absolute inset-0 z-0">
          <Tldraw onMount={handleMount} />
        </div>
      </div>
    </div>
  )
}
