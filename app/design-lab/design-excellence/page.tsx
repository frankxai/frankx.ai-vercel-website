'use client'

import { useState, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  Palette,
  Type,
  Grid3X3,
  Layers,
  Sparkles,
  Check,
  Copy,
  Moon,
  Zap,
  Shield,
  MonitorSmartphone,
} from 'lucide-react'
import { GlowCard, type GlowColor } from '@/components/ui/glow-card'

// ── Color System ──

const foundationColors = [
  { name: 'Void', hex: '#0a0a0b', css: '--void', use: 'Page background' },
  { name: 'Space', hex: '#111113', css: '--space', use: 'Section background' },
  { name: 'Navy', hex: '#0F172A', css: '--navy', use: 'Brand primary dark' },
  { name: 'Elevated', hex: '#1a1a1f', css: '--elevated', use: 'Card backgrounds' },
  { name: 'Subtle', hex: '#252530', css: '--subtle', use: 'Hover states' },
  { name: 'Muted', hex: '#3a3a4a', css: '--muted', use: 'Disabled states' },
]

const accentColors = [
  { name: 'Purple', hex: '#AB47C7', domain: 'Intelligence, ACOS' },
  { name: 'Blue', hex: '#43BFE3', domain: 'Technology, Vibe OS' },
  { name: 'Magenta', hex: '#E040FB', domain: 'GenCreator OS' },
  { name: 'Emerald', hex: '#10B981', domain: 'Success, Labs, CTAs' },
  { name: 'Gold', hex: '#F59E0B', domain: 'Music, Premium' },
  { name: 'Rose', hex: '#F43F5E', domain: 'Errors, Destructive' },
  { name: 'Indigo', hex: '#6366F1', domain: 'DevOps, Security' },
  { name: 'Teal', hex: '#14B8A6', domain: 'Data, Research' },
]

const textColors = [
  { name: 'Primary', value: 'rgba(255,255,255,0.95)', use: 'Headings', ratio: '19.1:1' },
  { name: 'Secondary', value: 'rgba(255,255,255,0.72)', use: 'Body text', ratio: '12.3:1' },
  { name: 'Blog Body', value: 'rgba(255,255,255,0.85)', use: 'Blog body', ratio: '7.2:1 (AAA)' },
  { name: 'Tertiary', value: 'rgba(255,255,255,0.48)', use: 'Captions', ratio: '6.1:1' },
  { name: 'Muted', value: 'rgba(255,255,255,0.32)', use: 'Placeholders', ratio: '4.2:1' },
]

// ── Typography Scale ──

const typeScale = [
  { name: 'Display', font: 'Poppins', weight: 800, size: '72px', leading: '1.05', tracking: '-0.02em' },
  { name: 'H1', font: 'Poppins', weight: 700, size: '48px', leading: '1.15', tracking: '-0.02em' },
  { name: 'H2', font: 'Poppins', weight: 700, size: '36px', leading: '1.2', tracking: 'normal' },
  { name: 'H3', font: 'Poppins', weight: 600, size: '28px', leading: '1.25', tracking: 'normal' },
  { name: 'H4', font: 'Poppins', weight: 600, size: '22px', leading: '1.3', tracking: 'normal' },
  { name: 'Body Lg', font: 'Inter', weight: 400, size: '20px', leading: '1.65', tracking: 'normal' },
  { name: 'Body', font: 'Inter', weight: 400, size: '17px', leading: '1.7', tracking: 'normal' },
  { name: 'Caption', font: 'Inter', weight: 500, size: '13px', leading: '1.5', tracking: 'normal' },
  { name: 'Code', font: 'JetBrains Mono', weight: 400, size: '14px', leading: '1.7', tracking: 'normal' },
]

// ── Spacing Scale ──

const spacingScale = [
  { name: 'tight', px: 4 },
  { name: 'compact', px: 8 },
  { name: 'default', px: 12 },
  { name: 'standard', px: 16 },
  { name: 'medium', px: 24 },
  { name: 'large', px: 32 },
  { name: 'xl', px: 48 },
  { name: '2xl', px: 64 },
  { name: '3xl', px: 80 },
  { name: '4xl', px: 120 },
]

