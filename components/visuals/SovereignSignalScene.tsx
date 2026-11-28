'use client'

import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export type SignalFocusMode = 'skills' | 'blueprints' | 'stacks'

type SceneProps = {
  focusMode: SignalFocusMode
  reducedMotion: boolean
}

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uModeWeight;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float dist = distance(uv, vec2(0.5 + uPointer.x * 0.14, 0.5 + uPointer.y * 0.14));
    float waveA = sin(pos.x * 1.35 + uTime * 0.55) * cos(pos.y * 1.15 - uTime * 0.42) * 0.24;
    float waveB = sin((pos.x * 0.65 - pos.y * 0.9) * 2.1 + uTime * 0.8 + uModeWeight) * 0.12;
    float ripple = exp(-dist * 3.4) * sin(dist * 14.0 - uTime * 1.4) * 0.18;
    float elevation = waveA + waveB + ripple;
    pos.z += elevation;
    vElevation = elevation;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const FRAGMENT_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uModeWeight;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vec3 obsidian = vec3(0.039, 0.043, 0.051);
    vec3 emerald = vec3(0.063, 0.725, 0.506);
    vec3 cyan = vec3(0.024, 0.714, 0.831);
    vec3 amber = vec3(0.961, 0.620, 0.043);

    float band = smoothstep(-0.22, 0.32, vElevation);
    float ridge = smoothstep(0.18, 0.34, vElevation);

    // Contour isolines for crisp architectural depth
    float contourA = abs(fract(vElevation * 16.0 - 0.5) - 0.5) / fwidth(vElevation * 16.0 + 0.0001);
    float contour = 1.0 - min(contourA, 1.0);

    vec3 flow = mix(emerald, cyan, clamp(vUv.x * 0.7 + sin(uTime * 0.25 + uModeWeight) * 0.2, 0.0, 1.0));
    vec3 col = mix(obsidian, flow * 0.55, band * 0.55);
    col += mix(emerald, amber, clamp(uModeWeight * 0.4, 0.0, 1.0)) * ridge * 0.38;
    col += cyan * contour * 0.28;

    float edgeFade = smoothstep(0.0, 0.18, vUv.x) * smoothstep(1.0, 0.82, vUv.x)
      * smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
    float alpha = clamp((0.35 + band * 0.45 + contour * 0.2) * edgeFade, 0.0, 0.92);

    gl_FragColor = vec4(col, alpha);
  }
`

function SignalFieldMesh({ focusMode, reducedMotion }: SceneProps) {
  const pointerTarget = useRef(new THREE.Vector2(0, 0))
  const modeTarget = focusMode === 'skills' ? 0.0 : focusMode === 'blueprints' ? 1.4 : 2.8
  const meshRef = useRef<THREE.Mesh>(null)
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)

  const pointsGeometry = useMemo(() => {
    const count = 96
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      const t = i / count
      const angle = i * 2.39996323
      const radius = 0.65 + Math.sqrt(t) * 2.45
      positions[i * 3] = Math.cos(angle) * radius * 1.45
      positions[i * 3 + 1] = Math.sin(angle) * radius * 0.72
      positions[i * 3 + 2] = 0.32 + Math.sin(t * Math.PI * 3) * 0.22
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [])

  const pointsMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.038,
        color: '#67e8f9',
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      }),
    [],
  )

  useEffect(() => {
    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uModeWeight: { value: 0 },
      },
    })
    materialRef.current = shaderMaterial
    if (meshRef.current) {
      const initialMaterial = meshRef.current.material
      meshRef.current.material = shaderMaterial
      if (!Array.isArray(initialMaterial)) {
        initialMaterial?.dispose()
      }
    }

    return () => {
      materialRef.current = null
      shaderMaterial.dispose()
      pointsGeometry.dispose()
      pointsMaterial.dispose()
    }
  }, [pointsGeometry, pointsMaterial])

  useFrame((state, delta) => {
    const activeMaterial = materialRef.current
    if (!activeMaterial) return

    if (!reducedMotion) {
      activeMaterial.uniforms.uTime.value += Math.min(delta, 0.05)
      if (pointsRef.current) {
        pointsRef.current.rotation.z = state.clock.elapsedTime * 0.03
      }
    }
    pointerTarget.current.set(state.pointer.x, state.pointer.y)
    activeMaterial.uniforms.uPointer.value.lerp(pointerTarget.current, 0.08)
    activeMaterial.uniforms.uModeWeight.value = THREE.MathUtils.lerp(
      activeMaterial.uniforms.uModeWeight.value,
      modeTarget,
      0.06,
    )
  })

  return (
    <group rotation={[-0.42, 0.08, 0]}>
      <mesh ref={meshRef} position={[0, -0.05, 0]}>
        <planeGeometry args={[7.4, 4.4, 64, 40]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <points ref={pointsRef} geometry={pointsGeometry} material={pointsMaterial} />
    </group>
  )
}

export default function SovereignSignalScene({ focusMode, reducedMotion }: SceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={reducedMotion ? 'demand' : 'always'}
      camera={{ position: [0, 0.1, 4.3], fov: 44 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      className="h-full w-full"
    >
      <SignalFieldMesh focusMode={focusMode} reducedMotion={reducedMotion} />
    </Canvas>
  )
}
