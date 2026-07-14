'use client'

import { useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, Line, OrbitControls } from '@react-three/drei'
import { useRouter } from 'next/navigation'
import * as THREE from 'three'
import {
  publicOperatingSystems,
  type OperatingSystemStage,
  type PublicOperatingSystem,
} from '@/data/public-operating-systems'

const STAGE_COLORS: Record<OperatingSystemStage, string> = {
  'open-source': '#34d399',
  'public-blueprint': '#22d3ee',
  'private-system': '#fbbf24',
}

const STAGE_LABELS: Record<OperatingSystemStage, string> = {
  'open-source': 'Open source',
  'public-blueprint': 'Public blueprint',
  'private-system': 'Private system',
}

const NODE_POSITIONS: Record<string, [number, number, number]> = {
  'starlight-intelligence-system': [0, 0, 0],
  'agentic-creator-os': [-3.2, 1.65, 0.4],
  'agentic-business-os': [-1.25, 2.45, -0.8],
  'agentic-student-os': [1.35, 2.25, 0.65],
  'agentic-life-os': [3.25, 0.8, -0.45],
  'agentic-music-os': [-3.05, -1.45, 0.85],
  'research-intelligence-os': [1.25, -2.3, -0.55],
  'family-intelligence-os': [3.1, -1.55, 0.35],
}

type GraphNode = PublicOperatingSystem & {
  color: string
  position: [number, number, number]
  scale: number
}

type GraphLink = {
  source: GraphNode
  target: GraphNode
}

function buildGraphData() {
  const nodes: GraphNode[] = publicOperatingSystems.map((system, index) => ({
    ...system,
    color: STAGE_COLORS[system.stage],
    position: NODE_POSITIONS[system.id] ?? [Math.cos(index) * 3, Math.sin(index) * 2, 0],
    scale: system.id === 'starlight-intelligence-system' ? 0.34 : 0.23,
  }))

  const nodeById = new Map(nodes.map((node) => [node.id, node]))
  const seen = new Set<string>()
  const links: GraphLink[] = []

  for (const system of publicOperatingSystems) {
    const source = nodeById.get(system.id)
    if (!source) continue

    for (const relatedId of system.relatedSystemIds) {
      const target = nodeById.get(relatedId)
      if (!target) continue
      const key = [source.id, target.id].sort().join(':')
      if (seen.has(key)) continue
      seen.add(key)
      links.push({ source, target })
    }
  }

  return { nodes, links }
}

function NodeGeometry({ stage }: { stage: OperatingSystemStage }) {
  if (stage === 'private-system') return <octahedronGeometry args={[1, 0]} />
  if (stage === 'public-blueprint') return <boxGeometry args={[1.45, 1.45, 1.45]} />
  return <icosahedronGeometry args={[1, 1]} />
}

function SystemNode({
  node,
  isActive,
  onActivate,
  onOpen,
}: {
  node: GraphNode
  isActive: boolean
  onActivate: (node: GraphNode | null) => void
  onOpen: (node: GraphNode) => void
}) {
  return (
    <group position={node.position}>
      <mesh
        onPointerEnter={(event) => {
          event.stopPropagation()
          document.body.style.cursor = 'pointer'
          onActivate(node)
        }}
        onPointerLeave={() => {
          document.body.style.cursor = ''
          onActivate(null)
        }}
        onClick={(event) => {
          event.stopPropagation()
          document.body.style.cursor = ''
          onOpen(node)
        }}
        scale={isActive ? node.scale * 1.28 : node.scale}
      >
        <NodeGeometry stage={node.stage} />
        <meshStandardMaterial
          color={node.color}
          emissive={new THREE.Color(node.color)}
          emissiveIntensity={isActive ? 0.72 : 0.3}
          roughness={0.38}
          metalness={0.34}
        />
      </mesh>
      {isActive && (
        <Html center distanceFactor={8} className="pointer-events-none">
          <div className="min-w-44 rounded-lg border border-white/10 bg-black/85 px-3 py-2 backdrop-blur">
            <div className="text-xs font-semibold text-zinc-50">{node.name}</div>
            <div className="mt-1 text-[11px] text-zinc-500">{STAGE_LABELS[node.stage]}</div>
          </div>
        </Html>
      )}
    </group>
  )
}

export default function Ecosystem3DGraph() {
  const router = useRouter()
  const [activeNode, setActiveNode] = useState<GraphNode | null>(null)
  const graphData = useMemo(() => buildGraphData(), [])

  return (
    <div className="relative h-[68vh] min-h-[600px] overflow-hidden border-y border-white/[0.08] bg-[#050607]" data-ecosystem-graph="3d">
      <Canvas
        camera={{ position: [0, 0.5, 10.4], fov: 46 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.65} />
        <pointLight position={[0, 5, 6]} intensity={2} color="#c8fff0" />
        <pointLight position={[-5, -2, 4]} intensity={0.9} color="#67e8f9" />

        {graphData.links.map((link) => {
          const active = activeNode?.id === link.source.id || activeNode?.id === link.target.id
          return (
            <Line
              key={`${link.source.id}-${link.target.id}`}
              points={[link.source.position, link.target.position]}
              color={active ? '#67e8f9' : '#ffffff'}
              transparent
              opacity={active ? 0.52 : 0.14}
              lineWidth={active ? 1.35 : 0.7}
            />
          )
        })}

        {graphData.nodes.map((node) => (
          <SystemNode
            key={node.id}
            node={node}
            isActive={activeNode?.id === node.id}
            onActivate={setActiveNode}
            onOpen={(selected) => router.push(selected.detailHref)}
          />
        ))}

        <OrbitControls enablePan={false} enableZoom minDistance={7.5} maxDistance={13} rotateSpeed={0.38} zoomSpeed={0.45} />
      </Canvas>

      <div className="pointer-events-none absolute left-4 top-4 max-w-sm rounded-lg border border-white/[0.08] bg-black/70 p-4 backdrop-blur-md sm:left-6 sm:top-6">
        <p className="text-sm font-medium text-cyan-300">Public relationship lens</p>
        <p className="mt-2 text-sm leading-6 text-zinc-300">
          Starlight sits at the substrate. Domain operating systems connect through declared relationships. Shape indicates whether the system is open source, a blueprint, or private.
        </p>
      </div>
    </div>
  )
}