// ── Quality Principles ──

const principles: Array<{
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  color: string
  glowColor: GlowColor
}> = [
  {
    icon: Moon,
    title: 'Dark-First',
    description:
      'Every surface starts at #0a0a0b. Light is earned through glassmorphism and accent glows. Never pure black, never light mode as an afterthought.',
    color: '#43BFE3',
    glowColor: 'cyan',
  },
  {
    icon: Layers,
    title: 'Glass Over Solid',
    description:
      'Cards use bg-white/[0.03] with backdrop-blur. Maximum opacity: 0.08. The glass layering creates depth without weight. Borders at white/[0.06].',
    color: '#AB47C7',
    glowColor: 'violet',
  },
  {
    icon: Zap,
    title: 'Motion With Purpose',
    description:
      'Only animate transform + opacity. 200ms for interactions, 300ms for transitions, 8-15s for ambient effects. Respect prefers-reduced-motion always.',
    color: '#F59E0B',
    glowColor: 'amber',
  },
  {
    icon: Shield,
    title: 'Accessible By Default',
    description:
      'WCAG AA minimum (4.5:1 text, 3:1 UI). Focus rings use purple (#AB47C7). All interactions have keyboard alternatives. Reduced motion support mandatory.',
    color: '#10B981',
    glowColor: 'emerald',
  },
  {
    icon: MonitorSmartphone,
    title: 'Mobile-Considered',
    description:
      'Touch targets minimum 44x44px. Breakpoints at 640/768/1024/1280/1536. Content widths: 680px prose, 896px cards, 1280px page max.',
    color: '#E040FB',
    glowColor: 'magenta',
  },
  {
    icon: Type,
    title: 'Type Discipline',
    description:
      'Poppins for text ≥18px only. Inter handles all body and UI. JetBrains Mono for code. Playfair Display only for italic editorial quotes. No exceptions.',
    color: '#F43F5E',
    glowColor: 'rose',
  },
]

// ── Glassmorphism Playground ──

function GlassPlayground() {
  const [opacity, setOpacity] = useState(3)
  const [blur, setBlur] = useState(18)
  const [borderOpacity, setBorderOpacity] = useState(6)
  const [copied, setCopied] = useState(false)

  const cssCode = `background: rgba(255, 255, 255, ${(opacity / 100).toFixed(2)});
backdrop-filter: blur(${blur}px);
border: 1px solid rgba(255, 255, 255, ${(borderOpacity / 100).toFixed(2)});
border-radius: 24px;`

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(cssCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [cssCode])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Preview */}
      <div className="relative h-[320px] rounded-3xl overflow-hidden border border-white/[0.06]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#0a0a0b]" />
          <div
            className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(171,71,199,0.5) 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(67,191,227,0.5) 0%, transparent 70%)' }}
          />
        </div>

        <div className="absolute inset-8 flex items-center justify-center">
          <div
            className="w-full max-w-[280px] p-6 rounded-3xl relative overflow-hidden"
            style={{
              background: `rgba(255, 255, 255, ${opacity / 100})`,
              backdropFilter: `blur(${blur}px)`,
              border: `1px solid rgba(255, 255, 255, ${borderOpacity / 100})`,
            }}
          >
            {/* Specular highlight on playground card */}
            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="w-9 h-9 rounded-2xl bg-purple-500/20 mb-3 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>
            <h3 className="text-sm font-semibold text-white/90 mb-1">Glass Card</h3>
            <p className="text-xs text-white/50 leading-relaxed">
              Adjust the controls to see how glassmorphism parameters affect the visual result.
            </p>
            <div className="mt-3 flex gap-2">
              <div className="px-3 py-1 rounded-full bg-purple-500/10 text-[10px] text-purple-400 font-medium">Tag</div>
              <div className="px-3 py-1 rounded-full bg-cyan-500/10 text-[10px] text-cyan-400 font-medium">Label</div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-5">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs text-white/50">Background Opacity</label>
            <span className="text-xs font-mono text-white/70">{opacity}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={15}
            value={opacity}
            onChange={e => setOpacity(Number(e.target.value))}
            className="w-full accent-purple-500"
          />
          <div className="flex justify-between text-[9px] text-white/20 mt-0.5">
            <span>0% (invisible)</span>
            <span className="text-emerald-400/60">3% standard</span>
            <span>8% max</span>
            <span className="text-rose-400/60">15% too much</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs text-white/50">Backdrop Blur</label>
            <span className="text-xs font-mono text-white/70">{blur}px</span>
          </div>
          <input
            type="range"
            min={0}
            max={40}
            value={blur}
            onChange={e => setBlur(Number(e.target.value))}
            className="w-full accent-purple-500"
          />
          <div className="flex justify-between text-[9px] text-white/20 mt-0.5">
            <span>0px (none)</span>
            <span className="text-emerald-400/60">18px standard</span>
            <span>40px heavy</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs text-white/50">Border Opacity</label>
            <span className="text-xs font-mono text-white/70">{borderOpacity}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={20}
            value={borderOpacity}
            onChange={e => setBorderOpacity(Number(e.target.value))}
            className="w-full accent-purple-500"
          />
          <div className="flex justify-between text-[9px] text-white/20 mt-0.5">
            <span>0% (none)</span>
            <span className="text-emerald-400/60">6% standard</span>
            <span>20%</span>
          </div>
        </div>

        {/* Code output */}
        <div className="relative rounded-2xl bg-[#0d1117] border border-white/[0.06] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
            <span className="text-[10px] text-white/30 font-mono">CSS</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-[10px] text-white/40 hover:text-white/70 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <pre className="p-4 text-xs font-mono text-white/60 leading-relaxed overflow-x-auto">{cssCode}</pre>
        </div>
      </div>
    </div>
  )
}

