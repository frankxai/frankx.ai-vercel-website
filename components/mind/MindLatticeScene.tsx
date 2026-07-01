'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import {
  AdditiveBlending,
  BufferGeometry,
  Float32BufferAttribute,
  type Group,
} from 'three'

type SceneProps = {
  reducedMotion?: boolean
}

const modules: Array<[number, number, number]> = [
  [-2.1, 0.86, 0],
  [-2.05, -0.02, 0.16],
  [-2.1, -0.9, -0.08],
  [0, 0.02, 0.18],
  [1.52, 0.72, -0.1],
  [1.55, -0.68, 0.12],
  [2.45, 0, 0],
]

function LatticeLines() {
  const geometry = useMemo(() => {
    const lines: number[] = []
    const connect = (a: [number, number, number], b: [number, number, number]) => {
      lines.push(...a, ...b)
    }

    connect(modules[0], modules[3])
    connect(modules[1], modules[3])
    connect(modules[2], modules[3])
    connect(modules[3], modules[4])
    connect(modules[3], modules[5])
    connect(modules[4], modules[6])
    connect(modules[5], modules[6])
    connect([0, 0.02, 0.18], [0, 1.22, -0.1])
    connect([0, 0.02, 0.18], [0, -1.24, 0.12])

    const lineGeometry = new BufferGeometry()
    lineGeometry.setAttribute('position', new Float32BufferAttribute(lines, 3))
    return lineGeometry
  }, [])

  useEffect(() => {
    return () => geometry.dispose()
  }, [geometry])

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial
        color="#43bfe3"
        transparent
        opacity={0.36}
        blending={AdditiveBlending}
      />
    </lineSegments>
  )
}

function Plate({
  position,
  scale = [0.34, 0.12, 0.34],
  active = false,
}: {
  position: [number, number, number]
  scale?: [number, number, number]
  active?: boolean
}) {
  return (
    <group position={position}>
      <mesh scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={active ? '#0f382c' : '#10151a'}
          emissive={active ? '#10b981' : '#06b6d4'}
          emissiveIntensity={active ? 0.46 : 0.14}
          roughness={0.28}
          metalness={0.74}
          transparent
          opacity={0.88}
        />
      </mesh>
      <mesh scale={[scale[0] * 1.12, 0.006, scale[2] * 1.12]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          color={active ? '#10b981' : '#43bfe3'}
          transparent
          opacity={active ? 0.42 : 0.24}
        />
      </mesh>
    </group>
  )
}

function SignalPulse({ reducedMotion = false }: SceneProps) {
  const ref = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (reducedMotion || !ref.current) return
    const time = clock.getElapsedTime()
    const t = (Math.sin(time * 0.84) + 1) / 2
    ref.current.position.x = -1.95 + t * 4.25
    ref.current.position.y = Math.sin(t * Math.PI * 2) * 0.18
    ref.current.scale.setScalar(0.8 + t * 0.42)
  })

  return (
    <group ref={ref} position={[0.05, 0, 0.34]}>
      <mesh>
        <sphereGeometry args={[0.07, 24, 24]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.95} />
      </mesh>
      <mesh scale={[1.7, 0.18, 0.18]}>
        <sphereGeometry args={[0.07, 24, 24]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.18} />
      </mesh>
    </group>
  )
}

function LatticeCore({ reducedMotion = false }: SceneProps) {
  const groupRef = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (reducedMotion || !groupRef.current) return
    const time = clock.getElapsedTime()
    groupRef.current.rotation.y = Math.sin(time * 0.18) * 0.18
    groupRef.current.rotation.x = -0.18 + Math.sin(time * 0.12) * 0.04
  })

  return (
    <group ref={groupRef} rotation={[-0.18, 0.12, 0]}>
      <LatticeLines />
      {modules.map((position, index) => (
        <Plate
          key={`${position.join('-')}-${index}`}
          position={position}
          scale={index === 3 ? [0.42, 0.16, 0.42] : [0.3, 0.1, 0.3]}
          active={index === 3 || index === 6}
        />
      ))}
      <mesh position={[0, 0.02, 0.2]} scale={[0.74, 0.018, 0.74]}>
        <torusGeometry args={[1, 0.02, 12, 96]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.54} />
      </mesh>
      <mesh position={[0, 0.02, 0.18]} scale={[1, 0.01, 1]}>
        <torusGeometry args={[1.32, 0.012, 12, 128]} />
        <meshBasicMaterial color="#43bfe3" transparent opacity={0.28} />
      </mesh>
      <SignalPulse reducedMotion={reducedMotion} />
    </group>
  )
}

export default function MindLatticeScene({ reducedMotion = false }: SceneProps) {
  return (
    <div className="absolute inset-0" data-visual-qa="mind-lattice-scene">
      <Canvas
        camera={{ position: [0, 0.1, 5.6], fov: 39 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: true,
        }}
      >
        <ambientLight intensity={0.72} />
        <directionalLight position={[3, 4, 5]} intensity={2.2} color="#ffffff" />
        <pointLight position={[-2.6, 1.4, 2.4]} intensity={1.4} color="#43bfe3" />
        <pointLight position={[2.4, -1.2, 2.2]} intensity={1.7} color="#10b981" />
        <LatticeCore reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  )
}
