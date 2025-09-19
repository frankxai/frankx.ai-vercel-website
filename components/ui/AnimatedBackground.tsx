'use client'

import { useEffect, useRef } from 'react'

interface AnimatedBackgroundProps {
  variant?: 'gradient' | 'particles' | 'waves' | 'grid'
  className?: string
  intensity?: 'low' | 'medium' | 'high'
}

export default function AnimatedBackground({
  variant = 'gradient',
  className = '',
  intensity = 'medium'
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const updateCanvasSize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    let animationId: number
    let particles: Array<{
      x: number
      y: number
      dx: number
      dy: number
      size: number
      opacity: number
      color: string
    }> = []

    // Initialize particles based on variant
    if (variant === 'particles') {
      const particleCount = intensity === 'high' ? 150 : intensity === 'medium' ? 100 : 50

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          dx: (Math.random() - 0.5) * (intensity === 'high' ? 2 : intensity === 'medium' ? 1 : 0.5),
          dy: (Math.random() - 0.5) * (intensity === 'high' ? 2 : intensity === 'medium' ? 1 : 0.5),
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.6 + 0.2,
          color: `hsl(${180 + Math.random() * 60}, 70%, 60%)`
        })
      }
    }

    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.016 // ~60fps

      if (variant === 'gradient') {
        // Animated gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        const hue1 = (time * 20) % 360
        const hue2 = (time * 20 + 60) % 360

        gradient.addColorStop(0, `hsla(${hue1}, 60%, 20%, 0.1)`)
        gradient.addColorStop(0.5, `hsla(${hue2}, 70%, 30%, 0.05)`)
        gradient.addColorStop(1, `hsla(${hue1 + 120}, 50%, 25%, 0.1)`)

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Add floating orbs
        for (let i = 0; i < 3; i++) {
          const x = canvas.width * 0.3 + Math.sin(time * 0.5 + i * 2) * 200
          const y = canvas.height * 0.5 + Math.cos(time * 0.3 + i * 1.5) * 150
          const radius = 100 + Math.sin(time + i) * 20

          const orbGradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
          orbGradient.addColorStop(0, `hsla(${hue1 + i * 40}, 80%, 60%, 0.1)`)
          orbGradient.addColorStop(1, 'hsla(0, 0%, 0%, 0)')

          ctx.fillStyle = orbGradient
          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      if (variant === 'particles') {
        particles.forEach((particle, index) => {
          particle.x += particle.dx
          particle.y += particle.dy

          // Bounce off edges
          if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1
          if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1

          // Draw particle
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fillStyle = particle.color.replace(')', `, ${particle.opacity})`)
          ctx.fill()

          // Connect nearby particles
          particles.slice(index + 1).forEach(otherParticle => {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 100) {
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.strokeStyle = `hsla(200, 60%, 60%, ${0.2 * (1 - distance / 100)})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          })
        })
      }

      if (variant === 'waves') {
        // Multiple sine waves
        for (let wave = 0; wave < 3; wave++) {
          ctx.beginPath()
          ctx.moveTo(0, canvas.height / 2)

          const amplitude = 50 + wave * 20
          const frequency = 0.01 + wave * 0.005
          const phase = time + wave * Math.PI / 3

          for (let x = 0; x <= canvas.width; x += 2) {
            const y = canvas.height / 2 + Math.sin(x * frequency + phase) * amplitude
            ctx.lineTo(x, y)
          }

          ctx.strokeStyle = `hsla(${180 + wave * 30}, 60%, 50%, ${0.2 - wave * 0.05})`
          ctx.lineWidth = 2
          ctx.stroke()
        }
      }

      if (variant === 'grid') {
        const gridSize = intensity === 'high' ? 30 : intensity === 'medium' ? 40 : 50

        ctx.strokeStyle = `hsla(200, 30%, 40%, 0.1)`
        ctx.lineWidth = 1

        // Vertical lines
        for (let x = 0; x <= canvas.width; x += gridSize) {
          const offset = Math.sin(time * 2 + x * 0.01) * 10
          ctx.beginPath()
          ctx.moveTo(x + offset, 0)
          ctx.lineTo(x + offset, canvas.height)
          ctx.stroke()
        }

        // Horizontal lines
        for (let y = 0; y <= canvas.height; y += gridSize) {
          const offset = Math.cos(time * 2 + y * 0.01) * 10
          ctx.beginPath()
          ctx.moveTo(0, y + offset)
          ctx.lineTo(canvas.width, y + offset)
          ctx.stroke()
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      cancelAnimationFrame(animationId)
    }
  }, [variant, intensity])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  )
}