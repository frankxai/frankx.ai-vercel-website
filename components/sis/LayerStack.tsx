// 9-layer architecture stack — isometric, foundation glows, status badges per layer.
// Used as a richer companion to the table on the SIS page.

const layers = [
  { n: 9, name: 'Spiritual IS', purpose: 'Meaning layer', status: 'optional', color: '#475569' },
  { n: 8, name: 'Relational IS', purpose: 'Network + alliances', status: 'month 3', color: '#64748b' },
  { n: 7, name: 'Health IS', purpose: 'Body is the substrate', status: 'month 2', color: '#94a3b8' },
  { n: 6, name: 'Wealth / Freedom IS', purpose: 'Compounding capital + time', status: 'month 3', color: '#a78bfa' },
  { n: 5, name: 'Creator IS', purpose: 'Content pipeline, multi-modal', status: 'alpha', color: '#c084fc' },
  { n: 4, name: 'Business IS', purpose: 'Accounting, taxes, entity', status: 'month 2-3', color: '#818cf8' },
  { n: 3, name: 'Vision / Brand IS', purpose: 'Why + how + design', status: 'month 2', color: '#60a5fa' },
  { n: 2, name: 'Second Brain IS', purpose: 'Knowledge architecture', status: 'alpha', color: '#22d3ee' },
  { n: 1, name: 'Genius IS', purpose: 'What only you uniquely see', status: 'alpha v7.4', color: '#10b981', primary: true },
]

const statusColor = (s: string) =>
  s.startsWith('alpha') ? '#10b981' : s === 'optional' ? '#475569' : '#64748b'

export default function LayerStack({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 640"
      className={className}
      role="img"
      aria-labelledby="layer-stack-title layer-stack-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="layer-stack-title">Nine-layer Intelligence System architecture</title>
      <desc id="layer-stack-desc">
        Isometric stack visualization of the 9 SIS layers from Spiritual at the top to Genius at the foundation.
        Each layer shows its name, purpose, and shipping status.
      </desc>

      <defs>
        <radialGradient id="ls-foundation-glow" cx="0.5" cy="0.5" r="0.7">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ls-side" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f172a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#020617" stopOpacity="1" />
        </linearGradient>
        <filter id="ls-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Foundation ambient glow */}
      <ellipse cx="400" cy="595" rx="340" ry="40" fill="url(#ls-foundation-glow)" filter="url(#ls-glow)" />

      {layers.map((l, i) => {
        const y = 30 + i * 60
        return (
          <g key={l.n}>
            {/* Layer shape — isometric */}
            <path
              d={`M 200 ${y} L 600 ${y} L 660 ${y + 30} L 140 ${y + 30} Z`}
              fill={l.color}
              opacity={l.primary ? 0.18 : 0.08}
              stroke={l.color}
              strokeWidth={l.primary ? 1.2 : 0.5}
            />
            {/* Side */}
            <path
              d={`M 200 ${y} L 140 ${y + 30} L 140 ${y + 50} L 200 ${y + 20} Z`}
              fill="url(#ls-side)"
              stroke={l.color}
              strokeWidth="0.4"
              opacity={l.primary ? 0.9 : 0.6}
            />
            {/* Top number badge */}
            <circle
              cx="180"
              cy={y + 15}
              r="11"
              fill="#0a0a12"
              stroke={l.color}
              strokeWidth={l.primary ? 1.5 : 0.8}
            />
            <text
              x="180"
              y={y + 19}
              textAnchor="middle"
              fill={l.color}
              fontSize="10"
              fontFamily="ui-monospace,monospace"
              fontWeight="700"
            >
              {l.n}
            </text>

            {/* Layer name */}
            <text
              x="220"
              y={y + 13}
              fill={l.primary ? '#fff' : '#cbd5e1'}
              fontSize="13"
              fontFamily="system-ui,sans-serif"
              fontWeight={l.primary ? '700' : '600'}
            >
              {l.name}
            </text>
            {/* Purpose */}
            <text
              x="220"
              y={y + 26}
              fill="#64748b"
              fontSize="9.5"
              fontFamily="system-ui,sans-serif"
            >
              {l.purpose}
            </text>

            {/* Status badge */}
            <rect
              x="540"
              y={y + 4}
              width="100"
              height="18"
              rx="9"
              fill="none"
              stroke={statusColor(l.status)}
              strokeWidth="0.5"
              opacity="0.6"
            />
            <text
              x="590"
              y={y + 16}
              textAnchor="middle"
              fill={statusColor(l.status)}
              fontSize="8"
              fontFamily="ui-monospace,monospace"
              letterSpacing="1"
            >
              {l.status.toUpperCase()}
            </text>

            {l.primary && (
              <text
                x="220"
                y={y + 50}
                fill="#10b981"
                fontSize="9"
                fontFamily="ui-monospace,monospace"
                letterSpacing="1.2"
                fontStyle="italic"
              >
                ◀ START HERE — ONE LAYER COMPOUNDS THE REST
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
