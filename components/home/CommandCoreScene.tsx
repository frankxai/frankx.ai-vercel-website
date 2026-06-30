'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import {
  AdditiveBlending,
  BufferGeometry,
  Float32BufferAttribute,
  type Group,
} from 'three'

interface CommandCoreSceneProps {
  reducedMotion?: boolean
}

function SignalRays() {
  const geometry = useMemo(() => {
    const positions: number[] = []
    const rings = [1.28, 1.72, 2.12]

    rings.forEach((radius, ringIndex) => {
      const count = ringIndex === 0 ? 18 : 24
      for (let i = 0; i < count; i += 1) {
        const theta = (i / count) * Math.PI * 2
        const wobble = Math.sin(i * 1.7 + ringIndex) * 0.16
        const y = Math.cos(theta * 2 + ringIndex) * 0.38
        const x = Math.cos(theta) * (radius + wobble)
        const z = Math.sin(theta) * (radius - wobble)
        positions.push(x * 0.42, y * 0.42, z * 0.42)
        positions.push(x, y, z)
      }
    })

    const lineGeometry = new BufferGeometry()
    lineGeometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
    return lineGeometry
  }, [])

  useEffect(() => {
    return () => {
      geometry.dispose()
    }
  }, [geometry])

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial
        color="#43bfe3"
        transparent
        opacity={0.26}
        blending={AdditiveBlending}
      />
    </lineSegments>
  )
}

function Core({ reducedMotion = false }: CommandCoreSceneProps) {
  const groupRef = useRef<Group>(null)
  const innerRef = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (reducedMotion) return
    const time = clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.16
      groupRef.current.rotation.x = Math.sin(time * 0.24) * 0.08
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -time * 0.28
      innerRef.current.rotation.z = Math.sin(time * 0.18) * 0.12
    }
  })

  return (
    <group ref={groupRef}>
      <group ref={innerRef}>
        <mesh>
          <icosahedronGeometry args={[0.86, 2]} />
          <meshStandardMaterial
            color="#9ff7df"
            emissive="#10b981"
            emissiveIntensity={0.42}
            roughness={0.36}
            metalness={0.72}
            wireframe
          />
        </mesh>
        <mesh scale={0.78}>
          <octahedronGeometry args={[0.92, 1]} />
          <meshBasicMaterial color="#f6c65b" transparent opacity={0.15} wireframe />
        </mesh>
      </group>

      <mesh rotation={[Math.PI / 2.7, 0, 0.18]}>
        <torusGeometry args={[1.42, 0.009, 12, 180]} />
        <meshBasicMaterial color="#43bfe3" transparent opacity={0.78} />
      </mesh>
      <mesh rotation={[Math.PI / 2.15, 0.42, 0.74]}>
        <torusGeometry args={[1.76, 0.006, 12, 180]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.46} />
      </mesh>
      <mesh rotation={[Math.PI / 1.9, -0.78, -0.22]}>
        <torusGeometry args={[2.08, 0.005, 12, 180]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.36} />
      </mesh>

      <SignalRays />
    </group>
  )
}

export default function CommandCoreScene({ reducedMotion = false }: CommandCoreSceneProps) {
  return (
    <div className="absolute inset-0" data-visual-qa="command-core-scene">
      <Canvas
        camera={{ position: [0, 0.28, 5.2], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <ambientLight intensity={0.72} />
        <directionalLight position={[3, 4, 5]} intensity={2.1} color="#ffffff" />
        <pointLight position={[-2.5, -1.2, 2.5]} intensity={1.8} color="#10b981" />
        <pointLight position={[2.4, 1.8, 1.8]} intensity={1.2} color="#43bfe3" />
        <Core reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  )
}
