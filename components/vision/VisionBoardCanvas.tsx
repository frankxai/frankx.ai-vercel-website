'use client'

import { useCallback, useMemo } from 'react'
import {
  Tldraw,
  createShapeId,
  toRichText,
  type Editor,
  type TLDefaultColorStyle,
} from 'tldraw'
import 'tldraw/tldraw.css'

import type { VisionBoardContext } from '@/lib/vision-context.types'

type ShapeSeed = Parameters<Editor['createShapes']>[0][number]

type VisionCluster = {
  id: string
  title: string
  subtitle: string
  x: number
  y: number
  noteColor: TLDefaultColorStyle
  items: string[]
}

type VisionBoardCanvasProps = {
  context: VisionBoardContext
}

function trimLine(value: string, max = 140): string {
  if (value.length <= max) return value
  return `${value.slice(0, max - 1)}...`
}

function withPrefix(segment: string): string {
  if (segment === 'home') return '/ (home)'
  return `/${segment}`
}

function buildVisionClusters(context: VisionBoardContext): VisionCluster[] {
  const generatedAtLabel = new Date(context.generatedAt).toLocaleString('en-US')

  const sectionItems = context.site.topSections.map(
    (section) => `${withPrefix(section.segment)} (${section.count} routes)`
  )

  const routeItems = context.site.signatureRoutes.map((route) => route)

  const categoryItems = context.products.categories.map(
    (category) => `Category: ${category}`
  )

  const productItems = context.products.names.map((name) => `Product: ${name}`)

  const featuredArticleItems = context.content.featuredArticles.map(
    (title) => `Article: ${title}`
  )

  const playlistItems = context.content.playlistNames.map(
    (name) => `Playlist: ${name}`
  )

  const milestoneItems = context.strategy.milestones.map(
    (milestone) => `Milestone: ${milestone}`
  )

  const pillarItems = context.strategy.pillars.map((pillar) => `Pillar: ${pillar}`)
  const ritualItems = context.strategy.rituals.map((ritual) => `Ritual: ${ritual}`)
  const signalItems = context.strategy.signals.map((signal) => `Signal: ${signal}`)
  const actionItems = context.strategy.nextActions.map((action) => `Action: ${action}`)
  const agentItems = context.strategy.agents.map((agent) => `Agent: ${agent}`)

  return [
    {
      id: 'north-star',
      title: 'North Star',
      subtitle: 'Master orientation for the FrankX ecosystem.',
      x: 0,
      y: 220,
      noteColor: 'yellow',
      items: [
        context.strategy.vision || 'Vision statement is currently being finalized.',
        `Routes mapped: ${context.site.totalRoutes}`,
        `Products mapped: ${context.products.count}`,
        `Blog index size: ${context.content.blogCount}`,
        `Music inventory: ${context.content.musicPublishedCount} visible / ${context.content.musicEstimatedCount}+ estimated`,
        `Profiles tracked: ${context.content.profileCount}`,
        `Snapshot generated: ${generatedAtLabel}`,
      ],
    },
    {
      id: 'site-map',
      title: 'Site Universe',
      subtitle: 'Where your architecture is currently densest.',
      x: 1000,
      y: 220,
      noteColor: 'light-blue',
      items: sectionItems.slice(0, 18),
    },
    {
      id: 'route-signatures',
      title: 'Signature Routes',
      subtitle: 'High-signal pathways across frankx.ai.',
      x: 2000,
      y: 220,
      noteColor: 'blue',
      items: routeItems.slice(0, 18),
    },
    {
      id: 'product-map',
      title: 'Product Architecture',
      subtitle: 'Offers, categories, and packaging inventory.',
      x: 0,
      y: 1620,
      noteColor: 'green',
      items: [...categoryItems, ...productItems].slice(0, 18),
    },
    {
      id: 'content-engine',
      title: 'Content Engine',
      subtitle: 'Editorial + music systems fueling distribution.',
      x: 1000,
      y: 1620,
      noteColor: 'light-green',
      items: [
        ...featuredArticleItems,
        ...playlistItems,
        `Blog articles indexed: ${context.content.blogCount}`,
        `Music profile source: data/inventories/frankx/music.json`,
      ].slice(0, 18),
    },
    {
      id: 'strategy-pillars',
      title: 'Strategic Pillars',
      subtitle: 'Vision, pillars, and execution milestones.',
      x: 2000,
      y: 1620,
      noteColor: 'orange',
      items: [context.strategy.vision, ...pillarItems, ...milestoneItems].slice(0, 18),
    },
    {
      id: 'rituals-signals',
      title: 'Operating Rhythms',
      subtitle: 'Cadence loops that compound your output.',
      x: 0,
      y: 3020,
      noteColor: 'light-violet',
      items: [...ritualItems, ...signalItems, ...actionItems].slice(0, 18),
    },
    {
      id: 'agent-team',
      title: 'Agent Team Layer',
      subtitle: 'Named strategic operators inside the roadmap.',
      x: 1000,
      y: 3020,
      noteColor: 'violet',
      items: [
        ...agentItems,
        'Claude: story and resonance lead',
        'Codex: systems architecture lead',
        'Gemini: quality and reliability lead',
        'OpenCode: rapid autonomous builder',
      ].slice(0, 18),
    },
    {
      id: 'engineering-core',
      title: 'Engineering Core',
      subtitle: 'Scale indicators from your repo structure.',
      x: 2000,
      y: 3020,
      noteColor: 'red',
      items: [
        `Component files: ${context.engineering.componentsCount}`,
        `Data files: ${context.engineering.dataFilesCount}`,
        `Script files: ${context.engineering.scriptsCount}`,
        `Docs files: ${context.engineering.docsCount}`,
        ...context.engineering.docsHighlights.map((entry) => `Doc: ${entry}`),
      ].slice(0, 18),
    },
    {
      id: 'launch-board',
      title: 'Launch Board',
      subtitle: 'Immediate execution targets for /vision.',
      x: 1000,
      y: 4420,
      noteColor: 'light-red',
      items: [
        'Route published at /vision with interactive tldraw canvas',
        'Board seeded from repository data and inventories',
        'Inspiration source: /year-of-the-fire-horse/vision',
        'Next step: connect /vision to nav and internal campaign links',
        'Next step: add periodic feed-driven board refresh',
        'Next step: attach this board to product and roadmap planning rituals',
      ],
    },
  ]
}

