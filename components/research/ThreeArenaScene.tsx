'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { Zap, Shield, Target, DollarSign } from 'lucide-react'
import Link from 'next/link'

interface ModelNode {
  id: string
  name: string
  org: string
  x: number // Constraint Discipline (0-1)
  y: number // Situational Judgment (0-1)
  z: number // Cost Efficiency (0-1)
  color: string
  size: number
  description: string
  stats: {
    pricing: string
    benchmark: string
    verdict: string
  }
}

const MODEL_DATA: ModelNode[] = [
  {
    id: 'claude-fable-5',
    name: 'Claude Fable 5',
    org: 'Anthropic',
    x: 0.95, // Exceptional constraint compliance
    y: 0.82, // Strong reasoning
    z: 0.35, // Premium pricing
    color: '#a855f7', // Violet
    size: 1.4,
    description: 'Flagship precision instrument. Dominates constraint-compliance pipelines (schemas, word caps, formatting) at raw correctness parity.',
    stats: {
      pricing: '$10.00 / $50.00 (1M tokens)',
      benchmark: '95.0% SWE-bench Verified',
      verdict: 'Best for structured pipelines & strict API output formats'
    }
  },
  {
    id: 'claude-opus-4-8',
    name: 'Claude Opus 4.8',
    org: 'Anthropic',
    x: 0.25, // Weakest at output constraints (leaks stream-of-consciousness)
    y: 0.98, // Leading situational judgment and pushback
    z: 0.55, // Mid-level cost
    color: '#f59e0b', // Amber
    size: 1.5,
    description: 'Flagship judgment instrument. Best at flagging contradictory specs, governance gates, and complex long-context reasoning.',
    stats: {
      pricing: '$5.00 / $25.00 (1M tokens)',
      benchmark: '88.6% SWE-bench Verified',
      verdict: 'Best for complex architecture reviews & spec validation'
    }
  },
  {
    id: 'claude-opus-4-6',
    name: 'Claude Opus 4.6',
    org: 'Anthropic',
    x: 0.30,
    y: 0.92,
    z: 0.60,
    color: '#3b82f6', // Blue
    size: 1.2,
    description: 'Balanced previous flagship. Excellent reasoning and coding capabilities, replaced dynamically by Opus 4.8.',
    stats: {
      pricing: '$5.00 / $25.00 (1M tokens)',
      benchmark: '90.2% BigLaw Bench',
      verdict: 'High-end reasoning fallback'
    }
  },
  {
    id: 'claude-haiku-4-5',
    name: 'Claude Haiku 4.5',
    org: 'Anthropic',
    x: 0.70, // Good constraint adherence
    y: 0.52, // Moderate reasoning
    z: 0.95, // Exceptional value
    color: '#10b981', // Emerald
    size: 1.0,
    description: 'High-volume routing engine. Matches higher-tier models on saturated capability classes (standard coding) at a fraction of the cost.',
    stats: {
      pricing: '$0.80 / $4.00 (1M tokens)',
      benchmark: 'Saturated on standard coding evals',
      verdict: 'Best for classification, routing, and high-volume tasks'
    }
  }
]

