'use client'

// Rose-gold floating particles using deterministic golden ratio positioning
const PARTICLE_COUNT = 35

const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  left: ((i * 61.8) % 100),
  top: ((i * 38.2) % 100),
  size: 2 + ((i * 1.3) % 4),
  delay: (i * 0.8) % 8,
  duration: 5 + ((i * 2.1) % 7),
  opacity: 0.15 + ((i * 0.012) % 0.25),
  glowSize: 6 + ((i * 2.7) % 10),
}))

interface ParticleFieldProps {
  className?: string
  variant?: 'rose-gold' | 'warm' | 'cool' | 'fire'
}

export function ParticleField({
  className,
  variant = 'rose-gold',
}: ParticleFieldProps) {
  const colorMap = {
    'rose-gold': {
      gradient: 'radial-gradient(circle, #d4a373, #f472b6)',
      glow: 'rgba(212, 163, 115, 0.3)',
    },
    warm: {
      gradient: 'radial-gradient(circle, #fbbf24, #f472b6)',
      glow: 'rgba(251, 191, 36, 0.3)',
    },
    cool: {
      gradient: 'radial-gradient(circle, #8b5cf6, #f472b6)',
      glow: 'rgba(139, 92, 246, 0.3)',
    },
    fire: {
      gradient: 'radial-gradient(circle, #f59e0b, #ef4444)',
      glow: 'rgba(245, 158, 11, 0.3)',
    },
  }

  const colors = colorMap[variant]

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className || ''}`}
      aria-hidden="true"
    >
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float-particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: colors.gradient,
            boxShadow: `0 0 ${p.glowSize}px ${colors.glow}`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  )
}