// ── Color Swatch ──

function ColorSwatch({ hex, name, detail }: { hex: string; name: string; detail: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(hex)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      className="group text-left cursor-pointer"
    >
      <div
        className="h-16 rounded-2xl border border-white/[0.06] mb-2 transition-all duration-300 group-hover:border-white/[0.20] group-hover:scale-[1.03] group-hover:[box-shadow:0_8px_24px_-4px_rgba(0,0,0,0.5)]"
        style={{ backgroundColor: hex }}
      />
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-medium text-white/70">{name}</span>
        {copied && <Check className="w-3 h-3 text-emerald-400" />}
      </div>
      <p className="text-[10px] text-white/35">{detail}</p>
      <p className="text-[10px] font-mono text-white/25 group-hover:text-white/55 transition-colors">{hex}</p>
    </button>
  )
}

// ── Section Wrapper ──

function Section({
  id,
  icon: Icon,
  title,
  subtitle,
  color,
  children,
}: {
  id: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  subtitle: string
  color: string
  children: React.ReactNode
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.section
      id={id}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
      className="py-16 border-t border-white/[0.06]"
    >
      <div className="flex items-center gap-3 mb-2">
        <div
          className="p-2.5 rounded-2xl"
          style={{ backgroundColor: color + '18' }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      <p className="text-white/50 text-sm mb-10 max-w-2xl leading-relaxed">{subtitle}</p>
      {children}
    </motion.section>
  )
}

// ── Main Page ──

export default function DesignExcellencePage() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-white overflow-hidden">
      {/* Background — richer aurora */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#0a0a0b]" />
        <div
          className="absolute top-0 left-1/4 w-[70%] h-[50%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(171,71,199,0.07) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-0 w-[50%] h-[40%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(67,191,227,0.06) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute top-1/2 left-0 w-[30%] h-[30%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.04) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
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
          className="pb-8"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 [backdrop-filter:blur(16px)]">
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase">Design System</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-[1.05]">
            Design
            <span className="block bg-gradient-to-r from-amber-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Excellence
            </span>
          </h1>

          <p className="text-lg text-white/55 max-w-2xl leading-relaxed mb-10">
            Every pixel is intentional. This is the FrankX design system — the principles, tokens,
            and standards that make frankx.ai feel premium, coherent, and unmistakably ours.
          </p>

          {/* Quick nav — pill-shaped glass tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Principles', href: '#principles' },
              { label: 'Colors', href: '#colors' },
              { label: 'Typography', href: '#typography' },
              { label: 'Glassmorphism', href: '#glass' },
              { label: 'Spacing', href: '#spacing' },
              { label: 'Components', href: '#components' },
            ].map(n => (
              <a
                key={n.label}
                href={n.href}
                className="px-4 py-2 rounded-full text-xs font-medium text-white/50 border border-white/[0.08] [backdrop-filter:blur(16px)] bg-white/[0.03] hover:border-white/[0.20] hover:text-white/80 hover:bg-white/[0.06] transition-all duration-200"
              >
                {n.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Principles — with cursor-following glow */}
        <Section
          id="principles"
          icon={Sparkles}
          title="Design Principles"
          subtitle="Six rules that govern every design decision on frankx.ai."
          color="#F59E0B"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {principles.map((p) => (
              <GlowCard key={p.title} color={p.glowColor} className="p-5">
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: p.color + '18' }}
                >
                  <p.icon className="w-5 h-5" style={{ color: p.color }} />
                </div>
                <h3 className="text-sm font-bold text-white mb-2.5">{p.title}</h3>
                <p className="text-xs text-white/55 leading-relaxed">{p.description}</p>
              </GlowCard>
            ))}
          </div>
        </Section>

        {/* Colors */}
        <Section
          id="colors"
          icon={Palette}
          title="Color System"
          subtitle="Dark-first foundation with purposeful accent colors. Click any swatch to copy the hex value."
          color="#AB47C7"
        >
          <div className="mb-8">
            <h3 className="text-xs uppercase tracking-wider text-white/35 mb-4 font-semibold">Foundation</h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {foundationColors.map(c => (
                <ColorSwatch key={c.hex} hex={c.hex} name={c.name} detail={c.use} />
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xs uppercase tracking-wider text-white/35 mb-4 font-semibold">Accent Colors</h3>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
              {accentColors.map(c => (
                <ColorSwatch key={c.hex} hex={c.hex} name={c.name} detail={c.domain} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-wider text-white/35 mb-4 font-semibold">Text Hierarchy</h3>
            <div className="space-y-2">
              {textColors.map(c => (
                <div
                  key={c.name}
                  className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05]"
                >
                  <div className="w-10 h-10 rounded-xl shrink-0" style={{ backgroundColor: c.value }} />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-medium text-white/70">{c.name}</span>
                    <span className="text-[10px] text-white/35 ml-2">{c.use}</span>
                  </div>
                  <span className="text-[10px] font-mono text-white/25 hidden sm:block">{c.value}</span>
                  <span className="text-[10px] text-emerald-400/70 shrink-0">{c.ratio}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Typography */}
        <Section
          id="typography"
          icon={Type}
          title="Typography Scale"
          subtitle="Three font families, strict size discipline. Poppins headings, Inter body, JetBrains Mono code."
          color="#43BFE3"
        >
          <div className="space-y-0">
            {typeScale.map(t => (
              <div key={t.name} className="flex items-baseline gap-6 py-4 border-b border-white/[0.04] group">
                <div className="w-20 shrink-0">
                  <span className="text-[10px] font-mono text-white/25 group-hover:text-white/50 transition-colors">
                    {t.name}
                  </span>
                </div>
                <div
                  className="flex-1 truncate text-white/85"
                  style={{
                    fontFamily:
                      t.font === 'JetBrains Mono'
                        ? 'var(--font-mono)'
                        : t.font === 'Poppins'
                          ? 'var(--font-poppins, Poppins, sans-serif)'
                          : 'var(--font-inter, Inter, sans-serif)',
                    fontWeight: t.weight,
                    fontSize: t.size,
                    lineHeight: t.leading,
                    letterSpacing: t.tracking,
                  }}
                >
                  Build what matters.
                </div>
                <div className="shrink-0 text-right hidden sm:block">
                  <p className="text-[10px] font-mono text-white/25">
                    {t.font} {t.weight}
                  </p>
                  <p className="text-[10px] font-mono text-white/18">
                    {t.size} / {t.leading}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Glassmorphism */}
        <Section
          id="glass"
          icon={Layers}
          title="Glassmorphism Playground"
          subtitle="Adjust opacity, blur, and border to see how glass layers work. The standard values are marked."
          color="#AB47C7"
        >
          <GlassPlayground />

          {/* Levels reference */}
          <div className="mt-8 grid grid-cols-4 gap-3">
            {[
              { name: 'Ghost', opacity: '0.02', use: 'Hover' },
              { name: 'Standard', opacity: '0.03', use: 'Cards' },
              { name: 'Elevated', opacity: '0.05', use: 'Active' },
              { name: 'Strong', opacity: '0.08', use: 'Max' },
            ].map(l => (
              <div
                key={l.name}
                className="p-4 rounded-2xl border border-white/[0.08] text-center relative overflow-hidden"
                style={{ background: `rgba(255,255,255,${l.opacity})` }}
              >
                <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <p className="text-xs font-semibold text-white/75 mb-0.5">{l.name}</p>
                <p className="text-[10px] font-mono text-white/35">{l.opacity}</p>
                <p className="text-[9px] text-white/25 mt-1">{l.use}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Spacing */}
        <Section
          id="spacing"
          icon={Grid3X3}
          title="Spacing System"
          subtitle="4px base grid. Every spacing value is a multiple of 4."
          color="#10B981"
        >
          <div className="space-y-2">
            {spacingScale.map(s => (
              <div key={s.name} className="flex items-center gap-4 group">
                <span className="text-[10px] font-mono text-white/30 w-16 text-right group-hover:text-white/55 transition-colors">
                  {s.name}
                </span>
                <span className="text-[10px] font-mono text-white/45 w-10 text-right">{s.px}px</span>
                <div className="flex-1 h-6 relative">
                  <div
                    className="h-full rounded-full bg-emerald-500/15 border border-emerald-500/20 group-hover:bg-emerald-500/25 transition-colors"
                    style={{ width: `${Math.min(s.px / 1.2, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-xs uppercase tracking-wider text-white/35 mb-4 font-semibold">Content Widths</h3>
            <div className="space-y-3">
              {[
                { name: 'Prose', width: '680px', tw: 'max-w-[680px]', use: 'Blog body, 65-75 chars/line' },
                { name: 'Content', width: '896px', tw: 'max-w-4xl', use: 'Cards, grids, wider content' },
                { name: 'Page', width: '1280px', tw: 'max-w-7xl', use: 'Standard page container' },
              ].map(w => (
                <div
                  key={w.name}
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05]"
                >
                  <span className="text-sm font-medium text-white/75 w-20">{w.name}</span>
                  <span className="text-xs font-mono text-white/35 w-20">{w.width}</span>
                  <span className="text-[10px] font-mono text-cyan-400/50">{w.tw}</span>
                  <span className="text-[10px] text-white/25 ml-auto">{w.use}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Component Patterns */}
        <Section
          id="components"
          icon={Layers}
          title="Component Patterns"
          subtitle="Live examples of core component patterns used across frankx.ai."
          color="#E040FB"
        >
          {/* Buttons — pill shaped */}
          <div className="mb-10">
            <h3 className="text-xs uppercase tracking-wider text-white/35 mb-5 font-semibold">Buttons</h3>
            <div className="flex flex-wrap gap-3">
              <button className="h-10 px-6 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-[#AB47C7] to-[#43BFE3] hover:opacity-90 transition-opacity cursor-pointer">
                Primary
              </button>
              <button className="h-10 px-6 rounded-full font-semibold text-sm text-black bg-emerald-500 hover:bg-emerald-400 transition-colors cursor-pointer">
                CTA
              </button>
              <button className="h-10 px-6 rounded-full font-semibold text-sm text-white/90 bg-white/[0.07] border border-white/[0.12] hover:bg-white/[0.12] transition-colors cursor-pointer">
                Secondary
              </button>
              <button className="h-10 px-6 rounded-full font-semibold text-sm text-white/60 hover:text-white/90 hover:bg-white/[0.06] transition-all cursor-pointer">
                Ghost
              </button>
              <button className="h-10 px-6 rounded-full font-semibold text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 transition-colors cursor-pointer">
                Danger
              </button>
            </div>
          </div>

          {/* Badges */}
          <div className="mb-10">
            <h3 className="text-xs uppercase tracking-wider text-white/35 mb-5 font-semibold">Badges &amp; Tags</h3>
            <div className="flex flex-wrap gap-2">
              {accentColors.slice(0, 6).map(c => (
                <span
                  key={c.name}
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: c.hex + '20', color: c.hex }}
                >
                  {c.name}
                </span>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="mb-10">
            <h3 className="text-xs uppercase tracking-wider text-white/35 mb-5 font-semibold">Cards</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/[0.08] [backdrop-filter:blur(24px)] [box-shadow:inset_0_1px_0_rgba(255,255,255,0.06)] relative overflow-hidden">
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <p className="text-xs font-medium text-white/60 mb-1">Glass Card</p>
                <p className="text-[10px] text-white/35">bg-white/[0.04] + backdrop-blur + specular</p>
              </div>
              <div className="p-6 rounded-3xl bg-[#1a1a1f] border border-[#2a2a3a] [box-shadow:0_4px_16px_-4px_rgba(0,0,0,0.4)]">
                <p className="text-xs font-medium text-white/60 mb-1">Elevated Card</p>
                <p className="text-[10px] text-white/35">bg-elevated + border + shadow</p>
              </div>
              <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/[0.08] border-l-2 border-l-purple-500 relative overflow-hidden">
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent" />
                <p className="text-xs font-medium text-white/60 mb-1">Accent Card</p>
                <p className="text-[10px] text-white/35">Left border accent + purple specular</p>
              </div>
            </div>
          </div>

          {/* Focus Ring */}
          <div className="mb-10">
            <h3 className="text-xs uppercase tracking-wider text-white/35 mb-5 font-semibold">Focus Ring</h3>
            <div className="flex gap-4 flex-wrap items-center">
              <button className="h-10 px-6 rounded-full text-sm text-white/70 bg-white/[0.05] border border-white/[0.09] outline-2 outline-offset-2 outline-[#AB47C7] focus:outline cursor-pointer">
                Tab to focus me
              </button>
              <p className="text-[10px] text-white/30">outline: 2px solid #AB47C7, offset: 2px</p>
            </div>
          </div>

          {/* Border Radius */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-white/35 mb-5 font-semibold">Border Radius Scale</h3>
            <div className="flex items-end gap-4 flex-wrap">
              {[
                { r: 4, label: '4px', use: 'Tiny' },
                { r: 8, label: '8px', use: 'Small' },
                { r: 12, label: '12px', use: 'Compact' },
                { r: 16, label: '16px', use: 'Cards' },
                { r: 24, label: '24px', use: 'Panels' },
                { r: 9999, label: 'Full', use: 'Pills' },
              ].map(b => (
                <div key={b.label} className="text-center">
                  <div
                    className="w-14 h-14 bg-white/[0.06] border border-white/[0.12] mb-2 transition-all hover:bg-white/[0.10]"
                    style={{ borderRadius: b.r }}
                  />
                  <p className="text-[10px] font-mono text-white/35">{b.label}</p>
                  <p className="text-[9px] text-white/20">{b.use}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* CTA — pill buttons */}
        <div className="pb-20 pt-8 text-center">
          <p className="text-white/35 text-sm mb-6">
            This is a living document. The design system evolves with the product.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/design-lab"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/[0.05] border border-white/[0.09] text-sm text-white/60 hover:text-white/90 hover:bg-white/[0.09] transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Design Lab
            </Link>
            <Link
              href="/design-lab/frontend-design"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-sm text-purple-400 hover:bg-purple-500/20 hover:border-purple-500/40 transition-all duration-200"
            >
              Frontend Patterns
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