export default function VisionBoardCanvas({ context }: VisionBoardCanvasProps) {
  const clusters = useMemo(() => buildVisionClusters(context), [context])

  const handleMount = useCallback(
    (editor: Editor) => {
      editor.updateInstanceState({ isGridMode: true })

      if (editor.getCurrentPageShapeIds().size > 0) return

      const clusterWidth = 930
      const noteColumns = 3
      const noteXStep = 300
      const noteYStep = 176

      const shapes: ShapeSeed[] = [
        {
          id: createShapeId('title-main'),
          type: 'text',
          x: 660,
          y: -160,
          props: {
            richText: toRichText('FrankX Massive Vision Board'),
            color: 'orange',
            size: 'xl',
            font: 'serif',
            textAlign: 'start',
            autoSize: true,
          },
        },
        {
          id: createShapeId('title-sub'),
          type: 'text',
          x: 660,
          y: -92,
          props: {
            richText: toRichText(
              `Live context snapshot | ${new Date(context.generatedAt).toLocaleString('en-US')}`
            ),
            color: 'grey',
            size: 'm',
            font: 'sans',
            textAlign: 'start',
            autoSize: true,
          },
        },
      ]

      for (const cluster of clusters) {
        const filteredItems = cluster.items
          .map((item) => trimLine(item.trim()))
          .filter(Boolean)
          .slice(0, 18)

        const rows = Math.max(1, Math.ceil(filteredItems.length / noteColumns))
        const frameHeight = 160 + rows * noteYStep

        shapes.push({
          id: createShapeId(`${cluster.id}-frame`),
          type: 'frame',
          x: cluster.x,
          y: cluster.y,
          props: {
            w: clusterWidth,
            h: frameHeight,
            name: cluster.title,
            color: cluster.noteColor,
          },
        })

        shapes.push({
          id: createShapeId(`${cluster.id}-title`),
          type: 'text',
          x: cluster.x + 24,
          y: cluster.y + 20,
          props: {
            richText: toRichText(cluster.title),
            color: 'orange',
            size: 'l',
            font: 'serif',
            textAlign: 'start',
            autoSize: true,
          },
        })

        shapes.push({
          id: createShapeId(`${cluster.id}-subtitle`),
          type: 'text',
          x: cluster.x + 24,
          y: cluster.y + 62,
          props: {
            richText: toRichText(cluster.subtitle),
            color: 'grey',
            size: 's',
            font: 'sans',
            textAlign: 'start',
            autoSize: true,
          },
        })

        filteredItems.forEach((item, index) => {
          const column = index % noteColumns
          const row = Math.floor(index / noteColumns)

          shapes.push({
            id: createShapeId(`${cluster.id}-note-${index}`),
            type: 'note',
            x: cluster.x + 28 + column * noteXStep,
            y: cluster.y + 110 + row * noteYStep,
            props: {
              richText: toRichText(item),
              color: cluster.noteColor,
              size: 's',
              font: 'serif',
            },
          })
        })
      }

      editor.createShapes(shapes)
      editor.zoomToFit({ animation: { duration: 0 } })
      editor.setCurrentTool('hand')
    },
    [clusters, context.generatedAt]
  )

  return (
    <div className="vision-tldraw-shell h-[78vh] min-h-[680px] w-full">
      <Tldraw onMount={handleMount} />
    </div>
  )
}
