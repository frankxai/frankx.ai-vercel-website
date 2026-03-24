'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { GlowCard, type GlowColor } from '@/components/ui/glow-card'
import { GlowButton } from '@/components/ui/GlowButton'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  Mail,
  Palette,
  Type,
  Layers,
  MessageSquare,
  Smartphone,
  Maximize2,
  Sparkles,
  Workflow,
  Clock,
  Send,
  Code2,
} from 'lucide-react'

// ── Animation Constants ────────────────────────────────────────────

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

// ── Email Palette ──────────────────────────────────────────────────

const foundationColors = [
  { name: 'Background', hex: '#111827', css: 'gray-900', use: 'Email body background' },
  { name: 'Card', hex: '#1f2937', css: 'gray-800', use: 'Dividers, borders, subtle surfaces' },
  { name: 'Body Text', hex: '#d1d5db', css: 'gray-300', use: 'Primary readable text' },
  { name: 'Muted', hex: '#9ca3af', css: 'gray-400', use: 'Secondary text, captions' },
]

const accentPalettes = [
  { name: 'Violet', hex: '#8b5cf6', templates: ['Welcome', 'Purchase', 'Broadcast', 'Day 14', 'Product Launch'], role: 'Primary brand accent' },
  { name: 'Emerald', hex: '#34d399', templates: ['Music Prompts', 'Album Release', 'Behind the Music'], role: 'Music & creative' },
  { name: 'Amber', hex: '#fbbf24', templates: ['Inner Circle CTA'], role: 'Premium & urgency' },
  { name: 'Cyan', hex: '#22d3ee', templates: ['PDF Delivery', 'Test'], role: 'Utility & delivery' },
  { name: 'Rose', hex: '#fb7185', templates: ['(Reserved — Win-back)'], role: 'Re-engagement' },
]

// ── Design Principles ──────────────────────────────────────────────

const principles = [
  {
    icon: Palette,
    title: 'Monochrome + One',
    description: 'Each email uses exactly one accent color against #111827 dark. No rainbow overload. The constraint forces clarity.',
    color: '#8b5cf6',
  },
  {
    icon: Type,
    title: 'Typography IS Design',
    description: 'No nested card backgrounds, no box-in-box layouts. The type hierarchy, whitespace, and one accent do all the work.',
    color: '#d1d5db',
  },
  {
    icon: Maximize2,
    title: 'Generous Space',
    description: '36px+ between sections. Emails that breathe. Every element earns its space or gets cut.',
    color: '#34d399',
  },
  {
    icon: MessageSquare,
    title: 'Personal Letter',
    description: 'Feels like a letter from someone who respects your inbox. Not a SaaS dashboard, not a marketing blast.',
    color: '#fbbf24',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Inline',
    description: 'Gmail strips <style> on mobile. All critical styles inline. Desktop enhancements via @media only.',
    color: '#22d3ee',
  },
]

// ── Typography Scale ──────────────────────────────────────────────

const emailTypeScale = [
  { name: 'H1', size: '24–32px', weight: 700, leading: '1.2–1.3', use: 'Email title (one per email)', desktop: '32px via @media' },
  { name: 'Body', size: '16–17px', weight: 400, leading: '1.6–1.8', use: 'Primary readable content', desktop: '17px' },
  { name: 'Body Strong', size: '16px', weight: 600, leading: '1.6', use: 'Emphasis within paragraphs', desktop: '—' },
  { name: 'Label', size: '11px', weight: 700, leading: '1.5', use: 'Section markers, uppercase', desktop: '—' },
  { name: 'CTA', size: '16px', weight: 600, leading: '1.0', use: 'Button text, centered', desktop: '—' },
  { name: 'Caption', size: '14px', weight: 400, leading: '1.7', use: 'P.S. blocks, footnotes', desktop: '—' },
  { name: 'Footer', size: '13px', weight: 400, leading: '1.5', use: 'Footer text, legal', desktop: '—' },
  { name: 'Micro', size: '11px', weight: 400, leading: '1.6', use: 'Unsubscribe, CAN-SPAM', desktop: '—' },
]

// ── Template Catalog ──────────────────────────────────────────────

