'use client'

import { useState, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
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
} from 'lucide-react'

// ── Email Palette ──

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

// ── Design Principles ──

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

// ── Typography Scale ──

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

// ── Template Catalog ──

const seriesTemplates = [
  { id: 8, name: 'Weekly Digest', accent: '#8b5cf6', description: 'Curated highlights from the week — articles, projects, and insights' },
  { id: 9, name: 'Onboarding Day 3', accent: '#34d399', description: 'Three quick resources to get started with the FrankX ecosystem' },
  { id: 10, name: 'Onboarding Day 7', accent: '#fbbf24', description: 'Deeper dive into tools and frameworks with actionable steps' },
  { id: 11, name: 'Onboarding Day 14', accent: '#8b5cf6', description: 'Progress check-in with community invitation and next steps' },
  { id: 12, name: 'Product Launch', accent: '#22d3ee', description: 'New product announcement with features, pricing, and early access' },
  { id: 13, name: 'Behind the Music', accent: '#34d399', description: 'Creative process breakdown — how a track was made with AI' },
]

const transactionalTemplates = [
  { id: 1, name: 'PDF Guide Delivery', accent: '#22d3ee', description: 'Download link with guide preview and feature highlights' },
  { id: 2, name: 'Newsletter Welcome', accent: '#8b5cf6', description: 'Onboarding with four "What to Expect" pillars' },
  { id: 3, name: 'Test Email', accent: '#22d3ee', description: 'Diagnostic template for delivery and rendering tests' },
  { id: 4, name: 'Community Broadcast', accent: '#8b5cf6', description: 'Announcements and updates to the full subscriber base' },
  { id: 5, name: 'Music Prompts', accent: '#34d399', description: 'Curated AI music prompts with genre tags and Suno links' },
  { id: 6, name: 'Purchase Confirmation', accent: '#8b5cf6', description: 'Order receipt with download links and support info' },
  { id: 7, name: 'Album Release', accent: '#34d399', description: 'New album announcement with tracklist and streaming links' },
]

// ── Helper Primitives ──

const helperPrimitives = [
  {
    name: 'ctaButton',
    signature: '(text, url, color?)',
    description: 'Primary call-to-action. Rounded-8px, 16px/600 weight, centered. Includes Outlook VML roundrect fallback.',
    preview: 'button',
    accent: '#8b5cf6',
  },
  {
    name: 'outlineButton',
    signature: '(text, url)',
    description: 'Secondary action. Transparent background with #374151 border. Same 320px max-width as CTA.',
    preview: 'outline',
    accent: '#374151',
  },
  {
    name: 'divider',
    signature: '()',
    description: 'Section separator. 1px border-top #1f2937 with 36px top padding. Creates breathing room.',
    preview: 'divider',
    accent: '#1f2937',
  },
  {
    name: 'label',
    signature: '(text, color?)',
    description: 'Section marker. 11px, uppercase, 0.1em letter-spacing, 700 weight. Sets context for what follows.',
    preview: 'label',
    accent: '#8b5cf6',
  },
  {
    name: 'ps',
    signature: '(text)',
    description: 'Post-script block. Border-top separator + "P.S." in bold #d1d5db, body in #9ca3af. Personal touch.',
    preview: 'ps',
    accent: '#9ca3af',
  },
]

// ── Evolution Timeline ──

const evolution = [
  { version: 'v1', title: 'Foundation', date: 'Jan 2026', description: 'Basic branded emails. Manual HTML construction, inconsistent styles across templates.', color: '#6b7280' },
  { version: 'v2', title: 'Mobile-First', date: 'Jan 2026', description: 'System font stack, inline styles for Gmail compatibility, responsive @media desktop enhancements.', color: '#22d3ee' },
  { version: 'v3', title: 'Consolidation', date: 'Feb 2026', description: 'Helper primitives extracted. Visual system standardized. Template count grew to 7.', color: '#34d399' },
  { version: 'v4', title: 'Oasis of Calm', date: 'Feb 2026', description: 'Monochrome + one accent. Typography-driven. 6 series templates. Total: 13 templates, 5 helpers.', color: '#8b5cf6', active: true },
]

