'use client'

import { Component, useEffect, useRef, useSyncExternalStore, type ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import * as THREE from 'three'

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const FRAGMENT_SHADER = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    vec3 obsidian = vec3(0.035, 0.043, 0.067);
    vec3 emerald = vec3(0.063, 0.725, 0.506);
    vec3 cyan = vec3(0.024, 0.714, 0.831);

    float waveA = sin(uv.x * 3.1 + uTime * 0.14) * cos(uv.y * 2.4 - uTime * 0.11);
    float waveB = cos((uv.x * 0.8 - uv.y * 1.1) * 3.6 + uTime * 0.18);
    float veil = smoothstep(-0.35, 0.95, (waveA + waveB) * 0.5);

    vec2 cursor = vec2(0.5 + uPointer.x * 0.16, 0.52 + uPointer.y * 0.16);
    float glow = exp(-distance(uv, cursor) * 3.2);

    vec3 col = obsidian;
    col = mix(col, emerald * 0.22, veil * 0.34);
    col = mix(col, cyan * 0.18, glow * 0.38);

    float vignette = smoothstep(0.0, 0.22, uv.x) * smoothstep(1.0, 0.78, uv.x)
      * smoothstep(0.0, 0.24, uv.y) * smoothstep(1.0, 0.76, uv.y);

    gl_FragColor = vec4(col, clamp((0.18 + veil * 0.16 + glow * 0.14) * vignette, 0.0, 0.42));
  }
`

const subscribeNoop = () => () => {}

let cachedWebGLSupport: boolean | null = null
function getWebGLSnapshot(): boolean {
  if (typeof window === 'undefined') return false
  if (cachedWebGLSupport !== null) return cachedWebGLSupport
  try {
    const probe = document.createElement('canvas')
    cachedWebGLSupport = Boolean(probe.getContext('webgl2') || probe.getContext('webgl'))
  } catch {
    cachedWebGLSupport = false
  }
  return cachedWebGLSupport
}

class ShaderErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: ReactNode; children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

function StaticAtmosphereFallback() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_28%_18%,rgba(16,185,129,0.08),transparent_65%),radial-gradient(ellipse_60%_50%_at_76%_32%,rgba(6,182,212,0.06),transparent_65%)]"
    />
  )
}

function AmbientShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const pointerTarget = useRef(new THREE.Vector2(0, 0))

  useEffect(() => {
    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      uniforms: {
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2(0, 0) },
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
    }
  }, [])

  useFrame((state, delta) => {
    const activeMaterial = materialRef.current
    if (!activeMaterial) return
    activeMaterial.uniforms.uTime.value += Math.min(delta, 0.05)
    pointerTarget.current.set(state.pointer.x, state.pointer.y)
    activeMaterial.uniforms.uPointer.value.lerp(pointerTarget.current, 0.06)
  })

  return (
    <mesh ref={meshRef} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <meshBasicMaterial transparent opacity={0} depthWrite={false} />
    </mesh>
  )
}

/**
 * GPU-light WebGL shader atmosphere for the homepage backdrop with SSR and reduced-motion static fallback.
 */
export function HomeShaderAtmosphere() {
  const shouldReduceMotion = useReducedMotion()
  const hasWebGL = useSyncExternalStore(subscribeNoop, getWebGLSnapshot, () => false)

  if (shouldReduceMotion || !hasWebGL) {
    return (
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <StaticAtmosphereFallback />
      </div>
    )
  }

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      <StaticAtmosphereFallback />
      <ShaderErrorBoundary fallback={null}>
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: false, powerPreference: 'low-power', alpha: true }}
          className="h-full w-full"
        >
          <AmbientShaderPlane />
        </Canvas>
      </ShaderErrorBoundary>
    </div>
  )
}
