'use client'

// Deterministic petal positions using golden ratio distribution
// React 19 strict mode safe — no Math.random() in render
const PETAL_COUNT = 24

const petals = Array.from({ length: PETAL_COUNT }, (_, i) => ({
  left: ((i * 61.8) % 100),
  delay: (i * 2.1) % 16,
  duration: 12 + ((i * 3.3) % 12),
  size: 8 + ((i * 2.7) % 12),
  drift: (((i * 47.3) % 70) - 35),
  rotation: ((i * 137.5) % 360),
  opacity: 0.25 + ((i * 0.02) % 0.35),
  variant: i % 3 === 0 ? 'light' as const : 'dark' as const,
}))

interface RosePetalsProps {
  intensity?: 'light' | 'medium'
}

export function RosePetals({ intensity = 'light' }: RosePetalsProps) {
  const count = intensity === 'light' ? 14 : PETAL_COUNT

  return (
    <div
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    >
      {petals.slice(0, count).map((petal, i) => (
        <div
          key={i}
          className={`absolute ${petal.variant === 'light' ? 'rose-petal-light' : 'rose-petal'}`}
          style={
            {
              left: `${petal.left}%`,
              top: '-20px',
              width: `${petal.size}px`,
              height: `${petal.size * 0.7}px`,
              animationDelay: `${petal.delay}s`,
              animationDuration: `${petal.duration}s`,
              opacity: petal.opacity,
              '--drift': `${petal.drift}px`,
              '--rotation': `${petal.rotation}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