// ── Color Swatch Component ──

function ColorSwatch({ hex, name, detail }: { hex: string; name: string; detail: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(hex)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      className="group text-left"
    >
      <div
        className="h-16 rounded-lg border border-white/[0.06] mb-2 transition-all group-hover:border-white/[0.15] group-hover:scale-[1.02]"
        style={{ backgroundColor: hex }}
      />
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-medium text-white/70">{name}</span>
        {copied && <Check className="w-3 h-3 text-emerald-400" />}
      </div>
      <p className="text-[10px] text-white/30">{detail}</p>
      <p className="text-[10px] font-mono text-white/20 group-hover:text-white/50 transition-colors">{hex}</p>
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
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
      className="py-16 border-t border-white/[0.04]"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-xl" style={{ backgroundColor: color + '15' }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      <p className="text-white/40 text-sm mb-8 max-w-2xl">{subtitle}</p>
      {children}
    </motion.section>
  )
}

// ── Accent Selector Preview ──

function AccentPreview() {
  const [activeAccent, setActiveAccent] = useState(accentPalettes[0])

  return (
    <div className="mt-8 grid md:grid-cols-2 gap-6">
      {/* Accent selector */}
      <div>
        <h3 className="text-xs uppercase tracking-wider text-white/30 mb-4 font-semibold">Select Accent</h3>
        <div className="space-y-2">
          {accentPalettes.map(a => (
            <button
              key={a.name}
              onClick={() => setActiveAccent(a)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                activeAccent.name === a.name
                  ? 'bg-white/[0.06] border border-white/[0.12]'
                  : 'bg-white/[0.01] border border-white/[0.04] hover:border-white/[0.08]'
              }`}
            >
              <div className="w-5 h-5 rounded-full shrink-0" style={{ backgroundColor: a.hex }} />
              <div className="flex-1 min-w-0">
                <span className="text-xs font-medium text-white/80">{a.name}</span>
                <span className="text-[10px] text-white/30 ml-2">{a.role}</span>
              </div>
              {activeAccent.name === a.name && <Check className="w-3 h-3 text-white/50 shrink-0" />}
            </button>
          ))}
        </div>
      </div>

      {/* Mini email preview */}
      <div>
        <h3 className="text-xs uppercase tracking-wider text-white/30 mb-4 font-semibold">Email Preview</h3>
        <div className="rounded-xl overflow-hidden border border-white/[0.06]" style={{ backgroundColor: '#111827' }}>
          {/* Top accent border */}
          <div className="h-[3px]" style={{ backgroundColor: activeAccent.hex }} />

          <div className="p-6">
            {/* Logo */}
            <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 20 }}>
              <span style={{ color: activeAccent.hex }}>FrankX</span>
              <span style={{ color: '#6b7280' }}>.</span>
              <span style={{ color: activeAccent.hex }}>AI</span>
            </p>

            {/* Label */}
            <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: activeAccent.hex }}>
              This week
            </p>

            {/* Title */}
            <h3 className="text-base font-bold text-white/90 mb-3 leading-tight">
              Building systems that think for you
            </h3>

            {/* Body */}
            <p className="text-xs text-[#d1d5db] leading-relaxed mb-4">
              Three things landed this week — a new agent architecture, a music production workflow, and a template that ships...
            </p>

            {/* CTA */}
            <div
              className="rounded-lg px-4 py-2.5 text-center text-xs font-semibold text-white"
              style={{ backgroundColor: activeAccent.hex }}
            >
              Read More
            </div>

            {/* Divider */}
            <div className="mt-5 pt-4 border-t border-[#1f2937]">
              <p className="text-[9px] text-[#6b7280]">Frank Riemer &middot; AI Architect</p>
            </div>
          </div>
        </div>
        <p className="text-[10px] text-white/20 mt-3 text-center">
          Interactive preview — click accents to see the change
        </p>
      </div>
    </div>
  )
}

// ── Template Card ──

function TemplateCard({ id, name, accent, description }: { id: number; name: string; accent: string; description: string }) {
  return (
    <div className="group p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all">
      <div className="h-[3px] rounded-full mb-4 w-12" style={{ backgroundColor: accent }} />
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm font-bold text-white">{name}</h4>
        <span className="text-[9px] font-mono text-white/20 shrink-0 ml-2">#{id}</span>
      </div>
      <p className="text-xs text-white/35 leading-relaxed">{description}</p>
    </div>
  )
}

// ── Main Page ──

export default function NewsletterDesignSystemPage() {
  const shouldReduceMotion = useReducedMotion()
  const [copiedHelper, setCopiedHelper] = useState<string | null>(null)

  const copySignature = useCallback((name: string, sig: string) => {
    navigator.clipboard.writeText(`${name}${sig}`)
    setCopiedHelper(name)
    setTimeout(() => setCopiedHelper(null), 1500)
  }, [])

  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#0a0a0b]" />
        <div
          className="absolute top-0 left-1/4 w-[60%] h-[40%]"
          style={{ background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.03) 0%, transparent 70%)', filter: 'blur(100px)' }}
        />
        <div
          className="absolute bottom-1/4 right-0 w-[40%] h-[40%]"
          style={{ background: 'radial-gradient(ellipse at center, rgba(251,113,133,0.02) 0%, transparent 70%)', filter: 'blur(100px)' }}
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
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20">
            <Mail className="w-3 h-3 text-violet-400" />
            <span className="text-xs font-semibold text-violet-400 tracking-wider uppercase">Email Design System</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-[1.1]">
            Arcanea
            <span className="block bg-gradient-to-r from-violet-400 via-rose-400 to-amber-400 bg-clip-text text-transparent">
              Compose
            </span>
          </h1>

          <p className="text-lg text-white/50 max-w-2xl leading-relaxed mb-4">
            13 templates. 5 accent palettes. One design philosophy: the{' '}
            <span className="text-white/70 font-medium">Oasis of Calm</span>.
          </p>

          <p className="text-sm text-white/30 max-w-2xl leading-relaxed mb-8">
            Every email from FrankX.AI uses this system — monochrome dark backgrounds with a single accent
            color, typography that does the work of design, and whitespace that respects the reader.
          </p>

          {/* Quick nav */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Philosophy', href: '#philosophy' },
              { label: 'Colors', href: '#colors' },
              { label: 'Typography', href: '#typography' },
              { label: 'Templates', href: '#templates' },
              { label: 'Components', href: '#components' },
              { label: 'Integration', href: '#integration' },
              { label: 'Evolution', href: '#evolution' },
            ].map(n => (
              <a
                key={n.label}
                href={n.href}
                className="px-3 py-1.5 rounded-lg text-xs text-white/40 border border-white/[0.06] hover:border-white/[0.15] hover:text-white/70 transition-all"
              >
                {n.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* ── 1. Design Philosophy ── */}
        <Section
          id="philosophy"
          icon={Sparkles}
          title="Design Philosophy"
          subtitle="Five rules that govern every email from FrankX.AI. Fewer rules, stronger identity."
          color="#8b5cf6"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {principles.map(p => (
              <div
                key={p.title}
                className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: p.color + '12' }}
                >
                  <p.icon className="w-5 h-5" style={{ color: p.color }} />
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{p.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 2. Color System ── */}
        <Section
          id="colors"
          icon={Palette}
          title="Color System"
          subtitle="Monochrome foundation + five accent palettes. Click any swatch to copy hex. Click accents below to preview."
          color="#8b5cf6"
        >
          {/* Foundation */}
          <div className="mb-8">
            <h3 className="text-xs uppercase tracking-wider text-white/30 mb-4 font-semibold">Foundation</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {foundationColors.map(c => (
                <ColorSwatch key={c.hex} hex={c.hex} name={c.name} detail={c.use} />
              ))}
            </div>
          </div>

          {/* Accents */}
          <div className="mb-4">
            <h3 className="text-xs uppercase tracking-wider text-white/30 mb-4 font-semibold">Accent Palettes</h3>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {accentPalettes.map(c => (
                <ColorSwatch key={c.hex} hex={c.hex} name={c.name} detail={c.role} />
              ))}
            </div>
          </div>

          {/* Interactive Accent Preview */}
          <AccentPreview />
        </Section>

        {/* ── 3. Typography ── */}
        <Section
          id="typography"
          icon={Type}
          title="Typography Scale"
          subtitle="System font stack. No web fonts in email — maximum compatibility, consistent rendering everywhere."
          color="#d1d5db"
        >
          <div className="mb-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <p className="text-[10px] uppercase tracking-wider text-white/30 mb-2 font-semibold">Font Stack</p>
            <code className="text-xs text-white/50 font-mono">
              -apple-system, BlinkMacSystemFont, &apos;Segoe UI&apos;, Roboto, Helvetica, Arial, sans-serif
            </code>
          </div>

          <div className="space-y-0">
            {emailTypeScale.map(t => (
              <div
                key={t.name}
                className="flex items-baseline gap-6 py-4 border-b border-white/[0.03] group"
              >
                <div className="w-24 shrink-0">
                  <span className="text-[10px] font-mono text-white/20 group-hover:text-white/40 transition-colors">
                    {t.name}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/50 truncate">{t.use}</p>
                </div>
                <div className="shrink-0 text-right hidden sm:block">
                  <p className="text-[10px] font-mono text-white/25">{t.size} / {t.weight}</p>
                  <p className="text-[10px] font-mono text-white/15">lh: {t.leading}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 4. Template Gallery ── */}
        <Section
          id="templates"
          icon={Mail}
          title="Template Gallery"
          subtitle="13 email templates across two categories. Each uses exactly one accent color."
          color="#34d399"
        >
          {/* Series Templates */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xs uppercase tracking-wider text-white/30 font-semibold">Series Templates</h3>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 font-medium">v4</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {seriesTemplates.map(t => (
                <TemplateCard key={t.id} {...t} />
              ))}
            </div>
          </div>

          {/* Transactional Templates */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-white/30 mb-4 font-semibold">Transactional Templates</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {transactionalTemplates.map(t => (
                <TemplateCard key={t.id} {...t} />
              ))}
            </div>
          </div>
        </Section>

        {/* ── 5. Component Library ── */}
        <Section
          id="components"
          icon={Layers}
          title="Component Library"
          subtitle="Five helper primitives. Every email is composed from these building blocks."
          color="#fbbf24"
        >
          <div className="space-y-4">
            {helperPrimitives.map(h => (
              <div
                key={h.name}
                className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.10] transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-bold text-white font-mono">{h.name}</h4>
                    <span className="text-[10px] font-mono text-white/30">{h.signature}</span>
                  </div>
                  <button
                    onClick={() => copySignature(h.name, h.signature)}
                    className="flex items-center gap-1 text-[10px] text-white/30 hover:text-white/60 transition-colors"
                  >
                    {copiedHelper === h.name ? (
                      <><Check className="w-3 h-3 text-emerald-400" /> Copied</>
                    ) : (
                      <><Copy className="w-3 h-3" /> Copy</>
                    )}
                  </button>
                </div>

                {/* Visual preview */}
                <div className="rounded-lg overflow-hidden border border-white/[0.04] mb-3" style={{ backgroundColor: '#111827' }}>
                  <div className="p-4">
                    {h.preview === 'button' && (
                      <div className="rounded-lg px-5 py-3 text-center text-sm font-semibold text-white max-w-[200px] mx-auto" style={{ backgroundColor: h.accent }}>
                        Call to Action
                      </div>
                    )}
                    {h.preview === 'outline' && (
                      <div className="rounded-lg px-5 py-3 text-center text-sm font-semibold text-[#e2e8f0] max-w-[200px] mx-auto border" style={{ borderColor: h.accent }}>
                        Secondary
                      </div>
                    )}
                    {h.preview === 'divider' && (
                      <div className="pt-4">
                        <div className="border-t" style={{ borderColor: h.accent }} />
                      </div>
                    )}
                    {h.preview === 'label' && (
                      <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: h.accent, letterSpacing: '0.1em' }}>
                        Section Label
                      </p>
                    )}
                    {h.preview === 'ps' && (
                      <div className="pt-3 border-t border-[#1f2937]">
                        <p className="text-sm" style={{ color: h.accent }}>
                          <strong className="text-[#d1d5db]">P.S.</strong> This is a personal note at the end of the email.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-xs text-white/35 leading-relaxed">{h.description}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 6. Integration Architecture ── */}
        <Section
          id="integration"
          icon={Workflow}
          title="Integration"
          subtitle="How the email system connects to frankx.ai. One subscribe API, three topic segments, automated flows."
          color="#22d3ee"
        >
          {/* Flow diagram */}
          <div className="flex flex-col sm:flex-row items-stretch gap-3 mb-8">
            {[
              { label: 'frankx.ai', sub: 'EmailSignup component', color: '#8b5cf6' },
              { label: '/api/subscribe', sub: 'POST route', color: '#22d3ee' },
              { label: 'Resend', sub: 'Contact + Topic', color: '#34d399' },
              { label: 'Welcome Email', sub: 'Async delivery', color: '#fbbf24' },
              { label: 'Series Flow', sub: 'Day 3 → 7 → 14', color: '#fb7185' },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-3 flex-1">
                <div className="flex-1 p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-center">
                  <p className="text-xs font-semibold text-white mb-0.5">{step.label}</p>
                  <p className="text-[10px] text-white/30">{step.sub}</p>
                  <div className="h-[2px] w-8 mx-auto mt-2 rounded-full" style={{ backgroundColor: step.color }} />
                </div>
                {i < 4 && (
                  <ArrowRight className="w-3 h-3 text-white/15 shrink-0 hidden sm:block" />
                )}
              </div>
            ))}
          </div>

          {/* Integration points */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <Send className="w-4 h-4 text-violet-400 mb-2" />
              <h4 className="text-xs font-bold text-white mb-1">Resend API</h4>
              <p className="text-[10px] text-white/30">Verified domain: mail.frankx.ai</p>
              <p className="text-[10px] text-white/30">Rate limit: 2 req/s</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <Layers className="w-4 h-4 text-emerald-400 mb-2" />
              <h4 className="text-xs font-bold text-white mb-1">Topic Segments</h4>
              <p className="text-[10px] text-white/30">newsletter, music-suno, product-updates</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <Smartphone className="w-4 h-4 text-cyan-400 mb-2" />
              <h4 className="text-xs font-bold text-white mb-1">Subscribe Forms</h4>
              <p className="text-[10px] text-white/30">EmailSignup component with listType variants</p>
            </div>
          </div>
        </Section>

        {/* ── 7. Evolution Timeline ── */}
        <Section
          id="evolution"
          icon={Clock}
          title="Evolution"
          subtitle="From basic HTML to a principled design system in four iterations."
          color="#34d399"
        >
          <div className="space-y-0">
            {evolution.map((v, i) => (
              <div
                key={v.version}
                className={`flex gap-4 py-5 ${i < evolution.length - 1 ? 'border-b border-white/[0.03]' : ''}`}
              >
                {/* Timeline dot */}
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className={`w-3 h-3 rounded-full ${v.active ? 'ring-2 ring-offset-2 ring-offset-[#0a0a0b]' : ''}`}
                    style={{ backgroundColor: v.color, ringColor: v.color }}
                  />
                  {i < evolution.length - 1 && (
                    <div className="w-px flex-1 bg-white/[0.06] mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 -mt-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold font-mono" style={{ color: v.color }}>{v.version}</span>
                    <span className="text-sm font-semibold text-white">{v.title}</span>
                    {v.active && (
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 font-medium">Current</span>
                    )}
                  </div>
                  <p className="text-[10px] text-white/20 mb-1">{v.date}</p>
                  <p className="text-xs text-white/40 leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── CTA Footer ── */}
        <div className="pb-20 pt-8 text-center">
          <p className="text-white/30 text-sm mb-6">
            Experience these templates in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/newsletter"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-violet-500/10 border border-violet-500/20 text-sm font-semibold text-violet-400 hover:bg-violet-500/20 transition-all"
            >
              <Mail className="w-4 h-4" />
              Subscribe
            </Link>
            <Link
              href="/design-lab"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] border border-white/[0.08] text-sm text-white/60 hover:text-white/90 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Design Lab
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
