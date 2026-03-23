'use client'

import { useEffect, useRef, useState } from 'react'
import { familyNodes, familyEdges, sideColors } from '@/lib/family-tree-data'

/**
 * V12 - Canvas 2D Interactive Family Tree
 * Hand-painted HTML Canvas with bezier curves, gradients, and hover effects
 */

interface NodePosition {
  id: string
  x: number
  y: number
  width: number
  height: number
  color: string
}

// Deterministic hash function for particle positions (no Math.random)
const deterministicValue = (index: number, seed: number = 0): number => {
  return (((index + seed) * 2654435761) >>> 0) % 10000 / 10000
}

export default function FamilyTreeCanvasPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [nodePositions, setNodePositions] = useState<NodePosition[]>([])
  const animationFrameRef = useRef<number>()
  const dashOffsetRef = useRef(0)

  // Calculate node positions based on canvas size
  const calculatePositions = (width: number, height: number): NodePosition[] => {
    const centerX = width / 2
    const nodeWidth = 180
    const nodeHeight = 100
    const horizontalSpacing = 220
    const verticalSpacing = 180

    const positions: NodePosition[] = []

    familyNodes.forEach((node) => {
      let x = centerX
      let y = 0

      // Generation 0: Grandparents
      if (node.generation === 0) {
        y = height * 0.15
        if (node.id === 'david-gorte') x = centerX - horizontalSpacing * 1.5
        if (node.id === 'dorothea-gorte') x = centerX - horizontalSpacing * 0.5
        if (node.id === 'alexander-riemer') x = centerX + horizontalSpacing * 0.5
        if (node.id === 'paulina-riemer') x = centerX + horizontalSpacing * 1.5
      }

      // Generation 1: Parents
      if (node.generation === 1) {
        y = height * 0.5
        if (node.id === 'dora-riemer') x = centerX - horizontalSpacing * 0.5
        if (node.id === 'witali-riemer') x = centerX + horizontalSpacing * 0.5
      }

      // Generation 2: Current
      if (node.generation === 2) {
        y = height * 0.85
        if (node.id === 'frank-riemer') x = centerX - horizontalSpacing * 0.5
        if (node.id === 'tien') x = centerX + horizontalSpacing * 0.5
      }

      positions.push({
        id: node.id,
        x: x - nodeWidth / 2,
        y: y - nodeHeight / 2,
        width: nodeWidth,
        height: nodeHeight,
        color: sideColors[node.side].hex,
      })
    })

    return positions
  }

  // Draw background with grid and particles
  const drawBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Radial gradient
    const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width * 0.8)
    gradient.addColorStop(0, '#0f172a')
    gradient.addColorStop(1, '#020617')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Grid dots
    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)'
    const gridSize = 40
    for (let x = 0; x < width; x += gridSize) {
      for (let y = 0; y < height; y += gridSize) {
        ctx.fillRect(x, y, 1, 1)
      }
    }

    // Floating particles (deterministic)
    ctx.fillStyle = 'rgba(139, 92, 246, 0.1)'
    for (let i = 0; i < 30; i++) {
      const x = deterministicValue(i, 1) * width
      const y = deterministicValue(i, 2) * height
      const size = 2 + deterministicValue(i, 3) * 4
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Draw connection line with bezier curve
  const drawConnection = (
    ctx: CanvasRenderingContext2D,
    source: NodePosition,
    target: NodePosition,
    type: 'spouse' | 'parent-child' | 'partner',
    dashOffset: number
  ) => {
    const sourceX = source.x + source.width / 2
    const sourceY = source.y + source.height / 2
    const targetX = target.x + target.width / 2
    const targetY = target.y + target.height / 2

    ctx.lineWidth = 2

    if (type === 'spouse' || type === 'partner') {
      // Horizontal dashed line for spouses
      ctx.setLineDash([8, 4])
      ctx.lineDashOffset = dashOffset
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
      ctx.beginPath()
      ctx.moveTo(sourceX, sourceY)
      ctx.lineTo(targetX, targetY)
      ctx.stroke()
      ctx.setLineDash([])
    } else {
      // Bezier curve for parent-child with gradient
      const gradient = ctx.createLinearGradient(sourceX, sourceY, targetX, targetY)
      gradient.addColorStop(0, source.color + '80')
      gradient.addColorStop(1, target.color + '80')
      ctx.strokeStyle = gradient

      const controlY = sourceY + (targetY - sourceY) * 0.6
      ctx.beginPath()
      ctx.moveTo(sourceX, sourceY + source.height / 2)
      ctx.quadraticCurveTo(sourceX, controlY, targetX, targetY - target.height / 2)
      ctx.stroke()
    }
  }

  // Draw node with gradient and glow
  const drawNode = (
    ctx: CanvasRenderingContext2D,
    position: NodePosition,
    node: typeof familyNodes[0],
    isHovered: boolean
  ) => {
    const { x, y, width, height, color } = position
    const cornerRadius = 12
    const scale = isHovered ? 1.05 : 1
    const scaledWidth = width * scale
    const scaledHeight = height * scale
    const scaledX = x - (scaledWidth - width) / 2
    const scaledY = y - (scaledHeight - height) / 2

    // Glow effect
    if (isHovered) {
      ctx.shadowColor = color
      ctx.shadowBlur = 30
    } else {
      ctx.shadowColor = color
      ctx.shadowBlur = 15
    }

    // Background gradient
    const gradient = ctx.createLinearGradient(scaledX, scaledY, scaledX, scaledY + scaledHeight)
    gradient.addColorStop(0, 'rgba(15, 23, 42, 0.95)')
    gradient.addColorStop(1, 'rgba(30, 41, 59, 0.95)')
    ctx.fillStyle = gradient

    // Draw rounded rectangle
    ctx.beginPath()
    ctx.moveTo(scaledX + cornerRadius, scaledY)
    ctx.lineTo(scaledX + scaledWidth - cornerRadius, scaledY)
    ctx.quadraticCurveTo(scaledX + scaledWidth, scaledY, scaledX + scaledWidth, scaledY + cornerRadius)
    ctx.lineTo(scaledX + scaledWidth, scaledY + scaledHeight - cornerRadius)
    ctx.quadraticCurveTo(scaledX + scaledWidth, scaledY + scaledHeight, scaledX + scaledWidth - cornerRadius, scaledY + scaledHeight)
    ctx.lineTo(scaledX + cornerRadius, scaledY + scaledHeight)
    ctx.quadraticCurveTo(scaledX, scaledY + scaledHeight, scaledX, scaledY + scaledHeight - cornerRadius)
    ctx.lineTo(scaledX, scaledY + cornerRadius)
    ctx.quadraticCurveTo(scaledX, scaledY, scaledX + cornerRadius, scaledY)
    ctx.closePath()
    ctx.fill()

    // Border with color glow
    ctx.strokeStyle = color
    ctx.lineWidth = isHovered ? 3 : 2
    ctx.stroke()

    // Reset shadow
    ctx.shadowBlur = 0

    // Text rendering
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    const centerX = scaledX + scaledWidth / 2
    let textY = scaledY + scaledHeight / 2

    // Name (bold)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
    ctx.font = 'bold 16px Inter, system-ui, sans-serif'
    ctx.fillText(node.name, centerX, textY - 20)

    // Born name (italic)
    if (node.bornName) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
      ctx.font = 'italic 12px Inter, system-ui, sans-serif'
      ctx.fillText(node.bornName, centerX, textY - 2)
      textY += 10
    }

    // Role
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
    ctx.font = '13px Inter, system-ui, sans-serif'
    ctx.fillText(node.role, centerX, textY + (node.bornName ? 8 : 5))

    // Location
    if (node.location) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
      ctx.font = '11px Inter, system-ui, sans-serif'
      ctx.fillText(node.location, centerX, textY + 25)
    }
  }

  // Animation loop
  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background
    drawBackground(ctx, canvas.width, canvas.height)

    // Update dash offset for animated spouse lines
    dashOffsetRef.current = (dashOffsetRef.current + 0.5) % 12

    // Draw connections
    familyEdges.forEach((edge) => {
      const sourcePos = nodePositions.find((p) => p.id === edge.source)
      const targetPos = nodePositions.find((p) => p.id === edge.target)
      if (sourcePos && targetPos) {
        drawConnection(ctx, sourcePos, targetPos, edge.type, dashOffsetRef.current)
      }
    })

    // Draw nodes
    familyNodes.forEach((node) => {
      const position = nodePositions.find((p) => p.id === node.id)
      if (position) {
        drawNode(ctx, position, node, hoveredNode === node.id)
      }
    })

    animationFrameRef.current = requestAnimationFrame(animate)
  }

  // Handle mouse move for hover detection
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    const x = (e.clientX - rect.left) * dpr
    const y = (e.clientY - rect.top) * dpr

    let hoveredId: string | null = null
    for (const pos of nodePositions) {
      if (x >= pos.x && x <= pos.x + pos.width && y >= pos.y && y <= pos.y + pos.height) {
        hoveredId = pos.id
        break
      }
    }

    setHoveredNode(hoveredId)
  }

  // Download canvas as PNG
  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement('a')
    link.download = 'family-tree-canvas.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  // Setup canvas and handle resize
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const updateCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr

      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.scale(dpr, dpr)
      }

      // Recalculate positions
      setNodePositions(calculatePositions(canvas.width, canvas.height))
    }

    updateCanvas()
    window.addEventListener('resize', updateCanvas)

    return () => {
      window.removeEventListener('resize', updateCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Start animation when positions are ready
  useEffect(() => {
    if (nodePositions.length > 0) {
      animate()
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps -- animate is stable (uses refs)
  }, [nodePositions, hoveredNode])

  return (
    <div className="relative w-full h-screen bg-slate-950 overflow-hidden">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        className="absolute inset-0 w-full h-full"
        style={{ cursor: hoveredNode ? 'pointer' : 'default' }}
      />

      {/* Title Overlay */}
      <div className="absolute top-8 left-8 pointer-events-none">
        <h1 className="text-4xl font-bold text-white mb-2">
          V12 — Canvas 2D
        </h1>
        <p className="text-lg text-white/60">
          Hand-painted HTML Canvas
        </p>
      </div>

      {/* Legend Panel */}
      <div className="absolute top-8 right-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl">
        <h3 className="text-sm font-semibold text-white/90 mb-4 uppercase tracking-wider">
          Family Lines
        </h3>
        <div className="space-y-3">
          {Object.entries(sideColors).map(([key, value]) => (
            <div key={key} className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor: value.hex,
                  boxShadow: `0 0 12px ${value.hex}80`,
                }}
              />
              <span className="text-sm text-white/70 capitalize">
                {key === 'bridge' ? 'Parents' : key}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="space-y-2 text-xs text-white/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-white/30" />
              <span>Solid: Parent-child</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 border-t-2 border-dashed border-white/30" />
              <span>Dashed: Marriage</span>
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="absolute bottom-8 right-8 px-6 py-3 bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/50 rounded-xl text-white font-medium transition-all duration-200 shadow-lg hover:shadow-violet-500/20"
      >
        Download PNG
      </button>

      {/* Hovered Node Info */}
      {hoveredNode && (
        <div className="absolute bottom-8 left-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-6 py-4 shadow-2xl max-w-sm">
          {(() => {
            const node = familyNodes.find((n) => n.id === hoveredNode)
            if (!node) return null
            return (
              <div>
                <h4 className="text-lg font-bold text-white mb-1">
                  {node.name}
                </h4>
                {node.bornName && (
                  <p className="text-sm text-white/60 italic mb-2">
                    {node.bornName}
                  </p>
                )}
                <p className="text-sm text-white/70 mb-2">{node.role}</p>
                {node.location && (
                  <p className="text-xs text-white/50">{node.location}</p>
                )}
                {node.details && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    {node.details.map((detail, i) => (
                      <p key={i} className="text-xs text-white/60">
                        {detail}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )
          })()}
        </div>
      )}

      {/* Tech Badge */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-white/50 backdrop-blur-sm">
        Canvas 2D • Bezier Curves • Retina Ready
      </div>
    </div>
  )
}
