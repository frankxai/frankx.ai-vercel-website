'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  MousePointerClick,
  Sparkles,
  Layers,
  Zap,
  Code2,
  Eye,
  Copy,
  Check,
  Terminal,
  Palette,
  MonitorSmartphone,
  Accessibility,
  ChevronRight,
  Star,
  Users,
  Command,
  Music,
  BookOpen,
} from 'lucide-react'

// ── Pattern Category ──

type PatternCategory = 'interactions' | 'cards' | 'animations' | 'micro' | 'accessibility'

const categories: { key: PatternCategory; label: string; count: number }[] = [
  { key: 'interactions', label: 'Hover & Click', count: 4 },
  { key: 'cards', label: 'Card Patterns', count: 4 },
  { key: 'animations', label: 'Motion', count: 3 },
  { key: 'micro', label: 'Micro-Interactions', count: 4 },
  { key: 'accessibility', label: 'Accessibility', count: 3 },
]

// ── Code Block ──

function CodeBlock({ code, language = 'tsx' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <div className="relative rounded-xl bg-[#0d1117] border border-white/[0.06] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06]">
        <span className="text-[10px] text-white/30 font-mono">{language}</span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(code)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          }}
          className="flex items-center gap-1 text-[10px] text-white/40 hover:text-white/70 transition-colors"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 text-[11px] font-mono text-white/60 leading-relaxed overflow-x-auto whitespace-pre">
        {code}
      </pre>
    </div>
  )
}

// ── Pattern Wrapper ──

function PatternDemo({
  title,
  description,
  code,
  children,
}: {
  title: string
  description: string
  code: string
  children: React.ReactNode
}) {
  const [showCode, setShowCode] = useState(false)

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.01] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.04]">
        <div>
          <h3 className="text-sm font-semibold text-white/80">{title}</h3>
          <p className="text-[10px] text-white/30 mt-0.5">{description}</p>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setShowCode(false)}
            className={`p-1.5 rounded-md transition-colors ${!showCode ? 'bg-white/[0.06] text-white/60' : 'text-white/25 hover:text-white/50'}`}
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setShowCode(true)}
            className={`p-1.5 rounded-md transition-colors ${showCode ? 'bg-white/[0.06] text-white/60' : 'text-white/25 hover:text-white/50'}`}
          >
            <Code2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Content */}
      {showCode ? (
        <div className="p-0">
          <CodeBlock code={code} />
        </div>
      ) : (
        <div className="p-6 min-h-[180px] flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  )
}

// ── Pattern: Cursor-Following Glow ──

function CursorGlowDemo() {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    glowRef.current.style.background = `radial-gradient(400px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(171,71,199,0.15), transparent 40%)`
    glowRef.current.style.opacity = '1'
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = '0'
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[320px] p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] cursor-pointer transition-all hover:border-white/[0.15]"
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
      />
      <div className="relative z-10">
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-3">
          <Sparkles className="w-5 h-5 text-purple-400" />
        </div>
        <h4 className="text-sm font-semibold text-white/80 mb-1">Cursor-Following Glow</h4>
        <p className="text-xs text-white/40">Move your mouse over this card to see the glow follow your cursor.</p>
      </div>
    </div>
  )
}

// ── Pattern: Magnetic Button ──

function MagneticButtonDemo() {
  const btnRef = useRef<HTMLButtonElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (shouldReduceMotion || !btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15
    setOffset({ x, y })
  }, [shouldReduceMotion])

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      className="h-12 px-8 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#AB47C7] to-[#43BFE3] transition-transform duration-200"
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
    >
      Magnetic Effect
    </button>
  )
}

// ── Pattern: Tilt Card ──

function TiltCardDemo() {
  const cardRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const [transform, setTransform] = useState('')

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTransform(`perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`)
  }, [shouldReduceMotion])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTransform('')}
      className="w-full max-w-[280px] p-6 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] transition-transform duration-200"
      style={{ transform }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
          <Layers className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white/80">3D Tilt</h4>
          <p className="text-[10px] text-white/30">Perspective transform</p>
        </div>
      </div>
      <p className="text-xs text-white/40">Hover and move your mouse to see the 3D tilt effect in action.</p>
    </div>
  )
}