const seriesTemplates = [
  { id: 8, name: 'Weekly Digest', accent: '#8b5cf6', description: 'Curated highlights from the week — articles, projects, and insights' },
  { id: 9, name: 'Onboarding Day 3', accent: '#34d399', description: 'Three quick resources to get started with the FrankX ecosystem' },
  { id: 10, name: 'Onboarding Day 7', accent: '#fbbf24', description: 'Deeper dive into tools and frameworks with actionable steps' },
  { id: 11, name: 'Onboarding Day 14', accent: '#8b5cf6', description: 'Progress check-in with community invitation and next steps' },
  { id: 12, name: 'Product Launch', accent: '#22d3ee', description: 'New product announcement with features, pricing, and early access' },
  { id: 13, name: 'Behind the Music', accent: '#34d399', description: 'Creative process breakdown — how a track was made with AI' },
]

const transactionalTemplates = [
  { id: 1, name: 'Welcome', accent: '#8b5cf6', description: 'First email after signup — sets expectations, links to key resources' },
  { id: 2, name: 'Purchase Confirmation', accent: '#8b5cf6', description: 'Order details, download links, receipt, and next steps' },
  { id: 3, name: 'PDF Delivery', accent: '#22d3ee', description: 'Clean utility template — one CTA, direct download access' },
  { id: 4, name: 'Music Prompt Pack', accent: '#34d399', description: 'Template for delivering Suno prompt collections' },
  { id: 5, name: 'Album Release', accent: '#34d399', description: 'Music drop announcement with streaming links and story' },
  { id: 6, name: 'Inner Circle CTA', accent: '#fbbf24', description: 'Invitation to join the Inner Circle with premium copy' },
  { id: 7, name: 'Test Email', accent: '#22d3ee', description: 'Internal test template with all helpers rendered' },
]

const helperPrimitives = [
  { name: 'ctaButton()', params: 'text, url, color', output: 'Solid filled button, 50px height, Outlook VML fallback', color: '#8b5cf6' },
  { name: 'outlineButton()', params: 'text, url', output: 'Transparent button with gray border, secondary action', color: '#374151' },
  { name: 'divider()', params: 'none', output: '1px gray-800 border-top with 36px top padding', color: '#1f2937' },
  { name: 'label()', params: 'text, color', output: '11px uppercase label above sections', color: '#8b5cf6' },
  { name: 'ps()', params: 'text', output: 'P.S. block with top divider and muted styling', color: '#9ca3af' },
]

const evolution = [
  { version: 'v1', name: 'Rainbow Chaos', description: 'Multiple accent colors per email. Cards nested 3 levels deep. Visual overload.', year: '2024 Q2' },
  { version: 'v2', name: 'Soft Minimalism', description: 'Monochrome only. Too minimal — lacked energy and brand personality.', year: '2024 Q3' },
  { version: 'v3', name: 'Dual Accent', description: 'Primary + secondary accent. Better than v1 but still confusing hierarchy.', year: '2024 Q4' },
  { version: 'v4', name: 'Oasis of Calm', description: 'One accent per email. Typography-driven. Generous space. Final form.', year: '2025 Q1', active: true },
]

// ── Components ─────────────────────────────────────────────────────

interface SectionProps {
  children: React.ReactNode
  id?: string
  className?: string
}

function Section({ children, id, className = '' }: SectionProps) {
  return (
    <section id={id} className={`py-20 ${className}`}>
      <div className="mx-auto max-w-6xl px-6">
        {children}
      </div>
    </section>
  )
}

interface ColorSwatchProps {
  name: string
  hex: string
  onClick?: () => void
  active?: boolean
}

function ColorSwatch({ name, hex, onClick, active = false }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false)

  const handleClick = () => {
    navigator.clipboard.writeText(hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
    if (onClick) onClick()
  }

  return (
    <button
      onClick={handleClick}
      className={`group relative flex items-center gap-3 rounded-xl p-3 transition-all ${
        active ? 'bg-white/[0.06] border border-white/[0.12]' : 'hover:bg-white/[0.03]'
      }`}
    >
      <div className="h-10 w-10 rounded-lg shrink-0" style={{ backgroundColor: hex }} />
      <div className="text-left">
        <div className="text-sm font-semibold text-white">{name}</div>
        <div className="text-xs text-slate-400 font-mono">{hex}</div>
      </div>
      {copied && (
        <Check className="absolute right-3 h-4 w-4 text-emerald-400" />
      )}
    </button>
  )
}

