'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  GraduationCap,
  Palette,
  Code2,
  Music,
  Terminal,
  BookOpen,
} from 'lucide-react'
import FrankOmega from '@/components/FrankOmega'
import { GlowCard } from '@/components/ui/glow-card'
import { sections, heroLinks, type Audience, type LinktreeLink } from './linktree-data'
import { PRIMARY_SOCIAL_LINKS } from '@/lib/social-links'

// ── Social icon SVGs ──────────────────────────────────────────────────────

const socialIcons: Record<string, React.FC<{ className?: string }>> = {
  Twitter: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Linkedin: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  Instagram: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  Youtube: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  Music: Music,
  Github: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
}

// ── Audience selector cards ─────────────────────────────────────────────────

const audiences: { key: Audience; icon: typeof GraduationCap; label: string; color: string; glow: 'emerald' | 'violet' | 'cyan' }[] = [
  { key: 'students', icon: GraduationCap, label: 'Students', color: 'text-emerald-400', glow: 'emerald' },
  { key: 'creators', icon: Palette, label: 'Creators', color: 'text-violet-400', glow: 'violet' },
  { key: 'devs', icon: Code2, label: 'Developers', color: 'text-cyan-400', glow: 'cyan' },
]

// ── Animation variants ──────────────────────────────────────────────────────

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

// ── Link card component ─────────────────────────────────────────────────────

function LinkCard({ link }: { link: LinktreeLink }) {
  const Icon = link.icon
  const isExternal = link.external || link.href.startsWith('http')

  const inner = (
    <div className="group relative flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 transition-all duration-300 hover:border-white/[0.16] hover:bg-white/[0.06]">
      {/* Image or gradient icon */}
      {link.image ? (
        <div className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br ${link.gradient}`}>
          <Image
            src={link.image}
            alt=""
            fill
            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            sizes="56px"
          />
        </div>
      ) : (
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${link.gradient}`}>
          <Icon className="h-6 w-6 text-white/80" />
        </div>
      )}

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors truncate">
            {link.title}
          </h3>
          {link.badge && (
            <span className="shrink-0 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
              {link.badge}
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-white/40 leading-relaxed truncate">{link.subtitle}</p>
      </div>

      {/* Arrow */}
      {isExternal ? (
        <ArrowUpRight className="h-4 w-4 shrink-0 text-white/20 group-hover:text-white/50 transition-colors" />
      ) : (
        <ArrowRight className="h-4 w-4 shrink-0 text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all" />
      )}
    </div>
  )

  if (isExternal) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    )
  }

  return <Link href={link.href}>{inner}</Link>
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function LinktreePage() {
  const hero = heroLinks.default

  return (
    <div className="min-h-screen bg-[#050507]">
      {/* ─── Ambient background ─── */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-purple-600/[0.07] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-600/[0.06] blur-[120px]" />
        <div className="absolute top-[40%] right-[20%] h-[300px] w-[300px] rounded-full bg-emerald-600/[0.04] blur-[100px]" />
      </div>

      <motion.div
        className="relative mx-auto max-w-[520px] px-5 pb-16 pt-14"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* ─── Profile header ─── */}
        <motion.div variants={fadeUp} className="mb-10 text-center">
          <div className="relative mx-auto mb-5 w-24">
            <div className="absolute inset-0 scale-110 rounded-full bg-gradient-to-br from-purple-500/40 via-cyan-500/30 to-emerald-500/20 blur-xl" />
            <FrankOmega
              variant="chibi-avatar"
              size="lg"
              glow
              rounded
              className="relative border-2 border-white/10"
            />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white">
            Frank X. Riemer
          </h1>
          <p className="mt-2 text-sm text-white/40 leading-relaxed max-w-xs mx-auto">
            AI Architect. 12K+ AI songs. Builder of systems that amplify creativity.
          </p>

          {/* Stats strip */}
          <div className="mt-4 flex justify-center gap-3">
            {[
              { val: '12K+', label: 'AI Songs' },
              { val: '75+', label: 'Skills' },
              { val: '90+', label: 'Articles' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5"
              >
                <span className="text-xs font-semibold text-white/70">{stat.val}</span>
                <span className="ml-1 text-[10px] text-white/30">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ─── Audience selector ─── */}
        <motion.div variants={fadeUp} className="mb-8">
          <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-white/20">
            I am a...
          </p>
          <div className="grid grid-cols-3 gap-2">
            {audiences.map((a) => (
              <GlowCard key={a.key} color={a.glow} href={`/linktree/${a.key}`} className="!rounded-xl">
                <div className="flex flex-col items-center gap-2 px-3 py-4">
                  <a.icon className={`h-5 w-5 ${a.color}`} />
                  <span className="text-xs font-medium text-white/70">{a.label}</span>
                </div>
              </GlowCard>
            ))}
          </div>
        </motion.div>

        {/* ─── Hero card ─── */}
        <motion.div variants={fadeUp} className="mb-6">
          <Link href={hero.href}>
            <div className="group relative overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-br from-white/[0.06] to-white/[0.02]">
              {/* Background image */}
              {hero.image && (
                <div className="absolute inset-0">
                  <Image
                    src={hero.image}
                    alt=""
                    fill
                    className="object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                    sizes="520px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/60 to-transparent" />
                </div>
              )}

              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${hero.gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />

              <div className="relative p-6">
                {/* Badge */}
                {hero.badge && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-400 mb-4">
                    <Terminal className="h-3 w-3" />
                    {hero.badge}
                  </span>
                )}

                <h2 className="text-xl font-bold text-white mb-1">
                  {hero.title}
                </h2>
                <p className="text-sm text-white/50 mb-5 leading-relaxed">
                  {hero.subtitle}
                </p>

                <div className="flex items-center gap-2 text-sm font-medium text-purple-300 group-hover:text-purple-200 transition-colors">
                  Explore
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* ─── Link sections ─── */}
        {sections.map((section) => (
          <motion.div key={section.id} variants={fadeUp} className="mb-6">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/20 pl-1">
              {section.label}
            </p>
            <div className="space-y-2">
              {section.links.map((link) => (
                <LinkCard key={link.title} link={link} />
              ))}
            </div>
          </motion.div>
        ))}

        {/* ─── Social row ─── */}
        <motion.div variants={fadeUp} className="mb-10">
          <div className="flex justify-center gap-2">
            {PRIMARY_SOCIAL_LINKS.map((social) => {
              const IconComponent = socialIcons[social.icon]
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] transition-all hover:border-white/[0.15] hover:bg-white/[0.06]"
                  aria-label={social.name}
                >
                  {IconComponent && (
                    <IconComponent className="h-4.5 w-4.5 text-white/30 group-hover:text-white/60 transition-colors" />
                  )}
                </a>
              )
            })}
          </div>
        </motion.div>

        {/* ─── Footer ─── */}
        <motion.div variants={fadeUp} className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[11px] font-mono text-white/15 hover:text-white/30 transition-colors"
          >
            frankx.ai
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
