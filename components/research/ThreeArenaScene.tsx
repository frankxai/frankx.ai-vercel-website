'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { Zap, Shield, Target, DollarSign, RotateCcw, Compass, HelpCircle, ArrowUpDown } from 'lucide-react'
import Link from 'next/link'

export interface ModelNode {
  id: string
  name: string
  org: string
  constraint: number // Constraint Discipline (0-1)
  judgment: number // Situational Judgment (0-1)
  reasoning: number // Reasoning Depth (0-1)
  cost: number // Cost-to-Intelligence Ratio (0-1)
  latency: number // Response Speed (0-1)
  color: string
  size: number
  description: string
  stats: {
    pricing: string
    benchmark: string
    verdict: string
  }
}

export const MODEL_DATA: ModelNode[] = [
  {
    id: 'claude-fable-5',
    name: 'Claude Fable 5',
    org: 'Anthropic',
    constraint: 0.95,
    judgment: 0.82,
    reasoning: 0.88,
    cost: 0.35, // Expensive
    latency: 0.45,
    color: '#a855f7', // Violet
    size: 1.3,
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
    constraint: 0.25,
    judgment: 0.98,
    reasoning: 0.96,
    cost: 0.55,
    latency: 0.30,
    color: '#f59e0b', // Amber
    size: 1.4,
    description: 'Flagship judgment instrument. Best at flagging contradictory specs, unauthorized actions, and complex long-context reasoning.',
    stats: {
      pricing: '$5.00 / $25.00 (1M tokens)',
      benchmark: '88.6% SWE-bench Verified',
      verdict: 'Best for complex architecture reviews & spec validation'
    }
  },
  {
    id: 'claude-sonnet-5',
    name: 'Claude Sonnet 5',
    org: 'Anthropic',
    constraint: 0.78,
    judgment: 0.80,
    reasoning: 0.90,
    cost: 0.90,
    latency: 0.85,
    color: '#22d3ee', // Cyan
    size: 1.15,
    description: 'Shipped 2026-06-30. Closes most of the gap to Opus 4.8 on agentic and knowledge work at roughly 40% of the price — the default worth trying first for cost-sensitive production work.',
    stats: {
      pricing: '$2.00 / $10.00 (1M tokens, promo through Aug 31 2026)',
      benchmark: '63.2% agentic coding · 81.2% OSWorld-Verified · edges Opus 4.8 on GDPval-AA v2',
      verdict: 'Best default for production agent loops — near-Opus quality, budget-tier price'
    }
  },
  {
    id: 'claude-sonnet-4-6',
    name: 'Claude Sonnet 4.6',
    org: 'Anthropic',
    constraint: 0.75,
    judgment: 0.78,
    reasoning: 0.85,
    cost: 0.75,
    latency: 0.82,
    color: '#3b82f6', // Blue
    size: 1.1,
    description: 'Predecessor to Sonnet 5 (superseded 2026-06-30). Solid balance of reasoning and efficiency, kept here for comparison.',
    stats: {
      pricing: '$3.00 / $15.00 (1M tokens)',
      benchmark: '82.4% SWE-bench Verified',
      verdict: 'Superseded by Sonnet 5 — kept for historical comparison'
    }
  },
  {
    id: 'claude-opus-4-6',
    name: 'Claude Opus 4.6',
    org: 'Anthropic',
    constraint: 0.30,
    judgment: 0.92,
    reasoning: 0.90,
    cost: 0.60,
    latency: 0.35,
    color: '#6366f1', // Indigo
    size: 1.1,
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
    constraint: 0.70,
    judgment: 0.52,
    reasoning: 0.60,
    cost: 0.95, // Exceptional value
    latency: 0.98, // Fast
    color: '#10b981', // Emerald
    size: 0.95,
    description: 'High-volume routing engine. Matches higher-tier models on saturated capability tasks (standard coding) at a fraction of the cost.',
    stats: {
      pricing: '$0.80 / $4.00 (1M tokens)',
      benchmark: 'Saturated on standard coding evals',
      verdict: 'Best for classification, routing, and high-volume tasks'
    }
  }
]

