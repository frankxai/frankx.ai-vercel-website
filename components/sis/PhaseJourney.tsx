// 5-phase journey timeline — horizontal flow with glassmorphic capsule nodes.

const phases = [
  { num: '1', label: 'Welcome', time: '10 min' },
  { num: '2', label: 'Genius Discovery', time: '90 min' },
  { num: '3', label: 'Reclamation', time: '3 hr' },
  { num: '4', label: 'Choose Layer', time: 'You decide' },
  { num: '5', label: 'Compound', time: 'Ongoing' },
]

export default function PhaseJourney({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1100 200"
      className={className}
      role="img"
      aria-labelledby="phase-journey-title"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="phase-journey-title">5-phase journey: Welcome, Genius Discovery, Reclamation, Choose Layer, Compound</title>

      <defs>
        <linearGradient id="phase-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="50%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <linearGradient id="phase-node" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0a12" />
          <stop offset="100%" stopColor="#030712" />
        </linearGradient>
        <filter id="phase-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* Connecting line */}
      <line x1="80" y1="100" x2="1020" y2="100" stroke="url(#phase-line)" strokeWidth="2" strokeLinecap="round" />

      {/* Glow on the line */}
      <line x1="80" y1="100" x2="1020" y2="100" stroke="url(#phase-line)" strokeWidth="6" strokeLinecap="round" opacity="0.3" filter="url(#phase-glow)" />

      {phases.map((p, i) => {
        const x = 90 + i * 230
        const isFirst = i === 0
        const isLast = i === phases.length - 1
        return (
          <g key={p.num}>
            {/* Outer ring */}
            <circle cx={x} cy="100" r="32" fill="url(#phase-node)" stroke="url(#phase-line)" strokeWidth="1.5" />
            {/* Inner accent */}
            <circle cx={x} cy="100" r="22" fill="none" stroke={isFirst ? '#10b981' : isLast ? '#a78bfa' : '#22d3ee'} strokeWidth="0.5" opacity="0.6" />
            {/* Number */}
            <text x={x} y="105" textAnchor="middle" fill="#fff" fontSize="14" fontFamily="system-ui,sans-serif" fontWeight="700">
              {p.num}
            </text>
            {/* Label above */}
            <text x={x} y="50" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontFamily="system-ui,sans-serif" fontWeight="600">
              {p.label}
            </text>
            {/* Time below */}
            <text x={x} y="160" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="ui-monospace,monospace" letterSpacing="1">
              {p.time.toUpperCase()}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
