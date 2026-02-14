'use client'

// Deterministic petal positions using golden ratio distribution
// Avoids Math.random() in render (React 19 strict mode safe)
const PETAL_COUNT = 28

const petals = Array.from({ length: PETAL_COUNT }, (_, i) => ({
  left: ((i * 61.8) % 100),
  delay: (i * 1.7) % 14,
  duration: 10 + ((i * 3.7) % 10),
  size: 6 + ((i * 2.3) % 10),
  drift: (((i * 43.7) % 60) - 30),
  rotation: ((i * 137.5) % 360),
  opacity: 0.3 + ((i * 0.018) % 0.4),
}))

interface CherryBlossomsProps {
  intensity?: 'light' | 'medium' | 'heavy'
}

export function CherryBlossoms({ intensity = 'medium' }: CherryBlossomsProps) {
  const count =
    intensity === 'light' ? 12 : intensity === 'heavy' ? PETAL_COUNT : 20

  return (
    <div
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    >
      {petals.slice(0, count).map((petal, i) => (
        <div
          key={i}
          className="absolute cherry-petal"
          style={
            {
              left: `${petal.left}%`,
              top: '-20px',
              width: `${petal.size}px`,
              height: `${petal.size}px`,
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
