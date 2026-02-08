'use client'

import { useRef, useState, Suspense } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Html } from '@react-three/drei'
import * as THREE from 'three'
import { familyNodes, sideColors } from '@/lib/family-tree-data'
import type { FamilyNode } from '@/lib/family-tree-data'

// 3D positions for family members
const positions3D: Record<string, [number, number, number]> = {
  'frank-riemer': [0, 0, 0],
  'tien': [2.5, 0, 0.5],
  'dora-riemer': [-2, 2, -1],
  'witali-riemer': [2, 2, -1],
  'david-gorte': [-4, 4, -2],
  'dorothea-gorte': [-1.5, 4.5, -2.5],
  'alexander-riemer': [1.5, 4.5, -2.5],
  'paulina-riemer': [4, 4, -2],
}

function StarNode({
  node,
  onHover,
  isHovered,
}: {
  node: FamilyNode
  onHover: (id: string | null) => void
  isHovered: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const pos = positions3D[node.id] || [0, 0, 0]
  const colors = sideColors[node.side]
  const isCenter = node.id === 'frank-riemer'
  const baseSize = isCenter ? 0.35 : 0.22

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime
      meshRef.current.scale.setScalar(baseSize + Math.sin(t * 2 + pos[0]) * 0.02)
    }
    if (glowRef.current) {
      const t = state.clock.elapsedTime
      glowRef.current.scale.setScalar((isHovered ? 1.8 : 1.2) + Math.sin(t * 1.5) * 0.1)
    }
  })

  return (
    <group position={pos as unknown as THREE.Vector3Tuple}>
      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[baseSize * 2, 16, 16]} />
        <meshBasicMaterial color={colors.hex} transparent opacity={isHovered ? 0.12 : 0.04} />
      </mesh>

      {/* Core sphere */}
      <mesh
        ref={meshRef}
        onPointerOver={() => onHover(node.id)}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[baseSize, 32, 32]} />
        <meshStandardMaterial
          color={colors.hex}
          emissive={colors.hex}
          emissiveIntensity={isHovered ? 0.8 : 0.4}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Label */}
      <Html
        position={[0, -(baseSize + 0.4), 0]}
        center
        style={{
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          opacity: isHovered ? 1 : 0.5,
          transition: 'opacity 0.3s',
        }}
      >
        <div className="text-center">
          <p className="text-xs font-semibold text-white" style={{ textShadow: '0 0 10px rgba(0,0,0,0.8)' }}>
            {node.name}
          </p>
          <p className="text-[9px]" style={{ color: colors.hex, textShadow: '0 0 10px rgba(0,0,0,0.8)' }}>
            {node.role}
          </p>
        </div>
      </Html>
    </group>
  )
}

function ConnectionBeam({ from, to, color }: { from: string; to: string; color: string }) {
  const posFrom = positions3D[from] || [0, 0, 0]
  const posTo = positions3D[to] || [0, 0, 0]

  const points = [new THREE.Vector3(...posFrom), new THREE.Vector3(...posTo)]
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial color={color} transparent opacity={0.12} />
    </line>
  )
}

// Module-level deterministic star positions (React 19 purity)
const STAR_COUNT = 200
const starPositions = Float32Array.from({ length: STAR_COUNT * 3 }, (_, i) => {
  const seed = (i * 2654435761) >>> 0
  return ((seed % 10000) / 10000 - 0.5) * 30
})

function StarField() {
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={STAR_COUNT}
          array={starPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.03} transparent opacity={0.3} sizeAttenuation />
    </points>
  )
}

function Scene() {
  const [hovered, setHovered] = useState<string | null>(null)

  const connections = [
    { from: 'frank-riemer', to: 'dora-riemer', color: '#10b981' },
    { from: 'frank-riemer', to: 'witali-riemer', color: '#10b981' },
    { from: 'frank-riemer', to: 'tien', color: '#f43f5e' },
    { from: 'dora-riemer', to: 'david-gorte', color: '#f59e0b' },
    { from: 'dora-riemer', to: 'dorothea-gorte', color: '#f59e0b' },
    { from: 'witali-riemer', to: 'alexander-riemer', color: '#06b6d4' },
    { from: 'witali-riemer', to: 'paulina-riemer', color: '#06b6d4' },
    { from: 'david-gorte', to: 'dorothea-gorte', color: '#f43f5e' },
    { from: 'alexander-riemer', to: 'paulina-riemer', color: '#f43f5e' },
    { from: 'dora-riemer', to: 'witali-riemer', color: '#f43f5e' },
  ]

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 5, 5]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[-5, 3, -3]} intensity={0.3} color="#f59e0b" />
      <pointLight position={[5, 3, -3]} intensity={0.3} color="#06b6d4" />

      <StarField />

      {connections.map((c, i) => (
        <ConnectionBeam key={i} {...c} />
      ))}

      {familyNodes.map((node) => (
        <StarNode
          key={node.id}
          node={node}
          isHovered={hovered === node.id}
          onHover={setHovered}
        />
      ))}

      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={3}
        maxDistance={15}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </>
  )
}

export default function FamilyTreeV5() {
  return (
    <main className="flex h-screen flex-col bg-[#030712]">
      {/* Header overlay */}
      <div className="absolute left-0 right-0 top-0 z-10 bg-gradient-to-b from-[#030712] via-[#030712]/80 to-transparent px-6 pb-12 pt-6">
        <div className="mx-auto flex max-w-5xl items-center gap-4">
          <Link
            href="/design-lab/family-tree"
            className="inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/60"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <span className="rounded-lg bg-rose-500/10 px-3 py-1 text-xs font-mono font-bold text-rose-400">V5</span>
          <h1 className="text-lg font-bold text-white">3D Constellation</h1>
          <span className="text-xs text-white/30">Drag to orbit, scroll to zoom</span>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="flex-1">
        <Suspense fallback={
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-white/30">Loading 3D scene...</p>
          </div>
        }>
          <Canvas
            camera={{ position: [0, 2, 8], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
          >
            <Scene />
          </Canvas>
        </Suspense>
      </div>

      {/* Legend overlay */}
      <div className="absolute bottom-6 left-6 z-10 rounded-xl border border-white/5 bg-[#030712]/80 p-4 backdrop-blur-md">
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          {Object.entries(sideColors).map(([side, colors]) => (
            <div key={side} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full" style={{ background: colors.hex }} />
              <span className="text-[10px] capitalize text-white/40">{side}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
