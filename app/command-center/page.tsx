'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield,
  Lock,
  Activity,
  Server,
  Mail,
  DollarSign,
  Brain,
  Workflow,
  Globe,
  Github,
  Coins,
  FileText,
  Music,
  Newspaper,
  Share2,
  BookOpen,
  Terminal,
  Bot,
  Plug,
  Briefcase,
  BarChart3,
  Zap,
  PenTool,
  Send,
  LineChart,
  Rocket,
  Heart,
  LayoutDashboard,
  ChevronRight,
  CheckSquare,
  Square,
  Clock,
  ArrowUpRight,
  X,
  Eye,
} from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'

// ── Types ────────────────────────────────────────────────────────────────────

interface MindMapNode {
  id: string
  label: string
  color: string
  colorClass: string
  icon: React.ReactNode
  children: {
    label: string
    value: string
    icon: React.ReactNode
  }[]
}

interface TodoItem {
  id: string
  text: string
  done: boolean
}

interface ActivityItem {
  text: string
  time: string
  status: 'success' | 'info' | 'warning'
}

// ── Constants ────────────────────────────────────────────────────────────────

const STATUS_CARDS = [
  {
    label: 'frankx.ai',
    icon: <Globe className="w-5 h-5" />,
    status: 'online' as const,
    lastCheck: 'Just now',
  },
  {
    label: 'n8n',
    icon: <Workflow className="w-5 h-5" />,
    status: 'online' as const,
    lastCheck: '2m ago',
  },
  {
    label: 'Resend',
    icon: <Mail className="w-5 h-5" />,
    status: 'configured' as const,
    lastCheck: 'Active',
  },
  {
    label: 'Revenue',
    icon: <DollarSign className="w-5 h-5" />,
    status: 'pending' as const,
    lastCheck: '$0',
  },
]

const MIND_MAP_NODES: MindMapNode[] = [
  {
    id: 'claude-code',
    label: 'Claude Code',
    color: '#8B5CF6',
    colorClass: 'border-violet-500/60',
    icon: <Brain className="w-5 h-5" />,
    children: [
      { label: 'Skills', value: '500+', icon: <Zap className="w-4 h-4" /> },
      { label: 'Commands', value: '40+', icon: <Terminal className="w-4 h-4" /> },
      { label: 'Agents', value: '12', icon: <Bot className="w-4 h-4" /> },
      { label: 'MCP Servers', value: '21', icon: <Plug className="w-4 h-4" /> },
    ],
  },
  {
    id: 'n8n',
    label: 'n8n',
    color: '#06B6D4',
    colorClass: 'border-cyan-500/60',
    icon: <Workflow className="w-5 h-5" />,
    children: [
      { label: 'Daily Briefs', value: '6', icon: <Newspaper className="w-4 h-4" /> },
      { label: 'Content Pipeline', value: '3', icon: <FileText className="w-4 h-4" /> },
      { label: 'Business', value: '4', icon: <Briefcase className="w-4 h-4" /> },
      { label: 'Swarms', value: '1', icon: <Bot className="w-4 h-4" /> },
    ],
  },
  {
    id: 'website',
    label: 'frankx.ai',
    color: '#10B981',
    colorClass: 'border-emerald-500/60',
    icon: <Globe className="w-5 h-5" />,
    children: [
      { label: 'Pages', value: '244', icon: <FileText className="w-4 h-4" /> },
      { label: 'Blog', value: '90+', icon: <PenTool className="w-4 h-4" /> },
      { label: 'Products', value: '5', icon: <BarChart3 className="w-4 h-4" /> },
      { label: 'Workshops', value: '3', icon: <BookOpen className="w-4 h-4" /> },
    ],
  },
  {
    id: 'github',
    label: 'GitHub',
    color: '#E2E8F0',
    colorClass: 'border-white/40',
    icon: <Github className="w-5 h-5" />,
    children: [
      { label: 'Repos', value: '100+', icon: <Github className="w-4 h-4" /> },
      { label: 'Active', value: '12', icon: <Activity className="w-4 h-4" /> },
      { label: 'Arcanea', value: '21', icon: <BookOpen className="w-4 h-4" /> },
    ],
  },
  {
    id: 'revenue',
    label: 'Revenue',
    color: '#F59E0B',
    colorClass: 'border-amber-500/60',
    icon: <Coins className="w-5 h-5" />,
    children: [
      { label: 'Stripe', value: 'Not connected', icon: <DollarSign className="w-4 h-4" /> },
      { label: 'Whop', value: 'Planned', icon: <Coins className="w-4 h-4" /> },
      { label: 'Products', value: '$0', icon: <BarChart3 className="w-4 h-4" /> },
    ],
  },
  {
    id: 'content',
    label: 'Content',
    color: '#F43F5E',
    colorClass: 'border-rose-500/60',
    icon: <FileText className="w-5 h-5" />,
    children: [
      { label: 'Books', value: '23', icon: <BookOpen className="w-4 h-4" /> },
      { label: 'Music', value: '65 tracks', icon: <Music className="w-4 h-4" /> },
      { label: 'Newsletter', value: 'Active', icon: <Newspaper className="w-4 h-4" /> },
      { label: 'Social', value: 'Multi-platform', icon: <Share2 className="w-4 h-4" /> },
    ],
  },
]

