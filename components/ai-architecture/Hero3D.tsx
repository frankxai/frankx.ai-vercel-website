// @ts-nocheck
'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { Float, Text, MeshTransmissionMaterial, Environment, Sphere, Box, Torus, Line } from '@react-three/drei'
import * as THREE from 'three'

// Extend Three.js line for React Three Fiber
extend({ Line_: THREE.Line })

// Animated neural network nodes
function NeuralNode({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.2
      ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.1)
    }
  })

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.15, 32, 32]} />
      <meshStandardMaterial
        color="#06b6d4"
        emissive="#06b6d4"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  )
}

// Connection lines between nodes
function Connection({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
  const points = useMemo(() => {
    return [new THREE.Vector3(...start), new THREE.Vector3(...end)]
  }, [start, end])

  return (
    <Line
      points={points}
      color="#8b5cf6"
      lineWidth={1}
      transparent
      opacity={0.4}
    />
  )
}

// Central glowing orb
function CentralOrb() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.2
      ref.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1, 2]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={512}
          transmission={0.95}
          roughness={0.1}
          thickness={0.5}
          ior={1.5}
          chromaticAberration={0.06}
          anisotropy={0.1}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.2}
          color="#8b5cf6"
        />
      </mesh>
    </Float>
  )
}

// Orbiting ring
function OrbitingRing({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * speed
      ref.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        transparent
        opacity={0.6}
      />
    </mesh>
  )
}

// Floating data cubes
function DataCube({ position, size = 0.2, seed = 1 }: { position: [number, number, number]; size?: number; seed?: number }) {
  const ref = useRef<THREE.Mesh>(null)
  // Use seed-based deterministic rotation speed to avoid impure Math.random during render
  const rotationSpeed = useMemo(() => ({
    x: ((seed * 9301 + 49297) % 233280) / 233280 * 0.5 + 0.2,
    y: ((seed * 9301 + 49297) % 233281) / 233281 * 0.5 + 0.2,
  }), [seed])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * rotationSpeed.x
      ref.current.rotation.y = state.clock.elapsedTime * rotationSpeed.y
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={ref} position={position}>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  )
}

// Simple seeded random function for deterministic particle generation
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

// Particle field
function ParticleField({ count = 100, seed = 42 }: { count?: number; seed?: number }) {
  const ref = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i += 3) {
      // Use deterministic seeded random to avoid impure Math.random during render
      positions[i] = (seededRandom(seed + i) - 0.5) * 10
      positions[i + 1] = (seededRandom(seed + i + 1) - 0.5) * 10
      positions[i + 2] = (seededRandom(seed + i + 2) - 0.5) * 10
    }
    return positions
  }, [count, seed])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#64748b"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

// Main 3D scene
function Scene() {
  // Neural network node positions
  const nodePositions: [number, number, number][] = [
    [-2, 1, 0],
    [-1.5, -0.5, 0.5],
    [-2.5, 0, -0.5],
    [2, 0.5, 0],
    [1.8, -1, 0.3],
    [2.2, 0, -0.6],
  ]

  // Connections between nodes
  const connections: { start: [number, number, number]; end: [number, number, number] }[] = [
    { start: [-2, 1, 0], end: [0, 0, 0] },
    { start: [-1.5, -0.5, 0.5], end: [0, 0, 0] },
    { start: [-2.5, 0, -0.5], end: [0, 0, 0] },
    { start: [0, 0, 0], end: [2, 0.5, 0] },
    { start: [0, 0, 0], end: [1.8, -1, 0.3] },
    { start: [0, 0, 0], end: [2.2, 0, -0.6] },
  ]

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#fff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <spotLight position={[0, 5, 0]} angle={0.3} penumbra={1} intensity={0.5} color="#06b6d4" />

      {/* Central orb */}
      <CentralOrb />

      {/* Orbiting rings */}
      <OrbitingRing radius={1.8} speed={0.3} color="#8b5cf6" />
      <OrbitingRing radius={2.2} speed={-0.2} color="#06b6d4" />

      {/* Neural network nodes */}
      {nodePositions.map((pos, i) => (
        <NeuralNode key={i} position={pos} delay={i * 0.5} />
      ))}

      {/* Connections */}
      {connections.map((conn, i) => (
        <Connection key={i} start={conn.start} end={conn.end} />
      ))}

      {/* Data cubes */}
      <DataCube position={[3, 1.5, -1]} size={0.15} seed={1} />
      <DataCube position={[-3, -1, 1]} size={0.12} seed={2} />
      <DataCube position={[2.5, -1.5, 0.5]} size={0.18} seed={3} />

      {/* Particle field */}
      <ParticleField count={150} />

      {/* Environment for reflections */}
      <Environment preset="night" />
    </>
  )
}

// Loading fallback
function LoadingFallback() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
    </div>
  )
}

interface Hero3DProps {
  className?: string
  height?: string
}

export function Hero3D({ className, height = 'h-[600px]' }: Hero3DProps) {
  return (
    <div className={`relative ${height} ${className}`}>
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0b] pointer-events-none z-10" />

      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  )
}

export default Hero3D
