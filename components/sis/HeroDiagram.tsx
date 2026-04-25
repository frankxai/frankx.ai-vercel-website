// Hero infographic for /starlight-intelligence-system.
// Left: scattered fragments (15 years of Canva exports, Drive folders, Notion pages).
// Right: 9-layer architecture, illuminated. Bridge between them: the substrate.

export default function HeroDiagram({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 540"
      className={className}
      role="img"
      aria-labelledby="hero-diagram-title hero-diagram-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="hero-diagram-title">Scattered genius becomes architected sovereignty</title>
      <desc id="hero-diagram-desc">
        Left side shows 14 scattered file fragments representing fragmented expertise. Right side shows
        9 stacked translucent layers representing the Starlight Intelligence System architecture, with
        Genius IS glowing at the foundation. A gradient bridge connects them through a central node.
      </desc>

      <defs>
        <linearGradient id="hero-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#030712" />
          <stop offset="100%" stopColor="#0a0a12" />
        </linearGradient>
        <linearGradient id="hero-bridge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#475569" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id="hero-arch-glow" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="hero-fragment" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#475569" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#1e293b" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="hero-genius-glow" cx="0.5" cy="1" r="0.8">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.7" />
          <stop offset="60%" stopColor="#10b981" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </radialGradient>
        <filter id="hero-soft-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* Background */}
      <rect width="1200" height="540" fill="url(#hero-bg)" rx="16" />

      {/* LEFT SIDE — scattered fragments */}
      <g opacity="0.95">
        {/* Cluster header label */}
        <text x="60" y="50" fill="#64748b" fontSize="11" fontFamily="ui-monospace,monospace" letterSpacing="2">
          BEFORE — SCATTERED
        </text>

        {/* 14 misaligned cards representing scattered files */}
        {[
          { x: 60, y: 90, w: 90, h: 60, r: -8, label: '.canva' },
          { x: 175, y: 75, w: 80, h: 100, r: 12, label: 'drive/' },
          { x: 290, y: 115, w: 100, h: 70, r: -3, label: '.notion' },
          { x: 70, y: 175, w: 110, h: 55, r: 5, label: '2023/' },
          { x: 210, y: 205, w: 70, h: 90, r: -15, label: '.png' },
          { x: 310, y: 215, w: 90, h: 70, r: 8, label: 'old/' },
          { x: 90, y: 250, w: 75, h: 80, r: -10, label: 'frames' },
          { x: 195, y: 320, w: 100, h: 60, r: 4, label: 'screen' },
          { x: 320, y: 330, w: 80, h: 70, r: -7, label: 'voice' },
          { x: 50, y: 360, w: 95, h: 65, r: 14, label: 'v2-fix' },
          { x: 165, y: 410, w: 110, h: 55, r: -4, label: 'final-v3' },
          { x: 295, y: 425, w: 80, h: 60, r: 9, label: 'misc' },
          { x: 75, y: 455, w: 85, h: 55, r: -12, label: '.pdf' },
          { x: 220, y: 480, w: 100, h: 45, r: 6, label: 'temp' },
        ].map((f, i) => (
          <g key={i} transform={`rotate(${f.r} ${f.x + f.w / 2} ${f.y + f.h / 2})`}>
            <rect
              x={f.x}
              y={f.y}
              width={f.w}
              height={f.h}
              rx="4"
              fill="url(#hero-fragment)"
              stroke="#334155"
              strokeWidth="0.5"
              opacity="0.75"
            />
            <text
              x={f.x + 8}
              y={f.y + 16}
              fill="#64748b"
              fontSize="8"
              fontFamily="ui-monospace,monospace"
            >
              {f.label}
            </text>
            {/* file icon line */}
            <line
              x1={f.x + 8}
              y1={f.y + 24}
              x2={f.x + f.w - 12}
              y2={f.y + 24}
              stroke="#334155"
              strokeWidth="0.5"
            />
            <line
              x1={f.x + 8}
              y1={f.y + 32}
              x2={f.x + f.w - 24}
              y2={f.y + 32}
              stroke="#334155"
              strokeWidth="0.5"
            />
          </g>
        ))}
      </g>

      {/* CENTER BRIDGE — the substrate */}
      <g>
        {/* The flowing bridge */}
        <path
          d="M 420 270 Q 540 200, 600 270 T 780 270"
          stroke="url(#hero-bridge)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 420 270 Q 540 340, 600 270 T 780 270"
          stroke="url(#hero-bridge)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.5"
        />
        {/* Central node */}
        <circle cx="600" cy="270" r="28" fill="#0a0a12" stroke="url(#hero-bridge)" strokeWidth="1.5" />
        <circle cx="600" cy="270" r="20" fill="none" stroke="#10b981" strokeWidth="0.5" opacity="0.6" />
        <text
          x="600"
          y="266"
          textAnchor="middle"
          fill="#a7f3d0"
          fontSize="9"
          fontFamily="ui-monospace,monospace"
          letterSpacing="1.2"
        >
          SIP
        </text>
        <text
          x="600"
          y="280"
          textAnchor="middle"
          fill="#64748b"
          fontSize="6.5"
          fontFamily="ui-monospace,monospace"
        >
          v1.1.0
        </text>

        {/* Particles flowing through */}
        {[440, 470, 500, 700, 730, 760].map((x, i) => (
          <circle key={i} cx={x} cy="270" r="1.5" fill="#22d3ee" opacity={0.6 - i * 0.07} />
        ))}
      </g>

      {/* RIGHT SIDE — 9-layer architecture, isometric stack */}
      <g transform="translate(820 60)">
        <text
          x="-10"
          y="-10"
          fill="#a7f3d0"
          fontSize="11"
          fontFamily="ui-monospace,monospace"
          letterSpacing="2"
        >
          AFTER — ARCHITECTED
        </text>

        {/* Foundation glow */}
        <ellipse cx="180" cy="430" rx="200" ry="40" fill="url(#hero-genius-glow)" filter="url(#hero-soft-glow)" />

        {/* 9 layers — bottom (Genius) is most luminous */}
        {[
          { name: 'Spiritual', y: 0, opacity: 0.18 },
          { name: 'Relational', y: 38, opacity: 0.24 },
          { name: 'Health', y: 76, opacity: 0.3 },
          { name: 'Wealth / Freedom', y: 114, opacity: 0.36 },
          { name: 'Creator', y: 152, opacity: 0.44 },
          { name: 'Business', y: 190, opacity: 0.52 },
          { name: 'Vision / Brand', y: 228, opacity: 0.6 },
          { name: 'Second Brain', y: 266, opacity: 0.7 },
          { name: 'Genius', y: 304, opacity: 1, primary: true },
        ].map((layer) => (
          <g key={layer.name} transform={`translate(0 ${layer.y})`}>
            <path
              d={`M 30 100 L 330 100 L 360 116 L 60 116 Z`}
              fill={layer.primary ? '#10b981' : '#1e293b'}
              opacity={layer.opacity}
              stroke={layer.primary ? '#34d399' : '#334155'}
              strokeWidth={layer.primary ? '1' : '0.5'}
            />
            <path
              d={`M 30 100 L 60 116 L 60 130 L 30 114 Z`}
              fill={layer.primary ? '#059669' : '#0f172a'}
              opacity={layer.opacity}
            />
            <text
              x="48"
              y="113"
              fill={layer.primary ? '#a7f3d0' : '#64748b'}
              fontSize="8.5"
              fontFamily="ui-monospace,monospace"
              fontWeight={layer.primary ? '700' : '400'}
              letterSpacing="0.5"
            >
              {layer.name}{layer.primary ? ' ◀ start here' : ''}
            </text>
          </g>
        ))}
      </g>
    </svg>
  )
}
