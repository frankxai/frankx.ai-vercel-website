'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Billboard, Float } from '@react-three/drei'
import { familyNodes, familyEdges, sideColors } from '@/lib/family-tree-data'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

// Deterministic hash function for module-level "randomness"
const hash = (i: number) => ((i * 2654435761) >>> 0) % 10000 / 10000

// Module-level particle positions (deterministic, not Math.random)
const particleCount = 500
const particlePositions = new Float32Array(particleCount * 3)
for (let i = 0; i < particleCount; i++) {
  const i3 = i * 3
  particlePositions[i3] = (hash(i) - 0.5) * 30
  particlePositions[i3 + 1] = (hash(i + 1000) - 0.5) * 30
  particlePositions[i3 + 2] = (hash(i + 2000) - 0.5) * 30
}

// 3D positions for family members
const nodePositions: Record<string, [number, number, number]> = {
  'david': [-3, 3, -1],
  'dorothea': [-1, 3, -1],
  'alexander': [1, 3, -1],
  'paulina': [3, 3, -1],
  'dora': [-1, 0, 0],
  'witali': [1, 0, 0],
  'frank': [-0.5, -3, 1],
  'tien': [1, -3, 1],
}

// Background particle field
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!)

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    return geo
  }, [])

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02
      pointsRef.current.rotation.x = clock.getElapsedTime() * 0.01
    }
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Orbiting ring component
function OrbitingRing({ position, color, radius = 0.6 }: { position: [number, number, number], color: string, radius?: number }) {
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(clock.getElapsedTime()) * 0.1
      ringRef.current.rotation.z = clock.getElapsedTime() * 0.5
    }
  })

  return (
    <mesh ref={ringRef} position={position}>
      <ringGeometry args={[radius, radius + 0.05, 32]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.6}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

// Family member node
function FamilyNode({ id, name, position, color }: { id: string, name: string, position: [number, number, number], color: string }) {
  return (
    <group position={position}>
      {/* Outer glow ring */}
      <mesh>
        <ringGeometry args={[0.8, 0.85, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Orbiting ring */}
      <OrbitingRing position={[0, 0, 0]} color={color} radius={0.6} />

      {/* Inner sphere with Float animation */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
        <mesh>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </Float>

      {/* Text label */}
      <Billboard position={[0, -1, 0]}>
        <Text
          fontSize={0.25}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {name}
        </Text>
      </Billboard>
    </group>
  )
}

// Connection beam component
function ConnectionBeam({ start, end, color }: { start: [number, number, number], end: [number, number, number], color: string }) {
  const lineRef = useRef<THREE.Line>(null!)

  const points = useMemo(() => {
    return [new THREE.Vector3(...start), new THREE.Vector3(...end)]
  }, [start, end])

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [points])

  useFrame(({ clock }) => {
    if (lineRef.current && lineRef.current.material) {
      const material = lineRef.current.material as THREE.LineDashedMaterial
      material.dashOffset = -clock.getElapsedTime() * 0.5
    }
  })

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineDashedMaterial
        color={color}
        transparent
        opacity={0.4}
        dashSize={0.2}
        gapSize={0.1}
        linewidth={2}
        blending={THREE.AdditiveBlending}
      />
    </line>
  )
}

// Main 3D scene
function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#AB47C7" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#43BFE3" />

      {/* Particle field */}
      <ParticleField />

      {/* Family nodes */}
      {familyNodes.map(node => {
        const position = nodePositions[node.id]
        if (!position) return null

        return (
          <FamilyNode
            key={node.id}
            id={node.id}
            name={node.name}
            position={position}
            color={sideColors[node.side]}
          />
        )
      })}

      {/* Connection beams */}
      {familyEdges.map((edge, idx) => {
        const sourcePos = nodePositions[edge.source]
        const targetPos = nodePositions[edge.target]

        if (!sourcePos || !targetPos) return null

        const sourceNode = familyNodes.find(n => n.id === edge.source)
        const color = sourceNode ? sideColors[sourceNode.side] : '#ffffff'

        return (
          <ConnectionBeam
            key={`${edge.source}-${edge.target}-${idx}`}
            start={sourcePos}
            end={targetPos}
            color={color}
          />
        )
      })}

      {/* Camera controls */}
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.3}
        enableZoom
        enablePan
        minDistance={5}
        maxDistance={20}
      />
    </>
  )
}

export default function FamilyTreeV10() {
  return (
    <div className="relative w-full h-screen bg-[#0a0a0f]">
      {/* Info panel */}
      <div className="absolute top-8 left-8 z-10 max-w-md">
        <div className="rounded-xl border border-white/10 bg-[#0F172A]/80 backdrop-blur-xl p-6">
          <div className="mb-3">
            <h1 className="text-3xl font-bold text-white mb-1">
              V10 — GPU-Enhanced 3D
            </h1>
            <p className="text-white/60 text-sm">
              WebGPU-ready Three.js constellation
            </p>
          </div>

          <div className="space-y-2 text-sm text-white/70">
            <p>• 500 GPU-optimized background particles</p>
            <p>• Dynamic orbiting rings per node</p>
            <p>• Animated connection beams with dash patterns</p>
            <p>• Enhanced materials with emissive lighting</p>
            <p>• Auto-rotating 3D camera controls</p>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sideColors.paternal }} />
              <span className="text-xs text-white/60">Paternal (Riemer)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sideColors.maternal }} />
              <span className="text-xs text-white/60">Maternal (Sinner)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sideColors.current }} />
              <span className="text-xs text-white/60">Current Generation</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
