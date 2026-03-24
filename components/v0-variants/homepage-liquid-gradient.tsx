// v0 Homepage component: liquid-gradient
// Chat: kp1UCsrMJI8

'use client'

export function LiquidGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated SVG gradient background */}
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#AB47C7" stopOpacity="0.8">
              <animate
                attributeName="stop-color"
                values="#AB47C7; #43BFE3; #0F172A; #AB47C7"
                dur="20s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="#43BFE3" stopOpacity="0.6">
              <animate
                attributeName="stop-color"
                values="#43BFE3; #0F172A; #AB47C7; #43BFE3"
                dur="20s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0.9">
              <animate
                attributeName="stop-color"
                values="#0F172A; #AB47C7; #43BFE3; #0F172A"
                dur="20s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
          
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
          </filter>
        </defs>
        
        <rect width="100%" height="100%" fill="url(#gradient1)" />
        
        {/* Animated circles creating liquid effect */}
        <g filter="url(#goo)">
          <circle cx="20%" cy="40%" r="200" fill="#AB47C7" opacity="0.4">
            <animate
              attributeName="cx"
              values="20%; 80%; 20%"
              dur="25s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values="40%; 60%; 40%"
              dur="30s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="200; 250; 200"
              dur="20s"
              repeatCount="indefinite"
            />
          </circle>
          
          <circle cx="80%" cy="60%" r="250" fill="#43BFE3" opacity="0.3">
            <animate
              attributeName="cx"
              values="80%; 20%; 80%"
              dur="30s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values="60%; 30%; 60%"
              dur="25s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="250; 200; 250"
              dur="22s"
              repeatCount="indefinite"
            />
          </circle>
          
          <circle cx="50%" cy="50%" r="180" fill="#0F172A" opacity="0.5">
            <animate
              attributeName="cx"
              values="50%; 30%; 70%; 50%"
              dur="35s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values="50%; 70%; 30%; 50%"
              dur="28s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="180; 220; 180"
              dur="24s"
              repeatCount="indefinite"
            />
          </circle>
          
          <circle cx="40%" cy="20%" r="150" fill="#AB47C7" opacity="0.35">
            <animate
              attributeName="cx"
              values="40%; 60%; 40%"
              dur="32s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values="20%; 80%; 20%"
              dur="27s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="150; 200; 150"
              dur="26s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
      
      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/40 via-transparent to-[#0a0a0b]/60" />
      
      {/* Noise texture for premium feel */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
