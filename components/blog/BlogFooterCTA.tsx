'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { GlowCard, type GlowColor } from '@/components/ui/glow-card'

// Inline SVG icons (Heroicons outline style) to avoid extra deps
function RocketIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  )
}

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  )
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  )
}

const ctaItems = [
  {
    icon: RocketIcon,
    label: 'Get Started',
    title: 'Build your first AI system',
    description:
      'Step-by-step guide to setting up ACOS, creating your first agent, and shipping real products with AI.',
    href: '/start',
    linkText: 'Start building',
    color: 'emerald' as const,
    iconBorder: 'border-emerald-500/20',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    linkColor: 'text-emerald-400 hover:text-emerald-300',
  },
  {
    icon: DocumentIcon,
    label: 'Templates & Blueprints',
    title: 'Production-ready architecture',
    description:
      'Download AI architecture templates, multi-agent blueprints, and prompt engineering patterns.',
    href: '/ai-architecture/templates',
    linkText: 'Browse templates',
    color: 'cyan' as const,
    iconBorder: 'border-cyan-500/20',
    iconBg: 'bg-cyan-500/10',
    iconColor: 'text-cyan-400',
    linkColor: 'text-cyan-400 hover:text-cyan-300',
  },
  {
    icon: UsersIcon,
    label: 'Inner Circle',
    title: 'Join the builder community',
    description:
      'Connect with creators and architects shipping AI products. Weekly office hours, shared resources, direct access.',
    href: '/inner-circle',
    linkText: 'Join the circle',
    color: 'purple' as const,
    iconBorder: 'border-purple-500/20',
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-400',
    linkColor: 'text-purple-400 hover:text-purple-300',
  },
]

export default function BlogFooterCTA() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {ctaItems.map((item) => (
        <GlowCard key={item.href} color={item.color as GlowColor} href={item.href}>
          <div className="p-6">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.iconBg} ${item.iconBorder} border mb-4`}
            >
              <item.icon className={`h-5 w-5 ${item.iconColor}`} />
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
              {item.label}
            </span>
            <h3 className="mt-1.5 text-lg font-semibold text-white group-hover:text-white/90 transition-colors">
              {item.title}
            </h3>
            <p className="mt-2.5 text-sm text-white/50 leading-relaxed">
              {item.description}
            </p>
            <span
              className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold ${item.linkColor} transition-colors`}
            >
              {item.linkText}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </GlowCard>
      ))}
    </div>
  )
}
