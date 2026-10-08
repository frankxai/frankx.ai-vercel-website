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
]

export default function BlogFooterCTA() {
  return (
    <div className="relative">
      {/* Aurora ambient layer */}
      <div className="absolute -inset-8 pointer-events-none" aria-hidden>
        <div className="absolute top-0 left-1/4 h-48 w-64 rounded-full bg-emerald-500/[0.08] blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 h-40 w-56 rounded-full bg-cyan-500/[0.06] blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 h-36 w-48 rounded-full bg-purple-500/[0.05] blur-[80px]" />
      </div>
    <div className="relative grid gap-5">
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
    </div>
  )
}