function AccentPreview({ selectedAccent }: { selectedAccent: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl p-6">
      <div className="space-y-4">
        {/* Top accent bar */}
        <div className="h-1 w-24 rounded-full transition-colors duration-300" style={{ backgroundColor: selectedAccent }} />

        {/* Mock email content */}
        <div>
          <h4 className="text-lg font-bold text-white mb-2">Your Weekly Digest</h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            This week: AI music production techniques, new Suno v4 features, and exclusive templates for Inner Circle members.
          </p>
        </div>

        {/* Mock CTA button */}
        <div className="pt-2">
          <div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white text-sm transition-colors duration-300"
            style={{ backgroundColor: selectedAccent }}
          >
            <span>Read This Week's Issue</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  )
}

function TemplateCard({ template, onMouseMove, onMouseLeave }: {
  template: { id: number; name: string; accent: string; description: string }
  onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void
}) {
  return (
    <motion.div
      variants={fadeIn}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.3 }}
      className="group relative"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] backdrop-blur-sm transition-colors">
        {/* Accent bar that expands on hover */}
        <div
          className="h-1 rounded-full mb-5 w-16 group-hover:w-24 transition-all duration-300"
          style={{ backgroundColor: template.accent }}
        />

        {/* Content */}
        <div className="space-y-2">
          <h4 className="text-base font-semibold text-white">{template.name}</h4>
          <p className="text-sm text-slate-400 leading-relaxed">{template.description}</p>
        </div>

        {/* Template ID badge */}
        <div className="mt-4 inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.05] backdrop-blur-sm border border-white/[0.06]">
          <Code2 className="h-3 w-3 text-slate-500" />
          <span className="text-xs text-slate-500 font-mono">T{template.id}</span>
        </div>

        {/* Hover glow effect (CSS variable driven) */}
        <div
          className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${template.accent}10, transparent 40%)`
          }}
        />
      </div>
    </motion.div>
  )
}

// ── Main Component ────────────────────────────────────────────────

export default function ArcaneaComposePage() {
  const [selectedAccent, setSelectedAccent] = useState('#8b5cf6')
  const shouldReduceMotion = useReducedMotion()

  const handleMouseMoveOnCard = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }, [])

  const handleMouseLeaveCard = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.removeProperty('--mouse-x')
    e.currentTarget.style.removeProperty('--mouse-y')
  }, [])

  return (
    <>
      {/* Animated Background — 3 blobs + particles */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#0a0a0b]" />

        {/* Blob 1: Violet (top-left, 20s) */}
        {!shouldReduceMotion && (
          <motion.div
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[140px]"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)' }}
            animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Blob 2: Gold (bottom-right, 25s) */}
        {!shouldReduceMotion && (
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[128px]"
            style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)' }}
            animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          />
        )}

        {/* Blob 3: Cyan (top-right, 30s) */}
        {!shouldReduceMotion && (
          <motion.div
            className="absolute top-1/2 right-1/3 w-[400px] h-[400px] rounded-full blur-[128px]"
            style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)' }}
            animate={{ x: [0, 120, 0], y: [0, -70, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 10 }}
          />
        )}

        {/* 12 Floating Particles */}
        {!shouldReduceMotion && [...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20"
            style={{ left: `${10 + i * 7}%`, top: `${20 + (i % 3) * 20}%` }}
            animate={{ y: [0, -100, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 8 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
          />
        ))}
      </div>

      {/* Content */}
      <main className="relative">
        {/* Hero */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5"
            >
              <Mail className="h-4 w-4 text-violet-400" />
              <span className="text-sm font-medium text-violet-400">Email Design System</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6"
            >
              <span className="block text-white">Arcanea</span>
              <span className="block bg-gradient-to-r from-violet-400 via-rose-400 to-amber-400 bg-clip-text text-transparent">
                Compose
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-300 mb-10 sm:text-xl"
            >
              13 email templates, 5 accent palettes, and a design philosophy that makes subscribers want to open your emails.
              No nested cards, no rainbow chaos—just clarity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <GlowButton variant="primary" size="lg" color="violet" href="#templates">
                <Mail className="w-5 h-5" />
                Explore Templates
              </GlowButton>

              <GlowButton variant="secondary" size="lg" href="/newsletter">
                Subscribe to the Newsletter
              </GlowButton>
            </motion.div>

            {/* Quick-nav pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-16 flex flex-wrap items-center justify-center gap-2 text-sm"
            >
              {['Philosophy', 'Colors', 'Typography', 'Templates'].map((section) => (
                <a
                  key={section}
                  href={`#${section.toLowerCase()}`}
                  className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all"
                >
                  {section}
                </a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Philosophy */}
        <Section id="philosophy">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="space-y-10"
          >
            <motion.div variants={fadeIn} className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">"Oasis of Calm"</h2>
              <p className="text-lg text-slate-400">
                Five principles that guide every template, helper, and design decision.
              </p>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {principles.map((p, i) => {
                const Icon = p.icon
                return (
                  <motion.div key={p.title} variants={fadeIn}>
                    <GlowCard color={i % 2 === 0 ? 'purple' as GlowColor : 'emerald' as GlowColor}>
                      <motion.div
                        whileHover={{ scale: 1.03, y: -4 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 rounded-[inherit] bg-white/[0.03] backdrop-blur-xl h-full"
                      >
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.06]">
                          <Icon className="h-6 w-6" style={{ color: p.color }} />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-white">{p.title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{p.description}</p>
                      </motion.div>
                    </GlowCard>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </Section>

        {/* Colors */}
        <Section id="colors" className="border-t border-white/[0.05]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="space-y-10"
          >
            <motion.div variants={fadeIn} className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Color System</h2>
              <p className="text-lg text-slate-400">
                Four foundation grays plus five accent colors. One accent per email—choose based on tone and intent.
              </p>
            </motion.div>

            <div className="grid gap-10 lg:grid-cols-2">
              {/* Foundation */}
              <motion.div variants={fadeIn} className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Foundation</h3>
                <div className="space-y-2">
                  {foundationColors.map((c) => (
                    <ColorSwatch key={c.name} name={c.name} hex={c.hex} />
                  ))}
                </div>
              </motion.div>

              {/* Accents */}
              <motion.div variants={fadeIn} className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Accents (choose one per email)</h3>
                <div className="space-y-2">
                  {accentPalettes.map((a) => (
                    <ColorSwatch
                      key={a.name}
                      name={a.name}
                      hex={a.hex}
                      onClick={() => setSelectedAccent(a.hex)}
                      active={selectedAccent === a.hex}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Live Preview */}
            <motion.div variants={fadeIn} className="max-w-md mx-auto">
              <h3 className="text-sm font-semibold text-slate-400 mb-4 text-center">
                Live Preview (click an accent above)
              </h3>
              <AccentPreview selectedAccent={selectedAccent} />
            </motion.div>
          </motion.div>
        </Section>

        {/* Typography */}
        <Section id="typography" className="border-t border-white/[0.05]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="space-y-10"
          >
            <motion.div variants={fadeIn} className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Typography Scale</h2>
              <p className="text-lg text-slate-400">
                System font stack (no web fonts). Large specimens below—this IS the design.
              </p>
            </motion.div>

            {/* Large Specimens */}
            <motion.div variants={fadeIn} className="space-y-12">
              {/* H1 */}
              <div>
                <div className="mb-3 text-xs uppercase tracking-wider text-slate-500 font-bold">H1 — Email Title</div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                  Build what matters.
                </div>
              </div>

              {/* Body */}
              <div>
                <div className="mb-3 text-xs uppercase tracking-wider text-slate-500 font-bold">Body — Primary Content</div>
                <div className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  This week: AI music production techniques, new Suno v4 features, and exclusive templates for Inner Circle members. No fluff, no filler—just actionable intelligence for creators who ship.
                </div>
              </div>

              {/* Label */}
              <div>
                <div className="mb-3 text-xs uppercase tracking-wider text-slate-500 font-bold">Label — Section Markers</div>
                <div className="text-xs font-bold text-violet-400 uppercase tracking-wider">
                  This Week's Highlights
                </div>
              </div>
            </motion.div>

            {/* Type Scale Table */}
            <motion.div variants={fadeIn} className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="pb-3 font-semibold text-white">Name</th>
                    <th className="pb-3 font-semibold text-white">Size</th>
                    <th className="pb-3 font-semibold text-white">Weight</th>
                    <th className="pb-3 font-semibold text-white">Use</th>
                  </tr>
                </thead>
                <tbody>
                  {emailTypeScale.map((t, i) => (
                    <tr key={t.name} className={i !== emailTypeScale.length - 1 ? 'border-b border-white/[0.04]' : ''}>
                      <td className="py-3 font-mono text-slate-300">{t.name}</td>
                      <td className="py-3 text-slate-400">{t.size}</td>
                      <td className="py-3 text-slate-400">{t.weight}</td>
                      <td className="py-3 text-slate-500">{t.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </motion.div>
        </Section>

        {/* Templates */}
        <Section id="templates" className="border-t border-white/[0.05]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="space-y-10"
          >
            <motion.div variants={fadeIn} className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Template Gallery</h2>
              <p className="text-lg text-slate-400">
                13 production templates—6 for series content, 7 transactional. All built on the same helpers and design system.
              </p>
            </motion.div>

            {/* Series Templates */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Workflow className="h-5 w-5 text-violet-400" />
                <h3 className="text-xl font-semibold text-white">Series Templates (6)</h3>
              </div>
              <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {seriesTemplates.map((t) => (
                  <TemplateCard
                    key={t.id}
                    template={t}
                    onMouseMove={handleMouseMoveOnCard}
                    onMouseLeave={handleMouseLeaveCard}
                  />
                ))}
              </motion.div>
            </div>

            {/* Transactional Templates */}
            <div className="space-y-6 pt-6">
              <div className="flex items-center gap-3">
                <Send className="h-5 w-5 text-cyan-400" />
                <h3 className="text-xl font-semibold text-white">Transactional Templates (7)</h3>
              </div>
              <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {transactionalTemplates.map((t) => (
                  <TemplateCard
                    key={t.id}
                    template={t}
                    onMouseMove={handleMouseMoveOnCard}
                    onMouseLeave={handleMouseLeaveCard}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </Section>

        {/* Components */}
        <Section id="components" className="border-t border-white/[0.05]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="space-y-10"
          >
            <motion.div variants={fadeIn} className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Helper Primitives</h2>
              <p className="text-lg text-slate-400">
                Five reusable functions that generate inline-styled HTML for Gmail compatibility.
              </p>
            </motion.div>

            <motion.div variants={stagger} className="grid gap-6 sm:grid-cols-2">
              {helperPrimitives.map((h) => (
                <motion.div key={h.name} variants={fadeIn}>
                  <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm space-y-3">
                    <div className="flex items-start justify-between">
                      <code className="text-sm font-semibold text-emerald-400">{h.name}</code>
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: h.color }} />
                    </div>
                    <p className="text-xs text-slate-500 font-mono">{h.params}</p>
                    <p className="text-sm text-slate-400 leading-relaxed">{h.output}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Section>

        {/* Evolution */}
        <Section id="evolution" className="border-t border-white/[0.05]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="space-y-10"
          >
            <motion.div variants={fadeIn} className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Evolution Timeline</h2>
              <p className="text-lg text-slate-400">
                Four iterations to find the final form—v4 "Oasis of Calm" is the result.
              </p>
            </motion.div>

            <motion.div variants={stagger} className="relative max-w-3xl mx-auto">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-amber-500/50 to-emerald-500/50" />

              <div className="space-y-8">
                {evolution.map((e, i) => (
                  <motion.div key={e.version} variants={fadeIn} className="relative pl-20">
                    {/* Marker */}
                    <div className="absolute left-6 top-1 h-5 w-5 rounded-full border-2 border-white/[0.12] bg-[#0a0a0b] flex items-center justify-center">
                      {e.active && (
                        <motion.div
                          className="h-2 w-2 rounded-full bg-emerald-400"
                          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </div>

                    <div className={`p-4 rounded-xl ${e.active ? 'bg-white/[0.06] border border-white/[0.12]' : 'bg-white/[0.02] border border-white/[0.04]'}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <code className="text-sm font-bold text-white">{e.version}</code>
                        <h4 className="text-base font-semibold text-white">{e.name}</h4>
                        {e.active && (
                          <span className="ml-auto text-xs font-semibold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-400">{e.description}</p>
                      <p className="text-xs text-slate-600 mt-2">{e.year}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </Section>

        {/* CTA Footer */}
        <Section className="border-t border-white/[0.05]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to experience it?</h2>
              <p className="text-lg text-slate-400 max-w-xl mx-auto">
                Subscribe to the newsletter and see these templates in action every week.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <GlowButton
                variant="primary"
                size="lg"
                color="violet"
                href="/newsletter"
                className="shadow-lg shadow-[#AB47C7]/30"
              >
                <Mail className="w-5 h-5" />
                Subscribe to Newsletter
              </GlowButton>

              <Link
                href="/design-lab"
                className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Design Lab
              </Link>
            </div>
          </motion.div>
        </Section>
      </main>
    </>
  )
}