const QUICK_ACTIONS = [
  [
    { label: 'Generate Social', icon: <Share2 className="w-4 h-4" />, href: '/generate-social', color: 'violet' },
    { label: 'Write Blog', icon: <PenTool className="w-4 h-4" />, href: '/admin/content', color: 'emerald' },
    { label: 'Send Newsletter', icon: <Send className="w-4 h-4" />, href: 'https://n8n.frankx.ai', color: 'cyan', external: true },
    { label: 'Check Analytics', icon: <LineChart className="w-4 h-4" />, href: 'https://vercel.com/frankxai', color: 'amber', external: true },
  ],
  [
    { label: 'Content Atomizer', icon: <Zap className="w-4 h-4" />, href: 'https://n8n.frankx.ai', color: 'rose', external: true },
    { label: 'Deploy Production', icon: <Rocket className="w-4 h-4" />, href: 'https://vercel.com/frankxai', color: 'emerald', external: true },
    { label: 'n8n Health', icon: <Heart className="w-4 h-4" />, href: 'https://railway.com', color: 'cyan', external: true },
    { label: 'Admin Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, href: '/admin/map', color: 'violet' },
  ],
]

const ACTIVITY_FEED: ActivityItem[] = [
  { text: 'Content Atomizer: SUCCESS -- Claude Sonnet 4 via OpenRouter (11.6s)', time: '2h ago', status: 'success' },
  { text: 'Email Nurture: Day 2 sent to Frank (0.6s)', time: '5h ago', status: 'success' },
  { text: '8 n8n workflows fixed -- DeepSeek to Gemini Flash', time: '1d ago', status: 'info' },
  { text: 'Intelligence Map page shipped', time: '2d ago', status: 'info' },
  { text: 'AI Evolution research page shipped', time: '3d ago', status: 'info' },
]

const DEFAULT_TODOS: TodoItem[] = [
  { id: '1', text: 'Add Stripe API keys', done: false },
  { id: '2', text: 'Activate n8n Creator Swarm', done: false },
  { id: '3', text: 'Create Discord server', done: false },
  { id: '4', text: 'Launch first $9 prompt pack', done: false },
  { id: '5', text: 'Write "AI Creator OS" course Module 1', done: false },
]

// ── Auth Gate ────────────────────────────────────────────────────────────────

function AuthGate({ onAuth }: { onAuth: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        const data = await res.json()
        localStorage.setItem('admin_token', data.token)
        onAuth()
      } else {
        setError('Invalid password')
      }
    } catch {
      setError('Connection error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <GlowCard color="violet">
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
              <Shield className="w-8 h-8 text-violet-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Command Center</h1>
            <p className="text-white/40 text-sm mb-8">Private access required</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/25 transition-all"
                  autoFocus
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={loading || !password}
                className="w-full py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all"
              >
                {loading ? 'Verifying...' : 'Access Command Center'}
              </button>
            </form>
          </div>
        </GlowCard>
      </motion.div>
    </div>
  )
}

// ── Status Bar ───────────────────────────────────────────────────────────────

function StatusBar() {
  const statusColor = {
    online: 'bg-emerald-400',
    configured: 'bg-cyan-400',
    pending: 'bg-amber-400',
    offline: 'bg-red-400',
  }

  const statusLabel = {
    online: 'Online',
    configured: 'Configured',
    pending: '$0',
    offline: 'Offline',
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {STATUS_CARDS.map((card) => (
        <GlowCard
          key={card.label}
          color={card.status === 'online' ? 'emerald' : card.status === 'configured' ? 'cyan' : 'amber'}
        >
          <div className="p-4 flex items-center gap-3">
            <div className="text-white/60">{card.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{card.label}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className={`w-2 h-2 rounded-full ${statusColor[card.status]}`} />
                <span className="text-xs text-white/40">{statusLabel[card.status]}</span>
              </div>
            </div>
            <span className="text-[10px] text-white/20">{card.lastCheck}</span>
          </div>
        </GlowCard>
      ))}
    </div>
  )
}

// ── Mind Map ─────────────────────────────────────────────────────────────────

function MindMapNode({
  node,
  expanded,
  onToggle,
  position,
}: {
  node: MindMapNode
  expanded: boolean
  onToggle: () => void
  position: { x: number; y: number }
}) {
  return (
    <motion.div
      className="absolute"
      style={{ left: position.x, top: position.y }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Connection line to center */}
      <svg
        className="absolute pointer-events-none"
        style={{
          left: '50%',
          top: '50%',
          width: 1,
          height: 1,
          overflow: 'visible',
        }}
      >
        <line
          x1="0"
          y1="0"
          x2={-position.x + 600 - 80}
          y2={-position.y + 320 - 30}
          stroke={node.color}
          strokeOpacity="0.15"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
      </svg>

      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className={`relative z-10 px-5 py-3 rounded-2xl border-2 ${node.colorClass} bg-white/[0.03] backdrop-blur-sm cursor-pointer transition-all hover:bg-white/[0.06] min-w-[140px]`}
        style={{
          boxShadow: expanded
            ? `0 0 30px ${node.color}20, 0 0 60px ${node.color}10`
            : `0 0 15px ${node.color}10`,
        }}
      >
        <div className="flex items-center gap-2">
          <span style={{ color: node.color }}>{node.icon}</span>
          <span className="text-white font-semibold text-sm">{node.label}</span>
          <ChevronRight
            className={`w-3.5 h-3.5 text-white/30 transition-transform ${expanded ? 'rotate-90' : ''}`}
          />
        </div>
      </motion.button>

      {/* Expanded children */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            className="mt-2 space-y-1 overflow-hidden"
          >
            {node.children.map((child, i) => (
              <motion.div
                key={child.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${node.colorClass} bg-white/[0.02] text-sm`}
              >
                <span style={{ color: node.color }} className="opacity-60">
                  {child.icon}
                </span>
                <span className="text-white/70 flex-1">{child.label}</span>
                <span className="text-white/40 text-xs font-mono">{child.value}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function MindMap() {
  const [expanded, setExpanded] = useState<string | null>(null)

  // Position nodes in a radial layout around center
  const positions = [
    { x: 180, y: 60 },   // Claude Code — top left
    { x: 820, y: 60 },   // n8n — top right
    { x: 100, y: 280 },  // frankx.ai — middle left
    { x: 880, y: 280 },  // GitHub — middle right
    { x: 180, y: 500 },  // Revenue — bottom left
    { x: 820, y: 500 },  // Content — bottom right
  ]

  return (
    <GlowCard color="violet">
      <div className="p-4 md:p-6">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Eye className="w-5 h-5 text-violet-400" />
          The Graph
        </h2>

        <div className="relative overflow-auto rounded-2xl bg-white/[0.01] border border-white/[0.04]" style={{ minHeight: 700 }}>
          <div className="relative" style={{ width: 1200, height: 700, minWidth: 1200 }}>
            {/* Center node */}
            <div className="absolute" style={{ left: 520, top: 280 }}>
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 30px rgba(139, 92, 246, 0.3), 0 0 60px rgba(139, 92, 246, 0.15)',
                    '0 0 40px rgba(139, 92, 246, 0.4), 0 0 80px rgba(139, 92, 246, 0.2)',
                    '0 0 30px rgba(139, 92, 246, 0.3), 0 0 60px rgba(139, 92, 246, 0.15)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="px-8 py-5 rounded-3xl border-2 border-violet-500/50 bg-violet-500/10 backdrop-blur-sm"
              >
                <p className="text-violet-300 font-bold text-xl tracking-wide">FrankX</p>
                <p className="text-violet-400/40 text-xs mt-0.5">Nerve Center</p>
              </motion.div>
            </div>

            {/* Branch nodes */}
            {MIND_MAP_NODES.map((node, i) => (
              <MindMapNode
                key={node.id}
                node={node}
                expanded={expanded === node.id}
                onToggle={() => setExpanded(expanded === node.id ? null : node.id)}
                position={positions[i]}
              />
            ))}
          </div>
        </div>
      </div>
    </GlowCard>
  )
}

// ── Quick Actions ────────────────────────────────────────────────────────────

const ACTION_COLORS: Record<string, string> = {
  violet: 'border-violet-500/30 hover:border-violet-500/50 text-violet-400',
  emerald: 'border-emerald-500/30 hover:border-emerald-500/50 text-emerald-400',
  cyan: 'border-cyan-500/30 hover:border-cyan-500/50 text-cyan-400',
  amber: 'border-amber-500/30 hover:border-amber-500/50 text-amber-400',
  rose: 'border-rose-500/30 hover:border-rose-500/50 text-rose-400',
}

function QuickActions() {
  return (
    <GlowCard color="cyan">
      <div className="p-4 md:p-6">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-cyan-400" />
          Quick Actions
        </h2>
        <div className="space-y-3">
          {QUICK_ACTIONS.map((row, ri) => (
            <div key={ri} className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {row.map((action) => {
                const colorClass = ACTION_COLORS[action.color] || ACTION_COLORS.violet
                const isExternal = 'external' in action && action.external

                return (
                  <a
                    key={action.label}
                    href={action.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border bg-white/[0.02] backdrop-blur-sm transition-all hover:bg-white/[0.05] ${colorClass}`}
                  >
                    {action.icon}
                    <span className="text-sm text-white/80 flex-1">{action.label}</span>
                    {isExternal && <ArrowUpRight className="w-3 h-3 text-white/20" />}
                  </a>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </GlowCard>
  )
}

// ── Activity Feed ────────────────────────────────────────────────────────────

function ActivityFeed() {
  const statusIcons = {
    success: <Activity className="w-4 h-4 text-emerald-400" />,
    info: <Activity className="w-4 h-4 text-cyan-400" />,
    warning: <Activity className="w-4 h-4 text-amber-400" />,
  }

  return (
    <GlowCard color="emerald">
      <div className="p-4 md:p-6">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-400" />
          Activity Feed
        </h2>
        <div className="space-y-2">
          {ACTIVITY_FEED.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-3 px-3 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]"
            >
              <div className="mt-0.5">{statusIcons[item.status]}</div>
              <p className="text-sm text-white/60 flex-1 leading-relaxed">{item.text}</p>
              <span className="text-[10px] text-white/20 whitespace-nowrap flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {item.time}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </GlowCard>
  )
}

// ── Priorities Checklist ─────────────────────────────────────────────────────

function Priorities() {
  const [todos, setTodos] = useState<TodoItem[]>(DEFAULT_TODOS)

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('cc_priorities')
    if (saved) {
      try {
        setTodos(JSON.parse(saved))
      } catch {
        // Use defaults
      }
    }
  }, [])

  // Save to localStorage
  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) => {
      const next = prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
      localStorage.setItem('cc_priorities', JSON.stringify(next))
      return next
    })
  }, [])

  const completedCount = todos.filter((t) => t.done).length

  return (
    <GlowCard color="amber">
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-amber-400" />
            This Week
          </h2>
          <span className="text-xs text-white/30 font-mono">
            {completedCount}/{todos.length}
          </span>
        </div>

        <div className="space-y-1.5">
          {todos.map((todo) => (
            <button
              key={todo.id}
              onClick={() => toggleTodo(todo.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-all text-left"
            >
              {todo.done ? (
                <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Square className="w-4 h-4 text-white/20 shrink-0" />
              )}
              <span
                className={`text-sm flex-1 ${
                  todo.done ? 'text-white/30 line-through' : 'text-white/70'
                }`}
              >
                {todo.text}
              </span>
            </button>
          ))}
        </div>
      </div>
    </GlowCard>
  )
}

// ── Main Dashboard ───────────────────────────────────────────────────────────

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0b]/80 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-500/15 border border-violet-500/25 flex items-center justify-center">
              <Server className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Command Center</h1>
              <p className="text-[11px] text-white/25 -mt-0.5">FrankX Nerve Center</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/20 font-mono hidden md:block">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <button
              onClick={() => {
                localStorage.removeItem('admin_token')
                window.location.reload()
              }}
              className="px-3 py-1.5 text-xs text-white/30 hover:text-white/60 border border-white/[0.06] hover:border-white/[0.12] rounded-lg transition-all"
            >
              Lock
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 md:px-8 py-6 space-y-6">
        {/* Section 1: Status Bar */}
        <StatusBar />

        {/* Section 2: The Graph — Hero Section */}
        <MindMap />

        {/* Section 3 + 4 + 5: Three columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <QuickActions />
            <ActivityFeed />
          </div>
          <div>
            <Priorities />
          </div>
        </div>
      </main>
    </div>
  )
}

// ── Page Root ────────────────────────────────────────────────────────────────

export default function CommandCenterPage() {
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (token) {
      setAuthed(true)
    }
    setChecking(false)
  }, [])

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-8 h-8 rounded-full border-2 border-violet-500/30"
        />
      </div>
    )
  }

  if (!authed) {
    return <AuthGate onAuth={() => setAuthed(true)} />
  }

  return <Dashboard />
}
