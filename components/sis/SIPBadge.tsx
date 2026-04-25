// "Built on SIP" attestation badge — a small mark for the page footer + reuse anywhere.
// Inspired by official seals but tech-modern: hexagonal, mint-on-dark, with rotating outer ring.

export default function SIPBadge({ size = 88, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label="Built on SIP — Starlight Intelligence Protocol v1.1.0"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="sip-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <radialGradient id="sip-fill" cx="0.5" cy="0.5" r="0.6">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>
      </defs>

      {/* Outer ring — dotted */}
      <circle cx="60" cy="60" r="56" fill="none" stroke="#10b981" strokeWidth="0.4" strokeDasharray="2 3" opacity="0.5" />

      {/* Hex shape */}
      <path
        d="M 60 12 L 102 36 L 102 84 L 60 108 L 18 84 L 18 36 Z"
        fill="url(#sip-fill)"
        stroke="url(#sip-edge)"
        strokeWidth="1.2"
      />

      {/* Inner hex accent */}
      <path
        d="M 60 22 L 92 40 L 92 80 L 60 98 L 28 80 L 28 40 Z"
        fill="none"
        stroke="#10b981"
        strokeWidth="0.4"
        opacity="0.4"
      />

      {/* SIP wordmark */}
      <text
        x="60"
        y="58"
        textAnchor="middle"
        fill="#a7f3d0"
        fontSize="20"
        fontFamily="ui-monospace,monospace"
        fontWeight="700"
        letterSpacing="3"
      >
        SIP
      </text>

      {/* Version */}
      <text
        x="60"
        y="73"
        textAnchor="middle"
        fill="#22d3ee"
        fontSize="7"
        fontFamily="ui-monospace,monospace"
        letterSpacing="1.5"
      >
        v1.1.0
      </text>

      {/* Tag line */}
      <text
        x="60"
        y="86"
        textAnchor="middle"
        fill="#475569"
        fontSize="5.5"
        fontFamily="ui-monospace,monospace"
        letterSpacing="2"
      >
        BUILT ON
      </text>
    </svg>
  )
}