export function ThreeArenaScene() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [selectedModel, setSelectedModel] = useState<ModelNode | null>(null)
  const [hoveredModel, setHoveredModel] = useState<ModelNode | null>(null)
  const raycasterRef = useRef(new THREE.Raycaster())
  const mouseRef = useRef(new THREE.Vector2())
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const spheresRef = useRef<THREE.Mesh[]>([])
  const isDragging = useRef(false)
  const previousMousePosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!mountRef.current) return

    const container = mountRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Scene
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x020617, 0.035)
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(6, 5, 10)
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x020617, 1)
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15)
    scene.add(ambientLight)

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8)
    dirLight1.position.set(5, 10, 7)
    scene.add(dirLight1)

    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 0.4)
    dirLight2.position.set(-5, -5, -5)
    scene.add(dirLight2)

    // Helper Grid Floor
    const gridHelper = new THREE.GridHelper(12, 12, 0x1e293b, 0x0f172a)
    gridHelper.position.y = -3
    scene.add(gridHelper)

    // Performance Axes
    const createAxisLine = (start: THREE.Vector3, end: THREE.Vector3, color: number) => {
      const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.35 })
      const points = [start, end]
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      return new THREE.Line(geometry, material)
    }

    // Main axes meeting at center
    const origin = new THREE.Vector3(-3, -3, -3)
    const xAxis = createAxisLine(origin, new THREE.Vector3(4, -3, -3), 0xa855f7) // X: Constraints
    const yAxis = createAxisLine(origin, new THREE.Vector3(-3, 4, -3), 0xf59e0b) // Y: Reasoning/Judgment
    const zAxis = createAxisLine(origin, new THREE.Vector3(-3, -3, 4), 0x10b981) // Z: Cost
    scene.add(xAxis)
    scene.add(yAxis)
    scene.add(zAxis)

    // Particles (Starlight Cloud)
    const particleCount = 420
    const particleGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14

      const randColor = Math.random()
      if (randColor < 0.4) {
        colors[i * 3] = 0.66
        colors[i * 3 + 1] = 0.33
        colors[i * 3 + 2] = 0.98
      } else if (randColor < 0.7) {
        colors[i * 3] = 0.06
        colors[i * 3 + 1] = 0.71
        colors[i * 3 + 2] = 0.71
      } else {
        colors[i * 3] = 0.23
        colors[i * 3 + 1] = 0.51
        colors[i * 3 + 2] = 0.96
      }
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Round particle helper texture
    const canvas = document.createElement('canvas')
    canvas.width = 16
    canvas.height = 16
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8)
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 16, 16)
    }
    const particleTexture = new THREE.CanvasTexture(canvas)

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.12,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const pointCloud = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(pointCloud)

    // Model Spheres
    const spheres: THREE.Mesh[] = []
    const sphereGeometry = new THREE.SphereGeometry(0.24, 32, 32)

    MODEL_DATA.forEach((model) => {
      const posX = -2 + model.x * 5
      const posY = -2 + model.y * 5
      const posZ = -2 + model.z * 5

      const material = new THREE.MeshStandardMaterial({
        color: model.color,
        roughness: 0.1,
        metalness: 0.8,
        emissive: model.color,
        emissiveIntensity: 0.4
      })

      const sphere = new THREE.Mesh(sphereGeometry, material)
      sphere.position.set(posX, posY, posZ)
      sphere.scale.setScalar(model.size)
      sphere.userData = { model }

      // Outer wireframe ring
      const ringGeo = new THREE.RingGeometry(0.38, 0.42, 32)
      const ringMat = new THREE.MeshBasicMaterial({
        color: model.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.25
      })
      const ring = new THREE.Mesh(ringGeo, ringMat)
      ring.rotation.x = Math.PI / 2
      sphere.add(ring)

      scene.add(sphere)
      spheres.push(sphere)
    })
    spheresRef.current = spheres

    // Initial Camera Entrance Animation
    gsap.from(camera.position, {
      x: 12,
      y: 10,
      z: 18,
      duration: 2.4,
      ease: 'power3.out'
    })

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true
      previousMousePosition.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseRef.current.x = ((e.clientX - rect.left) / width) * 2 - 1
      mouseRef.current.y = -((e.clientY - rect.top) / height) * 2 + 1

      if (isDragging.current) {
        const deltaMove = {
          x: e.clientX - previousMousePosition.current.x,
          y: e.clientY - previousMousePosition.current.y
        }

        const rotationSpeed = 0.005
        scene.rotation.y += deltaMove.x * rotationSpeed
        scene.rotation.x += deltaMove.y * rotationSpeed

        previousMousePosition.current = { x: e.clientX, y: e.clientY }
      } else {
        raycasterRef.current.setFromCamera(mouseRef.current, camera)
        const intersects = raycasterRef.current.intersectObjects(spheres)

        if (intersects.length > 0) {
          const hovered = intersects[0].object.userData.model as ModelNode
          setHoveredModel(hovered)
          document.body.style.cursor = 'pointer'
          gsap.to(intersects[0].object.scale, {
            x: hovered.size * 1.3,
            y: hovered.size * 1.3,
            z: hovered.size * 1.3,
            duration: 0.3
          })
        } else {
          setHoveredModel(null)
          document.body.style.cursor = 'default'
          spheres.forEach((s) => {
            gsap.to(s.scale, {
              x: s.userData.model.size,
              y: s.userData.model.size,
              z: s.userData.model.size,
              duration: 0.3
            })
          })
        }
      }
    }

    const handleMouseUp = () => {
      isDragging.current = false
    }

    const handleClick = () => {
      if (isDragging.current) return
      raycasterRef.current.setFromCamera(mouseRef.current, camera)
      const intersects = raycasterRef.current.intersectObjects(spheres)

      if (intersects.length > 0) {
        const model = intersects[0].object.userData.model as ModelNode
        setSelectedModel(model)

        const targetPos = intersects[0].object.position
        gsap.to(camera.position, {
          x: targetPos.x + 3,
          y: targetPos.y + 2,
          z: targetPos.z + 4,
          duration: 1.2,
          ease: 'power2.out'
        })
      } else {
        setSelectedModel(null)
        gsap.to(camera.position, {
          x: 6,
          y: 5,
          z: 10,
          duration: 1.2,
          ease: 'power2.out'
        })
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging.current = true
        previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging.current && e.touches.length === 1) {
        const deltaMove = {
          x: e.touches[0].clientX - previousMousePosition.current.x,
          y: e.touches[0].clientY - previousMousePosition.current.y
        }
        const rotationSpeed = 0.008
        scene.rotation.y += deltaMove.x * rotationSpeed
        scene.rotation.x += deltaMove.y * rotationSpeed
        previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }
    }

    const handleTouchEnd = () => {
      isDragging.current = false
    }

    container.addEventListener('mousedown', handleMouseDown)
    container.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    container.addEventListener('click', handleClick)
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchmove', handleTouchMove, { passive: true })
    container.addEventListener('touchend', handleTouchEnd)

    let animationFrameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      pointCloud.rotation.y = elapsedTime * 0.012
      pointCloud.rotation.x = Math.sin(elapsedTime * 0.05) * 0.05

      spheres.forEach((sphere, index) => {
        sphere.position.y += Math.sin(elapsedTime * 1.5 + index) * 0.003
        if (sphere.children[0]) {
          sphere.children[0].rotation.z += 0.01
        }
      })

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      if (!mountRef.current || !renderer || !camera) return
      const w = mountRef.current.clientWidth
      const h = mountRef.current.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('mousedown', handleMouseDown)
      container.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      container.removeEventListener('click', handleClick)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div className="relative w-full h-[520px] bg-[#020617] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_120%,rgba(168,85,247,0.08),transparent_50%)]" />

      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      <div className="absolute top-6 left-6 pointer-events-none z-10 flex flex-col gap-1.5 bg-slate-950/85 backdrop-blur-md border border-white/5 p-4 rounded-xl text-xs">
        <div className="font-semibold text-white/90 text-sm mb-1.5">3D Multi-Dimensional Performance Space</div>
        <div className="flex items-center gap-2 text-white/60">
          <span className="w-2.5 h-0.5 bg-[#a855f7]" />
          <span>X: Output Constraint Discipline</span>
        </div>
        <div className="flex items-center gap-2 text-white/60">
          <span className="w-2.5 h-0.5 bg-[#f59e0b]" />
          <span>Y: Situational Judgment & Spec Pushback</span>
        </div>
        <div className="flex items-center gap-2 text-white/60">
          <span className="w-2.5 h-0.5 bg-[#10b981]" />
          <span>Z: Cost Efficiency (Cheaper is Higher)</span>
        </div>
        <div className="mt-2 text-[10px] text-white/40">Drag to rotate • Scroll to zoom • Click node to focus</div>
      </div>

      {hoveredModel && !selectedModel && (
        <div className="absolute bottom-6 left-6 z-10 w-72 bg-slate-950/90 backdrop-blur-md border border-white/10 p-4 rounded-2xl animate-fade-in shadow-xl pointer-events-none">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: hoveredModel.color }} />
            <span className="font-bold text-white text-base">{hoveredModel.name}</span>
          </div>
          <p className="text-xs text-white/60 leading-relaxed mb-3">{hoveredModel.description}</p>
          <div className="flex items-center gap-1.5 text-xs text-[#a855f7] font-mono">
            <Zap className="w-3.5 h-3.5" />
            <span>Click sphere for full receipts</span>
          </div>
        </div>
      )}

      {selectedModel && (
        <div className="absolute bottom-6 right-6 left-6 md:left-auto md:w-96 z-10 bg-slate-950/95 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl animate-slide-in">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedModel.color }} />
                <span className="font-bold text-white text-xl">{selectedModel.name}</span>
              </div>
              <span className="text-xs text-white/45 font-mono">{selectedModel.org} Lineup</span>
            </div>
            <button 
              onClick={() => {
                setSelectedModel(null)
                const cam = cameraRef.current
                if (cam) {
                  gsap.to(cam.position, { x: 6, y: 5, z: 10, duration: 1.2, ease: 'power2.out' })
                }
              }}
              className="text-xs text-white/50 hover:text-white bg-white/5 hover:bg-white/10 px-2 py-1 rounded-md transition-colors"
            >
              Reset view
            </button>
          </div>

          <p className="text-sm text-white/70 leading-relaxed mb-5">{selectedModel.description}</p>

          <div className="space-y-3.5 border-t border-white/5 pt-4 mb-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/40 flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Core Strength</span>
              <span className="text-white font-medium" style={{ color: selectedModel.color }}>{selectedModel.stats.verdict}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/40 flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5" /> Standard Price /1M</span>
              <span className="text-white font-mono">{selectedModel.stats.pricing}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/40 flex items-center gap-1.5"><Target className="w-3.5 h-3.5" /> Peak Benchmark</span>
              <span className="text-white font-mono">{selectedModel.stats.benchmark}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link 
              href={`/llm-hub/${selectedModel.id}`} 
              className="flex-1 text-center py-2.5 text-xs font-semibold rounded-lg text-black bg-white hover:bg-white/90 transition-colors"
            >
              Model Explorer
            </Link>
            <a 
              href="https://github.com/frankxai/Starlight-Intelligence-System/tree/main/tools/arena/runs" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-2.5 text-xs font-semibold rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all text-white flex items-center gap-1.5 justify-center"
            >
              JSON Receipt
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
