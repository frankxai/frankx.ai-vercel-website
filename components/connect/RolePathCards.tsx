'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  Handshake,
  Network,
  Music4,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

type Accent = 'cyan' | 'emerald' | 'violet' | 'amber'

interface RolePath {
  id: 'investor' | 'partner' | 'client' | 'creator'
  label: string
  title: string
  subtitle: string
  href: string
  icon: LucideIcon
  accent: Accent
}

const PATHS: RolePath[] = [
  {
    id: 'investor',
    label: 'Investor',
    title: 'Deal intelligence & portfolio access',
    subtitle: 'AI agents for due diligence, sourcing, and market research. Conversations open.',
    href: '/investor',
    icon: TrendingUp,
    accent: 'cyan',
  },
  {
    id: 'partner',
    label: 'Partner · Tech-co',
    title: 'Active integrations & new collabs',
    subtitle: 'Live Madrid week: Google partnership — Gemini + ADK + Antigravity. Plus Anthropic, Vercel, NVIDIA, Oracle. Where your stack fits.',
    href: '/partnerships',
    icon: Handshake,
    accent: 'emerald',
  },
  {
    id: 'client',
    label: 'Client · Enterprise',
    title: 'AI architect engagements',
    subtitle: 'Agentic systems, Oracle Cloud, multi-agent orchestration. Patterns that ship.',
    href: '/ai-architect',
    icon: Network,
    accent: 'violet',
  },
  {
    id: 'creator',
    label: 'Creator · Community',
    title: 'Music, ideas, weekly drops',
    subtitle: '12K+ AI tracks, Creation Chronicles, Vibe OS — join the inner circle.',
    href: '/music-lab',
    icon: Music4,
    accent: 'amber',
  },
]

const ACCENT_RING: Record<Accent, string> = {
  cyan: 'hover:border-cyan-400/40 hover:shadow-[0_20px_60px_-25px_rgba(34,211,238,0.6)]',
  emerald: 'hover:border-emerald-400/40 hover:shadow-[0_20px_60px_-25px_rgba(16,185,129,0.6)]',
  violet: 'hover:border-violet-400/40 hover:shadow-[0_20px_60px_-25px_rgba(167,139,250,0.6)]',
  amber: 'hover:border-amber-400/40 hover:shadow-[0_20px_60px_-25px_rgba(251,191,36,0.6)]',
}

const ACCENT_ICON_BG: Record<Accent, string> = {
  cyan: 'bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-400/20',
  emerald: 'bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-400/20',
  violet: 'bg-violet-500/10 text-violet-300 ring-1 ring-violet-400/20',
  amber: 'bg-amber-500/10 text-amber-300 ring-1 ring-amber-400/20',
}

const ACCENT_LABEL: Record<Accent, string> = {
  cyan: 'text-cyan-300',
  emerald: 'text-emerald-300',
  violet: 'text-violet-300',
  amber: 'text-amber-300',
}

export function RolePathCards() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
      }}
      className="grid w-full gap-3 sm:grid-cols-2"
    >
      {PATHS.map((path) => {
        const Icon = path.icon
        return (
          <motion.div
            key={path.id}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            <Link
              href={path.href}
              onClick={() =>
                trackEvent('connect_path_clicked', { path: path.id, destination: path.href })
              }
              className={`group relative flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-all hover:bg-white/[0.06] ${ACCENT_RING[path.accent]}`}
            >
              <div className="flex items-center justify-between">
                <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${ACCENT_ICON_BG[path.accent]}`}>
                  <Icon className="h-4.5 w-4.5" aria-hidden />
                </span>
                <ArrowUpRight
                  className="h-4 w-4 text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/80"
                  aria-hidden
                />
              </div>
              <div>
                <p className={`text-[11px] font-medium uppercase tracking-[0.14em] ${ACCENT_LABEL[path.accent]}`}>
                  {path.label}
                </p>
                <h3 className="mt-1.5 text-base font-semibold text-white sm:text-[17px]">{path.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/60">{path.subtitle}</p>
              </div>
            </Link>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