// ── Pattern: Shimmer Border ──

function ShimmerBorderDemo() {
  return (
    <div className="relative w-full max-w-[320px] p-[1px] rounded-2xl overflow-hidden group">
      {/* Animated border */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'conic-gradient(from var(--shimmer-angle, 0deg), transparent 60%, #AB47C7 70%, #43BFE3 80%, transparent 90%)',
          animation: 'shimmer-spin 3s linear infinite',
        }}
      />
      <style>{`
        @property --shimmer-angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
        @keyframes shimmer-spin { to { --shimmer-angle: 360deg; } }
      `}</style>
      <div className="relative rounded-2xl bg-[#0a0a0b] p-6">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3">
          <Zap className="w-5 h-5 text-emerald-400" />
        </div>
        <h4 className="text-sm font-semibold text-white/80 mb-1">Shimmer Border</h4>
        <p className="text-xs text-white/40">Animated conic gradient border using CSS @property for smooth rotation.</p>
      </div>
    </div>
  )
}

// ── Pattern: Stagger Grid ──

function StaggerGridDemo() {
  const [trigger, setTrigger] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  const items = [
    { icon: Star, label: 'Skills', count: '630+', color: '#AB47C7' },
    { icon: Users, label: 'Agents', count: '40+', color: '#43BFE3' },
    { icon: Command, label: 'Commands', count: '130+', color: '#10B981' },
    { icon: Music, label: 'Songs', count: '500+', color: '#F59E0B' },
    { icon: BookOpen, label: 'Articles', count: '70+', color: '#E040FB' },
    { icon: Code2, label: 'MCP Servers', count: '8', color: '#6366F1' },
  ]

  return (
    <div className="w-full">
      <button
        onClick={() => setTrigger(t => t + 1)}
        className="mb-4 px-4 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-white/50 hover:text-white/80 transition-colors"
      >
        Replay Animation
      </button>
      <div className="grid grid-cols-3 gap-3">
        {items.map((item, i) => (
          <motion.div
            key={`${item.label}-${trigger}`}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={shouldReduceMotion ? { duration: 0 } : {
              delay: i * 0.08,
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-center hover:border-white/[0.12] transition-colors"
          >
            <item.icon className="w-4 h-4 mx-auto mb-1.5" style={{ color: item.color }} />
            <p className="text-base font-bold text-white/80">{item.count}</p>
            <p className="text-[9px] text-white/30">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ── Pattern: Pulse Ring ──

function PulseRingDemo() {
  return (
    <div className="flex items-center gap-8">
      {/* Active pulse */}
      <div className="relative">
        <div className="w-3 h-3 rounded-full bg-emerald-400" />
        <div className="absolute inset-0 w-3 h-3 rounded-full bg-emerald-400 animate-ping opacity-75" />
        <span className="ml-5 text-xs text-white/50">Active</span>
      </div>

      {/* Processing pulse */}
      <div className="relative">
        <div className="w-3 h-3 rounded-full bg-amber-400" />
        <div className="absolute -inset-1 rounded-full border border-amber-400/30 animate-pulse" />
        <span className="ml-5 text-xs text-white/50">Processing</span>
      </div>

      {/* Glow breathe */}
      <div className="relative">
        <div className="w-3 h-3 rounded-full bg-purple-400" />
        <div
          className="absolute -inset-2 rounded-full bg-purple-400/20"
          style={{ animation: 'breathe 3s ease-in-out infinite' }}
        />
        <style>{`@keyframes breathe { 0%, 100% { transform: scale(1); opacity: 0.2; } 50% { transform: scale(1.5); opacity: 0.4; } }`}</style>
        <span className="ml-5 text-xs text-white/50">Breathe</span>
      </div>
    </div>
  )
}

// ── Pattern: Loading States ──

function LoadingStatesDemo() {
  return (
    <div className="flex items-center gap-8">
      {/* Skeleton */}
      <div className="space-y-2">
        <div className="h-3 w-32 rounded bg-white/[0.06] animate-pulse" />
        <div className="h-3 w-24 rounded bg-white/[0.04] animate-pulse" />
        <div className="h-3 w-28 rounded bg-white/[0.04] animate-pulse" />
        <p className="text-[9px] text-white/20 mt-2">Skeleton</p>
      </div>

      {/* Shimmer */}
      <div className="space-y-2">
        <div className="h-3 w-32 rounded bg-gradient-to-r from-white/[0.04] via-white/[0.08] to-white/[0.04] bg-[length:200%_100%]"
          style={{ animation: 'shimmer 1.5s ease-in-out infinite' }}
        />
        <div className="h-3 w-24 rounded bg-gradient-to-r from-white/[0.04] via-white/[0.08] to-white/[0.04] bg-[length:200%_100%]"
          style={{ animation: 'shimmer 1.5s ease-in-out infinite 0.1s' }}
        />
        <style>{`@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }`}</style>
        <p className="text-[9px] text-white/20 mt-2">Shimmer</p>
      </div>

      {/* Dots */}
      <div className="flex items-center gap-1">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-purple-400"
            style={{
              animation: 'bounce-dot 1.2s ease-in-out infinite',
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
        <style>{`@keyframes bounce-dot { 0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; } 40% { transform: scale(1); opacity: 1; } }`}</style>
        <p className="text-[9px] text-white/20 ml-2">Dots</p>
      </div>
    </div>
  )
}

// ── Pattern: Toggle Switch ──

function ToggleSwitchDemo() {
  const [enabled, setEnabled] = useState(false)

  return (
    <div className="flex items-center gap-4">
      <button
        role="switch"
        aria-checked={enabled}
        onClick={() => setEnabled(!enabled)}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#AB47C7] focus:ring-offset-2 focus:ring-offset-[#0a0a0b] ${
          enabled ? 'bg-purple-500' : 'bg-white/[0.10]'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
            enabled ? 'translate-x-5' : ''
          }`}
        />
      </button>
      <span className="text-xs text-white/50">
        {enabled ? 'Enabled' : 'Disabled'}
      </span>
      <span className="text-[9px] text-white/20">ARIA switch role + focus ring</span>
    </div>
  )
}

// ── Pattern: Focus Management ──

function FocusManagementDemo() {
  return (
    <div className="space-y-3 w-full max-w-[320px]">
      <p className="text-[10px] text-white/30 mb-2">Tab through these elements to see focus states:</p>
      <input
        type="text"
        placeholder="Text input"
        className="w-full h-11 px-4 rounded-lg bg-[#111113] border border-white/[0.08] text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#AB47C7] focus:ring-offset-2 focus:ring-offset-[#0a0a0b]"
      />
      <div className="flex gap-2">
        <button className="flex-1 h-10 rounded-lg bg-gradient-to-r from-[#AB47C7] to-[#43BFE3] text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-[#AB47C7] focus:ring-offset-2 focus:ring-offset-[#0a0a0b]">
          Primary
        </button>
        <button className="flex-1 h-10 rounded-lg bg-white/[0.06] border border-white/[0.10] text-sm text-white/70 focus:outline-none focus:ring-2 focus:ring-[#AB47C7] focus:ring-offset-2 focus:ring-offset-[#0a0a0b]">
          Secondary
        </button>
      </div>
      <a
        href="#"
        onClick={e => e.preventDefault()}
        className="inline-flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 focus:outline-none focus:ring-2 focus:ring-[#AB47C7] rounded"
      >
        Inline link <ChevronRight className="w-3 h-3" />
      </a>
    </div>
  )
}

// ── Pattern: Reduced Motion ──

function ReducedMotionDemo() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
        <div className={`w-2 h-2 rounded-full ${shouldReduceMotion ? 'bg-amber-400' : 'bg-emerald-400'}`} />
        <span className="text-xs text-white/60">
          prefers-reduced-motion: <strong className="text-white/80">{shouldReduceMotion ? 'reduce' : 'no-preference'}</strong>
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-12 h-12 mx-auto rounded-xl bg-purple-500/15 border border-purple-500/20 flex items-center justify-center mb-2"
          >
            <Sparkles className="w-5 h-5 text-purple-400" />
          </motion.div>
          <p className="text-[10px] text-white/30">Float animation</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 mx-auto rounded-xl bg-cyan-500/15 border border-cyan-500/20 flex items-center justify-center mb-2">
            <Zap className="w-5 h-5 text-cyan-400" />
          </div>
          <p className="text-[10px] text-white/30">Instant (reduced)</p>
        </div>
      </div>

      <CodeBlock
        language="tsx"
        code={`const shouldReduceMotion = useReducedMotion()

<motion.div
  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }}
/>`}
      />
    </div>
  )
}

// ── All Patterns ──

const allPatterns: {
  category: PatternCategory
  title: string
  description: string
  code: string
  render: () => React.ReactNode
}[] = [
  {
    category: 'interactions',
    title: 'Cursor-Following Glow',
    description: 'Radial gradient follows mouse position inside card',
    code: `const handleMouseMove = (e) => {
  const rect = cardRef.current.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  glowRef.current.style.background =
    \`radial-gradient(400px circle at \${x}px \${y}px,
     rgba(171,71,199,0.15), transparent 40%)\`
  glowRef.current.style.opacity = '1'
}`,
    render: () => <CursorGlowDemo />,
  },
  {
    category: 'interactions',
    title: 'Magnetic Button',
    description: 'Button subtly follows cursor within its bounds',
    code: `const handleMouseMove = (e) => {
  const rect = btnRef.current.getBoundingClientRect()
  const x = (e.clientX - rect.left - rect.width / 2) * 0.15
  const y = (e.clientY - rect.top - rect.height / 2) * 0.15
  setOffset({ x, y })
}

<button style={{ transform: \`translate(\${x}px, \${y}px)\` }}>
  Magnetic Effect
</button>`,
    render: () => <MagneticButtonDemo />,
  },
  {
    category: 'interactions',
    title: '3D Tilt Card',
    description: 'Perspective transforms based on cursor position',
    code: `const x = (e.clientX - rect.left) / rect.width - 0.5
const y = (e.clientY - rect.top) / rect.height - 0.5

style={{
  transform: \`perspective(600px)
    rotateY(\${x * 10}deg)
    rotateX(\${-y * 10}deg)\`
}}`,
    render: () => <TiltCardDemo />,
  },
  {
    category: 'cards',
    title: 'Shimmer Border',
    description: 'Animated conic gradient border using CSS @property',
    code: `@property --shimmer-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
@keyframes shimmer-spin {
  to { --shimmer-angle: 360deg; }
}

background: conic-gradient(
  from var(--shimmer-angle),
  transparent 60%,
  #AB47C7 70%, #43BFE3 80%,
  transparent 90%
);`,
    render: () => <ShimmerBorderDemo />,
  },
  {
    category: 'animations',
    title: 'Stagger Grid',
    description: 'Sequential entrance animation with configurable delay',
    code: `items.map((item, i) => (
  <motion.div
    initial={{ opacity: 0, y: 16, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{
      delay: i * 0.08,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1], // custom bezier
    }}
  />
))`,
    render: () => <StaggerGridDemo />,
  },
  {
    category: 'micro',
    title: 'Pulse Indicators',
    description: 'Status indicators with pulse, ping, and breathe effects',
    code: `/* Ping */
<div className="animate-ping" />

/* Breathe */
@keyframes breathe {
  0%, 100% { transform: scale(1); opacity: 0.2; }
  50% { transform: scale(1.5); opacity: 0.4; }
}`,
    render: () => <PulseRingDemo />,
  },
  {
    category: 'micro',
    title: 'Loading States',
    description: 'Skeleton, shimmer, and dot loading patterns',
    code: `/* Shimmer gradient */
background: linear-gradient(
  90deg,
  rgba(255,255,255,0.04) 0%,
  rgba(255,255,255,0.08) 50%,
  rgba(255,255,255,0.04) 100%
);
background-size: 200% 100%;
animation: shimmer 1.5s ease-in-out infinite;`,
    render: () => <LoadingStatesDemo />,
  },
  {
    category: 'micro',
    title: 'Toggle Switch',
    description: 'Accessible toggle with ARIA switch role and focus ring',
    code: `<button
  role="switch"
  aria-checked={enabled}
  onClick={() => setEnabled(!enabled)}
  className="focus:ring-2 focus:ring-[#AB47C7]
    focus:ring-offset-2 focus:ring-offset-[#0a0a0b]"
>
  <span className={enabled ? 'translate-x-5' : ''} />
</button>`,
    render: () => <ToggleSwitchDemo />,
  },
  {
    category: 'accessibility',
    title: 'Focus Management',
    description: 'Consistent focus rings using purple outline on all interactive elements',
    code: `/* Universal focus style */
focus:outline-none
focus:ring-2
focus:ring-[#AB47C7]
focus:ring-offset-2
focus:ring-offset-[#0a0a0b]

/* Maps to: */
outline: 2px solid #AB47C7;
outline-offset: 2px;`,
    render: () => <FocusManagementDemo />,
  },
  {
    category: 'accessibility',
    title: 'Reduced Motion',
    description: 'All animations respect prefers-reduced-motion media query',
    code: `import { useReducedMotion } from 'framer-motion'

const shouldReduceMotion = useReducedMotion()

// Skip initial animation entirely
initial={shouldReduceMotion ? false : { opacity: 0 }}

// Zero-duration transitions
transition={shouldReduceMotion
  ? { duration: 0 }
  : { duration: 0.6 }}`,
    render: () => <ReducedMotionDemo />,
  },
]

// ── Main Page ──

export default function FrontendDesignPage() {
  const shouldReduceMotion = useReducedMotion()
  const [activeCategory, setActiveCategory] = useState<PatternCategory | 'all'>('all')

  const filtered = activeCategory === 'all'
    ? allPatterns
    : allPatterns.filter(p => p.category === activeCategory)

  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#0a0a0b]" />
        <div
          className="absolute top-1/4 left-0 w-[50%] h-[50%]"
          style={{ background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.03) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-[50%] h-[40%]"
          style={{ background: 'radial-gradient(ellipse at center, rgba(224,64,251,0.03) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="pt-24 pb-4">
          <Link
            href="/design-lab"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Design Lab
          </Link>
        </div>

        {/* Hero */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }}
          className="pb-12"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <MousePointerClick className="w-3 h-3 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">Pattern Library</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-[1.1]">
            Frontend
            <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Design Patterns
            </span>
          </h1>

          <p className="text-lg text-white/50 max-w-2xl leading-relaxed mb-8">
            Interactive component patterns used across frankx.ai. Every demo includes the source
            code — toggle between preview and code with the buttons on each card.
          </p>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                activeCategory === 'all'
                  ? 'bg-white text-black'
                  : 'bg-white/[0.04] text-white/40 border border-white/[0.06] hover:text-white/70'
              }`}
            >
              All ({allPatterns.length})
            </button>
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === cat.key
                    ? 'bg-white text-black'
                    : 'bg-white/[0.04] text-white/40 border border-white/[0.06] hover:text-white/70'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        </motion.div>

        {/* Patterns Grid */}
        <div className="grid md:grid-cols-2 gap-6 pb-16">
          {filtered.map((pattern, i) => (
            <motion.div
              key={pattern.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: Math.min(i * 0.06, 0.3) }}
            >
              <PatternDemo
                title={pattern.title}
                description={pattern.description}
                code={pattern.code}
              >
                {pattern.render()}
              </PatternDemo>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="pb-20 pt-4 text-center">
          <p className="text-white/30 text-sm mb-4">
            Every pattern follows the FrankX design system: dark-first, glass layers, purple focus rings, reduced-motion support.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/design-lab/design-excellence"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-sm text-white/60 hover:text-white/90 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Design Excellence
            </Link>
            <Link
              href="/design-lab"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400 hover:bg-emerald-500/20 transition-all"
            >
              Design Lab
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