export interface Metric {
  id: string
  label: string
  shortLabel: string
  color: string
}

export const METRICS: Metric[] = [
  { id: 'constraint', label: 'Output Constraint Discipline', shortLabel: 'Constraints', color: '#a855f7' },
  { id: 'judgment', label: 'Situational Judgment & Spec Pushback', shortLabel: 'Judgment', color: '#f59e0b' },
  { id: 'reasoning', label: 'Reasoning Depth & Coding Complexity', shortLabel: 'Reasoning', color: '#3b82f6' },
  { id: 'cost', label: 'Cost-to-Intelligence Ratio (Inverse price)', shortLabel: 'Cost', color: '#10b981' },
  { id: 'latency', label: 'Response Speed (Tokens/sec)', shortLabel: 'Latency', color: '#ec4899' },
]

export function ThreeArenaScene() {
  const mountRef = useRef<HTMLDivElement>(null)
  
  // State variables for axes metrics selection
  const [xAxisMetric, setXAxisMetric] = useState<string>('constraint')
  const [yAxisMetric, setYAxisMetric] = useState<string>('judgment')
  const [zAxisMetric, setZAxisMetric] = useState<string>('cost')
  
  const [selectedModel, setSelectedModel] = useState<ModelNode | null>(null)
  const [hoveredModel, setHoveredModel] = useState<ModelNode | null>(null)
  const [autoRotate, setAutoRotate] = useState(true)

  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const spheresRef = useRef<THREE.Mesh[]>([])
  
  // Projection lines & markers references
  const floorLineRef = useRef<THREE.Line | null>(null)
  const leftWallLineRef = useRef<THREE.Line | null>(null)
  const backWallLineRef = useRef<THREE.Line | null>(null)
  const floorMarkerRef = useRef<THREE.Mesh | null>(null)
  const leftWallMarkerRef = useRef<THREE.Mesh | null>(null)
  const backWallMarkerRef = useRef<THREE.Mesh | null>(null)

  // Axes extremities text sprites
  const xAxisLabelRef = useRef<THREE.Sprite | null>(null)
  const yAxisLabelRef = useRef<THREE.Sprite | null>(null)
  const zAxisLabelRef = useRef<THREE.Sprite | null>(null)

  const isDragging = useRef(false)
  const previousMousePosition = useRef({ x: 0, y: 0 })
  const mouseRef = useRef(new THREE.Vector2())
  const raycasterRef = useRef(new THREE.Raycaster())
  const rotationVelocity = useRef({ x: 0, y: 0 })

  // Helper utility to calculate coordinates based on metrics selection
  const getCoords = (model: ModelNode, xMet: string, yMet: string, zMet: string) => {
    const getVal = (model: ModelNode, id: string) => {
      if (id === 'constraint') return model.constraint
      if (id === 'judgment') return model.judgment
      if (id === 'reasoning') return model.reasoning
      if (id === 'cost') return model.cost
      return model.latency
    }
    return {
      x: -2.5 + getVal(model, xMet) * 5,
      y: -2.5 + getVal(model, yMet) * 5,
      z: -2.5 + getVal(model, zMet) * 5,
    }
  }

  // Draw 2D canvas texture for sprites
  const createTextSprite = (text: string, color: string, borderOpacity = 1) => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 64
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, 256, 64)
      ctx.fillStyle = 'rgba(2, 6, 23, 0.85)'
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      
      // Rounded border
      ctx.beginPath()
      ctx.roundRect(4, 4, 248, 56, 12)
      ctx.fill()
      ctx.globalAlpha = borderOpacity
      ctx.stroke()
      ctx.globalAlpha = 1.0

      ctx.font = 'bold 22px monospace'
      ctx.fillStyle = '#ffffff'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(text, 128, 32)
    }

    const texture = new THREE.CanvasTexture(canvas)
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      depthTest: true
    })
    const sprite = new THREE.Sprite(material)
    sprite.scale.set(1.5, 0.375, 1)
    return sprite
  }

  // Update neon projection lines and grid intersection markers
  const updateProjections = (pos: THREE.Vector3, colorHex: number) => {
    if (!floorLineRef.current || !leftWallLineRef.current || !backWallLineRef.current) return
    if (!floorMarkerRef.current || !leftWallMarkerRef.current || !backWallMarkerRef.current) return

    // Floor: (x, y, z) to (x, -3, z)
    const floorPoints = [pos, new THREE.Vector3(pos.x, -3.0, pos.z)]
    floorLineRef.current.geometry.setFromPoints(floorPoints)
    floorLineRef.current.computeLineDistances()
    ;(floorLineRef.current.material as THREE.LineDashedMaterial).color.setHex(colorHex)
    floorLineRef.current.visible = true

    // Left Wall: (x, y, z) to (-3, y, z)
    const leftPoints = [pos, new THREE.Vector3(-3.0, pos.y, pos.z)]
    leftWallLineRef.current.geometry.setFromPoints(leftPoints)
    leftWallLineRef.current.computeLineDistances()
    ;(leftWallLineRef.current.material as THREE.LineDashedMaterial).color.setHex(colorHex)
    leftWallLineRef.current.visible = true

    // Back Wall: (x, y, z) to (x, y, -3)
    const backPoints = [pos, new THREE.Vector3(pos.x, pos.y, -3.0)]
    backWallLineRef.current.geometry.setFromPoints(backPoints)
    backWallLineRef.current.computeLineDistances()
    ;(backWallLineRef.current.material as THREE.LineDashedMaterial).color.setHex(colorHex)
    backWallLineRef.current.visible = true

    // Position wall trackers
    floorMarkerRef.current.position.set(pos.x, -2.99, pos.z)
    floorMarkerRef.current.visible = true
    ;(floorMarkerRef.current.material as THREE.MeshBasicMaterial).color.setHex(colorHex)

    leftWallMarkerRef.current.position.set(-2.99, pos.y, pos.z)
    leftWallMarkerRef.current.visible = true
    ;(leftWallMarkerRef.current.material as THREE.MeshBasicMaterial).color.setHex(colorHex)

    backWallMarkerRef.current.position.set(pos.x, pos.y, -2.99)
    backWallMarkerRef.current.visible = true
    ;(backWallMarkerRef.current.material as THREE.MeshBasicMaterial).color.setHex(colorHex)
  }

  const clearProjections = () => {
    if (floorLineRef.current) floorLineRef.current.visible = false
    if (leftWallLineRef.current) leftWallLineRef.current.visible = false
    if (backWallLineRef.current) backWallLineRef.current.visible = false
    if (floorMarkerRef.current) floorMarkerRef.current.visible = false
    if (leftWallMarkerRef.current) leftWallMarkerRef.current.visible = false
    if (backWallMarkerRef.current) backWallMarkerRef.current.visible = false
  }

  // Smoothly glide spheres when axes metrics change
  useEffect(() => {
    if (spheresRef.current.length === 0) return

    spheresRef.current.forEach((sphere) => {
      const model = sphere.userData.model as ModelNode
      const dest = getCoords(model, xAxisMetric, yAxisMetric, zAxisMetric)
      
      gsap.to(sphere.position, {
        x: dest.x,
        y: dest.y,
        z: dest.z,
        duration: 1.2,
        ease: 'power3.out',
        onUpdate: () => {
          if (selectedModel && selectedModel.id === model.id) {
            updateProjections(sphere.position, parseInt(model.color.replace('#', '0x')))
          }
        }
      })
    })

    // Redraw extremity labels for metrics
    const xMet = METRICS.find(m => m.id === xAxisMetric)
    const yMet = METRICS.find(m => m.id === yAxisMetric)
    const zMet = METRICS.find(m => m.id === zAxisMetric)

    if (xAxisLabelRef.current && xMet) {
      const sp = createTextSprite(`X: ${xMet.shortLabel}`, xMet.color, 0.4)
      xAxisLabelRef.current.material.map?.dispose()
      xAxisLabelRef.current.material.map = sp.material.map
    }
    if (yAxisLabelRef.current && yMet) {
      const sp = createTextSprite(`Y: ${yMet.shortLabel}`, yMet.color, 0.4)
      yAxisLabelRef.current.material.map?.dispose()
      yAxisLabelRef.current.material.map = sp.material.map
    }
    if (zAxisLabelRef.current && zMet) {
      const sp = createTextSprite(`Z: ${zMet.shortLabel}`, zMet.color, 0.4)
      zAxisLabelRef.current.material.map?.dispose()
      zAxisLabelRef.current.material.map = sp.material.map
    }

    if (!selectedModel) {
      clearProjections()
    }
  }, [xAxisMetric, yAxisMetric, zAxisMetric])

  // Build full scene
  useEffect(() => {
    if (!mountRef.current) return

    const container = mountRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Scene
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x020617, 0.04)
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100)
    camera.position.set(6, 4, 9)
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x020617, 1)
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
    scene.add(ambientLight)

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.9)
    dirLight1.position.set(6, 12, 8)
    scene.add(dirLight1)

    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 0.3)
    dirLight2.position.set(-6, -6, -6)
    scene.add(dirLight2)

    // Floor and Wall Grid Helpers
    const gridColor = 0x1e293b
    const gridLineColor = 0x0f172a
    
    // Bottom grid plane (floor)
    const floorGrid = new THREE.GridHelper(10, 10, gridColor, gridLineColor)
    floorGrid.position.y = -3.0
    scene.add(floorGrid)

    // Left wall plane
    const leftGrid = new THREE.GridHelper(10, 10, gridColor, gridLineColor)
    leftGrid.position.x = -3.0
    leftGrid.rotation.z = Math.PI / 2
    scene.add(leftGrid)

    // Back wall plane
    const backGrid = new THREE.GridHelper(10, 10, gridColor, gridLineColor)
    backGrid.position.z = -3.0
    backGrid.rotation.x = Math.PI / 2
    scene.add(backGrid)

    // Helper Axes lines
    const createAxisLine = (start: THREE.Vector3, end: THREE.Vector3, color: number) => {
      const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.25 })
      const points = [start, end]
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      return new THREE.Line(geometry, material)
    }

    const origin = new THREE.Vector3(-3.0, -3.0, -3.0)
    const xAxis = createAxisLine(origin, new THREE.Vector3(3.5, -3.0, -3.0), 0xa855f7)
    const yAxis = createAxisLine(origin, new THREE.Vector3(-3.0, 3.5, -3.0), 0xf59e0b)
    const zAxis = createAxisLine(origin, new THREE.Vector3(-3.0, -3.0, 3.5), 0x3b82f6)
    scene.add(xAxis)
    scene.add(yAxis)
    scene.add(zAxis)

    // Extremities label setup
    const xLabel = createTextSprite('X: Constraints', '#a855f7', 0.4)
    xLabel.position.set(3.8, -3.0, -3.0)
    scene.add(xLabel)
    xAxisLabelRef.current = xLabel

    const yLabel = createTextSprite('Y: Judgment', '#f59e0b', 0.4)
    yLabel.position.set(-3.0, 3.8, -3.0)
    scene.add(yLabel)
    yAxisLabelRef.current = yLabel

    const zLabel = createTextSprite('Z: Cost', '#10b981', 0.4)
    zLabel.position.set(-3.0, -3.0, 3.8)
    scene.add(zLabel)
    zAxisLabelRef.current = zLabel

    // Dotted projection lines
    const lineMat = new THREE.LineDashedMaterial({
      color: 0xffffff,
      dashSize: 0.1,
      gapSize: 0.08,
      transparent: true,
      opacity: 0.55
    })

    const fLine = new THREE.Line(new THREE.BufferGeometry(), lineMat)
    const lLine = new THREE.Line(new THREE.BufferGeometry(), lineMat)
    const bLine = new THREE.Line(new THREE.BufferGeometry(), lineMat)
    scene.add(fLine)
    scene.add(lLine)
    scene.add(bLine)
    floorLineRef.current = fLine
    leftWallLineRef.current = lLine
    backWallLineRef.current = bLine

    // Projection grid intersection trackers
    const ringGeo = new THREE.RingGeometry(0.06, 0.1, 16)
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0.7 })

    const fMarker = new THREE.Mesh(ringGeo, ringMat.clone())
    fMarker.rotation.x = Math.PI / 2
    scene.add(fMarker)
    floorMarkerRef.current = fMarker

    const lMarker = new THREE.Mesh(ringGeo, ringMat.clone())
    lMarker.rotation.y = Math.PI / 2
    scene.add(lMarker)
    leftWallMarkerRef.current = lMarker

    const bMarker = new THREE.Mesh(ringGeo, ringMat.clone())
    scene.add(bMarker)
    backWallMarkerRef.current = bMarker

    clearProjections()

    // Floating Starlight Particles Cloud
    const particleCount = 380
    const particleGeo = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const pColors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12

      // Hex shades of brand palette
      const r = Math.random()
      if (r < 0.4) {
        pColors[i * 3] = 0.66 // #a855f7
        pColors[i * 3 + 1] = 0.33
        pColors[i * 3 + 2] = 0.98
      } else if (r < 0.7) {
        pColors[i * 3] = 0.96 // #f59e0b
        pColors[i * 3 + 1] = 0.62
        pColors[i * 3 + 2] = 0.04
      } else {
        pColors[i * 3] = 0.23 // #3b82f6
        pColors[i * 3 + 1] = 0.51
        pColors[i * 3 + 2] = 0.96
      }
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3))

    // Canvas texture for round glowing dust particles
    const pCanvas = document.createElement('canvas')
    pCanvas.width = 16
    pCanvas.height = 16
    const pCtx = pCanvas.getContext('2d')
    if (pCtx) {
      const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8)
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)')
      pCtx.fillStyle = grad
      pCtx.fillRect(0, 0, 16, 16)
    }
    const pTexture = new THREE.CanvasTexture(pCanvas)

    const particleMat = new THREE.PointsMaterial({
      size: 0.14,
      map: pTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const pointCloud = new THREE.Points(particleGeo, particleMat)
    scene.add(pointCloud)

    // Model Spheres
    const spheres: THREE.Mesh[] = []
    const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32)

    MODEL_DATA.forEach((model) => {
      const dest = getCoords(model, xAxisMetric, yAxisMetric, zAxisMetric)

      const material = new THREE.MeshStandardMaterial({
        color: model.color,
        roughness: 0.15,
        metalness: 0.85,
        emissive: model.color,
        emissiveIntensity: 0.35
      })

      const sphere = new THREE.Mesh(sphereGeometry, material)
      sphere.position.set(dest.x, dest.y, dest.z)
      sphere.scale.setScalar(model.size)
      sphere.userData = { model }

      // Outer target orbit rings
      const ringGeometry = new THREE.RingGeometry(0.32, 0.36, 32)
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: model.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.2
      })
      const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial)
      ringMesh.rotation.x = Math.PI / 2
      sphere.add(ringMesh)

      // Subagent Revision Satellites
      const satGeo = new THREE.SphereGeometry(0.05, 12, 12)
      const satMat = new THREE.MeshStandardMaterial({
        color: model.color,
        roughness: 0.2,
        metalness: 0.9,
        emissive: model.color,
        emissiveIntensity: 0.5
      })
      
      const sat1 = new THREE.Mesh(satGeo, satMat)
      const sat2 = new THREE.Mesh(satGeo, satMat)
      sphere.add(sat1)
      sphere.add(sat2)

      // Billboard Text labels floating above spheres
      const billboard = createTextSprite(model.name, model.color, 0.4)
      billboard.position.set(0, 0.45, 0)
      sphere.add(billboard)

      scene.add(sphere)
      spheres.push(sphere)
    })
    spheresRef.current = spheres

    // Initial Camera Intro Glide
    gsap.from(camera.position, {
      x: 10,
      y: 9,
      z: 14,
      duration: 2.2,
      ease: 'power3.out'
    })

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true
      previousMousePosition.current = { x: e.clientX, y: e.clientY }
      rotationVelocity.current = { x: 0, y: 0 }
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

        // Apply drag rotation velocity
        rotationVelocity.current.x = deltaMove.x * 0.003
        rotationVelocity.current.y = deltaMove.y * 0.003

        scene.rotation.y += rotationVelocity.current.x
        scene.rotation.x += rotationVelocity.current.y

        previousMousePosition.current = { x: e.clientX, y: e.clientY }
      } else {
        raycasterRef.current.setFromCamera(mouseRef.current, camera)
        const intersects = raycasterRef.current.intersectObjects(spheres)

        if (intersects.length > 0) {
          const hovered = intersects[0].object.userData.model as ModelNode
          setHoveredModel(hovered)
          document.body.style.cursor = 'pointer'
          gsap.to(intersects[0].object.scale, {
            x: hovered.size * 1.25,
            y: hovered.size * 1.25,
            z: hovered.size * 1.25,
            duration: 0.25
          })
        } else {
          setHoveredModel(null)
          if (!selectedModel) {
            document.body.style.cursor = 'default'
          }
          spheres.forEach((s) => {
            gsap.to(s.scale, {
              x: s.userData.model.size,
              y: s.userData.model.size,
              z: s.userData.model.size,
              duration: 0.25
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
          x: targetPos.x + 2.5,
          y: targetPos.y + 1.8,
          z: targetPos.z + 3.2,
          duration: 1.2,
          ease: 'power2.out'
        })
        
        // Show lines on select
        updateProjections(targetPos, parseInt(model.color.replace('#', '0x')))
      } else {
        setSelectedModel(null)
        clearProjections()
        gsap.to(camera.position, {
          x: 6,
          y: 4,
          z: 9,
          duration: 1.2,
          ease: 'power2.out'
        })
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging.current = true
        previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
        rotationVelocity.current = { x: 0, y: 0 }
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging.current && e.touches.length === 1) {
        const deltaMove = {
          x: e.touches[0].clientX - previousMousePosition.current.x,
          y: e.touches[0].clientY - previousMousePosition.current.y
        }
        rotationVelocity.current.x = deltaMove.x * 0.005
        rotationVelocity.current.y = deltaMove.y * 0.005

        scene.rotation.y += rotationVelocity.current.x
        scene.rotation.x += rotationVelocity.current.y

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

      // Slow orbital rotate of particle field
      pointCloud.rotation.y = elapsedTime * 0.01
      pointCloud.rotation.x = Math.sin(elapsedTime * 0.04) * 0.03

      // Auto-rotation inertia loop
      if (autoRotate && !isDragging.current) {
        scene.rotation.y += 0.002
      } else if (!isDragging.current) {
        // Apply rotation velocity decay (damping)
        scene.rotation.y += rotationVelocity.current.x
        scene.rotation.x += rotationVelocity.current.y
        rotationVelocity.current.x *= 0.92
        rotationVelocity.current.y *= 0.92
      }

      // Rotate targeting rings and orbit satellites
      spheres.forEach((sphere, index) => {
        sphere.position.y += Math.sin(elapsedTime * 1.4 + index) * 0.002
        
        // Inner ring
        if (sphere.children[0]) {
          sphere.children[0].rotation.z += 0.008
        }
        
        // Satellites
        if (sphere.children[1]) {
          const s1 = sphere.children[1] as THREE.Mesh
          s1.position.x = Math.cos(elapsedTime * 1.8 + index) * 0.48
          s1.position.z = Math.sin(elapsedTime * 1.8 + index) * 0.48
        }
        if (sphere.children[2]) {
          const s2 = sphere.children[2] as THREE.Mesh
          s2.position.y = Math.cos(elapsedTime * 2.2 + index + Math.PI) * 0.38
          s2.position.z = Math.sin(elapsedTime * 2.2 + index + Math.PI) * 0.38
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
  }, [autoRotate])

  const activeX = METRICS.find(m => m.id === xAxisMetric)
  const activeY = METRICS.find(m => m.id === yAxisMetric)
  const activeZ = METRICS.find(m => m.id === zAxisMetric)

  return (
    <div className="relative w-full h-[580px] bg-[#020617] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Visual neon depth gradient */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_120%,rgba(168,85,247,0.06),transparent_50%)]" />

      {/* THREE viewport mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* WebGL Overlay HUD Panels */}
      
      {/* 1. Dynamic axis selection controllers */}
      <div className="absolute top-6 left-6 right-6 md:right-auto z-10 flex flex-col gap-2.5 max-w-xs bg-slate-950/85 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between pb-2 border-b border-white/5">
          <div className="font-semibold text-white/90 text-sm flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-[#a855f7]" />
            <span>Interactive Telemetry HUD</span>
          </div>
        </div>

        {/* X Axis select */}
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-mono tracking-wider text-white/40 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7]" /> X-Axis (Width)
          </label>
          <div className="relative">
            <select
              value={xAxisMetric}
              onChange={(e) => setXAxisMetric(e.target.value)}
              className="w-full bg-slate-900 border border-white/5 rounded-lg px-2.5 py-1.5 text-xs text-white/80 focus:border-purple-500 outline-none cursor-pointer appearance-none"
            >
              {METRICS.map(m => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </select>
            <ArrowUpDown className="absolute right-2.5 top-2.5 w-3 h-3 text-white/30 pointer-events-none" />
          </div>
        </div>

        {/* Y Axis select */}
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-mono tracking-wider text-white/40 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" /> Y-Axis (Height)
          </label>
          <div className="relative">
            <select
              value={yAxisMetric}
              onChange={(e) => setYAxisMetric(e.target.value)}
              className="w-full bg-slate-900 border border-white/5 rounded-lg px-2.5 py-1.5 text-xs text-white/80 focus:border-amber-500 outline-none cursor-pointer appearance-none"
            >
              {METRICS.map(m => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </select>
            <ArrowUpDown className="absolute right-2.5 top-2.5 w-3 h-3 text-white/30 pointer-events-none" />
          </div>
        </div>

        {/* Z Axis select */}
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-mono tracking-wider text-white/40 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" /> Z-Axis (Depth)
          </label>
          <div className="relative">
            <select
              value={zAxisMetric}
              onChange={(e) => setZAxisMetric(e.target.value)}
              className="w-full bg-slate-900 border border-white/5 rounded-lg px-2.5 py-1.5 text-xs text-white/80 focus:border-emerald-500 outline-none cursor-pointer appearance-none"
            >
              {METRICS.map(m => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </select>
            <ArrowUpDown className="absolute right-2.5 top-2.5 w-3 h-3 text-white/30 pointer-events-none" />
          </div>
        </div>

        {/* Auto Rotate Control */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[10px] text-white/45 font-mono">Camera Auto-Orbit</span>
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1 rounded-md text-[10px] font-mono border transition-all ${
              autoRotate ? 'bg-[#a855f7]/10 border-[#a855f7]/30 text-[#a855f7]' : 'bg-white/5 border-white/5 text-white/40'
            }`}
          >
            {autoRotate ? 'ACTIVE' : 'PAUSED'}
          </button>
        </div>
      </div>

      {/* 2. Hover mini stats card */}
      {hoveredModel && !selectedModel && (
        <div className="absolute bottom-6 left-6 z-10 w-72 bg-slate-950/90 backdrop-blur-md border border-white/10 p-4 rounded-2xl animate-fade-in shadow-xl pointer-events-none">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: hoveredModel.color }} />
            <span className="font-bold text-white text-base">{hoveredModel.name}</span>
          </div>
          <p className="text-xs text-white/60 leading-relaxed mb-3">{hoveredModel.description}</p>
          <div className="flex items-center gap-1.5 text-xs text-[#a855f7] font-mono">
            <Zap className="w-3.5 h-3.5" />
            <span>Click node to lock telemetry specs</span>
          </div>
        </div>
      )}

      {/* 3. Selection detail stats HUD overlay */}
      {selectedModel && (
        <div className="absolute bottom-6 right-6 left-6 md:left-auto md:w-[360px] z-10 bg-slate-950/95 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-2xl animate-slide-in">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: selectedModel.color }} />
                <span className="font-bold text-white text-lg">{selectedModel.name}</span>
              </div>
              <span className="text-[10px] text-white/45 font-mono">{selectedModel.org} receipt telemetry</span>
            </div>
            <button 
              onClick={() => {
                setSelectedModel(null)
                clearProjections()
                const cam = cameraRef.current
                if (cam) {
                  gsap.to(cam.position, { x: 6, y: 4, z: 9, duration: 1.2, ease: 'power2.out' })
                }
              }}
              className="text-[10px] text-white/50 hover:text-white bg-white/5 hover:bg-white/10 px-2 py-1 rounded-md transition-colors"
            >
              Reset camera
            </button>
          </div>

          <p className="text-xs text-white/70 leading-relaxed mb-4">{selectedModel.description}</p>

          {/* Active coordinates readout */}
          <div className="grid grid-cols-3 gap-2 mb-4 bg-slate-900/60 p-2.5 rounded-xl border border-white/5 font-mono text-[10px]">
            <div>
              <span className="block text-white/30 text-[9px] uppercase">X-Axis</span>
              <span className="text-white font-bold" style={{ color: activeX?.color }}>
                {xAxisMetric === 'constraint' ? selectedModel.constraint :
                 xAxisMetric === 'judgment' ? selectedModel.judgment :
                 xAxisMetric === 'reasoning' ? selectedModel.reasoning :
                 xAxisMetric === 'cost' ? selectedModel.cost : selectedModel.latency}
              </span>
            </div>
            <div>
              <span className="block text-white/30 text-[9px] uppercase">Y-Axis</span>
              <span className="text-white font-bold" style={{ color: activeY?.color }}>
                {yAxisMetric === 'constraint' ? selectedModel.constraint :
                 yAxisMetric === 'judgment' ? selectedModel.judgment :
                 yAxisMetric === 'reasoning' ? selectedModel.reasoning :
                 yAxisMetric === 'cost' ? selectedModel.cost : selectedModel.latency}
              </span>
            </div>
            <div>
              <span className="block text-white/30 text-[9px] uppercase">Z-Axis</span>
              <span className="text-white font-bold" style={{ color: activeZ?.color }}>
                {zAxisMetric === 'constraint' ? selectedModel.constraint :
                 zAxisMetric === 'judgment' ? selectedModel.judgment :
                 zAxisMetric === 'reasoning' ? selectedModel.reasoning :
                 zAxisMetric === 'cost' ? selectedModel.cost : selectedModel.latency}
              </span>
            </div>
          </div>

          <div className="space-y-2.5 border-t border-white/5 pt-3.5 mb-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/40 flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-zinc-500" /> Core Verdict</span>
              <span className="text-white font-medium" style={{ color: selectedModel.color }}>{selectedModel.stats.verdict}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/40 flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5 text-zinc-500" /> Cost / 1M</span>
              <span className="text-zinc-300 font-mono">{selectedModel.stats.pricing}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/40 flex items-center gap-1.5"><Target className="w-3.5 h-3.5 text-zinc-500" /> Peak Benchmark</span>
              <span className="text-zinc-300 font-mono">{selectedModel.stats.benchmark}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link 
              href={`/llm-hub/${selectedModel.id}`} 
              className="flex-1 text-center py-2 text-xs font-semibold rounded-lg text-black bg-white hover:bg-white/90 transition-colors"
            >
              Model Explorer
            </Link>
            <a 
              href="https://github.com/frankxai/Starlight-Intelligence-System/tree/main/tools/arena/runs" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all text-white flex items-center gap-1.5 justify-center"
            >
              JSON Receipt
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
